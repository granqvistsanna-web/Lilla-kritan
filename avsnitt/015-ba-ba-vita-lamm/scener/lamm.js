// Lammen i avsnitt 015: Ludde, far och mor ur Luddes rigg (assets/karaktarer/lammet-ludde/, filerna ändras aldrig), plus säcken,
// strumphögen och lösa ulltussar. Samma mått och färger som storyboard/bygg.py (lager/matt.json). Laddas efter kit.js, kant.js
// och ansikten.js:
//   <script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script><script src="../ansikten.js"></script><script src="../lamm.js"></script>
//
// const l = await lamm.ny('ludde' | 'far' | 'mor', { forelder: L.figurer, h })   // h: bildhöjd, standard LH / FH / MH ur matt.json
// l.pose({ x, y,                       fötterna i bild (y standard GOLV); hopp: y: GOLV + kit.hopp(...).y, sx, sy
//          humor, titt, tittY, blink,  ansiktet (ansikten.js; blink standard = egen blinkning var 3–4:e s), m = munnens öppning
//          armL, armR,                 grader som arm_l/arm_r i bygg.py (armL −60 och armR 60 = båda armarna upp)
//          tilt, sx, sy, delar,        lutning (grader), squash, och råa riggvinklar (t.ex. kit.benHopp(h.ben))
//          rock, kjol,                 0..1: plagget torkas fram nerifrån och upp (1 = klart)
//          tussar,                     0..11 ulltussar; bråkdel = den sista växer fram med ett litet pop (tussar 11 = extra luddig)
//          strumpFot, strumpHand,      0..2: antal strumpor (vänster först); bråkdel = den strumpan glider på
//          sitter,                     true = sittposen (ludde-sitter-v2 utan ansikte, armarna inbakade; inga plagg eller tussar)
//          synlig, opacity, andas })
// l.tussPunkt(i)  var tuss nr i (0 = den första som kommer, 10 = den sista) sitter, i förälderns koordinater (för att flyga ut)
// l.hand('l'|'r'), l.fot('l'|'r')  armspetsen / foten i förälderns koordinater (med senaste posen)
// l.punkt([x, y])  en punkt i lammets 1024-ruta → förälderns koordinater.  l.g, l.f (kit.figur), l.a (ansiktet)
//
// const t = lamm.tuss(parent)    en lös ulltuss: t.pose({ x, y, r, rot, synlig, opacity })   r = radien i bild (en tuss på Ludde ≈ 17)
// const s = lamm.sack(parent)    säcken: s.pose({ x, y, k, sx, sy, tilt, synlig })   k 0 = tom och platt, > 0 full (växer till 1)
//                                s.oppning() = säckens mynning i förälderns koordinater (dit tussarna flyger)
// const h = lamm.sak(lamm.HOG, parent)  strumphögen (eller lamm.STRUMPA['rosa-1'] …): h.pose({ x, y, h, rot, flip, synlig, opacity })
//                                       x = mitt, y = underkant, h = höjd i bild, som place() i bygg.py
// Figurerna snurrar aldrig och vänds aldrig (platta urklipp): bara lugna hopp, gung och lutning.
(() => {
const { el, bild, clamp, lerp, ut, over, ROT } = kit;
const A = `${ROT}assets/`, LAGER = new URL('lager/', document.currentScript.src).href;
const MATT = fetch(`${LAGER}matt.json`).then(r => r.json());
// tussarna i den här ordningen: varje början är jämnt spridd (3 = toppen och sidorna); de försvinner bakifrån
const ORDNING = [3, 7, 8, 1, 5, 9, 10, 0, 6, 2, 4];
const SITT = 'translate(0 62) translate(512 864) scale(0.93) translate(-512 -864)';   // sittbildens botten (864) på fötternas linje (926)
// sittande: strumpans mitt [x, y], vridning och glidriktning [dx, dy] i sittbilden. Hovarna sitter på ca (270, 815) och (757, 810),
// benen pekar snett ut och ner (ca 37°); strumpan ligger längs benet och täcker hoven. Höger speglas inte (då kan en lös strumpa flyga dit).
const SITT_FOT = { l: [297, 795, 53, -104, 78], r: [730, 790, -53, 104, 78] }, SITT_H = 175;
// händerna: samma sak i armbilden. De ritade armarna (lammet-ludde/lemmar/rita-armar.py) går från axeln (252/772, 540) ner till spetsen
// (212/812, 712), 13° utåt; strumpan ligger längs armen
// med klöven i strumpans fot och glider på utifrån längs armen. Höger speglas inte (tån pekar inåt; en lös strumpa kan flyga dit utan att vändas).
const HAND_STR = { l: [218, 684, 13, -23, 97], r: [806, 684, -13, 23, 97] }, HAND_H = 110;
// bilderna: [fil, bbox i bilden, bildens storlek]
const STRUMPA = { 'rosa-1': ['rekvisita/strumpor/cut/strumpa-rosa-1.png', [18, 18, 272, 381], [290, 397]],
  'rosa-2': ['rekvisita/strumpor/cut/strumpa-rosa-2.png', [18, 18, 273, 391], [290, 408]],
  'bla-1': ['rekvisita/strumpor/cut/strumpa-bla-1.png', [18, 19, 273, 382], [291, 398]],
  'bla-2': ['rekvisita/strumpor/cut/strumpa-bla-2.png', [18, 19, 273, 392], [290, 409]] };
const HOG = ['rekvisita/strumpor/cut/strumpor.png', [42, 333, 988, 707], [1024, 1024]];
const SACK_TOM = ['rekvisita/ullsack/cut/ullsack-tom.png', [78, 315, 962, 771], [1024, 1024]];
const SACK_FULL = ['rekvisita/ullsack/cut/ullsack.png', [209, 173, 815, 920], [1024, 1024]];
const MYNNING = [512, 250];   // säckens mynning i ullsack.png

let defsKlara = null;
function defs(svg, M) {   // filtren och tussens form, en gång per sida
  if (defsKlara === svg) return;
  defsKlara = svg;
  const d = svg.querySelector('defs'), F = M.FARG, r = 56;
  const ring = [[-0.55, 0.15, 0.8], [0.55, 0.15, 0.8], [0, -0.2, 1]].map(([x, y, k]) => `<circle cx="${x * r}" cy="${y * r}" r="${k * r}"/>`).join('');
  let krull = '';   // bygg.py: arc((x − 0.45r, y − 0.35r, x + 0.15r, y + 0.35r), 200°, 520°)
  for (let v = 200; v <= 520; v += 8) { const a = v * Math.PI / 180; krull += `${krull ? 'L' : 'M'}${(-0.15 * r + 0.3 * r * Math.cos(a)).toFixed(1)} ${(0.35 * r * Math.sin(a)).toFixed(1)}`; }
  d.insertAdjacentHTML('beforeend', `
    <filter id="lammkrita" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.16" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.6 0 0 0 1.62" result="a"/>
      <feComposite in="SourceGraphic" in2="a" operator="in" result="f"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" result="k"/>
      <feDisplacementMap in="f" in2="k" scale="7" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="vitsiluett" x="0" y="0" width="1" height="1">
      <feMorphology in="SourceAlpha" operator="erode" radius="7"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
    </filter>
    <g id="tussform">
      <g fill="#fff" stroke="#fff" stroke-width="9">${ring}</g>
      <g fill="${F.VIT_ULL}" filter="url(#lammkrita)">${ring}</g>
      <path d="${krull}" fill="none" stroke="${F.GRA_LINJE}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
    </g>`);
}

// en bild placerad som place() i bygg.py: mitten av bboxen på x, underkanten på y, bboxens höjd = h
function sak([fil, bb, [iw, ih]], parent) {
  const g = el('g', {}, parent);
  bild(A + fil, g, { width: iw, height: ih });
  kant.lagg(g);
  const cx = (bb[0] + bb[2]) / 2;
  return { g, pose({ x, y, h, rot = 0, flip = false, sx = 1, sy = 1, synlig = true, opacity = 1 }) {
    g.style.display = synlig ? '' : 'none';
    g.setAttribute('opacity', opacity);
    const s = h / (bb[3] - bb[1]);
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${(s * sx * (flip ? -1 : 1)).toFixed(4)} ${(s * sy).toFixed(4)}) translate(${-cx} ${-bb[3]})`);
  } };
}

// en strumpa i lammets 1024-ruta: mitten på (x, y), höjd h, vriden v grader, speglad
function strumpa(parent, namn, [x, y], h, v = 0, flip = false) {
  const [fil, bb, [iw, ih]] = STRUMPA[namn], s = h / (bb[3] - bb[1]);
  const g = el('g', {}, parent), inre = el('g', {}, g);
  bild(A + fil, inre, { width: iw, height: ih });
  inre.setAttribute('transform', `translate(${x} ${y}) rotate(${v}) scale(${flip ? -s : s} ${s}) translate(${-(bb[0] + bb[2]) / 2} ${-(bb[1] + bb[3]) / 2})`);
  g.c = [x, y]; g.v = v;   // mitten och vridningen, för glid()
  return g;
}
// strumpa nr k (0..1): 0 osynlig; glider på längs (dx, dy) och sträcks längs strumpan när den dras över hoven (75 % av k),
// sedan sätter den sig med en liten studs och sitter still. Helt synlig direkt (en lös strumpa i samma läge kan lämna över, som i angen-3).
const glid = (g, k, [dx, dy]) => {
  g.style.display = k > 0 ? '' : 'none';
  if (k <= 0) return;
  const a = clamp(k / 0.75), d = clamp((k - 0.75) / 0.25), q = 1 - ut(a);
  const drag = 0.16 * Math.sin(Math.PI * a) - 0.07 * Math.sin(Math.PI * 1.5 * d) * (1 - d);   // sträcks, trycks ihop lite, stilla
  const [cx, cy] = g.c, v = g.v;
  g.setAttribute('transform', `translate(${(dx * q).toFixed(1)} ${(dy * q).toFixed(1)}) translate(${cx} ${cy}) rotate(${v}) scale(${(1 - 0.5 * drag).toFixed(4)} ${(1 + drag).toFixed(4)}) rotate(${-v}) translate(${-cx} ${-cy})`);
  g.removeAttribute('opacity');
};

const auto = (t, fas) => { const p = 3.1 + 0.9 * fas, u = ((t + fas * 7) % p + p) % p; return u < 0.13 ? 1 : 0; };

async function ny(vem, opt = {}) {
  const M = await MATT, F = M.FARG;
  const h = opt.h ?? { ludde: M.LH, far: M.FH, mor: M.MH }[vem];
  const f = await kit.figur('lammet-ludde', { h, forelder: opt.forelder });
  defs(f.g.ownerSVGElement, M);
  f.ansikte.style.display = 'none';
  const { inre, kropp, delar } = f, fas = Math.random();
  if (vem === 'far') {   // hela lammet lite gråare, som ton=0.32 mot (196, 192, 186) i bygg.py
    const t = 0.32, id = `farton-${Math.random().toString(36).slice(2, 7)}`;
    el('feColorMatrix', { type: 'matrix', values: `${1 - t} 0 0 0 ${(196 / 255 * t).toFixed(3)}  0 ${1 - t} 0 0 ${(192 / 255 * t).toFixed(3)}  0 0 ${1 - t} 0 ${(186 / 255 * t).toFixed(3)}  0 0 0 1 0` },
      el('filter', { id, 'color-interpolation-filters': 'sRGB' }, f.g.ownerSVGElement.querySelector('defs')));
    inre.setAttribute('filter', `url(#${id})`);
  }
  // strumporna på fötterna: bakom kroppen (skaftet under ullen), följer benen
  const fotS = { l: el('g', {}), r: el('g', {}) };
  for (const s of 'lr') kropp.before(fotS[s]);
  const [fl, fr] = [M.FOT['leg-l'], M.FOT['leg-r']];
  const fotStr = { l: strumpa(fotS.l, 'rosa-1', [fl[0], fl[1] + 8 - 82], 165), r: strumpa(fotS.r, 'rosa-2', [fr[0], fr[1] + 8 - 82], 165, 0, true) };
  // plagget: en färgyta i kroppens siluett (krympt så att den vita kanten syns), torkas fram nerifrån
  const silId = `sil-${Math.random().toString(36).slice(2, 7)}`;
  const plagg = {};
  const nyttPlagg = (namn, farg, topp) => {
    const id = `${silId}-${namn}`, m = el('mask', { id, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 1024, height: 1024 }, f.g.ownerSVGElement.querySelector('defs'));
    bild(`${A}karaktarer/lammet-ludde/cut/ludde-body.png`, m, { filter: 'url(#vitsiluett)' });
    const torka = el('rect', { x: 0, y: 1024, width: 1024, height: 0, fill: '#000' }, m);
    const g = el('g', { mask: `url(#${id})` }, kropp), krita = el('g', { filter: 'url(#lammkrita)' }, g);
    el('path', { d: topp, fill: farg }, krita);
    return plagg[namn] = { g, torka, krita };
  };
  const rock = nyttPlagg('rock', F.ROCK, 'M0 560H1024V1024H0Z');
  el('path', { d: 'M512 575V820', stroke: '#F0E8D6', 'stroke-width': 6, fill: 'none' }, rock.krita);   // knapplisten och två knappar
  for (const y of [640, 720]) el('circle', { cx: 540, cy: y, r: 14, fill: '#F0E8D6' }, rock.krita);
  let vag = 'M0 640';
  for (let x = 0; x <= 1024; x += 16) vag += `L${x} ${(640 + 10 * Math.sin(x / 40)).toFixed(1)}`;
  nyttPlagg('kjol', F.KJOL, vag + 'L1024 1024L0 1024Z');
  // ulltussarna runt kroppen (TUSSAR i bygg.py: vinkel och avstånd)
  const tg = el('g', {}, kropp), tussar = M.TUSSAR.map(([v, k]) => {
    const r = v * Math.PI / 180, x = M.KROPP_C[0] + M.KROPP_R * k * Math.cos(r), y = M.KROPP_C[1] + M.KROPP_R * k * Math.sin(r);
    const g = el('g', {}, tg); el('use', { href: '#tussform' }, g);
    return { g, x, y };
  });
  // huvudet (ansiktet och mors rosett) i en egen grupp, så att det följer med till sittposen
  const huvud = el('g', {}, inre);
  const a = ansikten.bygg(huvud, M.LUDDE_ANS);
  if (vem === 'mor') {   // en liten rosa rosett vid vänstra örat
    const bx = 300, by = 238, ros = `M${bx} ${by}L${bx - 52} ${by - 36}L${bx - 52} ${by + 36}ZM${bx} ${by}L${bx + 52} ${by - 36}L${bx + 52} ${by + 36}Z`;
    const g = el('g', { 'stroke-linejoin': 'round' }, huvud);
    el('path', { d: ros, fill: '#fff', stroke: '#fff', 'stroke-width': 9 }, g);
    el('circle', { cx: bx, cy: by, r: 20, fill: '#fff' }, g);
    const k = el('g', { filter: 'url(#lammkrita)' }, g);
    el('path', { d: ros, fill: F.ROSETT }, k);
    el('circle', { cx: bx, cy: by, r: 16, fill: F.ROSETT }, k);
  }
  // strumporna på händerna: framför kroppen och armen, i armens grupp (följer armens vinkel), längs armen med klöven i strumpans fot
  const handS = {}, handStr = {};
  for (const s of 'lr') {
    const [x, y, v] = HAND_STR[s];
    handS[s] = el('g', {}, inre);
    handStr[s] = strumpa(handS[s], s === 'l' ? 'bla-1' : 'bla-2', [x, y], HAND_H, v);
  }
  // sittposen: ludde-sitter-v2 utan ansikte (lager/ludde-sitter.png), med egna strumpor på de sittande fötterna
  const sitt = el('g', { transform: SITT }, inre);
  inre.insertBefore(sitt, huvud);
  bild(`${LAGER}ludde-sitter.png`, sitt);
  const sittStr = {};
  for (const s of 'lr') { const [x, y, v] = SITT_FOT[s]; sittStr[s] = strumpa(el('g', {}, sitt), s === 'l' ? 'rosa-1' : 'rosa-2', [x, y], SITT_H, v); }
  const standDelar = [...Object.values(delar), fotS.l, fotS.r, kropp, handS.l, handS.r];

  const l = { vem, f, g: f.g, a, M };
  l.pose = (p = {}) => {
    const sitter = !!p.sitter;
    f.pose({ x: p.x, y: p.y ?? M.GOLV, tilt: p.tilt, sx: p.sx, sy: p.sy, k: p.k, synlig: p.synlig, opacity: p.opacity, andas: p.andas,
      delar: { 'arm-l': -(p.armL || 0), 'arm-r': -(p.armR || 0), ...(p.delar || {}) } });
    for (const e of standDelar) e.style.display = sitter ? 'none' : '';
    sitt.style.display = sitter ? '' : 'none';
    huvud.setAttribute('transform', sitter ? SITT : '');
    a.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink ?? auto(kit.nu, fas), m: p.m > 0 ? p.m : undefined });   // m 0 = humörets egen mun
    // plaggen: torka fram nerifrån (mot y 560 för rocken, 630 för kjolen)
    for (const [namn, topp] of [['rock', 560], ['kjol', 630]]) {
      const k = clamp(p[namn] || 0), y = lerp(850, topp - 20, k);
      plagg[namn].g.style.display = k > 0 ? '' : 'none';
      plagg[namn].torka.setAttribute('y', 0); plagg[namn].torka.setAttribute('height', y.toFixed(1));
    }
    // tussarna: de första n syns, nästa växer fram med ett litet pop
    const n = clamp(p.tussar || 0, 0, 11);
    ORDNING.forEach((i, j) => {
      const k = clamp(n - j), T = tussar[i];
      T.g.style.display = k > 0 ? '' : 'none';
      if (k > 0) T.g.setAttribute('transform', `translate(${T.x.toFixed(1)} ${T.y.toFixed(1)}) scale(${(k < 1 ? over(k) : 1).toFixed(3)})`);
    });
    // strumporna: följer benen och armarna (samma transform som riggdelen)
    for (const s of 'lr') {
      fotS[s].setAttribute('transform', delar[`leg-${s}`].getAttribute('transform'));
      handS[s].setAttribute('transform', delar[`arm-${s}`].getAttribute('transform'));
    }
    const sf = p.strumpFot || 0, sh = p.strumpHand || 0;
    glid(fotStr.l, clamp(sf), [0, 90]); glid(fotStr.r, clamp(sf - 1), [0, 90]);
    glid(sittStr.l, clamp(sf), SITT_FOT.l.slice(3)); glid(sittStr.r, clamp(sf - 1), SITT_FOT.r.slice(3));
    glid(handStr.l, clamp(sh), HAND_STR.l.slice(3)); glid(handStr.r, clamp(sh - 1), HAND_STR.r.slice(3));
  };
  // punkter i förälderns koordinater (där lösa tussar och saker ritas)
  const iForalder = (elem, [x, y]) => { const pt = new DOMPoint(x, y).matrixTransform(f.g.parentNode.getCTM().inverse().multiply(elem.getCTM())); return [pt.x, pt.y]; };
  l.punkt = p => iForalder(inre, p);
  l.tussPunkt = i => { const T = tussar[ORDNING[i]]; return iForalder(inre, [T.x, T.y]); };
  l.hand = s => iForalder(delar[`arm-${s}`], M.HAND[`arm-${s}`]);
  l.fot = s => iForalder(delar[`leg-${s}`], M.FOT[`leg-${s}`]);
  // var strumpan börjar glida på (k strax över 0), i förälderns koordinater: { c, rot, h }. typ 'hand' | 'sitt', s 'l' | 'r'.
  // En lös strumpa (lamm.sak) med samma mitt, vridning och höjd lämnar över utan skarv (angen-3).
  l.strumpStart = (typ, s) => {
    const [x, y, v, dx, dy] = (typ === 'hand' ? HAND_STR : SITT_FOT)[s], g = typ === 'hand' ? handS[s] : sitt;
    const a = v * Math.PI / 180, c = iForalder(g, [x + dx, y + dy]), u = iForalder(g, [x + dx - Math.sin(a) * 100, y + dy + Math.cos(a) * 100]);
    const h = (typ === 'hand' ? HAND_H : SITT_H) * Math.hypot(u[0] - c[0], u[1] - c[1]) / 100;
    return { c, rot: Math.atan2(u[1] - c[1], u[0] - c[0]) * 180 / Math.PI - 90, h };
  };
  l.pose();
  return l;
}

// en lös ulltuss (flyger ner i säcken, ut ur säcken och blir ett plagg): r = radien i bild
function tuss(parent) {
  const g = el('g', {}, parent);
  el('use', { href: '#tussform' }, g);
  return { g, pose({ x, y, r = 17, rot = 0, synlig = true, opacity = 1 }) {
    g.style.display = synlig ? '' : 'none';
    g.setAttribute('opacity', opacity);
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${(r / 56).toFixed(4)})`);
  } };
}

// säcken: tom och platt (k 0) eller full; k > 0 växer den fulla från 70 % till hela höjden
function sack(parent) {
  const g = el('g', {}, parent), tom = sak(SACK_TOM, g), full = sak(SACK_FULL, g);
  let senast = null;
  const s = { g, pose(p = {}) {
    const [x0, y0] = [p.x ?? senast?.x, p.y ?? senast?.y], k = clamp(p.k || 0);
    senast = { x: x0, y: y0 };
    tom.pose({ x: x0, y: y0, h: 80, sx: p.sx, sy: p.sy, rot: p.tilt || 0, synlig: p.synlig !== false && k <= 0 });
    full.pose({ x: x0, y: y0, h: 175 * lerp(0.7, 1, k), sx: p.sx, sy: p.sy, rot: p.tilt || 0, synlig: p.synlig !== false && k > 0 });
    senast.h = 175 * lerp(0.7, 1, k); senast.sx = p.sx ?? 1; senast.sy = p.sy ?? 1;
  }, oppning() {   // räknas ur senaste posen (fungerar också när säcken är tom och den fulla bilden är gömd)
    const [, bb] = SACK_FULL, s = senast.h / (bb[3] - bb[1]);
    return [senast.x + (MYNNING[0] - (bb[0] + bb[2]) / 2) * s * senast.sx, senast.y + (MYNNING[1] - bb[3]) * s * senast.sy];
  } };
  return s;
}

window.lamm = { ny, tuss, sack, sak, STRUMPA, HOG, SITT_FOT, SITT_H, SACK_TOM, SACK_FULL, ORDNING, matt: () => MATT };
})();
