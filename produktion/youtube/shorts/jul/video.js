// Julkalenderns "hel video bakom luckan" (variant G, produktion/youtube/julkalender-plan.md). Sidan visar bara en stillbild bakom
// luckan: videons första bild medan luckan öppnas och dess sista medan den stängs. Själva videon klipps in av hel-video.sh.
// En lucka är en index.html med bara dagens nummer och filmens sökväg från repots rot (filmen läses av hel-video.sh, inte av sidan):
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script><script src="/produktion/youtube/shorts/jul/video.js"></script>
//   <script>video.kor({ lucka: 10, film: 'avsnitt/015-ba-ba-vita-lamm/film/avsnitt-015.mp4' })</script>
// forst.png och sist.png i luckans mapp (hel-video.sh tar dem ur filmen).
// Tidslinjen: öppningen tills luckan är helt öppen vid OPPEN (hela bildrutor: bild OPPEN*30 är den första helt öppna), tre sekunder
// stilla (bilden byts efter en sekund), sedan stängs luckan (lucka.js slut(): 2,4 s). Sidans längd är alltså OPPEN + 3 + 2,4 s, och
// hel-video.sh läser OPPEN ur den. Ändrar du HALL eller lucka.js slut() måste hel-video.sh ändras med.
window.video = (() => {
const HALL = 3;
async function kor({ lucka: N }) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const mapp = location.pathname.replace(/[^/]*$/, '');
  document.head.insertAdjacentHTML('beforeend', '<style>html,body{margin:0;height:100%;background:#000}svg{display:block;width:min(100vw,177.78vh);margin:auto}</style>');
  document.body.innerHTML = `<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <image id="forst" href="${mapp}forst.png" width="1920" height="1080"/><image id="sist" href="${mapp}sist.png" width="1920" height="1080"/></svg>`;
  const svg = document.querySelector('svg');
  await Promise.all([lucka.bild(mapp + 'forst.png'), lucka.bild(mapp + 'sist.png')]);
  const K = await lucka.bygg(svg, N, { film: true }), OPPEN = Math.ceil(K.oppen * 30) / 30, DURATION = K.slut(OPPEN + HALL);
  const rita = t => { document.getElementById('sist').style.display = t >= OPPEN + 1 ? '' : 'none'; K.rita(t); };
  const ljud = K.ljud();   // saknade röster är tysta, som i rita.js
  await Promise.all(ljud.map(async c => { if (!(await fetch('/' + c.fil, { method: 'HEAD' }).catch(() => ({}))).ok) c.fil = null; }));
  window.LJUD = ljud.filter(c => c.fil);
  window.DURATION = DURATION;
  window.seek = window.render = rita;
  window.ready = true;   // render.mjs väntar på den
  rita(+new URLSearchParams(location.search).get('t') || 0);   // förhandsvisning: ?t=1.5 visar en bildruta
}
return { kor };
})();
