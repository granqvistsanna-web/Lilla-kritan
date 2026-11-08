// Refrängen i 007 (05a–h, 09a–h), likadan båda gångerna. Tagning 5 (Sanna 2026-11-06: "lets build a rutschkana which bear rides
// with the teddy (no truck)", "a more large rutschkana like a waterslide"): kolasåsen väller in redan före a, och hela refrängen
// är på kolastranden vid en stor vattenrutschbana av choklad och kola (assets/rekvisita/rutschkana). Ingen lastbil:
//   a  "Brun, brun!"                    Bulle högst upp på tornet (halvbild), ett litet stamp per "brun" (nallen åker inte med)
//   b  "Rutscha ner i kolasås – (wiii!)" han rutschar ner längs den vågiga rännan, armarna upp på "wiii"
//   c  "Plask, plask, plask!"           flyger ut i havet, stort PLASK, guppar, små plask på ekot
//   d  "Upp igen – en gång till! (En, två, tre!)"  skuttar till stegen och klättrar upp, ett steg per räkneord
//   e  "Rutscha ner i kolasås – (wiii!)" en gång till, plask
//   f  "Kola på nosen! (Mums, mums!)"   närbild: en kolaklick landar på nosen, han slickar
//   g  "Brun är den godaste färgen!"    godiset dyker upp i havet runt dem, glimtar och hjärtan
//   h  "Vad är brunt? Titta ut!"        tittar åt vänster och höger; kolasåsen väller ner och rinner av: tillbaka i lastbilen på vägen
// (Kolasåsresan med lastbilen, tagning 3–4, står nedan i den gamla beskrivningen.)
// Läses in efter kit.js, ansikten.js, kritsvep.js och lastbilen.js. Tiderna ur storyboarden (M.bild) och rader.txt (M.rad),
// takten ur kit.BEAT.
//   a  "Brun, brun! (Brun, brun!)"          vägen, halvbild: björnstampet, ett brunt tassavtryck per "brun", fyra i rad
//   b  "Lastbil, lastbil – (brum, brum!)"   samma bild, en vit puff och ett skutt per "brum"; en gyllene kolatunga rinner in
//                                           över vägen från höger kant
//   c  "Plask i kolasåsen – (plask, plask!)"  kolasås väller ner över bilden och sjunker undan till kolasåshavet
//                                           (assets/bakgrunder/kolasashavet, med vaxkorn), halvtotal: lastbilen
//                                           plumsar ner, PLASK, en krona av kola med vit kant; ekot två små plask, och den flyter
//   d  "Hoppa, hoppa – (jiihaa!)"           två lugna hopp på vågtopparna, två små koladroppar hoppar med i bågar som delfiner;
//                                           "jiihaa!": Bulle vinkar högt; kotten kommer flytande i en kanelbulle som badring
//   e  "Gunga, gunga – (hej hå!)"           stora långsamma dyningar, lastbilen lutar hit och dit, kameran andas in
//   f  "Kola på nosen – (mums, mums!)"      närbild: en kolaklick skvätter upp och landar på Bulles nos, han slickar två gånger
//   g  "Brun är den godaste färgen! (Mmm!)" halvnära: godiset dyker upp i havet runt lastbilen, ett per ord: en chokladruta
//                                           som flotte ("Brun"), en kolabit som boj ("godaste"), kotten i badringen skuttar ("färgen");
//                                           "Mmm!": allt guppar i takt, glimtar och små hjärtan stiger, Bulle slickar sig om munnen
//   h  "Tut, tut! (Tut, tut!)"              närbild på ratten, en vit ring per tut;
//      "Vad är brunt? Titta ut!"            kolasåsen väller ner igen och rinner av: tillbaka på vägen, närbild: tassen som skärm, tittar åt vänster och höger
// Lastbilen kör alltid åt höger och vänds aldrig; i havet sitter den ner i kolan bakom ett främre våglager och lutar bara.
// Pyntet är klistermärken i kod med vit kant (verktyg/kant.js).
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, bil)                        // L = kit.duk(...) (scenens vägplatta), bil = scenens lastbil (lastbilen.ny)
//   r.rita(t)                                   // null utanför refrängen, annars bildens bokstav. Poserar lastbilen, kameran och
//                                               // kritsvepen själv; scenen döljer sina egna saker (granen, buskar i figurlagret) då.
//                                               // r.rita nollställer kritsvepet: en scen med eget svep ritar det efter r.rita.
//   r.LJUD                                      // lagt med kit.ljud i bygg() (ljud.md)
(() => {
const { el, bild, mjuk, inUt, over, del, lerp, clamp, BEAT, W, H, ROT } = kit;
const A = `${ROT}assets/`;
const SAS_IN = 0.75, SAS_UT = 0.6;   // kolasåsövergången: in före c, ut i c (sekunder)
const KOLA = '#E8A63A', KOLA_LJUS = '#F6D89A', GRADDE = '#FFF4DC', VAG = '#A6D86B', HAV_BLA = '#5FB8EE', BRUN = '#8B5A2B';
const UPP = { r: [1500, -700], l: [-480, -700] }, NER = { r: [1300, 900], l: [-280, 900] }, VINK = { r: [1150, -350] };
const KANT = { r: [600, 760], l: [420, 760] };   // KANT: mot ratten
// tassavtrycken på vägen i a: två bakom lastbilen (stampen), två framför (ekot)
const AVTRYCK = [[150, 714], [260, 700], [1120, 700], [1230, 714]];
const TASSD = '<ellipse cx="0" cy="12" rx="23" ry="19"/><circle cx="-21" cy="-12" r="8.5"/><circle cx="-7" cy="-23" r="9"/><circle cx="8" cy="-23" r="9"/><circle cx="22" cy="-12" r="8.5"/>';
// havet: vattenlinjen där lastbilen flyter, hjulen under den
const HAV = { y: 668, x: 0.42 * W, h: 330, sjunk: 92 };
// godiset i havet i g: bild, mitt (x, vattenlinjen y), höjd i bild, lutning
const GODIS = {
  choklad: { fil: `${A}rekvisita/choklad/cut/choklad-v7.png`, bw: 673, bh: 931, ch: 927, x: 895, y: 690, h: 232, rot: -8 },
  kola: { fil: `${A}rekvisita/kola/cut/kola-karamell-v2.png`, bw: 1152, bh: 590, ch: 586, x: 262, y: 690, h: 150, rot: 6 },   // v2 (2026-11-08)
  ring: { fil: `${A}rekvisita/kanelbulle/cut/kanelbulle-v3-ruta.png`, x: 1110, y: 700, h: 210, rot: 0 },
};
const KOTTE = `${A}rekvisita/kotte/cut/kotte-v2-premium.png`;   // v2-kotten, 693 × 880, kanten i bilden
const lagg = (g, andel = 0.01) => window.kant ? kant.lagg(g, { andel }) : g;

async function ny(M, n, S) {
  const T = {};
  'abcdefgh'.split('').forEach(k => { const [a, b] = M.bild(n + k); T[k] = [S(a), S(b)]; });
  // raderna söks från refrängens början (sångtid), så att "brum, brum" och "mums, mums" i verserna inte räknas
  const efter = M.bild(n + 'a')[0] - M.av - 0.1, R = text => S(M.rad(text, { efter }).t + M.av);
  const R2 = text => S(M.rad(text, { efter: M.rad(text, { efter }).t + 0.5 }).t + M.av);   // andra gången raden kommer i refrängen
  const slag = (s0, i) => s0 + i * BEAT;
  // tagning 3 (rader.txt 2026-11-05): orden ligger ungefär ett slag isär; tuten uppmätta med Whisper (0, 0,55, 1,05, 1,45 s)
  const ord = {
    stamp: [0, 1, 2, 3].map(i => slag(R('Brun brun'), i)),
    // tagning 4 (Suno v7b): rad 2 är "Åh, vad gott! (Mums, mums!)"; skutten och puffarna ligger kvar på ekot (ord.brum)
    // tagning 5 (Suno v8 calypso, 2026-11-06): tillfällig koppling till den nya texten tills rutschkanan är ritad
    brum: [0, 1].map(i => slag(R('wiii'), i)),
    kolatunga: R('Rutscha ner i kolasås'),
    plask: [R('Plask plask plask'), slag(R('Plask plask plask'), 1), slag(R('Plask plask plask'), 2)],
    hopp: [0, 1].map(i => slag(R('Upp igen'), i)), jiihaa: R('En två tre'),
    gunga: [0, 1, 2, 3].map(i => slag(R2('Rutscha ner i kolasås'), i)), gung: [0, 1].map(i => slag(R2('wiii'), i)),
    kola: R('Kola på nosen'), mums: [0, 1].map(i => slag(R('Mums mums'), i)),
    godast: R('Brun är den godaste'), mmm: R('Brun är den godaste') + 1.5,
    tut: [0, 0.55, 1.05, 1.45].map(x => R('Vad är brunt') + x),
    vad: R('Vad är brunt'), titta: R('Titta ut'),
  };
  ord.bubbla = [0, 0.7, 1.2].map(x => ord.godast + x);   // "Brun", "godaste", "färgen"
  // rutschkanan: två åk; det första landar på "Plask", det andra 1,8 s efter sin start
  ord.rutsch = [R('Rutscha ner i kolasås'), R2('Rutscha ner i kolasås')];
  ord.wiii = [R('wiii'), R2('wiii')];
  ord.landa = [ord.plask[0], ord.rutsch[1] + 1.8];
  ord.upp = R('Upp igen'); ord.tre = [0, 0.33, 0.7].map(x => R('En två tre') + x);
  const r = { T, ord, LJUD: [] };
  let rb, sas, bil, DANS, hav, framVag, tunga, kronor = [], avtryck = [], pyntA, godis = {}, droppar = [], hjartan = [], klick, slick, ringG, ringar = [], glimtar = [];

  r.bygg = async (L, lastbil) => {
    bil = lastbil;
    DANS = { x: M.matt.DANS[0], y: M.matt.DANS[1], h: M.matt.DANS[2] };
    // a–b: tassavtrycken och kolatungan på vägen (i plattan, under lastbilen)
    pyntA = el('g', { filter: 'url(#boil)' }, L.plate);
    avtryck = AVTRYCK.map(([x, y], i) => { const g = el('g', {}, pyntA), inre = el('g', { fill: BRUN }, g); inre.innerHTML = TASSD; lagg(g); return { g, x, y, rot: i % 2 ? 8 : -8 }; });
    tunga = el('path', { fill: KOLA, stroke: '#fff', 'stroke-width': 7, 'stroke-linejoin': 'round' }, el('g', { filter: 'url(#boil)' }, L.plate));
    // c–h: kolasåshavet över hela plattan (bilden är 1376 × 768 som duken)
    hav = el('g', {}, L.plate);
    bild(`${A}bakgrunder/kolasashavet/platt-hav-v2.png`, hav, { width: W, height: H, preserveAspectRatio: 'none' });
    // rutschbanan, Bulle och nallen (../rutschbana.js; bakom det främre våglagret, så att de sitter i kolan när de flyter)
    rb = await rutschbana.ny(L, { bara: true, havG: hav });
    // främre våglagret framför lastbilen (figurlagret, överst) och plaskkronorna och kolaklicken framför den
    const fg = el('g', {}, L.figurer);
    // godiset och delfindropparna flyter bakom det främre våglagret (de sitter i kolan)
    for (const [k, gd] of Object.entries(GODIS)) {
      const g = el('g', {}, fg), inre = el('g', {}, g);
      bild(gd.fil, el('g', { transform: `scale(${(gd.h / (gd.ch ?? 760)).toFixed(4)}) translate(${-(gd.bw ?? 1024) / 2} ${-(gd.bh ?? 1024) / 2})` }, inre), { width: gd.bw ?? 1024, height: gd.bh ?? 1024 });
      let kotteG = null;
      if (k === 'ring') {   // kotten sitter i kanelbullens hål, som i en badring
        kotteG = el('g', {}, g);
        bild(KOTTE, el('g', { transform: 'scale(0.154) translate(-346 -440)' }, kotteG), { width: 693, height: 880 });
      }
      godis[k] = { ...gd, g, kotteG };
    }
    droppar = [0, 1].map(() => {
      const g = el('g', {}, fg);
      el('path', { d: 'M0 -30 C14 -12 22 0 22 10 C22 24 12 32 0 32 C-12 32 -22 24 -22 10 C-22 0 -14 -12 0 -30 Z', fill: KOLA_LJUS, stroke: '#fff', 'stroke-width': 6 }, g);
      el('path', { d: 'M-9 4 Q-8 -6 -2 -12', fill: 'none', stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      return g;
    });
    framVag = el('path', { fill: KOLA, stroke: GRADDE, 'stroke-width': 6, filter: 'url(#kolakorn)' }, fg);   // samma vaxkorn som såsen och plattan
    // plaskkronan och kolaklicken: målade vaxkritsbilder (assets/rekvisita/kolasas, Sanna 2026-11-06), ursprung i kronans fot / klickens mitt
    kronor = [...ord.plask, ...ord.gung].map(() => { const g = el('g', {}, fg); bild(`${A}rekvisita/kolasas/cut/plask.png`, el('g', { transform: 'scale(0.36) translate(-520 -870)' }, g)); return g; });
    slick = el('path', { fill: '#EC8A94', stroke: '#B8505C', 'stroke-width': 3 }, fg);   // f: tungan som slickar kolan på nosen
    klick = el('g', {}, fg);
    bild(`${A}rekvisita/kolasas/cut/klick.png`, el('g', { transform: 'scale(0.105) translate(-513 -523)' }, klick));
    const bg = el('g', {}, L.figurer);
    glimtar = [0, 1, 2, 3, 4, 5].map(() => el('path', { d: 'M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z', fill: '#fff' }, bg));
    hjartan = [0, 1, 2, 3, 4].map(i => { const g = el('g', {}, bg); el('path', { d: 'M0 14 C-22 -2 -11 -18 0 -7 C11 -18 22 -2 0 14 Z', fill: i % 2 ? '#C9935A' : BRUN }, g); lagg(g); return g; });
    ringG = el('g', {}, L.figurer);
    ringar = ord.tut.map(() => el('circle', { fill: 'none', stroke: '#fff', 'stroke-width': 5 }, ringG));
    kit.lager.overst.setAttribute('transform', `translate(${-0.06 * W} ${-0.06 * H}) scale(${1.12 * W / 1920})`);   // kritsvep.js ritar i 1920 × 1080
    // Kolasåsövergången (Sanna 2026-11-06, undantag i refrängen som 006:s orange torka): på slutet av b rinner tjock kolasås ner
    // över hela bilden med droppar i underkanten, och i c sjunker den och blir havet. Ligger i lager.overst (utanför kameran),
    // i bildens egna koordinater (gruppen tar bort överstlagrets 1920-skala).
    sas = el('g', { transform: `scale(${(1920 / (1.12 * W)).toFixed(5)}) translate(${0.06 * W} ${0.06 * H})`, filter: 'url(#boil)' }, kit.lager.overst);
    // kritkorn (Sanna 2026-11-06: mer textur): fläckigt vax, mörkare kolaströmmar och ljusa glansstreck, inte en platt yta
    document.querySelector('svg defs').insertAdjacentHTML('beforeend', `
      <filter id="kolakorn" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="4" result="f"/>
        <feColorMatrix in="f" type="matrix" values="0 0 0 0 0.72  0 0 0 0 0.42  0 0 0 0 0.12  -1.4 0 0 0 0.75" result="flack"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.06" numOctaves="2" seed="9" result="s"/>
        <feColorMatrix in="s" type="matrix" values="0 0 0 0 1  0 0 0 0 0.93  0 0 0 0 0.75  4 0 0 0 -2.55" result="vax"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="1" seed="2" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 6 -4.3" result="korn"/>
        <feMerge result="m"><feMergeNode in="flack"/><feMergeNode in="vax"/><feMergeNode in="korn"/></feMerge>
        <feComposite in="m" in2="SourceGraphic" operator="in" result="tex"/>
        <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="tex"/></feMerge>
      </filter>`);
    const sasKorn = el('g', { filter: 'url(#kolakorn)' }, sas);
    sas.kropp = el('path', { fill: KOLA, stroke: '#fff', 'stroke-width': 9, 'stroke-linejoin': 'round' }, sasKorn);
    sas.strom = [0, 1, 2].map(i => el('path', { fill: 'none', stroke: '#C9822A', 'stroke-width': 26 + 10 * i, 'stroke-linecap': 'round', opacity: 0.35 }, sasKorn));
    sas.glans = [0, 1, 2].map(() => el('path', { fill: 'none', stroke: KOLA_LJUS, 'stroke-width': 14, 'stroke-linecap': 'round' }, sasKorn));
    // ljud (ljud.md): lågt och i luckorna, sången först
    const LJ = (namn, t, o) => { kit.ljud(namn, t, o); r.LJUD.push(namn); };
    ord.stamp.forEach(x => { LJ('duns', x, { vol: 0.25, langd: 0.4 }); LJ('pop', x + 0.04, { vol: 0.2 }); });
    ord.brum.forEach(x => LJ('mums', x, { vol: 0.2 }));
    ord.gung.forEach(x => LJ('plask', x, { vol: 0.25 }));   // "gung, gung": ett kolaplask på sidan som lastbilen lutar mot
    LJ('slurp', ord.kolatunga + 0.6, { vol: 0.15 });
    LJ('slurp', T.a[0] - SAS_IN, { vol: 0.35 });   // kolasåsen väller in
    ord.plask.forEach((x, i) => LJ(i ? 'plask' : 'plask-stor', x, { vol: i ? 0.2 : 0.35 }));
    ord.hopp.forEach(x => LJ('boing', x, { vol: 0.15 }));
    LJ('slurp', ord.kola + 0.35, { vol: 0.25 });
    ord.mums.forEach(x => LJ('mums', x, { vol: 0.2 }));
    ord.bubbla.forEach(x => LJ('pop', x, { vol: 0.2 }));
    LJ('glimt', ord.mmm, { vol: 0.25 });   // "Mmm!": glimtar och hjärtan
    ord.hopp.forEach(x => LJ('plupp', x + 0.4, { vol: 0.12 }));
    LJ('glitter', ord.mmm - 0.1, { vol: 0.2 });
    LJ('tuta-tut', ord.tut[0] - 0.03, { vol: 0.3, langd: 1.6, fade: 0.3 });
    LJ('slurp', ord.vad - SAS_IN, { vol: 0.35 });   // kolasåsen tillbaka till vägen
    ord.rutsch.forEach(x => LJ('swoosh', x, { vol: 0.3 }));
    ord.landa.slice(1).forEach(x => LJ('plask-stor', x, { vol: 0.35 }));
    ord.tre.forEach(x => LJ('plupp', x, { vol: 0.2 }));
  };

  const armar = (fran, till, q) => {
    const p = {};
    for (const s of 'rl') {
      const a = fran?.[s], b = till?.[s];
      if ((!a && q < 0.03) || (!b && q > 0.97)) continue;
      const A0 = a || KANT[s], B0 = b || KANT[s]; p[s] = [lerp(A0[0], B0[0], q), lerp(A0[1], B0[1], q)];
    }
    return p;
  };
  const pulser = (t, tider, langd = 0.45) => tider.reduce((m, x) => Math.max(m, Math.sin(Math.PI * clamp((t - x + 0.08) / langd))), 0);
  const pop = (t, a, len = 0.3) => t < a ? 0 : over(del(a, a + len, t));
  const sticker = (g, x, y, s, rot = 0) => { g.style.display = s > 0.001 ? '' : 'none'; g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${Math.max(0.001, s).toFixed(3)})`); };
  // havets våg vid x och tid t (px): långsam dyning, större i e
  const dyning = t => 1 + 1.5 * mjuk(del(T.e[0] - 0.3, T.e[0] + 0.5, t)) * mjuk(del(T.f[0] + 0.3, T.f[0] - 0.3, t));
  const vag = (x, t) => 9 * dyning(t) * Math.sin(x / 110 - t * 1.1) + 4 * Math.sin(x / 47 + t * 1.6);   // #24: långsammare vågor
  // närbilder: Bulles ögonhöjd i bild
  const nara = (pt, z0) => { const s = bil.lastH / (bil.BB[3] - bil.BB[1]), hh = 700 * M.matt.BULLE[0] * s, [x, y] = bil.punkt(pt); return { x, y, hh, z: H / (z0 * hh) }; };

  // kolasåsens kanter: underkanten med droppar som rinner ner (in), överkanten vågig när den sjunker till havet (ut)
  const DROPP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => 70 + 90 * Math.abs(Math.sin(i * 2.7)));
  // två gånger (Sanna 2026-11-06: åt båda hållen): in i havet före c och tillbaka till vägen på "Vad är brunt?" (h)
  const sasRita = t => {
    const t0 = t < (T.a[0] + ord.vad) / 2 ? T.a[0] : ord.vad, inn = del(t0 - SAS_IN, t0, t), ut = del(t0, t0 + SAS_UT, t);
    if (inn <= 0 || ut >= 1) return sas.style.display = 'none';
    sas.style.display = '';
    const botten = lerp(-160, H + 200, ut > 0 ? 1 : mjuk(inn)) + 260 * mjuk(ut), topp = ut > 0 ? lerp(-30, H + 60, mjuk(ut)) : -60;
    let d = `M-40 ${topp}`;
    for (let x = -40; x <= W + 40; x += 43) d += ` L${x} ${(topp + 16 * Math.sin(x / 70 + t * 4)).toFixed(1)}`;
    for (let i = 11; i >= 0; i--) {   // underkanten höger → vänster: en droppe per bit, som tunga hängande näsor
      const x = -40 + (i + 0.5) * (W + 80) / 12, b = botten + DROPP[i] * (1 - 0.5 * ut);
      // rund droppe: smal hals som slutar i en rund klick (båge), som hängande kola
      const r = 26 + 8 * Math.sin(i * 1.7);
      d += ` L${(x + 58).toFixed(0)} ${(botten + 10 * Math.sin(i)).toFixed(1)} Q${(x + r).toFixed(0)} ${(botten + 8).toFixed(1)} ${(x + r).toFixed(0)} ${(b - r).toFixed(1)}`
         + ` A${r.toFixed(0)} ${r.toFixed(0)} 0 0 1 ${(x - r).toFixed(0)} ${(b - r).toFixed(1)} Q${(x - r).toFixed(0)} ${(botten + 8).toFixed(1)} ${(x - 58).toFixed(0)} ${(botten + 10 * Math.sin(i + 1)).toFixed(1)}`;
    }
    sas.kropp.setAttribute('d', d + ' Z');
    // ut: såsen rinner av nedåt och visar havet uppifrån (ingen tonad mellanbild)
    sas.strom.forEach((g, i) => {   // mörkare strömmar som rinner nedåt med såsen, vågiga lodräta drag
      const x = 230 + i * 450 + 60 * Math.sin(i * 1.9), y0 = topp + 40, y1 = Math.min(botten - 40, y0 + 900);
      let d = `M${x} ${y0}`; for (let y = y0; y <= y1; y += 50) d += ` L${(x + 45 * Math.sin(y / 140 + i * 2 + t * 1.5)).toFixed(1)} ${y}`;
      g.setAttribute('d', d); g.style.display = y1 - y0 > 80 ? '' : 'none';
    });
    sas.glans.forEach((g, i) => {   // tre ljusa vaxstreck som glider med såsen
      const x = 260 + i * 420, y = lerp(topp, botten, 0.35 + 0.15 * i);
      g.setAttribute('d', `M${x} ${y.toFixed(1)} q60 -24 130 -6`);
      g.style.display = botten - topp > 160 ? '' : 'none';
    });
  };
  const HAV_Y = HAV.y + 52;
  r.rita = t => {
    sasRita(t);
    const id = 'abcdefgh'.split('').find(k => t >= T[k][0] && t < T[k][1]);
    kritsvep(0, VAG);   // tillbaka till vägen med kolasåsen (sasRita), inget kritsvep; anropet döljer svepet varje bildruta
    const iHav = t >= T.a[0] && t < ord.vad + 0.2;
    hav.style.display = framVag.style.display = rb.strand.style.display = iHav ? '' : 'none';
    const { TOPP, STEGE, stall, ak } = rb, bulleF = rb.bulle;
    pyntA.style.display = tunga.parentNode.style.display = 'none';
    [...kronor, ...Object.values(godis).map(g => g.g), ...droppar, ...glimtar, ...hjartan, ...ringar, klick, slick].forEach(g => (g.style.display = 'none'));
    bil.g.style.display = iHav ? 'none' : '';
    document.querySelectorAll('.vag-fram').forEach(g => (g.style.display = iHav ? 'none' : ''));   // kit.vag:s förgrund hör till vägen
    if (!id) return null;
    if (!iHav) return id;   // h efter kolasåsen: scenen visar vägen och lastbilen igen
    const nu = kit.nu, fas = (nu - kit.BEAT0) / BEAT, flyt = 4 * Math.sin(t * 1.5) + vag(rb.HAV_X, t) * 0.6;   // #24: lugnare gupp
    let pos;
    const wiii = i => pulser(t, [ord.wiii[i]], 0.9);
    if (t < ord.rutsch[0]) {   // a: högst upp, stampar på varje "brun"
      const stamp = ord.stamp.reduce((a, x) => a + kit.hopp(t, x, x + 0.3, 16, 0.08, 0.15).y, 0);
      pos = stall(t, { x: TOPP[0], y: TOPP[1] + stamp, humor: 'ropar', m: 0.8 * pulser(t, ord.stamp, 0.3), titt: -0.3 });
    } else if (t < ord.landa[0]) {   // b: första åket
      const a = ak(t, ord.rutsch[0], ord.landa[0]);
      pos = stall(t, { ...a, humor: 'ropar', m: 1, armar: wiii(0) > 0.1 ? { r: UPP.r, l: UPP.l } : undefined });
    } else if (t < ord.upp) {   // c: plask, guppar i kolan, små hopp på ekot
      const studs = ord.plask.slice(1).reduce((a, x) => a + kit.hopp(t, x, x + 0.3, 14, 0.08, 0.15).y, 0) + 26 * Math.sin(Math.PI * clamp((t - ord.landa[0]) / 0.4));
      pos = stall(t, { x: rb.HAV_X, y: HAV_Y + flyt + studs, humor: 'skrattar', m: 0.6, armar: { r: UPP.r, l: UPP.l } });
    } else if (t < ord.tre[0] - 0.1) {   // d: två skutt genom kolan till stegen
      const q = del(ord.upp, ord.tre[0] - 0.1, t), hopp = Math.abs(Math.sin(Math.PI * 2 * q));
      pos = stall(t, { x: lerp(rb.HAV_X, STEGE[0][0], mjuk(q)), y: lerp(HAV_Y + flyt, HAV_Y, q) - 70 * hopp, humor: 'skrattar', titt: 0.6 });
    } else if (t < ord.rutsch[1]) {   // d: klättrar upp, ett ryck per räkneord, sist över till rännans början
      const klar = ord.rutsch[1] - 0.35, q = del(ord.tre[0] - 0.1, klar, t);
      const ryck = ord.tre.reduce((a, x) => a + 0.33 * mjuk(del(x - 0.05, x + 0.2, t)), 0), k = Math.min(1, 0.4 * q + 0.6 * ryck);
      const [b0, b1] = STEGE, ovan = mjuk(del(klar, ord.rutsch[1], t));
      pos = stall(t, { x: lerp(lerp(b0[0], b1[0], k), TOPP[0], ovan), y: lerp(lerp(b0[1], b1[1], k), TOPP[1], ovan), humor: 'ropar', m: pulser(t, ord.tre, 0.3),
        titt: 0, tittY: -0.5, steg: Math.sin(Math.PI * 3 * k), armar: { r: [900, 120], l: [120, 120] } });
    } else if (t < ord.landa[1]) {   // e: andra åket
      const a = ak(t, ord.rutsch[1], ord.landa[1]);
      pos = stall(t, { ...a, humor: 'ropar', m: 1, armar: wiii(1) > 0.1 ? { r: UPP.r, l: UPP.l } : undefined });
    } else {   // e–h: flyter i kolan
      const studs = 26 * Math.sin(Math.PI * clamp((t - ord.landa[1]) / 0.4));
      let p = { humor: 'skrattar', m: 0.5 };
      if (id === 'f') {   // Sanna 2026-11-08 "improve the kola på nosen shot": tassarna upp mot kinderna när klicken landar, klappar på varje mums
        const upp = mjuk(del(ord.kola + 0.4, ord.kola + 0.75, t)), klapp = 18 * pulser(t, ord.mums, 0.25);
        p = { humor: t > ord.mums[0] - 0.15 ? 'slickar' : (t > ord.kola + 0.45 ? 'forvanad' : 'skrattar'), tittY: t > ord.kola + 0.3 && t < ord.mums[0] ? -0.9 : 0, titt: 0,
          armar: { r: [lerp(1400, 690, upp), lerp(520, 470 - klapp, upp)], l: [lerp(-380, 334, upp), lerp(520, 470 - klapp, upp)], fram: upp > 0.85 } };
      }
      if (id === 'g') p = { humor: t > ord.mmm - 0.15 ? 'slickar' : 'njuter', titt: 0, tittY: -0.6 };
      if (id === 'h') { const k = mjuk(del(ord.titta - 0.3, ord.titta + 0.4, t)); p = { humor: 'nyfiken', titt: lerp(-1, 1, k), m: 0 }; }
      pos = stall(t, { x: rb.HAV_X, y: HAV_Y + flyt + studs, ...p });
    }
    // främre våglagret: täcker det som sitter i kolan
    let d = `M-20 ${H + 20}`;
    for (let xx = -20; xx <= W + 20; xx += 16) d += ` L${xx} ${(HAV.y + vag(xx, t)).toFixed(1)}`;
    framVag.setAttribute('d', `${d} L${W + 20} ${H + 20} Z`);
    // plaskkronorna: en stor vid varje landning och två små på ekot i c; inte i närbilden f (#8: ansiktet med kolan ska synas direkt)
    ord.landa.forEach((a, i) => { const k = del(a - 0.02, a + 0.7, t); if (k > 0 && k < 1 && id !== 'f') sticker(kronor[i], rb.HAV_X, HAV.y + 14, 1.1 * Math.sin(Math.PI * Math.min(1, k * 1.3)) + 0.001, -4); });
    ord.plask.slice(1).forEach((a, i) => { const k = del(a - 0.02, a + 0.6, t); if (k > 0 && k < 1) sticker(kronor[2 + i], rb.HAV_X + (i ? 120 : -120), HAV.y + 14, 0.55 * Math.sin(Math.PI * Math.min(1, k * 1.3)) + 0.001, i ? 6 : -6); });
    // g: godiset dyker upp i havet runt dem, glimtar och hjärtan på "Mmm"
    if (id === 'g' || id === 'h') {
      [['choklad', ord.bubbla[0]], ['kola', ord.bubbla[1]]].forEach(([k, a]) => {
        const gd = godis[k], gx = k === 'kola' ? 70 : 520, upp = over(del(a, a + 0.45, t)), gupp = 10 * pulser(t, [ord.mmm, ord.mmm + BEAT / 2], 0.4);
        if (t > a) sticker(gd.g, gx, gd.y + vag(gx, t) - 70 + 200 * (1 - upp) - gupp, 0.8, gd.rot + 4 * Math.sin(t * 1.9 + gx));
      });
      glimtar.forEach((g, i) => { const a = ord.mmm + 0.12 * i, k = del(a, a + 0.5, t), v = 2 * Math.PI * i / 6 + 0.6; if (k > 0 && k < 1) sticker(g, rb.HAV_X + 170 * Math.cos(v), HAV.y - 90 + 110 * Math.sin(v), Math.sin(Math.PI * k) * 1.3, 45 * k); });
      hjartan.forEach((g, i) => { const a = ord.mmm + 0.15 * i, k = del(a, a + 1.4, t), x0 = [180, 330, 470, 600, 260][i]; if (k > 0 && k < 1) sticker(g, x0 + 20 * Math.sin(6 * k + i), 560 - 260 * k, Math.sin(Math.PI * Math.min(1, k * 1.6)) * 1.1, 10 * Math.sin(4 * k)); });
    }
    // f: kolaklicken skvätter upp ur havet och landar på nosen, ligger kvar till g
    if (id === 'f' || id === 'g') {
      const [nx, ny] = bulleF.punkt([512, 432]), [sx, sy] = [rb.HAV_X + 220, HAV.y], k = del(ord.kola, ord.kola + 0.45, t);
      const kx = lerp(sx, nx, k), ky = k < 1 ? lerp(sy, ny, k) - 200 * Math.sin(Math.PI * k) : ny;
      const sq = k >= 1 ? 1 + 0.15 * Math.sin(Math.PI * clamp((t - ord.kola - 0.45) / 0.25)) : 1;
      const bort = id === 'g' ? del(ord.mmm, ord.mmm + 0.4, t) : 0;
      const slickt = id === 'f' ? ord.mums.reduce((a, m) => a + 0.22 * mjuk(del(m + 0.1, m + 0.3, t)), 0) : 0.44;   // varje slick tar lite av klicken
      if (t > ord.kola) sticker(klick, kx, ky, 0.24 * (1 - slickt) * (1 - bort) * sq, k >= 1 ? 0 : 200 * k);
      // tungan: sticker upp ur mungipan mot nosen och drar in igen, en gång per mums
      const lk = id === 'f' ? Math.max(...ord.mums.map(m => Math.sin(Math.PI * clamp(del(m - 0.05, m + 0.4, t))))) : 0;
      slick.style.display = lk > 0.02 ? '' : 'none';
      if (lk > 0.02) {
        const [mx, my] = bulleF.punkt([530, 492]), u = Math.hypot(...[0, 1].map(i => bulleF.punkt([512, 555])[i] - bulleF.punkt([512, 455])[i])) / 100;
        const L = 46 * u * lk, b = 13 * u, ty = my - L;
        slick.setAttribute('d', `M${mx - b} ${my} L${mx - b} ${ty + b} A${b} ${b} 0 0 1 ${mx + b} ${ty + b} L${mx + b} ${my} Z`);
      }
    }
    // kameran (Sanna 2026-11-06: "less zoom effects and more cuts"): stilla bilder och raka klipp på slaget, inga svep.
    // a halvbild på tornet, klipp till helbild på "Rutscha" (b–e), närbild på Bulles ansikte (f, "closer crop at kola på nosen"),
    // halvnära (g–h)
    rb.storPalm.style.display = id === 'f' ? 'none' : '';   // palmstammen skar över ansiktet i närbilden
    if (id === 'f') { const [fx, fy] = bulleF.punkt([512, 420]); kit.kamera(fx, fy - flyt, 2.4, false, true); }   // stilla: guppet (flyt) räknas bort
    else if (id === 'g' || id === 'h') kit.kamera(rb.HAV_X + 60, HAV_Y - 170, 1.45, false, true);
    else kit.kamera(...(t < ord.rutsch[0] ? rb.TOPPBILD : rb.HEL), false, true);   // #24: stilla mellan klippen
    return id;
  };
  return r;
}

window.refrang = { ny };
})();
