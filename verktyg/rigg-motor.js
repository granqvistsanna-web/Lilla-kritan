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
// klappens start (standard KLAPP) · dansArmar (in_, s) → [v, h] · boj true: kroppen böjer sig från fötterna (posens boj, se huvud)
// · blick frö: figuren ser sig om när den står och väntar (se vila); utan: ingen vila
const RORELSE0 = { svans: t => Math.sin(t * 3) * 3, svansNyckel: 'svans', svansGang: 8, svansDans: 8, oron: true, stegLuta: 4, boj: false, blick: 0,
  hoppArm: l => 16 * Math.sin(Math.PI * l),
  hopp: { h: 220, sy: 0.1, sx: -0.075, fot: -30, tryck: [0.12, 0.1], ora: [25, 0.9], vy: true },
  dansArmar: (in_, s) => [in_ * (8 + 10 * s), in_ * (8 - 10 * s)] };
const opt = () => { const o = typeof RORELSE === 'undefined' ? {} : RORELSE;
  return { ...RORELSE0, ...o, hopp: { ...RORELSE0.hopp, ...o.hopp } }; };
const svansen = (o, v) => o.svans === null ? {} : { [o.svansNyckel]: v };
const oronen = (o, v) => o.oron ? { oron: v } : {};
const bojen = (o, v) => o.boj ? { boj: v } : {};
// Hur mycket av riktningen som armarna följer (0–1). rikt vänder bara ansiktet, magen och öronen; BÅDA armarna kommer ut på
// den sidan bara när posen ber om det (bada 0–1: riktningsposerna, håller, når) eller riktning() är satt (köra, skjuta).
// Så hamnar inte båda armarna på en sida av misstag när figuren bara tittar eller rör sig åt ett håll (Sanna 2026-11-11).
const armSida = (fig, p, a) => a * Math.max(p.bada || 0, fig.riktning ? 1 : 0);

// Ett steg i gången (t sekunder, amp 0–1 stegens styrka, rikt −1 … 1 gångriktningen): riktningsposen åt det hållet,
// så att ansiktet och magen glider dit. Bakre armen ligger framför kroppen och sticker ut över kanten, den främre tittar fram
// på andra sidan, och de pendlar i otakt (gang 0–1, sving −1 … 1, se rita). Öronen rör sig bara lite.
const steg = (t, amp, rikt, fl = Math.sin(t * 5)) => {   // fl: öronens fladder (ga skickar en som går jämnt upp på 8 s)
  const o = opt(), fi = t * 2.4 * Math.PI, f = Math.sin(fi) * amp, vy = Math.cos(fi) * Math.tanh(3 * Math.sin(fi)) * 12 * amp;   // tanh, inte sign: öronen vänder mjukt vid varje steg
  const ora = kl(-8, 8, vy * 0.3);
  return [{ ...blanda('neutral', 'glad', 0.6), titt: [5 * Math.sign(rikt) * amp, 0] }, P({ rikt, luta: o.stegLuta * f, lyft: -Math.abs(f) * 12,
    ben: [16 * f, 16 * f], benY: [-40 * Math.max(0, -f), -40 * Math.max(0, f)], gang: Math.abs(rikt), sving: f,
    ...oronen(o, [ora + fl, ora - fl]), ...bojen(o, 3.5 * rikt) })];
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
    const c = 1 - (1 - Math.abs(Math.sin(Math.PI * (T - 0.4) / 0.36))) * mjuk(kl(0, 1, (T - 0.4) / 0.15)) * mjuk(kl(0, 1, (2.6 - T) / 0.15));   // 0 = händerna möts; klappandet tonar in och ut
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
      arm = o.hoppArm(l) * kant; fot = H.fot * kant; glad = kant; }
    else { const tryck = k <= 0.35 ? Math.sin(k / 0.35 * Math.PI) : Math.sin(kl(0, 1, (k - 1.35) / 0.3) * Math.PI);
      sy = -H.tryck[0] * tryck; sx = H.tryck[1] * tryck; arm = -12 * tryck; }
    const ora = kl(-H.ora[0], H.ora[0], vy * H.ora[1]);
    return [blinka(blanda('glad', 'jatteglad', glad), t), P({ lyft, strack: sy, bred: sx, armar: [arm, arm], benY: [fot, fot],
      ...(H.vy ? oronen(o, [ora, ora]) : {}), ...svansen(o, o.svans && o.svans(t)) })];
  },
  ga: t => {          // går fram och tillbaka (8 s), saktar in och vänder vid kanterna, svansen vickar i takt med stegen
    // Stegklockan följer farten till hälften (som filmens gang) och ger exakt 10 steg-perioder på 8 s, så att loopen går
    // ihop utan hopp: vag = ∫0..T |cos(w·s)| ds i sluten form, normerad så att medeltakten blir stegens 1,25 Hz.
    const o = opt(), T = t % 8, w = Math.PI / 4, u = w * T, k = Math.round(u / Math.PI), fart = Math.cos(u);
    const vag = (2 * k + (k % 2 ? -1 : 1) * Math.sin(u)) / w, c = (0.5 * T + 0.5 * (Math.PI / 2) * vag) * 2.5 / 2.4;
    const amp = Math.min(1, Math.abs(fart) * 1.6), [f, p] = steg(c, amp, kl(-1, 1, fart * 1.6), Math.sin(T * 1.5 * Math.PI));
    const sv = o.svansGang === 'vila' ? o.svans && o.svans(t) : o.svansGang * Math.sin(c * 2.4 * Math.PI) * amp;
    return [blinka(f, t), { ...p, x: 520 * Math.sin(u), ...svansen(o, sv) }];
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
  // skakar på huvudet med surt ansikte (3,4 s: 2,5 varv på 2,6 s, sedan vila), nickar glatt (2,4 s: två dippar på 1,6 s, sedan vila)
  skaka: t => { const T = t % 3.4, [f, p] = skakaHuvud(blanda('neutral', 'ledsen', 0.7), P(), T); return [blinka(f, t), p]; },
  nicka: t => { const T = t % 2.4, [f, p] = nicka(param('glad'), P(), T); return [blinka(f, t), p]; },
  dansa: t => {       // gungar i takt (1 s per gung), armarna turas om upp, foten lyfts på motsatt sida; sjätte studsen är ett litet hopp
    const o = opt(), T = t % 4, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (4 - T) / 0.4)), fi = 2 * Math.PI * T, s = Math.sin(fi) * in_;
    const studs = Math.abs(Math.sin(fi)) * in_, eft = Math.sin(fi - 0.8) * in_;
    const f = blanda('glad', 'jatteglad', in_);
    return [blinka(f, t), P({ luta: (o.boj ? 2 : 5) * s, ...bojen(o, 3.5 * s), lyft: -(14 + 26 * (T >= 2.5 && T < 3)) * studs, strack: (0.02 + 0.03 * (T >= 2.5 && T < 3)) * studs,
      armar: o.dansArmar(in_, s), benY: [-18 * Math.max(0, s), -18 * Math.max(0, -s)], ben: [6 * Math.max(0, s), 6 * Math.max(0, -s)],
      ...oronen(o, [6 * eft, -6 * eft]), ...svansen(o, o.svansDans * Math.sin(2 * fi) * in_) })];
  },
});

// ---------- Skaka på huvudet ("nej") och nicka ("ja") ----------
// Kroppen och huvudet är en bit, så "huvudet" är ansiktsgruppen .drag (ögon, nos, kinder, mun) och öronen. Posen bär två
// nycklar (finns i varje figurs POSE0): skak [ansiktet, öronen] −1 … 1 åt sidan, nick [ansiktet, öronen] 0 … 1 nedåt.
// Andra talet är öronens eftersläpande kopia. huvud() anropas sist i varje figurs rita() och lägger förskjutningen framför
// det rita() just satte (ansiktet högst 24 px åt sidan och 3°, 20 px ner; öronen 10/8 px), så huvudet lossnar aldrig.
// Den minns vad den själv skrev, så en del som rita() inte sätter om varje gång får inte förskjutningen två gånger.
const huvud = (fig, p) => { const [s, sl] = p.skak || [0, 0], [n, nl] = p.nick || [0, 0];
  const satt = (e, pre, post = '') => { const nu = e.getAttribute('transform') || '', bas = nu === e._hUt ? e._hBas : nu;
    e._hBas = bas; e._hUt = [pre, bas, post].filter(Boolean).join(' '); e.setAttribute('transform', e._hUt); };
  // boj (grader, + åt höger): hela figuren skjuvas från fötterna, så att huvudet lutar sig dit medan fötterna står kvar platt
  if (p.boj !== undefined) satt(fig.querySelector(':scope > g'), '', p.boj ? `translate(512 ${FOTTER}) skewX(${-p.boj}) translate(-512 ${-FOTTER})` : '');
  fig.querySelectorAll('.drag').forEach(e => satt(e, s || n ? `translate(${24 * s} ${20 * n}) rotate(${3 * s} 512 430)` : ''));
  fig.querySelectorAll('.ear-l, .ear-r').forEach(e => satt(e, sl || nl ? `translate(${10 * sl} ${8 * nl})` : '')); };
// Lägg en skakning eller ett nick ovanpå valfritt [ansikte, pose] i ett avsnitt, tl = sekunder in i rörelsen, d dess längd:
//   tl => skakaHuvud(blanda('neutral', 'ledsen', 0.7), P(), tl)      tl => nicka(param('glad'), P(), tl)
// skakaHuvud: lugnt fram och tillbaka, varv gånger (standard 2,5 på 2,6 s, ca 1 s per varv), blicken följer med, kroppen
// lutar högst 1,5°, öronen släpar 0,9 rad efter och lutar 6°. nicka: ggr små nedåt-uppåt-dippar (standard 2 på 1,6 s),
// blicken lite ner, kroppen trycks ihop en aning, öronen släpar och hänger 8°. Båda tonar in och ut, början och slut = vila.
const skakaHuvud = (f, p, tl, d = 2.6, varv = 2.5) => {
  const e = mjuk(kl(0, 1, tl / 0.35)) * mjuk(kl(0, 1, (d - tl) / 0.45)), fas = 2 * Math.PI * varv * kl(0, d, tl) / d;
  const sk = e * Math.sin(fas), sl = e * Math.sin(fas - 0.9), o = opt();
  return [{ ...f, titt: [f.titt[0] + 9 * sk, f.titt[1] + 2 * e] }, { ...p, skak: [sk, sl], luta: p.luta + 1.5 * sk,
    ...oronen(o, [p.oron[0] + 6 * sl, p.oron[1] - 6 * sl]) }];
};
const nicka = (f, p, tl, d = 1.6, ggr = 2) => {
  const ut = kl(0, 1, tl / d), dipp = u => (1 - Math.cos(2 * Math.PI * ggr * u)) / 2;
  const n = dipp(ut), nl = dipp(kl(0, 1, (ut - 0.1) / 0.9)), o = opt();
  return [{ ...f, titt: [f.titt[0], f.titt[1] + 5 * n] }, { ...p, nick: [n, nl], strack: p.strack - 0.012 * n, bred: p.bred + 0.006 * n,
    ...oronen(o, [p.oron[0] + 8 * nl, p.oron[1] + 8 * nl]) }];
};

// Liv i allt som står stilla: figuren andas (3,6 s per andetag: kroppen lite högre och bredare, öronen spetsas lite).
// Inte när den sover, sova och ligga andas själva.
const liv = (f, p, t) => { if ((f.sov || 0) > 0.5) return p; const a = (1 - Math.cos(2 * Math.PI * t / 3.6)) / 2;
  return { ...p, strack: p.strack + 0.012 * a, bred: p.bred + 0.006 * a, oron: p.oron.map(o => o - 2 * a) }; };
// Vila: liv i en figur som står och väntar (RORELSE.blick = frö, som blinkningens; utan: ingenting). Var 3–5:e sekund ser den
// åt sidan en stund: ögonen först (0,18 s), ansiktet följer 0,12 s efter (skak, ca 4 px), tyngden flyttas sakta dit (boj 1,2°),
// och före fyra av tio blickar vippar örat på den sidan till (hörde något → tittar). Tonas bort när scenen själv styr blicken
// (titt), och när ögonen är glada bågar eller sover. filmHjalp().stilla använder den; i ett avsnitt: tl => vila(ansikte, pose, tl).
const blickar = {};
const blickLista = fro => blickar[fro] || (blickar[fro] = (() => { let s = (fro * 7919 + 101) % 233280, t = 0.8; const ut = [];
  const sl = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (t += sl(); t < 900;) { const h = 0.7 + 0.9 * sl(); ut.push([t, (sl() < 0.5 ? -1 : 1) * (6 + 3 * sl()), -2 + 3 * sl(), h, sl() < 0.4]); t += h + 1.8 + 2.2 * sl(); }
  return ut; })());
const vila = (f, p, t) => { const o = opt(); if (!o.blick) return [f, p];
  const w = (1 - Math.min(1, Math.hypot(...f.titt) / 10)) * (1 - Math.max(...[f.sov || 0].flat(), ...f.glad));   // sov är ett tal, hos grodan [v, h]
  const puls = (t0, h, in_, ut) => mjuk(kl(0, 1, (t - t0) / in_)) * mjuk(kl(0, 1, (t0 + h + ut - t) / ut));
  let tx = 0, ty = 0, hv = 0, or = 0, tyngd = 0; const vipp = [0, 0];
  for (const [t0, dx, dy, h, ora] of blickLista(o.blick)) { if (t0 - 0.5 > t) break; if (t > t0 + h + 1) continue;
    const k = w * puls(t0, h, 0.18, 0.25), s = w * Math.sign(dx), u = (t - t0 + 0.35) / 0.3;
    tx += dx * k; ty += dy * k; hv += s * puls(t0 + 0.12, h, 0.3, 0.35); or += s * puls(t0 + 0.2, h, 0.3, 0.4); tyngd += s * puls(t0 + 0.1, h, 0.6, 0.6);
    if (ora && u > 0 && u < 1) vipp[dx < 0 ? 0 : 1] -= 8 * w * Math.sin(Math.PI * u); }
  return [{ ...f, titt: [f.titt[0] + tx, f.titt[1] + ty] }, { ...p, skak: [p.skak[0] + 0.16 * hv, p.skak[1] + 0.12 * or],
    ...oronen(o, [p.oron[0] + vipp[0], p.oron[1] + vipp[1]]), ...bojen(o, (p.boj || 0) + 1.2 * tyngd) }]; };
// rorelse('klappa' | 'hoppa' | 'dansa' | 'ga' …, t, fig): hela uttryck + pose ur t, så att en film kan renderas bild för bild.
// Rörelsen styr armarna själv, så uttryckets armar (jätteglad lyfter dem) räknas inte med.
function rorelse(namn, t, fig = forsta()) { const [f0, p0] = ROR[namn](t), f = { ...f0, armar: NEUTRAL.armar }, p = liv(f, p0, t);
  fig.ansikte = f; fig.pose = p; rita(fig, f, p); }

// ---------- Kroppsrörelser ----------
// Sätta sig, lägga sig, gå i trappa, klättra på stege (2026-11-11, provat på ugglan). Bara figurer som lägger in dem i sin
// egen ROR använder dem, så inget här ändrar de andra riggarna. Figurens tal står i RORELSE.satta / .lagga / .trappa / .stege,
// det som saknas tas ur KROPPROR0 (ugglans tal):
// satta: pose sittposen i POSER · huk hur mycket kroppen trycks ihop före sjunket · landa den mjuka sättningen när den sitter · stot sträckningen när den reser sig
// lagga: pose det som ändras i sittposen innan den lägger sig (armarna längs kroppen, klapp = inskjutna bakom den) · kropp [cx, cy, rx, ry] kroppens ellips i figurens ruta
// (mät ur body.png) · vinkel hur långt den lägger sig på sidan (grader, − = huvudet åt vänster)
// trappa: h steghöjd · djup stegdjup (figurens px; ca 2 × fötternas avstånd, så att en fot bara byter steg när den är i luften)
// · takt sekunder per steg · fot fotens extra lyft · luta boj in i steget (grader)
// stege: r pinnarnas avstånd (figurens px; välj så att handen i armen uppe, upp grader, hamnar på en pinne) · bredd skenornas
// avstånd från mitten (precis utanför kroppen, där händerna är) · upp armens sträck och grepp dess håll (grader; båda över
// gömzonen, GOM.till, så armarna syns hela klättringen) · takt sekunder per pinne · fot fotens extra lyft
const KROPPROR0 = { satta: { pose: 'sitter', huk: 0.05, landa: 0.025, stot: 0.03 }, lagga: { pose: { armar: [-30, -30], klapp: 80, upp: -0.5, oron: [10, 10] }, kropp: [512, 506, 290, 326], vinkel: -78 },
  trappa: { h: 90, djup: 340, takt: 1.2, fot: 22, luta: 3 },
  stege: { r: 121, bredd: 400, upp: 96, grepp: 82, takt: 1.3, fot: 18 } };
const kroppTal = n => ({ ...KROPPROR0[n], ...((typeof RORELSE !== 'undefined' && RORELSE[n]) || {}) });
const puls = (u, a, b) => Math.sin(Math.PI * kl(0, 1, (u - a) / (b - a)));   // 0 → 1 → 0 mellan a och b
// sattaSig(f, p, tl, d, upp): sätter sig ner (upp = false) eller reser sig (upp = true) på d s, från/till den stående [f, p].
// Ner: blicken går ner först, en liten huk, kroppen sjunker och sätter sig mjukt; benen glider ut och lyfts samtidigt
// (sittposens ben + benY), så att rötterna stannar gömda. Upp: blicken upp först, ett litet tryck nedåt, kroppen reser sig
// och sträcker på sig lite av farten. Tofsarna/öronen släpar lite efter. Slutet av ner = början av upp = sitter.
const sattaSig = (f, p, tl, d = 1.6, upp = false) => {
  const S = kroppTal('satta'), u = 1.6 * kl(0, d, tl) / d, sitt = { ...p, ...POSER[S.pose] };
  let s, v, ner, huk, landa, blick;
  if (!upp) { const x = kl(0, 1, (u - 0.3) / 0.85); s = mjuk(x); v = 6 * x * (1 - x) / 1.5;   // v 0–1: farten nedåt
    blick = mjuk(kl(0, 1, u / 0.25)) * (1 - mjuk(kl(0, 1, (u - 1.05) / 0.35))); ner = 1;
    huk = puls(u, 0.1, 0.6); landa = puls(u, 1.0, 1.55); }
  else { const x = kl(0, 1, (u - 0.4) / 0.75); s = 1 - mjuk(x); v = -6 * x * (1 - x) / 1.5;
    blick = mjuk(kl(0, 1, u / 0.25)) * (1 - mjuk(kl(0, 1, (u - 1.1) / 0.4))); ner = -0.6;
    huk = 0.7 * puls(u, 0.15, 0.6); landa = -(S.stot / S.landa) * puls(u, 0.85, 1.45); }
  const q = blandaPose(p, sitt, s);
  return [{ ...f, titt: [f.titt[0], f.titt[1] + 7 * ner * blick] }, { ...q, upp: q.upp - 0.25 * ner * blick,
    strack: q.strack - S.huk * huk - S.landa * landa, bred: q.bred + 0.6 * (S.huk * huk + S.landa * landa),
    armar: q.armar.map(a => a + 8 * Math.sin(Math.PI * s) * (upp ? 0.5 : 1)), oron: q.oron.map(o => o - 6 * v + 4 * Math.max(0, landa)) }];
};
// ?rorelse=satta (7 s): står, sätter sig (1,6 s), sitter glad och tittar åt sidan, reser sig (1,4 s), står.
const sattaSlinga = t => { const T = t % 7, b = P(), f0 = blanda('neutral', 'glad', 0.5);
  const glad = blanda(f0, 'glad', mjuk(kl(0, 1, (T - 1.8) / 0.5)) * (1 - mjuk(kl(0, 1, (T - 4.4) / 0.5)))), titt = 9 * puls(T, 2.9, 4.1);
  const [f, p] = T < 0.6 ? [f0, b] : T < 4.8 ? sattaSig(glad, b, T - 0.6, 1.6) : sattaSig(glad, b, T - 4.8, 1.4, true);
  return [blinka({ ...f, titt: [f.titt[0] + titt, f.titt[1]] }, t), p]; };

// Lägga sig (Sannas regel: sover = blundar och ligger på sidan, aldrig stående). Figuren sätter sig först (sattaSig),
// sänker armarna längs kroppen och skjuter in dem bakom den (lagga.pose), blundar och lägger sig sedan på sidan: kroppen vrids kring sin egen mitt,
// inte kring fötterna (då faller den som en planka), och sänks så att den ligger kvar på golvet. Mitten står kvar i sidled.
// Posens ligg = vinkeln (grader), golv = [kroppens, skuggans] höjd över marken (px, trappan), och skuggans styrka 0–1 som
// tredje tal (finns det ett tredje tal står figuren i trappan: skuggan blir smalare, så att den får plats på steget). Figurens rita() anropar kroppRita(fig, f, p)
// före huvud(fig, p): den lägger vridningen och höjden framför det rita() just satte, och flyttar skuggan upp på steget.
const kroppRita = (fig, f, p) => { const a = p.ligg || 0, [g, gs, so] = p.golv || [0, 0], sk = fig.querySelector('.skugga');
  if (!a && !g && !gs && so === undefined) return sk.removeAttribute('transform');
  const e = fig.querySelector(':scope > g'); let pre = g ? `translate(0 ${-g})` : '';
  if (a) { const [cx, cy, rx, ry] = kroppTal('lagga').kropp, sx = 1 + p.bred, sy = f.strack + p.strack, r = a * Math.PI / 180;
    const my = cy - (sy - 1) * (FOTTER - cy) + p.sank;   // kroppens mitt efter sträckningen och sjunket
    const dy = ry * sy - Math.hypot(rx * sx * Math.sin(r), ry * sy * Math.cos(r));   // ellipsens lägsta punkt stannar på golvet
    pre += ` translate(0 ${dy}) rotate(${a} ${cx + p.x} ${my + p.lyft})`;
    sk.setAttribute('rx', sk.getAttribute('rx') * (1 + 0.15 * Math.abs(Math.sin(r)))); }
  // på trappan: skuggan följer med upp och blir smalare (den får plats på steget)
  if (so !== undefined) { sk.setAttribute('transform', `translate(0 ${-gs})`); sk.setAttribute('rx', sk.getAttribute('rx') * 0.55);
    sk.setAttribute('opacity', sk.getAttribute('opacity') * so); }
  else sk.removeAttribute('transform');
  e.setAttribute('transform', `${pre} ${e.getAttribute('transform') || ''}`); };
// laggaSig(f, p, tl, d, upp, sova): lägger sig (d ca 4 s) eller reser sig (upp, d ca 3,6 s) från/till den stående [f, p].
// Efter d fortsätter den att ligga och andas (ett andetag var 4:e s), så ett avsnitt kan ligga kvar så länge det vill.
// sova false: vilar med öppna ögon (andningen kommer då från liv()). Ner (4 s): sätter sig 0–1,6, armarna in längs kroppen
// 1,4–2,4, blundar 1,9–2,4, lägger sig på sidan 2,2–3,6. Upp (3,6 s): öppnar ögonen 0–0,5, lite tryck, upp till sittande
// 0,5–1,7, armarna ut 1,3–1,9, reser sig 1,9–3,5 (sattaSig upp). Tofsarna/öronen släpar efter vridningen.
const laggaSig = (f, p, tl, d, upp = false, sova = true) => { d ??= upp ? 3.6 : 4;
  const S = kroppTal('lagga'), u = (upp ? 3.6 : 4) * Math.max(0, tl) / d, ligg = { ...p, ...POSER[kroppTal('satta').pose], ...S.pose };
  const somn = (ff, k) => sova ? blanda(ff, 'sover', k) : ff, vrid = x => [mjuk(x), 6 * x * (1 - x)];
  let F, Q, k, w, x, a;
  if (!upp) { [F, Q] = sattaSig(sova ? blanda(f, 'somnig', mjuk(kl(0, 1, (u - 0.2) / 1.0))) : f, p, Math.min(u, 1.6), 1.6);
    F = somn(F, mjuk(kl(0, 1, (u - 1.9) / 0.5))); k = mjuk(kl(0, 1, (u - 1.4) / 1.0)); x = kl(0, 1, (u - 2.2) / 1.4);
    const [v, dv] = vrid(x); a = v; w = dv / 1.4; }
  else { const sitt = u < 1.9; [F, Q] = sattaSig(f, p, sitt ? 0 : u - 1.9, 1.6, true);
    F = somn(F, 1 - mjuk(kl(0, 1, u / 0.5))); k = 1 - mjuk(kl(0, 1, (u - 1.3) / 0.6)); x = kl(0, 1, (u - 0.5) / 1.2);
    const [v, dv] = vrid(x); a = 1 - v; w = -dv / 1.2;
    const tryck = puls(u, 0.3, 0.8); Q = { ...Q, strack: Q.strack - 0.03 * tryck, bred: Q.bred + 0.02 * tryck }; }
  // andas när den sover och ligger: från 3,4 s (ner), och tonar ut när den vaknar (upp); båda börjar/slutar på utandning
  const and = sova ? (upp ? (1 - Math.cos(2 * Math.PI * u / 4)) / 2 * (1 - mjuk(kl(0, 1, (u - 0.3) / 0.8)))
    : (1 - Math.cos(2 * Math.PI * Math.max(0, u - 3.4) / 4)) / 2) : 0;
  const q = blandaPose(Q, ligg, k);
  return [F, { ...q, ligg: S.vinkel * a, strack: q.strack + 0.02 * and, bred: q.bred + 0.012 * and,
    oron: q.oron.map(o => o + 5 * w - 3 * and) }];
};
// ?rorelse=lagga (12,5 s): står, lägger sig och sover (ligger 3,4 andetag), vaknar och reser sig. ?rorelse=laggaVila: samma
// med öppna ögon, glad, ser sig om när den ligger. Liggtiden är hela andetag, så att andningen går ihop med uppvaknandet.
const laggaSlinga = (t, sova = true) => { const T = t % 12.5, b = P(), f0 = blanda('neutral', 'glad', sova ? 0.3 : 0.6);
  const titt = sova ? 0 : 9 * puls(T, 5.2, 6.6);
  const [f, p] = T < 0.5 ? [f0, b] : T < 7.9 ? laggaSig(f0, b, T - 0.5, 4, false, sova) : laggaSig(f0, b, T - 7.9, 3.6, true, sova);
  return [blinka({ ...f, titt: [f.titt[0] + titt, f.titt[1]] }, t), p]; };

// Gå i trappa (framifrån, i sidled längs trappan): trappa(f, p, tl, n, upp, dir), d = n × takt s. Varje steg: blicken är redan
// på trappan, främre foten lyfts upp på nästa steg, kroppen lutar sig in (boj) och reser sig en steghöjd, bakre foten följer.
// Nedför: foten glider ut över kanten först och sänks sedan. Kroppen glider jämnt i sidled; en fot byter steg bara när den
// är i luften (djupet är ca 2 × fötternas avstånd). Ger x (i förhållande till starten) och golv (trappans nedersta = 0).
// I början och slutet (0,3 s) vänder figuren sig mot tittaren, som gang().
const trappa = (f, p, tl, n = 3, upp = true, dir = 1) => {
  const S = kroppTal('trappa'), o = opt(), D = n * S.takt, T = kl(0, D, tl), k = Math.min(n - 1, Math.floor(T / S.takt)), u = T / S.takt - k;
  const s = upp ? 1 : -1, a = (upp ? k : n - k) * S.h, e = mjuk(kl(0, 1, tl / 0.3)) * mjuk(kl(0, 1, (D - tl) / 0.3));
  // fotens nivå: främre foten lyfts 0,08–0,5 av steget, bakre d0 senare. Uppför byts nivån innan foten går över kanten
  // (vid 1/3 och 2/3 av steget, när kroppen har glidit 25 / 75 %), nedför efter. Kroppen reser sig mellan fötterna,
  // så att ett ben aldrig sträcks ut mer än ca en tredjedel steg (rötterna stannar under kroppen).
  const d0 = upp ? 0.27 : 0.42, niva = dd => { const [l0, l1] = upp ? [0.08, 0.3] : [0.33, 0.5]; return a + s * S.h * mjuk(kl(0, 1, (u - l0 - dd) / (l1 - l0))); };
  const fot = dd => [niva(dd) + S.fot * puls(u, 0.08 + dd, 0.5 + dd), puls(u, 0.08 + dd, 0.5 + dd)];
  const [hF, lF] = fot(0), [hB, lB] = fot(d0), Y = a + s * S.h * mjuk(kl(0, 1, (u - (upp ? 0.15 : 0.2)) / 0.5));
  const fram = dir > 0 ? 1 : 0, by = [0, 0], bv = [0, 0];   // främre benet = det på gångsidan (leg-r åt höger)
  by[fram] = Y - hF; by[1 - fram] = Y - hB; bv[fram] = 8 * lF; bv[1 - fram] = 8 * lB;
  const res = puls(u, upp ? 0.15 : 0.2, upp ? 0.65 : 0.7), x = dir * S.djup * (k + mjuk(u));
  // golv [kroppen, skuggan, styrka]: skuggan ligger på det lägre av stegen som fötterna står på, och tonas bort medan
  // fötterna står på olika steg (då skulle den hänga ut över kanten)
  const nF = niva(0), nB = niva(d0);
  // blicken är på trappan från början (ögonen går först: titta dit innan, som trappaSlinga) och släpper den sista 0,3 s
  const bl = mjuk(kl(0, 1, (D - tl) / 0.3));
  return [{ ...f, titt: [f.titt[0] + 5 * dir * bl, f.titt[1] + 6 * bl] }, { ...p, x: p.x + x, golv: [Y, Math.min(nF, nB), 1 - Math.abs(nF - nB) / S.h], benY: by, ben: bv,
    rikt: 0.5 * dir * e, gang: e, sving: Math.sin(Math.PI * T / S.takt) * e, strack: p.strack - 0.015 * res,
    ...bojen(o, (p.boj || 0) + dir * S.luta * (0.5 + 0.5 * res) * e), ...oronen(o, [p.oron[0] - 4 * res, p.oron[1] - 4 * res]) }];
};
// Trappan som platshållare i kod (tills det finns riktig rekvisita): n steg (h, djup ur RORELSE.trappa), skalan sk, nedersta
// kanten (första steget) i x0, golvet i y0; vilplanet högst upp är 1,3 djup. Varm träfärg, mörkare kant på stegen, vit kant.
const trappaSvg = (x0, y0, sk, n = 3) => { const { h, djup: d } = kroppTal('trappa'), X = v => x0 + sk * v, Y = v => y0 - sk * v, sl = (n - 1) * d + 1.3 * d;
  let pts = `${X(0)},${Y(0)}`; for (let i = 1; i <= n; i++) pts += ` ${X((i - 1) * d)},${Y(i * h)} ${X(i === n ? sl : i * d)},${Y(i * h)}`;
  pts += ` ${X(sl)},${Y(0)}`;
  const kanter = Array.from({ length: n }, (_, i) => `M${X(i * d)} ${Y((i + 1) * h) + 3} H${X(i === n - 1 ? sl : (i + 1) * d)}`).join(' ');
  return `<polygon points="${pts}" fill="#d9a66c" stroke="#fff" stroke-width="10" stroke-linejoin="round"/>
    <path d="${kanter}" stroke="#a8743f" stroke-width="7" stroke-linecap="round" fill="none"/>`; };
// ?rorelse=trappa (10,4 s): står nedanför, går uppför 3 steg, stannar på vilplanet och vänder sig, går nerför igen, vänder.
// Trappan ritas av sidan (trappaPlats ger var). Figurens x 0 = mitt i bilden = mitt i vandringen.
const trappaPlats = (n = 3) => { const { djup: d } = kroppTal('trappa'); return { n, x0: -d / 2, mitt: ((n - 1) * d) / 2 }; };
const trappaSlinga = t => { const T = t % 10.4, { n, x0, mitt } = trappaPlats(), { takt, djup: d } = kroppTal('trappa');
  const f0 = blanda('neutral', 'glad', 0.5), b = P({ x: x0 - mitt, golv: [0, 0, 1] }), D = n * takt, H = n * kroppTal('trappa').h, topp = P({ x: x0 + n * d - mitt, golv: [H, H, 1] });
  // blicken går före: tittar mot trappan 0,3 s innan första steget
  const se = (t0, dir) => ({ ...f0, titt: [5 * dir * mjuk(kl(0, 1, (T - t0 + 0.3) / 0.3)), 6 * mjuk(kl(0, 1, (T - t0 + 0.3) / 0.3))] });
  const [f, p] = T < 0.6 ? [se(0.6, 1), b] : T < 0.6 + D ? trappa(f0, b, T - 0.6, n, true, 1)
    : T < 5.6 ? [se(5.6, -1), topp] : T < 5.6 + D ? trappa(f0, topp, T - 5.6, n, false, -1) : [f0, b];
  return [blinka(f, t), p]; };

// Klättra på en stege (framifrån: stegen står bakom figuren, fötterna på pinnarna, som hundens stege i 021):
// klattraStege(f, p, tl, n, upp), d = n × takt s. Varje pinne: blicken upp (ner), ena armen sträcks upp till skenan (den
// glider in bakom kroppen och ut uppe, flyger aldrig) medan den förra armen sänks, motsatta foten lyfts upp på nästa pinne,
// ett litet tryck och kroppen reser sig en pinne, andra foten följer efter. Varannan pinne vänster, varannan höger.
// Nerför: foten och kroppen sänks tillsammans, den övre foten följer. Sista armen sänks i slutet. golv [kroppen, 0, skugga].
const klattraStege = (f, p, tl, n = 3, upp = true) => {
  const S = kroppTal('stege'), o = opt(), D = n * S.takt, T = kl(0, D, tl), k = Math.min(n - 1, Math.floor(T / S.takt)), u = T / S.takt - k;
  const sg = upp ? 1 : -1, a = (upp ? k : n - k) * S.r, sida = k % 2, sist = k === n - 1;
  // armarna: den här pinnens arm upp (0–0,35), förra pinnens ner samtidigt; sista armen ner igen 0,75–1
  // armarna stannar uppe på stegen (över gömzonen) och växlar mellan sträck (upp) och grepp; bara en arm i taget
  // glider in bakom kroppen: den första upp i början, och i slutet ner en i taget
  const ram = (l0, l1) => mjuk(kl(0, 1, (u - l0) / (l1 - l0)));
  const uppA = [0, 1].map(j => { const nar = j === sida;
    let v = nar ? mix(k > 1 ? S.grepp : 0, S.upp, ram(0, 0.35)) : k > 0 ? mix(S.upp, S.grepp, ram(0, 0.35)) : 0;
    if (sist) v *= 1 - (nar ? ram(0.8, 1) : ram(0.5, 0.72));
    return v; });
  const niva = (l0, l1) => a + sg * S.r * mjuk(kl(0, 1, (u - l0) / (l1 - l0)));
  const fot = 1 - sida, hF = niva(0.25, 0.55) + S.fot * puls(u, 0.22, 0.6), hB = niva(0.55, 0.8) + S.fot * puls(u, 0.52, 0.85);
  const Y = upp ? niva(0.45, 0.9) : niva(0.2, 0.65), by = [0, 0];
  by[fot] = Y - hF; by[1 - fot] = Y - hB;
  // sd −1 … 1: åt vilken sida armen sträcks (blicken och lutningen följer), glider över när armarna byts och till 0 på slutet
  const sid = j => j ? 1 : -1, sd = mix(k > 0 ? sid(1 - sida) : 0, sid(sida), mjuk(kl(0, 1, u / 0.35))) * (sist ? 1 - mjuk(kl(0, 1, (u - 0.75) / 0.25)) : 1);
  const tryck = puls(u, 0.3, 0.5), res = puls(u, upp ? 0.45 : 0.2, upp ? 0.9 : 0.65), bl = mjuk(kl(0, 1, (D - tl) / 0.4));   // blicken är uppe/nere från början (ögonen går först)
  const vy = sg * res;   // ungefär farten upp/ner: tofsarna/öronen släpar efter
  return [{ ...f, titt: [f.titt[0] + 3 * sd, f.titt[1] + (upp ? -8 : 6) * bl] },
    { ...p, golv: [Y, 0, 1 - 0.5 * kl(0, 1, Y / (3 * S.r))], benY: by, armar: uppA.map((v, j) => p.armar[j] + v),
      strack: p.strack - 0.02 * tryck + 0.012 * res, bred: p.bred + 0.015 * tryck, ...bojen(o, (p.boj || 0) + 1.5 * sd),
      ...oronen(o, [p.oron[0] + 5 * vy, p.oron[1] + 5 * vy]) }];
};
// Stegen som platshållare i kod: två skenor och pinnar (som 013:s stege), varm träfärg med vit kant. Mitten i x, golvet i y,
// skalan sk, antal pinnar. Pinne i ligger i × r över golvet (figurens px).
const stegeSvg = (x, y, sk, pinnar = 7) => { const { r, bredd } = kroppTal('stege'), topp = y - sk * (pinnar + 0.6) * r;
  const sken = [-1, 1].map(s => x + s * sk * bredd), pin = Array.from({ length: pinnar }, (_, i) => y - sk * (i + 1) * r);
  const linjer = (w, c) => `<g stroke="${c}" stroke-width="${w}" stroke-linecap="round">${pin.map(py => `<line x1="${sken[0]}" y1="${py}" x2="${sken[1]}" y2="${py}"/>`).join('')}
    ${sken.map(sx => `<line x1="${sx}" y1="${y + 4}" x2="${sx}" y2="${topp}" stroke-width="${w * 1.4}"/>`).join('')}</g>`;
  return linjer(32, '#fff') + linjer(18, '#c98f55'); };
// ?rorelse=klattra (11 s): står vid stegen och tittar upp, klättrar upp tre pinnar, stannar och tittar sig om, klättrar ner.
const stegeSlinga = t => { const T = t % 11, { r, takt } = kroppTal('stege'), D = 3 * takt;
  const f0 = blanda('neutral', 'glad', 0.5), b = P({ golv: [0, 0, 1] }), H = 3 * r, topp = P({ golv: [H, 0, 0.5] });
  const glad = blanda(f0, 'glad', puls(T, 0.8 + D, 6.2));   // glad uppe
  const se = (t0, ner) => ({ ...glad, titt: [0, (ner ? 6 : -8) * mjuk(kl(0, 1, (T - t0 + 0.3) / 0.3))] });   // blicken går före
  const [f, p] = T < 0.8 ? [se(0.8, false), b] : T < 0.8 + D ? klattraStege(f0, b, T - 0.8, 3, true)
    : T < 6.2 ? [{ ...se(6.2, true), titt: [9 * puls(T, 5.0, 5.9), se(6.2, true).titt[1]] }, topp]
    : T < 6.2 + D ? klattraStege(f0, topp, T - 6.2, 3, false) : [f0, b];
  return [blinka(f, t), p]; };

// ---------- Testfilmens hjälpare (uttryck.html?film=1) ----------
// I filmen:  const { gang, vinka, stilla, ror } = filmHjalp({ svans: t => svans(t), vinkArm: [38, 16] });
//            const lage = filmSekvens(AVSNITT, LANGD);   … i render: filmKamera(t, lage, p, SK, MARK, Z); filmZzz(fig, ts, [x, y]);
const fjader = u => 1 - Math.exp(-6 * u) * Math.cos(11 * u);   // landar och svänger in, 0 → 1
// h: svans filmens svans ur t (standard RORELSE.svans) · svansGang som RORELSE.svansGang, null = ingen svans i gången · vinkArm [bas, sving] vinkarmens vinkel i grader ·
// vinkKawaii vinka(d, kaw) gör ögonen kawaii (Bulle, Igge)
const filmHjalp = (h = {}) => {
  const o = opt(), [va, vs] = h.vinkArm || [92, 12];
  const sv = t => svansen(o, h.svans ? h.svans(t) : o.svans && o.svans(t));
  return {
    // går från x0 till x1 (figurens px) på d s: saktar in och vänder sig mot tittaren i början och slutet, blicken går först
    // (0,2 s före stegen), stegtakten följer farten till hälften så att fötterna glider mindre
    gang: (x0, x1, d) => tl => {
      const kant = Math.min(tl, d - tl), rs = Math.sign(x1 - x0), k2 = kant - 0.2;
      const [f, p] = steg(0.5 * tl + 0.5 * d * mjuk(tl / d), mjuk(kl(0, 1, k2 / 0.3)), rs * mjuk(kl(0, 1, k2 / 0.5)));
      const sg = 'svansGang' in h ? h.svansGang : o.svansGang;
      const svg = sg === null ? {} : sg === 'vila' ? sv(tl) : svansen(o, sg * Math.sin(tl * 2.4 * Math.PI) * mjuk(kl(0, 1, kant / 0.3)));
      return [{ ...f, titt: [5 * rs * mjuk(kl(0, 1, kant / 0.2)), 0] }, { ...p, x: x0 + (x1 - x0) * mjuk(tl / d), ...svg,
        ...bojen(o, 3.5 * rs * mjuk(kl(0, 1, kant / 0.35))) }]; },   // lutar sig dit med blicken, före första steget
    // höger arm upp och vinkar, munnen öppnas på "hej"
    vinka: (d, kaw = 0) => tl => {
      const upp = mjuk(kl(0, 1, Math.min(tl / 0.4, (d - tl) / 0.4))), prat = !kaw && tl > 0.5 && tl < 1.1 ? Math.sin((tl - 0.5) / 0.6 * Math.PI) : 0;
      const f = blanda('glad', 'jatteglad', prat);
      return [h.vinkKawaii ? { ...f, kawaii: kaw * upp } : f, P({ armar: [0, upp * (va + vs * Math.sin(tl * 13))], luta: Math.sin(tl * 7) * 2 * upp,
        ...oronen(o, [-3 * upp, 3 * Math.sin(tl * 6) * upp]), ...sv(tl) })]; },
    stilla: (u, po) => tl => vila(blanda('neutral', u, 1), { ...blandaPose('neutral', po, 1), ...sv(tl) }, tl),
    // en rörelse ur ROR, med uttryckets armar neutrala (rörelsen styr armarna själv)
    ror: (namn, t0 = 0) => tl => { const [f, p] = ROR[namn](tl + t0); return [{ ...f, armar: NEUTRAL.armar }, p]; },
  };
};
// Avsnitten efter varandra: AVSNITT = [[sekunder, tl => [ansikte, pose]], …]. De första 0,5 s av varje avsnitt blandas från
// förra avsnittets slut. p.sovbild (Bulle, Kanel, Ludde) blandas inte. Blinkning och andning läggs på sist.
const filmSekvens = (AVSNITT, LANGD) => t => { let t0 = 0; t = kl(0, LANGD - 0.001, t);
  for (let i = 0; i < AVSNITT.length; i++) { const [d, fn] = AVSNITT[i];
    if (t < t0 + d) { const tl = t - t0; let [f, p] = fn(tl);
      if (i && tl < 0.5) { const [d0, fn0] = AVSNITT[i - 1], [f0, p0] = fn0(d0), k = mjuk(tl / 0.5);
        const sb = p.sovbild; f = blanda(f0, f, k); p = blandaPose(p0, p, k); if (sb) p.sovbild = sb; }
      return [blinka(f, t), liv(f, p, t)]; }
    t0 += d; } };
// Kameran följer figuren med eftersläp (medel av de senaste 0,6 s) och 70 % av hoppet, aldrig utanför bakgrunden.
// lage(t) ger [ansikte, pose], SK figurens skala, MARK marken, Z zoomen.
const filmKamera = (t, lage, p, SK, MARK, Z) => {
  let fx = 0; for (let i = 0; i < 12; i++) fx += (960 + SK * lage(t - i * 0.05)[1].x) / 12;
  const tx = kl(1920 - 1920 * Z, 0, 1000 - fx * Z), ty = kl(1080 - 1080 * Z, 0, 1030 - MARK * Z - 0.7 * p.lyft);
  document.getElementById('kamera').setAttribute('transform', `translate(${tx} ${ty}) scale(${Z})`); };
// zzz: tre z flyter upp från [x, y] (figurens 1024-ruta) och tonar, 0,7 s isär, från 2 s in i sovandet (ts) till 5 s.
// Varje z har en vit kopia (.zk) före sig: filmZzzKant(fig) lägger till dem när figuren byggs.
const filmZzzKant = fig => fig.querySelectorAll('.z').forEach(z => z.insertAdjacentHTML('beforebegin',
  `<path class="zk" d="M-22 -22 H22 L-22 22 H22" fill="none" stroke="#fff" stroke-width="21" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>`));
const filmZzz = (fig, ts, [x, y], [dx, dy] = [90, 260]) => fig.querySelectorAll('.z').forEach((z, j) => {
  const t1 = ts - 2.0 - j * 0.7, u = ((t1 % 2.1) + 2.1) % 2.1 / 2.1;
  const syns = t1 > 0 && ts < 5.0 ? Math.sin(Math.PI * u) * (1 - mjuk(kl(0, 1, (ts - 4.4) / 0.5))) : 0;
  const tr = `translate(${x + dx * u + 25 * Math.sin(u * 5)} ${y - dy * u}) scale(${1 + 0.9 * u})`;
  [z, z.previousElementSibling].forEach(e => { e.setAttribute('transform', tr); e.setAttribute('opacity', syns); }); });
// zzz för sovbilden i posen (Bulle, Kanel, Ludde): sb = { zzz: sekunder sedan zzz började, ut: synlighet }, [x, y] = SOV.z
const filmZzzSov = (fig, sb, [x, y]) => fig.querySelectorAll('.z').forEach((z, j) => { const tz = sb ? sb.zzz - j * 0.7 : -1, u = (tz % 2.1 + 2.1) % 2.1 / 2.1;
  z.setAttribute('transform', `translate(${x + 90 * u + 25 * Math.sin(u * 5)} ${y - 260 * u}) scale(${1 + 0.9 * u})`);
  z.setAttribute('opacity', tz > 0 ? Math.sin(Math.PI * u) * sb.ut : 0); });

// ---------- Saker i handen ----------
// En sak (mugg, sked, banan, mössa …) sitter i handens spets: den följer armens vinkel, glidning och lager (bakom/framför kroppen)
// och hela figurens lutning, böjning (boj), hopp och sträckning. Allt är avstängt tills en scen ger figuren en sak med sakIn,
// så andra riggar påverkas inte. Figuren behöver tre saker i sin sida (mäts per rigg, se lk-figur/nytt-saker-i-handen.md):
//   HAND = { l: [x, y], r: [x, y], kant: px }   handens mitt i armbildens 1024-ruta (armens yttersta klump) och figurens vita kant
//   POSE0: hall: [0, 0], rack: [0, 0], sakV: 0, sakGrepp: 0, sakLager: 1, sakFri: [x, y, v], sakMun: 0, sakBett: 0
//   (för äta och dricka också HAND.mun = [x, y]: munnen i figurens 1024-ruta, där saken ska nå; läses genom .munnen eller .drag)
//   sist i rita(), efter huvud(): sakRita(fig, p);
// Posen: hall [v, h] 0–1 saken sitter i vänster/höger hand (0 = ligger fritt) · sakV extra vinkel i handen (grader) ·
// rack [v, h] 0–1 handen glider till saken där den ligger fritt · sakLager 0 fri bredvid figuren, 1 fri framför kroppen ·
// sakGrepp 0–1 från greppet vid sidan till greppet framför magen (sakFramVag sätter det) ·
// sakFri [x, y, v] där saken ligger när den inte hålls: dess fot i figurens 1024-ruta (golvet = FOTTER) och vinkel.
// Saken: sakBild(href, w, h, o) för en bild, sakKod(svg, o) för en sak ritad i kod, o =
//   grepp [x, y] där handen tar tag (sakens egna px) · fot [x, y] det den står på · skala sakens px → figurens px ·
//   greppFram [x, y] och vFram (grader) greppet och vinkeln framför magen (posens sakGrepp 0 → 1 blandar dit; standard som vid sidan) ·
//   folj 0–1 hur mycket saken vrids med armen (0 = står upprätt, muggen; 1 = sitter fast i handen, skeden) · v grundvinkel ·
//   kant den inbakade vita kanten i sakens egna px (bilder ur rekvisita har ca 1 % av höjden) · spegel true = spegelvänd ·
//   mun [x, y] den punkt på saken som når munnen (muggens kant, skedens mat, bullens tuggställe) ·
//   bett [[x, y, r], …] tuggorna, cirklar som klipps ur sakens mat (element med class="sak-mat"; sakBild: mat: true = hela bilden) ·
//   pa { punkt: [x, y], drag: 0–1, v } där saken bärs (mössan på huvudet): sakens fot sätts i punkt i kroppens ruta (.kropp),
//   och följer ansiktets nick och skak (.drag) med andelen drag. Stel: följer kroppens tryck och sträckning men töjs aldrig.
// Posen: sakPa 0–1 saken lämnar handen i en hög båge (först upp, sedan in över huvudet, aldrig framför kroppen) och sätter sig på
// kroppen; den byter till lagret överst när den är ovanför huvudet · sakMun 0–1 armen glider i ett stycke tills sakens mun-punkt ligger i munnen · sakBett 0 … antal tuggor som är borta
// (1,5 = första tuggan borta, andra halvvägs).
// Kanten: saken får figurens kant (HAND.kant) runt om i kod, minus den inbakade, så att den ser ut som resten av figuren.
// Lager: i handen ligger saken under handen, bakom kroppen när armen är bakom och framför kroppen när armen är framför;
// fri ligger den framför figuren. Bytet sker vid hall 0,5, när handen redan är där saken ligger.
let SAKNR = 0;
const sakBild = (href, w, h, o = {}) => ({ svg: `<image${o.mat ? ' class="sak-mat"' : ''} href="${href}" width="${w}" height="${h}"/>`, grepp: [w / 2, h / 2], fot: [w / 2, h], ...o });
const sakKod = (svg, o = {}) => ({ grepp: [0, 0], fot: [0, 0], ...o, svg });
// Lägger saken i figuren (en kopia per lager: bakom armen, framför kroppen under handen, överst). sakIn(fig, null) tar bort den.
const sakIn = (fig, sak) => { fig.querySelectorAll('.sak-plats').forEach(e => e.remove()); fig.sak = sak; if (!sak) return;
  const kropp = fig.querySelector(':scope > g'), armar = kropp.querySelectorAll(':scope > .arm-l, :scope > .arm-r');
  const s = sak.skala || 1, r = Math.max(0, HAND.kant - (sak.kant || 0) * s), id = 'sak' + SAKNR++;
  // kanten: en vit kopia av sakens form, utvidgad r px, under saken (också runt tuggorna, eftersom de klipps före kanten)
  const Z = 'x="-5000" y="-5000" width="10000" height="10000"', bett = n => sak.bett ? `<mask id="${id}-${n}-b" maskUnits="userSpaceOnUse" ${Z}>
    <rect ${Z} fill="#fff"/>${sak.bett.map(([x, y]) => `<circle class="sak-bett" cx="${x}" cy="${y}" r="0" fill="#000"/>`).join('')}</mask>` : '';
  const html = n => `<g class="sak-plats" data-lager="${n}" display="none"><filter id="${id}-${n}" x="-0.5" y="-0.5" width="2" height="2">
    <feMorphology in="SourceAlpha" operator="dilate" radius="${r.toFixed(1)}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>${bett(n)}<g filter="url(#${id}-${n})"><g class="sak-ting">${sak.svg}</g></g></g>`;
  armar[0].insertAdjacentHTML('beforebegin', html('bak'));
  (armar[2] || kropp.querySelector(':scope > .kropp').nextElementSibling).insertAdjacentHTML('beforebegin', html('fram'));
  kropp.insertAdjacentHTML('beforeend', html('over'));
  if (sak.bett) fig.querySelectorAll('.sak-plats').forEach(e => e.querySelectorAll('.sak-mat').forEach(m => m.setAttribute('mask', `url(#${id}-${e.dataset.lager}-b)`))); };
const sakMatris = e => { const t = e && e.transform.baseVal.consolidate(); return t ? DOMMatrix.fromMatrix(t.matrix) : new DOMMatrix(); };
const sakGrader = m => Math.atan2(m.b, m.a) * 180 / Math.PI;
// Handens plats [x, y], armens vridning (grader) och lager ('bak' / 'fram') i figurens innersta grupp (.kanel, .figuren …),
// läst ur armens egen transform som rita() just satte. n = 'l' | 'r'.
const handPunkt = (fig, n) => { const armar = [...fig.querySelectorAll(':scope > g > .arm-' + n)], m = sakMatris(armar[0]);
  const j = armar.findIndex(e => e.getAttribute('opacity') !== '0'), pt = m.transformPoint(new DOMPoint(...HAND[n]));
  return { x: pt.x, y: pt.y, v: sakGrader(m), lager: j > 0 ? 'fram' : 'bak' }; };
// En punkt i en del av figuren (sel, t.ex. '.kropp' eller '.drag') omräknad till den innersta gruppens ruta, där sakerna ritas.
const sakDelPunkt = (fig, sel, pt) => { const inre = fig.querySelector(':scope > g'), e = inre.querySelector(sel) || inre;
  return DOMMatrix.fromMatrix(inre.getCTM()).inverse().multiply(DOMMatrix.fromMatrix(e.getCTM())).transformPoint(new DOMPoint(...pt)); };
// Munnen (HAND.mun) i samma ruta, genom munnens grupp (.munnen, annars .drag), så att den följer nick, skak, sträckning och boj.
const sakMunPunkt = fig => sakDelPunkt(fig, fig.querySelector('.munnen') ? '.munnen' : '.drag', HAND.mun);
// Placerar saken ur posen. Anropas sist i rita().
// Räcka (posens rack [v, h] 0–1): armen glider i ett stycke (samma vinkel som posen ger) tills handen ligger på sakens grepp
// där saken ligger fritt (sakFri). Målet räknas här, ur det rita() just ritade, så att handen träffar exakt i varje rigg och pose.
const sakRita = (fig, p) => { const sak = fig.sak; if (!sak) return;
  const hall = p.hall || [0, 0], rack = p.rack || [0, 0], i = hall[1] + rack[1] > hall[0] + rack[0] ? 1 : 0, n = i ? 'r' : 'l', k = kl(0, 1, hall[i]);
  const mk = sakMatris(fig.querySelector(':scope > g')), [fx, fy, fv] = p.sakFri || [512, FOTTER, 0], s = sak.skala || 1;
  // fri: foten i (fx, fy) med vinkeln fv i figurens ruta → greppets plats, omräknat till den innersta gruppen (som lutar, böjer och hoppar)
  const G = mix(sak.grepp, sak.greppFram || sak.grepp, kl(0, 1, p.sakGrepp || 0));   // greppet: vid sidan → framför magen
  const a = fv * Math.PI / 180, gx = (G[0] - sak.fot[0]) * s * (sak.spegel ? -1 : 1), gy = (G[1] - sak.fot[1]) * s;
  const fri = mk.inverse().transformPoint(new DOMPoint(fx + gx * Math.cos(a) - gy * Math.sin(a), fy + gx * Math.sin(a) + gy * Math.cos(a)));
  const armar = [...fig.querySelectorAll(':scope > g > .arm-' + n)];
  let hd = handPunkt(fig, n); const r = kl(0, 1, rack[i]);
  if (r > 0) { const dx = (fri.x - hd.x) * r, dy = (fri.y - hd.y) * r;
    armar.forEach(e => e.setAttribute('transform', `translate(${dx} ${dy}) ${e.getAttribute('transform')}`)); hd = handPunkt(fig, n); }
  const v = mix(sak.v || 0, sak.vFram ?? sak.v ?? 0, kl(0, 1, p.sakGrepp || 0)) + mix(fv - sakGrader(mk), (sak.folj ?? 1) * hd.v + (p.sakV || 0), k);
  // Till munnen (sakMun 0–1): armen glider i ett stycke (vinkeln som posen ger) tills sakens mun-punkt ligger i munnen
  const mu = kl(0, 1, p.sakMun || 0);
  if (mu > 0 && sak.mun) { const M = sakMunPunkt(fig), b = v * Math.PI / 180, ux = (sak.mun[0] - G[0]) * s * (sak.spegel ? -1 : 1), uy = (sak.mun[1] - G[1]) * s;
    const dx = (M.x - hd.x - ux * Math.cos(b) + uy * Math.sin(b)) * mu, dy = (M.y - hd.y - ux * Math.sin(b) - uy * Math.cos(b)) * mu;
    armar.forEach(e => e.setAttribute('transform', `translate(${dx} ${dy}) ${e.getAttribute('transform')}`)); hd = handPunkt(fig, n); }
  const x = mix(fri.x, hd.x, k), y = mix(fri.y, hd.y, k), bt = p.sakBett || 0;
  // I handen ligger saken alltid under handen. Framför kroppen tar handen tag på sakens inre sida (greppFram), så att saken
  // ligger bort från armens tonade rot (annars en brun smet över saken) och handen syns ovanpå (saken över handen dolde den).
  // Fri ligger saken bredvid figuren (sakLager 0: framför benen, bakom kroppen, under handen bakom) eller framför kroppen (1).
  let lager = k > 0.5 ? hd.lager : (p.sakLager ?? 1) > 0.5 ? 'fram' : 'bak', fr = p.fram[i], X = x, Y = y, V = v;
  // På kroppen (sakPa): en båge från handen via en punkt rakt ovanför handen, i höjd med en bit över bärplatsen, och ner på plats
  const pa = kl(0, 1, p.sakPa || 0);
  if (pa > 0 && sak.pa) { const P = sak.pa, kp = sakDelPunkt(fig, '.kropp', P.punkt), dp = sakDelPunkt(fig, '.drag', P.punkt), d = P.drag || 0;
    const tv = P.v || 0, b = tv * Math.PI / 180, ux = (G[0] - sak.fot[0]) * s * (sak.spegel ? -1 : 1), uy = (G[1] - sak.fot[1]) * s;
    const tx = mix(kp.x, dp.x, d) + ux * Math.cos(b) - uy * Math.sin(b), ty = mix(kp.y, dp.y, d) + ux * Math.sin(b) + uy * Math.cos(b);
    const cx = x, cy = Math.min(y, ty) - (P.bage ?? 220), w = 1 - pa;
    X = w * w * x + 2 * w * pa * cx + pa * pa * tx; Y = w * w * y + 2 * w * pa * cy + pa * pa * ty; V = mix(v, tv, pa);
    if (pa > 0.5) lager = 'over'; }
  // Bytet bakom → framför med handen (sakFramVag): handkopian (och saken i den) tonar in på vägen fram 0 → 1 medan kopiorna bakom
  // ligger kvar hela, så att inget blir genomskinligt (riggen själv byter hårt vid 0,85)
  const tona = p.hand > 0.5 && fr > 0 && fr < 1 ? mjuk(fr) : -1, ops = { bak: 1, fram: tona, over: 0 };
  if (tona >= 0) { const syns = Math.max(...armar.map(e => +e.getAttribute('opacity')));
    armar[0].setAttribute('opacity', syns); armar[armar.length - 1].setAttribute('opacity', tona * syns); }
  fig.querySelectorAll('.sak-plats').forEach(e => { const op = tona >= 0 && k > 0.5 ? ops[e.dataset.lager] : +(e.dataset.lager === lager);
    e.setAttribute('display', op > 0 ? 'inline' : 'none'); e.setAttribute('opacity', op);
    e.querySelectorAll('.sak-bett').forEach((c, j) => c.setAttribute('r', (sak.bett[j][2] * mjuk(kl(0, 1, bt - j))).toFixed(1)));
    e.querySelector('.sak-ting').setAttribute('transform', `translate(${X} ${Y}) rotate(${V}) scale(${sak.spegel ? -s : s} ${s}) translate(${-G[0]} ${-G[1]})`); }); };

// Från sidan till framför magen, med en sak i handen (u 0 = vid sidan, 1 = framför magen; baklänges tillbaka). Armen glider
// in bakom kroppens kant och vrids lite ner (HAND.byte = [in px, vinkel]) tills handen precis gömmer sig bakom kanten och
// armens tonade rot ligger över kroppen. Där tonar handen över till framsidan (handkopian, -klapp) på 0,18 s, och saken med den,
// och sedan glider handen i ett stycke in över magen till HAND.fram. Byter den vid kanten medan handen sticker ut syns den
// tonade roten som ett genomskinligt band mot bakgrunden; byter den när handen redan är gömd hänger saken kvar utanför ensam.
// Greppet flyttar till sakens inre sida (sakGrepp) medan handen fortfarande är gömd bakom kanten: saken glider in bakom kroppen
// i stället för under handens tonade rot (en brun smet), och tonar sedan fram med handen.
// Ger armens värden { armar, fram, klapp, armY } och sakGrepp för den armen; lägg dem på index 0 (vänster) eller 1 (höger) i posen.
const sakFramVag = u => { const [fv, fin, fner] = HAND.fram, [bin, bv] = HAND.byte, a = mjuk(kl(0, 1, u / 0.4)), sw = mjuk(kl(0, 1, (u - 0.36) / 0.18)), b = mjuk(kl(0, 1, (u - 0.54) / 0.46));
  return { armar: mix(bv * a, fv, b), fram: sw, klapp: Math.max(0.01, mix(bin * a, fin, b)), armY: -20 * sw + fner * b, sakGrepp: mjuk(kl(0, 1, (u - 0.2) / 0.22)) }; };
// ?rorelse=halla (8 s): en sak i vänster hand. Står med den vid sidan och tittar på den (ögonen först), lyfter ut den åt sidan
// och visar den (lutar sig dit), tar in den framför magen (sakFramVag), ett litet glatt hopp med saken, tillbaka till sidan,
// lutar sig åt andra hållet. Lugnt: inget svänger, saken sitter kvar i handen.
const hallaSak = t => { const T = t % 8, e = (a, b) => mjuk(kl(0, 1, (T - a) / (b - a)));
  const visa = e(1.0, 1.7) * (1 - e(2.4, 3.1)), u = kl(0, 1, (T - 3.1) / 1.0) * (T < 5.9 ? 1 : kl(0, 1, (6.9 - T) / 1.0)), v = sakFramVag(u);
  const hl = kl(0, 1, (T - 4.4) / 0.7), luft = mjuk(kl(0, 1, hl / 0.1)) * mjuk(kl(0, 1, (1 - hl) / 0.1)) * (hl > 0 && hl < 1);
  const huk = Math.sin(Math.PI * kl(0, 1, (T - 4.15) / 0.25)) + Math.sin(Math.PI * kl(0, 1, (T - 5.1) / 0.25));
  const titta = e(0.3, 0.6) * (1 - e(2.6, 2.9)), ner = e(2.9, 3.4) * (1 - e(6.2, 6.6)), lut = Math.sin(Math.PI * kl(0, 1, (T - 6.95) / 1.0));
  const f = blanda('neutral', 'glad', Math.max(visa, mjuk(u)));
  return [blinka({ ...f, titt: [-9 * titta - 2 * ner, 7 * titta + 9 * ner] }, t), P({ hall: [1, 0],
    armar: [40 * visa + v.armar, 0], fram: [v.fram, 0], hand: 1, klapp: v.klapp, armY: v.armY, sakGrepp: v.sakGrepp,
    boj: -2.5 * visa + 3.5 * lut, lyft: -4 * 55 * hl * (1 - hl), strack: 0.04 * luft * Math.abs(1 - 2 * hl) - 0.06 * huk, bred: 0.04 * huk,
    oron: [6 * luft * (1 - 2 * hl), 6 * luft * (1 - 2 * hl)] })]; };

// ---- Plocka upp och lägga ner: plockaDel('upp' | 'ner', tl, d, o) ger [ansikte, pose] för en upplockning eller nedläggning ----
// Ögonen går först till saken (0,25 s), sedan lutar sig figuren dit och böjer sig (o.boj = figurens böjpose), armen glider ut
// och ner i ett stycke tills handen ligger på saken (rack), saken går över till handen på 0,15 s (hall), och figuren rätar på
// sig med saken i handen. 'ner' är samma väg baklänges, saken släpps där den ska ligga. d ca 2,2 s.
// o: fri [x, y, v] där saken ligger (fot, figurens ruta) · hand 0 vänster / 1 höger · boj { luta, boj, strack, bred, armar }
// böjposen (mäts per figur: HAND.golv, HAND.bord) · fram true = handen tar den framför kroppen (bordet): armen kommer först
// fram (sakFramVag) och figuren håller saken framför magen efteråt; annars vid sidan (golvet bredvid, saken bakom handen) ·
// lyft px handen högre (−) framför magen än HAND.fram, så att saken går fri från bordsskivan.
const plockaDel = (del, tl, d, o) => { const upp = del === 'upp', i = o.hand || 0, B = o.boj, [fx, fy] = o.fri;
  const T = upp ? tl : d - tl, e = (a, b) => mjuk(kl(0, 1, (T - a) / (b - a)));   // 'ner' = 'upp' baklänges
  const kontakt = 0.46 * d, ner = e(0.18 * d, kontakt) * (1 - e(kontakt + 0.1 * d, 0.92 * d)), rack = e(0.26 * d, kontakt) * (1 - e(kontakt + 0.12 * d, 0.9 * d));
  const fram = o.fram ? sakFramVag(e(0.05 * d, 0.4 * d)) : null, hall = mjuk(kl(0, 1, (T - kontakt) / 0.15));
  // blicken: till saken där den ligger, sedan med saken upp (ungefär 10 px åt dess håll), först av allt
  const titt = e(0, 0.12 * d), mot = [kl(-10, 10, (fx - 512) / 25), kl(-4, 10, (fy - 430) / 25)];
  const f = blanda('neutral', 'glad', e(0.6 * d, 0.85 * d));
  const arr = (v, w = 0) => i ? [w, v] : [v, w];
  return [{ ...f, titt: mix([0, 0], mot, titt * (1 - 0.6 * e(0.6 * d, 0.9 * d))) }, P({ hall: arr(hall), rack: arr(rack), sakFri: o.fri, sakLager: o.fram ? 1 : 0,
    luta: B.luta * ner, boj: B.boj * ner, strack: B.strack * ner - 0.012 * Math.sin(Math.PI * kl(0, 1, (T - kontakt + 0.05) / 0.3)), bred: B.bred * ner,
    armar: arr((fram ? fram.armar : 0) + B.armar * ner), ...(fram ? { fram: arr(fram.fram), hand: 1, klapp: fram.klapp, armY: fram.armY + (o.lyft || 0) * fram.fram, sakGrepp: fram.sakGrepp } : {}),
    oron: [4 * ner, 4 * ner] })]; };
// Slingan ?rorelse=plocka (6,4 s): plockar upp, håller den en stund och tittar glatt på den, lägger ner den igen.
// o som plockaDel. Figurens sida lägger in den: plocka: t => plockaSlinga(t, { fri, boj: HAND.golv }).
const plockaSlinga = (t, o) => { const T = t % 6.4;   // 0–2,2 upp, 2,2–3,6 håller, 3,6–5,8 ner, sedan stilla
  if (T < 2.2) return plockaDel('upp', T, 2.2, o);
  if (T >= 3.6) return plockaDel('ner', Math.min(T - 3.6, 2.2), 2.2, o);
  const [f, p] = plockaDel('upp', 2.2, 2.2, o), h = Math.sin(Math.PI * (T - 2.2) / 1.4);
  return [{ ...f, titt: mix(f.titt, [o.hand ? 7 : -7, o.fram ? 9 : 5], h) }, { ...p, boj: p.boj + (o.hand ? 1.5 : -1.5) * h }]; };

// ---- Äta och dricka: ataDel(sort, tl, d, o) ger [ansikte, pose] för en klunk eller en tugga ur saken i handen framför magen ----
// Börjar och slutar med saken framför magen (som efter plocka från bordet, HAND.fram + o.lyft). Ögonen går först till saken,
// sedan glider handen i ett stycke upp tills saken når munnen (sakMun), lite lutad mot munnen (o.vinkel, grader). Tider från 022.
//   'dricka' (muggen): blundar och dricker med liten mun, två små klunkar (nicket i kroppen), ner, jätteglad på "mums".
//   'sked': gapar strax före, munnen sluter sig om skeden och maten är borta (sakBett), ner, tuggar två gånger, jätteglad.
//   'bit' (bulle, banan …): som skeden, men tuggan klipps ur saken när den tas från munnen.
// Kinderna är fulla (kind 1) medan den tuggar och dricker. d ca 4,4 s (dricka) och 4,6 s (sked, bit); o.bett = vilken tugga (0, 1 …).
// o: hand 0/1 · lyft px (som plocka) · vinkel grader extra lutning vid munnen · titt [x, y] blicken mot saken framför magen.
// Handen ska stanna ute på pälsen vid munnen, inte glida in över magfläcken: där syns armens tonade rot som ett ljust band.
// Saken når därför bort till munnen (muggen och bullen åt sidan om handen, skeden lutad mot munnen med o.vinkel).
const ataDel = (sort, tl, d, o = {}) => { const i = o.hand || 0, arr = (v, w = 0) => i ? [w, v] : [v, w], e = (a, b) => mjuk(kl(0, 1, (tl - a) / (b - a)));
  const dr = sort === 'dricka', a = 1.2, ner0 = dr ? a + 1.1 : a + 0.3, mums = ner0 + (dr ? 0.5 : 1.3);
  const upp = e(0.3, a) * (1 - e(ner0, ner0 + 0.8)), v = HAND.fram, titt = o.titt || [i ? 6 : -6, 9];
  // munnen: liten och blundande (dricka) eller öppen mot maten, sedan tuggor: munnen öppnar och stänger två gånger
  const tugg = tl > a && tl < mums ? Math.abs(Math.sin((tl - a) * 2 * Math.PI / ((mums - a) / 2))) : 0;
  const fore = dr ? { lock: [1, 1], mun: [6, 7, 0, 468], streck: 0, kind: 1 } : { mun: [15, 16, 0, 468], streck: 0, kind: 1 };
  const efter = dr ? fore : { mun: [12, 4 + 9 * tugg, 0, 468], streck: 0, kind: 1 };
  let f = blanda('neutral', { titt }, e(0, 0.25));
  f = blanda(f, { ...f, titt: mix(titt, [0, 4], 0.6), ...(tl < a ? fore : efter) }, e(a - 0.45, a - 0.1) * (1 - e(mums - 0.1, mums + 0.25)));
  f = blanda(f, 'jatteglad', e(mums, mums + 0.35));
  const klunk = dr ? Math.sin(Math.PI * kl(0, 1, (tl - a - 0.25) / 0.3)) + Math.sin(Math.PI * kl(0, 1, (tl - a - 0.7) / 0.3)) : tugg * (tl > ner0);
  const glad = Math.sin(Math.PI * kl(0, 1, (tl - mums) / 0.5));
  return [blinka(f, tl), P({ hall: arr(1), fram: arr(1), hand: 1, klapp: v[1], armar: arr(v[0] - 10 * upp), armY: v[2] + (o.lyft || 0), sakGrepp: 1,
    sakMun: upp, sakV: (o.vinkel || 0) * e(0.3, a - 0.2) * (1 - e(ner0, ner0 + 0.8)), sakBett: (o.bett || 0) + (dr ? 0 : e(a + (sort === 'sked' ? 0.05 : 0.2), a + 0.4)),
    strack: -0.015 * klunk + 0.02 * glad, bred: 0.012 * klunk, oron: [-6 * glad + 3 * upp, -6 * glad + 3 * upp] })]; };
// Slingan ?rorelse=ata (6,4 s): ataDel och sedan lugnt tillbaka till neutral med saken framför magen (tuggan växer tillbaka
// först i slingans sista 0,4 s, bara för provslingan).
const ataSlinga = (t, sort, o) => { const T = t % 6.4, d = sort === 'dricka' ? 4.4 : 4.6, [f, p] = ataDel(sort, Math.min(T, d), d, o);
  const k = mjuk(kl(0, 1, (T - d - 0.3) / 0.8)), aterBett = mjuk(kl(0, 1, (T - 6.0) / 0.4));
  return [blanda(f, {}, k), { ...p, sakBett: p.sakBett * (1 - aterBett) }]; };

// ---- Kläder som glider på (tröjan, stövlarna) och mössan ur handen: klaDel(sort, tl, d, o) ----
// kladIn(fig, { troja, stovlar }) lägger kläderna i figuren, kladRita(fig, p) sist i rita() (efter sakRita). Posen:
//   troja 0–1: 0 = tröjan ovanför huvudet, 1 = på. Den glider ner över huvudet (ansiktet bakom tröjan en stund, sedan tittar
//   huvudet fram genom halsen) medan armarna är uppe; ärmarna tonar in på armarna när tröjan passerar axlarna.
//   stovlar [v, h] 0–1: 0 = stöveln står på golvet bredvid foten, 1 = på foten. Foten lyfts (benY) och stöveln glider in under.
// Tröjan är ritad i kod (ställföreträdare): en färg i kroppens egen form (kroppsbilden som mask, krympt innanför den vita
// kanten), från halsen till fållen, med resårkanter; ärmarna i armbildernas form utom handen. Den ligger i .kropp, så den
// trycks ihop, sträcks och böjs (boj) med kroppen. Stövlarna är urklipp, stela, i benets vridning, och följer benet.
// troja: { farg, mork, hals, fall, hand: px (handen fri) } · stovlar: { href: [v, h], w, h, fot: [x, y] (skaftets mitt vid sulan),
//   skala, spegel: [v, h], ben: [[x, y], [x, y]] (foten i benbilden), golv: [[x, y], [x, y]] (där stöveln står bredvid) }
const kladIn = (fig, k) => { fig.querySelectorAll('.klad').forEach(e => e.remove()); fig.klad = k; if (!k) return;
  const kropp = fig.querySelector(':scope > g'), id = 'klad' + SAKNR++, r = HAND.kant;
  const kant = (n, rr = r) => `<filter id="${id}-${n}" x="-0.5" y="-0.5" width="2" height="2"><feMorphology in="SourceAlpha" operator="dilate" radius="${rr}" result="d"/>
    <feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  const krymp = `<filter id="${id}-krymp"><feMorphology operator="erode" radius="${r}"/></filter>`;
  const mask = (n, href) => `<mask id="${id}-${n}" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024" style="mask-type:alpha">
    <image href="${href}" width="1024" height="1024" filter="url(#${id}-krymp)"/></mask>`;
  if (k.troja) { const T = k.troja, kr = kropp.querySelector('.kropp'), kb = kr.querySelector('image').getAttribute('href');
    // halsen en mjuk båge (lägst i mitten), resår i halsen och fållen, några stickade ränder
    const hals = `M0 ${T.hals - 30} Q512 ${T.hals + 50} 1024 ${T.hals - 30}`, form = `${hals} V${T.fall} H0Z`;
    const ranna = [380, 450, 512, 574, 644].map(x => `<path d="M${x} ${T.hals + 40} V${T.fall - 40}" stroke="${T.mork}" stroke-width="5" opacity="0.35"/>`).join('');
    kr.insertAdjacentHTML('beforeend', `<g class="klad klad-troja" display="none">${krymp}${mask('kropp', kb)}${kant('troja')}
      <clipPath id="${id}-form"><path d="${form}"/></clipPath><g filter="url(#${id}-troja)"><g mask="url(#${id}-kropp)"><g clip-path="url(#${id}-form)">
      <rect width="1024" height="1024" fill="${T.farg}"/>${ranna}<path d="${hals}" fill="none" stroke="${T.mork}" stroke-width="36"/>
      <rect y="${T.fall - 30}" width="1024" height="30" fill="${T.mork}"/></g></g></g></g>`);
    // ärmarna: en grupp efter varje armkopia, med kopians transform och synlighet (kladRita)
    ['l', 'r'].forEach(n => kropp.querySelectorAll(':scope > .arm-' + n).forEach((a, j) => { const m = `arm-${n}${j}`, [hx, hy] = HAND[n];
      a.insertAdjacentHTML('afterend', `<g class="klad klad-arm" data-arm="${n}" data-nr="${j}" display="none">${mask(m, a.getAttribute('href'))}${kant(m)}
        <clipPath id="${id}-${m}-c"><path d="M0 0H1024V1024H0Z M${hx - T.hand} ${hy} a${T.hand} ${T.hand} 0 1 0 ${2 * T.hand} 0 a${T.hand} ${T.hand} 0 1 0 ${-2 * T.hand} 0Z" clip-rule="evenodd"/></clipPath>
        <g filter="url(#${id}-${m})"><g clip-path="url(#${id}-${m}-c)"><g mask="url(#${id}-${m})"><rect width="1024" height="1024" fill="${T.farg}"/></g></g></g></g>`); })); }
  if (k.stovlar) { const S = k.stovlar;
    ['l', 'r'].forEach((n, i) => kropp.querySelectorAll(':scope > .leg-' + n).forEach((b, j) => b.insertAdjacentHTML('afterend',
      `<g class="klad klad-stovel" data-ben="${n}" data-nr="${j}">${kant(`s${n}${j}`)}<g filter="url(#${id}-s${n}${j})"><image class="stovel-bild" href="${S.href[i]}" width="${S.w}" height="${S.h}"/></g></g>`))); } };
// Ritar kläderna ur posen. Anropas sist i rita(), efter sakRita.
const kladRita = (fig, p) => { const k = fig.klad; if (!k) return;
  const kropp = fig.querySelector(':scope > g');
  if (k.troja) { const T = k.troja, t = kl(0, 1, p.troja ?? 0), e = kropp.querySelector('.klad-troja');
    // ovanför huvudet: fållen strax över hjässan; glider ner hela vägen
    e.setAttribute('display', 'inline'); e.setAttribute('transform', `translate(0 ${-(1 - mjuk(t)) * (T.fall - T.topp)})`);
    const arm = mjuk(kl(0, 1, (t - 0.72) / 0.18));   // ärmarna när tröjan passerar axlarna
    kropp.querySelectorAll('.klad-arm').forEach(g => { const a = kropp.querySelectorAll(':scope > .arm-' + g.dataset.arm)[+g.dataset.nr];
      g.setAttribute('transform', a.getAttribute('transform') || ''); const o = arm * +(a.getAttribute('opacity') ?? 1);
      g.setAttribute('opacity', o); g.setAttribute('display', o > 0 ? 'inline' : 'none'); }); }
  if (k.stovlar) { const S = k.stovlar, st = p.stovlar || [0, 0];
    kropp.querySelectorAll('.klad-stovel').forEach(g => { const n = g.dataset.ben, i = n === 'r' ? 1 : 0, b = kropp.querySelectorAll(':scope > .leg-' + n)[+g.dataset.nr];
      const u = kl(0, 1, st[i]), o = +(b.getAttribute('opacity') ?? 1), m = sakMatris(b), pt = m.transformPoint(new DOMPoint(...S.ben[i]));
      // på foten: benets plats och vridning (stel); på golvet bredvid: rak, i figurens ruta; däremellan en låg båge
      const [gx, gy] = S.golv[i], x = mix(gx, pt.x, mjuk(u)), y = mix(gy, pt.y, mjuk(u)) - 30 * Math.sin(Math.PI * u), v = mix(0, sakGrader(m), mjuk(u));
      g.setAttribute('opacity', o); g.setAttribute('display', o > 0 ? 'inline' : 'none');
      g.querySelector('.stovel-bild').setAttribute('transform', `translate(${x} ${y}) rotate(${v}) scale(${S.spegel[i] ? -S.skala : S.skala} ${S.skala}) translate(${-S.fot[0]} ${-S.fot[1]})`); }); } };
// Klä på (d ca 3,4 s) eller av ('av': samma väg baklänges). sort 'mossa' (saken i handen, sakIn med pa), 'troja', 'stovlar'.
// Ögonen går först till plagget. mössa: armen lyfter mössan ut och upp bredvid huvudet, mössan går i en hög båge upp på huvudet
// (sakPa) och sätter sig, kroppen trycks lite ihop när den landar, armen går ner. tröja: armarna upp (som hurra), tröjan glider
// ner över huvudet, huvudet tittar fram (glad, öronen vippar), armarna ner. stövlar: vänster fot lyfts, stöveln glider in under,
// foten ner (sätter sig), sedan höger. o: hand 0/1 (mössan) · upp armvinkel för mössan · hurra armvinkel för tröjan · fot px foten upp.
const klaDel = (sort, tl, d, o = {}) => { const T = sort.endsWith('av') ? d - tl : tl, s0 = sort.replace(/-av$/, ''), e = (a, b) => mjuk(kl(0, 1, (T - a) / (b - a)));
  const satt = t0 => Math.sin(Math.PI * kl(0, 1, (T - t0 + 0.02) / 0.4)), titta = e(0, 0.25);
  if (s0 === 'mossa') { const i = o.hand || 0, arr = (v, w = 0) => i ? [w, v] : [v, w], upp = e(0.3, 1.1) * (1 - e(2.0, 2.8)), pa = e(1.1, 2.1), k = satt(2.1);
    const f = blanda({ titt: [i ? 8 : -8, -2 - 6 * upp] }, { ...param('glad'), titt: [0, -8] }, e(1.6, 2.2));
    return [f, P({ hall: arr(1), armar: arr((o.upp ?? 60) * upp), sakPa: pa, boj: (i ? 2 : -2) * upp, strack: -0.035 * k, bred: 0.025 * k,
      oron: [-4 * k + 6 * pa, -4 * k + 6 * pa] })]; }
  if (s0 === 'troja') { const h = e(0.4, 1.0) * (1 - e(2.3, 2.9)), t = e(0.8, 2.3), ut = e(1.75, 2.05), k = satt(2.3);
    const f = blanda(blanda({ titt: [0, -9 * titta] }, { lock: [1, 1], streck: 0, mun: [8, 8, 0, 468] }, e(1.2, 1.4) * (1 - ut)), 'jatteglad', ut);
    return [f, P({ troja: t, armar: [(o.hurra ?? 70) * h, (o.hurra ?? 70) * h], strack: 0.02 * h - 0.035 * k, bred: 0.025 * k,
      oron: [-8 * Math.sin(Math.PI * kl(0, 1, (T - 1.95) / 0.5)) - 4 * h, 8 * Math.sin(Math.PI * kl(0, 1, (T - 1.95) / 0.5)) - 4 * h] })]; }
  // stövlar: vänster 0,3–1,7, höger 1,5–2,9
  const fot = (a) => { const lyft = e(a, a + 0.35) * (1 - e(a + 0.95, a + 1.25)), st = e(a + 0.3, a + 1.0); return [lyft, st]; };
  const [lv, sv] = fot(0.3), [lh, sh] = fot(1.6), kv = satt(1.55), kh = satt(2.85);
  const f = blanda({ titt: [-8 * (1 - e(1.5, 1.8)) + 8 * e(1.5, 1.8), 10 * titta] }, 'glad', e(2.6, 3.0));
  return [f, P({ stovlar: [sv, sh], benY: [-(o.fot ?? 45) * lv, -(o.fot ?? 45) * lh], luta: 2.5 * lv - 2.5 * lh,
    strack: -0.03 * (kv + kh), bred: 0.02 * (kv + kh) })]; };
// Slingan ?rorelse=kla (8 s): klär på (0–3,4), en glad stund där kläderna följer med (en nick och en böjning åt sidan), av (4,6–8).
const klaSlinga = (t, sort, o) => { const T = t % 8, d = 3.4;
  if (T < d) return klaDel(sort, T, d, o);
  if (T >= 4.6) return klaDel(sort + '-av', Math.min(T - 4.6, d), d, o);
  const [f, p] = klaDel(sort, d, d, o), h = Math.sin(Math.PI * (T - d) / 1.2);
  return [f, { ...p, nick: [0.6 * h, 0.6 * h], boj: p.boj + 3 * h }]; };

// --- Tandmunnen och tandborsten (borstasången, 030) för katten, kaninen och pandan: uttrycken gapar och flinar, tand 0–1, tunga 0–1,
// tander [8] varje tand 0 matt … 1 blank (övre raden vänster → höger, sedan nedre), posen borstar med borste 0–1 och borstV.
// Gulligt, inte argt (Sanna 2026-11-11): små runda tänder med luft emellan, varmt rosaröd mun, stor tunga, och tandleendet visar bara övre raden.
const TANDMUN = { matt: [242, 226, 172], blank: [255, 255, 255], tunga: '#f6a6b0', mun: [196, 84, 92], grep: [700, 150], huvud: [115, 95], sk: 0.28,
  prov: [1, 0, 1, 1, 1, 1, 0, 1] };   // provbildernas tänder: blanka utom två matta
// Läggs efter <path class="mun"> i .munnen. kant = färgen på munnens kontur ovanpå tänderna: på ljus päls flyter de vita
// tänderna annars ihop med pälsen (katten är svart och får ingen: tandmun(id)).
// form = figurens egna tänder i övre raden (0–3 vänster → höger): { langa: [1, 2] } kaninens två långa framtänder,
// { spetsiga: [0, 3] } kattens små rundade spetsar på de yttre, { mjuka: [0, 1, 2, 3] } röda dinons stora tänder med mjuk, trubbig
// spets (spetsiga i den storleken såg vassa ut). Utan form är alla tänder runda (pandan).
const tandmun = (id, kant, form = {}) => `<clipPath id="mun-${id}"><path class="munklipp"/></clipPath>
  <g clip-path="url(#mun-${id})"><ellipse class="tunga" fill="${TANDMUN.tunga}"/>${Array.from({ length: 8 }, (_, j) =>
    `<g class="tand" data-form="${(form.langa || []).includes(j) ? 'lang' : (form.spetsiga || []).includes(j) ? 'spets' : (form.mjuka || []).includes(j) ? 'mjuk' : 'rund'}"><path stroke-linejoin="round"/><circle r="3.2" fill="#cfeeff"/></g>`).join('')}</g>
  ${kant ? `<path class="munkant" fill="none" stroke="${kant}" stroke-width="3" stroke-linejoin="round"/>` : ''}
  <path class="glimt" d="M0 -24 Q3 -3 24 0 Q3 3 0 24 Q-3 3 -24 0 Q-3 -3 0 -24Z" fill="#fff" stroke="#6fc3ee" stroke-width="3" stroke-linejoin="round"/>`;
// Gapets överkant, underkant och tändernas höjd ur mun = [rx, ry, d, my]. Tänderna växer med gapet.
const tandMatt = ([rx, ry, d, my]) => { const ovre = my - ry * (1 - d), nedre = my + ry, H = nedre - ovre;
  return { ovre, nedre, th: Math.min(Math.max(15, 0.24 * H), H / 2 + 1), tw: 1.7 * rx / 4 }; };
const TANDX = [-0.6375, -0.2125, 0.2125, 0.6375];   // tändernas mitt i sidled, i delar av munnens halva bredd (rx)
// Anropas i rita() efter att .mun har fått sin form. cx munnens mitt, mun = [rx, ry, d, my] med my i figurens ruta.
const tandmunRita = (fig, f, cx, [rx, ry, d, my]) => { const q = s => fig.querySelector(s), m = q('.mun'), munD = m.getAttribute('d');
  // munnen blir varmt rosaröd när tänderna syns (figurens egen mörka munfärg är kvar i de andra uttrycken)
  m.dataset.farg ||= m.getAttribute('fill'); const bas = m.dataset.farg.match(/\w\w/g).map(h => parseInt(h, 16));
  m.setAttribute('fill', `rgb(${mix(bas, TANDMUN.mun, kl(0, 1, f.tand)).map(Math.round)})`);
  q('.munklipp').setAttribute('d', munD); const mk = q('.munkant'); if (mk) { mk.setAttribute('d', munD); mk.setAttribute('opacity', f.tand); }
  // Fyra tänder längs överkanten och fyra längs underkanten, klippta av munnen. I det låga tandleendet möts raderna.
  const { ovre, nedre, th, tw } = tandMatt([rx, ry, d, my]);
  // Glansstjärnan (glimt 0–1): växer fram och krymper på andra tanden uppe, vrids inte.
  const g = f.glimt || 0; q('.glimt').setAttribute('transform', `translate(${cx + TANDX[2] * rx + 0.5 * tw} ${ovre + 2}) scale(${Math.sin(Math.PI * kl(0, 1, g))})`);
  const tu = q('.tunga'); tu.setAttribute('cx', cx); tu.setAttribute('cy', nedre - 2); tu.setAttribute('rx', 0.62 * rx); tu.setAttribute('ry', 0.5 * ry);
  // tänderna och tungan tonar in först när munnen är så öppen att de går att läsa (halva bredden över 40–50 px, höjden över 18–26 px):
  // i en halvöppen mun blev de åtta små tänderna ett rörigt rutnät
  const las = kl(0, 1, (rx - 40) / 10) * kl(0, 1, (nedre - ovre - 18) / 8);
  // leendets linje försvinner så fort munnen öppnas (halva bredden 4–14 px): förut låg den kvar som en brun båge över den halvöppna munnen
  const le = q('.le'); if (le) le.setAttribute('opacity', (+le.getAttribute('opacity') || 0) * (1 - kl(0, 1, (rx - 4) / 10)));
  tu.setAttribute('opacity', f.tunga * las);
  fig.querySelectorAll('.tand').forEach((e, j) => { const rad = j < 4 ? 0 : 1, tx = cx - 0.85 * rx + (j % 4 + 0.5) * tw;
    const kurva = Math.sqrt(Math.max(0, 1 - ((tx - cx) / (rx || 1)) ** 2));
    const ty = rad ? my + ry * kurva - th : ovre + (ovre < my ? (my - ovre) * (1 - kurva) : 0) - 4;
    const [re, gl] = e.children, bl = f.tander[j];
    // tanden är en månghörning med rund kant (linjen i tandens färg rundar hörnen): rund, lång (0,8 tandhöjd längre) eller spetsig
    const form = e.dataset.form, r = (form === 'spets' ? 0.2 : form === 'mjuk' ? 0.28 : 0.34) * tw, x0 = tx - tw / 2 + 2.5 + r, x1 = tx + tw / 2 - 2.5 - r, y0 = ty + r, y1 = ty + th + 4 - r + (form === 'lang' ? 0.8 * th : 0);
    const farg = `rgb(${mix(TANDMUN.matt, TANDMUN.blank, bl).map(Math.round)})`;
    re.setAttribute('d', form === 'spets' ? `M${x0} ${y0} L${x1} ${y0} L${x1} ${ty + 0.5 * th} L${tx} ${ty + 1.45 * th} L${x0} ${ty + 0.5 * th}Z`
      : form === 'mjuk' ? `M${x0} ${y0} L${x1} ${y0} L${x1} ${ty + 0.7 * th} L${tx} ${ty + 1.2 * th} L${x0} ${ty + 0.7 * th}Z` : `M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} L${x0} ${y1}Z`);
    re.setAttribute('fill', farg); re.setAttribute('stroke', farg); re.setAttribute('stroke-width', 2 * r);
    gl.setAttribute('cx', tx - tw * 0.18); gl.setAttribute('cy', ty + th * (rad ? 0.45 : 0.55)); gl.setAttribute('r', Math.max(3.2, 0.15 * tw)); gl.setAttribute('opacity', bl > 0.5 ? 1 : 0);
    e.setAttribute('opacity', f.tand * las * (rad ? f.tandNere ?? 1 : 1)); }); };   // tandNere 0 = bara övre raden (tandleendet)
// Tandborsten (rekvisita/tandborsten.md, 877 × 238) läggs efter .kropp och före armarna framför kroppen: handen hamnar ovanpå skaftet.
const borsteBild = href => `<g class="borste"><image href="${href}" width="877" height="238"/>
  <g class="skum" fill="#fff" stroke="#cfe6f2" stroke-width="7">${[[62, 30, 34], [122, 6, 40], [176, 34, 30], [112, 52, 26]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g></g><g class="bubblor"></g>`;
// Borsten leds av munnen och armen följer (030): borstMal ger borsthuvudets plats i ansiktets ruta ur posen:
// borstX −1 … 1 över munnens bredd (−1 = vänstra mungipan, tänderna i TANDX), borstY −1 övre raden … 0 mitten … 1 nedre raden,
// borstNer px = hela borsten och handen sänkta (ner bakom handfatet). borstGrepp ger handens plats: borsten är BORSTL lång
// och pekar snett upp mot munnen i vinkeln lut (grader). Figurens rita() flyttar borstarmen dit, i ett stycke.
const BORSTL = Math.hypot(TANDMUN.grep[0] - TANDMUN.huvud[0], TANDMUN.grep[1] - TANDMUN.huvud[1]) * TANDMUN.sk;
const borstMal = (p, cx, mun) => { const { ovre, nedre, th } = tandMatt(mun);
  return [cx + p.borstX * mun[0], (ovre + nedre) / 2 + p.borstY * (nedre - ovre - th) / 2 + p.borstNer]; };
const borstGrepp = (mal, lut) => [mal[0] - BORSTL * Math.cos(lut * Math.PI / 180), mal[1] - BORSTL * Math.sin(lut * Math.PI / 180)];
// Borstarmens förskjutning [dx, y0] så att handen (0,8 av armens längd) hamnar i greppet; blandas in med posens borste 0–1.
const borstArm = (p, grepp, arm, vinkel, [px, py], sx, dx, y0) => { const v = (arm.axel + vinkel) * Math.PI / 180;
  return [mix(dx, grepp[0] - 0.8 * arm.L * Math.cos(v) - px - (sx - 1) * (px - 512), p.borste), mix(y0, grepp[1] - 0.8 * arm.L * Math.sin(v) - py, p.borste)]; };
// grepp = handens plats (borstGrepp), mal = borsthuvudets plats, båda i figurens ruta. Borsten är spegelvänd (huvudet åt
// höger), så att borsten är uppåt när den pekar upp mot munnen. borstV vickar den lite kring handen. skum 0–1 = skummet på huvudet.
const borsteRita = (fig, p, [gx, gy], mal) => { const B = TANDMUN, e = fig.querySelector('.borste');
  e.querySelector('.skum').setAttribute('transform', `translate(118 40) scale(${kl(0, 1, p.skum || 0)}) translate(-118 -40)`);
  const vin = (Math.atan2(mal[1] - gy, mal[0] - gx) - Math.atan2(B.huvud[1] - B.grep[1], B.grep[0] - B.huvud[0])) * 180 / Math.PI + p.borstV;
  e.setAttribute('transform', `translate(${gx} ${gy}) rotate(${vin}) scale(${-B.sk} ${B.sk}) translate(${-B.grep[0]} ${-B.grep[1]})`);
  e.setAttribute('opacity', p.borste > 0.5 && p.fram[0] > 0.85 ? 1 : 0);
  // Bubblorna (posens bubblor = { k: styrka 0–1, t: sekunder }): sex små bubblor stiger lugnt från borsthuvudet och tonar bort
  // TANDMUN.bubbDx = sidoförskjutning i px högst upp för figurer med något rakt ovanför munnen (röda dinons noshorn): bubblorna driver ut åt sidan medan de stiger
  const b = p.bubblor, f1 = v => v.toFixed(1); let h = '';
  if (b && b.k > 0.01) for (let i = 0; i < 6; i++) { const a = (b.t * 0.42 + i / 6) % 1, r = (5 + 3 * (i % 3)) * (0.7 + 0.5 * a);
    const x = mal[0] + (B.bubbDx || 0) * (0.35 + 0.65 * a) + (i % 2 ? 1 : -1) * (8 + 7 * (i % 3)) + 9 * Math.sin(a * 5 + i * 1.7), y = mal[1] - 22 - 120 * a, o = b.k * Math.sqrt(Math.sin(Math.PI * a));
    h += `<g opacity="${o.toFixed(2)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#e6f6fc" fill-opacity="0.45" stroke="#fff" stroke-width="2.2"/>
      <path d="M${f1(x - 0.55 * r)} ${f1(y - 0.15 * r)} A${f1(0.6 * r)} ${f1(0.6 * r)} 0 0 1 ${f1(x - 0.1 * r)} ${f1(y - 0.58 * r)}" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></g>`; }
  fig.querySelector('.bubblor').innerHTML = h; };
// ?prov=borsta&zoom=1|1.6|2.8|4 (som kattens provbild i 025): figuren bakom handfatet i badrummet, gapet med tänder, borsten i handen.
// Kameran siktar på munnen/bröstet. Ger sidans render(t).
// zoom=mun: tätt på munnen, så att gapet fyller en tredjedel av bildens bredd (zoomen blir ca 10).
const provBorsta = (zoom, ror, MARK = 935, SK = 0.5, HX = 960) => { let Z = +zoom || 1.6; const HS = 0.27, HB = 802 * HS, HH = 775 * HS;
  document.getElementById('scen').innerHTML = `<image href="../../../bakgrunder/badrummet/badrummet-v1.jpeg" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>`;
  document.getElementById('forgrund').innerHTML = `<image href="../../../rekvisita/handfatet/cut/handfatet.png" x="${HX - HB / 2 + 12}" y="${MARK - HH + 6}" width="${HB}" height="${HH}"/>`;
  const fig = figur(HX, MARK, SK), f = { ...param('gapar'), tander: TANDMUN.prov }, p = blandaPose('neutral', 'borstar', 1);
  fig.ansikte = f; fig.pose = p; rita(fig, f, p);
  const fy = MARK - SK * (FOTTER - 470); let tx = kl(1920 - 1920 * Z, 0, 960 - HX * Z), ty = kl(1080 - 1080 * Z, 0, 560 - fy * Z);
  if (Z >= 4 || zoom === 'mun') {   // utsnittet "munnen": munnen mitt i bild
    const m = fig.querySelector('.mun').getBoundingClientRect(), s = document.querySelector('svg').getBoundingClientRect(), k = 1920 / s.width;
    if (zoom === 'mun') Z = 640 / (m.width * k);
    tx = kl(1920 - 1920 * Z, 0, 960 - (m.left + m.width / 2 - s.left) * k * Z); ty = kl(1080 - 1080 * Z, 0, 540 - (m.top + m.height / 2 - s.top) * k * Z); }
  document.getElementById('kamera').setAttribute('transform', `translate(${tx} ${ty}) scale(${Z})`);
  // ror = namnet på en rörelse (?rorelse=borsta): den spelas i badrummet i stället för den stilla posen
  return t => { if (ROR[ror]) rorelse(ror, t, fig); document.getElementById('brus').setAttribute('seed', Math.floor(t * 10) % 50 + 1); }; };

// ---------- Borsta tänderna (030): borstDel(del, tl, d) ger [ansikte, pose] för en del av borstningen ----------
// 'upp'     borsten kommer upp i bild (munnen står öppen, matta tänder), d ca 1,5 s
// 'skrubba' borsten gnuggar fram och tillbaka över tänderna, lite skum (utsnittet ansiktet)
// 'uppe'    borsten går längs övre raden, vänster → höger, och varje tand blir vit när den passerar (utsnittet munnen)
// 'nere'    samma på nedre raden, höger → vänster
// 'klar'    borsten sjunker ur bild, det breda tandleendet, en liten glansstjärna vid o.glans s (standard 1,1)
// tl = sekunder in i delen, d = delens längd. Delarna hakar i varandra: var och en börjar där den förra slutade.
// o: ner = hur långt borsten sänks (px i figurens ruta) och at = var i sidled (borstX) den sänks, så att borsten och handen
// hamnar bakom handfatet (det täcker figurens x 320–752 i provbilden); glans = när stjärnan kommer i 'klar'.
// Lugnt: borsten glider, gnuggar ±5 px 2,6 gånger i sekunden; figuren studsar inte och ingenting vänds.
// Medan den borstar blundar figuren glatt och små bubblor stiger från borsten (Sanna 2026-11-11: "some bubble and closed eyes").
const borstDel = (del, tl, d, o = {}) => { const ner = o.ner ?? 185, at = o.at ?? 0.55, u = kl(0, 1, tl / d), gn = Math.sin(2 * Math.PI * 2.6 * tl);
  const gap = (tander, titt = [0, -4], blund = 1) => ({ ...param('gapar'), tander: Array.isArray(tander) ? tander : Array(8).fill(tander), titt, glad: [blund, blund] });
  const bubb = k => ({ k, t: tl + ({ skrubba: 0, uppe: 3.1, nere: 5.3, klar: 7.9 })[del] });
  const B = (x, y, mer) => ({ ...blandaPose('neutral', 'borstar', 1), borstX: x, borstY: y, borstV: 1.5 * gn, ...mer });
  if (del === 'upp') { const k = mjuk(kl(0, 1, (tl - (d - 0.7)) / 0.6));        // väntar sänkt, kommer upp de sista 0,7 s
    return [gap(0, [-0.8 * k, -4 + 5 * k], 0), B(mix(at, -0.2, k), 0, { borstNer: ner * (1 - k), borstV: 0 })]; }
  if (del === 'skrubba') { const ut = mjuk(kl(0, 1, (d - tl) / 0.5)), fas = 2 * Math.PI * Math.max(0, tl - 0.2) / 2.8;
    const x = mix(-0.6375, -0.2 + 0.55 * Math.sin(fas), ut) * 1 + 0.05 * gn, in_ = mjuk(kl(0, 1, tl / 0.2));
    return [gap(0, [4 * x, 1], mjuk(kl(0, 1, (tl - 0.15) / 0.35))), B(mix(-0.2, x, in_), 0, { skum: mix(0.6, mjuk(kl(0, 1, (tl - 0.4) / 0.8)), ut), bubblor: bubb(mjuk(kl(0, 1, (tl - 0.5) / 0.6))) })]; }
  if (del === 'uppe' || del === 'nere') { const upp = del === 'uppe', s = upp ? 1 : -1;
    // 0–12 %: borsten flyttar sig till radens början, 12–92 %: glider längs raden, sedan stilla
    // (raden börjar och slutar strax utanför yttersta tanden, ±0,85, så att tänderna blir vita mjukt och delarna hakar i varandra)
    const k0 = mjuk(kl(0, 1, u / 0.12)), g = kl(0, 1, (u - 0.12) / 0.8), x = upp ? mix(mix(-0.6375, -0.85, k0), 0.85, 0.7 * g + 0.3 * mjuk(g)) : mix(0.85, -0.85, 0.7 * g + 0.3 * mjuk(g));
    const xg = -s * 0.85 + s * 1.7 * (0.7 * g + 0.3 * mjuk(g)), tander = TANDX.map(tx => mjuk(kl(0, 1, (s * (xg - tx)) / 0.16 + 0.5)));
    return [gap(upp ? [...tander, 0, 0, 0, 0] : [1, 1, 1, 1, ...tander], [4 * x, upp ? mix(1, -2, k0) : mix(-2, 3, k0)]),
      B(x + 0.03 * gn * mjuk(kl(0, 1, g / 0.08)) * mjuk(kl(0, 1, (1 - g) / 0.08)), upp ? -k0 : mix(-1, 1, k0), { skum: 0.6, bubblor: bubb(1) })]; }
  // klar: borsten sjunker (0–0,5 s), munnen går till tandleendet (0,3–0,8 s), stjärnan i 0,7 s
  const bort = kl(0, 1, tl / 0.5), le = mjuk(kl(0, 1, (tl - 0.3) / 0.5)), gl = kl(0, 1, (tl - (o.glans ?? 1.1)) / 0.7);
  return [{ ...blanda(gap(1, [-3.4, 3], 1), { ...param('flinar'), tander: Array(8).fill(1) }, le), glimt: gl },
    B(mix(-0.85, at, mjuk(bort)), 1, { borstNer: ner * bort * bort, skum: 0.6 * (1 - mjuk(bort)), borstV: 0, bubblor: bubb(1 - mjuk(kl(0, 1, tl / 0.8))) })]; };
// Hela borstningen i en slinga (13 s), för ?rorelse=borsta och provbilderna. Figuren lägger in den i sin ROR: borsta.
const BORSTA = [['upp', 1.5], ['skrubba', 3.4], ['uppe', 2.6], ['nere', 2.6], ['klar', 2.9]];
// borsta(t) = slingan; borsta(del, tl, d, o) = en del (samma som borstDel, så att filmen når den genom L.ROR.borsta).
const borsta = (t, tl, d, o) => { if (typeof t === 'string') return borstDel(t, tl, d, o); let T = t % 13;
  for (const [del, d] of BORSTA) { if (T < d || del === 'klar') { const [f, p] = borstDel(del, T, d);
    // slingan: munnen öppnas först och stängs sist (0,4 s), så att varvet går ihop
    const k = del === 'upp' ? mjuk(kl(0, 1, T / 0.4)) : del === 'klar' ? mjuk(kl(0, 1, (d - T) / 0.4)) : 1;
    return [k < 1 ? { ...blanda('neutral', f, k), tander: f.tander } : f, p]; } T -= d; } };

// ---------- Tänder och flykt ----------
// Tänderna behöver ingen egen kod här: varje figur lägger tandmun(id, kant) i .munnen, anropar tandmunRita sist i rita() och
// har uttrycken flinar (tandleendet) och ibland gapar (se .claude/skills/lk-figur/nytt-tander-flyga.md).
//
// flaxa(t): en kort flygtur på stället (4 s, som ugglans flaxa): hukar, lyfter med små snabba vingslag, svävar en stund lågt
// och landar mjukt. Fötterna dras upp, tofsar/antenner (oron) och svansen släpar efter, ögonen tittar upp på väg upp (0,2 s
// före kroppen) och lite ner mot marken före landningen. Vingslagen börjar strax före lyftet och slutar strax efter landningen.
// Figuren väljer in: ROR = { ...rorelser(), flaxa, } och ställer in talen i RORELSE.flaxa (det som saknas tas ur FLAXA0):
// h svävhöjd (px) · gung upp och ner i takt med slagen (px) · takt vingslag per sekund · arm [bas, sving] armarnas (vingarnas)
// vinkel i luften, bas + sving·sin: håll bas + sving + 8 (vilan) under figurens GOM.fran, annars glider armen in och göms ·
// tryck armarna ner i huken (grader) · fot fötterna upp (px) · ora tofsens/antennernas eftersläp (grader per höjdfart) ·
// oraSlag deras vippning med slagen · svans svansens vippning med slagen (0 = bara vilsvansen) · titt blicken upp i luften (px) ·
// vinge true: posen får vinge [synlighet 0–1, vinkel i grader] för figurer med egna ritade vingar (nyckelpigan), surr Hz
const FLAXA0 = { h: 130, gung: 7, takt: 3.5, arm: [-6, 22], tryck: 10, fot: -24, ora: 5, oraSlag: 1.5, svans: 0, titt: -3, vinge: false, surr: 8 };
const flaxa = t => { const o = opt(), F = { ...FLAXA0, ...(o.flaxa || {}) }, T = t % 4;
  const hojd = T => mjuk(kl(0, 1, (T - 0.3) / 0.7)) * mjuk(kl(0, 1, (2.9 - T) / 0.7)), upp = hojd(T);
  const fart = T => (hojd(T + 0.03) - hojd(T - 0.03)) / 0.06 / 2.14;   // höjdens fart, −1 … 1
  const slag = mjuk(kl(0, 1, (T - 0.2) / 0.3)) * mjuk(kl(0, 1, (3.0 - T) / 0.3)), fas = 2 * Math.PI * F.takt * T;
  const tryck = Math.sin(Math.PI * kl(0, 1, T / 0.35)) + 0.7 * Math.sin(Math.PI * kl(0, 1, (T - 2.85) / 0.4));
  const v = fart(T + 0.2), ora = F.ora * fart(T) * 2.14 + F.oraSlag * Math.sin(fas - 1) * slag, f = blanda('neutral', 'glad', 1);
  const arm = mix(-F.tryck * tryck, F.arm[0] + F.arm[1] * Math.sin(fas), slag);
  return [blinka({ ...f, titt: [0, F.titt * upp - 5 * Math.max(0, v) + 3 * Math.max(0, -v)] }, t),
    P({ lyft: -(F.h + F.gung * Math.sin(fas - 1.2)) * upp, strack: -0.08 * tryck + 0.03 * upp, bred: 0.06 * tryck, armar: [arm, arm],
      benY: [F.fot * upp, F.fot * upp], ...oronen(o, [ora, ora]),
      ...svansen(o, (o.svans ? o.svans(t) : 0) + F.svans * Math.sin(fas - 1.5) * slag),
      ...(F.vinge ? { vinge: [slag, 10 * Math.sin(2 * Math.PI * F.surr * T)] } : {}) })]; };

// ---------- Känslor ----------
// Uttrycken ledsen och arg ligger i varje figurs UTTRYCK (data, ingen kod här). Här bor det som är lika för alla figurer:
// stunder att lägga in i en film eller en rörelseslinga. Figuren tar med dem i ROR: const ROR = { ...kanslorRorelser(), … }.
// Alla använder bara uttrycken ledsen/arg och poserna ner/stampar, som alla figurer har.
// ledsenDel(tl, d): tittar ner och suckar (kroppen lyfts lite och sjunker ihop, öronen hänger). Tonar in på 0,5 s och ut på 0,5 s.
const ledsenDel = (tl, d = 3) => { const k = mjuk(kl(0, 1, tl / 0.5)) * mjuk(kl(0, 1, (d - tl) / 0.5)), suck = Math.sin(Math.PI * kl(0, 1, (tl - 0.9) / 0.7)),
  ner = mjuk(kl(0, 1, (tl - 1.5) / 0.7)) * mjuk(kl(0, 1, (d - 0.5 - tl) / 0.5));
  return [blanda('neutral', 'ledsen', k), { ...blandaPose('neutral', 'ner', 0.7 * k), strack: 0.02 * suck - 0.035 * ner, bred: 0.015 * ner }]; };
// argDel(tl, d): sur min och två stamp med höger fot (foten lyfts, sätts ner, kroppen trycks ihop lite vid varje stamp).
const argDel = (tl, d = 3) => { const st = u => Math.sin(Math.PI * kl(0, 1, u)), k = mjuk(kl(0, 1, tl / 0.4)) * mjuk(kl(0, 1, (d - tl) / 0.5)),
  lyft = st((tl - 0.9) / 0.4) + st((tl - 1.5) / 0.4), ner = st((tl - 1.25) / 0.25) + st((tl - 1.85) / 0.25);
  return [blanda('neutral', 'arg', k), { ...blandaPose('neutral', 'stampar', lyft), strack: -0.02 * ner, bred: 0.015 * ner }]; };
// Tunga och tårar. Två parametrar i varje figurs NEUTRAL (alla uttryck delar dem, så de går att blanda):
//   tungan [k, x, v]: tungan sticker ut ur munnen k 0–1 (längden), x −1 … 1 sidled över munnens halva bredd (0 mitten, 1 högra
//     mungipan), v åt vilket håll den pekar, grader från rakt ner (+ åt höger, 90 rakt åt höger, 180 uppåt över övre läppen)
//   tar [k, fas]: tårarna k 0–1 (en ljusblå tår per öga plus en glansig bula under ögat), fas 0–1 var den ena tåren är på väg ner
//     över kinden (den andra är en halv vända före), en tår syns när den lossnar, rinner och bleknar.
// kansloRita(fig, f) ritar dem i en egen grupp .kanslor sist i ansiktsgruppen .drag (så de följer ansiktet) och anropas i rita() före huvud().
// Munnens plats läses ur figuren själv: den öppna munnen (.mun) när den syns, annars leendets linje (.le), eller sidans MUNPUNKT = [x, y, halv bredd].
// Gruppen skapas först när något syns och göms (display none) annars, så de gamla uttrycken ritar precis som förut. Figurens egna mått: const KANSLOR = { tungaB, tungaL, tarB, ogonRy } (ögats halva höjd, annars OGONR[1] eller 25).
const KANSLOR0 = { tungaB: 22, tungaL: 42, tarB: 13, tunga: '#f6a6b0', tungaKant: '#d9707f', tar: '#bfe7fb', tarKant: '#fff' };
const kanslor = () => ({ ...KANSLOR0, ...(typeof KANSLOR === 'undefined' ? {} : KANSLOR) });
const munPunkt = fig => { if (typeof MUNPUNKT !== 'undefined') return MUNPUNKT;
  const m = fig.querySelector('.mun'), l = fig.querySelector('.le'), oppen = m && +(m.getAttribute('opacity') ?? 1) > 0.5 && m.getAttribute('d') !== '' && m.getBBox().width > 1, b = oppen ? m.getBBox() : l ? l.getBBox() : null;
  return b && b.width > 1 ? [b.x + b.width / 2, b.y + b.height * (oppen ? 0.62 : 0.5), Math.max(10, b.width / 2)] : [512, 462, 20]; };
const kansloRita = (fig, f) => { const d = fig.querySelector('.drag'); if (!d || !f.tungan) return;
  const [tk, tx, tv] = f.tungan, [ak, fas] = f.tar, K = kanslor(); let g = d.querySelector('.kanslor');
  if (!g) { if (tk < 0.001 && ak < 0.001) return;
    d.insertAdjacentHTML('beforeend', `<g class="kanslor"><g class="pool">${[0, 1].map(() => `<path fill="none" stroke="${K.tar}" stroke-width="7" stroke-linecap="round"/>`).join('')}</g>
      <path class="tunga2" fill="${K.tunga}" stroke="${K.tungaKant}" stroke-width="3" stroke-linejoin="round"/>
      ${[0, 1].map(() => `<g class="tar"><path d="M0 -15 C7 -5 10 1 10 6 A10 10 0 0 1 -10 6 C-10 1 -7 -5 0 -15Z" fill="${K.tar}" stroke="${K.tarKant}" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M-5 3 Q-6 8 -2 10" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>`).join('')}</g>`);
    g = d.querySelector('.kanslor'); }
  g.setAttribute('display', tk > 0.001 || ak > 0.001 ? '' : 'none');
  // tungan: en rundad tunga från munnens plats, pekar v grader från rakt ner
  const [mx, my, mb] = munPunkt(fig), tu = g.querySelector('.tunga2'), L = K.tungaL * kl(0, 1, tk), w = K.tungaB / 2;
  tu.setAttribute('opacity', kl(0, 1, tk * 5));
  tu.setAttribute('d', L < 2 ? '' : `M${-w} -6 L${-w} ${Math.max(0, L - w)} A${w} ${w} 0 0 0 ${w} ${Math.max(0, L - w)} L${w} -6Z`);
  tu.setAttribute('transform', `translate(${mx + tx * mb * 0.8} ${my}) rotate(${-tv})`);
  // tårarna: ögats plats ur OGON och kinden ur KINDER (varje figur har dem), tåren rinner mot kinden
  const ry = K.ogonRy ?? (typeof OGONR !== 'undefined' ? OGONR[1] : 25), pool = g.querySelectorAll('.pool path'), tarar = g.querySelectorAll('.tar');
  OGON.forEach(([ox, oy], i) => { const s = i ? 1 : -1, ex = ox + f.titt[0], ey = oy + f.ogonY + f.titt[1] * 0.5 + ry * (f.ogonS[1] - 1), [kx, ky] = KINDER[i];
    pool[i].setAttribute('d', `M${ex - 0.52 * ry} ${ey + ry - 1} Q${ex} ${ey + ry + 8} ${ex + 0.52 * ry} ${ey + ry - 1}`); pool[i].setAttribute('opacity', kl(0, 1, ak * 3));
    const u = (((fas + 0.5 * i) % 1) + 1) % 1, y0 = ey + ry + 6, y1 = Math.max(y0 + 36, ky + 28), x0 = ex + s * 7, x1 = ex + (kx - ex) * 0.45 + s * 4;
    const o = ak * kl(0, 1, u / 0.12) * kl(0, 1, (1 - u) / 0.3), sk = (0.6 + 0.4 * kl(0, 1, u / 0.25)) * K.tarB / 10;   // tarB = tårens bredd i px (standard 13 → skala 1,3)
    tarar[i].setAttribute('transform', `translate(${x0 + (x1 - x0) * u} ${y0 + (y1 - y0) * (0.55 * u + 0.45 * u * u)}) scale(${sk})`);
    tarar[i].setAttribute('opacity', o); }); };
// mumsDel(tl, d = 2.4): mums: glada blundande ögon, ett litet gap och tungan slickar mungipan två gånger, ett litet nick.
const mumsDel = (tl, d = 2.4) => { const k = mjuk(kl(0, 1, tl / 0.4)) * mjuk(kl(0, 1, (d - tl) / 0.45)),
  u1 = kl(0, 1, (tl - 0.55) / 0.55), u2 = kl(0, 1, (tl - 1.3) / 0.55), l = Math.sin(Math.PI * u1) + Math.sin(Math.PI * u2), f = blanda('neutral', 'mums', k);
  return nicka({ ...f, tungan: [k * l, f.tungan[1], k * (100 + 60 * Math.sin(Math.PI * (u1 < 1 ? u1 : u2)))] }, P(), tl, d, 2); };   // tungan svepar från rakt ut upp mot övre läppen och tillbaka
// skrattDel(tl): skrattet i en slinga på 1,6 s: tre "ha" per varv, kroppen sträcks en aning och armarna lyfts lite i takt, munnen vidgas lite. Lugnt, ingen studs.
const skrattDel = t => { const T = t % 1.6, b = (1 - Math.cos(2 * Math.PI * 3 * T / 1.6)) / 2, f = blanda('neutral', 'skrattar', 1), o = opt();
  return [{ ...f, mun: [f.mun[0] * (0.92 + 0.12 * b), f.mun[1] * (0.9 + 0.2 * b), f.mun[2], f.mun[3]] }, P({ strack: 0.014 * b, bred: -0.006 * b, armar: [3 * b, 3 * b],
    luta: 0.7 * Math.sin(2 * Math.PI * 1.5 * T / 1.6), ...oronen(o, [-2 * b, -2 * b]) })]; };
// uschDel(tl, d = 2.4): usch: ögonen hopknipna, tungan ut och vickar, huvudet skakar lite (skakaHuvud).
const uschDel = (tl, d = 2.4) => { const k = mjuk(kl(0, 1, tl / 0.3)) * mjuk(kl(0, 1, (d - tl) / 0.4)), f = blanda('neutral', 'usch', k);
  return skakaHuvud({ ...f, tungan: [f.tungan[0], 0, f.tungan[2] + 10 * k * Math.sin(2 * Math.PI * 2.5 * tl)] }, P(), tl, d, 2); };
// gratDel(t): gråter i en slinga på 4 s: tårarna lossnar och rinner (en var 2:a sekund, fas = t / 2 växer jämnt och kansloRita tar %1), munnen darrar (2,25 Hz, jämnt upp i 4 s), tre små snyftningar (huvudet sjunker en aning).
const gratDel = t => { const T = t % 4, f = blanda('neutral', 'gratar', 1), v = Math.sin(2 * Math.PI * 2.25 * t), sn = t0 => Math.sin(Math.PI * kl(0, 1, (T - t0) / 0.5)),
  s = Math.max(sn(0.7), sn(1.9), sn(3.1)), o = opt();
  return [{ ...f, le: f.le + 0.13 * v, leBred: f.leBred + 0.05 * Math.sin(2 * Math.PI * 2.25 * t + 1), tar: [1, t / 2] },
    P({ nick: [0.5 * s, 0.4 * s], strack: 0.012 * s - 0.02 * s * s, ...oronen(o, [2 * s, 2 * s]) })]; };
// stoltDel(tl, d = 3): stolt: bröstet ut och hakan upp (posen stolt), tonar in och ut.
const stoltDel = (tl, d = 3) => { const k = mjuk(kl(0, 1, tl / 0.5)) * mjuk(kl(0, 1, (d - tl) / 0.5)); return [blanda('neutral', 'stolt', k), blandaPose('neutral', 'stolt', k)]; };
// Loopar för ?rorelse=ledsen och ?rorelse=arg (3,6 s: stunden på 3 s, sedan en halv sekund i vila); de nya ansiktena finns som loopar när figuren har dem.
const kanslorRorelser = () => { const stilla = () => [blanda('neutral', 'neutral', 0), P()];
  return {
    ledsen: t => { const T = t % 3.6, [f, p] = T < 3 ? ledsenDel(T) : stilla(); return [blinka(f, t), p]; },
    arg: t => { const T = t % 3.6, [f, p] = T < 3 ? argDel(T) : stilla(); return [blinka(f, t), p]; },
    ...(UTTRYCK.mums && { mumsa: t => { const T = t % 2.8, [f, p] = T < 2.4 ? mumsDel(T) : stilla(); return [blinka(f, t), p]; } }),
    ...(UTTRYCK.skrattar && { skratta: t => { const [f, p] = skrattDel(t); return [f, p]; } }),
    ...(UTTRYCK.usch && { usch: t => { const T = t % 3, [f, p] = T < 2.4 ? uschDel(T) : stilla(); return [f, p]; } }),
    ...(UTTRYCK.gratar && { grata: t => { const [f, p] = gratDel(t); return [blinka(f, t), p]; } }),
    ...(UTTRYCK.stolt && POSER.stolt && { stolt: t => { const T = t % 3.6, [f, p] = T < 3 ? stoltDel(T) : stilla(); return [blinka(f, t), p]; } }) }; };
