// Röda sången (013): alla bilder i storyboarden som rörelse. Varje scen (../<scen>/index.html) sätter window.SCEN = [första, sista]
// bildnummer och laddar kanel-motor.js, scen-kit.js och den här filen. Tiderna (avsnittstid) läses ur storyboard-v2/storyboard.md,
// så de följer storyboarden. Sången börjar på avsnittstid SANG0; scenens t = 0 är dess första bilds start.
// render.mjs anropar window.seek(t). Inget slumpas: samma t ger alltid samma bild.
const SANG0 = 24.5, SLUT = 167.2, BEAT = 0.514;               // ca 115 bpm (tagning 7, som tagning 4); SLUT: 3 s tyst svans efter sången, slagen räknas från sångens start
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
// Tagning 7 sjunger inga hörbara "iii-ooo": blåljuset blinkar på "brandbil" i refrängerna i stället (sångtid).
const IOIO = [17.5, 23.0, 31.6, 52.5, 58.6, 67.3, 106.3, 116.6], IO_L = 1.3;
const ioio = (st = TID - SANG0) => IOIO.some(a => st >= a && st < a + IO_L);
// lugn: true (vägen, Sanna 2026-11-09 "less movement for the bunny in brandbil"): bilen gungar bara lite i takten
const _bil = bil; bil = (o = {}) => _bil({ ...o, y: (o.y || 0) - (o.lugn ? 1.5 : 5) * studs(TID - SANG0),
  blaljus: ioio() ? Math.max(o.blaljus || 0, 1.3 * blink(TID - SANG0 - 0.13)) : 0 });
// Rött kritsvep (scen-kit rodsvep) vid platsbytena, över skarven: SV s före och SV s efter (avsnittstid). Ritas i seek.
const SVEP = [11.3, 26.5, 41.9, 59.2, 77.5, 95.3, 110.6, 152.8], SV = 0.8;   // 95,3: tidigare in i äppelmarschen; SV 0,8 (Sanna 2026-11-09: "a bit like crayon and a bit faster, no apple")   // tagning 7: vid varje platsbyte   // 26,5: kritan ritar → vägen (i stället för hålet, 2026-11-09)
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
const pop = k => k <= 0 ? 0 : k >= 1 ? 1 : ease(k) * (1 + 0.3 * Math.sin(Math.PI * k));
const BALLONG = A + 'rekvisita/ballong-rod/cut/ballong-rod-tunn.png', BLOMMA = A + 'rekvisita/blomma-rod/cut/blomma-rod-tunn.png';   // -tunn: tunnare vit kant
MATT[BALLONG] = 594 / 1192; MATT[BLOMMA] = 889 / 1192;
// Krit-gnista (som slutets): fyruddig gul stjärna med vit kant, i #pynt (kodens x)
const stj = r => `M0 ${-r} Q${r * 0.16} ${-r * 0.16} ${r} 0 Q${r * 0.16} ${r * 0.16} 0 ${r} Q${-r * 0.16} ${r * 0.16} ${-r} 0 Q${-r * 0.16} ${-r * 0.16} 0 ${-r}Z`;
const gnista = (x, y, r, rot = 0) => r > 0.5 && pynt(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})" stroke-linejoin="round">
  <path d="${stj(r)}" fill="#fff" stroke="#fff" stroke-width="${(3 + 0.16 * r).toFixed(1)}"/><path d="${stj(r)}" fill="#F2C94C"/><path d="${stj(r * 0.5)}" fill="#FFF7D6"/></g>`);
// "Vad är rött?" (05a–05c, Sanna 2026-11-09): en enda lång körning. Ballongen (bunden vid vägkanten), ett äppelträd från
// äppelbacken och den stora röda blomman står längs vägen och glider förbi; på svaret står saken precis framför bilen,
// kaninen pekar på den och den gnistrar. Saken t: avsnittstid för svaret; VID: kodens x just då (skärmen ca 1320).
const VG = 140, BX = 260, VID = 250 + BX;   // scenen är speglad: positivt BX = åt vänster i bild   // BX: bilen längre åt vänster (Sanna 2026-11-09), sakerna flyttas lika mycket   // VID: på svaret står saken precis framför bilens nos (skärmen ca 1650)
const VAGSAKER = [[63.4, 'ballong', 470], [67.7, 'trad', 520], [71.7, 'blomma', 690]];   // [svar, sak, gnistornas höjd över marken]
function vadArRott(u, s) {
  platta(VÄG); SCROLL = TID * VG; vagStreck(SCROLL);
  const x0 = b => ((b + SCROLL) % 2240) - 160;
  sak('bakom', BUSKE, x0(1500), 866, 180);
  let pek = 0;
  for (const [t, typ, gh] of VAGSAKER) {
    const x = VID + (TID - t) * VG, k = TID - t; if (x < -500 || x > 2500) continue;
    if (typ === 'ballong') { const v = 4 * Math.sin(TID * 1.7);
      sak('bakom', BALLONG, x, 860, 560, `rotate(${v.toFixed(2)} ${x} 860)`); }
    else if (typ === 'trad') appeltrad(x, 868, 660, 'le', 4);   // fast antal äpplen, annars flimrar de när trädet rör sig
    else sak('bakom', BLOMMA, x, 885, 470, `rotate(${(2 * Math.sin(TID * 2.3)).toFixed(2)} ${x} 885)`);
    // gnistorna sitter i kanten runt sakens egen form (Sanna 2026-11-09: "match glitter better to objects"): ballongens kropp,
    // trädkronan, blomhuvudet; storleken följer saken
    const [cy, r] = typ === 'ballong' ? [860 - 0.72 * gh, 125] : typ === 'trad' ? [868 - 0.69 * gh, 215] : [885 - 0.7 * gh, 140];
    if (k > 0 && k < 1.4) [[-130, 0], [-20, 0.12], [150, 0.24], [60, 0.36]].forEach(([v, d], j) => {
      const q = (k - d) / 0.9, w = v * Math.PI / 180; if (q > 0 && q < 1) gnista(x + 1.08 * r * Math.cos(w), cy + 1.08 * r * Math.sin(w), (0.16 * r + 12) * Math.sin(Math.PI * q), 25 * q + j * 30); });
    pek = Math.max(pek, fas(k, -0.25, 0.15) * (1 - fas(k, 1.5, 1.9)));
  }
  bil({ x: BX, lampa: 1, lugn: true }); sak('framfor', GRAS, x0(400), 1090, 180); sak('framfor', GRAS, x0(1650), 1090, 180);
  kanin({ iBil: true, uttryck: blanda('glad', 'jatteglad', pek), pose: blandaPose('neutral', 'pekar', pek), rikt: lerp(-0.3, -0.8, pek) });
  kamera(1.05, 960, 560);
}
// Mellanspelet (08a, Sanna 2026-11-09: "remove the chili scene and have dancing apples, marching apples instead"): fem glada
// äpplen marscherar in över den rosa ängen, ett litet kliv per slag (lutar åt varannan sida), och stannar på rad (0–6 s);
// sedan dansar de: hoppar om vartannat, gungar, "o"-mun högst upp, och på sista slagen hoppar alla högt tillsammans.
const MARSCH = [360, 660, 960, 1260, 1560];
function appelmarsch(u, s) {
  platta(ROSA_ANG);
  const slag = (TID - SANG0) / BEAT, n = Math.floor(slag), b = studs(TID - SANG0), side = n % 2 ? 1 : -1;
  const ga = ease(Math.min(1, s / 5)), lead = lerp(1500, MARSCH[0], ga);   // QA: första äpplet syns direkt
  MARSCH.forEach((mx, i) => {
    // polish (Sanna 2026-11-09 "polish apples dance"): in på 5 s, marscherar på stället, hoppar om vartannat, en våg av hopp
    // längs raden (ett äpple per slag) och sist alla tillsammans
    const x = lead + (mx - MARSCH[0]);
    // Sanna 2026-11-09 "make apples dance a bit more smooth": lutningen gungar mjukt genom slaget i stället för att slå om
    // på varje slag, och varje dansdel tonas över i nästa på 0,6 s (förr hoppade höjden när delen bytte, ibland i luften)
    const gung = Math.sin(Math.PI * slag);
    const del = f => f === 0 ? [28 * b, 7 * gung, 'le']
      : f === 1 ? [(((n + i) % 2) ? 34 : 12) * b, 6 * gung * (i % 2 ? 1 : -1), 'le']
      : f === 2 ? (() => { const egen = (n + i) % 2 === 0; return [egen ? 95 * b : 10 * b, 10 * Math.sin(Math.PI * slag / 2 + i), egen && b > 0.7 ? 'o' : 'le']; })()
      : f === 3 ? (() => { const vem = n % 5 === i; return [(vem ? 150 : 10) * b, vem ? 0 : 4 * gung, vem && b > 0.6 ? 'o' : 'le']; })()
      : [170 * b, 0, b > 0.6 ? 'o' : 'le'];
    const GR = [5, 9.2, 12.2, 14.2], f = GR.filter(g => s >= g).length, ov = f > 0 ? ease(kl01((s - GR[f - 1]) / 0.6)) : 1;
    const [h1, t1, mun] = del(f), [h0, t0] = f > 0 ? del(f - 1) : [h1, t1];
    const h = lerp(h0, h1, ov), tilt = lerp(t0, t1, ov);
    const landar = b < 0.25 ? (0.25 - b) / 0.25 : 0;
    glattApple(x, 930 - h, 320, { mun, lager: 'bakom', tryck: 1 - 0.12 * landar });
    const el = $('bakom').lastElementChild; el.setAttribute('transform', `rotate(${tilt.toFixed(2)} ${x} ${930 - h}) ` + el.getAttribute('transform'));
    lagg('bakom', `<ellipse cx="${x}" cy="934" rx="${(95 * (1 - h / 400)).toFixed(1)}" ry="10" fill="#2d5a22" opacity="0.18"/>`);
    $('bakom').insertBefore($('bakom').lastElementChild, el);   // skuggan under äpplet
  });
  const xg = g => ((g + 40 * s) % 2240) - 160;
  sak('framfor', GRAS, xg(330), 1090, 170); sak('framfor', GRAS, xg(1300), 1090, 150); sak('framfor', GRAS, xg(1900), 1090, 170);
  kamera(1.3, 960, 800);   // QA: äpplena fyller bilden
}
const ANIM = {
  '00': u => { titelkort(); bil({ x: lerp(-900, 520, ease(u * 2.5)), y: 70 }); kanin({ iBil: true, uttryck: 'glad', rikt: -0.5 }); kamera(1); },
  '01a': u => { papper(); ritar(u, 0, 0); kritan(lerp(1250, 700, u), 500 - 170 * Math.sin(u * Math.PI)); },
  '01b': (u, s) => { papper(); ritar(1, s > 0.4, s > 1.0); if (s < 1.4) kritan(lerp(1000, 1100, kl01(s / 1.4)), 280); },
  '01c': (u, s, d) => { papper(); ritat_apple({ skaft: 1, blad: 1, gung: Math.sin(s * 6) * Math.exp(-s) > 0.2 });
    const z = fas(TID, SANG0, SANG0 + 2); if (z > 0) kamera(lerp(1, 2.6, z), 960, 520); },
  // Versen: brandbilen kör på vägen, blåljuset lyser stort på "iii-ooo" och kameran åker in på "Brandbilen är röd!".
  // På "Vad mer är rött?" tittar hon sig omkring, åt ena hållet och sedan åt det andra.
  '02a': (u, s) => { korscen(); bil({ lampa: 1, lugn: true });   // inget stort blåljus på versens "iii-ooo" (Sanna 2026-11-09: "skip blue lights here")
    // de första 1,6 s vinkar hon hej med öppna ögon (fortsätter från kritan-ritar, samma fas), sedan tassen till ratten
    const v = 1 - fas(s, 1.6, 2.3), w = 56 + 20 * Math.sin((s + 2.0) * 6);
    kanin({ iBil: true, uttryck: blanda('jatteglad', 'glad', v), pose: { armar: [0, w * v] }, rikt: -1 + v });
    const z = ease(fas(s, 3.9, 5.3));   // "… röd brandbil!" (tagning 7, sångtid 6,1): kameran åker in på bilen
    kamera(lerp(lerp(1.0, 1.1, ease(s / 3)), 1.55, z), 960, lerp(640, 480, z)); },
  '02b': (u, s, d) => { korscen(); bil({ lampa: 1, lugn: true }); kanin({ iBil: true, uttryck: 'glad', rikt: -0.5 });   // "Den kör på vår väg!"
    const z = fas(s, d - 0.7, d); kamera(lerp(1.15, 1.3, z), lerp(960, 950, z), lerp(560, 460, z)); },   // glider in i 03:s närbild, inget hårt klipp
  '03': (u, s) => { korscen(); bil({ lampa: 1, lugn: true }); kanin({ iBil: true, uttryck: 'glad', pose: { armar: [0, 34], luta: 3 }, rikt: -0.2 }); kamera(lerp(1.3, 1.8, ease(u * 2)), 950, 460); },
  '04a': rodbild(1600, 1150),   // Sanna 2026-11-09: bilen kör bara en bit upp, tutan (04d) och uppförsbacken (04b) fortsätter därifrån   // QA: bilen i bild från början
  '04b': (u, s) => { const k = 0.7;   // uppför backen bland äppelträden: lugnt först, på "Brum, brum!" (ekot) gasar hon och susar upp
    const p = 0.3 * u + 0.7 * fas(u, 0.45, 0.95), fx = lerp(1150, 450, p), fort = u > 0.5 && u < 0.95;
    angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s) }); paKant(fx, backeKant, { k, lampa: 1, upp: (fort ? 14 : 6) * studs(s) });
    const g = ease(fas(u, 0.47, 0.55)) * (1 - ease(fas(u, 0.93, 0.99)));   // mjukt in i och ur farten
    kanin({ iBil: true, uttryck: blanda('nyfiken', 'jatteglad', g), pose: blandaPose('neutral', 'hurra', g), rikt: -0.7 }); kamera(1.15, 1920 - (fx + 491 * CS * k), backeKant(fx) - 230); },
  '04c': rodbild(1050, 420),
  '04d': (u, s) => { const fx = 1150, k = 0.7, tut = studs(s) > 0.6;   // tuta vid foten av kullen (tagning 7: tuta före uppför): en tut per "tuta", äpplena i träden säger "o"
    angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s), mun: tut ? 'o' : 'le' }); paKant(fx, backeKant, { k, lampa: 1, upp: 6 * studs(s) });
    kanin({ iBil: true, uttryck: 'fnissig', pose: { armar: [0, 30 + 26 * studs(s)] }, rikt: -0.3 });
    const [ax, ay] = ansiktePaKant(fx, backeKant, k); kamera(lerp(1.35, 1.6, ease(u)), 1920 - ax + 120, ay + 140); },
  '04e': rodbild(420, 300),
  '04f': (u, s) => studsApplen(s),   // "Studsa!": en egen bild med bara äpplen som studsar högt
  '04g': rodbild(1700, 1500, nerKant),
  '04h': (u, s) => { const k = 0.7, fx = lerp(1500, 560, fas(u, 0.05, 0.9) ** 1.6), fort = u > 0.3;   // nerför andra sidan, fortare och fortare: "Wiii!"
    angscen({ t: T(s), o: 0, applen: false }); backe({ t: T(s), kf: nerKant, mun: fort ? 'o' : 'le' }); paKant(fx, nerKant, { k, lampa: 1, upp: 4 * studs(s) });
    kanin({ iBil: true, uttryck: 'jatteglad', pose: blandaPose('neutral', 'hurra', ease(fas(u, 0.25, 0.35))), rikt: -0.5 }); kamera(1.15, 1920 - (fx + 491 * CS * k), nerKant(fx) - 230); },
  '04i': rodbild(560, 380, nerKant),   // stannar innan bilen åker ut till höger   // QA: rakt klipp, SVEP-svepet kommer direkt efter
  // "Vad är rött?" (tagning 7): hon tittar sig omkring, och på svaret dyker saken upp framför bilen (bilden på orden)
  '05a': vadArRott, '05b': vadArRott, '05c': vadArRott,
  '08a': appelmarsch,
  '08x': u => { korscen(); bil({}); kanin({ iBil: true, uttryck: 'nyfiken', rikt: -0.6 }); chilibil(lerp(-400, 90, ease(u))); kamera(1, 960, 700); },
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
// Refräng 2 (07a–07i, tagning 7) spelar refräng 1:s rörelser
[['07a', '04a'], ['07d', '04d'], ['07b', '04b'], ['07h', '04h'], ['07i', '04i']].forEach(([n, f]) => ANIM[n] = ANIM[f]);

// Effekter i film.js-bilderna (avsnittstid). "Studsa!" (04f): äpplena landar på ängen ett i taget, sedan ett svagt studs per
// slag (studsa och boing sjungs, så bara ett eko under rösten).
const EFFEKTER_FILM = [
  // brandbilens motor, mjukt: under förspelet i 02a (innan rösten kommer), tonas ut när sången börjar; ett svagt eko på "Brum, brum!" (04b)
  ['brandbil-motor', 2, 26.6, 0.2, { fadeIn: 0.8 }], ['brandbil-motor', 3, 30.4, 0.18, { langd: 3.2, fade: 1.5 }],   // lägre: rösten sjunger redan
  ['brandbil-motor', 2, 52.7, 0.15, { langd: 2.2, fadeIn: 0.3, fade: 0.8 }], ['brandbil-motor', 2, 87.8, 0.15, { langd: 2.2, fadeIn: 0.3, fade: 0.8 }],   // "Brum, brum!" ×2
  ['glitter', 1, 63.4, 0.25, { langd: 1.2 }], ['glitter', 2, 67.7, 0.25, { langd: 1.2 }], ['glitter', 3, 71.7, 0.25, { langd: 1.2 }],   // sakerna gnistrar
  ...Array.from({ length: 23 }, (_, k) => ['apple-studs', k % 3 + 1, +(SANG0 + Math.ceil((98.5 - SANG0) / BEAT + k) * BEAT).toFixed(3), k < 12 ? 0.12 : 0.2]),   // äpplena landar i takten
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
    for (const c of SVEP) if (Math.abs(TID - c) < SV) rodsvep(0.5 + (TID - c) / (2 * SV), false);   // inget äpple i svepen (Sanna 2026-11-09)
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);   // kritkanten kokar sex gånger i sekunden

  };
  await new Promise(r => setTimeout(r, 1500));   // urklippen hinner laddas
  window.seek(0);
  return true;
})();
