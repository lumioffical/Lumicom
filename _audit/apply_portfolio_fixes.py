# -*- coding: utf-8 -*-
"""Portfolio fixes: stagger selectors, i18n for alt/aria-label, dictionary keys."""
import sys, re, json, pathlib
sys.stdout.reconfigure(encoding='utf-8')

ROOT = pathlib.Path(r'D:\PROJECT\Lumicom')
PAGES = ['index.html', 'about.html', 'contact.html', 'readyproject.html']

def rd(p): return p.read_text(encoding='utf-8')
def wr(p, s): p.write_text(s, encoding='utf-8', newline='\n')

NEW_KEYS = {
    "proj.open1": ("Open the VELTOR AUTO website", "Открыть сайт VELTOR AUTO"),
    "proj.open2": ("Open the MORROW COFFEE website", "Открыть сайт MORROW COFFEE"),
    "proj.open3": ("Open the BYTECARE LAB website", "Открыть сайт BYTECARE LAB"),
    "proj.alt1": ("VELTOR AUTO — independent garage: a car on a diagnostic lift",
                  "VELTOR AUTO — независимый автосервис: автомобиль на диагностическом подъёмнике"),
    "proj.alt2": ("MORROW COFFEE — specialty coffee shop: a cozy lounge with soft sofas and warm light of brass lamps",
                  "MORROW COFFEE — specialty-кофейня: уютный лаунж-зал с мягкими диванами и тёплым светом медных ламп"),
    "proj.alt3": ("BYTECARE LAB — computer repair lab: laptop diagnostics",
                  "BYTECARE LAB — мастерская по ремонту компьютеров: диагностика ноутбука"),
}

# 1) stagger CSS in all four pages (only readyproject has the grid; keep others in sync)
OLD_STAG = (".js .projects .project:nth-child(2) { transition-delay: 0.07s; }\n"
            ".js .projects .project:nth-child(3) { transition-delay: 0.14s; }\n"
            ".js .projects .project.is-visible { transition-delay: 0s; }")
NEW_STAG = (".js .projects > a:nth-child(2) .project { transition-delay: 0.07s; }\n"
            ".js .projects > a:nth-child(3) .project { transition-delay: 0.14s; }\n"
            ".js .projects > a:nth-child(1) .project { transition-delay: 0s; }")

for name in PAGES:
    p = ROOT / name
    s = rd(p)
    changed = False

    # stagger
    if OLD_STAG in s:
        s = s.replace(OLD_STAG, NEW_STAG, 1)
        changed = True
        print(f'OK stagger: {name}')
    elif NEW_STAG in s:
        print(f'SKIP stagger: {name}')
    else:
        print(f'MISS stagger: {name}')

    # 2) attribute i18n support inside apply()
    old_apply = ('          var key = nodes[i].getAttribute("data-i18n");\n'
                 '          if (I18N[lang] && I18N[lang][key] != null) nodes[i].innerHTML = I18N[lang][key];\n'
                 '        }\n')
    new_apply = ('          var key = nodes[i].getAttribute("data-i18n");\n'
                 '          if (I18N[lang] && I18N[lang][key] != null) nodes[i].innerHTML = I18N[lang][key];\n'
                 '        }\n'
                 '        var attrs = document.querySelectorAll("[data-i18n-alt], [data-i18n-aria]");\n'
                 '        for (var n = 0; n < attrs.length; n++) {\n'
                 '          var k = attrs[n].getAttribute("data-i18n-alt") || attrs[n].getAttribute("data-i18n-aria");\n'
                 '          var v = I18N[lang] && I18N[lang][k] != null ? I18N[lang][k] : null;\n'
                 '          if (v == null) continue;\n'
                 '          if (attrs[n].hasAttribute("data-i18n-aria")) attrs[n].setAttribute("aria-label", v);\n'
                 '          else attrs[n].setAttribute("alt", v);\n'
                 '        }\n')
    if old_apply in s:
        s = s.replace(old_apply, new_apply, 1)
        changed = True
        print(f'OK apply(): {name}')
    elif 'data-i18n-aria' in s and 'apply()' in s:
        print(f'SKIP apply(): {name}')
    else:
        print(f'MISS apply(): {name}')

    # 3) dictionary: add new keys to both languages
    m = re.search(r'var I18N = (\{.*?\});\n', s)
    if m:
        d = json.loads(m.group(1))
        for lang in ('en', 'ru'):
            if lang in d:
                for k, (en, ru) in NEW_KEYS.items():
                    d[lang][k] = en if lang == 'en' else ru
        compact = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
        s = s[:m.start()] + 'var I18N = ' + compact + ';\n' + s[m.end():]
        changed = True
        print(f'OK dict: {name}')
    else:
        print(f'MISS dict: {name}')

    if changed:
        wr(p, s)

# 4) card markup: wire data-i18n-aria / data-i18n-alt (readyproject only)
rp = ROOT / 'readyproject.html'
s = rd(rp)
pairs = [
    ('aria-label="Открыть сайт VELTOR AUTO"', 'data-i18n-aria="proj.open1"'),
    ('aria-label="Открыть сайт MORROW COFFEE"', 'data-i18n-aria="proj.open2"'),
    ('aria-label="Открыть сайт BYTECARE LAB"', 'data-i18n-aria="proj.open3"'),
    ('alt="VELTOR AUTO — независимый автосервис: автомобиль на диагностическом подъёмнике"',
     'data-i18n-alt="proj.alt1" alt="VELTOR AUTO — независимый автосервис: автомобиль на диагностическом подъёмнике"'),
    ('alt="MORROW COFFEE — specialty-кофейня: уютный лаунж-зал с мягкими диванами и тёплым светом медных ламп"',
     'data-i18n-alt="proj.alt2" alt="MORROW COFFEE — specialty-кофейня: уютный лаунж-зал с мягкими диванами и тёплым светом медных ламп"'),
    ('alt="BYTECARE LAB — мастерская по ремонту компьютеров: диагностика ноутбука"',
     'data-i18n-alt="proj.alt3" alt="BYTECARE LAB — мастерская по ремонту компьютеров: диагностика ноутбука"'),
]
for old, new in pairs:
    if old in s:
        s = s.replace(old, new, 1)
        print(f'OK markup: {old[:40]!r}')
    else:
        print(f'MISS markup: {old[:40]!r}')
wr(rp, s)

print('DONE')
