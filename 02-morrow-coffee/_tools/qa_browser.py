# 파일: morrow_playwright.py — браузерное QA сайта MORROW COFFEE по file://
import datetime
import sys
from playwright.sync_api import sync_playwright

BASE = "file:///D:/PROJECT/Lumicom/02-morrow-coffee/"
PAGES = ["index.html", "menu.html", "coffee.html", "bakery.html", "about.html", "contacts.html"]
fails = []

def fail(tag, msg):
    fails.append(f"{tag}: {msg}")
    print(f"FAIL {tag}: {msg}")

def ok(msg):
    print(f"ok: {msg}")

with sync_playwright() as p:
    browser = p.chromium.launch()
    # ---------- Каждая страница 1440 и 320 ----------
    for w, h, tag in [(1440, 900, "1440"), (700, 900, "700"), (320, 800, "320")]:
        ctx = browser.new_context(viewport={"width": w, "height": h})
        pg = ctx.new_page()
        console_errors = []
        pg.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        pg.on("pageerror", lambda e: console_errors.append(str(e)))
        for page_name in PAGES:
            console_errors.clear()
            url = BASE + page_name
            try:
                pg.goto(url, wait_until="networkidle", timeout=20000)
            except Exception as e:
                fail(f"{tag}/{page_name}", f"goto error: {e}")
                continue
            # консоль
            if console_errors:
                fail(f"{tag}/{page_name}", f"console errors: {console_errors[:4]}")
            else:
                ok(f"{tag}/{page_name} console clean")
            # битые изображения (доскролливаем до самого низа, чтобы загрузились lazy-картинки)
            pg.evaluate(
                """async () => {
                  const d = document.documentElement;
                  for (let i = 0; i < 80 && d.scrollTop + window.innerHeight < d.scrollHeight; i++) {
                    window.scrollBy(0, window.innerHeight);
                    await new Promise(r => setTimeout(r, 100));
                  }
                }"""
            )
            pg.wait_for_timeout(500)
            pg.evaluate("() => window.scrollTo(0, 0)")
            pg.wait_for_timeout(300)
            bad_img = pg.evaluate(
                "() => Array.from(document.images).filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)"
            )
            if bad_img:
                fail(f"{tag}/{page_name}", f"broken img: {bad_img}")
            # горизонтальный скролл
            sw = pg.evaluate("() => document.documentElement.scrollWidth")
            if sw > w:
                fail(f"{tag}/{page_name}", f"scrollWidth {sw} > {w}")
            else:
                ok(f"{tag}/{page_name} no h-scroll (sw={sw})")
        ctx.close()

    # ---------- menu.html: фильтрация табов ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    errors = []
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(BASE + "menu.html", wait_until="networkidle")

    cards_all = pg.locator("#menuGrid .menu-card:visible").count()
    if cards_all != pg.locator("#menuGrid .menu-card").count():
        fail("menu-tabs", f"cards hidden on 'all': {cards_all}")
    per_cat = {}
    for cat in ["coffee", "noncoffee", "bakery", "beans"]:
        pg.click(f'#catTabs .cat-tab[data-cat="{cat}"]')
        pg.wait_for_timeout(120)
        visible = pg.locator("#menuGrid .menu-card:visible").count()
        total = pg.locator("#menuGrid .menu-card").count()
        per_cat[cat] = visible
        datacats = pg.eval_on_selector_all(
            "#menuGrid .menu-card:visible", "els => els.map(e => e.dataset.cat)"
        )
        uniq = set(datacats)
        if visible == 0 or visible == total and len(uniq) != 1:
            fail("menu-tabs", f"{cat}: filter not applied (visible={visible}/{total})")
        if len(uniq - {cat}) != 0:
            fail("menu-tabs", f"{cat}: wrong cards visible: {uniq}")
        else:
            ok(f"menu-tabs {cat}: {visible}/{total}")
        if sel := pg.get_attribute(f'#catTabs .cat-tab[data-cat="{cat}"]', "aria-selected"):
            if sel != "true":
                fail("menu-tabs", f"{cat} aria-selected != true")
    pg.click('#catTabs .cat-tab[data-cat="all"]')
    back = pg.locator("#menuGrid .menu-card:visible").count()
    if back != cards_all:
        fail("menu-tabs", f"back to all: {back} != {cards_all}")
    else:
        ok("menu-tabs back to all")
    if errors:
        fail("menu-tabs", f"console: {errors}")
    ctx.close()

    # ---------- contacts.html: форма ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 1000})
    pg = ctx.new_page()
    errors = []
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(BASE + "contacts.html", wait_until="networkidle")
    today = datetime.date.today().isoformat()
    mn = pg.get_attribute("#bk-date", "min")
    if mn != today:
        fail("form", f"date min={mn} today={today}")
    slots = pg.locator("#bk-time option").count()
    if slots < 24:  # 24 слота + заглушка
        fail("form", f"time slots={slots}")
    else:
        ok(f"form time slots={slots}")
    # пустая отправка -> ошибки
    pg.click(".form-submit")
    if pg.get_attribute("#bk-name", "aria-invalid") != "true":
        fail("form", "empty submit: no invalid state on name")
    ok("form empty submit blocked")
    # невалидный телефон
    pg.fill("#bk-name", "Анна")
    pg.fill("#bk-phone", "12345")
    pg.fill("#bk-date", today)
    pg.select_option("#bk-time", "10:00")
    pg.click(".form-submit")
    if pg.get_attribute("#bk-phone", "aria-invalid") != "true":
        fail("form", "bad phone accepted")
    else:
        ok("form bad phone rejected")
    # валидная отправка
    pg.fill("#bk-phone", "+7 912 345 67 89")
    pg.click(".form-submit")
    pg.wait_for_timeout(300)
    shown = pg.locator("#bookingSuccess").is_visible()
    if not shown:
        fail("form", "success box not shown after valid submit")
    else:
        txt = pg.inner_text("#bookingSuccess")
        if "не подключён" not in txt or "+7 (900) 100-20-40" not in txt:
            fail("form", f"success text wrong: {txt[:80]}")
        else:
            ok("form success message shown")
    if errors:
        fail("form", f"console: {errors}")
    ctx.close()

    # ---------- бургер 700px ----------
    ctx = browser.new_context(viewport={"width": 700, "height": 900})
    pg = ctx.new_page()
    errors = []
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(BASE + "index.html", wait_until="networkidle")
    if not pg.locator(".burger").is_visible():
        fail("burger", "not visible at 700px")
    st = pg.get_attribute(".burger", "aria-expanded")
    if st != "false":
        fail("burger", f"initial aria-expanded={st}")
    pg.click(".burger")
    avail = pg.get_attribute(".burger", "aria-expanded")
    vis = pg.locator(".main-nav.open").count()
    if avail != "true" or vis != 1:
        fail("burger", f"not opened ({avail}, open={vis})")
    else:
        ok("burger opens")
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(350)
    if pg.get_attribute(".burger", "aria-expanded") != "false":
        fail("burger", "Esc does not close")
    else:
        ok("burger Esc closes")
    pg.click(".burger")
    pg.wait_for_timeout(200)
    pg.click(".main-nav a[href='./menu.html']")
    pg.wait_for_timeout(350)
    if pg.get_attribute(".burger", "aria-expanded") != "false":
        fail("burger", "link click does not close")
    else:
        ok("burger link click closes")
    # ссылка работает
    pg.wait_for_timeout(200)
    if not pg.url.endswith("menu.html"):
        fail("burger", f"navigation failed: {pg.url}")
    if errors:
        fail("burger", f"console: {errors}")
    ctx.close()

    # ---------- FAQ аккордеон ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    pg.goto(BASE + "about.html", wait_until="networkidle")
    pg.locator(".faq-item summary").first.click()
    open1 = pg.locator(".faq-item[open]").count()
    if open1 != 1:
        fail("faq", f"expected 1 open, got {open1}")
    else:
        ok("faq opens")
    ctx.close()

    browser.close()

print("ALL OK" if not fails else f"FAILURES: {len(fails)}")
sys.exit(0 if not fails else 1)
