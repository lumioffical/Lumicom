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
    'cand7-alexander-baranov.jpg': 'File:File by Alexander Baranov - (15684315575).jpg',
    'cand8-one-of-those-evenings.jpg': 'File:(14-365) One of those evenings.. (5185314511).jpg',
    'cand9-cute-cafe.jpg': 'File:Cute cafe (8314434643).jpg',
}
for name, title in TITLES.items():
    try:
        u = get_url(title)
        print('URL', name, u)
        if u:
            req = urllib.request.Request(u, headers=UA)
            data = urllib.request.urlopen(req, timeout=60).read()
            with open(os.path.join(outdir, name), 'wb') as f:
                f.write(data)
            print('OK', name, len(data))
    except Exception as e:
        print('FAIL', name, e)
    time.sleep(1)
