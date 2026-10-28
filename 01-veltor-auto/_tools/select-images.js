'use strict';
const fs = require('fs');
const path = require('path');

const PROJ = 'D:/PROJECT/Lumicom/01-veltor-auto';
const IMG = path.join(PROJ, 'images');

const MAP = [
  { src: '_tools/stage3/q45_1.jpg', name: 'hero-workshop.jpg' },
  { src: '_tools/stage3/q45_2.jpg', name: 'wheel-alignment.jpg' },
  { src: '_tools/stage3/q49_2.jpg', name: 'oil-cap.jpg' },
  { src: '_tools/stage/q3_0.jpg', name: 'brake-caliper.jpg' },
  { src: '_tools/stage/q6_0.jpg', name: 'obd-diagnostics.jpg' },
  { src: '_tools/stage/q7_2.jpg', name: 'wheel-balancing.jpg' },
  { src: '_tools/stage/q9_1.jpg', name: 'history-mechanic.jpg' },
  { src: '_tools/stage6/q102.jpg', name: 'suspension-work.jpg' },
  { src: '_tools/stage6/q109.jpg', name: 'workshop-lift.jpg' },
  { src: '_tools/stage8/q160.jpg', name: 'suspension-measure.jpg' },
  { src: '_tools/stage2/q24_2.jpg', name: 'oil-refill.jpg' },
];

const manifests = [
  JSON.parse(fs.readFileSync(path.join(PROJ, '_tools/stage/manifest.json'), 'utf8')),
  JSON.parse(fs.readFileSync(path.join(PROJ, '_tools/stage2/manifest2.json'), 'utf8')),
  JSON.parse(fs.readFileSync(path.join(PROJ, '_tools/stage3/manifest3.json'), 'utf8')),
  JSON.parse(fs.readFileSync(path.join(PROJ, '_tools/stage6/manifest6.json'), 'utf8')),
  JSON.parse(fs.readFileSync(path.join(PROJ, '_tools/stage8/manifest8.json'), 'utf8')),
];
function find(qf) {
  for (const m of manifests) {
    const hit = m.find((x) => x.file === qf + '.jpg' || x.file === qf);
    if (hit) return hit;
  }
  return null;
}
const qfs = ['q3_0', 'q6_0', 'q7_2', 'q9_1', 'q24_2', 'q45_1', 'q45_2', 'q49_2', 'q102', 'q109', 'q160'];

const credits = [];
for (const it of MAP) {
  fs.copyFileSync(path.join(PROJ, it.src), path.join(IMG, it.name));
  const q = (it.src.match(/(q\d+_\d+|q\d+)\.jpg/) || [])[1];
  const src = find(q);
  if (src) credits.push({ image: it.name, title: src.title, author: src.artist || 'Unknown', license: src.license, source: src.desc });
}
fs.writeFileSync(path.join(PROJ, '_tools/credits.json'), JSON.stringify(credits, null, 2));
let total = 0;
for (const it of MAP) total += fs.statSync(path.join(IMG, it.name)).size;
console.log('Copied', MAP.length, 'images, total bytes:', total);
for (const c of credits) console.log(c.image, '|', c.author, '|', c.license, '|', c.source);
