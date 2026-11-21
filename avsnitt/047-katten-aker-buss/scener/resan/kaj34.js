// Kaj i 3/4: två riggar (assets/karaktarer/katten-kaj/premium/trekvart/), samma uppbyggnad, delarna i en 1024-ruta utan inbakad
// kant (kant.js lägger kanten runt hela gruppen), ansiktet i kod i Kajs riggstil (uttryck.html: varmvita ögon, mörk pupill med
// ljuspunkt, gräddvita linjer, rosa nos och kinder), uppmätt mot Sannas bilder.
//   'ut'  kaj34ut: tittar ut genom fönstret, ett öga. Grundläget i fönsterbilderna.
//   'oss' kaj34:   vänd mot tittaren, båda ögonen. Byts in på en blinkning när katten ska visa ansiktet (en riktig huvudvridning).
// Riggarna justeras mot varandra på kroppens nederkant mitt (anker) och storlek (k), så att bytet inte hoppar mer än några px.
//   KAJ34.svg(namn, o) → svg-sträng i riggens 1024-ruta, KAJ34.morr(namn, o) morrhåren (eget lager utan vit kant),
//   KAJ34.jamka(namn) transformen från riggens ruta till den gemensamma (nederkant mitt i 0, 0). o (alla valfria):
//     oraB, oraF  bakre/främre örats vridning i grader (±5) · svans (±3–5) · arm 0 … −80 (lyfts mot rutan), armL armens längd
//     ben true/false · blink 0–1 · glad 0–1 (kniper glatt, ögonen öppna) · forv 0–1 (stora ögon) · nyf 0–1 (tittar mer åt höger)
//     mun 0–1 · kind 0–1 · titt [x, y] · nick px (ansiktet ner, för ja) · benY px (benen upp under kroppen, sittande) · benV [v, h] grader · benX px (benen närmare varandra)
window.KAJ34 = (() => {
  const P = '/assets/karaktarer/katten-kaj/premium/trekvart/';
  const VIT = '#FBF8F0', PUP = '#2a1d1a', GR = '#efe6d2', KIND = '#ec8f96', MUNF = '#7c2226';
  const f1 = x => (+x).toFixed(1);
  const RIGG = {
    oss: { D: P + 'cut/kaj34-', oraB: ['ear-r', [770, 330]], oraF: ['ear-m', [612, 335]], tail: [430, 705], legL: [515, 770], legR: [672, 775],
      arm: { piv: [640, 520], langd: 142 }, anker: [600, 794], k: 1.055,
      ogon: [[[826, 411], 16, 36, 0.9, true], [[722, 425], 38, 40, 1, false]],   // [mitt, rx, ry, pupillbredd, klipps av kroppen]
      kinder: [[693, 488, 31, 20], [842, 466, 10, 13]],
      nos: 'M793 447 Q805 442 817 447 Q813 459 805 462 Q797 459 793 447 Z', nosRad: 'M805 462 V476', munC: [801, 492],
      le: g => `M773 478 Q787 ${f1(496 + 3 * g)} 805 478 Q821 ${f1(496 + 3 * g)} 832 476`,
      morr: 'M846 474 Q894 466 936 458|M850 488 Q898 488 940 492|M846 502 Q890 512 928 524' },
    ut: { D: P + 'ut/cut/kaj34ut-', oraB: ['ear-l', [455, 330]], oraF: ['ear-r', [748, 335]], tail: [425, 700], legL: [510, 775], legR: [690, 780],
      arm: { piv: [745, 540], langd: 138 }, anker: [610, 801], k: 1,
      ogon: [[[759, 408], 24, 40, 0.9, true]],
      kinder: [[746, 468, 25, 15]],
      nos: 'M806 432 Q817 427 828 432 Q825 444 817 447 Q809 444 806 432 Z', nosRad: 'M817 447 V458', munC: [811, 474],
      le: g => `M793 466 Q806 ${f1(482 + 3 * g)} 822 466`,
      morr: 'M834 456 Q880 448 920 440|M838 468 Q884 468 926 472|M834 480 Q878 490 914 502' },
  };
  // svansen i kod för 'oss' (Sanna 2026-11-21 "polish tail"): urklippet var tunt och knöligt med en stor ojämn vit tuss i toppen.
  // Samma väg (bakom kroppen åt vänster, upp, böjd åt vänster i toppen), jämn tjocklek, rund gräddvit spets; kant.js lägger kanten
  const SVANS34 = `<path d="M440 712 C380 714 302 700 270 662 C242 628 246 574 262 538 C276 506 288 480 280 452 C273 430 252 416 228 420" fill="none" stroke="#2b2622" stroke-width="27" stroke-linecap="round"/>
    <path d="M281 462 C280 440 264 422 242 418 C232 417 224 420 218 426" fill="none" stroke="#f1ebe0" stroke-width="30" stroke-linecap="round"/>`;
  let N = 0;
  // ett öga: vitan, pupillen (tittar åt höger), ljuspunkten; glad = nederlock av kroppens egen textur med gräddvit båge (ögat öppet)
  const oga = (r, id, [cx, cy], rx, ry, { sy, sx, px, py, glad, pb }) => `<g transform="translate(${cx} ${cy})">
    <g transform="scale(${sx.toFixed(3)} ${sy.toFixed(3)})"><ellipse rx="${rx}" ry="${ry}" fill="${VIT}"/>
      <ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(rx * 0.5 * pb)}" ry="${f1(ry * 0.62)}" fill="${PUP}"/>
      <circle cx="${f1(px - rx * 0.16)}" cy="${f1(py - ry * 0.26)}" r="${f1(Math.max(3, rx * 0.17))}" fill="#fff"/></g>
    ${glad > 0.02 ? `<clipPath id="${id}l${cx}"><path d="M${-rx - 8} ${ry + 10} V${f1(ry * 0.62 * sy)} Q0 ${f1(ry * (0.62 - 0.85 * glad) * sy)} ${rx + 8} ${f1(ry * 0.62 * sy)} V${ry + 10} Z"/></clipPath>
      <image href="${r.D}body.png" x="${-cx}" y="${-cy}" width="1024" height="1024" clip-path="url(#${id}l${cx})"/>
      <path d="M${f1(-rx * 0.9)} ${f1(ry * 0.6 * sy)} Q0 ${f1(ry * (0.6 - 0.85 * glad) * sy)} ${f1(rx * 0.9)} ${f1(ry * 0.6 * sy)}" fill="none" stroke="${GR}" stroke-width="7" stroke-linecap="round" opacity="${Math.min(1, glad * 1.5).toFixed(2)}"/>` : ''}
    ${sy < 0.3 ? `<path d="M${-rx} 0 Q0 ${f1(ry * 0.25)} ${rx} 0" fill="none" stroke="${GR}" stroke-width="7" stroke-linecap="round"/>` : ''}</g>`;
  const bild = (r, n) => `<image href="${r.D}${n}.png" width="1024" height="1024"/>`;
  const del = (r, n, v, [px, py]) => `<g transform="rotate(${v.toFixed(2)} ${px} ${py})">${bild(r, n)}</g>`;
  function svg(namn, { oraB = 0, oraF = 0, svans = 0, arm = 0, armL = 1, ben = true, blink = 0, glad = 0, forv = 0, nyf = 0, mun = 0, kind = 0.75, titt = [0, 0], nick = 0, benY = 0, benV = [0, 0], benX = 0 } = {}) {
    const r = RIGG[namn], id = 'k34' + (++N % 1000);
    const sy = Math.max(0.08, 1 - 0.92 * blink) * (1 + 0.12 * forv), sx = 1 + 0.1 * forv;
    const g = { sy, sx, glad: blink > 0.5 ? 0 : glad };
    const px = 6 + 4 * nyf + titt[0], py = 2 + titt[1];
    const ogon = r.ogon.map(([c, rx, ry, pb, klipp]) => {
      const s = oga(r, id, c, rx, ry, { ...g, px: klipp && r.ogon.length > 1 ? px * 0.5 + 2 : px, py, pb });
      return klipp ? `<g mask="url(#${id}k)">${s}</g>` : s; }).join('');
    const [mx, my] = r.munC, [ap, ay] = r.arm.piv;
    const ansikte = `<g transform="translate(0 ${f1(nick)})">${ogon}
      <g mask="url(#${id}k)">${r.kinder.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${f1(y - 4 * glad)}" rx="${rx}" ry="${ry}" fill="${KIND}" opacity="${f1(kind)}" filter="url(#${id}b)"/>`).join('')}
        <path d="${r.nos}" fill="${KIND}"/>
        ${mun > 0.03 ? `<ellipse cx="${mx}" cy="${f1(my + 3 * mun)}" rx="${f1(9 + 5 * mun)}" ry="${f1(3 + 9 * mun)}" fill="${MUNF}"/>` : ''}
        <g fill="none" stroke="${GR}" stroke-linecap="round" stroke-width="5"><path d="${r.nosRad}"/><path d="${r.le(glad)}"/></g></g></g>`;
    return `<defs><filter id="${id}v"><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>
      <filter id="${id}b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5"/></filter>
      <mask id="${id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><image href="${r.D}body.png" width="1024" height="1024" filter="url(#${id}v)"/></mask></defs>
      ${namn === 'oss' ? `<g transform="rotate(${svans.toFixed(2)} ${r.tail[0]} ${r.tail[1]})">${SVANS34}</g>` : del(r, 'tail', svans, r.tail)}
      ${ben ? `<g transform="translate(0 ${f1(-benY)})"><g transform="translate(${f1(benX)} 0)">${del(r, 'leg-l', benV[0], r.legL)}</g><g transform="translate(${f1(-benX)} 0)">${del(r, 'leg-r', benV[1], r.legR)}</g></g>` : ''}
      ${del(r, r.oraB[0], oraB, r.oraB[1])}
      ${bild(r, 'body')}
      ${del(r, r.oraF[0], oraF, r.oraF[1])}
      <g transform="translate(${ap} ${ay}) rotate(${arm.toFixed(2)}) scale(1 ${armL.toFixed(3)}) translate(${-ap} ${-ay})">${bild(r, 'arm')}</g>
      ${ansikte}`;
  }
  // morrhåren ut åt höger, i ett eget lager utan vit kant (annars blir de tjocka band med kant); samma 1024-ruta, nick som ansiktet
  const morr = (namn, { nick = 0 } = {}) => `<g transform="translate(0 ${f1(nick)})" fill="none" stroke="${GR}" stroke-linecap="round" stroke-width="4" opacity="0.9">
    ${RIGG[namn].morr.split('|').map(d => `<path d="${d}"/>`).join('')}</g>`;
  const jamka = namn => { const { anker: [ax, ay], k } = RIGG[namn]; return `scale(${k}) translate(${-ax} ${-ay})`; };
  const BILDER = Object.values(RIGG).flatMap(r => ['body', r.oraB[0], r.oraF[0], 'tail', 'arm', 'leg-l', 'leg-r'].map(n => `${r.D}${n}.png`));
  return { svg, morr, jamka, RIGG, BILDER };
})();
