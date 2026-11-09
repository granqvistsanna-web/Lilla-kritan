// Körscenernas delar i 004 (korscen-1, -2 och -3). Läses in efter kit.js och 003:s korscen-1/vag.js (och ../../kritan-ritar/sol.js för kor.sol, bara korscen-1);
// allt hamnar i window.kor.
// Vägen rullar som i 003 (vag.js och dess klipp: äppelträdet, dammen, blommorna). Här: farten med stopp, bussen,
// solen, stoppets saker (likadana båda gångerna), kompisen som väntar och hoppar på, och poserna i fönstren.
(() => {
const { el, bild, lerp, mjuk, del, hopp, snurr, blink, vinka, BEAT, BEAT0 } = kit;
const KLIPP = new URL('klipp/', document.currentScript.src).href, PX = 1080 / 768;
const MATT = { skylt: [94, 271], vass: [98, 179], sjo: [682, 181] };   // klipp/ (klipp.py), i plattpixlar
const BUSS = { x: 900, y: 978 };                 // bussens fötter, som i 003
const STORLEK = 1.2;                             // bussen i körbilden är 20 % större än i 003 (Sanna: "bus could be a bit bigger")
// Bussen i körbilden, STORLEK gånger standardhöjden. Kompisarna i fönstren, dörren och hjulen följer med (allt räknas i bussens ruta).
const nyBuss = () => kit.figur('bussen-tva-fonster', { h: kit.FIGURER['bussen-tva-fonster'].h * STORLEK });
// Närbilder på bussen ser ut som innan den blev större: kameran [cx, cy, zoom] som den var för 003:s storlek → samma utsnitt av bussen nu.
const narbild = ([cx, cy, zoom]) => [BUSS.x + (cx - BUSS.x) * STORLEK, BUSS.y + (cy - BUSS.y) * STORLEK, zoom / STORLEK];
const V = 480, V_LANGSAM = 150;                  // px/s; långsamt medan stoppets saker glider in
const MARK = 990;                                // kompisens fötter på vägkanten
const PLATS = { skylt: 1400, van: 1560, bak: 1775 };   // stoppets ordning i bild, likadan båda gångerna
const DORR = [737, 641];                         // dörrens nederkant mitt, i bussens 1024-ruta

let saker, vagSaker;
// Vägplattan (vag.js) och en egen grupp för sakerna här ovanför vägen. vagSaker = vag.js egen grupp (träd, damm, åker).
function vag() {
  window.vag.vag();
  vagSaker = kit.lager.plate.lastChild;
  saker = el('g', {}, kit.lager.plate);
  return saker;
}
// Solen från kritans teckning (../../kritan-ritar/sol.js), på samma plats som där zoomen landar, så att klippet från
// kritan-ritar inte syns. Ligger sist på plattan, framför sakerna vid vägen (åkern och träden glider bakom den, Sanna 2026-11-04),
// men bakom refrängens backar som byggs efter den. Kokar som figurerna.
// parent/fore: var den läggs (standard: sist på plattan; refrängens backar lägger den efter sin himmel).
function sol(parent = kit.lager.plate, fore = null) {
  const g = el('g', { filter: 'url(#boil)' }), H = kritSol.HIMMEL;
  parent.insertBefore(g, fore || null);
  const s = kritSol(g); s.satt(H.x, H.y, H.skala, H.vrid); soler.push(s);
  return g;
}
// Solarna på himlen dansar lite i takt (mindre än i kritan-ritar, så att bussen och kompisarna är det man tittar på).
// sek = sångtid, så att solen står likadant på båda sidor om klippen.
const soler = [];
const solDans = (sek, amp = 1) => soler.forEach(s => s.dansa(sek, 0.4 * amp));
// Vit klistermärkeskant runt en sak som är urklippt ur en målad platta (de har ingen inbakad kant, till skillnad från vagen-saker):
// samma regel som allt annat, verktyg/kant.js med andel 0,01 (skill vita-kanter). Ger g tillbaka.
const kant = g => window.kant?.lagg(g, { andel: 0.01 }) || g;
// En sak ur klipp/ med foten på y, k skalar, med vit kant. s.pa(x) sätter mitten i x.
function sak(namn, y, k = 1, parent = saker) {
  const [w, h] = MATT[namn].map(v => v * PX * k), g = kant(el('g', {}, parent));
  bild(KLIPP + namn + '.png', g, { width: w, height: h, preserveAspectRatio: 'none' });
  return { g, w, h, pa: x => g.setAttribute('transform', `translate(${x - w / 2} ${y - h})`) };
}

// "förbi hus och gröna träd" (samma i alla körverser): stugan mitt på "hus", björken och lövträdet på "gröna träd".
// Ger [[tid, namn, höjd], …] för vagsak; sakens mitt är i x 1500 vid tiden (till höger om bussens nos).
const forbiHus = forbi => [[forbi + 0.5, 'stuga', 250], [forbi + 1.3, 'bjork', 340], [forbi + 1.8, 'lovtrad', 330]];

// ---------- farten ----------
// { d, v } = korning({ vem, stopp, start, extra }): full fart, saktar in till V_LANGSAM på "Vem är det …" (vem),
// stannar på "stopp" och kör igen på start. extra(t) = refrängens knuffar på "runt". d(t) = körd sträcka (px).
function korning({ vem, stopp, start, extra = () => 0 } = {}) {
  const f = t => {
    if (stopp == null) return 1;
    if (t < stopp) return lerp(1, V_LANGSAM / V, mjuk(del(vem - 1, vem, t))) * (1 - mjuk(del(stopp - 0.8, stopp, t)));
    return start != null ? mjuk(del(start, start + 1, t)) : 0;
  };
  const v = t => V * f(t) + extra(t), cache = new Map();
  const d = t => { const k = Math.round(t * 1000); if (!cache.has(k)) cache.set(k, window.vag.stracka(t, v)); return cache.get(k); };
  return { d, v, f };
}

// ---------- bussen ----------
// Tre gula streck framför nosen när bussen tutar (som 003). Ger streck(k).
function tutStreck(buss) {
  const s = [-28, 0, 28].map(a => el('path', { d: 'M0 0 L60 0', stroke: '#f6d24a', 'stroke-width': 14, 'stroke-linecap': 'round',
    transform: `translate(960 470) rotate(${a})` }, buss.inre));
  return k => s.forEach(p => { p.setAttribute('opacity', k > 0 ? 1 - k : 0); p.setAttribute('d', `M${45 + 40 * k} 0 L${95 + 50 * k} 0`); });
}
// Bussen med de lugna värdena i kit.BUSS_RORELSE: gung i takt när den kör, motorn tuffar när den står,
// puff på tut och brum, gungar till när den stannar och kör iväg.
// p: { sang0, dist, f (0 står – 1 kör), x, y, k, tilt, tut, brum, stopp, start, prat, ogon, titt, blink, vink (tider, främre ögat i 0,4 s),
//      lyft (px uppåt), sx, sy, hjul: [bak, fram] (hjulens lyft i 1024-rutan) }
function buss(b, streck, t, p) {
  const f = p.f ?? 1, g = kit.bussGung((t + p.sang0 - BEAT0) / BEAT, f);
  const u = kit.bussTut(t, p.tut || []), br = kit.bussTut(t, p.brum || [], true);
  const tilt = (p.tilt ?? 0) + g.tilt + (p.stopp != null ? kit.bussStopp(t, p.stopp) : 0) + (p.start != null ? kit.bussStart(t, p.start) : 0);
  const lyft = g.lyft + kit.bussMotor(t) * (1 - f) + u.lyft + br.lyft - (p.lyft || 0), k = p.k ?? 1, [hb, hf] = p.hjul || [0, 0];
  const vinkel = snurr(p.dist, 63 * b.skala * k), vink = (p.vink || []).some(v => t >= v && t < v + 0.4);
  b.pose({ x: p.x ?? BUSS.x, y: (p.y ?? BUSS.y) + lyft * k, k, tilt, sx: u.sx * (p.sx ?? 1), sy: u.sy * (p.sy ?? 1), ogon: u.ogon || p.ogon || 'open',
    mun: Math.max(u.mun, br.mun, kit.prat(t, p.prat || [])), titt: p.titt ?? 0.8, blink: blink(t, p.blink || []),
    vink: vink ? 1 : null, delar: { 'del-1': [vinkel, 0, -hb], 'del-2': [vinkel, 0, -hf] } });
  streck(u.streck);
}
// dörrens nederkant i bild (bussen står på BUSS när dörren används)
const dorrPunkt = b => [BUSS.x + (DORR[0] - b.fot[0]) * b.skala, BUSS.y + (DORR[1] - b.fot[1]) * b.skala + 10];

// ---------- stoppet (likadant båda gångerna) ----------
// Tiderna i scentid för stopp nr (0 grodan, 1 ankan). Replikerna är gissade tills de är inspelade.
function stoppTider(M, nr, S) {
  const r = (text, n = nr) => M.rad(text, n).t;
  const STOPP = S(kit.takt(r('vi stannar')) + 3 * BEAT);              // "stopp" på fjärde slaget i raden
  const hej = S(r('kliv på du')), kvak = S(r('med oss nu')), ett = S(r('Ett, två, tre')), inI = S(r('In i bussen'));
  const NARA = [STOPP + 2.0, Math.min(STOPP + 4.0, hej - 0.6)];       // närbild på kompisen, 2 s
  const HOPP = [1.45, 1.9, 2.35].map(n => ett + n);                     // "hopp, hopp, hopp"
  return {
    VEM: S(r('Vem är det som väntar')), STOPP,
    TUT: STOPP + 0.7,                                                   // BUSSEN: "Tuta-tut!"
    NARA, PRAT: [NARA[0] + 0.2, NARA[1] - 0.25],                        // "Kväk-kväk! / Kvack-kvack! Jag vill bada!"
    DORR: [hej, hej + 0.45], HEJ: hej + 0.6,                            // "Hej, hej, …, kliv på du!": dörren öppnas, kompisen vinkar
    LAT: [0, 0.4, 0.95, 1.35].map(n => kvak + n),                       // "Kväk-kväk, kväk-kväk"
    ETT: [0, 0.45, 0.9].map(n => ett + n), HOPP,
    INNE: HOPP[2] + 0.37, STANG: HOPP[2] + 0.75,                        // i fönstret, dörren stängs
    HEJHEJ: [1.2, 1.5, 1.8].map(n => inI + n),                          // "hej, hej, hej" från fönstret
    START: inI + 2.0,
  };
}
// Kompisens läte (kvak / kvack), ett per "kväk"-stavelse: två i närbildens "Kväk-kväk! Jag vill bada!" och fyra i sångens
// "Kväk-kväk, kväk-kväk". Varianterna växlar av sig själva i kit.ljud. extra = fler tider (vinkningar från fönstret).
const LAT_LJUD = { 'grodan-gurra': 'kvak', 'ankan-agda': 'kvack' };
const latTider = T => [T.PRAT[0], T.PRAT[0] + 0.35, ...T.LAT];
function lat(vem, tider) { for (const t of tider) kit.ljud(LAT_LJUD[vem], t - 0.02, { vol: 0.6 }); }
const munLat = (t, tider) => Math.max(0, ...tider.map(p => t > p - 0.03 && t < p + 0.32 ? 0.8 * Math.sin(del(p - 0.03, p + 0.32, t) * Math.PI) : 0));
// Stoppets saker: skylten, och vassen (grodan) eller pölen och stugan (ankan). s.pa(dx): dx = hur långt de är från sin plats.
function stoppPlats(vem) {
  const skylt = sak('skylt', 903);
  const bak = vem === 'grodan' ? sak('vass', 905) : kit.vagsak('stuga', saker, 830, 250);
  let pol = null;
  if (vem === 'ankan') {
    pol = el('g', {}, saker);
    el('ellipse', { rx: 205, ry: 46, fill: '#fff' }, pol);
    el('ellipse', { rx: 195, ry: 38, fill: '#8ad2f2' }, pol);
    for (const dx of [-80, 60]) el('path', { d: `M${dx - 22} -4 Q${dx} -14 ${dx + 22} -4`, fill: 'none', stroke: '#fff', 'stroke-width': 5, 'stroke-linecap': 'round' }, pol);
  }
  return { pa: dx => {
    skylt.pa(PLATS.skylt + dx); bak.pa(PLATS.bak + dx);
    if (pol) pol.setAttribute('transform', `translate(${PLATS.van + dx} ${MARK - 6})`);
  } };
}
// Stänk runt ankans fötter i pölen: små droppar som flyger upp i en solfjäder. s(t, x, tider)
function stank(parent) {
  const d = Array.from({ length: 6 }, () => el('ellipse', { rx: 11, ry: 15, fill: '#8ad2f2', stroke: '#fff', 'stroke-width': 4 }, parent));
  return (t, x, tider) => d.forEach((p, i) => {
    const a = tider.findLast(s => t >= s), q = a == null ? 1 : del(a, a + 0.5, t);
    if (q >= 1) return p.setAttribute('opacity', 0);
    const v = (i < 3 ? -1 : 1) * (25 + (i % 3) * 22) * Math.PI / 180, r = 40 + 150 * q;
    p.setAttribute('cx', x + Math.sin(v) * r * 1.3); p.setAttribute('cy', MARK - 10 - Math.cos(v) * r * 0.9 + 260 * q * q);
    p.setAttribute('opacity', 1 - q * q);
  });
}
// Grodans randiga handduk över axeln, ritad i kod i grodans 1024-ruta (följer posen).
function handduk(f) {
  const g = el('g', {}), d = 'M688 452 L820 470 L800 742 L716 722 Z';
  f.inre.insertBefore(g, f.ansikte);
  el('path', { d, fill: '#fff', stroke: '#fff', 'stroke-width': 22, 'stroke-linejoin': 'round' }, g);
  el('path', { d, fill: '#e8508e' }, g);
  for (const y of [530, 600, 670]) el('path', { d: `M${704 + (y - 530) * 0.05} ${y} L${812 - (y - 530) * 0.07} ${y + 14}`, stroke: '#fff', 'stroke-width': 16, 'stroke-linecap': 'round' }, g);
}

// Kompisen vid vägen: glider in med vägen (x), väntar och tittar mot bussen, glad när bussen stannat,
// pratar i närbilden, vinkar på "Hej, hej", säger sitt läte, gör sig redo på "ett, två, tre" och hoppar in på "hopp, hopp, hopp".
// o: { plask: [tider] (ankan stampar i pölen), blink }
function vanUte(f, t, T, x, b, o = {}) {
  const [dx, dy] = dorrPunkt(b);
  // öppna ögon som tittar mot bussen; glad bara kort: när bussen stannat och när kompisen vinkar
  let X = x, y = MARK, sx = 1, sy = 1, k = 1, opacity = 1, mun = kit.prat(t, [T.PRAT]);
  let ogon = (t > T.STOPP && t < T.STOPP + 0.8) || (!o.vinkar && Math.abs(t - T.HEJ) < 0.5) ? 'happy' : 'open';
  const delar = { 'arm-r': o.vinkar ? vinkaStort(t, o.vinkar) : vinka(t, T.HEJ, -1, 1.5) };
  if (o.vinkar && delar['arm-r'][3] > 1.05) ogon = 'big';            // stora glada ögon medan hon vinkar
  mun = Math.max(mun, munLat(t, T.LAT));
  for (const a of [...(o.plask || []), ...T.ETT]) { const h = hopp(t, a, a + 0.22, 10, 0.06, 0.1); y += h.y; sx *= h.sx; sy *= h.sy; }
  // gungar lätt i takt medan den väntar (som kompisarna i fönstren), så att den aldrig står helt still (Sanna 2026-11-05)
  const takt = Math.pow(Math.sin((t + (T.sang?.[0] ?? 0) - BEAT0) / BEAT * Math.PI), 2);
  sx *= 1 + 0.015 * takt; sy *= 1 - 0.025 * takt;
  const [a1, a2, a3] = T.HOPP, L = 0.37, h1 = hopp(t, a1, a1 + L, 40), h2 = hopp(t, a2, a2 + L, 40), h3 = hopp(t, a3, a3 + L, 110, 0.12, 0.01);
  if (t >= a1 - 0.12) {
    const steg = (x - dx - 200) / 2;
    X = x - steg * (del(a1, a1 + L, t) + del(a2, a2 + L, t)) - 200 * del(a3, a3 + L, t);
    y = lerp(MARK, dy, del(a3, a3 + L, t)) + h1.y + h2.y + h3.y;
    sx = h1.sx * h2.sx * h3.sx; sy = h1.sy * h2.sy * h3.sy;
    k = lerp(1, 0.6, mjuk(del(0.55, 1, h3.luft)));
    opacity = 1 - mjuk(del(0.8, 0.98, h3.luft));
    Object.assign(delar, kit.benHopp(Math.max(h1.ben, h2.ben, h3.ben)));
    ogon = 'happy';
  }
  f.pose({ x: X, y, k, sx, sy, opacity, ogon, titt: -1, mun, blink: blink(t, o.blink || []), delar, synlig: t < a3 + L });
}

// Ett stort vink per tid i toppar (t.ex. ett på varje "hej"): armen uppe hela tiden, ett stort svep på varje topp.
function vinkaStort(t, toppar, sida = -1) {
  const a = toppar[0] - 0.35, b = toppar[toppar.length - 1] + 0.55;
  const upp = mjuk(del(a, a + 0.3, t)) * mjuk(del(b, b - 0.3, t));
  const svep = toppar.reduce((s, h) => s + Math.sin(Math.PI * del(h - 0.1, h + 0.45, t)), 0);
  return [sida * (100 * upp + 45 * svep), 0, 0, 1 + 0.6 * upp + 0.1 * svep];   // ut åt sidan (kl 2), upp mot kl 12 på varje topp
}
// En vinkande hand över fönster i, ritad i kod i kompisens färg med vit kant (armen i fönstret klipps av rutan,
// så handen är det som syns, som i storyboardens bild 16). Ger h(t, vinkningar = [[topp, längd], …]).
const HANDFARG = { 'grodan-gurra': '#7aad42', 'ankan-agda': '#f9d866' };
function hand(b, i, farg) {
  // klippt till rutan: handen kommer upp underifrån fönsterkanten bredvid ansiktet, i stället för att sväva ovanför taket (Sanna 2026-11-05)
  const [x, y, w, h0] = b.F.fonster[i], id = `handruta-${i}-${Math.random().toString(36).slice(2, 7)}`;
  el('rect', { x, y, width: w, height: h0 }, el('clipPath', { id }, b.inre));
  const g = el('g', {});
  b.inre.insertBefore(el('g', { 'clip-path': `url(#${id})` }), b.ansikte).appendChild(g);
  for (const [fill, kant] of [['#fff', 18], [farg, 0]]) {
    const h = el('g', { fill, stroke: fill, 'stroke-width': kant, 'stroke-linejoin': 'round' }, g);
    el('rect', { x: -36, y: -74, width: 72, height: 74, rx: 32 }, h);
    for (const [fx, l] of [[-27, 50], [-9, 64], [9, 64], [27, 50]]) el('rect', { x: fx - 8, y: -58 - l, width: 16, height: l + 10, rx: 8 }, h);
    el('rect', { x: -62, y: -60, width: 16, height: 42, rx: 8, transform: 'rotate(-38 -54 -18)' }, h);
  }
  return (t, lista) => {
    const v = lista.find(([a, l]) => t > a - l / 2 && t < a + l / 2);
    g.style.display = v ? '' : 'none';
    if (!v) return;
    const [a, l] = v, upp = mjuk(del(a - l / 2, a - l / 2 + 0.25, t)) * mjuk(del(a + l / 2, a + l / 2 - 0.25, t));
    g.setAttribute('transform', `translate(${x + w * 0.82} ${y + h0 + 20 + 120 * (1 - upp)}) rotate(${Math.sin((t - a) * 11) * 16 * upp}) scale(0.8)`);
  };
}

// En kompis i fönstret: studsar lite i takt (fas), skuttar på tiderna i skutt, vinkar på vinka = [[topp, längd], …] (med o.hand).
// fram = tiden då kompisen dyker upp (kommer upp underifrån). o: { sang0, forskj, ogon, titt, tittY, mun, blink, hand }
// Ögonen är öppna utom under skutt och vinkningar; o.ogon tvingar (t.ex. 'big'). Med en ritad hand (o.hand) vinkar bara den.
function iFonster(f, bas, t, o) {
  const fram = o.fram ?? -100;
  let studs = Math.pow(Math.sin(((t + o.sang0 - BEAT0) / BEAT + (o.forskj || 0)) * Math.PI), 2) * 4, sx = 1, sy = 1;
  let glad = false;
  for (const a of o.skutt || []) { const h = hopp(t, a, a + 0.26, 24, 0.06, 0.1); studs -= h.y; sx *= h.sx; sy *= h.sy; if (t > a - 0.05 && t < a + 0.4) glad = true; }
  studs -= 140 * (1 - mjuk(del(fram, fram + 0.3, t)));
  bas.ruta.style.display = t >= fram ? '' : 'none';   // tomt fönster utan mörk ruta tills kompisen sitter där
  o.hand?.(t, o.vinka || []);
  const arm = (o.vinka || []).find(([v, l]) => t > v - l / 2 && t < v + l / 2);
  // öppna ögon som standard (blinkar då och då); glad (stängda bågar) bara kort, under ett skutt eller en vinkning
  f.pose({ ...bas, y: bas.y - studs, sx, sy, ogon: o.ogon || (glad || arm ? 'happy' : 'open'), titt: o.titt ?? 1, tittY: o.tittY || 0, mun: Math.max(o.mun || 0, munLat(t, o.lat || [])),
    delar: arm && !o.hand ? { 'arm-r': vinka(t, arm[0], -1, arm[1]) } : {}, blink: blink(t, o.blink || []), synlig: t >= fram });
}

// Fjärilen fladdrar lugnt över himlen från höger till vänster mellan t0 och t1 (som 003).
function fjaril(fia, t, [t0, t1], y0 = 330) {
  const k = del(t0, t1, t), slag = (1 + Math.cos(t * Math.PI * 7)) / 2, q = 0.35 + 0.65 * slag;
  const vinge = (px, py) => `translate(${px} ${py}) scale(${q} 1) translate(${-px} ${-py})`;
  fia.pose({ x: lerp(2080, -160, k), y: y0 + 40 * Math.sin(k * Math.PI * 2.5) - 12 * slag, tilt: -4 + 4 * Math.sin(t * 2.2), titt: -1,
    synlig: k > 0 && k < 1, delar: { 'wing-l': vinge, 'wing-r': vinge } });
}

// Stående (kit.STAENDE): kameran i helbild. Följer bussen i backen, står annars på bussen och glider till stoppet
// (bussens nos, dörren och kompisen, x 1250) under fokus = [[från, till], …], 0,8 s glid in och ut.
const STAENDE_STOPP = 1340;   // var 1250; närmare bild 2026-11-09, så att kompisen vid stoppet ryms
function staende(kam, t, backe, fokus = []) {
  if (!kit.STAENDE || kam[2] !== 1) return kam;
  if (backe) return [Math.min(1270, Math.max(650, backe.x)), 540, 1];   // inom backarnas bredd
  // fokus: [[a, b, x = STAENDE_STOPP], …], kameran glider till x under [a, b]
  const x0 = BUSS.x + 110;   // Shorts 2026-11-09: närmare bild, så kameran står på bussens front och ansikte med lite väg framför; bakdelen får gå ut ur bild
  let x = x0;
  for (const [a, b, m = STAENDE_STOPP] of fokus) { const k = mjuk(del(a - 0.8, a, t)) * (1 - mjuk(del(b, b + 0.8, t))); if (k > 0) x = lerp(x0, m, k); }
  return [x, 540, 1];
}

window.kor = { BUSS, kant, staende, STORLEK, nyBuss, narbild, V, MARK, PLATS, vag, sol, solDans, sak, korning, tutStreck, buss, dorrPunkt, stoppTider, stoppPlats, stank, handduk,
  vanUte, vinkaStort, hand, HANDFARG, iFonster, fjaril, lat, latTider, forbiHus, get saker() { return saker; } };
})();
