// Klosskrockar (2026-11-22): kör en ABC-scen (recept 3), tar klossO för varje bildkloss var 1/30 s och testar klossarna mot
// varandra som vridna lådor i 3D (SAT). Klossar utanför bild räknas inte. Bokstavsmärket (A) räknas inte.
//   node produktion/youtube/alfabet/krock.mjs <scenmapp> [steg]   -> tider då två klossar går in i varandra (djup i andel av sidan)
//   DUMP=160,162 node … <scenmapp> 0.1                           -> skriver också ut klossarnas lägen i det tidsfönstret
//   GRANS=0.03 …                                                  -> känsligare (standard 0,06 = 6 % av sidan)
// Kräver att scenen har KLOSSAR, klossO och raden Object.assign(window, { LJUD (alla recept 3-scener har det).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, join, relative, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..'), dir = resolve(process.argv[2]), STEG = +(process.argv[3] ?? 1 / 30);
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)); let data = await readFile(fil);
    if (fil === join(dir, 'index.html')) data = data.toString().replace('Object.assign(window, { LJUD', 'window.__k = t => KLOSSAR.map(X => { const o = klossO(X, t); return { n: X.namn ?? "A", ...o }; }); Object.assign(window, { LJUD');
    res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => console.error('sidfel:', e.message));
await p.goto(`http://localhost:${server.address().port}/${relative(ROT, dir)}/index.html?render`, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready);
const rader = await p.evaluate(steg => { const ut = []; for (let t = 0; t < window.DURATION; t += steg) ut.push([t, window.__k(t)]); return ut; }, STEG);
await b.close(); server.close();

// rotation XYZ (three.js Euler 'XYZ'): R = Rx·Ry·Rz; kolumnerna är klossens axlar
const rot = (a, b, c) => { const [ca, sa, cb, sb, cc, sc] = [Math.cos(a), Math.sin(a), Math.cos(b), Math.sin(b), Math.cos(c), Math.sin(c)];
  return [[cb * cc, ca * sc + sa * sb * cc, sa * sc - ca * sb * cc], [-cb * sc, ca * cc - sa * sb * sc, sa * cc + ca * sb * sc], [sb, -sa * cb, ca * cb]]; };
const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2], kors = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const box = o => ({ c: [o.x, -o.y, o.z || 0], A: rot(o.rx || 0, o.ry || 0, o.rz || 0), h: [o.s * (o.sx ?? 1) / 2, o.s * (o.sy ?? 1) / 2, o.s / 2], s: o.s });
function djup(P, Q) {   // minsta överlapp längs SAT-axlarna (px); ≤ 0 = ingen krock
  const d = [0, 1, 2].map(i => Q.c[i] - P.c[i]), ax = [...P.A, ...Q.A];
  for (const u of P.A) for (const v of Q.A) { const k = kors(u, v), l = Math.hypot(...k); if (l > 1e-6) ax.push(k.map(x => x / l)); }
  let min = Infinity;
  for (const L of ax) { const rp = P.A.reduce((s, u, i) => s + P.h[i] * Math.abs(dot(u, L)), 0), rq = Q.A.reduce((s, u, i) => s + Q.h[i] * Math.abs(dot(u, L)), 0);
    min = Math.min(min, rp + rq - Math.abs(dot(d, L))); if (min <= 0) return 0; }
  return min;
}
if (process.env.DUMP) { const [a, z] = process.env.DUMP.split(',').map(Number);
  for (const [t, L] of rader) if (t >= a && t <= z) console.log(t.toFixed(2), L.slice(1).filter(o => o.syns).map(o => `${o.n}:${o.x.toFixed(0)},${o.y.toFixed(0)},${(o.z||0).toFixed(0)} s${o.s.toFixed(0)} ry${o.ry.toFixed(2)}`).join('  ')); }
const GRANS = +(process.env.GRANS ?? 0.06), hits = new Map();
for (const [t, L] of rader) {
  const B = L.map((o, i) => i && o.syns && o.s > 1 && o.x - o.s * 0.7 < 1920 && o.x + o.s * 0.7 > 0 ? box(o) : null);
  for (let i = 1; i < B.length; i++) for (let j = i + 1; j < B.length; j++) { if (!B[i] || !B[j]) continue;
    const dj = djup(B[i], B[j]) / Math.min(B[i].s, B[j].s); if (dj <= GRANS) continue;
    const k = `${L[i].n}–${L[j].n}`, a = hits.get(k) ?? []; const sista = a.at(-1);
    if (sista && t - sista[1] < 2.5 * STEG) { sista[1] = t; sista[2] = Math.max(sista[2], dj); } else a.push([t, t, dj]); hits.set(k, a); } }
const ut = [...hits].flatMap(([k, a]) => a.map(([t0, t1, d]) => [t0, `${t0.toFixed(2)}–${t1.toFixed(2)} s  ${k}  djup ${(100 * d).toFixed(0)} %`])).sort((x, y) => x[0] - y[0]);
console.log(`${relative(ROT, dir)}: ${ut.length ? ut.length + ' krockar' : 'inga krockar'}`); for (const [, r] of ut) console.log('  ' + r);
