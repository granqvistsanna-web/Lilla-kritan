// Bruna lastbilen med Björnen Bulle i, som lastbilen() och ratt() i storyboard/bygg.py (efter 006:s baten.js och 005:s bilen.js).
// Vanligt skript efter kit.js, verktyg/kant.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script><script src="../ansikten.js"></script><script src="../lastbilen.js"></script>
//
//   const M = await kit.manus();   const b = await lastbilen.ny(parent, M);
//   b.pose({ x, y, h, tilt,                 // x = mitten, y = hjulens underkant, h = hela bildens höjd med flaggan (som place() i bygg.py)
//            dist,                          // sträckan lastbilen har kört (px i bild): hjulen snurrar så mycket
//            kanin,                         // gosekaninen lyfts så här mycket (px i lastbilens 1024-ruta): gupp på skumpen
//            flagg,                         // flaggan lutar (grader, efterslängar); fladdrar av sig själv
//            humor, titt, tittY, blink, m,  // Bulles ansikte (ansikten.js)
//            r: [x, y], l: [x, y],          // en punkt i Bulles 1024-ruta som armen pekar mot (peka_r/peka_l i bygg.py)
//            tut,                           // 0..1: ratten guppar lite (tutar)
//            tryck, skarm,                  // 0..1: högra tassen trycker på tutknappen / hålls som skärm över ögonen (spanar)
//            rot, lyft, synlig })           // rot = Bulle lutar (grader), lyft = Bulle högre i sätet (px i lastbilens ruta)
// Ratten (Sanna, 2026-11-05, som musens i 005): framifrån, mitt framför Bulles bröst, nedre halvan bakom karossen, tassarna på
// klockan 10 och 2. En arm som pekar uppåt eller ut (målets y ≤ 600 i Bulles ruta) släpper ratten och ligger framför karossen;
// en arm utan mål eller nedåt (magen, stampet) är vila: tassen på ratten, armen syns inte. Ratten syns alltid, också när båda armarna är uppe (Sanna, 2026-11-05).
//   b.puffa(t, tider)   vita kritpuffar ur avgasröret, tre per tid (efter pose); tider: varannat slag och varje "brum"
//   b.punkt([px, py]) → var en punkt i Bulles 1024-ruta hamnar i bild (efter pose)
//   lastbilen.puffTider(a, b, brum) → varannat slag i [a, b] (scentid, kit.takt) plus brum-tiderna, utan dubbletter
//   lastbilen.ljud(gupp)   hjul-gnissel och kaninens pip för guppen (i scenens bygg())
// Lastbilen vänds och snurras aldrig (2D-urklipp): den lutar bara efter backen (tilt).
// Lagren bakifrån: flaggan → avgasröret och puffarna → Bulle (kropp, keps, ansikte) → ratten med tassarna → gosekaninen på flaket →
// karossen → hjulen → armarna som är uppe. Bilderna: lager/lastbil.png (lastbil-brun-v2 i 1024-rutan, hjulen på HJUL),
// lager/flagga-gron.png, gosekanin-v4 ur assets/. Måtten (TOPP, BULLE_K/X/Y, HJUL) ur lager/matt.json.
// Vita kanter (Sanna, 2026-11-05: "använd verktyg kant"): verktyg/kant.js. kant.lagg(g) på PNG-sakerna (karossen, flaggan,
// gosekaninen), andel 0,01 på det som ritas i kod (ratten, kepsen, avgasröret); Bulle och armarna får sin av kit.figur.
(() => {
const { el, bild, ROT, del, lerp, mjuk } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const KANIN = `${ROT}assets/rekvisita/gosekanin/cut/gosekanin-v4.png`;
// gosekaninens ansikte i bildens ×4-ruta (gosekanin() i bygg.py, men ögonen 1,7 × större och lite isär, Sanna 2026-11-05; k = kantens bredd ×4 om bilden är större än den tunna 255 × 520)
const kaninAnsikte = w => { const k = 4 * (w - 255) / 2; return { ogon: [[425 + k, 740 + k], [635 + k, 740 + k]], ogonSkala: 1.3, mun: [530 + k, 850 + k], munSkala: 0.7, nos: [530 + k, 805 + k] }; };
const HJUL_R = 98, HJUL_KLIPP = 92;   // hjulens radie (bygg.py) och klippcirkeln för det snurrande däcket (innanför den vita kanten)
const VILA = { r: 42.4, l: 137.3 }, PIV = { r: [808, 571], l: [208, 577] };   // Bulles armar (riggen): vridpunkten och riktningen till handen i vila
const RATT_MITT = [512, 700], RATT_R = 150, TASS = '#E2B280';   // ratten i Bulles 1024-ruta och tassarnas ljusbruna (RATT_MITT, ratt() i bygg.py)
const peka = (s, p) => Math.atan2(p[1] - PIV[s][1], p[0] - PIV[s][0]) * 180 / Math.PI - VILA[s];
const uppe = p => [...'rl'].filter(s => p[s] && p[s][1] <= 600);   // armar som släpper ratten (bygg.py: peka_* med y ≤ 600)
let n = 0;

const lagg = (g, andel = 0) => window.kant ? kant.lagg(g, { andel }) : g;   // verktyg/kant.js
const storlek = src => new Promise(r => { const i = new Image(); i.onload = () => r([i.naturalWidth, i.naturalHeight]); i.src = src; });

// Bulle utan ben, med ansikten.js och den gröna kepsen (keps() i bygg.py) i sin 1024-ruta. armar: false = utan armar (kroppen i sätet),
// 'bara' = bara armarna (kopian framför karossen).
async function bulle(parent, opt = {}, armar = true) {
  const f = await kit.figur('bjornen-bulle', { forelder: parent, ...opt });
  for (const b of ['leg-l', 'leg-r']) f.delar[b].style.display = 'none';
  const a = ansikten.iFigur(f);
  const keps = el('g', {}, f.inre);
  el('path', { d: 'M396 229 A116 61 0 0 1 628 229 Z', fill: '#56A048' }, keps);
  el('path', { d: 'M372 230 A140 34 0 0 0 652 230 Z', fill: '#3A7832' }, keps);   // skärmen framåt
  lagg(keps, 0.01);
  if (armar === 'bara') for (const e of [f.kropp, a.g, keps]) e.style.display = 'none';
  const pose0 = f.pose;
  f.pose = (p = {}) => {
    const delar = { ...(p.delar || {}) };
    for (const s of 'rl') if (p[s]) delar[`arm-${s}`] = peka(s, p[s]);
    pose0({ ...p, delar });
    for (const s of 'rl') f.delar[`arm-${s}`].style.display = armar === false ? 'none' : armar === 'bara' && !(p.uppe || []).includes(s) ? 'none' : '';
    a.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink || 0, m: p.m });
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
  lagg(bild(`${LAGER}flagga-gron.png`, flaggG, { x: 77 - fw * fs / 2, y: 510 - 330, width: fw * fs, height: 330 }));
  // avgasröret bak, under flaket, och puffarna ur det (bakom karossen)
  lagg(el('path', { d: 'M150 742 L52 750', stroke: '#7D7772', 'stroke-width': 30, 'stroke-linecap': 'round', fill: 'none' }, inre), 0.01);
  const puffG = el('g', { filter: 'url(#kritkant)' }, inre), puffar = [];
  // Bulle i det öppna sätet: hans (512, 833) i 1024-bilden på (BULLE_X, BULLE_Y), skala BULLE_K; kit.figur mäter från fötterna (509, 926)
  const bulleG = el('g', {}, inre);
  const bu = await bulle(bulleG, { s: BK }, false);
  const BULLE_FOT = [BX + (bu.fot[0] - 512) * BK, BY + (bu.fot[1] - 833) * BK];
  // ratten (ratt() i bygg.py): mörkgrå kritring med ekrar, grön tutknapp och tassarna på klockan 10 och 2, framför bröstet
  const RR = RATT_R * BK, ratt = el('g', {}, bulleG), tass = {};
  ratt.innerHTML = `<circle r="${RR}" fill="none" stroke="#4B4542" stroke-width="${0.24 * RR}"/>
    <path d="M${-RR} 0 H${RR} M0 0 V${RR}" stroke="#4B4542" stroke-width="${0.16 * RR}" stroke-linecap="round"/>
    <circle r="${0.27 * RR}" fill="#60AA50"/>`;
  for (const [s, sida, v] of [['r', 1, 30], ['l', -1, -30]])
    tass[s] = el('ellipse', { cx: 0, cy: 0, rx: 0.375 * RR, ry: 0.285 * RR, fill: TASS, transform: `translate(${sida * 0.75 * RR} ${-0.6 * RR}) rotate(${v})` }, ratt);
  // högra tassens lägen i rattens ruta: på ratten (klockan 2), på tutknappen, som skärm ovanför ögonen (Bulles (590, 300))
  const TASS_R = { vila: [0.75 * RR, -0.6 * RR, 30], tryck: [0.1 * RR, -0.05 * RR, 10], skarm: [(590 - RATT_MITT[0]) * BK, (300 - RATT_MITT[1]) * BK, -12] };
  lagg(ratt, 0.01);
  // gosekaninen på flaket (place(KANIN, 350, 520, 150)), bakom karossen så att fötterna är i flaket, med kodansikte
  const [kw, kh0] = await storlek(KANIN), ks = 150 / (kh0 * 4);
  const kaninG = el('g', {}, inre), kaninInre = el('g', { transform: `translate(${350 - kw * 2 * ks} ${520 - 150}) scale(${ks})` }, kaninG);
  lagg(bild(KANIN, kaninInre, { width: kw * 4, height: kh0 * 4 }));
  const kaninFace = ansikten.bygg(kaninInre, kaninAnsikte(kw));
  lagg(bild(`${LAGER}lastbil.png`, inre));
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
  // armarna som är uppe ligger framför karossen (bygg.py), från axlarna strax bakom pucklarna: en kopia av Bulle med bara armarna
  const armG = el('g', {}, inre);
  const ba = await bulle(armG, { s: BK }, 'bara');
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
    const vrid = `rotate(${-(p.rot || 0)} ${BX} ${BY - 60})`;
    bulleG.setAttribute('transform', vrid); armG.setAttribute('transform', vrid);
    const up = uppe(p), q = { ...p, x: BULLE_FOT[0], y: BULLE_FOT[1] - (p.lyft || 0), s: BK, k: 1, tilt: 0, sx: 1, sy: 1, h: undefined, synlig: true, opacity: 1, uppe: up };
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
      c.setAttribute('r', lerp(18, 70 - i * 12, Math.sqrt(u)) * (1 - mjuk(del(0.65, 1, u))));
      c.setAttribute('cx', 40 - 260 * u); c.setAttribute('cy', 748 - 110 * u + 12 * Math.sin(u * 5 + i));
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

window.lastbilen = { ny, bulle, peka, puffTider, ljud };
})();
