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
// figur-QA 2026-11-11: ögonformen tonas aldrig (två par ögon syntes samtidigt 1:15). Allt annat blandas, men ögonen (form, ^-båge,
// lock) byter vid k 0,5 bakom en blinkning: locken stängs runt bytet (k 0,3–0,7)
const U = (namn, a, b, k) => { const L = FIG[namn].L, m = L.blanda(a, b, k); if (k <= 0 || k >= 1) return m;
  const e = L.blanda(a, b, k < 0.5 ? 0 : 1), bl = Math.max(0, 1 - Math.abs(k - 0.5) / 0.2), r = { ...m, ogonS: e.ogonS, glad: e.glad };
  r.lock = (e.lock || [0, 0]).map(v => Math.max(v, Math.min(1, 1.6 * bl))); return r; };
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

// Lages glada skutt (polish 2026-11-11, "more personality"): små, låga, lugna hopp när han blir glad. visa() lägger på dem.
// 02c ser helikoptern, 04d/07d får bananen, 04e/07e "Nu blir du glad!", 08b/08c hittar svansen, 10k "Hurra!"
const GLADHOPP = [39.95, 72.2, 74.35, 75.55, 120.5, 122.8, 124.0, 135.0, 144.1, 190.3];
window.lageHopp = () => hopp(TID, GLADHOPP.filter(t => TID > t - 0.2 && TID < t + 0.7), 55, 0.42);
// Svansen (Sanna 2026-11-11 "improve the animation of lion tail"): läggs på svansvinkeln i scen-kit visa() (window.lageSvans).
// Lugn vägning ±4° i kroppens takt men en knapp sekund efter; i skuttens luft släpar den (ner när han stiger, upp när han faller)
// och efter landningen följer den igenom och lägger sig. Ledsen efter fallet: hänger ner och ligger still; glad igen: lyfter.
// Vinkel + = ner, − = upp. Inga byten på en ruta: allt är mjuka kurvor i TID.
const svansEfter = t => GLADHOPP.reduce((e, t0) => { const k = t - t0;
  if (k >= 0 && k < 0.42) return e + 9 * Math.sin(2 * Math.PI * k / 0.42);
  if (k >= 0.42 && k < 1.6) return e + 8 * Math.sin(2 * Math.PI * (k - 0.42) / 0.6) * Math.exp(-3.5 * (k - 0.42)) * (1 - fas(k, 1.3, 1.6));
  return e; }, 0);
window.lageSvans = v => {
  const a = ANIM.TIDER['02a'][0] + SNUBBEL + 1.75, b = ANIM.TIDER['02c'][0] + 1.4;
  const ledsen = fas(TID, a, a + 0.8) * (1 - fas(TID, b, b + 1.1)), glad = fas(TID, b + 0.6, b + 1.3) * (1 - fas(TID, b + 3.5, b + 4.5));
  return lerp(v + 4 * Math.sin(TID * 0.85 + 0.1) + svansEfter(TID), 30, ledsen) - 12 * glad;
};

// --- Ekoorden -------------------------------------------------------------------------------------------------------------
// Munnen öppnas på ekoordet (snurr, hej, mums, ha-ha, surr, vifta), ingen läppsynk. Tiderna är uppskattade ur radernas tider i
// rader-v5.txt och takten (100 bpm), inte uppmätta: [andel av raden där ekot börjar, antal, avstånd s]. Justera här.
// QA 2026-11-11: uppmätta i sang-v5.m4a (whisper -ml 1 -sow, två fönster per rad med texten som prompt, medel), ca ±0,2 s
const EKO_RAD = { '02d': [0.883, 2, 0.57], '02e': [0.697, 2, 0.95], '04b': [0.717, 2, 0.62], '04c': [0.817, 2, 0.52], '04d': [0.703, 2, 0.7],
  '04f': [0.89, 2, 0.3], '05c': [0.75, 2, 0.55], '07b': [0.675, 2, 0.62], '07c': [0.6875, 2, 0.52], '07d': [0.662, 2, 0.7],
  '07f': [0.8875, 2, 0.3], '08c': [0.4, 2, 0.9], '10e': [0.36, 2, 0.3], '10j': [0.8125, 2, 0.3] };
const eko = (id = BILD) => { const [a, b] = ANIM.TIDER[id], [f, n, d = 0.6] = EKO_RAD[id]; return Array.from({ length: n }, (_, i) => lerp(a, b, f) + i * d); };
let EKO = [];
window.munOppen = () => EKO.some(t => TID > t - 0.06 && TID < t + 0.32);
// "Upp, upp, upp! (Upp!)" (03b): uppmätta i sang-v5.m4a (röstbandets anslag, sångtid 32,00 / 32,44 / 32,88 / ekot 33,45) + 23,4
const UPP = [55.40, 55.84, 56.28, 56.85];
// snubblet i 02a (scenens s): foten fastnar, plums på rumpan
const SNUBBEL = 5.2, PLOPP = 5.95;
// ledsna ansiktet efter fallet: brynen upp i mitten, munnen nedåt och läppen darrar (darr 0–1)
// QA2 0:30,5: byt mun i två steg (den gamla tonas ut helt innan den nya kommer), så att två munnar aldrig syns samtidigt
const munByte = (n, a, b, k) => { const L = FIG[n].L, A = typeof a === 'string' ? L.blanda(a, a, 1) : a, B = typeof b === 'string' ? L.blanda(b, b, 1) : b,
  f = L.blanda(A, B, k), h1 = 1 - fas(k, 0, 0.5), h2 = fas(k, 0.5, 1);
  return { ...f, mun: [A.mun[0] * h1 + B.mun[0] * h2, A.mun[1] * h1 + B.mun[1] * h2, f.mun[2], f.mun[3]], streck: A.streck * h1 + B.streck * h2 }; };
const ledsenAnsikte = (k, darr, s) => { const f = munByte('lage', 'forvanad', 'ledsen', k), w = Math.sin(2 * Math.PI * 6.5 * s) * darr;
  return { ...f, brynV: f.brynV + 10 * k, brynY: [f.brynY[0] - 5 * k, f.brynY[1] - 5 * k], le: f.le - 0.15 * k + 0.22 * w, leBred: f.leBred + 0.08 * w, titt: [-4 * k, 10 * k] }; };
// Tåren (Sanna 2026-11-11, bara i 011:s sida, Lage är låst): en ljusblå droppe med vit kant växer fram vid högra ögats nedre lock,
// rinner ner över kinden och bleknar. Ritas i ansiktsgruppen (.drag) så att den följer ansiktet. [växer, rinner, rinner klart, borta]
const TAR = [31.35, 31.75, 34.5, 35.1];   // figur-QA: tåren hålls kvar till ca 0:35
function taren(g) {
  let e = g.querySelector('.tar');
  if (!e) { e = document.createElementNS(NS, 'g'); e.setAttribute('class', 'tar'); g.querySelector('.drag').appendChild(e); }
  if (!(TID > TAR[0] && TID < TAR[3] && /^02[ab]$/.test(BILD))) { e.innerHTML = ''; return; }
  const r = 20 * ease((TID - TAR[0]) / 0.4), q = ease((TID - TAR[1]) / (TAR[2] - TAR[1])), op = 1 - fas(TID, TAR[2] - 0.15, TAR[3]);
  const x = 606 + 10 * q, y = 437 + r + 100 * q, l = 1.7 + 0.5 * Math.sin(Math.PI * q);   // lite längre medan den rinner
  e.innerHTML = `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" opacity="${op.toFixed(3)}">
    <path d="M0 ${(-l * r).toFixed(1)} C${(0.45 * r).toFixed(1)} ${(-0.9 * r).toFixed(1)} ${r.toFixed(1)} ${(-0.25 * r).toFixed(1)} ${r.toFixed(1)} ${(0.3 * r).toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 1 1 ${(-r).toFixed(1)} ${(0.3 * r).toFixed(1)} C${(-r).toFixed(1)} ${(-0.25 * r).toFixed(1)} ${(-0.45 * r).toFixed(1)} ${(-0.9 * r).toFixed(1)} 0 ${(-l * r).toFixed(1)}Z" fill="#9ED3F0" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="${(-0.35 * r).toFixed(1)}" cy="${(0.15 * r).toFixed(1)}" rx="${(0.22 * r).toFixed(1)}" ry="${(0.32 * r).toFixed(1)}" fill="#fff" opacity="0.85"/></g>`;
}
// QA2 0:28,8: svansens rot slutar utanför kroppen i den låsta riggen och syns som en stump i gången; i 011 flyttas svansen en bit in under kroppen
const svansIn = g => { const el = [...g.querySelectorAll('image')].find(i => (i.getAttribute('href') || '').endsWith('lage-tail.png'));
  if (!el || el.parentNode.getAttribute('class') === 'svansflytt') return;
  const w = document.createElementNS('http://www.w3.org/2000/svg', 'g'); w.setAttribute('class', 'svansflytt'); w.setAttribute('transform', 'translate(-26 -24)');
  el.parentNode.insertBefore(w, el); w.appendChild(el); };
{ const v0 = visa; visa = (n, o) => { const g = v0(n, o); if (n === 'lage') { taren(g); svansIn(g); } return g; }; }
// stenen han snubblar på (Sanna 2026-11-11 "add stone for lion to trip on", ersätter smörblomstuvan): liten, grå och rund, halvt i
// gräset med några strån framför, vid vänsterfoten. Den vickar lite (v) när foten tar i. Kopia av skogens sten, tunn_kant 9 (vita-kanter).
const STEN = bildfil(BILDER + 'sten-011.png', 430 / 300), STEN_P = [1218, 1022, 58];   // x, botten (UTE.fot + 12), höjd
const STEN_STRA = (() => { const [x, y] = STEN_P; return [[-34, -14, 30], [-22, 6, 24], [18, -6, 26], [30, 14, 22], [-4, 10, 18]].map(([dx, a, l]) => {
  const v = a * Math.PI / 180; return `M${x + dx} ${y + 2} q${(Math.sin(v) * l * 0.4).toFixed(1)} ${(-l * 0.6).toFixed(1)} ${(Math.sin(v) * l).toFixed(1)} ${(-Math.cos(v) * l).toFixed(1)}`; }).join(' '); })();
const tuva = v => { const [x, y, h] = STEN_P;
  sak('pynt', STEN, x, y, h, `rotate(${(0.35 * v).toFixed(2)} ${x} ${y})`);
  lagg('pynt', `<path d="${STEN_STRA}" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none"/><path d="${STEN_STRA}" stroke="#7FAE5A" stroke-width="4" stroke-linecap="round" fill="none"/>`); };
// ett tydligt steg per ord: lyfter på ordet, går lite över och sätter sig (pop), 0,4 s
const stegUpp = () => UPP.reduce((a, t0) => a + pop((TID - t0 + 0.04) / 0.4), 0);

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
const LAGE_TOFS = v => { const a = v * Math.PI / 180, k = window.SVANS_S || 1, dx = 167 * k, dy = -123 * k;
  return iFigur('lage', UTE.x, UTE.fot, UTE.s, [713 + dx * Math.cos(a) - dy * Math.sin(a), 773 + dx * Math.sin(a) + dy * Math.cos(a)]); };
const TOFS_UPP = -20, TOFS_NER = -85;                            // svansvinkel: tofsen uppe bland blommorna / gömd bakom kroppen
// smörblommor framför Lages svans (vers 3): tofsen sticker upp bland dem
// Svansen i tittuten (polish 2026-11-11: "make the yellow tail clearer"): 35 % större svans (SVANS_S, kit) i 08a–08c, mjukt tillbaka i 09a,
// och en mörkgrön skugga i gräset bakom tofsen så att den gula tofsen syns mot de gula blommorna
const svansS = t => 1 + 0.35 * (t >= 128.4 ? 1 : 0) * (1 - fas(t, 145.0, 145.8));
const tofsSkugga = (v, op = 1) => { const [tx, ty] = LAGE_TOFS(v);
  lagg('bakom', `<ellipse cx="${tx.toFixed(1)}" cy="${(ty + 14).toFixed(1)}" rx="62" ry="54" fill="#2f6a2e" opacity="${(0.42 * op).toFixed(3)}" filter="url(#mjuk)"/>`); };
const tuvor = () => { const ss = (TID - SANG0) / BEAT, svans = /^08[a-c]$/.test(BILD);
  // i tittuten (08a–08c) står blommorna bakom svansen och längre åt höger, så att de aldrig skymmer den (Sanna 2026-11-11)
  [[UTE.x + 95, 78, 0], [UTE.x + 165, 62, 2], [UTE.x + 235, 84, 1], [UTE.x + 40, 56, 2]].forEach(([x, h, i], j) => {
    x += svans ? 420 : 0; const y = UTE.fot + 14, v = 8 * Math.sin(Math.PI * ss / 2 + j * 0.8); sak(svans ? 'bakom' : 'pynt', BLOMMOR[i], x, y, h, `rotate(${v.toFixed(2)} ${x} ${y})`); });
  // tittuten (granskningen 2026-11-10): en högre tuva precis framför tofsen, så att tofsen kikar upp bakom blommorna och gömmer sig där
  if (false) { const [tx, ty] = LAGE_TOFS(TOFS_UPP), y = UTE.fot + 14;   // tittutens höga tuva borttagen (Sanna 2026-11-11: blommorna skymde svansen)
    [[tx - 30, 0, 0], [tx + 28, 1, 10], [tx + 2, 0, -14]].forEach(([x, i, dh], j) => { const h = y - ty - 60 + dh, v = 3 * Math.sin(Math.PI * ss / 2 + j * 1.1);
      sak('bakom', BLOMMOR[i], x, y, h, `rotate(${v.toFixed(2)} ${x} ${y})`); }); } };   // bakom tofsen
// solen långt borta i himlen (vers 1): samma solfigur, växer när de stiger, men de kommer inte fram förrän i refrängen
const solFjarran = (dy = 0, mun = 0, fran = 0) => { const k = fas(TID, 44.4, 58.0);
  const x = lerp(lerp(1440, 1460, k), 1726, fran), y = lerp(lerp(215, 300, k), 165, fran) + dy, r = lerp(lerp(84, 150, k), 82, fran);
  // QA 2026-11-11: samma varma sken som jättesolen och över helikopterns ljusstrålar (de låg över solen och gjorde den blek)
  lagg('bakom', `<circle cx="${x}" cy="${y}" r="${(1.5 * r).toFixed(1)}" fill="#FFE07A" opacity="${(0.45 * (1 - fran)).toFixed(3)}" filter="url(#mjuk)"/>
    <circle cx="${x}" cy="${y}" r="${(2.6 * r).toFixed(1)}" fill="#FFF1B8" opacity="${(0.25 * (1 - fran)).toFixed(3)}" filter="url(#mjuk)"/>${solLiten(x, y, r, 'glad', mun)}`); };
// Molnpassagen (format/regler.md: molnövergången) i stället för de gula kritsvepen upp till solen (Sanna 2026-11-10: "avoid crayon
// transition 0.58"): helikoptern stiger genom molnen, molnen sluter sig över skarven och glider neråt och isär.
// [skarv, riktning]: +1 upp (molnen glider neråt förbi), −1 ner mot ängen (molnen glider uppåt). Sanna 2026-11-10: "use cloud transitions
// more instead of crayon": upp till himlen 0:44,4, upp till solen 0:58,1 och 1:47,2, ner till ängen 1:20,9 och 2:08,4, discot → solen 3:47,1.
// polish 2026-11-11: upp från ängen (0:44,4 och 1:43,6) är i stället en obruten uppstigning (stigning), inga moln där
const MOLNPASS = [[58.1, 1], [80.9, -1], [128.4, -1], [226.9, 1, 0.6, 1.0]];   // [skarv, riktning, halva längden]; den sista kort så att solen syns på "Hej då" (QA 3:47,3)
// QA 2026-11-10: två moln till över de övre hörnen, så att bytet inte syns i en remsa längs bildens överkant
const molnTopp = (k, dy = 0) => { sak('ram', MOLN.stort, lerp(-1000, 380, k), lerp(-850, 560, k) + dy, 1200); sak('ram', MOLN.stort, lerp(2900, 1540, k), lerp(-850, 580, k) + dy, 1200); };
function molnPassage([c, rikt, T = 1.0, Tut = T]) {
  const q = (TID - c) / (TID < c ? T : Tut); if (Math.abs(q) >= 1) return;
  const k = ease(Math.min(1, (1 - Math.abs(q)) / 0.7)), dy = 420 * q * rikt;
  { const yb = lerp(-500, 760, k) + dy; sak('ram', MOLN.langt, 960, yb, 1000, `translate(0 ${(2 * yb - 1000).toFixed(1)}) scale(1 -1)`); } molnTopp(k, dy);   // QA2 3:47,5: speglad, så att den rundade kanten är nedåt och den raka kanten aldrig syns
  sak('ram', MOLN.stort, lerp(-1100, 430, k), 1380 + dy, 1420); sak('ram', MOLN.stort, lerp(3000, 1490, k), 1400 + dy, 1420);
  sak('ram', MOLN.mellan, 960, lerp(2700, 1180, k) + dy, 1000);   // QA: helt utanför bild i båda ändar
}
const narbild = (P, z = 2.4, dy = 50) => { const [fx, fy] = P(LAGE_ANSIKTE); kamera(z, fx, fy + dy); };
const skugga = (x, y, rx, op = 0.14) => lagg('bakom', `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.09).toFixed(1)}" fill="#2d5a3a" opacity="${op.toFixed(3)}"/>`);
// vinkning: arm-vinkeln, n vinkningar om d s från t0, mjukt in och ut
// polish 2026-11-11 ("better wave"): armen bakom kroppen, snett ut förbi kanten (ca 58° upp från vila), en rund lugn svängning ±12°
// som tonas in och ut med armen, så att den varken rycker i början eller slutet
const vink = (t0, n = 2, d = 0.6, bas = 58) => { const e = fas(TID, t0 - 0.5, t0) * (1 - fas(TID, t0 + n * d, t0 + n * d + 0.5));
  return e * (bas + 12 * e * Math.sin(2 * Math.PI * (TID - t0) / d)); };
// figur-QA: vinkning i kupan – armen bakom kroppen, snett upp och ut förbi kupkanten (förut 50–70°, armen syntes inte)
const VINK_KUPA = 165;
// Refrängdansen (suno-v5-utkast.md): en rörelse per rad, alltid två likadana, lugnt
const DANS_ROR = {
  upp: f => ({ u: 'jatteglad', po: { armar: [40, 40], luta: 6 * gung(1, f) } }),                                   // händerna upp, gunga
  // figur-QA 2:51: tydligare kittel – händerna går snabbt upp och ner över magen (armY ±22, vinkel ±14) och öronen fnissvickar
  kittla: f => ({ u: { bas: 'fnissig', armar: [8, 8] }, po: { bas: 'magen', armar: [-124 + 14 * Math.sin(TID * 13 + f * 9), -124 + 14 * Math.sin(TID * 13 + 1 + f * 9)],
    armY: 22 * Math.sin(TID * 13 + f * 9), oron: [9 * Math.sin(TID * 9 + f), -9 * Math.sin(TID * 9 + 1 + f)], luta: 3 * Math.sin(TID * 7 + f) } }),
  krama: f => ({ u: { bas: 'jatteglad', armar: [8, 8] }, po: { bas: 'magen', armar: [-108, -108], luta: 6 * gung(2, f) } }),
  hurra: () => ({ u: 'jatteglad', po: 'hurra' }),
  glad: f => { const e = Math.sin(SLAGV(TID - 0.14 + f) / 2); return { u: null, po: { luta: 4 * gung(2, f), armar: [-30 + 10 * e, -30 - 10 * e] } }; },   // figur-QA: armarna vilar nere och gungar i takt (inga T-armar)
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
const CY05 = fy => Math.min(fy + 10, 1080 - 540 / 1.55);   // kamerans lägsta mitt vid zoom 1,55
const TOFSBILD = [2.3, 140, 80];
const TITTA = [84.8, 91.9];                                      // "Titta där!" i 05b och 05d (uppskattat)
// Lage hoppar mellan karet (k 0) och en plats utanför (k 1, ute = { x, fot, s }); H = helikopterns { x, botten, s } (rot 0).
function lageHoppa(k, H, ute, hq, topp = 3000) {
  const s = H.s, ex = HELI_ANKARE[0] + (ute.x - H.x) / s, ey = HELI_ANKARE[1] + (ute.fot - H.botten) / s;
  const hx = lerp(LAGE_FOT[0], ex, k), hy = lerp(LAGE_FOT[1], ey, k) - topp * k * (1 - k), hs = lerp(LAGE_K, ute.s / s, k);
  const q = { u: 'jatteglad', po: ihop({ armar: [45, 45] }, hq) };
  if (hy > 0 && k < 0.5) return visa('lage', { lager: 'heli-lage', x: hx, fot: hy, s: hs, ...q, skugga: false });
  visa('lage', { lager: 'lage-ute', x: H.x + (hx - HELI_ANKARE[0]) * s, fot: H.botten + (hy - HELI_ANKARE[1]) * s, s: hs * s, ...q, skugga: false, svans: true });
}
// Humle (Sanna 2026-11-10: "better animation", "dance more", inga ben): vingarna surrar hela tiden, hon gungar i takt med armarna
// omväxlande upp, och uttrycket skiftar var fjärde slag. humleLiv(f) = { u, po } (f = fas i s).
const HUMLE_U = ['jatteglad', 'glad', 'fnissig', 'jatteglad', 'forvanad', 'jatteglad'];
const cykel = (namn, lista, f = 0, per = 4) => { const q = (TID + f - SANG0) / (per * BEAT), i = Math.floor(q), k = ease((q - i) * per * BEAT / 0.35);
  const m = j => lista[((j % lista.length) + lista.length) % lista.length]; return U(namn, m(i - 1), m(i), k); };
// figur-QA: i helikoptern byter Lages leende ansikte lite var fjärde slag (en blick mot solen, kawaii-ögon, tillbaka), i stället för
// samma blundande leende i långa stycken (0:47–0:51, 1:00–1:08, 1:47–1:56); bytena går genom U, så ögonen byter på en blinkning
window.heliAnsikte = u => { if (u !== 'glad' && u !== 'jatteglad') return u; const L = FIG.lage.L;
  return cykel('lage', [bas(L, u), bas(L, { bas: 'glad', titt: [12, -8] }), bas(L, u), bas(L, { bas: 'kawaii', titt: [6, -4] })], 0, 4); };
// QA4 (Sanna "review bumble bee animation closely and improve"): vingarna surrar tydligt – tre vingposer som växlar ruta för ruta
// (30 fps) när hon flyger, varannan ruta och mindre när hon svävar (fart 0–1)
const humleVinge = (fart = 1) => { const r = Math.round(TID * 30), p = fart > 0.35 ? [26, -4, 12][r % 3] : [18, 2][Math.floor(r / 2) % 2]; return lerp(9, p, 0.55 + 0.45 * Math.min(1, fart + 0.3)); };
const humleLiv = (f = 0, dans = 1, fart = 0.5) => { const v = SLAGV(TID + f) / 2;
  // polish 2026-11-11 ("more natural"): lugnare lutning och armar
  return { u: cykel('humle', HUMLE_U, f), po: { vinge: humleVinge(fart), luta: 5 * dans * Math.sin(v), armar: [20 + 20 * dans * Math.sin(v), 20 - 20 * dans * Math.sin(v)], oron: [6 * Math.sin(v - 0.6), -6 * Math.sin(v - 0.6)] } }; };
// Humle vid helikoptern: punkten [x, y] i karets bild, en liten åtta runt punkten
// Humle på ängen (05c–05f): svävar till höger om Lage med en glipa (minst en halv Lage-bredd, Sanna 2026-11-11); öglorna på "surr"
// går utåt och uppåt, bort från honom
// Humles plats vid helikoptern: ovanför stjärten, fritt från bubblan och rotorn (Sanna 2026-11-11: aldrig ovanpå)
const HUMLE_P = [-300, 100], HUMLE_R = [1950, 250], ESKORT = [2050, -300];   // QA4: P vänster om stjärten (fritt från rotorn), R höger om nosen (06a)   // ESKORT: Humles plats i eskorten (09a), höger om rotorspetsen och ovanför nosen
const BLOMMA_X0 = 1430;   // QA4: smörblomman står till höger om Lage (förut 1090, vänster), så att Humle aldrig behöver flyga förbi honom
const humleVid = (P, [x, y], o = {}) => { const [hx, hy] = P([x + 70 * Math.sin(TID * 1.05), y + 34 * Math.sin(TID * 2.1)]);   // lugnare åtta
  const hs = 0.5 * (o.hs || SOLH.s), fot = o.topp ? Math.max(hy, 2 * 1024 * hs * 0.8) : hy;   // topp: minst en kroppshöjd under överkanten
  visa('humle', { lager: 'framfor', x: hx, fot, s: hs, ...humleLiv(), skugga: false, ...o }); return [hx, fot]; };
// QA4 07b: cirkeln runt helikoptern går på djupet (lutad: högersidan under nosen, så att hon aldrig går in på solskivan, figur-QA 1:55,5): framför den nertill (under medarna), bakom den upptill, och byter lager bara
// ute vid sidorna där hon är fri från nosen och stjärten; storleken följer djupet mjukt (0,85–1)
const humleRunt = a => { const bak = Math.sin(a) < 0;
  return { p: [830 + (Math.cos(a) < 0 ? 1060 : 1000) * Math.cos(a), 560 + (bak ? 700 : 690) * Math.sin(a) + 330 * Math.cos(a)], lager: bak ? 'bakom' : 'framfor', hs: SOLH.s * (0.925 + 0.075 * Math.sin(a)), topp: true }; };
// Humles flygbana (QA4): en obruten Catmull-Rom-kurva genom nycklar [TID, x, fot, s] i världens koordinater, med en mjuk gungning
// (ca halva kroppshöjden, 1,2 Hz) och en liten squash/stretch på varje gung. Hon vänds aldrig: riktningsposen (rikt) visar vart hon
// flyger och kroppen lutar högst ±10°. ogla = [t0, ...]: en glädjeögla (banan slår en ögla, kroppen står upprätt).
const HUMLE_H = 600;                                              // humlans höjd i riggens 1024-ruta (ungefär)
const kurva = (K, t) => { if (t <= K[0][0]) return K[0].slice(1); if (t >= K[K.length - 1][0]) return K[K.length - 1].slice(1);
  let i = 0; while (t >= K[i + 1][0]) i++;
  const P0 = K[Math.max(0, i - 1)], P1 = K[i], P2 = K[i + 1], P3 = K[Math.min(K.length - 1, i + 2)], u = (t - P1[0]) / (P2[0] - P1[0]);
  return [1, 2, 3].map(j => { const a = P0[j], b = P1[j], c = P2[j], d = P3[j];
    return 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u); }); };
const humleBana = (K, t, ogla = []) => { let [x, y, sk] = kurva(K, t);
  for (const t0 of ogla) { const q = kl01((t - t0) / 1.1); if (q > 0 && q < 1) { const a = 2 * Math.PI * ease(q); x += 70 * Math.sin(a); y -= 60 * (1 - Math.cos(a)); } }
  return [x, y, sk]; };
function humleFlyger(K, { lager = 'pynt', ogla = [], u = null, dans = 0.4, gung = 1 } = {}) {
  const [x, y, sk] = humleBana(K, TID, ogla), [x1, y1] = humleBana(K, TID + 0.05, ogla), vx = (x1 - x) / 0.05, vy = (y1 - y) / 0.05;
  const fart = Math.min(1, Math.hypot(vx, vy) / 350), fi = 2 * Math.PI * 1.2 * TID, bob = 0.22 * HUMLE_H * sk * Math.sin(fi) * gung;
  const L = humleLiv(0, dans, fart), kl = (v, m) => Math.max(-m, Math.min(m, v));
  visa('humle', { lager, x, fot: y + bob, s: sk, u: u || L.u, skugga: false,
    po: { ...L.po, rikt: kl(vx / 400, 0.9), luta: kl(vx / 45, 10) + 0.3 * L.po.luta, strack: 0.04 * Math.cos(fi) * gung, oron: [L.po.oron[0] + 10 * Math.sin(TID * 3.1), L.po.oron[1] - 10 * Math.sin(TID * 3.1 + 0.5)] } });
  return [x, y + bob - 0.5 * HUMLE_H * sk, sk]; }
// ängen 1:22–1:41 (05b–05f): långt bort när Lage pekar, ut åt höger, in igen från högerkanten i en lat båge, svävar till höger om
// Lage (minst ett lejonhuvud från ansiktet), en glädjeögla på "surr", ner till smörblomman (som nu står till höger om honom) och
// knuffar den, backar ut åt höger och svävar glad medan han håller den under hakan, och flyger mot helikoptern i 05f:s utåkning
const HUMLE_ANG = [[82.4, 1830, 470, 0.05], [84.0, 1800, 455, 0.06], [85.4, 1760, 440, 0.08], [86.4, 1990, 520, 0.12], [87.1, 2200, 640, 0.16],
  [87.8, 1830, 640, 0.165], [88.3, 1620, 740, 0.165], [88.6, 1575, 770, 0.165], [89.6, 1575, 790, 0.165], [91.0, 1560, 800, 0.165],
  [92.6, 1560, 800, 0.165], [94.7, 1565, 800, 0.165], [95.3, 1530, 900, 0.16], [95.65, BLOMMA_X0 + 120, 985, 0.15], [95.8, BLOMMA_X0 + 100, 985, 0.15],
  [96.0, BLOMMA_X0 + 125, 980, 0.15], [96.8, 1560, 900, 0.15], [97.5, 1570, 905, 0.14], [98.6, 1560, 895, 0.14], [99.5, 1575, 900, 0.14],
  [100.1, 1620, 720, 0.18], [100.6, 1600, 560, 0.2]];
const HUMLE_OGLA = [88.6];

// --- Himlen och jättesolen ---------------------------------------------------------------------------------------------------
function flyg({ u = 'glad', po = 'neutral', dx = 0, dy = 0, glid = TID * 60, sjunk = 0, ...o } = {}) {
  himmel(glid, sjunk);
  const bob = t => 9 * Math.sin(t * 1.7), s = o.s || HEL.s;   // Lage i bubblan kommer 0,13 s efter helikopterns gungning
  return heli({ ...HEL, x: HEL.x + dx, botten: HEL.botten + dy + bob(TID), rot: 2 * gung(4), lage: [u, po], ldy: (bob(TID - 0.13) - bob(TID)) / s, ...o });
}
// Refrängbilden: helikoptern svävar framför jättesolen. MED = Humle följer med (refräng 2).
const MED = () => BILD.startsWith('07') || (BILD === '06b' && TID > SVEP_06B);
function solScen({ u = 'jatteglad', po = 'neutral', dy = 0, flod = 0, ansikte = 'glad', humle = {}, ...o } = {}) {
  // figur-QA: "mums" (1:10,3, 1:58,3) och tuggorna (04c/04d, 07c/07d) med glad öppen mun i stället för rund (såg ut som en gäspning); hej (c) pratar som förut;
  // en blinkning var 3,1 s när solen bara ler (1:03–1:08 stod den still)
  const om = window.munOppen(), mums = /^0[47][cd]$/.test(BILD) && om, sb = ansikte === 'glad' && (TID % 3.1) < 0.14;
  jattesol({ t: TID, flod, ansikte: mums ? 'jatteglad' : sb ? 'blinkar' : ansikte, mun: 0 });
  const bob = t => 8 * Math.sin(t * 1.3);
  const P = heli({ ...SOLH, botten: SOLH.botten + dy + bob(TID), rot: 2 * gung(4), lage: [u, po], ldy: (bob(TID - 0.13) - bob(TID)) / SOLH.s, ...o });
  if (MED() && humle) humleVid(P, humle.p || HUMLE_P, humle);
  return P;
}
// rita en annan rads bild (scenen före svepet): BILD och BILD0 sätts till den radens
const som = id => { const [b, b0] = [BILD, BILD0], [a, e] = ANIM.TIDER[id]; BILD = id; BILD0 = a; ANIM[id]((TID - a) / (e - a), TID - a, e - a); BILD = b; BILD0 = b0; };
function stralar(x, y, k) {
  if (k <= 0.01) return;
  $('bakom').insertAdjacentHTML('afterbegin', `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((TID * 18) % 360).toFixed(1)})" opacity="${(0.45 * k).toFixed(3)}">${Array.from({ length: 14 }, (_, i) => {
    const a = i * Math.PI / 7, b = a + 0.12; return `<path d="M0 0L${(1400 * Math.cos(a)).toFixed(0)} ${(1400 * Math.sin(a)).toFixed(0)}L${(1400 * Math.cos(b)).toFixed(0)} ${(1400 * Math.sin(b)).toFixed(0)}Z" fill="#fff"/>`; }).join('')}</g>`);
}
// Uppstigningen i en obruten tagning (Sanna 2026-11-11: "up to the sky without a cloud transition"): kameran följer helikoptern
// uppåt YSLUT px, så ängen sjunker ut nertill och molnen glider förbi lite fortare (parallax). c 0–1.
// ovan(sjunk, fsjunk) ritar den övre platsen (fyller #platta), mark(Y) ritar ängen och helikoptern i ängens koordinater och ger P.
// Helikopterns skärmläge h = { x, b, s } blir världsläge genom att dra av Y.
// QA-rundan 2026-11-11: en riktig åkning uppåt. Ängen ligger på 0–1080, den övre platsen ovanför den på −(1080+B)…−B, och i bandet
// −B…0 går den övre platsens himmel (speglad nedåt) mjukt över i ängens himmel (speglad uppåt). Bandet ligger still i världen och
// kameran åker 1080 + B, så första rutan är bara ängen och sista bara den övre platsen: ingen dubbelexponering, inget byte på en ruta.
// QA2 1:44–1:46: en riktig åkning uppåt utan toning: ängen glider ut nertill, ett molnband (en hel skärmhöjd) passerar och sedan kommer
// den övre platsen ovanifrån. Molnbandet ligger helt mellan plattorna, så första rutan är bara ängen och sista bara den övre platsen.
const BAND = 1080, YSLUT = 1080 + BAND;
const MOLNBANK = (() => { const w = 380 * MATT[MOLN.litet], r = [];   // det lilla molnet är runt runt om, så banken får inga raka kanter
  for (let j = 0; j < 7; j++) for (let x = -300 + (j % 2) * 190; x < 2300; x += 380) {
    const sx = (j + Math.round(x / 380)) % 2 ? -1 : 1;
    r.push(`<image href="${MOLN.litet}" x="${(x - w / 2).toFixed(0)}" y="${-BAND + j * 117}" width="${w.toFixed(0)}" height="380"${sx < 0 ? ` transform="translate(${2 * x} 0) scale(-1 1)"` : ''}/>`); }
  return `<rect x="-600" y="${-BAND + 120}" width="3120" height="${BAND - 240}" fill="#EEF1F5"/>` + r.join(''); })();
// QA2 1:43, 2:28: Humle minst en kroppshöjd under överkanten under uppstigningen (fot i kamerans koordinater, kameran är flyttad YSLUT·c)
const humleUnder = (y, hs, c) => y + Math.max(0, 2 * 1024 * hs * 0.8 - (c > 0 && c < 1 ? YSLUT * c : 0) - y) * fas(c, 0, 0.04);   // tonas in med åkningen, inget hopp vid radstarten
function stigning(c, ovan, mark) {
  const Y = YSLUT * c;
  ovan(0.3 * Y - 1.3 * YSLUT, 1.5 * Y - 2.5 * YSLUT);
  const o = $('platta').innerHTML, o1 = o.match(/^<image[^>]*>/)?.[0] || o;   // spegeln av plattans bild syns bara i glipan ovanför molnen
  window.ANG_UTAN_SOL = true; const P = mark(Y); window.ANG_UTAN_SOL = false;   // ängens sol följer inte med ner, solen står kvar i himlen
  const m = $('platta').innerHTML;
  $('platta').innerHTML = `<g transform="translate(0 ${-YSLUT})">${o}<g transform="translate(0 2160) scale(1 -1)">${o1}</g></g>
    <rect x="-600" y="-300" width="3120" height="310" fill="rgb(109,195,239)"/>${m}${MOLNBANK}`;
  kamera(1); $('kamera').setAttribute('transform', `translate(0 ${Y.toFixed(1)})`);
  return P;
}
// helikoptern på ängen i skärmläget { x, b, s } (bob och lutning ingår), med kameran uppflyttad Y
const angenHeliPa = (Y, h, o = {}) => angenHeli({ upp: MARK.botten - (h.b - Y), dx: h.x - MARK.x, s: h.s, ...o });
// Bananen på molnet (polish 2026-11-11: "float in slower and stay longer"): molnet glider ut från solen redan i 04c/07c (1,9 s före
// raden) och ligger stilla och gungar en dryg sekund vid bubblan innan Lage tar bananen. d0 = 04d/07d:s start. Ger molnets läge.
const BMOLN_IN = 1.9, BMOLN_D = 2.1;
function bananMoln(P, d0) {
  const mal = P([1760, 120]), km = ease((TID - d0 + BMOLN_IN) / BMOLN_D), tillbaka = fas(TID, d0 + 1.55, d0 + 2.85);
  // QA4 (Sanna "make banana entrance on cloud more smooth"): molnet växer mjukt fram ur solen (inget poppande), bananen stiger upp ur det
  // över 0,9 s (g), och när molnet stannar sätter det sig mjukt (liten dämpad gungning, ingen studs)
  const g = ease(kl01((TID - d0 + BMOLN_IN) / 0.9)), u = TID - d0 + BMOLN_IN - BMOLN_D, satt = u > 0 ? 9 * Math.exp(-4 * u) * Math.sin(2 * Math.PI * u / 0.8) : 0;
  const mx = lerp(lerp(SOL[0] - 170, mal[0], km), SOL[0] - 170, tillbaka), my = lerp(lerp(SOL[1] + 200, mal[1], km), SOL[1] + 200, tillbaka) + 10 * Math.sin(TID * 1.8) * g + satt;
  const msk = lerp(0.4, 1, km) * g * (1 - 0.6 * tillbaka);
  if (tillbaka < 1) sak('pynt', MOLN.litet, mx, my + 70 * msk, 120 * msk);
  if (km < 1) glitter(mx, my - 40, 90, TID - d0 + BMOLN_IN - 0.3, 4);
  else if (TID < d0 + 1.25) glitter(mx, my - 40, 70, TID - d0 + 0.1, 4);   // gnistrar medan den väntar
  return [mx, my, g];
}
const solIn = t0 => 640 * (1 - ease((TID - t0) / 2.2));          // helikoptern kommer upp nerifrån efter svepet

// Bananerna som dansar (Sanna 2026-11-10: "dancing scene with bananas similar to red song dancing apples", "maybe banana dancing
// after solen bjuder på banan"): som 013:s äppelmarsch, men lugnare, på molnen bakom helikoptern i refrängernas sista rad (04f, 07f).
const BMARSCH = [300, 630, 960, 1290, 1620], BANSIKTE = [820, 1040];   // bananens ansikte i bildens 1659 × 1535-ruta
function glattBanan(x, botten, h, { mun = 'le', rot = 0, tryck = 1, lager = 'framfor', oga = 'rund' } = {}) {
  const s = h / 1535, [fx, fy] = BANSIKTE, e = 140;
  const munSvg = mun === 'o' ? `<ellipse cx="${fx}" cy="${fy + 150}" rx="50" ry="66" fill="#6b3a10"/>`
    : `<path d="M${fx - 95} ${fy + 110} Q${fx} ${fy + 210} ${fx + 95} ${fy + 110}" fill="none" stroke="#5a3210" stroke-width="28" stroke-linecap="round"/>`;
  lagg(lager, `<g transform="translate(${x.toFixed(1)} ${botten.toFixed(1)}) scale(${(2 - tryck).toFixed(3)} ${tryck.toFixed(3)}) rotate(${rot.toFixed(2)}) scale(${s.toFixed(4)}) translate(-830 -1535)">
    <image href="${BANAN}" width="1659" height="1535"/>
    ${[-1, 1].map(k => `<ellipse cx="${fx + k * 1.9 * e}" cy="${fy + 90}" rx="68" ry="42" fill="#F2876A" opacity="0.6"/>
      ${oga === 'glad' ? `<path d="M${fx + k * e - 48} ${fy + 4} Q${fx + k * e} ${fy - 62} ${fx + k * e + 48} ${fy + 4}" fill="none" stroke="#2a1a0c" stroke-width="26" stroke-linecap="round"/>`
        : `<ellipse cx="${fx + k * e}" cy="${fy - 10}" rx="40" ry="58" fill="#2a1a0c"/><circle cx="${fx + k * e - 12}" cy="${fy - 32}" r="14" fill="#fff"/>`}`).join('')}
    ${munSvg}</g>`);
}
// Bananerna på molnraden (refrängerna): kliver in i 04d/07d och dansar vidare genom 04f/07f på samma klocka, så att de redan dansar när
// bananen sjungs (Sanna 2026-11-11). Grupperna: kliver in, gungar, vågen från f-radens början, alla tillsammans.
const bananerna = () => { const id = BILD.slice(0, 2), B0 = ANIM.TIDER[id + 'd'][0] + 0.2, F0 = ANIM.TIDER[id + 'f'][0] - B0;
  const dy = /d$/.test(BILD) ? 230 : 0, dx = /d$/.test(BILD) ? 220 : 0, dr = /d$/.test(BILD) ? -170 : 0;   // figur-QA: högre och längre in (skars fortfarande 1:11, 2:00)   // QA2 1:11, 2:00: i närbilden 04d/07d ligger raden högre och längre in, så att bananerna inte skärs av (klipp till 04e döljer bytet)
  sak('bakom', MOLN.langt, 260 + dx, 1070 - dy, 300); sak('bakom', MOLN.langt, 1520 + dr, 1070 - dy, 300);   // molnraden bakom, bananerna dansar på den
  const d = /d$/.test(BILD);   // figur-QA: i inzoomningen (04d/07d) står raden samlad inom kamerans utsnitt, lite mindre
  bananRad(TID - B0, { botten: 930 - dy, h: d ? 200 : 230, xs: d ? [600, 820, 1100, 1300] : [120, 340, 1290, 1530, 1770], lager: 'bakom', in_: 1.6, GR: [1.6, F0 + 0.8, F0 + 2.4] }); };
function bananRad(s, { botten = 935, h = 300, xs = BMARSCH, lager = 'framfor', in_ = 4.2, GR = [4.2, 5.4, 7.2] } = {}) {
  const sl = (TID - SANG0) / BEAT, n = Math.floor(sl), b = Math.sin(Math.PI * (sl - n)) ** 2, g = Math.sin(Math.PI * sl / 2);
  const ga = ease(Math.min(1, s / in_)), lead = lerp(2100, xs[0], ga);
  xs.forEach((mx, i) => {
    const x = lead + (mx - xs[0]) + 10 * g;
    const del = f => f === 0 ? [0.047 * h * b, 6 * Math.sin(Math.PI * sl), 'rund']                                 // kliver in
      : f === 1 ? [0.02 * h * b, 9 * g * (i % 2 ? 1 : -1), 'glad']                                                  // gungar om vartannat
      : f === 2 ? (() => { const vem = n % xs.length === i; return [(vem ? 0.3 : 0.01) * h * b, vem ? 0 : 2 * g, 'glad']; })()   // en våg: en banan i taget gör ett lågt skutt på slaget (figur-QA: tydligare)
        : [0.13 * h * b, 7 * g, 'glad'];                                                             // alla tillsammans
    const f = GR.filter(t => s >= t).length, ov = f > 0 ? ease(kl01((s - GR[f - 1]) / 0.6)) : 1;
    const [h1, t1, oga] = del(f), [h0, t0] = f > 0 ? del(f - 1) : [h1, t1];
    const hh = lerp(h0, h1, ov), landar = b < 0.2 && hh > 4 ? 1 - b / 0.2 : 0;
    glattBanan(x, botten - hh, h, { oga, rot: lerp(t0, t1, ov) - 8, tryck: 1 - 0.06 * landar, lager });
  });
}

const ANIM = {
  // 02a: zoom in genom ett hål i papperet (22,4–24,2, börjar i kritan-ritar), ängen syns genom hålet. Sången börjar 23,4.
  // Sanna 2026-11-10 ("start is a bit slow … maybe close crops"): efter hålet glider kameran lugnt in till Lages ansikte (han tittar runt),
  // vidare till helikopterns bubbla (den glimmar) och ut till helbild igen före 02b.
  // 02a (Sannas idé 2026-11-11): Lage går glad över ängen mot helikoptern (sidogång B), fastnar med foten i en smörblomstuva och
  // plumsar mjukt ner på rumpan; förvånad, sedan lite ledsen, tittar ner och gnuggar foten. Lugnt: ingen snurr, ingen stor studs.
  '02a': (u, s) => {
    const P = angenHeli({ moln: true, lage: null }), L = FIG.lage.L;
    const w = kl01((s - 0.8) / (SNUBBEL - 0.8)), gk = fas(s, 0.8, 1.2) * (1 - fas(s, SNUBBEL, SNUBBEL + 0.25));
    const f = Math.sin((s - 0.8) * 2.4 * Math.PI) * gk;
    const ga = { rikt: -gk, luta: 3 * f, lyft: -Math.abs(f) * 12, ben: [16 * f, 16 * f], benY: [-40 * Math.max(0, -f), -40 * Math.max(0, f)], gang: gk, sving: f };
    // fallet (Sanna 2026-11-11: "more clear fall, more drama, a tear, better arms"): foten fastnar, han tippar framåt och armarna far ut
    // åt sidorna, plums på rumpan med ihoptryck och dammpuff, en stilla stund, sedan darrar läppen, ögonbrynen åker upp och en tår rinner
    const k1 = ease((s - SNUBBEL) / 0.35), k2 = ease((s - SNUBBEL - 0.3) / (PLOPP - SNUBBEL - 0.3)), ner = fas(s, PLOPP, PLOPP + 0.35);
    const ledsen = fas(s, SNUBBEL + 1.75, SNUBBEL + 2.4), darr = fas(s, SNUBBEL + 2.2, SNUBBEL + 2.6) * (1 - fas(s, SNUBBEL + 4.6, SNUBBEL + 5.2));
    const sniff = Math.sin(Math.PI * kl01((s - SNUBBEL - 2.95) / 0.3));
    const ut = 68 * k1 * (1 - ner), mark = -20 * ner + 6 * Math.sin(Math.PI * kl01((s - PLOPP - 0.1) / 0.3)) * ner;   // armarna ut åt sidorna, sedan ner i gräset bredvid
    const vingla = { ...ga, rikt: ga.rikt * (1 - k2), luta: lerp(ga.luta, -14, k1) * (1 - 0.8 * k2), armar: [ut, ut], svans: 0, ben: ga.ben.map(b => b * (1 - k1)), benY: ga.benY.map(b => b * (1 - k1)), lyft: -10 * Math.sin(Math.PI * k1) * (1 - k2) };
    const dunsK = fas(s, PLOPP, PLOPP + 0.4), sitt = { ...L.blandaPose('neutral', 'sitter', 1), strack: -0.11 * Math.sin(Math.PI * dunsK) - 0.03 * sniff,
      bred: 0.03 + 0.07 * Math.sin(Math.PI * dunsK) + 0.015 * sniff, upp: -0.35 * ledsen, armar: [ut + mark, ut + mark], svans: 2 * gung(4) };
    const po = s < SNUBBEL ? ga : L.blandaPose(vingla, sitt, k2);
    const x = s < SNUBBEL ? 1720 - (1720 - 1290) * w : lerp(1290 - 55 * k1, UTE.x, k2);
    const glad0 = { ...U('lage', 'neutral', 'glad', 1), titt: [-6, 0] };   // QA2 0:28,68: förvånad över 0,3 s, med titten och munnen blandade
    const ansikte = s < SNUBBEL ? glad0 : s < SNUBBEL + 1.75 ? munByte('lage', glad0, 'forvanad', fas(s, SNUBBEL, SNUBBEL + 0.3))
      : ledsenAnsikte(ledsen, darr, s);
    visa('lage', { lager: 'lage-ute', ...UTE, x, u: ansikte, po, svans: true });
    // tuvan han fastnar i (smörblommor som redan växer på ängen): vickar till när foten tar i
    const tv = 14 * Math.sin(2 * Math.PI * (s - SNUBBEL) / 0.5) * Math.exp(-3 * Math.max(0, s - SNUBBEL)) * (s > SNUBBEL ? 1 : 0);
    tuva(tv);
    // små grästussar när han landar
    const pk = (s - PLOPP) / 0.9;   // dammpuffen när han landar: fem små moln som rullar ut åt sidorna och bleknar
    // QA2 0:29,4: grästussar i krita i stället för släta ovaler – små strån som viftar ut åt sidorna och några kritkorn som yr upp
    if (pk > 0 && pk < 1) [[-95, -1], [85, 1], [-45, -0.5], [40, 0.5]].forEach(([dx, r], j) => { const e = 1 - (1 - pk) ** 2, op = (0.95 * (1 - fas(pk, 0.5, 1))).toFixed(2);
      const bx = UTE.x + dx + 50 * r * e, by = UTE.fot + 2, sv = 22 * r * Math.sin(Math.PI * Math.min(1, pk * 2.5)), h = 30 + 6 * (j % 2);
      const stra = [-16, -4, 8, 18].map((a, m) => { const v = (a + sv) * Math.PI / 180, l = h * (0.75 + 0.25 * ((m + j) % 3) / 2);
        return `M${(bx + (m - 1.5) * 7).toFixed(1)} ${by} q${(Math.sin(v) * l * 0.4).toFixed(1)} ${(-l * 0.6).toFixed(1)} ${(Math.sin(v) * l).toFixed(1)} ${(-Math.cos(v) * l).toFixed(1)}`; }).join(' ');
      const korn = [0, 1, 2].map(m => `<circle cx="${(bx + r * (20 + 30 * e) + (m - 1) * 14).toFixed(1)}" cy="${(by - 12 - 34 * e - 9 * m).toFixed(1)}" r="${(3.2 - m * 0.6).toFixed(1)}" fill="#E9DDB6"/>`).join('');
      lagg('pynt', `<g opacity="${op}"><path d="${stra}" stroke="#fff" stroke-width="11" stroke-linecap="round" fill="none"/><path d="${stra}" stroke="#7FAE5A" stroke-width="5" stroke-linecap="round" fill="none"/>${korn}</g>`); });
    // helbild under promenaden, in på Lage innan han snubblar så att fallet syns tydligt (Sanna 2026-11-11), sedan lugnt närmare
    const [fx, fy] = LAGE_UTE_ANS(), kin = ease((s - 3.0) / 2.2), k = ease((s - PLOPP - 0.6) / (9.8 - PLOPP - 0.6));
    const lx = Math.min(x, 1600) - 60;
    kamera(lerp(1.04, 2.2, kin) + 0.1 * k, lerp(960, lerp(lx, fx, k), kin), lerp(600, fy + 60 + 50 * k, kin));
    papperHal(kl01((TID - 22.4) / 1.8));
  },
  '02b': (u, s) => {   // närbild: "Är du lite ledsen?" – Lage sitter kvar, tittar ner och gnuggar foten, manen sjunker lite
    angenHeli({ moln: true, lage: null });
    const k = fas(s, 0.2, 1.4), darr = 1 - fas(s, 0.6, 1.4);
    tuva(0);
    // figur-QA 0:33–0:37: liv i den ledsna närbilden – manen och öronen sjunker långsamt, en långsam blinkning (s 1,5–2,3) och en suck (s 2,5–3,4)
    const sjunk = fas(s, 0.4, 3.0), blink = Math.sin(Math.PI * kl01((s - 1.5) / 0.8)), suck = Math.sin(Math.PI * kl01((s - 2.5) / 0.9)), lf = ledsenAnsikte(1, darr, s);
    visa('lage', { lager: 'lage-ute', ...UTE, u: { ...lf, titt: [-4, 10 - 4 * k], lock: (lf.lock || [0, 0]).map(v => Math.max(v, blink)) },
      po: { bas: 'sitter', upp: -0.35 - 0.1 * k - 0.12 * sjunk + 0.06 * suck, strack: -0.025 * k + 0.035 * suck - 0.02 * sjunk, bred: -0.02 * suck, svans: 2 * gung(4), armar: [-20, -20], oron: [-12 * sjunk, 12 * sjunk] }, svans: true });
    const [fx, fy] = LAGE_UTE_ANS(); kamera(lerp(2.2, 2.35, ease(s / 3.6)), fx, fy + 30);
  },
  '02c': (u, s, d) => {   // Lage tittar upp ("Vadå?"), helikoptern glimmar bakom honom, han blir förvånad, reser sig och gör ett litet glatt skutt
    const P = angenHeli({ moln: true, lage: null }), st = fas(s, 1.9, 2.5);
    const u_ = s < 1.4 ? U('lage', 'ledsen', 'nyfiken', fas(s, 0, 0.8)) : s < 2.3 ? U('lage', 'nyfiken', 'forvanad', fas(s, 1.4, 1.8)) : U('lage', 'forvanad', 'jatteglad', fas(s, 2.3, 2.8));
    visa('lage', { lager: 'lage-ute', ...UTE, u: u_, po: { ...FIG.lage.L.blandaPose('sitter', 'neutral', st), upp: 0.8 * (1 - st), rikt: -0.3 * fas(s, 1.4, 2.0) }, svans: true });
    const [gx, gy] = P([1300, -140]); glitter(gx, gy, 120, s - 1.5, 5);
    kamera(lerp(1.15, 1.05, ease(s / d)), 960, 640);
  },
  '02d': (u, s, d0) => {   // Lage hoppar in i bubblan (den fälls upp), rotorn börjar snurra på "snurr, snurr"
    const t0 = BILD0 + 0.45, d = 0.8, k = TID < t0 ? 1 : TID < t0 + d ? 1 - (TID - t0) / d : 0, hq = hopp(TID, [t0], 0, d).po;
    const lucka = fas(TID, BILD0, t0) * (1 - fas(TID, t0 + d + 0.1, t0 + d + 0.5));
    const inne = k === 0;
    angenHeli({ moln: true, lucka, lage: inne ? ['glad', { armar: [14, 14] }] : null });
    if (TID < t0) visa('lage', { lager: 'lage-ute', ...UTE, u: 'glad', po: { bas: 'huka', svans: 6 }, svans: true });
    else if (!inne) lageHoppa(k, MARK, UTE, hq, 1800);   // QA 0:42: lägre båge
    const ut = fas(s, d0 - 1.0, d0 - 0.05); kamera(lerp(1.05, 1, ut), lerp(900, 960, ut), lerp(640, 540, ut));   // QA: 02e:s uppstigning tar vid exakt
  },
  '02e': (u, s, d) => {   // obruten uppstigning (polish 2026-11-11): helikoptern lyfter, kameran följer med upp, ängen sjunker ut nertill, molnen
    // glider förbi och solen kommer fram bakom ängens moln och växer; Lage vinkar när solen säger hej
    const hej = eko('02e')[0], c = ease(s / 3.6), lift = fas(s, 0, 0.9), bob = 9 * Math.sin(TID * 1.7) * c;
    const h = { x: lerp(MARK.x, HEL.x, c), b: lerp(MARK.botten - 90 * lift, HEL.botten, c) + bob, s: lerp(MARK.s, HEL.s, c) };
    const lage = [TID > hej - 0.8 ? 'jatteglad' : s > 1.6 ? U('lage', 'forvanad', 'glad', fas(s, 2.4, 3.0)) : 'glad', { armar: [10, vink(hej - 1.3, 4, 0.6, VINK_KUPA)], upp: 0.5 * fas(s, 1.6, 2.0) * (1 - fas(s, 4.4, 5.0)) }];
    const mun = window.munOppen() && TID > hej - 0.2 ? 1 : 0, rest = 60 * fas(s, 2.4, 2.8) * (1 - fas(s, 5.6, 6.1));   // figur-QA: reser sig högre, så att vinkarmen kommer över kupkanten   // QA: reser sig så att vinken syns över kanten
    let P;
    if (c < 1) P = stigning(c, (sj, fs) => { solFjarran(-YSLUT * c, mun, 1 - c); himmel(TID * 60, sj, fs); }, Y => { return angenHeliPa(Y, h, { moln: true, rot: 2 * gung(4) * c, lage, ldy: -rest / h.s }); });
    else { solFjarran(0, mun); const bob = t => 9 * Math.sin(t * 1.7); P = flyg({ u: lage[0], po: lage[1], glid: TID * 60, ldy: (bob(TID - 0.13) - bob(TID) - rest) / HEL.s }); kamera(1); }
    stralar(...P([1070, 60]), fas(s, 0.2, 0.9) * (1 - fas(s, 3.0, 3.8)));
  },
  '03a': (u, s) => {   // nära rotorn som snurrar fortare
    solFjarran();
    const P = flyg({ u: { bas: 'glad', titt: [0, -12] }, po: { upp: 0.6 } }), [rx, ry] = P([1070, TOPP - 80]), [fx, fy] = P(LAGE_ANSIKTE);
    const iz = ease(s / 0.9), z = lerp(1, lerp(1.7, 1.85, ease(s / 5)), iz);   // mjuk inåkning i stället för ett hopp (rörelserundan 2026-11-10)
    kamera(z, lerp(960, (rx + fx) / 2, iz), lerp(540, (ry + fy) / 2, iz));
    ANIM.Z03A = z; ANIM.C03A = [(rx + fx) / 2, (ry + fy) / 2];   // 03b åker ut härifrån (filmen renderas i ordning)
  },
  '03b': (u, s) => {   // fyra tydliga lyft, ett per "upp" och ett på ekot
    solFjarran();
    const st = stegUpp(), arm = UPP.reduce((a, t0) => a + Math.sin(Math.PI * kl01((TID - t0 + 0.04) / 0.4)), 0);   // armarna upp på varje ord
    const P = flyg({ u: U('lage', 'forvanad', 'jatteglad', fas(TID, UPP[0], UPP[2])), dy: -80 * st, po: { armar: [10 + 9 * st + 20 * arm, 10 + 9 * st + 20 * arm] } });
    stralar(...P([1070, 60]), fas(s, 0, 0.6));
    { const ut = ease(s / 0.8); kamera(lerp(ANIM.Z03A ?? 1.85, 1, ut), lerp(ANIM.C03A?.[0] ?? 960, 960, ut), lerp(ANIM.C03A?.[1] ?? 540, 540, ut)); }   // mjuk utåkning från 03a
  },
  '03c': (u, s) => {   // "Nu flyger vi!": de stiger genom molnen (molnpassagen) till jättesolen, helikoptern kommer upp nerifrån
    if (TID < SVEP_03C) { solFjarran(); const P = flyg({ u: 'jatteglad', dy: -320 - 150 * ease((TID - BILD0) / 1.2), po: { armar: [40, 40] } }); stralar(...P([1070, 60]), 1); }
    else solScen({ dy: solIn(SVEP_03C), po: { armar: [30, 30] } });
    kamera(1);
  },
  // Refräng 1 (04a–04f) och 2 (07a–07f): samma bild och samma rörelse per rad, i refräng 2 är Humle med
  '04a': (u, s, d) => {   // granskningen 2026-11-10: kroken "Gul-li-gul" i halvbild på Lage (solens kant och strålar bakom), ut till tvåbilden på ekot
    const P = solScen({ ...DANS_ROR.upp(0), u: U('lage', 'jatteglad', 'fnissig', fas(s, 1.4, 1.8)), humle: {} }), [fx, fy] = P(LAGE_ANSIKTE);
    const n = fas(s, 0, 0.9) * (1 - fas(s, 0.5 * d, 0.5 * d + 0.8));   // QA: mjukare in i halvbilden (04a och 07a)
    kamera(lerp(1.05, 1.45, n), lerp(960, fx + 200, n), lerp(540, fy + 90, n));
  },
  '04b': (u, s, d) => {   // armen ritar två stora lugna rotorcirklar, rotorn snurrar fortare
    const w = 2 * Math.PI * 2 * ease(s / (d - 0.3)), arm = 50 + 42 * Math.sin(w - Math.PI / 2) * fas(s, 0, 0.3);
    const P = solScen({ u: { bas: 'glad', titt: [6, -10] }, po: { armar: [12, 60 + arm], luta: 3 * Math.sin(w) },
      humle: MED() ? humleRunt(w / 2 + 0.3) : {} });   // runt hela helikoptern, utan att röra den   // Humle flyger en cirkel runt helikoptern (07b)
    kamera(1);
  },
  '04c': (u, s) => {   // sträcker sig upp och vinkar två gånger, solen blinkar tillbaka
    const [h0] = eko(), blink = TID > h0 - 0.1 && TID < h0 + 1.3;
    const P = solScen({ u: 'jatteglad', po: { bas: 'upp', armar: [24, 30 + vink(h0 - 1.8, 5, 0.6, VINK_KUPA - 30)] }, ldy: -35 * fas(TID, h0 - 2.4, h0 - 1.9) * (1 - fas(TID, h0 + 1.3, h0 + 1.8)) / SOLH.s, ansikte: blink && Math.floor((TID - h0) / 0.6) % 2 === 0 ? 'blinkar' : 'glad',
      humle: {} });
    const d0 = ANIM.TIDER[BILD.slice(0, 2) + 'd'][0];
    if (TID > d0 - BMOLN_IN) { const [mx, my, g] = bananMoln(P, d0);   // bananen på molnet kommer redan nu, stiger upp ur molnet (g)
      pynt(`<g opacity="${kl01(g / 0.4).toFixed(3)}" transform="translate(${mx.toFixed(1)} ${(my + 18 + 45 * (1 - g)).toFixed(1)}) rotate(${(-10 + 6 * Math.sin(TID * 1.6)).toFixed(1)}) scale(${(190 * lerp(0.3, 1, g) / 1535).toFixed(4)})"><image href="${BANAN}" width="1659" height="1535" transform="translate(-830 -1535)"/></g>`); }
    kamera(lerp(1.15, 1.25, ease(s / 2.3)), 1010, 490);   // halvbild: Lage och solen hälsar (figur-QA: Lage helt i bild, förut skuren 1:56,5)
  },
  '04d': (u, s, d) => {   // bananen svävar fram från solen på ett moln; bubblan fälls upp, Lage tar den och tar två tuggor, tungan på sista
    const [m1, m2] = eko(), t0 = BILD0, ta = t0 + 1.25, slut = m2 + 0.25;
    const e = t0 + d, lucka = fas(TID, t0 + 0.5, t0 + 1.0) * (1 - fas(TID, Math.min(slut + 0.3, e - 1.2), Math.min(slut + 0.75, e - 0.45))), tunga = TID > slut;   // QA: stängd före klippet till närbilden
    const bett = [m1, m2].filter(t => TID > t + 0.1).length, kvar = [1, 0.55, 0][bett];
    const fram = tunga ? `<ellipse cx="1088" cy="${LAGE_ANSIKTE[1] + 76}" rx="16" ry="12" fill="#E7898C" stroke="#B9565F" stroke-width="3"/>` : '';
    const P = solScen({ u: TID < t0 + 1.0 ? U('lage', 'jatteglad', 'forvanad', fas(TID, t0 + 0.1, t0 + 0.5)) : U('lage', 'forvanad', 'jatteglad', fas(TID, t0 + 1.0, t0 + 1.3)), po: { armar: [4, TID < ta ? 52 * fas(TID, t0 + 0.6, ta) : 44 * (1 - fas(TID, slut, slut + 0.5)) + 8] }, lucka, fram,
      humle: TID > m1 + 0.6 ? { u: 'jatteglad' } : {} });
    bananerna();   // de dansande bananerna kliver in redan på "Solen bjuder på en banan" (Sanna 2026-11-11)
    // molnet med bananen: från solen fram till bubblans högra sida, sedan tillbaka
    const [mx, my] = bananMoln(P, t0);
    // bananen: på molnet, sedan i Lages tass framför ansiktet (karets punkt 1330, 300)
    const [hx, hy] = P([1330, 300]), kt = ease((TID - ta) / 0.35), bx = lerp(mx, hx, kt), by = lerp(my + 18, hy, kt);
    const bs = lerp(190, 330 * SOLH.s, kt) / 1535, rot = lerp(-10 + 6 * Math.sin(TID * 1.6), -28, kt);
    // två tydliga bett: en rund tugga ur toppen per "mums" (mask med två cirklar), sista tuggan tar resten
    const bettHal = bett >= 1 ? `<circle cx="-120" cy="-1500" r="330"/><circle cx="260" cy="-1380" r="300"/>` : '';
    if (kvar > 0) pynt(`<g><mask id="bett" maskUnits="userSpaceOnUse" x="-2000" y="-3000" width="4000" height="5000"><rect x="-2000" y="-3000" width="4000" height="5000" fill="#fff"/><g fill="#000">${bettHal}</g></mask>
      <g transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${bs.toFixed(4)})"><g mask="url(#bett)"><image href="${BANAN}" width="1659" height="1535" transform="translate(-830 -1535)"/></g></g></g>`);
    const gr = (TID - ta) / 0.5; if (gr > 0 && gr < 1) [0, 1, 2, 3].forEach(i => gnista(hx + 70 * Math.cos(i * 1.6 + 0.4), hy - 60 + 60 * Math.sin(i * 1.6 + 0.4), 22 * Math.sin(Math.PI * gr), 40 * gr));
    if (MED() && TID > m1 + 0.15 && TID < m1 + 0.75) {   // Humle får en bit (07d)
      const k = ease((TID - m1 - 0.15) / 0.6), [qx, qy] = P([1640 + 40 * Math.cos(TID * 1.4), -60 + 26 * Math.sin(TID * 2.8)]);
      pynt(bananSvg(lerp(hx, qx - 30, k), lerp(hy - 60, qy - 90, k) - 80 * Math.sin(Math.PI * k), 46, 30 * k));
    }
    const nara = fas(TID, ta - 0.4, ta + 0.7) * (1 - fas(TID, slut + 0.4, slut + 1.2)), [fx, fy] = P(LAGE_ANSIKTE);   // QA: lugnare kamerakurva   // nära på tuggorna
    kamera(1.08 + 0.55 * nara, lerp(1060, fx + 60, nara), lerp(520, fy + 40, nara));
  },
  // "Nu blir du glad!" är filmens utdelning: kawaii-ögonen (stora, två glanser) glider in, gnistor runt ansiktet
  '04e': (u, s) => {   // närbild: Lage kramar sig själv och gungar
    // figur-QA 1:14,67: kramen blandas in över 0,2 s (6 rutor) från 04d:s armar, inget byte på en ruta
    const kr = DANS_ROR.krama(0), ki = fas(s, 0, 0.2), po = ki < 1 ? FIG.lage.L.blandaPose({ armar: [4, 8] }, kr.po, ki) : kr.po;
    const P = solScen({ ...kr, po, u: { ...U('lage', 'jatteglad', 'kawaii', fas(s, 0.4, 1.0)), armar: [8, 8] }, humle: null }), [fx, fy] = P(LAGE_ANSIKTE);
    [0, 1, 2, 3, 4].forEach(i => { const q = ((s - 0.2 - i * 0.35) % 1.75 + 1.75) % 1.75; if (s > 0.2 + i * 0.35 && q < 0.9) { const a = -2.6 + i * 0.95;
      gnista(fx + 150 * Math.cos(a), fy - 30 + 120 * Math.sin(a), 18 * Math.sin(Math.PI * q / 0.9), 40 * q); } });
    const [ax, ay] = P(LAGE_ANSIKTE); kamera(lerp(2.0, 2.45, ease(s / 2.4)), ax, ay + 60);
  },
  '04f': (u, s) => {   // kittlar magen och skrattar; solen skrattar med, floden glittrar
    const [h0] = eko(), skratt = TID > h0 - 0.1 && TID < h0 + 0.9;
    const r = DANS_ROR.kittla(0);
    if (skratt) r.u = { ...r.u, bas: 'jatteglad' };
    solScen({ ...r, flod: fas(s, 0.1, 1.8), ansikte: 'fnissig', humle: { u: 'fnissig' } });
    bananerna();
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
    const kt = fas(TID, TITTA[0] - 0.3, TITTA[0] + 0.5), hx = lerp(1830, 1640, ease(s / d)), hy = 470 + 12 * Math.sin(s * 2.2);
    angenHeli({ upp: landHojd(), lucka, lage: TID < UT0 ? ['glad', { armar: [14, 14] }] : null });
    if (TID >= UT0 && TID < UT1) lageHoppa(k, MARK, UTE, hopp(TID, [UT0], 0, UT1 - UT0).po);
    else if (TID >= UT1) tillFots(kt > 0.2 ? { ...U('lage', 'forvanad', 'glad', fas(TID, TITTA[0] + 0.8, TITTA[0] + 1.4)), titt: [14, -4] } : { bas: 'nyfiken', titt: [13 * Math.sin(s * 1.3), -4] },
      { armar: [0, lerp(100, 40, kt)], luta: 3 * Math.sin(s * 1.3) * (1 - kt) });
    humleFlyger(HUMLE_ANG, { lager: 'bakom', gung: 0.6 });
    kamera(lerp(1, 1.45, kt), lerp(960, (hx + 1250) / 2, kt), lerp(540, 620, kt));   // kameran letar med barnet: dit han pekar
  },
  '05c': (u, s) => {   // Humle surrar in och flyger två små öglor runt Lages huvud, en per "surr"
    angenHeli({ lage: null });
    const [fx, fy] = LAGE_UTE_ANS(), [x, y] = humleBana(HUMLE_ANG, TID, HUMLE_OGLA);   // ögonen följer henne
    tillFots({ bas: 'fnissig', titt: [Math.max(-14, Math.min(14, (x - fx) / 10)), Math.max(-10, Math.min(6, (y - 80 - fy) / 12))] }, { armar: [16, 16] });
    humleFlyger(HUMLE_ANG, { ogla: HUMLE_OGLA, u: TID < 88.4 ? 'nyfiken' : null });
    const kk = ease(s / 1.2); kamera(lerp(1.45, 1.55, kk), lerp(1445, fx + 120, kk), lerp(620, CY05(fy), kk));   // QA2 1:27,65: målet aldrig bortom nederkanten, annars tvärstannar åkningen i klampen   // tar vid där 05b:s kamera slutade (1:28, ingen kapning)
  },
  '05d': (u, s) => {   // Lage och Humle spanar ner i gräset; en gul blomma kikar fram vid hans fötter
    angenHeli({ lage: null });
    const k2 = fas(TID, TITTA[1] - 0.2, TITTA[1] + 0.6), [fx, fy] = LAGE_UTE_ANS();
    tillFots({ bas: k2 > 0.2 && k2 < 1 ? 'forvanad' : 'nyfiken', titt: [12, 12] }, { bas: 'ner', armar: [lerp(100, 50, k2), 0] });   // pekar åt höger, mot blomman
    humleFlyger(HUMLE_ANG, { u: { bas: 'nyfiken', titt: [-6, 12] }, dans: 0.3 });
    const k = pop((s - 1.8) / 0.9);
    if (k > 0) sak('framfor', BLOMMA, BLOMMA_X, 1014, 150 * k, `rotate(${(3 * Math.sin(TID * 1.6)).toFixed(2)} ${BLOMMA_X} 1014)`);
    kamera(lerp(1.55, 1.7, k2), lerp(fx + 120, BLOMMA_X + 60, k2), lerp(CY05(fy), Math.min(860, 1080 - 540 / 1.7), k2));   // fortsätter från 05c
  },
  '05e': (u, s, d) => {   // smörblomman gnistrar i gräset; Humle flyger ner, tar den och bär den i en mjuk båge upp under Lages haka (Sanna 2026-11-11)
    angenHeli({ lage: null });
    const [fx, fy] = LAGE_UTE_ANS(), [cx, cy] = iFigur('lage', UTE.x, UTE.fot, UTE.s, [512, 560]);
    const ner = ease(s / 0.9), bar = ease((s - 1.2) / 1.4), lyft = -70 * Math.sin(Math.PI * bar), ryck = Math.sin(Math.PI * kl01((s - 0.9) / 0.3));
    const bx = lerp(BLOMMA_X, cx + 8, bar), bb = lerp(1014, cy + 110, bar) + lyft - 10 * ryck, bh = lerp(150, 130, bar);
    const rot = lerp(6 * Math.sin(Math.PI * (TID - SANG0) / (2 * BEAT)), 0, fas(s, 0.6, 1.0)) - 5 * Math.sin(Math.PI * bar) - 6 * bar;
    const ser = fas(s, 1.5, 2.0);   // Lage ser blomman komma: nyfiken ner i gräset, sedan lite förvånad, blicken följer den upp
    tillFots({ ...U('lage', 'nyfiken', 'forvanad', ser), titt: [lerp(12, 4, bar), lerp(12, 4, bar)] }, { bas: 'ner', upp: -0.6 * (1 - bar), armar: [12, 12] });
    sak('pynt', BLOMMA, bx, bb, bh, `rotate(${rot.toFixed(2)} ${bx.toFixed(1)} ${bb.toFixed(1)})`);
    if (s < 1.3) glitter(BLOMMA_X, 1014 - 110, 70, s - 0.2, 6);
    humleFlyger(HUMLE_ANG, { u: s > 1.0 ? 'jatteglad' : null });   // ner till blomman i en båge, knuffar den, backar ut åt höger
    const cp = ease((s - 1.0) / 1.8); kamera(lerp(1.7, 1.9, ease(s / d)), lerp(BLOMMA_X + 60, fx, cp), lerp(860, fy + 90, cp));
  },
  '05f': (u, s) => {   // närbild: blomman lägger sig under hakan, Lage kisar glatt, hakan lyser gult och han gör ett litet glatt skutt
    angenHeli({ lage: null });
    const e0 = eko0('05f'), gul = fas(TID, e0 - 0.2, e0 + 0.4), hopp = 22 * Math.sin(Math.PI * kl01((TID - e0 - 0.55) / 0.4));
    tillFots(U('lage', 'forvanad', 'fnissig', fas(s, 0.25, 0.8)), { bas: 'magen', armar: [-108, -108] }, { fot: UTE.fot - hopp });
    const [fx, fy0] = LAGE_UTE_ANS(), [cx, cy0] = iFigur('lage', UTE.x, UTE.fot, UTE.s, [512, 560]), cy = cy0 - hopp, fy = fy0;
    pynt(`<ellipse cx="${cx.toFixed(1)}" cy="${(cy - 6).toFixed(1)}" rx="54" ry="26" fill="#FFE14D" opacity="${(0.6 * gul).toFixed(3)}" filter="url(#mjuk)"/>`);
    const by = cy + 110 + 4 * Math.sin(TID * 1.5) * fas(s, 0, 0.6);
    sak('pynt', BLOMMA, cx + 8, by, 130, `rotate(${(-6 * fas(s, 0, 0.5)).toFixed(2)} ${cx + 8} ${by.toFixed(1)})`);
    if (gul > 0) glitter(cx, cy - 4, 50, TID - e0 - 0.2, 4);
    // kameran tar vid där 05e slutade (på blomman och hakan), går lite närmare och drar sig ut mot helikoptern i radens sista sekund
    const d = ANIM.TIDER[BILD][1] - BILD0, inn = ease(s / 0.9), ut = fas(s, d - 1.1, d);
    kamera(lerp(lerp(1.9, 2.35, inn), 1.25, ut), lerp(fx, 1100, ut), lerp(lerp(fy + 90, fy + 60, inn), 640, ut));
    // Humle släpper blomman och flyger upp bredvid Lage (med glipa), sedan mot 06a:s start
    humleFlyger(HUMLE_ANG, { u: gul > 0.3 ? 'fnissig' : 'jatteglad' });   // svävar glad till höger, kisar när Lage skrattar
  },
  '06a': (u, s) => {   // "Upp igen": Lage hoppar in igen (lugnt hopp), Humle sätter sig på bubblan, och helikoptern lyfter i två lyft
    const IN0 = BILD0 + 0.15, IN1 = IN0 + 0.8, k = TID < IN0 ? 1 : TID < IN1 ? 1 - (TID - IN0) / (IN1 - IN0) : 0;
    const lucka = fas(TID, IN0 - 0.4, IN0) * (1 - fas(TID, IN1 + 0.05, IN1 + 0.4));
    const L = [BILD0 + 1.5, BILD0 + 2.2], dip = L.reduce((a, t0) => a + Math.sin(Math.PI * kl01((TID - t0 + 0.3) / 0.35)), 0);
    const P = angenHeli({ upp: 130 * lyft(L) - 6 * dip, lucka, lage: k === 0 ? ['jatteglad', { armar: [30, 30] }] : null });
    if (k > 0) lageHoppa(k, MARK, UTE, hopp(TID, [IN0], 0, IN1 - IN0).po);
    const kh = ease((s - 0.4) / 1.6), [px, py] = P(HUMLE_R);   // QA4: en låg båge till sin plats höger om nosen, aldrig över rotorn
    visa('humle', { lager: 'framfor', x: lerp(1600, px, kh), fot: lerp(560, py, kh) - 80 * Math.sin(Math.PI * kh), s: 0.2, ...humleLiv(0, 0.5), skugga: false });
    const ut = ease(s / 1.4); kamera(lerp(1.25, 1, ut), lerp(1100, 960, ut), lerp(640, 540, ut));   // fortsätter 05f:s utåkning
  },
  '06b': (u, s) => {   // "Håll i dig – nu flyger vi!": obruten uppstigning från ängen till jättesolen (polish 2026-11-11), Humle följer med
    const lift = ease(s / 1.0), c = ease((s - 0.5) / 4.0), bob = 8 * Math.sin(TID * 1.3) * c;
    const h = { x: lerp(MARK.x, SOLH.x, c), b: lerp(MARK.botten - 260 - 120 * lift, SOLH.botten, c) + bob, s: lerp(MARK.s, SOLH.s, c) };
    const lage = [s < 1.2 ? 'forvanad' : 'jatteglad', { armar: [lerp(-12, 30, c), lerp(-12, 30, c)] }];
    if (c >= 1) { solScen({ po: lage[1] }); kamera(1); return; }
    const P = stigning(c, () => jattesol({ t: TID }), Y => angenHeliPa(Y, h, { rot: 2 * gung(4) * c, lage }));
    stralar(...P([1070, 60]), fas(s, 0.6, 1.4) * (1 - c));
    const kk = ease(kl01((c - 0.05) / 0.6)), dip = 1250 * Math.sin(Math.PI * kk);   // QA4: från nosen under helikoptern till stjärten
    const [hx, hy] = P([lerp(HUMLE_R[0], HUMLE_P[0], kk) + 70 * c * Math.sin(TID * 1.05), lerp(HUMLE_R[1], HUMLE_P[1], kk) + dip + 34 * c * Math.sin(TID * 2.1)]);
    { const hs = lerp(0.2, 0.5 * SOLH.s, c); visa('humle', { lager: 'framfor', x: hx, fot: humleUnder(hy, hs, c), s: hs, ...humleLiv(0, 0.5), skugga: false }); }
  },
  // Svansen (08a–08c) på ängen, Lage till fots (Sanna 2026-11-10): tofsen sticker upp bland smörblommorna bakom honom, viftar,
  // gömmer sig och kommer igen, medan han tittar åt fel håll; kameran går in på tofsen, den viftar två gånger och han skrattar
  '08a': (u, s) => {   // TOFSBILD: zoom och läge (från tofsen) för bilden på tofsen bland blommorna
    angenHeli({ lage: null });
    const upp = fas(s, 0.9, 1.2) * (1 - fas(s, 2.1, 2.4)) + fas(s, 2.9, 3.2), vift = 16 * Math.sin(2 * Math.PI * kl01((s - 1.3) / 0.7)) + 12 * Math.sin(2 * Math.PI * kl01((s - 3.3) / 0.6));
    const titt = s < 1.0 ? -13 : s < 2.3 ? 13 * fas(s, 2.1, 2.3) - 13 * (1 - fas(s, 2.1, 2.3)) : 13 - 26 * fas(s, 2.9, 3.2);   // tittar alltid åt fel håll
    tillFots({ bas: 'nyfiken', titt: [titt, -2] }, { svans: lerp(TOFS_NER, TOFS_UPP, upp) + vift * upp, luta: -2 });
    tuvor(); tofsSkugga(TOFS_UPP, upp);
    const [fx, fy] = LAGE_UTE_ANS(), [tx, ty] = LAGE_TOFS(TOFS_UPP), k = fas(s, 0, 0.6);
    kamera(lerp(1.8, TOFSBILD[0], k), lerp(0.62 * fx + 0.38 * tx, tx + TOFSBILD[1], k), lerp((fy + ty) / 2 + 30, ty + TOFSBILD[2], k));   // QA2 2:09: bilden på tofsen bland blommorna, inte en jättenära Lage
  },
  '08b': (u, s) => {
    angenHeli({ lage: null });
    // Lage vänder huvudet mot tofsen (riktningspose, ingen snurr), ser den med kawaii-ögon och skrattar
    const ut = s < 2.4 ? U('lage', 'forvanad', 'kawaii', fas(s, 1.2, 1.8)) : U('lage', 'kawaii', 'fnissig', fas(s, 2.4, 2.9));
    const nt = fas(s, 2.4, 2.9) * (1 - fas(s, 3.9, 4.6));   // på "svans": armen ner så att tofsen syns stor i närbilden, och en liten viftning
    // figur-QA "Lejonet är gult!" (2:17–2:18,4): huvudvickning, svansen gungar och ett litet glatt skutt på "gult" (2:18,3)
    const liv = fas(s, 4.3, 4.8), hq = hopp(TID, [138.3], 26, 0.4), lv = liv * 3 * Math.sin(2 * Math.PI * (s - 4.3) / 1.6);
    tillFots(hq.luft || TID > 138.1 ? ihop({ ...ut, titt: [14, 8] }, hq.po) : { ...ut, titt: [14, 8] },
      { svans: TOFS_UPP - 6 * nt + 18 * fas(s, 2.75, 3.0) * (1 - fas(s, 3.9, 4.4)) * Math.sin(2 * Math.PI * (s - 2.9) / 0.55) + 6 * liv * Math.sin(TID * 3.1),
        rikt: 0.35 * fas(s, 0.5, 1.1) + 0.25 * nt, armar: [0, -40 * nt], luta: lv }, { fot: UTE.fot - hq.dy });
    tuvor(); tofsSkugga(TOFS_UPP);
    const [tx, ty] = LAGE_TOFS(TOFS_UPP), [fx, fy] = LAGE_UTE_ANS(), k = fas(s, 0.2, 1.0);
    // ut så att både ansiktet och tofsen syns när han upptäcker den, in på tofsen på "svans" (2:15,5, s 3,1) och ut igen till skrattet
    const n = fas(s, 2.5, 3.0) * (1 - fas(s, 3.9, 4.7)), z0 = lerp(TOFSBILD[0], 1.8, k), x0 = lerp(tx + TOFSBILD[1], 0.62 * fx + 0.38 * tx, k), y0 = lerp(ty + TOFSBILD[2], (fy + ty) / 2 + 30, k);
    // figur-QA 2:15,5: in mot tofsen men med hela Lage i bild (förut 4,4× på tofsen, Lage halvt utanför och bara glitter syntes)
    kamera(lerp(z0, 2.1, n), lerp(x0, 0.45 * fx + 0.55 * tx + 40, n), lerp(y0, 0.5 * (fy + ty) + 60, n));
    glitter(tx + 70, ty - 20, 70, s - 0.4, 3); glitter(tx + 70, ty - 20, 70, s - 2.6, 3);
  },
  '08c': (u, s, d) => {
    angenHeli({ lage: null });
    // figur-QA: svansen ut åt sidan (+25°) inför "Vifta, vifta!" (2:21,0 och 2:21,9) och två tydliga slag per ord
    const sida = fas(TID, 140.2, 140.8) * (1 - fas(TID, 143.2, 143.8));
    const v = lerp(TOFS_UPP, 25, sida) + 5 * Math.sin(TID * 3.1) + eko().reduce((a, t0) => { const kk = kl01((TID - t0 + 0.05) / 0.7); const env = Math.sin(Math.PI * kk); return a + 24 * Math.sin(4 * Math.PI * kk) * env; }, 0);
    const sk = fas(TID, eko()[1] + 0.6, eko()[1] + 1.0), L = FIG.lage.L;   // QA 2:23,7: skrattet blandas in, inget byte på en ruta
    tillFots(U('lage', bas(L, { bas: 'fnissig', titt: [14, 8] }), bas(L, 'jatteglad'), sk), { svans: v, armar: [30 * sk, 30 * sk], rikt: 0.35, luta: 3 * Math.sin(2 * Math.PI * s / 1.6) * (1 - fas(s, 1.8, 2.2)) });   // rikt fast: ingen arm som poppar 2:21,33
    tuvor(); tofsSkugga(TOFS_UPP);
    // längre närbild när den viftar (polish 2026-11-11): in på tofsen före första viftningen, kvar över båda, ut till tvåbilden när
    // Lage skrattar (och skuttar), sedan helbild
    const [tx, ty] = LAGE_TOFS(TOFS_UPP), [fx, fy] = LAGE_UTE_ANS(), [v1] = eko(), nar = fas(TID, v1 - 0.9, v1 - 0.2), ut = fas(TID, v1 + 1.3, BILD0 + d - 0.1);
    // figur-QA: halvbild med Lage och svansen, hela huvudet och armarna i bild (förut 4× på svansen, Lage avskuren 2:22–2:24)
    const z = lerp(lerp(1.8, 2.2, nar), 1, ut), cx = lerp(lerp(0.62 * fx + 0.38 * tx, 0.45 * fx + 0.55 * tx + 40, nar), 960, ut), cy = lerp(lerp((fy + ty) / 2 + 30, (fy + ty) / 2 + 60, nar), 540, ut);
    kamera(z, cx, cy);
  },
  '09a': (u, s) => {   // mellanspel (polish 2026-11-11, "2:29 a bit slow"): Lage hoppar in, vinkar, de lyfter tidigare och stiger i en obruten
    // tagning upp i himlen medan Humle flyger en båge över helikoptern; blommorna dansar; 09b fortsätter i samma himmel
    const IN0 = BILD0 + 0.5, IN1 = IN0 + 0.8, k = TID < IN0 ? 1 : TID < IN1 ? 1 - (TID - IN0) / (IN1 - IN0) : 0;
    const lucka = fas(TID, IN0 - 0.5, IN0 - 0.05) * (1 - fas(TID, IN1 + 0.1, IN1 + 0.5));   // som 02d
    const L = [BILD0 + 2.1, BILD0 + 2.7], dip = L.reduce((a, t0) => a + Math.sin(Math.PI * kl01((TID - t0 + 0.3) / 0.35)), 0);
    const c = ease((s - 3.0) / 3.8), bob = 9 * Math.sin(TID * 1.7) * c;
    const h = { x: lerp(MARK.x, HEL.x, c), b: lerp(MARK.botten - 130 * lyft(L) + 6 * dip - 140 * fas(s, 3.0, 4.0), HEL.botten, c) + bob, s: lerp(MARK.s, HEL.s, c) };
    const lage = k === 0 ? ['jatteglad', { armar: [10, vink(IN1 + 0.4, 3)] }] : null;
    let P;
    if (c <= 0) P = angenHeliPa(0, h, { lucka, lage });
    else if (c < 1) P = stigning(c, (sj, fs) => himmel(TID * 110, sj, fs), Y => angenHeliPa(Y, h, { rot: 2 * gung(4) * c, lage }));
    else P = flyg({ u: 'jatteglad', po: lage[1], glid: TID * 110 });
    if (TID < IN0) tillFots('jatteglad', { bas: 'huka', svans: 10 });
    else if (k > 0) lageHoppa(k, MARK, UTE, hopp(TID, [IN0], 0, IN1 - IN0).po);
    // Humle: bredvid helikoptern, sedan en lugn båge över bubblan till vänster sida (där hon är i 09b)
    // QA4: eskort snett ovanför till höger om helikoptern (före nosen), med tydlig glipa till bubblan och rotorn, och gungar
    const [px, py] = P([ESKORT[0] + 50 * Math.sin(TID * 1.05), ESKORT[1] + 30 * Math.sin(TID * 2 * Math.PI * 0.6)]);
    const ki = ease((s - 0.2) / 2.2);   // QA: Humle flyger in från höger i stället för att dyka upp
    { const hs = lerp(0.2, 0.26, c); visa('humle', { lager: 'framfor', x: lerp(2250, px, ki), fot: humleUnder(lerp(460, py, ki), hs, c), s: hs, ...humleLiv(0, 1), skugga: false }); }
    if (c <= 0) { const [ux, uy] = LAGE_UTE_ANS(), [ix, iy] = P(LAGE_ANSIKTE), f = fas(TID, IN0, IN1 + 0.3), fx = lerp(ux, ix, f), fy = lerp(uy, iy, f);
      const n = fas(s, 0, 1.0) * (1 - fas(s, 1.8, 3.0));   // QA: åker mjukt in från 08c:s helbild och följer Lage mjukt in i bubblan
      kamera(lerp(1, 1.3, n), lerp(960, (fx + MARK.x + 300) / 2, n), lerp(540, 640, n)); }
    else if (c >= 1) kamera(1);
  },
  '09b': (u, s) => {   // molnen glider ihop och isär, discokulan tänds, helikoptern landar, Kanel och Hugo vinkar, Lage hoppar ut
    const t = TID, ihopK = ease((t - BILD0) / 1.6), isar = ease((t - DISCO_IN) / 1.6);
    if (t < DISCO_IN) {
      const P = flyg({ u: 'jatteglad', glid: TID * 110, dx: 200 * ihopK });
      // QA4: eskorten svänger av i en liten båge upp och ut åt höger innan helikoptern försvinner i molnen
      const av = ease((t - BILD0 - 0.2) / 1.5), [hx, hy] = P([ESKORT[0] + 50 * Math.sin(TID * 1.05) + 1400 * av, ESKORT[1] + 30 * Math.sin(TID * 2 * Math.PI * 0.6) - 500 * Math.sin(Math.PI * 0.6 * av) - 300 * av]);
      if (av < 1) visa('humle', { lager: 'framfor', x: hx, fot: hy, s: 0.26, ...humleLiv(0, 0.6, 0.3 + 0.7 * Math.sin(Math.PI * av)), skugga: false });
    } else discoGolv(t);
    const k = t < DISCO_IN ? ihopK : 1 - isar;
    if (k > 0) { molnTopp(k); sak('ram', MOLN.stort, lerp(-1100, 430, k), 1380, 1420); sak('ram', MOLN.stort, lerp(3000, 1490, k), 1400, 1420); sak('ram', MOLN.mellan, 960, lerp(2700, 1180, k), 1000); }
    kamera(1);
  },
  // Discot: Lage, Hugo och Kanel på golvet, Humle surrar vid kulan. Dekalen i hörnet visar rörelsen.
  '10a': () => { dansGolv({}); }, '10b': () => { dansGolv(alla('upp')); },
  // första varvet: kameran går nära den som gör rörelsen (animatörens noter 2026-11-10)
  '10c': (u, s, d) => { const kl = klappRad('lage', d); dansGolv({ lage: kl }); VARV1(); },
  '10d': (u, s, d) => { dansGolv({ kanel: { u: 'jatteglad', po: gungaPo(SIGN.kanel), G: 1 }, lage: { u: 'glad', po: gungaPo(SIGN.lage, 0.35), G: 1 }, hugo: { u: 'glad', po: gungaPo(SIGN.hugo, 0.35), G: 1 } }); VARV1(); },
  '10e': (u, s, d) => { const r = DANS_ROR.kittla(0); if (window.munOppen()) r.u = { ...r.u, bas: 'jatteglad' }; dansGolv({ hugo: r }); VARV1(); },
  '10f': () => { dansGolv({ lage: { u: 'blinkar', po: { bas: 'pekar', armar: [0, 40] } } }); },
  '10g': () => { dansGolv(alla('upp'), 1.1); },
  '10h': (u, s, d) => { const o = {}; for (const n in DANS) o[n] = klappRad(n, d); dansGolv(o, 1.1); },
  '10i': () => { const o = {}; for (const n in DANS) o[n] = { u: 'glad', po: gungaPo(SIGN[n]), G: 1 }; dansGolv(o, 1.1); },
  '10j': () => { dansGolv(alla('kittla'), 1.1); },
  '10k': (u, s) => { const o = alla('hurra'); for (const n in o) o[n] = { ...o[n], u: U(n, 'jatteglad', 'kawaii', fas(s, 0.3, 0.9)) }; dansGolv(o, 1); },   // "Hurra!": kawaii-ögon
  // (andra varvet åker kameran lugnt längs raden, se VARV2 nedan)
  // Frågeleken: klistermärkena slås upp stort i mitten och flyger upp i bågen runt kulan
  '11a': (u, s, d) => { dansGolv({}); klistren([], 'heli', s, d); },
  '11b': (u, s, d) => { dansGolv({}); klistren(['heli'], 'sol', s, d); },
  '11c': (u, s, d) => { dansGolv({}); klistren(['heli', 'sol'], 'banan', s, d); },
  '11d': (u, s, d) => { dansGolv({}); klistren(['heli', 'sol', 'banan'], 'humle', s, d); },   // humlans klistermärke, som de andra
  '11e': (u, s, d) => { dansGolv({}, 1, null); klistren(['heli', 'sol', 'banan', 'humle'], 'blomma', s, d); },
  '11f': (u, s) => {   // Lage tar ett steg fram och stryker stolt manen, och svansen viftar; kameran går nära honom ("Lejonet!")
    const k = ease(s / 0.7), m = manen(BILD0 + 0.8);
    dansGolv({ lage: { u: 'stolt', po: { ...(m || { armar: [-4, -4] }), svans: 20 * Math.sin(SLAGV(TID) / 2) }, dx: 110 * k, dfot: 30 * k, ds: 0.05 * k } }, 1, null);
    klistren(ALLA_KLISTER);
    const n = ease(s / 1.0) * (1 - fas(s, 2.2, 3.0));
    kamera(lerp(1, 1.2, n), lerp(960, DANS.lage[0] + 110, n), lerp(540, 450, n));   // QA2 3:25: bågen helt i bild   // QA 3:25: mindre nära, så att märkesbågen får plats
  },
  '11g': (u, s) => {   // den utdragna skrattkroken: rörelsen byts var fjärde slag (polish 2026-11-11, "dance move goes on too long"),
    // mjukt överblandad; bågen glittrar. Från HIN kommer helikoptern redan in (12a), och Kanel och Hugo kliver åt sidan
    const q = (TID - BILD0) / (4 * BEAT), i = Math.floor(q), kb = ease((q - i) * 4 * BEAT / 0.6);
    const jS = Math.floor((KROK_SLUT - BILD0) / (4 * BEAT)), typ = j => j > jS ? 'glad' : KROK_ROR[((j % KROK_ROR.length) + KROK_ROR.length) % KROK_ROR.length];
    const ks = ease((TID - KROK_SLUT) / 0.7), o = {};   // QA 3:37,6: mjuk övergång till 'glad' vid KROK_SLUT i stället för ett byte på en ruta
    for (const n in DANS) { const L = FIG[n].L, a = DANS_ROR[typ(i - 1)](SIGN[n]), b = DANS_ROR[typ(i)](SIGN[n]), g = DANS_ROR.glad(SIGN[n]);
      const u0 = U(n, bas(L, a.u || 'glad'), bas(L, b.u || 'glad'), i > 0 ? kb : 1), p0 = L.blandaPose(basPose(L, a.po), basPose(L, b.po), i > 0 ? kb : 1);
      o[n] = i > jS ? { u: bas(L, 'glad'), po: basPose(L, g.po) } : i === jS && ks > 0 ? { u: U(n, u0, bas(L, 'glad'), ks), po: L.blandaPose(p0, basPose(L, g.po), ks) } : { u: u0, po: p0 }; }
    const tb = 1 - ease(s / 0.9); Object.assign(o.lage, { dx: 110 * tb, dfot: 30 * tb, ds: 0.05 * tb });   // 3:27: glider tillbaka från steget fram i 11f, inget hopp
    if (TID > HIN) { const at = ease((TID - HIN - 0.1) / 1.1);
      for (const [n, dx] of [['hugo', 260], ['kanel', 400], ['lage', LAGE_KLIV]]) o[n] = { ...o[n], lager: 'framfor', dx: dx * at };   // Sanna: Lage helt fri från helikoptern
      heli({ ...hemH(TID), rot: -2 * (1 - ease((TID - HIN) / 1.4)), lage: null }); }
    dansGolv(o, 1, null);
    klistren(ALLA_KLISTER, null, 0, 0, TID > HIN ? 'bakom' : 'pynt');
    ALLA_KLISTER.forEach((n, i) => glitter(...SLOT[n], 115, ((s - 0.3 - i * 0.45) % 3.2 + 3.2) % 3.2, 5));
  },
  // Sanna 2026-11-10 ("have lion enter helicopter 3:32"): man ska se Lage hoppa in. Kanel och Hugo kliver åt sidan så att bubblan syns,
  // bubblan fälls upp, Lage hoppar in med samma lugna hopp som på ängen (lageHoppa, 0,8 s) och bubblan fälls ner igen
  '12a': (u, s) => {   // den tomma helikoptern kommer in och landar bakom Lage, han hoppar in, Kanel och Hugo vinkar 0,25 s isär
    // polish 2026-11-11 ("helicopter comes in a bit earlier"): helikoptern kom in redan i 11g (HIN), så Lage hoppar in tidigt
    const t0 = BILD0, H = { ...hemH(TID), botten: hemH(TID).botten - 160 * ease((s - 2.7) / 0.9) };
    const IN0 = t0 + 0.6, IN1 = IN0 + 0.8, inne = TID >= IN1;
    const lucka = fas(TID, IN0 - 0.4, IN0) * (1 - fas(TID, IN1 + 0.05, IN1 + 0.4));
    heli({ ...H, rot: 0, lucka, lage: inne ? ['jatteglad', { armar: [10, vink(IN1 + 0.3, 2, 0.6, 60)] }] : null });
    const at = ease((TID - HIN - 0.1) / 1.1), v = (i, dx) => ({ u: 'jatteglad', po: { armar: [0, vink(t0 + 0.4 + 0.25 * i, 4, 0.6, i ? 58 : 46)] }, lager: 'framfor', dx: dx * at });   // Hugo (i 0) vinkar lägre   // kliver åt sidan, vinkar
    dansGolv({ lage: TID < IN0 ? { u: 'jatteglad', po: { bas: 'huka', svans: 6 }, lager: 'framfor', dx: LAGE_KLIV } : null, hugo: v(0, 260), kanel: v(1, 400) }, 1, null);
    if (TID >= IN0 && !inne) lageHoppa(1 - (TID - IN0) / (IN1 - IN0), H, { x: DANS.lage[0] + LAGE_KLIV, fot: DGOLV, s: DANS.lage[1] }, hopp(TID, [IN0], 0, IN1 - IN0).po, 1100);   // lägre båge (QA2 3:44,6: huvudet täcker inte solmärket)en
    klistren(ALLA_KLISTER, null, 0, 0, 'bakom');   // bågen på väggen bakom, så att hoppet syns framför den
  },
  // 12b (Sanna 2026-11-10: "no empty sky", samma riggade sol): rakt klipp till jättesolen. Helikoptern flyger in från vänster mot solen,
  // Lage vinkar, solen vinkar tillbaka och säger "Hej då!", sedan sluter sig kritirisen runt Lages ansikte
  '12b': (u, s) => {
    const ut = ease(s / 2.0), fram = ease((s - 2.0) / 6), bob = t => 8 * Math.sin(t * 1.3);
    const vick = 14 * Math.sin(2 * Math.PI * (TID - BILD0) / 1.2) * fas(s, 0.8, 1.2) * (1 - fas(s, 4.4, 5.0));   // solen vinkar tillbaka
    const prat = (s > 0.5 && s < 1.7) || (s > 2.1 && s < 2.8) ? 0.55 + 0.45 * Math.abs(Math.sin(s * 8)) : 0;          // "Hej då, solen!" / "(Hej då!)"
    jattesol({ t: TID, ansikte: 'jatteglad', mun: prat, vick });
    const P = heli({ ...SOLH, x: SOLH.x + lerp(-1000, 0, ut) + 140 * fram, botten: SOLH.botten - 70 * fram + bob(TID), rot: 2 * gung(4),
      lage: ['jatteglad', { armar: [10, vink(BILD0 + 0.9, 3, 0.6, VINK_KUPA) + vink(BILD0 + 3.2, 2, 0.6, VINK_KUPA)]}], ldy: (bob(TID - 0.13) - bob(TID) - 45 * fas(s, 0.2, 0.7) * (1 - fas(s, 4.8, 5.4))) / SOLH.s });   // QA: Lage reser sig i bubblan så att vinken syns över kanten
    // mjukt slut (Sanna 2026-11-10: "improve transition 3.50"): kameran följer med in i solens ljus (lugn inzoomning mot Lage, varmt
    // sken växer), sedan sluter sig kritirisen långsamt runt hans ansikte (formatets slut) och outrot tar vid
    // QA 2026-11-11: kameran siktar mellan helikopterns mitt och Lages ansikte och zoomar mindre, så att hela helikoptern får plats i
    // bilden medan irisen sluter sig (förut skars stjärten av vid bildkanten); irisen sluter sig runt ansiktet där det hamnar
    const [fx, fy] = P(LAGE_ANSIKTE), [hx, hy] = P([835, 560]), in_ = ease(kl01((s - 2.4) / 4.0));
    const z = lerp(1, 1.2, in_), cx = lerp(960, (hx + fx) / 2, in_), cy = lerp(540, (hy + fy) / 2, in_);
    kamera(z, cx, cy);
    const tx = Math.max(1920 - 1920 * z, Math.min(0, 960 - cx * z)), ty = Math.max(1080 - 1080 * z, Math.min(0, 540 - cy * z));   // som kamera(): kanten låst
    const ix = tx + fx * z, iy = ty + fy * z;
    lagg('ram', `<rect width="1920" height="1080" fill="url(#varmt)" opacity="${(0.55 * ease(kl01((s - 2.8) / 2.6))).toFixed(3)}"/>
      <defs><radialGradient id="varmt" cx="0.75" cy="0.35" r="0.9"><stop offset="0" stop-color="#FFF8D6"/><stop offset="0.6" stop-color="#FFE48A" stop-opacity="0.5"/><stop offset="1" stop-color="#FFD25A" stop-opacity="0"/></radialGradient></defs>`);
    const r = lerp(1400, 290, ease(kl01((TID - 230.6) / 2.8))) * (1 - fas(TID, 234.2, 235.4));
    if (TID > 230.6) kritiris(r, ix, iy, { t: s, glimt: fas(TID, 233.0, 233.4) * (1 - fas(TID, 235.6, 236.0)), in: fas(TID, 234.2, 235.4) });
  },
};
// Refräng 2: samma koreografi, ny bild (animatörens noter 2026-11-10). Kameran läggs över 04-radens.
const KAM07 = {
  b: s => kamera(1.12, lerp(1100, 900, ease(s / 4)), 560),                                    // åker åt vänster medan Humle flyger sin cirkel
  c: () => kamera(1.3, 1180, 480),                                                            // solen nära, Lage vinkar till vänster (figur-QA 1:56,5: 1,3× så att hela Lage är i bild, förut 1,55×)
  f: s => kamera(lerp(1.3, 1, ease(s / 3.5)), 960, 540),                                       // drar sig ut över hela bilden
};
['a', 'b', 'c', 'd', 'e', 'f'].forEach(b => ANIM['07' + b] = (u, s, d) => { ANIM['04' + b](u, s, d); KAM07[b]?.(s, d); });
ANIM['07e'] = (u, s) => { const P = solScen({ ...DANS_ROR.krama(0), u: { ...U('lage', 'jatteglad', 'kawaii', fas(s, 0.4, 1.0)), armar: [8, 8] }, humle: { p: HUMLE_P, hs: SOLH.s } }); narbild(P, 2.1, 40); };

// --- Konstanter som behöver raderna ------------------------------------------------------------------------------------------
const SVEP_03C = 58.1, SVEP_05A = 80.9, SVEP_06B = 107.2, SVEP_08A = 128.4, DISCO_IN = 155.2, KROK_SLUT = 217.6;
const BLOMMA_X = BLOMMA_X0;
const eko0 = id => lerp(...ANIM.TIDER[id], 0.62);                // "(hakan blir gul!)" i 05f
// Kritsvepen (avsnittstid, färg): över skarven, SV s före och efter. 02d → 02e och 12a → 12b är raka klipp, 09b molnen.
// 9,0: andra halvan av introts svep. Ingen sak i svepet.
const SVEP = [[9.0, 'gul']], SV = 0.8;   // bara introts svep (formatet); alla andra platsbyten är molnpassager (MOLNPASS)

// --- Discot -----------------------------------------------------------------------------------------------------------------
const DANS = { lage: [470, 0.62], kanel: [960, 0.6], hugo: [1450, 0.62] }, DGOLV = 1026;   // Kanel i mitten: Lage och Hugo har nästan samma orange
const SIGN = { lage: 0, kanel: -0.1, hugo: 0.06 };
// "gunga" (Sanna 2026-11-11: "improve animation for gunga"): en tydlig, lugn vaggning från sida till sida runt fötterna, ett ytterläge
// var annat slag. Kroppen är högst i ytterlägena och sjunker lite i mitten (pendel), armarna lite ut och släpar efter, öronen släpar mer.
const gungaPo = (f = 0, a = 1) => { const p = Math.PI * (TID + f - SANG0) / (2 * BEAT), g = Math.sin(p), e = Math.sin(p - 0.45), o = Math.sin(p - 0.8);
  // Sanna 2026-11-11 ("make legs and ear move more on gunga"): vikten flyttas från fot till fot – den lediga foten lyfts lite och svänger ut
  // i varje gung – och öronen svänger större, släpar efter och följer igenom i vändlägena (andra övertonen ger den lilla efterknycken)
  const vL = Math.max(0, g) ** 1.5, vR = Math.max(0, -g) ** 1.5, ov = 16 * o + 4 * Math.sin(2 * (p - 0.8));
  return { luta: 11 * a * g, x: 30 * a * g, lyft: -14 * a * Math.abs(g), armar: [20 * a + 14 * a * e, 20 * a - 14 * a * e], oron: [a * ov, -a * ov],
    ben: [GUNG_BEN * a * vL, -GUNG_BEN * a * vR], benY: [-26 * a * vL, -26 * a * vR] }; };
const GUNG_BEN = 12;                // fas: Hugo lite tidig, Kanel lite sen
const LAGE_KLIV = 510;
const HUMLE_KULA = [1130, 300], HEM = { x: 350, botten: 1012, s: 0.45 };
// helikoptern hämtar Lage: flyger in från vänster från HIN (i 11g) och landar bakom honom på 1,4 s
const HIN = 221.9, hemH = t => ({ ...HEM, x: lerp(-600, HEM.x, ease((t - HIN) / 1.4)), botten: lerp(560, HEM.botten, ease((t - HIN) / 1.4)) });
// skrattkrokens rörelser (11g), en per fyra slag
const KROK_ROR = ['kittla', 'upp', 'krama', 'kittla', 'hurra', 'upp'];   // Humle vid kulan; helikoptern hämtar Lage (12a)
const alla = typ => Object.fromEntries(Object.keys(DANS).map(n => [n, DANS_ROR[typ](SIGN[n])]));
// de glada slagen i discot: händerna upp (10b, 10g), "Hurra!" (10k) och skrattkrokens hurra- och upp-rörelser (11g)
let DISCO_GLAD = null;
const discoGlad = () => DISCO_GLAD ??= (() => { const T = ANIM.TIDER, g = [T['10b'][0] + 0.45, T['10g'][0] + 0.45, T['10k'][0] + 0.3, T['10k'][0] + 0.3 + 2 * BEAT];
  for (let j = 0; T['11g'][0] + j * 4 * BEAT < KROK_SLUT; j++) if (['hurra', 'upp'].includes(KROK_ROR[j % KROK_ROR.length])) g.push(T['11g'][0] + j * 4 * BEAT + 0.35);
  return g; })();
// litet kritjärta med vit kant (som gnistorna), mitt (x, y), radie r
const HJ = 'M0 30C-40 6-44-26-21-32C-9-35-1-26 0-19C1-26 9-35 21-32C44-26 40 6 0 30Z';
// gula och guldfärgade hjärtan (Sanna 2026-11-11: "yellow and gold hearts"), vit klistermärkeskant, en ljus glans
const HJ_FARG = [['#FFD83D', '#FFF3B0'], ['#E9A91C', '#FFE08A']];
const hjarta = (x, y, r, op, i = 0) => { const [f, g] = HJ_FARG[i % 2]; return r > 0.5 && op > 0.01 && lagg('pynt', `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(r / 30).toFixed(3)})" opacity="${op.toFixed(2)}" stroke-linejoin="round">
  <path d="${HJ}" fill="#fff" stroke="#fff" stroke-width="14"/><path d="${HJ}" fill="${f}"/><path d="M-20-20C-14-26-8-24-6-18" fill="none" stroke="${g}" stroke-width="6" stroke-linecap="round"/></g>`); };
// Lages signatur: stolt, stryker sig över manen (en arm upp längs huvudet två gånger)
const manen = t0 => { const k = (TID - t0) / 1.6; if (k < 0 || k > 1) return null;
  return { armar: [10, 100 * Math.sin(Math.PI * k) + 14 * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k)], luta: -3 }; };
// dansGolv({ namn: { u, po, dx, dfot, ds } | null }, zoom, humle): de tre på golvet, glada och lugnt gungande om inget annat sägs.
// humle = { x, fot, s } eller null (hon sitter i bågen från 11d).
function dansGolv(o = {}, z = 1, humle = null) {   // Humle är inte med i discot (Sanna 2026-11-10: "remove bumblebee from disco")
  disco({ s: TID - SANG0 });
  for (const [n, [x0, k]] of Object.entries(DANS)) {
    if (o[n] === null) continue;
    const d = o[n] || DANS_ROR.glad(SIGN[n]);
    let po = typeof d.po === 'string' ? { bas: d.po } : { ...(d.po || {}) };
    const eft = Math.sin(SLAGV(TID - 0.14) / 2);
    po.oron ??= [5 * eft, -5 * eft];
    // figur-QA: mellan rörelserna vilar armarna nere längs kroppen och gungar i takt (Kanel stod med T-armar 2:41, 2:55, 3:38)
    if (!po.bas) po.armar ??= [-30 + 10 * eft, -30 - 10 * eft];
    if (n === 'lage') po.svans ??= 14 * Math.sin(SLAGV(TID) / 2 - 0.6);
    const bob = d.T ? 0 : 5 * (1 - Math.cos(SLAGV(TID + SIGN[n]))) / 2;
    // rundare dans (Sanna 2026-11-11): en mjuk sidogungning på halva takten ovanpå studsen, så att kroppen ritar en båge i stället för att bara gå upp och ner
    if (!d.T && !d.G) { const v = Math.sin(SLAGV(TID + SIGN[n]) / 2); po.x = (po.x ?? 0) + 26 * v; po.luta = (po.luta ?? 0) + 2.5 * v; }
    // små glada skutt på de glada slagen, lugna och låga; Hugo och Kanel lite efter Lage
    const ix = Object.keys(DANS).indexOf(n), ht = discoGlad().map(t => t + 0.12 * ix), hq = d.T ? null : hopp(TID, ht.filter(t => TID > t - 0.2 && TID < t + 0.7), 34, 0.4);
    if (hq) Object.assign(po, { strack: (po.strack ?? 0) + hq.po.strack, bred: (po.bred ?? 0) + hq.po.bred, ...(hq.po.benY[0] ? { benY: hq.po.benY } : {}) });
    const u = d.u || cykel(n, ['glad', 'jatteglad', 'glad', 'kawaii', 'jatteglad', 'glad'], 2.4 * Object.keys(DANS).indexOf(n));   // figur-QA: inga halvslutna ögon (Kanel såg sur ut 2:55)
    const fx = x0 + (d.dx || 0), ff = DGOLV + (d.dfot || 0) - bob - (hq ? hq.dy * k : 0), fs = k + (d.ds || 0);
    visa(n, { lager: d.lager || (n === 'lage' ? 'lage-ute' : 'figurer'), x: fx, fot: ff, s: fs, u, po, svans: n === 'lage' });
    // små hjärtan som stiger över huvudet på de glada slagen (ett per figur och tillfälle, så att det aldrig blir många samtidigt)
    for (const t0 of ht) { const q = (TID - t0 - 0.15) / 1.7; if (q > 0 && q < 1) { const [hx, hy] = iFigur(n, fx, ff, fs, [540, 150]);
      hjarta(hx + 22 * Math.sin(2 * Math.PI * q) + (ix - 1) * 14, hy - 50 - 170 * ease(q), 34 * fs / 0.6 * ease(q / 0.3), fas(q, 0, 0.12) * (1 - fas(q, 0.6, 1)), ix + ht.indexOf(t0)); } }   // mjukt upp, ingen studs
    // (filmens egna klappgnistor borttagna i figur-QA: riggen ritar sina vid händerna, de här låg över nosen)
  }
  if (humle) visa('humle', { lager: 'framfor', x: HUMLE_KULA[0] + 60 * Math.sin(TID * 0.9), fot: HUMLE_KULA[1] + 20 * Math.sin(TID * 1.8), s: 0.2, ...humleLiv(0, 1.4), skugga: false, ...humle });
  kamera(z, 960, z > 1 ? 620 : 540);
}
// 09b efter molnen: discot tänds, helikoptern landar, Kanel och Hugo vinkar, Lage hoppar ut till sin plats, helikoptern lyfter
const LAND_D = { x: 30, botten: 1012, s: 0.5 }, /* figur-QA 2:36: landar till vänster om Kanel (förut x 560, framför henne) */ UT0 = 158.9, UT1 = UT0 + 0.8;
function discoGolv(t) {
  disco({ s: t - SANG0, tand: fas(t, 156.4, 157.4) });
  const ner = ease((t - 155.5) / 2.3), bort = ease((t - 159.7) / 1.5);   // QA: helt ute ur bild före klippet 2:41,4
  const H = { ...LAND_D, x: LAND_D.x + 1700 * bort, botten: lerp(380, LAND_D.botten, ner) - 1200 * bort };
  const lucka = fas(t, UT0 - 0.4, UT0) * (1 - fas(t, UT1 + 0.05, UT1 + 0.4));
  heli({ ...H, rot: -3 * bort, lucka, lage: t < UT0 ? ['jatteglad', { armar: [30, 30] }] : null });
  const v = i => ({ u: 'jatteglad', po: { armar: [0, vink(157.6 + 0.25 * i, 3, 0.6, i ? 58 : 46)] } });   // i 0 = Hugo, lägre vinkning
  for (const [n, i] of [['hugo', 0], ['kanel', 1]]) visa(n, { lager: 'framfor', x: DANS[n][0], fot: DGOLV, s: DANS[n][1], ...v(i) });   // framför helikoptern
  if (t >= UT0 && t < UT1) lageHoppa((t - UT0) / (UT1 - UT0), H, { x: DANS.lage[0], fot: DGOLV, s: DANS.lage[1] }, hopp(t, [UT0], 0, UT1 - UT0).po, 1800);
  else if (t >= UT1) visa('lage', { lager: 'lage-ute', x: DANS.lage[0], fot: DGOLV, s: DANS.lage[1], u: 'jatteglad', po: { armar: [20, 20] }, svans: true });
}
// Klappen i takt (riggens klappa, träffar på T 1,0, 1,5, 2,0): en klapp per slag i raden
const klappSlag = (a, b) => { const b0 = slag(a, a + 2)[0]; return [b0, b0 + 2 * BEAT * Math.max(1, Math.floor((b - b0) / (2 * BEAT)))]; };
const klappT = (t, b0, b1) => { const x = (t - b0) / BEAT * 0.5;
  return t < b0 ? Math.max(0, 1 + x) : t < b1 ? 1 + ((x % 1) + 1) % 1 : Math.min(2.999, 2 + (t - b1) / BEAT * 0.5); };
const KLAPP_NER = { lage: 110, kanel: 60, hugo: 60 };
function klappRad(n, d) {
  const [b0, b1] = klappSlag(BILD0 + 0.3, BILD0 + d - 0.4), T = klappT(TID, b0, b1), [f, p] = FIG[n].L.ROR.klappa(T);
  // figur-QA 2026-11-11: händerna möts framför magen, inte vid hakan/nosen (armY sänker hela klappvägen i riggens px)
  return { u: { ...f, armar: FIG[n].L.NEUTRAL.armar }, po: { ...p, armY: (p.armY || 0) + (KLAPP_NER[n] || 0) * Math.min(1, T / 0.4, (3 - T) / 0.4) }, T };
}
function klappGnista(x, y, kl, sk = 1) {
  const T = kl.T; if (T < 1 || T > 2.25) return; const g = ((T - 1) % 0.5) / 0.22; if (g >= 1) return;
  const r0 = (36 + 50 * g) * sk, r1 = r0 + 44 * Math.sin(Math.PI * Math.min(1, 1.5 * g)) * sk, op = (1 - g * g).toFixed(2);
  const streck = [-160, -130, -50, -20].map(a => { const v = a * Math.PI / 180;
    return `M${(x + r0 * Math.cos(v)).toFixed(1)} ${(y + r0 * Math.sin(v)).toFixed(1)}L${(x + r1 * Math.cos(v)).toFixed(1)} ${(y + r1 * Math.sin(v)).toFixed(1)}`; }).join('');
  pynt(`<g opacity="${op}" stroke-linecap="round" fill="none"><path d="${streck}" stroke="#fff" stroke-width="${(18 * sk).toFixed(1)}"/><path d="${streck}" stroke="#F2C94C" stroke-width="${(10 * sk).toFixed(1)}"/></g>`);
}
// Bågen runt kulan: helikoptern, solen, bananen, humlan, smörblomman (frågelekens ordning)
const SLOT = { heli: [419, 200], sol: [625, 300], banan: [960, 345], humle: [1295, 300], blomma: [1501, 200] }, MITT = [960, 200], ALLA_KLISTER = Object.keys(SLOT);
// svarsordet i sang-v5.m4a (whisper, QA 2026-11-11): märket slås upp på ordet och flyger upp i bågen 0,85 s senare
const SVAR = { heli: 193.15, sol: 196.0, banan: 198.25, humle: 200.6, blomma: 203.1 };
function klistren(redan, ny, s, d, lager = 'pynt') {
  for (const n of [...redan, ...(ny ? [ny] : [])]) {
    const t = TID - SVAR[n], in_ = pop((t + 0.2) / 0.45), ut = ease((t - 0.85) / 0.65);
    if (in_ <= 0) continue;
    if (ut >= 1) { klistermarke(...SLOT[n], 100, n, 1, lager); continue; }
    klistermarke(lerp(MITT[0], SLOT[n][0], ut), lerp(MITT[1], SLOT[n][1], ut), lerp(160, 100, ut), n, in_);   // QA: högre och lite mindre, så att den inte täcker kaninens öron
    if (ut < 0.2) glitter(MITT[0], MITT[1], 200, t, 6);
  }
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
      <rect x="-3000" y="-2000" width="8000" height="5000" fill="#FDFBF4"/>   <!-- papperet fyller hela bilden, ingen arkkant (QA 2026-11-11) -->
      <g opacity="${(1 - fas(k, 0.12, 0.36)).toFixed(3)}">${bananSvg(...BANAN_PAPPER)}</g></g></g>`);   // QA 0:23,1: den ritade bananen tonas ut innan svansen syns
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
// Sanna 2026-11-10 ("remove the sun sticker … and similar"): bara där saken inte syns eller är för liten. Genomgånget: i alla sju
// (helikoptern 02d, solen 02e, bananen 04d/07d, humlan 05c, smörblomman 05e, svansen 08b) syns saken tydligt i bild, så inga kvar.
const ORD_RAD = {};
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
// varv 1 (10c–10e, QA 2026-11-11: Lage → helbild → Kanel var för hektiskt): en obruten åkning Lage → Kanel → Hugo, nära nog att
// grannarna mest är utanför bild, helbild först efter Hugo
const VARV1 = () => { const T = ANIM.TIDER, a = T['10c'][0], b = T['10d'][0], c = T['10e'][0], e = T['10e'][1];
  const k1 = ease((TID - b + 0.5) / 1.0), k2 = ease((TID - c + 0.5) / 1.0), inn = fas(TID, a, a + 0.7) * (1 - fas(TID, e - 0.9, e - 0.1));
  const x = lerp(lerp(DANS.lage[0], 880, k1), DANS.hugo[0], k2), z = lerp(lerp(1.4, 1.3, k1), 1.55, k2);   // QA2 2:50: på Kanel en trebild med Lage helt i bild, på Hugo är Lage helt ute
  kamera(lerp(1, z, inn), lerp(960, x, inn), lerp(540, 680, inn)); };
// varv 2 (10g–10j): åker från Lage till Hugo längs hela raden; helbild igen på "Hurra!" (10k)
const VARV2 = () => { const [a] = ANIM.TIDER['10g'], [b] = ANIM.TIDER['10k'], k = ease((TID - a) / (b - a)), z = 1 + 0.14 * fas(TID, a, a + 0.8) * (1 - fas(TID, b - 0.6, b + 0.2));
  kamera(z, lerp(760, 1060, k), 540); };   // QA2 3:06: Lage helt i bild hela åkningen   // QA: discokulan får plats upptill
// Frågeleken (11a–11e): kameran är nära klistermärket i mitten och drar sig ut när det flyger upp i bågen
// (in på 0,4 s, ute i helbild igen efter 1,6 s, så att svaret, kulan, Humle och alla tre syns när märket flyger upp i bågen)
const FRAGA = (s, d) => { const t = TID - SVAR[{ '11a': 'heli', '11b': 'sol', '11c': 'banan', '11d': 'humle', '11e': 'blomma' }[BILD]];
  kamera(1 + 0.2 * fas(t, -0.6, -0.1) * (1 - fas(t, 0.7, 1.3)), 960, 420); };
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
  [['oj-oj-1'], 23.4 + SNUBBEL + 0.1, 0.2, {}], [['duns-3'], 23.4 + SNUBBEL, 0.12, {}], [['duns-1'], 23.4 + PLOPP, 0.18, {}],   // QA3: mjukt duns när foten tar i stenen
  [['ledsen-1'], 23.4 + SNUBBEL + 2.2, 0.16, {}],   // 02a: snubblar och plumsar ner
  [['tass-1'], 42.2, 0.4, {}], [['helikopter-start-1'], 42.8, 0.3, { langd: 3.0, fade: 1.2 }],          // 02d: hoppar in, rotorn startar
  [['helikopter-surr-1'], 44.0, 0.11, { loop: true, langd: 38.6, fadeIn: 1.0, fade: 1.8 }],              // himlen och solen (vers1)
  [['glitter-1'], 38.6, 0.22, { langd: 1.2 }],                                                           // 02c: helikoptern glimmar
  [['moln-puff-1'], ANIM.TIDER['04d'][0] - BMOLN_IN + 0.2, 0.25, { langd: 1.2 }], [['moln-puff-2'], ANIM.TIDER['07d'][0] - BMOLN_IN + 0.2, 0.25, { langd: 1.2 }],
  ...['04d', '07d'].flatMap(id => eko(id).map((t, i) => [['mums-' + (i + 1)], t + 0.08, 0.35, {}])),     // en tugga per "mums"
  [['glitter-2'], 76.4, 0.22, { langd: 1.4 }], [['glitter-3'], 124.5, 0.22, { langd: 1.4 }],            // floden glittrar
  [['landa-mjuk-1'], 83.4, 0.4, {}], [['helikopter-stannar-1'], 82.6, 0.3, { langd: 2.4, fade: 0.8 }],   // 05a: landar, motorn stannar
  [['surr-1'], 83.2, 0.1, { langd: 3.9, fade: 1, fadeIn: 1.2 }], [['surr-2'], 87.1, 0.22, { langd: 2.0, fade: 0.6 }],   // humlan långt borta, kommer in
  ...eko('05c').map((t, i) => [['surr-' + (i % 4 + 1)], t, 0.2, { langd: 0.8 }]),
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
  ...Object.values(SVAR).map((t, i) => [['klistra-' + (i % 2 + 1), 'pop-1'], t + 1.45, 0.3, {}]),   // klistermärkena sätts fast
  ...Object.keys(ORD_RAD).map((id, i) => [['klistra-' + (i % 2 + 1), 'pop-1'], ordTid(id), 0.3, {}]),     // ordet i hörnet
  ...Object.keys(ROR_RAD).filter(id => ROR_RAD[id] !== 'klappa').map((id, i) => [['klistra-' + (i % 2 + 1), 'pop-1'], ANIM.TIDER[id][0], 0.2, {}]),   // rörelsen (svagt, som 013)
  [['ryt-gasp-1'], 205.2, 0.35, { langd: 0.8, fade: 0.35 }],                                             // 11f: Lages korta stolta ryt
  [['glitter-4'], 207.8, 0.25, { langd: 1.4 }],
  [['tass-3'], ANIM.TIDER['12a'][0] + 1.4, 0.4, {}],
  [['helikopter-surr-4'], HIN, 0.12, { loop: true, langd: 13.6, fadeIn: 0.8, fade: 3.0 }],   // slutet
  // ljudrunda 2026-11-10 (samma ljud för samma händelse, allt lågt under sången)
  ...MOLNPASS.map(([c], i) => [['swoosh-' + (i % 4 + 1)], c - 0.6, 0.2, { langd: 1.4, fade: 0.5 }]),          // molnpassagerna
  ...[41.85, 83.7, 100.75, 145.4, 158.9, 224.1].map((t, i) => [['hopp-mjuk-' + (i % 6 + 1)], t, 0.22, {}]),   // Lage hoppar (landningen är tass)
  ...[[41.4, 42.75], [ANIM.TIDER['04d'][0] + 0.5, eko('04d')[1] + 0.55], [83.3, 84.55], [100.35, 101.6], [ANIM.TIDER['07d'][0] + 0.5, eko('07d')[1] + 0.55],
    [145.0, 146.25], [158.5, 159.75], [223.7, 224.95]].flat().map(t => [['plopp-1'], t, 0.06, { langd: 0.6, fade: 0.3 }]),   // bubblan fälls upp och ner (tills vidare, ett riktigt lockklick saknas)
  [['helikopter-start-2'], 159.8, 0.18, { langd: 2.0, fade: 0.8 }], [['helikopter-start-1'], 226.0, 0.2, { langd: 2.4, fade: 1.0 }],   // rotorn varvar upp igen
  ...[87.4, 94.8, 132.6].map((t, i) => [['pling-' + (i + 1)], t, 0.18, {}]),                                  // humlan, smörblomman, svansen
  ...[ANIM.TIDER['04e'][0] + 0.9, ANIM.TIDER['07e'][0] + 0.8, ANIM.TIDER['10k'][0] + 0.7].map((t, i) => [['glitter-' + (i + 2)], t, 0.18, { langd: 1.2 }]),   // kawaiiögonen
  ...[[23.4, 21.0], [82.6, 22.4], [128.4, 20.5]].map(([t, l], i) => [['fagelkvitter-' + (i + 1)], t, 0.06, { loop: true, langd: l, fadeIn: 1.5, fade: 2.0 }]),   // fåglar under ängen
  ...['04', '07'].flatMap(id => [[id + 'd', 0.9], [id + 'f', 0.8], [id + 'f', 2.4]].map(([r, d]) => [['plopp-1'], ANIM.TIDER[r][0] + d, 0.12, {}])),     // bananerna dansar
  [['surr-1'], 100.8, 0.06, { loop: true, langd: 6.4, fadeIn: 0.8, fade: 1.5 }], [['surr-2'], 145.0, 0.06, { loop: true, langd: 7.5, fadeIn: 0.8, fade: 1.5 }],   // Humle följer med
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
    BILD = id; BILD0 = a; window.SVANS_S = svansS(TID);
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
