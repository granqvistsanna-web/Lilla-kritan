// Bruna lastbilen med Björnen Bulle i, som lastbilen() och ratt() i storyboard/bygg.py (efter 006:s baten.js och 005:s bilen.js).
// Vanligt skript efter kit.js, verktyg/kant.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script><script src="../ansikten.js"></script><script src="../lastbilen.js"></script>
//
//   const M = await kit.manus();   const b = await lastbilen.ny(parent, M);
//   b.pose({ x, y, h, tilt,                 // x = mitten, y = hjulens underkant, h = hela bildens höjd med flaggan (som place() i bygg.py)
//            dist,                          // sträckan lastbilen har kört (px i bild): hjulen snurrar så mycket
//            keps,                          // kepsen trycks ihop 0..1 (kotten studsar på den, vagen-2 06b)
//            glitter,                       // 0..1: stjärnor glittrar runt nallen på flaket
//            tom,                           // true: tomt säte (Bulle och tassarna borta, ratten kvar)
//            ror,                           // 0..1 (förval 1, #29): avgasröret syns; 0 när bilen står parkerad (puffar bara när den kör)
//            kanin,                         // nallen (förut gosekaninen) lyfts så här mycket (px i lastbilens 1024-ruta): gupp på skumpen
//            nalle: { humor, m },           // nallens uttryck (ansikten.js), t.ex. ur lastbilen.nalleUttryck(); annars glad
//            styr,                          // 0..1 (förval 0, Sanna #22 "less arms movements"): ratten vrids lite i takt
//            flagg,                         // flaggan lutar (grader, efterslängar); fladdrar av sig själv
//            humor, titt, tittY, blink, m,  // Bulles ansikte (ansikten.js)
//            r: [x, y], l: [x, y],          // en punkt i Bulles 1024-ruta som armen pekar mot (peka_r/peka_l i bygg.py)
//            tut,                           // 0..1: ratten guppar lite (tutar)
//            tryck,                         // 0..1: högra tassen trycker ner på ratten (v2, 2026-11-08; skarm finns inte längre)
//            rot, lyft, synlig })           // rot = Bulle lutar (grader), lyft = Bulle högre i sätet (px i lastbilens ruta)
// Ratten (Sanna, 2026-11-05, som musens i 005): framifrån, mitt framför Bulles bröst, nedre halvan bakom karossen, tassarna på
// klockan 10 och 2. En arm som pekar uppåt eller ut (målets y ≤ 600 i Bulles ruta) släpper ratten och sticker upp bakom karossens kant
// (aldrig igenom den; högra axeln ligger 100 px under puckeln, så peka högt eller in mot huvudet för att tassen ska synas);
// en arm utan mål eller nedåt (magen, stampet) är vila: tassen på ratten (v2: armen framför kroppen och ratten). Ratten syns alltid, också när båda armarna är uppe (Sanna, 2026-11-05).
//   b.puffa(t, tider)   vita kritpuffar ur avgasröret, tre per tid (efter pose); tider: varannat slag och varje "brum"
//   b.punkt([px, py]) → var en punkt i Bulles 1024-ruta hamnar i bild (efter pose)
//   lastbilen.puffTider(a, b, brum) → varannat slag i [a, b] (scentid, kit.takt) plus brum-tiderna, utan dubbletter
//   lastbilen.ljud(gupp)   hjul-gnissel och kaninens pip för guppen (i scenens bygg())
//   lastbilen.nalleUttryck(t, { glad: [tider], oj: [tider] }) → { humor, m }: nallen kisar glatt ^ ^ på glad-tiderna ("hurra", "mums")
//       och blir rund i ögonen med en liten o-mun på oj-tiderna ("wiii", droppar), ett uttryck i taget, 1,6 s var, minst 3 s isär (#24)
//   lastbilen.armUpp(t, a, b) → 0..1, mjukt utan överslag: armen lyfts på slaget a och sänks till b (lerpa armens mål med den)
// Lastbilen vänds och snurras aldrig (2D-urklipp): den lutar bara efter backen (tilt).
// Lagren bakifrån: flaggan → avgasröret och puffarna → Bulle (kropp, keps, ansikte) → ratten med tassarna → armarna som är uppe →
// nallen på flaket → karossen → hjulen. Bilderna: lager/lastbil.png (lastbil-brun-v2 i 1024-rutan, hjulen på HJUL),
// lager/flagga-gron.png, nalle-v10 ur assets/. Måtten (TOPP, BULLE_K/X/Y, HJUL) ur lager/matt.json.
// Vita kanter (Sanna, 2026-11-05: "använd verktyg kant"): verktyg/kant.js. kant.lagg(g) på PNG-sakerna (karossen, flaggan,
// gosekaninen), andel 0,01 på det som ritas i kod (ratten, kepsen, avgasröret); Bulle och armarna får sin av kit.figur.
(() => {
const { el, bild, ROT, del, lerp, mjuk } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
// Nallens ansikte i v2-stil (Sanna 2026-11-08: "teddy needs work"; v2-nallen nalle-v2-ljus.png är ansiktslös, 848 × 856, tittar lite åt höger):
// en ljus nosfläck med nos, svarta ovala ögon med glans (en tunn ljus kant så att de syns mot den mörka pälsen), rosa kinder och ett leende.
// nalleAnsikte(parent).satt(humor, { blink, titt, m }): humor 'glad' | 'happy' (^ ^) | 'forvanad' (runda ögon, o-mun, m öppnar).
// Ljusa nallen (Sanna 2026-11-08: "use the light teddy"): nalle-v2-ljus.png, framifrån, huvudet x 215–635, y 85–410.
const NALLE_V2 = { ogon: [[352, 246], [498, 246]], kinder: [[306, 304, 28, 17], [544, 304, 28, 17]], nos: [425, 300], mun: [425, 338] };
function nalleAnsikte(parent) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  parent.appendChild(g);
  const satt = (humor = 'glad', o = {}) => {
    const glad = humor === 'happy', oj = humor === 'forvanad', bl = oj ? 0 : o.blink || 0, tx = 8 * (o.titt || 0), st = oj ? 1.2 : 1, [mx, my] = NALLE_V2.mun;
    const [nx, ny] = NALLE_V2.nos;
    g.innerHTML = `<ellipse cx="${nx}" cy="${ny + 14}" rx="70" ry="52" fill="#F1DFC1"/><ellipse cx="${nx}" cy="${ny}" rx="20" ry="14" fill="#3a1d12"/>`
      + (oj ? '' : `<path d="M${nx} ${ny + 12} L${nx} ${ny + 26}" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`)
      + NALLE_V2.kinder.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ec8f96" opacity="${glad ? 0.95 : 0.8}"/>`).join('')
      + NALLE_V2.ogon.map(([x, y], i) => glad
        ? `<path d="M${x - 20} ${y + 6} Q${x} ${y - 18} ${x + 20} ${y + 6}" fill="none" stroke="#f3e6d6" stroke-width="12" stroke-linecap="round"/><path d="M${x - 20} ${y + 6} Q${x} ${y - 18} ${x + 20} ${y + 6}" fill="none" stroke="#140c08" stroke-width="7" stroke-linecap="round"/>`
        : `<g transform="translate(${x + tx} ${y}) scale(${st * (i ? 0.92 : 1)} ${st * (1 - 0.92 * bl)})"><ellipse rx="19" ry="26" fill="#140c08" stroke="#f3e6d6" stroke-width="3"/><circle cx="-6" cy="-10" r="7" fill="#fff"/></g>`).join('')
      + (oj ? `<ellipse cx="${mx}" cy="${my + 4}" rx="9" ry="${8 + 10 * (o.m ?? 0.3)}" fill="#7a2a1c"/>`
            : `<path d="M${mx - 22} ${my - 6} Q${mx - 11} ${my + 6} ${mx} ${my - 4} Q${mx + 11} ${my + 6} ${mx + 22} ${my - 6}" fill="none" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`);
  };
  satt();
  return { g, satt };
}
// nallen på flaket (ersätter gosekaninen, Sanna 2026-11-05): nalle-v10 beskuren till sin kant (605 × 898), nosen finns i bilden
const NALLE = `${ROT}assets/rekvisita/nalle/cut/nalle-v2-ljus.png`, NALLE_H = 215;   // v2-nallen (Sanna 2026-11-08, original/nalle-v2-mork.jpg), 848 × 856 med 30 px luft, kanten i bilden
// Nallens liv (Sanna 2026-11-06: "add blinks and slight movement life to teddy bear overall"), samma överallt där nallen syns.
// nalleLiv(t, fas) → { blink 0..1, andas −1..1, titt 0..1 }: blinkar oregelbundet var 3–5 s, andas lugnt (3,2 s),
// och tittar då och då (var 10–15 s, i 1,4 s) åt Bulle. fas skiljer två nallar åt. Ren funktion av t (render ska vara det).
const slump = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function nalleLiv(t, fas = 0) {
  let blink = 0, titt = 0;
  for (let i = 0, b = 0.8 + fas; b < t + 1; b += 3 + 2 * slump(i + fas * 7), i++) if (t >= b && t < b + 0.22) blink = Math.min(1, 2.5 * Math.sin(Math.PI * (t - b) / 0.22));   // 0,22 s, helt stängd mitt i (QA: 0,14 s syntes inte)
  for (let i = 0, b = 4 + 3 * slump(fas + 50); b < t + 2; b += 10 + 5 * slump(i + 90 + fas), i++) {   // var 10–15 s (#24)
    const u = (t - b) / 1.4; if (u > 0 && u < 1) titt = Math.sin(Math.PI * u) ** 0.5;
  }
  return { blink, andas: Math.sin(2 * Math.PI * (t / 3.2 + fas)), titt };
}
// Lastbilen i art direction v2 (Sanna 2026-11-08, skiss: v6b, "make truck large"): lager/lastbil.png ur lager/gor-lastbil-v2.py,
// 1150 bred i lastbilens ruta (hjulens underkant y 824 som förut), duken LASTBIL_OX bredare på var sida. Öppen bil utan tak:
// sätesryggen bakom Bulle, sidan (y > FRAM_Y) och huven (x > HUV_X) ritas en gång till framför honom (fram), nallen står i flaket.
const SKALA_V2 = 0.8;   // hela bilen med Bulle i 80 %, så att Bulles huvud ryms under plattans överkant i närbilderna
const LASTBIL_OX = 150, LASTBIL = { x: -LASTBIL_OX, width: 1024 + 2 * LASTBIL_OX, height: 1024 };
const HJUL_V2 = [[209, 692], [800.3, 692]], HJUL_R = 132.6, HJUL_KLIPP = 125;   // hjulen och klippcirkeln för det snurrande däcket
const BK_V2 = 0.46, FRAM_Y = 381, HUV_X = 749, BULLE_V2 = [634, FRAM_Y - 14 + 133 * BK_V2];   // Bulle lite större (Sanna: "make bulle a bit bigger", var 0,40); hans (512, 833) mitt i sätet; kodratten (512, 700) strax över sidans kant ("place steering wheel better"), så att nedre halvan är bakom sidan som en instrumentbräda
const NF = [190, 435], STANG_DX = -143, STANG_DY = -130;   // nallens fötter i flaket; flaggstången flyttad in i flakets bakkant
const VILA = { r: 42.4, l: 137.3 }, PIV = { r: [808, 571], l: [208, 577] };   // Bulles armar (riggen): vridpunkten och riktningen till handen i vila
const RATT_MITT = [512, 700], RATT_R = 150, RATT = `${ROT}assets/stiltest-premium/bil/cut/ratt.png`;   // ratten i Bulles 1024-ruta (RATT_MITT, ratt() i bygg.py)
const VILA_NER = { r: [852, 666], l: [164, 672] };   // vilande arm: 65° under vågrätt, nära kroppen som i bjornen-bulle.png
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
    <filter id="kepskorn" filterUnits="userSpaceOnUse" x="340" y="110" width="340" height="180" color-interpolation-filters="sRGB">
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

// Bulle i art direction v2 (Sanna 2026-11-08): v2.figur('bjornen-bulle') (v2.js, samma API som kit.figur hade) plus den gröna kepsen
// i kod, 22 px lägre än i v1 (v2-huvudets topp y 213). armar: false = utan armar (kroppen i sätet), 'bara' = bara armarna i p.uppe.
// p.keps (0..1) trycker ihop kepsen.
async function bulle(parent, opt = {}, armar = true) {
  const f = await v2.figur('bjornen-bulle', parent, opt, armar);
  const keps = el('g', {}, f.fig.querySelector('.kropp')), kepsInre = el('g', {}, el('g', { transform: 'translate(0 22)' }, keps)), kritKeps = null;
  // ingen hatt (Sanna 2026-11-08: "hat on bear dont look great, can we remove it"): kepsInre står tom, p.keps gör inget
  const pose0 = f.pose;
  f.pose = (p = {}) => {
    pose0(p);
    const k = p.keps || 0;   // kepsen trycks ihop (0..1) när något landar på den, runt brättet
    kepsInre.setAttribute('transform', `translate(512 230) scale(${1 + 0.08 * k} ${1 - 0.16 * k}) translate(-512 -230)`);
  };
  f.pose();
  return f;
}

async function ny(parent, M) {
  M.matt.BULLE[0] = BK_V2 * SKALA_V2;   // scenerna läser Bulles skala i sätet ur M.matt.BULLE[0] (kamerorna, ängens hopp)
  const { TOPP, BIL: { bb } } = M.matt, BK = BK_V2, [BX, BY] = BULLE_V2, HJUL = HJUL_V2, id = `lastbil${++n}`;
  // place() i bygg.py mäter den vita kantens bbox (vit_kant(15): 7 px utanför bb); y i lastbilens ruta utan TOPP
  const BB = [bb[0] - 7, bb[1] - 7 - TOPP, bb[2] + 7, bb[3] + 7 - TOPP], fot = [(BB[0] + BB[2]) / 2, BB[3]];
  const g = el('g', { id }, parent), inre = el('g', {}, g);
  // flaggan: vrids runt stångens fot
  const [fw, fh] = await storlek(`${LAGER}flagga-gron.png`), fs = 330 / fh;
  // Duken pekar bakåt (vänster), som i fartvinden (Sanna, 2026-11-05): FLAGGA_GR är redan spegelvänd i bygg.py och står på
  // place(FLAGGA_GR, VÄNSTER + 77, 510, 330), stången i flaket vid x 163; duken når förbi bilens bakkant
  const STANG = 163, flaggG = el('g', {}, el('g', { transform: `translate(${STANG_DX} ${STANG_DY})`, style: 'display:none' }, inre)   /* ingen flagga på v2-lastbilen (Sanna 2026-11-08: "skip flag") */);
  lagg(bild(`${LAGER}flagga-gron.png`, el('g', kritKorn(), flaggG), { x: 77 - fw * fs / 2, y: 510 - 330, width: fw * fs, height: 330 }));
  // avgasröret bak, under flaket, och puffarna ur det (bakom karossen)
  // Sanna 2026-11-05: röret syntes inte bakom hjulet; nu sticker det ut bakom flaket och böjer uppåt, puffarna kommer ur mynningen (-44, 712; sedan #29 690)
  // Sanna 2026-11-06 ("improve look of avgasrör"): ett runt kritrör i stället för en platt grå bit: mörkare undersida, ljust vaxstreck
  // längs ovansidan, en krage där det kommer ut under flaket och en mörk öppen mynning som pekar uppåt
  // Sanna 2026-11-06 #29 ("attach it to the flak"): röret ligger 22 högre så ovansidan går in bakom flakets underkant, och
  // framänden böjer upp in bakom karossen (ingen glipa, ingen krage). Mynningen (-44, 690). p.ror (0..1) tonar bort det när bilen står
  const ROR_FLYTT = 'translate(-40 -40)';   // v2-lastbilen: röret och puffarna in under den större bilens bakände
  const ror = el('g', { ...kritKorn(), transform: ROR_FLYTT }, inre);
  { const D = 'M150 680 L150 702 Q150 720 132 720 L-14 722 Q-40 722 -44 694', rund = { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' };
    el('path', { d: D, stroke: '#57524E', 'stroke-width': 40, ...rund }, ror);                                   // undersidan (skuggan)
    el('path', { d: D, stroke: '#8E8883', 'stroke-width': 30, transform: 'translate(0 -4)', ...rund }, ror);     // röret
    el('path', { d: 'M126 711 L-10 713 Q-26 713 -31 700', stroke: '#C8C2BB', 'stroke-width': 6, ...rund }, ror);   // ljust vaxstreck
    el('ellipse', { cx: -44, cy: 690, rx: 24, ry: 11, fill: '#8E8883', stroke: '#57524E', 'stroke-width': 5 }, ror);  // mynningen
    el('ellipse', { cx: -44, cy: 690, rx: 14, ry: 5.5, fill: '#2E2A28' }, ror);
    lagg(ror, 0.01); }
  const puffG = el('g', { filter: 'url(#kritkant)', transform: ROR_FLYTT }, inre), puffar = [];
  bild(`${LAGER}lastbil.png`, inre, LASTBIL);   // hela bilen (kanten finns i bilden): flaket, sätesryggen bakom Bulle
  // Bulle i det öppna sätet: hans (512, 833) i 1024-bilden på (BULLE_X, BULLE_Y), skala BULLE_K; kit.figur mäter från fötterna (509, 926)
  const bulleG = el('g', {}, inre);
  const bu = await bulle(bulleG, { s: BK }, false);
  const BULLE_FOT = [BX + (bu.fot[0] - 512) * BK, BY + (bu.fot[1] - 833) * BK];
  // ratten (art direction v2, Sanna 2026-11-08: "truck steering wheel needs work"): v2-ratten ur bilscenen
  // (stiltest-premium/bil/cut/ratt.png, ringen r 150 i Bulles ruta på RATT_MITT, kanten ca 6 px i bild) i en egen armkopia av Bulle (grepp):
  // ratten framför kroppen och v2-armarna framför ratten, i posen "magen" (armar −75°, klapp 70), som lägger tassarna på klockan 10 och 2.
  // En arm som är uppe syns i stället i kopian framför karossen (ba). p.tryck trycker högra tassen ner på ratten.
  const grepp = await bulle(bulleG, { s: BK }, 'bara');
  const RK = RATT_R / ((1431 - 144) / 2), ratt = el('g', {});
  grepp.inre.insertBefore(ratt, grepp.fig);
  bild(RATT, ratt, { x: -1431 * RK / 2, y: -1459 * RK / 2, width: 1431 * RK, height: 1459 * RK });
  // armarna som är uppe (Sanna, 2026-11-05: armarna krockade med lastbilen): bakom karossen, framför ratten, så att de sticker upp
  // bakom kanten i stället för att gå igenom den; sträckta (ARM_SK) så att tassen når upp över pucklarna. En kopia av Bulle med bara armarna
  const armG = el('g', {}, inre);
  const ba = await bulle(armG, { s: BK }, 'bara');
  // nallen på flaket (mitt 325, fötterna 520), bakom karossen så att fötterna är i flaket, med kodögon. p.kanin lyfter den
  const [kw, kh0] = await storlek(NALLE), ks = NALLE_H / kh0;
  const kaninG = el('g', {}, inre), kaninInre = el('g', { transform: `translate(${NF[0] - kw / 2 * ks} ${NF[1] - NALLE_H}) scale(${ks})` }, kaninG);
  bild(NALLE, kaninInre, { width: kw, height: kh0 });   // v2: kanten finns i bilden
  const kaninFace = nalleAnsikte(kaninInre);
  const fid = `${id}-fram`, fc = el('clipPath', { id: fid }, document.querySelector('svg defs'));
  el('rect', { x: -400, y: FRAM_Y, width: 1900, height: 900 }, fc); el('rect', { x: HUV_X, y: -400, width: 900, height: 900 }, fc);
  bild(`${LAGER}lastbil.png`, el('g', { 'clip-path': `url(#${fid})` }, inre), LASTBIL);   // fram: sidan och huven framför Bulle
  inre.appendChild(armG);   // v5 (2026-11-06): hytten har tak, så armarna som är uppe sticker ut genom fönstret framför karossen, som i bygg.py
  // glitter runt nallen (Sanna 2026-11-06: "nallen är brun" 1:32): vita fyruddiga stjärnor framför karossen, p.glitter 0..1
  const GLITTER = [[-125, -80, 44], [105, -120, 50], [140, 10, 38], [-140, 50, 34], [5, -170, 40], [-175, -150, 26]];   // sjätte stjärnan utanför nallen (vagen-2 QA 2026-11-06: den låg över huvudet)
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
    bild(`${LAGER}lastbil.png`, rot, LASTBIL);
    // en ljus kritprick på däcket, så att snurren syns (navet är runt och mitt i)
    el('circle', { cx: hx + 0.78 * HJUL_R, cy: hy, r: 11, fill: '#8C8C90', opacity: 0.8 }, rot);
    return { rot, hx, hy };
  });
  const b = { id, g, bulle: bu, BB };
  b.pose = (p = {}) => {
    puffar.forEach(c => (c.style.display = 'none'));   // #23: puffarna ritas bara om b.puffa anropas i samma bildruta (inga kvarglömda)
    const s = SKALA_V2 * (p.h ?? 580) / (BB[3] - BB[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('transform', `translate(${p.x ?? 470} ${p.y ?? 742}) rotate(${p.tilt || 0}) scale(${s}) translate(${-fot[0]} ${-fot[1]})`);
    const v = (p.dist || 0) / (HJUL_R * s) * 180 / Math.PI;
    hjul.forEach(h => h.rot.setAttribute('transform', `rotate(${v.toFixed(2)} ${h.hx} ${h.hy})`));
    const fladder = 1 - 0.08 * Math.abs(Math.sin(kit.nu * 2 * Math.PI * 1.6));
    flaggG.setAttribute('transform', `translate(${STANG} 510) rotate(${(p.flagg || 0).toFixed(2)}) scale(${fladder.toFixed(3)} 1) translate(${-STANG} -510)`);
    // nallen: lyft och lutning i guppen (p.kanin), lugn andning från fötterna, blinkar och tittar ibland åt Bulle (till höger)
    const liv = nalleLiv(kit.nu || 0, 0.37), kn = p.kanin || 0;
    // (Sanna 2026-11-06 "teddy expressions come alive"): lutar huvudet mot Bulle när den tittar dit, och studsar (sträcks) lite i guppen
    const nl = p.nalle || {}, studs = 1 + 0.006 * kn;
    kaninG.setAttribute('transform', `translate(0 ${(-kn).toFixed(2)}) rotate(${(-kn * 0.4 + 1.2 * liv.andas + 5 * liv.titt).toFixed(2)} ${NF[0]} ${NF[1]}) translate(${NF[0]} ${NF[1]}) scale(${(1 / Math.sqrt(studs)).toFixed(4)} ${(studs + 0.018 * liv.andas).toFixed(4)}) translate(${-NF[0]} ${-NF[1]})`);
    kaninFace.satt(nl.humor || 'glad', { blink: nl.humor === 'forvanad' ? 0 : Math.max(p.kaninBlink || 0, liv.blink), titt: 0.9 * liv.titt, m: nl.m });
    const gl = p.glitter || 0;   // en stjärna i taget poppar upp och snurrar ett kvarts varv, om och om under glittret
    stjarnor.forEach((g2, i) => {
      const [dx, dy] = GLITTER[i], u = (gl * 2.2 - 0.12 * i), k = u > 0 && gl < 1 ? u % 1 : 0, sk = Math.sin(Math.PI * k);
      g2.style.display = sk > 0.01 ? '' : 'none';
      g2.setAttribute('transform', `translate(${NF[0] + dx} ${(NF[1] - 100 + dy - (p.kanin || 0)).toFixed(1)}) rotate(${(45 * k).toFixed(1)}) scale(${sk.toFixed(3)})`);
    });
    const vrid = `rotate(${-(p.rot || 0)} ${BX} ${BY - 60})`;
    bulleG.setAttribute('transform', vrid); armG.setAttribute('transform', vrid);
    const up = uppe(p), q = { ...p, x: BULLE_FOT[0], y: BULLE_FOT[1] - (p.lyft || 0), s: BK, k: 1, tilt: 0, sx: 1, sy: 1, h: undefined, synlig: true, opacity: 1, uppe: up, armSk: ARM_SK };
    for (const sd of 'rl') if (!up.includes(sd)) delete q[sd];
    // styrning (av som förval sedan #22): ratten vrids ±3° i takt (två slag åt varje håll), tassarna följer med,
    // stilla när tassen trycker eller armarna är uppe
    const tr = p.tryck || 0, styr = (p.styr ?? 0) * (1 - tr) * (up.length ? 0 : 1);
    const vridR = 3 * styr * Math.sin(Math.PI * ((kit.nu || 0) - kit.BEAT0) / (2 * kit.BEAT));
    ratt.setAttribute('transform', `translate(${RATT_MITT[0]} ${(RATT_MITT[1] - 10 * (p.tut || 0)).toFixed(2)}) rotate(${vridR.toFixed(2)})`);
    bu.pose(q); ba.pose(q);
    grepp.pose({ ...q, uppe: [...'rl'].filter(sd => !up.includes(sd)), pose2: { fram: [1, 1], armar: [-75, -75 + 18 * tr], klapp: 88 } });
    grepp.fig.style.display = p.tom ? 'none' : '';
    // p.tom (ängen 2:01, Bulle har klivit ur): tomt säte, ratten står kvar utan Bulle och utan tassar (grepp.fig gömd)
    bu.g.style.display = armG.style.display = p.tom ? 'none' : '';
    const rv = p.ror ?? 1; ror.style.display = rv > 0 ? '' : 'none'; ror.style.opacity = rv;   // #29: 0 = bilen står, röret borta
  };
  b.punkt = pt => bu.punkt(pt);
  b.puffa = (t, tider) => {   // växer ut ur röret, driver bakåt och uppåt och krymper bort (som 005:s bil)
    while (puffar.length < tider.length * 3) puffar.push(el('circle', { fill: '#fff', stroke: '#e4ddd2', 'stroke-width': 7 }, puffG));
    puffar.forEach((c, j) => {
      const i = j % 3, a = tider[(j - i) / 3] + i * 0.15, u = del(a, a + 0.9, t), syns = u > 0 && u < 1;
      c.style.display = syns ? '' : 'none';
      if (!syns) return;
      c.setAttribute('r', lerp(22, 92 - i * 14, Math.sqrt(u)) * (1 - mjuk(del(0.65, 1, u))));
      c.setAttribute('cx', -44 - 300 * u); c.setAttribute('cy', 690 - 170 * u + 14 * Math.sin(u * 5 + i));
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
  return ut.filter(x => x + 1.2 <= b).sort((p, q) => p - q);   // #23: varje puff hinner driva bort och tona ut före b (scenslut, stopp)
}

// nallens uttryck efter sången: det senaste glad/oj-tillfället som är högst 1,6 s gammalt vinner
function nalleUttryck(t, { glad = [], oj = [] } = {}, hall = 1.6) {
  // #24 (lugnare): varje uttryck håller 1,6 s, och ett nytt kommer tidigast 3 s efter det förra
  const alla = [...glad.map(a => [a, 'happy']), ...oj.map(a => [a, 'forvanad'])].sort((x, y) => x[0] - y[0]), kvar = [];
  for (const e of alla) if (!kvar.length || e[0] - kvar.at(-1)[0] >= 3) kvar.push(e);
  const senast = kvar.filter(([a]) => t >= a && t < a + hall).at(-1);
  if (!senast) return {};
  return senast[1] === 'forvanad' ? { humor: 'forvanad', m: 0.5 * Math.sin(Math.PI * Math.min(1, (t - senast[0]) / 0.3)) + 0.3 } : { humor: 'happy' };
}
// armen upp på slaget och ner igen, enkelt och mjukt (Sanna #22 "simplify arms": inget överslag): 0 → 1 kring a (0,45 s), 1 → 0 kring b (0,5 s)
const armUpp = (t, a, b = Infinity) => Math.max(0, kit.mjuk(kit.del(a, a + 0.45, t)) - (b < Infinity ? kit.mjuk(kit.del(b - 0.5, b, t)) : 0));   // utan b: del(∞) blev NaN

window.lastbilen = { ny, bulle, peka, puffTider, ljud, kritKorn, NALLE, nalleAnsikte, nalleLiv, nalleUttryck, armUpp };   // nallen också i ikonrad.js
})();
