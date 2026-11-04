// Renderar moln-övergången som genomskinliga PNG-bilder: moln/bilder/0000.png… (30 fps, D sekunder, hälften in, hälften ut).
import { homedir } from 'os'; import { join, dirname } from 'path'; import { fileURLToPath } from 'url'; import { mkdirSync, rmSync } from 'fs';
import { createServer } from 'http'; import { readFile } from 'fs/promises';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = join(HAR, '../..'), D = +(process.argv[2] ?? 1.6), FPS = 30;
const server = createServer(async (q, s) => { try { const p = join(ROT, decodeURIComponent(q.url.split('?')[0]));
  s.writeHead(200, { 'content-type': p.endsWith('.html') ? 'text/html' : p.endsWith('.png') ? 'image/png' : 'text/plain' }); s.end(await readFile(p)); }
  catch { s.writeHead(404); s.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://127.0.0.1:${server.address().port}/film/moln/index.html`); await p.evaluate(() => window.ready);
const ut = join(HAR, 'bilder'); rmSync(ut, { recursive: true, force: true }); mkdirSync(ut);
const n = Math.round(D * FPS);
for (let f = 0; f < n; f++) { await p.evaluate(s => window.seek(s), 2 * f / (n - 1));
  await p.screenshot({ path: join(ut, String(f).padStart(4, '0') + '.png'), omitBackground: true }); }
await b.close(); server.close(); console.log(ut, n);
