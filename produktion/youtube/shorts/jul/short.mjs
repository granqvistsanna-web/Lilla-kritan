// Julkalenderns Shorts (1080×1920) ur luckans liggande scen, utan att röra djur.js eller rita.js.
//   node produktion/youtube/shorts/jul/short.mjs <mapp> --tider                 -> skriver luckans repliker och bitar med tider (liggande)
//   node produktion/youtube/shorts/jul/short.mjs <mapp> --klipp 12.4-30,41-58.5 -> <mapp>/<namn>-short.mp4 (+ -short-liten.mp4)
//   [--stills 3,20,40]  bara stillbilder av klippets bildrutor (sekunder i Shorten) till <mapp>/stills-short/
// Så byggs den:
//  1. Introt: mini-kalendern i stående läge (render.mjs --staende --kort) fram till att luckan är öppen.
//  2. Innehållet: den liggande scenen renderas skarpt (4/3 pixeltäthet) och ett 9:16-fönster (810 × 1080 av bilden, blir 1080 × 1440)
//     följer figurerna mjukt. Vid närbilder (scenens kamera zoomar själv) står fönstret i mitten. Hårda klipp mellan klippbitarna.
//  3. Under bilden en snöbank i scenens egen snöfärg (de nedersta 25 %, där Shorts lägger sin text: inget viktigt där).
//  4. Slutet: luckan stängs med "Vi ses i morgon!" i stående läge (render.mjs --staende --kort, sista 2,7 s).
//  Ljudet för innehållet tas ur den färdiga liggande filmen (<namn>.mp4) med samma tider. Allt mastras med mastra.sh.
//  Klipp aldrig mitt i en sång: lägg hela sången i en bit.
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { resolve, join, relative, basename, extname, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../..'), FPS = 30;
const args = process.argv.slice(2), dir = resolve(args.shift()), namn = basename(dir);
const arg = n => { const i = args.indexOf(n); return i < 0 ? undefined : args[i + 1]; };
const TMP = join(dir, '.short-tmp'), RENDER = join(HAR, 'render.mjs');
const runB = (cmd, a, opt = {}) => execFileSync(cmd, a, { stdio: ['ignore', 'pipe', 'inherit'], maxBuffer: 1 << 26, ...opt });
const run = (cmd, a, opt = {}) => String(runB(cmd, a, opt) ?? '');

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)), data = await readFile(fil);
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const URL0 = `http://localhost:${server.address().port}/${relative(ROT, dir)}/index.html`;
const browser = await chromium.launch();
async function oppna(q = '', vp = { width: 1920, height: 1080 }, dsf = 1) {
  const p = await browser.newPage({ viewport: vp, deviceScaleFactor: dsf });
  p.on('pageerror', e => console.error('sidfel:', e.message));
  await p.goto(URL0 + q, { waitUntil: 'networkidle' }); await p.waitForFunction(() => window.ready); await p.evaluate(() => window.ready);
  return p;
}
const sluta = async code => { await browser.close(); server.close(); process.exit(code); };

// --tider: repliker och bitar i den liggande scenen
if (args.includes('--tider')) {
  const p = await oppna();
  const d = await p.evaluate(() => ({ D: window.DURATION, B: window.BITAR, L: (window.LJUD ?? []).filter(l => l.tal).map(l => [+l.t.toFixed(2), l.tal]) }));
  console.log('längd', d.D.toFixed(2)); if (d.B) console.log('bitar', JSON.stringify(d.B));
  for (const [t, s] of d.L) console.log(t.toFixed(2).padStart(7), s);
  await sluta(0);
}

// klipp: a-b (sekunder i den liggande scenen; fönstret följer figurerna) eller a-b@x:y:zoom (fast fönster kring punkten x, y i
// bildens pixlar, inzoomat: t.ex. teckningen i rita-luckorna). Bitarna skiljs med kommatecken.
const klipp = (arg('--klipp') ?? '').split(',').filter(Boolean).map(s => { const [ab, ram] = s.split('@'), [a, b] = ab.split('-').map(Number);
  return [a, b, ram ? ram.split(':').map(Number) : null]; });
if (!klipp.length) { console.error('ge --klipp a-b,c-d (sekunder i den liggande scenen)'); await sluta(1); }
await rm(TMP, { recursive: true, force: true }); await mkdir(TMP, { recursive: true });

// 1 + 4: intro och slut i stående läge (render.mjs --staende --kort)
const sta = await oppna('?staende&kort', { width: 1080, height: 1920 });
const { DS, OPPEN } = await sta.evaluate(() => ({ DS: window.DURATION, OPPEN: window.BITAR?.[0]?.[0] }));
await sta.close();
const introSlut = +(arg('--intro') ?? OPPEN ?? 2.3), slutFran = +(DS - 2.7).toFixed(2);
for (const [a, b, ut] of [[0, introSlut, 'intro'], [slutFran, DS, 'slut']])
  run('node', [RENDER, dir, '--staende', '--kort', '--fran', String(a), '--till', String(b), '--ut', join(TMP, ut + '.mp4')], { stdio: 'inherit' });

// 2: innehållet, ett följande 9:16-fönster ur den liggande scenen
const DSF = 2, p = await oppna('', { width: 1920, height: 1080 }, DSF);
const FW = 810, FH = 1080;
const mat = t => p.evaluate(t => { window.seek(t);
  const svg = document.querySelector('svg'), r0 = svg.getBoundingClientRect(), sx = 1920 / r0.width;
  const kam = document.querySelector('#kamera')?.getAttribute('transform') ?? '';
  const synlig = e => e && getComputedStyle(e).display !== 'none' && +getComputedStyle(e).opacity !== 0 && e.getBoundingClientRect().width > 4;
  const boxar = [document.querySelector('#djur'), ...document.querySelectorAll('#gaster > g, #gasterbak > g')].filter(synlig).map(e => e.getBoundingClientRect())
    .map(r => [(r.left - r0.left) * sx, (r.right - r0.left) * sx]).filter(([a, b]) => b > 0 && a < 1920);
  return { kam, boxar };
}, t);
const delar = [];   // en bildfil per klippbit (fönstrets storlek kan skilja mellan bitarna)
for (const [k, [a, b, ram]] of klipp.entries()) {
  const n = Math.round((b - a) * FPS), z = ram?.[2] ?? 1, w = FW / z, h = FH / z, ramar = [];
  if (ram) for (let i = 0; i < n; i++) ramar.push([a + i / FPS, Math.min(1920 - w / 2, Math.max(w / 2, ram[0])), Math.min(1080 - h / 2, Math.max(h / 2, ram[1]))]);
  else { const mal = [];
    for (let i = 0; i < n; i++) { const m = await mat(a + i / FPS);
      let cx = 960;
      if (!m.kam && m.boxar.length) { const [h0] = m.boxar, lo = Math.min(...m.boxar.map(x => x[0])), hi = Math.max(...m.boxar.map(x => x[1]));
        cx = hi - lo <= FW - 60 ? (lo + hi) / 2 : (h0[0] + h0[1]) / 2; }   // alla får plats: mitt emellan; annars huvudfiguren i mitten
      mal.push({ cx, kam: m.kam }); }
    // mjuk följning inom varje kamerainställning (1,2 s glidande medel), hårt byte när scenens kamera byter
    for (let i = 0; i < n; i++) { let s = 0, c = 0;
      for (let j = Math.max(0, i - 18); j <= Math.min(n - 1, i + 18); j++) if (mal[j].kam === mal[i].kam) { s += mal[j].cx; c++; }
      ramar.push([a + i / FPS, Math.min(1920 - FW / 2, Math.max(FW / 2, s / c)), FH / 2]); } }
  const ut = join(TMP, `bild-${k}.mp4`); delar.push(ut);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=1080:1440:flags=lanczos', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-tune', 'animation', '-pix_fmt', 'yuv420p', ut], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (const [t, cx, cy] of ramar) { await p.evaluate(t => window.seek(t), t);
    let buf;   // tre (WebGL): skärmbilden fastnar ibland när datorn är hårt lastad; försök igen (högst 3 gånger, 90 s var)
    for (let f = 0; !buf; f++) try { buf = await p.screenshot({ type: 'jpeg', quality: 95, clip: { x: cx - w / 2, y: cy - h / 2, width: w, height: h }, timeout: 90000 }); } catch (e) { if (f >= 2) throw e; }
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
}
await writeFile(join(TMP, 'delar.txt'), delar.map(f => `file '${f}'`).join('\n'));
run('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(TMP, 'delar.txt'), '-c', 'copy', join(TMP, 'bild.mp4')]);

// 3: snöbanken i scenens snöfärg (mätt längst ner i mitten av första bildrutan)
const [R, G, B] = [...runB('ffmpeg', ['-loglevel', 'error', '-i', join(TMP, 'bild.mp4'), '-frames:v', '1', '-vf', 'crop=600:10:240:1428,scale=1:1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'])];
const hex = (r, g, b) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const snö = hex(R, G, B), skugga = hex(R * 0.9, G * 0.93, B * 0.98), ljus = hex(R + (255 - R) * 0.5, G + (255 - G) * 0.5, B + (255 - B) * 0.5);
const bp = await browser.newPage({ viewport: { width: 1080, height: 560 } });
const vagor = Array.from({ length: 13 }, (_, i) => `Q${i * 90 + 45} ${i % 2 ? 22 : -14} ${(i + 1) * 90} ${4 + (i * 37) % 18}`).join(' ');
const glitter = Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 211 + 37) % 1080}" cy="${150 + (i * 97) % 380}" r="${2.5 + i % 3 * 1.5}" fill="#fff" opacity="${0.45 + (i % 4) * 0.12}"/>`).join('');
await bp.setContent(`<body style="margin:0;background:transparent"><svg width="1080" height="560" viewBox="0 0 1080 560" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${snö}"/><stop offset=".35" stop-color="${ljus}"/><stop offset="1" stop-color="${snö}"/></linearGradient>
  <filter id="mjuk"><feGaussianBlur stdDeviation="6"/></filter></defs>
  <path d="M0 96 L0 70 ${vagor.replace(/Q(\S+) (\S+) (\S+) (\S+)/g, (m, a, b, c, d) => `Q${a} ${70 + +b} ${c} ${70 + +d}`)} L1080 560 L0 560 Z" fill="${skugga}" opacity=".55" filter="url(#mjuk)" transform="translate(0 14)"/>
  <path d="M0 96 L0 70 ${vagor.replace(/Q(\S+) (\S+) (\S+) (\S+)/g, (m, a, b, c, d) => `Q${a} ${70 + +b} ${c} ${70 + +d}`)} L1080 560 L0 560 Z" fill="url(#g)"/>${glitter}</svg></body>`);
await bp.screenshot({ path: join(TMP, 'snobank.png'), omitBackground: true }); await bp.close();

// ljudet ur den liggande filmen, samma bitar, med korta toningar i skarvarna
const LIGG = join(dir, namn + '.mp4');
const af = klipp.map(([a, b], i) => `[0:a]atrim=${a}:${b},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st=${(b - a - 0.03).toFixed(3)}:d=0.03[a${i}]`).join(';')
  + ';' + klipp.map((_, i) => `[a${i}]`).join('') + `concat=n=${klipp.length}:v=0:a=1[a]`;
run('ffmpeg', ['-loglevel', 'error', '-y', '-i', LIGG, '-filter_complex', af, '-map', '[a]', '-c:a', 'pcm_s16le', '-ar', '48000', '-ac', '2', join(TMP, 'ljud.wav')]);
// innehållet: bilden överst, snöbanken under (lappar 120 px över bildens nederkant)
run('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(TMP, 'bild.mp4'), '-i', join(TMP, 'snobank.png'), '-i', join(TMP, 'ljud.wav'), '-filter_complex',
  `[0:v]pad=1080:1920:0:0:color=${snö}[p];[p][1:v]overlay=0:1320,fps=${FPS},format=yuv420p[v]`, '-map', '[v]', '-map', '2:a', '-shortest',
  '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-tune', 'animation', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', join(TMP, 'mitt.mp4')]);
const STILLS = arg('--stills');
if (STILLS) { const ut = join(dir, 'stills-short'); await mkdir(ut, { recursive: true });
  for (const s of STILLS.split(',')) run('ffmpeg', ['-loglevel', 'error', '-y', '-ss', s, '-i', join(TMP, 'mitt.mp4'), '-frames:v', '1', join(ut, `${s}.jpg`)]); }

// ihop: intro, innehåll, slut, med en kort övertoning (0,25 s) i skarvarna
const D = f => +run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]);
const [d1, d2] = [D(join(TMP, 'intro.mp4')), D(join(TMP, 'mitt.mp4'))], X = 0.25, UT = join(dir, `${namn}-short.mp4`);
run('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(TMP, 'intro.mp4'), '-i', join(TMP, 'mitt.mp4'), '-i', join(TMP, 'slut.mp4'), '-filter_complex',
  ['[0:v]fps=30,format=yuv420p,settb=AVTB[v0]', '[1:v]fps=30,format=yuv420p,settb=AVTB[v1]', '[2:v]fps=30,format=yuv420p,settb=AVTB[v2]',
   `[v0][v1]xfade=transition=fade:duration=${X}:offset=${(d1 - X).toFixed(3)}[v01]`, `[v01][v2]xfade=transition=fade:duration=${X}:offset=${(d1 + d2 - 2 * X).toFixed(3)}[v]`,
   '[0:a]aresample=48000[a0]', '[1:a]aresample=48000[a1]', '[2:a]aresample=48000[a2]',
   `[a0][a1]acrossfade=d=${X}[a01]`, `[a01][a2]acrossfade=d=${X}[a]`].join(';'),
  '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', UT]);
run('zsh', [join(HAR, 'mastra.sh'), dir, UT], { stdio: 'inherit' });
await rm(TMP, { recursive: true, force: true });
console.log(UT, D(UT).toFixed(1) + ' s');
await sluta(0);
