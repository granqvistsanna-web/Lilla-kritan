// Röda sången (013): allt som ritar scenen – SVG:n, brandbilen, kaninen, platserna, sakerna och kameran.
// Delas av storyboarden (board.html) och kodscenerna (../scener/*/index.html). Sidan sätter window.ASSETS och
// window.KANEL_BAS om den inte ligger i storyboard-v2/. Ladda kanel-motor.js först.
document.body.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 1920 1080">
  <defs>
    <filter id="boil" filterUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480">
      <feTurbulence id="brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="5"/>
    </filter>
    <filter id="mjuk" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="22"/></filter>
    <clipPath id="orrot"><rect width="1024" height="308"/></clipPath>
  </defs>

  <rect id="duk" width="1920" height="1080" fill="#FAF8F2"/>
  <g id="kamera"><g id="spegel" transform="translate(1920 0) scale(-1 1)">   <!-- speglad: brandbilen kör åt HÖGER (→) tills den nya v2-brandbilen finns -->
    <g id="platta"></g>
    <g id="bakom"></g>
    <g id="figurer" filter="url(#boil)"></g>
    <g id="fordon" filter="url(#boil)"></g>
    <g id="framfor"></g>
    <g id="pynt" filter="url(#boil)"></g>
  </g></g>
  <g id="ram"></g>
</svg>`);
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const A = window.ASSETS || '../../../assets/';
const SB = window.STORYBOARD || '';                 // storyboard-v2/ sett från sidan (urklippen som ligger här)                       // repots assets, sett härifrån
const RÖD = '#DD4424', RÖD_M = '#B0241E', BLÅ = '#468CE6', GUL = '#F6C21C', GRÅ = '#C9C6BE';
const GRÖN = '#4FA34A', GOLV = '#FAF8F2', GLÖD = '#FFC4BE';
// kl() och mjuk() kommer ur kanel-motor.js

// --- Bilen -------------------------------------------------------------------------------------------------
// Delarna är klippta ur assets/stiltest-premium/bil/ (hel-b.png). Koordinaterna nedan är bildens egna pixlar
// (2400×1792): strålkastaren vid x 380, kåpans öppning ca x 740–2060, hjulen på y 1340, avgasröret vid x 2195.
const B = A + 'stiltest-premium/bil/cut/';
const CS = 0.47, CX = 1000 - 1206 * CS, CY = 1010 - 1578 * CS;   // bilens plats i scenen, som bil-test.html
let SCROLL = 0;   // hur långt marken har glidit förbi just nu (hjulen rullar med den)
const HJUL = { 'hjul-fram': [718.5, 1337], 'hjul-bak': [1700.5, 1343.5] };
const KX = 1320, KY = 600, KS = 1.4;                             // kaninen i bilens pixlar
const STEGE_PIV = [2120, 430], STEGE_L = 1667;   // stegens vridpunkt (överst på stolpen bakom sätet) och längd i bilens pixlar.
// Hopfälld ligger stegen vågrätt på stolpen och sticker ut bakåt över bilens bakdel, som på en riktig stegbil: det är den som gör bilen till en brandbil.
const STEGE_UPP = 21, STEGE_NER = 178, STEGE_KORT = 760, STEGE_STOLPE = 330;
// Stegen skjuts ut som på en riktig stegbil. Uppfälld (21°, utskjuten) stannar spetsen en bit under och till höger
// om äpplet i trädkronan: &rdquo;nästan, nästan – men inte riktigt&rdquo;.
const LJUS = [620, 470], LJUS2 = [2120, 330];                                         // blåljusets fot på motorhuven

// Stegen: två ljusgrå vangstycken med pinnar emellan, ritad från vridpunkten åt vänster (mot bilens front).
// Vinkeln −25 = hopfälld (gömd bakom karossen), +38 = uppfälld mot äpplet.
// SVG roterar medurs, och stegen ritas åt vänster: positiv vinkel lyfter alltså spetsen.
function stege(vinkel, langd = STEGE_L) {
  const pinnar = Array.from({ length: 7 }, (_, i) => {
    const x = -70 - (langd - 110) * (i / 6);
    return `<line x1="${x}" y1="-30" x2="${x}" y2="30" stroke="${GRÅ}" stroke-width="13" stroke-linecap="round"/>`;
  }).join('');
  return `<g transform="translate(${STEGE_PIV[0]} ${STEGE_PIV[1]}) rotate(${vinkel})">
    <rect x="-60" y="-14" width="34" height="${STEGE_STOLPE}" rx="12" fill="${GRÅ}" stroke="#fff" stroke-width="14" transform="rotate(${-vinkel} -43 0)"/>
    <g stroke-linecap="round">
      <line x1="-30" y1="-34" x2="${-langd}" y2="-34" stroke="#fff" stroke-width="54"/>
      <line x1="-30" y1="34" x2="${-langd}" y2="34" stroke="#fff" stroke-width="54"/>
      <line x1="-30" y1="-34" x2="${-langd}" y2="-34" stroke="${GRÅ}" stroke-width="26"/>
      <line x1="-30" y1="34" x2="${-langd}" y2="34" stroke="${GRÅ}" stroke-width="26"/>
    </g>${pinnar}</g>`;
}

// Brandbil E (assets/rekvisita/brandbil-rod/cut/brandbil-e.png, 1792×2400, nosen åt höger), vänd och skalad in i den
// gamla bilens pixlar: hjulen på x 718,5 och 1700,5, hjulens underkant på y 1578. Stegen, ratten, blåljusen och randen
// finns i bilden. Kaninen sitter bakom bilden, så kåpan täcker benen.
const BILE = A + 'rekvisita/brandbil-rod/cut/brandbil-e.png';
$('fordon').innerHTML = `<g id="bil">
  <g id="stege-lager" display="none"></g>
  <g id="gose"></g>
  <image href="${BILE}" width="1792" height="2400" transform="translate(2367.7 -654) scale(-1.24 1.24)"/>
  <path id="bak-fyll" d="M600 650 L600 330 L1150 330 L1150 650 Z" fill="#F9EAD0"/>   <!-- kupéns insida bakom ratten, så att väggen inte syns mellan kaninen och huven -->
  <g id="sate"></g>
  <!-- framsidan igen, ovanpå kaninen: karossen under kåpans kant (y > 536), huven (x < 850) och ratten (x < 1080, y < 452), så att hon sitter i bilen; kupéns krämfärgade insida under ratten ligger bakom henne -->
  <clipPath id="framsida"><rect x="-200" y="536" width="2800" height="1200"/><rect x="-200" y="-400" width="1110" height="1000"/><rect x="900" y="-400" width="180" height="852"/></clipPath>
  <g clip-path="url(#framsida)"><image href="${BILE}" width="1792" height="2400" transform="translate(2367.7 -654) scale(-1.24 1.24)"/></g>
  <g id="hjul-fram"></g><g id="hjul-bak"></g>
  <g id="blaljus" opacity="0">   <!-- blåljusen i bilden (brandbil E) lyser: ett mjukt blått sken runt var lampa -->
    <circle cx="507" cy="283" r="150" fill="${BLÅ}" opacity="0.55" filter="url(#mjuk)"/><circle cx="612" cy="343" r="150" fill="${BLÅ}" opacity="0.55" filter="url(#mjuk)"/>
    <circle cx="507" cy="283" r="46" fill="#cfe4ff" opacity="0.8"/><circle cx="612" cy="343" r="46" fill="#cfe4ff" opacity="0.8"/>
  </g>
  <g id="lampa" opacity="0">
    <circle cx="270" cy="968" r="150" fill="#fff3a0" opacity="0.55" filter="url(#mjuk)"/>
  </g>
</g>`;;

// --- Kaninen -----------------------------------------------------------------------------------------------
// figur() ur motorn. Hon flyttas mellan #figurer (står) och bilens #sate (kör), så att frampanelen täcker benen.
const KANEL = figur(960, 915, 0.5);
KANEL.querySelector('.munnen').insertAdjacentHTML('beforeend',
  `<g class="tunga" transform="translate(512 454) scale(1 0)"><path d="M-30 0 C-32 26 -22 44 0 44 C22 44 32 26 30 0 Z" fill="#E7898C" stroke="#B9565F" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M0 6 Q-2 20 0 28" fill="none" stroke="#B9565F" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="-13" cy="20" rx="6" ry="9" fill="#fff" opacity="0.4"/></g>`);   // munformen "tunga": tungan hänger ut ur munnen, saknas i v2:s uttryck

// Uttryck som syns i liten storlek (bilen är långt bort i de flesta bilderna): nyfiken och förvånad lite tydligare i 013.
Object.assign(UTTRYCK.nyfiken, { ogonS: [1.1, 1.1], titt: [15, -4], bryn: 1, brynY: [-2, -14], le: 0.5 });
Object.assign(UTTRYCK.forvanad, { ogonS: [1.28, 1.24], brynY: [-16, -16], mun: [11, 14, 0, 467] });
function kanin({ uttryck = 'glad', pose: po = 'neutral', rikt = 0, tunga = 0, iBil = false, x = 960, mark = 915, skala = 0.5, synlig = true }) {
  KANEL.setAttribute('opacity', synlig ? 1 : 0);
  if (iBil) { $('sate').appendChild(KANEL); KANEL.setAttribute('transform', `translate(${KX} ${KY + 380}) scale(${KS}) translate(-512 -947)`); }
  else { $('figurer').appendChild(KANEL); KANEL.setAttribute('transform', `translate(${x} ${mark}) scale(${skala}) translate(-512 -947)`); }
  KANEL.querySelector('.skugga').setAttribute('opacity', iBil ? 0 : 0.1);
  let f = typeof uttryck === 'string' ? blanda('neutral', uttryck, 1) : { ...blanda('neutral', 'neutral', 1), ...uttryck };
  let p = typeof po === 'string' ? blandaPose('neutral', po, 1) : { ...POSE0, ...po };
  // Mjuka byten mellan bilderna (Sanna 2026-11-08: "improve bunny animation and the face expressions"): när storyboardbilden
  // byts glider ansikte, pose och riktning över på 0,45 s från förra bildens sista läge i stället för att hoppa. Filmen
  // renderas bild för bild i ordning, så förra läget finns kvar; enstaka stillbilder hoppar som förut.
  if (typeof TID === 'number' && typeof BILD === 'string') {
    const S = kanin.sist, dt = TID - BILD0;
    if (S && S.bild !== BILD && TID - S.tid < 0.2 && TID >= S.tid) kanin.fran = { ...S, till: BILD };
    if (kanin.fran && kanin.fran.till === BILD && dt >= 0 && dt < 0.45) {
      const k = ease(dt / 0.45), F = kanin.fran;
      f = blanda(F.f, f, k); p = blandaPose(F.p, p, k); rikt = lerp(F.rikt, rikt, k); tunga = lerp(F.tunga, tunga, k);
    }
    kanin.sist = { f, p, rikt, tunga, bild: BILD, tid: TID };
  }
  KANEL.riktning = rikt;
  // Liv i figuren (bara i filmen, där TID finns; samma t ger alltid samma bild): hon blinkar, andas, öronen svajar i
  // fartvinden och släpar efter takten, huvudet gungar lite med musiken och tassarna rattar lite vid körning.
  if (typeof TID === 'number' && typeof BEAT === 'number') {
    const t = TID, takt = Math.sin(Math.PI * t / BEAT), slapar = Math.cos(Math.PI * t / BEAT);
    if (Math.max(...f.lock) < 0.5) f = blinka(f, t + 0.7, 3.3);
    const vind = iBil ? 3 * Math.sin(t * 9) : 0, svaj = 2 * Math.sin(t * 5) + vind, lag = (iBil ? 5 : 3) * slapar;
    // studsen: bilen (och hon) landar på varje slag, då trycks hon ihop lite och öronen faller efter
    const land = typeof studs === 'function' ? 1 - studs(t - SANG0) : 0;
    f = { ...f, strack: f.strack + 0.012 * Math.sin(t * 2.4) - 0.016 * land * land, luta: f.luta + 1.5 * takt,
      oron: [f.oron[0] + svaj + lag + 4 * land, f.oron[1] - svaj + lag + 4 * land] };
    // blicken: små snabba ögonkast var 1,7 s (öppna ögon), som ett barn som tittar sig omkring
    if (Math.max(...f.glad) < 0.5 && Math.max(...f.lock) < 0.5) {
      const h = n => { const v = Math.sin(n * 12.9898) * 43758.5453; return (v - Math.floor(v)) * 2 - 1; };
      const n = Math.floor(t / 1.7), k = ease((t - n * 1.7) / 0.09), mal = n => [5 * h(n), 3 * h(n + 31)];
      const [a, b] = [mal(n - 1), mal(n)];
      f = { ...f, titt: [f.titt[0] + lerp(a[0], b[0], k), f.titt[1] + lerp(a[1], b[1], k)] };
    }
    // hon sjunger med i "iii-ooo!" i bilen: munnen blir ett runt o, ögonen glada, öronen spetsas
    if (iBil && typeof ioio === 'function' && ioio() && f.mun[0] < 14 && tunga === 0) {
      const st = t - SANG0, a0 = IOIO.find(a => st >= a && st < a + IO_L), k = Math.sin(Math.PI * kl01((st - a0) / IO_L)) ** 0.5;
      f = blanda(f, { ...f, mun: [11, 14, 0, 467], streck: 0, kind: 1, glad: [1, 1], oron: [f.oron[0] - 6, f.oron[1] - 6] }, k);
    }
    if (iBil) { const ratt = 4 * Math.sin(t * 1.3); p = { ...p, armar: [p.armar[0] + ratt, p.armar[1] - ratt] }; }
  }
  rita(KANEL, f, p);
  KANEL.querySelector('.tunga').setAttribute('transform', `translate(512 454) scale(${0.6 + 0.4 * tunga} ${tunga})`);
}

// --- Övriga figurer och saker ---------------------------------------------------------------------------------
// Allt som läggs i #bakom, #framfor och #pynt rensas mellan bilderna.
const EGEN = A + 'stiltest-premium/cut/egen/', SKOG = A + 'bakgrunder/skogen-gron-saker/';
const sak = (lager, fil, x, botten, h, extra = '') => {
  const i = document.createElementNS(NS, 'image'), w = h * MATT[fil];
  i.setAttribute('href', fil); i.setAttribute('height', h); i.setAttribute('width', w);
  i.setAttribute('x', x - w / 2); i.setAttribute('y', botten - h);
  if (extra) i.setAttribute('transform', extra);
  $(lager).appendChild(i); return i;
};
// bredd/höjd för de urklipp som används, så att sak() bara behöver en höjd
const MATT = {};
[[EGEN + 'trad.png', 1196 / 1943], [EGEN + 'gras.png', 669 / 597], [EGEN + 'buske.png', 819 / 545],
 [SKOG + 'svamp.png', 1595 / 2046], [SKOG + 'sten.png', 2219 / 1564], [SKOG + 'stock.png', 2626 / 1263],
 [A + 'rekvisita/applet-rott/cut/applet-rott-v1.png', 1], [A + 'rekvisita/gosekanin/cut/gosekanin-v4.png', 255 / 520],
].concat([[SB + 'mus-glad.png', 471 / 512], [SB + 'mus-upp.png', 477 / 535], [SB + 'bulle-glad.png', 440 / 471], [SB + 'ludde-glad.png', 535 / 464], [SB + 'gurra-glad.png', 458 / 475], [SB + 'buss.png', 1.5], [SB + 'chilibil.png', 600 / 423], [SB + 'chili.png', 600 / 1012], [A + 'rekvisita/brandbil-rod/cut/brandbil-e.png', 1792 / 2400]]).forEach(([f, k]) => MATT[f] = k);

const TRAD = EGEN + 'trad.png', GRAS = EGEN + 'gras.png', BUSKE = EGEN + 'buske.png';
const APPLE = A + 'rekvisita/applet-rott/cut/applet-rott-v3.png';   // v3 utan ansikte (Sanna 2026-11-08); ansiktet ritas i kod
const GOSE = A + 'rekvisita/gosekanin/cut/gosekanin-v4.png';
const MUS = SB + 'mus-glad.png', MUS_UPP = SB + 'mus-upp.png';   // musen i v2, renderad ur premium/uttryck.html
const BETTAN = A + 'rekvisita/buss-rod/cut/buss-rod-v3.png';   // den röda v2-bussen, utan ansikte (Sanna 2026-11-08)
MATT[BETTAN] = 1429 / 878; MATT[APPLE] = 729 / 836;
const BULLE = SB + 'bulle-glad.png';   // v2-statister, stillbilder ur deras uttryck.html
const LUDDE = SB + 'ludde-glad.png';
const GURRA = SB + 'gurra-glad.png';
const CHILIBIL = SB + 'chilibil.png', CHILI = SB + 'chili.png';   // musens chilibil och chilin, urklipp ur assets/rekvisita/chilibil/ och chili/

const pynt = h => $('pynt').insertAdjacentHTML('beforeend', h);
const puff = (x, y, r) => pynt(`<g transform="translate(${x} ${y}) scale(${r})">
  <circle cx="-0.55" cy="0.2" r="0.7" fill="#fff" stroke="#d9d6cc" stroke-width="0.06"/>
  <circle cx="0.5" cy="0.15" r="0.75" fill="#fff" stroke="#d9d6cc" stroke-width="0.06"/>
  <circle cx="0" cy="-0.3" r="1" fill="#fff" stroke="#d9d6cc" stroke-width="0.06"/></g>`);
const ring = (x, y, r) => pynt(`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff" stroke-width="7" opacity="0.9"/>`);
const prick = (x, y, r, c = RÖD) => pynt(`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#fff" stroke-width="5"/>`);
const ballong = (x, y, r = 54) => pynt(`<g><path d="M${x} ${y + r * 1.25} q 18 60 -6 118" fill="none" stroke="#6b5b4a" stroke-width="5"/>
  <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.18}" fill="${RÖD}" stroke="#fff" stroke-width="10"/>
  <path d="M${x - 12} ${y + r * 1.15} h24 l-12 16Z" fill="${RÖD_M}"/>
  <ellipse cx="${x - r * 0.33}" cy="${y - r * 0.4}" rx="${r * 0.17}" ry="${r * 0.25}" fill="#fff" opacity="0.5"/></g>`);
const applet = (x, y, h = 86) => { pynt(`<image href="${APPLE}" x="${x - h / 2}" y="${y - h / 2}" width="${h}" height="${h}"/>`); appelAnsikte(x, y + 0.08 * h, 0.7 * h, 'le', 'pynt'); };
// Klistermärke: det vi hittat, i en vit ram med kritkant, som i 007:s refräng.
const klistermarke = (x, y, r, inre) => pynt(`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#e6e1d6" stroke-width="6"/>${inre(x, y, r)}</g>`);
const bild_i = (fil, x, y, h) => `<image href="${fil}" x="${x - h * (MATT[fil] || 1) / 2}" y="${y - h / 2}" width="${h * (MATT[fil] || 1)}" height="${h}"/>`;

// Refrängen (04a–04i): brandbilen kör över en äng med rosa himmel (assets/bakgrunder/angen-rosa), och bakom henne
// studsar en rad glada äpplen i takten. Ansiktet ritas i kod som figurernas (ovala ögon med glans, rosa kinder, leende,
// eller ett "o" när de tutar). Äpplet är applet-rott-v3, gjort utan ansikte för det här.
const ROSA_ANG = A + 'bakgrunder/angen-rosa/angen-rosa.png';   // Sannas platta, rosa himmel och grön äng
const AEPPLE = A + 'rekvisita/applet-rott/cut/applet-rott-v3.png', AEPPLE_K = 729 / 836;   // det nya äpplet utan ansikte (b/h)
function glattApple(x, botten, h, { mun = 'le', tryck = 1, lager = 'pynt' } = {}) {
  const top = botten - h, cy = top + 0.6 * h, e = 0.14 * h, w = h * AEPPLE_K;
  const munSvg = mun === 'o' ? `<ellipse cx="${x}" cy="${cy + 0.1 * h}" rx="${0.045 * h}" ry="${0.06 * h}" fill="#5a1a14"/>`
    : `<path d="M${x - 0.07 * h} ${cy + 0.07 * h} Q ${x} ${cy + 0.15 * h} ${x + 0.07 * h} ${cy + 0.07 * h}" fill="none" stroke="#3a1410" stroke-width="${0.022 * h}" stroke-linecap="round"/>`;
  lagg(lager, `<g transform="translate(${x} ${botten}) scale(${2 - tryck} ${tryck}) translate(${-x} ${-botten})">
    <image href="${AEPPLE}" x="${x - w / 2}" y="${top}" width="${w}" height="${h}"/>
    ${[-1, 1].map(k => `<ellipse cx="${x + k * 0.23 * h}" cy="${cy + 0.06 * h}" rx="${0.06 * h}" ry="${0.04 * h}" fill="#FF9DB0" opacity="0.85"/>
      <ellipse cx="${x + k * e}" cy="${cy - 0.03 * h}" rx="${0.036 * h}" ry="${0.052 * h}" fill="#1e1412"/>
      <circle cx="${x + k * e + 0.012 * h}" cy="${cy - 0.05 * h}" r="${0.012 * h}" fill="#fff"/>`).join('')}
    ${munSvg}</g>`);
}
// t = takt (slag), o = hur långt ängen rullat (px). Grästuvorna framför glider förbi, äpplena står kvar och studsar i en våg.
function angscen({ t = 0.5, o = 0, hopp = 50, mun = 'le', tryck = 0, applen = true } = {}) {
  platta(ROSA_ANG);
  if (applen) [1780, 1460, 1140, 780, 460, 140].forEach((x, i) => {
    const b = Math.abs(Math.sin(Math.PI * (t - i * 0.15)));
    glattApple(x, 860 - hopp * b, 230, { mun, lager: 'bakom', tryck: 1 - tryck * Math.max(0, 0.25 - b) / 0.25 * 0.12 });
  });
  const x = g => ((g + o) % 2240) - 160;
  sak('framfor', GRAS, x(330), 1090, 170); sak('framfor', GRAS, x(1300), 1090, 150); sak('framfor', GRAS, x(1900), 1090, 170);
}

// Backen på ängen ("Uppför backen!", 04b): en grön kulle i kod som stiger åt höger i bild, med en ljusare kant och några
// glada äpplen på toppen. backeKant(x) = kullens kant i kodens x (speglat: litet x = höger i bild).
const backeKant = x => 1010 - 440 * ease01((1750 - x) / 1450);
function ease01(k) { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); }
// Ett glatt ansikte på ett äpple som redan sitter i en bild (äppelträdets äpplen): a = äpplets bredd, mun 'le' eller 'o'.
const appelAnsikte = (cx, cy, a, mun = 'le', lager = 'bakom') => lagg(lager, `<g>${[-1, 1].map(k => `<ellipse cx="${cx + k * 0.27 * a}" cy="${cy + 0.12 * a}" rx="${0.11 * a}" ry="${0.07 * a}" fill="#FF9DB0" opacity="0.9"/>
  <ellipse cx="${cx + k * 0.16 * a}" cy="${cy - 0.02 * a}" rx="${0.055 * a}" ry="${0.08 * a}" fill="#1e1412"/>`).join('')}
  ${mun === 'o' ? `<ellipse cx="${cx}" cy="${cy + 0.15 * a}" rx="${0.06 * a}" ry="${0.08 * a}" fill="#5a1a14"/>`
    : `<path d="M${cx - 0.09 * a} ${cy + 0.1 * a} Q ${cx} ${cy + 0.2 * a} ${cx + 0.09 * a} ${cy + 0.1 * a}" fill="none" stroke="#3a1410" stroke-width="${0.035 * a}" stroke-linecap="round"/>`}</g>`);
// Äppelträdet (appeltrad-mork-tom.png, 566 × 755, kronan utan äpplen) med 3–4 glada äpplen i kod (Sanna: "only 3-4 apples per tree").
const TRADAPPLEN = [[170, 215], [390, 185], [275, 330], [445, 330]];
function appeltrad(x, botten, h, mun = 'le') {
  sak('bakom', ATRAD, x, botten, h);
  const k = h / 755, x0 = x - 566 * k / 2, y0 = botten - h, n = Math.round(x / 10) % 2 ? 3 : 4;
  // äpplena gungar lugnt i takten, lite olika i tid (Sanna: "more subtle")
  const slag = typeof TID === 'number' && typeof BEAT === 'number' ? TID / BEAT : 0;
  TRADAPPLEN.slice(0, n).forEach(([ax, ay], i) => { const v = Math.PI * (slag + i * 0.29), b = Math.abs(Math.sin(v)), ah = 115 * k;
    glattApple(x0 + ax * k + 2 * k * Math.sin(v), y0 + ay * k + 0.42 * ah - 5 * k * b, ah, { mun, lager: 'bakom', tryck: 1 - 0.04 * Math.max(0, 0.25 - b) / 0.25 }); });
}
// Kullen åt andra hållet, för "Nerför backen!": hög till vänster i bild, sluttar ner åt höger.
const nerKant = x => 1010 - 440 * ease01((x - 170) / 1450);
function backe({ t = 0.5, kf = backeKant, mun = 'le' } = {}) {
  let d = 'M 1920 1080';
  for (let x = 1920; x >= 0; x -= 40) d += ` L ${x} ${kf(x).toFixed(1)}`;
  [1650, 1250, 850, 450, 120].forEach((x, i) => appeltrad(x, kf(x) + 30, i % 2 ? 440 : 500, mun));   // äppelträd längs kullen, bakom bilen
  lagg('bakom', `<g filter="url(#boil)"><path d="${d} L 0 1080 Z" fill="#5FAE4E"/>
    <path d="${d.replace('M 1920 1080 L', 'M')}" fill="none" stroke="#86C96C" stroke-width="16" stroke-linecap="round"/></g>`);
}
// kaninens ansikte när bilen står på en kant (framhjulet på fx), för kameran
const ansiktePaKant = (fx, kf, k) => [fx + (KX - 718.5) * CS * k, kf(fx) + (KY - 344 - 1578) * CS * k];
// som paBacken, men på en valfri kant (kf): framhjulet på fx, bilen lutar med kanten
const paKant = (fx, kf, { k = 0.7, upp = 0, ...extra } = {}) => { const bx = fx + (1700.5 - 718.5) * CS * k, lut = Math.atan2(kf(bx) - kf(fx), bx - fx) * 180 / Math.PI;
  bil({ x: fx - CX - 718.5 * CS * k, y: kf(fx) - CY - 1578 * CS * k - upp, ...extra, lut, k }); };

// --- Platser ---------------------------------------------------------------------------------------------------
const TAPET = A + 'stiltest-premium/skogen-monster-mild-a.png';
const VÄG = A + 'stiltest-premium/vagen-teal.png';   // teal vägg, vit mark och en grå väg (vägen på y ca 875–1015)
const SKOGEN = A + 'bakgrunder/skogen-gron/skogen-gron-tom.png';
// Vägens mittlinje rör sig när bilen kör: den inbakade streckade linjen (y 940–951) täcks med vägens grå, och strecken ritas
// i kod och glider med marken (o = hur långt den rullat, som träden i körscenen).
const vagStreck = o => lagg('bakom', `<g filter="url(#boil)"><rect x="-20" y="936" width="1960" height="20" fill="rgb(203,199,188)"/>
  ${Array.from({ length: 16 }, (_, i) => `<rect x="${((i * 133 + o) % 2128) - 133}" y="940" width="70" height="11" rx="5.5" fill="#F7F5EF"/>`).join('')}</g>`);
const platta = (fil, glod = 0) => {
  $('platta').innerHTML = `<image href="${fil}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>` +
    (glod ? `<rect width="1920" height="1080" fill="${GLÖD}" opacity="${0.42 * glod}"/>` : '');
};
// Papperet som kritan ritar på
const papper = () => { $('platta').innerHTML = `<rect width="1920" height="1080" fill="#F6EFE3"/>
  <rect x="120" y="70" width="1680" height="940" rx="14" fill="#FDFBF4" stroke="#e8e0cf" stroke-width="6"/>`; };

// Äppelbacken (plats B, refrängen): plattan assets/bakgrunder/appelbacken/appelbacken.png.
// Backens kant (y för x, i bildens egna koordinater): 0:805 160:702 320:623 480:574 640:550 800:539 960:534
// 1120:538 1280:545 1440:557 1600:597 1760:671. Vita golvet börjar på y ca 972. Bilden speglas med scenen.
const BACKEN = A + 'bakgrunder/appelbacken/appelbacken-tva-kullar.png';
const ATRAD = A + 'bakgrunder/appelbacken-saker/cut/appeltrad-mork-tom.png';   // utan äpplen (de målade är borttagna); äpplena läggs i kod
MATT[ATRAD] = 566 / 755;
function appelbacke({ glod = 0, lut = 0 } = {}) {
  platta(BACKEN, glod);
  if (lut) $('platta').innerHTML = `<g transform="rotate(${lut} 960 1080) translate(960 1080) scale(1.15) translate(-960 -1080)">${$('platta').innerHTML}</g>`;
}
// Brandbilen på backen: framhjulet på x (scenens koordinater, före speglingen), båda hjulen på backens kant,
// lutningen följer backen. Scenen speglas, så låga x är backens högra sida i bild.
const KANT = [[0,810],[80,760],[160,722],[240,685],[320,658],[400,638],[480,622],[560,613],[640,612],[720,619],[800,638],[880,664],[960,680],[1040,687],[1120,680],[1200,656],[1280,630],[1360,613],[1440,605],[1520,607],[1600,621],[1680,644],[1760,679],[1840,710],[1920,732]];   // backens kant i appelbacken-tva-kullar
const kant = x => { for (let i = 1; i < KANT.length; i++) { const [x0, y0] = KANT[i - 1], [x1, y1] = KANT[i];
  if (x <= x1) return y0 + (y1 - y0) * (x - x0) / (x1 - x0); } return 805; };
// k: brandbilen är mindre på backen (0.6), så att den får plats ovanför toppen. puffar: vita puffar bakom bakhjulet.
const KB = 0.55;   // brandbilens storlek på backen, samma i hela refrängen
const paBacken = (fx, { k = 0.6, puffar = false, upp = 0, ...extra } = {}) => { const bx = fx + (1700.5 - 718.5) * CS * k, lut = Math.atan2(kant(bx) - kant(fx), bx - fx) * 180 / Math.PI;
  bil({ x: fx - CX - 718.5 * CS * k, y: kant(fx) - CY - 1578 * CS * k - upp, ...extra, lut: lut + (extra.lutExtra || 0), k });
  if (puffar) { puff(bx + 60, kant(bx + 60) - 20, 26); puff(bx + 140, kant(bx + 140) - 40, 18); } };
// kaninens ansikte i scenen när brandbilen står på backen (framhjulet på fx), för kameran
const ansiktePaBacken = (fx, k) => [fx + (KX - 718.5) * CS * k, kant(fx) + (KY - 344 - 1578) * CS * k];
// en rad små äppelträd långt bak på toppen, och mållinjen: vita rutor tvärs över backens kant
const radTrad = () => [480, 700, 1360, 1560].forEach(x => atrad(x, kant(x) + 12, 190));
// kameran följer brandbilen (framhjulet på fx): zoom, och hur mycket över bilens mitt den siktar
const folj = (fx, zoom, hojd = 160) => kamera(zoom, 1920 - (fx + 491 * CS * KB), kant(fx) - hojd);
const malinje = x => { for (let i = 0; i < 6; i++) pynt(`<rect x="${x - 14}" y="${kant(x) - 150 + i * 28}" width="28" height="28" fill="${i % 2 ? '#3a3a3a' : '#fff'}"/>`);
  pynt(`<rect x="${x - 18}" y="${kant(x) - 160}" width="4" height="190" fill="#fff"/>`); };
// ett äppelträd: urklippet med äpplena i kronan
function atrad(x, botten, h, { lut = 0 } = {}) {
  sak('bakom', ATRAD, x, botten, h, `rotate(${lut} ${x} ${botten})`);
}
// slangen: från brandbilens bakdel ner till musens tassar, och vattnet som en mjuk båge
const chilibil = (x, H = 340) => { const w = H * MATT[CHILIBIL]; mus(x - 0.12 * w, 1010 - H * 0.78, H * 0.62); sak('framfor', CHILIBIL, x, 1010, H); };
const slang = (fran, till) => pynt(`<path d="M${fran[0]} ${fran[1]} Q ${(fran[0] + till[0]) / 2} 1060 ${till[0]} ${till[1]}" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round"/>
  <path d="M${fran[0]} ${fran[1]} Q ${(fran[0] + till[0]) / 2} 1060 ${till[0]} ${till[1]}" fill="none" stroke="${GRÅ}" stroke-width="16" stroke-linecap="round"/>`);
const vatten = (fran, till, topp) => pynt(`<path d="M${fran[0]} ${fran[1]} Q ${(fran[0] + till[0]) / 2} ${topp} ${till[0]} ${till[1]}" fill="none" stroke="#fff" stroke-width="40" stroke-linecap="round" opacity="0.9"/>
  <path d="M${fran[0]} ${fran[1]} Q ${(fran[0] + till[0]) / 2} ${topp} ${till[0]} ${till[1]}" fill="none" stroke="#8CC8EE" stroke-width="24" stroke-linecap="round"/>`);
const droppar = (x0, x1, y0, y1, n = 18) => { for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * ((i * 37) % n) / n, y = y0 + (y1 - y0) * ((i * 53) % n) / n;
  pynt(`<ellipse cx="${x}" cy="${y}" rx="11" ry="17" fill="#8CC8EE" stroke="#fff" stroke-width="5"/>`); } };
const rosiga = () => pynt(`<ellipse cx="1150" cy="392" rx="30" ry="18" fill="#F07A7A" opacity="0.7"/><ellipse cx="1262" cy="392" rx="30" ry="18" fill="#F07A7A" opacity="0.7"/>`);

// --- Rallyt bland träden (refrängen) ----------------------------------------------------------------------------
// Plats A, teal-tapeten. Brandbilen kör åt vänster och hindren kommer från vänster. Det som har passerats blir rött.
const BRUN = '#8A5A3B';
const lagg = (lager, h) => $(lager).insertAdjacentHTML('beforeend', h);
function rally({ glod = 0 } = {}) {
  platta(TAPET, glod);
  if (glod) lagg('bakom', `<rect y="905" width="1920" height="175" fill="${RÖD}" opacity="${0.35 * glod}"/>`);
}
// ett träd; lut = lutar sig åt sidan, rod = kronan har rodnat
function rtrad(x, botten, h, { lut = 0, rod = 0 } = {}) {
  const g = sak('bakom', TRAD, x, botten, h, `rotate(${lut} ${x} ${botten})`);
  if (rod) lagg('bakom', `<ellipse cx="${x}" cy="${botten - h * 0.68}" rx="${h * 0.29}" ry="${h * 0.27}" fill="#E2553A" opacity="${0.82 * rod}" transform="rotate(${lut} ${x} ${botten})"/>`);
}
const pol = (x, y, { rod = 0, stank = 0 } = {}) => {
  lagg('bakom', `<ellipse cx="${x}" cy="${y}" rx="250" ry="50" fill="#8CC8EE" stroke="#fff" stroke-width="12"/>`);
  for (let i = 0; i < stank; i++) lagg('pynt', `<ellipse cx="${x - 90 + 180 * i}" cy="${y - 170 - 50 * i}" rx="40" ry="54" fill="${rod ? RÖD : '#8CC8EE'}" stroke="#fff" stroke-width="7"/>`);
};
const stubbe = (x, botten, { rod = 0 } = {}) => lagg('bakom', `<g stroke="#fff" stroke-width="10">
  <rect x="${x - 110}" y="${botten - 190}" width="220" height="190" rx="20" fill="${rod ? RÖD : BRUN}"/>
  <ellipse cx="${x}" cy="${botten - 190}" rx="110" ry="34" fill="${rod ? '#F08A6E' : '#C9925F'}"/></g>`);
const gren = (y, { rod = 0 } = {}) => lagg('pynt', `<g><path d="M-40 ${y - 60} Q 500 ${y - 10} 980 ${y + 20}" fill="none" stroke="#fff" stroke-width="58" stroke-linecap="round"/>
  <path d="M-40 ${y - 60} Q 500 ${y - 10} 980 ${y + 20}" fill="none" stroke="${rod ? RÖD : BRUN}" stroke-width="40" stroke-linecap="round"/>
  ${[260, 520, 800].map(x => `<ellipse cx="${x}" cy="${y + 4}" rx="44" ry="26" fill="${rod ? '#F08A6E' : GRÖN}" stroke="#fff" stroke-width="7"/>`).join('')}</g>`);
// den ihåliga stocken (urklippet ur Skogen grön), stor, med mörkret i öppningen
const ihalig = (x, botten, h) => sak('framfor', SKOG + 'stock.png', x, botten, h);
// äppelsvepet: ett stort rött äpple rullar över bilden och byter den bakom sig
const appelsvep = () => {};   // Sanna 2026-11-08: inget äppelsvep längre, scenerna klipps rakt
// Rött kritsvep vid platsbytena (Sanna 2026-11-08: "red cray on big red apple"), i skärmens koordinater i #ram.
// k 0→0,5: den röda kritan sicksackar från vänster till höger och färglägger bilden röd bakom sig; vid 0,5 är allt rött och
// ett stort glatt äpple ploppar upp i mitten. k 0,5→1: det röda glider undan åt höger och äpplet skuttar ut med kanten.
function rodsvep(k, apple = true) {   // apple = false: bara kritan och det röda, inget äpple (kritan ritar → vägen, 2026-11-09)
  if (k <= 0 || k >= 1) return;
  const ut = k > 0.5, u = ut ? (k - 0.5) * 2 : k * 2, E = lerp(-260, 2200, ut ? u * u : 1 - (1 - u) * (1 - u));
  const kant = []; for (let y = -120; y <= 1200; y += 60) kant.push([E + 46 * Math.sin(y * 0.012 + k * 7) + 22 * Math.sin(y * 0.041), y]);
  const yta = ut ? `M2400 -200 L${kant.map(p => p.join(' ')).join(' L')} L2400 1300Z` : `M-400 -200 L${kant.map(p => p.join(' ')).join(' L')} L-400 1300Z`;
  // vaxdrag som ett barns klotter: ojämna avstånd, bredder och lutning (samma varje bild)
  const drag = (n, v, f) => Array.from({ length: n }, (_, i) => { const x = i * (2700 / n) - 420 + 40 * Math.sin(i * 2.7 + f), w = 14 + 22 * Math.abs(Math.sin(i * 1.9 + f)),
    o = 0.12 + 0.16 * Math.abs(Math.sin(i * 3.1 + f)), b = 30 * Math.sin(i * 1.3 + f);
    return `<path d="M${x.toFixed(0)} -100 Q${(x + v / 2 + b).toFixed(0)} 540 ${(x + v).toFixed(0)} 1180" stroke-width="${w.toFixed(0)}" opacity="${o.toFixed(2)}"/>`; }).join('');
  let h = `<clipPath id="rodsvep-yta"><path d="${yta}"/></clipPath><g filter="url(#boil)"><g clip-path="url(#rodsvep-yta)">
    <rect x="-400" y="-200" width="2800" height="1500" fill="${RÖD}"/>
    <g fill="none" stroke="${RÖD_M}" stroke-linecap="round">${drag(22, 340, 0)}</g>
    <g fill="none" stroke="#F07A58" stroke-linecap="round">${drag(17, -260, 5)}</g></g>
    <path d="${yta}" fill="none" stroke="#fff" stroke-width="10" opacity="0.55"/></g>`;
  if (!ut) {   // kritan vid kanten, sicksack upp och ner
    const y = 540 + 400 * Math.sin(k * Math.PI * 9), v = 28 + 10 * Math.cos(k * Math.PI * 9);
    h += `<g filter="url(#boil)" transform="translate(${E} ${y}) rotate(${v}) scale(2.8)">
      <path d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z" fill="${RÖD}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${RÖD_M}"/></g>`;
  }
  lagg('ram', h);
  // äpplet: ploppar upp i mitten när allt är rött, skuttar sedan ut åt höger med kanten
  const p = ut ? 1 : kl01((k - 0.4) / 0.1);
  if (apple && p > 0) {
    const x = ut ? Math.max(960, E + 380) : 960, hopp = ut ? 90 * Math.abs(Math.sin(Math.PI * u * 2.5)) : 0;
    const s = ut ? 1 : 1.08 * ease(p) - 0.08 * ease(kl01(p * 2 - 1));
    if (x < 2400) glattApple(x, 860 - hopp, 600 * s, { lager: 'ram', tryck: 1 - 0.05 * Math.max(0, 0.3 - hopp / 90) / 0.3 });
  }
}
// Discot i danspausen, som 014:s: 006:s discoplatta omfärgad till rött (Sanna: "mer rött, mindre rosa"; de rosa är disco-rod-rosa.png) med rutigt golv och en röd kula
// (disco-rod.png och discokula-rod.png, gjorda som 014:s mint_discot()), mjuka ljuskäglor från kulan, musiknoter som gungar
// uppe till höger och raden av det vi hittat i en båge överst (ikoner = hur många som syns, ny = 0–1 för den senaste som slås upp).
// Koordinaterna nedan är bildens (skärmens); scenen är speglad, så x vänds med 1920 − x.
const DISCO = SB + 'disco-rod.png', KULA = SB + 'discokula-rod.png';
const SPEG = x => 1920 - x;
const IKONER = [(x, y, r) => bild_i(BILE, x - 8, y + 10, r * 2.6), (x, y, r) => bild_i(BETTAN, x, y, r * 1.6), (x, y) => `<g>${ballong_i(x, y - 14, 38)}</g>`,
  (x, y, r) => bild_i(CHILI, x, y, r * 1.6), (x, y, r) => bild_i(APPLE, x, y, r * 1.5)];
const IKON_X = [250, 470, 690, 1230, 1450];   // två på varje sida om kulan, och äpplet; bågen sjunker mot kanterna som 014:s
const ikonPlats = i => [IKON_X[i], 120 + 0.00022 * (IKON_X[i] - 960) ** 2];
function disco({ s = 0, ikoner = 0, ny = 1 } = {}) {
  const TAKT = 0.5, gung = Math.sin(s / TAKT * Math.PI);   // 120 bpm
  const kagla = v => { const r = v * Math.PI / 180, L = 1300, b = 0.16;
    return `M960 170 L${960 + L * Math.sin(r - b)} ${170 + L * Math.cos(r - b)} L${960 + L * Math.sin(r + b)} ${170 + L * Math.cos(r + b)}Z`; };
  $('platta').innerHTML = `<image href="${DISCO}" width="1920" height="1080"/>
    <g opacity="${(0.22 + 0.06 * gung).toFixed(3)}" filter="url(#mjuk)">${[-50, -18, 18, 50].map((v, i) => `<path d="${kagla(v + 6 * Math.sin(s * 0.7 + i))}" fill="#FFF4F0"/>`).join('')}</g>
    ${[[520, 840, 150], [1000, 920, 180], [1450, 820, 140]].map(([x, y, r], i) => `<ellipse cx="${x + 120 * Math.sin(s * 0.5 + i * 2)}" cy="${y}" rx="${r}" ry="${r * 0.3}" fill="${['#FFF0B0', '#FFFFFF', '#FFE0A8'][(i + Math.floor(s / TAKT / 4)) % 3]}" opacity="0.35" filter="url(#mjuk)"/>`).join('')}
    <g transform="rotate(${(2 * Math.sin(s * 1.2)).toFixed(2)} 960 0)"><image href="${KULA}" x="${960 - 132}" y="-10" width="264" height="${264 * 824 / 632}"/></g>`;
  // noterna (skärmens övre högra hörn), gungar på slaget
  const not = (x, y, k, dubbel) => `<g transform="translate(${SPEG(x)} ${y - 10 * gung}) rotate(${-8 * gung}) scale(${-k} ${k})" fill="#B0414A" stroke="#B0414A" stroke-width="7" stroke-linecap="round">
    ${(dubbel ? [0, 44] : [0]).map(dx => `<ellipse cx="${dx}" cy="0" rx="14" ry="10" transform="rotate(-22 ${dx} 0)" stroke="none"/><path d="M${dx + 12} -4V-64" fill="none"/>`).join('')}
    <path d="${dubbel ? 'M12 -64L56 -72' : 'M12 -64Q16 -48 34 -42'}" fill="none"/></g>`;
  pynt(not(1700, 330, 1.2) + not(1820, 470, 0.9, true) + not(1640, 560, 0.85));
  // raden överst: vita kritskivor med det vi hittat; den senaste slås upp och studsar till
  for (let i = 0; i < ikoner; i++) {
    const [x, y] = ikonPlats(i), k = i === ikoner - 1 ? ny : 1, st = k < 1 ? k * k * (3 - 2 * k) * (1 + 0.25 * Math.sin(Math.PI * k)) : 1;
    if (st <= 0) continue;
    pynt(`<g transform="translate(${SPEG(x)} ${y}) scale(${st.toFixed(3)}) translate(${-SPEG(x)} ${-y})">
      <circle cx="${SPEG(x) + 4}" cy="${y + 8}" r="70" fill="#7a2a30" opacity="0.2" filter="url(#mjuk)"/>
      <circle cx="${SPEG(x)}" cy="${y}" r="70" fill="#fff"/><circle cx="${SPEG(x)}" cy="${y}" r="59" fill="#FCE4E2"/>
      ${IKONER[i](SPEG(x), y, 64)}</g>`);
  }
}

// --- Titelkort och kritiris -------------------------------------------------------------------------------------
function titelkort() {
  $('platta').innerHTML = `<rect width="1920" height="1080" fill="#A8DCF2"/><rect y="760" width="1920" height="320" fill="${GOLV}"/>`;
  $('ram').innerHTML = `<text x="960" y="300" text-anchor="middle" font-family="Fredoka, 'Arial Rounded MT Bold', system-ui" font-size="74" fill="#5a3b2e">Avsnitt 13</text>
    <text x="960" y="430" text-anchor="middle" font-family="Fredoka, 'Arial Rounded MT Bold', system-ui" font-size="124" fill="${RÖD}">Röda sången</text>`;
}
// Kritirisen som i 014: en vinglig cirkel med nio bucklor runt (cx, cy) i bilden, svart utanför, krämvit kritkant, och en
// stjärna som glimtar vid kanten (glimt 0–1) och glider in mot mitten när irisen stängs (in 0–1).
function kritiris(r, cx = 960, cy = 540, { t = 0, glimt = 0, in: inn = 0 } = {}) {
  if (r >= 1400) return;
  const ring = 'M' + Array.from({ length: 145 }, (_, j) => { const a = j / 144 * 2 * Math.PI, rr = r * (1 + 0.07 * Math.sin(9 * a + t * 0.8));
    return `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join('L') + 'Z';
  const sx = cx + 110 * (1 - inn), sy = cy - 120 * (1 - inn), sk = (18 + 22 * inn) * glimt;
  $('ram').innerHTML = `<path d="M-50 -50H1970V1130H-50Z ${r > 1 ? ring : ''}" fill="#101010" fill-rule="evenodd"/>
    ${r > 1 ? `<path d="${ring}" fill="none" stroke="#fff8e0" stroke-width="${Math.min(14, r / 4)}" stroke-linejoin="round" filter="url(#boil)"/>` : ''}
    ${glimt > 0 ? `<path d="M0 -1 L.16 -.16 L1 0 L.16 .16 L0 1 L-.16 .16 L-1 0 L-.16 -.16Z" fill="#fff8e0" transform="translate(${sx} ${sy}) rotate(${20 * t}) scale(${sk})"/>` : ''}`;
}

// --- Kameran ------------------------------------------------------------------------------------------------------
// zoom 1 = hela plattan, 2 = v2:s närbild. cx/cy är den punkt som hamnar mitt i bilden.
const kamera = (zoom = 1, cx = 960, cy = 540) => {
  // Kameran visar aldrig utanför bakgrunden (art direction v2), så förflyttningen klipps mot plattans kanter.
  const tx = zoom > 1 ? kl(1920 - 1920 * zoom, 0, 960 - cx * zoom) : 960 - 960 * zoom;
  const ty = zoom > 1 ? kl(1080 - 1080 * zoom, 0, 540 - cy * zoom) : 540 - 540 * zoom;
  $('kamera').setAttribute('transform', `translate(${tx} ${ty}) scale(${zoom})`);
};
// Närbild på kaninen i bilen: hennes ansikte ligger på ca (1204, 351) i scenen, öronen ovanför.
const narbild = () => kamera(1.8, 950, 460);

// --- Standarduppställningar ----------------------------------------------------------------------------------------
function bil({ x = 0, y = 0, lut = 0, k = 1, stegvinkel = -10, blaljus = 0, lampa = 0, synlig = true, gose = false } = {}) {
  // hjulen snurrar: rullsträckan = bilens x minus hur långt marken har glidit (SCROLL, sätts av körscenen/ängen)
  const vrid = (x - SCROLL) / (205 * CS * k) * 180 / Math.PI;
  for (const [id, hx, hy] of [['hjul-fram', 718.5, 1377], ['hjul-bak', 1700.5, 1383]]) $(id).innerHTML = `<g transform="rotate(${vrid.toFixed(1)} ${hx} ${hy})">
    ${[0, 90, 180, 270].map(v => `<circle cx="${hx + 58 * Math.cos(v * Math.PI / 180)}" cy="${hy + 58 * Math.sin(v * Math.PI / 180)}" r="12" fill="#6b6660"/>`).join('')}
    <path d="M${hx + 150} ${hy} A150 150 0 0 1 ${hx + 75} ${hy + 130}" fill="none" stroke="#8f8a84" stroke-width="16" stroke-linecap="round" opacity="0.8"/></g>`;
  $('bil').setAttribute('opacity', synlig ? 1 : 0);
  $('bil').setAttribute('transform', `translate(${CX + x} ${CY + y}) scale(${CS * k}) rotate(${lut} 718 1573)`);
  $('stege-lager').innerHTML = stegvinkel > 0 ? stege(STEGE_UPP, STEGE_L) : stege(STEGE_NER, STEGE_KORT);   // inskjuten när den är hopfälld
  $('blaljus').setAttribute('opacity', Math.min(1, blaljus));   // över 1 = större sken ("iii-ooo!" i versen)
  $('blaljus').querySelectorAll('circle').forEach((c, i) => c.setAttribute('r', (i < 2 ? 150 : 46) * Math.max(1, blaljus)));
  $('lampa').setAttribute('opacity', lampa);
  // gosekaninen: fastspänd bak på kåpan, bakom kaninen och bakom stegen
  $('gose').innerHTML = gose ? `<image href="${GOSE}" x="1980" y="250" width="255" height="520"/>` : '';
}
// Körscenen: teal-väggen med vägen, träd och en buske på den vita kanten ovanför vägen, två grästuvor framför.
// Hjulen går på vägen.
function korscen({ glod = 0 } = {}) {
  platta(VÄG, glod);
  sak('bakom', TRAD, 300, 868, 640); sak('bakom', BUSKE, 1180, 866, 180); sak('bakom', TRAD, 1720, 868, 640);
  sak('framfor', GRAS, 330, 1090, 180); sak('framfor', GRAS, 1620, 1090, 180, 'scale(-1 1) translate(-3240 0)');
}
// Skogen grön: väggen utan träd, trädet som bär äpplet som urklipp, svamp/sten/stock i förgrunden.
function skogsscen({ applehojd = 170 } = {}) {
  platta(SKOGEN);
  sak('bakom', TRAD, 1000, 980, 900);                // trädet står bakom bilen, kronan högt över den
  applet(1106, applehojd, 96);                       // det finaste äpplet, högst upp i kronan
  sak('bakom', BUSKE, 380, 965, 200);
  sak('framfor', SKOG + 'stock.png', 250, 1075, 160);
  sak('framfor', SKOG + 'svamp.png', 1800, 1065, 200);
  sak('framfor', SKOG + 'sten.png', 640, 1085, 120);
}
// Bilen parkerad framför trädet, hela bilen i bild. Stegens vridpunkt hamnar då på ca (1889, 616) i scenen,
// och uppfälld stannar spetsen strax under äpplet på (1106, 170).
const PARKERAD = { x: 460, y: 0 };
const mus = (x, y, h = 120, fil = MUS) => sak('framfor', fil, x, y + h / 2, h);
// Danspausen: fyra djur lika stora. Björnen (stampar), lammet (viftar), grodan (hoppar) och musen (klappar).
// Den som gör radens rörelse lyfts med ett värde i px. Kaninen är inte med i dansen (hon kommer i brandbilen på "Hej då").
const dansare = ({ hulda = 0, hugo = 0, gurra = 0, musen = 0, musUpp = false } = {}) => {
  kanin({ synlig: false });
  sak('framfor', BULLE, 300, 985 + hulda, 380); sak('framfor', LUDDE, 740, 985 + hugo, 360);
  sak('framfor', GURRA, 1180, 985 + gurra, 380); mus(1620, 985 - 200 + musen, 400, musUpp ? MUS_UPP : MUS);
};


// Små hjälpare som bilderna ovan använder
function kritan(x, y) { pynt(`<g transform="translate(${x} ${y}) rotate(18)">
  <rect x="-26" y="-230" width="52" height="230" rx="8" fill="${RÖD}" stroke="#fff" stroke-width="8"/>
  <path d="M-26 0 L0 52 L26 0Z" fill="${RÖD_M}" stroke="#fff" stroke-width="8"/></g>`); }
// Kritans teckning i 01: ett rött äpple i tre drag, lätt att gissa. Först den runda kroppen (skrrrrt),
// sedan skaftet och bladet ("vad kan det vara?"), och på "Ett äpple!" gungar det till.
function ritat_apple({ skaft = 0, blad = 0, gung = 0 }) {
  pynt(`<g transform="rotate(${gung ? -4 : 0} 960 700) translate(0 ${gung ? -14 : 0})">
    ${skaft ? `<path d="M962 340 Q 966 290 984 252" fill="none" stroke="#fff" stroke-width="40" stroke-linecap="round"/>
       <path d="M962 340 Q 966 290 984 252" fill="none" stroke="#7a5236" stroke-width="20" stroke-linecap="round"/>` : ''}
    ${blad ? `<path d="M990 300 Q 1050 230 1120 262 Q 1060 330 990 300 Z" fill="${GRÖN}" stroke="#fff" stroke-width="12"/>` : ''}
    <path d="M960 340 C 1060 280 1230 330 1230 500 C 1230 660 1090 730 1020 706 C 990 696 930 696 900 706 C 830 730 690 660 690 500 C 690 330 860 280 960 340 Z" fill="${RÖD}" stroke="#fff" stroke-width="12"/>
  </g>`);
}
function fart() { }    // fartstreck används inte (format/regler.md: effektstreck togs bort efter 005)
function tar() { pynt(`<ellipse cx="1245" cy="648" rx="12" ry="17" fill="#8fd0ef" stroke="#fff" stroke-width="4"/>`); }
const ballong_i = (x, y, r) => `<path d="M${x} ${y + r * 1.25} q 14 40 -4 76" fill="none" stroke="#6b5b4a" stroke-width="4"/>
  <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.18}" fill="${RÖD}" stroke="#fff" stroke-width="7"/>`;

// --- Rendering -----------------------------------------------------------------------------------------------------
// Alla urklipp hämtas en gång vid start, så att de ligger i cachen när en bild ritas. Annars hinner
// stills.mjs fotografera innan bilderna laddats, och rutan blir tom.
[...Object.keys(MATT), DISCO, KULA, ROSA_ANG, AEPPLE, TAPET, VÄG, CHILIBIL, CHILI, SKOGEN, APPLE, GOSE, MUS,
 BILE,
 ...['body-tom', 'mage', 'nos', 'ear-l', 'ear-r', 'arm-l', 'arm-r', 'leg-l', 'leg-r', 'tail']
   .map(n => A + `karaktarer/kaninen-kanel/premium/cut/kanel-${n}.png`)].forEach(u => { new Image().src = u; });

