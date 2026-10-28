# -*- coding: utf-8 -*-
import json, sys, urllib.request, urllib.parse, os
sys.stdout.reconfigure(encoding='utf-8')
UA = {'User-Agent': 'LumicomAudit/1.0 (local use)'}
outdir = r'D:\PROJECT\Lumicom\_audit'

def fetch(name, url):
    try:
        req = urllib.request.Request(url, headers=UA)
        data = urllib.request.urlopen(req, timeout=60).read()
        with open(os.path.join(outdir, name), 'wb') as f:
            f.write(data)
        print('OK', name, len(data))
    except Exception as e:
        print('FAIL', name, e)

fetch('cand1-coffee-shop-unsplash.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Coffee_shop_%28Unsplash%29.jpg/1920px-Coffee_shop_%28Unsplash%29.jpg')
fetch('cand5-jazzpeace.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Jazz_Peace_%2823875469%29.jpeg')
fetch('cand6-5togo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/52/5togo3.jpg')

# more categories
def api(params):
    params.setdefault('format', 'json')
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=UA)
    return json.load(urllib.request.urlopen(req, timeout=30))

for cat in ['Category:Interiors of cafés', 'Category:Café interiors', 'Category:Coffee shop furniture',
            'Category:Coffeehouses by country', 'Category:Espresso bars', 'Category:Lounge bars']:
    try:
        d = api({'action': 'query', 'generator': 'categorymembers', 'gcmtitle': cat,
                 'gcmtype': 'file', 'gcmlimit': 50, 'prop': 'imageinfo',
                 'iiprop': 'url|size|mime|extmetadata'})
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
        print(f"{p['title'].replace('File:','')} | {w}x{h} | {lic}")
