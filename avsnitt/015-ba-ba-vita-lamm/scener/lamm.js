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
// Ludde i art direction v2 (assets/karaktarer/lammet-ludde/premium, kit 'lammet-ludde-v2'), uppmätt i premium/cut (2026-11-08).
// Kroppen är en ellips (tussarna sitter runt den), fötterna och klövarna i 1024-rutan.
const KROPP = { c: [508, 505], rx: 290, ry: 326 };
const FOT = { 'leg-l': [435, 927], 'leg-r': [602, 925] }, HAND = { 'arm-l': [132, 644], 'arm-r': [882, 639] };   // HAND = klövens mitt
// Strumporna på lammet målas i benets och armens egen form (Sanna 2026-11-08: bildstrumporna satt inte på klövarna): kritfärg
// innanför delens vita kant, från muddens linje ut över klöven, och en mudd i mörkare ton. Varje strumpa har en ram i delens
// 1024-ruta: [x, y] = muddens mitt, v = vridning (ramens +y pekar ut mot klöven). Fötterna rakt ner; armarna längs armen mot klövens
// mitt (vänster (132, 644), höger (882, 639), roten (201, 578)/(814, 573)), mudden 55 px innanför klöven.
const FOT_STR = { l: [435, 838, 0], r: [602, 836, 0] }, HAND_STR = { l: [172, 606, 46], r: [843, 601, -46] };
// ärmarna: ramen vid klövens kant, pekar in mot roten (mudden vid klöven)
const ARM_STR = { l: [155, 622, 226], r: [859, 617, 134] };
const STRUMP_FARG = { rosa: ['#EFB5C4', '#DE8FA6'], bla: ['#AFD4ED', '#86B6DA'] };   // [strumpan, mudden], som strumpa-rosa/bla-*.png
// där en lös strumpa (lamm.sak) landar före den målade: mitten 45 px ut från mudden, höjden i 1024-rutan
const LANDA = 45, LANDA_H = 110;
// sittposen som 'sitter' i premium/uttryck.html: kroppen sjunker 48, benen ut 40° och upp 40
const SITT_SJUNK = 48, SITT_BEN = { 'leg-l': [40, 0, -40], 'leg-r': [-40, 0, -40] };
// humören (ansikten.js-namnen som scenerna använder) → v2-ansiktet i kit.js
const HUMOR = { glad: {}, skrattar: { ogon: 'happy', mun: 0.6 }, ropar: { mun: 0.9 }, forvanad: { ogon: 'big' }, nyfiken: { titt: 1, tittY: -0.4 },
  ledsen: { tittY: 0.5, ledsen: true }, karleksfull: { ogon: 'happy' }, blinkar: { ogon: 'happy' }, stolt: { ogon: 'happy' }, anstranger_sig: { ogon: 'sleep' } };
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
    <filter id="smakrita" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.08 0.3" numOctaves="2" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.7 0 0 0 1.55" result="a"/>
      <feComposite in="SourceGraphic" in2="a" operator="in"/>
    </filter>
    <filter id="markskugga" x="-30%" y="-100%" width="160%" height="300%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="delsiluett" x="0" y="0" width="1" height="1">
      <feMorphology in="SourceAlpha" operator="erode" radius="8"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
    </filter>
    <filter id="vitsiluett" x="0" y="0" width="1" height="1">
      <feMorphology in="SourceAlpha" operator="erode" radius="7"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
    </filter>
    <clipPath id="tussklipp">${ring}</clipPath>
    <g id="tussform">
      <g fill="#fff" stroke="#fff" stroke-width="9">${ring}</g>
      <g clip-path="url(#tussklipp)">
        <g fill="${ULL_SKUGGA}" filter="url(#lammkrita)">${ring}</g>
        <g fill="${F.VIT_ULL}" filter="url(#lammkrita)" transform="translate(${-0.05 * r} ${-0.17 * r}) scale(0.95)">${ring}</g>
      </g>
      <path d="${krull}" fill="none" stroke="${F.GRA_LINJE}" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
    </g>`);
}

// mjuk skugga på marken (polish 2026-11-08): stannar på GOLV, blir mindre och ljusare när saken hoppar, lite åt höger (ljuset uppifrån vänster)
const ULL_SKUGGA = '#E4DCCB';   // tussens undersida: en varm grå skära under den vita ullen (polish 2026-11-08)
const SKUGGA = { farg: '#23401E', opacity: 0.26, dx: 7 };
function markskugga(fore) {
  const e = el('ellipse', { fill: SKUGGA.farg, filter: 'url(#markskugga)' });
  fore.before(e);
  return ({ x, y, rx, golv, synlig = true, opacity = 1 }) => {
    const hojd = Math.max(0, golv - y), k = 1 - 0.45 * clamp(hojd / (rx * 2.2));
    e.style.display = synlig ? '' : 'none';
    e.setAttribute('cx', (x + SKUGGA.dx * k).toFixed(1)); e.setAttribute('cy', (Math.max(y, golv) + 2).toFixed(1));
    e.setAttribute('rx', (rx * k).toFixed(1)); e.setAttribute('ry', (rx * k * 0.15).toFixed(1));
    e.setAttribute('opacity', (SKUGGA.opacity * k * opacity).toFixed(3));
  };
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

// en målad strumpa i delens form (mask = delens fyllning innanför den vita kanten), i ramen [x, y, v]
let strumpNr = 0;
function maladStrumpa(parent, delFil, [x, y, v], [farg, mudd]) {
  const defs = parent.ownerSVGElement.querySelector('defs'), id = `strumpa-${strumpNr++}`;
  const m = el('mask', { id, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 1024, height: 1024 }, defs);
  bild(delFil, m, { filter: 'url(#delsiluett)' });
  const ram = el('g', { transform: `translate(${x} ${y}) rotate(${v})` }, el('g', { mask: `url(#${id})` }, parent));
  // en hel grund (klöven får inte lysa igenom) och kritkorn i mudden tonen ovanpå
  const fot = el('g', {}, ram);
  el('rect', { x: -200, y: 0, width: 400, height: 300, fill: farg }, fot);
  el('rect', { x: -200, y: 0, width: 400, height: 300, fill: mudd, opacity: 0.45, filter: 'url(#lammkrita)' }, fot);
  const band = el('g', {}, ram);
  el('rect', { x: -200, y: 0, width: 400, height: 22, fill: mudd }, band);
  for (const rx of [-48, -24, 0, 24, 48]) el('path', { d: `M${rx} 3V19`, stroke: farg, 'stroke-width': 5, 'stroke-linecap': 'round' }, band);
  // k 0..1: strumpan dras på från klöven upp till mudden (med ett litet överslag), mudden kommer sist
  return k => {
    ram.style.display = k > 0 ? '' : 'none';
    const a = over(clamp(k / 0.85)), topp = lerp(150, 0, a);
    fot.setAttribute('transform', `translate(0 ${topp.toFixed(1)})`);
    band.setAttribute('transform', `translate(0 ${topp.toFixed(1)})`);
    band.style.display = k > 0.6 ? '' : 'none';
  };
}

const auto = (t, fas) => { const p = 3.1 + 0.9 * fas, u = ((t + fas * 7) % p + p) % p; return u < 0.13 ? 1 : 0; };

async function ny(vem, opt = {}) {
  const M = await MATT, F = M.FARG;
  const h = opt.h ?? { ludde: M.LH, far: M.FH, mor: M.MH }[vem];
  const f = await kit.figur('lammet-ludde-v2', { h, forelder: opt.forelder });
  defs(f.g.ownerSVGElement, M);
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
  const DEL = n => `${A}karaktarer/lammet-ludde/premium/cut/ludde-${n}.png`;
  const fotStr = { l: maladStrumpa(fotS.l, DEL('leg-l'), FOT_STR.l, STRUMP_FARG.rosa), r: maladStrumpa(fotS.r, DEL('leg-r'), FOT_STR.r, STRUMP_FARG.rosa) };
  // plaggen (Sanna 2026-11-08: "improve clothes"): hel grund med kritkorn ovanpå, så att ullen inte lyser igenom.
  // Rocken sitter i kroppens siluett (krympt så att den vita kanten syns): v-ringning med slag, knappar, två fickor och ärmar på
  // armarna. Kjolen är en utsvängd a-linje med egen vit kant som går ut över kroppen, linning, prickar och bågad fåll.
  // Båda torkas fram nerifrån (torka = svart rektangel ovanför i masken).
  const silId = `sil-${Math.random().toString(36).slice(2, 7)}`, svgDefs = f.g.ownerSVGElement.querySelector('defs');
  const plagg = {};
  const nyttPlagg = (namn, iKroppen) => {
    const id = `${silId}-${namn}`, m = el('mask', { id, maskUnits: 'userSpaceOnUse', x: -100, y: 0, width: 1224, height: 1024 }, svgDefs);
    if (iKroppen) bild(DEL('body'), m, { filter: 'url(#vitsiluett)' });
    else el('rect', { x: -100, y: 0, width: 1224, height: 1024, fill: '#fff' }, m);
    const torka = el('rect', { x: -100, y: 0, width: 1224, height: 0, fill: '#000' }, m);
    return plagg[namn] = { g: el('g', { mask: `url(#${id})` }, kropp), torka };
  };
  const yta = (g, d, farg, mork) => { el('path', { d, fill: farg }, g); el('path', { d, fill: mork, opacity: 0.4, filter: 'url(#lammkrita)' }, g); };
  const linje = (g, d, farg, w) => el('path', { d, fill: 'none', stroke: farg, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  const ROCK_M = '#2B4377', ROCK_L = '#5774B0', KNAPP = '#F0E8D6';
  const rock = nyttPlagg('rock', true).g;
  yta(rock, 'M-50 548H448L512 616L576 548H1074V1024H-50Z', F.ROCK, ROCK_M);
  for (const s of [1, -1]) {   // slagen
    const x = v => 512 + s * v;
    el('path', { d: `M${x(-72)} 546L${x(0)} 618L${x(-26)} 646L${x(-90)} 574Z`, fill: ROCK_L }, rock);
    linje(rock, `M${x(-72)} 546L${x(0)} 618L${x(-26)} 646L${x(-90)} 574Z`, ROCK_M, 4);
  }
  // polish 2026-11-08: mörkare krita längs rockens nederkant (kroppens form, inom siluetten), så att rocken får volym
  { const [cx, cy] = KROPP.c, pt = v => [cx + KROPP.rx * Math.cos(v * Math.PI / 180), cy + KROPP.ry * Math.sin(v * Math.PI / 180)];
    const [a, b] = [pt(8), pt(172)];
    el('path', { d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)}A${KROPP.rx} ${KROPP.ry} 0 0 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`, fill: 'none', stroke: ROCK_M,
      'stroke-width': 54, opacity: 0.55, filter: 'url(#lammkrita)' }, rock); }
  linje(rock, 'M512 620V840', ROCK_M, 5);
  for (const y of [670, 730, 790]) { el('circle', { cx: 540, cy: y, r: 13, fill: KNAPP }, rock); el('circle', { cx: 540, cy: y, r: 13, fill: 'none', stroke: ROCK_M, 'stroke-width': 3 }, rock); }
  for (const x of [330, 610]) { linje(rock, `M${x} 712V756Q${x} 772 ${x + 16} 772H${x + 70}Q${x + 86} 772 ${x + 86} 756V712`, ROCK_M, 5); linje(rock, `M${x - 4} 712H${x + 90}`, ROCK_M, 6); }
  // kjolen
  const kjol = el('g', {}, nyttPlagg('kjol', false).g);   // inre grupp: kjolen gungar lite runt midjan (pose)
  let fall = 'M236 606Q512 588 788 606L812 818';
  for (let x = 812, i = 0; x > 214; x -= 597 / 8, i++) fall += `Q${(x - 597 / 16).toFixed(1)} 850 ${(x - 597 / 8).toFixed(1)} 818`;
  fall += 'Z';
  el('path', { d: fall, fill: '#fff', stroke: '#fff', 'stroke-width': 20, 'stroke-linejoin': 'round' }, kjol);   // egen vit kant
  yta(kjol, fall, F.KJOL, '#B83A40');
  { const id = `${silId}-fall`, fallKant = fall.slice(fall.indexOf('L812 818') + 1, -1);   // mörkare krita längs den bågade fållen
    el('path', { d: fall }, el('clipPath', { id }, svgDefs));
    el('path', { d: 'M' + fallKant, fill: 'none', stroke: '#B83A40', 'stroke-width': 40, opacity: 0.5, filter: 'url(#lammkrita)', 'clip-path': `url(#${id})` }, kjol); }
  linje(kjol, 'M240 626Q512 608 784 626', '#B83A40', 22);   // linningen
  for (let r = 0; r < 4; r++) for (let x = 290 + (r % 2) * 40; x < 760; x += 80)
    if (r > 0 || (x > 300 && x < 740)) el('circle', { cx: x, cy: 672 + r * 42, r: 9, fill: '#FBEFEF' }, kjol);
  // ärmarna: rockens färg på armen från roten ut till klöven, med en mörkare mudd vid klöven (bakom kroppen, som armarna)
  const armS = {}, arm = {};
  for (const s of 'lr') { armS[s] = el('g', {}); kropp.before(armS[s]); arm[s] = maladStrumpa(armS[s], DEL(`arm-${s}`), ARM_STR[s], [F.ROCK, ROCK_M]); }
  // ulltussarna runt kroppen (TUSSAR i bygg.py: vinkel och avstånd)
  const tg = el('g', {}, kropp), tussar = M.TUSSAR.map(([v, k]) => {
    const r = v * Math.PI / 180, x = KROPP.c[0] + KROPP.rx * k * Math.cos(r), y = KROPP.c[1] + KROPP.ry * k * Math.sin(r);
    const g = el('g', {}, tg); el('use', { href: '#tussform' }, g);
    return { g, x, y };
  });
  const huvud = el('g', {}, inre);
  if (vem === 'mor') {   // en liten rosa rosett vid vänstra örat
    const bx = 345, by = 252, ros = `M${bx} ${by}L${bx - 52} ${by - 36}L${bx - 52} ${by + 36}ZM${bx} ${by}L${bx + 52} ${by - 36}L${bx + 52} ${by + 36}Z`;
    const g = el('g', { 'stroke-linejoin': 'round' }, huvud);
    el('path', { d: ros, fill: '#fff', stroke: '#fff', 'stroke-width': 9 }, g);
    el('circle', { cx: bx, cy: by, r: 20, fill: '#fff' }, g);
    const k = el('g', { filter: 'url(#lammkrita)' }, g);
    el('path', { d: ros, fill: F.ROSETT }, k);
    el('circle', { cx: bx, cy: by, r: 16, fill: F.ROSETT }, k);
  }
  // strumporna på händerna: framför kroppen och armen, i armens grupp (följer armens vinkel), längs armen med klöven i strumpans fot
  // armarna sitter bakom kroppen, så strumporna på händerna också (följer armens vinkel)
  const handS = {}, handStr = {};
  for (const s of 'lr') {
    handS[s] = el('g', {}); kropp.before(handS[s]);
    handStr[s] = maladStrumpa(handS[s], DEL(`arm-${s}`), HAND_STR[s], STRUMP_FARG.bla);
  }
  inre.appendChild(f.ansikte);   // ansiktet överst, över plaggen och tussarna
  inre.appendChild(huvud);

  const l = { vem, f, g: f.g, M }, skugga = markskugga(f.g);
  let sx0 = 0;
  l.pose = (p = {}) => {
    sx0 = p.x ?? sx0;
    skugga({ x: sx0, y: p.y ?? M.GOLV, rx: 245 * f.skala * (p.k ?? 1), golv: M.GOLV, synlig: p.synlig !== false, opacity: p.opacity ?? 1 });
    const sitter = !!p.sitter, hu = HUMOR[p.humor || 'glad'] || {};
    // sitter: hela lammet sjunker (SITT_SJUNK i 1024-rutan) och benen lyfts tillbaka upp, som 'sitter' i uttryck.html
    const y = (p.y ?? M.GOLV) + (sitter ? SITT_SJUNK * f.skala * (p.sy ?? 1) : 0);
    f.pose({ x: p.x, y, tilt: p.tilt, sx: p.sx, sy: p.sy, k: p.k, synlig: p.synlig, opacity: p.opacity, andas: p.andas,
      delar: { 'arm-l': -(p.armL || 0), 'arm-r': -(p.armR || 0), ...(sitter ? SITT_BEN : {}), ...(p.delar || {}) },
      ogon: hu.ogon, mun: p.m > 0 ? Math.min(1, p.m) : hu.mun || 0, ledsen: hu.ledsen,   // m 0 = humörets egen mun
      titt: p.titt ?? hu.titt ?? 0, tittY: p.tittY ?? hu.tittY ?? 0, blink: p.blink ?? auto(kit.nu, fas) });
    // plaggen: torka fram nerifrån (rocken till v-ringningen, kjolen till linningen), ärmarna med rocken
    kjol.setAttribute('transform', `rotate(${(1.2 * Math.sin(kit.nu * 1.8 + fas * 6)).toFixed(2)} 512 606)`);
    for (const [namn, topp] of [['rock', 546], ['kjol', 590]]) {
      const k = clamp(p[namn] || 0), y = lerp(870, topp - 20, k);
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
      armS[s].setAttribute('transform', delar[`arm-${s}`].getAttribute('transform'));
    }
    const sf = p.strumpFot || 0, sh = p.strumpHand || 0;
    arm.l(clamp(p.rock || 0)); arm.r(clamp(p.rock || 0));
    fotStr.l(clamp(sf)); fotStr.r(clamp(sf - 1)); handStr.l(clamp(sh)); handStr.r(clamp(sh - 1));
  };
  // punkter i förälderns koordinater (där lösa tussar och saker ritas)
  const iForalder = (elem, [x, y]) => { const pt = new DOMPoint(x, y).matrixTransform(f.g.parentNode.getCTM().inverse().multiply(elem.getCTM())); return [pt.x, pt.y]; };
  l.punkt = p => iForalder(inre, p);
  l.tussPunkt = i => { const T = tussar[ORDNING[i]]; return iForalder(inre, [T.x, T.y]); };
  l.hand = s => iForalder(delar[`arm-${s}`], HAND[`arm-${s}`]);
  l.fot = s => iForalder(delar[`leg-${s}`], FOT[`leg-${s}`]);
  // var strumpan börjar glida på (k strax över 0), i förälderns koordinater: { c, rot, h }. typ 'hand' | 'sitt', s 'l' | 'r'.
  // En lös strumpa (lamm.sak) med samma mitt, vridning och höjd lämnar över utan skarv (angen-3).
  l.strumpStart = (typ, s) => {   // där den lösa strumpan landar: LANDA ut från mudden längs ramen, i förälderns koordinater
    const [x, y, v] = (typ === 'hand' ? HAND_STR : FOT_STR)[s], g = (typ === 'hand' ? handS : fotS)[s], a = v * Math.PI / 180;
    const ut = d => [x - Math.sin(a) * d, y + Math.cos(a) * d], c = iForalder(g, ut(LANDA)), u = iForalder(g, ut(LANDA + 100));
    const h = LANDA_H * Math.hypot(u[0] - c[0], u[1] - c[1]) / 100;
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
  const g = el('g', {}, parent), tom = sak(SACK_TOM, g), full = sak(SACK_FULL, g), M0 = MATT;
  let senast = null, golv = null;
  M0.then(M => { golv = M.GOLV; });
  const skugga = markskugga(tom.g);
  const s = { g, pose(p = {}) {
    const [x0, y0] = [p.x ?? senast?.x, p.y ?? senast?.y], k = clamp(p.k || 0);
    senast = { x: x0, y: y0 };
    tom.pose({ x: x0, y: y0, h: 80, sx: p.sx, sy: p.sy, rot: p.tilt || 0, synlig: p.synlig !== false && k <= 0 });
    full.pose({ x: x0, y: y0, h: 175 * lerp(0.7, 1, k), sx: p.sx, sy: p.sy, rot: p.tilt || 0, synlig: p.synlig !== false && k > 0 });
    senast.h = 175 * lerp(0.7, 1, k); senast.sx = p.sx ?? 1; senast.sy = p.sy ?? 1;
    if (x0 != null) skugga({ x: x0, y: y0 - 4, rx: (k > 0 ? 0.42 * senast.h : 70) * senast.sx, golv: golv ?? y0 - 4, synlig: p.synlig !== false });
  }, oppning() {   // räknas ur senaste posen (fungerar också när säcken är tom och den fulla bilden är gömd)
    const [, bb] = SACK_FULL, s = senast.h / (bb[3] - bb[1]);
    return [senast.x + (MYNNING[0] - (bb[0] + bb[2]) / 2) * s * senast.sx, senast.y + (MYNNING[1] - bb[3]) * s * senast.sy];
  } };
  return s;
}

// små krit-klistermärken (polish 2026-11-08), samma hand som tussarna: vit kant, hel grund och kritkorn ovanpå
const stjarna = (r, x = 0, y = 0) => `M${x} ${y - r} Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y} Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r} Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y} Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z`;
function gnista(parent, r, x = 0, y = 0) {   // fyruddig gnista: gul krita med ljus mitt
  const g = el('g', { 'stroke-linejoin': 'round' }, parent);
  el('path', { d: stjarna(r, x, y), fill: '#fff', stroke: '#fff', 'stroke-width': (3 + 0.16 * r).toFixed(1) }, g);
  el('path', { d: stjarna(r, x, y), fill: '#F2C94C' }, g);
  el('path', { d: stjarna(r, x, y), fill: '#F7DA74', filter: 'url(#smakrita)' }, g);
  el('path', { d: stjarna(r * 0.5, x, y), fill: '#FFF7D6', filter: 'url(#smakrita)' }, g);
  return g;
}
const HJ_D = 'M0 33 L-28.8 0 A15 15 0 0 1 0 -10.5 A15 15 0 0 1 28.8 0 Z';   // hjärtat i 30-skala (kritkornen får rätt storlek)
function hjarta(parent, farg = '#EC7896', mork = '#C9506F') {   // ett hjärta, 1 enhet stort som slutets gamla: rosa krita, mörkare korn nedtill
  const g = el('g', { transform: 'scale(0.0333)' }, parent);
  el('path', { d: HJ_D, fill: farg }, g);
  el('path', { d: HJ_D, fill: mork, opacity: 0.5, filter: 'url(#smakrita)', transform: 'translate(0 5)' }, g);
  el('ellipse', { cx: -12, cy: -2, rx: 5, ry: 3.4, fill: '#FFE3EA', opacity: 0.85, transform: 'rotate(-35 -12 -2)' }, g);
  return g;
}

window.lamm = { ny, gnista, hjarta, tuss, sack, sak, STRUMPA, HOG, FOT_STR, SACK_TOM, SACK_FULL, ORDNING, matt: () => MATT };
})();
