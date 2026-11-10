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
// Takten (rörelsegranskningen 2026-11-10: "the beat is almost invisible"): SLAGV = fasen, ett varv per slag, så att vinkningar,
// vickningar och svansar går i takt; slag(a, b) = slagen mellan a och b.
const SLAGV = t => 2 * Math.PI * (t - SANG0) / BEAT;
const slag = (a, b) => { const r = []; for (let n = Math.ceil((a - SANG0) / BEAT - 1e-6); SANG0 + n * BEAT < b; n++) r.push(SANG0 + n * BEAT); return r; };
// Hoppet som riggens hoppa (rigg-motor.js): huk före avstampet, sträckning efter farten i luften, fötterna upp, landningen trycker
// ihop. tider = avstampen, h = höjd (px), luft = sekunder i luften. Ger { dy (uppåt +), luft, po } att lägga till posen med ihop().
function hopp(t, tider, h, luft = 0.42) {
  let dy = 0, tr = 0, st = 0, fot = 0, arm = 0, iLuft = false;   // tr = hukens/landningens tryck (det största gäller, de staplas inte)
  const amp = h ? Math.min(1, 0.35 + h / 120) : 1;               // små studsar trycker ihop mindre
  for (const t0 of tider) { const k = t - t0;
    if (k > -0.13 && k < 0) { const q = Math.sin(Math.PI * (k + 0.13) / 0.13); tr = Math.max(tr, q); arm -= 12 * q; }
    else if (k >= 0 && k < luft) { const l = k / luft, kant = ease(l / 0.12) * ease((1 - l) / 0.12), fart = Math.abs(1 - 2 * l) * kant;
      dy += 4 * h * l * (1 - l); st = Math.max(st, fart); fot = -30 * kant; arm += 30 * Math.sin(Math.PI * l); iLuft = true; }
    else if (k >= luft && k < luft + 0.16) tr = Math.max(tr, Math.sin(Math.PI * (k - luft) / 0.16));
  }
  return { dy, luft: iLuft, po: { strack: amp * (0.1 * st - 0.12 * tr), bred: amp * (-0.075 * st + 0.1 * tr), benY: [fot, fot], armar: [amp * arm, amp * arm] } };
}
// lägg hoppets (eller klappens) tillägg på en pose
const ihop = (po, q) => { const p = typeof po === 'string' ? { bas: po } : { ...(po || {}) };
  p.strack = (p.strack || 0) + q.strack; p.bred = (p.bred || 0) + q.bred; if (q.benY[0]) p.benY = q.benY;
  p.armar = [(p.armar?.[0] || 0) + q.armar[0], (p.armar?.[1] || 0) + q.armar[1]]; return p; };
// studs i takt: ett litet hopp per slag som landar på slaget (fas: + = tidig, − = sen)
const taktHopp = (h, fas = 0, luft = 0.36) => hopp(TID + fas, slag(TID - 1, TID + 1).map(b => b - luft), h, luft);
// Ekoorden (ha-ha, surr, mums, hej, hopp): munnen öppnas på ordet, ingen läppsynk. Kitets visa() frågar munOppen().
const EKO = [...ORD_HAHA_(), ...[59.6, 60.3, 61.0], ...[67.8, 68.5, 69.2], ...[98.7, 99.4, 100.2], 137.45, 138.55, 145.85, 146.85];
window.munOppen = () => EKO.some(t => TID > t - 0.06 && TID < t + 0.32);

// Ordens tider (avsnittstid = sångtid + 22,2): radernas start ur rader.txt, orden inom raden ur en Whisper-körning med
// ordtider (ggml-small, ca ±0,3 s; "Ha-ha!" hörs inte i den, så det sätts 1,2 s före nästa rad). Justera här om något kommer fel.
function ORD_HAHA_() { return [26.2, 30.5, 51.8, 90.8, 127.9, 155.8].flatMap(t => [t, t + 0.3]); }
const ORD = {
  haha: [26.2, 30.5, 51.8, 90.8, 127.9, 155.8],               // "(Ha-ha!)" i varje "Gul är den gladaste färgen!"
  snurra: 33.8,                                               // "(snurra, snurra!)" i 02c: rotorn börjar snurra
  upp: [[47.9, 48.4, 48.9], [87.0, 87.5, 88.0], [124.9, 125.4, 125.9]],   // "Upp, upp, upp"
  surr: [59.6, 60.3, 61.0], mums: [67.8, 68.5, 69.2], vifta: [76.4, 77.9, 79.4], hej: [98.7, 99.4, 100.2],
};
// Rotorns varvtal [avsnittstid, varv/s] (kitets ROTOR): står still på marken, börjar på "snurra, snurra", Lage stänger av motorn i
// mellanspelet (08a), startar igen på "Snurra, snurra" i refräng 3 (09b).
// Refrängernas "Snurra, snurra" (03b 43,5, 06b 82,7, 09b 120,6): rotorn varvar upp till 2,4 varv/s och tillbaka efter raden.
ROTOR = [[0, 0], [ORD.snurra - 0.2, 0], [ORD.snurra + 0.9, 1.4], [43.5, 1.4], [44.3, 2.4], [45.8, 2.4], [46.6, 1.4], [82.7, 1.4], [83.5, 2.4],
  [84.9, 2.4], [85.7, 1.4], [103.6, 1.4], [105.6, 0], [120.7, 0], [121.5, 1.6], [122.2, 2.4], [122.8, 2.4], [123.6, 1.4]];

// --- Uppställningar --------------------------------------------------------------------------------------------------------
const HEL = { x: 740, botten: 963, s: 0.537 };                  // himlen, helbild: helikoptern på vänstra tredjedelen
const MARK = { x: 619, botten: 972, s: 0.433 };                 // dammen, 02a–02c: på marken till vänster om dammen
const LAND = { x: 429, botten: 972, s: 0.371 };                 // dammen, 07–09: landad i gräset
const SOLH = { x: 725, botten: 907, s: 0.454 };                 // jättesolen
const KAJSA = [1680, 962, 0.46], GURRA_S = 0.28;
const vinkArm = (t, bas = 66) => bas + 18 * Math.sin(SLAGV(TID));   // en vinkning per slag (t används inte längre)
// Helikoptern med det som åker med i refräng 2 (06a–06e): bananen i karet och humlan som surrar bredvid bubblan
function hel(o) {
  const P = heli({ ...o, i_karet: (o.i_karet || '') + (MED ? bananSvg(1390, 230, 300, -22) : '') });
  if (MED) { const s = o.s ?? HEL.s, [hx, hy] = P([1760 + 70 * Math.cos(SLAGV(TID) / 2), -40 + 24 * Math.sin(SLAGV(TID)) + 45 * Math.sin(SLAGV(TID) / 2)]);   // Humle: rastlös, små öglor
    visa('humle', { lager: 'fordon', x: hx, fot: hy, s: 0.52 * s, u: BILD.endsWith('e') ? 'jatteglad' : 'glad', po: { luta: 6 * Math.sin(SLAGV(TID) / 2) }, skugga: false }); }
  return P;
}
// I luften: himlen med glidande moln, helikoptern gungar lugnt
function flyg({ u = 'glad', po = 'neutral', rot = 0, dx = 0, dy = 0, svans = null, i_karet = '', fram = '', sjunk = 0, ...o } = {}) {
  himmel(TID * 70, sjunk);
  const v = TID > SANG0 ? 1 - fas(TID, 165.4, 167.0) : 0, gung = Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT));
  return hel({ ...HEL, ...o, x: (o.x ?? HEL.x) + dx, botten: (o.botten ?? HEL.botten) + dy + (1 - v) * 9 * Math.sin(TID * 2.1) - v * 18 * takt(), rot: rot + v * 3 * gung, lage: [u, po], svans, i_karet, fram });
}
const narbild = (P, z = 2.46, dy = 0) => { const [fx, fy] = P(LAGE_ANSIKTE); kamera(z, fx, fy + dy); };
// Fjärilen Fia som bakgrundsfigur: riggens delar (vingarna slår tre gånger i sekunden kring sina vridpunkter, kroppen guppar),
// ansiktet från hennes uttryck.html (glada ^-ögon, kinder, leende). x, y = kroppens mitt i scenen, s = skala i 1024-rutan.
const FIA_DIR = A + 'karaktarer/fjarilen-fia/premium/cut/fia-';
const fiaSvg = (x, y, s, t) => {
  const c = Math.cos(2 * Math.PI * 3 * t), ihop = 0.62 * (1 - c) / 2, gr = 14 * (1 - c) / 2, gupp = -10 * Math.sin(2 * Math.PI * 3 * t - 0.6);
  const vinge = (n, [px, py], sg) => `<image href="${FIA_DIR}wing-${n}.png" width="1024" height="1024" transform="rotate(${(sg * gr).toFixed(2)} ${px} ${py}) translate(${px} ${py}) scale(${(1 - ihop).toFixed(3)} ${(1 - 0.06 * ihop).toFixed(3)}) translate(${-px} ${-py})"/>`;
  const oga = ([ox, oy]) => `<path d="M${ox - 17} ${oy + 5} Q${ox} ${oy - 15} ${ox + 17} ${oy + 5}" fill="none" stroke="#2a1d1a" stroke-width="7" stroke-linecap="round"/>`;
  return `<g transform="translate(${x.toFixed(1)} ${(y + gupp).toFixed(1)}) rotate(${(3 * Math.sin(t * 2.1)).toFixed(2)}) scale(${s}) translate(-512 -560)">
    ${vinge('l', [440, 558], 1)}${vinge('r', [584, 551], -1)}<image href="${FIA_DIR}body.png" width="1024" height="1024"/>
    <ellipse cx="436" cy="453" rx="24" ry="15" fill="#ec8f96"/><ellipse cx="587" cy="452" rx="24" ry="15" fill="#ec8f96"/>
    ${oga([457, 411])}${oga([566, 410])}<path d="M494 442 Q514 460 534 442" fill="none" stroke="#2a1d1a" stroke-width="5" stroke-linecap="round"/></g>`;
};
// Refrängbilden: helikoptern gungar i takt (lutar åt varannan sida på två slag), studsar lite, Lage gungar med
// --- Refrängerna (Sanna: "more powerful animations, more close crop on faces", som 005 och 013) ---------------------------
// Kameran slår in på slagen: kamSpar([[t, zoom, cx, cy], ...]) går till nästa läge på 0,18 s (en punch-in, inte en lång åkning),
// och slagPuls() ger en liten zoomstöt på varje slag.
const slagPuls = () => { const q = (((TID - SANG0) % BEAT) + BEAT) % BEAT; return Math.exp(-q * 9); };
function kamSpar(spar, puls = 0.03) {
  let [, z, x, y] = spar[0];
  for (let i = 1; i < spar.length; i++) { const [t, z2, x2, y2] = spar[i], k = ease((TID - t) / 0.18); if (k <= 0) break; z = lerp(z, z2, k); x = lerp(x, x2, k); y = lerp(y, y2, k); }
  kamera(z * (1 + puls * slagPuls()), x, y);
}
// Refrängmönstret (Sanna 2026-11-10: "Ja, kör mönstret för refrängerna och personligheten i rörelserna"): varje rad har EN fast
// bild och EN rörelse, likadan i alla tre refrängerna (03, 06, 09). Bara vilka som är med växer: Lage ensam, sedan humlan och
// bananen, sist hela gänget (refräng 3 börjar vid dammen med Kajsa och Gurra och slutar som de andra vid jättesolen).
//   Gul-la-la!        närbild på Lages ansikte, tre stora studsar på slagen        händerna upp och vicka
//   (Gul-la-la!)      helbild, alla som är med ekar                                  samma rörelse, alla
//   Snurra, snurra    rotorn och Lage, rotorn varvar upp, lutar uppåt på "flyger"   armarna i cirkel
//   Upp, upp, upp     tre lyft med en gnista per "upp", alltid fram till jättesolen  tre hopp
//   Gul är den …      solen skrattar, floden, alla hoppar på "Ha-ha!"              klappa och skratta
const vidDamm = () => BILD.startsWith('09') && 'abc'.includes(BILD[2]);   // refräng 3: raderna a–c vid dammen
const handerUpp = () => { const w = 16 * Math.sin(SLAGV(TID)); return { armar: [46 + w, 46 - w] }; };   // händerna upp och vicka (läggs till uttryckets armar: jätteglad +40)
const armCirkel = () => { const w = 2 * Math.PI * (TID - SANG0) / (2 * BEAT); return { armar: [30 + 32 * Math.sin(w), 30 + 32 * Math.sin(w + Math.PI)] }; };
// Lages signatur: stolt, stryker sig över manen (en arm upp längs huvudet två gånger)
const manen = t0 => { const k = (TID - t0) / 1.3; if (k < 0 || k > 1) return null;
  return { armar: [10, 100 * Math.sin(Math.PI * k) + 14 * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k)], luta: -3 }; };
const svansGlad = () => ({ v: 16 + 16 * Math.sin(SLAGV(TID)) });   // tofsen viftar över karets kant när han är glad
// Helikoptern i refrängen: i luften, eller på marken vid dammen (refräng 3, a–c). dy = studs uppåt (−)
function rHeli({ u, po, dy = 0, rot = 0, svans = null }) {
  if (!vidDamm()) return flyg({ u, po, rot, dy, svans });
  dammen();
  const P = hel({ ...LAND, botten: LAND.botten + Math.min(0, dy), rot, lage: [u, po], svans });
  if (varv(TID) > 0.3) vind(LAND.x - 30, 1000, (TID * 1.6) % 1, 2);
  return P;
}
// Kajsa och Gurra vid dammen i refräng 3: lugna (Kajsa gungar sakta och håller hatten, Gurra fjädrar), ekar med händerna upp
function dammVanner({ eko = false, h = 0, hatt = false } = {}) {
  if (!vidDamm()) return;
  const kh = taktHopp(eko ? 70 : 44, -0.09, 0.4), gh = taktHopp(eko ? 110 : 80, 0.05, 0.38);   // Kajsa tung och sen, Gurra tidig och fjädrande
  kajsa({ u: eko ? 'jatteglad' : 'glad', fot: KAJSA[1] - kh.dy, po: ihop(eko ? handerUpp() : hatt ? { armar: [0, 125] } : { luta: 4 * Math.sin(SLAGV(TID) / 4) }, kh.po) });
  gurra(GURRA_VID[0], GURRA_VID[1] - gh.dy, { u: eko || gh.luft ? 'jatteglad' : 'glad', po: ihop(eko ? handerUpp() : {}, gh.po), skugga: gh.dy < 20 });
}
const tre = t0 => skutt(TID, [t0, t0 + 0.5 * BEAT, t0 + BEAT], 52, 0.26);   // tre studsar på "Gul-la-la"
const STOR = () => BILD.startsWith('09') ? 1.45 : 1;   // refräng 3 är störst
// Ljusstrålarna i refrängen (Sanna 2026-11-10: "maybe light rays"): en mjuk solfjäder av tio kilar som vrider sig långsamt (5°/s)
// och andas på slaget, starkast på slaget och avtagande efter (inget av och på). r0 = inre radie (vid solen utanför skivan).
function stralar(cx, cy, r0, r1, farg = '#fff', op = 0.2) {
  const q = (((TID - SANG0) % BEAT) + BEAT) % BEAT, o = op * (0.7 + 0.3 * Math.exp(-q * 5)), v0 = 5 * TID, b = 9;
  const d = Array.from({ length: 10 }, (_, i) => { const a = (v0 + i * 36 - b) * Math.PI / 180, c = (v0 + i * 36 + b) * Math.PI / 180;
    const p = (r, v) => `${(cx + r * Math.cos(v)).toFixed(1)} ${(cy + r * Math.sin(v)).toFixed(1)}`;
    return `M${p(r0, a)}L${p(r1, a)}L${p(r1, c)}L${p(r0, c)}Z`; }).join('');
  lagg('bakom', `<path d="${d}" fill="${farg}" opacity="${o.toFixed(3)}" filter="url(#mjuk)"/>`);
}
// "Gul-la-la! (Gul-la-la!)"
const gulRad = (fjaril = false) => (u, s) => {
  const rop = BILD0, eko = rop + 2 * BEAT, efter = rop + 4 * BEAT, iRop = TID < eko, iEko = TID >= eko && TID < efter;
  const h = STOR() * (iRop ? tre(rop) : iEko ? tre(eko) : 36 * takt()), gung = Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)), m = manen(efter + 0.15);
  const P = rHeli({ u: m ? 'stolt' : h > 30 && TID < efter ? 'jatteglad' : 'glad', po: TID < efter ? { ...handerUpp(), luta: 4 * gung } : m || { armar: [24, 24], luta: 4 * gung },
    dy: -h, rot: (vidDamm() ? 5 : 9) * gung, svans: iEko || vidDamm() ? svansGlad() : null });
  if (fjaril) lagg('bakom', fiaSvg(lerp(2050, 1180, ease(s / 3.7)), 300 + 30 * Math.sin(s * 2.4), 0.27, s));   // Fia fladdrar förbi (QA: större, vingslag, ansikte)
  dammVanner({ eko: iEko, h: iEko ? h : 0 });
  const [fx, fy] = P(LAGE_ANSIKTE), [bx, by] = P([1070, 120]);
  stralar(fx, fy, 120, 2600);
  if (iEko) glitter(bx, by, 300, TID - eko, 8);
  kamSpar([[rop, 2.35, fx, fy - 20], [eko, 1.0, 960, 540], [efter, vidDamm() ? 1.0 : 1.2, vidDamm() ? 960 : fx, vidDamm() ? 540 : fy + 120]], 0.05);
};
// "Snurra, snurra – vi flyger!": rotorn och Lage i bild, rotorn varvar upp (ROTOR), armarna går runt; på "flyger" lutar helikoptern uppåt
const snurraRad = (u, s) => {
  const fl = BILD0 + 2 * BEAT, k = ease((TID - fl) / 0.6), bage = Math.sin(Math.PI * kl01((TID - fl) / 1.1));
  const P = rHeli({ u: 'glad', po: armCirkel(), rot: -8 * bage + 6 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)) * (1 - k), dy: (vidDamm() ? -40 * bage : -60 * k) - 30 * STOR() * takt(), svans: k > 0 || vidDamm() ? svansGlad() : null });
  dammVanner({ hatt: true });
  const [fx, fy] = P(LAGE_ANSIKTE), [, ry] = P([1070, -330]);
  stralar(fx, fy, 120, 2600);
  kamSpar([[BILD0, 1.8, fx, (fy + ry) / 2], [fl, 1.2, fx, fy + 140]], 0.05);
};
// "Upp, upp, upp till solen!": gult kritsvep, helikoptern kommer in nerifrån i tre lyft och stannar framför solen; en gnista och
// ett hopp per "upp" (Lage hoppar i karet), kameran stöter
const uppRad = upp => (u, s) => {
  jattesol({ t: TID, ansikte: 'glad' });
  stralar(...SOL, 520, 760 + 420 * lyft(TID, upp), '#fff', 0.24);
  const k = lyft(TID, upp) / 3, stot = STOR() * upp.reduce((a, t0) => a + (TID >= t0 ? Math.exp(-(TID - t0) * 7) : 0), 0);
  const P = hel({ ...SOLH, botten: SOLH.botten + 640 * (1 - k) - 20 * takt(), rot: 4 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)), lage: [stot > 0.4 ? 'jatteglad' : 'glad', { armar: [5 + 40 * stot, 5 + 40 * stot], lyft: -110 * stot }] });
  for (const t0 of upp) if (TID >= t0 && TID < t0 + 0.9) { const [gx, gy] = P([1070, 0]); glitter(gx, gy, 260, TID - t0, 6); }
  kamera(1 + 0.07 * stot, 960, 560);
};
// "Gul är den gladaste färgen! (Ha-ha!)": solen skrattar och floden växer; Lage klappar (och skrattar), på "Ha-ha!" hoppar alla och
// kameran slår in på Lage och solen
const hahaRad = haha => (u, s) => {
  const h = STOR() * skutt(TID, [haha, haha + 0.42], 70), blink = TID > haha - 0.1 && TID < haha + 1.1;
  jattesol({ t: TID, flod: fas(s, 0, 0.6), bop: h + 30 * takt(), ansikte: blink ? 'blinkar' : 'fnissig' });   // floden fyller bilden på 0,6 s
  stralar(...SOL, 520, 2600, '#FFE25A', 0.5 * fas(s, 0.1, 0.7));                                               // djupgula strålar: hela bilden läses gul
  const [b0, b1] = klappSlag(BILD0 + 0.35, haha - 0.5), kl = klappTakt('lage', TID, b0, b1), hoppar = h > 2;
  const P = hel({ ...SOLH, botten: SOLH.botten - 1.6 * h - 34 * STOR() * takt(), rot: 5 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)),
    lage: hoppar ? ['jatteglad', { armar: [45, 45], lyft: -2 * h }] : [{ ...kl.u, ...FIG.lage.L.blanda('neutral', 'glad', 1), armar: kl.u.armar }, kl.po], svans: hoppar ? svansGlad() : null });
  const [fx, fy] = P(LAGE_ANSIKTE);
  if (!hoppar) klappGnista(...P([LAGE_FOT[0], LAGE_FOT[1] - (FIG.lage.L.FOTTER - FIG.lage.L.RIGG['arm-l'][1] - 15) * LAGE_K]), kl, 0.5);
  kamSpar([[BILD0, 1.0, 960, 540], [haha - 0.25, 1.55, (fx + 1411) / 2, (fy + 440) / 2 + 40], [haha + 1.3, 1.08, 960, 540]], 0.04);
};
// Lage spanar: tassen över ögonen, blicken åt ena hållet och sedan åt det andra
const spanar = (s, arm = 1) => ({ u: { bas: 'nyfiken', titt: [13 * Math.sin(s * 1.5), -4] }, po: { armar: arm ? [0, 100] : [100, 0], luta: 3 * Math.sin(s * 1.5) } });
// Humlans väg: långt bort (04a) → framför helikoptern (04b) → tre öglor runt bubblan (04c)
const HUMLE_MAL = [1300, 560];

// --- Dammen ---------------------------------------------------------------------------------------------------------------
// Personligheterna (Sanna 2026-11-10): Kajsa lugn och mild, gungar sakta när hon står still; Gurra fjädrande och snabb, små
// skutt mellan rörelserna. Gäller när scenen inte ger en egen pose.
const kajsa = (o = {}) => visa('kajsa', { x: KAJSA[0], fot: KAJSA[1], s: KAJSA[2], ...o, po: o.po ?? { luta: 3 * Math.sin(SLAGV(TID) / 4) } });
const gurra = (x, fot, o = {}) => { const fj = o.po == null ? 14 * takt() : 0;
  return visa('gurra', { x, fot: fot - fj, s: GURRA_S, ...o, po: o.po ?? { luta: 2 * Math.sin(SLAGV(TID)) } }); };
const HATT_KAJSA = () => iFigur('kajsa', ...KAJSA, [512, 215]);   // hattens underkant mitt (i hennes 1024-ruta: y 215, h 150)
// Gurras hopp i 08b: [tid, från, till]. Blad till blad i takt, tar hatten på det tredje, hoppar sedan fram till Kajsa.
const G0 = [790, 1000], GHOPP = [[109.9, G0, [921, 907]], [111.0, [921, 907], [1186, 963]], [112.1, [1186, 963], [1465, 910]],
  [113.5, [1465, 910], [1450, 1030]]];
const gurraPlats = t => { let p = G0, h = 0;
  for (const [t0, a, b] of GHOPP) { const k = (t - t0) / 0.62; if (k >= 1) p = b; else if (k > 0) { p = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]; h = 480 * k * (1 - k); } }
  return [p[0], p[1] - h, h]; };
const GURRA_VID = [1450, 1030];
// Lage kliver ur helikoptern vid dammen (Sanna: "have lion exit helikopter by pond"): bubblan öppnas när motorn har stannat, han
// hoppar ut i en båge och står framför helikoptern vid dammen, och hoppar tillbaka in innan den lyfter (09b). Första delen av
// hoppet ritas i karet (karets framsida döljer benen), från toppen av bågen som egen figur framför helikoptern.
const LAGE_UTE = { x: 600, fot: 1000, s: 0.33 }, LAGE_UT = 105.9, LAGE_IN = 116.9, LHOPP = 0.8;
function lageDamm(u, po) {
  const t = TID, ute = t >= LAGE_UT + LHOPP && t < LAGE_IN;
  const k = t >= LAGE_UT && t < LAGE_UT + LHOPP ? (t - LAGE_UT) / LHOPP : t >= LAGE_IN && t < LAGE_IN + LHOPP ? 1 - (t - LAGE_IN) / LHOPP : null;
  const bubbla = Math.max(1 - fas(t, LAGE_UT - 0.4, LAGE_UT), fas(t, LAGE_IN + LHOPP, LAGE_IN + LHOPP + 0.4));
  const hq = hopp(t, [LAGE_UT, LAGE_IN], 0, LHOPP).po;
  const rita = () => {
    if (ute) return visa('lage', { lager: 'lage-ute', ...LAGE_UTE, u, po: ihop(po, hq), svans: true });
    if (k !== null) lageHoppa(k, LAND, LAGE_UTE, hq);
  };
  return { lage: k === null && !ute ? [u, ihop(po, hq)] : null, bubbla, rita };
}

// Lage hoppar mellan karet (k 0) och en plats utanför (k 1, ute = { x, fot, s }); H = helikopterns { x, botten, s } (rot 0).
// Första delen av bågen ritas i karet (karets framsida döljer benen), resten som egen figur i 'lage-ute' (med vit kant).
function lageHoppa(k, H, ute, hq, topp = 3600) {
  const s = H.s, ex = HELI_ANKARE[0] + (ute.x - H.x) / s, ey = HELI_ANKARE[1] + (ute.fot - H.botten) / s;
  const hx = lerp(LAGE_FOT[0], ex, k), hy = lerp(LAGE_FOT[1], ey, k) - topp * k * (1 - k), hs = lerp(LAGE_K, ute.s / s, k);
  const q = { u: 'jatteglad', po: ihop({ armar: [45, 45] }, hq) };
  if (hy > 150 && k < 0.5) return visa('lage', { lager: 'heli-lage', x: hx, fot: hy, s: hs, ...q, skugga: false });
  visa('lage', { lager: 'lage-ute', x: H.x + (hx - HELI_ANKARE[0]) * s, fot: H.botten + (hy - HELI_ANKARE[1]) * s, s: hs * s, ...q, skugga: false, svans: true });
}

// --- Discot ---------------------------------------------------------------------------------------------------------------
// Tre dansare (Sanna 2026-11-10: "3 animals dancing remove humla", sedan "Lage istället för Hugo"): Kajsa, Gurra och Lage, jämnt
// fördelade, grodan lite mindre. Lage står med hela kroppen på golvet (premium-v3 med benen) i 'lage-ute' (som har vit kant).
const DANS = { kajsa: [470, 0.70], gurra: [960, 0.56], lage: [1450, 0.62] }, DANS_GOLV = 1026;
const ISAR = { kajsa: 250, gurra: 600, lage: 1660 };   // 11e: Kajsa och Gurra till vänster, Lage till höger: luckan där helikoptern landar
// Signaturerna (granskningen): [fas s (+ tidig, − sen), studshöjd]. Kajsa tung och lite sen, Gurra fjädrande och tidig, Lage stolt
// (stryker manen var åttonde slag, svansen viftar i takt). Öron och svansar släpar efter, armarna är som förut (i en bit).
const SIGN = { kajsa: [-0.1, 22], gurra: [0.06, 48], lage: [0, 32] };
const dansPlats = n => [DANS[n][0], DANS_GOLV, DANS[n][1]];
const manenDans = () => { const b = (((TID - SANG0) / BEAT) % 8 + 8) % 8; if (b < 4.5 || b > 7) return null; const k = (b - 4.5) / 2.5;
  return { armar: [10, 80 * Math.sin(Math.PI * k) + 12 * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k)], luta: -3 }; };
// dansare({ namn: { u, po, dy } | null }, { gap, krymp, studs }): de tre på golvet, glada och studsande i takt (riktiga små hopp som
// landar på slaget) om inget annat sägs; null = inte med. dy (uppåt −) ersätter studsen.
function dansare(o = {}, { gap = 0, krymp = 0, studs: st = 1 } = {}) {
  for (const [n, [x0, k]] of Object.entries(DANS)) {
    if (o[n] === null) continue;
    const d = o[n] || {}, x = lerp(x0, ISAR[n], gap), s = k * (1 - 0.3 * krymp), [fs, sh] = SIGN[n];
    let u = d.u || 'glad', po = d.po;
    if (!po) {
      po = { luta: (n === 'kajsa' ? 7 : 6) * Math.sin(Math.PI * (TID + fs - SANG0) / ((n === 'kajsa' ? 4 : 2) * BEAT)) };   // Kajsa gungar i halva takten
      if (n === 'lage') { const m = manenDans(); if (m) { po = m; u = 'stolt'; } }
    }
    po = typeof po === 'string' ? { bas: po } : { ...po };
    const eft = Math.sin(SLAGV(TID - 0.14));
    po.oron ??= [7 * eft, -7 * eft];
    if (n === 'lage') po.svans ??= 22 * Math.sin(SLAGV(TID) - 0.6);
    const th = d.dy == null ? taktHopp(sh * st, fs) : null;
    if (th) po = ihop(po, th.po);
    visa(n, { lager: n === 'lage' ? 'lage-ute' : 'figurer', x, fot: DANS_GOLV - 60 * krymp + (th ? -th.dy : d.dy), s, u, po, mun: d.mun, svans: n === 'lage' });
  }
}
const dansGnista = (n, kl) => { const [x, f, k] = dansPlats(n); klappGnista(...iFigur(n, x, f, k, [512, FIG[n].L.RIGG['arm-l'][1] + 15]), kl); };
// Klappen i takt (granskningen: en klapp per slag, större gnista, kroppen trycks ihop vid träffen). Riggens klappa (3 s) har
// träffar vid T 1,0, 1,5 och 2,0; T går 0,5 per slag, mitten loopas mellan b0 och b1 (b1 − b0 = jämnt antal slag, så att T 1,0 och
// 2,0 möts i samma läge).
const klappSlag = (a, b) => { const b0 = slag(a, a + 2)[0]; return [b0, b0 + 2 * BEAT * Math.max(1, Math.floor((b - b0) / (2 * BEAT)))]; };
const klappT = (t, b0, b1) => { const x = (t - b0) / BEAT * 0.5;
  return t < b0 ? Math.max(0, 1 + x) : t < b1 ? 1 + ((x % 1) + 1) % 1 : Math.min(2.999, 2 + (t - b1) / BEAT * 0.5); };
function klappTakt(n, t, b0, b1) {
  const T = klappT(t, b0, b1), [f, p] = FIG[n].L.ROR.klappa(T), g = T >= 1 && T <= 2.25 ? ((T - 1) % 0.5) / 0.5 : 1;
  const smack = Math.exp(-g * 10) * (T >= 1 && T <= 2.1 ? 1 : 0);
  return { u: { ...f, armar: FIG[n].L.NEUTRAL.armar }, po: { ...p, strack: p.strack - 0.07 * smack, bred: p.bred + 0.07 * smack, lyft: (p.lyft || 0) + 10 * smack }, T };
}
// stor klappgnista: kritstreck ut åt sidorna och uppåt (inte in i ansiktet) och en stjärna där händerna möts
function klappGnista(x, y, kl, sk = 1) {
  const T = kl.T; if (T < 1 || T > 2.25) return; const g = ((T - 1) % 0.5) / 0.22; if (g >= 1) return;
  const r0 = (36 + 60 * g) * sk, r1 = r0 + 56 * Math.sin(Math.PI * Math.min(1, 1.5 * g)) * sk, op = (1 - g * g).toFixed(2);
  const streck = [-172, -146, -120, -60, -34, -8].map(a => { const v = a * Math.PI / 180;
    return `M${(x + r0 * Math.cos(v)).toFixed(1)} ${(y + r0 * Math.sin(v)).toFixed(1)}L${(x + r1 * Math.cos(v)).toFixed(1)} ${(y + r1 * Math.sin(v)).toFixed(1)}`; }).join('');
  pynt(`<g opacity="${op}" stroke-linecap="round" fill="none"><path d="${streck}" stroke="#fff" stroke-width="${(22 * sk).toFixed(1)}"/><path d="${streck}" stroke="#F2C94C" stroke-width="${(12 * sk).toFixed(1)}"/></g>`);
  gnista(x, y - 10 * sk, 30 * sk * Math.sin(Math.PI * Math.min(1, 1.4 * g)), 30 * g);
}
const klapp = (n, tl) => { const [f, p] = FIG[n].L.ROR.klappa(kl01(tl / 3) * 3); return { u: { ...f, armar: FIG[n].L.NEUTRAL.armar }, po: p }; };   // riggens riktiga klapp (3 s), händerna möts framför bröstet
const SLOT = { heli: [1459, 349], banan: [739, 209], humle: [1180, 209], hatt: [430, 175] }, MITT = [960, 419];
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
    const h = skutt(TID, [ORD.haha[0], ORD.haha[0] + 0.42], 90) + 26 * takt(), gung = Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT));   // studsar på medarna i takt, stort skutt på "Ha-ha!"
    heli({ ...MARK, botten: MARK.botten - h, rot: 3 * gung, lage: [h > 40 ? 'jatteglad' : 'glad', { armar: [0, vinkArm(s, 86)], luta: 5 * gung }] });
    pynt(`<ellipse cx="${MARK.x + 20}" cy="${MARK.botten + 6}" rx="${250 - 2 * h}" ry="22" fill="#2d5a3a" opacity="0.14"/>`);
    const z = fas(s, 0, 2.0);
    kamera(lerp(1.5, 1, z), lerp(700, 960, z), lerp(720, 540, z));
  },
  '02b': (u, s) => {   // närbild: Lage skrattar i bubblan, Ha-ha-skämtet (helikoptern skuttar två gånger på medarna)
    dammen();
    const h = skutt(TID, [ORD.haha[1], ORD.haha[1] + 0.42], 90) + 26 * takt();
    const P = heli({ ...MARK, botten: MARK.botten - h, rot: 3 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)), lage: ['fnissig', { luta: 4 * Math.sin(SLAGV(TID)) }] });
    narbild(P, 2.15, 60);
  },
  '02c': (u, s) => {   // rotorn börjar snurra på "snurra, snurra", vindvirvlar mot marken, helikoptern lyfter
    dammen();
    const upp = 330 * ease((TID - (ORD.snurra + 1.0)) / 1.6) + 26 * takt() * (1 - fas(TID, ORD.snurra + 0.5, ORD.snurra + 1.1)), sp = kl01(varv(TID) / 1.4);
    heli({ ...MARK, botten: MARK.botten - upp, rot: -2 * ease((TID - ORD.snurra - 1) / 1.6), lage: ['glad', { armar: [10, 10] }] });
    if (sp > 0.1) { vind(MARK.x - 40, 1000, (TID * 1.6) % 1, 2); }
    pynt(`<ellipse cx="${MARK.x + 20}" cy="${MARK.botten + 6}" rx="${250 * (1 - 0.5 * upp / 330)}" ry="22" fill="#2d5a3a" opacity="${(0.14 * (1 - 0.6 * upp / 330)).toFixed(3)}"/>`);
    kamera(lerp(1, 1.12, ease(s / 4)), 700, lerp(620, 560, ease(s / 4)));
  },
  '02d': (u, s, d) => {   // rakt klipp upp i himlen: två lugna lyft, molnen sjunker undan, rakt igenom ett moln, planet långt bort
    const k = 0.5 * ease(s / 1.3) + 0.5 * ease((s - 1.7) / 1.3), sjunk = 420 * ease(s / d);
    lagg('bakom', planSvg(lerp(2060, 1320, s / d), 300 + 14 * Math.sin(s * 2.2), 150, -4 + 2 * Math.sin(s * 1.7), TID));   // planet v2, större, snurrande propeller
    const P = flyg({ u: 'jatteglad', po: { bas: 'upp', armar: [44, 44] }, dy: 420 * (1 - k), sjunk });
    const my = lerp(-150, 1500, (s - 0.7) / 1.3);   // molnet de flyger igenom glider ner förbi bubblan
    if (s > 0.6 && s < 2.1) sak('framfor', MOLN.stort, 880, my, 470);
    if (s > 1.45) { const [x, y] = P([840, -150]);   // en liten molntuss stannar på bubblan
      sak('framfor', MOLN.litet, x, y + 4 * Math.sin(s * 3), 70 * ease((s - 1.45) / 0.3), `rotate(-12 ${x} ${y})`); }
    kamera(1);
  },
  '03a': gulRad(true), '03b': snurraRad, '03c': gulRad(), '03d': uppRad(ORD.upp[0]), '03e': hahaRad(ORD.haha[2]),
  '04a': (u, s, d) => {   // Lage spanar; långt borta till höger surrar en liten gul prick närmare (barnet ser humlan först)
    const P = flyg(spanar(s));
    visa('humle', { lager: 'bakom', x: lerp(1860, 1700, s / d), fot: 430 + 14 * Math.sin(s * 5), s: lerp(0.04, 0.07, s / d), u: 'glad', skugga: false });
    kamera(1);
  },
  '04b': (u, s) => {   // Humle surrar in och stannar framför helikoptern, gnistrar
    const k = ease(s / 0.9), x = lerp(1700, HUMLE_MAL[0], k), y = lerp(430, HUMLE_MAL[1], k) + 12 * Math.sin(s * 6);
    flyg({ u: 'jatteglad', po: { armar: [0, 48], luta: 3 } });
    visa('humle', { lager: 'framfor', x, fot: y, s: lerp(0.07, 0.3, k), u: 'glad', po: { luta: 6 * Math.sin(SLAGV(TID)) }, skugga: false });
    glitter(x, y - 160, 130, s - 0.8, 5);
    const z = fas(s, 0.85, 1.1); kamera(lerp(1, 2.1, z), lerp(960, HUMLE_MAL[0], z), lerp(540, HUMLE_MAL[1] - 130, z));   // närbild på humlan när hon stannat
  },
  '04c': (u, s) => {   // tre små öglor runt bubblan, en per "surr"
    const P = flyg({ u: 'fnissig', po: { luta: 2 } }), [cx, cy] = P([1250, -30]);
    let x = HUMLE_MAL[0], y = HUMLE_MAL[1];
    for (const t0 of ORD.surr) { const k = (TID - t0) / 0.75; if (k > 0 && k < 1) { const a = 2 * Math.PI * ease(k);
      x = HUMLE_MAL[0] + 120 * Math.sin(a) - 0; y = HUMLE_MAL[1] - 110 * (1 - Math.cos(a)); } }
    visa('humle', { lager: 'framfor', x, fot: y + 10 * Math.sin(s * 6), s: 0.3, u: 'jatteglad', po: { luta: 6 * Math.sin(SLAGV(TID)) }, skugga: false });
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
    const [hx, hy] = HATT_KAJSA(); glitter(hx, hy - 25, 70, s - 0.15, 6);
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
    const L8 = lageDamm(TID < 103.2 ? 'forvanad' : U('lage', 'forvanad', 'ledsen', fas(TID, 105, 106)), { armar: [12, TID > 103.2 && TID < 104.2 ? 40 : 12] });
    heli({ ...LAND, lage: L8.lage, bubbla: L8.bubbla }); L8.rita();
    if (TID < 101.8) vind(LAND.x + 340, 900, (TID * 1.6) % 1, 2);
    const k = (TID - 100.8) / 2.4, [h0x, h0y] = HATT_KAJSA(), [bx, by] = BLADEN[1];   // QA: ut till mittbladet, långt från stranden
    kajsa({ u: TID < 100.75 ? 'glad' : U('kajsa', 'forvanad', 'ledsen', fas(TID, 103.2, 104.0)), hatt: k <= 0,   // hon tar tag i hatten när det blåser
      po: { armar: [6, TID > 100.4 && TID < 101.5 ? 125 : 6], rikt: -0.5 * fas(TID, 101.3, 101.8) * (1 - fas(TID, 104.5, 105.2)), upp: 0.3 * fas(TID, 101.3, 101.8) * (1 - fas(TID, 103.0, 103.6)) } });
    let hx = h0x, hy = h0y;
    if (k > 0) { const kk = Math.min(1, k); hx = lerp(h0x, bx, ease(kk)); hy = lerp(h0y, by + 10, kk) - 330 * Math.sin(Math.PI * kk) + (kk >= 1 ? 4 * Math.sin(TID * 2.5) : 0);
      pynt(hattSvg(hx, hy, 69 * lerp(1, 0.7, kk), 18 * Math.sin(2 * Math.PI * kk) * (1 - kk))); }
    const [kx, ky] = iFigur('kajsa', ...KAJSA, [512, 430]);
    if (TID > 106.9) { const [ex, ey] = iFigur('kajsa', ...KAJSA, [600, 430]); tar(ex, ey + 50 * kl01((TID - 106.9) / 2.0), 12); }
    // granskningen: klipp till Kajsas flämtning, följ hatten med kameran, helbild när Lage stänger av och hoppar ur, sedan nära på tåren
    if (TID < 100.75) kamera(1.05, 1100, 640);
    else if (TID < 101.3) kamera(2.2, kx, ky + 10);
    else if (TID < 103.7) kamera(1.7, hx, hy + 40);
    else if (TID < 106.8) kamera(1.05, 1100, 640);
    else kamera(2.3, kx, ky + 30);
  },
  '08b': (u, s) => {   // mellanspel 2: Gurra hoppar blad till blad, tar hatten och hoppar tillbaka, räcker den till Kajsa
    dammen();
    const L8 = lageDamm(TID < 111.6 ? 'nyfiken' : TID < 115.6 ? 'glad' : 'jatteglad', { armar: TID > 115.8 ? [50, 50] : [10, 10], rikt: TID < 115.0 ? 0.4 : 0, svans: TID > 115.6 ? 22 * Math.sin(SLAGV(TID)) : 5 * Math.sin(SLAGV(TID) / 4) });   // svansen viftar när han blir glad
    heli({ ...LAND, lage: L8.lage, bubbla: L8.bubbla }); L8.rita();
    const [gx, gy, gh] = gurraPlats(TID), harHatt = TID > 111.6, given = TID > 115.2, [bx, by] = BLADEN[1];   // hatten på mittbladet: Gurra tar den efter andra hoppet
    const gq = hopp(TID, GHOPP.map(g => g[0]), 0, 0.62);
    gurra(gx, gy, { u: gh > 0 ? 'jatteglad' : TID < 111.6 ? 'glad' : 'stolt', po: ihop({ armar: harHatt && !given ? [60, 60] : TID > 115.8 ? [60, 60] : [10, 10] }, gq.po), skugga: gh === 0,
      ...(TID > 109.15 && TID < 109.75 ? { u: 'forvanad', po: 'huka' } : {}) });   // Gurra drar in huvudet när han ser hatten
    const [hx, hy] = HATT_KAJSA(), nick = Math.sin(Math.PI * kl01((TID - 115.4) / 0.8));
    kajsa({ u: TID < 115.2 ? 'ledsen' : 'jatteglad', hatt: given, po: { upp: -0.35 * nick, armar: TID > 115.8 ? [50, 50] : [6, 6] } });
    if (!harHatt) pynt(hattSvg(bx, by + 10 + 4 * Math.sin(TID * 2.5), 48));
    else if (!given) { const [ghx, ghy] = [gx, gy - 0.28 * 760], k = ease((TID - 114.4) / 0.8);
      pynt(hattSvg(lerp(ghx, hx, k), lerp(ghy, hy, k) - 60 * Math.sin(Math.PI * k), lerp(45, 69, k))); }
    if (given) glitter(hx, hy - 25, 70, TID - 115.6, 6);
    kamera(1.3, 1180, 780);
  },
  // refräng 3: samma mönster; a–c vid dammen med Kajsa och Gurra (de ekar och vinkar med båda händerna när svepet tar helikoptern), d–e vid jättesolen
  '09a': gulRad(), '09b': snurraRad, '09c': gulRad(), '09d': uppRad(ORD.upp[2]), '09e': hahaRad(ORD.haha[4]),
  '10a': (u, s) => { disco({ s }); dansare({}, { studs: 1.3 }); kamera(1); },
  '10b': (u, s, d) => { disco({ s }); const [b0, b1] = klappSlag(BILD0 + 0.35, BILD0 + d - 0.5), kl = klappTakt('lage', TID, b0, b1);   // Lage klappar
    dansare({ lage: { ...kl, dy: 0 } }); dansGnista('lage', kl); kamera(1); },
  '10c': (u, s) => { disco({ s }); const g = Math.sin(Math.PI * (TID - 0.1 - SANG0) / (2 * BEAT));   // Kajsa gungar tungt, lite efter takten
    dansare({ kajsa: { u: 'glad', po: { luta: 12 * g, x: 40 * g, oron: [10 * g, -10 * g], strack: -0.03 * Math.abs(g) }, dy: 0 } }); kamera(1); },
  '10d': (u, s) => { disco({ s }); const q = hopp(TID, [137.2, 138.3], 170, 0.55);   // Gurra hoppar högt, två gånger
    dansare({ gurra: { u: q.luft ? 'jatteglad' : 'glad', dy: -q.dy, po: ihop({}, q.po) } }); kamera(1); },
  '10e': (u, s) => { disco({ s }); dansare({ lage: { u: 'blinkar', po: { bas: 'pekar', armar: [0, 40] } } }); kamera(1); },   // Lage blinkar och pekar på tittaren
  '10f': (u, s, d) => {   // andra varvet: alla gör varje rörelse tillsammans (klappa, gunga, hoppa), kameran lite närmare
    disco({ s });
    const t = TID, o = {}, [b0, b1] = klappSlag(141.45, 142.75), kl = {};
    for (const n of Object.keys(DANS)) { const fs = SIGN[n][0];
      if (t < 143.1) o[n] = { ...(kl[n] = klappTakt(n, t, b0, b1)), dy: 0 };
      else if (t < 145.2) { const g = Math.sin(Math.PI * (t + fs - 143.1) / (2 * BEAT)); o[n] = { u: 'glad', po: { luta: 9 * g, x: 25 * g } }; }
      else { const q = hopp(t + fs, [145.6, 146.6], 120, 0.5); o[n] = { u: q.luft ? 'jatteglad' : 'glad', dy: -q.dy, po: ihop({}, q.po) }; }
    }
    dansare(o); for (const n in kl) dansGnista(n, kl[n]); kamera(1.15, 960, 640);
  },
  '10g': (u, s) => { disco({ s }); const q = hopp(TID, [BILD0 + 0.05], 70, 0.45), o = {};
    for (const n of Object.keys(DANS)) o[n] = { u: 'jatteglad', po: ihop({ armar: [70, 70], strack: 0.03 }, q.po), dy: -q.dy }; dansare(o); kamera(1); },
  '11a': (u, s, d) => { disco({ s }); klistren(['heli'], 'banan', s, d); dansare({}, { studs: 0.8 });
    // tre bananer hoppar in mellan dansarna och vaggar i takt (högst 12°, ingen snurr), hoppar ner igen när klistermärket flyger upp
    [[715, 0], [1205, 0.09], [1730, 0.18]].forEach(([x, f]) => {
      const in_ = kl01((s - f) / 0.45), ut = kl01((s - (d - 0.7) - f) / 0.4), y = 1010 - 260 * Math.sin(Math.PI * in_) * (in_ < 1 ? 1 : 0) + 500 * ut * ut - 22 * takt();
      if (s < f || ut >= 1) return;
      const v = 12 * Math.sin(SLAGV(TID) / 2 + f * 9), sk = in_ < 0.15 ? ease(in_ / 0.15) : 1;
      lagg('pynt', `<g transform="rotate(${v.toFixed(1)} ${x} ${y.toFixed(1)}) translate(${x} ${y.toFixed(1)}) scale(${sk.toFixed(3)}) translate(${-x} ${(-y).toFixed(1)})">${bananSvg(x, y, 190, -6)}</g>`);
    });
    kamera(1); },
  '11b': (u, s, d) => { disco({ s }); klistren(['heli', 'banan'], 'humle', s, d);
    dansare({}, { studs: 0.8 }); kamera(1); },   // ingen Humle på golvet: klistermärket surrar och vickar själv
  '11c': (u, s, d) => { disco({ s }); klistren(['heli', 'banan', 'humle'], 'hatt', s, d);
    dansare({ kajsa: { u: 'jatteglad', po: { armar: [0, vinkArm(s, 70)] } } }, { studs: 0.8 }); kamera(1); },
  '11d': (u, s) => { disco({ s }); klistren(['heli', 'banan', 'humle', 'hatt']);
    const h = ORD.haha[5], q = hopp(TID, [h - 0.3], 150, 0.6), stort = TID > h - 0.45 && TID < h + 0.5, o = {};
    for (const n of Object.keys(DANS)) o[n] = stort ? { u: 'jatteglad', dy: -q.dy, po: ihop({ armar: [40, 40] }, q.po) } : { u: 'glad' };
    dansare(o, { studs: 1.4 }); kamera(1); },
  '11e': (u, s) => {   // hej då: den tomma helikoptern landar i luckan medan dansarna krymper och glider isär, Lage hoppar in, vinkar, och den lyfter lite
    disco({ s }); klistren(['heli', 'banan', 'humle', 'hatt']);
    const k = ease(s / 1.2), IN0 = 1.25, IN1 = IN0 + 0.7, o = {};
    ['kajsa', 'gurra'].forEach((n, i) => o[n] = { u: 'glad', po: { armar: [0, vinkArm(s, 70) * fas(s, 0.6 + 0.25 * i, 0.9 + 0.25 * i)] } });
    o.lage = s < IN0 ? { u: 'glad' } : null;
    dansare(o, { gap: k, krymp: k, studs: 0.5 });
    const H = { x: 1080, botten: lerp(640, 1010, k) - 130 * ease((s - 2.2) / 0.7), s: lerp(0.12, 0.4, k) };
    const bub = Math.max(1 - fas(s, IN0 - 0.35, IN0), fas(s, IN1, IN1 + 0.3));
    heli({ ...H, lage: s >= IN1 ? ['blinkar', { armar: [0, vinkArm(s, 66) * fas(s, IN1, IN1 + 0.25)] }] : null, bubbla: bub });
    if (s >= IN0 && s < IN1) lageHoppa(1 - (s - IN0) / (IN1 - IN0), H, { x: ISAR.lage, fot: DANS_GOLV - 60, s: DANS.lage[1] * 0.7 }, hopp(s, [IN0], 0, IN1 - IN0).po, 2000);
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
ANIM['06a'] = gulRad(); ANIM['06d'] = uppRad(ORD.upp[1]); ANIM['06e'] = hahaRad(ORD.haha[3]);

// Vid dammen i refräng 3 (09a–09e): alla tre gungar i takt; upp = helikopterns höjd, vinka = Kajsa och Gurra vinkar
function vidDammen({ u = 'jatteglad', hopp = 0, upp = 0, vinka = false, kajsa: ko = {}, kam = null } = {}) {
  dammen();
  const P = heli({ ...LAND, botten: LAND.botten - upp - (upp > 0 ? 8 * Math.sin(TID * 2.1) : 0), lage: [u, { armar: upp > 0 ? [0, vinkArm(TID)] : [20 + hopp, 20 + hopp] }] });
  if (varv(TID) > 0.3 && upp < 200) vind(LAND.x - 30, 1000, (TID * 1.6) % 1, 2);
  kajsa({ u, fot: KAJSA[1] - hopp, po: vinka ? { armar: [0, vinkArm(TID, 70)] } : hopp > 10 ? { armar: [hopp, hopp] } : 'neutral', ...ko });
  gurra(GURRA_VID[0], GURRA_VID[1] - hopp * 0.8, { u, po: vinka ? { armar: [0, vinkArm(TID + 0.3, 70)] } : hopp > 10 ? { armar: [hopp, hopp] } : 'neutral' });
  if (kam) kam(P); else kamera(1);
}
// Närbilderna vid dammen: ansiktenas mitt i scenen
const ANS = {
  lage: P => P(LAGE_ANSIKTE),
  kajsa: () => iFigur('kajsa', KAJSA[0], KAJSA[1], KAJSA[2], [512, 430]),
  gurra: () => iFigur('gurra', GURRA_VID[0], GURRA_VID[1], GURRA_S, [512, 470]),
};
// Refräng 3: ropet i närbild (09a Kajsa, 09c Lage), ekot på Gurra (09a) eller alla i helbild (09c), sedan helbild
function dammRefrang(forst) { return (u, s) => {
  const rop = BILD0, eko = rop + 2 * BEAT, efter = rop + 4 * BEAT, hoppa = TID >= eko ? 34 * takt() : 14 * takt();
  vidDammen({ u: 'jatteglad', hopp: forst === 'lage' && TID >= eko ? 44 * takt() : hoppa, kam: P => {
    const [ax, ay] = ANS[forst](P), [gx, gy] = ANS.gurra();
    const andra = forst === 'kajsa' ? [eko, 2.6, gx, gy - 40] : [eko, 1.0, 960, 540];
    kamSpar([[rop, forst === 'lage' ? 2.4 : 2.2, ax, ay - 20], andra, [efter, 1.0, 960, 540]], 0.04); } });
}; }

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
// 9,0: andra halvan av introts svep, det gula glider undan från papperet
const SVEP = [[9.0, 'gul'], [22.2, 'turkos'], [47.8, 'gul'],   // 22,2: kritan-ritar → dammen med ett svep (som 013), inte hålet i papperet
  [53.0, 'bla'], [87.0, 'gul'], [92.0, 'turkos'], [124.8, 'gul']], SV = 0.8;   // 124,8: refräng 3 till jättesolen

// --- Dansguiden i discot: ett litet klistermärke i övre högra hörnet visar rörelsen (013:s och 005:s rörelsesymbol) ---------
// Slås upp när raden börjar, dras av med en vickning när den slutar. Ingen text, inga pilar. Rörelsen går i takt med sången.
const SYM = [[129.1, 132.6, 'noter'], [132.6, 134.8, 'klappa'], [134.8, 136.8, 'gunga'], [136.8, 139.0, 'hoppa'], [139.0, 141.1, 'noter'],
  [141.1, 143.1, 'klappa'], [143.1, 145.2, 'gunga'], [145.2, 147.3, 'hoppa'], [147.3, 148.1, 'noter']];
const SYMX = 1735, SYMY = 150, SYMR = 104, SYM_FALL = 0.18, BRUN = '#8A5A3B', SYMGUL = '#E2A400';
const SLAG = n => SANG0 + n * BEAT;
function slagUpp(q) {
  let dy = 0, rot = 0, sx = 1, sy = 1;
  if (q < 0) { const k = kl01(1 + q / SYM_FALL); dy = -46 * (1 - k * k); rot += 10 * (1 - k); sx = sy = 1.15 - 0.15 * k; }
  else { const e = Math.exp(-q * 9) * Math.cos(q * 28); sx = 1 + 0.12 * e; sy = 1 - 0.14 * e; rot += 5 * Math.exp(-q * 6) * Math.sin(q * 26); }
  return { dy, rot, sx, sy };
}
const tass = (x, y, rx, ry, rot = 0) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})">
  <ellipse rx="${rx}" ry="${ry}" fill="${BRUN}" stroke="#fff" stroke-width="5"/><ellipse cy="${(ry * 0.25).toFixed(1)}" rx="${(rx * 0.45).toFixed(1)}" ry="${(ry * 0.32).toFixed(1)}" fill="#E9B9A4"/>
  ${[-0.5, 0, 0.5].map(k => `<circle cx="${(k * rx * 0.9).toFixed(1)}" cy="${(-ry * 0.42 + Math.abs(k) * ry * 0.12).toFixed(1)}" r="${(rx * 0.17).toFixed(1)}" fill="#E9B9A4"/>`).join('')}</g>`;
const symNot = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" fill="${SYMGUL}" stroke="${SYMGUL}" stroke-width="7" stroke-linecap="round">
  <ellipse cx="0" cy="0" rx="14" ry="10" transform="rotate(-22)" stroke="none"/><path d="M12 -4V-64" fill="none"/><path d="M12 -64Q16 -48 34 -42" fill="none"/></g>`;
function symbolMotiv(typ, t) {
  const n = Math.floor((t - SANG0) / BEAT), q = t - SLAG(n), qn = t - SLAG(n + 1), p = q / BEAT;
  if (typ === 'klappa') {   // två tassar som slår ihop på slaget
    const isar = q < 0.12 ? 0 : qn > -0.18 ? -qn / 0.18 : 1, gap = 8 + 30 * ease(isar);
    return tass(-gap - 14, 0, 20, 30, 12) + tass(gap + 14, 0, 20, 30, -12);
  }
  if (typ === 'upp') {      // två tassar uppe som vickar (händerna upp och vicka)
    const w = 14 * Math.sin(t * 16);
    return tass(-26, -6, 18, 26, -14 + w) + tass(26, -6, 18, 26, 14 - w) + `<path d="M-40 46H40" stroke="${BRUN}" stroke-width="6" stroke-linecap="round"/>`;
  }
  if (typ === 'cirkel') {   // en prickad cirkel och en tass som går runt den (armarna i cirkel), ett varv på två slag
    const v = 2 * Math.PI * (t - SANG0) / (2 * BEAT);
    const prickar = Array.from({ length: 12 }, (_, i) => { const g = i * Math.PI / 6; return `<circle cx="${(40 * Math.cos(g)).toFixed(1)}" cy="${(40 * Math.sin(g)).toFixed(1)}" r="4.5" fill="#C9A15A"/>`; }).join('');
    return prickar + tass(40 * Math.cos(v), 40 * Math.sin(v), 16, 22, v * 180 / Math.PI + 90);
  }
  if (typ === 'gunga') {    // en liten gul kropp som gungar från sida till sida på en marklinje, ytterläget på slaget
    const v = (n % 2 ? 1 : -1) * 20 * Math.cos(Math.PI * Math.min(1, p));
    return `<path d="M-50 44H50" stroke="${BRUN}" stroke-width="7" stroke-linecap="round"/>
      <g transform="rotate(${v.toFixed(1)} 0 42)"><ellipse cy="4" rx="27" ry="36" fill="${SYMGUL}" stroke="#fff" stroke-width="5"/>
      <circle cx="-9" cy="-6" r="4" fill="#2a1d1a"/><circle cx="9" cy="-6" r="4" fill="#2a1d1a"/><path d="M-8 8Q0 15 8 8" fill="none" stroke="#2a1d1a" stroke-width="3.5" stroke-linecap="round"/></g>`;
  }
  if (typ === 'hoppa') {    // en prickad båge mellan två markstreck, bollen hoppar fram och tillbaka längs den
    const f = n % 2 ? 1 - p : p, x = lerp(-48, 48, f), y = 30 - 4 * 62 * f * (1 - f);
    const prickar = Array.from({ length: 9 }, (_, i) => { const g = i / 8; return `<circle cx="${lerp(-48, 48, g).toFixed(1)}" cy="${(30 - 248 * g * (1 - g)).toFixed(1)}" r="4.5" fill="#C9A15A"/>`; }).join('');
    return `${prickar}<path d="M-62 40H-34M34 40H62" stroke="${BRUN}" stroke-width="6" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="${(y - 12).toFixed(1)}" r="13" fill="${SYMGUL}" stroke="#fff" stroke-width="4"/>`;
  }
  const g = Math.sin(Math.PI * (t - SANG0) / BEAT);   // noter som gungar på slaget
  return symNot(-22, 30 - 6 * g, 0.85) + symNot(26, 22 + 6 * g, 0.7);
}
function rorSticker(t, a, b, typ) {
  if (t < a - SYM_FALL || t >= b) return;
  let { dy, rot, sx, sy } = slagUpp(t - a), skala = 1;
  if (t > b - 0.2) { const k = (b - t) / 0.2; skala = ease(k); rot += 12 * Math.sin((1 - k) * 9); }
  lagg('ram', `<g transform="translate(${SYMX} ${SYMY + dy}) rotate(${rot.toFixed(2)}) scale(${skala.toFixed(3)}) translate(0 ${SYMR}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(0 ${-SYMR})">
    <circle cx="5" cy="9" r="${SYMR}" fill="#5a3c00" opacity="0.25" filter="url(#dekalskugga)"/>
    <circle r="${SYMR}" fill="#fff" filter="url(#ikonkant)"/><circle r="${SYMR - 14}" fill="#FFF3C4"/>
    <g filter="url(#kritkorn)" transform="scale(1.3)">${symbolMotiv(typ, t)}</g></g>`);
}
function dansguide(t) { for (const [a, b, typ] of SYM) rorSticker(t, a, b, typ); }
// Refrängernas rörelse i samma hörn (raden a–e i 03, 06 och 09)
const REF_ROR = { a: 'upp', b: 'cirkel', c: 'upp', d: 'hoppa', e: 'klappa' };

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
  [['vind-hatt-1', 'sus-1'], 100.6, 0.35, { langd: 2.4, fade: 0.6 }], [['plopp-1'], 103.2, 0.5, {}],     // 08a: vinden tar hatten, den landar på bladet
  [['helikopter-stannar-1'], 103.4, 0.35, { langd: 2.4, fade: 0.8 }],                                    // 08a: Lage stänger av motorn
  ...GHOPP.flatMap(([t], i) => [[['kvak-' + (i % 4 + 1)], t - 0.1, 0.45, {}], [['plopp-1'], t + 0.6, 0.35, {}]]),   // 08b: kvak och plopp per hopp
  [['glitter-1'], 115.6, 0.25, { langd: 1.2 }], [['jubel-2'], 116.0, 0.35, { langd: 2.0, fade: 0.8 }],   // hatten är tillbaka, alla jublar
  [['helikopter-start-1', 'propeller-2'], 120.6, 0.25, { langd: 2.4, fade: 1.0 }],                       // 09b: motorn igen
  [['ryt-gasp-1'], 139.0, 0.4, { langd: 0.8, fade: 0.35 }],                                             // 10e: Lages korta glada ryt (bara början)
  [['tass-1'], 106.65, 0.45, {}], [['tass-2', 'tass-1'], 117.65, 0.4, {}],                                // Lage hoppar ur och i helikoptern
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
  await laddaFigurer(window.FIGURER || ['lage', 'kajsa', 'gurra', 'humle', 'humle2']);
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
    BILD = id; BILD0 = a; MED = /^0[69]/.test(id);
    ANIM[id]((TID - a) / (b - a), TID - a, b - a);
    if (id.startsWith('10')) dansguide(TID);
    if (/^0[369][a-e]$/.test(id)) rorSticker(TID, T[id][0], T[id][1], REF_ROR[id[2]]);
    for (const [c, farg] of SVEP) if (Math.abs(TID - c) < SV) kritsvep(0.5 + (TID - c) / (2 * SV), farg);
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);   // kritkanten kokar sex gånger i sekunden
    window.kant?.uppdatera();
  };
  await new Promise(r => setTimeout(r, 1500));   // urklippen hinner laddas
  window.seek(0);
  return true;
})();
