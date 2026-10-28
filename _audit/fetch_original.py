# -*- coding: utf-8 -*-
import sys, urllib.request, urllib.parse, os, json
sys.stdout.reconfigure(encoding='utf-8')
UA = {'User-Agent': 'LumicomAudit/1.0 (local use)'}

TITLE = 'File:Interior of café Bröd & Salt.jpg'
url = ('https://commons.wikimedia.org/w/api.php?action=query&titles='
       + urllib.parse.quote(TITLE) + '&prop=imageinfo&iiprop=url|extmetadata&format=json')
req = urllib.request.Request(url, headers=UA)
d = json.load(urllib.request.urlopen(req, timeout=30))
orig_url, author, lic, srcpage = None, None, None, None
for p in d.get('query', {}).get('pages', {}).values():
    ii = p.get('imageinfo', [{}])[0]
    orig_url = ii.get('url')
    em = ii.get('extmetadata', {})
    author = em.get('Artist', {}).get('value', '')
    lic = em.get('LicenseShortName', {}).get('value', '')
    srcpage = em.get('DescriptionUrl', {}).get('value', '')

print('orig:', orig_url)
print('author:', author, '| license:', lic)
print('page:', srcpage)

req = urllib.request.Request(orig_url, headers=UA)
data = urllib.request.urlopen(req, timeout=120).read()
raw_path = r'D:\PROJECT\Lumicom\_audit\morrow-original.jpg'
with open(raw_path, 'wb') as f:
    f.write(data)
print('downloaded bytes:', len(data))

meta = {'title': TITLE, 'author': author, 'license': lic, 'source': srcpage}
with open(r'D:\PROJECT\Lumicom\_audit\morrow-meta.json', 'w', encoding='utf-8') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)
