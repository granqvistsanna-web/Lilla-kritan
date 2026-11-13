// Stående (1080×1920) bild ur en kodscen för Shorts, utan att röra scenen: sidan ritas i sina vanliga 1920×1080 men i 16/9 upplösning,
// och varje bildruta är ett 9:16-fönster (608 px av scenbredden) som följer figurerna (.kropp, plus kritan när den ryms).
// Klipp i kameran (stort hopp) klipper också fönstret; annars glider det mjukt efter. Bara bild: ljudet tas ur den färdiga filmen.
//   node verktyg/render-staende.mjs <scenmapp> --fran 12.3 --till 45.6 --ut ut.mp4
//   Utan figur i bild följer fönstret kritan, annars står det i mitten (där kameran siktar). --fast 'a-b:x,…' låser det (scentid).
//   --skanna: skriver ut när ingen figur syns, så att man vet var --fast kan behövas.
//   node verktyg/render-staende.mjs <scenmapp> --stills 10 20 30 --ut ark.jpg        (kontaktark, för att kolla fönstret)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { resolve, join, relative, extname, dirname } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), dir = resolve(args.shift());
const flagga = n => { const i = args.indexOf(n); return i < 0 ? undefined : args.splice(i, 2)[1]; };
const fran = +(flagga('--fran') ?? 0), till = +(flagga('--till') ?? 0), ut = (u => u && resolve(u))(flagga('--ut'));
// --fast 'a-b:x,…': fönstrets mitt låst till x (scenens 1920-bredd) mellan a och b (scentid), för bilder utan figur där motivet inte står i mitten
const FIGUR = flagga('--figur') ?? '.kropp';   // väljare för figurerna (016 har ingen .kropp: 'g[filter*=boil]>.kamera>g')
const FAST = (flagga('--fast') ?? '').split(',').filter(Boolean).map(d => d.split(/[-:]/).map(Number));
const skanna = args.includes('--skanna') && !!args.splice(args.indexOf('--skanna'), 1);   // skriv ut tider (scenens) utan figur, 4 per s
const stills = args.includes('--stills') ? args.splice(args.indexOf('--stills')).slice(1).map(Number) : null;
const FPS = 30, B = 1080 * 1080 / 1920, DSF = 1920 / 1080;   // fönstret är 607,5 px brett i scenen, ritat i 1080 px

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)), data = await readFile(fil);
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: DSF });
p.on('pageerror', e => console.error('sidfel:', e.message));
await p.goto(`http://localhost:${server.address().port}/${relative(ROT, dir)}/index.html`, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready);
await p.evaluate(() => window.ready);

// mitten av det som ska synas, i skärmens x (0–1920)
const mal = () => p.evaluate(([B, FIGUR]) => {
  const syns = e => e.checkVisibility?.({ opacityProperty: true, visibilityProperty: true }) ?? true;
  // bara det som till stor del syns i bild räknas (en figur som sticker in i kanten drar inte iväg fönstret); rutan klipps till bilden
  const ruta = e => { const r = e.getBoundingClientRect(), l = Math.max(0, r.left), h = Math.min(1920, r.right), b = Math.min(1080, r.bottom) - Math.max(0, r.top);
    return r.width > 20 && h - l > Math.max(100, 0.4 * r.width) && b > 0.3 * r.height && syns(e) ? { left: l, right: h } : null; };
  const fig = [...document.querySelectorAll(FIGUR)].map(ruta).filter(r => r && r.right - r.left > 100);
  const k = document.getElementById('krita'), kr = k?.childElementCount ? ruta(k) : null;
  if (!fig.length) return kr ? (kr.left + kr.right) / 2 : null;
  let l = Math.min(...fig.map(r => r.left)), h = Math.max(...fig.map(r => r.right));
  if (kr && Math.max(h, kr.right) - Math.min(l, kr.left) < B) { l = Math.min(l, kr.left); h = Math.max(h, kr.right); }
  return (l + h) / 2;
}, [B, FIGUR]);
let x = null;
const ruta = async t => {
  await p.evaluate(t => window.seek(t), t);
  const fast = FAST.find(([a, b]) => t >= a && t < b), m = fast ? fast[2] : (await mal()) ?? 960;
  if (x == null || Math.abs(m - x) > 250) x = m;          // klipp
  else if (Math.abs(m - x) > 30) x += (m - x) * 0.08;     // glid efter, men stå still för andning och kok
  const x0 = Math.max(0, Math.min(1920 - B, x - B / 2));
  return p.screenshot({ type: 'jpeg', quality: 92, clip: { x: x0, y: 0, width: B, height: 1080 } });
};

if (skanna) {
  const tomma = [];
  for (let t = fran; t < till; t += 0.25) { await p.evaluate(t => window.seek(t), t); if ((await mal()) == null) tomma.push(t); }
  const r = []; for (const t of tomma) (r.length && t - r.at(-1)[1] < 0.3) ? r.at(-1)[1] = t : r.push([t, t]);
  console.log(r.map(([a, b]) => `${a.toFixed(2)}–${(b + 0.25).toFixed(2)}`).join(' ') || 'figur hela tiden');
} else if (stills) {
  const filer = [];
  for (const t of stills) { x = null; const f = join(tmpdir(), `staende-${process.pid}-${filer.length}.jpg`); await import('node:fs').then(fs => ruta(t).then(d => fs.writeFileSync(f, d))); filer.push(f); }
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...filer.flatMap(f => ['-i', f]), '-filter_complex',
    filer.map((_, i) => `[${i}:v]scale=270:480[v${i}];`).join('') + filer.map((_, i) => `[v${i}]`).join('') + `hstack=inputs=${filer.length}`, '-frames:v', '1', ut]);
} else {
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', FPS, '-i', '-', '-vf', 'scale=1080:1920',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', ut].map(String), { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = Math.round(fran * FPS); f < Math.round(till * FPS); f++) ff.stdin.write(await ruta(f / FPS));
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log(ut);
}
await b.close();
server.close();
