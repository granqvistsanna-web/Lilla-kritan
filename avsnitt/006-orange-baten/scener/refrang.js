// Refrängen i 006 (05a–f, 09a–f), likadan båda gångerna och som storyboarden (inte 005:s ballongfärd). Läses in efter kit.js,
// ansikten.js och baten.js. Klippen och tiderna ur storyboarden (M.bild), takten ur kit.BEAT:
//   a, a2  rad 1–2 "Orange! (Orange!)"   dansbild; hårt klipp på varje slag: klarorange på rösten, ljusorange på ekot
//   b      rad 3 "Orange är bästa färgen!"  närbild, händerna på magen, gungar åt sidorna i takt
//   c, c2  rad 4–5                        samma blixt; Disa blir fyra på rösten och ett mönster (4 × 3) på ekot, alla poppar på en gång
//   d      rad 6 "Som apelsin och pumpa!"  på sjön: en bubbla med apelsinen poppar upp i himlen till vänster, en med pumpan
//                                          till höger (som 005:s bubblor), Disa pekar upp på dem (Sanna, 2026-11-05: jättepumpan
//                                          och en pumpa i vattnet kändes för slumpmässiga)
//   e      rad 7 "Tut, tut, tut, tut"    dansbild, båten gungar två gånger, sedan två knytnävspumpar
//   f      rad 8 "vad är orange? Titta ut!" närbild, handen över ögonen, tittar åt ena hållet och sedan åt det andra
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, vagor)                      // L = kit.duk(...); vagor = scenens vatten framför båten (döljs i blixten)
//   r.rita(t)                                   // null utanför refrängen, annars klippets bokstav. Poserar båten och kameran själv.
(() => {
const { el, bild, mjuk, del, clamp, BEAT } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const DANS = { x: W / 2, y: 690, h: 540 }, HOPP = 40;
const FYRA = [[0.3, 0.47], [0.7, 0.47], [0.3, 0.96], [0.7, 0.96]].map(([x, g]) => [x * W, g * H]);
const TAPET = [0.36, 0.67, 0.98].flatMap((g, rad) => [-1, 0, 1, 2, 3, 4].map(k => [(k + 0.5 * (rad % 2) + 0.125) * W / 4, g * H]));
// rad 6: bubblans mitt (som REF_BUBBLOR i bygg.py), bildens bbox y0/y1 i 1024-rutan, slaget den poppar på
const SAKER = [['apelsin', 175, 185, 70, 959, 0.6], ['pumpa', W - 175, 175, 89, 947, 2.2]], BUBBLA_R = 100, BUBBLA_SAK = 125;
const MAGE = { r: [600, 700], l: [420, 700] }, UPP = { r: [1500, -700], l: [-480, -700] };

async function ny(M, n, S) {
  const id = ['a', 'a2', 'b', 'c', 'c2', 'd', 'e', 'f'], T = {};
  id.forEach(k => { const [a, b] = M.bild(n + k); T[k] = [S(a), S(b)]; });
  let plate, blixt, bat, kopia, monster, saker, vagor;
  const r = {
    async bygg(L, v) {
      vagor = v;
      plate = L.plate;
      blixt = { rop: bild(`${LAGER}blixt-rop.png`, L.plate, { width: W, height: H }), eko: bild(`${LAGER}blixt-eko.png`, L.plate, { width: W, height: H }) };
      // mönstret: en båt i defs som kopieras med <use> (renderas en gång, som i storyboarden)
      const defs = document.querySelector('svg defs'), mall = el('g', {}, defs);
      kopia = await baten.ny(mall, { vit: true, kontur: true });
      kopia.g.id = `${n}-mall`;
      monster = el('g', {}, L.figurer);
      [...FYRA, ...TAPET].forEach(() => el('use', { href: `#${n}-mall` }, monster));
      saker = el('g', {}, L.figurer);
      const sakEl = SAKER.map(([namn, , , y0, y1]) => {
        const g = el('g', {}, saker), sk = BUBBLA_SAK / (y1 - y0);
        el('circle', { r: BUBBLA_R, fill: '#ffffff', 'fill-opacity': 0.28, stroke: '#fff', 'stroke-width': 7 }, g);
        bild(`${LAGER}${namn}.png`, el('g', { transform: `scale(${sk}) translate(-512 ${-(y0 + y1) / 2})` }, g));
        el('path', { d: 'M-66 -24 A 70 70 0 0 1 -24 -66', stroke: '#fff', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none', opacity: 0.85 }, g);
        return g;
      });
      saker.sakEl = sakEl;
      bat = await baten.ny(L.figurer, { vit: true, kontur: true });
      r.dolj = () => { Object.values(blixt).forEach(x => x.style.display = 'none'); [bat.g, monster, saker].forEach(g => g.style.display = 'none'); };
      r.dolj();
    },
    rita(t) {
      const k = id.find(k => t >= T[k][0] && t < T[k][1]);
      r.dolj();
      if (!k) return null;
      const [a] = T[k], slag = (t - a) / BEAT, gung = Math.abs(Math.sin(Math.PI * slag));
      kit.kamera();
      if (vagor) vagor.g.style.display = '';
      const humor = 'ropar';
      if (['a', 'a2', 'c', 'c2'].includes(k)) {   // blixten: "Orange! (Orange!)" är ett slag var i sången, så rop och eko byts varje slag från radens början
        const fas = Math.floor((t - T[k[0]][0]) / BEAT) % 2, farg = fas === 0 ? 'rop' : 'eko';
        if (farg) { blixt[farg].style.display = ''; if (vagor) vagor.g.style.display = 'none'; }
        const fler = farg && k.startsWith('c');
        if (fler) {   // Disa blir fyra (rop) och ett mönster (eko), alla på en gång: 0 → 1,15 → 1
          const pl = farg === 'rop' ? FYRA : TAPET, h = (farg === 'rop' ? 0.38 : 0.19) * H, q = (slag % 1);
          const pop = q < 0.25 ? lerp3(q / 0.25) : 1;
          kopia.pose({ x: 0, y: 0, h, ...UPP, humor, tilt: 2 * Math.sin(Math.PI * slag) });
          monster.style.display = '';
          [...monster.children].forEach((u, i) => {
            const p = (farg === 'rop' ? FYRA : TAPET)[i - (farg === 'rop' ? 0 : FYRA.length)];
            const vis = farg === 'rop' ? i < FYRA.length : i >= FYRA.length;
            u.style.display = vis ? '' : 'none';
            if (vis && p) u.setAttribute('transform', `translate(${p[0]} ${p[1] - h * 0.08 - 10 * gung}) scale(${pop})`);
          });
          return k;
        }
        bat.pose({ ...DANS, y: DANS.y - HOPP * gung + (farg ? 20 : 0), ...UPP, humor, kontur: !!farg, tilt: 1.5 * Math.sin(Math.PI * slag / 2) });
        bat.g.style.display = '';
        return k;
      }
      if (k === 'd') {   // apelsinen och pumpan poppar upp ur vattnet på sina ord och guppar; Disa pekar ut mot dem och skrattar
        bat.g.style.display = ''; saker.style.display = '';
        SAKER.forEach(([, x, y, , , pa], i) => {
          const q = slag - pa, s = q < 0 ? 0 : q < 0.4 ? lerp3(q / 0.4) : 1, gupp = 8 * Math.sin(Math.PI * (slag + i) / 2);
          saker.sakEl[i].setAttribute('transform', `translate(${x} ${y + gupp}) rotate(${4 * Math.sin(t * 2 + i)}) scale(${s})`);
        });
        bat.pose({ ...DANS, humor: 'skrattar', kontur: false, tilt: 1.5 * Math.sin(Math.PI * slag / 2),
          l: slag >= SAKER[0][5] ? [-480, -300] : undefined, r: slag >= SAKER[1][5] ? [1500, -300] : undefined });
        return k;
      }
      bat.g.style.display = '';
      if (k === 'e') {   // putt, putt (gunga två gånger), tut, tut (två knytnävspumpar)
        const puttar = slag < 2, pump2 = !puttar ? Math.max(0, Math.sin(Math.PI * (slag - 2))) : 0;
        bat.pose({ ...DANS, y: DANS.y - (puttar ? HOPP * gung : 0), tilt: puttar ? 3 * Math.sin(Math.PI * slag) : 0, humor: 'skrattar',
          r: [1300, 200 - 500 * pump2], l: [-280, 200 - 500 * pump2], kontur: false });
        return k;
      }
      // närbilderna b och f, på sjön med båten i dansbildens läge
      const sv = Math.sin(Math.PI * slag / 2);
      if (k === 'b') bat.pose({ ...DANS, ...MAGE, humor: 'karleksfull', rot: 5 * sv, kontur: false });
      else bat.pose({ ...DANS, r: [560, 330], humor: 'nyfiken', titt: slag < 2 ? 1 : -1, rot: slag < 2 ? 4 : -4, kontur: false });
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
