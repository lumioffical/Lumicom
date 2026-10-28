/* One-off QA: verify all pages exist and every relative href/src points to a real file. */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGES = [
  'index.html', 'services.html', 'service-detail.html',
  'prices.html', 'about.html', 'contacts.html'
];
const MUST_EXIST = PAGES.concat(['css/style.css', 'css/fonts.css', 'js/main.js', 'README.md']);

let fails = [];

for (const f of MUST_EXIST) {
  if (!fs.existsSync(path.join(ROOT, f))) fails.push('missing required file: ' + f);
}

const attrRe = /\s(?:href|src)="([^"]+)"/g;

for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const refs = [];
  let m;
  attrRe.lastIndex = 0;
  while ((m = attrRe.exec(html)) !== null) refs.push(m[1]);

  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/i.test(ref)) continue;
    if (ref.startsWith('#')) continue;
    if (/^[a-zA-Z]:[\\/]/.test(ref) || ref.includes('\\')) {
      fails.push(page + ': absolute/backslash path: ' + ref);
      continue;
    }
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(ROOT, clean);
    if (!fs.existsSync(target)) fails.push(page + ': broken ref: ' + ref);
  }

  if (/lorem/i.test(html)) fails.push(page + ': lorem found');
  if (/C:\\/.test(html)) fails.push(page + ': C:\\ found');
}

console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'PASS — all refs resolve');
process.exit(fails.length ? 1 : 0);
