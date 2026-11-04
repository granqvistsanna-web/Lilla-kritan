// Refrängens musikvideo (004), samma för alla tre refrängerna. Läses in efter kit.js (och 003:s branta.js för vyn 'backe');
// allt hamnar i window.refrang. Ett klipp per sjungen rad, rakt klipp på taktslaget:
//   a "Tuta-tut, tuta-tut"            närbild på bussen från sidan, puffar på varje "tut" (studsstreck under hjulen)
//   b "lilla bussen kör så bra!"       den enda bilden som byts: 'backe' (branta backen från 003), 'vag' (björken och stugan), 'kullar' (mjuka kullar, badplatsen långt borta)
//   c "Tuta-tut, tuta-tut"            samma som a
//   d "hjulen snurrar runt, runt, runt!" närbild på framhjulet, ett extra varv per "runt"
// Scenen ritar vägen, bussen och passagerarna som vanligt; refrängen säger vilket klipp det är, var kameran står,
// och tar över bussens plats i b när vyn är en backe.
(() => {
const { el, lerp, del, takt, BEAT } = kit;
const KAMERA = { a: [1100, 790, 2.2], c: [1100, 790, 2.2], d: [1079, 926, 5] };   // d: tätt på framhjulet, det fyller halva bilden
if (kit.STAENDE) KAMERA.a = KAMERA.c = [1180, 790, 2.2];   // stående bild är smalare: ansiktet hamnar annars i kanten
const SJO = { rx: 120, ry: 26 };   // badplatsen långt borta på den bortre kullen: en liten rund sjö med sandstrand, ritad i kod

// r = refrang.ny(M, nr, S, vy): nr = 0, 1, 2 (vilken refräng), S = sångtid → scentid.
function ny(M, nr, S, vy) {
  const a = M.rad('Tuta-tut, tuta-tut', 2 * nr).t, slut = M.rad('hjulen snurrar', nr).slut;
  // raderna är lika långa i musiken: fyra lika delar mellan första "Tuta-tut" och nästa rad, på närmaste slag
  // (Whisper slirar på de inre raderna, i refräng 2 med nästan en sekund)
  const K = [0, 1, 2, 3, 4].map(k => S(takt(lerp(a, slut, k / 4))));
  const r = { vy, K, START: K[0], SLUT: K[4],
    TUT: [K[0], K[2]].flatMap(k => [k + BEAT, k + 3 * BEAT]),   // "tut" i varje "tuta-tut" (gissat på slagen, som 003)
    RUNT: [2, 2.6, 3.2].map(n => K[3] + n * BEAT) };            // "runt, runt, runt"
  r.skott = t => t < K[0] || t >= K[4] ? null : 'abcd'[K.findLastIndex(k => t >= k)];
  // extra fart (px/s) på varje "runt": precis ett varv till av hjulet (varv = 2π · hjulradien i bild)
  r.extra = (t, varv) => r.RUNT.reduce((s, x) => {
    const k = del(x - 0.05, x + 0.4, t);
    return s + (k > 0 && k < 1 ? varv / 0.225 * Math.pow(Math.sin(k * Math.PI), 2) : 0);
  }, 0);

  let backe, kullar, bjork, stuga, studs;
  // r.bygg(L): bakgrunden till b (gömd utanför b) och studsstrecken. saker = gruppen för saker vid vägen (vyn 'vag').
  r.bygg = (L, saker) => {
    if (vy === 'backe') {
      backe = branta.backar(L.plate);
      const k = backe.g.lastChild;                       // brantas egen sol och molnet vid kritans sol bort (kritans sol läggs i stället, bakom kullarna)
      k.children[0].remove(); k.children[0].remove();
      backe.rita({ vag: branta.BACKE, bort: branta.BORT, mitt: branta.MITT });
      kor.sol(backe.g, backe.g.children[1]);             // kritans sol, samma som på vägen, bakom kullarna
      if (kit.STAENDE) {                                 // stående: himlen uppåt och kullen nedåt förbi bildens kant (backarna slutar vid y 1180)
        Object.entries({ x: -3000, y: -4000, width: 7920, height: 5300 }).forEach(([k, v]) => backe.g.firstChild.setAttribute(k, v));
        const kulle = k.querySelector('path[fill="#8cc35f"]');   // marken under kullen i samma kornfilter, så att skarven inte syns
        kulle.after(el('rect', { x: -3000, y: 1150, width: 7920, height: 4000, fill: '#8cc35f' }));
        backe.g.ownerSVGElement.querySelector('#brantkorn').setAttribute('height', 5000);
      }
    }
    if (vy === 'kullar') {
      kullar = kit.backar(L.plate);
      kor.sol(kullar.g, kullar.g.children[1]);
      const k = kullar.g.lastChild, x = 1560, y = 480 - 90 * Math.sin(2 * Math.PI * (x + 200) / 1100);   // den bortre kullens topp vid x
      const sjo = el('g', {});
      k.insertBefore(sjo, k.children[1]);                // mellan den bortre kullen och vägkullen
      // (klippet ur badplatsens platta har en rak kant där sjön går ut ur plattan, så här är den hel och rund)
      const cy = y + 50;
      el('ellipse', { cx: x - 14, cy: cy + 4, rx: SJO.rx + 22, ry: SJO.ry + 10, fill: '#f6e08a' }, sjo);
      el('ellipse', { cx: x, cy, rx: SJO.rx, ry: SJO.ry, fill: '#86cdee', stroke: '#3f86c9', 'stroke-width': 4 }, sjo);
      for (const [dx, dy] of [[-45, -6], [40, 8]]) el('path', { d: `M${x + dx - 16} ${cy + dy} q8 -8 16 0 q8 -8 16 0`, fill: 'none', stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round' }, sjo);
    }
    if (vy === 'vag') { bjork = kit.vagsak('bjork', saker, 830, 340); stuga = kit.vagsak('stuga', saker, 830, 250); }
    studs = [0, 1, 2, 3].map(() => el('path', { fill: 'none', stroke: '#1d1d1d', 'stroke-width': 7, 'stroke-linecap': 'round' }, L.figurer));
  };

  // r.rita(t, d, pose): visar rätt bakgrund. d(t) = körd sträcka. Ger bussens pose i b när vyn är en backe, annars null.
  // pose: visa backen utanför refrängen också (körscen 1:s början) med bussen i den posen.
  r.rita = (t, d, pose = null) => {
    const s = r.skott(t), b = s === 'b' || !!pose;
    if (backe) backe.g.style.display = b ? '' : 'none';
    if (kullar) kullar.g.style.display = b ? '' : 'none';
    if (bjork) {
      const mitt = d((K[1] + K[2]) / 2);
      bjork.pa(1250 + mitt - d(t)); stuga.pa(1640 + mitt - d(t));
      bjork.g.style.display = stuga.g.style.display = t > K[0] && t < K[3] ? '' : 'none';
    }
    if (pose) return pose;
    if (!b) return null;
    const q = del(K[1], K[2], t);
    if (backe) {
      // uppför den branta backen, över krönet mitt i klippet, glatt nerför
      const x = lerp(330, 1620, q < 0.5 ? 0.5 * Math.pow(q * 2, 1.3) : 1 - 0.5 * Math.pow(2 - q * 2, 1.3));
      return { x, y: branta.BACKE(x) + 14, k: 0.42 / kor.STORLEK, tilt: branta.grader(branta.BACKE, x), dist: x * 1.1,
        ogon: Math.abs(x - 960) < 90 ? 'big' : x > 960 ? 'happy' : 'open' };
    }
    if (kullar) {
      const x = lerp(220, 1300, q);
      return { x, y: kullar.y(x) + 14, k: 0.36 / kor.STORLEK, tilt: kullar.grader(x), dist: x * 1.1, ogon: 'happy' };
    }
    return null;
  };
  // r.studs(t, buss): studsstreck under hjulen på varje "tut" i a och c (efter att bussen fått sin pose)
  r.studs = (t, buss) => {
    const s = r.skott(t), u = (s === 'a' || s === 'c') ? Math.max(0, ...r.TUT.map(x => 1 - Math.abs(t - x - 0.1) / 0.25)) : 0;
    studs.forEach((p, i) => {
      if (u <= 0) return p.setAttribute('d', '');
      const [hx, hy] = buss.punkt([[263, 739][i >> 1] + (i % 2 ? 80 : -80), 812]), sida = i % 2 ? 1 : -1;
      p.setAttribute('d', `M${hx + sida * 6} ${hy + 12} L${hx + sida * 22} ${hy + 12 + 26 * u}`);
    });
  };
  r.kamera = t => KAMERA[r.skott(t)] ? kor.narbild(KAMERA[r.skott(t)]) : null;   // bussen är större i körscenerna (kor.STORLEK)
  return r;
}

window.refrang = { ny };
})();
