// Refrängen i 014 (05a–h, 09a–g): Ärtresan, likadan båda gångerna (README "Refrängen: Ärtresan", REFRÄNG_TEXT och refräng_bild()
// i bygg.py). Allt i kod: ärtorna med ansikten, ärtan på taket är artskida-arta-1, lampan är trafikljus.js. Ingen jättestor skida
// (Sanna 2026-11-06): "kör, kör, kör" körs på vägen.
// Läses in efter kit.js, verktyg/kant.js, ansikten.js, traktorn.js och trafikljus.js (och kritsvep.js när refrängen har en h).
// Tiderna ur storyboarden (M.bild) och rader.txt (M.rad, ekona ur radens egna tider i parentes, "0:39.1  Grönt! (0:40.0 Grönt!)").
//   a, b  "Grönt! (Grönt!)" ×2      vägen blir en brun åker: armarna upp, traktorn skumpar, en grön grodd växer upp per "Grönt!" (fyra)
//   c  "Grönt betyder kör!"          ett stort trafikljus poppar upp och lyser grönt på "kör" (pling), åkern grönskar (sex större
//                                    groddar), traktorn rusar iväg fort ut ur bild åt höger med flaggan bakåt och puffar (inga
//                                    fartstreck: formatet; Sanna 2026-11-06: "kör" = kör fort en stund)
//   d, e  "Grönt! (Grönt!)" ×2      klipp till vägen: traktorn susar in fort från vänster och saktar in, tre ärtor hoppar efter den, en i taget (en per
//                                    "Grönt!", alla tre på sista ekot)
//   f  "Grön som en liten ärta!"     närbild: en ärta studsar upp på taket, Lova tittar upp och fnissar, ärtan blinkar, glimtar
//   g  "Putt, putt, tut, tut –"      på vägen: traktorn kör vidare, en puff per putt, högertassen tutar på rattens knapp och ärtorna
//                                    hoppar efter som ett litet tåg
//   h  struken (Sanna 2026-11-06): g fortsätter över "vad är grönt? Titta ut!", ärtan dansar på taket, Lova spanar åt båda
//      hållen; hårt klipp till vagen-2. 09 har ingen h: bondgårdens kritsvep tar vid.
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
const ART_R = 0.0864 * H;   // ärtornas radie (som i den gamla stora skidan)
const ART_LJ = '#80C446';   // mellangröna ärtor (som bygg.py)
const GRODD_X = [790, 1260, 960, 1120, 690, 1340];   // groddarna i den ordning de växer (en per "Grönt!"), åker() och groddar() i bygg.py
const LJUS = { x: 1150, fot: 600, h: 470 };
const GRON = '#3FA34D', ART_G = '#8CCB4E', HIMMEL = '#A8DCF2', JORD = '#7A5234', FARA = '#5C3C26';
const stjarnaD = r => { const k = r * 0.28; return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };

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
  // 05h är struken (Sanna 2026-11-06: "remove this scene 1:03, its to short"): g fortsätter över h:s tid, ärtan dansar på taket
  // och Lova spanar åt båda hållen på "vad är grönt? Titta ut!"; vagen-2 tar vid med ett hårt klipp
  if (T.h) { const v = rad('vad är grönt'), ti = rad('Titta ut'); ord.vad = sc(v.t); ord.titta = sc(ti.t); T.g = [T.g[0], T.h[1]]; delete T.h; bokst.pop(); }
  const r = { T, ord, LJUD: [] };
  let bil, TR, himmel, aker, groddar, ljus, stangd, tag, tak, glitter;

  r.bygg = async (L, traktor) => {
    bil = traktor;
    // ljud: plupp när groddarna poppar upp, tuff-tuff lågt på "putt, putt", tuta-tut på "tut, tut" (knappen trycks samtidigt, rad g)
    [...ord.pop, ord.kor + 0.1].forEach(x => kit.ljud('plopp', x, { vol: 0.18 }));
    ord.putt.forEach(x => kit.ljud('tuff-tuff', x, { vol: 0.12, langd: 0.45, fade: 0.1 }));
    ord.tut.forEach(x => kit.ljud('tuta-tut', x - 0.02, { vol: 0.35 }));
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
    // himlen (f, h): täcker vägen
    himmel = el('rect', { x: -W, y: -H, width: 3 * W, height: 3 * H, fill: HIMMEL }, L.plate);
    // den stängda skidan (h)
    stangd = el('g', {}); L.figurer.insertBefore(stangd, L.figurer.firstChild); bild(`${SK}stangd.png`, stangd);
    window.kant?.lagg(stangd, { andel: 0.01 });
    // trafikljuset och groddarna (a–c), framför åkern men bakom traktorn
    ljus = trafikljus.ny(L.figurer); L.figurer.insertBefore(ljus.g, stangd.nextSibling);
    groddar = GRODD_X.map(() => grodd(L.figurer)); groddar.forEach(g => L.figurer.insertBefore(g.g, ljus.g.nextSibling));
    tag = [0, 1, 2].map(() => kodArta(L.figurer, ART_R));
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
    if (ord.svep) kritsvep.LJUD.forEach((kk, i) => LJ('skrrrrt-kort', ord.svep[0] + kk / 0.8 * (ord.svep[1] - ord.svep[0]), { variant: i % 4 + 1, vol: 0.4 }));
    traktorn.ljud([...gront.flat(), ...ord.putt]);
  };

  const pulser = (t, tider, langd = 0.45) => tider.reduce((m, x) => Math.max(m, Math.sin(Math.PI * clamp((t - x + 0.08) / langd))), 0);
  const studs = (t, tider) => tider.reduce((a, x) => a + kit.hopp(t, x, x + 0.3, 16, 0.08, 0.15).y, 0);
  const armarUpp = (t, [rost, ek]) => {   // "Grönt! (Grönt!)": armarna upp, en liten extra sträckning per "Grönt!"
    const pump = pulser(t, [rost, ek], 0.4);
    return { humor: t >= ek - 0.05 ? 'skrattar' : 'ropar', m: 1, r: UPP.r, l: UPP.l, armSk: 1.6 + 0.12 * pump, lyft: 4 * pump, sta: 0.6 };   // står upp lite: jackan syns
  };

  r.rita = t => {
    const id = bokst.find(k => t >= T[k][0] && t < T[k][1]);
    for (const e of [himmel, aker, stangd, ...glitter]) e.style.display = 'none';
    tak.pose(0, 0, 0); tag.forEach(a => a.pose(0, 0, false, false)); groddar.forEach(g => g.pose(0, 0, 0));
    ljus.pose({ synlig: false });
    if (window.kritsvep && T.h) kritsvep(0, GRON);
    if (!id) return null;
    const nu = kit.nu, fas = (nu - kit.BEAT0) / kit.BEAT;
    let p = {}, pose = { ...TR }, dy = 0, puff = [], kam = [W / 2, H / 2, 1], takDans = false;

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
      // "kör": traktorn rusar iväg fort och ut ur bild åt höger (accelererar), lutar bakåt i starten, flaggan slängs bakåt
      const iv = del(ord.kor + 0.05, T.c[1], t), dx = (W + 380 - TR.x) * iv * iv;
      pose.x += dx; pose.dist = dx * 3; pose.tilt = -3 * Math.sin(Math.PI * del(ord.kor, ord.kor + 0.6, t)); pose.flagg = -14 * mjuk(del(ord.kor, ord.kor + 0.3, t));
      dy = studs(t, [ord.kor]); puff = [ord.kor, ord.kor + 0.3];
    } else if ('de'.includes(id)) {   // på vägen: traktorn kör åt höger, ärtorna hoppar efter den, en i taget
      // susar in fort från vänster (fortsättningen på "kör") och saktar in till en lugn körning åt höger
      const u = del(T.d[0], T.e[1], t), hopp = ord.hopp, inn = 1 - (1 - del(T.d[0], T.d[0] + 0.55, t)) ** 3, x = lerp(-380, 560, inn) + 340 * u;
      pose = { ...TR, x, dist: x * 3, tilt: 2.5 * (1 - inn), flagg: -12 * (1 - inn) };
      tag.forEach((a, i) => {   // ärta i hoppar in på sitt "Grönt!" och följer sedan med; alla tre hoppar på sista ekot
        const in_ = mjuk(del(hopp[i] - 0.1, hopp[i] + 0.4, t)), tider = i === 0 ? [hopp[0], hopp[3]] : [hopp[i], hopp[3]];
        const h = tider.reduce((m, x) => m - kit.hopp(t, x, x + 0.55, 110, 0.06, 0.15).y, 0);
        a.pose(lerp(-120, Math.max(pose.x - 400 - 140 * i, 60 - 140 * i), in_), TR.y - ART_R - 6 - h, h > 2, t >= hopp[i] - 0.1);
      });
      const g = gront['de'.indexOf(id) + 2];
      dy = studs(t, g); p = armarUpp(t, g); puff = g;
      if (id === 'd' && inn < 1) p.sta *= inn;   // sitter ner medan den susar in
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
    } else if (id === 'g') {   // på vägen: traktorn kör vidare, en puff per putt, tutar; ärtorna hoppar efter som ett litet tåg
      const u = del(T.g[0], T.g[1], t), x = lerp(600, 880, u);
      pose = { ...TR, x, dist: x * 3 };
      dy = studs(t, ord.putt); puff = ord.putt;
      const pump = pulser(t, ord.tut, 0.4), tutar = t >= ord.tut[0] - 0.1;
      p = { humor: tutar ? 'ropar' : 'skrattar', m: 1, tut: pulser(t, ord.tut, 0.3), l: tutar ? [lerp(-80, UPP.l[0], pump), lerp(200, UPP.l[1], pump)] : UPP.l, lyft: 3 * pump };   // högertassen tutar på ratten
      if (ord.vad && t >= ord.vad - 0.1) {   // "vad är grönt? Titta ut!": tassarna på ratten, spanar åt vänster och sedan åt höger
        const v = mjuk(del(ord.titta - 0.3, ord.titta + 0.2, t));
        p = { humor: 'nyfiken', titt: lerp(-1, 1, v), rot: lerp(4, -4, v), lyft: 2 * Math.abs(Math.sin(Math.PI * fas)) };
      }
      takDans = true;
      tag.forEach((a, i) => a.pose(x - 400 - 140 * i, TR.y - ART_R - 6 - 14 * Math.abs(Math.sin(Math.PI * (fas + i / 3))), false));
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
    takDans = id === 'g' && takDans;
    bil.pose({ ...pose, y: pose.y + dy, tilt: (pose.tilt || 0) + 1.2 * Math.sin(Math.PI * fas / 2), flagg: (pose.flagg || 0) + 3 * Math.sin(Math.PI * fas / 2) - dy * 0.2, zipp: r.zipp ?? 1, ...p });
    bil.puffa(t, puff);
    if (takDans) {   // g: ärtan från f sitter kvar på taket och dansar: ett litet hopp på varje slag, vickar, skrattar på slaget
      const [tx, ty] = bil.tpunkt([430, 160]), ah = 72, h = kit.hopp(nu, Math.floor(fas) * kit.BEAT + kit.BEAT0, Math.floor(fas) * kit.BEAT + kit.BEAT0 + 0.32, 26, 0.08, 0.16);
      tak.pose(tx, ty - ah / 2 + h.y, ah, { rot: 12 * Math.sin(Math.PI * fas), sx: h.sx, sy: h.sy });
      tak.ans.satt(h.y < -4 ? 'skrattar' : 'glad');
    }
    kit.kamera(...kam);
    return id;
  };
  return r;
}

window.refrang = { ny };
})();
