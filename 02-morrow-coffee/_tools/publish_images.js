'use strict';
/* Публикация изображений: копирует выбранные кандидаты из staging в images/,
   проверяет JPEG-магию и размер, собирает _tools/credits.json.
   Зависимости: только fs/path (Node без npm). */
const fs = require('fs');
const path = require('path');

const ROOT = 'D:/PROJECT/Lumicom/02-morrow-coffee';
const STAGE = 'C:/Temp/opencode/morrow_imgs';
const SEL = path.join(__dirname, 'selected.json');
const CRED = path.join(__dirname, 'credits.json');

const selected = JSON.parse(fs.readFileSync(SEL, 'utf8'));

// Собираем метаданные из всех meta-файлов staging
const meta = {};
const metaFiles = fs.readdirSync(STAGE).filter((f) => /^meta\d*\.json$/i.test(f));
for (const mf of metaFiles) {
  const j = JSON.parse(fs.readFileSync(path.join(STAGE, mf), 'utf8'));
  for (const arr of Object.values(j)) for (const e of arr) meta[e.file] = e;
}

let fails = 0;
const fail = (m) => { fails++; console.log('FAIL ' + m); };
fs.mkdirSync(path.join(ROOT, 'images'), { recursive: true });

const credits = [];
for (const [finalName, srcName] of Object.entries(selected)) {
  const m = meta[srcName];
  if (!m) { fail('нет метаданных для ' + srcName); continue; }
  const src = path.join(STAGE, srcName);
  const dst = path.join(ROOT, 'images', finalName);
  if (!fs.existsSync(src)) { fail('нет файла ' + src); continue; }
  const buf = fs.readFileSync(src);
  if (!(buf[0] === 0xff && buf[1] === 0xd8)) { fail('не JPEG: ' + srcName); continue; }
  if (buf.length > 5 * 1024 * 1024) { fail('больше 5МБ: ' + srcName); continue; }
  fs.copyFileSync(src, dst);
  credits.push({ file: finalName, title: m.title, author: m.artist, license: m.lic, source: m.descurl });
  console.log('ok ' + finalName + ' <- ' + srcName + ' (' + Math.round(buf.length / 1024) + 'KB, ' + (m.lic || '?') + ')');
}

fs.writeFileSync(CRED, JSON.stringify(credits, null, 2), 'utf8');
console.log('credits written: ' + credits.length);

// markdown для README
for (const c of credits) {
  console.log('| `' + c.file + '` | ' + c.author + ' | [' + c.license + '](' + c.source + ') |');
}
process.exit(fails === 0 ? 0 : 1);
