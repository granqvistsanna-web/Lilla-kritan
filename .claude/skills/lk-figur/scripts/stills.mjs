// node .claude/skills/lk-figur/scripts/stills.mjs <sida relativt repo> <ut-prefix> t1 t2 ...  -> PNG per t (render(t) med window.stilla)
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path'; import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = new URL('../../../../', import.meta.url).pathname, [sida, ut, ...ts] = process.argv.slice(2);
const T = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.json': 'application/json', '.m4a': 'audio/mp4' };
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  const d = await readFile(f); r.writeHead(200, { 'Content-Type': T[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${srv.address().port}/${sida}`); await p.waitForLoadState('networkidle');
await p.evaluate(() => { window.stilla = true; document.body.style.background = '#000'; });
for (const t of ts) { await p.evaluate(t => window.render(+t), t); await p.waitForTimeout(80);
  await (await p.$('svg')).screenshot({ path: `${ut}-${t}.png` }); }
await b.close(); srv.close();
