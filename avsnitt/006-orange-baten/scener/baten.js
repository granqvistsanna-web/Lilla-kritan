// Orange båten med Dinon Disa i, som båten() i storyboard/bygg.py (efter 005:s bilen.js). Vanligt skript efter kit.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../ansikten.js"></script><script src="../baten.js"></script>
//
//   const b = await baten.ny(parent, { vit: true, kontur: true });
//   b.pose({ x, y, h, tilt, gung,               // x = mitten, y = skrovets underkant, h = hela bildens höjd (som place() i bygg.py)
//            humor, titt, tittY, blink,          // Disas ansikte (ansikten.js)
//            r: [x, y], l: [x, y],              // en punkt i Disas 1024-ruta som armen pekar mot (utan: armen vilar på relingen)
//            rot, lyft, kontur })               // rot = Disa lutar (grader), lyft = Disa högre i båten, kontur = den mörkorange konturen
//   b.punkt([px, py]) → var en punkt i Disas 1024-ruta hamnar i bild (efter pose)
//   baten.vagor(parent, y0) → { rita(t, fart) } vattnet med vita vågkammar framför skrovets nederkant
// Lagren bakifrån: bortre relingen, flaggan och motorn → Disa (kroppen, västen, ansiktet, armarna framför) → skrovet → konturen.
// Bilderna ligger i lager/ (gor-lager.py tar ut dem ur storyboarden, platshållarna i kod tills assets finns).
(() => {
const { el, bild, ROT, W, H } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const TOPP = 300, DISA_K = 0.6, DISA_X = 520, DISA_Y = 700;   // bygg.py: Disas (512, 926) på båtens (520, 700), skala 0,6
const BB = [21, 236, 992, 807];                                 // hela båten med Disa i vila, i båtens 1024-ruta (utan TOPP)
// armarnas vridpunkt och vilans riktning (grader, y nedåt) ur dinon-disa-rigg-lemmar.json: de ritade armarna hänger rakt ner
const PIV = { r: [765, 545], l: [252, 545] }, VILA = { r: 90, l: 90 }, ARM_K = 1;
let n = 0;

function filtren(defs) {
  if (defs.querySelector('#vitkant')) return;
  defs.insertAdjacentHTML('beforeend', `
    <!-- vita klistermärkeskanter med kritkänsla (Sanna, 2026-11-05: "polish white outlines but keep crayon feel"): ojämn kant och lite korn -->
    <filter id="vitkant" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="b"/>
      <feDisplacementMap in="d" in2="b" scale="7" result="dd"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.24" numOctaves="1" seed="2" result="k"/>
      <feColorMatrix in="k" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 2.0" result="kk"/>
      <feComposite in="kk" in2="dd" operator="in" result="vit"/>
      <feMerge><feMergeNode in="vit"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="vitflagg" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="b"/>
      <feDisplacementMap in="d" in2="b" scale="6" result="dd"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.24" numOctaves="1" seed="2" result="k"/>
      <feColorMatrix in="k" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 2.0" result="kk"/>
      <feComposite in="kk" in2="dd" operator="in" result="vit"/>
      <feMerge><feMergeNode in="vit"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="vitfagel" x="-15%" y="-15%" width="130%" height="130%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="26" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="7" result="b"/>
      <feDisplacementMap in="d" in2="b" scale="24" result="dd"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.064" numOctaves="1" seed="2" result="k"/>
      <feColorMatrix in="k" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 2.0" result="kk"/>
      <feComposite in="kk" in2="dd" operator="in" result="vit"/>
      <feMerge><feMergeNode in="vit"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="vitarm" x="-30%" y="-30%" width="160%" height="160%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="b"/>
      <feDisplacementMap in="d" in2="b" scale="5" result="dd"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves="1" seed="2" result="k"/>
      <feColorMatrix in="k" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 2.0" result="kk"/>
      <feComposite in="kk" in2="dd" operator="in" result="vit"/>
      <feMerge><feMergeNode in="vit"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`);
}

// Vinkeln (SVG, medurs) som riktar armen mot punkten p i Disas 1024-ruta
const peka = (s, p) => Math.atan2(p[1] - PIV[s][1], p[0] - PIV[s][0]) * 180 / Math.PI - VILA[s];

// Disa på egna ben eller i båten: kit.figur med västen och ansikten.js. Armarna framför kroppen, förlängda, med vit kant.
async function disa(parent, opt = {}) {
  filtren(document.querySelector('svg defs'));
  const f = await kit.figur('dinon-disa', { forelder: parent, ...opt });
  bild(`${LAGER}vast.png`, f.kropp);
  const a = ansikten.iFigur(f);
  for (const s of 'rl') f.delar[`arm-${s}`].setAttribute('filter', 'url(#vitarm)');
  const pose0 = f.pose;
  f.pose = (p = {}) => {
    const delar = { ...(p.delar || {}) };
    for (const s of 'rl') delar[`arm-${s}`] = [p[s] ? peka(s, p[s]) : (p.ben === false ? 0 : 0), 0, 0, ARM_K];
    if (p.ben === false) { delar['leg-l'] = (px, py) => 'scale(0)'; delar['leg-r'] = delar['leg-l']; }
    pose0({ ...p, delar });
    a.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink || 0 });
  };
  f.pose();
  return f;
}

async function ny(parent, { vit = false, kontur = false } = {}) {
  filtren(document.querySelector('svg defs'));
  const id = `bat${++n}`;
  const g = el('g', { id }, parent), inre = el('g', vit ? { filter: 'url(#vitkant)' } : {}, g);
  bild(`${LAGER}insida.png`, inre).setAttribute('filter', 'url(#vitflagg)');   // tydligare vit kant runt flaggan (Sanna, 2026-11-05)
  // båtens botten i urtaget bakom Disa (insida.png är bara bortre relingen, så vattnet syntes under henne när hon hoppar och lutar)
  el('path', { d: 'M200 600H880V720H200Z', fill: '#C65A1E' }, inre);
  const dg = el('g', {}, inre);
  const d = await disa(dg, { s: DISA_K });
  bild(`${LAGER}skrov.png`, inre);
  const konturEl = kontur ? bild(`${LAGER}bat-kontur.png`, inre, { y: -TOPP, height: 1024 + TOPP }) : null;
  const fot = [(BB[0] + BB[2]) / 2, BB[3]];
  const b = { id, g, disa: d };
  b.pose = (p = {}) => {
    const s = (p.h ?? 470) / (BB[3] - BB[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    if (konturEl) konturEl.style.display = p.kontur === false ? 'none' : '';
    g.setAttribute('transform', `translate(${p.x ?? 459} ${p.y ?? 735}) rotate(${p.tilt || 0}) scale(${s * (p.flip ? -1 : 1)} ${s}) translate(${-fot[0]} ${-fot[1]})`);
    dg.setAttribute('transform', `rotate(${-(p.rot || 0)} ${DISA_X} ${DISA_Y - 60})`);
    d.pose({ ...p, x: DISA_X + (573.5 - 512) * DISA_K, y: DISA_Y - (p.lyft || 0), s: DISA_K, ben: false, tilt: 0, k: 1, h: undefined, synlig: true });
  };
  b.punkt = pt => d.punkt(pt);
  b.skarm = pt => d.skarm(pt);
  b.pose();
  return b;
}

// Vatten framför skrovets nederkant: en blå yta med en vit vågkam som rör sig åt vänster (fart px/s).
function vagor(parent, y0, { x0 = -40, x1 = W + 40, farg = '#56A8D6' } = {}) {
  const g = el('g', {}, parent);
  const yta = el('path', { fill: farg }, g), kam = el('path', { fill: 'none', stroke: '#E6F5FC', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  return {
    g,
    rita(t, fart = 120, y = y0) {
      let d = '';
      for (let x = x0; x <= x1; x += 12) d += `${d ? 'L' : 'M'}${x} ${(y + 6 * Math.sin((x + fart * t) / 38) + 2 * Math.sin(t * 3)).toFixed(1)} `;
      kam.setAttribute('d', d);
      yta.setAttribute('d', d + `L${x1} ${H + 20} L${x0} ${H + 20}Z`);
    },
  };
}

// Vita vågbågar på vattnet som glider åt vänster (körscenen). Ritas över plåten, under båten.
function bagar(parent, { y0 = 440, n = 46, seed = 3 } = {}) {
  const g = el('g', { opacity: 0.85 }, parent), rnd = (s => () => (s = (s * 9301 + 49297) % 233280) / 233280)(seed);
  const b = Array.from({ length: n }, () => {
    const y = y0 + rnd() * (H - y0), r = 14 + (y - 430) / 14;
    return { x: rnd() * W, r, el: el('path', { d: `M${-r} 0 Q0 ${-r * 0.55} ${r} 0`, fill: 'none', stroke: '#D7EEF8', 'stroke-width': 4, 'stroke-linecap': 'round', transform: '' }, g), y };
  });
  return { g, rita(t, fart = 120) { b.forEach(o => o.el.setAttribute('transform', `translate(${(((o.x - fart * t * (0.4 + (o.y - 430) / 500)) % (W + 80)) + W + 80) % (W + 80) - 40} ${o.y})`)); } };
}

// Öar som glider förbi på horisonten (Sanna, 2026-11-05: "to show that boat is traveling forward add some island or stuff in bg").
// Kritbilder i assets/bakgrunder/sjon-saker/ (rekvisita/oar.md, segelbat.md): gröna kullar med runda träd och en liten segelbåt.
// Inget orange: det är det barnet letar efter. Längre bort = långsammare (parallax). Läggs i plattan före bagar(), så att
// vågbågarna ligger framför.
//   const o = baten.oar(L.plate);   o.rita(s, t)   // s = sträckan vattnet har glidit (px, samma som bagar), t = tiden (gupp)
const SAKER = `${ROT}assets/bakgrunder/sjon-saker/`;
const ISLAR = [   // bild, x, bredd i bild (px), höjd/bredd för bilden, parallax (andel av vattnets fart); höjderna som de gamla kodöarna
  { fil: 'o-stor', x: 1050, w: 315, a: 0.555, d: 0.42 },
  { fil: 'o-liten', x: 1700, w: 130, a: 0.754, d: 0.3 },
  { fil: 'o-mellan', x: 2350, w: 270, a: 0.533, d: 0.36 },
  { fil: 'segelbat', x: 650, w: 100, a: 1.013, d: 0.34, gupp: true },
], OAR_VARV = W + 1300;
function oar(parent, { y0 = 448 } = {}) {
  const g = el('g', {}, parent);
  const ar = ISLAR.map(o => {
    const og = el('g', {}, g), h = o.w * o.a;
    bild(`${SAKER}${o.fil}.png`, og, { x: -o.w / 2, y: 8 - h, width: o.w, height: h });   // bildens nederkant 8 px under horisonten
    el('path', { d: `M${-o.w * 0.55} 6 Q${-o.w * 0.27} 1 0 6 T${o.w * 0.55} 6`, fill: 'none', stroke: '#E6F5FC', 'stroke-width': 5, 'stroke-linecap': 'round' }, og);   // vågkammen vid stranden
    return { o, og };
  });
  return {
    g,
    rita(s = 0, t = 0) {
      ar.forEach(({ o, og }, i) => {
        const x = (((o.x - s * o.d) % OAR_VARV) + OAR_VARV) % OAR_VARV - 450;
        og.setAttribute('transform', `translate(${x.toFixed(1)} ${(y0 + (o.gupp ? 1.5 * Math.sin(t * 1.7 + i) : 0)).toFixed(1)})`);
      });
    },
  };
}

// Mjuka vita kritmoln på himlen (Sanna, 2026-11-05: "maybe some clouds in sky?"), rekvisita/moln.md. De driver sakta åt vänster
// av sig själva och lite till när båten kör (parallax, långt bort = långsammare än öarna). Läggs i plattan, före oar().
//   const m = baten.moln(L.plate);   m.rita(s, t)   // samma s och t som oar()
const MOLN = [   // bild, x, y (molnets mitt), bredd i bild (px), höjd/bredd, parallax, egen drift (px/s)
  { fil: 'moln-1', x: 300, y: 120, w: 330, a: 0.571, d: 0.08, v: 5 },
  { fil: 'moln-2', x: 900, y: 70, w: 240, a: 0.567, d: 0.06, v: 4 },
  { fil: 'moln-3', x: 1250, y: 210, w: 170, a: 0.575, d: 0.1, v: 6 },
], MOLN_VARV = W + 500;
function moln(parent) {
  const g = el('g', {}, parent);
  const m = MOLN.map(o => {
    const og = el('g', {}, g), h = o.w * o.a;
    bild(`${SAKER}${o.fil}.png`, og, { x: -o.w / 2, y: -h / 2, width: o.w, height: h });
    return { o, og };
  });
  return {
    g,
    rita(s = 0, t = 0) {
      m.forEach(({ o, og }) => {
        const x = (((o.x - s * o.d - t * o.v) % MOLN_VARV) + MOLN_VARV) % MOLN_VARV - 250;
        og.setAttribute('transform', `translate(${x.toFixed(1)} ${o.y})`);
      });
    },
  };
}

// Orange fågeln, måsen från sidan med nosen åt höger (assets/bakgrunder/sjon-saker/fagel/, rekvisita/fagel-orange.md).
// Samma pose som den gamla nyFagel() i sjon-2, så scenerna byter bara ut den:
//   const fagel = await baten.fagel(L.figurer);
//   fagel.pose(x, y, h, t, { tilt, synlig, flip, flax, blink })   // x = mitten, y = underkant, h = höjd; flip = flyger åt vänster
// flax: vingens läge 1 (uppe) … 0,3 (nästan rakt ut); utan flax flaxar den av sig själv ca 2 slag/s. Vingen går aldrig ner under
// kroppen: utan vinge ovanför ser måsen ut som en fisk. Ögat är ansikten.js:s (blink 0..1).
const FAGEL_OGA = [742, 640], FAGEL_MUN = [770, 712];   // ögat (en bit bakom näbben, större än riggens) och leendet i bildens 1024-ruta
const VINGE2 = [-70, -25, 0.8];   // den bortre vingens förskjutning i bildens 1024-ruta och ljushet (som fågel() i bygg.py)
async function fagel(parent) {
  const mapp = `${SAKER}fagel/`, rigg = await (await fetch(`${mapp}fagel-rigg.json`)).json();
  const [bx0, , bx1, by1] = rigg.bbox, [, py] = rigg.delar.vinge.vridpunkt;
  filtren(document.querySelector('svg defs'));
  const g = el('g', {}, parent), inre = el('g', { transform: `translate(${-(bx0 + bx1) / 2} ${-by1})`, filter: 'url(#vitfagel)' }, g);   // tjock vit klistermärkeskant
  // två vingar (Sanna, 2026-11-05: "bird needs 2 wings"): den bortre en bit bakåt och uppåt, mörkare, flaxar en aning efter
  const bortre = bild(mapp + rigg.delar.vinge.fil, el('g', { transform: `translate(${VINGE2[0]} ${VINGE2[1]})` }, inre));
  bortre.style.filter = `brightness(${VINGE2[2]})`;
  const vinge = bild(mapp + rigg.delar.vinge.fil, inre);
  bild(mapp + rigg.kropp, inre);
  // ansiktet (Sanna, 2026-11-05: "add face to bird"): ögat och ett litet leende under näbbens rot, som fågel() i bygg.py
  const oga = ansikten.bygg(inre, { ogon: [FAGEL_OGA], ogonSkala: 1.45, mun: FAGEL_MUN, munSkala: 1.5 });
  return {
    g,
    pose(x, y, h, t, { tilt = 0, synlig = true, flip = false, flax, blink = 0, humor = 'glad' } = {}) {
      g.style.display = synlig ? '' : 'none';
      if (!synlig) return;
      // lugna vingslag, ca 1,3 per sekund (Sanna: "polish the bird flying"), inte ända ner
      const k = flax ?? 0.45 + 0.55 * (1 + Math.cos(t * Math.PI * 2.6)) / 2;
      const k2 = flax ?? 0.45 + 0.55 * (1 + Math.cos((t - 0.08) * Math.PI * 2.6)) / 2;
      vinge.setAttribute('transform', `translate(0 ${py}) scale(1 ${k}) translate(0 ${-py})`);
      bortre.setAttribute('transform', `translate(0 ${py}) scale(1 ${k2}) translate(0 ${-py})`);
      oga.satt(humor, { titt: 0.5, blink });
      g.setAttribute('transform', `translate(${x} ${y}) rotate(${tilt}) scale(${(flip ? -1 : 1) * h / (by1 - rigg.bbox[1])} ${h / (by1 - rigg.bbox[1])})`);
    },
  };
}

window.baten = { ny, disa, vagor, bagar, oar, moln, fagel, peka, TOPP, DISA_K, DISA_X, DISA_Y, BB };
})();
