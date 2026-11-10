// Kodscen-kit för avsnitt 016 Blinka lilla stjärna (kopierat från 015 2026-11-07; FIGURER och LJUDFILER bytta).
// takt() fäster på sångens uppmätta slag ur lager/matt.json SLAG. Nattkullen, Lage och Nicke är natt.js.
// Duken är storyboardens mått, 1376 × 768 (samma koordinater som storyboard/bygg.py); render.mjs renderar ändå 1920 × 1080.
// Läses in med <script src="../kit.js"></script> (vanligt skript, inte modul). Allt hamnar i window.kit.
const W = 1376, H = 768;
(() => {
const ROT = new URL('../../../', document.currentScript.src).href;   // repots rot
const NS = 'http://www.w3.org/2000/svg';
const INK = '#1d1d1d';

// Per figur: filnamn, bbox i 1024-rutan (fötterna = bboxens botten, mitt i x), standardhöjd i bild (px), ögon, mun (se 014:s kit.js).
const DJUROGON = [[414, 401], [605, 399]];
const FIGURER = {
  // ansiktet byts mot ansikten.js i natt.js (LAGE_ANS i bygg.py); ritade armar framför kroppen (007/014)
  'lejonet-lage': { namn: 'lejonet-lage', rigg: 'lejonet-lage-rigg-lemmar.json', bbox: [166, 88, 927, 929], h: 230, ogon: [[413, 401], [604, 398]], mun: [513, 522], munSkala: 1.2, framfor: ['arm-l', 'arm-r'] },
};
// ---------- små hjälpare ----------
const clamp = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k));
const lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = clamp(k), k * k * (3 - 2 * k));
const inUt = k => (k = clamp(k), k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const del = (a, b, t) => clamp((t - a) / (b - a));
// polish (animation-principles): ut = ease-out för det som kommer in, over = ease-out med litet överslag (landar med tyngd)
const ut = k => 1 - Math.pow(1 - clamp(k), 3);
const over = k => (k = clamp(k) - 1, 1 + 2.7 * k * k * k + 1.7 * k * k);
// scentiden för bilden som ritas (sätts av kor() före render), så att andning och kameradrift går av sig själva
let nu = 0, figurNr = 0, sang0 = 0;   // sang0: scenens början i sångtid, så att drift och andning går i sångtid (inga hopp i skarvarna)
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
  bild(`${AVSNITT}scener/lager/korn.png`, el('g', { opacity: 0.55, style: 'pointer-events:none' }, svg), { width: W, height: H });   // texturpasset: samma svaga korn över alla scener
  lager.overst = el('g', {}, svg);
  return lager;
}

// Kameran: punkten (cx, cy) hamnar mitt i bild, zoom ≥ 1. Hålls inom plattan.
// fri: true släpper gränsen (11a:s panorering upp över plattan, där kiosk-topp.png ligger ovanför).
function kamera(cx = W / 2, cy = H / 2, zoom = 1, fri = false) {
  // kameran svävar lite (aldrig helt still): 1,2 % inzoomad och en långsam drift på några px, inom plattan
  const ts = nu + sang0; zoom *= 1.012; cx += 4 * Math.sin(ts * 0.5); cy += 3 * Math.sin(ts * 0.37 + 1);
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
  // ritadeDelar: true (alla) eller en lista (Luddes ritade armar, utklippta ben)
  const ritad = n => rigg.ritadeDelar === true || (rigg.ritadeDelar || []).includes(n);
  if (Object.keys(rigg.delar).some(n => !ritad(n))) {   // ritade delar (verktyg/rita-lemmar.py) har runda toppar och behöver ingen mask
    mask = `ledmask-${slug}-${Math.random().toString(36).slice(2, 7)}`;
    if (!defs.querySelector('#kroppsilhuett')) defs.insertAdjacentHTML('beforeend', `
      <filter id="kroppsilhuett" x="0" y="0" width="1" height="1">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
      </filter>`);
    const m = el('mask', { id: mask, maskUnits: 'userSpaceOnUse', x: -400, y: -400, width: 1824, height: 1824 }, defs);
    el('rect', { x: -400, y: -400, width: 1824, height: 1824, fill: '#fff' }, m);
    bild(mapp + rigg.kropp, m, { filter: 'url(#kroppsilhuett)' });
  }
  const delEl = namn => (delar[namn] = bild(mapp + rigg.delar[namn].fil, inre, { ...(mask && !ritad(namn) ? { mask: `url(#${mask})` } : {}) }));
  for (const n in rigg.delar) if (!framfor.includes(n)) delEl(n);
  const kropp = el('g', {}, inre);
  bild(mapp + rigg.kropp, kropp);
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

  const f = { slug, F, g, inre, kropp, delar, fot, skala, rigg, ansikte }, fas = (figurNr++ * 0.618) % 1;
  f.pose = (p = {}) => {
    const s = (p.s ?? skala) * (p.k ?? 1), flip = p.flip ? -1 : 1;
    // andning: alla figurer andas lugnt (2,8 s), var och en i sin egen fas, från fötterna; andas: 0 stänger av
    const andas = Math.sin(2 * Math.PI * ((nu + sang0) / 2.8 + fas)) * (p.andas ?? 1), asx = 1 - 0.008 * andas, asy = 1 + 0.015 * andas;
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x ?? W / 2} ${p.y ?? H * 0.85}) rotate(${p.tilt || 0}) scale(${s * flip * (p.sx ?? 1) * asx} ${s * (p.sy ?? 1) * asy}) translate(${-fot[0]} ${-fot[1]})`);
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
  // samma punkt i bildrutan, med kameran (för det som ligger i lager.overst, utanför kameran)
  f.skarm = ([ax, ay]) => { const pt = new DOMPoint(ax, ay).matrixTransform(lager.overst.getCTM().inverse().multiply(g.getCTM())); return [pt.x, pt.y]; };
  f.pose();
  return f;
}

// Kameran som crop_zoom() i bygg.py: [mitt x, mitt y, bredd] (matt.json KAMERA: hel, tva, nar, halv, fotter)
const utsnitt = ([cx, cy, w], fri = false) => window.kit.kamera(cx, cy, W / w, fri);   // via window.kit så att mjukaKlipp fångar den

// ---------- rörelse ----------
// Hopp från t0 till t1 (i luften), med squash före och efter. Ger { y (uppåt negativt), sx, sy, luft 0..1, ben }.
function hopp(t, t0, t1, h, forb = 0.12, efter = 0.18) {
  let y = 0, sx = 1, sy = 1, ben = 0;
  if (t > t0 - forb && t < t0) { const q = Math.sin(del(t0 - forb, t0, t) * Math.PI / 2); sx = 1 + 0.08 * q; sy = 1 - 0.1 * q; y = 4 * q; }   // hukar före
  else if (t >= t0 && t <= t1) {
    const k = del(t0, t1, t); y = -4 * h * k * (1 - k);
    const v = 1 - 2 * k;                         // fart uppåt, -1..1
    sy = 1 + 0.07 * Math.abs(v) * (h > 40 ? 1 : 0.4); sx = 2 - sy; ben = Math.sin(k * Math.PI);
  } else if (t > t1 && t < t1 + efter * 1.8) {   // landar: trycks ihop och studsar tillbaka en liten bit (efterstuds)
    const d = del(t1, t1 + efter * 1.8, t), q = 1.3 * Math.sin(2 * Math.PI * d) * (1 - d); sx = 1 + 0.09 * q; sy = 1 - 0.11 * q;
  }
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
  const upp = over(del(a, a + 0.4, t)) * mjuk(del(b, b - 0.35, t));   // armen svingar upp med litet överslag
  return [sida * (10 + 100 * upp) + Math.sin((t - topp) * 13 + Math.PI / 2) * 24 * upp * sida, -sida * 45 * upp, -70 * upp, 1 + 0.35 * upp];
}
// Ritade armar (ritadeDelar) sitter fast i axeln: de vrids och sträcks men flyttas aldrig ut från kroppen, annars svävar de i luften.
const fastArm = (rigg, n, [deg, dx, dy, sk]) => (rigg.ritadeDelar === true || (rigg.ritadeDelar || []).includes(n)) && n.startsWith('arm') ? [deg, 0, 0, sk] : [deg, dx, dy, sk];
// Ben i ett hopp: ben 0..1 (hopp().ben). Fötterna dras upp och vinklas utåt, så de inte ser fastlimmade ut.
const benHopp = ben => ({ 'leg-l': [-30 * ben, 0, -34 * ben], 'leg-r': [30 * ben, 0, -34 * ben] });

// ---------- tider ur avsnittets egna filer ----------
// const M = await kit.manus();
// M.rad('Brum brum brum') → { t, slut } i sångtid (slut = nästa rads start), ur rader.txt ("0:35.0≈" läses också)
// M.rad(text, nr) = den nr:te raden med texten; M.rad(text, { efter: sångtid }) = den första som börjar då eller senare (refrängerna)
// M.bild('06') → [start, slut] i avsnittstid, ur SHOTS i storyboard/bygg.py, som lager/gor-lager.py skriver till lager/matt.json
// M.av = avsnittstid − sångtid (INTRO, 11 s). Sången klipps aldrig: scenens sångbit = [start − M.av, slut − M.av]
// M.matt = hela matt.json (GOLV, LH/FH/MH, FAR_X …, KAMERA, LUDDE_ANS, FOT, HAND, TUSSAR, FARG)
const AVSNITT = new URL('../', document.currentScript.src).href, MATT = new URL('lager/matt.json', document.currentScript.src).href;
async function manus() {
  const [rader, matt] = await Promise.all([fetch(AVSNITT + 'rader.txt').then(r => r.text()), fetch(MATT).then(r => r.json())]);
  const tid = s => s.split(':').reduce((a, b) => a * 60 + +b, 0);
  const lista = [...rader.matchAll(/^(\d+:\d+(?:\.\d+)?)≈?\s+(.+)$/gm)].map(m => ({ t: tid(m[1]), text: m[2] }));
  lista.forEach((r, i) => (r.slut = lista[i + 1]?.t ?? Infinity));
  const rad = (text, nr = 0) => {
    const norm = s => s.toLowerCase().replace(/[^a-zåäö0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();   // skiljetecken och parenteser räknas inte
    const alla = lista.filter(r => norm(r.text).includes(norm(text)));
    const r = typeof nr === 'object' ? alla.find(r => r.t >= nr.efter) : alla[nr];
    if (!r) throw new Error(`Ingen rad med "${text}" i rader.txt`);
    return r;
  };
  const bild = id => { if (!matt.bilder[id]) throw new Error(`Ingen bild ${id} i matt.json`); return matt.bilder[id]; };
  SLAG = matt.SLAG || [];
  if (EN) await laddaKarta();
  return { rader: lista, bilder: matt.bilder, av: matt.INTRO, rad, bild, matt };
}
// ---------- engelska versionen (?en), som 005 och 007 ----------
// Scenerna räknar som vanligt i den svenska tagningens tider. Med ?en i adressen (render.mjs --en) gör kor() om scenen till den
// engelska tagningen (en/sang.m4a): en styckvis linjär karta svensk sångtid → engelsk sångtid ur paren i ../en/rader.txt
// ("M:SS.s … [sv M:SS.s]"). Två par med samma engelska tid är ett hopp (bilden klipper, effekterna emellan tas bort).
// render(t), kit.nu, takt() och SLAG räknar fortfarande i svensk tid. Utan ?en är allt som förut.
const EN = new URLSearchParams(location.search).has('en');
let KARTA = null;   // [[sv, en], …], sv stigande, en stigande eller lika (hopp)
async function laddaKarta() {
  const txt = await fetch(AVSNITT + 'en/rader.txt').then(r => r.text());
  const tid = s => s.split(':').reduce((a, b) => a * 60 + +b, 0);
  KARTA = [...txt.matchAll(/^(\d+:\d+(?:\.\d+)?)≈?\s.*\[sv (\d+:\d+(?:\.\d+)?)\]\s*$/gm)].map(m => [tid(m[2]), tid(m[1])]);
  KARTA.forEach((p, i) => { if (i && (p[0] <= KARTA[i - 1][0] || p[1] < KARTA[i - 1][1])) throw new Error(`en/rader.txt: tiderna stiger inte vid ${p}`); });
}
// styckvis linjärt från kolumn a till kolumn b; lutning 1 utanför
const kartlagd = (a, b) => s => {
  const K = KARTA, i = K.findIndex(p => p[a] > s);
  if (i === 0) return s - K[0][a] + K[0][b];
  if (i < 0) return s - K.at(-1)[a] + K.at(-1)[b];
  const [p, q] = [K[i - 1], K[i]];
  return p[b] + (s - p[a]) * (q[b] - p[b]) / (q[a] - p[a]);
};
const svTillEn = s => kartlagd(0, 1)(s), enTillSv = s => kartlagd(1, 0)(s);
const iHopp = s => KARTA.some((p, i) => i && p[1] === KARTA[i - 1][1] && s > KARTA[i - 1][0] && s < p[0]);   // svensk tid som hoppas över
// Takten i sang.m4a (BEAT är en platshållare tills SLAG finns). takt() fäster på närmaste uppmätta slag (matt.json SLAG, librosa på slagverket,
// gor-lager.py) när manus() har läst dem. BEAT och BEAT0 är ett rakt rutnät (för gung i fas, inte för ord).
const BEAT = 0.672, BEAT0 = 0.28;
let SLAG = [];
const takt = s => SLAG.length ? SLAG.reduce((a, b) => Math.abs(b - s) < Math.abs(a - s) ? b : a) : BEAT0 + Math.round((s - BEAT0) / BEAT) * BEAT;


// Boil: förskjutning i px och hur många bilder (av 30/s) mellan varje ny seed.
const BOIL = { skala: 2.5, bilder: 4 };   // 2,5 i 1376-duken = 3,5 px i 1920

// ---------- drivaren ----------
// Mjuka klipp (Sanna, 2026-11-05: "no abrupt cuts or jagged motions"): kit.kor(kit.mjukaKlipp(render, [t1, t2, …]), …).
// Vid varje gräns där bilden byter kameraläge glider kameran på d s från förra bildens läge till det nya, i stället för att hoppa.
// Förra läget räknas genom att rendera bildrutan strax före gränsen med kit.kamera fångad (render ska vara en ren funktion av t).
function mjukaKlipp(render, granser, d = 0.9) {
  const fore = new Map(), riktig = () => window.kit.kamera;
  const fanga = t => {
    const k0 = riktig(); let k = [W / 2, H / 2, 1];
    window.kit.kamera = (cx = W / 2, cy = H / 2, z = 1, fri = false) => { k = [cx, cy, z, fri]; };
    try { render(t); } finally { window.kit.kamera = k0; }
    return k;
  };
  return t => {
    const b = granser.find(b => t >= b && t < b + d);
    if (b === undefined) return render(t);
    if (!fore.has(b)) fore.set(b, fanga(b - 1e-3));
    const [x0, y0, z0, f0] = fore.get(b), q = inUt((t - b) / d), k0 = riktig();
    window.kit.kamera = (cx = W / 2, cy = H / 2, z = 1, fri = false) => k0(lerp(x0, cx, q), lerp(y0, cy, q), lerp(z0, z, q), fri || f0);
    try { render(t); } finally { window.kit.kamera = k0; }
  };
}

// kit.kor(render, DURATION, { sang: [från, till] }) – sätter window.render/seek/DURATION/ready/SANG.
// window.stilla = true stoppar loopen, så att render(t) kan anropas bild för bild (render.mjs gör det).
// ---------- ljud ----------
// kit.ljud(namn, t, { vol, variant, loop, langd, fade }) lägger en ljudeffekt på scentid t (anropas när scenen byggs,
// inte per bild). render.mjs mixar dem under sångbiten. vol 1 = effektnivån (−8 dB under sången).
// Variant väljs i tur och ordning om den inte anges, så att upprepade tut inte låter likadant.
// loop: filen upprepas tills langd (s) har gått; langd utan loop kortar ljudet. fade = uttoning i slutet (s).
// Ljud som inte finns än listas ändå (fil: null) och blir tysta.
// 016: ljuden i ../ljud.md (antal tagningar i assets/ljud/effekter/<namn>/). 0 = finns inte än (tyst platshållare): syrsor, gasp.
const LJUDFILER = { 'skrrrrt-kort': 4, 'skrrrrt-lang': 4, swoosh: 4, pling: 4, glimt: 2, glitter: 4, 'prassel-tyg': 1, steg: 4,
  plopp: 1, pop: 4, puff: 3, 'krita-ritar': 2, oj: 0, syrsor: 1, gasp: 2, sus: 1, fladder: 4,
  uggla: 3, lysmask: 2, maansken: 2, tindra: 2, 'godnatt-pling': 1, korg: 1, 'nalle-hopp': 2, 'lagga-sig': 1, smasteg: 2, gaspning: 1, slurp: 2 };
const ljudLista = [], ljudTur = {};
function ljud(namn, t, { vol = 1, variant, loop = false, langd, fade = 0.3, fadeIn, fil } = {}) {   // fil: egen fil (t.ex. en replik i assets/ljud/roster/), som 015
  const n = LJUDFILER[namn] || 0;
  if (n && variant == null) variant = (ljudTur[namn] = ((ljudTur[namn] ?? -1) + 1) % n) + 1;
  ljudLista.push({ namn, t: +t.toFixed(3), vol, variant: n ? variant : null, loop, langd, fade, fadeIn,
    fil: fil ?? (n ? `assets/ljud/effekter/${namn}/${namn}-${variant}.m4a` : null) });
}

function kor(render, DURATION, opt = {}) {
  let tSv = t => t;
  if (EN) {   // scenens tid t (engelsk) → svensk scentid; ljuden flyttas med, de i ett hopp tas bort
    if (!KARTA || !opt.sang) throw new Error('?en: scenen måste läsa kit.manus() och ange { sang } i kor()');
    const s0 = opt.sang[0], e0 = svTillEn(s0);
    tSv = t => enTillSv(e0 + t) - s0;
    for (let i = ljudLista.length - 1; i >= 0; i--) {
      const c = ljudLista[i];
      if (iHopp(s0 + c.t)) ljudLista.splice(i, 1); else c.t = +(svTillEn(s0 + c.t) - e0).toFixed(3);
    }
    DURATION = svTillEn(s0 + DURATION) - e0;
    opt = { ...opt, sang: [e0, svTillEn(opt.sang[1])] };
  }
  sang0 = opt.sang ? opt.sang[0] : 0;
  const ram = t => {
    nu = tSv(t);
    render(nu);
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

window.kit = { mjukaKlipp, ROT, W, H, FIGURER, clamp, lerp, mjuk, inUt, ut, over, del, el, bild, duk, kamera, utsnitt, figur,
  hopp, vagga, snurr, blink, prat, vinka, fastArm, benHopp, manus, BEAT, BEAT0, takt, kor, EN, svTillEn, enTillSv,
  ljud, LJUDFILER, BOIL, get lager() { return lager; }, get nu() { return nu; }, get sang0() { return sang0; } };
})();
