// Refrängen i 006 (05a–f, 09a–f), likadan båda gångerna och som storyboarden. Lugn (Sanna, 2026-11-05: blixten och mönstret var
// för hetsiga): en dansbild på sjön för rad 1–7 utan klipp på slagen, och närbild bara på rad 8. Läses in efter kit.js,
// ansikten.js och baten.js. Klippen och tiderna ur storyboarden (M.bild), takten ur kit.BEAT:
// Hela sjön glider över till orange på refrängens första slag och tillbaka till blått på det sista (lager/sjon-orange.png,
// orange_plåt() i bygg.py), utan blink; båten har sin vita kant som i sjön.
//   a  rad 1–2 "Orange! (Orange!)"        armarna upp, båten gungar upp och ner en gång per rop och eko (halvtakt)
//   b  rad 3 "Orange är bästa färgen!"     samma bild: händerna på magen, gungar åt sidorna i halvtakt
//   c  rad 4–5                             samma som a
//   d  rad 6 "Som en fin apelsin!"         apelsinens ögonblick: en stor bubbla med apelsinen poppar upp i himlen till höger
//                                          (glitter), kameran glider mjukt in mot den och tillbaka ut på sista slaget, fem
//                                          mjuka glimtar tindrar runt den. Disa pekar och ritar en cirkel runt den. Apelsinen
//                                          har ett nöjt ansikte (njuter), gungar nöjt på slagen och blinkar på sista slaget
//   e  rad 7 "Tut, tut, tut, tut"          samma bild: båten gungar två gånger, sedan två knytnävspumpar
//   f  rad 8 "vad är orange? Titta ut!"    närbild: pekar ut åt höger och tittar dit, sedan med andra armen åt vänster
//
// Världen finns kvar (Sanna, 2026-11-05: "refrängen needs work", "no abrupt cuts or jagged motions", skissen i _skiss/refrang/):
// den orange sjön läggs under scenens öar och moln, som fortsätter glida förbi, och en låg sol går upp bakom öarna. Ekot på rad 2
// och 5 svaras av fisken, som hoppar upp vid fören och ler mot Disa ("maybe fish can jump up to boat and smile"). På rad 3 ritar
// kritan en orange båge över himlen. Rad 8 glider in till närbilden och ut igen, och fågeln flyger förbi åt det håll Disa pekar.
// Refrängen tar över scenens bild mjukt: r.fanga() läser båtens pose och kameran strax före refrängen, och båten och kameran
// glider därifrån till dansbilden på två slag (r.glid(t) 0 → 1, för scenens vågor).
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, vagor)                      // L = kit.duk(...); vagor = scenens vatten framför båten
//   r.fanga(render, tid, bat)                   // efter bygget: scenens båt och kamera strax före refrängen (tid = refrängens start)
//   r.rita(t)                                   // null utanför refrängen, annars klippets bokstav. Poserar båten och kameran själv.
(() => {
const { el, bild, mjuk, inUt, over, del, lerp, clamp, BEAT } = kit;
const APELSIN_ANSIKTE = { ogon: [[395, 540], [635, 540]], ogonSkala: 2.4, mun: [515, 640], munSkala: 2.6 };   // som apelsin_nöjd() i bygg.py
const LAGER = new URL('lager/', document.currentScript.src).href;
const DANS = { x: W / 2, y: 690, h: 540 }, HOPP = 40;
// rad 6: bubblans mitt (högre än REF_BUBBLOR i bygg.py, så att den inte täcker fisken på fören), bildens bbox y0/y1 i 1024-rutan, slaget den poppar på
const SAKER = [['apelsin', W - 400, 175, 70, 959, 0.5]], BUBBLA_R = 125, BUBBLA_SAK = 156;
// rad 6 (Sanna, 2026-11-05: "focus more on fin apelsin and maybe glimmer"): kamerans mitt och zoom, och glimtarna runt bubblan
// (vinkel, avstånd × BUBBLA_R, storlek), som APELSIN_KAMERA och GLIMTAR i bygg.py
const KAM = [820, 350, 1.2], GLIMTAR = [[-140, 1.55, 22], [-80, 1.4, 28], [-25, 1.55, 20], [30, 1.55, 26], [100, 1.45, 18]];
const RAD7 = { r: [1300, 200], l: [-280, 200] };   // armarna där rad 7 börjar, så att rad 6 landar i dem utan ryck
const MAGE = { r: [512, 620], l: [512, 620] }, UPP = { r: [1500, -700], l: [-480, -700] };
// rad 8: armen pekar ut åt sidan eller hänger rakt ner (vila), i Disas 1024-ruta (baten.js PIV)
const UT = { r: [3000, -400], l: [-3000, -400] }, NER = { r: [765, 3000], l: [252, 3000] };
const BLA = [0x56, 0xA8, 0xD6], MORK = [226, 112, 38];   // vattnet framför båten: blått → REF_MÖRK i bygg.py
const vattenFarg = (v, q) => { if (v) v.g.firstChild.setAttribute('fill', `rgb(${BLA.map((c, i) => Math.round(lerp(c, MORK[i], q))).join(',')})`); };
const mot = (a, b, q) => [lerp(a[0], b[0], q), lerp(a[1], b[1], q)];
// Byte mellan raderna i samma bild (a–e): förra radens slutpose glider över i den nya på 0,35 s med litet överslag,
// i stället för att armarna hoppar direkt (polishpasset, 2026-11-05)
const BYTE = 0.35;
const blanda = (p0, p1, q) => {
  const p = { ...p1 };
  for (const n of ['y', 'tilt', 'rot']) p[n] = lerp(p0[n] ?? DANS[n] ?? 0, p1[n] ?? DANS[n] ?? 0, q);
  for (const s of 'rl') if (p0[s] && p1[s]) p[s] = mot(p0[s], p1[s], q);
  return p;
};

async function ny(M, n, S) {
  const id = ['a', 'b', 'c', 'd', 'e', 'f'], T = {};
  id.forEach(k => { const [a, b] = M.bild(n + k); T[k] = [S(a), S(b)]; });
  const EKO = ['a', 'c'].map(k => (T[k][0] + T[k][1]) / 2);   // ekot "(Orange!)" på rad 2 och 5, mitt i bilden
  // Fisken (Sanna, 2026-11-05: "make it chill and just jump up and sit on boat"): ett lugnt hopp upp på fören vid första ekot,
  // sitter sedan kvar och gungar med båten, ett litet glatt skutt på andra ekot, och hoppar tillbaka i vattnet i slutet av rad 7, före inzoomningen i rad 8, så att den inte försvinner ut ur bild (Sanna, 2026-11-05: "make sure the fish dont abruptly cut out at refräng")
  const UPP_P = [EKO[0] - 0.55, EKO[0] + 0.45], NER_P = [T.f[0] - 1.0, T.f[0] - 0.1], SKUTT = [EKO[1] - 0.2, EKO[1] + 0.4];
  const ser = t => Math.max(0, ...EKO.map(e => mjuk(del(e - 0.45, e - 0.1, t)) * (1 - mjuk(del(e + 0.6, e + 0.95, t)))));   // Disa tittar på fisken
  let bat, saker, vagor, orange, torka, mal, ansikte, sol, bage, kritor, fisk, fiskAns, fagel, start = null, senast = DANS;
  // Disas pose på rad a, b, c och e (båten gungar, armarna), ren funktion av tiden så att bytena kan blandas
  const radPose = (k, t) => {
    const slag = (t - T[k][0]) / BEAT, andetag = Math.sin(Math.PI * slag / 2) ** 2;   // 0 → 1 → 0 på två slag
    if (k === 'a' || k === 'c') return { ...DANS, y: DANS.y - HOPP * andetag, ...UPP, humor: ser(t) > 0.5 ? 'skrattar' : 'ropar', tilt: 1.5 * Math.sin(Math.PI * slag / 2), titt: ser(t) };   // armarna upp, gungar upp på rösten och ner på ekot
    if (k === 'b') return { ...DANS, ...MAGE, humor: 'karleksfull', rot: 5 * Math.sin(Math.PI * slag / 2) };   // händerna på magen, gungar åt sidorna i halvtakt
    // e: putt, putt (gunga två gånger), tut, tut (två knytnävspumpar)
    const puttar = slag < 2, gung = Math.abs(Math.sin(Math.PI * slag)), pump = puttar ? 0 : Math.abs(Math.sin(Math.PI * (slag - 2)));
    return { ...DANS, y: DANS.y - (puttar ? HOPP * gung : 0), tilt: puttar ? 3 * Math.sin(Math.PI * slag) : 0, humor: 'skrattar',
      r: [RAD7.r[0], RAD7.r[1] - 500 * pump], l: [RAD7.l[0], RAD7.l[1] - 500 * pump] };
  };
  const poseBat = p => { bat.pose(p); senast = p; };
  // en punkt i båtens 1024-ruta i bild för båtposen p (samma transform som baten.js)
  const batPunkt = (p, [px, py]) => {
    const BB = baten.BB, sk = p.h / (BB[3] - BB[1]), v = (p.tilt || 0) * Math.PI / 180, dx = sk * (px - (BB[0] + BB[2]) / 2), dy = sk * (py - BB[3]);
    return [p.x + dx * Math.cos(v) - dy * Math.sin(v), p.y + dx * Math.sin(v) + dy * Math.cos(v)];
  };
  const SITS = [945, 490], FISK_S = 0.27, FISK_UNDER = (793 - 507) * FISK_S;   // fiskens plats på förens reling, fiskens underkant under mitten
  function ritaFisk(t) {
    if (t < UPP_P[0] || t > NER_P[1]) return;
    const [sx, sy] = batPunkt(senast, SITS), sitt = [sx, sy - FISK_UNDER + 6], vatten = [sx + (t < UPP_P[1] ? 200 : 40), H + 120];
    let x, y, rot = senast.tilt || 0, kx = 1, ky = 1, humor = 'glad';
    if (t < UPP_P[1]) {   // upp: en mjuk båge ur vattnet, landar med en liten fjädring
      const q = mjuk(del(...UPP_P, t));
      x = lerp(vatten[0], sitt[0], q); y = lerp(vatten[1], sitt[1], q) - 110 * Math.sin(Math.PI * q); rot += 14 * (1 - q);
    } else if (t < NER_P[0]) {   // sitter på fören och ler mot Disa; trycks lite ihop när den landar och på andra ekots skutt
      [x, y] = sitt;
      const land = Math.exp(-(t - UPP_P[1]) * 7) * Math.sin((t - UPP_P[1]) * 18), sk = Math.sin(Math.PI * clamp(del(...SKUTT, t)));
      y -= 18 * sk; ky = 1 - 0.08 * land; kx = 1 + 0.06 * land;
      rot += 3 * Math.sin(t * 2.2);
      humor = sk > 0.1 || t - UPP_P[1] < 0.5 ? 'skrattar' : 'glad';
    } else {   // ner: tillbaka i vattnet, samma lugna båge
      const q = mjuk(del(...NER_P, t));
      x = lerp(sitt[0], vatten[0], q); y = lerp(sitt[1], vatten[1], q) - 80 * Math.sin(Math.PI * q); rot -= 14 * q;
    }
    fisk.style.display = '';
    fisk.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${(-FISK_S * kx).toFixed(3)} ${(FISK_S * ky).toFixed(3)})`);
    fiskAns.satt(humor, { titt: 0.5 });
  }
  const r = {
    // radens pose, de första BYTE sekunderna blandad från förra radens sista bild (p = radens egen pose om den redan är räknad)
    mjukt(k, t, p = radPose(k, t)) {
      const i = id.indexOf(k), q = kit.over(del(T[k][0], T[k][0] + BYTE, t));
      if (i === 0 || k === 'e' || q >= 1) return p;   // rad 6 landar redan i rad 7:s armar
      return blanda(radPose(id[i - 1], T[k][0] - 1e-3), p, q);
    },
    async bygg(L, v) {
      vagor = v;
      // under scenens öar och moln (efter plattans bild): den orange sjön, solen och bågen
      const under = g => (L.plate.insertBefore(g, forst), g), forst = L.plate.children[1] ?? null;
      // den orange sjön ovanpå den blå, torkas in från vänster med en ojämn kritkant och ut åt höger (ingen tonad grå mellanbild,
      // granskningen 2026-11-05)
      const mask = el('mask', { id: `orange${n}`, maskUnits: 'userSpaceOnUse', x: -3000, y: -3000, width: 8000, height: 7000 }, document.querySelector('svg defs'));
      torka = el('rect', { y: -1500, height: H + 3000, fill: '#fff', filter: 'url(#kritkant)' }, mask);
      orange = under(el('g', { mask: `url(#orange${n})` }, L.plate));
      bild(`${LAGER}sjon-orange.png`, orange, { width: W, height: H });
      sol = under(el('g', {}, L.plate));
      bild(`${LAGER}sol.png`, el('g', { transform: 'translate(-512 -512)' }, sol));
      // en regnbåge i krita (Sanna, 2026-11-05: "maybe crayons draw a rainbow with orange behind boat"): sju band i orange nyanser, det orange
      // bredast, var och ett ritat av sin egen krita (mjukare kritkant med boil, granskningen p. 20)
      bage = under(el('g', { filter: 'url(#boil)' }, L.plate));
      let o = 0;
      bage.band = REGNBAGE.map(([c, w]) => { const p = el('path', { d: bandD(o + w / 2), fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round' }, bage);
        o += w - 3; p.langd = p.getTotalLength(); return p; });
      saker = el('g', {}, L.figurer);
      const sakEl = SAKER.map(([namn, , , y0, y1]) => {
        const g = el('g', {}, saker), sk = BUBBLA_SAK / (y1 - y0);
        el('circle', { r: BUBBLA_R, fill: '#ffffff', 'fill-opacity': 0.28, stroke: '#fff', 'stroke-width': 7 }, g);
        const inre = el('g', { transform: `scale(${sk}) translate(-512 ${-(y0 + y1) / 2})` }, g);
        bild(`${LAGER}${namn}.png`, inre);
        ansikte = ansikten.bygg(inre, APELSIN_ANSIKTE);
        el('path', { d: 'M-83 -30 A 88 88 0 0 1 -30 -83', stroke: '#fff', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none', opacity: 0.85 }, g);
        g.glimtar = GLIMTAR.map(([v, a, s]) => {   // fyrudd med ett mjukt persikosken bakom, som stjärna() i bygg.py
          const gl = el('g', {}, saker), k = s * 0.28;
          el('circle', { r: s * 0.9, fill: '#ffd6aa', opacity: 0.5 }, gl);
          el('path', { d: `M0 ${-s} L${k} ${-k} L${s} 0 L${k} ${k} L0 ${s} L${-k} ${k} L${-s} 0 L${-k} ${-k}Z`, fill: '#fff' }, gl);
          return [gl, v * Math.PI / 180, a * BUBBLA_R];
        });
        return g;
      });
      saker.sakEl = sakEl;
      bat = await baten.ny(L.figurer);   // vit kant som i sjön, ingen brun kontur (granskningen p. 15)
      fisk = el('g', {}, L.figurer);   // framför båten
      const fi = el('g', { transform: 'translate(-502 -507)' }, fisk);
      bild(`${LAGER}fisk.png`, fi);
      fiskAns = ansikten.bygg(fi, ansikten.FISK);
      window.kant?.lagg(fi);   // vit kant (verktyg/kant.js)
      fagel = await baten.fagel(L.figurer);
      kritor = REGNBAGE.map(([c]) => { const g = el('g', {}, L.figurer); g.innerHTML = KRITA(c); return g; });
      // rad 6: bubblans mitt i Disas 1024-ruta, så att armen pekar rakt på den (som pumpbild() i bygg.py)
      poseBat({ ...DANS });
      const [x0, y0] = bat.punkt([0, 0]), [x1, y1] = bat.punkt([1000, 1000]);
      mal = [(SAKER[0][1] - x0) * 1000 / (x1 - x0), (SAKER[0][2] - y0) * 1000 / (y1 - y0)];
      r.dolj = () => { [orange, sol, bage, bat.g, saker, fisk, ...kritor].forEach(g => g.style.display = 'none'); fagel.pose(0, 0, 0, 0, { synlig: false }); };
      r.dolj();
      kit.ljud('glitter', T.d[0] + SAKER[0][5] * BEAT, { vol: 0.6 });   // när bubblan poppar upp
      kit.ljud('plask', UPP_P[0] + 0.05, { vol: 0.3 }); kit.ljud('plask', NER_P[1] - 0.05, { vol: 0.25 });   // fisken upp ur och ner i vattnet
    },
    // scenens båtpose och kamera vid tiden tid (anropen fångas, inget ritas kvar)
    fanga(render, tid, sbat) {
      const kam0 = kit.kamera, pose0 = sbat.pose;
      start = { kam: [W / 2, H / 2, 1], pose: {} };
      kit.kamera = (cx = W / 2, cy = H / 2, z = 1) => { start.kam = [cx, cy, z]; };
      sbat.pose = p => { start.pose = p; };
      try { render(tid); } finally { kit.kamera = kam0; sbat.pose = pose0; }
    },
    // 0 → 1 på refrängens två första slag, och tillbaka till 0 på de sista halvannat (båten glider tillbaka till scenens plats)
    glid: t => mjuk(del(T.a[0], T.a[0] + GLID, t)) * (1 - mjuk(del(T.f[1] - 1.5 * BEAT, T.f[1], t))),
    rita(t) { const k = r.bild(t); if (k) ritaFisk(t); return k; },
    bild(t) {
      const k = id.find(k => t >= T[k][0] && t < T[k][1]);
      r.dolj();
      if (!k) { vattenFarg(vagor, 0); return null; }
      const [a] = T[k], slag = (t - a) / BEAT, gq = mjuk(del(T.a[0], T.a[0] + GLID, t));
      const kam = (cx = W / 2, cy = H / 2, z = 1) => start && gq < 1   // från scenens kamera till refrängens
        ? kit.kamera(lerp(start.kam[0], cx, gq), lerp(start.kam[1], cy, gq), lerp(start.kam[2], z, gq)) : kit.kamera(cx, cy, z);
      kam();
      orange.style.display = '';   // torkas in på första halvannat slaget och ut på det sista
      const inn = mjuk(del(T.a[0], T.a[0] + 1.5 * BEAT, t)), utT = mjuk(del(T.f[1] - 1.5 * BEAT, T.f[1], t));
      const x0 = lerp(-300, W + 300, utT), x1 = lerp(-300, W + 300, inn);
      torka.setAttribute('x', x0.toFixed(1)); torka.setAttribute('width', Math.max(0, x1 - x0).toFixed(1));
      const oq = Math.min(inn, 1 - utT);
      vattenFarg(vagor, mjuk(del(0.4, 0.6, inn)) * (1 - mjuk(del(0.4, 0.6, utT))));   // vågorna byter färg när kanten passerar båten
      if (vagor) vagor.g.style.display = '';
      bat.g.style.display = '';
      // solen går upp bakom öarna på första raden och ner på sista slaget, vrider sig sakta
      sol.style.display = '';
      sol.setAttribute('opacity', oq.toFixed(3));
      sol.setAttribute('transform', `translate(${SOL[0]} ${lerp(SOL[1] + 200, SOL[1], mjuk(del(T.a[0], T.a[0] + 3 * BEAT, t)) * oq)}) rotate(${3 * t}) scale(${SOL[2]})`);
      // rad 3: kritorna ritar regnbågen, bredvid varandra med en liten förskjutning; den ligger kvar tills sjön blir blå igen
      if (t >= T.b[0]) { bage.style.display = ''; bage.setAttribute('opacity', (0.9 * oq).toFixed(3)); }
      bage.band.forEach((p, i) => {
        const bq = inUt(del(T.b[0] + 0.15 + 0.05 * i, T.b[1] - 0.55 + 0.05 * i, t));
        p.setAttribute('stroke-dasharray', `${(bq * p.langd).toFixed(1)} ${p.langd + 50}`);
        const kq = Math.min(over(del(T.b[0] - 0.1 + 0.05 * i, T.b[0] + 0.25 + 0.05 * i, t)), 1 - mjuk(del(T.b[1] - 0.45 + 0.05 * i, T.b[1] + 0.1 + 0.05 * i, t)));   // kritan poppar fram och lyfter
        if (kq <= 0) return;
        const pt = p.getPointAtLength(bq * p.langd);
        kritor[i].style.display = '';
        kritor[i].setAttribute('transform', `translate(${pt.x.toFixed(1)} ${(pt.y - 60 * (1 - kq)).toFixed(1)}) rotate(${25 + 6 * Math.sin(t * 9 + i)}) scale(${(0.38 * kq).toFixed(3)})`);
      });
      if (k !== 'd' && k !== 'f') {
        let p = r.mjukt(k, t);
        if (k === 'a' && start && gq < 1) {   // från scenens båtpose till dansbilden
          p = blanda(start.pose, p, gq);
          for (const n of ['x', 'h']) p[n] = lerp(start.pose[n] ?? DANS[n], p[n], gq);
        }
        poseBat(p);
        return k;
      }
      if (k === 'd') {   // apelsinens ögonblick: kameran glider in, bubblan poppar upp och glimtarna tindrar; allt glider tillbaka på sista slaget
        saker.style.display = '';
        const n = (T.d[1] - a) / BEAT, ut = mjuk(del(n - 0.6, n, slag));   // ut: 0 → 1 på radens sista drygt halva slag
        const zoom = lerp(1, KAM[2], mjuk(del(0, 1.5, slag)) * (1 - mjuk(del(n - 1, n, slag))));
        kam(KAM[0], KAM[1], zoom);
        ansikte.satt(slag >= n - 1 && slag < n - 0.4 ? 'blinkar' : 'njuter');
        SAKER.forEach(([, x, y, , , pa], i) => {
          const q = slag - pa, s = (q < 0 ? 0 : q < 0.4 ? lerp3(q / 0.4) : 1) * (1 - ut), gupp = 8 * Math.sin(Math.PI * (slag + i) / 2);
          saker.sakEl[i].setAttribute('transform', `translate(${x} ${y + gupp}) rotate(${6 * Math.sin(Math.PI * slag / 2)}) scale(${s})`);
          saker.sakEl[i].glimtar.forEach(([gl, v, d], j) => {   // tindrar sakta (en våg på fyra slag), blir aldrig mindre än 60 %
            const in_ = mjuk(del(pa + 0.3 + 0.2 * j, pa + 0.9 + 0.2 * j, slag)) * (1 - ut), tindra = 0.6 + 0.4 * Math.sin(Math.PI * (slag / 2 + j * 0.4)) ** 2;
            gl.setAttribute('transform', `translate(${x + d * Math.cos(v)} ${y + gupp + d * Math.sin(v)}) rotate(${12 * Math.sin(Math.PI * (slag / 4 + j / 3))}) scale(${(in_ * tindra).toFixed(3)})`);
            gl.setAttribute('opacity', (in_ * (0.7 + 0.3 * tindra)).toFixed(3));
          });
        });
        const pa = SAKER[0][5], cirkel = Math.PI * Math.min(Math.max(slag - pa, 0) / 1.25, 2), R = 325;   // ett varv på två och ett halvt slag
        const peka = slag >= pa ? [mal[0] + R * Math.cos(cirkel), mal[1] - R * Math.sin(cirkel)] : NER.r;
        const p = { ...DANS, humor: 'skrattar', tilt: 1.5 * Math.sin(Math.PI * slag / 2), r: mot(peka, RAD7.r, ut), l: mot(NER.l, RAD7.l, ut) };
        poseBat(r.mjukt('d', t, p));
        return k;
      }
      // f, närbild: pekar ut åt höger och tittar dit, byter mjukt mitt i raden till vänster armen och vänster håll. Kameran glider in
      // på första och ut på sista halvannat slaget (inget klipp), och fågeln flyger förbi från höger till vänster, dit Disa pekar
      const q = mjuk(del(1.7, 2.3, slag)), n = (T.f[1] - a) / BEAT;
      const p = r.mjukt('f', t, { ...DANS, r: mot(UT.r, NER.r, q), l: mot(NER.l, UT.l, q), humor: 'nyfiken', titt: lerp(1, -1, q), tittY: -0.2, rot: lerp(-4, 4, q) });
      if (start) { const u = 1 - r.glid(t); for (const n of ['x', 'y', 'h']) p[n] = lerp(p[n], start.pose[n] ?? p[n], u); }   // tillbaka till scenens plats
      poseBat(p);
      const [nx] = bat.punkt([511, 430]), [, oy] = bat.punkt([511, 400]), hc = 820 * 0.6 * DANS.h / (807 - 236);
      const nar = mjuk(del(0, 1.5, slag)) * (1 - mjuk(del(n - 1.5, n, slag)));
      kam(lerp(W / 2, nx, nar), lerp(H / 2, oy + hc * 0.08, nar), lerp(1, H / hc, nar));
      const fq = del(T.f[0] + 0.3, T.f[1] - 0.2, t);
      fagel.pose(lerp(W + 150, -150, fq), 150 + 25 * Math.sin(Math.PI * 2 * fq), 110, t, { flip: true, tilt: 4 * Math.sin(t * 3) });
      return k;
    },
  };
  return r;
}
// kritan: samma form som i kritan-ritar (spetsen i 0, 0)
// (färgen c; pappret runt den ljusare och strecken mörkare av samma färg)
const KRITA = c => `<path d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z" fill="${c}" stroke="#fff" stroke-width="12" stroke-linejoin="round" paint-order="stroke"/>`
  + `<path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="#fff" opacity="0.22"/><path d="M-19 -92 Q0 -98 19 -92 M-19 -218 Q0 -224 19 -218" stroke="#000" stroke-opacity="0.2" stroke-width="4" fill="none"/>`;
// regnbågens band utifrån och in: [färg, bredd]. Ett band o px in från den yttre bågen (bågen högt över Disa, ändarna bakom öarna)
const REGNBAGE = [['#FFE2BC', 20], ['#FFC98A', 20], ['#FFAE5C', 22], ['#F7923A', 24], ['#EA7A22', 22], ['#D9621A', 20], ['#BF4E14', 20]];   // "all colors in rainbow shades of orange": ljus persika ytterst, djup brandgul innerst
const bandD = o => `M${40 + o} 470 Q 690 ${-290 + 2 * o} ${1340 - o} 470`;
const SOL = [1290, 115, 0.24];   // bågen högt över Disa (ändarna bakom öarna) och solen uppe till höger, fri från båten
const GLID = 2 * BEAT;   // båten och kameran glider från scenens bild till dansbilden
const lerp3 = q => q < 0.6 ? 1.15 * mjuk(q / 0.6) : 1.15 - 0.15 * mjuk((q - 0.6) / 0.4);

window.refrang = { ny };
})();
