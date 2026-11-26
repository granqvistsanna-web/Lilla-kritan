// Ärtskidornas övergång mellan bondgården och discot (v1:s scener/artovergang.js, Sanna 2026-11-06: "pea pod becoming more and more
// and cover the screen as a transition to dance scene"), flyttad till v2:s 1920 × 1080. Samma slumpföljd och samma rutnät (relativt
// bildens bredd och höjd) som v1, så att båda scenerna ritar exakt samma hög.
//   import { artovergang, OV_LJUD } from '../bondgarden/artovergang.js'
//   artovergang(k)   k 0 → 0,5 i bondgården (14g–14h, de sista 5,5 s), 0,5 → 1 i discot (de första 1,2 s); ritas i #ram (utanför kameran)
//   OV_LJUD          k-värden (0–0,5) där en skida poppar upp, glesade för ljudet ('plupp'/'pop')
import { $, lagg, lerp, mjuk, del, BEAT, SANG0, TID } from '../kit.js';
const W = 1920, H = 1080;
const SKAL = ['#4F9E3A', '#5BAE3F', '#46913A', '#62B548'], INNE = '#B5DC7E', ART = '#80C446', INK = '#302822';
const START = [W * 0.5, H * 0.18];
const IN = 0.42, POP = 0.05, UT = 0.36, UT_POP = 0.07;
const kl = k => Math.max(0, Math.min(1, k)), over = k => (k = kl(k) - 1, 1 + 2.7 * k * k * k + 1.7 * k * k);
const slump = s => () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const r = slump(14);
const PLATS = [];
for (const [ox, oy] of [[0, 0], [0.5, 0.5]]) for (let gy = -0.5; gy < 6.5; gy++) for (let gx = -0.5; gx < 9.5; gx++)
  PLATS.push({ x: (gx + ox + (r() - 0.5) * 0.6) * W / 9, y: (gy + oy + (r() - 0.5) * 0.6) * H / 6, rot: (r() - 0.5) * 70, oppen: r() < 0.5, f: Math.floor(r() * 4), fas: r() });
PLATS.forEach(p => { p.d = Math.hypot(p.x - START[0], (p.y - START[1]) * 1.2); p.dm = Math.hypot(p.x - W / 2, (p.y - H * 0.55) * 1.3); });
PLATS.sort((a, b) => a.d - b.d);
const N = PLATS.length, SK = W / 1376;   // v1:s storlekar gånger skalan till 1920
PLATS.forEach((p, i) => { const u = i / (N - 1); p.in = IN * Math.pow(u, 0.45); p.L = lerp(120, 400, Math.pow(u, 0.7)) * SK; });
[...PLATS].sort((a, b) => a.dm - b.dm).forEach((p, i) => { p.ut = 0.5 + 0.03 + UT * Math.pow(i / (N - 1), 0.8); });
export const OV_LJUD = PLATS.filter((_, i) => i < 6 || i % 7 === 0).map(p => p.in);

const oga = (u, i, f) => (i + f) % 2 ? `<path d="M${u * 7 - 4} -3Q${u * 7} -8 ${u * 7 + 4} -3" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`
  : `<circle cx="${u * 7}" cy="-3" r="2.6" fill="${INK}"/>`;
const skida = p => { const skal = SKAL[p.f]; let h;
  if (p.oppen) h = `<path d="M-100 0Q-50 -58 0 -55Q50 -58 100 0Q50 34 0 34Q-50 34 -100 0Z" fill="${INNE}" filter="url(#skidkant)"/>
    ${[-50, 0, 50].map((x, i) => `<g transform="translate(${x} -8)"><circle r="22" fill="${ART}"/><ellipse cx="-9" cy="-11" rx="4" ry="3.2" fill="#fff" opacity="0.7"/>
      ${oga(-1, i, p.f)}${oga(1, i, p.f)}<path d="M-7 4Q0 12 7 4" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/></g>`).join('')}
    <path d="M-104 -3Q-50 16 0 15Q50 16 104 -3Q70 44 0 46Q-70 44 -104 -3Z" fill="${skal}" filter="url(#skidkant)"/>`;
  else h = `<path d="M-100 0Q-50 -46 0 -44Q50 -46 100 0Q50 46 0 44Q-50 46 -100 0Z" fill="${skal}" filter="url(#skidkant)"/>
    <path d="M-80 -4Q0 -26 80 -4" fill="none" stroke="#3C7F2C" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    ${[-45, 0, 45].map(x => `<ellipse cx="${x}" cy="4" rx="20" ry="16" fill="#fff" opacity="0.12"/>`).join('')}`;
  return h + `<path d="M98 -2Q116 -8 118 -26Q119 -36 110 -38" fill="none" stroke="${skal}" stroke-width="7" stroke-linecap="round"/>`; };
const FORM = PLATS.map(skida);
let klar = false;
export function artovergang(k) {
  if (k <= 0 || k >= 1) return;
  if (!klar) { klar = true; document.querySelector('defs').insertAdjacentHTML('beforeend', `<filter id="skidkant" filterUnits="objectBoundingBox" x="-0.1" y="-0.2" width="1.2" height="1.4">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter>
    <filter id="skidvit" x="-0.2" y="-0.2" width="1.4" height="1.4"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/><feFlood flood-color="#fff"/>
      <feComposite in2="d" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`); }
  const takt = (TID - SANG0) / BEAT;
  const bo = mjuk(del(IN - 0.06, IN + POP, k)) * (1 - mjuk(del(0.5, 0.56, k)));
  let h = bo > 0.01 ? `<rect x="-20" y="-20" width="${W + 40}" height="${H + 40}" fill="${SKAL[0]}" opacity="${bo.toFixed(3)}"/>` : '';
  let s = '';
  PLATS.forEach((p, i) => {
    const q = k <= 0.5 ? over(del(p.in, p.in + POP, k)) : 1 - mjuk(del(p.ut, p.ut + UT_POP, k)) ** 1.6 + 0.12 * Math.sin(Math.PI * kl((k - p.ut + 0.02) / (UT_POP * 0.4 + 0.02)));
    if (q <= 0.01) return;
    const gung = 4 * Math.sin(Math.PI * (takt + p.fas * 2));
    s += `<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(p.rot + gung).toFixed(1)}) scale(${(p.L / 200 * q).toFixed(3)})">${FORM[i]}</g>`;
  });
  lagg('ram', h + `<g filter="url(#skidvit)">${s}</g>`);
}
