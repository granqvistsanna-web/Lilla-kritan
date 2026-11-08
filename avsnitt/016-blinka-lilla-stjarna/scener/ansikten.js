// Kodansikten (kopierade från 005; 014 lade till stolt och anstranger_sig). Samma humör och mått som verktyg/ansikten.py (storyboarden). Vanligt skript efter kit.js:
//   <script src="../kit.js"></script><script src="../ansikten.js"></script>
// Musen Milles nos finns inte i den ansiktslösa blobbilden: ge cfg.nos (MILLE nedan) så ritas den, med ett streck ner till leendet.
// Byter ut kit.js-ansiktet på en figur:
//   const f = await kit.figur('musen-mille'); const a = ansikten.iFigur(f);
//   a.satt('skrattar', { titt: 0.5, blink: 0 })        // varje bildruta, efter f.pose()
// Humör: glad skrattar ropar forvanad nyfiken skelogd njuter slickar karleksfull blinkar ledsen stolt anstranger_sig
// (och kit.js namn open happy big sleep). opt: titt/tittY −1..1 (pupillerna), blink 0..1, flip (speglad figur), m (munnens öppning, för ropar/skrattar).
(() => {
const INK = '#1d1d1d', MUNHAL = '#5a2418', TUNGA = '#e7898c', KIND = 'rgba(240,140,165,0.6)';
const DJUROGON = [[414, 401], [605, 399]];
// Orange fisken (lager/fisk.png, 1024-rutan, nosen åt höger): ett öga och ett leende vid nosen. Som refrang.js APELSIN_ANSIKTE:
//   const a = ansikten.bygg(fiskensGrupp, ansikten.FISK); a.satt('glad', { titt: 0.5 })   // titt 0.5 = tittar framåt, mot nosen
// Samma mått som FISK_ANSIKTE i storyboard/bygg.py. Humör som funkar med ett öga: glad, skrattar, forvanad (blink som vanligt).
const FISK = { ogon: [[760, 445]], ogonSkala: 1.9, mun: [808, 565], munSkala: 1.8 };
const MILLE = { ogon: [[413, 401], [604, 398]], mun: [512, 459], munSkala: 1.4, nos: [509, 418] };   // uppmätt i blobversionen

const HUMOR = {
  glad:        { ogon: 'open', mun: 'le' },
  skrattar:    { ogon: 'happy', mun: 'oppen', m: 0.8, kinder: true },   // 016: kinder när de är glada (Sanna: "improve graphics")
  ropar:       { ogon: 'open', stor: 1.15, mun: 'oppen', m: 1.6, b: 1.4 },
  forvanad:    { ogon: 'open', stor: 1.3, mun: 'o' },
  nyfiken:     { ogon: 'open', titt: 1, tittY: -0.4, mun: 'le', b: 0.55 },
  skelogd:     { ogon: 'open', stor: 1.1, skel: true, mun: 'le', b: 0.7 },
  njuter:      { ogon: 'sleep', mun: 'le', b: 0.45 },
  slickar:     { ogon: 'happy', mun: 'tunga' },
  karleksfull: { ogon: 'happy', mun: 'le', kinder: true },
  blinkar:     { ogon: 'happy', mun: 'le', b: 1.3, kinder: true },   // båda ögonen (Sanna 2026-11-06: ingen blinkning med ett öga)
  ledsen:      { ogon: 'open', tittY: 0.5, mun: 'ledsen' },
  orolig:      { ogon: 'open', stor: 1.05, bryn: true, mun: 'o', oSkala: 0.62 },   // 016: stjärnan är borta (Sanna: "worried faces"), lugn oro, inte rädd
  stolt:       { ogon: 'happy', mun: 'le', b: 1.5 },          // 014: Gurra med ärtan på huvudet
  anstranger_sig: { ogon: 'knip', mun: 'streck' },          // 014: Lova når under bänken, Pip pickar
};
Object.assign(HUMOR, { open: HUMOR.glad, happy: { ogon: 'happy', mun: 'le' }, big: HUMOR.forvanad, sleep: { ogon: 'sleep', mun: 'le' } });

const clamp = (k, a = -1, b = 1) => Math.max(a, Math.min(b, k));
const linje = (d, w) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round"/>`;

// SVG-markup för ansiktet i figurens 1024-ruta.
function svg(humor = 'glad', opt = {}) {
  const h = HUMOR[humor], ogon = opt.ogon || DJUROGON, es = opt.ogonSkala || 1, ms = opt.munSkala || 1, flip = opt.flip ? -1 : 1;
  const lagen = Array.isArray(h.ogon) ? h.ogon : [h.ogon, h.ogon];
  let ut = '';
  ogon.forEach(([x, y], i) => {
    let o = '';
    if (h.kinder) o += `<ellipse cx="${(i ? 1 : -1) * 14}" cy="42" rx="26" ry="15" fill="${KIND}"/>`;
    if (lagen[i] === 'happy') o += linje('M-22 8 Q0 -18 22 8', 7);
    else if (lagen[i] === 'sleep') o += linje('M-22 -2 Q0 18 22 -2', 7);
    else if (lagen[i] === 'knip') { const u = i ? -1 : 1; o += `<path d="M${-20 * u} -12 L${14 * u} 0 L${-20 * u} 12" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`; }   // spetsen in mot nosen
    else {
      const s = h.stor || 1, b = 1 - 0.92 * (opt.blink || 0);
      const tx = h.skel ? (i ? -0.75 : 0.75) : clamp((h.titt || 0) + (opt.titt || 0)) * flip;
      const ty = h.skel ? 0.75 : clamp((h.tittY || 0) + (opt.tittY || 0));
      o += `<g transform="scale(${s} ${s * b})"><circle r="26" fill="#fff" stroke="${INK}" stroke-width="6"/>` +
           `<circle cx="${tx * 8}" cy="${ty * 8}" r="12.5" fill="${INK}"/>` + (b > 0.5 ? `<circle cx="${tx * 8 - 4}" cy="${ty * 8 - 5}" r="3.6" fill="#fff"/>` : '') + `</g>`;
      if (h.bryn) { const u = i ? -1 : 1; o += linje(`M${-27 * u} ${-40 * s} Q${-6 * u} ${-44 * s} ${14 * u} ${-56 * s}`, 6); }   // bryn: inre änden upp
    }
    ut += `<g transform="translate(${x} ${y}) scale(${es})">${o}</g>`;
  });
  if (opt.mun) {
    const b = h.b || 1, m = opt.m ?? h.m;
    let o = '';
    if (h.mun === 'le') o = linje(`M${-21 * b} -5 Q0 ${6 + 10 * b} ${21 * b} -5`, 6.5);
    else if (h.mun === 'ledsen') o = linje('M-16 7 Q0 -6 16 7', 5);
    else if (h.mun === 'streck') o = linje('M-6 4 L18 -1', 5);
    else if (h.mun === 'o') o = `<ellipse transform="scale(${h.oSkala || 1})" cx="0" cy="2" rx="9" ry="11" fill="${MUNHAL}" stroke="${INK}" stroke-width="4"/>`;
    else if (h.mun === 'tunga') o = `<ellipse cx="9" cy="7" rx="9" ry="10" fill="${TUNGA}" stroke="${INK}" stroke-width="4"/>` + linje('M-20 -5 Q0 14 20 -5', 5);
    else if (h.mun === 'oppen') o = `<g transform="scale(${0.8 * b} ${1.3 * m})">` +
      `<path d="M-24 -12 Q0 -6 24 -12 Q22 18 0 18 Q-22 18 -24 -12Z" fill="${MUNHAL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>` +
      `<ellipse cx="2" cy="10" rx="11" ry="6" fill="${TUNGA}"/></g>`;
    ut += `<g transform="translate(${opt.mun[0]} ${opt.mun[1]}) scale(${ms})">${o}</g>`;
    if (opt.nos) {
      const [nx, ny] = opt.nos;
      if (h.mun === 'le') ut = linje(`M${nx} ${ny + 14} L${opt.mun[0]} ${opt.mun[1] + 4.5 * b * ms}`, 4) + ut;
      ut += `<ellipse cx="${nx}" cy="${ny}" rx="25" ry="17" fill="#d6568a" stroke="#80284e" stroke-width="3"/>`;
    }
  }
  return ut;
}

// Ett ansikte i en egen grupp. cfg = { ogon, ogonSkala, mun, munSkala } (som i kit.js FIGURER).
function bygg(parent, cfg = {}) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  parent.appendChild(g);
  return { g, satt: (humor, opt = {}) => { g.innerHTML = svg(humor, { ...cfg, ...opt }); } };
}

// Gömmer kit.js-ansiktet på en figur och lägger ett nytt överst i dess inre grupp (följer squash och tilt).
function iFigur(f) {
  f.ansikte.style.display = 'none';
  const F = f.F, a = bygg(f.inre, f.slug === 'musen-mille' ? MILLE : { ogon: F.ogon, ogonSkala: F.ogonSkala, mun: F.mun, munSkala: F.munSkala || 1 });
  a.satt('glad');
  return a;
}

window.ansikten = { HUMOR, MILLE, FISK, svg, bygg, iFigur };
})();
