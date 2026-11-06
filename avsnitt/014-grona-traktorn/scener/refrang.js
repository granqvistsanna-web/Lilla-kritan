// Refrängen i 014 (05a–h, 09a–g): Ärtresan, likadan båda gångerna (README "Refrängen: Ärtresan", REFRÄNG_TEXT och refräng_bild()
// i bygg.py). Allt i kod: den stora skidan ritas i kod (i_skidan()), ärtan på taket är artskida-arta-1, lampan är trafikljus.js.
// Läses in efter kit.js, verktyg/kant.js, ansikten.js, traktorn.js och trafikljus.js (och kritsvep.js när refrängen har en h).
// Tiderna ur storyboarden (M.bild) och rader.txt (M.rad, ekona ur radens egna tider i parentes, "0:39.1  Grönt! (0:40.0 Grönt!)").
//   a, b  "Grönt! (Grönt!)" ×2      vägen blir en brun åker: armarna upp, traktorn skumpar, en grön grodd växer upp per "Grönt!" (fyra)
//   c  "Grönt betyder kör!"          ett stort trafikljus poppar upp och lyser grönt på "kör" (pling), åkern grönskar (sex större
//                                    groddar), traktorn far iväg (inga fartstreck: formatet)
//   d, e  "Grönt! (Grönt!)" ×2      klipp in i den jättestora öppna skidan: traktorn kör längs den, ärtorna hoppar en i taget (en per
//                                    "Grönt!", alla tre på sista ekot)
//   f  "Grön som en liten ärta!"     närbild: en ärta studsar upp på taket, Lova tittar upp och fnissar, ärtan blinkar, glimtar
//   g  "Putt, putt, tut, tut –"      skidan lutar som en rutschkana: traktorn glider ner, en puff per putt, högertassen tutar på rattens
//                                    knapp och ärtorna rullar efter på tut
//   h  "vad är grönt? Titta ut!"     (bara 05h) vid bild, skidan stänger sig, Lova spanar åt båda hållen, ett grönt kritsvep hem
//                                    till vägen (traktorn i körscenen, där vagen-2 börjar). 09 har ingen h: busshållplatsens kritsvep tar vid.
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, bil)                        // L = kit.duk(...) efter kit.vag, bil = scenens traktor (traktorn.ny)
//   r.rita(t)                                   // null utanför refrängen, annars bildens bokstav; poserar traktorn och kameran
//   r.DANS                                      // traktorns pose i körscenen { x, y, h } (där refrängen börjar och slutar)
//   r.zipp                                      // dragkedjans handtag (vagen-1: 0)
(() => {
const { el, bild, mjuk, inUt, over, del, lerp, clamp, W, H, ROT } = kit;
const UPP = { r: [1500, -700], l: [-480, -700] }, FRAM = [3000, 450], OGON_R = [600, 380];   // bygg.py UPP_R/L, FRAM, ÖGON_R
const SK = `${ROT}assets/rekvisita/artskida/cut/artskida-`;
const ARTOR = [[397, 476, 112], [550, 469, 116], [702, 460, 106]];   // artskida-rigg.json: mitt och höjd i skidans 1024-ruta
const ARTA_ANSIKTE = { ogon: [[375, 466], [419, 466]], ogonSkala: 0.32, mun: [397, 494], munSkala: 0.38 };   // i ärtans 1024-ruta
const SK_KANT = 455, SK_Y = 0.62 * H;               // stängda skidans bild (h) och där den stora skidans öppning hamnar i bild
const SK_B = 0.86 * W, SK_HH = 0.24 * H, ART_T = [0.5, 0.65, 0.8];   // den stora skidan i kod (i_skidan() i bygg.py): bredd, halva höjden, ärtorna
const SKAL = '#7AB440', INNE = '#C8DE8E', SOM = '#588E32', ART_LJ = '#80C446';   // ljus insida och mellangröna ärtor (som bygg.py), så att traktorn syns
const LUT = 10, TAN = Math.tan(LUT * Math.PI / 180);   // rutschkanan (g)
const GRODD_X = [790, 1260, 960, 1120, 690, 1340];   // groddarna i den ordning de växer (en per "Grönt!"), åker() och groddar() i bygg.py
const LJUS = { x: 1150, fot: 600, h: 470 };
const GRON = '#3FA34D', ART_G = '#8CCB4E', HIMMEL = '#A8DCF2', JORD = '#7A5234', FARA = '#5C3C26';
const stjarnaD = r => { const k = r * 0.28; return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };

// skidformen (_lins() i bygg.py): spetsiga ändar som böjer upp lite; upp/ner = hur långt kanterna går från y0 på mitten
const lins = (cx, y0, upp, ner, n = 60) => {
  const topp = [], botten = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, f = Math.sin(Math.PI * t) ** 0.7, x = cx + (t - 0.5) * SK_B, lyft = 50 * (2 * t - 1) ** 2;
    topp.push([x, y0 - upp * f - lyft]); botten.push([x, y0 + ner * f - lyft]);
  }
  return { topp, botten, d: 'M' + [...topp, ...botten.reverse()].map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z' };
};
const skidX = t => [W / 2 + (t - 0.5) * SK_B, 50 * (2 * t - 1) ** 2];   // skid_x(): x och hur mycket ändarna böjer upp
// en ärta i kod med ansikte (ärtansikte() i bygg.py): två prickögon, ett leende och en vit glans; r = radien; kant = vit kant bakom
function kodArta(parent, r) {
  const g = el('g', {}, parent);
  const kant = el('circle', { r: r + 6, fill: '#fff' }, g);
  el('circle', { r, fill: ART_LJ, filter: 'url(#kritkant)' }, g);
  for (const dx of [-0.3, 0.3]) el('ellipse', { cx: dx * r, cy: -0.12 * r, rx: 0.09 * r, ry: 0.11 * r, fill: '#302822' }, g);
  el('path', { d: `M${-0.26 * r} ${0.15 * r}Q0 ${0.42 * r} ${0.26 * r} ${0.15 * r}`, fill: 'none', stroke: '#302822', 'stroke-width': Math.max(3, 0.07 * r), 'stroke-linecap': 'round' }, g);
  el('ellipse', { cx: -0.45 * r, cy: -0.51 * r, rx: 0.17 * r, ry: 0.15 * r, fill: '#fff', opacity: 0.7 }, g);
  return { g, pose: (x, y, kantPa = false, syns = true) => { g.style.display = syns ? '' : 'none'; kant.style.display = kantPa ? '' : 'none'; g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); } };
}
// en grön grodd (grodd() i bygg.py): två blad på en stjälk, klistermärke; foten i (0, 0), höjden 1
function grodd(parent) {
  const g = el('g', {}, parent), i = el('g', { transform: 'scale(0.00667) translate(-101 -190)' }, g);   // grodd-rutan 22..180 × 40..190
  el('path', { d: 'M100 190V95', stroke: ART_G, 'stroke-width': 14, 'stroke-linecap': 'round' }, i);
  el('ellipse', { cx: 61, cy: 75, rx: 39, ry: 25, fill: ART_G }, i);
  el('ellipse', { cx: 140, cy: 66, rx: 40, ry: 26, fill: ART_G }, i);
  window.kant?.lagg(g, { andel: 0.01 });
  return { g, pose: (x, y, h) => { g.style.display = h > 0.5 ? '' : 'none'; g.setAttribute('transform', `translate(${x} ${y}) scale(${Math.max(0.001, h).toFixed(2)})`); } };
}

// en lös ärta (artskida-arta-n.png) med mitten i (0, 0) och höjden 1; får hela kanten i kod (rigg.json)
function arta(parent, n, ansikte = false) {
  const [mx, my, h] = ARTOR[n], g = el('g', {}, parent);
  const i = el('g', { transform: `scale(${1 / h}) translate(${-mx} ${-my})` }, g);
  bild(`${SK}arta-${n + 1}.png`, i);
  const ans = ansikte ? ansikten.bygg(i, ARTA_ANSIKTE) : null;
  window.kant?.lagg(g, { andel: 0.01 });
  return { g, ans, pose: (x, y, h, { rot = 0, sx = 1, sy = 1 } = {}) => {
    g.style.display = h > 0.5 ? '' : 'none';
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${(h * sx).toFixed(2)} ${(h * sy).toFixed(2)})`);
  } };
}

async function ny(M, n, S) {
  const T = {}, bokst = 'abcdefgh'.split('').filter(k => M.bilder[n + k]);
  bokst.forEach(k => { const [a, b] = M.bild(n + k); T[k] = [S(a), S(b)]; });
  const efter = M.bild(n + 'a')[0] - M.av - 0.1, sc = s => S(s + M.av);
  const rad = text => M.rad(text, { efter });
  const eko = r => { const m = r.text.match(/\((\d+):(\d+(?:\.\d+)?)/); return m ? +m[1] * 60 + +m[2] : r.t + 0.9; };
  const gront = [0, 1, 2, 3].map(i => { const r = M.rader.filter(x => x.t >= efter && /^Grönt!/.test(x.text))[i]; return [sc(r.t), sc(eko(r))]; });
  const kor = rad('Grönt betyder kör'), artr = rad('Grön som en liten ärta'), putt = rad('Putt, putt, tut, tut');
  const steg = Math.min(0.45, (putt.slut - putt.t) / 4);
  const ord = {
    gront,                                                   // [röst, eko] för a, b, d, e
    pop: [...gront[0], ...gront[1]],                         // en grodd i åkern per "Grönt!"
    hopp: [...gront[2], ...gront[3]],                        // ärtorna i skidan
    kor: sc(kor.t + 0.62 * (kor.slut - kor.t)),              // "kör" i slutet av raden (uppskattat)
    landar: sc(artr.t + 1.3),                                // ärtan landar på taket på "ärta" (uppskattat)
    putt: [0, 1].map(i => sc(putt.t + i * steg)), tut: [2, 3].map(i => sc(putt.t + i * steg)),
  };
  if (T.h) { const v = rad('vad är grönt'), ti = rad('Titta ut'); ord.vad = sc(v.t); ord.titta = sc(ti.t); ord.svep = [T.h[1] - 1.0, T.h[1]]; }
  const r = { T, ord, LJUD: [] };
  let bil, TR, himmel, aker, groddar, ljus, skida, skidaFram, skidaArtor, stangd, tag, tak, glitter, framBakom = false, bilG, bilKlipp;

  r.bygg = async (L, traktor) => {
    bil = traktor;
    // ljud: plupp när groddarna poppar upp, tuff-tuff lågt på "putt, putt", tuta-tut på "tut, tut" (knappen trycks samtidigt, rad g)
    [...ord.pop, ord.kor + 0.1].forEach(x => kit.ljud('plupp', x, { vol: 0.18 }));
    ord.putt.forEach(x => kit.ljud('tuff-tuff', x, { vol: 0.12, langd: 0.45, fade: 0.1 }));
    ord.tut.forEach(x => kit.ljud('tuta-tut', x - 0.02, { vol: 0.35 }));
    // traktorn i en egen grupp som klipps längs skidans underkant i d/e, så att inget av den sticker ut under skidan
    bilG = el('g', {}); bil.g.parentNode.insertBefore(bilG, bil.g); bilG.appendChild(bil.g);
    TR = { x: M.matt.TR.x, y: M.matt.TR.gv, h: M.matt.TR.h };
    r.DANS = TR;
    const defs = document.querySelector('svg defs');
    // vägen blir en brun åker (åker() i bygg.py): jord över vägbanan och mörkare vågiga fåror
    aker = el('g', { filter: 'url(#kritkant)' }, L.plate);
    el('rect', { x: -60, y: 572, width: W + 120, height: H, fill: JORD }, aker);
    for (let i = 0, y = 605; y < H + 40; i++, y += 42) {
      let d = ''; for (let x = -60; x < W + 80; x += 40) d += `${d ? 'L' : 'M'}${x} ${(y + 6 * Math.sin(x / 90 + i)).toFixed(1)}`;
      el('path', { d, fill: 'none', stroke: FARA, 'stroke-width': 9, opacity: 0.8 }, aker);
    }
    // himlen i skidan (d–h): täcker vägen
    himmel = el('rect', { x: -W, y: -H, width: 3 * W, height: 3 * H, fill: HIMMEL }, L.plate);
    // den stora skidan i kod (i_skidan() i bygg.py): skalet med stjälken och vit kant → mörka insidan → ärtorna → (traktorn) → främre kanten
    skida = el('g', {}); L.figurer.insertBefore(skida, L.figurer.firstChild);
    const yt = lins(W / 2, SK_Y, 0.55 * SK_HH, SK_HH), x0 = W / 2 - SK_B / 2, ky = SK_Y;
    const skal = el('g', {}, el('g', {}, skida));
    el('path', { d: yt.d, fill: SKAL }, skal);
    el('path', { d: `M${x0 + 10} ${ky - 50}C${x0 - 40} ${ky - 70} ${x0 - 70} ${ky - 130} ${x0 - 25} ${ky - 150}`, fill: 'none', stroke: SKAL, 'stroke-width': 20, 'stroke-linecap': 'round' }, skal);
    skal.setAttribute('filter', 'url(#kritkant)');
    window.kant?.lagg(skal.parentNode, { andel: 0.01 });
    el('path', { d: lins(W / 2, SK_Y, 0.42 * SK_HH, 0.2 * SK_HH).d, fill: INNE, filter: 'url(#kritkant)' }, skida);
    skidaArtor = ART_T.map(() => kodArta(skida, 0.36 * SK_HH));
    bilKlipp = el('clipPath', { id: 'bil-i-skidan', clipPathUnits: 'userSpaceOnUse' }, defs);
    el('path', { d: `M-2000 -2000L${W + 2000} -2000L${W + 2000} ${SK_Y}` + yt.botten.slice().reverse().map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join('') + `L-2000 ${SK_Y}Z` }, bilKlipp);
    skidaFram = el('g', {}); L.figurer.insertBefore(skidaFram, bilG.nextSibling);
    const fr = lins(W / 2, SK_Y + 0.12 * SK_HH, 0.02 * SK_HH, 0.88 * SK_HH);
    el('path', { d: fr.d, fill: SKAL, filter: 'url(#kritkant)' }, skidaFram);
    el('path', { d: 'M' + fr.topp.slice(0, 60).map(([x, y], i) => `${x.toFixed(1)} ${(y + 0.35 * SK_HH * Math.sin(Math.PI * i / 59) ** 0.7).toFixed(1)}`).join('L'), fill: 'none', stroke: SOM, 'stroke-width': 10, 'stroke-linecap': 'round', filter: 'url(#kritkant)' }, skidaFram);
    // den stängda skidan (h)
    stangd = el('g', {}); L.figurer.insertBefore(stangd, L.figurer.firstChild); bild(`${SK}stangd.png`, stangd);
    window.kant?.lagg(stangd, { andel: 0.01 });
    // trafikljuset och groddarna (a–c), framför åkern men bakom traktorn
    ljus = trafikljus.ny(L.figurer); L.figurer.insertBefore(ljus.g, skida.nextSibling);
    groddar = GRODD_X.map(() => grodd(L.figurer)); groddar.forEach(g => L.figurer.insertBefore(g.g, ljus.g.nextSibling));
    tag = [0, 1, 2].map(() => kodArta(L.figurer, 0.36 * SK_HH));
    tak = arta(L.figurer, 0, true);
    glitter = [0, 1, 2].map(() => el('path', { d: stjarnaD(1), fill: '#fff' }, L.figurer));
    if (T.h && window.kritsvep) kit.lager.overst.setAttribute('transform', `translate(${-0.06 * W} ${-0.06 * H}) scale(${1.12 * W / 1920})`);   // kritsvep.js ritar i 1920 × 1080
    // ljud: lågt, sången först
    const LJ = (namn, t, o) => { kit.ljud(namn, t, o); r.LJUD.push(namn); };
    ord.pop.forEach(x => LJ('pop', x + 0.02, { vol: 0.25 }));
    LJ('pling', ord.kor, { vol: 0.3 }); LJ('swoosh', ord.kor + 0.25, { vol: 0.2 });
    ord.hopp.forEach(x => LJ('boing', x, { vol: 0.15 }));
    LJ('fniss', ord.landar + 0.2, { vol: 0.3 }); LJ('glitter', ord.landar, { vol: 0.2 });
    ord.putt.forEach(x => LJ('plupp', x + 0.05, { vol: 0.2 }));
    ord.tut.forEach(x => LJ('tuta-tut', x, { vol: 0.25 }));
    LJ('wiii', T.g[0] + 0.1, { vol: 0.2 });
    if (ord.svep) kritsvep.LJUD.forEach((kk, i) => LJ('skrrrrt-kort', ord.svep[0] + kk / 0.8 * (ord.svep[1] - ord.svep[0]), { variant: i % 4 + 1, vol: 0.4 }));
    traktorn.ljud([...gront.flat(), ...ord.putt]);
  };

  const pulser = (t, tider, langd = 0.45) => tider.reduce((m, x) => Math.max(m, Math.sin(Math.PI * clamp((t - x + 0.08) / langd))), 0);
  const studs = (t, tider) => tider.reduce((a, x) => a + kit.hopp(t, x, x + 0.3, 16, 0.08, 0.15).y, 0);
  const armarUpp = (t, [rost, ek]) => {   // "Grönt! (Grönt!)": armarna upp, en liten extra sträckning per "Grönt!"
    const pump = pulser(t, [rost, ek], 0.4);
    return { humor: t >= ek - 0.05 ? 'skrattar' : 'ropar', m: 1, r: UPP.r, l: UPP.l, armSk: 1.6 + 0.12 * pump, lyft: 4 * pump, sta: 0.6 };   // står upp lite: jackan syns
  };
  // den stora skidan: lutning rot (runt öppningens mitt); artor = hur högt varje ärta hoppar (px), null = tom; framfor: främre
  // kanten framför traktorn (traktorn åker inne i skidan) eller bakom (rutschkanan: traktorn åker ovanpå)
  const skidaPose = (rot = 0, artor = null, framfor = true) => {
    const tr = `rotate(${rot} ${W / 2} ${SK_Y})`;
    skida.style.display = skidaFram.style.display = '';
    skida.setAttribute('transform', tr); skidaFram.setAttribute('transform', tr);
    if (framBakom === framfor) { framBakom = !framfor; skidaFram.parentNode.insertBefore(skidaFram, framfor ? bilG.nextSibling : bilG); }
    ART_T.forEach((at, i) => { const [x, b] = skidX(at); skidaArtor[i].pose(x, SK_Y - b - 0.02 * SK_HH - (artor?.[i] || 0), (artor?.[i] || 0) > 2, !!artor); });
  };

  r.rita = t => {
    const id = bokst.find(k => t >= T[k][0] && t < T[k][1]);
    for (const e of [himmel, aker, skida, skidaFram, stangd, ...glitter]) e.style.display = 'none';
    bilG.removeAttribute('clip-path');
    tak.pose(0, 0, 0); tag.forEach(a => a.pose(0, 0, false, false)); groddar.forEach(g => g.pose(0, 0, 0));
    ljus.pose({ synlig: false });
    if (window.kritsvep && T.h) kritsvep(0, GRON);
    if (!id) return null;
    const nu = kit.nu, fas = (nu - kit.BEAT0) / kit.BEAT;
    let p = {}, pose = { ...TR }, dy = 0, puff = [], kam = [W / 2, H / 2, 1];

    if ('abc'.includes(id)) {   // vägen blir en brun åker och en grön grodd växer upp per "Grönt!" (på "kör" grönskar hela åkern: sex större)
      aker.style.display = ''; aker.setAttribute('opacity', mjuk(del(T.a[0], T.a[0] + 0.5, t)).toFixed(3));
      const storre = id === 'c' ? mjuk(del(ord.kor, ord.kor + 0.4, t)) : 0;
      GRODD_X.forEach((x, i) => {
        const a = i < 4 ? ord.pop[i] : ord.kor + 0.1 * (i - 3), v = over(del(a, a + 0.45, t));
        groddar[i].pose(x, 640 + 22 * (i % 3), v * lerp(90, 120, storre));
      });
    }
    if ('ab'.includes(id)) {
      const g = gront['ab'.indexOf(id)];
      dy = studs(t, g); p = armarUpp(t, g);
      if (id === 'a') p.sta *= mjuk(del(T.a[0], T.a[0] + 0.4, t));   // reser sig när refrängen börjar
    } else if (id === 'c') {   // trafikljuset poppar upp, lyser grönt på "kör", vägen blir grön och traktorn far iväg
      const k = over(del(T.c[0], T.c[0] + 0.35, t)), a = over(del(T.c[0] + 0.1, T.c[0] + 0.45, t));
      p = { humor: 'ropar', m: 1, r: [lerp(UPP.r[0], FRAM[0], k), lerp(UPP.r[1], FRAM[1], k)], l: [lerp(UPP.l[0], FRAM[0], k), lerp(UPP.l[1], FRAM[1], k)], titt: 1, sta: 0.6 * (1 - mjuk(del(T.c[0], T.c[0] + 0.4, t))) };
      ljus.pose({ x: LJUS.x, y: LJUS.fot, h: LJUS.h * Math.max(0.001, a), tand: t >= ord.kor ? 'gron' : null, k: over(del(ord.kor, ord.kor + 0.3, t)), synlig: a > 0.01 });
      const iv = inUt(del(ord.kor + 0.05, T.c[1], t)), dx = 150 * iv * iv;
      pose.x += dx; pose.dist = dx * 3; pose.tilt = -1.5 * Math.sin(Math.PI * del(ord.kor + 0.2, ord.kor + 0.8, t));
      dy = studs(t, [ord.kor]);
    } else if ('de'.includes(id)) {   // i den stora skidan: traktorn kör längs den, ärtorna hoppar som en våg
      himmel.style.display = '';
      const hopp = ord.hopp, lyft = [0, 1, 2].map(i => {
        const tider = i === 0 ? [hopp[0], hopp[3]] : [hopp[i], hopp[3]];
        return tider.reduce((a, x) => a - kit.hopp(t, x, x + 0.55, 150, 0.06, 0.15).y, 0);
      });
      skidaPose(0, lyft);
      // traktorn inne i skidans vänstra ände (bygg.py: skid_x(W/2, 0.27), här 360 hög så att Lova syns): huvens kant (y 470 i
      // traktorns ruta) i höjd med främre kantens överkant, hjulen bakom kanten, ärtorna till höger; klippt längs skidans underkant
      const tt = 0.28, [x, b] = skidX(tt), hT = 360, sk = hT / (bil.BB[3] - bil.BB[1]);
      const kant = SK_Y + 0.12 * SK_HH - 0.02 * SK_HH * Math.sin(Math.PI * tt) ** 0.7 - b;
      pose = { x, y: kant + (bil.BB[3] - 470) * sk, h: hT, dist: 150 * (t - T.d[0]) };   // står kvar, hjulen rullar
      bilG.setAttribute('clip-path', 'url(#bil-i-skidan)');
      const g = gront['de'.indexOf(id) + 2];
      dy = studs(t, g); p = armarUpp(t, g); puff = g;
    } else if (id === 'f') {   // närbild: ärtan studsar upp på taket, Lova tittar upp och fnissar
      himmel.style.display = '';
      pose = { x: TR.x, y: TR.y + 140, h: TR.h };
      const landat = t >= ord.landar;
      p = { humor: landat ? (t < ord.landar + 1.2 ? 'skrattar' : 'karleksfull') : 'forvanad', titt: landat ? 0.2 : 1, tittY: -1, rot: landat ? -3 : 0, lyft: landat ? 3 * Math.abs(Math.sin(Math.PI * fas)) : 0, sta: 0.6 * inUt(del(T.f[0] + 0.1, T.f[0] + 0.6, t)) };
      bil.pose({ ...pose, zipp: r.zipp ?? 1, ...p });   // taket behövs för ärtan
      const [tx, ty] = bil.tpunkt([430, 160]), [sx, sy] = bil.tpunkt([1150, 700]), ah = 72;
      const t0 = T.f[0] + 0.25, k = del(t0, ord.landar, t);
      if (t >= t0) {
        const ax = lerp(sx, tx, k), ay = lerp(sy, ty - ah / 2, k) - 4 * 230 * k * (1 - k);
        const st = landat ? kit.hopp(t, ord.landar, ord.landar + 0.3, 14, 0.01, 0.18) : { y: 0, sx: 1, sy: 1 };
        tak.pose(ax, ay + st.y, ah, { sx: st.sx, sy: st.sy });
        tak.ans.satt(t > ord.landar + 0.7 && t < ord.landar + 1.1 ? 'blinkar' : 'glad');
        if (landat) glitter.forEach((e, i) => {
          const a = [-150, -60, 20][i] * Math.PI / 180, g = Math.max(0, Math.sin(2 * Math.PI * ((t - ord.landar) / 1.3 + i / 3)));
          e.style.display = ''; e.setAttribute('transform', `translate(${tx + 70 * Math.cos(a)} ${ty - ah / 2 + 70 * Math.sin(a)}) scale(${(14 * g).toFixed(2)})`);
        });
      }
      const [fx, fy] = bil.punkt([512, 560]);
      kam = [(tx + fx) / 2 + 30, (ty - 90 + fy) / 2, 1.7];
    } else if (id === 'g') {   // rutschkanan: traktorn glider ner, ärtorna rullar efter som ett litet tåg på "tut, tut"
      himmel.style.display = '';
      skidaPose(LUT, null, false);
      const pa = x => SK_Y + (x - W / 2) * TAN;
      const u = del(T.g[0], T.g[1], t), x = lerp(820, 820 + 300 * (T.g[1] - T.g[0]), u * u * 0.6 + u * 0.4);   // bygg.py: traktorn på 820, ärtorna bakom
      pose = { x, y: pa(x) + 30, h: 290, tilt: LUT, dist: x * 2 };
      dy = studs(t, ord.putt); puff = ord.putt;
      const pump = pulser(t, ord.tut, 0.4), tutar = t >= ord.tut[0] - 0.1;
      p = { humor: tutar ? 'ropar' : 'skelogd', m: 1, tut: pulser(t, ord.tut, 0.3), l: tutar ? [lerp(-80, UPP.l[0], pump), lerp(200, UPP.l[1], pump)] : UPP.l, lyft: 3 * pump };   // högertassen tutar på ratten
      const v = 420, rull = Math.max(0, t - ord.tut[0]), ar = 0.36 * SK_HH;   // ärtorna glider efter som ett tåg, gungar lugnt, snurrar aldrig
      tag.forEach((a, i) => {
        const ax = 330 + i * 170 + v * rull * rull / (rull + 0.5);
        a.pose(ax, pa(ax) - 0.3 * ar - 6 * Math.abs(Math.sin(Math.PI * (fas + i / 3))), true);
      });
    } else {   // h: vid bild (hårt klipp), skidan stänger sig, Lova spanar åt båda hållen; ett grönt kritsvep tar oss hem till vägen
      const k = del(...ord.svep, t) * 0.8, hemma = k >= 0.5;
      if (!hemma) {
        himmel.style.display = '';
        const st = mjuk(del(T.h[0], T.h[0] + 0.5, t)), sk = 300 / (708 - 369);   // den stängda skidan, en mjuk squash när den har stängt sig
        stangd.style.display = '';
        stangd.setAttribute('transform', `translate(${W / 2 - 80} ${H * 0.86}) scale(${sk} ${sk * (1 - 0.08 * Math.sin(Math.PI * st))}) translate(-505.5 -708)`);
        const v = mjuk(del(ord.titta - 0.3, ord.titta + 0.2, t)), ogon = mjuk(del(T.h[0], T.h[0] + 0.4, t));
        pose = { x: W / 2 - 80, y: H * 0.86 - 250, h: 200 };
        p = { humor: 'nyfiken', titt: lerp(-1, 1, v), r: [lerp(1100, OGON_R[0], ogon), lerp(300, OGON_R[1], ogon)], rot: lerp(4, -4, v) };
        dy = -3 * Math.abs(Math.sin(Math.PI * fas));   // vid bild (Sanna: inga zoomar i scenerna, hårt klipp)
      } else p = { humor: 'glad', titt: 0.4 };
      kritsvep(k, GRON);
    }
    bil.pose({ ...pose, y: pose.y + dy, tilt: (pose.tilt || 0) + 1.2 * Math.sin(Math.PI * fas / 2), flagg: 3 * Math.sin(Math.PI * fas / 2) - dy * 0.2, zipp: r.zipp ?? 1, ...p });
    bil.puffa(t, puff);
    kit.kamera(...kam);
    return id;
  };
  return r;
}

window.refrang = { ny };
})();
