// Renderar en kodscen till 1920×1080, 30 fps (--staende: 1080×1920 för Shorts, <scen>-staende.mp4).
//   node render.mjs <scenmapp>              -> <scenmapp>/<scen>.mp4 (med sångbiten om scenen sätter window.SANG)
//   node render.mjs <scenmapp> 2 7.5 12     -> <scenmapp>/stills/<t>.jpg + stills/sheet.jpg
//   node render.mjs <scenmapp> --fran 30 --till 40   -> bara en del av scenen (snabbtest)
//   node render.mjs <scenmapp> --en                   -> engelska versionen, tajmad till ../en/sang.m4a via ../en/rader.txt (kit.js ?en):
//        <scen>-en.mp4, <scen>-en-effekter.wav, stills-en/ (med --staende: <scen>-staende-en.mp4). Utan --en är allt som förut.
//   node render.mjs <scenmapp> --bara-ljud            -> bara <scen>-effekter.wav (skrivs också efter varje hel rendering)
//   node render.mjs <scenmapp> --mix [--sist]         -> Gissa i mixarna (?mix, ?sist): <scen>(-liggande)-mix(-sist)(-en).mp4
//   node render.mjs <scenmapp> --liggande             -> Gissa teckningen i 16:9 (1920×1080, ?liggande): <scen>-liggande(-en).mp4, stills-liggande/
// Sidan hämtas via en liten lokal server från repots rot, så att kit.js kan läsa riggarnas json.
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { unlinkSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { resolve, join, relative, basename, extname, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../..'), SANG = join(HAR, '../sang.m4a');
const args = process.argv.slice(2), dir = resolve(args.shift()), FPS = 30;
const flagga = n => { const i = args.indexOf(n); return i < 0 ? undefined : +args.splice(i, 2)[1]; };
const staende = args.includes('--staende') && !!args.splice(args.indexOf('--staende'), 1), [W, H] = staende ? [1080, 1920] : [1920, 1080];
const liggande = args.includes('--liggande') && !!args.splice(args.indexOf('--liggande'), 1);   // Gissa: ?liggande, samma 1920×1080
const mix = args.includes('--mix') && !!args.splice(args.indexOf('--mix'), 1);   // Gissa: ?mix, utan intro-replik och hej då
const sist = args.includes('--sist') && !!args.splice(args.indexOf('--sist'), 1);   // Gissa: ?sist, mixens sista Short behåller hej då
const en = args.includes('--en') && !!args.splice(args.indexOf('--en'), 1);   // Gissa: ?en, engelska repliker, <scen>-staende-en.mp4
const baraLjud = args.includes('--bara-ljud') && !!args.splice(args.indexOf('--bara-ljud'), 1);
// --kvalitet: rutorna som PNG (ingen JPEG-blockighet i kritkornet) och x264 med crf 15, slow, tune animation. Ca dubbelt så långsamt.
const kvalitet = args.includes('--kvalitet') && !!args.splice(args.indexOf('--kvalitet'), 1);
const fran = flagga('--fran') ?? 0, tillArg = flagga('--till'), ts = args;
const SANG_FIL = en ? join(HAR, '../en/sang.m4a') : SANG, X = en ? '-en' : '', STILLS = join(dir, staende ? 'stills-staende' : liggande ? 'stills-liggande' : `stills${X}`);   // stående (Shorts, Gissa --en) som förut

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)), data = await readFile(fil);
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://localhost:${server.address().port}/${relative(ROT, dir)}/index.html${(p => p ? '?' + p : '')([staende && 'staende', liggande && 'liggande', mix && 'mix', sist && 'sist', en && 'en'].filter(Boolean).join('&'))}`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H } });
p.on('pageerror', e => console.error('sidfel:', e.message));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready);
await p.evaluate(() => window.ready);
const seek = t => p.evaluate(t => window.seek(t), t);
const LANGD = args.includes('--langd') && !!args.splice(args.indexOf('--langd'), 1), UT = args.includes('--ut') ? resolve(args.splice(args.indexOf('--ut'), 2)[1]) : undefined;   // för verktyg/render-delat.mjs

if (ts.length) {
  await mkdir(STILLS, { recursive: true });
  const files = [];
  for (const t of ts) { await seek(+t); files.push(join(STILLS, `${t}.jpg`)); await p.screenshot({ path: files.at(-1), type: 'jpeg' }); }
  if (files.length === 1) { console.log(files[0]); process.exit(0); }
  const cols = Math.min(3, files.length), rows = Math.ceil(files.length / cols), n = cols * rows;
  const pads = Array.from({ length: n - files.length }, () => ['-f', 'lavfi', '-i', `color=black:s=${W}x${H}:d=1`]).flat();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...files.flatMap(f => ['-i', f]), ...pads, '-filter_complex',
    Array.from({ length: n }, (_, i) => `[${i}:v]scale=${W / 3}:${H / 3}[v${i}];`).join('') + Array.from({ length: n }, (_, i) => `[v${i}]`).join('') + `xstack=inputs=${n}:grid=${cols}x${rows}`,
    '-frames:v', '1', join(STILLS, 'sheet.jpg')]);
  console.log(join(STILLS, 'sheet.jpg'));
} else {
  const { DURATION, SANG: sang, LJUD: ljud = [] } = await p.evaluate(() => ({ DURATION: window.DURATION, SANG: window.SANG, LJUD: window.LJUD }));
  const till = tillArg ?? DURATION, ut = UT ?? join(dir, `${basename(dir)}${staende ? '-staende' : ''}${liggande ? '-liggande' : ''}${mix ? '-mix' : ''}${sist ? '-sist' : ''}${en ? '-en' : ''}${fran || tillArg ? `-${fran}-${till}` : ''}.mp4`);
  if (LANGD) { console.log(JSON.stringify({ langd: till - fran, fps: FPS, ut })); process.exit(0); }
  // Ljud: sångbiten (scenens t = 0 är sångens sang[0], tonas ut vid sang[1], sedan tystnad) + effekterna ur kit.ljud,
  // var och en fördröjd till sin tid, −8 dB × vol, loopar kortade med uttoning. Tysta (saknade) effekter hoppas över.
  const effekter = ljud.filter(c => c.fil && c.t < till && c.t + (c.langd ?? 30) > fran);
  const effektKedja = (ingang, kedja, namn, forst) => {
    for (const c of effekter) {
      const i = namn.length + forst, borja = Math.max(0, fran - c.t), fade = c.fade ?? 0.3;
      if (c.loop) ingang.push('-stream_loop', -1);
      ingang.push('-ss', borja + (c.ss ?? 0), '-i', join(ROT, c.fil));   // ss: var i filen ljudet börjar (Gissa teckningen)
      let f = `[${i}:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=in:d=${c.fadeIn ?? 0.02}`;
      if (c.langd != null) { const l = Math.max(0.05, c.langd - borja); f += `,atrim=0:${l},afade=t=out:st=${Math.max(0, l - fade)}:d=${fade}`; }
      f += `,volume=${(c.vol * 0.4).toFixed(3)},adelay=${Math.round(Math.max(0, c.t - fran) * 1000)}:all=1[e${i}]`;
      kedja.push(f); namn.push(`[e${i}]`);
    }
  };
  // Ljudet blandas till en wav i ett eget ffmpeg-pass, exakt scenens längd. (Blandat i samma pass som de långsamt
  // inpipade rutorna tappade loopade platsljud ca 2 s vid starten och vid varje varv, 2026-11-11.)
  const ljudWav = (medSang, wav) => {
    const ing = ['-f', 'lavfi', '-t', till - fran, '-i', 'anullsrc=r=48000:cl=stereo'], ked = [], nmn = ['[0:a]'];
    if (medSang && sang) {
      const a = sang[0] + fran, len = Math.max(0, sang[1] - a);
      ing.push('-ss', a, '-t', len, '-i', SANG_FIL);
      ked.push(`[1:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st=${Math.max(0, len - 0.4)}:d=0.4,apad[s0]`); nmn.push('[s0]');
    }
    effektKedja(ing, ked, nmn, 0);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...ing, '-filter_complex',
      [...ked, `${nmn.join('')}amix=inputs=${nmn.length}:normalize=0:duration=first,alimiter=limit=0.95[a]`].join(';'),
      '-map', '[a]', '-t', till - fran, '-c:a', 'pcm_s16le', wav].map(String));
  };
  // Bara effekterna (ingen sång), exakt scenens längd: <scen>-effekter.wav, som sammanslagningen lägger under hela sången.
  const effektWav = () => { const wav = join(dir, `${basename(dir)}${X}-effekter.wav`); ljudWav(false, wav); console.log(wav); };
  if (baraLjud) { effektWav(); await b.close(); server.close(); process.exit(0); }
  const harLjud = sang || effekter.length, tmpWav = ut.replace(/\.mp4$/, '-ljud.tmp.wav');
  if (harLjud) ljudWav(true, tmpWav);
  const ljudArg = harLjud ? ['-i', tmpWav, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-t', till - fran] : [];
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', FPS, '-i', '-', ...ljudArg,
    '-c:v', 'libx264', ...(kvalitet ? ['-preset', 'slow', '-crf', '15', '-tune', 'animation'] : ['-preset', 'medium', '-crf', '18']), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ut].map(String), { stdio: ['pipe', 'inherit', 'inherit'] });
  const n0 = Math.round(fran * FPS), n1 = Math.round(till * FPS);
  for (let f = n0; f < n1; f++) { await seek(f / FPS); ff.stdin.write(await p.screenshot(kvalitet ? { type: 'png' } : { type: 'jpeg', quality: 92 })); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  if (harLjud) unlinkSync(tmpWav);
  console.log(`${ut}, ${(n1 - n0) / FPS} s`);
  if (!fran && tillArg == null && !staende && !liggande && !mix) effektWav();
}
await b.close();
server.close();
