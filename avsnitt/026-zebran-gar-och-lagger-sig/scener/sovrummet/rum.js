// Sovrummet med zebran: det gemensamma för 026 Zebran går och lägger sig och 027 Zebran plockar undan (samma rum, säng och figur).
// Båda avsnittens scener/sovrummet/index.html importerar den här filen. Förlaga: 023 scener/badet (kritan, ritintrot, kritirisen).
//   import * as R from '/avsnitt/026-zebran-gar-och-lagger-sig/scener/sovrummet/rum.js';
//   await R.starta();  sedan per bildruta: R.borja(t), R.kamera(…), R.rum({ natt, lampa, mane, dag }), R.zebra(…), R.slut(t)
// Zebran är Zebbes v2-rigg live ur uttryck.html (cut-tunn/, kanten 1 %). Sovbilden (Somnar C) är cut-tunn/zebbe-sover.png.
// Plattan, sängen och täcket: bilderna görs av bildsessionen. Tills de finns ritas platshållare i kod (samma mått).
export const $ = id => document.getElementById(id);
export const A = '/assets/';
export const kl = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k)), lerp = (a, b, k) => a + (b - a) * k;
export const mjuk = k => (k = kl(k), k * k * (3 - 2 * k)), del = (a, b, t) => mjuk((t - a) / (b - a));
export const bump = (a, b, t) => (t <= a || t >= b) ? 0 : Math.sin(Math.PI * (t - a) / (b - a));
export const f1 = v => v.toFixed(1);
export const slump = x => { const v = Math.sin(x * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
export const lagg = (id, h) => $(id).insertAdjacentHTML('beforeend', h);

// --- Bilderna ----------------------------------------------------------------------------------------------------------------
// ⚠ Sökvägarna som bildsessionen levererar till; finns filen inte ritas platshållaren.
export const PLATTA = A + 'bakgrunder/sovrummet/sovrummet-v1.jpeg';
export const SANG = { bild: A + 'rekvisita/sangen/cut/sangen.png' };
export const TACKE = { bild: A + 'rekvisita/tacket/cut/tacket.png' };
export const KUDDE = { bild: A + 'rekvisita/kudde/cut/kudde-v1-zebbe.png', s: 0.2 };          // 1024-ruta, kudden 877 × 863
// nallen v2 (Sanna 2026-11-12: den ljusbruna från 016/godnattsagorna, ansiktet i kod som 016 natt.js): 848×856, synlig 39–809 × 42–816
export const NALLE = { bild: A + 'rekvisita/nalle/cut/nalle-v2-ljus-tunn.png', w: 848, h: 856, fot: [424, 816], hojd: 774, s: 0.196 };
// inredningen (Sanna 2026-11-12 "mer inredning", ur rekvisita): klockan på väggen (båda), nattbordet med vattenglaset (026), stolen (027)
export const KLOCKA = { bild: A + 'rekvisita/klocka/cut/klocka.png', x: 1590, y: 300, w: 118 };
export const NATTBORD = { bild: A + 'rekvisita/vaggskap/cut/vaggskap.png', w: 945, h: 623, fot: [472, 609], topp: 13, s: 0.205, x: 1480, y: 1040 };
export const STOL = { bild: A + 'rekvisita/stol/cut/stol.png', w: 605, h: 896, fot: [303, 884], s: 0.2, x: 1560, y: 880 };
// vattenglaset: mjolkglas-v1-tomt-zebbe.png (1024, glaset 201–823 × 90–933) med vattnet i kod bakom det vita krit-glaset
export const GLAS = { bild: A + 'rekvisita/mjolkglas/cut/mjolkglas-v1-tomt-zebbe.png', fot: [512, 930], s: 0.075 };
export const glasSvg = () => `<path d="M228 330 L800 330 L768 900 L262 900Z" fill="#BFE3F5" opacity="0.8"/><image href="${GLAS.bild}" width="1024" height="1024"/>`;
export const MANE = A + 'bakgrunder/appeltradet-natt/mane.png';                                // 800 × 867
const KRITA = A + 'rekvisita/krita-rod/cut/krita-rod-tunn.png', KRITA_SPETS = [742, 132];
export const SOV = { fil: A + 'karaktarer/zebran-zebbe/premium/cut-tunn/zebbe-sover.png', cx: 512, botten: 838, skala: 0.86, huvud: [370, 563] };

// --- Mått i scenen (1920 × 1080) -----------------------------------------------------------------------------------------
export const GOLV = 905, GS = 0.5;                  // golvlinjen (fötterna) och zebrans skala överallt
export const ZX = 1000;                             // zebran står bakom sängen, mitt i
export const VID = [ZX, GOLV - 20];                 // fötterna bakom sängen (lite längre in i rummet)
export const FATKANT = 700;                         // zebrans y (riggens 1024-ruta) vid madrassens överkant: syns från magen och upp
export const RIM = Math.round(VID[1] + (FATKANT - 925) * GS);   // madrassens överkant, 772
// Sängen sedd från sidan: huvudgavel till vänster, fotgavel till höger, ben med luft under (bollen i 027)
// sängen: sangen.png (1273×667, madrassens överkant y 288) i skala 0,6 med mitten på x 1000, madrassen på RIM; måtten nedan är
// uppmätta i bilden (2026-11-11). Under ramen (y 908–984) är det öppet: där ligger bollen i 027.
export const SANG_BILD = { s: 0.6, x: 1000 - 0.6 * 636, y: RIM - 0.6 * 288, w: 1273, h: 667 };
export const BED = { x0: 663, x1: 1338, rim: RIM, sida: 851, under: 984, ben: [[693, 732], [1269, 1308]], gavelV: 614, gavelH: 706 };
export const FONSTER = { cx: 552, cy: 321, r: 173 };   // runt fönster, tomt inuti (himlen i kod) // uppmätt i sovrummet-v1.jpeg (1376×768, slice ×1,406)
export const LAMPA = [1798, 640];                     // lampskärmens underkant, mitt (skenet)
export const KUDDE_POS = [770, RIM + 2];             // kuddens underkant, mitt: ligger ovanpå madrassen (Sanna 2026-11-12: "kudden hamnar bakom sängen")
export const NALLE_POS = [1230, RIM + 14];           // där nallen sitter bredvid zebran

export const iFig = ([x, fot], [px, py], s = GS) => [x + (px - 512) * s, fot + (py - 925) * s];

// Kameror [zoom, cx, cy], bara klipp
export const K = {
  HEL: [1, 960, 540],
  HALV: [1.6, ZX - 20, 640],
  NARA: [2.4, ZX, VID[1] - (925 - 430) * GS],              // ansiktet
  FONSTER: [1.4, 700, 470],                                 // fönstret och zebran
  LAMPA: [1.4, 1360, 600],                                  // lampan och zebran
  KUDDE: [2.4, KUDDE_POS[0], KUDDE_POS[1] - 100],           // närbild på kudden (nallen bakom den)
  KUDDE_RIT: [2.0, KUDDE_POS[0] + 40, KUDDE_POS[1] - 110],  // kritan ritar kudden
};

export let L, G, KAM = K.HEL, TT = 0, BLINKA;
export function kamera([z, cx, cy]) {
  const tx = Math.max(1920 - 1920 * z, Math.min(0, 960 - cx * z)), ty = Math.max(1080 - 1080 * z, Math.min(0, 540 - cy * z));
  KAM = [z, tx, ty];
  $('kamera').setAttribute('transform', `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${z.toFixed(4)})`);
  $('brus').nextElementSibling.setAttribute('scale', (5 / z).toFixed(2));
}
export const skarm = ([x, y]) => [KAM[1] + x * KAM[0], KAM[2] + y * KAM[0]];

// --- SVG:n: lagren i ordning bakifrån ------------------------------------------------------------------------------------
// zebran bakom sängen; nallen bakom kudden; kudden och sovbilden sjunker lite ner bakom sängens framkant; täcket ligger
// mellan sovbilden och sängen (det glider upp bakom sängkanten); natt = mörkret och lampans sken; himlen i fönstret ovanpå.
const LAGER = ['platta', 'bak', 'figurer', 'under', 'nalle', 'kudde', 'sov', 'tacke', 'sang', 'framfig', 'golvsak', 'korg', 'natt', 'himmel', 'fram', 'kontur', 'krita'];
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
    <filter id="kritskugga" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="8" dy="13" stdDeviation="6" flood-color="#7a4a3a" flood-opacity="0.22"/></filter>
    <radialGradient id="lampsken"><stop offset="0" stop-color="#FFE7A3" stop-opacity="0.75"/><stop offset="0.45" stop-color="#FFD57A" stop-opacity="0.28"/><stop offset="1" stop-color="#FFD57A" stop-opacity="0"/></radialGradient>
    <radialGradient id="manljus"><stop offset="0" stop-color="#FFF6D2" stop-opacity="0.7"/><stop offset="1" stop-color="#FFF6D2" stop-opacity="0"/></radialGradient>
    <radialGradient id="vinjett" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#2a1c12" stop-opacity="0"/><stop offset="1" stop-color="#2a1c12" stop-opacity="1"/></radialGradient>
    <filter id="morkna"><feColorMatrix type="matrix" values="0 0 0 0 0.17  0 0 0 0 0.23  0 0 0 0 0.47  0 0 0 1 0"/></filter>
    <filter id="mjukskugga" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>
    <clipPath id="fyllklipp"><circle id="fyllcirkel" r="0"/></clipPath>
    <clipPath id="fyll-sak"><circle id="cirkel-sak" r="0"/></clipPath>
    <clipPath id="tackeklipp" clipPathUnits="userSpaceOnUse"><rect x="-200" y="-400" width="2400" height="${BED.sida + 400}"/></clipPath>
    <clipPath id="fonsterklipp"><circle cx="${FONSTER.cx}" cy="${FONSTER.cy}" r="${FONSTER.r - 14}"/></clipPath>
  </defs>
  <rect width="1920" height="1080" fill="#FAF8F2"/>
  <g id="kamera">${LAGER.map(n => n === 'figurer' || n === 'framfig' ? `<g filter="url(#boil)"><g id="${n}"></g></g>` : n === 'tacke' ? '<g clip-path="url(#tackeklipp)"><g id="tacke"></g></g>' : `<g id="${n}"></g>`).join('')}</g>
  <g id="ram"></g>
  <g id="gomda" opacity="0"></g>
</svg>`);
}

// Grupper som behåller sin vita kant mellan bildrutorna: en per sak (kanten räknas på sakens egen höjd)
const GRUPPER = {};
export function grupp(namn, lager, kant = {}) {
  if (!GRUPPER[namn]) { const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.id = 'g-' + namn; $(lager).appendChild(g);
    GRUPPER[namn] = g; if (kant !== false) window.kant?.lagg(g, kant); }
  return GRUPPER[namn];
}
export const satt = (namn, h) => { GRUPPER[namn].innerHTML = h; };

// --- Rummet --------------------------------------------------------------------------------------------------------------
export let FINNS = {};
const VAGG = '#4F7FB5', VAGG_M = '#41709F', GOLVF = '#F3ECDF';
function plattaKod() {    // platshållaren: lugn himmelsblå vägg, vitt golv, runt fönster till vänster, nattduksbord med lampa till höger
  return `<rect x="-200" y="-200" width="2400" height="1100" fill="${VAGG}"/>
    <g opacity="0.18" stroke="${VAGG_M}" stroke-width="40">${Array.from({ length: 14 }, (_, i) => `<path d="M${-100 + 150 * i} -100 V820"/>`).join('')}</g>
    <rect x="-200" y="800" width="2400" height="500" fill="${GOLVF}"/><rect x="-200" y="792" width="2400" height="16" fill="#E6DCCB"/>
    <circle cx="${FONSTER.cx}" cy="${FONSTER.cy}" r="${FONSTER.r}" fill="#F7F1E6"/><circle cx="${FONSTER.cx}" cy="${FONSTER.cy}" r="${FONSTER.r - 14}" fill="#BFDDF0"/>
    <g fill="#E8BE86"><rect x="1625" y="762" width="170" height="20" rx="8"/><rect x="1638" y="780" width="144" height="80" rx="8"/>
      <rect x="1648" y="858" width="16" height="48" rx="5"/><rect x="1756" y="858" width="16" height="48" rx="5"/></g>
    <circle cx="1710" cy="820" r="7" fill="#C9965A"/>
    <path d="M1690 762 Q1696 740 1704 724 L1716 724 Q1724 740 1730 762Z" fill="#F4E2C4"/><rect x="1706" y="${LAMPA[1]}" width="8" height="50" fill="#D7B48A"/>
    <path d="M1654 ${LAMPA[1]} L1676 618 L1744 618 L1766 ${LAMPA[1]}Z" fill="#FBE7B4" stroke="#EBCB86" stroke-width="5" stroke-linejoin="round"/>
    <text x="960" y="60" style="font:700 26px system-ui;fill:#fff;opacity:.7;text-anchor:middle">⚠ platshållare: sovrummet</text>`;
}
function sangKod() {      // platshållaren: låg säng i trä sedd från sidan, gavel i båda ändar, ben med luft under
  const { x0, x1, rim, sida, ben, gavelV, gavelH } = BED;
  return `<g fill="#C88B5A"><rect x="${x0 - 22}" y="${gavelV}" width="46" height="${GOLV - gavelV}" rx="20"/>
      <rect x="${x1 - 24}" y="${gavelH}" width="46" height="${GOLV - gavelH}" rx="20"/>
      ${ben.map(([a, b]) => `<rect x="${a}" y="${sida - 10}" width="${b - a}" height="${GOLV - sida + 10}" rx="8"/>`).join('')}</g>
    <rect x="${x0}" y="${rim - 4}" width="${x1 - x0}" height="62" rx="24" fill="#FBF6EC"/>
    <rect x="${x0 + 10}" y="${rim + 44}" width="${x1 - x0 - 20}" height="${sida - rim - 40}" rx="12" fill="#D79A68"/>
    <text x="${(x0 + x1) / 2}" y="${sida + 64}" style="font:700 22px system-ui;fill:#7a4a32;opacity:.55;text-anchor:middle">⚠ platshållare: sängen</text>`;
}
// Täcket (platshållare): en mjuk gul filt, 500 × 230, med rundad ovankant. (x, y) = ovankantens mitt.
export const TACKE_MATT = { w: 520, h: 192 };   // tacket.png 1316×485
function tackeKod() { const { w, h } = TACKE_MATT;
  return `<path d="M${-w / 2} 30 Q${-w / 2} 0 ${-w / 2 + 40} 0 H${w / 2 - 40} Q${w / 2} 0 ${w / 2} 30 V${h} H${-w / 2}Z" fill="#F2C14E"/>
    <path d="M${-w / 2 + 16} 34 H${w / 2 - 16}" stroke="#E2A93A" stroke-width="10" stroke-dasharray="2 26" stroke-linecap="round"/>
    <g fill="#F7D57E">${[-170, -60, 50, 160].map(x => `<circle cx="${x}" cy="${h * 0.55}" r="16"/>`).join('')}</g>`; }

// natt 0–1: rummet blir lite mörkare och varmt blått (aldrig svart); lampa 0–1: lampans sken; mane 0–1: månen lyser upp;
// dag: dagshimmel i fönstret (027) i stället för kvällshimmel
export function rum({ natt = 0, lampa = 0, mane = 0, dag = false, kvall = 0, nattbord = false, stol = false } = {}) {
  $('platta').innerHTML = FINNS.platta ? `<image href="${PLATTA}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>` : plattaKod();
  $('sang').innerHTML = FINNS.sang ? `<image href="${SANG.bild}" x="${f1(SANG_BILD.x)}" y="${f1(SANG_BILD.y)}" width="${f1(SANG_BILD.w * SANG_BILD.s)}" height="${f1(SANG_BILD.h * SANG_BILD.s)}"/>` : sangKod();
  // himlen i fönstret: dag = ljusblå med ett moln; kväll = djupblå med små stjärnor och månen
  const { cx, cy, r } = FONSTER;
  if (dag) $('himmel').innerHTML = `<g clip-path="url(#fonsterklipp)"><rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="#A9D8F2"/>
      <g fill="#fff" opacity="0.95"><circle cx="${cx - 30}" cy="${cy + 10}" r="34"/><circle cx="${cx + 12}" cy="${cy - 6}" r="44"/><circle cx="${cx + 56}" cy="${cy + 14}" r="30"/><rect x="${cx - 60}" y="${cy + 10}" width="140" height="34" rx="17"/></g></g>`;
  else { const ms = 150 / 867, mx = cx + 20, my = cy - 4;   // månen syns från början ("Titta, månen!" rad 2), lyser upp på "Och månen" (rad 13)
    $('himmel').innerHTML = `<g clip-path="url(#fonsterklipp)"><rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="#5C6FA6"/>
      <rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="#26386E" opacity="${kl(0.35 + 0.65 * Math.max(natt, mane)).toFixed(2)}"/>
      ${[[-80, -60], [70, -90], [-40, 80], [90, 60], [-100, 20]].map(([dx, dy], i) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="${3 + (i % 2)}" fill="#FFF3C4" opacity="${(0.55 + 0.35 * Math.sin(TT * 2 + i)).toFixed(2)}"/>`).join('')}
      <circle cx="${mx}" cy="${my}" r="${f1(60 + 60 * mane)}" fill="url(#manljus)" opacity="${(0.9 * mane).toFixed(2)}"/>
      <image href="${MANE}" x="${f1(mx - 400 * ms)}" y="${f1(my - 433 * ms)}" width="${f1(800 * ms)}" height="${f1(867 * ms)}" opacity="${(0.9 + 0.1 * kl(mane)).toFixed(2)}"/></g>`; }
  lagg('himmel', gardiner(0.06 * kvall + 0.2 * natt)); lagg('bak', tavla()); VARM = true;
  // klockan på väggen (rör sig inte, visarna står still: en ritad klocka), stolen mot väggen (027), nattbordet framför till höger om sängen (026)
  if (FINNS.klocka) lagg('bak', `<g transform="translate(${KLOCKA.x} ${KLOCKA.y}) rotate(${(0.3 * Math.sin(TT * 0.6)).toFixed(3)}) scale(${(KLOCKA.w / 880).toFixed(4)}) translate(-440 -440)"><image href="${KLOCKA.bild}" width="880" height="881"/></g>`);
  if (stol && FINNS.stol) lagg('bak', markskugga(STOL.x, STOL.y, 130) + saksvg(STOL, [STOL.x, STOL.y]));
  if (nattbord && FINNS.nattbord) lagg('bak', markskugga(NATTBORD.x, NATTBORD.y, 200) + saksvg(NATTBORD, [NATTBORD.x, NATTBORD.y]));
  // mörkret (efter lampan) och kvällsljuset (före): varmt blått över rummet, lampans sken ovanpå
  const m = 0.06 * kvall + 0.2 * natt;
  $('natt').innerHTML = (m > 0.003 ? `<rect x="-200" y="-200" width="2400" height="1500" fill="#2B3A78" opacity="${m.toFixed(3)}"/>` : '')
    + (lampa > 0.003 ? `<ellipse cx="${LAMPA[0]}" cy="${LAMPA[1] + 10}" rx="${f1(300 + 40 * lampa)}" ry="${f1(230 + 30 * lampa)}" fill="url(#lampsken)" opacity="${lampa.toFixed(3)}"/>
      ${FINNS.platta ? "" : `<path d="M1660 ${LAMPA[1] - 2} L1680 622 L1740 622 L1760 ${LAMPA[1] - 2}Z" fill="#FFF1C2" opacity="${(0.55 * lampa).toFixed(3)}"/>`}` : '');
}
// Gardinerna (Sanna 2026-11-11, "add some curtain to window"): en kort gardin på var sida om det runda fönstret, uppknuten,
// på en liten stång; mitten är fri så att månen syns. Kodplatshållare tills gardiner.png kommer från bildsessionen.
// Gungar lugnt nedtill (±4 px). m = rummets mörker (samma som natt-lagret, som ligger under himlen).
export const GARDIN = { bild: A + 'rekvisita/gardiner/cut/gardiner.png' };
// Tavlan (Sanna 2026-11-11 kväll: "zebra room need a painting on wall"): en inramad kritteckning av månen och stjärnorna,
// till höger om fönstret ovanför sängen, i lagret 'bak' (bakom zebran när han hoppar). Mörknar med rummet (natt-lagret).
// Med bilden: TAVLA.bild, skalad till bredden w, upphängd i krokpunkten (bildens px). Utan bilden: platshållare i kod.
export const TAVLA = { bild: A + 'rekvisita/tavla-sovrum/cut/tavla-sovrum.png', x: 1200, y: 222, w: 236, krok: [464, 17], bw: 0, bh: 0 };
function tavla() {
  const { x, y, w } = TAVLA, v = (0.4 * Math.sin(TT * 0.7)).toFixed(3);
  if (FINNS.tavla && TAVLA.bw) { const s = w / TAVLA.bw, [kx, ky] = TAVLA.krok || [TAVLA.bw / 2, 0];
    return `<g transform="translate(${x} ${y}) rotate(${v}) scale(${s.toFixed(4)}) translate(${-kx} ${-ky})"><image href="${TAVLA.bild}" width="${TAVLA.bw}" height="${TAVLA.bh}"/></g>`; }
  const h = Math.round(w * 0.74), x0 = -w / 2, y0 = 26;
  const stj = [[-62, 38], [-30, 70], [58, 30], [74, 82], [-78, 96]].map(([sx, sy], i) => { const r = 7 + (i % 2) * 3;
    return `<path d="M${sx} ${y0 + sy - r} L${sx + r * 0.3} ${y0 + sy - r * 0.3} L${sx + r} ${y0 + sy} L${sx + r * 0.3} ${y0 + sy + r * 0.3} L${sx} ${y0 + sy + r} L${sx - r * 0.3} ${y0 + sy + r * 0.3} L${sx - r} ${y0 + sy} L${sx - r * 0.3} ${y0 + sy - r * 0.3}Z" fill="#FFE07A"/>`; }).join('');
  return `<g transform="translate(${x} ${y}) rotate(${v})">
    <path d="M0 0 L${x0 + 40} ${y0 + 4} M0 0 L${-x0 - 40} ${y0 + 4}" stroke="#7a5236" stroke-width="3" fill="none"/><circle cx="0" cy="0" r="6" fill="#8d6040"/>
    <rect x="${x0 + 4}" y="${y0 + 8}" width="${w}" height="${h}" rx="10" fill="#3c2a1c" opacity="0.18" filter="url(#mjukskugga)"/>
    <rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="10" fill="#C88B5A" stroke="#FFFDF6" stroke-width="5" paint-order="stroke"/>
    <rect x="${x0 + 18}" y="${y0 + 18}" width="${w - 36}" height="${h - 36}" rx="4" fill="#3E5FA8"/>
    <path d="M${-8} ${y0 + 44} a44 44 0 1 0 40 62 a36 36 0 1 1 -40 -62Z" fill="#FFE07A" transform="translate(-22 0)"/>
    ${stj}</g>`;
}
function gardiner(m) {
  const { cx, cy, r } = FONSTER, y0 = cy - r - 18, yb = cy + 84, sw = 4 * Math.sin(TT * 0.9), sw2 = 4 * Math.sin(TT * 0.9 + 1.3);
  // gardiner.png (1314×695): stångens mitt (657, 58) på (cx, fönstrets topp − 25), skala 0,393 (stången 500 px); gungar ±0,5° runt stången
  if (FINNS.gardin) { const g = `<g transform="translate(${cx} ${cy - r - 25}) rotate(${(0.5 * Math.sin(TT * 0.9)).toFixed(3)}) scale(0.393) translate(-657 -58)">`;
    return `${g}<image href="${GARDIN.bild}" width="1314" height="695"/></g>` + (m > 0.003 ? `${g}<image href="${GARDIN.bild}" width="1314" height="695" filter="url(#morkna)" opacity="${m.toFixed(3)}"/></g>` : ''); }
  const sida = (d, sv) => { const yt = cy + 10, inre = cx + d * (r - 60), yttre = cx + d * (r + 62), knut = cx + d * (r + 26);
    // bred upptill, smal midja vid knuten, vidgar sig lite nedanför och gungar
    const h = `M${yttre} ${y0} L${inre} ${y0} C${inre} ${y0 + 80} ${knut - d * 10} ${yt - 40} ${knut} ${yt} C${knut - d * 4 + sv} ${yt + 30} ${knut - d * 30 + sv} ${yb - 20} ${knut - d * 24 + sv} ${yb}
      Q${(knut + yttre) / 2 + sv} ${yb + 16} ${yttre + d * 8 + sv * 0.6} ${yb - 2} C${yttre + d * 10} ${yt + 30} ${yttre + d * 4} ${yt - 30} ${yttre} ${y0}Z`;
    const veck = [0.3, 0.62].map(k => `<path d="M${f1(lerp(inre, yttre, k))} ${y0 + 10} Q${f1(lerp(knut, yttre, k * 0.6))} ${yt - 30} ${f1(lerp(knut, yttre, k * 0.4))} ${yt - 4} M${f1(lerp(knut, yttre, k * 0.4) + sv * 0.5)} ${yt + 16} Q${f1(lerp(knut, yttre, k) + sv)} ${yb - 30} ${f1(lerp(knut - d * 20, yttre, k) + sv)} ${yb - 6}" stroke="#E3A764" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.75"/>`).join('');
    return `<path d="${h}" fill="#F4C987" stroke="#FFFDF6" stroke-width="5" paint-order="stroke"/>${veck}
      <ellipse cx="${knut + d * 6}" cy="${yt}" rx="20" ry="9" fill="#E07A5F" transform="rotate(${-d * 18} ${knut + d * 6} ${yt})"/>`; };
  const h = `<g><rect x="${cx - r - 80}" y="${y0 - 10}" width="${2 * r + 160}" height="11" rx="5.5" fill="#C88B5A"/>
    <circle cx="${cx - r - 84}" cy="${y0 - 4.5}" r="10" fill="#C88B5A"/><circle cx="${cx + r + 84}" cy="${y0 - 4.5}" r="10" fill="#C88B5A"/>
    ${sida(-1, sw)}${sida(1, sw2)}</g>`;
  return h + (m > 0.003 ? `<g opacity="${m.toFixed(3)}" fill="#2B3A78">${h.replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#2B3A78"').replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="#2B3A78"')}</g>` : '');
}
// mjuk markskugga under en sak på golvet: (x, golv) = sakens fot på golvet, w = bredd; h = höjd över golvet (mindre och ljusare)
export const markskugga = (x, golv, w, h = 0) => { const k = 1 / (1 + h / 120);
  return `<ellipse cx="${f1(x + 6)}" cy="${f1(golv + 2)}" rx="${f1(w * 0.48 * k)}" ry="${f1(w * 0.09 * k)}" fill="#5a3e2a" opacity="${(0.2 * k).toFixed(3)}" filter="url(#mjukskugga)"/>`; };
let VARM = false;
export const papper = () => { VARM = false; $('platta').innerHTML = `<rect x="-200" y="-200" width="2400" height="1500" fill="#FBF7EE"/><rect x="-200" y="-200" width="2400" height="1500" filter="url(#korn)"/>`; };

// --- Zebran --------------------------------------------------------------------------------------------------------------
// zebra([x, fot], ansikte, pose, { s, skugga, skak: [ansikte, öron] huvudskakning, sover: [sx, sy, dy, x, y] sovbilden i stället })
// fram: zebran står på golvet framför sängen (lagret efter sängen, hela kroppen syns)
export function zebra([x, fot], f, p, { s = GS, skugga = true, skak = null, rum = true, fram = false } = {}) {
  $(fram ? 'framfig' : 'figurer').appendChild(G);
  G.setAttribute('transform', `translate(${f1(x)} ${f1(fot)}) scale(${s}) translate(-512 -925)`);
  L.rita(G, f, p.andas === false ? p : { ...p, strack: (p.strack || 0) + 0.012 * Math.sin(2 * Math.PI * TT / 3.4) });   // andas lugnt, aldrig helt still
  if (skak) { const d = G.querySelector('.drag'); d.setAttribute('transform', `translate(${f1(24 * skak[0])} 0) ` + (d.getAttribute('transform') || ''));
    G.querySelectorAll('.ear-l, .ear-r').forEach(e => e.setAttribute('transform', `translate(${f1(10 * skak[1])} 0) ` + (e.getAttribute('transform') || ''))); }
  G.querySelector('.figuren').setAttribute('opacity', 1);
  // bakom sängen syns zebran från magen och upp: benen och skuggan döljs (annars syns fötterna i luften under sängen)
  const bakom = !fram && rum && x > BED.x0 && x < BED.x1 - 30;
  // bara dölja: riggen väljer själv om benet ligger bakom eller framför kroppen (benFram); 1 här visade båda kopiorna (Sanna 2026-11-13: "legs still in front of body")
  if (bakom) G.querySelectorAll('.leg-l, .leg-r').forEach(e => e.setAttribute('opacity', 0));
  if (!skugga || bakom) G.querySelector('.skugga').setAttribute('opacity', 0);
}
// Sovbilden (Somnar C): den ritade sovande zebran, fötternas linje (riggens 925) i (x, y), andning [sx, sy]
export function sovbild([x, y], [sx, sy] = [1, 1], o = 1) {
  const k = GS * SOV.skala;
  satt('sov', o <= 0.001 ? '' : `<g opacity="${o}" transform="translate(${f1(x)} ${f1(y)}) scale(${(k * sx).toFixed(4)} ${(k * sy).toFixed(4)}) translate(-512 -925)">
    <image href="${SOV.fil}" width="1024" height="1024" y="${925 - SOV.botten}"/></g>`);
}
// nallen framifrån: (x, y) = den synliga underkanten, mitt (bilden synlig 192–832 × 65–959); ögonen i kod, prickar som kan blunda
// v2-nallen: (x, y) = den synliga underkanten, mitt; ansiktet som 016 natt.js (ljus nosfläck, ovala ögon med glans, rosa kinder,
// leende), blund 0–1 (sluten båge från 0,85), titt [x, y] ögonen tittar åt sidan. Blinkar lugnt av sig själv (var 8,3 s).
export function nalleBild([x, y], s, { blund = 0, v = 0, titt = [0, 0] } = {}) {
  const NV = { ogon: [[352, 246], [498, 246]], kinder: [[306, 304], [544, 304]], nos: [425, 300], mun: [425, 338] }, [nx, ny] = NV.nos, [mx, my] = NV.mun;
  const bl = Math.max(blund, bump(0, 0.16, (TT + 3.1) % 8.3));
  const ansikte = `<ellipse cx="${nx}" cy="${ny + 14}" rx="70" ry="52" fill="#F1DFC1"/><ellipse cx="${nx}" cy="${ny}" rx="20" ry="14" fill="#3a1d12"/>`
    + `<path d="M${nx} ${ny + 12} L${nx} ${ny + 26}" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`
    + NV.kinder.map(([kx, ky]) => `<ellipse cx="${kx}" cy="${ky}" rx="28" ry="17" fill="#ec8f96" opacity=".8"/>`).join('')
    + NV.ogon.map(([ox, oy], i) => { const X = ox + titt[0], Y = oy + titt[1]; return bl > 0.85
      ? `<path d="M${ox - 19} ${oy} Q${ox} ${oy + 15} ${ox + 19} ${oy}" fill="none" stroke="#f3e6d6" stroke-width="12" stroke-linecap="round"/><path d="M${ox - 19} ${oy} Q${ox} ${oy + 15} ${ox + 19} ${oy}" fill="none" stroke="#140c08" stroke-width="7" stroke-linecap="round"/>`
      : `<g transform="translate(${X} ${Y}) scale(${i ? 0.92 : 1} ${(1 - 0.92 * bl).toFixed(3)})"><ellipse rx="19" ry="26" fill="#140c08" stroke="#f3e6d6" stroke-width="3"/><circle cx="-6" cy="-10" r="7" fill="#fff"/></g>`; }).join('')
    + `<path d="M${mx - 22} ${my - 6} Q${mx - 11} ${my + 6} ${mx} ${my - 4} Q${mx + 11} ${my + 6} ${mx + 22} ${my - 6}" fill="none" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${s}) translate(${-NALLE.fot[0]} ${-NALLE.fot[1]})"><image href="${NALLE.bild}" width="${NALLE.w}" height="${NALLE.h}"/>${ansikte}</g>`;
}
// en sak ur rekvisita med foten (x, y) i scenen
export const saksvg = (o, [x, y], s = o.s, v = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${s.toFixed(4)}) translate(${-o.fot[0]} ${-o.fot[1]})"><image href="${o.bild}" width="${o.w}" height="${o.h}"/></g>`;
// zzz: tre z flyter upp och tonar, 0,7 s isär (som riggens filmZzz)
export function zzz([x, y], ts, s = 1) {
  if (ts < 0) return;
  let h = '';
  for (let i = 0; i < 3; i++) { const u = ((ts + 2.1 - 0.7 * i) % 2.1) / 2.1; if (ts < 0.7 * i) continue;
    const o = bump(0, 1, u), zx = x + 30 * s * u + 8 * s * Math.sin(u * 6 + i), zy = y - 110 * s * u, r = (10 + 8 * u) * s;
    h += `<path d="M${f1(zx - r)} ${f1(zy - r)} H${f1(zx + r)} L${f1(zx - r)} ${f1(zy + r)} H${f1(zx + r)}" fill="none" stroke="#fff" stroke-width="${f1(8 * s)}" stroke-linecap="round" stroke-linejoin="round" opacity="${o.toFixed(2)}"/>
      <path d="M${f1(zx - r)} ${f1(zy - r)} H${f1(zx + r)} L${f1(zx - r)} ${f1(zy + r)} H${f1(zx + r)}" fill="none" stroke="#7a4a32" stroke-width="${f1(4 * s)}" stroke-linecap="round" stroke-linejoin="round" opacity="${o.toFixed(2)}"/>`; }
  lagg('fram', h);
}
export const ANS = (n, o = {}) => ({ ...L.blanda('neutral', n, 1), ...(['glad', 'jatteglad', 'fnissig', 'stolt'].includes(n) ? { glad: [0, 0] } : {}), ...o });
export const POS = (o = {}) => ({ ...L.POSE0, ...o });
// Glädjehopp och skratt (Sanna, från 021–024): två små lugna hopp på zebrans "förtjust", ett skratt på fnisset (kniper ihop
// ögonen, öppen mun, gungar lugnt ±3°; långt fniss 3,2 s). Läggs på efter blandningen i lage(), aldrig på papperet.
export const SKRATT = () => ANS('jatteglad', { glad: [1, 1], kind: 1, mun: [28, 26, 1, 470] });
export function gladje(st, r, tl) {
  if (st.plats !== 'rum' || !st.f || !st.p) return st;
  for (const [f, o, v] of r.ljud || []) { if (f !== null) continue;
    const k = String(v).replace('gnagg-gullig: ', ''), u = tl - o;
    if (k === 'förtjust' && st.pos) st.pos = [st.pos[0], st.pos[1] - 24 * bump(0, 0.4, u) - 16 * bump(0.42, 0.78, u)];
    if (/fniss/.test(k)) { const T = k === 'långt fniss' ? 3.2 : 1.4, kk = del(0, 0.2, u) * (1 - del(T - 0.35, T, u));
      if (kk > 0) { const w = Math.sin(2 * Math.PI * 3.2 * u);
        st.f = L.blanda(st.f, SKRATT(), kk); st.p = { ...st.p, luta: (st.p.luta || 0) + 3 * kk * w, strack: (st.p.strack || 0) + 0.025 * kk * Math.abs(w) }; } } }
  return st;
}
// gäspningen: munnen blir ett stort O och ögonen kniper ihop (som godnattsagans GASP), g 0–1
export const gasp = (f, g) => g <= 0.001 ? f : { ...L.blanda(f, { ...ANS('somnig'), glad: [1, 1], lock: [0, 0], streck: 0, mun: [24, 32, 0, 470], le: 0 }, g) };
export const vink = (tl, v, sakta = 1) => ({ luta: 2 * v, armar: [0, v * (86 + 12 * Math.sin(2 * Math.PI * 1.1 * sakta * tl))] });   // armen bakom kroppen, snett ut förbi kanten
export const oronVipp = (tl, t0, n = 2) => { const u = tl - t0; return u > 0 && u < 0.4 * n ? -10 * Math.sin(u / 0.4 * Math.PI * 2) * (1 - u / (0.4 * n)) : 0; };
export const nick = (tl, t0) => -0.8 * bump(t0, t0 + 0.6, tl);
// huvudskakningen: hela ägget lutar ±6° tre gånger, ansiktet glider åt sidan, öronen släpar efter
export const skaka = (tl, a, b) => { const e = bump(a, b, tl) ** 0.5, fas = 2 * Math.PI * 3 * (tl - a) / (b - a); return [e * Math.sin(fas), e * Math.sin(fas - 0.9)]; };

// --- Skimmer, glitter (ur 020/023) ---------------------------------------------------------------------------------------
const stjarna = (x, y, r, o = 1) => `<path transform="translate(${f1(x)} ${f1(y)}) scale(${r.toFixed(2)})" opacity="${o.toFixed(2)}" d="M0 -1 L.2 -.2 L1 0 L.2 .2 L0 1 L-.2 .2 L-1 0 L-.2 -.2Z" fill="#fff6c8" stroke="#e6b422" stroke-width=".06"/>`;
export const skimmer = (x, y, k, t, vidd = 1) => k > 0.01 && lagg('fram', [[-1, -0.7, 1, 0], [1.1, -0.4, 0.8, 1.7], [0.2, 1.1, 0.7, 3.1], [-1.2, 0.8, 0.6, 4.4]]
  .map(([dx, dy, s, f]) => stjarna(x + dx * 30 * vidd, y + dy * 26 * vidd, 12 * vidd * s * k * (0.8 + 0.25 * Math.sin(t * 5 + f)), Math.min(1, 0.3 + k))).join(''));

// --- Kritlinjer: mjuk bana genom punkterna, spetsen följer banan (ur 020) ----------------------------------------------------
const mitt2 = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], P2 = p => f1(p[0]) + ' ' + f1(p[1]);
function mjukD(pts) {
  const n = pts.length, sluten = Math.hypot(pts[0][0] - pts[n - 1][0], pts[0][1] - pts[n - 1][1]) < 2;
  if (sluten) { const Q = pts.slice(0, -1), m = Q.length; return `M${P2(mitt2(Q[m - 1], Q[0]))}` + Q.map((p, i) => `Q${P2(p)} ${P2(mitt2(p, Q[(i + 1) % m]))}`).join(''); }
  if (n === 2) return `M${P2(pts[0])}L${P2(pts[1])}`;
  return `M${P2(pts[0])}L${P2(mitt2(pts[0], pts[1]))}` + pts.slice(1, -1).map((p, i) => `Q${P2(p)} ${P2(mitt2(p, pts[i + 2]))}`).join('') + `L${P2(pts[n - 1])}`;
}
const BANOR = new Map();
export function bana(pts, nyckel = pts) {
  if (!BANOR.has(nyckel)) { const d = mjukD(pts), el = document.createElementNS('http://www.w3.org/2000/svg', 'path'); el.setAttribute('d', d); $('gomda').appendChild(el); BANOR.set(nyckel, { d, el, L: el.getTotalLength() }); }
  return BANOR.get(nyckel);
}
export const banPunkt = (b, f) => { const q = b.el.getPointAtLength(kl(f) * b.L); return [q.x, q.y]; };
export const ritTakt = f => 0.5 * kl(f) + 0.5 * mjuk(f);

// --- Kritan: svävar när den väntar, ritar med smulor och krit-gnistor, mindre i de nära bilderna ------------------------------
export const kritaVanta = ([x, y], tw) => [[x + 3 * Math.sin(tw * 1.1), y + 5 * Math.sin(tw * 1.6)], 125 + 4 * Math.sin(tw * 1.3)];
export const krita = ([x, y], v = 125, s = 0.33 * (KAM && KAM[0] > 1.5 ? 0.7 : 1)) =>
  lagg('krita', `<image href="${KRITA}" width="755" height="265" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${s}) translate(${-KRITA_SPETS[0]} ${-KRITA_SPETS[1]})"/>`);
export function ritKrita(p, v = 125, redan = false, s) {
  if (!redan) krita(p, v, s);
  const z = KAM ? KAM[0] : 1, e = 1 / Math.sqrt(z); let h = '';
  for (let j = 0; j < 8; j++) { const b = Math.floor(TT * 14) - j, age = TT - b / 14, r = slump(b * 7.13), r2 = slump(b * 3.31 + 1.7), op = Math.max(0, 0.7 - age * 1.4);
    if (op > 0) h += `<circle cx="${f1(p[0] + (r - 0.5) * 26 * e)}" cy="${f1(p[1] + (6 + age * 55 + r2 * 8) * e)}" r="${f1((2 + 2.5 * r2) * e)}" fill="#D9503F" opacity="${op.toFixed(2)}"/>`; }
  for (let j = 0; j < 3; j++) { const b = Math.floor(TT * 3) - j, age = TT - b / 3, r = slump(b * 5.7 + 2), r2 = slump(b * 9.1 + 4), k = bump(0, 0.9, age);
    if (k <= 0) continue; const x = p[0] + (r - 0.5) * 70 * e, y = p[1] - (14 + 26 * r2 + 18 * age) * e, R = (7 + 4 * r2) * e * k;
    h += `<path d="M${f1(x)} ${f1(y - R)} Q${f1(x)} ${f1(y)} ${f1(x + R)} ${f1(y)} Q${f1(x)} ${f1(y)} ${f1(x)} ${f1(y + R)} Q${f1(x)} ${f1(y)} ${f1(x - R)} ${f1(y)} Q${f1(x)} ${f1(y)} ${f1(x)} ${f1(y - R)}Z" fill="#FFF3B8" stroke="#fff" stroke-width="${f1(2.2 * e)}" paint-order="stroke" opacity="${(0.9 * k).toFixed(2)}"/>`; }
  lagg('krita', h);
}

// --- Kritan ritar en sak i scenen (kudden i 026, korgen i 027): konturen, gisspausen, sedan fylls den riktiga saken i ----------
// sak = { bild, w, h (bildens mått), pts (kontur i bildens mått), x, y (bildens nedre mitt i scenen), s (skala), lager, farg }
// tl = tid i raden; rit = [start, längd] konturen, vant = var kritan väntar, fyll 0–1. Returnerar inget; ritar i lagren.
export function ritSak(sak, { ritad = 1, fyll = 1, kritaPos = null }) {
  const { x, y, s, w, h } = sak, x0 = x - w * s / 2, y0 = y - h * s;
  let spets = null;
  if (ritad < 1 || fyll < 1) {
    // konturen först (60 % av tiden), sedan sakens egna drag (sak.drag: täckets sömmar, radions rattar och noter) ett i taget
    const drag = sak.drag || [], alla = [sak.pts, ...drag], andel = drag.length ? [0.6, ...drag.map(() => 0.4 / drag.length)] : [1];
    let a0 = 0, h = '';
    alla.forEach((pts, j) => { const r = kl((ritad - a0) / andel[j]); a0 += andel[j];
      if (r <= 0) return; const b = bana(pts, j ? pts : sak), rt = ritTakt(r);
      h += `<path d="${b.d}" pathLength="1" fill="none" stroke="${sak.farg}" stroke-width="${f1(8 / s)}" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${rt.toFixed(4)} 2"/>`;
      if (r < 1 && ritad < 1) { const p = banPunkt(b, rt); spets = [x0 + p[0] * s, y0 + p[1] * s]; } });
    lagg('kontur', `<g filter="url(#vax)" opacity="${(1 - del(0, 0.5, fyll)).toFixed(3)}"><g transform="translate(${f1(x0)} ${f1(y0)}) scale(${s})">${h}</g></g>`); }
  if (fyll > 0) { $('cirkel-sak').setAttribute('cx', w / 2); $('cirkel-sak').setAttribute('cy', h / 2); $('cirkel-sak').setAttribute('r', fyll >= 1 ? 3000 : f1(0.75 * Math.max(w, h) * fyll));
    satt(sak.grupp, `<g transform="translate(${f1(x0)} ${f1(y0)}) scale(${s})"><image href="${sak.bild}" width="${w}" height="${h}" clip-path="url(#fyll-sak)"/></g>`); }
  else satt(sak.grupp, '');
  if (spets) ritKrita(spets, 125, false, 0.33 * 0.7);
  else if (kritaPos) krita(kritaPos[0], kritaPos[1], 0.33 * 0.7);
}

// --- Ritintrot: zebrans kontur i ett drag per del, ca 7 s (som 020/023, med armarna: ett drag per arm) --------------------------
// Konturerna är uppmätta ur cut-tunn/ (fyllnadens kant, utan den vita kanten): kroppen med manen, öronen, armarna, benen och
// mulen, i varje dels egen bild. Armarna och öronen följer riggens pose (punkterna förs genom delens transform).
export const KONTUR = {"kropp":[[502,114],[515,129],[532,122],[543,142],[555,139],[574,164],[575,194],[654,243],[713,311],[743,365],[770,434],[789,538],[785,604],[773,654],[750,700],[720,737],[675,775],[633,796],[578,814],[524,821],[481,820],[399,805],[320,765],[261,698],[238,638],[227,582],[228,524],[240,451],[289,337],[314,298],[359,249],[423,205],[471,187],[465,125],[474,119],[488,129],[502,114]],
  "ear-l":[[407,184],[383,147],[346,138],[336,166],[346,216],[360,233]],"ear-r":[[659,231],[674,214],[683,178],[680,144],[674,135],[635,145],[622,162]],
  "leg-l":[[404,800],[404,907],[417,918],[447,918],[460,907],[460,812]],"leg-r":[[578,808],[578,907],[591,918],[621,918],[634,907],[634,800]],
  "tail":[[691,766],[717,801],[762,809],[781,803],[796,810],[812,810],[840,795],[832,785],[837,769],[829,758],[817,762],[801,758],[786,770],[771,794],[754,795],[739,787],[708,752]],
  "tofs":[[812,768],[846,756]],"tofs2":[[818,800],[852,806]],
  "nos":[[408,483],[404,517],[413,539],[437,562],[476,574],[530,574],[573,562],[598,543],[611,514],[610,491],[598,467],[573,446],[538,434],[491,433],[452,443],[425,460],[408,483]],
  // kudden (kudde-v1-zebbe.png, 1024-ruta), medurs från toppen
  "kudde":[[867,92],[839,92],[818,100],[765,147],[729,157],[594,127],[447,138],[368,156],[255,198],[219,193],[167,156],[100,172],[88,199],[87,233],[122,281],[131,344],[99,461],[93,549],[120,670],[165,761],[168,803],[140,847],[136,875],[151,916],[218,933],[296,878],[359,865],[433,884],[455,881],[463,890],[514,891],[658,873],[716,846],[765,837],[791,839],[828,863],[879,868],[932,838],[942,807],[939,778],[909,741],[901,715],[933,554],[925,420],[873,260],[878,222],[908,158],[907,131],[890,105],[867,92]]};
const KONTUR_ARM = {};   // armarna mäts ur riggen vid start (konturen utanför kroppen), se starta()
const DELAR = [
  { t: [0, 2.2], del: 'kropp', el: '.kropp image' },
  { t: [2.3, 2.6], del: 'ear-l', el: '.ear-l' }, { t: [2.7, 3.0], del: 'ear-r', el: '.ear-r' },
  // manen: tre hårtestar ner från manens toppar (Sanna 2026-11-12: "mer detaljerad så att ett barn kan gissa")
  { t: [3.05, 3.17], pts: [[478, 128], [486, 196]] }, { t: [3.19, 3.31], pts: [[512, 116], [512, 196]] }, { t: [3.33, 3.45], pts: [[546, 128], [540, 196]] },
  { t: [3.5, 4.0], del: 'nos', el: '.drag image' },
  { t: [4.05, 4.15], prick: [419, 402] }, { t: [4.2, 4.3], prick: [601, 401] },          // ögonen
  { t: [4.4, 4.75], del: 'arm-l', el: '.arm-l' }, { t: [4.85, 5.2], del: 'arm-r', el: '.arm-r' },   // armarna, ett drag var (Sanna 2026-11-11)
  { t: [5.3, 5.55], del: 'leg-l', el: '.leg-l' }, { t: [5.6, 5.85], del: 'leg-r', el: '.leg-r' },
  { t: [5.95, 6.3], del: 'tail', el: '.tail' },
  { t: [6.35, 6.5], del: 'tofs', el: '.tail' },   // svanstofsen: två korta hårstrån
  { t: [6.6, 6.75], pts: [[474, 520], [492, 536], [512, 540], [532, 536], [550, 520]] },  // leendet
  // ränderna sist: fem tydliga kilar in från kanten, som de riktiga (pannan, två på varje sida)
  { t: [6.85, 7.05], pts: [[488, 200], [506, 300], [528, 200]] },
  { t: [7.1, 7.3], pts: [[228, 560], [378, 600], [232, 612]] }, { t: [7.35, 7.55], pts: [[788, 520], [640, 604], [786, 580]] },
  { t: [7.6, 7.8], pts: [[250, 680], [392, 642], [270, 712]] }, { t: [7.85, 8.05], pts: [[770, 640], [648, 648], [750, 690]] }];
export const KT = 8.1;   // ritintrots längd (s)
// punkterna i en dels egen bild → figurens 1024-ruta (genom delens transform i den aktuella posen)
function iFigur(sel, pts) {
  const el = [...G.querySelectorAll(sel)].find(e => e.getAttribute('opacity') !== '0') || G.querySelector(sel);
  const m = G.getCTM().inverse().multiply(el.getCTM());
  return pts.map(([x, y]) => { const q = new DOMPoint(x, y).matrixTransform(m); return [q.x, q.y]; });
}
// st = { kontur 0–1 (7 s), fyll 0–1, inn: tid för kritans entré (eller null), vanta: tid kritan har väntat (eller null), f, p }
export function ritaPapper(st, t) {
  papper(); kamera(st.kam);
  const s = 0.8, X = 960, FOT = 975, sek = KT * kl(st.kontur);
  zebra([X, FOT], BLINKA(st.f || ANS('glad'), t), st.p || POS(), { s, skugga: false, rum: false });
  let spets = null, h = '';
  DELAR.forEach((d, i) => { const f = kl((sek - d.t[0]) / (d.t[1] - d.t[0])); if (f <= 0) return;
    if (d.prick) { h += `<circle cx="${d.prick[0]}" cy="${d.prick[1]}" r="${f1(14 * mjuk(f))}" fill="#3a2a24"/>`; if (f < 1) spets = d.prick; return; }
    const pts = d.del ? iFigur(d.el, d.del.startsWith('arm') ? KONTUR_ARM[d.del] : d.del === 'tofs' ? [...KONTUR.tofs, ...KONTUR.tofs2.slice().reverse()] : KONTUR[d.del]) : d.pts;
    const b = bana(pts, 'del' + i + (d.del && !['kropp', 'nos'].includes(d.del) ? JSON.stringify(pts[0].map(Math.round)) : '')), r = ritTakt(f);
    h += `<path d="${b.d}" pathLength="1" fill="none" stroke="#3a2a24" stroke-width="15" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${r.toFixed(4)} 2"/>`;
    if (f < 1) spets = banPunkt(b, r); d.sista = b; });
  if (!spets && sek > 0 && sek < KT) {   // mellan två delar: kritan flyttar sig till nästa dels början
    const i = DELAR.findIndex(d => d.t[0] >= sek), fo = DELAR[Math.max(0, i - 1)], nx = DELAR[i] || fo;
    const slutP = d => d.prick || (d.sista ? banPunkt(d.sista, 1) : [512, 500]);
    const startP = d => d.prick || (d.del ? iFigur(d.el, d.del.startsWith('arm') ? KONTUR_ARM[d.del] : KONTUR[d.del === 'tofs' ? 'tofs' : d.del])[0] : d.pts[0]);
    const a = slutP(fo), b = startP(nx), u = mjuk((sek - fo.t[1]) / Math.max(0.01, nx.t[0] - fo.t[1]));
    spets = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)]; }
  if (h) lagg('kontur', `<g filter="url(#vax)" opacity="${(1 - del(0.5, 1, st.fyll)).toFixed(3)}"><g transform="translate(${X} ${FOT}) scale(${s}) translate(-512 -925)">${h}</g></g>`);
  $('fyllcirkel').setAttribute('cx', 512); $('fyllcirkel').setAttribute('cy', 540); $('fyllcirkel').setAttribute('r', st.fyll >= 1 ? 2000 : 680 * st.fyll);
  G.setAttribute('clip-path', 'url(#fyllklipp)');
  const KS = 0.45, iP = p => [X + (p[0] - 512) * s, FOT + (p[1] - 925) * s];
  if (st.inn != null && sek <= 0) {   // kritan kommer in från högerkanten, svävar en stund och sätter sig på pappret
    const start = iP(KONTUR.kropp[0]), vant = [start[0] + 140, start[1] + 10];
    const u = mjuk(st.inn / 1.6), w = kritaVanta(vant, st.inn), sist = mjuk((st.inn - 2.1) / 0.4);
    const p = st.inn < 1.6 ? [lerp(2200, vant[0], u), lerp(-80, vant[1], u)] : [lerp(w[0][0], start[0], sist), lerp(w[0][1], start[1], sist)];
    krita(p, lerp(150, 125, u), KS);
  } else if (spets) { const p = iP(spets); krita(p, 125, KS); ritKrita(p, 125, true); }
  else if (st.vanta >= 0) { const [p, v] = kritaVanta([X + 300, FOT - 420], st.vanta); krita(p, v, KS); }   // kritan väntar bredvid, barnet gissar
  else if (sek >= KT && st.fyll < 1) { const u = del(0, 0.8, st.fyll); krita([lerp(X + 270, X + 900, u), lerp(FOT - 600, FOT - 950, u)], 135, KS); }
  if (st.vit) lagg('ram', `<rect x="-50" y="-50" width="2020" height="1180" fill="#FFFFFF" opacity="${st.vit.toFixed(3)}"/>`);
}

// --- Kritirisen (ur 020) ------------------------------------------------------------------------------------------------
export function kritiris(r, [cx, cy], t) {
  if (r >= 1400) return;
  const ring = 'M' + Array.from({ length: 145 }, (_, j) => { const a = j / 144 * 2 * Math.PI, rr = r * (1 + 0.07 * Math.sin(9 * a + t * 0.8));
    return `${f1(cx + rr * Math.cos(a))} ${f1(cy + rr * Math.sin(a))}`; }).join('L') + 'Z';
  lagg('ram', `<path d="M-50 -50H1970V1130H-50Z ${r > 1 ? ring : ''}" fill="#101010" fill-rule="evenodd"/>
    ${r > 1 ? `<path d="${ring}" fill="none" stroke="#fff8e0" stroke-width="${Math.min(14, r / 4)}" stroke-linejoin="round" filter="url(#boil)"/>` : ''}`);
}
export const irisR = u => u < 1.5 ? lerp(1400, 320, mjuk(u / 1.5)) : lerp(320, 0, mjuk((u - 1.9) / 0.5));

// --- Varje bildruta --------------------------------------------------------------------------------------------------------
export function borja(t) {
  TT = t;
  ['platta', 'bak', 'under', 'nalle', 'kudde', 'tacke', 'sang', 'golvsak', 'korg', 'natt', 'himmel', 'fram', 'kontur', 'krita', 'ram'].forEach(n => {
    [...$(n).childNodes].forEach(c => { if (!(c.id || '').startsWith('g-')) c.remove(); }); });
  Object.values(GRUPPER).forEach(g => g.innerHTML = '');
  $('gomda').appendChild(G); G.removeAttribute('clip-path');
}
export function slut(t, DURATION, SVART) {
  // finputs (015/020): varm ton 0,07 och vinjett 0,12 över rummet, inte över papperet
  if (VARM) lagg('ram', '<rect x="-50" y="-50" width="2020" height="1180" fill="#FFB46A" opacity="0.07" style="mix-blend-mode:soft-light"/><rect x="0" y="0" width="1920" height="1080" fill="url(#vinjett)" opacity="0.12"/>');
  if (t > DURATION - SVART) lagg('ram', '<rect x="-50" y="-50" width="2020" height="1180" fill="#101010"/>');
  $('brus').setAttribute('seed', (Math.floor(Math.round(t * 30) / 3) % 50) + 1);
  window.kant?.uppdatera();
}

// --- Ljud: Malin och effekterna ur rader.mjs; saknade filer (rösten, gnagg-gullig) hoppas över tills de finns ----------------
// GNAGG: zebrans nya ljudfamilj gnagg-gullig (manus.md "Zebrans röst"), 8 känslor i receptets ordning, plus gnagg-fniss
export const GNAGG_N = { hej: '1c', 'förtjust': 2, fniss: 3, 'mysig suck': 4, nyfiken: 5, trumpen: 6, pratar: 7, 'hej då': '8c' };   // hej/hej då: svenska tagningar 1c/8c (1/8 lät engelska), andra gången i rad 1d/8d
const FINNS_FIL = new Map();
export const finns = async u => { if (!FINNS_FIL.has(u)) FINNS_FIL.set(u, fetch(u, { method: 'HEAD' }).then(r => r.ok).catch(() => false)); return FINNS_FIL.get(u); };
// zebrans tagningar är olika starka (−10,8 till −22,1 LUFS, uppmätt 2026-11-11): jämna ut mot −15 LUFS, högst +6 dB
const LUFS = { 'gnagg-gullig-1': -13.2, 'gnagg-gullig-1b': -14.2, 'gnagg-gullig-2': -15.0, 'gnagg-gullig-2b': -15.8, 'gnagg-gullig-3': -16.1, 'gnagg-gullig-3b': -19.1,
  'gnagg-gullig-4': -17.2, 'gnagg-gullig-4b': -16.7, 'gnagg-gullig-5': -13.5, 'gnagg-gullig-5b': -10.8, 'gnagg-gullig-6': -19.9, 'gnagg-gullig-6b': -17.0,
  'gnagg-gullig-7': -15.6, 'gnagg-gullig-7b': -13.0, 'gnagg-gullig-8': -16.0, 'gnagg-gullig-8b': -13.8, 'gnagg-fniss-1': -22.1, 'gnagg-fniss-2': -19.6,
  'gnagg-gullig-1c': -10.9, 'gnagg-gullig-1d': -12.0, 'gnagg-gullig-8c': -15.2, 'gnagg-gullig-8d': -12.8 };
const jamn = f => { const i = LUFS[f.split('/').pop()]; return i == null ? 1 : Math.min(2, 10 ** ((-15 - i) / 20)); };
export async function ljudLista(RAD, ROST, rostMapp, MER = {}) {
  let forra = null;
  const E = 'assets/ljud/effekter/', ut = [];
  for (const r of RAD) {
    for (const [n, o] of r.malin || []) ut.push({ t: r.s + o, fil: `assets/ljud/roster/${rostMapp}/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
    for (const [f, o, v] of [...(r.ljud || []), ...(MER[r.id] || [])]) {
      if (f === null) { const k = String(v).replace('gnagg-gullig: ', ''), fil = k === 'långt fniss' ? 'gnagg-fniss/gnagg-fniss-1' : k === 'nej' ? 'gnagg-nej/gnagg-nej-3' : `gnagg-gullig/gnagg-gullig-${GNAGG_N[k]}`;   // nej: 027 (Sanna 2026-11-12), låter som svenskt "nej"
        const f2 = fil !== forra ? fil : fil.includes('fniss/') ? fil.replace(/-1$/, '-2') : /c$/.test(fil) ? fil.replace(/c$/, 'd') : fil + 'b'; forra = f2;   // aldrig samma tagning två gånger i rad
        ut.push({ t: r.s + o, fil: E + f2 + '.m4a', vol: 1.3 * jamn(f2), text: k }); continue; }   // zebran lite lägre än Malin (Sanna)
      if (!f.startsWith('krita-ritar')) ut.push({ t: r.s + o, fil: E + f + '.m4a', vol: typeof v === 'number' ? v : 1.6 });
    }
  }
  return ut;
}
export async function bara(ut) {   // behåll bara de filer som finns (saknade blir tystnad, som platshållare)
  const ok = await Promise.all(ut.map(c => finns('/' + c.fil)));
  const saknas = ut.filter((c, i) => !ok[i]);
  if (saknas.length) console.log('ljud saknas än:', [...new Set(saknas.map(c => c.fil))].join(', '));
  return ut.filter((c, i) => ok[i]);
}

// --- Start ---------------------------------------------------------------------------------------------------------------
export async function starta(saker = []) {
  byggSvg();
  L = await v2rigg('zebran-zebbe');
  G = L.figur(512, 925, 1, $('gomda'));
  BLINKA = skapaBlinka(26);
  // armarnas kontur utanför kroppen, i armbildens egna mått (uppmätt ur cut-tunn/zebbe-arm-*.png)
  KONTUR_ARM['arm-l'] = [[225, 528], [141, 618], [137, 628], [141, 650], [157, 662], [179, 660], [227, 600]];
  KONTUR_ARM['arm-r'] = [[788, 599], [836, 659], [858, 661], [874, 649], [878, 640], [874, 617], [791, 528]];
  const bilder = [PLATTA, SANG.bild, TACKE.bild, KUDDE.bild, NALLE.bild, MANE, KRITA, SOV.fil, GARDIN.bild, TAVLA.bild, KLOCKA.bild, NATTBORD.bild, STOL.bild, GLAS.bild, ...saker];
  const ok = await Promise.all(bilder.map(u => new Promise(r => { const i = new Image(); i.onload = () => r(true); i.onerror = () => r(false); i.src = u; })));
  FINNS = { platta: ok[0], sang: ok[1], tacke: ok[2], gardin: ok[8], tavla: ok[9], klocka: ok[10], nattbord: ok[11], stol: ok[12], glas: ok[13] };
  if (FINNS.tavla) { const im = new Image(); im.src = TAVLA.bild; await im.decode(); TAVLA.bw = im.naturalWidth; TAVLA.bh = im.naturalHeight; }
  window.kant?.lagg(G.querySelector('.figuren'));
  if (!FINNS.sang) window.kant?.lagg($('sang'), { andel: 0.01 });   // sangen.png har sin tunna kant inbakad (ca 7 px)
  return { L, G };
}
export const tackeBild = () => FINNS.tacke ? `<image href="${TACKE.bild}" x="${-TACKE_MATT.w / 2}" y="0" width="${TACKE_MATT.w}" height="${TACKE_MATT.h}" preserveAspectRatio="xMidYMin meet"/>` : tackeKod();
