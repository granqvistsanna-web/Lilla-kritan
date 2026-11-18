// node produktion/youtube/mix/mix-5/thumbnail/hjalte/render.mjs  → ../miniatyr-utan-text.png (1280×720)
import { join, dirname } from 'node:path'; import { homedir } from 'node:os'; import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises';
const ROT = join(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const TYP = { html: 'text/html', png: 'image/png', jpg: 'image/jpeg', js: 'text/javascript', json: 'application/json', svg: 'image/svg+xml' };
const srv = createServer(async (q, s) => { try { const f = join(ROT, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html'));
  const d = await readFile(f); s.writeHead(200, { 'content-type': TYP[f.split('.').pop()] ?? 'application/octet-stream' }); s.end(d); } catch { s.writeHead(404); s.end(); } }).listen(0);
const BAS = `http://127.0.0.1:${srv.address().port}`;
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(`${BAS}/produktion/youtube/mix/mix-5/thumbnail/hjalte/`, { waitUntil: 'networkidle' });
await p.screenshot({ path: join(dirname(fileURLToPath(import.meta.url)), '../miniatyr-utan-text.png') });
await b.close(); srv.close();
