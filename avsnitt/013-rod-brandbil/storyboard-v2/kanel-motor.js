// GENERERAD av bygg.mjs ur assets/karaktarer/kaninen-kanel/premium/uttryck.html. Ändra inte här.
// Ändra i uttryck.html och kör bygg.mjs igen, så följer storyboarden figuren.
const BAS = window.KANEL_BAS || '../../../assets/karaktarer/kaninen-kanel/premium/cut/';
const mjuk = k => k * k * (3 - 2 * k);
const RIGG = { 'arm-l': [212, 567], 'arm-r': [799, 566], 'leg-l': [435, 839], 'leg-r': [601, 835],
               'ear-l': [350, 300], 'ear-r': [675, 305], 'tail': [739, 741] };
const OGON = [[419, 401], [600, 400]], KINDER = [[383, 452], [636, 451]], FOTTER = 947;
const LINJE = '#2a1d1a', MUNLINJE = '#3a2a22', MUNFARG = '#7a2a1c', KIND = '#ec8f96';

// Alla uttryck har samma parametrar, så att de går att blanda. Det som inte anges är neutralt.
// ogonS [sx, sy] ögonens storlek · titt [x, y] blickriktning · ogonY ögon och bryn upp (−) / ner (+)
// glad [v, h] öga → ^-båge (0–1) · lock [v, h] ögonlock ner (0–1) · bryn synlighet · brynY [v, h] höjd · brynV inre änden upp (grader)
// kind kindernas styrka · le leendet 1 … −1 (lite surt) · leBred bredd · leX munnen åt sidan · streck munlinjernas synlighet
// mun [rx, ry, d, cy] öppen mun (d 0 = rund, 1 = platt överkant) · oron [v, h] öronen hänger (+) / spetsas (−) i grader
// armar [v, h] armarna upp (+) / ner (−) i grader, vila 8 · luta hela figuren i grader · strack kroppen sträcks (+) / sjunker (−)
const NEUTRAL = { ogonS: [1, 1], titt: [0, 0], ogonY: 0, glad: [0, 0], lock: [0, 0], bryn: 0, brynY: [0, 0], brynV: 0,
  kind: 0.75, le: 1, leBred: 1, leX: 0, streck: 1, mun: [0, 0, 0, 462], oron: [0, 0], armar: [8, 8], luta: 0, strack: 1 };

const UTTRYCK = {
  neutral:   { namn: 'neutral' },
  glad:      { namn: 'glad', kind: 1, le: 1.3, leBred: 1.15, ogonY: -2, oron: [-4, -4], armar: [16, 16] },
  jatteglad: { namn: 'jätteglad', glad: [1, 1], kind: 1, streck: 0, mun: [22, 20, 1, 456], oron: [-8, -8], armar: [40, 40], strack: 1.03 },
  forvanad:  { namn: 'förvånad', ogonS: [1.2, 1.16], bryn: 1, brynY: [-12, -12], kind: 0.6, streck: 0, mun: [9, 11, 0, 466],
               oron: [-9, -9], armar: [22, 22], strack: 1.04 },
  nyfiken:   { namn: 'nyfiken', titt: [11, -2], bryn: 0.9, brynY: [0, -8], le: 0.6, leBred: 0.8, leX: 4, oron: [-2, 10], luta: 5 },
  tanker:    { namn: 'tänker', titt: [-7, -12], bryn: 0.9, brynY: [-9, 0], le: 0.4, leBred: 0.55, leX: 10, oron: [6, -2], luta: -3 },
  ledsen:    { namn: 'lite ledsen', titt: [0, 4], ogonS: [0.95, 0.95], bryn: 1, brynY: [4, 4], brynV: 24,
               kind: 0.55, le: -0.7, leBred: 0.75, oron: [24, 24], armar: [-4, -4], luta: 2, strack: 0.97 },
  somnig:    { namn: 'sömnig', titt: [0, 3], lock: [0.66, 0.66], kind: 0.7, streck: 0, mun: [10, 13, 0, 468],
               oron: [16, 16], armar: [2, 2], luta: 3, strack: 0.97 },
  fnissig:   { namn: 'fnissig', glad: [1, 1], kind: 1, streck: 0, mun: [10, 9, 1, 456], leX: 3, oron: [-4, 8], armar: [24, 24], luta: 4, strack: 0.98 },
  blinkar:   { namn: 'blinkar', glad: [0, 1], kind: 1, le: 1.3, leBred: 1.1, leX: 5, oron: [0, -6], armar: [8, 30], luta: -3 },
  stolt:     { namn: 'stolt', glad: [1, 1], ogonY: -8, kind: 1, le: 1.2, leBred: 1.1, oron: [-6, -6], armar: [-8, -8], strack: 1.04 },
};
// ponytail: fnissig har ingen hand för munnen, armarna når inte dit (ca 115 px långa, munnen 300 px bort). Axlarna dras upp i stället.

// Poser: kropp, armar, ben och öron. De läggs ovanpå uttrycket, så pose('hurra') + ansikte('jatteglad') går ihop.
// luta hela figuren (grader, kring fötterna) · rikt −1 … 1 riktningspose åt vänster/höger (ansiktet glider dit, öronen lutar,
// båda armarna ut på den sidan, se rita) · upp −1 … 1 tittar upp/ner (ansiktet flyttas) · bred kroppens bredd (+/−) · strack kroppens
// höjd (+/−) · sank kroppen ner (+) / upp (−) i px · armar [v, h] upp (+) i grader, läggs till uttryckets · fram [v, h] armen
// framför kroppen (0/1) · benFram benen framför kroppen (0/1) · oron [v, h] hänger (+) i grader · ben [v, h] utåt (+) i grader · benY [v, h] foten upp (−) i px · benS [v, h] benet längre (+)
// lyft hela figuren upp (−) i px, skuggan krymper · svans svansens vinkel i grader · x hela figuren åt sidan i px
const POSE0 = { luta: 0, rikt: 0, upp: 0, bred: 0, strack: 0, sank: 0, armar: [0, 0], fram: [0, 0], oron: [0, 0],
  benFram: 0, ben: [0, 0], benY: [0, 0], benS: [0, 0], lyft: 0, svans: 0, x: 0, klapp: 0, gang: 0, sving: 0 };
const POSER = {
  neutral:   { namn: 'neutral' },
  lutaV:     { namn: 'lutar vänster', luta: -5, oron: [-4, 4] },
  lutaH:     { namn: 'lutar höger', luta: 5, oron: [4, -4] },
  vanster:   { namn: 'riktning vänster', rikt: -1 },
  hoger:     { namn: 'riktning höger', rikt: 1 },
  haller:    { namn: 'håller fram', rikt: -1, armar: [25, 0] },
  nar:       { namn: 'sträcker sig efter', rikt: 1, armar: [0, 55], luta: 3, strack: 0.03, upp: 0.4, oron: [-4, -4] },
  upp:       { namn: 'tittar upp', upp: 1, strack: 0.02, oron: [-4, -4] },
  ner:       { namn: 'tittar ner', upp: -1, strack: -0.02, oron: [6, 6] },
  pekar:     { namn: 'pekar', armar: [0, 32], luta: 3 },
  hurra:     { namn: 'hurra', armar: [70, 70], strack: 0.03, oron: [-6, -6] },
  magen:     { namn: 'händer på magen', armar: [-124, -124], fram: [1, 1] },
  blyg:      { namn: 'blyg', armar: [-25, -25], bred: -0.03, strack: -0.03, luta: -4, upp: -0.4, oron: [8, 4] },
  sitter:    { namn: 'sitter', ben: [40, 40], benY: [-40, -40], sank: 48, bred: 0.03, armar: [6, 6] },
  strack:    { namn: 'sträcker på sig', strack: 0.04, sank: -6, benS: [0.06, 0.06], armar: [30, 30], oron: [-5, -5] },
  huka:      { namn: 'hukar (före hopp)', strack: -0.08, bred: 0.05, ben: [6, 6], armar: [-10, -10], oron: [6, 6] },
  stampar:   { namn: 'stampar', ben: [0, 8], benY: [0, -16], luta: -2 },
  lyssnar:   { namn: 'lyssnar', luta: 6, oron: [-6, 14] },
};
// ponytail: armar och ben byter lager (bakom/framför kroppen) vid fram 0,5. Ett hopp i lagren, men armen är gömd bakom kroppen just då.

const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => mix(v, b[i], k)) : a + (b - a) * k;
const fyll = (N, T, u) => typeof u === 'string' ? { ...N, ...T[u] } : { ...N, ...u };
const blandare = (N, T) => (a, b, k) => { const A = fyll(N, T, a), B = fyll(N, T, b), ut = {};
  for (const n in N) ut[n] = mix(A[n], B[n], Math.max(0, Math.min(1, k))); return ut; };
// Blanda två uttryck eller två poser (namn eller parameterobjekt), k 0 = a, 1 = b.
const blanda = blandare(NEUTRAL, UTTRYCK), blandaPose = blandare(POSE0, POSER), param = u => fyll(NEUTRAL, UTTRYCK, u);

function figur(x, y, skala) {                 // en Kanel med fötterna i (x, y)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), id = document.querySelectorAll('#figurer > g').length;
  // Öronroten nedanför y 308 ligger alltid under huvudet: klipps bort, så att den inte syns som en vit kant när huvudet trycks ihop.
  const del = (n, fil = n) => `<image class="${n}" href="${BAS}kanel-${fil}.png" width="1024" height="1024"${n.startsWith('ear') ? ' clip-path="url(#orrot)"' : ''}/>`;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${skala}) translate(-512 ${-FOTTER})`);
  // arm-l2/arm-r2: kopior av armarna för riktningsposen (båda armarna ut på samma sida, den ena under den andra).
  g.innerHTML = `<ellipse class="skugga" cx="512" cy="${FOTTER - 30}" rx="300" ry="34" fill="#000" opacity="0.1"/>
    <g class="kanel">${['ear-l', 'ear-r', 'tail', 'leg-l', 'leg-r'].map(n => del(n)).join('')}
    ${del('arm-l2', 'arm-l')}${del('arm-r2', 'arm-r')}${del('arm-l')}${del('arm-r')}
    <g class="kropp"><image href="${BAS}kanel-body-tom.png" width="1024" height="1024"/>
    <image class="mage" href="${BAS}kanel-mage.png" width="1024" height="1024"/>
    <g class="drag"><image href="${BAS}kanel-nos.png" width="1024" height="1024"/>
    ${KINDER.map(([x, y]) => `<ellipse class="kind" cx="${x}" cy="${y}" rx="30" ry="18" fill="${KIND}"/>`).join('')}
    ${OGON.map((_, i) => `<g class="oga">
      <clipPath id="lock-${id}-${i}"><path class="lockklipp" d="M-40 -26 H40 V60 H-40Z"/></clipPath>
      <g clip-path="url(#lock-${id}-${i})"><ellipse rx="17" ry="25" fill="${LINJE}"/><circle cx="-6" cy="-10" r="6" fill="#fff"/></g>
      <path class="lock" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/></g>
      <path class="glad" d="M-20 6 Q0 -18 20 6" fill="none" stroke="${LINJE}" stroke-width="7" stroke-linecap="round"/>
      <path class="bryn" d="M-16 3 Q0 -6 16 3" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <g class="munnen"><path class="mun" fill="${MUNFARG}"/>
    <g fill="none" stroke="${MUNLINJE}" stroke-width="5" stroke-linecap="round"><path class="nos"/><path class="le"/></g></g>
    </g></g>${['leg-l', 'leg-r', 'arm-l', 'arm-r'].map(n => del(n)).join('')}</g>`;
  document.getElementById('figurer').appendChild(g);
  return g;
}

function rita(fig, f, p = POSE0) {
  const q = s => fig.querySelector(s), alla = s => [...fig.querySelectorAll(s)];
  const r = Math.max(-1, Math.min(1, p.rikt + (fig.riktning || 0))), a = Math.abs(r), sida = Math.sign(r);   // −1 vänster, 1 höger
  const u = p.upp, sx = 1 + p.bred, sy = f.strack + p.strack, sank = p.sank;
  // Kroppen sträcks från fötterna och breddas kring mitten, så öron och armar flyttas med.
  const lyft = y => -(sy - 1) * (FOTTER - y) + sank;
  const del = (n, grader, dx, dy, skala = [1, 1]) => { const [x, y] = RIGG[n.replace('2', '')];
    const t = `translate(${(sx - 1) * (x - 512) + dx} ${dy}) rotate(${grader} ${x} ${y}) translate(${x} ${y}) scale(${skala[0]} ${skala[1]}) translate(${-x} ${-y})`;
    alla('.' + n).forEach(e => e.setAttribute('transform', t)); };
  q('.kanel').setAttribute('transform', `translate(${p.x} ${p.lyft}) rotate(${f.luta + p.luta + 2 * r} 512 ${FOTTER})`);
  const hojd = Math.min(1, -p.lyft / 220);
  q('.skugga').setAttribute('rx', 300 * (1 - 0.4 * hojd)); q('.skugga').setAttribute('cx', 512 + p.x); q('.skugga').setAttribute('opacity', 0.1 * (1 - 0.3 * hojd));
  q('.kropp').setAttribute('transform', `translate(0 ${sank}) translate(512 ${FOTTER}) scale(${sx} ${sy}) translate(-512 ${-FOTTER})`);

  // Riktningsposen (som i bil-test.html): kroppen framifrån, ansiktet glider ~36 px åt sidan, smalnar och lutar,
  // öronen lutar dit, och båda armarna kommer ut på den sidan: den närmre lite högre, kopian 85 px under.
  // Den bortre armen glider in bakom kroppen (vriden skulle dess rot sticka ut på andra sidan) och kopian glider ut
  // bakom kroppen på den närmre sidan: armarna åker in och ut, de tonar aldrig.
  const ora = [10, 3], oraY = [-14, 2];      // [närmre, bortre] örat (bortre mindre än i bilen, annars sticker roten ut)
  const nara = n => (n === 'l') === (sida < 0);
  const orat = (n, i) => { const rot = (i ? 1 : -1) * (f.oron[i] + p.oron[i]) + sida * a * (nara(n) ? ora[0] : ora[1]);
    // Hänger örat utåt svänger dess yttre bas ut förbi huvudet: skjut in det mot huvudet och lite ner.
    const ut = Math.max(0, i ? rot : -rot);
    del('ear-' + n, rot, (i ? -1 : 1) * 0.9 * ut, lyft(RIGG['ear-' + n][1]) + a * (nara(n) ? oraY[0] : oraY[1]) + 0.7 * ut); };
  orat('l', 0); orat('r', 1);
  ['l', 'r'].forEach((n, i) => { const s = i ? -1 : 1, vinkel = s * (f.armar[i] + p.armar[i]), y0 = lyft(RIGG['arm-' + n][1]) + 20 * p.fram[i];
    const dx = s * (p.klapp || 70 * p.fram[i]);    // framför kroppen: händerna in på magen (eller ihop, klapp)
    if (p.gang > 0) {     // gången (som förebilden): bakre armen framför kroppen ut över kanten, främre armen tittar fram, de pendlar i otakt
      const sd = sida || 1, bak = (n === 'l') === (sd > 0), g = p.gang;
      const [tv, tdx, tdy] = bak ? [sd * (-18 + 14 * p.sving), sd * 55, 20] : [sd * (-10 - 14 * p.sving), -sd * 60, 10];
      del('arm-' + n, mix(vinkel, tv, g), mix(dx, tdx, g), y0 + tdy * g);
      alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', (bak && g > 0.5) === (j === 1) ? 1 : 0));
      q('.arm-' + n + '2').setAttribute('opacity', 0); return; }
    const IN = 200;                                   // så långt in bakom kroppen en arm göms (figurens px)
    // Sanna 2026-11-09 "one arm looks shorter": vid halv vändning (rikt ±0,3–0,6, bilen) stod den bortre armen halvvägs inskjuten
    // och såg kort ut. Nu glider armarna in/ut först när vändningen är nästan hel, så halvvända har båda armarna hela.
    const e = mjuk(Math.max(0, Math.min(1, (a - 0.55) / 0.43)));
    if (nara(n)) { del('arm-' + n, vinkel, dx, y0 - 45 * a); del('arm-' + n + '2', vinkel - s * 16 * a, dx + s * (10 * a + IN * (1 - e)), y0 + 40 * a); }
    else del('arm-' + n, vinkel, dx + s * IN * e, y0);
    const syns = nara(n) || a < 0.98 ? 1 : 0;
    alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', ((p.fram[i] > 0.5) === (j === 1) ? 1 : 0) * syns));
    q('.arm-' + n + '2').setAttribute('opacity', nara(n) && e > 0 ? 1 : 0); });
  const lager = (n, fram) => alla('.' + n).forEach((e, j) => e.setAttribute('opacity', (fram > 0.5) === (j === 1) ? 1 : 0));
  lager('leg-l', p.benFram); lager('leg-r', p.benFram);
  del('leg-l', p.ben[0], 0, sank + p.benY[0], [1, 1 + p.benS[0]]);
  del('leg-r', -p.ben[1], 0, sank + p.benY[1], [1, 1 + p.benS[1]]);
  del('tail', p.svans, 0, lyft(741));

  // Hela ansiktet (med nosfläcken, kanel-nos.png) glider med riktningen och blicken, magen följer 40 %.
  const fx = 36 * r, fy = 4 * a - 10 * u;
  q('.mage').setAttribute('transform', `translate(${0.4 * fx} ${0.4 * fy})`);
  q('.drag').setAttribute('transform', `translate(${fx} ${fy}) rotate(${5 * r} 512 430) translate(512 430) scale(${1 - 0.08 * a} 1) translate(-512 -430)`);
  const ogon = alla('.oga'), lock = alla('.lock'), klipp = alla('.lockklipp'), glad = alla('.glad'), bryn = alla('.bryn');
  OGON.forEach(([x, y], i) => {
    const dy = f.ogonY - 4 * u;               // ögonen följer blicken lite mer än resten av ansiktet
    ogon[i].setAttribute('transform', `translate(${x + f.titt[0]} ${y + dy + f.titt[1]}) scale(${f.ogonS[0]} ${f.ogonS[1]})`);
    ogon[i].setAttribute('opacity', 1 - f.glad[i]);
    // Locket: en böjd kant som både klipper ögat och ritas som linje, så att det inte blir hörn.
    const ly = -26 + f.lock[i] * 40, w = 17 * Math.sqrt(Math.max(0, 1 - (ly / 25) ** 2));
    klipp[i].setAttribute('d', `M-40 ${ly} H${-w} Q0 ${ly + 8} ${w} ${ly} H40 V60 H-40Z`);
    lock[i].setAttribute('d', `M${-w} ${ly} Q0 ${ly + 8} ${w} ${ly}`);
    lock[i].setAttribute('opacity', Math.min(1, f.lock[i] * 8));
    glad[i].setAttribute('transform', `translate(${x} ${y + dy})`);
    glad[i].setAttribute('opacity', f.glad[i]);
    const s = i ? 1 : -1;                     // inre änden upp: vänster bryn moturs, höger medurs
    bryn[i].setAttribute('transform', `translate(${x} ${y - 52 + f.brynY[i] + dy}) rotate(${s * f.brynV})`);
    bryn[i].setAttribute('opacity', f.bryn);
  });
  stangOgon(fig, f);
  alla('.kind').forEach(c => c.setAttribute('opacity', f.kind));

  const cx = 512 + f.leX, b = f.leBred, le = f.le, ey = 456 - 4 * le;
  q('.nos').setAttribute('d', `M512 440 L${cx} ${446 + 8 * f.streck}`);   // kortare när munnen är öppen
  q('.le').setAttribute('d', `M${cx - 28 * b} ${ey} Q${cx - 14 * b} ${454 + 14 * le} ${cx} 454 Q${cx + 14 * b} ${454 + 14 * le} ${cx + 28 * b} ${ey}`);
  q('.le').setAttribute('opacity', f.streck);
  const [rx, ry, d, my] = f.mun, h = ry * 4 / 3, topp = h * (1 - d);
  q('.mun').setAttribute('d', `M${cx - rx} ${my} C${cx - rx} ${my - topp} ${cx + rx} ${my - topp} ${cx + rx} ${my}
    C${cx + rx} ${my + h} ${cx - rx} ${my + h} ${cx - rx} ${my}Z`);
}

// I avsnitt: ansikte('glad', 0.5) blandar halvvägs från neutral, pose('hurra', k) likadant för kroppen. De två går ihop.
// namn kan också vara ett objekt från blanda(a, b, k) / blandaPose(a, b, k). fig är vilken Kanel (standard: den första på sidan).
const forsta = () => document.querySelector('#figurer > g');
function ansikte(namn, k = 1, fig = forsta()) { fig.ansikte = blanda('neutral', namn, k); rita(fig, fig.ansikte, fig.pose); }
function pose(namn, k = 1, fig = forsta()) { fig.pose = blandaPose('neutral', namn, k); rita(fig, fig.ansikte || param('neutral'), fig.pose); }
// riktning('vanster' | 'hoger', k): riktningsposen ovanpå posen, k 0–1. riktning(null) tar bort den.
function riktning(sida, k = 1, fig = forsta()) { fig.riktning = sida ? (sida === 'hoger' ? 1 : -1) * k : 0;
  rita(fig, fig.ansikte || param('neutral'), fig.pose || POSE0); }
// Rörelser: hela uttryck + pose räknas ur t (sekunder), så att en film kan renderas bild för bild.
// rorelse('klappa' | 'hoppa' | 'dansa' | 'ga', t, fig). Loopar: klappa 3 s, hoppa 2,4 s, dansa 4 s, ga 8 s.
const P = o => ({ ...POSE0, ...o }), kl = (a, b, x) => Math.max(a, Math.min(b, x));
// Blinkningen (Sanna 2026-11-09: "looks kind of faded"): halvstängt en bildruta, stängt 0,1 s, halvstängt igen. Stängt =
// en ren böjd linje (stangOgon), även när ögonen är glada ^-bågar.
const blinka = (f, t, period = 3.1) => { const q = t % period;
  return q < 0.035 || (q >= 0.135 && q < 0.17) ? { ...f, lock: f.lock.map(l => Math.max(l, 0.6)) } : q < 0.135 ? { ...f, lock: [1, 1] } : f; };
// Ögonen i en figur (Kanels och de andra v2-figurernas riggar har samma .oga/.lock/.lockklipp/.glad): ingen genomskinlig
// toning mellan öppet öga och glad ^-båge (det såg blekt ut), och ett stängt lock (≥ 0,95) blir en hel böjd linje utan ögonrest.
function stangOgon(rot, f) {
  const O = rot.querySelectorAll('.oga'), L = rot.querySelectorAll('.lock'), K = rot.querySelectorAll('.lockklipp'), G = rot.querySelectorAll('.glad');
  for (let i = 0; i < O.length; i++) {
    const g = (f.glad || [0, 0])[i] > 0.5, stangt = (f.lock || [0, 0])[i] >= 0.95;
    O[i].setAttribute('opacity', g && !stangt ? 0 : 1); if (G[i]) G[i].setAttribute('opacity', g && !stangt ? 1 : 0);
    if (stangt) { K[i].setAttribute('d', 'M-40 60 H40 V62 H-40Z'); L[i].setAttribute('d', 'M-19 -1 Q0 13 19 -1'); L[i].setAttribute('opacity', 1); L[i].setAttribute('stroke-width', 7); }
    else L[i].setAttribute('stroke-width', 6);
  }
}
// Ett steg i gången (t sekunder, amp 0–1 stegens styrka, rikt −1 … 1 gångriktningen): riktningsposen åt det hållet,
// så att ansiktet och magen glider dit. Bakre armen ligger framför kroppen och sticker ut över kanten, den främre tittar fram
// på andra sidan, och de pendlar i otakt (gang 0–1, sving −1 … 1, se rita). Öronen rör sig bara lite.
const steg = (t, amp, rikt) => {
  const fi = t * 2.4 * Math.PI, f = Math.sin(fi) * amp, vy = Math.cos(fi) * Math.sign(Math.sin(fi)) * 12 * amp;
  const ora = kl(-8, 8, vy * 0.3), fl = Math.sin(t * 5);
  return [{ ...blanda('neutral', 'glad', 0.6), titt: [5 * Math.sign(rikt) * amp, 0] }, P({ rikt, luta: 4 * f, lyft: -Math.abs(f) * 12,
    ben: [16 * f, 16 * f], benY: [-40 * Math.max(0, -f), -40 * Math.max(0, f)], gang: Math.abs(rikt), sving: f,
    oron: [ora + fl, ora - fl] })];
};
const ROR = {
  klappa: t => {      // armarna fram, händerna möts framför bröstet, en liten studs på varje klapp
    const T = t % 3, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (3 - T) / 0.4));
    const c = T > 0.4 && T < 2.6 ? Math.abs(Math.sin(Math.PI * (T - 0.4) / 0.36)) : 1;   // 0 = händerna möts
    const smack = in_ * (1 - c) ** 4;
    const f = blanda('glad', 'jatteglad', in_);
    return [blinka(f, t), P({ fram: [in_, in_], armar: mix([0, 0], [-160 + 22 * c, -160 + 22 * c], in_),
      klapp: in_ * (192 - 66 * c), strack: -0.025 * smack, bred: 0.02 * smack, lyft: 6 * smack, oron: [4 * smack, 4 * smack],
      svans: Math.sin(t * 3) * 3 })];
  },
  hoppa: t => {       // som i rigg-test.html: huk 0,35 s, 1 s i luften, landning 0,3 s
    const k = t % 2.4, l = k > 0.35 && k < 1.35 ? (k - 0.35) / 1.0 : -1;
    let lyft = 0, vy = 0, sy = 0, sx = 0, arm = 0, fot = 0, glad = 0;
    if (l >= 0) { lyft = -4 * 220 * l * (1 - l); vy = -4 * 220 * (1 - 2 * l) / 30; sy = 0.08; sx = -0.06; arm = 32; fot = -30; glad = 1; }
    else { const tryck = k <= 0.35 ? Math.sin(k / 0.35 * Math.PI) : Math.sin(kl(0, 1, (k - 1.35) / 0.3) * Math.PI);
      sy = -0.12 * tryck; sx = 0.1 * tryck; arm = -12 * tryck; }
    const ora = kl(-25, 25, vy * 0.9);
    return [blinka(blanda('glad', 'jatteglad', glad), t), P({ lyft, strack: sy, bred: sx, armar: [arm, arm], benY: [fot, fot],
      oron: [ora, ora], svans: Math.sin(t * 3) * 3 })];
  },
  ga: t => {          // går fram och tillbaka (8 s), saktar in och vänder vid kanterna
    const T = t % 8, fart = Math.cos(T / 8 * 2 * Math.PI);
    const [f, p] = steg(T, Math.min(1, Math.abs(fart) * 1.6), kl(-1, 1, fart * 1.6));
    return [blinka(f, t), { ...p, x: 520 * Math.sin(T / 8 * 2 * Math.PI), svans: Math.sin(t * 3) * 3 }];
  },
  dansa: t => {       // gungar i takt (1 s per gung), armarna turas om upp, foten lyfts på motsatt sida, svansen viftar
    const T = t % 4, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (4 - T) / 0.4)), fi = 2 * Math.PI * T, s = Math.sin(fi) * in_;
    const studs = Math.abs(Math.sin(fi)) * in_, eft = Math.sin(fi - 0.8) * in_;
    const f = blanda('glad', 'jatteglad', in_);
    return [blinka(f, t), P({ luta: 5 * s, lyft: -14 * studs, strack: 0.02 * studs,
      armar: [in_ * 26 + 26 * s, in_ * 26 - 26 * s], benY: [-18 * Math.max(0, s), -18 * Math.max(0, -s)], ben: [6 * Math.max(0, s), 6 * Math.max(0, -s)],
      oron: [6 * eft, -6 * eft], svans: 14 * Math.sin(2 * fi) * in_ })];
  },
};
// Rörelsen styr armarna själv, så uttryckets armar (jätteglad lyfter dem) räknas inte med.
function rorelse(namn, t, fig = forsta()) { const [f0, p] = ROR[namn](t), f = { ...f0, armar: NEUTRAL.armar };
  fig.ansikte = f; fig.pose = p; rita(fig, f, p); }
Object.assign(window, { UTTRYCK, NEUTRAL, POSER, POSE0, blanda, blandaPose, ansikte, pose, riktning, rorelse, ROR });
Object.assign(window, { RIGG, OGON, KINDER, FOTTER, UTTRYCK, NEUTRAL, POSER, POSE0,
  blanda, blandaPose, param, figur, rita, ansikte, pose, riktning, rorelse, ROR, mjuk, kl });
