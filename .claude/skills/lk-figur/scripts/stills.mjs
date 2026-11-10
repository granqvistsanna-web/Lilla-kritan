// node .claude/skills/lk-figur/scripts/stills.mjs <sida relativt repo> <ut-prefix> t1 t2 ...  -> PNG per t (render(t) med window.stilla)
// Slutar <ut> på .jpg blir det i stället ETT kontaktark: bilderna i den ordning tiderna anges, tiden i hörnet, 4 i bredd.
// (Lösa PNG:er sorteras fel av *-glob: 12.2 hamnar före 3.5. Arket håller ordningen.)
import { execFileSync } from 'node:child_process'; import { mkdtempSync } from 'node:fs'; import { tmpdir } from 'node:os';
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
const ark = ut.endsWith('.jpg'), dir = ark ? mkdtempSync(join(tmpdir(), 'ark-')) : '';
if (ark) await p.evaluate(() => document.querySelector('svg').insertAdjacentHTML('beforeend',
  '<text id="_t" x="40" y="90" style="font:700 72px system-ui;fill:#fff;stroke:#000;stroke-width:8;paint-order:stroke;text-anchor:start"/>'));
for (const [i, t] of ts.entries()) {
  await p.evaluate(t => { window.render(+t); const e = document.getElementById('_t'); if (e) e.textContent = t + ' s'; }, t);
  await p.waitForTimeout(80);
  await (await p.$('svg')).screenshot({ path: ark ? join(dir, String(i).padStart(3, '0') + '.png') : `${ut}-${t}.png` }); }
await b.close(); srv.close();
if (ark) execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(dir, '%03d.png'), '-vf',
  `scale=640:-1,tile=${Math.min(4, ts.length)}x${Math.ceil(ts.length / 4)}`, '-frames:v', '1', ut]);
