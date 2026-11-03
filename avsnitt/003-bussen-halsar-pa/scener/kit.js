// Kodscen-kit för avsnitt 003. Läses in med <script src="../kit.js"></script> (vanligt skript, inte modul,
// så att sidan också fungerar via render.mjs:s lilla server). Allt hamnar i window.kit.
// Mått i figurernas egna 1024-koordinater. Duken är 1920×1080.
(() => {
const ROT = new URL('../../../', document.currentScript.src).href;   // repots rot
const NS = 'http://www.w3.org/2000/svg';
const INK = '#1d1d1d';

// Per figur: filnamn, bbox i 1024-rutan (fötterna = bboxens botten, mitt i x), standardhöjd i bild (px),
// ögon (uppmätta: med ansikte mot ansiktslös), mun (bara där den ansiktslösa bilden saknar mun),
// framfor = delar som ritas framför kroppen. Saknade ögon = djurens standardögon.
const DJUROGON = [[414, 401], [605, 399]];
const FIGURER = {
  'ankan-agda':      { namn: 'ankan-agda', bbox: [178, 213, 841, 975] },
  'bilen-brum':      { namn: 'bilen-brum', bbox: [84, 62, 944, 892], ogon: [[794, 603], [898, 593]], mun: [847, 665] },
  'bjornen-bulle':   { namn: 'bjornen-bulle', bbox: [177, 176, 841, 926] },
  'bussen-bettan':   { namn: 'bussen-bettan', bbox: [67, 239, 964, 812], h: 464, ogon: [[851, 614], [931, 607]], ogonSkala: 0.8, mun: [891, 661], munForm: 'D', munSkala: 0.75,
    // den ansiktslösa bussen tappade framrutan: den läggs tillbaka från originalet
    lapp: { fil: 'cut/bussen-bettan.png', rekt: [812, 340, 140, 230] },
    fonster: [[149, 379, 98, 109], [283, 378, 99, 108], [414, 375, 99, 109], [546, 374, 99, 109]], dorr: [681, 368, 112, 273],
    hjulR: 63 },
  'fjarilen-fia':    { namn: 'fia', bbox: [117, 189, 910, 805] },               // ögon ej uppmätta
  'flygplanet-pella':{ namn: 'flygplanet-pella', bbox: [30, 273, 943, 774], h: 599, ogon: [[747, 524], [839, 520]], mun: [797, 577],
    framfor: ['del-2', 'del-3', 'del-4'] },                                     // del-1 vimpel, del-4 propeller
  'grodan-gurra':    { namn: 'grodan-gurra', bbox: [177, 168, 841, 926], ogon: [[337, 262], [686, 260]], ogonSkala: 1.45 },
  'hasten-hulda':    { namn: 'hasten-hulda', bbox: [173, 127, 877, 925] },
  'humlan-humle':    { namn: 'humlan-humle', bbox: [116, 133, 897, 926] },
  'hunden-hugo':     { namn: 'hunden-hugo', bbox: [177, 211, 883, 926] },
  'igelkotten-igge': { namn: 'igelkotten-igge', bbox: [111, 92, 911, 926] },
  'kaninen-kanel':   { namn: 'kanel', bbox: [163, 29, 849, 952], h: 281 },      // 80 % av lammet
  'katten-kaj':      { namn: 'katten-kaj', bbox: [170, 174, 971, 926] },
  'kycklingen-pip':  { namn: 'kycklingen-pip', bbox: [177, 92, 841, 942] },
  'lammet-ludde':    { namn: 'ludde', bbox: [163, 114, 853, 917], h: 352 },
  'musen-mille':     { namn: 'musen-mille', bbox: [163, 107, 962, 926] },
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
// lager.plate (bakgrund), lager.figurer (kokar), lager.overst (skärmen, för kritsvep). plate och figurer följer kameran.
let svg, defs, lager = {};
function duk(plateSlug) {
  svg = el('svg', { viewBox: '0 0 1920 1080', preserveAspectRatio: 'xMidYMid slice' });
  document.body.appendChild(svg);
  defs = el('defs', {}, svg);
  defs.innerHTML = `
    <filter id="boil" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
      <feTurbulence class="brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="6"/>
    </filter>
    <filter id="kritkant" filterUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4"/>
      <feDisplacementMap in="SourceGraphic" scale="26"/>
    </filter>`;
  lager.plate = el('g', { class: 'kamera' }, svg);
  bild(`${ROT}assets/bakgrunder/${plateSlug}/${plateSlug}.png`, lager.plate, { width: 1920, height: 1080, preserveAspectRatio: 'xMidYMid slice' });
  lager.figurer = el('g', { class: 'kamera' }, el('g', { filter: 'url(#boil)' }, svg));
  lager.overst = el('g', {}, svg);
  return lager;
}

// Kameran: punkten (cx, cy) hamnar mitt i bild, zoom ≥ 1. Hålls inom plattan.
function kamera(cx = 960, cy = 540, zoom = 1) {
  const hw = 960 / zoom, hh = 540 / zoom;
  cx = clamp(cx, hw, 1920 - hw); cy = clamp(cy, hh, 1080 - hh);
  const tr = `translate(960 540) scale(${zoom}) translate(${-cx} ${-cy})`;
  svg.querySelectorAll('.kamera').forEach(g => g.setAttribute('transform', tr));
}

// ---------- figurer ----------
// const f = await kit.figur('kaninen-kanel', { h: 281, forelder: lager.figurer })
// f.pose({ x, y, k, s, tilt, sx, sy, flip, delar: { 'arm-r': -60, 'leg-l': [10, 0, -20] },
//          ogon: 'open'|'happy'|'sleep'|'big', blink: 0..1, titt: -1..1, mun: 0..1, synlig })
// x, y = fötternas punkt i bild. s = skala (art → bild), annars h / bbox-höjd, gånger k.
// delar: grader runt vridpunkten, [grader, dx, dy] (dx/dy i 1024-rutan), eller (px, py) => transform-sträng.
async function figur(slug, opt = {}) {
  const F = FIGURER[slug], mapp = `${ROT}assets/karaktarer/${slug}/`;
  const rigg = await (await fetch(`${mapp}${F.namn}-rigg.json`)).json();
  const fot = [(F.bbox[0] + F.bbox[2]) / 2, F.bbox[3]];
  const skala = (opt.h || F.h || 352) / (F.bbox[3] - F.bbox[1]);
  const g = el('g', {}, opt.forelder || lager.figurer), inre = el('g', {}, g);
  const framfor = F.framfor || [], delar = {};
  const delEl = namn => (delar[namn] = bild(mapp + rigg.delar[namn].fil, inre));
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
    const le = el('path', { d: 'M-20 -5 Q0 14 20 -5', fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, pos);
    const oppen = el('g', {}, pos);
    el('path', { d: 'M-24 -12 Q0 -6 24 -12 Q22 18 0 18 Q-22 18 -24 -12Z', fill: '#5a2418', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, oppen);
    el('ellipse', { cx: 2, cy: 10, rx: 11, ry: 6, fill: '#e7898c' }, oppen);
    mun = { le, oppen, D: F.munForm === 'D' };
  }

  const f = { slug, F, g, inre, kropp, delar, fot, skala, rigg, ansikte };
  f.pose = (p = {}) => {
    const s = (p.s ?? skala) * (p.k ?? 1), flip = p.flip ? -1 : 1;
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x ?? 960} ${p.y ?? 905}) rotate(${p.tilt || 0}) scale(${s * flip * (p.sx ?? 1)} ${s * (p.sy ?? 1)}) translate(${-fot[0]} ${-fot[1]})`);
    for (const n in delar) {
      const v = p.delar?.[n] ?? 0, [deg, dx, dy] = Array.isArray(v) ? v : [v, 0, 0], [px, py] = rigg.delar[n].vridpunkt;
      delar[n].setAttribute('transform', typeof v === 'function' ? v(px, py) : `translate(${dx || 0} ${dy || 0}) rotate(${deg} ${px} ${py})`);
    }
    const lage = p.ogon || 'open', blink = lage === 'open' || lage === 'big' ? 1 - 0.92 * (p.blink || 0) : 1;
    const titt = clamp(p.titt || 0, -1, 1) * 9 * flip, stor = lage === 'big' ? 1.3 : 1;
    for (const o of ogon) {
      o.oppen.style.display = lage === 'open' || lage === 'big' ? '' : 'none';
      o.oppen.setAttribute('transform', `scale(${stor} ${stor * blink})`);
      o.pupill.setAttribute('cx', titt);
      o.glad.style.display = lage === 'happy' ? '' : 'none';
      o.sover.style.display = lage === 'sleep' ? '' : 'none';
    }
    if (mun) {
      const m = clamp(p.mun ?? 0);
      mun.le.style.display = !mun.D && m < 0.1 ? '' : 'none';
      mun.oppen.style.display = mun.D || m >= 0.1 ? '' : 'none';
      mun.oppen.setAttribute('transform', `scale(${mun.D ? 1 + 0.2 * m : 0.8}, ${mun.D ? 0.75 + 0.9 * m : m * 1.3})`);
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
  const k = w * 0.5 / 190 * 0.75 * ((f.F.h || 352) / 352);
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
  return [sida * (8 + 56 * upp) + Math.sin((t - topp) * 14 + Math.PI / 2) * 14 * upp * sida, -sida * 30 * upp, -45 * upp];
}

// ---------- kritsvep ----------
// k 0→0,5: kritklotter i nästa plats väggfärg fyller bilden från vänster; 0,5→1: suddas bort åt höger.
let svep;
function kritsvep(k, farg) {
  if (!svep) {
    svep = el('g', { filter: 'url(#kritkant)' }, lager.overst);
    let d = 'M-200 -150';
    for (let x = -200, i = 0; x < 2300; x += 75, i++) d += i % 2 ? ` L${x + 260} -150` : ` L${x} 1230`;
    svep.streck = el('path', { d, fill: 'none', 'stroke-width': 190, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svep);
    svep.ljus = el('path', { d, fill: 'none', 'stroke-width': 34, 'stroke-linecap': 'round', opacity: 0.18, stroke: '#fff', transform: 'translate(30 0)' }, svep);
    svep.L = svep.streck.getTotalLength();
    el('rect', { id: 'svep-sudd', x: 0, y: -300, width: 2600, height: 1700 }, el('clipPath', { id: 'svep-klipp' }, defs));
    svep.setAttribute('clip-path', 'url(#svep-klipp)');
  }
  svep.style.display = k > 0 && k < 1 ? '' : 'none';
  svep.streck.setAttribute('stroke', farg);
  for (const p of [svep.streck, svep.ljus]) {
    p.setAttribute('stroke-dasharray', `${svep.L} ${svep.L}`);
    p.setAttribute('stroke-dashoffset', svep.L * (1 - inUt(clamp(k * 2))));
  }
  document.getElementById('svep-sudd').setAttribute('x', -300 + 2600 * inUt(clamp(k * 2 - 1)));
}

// ---------- tider ur avsnittets egna filer ----------
// const M = await kit.manus();
// M.rad('Här kommer bussen') → { t, slut } i sångtid (slut = nästa rads start), ur rader.txt
// M.bild('05') → [start, slut] i avsnittstid, ur SHOTS i storyboard/bygg.py
// M.av = avsnittstid − sångtid (rader.txt: "Avsnittstid = sångtid + 8 s")
const AVSNITT = new URL('../', document.currentScript.src).href;
async function manus() {
  const [rader, bygg] = await Promise.all(['rader.txt', 'storyboard/bygg.py'].map(f => fetch(AVSNITT + f).then(r => r.text())));
  const tid = s => s.split(':').reduce((a, b) => a * 60 + +b, 0);
  const lista = [...rader.matchAll(/^(\d+:\d+(?:\.\d+)?)\s+(.+)$/gm)].map(m => ({ t: tid(m[1]), text: m[2] }));
  lista.forEach((r, i) => (r.slut = lista[i + 1]?.t ?? Infinity));
  const bilder = {};
  for (const m of bygg.matchAll(/\("(\w+)", "(\d+:\d+)(?:–(\d+:\d+))?"/g)) bilder[m[1]] = [tid(m[2]), tid(m[3] || m[2])];
  const av = +(rader.match(/sångtid \+ (\d+(?:[.,]\d+)?) s/)?.[1].replace(',', '.') ?? 0);
  const rad = (text, nr = 0) => {
    const r = lista.filter(r => r.text.toLowerCase().includes(text.toLowerCase()))[nr];
    if (!r) throw new Error(`Ingen rad med "${text}" i rader.txt`);
    return r;
  };
  const bild = id => { if (!bilder[id]) throw new Error(`Ingen bild ${id} i SHOTS`); return bilder[id]; };
  return { rader: lista, bilder, av, rad, bild };
}
// Beat-rutnätet i sang.m4a (librosa, 96 bpm). takt(s) = närmaste beat i sångtid.
const BEAT = 0.6254, BEAT0 = 16.04;
const takt = s => BEAT0 + Math.round((s - BEAT0) / BEAT) * BEAT;

// ---------- drivaren ----------
// kit.kor(render, DURATION, { sang: [från, till] }) – sätter window.render/seek/DURATION/ready/SANG.
// window.stilla = true stoppar loopen, så att render(t) kan anropas bild för bild (render.mjs gör det).
function kor(render, DURATION, opt = {}) {
  const ram = t => {
    render(t);
    const seed = Math.floor(t * 30 / 3) % 50 + 1;
    svg.querySelectorAll('.brus').forEach(b => b.setAttribute('seed', seed));
  };
  window.render = ram;
  window.seek = t => { window.stilla = true; ram(t); };
  window.DURATION = DURATION;
  window.SANG = opt.sang;
  window.ready = Promise.all(bilder.map(src => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = src; })));
  const start = performance.now();
  (function loop() { if (!window.stilla) ram(((performance.now() - start) / 1000) % DURATION); requestAnimationFrame(loop); })();
}

window.kit = { ROT, FIGURER, clamp, lerp, mjuk, inUt, del, el, bild, duk, kamera, figur, dorr, iFonster,
  hopp, vagga, snurr, blink, prat, vinka, kritsvep, manus, BEAT, BEAT0, takt, kor, get lager() { return lager; } };
})();
