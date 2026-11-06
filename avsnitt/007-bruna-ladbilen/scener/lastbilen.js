// Bruna lastbilen med Björnen Bulle i, som lastbilen() och ratt() i storyboard/bygg.py (efter 006:s baten.js och 005:s bilen.js).
// Vanligt skript efter kit.js, verktyg/kant.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script><script src="../ansikten.js"></script><script src="../lastbilen.js"></script>
//
//   const M = await kit.manus();   const b = await lastbilen.ny(parent, M);
//   b.pose({ x, y, h, tilt,                 // x = mitten, y = hjulens underkant, h = hela bildens höjd med flaggan (som place() i bygg.py)
//            dist,                          // sträckan lastbilen har kört (px i bild): hjulen snurrar så mycket
//            keps,                          // kepsen trycks ihop 0..1 (kotten studsar på den, vagen-2 06b)
//            glitter,                       // 0..1: stjärnor glittrar runt nallen på flaket
//            kanin,                         // nallen (förut gosekaninen) lyfts så här mycket (px i lastbilens 1024-ruta): gupp på skumpen
//            flagg,                         // flaggan lutar (grader, efterslängar); fladdrar av sig själv
//            humor, titt, tittY, blink, m,  // Bulles ansikte (ansikten.js)
//            r: [x, y], l: [x, y],          // en punkt i Bulles 1024-ruta som armen pekar mot (peka_r/peka_l i bygg.py)
//            tut,                           // 0..1: ratten guppar lite (tutar)
//            tryck, skarm,                  // 0..1: högra tassen trycker på tutknappen / hålls som skärm över ögonen (spanar)
//            rot, lyft, synlig })           // rot = Bulle lutar (grader), lyft = Bulle högre i sätet (px i lastbilens ruta)
// Ratten (Sanna, 2026-11-05, som musens i 005): framifrån, mitt framför Bulles bröst, nedre halvan bakom karossen, tassarna på
// klockan 10 och 2. En arm som pekar uppåt eller ut (målets y ≤ 600 i Bulles ruta) släpper ratten och sticker upp bakom karossens kant
// (aldrig igenom den; högra axeln ligger 100 px under puckeln, så peka högt eller in mot huvudet för att tassen ska synas);
// en arm utan mål eller nedåt (magen, stampet) är vila: tassen på ratten, armen syns inte. Ratten syns alltid, också när båda armarna är uppe (Sanna, 2026-11-05).
//   b.puffa(t, tider)   vita kritpuffar ur avgasröret, tre per tid (efter pose); tider: varannat slag och varje "brum"
//   b.punkt([px, py]) → var en punkt i Bulles 1024-ruta hamnar i bild (efter pose)
//   lastbilen.puffTider(a, b, brum) → varannat slag i [a, b] (scentid, kit.takt) plus brum-tiderna, utan dubbletter
//   lastbilen.ljud(gupp)   hjul-gnissel och kaninens pip för guppen (i scenens bygg())
// Lastbilen vänds och snurras aldrig (2D-urklipp): den lutar bara efter backen (tilt).
// Lagren bakifrån: flaggan → avgasröret och puffarna → Bulle (kropp, keps, ansikte) → ratten med tassarna → armarna som är uppe →
// nallen på flaket → karossen → hjulen. Bilderna: lager/lastbil.png (lastbil-brun-v2 i 1024-rutan, hjulen på HJUL),
// lager/flagga-gron.png, nalle-v10 ur assets/. Måtten (TOPP, BULLE_K/X/Y, HJUL) ur lager/matt.json.
// Vita kanter (Sanna, 2026-11-05: "använd verktyg kant"): verktyg/kant.js. kant.lagg(g) på PNG-sakerna (karossen, flaggan,
// gosekaninen), andel 0,01 på det som ritas i kod (ratten, kepsen, avgasröret); Bulle och armarna får sin av kit.figur.
(() => {
const { el, bild, ROT, del, lerp, mjuk } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
// nallen på flaket (ersätter gosekaninen, Sanna 2026-11-05): nalle-v10 beskuren till sin kant (605 × 898), nosen finns i bilden
const NALLE = `${ROT}assets/rekvisita/nalle/cut/nalle-v10-tat.png`, NALLE_H = 190;
const NALLE_ANSIKTE = { ogon: [[318, 200], [408, 182]], ogonSkala: 1.25, mun: [436, 306], munSkala: 0.95 };   // uppmätt i den beskurna bilden
const HJUL_R = 98, HJUL_KLIPP = 92;   // hjulens radie (bygg.py) och klippcirkeln för det snurrande däcket (innanför den vita kanten)
const VILA = { r: 42.4, l: 137.3 }, PIV = { r: [808, 571], l: [208, 577] };   // Bulles armar (riggen): vridpunkten och riktningen till handen i vila
const RATT_MITT = [512, 700], RATT_R = 150, TASS = '#E2B280';   // ratten i Bulles 1024-ruta och tassarnas ljusbruna (RATT_MITT, ratt() i bygg.py)
const ARM_SK = 1.15;   // armarna som är uppe sträcks så här mycket (axeln ligger under pucklarnas kant)
const peka = (s, p) => Math.atan2(p[1] - PIV[s][1], p[0] - PIV[s][0]) * 180 / Math.PI - VILA[s];
const uppe = p => [...'rl'].filter(s => p[s] && p[s][1] <= 600);   // armar som släpper ratten (bygg.py: peka_* med y ≤ 600)
let n = 0;

const lagg = (g, andel = 0) => window.kant ? kant.lagg(g, { andel }) : g;   // verktyg/kant.js
const storlek = src => new Promise(r => { const i = new Image(); i.onload = () => r([i.naturalWidth, i.naturalHeight]); i.src = src; });

// Kepsens kritkorn (Sanna, 2026-11-05: "more texture to bear hat"): mörkare fläckar som kritan lägger ojämnt och korta ljusa vaxstreck och prickar som i pälsen, bara innanför kepsen
// och en lite ojämn kant. I Bulles 1024-ruta, så kornet följer kepsen i närbild och helbild.
function kepsKorn() {
  const defs = document.querySelector('svg defs');
  if (!defs.querySelector('#kepskorn')) defs.insertAdjacentHTML('beforeend', `
    <filter id="kepskorn" filterUnits="userSpaceOnUse" x="340" y="150" width="340" height="130" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="5" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="5" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.22  0 0 0 0 0.06  -1.2 0 0 0 0.62" result="mork"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.3" numOctaves="2" seed="11" result="s0"/>
      <feDisplacementMap in="s0" in2="v" scale="8" result="s"/>
      <feColorMatrix in="s" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.92  6 0 0 0 -3.9" result="ljus"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.92  0 0 0 9 -6.1" result="prick"/>
      <feMerge result="m"><feMergeNode in="mork"/><feMergeNode in="ljus"/><feMergeNode in="prick"/></feMerge>
      <feComposite in="m" in2="d" operator="in" result="korn"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="korn"/></feMerge>
    </filter>`);
  return 'kepskorn';
}

// Kritkorn på det som annars ritas platt i kod (granskningen 2026-11-05): ratten med tassarna och navet, avgasröret och flaggan.
// Som kepsKorn men i neutrala toner och med regionen efter saken: en lite ojämn kant, mörkare fläckar, ljusa vaxstreck och prickar.
function kritKorn() {
  const defs = document.querySelector('svg defs');
  if (!defs.querySelector('#kritdel')) defs.insertAdjacentHTML('beforeend', `
    <filter id="kritdel" x="-0.1" y="-0.1" width="1.2" height="1.2" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="4" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="5" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  -1.2 0 0 0 0.6" result="mork"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.3" numOctaves="2" seed="11" result="s0"/>
      <feDisplacementMap in="s0" in2="v" scale="8" result="s"/>
      <feColorMatrix in="s" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.95  6 0 0 0 -3.9" result="ljus"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.95  0 0 0 9 -6.1" result="prick"/>
      <feMerge result="m"><feMergeNode in="mork"/><feMergeNode in="ljus"/><feMergeNode in="prick"/></feMerge>
      <feComposite in="m" in2="d" operator="in" result="korn"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="korn"/></feMerge>
    </filter>`);
  return { filter: 'url(#kritdel)' };
}

// Bulle utan ben, med ansikten.js och den gröna kepsen (keps() i bygg.py) i sin 1024-ruta. armar: false = utan armar (kroppen i sätet),
// 'bara' = bara armarna (kopian bakom karossen).
async function bulle(parent, opt = {}, armar = true) {
  const f = await kit.figur('bjornen-bulle', { forelder: parent, ...opt });
  if (!opt.ben) for (const b of ['leg-l', 'leg-r']) f.delar[b].style.display = 'none';   // ben: true = med benen (rutschkanan i refrängen)
  const a = ansikten.iFigur(f);
  const keps = el('g', {}, f.inre), kritKeps = el('g', { filter: `url(#${kepsKorn()})` }, keps);
  el('path', { d: 'M396 229 A116 61 0 0 1 628 229 Z', fill: '#56A048' }, kritKeps);
  el('path', { d: 'M372 230 A140 34 0 0 0 652 230 Z', fill: '#3A7832' }, kritKeps);   // skärmen framåt
  lagg(keps, 0.01);
  if (armar === 'bara') for (const e of [f.kropp, a.g, keps]) e.style.display = 'none';
  // Sanna 2026-11-06 ("work on the arms of bear in the truck"): en uppsträckt arm var bara en brun korv. Nu har den en ljus tass
  // längst ut, samma som tassarna på ratten; tassen följer armens transform (handen i vila: vridpunkten + 138 px i VILA-riktningen)
  const tassar = armar !== 'bara' ? {} : Object.fromEntries([...'rl'].map(s => {
    const v = VILA[s] * Math.PI / 180, hx = PIV[s][0] + 128 * Math.cos(v), hy = PIV[s][1] + 128 * Math.sin(v);
    const e = el('ellipse', { cx: hx, cy: hy, rx: 46, ry: 38, fill: TASS, stroke: '#fff', 'stroke-width': 8 }, f.delar[`arm-${s}`].parentNode);
    return [s, e];
  }));
  const pose0 = f.pose;
  f.pose = (p = {}) => {
    const delar = { ...(p.delar || {}) };
    for (const s of 'rl') if (p[s]) delar[`arm-${s}`] = [peka(s, p[s]), 0, 0, p.armSk || 1];
    pose0({ ...p, delar });
    for (const s of 'rl') f.delar[`arm-${s}`].style.display = armar === false ? 'none' : armar === 'bara' && !(p.uppe || []).includes(s) ? 'none' : '';
    for (const [s, e] of Object.entries(tassar)) { e.style.display = f.delar[`arm-${s}`].style.display; e.setAttribute('transform', f.delar[`arm-${s}`].getAttribute('transform') || ''); }
    a.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink || 0, m: p.m });
    const k = p.keps || 0;   // kepsen trycks ihop (0..1) när något landar på den, runt brättet
    keps.setAttribute('transform', `translate(512 230) scale(${1 + 0.08 * k} ${1 - 0.16 * k}) translate(-512 -230)`);
  };
  f.pose();
  return f;
}

async function ny(parent, M) {
  const { TOPP, HJUL, BIL: { bb } } = M.matt, [BK, BX, BY] = M.matt.BULLE, id = `lastbil${++n}`;
  // place() i bygg.py mäter den vita kantens bbox (vit_kant(15): 7 px utanför bb); y i lastbilens ruta utan TOPP
  const BB = [bb[0] - 7, bb[1] - 7 - TOPP, bb[2] + 7, bb[3] + 7 - TOPP], fot = [(BB[0] + BB[2]) / 2, BB[3]];
  const g = el('g', { id }, parent), inre = el('g', {}, g);
  // flaggan: vrids runt stångens fot
  const [fw, fh] = await storlek(`${LAGER}flagga-gron.png`), fs = 330 / fh;
  // Duken pekar bakåt (vänster), som i fartvinden (Sanna, 2026-11-05): FLAGGA_GR är redan spegelvänd i bygg.py och står på
  // place(FLAGGA_GR, VÄNSTER + 77, 510, 330), stången i flaket vid x 163; duken når förbi bilens bakkant
  const STANG = 163, flaggG = el('g', {}, inre);
  lagg(bild(`${LAGER}flagga-gron.png`, el('g', kritKorn(), flaggG), { x: 77 - fw * fs / 2, y: 510 - 330, width: fw * fs, height: 330 }));
  // avgasröret bak, under flaket, och puffarna ur det (bakom karossen)
  // Sanna 2026-11-05: röret syntes inte bakom hjulet; nu sticker det ut bakom flaket och böjer uppåt, puffarna kommer ur mynningen (-44, 712)
  // Sanna 2026-11-06 ("improve look of avgasrör"): ett runt kritrör i stället för en platt grå bit: mörkare undersida, ljust vaxstreck
  // längs ovansidan, en krage där det kommer ut under flaket och en mörk öppen mynning som pekar uppåt
  { const ror = el('g', kritKorn(), inre), D = 'M150 742 L-14 746 Q-40 746 -44 716', rund = { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' };
    el('path', { d: D, stroke: '#57524E', 'stroke-width': 40, ...rund }, ror);                                   // undersidan (skuggan)
    el('path', { d: D, stroke: '#8E8883', 'stroke-width': 30, transform: 'translate(0 -4)', ...rund }, ror);     // röret
    el('path', { d: 'M132 733 L-10 737 Q-26 737 -31 722', stroke: '#C8C2BB', 'stroke-width': 6, ...rund }, ror);   // ljust vaxstreck
    el('rect', { x: 96, y: 721, width: 22, height: 46, rx: 7, fill: '#6E6863' }, ror);                               // kragen
    el('ellipse', { cx: -44, cy: 712, rx: 24, ry: 11, fill: '#8E8883', stroke: '#57524E', 'stroke-width': 5 }, ror);  // mynningen
    el('ellipse', { cx: -44, cy: 712, rx: 14, ry: 5.5, fill: '#2E2A28' }, ror);
    lagg(ror, 0.01); }
  const puffG = el('g', { filter: 'url(#kritkant)' }, inre), puffar = [];
  // Bulle i det öppna sätet: hans (512, 833) i 1024-bilden på (BULLE_X, BULLE_Y), skala BULLE_K; kit.figur mäter från fötterna (509, 926)
  const bulleG = el('g', {}, inre);
  const bu = await bulle(bulleG, { s: BK }, false);
  const BULLE_FOT = [BX + (bu.fot[0] - 512) * BK, BY + (bu.fot[1] - 833) * BK];
  // ratten (ratt() i bygg.py): mörkgrå kritring med ekrar, grön tutknapp och tassarna på klockan 10 och 2, framför bröstet
  const RR = RATT_R * BK, ratt = el('g', {}, bulleG), rattKorn = el('g', kritKorn(), ratt), tass = {};
  rattKorn.innerHTML = `<circle r="${RR}" fill="none" stroke="#4B4542" stroke-width="${0.24 * RR}"/>
    <path d="M${-RR} 0 H${RR} M0 0 V${RR}" stroke="#4B4542" stroke-width="${0.16 * RR}" stroke-linecap="round"/>
    <circle r="${0.27 * RR}" fill="#60AA50"/>`;
  for (const [s, sida, v] of [['r', 1, 30], ['l', -1, -30]])
    tass[s] = el('ellipse', { cx: 0, cy: 0, rx: 0.375 * RR, ry: 0.285 * RR, fill: TASS, transform: `translate(${sida * 0.75 * RR} ${-0.6 * RR}) rotate(${v})` }, rattKorn);
  // högra tassens lägen i rattens ruta: på ratten (klockan 2), på tutknappen, som skärm ovanför ögonen (Bulles (590, 300))
  const TASS_R = { vila: [0.75 * RR, -0.6 * RR, 30], tryck: [0.1 * RR, -0.05 * RR, 10], skarm: [(590 - RATT_MITT[0]) * BK, (300 - RATT_MITT[1]) * BK, -12] };
  lagg(ratt, 0.01);
  // armarna som är uppe (Sanna, 2026-11-05: armarna krockade med lastbilen): bakom karossen, framför ratten, så att de sticker upp
  // bakom kanten i stället för att gå igenom den; sträckta (ARM_SK) så att tassen når upp över pucklarna. En kopia av Bulle med bara armarna
  const armG = el('g', {}, inre);
  const ba = await bulle(armG, { s: BK }, 'bara');
  // nallen på flaket (mitt 325, fötterna 520), bakom karossen så att fötterna är i flaket, med kodögon. p.kanin lyfter den
  const [kw, kh0] = await storlek(NALLE), ks = NALLE_H / kh0;
  const kaninG = el('g', {}, inre), kaninInre = el('g', { transform: `translate(${325 - kw / 2 * ks} ${520 - NALLE_H}) scale(${ks})` }, kaninG);
  lagg(bild(NALLE, kaninInre, { width: kw, height: kh0 }));
  const kaninFace = ansikten.bygg(kaninInre, NALLE_ANSIKTE);
  lagg(bild(`${LAGER}lastbil.png`, inre));
  inre.appendChild(armG);   // v5 (2026-11-06): hytten har tak, så armarna som är uppe sticker ut genom fönstret framför karossen, som i bygg.py
  // glitter runt nallen (Sanna 2026-11-06: "nallen är brun" 1:32): vita fyruddiga stjärnor framför karossen, p.glitter 0..1
  const GLITTER = [[-125, -80, 44], [105, -120, 50], [140, 10, 38], [-140, 50, 34], [5, -170, 40], [-45, -20, 26]];
  const glitterG = el('g', {}, inre), stjarnor = GLITTER.map(([, , r]) => {
    const g2 = el('g', {}, glitterG), k = r * 0.28;
    el('path', { d: `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`, fill: '#fff', stroke: '#FFE7A8', 'stroke-width': 3 }, g2);
    return g2;
  });
  // hjulen: däcket klipps ur lastbil.png och snurrar ovanpå (samma bild, så det syns bara på kritkornen och navet)
  const hjul = HJUL.map(([hx, hy], i) => {
    const cid = `${id}-hjul${i}`;
    el('circle', { cx: hx, cy: hy, r: HJUL_KLIPP }, el('clipPath', { id: cid }, document.querySelector('svg defs')));
    const hg = el('g', { 'clip-path': `url(#${cid})` }, inre), rot = el('g', {}, hg);
    bild(`${LAGER}lastbil.png`, rot);
    // en ljus kritprick på däcket, så att snurren syns (navet är runt och mitt i)
    el('circle', { cx: hx + 58, cy: hy, r: 9, fill: '#8C8C90', opacity: 0.8 }, rot);
    return { rot, hx, hy };
  });
  const b = { id, g, bulle: bu, BB };
  b.pose = (p = {}) => {
    const s = (p.h ?? 580) / (BB[3] - BB[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('transform', `translate(${p.x ?? 470} ${p.y ?? 742}) rotate(${p.tilt || 0}) scale(${s}) translate(${-fot[0]} ${-fot[1]})`);
    const v = (p.dist || 0) / (HJUL_R * s) * 180 / Math.PI;
    hjul.forEach(h => h.rot.setAttribute('transform', `rotate(${v.toFixed(2)} ${h.hx} ${h.hy})`));
    const fladder = 1 - 0.08 * Math.abs(Math.sin(kit.nu * 2 * Math.PI * 1.6));
    flaggG.setAttribute('transform', `translate(${STANG} 510) rotate(${(p.flagg || 0).toFixed(2)}) scale(${fladder.toFixed(3)} 1) translate(${-STANG} -510)`);
    kaninG.setAttribute('transform', `translate(0 ${(-(p.kanin || 0)).toFixed(2)}) rotate(${(-(p.kanin || 0) * 0.15).toFixed(2)} 350 520)`);
    kaninFace.satt('glad', { blink: p.kaninBlink || 0 });
    const gl = p.glitter || 0;   // en stjärna i taget poppar upp och snurrar ett kvarts varv, om och om under glittret
    stjarnor.forEach((g2, i) => {
      const [dx, dy] = GLITTER[i], u = (gl * 2.2 - 0.12 * i), k = u > 0 && gl < 1 ? u % 1 : 0, sk = Math.sin(Math.PI * k);
      g2.style.display = sk > 0.01 ? '' : 'none';
      g2.setAttribute('transform', `translate(${325 + dx} ${(425 + dy - (p.kanin || 0)).toFixed(1)}) rotate(${(45 * k).toFixed(1)}) scale(${sk.toFixed(3)})`);
    });
    const vrid = `rotate(${-(p.rot || 0)} ${BX} ${BY - 60})`;
    bulleG.setAttribute('transform', vrid); armG.setAttribute('transform', vrid);
    const up = uppe(p), q = { ...p, x: BULLE_FOT[0], y: BULLE_FOT[1] - (p.lyft || 0), s: BK, k: 1, tilt: 0, sx: 1, sy: 1, h: undefined, synlig: true, opacity: 1, uppe: up, armSk: ARM_SK };
    for (const sd of 'rl') { if (!up.includes(sd)) delete q[sd]; tass[sd].style.display = up.includes(sd) ? 'none' : ''; }
    { const tr = p.tryck || 0, sk = p.skarm || 0, [a, b, c] = TASS_R.vila.map((v, i) => v + (TASS_R.tryck[i] - v) * tr + (TASS_R.skarm[i] - v) * sk);
      tass.r.setAttribute('transform', `translate(${a.toFixed(1)} ${b.toFixed(1)}) rotate(${c.toFixed(1)}) scale(${1 + 0.15 * sk})`); }
    const [rx, ry] = [BX + (RATT_MITT[0] - 512) * BK, BY + (RATT_MITT[1] - 833) * BK - (p.lyft || 0) - 4 * (p.tut || 0)];
    ratt.setAttribute('transform', `translate(${rx} ${ry.toFixed(2)})`);
    bu.pose(q); ba.pose(q);
  };
  b.punkt = pt => bu.punkt(pt);
  b.puffa = (t, tider) => {   // växer ut ur röret, driver bakåt och uppåt och krymper bort (som 005:s bil)
    while (puffar.length < tider.length * 3) puffar.push(el('circle', { fill: '#fff', stroke: '#e4ddd2', 'stroke-width': 7 }, puffG));
    puffar.forEach((c, j) => {
      const i = j % 3, a = tider[(j - i) / 3] + i * 0.15, u = del(a, a + 0.9, t), syns = u > 0 && u < 1;
      c.style.display = syns ? '' : 'none';
      if (!syns) return;
      c.setAttribute('r', lerp(22, 92 - i * 14, Math.sqrt(u)) * (1 - mjuk(del(0.65, 1, u))));
      c.setAttribute('cx', -44 - 300 * u); c.setAttribute('cy', 712 - 170 * u + 14 * Math.sin(u * 5 + i));
    });
  };
  b.pose();
  return b;
}

// Ljud för guppen (ljud.md, Fler effekter): hjul-gnissel mycket lågt på varannan gupp, och kaninen piper lågt någon gång ibland
// (var fjärde gupp). gupp = scentider då lastbilen skumpar; läggs med kit.ljud i scenens bygg().
function ljud(gupp) {
  [...gupp].sort((a, b) => a - b).forEach((t, i) => {
    if (i % 2 === 0) kit.ljud('hjul-gnissel', t + 0.02, { vol: 0.08, langd: 0.4, fade: 0.15 });
    if (i % 4 === 1) kit.ljud('pip', t + 0.12, { vol: 0.12 });   // pip saknas än (tyst tills filen finns)
  });
}

// Puffarnas tider: varannat slag i [a, b] och en på varje brum (brum-slag som redan har en puff hoppar över)
function puffTider(a, b, brum = []) {
  const ut = [...brum];
  for (let x = kit.takt(a); x < b; x += 2 * kit.BEAT) if (x >= a && !brum.some(y => Math.abs(y - x) < 0.6)) ut.push(x);
  return ut.sort((p, q) => p - q);
}

window.lastbilen = { ny, bulle, peka, puffTider, ljud, kritKorn, NALLE, NALLE_ANSIKTE };   // nallen också i ikonrad.js
})();
