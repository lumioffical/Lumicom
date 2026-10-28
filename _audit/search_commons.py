# -*- coding: utf-8 -*-
import json, sys, urllib.request, urllib.parse

sys.stdout.reconfigure(encoding='utf-8')

QUERIES = [
    'coffee shop interior armchair lamp cozy',
    'cafe interior sofa warm light',
    'coffeehouse interior lounge',
    'coffee shop interior wooden tables lamps',
]

for qtext in QUERIES:
    url = ('https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch='
           + urllib.parse.quote(qtext)
           + '&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=2400&format=json')
    req = urllib.request.Request(url, headers={'User-Agent': 'LumicomAudit/1.0 (local use)'})
    try:
        d = json.load(urllib.request.urlopen(req, timeout=30))
    except Exception as e:
        print('ERROR', qtext, e)
        continue
    print('=== QUERY:', qtext)
    for p in d.get('query', {}).get('pages', {}).values():
        ii = p.get('imageinfo', [{}])[0]
        em = ii.get('extmetadata', {})
        lic = em.get('LicenseShortName', {}).get('value', '?')
        art = em.get('Artist', {}).get('value', '?')
        w, h = ii.get('width', 0), ii.get('height', 0)
        ratio = (w / h) if h else 0
        print(f"{p['title']} | {w}x{h} ratio={ratio:.2f} | {ii.get('mime')} | {lic} | artist={art[:40]}")
        print('   thumb:', ii.get('thumburl', ''))
    print()
