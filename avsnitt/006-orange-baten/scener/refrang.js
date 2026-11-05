// Refrängen i 006 (05a–f, 09a–f), likadan båda gångerna och som storyboarden. Lugn (Sanna, 2026-11-05: blixten och mönstret var
// för hetsiga): en dansbild på sjön för rad 1–7 utan klipp på slagen, och närbild bara på rad 8. Läses in efter kit.js,
// ansikten.js och baten.js. Klippen och tiderna ur storyboarden (M.bild), takten ur kit.BEAT:
// Hela sjön glider över till orange på refrängens första slag och tillbaka till blått på det sista (lager/sjon-orange.png,
// orange_plåt() i bygg.py), utan blink; båten har sin mörkorange kontur så att den syns mot det orange vattnet.
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
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, vagor)                      // L = kit.duk(...); vagor = scenens vatten framför båten
//   r.rita(t)                                   // null utanför refrängen, annars klippets bokstav. Poserar båten och kameran själv.
(() => {
const { el, bild, mjuk, del, lerp, BEAT } = kit;
const APELSIN_ANSIKTE = { ogon: [[395, 540], [635, 540]], ogonSkala: 2.4, mun: [515, 640], munSkala: 2.6 };   // som apelsin_nöjd() i bygg.py
const LAGER = new URL('lager/', document.currentScript.src).href;
const DANS = { x: W / 2, y: 690, h: 540 }, HOPP = 40;
// rad 6: bubblans mitt (som REF_BUBBLOR i bygg.py), bildens bbox y0/y1 i 1024-rutan, slaget den poppar på
const SAKER = [['apelsin', W - 300, 280, 70, 959, 0.5]], BUBBLA_R = 125, BUBBLA_SAK = 156;
// rad 6 (Sanna, 2026-11-05: "focus more on fin apelsin and maybe glimmer"): kamerans mitt och zoom, och glimtarna runt bubblan
// (vinkel, avstånd × BUBBLA_R, storlek), som APELSIN_KAMERA och GLIMTAR i bygg.py
const KAM = [820, 400, 1.2], GLIMTAR = [[-140, 1.55, 22], [-80, 1.4, 28], [-25, 1.55, 20], [30, 1.55, 26], [100, 1.45, 18]];
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
  let bat, saker, vagor, orange, mal, ansikte;
  // Disas pose på rad a, b, c och e (båten gungar, armarna), ren funktion av tiden så att bytena kan blandas
  const radPose = (k, t) => {
    const slag = (t - T[k][0]) / BEAT, andetag = Math.sin(Math.PI * slag / 2) ** 2;   // 0 → 1 → 0 på två slag
    if (k === 'a' || k === 'c') return { ...DANS, y: DANS.y - HOPP * andetag, ...UPP, humor: 'ropar', tilt: 1.5 * Math.sin(Math.PI * slag / 2) };   // armarna upp, gungar upp på rösten och ner på ekot
    if (k === 'b') return { ...DANS, ...MAGE, humor: 'karleksfull', rot: 5 * Math.sin(Math.PI * slag / 2) };   // händerna på magen, gungar åt sidorna i halvtakt
    // e: putt, putt (gunga två gånger), tut, tut (två knytnävspumpar)
    const puttar = slag < 2, gung = Math.abs(Math.sin(Math.PI * slag)), pump = puttar ? 0 : Math.abs(Math.sin(Math.PI * (slag - 2)));
    return { ...DANS, y: DANS.y - (puttar ? HOPP * gung : 0), tilt: puttar ? 3 * Math.sin(Math.PI * slag) : 0, humor: 'skrattar',
      r: [RAD7.r[0], RAD7.r[1] - 500 * pump], l: [RAD7.l[0], RAD7.l[1] - 500 * pump] };
  };
  const r = {
    // radens pose, de första BYTE sekunderna blandad från förra radens sista bild (p = radens egen pose om den redan är räknad)
    mjukt(k, t, p = radPose(k, t)) {
      const i = id.indexOf(k), q = kit.over(del(T[k][0], T[k][0] + BYTE, t));
      if (i === 0 || k === 'e' || q >= 1) return p;   // rad 6 landar redan i rad 7:s armar
      return blanda(radPose(id[i - 1], T[k][0] - 1e-3), p, q);
    },
    async bygg(L, v) {
      vagor = v;
      orange = el('g', {}, L.plate);   // den orange sjön ovanpå den blå, opaciteten glider in och ut
      bild(`${LAGER}sjon-orange.png`, orange, { width: W, height: H });
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
      bat = await baten.ny(L.figurer, { kontur: true });
      // rad 6: bubblans mitt i Disas 1024-ruta, så att armen pekar rakt på den (som pumpbild() i bygg.py)
      bat.pose({ ...DANS });
      const [x0, y0] = bat.punkt([0, 0]), [x1, y1] = bat.punkt([1000, 1000]);
      mal = [(SAKER[0][1] - x0) * 1000 / (x1 - x0), (SAKER[0][2] - y0) * 1000 / (y1 - y0)];
      r.dolj = () => [orange, bat.g, saker].forEach(g => g.style.display = 'none');
      r.dolj();
      kit.ljud('glitter', T.d[0] + SAKER[0][5] * BEAT, { vol: 0.6 });   // när bubblan poppar upp
    },
    rita(t) {
      const k = id.find(k => t >= T[k][0] && t < T[k][1]);
      r.dolj();
      if (!k) { vattenFarg(vagor, 0); return null; }
      const [a] = T[k], slag = (t - a) / BEAT;
      kit.kamera();
      orange.style.display = '';   // glider in på första slaget och tillbaka till blått på det sista
      const oq = Math.min(mjuk(del(T.a[0], T.a[0] + BEAT, t)), 1 - mjuk(del(T.f[1] - BEAT, T.f[1], t)));
      orange.setAttribute('opacity', oq.toFixed(3));
      vattenFarg(vagor, oq);
      if (vagor) vagor.g.style.display = '';
      bat.g.style.display = '';
      if (k !== 'd' && k !== 'f') { bat.pose(r.mjukt(k, t)); return k; }
      if (k === 'd') {   // apelsinens ögonblick: kameran glider in, bubblan poppar upp och glimtarna tindrar; allt glider tillbaka på sista slaget
        saker.style.display = '';
        const n = (T.d[1] - a) / BEAT, ut = mjuk(del(n - 0.6, n, slag));   // ut: 0 → 1 på radens sista drygt halva slag
        const zoom = lerp(1, KAM[2], mjuk(del(0, 1.5, slag)) * (1 - mjuk(del(n - 1, n, slag))));
        kit.kamera(KAM[0], KAM[1], zoom);
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
        bat.pose(r.mjukt('d', t, p));
        return k;
      }
      // f, närbild: pekar ut åt höger och tittar dit, byter mjukt mitt i raden till vänster armen och vänster håll
      const q = mjuk(del(1.7, 2.3, slag));
      bat.pose({ ...DANS, r: mot(UT.r, NER.r, q), l: mot(NER.l, UT.l, q), humor: 'nyfiken', titt: lerp(1, -1, q), tittY: -0.2, rot: lerp(-4, 4, q) });
      const [nx] = bat.punkt([511, 430]), [, oy] = bat.punkt([511, 400]), hc = 820 * 0.6 * DANS.h / (807 - 236);
      kit.kamera(nx, oy + hc * 0.08, H / hc);
      return k;
    },
  };
  return r;
}
const lerp3 = q => q < 0.6 ? 1.15 * mjuk(q / 0.6) : 1.15 - 0.15 * mjuk((q - 0.6) / 0.4);

window.refrang = { ny };
})();
