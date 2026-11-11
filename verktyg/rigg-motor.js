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
//   POSE0: hall: [0, 0], sakV: 0, sakGrepp: 0, sakFri: [x, y, v]
//   sist i rita(), efter huvud(): sakRita(fig, p);
// Posen: hall [v, h] 0–1 saken sitter i vänster/höger hand (0 = ligger fritt) · sakV extra vinkel i handen (grader) ·
// sakGrepp 0–1 från greppet vid sidan till greppet framför magen (sakFramVag sätter det) ·
// sakFri [x, y, v] där saken ligger när den inte hålls: dess fot i figurens 1024-ruta (golvet = FOTTER) och vinkel.
// Saken: sakBild(href, w, h, o) för en bild, sakKod(svg, o) för en sak ritad i kod, o =
//   grepp [x, y] där handen tar tag (sakens egna px) · fot [x, y] det den står på · skala sakens px → figurens px ·
//   greppFram [x, y] och vFram (grader) greppet och vinkeln framför magen (posens sakGrepp 0 → 1 blandar dit; standard som vid sidan) ·
//   folj 0–1 hur mycket saken vrids med armen (0 = står upprätt, muggen; 1 = sitter fast i handen, skeden) · v grundvinkel ·
//   kant den inbakade vita kanten i sakens egna px (bilder ur rekvisita har ca 1 % av höjden) · spegel true = spegelvänd
// Kanten: saken får figurens kant (HAND.kant) runt om i kod, minus den inbakade, så att den ser ut som resten av figuren.
// Lager: i handen ligger saken under handen, bakom kroppen när armen är bakom och framför kroppen när armen är framför;
// fri ligger den framför figuren. Bytet sker vid hall 0,5, när handen redan är där saken ligger.
let SAKNR = 0;
const sakBild = (href, w, h, o = {}) => ({ svg: `<image href="${href}" width="${w}" height="${h}"/>`, grepp: [w / 2, h / 2], fot: [w / 2, h], ...o });
const sakKod = (svg, o = {}) => ({ grepp: [0, 0], fot: [0, 0], ...o, svg });
// Lägger saken i figuren (en kopia per lager: bakom armen, framför kroppen under handen, överst). sakIn(fig, null) tar bort den.
const sakIn = (fig, sak) => { fig.querySelectorAll('.sak-plats').forEach(e => e.remove()); fig.sak = sak; if (!sak) return;
  const kropp = fig.querySelector(':scope > g'), armar = kropp.querySelectorAll(':scope > .arm-l, :scope > .arm-r');
  const s = sak.skala || 1, r = Math.max(0, HAND.kant - (sak.kant || 0) * s), id = 'sak' + SAKNR++;
  // kanten: en vit kopia av sakens form, utvidgad r px, under saken
  const html = n => `<g class="sak-plats" data-lager="${n}" display="none"><filter id="${id}-${n}" x="-0.5" y="-0.5" width="2" height="2">
    <feMorphology in="SourceAlpha" operator="dilate" radius="${r.toFixed(1)}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter><g filter="url(#${id}-${n})"><g class="sak-ting">${sak.svg}</g></g></g>`;
  armar[0].insertAdjacentHTML('beforebegin', html('bak'));
  (armar[2] || kropp.querySelector(':scope > .kropp').nextElementSibling).insertAdjacentHTML('beforebegin', html('fram'));
  kropp.insertAdjacentHTML('beforeend', html('over')); };
const sakMatris = e => { const t = e && e.transform.baseVal.consolidate(); return t ? DOMMatrix.fromMatrix(t.matrix) : new DOMMatrix(); };
const sakGrader = m => Math.atan2(m.b, m.a) * 180 / Math.PI;
// Handens plats [x, y], armens vridning (grader) och lager ('bak' / 'fram') i figurens innersta grupp (.kanel, .figuren …),
// läst ur armens egen transform som rita() just satte. n = 'l' | 'r'.
const handPunkt = (fig, n) => { const armar = [...fig.querySelectorAll(':scope > g > .arm-' + n)], m = sakMatris(armar[0]);
  const j = armar.findIndex(e => e.getAttribute('opacity') !== '0'), pt = m.transformPoint(new DOMPoint(...HAND[n]));
  return { x: pt.x, y: pt.y, v: sakGrader(m), lager: j > 0 ? 'fram' : 'bak' }; };
// Placerar saken ur posen. Anropas sist i rita().
const sakRita = (fig, p) => { const sak = fig.sak; if (!sak) return;
  const hall = p.hall || [0, 0], i = hall[1] > hall[0] ? 1 : 0, k = kl(0, 1, hall[i]), hd = handPunkt(fig, i ? 'r' : 'l');
  const mk = sakMatris(fig.querySelector(':scope > g')), [fx, fy, fv] = p.sakFri || [512, FOTTER, 0], s = sak.skala || 1;
  // fri: foten i (fx, fy) med vinkeln fv i figurens ruta → greppets plats, omräknat till den innersta gruppen (som lutar, böjer och hoppar)
  const G = mix(sak.grepp, sak.greppFram || sak.grepp, kl(0, 1, p.sakGrepp || 0));   // greppet: vid sidan → framför magen
  const a = fv * Math.PI / 180, gx = (G[0] - sak.fot[0]) * s * (sak.spegel ? -1 : 1), gy = (G[1] - sak.fot[1]) * s;
  const fri = mk.inverse().transformPoint(new DOMPoint(fx + gx * Math.cos(a) - gy * Math.sin(a), fy + gx * Math.sin(a) + gy * Math.cos(a)));
  const x = mix(fri.x, hd.x, k), y = mix(fri.y, hd.y, k), v = mix(sak.v || 0, sak.vFram ?? sak.v ?? 0, kl(0, 1, p.sakGrepp || 0)) + mix(fv - sakGrader(mk), (sak.folj ?? 1) * hd.v + (p.sakV || 0), k);
  // I handen ligger saken alltid under handen. Framför kroppen tar handen tag på sakens inre sida (greppFram), så att saken
  // ligger bort från armens tonade rot (annars en brun smet över saken) och handen syns ovanpå (saken över handen dolde den).
  const lager = k > 0.5 ? hd.lager : 'over', fr = p.fram[i];
  // Bytet bakom → framför med handen (sakFramVag): handkopian och saken framför tonar in på vägen fram 0 → 1 medan kopiorna bakom
  // ligger kvar hela, så att inget blir genomskinligt (riggen själv byter hårt vid 0,85)
  const tona = k > 0.5 && p.hand > 0.5 && fr > 0 && fr < 1 ? mjuk(fr) : -1, ops = { bak: 1, fram: tona, over: 0 };
  if (tona >= 0) { const armar = fig.querySelectorAll(':scope > g > .arm-' + (i ? 'r' : 'l')), syns = Math.max(...[...armar].map(e => +e.getAttribute('opacity')));
    armar[0].setAttribute('opacity', syns); armar[armar.length - 1].setAttribute('opacity', tona * syns); }
  fig.querySelectorAll('.sak-plats').forEach(e => { const op = tona >= 0 ? ops[e.dataset.lager] : +(e.dataset.lager === lager);
    e.setAttribute('display', op > 0 ? 'inline' : 'none'); e.setAttribute('opacity', op);
    e.querySelector('.sak-ting').setAttribute('transform', `translate(${x} ${y}) rotate(${v}) scale(${sak.spegel ? -s : s} ${s}) translate(${-G[0]} ${-G[1]})`); }); };

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

// --- Tandmunnen och tandborsten (borstasången, 030) för katten, kaninen och pandan: uttrycken gapar och flinar, tand 0–1, tunga 0–1,
// tander [8] varje tand 0 matt … 1 blank (övre raden vänster → höger, sedan nedre), posen borstar med borste 0–1 och borstV.
// Gulligt, inte argt (Sanna 2026-11-11): små runda tänder med luft emellan, varmt rosaröd mun, stor tunga, och tandleendet visar bara övre raden.
const TANDMUN = { matt: [242, 226, 172], blank: [255, 255, 255], tunga: '#f6a6b0', mun: [196, 84, 92], grep: [700, 150], huvud: [115, 95], sk: 0.28,
  prov: [1, 0, 1, 1, 1, 1, 0, 1] };   // provbildernas tänder: blanka utom två matta
// Läggs efter <path class="mun"> i .munnen. kant = färgen på munnens kontur ovanpå tänderna: på ljus päls flyter de vita
// tänderna annars ihop med pälsen (katten är svart och får ingen: tandmun(id)).
// form = figurens egna tänder i övre raden (0–3 vänster → höger): { langa: [1, 2] } kaninens två långa framtänder,
// { spetsiga: [0, 3] } kattens små rundade spetsar på de yttre. Utan form är alla tänder runda (pandan).
const tandmun = (id, kant, form = {}) => `<clipPath id="mun-${id}"><path class="munklipp"/></clipPath>
  <g clip-path="url(#mun-${id})"><ellipse class="tunga" fill="${TANDMUN.tunga}"/>${Array.from({ length: 8 }, (_, j) =>
    `<g class="tand" data-form="${(form.langa || []).includes(j) ? 'lang' : (form.spetsiga || []).includes(j) ? 'spets' : 'rund'}"><path stroke-linejoin="round"/><circle r="3.2" fill="#cfeeff"/></g>`).join('')}</g>
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
    const form = e.dataset.form, r = (form === 'spets' ? 0.2 : 0.34) * tw, x0 = tx - tw / 2 + 2.5 + r, x1 = tx + tw / 2 - 2.5 - r, y0 = ty + r, y1 = ty + th + 4 - r + (form === 'lang' ? 0.8 * th : 0);
    const farg = `rgb(${mix(TANDMUN.matt, TANDMUN.blank, bl).map(Math.round)})`;
    re.setAttribute('d', form === 'spets' ? `M${x0} ${y0} L${x1} ${y0} L${x1} ${ty + 0.5 * th} L${tx} ${ty + 1.45 * th} L${x0} ${ty + 0.5 * th}Z` : `M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} L${x0} ${y1}Z`);
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
  const b = p.bubblor, f1 = v => v.toFixed(1); let h = '';
  if (b && b.k > 0.01) for (let i = 0; i < 6; i++) { const a = (b.t * 0.42 + i / 6) % 1, r = (5 + 3 * (i % 3)) * (0.7 + 0.5 * a);
    const x = mal[0] + (i % 2 ? 1 : -1) * (8 + 7 * (i % 3)) + 9 * Math.sin(a * 5 + i * 1.7), y = mal[1] - 22 - 120 * a, o = b.k * Math.sqrt(Math.sin(Math.PI * a));
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
