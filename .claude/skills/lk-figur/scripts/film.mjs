// node .claude/skills/lk-figur/scripts/film.mjs <sida relativt repo> <ut.mp4> <sekunder>  -> 30 fps via render(t), ffmpeg
import { createServer } from 'node:http'; import { readFile, mkdir, rm } from 'node:fs/promises';
import { join, extname } from 'node:path'; import { homedir } from 'node:os'; import { execFileSync } from 'node:child_process';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = new URL('../../../../', import.meta.url).pathname, [sida, ut, sek] = process.argv.slice(2);
const T = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.json': 'application/json', '.m4a': 'audio/mp4' };
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  const d = await readFile(f); r.writeHead(200, { 'Content-Type': T[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${srv.address().port}/${sida}`); await p.waitForLoadState('networkidle');
await p.evaluate(() => { window.stilla = true; document.body.style.margin = 0; document.querySelector('svg').style.width = '1920px'; });
const dir = ut + '.rutor'; await rm(dir, { recursive: true, force: true }); await mkdir(dir);
const svg = await p.$('svg');
for (let i = 0; i < sek * 30; i++) { await p.evaluate(t => window.render(t), i / 30);
  await svg.screenshot({ path: `${dir}/${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 90 }); }
await b.close(); srv.close();
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30', '-i', `${dir}/%04d.jpg`, '-c:v', 'libx264', '-vf', 'scale=out_range=tv,format=yuv420p', '-crf', '20', '-movflags', '+faststart', ut]);
await rm(dir, { recursive: true });
