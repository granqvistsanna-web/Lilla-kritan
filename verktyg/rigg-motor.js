// Rörelsemotorn för v2-riggarna: allt som är lika för alla figurer, på ett ställe. En ändring här gäller alla figurer.
// Laddas efter blinka.js och före figurens egen kod:  <script src="../../../../verktyg/rigg-motor.js"></script>
// Figuren (uttryck.html) har kvar det som är dess eget: RIGG och måtten, NEUTRAL/UTTRYCK, POSE0/POSER, figur(), rita(),
// blanda/blandaPose/param, blinka, KLAPP/KLAPPNY, ett RORELSE-objekt med inställningar och ROR = { ...rorelser(), egna rörelser }.
// Funktionerna här läser figurens konstanter (POSE0, blanda, KLAPP, RORELSE …) först när de anropas, så ordningen spelar ingen roll.
// Kod som klipper ut en figur ur uttryck.html (v2-rigg.js, natt.js, gor-v2.py, bygg.mjs) lägger den här filen först.

const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => mix(v, b[i], k)) : a + (b - a) * k;
const fyll = (N, T, u) => typeof u === 'string' ? { ...N, ...T[u] } : { ...N, ...u };
const blandare = (N, T) => (a, b, k) => { const A = fyll(N, T, a), B = fyll(N, T, b), ut = {};
  for (const n in N) ut[n] = mix(A[n], B[n], Math.max(0, Math.min(1, k))); return ut; };
const kl = (a, b, x) => Math.max(a, Math.min(b, x)), mjuk = k => k * k * (3 - 2 * k);
const P = o => ({ ...POSE0, ...o });

// I avsnitt: ansikte('glad', 0.5) blandar halvvägs från neutral, pose('hurra', k) likadant för kroppen. De två går ihop.
// namn kan också vara ett objekt från blanda(a, b, k) / blandaPose(a, b, k), med stil (Bulle, Igge, Lova). fig: standard den första.
const forsta = () => document.querySelector('#figurer > g');
function ansikte(namn, k = 1, fig = forsta()) { if (namn && namn.stil) { fig.stil = namn.stil; const { stil, ...rest } = namn; namn = rest; }
  fig.ansikte = blanda('neutral', namn, k); rita(fig, fig.ansikte, fig.pose); }
function pose(namn, k = 1, fig = forsta()) { fig.pose = blandaPose('neutral', namn, k); rita(fig, fig.ansikte || param('neutral'), fig.pose); }
// riktning('vanster' | 'hoger', k): riktningsposen ovanpå posen, k 0–1. riktning(null) tar bort den.
function riktning(sida, k = 1, fig = forsta()) { fig.riktning = sida ? (sida === 'hoger' ? 1 : -1) * k : 0;
  rita(fig, fig.ansikte || param('neutral'), fig.pose || POSE0); }

// Figurens inställningar (const RORELSE = { … } i uttryck.html), det som saknas tas härifrån.
// svans vilsvansen ur t (null: ingen svans) · svansNyckel posens nyckel (Nicke: 'vick', antennerna) · svansGang/svansDans
// svansens utslag i gången/dansen ('vila': vilsvansen) · oron false: rörelserna rör inte öronen (Mor) · stegLuta gångens gung (grader)
// hoppArm armarna i luften ur l 0–1 · hopp: h höjd, sy/sx sträckning i luften, fot fötterna upp, tryck [sy, sx] i huken,
// ora [max, faktor] öronens eftersläp, vy false: inget eftersläp · kant kantklappens tal (standard KLAPP) · klappStart riktiga
// klappens start (standard KLAPP) · dansArmar (in_, s) → [v, h]
const RORELSE0 = { svans: t => Math.sin(t * 3) * 3, svansNyckel: 'svans', svansGang: 8, svansDans: 8, oron: true, stegLuta: 4,
  hoppArm: l => 16 * Math.sin(Math.PI * l),
  hopp: { h: 220, sy: 0.1, sx: -0.075, fot: -30, tryck: [0.12, 0.1], ora: [25, 0.9], vy: true },
  dansArmar: (in_, s) => [in_ * (8 + 10 * s), in_ * (8 - 10 * s)] };
const opt = () => { const o = typeof RORELSE === 'undefined' ? {} : RORELSE;
  return { ...RORELSE0, ...o, hopp: { ...RORELSE0.hopp, ...o.hopp } }; };
const svansen = (o, v) => o.svans === null ? {} : { [o.svansNyckel]: v };
const oronen = (o, v) => o.oron ? { oron: v } : {};

// Ett steg i gången (t sekunder, amp 0–1 stegens styrka, rikt −1 … 1 gångriktningen): riktningsposen åt det hållet,
// så att ansiktet och magen glider dit. Bakre armen ligger framför kroppen och sticker ut över kanten, den främre tittar fram
// på andra sidan, och de pendlar i otakt (gang 0–1, sving −1 … 1, se rita). Öronen rör sig bara lite.
const steg = (t, amp, rikt) => {
  const o = opt(), fi = t * 2.4 * Math.PI, f = Math.sin(fi) * amp, vy = Math.cos(fi) * Math.sign(Math.sin(fi)) * 12 * amp;
  const ora = kl(-8, 8, vy * 0.3), fl = Math.sin(t * 5);
  return [{ ...blanda('neutral', 'glad', 0.6), titt: [5 * Math.sign(rikt) * amp, 0] }, P({ rikt, luta: o.stegLuta * f, lyft: -Math.abs(f) * 12,
    ben: [16 * f, 16 * f], benY: [-40 * Math.max(0, -f), -40 * Math.max(0, f)], gang: Math.abs(rikt), sving: f,
    ...oronen(o, [ora + fl, ora - fl]) })];
};

// Den riktiga klappen: armarna kommer fram vid kanterna som i kantklappen (0–0,4 s), glider in framför magen (0,4–0,75 s),
// och händerna möts mitt framför bröstet tre gånger i takt (1,0, 1,5, 2,0 s) med en liten studs och tre kritstreck; sedan samma
// väg tillbaka. Figurens KLAPPNY ger måtten (se lk-figur), ?klapp=kant ger den gamla kantklappen.
const klappNy = t => {
  const o = opt(), K = o.klappStart || KLAPP;
  const T = t % 3, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (3 - T) / 0.4));
  const mot = mjuk(kl(0, 1, (T - 0.4) / 0.35)) * mjuk(kl(0, 1, (2.6 - T) / 0.35));
  const c = T > 0.75 && T < 2.25 ? Math.abs(Math.cos(Math.PI * (T - 0.75) / 0.5)) : 1;   // 0 = händerna möts
  const tc = 1 + 0.5 * Math.floor((T - 1) / 0.5), gl = (T - tc) / 0.25, gnista = T >= 1 && tc <= 2 && gl < 1 ? gl : 0;
  const A = mix(KLAPPNY.kontakt, KLAPPNY.oppen, c), v = mix(K.v, A[0], mot);
  const smack = in_ * mot * (1 - c) ** 4, f = blanda('glad', 'jatteglad', in_);
  return [blinka(f, t), P({ fram: [in_, in_], hand: 1, armar: mix([0, 0], [v, v], in_), klapp: in_ * mix(K.in, A[1], mot),
    armY: in_ * mix(K.ner, KLAPPNY.y, mot), gnista, strack: -0.025 * smack, bred: 0.02 * smack, lyft: 6 * smack,
    ...oronen(o, [4 * smack, 4 * smack]), ...svansen(o, o.svans && o.svans(t)) })];
};

// Standardrörelserna. Figuren: const ROR = { ...rorelser(), egna: t => …, };  (en egen med samma namn ersätter standarden)
// Loopar: klappa 3 s, hoppa 2,4 s, dansa 4 s, ga 8 s, sova och ligga 4 s per andetag.
const rorelser = () => ({
  klappa: t => KLAPPTYP === 'kant' ? ROR.klappaKant(t) : klappNy(t),
  klappaKant: t => {      // den gamla klappen: korta stumpar som klappar mot magens kanter, en liten studs på varje klapp
    const o = opt(), K = o.kant || KLAPP;
    const T = t % 3, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (3 - T) / 0.4));
    const c = T > 0.4 && T < 2.6 ? Math.abs(Math.sin(Math.PI * (T - 0.4) / 0.36)) : 1;   // 0 = händerna möts
    const smack = in_ * (1 - c) ** 4;
    const f = blanda('glad', 'jatteglad', in_);
    return [blinka(f, t), P({ fram: [in_, in_], armar: mix([0, 0], [K.v + K.dv * c, K.v + K.dv * c], in_),
      klapp: in_ * (K.in - K.din * c), armY: in_ * K.ner, strack: -0.025 * smack, bred: 0.02 * smack, lyft: 6 * smack,
      ...oronen(o, [4 * smack, 4 * smack]), ...svansen(o, o.svans && o.svans(t)) })];
  },
  // Hoppet: huk 0,35 s, 1 s i luften, landning 0,3 s. Sträckningen följer farten (störst vid avstampet och före landningen,
  // ingen i toppen), och allt som slås på i luften (sträckning, fötter, öron, glada ögon) mjukas in och ut på 0,1 s.
  hoppa: t => {
    const o = opt(), H = o.hopp, k = t % 2.4, l = k > 0.35 && k < 1.35 ? (k - 0.35) / 1.0 : -1;
    let lyft = 0, vy = 0, sy = 0, sx = 0, arm = 0, fot = 0, glad = 0;
    if (l >= 0) { const kant = mjuk(kl(0, 1, l / 0.1)) * mjuk(kl(0, 1, (1 - l) / 0.1)), fart = Math.abs(1 - 2 * l) * kant;
      lyft = -4 * H.h * l * (1 - l); if (H.vy) vy = -4 * H.h * (1 - 2 * l) / 30 * kant; sy = H.sy * fart; sx = H.sx * fart;
      arm = o.hoppArm(l); fot = H.fot * kant; glad = kant; }
    else { const tryck = k <= 0.35 ? Math.sin(k / 0.35 * Math.PI) : Math.sin(kl(0, 1, (k - 1.35) / 0.3) * Math.PI);
      sy = -H.tryck[0] * tryck; sx = H.tryck[1] * tryck; arm = -12 * tryck; }
    const ora = kl(-H.ora[0], H.ora[0], vy * H.ora[1]);
    return [blinka(blanda('glad', 'jatteglad', glad), t), P({ lyft, strack: sy, bred: sx, armar: [arm, arm], benY: [fot, fot],
      ...(H.vy ? oronen(o, [ora, ora]) : {}), ...svansen(o, o.svans && o.svans(t)) })];
  },
  ga: t => {          // går fram och tillbaka (8 s), saktar in och vänder vid kanterna, svansen vickar i takt med stegen
    const o = opt(), T = t % 8, fart = Math.cos(T / 8 * 2 * Math.PI);
    const [f, p] = steg(T, Math.min(1, Math.abs(fart) * 1.6), kl(-1, 1, fart * 1.6));
    const sv = o.svansGang === 'vila' ? o.svans && o.svans(t) : o.svansGang * Math.sin(T * 2.4 * Math.PI) * Math.min(1, Math.abs(fart) * 1.6);
    return [blinka(f, t), { ...p, x: 520 * Math.sin(T / 8 * 2 * Math.PI), ...svansen(o, sv) }];
  },
  // sova och ligga bara för figurer som har poserna 'sover' och 'liggMage'
  ...(POSER.liggMage && { ligga: t => {       // ligger på magen med händerna under hakan och sover: ett andetag var 4:e sekund
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'liggMage', 1), strack: -0.3 + 0.02 * a, bred: 0.18 + 0.015 * a }]; } }),
  ...(POSER.sover && { sova: t => {        // sover: lugna andetag (4 s per andetag), magen höjs och breddas lite, öronen följer med
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'sover', 1), strack: -0.03 + 0.02 * a, bred: 0.04 + 0.012 * a,
      oron: [10 - 3 * a, 10 - 3 * a], upp: -0.6 + 0.08 * a }];
  } }),
  dansa: t => {       // gungar i takt (1 s per gung), armarna turas om upp, foten lyfts på motsatt sida; sjätte studsen är ett litet hopp
    const o = opt(), T = t % 4, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (4 - T) / 0.4)), fi = 2 * Math.PI * T, s = Math.sin(fi) * in_;
    const studs = Math.abs(Math.sin(fi)) * in_, eft = Math.sin(fi - 0.8) * in_;
    const f = blanda('glad', 'jatteglad', in_);
    return [blinka(f, t), P({ luta: 5 * s, lyft: -(14 + 26 * (T >= 2.5 && T < 3)) * studs, strack: (0.02 + 0.03 * (T >= 2.5 && T < 3)) * studs,
      armar: o.dansArmar(in_, s), benY: [-18 * Math.max(0, s), -18 * Math.max(0, -s)], ben: [6 * Math.max(0, s), 6 * Math.max(0, -s)],
      ...oronen(o, [6 * eft, -6 * eft]), ...svansen(o, o.svansDans * Math.sin(2 * fi) * in_) })];
  },
});

// Liv i allt som står stilla: figuren andas (3,6 s per andetag: kroppen lite högre och bredare, öronen spetsas lite).
// Inte när den sover, sova och ligga andas själva.
const liv = (f, p, t) => { if ((f.sov || 0) > 0.5) return p; const a = (1 - Math.cos(2 * Math.PI * t / 3.6)) / 2;
  return { ...p, strack: p.strack + 0.012 * a, bred: p.bred + 0.006 * a, oron: p.oron.map(o => o - 2 * a) }; };
// rorelse('klappa' | 'hoppa' | 'dansa' | 'ga' …, t, fig): hela uttryck + pose ur t, så att en film kan renderas bild för bild.
// Rörelsen styr armarna själv, så uttryckets armar (jätteglad lyfter dem) räknas inte med.
function rorelse(namn, t, fig = forsta()) { const [f0, p0] = ROR[namn](t), f = { ...f0, armar: NEUTRAL.armar }, p = liv(f, p0, t);
  fig.ansikte = f; fig.pose = p; rita(fig, f, p); }
