// Doktorns saker i kod (046, Sanna 2026-11-20: "i think these should be done with code"): stetoskopet och öronlampan.
// Ritas som SVG i figurens enheter (1024-rutan, handen har r 35), så att de kan sitta i doktorns hand i riggen och få figurens
// vita kant (#dkant), eller stå själva i en närbild med kant.lagg(g, { andel: 0.01 }). Färgerna följer stetoskopet som redan
// sitter runt doktorns hals i bilden: grå slang, silverfärgat bröststycke. Inget kors, ingen text.
//   DS.defs                          <defs>-innehåll (kritkornet #ds-korn), en gång per sida
//   DS.stetoskop({ bit, led, vinkel, slak })   hela stetoskopet: öronbågen vid led, slangen ner till bröststycket vid bit
//   DS.brostbit(x, y, vinkel)        bara bröststycket (det handen håller mot magen)
//   DS.slang(x1, y1, x2, y2, slak, b) bara den grå slangen (b = bredd), t.ex. från stetoskopet i doktorns bild till handen
//   DS.oronlampa({ x, y, vinkel, ljus })       öronlampan med greppet i (x, y); ljus 0–1 tänder lampan i spetsen
const DS = (() => {
  const GRA = '#5f646b', GRAKANT = '#4b4f55', SILVER = '#c6ccd2', SILVERMORK = '#9aa2aa', LJUSARE = '#e8ebee';
  const TURKOS = '#2fa39b', TURKOSMORK = '#248a83', VIT = '#f4f2ee', VITKANT = '#d6d2ca', SPETS = '#6b7077', LAMPA = '#ffd84a';
  const defs = `<filter id="ds-korn" x="-0.1" y="-0.1" width="1.2" height="1.2" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="3" xChannelSelector="R" yChannelSelector="G" result="g"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.25" result="m"/>
      <feComposite in="m" in2="g" operator="in" result="prickar"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="9" result="f"/>
      <feColorMatrix in="f" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.4 0.75" result="ff"/>
      <feComposite in="ff" in2="g" operator="in" result="ljust"/>
      <feComposite in="g" in2="prickar" operator="arithmetic" k1="0" k2="1" k3="-0.22" k4="0" result="gk"/>
      <feComposite in="ljust" in2="gk" operator="arithmetic" k1="0" k2="0.18" k3="1" k4="0"/>
    </filter>`;

  function brostbit(x, y, v = 0) {
    // Rund trumma sedd framifrån, med en kort stam uppåt där slangen fästs.
    return `<g transform="translate(${x} ${y}) rotate(${v})">
      <rect x="-7" y="-50" width="14" height="26" rx="6" fill="${SILVERMORK}"/>
      <circle r="34" fill="${SILVERMORK}"/><circle r="30" fill="${SILVER}"/>
      <circle r="20" fill="${LJUSARE}"/><circle cx="-9" cy="-10" r="5" fill="#fff" opacity=".8"/></g>`;
  }

  function stetoskop({ led = [0, 0], bit = [0, 260], vinkel = 0, slak = 60, bitVinkel = 0 } = {}) {
    // Öronbågen: två silverrör i ett U från leden upp till två runda öronproppar.
    const [lx, ly] = led, [bx, by] = bit, r = vinkel * Math.PI / 180;
    const p = (dx, dy) => [lx + dx * Math.cos(r) - dy * Math.sin(r), ly + dx * Math.sin(r) + dy * Math.cos(r)];
    const [a1, a2, a3, a4] = [p(-58, -150), p(-62, -60), p(62, -60), p(58, -150)];
    const [t1, t2] = [p(-8, -6), p(8, -6)];
    const bage = `M${a1} C${p(-70, -110)} ${p(-64, -30)} ${t1} M${a4} C${p(70, -110)} ${p(64, -30)} ${t2}`;
    // Slangen: en mjuk båge från leden ner till bröststyckets stam, med lite häng (slak) åt sidan.
    const sx = bx + 50 * Math.sin(bitVinkel * Math.PI / 180), sy = by - 50 * Math.cos(bitVinkel * Math.PI / 180);
    const mx = (lx + sx) / 2 + slak, my = (ly + sy) / 2 + slak * 0.4;
    const slang = `M${lx} ${ly} Q${mx} ${my} ${sx} ${sy}`;
    return `<g class="stetoskop" filter="url(#ds-korn)" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="${bage}" stroke="${SILVERMORK}" stroke-width="14"/><path d="${bage}" stroke="${SILVER}" stroke-width="9"/>
      ${[a1, a4].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="${GRA}" stroke="none"/>`).join('')}
      <path d="${slang}" stroke="${GRAKANT}" stroke-width="22"/><path d="${slang}" stroke="${GRA}" stroke-width="17"/>
      <circle cx="${lx}" cy="${ly}" r="13" fill="${SILVERMORK}" stroke="none"/>
      <g stroke="none">${brostbit(bx, by, bitVinkel)}</g></g>`;
  }

  function slang(x1, y1, x2, y2, slak = 40, b = 17) {
    const d = `M${x1} ${y1} Q${(x1 + x2) / 2 + slak * 0.4} ${(y1 + y2) / 2 + slak} ${x2} ${y2}`;
    return `<g fill="none" stroke-linecap="round" filter="url(#ds-korn)"><path d="${d}" stroke="${GRAKANT}" stroke-width="${b + 5}"/>
      <path d="${d}" stroke="${GRA}" stroke-width="${b}"/></g>`;
  }

  function oronlampa({ x = 0, y = 0, vinkel = 0, ljus = 0 } = {}) {
    // Greppet (handtaget) står rakt upp och ner med (x, y) mitt i; huvudet sitter överst och tratten pekar åt höger.
    const sken = ljus > 0 ? `<circle cx="146" cy="-112" r="${8 + 8 * ljus}" fill="${LAMPA}" opacity="${Math.min(1, 2 * ljus)}"/>
      ${[-32, 0, 32].map(v => `<path d="M172 -112 L${172 + 26 * ljus} -112" transform="rotate(${v} 146 -112)" stroke="${LAMPA}" stroke-width="7" stroke-linecap="round" opacity="${Math.max(0, 2 * ljus - 1)}"/>`).join('')}` : '';
    return `<g class="oronlampa" transform="translate(${x} ${y}) rotate(${vinkel})">
      <g filter="url(#ds-korn)">
      <rect x="-24" y="-80" width="48" height="170" rx="22" fill="${TURKOSMORK}"/>
      <rect x="-20" y="-80" width="40" height="166" rx="19" fill="${TURKOS}"/>
      ${[-30, 0, 30, 60].map(d => `<rect x="-20" y="${d}" width="40" height="5" rx="2.5" fill="${TURKOSMORK}" opacity=".55"/>`).join('')}
      <rect x="-30" y="-98" width="60" height="22" rx="9" fill="${SILVERMORK}"/>
      <rect x="-40" y="-150" width="86" height="58" rx="26" fill="${VITKANT}"/>
      <rect x="-37" y="-147" width="80" height="52" rx="23" fill="${VIT}"/>
      <path d="M40 -134 L128 -121 Q138 -112 128 -103 L40 -90 Z" fill="${SPETS}"/>
      <path d="M44 -130 L124 -118 Q131 -112 124 -106 L44 -94 Z" fill="#7d838a"/>
      <circle cx="-6" cy="-121" r="8" fill="${ljus > 0.5 ? LAMPA : SILVERMORK}"/></g>
      ${sken}</g>`;
  }

  return { defs, stetoskop, brostbit, slang, oronlampa };
})();
