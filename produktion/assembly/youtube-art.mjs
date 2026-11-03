// Renders the YouTube channel art from code-shot/youtube-art (one layout per ?v=) as PNGs at YouTube's sizes into youtube/.
//   node assembly/youtube-art.mjs
import { chromium } from '/Users/sannagranqvist/.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const page = pathToFileURL(resolve('code-shot/youtube-art/index.html')).href;
const shots = [ // [layout, file, scale (1920×1080 frame → output), clip in frame px]
  ['thumb', 'thumbnail-bakgrund.png', 2 / 3],
  ['thumbtext', 'thumbnail-leka-boll.png', 2 / 3],
  ['banner', 'kanalbanner.png', 4 / 3],
  ['avatar', 'profilbild.png', 800 / 1080, { x: 420, y: 0, width: 1080, height: 1080 }],
];
const b = await chromium.launch();
for (const [v, file, scale, clip] of shots) {
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale });
  await p.goto(`${page}?v=${v}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => Promise.all([document.fonts.ready, window.ready]));
  await p.screenshot({ path: `youtube/${file}`, clip });
  console.log(`youtube/${file}`);
}
await b.close();
