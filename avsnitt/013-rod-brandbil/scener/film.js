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
let TID = 0;                                                  // avsnittstid just nu

// Kaninen blinkar och bilen gungar i takten, utan att varje bild behöver säga det.
const _rita = rita; rita = (fig, f, p) => _rita(fig, blinka(f, TID + 0.7), p);
const _bil = bil; bil = (o = {}) => _bil({ ...o, y: (o.y || 0) - 5 * studs(TID - SANG0) });
// Körscenen rullar: träden, busken och tuvorna glider förbi (scenen är speglad, så +x i koden är åt vänster i bild).
let FART = 1;
korscen = () => {
  platta(VÄG);
  const o = (TID * 140 * FART) % 2240, x = b => ((b + o) % 2240) - 160;
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
const rodbild = (x0, x1) => (u, s) => { angscen({ t: T(s), o: ANG(), hopp: 70, tryck: 1 }); bil({ x: lerp(x0, x1, ease(u)), lampa: 1, blaljus: blink(s) });
  kanin({ iBil: true, uttryck: 'jatteglad', pose: studs(s) > 0.6 ? 'hurra' : 'neutral', rikt: -0.6 }); kamera(1); };
const ANIM = {
  '00': u => { titelkort(); bil({ x: lerp(-900, 520, ease(u * 2.5)), y: 70 }); kanin({ iBil: true, uttryck: 'glad', rikt: -0.5 }); kamera(1); },
  '01a': u => { papper(); ritar(u, 0, 0); kritan(lerp(1250, 700, u), 500 - 170 * Math.sin(u * Math.PI)); },
  '01b': (u, s) => { papper(); ritar(1, s > 0.4, s > 1.0); if (s < 1.4) kritan(lerp(1000, 1100, kl01(s / 1.4)), 280); },
  '01c': (u, s, d) => { papper(); ritat_apple({ skaft: 1, blad: 1, gung: Math.sin(s * 6) * Math.exp(-s) > 0.2 });
    const z = fas(TID, SANG0, SANG0 + 2); if (z > 0) kamera(lerp(1, 2.6, z), 960, 520); },
  // Versen: en röd buss kör förbi bakom brandbilen, och på "Vad mer är rött?" seglar en röd ballong ner. Båda sjungs i sista
  // refrängens lista, så de måste ha synts.
  '02a': (u, s) => { korscen(); sak('bakom', BETTAN, lerp(-500, 2500, fas(u, 0.35, 0.85)), 905, 380); bil({ lampa: 1 });
    kanin({ iBil: true, uttryck: u > 0.45 && u < 0.75 ? 'forvanad' : 'jatteglad', rikt: u > 0.45 && u < 0.75 ? 0.6 : -1 }); kamera(lerp(1.0, 1.1, ease(s / 3)), 960, 640); },
  '02b': (u, s) => { korscen(); bil({ lampa: 1 }); kanin({ iBil: true, uttryck: 'nyfiken', pose: 'upp', rikt: -0.2 });
    ballong(1430 + 40 * Math.sin(s * 2), lerp(-160, 330, ease(u * 1.3))); kamera(1.05, 960, 620); },
  '03': (u, s) => { korscen(); bil({ lampa: 1 }); kanin({ iBil: true, uttryck: 'blinkar', pose: { armar: [0, 34], luta: 3 }, rikt: -0.2 });
    ballong(1430 + 40 * Math.sin(s * 2), lerp(330, -300, ease(u))); kamera(lerp(1.3, 1.8, ease(u * 2)), 950, 460); },
  '04a': rodbild(-600, -100),
  '04b': (u, s) => { angscen({ t: T(s), o: ANG(), hopp: 40 }); bil({ x: -100, lampa: 1, lut: -8 * ease(u * 3), y: -20 * ease(u * 3) }); kanin({ iBil: true, uttryck: 'nyfiken', rikt: -0.7 }); kamera(1.15, 960, 640); },
  '04c': rodbild(-100, 0),
  '04d': (u, s) => { angscen({ t: T(s), o: ANG(), hopp: 25, mun: studs(s) > 0.6 ? 'o' : 'le' }); bil({ lampa: 1 });
    kanin({ iBil: true, uttryck: 'fnissig', pose: { armar: [0, 30 + 26 * studs(s)] }, rikt: -0.3 }); kamera(1.8, 950, 360); },   // en tut per "tuta", tassen på tutan
  '04e': rodbild(0, 0),
  '04f': (u, s) => { const h = studs(s); angscen({ t: T(s), o: ANG(), hopp: 150, tryck: 1 }); bil({ lampa: 1, y: -110 * h });
    kanin({ iBil: true, uttryck: 'jatteglad', pose: 'hurra', rikt: -0.4 }); kamera(1); },
  '04g': rodbild(0, 0),
  '04h': (u, s) => { angscen({ t: T(s), o: ANG() * 1.6, hopp: 30, mun: 'o' }); bil({ lampa: 1, x: lerp(0, 150, ease(u)), lut: 8 * ease(u * 3) }); kanin({ iBil: true, uttryck: 'jatteglad', pose: 'hurra', rikt: -0.5 }); kamera(1.15, 960, 640); },
  '04i': (u, s) => { rodbild(150, 150)(u, s); if (u > 0.5) appelsvep(lerp(-500, 2500, fas(u, 0.5, 1))); },
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
  '12d': (u, s) => { disco({ s, ikoner: 5 }); bil({ x: lerp(-700, -80, ease(u * 2)), y: 40, blaljus: blink(s) }); kanin({ iBil: true, uttryck: 'blinkar', pose: { armar: [0, 56 + 20 * Math.sin(s * 6)] }, rikt: 0 }); mus(1500, 870, 260); kamera(1.1, 920, 720); },
  // Outrot som 014: äppelsvep tillbaka till vägen, brandbilen kör in åt höger och stannar, kaninen vinkar, kritirisen sluter sig
  // runt hennes ansikte (hon somnar nöjd), stjärnan glimtar och glider in, svart.
  '13': (u, s) => { FART = 0; korscen(); FART = 1; const x = lerp(1000, -80, fas(u, 0.03, 0.3));
    bil({ x, blaljus: u < 0.3 ? blink(s) : 0, lampa: 1 });
    kanin({ iBil: true, uttryck: u < 0.6 ? 'jatteglad' : u < 0.84 ? 'glad' : 'somnig', pose: u > 0.3 && u < 0.55 ? { armar: [0, 56 + 20 * Math.sin(s * 6)] } : 'neutral', rikt: 0 });
    kamera(1); if (s < 1.0) appelsvep(lerp(-500, 2500, s));
    const r = lerp(1300, 250, fas(u, 0.6, 0.72)) * (1 - fas(u, 0.88, 0.96));
    if (u > 0.6) kritiris(r, 866 - x, 400, { t: s, glimt: fas(u, 0.7, 0.75) * (1 - fas(u, 0.97, 1)), in: fas(u, 0.88, 0.96) }); },
};

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
  window.LJUD = (window.ROSTER || []).map(([fil, t]) => ({ fil, t: t - A0, vol: 2.5, langd: 3 })).filter(c => c.t >= 0 && c.t < window.DURATION);
  const ids = Object.keys(T).filter(id => T[id][0] >= A0 && T[id][0] < A1);
  window.seek = t => {
    TID = A0 + t;
    const id = ids.findLast(i => T[i][0] <= TID) || ids[0], [a, b] = T[id];
    for (const l of ['bakom', 'framfor', 'pynt', 'ram', 'gose']) $(l).innerHTML = '';
    $('bil').setAttribute('opacity', 0); KANEL.setAttribute('opacity', 0); $('lampa').setAttribute('opacity', 0);
    $('duk').setAttribute('fill', GOLV); kamera(1);
    ANIM[id]((TID - a) / (b - a), TID - a, b - a);
    $('brus').setAttribute('seed', Math.floor(TID * 6) % 50 + 1);   // kritkanten kokar sex gånger i sekunden
  };
  await new Promise(r => setTimeout(r, 1500));   // urklippen hinner laddas
  window.seek(0);
  return true;
})();
