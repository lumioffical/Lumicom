# -*- coding: utf-8 -*-
import sys, urllib.request, urllib.parse, os, json, time
sys.stdout.reconfigure(encoding='utf-8')
UA = {'User-Agent': 'LumicomAudit/1.0 (local use)'}
outdir = r'D:\PROJECT\Lumicom\_audit'

def get_url(title, width=1920):
    url = ('https://commons.wikimedia.org/w/api.php?action=query&titles='
           + urllib.parse.quote(title) + '&prop=imageinfo&iiprop=url&iiurlwidth=%d&format=json' % width)
    req = urllib.request.Request(url, headers=UA)
    d = json.load(urllib.request.urlopen(req, timeout=30))
    for p in d.get('query', {}).get('pages', {}).values():
        ii = p.get('imageinfo', [{}])[0]
        return ii.get('thumburl') or ii.get('url')
    return None

TITLES = {
    'cand10-happy-goat.jpg': 'File:Happy Goat Coffee (35006899851).jpg',
    'cand11-cafe-ra-man.jpg': 'File:Café ら萬(20211105) 05.jpg',
    'cand12-good-coffee-society.jpg': 'File:Good Coffee Society.jpg',
    'cand13-brod-salt.jpg': 'File:Interior of café Bröd & Salt.jpg',
}
for name, title in TITLES.items():
    for attempt in range(3):
        try:
            u = get_url(title)
            if not u:
                print('NOURL', name); break
            req = urllib.request.Request(u, headers=UA)
            data = urllib.request.urlopen(req, timeout=60).read()
            with open(os.path.join(outdir, name), 'wb') as f:
                f.write(data)
            print('OK', name, len(data))
            break
        except Exception as e:
            print('FAIL', name, attempt, e)
            time.sleep(4)
    time.sleep(2)
