# -*- coding: utf-8 -*-
"""Playwright QA for VELTOR AUTO demo site (file:// URLs)."""
import sys
from playwright.sync_api import sync_playwright

BASE = "file:///D:/PROJECT/Lumicom/01-veltor-auto/"
PAGES = ["index.html", "services.html", "service-detail.html",
         "prices.html", "about.html", "contacts.html"]

fails = []

def fail(page, msg):
    fails.append(f"{page}: {msg}")

with sync_playwright() as p:
    browser = p.chromium.launch()

    for page_name in PAGES:
        for width, height in ((320, 800), (1440, 900)):
            ctx = browser.new_context(viewport={"width": width, "height": height})
            ppg = ctx.new_page()
            errors = []
            ppg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
            ppg.on("pageerror", lambda e: errors.append(str(e)))
            ppg.goto(BASE + page_name, wait_until="load")
            ppg.wait_for_timeout(300)

            # trigger lazy-loaded images by scrolling through the page
            ppg.evaluate(
                """async () => {
                    const step = window.innerHeight;
                    for (let y = 0; y <= document.body.scrollHeight; y += step) {
                        window.scrollTo(0, y);
                        await new Promise(r => setTimeout(r, 40));
                    }
                    window.scrollTo(0, 0);
                }"""
            )
            ppg.wait_for_load_state("load")
            ppg.wait_for_timeout(600)

            if errors:
                fail(f"{page_name}@{width}", f"{len(errors)} console error(s): {errors[:3]}")

            broken = ppg.evaluate(
                "() => Array.from(document.images)"
                ".filter(i => !i.complete || i.naturalWidth === 0)"
                ".map(i => i.currentSrc || i.src)"
            )
            if broken:
                fail(f"{page_name}@{width}", f"broken images: {broken}")

            overflow = ppg.evaluate(
                "() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)"
                f" - {width}"
            )
            if overflow > 2:
                fail(f"{page_name}@{width}", f"horizontal overflow: {overflow}px")
            ctx.close()

    # Contacts form: fill and submit -> success block must become visible
    ctx = browser.new_context(viewport={"width": 1280, "height": 900})
    ppg = ctx.new_page()
    ppg.on("pageerror", lambda e: fails.append(f"contacts: pageerror {e}"))
    ppg.goto(BASE + "contacts.html", wait_until="load")
    ppg.fill("#f-name", "Иван Тестов")
    ppg.fill("#f-phone", "+7 (912) 345-67-89")
    ppg.select_option("#f-service", "brake-pads")
    ppg.click("#booking-form button[type=submit]")
    ppg.wait_for_timeout(200)
    success = ppg.locator("#form-success")
    if not success.is_visible():
        fail("contacts", "form success box not visible after valid submit")
    elif "не отправляется на сервер" not in success.inner_text():
        fail("contacts", "success message text mismatch")
    ppg.wait_for_timeout(300)

    # Detection of ?service= preselect on service-detail page not here (covered visually).

    # Burger at 700px
    ctx2 = browser.new_context(viewport={"width": 700, "height": 800})
    pb = ctx2.new_page()
    pb.on("pageerror", lambda e: fails.append(f"index@700: pageerror {e}"))
    pb.goto(BASE + "index.html", wait_until="load")
    burger = pb.locator(".burger")
    if not burger.is_visible():
        fail("index@700", "burger not visible at 700px")
    else:
        pb.click(".burger")
        pb.wait_for_timeout(350)
        expanded = pb.get_attribute(".burger", "aria-expanded")
        nav_visible = pb.locator("#site-nav").is_visible()
        if expanded != "true" or not nav_visible:
            fail("index@700", f"burger open failed: aria-expanded={expanded}, nav visible={nav_visible}")
        pb.keyboard.press("Escape")
        pb.wait_for_timeout(300)
        if pb.get_attribute(".burger", "aria-expanded") != "false":
            fail("index@700", "Esc did not close burger")
    ctx2.close()

    # service-detail: default render + switch selects
    ctx3 = browser.new_context(viewport={"width": 1280, "height": 900})
    pd = ctx3.new_page()
    pd.on("pageerror", lambda e: fails.append(f"detail: pageerror {e}"))
    pd.goto(BASE + "service-detail.html?service=brake-pads", wait_until="load")
    title_now = pd.locator("#detail-title").inner_text()
    if "колод" not in title_now.lower():
        fail("detail", f"detail title mismatch: {title_now!r}")
    pd.select_option("#service-select", "battery")
    pd.wait_for_load_state("load")
    pd.wait_for_timeout(500)
    pb_url = pd.url
    if "battery" not in pb_url:
        fail("detail", f"select did not navigate: {pb_url}")
    pd.wait_for_timeout(300)
    if "акб" not in pd.locator("#detail-title").inner_text().lower() and \
       "аккумулятор" not in pd.locator("#detail-title").inner_text().lower():
        fail("detail", f"detail did not render battery: {pd.locator('#detail-title').inner_text()!r}")
    ctx3.close()

    browser.close()

if fails:
    print("FAIL")
    for f in fails:
        print(" -", f)
    sys.exit(1)
print("PASS — all Playwright checks green")
