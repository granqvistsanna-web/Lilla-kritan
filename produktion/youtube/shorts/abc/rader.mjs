// Skriver ut rösterna i en ABC-scen som JSON [[t, fil], …] ur window.LJUD (filmtid = scentid). Används av srt.py.
//   node produktion/youtube/shorts/abc/rader.mjs produktion/youtube/alfabet/abc-a-recept-3
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises'; import { join, extname, resolve, relative } from 'node:path'; import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = process.cwd(), dir = resolve(process.argv[2]);
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };
const s = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); r.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${s.address().port}/${relative(ROT, dir)}/index.html`, { waitUntil: 'networkidle' }); await p.waitForFunction(() => window.ready); await p.evaluate(() => window.ready);
console.log(JSON.stringify(await p.evaluate(() => window.LJUD.filter(c => /roster\//.test(c.fil)).map(c => [c.t, c.fil]).sort((a, b) => a[0] - b[0]))));
await b.close(); s.close();
