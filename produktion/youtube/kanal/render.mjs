// Renderar kanalbilderna: node render.mjs  ->  kanalbanner.png (2560×1440) och profilbild.png (800×800) och vattenstampel.png (300×300, genomskinlig) i den här mappen.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, resolve, relative, extname, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../..');
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(await readFile(fil)); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const bas = `http://localhost:${server.address().port}/${relative(ROT, HAR)}/index.html`;
const b = await chromium.launch();
for (const [hash, w, h, ut] of [['', 2560, 1440, 'kanalbanner.png'], ['#profil', 800, 800, 'profilbild.png'], ['#vattenstampel', 300, 300, 'vattenstampel.png']]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on('pageerror', e => console.error('sidfel:', e.message));
  await p.goto(bas + hash, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.ready);
  await p.evaluate(() => window.ready);
  await p.evaluate(() => window.seek(0));
  await p.screenshot({ path: join(HAR, ut), omitBackground: true });
  console.log(join(HAR, ut));
}
await b.close(); server.close();
