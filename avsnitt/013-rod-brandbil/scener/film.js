// Röda sången (013): alla bilder i storyboarden som rörelse. Varje scen (../<scen>/index.html) sätter window.SCEN = [första, sista]
// bildnummer och laddar kanel-motor.js, scen-kit.js och den här filen. Tiderna (avsnittstid) läses ur storyboard-v2/storyboard.md,
// så de följer storyboarden. Sången börjar på avsnittstid SANG0; scenens t = 0 är dess första bilds start.
// render.mjs anropar window.seek(t). Inget slumpas: samma t ger alltid samma bild.
const SANG0 = 24.5, SLUT = 155.4, BEAT = 0.52;                // ca 115 bpm (tagning 4), slagen räknas från sångens start
const lerp = (a, b, k) => a + (b - a) * k, kl01 = k => Math.max(0, Math.min(1, k));
const ease = k => { k = kl01(k); return k * k * (3 - 2 * k); };
const fas = (u, a, b) => ease((u - a) / (b - a));             // 0 före a, 1 efter b, mjukt emellan
const studs = s => Math.abs(Math.sin(Math.PI * s / BEAT));    // ett skutt per slag
const blink = s => Math.floor(s / BEAT) % 2 ? 0.2 : 1;          // blåljusen blinkar, ett slag på, ett av
let TID = 0, BILD = '', BILD0 = 0;                           // BILD = storyboardbilden just nu (kanin() glider mellan bilderna)                                                  // avsnittstid just nu

// Kaninen blinkar och bilen gungar i takten, utan att varje bild behöver säga det.
const _rita = rita; rita = (fig, f, p) => _rita(fig, blinka(f, TID + 0.7), p);
// Blåljuset lyser bara på "iii-ooo!" (Sanna 2026-11-08: "blue light on io io only"). Sångtider ur Whisper (ordet "brand" i varje
// "Röd, röd, brandbil!"; ii-oo kommer direkt efter), versens ii-oo efter "Kaninen kör en brandbil". Ett fönster är IO_L s långt.
const IOIO = [23.9, 26.2, 30.6, 34.5, 39.2, 42.6, 94.1, 96.4, 102.5, 103.6], IO_L = 1.3;
const ioio = (st = TID - SANG0) => IOIO.some(a => st >= a && st < a + IO_L);
const _bil = bil; bil = (o = {}) => _bil({ ...o, y: (o.y || 0) - 5 * studs(TID - SANG0),
  blaljus: ioio() ? Math.max(o.blaljus || 0, 1.3 * blink(TID - SANG0 - 0.13)) : 0 });
// Rött kritsvep (scen-kit rodsvep) vid platsbytena, över skarven: SV s före och SV s efter (avsnittstid). Ritas i seek.
const SVEP = [26.5, 46.8, 67.6, 98.3, 130.5], SV = 0.7;   // 26,5: kritan ritar → vägen (i stället för hålet, 2026-11-09)
// Körscenen rullar: träden, busken och tuvorna glider förbi (scenen är speglad, så +x i koden är åt vänster i bild).
let FART = 1;
korscen = () => {
  platta(VÄG);
  SCROLL = TID * 140 * FART; const o = SCROLL % 2240, x = b => ((b + o) % 2240) - 160;
  vagStreck(SCROLL);
  sak('bakom', TRAD, x(300), 868, 640); sak('bakom', BUSKE, x(1180), 866, 180); sak('bakom', TRAD, x(1720), 868, 640);
  sak('framfor', GRAS, x(330), 1090, 180); sak('framfor', GRAS, x(1620), 1090, 180);
};

// Kritan ritar äpplet: kroppen växer fram bakom kritan (en klippmask som sveper), sedan skaftet och bladet.
function ritar(kropp, skaft, blad) {
  const id = 'rit' + Math.round(kropp * 1000);
  pynt(`<clipPath id="${id}"><rect x="${1260 - 600 * kropp}" y="200" width="${600 * kropp}" height="560"/></clipPath>`);   // speglat: sveper från vänster i bild
  ritat_apple({ skaft: skaft > 0.5, blad: blad > 0.5 });
  $('pynt').lastElementChild.setAttribute('clip-path', `url(#${id})`);
}

// Refrängen (04a–04i, tagning 4): brandbilen kör över den rosa ängen, äpplena bakom studsar i takten och grästuvorna glider förbi.
// "Röd, röd, brandbil!" = refrängbilden (alla studsar högt, blåljuset blinkar); uppför och nerför lutar bilen, tuta är en närbild
// på tassen, studsa = bilen och äpplena hoppar högt.
const T = s => s / BEAT, ANG = () => TID * 160;
// Studsa: fyra äppelträd, och ur kronorna hoppar fem stora glada äpplen ner på ängen, ett i taget. Väl nere studsar de högt
// i takten, säger "o" högst upp och trycks ihop när de landar. Ingen brandbil.
const studsApplen = s => { platta(ROSA_ANG); [1700, 1180, 680, 160].forEach((x, i) => appeltrad(x, 930, i % 2 ? 600 : 660));
  [1640, 1300, 960, 620, 280].forEach((x, i) => { const tl = s - 0.1 - i * 0.14, f = kl01(tl / 0.5);   // f: fallet ur trädet
    const b = tl < 0.5 ? 0 : Math.abs(Math.sin(Math.PI * (tl - 0.5) / BEAT)), botten = lerp(420, 1010, f * f) - 260 * b;
    glattApple(x, botten, lerp(130, 330, f), { mun: b > 0.7 || (f > 0 && f < 1) ? 'o' : 'le', tryck: 1 - 0.14 * Math.max(0, 0.2 - b) / 0.2 * (f >= 1) }); });
  kamera(1); };
// Refrängbilden = en vid bild av hela äppelträdskullen; brandbilen kommer längre fram för varje "Röd, röd, brandbil!":
// foten (04a) → halvvägs upp (04c) → toppen (04e) → börjar nerför (04g) → nere vid målet (04i).
const rodbild = (fx0, fx1, kf = backeKant) => (u, s) => { const hurra = studs(s) > 0.6;
  angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s), kf, mun: hurra ? 'o' : 'le' });
  paKant(lerp(fx0, fx1, ease(u)), kf, { k: 0.6, lampa: 1, blaljus: blink(s), upp: 8 * studs(s) });
  kanin({ iBil: true, uttryck: 'jatteglad', pose: blandaPose('neutral', 'hurra', ease(kl01((studs(s) - 0.2) / 0.6))), rikt: -0.6 }); kamera(1); };
const ANIM = {
  '00': u => { titelkort(); bil({ x: lerp(-900, 520, ease(u * 2.5)), y: 70 }); kanin({ iBil: true, uttryck: 'glad', rikt: -0.5 }); kamera(1); },
  '01a': u => { papper(); ritar(u, 0, 0); kritan(lerp(1250, 700, u), 500 - 170 * Math.sin(u * Math.PI)); },
  '01b': (u, s) => { papper(); ritar(1, s > 0.4, s > 1.0); if (s < 1.4) kritan(lerp(1000, 1100, kl01(s / 1.4)), 280); },
  '01c': (u, s, d) => { papper(); ritat_apple({ skaft: 1, blad: 1, gung: Math.sin(s * 6) * Math.exp(-s) > 0.2 });
    const z = fas(TID, SANG0, SANG0 + 2); if (z > 0) kamera(lerp(1, 2.6, z), 960, 520); },
  // Versen: brandbilen kör på vägen, blåljuset lyser stort på "iii-ooo" och kameran åker in på "Brandbilen är röd!".
  // På "Vad mer är rött?" tittar hon sig omkring, åt ena hållet och sedan åt det andra.
  '02a': (u, s) => { korscen(); bil({ lampa: 1 });   // inget stort blåljus på versens "iii-ooo" (Sanna 2026-11-09: "skip blue lights here")
    // de första 1,6 s vinkar hon hej med öppna ögon (fortsätter från kritan-ritar, samma fas), sedan tassen till ratten
    const v = 1 - fas(s, 1.6, 2.3), w = 56 + 20 * Math.sin((s + 2.0) * 6);
    kanin({ iBil: true, uttryck: blanda('jatteglad', 'glad', v), pose: { armar: [0, w * v] }, rikt: -1 + v });
    const z = ease(fas(s, 10.2, 11.6));   // "Brandbilen är röd!": kameran åker in på bilen
    kamera(lerp(lerp(1.0, 1.1, ease(s / 3)), 1.55, z), 960, lerp(640, 480, z)); },
  '02b': (u, s, d) => { korscen(); bil({ lampa: 1 }); kanin({ iBil: true, uttryck: 'nyfiken', rikt: u < 0.5 ? 0.7 : -0.7 });
    const z = fas(s, d - 0.7, d); kamera(lerp(1.15, 1.3, z), lerp(960, 950, z), lerp(560, 460, z)); },   // glider in i 03:s närbild, inget hårt klipp
  '03': (u, s) => { korscen(); bil({ lampa: 1 }); kanin({ iBil: true, uttryck: 'glad', pose: { armar: [0, 34], luta: 3 }, rikt: -0.2 }); kamera(lerp(1.3, 1.8, ease(u * 2)), 950, 460); },
  '04a': rodbild(2150, 1550),
  '04b': (u, s) => { const k = 0.7;   // uppför backen bland äppelträden: lugnt först, på "Brum, brum!" (ekot) gasar hon och susar upp
    const p = u < 0.5 ? 0.15 * u / 0.5 : 0.15 + 0.85 * fas(u, 0.5, 0.95), fx = lerp(1550, 1050, p), fort = u > 0.5 && u < 0.95;
    angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s) }); paKant(fx, backeKant, { k, lampa: 1, upp: (fort ? 14 : 6) * studs(s) });
    const g = ease(fas(u, 0.47, 0.55)) * (1 - ease(fas(u, 0.93, 0.99)));   // mjukt in i och ur farten
    kanin({ iBil: true, uttryck: blanda('nyfiken', 'jatteglad', g), pose: blandaPose('neutral', 'hurra', g), rikt: -0.7 }); kamera(1.15, 1920 - (fx + 491 * CS * k), backeKant(fx) - 230); },
  '04c': rodbild(1050, 420),
  '04d': (u, s) => { const fx = 420, k = 0.7, tut = studs(s) > 0.6;   // tuta på toppen av kullen: en tut per "tuta", äpplena i träden säger "o"
    angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s), mun: tut ? 'o' : 'le' }); paKant(fx, backeKant, { k, lampa: 1, upp: 6 * studs(s) });
    kanin({ iBil: true, uttryck: 'fnissig', pose: { armar: [0, 30 + 26 * studs(s)] }, rikt: -0.3 });
    const [ax, ay] = ansiktePaKant(fx, backeKant, k); kamera(lerp(1.35, 1.6, ease(u)), 1920 - ax + 120, ay + 140); },
  '04e': rodbild(420, 300),
  '04f': (u, s) => studsApplen(s),   // "Studsa!": en egen bild med bara äpplen som studsar högt
  '04g': rodbild(1700, 1500, nerKant),
  '04h': (u, s) => { const k = 0.7, fx = lerp(1500, 560, fas(u, 0.05, 0.9) ** 1.6), fort = u > 0.3;   // nerför andra sidan, fortare och fortare: "Wiii!"
    angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s), kf: nerKant, mun: fort ? 'o' : 'le' }); paKant(fx, nerKant, { k, lampa: 1, upp: 4 * studs(s) });
    kanin({ iBil: true, uttryck: 'jatteglad', pose: blandaPose('neutral', 'hurra', ease(fas(u, 0.25, 0.35))), rikt: -0.5 }); kamera(1.15, 1920 - (fx + 491 * CS * k), nerKant(fx) - 230); },
  '04i': (u, s) => { rodbild(560, 200, nerKant)(u, s); if (u > 0.5) appelsvep(lerp(-500, 2500, fas(u, 0.5, 1))); },
  '08a': u => { korscen(); bil({}); kanin({ iBil: true, uttryck: 'nyfiken', rikt: -0.6 }); chilibil(lerp(-400, 90, ease(u))); kamera(1, 960, 700); },
  '08b': (u, s) => { FART = 0; korscen(); FART = 1; bil({}); chilibil(250);
    if (u < 0.5) { kanin({ iBil: true, uttryck: 'nyfiken', rikt: -0.4 }); sak('pynt', CHILI, 520, 600 - 10 * studs(s), 150, 'rotate(-30 520 525)'); kamera(1.25, 1200, 600); }
    else { const nam = studs(s) > 0.5; kanin({ iBil: true, uttryck: nam ? { ...blanda('neutral', 'jatteglad', 1), mun: [16, 14, 1, 458] } : 'jatteglad', rikt: 0 });
      sak('pynt', CHILI, 1120, 520, 110, 'rotate(-60 1120 465)'); narbild(); } },
  '08c': () => { FART = 0; korscen(); FART = 1; bil({}); kanin({ iBil: true, uttryck: { ...blanda('neutral', 'forvanad', 1), mun: [16, 14, 1, 458] }, rikt: 0 }); narbild(); },
  // Mellanspelet utan sång: röd i ansiktet, fläktar, musen tar slangen (där musiken blir glad), regn på alla.
  '09a': () => { FART = 0; korscen(); FART = 1; bil({}); kanin({ iBil: true, uttryck: { ...blanda('neutral', 'forvanad', 1), mun: [20, 16, 1, 458] }, tunga: 1, rikt: 0 }); rosiga(); narbild(); },
  '09b': (u, s) => { FART = 0; korscen(); FART = 1; bil({}); chilibil(250); rosiga();
    kanin({ iBil: true, uttryck: { ...blanda('neutral', 'tanker', 1), mun: [14, 12, 1, 458] }, tunga: 0.8, pose: { armar: [60 + 30 * Math.sin(s * 8), 60 + 30 * Math.sin(s * 8)] }, rikt: 0 }); kamera(1.15, 1150, 640); },
  '09c': u => { FART = 0; korscen(); FART = 1; bil({}); kanin({ iBil: true, uttryck: 'jatteglad', rikt: -0.3 }); mus(560, 880, 320, MUS_UPP);
    slang([1480, 820], [lerp(1480, 620, ease(u * 1.5)), 860]); kamera(1, 960, 640); },
  '09d': (u, s) => { FART = 0; korscen(); FART = 1; bil({}); kanin({ iBil: true, uttryck: 'fnissig', pose: 'hurra', rikt: 0 }); mus(560, 880, 320, MUS_UPP);
    slang([1480, 820], [620, 860]); vatten([640, 800], [720, 40], -260); droppar(380, 1500, 120 + (s * 300) % 300, 820 + (s * 300) % 300, 26); kamera(1, 960, 560); },
  '10a': (u, s) => { FART = 0; korscen(); FART = 1; bil({ y: -6 * studs(s) }); kanin({ iBil: true, uttryck: 'somnig', pose: 'magen', rikt: 0 }); narbild(); },
  '10b': (u, s) => { FART = 0; korscen(); FART = 1; bil({}); kanin({ iBil: true, uttryck: { ...blanda('neutral', 'jatteglad', 1), mun: [20, 16, 1, 458] }, tunga: 0.7 * studs(s), pose: 'haller', rikt: 0 });
    applet(1180, 560, 100); mus(700, 860 - 10 * studs(s), 320); applet(760, 830 - 10 * studs(s), 80);
    const z = fas(u, 0.15, 0.45); kamera(lerp(1.3, 2.6, z), lerp(960, 950, z), lerp(640, 420, z)); },   // in nära på tungan
  '11a': (u, s) => { disco({ s }); bil({ synlig: false }); dansare({ hulda: -20 * studs(s), hugo: -20 * studs(s), gurra: -20 * studs(s), musen: -20 * studs(s) }); kamera(1);
    if (s < 1.0) appelsvep(lerp(-500, 2500, s)); },
  '11b': (u, s) => { disco({ s }); bil({ synlig: false }); dansare({ hulda: -40 * studs(s) }); kamera(1); },
  '11c': (u, s) => { disco({ s }); bil({ synlig: false }); dansare({ hugo: 18 * Math.sin(s * 8) }); kamera(1); },
  '11d': (u, s) => { disco({ s }); bil({ synlig: false }); dansare({ gurra: -110 * studs(s) }); kamera(1); },
  '11e': (u, s) => { disco({ s }); bil({ synlig: false }); dansare({ musen: -30 * studs(s), musUpp: studs(s) > 0.4 }); kamera(1); },
  // Andra varvet: alla gör varje rörelse tillsammans, en rörelse per rad (stampa, vifta, hoppa, klappa).
  '11g': (u, s) => { const m = Math.min(3, Math.floor(u * 4)), k = [20, 0, 70, 25][m], h = studs(s);
    disco({ s }); bil({ synlig: false });
    const vift = m === 1 ? 18 * Math.sin(s * 8) : 0; dansare({ hulda: -k * h + vift, hugo: -k * h - vift, gurra: -k * h + vift, musen: -k * h, musUpp: m === 3 && h > 0.4 }); kamera(1); },
  '12a': (u, s) => { disco({ s, ikoner: 1 }); bil({ synlig: false });
    dansare({ hulda: -30 * studs(s), hugo: -30 * studs(s), gurra: -60 * studs(s + 0.25), musen: -30 * studs(s) }); kamera(1); },
  // Listan: bussen, ballongen, chilin, äpplet poppar upp i raden bredvid brandbilen, en per ord.
  '12b': (u, s) => { const n = Math.min(5, 2 + Math.floor(u * 5)); disco({ s, ikoner: n, ny: Math.min(1, (u * 5 - n + 2) * 2.5) });
    bil({ synlig: false }); dansare({ hulda: -15 * studs(s), hugo: -15 * studs(s), gurra: -15 * studs(s), musen: -15 * studs(s) }); kamera(1); },
  '12c': (u, s) => { disco({ s, ikoner: 5 }); bil({ synlig: false });
    dansare({ hulda: -30 * studs(s), hugo: -30 * studs(s), gurra: -60 * studs(s + 0.25), musen: -30 * studs(s), musUpp: true }); kamera(1); },
  '12d': (u, s) => { disco({ s, ikoner: 5 }); bil({ x: lerp(-700, -80, ease(u * 2)), y: 40, blaljus: blink(s) }); kanin({ iBil: true, uttryck: 'glad', pose: { armar: [0, 56 + 20 * Math.sin(s * 6)] }, rikt: 0 }); mus(1500, 870, 260); kamera(1.1, 920, 720); },
  // Outrot som 014: äppelsvep tillbaka till vägen, brandbilen kör in åt höger och stannar, kaninen vinkar, kritirisen sluter sig
  // runt hennes ansikte (hon somnar nöjd), stjärnan glimtar och glider in, svart.
  '13': (u, s) => { FART = 0; korscen(); FART = 1; const x = lerp(1000, -80, fas(u, 0.03, 0.3));
    bil({ x, blaljus: u < 0.3 ? blink(s) : 0, lampa: 1 });
    kanin({ iBil: true, uttryck: u < 0.6 ? 'jatteglad' : u < 0.84 ? 'glad' : 'somnig', pose: u > 0.3 && u < 0.55 ? { armar: [0, 56 + 20 * Math.sin(s * 6)] } : 'neutral', rikt: 0 });
    kamera(1); if (s < 1.0) appelsvep(lerp(-500, 2500, s));
    const r = lerp(1300, 250, fas(u, 0.6, 0.72)) * (1 - fas(u, 0.88, 0.96));
    if (u > 0.6) kritiris(r, 866 - x, 400, { t: s, glimt: fas(u, 0.7, 0.75) * (1 - fas(u, 0.97, 1)), in: fas(u, 0.88, 0.96) }); },
};

// Effekter i film.js-bilderna (avsnittstid). "Studsa!" (04f): äpplena landar på ängen ett i taget, sedan ett svagt studs per
// slag (studsa och boing sjungs, så bara ett eko under rösten).
const EFFEKTER_FILM = [
  // brandbilens motor, mjukt: under förspelet i 02a (innan rösten kommer), tonas ut när sången börjar; ett svagt eko på "Brum, brum!" (04b)
  ['brandbil-motor', 2, 26.6, 0.35, { fadeIn: 0.8 }], ['brandbil-motor', 3, 30.4, 0.3, { langd: 3.2, fade: 1.5 }],
  ['brandbil-motor', 2, 52.2, 0.15, { langd: 2.2, fadeIn: 0.3, fade: 0.8 }],
  ...[0, 1, 2, 3, 4].map(i => ['apple-studs', i % 3 + 1, 60.1 + 0.14 * i, 0.3]),
  ...[1, 2, 3, 4].map(k => ['apple-studs', k % 3 + 1, 60.38 + 0.52 * k, 0.15]),
];
// Tiderna ur storyboard.md: | id | m:ss.s | …
async function tider() {
  const md = await (await fetch(SB + 'storyboard.md')).text(), rad = [];
  for (const m of md.matchAll(/^\| (\d\d[a-z]?(?:–i)?) \| (\d+):(\d\d\.\d) \|/gm)) rad.push([m[1], +m[2] * 60 + +m[3]]);
  const T = {}; rad.forEach(([id, t], i) => T[id] = [t, i + 1 < rad.length ? rad[i + 1][1] : SLUT]); return T;
}

window.ready = (async () => {
  const T = ANIM.TIDER = await tider(), [forsta, sista] = window.SCEN, A0 = T[forsta][0], A1 = T[sista][1];
  window.DURATION = A1 - A0;
  if (A0 >= SANG0) window.SANG = [A0 - SANG0, A1 - SANG0];
  window.LJUD = [...(window.ROSTER || []).map(([fil, t]) => ({ fil, t: t - A0, vol: 2.5, langd: 4 })),
    ...EFFEKTER_FILM.map(([namn, n, t, vol, o = {}]) => ({ fil: `assets/ljud/effekter/${namn}/${namn}-${n}.m4a`, t: t - A0, vol, ...o }))]
    .filter(c => c.t >= 0 && c.t < window.DURATION);
  const ids = Object.keys(T).filter(id => T[id][0] >= A0 && T[id][0] < A1);
  window.seek = t => {
    TID = A0 + t; SCROLL = 0;
    const id = ids.findLast(i => T[i][0] <= TID) || ids[0], [a, b] = T[id];
    for (const l of ['bakom', 'framfor', 'pynt', 'ram', 'gose']) $(l).innerHTML = '';
    $('bil').setAttribute('opacity', 0); KANEL.setAttribute('opacity', 0); $('lampa').setAttribute('opacity', 0);
    $('duk').setAttribute('fill', GOLV); kamera(1);
    BILD = id; BILD0 = a;
    ANIM[id]((TID - a) / (b - a), TID - a, b - a);
    for (const c of SVEP) if (Math.abs(TID - c) < SV) rodsvep(0.5 + (TID - c) / (2 * SV), c !== 26.5);   // 26,5 utan äpple (Sanna 2026-11-09)
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);   // kritkanten kokar sex gånger i sekunden

  };
  await new Promise(r => setTimeout(r, 1500));   // urklippen hinner laddas
  window.seek(0);
  return true;
})();
