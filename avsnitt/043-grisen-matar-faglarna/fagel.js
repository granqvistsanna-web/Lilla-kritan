// Småfåglarna i 043 (rekvisita/smafaglar.md): kroppen är urklippet, vingen, näbben och ögat ritas i kod (Sanna 2026-11-19:
// "consider claude code beak + wing"). Allt i kroppens ruta 800 × 689, fötterna i (400, 689), näbben åt höger.
//   fagelSvg(f, { t, flax, oppen, blink, href })  →  svg-sträng (en <g>) i kroppens ruta
//   f      'rod' | 'gul' | 'bla'
//   t      tiden (s), driver vingslagen (4 Hz)
//   flax   0 vila … 1 flyger (vingen slår); däremellan tonas slaget in och ut
//   oppen  0 … 1 näbben öppen (pip, pick)
//   blink  0 … 1 ögat stängt
//   ben    0 står … 1 indragna (standard = flax)
// Vingen: täckfjädrarna (en rundad bit) och tre handpennor som solfjäder från axeln. Uppslaget är långsammare än nedslaget;
// pennorna spretar i uppslaget och sluter sig i nedslaget, och vingen trycks ihop lite (sedd snett) på vägen ner.
// Näbben: den målade näbben täcks helt av den kodade (övre käken, undre käken och gapet emellan), också när den är öppen.
(function () {
  const FARG = { rod: ['#a54f38', '#7c3b2a'], gul: ['#deb845', '#a88a2e'], bla: ['#5272ad', '#3d5582'] };
  const NABB = '#665e5b', GAP = '#8e3b3b', VIT = '#fdfdfb';
  const AXEL = [360, 190], VILA = 130;           // vingens rot på ryggen och vinkeln i vila (bakåt ner mot stjärten)
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  const HINGE = [700, 182];                        // näbbens fäste
  const rot = ([x, y], v, [cx, cy] = HINGE) => { const a = v * Math.PI / 180, dx = x - cx, dy = y - cy;
    return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)]; };
  const pts = p => p.map(q => q.map(n => n.toFixed(1)).join(' ')).join(' L');

  function vinge(f, t, flax) {
    const fas = (t * 4) % 1, slag = fas < 0.58 ? ease(fas / 0.58) : 1 - ease((fas - 0.58) / 0.42);   // 0 nere … 1 uppe
    const ned = fas >= 0.58;                       // på väg ner
    const rel = flax * (-28 + 128 * slag);         // vila 130° (bakåt ner över ryggen); + upp över ryggen (258°), − ner under magen
    const sy = 1 - flax * (ned ? 0.3 * Math.sin(Math.PI * (fas - 0.58) / 0.42) : 0);
    const sprid = 3 + flax * (ned ? 0 : 6 * slag); // spetsarna glider isär lite i uppslaget, aldrig som fingrar
    const [v, m] = FARG[f];
    // en rundad vante: täckfjädrarna (ellips) och tre breda, överlappande spetsar längst ut
    const spetsar = [[-1, 150, -30], [0, 172, 0], [1, 150, 30]].map(([i, l, y]) => ({ v: i * sprid, l, y }));
    const spets = (p, k) => `<rect x="110" y="${p.y - 34}" width="${p.l}" height="68" rx="34" transform="rotate(${p.v} 110 ${p.y})" ${k
      ? `fill="${VIT}" stroke="${VIT}" stroke-width="20"` : `fill="${v}" stroke="${m}" stroke-width="5"`}/>`;
    const tack = `<ellipse cx="110" cy="0" rx="150" ry="92"`;
    return `<g transform="translate(${AXEL[0]} ${AXEL[1]}) rotate(${VILA + rel}) scale(1 ${sy.toFixed(3)})">
      ${spetsar.map(p => spets(p, true)).join('')}${tack} fill="${VIT}" stroke="${VIT}" stroke-width="20"/>
      ${spetsar.map(p => spets(p, false)).join('')}${tack} fill="${v}"/>
      <path d="M-30 -40 Q110 -96 248 -36" fill="none" stroke="${m}" stroke-width="5" opacity=".5" stroke-linecap="round"/>
      ${spetsar.map(p => `<path d="M200 ${p.y} H${100 + p.l}" transform="rotate(${p.v} 110 ${p.y})" stroke="${m}" stroke-width="5" stroke-linecap="round" opacity=".4"/>`).join('')}</g>`;
  }

  function nabb(oppen) {
    const upp = [[694, 148], [784, 178], [698, 188]], ner = [[698, 178], [772, 183], [710, 216]];
    const u = upp.map(q => rot(q, -10 * oppen)), n = ner.map(q => rot(q, 24 * oppen));
    const gap = oppen > 0.02 ? `<path d="M${pts([HINGE, u[1], n[1], n[2]])}Z" fill="${GAP}" stroke="${GAP}" stroke-width="6" stroke-linejoin="round"/>` : '';
    const form = (p, kant) => `<path d="M${pts(p)}Z" stroke-linejoin="round" ${kant ? `fill="${VIT}" stroke="${VIT}" stroke-width="20"` : `fill="${NABB}" stroke="${NABB}" stroke-width="8"`}/>`;
    return form(u, true) + form(n, true) + gap + form(n, false) + form(u, false);
  }

  // Benen: två tunna grå ben från magen (x 412 och 506) med tre tår. ben 0 står (tårna på marken, y 678) … 1 indragna bakåt (flyger).
  function benen(ben) {
    return [[412, 548], [506, 546]].map(([x, y]) => {
      const fx = x - 70 * ben, fy = 678 - 70 * ben, tv = -40 * ben;   // foten och tårnas vinkel
      const tar = [[-30, 2], [30, 0], [10, 10]].map(([dx, dy]) => { const a = tv * Math.PI / 180;
        return `M${fx} ${fy} L${(fx + dx * Math.cos(a) - dy * Math.sin(a)).toFixed(1)} ${(fy + dx * Math.sin(a) + dy * Math.cos(a)).toFixed(1)}`; }).join(' ');
      const d = `M${x} ${y} Q${(x + fx) / 2 - 10 * ben} ${(y + fy) / 2 + 6} ${fx.toFixed(1)} ${fy.toFixed(1)} ${tar}`;
      return `<path d="${d}" fill="none" stroke="${VIT}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>`
        + `<path d="${d}" fill="none" stroke="${NABB}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`; }).join('');
  }

  // kroppen utan näbb och ben (fagel-kropp-*-kod.png, gjord ur urklippet: bara de färgade pixlarna, ny vit kant); näbben och benen i kod
  window.fagelSvg = (f, { t = 0, flax = 0, oppen = 0, blink = 0, ben = flax, href = `/assets/rekvisita/smafaglar/cut/fagel-kropp-${f}-kod.png` } = {}) =>
    `<g>${benen(ben)}<image href="${href}" width="800" height="689"/>${vinge(f, t, flax)}${nabb(oppen)}
      <ellipse cx="632" cy="237" rx="22" ry="${(22 * (1 - 0.88 * blink)).toFixed(1)}" fill="#2B2321"/>${blink < 0.5 ? '<circle cx="626" cy="230" r="6.5" fill="#fff"/>' : ''}</g>`;
})();
