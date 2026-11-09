// v2-nallen (rekvisita/nalle.md, cut/nalle-v2-ljus.png ur 007, samma som 016) med ansiktet i kod, som 016:s natt.js:
// ljus nosfläck med nos, ovala ögon med glans, rosa kinder, leende. Bilden är 848 × 856, fötterna på y 831, mitt x 424.
//   `<image href="/${NALLE2.fil}" width="848" height="856"/><g id="…"></g>`, sen varje bild: g.innerHTML = nalleAnsikte(blink, mun)
//   blink 0 = öppna ögon, 1 = slutna bågar (sover). mun 0 = leende, 1 = öppen mun (Nej!, gäspning).
const NALLE2 = { fil: 'assets/rekvisita/nalle/cut/nalle-v2-ljus.png', b: 848, h: 856, fot: 831, konst: 803, mun: [425, 342] };   // konst = bildens höjd fötter–öron
function nalleAnsikte(blink = 0, mun = 0) {
  const ogon = [[352, 246], [498, 246]], kinder = [[306, 304], [544, 304]], [nx, ny] = [425, 300], [mx, my] = [425, 338];
  const b = Math.min(1, Math.max(0, blink));
  return `<ellipse cx="${nx}" cy="${ny + 14}" rx="70" ry="52" fill="#F1DFC1"/><ellipse cx="${nx}" cy="${ny}" rx="20" ry="14" fill="#3a1d12"/>`
    + `<path d="M${nx} ${ny + 12} L${nx} ${ny + 26}" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`
    + kinder.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="28" ry="17" fill="#ec8f96" opacity=".8"/>`).join('')
    + ogon.map(([x, y], i) => b > 0.85
      ? `<path d="M${x - 19} ${y} Q${x} ${y + 15} ${x + 19} ${y}" fill="none" stroke="#f3e6d6" stroke-width="12" stroke-linecap="round"/><path d="M${x - 19} ${y} Q${x} ${y + 15} ${x + 19} ${y}" fill="none" stroke="#140c08" stroke-width="7" stroke-linecap="round"/>`
      : `<g transform="translate(${x} ${y}) scale(${i ? 0.92 : 1} ${1 - 0.92 * b})"><ellipse rx="19" ry="26" fill="#140c08" stroke="#f3e6d6" stroke-width="3"/><circle cx="-6" cy="-10" r="7" fill="#fff"/></g>`).join('')
    + (mun > 0.05
      ? `<ellipse cx="${mx}" cy="${my + 4}" rx="${10 + 8 * mun}" ry="${4 + 18 * mun}" fill="#3a1c14"/>`
      : `<path d="M${mx - 22} ${my - 6} Q${mx - 11} ${my + 6} ${mx} ${my - 4} Q${mx + 11} ${my + 6} ${mx + 22} ${my - 6}" fill="none" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`);
}
