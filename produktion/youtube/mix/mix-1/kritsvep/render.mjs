// Renderar kritsvepet som genomskinliga PNG-bilder: bilder/<farg>/0000.png… (30 fps, 1,8 s som 003:s nya kritsvep).
// node render.mjs f2a33a 5ab0e8 ...
import { homedir } from 'os'; import { join, dirname } from 'path'; import { fileURLToPath } from 'url'; import { mkdirSync, rmSync } from 'fs';
import { createServer } from 'http'; import { readFile } from 'fs/promises';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = join(HAR, '../../../../..'), D = 1.8, FPS = 30;
const typ = { html: 'text/html', png: 'image/png', js: 'text/javascript', json: 'application/json' };
const server = createServer(async (q, s) => { try { const p = join(ROT, decodeURIComponent(q.url.split('?')[0]));
  s.writeHead(200, { 'content-type': typ[p.split('.').pop()] ?? 'application/octet-stream' }); s.end(await readFile(p)); }
  catch { s.writeHead(404); s.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
for (const farg of process.argv.slice(2)) {
  await p.goto(`http://127.0.0.1:${server.address().port}/produktion/youtube/mix/mix-1/kritsvep/index.html?farg=${farg}`);
  await p.evaluate(() => window.ready);
  const ut = join(HAR, 'bilder', farg); rmSync(ut, { recursive: true, force: true }); mkdirSync(ut, { recursive: true });
  const n = Math.round(D * FPS);
  for (let f = 0; f < n; f++) { await p.evaluate(k => window.seek(k), f / (n - 1));
    await p.screenshot({ path: join(ut, String(f).padStart(4, '0') + '.png'), omitBackground: true }); }
  console.log(ut, n);
}
await b.close(); server.close();
