# -*- coding: utf-8 -*-
"""Lumicom full QA: crawl every page at many viewports, report console errors,
failed requests, broken images and horizontal overflow."""
import sys, json, io
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

BASE = r'D:\PROJECT\Lumicom'

PAGES = [
    ('portfolio', 'index.html'),
    ('portfolio', 'about.html'),
    ('portfolio', 'contact.html'),
    ('portfolio', 'readyproject.html'),
    ('veltor', '01-veltor-auto/index.html'),
    ('veltor', '01-veltor-auto/about.html'),
    ('veltor', '01-veltor-auto/services.html'),
    ('veltor', '01-veltor-auto/service-detail.html'),
    ('veltor', '01-veltor-auto/prices.html'),
    ('veltor', '01-veltor-auto/contacts.html'),
    ('morrow', '02-morrow-coffee/index.html'),
    ('morrow', '02-morrow-coffee/about.html'),
    ('morrow', '02-morrow-coffee/menu.html'),
    ('morrow', '02-morrow-coffee/coffee.html'),
    ('morrow', '02-morrow-coffee/bakery.html'),
    ('morrow', '02-morrow-coffee/contacts.html'),
    ('bytecare', '03-bytecare-lab/index.html'),
    ('bytecare', '03-bytecare-lab/services.html'),
    ('bytecare', '03-bytecare-lab/diagnostics.html'),
    ('bytecare', '03-bytecare-lab/prices.html'),
    ('bytecare', '03-bytecare-lab/warranty.html'),
    ('bytecare', '03-bytecare-lab/contacts.html'),
]

VIEWPORTS = [(320, 720), (360, 760), (390, 800), (430, 850), (768, 1000),
             (1024, 768), (1280, 900), (1440, 900), (1920, 1000)]

import pathlib
issues = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    for site, rel in PAGES:
        url = pathlib.Path(BASE).joinpath(rel).as_uri()
        for vw, vh in VIEWPORTS:
            page = browser.new_page(viewport={'width': vw, 'height': vh})
            console_msgs = []
            failed = []
            page.on('console', lambda m: console_msgs.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
            page.on('requestfailed', lambda r: failed.append(f'{r.url} :: {r.failure}'))
            page.on('response', lambda r: failed.append(f'HTTP {r.status} {r.url}') if r.status >= 400 else None)
            try:
                page.goto(url, wait_until='networkidle', timeout=30000)
            except Exception as e:
                issues.append(f'{rel} @{vw}px: goto failed: {e}')
                page.close()
                continue
            # scroll through the page to trigger lazy loading
            page.evaluate('''async () => {
                const step = Math.max(300, window.innerHeight * 0.7);
                for (let y = 0; y < document.body.scrollHeight; y += step) {
                    window.scrollTo(0, y);
                    await new Promise(r => setTimeout(r, 60));
                }
                window.scrollTo(0, document.body.scrollHeight);
                await new Promise(r => setTimeout(r, 150));
                window.scrollTo(0, 0);
            }''')
            page.wait_for_timeout(500)
            # broken images
            broken_imgs = page.evaluate('''() => {
                const out = [];
                document.querySelectorAll('img').forEach(img => {
                    if (!img.complete || img.naturalWidth === 0) {
                        out.push(img.getAttribute('src') || '(no src)');
                    }
                });
                return out;
            }''')
            for b in broken_imgs:
                issues.append(f'BROKEN IMG {rel}: {b} @{vw}px')
            # horizontal overflow
            overflow = page.evaluate('''() => {
                const d = document.documentElement;
                const bw = document.body.scrollWidth;
                const dw = d.clientWidth;
                const has = d.scrollWidth > d.clientWidth + 1;
                // find widest offending element
                let widest = null, wmax = 0;
                document.querySelectorAll('body *').forEach(el => {
                    const r = el.getBoundingClientRect();
                    if (r.width > wmax && r.right > dw + 1) { wmax = r.width; widest = (el.tagName + '.' + (el.className||'')).slice(0, 120); }
                });
                return {has, sw: d.scrollWidth, dw, widest};
            }''')
            if overflow['has']:
                issues.append(f"H-SCROLL {rel} @{vw}px: scrollWidth={overflow['sw']} clientWidth={overflow['dw']} widest={overflow['widest']}")
            # page-level errors only (dedup per page)
            if vw == 1280:
                for c in console_msgs:
                    if 'error' in c.lower():
                        issues.append(f'CONSOLE {rel}: {c[:200]}')
                for f in failed:
                    issues.append(f'NET {rel}: {f[:200]}')
            page.close()
    browser.close()

# dedupe
seen = set(); uniq = []
for i in issues:
    if i not in seen:
        seen.add(i); uniq.append(i)

print(f'ISSUES: {len(uniq)}')
for i in uniq:
    print(i)
