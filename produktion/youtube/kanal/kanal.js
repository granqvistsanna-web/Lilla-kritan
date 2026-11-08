// Kanalbilder för lilla kritan. Duken är 1920×1080 (= bannerns 2560×1440 × 0,75).
// Bannerns säkra yta (syns överallt): 1546×423 i mitten = x 380–1540, y 381–699 här. Datorn visar hela bredden i det bandet, tv:n allt.
// Vattenstämpeln (#vattenstampel) är samma ruta, genomskinlig. Profilbilden (#profil) är rutan 1080×1080 i mitten, och YouTube visar en cirkel.
const PROFIL = location.hash === '#profil';
const EN = location.hash === '#en';   // engelska kanalen tiny crayon tv (../kanal-en)
const F = { rod: '#df342f' };
// Bannern (art direction v2): lila vägg med trägolv ur assets/stiltest-premium/vaggar, flyttad upp så att golvet syns i bandet.
// Bokstäverna har fem färger utan väggens lila, tjock vit kant och en skugga i väggens mörka lila.
const VAGG = { fil: '../../../assets/stiltest-premium/vaggar/lila-tragolv.png', dy: -112, golv: '#e4b571', skugga: '#5e3f8f' };
const PAL = ['#e23d36', '#f0802a', '#f6c53b', '#2f7fd6', '#e0397f'];
const STUDS = [0, -5, 2, -3, 4, -2, 3, -5, 1, -3, 2];
// samma bokstäver som introts ordmärke
const GLYF = {
  l: { d: 'M20 -182 Q17 -90 19 -20 Q20 2 36 -4', b: 44 },
  i: { d: 'M16 -98 Q14 -50 16 0', b: 32, prick: [16, -150] },
  a: { d: 'M74 -78 Q58 -106 32 -98 Q2 -88 4 -46 Q6 -2 36 -2 Q64 -2 74 -40 M76 -100 Q74 -50 78 0', b: 92, glans: 1 },
  k: { d: 'M16 -182 Q14 -90 16 0 M70 -100 Q40 -70 20 -46 Q46 -28 74 0', b: 82 },
  r: { d: 'M16 -98 Q14 -50 16 0 M16 -56 Q26 -100 66 -94', b: 70 },
  t: { d: 'M32 -158 Q30 -80 32 -22 Q34 2 58 -6 M6 -100 Q34 -103 62 -98', b: 66 },
  n: { d: 'M16 -98 Q14 -50 16 0 M16 -62 Q28 -104 56 -100 Q80 -96 79 -58 Q78 -30 80 0', b: 96 },
  o: { d: 'M48 -98 Q8 -100 6 -50 Q4 -2 46 -2 Q86 -2 86 -50 Q86 -98 48 -98', b: 92 },
  c: { d: 'M74 -84 Q58 -102 36 -98 Q4 -90 4 -48 Q6 -2 38 -2 Q62 -2 76 -18', b: 80 },
  v: { d: 'M6 -98 Q24 -50 42 0 Q60 -50 78 -98', b: 84 },
  y: { d: 'M6 -98 Q22 -60 42 -14 M80 -98 Q58 -40 40 6 Q26 50 4 56', b: 86 },
};
const VRID = [3, -4, 2.5, -3, 4, -2.5, 3.5, -4, 2, -3.5, 3];

async function bygg() {
  const { lager, el } = kit;
  kit.duk('himlen');
  const defs = document.querySelector('defs');
  defs.insertAdjacentHTML('beforeend', `
    <filter id="vax" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="korn" x="0" y="0" width="1" height="1">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.47  0 0 0 0 0.36  1.1 0 0 0 -0.47"/>
    </filter>
    <filter id="rivkant" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="9" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`);
  const vaxGrupp = p => el('g', { transform: 'rotate(28)' }, el('g', { filter: 'url(#vax)' }, el('g', { transform: 'rotate(-28)' }, p)));

  // papperskortet från introt: krämvitt med korn och riven kant
  const papper = (form, parent) => {
    const id = 'kort' + Math.random().toString(36).slice(2, 7);
    form.setAttribute('fill', '#fff');
    el('g', { filter: 'url(#rivkant)' }, el('mask', { id, maskUnits: 'userSpaceOnUse', x: -200, y: -200, width: 2320, height: 1480 }, defs)).appendChild(form);
    const g = el('g', { mask: `url(#${id})` }, parent);
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: '#FBF7EE' }, g);
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, filter: 'url(#korn)' }, g);
  };
  // ordmärket, centrerat på (cx, bas)
  const ord = (text, cx, bas, s, start, parent) => {
    let x = 0; const bokst = [];
    for (const ch of text) { if (ch === ' ') { x += 36; continue; } bokst.push({ ch, x }); x += GLYF[ch].b + 32; }
    const bredd = x - 32, g = el('g', { transform: `translate(${cx} ${bas}) scale(${s}) translate(${-bredd / 2} 0)` }, parent);
    // jämn fyllning med lite kritkorn ovanpå, små lutningar och studs. Prickens vita kant är lika bred som streckets.
    bokst.forEach((b, i) => {
      const gl = GLYF[b.ch], farg = PAL[(start + i) % PAL.length], s2 = { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
      const p = el('g', { transform: `translate(${b.x} ${STUDS[i % STUDS.length]}) rotate(${VRID[(start + i) % VRID.length] * 0.5} ${gl.b / 2} -60)` }, g);
      el('path', { ...s2, d: gl.d, stroke: VAGG.skugga, 'stroke-width': 52, opacity: 0.5, transform: 'translate(0 7)' }, p);
      el('path', { ...s2, d: gl.d, stroke: '#fff', 'stroke-width': 52 }, p);
      el('path', { ...s2, d: gl.d, stroke: farg, 'stroke-width': 33 }, p);
      el('path', { ...s2, d: gl.d, stroke: '#fff', 'stroke-width': 33, opacity: 0.1 }, vaxGrupp(p));
      // glans: en kort vit strimma i toppen av strecket (a: på stammen, annars ser den ut som en accent), lite åt vänster
      const delar = gl.d.split(' M'), sp = gl.glans || 0;
      el('path', { ...s2, d: (sp ? 'M' : '') + delar[sp], stroke: '#fff', 'stroke-width': 7, opacity: 0.85, 'stroke-dasharray': '22 99999', 'stroke-dashoffset': -10, transform: 'translate(-6 0)' }, p);
      if (gl.prick) {
        const [cx, cy] = gl.prick;
        el('circle', { cx, cy: cy + 7, r: 26, fill: VAGG.skugga, opacity: 0.5 }, p);
        el('circle', { cx, cy, r: 26, fill: '#fff' }, p);
        el('circle', { cx, cy, r: 17, fill: farg }, p);
        el('circle', { cx, cy, r: 17, fill: '#fff', opacity: 0.1 }, vaxGrupp(p));
        el('circle', { cx: cx - 6, cy: cy - 6, r: 4.5, fill: '#fff', opacity: 0.85 }, p);
      }
    });
    return cx + bredd * s / 2;   // högerkanten
  };

  // en krita utan ansikte: röd vaxkropp, krämvitt omslag med två röda ränder, vit klistermärkskant. Mitt i (x, y), spetsen åt höger före vridning.
  // skugga: en färg ger en mjuk skugga under kanten (bannern), annars ingen.
  const krita = (x, y, rot, k, parent, skugga) => {
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${rot}) scale(${k})` }, parent);
    const kropp = 'M-330 -80 Q-350 -80 -350 -60 L-350 60 Q-350 80 -330 80 L190 80 L360 18 Q384 0 360 -18 L190 -80 Z';
    if (skugga) el('path', { d: kropp, fill: skugga, opacity: 0.5, stroke: skugga, 'stroke-width': 44, 'stroke-linejoin': 'round', transform: `rotate(${-rot}) translate(0 ${7 / k}) rotate(${rot})` }, g);
    el('path', { d: kropp, fill: '#fff', stroke: '#fff', 'stroke-width': 44, 'stroke-linejoin': 'round' }, g);
    el('path', { d: kropp, fill: F.rod }, vaxGrupp(g));
    el('rect', { x: -250, y: -80, width: 380, height: 160, fill: '#FBF7EE' }, g);
    for (const rx of [-200, 80]) el('path', { d: `M${rx} -80 Q${rx + 14} 0 ${rx} 80`, fill: 'none', stroke: F.rod, 'stroke-width': 18, 'stroke-linecap': 'round' }, vaxGrupp(g));
    // glans längs kritans överkant (y +52, kritan är vriden 200° i bannern; bara där): på vaxet vid spetsen och bakänden
    if (skugga) for (const [a, b] of [[195, 300], [-325, -275]]) el('path', { d: `M${a} 52 L${b} ${a > 0 ? 22 : 52}`, stroke: '#fff', 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.8 }, g);
  };

  if (location.hash === '#vattenstampel') {
    // YouTubes vattenstämpel: bara kritan, genomskinlig bakgrund
    lager.plate.remove();
    document.documentElement.style.background = document.body.style.background = 'transparent';
    krita(955, 545, -35, 1.35, lager.overst);
  } else if (PROFIL) {
    // ren himmel med lite kritkorn och kritan
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: '#3ab4ea' }, lager.plate);
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: '#fff', opacity: 0.1, filter: 'url(#vax)' }, lager.plate);
    krita(950, 535, -35, 1.05, lager.overst);
  } else {
    // lila vägg och trägolv, ordmärket, undertexten och kritan som just har skrivit klart, allt i den säkra ytan
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: VAGG.golv }, lager.plate);
    el('image', { href: VAGG.fil, x: 0, y: VAGG.dy, width: 1920, height: 1080, preserveAspectRatio: 'xMidYMid slice' }, lager.plate);
    const [namn, under] = EN ? ['tiny crayon tv', 'songs and stories for the littlest ones'] : ['lilla kritan', 'sånger och sagor för de minsta'];
    const hoger = ord(namn, 840, 530, EN ? 0.52 : 0.62, 0, lager.overst);
    const K = 0.27, R = 200, rad = R * Math.PI / 180, spets = [hoger + 20, 520];   // spetsen vid sista bokstaven
    krita(spets[0] - 372 * K * Math.cos(rad), spets[1] - 372 * K * Math.sin(rad), R, K, lager.overst, VAGG.skugga);
    // undertexten på en remsa av introts papperskort: mörklila på krämvitt läses även i mobilen
    await document.fonts.load('600 38px Fredoka', under);
    const remsa = el('g', {}, lager.overst);
    const t = el('text', { x: 840, y: 618, 'text-anchor': 'middle', 'font-size': 38, 'letter-spacing': 0.4, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#45286f' }, lager.overst);
    t.textContent = under;
    const bb = t.getBBox(), kort = d => `M${bb.x - 30} ${bb.y - 8 + d} H${bb.x + bb.width + 30} V${bb.y + bb.height + 8 + d} H${bb.x - 30} Z`;
    el('path', { d: kort(6), fill: VAGG.skugga, opacity: 0.5, filter: 'url(#rivkant)', transform: 'rotate(-1 840 607)' }, remsa);
    papper(el('path', { d: kort(0), transform: 'rotate(-1 840 607)' }), remsa);
    await new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = VAGG.fil; });
  }
  kit.kor(() => {}, 1 / 30);
}
bygg();
