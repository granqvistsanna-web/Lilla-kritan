// Skogen med Olle, mor och björnen: det gemensamma för 017 Mors lilla Olle (scener/skogen/index.html importerar den).
// Förlaga: 026 scener/sovrummet/rum.js (kameran, lagren, kritan, ritSak, kritirisen, ljudet). Tre v2-riggar live ur uttryck.html.
//   import * as S from './skog.js';   await S.starta();   per bildruta: S.borja(t), S.kamera(…), S.skog(…), S.figur(…), S.slut(t)
// Måtten är storyboardens (bygg.py, 1376 × 768) gånger SK = 1920 / 1376, så att scenen står där storyboarden står.
export const $ = id => document.getElementById(id);
export const A = '/assets/';
export const kl = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k)), lerp = (a, b, k) => a + (b - a) * k;
export const mjuk = k => (k = kl(k), k * k * (3 - 2 * k)), del = (a, b, t) => mjuk((t - a) / (b - a));
export const bump = (a, b, t) => (t <= a || t >= b) ? 0 : Math.sin(Math.PI * (t - a) / (b - a));
export const f1 = v => v.toFixed(1);
export const slump = x => { const v = Math.sin(x * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
export const lagg = (id, h) => $(id).insertAdjacentHTML('beforeend', h);

// --- Bilderna --------------------------------------------------------------------------------------------------------------
export const PLATTA = A + 'bakgrunder/skogen/skogen.png';                       // 2752 × 1536 (16:9)
export const BUSKE = { bild: A + 'bakgrunder/skogen-saker/buske.png', w: 1200, h: 896, bb: [62, 98, 1133, 814] };
export const STEN = { bild: A + 'bakgrunder/skogen-saker/sten.png', w: 1200, h: 896, bb: [43, 57, 1177, 881] };
export const KORG = { bild: A + 'rekvisita/korg/cut/korg-v3-tunn.png', w: 1024, h: 1024, bb: [139, 105, 882, 915] };
const KRITA = A + 'rekvisita/krita-rod/cut/krita-rod-tunn.png', KRITA_SPETS = [742, 132];   // blå med ett hue-filter (#blakrita)

// --- Mått i scenen (1920 × 1080) -------------------------------------------------------------------------------------------
export const SK = 1920 / 1376, sb = v => v * SK;          // storyboardens px → scenens
export const G = Math.round(sb(650));                      // marken, fötterna (907)
export const BUSK = { x: sb(1030), y: sb(650), h: sb(320) };
export const STENP = { x: sb(250), y: sb(645), h: sb(215) };
// stenens underkant (sten.png: [bildkolumn, lägsta täckta rad], uppmätt 2026-11-14). STENFORM = allt ovanför den, så att en
// figur bakom stenen bara syns ovanför stenen och aldrig under dess rundade sidor (björnen gömmer sig, 11–13)
const STEN_BOTTEN = [[48, 590], [100, 775], [157, 821], [214, 841], [271, 856], [328, 866], [385, 873], [442, 876], [556, 875],
  [670, 872], [784, 865], [898, 850], [955, 836], [1012, 828], [1069, 797], [1126, 752], [1172, 600]];
export const STENFORM = (() => { const s = STENP.h / (STEN.bb[3] - STEN.bb[1]), cx = (STEN.bb[0] + STEN.bb[2]) / 2;
  const P = STEN_BOTTEN.map(([ix, iy]) => [STENP.x + (ix - cx) * s, STENP.y + (iy - STEN.bb[3]) * s - 4]), a = P[0], b = P[P.length - 1];
  // bredvid stenen syns han bara ovanför stenens topp (STENP.y − 0,9 h), så att tassarna inte sticker ut vid stenens sidor
  const sida = f1(STENP.y - 0.9 * STENP.h);
  return `M${f1(a[0] - 400)} -2000L${f1(b[0] + 400)} -2000L${f1(b[0] + 400)} ${sida}L${f1(b[0])} ${sida}` + [...P].reverse().map(p => `L${f1(p[0])} ${f1(p[1])}`).join('') + `L${f1(a[0])} ${sida}L${f1(a[0] - 400)} ${sida}Z`; })();
export const BAR_F = '#3A4FB8';                           // blåbären (rekvisita/blabar.md)
// figurernas höjd (huvudets topp till fötterna) som i storyboarden: Olle 270, mor 370, björnen 370 (× SK)
const TOPP = { olle: 127, mor: 67, bjorn: 180 };
export const FIG = { olle: { mapp: 'pojken-olle', h: sb(270) }, mor: { mapp: 'mamma-mor', h: sb(370) }, bjorn: { mapp: 'bjornen-bulle', h: sb(370) } };
// händerna i armbildens 1024-ruta (uppmätta 2026-11-13: armens yttersta klump), för korgen och bären i handen
export const HANDP = { olle: { l: [140, 696], r: [878, 689] }, mor: { l: [150, 658], r: [867, 650] }, bjorn: { l: [205, 599], r: [819, 599] } };

// Kameror [zoom, cx, cy], storyboardens crop_zoom(x, y, w) = [1376 / w, x, y] × SK
export const kam = (x, y, w) => [1376 / w, sb(x), sb(y)];
export const K = { HEL: [1, 960, 540] };

export let KAM = [1, 0, 0], TT = 0, BLINKA;
export function kamera([z, cx, cy]) {
  const tx = Math.max(1920 - 1920 * z, Math.min(0, 960 - cx * z)), ty = Math.max(1080 - 1080 * z, Math.min(0, 540 - cy * z));
  KAM = [z, tx, ty];
  $('kamera').setAttribute('transform', `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${z.toFixed(4)})`);
  $('brus').nextElementSibling.setAttribute('scale', (5 / z).toFixed(2));
}
export const skarm = ([x, y]) => [KAM[1] + x * KAM[0], KAM[2] + y * KAM[0]];

// --- SVG:n: lagren bakifrån ------------------------------------------------------------------------------------------------
// figbak: figurer bakom busken och stenen, klippta vid marken (björnen kan sjunka ner bakom stenen utan att fötterna syns under den)
// figrunt: en kopia (<use>) av en figur i figbak, ritad framför busken bara till höger om en kant som sveper över figuren,
// så att han går runt buskens kant i stället för att hoppa mellan lagren (runtBusken)
const LAGER = ['platta', 'skugga', 'figbak', 'sten', 'buske', 'korgbak', 'figrunt', 'figurer', 'framsak', 'fram', 'kontur', 'krita'];
export function byggSvg() {
  document.body.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 1920 1080">
  <defs>
    <filter id="boil" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="5000">
      <feTurbulence id="brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="5"/>
    </filter>
    <filter id="vax" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="5000">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="korn" x="0" y="0" width="1" height="1">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.47  0 0 0 0 0.36  1.1 0 0 0 -0.47"/>
    </filter>
    <filter id="kritskugga" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="8" dy="13" stdDeviation="6" flood-color="#3a4a7a" flood-opacity="0.22"/></filter>
    <filter id="blakrita"><feColorMatrix type="hueRotate" values="222"/></filter>
    <filter id="mjukskugga" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="18"/></filter>
    <radialGradient id="vinjett" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#1c2a1c" stop-opacity="0"/><stop offset="1" stop-color="#1c2a1c" stop-opacity="1"/></radialGradient>
    <clipPath id="markklipp" clipPathUnits="userSpaceOnUse"><rect x="-500" y="-500" width="3000" height="${G + 500 + 1}"/></clipPath>
    <clipPath id="figurklipp" clipPathUnits="userSpaceOnUse"><path id="figurklippP" d=""/></clipPath>
    <clipPath id="fyllklipp" clipPathUnits="userSpaceOnUse"><circle id="fyllcirkel" r="0"/></clipPath>
    <linearGradient id="runtgrad" gradientUnits="userSpaceOnUse" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <mask id="runtmask" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="7000" height="5000"><rect x="-2000" y="-2000" width="7000" height="5000" fill="url(#runtgrad)"/></mask>
  </defs>
  <rect width="1920" height="1080" fill="#FAF8F2"/>
  <g id="kamera">${LAGER.map(n => n === 'figbak' ? `<g clip-path="url(#markklipp)"><g filter="url(#boil)"><g id="figbak"></g></g></g>`
    : n === 'figurer' ? `<g filter="url(#boil)"><g id="figurer"></g></g>` : `<g id="${n}"></g>`).join('')}</g>
  <g id="ram"></g>
  <g id="gomda" opacity="0"></g>
</svg>`);
}

// --- Skogen: plattan, stenen och busken (med blåbär) ----------------------------------------------------------------------
// sakSvg: en bild med sin synliga underkant (bb) i (x, y), höjden h (synlig), vriden v grader runt foten, sx/sy gung
const sakSvg = (o, x, y, h, { v = 0, sx = 1, sy = 1 } = {}) => { const s = h / (o.bb[3] - o.bb[1]), cx = (o.bb[0] + o.bb[2]) / 2;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${(s * sx).toFixed(4)} ${(s * sy).toFixed(4)}) translate(${-cx} ${-o.bb[3]})"><image href="${o.bild}" width="${o.w}" height="${o.h}"/></g>`; };
// ett blåbär i kod: rund djupblå kula, liten mörk krona, en ljus glans (bygg.py blåbär), r i scenens px
export const bar = (x, y, r, o = 1) => `<g transform="translate(${f1(x)} ${f1(y)})" opacity="${o.toFixed(2)}">
  <circle r="${f1(r + 2)}" fill="#fff"/><circle r="${f1(r)}" fill="${BAR_F}"/>
  <path d="${Array.from({ length: 10 }, (_, i) => { const a = Math.PI * i / 5 - Math.PI / 2, q = i % 2 ? 0.13 : 0.32; return `${i ? 'L' : 'M'}${f1(q * r * Math.cos(a))} ${f1(-0.62 * r + q * r * Math.sin(a))}`; }).join('')}Z" fill="#1e285a"/>
  <ellipse cx="${f1(-0.35 * r)}" cy="${f1(-0.3 * r)}" rx="${f1(0.2 * r)}" ry="${f1(0.16 * r)}" fill="#96aaf0" opacity="0.75"/></g>`;
const BUSK_BAR = [[-0.32, -0.62], [-0.05, -0.78], [0.25, -0.6], [0.36, -0.32], [-0.4, -0.3], [0.05, -0.42], [-0.18, -0.18], [0.18, -0.15]];
export const buskBar = i => [BUSK.x + BUSK_BAR[i][0] * BUSK.h * 1.35, BUSK.y + BUSK_BAR[i][1] * BUSK.h];
// gung: 0–1 busken prasslar (vickar runt foten, lövverket gungar); borta: de bär som plockats (index)
export function skog({ gung = 0, stenGung = 0, borta = [], utanSten = false } = {}) {
  $('platta').innerHTML = `<image href="${PLATTA}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>`;
  const g = gung * Math.sin(TT * 2 * Math.PI * 3.2), v = 2.2 * g, sx = 1 + 0.025 * g;
  lagg('skugga', markskugga(BUSK.x, BUSK.y, 640) + (utanSten ? '' : markskugga(STENP.x, STENP.y, 400)));
  $('buske').innerHTML = `<g>${sakSvg(BUSKE, BUSK.x, BUSK.y, BUSK.h, { v, sx })}
    <g transform="rotate(${f1(v)} ${f1(BUSK.x)} ${f1(BUSK.y)})">${BUSK_BAR.map((_, i) => borta.includes(i) ? '' : bar(...buskBar(i), 15)).join('')}</g></g>`;
  $('sten').innerHTML = utanSten ? '' : sakSvg(STEN, STENP.x, STENP.y, STENP.h, { v: 1.2 * stenGung * Math.sin(TT * 2 * Math.PI * 3) });
}
export const markskugga = (x, golv, w, h = 0) => { const k = 1 / (1 + h / 120);
  return `<ellipse cx="${f1(x + 6)}" cy="${f1(golv + 2)}" rx="${f1(w * 0.5 * k)}" ry="${f1(w * 0.085 * k)}" fill="#3e5a3a" opacity="${(0.09 * k).toFixed(3)}" filter="url(#mjukskugga)"/>`; };

// --- Korgen: korg-v3-tunn, n blåbär i öppningen ------------------------------------------------------------------------------
// (x, y) = korgens underkant, mitt; h = synlig höjd. Tre lager i korgbildens egna px: hela korgen, bären i öppningen, och
// korgen igen klippt till det som ligger NEDANFÖR den främre kantens överkant (en ellips genom bildrad ~536 i mitten,
// ~524 vid x 300/720, uppmätt 2026-11-14). Så hamnar bärens nederkanter bakom framkanten och bären ligger I korgen.
export const KORG_H = sb(95);
const KORG_FRAM = 'M150 466A370 70 0 0 0 890 466L1100 466L1100 1100L-100 1100L-100 466Z';
// bärens mitt i korgbildens px; de övre ligger längre bak i högen och ritas först
const KORG_HOG = [[[520, 500]], [[455, 505], [585, 505]], [[385, 498], [520, 508], [655, 498]]];
KORG_HOG.push([...KORG_HOG[2], [455, 446]], [...KORG_HOG[2], [455, 446], [585, 446]], [...KORG_HOG[2], [455, 446], [585, 446], [520, 396]]);
let KORG_ID = 0;
export const korgTopp = (x, y, h = KORG_H) => [x, y - (915 - 470) * h / (KORG.bb[3] - KORG.bb[1])];   // öppningens mitt i scenen
export function korgSvg(x, y, h = KORG_H, n = 0, v = 0) {
  const s = h / (KORG.bb[3] - KORG.bb[1]), cx = (KORG.bb[0] + KORG.bb[2]) / 2, id = 'korgfram' + (++KORG_ID);
  const hog = n > 0 ? [...KORG_HOG[Math.min(n, KORG_HOG.length) - 1]].sort((a, b) => a[1] - b[1]) : [];
  const img = `<image href="${KORG.bild}" width="${KORG.w}" height="${KORG.h}"`;
  return `<g transform="rotate(${f1(v)} ${f1(x)} ${f1(y)})"><g transform="translate(${f1(x)} ${f1(y)}) scale(${s.toFixed(4)}) translate(${-cx} ${-KORG.bb[3]})">` +
    `${img}/>${hog.map(([bx, by]) => bar(bx, by, 76)).join('')}` +
    `<clipPath id="${id}"><path d="${KORG_FRAM}"/></clipPath>${img} clip-path="url(#${id})"/></g></g>`;
}

// --- Figurerna ------------------------------------------------------------------------------------------------------------
export const R = {};       // riggarna: R.olle, R.mor, R.bjorn (v2rigg)
const GF = {};             // en <g> per figur
export const skala = n => FIG[n].h / (R[n].FOTTER - TOPP[n]);
export const ANS = (n, namn, o = {}) => ({ ...R[n].blanda('neutral', namn, 1), ...o });
export const POS = (n, o = {}) => ({ ...R[n].POSE0, ...o });
// figur(namn, [x, fot], ansikte, pose, { bak: bakom busken/stenen, skugga, mun: blå mun 0–1, nos: blå prickar 0–1, sx,
//   klipp: [x0, x1, y1] — klipper figuren till en rektangel (t.ex. stenens fotavtryck, så att björnen inte syns utanför stenen) })
export function figur(n, [x, fot], f, p, { bak = false, skugga = true, bla = 0, nos = 0, klipp = 0 } = {}) {
  const g = GF[n], s = skala(n), L = R[n];
  $(bak ? 'figbak' : 'figurer').appendChild(g);
  // klippet sitter på lagret figbak (scenens koordinater), inte på figuren: figurens egen transform (skala, flytt) skulle annars
  // gälla klippet också, och då hamnar stenens kant fel och björnen syns under stenen. Bara björnen står någonsin i figbak.
  if (bak) { if (klipp) { $('figurklippP').setAttribute('d', klipp); $('figbak').setAttribute('clip-path', 'url(#figurklipp)'); }
    else $('figbak').removeAttribute('clip-path'); }
  g.removeAttribute('clip-path');
  g.setAttribute('transform', `translate(${f1(x)} ${f1(fot)}) scale(${s.toFixed(4)}) translate(-512 ${-L.FOTTER})`);
  L.rita(g, BLINKA[n](f, TT), p.andas === false ? p : { ...p, strack: (p.strack || 0) + 0.012 * Math.sin(2 * Math.PI * TT / 3.4 + n.length) });
  g.querySelector('.figuren').setAttribute('opacity', 1);
  // riggens egen skugga av: markskuggan i ritaSkog är den enda, mjuk och ljus (feedback 2026-11-14)
  const sk = g.querySelector('.skugga'); if (sk) sk.setAttribute('opacity', 0);
  // blå mun (Olle efter bären) och blå prickar på nosen (björnen), i ansiktets lager så att de följer nick och skak
  g.querySelectorAll('.bla').forEach(e => e.remove());
  const drag = g.querySelector('.drag');
  if (drag && bla > 0.01) { const m = n === 'olle' ? [511, 470] : [512, 476];
    drag.insertAdjacentHTML('beforeend', `<ellipse class="bla" cx="${m[0]}" cy="${m[1]}" rx="40" ry="20" fill="#6e64be" opacity="${(0.5 * bla).toFixed(2)}"/>`); }
  if (drag && nos > 0.01) drag.insertAdjacentHTML('beforeend', [[-40, 70], [30, 80], [60, 50], [-10, 105]].map(([dx, dy]) =>
    `<circle class="bla" cx="${512 + dx}" cy="${400 + dy}" r="10" fill="${BAR_F}" opacity="${(0.85 * nos).toFixed(2)}"/>`).join(''));
  return g;
}
// runtBusken: figuren står i figbak (bakom busken) och en kopia ritas framför busken till höger om x0 (scenens x). Sveper
// x0 från figurens högra kant till den vänstra kommer han fram runt buskens högra kant; åt andra hållet går han in bakom den.
// Kopian får samma boil som figbak, så de två lagren ligger exakt på varandra.
export function runtBusken(n, x0) {
  const g = GF[n]; if (!g.id) g.id = 'fig-' + n;
  // mjuk kant (ca 180 px) i stället för ett rakt snitt genom busken
  const gr = $('runtgrad'); gr.setAttribute('x1', f1(x0 - 90)); gr.setAttribute('x2', f1(x0 + 90));
  lagg('figrunt', `<g filter="url(#boil)"><use href="#${g.id}" mask="url(#runtmask)"/></g>`);
}
// en punkt i figurens 1024-ruta (eller i en dels egen bild, sel) → scenen
export function punkt(n, [px, py], sel = null) {
  const g = GF[n], el = sel ? [...g.querySelectorAll(sel)].find(e => e.getAttribute('opacity') !== '0' && e.getAttribute('display') !== 'none') || g.querySelector(sel) : g;
  const m = $('kamera').getCTM().inverse().multiply(el.getCTM()), q = new DOMPoint(px, py).matrixTransform(m);
  return [q.x, q.y];
}
export const hand = (n, sida) => punkt(n, HANDP[n][sida], '.arm-' + sida);

// gång: riggens ga-slinga mitt i en sträcka (benen kliver, kroppen gungar), utan slingans egen x; rikt −1/1 åt vänster/höger
// (som verktyg/rigg-motor.js steg(), som v2rigg inte lämnar ut): lugn takt, ca 0,6 slingor (1,25 steg) per sekund, amp 0–1
// stegens styrka. Björnen gungar knappt upp och ner, så att han går och inte skuttar (feedback 2026-11-14)
export const gaPose = (n, tl, rikt = 1, amp = 1) => { const fi = tl * 1.25 * Math.PI, f = Math.sin(fi) * amp;
  return [ANS(n, 'glad', { titt: [8 * rikt * amp, 0] }), POS(n, { rikt: 0.8 * rikt * amp, luta: (n === 'bjorn' ? 2 : 3) * f, lyft: -Math.abs(f) * (n === 'bjorn' ? 2.5 : 6),
    ben: [14 * f, 14 * f], benY: [-34 * Math.max(0, -f), -34 * Math.max(0, f)], gang: amp, sving: f, boj: 3 * rikt * amp })]; };
export const vink = (tl, v, sida = 1, sakta = 1) => { const a = v * (86 + 12 * Math.sin(2 * Math.PI * 1.1 * sakta * tl)); return { luta: 2 * v * sida, armar: sida > 0 ? [0, a] : [a, 0] }; };
export const nick = (tl, t0) => -0.8 * bump(t0, t0 + 0.6, tl);
export const hopp = (u, h = 80) => -h * Math.sin(Math.PI * kl(u));

// --- Skimmer och krit-gnistor --------------------------------------------------------------------------------------------
const stjarna = (x, y, r, o = 1) => `<path transform="translate(${f1(x)} ${f1(y)}) scale(${r.toFixed(2)})" opacity="${o.toFixed(2)}" d="M0 -1 L.2 -.2 L1 0 L.2 .2 L0 1 L-.2 .2 L-1 0 L-.2 -.2Z" fill="#fff6c8" stroke="#e6b422" stroke-width=".06"/>`;
export const skimmer = (x, y, k, t, vidd = 1) => k > 0.01 && lagg('fram', [[-1, -0.7, 1, 0], [1.1, -0.4, 0.8, 1.7], [0.2, 1.1, 0.7, 3.1], [-1.2, 0.8, 0.6, 4.4]]
  .map(([dx, dy, s, f]) => stjarna(x + dx * 30 * vidd, y + dy * 26 * vidd, 12 * vidd * s * k * (0.8 + 0.25 * Math.sin(t * 5 + f)), Math.min(1, 0.3 + k))).join(''));

// --- Kritan --------------------------------------------------------------------------------------------------------------
const mitt2 = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], P2 = p => f1(p[0]) + ' ' + f1(p[1]);
function mjukD(pts) {
  const n = pts.length, sluten = Math.hypot(pts[0][0] - pts[n - 1][0], pts[0][1] - pts[n - 1][1]) < 2;
  if (sluten) { const Q = pts.slice(0, -1), m = Q.length; return `M${P2(mitt2(Q[m - 1], Q[0]))}` + Q.map((p, i) => `Q${P2(p)} ${P2(mitt2(p, Q[(i + 1) % m]))}`).join(''); }
  if (n === 2) return `M${P2(pts[0])}L${P2(pts[1])}`;
  return `M${P2(pts[0])}L${P2(mitt2(pts[0], pts[1]))}` + pts.slice(1, -1).map((p, i) => `Q${P2(p)} ${P2(mitt2(p, pts[i + 2]))}`).join('') + `L${P2(pts[n - 1])}`;
}
const BANOR = new Map();
function bana(pts, nyckel) {
  if (!BANOR.has(nyckel)) { const d = mjukD(pts), el = document.createElementNS('http://www.w3.org/2000/svg', 'path'); el.setAttribute('d', d); $('gomda').appendChild(el); BANOR.set(nyckel, { d, el, L: el.getTotalLength() }); }
  return BANOR.get(nyckel);
}
const banPunkt = (b, f) => { const q = b.el.getPointAtLength(kl(f) * b.L); return [q.x, q.y]; };
const ritTakt = f => 0.5 * kl(f) + 0.5 * mjuk(f);
export const kritaVanta = ([x, y], tw) => [[x + 3 * Math.sin(tw * 1.1), y + 5 * Math.sin(tw * 1.6)], 125 + 4 * Math.sin(tw * 1.3)];
export const krita = ([x, y], v = 125, s = 0.45) =>
  lagg('krita', `<g filter="url(#blakrita)"><image href="${KRITA}" width="755" height="265" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${s}) translate(${-KRITA_SPETS[0]} ${-KRITA_SPETS[1]})"/></g>`);
function smulor(p) {
  let h = '';
  for (let j = 0; j < 8; j++) { const b = Math.floor(TT * 14) - j, age = TT - b / 14, r = slump(b * 7.13), r2 = slump(b * 3.31 + 1.7), op = Math.max(0, 0.7 - age * 1.4);
    if (op > 0) h += `<circle cx="${f1(p[0] + (r - 0.5) * 26)}" cy="${f1(p[1] + 6 + age * 55 + r2 * 8)}" r="${f1(2 + 2.5 * r2)}" fill="${BAR_F}" opacity="${op.toFixed(2)}"/>`; }
  for (let j = 0; j < 3; j++) { const b = Math.floor(TT * 3) - j, age = TT - b / 3, r = slump(b * 5.7 + 2), r2 = slump(b * 9.1 + 4), k = bump(0, 0.9, age);
    if (k <= 0) continue; const x = p[0] + (r - 0.5) * 70, y = p[1] - (14 + 26 * r2 + 18 * age), R_ = (7 + 4 * r2) * k;
    h += `<path d="M${f1(x)} ${f1(y - R_)} Q${f1(x)} ${f1(y)} ${f1(x + R_)} ${f1(y)} Q${f1(x)} ${f1(y)} ${f1(x)} ${f1(y + R_)} Q${f1(x)} ${f1(y)} ${f1(x - R_)} ${f1(y)} Q${f1(x)} ${f1(y)} ${f1(x)} ${f1(y - R_)}Z" fill="#FFF3B8" stroke="#fff" stroke-width="2.2" paint-order="stroke" opacity="${(0.9 * k).toFixed(2)}"/>`; }
  lagg('krita', h);
}

// --- Ritintrot: kritan ritar ett stort blåbär med krona (format/ritintro.md) ------------------------------------------------
// Konturen i ett drag (cirkeln, 0,6–6,0 s), kronan (6,1–7,0 s); kritan lyfter och väntar; blåbäret fylls i inifrån, fyra gnistor.
export const BB = { x: 960, y: 560, r: 250 };
const RUND = Array.from({ length: 49 }, (_, i) => { const a = -Math.PI / 2 - 0.35 + 2 * Math.PI * i / 48, w = 1 + 0.025 * Math.sin(3 * a + 1);
  return [BB.x + BB.r * w * Math.cos(a), BB.y + BB.r * w * 0.97 * Math.sin(a)]; });
const KRONA = Array.from({ length: 11 }, (_, i) => { const a = Math.PI * i / 5 - Math.PI / 2, q = i % 2 ? 0.13 : 0.32;
  return [BB.x + q * BB.r * Math.cos(a), BB.y - 0.62 * BB.r + q * BB.r * Math.sin(a)]; });
export const RIT = { in: 0.6, rund: [0.6, 6.0], krona: [6.1, 7.0] };
// st = { kontur sekunder in i ritandet (0 = kritan börjar), fyll 0–1, inn: kritans entré (s) eller null, vanta: väntad tid, zoom }
export function ritaPapper(st) {
  $('platta').innerHTML = `<rect x="-200" y="-200" width="2400" height="1500" fill="#FBF7EE"/><rect x="-200" y="-200" width="2400" height="1500" filter="url(#korn)"/>`;
  kamera(st.kam || K.HEL);
  const s = st.kontur ?? 0, fr = kl((s - RIT.rund[0]) / (RIT.rund[1] - RIT.rund[0])), fk = kl((s - RIT.krona[0]) / (RIT.krona[1] - RIT.krona[0]));
  let h = '', spets = null;
  if (fr > 0) { const b = bana(RUND, 'rund'), r = ritTakt(fr); h += `<path d="${b.d}" pathLength="1" fill="none" stroke="${BAR_F}" stroke-width="15" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${r.toFixed(4)} 2"/>`; if (fr < 1) spets = banPunkt(b, r); }
  if (fk > 0) { const b = bana(KRONA, 'krona'), r = ritTakt(fk); h += `<path d="${b.d}" pathLength="1" fill="none" stroke="#1e285a" stroke-width="12" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${r.toFixed(4)} 2"/>`; if (fk < 1) spets = banPunkt(b, r); }
  const fyll = st.fyll || 0;
  if (h) lagg('kontur', `<g filter="url(#vax)" opacity="${(1 - del(0.5, 1, fyll)).toFixed(3)}">${h}</g>`);
  if (fyll > 0) { const c = $('fyllcirkel'); c.setAttribute('cx', BB.x); c.setAttribute('cy', BB.y); c.setAttribute('r', fyll >= 1 ? 3000 : f1(BB.r * 1.15 * mjuk(fyll)));
    lagg('fram', `<g clip-path="url(#fyllklipp)" filter="url(#boil)">${bar(BB.x, BB.y, BB.r)}</g>`); }
  // fyra krit-gnistor poppar när bilden är ifylld
  if (fyll > 0.6) { const u = (st.efter || 0); [[-1.25, -0.9], [1.2, -0.95], [1.35, 0.55], [-1.3, 0.6]].forEach(([dx, dy], i) => {
    const k = bump(0.1 * i, 0.1 * i + 1.1, u); if (k > 0) lagg('fram', stjarna(BB.x + dx * BB.r, BB.y + dy * BB.r, 26 * k, k)); }); }
  const vant = [BB.x + BB.r + 160, BB.y - BB.r - 40];
  if (st.inn != null) { const u = mjuk(st.inn / 0.6), start = RUND[0], p = st.inn < 0.6 ? [lerp(2200, start[0], u), lerp(-120, start[1], u)] : start; krita(p, lerp(150, 125, u)); }
  else if (spets) { krita(spets); smulor(spets); }
  else if (s > RIT.rund[1] && s < RIT.krona[0]) krita(KRONA[0]);
  else if (fyll < 1 && st.vanta != null) { const [p, v] = kritaVanta(vant, st.vanta), u = del(0, 0.8, fyll); krita([lerp(p[0], p[0] + 700, u), lerp(p[1], p[1] - 600, u)], v); }
  if (st.vit) lagg('ram', `<rect x="-50" y="-50" width="2020" height="1180" fill="#FFFFFF" opacity="${st.vit.toFixed(3)}"/>`);
}

// --- Kritirisen (ur 020/026) ---------------------------------------------------------------------------------------------
export function kritiris(r, [cx, cy], t) {
  if (r >= 1400) return;
  const ring = 'M' + Array.from({ length: 145 }, (_, j) => { const a = j / 144 * 2 * Math.PI, rr = r * (1 + 0.07 * Math.sin(9 * a + t * 0.8));
    return `${f1(cx + rr * Math.cos(a))} ${f1(cy + rr * Math.sin(a))}`; }).join('L') + 'Z';
  lagg('ram', `<path d="M-50 -50H1970V1130H-50Z ${r > 1 ? ring : ''}" fill="#101010" fill-rule="evenodd"/>
    ${r > 1 ? `<path d="${ring}" fill="none" stroke="#fff8e0" stroke-width="${Math.min(14, r / 4)}" stroke-linejoin="round" filter="url(#boil)"/>` : ''}`);
}
export const irisR = (u, r0 = 420) => u < 1.6 ? lerp(1400, r0, mjuk(u / 1.6)) : lerp(r0, 0, mjuk((u - 2.6) / 0.6));

// --- Varje bildruta --------------------------------------------------------------------------------------------------------
let VARM = false;
export function borja(t, varm = true) {
  TT = t; VARM = varm;
  ['platta', 'skugga', 'sten', 'buske', 'korgbak', 'figrunt', 'framsak', 'fram', 'kontur', 'krita', 'ram'].forEach(n => $(n).innerHTML = '');
  $('figbak').removeAttribute('clip-path');
  Object.values(GF).forEach(g => $('gomda').appendChild(g));
}
export function slut(t, DURATION, SVART = 0) {
  if (VARM) lagg('ram', '<rect x="-50" y="-50" width="2020" height="1180" fill="#FFB46A" opacity="0.07" style="mix-blend-mode:soft-light"/><rect x="0" y="0" width="1920" height="1080" fill="url(#vinjett)" opacity="0.12"/>');
  if (SVART && t > DURATION - SVART) lagg('ram', '<rect x="-50" y="-50" width="2020" height="1180" fill="#101010"/>');
  $('brus').setAttribute('seed', (Math.floor(Math.round(t * 30) / 3) % 50) + 1);
  window.kant?.uppdatera();
}

// --- Ljud ------------------------------------------------------------------------------------------------------------------
const FINNS_FIL = new Map();
export const finns = async u => { if (!FINNS_FIL.has(u)) FINNS_FIL.set(u, fetch(u, { method: 'HEAD' }).then(r => r.ok).catch(() => false)); return FINNS_FIL.get(u); };
export async function bara(ut) {   // behåll bara filerna som finns (saknade blir tystnad)
  const ok = await Promise.all(ut.map(c => finns('/' + c.fil)));
  const saknas = ut.filter((c, i) => !ok[i]);
  if (saknas.length) console.log('ljud saknas:', [...new Set(saknas.map(c => c.fil))].join(', '));
  return ut.filter((c, i) => ok[i]);
}

// --- Start -----------------------------------------------------------------------------------------------------------------
export async function starta() {
  byggSvg();
  for (const n of Object.keys(FIG)) { R[n] = await v2rigg(FIG[n].mapp); GF[n] = R[n].figur(512, R[n].FOTTER, 1, $('gomda')); window.kant?.lagg(GF[n].querySelector('.figuren')); }
  BLINKA = { olle: skapaBlinka(17), mor: skapaBlinka(41), bjorn: skapaBlinka(29) };
  await Promise.all([PLATTA, BUSKE.bild, STEN.bild, KORG.bild, KRITA].map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
}
