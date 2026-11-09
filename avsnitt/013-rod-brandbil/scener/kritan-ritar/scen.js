// 013 Röda sången, scen kritan-ritar (01a–01c, avsnittstid 0:11.3–0:26.5). Laddas efter ../film.js och skriver över dess
// ANIM['01a'–'01c']. Lugnare version (Sanna 2026-11-08: "the drawing scene is a bit fast, let children guess"), i Gissa teckningens anda:
// 01a: kritan ritar äpplets KONTUR i tre lugna drag med små pauser (vänster sida och botten, "Hmm…", höger sida, bladet och skaftet),
//      linjen är en och samma, så formen växer fram och går att gissa.
// 01b (0:17.0): "Vad kan det vara?", sedan 4 s gissningspaus: kritan väntar bredvid, vickar och knackar två gånger på papperet.
// 01c (0:22.3): "Ett äpple!": först nu fylls den riktiga bilden (applet-rott-v3) i inifrån med en vaxig kant medan linjen tonas bort
//      (015:s regel), pling, äpplet hoppar och gungar på sin runda botten, krit-gnistor poppar fram. Kameran åker ut och brandbilen
//      med kaninen kör in från vänster och stannar bredvid äpplet. "Nu kör vi!" (0:24.5, när sången börjar): kaninen hurrar.
//      0:24.6–0:26.5: zoom in (swoosh) som 015/016: ett hål med vaxig kant växer ut i papperet bakom brandbilen, vägen syns.
// Sista bilden är 02a:s första (film.js: korscen, bil lampa 1, kaninen jätteglad, kamera 1), så vagen-1 tar vid utan hopp. Äpplet och
// kritan ligger i en egen grupp i kameran men UTANFÖR #spegel (vanliga
// skärmkoordinater), så bilden visas som den är ritad: bladet till höger, glansen uppe till vänster (ljuset från vänster).
(() => {
  const el = (tag, a = {}, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const del = (a, b, t) => kl01((t - a) / (b - a));
  const pop = tau => tau <= 0 ? 0 : 1 - Math.exp(-7 * tau) * Math.cos(16 * tau);   // klistermärkes-pop: 0 → översväng → 1

  // Äpplets kontur i bildens egna pixlar (729×836), spårad ur alfat (färgade pixlar, krympt 5 px så att linjen ligger innanför
  // den vita kanten). Börjar vid skaftets fot, går åt vänster runt kroppen, sedan bladet och skaftet. Kroppen = 0–KROPP av längden.
  const KONTUR = 'M349 216 L322 215 L297 206 L257 198 L215 199 L183 208 L136 233 L105 261 L77 301 L74 310 L68 317 L67 324 L62 330 L57 353 L53 359 L46 381 L42 439 L47 504 L55 535 L64 554 L67 570 L70 573 L73 586 L76 588 L76 593 L88 621 L97 634 L101 647 L141 705 L148 710 L156 723 L161 728 L164 728 L165 732 L189 753 L210 767 L225 774 L234 775 L257 784 L287 786 L305 782 L322 775 L365 766 L397 767 L454 781 L472 781 L507 772 L520 765 L550 741 L592 697 L613 666 L614 660 L619 656 L634 622 L652 590 L665 550 L667 549 L669 534 L672 530 L684 462 L685 439 L682 384 L676 357 L661 311 L631 258 L614 240 L596 226 L558 204 L546 202 L535 196 L516 192 L492 192 L485 190 L485 171 L499 159 L511 144 L529 114 L541 74 L544 46 L543 41 L539 37 L526 39 L464 62 L444 76 L416 104 L394 138 L394 142 L386 156 L367 155 L362 130 L356 123 L354 108 L350 102 L345 101 L336 104 L320 113 L319 115 L335 144 L336 151 L340 155 L350 196 L349 216';
  // Äpplet står till höger om där brandbilen står i 02a (skärmens x 360–1490), utanför helbilden; kameran står på äpplet medan det ritas.
  const KROPP = 0.732, AC = 2050, AH = 640, AS = AH / 836, AX = AC - 729 * AS / 2, AY = 160;   // äpplet 640 px högt
  const BOTTEN = AY + 790 * AS, APPLE_KAM = [AC, AY + 460 * AS], UTE = [1450, 600, 0.55];     // underkanten; kamerorna (x, y, zoom)
  const HAL = [997, 760];   // hålets mitt i scenens (speglade) koordinater: mitt på brandbilen i 02a
  const LINJE = RÖD_M, LUTA = 40, KRITA_S = 0.95;

  // Tider (avsnittstid). Rösterna (index.html ROSTER): "Hmm…" 13.75 och "Vad kan det vara?" 17.0 (1,3 s) finns; "Kritan ritar …"
  // 11.5, "Ett äpple! Ett rött äpple!" 22.3 och "Nu kör vi!" 24.5 saknas än. Gissningspausen: frågan slutar 18.3, svaret 22.3 (4 s).
  // DRAG: [start, slut, från, till] i linjens längd: vänster sida och botten, höger sida, bladet och skaftet.
  const DRAG = [[11.9, 13.6, 0, 0.36], [14.3, 15.6, 0.36, KROPP], [15.9, 16.8, KROPP, 1]];
  const T = { in: [11.35, 11.6], vanta: [16.8, 17.4], knack: [19.3, 20.7], svar: 22.3, fyll: [22.3, 22.9], hopp: 22.75, rott: 23.5,
    ut: [23.1, 24.3], bil: [23.2, 24.5], kor: 24.5, zoom: [24.6, 26.5], hal: [24.75, 26.3] };

  const svg = document.querySelector('svg'), defs = svg.querySelector('defs');
  defs.insertAdjacentHTML('beforeend', `
    <filter id="vax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="halkant" filterUnits="userSpaceOnUse" x="-600" y="-600" width="2000" height="2000">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="11" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="70" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="rit-halkant" filterUnits="userSpaceOnUse" x="-4000" y="-4000" width="10000" height="9000">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="11" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="70" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    ${['ute', 'inne', 'skarm'].map(id => `<mask id="rit-hal-${id}" maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="10000" height="9000">
      <rect x="-4000" y="-4000" width="10000" height="9000" fill="${id === 'inne' ? '#000' : '#fff'}"/>
      <circle class="rit-hal" cx="${id === 'skarm' ? 1920 - HAL[0] : HAL[0]}" cy="${HAL[1]}" r="0" fill="${id === 'inne' ? '#fff' : '#000'}" filter="url(#rit-halkant)"/></mask>`).join('')}
    <filter id="smakrita" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.08 0.3" numOctaves="2" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.7 0 0 0 1.55" result="a"/>
      <feComposite in="SourceGraphic" in2="a" operator="in"/>
    </filter>
    <filter id="rit-boil" filterUnits="userSpaceOnUse" x="-3000" y="-2000" width="8000" height="5000">   <!-- kitets #boil räcker bara till x 2120 -->
      <feTurbulence id="rit-brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="5"/>
    </filter>
    <filter id="markskugga" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="rit-mjuk" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur id="rit-mjuk-b" stdDeviation="0"/></filter>
    <mask id="m-fyll" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1200" height="1300">
      <circle id="rit-fyll" cx="365" cy="470" r="0" fill="#fff" filter="url(#halkant)"/></mask>
    <path id="krita-form" d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z"/>
    <radialGradient id="rit-vinjett" cx="50%" cy="50%" r="75%"><stop offset="55%" stop-color="#2a1a0c" stop-opacity="0"/><stop offset="100%" stop-color="#2a1a0c" stop-opacity="1"/></radialGradient>`);

  // Lagren, i kameran efter #spegel: markskuggan → äpplet (bilden i fyllmasken + linjen) → gnistorna → kritan
  const rit = el('g', { id: 'rit', mask: 'url(#rit-hal-skarm)' }, $('kamera'));   // äpplet och kritan försvinner med papperet
  const boil = el('g', { filter: 'url(#rit-boil)' }, rit);
  const skugga = el('ellipse', { fill: '#5a3a24', filter: 'url(#markskugga)' }, boil);
  const studs = el('g', {}, boil);
  const apple = el('g', { transform: `translate(${AX} ${AY}) scale(${AS})` }, studs);
  el('image', { href: AEPPLE, width: 729, height: 836, mask: 'url(#m-fyll)' }, apple);
  const linjeG = el('g', { filter: 'url(#vax)' }, apple);
  const linje = el('path', { d: KONTUR, fill: 'none', stroke: LINJE, 'stroke-width': 19, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, linjeG);
  const L = linje.getTotalLength(); linje.setAttribute('stroke-dasharray', `${L} ${L + 1}`);
  const gnistorG = el('g', {}, boil);
  const krita = el('g', {}, el('g', { filter: 'url(#rit-boil)' }, rit));
  krita.innerHTML = `<g><use href="#krita-form" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>
    <g transform="rotate(-28)"><g filter="url(#vax)"><g transform="rotate(28)">
      <use href="#krita-form" fill="${RÖD}"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${RÖD_M}"/>
      <path d="M-19 -92 Q0 -98 19 -92 M-19 -218 Q0 -224 19 -218" stroke="#7E1A14" stroke-width="4" fill="none"/>
    </g></g></g></g>`;

  // krit-gnistor (lamm.js, 015): fyruddiga klistermärken, gul krita med vit kant och ljus mitt
  const stjarna = r => `M0 ${-r} Q${r * 0.16} ${-r * 0.16} ${r} 0 Q${r * 0.16} ${r * 0.16} 0 ${r} Q${-r * 0.16} ${r * 0.16} ${-r} 0 Q${-r * 0.16} ${-r * 0.16} 0 ${-r}Z`;
  const GNISTOR = [[-330, 250, 58, 0], [350, 200, 48, 0.1], [-395, 610, 44, 0.18], [400, 560, 56, 0.26]].map(([x, ...o]) => [AC + x, ...o]).map(([x, y, r, d]) => {
    const g = el('g', { 'stroke-linejoin': 'round' }, gnistorG);
    el('path', { d: stjarna(r), fill: '#fff', stroke: '#fff', 'stroke-width': (3 + 0.16 * r).toFixed(1) }, g);
    el('path', { d: stjarna(r), fill: '#F2C94C' }, g);
    el('path', { d: stjarna(r), fill: '#F7DA74', filter: 'url(#smakrita)' }, g);
    el('path', { d: stjarna(r * 0.5), fill: '#FFF7D6', filter: 'url(#smakrita)' }, g);
    return { g, x, y, d };
  });

  // Varm soft-light 0.07 och vinjett 0.12 (högst 0.14) över allt (premium-finputs), utanför kameran
  el('rect', { width: 1920, height: 1080, fill: '#FF9F4A', opacity: 0.07, style: 'mix-blend-mode:soft-light' }, svg);
  el('rect', { width: 1920, height: 1080, fill: 'url(#rit-vinjett)', opacity: 0.12 }, svg);

  // ett mjukt hopp: upp och ner på 0,45 s, sedan trycks äpplet ihop när det landar och fjädrar tillbaka (ingen snurr)
  const hopp = (t, t0, h) => {
    const k = (t - t0) / 0.45;
    if (k < 0) return { y: 0, sx: 1, sy: 1 };
    if (k < 1) { const s = Math.sin(Math.PI * k); return { y: -h * s, sx: 1 - 0.03 * s, sy: 1 + 0.04 * s }; }
    const e = t - t0 - 0.45, q = Math.exp(-6 * e) * Math.cos(18 * e) * h / 40;
    return { y: 0, sx: 1 + 0.07 * q, sy: 1 - 0.07 * q };
  };
  const iBild = ([x, y]) => [AX + x * AS, AY + y * AS];
  const spets = k => { const p = linje.getPointAtLength(L * kl01(k)); return iBild([p.x, p.y]); };
  const mix2 = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];

  // linjens längd (0–1) vid t: kroppen i 01a, en liten paus (kritan tänker), bladet och skaftet i 01b
  const jamn = k => (k + ease(k)) / 2;   // nästan jämn fart på kritspetsen, mjuk start och stopp
  const drag = t => { const d = DRAG.findLast(([a]) => t >= a); return d ? lerp(d[2], d[3], jamn(del(d[0], d[1], t))) : 0; };

  function kritan(t) {
    const skrrt = Math.sin(t * 2 * Math.PI * 17) * 1.6, VANTA = [AC + 460, 330], UT = [AC + 1250, -260];
    if (t < T.in[0]) return null;
    if (t < DRAG[0][0]) { const k = del(...T.in, t); return { p: [spets(0)[0], spets(0)[1] - 18 * (1 - k)], v: LUTA, s: pop((t - T.in[0]) / 0.5) }; }
    const i = DRAG.findLastIndex(([a]) => t >= a), [, b] = DRAG[i];
    if (t < b) return { p: [spets(drag(t))[0], spets(drag(t))[1] + skrrt * 0.6], v: LUTA + skrrt };   // ritar
    if (i < DRAG.length - 1) {   // paus mellan dragen: lyfter lite och tittar, sätter ner spetsen där linjen slutade
      const k = Math.sin(Math.PI * del(b, DRAG[i + 1][0], t)), q = spets(drag(t));
      return { p: [q[0] + 10 * k, q[1] - 34 * k], v: LUTA - 8 * k };
    }
    // efter sista draget: lyfter till väntplatsen, vickar ("hmm") och knackar två gånger på papperet; på "Ett äpple!" ut ur bild
    const k = ease(del(...T.vanta, t)), s = Math.max(0, t - T.vanta[1]), u = ease(del(T.svar, T.svar + 0.8, t)) ** 1.4;
    const knack = T.knack.reduce((a, tk) => a + Math.sin(Math.PI * del(tk, tk + 0.3, t)) * (t < tk + 0.3 ? 1 : 0), 0);
    const p = mix2(mix2(spets(1), VANTA, k), UT, u);
    return t > T.svar + 0.8 ? null : { p: [p[0] + Math.sin(s * 2.1) * 5, p[1] - Math.abs(Math.sin(s * 3)) * 6 * Math.min(1, s / 0.4) - 40 * Math.sin(Math.PI * k) + 70 * knack],
      v: LUTA + 10 * Math.sin(Math.PI * k) + 7 * Math.sin(s * 3.4) * Math.min(1, s / 0.6) - 6 * knack + 20 * u };
  }

  // Papperet ligger i plattan (speglat, men symmetriskt) och är stort nog för den utzoomade kameran. Under det ligger vägen,
  // som bara syns genom hålet; träden och tuvorna (bakom/framför) maskas till hålet.
  const PAPPER = `<g mask="url(#rit-hal-ute)" filter="url(#rit-mjuk)"><rect x="-3000" y="-2000" width="8000" height="5000" fill="#F6EFE3"/>
    <rect x="-1400" y="-300" width="3800" height="1680" rx="20" fill="#FDFBF4" stroke="#e8e0cf" stroke-width="8"/></g>`;
  const kam = (z, cx, cy) => $('kamera').setAttribute('transform', `translate(${(960 - cx * z).toFixed(2)} ${(540 - cy * z).toFixed(2)}) scale(${z.toFixed(5)})`);
  const kamMix = (a, b, q) => [lerp(a[0], b[0], q), lerp(a[1], b[1], q), Math.exp(lerp(Math.log(a[2]), Math.log(b[2]), q))];

  function bild(t) {
    // Sanna 2026-11-09 "use the drawing crayon transition": inget hål och ingen zoom in längre; det röda kritsvepet (film.js SVEP
    // 26,5) täcker skarven till vagen-1. Papperet står kvar, kameran stannar i helbilden med äpplet och brandbilen.
    const hal = 0;
    if (hal > 0) korscen(); else $('platta').innerHTML = '';
    for (const c of document.querySelectorAll('.rit-hal')) c.setAttribute('r', hal.toFixed(1));
    for (const l of ['bakom', 'framfor']) $(l).setAttribute('mask', 'url(#rit-hal-inne)');

    // brandbilen med kaninen kör in från vänster (speglat: från stora x) och stannar där den står i 02a, med en liten gungning
    const kb = del(...T.bil, t), bx = 1800 * (1 - kb) ** 2.2, gb = kb > 0.8 ? Math.sin(Math.PI * del(T.bil[1] - 0.3, T.bil[1] + 0.3, t)) : 0;
    if (t >= T.bil[0]) {
      bil({ x: bx, lampa: 1, lut: -1.5 * gb });
      // öppna ögon, och på "Nu kör vi!" vänder hon sig mot oss och vinkar hej (Sanna 2026-11-09); vinkningen fortsätter in i 02a
      const vk = ease(del(T.kor - 0.4, T.kor, t)), w = 56 + 20 * Math.sin((t - T.kor) * 6);
      kanin({ iBil: true, uttryck: 'glad', pose: { armar: [0, w * vk] }, rikt: -1 + vk });
    }
    $('platta').insertAdjacentHTML('beforeend', PAPPER + (t >= T.bil[0] && hal < 1400   // brandbilens markskugga på papperet
      ? `<ellipse cx="${997 + bx - 8}" cy="1012" rx="470" ry="62" fill="#5a3a24" opacity="${(0.2 * (1 - hal / 1400)).toFixed(3)}" filter="url(#markskugga)"/>` : ''));
    // linjen och fyllningen
    linje.style.display = t >= DRAG[0][0] ? '' : 'none';
    linje.setAttribute('stroke-dashoffset', (L * (1 - drag(t))).toFixed(1));
    linjeG.setAttribute('opacity', (1 - ease(del(T.fyll[0] + 0.15, T.fyll[1] + 0.2, t))).toFixed(3));
    const fy = del(...T.fyll, t);
    $('rit-fyll').setAttribute('r', (720 * ease(fy) ** 1.2).toFixed(1));

    // äpplet: andas in när bilden är klar, hoppar och gungar på "Ett äpple!", små skutt på "rött" och "Nu kör vi!"
    const pul = Math.sin(Math.PI * del(T.fyll[1] - 0.2, T.fyll[1] + 0.2, t)) * (t < T.hopp ? 1 : 0);   // andas in när bilden är klar
    const h = [hopp(t, T.hopp, 46), hopp(t, T.rott, 20), hopp(t, T.kor, 24)];
    const y = h.reduce((a, q) => a + q.y, 0), sx = h.reduce((a, q) => a * q.sx, 1) * (1 + 0.035 * pul), sy = h.reduce((a, q) => a * q.sy, 1) * (1 - 0.025 * pul);
    const e = t - T.hopp - 0.45, gung = e > 0 ? 5 * Math.exp(-1.6 * e) * Math.sin(6.5 * e) : 0;   // gungar på sin runda botten efter landningen
    studs.setAttribute('transform', `translate(${AC} ${(BOTTEN + y).toFixed(1)}) rotate(${gung.toFixed(2)}) scale(${sx.toFixed(4)} ${sy.toFixed(4)}) translate(${-AC} ${-BOTTEN})`);

    // markskuggan: kommer med bilden, stannar på papperet, mindre och ljusare i hoppen, lite åt höger
    const kk = 1 - 0.45 * kl01(-y / 120), rx = 230 * kk;
    skugga.setAttribute('cx', (AC + 7 + 6 * kk).toFixed(1)); skugga.setAttribute('cy', (BOTTEN + 4).toFixed(1));
    skugga.setAttribute('rx', rx.toFixed(1)); skugga.setAttribute('ry', (rx * 0.15).toFixed(1));
    skugga.setAttribute('opacity', (0.22 * kk * ease(fy)).toFixed(3));

    // krit-gnistorna på "Ett äpple!": poppar fram en i taget, vickar, krymper bort efter en dryg sekund
    for (const { g, x, y: gy, d } of GNISTOR) {
      const t0 = T.hopp + 0.1 + d, s = pop((t - t0) / 0.5) * (1 - ease(del(t0 + 1.2, t0 + 1.6, t)));
      g.style.display = s > 0.01 ? '' : 'none';
      g.setAttribute('transform', `translate(${x} ${gy - 20 * del(t0, t0 + 1.6, t)}) rotate(${(12 * Math.sin((t - t0) * 5)).toFixed(1)}) scale(${Math.max(0, s).toFixed(3)})`);
    }

    const k = kritan(t);
    krita.style.display = k ? '' : 'none';
    if (k) krita.firstChild.setAttribute('transform', `translate(${k.p[0].toFixed(1)} ${k.p[1].toFixed(1)}) rotate(${k.v.toFixed(2)}) scale(${(KRITA_S * (k.s ?? 1)).toFixed(4)})`);

    // kameran: på äpplet medan det ritas, ut när brandbilen kör in, sedan zoom in till 02a:s helbild (papperet lite mjukt i zoomen)
    const A1 = [...APPLE_KAM, 1], q = 0;
    const [cx, cy, z] = kamMix(kamMix(A1, UTE, ease(del(...T.ut, t))), [960, 540, 1], q);
    kam(z, cx, cy);
    $('rit-mjuk-b').setAttribute('stdDeviation', (1.1 * q).toFixed(2));
    for (const b of ['brus', 'rit-brus']) $(b).nextElementSibling.setAttribute('scale', (5 / z).toFixed(2));   // samma kokning på skärmen i alla zoomar
    $('rit-brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1);
  }
  ANIM['01a'] = ANIM['01b'] = ANIM['01c'] = () => bild(TID);

  // Ljudeffekterna (scentid = avsnittstid − 11.3), som 015: skrrrrt-lang på de två dragen runt kroppen, skrrrrt-kort på bladet
  // och skaftet, tass när kritan knackar, pling på "Ett äpple!", brum lågt när brandbilen kör in, swoosh på zoomen. Läggs till efter film.js rösterna.
  const fx = (namn, v, t, o = {}) => ({ fil: `assets/ljud/effekter/${namn}/${namn}-${v}.m4a`, t: t - 11.3, vol: 1, ...o });
  window.ready = window.ready.then(r => {
    window.LJUD.push(
      ...DRAG.map(([a, b], i) => i < 2 ? fx('skrrrrt-lang', 1 + 2 * i, a, { loop: true, langd: b - a + 0.1, vol: 4, fade: 0.15 })
        : fx('skrrrrt-kort', 2, a, { langd: b - a + 0.1, vol: 2.5, fade: 0.15 })),
      ...T.knack.map(tk => fx('tass', 2, tk + 0.12, { vol: 0.5, langd: 0.3 })),   // kritan knackar på papperet
      fx('pling', 1, T.svar + 0.1, { vol: 1.2, langd: 1.5, fade: 0.4 }),
      fx('brum', 1, T.bil[0], { vol: 0.6, langd: T.bil[1] - T.bil[0] + 0.3, fade: 0.5 }),
      fx('skrrrrt-kort', 1, 25.8, { vol: 2.5, langd: 0.75, fade: 0.15 }));   // kritsvepet (var swoosh på zoomen)
    return r;
  });
})();
