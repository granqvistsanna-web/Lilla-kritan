// Miniatyren som PNG: node render.mjs 17 -> miniatyr.png (1280×720)
import { homedir } from 'os'; import { join, dirname } from 'path'; import { fileURLToPath } from 'url';
import { createServer } from 'http'; import { readFile } from 'fs/promises'; import { execFileSync } from 'child_process';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = join(HAR, '../../../../..');
const typ = { html: 'text/html', png: 'image/png', js: 'text/javascript' };
const server = createServer(async (q, s) => { try { const p = join(ROT, decodeURIComponent(q.url.split('?')[0]));
  s.writeHead(200, { 'content-type': typ[p.split('.').pop()] ?? 'application/octet-stream' }); s.end(await readFile(p)); }
  catch { s.writeHead(404); s.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://127.0.0.1:${server.address().port}/produktion/youtube/mix/mix-2/thumbnail/index.html?min=${process.argv[2] ?? 17}`);
await p.waitForFunction(() => window.klar, null, { timeout: 30000 });
await p.screenshot({ path: join(HAR, 'stor.png') });
await b.close(); server.close();
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, 'stor.png'), '-vf', 'scale=1280:720:flags=lanczos', join(HAR, 'miniatyr.png')]);
console.log(join(HAR, 'miniatyr.png'));
