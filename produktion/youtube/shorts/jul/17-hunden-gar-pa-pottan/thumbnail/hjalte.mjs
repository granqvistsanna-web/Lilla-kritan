// Hjältebild till lucka 17 (042 Hunden går på pottan), som lucka 19:s hjalte.mjs: scenens sida laddas, rad 21 får en egen pose
// och kamera, och bilden tas. Hunden sitter jätteglad på den röda pottan med armarna ut, nära, ansiktet kring x 1200–1425,
// vänstra tredjedelen bara kakelvägg (kritstrimman), högra nedre hörnet tomt (tidsbrickan).
//   node hjalte.mjs  ->  hjalte.png + miniatyr-utan-text.png
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../../../..');
const [Z = 1.9, CX = 380, CY = 640] = process.argv.slice(2).map(Number);
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    const typ = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' }[req.url.match(/\.\w+$/)?.[0]] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': typ }); res.end(data); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/042-hunden-gar-pa-pottan/scener/badrummet/index.html`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.ready);
await p.evaluate(([z, cx, cy]) => {
  S['21'] = tl => { badrum(); kamera(z, cx, cy);
    hund(B_POTTA, ANS('skrattar', { titt: [0, 2] }), { ...SITTER, armar: [70, 70], oron: [-6, -6] }); };
  window.seek(RR['21'].s + RR['21'].d * 0.5);
}, [Z, CX, CY]);
await p.screenshot({ path: join(HAR, 'hjalte.png') });
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, 'hjalte.png'), '-vf', 'scale=1280:720', join(HAR, 'miniatyr-utan-text.png')]);
console.log('hjalte.png miniatyr-utan-text.png');
await b.close(); server.close();
