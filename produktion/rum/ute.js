// Vinterplattorna ute (2026-11-17) som kodscener: plattan, snö som faller över hela bilden (sno.js) och
// varma ljus som glöder lugnt (fönster, lykta, granens slinga). Samma render.mjs-protokoll som julrummen:
// window.ready, window.seek(t), window.DURATION (loopar efter 6 s).
//   ute({ platta: 'brevladan', sken: [[x, y, r]], lampor: [[x, y]] })
// Mått i scenen (1920 × 1080). Plattan fyller höjden och centreras i sidled.
function ute({ platta, sken = [], lampor = [] }) {
  const D = 6, TAU = Math.PI * 2, SNO = snoFonster({ x0: 0, x1: 1920, y0: 0, y1: 1080 }, D);
  const lampa = ([x, y]) => `<g><circle cx="${x}" cy="${y}" r="22" fill="url(#lampsken)"/></g>`;
  const glod = ([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sken)"/>`;
  document.getElementById('s').innerHTML = `
<defs>${SNO.defs}
  <radialGradient id="sken"><stop offset="0" stop-color="#FFC75A" stop-opacity=".55"/><stop offset=".45" stop-color="#FF9A3C" stop-opacity=".16"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
  <radialGradient id="lampsken"><stop offset="0" stop-color="#FFE38A" stop-opacity=".75"/><stop offset="1" stop-color="#FFE38A" stop-opacity="0"/></radialGradient>
  <radialGradient id="vinjett" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#0A1430" stop-opacity="0"/><stop offset="1" stop-color="#0A1430" stop-opacity=".12"/></radialGradient>
</defs>
<image href="/assets/bakgrunder/${platta}/${platta}.jpeg" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>
<g id="sken">${sken.map(glod).join('')}</g>
<g id="lampor">${lampor.map(lampa).join('')}</g>
${SNO.svg}
<rect width="1920" height="1080" fill="url(#vinjett)"/>`;

  const vag = (t, n, fas = 0) => Math.sin(TAU * n * t / D + fas);
  const $ = id => document.getElementById(id);
  function seek(t) {
    t = ((t % D) + D) % D;
    [...$('sken').children].forEach((c, i) => c.setAttribute('opacity', 0.75 + 0.15 * vag(t, 2, i) + 0.1 * vag(t, 5, i * 2)));
    [...$('lampor').children].forEach((c, i) => c.setAttribute('opacity', 0.55 + 0.45 * vag(t, 1, i * 1.9)));
    SNO.seek(t);
  }
  window.DURATION = D; window.seek = seek;
  const im = new Image(); im.onload = im.onerror = () => { seek(0); window.ready = true;
    if (!navigator.webdriver) { const t0 = performance.now(); const go = () => { seek((performance.now() - t0) / 1000); requestAnimationFrame(go); }; go(); } };
  im.src = `/assets/bakgrunder/${platta}/${platta}.jpeg`;
}
