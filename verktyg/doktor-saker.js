// Doktorns saker i kod (Besöket, format/besoket.md; Sanna 2026-11-20: "stetoskop kod", "öronlampa kod").
// Allt är SVG-strängar i doktorns 1024-ruta (samma koordinater som cut/doktorn-a-*.png), så att de följer riggen.
// Färgerna är stetoskopets i konsten (doktorn-a-forsta.jpg): mörkgrå slang, silvergrå bröstdel. Lampans handtag är
// doktorns turkos. Den vita klistermärkeskanten kommer från figurens #dkant, eller från saksKant() i närbilderna.
//
//   stetoHals()                 stetoskopet runt halsen (kroppens koordinater, ritas i .kropp ovanpå rocken)
//   stetoOron()                 öronpropparna i öronen och slangarna ner till Y-knuten STETO.Y (huvudets koordinater, .drag)
//   stetoSlang(j, h, s)         slangen från Y-knuten j till handen h och bröstdelen i handen (s −1 vänster hand, 1 höger)
//   brostdel(x, y, r)           bara bröstdelen (närbilderna)
//   oronlampa(x, y, v, sk, ljus) lampan med greppet i (x, y), spetsen åt vänster, vriden v grader, skala sk, ljus 0–1

const STETO = {
  SLANG: '#59616b', SLANGLJUS: '#6f7883', BRED: 11,
  SILVER: '#c9d2da', SILVERKANT: '#98a2ac', MITT: '#b3bdc6',
  ORON: [[385, 262], [637, 262]],   // öronen i doktorn A:s huvud (uppmätt ur doktorn-a-utan-stetoskop.jpg)
  Y: [512, 408],                    // Y-knuten under hakan, framför halsen
};

const stetoStreck = (d, b = STETO.BRED) =>
  `<path d="${d}" fill="none" stroke="${STETO.SLANG}" stroke-width="${b}" stroke-linecap="round" stroke-linejoin="round"/>`;

function brostdel(x, y, r = 19) {
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${STETO.SILVER}" stroke="${STETO.SILVERKANT}" stroke-width="${r * 0.2}"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.42}" fill="${STETO.MITT}"/></g>`;
}

// Runt halsen som i konsten: vänster sida slutar i öronbygeln med två proppar, höger sida i bröstdelen vid fickan.
function stetoHals() {
  return `<g class="steto">${stetoStreck('M474 372 Q440 395 434 482')}
    ${stetoStreck('M434 482 Q404 500 410 540 Q414 560 426 567')}${stetoStreck('M434 482 Q468 498 466 538 Q465 556 461 566')}
    <circle cx="427" cy="568" r="7" fill="${STETO.SLANGLJUS}"/><circle cx="460" cy="567" r="7" fill="${STETO.SLANGLJUS}"/>
    ${stetoStreck('M548 370 Q586 396 582 490')}${brostdel(580, 506)}</g>`;
}

// I öronen: en liten propp i varje öra, slangarna går ner längs käken och möts i Y-knuten under hakan.
function stetoOron() {
  const [[lx, ly], [rx, ry]] = STETO.ORON, [jx, jy] = STETO.Y;
  return `<g class="steto">${stetoStreck(`M${lx + 4} ${ly + 8} Q${lx + 30} ${jy - 30} ${jx - 6} ${jy}`, 10)}
    ${stetoStreck(`M${rx - 4} ${ry + 8} Q${rx - 30} ${jy - 30} ${jx + 6} ${jy}`, 10)}
    <circle cx="${lx}" cy="${ly}" r="9" fill="${STETO.SLANGLJUS}"/><circle cx="${rx}" cy="${ry}" r="9" fill="${STETO.SLANGLJUS}"/>
    <circle cx="${jx}" cy="${jy}" r="8" fill="${STETO.SLANG}"/></g>`;
}

// Från Y-knuten till handen: slangen i en kort, nästan sträckt båge (Sanna 2026-11-20: "slang too long"), bröstdelen ligger i handen (lite ut mot fingrarna).
function stetoSlang([jx, jy], [hx, hy], s = -1) {
  const bx = hx + s * 16, by = hy + 4;
  return `<g class="steto">${stetoStreck(`M${jx} ${jy} C${jx} ${jy + 45} ${bx - s * 40} ${by + 22} ${bx} ${by}`)}
    <circle cx="${jx}" cy="${jy}" r="8" fill="${STETO.SLANG}"/>${brostdel(bx, by, 21)}</g>`;
}

// Öronlampan: turkost handtag (greppet, handtagets mitt, i x, y), ett runt vitt huvud och en kort trubbig spets som pekar åt vänster.
// Ljuset är en mjuk gul fläck framför spetsen (ljus 0–1), ingen stråle.
function oronlampa(x, y, v = 0, sk = 1, ljus = 0) {
  const sken = ljus > 0 ? [[46, 0.18], [32, 0.28], [18, 0.45]].map(([r, o]) =>
    `<circle cx="-104" cy="0" r="${r}" fill="#ffe680" opacity="${o * ljus}"/>`).join('') : '';
  return `<g class="lampa" transform="translate(${x} ${y}) rotate(${v}) scale(${sk}) translate(-32 0)">${sken}
    <path d="M-40 -14 L-78 -8 Q-88 0 -78 8 L-40 14 Z" fill="#c9d2da" stroke="#a6b0ba" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="-78" cy="0" r="${4 + 4 * ljus}" fill="#fff4b8" opacity="${ljus}"/>
    <rect x="-14" y="-17" width="92" height="34" rx="17" fill="#3BB4A8" stroke="#2f958b" stroke-width="3"/>
    <circle cx="40" cy="-17" r="6.5" fill="#e6eaee" stroke="#b9c1c8" stroke-width="2"/>
    <circle cx="-24" cy="0" r="26" fill="#f4f4f2" stroke="#cfd5da" stroke-width="3"/></g>`;
}

// Vit klistermärkeskant runt en sak i närbilderna (där figurens #dkant inte finns). Lägg filtret i <defs> en gång
// och sätt filter="url(#saksKant)" på sakens grupp.
const saksKant = (px = 8) => `<filter id="saksKant" x="-0.3" y="-0.3" width="1.6" height="1.6">
  <feMorphology in="SourceAlpha" operator="dilate" radius="${px}" result="d"/><feFlood flood-color="#fff"/>
  <feComposite in2="d" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

if (typeof window !== 'undefined') Object.assign(window, { STETO, brostdel, stetoHals, stetoOron, stetoSlang, oronlampa, saksKant });
