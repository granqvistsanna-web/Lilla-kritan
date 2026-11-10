// Gula sången (011): alla bilder i storyboarden som rörelse, en ANIM per rad i ../storyboard-v2/storyboard.md. Varje scen
// (<scen>/index.html) sätter window.SCEN = [första, sista] och laddar ../storyboard-v2/scen-kit.js och den här filen. Tiderna
// (avsnittstid) läses ur storyboard.md, så filmen följer tabellen. Sången börjar på avsnittstid SANG0; scenens t = 0 är dess första
// bilds start. render.mjs anropar window.seek(t). Inget slumpas: samma t ger alltid samma bild.
const SANG0 = 22.2, SLUT = 173.2, BEAT = 60 / 112;            // 112 bpm; SLUT: sången slutar 170,2, sedan 3 s tyst svans (kritirisen)
let TID = 0, BILD = '', BILD0 = 0, MED = false;               // BILD = storyboardbilden just nu; MED: refräng 2 (humlan och bananen åker med)
const studs = s => Math.abs(Math.sin(Math.PI * s / BEAT));    // ett skutt per slag, 0 på slaget
const takt = () => studs(TID - SANG0);
const pop = k => k <= 0 ? 0 : k >= 1 ? 1 : ease(k) * (1 + 0.3 * Math.sin(Math.PI * k));
// skutt: en mjuk puckel (h px, d s lång) per tid i listan
const skutt = (t, tider, h = 36, d = 0.3) => tider.reduce((a, t0) => { const k = (t - t0) / d; return a + (k > 0 && k < 1 ? h * Math.sin(Math.PI * k) : 0); }, 0);
const lyft = (t, tider, d = 0.45) => tider.reduce((a, t0) => a + ease((t - t0) / d), 0);   // trappsteg: +1 per tid (lyft på "upp, upp, upp")
const U = (namn, a, b, k) => FIG[namn].L.blanda(a, b, k);   // blanda två uttryck för en figur

// Ordens tider (avsnittstid = sångtid + 22,2): radernas start ur rader.txt, orden inom raden ur en Whisper-körning med
// ordtider (ggml-small, ca ±0,3 s; "Ha-ha!" hörs inte i den, så det sätts 1,2 s före nästa rad). Justera här om något kommer fel.
const ORD = {
  haha: [26.2, 30.5, 51.8, 90.8, 127.9, 155.8],               // "(Ha-ha!)" i varje "Gul är den gladaste färgen!"
  snurra: 33.8,                                               // "(snurra, snurra!)" i 02c: rotorn börjar snurra
  upp: [[47.9, 48.4, 48.9], [87.0, 87.5, 88.0], [124.9, 125.4, 125.9]],   // "Upp, upp, upp"
  surr: [59.6, 60.3, 61.0], mums: [67.8, 68.5, 69.2], vifta: [76.4, 77.9, 79.4], hej: [98.7, 99.4, 100.2],
};
// Rotorns varvtal [avsnittstid, varv/s] (kitets ROTOR): står still på marken, börjar på "snurra, snurra", Lage stänger av motorn i
// mellanspelet (08a), startar igen på "Snurra, snurra" i refräng 3 (09b).
ROTOR = [[0, 0], [ORD.snurra - 0.2, 0], [ORD.snurra + 0.9, 1.4], [103.6, 1.4], [105.6, 0], [120.7, 0], [121.7, 1.1]];

// --- Uppställningar --------------------------------------------------------------------------------------------------------
const HEL = { x: 740, botten: 963, s: 0.537 };                  // himlen, helbild: helikoptern på vänstra tredjedelen
const MARK = { x: 619, botten: 972, s: 0.433 };                 // dammen, 02a–02c: på marken till vänster om dammen
const LAND = { x: 429, botten: 972, s: 0.371 };                 // dammen, 07–09: landad i gräset
const SOLH = { x: 725, botten: 907, s: 0.454 };                 // jättesolen
const KAJSA = [1680, 962, 0.46], GURRA_S = 0.28;
const vinkArm = (t, bas = 66) => bas + 16 * Math.sin(t * 9);
// Helikoptern med det som åker med i refräng 2 (06a–06e): bananen i karet och humlan som surrar bredvid bubblan
function hel(o) {
  const P = heli({ ...o, i_karet: (o.i_karet || '') + (MED ? bananSvg(1390, 230, 300, -22) : '') });
  if (MED) { const s = o.s ?? HEL.s, [hx, hy] = P([1760, -40 + 24 * Math.sin(TID * 7)]);
    visa('humle', { lager: 'fordon', x: hx, fot: hy, s: 0.52 * s, u: BILD.endsWith('e') ? 'jatteglad' : 'glad', po: { luta: 6 * Math.sin(TID * 3) }, skugga: false }); }
  return P;
}
// I luften: himlen med glidande moln, helikoptern gungar lugnt
function flyg({ u = 'glad', po = 'neutral', rot = 0, dx = 0, dy = 0, svans = null, i_karet = '', fram = '', sjunk = 0, ...o } = {}) {
  himmel(TID * 70, sjunk);
  return hel({ ...HEL, ...o, x: (o.x ?? HEL.x) + dx, botten: (o.botten ?? HEL.botten) + dy + 9 * Math.sin(TID * 2.1), rot, lage: [u, po], svans, i_karet, fram });
}
const narbild = (P, z = 2.46, dy = 0) => { const [fx, fy] = P(LAGE_ANSIKTE); kamera(z, fx, fy + dy); };
// Refrängbilden: helikoptern gungar i takt (lutar åt varannan sida på två slag), studsar lite, Lage gungar med
const refrangbild = (rot0 = 0, fjaril = false) => (u, s) => {
  const P = flyg({ u: 'jatteglad', po: { armar: [24, 24] }, rot: rot0 + 4 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)), dy: -10 * takt() });
  if (fjaril) { const x = lerp(2000, 1080, s / 3.7), y = 330 + 26 * Math.sin(s * 2.4);   // fjärilen fladdrar förbi långt bort
    lagg('bakom', `<image href="${FJARIL}" width="1024" height="1024" transform="translate(${x} ${y}) scale(0.11 ${(0.11 * (0.8 + 0.2 * Math.abs(Math.cos(s * 14)))).toFixed(4)}) translate(-512 -512)"/>`); }
  kamera(1); return P;
};
const pekar = (u, s) => { const P = flyg({ u: 'glad', po: { armar: [0, 118], luta: 2 } }); narbild(P, 1.81, -150); };
// "Upp, upp, upp till solen!": gult kritsvep, helikoptern kommer in nerifrån i tre lyft och stannar framför solen
const tillSolen = upp => (u, s) => {
  jattesol({ t: TID, ansikte: 'glad' });
  const k = lyft(TID, upp) / 3;
  hel({ ...SOLH, botten: SOLH.botten + 640 * (1 - k) + 8 * Math.sin(TID * 2.1), lage: ['forvanad', { armar: [10, 10], upp: 0.3 }] });
  kamera(1);
};
// "Gul är den gladaste färgen! (Ha-ha!)" vid solen: floden växer, solen skrattar; på "Ha-ha!" blinkar solen och allt skuttar
const solSkrattar = haha => (u, s) => {
  const h = skutt(TID, [haha, haha + 0.42], 30), blink = TID > haha - 0.1 && TID < haha + 1.1;
  jattesol({ t: TID, flod: fas(s, 0, 1.2), bop: h + 8 * takt(), ansikte: blink ? 'blinkar' : 'fnissig' });
  hel({ ...SOLH, botten: SOLH.botten - 1.4 * h + 8 * Math.sin(TID * 2.1), lage: ['jatteglad', { armar: [52, 52] }] });
  kamera(1);
};
// Lage spanar: tassen över ögonen, blicken åt ena hållet och sedan åt det andra
const spanar = (s, arm = 1) => ({ u: { bas: 'nyfiken', titt: [13 * Math.sin(s * 1.5), -4] }, po: { armar: arm ? [0, 100] : [100, 0], luta: 3 * Math.sin(s * 1.5) } });
// Humlans väg: långt bort (04a) → framför helikoptern (04b) → tre öglor runt bubblan (04c)
const HUMLE_MAL = [1300, 560];

// --- Dammen ---------------------------------------------------------------------------------------------------------------
const kajsa = (o = {}) => visa('kajsa', { x: KAJSA[0], fot: KAJSA[1], s: KAJSA[2], ...o });
const gurra = (x, fot, o = {}) => visa('gurra', { x, fot, s: GURRA_S, ...o });
const HATT_KAJSA = () => iFigur('kajsa', ...KAJSA, [512, 300]);   // hattens underkant mitt (i hennes 1024-ruta: y 300)
// Gurras hopp i 08b: [tid, från, till]. Blad till blad i takt, tar hatten på det tredje, hoppar sedan fram till Kajsa.
const G0 = [790, 1000], GHOPP = [[109.9, G0, [921, 907]], [111.0, [921, 907], [1186, 963]], [112.1, [1186, 963], [1465, 910]],
  [113.5, [1465, 910], [1450, 1030]]];
const gurraPlats = t => { let p = G0, h = 0;
  for (const [t0, a, b] of GHOPP) { const k = (t - t0) / 0.62; if (k >= 1) p = b; else if (k > 0) { p = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]; h = 120 * Math.sin(Math.PI * k); } }
  return [p[0], p[1] - h, h]; };
const GURRA_VID = [1450, 1030];

// --- Discot ---------------------------------------------------------------------------------------------------------------
const DANS = { kajsa: [349, 0.70], gurra: [753, 0.56], humle: [1158, 0.70], hugo: [1563, 0.70] }, DANS_GOLV = 1026;
// dansare({ namn: { u, po, dy } }, { gap, krymp }): de fyra på golvet, glada och gungande i takt om inget annat sägs
function dansare(o = {}, { gap = 0, krymp = 0, studs: st = 14 } = {}) {
  for (const [n, [x0, k]] of Object.entries(DANS)) {
    const d = o[n] || {}, x = 960 + (x0 - 960) * (1 + 0.28 * gap), s = k * (1 - 0.18 * krymp);
    visa(n, { x, fot: DANS_GOLV - 60 * krymp + (d.dy ?? -st * takt()), s, u: d.u || 'glad', po: d.po || { luta: 3 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)) }, mun: d.mun });
  }
}
const klapp = (n, tl) => { const [f, p] = FIG[n].L.ROR.klappa(kl01(tl / 3) * 3); return { u: { ...f, armar: FIG[n].L.NEUTRAL.armar }, po: p }; };   // riggens riktiga klapp (3 s), händerna möts framför bröstet
const SLOT = { heli: [1459, 349], banan: [739, 209], humle: [1180, 209], hatt: [460, 349] }, MITT = [960, 419];
// klistermärkena: de som redan sitter i bågen, och det nya som slås upp stort i mitten och flyger upp till sin plats
function klistren(redan, ny, s, d) {
  for (const n of redan) klistermarke(...SLOT[n], 109, n);
  if (!ny) return;
  const in_ = pop(s / 0.45), ut = ease((s - (d - 0.7)) / 0.6), [x, y] = [lerp(MITT[0], SLOT[ny][0], ut), lerp(MITT[1], SLOT[ny][1], ut)];
  klistermarke(x, y, lerp(209, 109, ut), ny, in_);
  if (ut < 0.2) glitter(MITT[0], MITT[1], 230, s - 0.3, 7);
}

// --- Bilderna --------------------------------------------------------------------------------------------------------------
const ANIM = {
  // Zoom in genom ett hål i papperet (01c → 02a, 22,2–24,2): dammen syns genom hålet, papperet växer ut ur bild. Sången börjar.
  '02a': (u, s) => {
    dammen();
    const h = skutt(TID, [ORD.haha[0], ORD.haha[0] + 0.42], 34);
    heli({ ...MARK, botten: MARK.botten - h, lage: ['jatteglad', { armar: [0, vinkArm(s, 86)] }] });
    pynt(`<ellipse cx="${MARK.x + 20}" cy="${MARK.botten + 6}" rx="${250 - 2 * h}" ry="22" fill="#2d5a3a" opacity="0.14"/>`);
    const z = fas(s, 0, 2.0);
    kamera(lerp(1.5, 1, z), lerp(700, 960, z), lerp(720, 540, z));
    papperHal(fas(s, 0.1, 2.0));
  },
  '02b': (u, s) => {   // närbild: Lage skrattar i bubblan, Ha-ha-skämtet (helikoptern skuttar två gånger på medarna)
    dammen();
    const h = skutt(TID, [ORD.haha[1], ORD.haha[1] + 0.42], 34);
    const P = heli({ ...MARK, botten: MARK.botten - h, lage: ['fnissig', { luta: 3 * Math.sin(s * 6) }] });
    narbild(P, 2.15, 60);
  },
  '02c': (u, s) => {   // rotorn börjar snurra på "snurra, snurra", vindvirvlar mot marken, helikoptern lyfter
    dammen();
    const upp = 330 * ease((TID - (ORD.snurra + 1.0)) / 1.6), sp = kl01(varv(TID) / 1.4);
    heli({ ...MARK, botten: MARK.botten - upp, rot: -2 * ease((TID - ORD.snurra - 1) / 1.6), lage: ['glad', { armar: [10, 10] }] });
    if (sp > 0.1) { vind(MARK.x - 40, 1000, (TID * 1.6) % 1, 2); }
    pynt(`<ellipse cx="${MARK.x + 20}" cy="${MARK.botten + 6}" rx="${250 * (1 - 0.5 * upp / 330)}" ry="22" fill="#2d5a3a" opacity="${(0.14 * (1 - 0.6 * upp / 330)).toFixed(3)}"/>`);
    kamera(lerp(1, 1.12, ease(s / 4)), 700, lerp(620, 560, ease(s / 4)));
  },
  '02d': (u, s, d) => {   // rakt klipp upp i himlen: två lugna lyft, molnen sjunker undan, rakt igenom ett moln, planet långt bort
    const k = 0.5 * ease(s / 1.3) + 0.5 * ease((s - 1.7) / 1.3), sjunk = 420 * ease(s / d);
    lagg('bakom', planSvg(lerp(1980, 1350, s / d), 250, 70));
    const P = flyg({ u: 'jatteglad', po: { bas: 'upp', armar: [44, 44] }, dy: 420 * (1 - k), sjunk });
    const my = lerp(-150, 1500, (s - 0.7) / 1.3);   // molnet de flyger igenom glider ner förbi bubblan
    if (s > 0.6 && s < 2.1) sak('framfor', MOLN.stort, 880, my, 470);
    if (s > 1.45) { const [x, y] = P([840, -150]);   // en liten molntuss stannar på bubblan
      sak('framfor', MOLN.litet, x, y + 4 * Math.sin(s * 3), 70 * ease((s - 1.45) / 0.3), `rotate(-12 ${x} ${y})`); }
    kamera(1);
  },
  '03a': refrangbild(-2, true),
  '03b': pekar,
  '03c': refrangbild(2),
  '03d': tillSolen(ORD.upp[0]),
  '03e': solSkrattar(ORD.haha[2]),
  '04a': (u, s, d) => {   // Lage spanar; långt borta till höger surrar en liten gul prick närmare (barnet ser humlan först)
    const P = flyg(spanar(s));
    visa('humle', { lager: 'bakom', x: lerp(1860, 1700, s / d), fot: 430 + 14 * Math.sin(s * 5), s: lerp(0.04, 0.07, s / d), u: 'glad', skugga: false });
    kamera(1);
  },
  '04b': (u, s) => {   // Humle surrar in och stannar framför helikoptern, gnistrar
    const k = ease(s / 0.9), x = lerp(1700, HUMLE_MAL[0], k), y = lerp(430, HUMLE_MAL[1], k) + 12 * Math.sin(s * 6);
    flyg({ u: 'jatteglad', po: { armar: [0, 48], luta: 3 } });
    visa('humle', { lager: 'framfor', x, fot: y, s: lerp(0.07, 0.3, k), u: 'glad', po: { luta: 5 * Math.sin(s * 9) }, skugga: false });
    glitter(x, y - 160, 130, s - 0.8, 5);
    kamera(1);
  },
  '04c': (u, s) => {   // tre små öglor runt bubblan, en per "surr"
    const P = flyg({ u: 'fnissig', po: { luta: 2 } }), [cx, cy] = P([1250, -30]);
    let x = HUMLE_MAL[0], y = HUMLE_MAL[1];
    for (const t0 of ORD.surr) { const k = (TID - t0) / 0.75; if (k > 0 && k < 1) { const a = 2 * Math.PI * ease(k);
      x = HUMLE_MAL[0] + 120 * Math.sin(a) - 0; y = HUMLE_MAL[1] - 110 * (1 - Math.cos(a)); } }
    visa('humle', { lager: 'framfor', x, fot: y + 10 * Math.sin(s * 6), s: 0.3, u: 'jatteglad', po: { luta: 6 * Math.sin(s * 9) }, skugga: false });
    kamera(1);
  },
  '04d': (u, s) => {   // spanar igen; ett litet moln glider undan, bananens spets kikar fram bakom ett moln
    flyg(spanar(s + 1.5, 0));
    sak('bakom', MOLN.litet, 1420 + 380 * ease((s - 0.6) / 2), 520, 120);
    lagg('bakom', bananSvg(1500, lerp(700, 610, ease((s - 1.4) / 1.6)), 190, -10));
    sak('bakom', MOLN.mellan, 1500, 720, 260);
    kamera(1);
  },
  '04e': (u, s, d) => {   // bananen flyter in på ett moln och gnistrar
    const P = flyg({ u: U('lage', 'forvanad', 'jatteglad', fas(s, 0.6, 1.0)), po: { armar: [0, 30 * fas(s, 0.6, 1)] } });
    const [mx, my] = P([1890, 200]), x = mx + 260 * (1 - ease(s / 0.8)), y = my + 6 * Math.sin(s * 3);
    sak('pynt', MOLN.litet, x, y + 80, 110); lagg('pynt', bananSvg(x, y + 18, 200, -10));
    glitter(x, y - 80, 130, s - 0.5, 5);
    kamera(1);
  },
  '04f': (u, s) => {   // närbild: Lage tar bananen och tar tre tuggor, en per "mums", slickar sig om munnen
    const bett = ORD.mums.filter(t => TID > t + 0.12).length, oppen = ORD.mums.some(t => TID > t - 0.05 && TID < t + 0.28);
    const kvar = 1 - 0.22 * bett, tunga = TID > ORD.mums[2] + 0.35;
    const banan = `<g><clipPath id="bett"><rect x="-2000" y="${(-1535 * kvar).toFixed(0)}" width="4000" height="3000"/></clipPath>
      <g transform="translate(1330 300) rotate(-28) scale(${(330 / 1535).toFixed(4)})"><g clip-path="url(#bett)"><image href="${BANAN}" width="1659" height="1535" transform="translate(-830 -1535)"/></g></g></g>`;
    const mun = oppen ? { mun: [16, 15, 1, 462], streck: 0 } : null;
    const P = flyg({ u: 'jatteglad', po: { armar: [0, 50] }, fram: banan + (tunga ? `<ellipse cx="1088" cy="${LAGE_ANSIKTE[1] + 76}" rx="16" ry="12" fill="#E7898C" stroke="#B9565F" stroke-width="3"/>` : '') });
    if (mun) visa('lage', { lager: 'heli-lage', x: LAGE_FOT[0], fot: LAGE_FOT[1], s: LAGE_K, u: 'jatteglad', po: { armar: [0, 50] }, skugga: false, mun });
    narbild(P, 2.46, 40);
  },
  '05a': (u, s) => {   // Lage tittar åt vänster och höger; tofsen sticker upp över karets kant bakom honom och viftar en gång
    const v = 15 + 16 * Math.sin(Math.PI * kl01((TID - 72.0) / 0.6)) * (TID < 72.6 ? 1 : 0);
    const titt = s < 2.2 ? -13 : 13 * fas(s, 2.2, 2.6) - 13 * (1 - fas(s, 2.2, 2.6));
    const P = flyg({ u: { bas: 'nyfiken', titt: [titt, -2] }, po: { luta: -2 }, svans: { v } });
    narbild(P, 1.81, 60);
  },
  '05c': (u, s) => {   // överraskningen: kameran zoomar in på svansen, tofsen gnistrar, Lage ser sin egen svans
    const P = flyg({ u: U('lage', { bas: 'forvanad', titt: [14, 8] }, { bas: 'fnissig', titt: [14, 8] }, fas(s, 0.8, 1.3)), svans: { v: 15 } });
    const [tx, ty] = P(tofsen(15)), [fx, fy] = P(LAGE_ANSIKTE), k = fas(s, 0, 0.7);
    kamera(lerp(1.81, 2.6, k), lerp(fx, tx - 80, k), lerp(fy + 60, ty + 50, k));
    glitter(tx, ty, 70, s - 0.3, 5);
  },
  '05d': (u, s) => {   // svansen viftar tre gånger, en per "vifta"
    const v = 15 + ORD.vifta.reduce((a, t0) => a + 24 * Math.sin(2 * Math.PI * kl01((TID - t0) / 0.6)), 0);
    const P = flyg({ u: { bas: 'fnissig', titt: [14, 8] }, svans: { v } }), [tx, ty] = P(tofsen(15));
    kamera(lerp(2.6, 2.3, ease(s / 4)), tx - 80, ty + 50);
  },
  // Refräng 2 (06a–06e) spelar refräng 1:s rörelser med humlan och bananen (MED, sätts i seek)
  '07a': (u, s) => {   // turkost kritsvep → dammen: helikoptern landar i två lugna sänkningar, Kajsa står vid kanten med hatten
    dammen();
    const k = 0.5 * ease((s - 0.4) / 1.5) + 0.5 * ease((s - 2.4) / 1.5), upp = 380 * (1 - k);
    heli({ ...LAND, botten: LAND.botten - upp, lage: ['nyfiken', { armar: [10, 10] }] });
    if (upp < 160) vind(LAND.x - 30, 1000, (TID * 1.6) % 1, 2);
    kajsa({ u: 'glad' });
    kamera(1);
  },
  '07b': (u, s) => {   // tvåbild: hatten gnistrar på Kajsas huvud
    dammen(); heli({ ...LAND, lage: ['glad', 'neutral'] }); kajsa({ u: 'stolt' });
    const [hx, hy] = HATT_KAJSA(); glitter(hx, hy - 50, 120, s - 0.15, 6);
    kamera(1.6, 1256, 700);
  },
  '07c': (u, s) => {   // Kajsa vinkar tre gånger, Lage vinkar tillbaka
    dammen();
    heli({ ...LAND, lage: ['jatteglad', { armar: [0, vinkArm(s - 0.3) * fas(s, 0.2, 0.5)] }] });
    kajsa({ u: 'jatteglad', po: { armar: [0, vinkArm(s, 70)] } });
    kamera(1.15, 1100, 700);
  },
  '08a': (u, s) => {   // mellanspel 1: vinden lyfter hatten, den landar på det tredje bladet; Lage stänger av motorn; Kajsa får en tår
    dammen();
    heli({ ...LAND, lage: [TID < 103.2 ? 'forvanad' : U('lage', 'forvanad', 'ledsen', fas(TID, 105, 106)), { armar: [12, TID > 103.2 && TID < 104.2 ? 40 : 12] }] });
    if (TID < 101.8) vind(LAND.x + 340, 900, (TID * 1.6) % 1, 2);
    const k = (TID - 100.8) / 1.8, [h0x, h0y] = HATT_KAJSA(), [bx, by] = BLADEN[2];
    kajsa({ u: TID < 101.0 ? 'glad' : U('kajsa', 'forvanad', 'ledsen', fas(TID, 102.6, 103.4)), hatt: k <= 0, po: { armar: [6, 6] } });
    if (k > 0) { const kk = Math.min(1, k), x = lerp(h0x, bx, ease(kk)), y = lerp(h0y, by + 10, kk) - 280 * Math.sin(Math.PI * kk);
      pynt(hattSvg(x, y, 138 * lerp(1, 0.7, kk), 18 * Math.sin(2 * Math.PI * kk) * (1 - kk))); }
    if (TID > 106.2) { const [ex, ey] = iFigur('kajsa', ...KAJSA, [600, 430]); tar(ex, ey + 50 * kl01((TID - 106.2) / 2.2), 12); }
    kamera(1.05, 1100, 640);
  },
  '08b': (u, s) => {   // mellanspel 2: Gurra hoppar blad till blad, tar hatten och hoppar tillbaka, räcker den till Kajsa
    dammen();
    heli({ ...LAND, lage: [TID < 115.6 ? 'glad' : 'jatteglad', { armar: TID > 115.8 ? [50, 50] : [10, 10] }] });
    const [gx, gy, gh] = gurraPlats(TID), harHatt = TID > 112.6, given = TID > 115.2, [bx, by] = BLADEN[2];
    gurra(gx, gy, { u: TID < 112.6 ? 'jatteglad' : 'stolt', po: { armar: harHatt && !given ? [60, 60] : TID > 115.8 ? [60, 60] : [10, 10], strack: gh > 0 ? 0.04 : 0 }, skugga: gh === 0 });
    const [hx, hy] = HATT_KAJSA(), nick = Math.sin(Math.PI * kl01((TID - 115.4) / 0.8));
    kajsa({ u: TID < 115.2 ? 'ledsen' : 'jatteglad', hatt: given, po: { upp: -0.35 * nick, armar: TID > 115.8 ? [50, 50] : [6, 6] } });
    if (!harHatt) pynt(hattSvg(bx, by + 10, 97));
    else if (!given) { const [ghx, ghy] = [gx, gy - 0.28 * 760], k = ease((TID - 114.4) / 0.8);
      pynt(hattSvg(lerp(ghx, hx, k), lerp(ghy, hy, k) - 60 * Math.sin(Math.PI * k), lerp(90, 138, k))); }
    if (given) glitter(hx, hy - 50, 120, TID - 115.6, 6);
    kamera(1.3, 1250, 780);
  },
  '09a': (u, s) => vidDammen({ u: 'jatteglad', hopp: 12 * takt() }),
  '09b': (u, s) => vidDammen({ u: 'glad', kajsa: { u: 'fnissig', po: { armar: [0, 125] } } }),
  '09c': (u, s) => vidDammen({ u: 'jatteglad', hopp: 12 * takt() }),
  '09d': (u, s) => vidDammen({ u: 'jatteglad', upp: 100 * lyft(TID, ORD.upp[2]), vinka: true }),
  '09e': (u, s) => {   // Kajsa och Gurra hoppar, helikoptern skuttar i luften; på "Ha-ha!" tittar solen fram över vassen och allt blir gult
    const h = ORD.haha[4], gl = fas(TID, h - 0.3, h + 0.2);
    vidDammen({ u: 'jatteglad', hopp: 46 * takt(), upp: 300 + skutt(TID, [h, h + 0.42], 30) });
    const sy = lerp(330, 210, fas(TID, h - 0.8, h));
    litenSol(1740, sy, 110, gl > 0.5 ? 'fnissig' : 'glad');
    if (gl > 0) lagg('pynt', `<rect x="-100" y="-100" width="2120" height="1280" fill="#FFE26E" opacity="${(0.2 * gl).toFixed(3)}"/>`);
  },
  '10a': (u, s) => { disco({ s }); dansare({ kajsa: { u: 'jatteglad' }, gurra: { u: 'jatteglad' }, humle: { u: 'jatteglad' }, hugo: { u: 'jatteglad' } }, { studs: 24 }); kamera(1); },
  '10b': (u, s, d) => { disco({ s }); dansare({ kajsa: { ...klapp('kajsa', s * 3 / d), dy: 0 } }); kamera(1); },
  '10c': (u, s) => { disco({ s }); dansare({ humle: { u: 'jatteglad', po: { luta: 10 * Math.sin(Math.PI * s / (2 * BEAT)), x: 30 * Math.sin(Math.PI * s / (2 * BEAT)) } } }); kamera(1); },
  '10d': (u, s) => { disco({ s }); const h = skutt(TID, [137.2, 138.3], 160, 0.55);
    dansare({ gurra: { u: 'jatteglad', dy: -h, po: { armar: [h / 4, h / 4], strack: h > 0 ? 0.05 : 0 } } }); kamera(1); },
  '10e': (u, s) => { disco({ s }); dansare({ hugo: { u: 'blinkar', po: { bas: 'pekar', armar: [0, 40] } } }); kamera(1); },
  '10f': (u, s, d) => {   // andra varvet: alla gör varje rörelse tillsammans (klappa, gunga, hoppa), kameran lite närmare
    disco({ s });
    const t = TID, g = Math.sin(Math.PI * (t - 143.1) / (2 * BEAT)), h = skutt(t, [145.6, 146.6], 110, 0.5), o = {};
    for (const n of Object.keys(DANS)) {
      if (t < 143.1) o[n] = { ...klapp(n, (t - 141.1) * 1.5), dy: 0 };
      else if (t < 145.2) o[n] = { u: 'jatteglad', po: { luta: 9 * g, x: 25 * g } };
      else o[n] = { u: 'jatteglad', dy: -h, po: { armar: [h / 4, h / 4] } };
    }
    dansare(o); kamera(1.15, 960, 640);
  },
  '10g': (u, s) => { disco({ s }); const o = {}; for (const n of Object.keys(DANS)) o[n] = { u: 'jatteglad', po: 'hurra', dy: -20 * Math.sin(Math.PI * kl01(s / 0.6)) }; dansare(o); kamera(1); },
  '11a': (u, s, d) => { disco({ s }); klistren(['heli'], 'banan', s, d); dansare({}, { studs: 10 }); kamera(1); },
  '11b': (u, s, d) => { disco({ s }); klistren(['heli', 'banan'], 'humle', s, d);
    dansare({ humle: { u: 'jatteglad', dy: -skutt(TID, [151.0, 151.6], 50, 0.4), po: { luta: 6 * Math.sin(s * 9) } } }, { studs: 10 }); kamera(1); },
  '11c': (u, s, d) => { disco({ s }); klistren(['heli', 'banan', 'humle'], 'hatt', s, d);
    dansare({ kajsa: { u: 'jatteglad', po: { armar: [0, vinkArm(s, 70)] } } }, { studs: 10 }); kamera(1); },
  '11d': (u, s) => { disco({ s }); klistren(['heli', 'banan', 'humle', 'hatt']);
    const h = ORD.haha[5], stort = skutt(TID, [h], 130, 0.6), o = {};
    for (const n of Object.keys(DANS)) o[n] = { u: 'jatteglad', dy: -30 * takt() - stort, po: stort > 10 ? { armar: [50, 50] } : 'neutral' };
    dansare(o); kamera(1); },
  '11e': (u, s) => {   // hej då: helikoptern flyger in bakifrån genom luckan mitt mellan dansarna och växer, dansarna krymper och glider isär
    disco({ s }); klistren(['heli', 'banan', 'humle', 'hatt']);
    const k = ease(s / 1.8), o = {};
    Object.keys(DANS).forEach((n, i) => o[n] = { u: 'glad', po: { armar: [0, vinkArm(s, 70) * fas(s, 0.6 + 0.25 * i, 0.9 + 0.25 * i)] } });
    dansare(o, { gap: k, krymp: k, studs: 6 });
    heli({ x: 960 - 60 * k, botten: lerp(640, 1000, k) + 8 * Math.sin(TID * 2.1), s: lerp(0.12, 0.42, k),
      lage: ['blinkar', { armar: [0, vinkArm(s, 66) * fas(s, 1.4, 1.7)] }] });
    kamera(1);
  },
  '12': (u, s, d) => {   // rakt klipp → himlen: helikoptern flyger in åt höger och stannar, Lage vinkar, kritirisen sluter sig runt hans ansikte
    const ut = ease(s / 2.2), somnig = fas(TID, 166.6, 167.6);
    const P = flyg({ x: lerp(-700, HEL.x, ut), rot: -3 * (1 - ut), u: somnig > 0 ? U('lage', 'jatteglad', 'somnig', somnig) : 'jatteglad',
      po: { armar: [0, vinkArm(s) * fas(s, 2.0, 2.4) * (1 - fas(s, 5.4, 5.9))] } });
    kamera(1);
    const [fx, fy] = P(LAGE_ANSIKTE), r = lerp(1400, 290, fas(TID, 164.2, 166.4)) * (1 - fas(TID, 169.6, 170.8));
    if (TID > 164.2) kritiris(r, fx, fy - 20, { t: s, glimt: fas(TID, 167.0, 167.4) * (1 - fas(TID, 171.0, 171.5)), in: fas(TID, 169.6, 170.8) });
  },
};
['a', 'b', 'c', 'd', 'e'].forEach(b => ANIM['06' + b] = ANIM['03' + b]);
ANIM['06a'] = refrangbild(-2); ANIM['06d'] = tillSolen(ORD.upp[1]); ANIM['06e'] = solSkrattar(ORD.haha[3]);

// Vid dammen i refräng 3 (09a–09e): alla tre gungar i takt; upp = helikopterns höjd, vinka = Kajsa och Gurra vinkar
function vidDammen({ u = 'jatteglad', hopp = 0, upp = 0, vinka = false, kajsa: ko = {} } = {}) {
  dammen();
  heli({ ...LAND, botten: LAND.botten - upp - (upp > 0 ? 8 * Math.sin(TID * 2.1) : 0), lage: [u, { armar: upp > 0 ? [0, vinkArm(TID)] : [20, 20] }] });
  if (varv(TID) > 0.3 && upp < 200) vind(LAND.x - 30, 1000, (TID * 1.6) % 1, 2);
  kajsa({ u, fot: KAJSA[1] - hopp, po: vinka ? { armar: [0, vinkArm(TID, 70)] } : 'neutral', ...ko });
  gurra(GURRA_VID[0], GURRA_VID[1] - hopp * 0.8, { u, po: vinka ? { armar: [0, vinkArm(TID + 0.3, 70)] } : 'neutral' });
  kamera(1);
}
// En liten sol i kod (09e: tittar fram över vassen): skiva, runda kritstrålar och ansiktet som jättesolens
function litenSol(x, y, r, u) {
  const k = r / 230, stralar = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6;
    return `<line x1="${x + 1.25 * r * Math.cos(a)}" y1="${y + 1.25 * r * Math.sin(a)}" x2="${x + 1.62 * r * Math.cos(a)}" y2="${y + 1.62 * r * Math.sin(a)}" stroke="#FFD24A" stroke-width="${0.32 * r}" stroke-linecap="round"/>`; }).join('');
  lagg('bakom', `<g><g stroke="#fff" stroke-width="${0.32 * r + 10}">${stralar.replace(/stroke="#FFD24A" stroke-width="[^"]*"/g, '')}</g>${stralar}
    <circle cx="${x}" cy="${y}" r="${r + 5}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFCC33"/>
    <g transform="translate(${x} ${y}) scale(${k}) translate(${-SOL[0]} ${-SOL[1]})">${solAnsikte(u, TID)}</g></g>`);
}
// Zoom in genom ett hål i papperet (02a): papperet och bananen ligger i #ram (skärmens koordinater, utanför kameran) med ett
// växande hål med vaxig kant, och skalas upp mot hålet.
const HAL = [1300, 600], BANAN_PAPPER = [960, 830, 560, -8];   // bananen som kritan ritade (x, botten, h, rot), som slutet av kritan-ritar
function papperHal(k) {
  if (k >= 1) return;
  const r = 1700 * k ** 1.5, z = 1 + 2.2 * k * k;
  lagg('ram', `<defs><filter id="halkant" filterUnits="userSpaceOnUse" x="-3000" y="-3000" width="8000" height="7000">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="11"/><feDisplacementMap in="SourceGraphic" scale="70" xChannelSelector="R" yChannelSelector="G"/></filter>
    <mask id="halm" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="8000" height="7000"><rect x="-3000" y="-3000" width="8000" height="7000" fill="#fff"/>
      <circle cx="${HAL[0]}" cy="${HAL[1]}" r="${r.toFixed(1)}" fill="#000" filter="url(#halkant)"/></mask></defs>
    <g mask="url(#halm)"><g transform="translate(${HAL[0]} ${HAL[1]}) scale(${z.toFixed(4)}) translate(${-HAL[0]} ${-HAL[1]})">
      <rect x="-3000" y="-2000" width="8000" height="5000" fill="#F6EFE3"/>
      <rect x="120" y="70" width="1680" height="940" rx="14" fill="#FDFBF4" stroke="#e8e0cf" stroke-width="6"/>
      ${bananSvg(...BANAN_PAPPER)}</g></g>`);
}

// Kritsvepen (avsnittstid, färg): över skarven, SV s före och SV s efter. 02c → 02d, 09e → 10a och 11e → 12 är raka klipp.
const SVEP = [[47.8, 'gul'], [53.0, 'bla'], [87.0, 'gul'], [92.0, 'turkos']], SV = 0.8;

// --- Ljudet ---------------------------------------------------------------------------------------------------------------
// [namn eller lista med namn (det första som finns används), tid (avsnittstid), vol, { langd, loop, fade, fadeIn }]
// Djurljuden −8 dB under sången, i pauser och ekon (storyboardens tabell). Nya ElevenLabs-effekter (helikopter-surr, -start,
// -stannar, moln-puff, vind-hatt, ryt-gasp) finns sedan 2026-11-10, tagning 1 av varje (vind-hatt-2 är nästan tyst).
const ICLOUD = '../../Library/Mobile Documents/com~apple~CloudDocs/Lilla Kritan/Kvack-produktion/sfx/';
const EFFEKTER_FILM = [
  [['helikopter-start-1', 'propeller-1'], ORD.snurra - 0.2, 0.35, { langd: 3.0, fade: 1.2 }],            // 02c: rotorn startar
  [['moln-puff-1', 'puff-2'], 37.3, 0.3, { langd: 1.2 }],                                                // 02d: rakt igenom molnet
  [['ryt-gasp-1', 'gaspning-1'], 31.0, 0.45, { langd: 2.4, fade: 0.6 }],                                 // 02b: Lages mjuka ryt som blir en gäspning
  [['surr-1'], 53.6, 0.12, { langd: 4.2, fade: 1, fadeIn: 1.2 }],                                        // 04a: svagt, långt borta
  [['surr-2'], 57.9, 0.3, { langd: 4.0, fade: 0.8 }], [[ICLOUD + 'new/bee-happy-1.mp3'], 58.3, 0.35, {}],   // 04b: humlan surrar in, glad
  ...ORD.surr.map((t, i) => [[ICLOUD + `new/bee-bzz-${i + 1}.wav`, ICLOUD + 'new/bee-happy-3.mp3'], t + 0.1, 0.25, { langd: 0.8 }]),   // 04c: en per ögla
  [['glitter-1'], 58.7, 0.25, { langd: 1.2 }], [['glitter-2'], 66.8, 0.25, { langd: 1.2 }],              // humlan och bananen gnistrar
  [['ryt-gasp-1', 'gaspning-1'], 74.5, 0.45, { langd: 2.4, fade: 0.6 }], [['glitter-3'], 74.8, 0.3, { langd: 1.2 }],   // 05c: svansen!
  [['glitter-4'], 97.0, 0.25, { langd: 1.2 }],                                                           // 07b: hatten gnistrar
  [['mu-1'], ORD.hej[0], 0.5, {}],                                                                       // 07c: ett mjukt mu på första "hej"
  [['vind-hatt-1', 'sus-1'], 100.6, 0.35, { langd: 1.8, fade: 0.6 }], [['plopp-1'], 102.6, 0.5, {}],     // 08a: vinden tar hatten, den landar på bladet
  [['helikopter-stannar-1'], 103.4, 0.35, { langd: 2.4, fade: 0.8 }],                                    // 08a: Lage stänger av motorn
  ...GHOPP.flatMap(([t], i) => [[['kvak-' + (i % 4 + 1)], t - 0.1, 0.45, {}], [['plopp-1'], t + 0.6, 0.35, {}]]),   // 08b: kvak och plopp per hopp
  [['glitter-1'], 115.6, 0.25, { langd: 1.2 }], [['jubel-2'], 116.0, 0.35, { langd: 2.0, fade: 0.8 }],   // hatten är tillbaka, alla jublar
  [['helikopter-start-1', 'propeller-2'], 120.6, 0.25, { langd: 2.4, fade: 1.0 }],                       // 09b: motorn igen
  [['vov-1'], 139.0, 0.5, {}],
  // helikoptern surrar lågt under sången medan rotorn snurrar (en loop per scen, så att varje scens wav får sin bit)
  [['helikopter-surr-1'], 34.6, 0.12, { loop: true, langd: 57.3, fadeIn: 1.0, fade: 1.5 }],              // himlen: från rotorstarten
  [['helikopter-surr-1'], 92.0, 0.12, { loop: true, langd: 11.8, fadeIn: 0.5, fade: 2.0 }],              // dammen: tills motorn stannar
  [['helikopter-surr-1'], 121.5, 0.12, { loop: true, langd: 7.5, fadeIn: 1.0, fade: 1.0 }],              // dammen: motorn igen
  [['helikopter-surr-1'], 159.9, 0.12, { loop: true, langd: 10.0, fadeIn: 0.5, fade: 3.0 }],             // slutet                                                                           // 10e: "En gång till!"
];
// Tiderna ur storyboard.md: | id | m:ss.s | …
async function tider() {
  const md = await (await fetch(SB + 'storyboard.md')).text(), rad = [];
  for (const m of md.matchAll(/^\| (\d\d[a-z]?) \| (\d+):(\d\d\.\d) \|/gm)) rad.push([m[1], +m[2] * 60 + +m[3]]);
  const T = {}; rad.forEach(([id, t], i) => T[id] = [t, i + 1 < rad.length ? rad[i + 1][1] : SLUT]); return T;
}
const finns = async fil => fil.startsWith('../') || (await fetch('/' + fil, { method: 'HEAD' })).ok;
const effektFil = n => n.startsWith('../') ? n : `assets/ljud/effekter/${n.replace(/-\d+$/, '')}/${n}.m4a`;

window.ready = (async () => {
  await laddaFigurer(window.FIGURER || ['lage', 'kajsa', 'gurra', 'humle', 'hugo', 'humle2']);
  const T = ANIM.TIDER = await tider(), [forsta, sista] = window.SCEN, A0 = T[forsta][0], A1 = T[sista][1];
  window.DURATION = A1 - A0;
  if (A0 >= SANG0) window.SANG = [A0 - SANG0, A1 - SANG0];
  const ljud = [];
  for (const [fil, t] of window.ROSTER || []) if (t >= A0 && t < A1 && await finns(fil)) ljud.push({ fil, t: t - A0, vol: 2.5, langd: 4 });
  for (const [namn, t, vol, o = {}] of EFFEKTER_FILM) {
    if (t < A0 || t >= A1) continue;
    for (const n of namn) { const fil = effektFil(n); if (await finns(fil)) { ljud.push({ fil, t: t - A0, vol, ...o }); break; } }
  }
  window.LJUD = ljud;
  const ids = Object.keys(T).filter(id => T[id][0] >= A0 && T[id][0] < A1);
  window.seek = t => {
    TID = A0 + t;
    const id = ids.findLast(i => T[i][0] <= TID) || ids[0], [a, b] = T[id];
    for (const l of ['bakom', 'framfor', 'pynt', 'ram', 'platta']) $(l).innerHTML = '';
    gom(); kamera(1);
    BILD = id; BILD0 = a; MED = id.startsWith('06');
    ANIM[id]((TID - a) / (b - a), TID - a, b - a);
    for (const [c, farg] of SVEP) if (Math.abs(TID - c) < SV) kritsvep(0.5 + (TID - c) / (2 * SV), farg);
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);   // kritkanten kokar sex gånger i sekunden
    window.kant?.uppdatera();
  };
  await new Promise(r => setTimeout(r, 1500));   // urklippen hinner laddas
  window.seek(0);
  return true;
})();
