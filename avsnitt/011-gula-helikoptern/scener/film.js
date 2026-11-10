// Gula sången v5 (011): storyboard v5 som rörelse, en ANIM per rad i ../storyboard-v5/storyboard.md. Varje scen (<scen>/index.html)
// sätter window.SCEN = [första, sista] och laddar ../storyboard-v2/scen-kit.js och den här filen. Tiderna (avsnittstid) läses ur
// storyboard.md. Sången börjar på avsnittstid SANG0 och klipps aldrig. render.mjs anropar window.seek(t). Inget slumpas.
// Rörelserna är lugna (Sanna 2026-11-10: den studsiga riktningen avvisades): gungningar, mjuka lyft, ingen slagpuls.
const SANG0 = 23.4, BEAT = 0.6, SLUT = 236.6;                  // 100 bpm; sången (3:33,2) slutar 236,6, sången tystnar 231,4
let TID = 0, BILD = '', BILD0 = 0;
const SLAGV = t => 2 * Math.PI * (t - SANG0) / BEAT;
const gung = (per = 2, f = 0) => Math.sin(Math.PI * (TID + f - SANG0) / (per * BEAT));   // lugn gungning, ytterläge var per:e slag
const slag = (a, b) => { const r = []; for (let n = Math.ceil((a - SANG0) / BEAT - 1e-6); SANG0 + n * BEAT < b; n++) r.push(SANG0 + n * BEAT); return r; };
const lyft = (tider, d = 0.55) => tider.reduce((a, t0) => a + ease((TID - t0) / d), 0);   // trappsteg: +1 per tid
const pop = k => k <= 0 ? 0 : k >= 1 ? 1 : ease(k) * (1 + 0.2 * Math.sin(Math.PI * k));
const U = (namn, a, b, k) => FIG[namn].L.blanda(a, b, k);
// Hoppet som riggens hoppa: huk, sträckning i luften, landningen trycker ihop (det största trycket gäller). Ger { dy, luft, po }.
function hopp(t, tider, h, luft = 0.42) {
  let dy = 0, tr = 0, st = 0, fot = 0, arm = 0, iLuft = false;
  const amp = h ? Math.min(1, 0.35 + h / 120) : 1;
  for (const t0 of tider) { const k = t - t0;
    if (k > -0.13 && k < 0) { const q = Math.sin(Math.PI * (k + 0.13) / 0.13); tr = Math.max(tr, q); arm -= 12 * q; }
    else if (k >= 0 && k < luft) { const l = k / luft, kant = ease(l / 0.12) * ease((1 - l) / 0.12), fart = Math.abs(1 - 2 * l) * kant;
      dy += 4 * h * l * (1 - l); st = Math.max(st, fart); fot = -30 * kant; arm += 30 * Math.sin(Math.PI * l); iLuft = true; }
    else if (k >= luft && k < luft + 0.16) tr = Math.max(tr, Math.sin(Math.PI * (k - luft) / 0.16));
  }
  return { dy, luft: iLuft, po: { strack: amp * (0.1 * st - 0.12 * tr), bred: amp * (-0.075 * st + 0.1 * tr), benY: [fot, fot], armar: [amp * arm, amp * arm] } };
}
const ihop = (po, q) => { const p = typeof po === 'string' ? { bas: po } : { ...(po || {}) };
  p.strack = (p.strack || 0) + q.strack; p.bred = (p.bred || 0) + q.bred; if (q.benY[0]) p.benY = q.benY;
  p.armar = [(p.armar?.[0] || 0) + q.armar[0], (p.armar?.[1] || 0) + q.armar[1]]; return p; };

// --- Ekoorden -------------------------------------------------------------------------------------------------------------
// Munnen öppnas på ekoordet (snurr, hej, mums, ha-ha, surr, vifta), ingen läppsynk. Tiderna är uppskattade ur radernas tider i
// rader-v5.txt och takten (100 bpm), inte uppmätta: [andel av raden där ekot börjar, antal, avstånd s]. Justera här.
const EKO_RAD = { '02d': [0.53, 2], '02e': [0.65, 2, 0.5], '04b': [0.55, 2], '04c': [0.55, 2], '04d': [0.55, 2], '04f': [0.55, 2, 0.3],
  '05c': [0.5, 2, 0.55], '07b': [0.55, 2], '07c': [0.55, 2], '07d': [0.55, 2], '07f': [0.55, 2, 0.3], '08c': [0.27, 2],
  '10e': [0.36, 2, 0.3], '10j': [0.55, 2, 0.3] };
const eko = (id = BILD) => { const [a, b] = ANIM.TIDER[id], [f, n, d = 0.6] = EKO_RAD[id]; return Array.from({ length: n }, (_, i) => lerp(a, b, f) + i * d); };
let EKO = [];
window.munOppen = () => EKO.some(t => TID > t - 0.06 && TID < t + 0.32);
const UPP = [55.7, 56.3, 56.9];                                // "Upp, upp, upp!" (03b)

// Rotorns varvtal [avsnittstid, varv/s]: står still på ängen, startar på "snurr, snurr" (02d), varvar upp i 03a och refrängernas
// "Helikopter, helikopter", stannar efter landningen (05a–05b), startar igen när de lyfter (06a).
ROTOR = [[0, 0], [42.9, 0], [43.9, 1.4], [50.8, 1.4], [51.8, 2.4], [55.2, 2.4], [55.9, 1.4], [65.4, 1.4], [66.0, 2.4], [68.0, 2.4], [68.5, 1.4],
  [82.4, 1.4], [84.2, 0], [101.3, 0], [102.1, 1.4], [112.6, 1.4], [113.2, 2.4], [116.2, 2.4], [116.7, 1.4],
  [127.8, 1.4], [129.6, 0], [146.4, 0], [147.3, 1.4]];                // vers 3 på ängen: står still, startar i mellanspelet

// --- Uppställningar --------------------------------------------------------------------------------------------------------
const MARK = { x: 700, botten: 1000, s: 0.433 };               // ängen: helikoptern i gräset till vänster
const UTE = { x: 1250, fot: 1010, s: 0.37 };                   // ängen: Lage bredvid helikoptern
const HEL = { x: 740, botten: 963, s: 0.537 };                 // himlen
const SOLH = { x: 725, botten: 907, s: 0.454 };                // jättesolen
const LAGE_UTE_ANS = () => iFigur('lage', UTE.x, UTE.fot, UTE.s, [512, 430]);
// Lage till fots på ängen (vers 2 och 3, Sanna 2026-11-10: "have lion exit helicopter here on meadow")
const tillFots = (u, po = {}, o = {}) => visa('lage', { lager: 'lage-ute', ...UTE, u, po, svans: true, ...o });
// svanstofsen (riggens tail, vridpunkt 713,773, tofsen ca +167,−123) för svansvinkeln v, i bilden
const LAGE_TOFS = v => { const a = v * Math.PI / 180, dx = 167, dy = -123;
  return iFigur('lage', UTE.x, UTE.fot, UTE.s, [713 + dx * Math.cos(a) - dy * Math.sin(a), 773 + dx * Math.sin(a) + dy * Math.cos(a)]); };
const TOFS_UPP = -20, TOFS_NER = -85;                            // svansvinkel: tofsen uppe bland blommorna / gömd bakom kroppen
// smörblommor framför Lages svans (vers 3): tofsen sticker upp bland dem
const tuvor = () => { const ss = (TID - SANG0) / BEAT;
  [[UTE.x + 95, 78, 0], [UTE.x + 165, 62, 2], [UTE.x + 235, 84, 1], [UTE.x + 40, 56, 2]].forEach(([x, h, i], j) => {
    const y = UTE.fot + 14, v = 8 * Math.sin(Math.PI * ss / 2 + j * 0.8); sak('pynt', BLOMMOR[i], x, y, h, `rotate(${v.toFixed(2)} ${x} ${y})`); }); };
// solen långt borta i himlen (vers 1): samma solfigur, växer när de stiger, men de kommer inte fram förrän i refrängen
const solFjarran = (dy = 0, mun = 0) => { const k = fas(TID, 44.4, 58.0);
  lagg('bakom', solLiten(lerp(1440, 1460, k), lerp(215, 300, k) + dy, lerp(62, 150, k), 'glad', mun)); };
// Molnpassagen (format/regler.md: molnövergången) i stället för de gula kritsvepen upp till solen (Sanna 2026-11-10: "avoid crayon
// transition 0.58"): helikoptern stiger genom molnen, molnen sluter sig över skarven och glider neråt och isär.
const MOLNPASS = [58.1, 107.2];
function molnPassage(c, T = 1.0) {
  const q = (TID - c) / T; if (Math.abs(q) >= 1) return;
  const k = ease(Math.min(1, (1 - Math.abs(q)) / 0.7)), dy = 420 * q;
  sak('ram', MOLN.langt, 960, lerp(-500, 760, k) + dy, 1000);
  sak('ram', MOLN.stort, lerp(-1100, 430, k), 1380 + dy, 1420); sak('ram', MOLN.stort, lerp(3000, 1490, k), 1400 + dy, 1420);
  sak('ram', MOLN.mellan, 960, lerp(2000, 1180, k) + dy, 1000);
}
const narbild = (P, z = 2.4, dy = 50) => { const [fx, fy] = P(LAGE_ANSIKTE); kamera(z, fx, fy + dy); };
const skugga = (x, y, rx, op = 0.14) => lagg('bakom', `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.09).toFixed(1)}" fill="#2d5a3a" opacity="${op.toFixed(3)}"/>`);
// vinkning: arm-vinkeln, n vinkningar om d s från t0, mjukt in och ut
const vink = (t0, n = 2, d = 0.6, bas = 70) => Math.min(fas(TID, t0 - 0.35, t0), 1 - fas(TID, t0 + n * d, t0 + n * d + 0.35)) * (bas + 16 * Math.sin(2 * Math.PI * (TID - t0) / d));
// Refrängdansen (suno-v5-utkast.md): en rörelse per rad, alltid två likadana, lugnt
const DANS_ROR = {
  upp: f => ({ u: 'jatteglad', po: { armar: [40, 40], luta: 6 * gung(1, f) } }),                                   // händerna upp, gunga
  kittla: f => ({ u: { bas: 'fnissig', armar: [8, 8] }, po: { bas: 'magen', armar: [-124 + 7 * Math.sin(TID * 13 + f * 9), -124 + 7 * Math.sin(TID * 13 + 1 + f * 9)], luta: 3 * Math.sin(TID * 7 + f) } }),
  krama: f => ({ u: { bas: 'jatteglad', armar: [8, 8] }, po: { bas: 'magen', armar: [-108, -108], luta: 6 * gung(2, f) } }),
  hurra: () => ({ u: 'jatteglad', po: 'hurra' }),
  glad: f => ({ u: null, po: { luta: 4 * gung(2, f) } }),
};

// --- Ängen -----------------------------------------------------------------------------------------------------------------
// Ängen v2 med helikoptern i gräset. o.upp = höjd över marken (px), o.dx = åt höger. Molnet ligger över den målade solen i 02a–02d.
function angenHeli({ upp = 0, dx = 0, moln = false, ...o } = {}) {
  angen();
  if (moln) sak('framfor', MOLN.mellan, 1723 + 8 * Math.sin(TID * 0.4), 268, 210);
  const P = heli({ ...MARK, x: MARK.x + dx, botten: MARK.botten - upp, ...o });
  skugga(MARK.x + dx + 20, MARK.botten + 6, 250 * (1 - 0.5 * Math.min(1, upp / 400)), 0.14 * (1 - 0.6 * Math.min(1, upp / 400)));
  if (varv(TID) > 0.3 && upp < 300) vind(MARK.x + dx - 40, 1000, (TID * 1.6) % 1, 2);
  return P;
}
// Landningen på ängen (05a): två lugna sänkningar efter svepet
const LANDA = [81.0, 82.4];
const landHojd = () => 420 * (1 - 0.5 * ease((TID - LANDA[0]) / 1.1) - 0.5 * ease((TID - LANDA[1]) / 1.2)) - 4 * Math.sin(Math.PI * kl01((TID - 83.5) / 0.4));   // sätter sig lite i gräset
const TITTA = [84.8, 91.9];                                      // "Titta där!" i 05b och 05d (uppskattat)
// Lage hoppar mellan karet (k 0) och en plats utanför (k 1, ute = { x, fot, s }); H = helikopterns { x, botten, s } (rot 0).
function lageHoppa(k, H, ute, hq, topp = 3000) {
  const s = H.s, ex = HELI_ANKARE[0] + (ute.x - H.x) / s, ey = HELI_ANKARE[1] + (ute.fot - H.botten) / s;
  const hx = lerp(LAGE_FOT[0], ex, k), hy = lerp(LAGE_FOT[1], ey, k) - topp * k * (1 - k), hs = lerp(LAGE_K, ute.s / s, k);
  const q = { u: 'jatteglad', po: ihop({ armar: [45, 45] }, hq) };
  if (hy > 150 && k < 0.5) return visa('lage', { lager: 'heli-lage', x: hx, fot: hy, s: hs, ...q, skugga: false });
  visa('lage', { lager: 'lage-ute', x: H.x + (hx - HELI_ANKARE[0]) * s, fot: H.botten + (hy - HELI_ANKARE[1]) * s, s: hs * s, ...q, skugga: false, svans: true });
}
// Humle (Sanna 2026-11-10: "better animation", "dance more", inga ben): vingarna surrar hela tiden, hon gungar i takt med armarna
// omväxlande upp, och uttrycket skiftar var fjärde slag. humleLiv(f) = { u, po } (f = fas i s).
const HUMLE_U = ['jatteglad', 'glad', 'fnissig', 'jatteglad', 'forvanad', 'jatteglad'];
const cykel = (namn, lista, f = 0, per = 4) => { const q = (TID + f - SANG0) / (per * BEAT), i = Math.floor(q), k = ease((q - i) * per * BEAT / 0.35);
  const m = j => lista[((j % lista.length) + lista.length) % lista.length]; return U(namn, m(i - 1), m(i), k); };
const humleLiv = (f = 0, dans = 1) => { const v = SLAGV(TID + f) / 2;
  return { u: cykel('humle', HUMLE_U, f), po: { vinge: 10 + 12 * Math.sin(2 * Math.PI * 8 * TID), luta: 8 * dans * Math.sin(v), armar: [20 + 30 * dans * Math.sin(v), 20 - 30 * dans * Math.sin(v)], oron: [8 * Math.sin(v - 0.6), -8 * Math.sin(v - 0.6)] } }; };
// Humle vid helikoptern: punkten [x, y] i karets bild, en liten åtta runt punkten
const humleVid = (P, [x, y], o = {}) => { const [hx, hy] = P([x + 70 * Math.sin(TID * 1.6), y + 40 * Math.sin(TID * 3.2)]);
  visa('humle', { lager: 'framfor', x: hx, fot: hy, s: 0.5 * (o.hs || SOLH.s), ...humleLiv(), skugga: false, ...o }); return [hx, hy]; };

// --- Himlen och jättesolen ---------------------------------------------------------------------------------------------------
function flyg({ u = 'glad', po = 'neutral', dx = 0, dy = 0, glid = TID * 60, sjunk = 0, ...o } = {}) {
  himmel(glid, sjunk);
  const bob = t => 9 * Math.sin(t * 1.7), s = o.s || HEL.s;   // Lage i bubblan kommer 0,13 s efter helikopterns gungning
  return heli({ ...HEL, x: HEL.x + dx, botten: HEL.botten + dy + bob(TID), rot: 2 * gung(4), lage: [u, po], ldy: (bob(TID - 0.13) - bob(TID)) / s, ...o });
}
// Refrängbilden: helikoptern svävar framför jättesolen. MED = Humle följer med (refräng 2).
const MED = () => BILD.startsWith('07') || (BILD === '06b' && TID > SVEP_06B);
function solScen({ u = 'jatteglad', po = 'neutral', dy = 0, flod = 0, ansikte = 'glad', humle = {}, ...o } = {}) {
  jattesol({ t: TID, flod, ansikte, mun: /^0[47][cd]$/.test(BILD) && window.munOppen() ? 1 : 0 });   // solen säger hej och mums
  const bob = t => 8 * Math.sin(t * 1.3);
  const P = heli({ ...SOLH, botten: SOLH.botten + dy + bob(TID), rot: 2 * gung(4), lage: [u, po], ldy: (bob(TID - 0.13) - bob(TID)) / SOLH.s, ...o });
  if (MED() && humle) humleVid(P, humle.p || [1640, -60], humle);
  return P;
}
// rita en annan rads bild (scenen före svepet): BILD och BILD0 sätts till den radens
const som = id => { const [b, b0] = [BILD, BILD0], [a, e] = ANIM.TIDER[id]; BILD = id; BILD0 = a; ANIM[id]((TID - a) / (e - a), TID - a, e - a); BILD = b; BILD0 = b0; };
function stralar(x, y, k) {
  if (k <= 0.01) return;
  lagg('bakom', `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((TID * 18) % 360).toFixed(1)})" opacity="${(0.45 * k).toFixed(3)}">${Array.from({ length: 14 }, (_, i) => {
    const a = i * Math.PI / 7, b = a + 0.12; return `<path d="M0 0L${(1400 * Math.cos(a)).toFixed(0)} ${(1400 * Math.sin(a)).toFixed(0)}L${(1400 * Math.cos(b)).toFixed(0)} ${(1400 * Math.sin(b)).toFixed(0)}Z" fill="#fff"/>`; }).join('')}</g>`);
}
const solIn = t0 => 640 * (1 - ease((TID - t0) / 2.2));          // helikoptern kommer upp nerifrån efter svepet

// Bananerna som dansar (Sanna 2026-11-10: "dancing scene with bananas similar to red song dancing apples", "maybe banana dancing
// after solen bjuder på banan"): som 013:s äppelmarsch, men lugnare, på molnen bakom helikoptern i refrängernas sista rad (04f, 07f).
const BMARSCH = [300, 630, 960, 1290, 1620], BANSIKTE = [820, 1040];   // bananens ansikte i bildens 1659 × 1535-ruta
function glattBanan(x, botten, h, { mun = 'le', rot = 0, tryck = 1, lager = 'framfor' } = {}) {
  const s = h / 1535, [fx, fy] = BANSIKTE, e = 140;
  const munSvg = mun === 'o' ? `<ellipse cx="${fx}" cy="${fy + 150}" rx="50" ry="66" fill="#6b3a10"/>`
    : `<path d="M${fx - 95} ${fy + 110} Q${fx} ${fy + 210} ${fx + 95} ${fy + 110}" fill="none" stroke="#5a3210" stroke-width="28" stroke-linecap="round"/>`;
  lagg(lager, `<g transform="translate(${x.toFixed(1)} ${botten.toFixed(1)}) scale(${(2 - tryck).toFixed(3)} ${tryck.toFixed(3)}) rotate(${rot.toFixed(2)}) scale(${s.toFixed(4)}) translate(-830 -1535)">
    <image href="${BANAN}" width="1659" height="1535"/>
    ${[-1, 1].map(k => `<ellipse cx="${fx + k * 1.9 * e}" cy="${fy + 90}" rx="68" ry="42" fill="#F2876A" opacity="0.6"/>
      <ellipse cx="${fx + k * e}" cy="${fy - 10}" rx="40" ry="58" fill="#2a1a0c"/><circle cx="${fx + k * e - 12}" cy="${fy - 32}" r="14" fill="#fff"/>`).join('')}
    ${munSvg}</g>`);
}
function bananRad(s, { botten = 935, h = 300, xs = BMARSCH, lager = 'framfor', in_ = 4.2, GR = [4.2, 5.4, 7.2] } = {}) {
  const sl = (TID - SANG0) / BEAT, n = Math.floor(sl), b = Math.sin(Math.PI * (sl - n)) ** 2, g = Math.sin(Math.PI * sl / 2);
  const ga = ease(Math.min(1, s / in_)), lead = lerp(2100, xs[0], ga);
  xs.forEach((mx, i) => {
    const x = lead + (mx - xs[0]) + 10 * g;
    const del = f => f === 0 ? [0.047 * h * b, 6 * Math.sin(Math.PI * sl), 'le']                                 // kliver in
      : f === 1 ? [0.02 * h * b, 9 * g * (i % 2 ? 1 : -1), 'le']                                                  // gungar om vartannat
      : f === 2 ? (() => { const vem = n % xs.length === i; return [(vem ? 0.15 : 0.02) * h * b, vem ? 0 : 5 * g, vem && b > 0.6 ? 'o' : 'le']; })()   // en våg
      : [0.13 * h * b, 7 * g, b > 0.6 ? 'o' : 'le'];                                                             // alla tillsammans
    const f = GR.filter(t => s >= t).length, ov = f > 0 ? ease(kl01((s - GR[f - 1]) / 0.6)) : 1;
    const [h1, t1, mun] = del(f), [h0, t0] = f > 0 ? del(f - 1) : [h1, t1];
    const hh = lerp(h0, h1, ov), landar = b < 0.2 && hh > 4 ? 1 - b / 0.2 : 0;
    glattBanan(x, botten - hh, h, { mun, rot: lerp(t0, t1, ov) - 8, tryck: 1 - 0.06 * landar, lager });
  });
}

const ANIM = {
  // 02a: zoom in genom ett hål i papperet (22,4–24,2, börjar i kritan-ritar), ängen syns genom hålet. Sången börjar 23,4.
  // Sanna 2026-11-10 ("start is a bit slow … maybe close crops"): efter hålet glider kameran lugnt in till Lages ansikte (han tittar runt),
  // vidare till helikopterns bubbla (den glimmar) och ut till helbild igen före 02b.
  '02a': (u, s) => {
    const P = angenHeli({ moln: true, lage: null });
    const titt = [14 * Math.sin(s * 0.9) * fas(s, 1.6, 2.4), -4 + 8 * fas(s, 4.2, 5.0)];
    // berättelsens början (animatörens noter): Lage är lite ledsen redan före sången, och suckar i närbilden
    const suck = Math.sin(Math.PI * kl01((s - 2.7) / 1.4));
    visa('lage', { lager: 'lage-ute', ...UTE, u: { ...U('lage', 'neutral', 'ledsen', 0.25 + 0.35 * fas(s, 1.0, 2.6)), titt }, po: { bas: 'sitter', svans: 2 * gung(4), luta: 2 * Math.sin(s * 0.9), upp: 0.18 * suck - 0.2 * fas(s, 3.6, 4.4), strack: 0.02 * suck }, svans: true });
    const [fx, fy] = LAGE_UTE_ANS(), [hx, hy] = P([1000, -120]);
    if (s > 5.6 && s < 7.6) glitter(hx + 90, hy - 60, 110, s - 5.8, 5);
    const ansikte = fas(s, 1.2, 2.8) * (1 - fas(s, 4.6, 5.8)), bubbla = fas(s, 4.6, 5.8) * (1 - fas(s, 7.6, 9.2));
    const z = 1.04 + 1.0 * ansikte + 0.75 * bubbla;
    kamera(z, 960 + (fx - 960) * ansikte + (hx - 960) * bubbla, 600 + (fy + 30 - 600) * ansikte + (hy - 600) * bubbla);
    papperHal(kl01((TID - 22.4) / 1.8));
  },
  '02b': (u, s) => {   // närbild: Lage hänger med huvudet, manen sjunker lite
    angenHeli({ moln: true, lage: null });
    const k = fas(s, 0.2, 1.4);
    visa('lage', { lager: 'lage-ute', ...UTE, u: U('lage', 'neutral', 'ledsen', k), po: { bas: 'sitter', upp: -0.45 * k, strack: -0.025 * k, svans: 2 * gung(4) }, svans: true });
    const [fx, fy] = LAGE_UTE_ANS(); kamera(lerp(2.2, 2.35, ease(s / 3.6)), fx, fy + 30);
  },
  '02c': (u, s, d) => {   // Lage tittar upp; helikoptern glimmar till bakom honom; han reser sig
    const P = angenHeli({ moln: true, lage: null }), st = fas(s, d - 1.2, d - 0.5);
    visa('lage', { lager: 'lage-ute', ...UTE, u: U('lage', 'ledsen', 'nyfiken', fas(s, 0, 0.8)), po: { ...FIG.lage.L.blandaPose('sitter', 'neutral', st), upp: 0.8 * (1 - st), rikt: -0.3 * fas(s, 1.4, 2.0) }, svans: true });
    const [gx, gy] = P([1300, -140]); glitter(gx, gy, 120, s - 1.5, 5);
    kamera(lerp(1.15, 1.05, ease(s / d)), 960, 640);
  },
  '02d': (u, s) => {   // Lage hoppar in i bubblan (den fälls upp), rotorn börjar snurra på "snurr, snurr"
    const t0 = BILD0 + 0.45, d = 0.8, k = TID < t0 ? 1 : TID < t0 + d ? 1 - (TID - t0) / d : 0, hq = hopp(TID, [t0], 0, d).po;
    const lucka = fas(TID, BILD0, t0) * (1 - fas(TID, t0 + d + 0.1, t0 + d + 0.5));
    const inne = k === 0;
    angenHeli({ moln: true, lucka, lage: inne ? ['glad', { armar: [14, 14] }] : null });
    if (TID < t0) visa('lage', { lager: 'lage-ute', ...UTE, u: 'glad', po: { bas: 'huka', svans: 6 }, svans: true });
    else if (!inne) lageHoppa(k, MARK, UTE, hq);
    kamera(1.05, 900, 640);
  },
  '02e': (u, s, d) => {   // rakt klipp upp i himlen: helikoptern stiger mellan molnen, solen kikar fram uppe till höger, Lage vinkar
    const k = ease(s / 2.6), hej = eko('02e')[0];
    himmel(TID * 40, 380 * k);
    solFjarran(lerp(-380, 0, fas(s, 1.4, 3.2)), window.munOppen() && TID > hej - 0.2 ? 1 : 0);   // solen kikar fram långt borta och svarar hej
    const P = heli({ ...HEL, botten: HEL.botten + 560 * (1 - k) + 9 * Math.sin(TID * 1.7), rot: 2 * gung(4),
      lage: [TID > hej - 0.8 ? 'jatteglad' : s > 1.6 ? U('lage', 'forvanad', 'glad', fas(s, 2.4, 3.0)) : 'glad', { armar: [10, vink(hej - 0.3)], upp: 0.5 * fas(s, 1.6, 2.0) * (1 - fas(s, 3.2, 3.6)) }] });
    stralar(...P([1070, 60]), fas(s, 0.2, 0.9) * (1 - fas(s, 3.0, 3.8)));
    kamera(1);
  },
  '03a': (u, s) => {   // nära rotorn som snurrar fortare
    solFjarran();
    const P = flyg({ u: { bas: 'glad', titt: [0, -12] }, po: { upp: 0.6 } }), [rx, ry] = P([1070, TOPP - 80]), [fx, fy] = P(LAGE_ANSIKTE);
    kamera(lerp(1.7, 1.85, ease(s / 5)), (rx + fx) / 2, (ry + fy) / 2);
  },
  '03b': (u, s) => {   // tre lugna lyft, ett per "upp"
    solFjarran();
    const P = flyg({ u: U('lage', 'forvanad', 'jatteglad', fas(TID, UPP[0], UPP[2])), dy: -70 * lyft(UPP), po: { armar: [10 + 12 * lyft(UPP), 10 + 12 * lyft(UPP)] } });
    stralar(...P([1070, 60]), fas(s, 0, 0.6));
    kamera(1);
  },
  '03c': (u, s) => {   // "Nu flyger vi!": de stiger genom molnen (molnpassagen) till jättesolen, helikoptern kommer upp nerifrån
    if (TID < SVEP_03C) { solFjarran(); const P = flyg({ u: 'jatteglad', dy: -210 - 260 * ease((TID - BILD0) / 1.2), po: { armar: [40, 40] } }); stralar(...P([1070, 60]), 1); }
    else solScen({ dy: solIn(SVEP_03C), po: { armar: [30, 30] } });
    kamera(1);
  },
  // Refräng 1 (04a–04f) och 2 (07a–07f): samma bild och samma rörelse per rad, i refräng 2 är Humle med
  '04a': (u, s) => { solScen({ ...DANS_ROR.upp(0), u: U('lage', 'jatteglad', 'fnissig', fas(s, 1.4, 1.8)), humle: {} }); kamera(lerp(1, 1.07, ease(s / 3)), 960, 540); },
  '04b': (u, s, d) => {   // armen ritar två stora lugna rotorcirklar, rotorn snurrar fortare
    const w = 2 * Math.PI * 2 * ease(s / (d - 0.3)), arm = 50 + 42 * Math.sin(w - Math.PI / 2) * fas(s, 0, 0.3);
    const P = solScen({ u: { bas: 'glad', titt: [6, -10] }, po: { armar: [12, 60 + arm], luta: 3 * Math.sin(w) },
      humle: MED() ? { p: [1070 + 760 * Math.cos(w / 2 + 0.3), 0 + 520 * Math.sin(w / 2 + 0.3)] } : {} });   // Humle flyger en cirkel runt helikoptern (07b)
    kamera(1);
  },
  '04c': (u, s) => {   // sträcker sig upp och vinkar två gånger, solen blinkar tillbaka
    const [h0] = eko(), blink = TID > h0 - 0.1 && TID < h0 + 1.3;
    solScen({ u: 'jatteglad', po: { bas: 'upp', armar: [24, 30 + vink(h0 - 0.3, 2, 0.6, 50)] }, ansikte: blink && Math.floor((TID - h0) / 0.6) % 2 === 0 ? 'blinkar' : 'glad',
      humle: {} });
    kamera(lerp(1.15, 1.3, ease(s / 2.3)), 1090, 480);   // halvbild: Lage och solen hälsar
  },
  '04d': (u, s, d) => {   // bananen svävar fram från solen på ett moln; bubblan fälls upp, Lage tar den och tar två tuggor, tungan på sista
    const [m1, m2] = eko(), t0 = BILD0, ta = t0 + 1.25, slut = m2 + 0.25;
    const lucka = fas(TID, t0 + 0.5, t0 + 1.0) * (1 - fas(TID, slut + 0.3, slut + 0.75)), tunga = TID > slut;
    const bett = [m1, m2].filter(t => TID > t + 0.1).length, kvar = [1, 0.55, 0][bett];
    const fram = tunga ? `<ellipse cx="1088" cy="${LAGE_ANSIKTE[1] + 76}" rx="16" ry="12" fill="#E7898C" stroke="#B9565F" stroke-width="3"/>` : '';
    const P = solScen({ u: TID < t0 + 1.0 ? U('lage', 'jatteglad', 'forvanad', fas(TID, t0 + 0.1, t0 + 0.5)) : U('lage', 'forvanad', 'jatteglad', fas(TID, t0 + 1.0, t0 + 1.3)), po: { armar: [4, TID < ta ? 52 * fas(TID, t0 + 0.6, ta) : 44 * (1 - fas(TID, slut, slut + 0.5)) + 8] }, lucka, fram,
      humle: TID > m1 + 0.6 ? { u: 'jatteglad' } : {} });
    // molnet med bananen: från solen fram till bubblans högra sida, sedan tillbaka
    const mal = P([1760, 120]), km = ease((TID - t0) / 1.0), tillbaka = fas(TID, ta + 0.3, ta + 1.6);
    const mx = lerp(lerp(SOL[0] - 170, mal[0], km), SOL[0] - 170, tillbaka), my = lerp(lerp(SOL[1] + 200, mal[1], km), SOL[1] + 200, tillbaka) + 10 * Math.sin(TID * 1.8);
    const msk = lerp(0.4, 1, km) * (1 - 0.6 * tillbaka);
    if (tillbaka < 1) sak('pynt', MOLN.litet, mx, my + 70 * msk, 120 * msk);
    // bananen: på molnet, sedan i Lages tass framför ansiktet (karets punkt 1330, 300)
    const [hx, hy] = P([1330, 300]), kt = ease((TID - ta) / 0.35), bx = lerp(mx, hx, kt), by = lerp(my + 18, hy, kt);
    const bs = lerp(190, 330 * SOLH.s, kt) / 1535, rot = lerp(-10 + 6 * Math.sin(TID * 1.6), -28, kt);
    // två tydliga bett: en rund tugga ur toppen per "mums" (mask med två cirklar), sista tuggan tar resten
    const bettHal = bett >= 1 ? `<circle cx="-120" cy="-1500" r="330"/><circle cx="260" cy="-1380" r="300"/>` : '';
    if (kvar > 0) pynt(`<g><mask id="bett" maskUnits="userSpaceOnUse" x="-2000" y="-3000" width="4000" height="5000"><rect x="-2000" y="-3000" width="4000" height="5000" fill="#fff"/><g fill="#000">${bettHal}</g></mask>
      <g transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${bs.toFixed(4)})"><g mask="url(#bett)"><image href="${BANAN}" width="1659" height="1535" transform="translate(-830 -1535)"/></g></g></g>`);
    const gr = (TID - ta) / 0.5; if (gr > 0 && gr < 1) [0, 1, 2, 3].forEach(i => gnista(hx + 70 * Math.cos(i * 1.6 + 0.4), hy - 60 + 60 * Math.sin(i * 1.6 + 0.4), 22 * Math.sin(Math.PI * gr), 40 * gr));
    if (km < 1) glitter(mx, my - 40, 90, TID - t0 - 0.3, 4);
    if (MED() && TID > m1 + 0.15 && TID < m1 + 0.75) {   // Humle får en bit (07d)
      const k = ease((TID - m1 - 0.15) / 0.6), [qx, qy] = P([1640 + 40 * Math.cos(TID * 1.4), -60 + 26 * Math.sin(TID * 2.8)]);
      pynt(bananSvg(lerp(hx, qx - 30, k), lerp(hy - 60, qy - 90, k) - 80 * Math.sin(Math.PI * k), 46, 30 * k));
    }
    const nara = fas(TID, ta - 0.1, ta + 0.5) * (1 - fas(TID, slut + 0.4, slut + 1.0)), [fx, fy] = P(LAGE_ANSIKTE);   // nära på tuggorna
    kamera(1.08 + 0.55 * nara, lerp(1060, fx + 60, nara), lerp(520, fy + 40, nara));
  },
  '04e': (u, s) => {   // närbild: Lage kramar sig själv och gungar. "Nu blir du glad!" är filmens utdelning: jätteglad, gnistor runt ansiktet
    const P = solScen({ ...DANS_ROR.krama(0), u: { bas: 'jatteglad', kind: 1.3, armar: [8, 8] }, humle: null }), [fx, fy] = P(LAGE_ANSIKTE);
    [0, 1, 2, 3, 4].forEach(i => { const q = ((s - 0.2 - i * 0.35) % 1.75 + 1.75) % 1.75; if (s > 0.2 + i * 0.35 && q < 0.9) { const a = -2.6 + i * 0.95;
      gnista(fx + 150 * Math.cos(a), fy - 30 + 120 * Math.sin(a), 18 * Math.sin(Math.PI * q / 0.9), 40 * q); } });
    const [ax, ay] = P(LAGE_ANSIKTE); kamera(lerp(2.0, 2.45, ease(s / 2.4)), ax, ay + 60);
  },
  '04f': (u, s) => {   // kittlar magen och skrattar; solen skrattar med, floden glittrar
    const [h0] = eko(), skratt = TID > h0 - 0.1 && TID < h0 + 0.9;
    const r = DANS_ROR.kittla(0);
    if (skratt) r.u = { ...r.u, bas: 'jatteglad' };
    solScen({ ...r, flod: fas(s, 0, 0.8), ansikte: 'fnissig', humle: { u: 'fnissig' } });
    sak('bakom', MOLN.langt, 260, 1150, 300); sak('bakom', MOLN.langt, 1520, 1150, 300);   // molnraden bakom, bananerna dansar på den
    bananRad(s, { botten: 1010, h: 230, xs: [120, 340, 1290, 1530, 1770], lager: 'bakom', in_: 1.4, GR: [1.4, 2.4, 3.2] });
    [[300, 260, 0.6], [1650, 820, 1.1], [560, 780, 1.6], [1780, 240, 2.1], [980, 120, 2.6], [220, 640, 3.1]].forEach(([x, y, t]) => {
      const q = ((s - t) % 2.2 + 2.2) % 2.2; if (s > t && q < 0.9) gnista(x, y, 26 * Math.sin(Math.PI * q / 0.9), 40 * q); });
    kamera(lerp(1, 1.06, ease(s / 4)), 960, 540);
  },
  '05a': (u, s) => {   // turkost svep till ängen; helikoptern landar mjukt i två sänkningar
    if (TID < SVEP_05A) return som('04f');
    angenHeli({ upp: landHojd(), lage: ['glad', { armar: [14, 14] }] }); kamera(1);
  },
  '05b': (u, s, d) => {   // helikoptern har landat; Lage hoppar ut i gräset och spanar med tassen över ögonen; långt borta surrar humlan
    const UT0 = 83.7, UT1 = 84.5, k = TID < UT0 ? 0 : TID < UT1 ? (TID - UT0) / (UT1 - UT0) : 1;
    const lucka = fas(TID, UT0 - 0.4, UT0) * (1 - fas(TID, UT1 + 0.05, UT1 + 0.4));
    const kt = fas(TID, TITTA[0] - 0.3, TITTA[0] + 0.5), hx = lerp(1830, 1640, s / d), hy = 470 + 14 * Math.sin(s * 5);
    angenHeli({ upp: landHojd(), lucka, lage: TID < UT0 ? ['glad', { armar: [14, 14] }] : null });
    if (TID >= UT0 && TID < UT1) lageHoppa(k, MARK, UTE, hopp(TID, [UT0], 0, UT1 - UT0).po);
    else if (TID >= UT1) tillFots(kt > 0.2 ? { ...U('lage', 'forvanad', 'glad', fas(TID, TITTA[0] + 0.8, TITTA[0] + 1.4)), titt: [14, -4] } : { bas: 'nyfiken', titt: [13 * Math.sin(s * 1.3), -4] },
      { armar: [0, lerp(100, 40, kt)], luta: 3 * Math.sin(s * 1.3) * (1 - kt) });
    visa('humle', { lager: 'bakom', x: hx, fot: hy, s: lerp(0.05, 0.12, s / d), ...humleLiv(), skugga: false });
    kamera(lerp(1, 1.45, kt), lerp(960, (hx + 1250) / 2, kt), lerp(540, 620, kt));   // kameran letar med barnet: dit han pekar
  },
  '05c': (u, s) => {   // Humle surrar in och flyger två små öglor runt Lages huvud, en per "surr"
    angenHeli({ lage: null });
    const [fx, fy] = LAGE_UTE_ANS(), mal = [fx + 40, fy - 130], k = ease(s / 0.8);
    let x = lerp(1640, mal[0], k), y = lerp(470, mal[1], k);
    for (const t0 of eko()) { const q = (TID - t0) / 0.7; if (q > 0 && q < 1) { const a = 2 * Math.PI * ease(q); x = mal[0] + 130 * Math.sin(a); y = mal[1] - 100 * (1 - Math.cos(a)); } }
    tillFots({ bas: 'fnissig', titt: [Math.max(-14, Math.min(14, (x - fx) / 10)), -8] }, { armar: [16, 16] });
    visa('humle', { lager: 'pynt', x, fot: y + 10 * Math.sin(s * 5), s: lerp(0.08, 0.16, k), ...humleLiv(), skugga: false });
    kamera(lerp(1.2, 1.55, k), lerp(1100, fx, k), lerp(640, fy + 10, k));
  },
  '05d': (u, s) => {   // Lage och Humle spanar ner i gräset; en gul blomma kikar fram vid hans fötter
    angenHeli({ lage: null });
    const k2 = fas(TID, TITTA[1] - 0.2, TITTA[1] + 0.6), [fx, fy] = LAGE_UTE_ANS();
    tillFots({ bas: k2 > 0.2 && k2 < 1 ? 'forvanad' : 'nyfiken', titt: [-12, 12] }, { bas: 'ner', armar: [0, lerp(100, 50, k2)] });
    visa('humle', { lager: 'pynt', x: fx - 170 + 30 * Math.cos(TID * 1.4), fot: fy - 40 + 16 * Math.sin(TID * 2.8), s: 0.16, u: { bas: 'nyfiken', titt: [-6, 12] }, po: { ...humleLiv(0, 0.3).po, luta: -6 }, skugga: false });
    const k = pop((s - 1.8) / 0.9);
    if (k > 0) sak('framfor', BLOMMA, BLOMMA_X, 1014, 150 * k, `rotate(${(3 * Math.sin(TID * 1.6)).toFixed(2)} ${BLOMMA_X} 1014)`);
    kamera(lerp(1.3, 1.7, k2), lerp(1180, BLOMMA_X + 60, k2), lerp(760, 860, k2));
  },
  '05e': (u, s) => {   // nära gräset: smörblomman gnistrar, och blommorna runt omkring dansar
    angenHeli({ lage: null });
    tillFots(U('lage', 'forvanad', 'glad', fas(s, 0.8, 1.4)), { bas: 'ner', armar: [12, 12] });
    sak('framfor', BLOMMA, BLOMMA_X, 1014, 150, `rotate(${(6 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT))).toFixed(2)} ${BLOMMA_X} 1014)`);
    glitter(BLOMMA_X, 1014 - 110, 70, s - 0.2, 6);
    visa('humle', { lager: 'pynt', x: BLOMMA_X + 90 + 30 * Math.cos(TID * 1.4), fot: 830 + 14 * Math.sin(TID * 2.8), s: 0.14, ...humleLiv(), skugga: false });
    kamera(lerp(1.7, 2.0, ease(s / 1.2)), lerp(1100, BLOMMA_X + 60, ease(s / 1.2)), 860);
  },
  '05f': (u, s) => {   // närbild: Lage håller blomman under hakan, och hakan lyser gult
    angenHeli({ lage: null });
    tillFots('fnissig', { bas: 'magen', armar: [-108, -108] });
    const [fx, fy] = LAGE_UTE_ANS(), [cx, cy] = iFigur('lage', UTE.x, UTE.fot, UTE.s, [512, 560]);
    const gul = fas(TID, eko0('05f') - 0.2, eko0('05f') + 0.4);
    pynt(`<ellipse cx="${cx.toFixed(1)}" cy="${(cy - 6).toFixed(1)}" rx="54" ry="26" fill="#FFE14D" opacity="${(0.6 * gul).toFixed(3)}" filter="url(#mjuk)"/>`);
    sak('pynt', BLOMMA, cx + 8, cy + 110 + 4 * Math.sin(TID * 1.5), 130, `rotate(-6 ${cx} ${cy + 110})`);
    if (gul > 0) glitter(cx, cy - 4, 50, TID - eko0('05f') - 0.2, 4);
    kamera(2.35, fx, fy + 60);
  },
  '06a': (u, s) => {   // "Upp igen": Lage hoppar in igen (lugnt hopp), Humle sätter sig på bubblan, och helikoptern lyfter i två lyft
    const IN0 = BILD0 + 0.15, IN1 = IN0 + 0.8, k = TID < IN0 ? 1 : TID < IN1 ? 1 - (TID - IN0) / (IN1 - IN0) : 0;
    const lucka = fas(TID, IN0 - 0.4, IN0) * (1 - fas(TID, IN1 + 0.05, IN1 + 0.4));
    const L = [BILD0 + 1.5, BILD0 + 2.2], dip = L.reduce((a, t0) => a + Math.sin(Math.PI * kl01((TID - t0 + 0.3) / 0.35)), 0);
    const P = angenHeli({ upp: 130 * lyft(L) - 6 * dip, lucka, lage: k === 0 ? ['jatteglad', { armar: [30, 30] }] : null });
    if (k > 0) lageHoppa(k, MARK, UTE, hopp(TID, [IN0], 0, IN1 - IN0).po);
    const kh = ease((s - 0.6) / 0.9), [px, py] = P([1400, -150]);
    visa('humle', { lager: 'framfor', x: lerp(1600, px, kh), fot: lerp(560, py, kh) - 50 * Math.sin(Math.PI * kh), s: 0.2, ...humleLiv(0, 0.5), skugga: false });
    kamera(1);
  },
  '06b': (u, s) => {   // "Håll i dig – nu flyger vi!": helikoptern stiger åt höger, gult svep till solen, där kommer de upp nerifrån
    if (TID < SVEP_06B) {
      const k = ease((TID - BILD0) / 3.4), P = angenHeli({ upp: 260 + 620 * k, dx: 260 * k, lage: [s < 1.2 ? 'forvanad' : 'jatteglad', { armar: [-12, -12] }] }), [px, py] = P([1400, -150]);
      stralar(...P([1070, 60]), fas(s, 0.6, 1.4));
      visa('humle', { lager: 'framfor', x: px, fot: py, s: 0.2, ...humleLiv(0, 0.5), skugga: false });
      kamera(1);
    } else { solScen({ dy: solIn(SVEP_06B), po: { armar: [30, 30] } }); kamera(1); }
  },
  // Svansen (08a–08c) på ängen, Lage till fots (Sanna 2026-11-10): tofsen sticker upp bland smörblommorna bakom honom, viftar,
  // gömmer sig och kommer igen, medan han tittar åt fel håll; kameran går in på tofsen, den viftar två gånger och han skrattar
  '08a': (u, s) => {
    angenHeli({ lage: null });
    const upp = fas(s, 0.9, 1.2) * (1 - fas(s, 2.1, 2.4)) + fas(s, 2.9, 3.2), vift = 16 * Math.sin(2 * Math.PI * kl01((s - 1.3) / 0.7)) + 12 * Math.sin(2 * Math.PI * kl01((s - 3.3) / 0.6));
    const titt = s < 1.0 ? -13 : s < 2.3 ? 13 * fas(s, 2.1, 2.3) - 13 * (1 - fas(s, 2.1, 2.3)) : 13 - 26 * fas(s, 2.9, 3.2);   // tittar alltid åt fel håll
    tillFots({ bas: 'nyfiken', titt: [titt, -2] }, { svans: lerp(TOFS_NER, TOFS_UPP, upp) + vift * upp, luta: -2 });
    tuvor();
    const [fx, fy] = LAGE_UTE_ANS(), [tx, ty] = LAGE_TOFS(TOFS_UPP);
    kamera(1.8, (fx + tx) / 2, (fy + ty) / 2 + 30);
  },
  '08b': (u, s) => {
    angenHeli({ lage: null });
    tillFots(U('lage', { bas: 'forvanad', titt: [14, 8] }, { bas: 'fnissig', titt: [14, 8] }, fas(s, 1.2, 1.8)), { svans: TOFS_UPP });
    tuvor();
    const [tx, ty] = LAGE_TOFS(TOFS_UPP), [fx, fy] = LAGE_UTE_ANS(), k = fas(s, 0, 0.8);
    kamera(lerp(1.8, 2.7, k), lerp((fx + tx) / 2, tx - 70, k), lerp((fy + ty) / 2 + 30, ty + 30, k));
    glitter(tx, ty, 60, s - 0.4, 5); glitter(tx, ty, 60, s - 2.6, 5);
  },
  '08c': (u, s, d) => {
    angenHeli({ lage: null });
    const v = TOFS_UPP + eko().reduce((a, t0) => a + 24 * Math.sin(2 * Math.PI * kl01((TID - t0) / 0.6)), 0);
    tillFots(s < 3 ? { bas: 'fnissig', titt: [14, 8] } : 'jatteglad', { svans: v, armar: s < 3 ? [0, 0] : [30, 30] });
    tuvor();
    const [tx, ty] = LAGE_TOFS(TOFS_UPP), ut = fas(s, d - 2.6, d - 0.2);
    kamera(lerp(2.7, 1, ut), lerp(tx - 70, 960, ut), lerp(ty + 30, 540, ut));
  },
  '09a': (u, s) => {   // mellanspel: Lage hoppar in igen bland blommorna, helikoptern lyfter lugnt och flyger iväg uppåt åt höger; blommorna dansar och Humle följer med
    const IN0 = BILD0 + 0.5, IN1 = IN0 + 0.8, k = TID < IN0 ? 1 : TID < IN1 ? 1 - (TID - IN0) / (IN1 - IN0) : 0;
    const lucka = fas(TID, IN0 - 0.4, IN0) * (1 - fas(TID, IN1 + 0.05, IN1 + 0.4));
    const L = [BILD0 + 2.8, BILD0 + 3.6], dip = L.reduce((a, t0) => a + Math.sin(Math.PI * kl01((TID - t0 + 0.3) / 0.35)), 0);
    const iv = ease((s - 4.4) / 3.9), upp = 130 * lyft(L) - 6 * dip + 820 * iv, dx = 820 * iv;
    const P = angenHeli({ upp, dx, lucka, lage: k === 0 ? ['jatteglad', { armar: [10, vink(BILD0 + 1.6, 3)] }] : null });
    if (TID < IN0) tillFots('jatteglad', { bas: 'huka', svans: 10 });
    else if (k > 0) lageHoppa(k, MARK, UTE, hopp(TID, [IN0], 0, IN1 - IN0).po);
    const [px, py] = P([1430 + 50 * Math.sin(TID * 1.6), -170 + 30 * Math.sin(TID * 3.2)]);
    visa('humle', { lager: 'framfor', x: px, fot: py, s: 0.2, ...humleLiv(0, 1), skugga: false });
    kamera(lerp(1.15, 1, ease(s / 3)), 960, lerp(620, 540, ease(s / 3)));
  },
  '09b': (u, s) => {   // molnen glider ihop och isär, discokulan tänds, helikoptern landar, Kanel och Hugo vinkar, Lage hoppar ut
    const t = TID, ihopK = ease((t - BILD0) / 1.6), isar = ease((t - DISCO_IN) / 1.6);
    if (t < DISCO_IN) {
      const P = flyg({ u: 'jatteglad', glid: TID * 110, dx: 200 * ihopK });
      const [hx, hy] = P([-160 + 50 * Math.cos(TID * 1.2), -60 + 30 * Math.sin(TID * 2.4)]);
      visa('humle', { lager: 'framfor', x: hx, fot: hy, s: 0.26, ...humleLiv(0, 1.4), skugga: false });
    } else discoGolv(t);
    const k = t < DISCO_IN ? ihopK : 1 - isar;
    if (k > 0) { sak('ram', MOLN.stort, lerp(-1100, 430, k), 1380, 1420); sak('ram', MOLN.stort, lerp(3000, 1490, k), 1400, 1420); sak('ram', MOLN.mellan, 960, lerp(2000, 1180, k), 1000); }
    kamera(1);
  },
  // Discot: Lage, Hugo och Kanel på golvet, Humle surrar vid kulan. Dekalen i hörnet visar rörelsen.
  '10a': () => { dansGolv({}); }, '10b': () => { dansGolv(alla('upp')); },
  // första varvet: kameran går nära den som gör rörelsen (animatörens noter 2026-11-10)
  '10c': (u, s, d) => { const kl = klappRad('lage', d); dansGolv({ lage: kl }); nara('lage', s, d); },
  '10d': (u, s, d) => { const g = gung(2, -0.1); dansGolv({ kanel: { u: 'jatteglad', po: { luta: 11 * g, x: 34 * g, oron: [8 * g, -8 * g] } } }); nara('kanel', s, d); },
  '10e': (u, s, d) => { const r = DANS_ROR.kittla(0); if (window.munOppen()) r.u = { ...r.u, bas: 'jatteglad' }; dansGolv({ hugo: r }); nara('hugo', s, d); },
  '10f': () => { dansGolv({ lage: { u: 'blinkar', po: { bas: 'pekar', armar: [0, 40] } } }); },
  '10g': () => { dansGolv(alla('upp'), 1.1); },
  '10h': (u, s, d) => { const o = {}; for (const n in DANS) o[n] = klappRad(n, d); dansGolv(o, 1.1); },
  '10i': () => { const o = {}; for (const n in DANS) { const g = gung(2, SIGN[n]); o[n] = { u: 'glad', po: { luta: 8 * g, x: 22 * g } }; } dansGolv(o, 1.1); },
  '10j': () => { dansGolv(alla('kittla'), 1.1); },
  '10k': () => { dansGolv(alla('hurra'), 1); },
  // (andra varvet åker kameran lugnt längs raden, se VARV2 nedan)
  // Frågeleken: klistermärkena slås upp stort i mitten och flyger upp i bågen runt kulan
  '11a': (u, s, d) => { dansGolv({}); klistren([], 'heli', s, d); },
  '11b': (u, s, d) => { dansGolv({}); klistren(['heli'], 'sol', s, d); },
  '11c': (u, s, d) => { dansGolv({}); klistren(['heli', 'sol'], 'banan', s, d); },
  '11d': (u, s, d) => {   // Humle själv flyger fram till mitten och in i bågen
    const k = ease(s / 0.8), fore = s < 0.9;
    dansGolv({}, 1, !fore ? null : { x: lerp(HUMLE_KULA[0], MITT[0], k), fot: lerp(HUMLE_KULA[1], MITT[1] + 120, k), s: lerp(0.2, 0.42, k) });
    klistren(['heli', 'sol', 'banan'], fore ? null : 'humle', s - 0.9, d - 0.9);
  },
  '11e': (u, s, d) => { dansGolv({}, 1, null); klistren(['heli', 'sol', 'banan', 'humle'], 'blomma', s, d); },
  '11f': (u, s) => {   // Lage tar ett steg fram och stryker stolt manen, och svansen viftar; kameran går nära honom ("Lejonet!")
    const k = ease(s / 0.7), m = manen(BILD0 + 0.8);
    dansGolv({ lage: { u: 'stolt', po: { ...(m || { armar: [-4, -4] }), svans: 20 * Math.sin(SLAGV(TID) / 2) }, dx: 110 * k, dfot: 30 * k, ds: 0.05 * k } }, 1, null);
    klistren(ALLA_KLISTER);
    const n = ease(s / 1.0) * (1 - fas(s, 2.2, 3.0));
    kamera(lerp(1, 1.5, n), lerp(960, DANS.lage[0] + 110, n), lerp(540, 640, n));
  },
  '11g': (u, s) => {   // alla kittlar magen och skrattar (kroken dras ut ca 10 s), bågen glittrar
    const skratt = TID < KROK_SLUT;
    dansGolv(skratt ? alla('kittla') : alla('glad'), 1, null);
    klistren(ALLA_KLISTER);
    ALLA_KLISTER.forEach((n, i) => glitter(...SLOT[n], 115, ((s - 0.3 - i * 0.45) % 3.2 + 3.2) % 3.2, 5));
  },
  // Sanna 2026-11-10 ("have lion enter helicopter 3:32"): man ska se Lage hoppa in. Kanel och Hugo kliver åt sidan så att bubblan syns,
  // bubblan fälls upp, Lage hoppar in med samma lugna hopp som på ängen (lageHoppa, 0,8 s) och bubblan fälls ner igen
  '12a': (u, s) => {   // den tomma helikoptern kommer in och landar bakom Lage, han hoppar in, Kanel och Hugo vinkar 0,25 s isär
    const t0 = BILD0, H = { ...HEM, x: lerp(-600, HEM.x, ease(s / 1.4)), botten: lerp(560, HEM.botten, ease(s / 1.4)) - 160 * ease((s - 2.7) / 0.9) };
    const IN0 = t0 + 1.5, IN1 = IN0 + 0.8, inne = TID >= IN1;
    const lucka = fas(TID, IN0 - 0.4, IN0) * (1 - fas(TID, IN1 + 0.05, IN1 + 0.4));
    heli({ ...H, rot: -2 * (1 - ease(s / 1.4)), lucka, lage: inne ? ['jatteglad', { armar: [10, vink(IN1 + 0.3, 2, 0.6, 60)] }] : null });
    const at = ease((s - 0.1) / 1.1), v = (i, dx) => ({ u: 'jatteglad', po: { armar: [0, vink(t0 + 1.6 + 0.25 * i, 3)] }, lager: 'framfor', dx: dx * at });   // kliver åt sidan, vinkar
    dansGolv({ lage: TID < IN0 ? { u: 'jatteglad', po: { bas: 'huka', svans: 6 } } : null, hugo: v(0, 200), kanel: v(1, 330) }, 1, null);
    if (TID >= IN0 && !inne) lageHoppa(1 - (TID - IN0) / (IN1 - IN0), H, { x: DANS.lage[0], fot: DGOLV, s: DANS.lage[1] }, hopp(TID, [IN0], 0, IN1 - IN0).po, 1800);   // lite lägre båge än på ängen
    klistren(ALLA_KLISTER, null, 0, 0, 'bakom');   // bågen på väggen bakom, så att hoppet syns framför den
  },
  '12b': (u, s) => {   // rakt klipp till himlen: helikoptern flyger åt höger mot solen, Lage vinkar, kritirisen sluter sig
    const ut = ease(s / 2.4), P = flyg({ dx: lerp(-1450, 0, ut) + 240 * ease((s - 2.4) / 6), dy: -110 * ease((s - 2.4) / 6), u: 'jatteglad',
      po: { armar: [10, vink(BILD0 + 0.9, 3) + vink(BILD0 + 3.2, 2)] } });
    const solV = 12 * Math.sin(2 * Math.PI * (TID - BILD0) / 1.2) * fas(s, 0.8, 1.2) * (1 - fas(s, 4.4, 5.0));   // solen vinkar tillbaka (vickar)
    lagg('bakom', `<g transform="rotate(${solV.toFixed(2)} 1590 300)">${solLiten(1590, 300 - 14 * Math.abs(Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT))), 140, (TID % 3.1) < 0.22 ? 'blinkar' : 'glad')}</g>`);
    kamera(1);
    const [fx, fy] = P(LAGE_ANSIKTE), r = lerp(1400, 290, fas(TID, 230.2, 232.4)) * (1 - fas(TID, 234.2, 235.4));
    if (TID > 230.2) kritiris(r, fx, fy - 20, { t: s, glimt: fas(TID, 232.6, 233.0) * (1 - fas(TID, 235.6, 236.0)), in: fas(TID, 234.2, 235.4) });
  },
};
// Refräng 2: samma koreografi, ny bild (animatörens noter 2026-11-10). Kameran läggs över 04-radens.
const KAM07 = {
  a: s => kamera(lerp(1.28, 1.12, ease(s / 2.2)), lerp(820, 1000, ease(s / 2.2)), 560),       // nära helikoptern, glider ut mot solen
  b: s => kamera(1.12, lerp(1100, 900, ease(s / 4)), 560),                                    // åker åt vänster medan Humle flyger sin cirkel
  c: () => kamera(1.55, 1300, 470),                                                           // solen nära i förgrunden, Lage vinkar till vänster
  f: s => kamera(lerp(1.3, 1, ease(s / 3.5)), 960, 540),                                       // drar sig ut över hela bilden
};
['a', 'b', 'c', 'd', 'e', 'f'].forEach(b => ANIM['07' + b] = (u, s, d) => { ANIM['04' + b](u, s, d); KAM07[b]?.(s, d); });
ANIM['07e'] = (u, s) => { const P = solScen({ ...DANS_ROR.krama(0), humle: { p: [1560, 60], hs: SOLH.s } }); narbild(P, 2.1, 40); };

// --- Konstanter som behöver raderna ------------------------------------------------------------------------------------------
const SVEP_03C = 58.1, SVEP_05A = 80.9, SVEP_06B = 107.2, SVEP_08A = 128.4, DISCO_IN = 155.2, KROK_SLUT = 217.6;
const BLOMMA_X = 1090;                                           // smörblomman vid medarnas främre ände
const eko0 = id => lerp(...ANIM.TIDER[id], 0.62);                // "(hakan blir gul!)" i 05f
// Kritsvepen (avsnittstid, färg): över skarven, SV s före och efter. 02d → 02e och 12a → 12b är raka klipp, 09b molnen.
// 9,0: andra halvan av introts svep. Ingen sak i svepet.
const SVEP = [[9.0, 'gul'], [SVEP_05A, 'turkos'], [SVEP_08A, 'turkos']], SV = 0.8;   // upp till solen: molnpassagen (MOLNPASS)

// --- Discot -----------------------------------------------------------------------------------------------------------------
const DANS = { lage: [470, 0.62], kanel: [960, 0.6], hugo: [1450, 0.62] }, DGOLV = 1026;   // Kanel i mitten: Lage och Hugo har nästan samma orange
const SIGN = { lage: 0, kanel: -0.1, hugo: 0.06 };                // fas: Hugo lite tidig, Kanel lite sen
const HUMLE_KULA = [1130, 300], HEM = { x: 620, botten: 1012, s: 0.5 };   // Humle vid kulan; helikoptern hämtar Lage (12a)
const alla = typ => Object.fromEntries(Object.keys(DANS).map(n => [n, DANS_ROR[typ](SIGN[n])]));
// Lages signatur: stolt, stryker sig över manen (en arm upp längs huvudet två gånger)
const manen = t0 => { const k = (TID - t0) / 1.6; if (k < 0 || k > 1) return null;
  return { armar: [10, 100 * Math.sin(Math.PI * k) + 14 * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k)], luta: -3 }; };
// dansGolv({ namn: { u, po, dx, dfot, ds } | null }, zoom, humle): de tre på golvet, glada och lugnt gungande om inget annat sägs.
// humle = { x, fot, s } eller null (hon sitter i bågen från 11d).
function dansGolv(o = {}, z = 1, humle = {}) {
  disco({ s: TID - SANG0 });
  for (const [n, [x0, k]] of Object.entries(DANS)) {
    if (o[n] === null) continue;
    const d = o[n] || DANS_ROR.glad(SIGN[n]);
    let po = typeof d.po === 'string' ? { bas: d.po } : { ...(d.po || {}) };
    const eft = Math.sin(SLAGV(TID - 0.14) / 2);
    po.oron ??= [5 * eft, -5 * eft];
    if (n === 'lage') po.svans ??= 14 * Math.sin(SLAGV(TID) / 2 - 0.6);
    const bob = d.T ? 0 : 5 * (1 - Math.cos(SLAGV(TID + SIGN[n]))) / 2;
    const u = d.u || cykel(n, ['glad', 'jatteglad', 'glad', 'fnissig', 'jatteglad', 'nyfiken'], 2.4 * Object.keys(DANS).indexOf(n));
    visa(n, { lager: d.lager || (n === 'lage' ? 'lage-ute' : 'figurer'), x: x0 + (d.dx || 0), fot: DGOLV + (d.dfot || 0) - bob, s: k + (d.ds || 0), u, po, svans: n === 'lage' });
    if (d.T) klappGnista(...iFigur(n, x0, DGOLV, k, [512, FIG[n].L.RIGG['arm-l'][1] + 15]), d);
  }
  if (humle) visa('humle', { lager: 'framfor', x: HUMLE_KULA[0] + 60 * Math.sin(TID * 1.3), fot: HUMLE_KULA[1] + 24 * Math.sin(TID * 2.6), s: 0.2, ...humleLiv(0, 1.4), skugga: false, ...humle });
  kamera(z, 960, z > 1 ? 620 : 540);
}
// 09b efter molnen: discot tänds, helikoptern landar, Kanel och Hugo vinkar, Lage hoppar ut till sin plats, helikoptern lyfter
const LAND_D = { x: 560, botten: 1012, s: 0.5 }, UT0 = 158.9, UT1 = UT0 + 0.8;
function discoGolv(t) {
  disco({ s: t - SANG0, tand: fas(t, 156.4, 157.4) });
  const ner = ease((t - 155.5) / 2.3), bort = ease((t - 160.0) / 1.4);
  const H = { ...LAND_D, x: LAND_D.x + 900 * bort, botten: lerp(380, LAND_D.botten, ner) - 700 * bort };
  const lucka = fas(t, UT0 - 0.4, UT0) * (1 - fas(t, UT1 + 0.05, UT1 + 0.4));
  heli({ ...H, rot: -3 * bort, lucka, lage: t < UT0 ? ['jatteglad', { armar: [30, 30] }] : null });
  const v = i => ({ u: 'jatteglad', po: { armar: [0, vink(157.6 + 0.25 * i, 3)] } });
  for (const [n, i] of [['hugo', 0], ['kanel', 1]]) visa(n, { lager: 'framfor', x: DANS[n][0], fot: DGOLV, s: DANS[n][1], ...v(i) });   // framför helikoptern
  if (t >= UT0 && t < UT1) lageHoppa((t - UT0) / (UT1 - UT0), H, { x: DANS.lage[0], fot: DGOLV, s: DANS.lage[1] }, hopp(t, [UT0], 0, UT1 - UT0).po, 1800);
  else if (t >= UT1) visa('lage', { lager: 'lage-ute', x: DANS.lage[0], fot: DGOLV, s: DANS.lage[1], u: 'jatteglad', po: { armar: [20, 20] }, svans: true });
  if (t > 156.6) visa('humle', { lager: 'framfor', x: lerp(-200, HUMLE_KULA[0], ease((t - 156.6) / 1.6)), fot: HUMLE_KULA[1] + 16 * Math.sin(t * 2.6), s: 0.2, ...humleLiv(0, 1.4), skugga: false });
}
// Klappen i takt (riggens klappa, träffar på T 1,0, 1,5, 2,0): en klapp per slag i raden
const klappSlag = (a, b) => { const b0 = slag(a, a + 2)[0]; return [b0, b0 + 2 * BEAT * Math.max(1, Math.floor((b - b0) / (2 * BEAT)))]; };
const klappT = (t, b0, b1) => { const x = (t - b0) / BEAT * 0.5;
  return t < b0 ? Math.max(0, 1 + x) : t < b1 ? 1 + ((x % 1) + 1) % 1 : Math.min(2.999, 2 + (t - b1) / BEAT * 0.5); };
function klappRad(n, d) {
  const [b0, b1] = klappSlag(BILD0 + 0.3, BILD0 + d - 0.4), T = klappT(TID, b0, b1), [f, p] = FIG[n].L.ROR.klappa(T);
  return { u: { ...f, armar: FIG[n].L.NEUTRAL.armar }, po: p, T };
}
function klappGnista(x, y, kl, sk = 1) {
  const T = kl.T; if (T < 1 || T > 2.25) return; const g = ((T - 1) % 0.5) / 0.22; if (g >= 1) return;
  const r0 = (36 + 50 * g) * sk, r1 = r0 + 44 * Math.sin(Math.PI * Math.min(1, 1.5 * g)) * sk, op = (1 - g * g).toFixed(2);
  const streck = [-160, -130, -50, -20].map(a => { const v = a * Math.PI / 180;
    return `M${(x + r0 * Math.cos(v)).toFixed(1)} ${(y + r0 * Math.sin(v)).toFixed(1)}L${(x + r1 * Math.cos(v)).toFixed(1)} ${(y + r1 * Math.sin(v)).toFixed(1)}`; }).join('');
  pynt(`<g opacity="${op}" stroke-linecap="round" fill="none"><path d="${streck}" stroke="#fff" stroke-width="${(18 * sk).toFixed(1)}"/><path d="${streck}" stroke="#F2C94C" stroke-width="${(10 * sk).toFixed(1)}"/></g>`);
}
// Bågen runt kulan: helikoptern, solen, bananen, humlan, smörblomman (frågelekens ordning)
const SLOT = { heli: [419, 200], sol: [625, 300], banan: [960, 345], humle: [1295, 300], blomma: [1501, 200] }, MITT = [960, 360], ALLA_KLISTER = Object.keys(SLOT);
function klistren(redan, ny, s, d, lager = 'pynt') {
  for (const n of redan) klistermarke(...SLOT[n], 100, n, 1, lager);
  if (!ny) return;
  const in_ = pop(s / 0.45), ut = ease((s - (d - 0.75)) / 0.65), [x, y] = [lerp(MITT[0], SLOT[ny][0], ut), lerp(MITT[1], SLOT[ny][1], ut)];
  klistermarke(x, y, lerp(180, 100, ut), ny, in_);
  if (ut < 0.2) glitter(MITT[0], MITT[1], 200, s - 0.3, 6);
}

// Zoom in genom ett hål i papperet (22,4–24,2): papperet och bananen ligger i #ram (skärmens koordinater) med ett växande hål med
// vaxig kant, och skalas upp mot hålet. Anropas från kritan-ritar (före 23,4) och 02a.
const HAL = [1050, 640], BANAN_PAPPER = [960, 830, 560, -8];
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
// kritan-ritar ritar ängen under hålet från 22,4 (samma bild som 02a)
window.angenUnderHal = () => { const b = BILD; BILD = '02a'; ANIM['02a'](0, TID - 23.4); BILD = b; };

// --- Dekalen i hörnet: rörelsen just nu (013:s och 005:s rörelsesymbol) ------------------------------------------------------
// Slås upp när raden börjar, dras av med en vickning när den slutar. Ingen text, inga pilar.
// Sanna 2026-11-10 ("stickers for words in right corner and dance moves for dance scene, same style as red song"): rörelsen i
// discots två varv (inte i refrängerna), och den gula saken som sjungs i övre högra hörnet. Samma skiva, plats, storlek, uppslag
// och avdragning som 013. Ingen text, som i 013.
const ROR_RAD = { '10a': 'noter', '10b': 'upp', '10c': 'klappa', '10d': 'gunga', '10e': 'kittla', '10f': 'noter',
  '10g': 'upp', '10h': 'klappa', '10i': 'gunga', '10j': 'kittla', '10k': 'hurra' };
// ordet: [sak, andel av raden där ordet sjungs (uppskattat)]; slås upp på ordet och dras av när raden slutar
const ORD_RAD = { '02d': ['heli', 0.4], '02e': ['sol', 0.3], '04d': ['banan', 0.4], '07d': ['banan', 0.4], '05c': ['humle', 0.25],
  '05e': ['blomma', 0.2], '08b': ['svans', 0.35] };
const ordTid = id => lerp(...ANIM.TIDER[id], ORD_RAD[id][1]);
function ordSticker(t, id) {
  const a = ordTid(id), b = ANIM.TIDER[id][1];
  if (t < a - SYM_FALL || t >= b) return;
  let { dy, rot, sx, sy } = slagUpp(t - a), skala = 1;
  if (t > b - 0.2) { const k = (b - t) / 0.2; skala = ease(k); rot += 10 * Math.sin((1 - k) * 9); }
  klistermarke(SYMX, SYMY + dy, SYMR, ORD_RAD[id][0], skala, 'ram', { rot, sx, sy });
}
// Andra dansvarvet (10g–10k): kameran åker lugnt längs raden
// varv 1 (10c–10e): kameran går in till den som gör rörelsen och ut till helbild med alla tre före nästa rad
const nara = (n, s, d) => { const k = fas(s, 0, 0.7) * (1 - fas(s, d - 0.8, d - 0.1)); kamera(lerp(1, 1.35, k), lerp(960, DANS[n][0], k), lerp(540, 690, k)); };
// varv 2 (10g–10j): åker från Lage till Hugo längs hela raden; helbild igen på "Hurra!" (10k)
const VARV2 = () => { const [a] = ANIM.TIDER['10g'], [b] = ANIM.TIDER['10k'], k = ease((TID - a) / (b - a)), z = 1 + 0.18 * fas(TID, a, a + 0.8) * (1 - fas(TID, b - 0.6, b + 0.2));
  kamera(z, lerp(700, 1220, k), 540 + 80 * (z - 1) / 0.18); };
// Frågeleken (11a–11e): kameran är nära klistermärket i mitten och drar sig ut när det flyger upp i bågen
// (in på 0,4 s, ute i helbild igen efter 1,6 s, så att svaret, kulan, Humle och alla tre syns när märket flyger upp i bågen)
const FRAGA = (s, d) => kamera(1 + 0.2 * fas(s, 0, 0.4) * (1 - fas(s, 1.0, 1.6)), 960, 420);
const SYMX = 1735, SYMY = 150, SYMR = 104, SYM_FALL = 0.18, BRUN = '#8A5A3B', SYMGUL = '#E2A400';
function slagUpp(q) {
  let dy = 0, rot = 0, sx = 1, sy = 1;
  if (q < 0) { const k = kl01(1 + q / SYM_FALL); dy = -46 * (1 - k * k); rot += 10 * (1 - k); sx = sy = 1.15 - 0.15 * k; }
  else { const e = Math.exp(-q * 9) * Math.cos(q * 28); sx = 1 + 0.1 * e; sy = 1 - 0.1 * e; rot += 4 * Math.exp(-q * 6) * Math.sin(q * 26); }
  return { dy, rot, sx, sy };
}
const tass = (x, y, rx, ry, rot = 0) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})">
  <ellipse rx="${rx}" ry="${ry}" fill="${BRUN}" stroke="#fff" stroke-width="5"/><ellipse cy="${(ry * 0.25).toFixed(1)}" rx="${(rx * 0.45).toFixed(1)}" ry="${(ry * 0.32).toFixed(1)}" fill="#E9B9A4"/>
  ${[-0.5, 0, 0.5].map(k => `<circle cx="${(k * rx * 0.9).toFixed(1)}" cy="${(-ry * 0.42 + Math.abs(k) * ry * 0.12).toFixed(1)}" r="${(rx * 0.17).toFixed(1)}" fill="#E9B9A4"/>`).join('')}</g>`;
const symNot = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" fill="${SYMGUL}" stroke="${SYMGUL}" stroke-width="7" stroke-linecap="round">
  <ellipse cx="0" cy="0" rx="14" ry="10" transform="rotate(-22)" stroke="none"/><path d="M12 -4V-64" fill="none"/><path d="M12 -64Q16 -48 34 -42" fill="none"/></g>`;
// en liten gul kropp (gunga, krama, kittla): v = lutning, glad = ^-ögon och öppen mun
const kroppen = (v, glad = false, inne = '') => `<path d="M-50 44H50" stroke="${BRUN}" stroke-width="7" stroke-linecap="round"/>
  <g transform="rotate(${v.toFixed(1)} 0 42)"><ellipse cy="4" rx="27" ry="36" fill="${SYMGUL}" stroke="#fff" stroke-width="5"/>
  ${glad ? `<path d="M-15 -4Q-9 -13 -3 -4M3 -4Q9 -13 15 -4" fill="none" stroke="#2a1d1a" stroke-width="3.5" stroke-linecap="round"/><ellipse cy="9" rx="7" ry="6" fill="#7a2a1c"/>`
    : `<circle cx="-9" cy="-6" r="4" fill="#2a1d1a"/><circle cx="9" cy="-6" r="4" fill="#2a1d1a"/><path d="M-8 8Q0 15 8 8" fill="none" stroke="#2a1d1a" stroke-width="3.5" stroke-linecap="round"/>`}${inne}</g>`;
function symbolMotiv(typ, t) {
  const n = Math.floor((t - SANG0) / BEAT), q = t - (SANG0 + n * BEAT), qn = t - (SANG0 + (n + 1) * BEAT), p = q / BEAT;
  if (typ === 'klappa') { const isar = q < 0.12 ? 0 : qn > -0.18 ? -qn / 0.18 : 1, gap = 8 + 30 * ease(isar);
    return tass(-gap - 14, 0, 20, 30, 12) + tass(gap + 14, 0, 20, 30, -12); }
  if (typ === 'upp') { const w = 12 * Math.sin(Math.PI * (t - SANG0) / BEAT);
    return tass(-26, -6, 18, 26, -14 + w) + tass(26, -6, 18, 26, 14 + w) + `<path d="M-40 46H40" stroke="${BRUN}" stroke-width="6" stroke-linecap="round"/>`; }
  if (typ === 'cirkel') { const v = 2 * Math.PI * (t - SANG0) / (2 * BEAT);
    const prickar = Array.from({ length: 12 }, (_, i) => { const g = i * Math.PI / 6; return `<circle cx="${(40 * Math.cos(g)).toFixed(1)}" cy="${(40 * Math.sin(g)).toFixed(1)}" r="4.5" fill="#C9A15A"/>`; }).join('');
    return prickar + tass(40 * Math.cos(v), 40 * Math.sin(v), 16, 22, v * 180 / Math.PI + 90); }
  if (typ === 'vinka') { const v = 22 * Math.sin(2 * Math.PI * (t - SANG0) / (2 * BEAT));   // en tass som vinkar från handleden
    return `<path d="M-40 46H40" stroke="${BRUN}" stroke-width="6" stroke-linecap="round"/><g transform="rotate(${v.toFixed(1)} 0 40)">${tass(0, -2, 22, 32, 0)}</g>`; }
  if (typ === 'mums') { const b = ((t - SANG0) / (2 * BEAT)) % 1, tugga = b > 0.5;   // en banan som får ett bett varannan takt
    return `<g transform="rotate(${(6 * Math.sin(Math.PI * (t - SANG0) / BEAT)).toFixed(1)} 0 40)">${bananSvg(0, 52, 110, -18)}
      ${tugga ? `<circle cx="22" cy="-44" r="20" fill="#FFF3C4"/><circle cx="6" cy="-50" r="14" fill="#FFF3C4"/>` : ''}</g>`; }
  if (typ === 'gunga') { const v = (n % 2 ? 1 : -1) * 20 * Math.cos(Math.PI * Math.min(1, p)); return kroppen(v); }
  if (typ === 'krama') { const v = 12 * Math.sin(Math.PI * (t - SANG0) / (2 * BEAT));   // armarna i kors över magen, gungar
    return kroppen(v, true, tass(-8, 14, 9, 15, 60) + tass(8, 14, 9, 15, -60)); }
  if (typ === 'kittla') { const j = 4 * Math.sin((t - SANG0) * 14);                        // tassarna kittlar magen
    return kroppen(3 * Math.sin((t - SANG0) * 7), true, tass(-14 + j, 20, 8, 12, 20) + tass(14 - j, 20, 8, 12, -20)); }
  if (typ === 'hurra') { const v = 10 * Math.sin(Math.PI * (t - SANG0) / BEAT);            // båda tassarna högt upp, glad
    return kroppen(3 * Math.sin(Math.PI * (t - SANG0) / BEAT), true) + tass(-40, -40, 15, 22, -30 + v) + tass(40, -40, 15, 22, 30 - v); }
  const g = Math.sin(Math.PI * (t - SANG0) / BEAT);
  return symNot(-22, 30 - 6 * g, 0.85) + symNot(26, 22 + 6 * g, 0.7);
}
function rorSticker(t, a, b, typ) {
  if (t < a - SYM_FALL || t >= b) return;
  let { dy, rot, sx, sy } = slagUpp(t - a), skala = 1;
  if (t > b - 0.2) { const k = (b - t) / 0.2; skala = ease(k); rot += 10 * Math.sin((1 - k) * 9); }
  lagg('ram', `<g transform="translate(${SYMX} ${SYMY + dy}) rotate(${rot.toFixed(2)}) scale(${skala.toFixed(3)}) translate(0 ${SYMR}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(0 ${-SYMR})">
    <circle cx="5" cy="9" r="${SYMR}" fill="#5a3c00" opacity="0.25" filter="url(#dekalskugga)"/>
    <circle r="${SYMR}" fill="#fff" filter="url(#ikonkant)"/><circle r="${SYMR - 14}" fill="#FFF3C4"/>
    <g filter="url(#kritkorn)" transform="scale(1.3)">${symbolMotiv(typ, t)}</g></g>`);
}

// --- Ljudet ---------------------------------------------------------------------------------------------------------------
// [namn eller lista med namn (det första som finns används), tid (avsnittstid), vol, { langd, loop, fade, fadeIn }]. Under sången
// ligger effekterna lågt (ca −8 dB under sången), i pauser och ekon.
const EFFEKTER_FILM = () => [
  [['tass-1'], 42.2, 0.4, {}], [['helikopter-start-1'], 42.8, 0.3, { langd: 3.0, fade: 1.2 }],          // 02d: hoppar in, rotorn startar
  [['helikopter-surr-1'], 44.0, 0.11, { loop: true, langd: 38.6, fadeIn: 1.0, fade: 1.8 }],              // himlen och solen (vers1)
  [['glitter-1'], 38.6, 0.22, { langd: 1.2 }],                                                           // 02c: helikoptern glimmar
  [['moln-puff-1'], ANIM.TIDER['04d'][0] + 0.2, 0.25, { langd: 1.2 }], [['moln-puff-2'], ANIM.TIDER['07d'][0] + 0.2, 0.25, { langd: 1.2 }],
  ...['04d', '07d'].flatMap(id => eko(id).map((t, i) => [['mums-' + (i + 1)], t + 0.08, 0.35, {}])),     // en tugga per "mums"
  [['glitter-2'], 76.4, 0.22, { langd: 1.4 }], [['glitter-3'], 124.5, 0.22, { langd: 1.4 }],            // floden glittrar
  [['landa-mjuk-1'], 83.4, 0.4, {}], [['helikopter-stannar-1'], 82.6, 0.3, { langd: 2.4, fade: 0.8 }],   // 05a: landar, motorn stannar
  [['surr-1'], 83.2, 0.1, { langd: 3.9, fade: 1, fadeIn: 1.2 }], [['surr-2'], 87.1, 0.22, { langd: 2.0, fade: 0.6 }],   // humlan långt borta, kommer in
  ...eko('05c').map((t, i) => [['surr-' + (i + 3)], t, 0.2, { langd: 0.8 }]),
  [['glitter-4'], 95.0, 0.25, { langd: 1.2 }], [['glitter-1'], 99.2, 0.2, { langd: 1.2 }],              // smörblomman, hakan
  [['tass-2'], 84.5, 0.35, {}], [['tass-3'], 101.5, 0.35, {}], [['tass-1'], 146.2, 0.35, {}],          // Lage hoppar ut / in
  [['helikopter-start-2'], 101.3, 0.25, { langd: 2.4, fade: 1.0 }],
  [['helikopter-surr-2'], 102.2, 0.11, { loop: true, langd: 26.6, fadeIn: 1.0, fade: 1.5 }],             // vers2: från starten
  [['helikopter-stannar-1'], 128.0, 0.25, { langd: 2.0, fade: 0.8 }],                                     // vers 3 på ängen
  [['helikopter-start-1'], 146.4, 0.25, { langd: 2.4, fade: 1.0 }],
  [['helikopter-surr-3'], 147.4, 0.1, { loop: true, langd: 11.6, fadeIn: 0.8, fade: 2.0 }],              // mellanspelet till discot
  [['ryt-gasp-1'], 133.0, 0.4, { langd: 2.4, fade: 0.6 }], [['glitter-2'], 132.8, 0.3, { langd: 1.2 }],   // 08b: svansen!
  ...eko('08c').map((t, i) => [['svansvift-' + (i + 1)], t, 0.35, {}]),
  [['moln-puff-3'], 153.6, 0.25, { langd: 1.4 }], [['moln-puff-4'], 155.3, 0.25, { langd: 1.4 }],        // 09b: molnen
  [['glitter-3'], 156.6, 0.3, { langd: 1.4 }], [['landa-mjuk-2'], 157.8, 0.4, {}], [['tass-2'], UT1, 0.4, {}],   // kulan tänds, landar, Lage ute
  ...[192.4, 194.8, 197.2, 199.6 + 0.9, 201.9].map((t, i) => [['klistra-' + (i % 2 + 1), 'pop-1'], t + 1.6, 0.3, {}]),   // klistermärkena sätts fast
  ...Object.keys(ORD_RAD).map((id, i) => [['klistra-' + (i % 2 + 1), 'pop-1'], ordTid(id), 0.3, {}]),     // ordet i hörnet
  ...Object.keys(ROR_RAD).filter(id => ROR_RAD[id] !== 'klappa').map((id, i) => [['klistra-' + (i % 2 + 1), 'pop-1'], ANIM.TIDER[id][0], 0.2, {}]),   // rörelsen (svagt, som 013)
  [['ryt-gasp-1'], 205.2, 0.35, { langd: 0.8, fade: 0.35 }],                                             // 11f: Lages korta stolta ryt
  [['glitter-4'], 207.8, 0.25, { langd: 1.4 }],
  [['tass-3'], ANIM.TIDER['12a'][0] + 2.3, 0.4, {}],
  [['helikopter-surr-4'], ANIM.TIDER['12a'][0], 0.12, { loop: true, langd: 12.0, fadeIn: 0.6, fade: 3.0 }],   // slutet
];
async function tider() {
  const md = await (await fetch(SB + 'storyboard.md')).text(), rad = [];
  for (const m of md.matchAll(/^\| (\d\d[a-z]?) \| (\d+):(\d\d\.\d) \|/gm)) rad.push([m[1], +m[2] * 60 + +m[3]]);
  const T = {}; rad.forEach(([id, t], i) => T[id] = [t, i + 1 < rad.length ? rad[i + 1][1] : SLUT]); return T;
}
const finns = async fil => fil.startsWith('../') || (await fetch('/' + fil, { method: 'HEAD' })).ok;
const effektFil = n => n.startsWith('../') ? n : `assets/ljud/effekter/${n.replace(/-\d+$/, '')}/${n}.m4a`;

const FORLADDA = `<g opacity="0.002">${[HIMMEL, ANGEN, JATTESOL, DISCO, BANAN, BLOMMA, ...Object.values(MOLN)].map(f => `<image href="${f}" width="64" height="64"/>`).join('')}</g>`;
window.ready = (async () => {
  await laddaFigurer(window.FIGURER || ['lage', 'kanel', 'hugo', 'humle', 'humle2']);
  const T = ANIM.TIDER = await tider(), [forsta, sista] = window.SCEN, A0 = T[forsta][0], A1 = T[sista][1];
  EKO = Object.keys(EKO_RAD).filter(id => T[id]).flatMap(id => eko(id));
  window.DURATION = A1 - A0;
  if (A0 >= SANG0) window.SANG = [A0 - SANG0, A1 - SANG0];
  const ljud = [];
  for (const [fil, t] of window.ROSTER || []) if (t >= A0 && t < A1 && await finns(fil)) ljud.push({ fil, t: t - A0, vol: 2.5, langd: 4 });
  for (const [namn, t, vol, o = {}] of EFFEKTER_FILM()) {
    if (t < A0 || t >= A1) continue;
    for (const n of namn) { const fil = effektFil(n); if (await finns(fil)) { ljud.push({ fil, t: t - A0, vol, ...o, langd: Math.min(o.langd ?? 99, A1 - t) }); break; } }
  }
  window.LJUD = ljud;
  const ids = Object.keys(T).filter(id => T[id][0] >= A0 && T[id][0] < A1);
  window.seek = t => {
    TID = A0 + t;
    const id = ids.findLast(i => T[i][0] <= TID) || ids[0], [a, b] = T[id];
    for (const l of ['bakom', 'framfor', 'pynt', 'ram', 'platta']) $(l).innerHTML = '';
    gom(); kamera(1);
    lagg('ram', FORLADDA);   // osynliga kopior, så att en bild som syns första gången i scenen redan är avkodad
    BILD = id; BILD0 = a;
    ANIM[id]((TID - a) / (b - a), TID - a, b - a);
    if (ROR_RAD[id]) rorSticker(TID, a, b, ROR_RAD[id]);
    if (ORD_RAD[id]) ordSticker(TID, id);
    if (/^10[g-j]$/.test(id)) VARV2();
    if (/^11[a-e]$/.test(id)) FRAGA(TID - a, b - a);
    for (const c of MOLNPASS) molnPassage(c);
    for (const [c, farg] of SVEP) if (Math.abs(TID - c) < SV) kritsvep(0.5 + (TID - c) / (2 * SV), farg);
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);   // kritkanten kokar sex gånger i sekunden
    window.kant?.uppdatera();
  };
  await new Promise(r => setTimeout(r, 1500));   // urklippen hinner laddas
  window.seek(0);
  return true;
})();
