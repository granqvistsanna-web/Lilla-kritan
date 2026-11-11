// Gula sången (011): allt som ritar filmen – SVG:n, platserna, helikoptern v3 (karet ur bilden, glasbubblan, rotorfoten och
// rotorn i kod), figurerna (v2-riggarna hämtas live ur sina uttryck.html via v2-rigg.js, med verktyg/rigg-motor.js), sakerna,
// jättesolen, discot, kritsvepet, kritirisen och kameran. Byggt efter 013:s scen-kit.js, men utan spegling: helikoptern flyger
// åt HÖGER (→) i bildens egna koordinater och vänds aldrig.
// Sidan laddar först verktyg/blinka.js, produktion/youtube/shorts/godnatt/v2-rigg.js och verktyg/kant.js (rotrelativa sökvägar,
// render.mjs serverar repots rot), sedan den här filen. Figurerna laddas med `await laddaFigurer([...])`.
document.body.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 1920 1080">
  <defs>
    <filter id="boil" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="5000">
      <feTurbulence id="brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="5"/>
    </filter>
    <filter id="mjuk" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="flodf" color-interpolation-filters="sRGB"><feColorMatrix type="matrix"
      values="0.3 0 0 0 0.72  0 0.25 0 0 0.82  0 0 0.5 0 0.65  0 0 0 1 0"/></filter>   <!-- den gula floden: orange → blekt citrongult (som storyboarden) -->
    <filter id="flodkant" x="-0.5" y="-0.5" width="2" height="2"><feGaussianBlur stdDeviation="40"/></filter>
    <mask id="flodm" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480"><circle id="flodr" cx="1411" cy="440" r="0" fill="#fff" filter="url(#flodkant)"/></mask>
    <clipPath id="solklipp"><circle cx="1411" cy="440" r="335"/></clipPath>
    <mask id="karfram" maskUnits="userSpaceOnUse" x="0" y="0" width="1669" height="984">
      <rect x="560" y="198" width="1109" height="786" fill="#fff"/><ellipse cx="1070" cy="198" rx="475" ry="108" fill="#000"/></mask>
    <!-- discot: 005:s och 013:s glittrande kula i gult (kritkorn, mjuka käglor, ljusfläckar) -->
    <filter id="kritkorn" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="9" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="5" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -6 2.3" result="p"/>
      <feComposite in="p" in2="d" operator="in" result="pk"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge>
    </filter>
    <filter id="ljusoskarpa" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="30"/></filter>
    <filter id="kaglaoskarpa" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="ikonkant" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>
    <filter id="dekalskugga" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <linearGradient id="kagla" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF8DE" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF8DE" stop-opacity="0"/></linearGradient>
    <radialGradient id="kulskugga" cx="0.42" cy="0.38" r="0.62"><stop offset="0.55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#5a3c00" stop-opacity="0.4"/></radialGradient>
    <clipPath id="kulklipp"><circle cx="960" cy="128" r="76"/></clipPath>
    <radialGradient id="vinjett" cx="50%" cy="50%" r="75%"><stop offset="55%" stop-color="#2a1a0c" stop-opacity="0"/><stop offset="100%" stop-color="#2a1a0c" stop-opacity="1"/></radialGradient>
  </defs>
  <rect id="duk" width="1920" height="1080" fill="#FAF8F2"/>
  <g id="kamera">
    <g id="platta"></g>
    <g id="bakom" filter="url(#boil)"></g>
    <g id="figurer" filter="url(#boil)"></g>
    <g id="fordon" filter="url(#boil)"></g>
    <g id="framfor" filter="url(#boil)"></g>
    <g id="pynt" filter="url(#boil)"></g>
  </g>
  <g id="ram"></g>
  <rect width="1920" height="1080" fill="#FF9F4A" opacity="0.07" style="mix-blend-mode:soft-light"/>   <!-- premium-finputs: varm ton -->
  <rect width="1920" height="1080" fill="url(#vinjett)" opacity="0.12"/>                                <!-- vinjett, högst 0,14 -->
  <g id="gomda" display="none"></g>
</svg>`);
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const A = window.ASSETS || '../../../assets/';
const SB = window.STORYBOARD || '';
const BILDER = SB + '../scener/_bilder/';                      // discot i gult (omfärgat ur 006 och 013, se scener/README.md)
const GUL = '#F6C21C', GUL_M = '#D99A00', GRÅ = '#8A8A8E', GOLV = '#FAF8F2';
const lerp = (a, b, k) => a + (b - a) * k, kl01 = k => Math.max(0, Math.min(1, k));
const ease = k => { k = kl01(k); return k * k * (3 - 2 * k); };
const fas = (u, a, b) => ease((u - a) / (b - a));              // 0 före a, 1 efter b, mjukt emellan
const lagg = (lager, h) => $(lager).insertAdjacentHTML('beforeend', h);
const pynt = h => lagg('pynt', h);

// --- Urklippen -----------------------------------------------------------------------------------------------------
const MATT = {};                                                // bredd/höjd, så att sak() bara behöver en höjd
const bildfil = (fil, k) => (MATT[fil] = k, fil);
const HIMMEL = A + 'bakgrunder/himlen/himlen-v2.png', ANGEN = A + 'bakgrunder/angen/angen-v4.png'   // v4 (Sanna 2026-11-10): bergen och blommorna vid sidorna finns i plattan, horisonten på ca 49 %;
const JATTESOL = A + 'bakgrunder/jattesolen/jattesolen-v2.png';
// Solen som figur (Sanna 2026-11-10: "have one big sun ... might need slight rig for dancing and face"): kroppen och strålkransen är
// egna delar, klippta ur jättesolens målade sol (1520-rutor, mitten 760, kroppens radie 450), och plattan har en kopia utan sol.
const SOL_KROPP = BILDER + 'sol/sol-kropp.png', SOL_STRALAR = BILDER + 'sol/sol-stralar.png', JATTESOL_TOM = BILDER + 'sol/jattesolen-utan-sol.png';
const MOLN = Object.fromEntries([['stort', 941 / 617], ['mellan', 793 / 510], ['litet', 608 / 435], ['langt', 926 / 413]]
  .map(([n, k]) => [n, bildfil(A + `bakgrunder/himlen-saker/moln-${n}.png`, k)]));
const BANAN = bildfil(A + 'rekvisita/banan/cut/banan-v2.png', 1659 / 1535);
const BLOMMA = bildfil(A + 'rekvisita/blommor-gula/cut/blomma-gul-1.png', 844 / 1242);   // smörblomman (den högsta av de tre)
const BLOMMOR = [BLOMMA, bildfil(A + 'rekvisita/blommor-gula/cut/blomma-gul-2.png', 800 / 1060), bildfil(A + 'rekvisita/blommor-gula/cut/blomma-gul-3.png', 800 / 1060)];
const KAR_ORG = A + 'rekvisita/helikopter-gul/cut/helikopter-gul-v3.png';
const KAR = BILDER + 'helikopter-tunn.png';   // polish 2026-11-11: tunn_kant 6 (samma kant som Lage i karet, vita-kanter); förra: helikopter-utan-stjartrotor.png
//   // kopia där den målade stjärtrotorn är borttagen (den snurrar i kod, Sanna 2026-11-10)   // 1669 × 984, öppet kar, nosen åt höger
const LAGE_MAPP = 'lage-gul-4/';   // polish 2026-11-11: lage-gul-2 + långa rötter (langre_rot.py) på svans och ben
//   // Lages kopior för 011 (lage-gul-N/: gulare, Sanna 2026-11-10 "maybe make lion more gul")
const SVANS = BILDER + LAGE_MAPP + 'lage-tail.png';   // Lages delar med tunnare kant (6 px i 1024-rutan, Sanna 2026-11-10: "lions white rim looks a bit thick")
const DISCO = BILDER + 'disco-gul.png', KULA = BILDER + 'discokula-gul.png';
const KORN = A + '../avsnitt/013-rod-brandbil/storyboard-v2/kritsvep-korn.png';   // 006:s vaxkorn, som 013

// sak: ett urklipp med underkanten på `botten`, h högt, mitt på x
const sak = (lager, fil, x, botten, h, extra = '') => {
  const i = document.createElementNS(NS, 'image'), w = h * (MATT[fil] || 1);
  i.setAttribute('href', fil); i.setAttribute('height', h); i.setAttribute('width', w);
  i.setAttribute('x', x - w / 2); i.setAttribute('y', botten - h);
  if (extra) i.setAttribute('transform', extra);
  $(lager).appendChild(i); return i;
};
const bananSvg = (x, botten, h, rot = 0, extra = '') => { const s = h / 1535;
  return `<image href="${BANAN}" width="1659" height="1535" ${extra} transform="translate(${x} ${botten}) rotate(${rot}) scale(${s}) translate(-830 -1535)"/>`; };

// --- Platserna (1920 × 1080; storyboardens tal × 1920/1376) ------------------------------------------------------------
const platta = (fil, extra = '') => { $('platta').innerHTML = `<image href="${fil}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>` + extra; };
// Himlen v2 med fyra moln (fast, ingen slump). glid flyttar molnen åt vänster (helikoptern flyger åt höger), sjunk ner.
const MOLNLAGE = [['stort', 321, 419, 237], ['litet', 1646, 279, 126], ['langt', 1144, 865, 153], ['mellan', 1744, 781, 167]];
function himmel(glid = 0, sjunk = 0, fsjunk = 1.2 * sjunk) {   // fsjunk: förgrundsmolnet (film.js stigning)
  platta(HIMMEL);
  // parallax (animatörens noter 2026-11-10): små moln långt bort glider långsamt, stora nära fort; ett stort moln i förgrunden
  // nertill glider förbi snabbast, så att det syns att helikoptern flyger åt höger
  for (const [n, x, y, h] of MOLNLAGE) sak('bakom', MOLN[n], ((x - glid * h / 190) % 2520 + 2520) % 2520 - 300, y + sjunk, h);
  if (typeof BILD !== 'string' || BILD !== '09a') sak('framfor', MOLN.stort, ((1700 - 1.7 * glid) % 3400 + 3400) % 3400 - 700, 1215 + fsjunk, 330);
}
// Ängen v2: himmel, ett moln uppe till vänster och en målad sol uppe till höger (mitt ca 1723, 160), gräset från y ca 858.
// Låga kritberg långt bak, ritade i kod med dämpade färger: masken släpper bara igenom himlen i plattan (blått över grönt),
// så bergen hamnar bakom gräset och molnet. Gula smörblommor i gräset, som gungar lite.
// bara de dansande smörblommorna i mitten (plattans egna blommor står vid sidorna och nertill)
const ANG_BLOMMOR = [[1030, 905, 34, 1], [1180, 925, 44, 0], [1300, 975, 58, 1]];
function angen() {
  platta(ANGEN, window.ANG_UTAN_SOL ? '' : `${solFigur(1726, 165, 82, { mun: window.solMun?.() || 0 })}`);   // samma sol som i himlen och vid jättesolen
  // mer att titta på (polish 2026-11-11): två små moln driver långsamt över himlen
  const tt = typeof TID === 'number' ? TID : 0;
  [[300, 150, 70, 9], [1180, 105, 56, 6]].forEach(([x, y, h, v]) => sak('bakom', MOLN.litet, ((x - tt * v) % 2300 + 2300) % 2300 - 190, y, h));
  // smörblommorna dansar lugnt efter första refrängen (Sanna 2026-11-10: "flowers dancing"): gungar i takt och nickar
  const dans = typeof TID === 'number' ? Math.max(fas(TID, 80, 82), 0.5 * fas(TID, 23.4, 24.6) * (1 - fas(TID, 32.6, 33.6))) : 0,   // halv gungning på första "Gul-li-gul" (granskningen 2026-11-10)
    ss = typeof SANG0 === 'number' ? (TID - SANG0) / BEAT : 0;
  ANG_BLOMMOR.forEach(([x, y, h, i], j) => { const v = 3 * Math.sin(TID * 1.3 + x) * (1 - dans) + dans * 9 * Math.sin(Math.PI * ss / 2 + j * 0.7), n = 1 - dans * 0.05 * Math.abs(Math.sin(Math.PI * ss + j));
    sak('bakom', BLOMMOR[i], x, y, h, `rotate(${v.toFixed(2)} ${x} ${y}) translate(${x} ${y}) scale(1 ${n.toFixed(3)}) translate(${-x} ${-y})`); });
}
// Jättesolen (refrängen): plattans egen sol (mitt 1411, 440) lyfts ut som en klippt kopia så att den kan guppa, och får ansiktet i
// kod. flod 0–1: den gula floden växer ut från solen (1 = hela himlen).
const SOL = [1411, 440];
// solFigur(x, y, r, { u, mun, dans }) → svg-sträng. r = kroppens radie. Strålkransen roterar långsamt och gungar emot kroppen,
// kroppen gungar, guppar och trycks ihop lugnt i takt, ansiktet blinkar med båda ögonen och munnen öppnas med mun (0–1).
function solFigur(x, y, r, { u = 'glad', mun = 0, dans = 1, t = typeof TID === 'number' ? TID : 0 } = {}) {
  if (u === 'glad' && t % 5.3 < 0.22) u = 'blinkar';
  const ss = typeof SANG0 === 'number' ? (t - SANG0) / BEAT : t, k = r / 450;
  const sv = dans * 6 * Math.sin(Math.PI * ss / 2), gp = dans * 0.045 * r * Math.abs(Math.sin(Math.PI * ss / 2)), tr = dans * 0.03 * Math.sin(Math.PI * ss);
  const strRot = (t * 6) % 360 - 1.6 * sv, strSk = 1 + 0.03 * Math.sin(Math.PI * ss / 2 + 1);
  const fk = r / 285;
  return `<g transform="translate(${x.toFixed(1)} ${(y - gp).toFixed(1)}) rotate(${sv.toFixed(2)})">
    <image href="${SOL_STRALAR}" width="1520" height="1520" transform="rotate(${strRot.toFixed(2)}) scale(${(k * strSk).toFixed(4)}) translate(-760 -760)"/>
    <g transform="translate(0 ${(0.9 * r).toFixed(1)}) scale(${(1 + tr).toFixed(4)} ${(1 - tr).toFixed(4)}) translate(0 ${(-0.9 * r).toFixed(1)})">
      <image href="${SOL_KROPP}" width="1520" height="1520" transform="scale(${k.toFixed(4)}) translate(-760 -760)"/>
      <g transform="scale(${fk.toFixed(4)}) translate(${-SOL[0]} ${-SOL[1]})">${solAnsikte(u, t, mun)}</g></g></g>`;
}
function jattesol({ flod = 0, bop = 0, ansikte = 'glad', t = 0, mun = 0, vick = 0 } = {}) {   // vick: solen vinkar (vickar runt sin nederkant)
  const ss = typeof SANG0 === 'number' ? (t - SANG0) / BEAT : t;
  platta(JATTESOL_TOM, `<image href="${JATTESOL_TOM}" width="1920" height="1080" filter="url(#flodf)" mask="url(#flodm)"/>
    <circle cx="${SOL[0]}" cy="${SOL[1]}" r="300" fill="${flod > 0.5 ? '#FBEFA8' : '#F4BB45'}" filter="url(#mjuk)"/>
    <g transform="translate(${SOL[0]} ${SOL[1]}) rotate(${((t * 5) % 360).toFixed(1)})" opacity="${(0.2 + 0.05 * Math.sin(Math.PI * ss / 4)).toFixed(3)}">${Array.from({ length: 16 }, (_, i) => {
      const a = i * Math.PI / 8, b = a + 0.1; return `<path d="M0 0L${(1500 * Math.cos(a)).toFixed(0)} ${(1500 * Math.sin(a)).toFixed(0)}L${(1500 * Math.cos(b)).toFixed(0)} ${(1500 * Math.sin(b)).toFixed(0)}Z" fill="#FFF1B8"/>`; }).join('')}</g>
    <circle cx="${SOL[0]}" cy="${SOL[1]}" r="470" fill="#FFE07A" opacity="0.3" filter="url(#mjuk)"/>
    <g transform="rotate(${vick.toFixed(2)} ${SOL[0]} ${SOL[1] + 280})">${solFigur(SOL[0], SOL[1] - bop, 314, { u: ansikte, t, mun })}</g>`);
  $('flodr').setAttribute('r', flod >= 1 ? 2400 : (flod <= 0 ? 0 : 150 + 900 * flod).toFixed(0));
}
function solAnsikte(u, t, prat = 0) {
  const [cx, cy] = SOL, D = '#6b3d14', glad = u === 'fnissig' || (u === 'jatteglad' && prat < 0.1), blink = u === 'blinkar';
  const oga = (x, sluten) => sluten ? `<path d="M${x - 22} ${cy - 18} Q${x} ${cy - 44} ${x + 22} ${cy - 18}" fill="none" stroke="${D}" stroke-width="9" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="${cy - 25}" rx="16" ry="23" fill="${D}"/><circle cx="${x - 5}" cy="${cy - 33}" r="5.5" fill="#fff"/>`;
  const mun = prat > 0.05 ? `<ellipse cx="${cx}" cy="${cy + 52}" rx="${(30 + 6 * prat).toFixed(1)}" ry="${(10 + 30 * prat).toFixed(1)}" fill="#9a3a1c"/>`
    : glad ? `<path d="M${cx - 46} ${cy + 34} Q${cx} ${cy + 36} ${cx + 46} ${cy + 34} Q${cx + 40} ${cy + 92} ${cx} ${cy + 92} Q${cx - 40} ${cy + 92} ${cx - 46} ${cy + 34}Z" fill="#9a3a1c"/>`
    : `<path d="M${cx - 48} ${cy + 38} Q${cx} ${cy + 82} ${cx + 48} ${cy + 38}" fill="none" stroke="${D}" stroke-width="9" stroke-linecap="round"/>`;
  return `<g>${[-1, 1].map(k => `<ellipse cx="${cx + k * 118}" cy="${cy + 38}" rx="34" ry="20" fill="#F2876A" opacity="0.55"/>`).join('')}
    ${oga(cx - 72, glad || blink)}${oga(cx + 72, glad || blink)}${mun}</g>`;
}
// En liten sol i kod: skiva, runda kritstrålar och jättesolens ansikte (u = 'glad' | 'blinkar' | 'fnissig'), som en sträng
function solLiten(x, y, r, u = 'glad', mun = 0) { return solFigur(x, y, r, { u, mun }); }
function solLitenGammal(x, y, r, u = 'glad') {
  const k = r / 230, st = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6;
    return `M${(x + 1.25 * r * Math.cos(a)).toFixed(1)} ${(y + 1.25 * r * Math.sin(a)).toFixed(1)}L${(x + 1.62 * r * Math.cos(a)).toFixed(1)} ${(y + 1.62 * r * Math.sin(a)).toFixed(1)}`; }).join('');
  return `<g><path d="${st}" stroke="#fff" stroke-width="${(0.32 * r + 10).toFixed(1)}" stroke-linecap="round"/><path d="${st}" stroke="#FFD24A" stroke-width="${(0.32 * r).toFixed(1)}" stroke-linecap="round"/>
    <circle cx="${x}" cy="${y}" r="${r + 5}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFCC33"/>
    <g transform="translate(${x} ${y}) scale(${k.toFixed(4)}) translate(${-SOL[0]} ${-SOL[1]})">${solAnsikte(u, typeof TID === 'number' ? TID : 0)}</g></g>`;
}
// Papperet som kritan ritar på
// Sanna 2026-11-10 ("no edges of paper on drawing scene"): papperet fyller hela bilden
const papper = () => { $('platta').innerHTML = `<rect x="-2000" y="-2000" width="6000" height="5000" fill="#FDFBF4"/>`; };

// --- Helikoptern v3 ----------------------------------------------------------------------------------------------------
// Koordinaterna är karets bild (1669 × 984): öppningen är ellipsen (1070, 198, rx 475, ry 108), Lage sitter i karet med fötterna
// på y 498 (skala 0,82, magen vid kanten, manen i bubblan), glasbubblan är en halv ellips (rx 500, ry 470) över öppningen, rotorfoten
// och rotorn ovanpå. Lagren: karet → svansen → Lage → det som ligger i karet → karets framsida (allt under öppningens kant) → bubblan
// → rotorn. Hela helikoptern är ETT klistermärke: kanten (kant.js) ligger på gruppen runt allt.
const OPP = [1070, 198, 475, 108], BUB = [500, 470], TOPP = OPP[1] - BUB[1];
const LAGE_FOT = [1070, 498], LAGE_K = 0.82, LAGE_ANSIKTE = [1070, 498 - (947 - 430) * 0.82];
const HELI_ANKARE = [834, 984];                                  // karets underkant mitt (medarna): det som placeras på (x, botten)
const SVANS_ROT = [713, 772], SVANS_FAST = [1300, 258];          // svansens rot i bilden, och var den sitter i karet (bakom väggen)
const bage = (rx, ry, a0, a1) => { const p = a => [OPP[0] + rx * Math.cos(a * Math.PI / 180), OPP[1] + ry * Math.sin(a * Math.PI / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${rx} ${ry} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
$('fordon').innerHTML = `<g id="heli" opacity="0">
  <g id="heli-stjart"></g>
  <image href="${KAR}" width="1669" height="984"/>
  <g id="heli-svans"><image href="${SVANS}" width="1024" height="1024"/></g>
  <g id="heli-lage"></g>
  <g id="heli-kar"></g>
  <image href="${KAR}" width="1669" height="984" mask="url(#karfram)"/>
  <g id="heli-bubbla">
    <path d="${bage(BUB[0], BUB[1], 180, 360)}" fill="#DCEEFA" fill-opacity="0.2" stroke="#fff" stroke-width="16"/>
    <path d="${bage(BUB[0] * 0.86, BUB[1] * 0.86, 200, 232)}" fill="none" stroke="#fff" stroke-opacity="0.82" stroke-width="20" stroke-linecap="round"/>
    <path d="${bage(BUB[0] * 0.86, BUB[1] * 0.86, 238, 250)}" fill="none" stroke="#fff" stroke-opacity="0.82" stroke-width="20" stroke-linecap="round"/>
  </g>
  <g id="heli-rotor"></g>
  <g id="heli-fram"></g>
</g>`;
// Rotorns vinkel: varvtalet (varv/s) i avsnittstid är en lista [tid, varv/s] med raka ramper emellan; vinkeln är integralen,
// så samma t ger alltid samma bild. Satt av film.js (ROTOR).
let ROTOR = [[0, 0]];
const varv = t => { const i = ROTOR.findLastIndex(([a]) => a <= t); if (i < 0) return ROTOR[0][1]; if (i === ROTOR.length - 1) return ROTOR[i][1];
  const [a, v0] = ROTOR[i], [b, v1] = ROTOR[i + 1]; return lerp(v0, v1, (t - a) / (b - a)); };
const _vinkel = []; const rotorVinkel = t => { const n = Math.max(0, Math.round(t * 50));
  for (let i = _vinkel.length; i <= n; i++) _vinkel[i] = (i ? _vinkel[i - 1] : 0) + 2 * Math.PI * varv(i / 50) / 50; return _vinkel[n]; };
// stjärtrotorn: två blad runt navet bakom fenan (där den målade satt), snurrar i bildplanet, suddig skiva när den går fort
const STJ = [80, 264], STJ_L = 215;
function stjartrotor(t, sp) {
  const v = rotorVinkel(t) * 1.6 * 180 / Math.PI, blad = `<rect x="-30" y="${-STJ_L}" width="60" height="${2 * STJ_L}" rx="30"/>`;
  $('heli-stjart').innerHTML = `<g transform="translate(${STJ[0]} ${STJ[1]})">
    ${sp > 0 ? `<circle r="${STJ_L + 12}" fill="#fff" opacity="${(0.28 * sp).toFixed(2)}"/>` : ''}
    <g transform="rotate(${v.toFixed(1)})" opacity="${(1 - 0.5 * sp).toFixed(2)}"><g fill="#fff" stroke="#fff" stroke-width="28">${blad}</g><g fill="#B9B9BE">${blad}</g></g>
    <circle r="34" fill="${GRÅ}" stroke="#fff" stroke-width="12"/></g>`;
}
function rotor(t) {
  const v = varv(t), sp = kl01(v / 0.4), c = Math.max(0.1, Math.abs(Math.cos(rotorVinkel(t)))), b = 760 * lerp(1, c, sp), cx = OPP[0];
  // när den snurrar: en suddig båge (vit skiva + två svaga spökblad) och bladet självt halvgenomskinligt
  stjartrotor(t, sp);
  const spoke = sp > 0 ? [0.55, 0.85].map(q => { const bb = 760 * Math.max(0.1, Math.abs(Math.cos(rotorVinkel(t) + q))) ;
    return `<rect x="${(cx - bb).toFixed(1)}" y="${TOPP - 86}" width="${(2 * bb).toFixed(1)}" height="22" rx="11" fill="${GRÅ}" opacity="${(0.22 * sp).toFixed(2)}"/>`; }).join('') : '';
  $('heli-rotor').innerHTML = `${sp > 0 ? `<ellipse cx="${cx}" cy="${TOPP - 75}" rx="775" ry="30" fill="#fff" opacity="${(0.5 * sp).toFixed(2)}"/>
      <ellipse cx="${cx}" cy="${TOPP - 75}" rx="760" ry="20" fill="none" stroke="${GRÅ}" stroke-width="5" opacity="${(0.25 * sp).toFixed(2)}"/>` : ''}${spoke}
    <rect x="${cx - 26}" y="${TOPP - 70}" width="52" height="80" rx="14" fill="${GRÅ}" stroke="#fff" stroke-width="8"/>
    <g opacity="${(1 - 0.45 * sp).toFixed(2)}"><rect x="${(cx - b - 8).toFixed(1)}" y="${TOPP - 96}" width="${(2 * b + 16).toFixed(1)}" height="42" rx="21" fill="#fff"/>
    <rect x="${(cx - b).toFixed(1)}" y="${TOPP - 88}" width="${(2 * b).toFixed(1)}" height="26" rx="13" fill="${GRÅ}"/></g>`;
}
// heli({ x, botten, s, rot, lage: [ansikte, pose], svans: { v, k } | null, bubbla, i_karet: svg, fram: svg })
// Returnerar p(px, py): en punkt i karets bild → scenens koordinater (för kameran och sakerna runt helikoptern).
const luckaK = k => k < 0.72 ? 1.09 * ease(k / 0.72) : 1.09 - 0.09 * ease((k - 0.72) / 0.28);   // slår upp, gungar tillbaka en gång
function heli({ x = 740, botten = 963, s = 0.537, rot = 0, lage = ['glad', 'neutral'], svans = null, bubbla = true, lucka = 0, i_karet = '', fram = '', t = TID, ldy = 0 } = {}) {
  const H = $('heli');
  H.setAttribute('opacity', 1);
  H.setAttribute('transform', `translate(${x.toFixed(1)} ${botten.toFixed(1)}) rotate(${rot.toFixed(2)}) scale(${s.toFixed(4)}) translate(${-HELI_ANKARE[0]} ${-HELI_ANKARE[1]})`);
  rotor(t);
  $('heli-bubbla').setAttribute('opacity', typeof bubbla === 'number' ? bubbla : bubbla ? 1 : 0);
  const lock = lucka > 0 ? `rotate(${(-78 * luckaK(lucka)).toFixed(2)} ${OPP[0] - BUB[0]} ${OPP[1]})` : '';
  $('heli-bubbla').setAttribute('transform', lock); $('heli-rotor').setAttribute('transform', lock);   // glasbubblan fälls upp bakåt, rotorn och masten följer med
  $('heli-kar').innerHTML = i_karet; $('heli-fram').innerHTML = fram;
  const sv = $('heli-svans');
  sv.setAttribute('opacity', svans ? 1 : 0);
  if (svans) sv.setAttribute('transform', `translate(${SVANS_FAST[0]} ${SVANS_FAST[1]}) rotate(${-svans.v}) scale(${svans.k || 1.3}) translate(${-SVANS_ROT[0]} ${-SVANS_ROT[1]})`);
  if (lage) visa('lage', { lager: 'heli-lage', x: LAGE_FOT[0], fot: LAGE_FOT[1] + ldy, s: LAGE_K, u: lage[0], po: lage[1], skugga: false });
  const a = rot * Math.PI / 180;
  return ([px, py]) => { const dx = (px - HELI_ANKARE[0]) * s, dy = (py - HELI_ANKARE[1]) * s;
    return [x + dx * Math.cos(a) - dy * Math.sin(a), botten + dx * Math.sin(a) + dy * Math.cos(a)]; };
}
// svansens tofs i karets bild, för svansvinkeln v och skalan k
const tofsen = (v, k = 1.3) => { const a = v * Math.PI / 180, dx = (880 - SVANS_ROT[0]) * k, dy = (650 - SVANS_ROT[1]) * k;
  return [SVANS_FAST[0] + dx * Math.cos(a) + dy * Math.sin(a), SVANS_FAST[1] - dx * Math.sin(a) + dy * Math.cos(a)]; };
// Liten helikopter utan Lage och bubbla (klistermärket i discot): karet och rotorn
const liten_heli = (x, botten, h) => { const s = h / (984 - TOPP + 96);
  return `<g transform="translate(${x} ${botten}) scale(${s.toFixed(4)}) translate(${-HELI_ANKARE[0]} -984)"><image href="${KAR_ORG}" width="1669" height="984"/>
    <rect x="${OPP[0] - 26}" y="${OPP[1] - 110}" width="52" height="100" rx="14" fill="${GRÅ}"/>
    <rect x="${OPP[0] - 640}" y="${OPP[1] - 140}" width="1280" height="34" rx="17" fill="${GRÅ}" stroke="#fff" stroke-width="10"/></g>`; };

// --- Figurerna (v2-riggarna) ---------------------------------------------------------------------------------------------
// Riggen hämtas live ur figurens uttryck.html (v2-rigg.js), så filmen har samma ansikten, poser och rörelser som arket.
// visa(namn, { lager, x, fot, s, u, po }) flyttar figuren till lagret och ritar den; u = uttrycket (namn eller objekt),
// po = posen. Byts storyboardbilden glider ansikte och pose över på 0,4 s från förra bildens sista läge (filmen renderas i ordning).
const MAPP = { lage: 'lejonet-lage/premium-v3', hugo: 'hunden-hugo/premium', kanel: 'kaninen-kanel/premium',
  humle: 'humlan-humle/premium', humle2: 'humlan-humle/premium' };
const FIG = {};
// Som produktion/youtube/shorts/godnatt/v2-rigg.js (utsnittet från "const RIGG"/"const GOM" till slutet av "const ROR", motorn
// först), men med hela mappen, så att Lages premium-v3 går att ladda.
async function rigg(mapp, nr) {
  const bas = `/assets/karaktarer/${mapp}/`, rader = (await (await fetch(bas + 'uttryck.html')).text()).split('\n');
  const a = rader.findIndex(r => r.startsWith('const RIGG') || r.startsWith('const GOM')), r0 = rader.findIndex(r => r.startsWith('const ROR'));
  const b = rader.findIndex((r, i) => i > r0 && r.startsWith('};')) + 1;
  const motor = await (await fetch('/verktyg/rigg-motor.js')).text();
  const kod = rader.slice(a, b).join('\n').replaceAll('href="cut/', `href="${nr === 'lage' ? BILDER + LAGE_MAPP : nr === 'hugo' ? BILDER + 'hugo-011/' : bas + 'cut/'}`)
    .replace(/^function figur\(x, y, skala\) \{/m, 'function figur(x, y, skala, parent) {')
    .replace("document.querySelectorAll('#figurer > g').length", `'f${nr}'`)
    .replace("document.getElementById('figurer').appendChild(g);", 'parent.appendChild(g);')
    .replace("del('tail', p.svans, 0, lyft(RIGG.tail[1]));", "del('tail', p.svans, 0, lyft(RIGG.tail[1]), [window.SVANS_S || 1, window.SVANS_S || 1]);")   // SVANS_S (film.js): större svans i tittuten (08)
    // Kawaii-ögon (Sanna 2026-11-10: "use kawaii eyes sometime"): ett eget uttrycksvärde, kawaii 0–1, som blandas som de andra.
    // Ögonen blir större och får en andra, liten glans; den stora glansen växer. Riggens fil ändras inte, bara den laddade koden.
    .replace('const NEUTRAL = {', 'const NEUTRAL = { kawaii: 0,')
    .replace(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="6" fill="#fff"\/>/, '<circle class="glans1" cx="$1" cy="$2" r="6" fill="#fff"/><circle class="glans2" cx="6" cy="9" r="5.5" fill="#fff" opacity="0"/>')
    .replace(/scale\(\$\{f\.ogonS\[0\]\} \$\{f\.ogonS\[1\]\}\)`\);/, "scale(${f.ogonS[0] * (1 + 0.3 * f.kawaii)} ${f.ogonS[1] * (1 + 0.3 * f.kawaii)})`); ogon[i].querySelectorAll('.glans1').forEach(c => c.setAttribute('r', 6 + 4.5 * f.kawaii)); ogon[i].querySelectorAll('.glans2').forEach(c => c.setAttribute('opacity', f.kawaii));");
  return new Function(`${motor}\n${kod}\nreturn { figur, rita, blanda, blandaPose, param, UTTRYCK, NEUTRAL, POSER, POSE0, ROR, RIGG, FOTTER };`)();
}
async function laddaFigurer(namn) {
  for (const n of namn) {
    const L = await rigg(MAPP[n], n);
    if (L.UTTRYCK.jatteglad) L.UTTRYCK.kawaii = { ...L.UTTRYCK.jatteglad, namn: 'kawaii', glad: [0, 0], lock: [0, 0], kawaii: 1, ogonS: [1.06, 1.08], ogonY: -3, kind: 1.25 };
    const g = L.figur(512, L.FOTTER, 1, $('gomda'));
    FIG[n] = { L, g, blinka: skapaBlinka(11 + Object.keys(FIG).length * 7), sist: null };
    if (n === 'lage') g.querySelectorAll('.tail').forEach(e => e.style.display = 'none');
    if (n.startsWith('humle')) g.querySelectorAll('.leg-l, .leg-r').forEach(e => e.setAttribute('visibility', 'hidden'));   // Humle utan ben (Sanna 2026-11-10)   // svansen ritas av heli() (sticker upp i 05)
    if (n !== 'lage' && window.kant) kant.lagg(g);
  }
}
// kantens grupp runt helikoptern (Lage sitter i den): ett klistermärke
if (window.kant) kant.lagg($('heli'));
// Lage utanför helikoptern (vid dammen): en egen grupp framför helikoptern med egen kant. Ligger utanför lagren som töms varje
// bildruta, så att riggen inte raderas; gom() flyttar tillbaka figuren till #gomda.
$('framfor').insertAdjacentHTML('afterend', '<g filter="url(#boil)"><g id="lage-ute"></g></g>');
if (window.kant) kant.lagg($('lage-ute'));
const bas = (L, u) => typeof u === 'string' ? L.blanda('neutral', u, 1) : { ...L.blanda('neutral', 'neutral', 1), ...(u.bas ? L.blanda('neutral', u.bas, 1) : {}), ...u, bas: undefined };
const basPose = (L, po) => typeof po === 'string' ? L.blandaPose('neutral', po, 1) : { ...L.POSE0, ...(po.bas ? L.blandaPose('neutral', po.bas, 1) : {}), ...po, bas: undefined };
function visa(namn, { lager = 'figurer', x = 960, fot = 1000, s = 0.5, u = 'glad', po = 'neutral', skugga = true, mun = null, svans = false } = {}) {
  const F = FIG[namn], { L, g } = F;
  $(lager).appendChild(g);
  const hq = namn === 'lage' && typeof TID === 'number' ? window.lageHopp?.() : null;   // Lages glada skutt (film.js GLADHOPP)
  if (hq) fot -= hq.dy * s;
  g.setAttribute('transform', `translate(${x.toFixed(1)} ${fot.toFixed(1)}) scale(${s.toFixed(4)}) translate(-512 ${-L.FOTTER})`);
  let f = bas(L, u), p = basPose(L, po);
  // mjuka byten mellan storyboardbilderna (som 013:s kanin)
  if (typeof TID === 'number') {
    const S = F.sist;
    if (S && S.bild !== BILD && TID - S.tid < 0.2 && TID >= S.tid) F.fran = { ...S, till: BILD };
    if (F.fran && F.fran.till === BILD && TID - BILD0 >= 0 && TID - BILD0 < 0.4) {
      const k = ease((TID - BILD0) / 0.4); f = L.blanda(F.fran.f, f, k); p = L.blandaPose(F.fran.p, p, k); }
    F.sist = { f, p, bild: BILD, tid: TID };
    // liv: andas (3,6 s), huvudet gungar lite med musiken, blinkar
    const a = (1 - Math.cos(2 * Math.PI * TID / 3.6)) / 2;
    p = { ...p, strack: p.strack + 0.012 * a, bred: p.bred + 0.006 * a };
    f = { ...f, luta: f.luta + 1.2 * Math.sin(Math.PI * (TID - SANG0) / BEAT) * (TID > SANG0 ? 1 : 0) };
    if (namn === 'lage') p = { ...p, luta: p.luta + 1.4 * Math.sin(TID * 0.85 + 1) };   // liv: väger lugnt från sida till sida (polish 2026-11-11)
    if (hq) p = { ...p, strack: p.strack + hq.po.strack, bred: p.bred + hq.po.bred, armar: [p.armar[0] + hq.po.armar[0], p.armar[1] + hq.po.armar[1]], ...(hq.po.benY[0] ? { benY: hq.po.benY } : {}) };
    f = F.blinka(f, TID + 0.3 * Object.keys(FIG).indexOf(namn));
  }
  if (mun) f = { ...f, ...mun };
  else if (window.munOppen?.() && namn !== 'humle2') f = { ...f, mun: namn === 'humle' ? [16, 18] : [16, 15, 1, 460], streck: 0 };   // munnen öppen på ekoorden
  g.querySelectorAll('.skugga').forEach(e => e.style.display = skugga ? '' : 'none');
  if (namn === 'lage') g.querySelectorAll('.tail').forEach(e => e.style.display = svans ? '' : 'none');   // i helikoptern ritar heli() svansen
  L.rita(g, f, p);
  return g;
}
// en punkt i figurens 1024-ruta → scenens koordinater (utan posens lutning)
const iFigur = (namn, x, fot, s, [px, py]) => [x + (px - 512) * s, fot + (py - FIG[namn].L.FOTTER) * s];
const gom = () => { for (const n in FIG) $('gomda').appendChild(FIG[n].g); $('heli').setAttribute('opacity', 0); };

// --- Små saker -----------------------------------------------------------------------------------------------------------
// Krit-gnista (som 013): fyruddig gul stjärna med vit kant
const stj = r => `M0 ${-r} Q${r * 0.16} ${-r * 0.16} ${r} 0 Q${r * 0.16} ${r * 0.16} 0 ${r} Q${-r * 0.16} ${r * 0.16} ${-r} 0 Q${-r * 0.16} ${-r * 0.16} 0 ${-r}Z`;
const gnista = (x, y, r, rot = 0, lager = 'pynt') => r > 0.5 && lagg(lager, `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})" stroke-linejoin="round">
  <path d="${stj(r)}" fill="#fff" stroke="#fff" stroke-width="${(3 + 0.16 * r).toFixed(1)}"/><path d="${stj(r)}" fill="#F2C94C"/><path d="${stj(r * 0.5)}" fill="#FFF7D6"/></g>`);
// Glitter i en ring runt sakens egen form (mitt cx, cy, radie r), k = sekunder sedan det började; gnistorna poppar en i taget
function glitter(cx, cy, r, k, n = 5) {
  if (k < 0 || k > 1.8) return;
  for (let j = 0; j < n; j++) { const v = (-150 + j * 360 / n) * Math.PI / 180, d = j * 0.1, q = (k - d) / 1.1;
    if (q > 0 && q < 1) gnista(cx + 1.08 * r * Math.cos(v), cy + 0.9 * r * Math.sin(v), (0.14 * r + 10) * Math.sin(Math.PI * q), 25 * q + j * 30); }
}
// vita vindvirvlar under rotorn (två bågar som växer och tonar)
const vind = (x, y, k, n = 2) => { for (let i = 0; i < n; i++) { const q = (k + i * 0.5) % 1, r = 50 + 140 * q;
  pynt(`<path d="M${x - r} ${y} Q${x - r * 0.5} ${y - 40 * (1 - q)} ${x} ${y - 10} M${x + r} ${y} Q${x + r * 0.5} ${y - 40 * (1 - q)} ${x} ${y - 10}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="${(0.9 * (1 - q)).toFixed(2)}"/>`); } };
const tar = (x, y, r = 14) => pynt(`<path d="M${x} ${y - 1.6 * r} Q${x + r} ${y} ${x} ${y + r} Q${x - r} ${y} ${x} ${y - 1.6 * r}Z" fill="#8fd0ef" stroke="#fff" stroke-width="4"/>`);

// --- Discot ------------------------------------------------------------------------------------------------------------
// 006:s discoplåt omfärgad till ljusgult (som storyboarden) och 013:s kula i gult, mjuka ljuskäglor, noter som gungar, och raden av
// det vi hittat i en båge överst (klistermärken).
// Discot: 005:s och 013:s ljus i gult. En kula överst som snurrar (rutorna ritas i kod, ett varv på 9 s), mjuka käglor från
// kulan, ljusfläckar som glider och byter ton var fjärde slag, en vit glimt på kulan på varje slag och stjärnor som glittrar runt den.
const KULA_C = [960, 128, 76], FASETT = ['#F6C21C', '#D99A00', '#FFE27A', '#EDB52E'], FASETT_N = 16, FASETT_RADER = 8;
const LJUSFARG = ['#FFFBEA', '#FFEFB0', '#FFE2C4', '#FFF6D0', '#FFFFFF', '#FFE9A0'];
const FLACK = [[460, 900, 210, 66, 360, 40, 13, 0], [1250, 980, 240, 76, 420, 36, 16, 2.1], [890, 840, 180, 56, 530, 25, 11, 4.0],
  [350, 420, 98, 98, 220, 120, 14, 1.0], [1560, 360, 90, 90, 240, 140, 12, 3.2], [980, 280, 106, 106, 460, 56, 17, 5.1]];
const stjD = r => { const k = r * 0.28; return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };
const hexRgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const blandaFarg = (a, b, k) => 'rgb(' + hexRgb(a).map((v, i) => Math.round(v + (hexRgb(b)[i] - v) * k)).join(',') + ')';
function disco({ s = 0, tand = 1 } = {}) {
  const gung = Math.sin(Math.PI * s / BEAT), [cx, cy, R] = KULA_C, k = TID, vrid = -k * 2 * Math.PI / 9;
  const slagT = (TID - SANG0) / BEAT, takt4 = slagT / 4, n4 = Math.floor(takt4), over = Math.min(1, (takt4 - n4) * 4 * BEAT / 0.6);
  const m = j => LJUSFARG[((j % LJUSFARG.length) + LJUSFARG.length) % LJUSFARG.length];
  const flackar = FLACK.map(([x, y, rx, ry, ax, ay, p, f], i) => { const v = 2 * Math.PI * k / p + f;
    return `<ellipse cx="${(x + ax * Math.sin(v)).toFixed(1)}" cy="${(y + ay * Math.sin(2 * v + 1)).toFixed(1)}" rx="${rx}" ry="${ry}" fill="${blandaFarg(m(n4 - 1 + i), m(n4 + i), over)}"/>`; }).join('');
  const kaglor = [-58, -22, 22, 58].map((a, i) => `<path d="M-16 0L16 0L230 1150L-230 1150Z" fill="url(#kagla)" transform="translate(${cx} ${cy}) rotate(${(a + 10 * Math.sin(2 * Math.PI * k / 14 + i * 1.7)).toFixed(2)})"/>`).join('');
  const d = FASETT.map(() => ''), lat = j => -Math.PI / 2 + Math.PI * j / FASETT_RADER;
  const pt = (lo, la) => `${(cx + R * Math.cos(la) * Math.sin(lo)).toFixed(1)} ${(cy + R * Math.sin(la)).toFixed(1)}`;
  let nat = '';
  for (let i = 0; i < FASETT_N; i++) {
    let a = vrid + i * 2 * Math.PI / FASETT_N; a = Math.atan2(Math.sin(a), Math.cos(a)); const b = a + 2 * Math.PI / FASETT_N;
    const a2 = Math.max(a, -Math.PI / 2), b2 = Math.min(b, Math.PI / 2);
    if (Math.abs(a) < Math.PI / 2) nat += 'M' + Array.from({ length: 13 }, (_, q) => pt(a, -Math.PI / 2 + Math.PI * q / 12)).join('L');
    if (b2 <= a2) continue;
    for (let j = 0; j < FASETT_RADER; j++) d[(i * 7 + j * 3 + (i * j) % 5) % FASETT.length] += `M${pt(a2, lat(j))}L${pt(b2, lat(j))}L${pt(b2, lat(j + 1))}L${pt(a2, lat(j + 1))}Z`;
  }
  for (let j = 1; j < FASETT_RADER; j++) { const la = lat(j), w = R * Math.cos(la), y = cy + R * Math.sin(la); nat += `M${cx - w} ${y}L${cx + w} ${y}`; }
  const glimtar = [[-0.35, 13, 0], [0.3, 10, 2.1], [0.05, 9, 4.0], [-0.6, 7, 1.2], [0.6, 7, 3.3], [-0.1, 8, 5.2]].map(([la, r, f0]) => {
    const v = vrid + f0, c = Math.cos(v); if (c <= 0) return '';
    return `<path d="${stjD(r)}" fill="#fff" transform="translate(${(cx + (R - 4) * Math.sin(v) * Math.sqrt(1 - la * la)).toFixed(1)} ${(cy + (R - 4) * la).toFixed(1)}) scale(${(0.4 + 0.6 * c).toFixed(2)})"/>`; }).join('');
  const qb = ((slagT % 1) + 1) % 1 * BEAT, slagGlimt = Math.max(0, 1 - qb / 0.3);
  const glitter = [[-1.3, 0.35, 12], [1.35, -0.2, 10], [1.0, 0.95, 9], [-1.0, -0.9, 8]].map(([dx, dy, r], i) => { const g = Math.max(0, Math.sin(2 * Math.PI * (k / 3.6 + i / 4)));
    return g < 0.03 ? '' : `<path d="${stjD(r)}" fill="#fff" transform="translate(${cx + dx * R} ${cy + dy * R}) rotate(${20 * g}) scale(${g.toFixed(3)})"/>`; }).join('');
  $('platta').innerHTML = `<image href="${DISCO}" width="1920" height="1080"/>
    <g opacity="${(0.33 * tand).toFixed(3)}" filter="url(#ljusoskarpa)">${flackar}</g>
    <g opacity="${(0.9 * tand).toFixed(3)}" filter="url(#kaglaoskarpa)">${kaglor}</g>
    <g>
    <path d="M${cx} -10V${cy - R}" stroke="#E8D9A8" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#fff" filter="url(#kritkorn)"/>
    <g clip-path="url(#kulklipp)"><g filter="url(#kritkorn)">${d.map((p, i) => `<path d="${p}" fill="${FASETT[i]}"/>`).join('')}
      <path d="${nat}" fill="none" stroke="#A87400" stroke-width="2" stroke-linejoin="round"/></g>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#kulskugga)"/><g filter="url(#kritkorn)">${glimtar}</g></g>
    <g filter="url(#kritkorn)">${glitter}<path d="${stjD(22)}" fill="#fff" opacity="${(0.95 * slagGlimt).toFixed(2)}" transform="translate(${cx - 32} ${cy - 36}) scale(${(0.5 + 0.6 * slagGlimt).toFixed(2)})"/></g></g>`;
  const not = (x, y, k, dubbel) => `<g transform="translate(${x} ${y - 10 * gung}) rotate(${8 * gung}) scale(${k})" fill="#B07D00" stroke="#B07D00" stroke-width="7" stroke-linecap="round">
    ${(dubbel ? [0, 44] : [0]).map(dx => `<ellipse cx="${dx}" cy="0" rx="14" ry="10" transform="rotate(-22 ${dx} 0)" stroke="none"/><path d="M${dx + 12} -4V-64" fill="none"/>`).join('')}
    <path d="${dubbel ? 'M12 -64L56 -72' : 'M12 -64Q16 -48 34 -42'}" fill="none"/></g>`;
  // (noterna till vänster borttagna, Sanna 2026-11-10: "notes to the left remove")
}
// Klistermärke: en vit kritskiva med saken i, skala st (0–1 med översväng när det slås upp)
const KLISTER = {
  banan: (x, y, r) => bananSvg(x, y + 0.55 * r, 1.05 * r, -10),
  sol: (x, y, r) => solLiten(x, y, 0.42 * r),
  blomma: (x, y, r) => `<image href="${BLOMMA}" width="844" height="1242" transform="translate(${x} ${y + 0.72 * r}) scale(${(1.45 * r / 1242).toFixed(4)}) translate(-422 -1242)"/>`,
  heli: (x, y, r) => liten_heli(x, y + 0.6 * r, 1.15 * r),
  svans: (x, y, r) => `<image href="${SVANS}" width="1024" height="1024" transform="translate(${x} ${y}) rotate(-20) scale(${(1.45 * r / 300).toFixed(4)}) translate(-800 -700)"/>`,
};
// Samma skiva som 013:s dekaler och rörelsesymbolen i hörnet: mjuk skugga snett nedåt, vit kant med handklippt kant (ikonkant),
// ljusgul insida (vit kant = 14/104 av radien). f = { rot, sx, sy }: 013:s slagUpp (trycks ihop mot underkanten).
function klistermarke(x, y, r, sak, st = 1, lager = 'pynt', f = {}) {
  if (st <= 0) return;
  const vick = (sak === 'humle' ? 5 * Math.sin(Math.PI * (TID - SANG0) / BEAT) : 0) + (f.rot || 0);   // humlans klistermärke surrar och vickar
  const tryck = f.sx ? ` translate(0 ${r.toFixed(1)}) scale(${f.sx.toFixed(3)} ${f.sy.toFixed(3)}) translate(0 ${(-r).toFixed(1)})` : '';
  lagg(lager, `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${vick.toFixed(2)}) scale(${st.toFixed(3)})${tryck} translate(${-x.toFixed(1)} ${-y.toFixed(1)})">
    <circle cx="${x + 5}" cy="${y + 9}" r="${r}" fill="#5a3c00" opacity="0.25" filter="url(#dekalskugga)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#fff" filter="url(#ikonkant)"/><circle cx="${x}" cy="${y}" r="${(r * 90 / 104).toFixed(1)}" fill="#FFF3C4"/>
    ${KLISTER[sak] ? KLISTER[sak](x, y, r) : ''}</g>`);
  if (sak === 'humle') {   // humlan är en egen rigg-kopia (humle2), glad, i skivan
    visa('humle2', { lager, x: x + 0.08 * r * st * Math.cos(TID * 9), fot: y + 0.62 * r * st + 0.06 * r * st * Math.sin(TID * 18), s: 1.15 * r * st / 1024 * 1.25, u: 'jatteglad', po: { luta: 6 * Math.sin(Math.PI * (TID - SANG0) / BEAT) }, skugga: false });
  }
}

// --- Kritsvepet ----------------------------------------------------------------------------------------------------------
// 013:s rodsvep i en färg per platsbyte (format/fargsang-v2.md): in 0–0,46, helt i färg 0,46–0,54 (klippet), ut 0,54–1, vaxkornet
// ur 006 som mask, elva breda vaxdrag i den mörkare tonen, en streckad vit kant, kritan sicksackar vid kanten. Ingen sak i svepet.
const SVEPFARG = { gul: [GUL, GUL_M], bla: ['#3AA0E8', '#1F74C4'], turkos: ['#2BB7A6', '#1C8C7F'] };
const svepVax = (id, yta, F, F_M, drag, kant) => `<defs>
  <pattern id="${id}-korn" patternUnits="userSpaceOnUse" width="890" height="510" patternTransform="rotate(10) scale(1.45)"><image href="${KORN}" width="890" height="510"/></pattern>
  <mask id="${id}-m" maskUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080"><rect x="-500" y="-500" width="2920" height="2080" fill="url(#${id}-korn)"/></mask>
  <filter id="${id}-rand" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="31"/>
    <feDisplacementMap in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter>
  <clipPath id="${id}-yta"><path d="${yta}"/></clipPath></defs>
  <g filter="url(#boil)"><g filter="url(#${id}-rand)"><g clip-path="url(#${id}-yta)">
    <rect x="-400" y="-200" width="2800" height="1500" fill="#FBF7EE"/><rect x="-400" y="-200" width="2800" height="1500" fill="${F}" opacity="0.3"/>
    <rect x="-400" y="-200" width="2800" height="1500" fill="${F}" mask="url(#${id}-m)"/>
    <g fill="none" stroke="${F_M}" stroke-linecap="round" mask="url(#${id}-m)">${drag}</g></g>
    ${kant ? `<path d="${yta}" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="70 9 26 7" opacity="0.6"/>` : ''}</g></g>`;
function kritsvep(k, farg = 'gul') {
  if (k <= 0 || k >= 1) return;
  const [F, F_M] = SVEPFARG[farg];
  const ut = k > 0.54, inne = k >= 0.46 && !ut, u = ut ? (k - 0.54) / 0.46 : Math.min(1, k / 0.46);
  const E = inne ? 2200 : lerp(-260, 2200, ut ? u * u : 1 - (1 - u) * (1 - u));
  const kant = []; for (let y = -120; y <= 1200; y += 40) kant.push([E + 30 * Math.sin(y * 0.013) + 14 * Math.sin(y * 0.07 + 1.3) + 6 * Math.sin(y * 0.31), y]);
  const yta = ut ? `M2400 -200 L${kant.map(p => p.join(' ')).join(' L')} L2400 1300Z` : `M-400 -200 L${kant.map(p => p.join(' ')).join(' L')} L-400 1300Z`;
  const drag = Array.from({ length: 11 }, (_, i) => { const x = i * 250 - 380 + 30 * Math.sin(i * 2.7), w = 46 + 20 * Math.abs(Math.sin(i * 1.9)),
    o = 0.22 + 0.12 * Math.abs(Math.sin(i * 3.1)), b = 24 * Math.sin(i * 1.3);
    return `<path d="M${x.toFixed(0)} -100 Q${(x + 160 + b).toFixed(0)} 540 ${(x + 320).toFixed(0)} 1180" stroke-width="${w.toFixed(0)}" opacity="${o.toFixed(2)}"/>`; }).join('');
  let h = svepVax('svep', yta, F, F_M, drag, !inne);
  if (!ut && !inne) {   // kritan vid kanten, ett lugnt sicksack
    const y = 540 + 360 * Math.sin(u * Math.PI * 4), v = 28 + 8 * Math.cos(u * Math.PI * 4);
    h += `<g filter="url(#boil)" transform="translate(${E} ${y}) rotate(${v}) scale(2.8)">
      <path d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z" fill="${F}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${F_M}"/></g>`;
  }
  lagg('ram', h);
}

// --- Kritirisen (som 013/014) --------------------------------------------------------------------------------------------
function kritiris(r, cx = 960, cy = 540, { t = 0, glimt = 0, in: inn = 0 } = {}) {
  if (r >= 1400) return;
  const ring = 'M' + Array.from({ length: 145 }, (_, j) => { const a = j / 144 * 2 * Math.PI, rr = r * (1 + 0.07 * Math.sin(9 * a + t * 0.8));
    return `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join('L') + 'Z';
  const sx = cx + 110 * (1 - inn), sy = cy - 120 * (1 - inn), sk = (18 + 22 * inn) * glimt;
  lagg('ram', `<path d="M-50 -50H1970V1130H-50Z ${r > 1 ? ring : ''}" fill="#101010" fill-rule="evenodd"/>
    ${r > 1 ? `<path d="${ring}" fill="none" stroke="#fff8e0" stroke-width="${Math.min(14, r / 4)}" stroke-linejoin="round" filter="url(#boil)"/>` : ''}
    ${glimt > 0 ? `<path d="M0 -1 L.16 -.16 L1 0 L.16 .16 L0 1 L-.16 .16 L-1 0 L-.16 -.16Z" fill="#fff8e0" transform="translate(${sx} ${sy}) rotate(${20 * t}) scale(${sk})"/>` : ''}`);
}

// --- Kameran -------------------------------------------------------------------------------------------------------------
// zoom 1 = hela plattan; cx/cy hamnar mitt i bilden. Kameran visar aldrig utanför bakgrunden (art direction v2).
let KAM = [1, 960, 540];
const kamera = (zoom = 1, cx = 960, cy = 540) => {
  const tx = zoom > 1 ? Math.max(1920 - 1920 * zoom, Math.min(0, 960 - cx * zoom)) : 960 - 960 * zoom;
  const ty = zoom > 1 ? Math.max(1080 - 1080 * zoom, Math.min(0, 540 - cy * zoom)) : 540 - 540 * zoom;
  KAM = [zoom, cx, cy];
  $('kamera').setAttribute('transform', `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${zoom.toFixed(4)})`);
  $('brus').nextElementSibling.setAttribute('scale', (5 / Math.max(1, zoom) ** 2).toFixed(2));   // svagare kokning i närbild, så att de tunna vita kanterna inte fladdrar (Sanna 2026-11-10)   // samma kokning på skärmen i alla zoomar
};

// --- Förladdning ---------------------------------------------------------------------------------------------------------
[HIMMEL, ANGEN, JATTESOL_TOM, SOL_KROPP, SOL_STRALAR, ...Object.values(MOLN), BANAN, ...BLOMMOR, KAR, SVANS, DISCO, KULA, KORN]
  .forEach(u => { new Image().src = u; });
