// Hjältebilden till lucka 15 (045 Lammet bakar pepparkakor): julköket vid rad 35, lammet jätteglatt med stjärnkakan i tassen,
// med en egen pose och kamera för miniatyren: kameran till vänster om lammet så att det hamnar till höger (ingen spegling).
//   node hjalte.mjs [zoom cx cy]  ->  hjalte.png (1920×1080) och miniatyr-utan-text.png (1280×720)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../../../..');
const [zoom = 2.1, cx = 720, cy = 520, kx = 900] = process.argv.slice(2).filter(a => !isNaN(a)).map(Number);
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    const typ = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' }[req.url.match(/\.\w+$/)?.[0]] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': typ }); res.end(data); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/045-lammet-bakar-pepparkakor/scener/julkoket/index.html`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.ready);
await p.evaluate(([z, x, y]) => {
  // lammet jätteglatt med öppna ögon, tittar på oss, öronen upp, stjärnkakan (med tuggan) i tassen framför sig
  S['35'] = tl => { kok(); kamera(z, x, y); lamm(ANS('jatteglad', { titt: [0, 2] }), { ...HALL(), oron: [-10, -10] }); };
}, [zoom, cx, cy]);
await p.evaluate(() => window.seek(RR['35'].s + 1.0));
await p.screenshot({ path: join(HAR, 'hjalte.png') });
await b.close(); server.close();
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, 'hjalte.png'), '-vf', 'scale=1280:720', join(HAR, 'miniatyr-utan-text.png')]);
console.log('hjalte.png och miniatyr-utan-text.png');
