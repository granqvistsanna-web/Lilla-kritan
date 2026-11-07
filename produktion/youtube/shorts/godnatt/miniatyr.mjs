// Miniatyr för en godnattsaga: bokomslaget (bok.js) ensamt på natthimlen, 1080×1920 PNG.
//   node produktion/youtube/shorts/godnatt/miniatyr.mjs lammet-ludde-fard   -> <saga>/thumbnail/miniatyr-omslag.png
// Tiden 2,2 s: omslaget har satt sig och månen blinkar inte.
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = '/Users/sannagranqvist/Documents/Lilla-kritan';
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json', '.m4a': 'audio/mp4' };
const server = createServer(async (req, res) => {
  const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { const f = (await stat(fil)).isDirectory() ? join(fil, 'index.html') : fil; res.writeHead(200, { 'content-type': TYP[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const scen = process.argv[2], ut = join(ROT, 'produktion/youtube/shorts/godnatt', scen, 'thumbnail'), tider = [2.2]; await mkdir(ut, { recursive: true });
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1080, height: 1920 } }), fel = [];
p.on('pageerror', e => fel.push(String(e))); p.on('console', m => m.type() === 'error' && fel.push(m.text()));
await p.goto(`http://localhost:${server.address().port}/produktion/youtube/shorts/godnatt/${scen}/?staende`, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready, null, { timeout: 30000 });
for (const [i, t] of tider.entries()) { await p.evaluate(t => { window.seek(t);   // bara omslaget, på natthimlen
  const svg = document.querySelector('svg'), bok = document.getElementById('bok-upp');
  for (const e of svg.children) if (e !== bok && e.tagName !== 'defs' && !e.contains(bok)) e.style.visibility = 'hidden';
  svg.style.background = '#101a4a'; }, +t); await p.waitForTimeout(80); await p.screenshot({ path: join(ut, 'miniatyr-omslag.png') }); }
console.log(join(ut, 'miniatyr-omslag.png'), fel.length ? fel : 'inga fel');
await b.close(); server.close();
