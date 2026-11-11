// En Gissa teckningen-lucka: laddar en befintlig teckning (dess egen index.html) och kör den med julkalenderns ram, utan att ändra
// teckningen. Liggande, så render.mjs körs med --liggande. Sidan ska ha gissa.js, kant.js, blinka.js, v2-rigg.js och lucka.js laddade.
//   gissaLucka('produktion/youtube/shorts/gissa/bondgarden/katt/', 12)
// Teckningens röster (svar.m4a, saga.m4a) hämtas ur teckningens egen mapp: sidans adress byts till den innan teckningen startar.
async function gissaLucka(mapp, N) {
  const kod = (await (await fetch(`/${mapp}index.html`)).text()).match(/<script>([\s\S]*?)<\/script>/)[1];
  const kor = gissa.kor;
  gissa.kor = g => kor({ ...g, lucka: N });
  history.replaceState(null, '', `/${mapp}index.html${location.search}`);
  (0, eval)(kod);
}
