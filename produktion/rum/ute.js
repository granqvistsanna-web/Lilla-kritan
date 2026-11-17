// Vinterplattorna ute (2026-11-17) som kodscener, på samma sätt som julrummen: plattan, snö som faller över hela bilden
// (sno.js), varma ljus som glöder och julpynt ritat i kod (lykta, ljusslinga, krans, rosett) och en förgrund med snödrivor.
// Inga paket eller pepparkakor ute (Sanna 2026-11-17).
// Samma render.mjs-protokoll som julrummen: window.ready, window.seek(t), window.DURATION (loopar efter 6 s).
//   ute({ platta: 'brevladan', sken: [[x, y, r]], lampor: [[x, y]], pynt: [lykta(470, 822), krans(343, 735, 20)] })
// Platt himmel i stället för tonad: ute({ platta: 'grinden', fil: 'grinden-platt.jpeg', … }) (finns för parkbanken, grinden,
// bjorkdungen, granstugan; standard är den tonade plattan <platta>.jpeg).
// Mått i scenen (1920 × 1080). Plattan fyller höjden och centreras i sidled. Snökanten ligger på y ca 815.
const R = '/assets/rekvisita/';
const MYSK = (d, f, k = 8) => `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="${k}" stroke-linejoin="round"/><path d="${d}" fill="${f}"/>`;
const skugga = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.12}" fill="#0A1430" opacity=".13"/>`;
const lampa = ([x, y], r = 7) => `<g class="lampa"><circle cx="${x}" cy="${y}" r="${r * 3.2}" fill="url(#lampsken)"/><circle cx="${x}" cy="${y}" r="${r + 1.5}" fill="#FFF6D8"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFC928"/></g>`;

// röd lykta med ett levande ljus, foten i (x, y) (samma lykta som i julhallen)
const lykta = (x, y, s = 1) => `${skugga(x, y + 2, 48 * s)}<g transform="translate(${x} ${y}) scale(${s})" filter="url(#vax)">
  ${MYSK('M-26 0 h52 v-64 h-52 Z M-32 -64 h64 l-13 -20 h-38 Z', '#B8342A', 4)}
  <path d="M-8 -86 q8 -18 16 0" fill="none" stroke="#3E2F22" stroke-width="4"/>
  <rect x="-16" y="-52" width="32" height="40" rx="6" fill="#FFD25E"/></g>
  <g transform="translate(${x} ${y}) scale(${s})"><circle class="lyktglod" cy="-32" r="44" fill="url(#lampsken)"/>
  <g class="laga"><path d="M0 -16 C-12 -24 -8 -36 0 -48 C8 -36 12 -24 0 -16 Z" fill="#FF8A1E"/><path d="M0 -20 C-5 -25 -4 -31 0 -38 C4 -31 5 -25 0 -20 Z" fill="#FFF3C4"/></g></g>`;

// ljusslinga i bågar mellan punkterna (häng = hur djupt den hänger), lampor som tindrar i omgångar
function slinga(pkt, hang = 22, n = 4) {
  const bagar = pkt.slice(1).map((b, i) => [pkt[i], b]);
  const tr = bagar.map(([a, b]) => `M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2 + 2 * hang} ${b[0]} ${b[1]}`).join(' ');
  const ljus = bagar.flatMap(([a, b]) => Array.from({ length: n }, (_, j) => { const u = (j + 0.5) / n;
    return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u + 4 * hang * u * (1 - u) + 9]; }));
  return `<path d="${tr}" fill="none" stroke="#3E2F22" stroke-width="3" opacity=".7"/>${ljus.map(p => lampa(p, 6)).join('')}`;
}

// platt krans av granris med röd rosett, mitt (x, y), radie r
const krans = (x, y, r) => `<g filter="url(#vax)">${Array.from({ length: 16 }, (_, i) => { const v = i / 16 * 6.283;
  return `<circle cx="${(x + r * Math.cos(v)).toFixed(1)}" cy="${(y + r * Math.sin(v)).toFixed(1)}" r="${(r * 0.42).toFixed(1)}" fill="#fff"/>`; }).join('')}
  ${Array.from({ length: 16 }, (_, i) => { const v = i / 16 * 6.283;
  return `<circle cx="${(x + r * Math.cos(v)).toFixed(1)}" cy="${(y + r * Math.sin(v)).toFixed(1)}" r="${(r * 0.34).toFixed(1)}" fill="${i % 2 ? '#2F7D46' : '#2A7340'}"/>`; }).join('')}
  ${[0.2, 0.55, 0.85].map(u => `<circle cx="${(x + r * Math.cos(u * 6.283 + 1)).toFixed(1)}" cy="${(y + r * Math.sin(u * 6.283 + 1)).toFixed(1)}" r="${(r * 0.12).toFixed(1)}" fill="#C8302A"/>`).join('')}</g>
  ${rosett(x, y - r * 0.9, r / 34)}`;

// röd rosett, knuten i (x, y)
const rosett = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#vax)">${MYSK('M0 0 C-30 -26 -42 6 -26 14 C-14 18 -6 8 0 0 C6 8 14 18 26 14 C42 6 30 -26 0 0 Z M-4 2 L-16 38 L-4 32 Z M4 2 L16 38 L4 32 Z', '#C8302A')}<circle r="8" fill="#9E2A22"/></g>`;

// förgrund (som skogen-grons grästuvor): snödrivor i de nedre hörnen, den högra speglad. Ligger framför allt utom snön som faller.
// (En grankvist i ett övre hörn provades och togs bort, Sanna 2026-11-17.)
const DRIVA = '/assets/bakgrunder/julskogen-saker/snodriva.png';
const d = (x, s, spegel) => `<image href="${DRIVA}" x="0" y="0" width="1989" height="953" transform="translate(${x} ${1080 - 953 * s + 70}) scale(${spegel ? -s : s} ${s})"/>`;
const forgrund = () => d(-170, 0.3) + d(1920 + 150, 0.25, true);

function ute({ platta, fil = `${platta}.jpeg`, sken = [], lampor = [], pynt = [] }) {
  const D = 6, TAU = Math.PI * 2, SNO = snoFonster({ x0: 0, x1: 1920, y0: 0, y1: 1080 }, D);
  const glod = ([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sken)"/>`;
  document.getElementById('s').innerHTML = `
<defs>${SNO.defs}
  <filter id="vax" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/>
    <feDisplacementMap in="SourceGraphic" scale="4"/></filter>
  <radialGradient id="sken"><stop offset="0" stop-color="#FFC75A" stop-opacity=".55"/><stop offset=".45" stop-color="#FF9A3C" stop-opacity=".16"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
  <radialGradient id="lampsken"><stop offset="0" stop-color="#FFE38A" stop-opacity=".75"/><stop offset="1" stop-color="#FFE38A" stop-opacity="0"/></radialGradient>
  <radialGradient id="vinjett" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#0A1430" stop-opacity="0"/><stop offset="1" stop-color="#0A1430" stop-opacity=".12"/></radialGradient>
</defs>
<image href="/assets/bakgrunder/${platta}/${fil}" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/>
<g id="sken">${sken.map(glod).join('')}</g>
${lampor.map(([x, y]) => `<g class="lampa"><circle cx="${x}" cy="${y}" r="22" fill="url(#lampsken)"/></g>`).join('')}
${pynt.join('\n')}
${forgrund()}
${SNO.svg}
<rect width="1920" height="1080" fill="url(#vinjett)"/>`;

  const vag = (t, n, fas = 0) => Math.sin(TAU * n * t / D + fas);
  const alla = s => [...document.querySelectorAll(s)];
  function seek(t) {
    t = ((t % D) + D) % D;
    alla('#sken > circle').forEach((c, i) => c.setAttribute('opacity', 0.75 + 0.15 * vag(t, 2, i) + 0.1 * vag(t, 5, i * 2)));
    alla('.lampa').forEach((c, i) => c.setAttribute('opacity', 0.55 + 0.45 * vag(t, 1, i * 1.9)));
    alla('.laga').forEach((g, i) => g.setAttribute('transform', `translate(0 -16) skewX(${4 * vag(t, 3, i)}) scale(${1 + 0.04 * vag(t, 5, i)} ${1 + 0.1 * vag(t, 4, 1 + i)}) translate(0 16)`));
    alla('.lyktglod').forEach((c, i) => c.setAttribute('opacity', 0.75 + 0.25 * (0.6 * vag(t, 4, i) + 0.4 * vag(t, 7, 1 + i))));
    SNO.seek(t);
  }
  window.DURATION = D; window.seek = seek;
  Promise.all([...document.querySelectorAll('image')].map(im => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = im.getAttribute('href'); })))
    .then(() => { seek(0); window.ready = true;
      if (!navigator.webdriver) { const t0 = performance.now(); const go = () => { seek((performance.now() - t0) / 1000); requestAnimationFrame(go); }; go(); } });
}
