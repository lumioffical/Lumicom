# -*- coding: utf-8 -*-
import sys, urllib.request
sys.stdout.reconfigure(encoding='utf-8')
UA = {'User-Agent': 'LumicomAudit/1.0 (local use)'}

CANDS = {
    'cand1-coffee-shop-unsplash.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Coffee_shop_%28Unsplash%29.jpg/1600px-Coffee_shop_%28Unsplash%29.jpg',
    'cand2-gfp-room.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Gfp-random-room-at-coffee-shop.jpg',
    'cand3-datelighting.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Disabledandhere-025-datelighting.jpg',
    'cand4-credo.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Credo_Coffee_on_124_Street_%2815500046158%29.jpg/1600px-Credo_Coffee_on_124_Street_%2815500046158%29.jpg',
}
import os
outdir = r'D:\PROJECT\Lumicom\_audit'
os.makedirs(outdir, exist_ok=True)
for name, url in CANDS.items():
    try:
        req = urllib.request.Request(url, headers=UA)
        data = urllib.request.urlopen(req, timeout=60).read()
        path = os.path.join(outdir, name)
        with open(path, 'wb') as f:
            f.write(data)
        print('OK', name, len(data))
    except Exception as e:
        print('FAIL', name, e)
