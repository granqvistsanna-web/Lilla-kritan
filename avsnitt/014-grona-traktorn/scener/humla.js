// Kopierad från 007 (014: humlan i vagen-1:s körscen 03b, runt Lovas huvud, Sanna 2026-11-06: "like the butterfly moved around mouse").
// Humlan Humle surrar förbi i bakgrunden (Sanna 2026-11-06: "more bumble bee flying by"). Ett bakgrundsinslag som Fia,
// ingen roll i berättelsen: högt upp, liten, i en mjuk vågig bana tvärs över bilden, ibland med en liten slinga.
// Läses in efter kit.js. Humlan vänds bara mellan turerna (en tur börjar och slutar utanför bild), aldrig mitt i en.
// Sanna 2026-11-06 ("just a small one with no legs, flying slower maybe sitting by teddy", sedan "a bit bigger and flying around"):
// h 50 i bild, utan ben, lugnare
// sicksack, och en tur kan sluta med att hon sätter sig: { …, sitt: t1 } = hon sitter kvar på `till` fram till t1 (vingarna fläktar
// då och då, hon tittar på nallen och blinkar). Med lastbilens grupp som förälder sitter hon på flaket och följer med i guppen.
//   const h = await humla.ny(null, [{ a: 5, e: 9, fran: [W + 80, 150], till: [-80, 200], slinga: true }, …])
//   h.rita(t)            // i render
//   h.ljud()             // i bygg: ett lågt surr per tur (kit.ljud)
// Sanna 2026-11-06 ("find more intentional use"): Humle hjälper till att leta brunt. En tur kan följa något som rör sig:
// { a, e, bana: t => [x, y], dir: ±1 } (kotten som trillar, spetsen på snurran); fran/till behövs då inte.
(() => {
const { del, lerp, inUt, blink } = kit;
async function ny(parent, turer, opt = {}) {
  // utan förälder flyger hon i bildens eget lager, ovanför kameran: då korsar hon alltid bilden, hur kameran än zoomar
  parent = parent || kit.el('g', { filter: 'url(#boil)' }, document.querySelector('body > svg'));
  const H0 = opt.h ?? 50, f = await kit.figur('humlan-humle', { h: H0, forelder: parent });
  for (const b of ['leg-l', 'leg-r']) if (f.delar[b]) f.delar[b].style.display = 'none';
  const sitter = (tur, t) => {   // sitter på `till`: vingarna stilla med en fläkt ibland, andas lite, tittar på nallen
    const dir = Math.sign(tur.till[0] - tur.fran[0]) || 1, s = t - tur.e, flakt = Math.max(0, Math.sin(s * 1.3)) ** 6;
    const vinge = 8 + 26 * flakt * Math.sin(t * 40);
    f.pose({ x: tur.till[0], y: tur.till[1] - 1.5 * Math.abs(Math.sin(s * 2.2)), tilt: 0, flip: dir > 0, titt: tur.titt ?? 1, ogon: s % 5 > 3.2 ? 'happy' : 'open',
      mun: 0, blink: blink(t, [tur.e + 1.6, tur.e + 4.4, tur.e + 7.9, tur.e + 11.3]), synlig: true,
      delar: { 'vinge-l': vinge, 'vinge-r': -vinge, 'arm-l': 0, 'arm-r': 0 } });
  };
  const rita = t => {
    const tur = turer.find(u => t > u.a && t < u.e);
    if (!tur) { const sitt = turer.find(u => u.sitt && t >= u.e && t < u.sitt); return sitt ? sitter(sitt, t) : f.pose({ synlig: false }); }
    const k = del(tur.a, tur.e, t), m = inUt(k);
    if (tur.bana) {   // följer ett mål som rör sig, med ett litet surr runt det
      const [bx, by] = tur.bana(t), d = tur.dir ?? 1;
      return f.pose({ x: bx + 6 * Math.sin(t * 5), y: by + (tur.amp ?? 8) * Math.sin(t * 7), tilt: -6 * d, flip: d > 0, titt: tur.titt ?? 1, ogon: 'open', mun: 0.2,
        blink: 0, synlig: true, delar: { 'vinge-l': Math.sin(t * 44) * 30, 'vinge-r': -Math.sin(t * 44) * 30, 'arm-l': 0, 'arm-r': 0 } });
    }
    const dir = Math.sign(tur.till[0] - tur.fran[0]) || Math.sign((tur.via || tur.till)[0] - tur.fran[0]) || 1;
    const landar = tur.sitt ? 1 - del(0.75, 1, k) : 1;   // sicksacken lägger sig när hon landar
    // via: en båge över en mellanpunkt (en tur runt lastbilen och tillbaka till nallen)
    const bez = i => tur.via ? (1 - m) ** 2 * tur.fran[i] + 2 * m * (1 - m) * (2 * tur.via[i] - (tur.fran[i] + tur.till[i]) / 2) + m * m * tur.till[i] : lerp(tur.fran[i], tur.till[i], m);
    let x = bez(0), y = bez(1) + (tur.amp ?? 12) * landar * Math.sin(k * Math.PI * 3);
    let glad = false;   // tilt och slinga som förut
    if (tur.slinga) {   // en liten slinga mitt på vägen: en cirkel med radien 0,7 × höjden, medan hon står kvar i x
      const s = del(0.4, 0.62, k);
      if (s > 0 && s < 1) { const v = 2 * Math.PI * s; const rr = 0.7 * H0; x += dir * rr * Math.sin(v); y -= rr * (1 - Math.cos(v)); glad = true; }
    }
    const vinge = Math.sin(t * 44) * 30;
    f.pose({ x, y, tilt: -6 * dir + 4 * Math.sin(t * 3), flip: dir > 0, titt: 1, ogon: glad ? 'happy' : 'open', mun: glad ? 0.3 : 0,
      blink: blink(t, [tur.a + 0.8]), synlig: true,
      delar: { 'vinge-l': vinge, 'vinge-r': -vinge, 'arm-l': 10 * Math.sin(t * 6), 'arm-r': -10 * Math.sin(t * 6) } });
  };
  const ljud = () => turer.forEach(u => kit.ljud('surr', u.a + 0.2, { langd: u.e - u.a - 0.3, vol: opt.vol ?? 0.18, fade: 0.8 }));
  return { f, rita, ljud };
}
window.humla = { ny };
})();
