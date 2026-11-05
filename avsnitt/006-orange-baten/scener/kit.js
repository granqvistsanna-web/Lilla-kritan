// Kodscen-kit för avsnitt 006 (kopierat från 005, 2026-11-05: takten är ca 88 bpm och uppskattad tills sången är tagen; Dinon Disa
// har armarna framför kroppen och förlängda, så att de syns i båten). Från 005: Ändrat för 005: duken är storyboardens mått, 1376 × 768
// (samma koordinater som storyboard/bygg.py, så att scenerna kan ta måtten rakt ur bygg.py; render.mjs renderar ändå 1920 × 1080),
// takten (ca 107,6 bpm), musen Mille med ritade lemmar, Dinon Disa, tiderna med tiondelar och refrängernas tider ur REFRÄNG_TID.
// Läses in med <script src="../kit.js"></script> (vanligt skript, inte modul,
// så att sidan också fungerar via render.mjs:s lilla server). Allt hamnar i window.kit.
// Mått i figurernas egna 1024-koordinater. Duken är 1376×768 (W, H).
const W = 1376, H = 768;
(() => {
const ROT = new URL('../../../', document.currentScript.src).href;   // repots rot
const NS = 'http://www.w3.org/2000/svg';
const INK = '#1d1d1d';

// Per figur: filnamn, bbox i 1024-rutan (fötterna = bboxens botten, mitt i x), standardhöjd i bild (px),
// ögon (uppmätta: med ansikte mot ansiktslös), mun: ALLA figurer har en kodmun (glatt leende som standard, `mun` öppnar,
// stora ögon ger ett litet "o"), placerad under nosen. munBredd gör leendet bredare, munFarg för mörka kroppar.
// Ankans näbb läggs tillbaka som lapp (cut/ankan-agda-nabb.png) och är hennes mun, utan kodleende. Kycklingens näbb saknas i den ansiktslösa bilden; leendet står i stället.
// framfor = delar som ritas framför kroppen. Saknade ögon = djurens standardögon.
const DJUROGON = [[414, 401], [605, 399]];
const FIGURER = {
  'ankan-agda':      { namn: 'ankan-agda', bbox: [178, 213, 841, 975], lapp: { fil: 'cut/ankan-agda-nabb.png', rekt: [390, 398, 238, 120] } },
  'bilen-brum':      { namn: 'bilen-brum', bbox: [84, 62, 944, 892], ogon: [[794, 603], [898, 593]], mun: [847, 665] },
  'bjornen-bulle':   { namn: 'bjornen-bulle', bbox: [177, 176, 841, 926], mun: [512, 508] },
  'bussen-bettan':   { namn: 'bussen-bettan', bbox: [67, 239, 964, 812], h: 464, ogon: [[851, 614], [931, 607]], ogonSkala: 0.8, mun: [891, 661], munForm: 'D', munSkala: 0.75,
    // den ansiktslösa bussen tappade framrutan: den läggs tillbaka från originalet
    lapp: { fil: 'cut/bussen-bettan.png', rekt: [812, 340, 140, 230] },
    fonster: [[149, 379, 98, 109], [283, 378, 99, 108], [414, 375, 99, 109], [546, 374, 99, 109]], dorr: [681, 368, 112, 273],
    hjulR: 63 },
  // avsnitt 003: bussen med två stora fönster (0 bakre, 1 vid dörren), samma mått som bussen-bettan; framifrån och bakifrån
  'bussen-tva-fonster': { namn: 'bussen-tva-fonster', bbox: [67, 239, 964, 812], h: 464, ogon: [[851, 614], [931, 607]], ogonSkala: 0.8, mun: [891, 661], munForm: 'D', munSkala: 0.75,
    fonster: [[148, 364, 236, 141], [414, 361, 234, 139]], dorr: [681, 368, 112, 273], hjulR: 63 },
  'bussen-fram':     { mapp: 'bussen-tva-fonster', kropp: 'cut/bussen-tva-fonster-fram-faceless.png', bbox: [180, 200, 844, 853], h: 529,
    ogon: [[421, 636], [604, 636]], ogonSkala: 1.7, mun: [514, 688], munForm: 'D', munSkala: 1.5 },   // samma skala som från sidan
  // tre kvart: bron mellan sidvyn och fram/bak. Ritad med fronten åt vänster; flip: true när bussen kör åt höger.
  'bussen-tre-kvart': { mapp: 'bussen-tva-fonster', kropp: 'cut/bussen-tva-fonster-tre-kvart-fram-faceless.png', bbox: [76, 197, 951, 855], h: 533,
    ogon: [[230, 632], [396, 643]], ogonSkala: 1.45, mun: [312, 685], munForm: 'D', munSkala: 1.5 },
  'bussen-tre-kvart-bak': { mapp: 'bussen-tva-fonster', kropp: 'cut/bussen-tva-fonster-tre-kvart-bak.png', bbox: [67, 224, 950, 839], h: 498, ogon: [] },
  'bussen-bak':      { mapp: 'bussen-tva-fonster', kropp: 'cut/bussen-tva-fonster-bak.png', bbox: [162, 200, 862, 835], h: 514, ogon: [] },
  'fjarilen-fia':    { namn: 'fia', bbox: [117, 189, 910, 805], ogon: [[428, 407], [595, 405]], ogonSkala: 2.1, mun: [512, 478], munSkala: 1.2, munFarg: '#f6e7f0' },   // ögon uppmätta i fia.png
  'flygplanet-pella':{ namn: 'flygplanet-pella', bbox: [30, 273, 943, 774], h: 599, ogon: [[747, 524], [839, 520]], mun: [797, 577],
    framfor: ['del-2', 'del-3', 'del-4'] },                                     // del-1 vimpel, del-4 propeller
  'grodan-gurra':    { namn: 'grodan-gurra', bbox: [177, 168, 841, 926], ogon: [[337, 262], [686, 260]], ogonSkala: 1.45, mun: [512, 392], munSkala: 1.4, munBredd: 2.6 },
  'hasten-hulda':    { namn: 'hasten-hulda', bbox: [173, 127, 877, 925], mun: [512, 548], munSkala: 1.2 },
  'humlan-humle':    { namn: 'humlan-humle', bbox: [116, 133, 897, 926], mun: [512, 472], munSkala: 1.2 },
  'hunden-hugo':     { namn: 'hunden-hugo', bbox: [177, 211, 883, 926], mun: [512, 482] },
  'igelkotten-igge': { namn: 'igelkotten-igge', bbox: [111, 92, 911, 926], mun: [512, 530] },
  'kaninen-kanel':   { namn: 'kanel', bbox: [160, 26, 853, 956], h: 281, ogon: [[412, 396], [605, 401]], mun: [510, 458], munSkala: 1.1 },   // 80 % av lammet; v3 brun och vit, munnen på nosens ljusa fläck
  'katten-kaj':      { namn: 'katten-kaj', bbox: [170, 174, 971, 926], mun: [512, 472], munSkala: 1.2, munFarg: '#f3e9dc' },
  'kycklingen-pip':  { namn: 'kycklingen-pip', bbox: [177, 92, 841, 942], mun: [512, 462], munSkala: 1.2 },
  'lammet-ludde':    { namn: 'ludde', bbox: [172, 182, 846, 926], h: 352, ogon: [[418, 402], [606, 401]], ogonSkala: 1, mun: [511, 466], munSkala: 1.5 },   // v2 (äggkropp); nosen är ritad
  // 005: blob-Mille med korta raka armar och ben ritade i kod (verktyg/rita-lemmar-mus.py). Ansiktet byts mot ansikten.js (MILLE: nosen, ögonen, munnen).
  'musen-mille':     { namn: 'musen-mille', rigg: 'musen-mille-rigg-lemmar.json', bbox: [163, 106, 904, 926], ogon: [[413, 401], [604, 398]], mun: [512, 459], munSkala: 1.4 },
  'dinon-disa':      { namn: 'dinon-disa', rigg: 'dinon-disa-rigg-lemmar.json', bbox: [218, 163, 929, 926], ogon: [[413, 401], [604, 398]], mun: [511, 466], munSkala: 1.3, framfor: ['arm-l', 'arm-r'] },   // 005, uppmätt i cut/dinon-disa.png; 006: armarna framför kroppen
  'traktorn-tuff':   { namn: 'traktorn-tuff', bbox: [83, 154, 944, 899], ogon: [[794, 602], [898, 593]], mun: [847, 665] },
};

// ---------- små hjälpare ----------
const clamp = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k));
const lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = clamp(k), k * k * (3 - 2 * k));
const inUt = k => (k = clamp(k), k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const del = (a, b, t) => clamp((t - a) / (b - a));
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
const bilder = [];
const bild = (href, parent, attrs = {}) => { bilder.push(href); return el('image', { href, width: 1024, height: 1024, ...attrs }, parent); };

// ---------- duken ----------
// lager.plate (bakgrund), lager.figurer (kokar), lager.overst (skärmen). plate och figurer följer kameran.
let svg, defs, lager = {};
// plate: en slug i assets/bakgrunder, en sökväg från repots rot ('avsnitt/…/x.png'), eller null (ingen platta).
function duk(plate) {
  svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMidYMid slice' });
  document.body.appendChild(svg);
  defs = el('defs', {}, svg);
  defs.innerHTML = `
    <filter id="boil" filterUnits="userSpaceOnUse" x="-400" y="-400" width="2176" height="1568">
      <feTurbulence class="brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="${BOIL.skala}"/>
    </filter>
    <filter id="kritkant" filterUnits="userSpaceOnUse" x="-400" y="-400" width="2176" height="1568">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4"/>
      <feDisplacementMap in="SourceGraphic" scale="26"/>
    </filter>`;
  lager.plate = el('g', { class: 'kamera' }, svg);
  if (plate) bild(plate.includes('/') ? ROT + plate : `${ROT}assets/bakgrunder/${plate}/${plate}.png`, lager.plate, { width: W, height: H, preserveAspectRatio: 'xMidYMid slice' });
  lager.figurer = el('g', { class: 'kamera' }, el('g', { filter: 'url(#boil)' }, svg));
  lager.overst = el('g', {}, svg);
  return lager;
}

// Kameran: punkten (cx, cy) hamnar mitt i bild, zoom ≥ 1. Hålls inom plattan.
// fri: true släpper gränsen (11a:s panorering upp över plattan, där kiosk-topp.png ligger ovanför).
function kamera(cx = W / 2, cy = H / 2, zoom = 1, fri = false) {
  const hw = W / 2 / zoom, hh = H / 2 / zoom;
  if (!fri) { cx = clamp(cx, hw, W - hw); cy = clamp(cy, hh, H - hh); }
  const tr = `translate(${W / 2} ${H / 2}) scale(${zoom}) translate(${-cx} ${-cy})`;
  svg.querySelectorAll('.kamera').forEach(g => g.setAttribute('transform', tr));
}

// ---------- figurer ----------
// const f = await kit.figur('kaninen-kanel', { h: 281, forelder: lager.figurer })
// f.pose({ x, y, k, s, tilt, sx, sy, flip, delar: { 'arm-r': -60, 'leg-l': [10, 0, -20] },
//          ogon: 'open'|'happy'|'sleep'|'big', blink: 0..1, vink: ögats nummer som blinkar (glad båge), titt: -1..1, mun: 0..1, synlig })
// x, y = fötternas punkt i bild. s = skala (art → bild), annars h / bbox-höjd, gånger k.
// delar: grader runt vridpunkten, [grader, dx, dy, skala] (dx/dy i 1024-rutan, skala runt vridpunkten), eller (px, py) => transform-sträng.
async function figur(slug, opt = {}) {
  const F = FIGURER[slug], mapp = `${ROT}assets/karaktarer/${F.mapp || slug}/`;
  const rigg = F.kropp ? { kropp: F.kropp, delar: {} } : await (await fetch(`${mapp}${F.rigg || F.namn + '-rigg.json'}`)).json();
  const fot = [(F.bbox[0] + F.bbox[2]) / 2, F.bbox[3]];
  const skala = (opt.h || F.h || 352) / (F.bbox[3] - F.bbox[1]);
  const g = el('g', {}, opt.forelder || lager.figurer), inre = el('g', {}, g);
  const framfor = F.framfor || [], delar = {};
  // Delarna har en bit kroppstextur runt leden (delar.py) som ska gömmas bakom kroppen. Masken tar bort allt som ligger
  // innanför kroppens siluett i delens egen ram (som den ligger i vila), så biten aldrig sticker ut när delen vrids.
  let mask = null;
  if (Object.keys(rigg.delar).length && !rigg.ritadeDelar) {   // ritade delar (verktyg/rita-lemmar.py) har runda toppar och behöver ingen mask
    mask = `ledmask-${slug}-${Math.random().toString(36).slice(2, 7)}`;
    if (!defs.querySelector('#kroppsilhuett')) defs.insertAdjacentHTML('beforeend', `
      <filter id="kroppsilhuett" x="0" y="0" width="1" height="1">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
      </filter>`);
    const m = el('mask', { id: mask, maskUnits: 'userSpaceOnUse', x: -400, y: -400, width: 1824, height: 1824 }, defs);
    el('rect', { x: -400, y: -400, width: 1824, height: 1824, fill: '#fff' }, m);
    bild(mapp + rigg.kropp, m, { filter: 'url(#kroppsilhuett)' });
  }
  const delEl = namn => (delar[namn] = bild(mapp + rigg.delar[namn].fil, inre, { ...(mask ? { mask: `url(#${mask})` } : {}) }));
  for (const n in rigg.delar) if (!framfor.includes(n)) delEl(n);
  const kropp = el('g', {}, inre);
  bild(mapp + rigg.kropp, kropp);
  if (F.lapp) {
    const [x, y, w, h] = F.lapp.rekt, id = `lapp-${slug}-${Math.random().toString(36).slice(2, 7)}`;
    el('rect', { x, y, width: w, height: h }, el('clipPath', { id }, defs));
    bild(mapp + F.lapp.fil, kropp, { 'clip-path': `url(#${id})` });
  }
  for (const n of framfor) delEl(n);
  // ansiktet ligger överst i den inre gruppen, så att det följer med squash och tilt
  const ansikte = el('g', {}, inre), es = F.ogonSkala || 1;
  const ogon = (F.ogon || DJUROGON).map(([x, y]) => {
    const pos = el('g', { transform: `translate(${x} ${y}) scale(${es})` }, ansikte);
    const oppen = el('g', {}, pos);
    el('circle', { r: 26, fill: '#fff', stroke: INK, 'stroke-width': 6 }, oppen);
    const pupill = el('circle', { r: 10, fill: INK }, oppen);
    const glad = el('path', { d: 'M-22 8 Q0 -18 22 8', fill: 'none', stroke: INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, pos);
    const sover = el('path', { d: 'M-22 -2 Q0 18 22 -2', fill: 'none', stroke: INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, pos);
    return { oppen, pupill, glad, sover };
  });
  let mun;
  if (F.mun) {
    const pos = el('g', { transform: `translate(${F.mun[0]} ${F.mun[1]}) scale(${F.munSkala || 1})` }, ansikte);
    const b = F.munBredd || 1;   // bredare leende (grodan), samma tjocklek
    const le = el('path', { d: `M${-20 * b} -5 Q0 ${5 + 9 * b} ${20 * b} -5`, fill: 'none', stroke: F.munFarg || INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, pos);
    const oppen = el('g', {}, pos);
    el('path', { d: 'M-24 -12 Q0 -6 24 -12 Q22 18 0 18 Q-22 18 -24 -12Z', fill: '#5a2418', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, oppen);
    el('ellipse', { cx: 2, cy: 10, rx: 11, ry: 6, fill: '#e7898c' }, oppen);
    const o = el('ellipse', { cx: 0, cy: 2, rx: 9, ry: 11, fill: '#5a2418', stroke: F.munFarg || INK, 'stroke-width': 4 }, pos);
    mun = { le, oppen, o, b, D: F.munForm === 'D' };
  }

  const f = { slug, F, g, inre, kropp, delar, fot, skala, rigg, ansikte };
  f.pose = (p = {}) => {
    const s = (p.s ?? skala) * (p.k ?? 1), flip = p.flip ? -1 : 1;
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x ?? W / 2} ${p.y ?? H * 0.85}) rotate(${p.tilt || 0}) scale(${s * flip * (p.sx ?? 1)} ${s * (p.sy ?? 1)}) translate(${-fot[0]} ${-fot[1]})`);
    for (const n in delar) {
      const v = p.delar?.[n] ?? 0, [deg, dx, dy, sk = 1] = fastArm(rigg, n, Array.isArray(v) ? v : [v, 0, 0]), [px, py] = rigg.delar[n].vridpunkt;
      delar[n].setAttribute('transform', typeof v === 'function' ? v(px, py)
        : `translate(${dx || 0} ${dy || 0}) rotate(${deg} ${px} ${py}) translate(${px} ${py}) scale(${sk}) translate(${-px} ${-py})`);
    }
    const lage = p.ogon || 'open', blink = lage === 'open' || lage === 'big' ? 1 - 0.92 * (p.blink || 0) : 1;
    const titt = clamp(p.titt || 0, -1, 1) * 9 * flip, stor = lage === 'big' ? 1.3 : 1;
    ogon.forEach((o, i) => {
      const vinkar = p.vink === i && (lage === 'open' || lage === 'big');
      o.oppen.style.display = (lage === 'open' || lage === 'big') && !vinkar ? '' : 'none';
      o.oppen.setAttribute('transform', `scale(${stor} ${stor * blink})`);
      o.pupill.setAttribute('cx', titt);
      o.pupill.setAttribute('cy', clamp(p.tittY || 0, -1, 1) * 9);   // tittY −1 = upp
      o.glad.style.display = lage === 'happy' || vinkar ? '' : 'none';
      o.sover.style.display = lage === 'sleep' ? '' : 'none';
    });
    if (mun) {
      const m = clamp(p.mun ?? 0);
      const forvanad = !mun.D && m < 0.1 && lage === 'big';
      mun.le.style.display = !mun.D && m < 0.1 && !forvanad ? '' : 'none';
      mun.o.style.display = forvanad ? '' : 'none';
      mun.oppen.style.display = mun.D || m >= 0.1 ? '' : 'none';
      mun.oppen.setAttribute('transform', `scale(${mun.D ? 1 + 0.2 * m : 0.8 * mun.b}, ${mun.D ? 0.75 + 0.9 * m : m * 1.3})`);
    }
  };
  // en punkt i figurens 1024-ruta → bild (med figurens senaste pose)
  f.punkt = ([ax, ay]) => {
    const m = g.getCTM(), r = lager.figurer.getCTM().inverse().multiply(m), pt = new DOMPoint(ax, ay).matrixTransform(r);
    return [pt.x, pt.y];
  };
  f.pose();
  return f;
}

// ---------- bussen: dörr och fönster ----------
// Öppen dörr: en mörk öppning som växer ut från mitten. k = 0 stängd, 1 öppen.
function dorr(buss, k) {
  if (!buss.dorrEl) {
    const [x, y, w, h] = buss.F.dorr;
    buss.dorrEl = el('rect', { x, y, width: w, height: h, rx: 8, fill: '#602822' });
    buss.inre.insertBefore(buss.dorrEl, buss.ansikte);
  }
  const [x, , w] = buss.F.dorr, c = x + w / 2;
  buss.dorrEl.style.display = k > 0.01 ? '' : 'none';
  buss.dorrEl.setAttribute('transform', `translate(${c} 0) scale(${clamp(k)} 1) translate(${-c} 0)`);
}
// En figur sätter sig i bussens fönster i (0 = bakerst): mörk ruta bakom (#3E4A63), figuren klipps i fönstret och åker med bussen.
// Ger tillbaka grundposen (i bussens 1024-ruta); lägg på studs med f.pose({ ...bas, y: bas.y - studs }).
function iFonster(buss, f, i) {
  const [x, y, w, h] = buss.F.fonster[i], id = `fonster-${i}-${f.slug}`;
  el('rect', { x, y, width: w, height: h, rx: 14 }, el('clipPath', { id }, defs));
  const g = el('g', {}), ruta = el('rect', { x, y, width: w, height: h, rx: 14, fill: '#3E4A63' }, g);
  const klipp = el('g', { 'clip-path': `url(#${id})` }, g);
  klipp.appendChild(f.g);
  buss.inre.insertBefore(g, buss.ansikte);
  // huvudet tar ~75 % av fönsterbredden (för lammet, kaninen 80 % av det), ögonen 62 % ner i rutan
  const k = Math.min(w, h * 1.1) * 0.5 / 190 * 0.75 * ((f.F.h || 352) / 352);   // breda fönster: höjden styr
  const ogonY = (f.F.ogon || DJUROGON)[0][1];
  return { x: x + w / 2 + (f.fot[0] - 510) * k, y: y + h * 0.62 + (f.fot[1] - ogonY) * k, s: k, ruta };
}

// ---------- rörelse ----------
// Hopp från t0 till t1 (i luften), med squash före och efter. Ger { y (uppåt negativt), sx, sy, luft 0..1, ben }.
function hopp(t, t0, t1, h, forb = 0.12, efter = 0.18) {
  let y = 0, sx = 1, sy = 1, ben = 0;
  if (t > t0 - forb && t < t0) { const q = Math.sin(del(t0 - forb, t0, t) * Math.PI / 2); sx = 1 + 0.08 * q; sy = 1 - 0.1 * q; }
  else if (t >= t0 && t <= t1) {
    const k = del(t0, t1, t); y = -4 * h * k * (1 - k);
    const v = 1 - 2 * k;                         // fart uppåt, -1..1
    sy = 1 + 0.07 * Math.abs(v) * (h > 40 ? 1 : 0.4); sx = 2 - sy; ben = Math.sin(k * Math.PI);
  } else if (t > t1 && t < t1 + efter) { const q = Math.sin(del(t1, t1 + efter, t) * Math.PI); sx = 1 + 0.09 * q; sy = 1 - 0.11 * q; }
  return { y, sx, sy, luft: t >= t0 && t <= t1 ? del(t0, t1, t) : 0, ben };
}
// Vagga (gång): fas i steg. Ger { tilt, bob, benL, benR, lyftL, lyftR }. Lägg amp 0..1 för mjuk start/stopp.
function vagga(fas, amp = 1) {
  const f = Math.sin(fas * Math.PI);
  return { tilt: f * 6 * amp, bob: -Math.abs(f) * 12 * amp, benL: f * 16 * amp, benR: -f * 16 * amp,
    lyftL: Math.max(0, -f) * -40 * amp, lyftR: Math.max(0, f) * -40 * amp };
}
// Hjulsnurr i grader: sträcka i bild (px) / hjulets radie i bild.
const snurr = (dist, radieBild) => dist / radieBild * 180 / Math.PI;
// Blinkning: 0..1 stängt, kring varje tid i listan (0,12 s).
const blink = (t, tider) => tider.some(b => t >= b && t < b + 0.12) ? 1 : 0;
// Prat: munnen öppnas och stängs inom [från, till]-intervallen (~4 stavelser/s).
const prat = (t, ranges) => ranges.some(([a, b]) => t >= a && t < b) ? Math.abs(Math.sin(t * Math.PI * 4.2)) * 0.9 : 0;
// Vinka: [grader, dx, dy] för armen (läggs direkt i pose.delar). Armen lyfts ut och upp, fri från kroppen,
// och toppar på tiden `topp`. sida = -1 för höger arm (arm-r), 1 för vänster (arm-l).
function vinka(t, topp, sida = -1, langd = 1.6) {
  const a = topp - langd / 2, b = topp + langd / 2;
  const upp = mjuk(del(a, a + 0.35, t)) * mjuk(del(b, b - 0.35, t));
  return [sida * (10 + 100 * upp) + Math.sin((t - topp) * 13 + Math.PI / 2) * 24 * upp * sida, -sida * 45 * upp, -70 * upp, 1 + 0.35 * upp];
}
// Ritade armar (ritadeDelar) sitter fast i axeln: de vrids och sträcks men flyttas aldrig ut från kroppen, annars svävar de i luften.
const fastArm = (rigg, n, [deg, dx, dy, sk]) => rigg.ritadeDelar && n.startsWith('arm') ? [deg, 0, 0, sk] : [deg, dx, dy, sk];
// Ben i ett hopp: ben 0..1 (hopp().ben). Fötterna dras upp och vinklas utåt, så de inte ser fastlimmade ut.
const benHopp = ben => ({ 'leg-l': [-30 * ben, 0, -34 * ben], 'leg-r': [30 * ben, 0, -34 * ben] });

// ---------- musen Milles ritade armar (samma vinklar som verktyg/rita-lemmar-mus.py och bygg.py) ----------
// a: 0 rakt ner, 90 rakt ut åt sin sida, 180 rakt upp. Ger graderna att lägga i pose.delar['arm-r'|'arm-l'].
const MUS_AXEL = { r: [757, 565], l: [256, 565] }, MUS_ARM = 170, MUS_VILA = 30, SIDA = { r: 1, l: -1 };
const musArm = (s, a) => -SIDA[s] * a;
// vinkeln som riktar armen mot punkten (musens 1024-ruta); tassen når bara 170 px från axeln
const mot = (s, [x, y]) => { const [ax, ay] = MUS_AXEL[s]; return Math.atan2(SIDA[s] * (x - ax), y - ay) * 180 / Math.PI; };
// tassens mitt när armen pekar i vinkeln a
const musHand = (s, a) => { const [ax, ay] = MUS_AXEL[s], r = a * Math.PI / 180; return [ax + SIDA[s] * Math.sin(r) * MUS_ARM, ay + Math.cos(r) * MUS_ARM]; };

// ---------- saker vid vägen ----------
// Stilla saker bakom vägen ur assets/bakgrunder/vagen-saker (björk, gran, lövträd, stuga, staket, brevlåda, rosa buske), foten på y, höjd h.
// Läggs först i parent (bakom det som redan finns där). s.pa(x) sätter mitten i x.
const VAGSAKER = { bjork: [275, 588], gran: [355, 611], lovtrad: [429, 609], stuga: [449, 466], staket: [433, 221], brevlada: [166, 268], 'buske-rosa': [870, 625] };
function vagsak(namn, parent, y, h) {
  const [w0, h0] = VAGSAKER[namn], w = w0 * h / h0, g = el('g', {});
  parent.insertBefore(g, parent.firstChild);
  bild(`${ROT}assets/bakgrunder/vagen-saker/${namn}.png`, g, { width: w, height: h });
  return { g, w, pa: x => g.setAttribute('transform', `translate(${x - w / 2} ${y - h})`) };
}

// ---------- tider ur avsnittets egna filer ----------
// const M = await kit.manus();
// M.rad('Här kommer bussen') → { t, slut } i sångtid (slut = nästa rads start), ur rader.txt
// M.bild('05a') → [start, slut] i avsnittstid, ur SHOTS och REFRÄNG_TID i storyboard/bygg.py
// M.av = avsnittstid − sångtid (rader.txt: "Avsnittstid = sångtid + 8 s")
const AVSNITT = new URL('../', document.currentScript.src).href;
async function manus() {
  const [rader, bygg] = await Promise.all(['rader.txt', 'storyboard/bygg.py'].map(f => fetch(AVSNITT + f).then(r => r.text())));
  const tid = s => s.split(':').reduce((a, b) => a * 60 + +b, 0);
  const lista = [...rader.matchAll(/^(\d+:\d+(?:\.\d+)?)\s+(.+)$/gm)].map(m => ({ t: tid(m[1]), text: m[2] }));
  lista.forEach((r, i) => (r.slut = lista[i + 1]?.t ?? Infinity));
  const bilder = {};
  for (const m of bygg.matchAll(/\("(\w+)", "(\d+:\d+(?:\.\d+)?)(?:–(\d+:\d+(?:\.\d+)?))?"/g)) bilder[m[1]] = [tid(m[2]), tid(m[3] || m[2])];
  // refrängernas bilder står inte i SHOTS utan i REFRÄNG_TID (en lista med gränser per refräng) och REFRÄNG_ID
  const ids = JSON.parse(bygg.match(/^REFRÄNG_ID = (\[.*\])/m)[1]);
  for (const m of bygg.matchAll(/"(\d\d)": \[([^\]]+)\]/g)) {
    const g = [...m[2].matchAll(/"([\d:.]+)"/g)].map(x => tid(x[1]));
    ids.forEach((id, i) => (bilder[m[1] + id] = [bilder[m[1] + id]?.[0] ?? g[i], g[i + 1]]));   // samma bokstav två gånger = en bild
  }
  const av = +(rader.match(/(?:sångtid|klipptid) \+ (\d+(?:[.,]\d+)?) s/)?.[1].replace(',', '.') ?? 0);
  const rad = (text, nr = 0) => {
    const r = lista.filter(r => r.text.toLowerCase().includes(text.toLowerCase()))[nr];
    if (!r) throw new Error(`Ingen rad med "${text}" i rader.txt`);
    return r;
  };
  const bild = id => { if (!bilder[id]) throw new Error(`Ingen bild ${id} i SHOTS`); return bilder[id]; };
  return { rader: lista, bilder, av, rad, bild };
}
// Beat-rutnätet i sang-klippt.m4a (klipptid = avsnittstid − 11 s), uppmätt med librosa: ca 102 bpm. Klippen är hela takter,
// så samma rutnät håller över skarvarna (±0,06 s).
const BEAT = 0.5758, BEAT0 = 0.22;   // tagning 2 (2026-11-05), uppmätt i sang-klippt.m4a, klipptid
const takt = s => BEAT0 + Math.round((s - BEAT0) / BEAT) * BEAT;

// ---------- bussens rörelse (samma lugna värden i alla scener) ----------
// Boil: förskjutning i px och hur många bilder (av 30/s) mellan varje ny seed.
const BOIL = { skala: 2.5, bilder: 4 };   // 2,5 i 1376-duken = 3,5 px i 1920
const BUSS_RORELSE = {
  gungGrader: 1.2,     // största lutning när bussen gungar i takt
  gungBeats: 4,        // ett helt gung (vänster–höger) per 4 beats: långsamt, inte varje steg
  gungLyft: 1.5,       // px upp och ner, mjukt, två gånger per gung
  tutLyft: 5, tutSquash: 0.015, tutTid: 0.45,     // tut: liten mjuk puff, ingen hopp
  brumLyft: 3, brumTid: 0.35,                     // "brum": ännu mindre
  stoppGrader: 1.2, stoppTid: 1.3,                // gungar till en gång när den stannar
  startGrader: 0.8, startTid: 1.0,                // lutar bakåt lite när den kör iväg
  motorLyft: 0.6,                                 // tuffar på stället, mjukt
  vinkGrader: 1.2,                                // gungar när den vinkar hej då
};
const R = BUSS_RORELSE, bump = k => Math.pow(Math.sin(clamp(k) * Math.PI), 2);   // 0 → 1 → 0 med mjuka ändar
// Gung i takt. fas = beat-fas (beats sedan BEAT0), amp 0..1 för mjuk start och stopp. Ger { tilt, lyft }.
function bussGung(fas, amp = 1) {
  const v = fas * 2 * Math.PI / R.gungBeats;
  return { tilt: Math.sin(v) * R.gungGrader * amp, lyft: -(1 - Math.cos(2 * v)) / 2 * R.gungLyft * amp };
}
// Tut och brum: { lyft, sx, sy, mun, ogon, streck } för tiderna i listan (ogon 'happy' under tutet, annars null).
function bussTut(t, tider, brum = false) {
  const len = brum ? R.brumTid : R.tutTid, h = brum ? R.brumLyft : R.tutLyft;
  const u = { lyft: 0, sx: 1, sy: 1, mun: 0, ogon: null, streck: 0 };
  for (const a of tider) if (t > a - 0.05 && t < a + len) {
    const k = del(a - 0.05, a + len, t), b = bump(k);
    u.lyft -= h * b;
    if (!brum) { u.sy *= 1 + R.tutSquash * b; u.sx *= 1 - R.tutSquash * 0.7 * b; u.ogon = 'happy'; u.streck = del(a, a + 0.4, t); }
    u.mun = Math.max(u.mun, (brum ? 0.5 : 0.8) * Math.sin(k * Math.PI));
  }
  return u;
}
// Lutning när bussen stannar vid tiden `stopp` (gungar fram och tillbaka en gång) eller kör iväg vid `start`.
const bussStopp = (t, stopp) => { const k = del(stopp - 0.3, stopp - 0.3 + R.stoppTid, t); return Math.sin(2 * Math.PI * k) * Math.sin(Math.PI * k) * R.stoppGrader; };
const bussStart = (t, start) => -bump(del(start, start + R.startTid, t)) * R.startGrader;
const bussMotor = t => -(1 - Math.cos(t * Math.PI * 3.2)) / 2 * R.motorLyft;

// ---------- drivaren ----------
// kit.kor(render, DURATION, { sang: [från, till] }) – sätter window.render/seek/DURATION/ready/SANG.
// window.stilla = true stoppar loopen, så att render(t) kan anropas bild för bild (render.mjs gör det).
// ---------- ljud ----------
// kit.ljud(namn, t, { vol, variant, loop, langd, fade }) lägger en ljudeffekt på scentid t (anropas när scenen byggs,
// inte per bild). render.mjs mixar dem under sångbiten. vol 1 = effektnivån (−8 dB under sången).
// Variant väljs i tur och ordning om den inte anges, så att upprepade tut inte låter likadant.
// loop: filen upprepas tills langd (s) har gått; langd utan loop kortar ljudet. fade = uttoning i slutet (s).
// Ljud som inte finns än listas ändå (fil: null) och blir tysta.
const LJUDFILER = { 'tuta-tut': 5, brum: 7, pschhh: 5, plupp: 5, fagelkvitter: 4, surr: 4, propeller: 4, mums: 4, 'kiosk-pling': 4, jubel: 4,
  'skrrrrt-kort': 4, 'skrrrrt-lang': 4, swoosh: 4, pling: 4, boing: 4, pop: 4, duns: 4, ba: 4, 'tuff-tuff': 4, 'snark-pip': 4, fladder: 4, 'hjul-gnissel': 4,
  slurp: 2, steg: 4, fniss: 3, plask: 4, 'plask-stor': 4, stank: 4, simma: 4, 'regn-droppar': 4, regn: 4,   // 004: vatten och regn (ElevenLabs), slurp, steg, fniss
  kvack: 4, 'kvack-glad': 4, 'oj-oj': 4, jippi: 4, ooh: 2, wiii: 2, flamt: 3, brr: 4, kvak: 4, huttra: 2 };   // 004: djurröster från piloten Lilla Kvack (produktion/sfx/new)
// 005 använder samma effekter; nya som behövs men saknas (tysta tills de finns): plopp (flaggan), dunk (dinon klappar på relingen), klapp
Object.assign(LJUDFILER, { plopp: 0, pip: 0, dunk: 4, klapp: 2, glitter: 4, klistra: 2, ding: 4, mistlur: 5, snyft: 3, vagor: 4 });   // Sannas nya effekter 2026-11-04 (plopp och pip saknas än)
const ljudLista = [], ljudTur = {};
function ljud(namn, t, { vol = 1, variant, loop = false, langd, fade = 0.3 } = {}) {
  const n = LJUDFILER[namn] || 0;
  if (n && variant == null) variant = (ljudTur[namn] = ((ljudTur[namn] ?? -1) + 1) % n) + 1;
  ljudLista.push({ namn, t: +t.toFixed(3), vol, variant: n ? variant : null, loop, langd, fade,
    fil: n ? `assets/ljud/effekter/${namn}/${namn}-${variant}.m4a` : null });
}

function kor(render, DURATION, opt = {}) {
  const ram = t => {
    render(t);
    const seed = Math.floor(t * 30 / BOIL.bilder) % 50 + 1;
    svg.querySelectorAll('.brus').forEach(b => b.setAttribute('seed', seed));
  };
  window.render = ram;
  window.seek = t => { window.stilla = true; ram(t); };
  window.DURATION = DURATION;
  window.SANG = opt.sang;
  window.LJUD = ljudLista;
  window.ready = Promise.all(bilder.map(src => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = src; })));
  const start = performance.now();
  (function loop() { if (!window.stilla) ram(((performance.now() - start) / 1000) % DURATION); requestAnimationFrame(loop); })();
}

// Backar: en bred bild med mjuka gröna kullar i krita (korn, vit kant) och vägen som en böljande kritlinje över dem.
// b = backar(forelder) ritar himmel, bortre kullar och vägkullen; b.y(x) = vägens mitt, b.grader(x) = lutningen (grader).
// Fordon: pose({ x, y: b.y(x), tilt: b.grader(x) }). b.g är gruppen (dölj den med style.display).
function backar(forelder, { y0 = 730, amp = 70, langd = 1500, fas = 300, himmel = '#b1e0ee' } = {}) {
  if (!svg.querySelector('#backkorn')) defs.insertAdjacentHTML('beforeend', `
    <filter id="backkorn" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="9" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="10" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -6 3.0" result="p"/>
      <feComposite in="p" in2="d" operator="in" result="pk"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge>
    </filter>`);
  const y = x => y0 - amp * Math.sin(2 * Math.PI * (x - fas) / langd);
  const grader = x => -Math.atan(amp * 2 * Math.PI / langd * Math.cos(2 * Math.PI * (x - fas) / langd)) * 180 / Math.PI;
  const kurva = (f, botten = 1180) => { let d = `M-120 ${botten}`; for (let x = -120; x <= 2040; x += 20) d += ` L${x} ${f(x).toFixed(1)}`; return d + ` L2040 ${botten}Z`; };
  const g = el('g', {}, forelder);
  el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: himmel }, g);
  const k = el('g', { filter: 'url(#backkorn)' }, g);
  const kulle = (f, fill) => el('path', { d: kurva(f), fill, stroke: '#fff', 'stroke-width': 14, 'stroke-linejoin': 'round' }, k);
  kulle(x => y0 - 250 - 90 * Math.sin(2 * Math.PI * (x + 200) / 1100), '#bfe08f');      // bortre kullar
  kulle(x => y(x) - 18, '#8cc35f');                                                    // vägkullen
  let vag = `M-120 ${y(-120)}`; for (let x = -100; x <= 2040; x += 20) vag += ` L${x} ${y(x).toFixed(1)}`;
  el('path', { d: vag, fill: 'none', stroke: '#f7f3ea', 'stroke-width': 40, 'stroke-linecap': 'round' }, k);
  el('path', { d: vag, fill: 'none', stroke: '#8e8e8a', 'stroke-width': 5, 'stroke-dasharray': '26 22', 'stroke-linecap': 'round' }, k);
  return { g, y, grader };
}

// Bussen framifrån eller bakifrån, i ett eget klipp (aldrig en vändning mitt i ett klipp): kör mot kameran (k0 < k1, växer)
// eller ifrån den (k0 > k1, krymper). Rör sig fram till t1 − paus, står sedan still (blinka mot kameran). Lugnt gupp (BUSS_RORELSE).
// → { x, y, k, synlig } att lägga i pose(), t.ex. bussFram.pose({ ...kit.motKamera(t, [a, b], { … }), ogon, blink }).
function motKamera(t, [t0, t1], { x0 = 960, x1 = x0, y0, y1, k0, k1, paus = 0 }) {
  const q = mjuk(del(t0, t1 - paus, t)), gar = t < t1 - paus;
  return { x: lerp(x0, x1, q), y: lerp(y0, y1, q) + (gar ? bussMotor(t) * 2 : 0), k: lerp(k0, k1, q), synlig: t >= t0 && t < t1 };
}

window.kit = { ROT, W, H, FIGURER, MUS_AXEL, MUS_VILA, musArm, mot, musHand, clamp, lerp, mjuk, inUt, del, el, bild, duk, kamera, figur, dorr, iFonster,
  hopp, vagga, snurr, blink, prat, vinka, fastArm, benHopp, vagsak, manus, BEAT, BEAT0, takt, kor,
  backar, motKamera, ljud, LJUDFILER, BOIL, BUSS_RORELSE, bussGung, bussTut, bussStopp, bussStart, bussMotor, get lager() { return lager; } };
})();
