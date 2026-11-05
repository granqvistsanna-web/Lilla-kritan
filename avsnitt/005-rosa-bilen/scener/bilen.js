// Rosa bilen med musen Mille i, som bilen() i storyboard/bygg.py. Vanligt skript efter kit.js och ../ansikten.js:
//   <script src="../kit.js"></script><script src="../ansikten.js"></script><script src="../bilen.js"></script>
//
//   const bil = bilen.ny(kit.lager.figurer, { vit: true, kontur: true, mus: true });
//   bil.pose({ x, y, h, tilt, sx, sy, dist,                   // x, y = hjulens underkant i mitten, h = hela bildens höjd (som place() i bygg.py)
//              humor: 'skrattar', titt, tittY, blink, m,      // musens ansikte (ansikten.js: glad skrattar ropar forvanad nyfiken skelogd njuter slickar karleksfull blinkar ledsen)
//              arm_r: 145, arm_l: 'kant',                     // vinkel (0 ner, 90 ut, 180 upp) eller 'kant' (standard): i bilen håller båda tassarna ratten (framifrån,
//                                                             // klockan 10 och 2); en arm uppe: den tassen släpper, den andra kvar; båda uppe: ingen ratt. 'styra' = 'kant'.
//              fram: 'r',                                     // armar framför kroppen (tassen på ratten ligger alltid framför)
//              rot: 7,                                        // musen lutar (grader, positivt = bakåt mot vänster, som bygg.py)
//              glass: { s: 'r', typ: 'berg' },              // en glass i tassen: typ rosa (standard), berg, strut, gul, gron; hand: [x, y] för en annan tass-punkt
//              armFlytt: { r: [dx, dy] }, lyft: dy })        // flytta en arm (knytnävarna rullar), lyft musen i bilen (hopp ur)
//   pose tar också vit: true/false (den vita kanten) och kontur: true (visa konturen) per bildruta.
//   bil.puffa(t, tider)   vita avgaspuffar ur avgasröret, tre per tid (efter pose)
//   bil.musPunkt([px, py]) → var en punkt i musens 1024-ruta hamnar i bild (efter pose), t.ex. nosen [509, 418]
//   bil.g är gruppen; bil.id kan användas med <use href="#id"> för kopior (refrängens mönster).
// Lagren bakifrån: kaross → musens bakre armar och kropp med ansiktet → kant → konturen → armarna framför → hjulen.
// Bilens mått (1024-rutan): hela bilden med musen i vila går från y 37 (huvudet) till 843 (hjulen), x 74–951; med den vita kanten 7 px till.
(() => {
const { el, bild, ROT, musArm, musHand } = kit;
const NS = 'http://www.w3.org/2000/svg';
const BIL = `${ROT}assets/rekvisita/rosa-bilen/`, MUS = `${ROT}assets/karaktarer/musen-mille/`;
const LAGER = new URL('lager/', document.currentScript.src).href;
const MUS_K = 0.62, MUS_X = 523, MUS_Y = 545;        // musen i bilen: hennes (512, 926) på bilens (523, 545), skala 0,62 (bygg.py)
const VRID = [MUS_X, MUS_Y - 60];                   // hon lutar runt den här punkten
const HJUL = { bakhjul: [282, 726], framhjul: [744, 728] }, HJUL_R = 115;
const AXEL = kit.MUS_AXEL, ARMFIL = s => `${MUS}lemmar/musen-mille-arm-${s}.png`;
const GLASS = { rosa: `${ROT}assets/rekvisita/jordgubbsglass.png`, berg: `${ROT}assets/rekvisita/cut/jordgubbsglass-glassberg.png`,
  strut: `${LAGER}strut.png`, gul: `${LAGER}glass-gul.png`, gron: `${LAGER}glass-gron.png` };
const GLASS_H = { rosa: 743, berg: 940, strut: 743, gul: 743, gron: 743 }, GLASS_W = { rosa: 431, berg: 434, strut: 431, gul: 431, gron: 431 };
const GH = 250;                                      // glassens höjd i musens ruta (bygg.py)
let n = 0;

function filtren(defs) {
  if (defs.querySelector('#vitkant')) return;
  Object.values(GLASS).forEach(u => bild(u, defs));   // glassarna byts med href: läs in dem i förväg (i defs syns de inte)
  defs.insertAdjacentHTML('beforeend', `
    <filter id="vitkant" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="d"/>
      <feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="svart" x="0" y="0" width="1" height="1"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter>`);
}

// Musen (utan ben) i sin 1024-ruta: armar bakom, kropp, ansikte, armar framför. Används i bilen och av musen.ny nedan.
const PAW = '#F2B3BB', RATT_T = 'translate(505 776) scale(1.613 1.484)';   // ratten framifrån som i _skiss/mille (A3): mitt framför bröstet, bilens skala 0,62 borträknad

function musKropp(bak, fram, kropp, iBil = false) {
  const arm = {}, glas = {};
  const tass = {};
  let ratt = null;
  for (const s of 'rl') {
    const g = el('g', {}, bak);
    glas[s] = el('image', { width: 431, height: 743, style: 'display:none' }, g);
    arm[s] = { g, rak: bild(ARMFIL(s), g) };
  }
  bild(`${MUS}cut/musen-mille-body.png`, kropp);
  const ansikte = ansikten.bygg(kropp, ansikten.MILLE);
  if (iBil) {   // ratten i kod: mörkgrå kritring med vit klistermärkeskant och rosa tutknapp, nedre halvan bakom bilens kant, tassarna på klockan 10 och 2
    ratt = el('g', { transform: RATT_T }, kropp);
    ratt.innerHTML = `<circle r="62" fill="none" stroke="#fff" stroke-width="30"/><circle r="62" fill="none" stroke="#4b4542" stroke-width="15"/>
      <path d="M-62 0 H62 M0 0 V62" stroke="#4b4542" stroke-width="10" stroke-linecap="round"/><circle r="17" fill="#d6568a" stroke="#fff" stroke-width="6"/>`;
    for (const [s, x, r] of [['l', -46, -30], ['r', 46, 30]]) {
      tass[s] = el('g', { transform: `translate(${x} -40) rotate(${r}) scale(0.9)` }, ratt);
      tass[s].innerHTML = `<ellipse rx="27" ry="21" fill="${PAW}" stroke="#fff" stroke-width="9" paint-order="stroke"/><path d="M-9 -8 v7 M1 -10 v8 M11 -8 v7" stroke="#c98591" stroke-width="3" stroke-linecap="round"/>`;
    }
  }
  // p: arm_r/arm_l (vinkel eller 'kant'), fram, glass, humor m.m.
  const pose = (p, standard = 'kant') => {
    let uppe = 0;   // armar som gör något (en tass som släpper ratten)
    for (const s of 'rl') {
      let v = p[`arm_${s}`] ?? standard;
      const a = arm[s], vilar = typeof v !== 'number' || (iBil && v === kit.MUS_VILA);   // i bilen betyder vila: tassen på ratten
      if (vilar) v = null;                                       // i bilen: tassen ligger på ratten, armen syns inte
      else uppe++;
      if (tass[s]) tass[s].style.display = vilar ? '' : 'none';
      a.g.style.display = v == null ? 'none' : '';
      if (v != null) a.rak.setAttribute('transform', `rotate(${musArm(s, v)} ${AXEL[s][0]} ${AXEL[s][1]})`);
      (vilar || (p.fram || '').includes(s) ? fram : bak).appendChild(a.g);
      const fl = p.armFlytt?.[s];   // [dx, dy] i musens ruta
      a.g.setAttribute('transform', fl ? `translate(${fl[0]} ${fl[1]})` : '');
      const gl = p.glass?.s === s ? p.glass : null;
      glas[s].style.display = gl ? '' : 'none';
      if (gl) {   // glassen under tassen, som bygg.py: underkanten 0,3 glasshöjd under tassen
        const typ2 = gl.typ || 'rosa', h = GH * GLASS_H[typ2] / 743, w = h * GLASS_W[typ2] / GLASS_H[typ2];
        const [hx, hy] = gl.hand || musHand(s, v ?? kit.MUS_VILA);
        glas[s].setAttribute('href', GLASS[typ2]);
        Object.entries({ x: hx - w / 2, y: hy + GH * 0.3 - h, width: w, height: h }).forEach(([k, x]) => glas[s].setAttribute(k, x));
      }
    }
    if (ratt) ratt.style.display = p.lyft > 0 || uppe > 1 ? 'none' : '';   // båda armarna uppe eller hoppar ur: ingen ratt
    ansikte.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink || 0, m: p.m });
  };
  return { pose, ansikte };
}

function ny(parent, { vit = false, kontur = false, mus = true } = {}) {
  const id = `bil${++n}`, b0 = {};
  filtren(document.querySelector('svg defs'));
  const g = el('g', { id }, parent), inre = el('g', vit ? { filter: 'url(#vitkant)' } : {}, g);
  // avgasröret i kod bak, bakom karossen (Sanna: puffar på "brum")
  el('path', { d: 'M130 706 L36 716', stroke: '#7d7772', 'stroke-width': 40, 'stroke-linecap': 'round', fill: 'none' }, inre);
  bild(`${BIL}cut/rosa-bilen-kaross.png`, inre);
  let m = null, musG = null;
  const bak = el('g', {}), fram = el('g', {});
  if (mus) {
    musG = el('g', { id: `${id}-mus` }, inre);
    const kropp = el('g', {});
    musG.append(bak, kropp);
    m = musKropp(bak, fram, kropp, true);
  }
  bild(`${BIL}cut/rosa-bilen-kant.png`, inre);
  if (kontur) {
    let mask = '';
    if (mus) {   // konturen går inte över musens kropp (hon sitter framför karossens bakkant)
      const mk = el('mask', { id: `${id}-mask`, maskUnits: 'userSpaceOnUse', x: -200, y: -400, width: 1424, height: 1624 }, document.querySelector('svg defs'));
      el('rect', { x: -200, y: -400, width: 1424, height: 1624, fill: '#fff' }, mk);
      el('use', { href: `#${id}-mus`, filter: 'url(#svart)' }, mk);
      mask = `url(#${id}-mask)`;
    }
    b0.konturEl = bild(`${LAGER}bil-kontur.png`, inre, mask ? { mask } : {});
  }
  const framG = el('g', {}, inre);
  if (mus) framG.appendChild(fram);
  const hjul = Object.entries(HJUL).map(([namn, [px, py]]) => ({ el: bild(`${BIL}cut/rosa-bilen-${namn}.png`, inre), px, py }));
  const bb = vit ? [67, 30, 958, 850] : [74, 37, 951, 843], fot = [(bb[0] + bb[2]) / 2, bb[3]];
  const b = Object.assign(b0, { id, g, mus: m, fot, bbox: bb });
  let senast = {};
  b.pose = (p = {}) => {
    senast = p;
    const s = (p.h ?? 300) / (bb[3] - bb[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    if (b.konturEl) b.konturEl.style.display = p.kontur ? '' : 'none';   // syns bara med kontur: true (refrängens blixt och mönster)
    if (p.vit != null) p.vit ? g.setAttribute('filter', 'url(#vitkant)') : g.removeAttribute('filter');
    g.setAttribute('transform', `translate(${p.x ?? 400} ${p.y ?? 600}) rotate(${p.tilt || 0}) scale(${s * (p.sx ?? 1) * (p.flip ? -1 : 1)} ${s * (p.sy ?? 1)}) translate(${-fot[0]} ${-fot[1]})`);
    const v = (p.dist || 0) / (HJUL_R * s) * 180 / Math.PI;
    hjul.forEach(h => h.el.setAttribute('transform', `rotate(${v} ${h.px} ${h.py})`));
    if (m) {
      const tr = `rotate(${-(p.rot || 0)} ${VRID[0]} ${VRID[1]}) translate(${MUS_X} ${MUS_Y + (p.lyft || 0)}) scale(${MUS_K}) translate(-512 -926)`;
      musG.setAttribute('transform', tr);
      fram.setAttribute('transform', tr);
      m.pose(p);
    }
  };
  // en punkt i musens 1024-ruta → bild (lager.figurer, efter kameran)
  b.musPunkt = pt => {
    const r = kit.lager.figurer.getCTM().inverse().multiply(musG.getCTM());
    const q = new DOMPoint(pt[0], pt[1]).matrixTransform(r); return [q.x, q.y];
  };
  const puffG = el('g', { filter: 'url(#kritkant)' }, el('g', { filter: 'url(#boil)' }, g)), puffar = [];   // krita, kokar som resten
  b.puffa = (t, tider) => {
    while (puffar.length < tider.length * 3) puffar.push(el('circle', { fill: '#fff', stroke: '#e4ddd2', 'stroke-width': 7 }, puffG));
    puffar.forEach((c, j) => {   // växer ut ur röret, driver bakåt och uppåt och krymper bort
      const i = j % 3, u = kit.del(tider[(j - i) / 3] + i * 0.15, tider[(j - i) / 3] + i * 0.15 + 0.9, t), syns = u > 0 && u < 1;
      c.style.display = syns ? '' : 'none';
      if (!syns) return;
      c.setAttribute('r', kit.lerp(25, 100 - i * 18, Math.sqrt(u)) * (1 - kit.mjuk(kit.del(0.65, 1, u))));
      c.setAttribute('cx', 30 - 320 * u); c.setAttribute('cy', 700 - 120 * u + 15 * Math.sin(u * 5 + i));
    });
  };
  b.pose();
  return b;
}

// Musen på egna ben (vid disken, i discot, på glassberget): kit.figur med de ritade lemmarna och ansiktet ur ansikten.js.
//   const mus = await bilen.musen({ h: 200 }); mus.pose({ x, y, h, tilt, sx, sy, humor, titt, arm_r: 145, arm_l: 145, fram: 'rl', glass, ben })
// ben: [vänster, höger] i grader (hopp: kit.benHopp). Armarna som i bilen, men 'kant' finns inte: standard är vila (30).
async function musen(opt = {}) {
  filtren(document.querySelector('svg defs'));
  const f = await kit.figur('musen-mille', opt);
  f.ansikte.style.display = 'none';
  // byt kit-armarna mot musKropp (samma vinklar, glass, fram/bak); benen behålls ur kit
  for (const s of 'rl') f.delar[`arm-${s}`].remove(), delete f.delar[`arm-${s}`];
  const bak = el('g', {}), fram = el('g', {}), kropp = el('g', {});
  f.kropp.replaceChildren();
  f.inre.insertBefore(bak, f.kropp);
  f.kropp.appendChild(kropp);
  f.inre.appendChild(fram);
  const m = musKropp(bak, fram, kropp);
  const pose0 = f.pose;
  f.pose = (p = {}) => {
    const ben = p.ben || [0, 0];
    pose0({ ...p, delar: { 'leg-l': -ben[0], 'leg-r': ben[1], ...(p.delar || {}) } });
    m.pose(p, kit.MUS_VILA);
  };
  f.pose();
  return f;
}

window.bilen = { ny, musen, GLASS, MUS_K, MUS_X, MUS_Y };
})();
