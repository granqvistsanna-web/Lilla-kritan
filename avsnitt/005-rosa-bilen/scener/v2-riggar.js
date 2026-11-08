// GENERERAD av gor-v2.py ur assets/karaktarer/*/premium/uttryck.html. Ändra inte här: ändra uttryck.html och kör om.
window.v2riggar = {};
// ---- musen-mille (assets/karaktarer/musen-mille/premium/uttryck.html, rad 29–290) ----
(() => {
const CUT = kit.ROT + 'assets/karaktarer/musen-mille/premium/cut/' + (window.V2_CUT?.['musen-mille'] || '');   // provbänk: window.V2_CUT = { mapp: 'slat/0.7/' }
const mjuk = k => k * k * (3 - 2 * k);   // ROR använder den (står längre ner i uttryck.html)
const RIGG = { 'arm-l': [245, 552], 'arm-r': [777, 552], 'leg-l': [434, 844], 'leg-r': [602, 841],
               'ear-l': [359, 321], 'ear-r': [661, 319], 'tail': [791, 697] };
// Uppmätt ur mille-platt.png mot mille-faceless.png (ansikte_matt.py). Kinderna är större än Kanels och Luddes.
const OGON = [[418, 401], [601, 400]], KINDER = [[378, 459], [642, 456]], FOTTER = 924, MY = 4;
// Uttrycket kawaii (stora glittriga ögon för förtjusning och förundran, ansikte('kawaii', k) blandar som de andra): mått i förhållande till huvudets bredd W vid ögonhöjd (482 px):
// ögon 1,5 × högre (ry 0,081 W) och 1,4 × bredare, 12 % längre isär (0,425 W), 0,035 W lägre; stor glans r 0,4 rx uppe till vänster
// och en liten r 0,14 rx nere till höger; kinderna lika stora men 10 px lägre och 8 px längre ut; munnen densamma.
const KAWAII = { ogon: [[408, 418], [614, 417]], skala: [1.4, 1.5], kinder: [[370, 469], [650, 466]] };
const LINJE = '#2a1d1a', MUNLINJE = '#3a2a22', MUNFARG = '#7a2a1c', KIND = '#ec8f96';

// Alla uttryck har samma parametrar, så att de går att blanda. Det som inte anges är neutralt.
// ogonS [sx, sy] ögonens storlek · titt [x, y] blickriktning · ogonY ögon och bryn upp (−) / ner (+)
// glad [v, h] öga → ^-båge (0–1) · sov öga → sluten u-båge (0–1, som Luddes) · kawaii stora glittriga ögon (0–1, se KAWAII) · lock [v, h] ögonlock ner (0–1) · bryn synlighet · brynY [v, h] höjd · brynV inre änden upp (grader)
// kind kindernas styrka · le leendet 1 … −1 (lite surt) · leBred bredd · leX munnen åt sidan · streck munlinjernas synlighet
// mun [rx, ry, d, cy] öppen mun (d 0 = rund, 1 = platt överkant) · oron [v, h] öronen hänger (+) / spetsas (−) i grader
// armar [v, h] armarna upp (+) / ner (−) i grader, vila 8 · luta hela figuren i grader · strack kroppen sträcks (+) / sjunker (−)
const NEUTRAL = { ogonS: [1, 1], titt: [0, 0], ogonY: 0, glad: [0, 0], lock: [0, 0], bryn: 0, brynY: [0, 0], brynV: 0,
  kind: 0.75, le: 1, leBred: 1, leX: 0, streck: 1, mun: [0, 0, 0, 462], oron: [0, 0], armar: [8, 8], luta: 0, strack: 1, sov: 0, kawaii: 0 };

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
  kawaii:    { namn: 'kawaii', kawaii: 1, kind: 1, le: 1.2, leBred: 0.9, oron: [-4, -4], armar: [16, 16], strack: 1.02 },
  // sover (som Luddes v2): ögonen är slutna u-bågar (inte locket, då syns en bit av pupillen under), en liten nöjd mun
  sover:     { namn: 'sover', sov: 1, ogonY: 4, kind: 0.85, le: 0.5, leBred: 0.7, oron: [10, 10], armar: [0, 0], strack: 0.97 },
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
  benFram: 0, ben: [0, 0], benY: [0, 0], benS: [0, 0], lyft: 0, svans: 0, x: 0, klapp: 0, gang: 0, sving: 0, armY: 0 };
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
  magen:     { namn: 'händer på magen', armar: [-95, -95], fram: [1, 1], klapp: 40 },   // händerna vid magens kanter (korta armar)
  blyg:      { namn: 'blyg', armar: [-25, -25], bred: -0.03, strack: -0.03, luta: -4, upp: -0.4, oron: [8, 4] },
  sitter:    { namn: 'sitter', ben: [40, 40], benY: [-40, -40], sank: 48, bred: 0.03, armar: [6, 6] },
  strack:    { namn: 'sträcker på sig', strack: 0.04, sank: -6, benS: [0.06, 0.06], armar: [30, 30], oron: [-5, -5] },
  huka:      { namn: 'hukar (före hopp)', strack: -0.08, bred: 0.05, ben: [6, 6], armar: [-10, -10], oron: [6, 6] },
  stampar:   { namn: 'stampar', ben: [0, 8], benY: [0, -16], luta: -2 },
  lyssnar:   { namn: 'lyssnar', luta: 6, oron: [-6, 14] },
  // sover (som Luddes v2): sitter ihopsjunken, huvudet lite nerböjt och åt sidan, händerna vilar på magen (som 'magen'),
  // öronen hänger lite, svansen inrullad mot kroppen
  sover:     { namn: 'sover', ben: [40, 40], benY: [-40, -40], sank: 56, bred: 0.04, strack: -0.03, upp: -0.6, luta: 4,
               armar: [-95, -95], fram: [1, 1], klapp: 40, oron: [10, 10], svans: -60 },
  // ligger på magen med händerna under hakan och sover (Sannas val 2026-11-07, som Luddes liggMage): svansen inrullad
  liggMage:  { namn: 'på magen, händerna under hakan', strack: -0.3, bred: 0.18, sank: 30, upp: -0.9,
               armar: [-120, -120], fram: [1, 1], klapp: 80, armY: -38, ben: [85, 85], benY: [-70, -70], oron: [14, 14], svans: -110 },
};
// ponytail: armar och ben byter lager (bakom/framför kroppen) vid fram 0,5. Ett hopp i lagren, men armen är gömd bakom kroppen just då.

const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => mix(v, b[i], k)) : a + (b - a) * k;
const fyll = (N, T, u) => typeof u === 'string' ? { ...N, ...T[u] } : { ...N, ...u };
const blandare = (N, T) => (a, b, k) => { const A = fyll(N, T, a), B = fyll(N, T, b), ut = {};
  for (const n in N) ut[n] = mix(A[n], B[n], Math.max(0, Math.min(1, k))); return ut; };
// Blanda två uttryck eller två poser (namn eller parameterobjekt), k 0 = a, 1 = b.
const blanda = blandare(NEUTRAL, UTTRYCK), blandaPose = blandare(POSE0, POSER), param = u => fyll(NEUTRAL, UTTRYCK, u);

function figur(x, y, skala, parent) {                 // en mus med fötterna i (x, y)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), id = Math.floor(Math.random() * 1e9);
  const del = (n, fil = n) => `<image class="${n}" href="${CUT}mille-${fil}.png" width="1024" height="1024"/>`;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${skala}) translate(-512 ${-FOTTER})`);
  // arm-l2/arm-r2: kopior av armarna för riktningsposen (båda armarna ut på samma sida, den ena under den andra).
  g.innerHTML = `<ellipse class="skugga" cx="512" cy="${FOTTER - 30}" rx="300" ry="34" fill="#000" opacity="0.1"/>
    <g class="figuren">${['ear-l', 'ear-r', 'tail', 'leg-l', 'leg-r'].map(n => del(n)).join('')}
    ${del('arm-l2', 'arm-l')}${del('arm-r2', 'arm-r')}${del('arm-l')}${del('arm-r')}
    <g class="kropp"><image href="${CUT}mille-body-tom.png" width="1024" height="1024"/>
    <g class="drag"><image href="${CUT}mille-nos.png" width="1024" height="1024"/>
    ${KINDER.map(([x, y]) => `<ellipse class="kind" cx="${x}" cy="${y}" rx="32" ry="23" fill="${KIND}"/>`).join('')}
    ${OGON.map((_, i) => `<g class="oga">
      <clipPath id="lock-${id}-${i}"><path class="lockklipp" d="M-40 -26 H40 V60 H-40Z"/></clipPath>
      <g clip-path="url(#lock-${id}-${i})"><ellipse rx="17.5" ry="26" fill="${LINJE}"/><circle class="glans" cx="-6" cy="-10" r="6" fill="#fff"/>
        <g class="glans-k" opacity="0"><circle cx="-5.3" cy="-9.9" r="7" fill="#fff"/><circle cx="5.6" cy="9.4" r="2.5" fill="#fff"/></g></g>
      <path class="lock" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/></g>
      <path class="glad" d="M-20 6 Q0 -18 20 6" fill="none" stroke="${LINJE}" stroke-width="7" stroke-linecap="round"/>
      <path class="sov" d="M-19 -2 Q0 14 19 -2" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>
      <path class="bryn" d="M-16 3 Q0 -6 16 3" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <g class="munnen"><path class="mun" fill="${MUNFARG}"/>
    <g fill="none" stroke="${MUNLINJE}" stroke-width="5" stroke-linecap="round"><path class="nos"/><path class="le"/></g></g>
    </g></g>${del('leg-l')}${del('leg-r')}${del('arm-l', 'arm-l-fram')}${del('arm-r', 'arm-r-fram')}</g>`;
  // Armarna framför kroppen (gången, klappen, magen) är mille-arm-*-fram.png: roten saknar vit kant och smälter in i
  // kroppens krita (armarna är ritade av samma kritbit), annars ser armen ut att sväva framför magen.
  parent.appendChild(g);
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
  q('.figuren').setAttribute('transform', `translate(${p.x} ${p.lyft}) rotate(${f.luta + p.luta + 2 * r} 512 ${FOTTER})`);
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
    // Musens öron sitter 16 px längre in mot huvudet (och 10 px lägre) än i konsten och skjuts in mer ju mer de lutar,
    // så att rotens kant aldrig syns (Sannas önskan).
    const IN = 16;
    del('ear-' + n, rot, (i ? -1 : 1) * (IN + 1.4 * Math.abs(rot)), lyft(RIGG['ear-' + n][1]) + a * (nara(n) ? oraY[0] : oraY[1]) + 10 + 1.0 * Math.abs(rot)); };
  orat('l', 0); orat('r', 1);
  ['l', 'r'].forEach((n, i) => { const s = i ? -1 : 1, vinkel = s * (f.armar[i] + p.armar[i]), y0 = lyft(RIGG['arm-' + n][1]) + 20 * p.fram[i] + p.armY;
    const dx = s * (p.klapp || 70 * p.fram[i]);    // framför kroppen: händerna in på magen (eller ihop, klapp)
    if (p.gang > 0) {     // gången (som förebilden): bakre armen framför kroppen ut över kanten, främre armen tittar fram, de pendlar i otakt
      const sd = sida || 1, bak = (n === 'l') === (sd > 0), g = p.gang;
      const [tv, tdx, tdy] = bak ? [sd * (-18 + 14 * p.sving), sd * 55, 20] : [sd * (-10 - 14 * p.sving), -sd * 60, 10];
      del('arm-' + n, mix(vinkel, tv, g), mix(dx, tdx, g), y0 + tdy * g);
      alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', (bak && g > 0.5) === (j === 1) ? 1 : 0));
      q('.arm-' + n + '2').setAttribute('opacity', 0); return; }
    const IN = 200;                                   // så långt in bakom kroppen en arm göms (figurens px)
    if (nara(n)) { del('arm-' + n, vinkel, dx, y0 - 45 * a); del('arm-' + n + '2', vinkel - s * 16 * a, dx + s * (10 * a + IN * (1 - a)), y0 + 40 * a); }
    else del('arm-' + n, vinkel, dx + s * IN * a, y0);
    const syns = nara(n) || a < 0.98 ? 1 : 0;
    // Armen framför kroppen (rot utan kant) först när den nästan är på plats, annars syns roten när den glider ut över kanten.
    alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', ((p.fram[i] > 0.85) === (j === 1) ? 1 : 0) * syns));
    q('.arm-' + n + '2').setAttribute('opacity', nara(n) && a > 0 ? 1 : 0); });
  const lager = (n, fram) => alla('.' + n).forEach((e, j) => e.setAttribute('opacity', (fram > 0.5) === (j === 1) ? 1 : 0));
  lager('leg-l', p.benFram); lager('leg-r', p.benFram);
  del('leg-l', p.ben[0], 0, sank + p.benY[0], [1, 1 + p.benS[0]]);
  del('leg-r', -p.ben[1], 0, sank + p.benY[1], [1, 1 + p.benS[1]]);
  del('tail', p.svans, 0, lyft(RIGG.tail[1]));

  // Hela ansiktet (med nosfläcken, mille-nos.png) glider med riktningen och blicken. Musen har ingen magfläck.
  const fx = 36 * r, fy = 4 * a - 10 * u;
  q('.drag').setAttribute('transform', `translate(${fx} ${fy}) rotate(${5 * r} 512 430) translate(512 430) scale(${1 - 0.08 * a} 1) translate(-512 -430)`);
  const K = Math.max(0, Math.min(1, f.kawaii)), OG = mix(OGON, KAWAII.ogon, K), OS = mix([1, 1], KAWAII.skala, K);
  const ogon = alla('.oga'), lock = alla('.lock'), klipp = alla('.lockklipp'), glad = alla('.glad'), sov = alla('.sov'), bryn = alla('.bryn');
  alla('.glans').forEach(e => e.setAttribute('opacity', 1 - K)); alla('.glans-k').forEach(e => e.setAttribute('opacity', K));
  alla('.kind').forEach((e, i) => { const [x, y] = mix(KINDER[i], KAWAII.kinder[i], K); e.setAttribute('cx', x); e.setAttribute('cy', y); });
  OG.forEach(([x, y], i) => {
    const dy = f.ogonY - 4 * u;               // ögonen följer blicken lite mer än resten av ansiktet
    ogon[i].setAttribute('transform', `translate(${x + f.titt[0]} ${y + dy + f.titt[1]}) scale(${f.ogonS[0] * OS[0]} ${f.ogonS[1] * OS[1]})`);
    ogon[i].setAttribute('opacity', (1 - f.glad[i]) * (1 - f.sov));
    sov[i].setAttribute('transform', `translate(${x} ${y + dy}) scale(${1 + 0.3 * K} ${1 + 0.15 * K})`); sov[i].setAttribute('opacity', f.sov);   // kawaii: bredare båge
    // Locket: en böjd kant som både klipper ögat och ritas som linje, så att det inte blir hörn.
    const ly = -26 + f.lock[i] * 40, w = 17 * Math.sqrt(Math.max(0, 1 - (ly / 25) ** 2));
    klipp[i].setAttribute('d', `M-40 ${ly} H${-w} Q0 ${ly + 8} ${w} ${ly} H40 V60 H-40Z`);
    lock[i].setAttribute('d', `M${-w} ${ly} Q0 ${ly + 8} ${w} ${ly}`);
    lock[i].setAttribute('opacity', Math.min(1, f.lock[i] * 8));
    glad[i].setAttribute('transform', `translate(${x} ${y + dy}) scale(${1 + 0.25 * K})`);
    glad[i].setAttribute('opacity', f.glad[i]);
    const s = i ? 1 : -1;                     // inre änden upp: vänster bryn moturs, höger medurs
    bryn[i].setAttribute('transform', `translate(${x} ${y - 52 - 14 * K + f.brynY[i] + dy}) rotate(${s * f.brynV})`);
    bryn[i].setAttribute('opacity', f.bryn);
  });
  alla('.kind').forEach(c => c.setAttribute('opacity', f.kind));

  // Musens mun (uppmätt ur mille-platt.png): strecket från nosen (439) ner till 466, och en enda U-båge 481–542 med botten i 469.
  const cx = 511 + f.leX, b = f.leBred, le = f.le, ey = 469 - 16 * le;
  q('.nos').setAttribute('d', `M511 439 L${cx} ${452 + 14 * f.streck}`);   // kortare när munnen är öppen
  q('.le').setAttribute('d', `M${cx - 31 * b} ${ey} Q${cx} ${469 + 16 * le} ${cx + 31 * b} ${ey}`);
  q('.le').setAttribute('opacity', f.streck);
  const [rx, ry, d, my0] = f.mun, my = my0 + MY, h = ry * 4 / 3, topp = h * (1 - d);
  q('.mun').setAttribute('d', `M${cx - rx} ${my} C${cx - rx} ${my - topp} ${cx + rx} ${my - topp} ${cx + rx} ${my}
    C${cx + rx} ${my + h} ${cx - rx} ${my + h} ${cx - rx} ${my}Z`);
}

// I avsnitt: ansikte('glad', 0.5) blandar halvvägs från neutral, pose('hurra', k) likadant för kroppen. De två går ihop.
// namn kan också vara ett objekt från blanda(a, b, k) / blandaPose(a, b, k). fig är vilken mus (standard: det första på sidan).
const forsta = () => document.querySelector('#figurer > g');
function ansikte(namn, k = 1, fig = forsta()) { fig.ansikte = blanda('neutral', namn, k); rita(fig, fig.ansikte, fig.pose); }
function pose(namn, k = 1, fig = forsta()) { fig.pose = blandaPose('neutral', namn, k); rita(fig, fig.ansikte || param('neutral'), fig.pose); }
// riktning('vanster' | 'hoger', k): riktningsposen ovanpå posen, k 0–1. riktning(null) tar bort den.
function riktning(sida, k = 1, fig = forsta()) { fig.riktning = sida ? (sida === 'hoger' ? 1 : -1) * k : 0;
  rita(fig, fig.ansikte || param('neutral'), fig.pose || POSE0); }
// Rörelser: hela uttryck + pose räknas ur t (sekunder), så att en film kan renderas bild för bild.
// rorelse('klappa' | 'hoppa' | 'dansa' | 'ga', t, fig). Loopar: klappa 3 s, hoppa 2,4 s, dansa 4 s, ga 8 s.
const P = o => ({ ...POSE0, ...o }), kl = (a, b, x) => Math.max(a, Math.min(b, x));
const blinka = (f, t, period = 3.1) => (t % period) < 0.12 ? { ...f, lock: [1, 1] } : f;
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
    // Sanna 2026-11-08 ("mouse can clap"): händerna möts mitt framför bröstet (förr bara klapp på magens kanter, syntes knappt),
    // armarna lyfta till brösthöjd (armY), isär till kroppens kanter mellan klappen, kroppen hoppar till på varje smack
    return [blinka(f, t), P({ fram: [in_, in_], armar: mix([0, 0], [-120 + 34 * c, -120 + 34 * c], in_), armY: -50 * in_,
      klapp: in_ * (178 - 120 * c), strack: -0.03 * smack, bred: 0.025 * smack, lyft: 10 * smack, oron: [6 * smack, 6 * smack],
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
    return [blinka(f, t), { ...p, x: 520 * Math.sin(T / 8 * 2 * Math.PI), svans: 14 * Math.sin(T * 2.4 * Math.PI) * Math.min(1, Math.abs(fart) * 1.6) }];
  },
  ligga: t => {       // ligger på magen med händerna under hakan och sover: ett andetag var 4:e sekund
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'liggMage', 1), strack: -0.3 + 0.02 * a, bred: 0.18 + 0.015 * a }]; },
  sova: t => {        // sover: lugna andetag (4 s per andetag), magen höjs och breddas lite, öronen följer med
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'sover', 1), strack: -0.03 + 0.02 * a, bred: 0.04 + 0.012 * a,
      oron: [10 - 3 * a, 10 - 3 * a], upp: -0.6 + 0.08 * a }];
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
window.v2riggar['musen-mille'] = { figur, rita, blanda, blandaPose, param, UTTRYCK, POSE0, POSER, ROR, RIGG, FOTTER,
  PIV: {l: [245, 552], r: [777, 552]}, VILA: {l: 136.1, r: 43.5}, ARM: {l: 92, r: 92}, BBOX: [162, 106, 864, 927] };
})();
// ---- grodan-gurra (assets/karaktarer/grodan-gurra/premium/uttryck.html, rad 29–280) ----
(() => {
const CUT = kit.ROT + 'assets/karaktarer/grodan-gurra/premium/cut/' + (window.V2_CUT?.['grodan-gurra'] || '');   // provbänk: window.V2_CUT = { mapp: 'slat/0.7/' }
const mjuk = k => k * k * (3 - 2 * k);   // ROR använder den (står längre ner i uttryck.html)
const RIGG = { 'arm-l': [208, 571], 'arm-r': [813, 568], 'leg-l': [434, 838], 'leg-r': [603, 833] };
// Uppmätt ur original/gurra-platt.png mot gurra-faceless.png (ansikte_matt.py): ögon rx 26 ry 37 (Luddes × 1,45, OS),
// kinder rx 38 ry 22, munnen en bred båge kring (514, 384), 106 px bred. MY flyttar Luddes öppna mun (cy ~462) upp till grodans mun.
const OGON = [[341, 260], [683, 260]], KINDER = [[373, 366], [650, 364]], FOTTER = 926, MY = -78, OS = 1.45, MUNX = 514;
// Kawaii-ögonen (uttrycket 'kawaii', parametern kawaii 0–1, stora glittriga ögon för förtjusning och förundran), samma mått som musen och björnen i förhållande till huvudets bredd
// W vid ögonhöjd (Gurra 542 px): ögon ry 0,081 W = 44 och rx 28 (Luddes öga × 1,61 / 1,69), 0,035 W = 19 px lägre; stor glans r 0,4 rx
// uppe till vänster och en liten r 0,14 rx nere till höger; kinderna lika stora, 10 px lägre och 8 px längre ut; munnen densamma.
// Undantag: avståndet 0,425 W skulle ta ögonen ut ur kuporna, så de ligger kvar mitt i kuporna (342 px isär).
const KAWAII = { ogon: [[341, 279], [683, 279]], skala: [1.61, 1.69], kinder: [[365, 376], [658, 374]], glad: 1.4, sov: 1.6, bryn: 58 };
const LINJE = '#2a1d1a', MUNLINJE = '#2a1d1a', MUNFARG = '#7a2a1c', KIND = '#ec8f96';

// Alla uttryck har samma parametrar, så att de går att blanda. Det som inte anges är neutralt.
// ogonS [sx, sy] ögonens storlek · titt [x, y] blickriktning · ogonY ögon och bryn upp (−) / ner (+)
// glad [v, h] öga → ^-båge (0–1) · lock [v, h] ögonlock ner (0–1) · bryn synlighet · brynY [v, h] höjd · brynV inre änden upp (grader)
// kind kindernas styrka · le leendet 1 … −1 (lite surt) · leBred bredd · leX munnen åt sidan · streck munlinjernas synlighet
// mun [rx, ry, d, cy] öppen mun (d 0 = rund, 1 = platt överkant) · oron [v, h] öronen hänger (+) / spetsas (−) i grader
// armar [v, h] armarna upp (+) / ner (−) i grader, vila 8 · luta hela figuren i grader · strack kroppen sträcks (+) / sjunker (−)
const NEUTRAL = { ogonS: [1, 1], titt: [0, 0], ogonY: 0, glad: [0, 0], lock: [0, 0], bryn: 0, brynY: [0, 0], brynV: 0,
  kind: 0.75, le: 1, leBred: 1, leX: 0, streck: 1, mun: [0, 0, 0, 462], oron: [0, 0], armar: [8, 8], luta: 0, strack: 1, sov: [0, 0], kawaii: 0 };
// sov [v, h] slutna ögon (0–1): ögat döljs och en u-båge visas (som Luddes v2, inte locket som lämnar en strimma pupill)

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
  // sover: ögonen är slutna u-bågar i kuporna, en liten nöjd mun (som Luddes)
  sover:     { namn: 'sover', sov: [1, 1], ogonY: 4, kind: 0.85, le: 0.5, leBred: 0.7, armar: [0, 0], strack: 0.97 },
  // kawaii: stora glittriga ögon (KAWAII-måtten) för ett ögonblick av förtjusning eller förundran, blandas som de andra
  kawaii:    { namn: 'kawaii', kawaii: 1, kind: 1, le: 1.15, leBred: 0.85, ogonY: -2, armar: [20, 20], strack: 1.02 },
  stolt:     { namn: 'stolt', glad: [1, 1], ogonY: -8, kind: 1, le: 1.2, leBred: 1.1, oron: [-6, -6], armar: [-8, -8], strack: 1.04 },
};
// ponytail: fnissig har ingen hand för munnen, armarna når inte dit (korta stumpar). Axlarna dras upp i stället.

// Poser: kropp, armar, ben och öron. De läggs ovanpå uttrycket, så pose('hurra') + ansikte('jatteglad') går ihop.
// luta hela figuren (grader, kring fötterna) · rikt −1 … 1 riktningspose åt vänster/höger (ansiktet glider dit, öronen lutar,
// båda armarna ut på den sidan, se rita) · upp −1 … 1 tittar upp/ner (ansiktet flyttas) · bred kroppens bredd (+/−) · strack kroppens
// höjd (+/−) · sank kroppen ner (+) / upp (−) i px · armar [v, h] upp (+) i grader, läggs till uttryckets · fram [v, h] armen
// framför kroppen (0/1) · benFram benen framför kroppen (0/1) · oron [v, h] hänger (+) i grader · ben [v, h] utåt (+) i grader · benY [v, h] foten upp (−) i px · benS [v, h] benet längre (+)
// lyft hela figuren upp (−) i px, skuggan krymper · svans svansens vinkel i grader · x hela figuren åt sidan i px
const POSE0 = { luta: 0, rikt: 0, upp: 0, bred: 0, strack: 0, sank: 0, armar: [0, 0], fram: [0, 0], oron: [0, 0],
  benFram: 0, ben: [0, 0], benY: [0, 0], benS: [0, 0], lyft: 0, svans: 0, x: 0, klapp: 0, gang: 0, sving: 0, armY: 0 };
// armY armarna upp (−) / ner (+) i px (händerna under hakan när grodan ligger)
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
  magen:     { namn: 'händer på magen', armar: [-95, -95], fram: [1, 1], klapp: 40 },   // klövarna vid magens kanter (korta armar)
  blyg:      { namn: 'blyg', armar: [-25, -25], bred: -0.03, strack: -0.03, luta: -4, upp: -0.4, oron: [8, 4] },
  sitter:    { namn: 'sitter', ben: [40, 40], benY: [-40, -40], sank: 48, bred: 0.03, armar: [6, 6] },
  strack:    { namn: 'sträcker på sig', strack: 0.04, sank: -6, benS: [0.06, 0.06], armar: [30, 30], oron: [-5, -5] },
  huka:      { namn: 'hukar (före hopp)', strack: -0.08, bred: 0.05, ben: [6, 6], armar: [-10, -10], oron: [6, 6] },
  stampar:   { namn: 'stampar', ben: [0, 8], benY: [0, -16], luta: -2 },
  lyssnar:   { namn: 'lyssnar', luta: 6, oron: [-6, 14] },
  // liggMage (vald 2026-11-07, som Luddes): ligger på magen med händerna under hakan, benen indragna. Grodans huvud är stort,
  // så armarna lyfts (armY) och skjuts längre in (klapp) än Luddes för att händerna ska hamna under hakan.
  liggMage:  { namn: 'ligger på magen, händerna under hakan', strack: -0.3, bred: 0.18, sank: 30, upp: -0.9,
               armar: [-95, -95], fram: [1, 1], klapp: 200, armY: -40, ben: [85, 85], benY: [-70, -70] },
};
// ponytail: armar och ben byter lager (bakom/framför kroppen) vid fram 0,5. Ett hopp i lagren, men armen är gömd bakom kroppen just då.

const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => mix(v, b[i], k)) : a + (b - a) * k;
const fyll = (N, T, u) => typeof u === 'string' ? { ...N, ...T[u] } : { ...N, ...u };
const blandare = (N, T) => (a, b, k) => { const A = fyll(N, T, a), B = fyll(N, T, b), ut = {};
  for (const n in N) ut[n] = mix(A[n], B[n], Math.max(0, Math.min(1, k))); return ut; };
// Blanda två uttryck eller två poser (namn eller parameterobjekt), k 0 = a, 1 = b.
const blanda = blandare(NEUTRAL, UTTRYCK), blandaPose = blandare(POSE0, POSER), param = u => fyll(NEUTRAL, UTTRYCK, u);

function figur(x, y, skala, parent) {                 // en groda med fötterna i (x, y)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), id = Math.floor(Math.random() * 1e9);
  const del = (n, fil = n) => `<image class="${n}" href="${CUT}gurra-${fil}.png" width="1024" height="1024"/>`;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${skala}) translate(-512 ${-FOTTER})`);
  // arm-l2/arm-r2: kopior av armarna för riktningsposen (båda armarna ut på samma sida, den ena under den andra).
  g.innerHTML = `<ellipse class="skugga" cx="512" cy="${FOTTER - 30}" rx="300" ry="34" fill="#000" opacity="0.1"/>
    <g class="figuren">${['leg-l', 'leg-r'].map(n => del(n)).join('')}
    ${del('arm-l2', 'arm-l')}${del('arm-r2', 'arm-r')}${del('arm-l')}${del('arm-r')}
    <g class="kropp"><image href="${CUT}gurra-body-tom.png" width="1024" height="1024"/>
    <image class="mage" href="${CUT}gurra-mage.png" width="1024" height="1024"/>
    <g class="drag">
    ${KINDER.map(([x, y]) => `<ellipse class="kind" cx="${x}" cy="${y}" rx="34" ry="20" fill="${KIND}"/>`).join('')}
    ${OGON.map((_, i) => `<g class="oga">
      <clipPath id="lock-${id}-${i}"><path class="lockklipp" d="M-40 -26 H40 V60 H-40Z"/></clipPath>
      <g clip-path="url(#lock-${id}-${i})"><ellipse rx="17.5" ry="26" fill="${LINJE}"/><circle class="glans" cx="-6" cy="-10" r="6" fill="#fff"/>
        <g class="glans-k" opacity="0"><circle cx="-5.3" cy="-9.9" r="7" fill="#fff"/><circle cx="5.6" cy="9.4" r="2.5" fill="#fff"/></g></g>
      <path class="lock" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/></g>
      <path class="glad" d="M-20 6 Q0 -18 20 6" fill="none" stroke="${LINJE}" stroke-width="7" stroke-linecap="round"/>
      <path class="sovoga" d="M-19 -2 Q0 14 19 -2" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>
      <path class="bryn" d="M-16 3 Q0 -6 16 3" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <g class="munnen"><path class="mun" fill="${MUNFARG}"/>
    <path class="le" fill="none" stroke="${MUNLINJE}" stroke-width="7" stroke-linecap="round"/></g>
    </g></g>${del('leg-l')}${del('leg-r')}${del('arm-l', 'arm-l-fram')}${del('arm-r', 'arm-r-fram')}</g>`;
  // Armarna framför kroppen (gången, klappen, magen) är gurra-arm-*-fram.png: roten saknar vit kant och smälter in i
  // kroppens krita (armarna är ritade av samma kritbit), annars ser armen ut att sväva framför magen.
  parent.appendChild(g);
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
  q('.figuren').setAttribute('transform', `translate(${p.x} ${p.lyft}) rotate(${f.luta + p.luta + 2 * r} 512 ${FOTTER})`);
  const hojd = Math.min(1, -p.lyft / 220);
  q('.skugga').setAttribute('rx', 300 * (1 - 0.4 * hojd)); q('.skugga').setAttribute('cx', 512 + p.x); q('.skugga').setAttribute('opacity', 0.1 * (1 - 0.3 * hojd));
  q('.kropp').setAttribute('transform', `translate(0 ${sank}) translate(512 ${FOTTER}) scale(${sx} ${sy}) translate(-512 ${-FOTTER})`);

  // Riktningsposen (som i bil-test.html): kroppen framifrån, ansiktet glider ~36 px åt sidan, smalnar och lutar,
  // öronen lutar dit, och båda armarna kommer ut på den sidan: den närmre lite högre, kopian 85 px under.
  // Den bortre armen glider in bakom kroppen (vriden skulle dess rot sticka ut på andra sidan) och kopian glider ut
  // bakom kroppen på den närmre sidan: armarna åker in och ut, de tonar aldrig.
  const nara = n => (n === 'l') === (sida < 0);
  ['l', 'r'].forEach((n, i) => { const s = i ? -1 : 1, vinkel = s * (f.armar[i] + p.armar[i]), y0 = lyft(RIGG['arm-' + n][1]) + 20 * p.fram[i] + p.armY;
    const dx = s * (p.klapp || 70 * p.fram[i]);    // framför kroppen: händerna in på magen (eller ihop, klapp)
    if (p.gang > 0) {     // gången (som förebilden): bakre armen framför kroppen ut över kanten, främre armen tittar fram, de pendlar i otakt
      const sd = sida || 1, bak = (n === 'l') === (sd > 0), g = p.gang;
      const [tv, tdx, tdy] = bak ? [sd * (-18 + 14 * p.sving), sd * 55, 20] : [sd * (-10 - 14 * p.sving), -sd * 60, 10];
      del('arm-' + n, mix(vinkel, tv, g), mix(dx, tdx, g), y0 + tdy * g);
      alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', (bak && g > 0.5) === (j === 1) ? 1 : 0));
      q('.arm-' + n + '2').setAttribute('opacity', 0); return; }
    const IN = 200;                                   // så långt in bakom kroppen en arm göms (figurens px)
    if (nara(n)) { del('arm-' + n, vinkel, dx, y0 - 45 * a); del('arm-' + n + '2', vinkel - s * 16 * a, dx + s * (10 * a + IN * (1 - a)), y0 + 40 * a); }
    else del('arm-' + n, vinkel, dx + s * IN * a, y0);
    const syns = nara(n) || a < 0.98 ? 1 : 0;
    // Armen framför kroppen (rot utan kant) först när den nästan är på plats, annars syns roten när den glider ut över kanten.
    alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', ((p.fram[i] > 0.85) === (j === 1) ? 1 : 0) * syns));
    q('.arm-' + n + '2').setAttribute('opacity', nara(n) && a > 0 ? 1 : 0); });
  const lager = (n, fram) => alla('.' + n).forEach((e, j) => e.setAttribute('opacity', (fram > 0.5) === (j === 1) ? 1 : 0));
  lager('leg-l', p.benFram); lager('leg-r', p.benFram);
  del('leg-l', p.ben[0], 0, sank + p.benY[0], [1, 1 + p.benS[0]]);
  del('leg-r', -p.ben[1], 0, sank + p.benY[1], [1, 1 + p.benS[1]]);

  // Kinder och mun glider med riktningen och blicken, magen följer 40 %. Ögonen sitter i kuporna (kroppens kant),
  // så de flyttas bara 12 px inom kupan, annars hamnar de utanför huvudet.
  const fx = 36 * r, fy = 4 * a - 10 * u;
  q('.drag').setAttribute('transform', `translate(${fx} ${fy}) rotate(${5 * r} 512 330) translate(512 330) scale(${1 - 0.08 * a} 1) translate(-512 -330)`);
  q('.mage').setAttribute('transform', `translate(${0.4 * fx} ${0.4 * fy})`);
  const ox = 12 * r - fx, oy = -fy - 3 * u;   // ögonen ligger i ansiktsgruppen: ta bort dess flytt, lägg till kupans
  const ogon = alla('.oga'), lock = alla('.lock'), klipp = alla('.lockklipp'), glad = alla('.glad'), sov = alla('.sovoga'), bryn = alla('.bryn');
  const kk = f.kawaii, SX = mix(OS, KAWAII.skala[0], kk), SY = mix(OS, KAWAII.skala[1], kk);
  alla('.glans').forEach(e => e.setAttribute('opacity', 1 - kk)); alla('.glans-k').forEach(e => e.setAttribute('opacity', kk));
  alla('.kind').forEach((e, i) => { const [x, y] = mix(KINDER[i], KAWAII.kinder[i], kk); e.setAttribute('cx', x); e.setAttribute('cy', y); });
  OGON.map((o, i) => mix(o, KAWAII.ogon[i], kk)).forEach(([x, y], i) => {
    const dy = f.ogonY + oy, ex = x + ox;       // ögonen stannar i kuporna
    ogon[i].setAttribute('transform', `translate(${ex + f.titt[0]} ${y + dy + f.titt[1]}) scale(${SX * f.ogonS[0]} ${SY * f.ogonS[1]})`);
    ogon[i].setAttribute('opacity', (1 - f.glad[i]) * (1 - f.sov[i]));
    // Locket: en böjd kant som både klipper ögat och ritas som linje, så att det inte blir hörn.
    const ly = -26 + f.lock[i] * 40, w = 17 * Math.sqrt(Math.max(0, 1 - (ly / 25) ** 2));
    klipp[i].setAttribute('d', `M-40 ${ly} H${-w} Q0 ${ly + 8} ${w} ${ly} H40 V60 H-40Z`);
    lock[i].setAttribute('d', `M${-w} ${ly} Q0 ${ly + 8} ${w} ${ly}`);
    lock[i].setAttribute('opacity', Math.min(1, f.lock[i] * 8));
    glad[i].setAttribute('transform', `translate(${ex} ${y + dy}) scale(${mix(OS, KAWAII.glad, kk)})`);
    glad[i].setAttribute('opacity', f.glad[i] * (1 - f.sov[i]));
    sov[i].setAttribute('transform', `translate(${ex} ${y + dy}) scale(${mix(OS, KAWAII.sov, kk)})`); sov[i].setAttribute('opacity', f.sov[i]);
    const s = i ? 1 : -1;                     // inre änden upp: vänster bryn moturs, höger medurs
    bryn[i].setAttribute('transform', `translate(${ex} ${y - mix(50, KAWAII.bryn, kk) + f.brynY[i] + dy}) rotate(${s * f.brynV}) scale(1.15)`);
    bryn[i].setAttribute('opacity', f.bryn);
  });
  alla('.kind').forEach(c => c.setAttribute('opacity', f.kind));

  // Grodans mun: en enda bred båge (uppmätt ur gurra-platt.png: ändar 368, botten 392, 106 px bred). le −1 … 1 böjer den.
  const cx = MUNX + f.leX, b = f.leBred, le = f.le;
  q('.le').setAttribute('d', `M${cx - 53 * b} ${384 - 16 * le} Q${cx} ${384 + 24 * le} ${cx + 53 * b} ${384 - 16 * le}`);
  q('.le').setAttribute('opacity', f.streck);
  // Öppen mun som Luddes, men bredare (grodan har stor mun).
  const [rx0, ry, d, my0] = f.mun, rx = rx0 * 2.2, my = my0 + MY, h = ry * 1.5 * 4 / 3, topp = h * (1 - d);
  q('.mun').setAttribute('d', `M${cx - rx} ${my} C${cx - rx} ${my - topp} ${cx + rx} ${my - topp} ${cx + rx} ${my}
    C${cx + rx} ${my + h} ${cx - rx} ${my + h} ${cx - rx} ${my}Z`);
}

// I avsnitt: ansikte('glad', 0.5) blandar halvvägs från neutral, pose('hurra', k) likadant för kroppen. De två går ihop.
// namn kan också vara ett objekt från blanda(a, b, k) / blandaPose(a, b, k). fig är vilken groda (standard: den första på sidan).
const forsta = () => document.querySelector('#figurer > g');
function ansikte(namn, k = 1, fig = forsta()) { fig.ansikte = blanda('neutral', namn, k); rita(fig, fig.ansikte, fig.pose); }
function pose(namn, k = 1, fig = forsta()) { fig.pose = blandaPose('neutral', namn, k); rita(fig, fig.ansikte || param('neutral'), fig.pose); }
// riktning('vanster' | 'hoger', k): riktningsposen ovanpå posen, k 0–1. riktning(null) tar bort den.
function riktning(sida, k = 1, fig = forsta()) { fig.riktning = sida ? (sida === 'hoger' ? 1 : -1) * k : 0;
  rita(fig, fig.ansikte || param('neutral'), fig.pose || POSE0); }
// Rörelser: hela uttryck + pose räknas ur t (sekunder), så att en film kan renderas bild för bild.
// rorelse('klappa' | 'hoppa' | 'dansa' | 'ga', t, fig). Loopar: klappa 3 s, hoppa 2,4 s, dansa 4 s, ga 8 s.
const P = o => ({ ...POSE0, ...o }), kl = (a, b, x) => Math.max(a, Math.min(b, x));
const blinka = (f, t, period = 3.1) => (t % period) < 0.12 ? { ...f, lock: [1, 1] } : f;
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
    // Lammets armar är för korta för att mötas: klövarna klappar på magen vid kroppens kanter, armen syns ut från sidan.
    return [blinka(f, t), P({ fram: [in_, in_], armar: mix([0, 0], [-95 + 26 * c, -95 + 26 * c], in_),
      klapp: in_ * (40 - 16 * c), strack: -0.025 * smack, bred: 0.02 * smack, lyft: 6 * smack, oron: [4 * smack, 4 * smack],
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
  ligga: t => {       // ligger på magen med händerna under hakan och sover: ett andetag var 4:e s (som Luddes)
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'liggMage', 1), strack: -0.3 + 0.02 * a, bred: 0.18 + 0.015 * a }];
  },
  dansa: t => {       // gungar i takt (1 s per gung), armarna turas om upp, foten lyfts på motsatt sida, (grodan har ingen svans)
    const T = t % 4, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (4 - T) / 0.4)), fi = 2 * Math.PI * T, s = Math.sin(fi) * in_;
    const studs = Math.abs(Math.sin(fi)) * in_, eft = Math.sin(fi - 0.8) * in_;
    const f = blanda('glad', 'jatteglad', in_);
    return [blinka(f, t), P({ luta: 5 * s, lyft: -14 * studs, strack: 0.02 * studs,
      armar: [in_ * 26 + 26 * s, in_ * 26 - 26 * s], benY: [-18 * Math.max(0, s), -18 * Math.max(0, -s)], ben: [6 * Math.max(0, s), 6 * Math.max(0, -s)],
      oron: [6 * eft, -6 * eft], svans: 14 * Math.sin(2 * fi) * in_ })];
  },
};
window.v2riggar['grodan-gurra'] = { figur, rita, blanda, blandaPose, param, UTTRYCK, POSE0, POSER, ROR, RIGG, FOTTER,
  PIV: {l: [208, 571], r: [813, 568]}, VILA: {l: 106.6, r: 74.0}, ARM: {l: 78, r: 78}, BBOX: [227, 168, 796, 932] };
})();
// ---- kaninen-kanel (assets/karaktarer/kaninen-kanel/premium/uttryck.html, rad 31–257) ----
(() => {
const CUT = kit.ROT + 'assets/karaktarer/kaninen-kanel/premium/cut/' + (window.V2_CUT?.['kaninen-kanel'] || '');   // provbänk: window.V2_CUT = { mapp: 'slat/0.7/' }
const mjuk = k => k * k * (3 - 2 * k);   // ROR använder den (står längre ner i uttryck.html)
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

function figur(x, y, skala, parent) {                 // en Kanel med fötterna i (x, y)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), id = Math.floor(Math.random() * 1e9);
  // Öronroten nedanför y 308 ligger alltid under huvudet: klipps bort, så att den inte syns som en vit kant när huvudet trycks ihop.
  const del = (n, fil = n) => `<image class="${n}" href="${CUT}kanel-${fil}.png" width="1024" height="1024"${n.startsWith('ear') ? ' clip-path="url(#orrot)"' : ''}/>`;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${skala}) translate(-512 ${-FOTTER})`);
  // arm-l2/arm-r2: kopior av armarna för riktningsposen (båda armarna ut på samma sida, den ena under den andra).
  g.innerHTML = `<ellipse class="skugga" cx="512" cy="${FOTTER - 30}" rx="300" ry="34" fill="#000" opacity="0.1"/>
    <g class="kanel">${['ear-l', 'ear-r', 'tail', 'leg-l', 'leg-r'].map(n => del(n)).join('')}
    ${del('arm-l2', 'arm-l')}${del('arm-r2', 'arm-r')}${del('arm-l')}${del('arm-r')}
    <g class="kropp"><image href="${CUT}kanel-body-tom.png" width="1024" height="1024"/>
    <image class="mage" href="${CUT}kanel-mage.png" width="1024" height="1024"/>
    <g class="drag"><image href="${CUT}kanel-nos.png" width="1024" height="1024"/>
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
  parent.appendChild(g);
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
    if (nara(n)) { del('arm-' + n, vinkel, dx, y0 - 45 * a); del('arm-' + n + '2', vinkel - s * 16 * a, dx + s * (10 * a + IN * (1 - a)), y0 + 40 * a); }
    else del('arm-' + n, vinkel, dx + s * IN * a, y0);
    const syns = nara(n) || a < 0.98 ? 1 : 0;
    alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', ((p.fram[i] > 0.5) === (j === 1) ? 1 : 0) * syns));
    q('.arm-' + n + '2').setAttribute('opacity', nara(n) && a > 0 ? 1 : 0); });
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
const blinka = (f, t, period = 3.1) => (t % period) < 0.12 ? { ...f, lock: [1, 1] } : f;
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
window.v2riggar['kaninen-kanel'] = { figur, rita, blanda, blandaPose, param, UTTRYCK, POSE0, POSER, ROR, RIGG, FOTTER,
  PIV: {l: [212, 567], r: [799, 566]}, VILA: {l: 136.5, r: 43.2}, ARM: {l: 118, r: 117}, BBOX: [230, 28, 782, 953] };
})();
// ---- humlan-humle (assets/karaktarer/humlan-humle/premium/uttryck.html, rad 30–283) ----
(() => {
const CUT = kit.ROT + 'assets/karaktarer/humlan-humle/premium/cut/' + (window.V2_CUT?.['humlan-humle'] || '');   // provbänk: window.V2_CUT = { mapp: 'slat/0.7/' }
const mjuk = k => k * k * (3 - 2 * k);   // ROR använder den (står längre ner i uttryck.html)
const RIGG = { 'arm-l': [240, 566], 'arm-r': [784, 566], 'leg-l': [434, 847], 'leg-r': [602, 843],
  'antenn-l': [410, 215], 'antenn-r': [608, 215], 'wing-l': [272, 430], 'wing-r': [752, 430] };
// Uppmätt ur original/humle-platt.png mot humle-faceless.png (ansikte_matt.py): ögon rx 20 ry 28, kinder rx 34 ry 22, munnen (513, 445) 48 px bred.
const OGON = [[411, 403], [612, 403]], KINDER = [[361, 459], [662, 459]], FOTTER = 925;
const LINJE = '#2a1d1a', MUNLINJE = '#7a3a1c', MUNFARG = '#7a2a1c', KIND = '#ec8f96';

// Alla uttryck har samma parametrar, så att de går att blanda. Det som inte anges är neutralt.
// ogonS [sx, sy] ögonens storlek · titt [x, y] blickriktning · ogonY ögon och bryn upp (−) / ner (+)
// glad [v, h] öga → ^-båge (0–1) · lock [v, h] ögonlock ner (0–1) · bryn synlighet · brynY [v, h] höjd · brynV inre änden upp (grader)
// kind kindernas styrka · le leendet 1 … −1 (lite surt) · leBred bredd · leX munnen åt sidan · streck munlinjernas synlighet
// mun [rx, ry, d, cy] öppen mun: rx bredd, ry höjd (d, cy används inte för humlan)
// oron [v, h] antennerna hänger utåt (+) / reser sig (−) i grader
// armar [v, h] armarna upp (+) / ner (−) i grader, vila 8 · luta hela figuren i grader · strack kroppen sträcks (+) / sjunker (−)
const NEUTRAL = { ogonS: [1, 1], titt: [0, 0], ogonY: 0, glad: [0, 0], lock: [0, 0], bryn: 0, brynY: [0, 0], brynV: 0,
  kind: 0.75, le: 1, leBred: 1, leX: 0, streck: 1, mun: [0, 0, 0, 446], oron: [0, 0], armar: [8, 8], luta: 0, strack: 1, sov: 0, glans: 0 };

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
  // sover: ögonen är slutna u-bågar (inte locket, då syns en bit av pupillen under), en liten nöjd mun
  // kawaii: stora glittriga ögon för förtjusning och förundran (bestämt 2026-11-07), aldrig standardansiktet. glans = större glans + en till.
  kawaii:    { namn: 'kawaii', ogonS: [1.38, 1.32], glans: 1, ogonY: -3, kind: 1, le: 1.15, leBred: 0.85, oron: [-8, -8], armar: [20, 20], strack: 1.03 },
  sover:     { namn: 'sover', sov: 1, ogonY: 4, kind: 0.85, le: 0.5, leBred: 0.7, oron: [18, 18], armar: [0, 0], strack: 0.97 },
};

// Poser: kropp, armar, ben och öron. De läggs ovanpå uttrycket, så pose('hurra') + ansikte('jatteglad') går ihop.
// luta hela figuren (grader, kring fötterna) · rikt −1 … 1 riktningspose åt vänster/höger (ansiktet glider dit, öronen lutar,
// båda armarna ut på den sidan, se rita) · upp −1 … 1 tittar upp/ner (ansiktet flyttas) · bred kroppens bredd (+/−) · strack kroppens
// höjd (+/−) · sank kroppen ner (+) / upp (−) i px · armar [v, h] upp (+) i grader, läggs till uttryckets · fram [v, h] armen
// framför kroppen (0/1) · benFram benen framför kroppen (0/1) · oron [v, h] hänger (+) i grader · ben [v, h] utåt (+) i grader · benY [v, h] foten upp (−) i px · benS [v, h] benet längre (+)
// lyft hela figuren upp (−) i px, skuggan krymper · svans används inte (ingen svans) · x hela figuren åt sidan i px · vinge vingarna upp/ut (+) i grader (surr)
const POSE0 = { luta: 0, rikt: 0, upp: 0, bred: 0, strack: 0, sank: 0, armar: [0, 0], fram: [0, 0], oron: [0, 0],
  benFram: 0, ben: [0, 0], benY: [0, 0], benS: [0, 0], lyft: 0, svans: 0, x: 0, klapp: 0, gang: 0, sving: 0, ligg: 0, vinge: 0 };
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
  magen:     { namn: 'armar på magen', armar: [-95, -95], fram: [1, 1], klapp: 58 },   // vingspetsarna vid magens kanter (korta vingar)
  blyg:      { namn: 'blyg', armar: [-25, -25], bred: -0.03, strack: -0.03, luta: -4, upp: -0.4, oron: [8, 4] },
  sitter:    { namn: 'sitter', ben: [40, 40], benY: [-40, -40], sank: 48, bred: 0.03, armar: [6, 6] },
  strack:    { namn: 'sträcker på sig', strack: 0.04, sank: -6, benS: [0.06, 0.06], armar: [30, 30], oron: [-5, -5] },
  huka:      { namn: 'hukar (före hopp)', strack: -0.08, bred: 0.05, ben: [6, 6], armar: [-10, -10], oron: [6, 6] },
  stampar:   { namn: 'stampar', ben: [0, 8], benY: [0, -16], luta: -2 },
  lyssnar:   { namn: 'lyssnar', luta: 6, oron: [-6, 14] },
  // sover: sitter ihopsjunken med huvudet lite nerböjt, armarna vilar på magen (som 'magen'), antennerna hänger
  sover:     { namn: 'sover', ben: [40, 40], benY: [-40, -40], sank: 56, bred: 0.04, strack: -0.03, upp: -0.6, luta: 4,
               armar: [-95, -95], fram: [1, 1], klapp: 58, oron: [10, 10] },
  // liggMage (som Pips): ligger på magen, kroppen sjunker ihop, armarna (fram-kopiorna) under hakan, benen gömda bakom kroppen
  liggMage:  { namn: 'på magen, hakan på vingarna', strack: -0.3, bred: 0.18, sank: 30, upp: -0.9,
               armar: [-95, -95], fram: [1, 1], klapp: 82, ben: [85, 85], benY: [-70, -70], oron: [24, 24] },
};
// ponytail: armar och ben byter lager (bakom/framför kroppen) vid fram 0,5. Ett hopp i lagren, men armen är gömd bakom kroppen just då.

const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => mix(v, b[i], k)) : a + (b - a) * k;
const fyll = (N, T, u) => typeof u === 'string' ? { ...N, ...T[u] } : { ...N, ...u };
const blandare = (N, T) => (a, b, k) => { const A = fyll(N, T, a), B = fyll(N, T, b), ut = {};
  for (const n in N) ut[n] = mix(A[n], B[n], Math.max(0, Math.min(1, k))); return ut; };
// Blanda två uttryck eller två poser (namn eller parameterobjekt), k 0 = a, 1 = b.
const blanda = blandare(NEUTRAL, UTTRYCK), blandaPose = blandare(POSE0, POSER), param = u => fyll(NEUTRAL, UTTRYCK, u);

function figur(x, y, skala, parent) {                 // en humla med fötterna i (x, y)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), id = Math.floor(Math.random() * 1e9);
  const del = (n, fil = n) => `<image class="${n}" href="${CUT}humle-${fil}.png" width="1024" height="1024"/>`;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${skala}) translate(-512 ${-FOTTER})`);
  // arm-l2/arm-r2: kopior av armarna för riktningsposen (båda armarna ut på samma sida, den ena under den andra).
  g.innerHTML = `<ellipse class="skugga" cx="512" cy="${FOTTER - 25}" rx="280" ry="32" fill="#000" opacity="0.1"/>
    <g class="figuren">${['wing-l', 'wing-r', 'antenn-l', 'antenn-r', 'leg-l', 'leg-r'].map(n => del(n)).join('')}
    ${del('arm-l2', 'arm-l')}${del('arm-r2', 'arm-r')}${del('arm-l')}${del('arm-r')}
    <g class="kropp"><image href="${CUT}humle-body.png" width="1024" height="1024"/>
    <g class="drag">
    ${KINDER.map(([x, y]) => `<ellipse class="kind" cx="${x}" cy="${y}" rx="34" ry="21" fill="${KIND}"/>`).join('')}
    ${OGON.map((_, i) => `<g class="oga">
      <clipPath id="lock-h${id}-${i}"><path class="lockklipp" d="M-44 -30 H44 V64 H-44Z"/></clipPath>
      <g clip-path="url(#lock-h${id}-${i})"><ellipse rx="20" ry="28" fill="${LINJE}"/><circle class="glans" cx="-7" cy="-12" r="7" fill="#fff"/><circle class="glans2" cx="7" cy="11" r="4" fill="#fff"/></g>
      <path class="lock" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/></g>
      <path class="glad" d="M-24 7 Q0 -21 24 7" fill="none" stroke="${LINJE}" stroke-width="7" stroke-linecap="round"/>
      <path class="sov" d="M-22 -2 Q0 16 22 -2" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>
      <path class="bryn" d="M-18 3 Q0 -7 18 3" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <g class="munnen"><ellipse class="mun" fill="${MUNFARG}"/>
    <path class="le" fill="none" stroke="${MUNLINJE}" stroke-width="6" stroke-linecap="round"/></g>
    </g></g>${del('leg-l')}${del('leg-r')}${del('arm-l', 'arm-l-fram')}${del('arm-r', 'arm-r-fram')}</g>`;
  // Armarna framför kroppen (klappen, magen) är humle-arm-*-fram.png: roten saknar vit kant och smälter in i kroppens krita.
  parent.appendChild(g);
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
  q('.figuren').setAttribute('transform', `translate(${p.x} ${p.lyft}) rotate(${f.luta + p.luta + 2 * r} 512 ${FOTTER})`);
  const hojd = Math.min(1, -p.lyft / 220) * (1 - p.ligg);   // ligger: lyftet är bara för att få upp kroppen på marken, skuggan är kvar
  q('.skugga').setAttribute('rx', 280 * (1 - 0.4 * hojd) + 90 * p.ligg); q('.skugga').setAttribute('cx', 512 + p.x - 300 * p.ligg); q('.skugga').setAttribute('opacity', 0.1 * (1 - 0.3 * hojd));
  q('.kropp').setAttribute('transform', `translate(0 ${sank}) translate(512 ${FOTTER}) scale(${sx} ${sy}) translate(-512 ${-FOTTER})`);

  // Riktningsposen (som i bil-test.html): kroppen framifrån, ansiktet glider ~36 px åt sidan, smalnar och lutar,
  // öronen lutar dit, och båda armarna kommer ut på den sidan: den närmre lite högre, kopian 85 px under.
  // Den bortre armen glider in bakom kroppen (vriden skulle dess rot sticka ut på andra sidan) och kopian glider ut
  // bakom kroppen på den närmre sidan: armarna åker in och ut, de tonar aldrig.
  const nara = n => (n === 'l') === (sida < 0);
  // Antennerna som öron: följer huvudet åt sidan i riktningsposen och lutar dit, oron + hänger utåt. Vingarna surrar (vinge).
  const or = [f.oron[0] + p.oron[0], f.oron[1] + p.oron[1]];
  del('antenn-l', 11 * r - 0.5 * or[0], 22 * r, lyft(RIGG['antenn-l'][1]) + 4 * a - 10 * u);
  del('antenn-r', 11 * r + 0.5 * or[1], 22 * r, lyft(RIGG['antenn-r'][1]) + 4 * a - 10 * u);
  del('wing-l', p.vinge, 0, lyft(RIGG['wing-l'][1])); del('wing-r', -p.vinge, 0, lyft(RIGG['wing-r'][1]));
  ['l', 'r'].forEach((n, i) => { const s = i ? -1 : 1, vinkel = s * (f.armar[i] + p.armar[i]), y0 = lyft(RIGG['arm-' + n][1]) + 20 * p.fram[i];
    const dx = s * (p.klapp || 70 * p.fram[i]);    // framför kroppen: händerna in på magen (eller ihop, klapp)
    if (p.gang > 0) {     // gången (som förebilden): bakre armen framför kroppen ut över kanten, främre armen tittar fram, de pendlar i otakt
      const sd = sida || 1, bak = (n === 'l') === (sd > 0), g = p.gang;
      const [tv, tdx, tdy] = bak ? [sd * (-18 + 14 * p.sving), sd * 55, 20] : [sd * (-10 - 14 * p.sving), -sd * 60, 10];
      del('arm-' + n, mix(vinkel, tv, g), mix(dx, tdx, g), y0 + tdy * g);
      alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', (bak && g > 0.5) === (j === 1) ? 1 : 0));
      q('.arm-' + n + '2').setAttribute('opacity', 0); return; }
    const IN = 200;                                   // så långt in bakom kroppen en arm göms (figurens px)
    if (nara(n)) { del('arm-' + n, vinkel, dx, y0 - 45 * a); del('arm-' + n + '2', vinkel - s * 16 * a, dx + s * (10 * a + IN * (1 - a)), y0 + 40 * a); }
    else del('arm-' + n, vinkel, dx + s * IN * a, y0);
    const syns = nara(n) || a < 0.98 ? 1 : 0;
    // Armen framför kroppen (rot utan kant) först när den nästan är på plats, annars syns roten när den glider ut över kanten.
    alla('.arm-' + n).forEach((e, j) => e.setAttribute('opacity', ((p.fram[i] > 0.85) === (j === 1) ? 1 : 0) * syns));
    q('.arm-' + n + '2').setAttribute('opacity', nara(n) && a > 0 ? 1 : 0); });
  const lager = (n, fram) => alla('.' + n).forEach((e, j) => e.setAttribute('opacity', (fram > 0.5) === (j === 1) ? 1 : 0));
  lager('leg-l', p.benFram); lager('leg-r', p.benFram);
  del('leg-l', p.ben[0], 0, sank + p.benY[0], [1, 1 + p.benS[0]]);
  del('leg-r', -p.ben[1], 0, sank + p.benY[1], [1, 1 + p.benS[1]]);

  // Hela ansiktet glider med riktningen och blicken. Humlan har ingen magfläck.
  const fx = 36 * r, fy = 4 * a - 10 * u;
  q('.drag').setAttribute('transform', `translate(${fx} ${fy}) rotate(${5 * r} 512 430) translate(512 430) scale(${1 - 0.08 * a} 1) translate(-512 -430)`);
  const ogon = alla('.oga'), lock = alla('.lock'), klipp = alla('.lockklipp'), glad = alla('.glad'), bryn = alla('.bryn'), sov = alla('.sov');
  OGON.forEach(([x, y], i) => {
    const dy = f.ogonY - 4 * u;               // ögonen följer blicken lite mer än resten av ansiktet
    ogon[i].setAttribute('transform', `translate(${x + f.titt[0]} ${y + dy + f.titt[1]}) scale(${f.ogonS[0]} ${f.ogonS[1]})`);
    ogon[i].setAttribute('opacity', (1 - f.glad[i]) * (1 - f.sov));
    alla('.glans')[i].setAttribute('r', 7 + 2.5 * f.glans); alla('.glans')[i].setAttribute('cx', -7 - 1.5 * f.glans);
    alla('.glans2')[i].setAttribute('opacity', f.glans);
    sov[i].setAttribute('transform', `translate(${x} ${y + dy})`);
    sov[i].setAttribute('opacity', f.sov);
    // Locket: en böjd kant som både klipper ögat och ritas som linje, så att det inte blir hörn.
    const ly = -30 + f.lock[i] * 46, w = 21 * Math.sqrt(Math.max(0, 1 - (ly / 29) ** 2));
    klipp[i].setAttribute('d', `M-40 ${ly} H${-w} Q0 ${ly + 8} ${w} ${ly} H40 V60 H-40Z`);
    lock[i].setAttribute('d', `M${-w} ${ly} Q0 ${ly + 8} ${w} ${ly}`);
    lock[i].setAttribute('opacity', Math.min(1, f.lock[i] * 8));
    glad[i].setAttribute('transform', `translate(${x} ${y + dy})`);
    glad[i].setAttribute('opacity', f.glad[i]);
    const s = i ? 1 : -1;                     // inre änden upp: vänster bryn moturs, höger medurs
    bryn[i].setAttribute('transform', `translate(${x} ${y - 58 + f.brynY[i] + dy}) rotate(${s * f.brynV})`);
    bryn[i].setAttribute('opacity', f.bryn);
  });
  alla('.kind').forEach(c => c.setAttribute('opacity', f.kind));

  // Munnen: ett leende (som konsten, 489–537 vid y 440) och en öppen mun (ellips) som tar över när mun öppnas.
  const cx = 513 + f.leX, b = f.leBred, le = f.le, [mrx, mry] = f.mun;
  q('.le').setAttribute('d', `M${cx - 26 * b} 438 Q${cx} ${438 + 22 * le} ${cx + 26 * b} 438`);
  q('.le').setAttribute('opacity', f.streck);
  const m = q('.mun'); m.setAttribute('cx', cx); m.setAttribute('cy', 448);
  m.setAttribute('rx', Math.max(0.01, mrx)); m.setAttribute('ry', Math.max(0.01, 0.8 * mry)); m.setAttribute('opacity', mry > 1 ? 1 : 0);
}

// I avsnitt: ansikte('glad', 0.5) blandar halvvägs från neutral, pose('hurra', k) likadant för kroppen. De två går ihop.
// namn kan också vara ett objekt från blanda(a, b, k) / blandaPose(a, b, k). fig är vilken humla (standard: den första på sidan).
const forsta = () => document.querySelector('#figurer > g');
function ansikte(namn, k = 1, fig = forsta()) { fig.ansikte = blanda('neutral', namn, k); rita(fig, fig.ansikte, fig.pose); }
function pose(namn, k = 1, fig = forsta()) { fig.pose = blandaPose('neutral', namn, k); rita(fig, fig.ansikte || param('neutral'), fig.pose); }
// riktning('vanster' | 'hoger', k): riktningsposen ovanpå posen, k 0–1. riktning(null) tar bort den.
function riktning(sida, k = 1, fig = forsta()) { fig.riktning = sida ? (sida === 'hoger' ? 1 : -1) * k : 0;
  rita(fig, fig.ansikte || param('neutral'), fig.pose || POSE0); }
// Rörelser: hela uttryck + pose räknas ur t (sekunder), så att en film kan renderas bild för bild.
// rorelse('klappa' | 'hoppa' | 'dansa' | 'ga', t, fig). Loopar: klappa 3 s, hoppa 2,4 s, dansa 4 s, ga 8 s.
const P = o => ({ ...POSE0, ...o }), kl = (a, b, x) => Math.max(a, Math.min(b, x));
const blinka = (f, t, period = 3.1) => (t % period) < 0.12 ? { ...f, lock: [1, 1] } : f;
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
    // Kycklingens vingar är för korta för att mötas: vingspetsarna klappar på magen vid kroppens kanter.
    return [blinka(f, t), P({ fram: [in_, in_], armar: mix([0, 0], [-95 + 26 * c, -95 + 26 * c], in_),
      klapp: in_ * (40 - 16 * c), strack: -0.025 * smack, bred: 0.02 * smack, lyft: 6 * smack, oron: [4 * smack, 4 * smack],
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
      oron: [ora, ora], svans: Math.sin(t * 3) * 3, vinge: l >= 0 ? 14 * Math.sin(t * 2 * Math.PI * 12) : 0 })];
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
      oron: [6 * eft, -6 * eft], svans: 14 * Math.sin(2 * fi) * in_, vinge: 10 * Math.sin(t * 2 * Math.PI * 8) * in_ })];
  },
  ligga: t => {       // ligger på magen med hakan på vingarna och sover (vald 2026-11-07): samma andetag som sova
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'liggMage', 1), strack: -0.3 + 0.02 * a, bred: 0.18 + 0.015 * a }];
  },
  surra: t => {       // flyger på stället: lyfter, vingarna surrar, benen hänger, svävar upp och ner
    const in_ = mjuk(kl(0, 1, (t % 4) / 0.5)) * mjuk(kl(0, 1, (4 - t % 4) / 0.5));
    return [blinka(blanda('neutral', 'glad', in_), t), P({ lyft: -120 * in_ + 12 * Math.sin(t * 2 * Math.PI * 0.8) * in_,
      vinge: in_ * (8 + 16 * Math.sin(t * 2 * Math.PI * 12)), benY: [-10 * in_, -10 * in_], ben: [-6 * in_, -6 * in_], armar: [14 * in_, 14 * in_] })];
  },
  sova: t => {        // sover: lugna andetag (4 s per andetag), magen höjs och breddas lite, antennerna följer med
    const a = (1 - Math.cos(2 * Math.PI * t / 4)) / 2;
    return [{ ...param('sover') }, { ...blandaPose('neutral', 'sover', 1), strack: -0.03 + 0.02 * a, bred: 0.04 + 0.012 * a,
      oron: [10 - 3 * a, 10 - 3 * a], upp: -0.6 + 0.08 * a }];
  },
};
window.v2riggar['humlan-humle'] = { figur, rita, blanda, blandaPose, param, UTTRYCK, POSE0, POSER, ROR, RIGG, FOTTER,
  PIV: {l: [240, 566], r: [784, 566]}, VILA: {l: 138.7, r: 41.6}, ARM: {l: 89, r: 88}, BBOX: [162, 122, 861, 934] };
})();
// ---- fjarilen-fia (assets/karaktarer/fjarilen-fia/premium/uttryck.html, rad 31–182) ----
(() => {
const CUT = kit.ROT + 'assets/karaktarer/fjarilen-fia/premium/cut/' + (window.V2_CUT?.['fjarilen-fia'] || '');   // provbänk: window.V2_CUT = { mapp: 'slat/0.7/' }
const mjuk = k => k * k * (3 - 2 * k);   // ROR använder den (står längre ner i uttryck.html)
const RIGG = { 'wing-l': [440, 558], 'wing-r': [584, 551] };
// Uppmätt ur original/fia-platt.png mot fia-faceless.png (ansikte_matt.py). Huvudet är smalt (235 px vid ögonen), så allt är lite mindre än Bulles.
const OGON = [[457, 411], [566, 410]], KINDER = [[436, 453], [587, 452]], FOTTER = 800, KROPP = 753, MUN = [514, 448];
const LINJE = '#2a1d1a', MUNLINJE = '#2a1d1a', MUNFARG = '#7a2a1c', KIND = '#ec8f96';

// Alla uttryck har samma parametrar, så att de går att blanda (som Bulle). Det som inte anges är neutralt.
// ogonS [sx, sy] · titt [x, y] · ogonY · glad [v, h] öga → ^-båge · lock [v, h] · bryn · brynY [v, h] · brynV · kind · le 1 … −1 · leBred · leX
// streck leendets synlighet · mun [rx, ry, d, cy] öppen mun · vingar [v, h] vingarna upp (+) i grader · luta i grader · strack kroppen sträcks
// sov 0–1 slutna u-bågar. armar finns kvar (oanvänd) så att v2.js kan sätta den.
const NEUTRAL = { sov: 0, ogonS: [1, 1], titt: [0, 0], ogonY: 0, glad: [0, 0], lock: [0, 0], bryn: 0, brynY: [0, 0], brynV: 0,
  kind: 0.75, le: 1, leBred: 1, leX: 0, streck: 1, mun: [0, 0, 0, 452], vingar: [0, 0], armar: [8, 8], luta: 0, strack: 1 };

const UTTRYCK = {
  neutral:   { namn: 'neutral' },
  glad:      { namn: 'glad', kind: 1, le: 1.3, leBred: 1.15, ogonY: -2, vingar: [4, 4] },
  jatteglad: { namn: 'jätteglad', glad: [1, 1], kind: 1, streck: 0, mun: [17, 15, 1, 446], vingar: [12, 12], strack: 1.03 },
  forvanad:  { namn: 'förvånad', ogonS: [1.2, 1.16], bryn: 1, brynY: [-10, -10], kind: 0.6, streck: 0, mun: [7, 9, 0, 454], vingar: [8, 8], strack: 1.04 },
  nyfiken:   { namn: 'nyfiken', titt: [9, -2], bryn: 0.9, brynY: [0, -7], le: 0.6, leBred: 0.8, leX: 3, luta: 5 },
  tanker:    { namn: 'tänker', titt: [-6, -10], bryn: 0.9, brynY: [-8, 0], le: 0.4, leBred: 0.55, leX: 8, luta: -3 },
  ledsen:    { namn: 'lite ledsen', titt: [0, 4], ogonS: [0.95, 0.95], bryn: 1, brynY: [4, 4], brynV: 24,
               kind: 0.55, le: -0.7, leBred: 0.75, vingar: [-8, -8], luta: 2, strack: 0.97 },
  sover:     { namn: 'sover', sov: 1, ogonY: 3, kind: 0.85, le: 0.5, leBred: 0.7, vingar: [-6, -6], strack: 0.97 },
  somnig:    { namn: 'sömnig', titt: [0, 3], lock: [0.66, 0.66], kind: 0.7, streck: 0, mun: [8, 10, 0, 456], vingar: [-5, -5], luta: 3, strack: 0.97 },
  fnissig:   { namn: 'fnissig', glad: [1, 1], kind: 1, streck: 0, mun: [8, 7, 1, 446], leX: 3, vingar: [6, 6], luta: 4, strack: 0.98 },
  blinkar:   { namn: 'blinkar', glad: [0, 1], kind: 1, le: 1.3, leBred: 1.1, leX: 4, vingar: [0, 8], luta: -3 },
  stolt:     { namn: 'stolt', glad: [1, 1], ogonY: -6, kind: 1, le: 1.2, leBred: 1.1, vingar: [6, 6], strack: 1.04 },
};

// Poser: kropp och vingar, läggs ovanpå uttrycket. luta (grader, kring fötterna) · rikt −1 … 1 riktningspose (ansiktet glider dit,
// den bortre vingen trycks ihop lite) · upp −1 … 1 tittar upp/ner · bred · strack · sank kroppen ner (+) · vingar [v, h] upp (+) i grader
// vinge [v, h] vingen ihopfälld 0 (öppen) … 1 (kant mot tittaren) · lyft hela figuren upp (−) i px, skuggan krymper · x åt sidan i px
const POSE0 = { luta: 0, rikt: 0, upp: 0, bred: 0, strack: 0, sank: 0, vingar: [0, 0], vinge: [0, 0], lyft: 0, x: 0 };
const POSER = {
  neutral:   { namn: 'neutral' },
  lutaV:     { namn: 'lutar vänster', luta: -6, vingar: [6, -4] },
  lutaH:     { namn: 'lutar höger', luta: 6, vingar: [-4, 6] },
  vanster:   { namn: 'riktning vänster', rikt: -1 },
  hoger:     { namn: 'riktning höger', rikt: 1 },
  upp:       { namn: 'tittar upp', upp: 1, strack: 0.02 },
  ner:       { namn: 'tittar ner', upp: -1, strack: -0.02, vingar: [-4, -4] },
  oppen:     { namn: 'vingarna uppe', vingar: [16, 16], strack: 0.02 },
  stangd:    { namn: 'vingarna ihop', vinge: [0.75, 0.75] },
  hurra:     { namn: 'hurra', vingar: [24, 24], strack: 0.04, lyft: -30 },
  blyg:      { namn: 'blyg', vinge: [0.5, 0.5], vingar: [-8, -8], bred: -0.03, luta: -4, upp: -0.4 },
  vilar:     { namn: 'vilar', vinge: [0.3, 0.3], vingar: [-4, -4], sank: 6 },
};

const mix = (a, b, k) => Array.isArray(a) ? a.map((v, i) => mix(v, b[i], k)) : a + (b - a) * k;
const fyll = (N, T, u) => typeof u === 'string' ? { ...N, ...T[u] } : { ...N, ...u };
const blandare = (N, T) => (a, b, k) => { const A = fyll(N, T, a), B = fyll(N, T, b), ut = {};
  for (const n in N) ut[n] = mix(A[n] ?? N[n], B[n] ?? N[n], Math.max(0, Math.min(1, k))); return ut; };
const blanda = blandare(NEUTRAL, UTTRYCK), blandaPose = blandare(POSE0, POSER), param = u => fyll(NEUTRAL, UTTRYCK, u);

function figur(x, y, skala, parent) {                 // en Fia med vingarnas underkant i (x, y)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), id = Math.floor(Math.random() * 1e9);
  const del = n => `<image class="${n}" href="${CUT}fia-${n}.png" width="1024" height="1024"/>`;
  g.setAttribute('transform', `translate(${x} ${y}) scale(${skala}) translate(-512 ${-FOTTER})`);
  g.innerHTML = `<ellipse class="skugga" cx="512" cy="${FOTTER - 10}" rx="220" ry="26" fill="#000" opacity="0.1"/>
    <g class="figuren">${del('wing-l')}${del('wing-r')}
    <g class="kropp"><image href="${CUT}fia-body.png" width="1024" height="1024"/>
    <g class="drag">
    ${KINDER.map(([x, y]) => `<ellipse class="kind" cx="${x}" cy="${y}" rx="24" ry="15" fill="${KIND}"/>`).join('')}
    ${OGON.map((_, i) => `<g class="oga">
      <clipPath id="fialock-${id}-${i}"><path class="lockklipp" d="M-36 -23 H36 V50 H-36Z"/></clipPath>
      <g clip-path="url(#fialock-${id}-${i})"><ellipse rx="16" ry="22" fill="${LINJE}"/><circle cx="-5" cy="-9" r="5.5" fill="#fff"/></g>
      <path class="lock" fill="none" stroke="${LINJE}" stroke-width="5" stroke-linecap="round"/></g>
      <path class="glad" d="M-17 5 Q0 -15 17 5" fill="none" stroke="${LINJE}" stroke-width="6" stroke-linecap="round"/>
      <path class="sov" d="M-16 -2 Q0 12 16 -2" fill="none" stroke="${LINJE}" stroke-width="5" stroke-linecap="round"/>
      <path class="bryn" d="M-14 3 Q0 -5 14 3" fill="none" stroke="${LINJE}" stroke-width="5" stroke-linecap="round"/>`).join('')}
    <g class="munnen"><path class="mun" fill="${MUNFARG}"/>
    <path class="le" fill="none" stroke="${MUNLINJE}" stroke-width="5" stroke-linecap="round"/></g>
    </g></g></g>`;
  parent.appendChild(g);
  return g;
}

function rita(fig, f, p = POSE0) {
  const q = s => fig.querySelector(s), alla = s => [...fig.querySelectorAll(s)];
  const r = Math.max(-1, Math.min(1, (p.rikt || 0) + (fig.riktning || 0))), a = Math.abs(r);
  const u = p.upp || 0, sx = 1 + (p.bred || 0), sy = f.strack + (p.strack || 0), sank = p.sank || 0;
  const vinge = p.vinge || [0, 0], vingar = p.vingar || [0, 0];
  q('.figuren').setAttribute('transform', `translate(${p.x || 0} ${p.lyft || 0}) rotate(${f.luta + (p.luta || 0) + 3 * r} 512 ${FOTTER})`);
  const hojd = Math.min(1, -(p.lyft || 0) / 300), sk = q('.skugga');
  sk.setAttribute('rx', 220 * (1 - 0.5 * hojd)); sk.setAttribute('cx', 512 + (p.x || 0)); sk.setAttribute('opacity', 0.1 * (1 - 0.6 * hojd));
  q('.kropp').setAttribute('transform', `translate(0 ${sank}) translate(512 ${KROPP}) scale(${sx} ${sy}) translate(-512 ${-KROPP})`);
  // Vingarna: vrids upp (+) kring roten och trycks ihop mot vridlinjen (vinge 1 = kanten mot tittaren). I riktningsposen trycks den
  // bortre vingen ihop till 0,7 och den närmre lyfts lite, så att hon ser ut att vända sig dit utan att vändas.
  ['l', 'r'].forEach((n, i) => { const [x, y] = RIGG['wing-' + n], s = i ? -1 : 1, bort = (n === 'l') === (r > 0);
    const ihop = Math.min(0.92, vinge[i] + (bort ? 0.3 * a : 0)), grader = s * (f.vingar[i] + vingar[i] + (bort ? 0 : 6 * a));
    const dx = (sx - 1) * (x - 512) + 14 * r, dy = -(sy - 1) * (KROPP - y) + sank;
    q('.wing-' + n).setAttribute('transform', `translate(${dx} ${dy}) rotate(${grader} ${x} ${y}) translate(${x} ${y}) scale(${1 - ihop} ${1 - 0.06 * ihop}) translate(${-x} ${-y})`); });

  // Ansiktet glider med riktningen (huvudet är smalt: 18 px) och blicken, smalnar och lutar.
  const fx = 18 * r, fy = 3 * a - 8 * u;
  q('.drag').setAttribute('transform', `translate(${fx} ${fy}) rotate(${5 * r} 512 430) translate(512 430) scale(${1 - 0.08 * a} 1) translate(-512 -430)`);
  const ogon = alla('.oga'), lock = alla('.lock'), klipp = alla('.lockklipp'), glad = alla('.glad'), bryn = alla('.bryn'), sov = alla('.sov');
  OGON.forEach(([x, y], i) => {
    const dy = f.ogonY - 3 * u;
    ogon[i].setAttribute('transform', `translate(${x + f.titt[0]} ${y + dy + f.titt[1]}) scale(${f.ogonS[0]} ${f.ogonS[1]})`);
    ogon[i].setAttribute('opacity', (1 - f.glad[i]) * (1 - f.sov));
    sov[i].setAttribute('transform', `translate(${x} ${y + dy})`); sov[i].setAttribute('opacity', f.sov);
    const ly = -23 + f.lock[i] * 36, w = 15 * Math.sqrt(Math.max(0, 1 - (ly / 22) ** 2));
    klipp[i].setAttribute('d', `M-36 ${ly} H${-w} Q0 ${ly + 7} ${w} ${ly} H36 V50 H-36Z`);
    lock[i].setAttribute('d', `M${-w} ${ly} Q0 ${ly + 7} ${w} ${ly}`);
    lock[i].setAttribute('opacity', Math.min(1, f.lock[i] * 8));
    glad[i].setAttribute('transform', `translate(${x} ${y + dy})`); glad[i].setAttribute('opacity', f.glad[i]);
    bryn[i].setAttribute('transform', `translate(${x} ${y - 42 + f.brynY[i] + dy}) rotate(${(i ? 1 : -1) * f.brynV})`);
    bryn[i].setAttribute('opacity', f.bryn);
  });
  alla('.kind').forEach(c => c.setAttribute('opacity', f.kind));
  // Fias mun: bara en båge (ingen nos), uppmätt mitt (514, 448), 48 px bred.
  const cx = MUN[0] + f.leX, b = f.leBred, le = f.le, ey = MUN[1] - 8 * le;
  q('.le').setAttribute('d', `M${cx - 24 * b} ${ey} Q${cx} ${ey + 28 * le} ${cx + 24 * b} ${ey}`);
  q('.le').setAttribute('opacity', f.streck);
  const [rx, ry, d, my] = f.mun, h = ry * 4 / 3, topp = h * (1 - d);
  q('.mun').setAttribute('d', `M${cx - rx} ${my} C${cx - rx} ${my - topp} ${cx + rx} ${my - topp} ${cx + rx} ${my}
    C${cx + rx} ${my + h} ${cx - rx} ${my + h} ${cx - rx} ${my}Z`);
}

const forsta = () => document.querySelector('#figurer > g');
function ansikte(namn, k = 1, fig = forsta()) { fig.ansikte = blanda('neutral', namn, k); rita(fig, fig.ansikte, fig.pose); }
function pose(namn, k = 1, fig = forsta()) { fig.pose = blandaPose('neutral', namn, k); rita(fig, fig.ansikte || param('neutral'), fig.pose); }
function riktning(sida, k = 1, fig = forsta()) { fig.riktning = sida ? (sida === 'hoger' ? 1 : -1) * k : 0;
  rita(fig, fig.ansikte || param('neutral'), fig.pose || POSE0); }
// Rörelser: uttryck + pose räknas ur t (sekunder). rorelse('flaxa' | 'flyga' | 'vila' | 'dansa', t, fig).
const P = o => ({ ...POSE0, ...o }), kl = (a, b, x) => Math.max(a, Math.min(b, x));
const blinka = (f, t, period = 3.1) => (t % period) < 0.12 ? { ...f, lock: [1, 1] } : f;
// Ett vingslag (t sekunder, hz slag per sekund, amp 0–1): vingarna trycks ihop och lyfts på uppslaget, kroppen guppar upp på nedslaget.
const slag = (t, hz = 3, amp = 1) => { const c = Math.cos(2 * Math.PI * hz * t);   // 1 = vingarna öppna nere, −1 = ihop uppe
  return { vinge: [0.62 * amp * (1 - c) / 2, 0.62 * amp * (1 - c) / 2], vingar: [14 * amp * (1 - c) / 2, 14 * amp * (1 - c) / 2],
    gupp: -10 * amp * Math.sin(2 * Math.PI * hz * t - 0.6) }; };
const ROR = {
  flaxa: t => {       // svävar på stället: tre slag i sekunden, guppar, lite glad
    const s = slag(t);
    return [blinka(param('glad'), t), P({ vinge: s.vinge, vingar: s.vingar, lyft: -60 + s.gupp, luta: 2 * Math.sin(t * 2.1) })];
  },
  flyga: t => {       // flyger fram och tillbaka (8 s) i en mjuk våg, tittar åt flyghållet
    const T = t % 8, fas = T / 8 * 2 * Math.PI, fart = Math.cos(fas), s = slag(t, 3.2);
    return [blinka({ ...blanda('neutral', 'glad', 0.7), titt: [5 * Math.sign(fart), 0] }, t),
      P({ x: 520 * Math.sin(fas), lyft: -110 - 50 * Math.sin(2 * fas) + s.gupp, rikt: kl(-1, 1, fart * 1.6),
        luta: 6 * fart, vinge: s.vinge, vingar: s.vingar })];
  },
  vila: t => {        // sitter still och fäller vingarna sakta ihop och isär (ett slag var 3:e s)
    const c = (1 - Math.cos(2 * Math.PI * t / 3)) / 2;
    return [blinka(param('glad'), t), P({ vinge: [0.15 + 0.5 * c, 0.15 + 0.5 * c], vingar: [-4 + 6 * c, -4 + 6 * c] })];
  },
  dansa: t => {       // gungar i takt i luften (1 s per gung), flaxar snabbt och glatt
    const T = t % 4, in_ = mjuk(kl(0, 1, T / 0.4)) * mjuk(kl(0, 1, (4 - T) / 0.4)), fi = 2 * Math.PI * T, s = slag(t, 3.5);
    return [blinka(blanda('glad', 'jatteglad', in_), t), P({ luta: 8 * Math.sin(fi) * in_, x: 40 * Math.sin(fi) * in_,
      lyft: -70 - 20 * Math.abs(Math.sin(fi)) * in_ + s.gupp, vinge: s.vinge, vingar: s.vingar })];
  },
};
window.v2riggar['fjarilen-fia'] = { figur, rita, blanda, blandaPose, param, UTTRYCK, POSE0, POSER, ROR, RIGG, FOTTER,
  PIV: {l: [440, 558], r: [584, 551]}, VILA: {l: 180, r: 0}, ARM: {l: 0, r: 0}, BBOX: [109, 181, 912, 814] };
})();
