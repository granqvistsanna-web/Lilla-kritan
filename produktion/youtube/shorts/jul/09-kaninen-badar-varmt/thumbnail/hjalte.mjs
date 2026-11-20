// Hjältebilden till lucka 9 (041 Kaninen badar varmt): badets scen vid rad 19 (kaninen leker med båten i skummet),
// med en egen pose och kamera för miniatyren: kaninen jätteglad till höger, båten bredvid, kakelväggen fri till vänster.
//   node hjalte.mjs [zoom cx cy]  ->  hjalte.png (1920×1080) och miniatyr-utan-text.png (1280×720)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../../../..');
const [zoom = 2.0, cx = 1210, cy = 420, bx = 60] = process.argv.slice(2).filter(a => !isNaN(a)).map(Number);
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    const typ = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' }[req.url.match(/\.\w+$/)?.[0]] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': typ }); res.end(data); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/041-kaninen-badar-varmt/scener/badet/index.html`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.ready);
await p.evaluate(([z, x, y, bx, m]) => {
  // kaninen skrattar i det varma skummet, tittar på oss, öronen uppe; båten guppar bredvid
  S['19'] = tl => BAD({ kam: [z, x, y], anga: 0.6, f: FF(m, { titt: [0, 2] }), p: P({ oron: [-10, -10] }), bat: [BAT()[0] + bx, 0] });
}, [zoom, cx, cy, bx, process.env.MIN ?? 'skrattar']);
await p.evaluate(() => window.seek(RR['19'].s + 1.0));
await p.screenshot({ path: join(HAR, 'hjalte.png') });
await b.close(); server.close();
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, 'hjalte.png'), '-vf', 'scale=1280:720', join(HAR, 'miniatyr-utan-text.png')]);
console.log('hjalte.png och miniatyr-utan-text.png');
