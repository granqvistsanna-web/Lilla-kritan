// Fångar papperet och det ritade hjulet ur kritan-ritars sista ruta, för scen A:s första ruta (matchklippet).
//   node a-busshallplatsen/klipp/fanga.mjs   (från scener/) → klipp/papper.png, klipp/hjul.png
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, resolve, dirname, extname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../../..');
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const server = createServer(async (q, s) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  s.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'application/octet-stream' }); s.end(await readFile(f)); } catch { s.writeHead(404); s.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/003-bussen-halsar-pa/kritan-ritar/index.html`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.ready);
const SIST = await p.evaluate(() => (window.DURATION * 30 - 1) / 30);
await p.evaluate(t => { window.seek(t); document.getElementById('kamera').style.display = 'none'; }, SIST);
await p.screenshot({ path: join(HAR, 'papper.png') });
await p.evaluate(t => {
  window.seek(t);
  const k = document.getElementById('kamera'); k.style.display = '';
  document.getElementById('kamera-papper').style.display = 'none';
  k.parentNode.removeAttribute('filter');                          // kokningen läggs på i scen A
  document.getElementById('hjul-snurr').setAttribute('transform', 'rotate(0)');
  document.body.style.background = document.documentElement.style.background = 'transparent';
}, SIST);
await p.screenshot({ path: join(HAR, 'hjul.png'), omitBackground: true, clip: { x: 1030, y: 591, width: 460, height: 461 } });
console.log('sista rutan', SIST);
await b.close(); server.close();
