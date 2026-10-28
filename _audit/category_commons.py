# -*- coding: utf-8 -*-
import json, sys, urllib.request, urllib.parse

sys.stdout.reconfigure(encoding='utf-8')
UA = {'User-Agent': 'LumicomAudit/1.0 (local use)'}

def api(params):
    params.setdefault('format', 'json')
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=UA)
    return json.load(urllib.request.urlopen(req, timeout=30))

CATS = [
    'Category:Interiors of coffeehouses',
    'Category:Coffeehouses interiors',
    'Category:Cafés interior',
    'Category:Coffee shops',
    'Category:Coffeehouse',
]
for cat in CATS:
    try:
        d = api({'action': 'query', 'generator': 'categorymembers', 'gcmtitle': cat,
                 'gcmtype': 'file', 'gcmlimit': 60, 'prop': 'imageinfo',
                 'iiprop': 'url|size|mime|extmetadata', 'iiurlwidth': 2400})
    except Exception as e:
        print('ERR', cat, e)
        continue
    pages = d.get('query', {}).get('pages', {})
    if not pages:
        print('--- EMPTY:', cat)
        continue
    print('=== ' + cat)
    for p in pages.values():
        ii = p.get('imageinfo', [{}])[0]
        if ii.get('mime') != 'image/jpeg':
            continue
        w, h = ii.get('width', 0), ii.get('height', 0)
        if w < 1900 or w / h < 1.15 or w / h > 1.9:
            continue
        em = ii.get('extmetadata', {})
        lic = em.get('LicenseShortName', {}).get('value', '?')
        art = em.get('Artist', {}).get('value', '')
        title = p['title'].replace('File:', '')
        print(f'{title} | {w}x{h} | {lic}')
        print('   thumb:', ii.get('thumburl', ''))
