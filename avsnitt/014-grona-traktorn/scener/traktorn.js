// Gröna traktorn med Leoparden Lova i, som traktor() i storyboard/bygg.py (efter 007:s lastbilen.js, med 005:s ratt: traktorn är öppen
// och Lovas armar ligger framför karossen, så de syns hela tiden). Vanligt skript efter kit.js, verktyg/kant.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script><script src="../ansikten.js"></script><script src="../traktorn.js"></script>
//
//   const M = await kit.manus();   const b = await traktorn.ny(parent, M);
//   b.pose({ x, y, h, tilt,                 // x = mitten, y = hjulens underkant, h = hela bildens höjd med flaggan (som place() i bygg.py)
//            dist,                          // sträckan traktorn har kört (px i bild): hjulen snurrar så mycket
//            flagg,                         // flaggan lutar (grader, efterslängar); fladdrar av sig själv
//            humor, titt, tittY, blink, m,  // Lovas ansikte (ansikten.js)
//            r: [x, y], l: [x, y],          // en punkt i Lovas 1024-ruta som armen pekar mot (peka_r/peka_l i bygg.py); utan = vila
//            armSk,                         // en arm som pekar uppåt böjs i armbågen (BOJ); armSk − 1,6 sträcker den lite (pump)
//            rot, lyft,                     // Lova lutar (grader) / sitter högre i sätet (px i traktorns ruta; mer än ca 8 och öronen går in under taket)
//            sta,                           // 0–1: Lova reser sig i sätet (STA px), framför taket, så att bröstet och jackan syns mot himlen
//            zipp,                          // dragkedjans handtag: 1 = uppe vid kragen (standard), 0 = nere (före "Zipp, zipp, zipp" i 08c)
//            ratt, tut,                     // ratten (005): tassar utan r/l ligger på ratten (klockan 10 och 2); en arm uppe släpper, båda
//                                           // uppe eller ratt: false = ingen ratt. tut 0–1: högertassen trycker på den röda tutknappen
//            lova, synlig })                // lova: false = traktorn utan Lova (ikonraden), synlig: false = inget alls
// Lagren bakifrån (traktor-gron-oppen-rigg.json och leoparden-lova-i-traktorn.json, traktor() i bygg.py): flaggan → ryggstödet med
// bakre stolpen → Lova (kropp, jacka, ansikte) → ratten → Lovas armar (inne i traktorn, lyfts ARM_LYFT när de gör något) → puffarna
// → framdelen (kaross, tak och främre stolpen) → hjulen.
//   b.puffa(t, tider)   vita kritpuffar ur avgasröret på huven, tre per tid (efter pose), driver bakåt och uppåt
//   b.punkt([px, py])   → var en punkt i Lovas 1024-ruta hamnar i bild (figurlagret, efter pose)
//   b.tpunkt([px, py])  → var en punkt i traktorns 1024-ruta hamnar i bild
//   traktorn.ljud(gupp)  hjul-gnissel lågt på varannat skump (i scenens bygg())
// Traktorn vänds och snurras aldrig (2D-urklipp): den lutar bara (tilt) och skumpar.
// Bilderna: assets/rekvisita/traktor-gron-oppen/cut/ (ryggstöd, fram, hjulen), Lova ur sin rigg med jackan och ärmarna ur lager/
// (lova-jacka.png, lova-arm-r/l.png, gor-lager.py), lager/flagga-gron.png. Måtten (TR, LOVA_I, AVGAS, HJULEN) ur lager/matt.json.
// Vita kanter (verktyg/kant.js): kant.lagg på ryggstödet, framdelen med hjulen och flaggan (PNG med inbakad kant), andel 0,01 på
// dragkedjans handtag; Lova och armarna får sin av kit.figur.
(() => {
const { el, bild, ROT, del, lerp, mjuk } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href, TR = `${ROT}assets/rekvisita/traktor-gron-oppen/cut/traktor-gron-oppen-`;
const PIV = { r: [808, 572], l: [206, 578] }, SPETS = { r: [910, 665], l: [104, 672] };   // Lovas armar (leoparden-lova-rigg-lemmar.json)
const VILA = { r: Math.atan2(SPETS.r[1] - PIV.r[1], SPETS.r[0] - PIV.r[0]), l: Math.atan2(SPETS.l[1] - PIV.l[1], SPETS.l[0] - PIV.l[0]) };
const ARM = Math.hypot(SPETS.r[0] - PIV.r[0], SPETS.r[1] - PIV.r[1]);   // armens längd i Lovas ruta
const peka = (s, p) => (Math.atan2(p[1] - PIV[s][1], p[0] - PIV[s][0]) - VILA[s]) * 180 / Math.PI;
// böjd arm: en arm som pekar uppåt (målet över axeln) böjs i armbågen mitt på ärmen: överarmen ut åt sidan tätt intill kroppen
// (ÖVER grader under vågrätt), underarmen och tassen mot målet; ärmen klipps i två bitar (samma bild två gånger)
const BOJ = 0.5, OVER = 15 * Math.PI / 180, BOJ_SK = 1.2;
// tassarna på ratten (som musen i 005): korta armar tätt intill kroppen, axeln flyttad INAT inåt (och upp) på bröstet, armen
// nedåt-inåt mot greppet, aldrig sträckt (k högst 1)
const INAT = [100, -30];
// hyttens öppning i traktorns ruta (hålet mellan taket, stolparna, ryggstödet och huven i fram.png, 8 px större): fylls med en
// mörkare grön bakvägg bakom Lova, så att ingen himmel syns bredvid eller under henne
const HYTT = 'M394 227L243 235L239 251L240 275L239 291L241 299L251 307L261 323L267 347L274 371L278 395L282 411L285 419L295 427L404 435L586 443L586 435L583 419L579 403L572 379L567 355L562 331L556 307L551 283L544 259L537 235L423 227Z';
// mjukt mellan poserna: värdena (armarnas vinklar, hur högt Lova sitter, ratten) glider mot målet med tidskonstanten GLID s, så
// att inget hoppar från en bildruta till nästa (klart på ca 0,25 s). Följer kit.nu; ett hopp i tiden (stillbild, sökning) = direkt.
const GLID = 0.08;
function glatta(st, mal, fast) {
  if (fast) return mal;
  const dt = kit.nu - st.t;
  if (!st.v || dt < 0 || dt > 0.3) st.v = { ...mal };
  else if (dt > 0) { const a = 1 - Math.exp(-dt / GLID); for (const k in mal) st.v[k] += a * (mal[k] - (st.v[k] ?? mal[k])); }
  st.t = kit.nu;
  return st.v;
}
const vrid = (v, [x, y]) => [x * Math.cos(v) - y * Math.sin(v), x * Math.sin(v) + y * Math.cos(v)];
const FLAGGA = { x: 150, botten: 330, h: 320 };   // place(c, FLAGGA_GR, 150, 330, 320) i traktor(): duken fritt ovanför taket
const STA = 72, HUV = 300;   // sta: så mycket reser hon sig (traktorns ruta); under HUV är framdelen huven, ovanför taket och fönstret
const ARM_LYFT = 26;   // bygg.py: armar som gör något lyfts (axlarna upp) så att tassarna når över karossens kant; armarna är inne i traktorn
const RATT = [0, -6, 28], RATT_LYFT = 14, SANK = 6;   // SANK: Lova sitter lite lägre, så att huven täcker henne från bröstet   // rattens mitt i förhållande till Lovas midja (y 422 = karossens kant) och radie, i traktorns
                                          // ruta; med ratten sitter Lova RATT_LYFT högre, så att ringen hamnar vid bröstet och inte blir en mun under hakan
let n = 0;

const lagg = (g, andel = 0) => window.kant ? kant.lagg(g, { andel }) : g;
const storlek = src => new Promise(r => { const i = new Image(); i.onload = () => r([i.naturalWidth, i.naturalHeight]); i.src = src; });

// Lova utan ben, med jackan, ansikten.js och ärmarna. del: 'kropp' (utan armar) eller 'armar' (bara armarna, framför karossen).
async function lova(parent, opt = {}, delar = 'kropp') {
  const f = await kit.figur('leoparden-lova', { forelder: parent, ...opt });
  for (const b of ['leg-l', 'leg-r']) f.delar[b].style.display = 'none';
  for (const s of 'rl') {   // ärmarna: armen med jackans gröna ärm (armbild() i bygg.py)
    const gammal = f.delar[`arm-${s}`], ny = bild(`${LAGER}lova-arm-${s}.png`, f.inre);
    gammal.replaceWith(ny); f.delar[`arm-${s}`] = ny;
  }
  const a = ansikten.iFigur(f);
  // jackan ovanpå kroppen, under ansiktet; dragkedjans handtag flyttas med zipp
  const jacka = el('g', {}, f.inre);
  f.inre.insertBefore(jacka, a.g);
  bild(`${LAGER}lova-jacka.png`, jacka);
  // dragkedjan: grå tänder från kragen ner, och ett stort vitt handtag med ett grått hål
  el('path', { d: 'M512 590V835', stroke: '#7d8a80', 'stroke-width': 16, 'stroke-linecap': 'round' }, jacka);
  el('path', { d: 'M512 594V831', stroke: '#E4E4E0', 'stroke-width': 11, 'stroke-dasharray': '6 8' }, jacka);
  const handtag = el('g', {}, jacka);
  el('rect', { x: 498, y: -14, width: 28, height: 22, rx: 5, fill: '#B9B9B6', stroke: '#7d7d7a', 'stroke-width': 3 }, handtag);
  el('rect', { x: 489, y: 4, width: 46, height: 70, rx: 14, fill: '#FAFAF7', stroke: '#8a8a86', 'stroke-width': 4 }, handtag);
  el('rect', { x: 502, y: 44, width: 20, height: 18, rx: 6, fill: '#8a8a86' }, handtag);
  lagg(handtag, 0.01);
  if (delar === 'armar') for (const e of [f.kropp, a.g, jacka]) e.style.display = 'none';
  else for (const s of 'rl') f.delar[`arm-${s}`].style.display = 'none';
  // underarmarna (böjd arm): samma ärm en gång till, klippt vid armbågen; överarmen klipps på andra sidan (i ärmens egen ruta)
  const under = {}, klipp = {};
  for (const s of 'rl') {
    const [sx, sy] = PIV[s], u = [Math.cos(VILA[s]), Math.sin(VILA[s])], nv = [-u[1], u[0]], c = BOJ * ARM;
    const halv = (a0, a1) => [[a0, -400], [a1, -400], [a1, 400], [a0, 400]].map(([q, w]) => `${(sx + u[0] * q + nv[0] * w).toFixed(1)},${(sy + u[1] * q + nv[1] * w).toFixed(1)}`).join(' ');
    for (const [del_, a0, a1] of [['o', -400, c + 4], ['u', c - 4, 400]]) {
      const id = `${f.g.id || 'lova'}-${s}${del_}-${Math.random().toString(36).slice(2, 7)}`;
      el('polygon', { points: halv(a0, a1) }, el('clipPath', { id, clipPathUnits: 'userSpaceOnUse' }, f.inre));
      klipp[s + del_] = `url(#${id})`;
    }
    under[s] = bild(`${LAGER}lova-arm-${s}.png`, f.inre, { 'clip-path': klipp[s + 'u'] });
    f.delar[`arm-${s}`].after(under[s]);
    if (delar !== 'armar') under[s].style.display = 'none';
  }
  // en ärmbit vriden deg grader runt axeln, sträckt k bara på längden (ärmen blir inte tjockare), flyttad t
  const bit = (s, deg, k, t = [0, 0]) => { const [px, py] = PIV[s], v = VILA[s] * 180 / Math.PI;
    return `translate(${t[0].toFixed(2)} ${t[1].toFixed(2)}) rotate(${(deg + v).toFixed(2)} ${px} ${py}) translate(${px} ${py}) scale(${k.toFixed(3)} 1) translate(${-px} ${-py}) rotate(${-v} ${px} ${py})`; };
  const pose0 = f.pose, st = {};
  f.pose = (p = {}) => {
    const d = { ...(p.delar || {}) }, mal = {};
    for (const s of 'rl') {
      // i traktorn (boj) är armen alltid två bitar: överarmen o grader och underarmen u grader från vilan, sträckta k på längden
      // (rak arm: o = u); utan mål vilar armen (0, 0, 1)
      let o = 0, u = 0, k = 1;
      if (p.boj && p[s] && p[s][1] < PIV[s][1] - 100) {   // pekar uppåt: överarmen ut åt sidan tätt intill kroppen, underarmen mot målet
        const ou = s === 'r' ? OVER : Math.PI - OVER; k = BOJ_SK + (p.armSk ? p.armSk - 1.6 : 0);
        const L = k * BOJ * ARM, E = [PIV[s][0] + L * Math.cos(ou), PIV[s][1] + L * Math.sin(ou)];
        o = (ou - VILA[s]) * 180 / Math.PI; u = (Math.atan2(p[s][1] - E[1], p[s][0] - E[0]) - VILA[s]) * 180 / Math.PI;
      } else if (p.boj && p[s]) {   // rak arm (framåt, nedåt): bara längden sträcks
        o = u = peka(s, p[s]); k = p.armSk ?? 1;
      } else if (p.boj && p.grepp?.[s]) {   // tassen på ratten: axeln INAT inåt, kort arm nedåt-inåt
        const m = p.grepp[s], A = [PIV[s][0] + (s === 'r' ? -INAT[0] : INAT[0]), PIV[s][1] + INAT[1]];
        o = u = (Math.atan2(m[1] - A[1], m[0] - A[0]) - VILA[s]) * 180 / Math.PI;
        k = Math.min(1, Math.hypot(m[0] - A[0], m[1] - A[1]) / ARM); mal[s + 'i'] = 1;
      } else if (p[s]) d[`arm-${s}`] = [peka(s, p[s]), 0, 0, p.armSk ?? (p[s][1] <= 600 ? 1.6 : 1)];
      mal[s + 'i'] ??= 0;
      const ror = x => ((x + 540) % 360) - 180;   // samma vinkel, närmast 0
      Object.assign(mal, { [s + 'o']: ror(o), [s + 'u']: ror(o) + ror(u - o), [s + 'k']: k });
    }
    const v = p.boj ? glatta(st, mal, p.fast) : null;
    for (const s of 'rl') {
      const tva = !!v && delar === 'armar';
      under[s].style.display = tva ? '' : 'none';
      tva ? f.delar[`arm-${s}`].setAttribute('clip-path', klipp[s + 'o']) : f.delar[`arm-${s}`].removeAttribute('clip-path');
      if (!v) continue;
      const o = v[s + 'o'], u = v[s + 'u'], k = v[s + 'k'], L = k * BOJ * ARM, rad = Math.PI / 180, i = v[s + 'i'];
      const T = [(s === 'r' ? -INAT[0] : INAT[0]) * i, INAT[1] * i];
      const E = [L * Math.cos(VILA[s] + o * rad), L * Math.sin(VILA[s] + o * rad)], e0 = vrid(u * rad, [L * Math.cos(VILA[s]), L * Math.sin(VILA[s])]);
      d[`arm-${s}`] = () => bit(s, o, k, T);
      under[s].setAttribute('transform', bit(s, u, k, [E[0] - e0[0] + T[0], E[1] - e0[1] + T[1]]));
    }
    pose0({ ...p, delar: d });
    a.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink || 0, m: p.m });
    handtag.setAttribute('transform', `translate(0 ${lerp(725, 595, p.zipp ?? 1).toFixed(1)})`);
  };
  f.pose();
  return f;
}

async function ny(parent, M) {
  const { TR: { bb }, LOVA_I: { k: LK, plats: [LX, LY], midja: MIDJA }, AVGAS, HJULEN } = M.matt, id = `traktor${++n}`;
  const BB = bb, fot = [(BB[0] + BB[2]) / 2, BB[3]];
  const g = el('g', { id }, parent), inre = el('g', {}, g);
  // flaggan bak på ryggstödet, duken bakåt (FLAGGA_GR är spegelvänd i bygg.py); vrids runt stångens fot
  const [fw, fh] = await storlek(`${LAGER}flagga-gron.png`), fs = FLAGGA.h / fh, STANG = FLAGGA.x + fw * fs / 2 - 10;
  const flaggG = el('g', {}, inre);
  lagg(bild(`${LAGER}flagga-gron.png`, flaggG, { x: FLAGGA.x - fw * fs / 2, y: FLAGGA.botten - FLAGGA.h, width: fw * fs, height: FLAGGA.h }));
  const hytt = el('path', { d: HYTT, fill: '#3B7A33', filter: 'url(#kritkant)' }, inre);   // bakväggen (mörkare än ryggstödet)
  const bak = lagg(bild(`${TR}ryggstod.png`, inre));
  // Lova i sätet: hennes (512, midja) på (LX, LY) i traktorns ruta, skala LK; kit.figur mäter från fötterna
  // Lova ligger i lovaV, som är maskad av huven (framdelen under HUV, lite tjockare för kanten): sitter hon står lovaV bakom
  // framdelen, reser hon sig (sta) flyttas den framför, så att huvudet går framför taket men kroppen fortfarande är bakom huven
  const huv = el('mask', { id: `${id}-huv`, maskUnits: 'userSpaceOnUse', x: -2000, y: -2000, width: 5000, height: 5000 }, inre);
  el('rect', { x: -2000, y: -2000, width: 5000, height: 5000, fill: '#fff' }, huv);
  const huvF = el('filter', { id: `${id}-huvf`, x: -0.1, y: -0.1, width: 1.2, height: 1.2 }, inre);
  el('feMorphology', { in: 'SourceAlpha', operator: 'dilate', radius: 9 }, huvF);
  const huvC = el('clipPath', { id: `${id}-huvc`, clipPathUnits: 'userSpaceOnUse' }, inre);
  el('rect', { x: -500, y: HUV, width: 2000, height: 1500 }, huvC);
  bild(`${TR}fram.png`, el('g', { 'clip-path': `url(#${id}-huvc)` }, huv)).setAttribute('filter', `url(#${id}-huvf)`);
  const lovaV = el('g', { mask: `url(#${id}-huv)` }, inre), lovaG = el('g', {}, lovaV), lo = await lova(lovaG, { s: LK }, 'kropp');
  let framfor = false;
  const LOVA_FOT = [LX + (lo.fot[0] - 512) * LK, LY + (lo.fot[1] - MIDJA) * LK], VRID = [LX, LY - 40];
  // ratten (som 005:s bilen.js): mörkgrå kritring med ekrar och en röd tutknapp (inte grön: bara målen är gröna) framför Lovas bröst,
  // nedre halvan bakom karossens kant (samma huvmask som Lova); tassarna på klockan 10 och 2
  const RATT_R = RATT[2], RC = [LX + RATT[0], LY + RATT[1]], rattS = RATT_R / 62;
  const ratt = el('g', { mask: `url(#${id}-huv)` }, inre), rattIn = el('g', { transform: `translate(${RC[0]} ${RC[1]}) scale(${rattS})` }, ratt);
  rattIn.innerHTML = `<circle r="62" fill="none" stroke="#4b4542" stroke-width="15"/>
    <path d="M-62 0 H62 M0 0 V62" stroke="#4b4542" stroke-width="10" stroke-linecap="round"/>`;
  const knapp = el('circle', { r: 17, fill: '#D9452B', stroke: '#9e2f1d', 'stroke-width': 3 }, rattIn);
  const GREPP = { r: [RC[0] + 0.87 * RATT_R, RC[1] - 0.5 * RATT_R], l: [RC[0] - 0.87 * RATT_R, RC[1] - 0.5 * RATT_R] };
  const puffG = el('g', { filter: 'url(#kritkant)' }, inre), puffar = [];
  const fram = el('g', {}, inre);
  bild(`${TR}fram.png`, fram);
  // hjulen: runda utklipp ur samma bild ovanpå sina original; en ljus kritprick på däcket så att snurren syns
  const hjul = HJULEN.map(([[hx, hy], r], i) => {
    const rot = el('g', {}, fram);
    bild(`${TR}${i ? 'framhjul' : 'bakhjul'}.png`, rot);
    el('circle', { cx: hx + 0.62 * r, cy: hy, r: 0.07 * r, fill: '#8C8C90', opacity: 0.8 }, rot);
    return { rot, hx, hy, r };
  });
  lagg(fram);
  // armarna inne i traktorn (traktor() i bygg.py): ryggstödet → Lova → ratten → armarna → framdelen med hjulen; bara det som når
  // över karossens kant syns (ratten före armarna, så att tassarna ligger på ringen)
  const armG = el('g', {}, inre), la = await lova(armG, { s: LK }, 'armar');
  inre.insertBefore(armG, puffG);
  const b = { id, g, lova: lo, BB }, stB = {};
  b.pose = (p = {}) => {
    const s = (p.h ?? 500) / (BB[3] - BB[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('transform', `translate(${p.x ?? 470} ${p.y ?? 742}) rotate(${p.tilt || 0}) scale(${s}) translate(${-fot[0]} ${-fot[1]})`);
    hjul.forEach(h => h.rot.setAttribute('transform', `rotate(${((p.dist || 0) / (h.r * s) * 180 / Math.PI).toFixed(2)} ${h.hx} ${h.hy})`));
    const fladder = 1 - 0.08 * Math.abs(Math.sin(kit.nu * 2 * Math.PI * 1.6));
    flaggG.setAttribute('transform', `translate(${STANG} ${FLAGGA.botten}) rotate(${(p.flagg || 0).toFixed(2)}) scale(${fladder.toFixed(3)} 1) translate(${-STANG} ${-FLAGGA.botten})`);
    const vrid = `rotate(${-(p.rot || 0)} ${VRID[0]} ${VRID[1]})`, med = p.lova !== false;
    lovaG.setAttribute('transform', vrid); armG.setAttribute('transform', vrid);
    lovaG.style.display = armG.style.display = hytt.style.display = med ? '' : 'none';
    const sta = p.sta || 0;
    if ((sta > 0) !== framfor) {   // står hon: Lova, ratten och armarna framför framdelen (kroppen fortfarande bakom huven via masken)
      framfor = sta > 0;
      for (const e of [lovaV, ratt, armG]) framfor ? inre.appendChild(e) : inre.insertBefore(e, puffG);
    }
    const rattSyns = med && p.ratt !== false && !(p.r && p.l) && (p.sta || 0) < 0.3, tut = p.r ? 0 : p.tut || 0;
    const upp = (p.lyft || 0) + STA * sta + (rattSyns ? RATT_LYFT * (1 - Math.min(1, sta)) : 0) - SANK * (1 - Math.min(1, sta));
    const q = { ...p, x: LOVA_FOT[0], s: LK, k: 1, tilt: 0, sx: 1, sy: 1, h: undefined, synlig: true, opacity: 1, boj: true };
    // ratten: syns om inte båda armarna gör något (eller ratt: false, t.ex. när hon kliver ur); tut 0–1 = högertassen trycker på knappen
    const gl = glatta(stB, { upp, upA: upp + (p.r || p.l ? ARM_LYFT : 0), ratt: rattSyns ? 1 : 0 }, p.fast);   // mjukt mellan poserna
    ratt.style.display = gl.ratt > 0.02 ? '' : 'none'; ratt.setAttribute('opacity', Math.min(1, gl.ratt).toFixed(3));
    const upA = gl.upA;   // armarna lyfts när en arm gör något
    const iLova = ([x, y]) => [512 + (x - LX) / LK, MIDJA + (y - LY + upA) / LK];
    q.grepp = rattSyns ? { l: iLova(GREPP.l), r: iLova([lerp(GREPP.r[0], RC[0] + 6, tut), lerp(GREPP.r[1], RC[1] - 4, tut)]) } : null;
    knapp.setAttribute('transform', `scale(${(1 + 0.15 * tut).toFixed(3)} ${(1 - 0.25 * tut).toFixed(3)})`);
    q.y = LOVA_FOT[1] - gl.upp;
    lo.pose(q); la.pose({ ...q, y: LOVA_FOT[1] - upA });
  };
  b.punkt = pt => lo.punkt(pt);
  b.tpunkt = ([x, y]) => { const pt = new DOMPoint(x, y).matrixTransform(kit.lager.figurer.getCTM().inverse().multiply(inre.getCTM())); return [pt.x, pt.y]; };
  b.puffa = (t, tider) => {   // växer ut ur röret, driver bakåt och uppåt och krymper bort (som 007:s lastbil)
    while (puffar.length < tider.length * 3) puffar.push(el('circle', { fill: '#fff', stroke: '#e4ddd2', 'stroke-width': 7 }, puffG));
    puffar.forEach((c, j) => {
      const i = j % 3, a = tider[(j - i) / 3] + i * 0.15, u = del(a, a + 0.9, t), syns = u > 0 && u < 1;
      c.style.display = syns ? '' : 'none';
      if (!syns) return;
      c.setAttribute('r', lerp(18, 70 - i * 10, Math.sqrt(u)) * (1 - mjuk(del(0.65, 1, u))));
      c.setAttribute('cx', AVGAS[0] - 10 - 110 * u + 10 * Math.sin(u * 5 + i)); c.setAttribute('cy', AVGAS[1] - 20 - 210 * u);
    });
  };
  b.pose();
  return b;
}

// hjul-gnissel mycket lågt på varannat skump (som 007). gupp = scentider då traktorn skumpar; läggs med kit.ljud i scenens bygg().
function ljud(gupp) {
  [...gupp].sort((a, b) => a - b).forEach((t, i) => { if (i % 2 === 0) kit.ljud('hjul-gnissel', t + 0.02, { vol: 0.08, langd: 0.4, fade: 0.15 }); });
}

window.traktorn = { ny, lova, peka, ljud };
})();
