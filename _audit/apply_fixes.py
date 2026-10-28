# -*- coding: utf-8 -*-
"""Batch fixes across Lumicom demo sites + portfolio."""
import sys, re, io, pathlib
sys.stdout.reconfigure(encoding='utf-8')

ROOT = pathlib.Path(r'D:\PROJECT\Lumicom')

def rd(p):
    return p.read_text(encoding='utf-8')

def wr(p, s):
    p.write_text(s, encoding='utf-8', newline='\n')

def edit(path, old, new, count=1, required=True):
    p = pathlib.Path(path)
    s = rd(p)
    if old not in s:
        if required:
            print(f'MISS (not found): {path} :: {old[:60]!r}')
        return False
    s = s.replace(old, new, count)
    wr(p, s)
    print(f'OK: {p.name} :: {old[:50]!r} -> applied')
    return True

HEAD_SCRIPT = '  <script>document.documentElement.classList.add("js");</script>\n'

# 1) Reveal gating: add head script to every demo-site page (after </title> line)
for sub in ['01-veltor-auto', '02-morrow-coffee', '03-bytecare-lab']:
    for p in sorted((ROOT / sub).glob('*.html')):
        s = rd(p)
        if 'documentElement.classList.add' in s:
            print(f'SKIP (already has head script): {p.name}')
            continue
        m = re.search(r'([ \t]*)</title>', s)
        if not m:
            print(f'MISS: no </title> in {p}')
            continue
        s = s.replace(m.group(0), m.group(0) + '\n' + HEAD_SCRIPT.rstrip(), 1)
        wr(p, s)
        print(f'OK: head script -> {sub}/{p.name}')

# 2) CSS: gate reveal behind .js in the three site stylesheets
edit(ROOT / '01-veltor-auto/css/style.css',
     '.reveal {\n  opacity: 0;\n  transform: translateY(12px);',
     '.js .reveal {\n  opacity: 0;\n  transform: translateY(12px);')
edit(ROOT / '02-morrow-coffee/css/style.css',
     '.reveal {\n  opacity: 0;\n  transform: translateY(8px);',
     '.js .reveal {\n  opacity: 0;\n  transform: translateY(8px);')
edit(ROOT / '03-bytecare-lab/css/style.css',
     '.reveal { opacity: 0; transform: translateY(18px);',
     '.js .reveal { opacity: 0; transform: translateY(18px);')

# 3) VELTOR: FAQ invisible on light background + separators
edit(ROOT / '01-veltor-auto/css/style.css',
     '.faq-q:hover { color: var(--accent); }',
     '.faq-q:hover { color: var(--accent); }\n\n'
     '/* light-section FAQ: dark text instead of --text (which equals --light) */\n'
     '.on-light .faq-q { color: var(--ink); }\n'
     '.on-light .faq-q:hover { color: var(--accent); }\n'
     '.faq.on-light, .faq-item.on-light { border-color: rgba(20, 22, 25, 0.12); }')

# 4) VELTOR: VT-00 caption glitch for unknown ?service= (fallback still renders)
edit(ROOT / '01-veltor-auto/js/main.js',
     "      var idx = findService(id);\n      var current = SERVICES[idx !== -1 ? idx : 0];",
     "      var idx = findService(id);\n      if (idx === -1) idx = 0;\n      var current = SERVICES[idx];")

# 5) VELTOR: "Другое" option must not share empty value
edit(ROOT / '01-veltor-auto/contacts.html',
     '<option value="">Другое / ещё не определился</option>',
     '<option value="other">Другое / ещё не определился</option>')

# 6) VELTOR: make whole service card clickable ("Подробнее" affordance)
edit(ROOT / '01-veltor-auto/css/style.css',
     '.card::after {',
     '.card > a::after {\n'
     '  content: "";\n'
     '  position: absolute;\n'
     '  inset: 0;\n'
     '  z-index: 1;\n'
     '}\n\n'
     '.card::after {')
edit(ROOT / '01-veltor-auto/js/main.js',
     "      li.appendChild(meta);\n      return li;",
     "      li.appendChild(meta);\n      var link = li.querySelector('a');\n"
     "      if (link) { var s2 = document.createElement('style'); }\n      return li;")
# simpler: JS cards rely on the same CSS rule (.card > a::after) — revert the weird insertion
edit(ROOT / '01-veltor-auto/js/main.js',
     "      li.appendChild(meta);\n      var link = li.querySelector('a');\n"
     "      if (link) { var s2 = document.createElement('style'); }\n      return li;",
     "      li.appendChild(meta);\n      return li;")

# 7) VELTOR: body scroll lock while the mobile drawer is open
edit(ROOT / '01-veltor-auto/js/main.js',
     "    var setState = function (open) {\n      nav.classList.toggle('open', open);",
     "    var setState = function (open) {\n"
     "      document.body.classList.toggle('menu-locked', open);\n"
     "      nav.classList.toggle('open', open);")
edit(ROOT / '01-veltor-auto/css/style.css',
     '/* ---------- Reveal animation ---------- */',
     'body.menu-locked { overflow: hidden; }\n\n/* ---------- Reveal animation ---------- */')

# 8) MORROW: tab-list CSS selector never matched (roles/classes on different elements)
edit(ROOT / '02-morrow-coffee/css/style.css',
     '.cat-tabs[role="tablist"] {',
     '#catTabs {')

# 9) MORROW: phone validator must accept "…(912)…" format
edit(ROOT / '02-morrow-coffee/js/main.js',
     "var PHONE_RE = /^(\\+7|8)[\\s\\-\\(]?9\\d{2}[\\s\\-]?\\d{3}[\\s\\-]?\\d{2}[\\s\\-]?\\d{2}$/;",
     "var PHONE_RE = /^(\\+7|8)[\\s\\-]?\\(?9\\d{2}\\)?[\\s\\-]?\\d{3}[\\s\\-]?\\d{2}[\\s\\-]?\\d{2}$/;")

# 10) MORROW: burger aria-label must follow the state
edit(ROOT / '02-morrow-coffee/js/main.js',
     "    function setOpen(open) {\n      burger.setAttribute('aria-expanded', open ? 'true' : 'false');\n      nav.classList.toggle('open', open);\n    }",
     "    function setOpen(open) {\n      burger.setAttribute('aria-expanded', open ? 'true' : 'false');\n"
     "      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');\n"
     "      document.body.classList.toggle('menu-locked', open);\n      nav.classList.toggle('open', open);\n    }")

# 11) MORROW: close fullscreen nav when clicking the overlay area itself
edit(ROOT / '02-morrow-coffee/js/main.js',
     "    qa('a', nav).forEach(function (a) {\n      a.addEventListener('click', function () { setOpen(false); });\n    });",
     "    qa('a', nav).forEach(function (a) {\n      a.addEventListener('click', function () { setOpen(false); });\n    });\n\n"
     "    nav.addEventListener('click', function (e) {\n"
     "      if (e.target === nav) setOpen(false);\n"
     "    });")

# 12) MORROW: anchors under the sticky header
edit(ROOT / '02-morrow-coffee/css/style.css',
     '/* ---------- Reveal on scroll ---------- */',
     '[id] { scroll-margin-top: 100px; }\n\n/* ---------- Reveal on scroll ---------- */')
# remove the duplicate scroll-margin rule we also added via body-locked? (body.menu-locked CSS below)
edit(ROOT / '02-morrow-coffee/css/style.css',
     '[id] { scroll-margin-top: 100px; }',
     'body.menu-locked { overflow: hidden; }\n\n[id] { scroll-margin-top: 100px; }')

# 13) MORROW: fix invalid nested <p> in about.html
edit(ROOT / '02-morrow-coffee/about.html',
     'длинный общий стол. <p>Первый ростер',
     'длинный общий стол.</p>\n            <p style="color: var(--muted);">Первый ростер')

# 14) MORROW: remove dead self-assignment
edit(ROOT / '02-morrow-coffee/js/main.js',
     "    if (dateInput) dateInput.min = dateInput.min; // сохраняем ограничение\n",
     "")

# 15) BYTECARE: add missing services to index short list (symptom chips target them)
edit(ROOT / '03-bytecare-lab/js/main.js',
     "    var shortList = ['cooler-cleaning', 'thermal-paste', 'ssd-upgrade', 'screen', 'keyboard', 'pc-build', 'data-recovery', 'liquid-diagnostics', 'tuning'];",
     "    var shortList = ['cooler-cleaning', 'diagnostics', 'thermal-paste', 'ssd-upgrade', 'screen', 'keyboard', 'pc-repair', 'pc-build', 'data-recovery', 'liquid-diagnostics', 'tuning'];")

# 16) BYTECARE: phone validator must accept the "(900)" format shown on contacts page
edit(ROOT / '03-bytecare-lab/js/main.js',
     "var phoneRe = /^(\\+7|8)[\\s\\-]?\\d{3}[\\s\\-]?\\d{3}[\\s\\-]?\\d{2}[\\s\\-]?\\d{2}$/;",
     "var phoneRe = /^(\\+7|8)[\\s\\-]?\\(?\\d{3}\\)?[\\s\\-]?\\d{3}[\\s\\-]?\\d{2}[\\s\\-]?\\d{2}$/;")

# 17) BYTECARE: markCurrentNav dead logic ("./index.html".indexOf("index.html") === 2)
edit(ROOT / '03-bytecare-lab/js/main.js',
     "      if (href.indexOf(path) === 0 && path) a.setAttribute('aria-current', 'page');",
     "      if (path && href.slice(-path.length) === path) a.setAttribute('aria-current', 'page');")

# 18) BYTECARE: anchors under the sticky header
edit(ROOT / '03-bytecare-lab/css/style.css',
     '/* ---------- Reveal on scroll ---------- */',
     '[id] { scroll-margin-top: 84px; }\n\n/* ---------- Reveal on scroll ---------- */')

# 19) BYTECARE: focus the success box after submit
edit(ROOT / '03-bytecare-lab/js/main.js',
     "      success.classList.add('is-visible');",
     "      success.classList.add('is-visible');\n      success.focus({ preventScroll: true });")

# 20) BYTECARE: FAQ answer hard cap too small for long answers
edit(ROOT / '03-bytecare-lab/css/style.css',
     '.faq__item.is-open .faq__a { max-height: 320px; }',
     '.faq__item.is-open .faq__a { max-height: 480px; }')

print('DONE')
