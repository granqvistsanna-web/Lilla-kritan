// Gröna sången v2 (014 omgjord i art direction v2, 2026-11-26): allt som ritar scenerna. Varje scen (<scen>/index.html) sätter
// window.SCEN = [första, sista] bildnummer ur ../storyboard-v2/storyboard.md och laddar den här modulen. Tiderna (avsnittstid)
// läses ur storyboarden. Sången börjar på avsnittstid SANG0 (9,0 s, efter introt). render.mjs anropar window.seek(t), t = scenens tid.
// Inget slumpas: samma t ger alltid samma bild. Line boil 2,5 px i bild (2,5/zoom), ny brusbild 6 gånger/s.
// Kräver före: /verktyg/blinka.js, /verktyg/kant.js, /produktion/youtube/shorts/godnatt/v2-rigg.js
export const SANG0 = 9.0, BEAT = 60 / 85, SLUT = 9.0 + 206.4;   // tagning 1, ca 85 bpm, 3:26.4
export const $ = id => document.getElementById(id);
export const A = '/assets/', HAR = '/avsnitt/014-grona-traktorn/scener-v2/';
export const kl = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k)), lerp = (a, b, k) => a + (b - a) * k;
export const mjuk = k => (k = kl(k), k * k * (3 - 2 * k)), del = (a, b, t) => mjuk((t - a) / (b - a));
export const bump = (a, b, t) => (t <= a || t >= b) ? 0 : Math.sin(Math.PI * (t - a) / (b - a));
export const f1 = v => v.toFixed(1);
export const lagg = (id, h) => $(id).insertAdjacentHTML('beforeend', h);
export const studs = s => Math.abs(Math.sin(Math.PI * s / BEAT));   // ett skutt per slag (s = sångtid)

document.body.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 1920 1080">
  <defs>
    <filter id="boil" filterUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480">
      <feTurbulence id="brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="2.5"/>
    </filter>
    <filter id="mjuk" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="delsiluett" x="0" y="0" width="1" height="1"><feMorphology in="SourceAlpha" operator="erode" radius="8"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>
    <filter id="tygkrita" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.16" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.6 0 0 0 1.62" result="a"/><feComposite in="SourceGraphic" in2="a" operator="in"/></filter>
  </defs>
  <rect id="duk" width="1920" height="1080" fill="#FAF8F2"/>
  <g id="kamera">
    <g id="platta"></g><g id="bakom" filter="url(#boil)"></g>
    <g id="fordon" filter="url(#boil)"></g>
    <g id="figurer" filter="url(#boil)"></g>
    <g id="framfor" filter="url(#boil)"></g><g id="pynt" filter="url(#boil)"></g>
  </g>
  <g id="ram"></g><g id="gomda" display="none"></g>
</svg>`);

// --- Kameran: zoom 1 = hela plattan; visar aldrig utanför bakgrunden ---------------------------------------------------------
let ZOOM = 1;
export function kamera(zoom = 1, cx = 960, cy = 540) {
  const tx = kl(960 - cx * zoom, 1920 - 1920 * zoom, 0), ty = kl(540 - cy * zoom, 1080 - 1080 * zoom, 0);
  $('kamera').setAttribute('transform', `translate(${f1(tx)} ${f1(ty)}) scale(${zoom.toFixed(4)})`); ZOOM = zoom;
}
export const platta = (fil, extra = '') => { $('platta').innerHTML = `<image href="${fil}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>` + extra; };

// --- Traktorn (assets/rekvisita/traktor-gron-v2, 1024 × 1024, nosen åt höger; Sannas Flow-version med brett lågt säte) --------
// Lagerordning: bak (sätet, stolparna, avgasröret), leoparden, fram (karet under sätets kant, huven, taket), hjulen.
// Sätets kant ligger på y 598 i x 500–650; Lovas fötter under den döljs av fram, armarna är fria i den breda öppningen.
const TR = A + 'rekvisita/traktor-gron-v2/cut/';
export const TRAKTOR = { mitt: 525, hjulBak: [290.9, 690.5, 186.5], hjulFram: [800.8, 753.9, 119.1], botten: 875, avgas: [752, 321] };
export const TS = 1.0;               // traktorns skala i scenen (ca 730 px hög; kanten 11 px i filen)
export const LT = 0.62;              // Lovas skala i traktorns pixlar (= i scenen; lite större än v2:s 0,5, Sanna 2026-11-26 "a bit bigger")
export const SITS = [470, 662];      // Lovas fötter i traktorns pixlar (under sätets kant, döljs av fram)
// Gröna flaggan (v1:s lager/flagga-gron.png, 543 × 811, stångens fot (485, 790)) står på takets bakre del och fladdrar ("och flaggan med!")
export const FLAGGA = { fot: [222, 168], s: 0.3 };
$('fordon').innerHTML = `<g id="traktor">
  <g id="flagga"><image href="${HAR}lager/flagga-gron.png" width="543" height="811"/></g>
  <image href="${TR}traktor-bak.png" width="1024" height="1024"/>
  <g id="forare"></g>
  <image href="${TR}traktor-fram.png" width="1024" height="1024"/>
  <g stroke-linecap="round"><path d="M175 690 L96 770" stroke="#fff" stroke-width="42"/><path d="M175 690 L96 770" stroke="#3E9A43" stroke-width="30"/></g>   <!-- dragkroken bakom bakhjulet -->
  <g id="hjul-bak"><image href="${TR}hjul-bak.png" width="1024" height="1024"/></g>
  <g id="hjul-fram"><image href="${TR}hjul-fram.png" width="1024" height="1024"/></g>
</g>`;
// x = traktorns mitt i scenen, fot = hjulens underkant; rull = hur långt den rullat (px i scenen), lut i grader, synlig
export function traktor({ x = 700, fot = 1000, rull = 0, lut = 0, k = 1, synlig = true, flagg = 0 } = {}) {   // flagg: extra lutning bakåt (grader) när den far iväg
  const s = TS * k, g = $('traktor');
  g.setAttribute('display', synlig ? 'inline' : 'none'); if (!synlig) return;
  const fl = 4 * Math.sin(TID * 5.1) + 2 * Math.sin(TID * 8.3 + 1);   // fladdret: lugnt, samma t ger samma bild
  $('flagga').setAttribute('transform', `translate(${FLAGGA.fot[0]} ${FLAGGA.fot[1]}) rotate(${f1(-flagg - 3)}) skewY(${f1(fl * 0.5)}) scale(${FLAGGA.s}, ${(FLAGGA.s * (1 + fl * 0.01)).toFixed(4)}) translate(-485 -790)`);
  g.setAttribute('transform', `translate(${f1(x - TRAKTOR.mitt * s)} ${f1(fot - TRAKTOR.botten * s)}) scale(${s.toFixed(4)}) rotate(${f1(lut)} ${TRAKTOR.mitt} ${TRAKTOR.botten})`);
  for (const [id, [cx, cy, r]] of [['hjul-bak', TRAKTOR.hjulBak], ['hjul-fram', TRAKTOR.hjulFram]])
    $(id).setAttribute('transform', `rotate(${f1(rull / (r * s) * 180 / Math.PI)} ${cx} ${cy})`);
}
// var en punkt i traktorns pixlar hamnar i scenen
export const iTraktor = ([px, py], { x = 700, fot = 1000, k = 1 } = {}) => { const s = TS * k; return [x + (px - TRAKTOR.mitt) * s, fot + (py - TRAKTOR.botten) * s]; };

// --- Figurerna (v2-riggarna live ur uttryck.html) ------------------------------------------------------------------------------
export const FIG = {};
export async function figurer(namn) {
  for (const [n, mapp, fro] of namn) {
    const L = await v2rigg(mapp), G = L.figur(512, L.FOTTER, 1, $('gomda'));
    window.kant?.lagg(G.querySelector('.figuren') || G);
    FIG[n] = { L, G, blinka: skapaBlinka(fro) };
    if (n === 'lova') jacka(G);
    if (n === 'humle') G.querySelectorAll('.leg-l, .leg-r, .skugga').forEach(e => e.setAttribute('display', 'none'));   // humlan flyger: inga ben (Sanna 2026-11-26)
  }
}
// --- Lovas gröna jacka (ritad i kod som zebrans i 052): målad i kroppens egen form (kroppsbilden som mask, innanför den vita
// kanten) från halsen och ner, över magen, ljusare grön än traktorn. Dragkedjan mitt fram; zipp(0–1) flyttar handtaget
// (1 = uppe vid kragen, stängd; 0 = nere, öppen i ett V så att magen syns). Riggens ruta (kroppen y 182–829).
const JK = { farg: '#86CF6E', mork: '#3F8F3A', hals: 532, topp: 560, botten: 815 };
function jacka(G) {
  const kb = G.querySelector('.kropp > image').getAttribute('href');
  document.querySelector('defs').insertAdjacentHTML('beforeend', `<mask id="jackmask" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
    <image href="${kb}" width="1024" height="1024" filter="url(#delsiluett)"/></mask>`);
  const { farg, mork, hals, topp, botten } = JK, kant = `M150 ${hals} Q512 ${hals + 60} 874 ${hals}`;
  G.querySelector('.kropp .mage').insertAdjacentHTML('afterend', `<g class="jacka" mask="url(#jackmask)">
    <path class="jk-tyg" fill-rule="evenodd" fill="${farg}"/><path class="jk-tyg" fill-rule="evenodd" fill="${mork}" opacity="0.3" filter="url(#tygkrita)"/>
    <path d="${kant}" fill="none" stroke="${mork}" stroke-width="22" stroke-linecap="round"/>
    <path d="M300 720 q45 12 90 0 M634 720 q45 12 90 0" stroke="${mork}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.8"/>
    <path class="jk-kedja" stroke="#8C8C86" stroke-width="12" stroke-dasharray="5 7" fill="none"/>
    <g class="jk-dra"><rect x="-13" y="-6" width="26" height="40" rx="11" fill="#fff" stroke="#8C8C86" stroke-width="5"/><circle cy="20" r="4" fill="#8C8C86"/></g></g>`);
  zipp(1);
}
export function zipp(k = 1) {   // handtagets läge: 1 uppe (stängd), 0 nere (öppen)
  const G = FIG.lova?.G; if (!G) return;
  const { hals, topp, botten } = JK, ty = lerp(botten - 40, topp, kl(k)), g = 46 * (1 - kl(k));
  const tyg = `M150 ${hals} Q512 ${hals + 60} 874 ${hals} V1024 H150 Z` + (g > 1 ? ` M${f1(512 - g)} ${topp - 20} L${f1(512 + g)} ${topp - 20} L512 ${f1(ty)} Z` : '');
  G.querySelectorAll('.jk-tyg').forEach(e => e.setAttribute('d', tyg));
  G.querySelector('.jk-kedja').setAttribute('d', `M512 ${f1(ty)} V${botten}`);
  G.querySelector('.jk-dra').setAttribute('transform', `translate(512 ${f1(ty)})`);
}
// ansikte/pose ur namn eller objekt; glada uttryck får öppna ögon som standard (som 053)
export const F = (n, f, o = {}) => typeof f === 'string' ? { ...FIG[n].L.blanda('neutral', f, 1), ...o } : { ...f, ...o };
export const P = (n, o = {}) => typeof o === 'string' ? FIG[n].L.blandaPose('neutral', o, 1) : { ...FIG[n].L.POSE0, ...o };
// ritar figuren n med fötterna i (x, fot) i lagret (standard #figurer), skala s (scenens px per riggpx)
export function figur(n, [x, fot], f, p, { s = 0.57, lager = 'figurer', t = TID } = {}) {
  const { L, G, blinka } = FIG[n];
  $(lager).appendChild(G);
  G.setAttribute('transform', `translate(${f1(x)} ${f1(fot)}) scale(${s.toFixed(4)}) translate(-512 ${-L.FOTTER})`);
  L.rita(G, blinka(f, t), p);
}
// Lova i traktorn: sitter i karet, armarna fria mellan stolparna
export function lovaKor(f, p = {}, { upp = 0 } = {}) {   // upp: hon reser sig i sätet (px i traktorns pixlar), så att armarna syns när hon vinkar/hejar
  const { L, G, blinka } = FIG.lova;
  $('forare').appendChild(G);
  G.setAttribute('transform', `translate(${SITS[0]} ${SITS[1] - upp}) scale(${LT}) translate(-512 ${-L.FOTTER})`);
  L.rita(G, blinka(f, TID), { ...L.blandaPose('neutral', 'sitter', 1), ...p });
  G.querySelectorAll('.tail, .skugga').forEach(e => e.setAttribute('display', 'none'));   // svansen och skuggan syns inte i karet
}

// --- Vägen: v2-vägen med väggen omfärgad till ljusblå (scener-v2/lager/vagen-ljusbla.png, ur vagen-teal.png) ----------------
// Vägen på y ca 875–1015, mittlinjen 940–951 (den inbakade täcks och ritas i kod så att den glider med marken).
export const VAG = HAR + 'lager/vagen-ljusbla.png', VAG_FOT = 990;
export function vagen(o = 0) {
  platta(VAG);
  lagg('bakom', `<rect x="-20" y="936" width="1960" height="20" fill="rgb(203,199,188)"/>
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${f1(1920 - (((i * 133 + o) % 2128) - 133))}" y="940" width="70" height="11" rx="5.5" fill="#F7F5EF"/>`).join('')}`);
}


// --- Kritsvepet (013:s rodsvep, format/fargsang-v2.md): vaxkorn, 1,6 s, ingen sak i svepet. In 0–0,46, helt i färg 0,46–0,54
// (klippet sker vid 0,5), ut 0,54–1. Ritas i #ram över skarven: båda scenerna runt ett byte har samma rad i SVEP (avsnittstid).
export const SV = 0.8;
export const SVEP = [[30.0, '#4FA34A', '#2F7A33'], [106.0, '#F6C21C', '#C9930C'], [204.0, '#9A6535', '#6E4524']];   // gröna in på vägen, gula till bondgården, bruna till åkern
const svepVax = (id, yta, F, FM, drag, kant) => `<defs>
  <pattern id="${id}-korn" patternUnits="userSpaceOnUse" width="890" height="510" patternTransform="rotate(10) scale(1.45)"><image href="${HAR}lager/kritsvep-korn.png" width="890" height="510"/></pattern>
  <mask id="${id}-m" maskUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080"><rect x="-500" y="-500" width="2920" height="2080" fill="url(#${id}-korn)"/></mask>
  <filter id="${id}-rand" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="31"/>
    <feDisplacementMap in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter>
  <clipPath id="${id}-yta"><path d="${yta}"/></clipPath></defs>
  <g filter="url(#boil)"><g filter="url(#${id}-rand)"><g clip-path="url(#${id}-yta)">
    <rect x="-400" y="-200" width="2800" height="1500" fill="#FBF7EE"/><rect x="-400" y="-200" width="2800" height="1500" fill="${F}" opacity="0.3"/>
    <rect x="-400" y="-200" width="2800" height="1500" fill="${F}" mask="url(#${id}-m)"/>
    <g fill="none" stroke="${FM}" stroke-linecap="round" mask="url(#${id}-m)">${drag}</g></g>
    ${kant ? `<path d="${yta}" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="70 9 26 7" opacity="0.6"/>` : ''}</g></g>`;
export function kritsvep(k, F, FM) {
  if (k <= 0 || k >= 1) return;
  const ut = k > 0.54, inne = k >= 0.46 && !ut, u = ut ? (k - 0.54) / 0.46 : Math.min(1, k / 0.46);
  const E = inne ? 2200 : lerp(-260, 2200, ut ? u * u : 1 - (1 - u) * (1 - u));
  const kant = []; for (let y = -120; y <= 1200; y += 40) kant.push([E + 30 * Math.sin(y * 0.013) + 14 * Math.sin(y * 0.07 + 1.3) + 6 * Math.sin(y * 0.31), y]);
  const yta = ut ? `M2400 -200 L${kant.map(p => p.join(' ')).join(' L')} L2400 1300Z` : `M-400 -200 L${kant.map(p => p.join(' ')).join(' L')} L-400 1300Z`;
  const drag = Array.from({ length: 11 }, (_, i) => { const x = i * 250 - 380 + 30 * Math.sin(i * 2.7), w = 46 + 20 * Math.abs(Math.sin(i * 1.9)),
    o = 0.22 + 0.12 * Math.abs(Math.sin(i * 3.1)), b = 24 * Math.sin(i * 1.3);
    return `<path d="M${x.toFixed(0)} -100 Q${(x + 160 + b).toFixed(0)} 540 ${(x + 320).toFixed(0)} 1180" stroke-width="${w.toFixed(0)}" opacity="${o.toFixed(2)}"/>`; }).join('');
  let h = svepVax('svep', yta, F, FM, drag, !inne);
  if (!ut && !inne) {   // kritan vid kanten, ett lugnt sicksack
    const y = 540 + 360 * Math.sin(u * Math.PI * 4), v = 28 + 8 * Math.cos(u * Math.PI * 4);
    h += `<g filter="url(#boil)" transform="translate(${f1(E)} ${f1(y)}) rotate(${f1(v)}) scale(2.8)">
      <path d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z" fill="${F}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${FM}"/></g>`;
  }
  lagg('ram', h);
}

// --- Tid och storyboard ------------------------------------------------------------------------------------------------------------
export let TID = 0, BILD = '', BILD0 = 0;
async function tider() {
  const md = await (await fetch('/avsnitt/014-grona-traktorn/storyboard-v2/storyboard.md')).text(), rad = [];
  for (const m of md.matchAll(/^\| (\d\d[a-z0-9]*(?:–[a-z])?) \| (\d+):(\d\d\.\d) \|/gm)) rad.push([m[1], +m[2] * 60 + +m[3]]);
  const T = {}; rad.forEach(([id, t], i) => T[id] = [t, i + 1 < rad.length ? rad[i + 1][1] : SLUT]); return T;
}
// ljud(namn, t, { vol, variant, loop, langd, fade }): effekten assets/ljud/effekter/<namn>/<namn>-<variant>.m4a på AVSNITTSTID t
let A0 = 0;
export function ljud(namn, t, { vol = 1, variant = 1, ...o } = {}) {
  window.LJUD.push({ fil: `assets/ljud/effekter/${namn}/${namn}-${variant}.m4a`, t: +(t - A0).toFixed(3), vol, ...o });
}
const RENSA = ['bakom', 'framfor', 'pynt', 'ram'];
// starta({ ANIM, figurer: [[namn, mapp, frö]], forladda: [...] })
export async function starta({ ANIM, figurer: fl = [], forladda = [], ljud: ljudlista }) {
  const T = await tider(), [forsta, sista] = window.SCEN; A0 = T[forsta][0]; const A1 = T[sista][1];
  window.DURATION = A1 - A0;
  if (A1 > SANG0) window.SANG = [Math.max(0, A0 - SANG0), A1 - SANG0];
  await Promise.all([VAG, ...forladda].map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
  await figurer(fl);
  const ids = Object.keys(T).filter(id => T[id][0] >= A0 && T[id][0] < A1);
  window.seek = t => {
    TID = A0 + t;
    const id = ids.findLast(i => T[i][0] <= TID) || ids[0], [a, b] = T[id];
    RENSA.forEach(l => $(l).innerHTML = '');
    for (const n in FIG) $('gomda').appendChild(FIG[n].G);
    traktor({ synlig: false }); kamera(1);
    BILD = id; BILD0 = a;
    (ANIM[id] || ANIM.standard)((TID - a) / (b - a), TID - a, b - a);
    for (const [c, F, FM] of SVEP) if (Math.abs(TID - c) < SV) kritsvep(0.5 + (TID - c) / (2 * SV), F, FM);
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);
    $('brus').nextElementSibling.setAttribute('scale', (2.5 / ZOOM).toFixed(3));
    window.kant?.uppdatera();
  };
  window.LJUD = []; ljudlista?.();
  window.seek(+(new URLSearchParams(location.search).get('t') || 0));
  return true;
}

// --- Vagnen: en släpvagn i brunt trä bakom traktorn, stor nog för Pip och Gurra (bondgården, slutet; Sanna 2026-11-26 "bigger cart").
// Ruta 200 × 120: lådan 0–200 × 0–80, hjulen under. Dragstången går från lådans framkant till traktorns krok bakom bakhjulet,
// och kroken sitter på ett grönt fäste under traktorns bakdel, så att vagnen ser fastkopplad ut. Lådans insida i #bakom,
// framsidan, hjulen och stången i #framfor; figurerna i vagnen ritas i #figurer med fötterna i golv (döljs av framsidan).
const VTRA = '#9A6535', VMORK = '#6E4524', VDACK = '#4b4542', VHR = 22;
export const KROK = [96, 770];   // kroken i traktorns pixlar (fästet ritas i traktorns bild)
export function vagn({ x = 300, fot = 1000, h = 300, rull = 0, krok = null } = {}) {
  const s = h / 120, x0 = x - 100 * s, y0 = fot - 120 * s, t = `translate(${f1(x0)} ${f1(y0)}) scale(${s.toFixed(4)})`, vr = f1(rull / (VHR * s) * 180 / Math.PI);
  const kant = f1(6 / s);
  lagg('bakom', `<g transform="${t}"><rect x="6" y="2" width="188" height="44" rx="6" fill="${VMORK}" stroke="#fff" stroke-width="${kant}"/></g>`);
  const fram = [x0 + 198 * s, y0 + 70 * s], k = krok || [fram[0] + 40 * s, fram[1]];
  lagg('framfor', `<path d="M${f1(fram[0])} ${f1(fram[1])} L${f1(k[0])} ${f1(k[1])}" stroke="#fff" stroke-width="${f1(10 * s + 8)}" stroke-linecap="round"/>
    <path d="M${f1(fram[0])} ${f1(fram[1])} L${f1(k[0])} ${f1(k[1])}" stroke="${VMORK}" stroke-width="${f1(10 * s)}" stroke-linecap="round"/>
    <circle cx="${f1(k[0])}" cy="${f1(k[1])}" r="${f1(7 * s)}" fill="#8C8C86" stroke="#fff" stroke-width="5"/>
    <g transform="${t}"><g stroke="#fff" stroke-width="${f1(8 / s)}" paint-order="stroke"><rect x="0" y="24" width="200" height="58" rx="8" fill="${VTRA}"/></g>
    ${[44, 63].map(y => `<rect x="8" y="${y}" width="184" height="4" rx="2" fill="${VMORK}" opacity="0.55"/>`).join('')}
    ${[52, 148].map(cx => `<g transform="translate(${cx} 98) rotate(${vr})"><circle r="${VHR}" fill="${VDACK}" stroke="#fff" stroke-width="${kant}" paint-order="stroke"/><circle r="9" fill="#C9C9C9"/><path d="M-9 0H9M0 -9V9" stroke="#8f8f8f" stroke-width="3"/></g>`).join('')}</g>`);
  return { golv: [x, y0 + 70 * s], krok: k, bredd: 200 * s };
}
// vagnen kopplad bakom traktorn: samma { x, fot, k, rull } som traktor(); glapp = dragstångens längd (scenens px).
export function vagnBakom({ x = 700, fot = 1000, k = 1, rull = 0, h = 300, glapp = 70 } = {}) {
  const krok = iTraktor(KROK, { x, fot, k }), s = h / 120;   // fästet sitter i traktorns bild (bakom bakhjulet)
  return vagn({ x: krok[0] - glapp - 198 * s + 100 * s, fot, h, rull, krok });
}
