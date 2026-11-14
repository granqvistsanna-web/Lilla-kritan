// Figurerna till mix 4:s miniatyr: en genomskinlig PNG per figur ur riggarnas uttryck.html (?bara=<uttryck>&pose=<pose>).
// Kör från repots rot med en server igång (egen server i skriptet): node produktion/youtube/mix/mix-4/thumbnail/hjalte/figurer.mjs
import { join, dirname } from 'node:path'; import { homedir } from 'node:os'; import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises';
const ROT = join(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const TYP = { html: 'text/html', png: 'image/png', jpg: 'image/jpeg', js: 'text/javascript', json: 'application/json', svg: 'image/svg+xml' };
const srv = createServer(async (q, s) => { try { const f = join(ROT, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html'));
  const d = await readFile(f); s.writeHead(200, { 'content-type': TYP[f.split('.').pop()] ?? 'application/octet-stream' }); s.end(d); } catch { s.writeHead(404); s.end(); } }).listen(0);
const BAS = `http://127.0.0.1:${srv.address().port}`;
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url));
const FIG = [['musen-mille', 'jatteglad', 'hurra'], ['lejonet-lage', 'jatteglad', 'hurra'], ['lammet-ludde', 'glad', 'neutral']];
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
for (const [namn, u, pose] of FIG) {
  await p.goto(`${BAS}/assets/karaktarer/${namn}/premium/uttryck.html?bara=${u}&pose=${pose}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => { window.stilla = true; document.body.style.background = 'transparent';
    document.querySelector('svg > rect').remove(); document.getElementById('etiketter').remove(); window.render(2); });
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(HAR, `${namn}.png`), omitBackground: true });
}
await b.close(); srv.close();
