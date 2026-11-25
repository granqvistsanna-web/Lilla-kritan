// Renderar en three.js-scen i produktion/three-rum/ till 1920×1080, 30 fps (samma upplägg som avsnittens render.mjs, utan sång; ljudet ur window.LJUD).
//   node render.mjs <scenmapp>                         -> <scenmapp>/<scen>.mp4
//   node render.mjs <scenmapp> 0 5 9.5                  -> <scenmapp>/stills/<t>.jpg + stills/sheet.jpg
//   node render.mjs <scenmapp> --snabb                  -> förhandsvisning 960×540, 15 fps
//   node render.mjs <scenmapp> --fran 2 --till 4 [--ut fil.mp4] [--langd] [--bara-ljud] [--tider] [--fraga 'lucka=5&del=slut']   (för verktyg/render-delat.mjs)
// Sidan sätter window.ready (promise), window.seek(t) (promise, ritar bildrutan för tiden t) och window.DURATION.
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { resolve, join, relative, basename, extname, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../..');
const args = process.argv.slice(2), dir = resolve(args.shift());
const flagga = n => { const i = args.indexOf(n); return i < 0 ? undefined : +args.splice(i, 2)[1]; };
const ta = n => args.includes(n) && !!args.splice(args.indexOf(n), 1);
const baraLjud = ta('--bara-ljud'), snabb = ta('--snabb'), LANGD = ta('--langd'), TIDER = ta('--tider');   // --tider: sidans window.TIDER som json
const UT = args.includes('--ut') ? resolve(args.splice(args.indexOf('--ut'), 2)[1]) : undefined;
const FRAGA = args.includes('--fraga') ? args.splice(args.indexOf('--fraga'), 2)[1] : '';   // extra sidfråga, t.ex. armar=b
const fran = flagga('--fran') ?? 0, tillArg = flagga('--till'), ts = args;
const FPS = snabb ? 15 : 30, VY = snabb ? { width: 960, height: 540 } : { width: 1920, height: 1080 };
const KOD = snabb ? ['-preset', 'veryfast', '-crf', '23'] : ['-preset', 'medium', '-crf', '18'];

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)), data = await readFile(fil);
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(data); }
  catch { console.error('saknas:', req.url); res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://localhost:${server.address().port}/${relative(ROT, dir)}/index.html?${[snabb ? 'snabb' : '', FRAGA].filter(Boolean).join('&')}`;

const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: VY });
p.on('pageerror', e => console.error('sidfel:', e.message));
p.on('console', m => { if (m.type() === 'error') console.error('konsol:', m.text()); });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready);
await p.evaluate(() => window.ready);
const seek = t => p.evaluate(t => window.seek(t), t);
const DURATION = await p.evaluate(() => window.DURATION);
const till = tillArg ?? DURATION, ut = UT ?? join(dir, `${basename(dir)}${fran || tillArg ? `-${fran}-${till}` : ''}.mp4`);

// Ljudet: sidans window.LJUD = [{ t, fil, vol }], varje fil fördröjd till sin tid, vol × 0,4 (som avsnittens render.mjs),
// blandat till <scen>-effekter.wav i scenens hela längd. Filmen får den (avklippt till --fran/--till); render-delat.mjs lägger på samma wav.
async function effektWav() {
  const ljud = await p.evaluate(() => window.LJUD || []), ing = ['-f', 'lavfi', '-t', DURATION, '-i', 'anullsrc=r=48000:cl=stereo'], ked = [], nmn = ['[0:a]'];
  ljud.forEach((c, i) => { ing.push('-i', join(ROT, c.fil));
    ked.push(`[${i + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=${(c.vol * 0.4).toFixed(3)},adelay=${Math.round(c.t * 1000)}:all=1[e${i}]`); nmn.push(`[e${i}]`); });
  const wav = join(dir, `${basename(dir)}-effekter.wav`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...ing, '-filter_complex', [...ked, `${nmn.join('')}amix=inputs=${nmn.length}:normalize=0:duration=first,alimiter=limit=0.95[a]`].join(';'),
    '-map', '[a]', '-t', DURATION, '-c:a', 'pcm_s16le', wav].map(String));
  return wav;
}
if (TIDER) { console.log(JSON.stringify(await p.evaluate(() => ({ ...window.TIDER, LJUD_NYA: window.LJUD_NYA || [], LJUD_SLUT: window.LJUD_SLUT || [] })))); }
else if (LANGD) { console.log(JSON.stringify({ langd: till - fran, fps: FPS, ut })); }
else if (baraLjud) { console.log(await effektWav());
} else if (ts.length) {
  const STILLS = join(dir, 'stills'); await mkdir(STILLS, { recursive: true });
  const files = [];
  for (const t of ts) { await seek(+t); files.push(join(STILLS, `${t}.jpg`)); await p.screenshot({ path: files.at(-1), type: 'jpeg', quality: 92 }); }
  if (files.length > 1) {
    const cols = Math.min(3, files.length), rows = Math.ceil(files.length / cols), n = cols * rows;
    const pads = Array.from({ length: n - files.length }, () => ['-f', 'lavfi', '-i', 'color=black:s=1920x1080:d=1']).flat();
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...files.flatMap(f => ['-i', f]), ...pads, '-filter_complex',
      Array.from({ length: n }, (_, i) => `[${i}:v]scale=640:360[v${i}];`).join('') + Array.from({ length: n }, (_, i) => `[v${i}]`).join('') + `xstack=inputs=${n}:grid=${cols}x${rows}`,
      '-frames:v', '1', join(STILLS, 'sheet.jpg')]);
  }
  console.log(files.length > 1 ? join(STILLS, 'sheet.jpg') : files[0]);
} else {
  const ljudIn = UT ? ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo'] : ['-ss', fran, '-i', await effektWav()];   // bitarna (--ut) är stumma: render-delat lägger på wav:en
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', FPS, '-i', '-',
    ...ljudIn, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '128k', '-t', till - fran,
    '-c:v', 'libx264', ...KOD, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ut].map(String), { stdio: ['pipe', 'inherit', 'inherit'] });
  const n0 = Math.round(fran * FPS), n1 = Math.round(till * FPS), t0 = Date.now();
  await seek(n0 / FPS); await p.waitForTimeout(300);   // uppvärmning: texturer och shaders klara före första rutan
  for (let f = n0; f < n1; f++) {
    await seek(f / FPS); const bild = await p.screenshot({ type: 'jpeg', quality: snabb ? 85 : 93 });
    if (!ff.stdin.write(bild)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - n0) % 60 === 0) console.error(`ruta ${f - n0}/${n1 - n0}, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log(`${ut}, ${(n1 - n0) / FPS} s`);
}
await b.close();
server.close();
