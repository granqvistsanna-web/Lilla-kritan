// Renderar en rigg-sida (assets/karaktarer/<mapp>/premium/uttryck.html) till en liten mp4 (960×540, 24 fps), bild för bild via window.stilla + render(t).
//   node verktyg/rigg-video.mjs <mapp> "<sidans query>" <sekunder> <ut.mp4>
//   t.ex.  node verktyg/rigg-video.mjs dinon-rod "prov=borsta&zoom=2.8&rorelse=borsta" 12.6 /tmp/rod-borstar.mp4
//          node verktyg/rigg-video.mjs dinon-rod "film=1" 35.6 /tmp/rod-testfilm.mp4
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { homedir } from 'node:os';
import { spawn } from 'node:child_process';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const [slug, query, sek, ut] = process.argv.slice(2), ROT = new URL('..', import.meta.url).pathname.replace(/\/$/, ''), FPS = 24;
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
const server = createServer(async (req, res) => { try { const f = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)), d = await readFile(f); res.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 960, height: 540 } });
await pg.goto(`http://localhost:${server.address().port}/assets/karaktarer/${slug}/premium/uttryck.html?${query}`);
await pg.waitForTimeout(2000); await pg.evaluate(() => { window.stilla = true; });
const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', ut], { stdio: ['pipe', 'inherit', 'inherit'] });
const n = Math.round(+sek * FPS);
for (let i = 0; i < n; i++) { await pg.evaluate(t => render(t), i / FPS); const png = await pg.screenshot({ type: 'jpeg', quality: 90 }); if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r)); }
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); server.close(); console.log('klar', ut);
