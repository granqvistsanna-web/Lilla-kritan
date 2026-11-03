// Renderar en kodscen till 1920×1080, 30 fps.
//   node render.mjs <scenmapp>              -> <scenmapp>/<scen>.mp4 (med sångbiten om scenen sätter window.SANG)
//   node render.mjs <scenmapp> 2 7.5 12     -> <scenmapp>/stills/<t>.jpg + stills/sheet.jpg
//   node render.mjs <scenmapp> --fran 30 --till 40   -> bara en del av scenen (snabbtest)
// Sidan hämtas via en liten lokal server från repots rot, så att kit.js kan läsa riggarnas json.
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { resolve, join, relative, basename, extname, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../..'), SANG = join(HAR, '../sang.m4a');
const args = process.argv.slice(2), dir = resolve(args.shift()), FPS = 30;
const flagga = n => { const i = args.indexOf(n); return i < 0 ? undefined : +args.splice(i, 2)[1]; };
const fran = flagga('--fran') ?? 0, tillArg = flagga('--till'), ts = args;

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(await readFile(fil)); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://localhost:${server.address().port}/${relative(ROT, dir)}/index.html`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready);
await p.evaluate(() => window.ready);
const seek = t => p.evaluate(t => window.seek(t), t);

if (ts.length) {
  await mkdir(join(dir, 'stills'), { recursive: true });
  const files = [];
  for (const t of ts) { await seek(+t); files.push(join(dir, 'stills', `${t}.jpg`)); await p.screenshot({ path: files.at(-1), type: 'jpeg' }); }
  if (files.length === 1) { console.log(files[0]); process.exit(0); }
  const cols = Math.min(3, files.length), rows = Math.ceil(files.length / cols), n = cols * rows;
  const pads = Array.from({ length: n - files.length }, () => ['-f', 'lavfi', '-i', 'color=black:s=1920x1080:d=1']).flat();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...files.flatMap(f => ['-i', f]), ...pads, '-filter_complex',
    Array.from({ length: n }, (_, i) => `[${i}:v]scale=640:360[v${i}];`).join('') + Array.from({ length: n }, (_, i) => `[v${i}]`).join('') + `xstack=inputs=${n}:grid=${cols}x${rows}`,
    '-frames:v', '1', join(dir, 'stills', 'sheet.jpg')]);
  console.log(join(dir, 'stills', 'sheet.jpg'));
} else {
  const { DURATION, SANG: sang } = await p.evaluate(() => ({ DURATION: window.DURATION, SANG: window.SANG }));
  const till = tillArg ?? DURATION, ut = join(dir, `${basename(dir)}${fran || tillArg ? `-${fran}-${till}` : ''}.mp4`);
  // sångbiten: scenens t = 0 är sångens sang[0]; ljudet slutar (med kort uttoning) vid sang[1], sedan tystnad
  const ljud = sang ? (() => {
    const a = sang[0] + fran, len = Math.max(0, sang[1] - a);
    return ['-ss', a, '-t', len, '-i', SANG, '-filter_complex', `[1:a]afade=t=out:st=${Math.max(0, len - 0.4)}:d=0.4,apad[a]`, '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '192k', '-shortest'];
  })() : [];
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', FPS, '-i', '-', ...ljud,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ut].map(String), { stdio: ['pipe', 'inherit', 'inherit'] });
  const n0 = Math.round(fran * FPS), n1 = Math.round(till * FPS);
  for (let f = n0; f < n1; f++) { await seek(f / FPS); ff.stdin.write(await p.screenshot({ type: 'jpeg', quality: 92 })); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log(`${ut}, ${(n1 - n0) / FPS} s`);
}
await b.close();
server.close();
