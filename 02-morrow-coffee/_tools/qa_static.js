'use strict';
/* QA: структура/ссылки/пути сайта MORROW COFFEE */
const fs = require('fs');
const path = require('path');

const ROOT = 'D:/PROJECT/Lumicom/02-morrow-coffee';
let fails = 0;
function fail(msg) { fails++; console.log('FAIL:', msg); }
function ok(msg) { console.log('ok:', msg); }

const REQUIRED = ['index.html', 'menu.html', 'coffee.html', 'bakery.html', 'about.html', 'contacts.html', 'css/style.css', 'js/main.js'];
for (const f of REQUIRED) {
  if (fs.existsSync(path.join(ROOT, f))) ok('exists ' + f);
  else fail('missing ' + f);
}

const fontFiles = fs.readdirSync(path.join(ROOT, 'fonts')).filter(f => f.endsWith('.woff2'));
if (fontFiles.length >= 8) ok('fonts: ' + fontFiles.length + ' woff2');
else fail('too few woff2: ' + fontFiles.length);

// Проверяю ссылки/срц во всех html
const htmls = REQUIRED.filter(f => f.endsWith('.html'));
const refRe = /(?:href|src)="([^"]+)"/g;
const allTargets = new Set();
for (const page of htmls) {
  const text = fs.readFileSync(path.join(ROOT, page), 'utf8');
  let m;
  while ((m = refRe.exec(text)) !== null) {
    const ref = m[1];
    if (ref.startsWith('mailto:') || ref.startsWith('tel:') || /^(https?:)?\/\//.test(ref)) continue;
    if (ref.startsWith('#')) continue;
    allTargets.add(ref);
    if (ref.includes('C:\\') || ref.startsWith('/') || ref.startsWith('file://')) {
      fail('absolute path ' + page + ' -> ' + ref);
    }
    const clean = ref.split('#')[0];
    if (!clean) continue;
    if (!fs.existsSync(path.join(path.join(ROOT, page, '..'), clean))) {
      fail('broken target ' + page + ' -> ' + ref);
    }
  }
}
console.log('targets checked:', allTargets.size);

// изображения, указанные в js/main.js
const js = fs.readFileSync(path.join(ROOT, 'js/main.js'), 'utf8');
const imgRe = /image:\s*'([^']+)'/g;
let im;
const images = new Set();
while ((im = imgRe.exec(js)) !== null) {
  images.add(im[1]);
  if (!fs.existsSync(path.join(ROOT, 'images', im[1]))) fail('missing menu image: ' + im[1]);
}

// img src в html
const imgSrcRe = /<img[^>]+src="([^"]+)"/g;
for (const page of htmls) {
  const text = fs.readFileSync(path.join(ROOT, page), 'utf8');
  let mm;
  while ((mm = imgSrcRe.exec(text)) !== null) {
    const src = mm[1].split('#')[0];
    if (!src || /^(https?:)/.test(src)) continue;
    images.add(src.replace('./images/', ''));
    if (!fs.existsSync(path.join(path.join(ROOT, page, '..'), src))) fail('missing img on ' + page + ': ' + src);
  }
}

const actualImages = fs.readdirSync(path.join(ROOT, 'images')).filter(f => /\.jpe?g$/i.test(f));
ok('images in images/: ' + actualImages.length);
for (const f of actualImages) {
  const buf = fs.readFileSync(path.join(ROOT, 'images', f));
  if (buf.length > 5 * 1024 * 1024) fail('oversize image: ' + f);
  if (!(buf[0] === 0xFF && buf[1] === 0xD8)) fail('not jpeg: ' + f);
}
const unused = actualImages.filter(f => !images.has(f) && !f.endsWith('-thumb.jpg'));
console.log('images referenced:', images.size, '| unused files:', unused.length ? unused.join(', ') : 'none');

// запрещённые строки
for (const page of htmls) {
  const text = fs.readFileSync(path.join(ROOT, page), 'utf8');
  if (/lorem/i.test(text)) fail('lorem in ' + page);
  if (/#"/.test(text.replace(/href="#(main|booking)"/g, ''))) fail('href="#" stub on ' + page);
}
if (/lorem/i.test(js)) fail('lorem in js');

// уникальность title/meta/h1
const titles = new Set(), descs = new Set();
for (const page of htmls) {
  const text = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const t = (text.match(/<title>([^<]+)<\/title>/) || [])[1];
  const d = (text.match(/<meta name="description" content="([^"]+)"/) || [])[1];
  const h1s = (text.match(/<h1>/g) || []).length;
  if (!t || titles.has(t)) fail('dup/missing title on ' + page);
  titles.add(t);
  if (!d || descs.has(d)) fail('dup/missing description on ' + page);
  descs.add(d);
  const h1count = (text.match(/<h1[\s>]/g) || []).length;
  if (h1count !== 1) fail('h1 count != 1 on ' + page + ' (' + h1count + ')');
  if (/<html lang="ru">/.test(text) === false) fail('lang=ru missing on ' + page);
}

console.log(fails === 0 ? 'ALL OK' : 'FAILURES: ' + fails);
process.exit(fails === 0 ? 0 : 1);
