// Hjältebilden till lucka 8 (044 Katten gör en snögubbe): björkdungens scen vid rad 36 (snögubben klar, fågeln på huvudet),
// med en egen pose och kamera för miniatyren. Spegelvänds så att katten står till höger och snögubben mitt i bild.
//   node hjalte.mjs [zoom cx cy]  ->  hjalte.png (1920×1080) och miniatyr-utan-text.png (1280×720)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../../../..');
const [zoom = 1.75, cx = 1226, cy = 620, kx = 990] = process.argv.slice(2).filter(a => !isNaN(a)).map(Number), RA = process.argv.includes('--ra');
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    const typ = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' }[req.url.match(/\.\w+$/)?.[0]] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': typ }); res.end(data); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/044-katten-gor-en-snogubbe/scener/bjorkdungen/index.html`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.ready);
await p.evaluate(([z, x, y, k, ra]) => {
  // snögubben klar med fågeln på huvudet; katten närmare snögubben, jätteglad (--ra: riggens egna glada ögon), tittar på oss, armarna ut
  kattX = () => ({ x: k, gar: false, vag: 0, dir: 1 });
  const f = ra ? { ...L.blanda('neutral', 'jatteglad', 1), titt: [0, 2] } : ANS('jatteglad', { titt: [0, 2] });
  S['36'] = tl => { scen(); kamera(z, x, y); katt(f, { upp: 0.7, armar: [38, 38] }); fagelNu(); };
}, [zoom, cx, cy, kx, RA]);
await p.evaluate(() => window.seek(RR['36'].s + RR['36'].d - 0.3));
await p.screenshot({ path: join(HAR, 'hjalte-rå.png') });   // tas bort efter spegelvändningen
await b.close(); server.close();
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, 'hjalte-rå.png'), '-vf', 'hflip', join(HAR, 'hjalte.png')]);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, 'hjalte.png'), '-vf', 'scale=1280:720', join(HAR, 'miniatyr-utan-text.png')]);
execFileSync('rm', [join(HAR, 'hjalte-rå.png')]); console.log('hjalte.png och miniatyr-utan-text.png');
