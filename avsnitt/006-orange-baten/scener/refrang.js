// Refrängen i 006 (05a–f, 09a–f), likadan båda gångerna och som storyboarden. Lugn (Sanna, 2026-11-05: blixten och mönstret var
// för hetsiga): en dansbild på sjön för rad 1–7 utan klipp på slagen, och närbild bara på rad 8. Läses in efter kit.js,
// ansikten.js och baten.js. Klippen och tiderna ur storyboarden (M.bild), takten ur kit.BEAT:
//   a  rad 1–2 "Orange! (Orange!)"        armarna upp, båten gungar upp och ner en gång per rop och eko (halvtakt);
//                                          himlen glöder mjukt persikoorange i samma andetag
//   b  rad 3 "Orange är bästa färgen!"     samma bild: händerna på magen, gungar åt sidorna i halvtakt
//   c  rad 4–5                             samma som a
//   d  rad 6 "Som en fin apelsin!"         samma bild: en bubbla med apelsinen poppar upp i himlen till höger (som 005:s
//                                          bubblor), Disa pekar på den och ritar en cirkel runt den
//   e  rad 7 "Tut, tut, tut, tut"          samma bild: båten gungar två gånger, sedan två knytnävspumpar
//   f  rad 8 "vad är orange? Titta ut!"    närbild: pekar ut åt höger och tittar dit, sedan med andra armen åt vänster
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, vagor)                      // L = kit.duk(...); vagor = scenens vatten framför båten
//   r.rita(t)                                   // null utanför refrängen, annars klippets bokstav. Poserar båten och kameran själv.
(() => {
const { el, bild, mjuk, del, lerp, BEAT } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const DANS = { x: W / 2, y: 690, h: 540 }, HOPP = 40;
// rad 6: bubblans mitt (som REF_BUBBLOR i bygg.py), bildens bbox y0/y1 i 1024-rutan, slaget den poppar på
const SAKER = [['apelsin', W - 230, 185, 70, 959, 1.0]], BUBBLA_R = 100, BUBBLA_SAK = 125;
const MAGE = { r: [512, 760], l: [512, 760] }, UPP = { r: [1500, -700], l: [-480, -700] };
// rad 8: armen pekar ut åt sidan eller hänger rakt ner (vila), i Disas 1024-ruta (baten.js PIV)
const UT = { r: [3000, -400], l: [-3000, -400] }, NER = { r: [765, 3000], l: [252, 3000] };
const mot = (a, b, q) => [lerp(a[0], b[0], q), lerp(a[1], b[1], q)];

async function ny(M, n, S) {
  const id = ['a', 'b', 'c', 'd', 'e', 'f'], T = {};
  id.forEach(k => { const [a, b] = M.bild(n + k); T[k] = [S(a), S(b)]; });
  let bat, saker, vagor, glod;
  const r = {
    async bygg(L, v) {
      vagor = v;
      // himlens glöd: persikoorange uppifrån, borta vid y = 400 (glöd() i bygg.py)
      document.querySelector('svg defs').insertAdjacentHTML('beforeend', `<linearGradient id="${n}-glod" x1="0" y1="0" x2="0" y2="${H}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#FFD6AA" stop-opacity="0.55"/><stop offset="${400 / H}" stop-color="#FFD6AA" stop-opacity="0"/></linearGradient>`);
      glod = el('rect', { width: W, height: H, fill: `url(#${n}-glod)` }, L.plate);
      saker = el('g', {}, L.figurer);
      const sakEl = SAKER.map(([namn, , , y0, y1]) => {
        const g = el('g', {}, saker), sk = BUBBLA_SAK / (y1 - y0);
        el('circle', { r: BUBBLA_R, fill: '#ffffff', 'fill-opacity': 0.28, stroke: '#fff', 'stroke-width': 7 }, g);
        bild(`${LAGER}${namn}.png`, el('g', { transform: `scale(${sk}) translate(-512 ${-(y0 + y1) / 2})` }, g));
        el('path', { d: 'M-66 -24 A 70 70 0 0 1 -24 -66', stroke: '#fff', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none', opacity: 0.85 }, g);
        return g;
      });
      saker.sakEl = sakEl;
      bat = await baten.ny(L.figurer);
      r.dolj = () => [glod, bat.g, saker].forEach(g => g.style.display = 'none');
      r.dolj();
    },
    rita(t) {
      const k = id.find(k => t >= T[k][0] && t < T[k][1]);
      r.dolj();
      if (!k) return null;
      const [a] = T[k], slag = (t - a) / BEAT, andetag = Math.sin(Math.PI * slag / 2) ** 2;   // 0 → 1 → 0 på två slag
      kit.kamera();
      if (vagor) vagor.g.style.display = '';
      bat.g.style.display = '';
      if (k === 'a' || k === 'c') {   // armarna upp, båten gungar upp på rösten och ner på ekot, himlen glöder med
        glod.style.display = ''; glod.setAttribute('opacity', andetag.toFixed(3));
        bat.pose({ ...DANS, y: DANS.y - HOPP * andetag, ...UPP, humor: 'ropar', tilt: 1.5 * Math.sin(Math.PI * slag / 2) });
        return k;
      }
      if (k === 'b') {   // händerna på magen, gungar åt sidorna i halvtakt
        bat.pose({ ...DANS, ...MAGE, humor: 'karleksfull', rot: 5 * Math.sin(Math.PI * slag / 2) });
        return k;
      }
      if (k === 'd') {   // bubblan med apelsinen poppar upp och guppar; Disa pekar på den och ritar en cirkel runt den
        saker.style.display = '';
        SAKER.forEach(([, x, y, , , pa], i) => {
          const q = slag - pa, s = q < 0 ? 0 : q < 0.4 ? lerp3(q / 0.4) : 1, gupp = 8 * Math.sin(Math.PI * (slag + i) / 2);
          saker.sakEl[i].setAttribute('transform', `translate(${x} ${y + gupp}) rotate(${4 * Math.sin(t * 2 + i)}) scale(${s})`);
        });
        bat.pose({ ...DANS, humor: 'skrattar', tilt: 1.5 * Math.sin(Math.PI * slag / 2),
          r: slag >= SAKER[0][5] ? [1500 + 260 * Math.cos(Math.PI * (slag - SAKER[0][5])), -300 - 260 * Math.sin(Math.PI * (slag - SAKER[0][5]))] : undefined });
        return k;
      }
      if (k === 'e') {   // putt, putt (gunga två gånger), tut, tut (två knytnävspumpar)
        const puttar = slag < 2, gung = Math.abs(Math.sin(Math.PI * slag)), pump = puttar ? 0 : Math.abs(Math.sin(Math.PI * (slag - 2)));
        bat.pose({ ...DANS, y: DANS.y - (puttar ? HOPP * gung : 0), tilt: puttar ? 3 * Math.sin(Math.PI * slag) : 0, humor: 'skrattar',
          r: [1300, 200 - 500 * pump], l: [-280, 200 - 500 * pump] });
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
