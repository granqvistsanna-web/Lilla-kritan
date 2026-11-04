// Kanalbilder för lilla kritan. Duken är 1920×1080 (= bannerns 2560×1440 × 0,75).
// Bannerns säkra yta (syns överallt): 1546×423 i mitten = x 380–1540, y 381–699 här. Datorn visar hela bredden i det bandet, tv:n allt.
// Vattenstämpeln (#vattenstampel) är samma ruta, genomskinlig. Profilbilden (#profil) är rutan 1080×1080 i mitten, och YouTube visar en cirkel.
const PROFIL = location.hash === '#profil';
const F = { rod: '#df342f', orange: '#f28d3c', gron: '#4fae4a', turkos: '#2fb3b5', lila: '#8e44c9', rosa: '#e93c8f', bla: '#3b8fe0' };
const FARG = [F.rod, F.orange, F.gron, F.turkos, F.lila, F.rosa, F.bla, F.rod, F.orange, F.gron, F.lila];
// samma bokstäver som introts ordmärke
const GLYF = {
  l: { d: 'M20 -182 Q17 -90 19 -20 Q20 2 36 -4', b: 44 },
  i: { d: 'M16 -98 Q14 -50 16 0', b: 32, prick: [16, -150] },
  a: { d: 'M74 -78 Q58 -106 32 -98 Q2 -88 4 -46 Q6 -2 36 -2 Q64 -2 74 -40 M76 -100 Q74 -50 78 0', b: 92 },
  k: { d: 'M16 -182 Q14 -90 16 0 M70 -100 Q40 -70 20 -46 Q46 -28 74 0', b: 82 },
  r: { d: 'M16 -98 Q14 -50 16 0 M16 -56 Q26 -100 66 -94', b: 70 },
  t: { d: 'M32 -158 Q30 -80 32 -22 Q34 2 58 -6 M6 -100 Q34 -103 62 -98', b: 66 },
  n: { d: 'M16 -98 Q14 -50 16 0 M16 -62 Q28 -104 56 -100 Q80 -96 79 -58 Q78 -30 80 0', b: 96 },
};
const VRID = [3, -4, 2.5, -3, 4, -2.5, 3.5, -4, 2, -3.5, 3];

async function bygg() {
  const { lager, el } = kit;
  kit.duk('himlen');
  const defs = document.querySelector('defs');
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
    for (const ch of text) { if (ch === ' ') { x += 36; continue; } bokst.push({ ch, x }); x += GLYF[ch].b + 26; }
    const bredd = x - 26, g = el('g', { transform: `translate(${cx} ${bas}) scale(${s}) translate(${-bredd / 2} 0)` }, parent);
    bokst.forEach((b, i) => {
      const gl = GLYF[b.ch], farg = FARG[start + i], s2 = { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
      const p = el('g', { transform: `translate(${b.x} 0) rotate(${VRID[start + i] * 0.4} ${gl.b / 2} -60)` }, g);
      el('path', { ...s2, d: gl.d, stroke: '#fff', 'stroke-width': 46 }, p);
      el('path', { ...s2, d: gl.d, stroke: farg, 'stroke-width': 32 }, vaxGrupp(p));
      if (gl.prick) {
        el('circle', { cx: gl.prick[0], cy: gl.prick[1], r: 30, fill: '#fff' }, p);
        el('circle', { cx: gl.prick[0], cy: gl.prick[1], r: 16, fill: farg }, vaxGrupp(p));
      }
    });
    return bokst.length;
  };

  // en krita utan ansikte: röd vaxkropp, krämvitt omslag med två röda ränder, vit klistermärkskant. Mitt i (x, y), spetsen åt höger före vridning.
  const krita = (x, y, rot, k, parent) => {
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${rot}) scale(${k})` }, parent);
    const kropp = 'M-330 -80 Q-350 -80 -350 -60 L-350 60 Q-350 80 -330 80 L190 80 L360 18 Q384 0 360 -18 L190 -80 Z';
    el('path', { d: kropp, fill: '#fff', stroke: '#fff', 'stroke-width': 44, 'stroke-linejoin': 'round' }, g);
    el('path', { d: kropp, fill: F.rod }, vaxGrupp(g));
    el('rect', { x: -250, y: -80, width: 380, height: 160, fill: '#FBF7EE' }, g);
    for (const rx of [-200, 80]) el('path', { d: `M${rx} -80 Q${rx + 14} 0 ${rx} 80`, fill: 'none', stroke: F.rod, 'stroke-width': 18, 'stroke-linecap': 'round' }, vaxGrupp(g));
  };

  if (location.hash === '#vattenstampel') {
    // YouTubes vattenstämpel: bara kritan, genomskinlig bakgrund
    lager.plate.remove();
    document.documentElement.style.background = document.body.style.background = 'transparent';
    krita(955, 545, -35, 1.35, lager.overst);
  } else if (PROFIL) {
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: '#3ab4ea' }, lager.plate);   // ren himmel utan moln
    el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: '#fff', opacity: 0.1, filter: 'url(#vax)' }, lager.plate);   // kritkorn
    krita(950, 535, -35, 1.05, lager.overst);
  } else {
    // gräs längs botten (syns på tv), en vågig krit-kulle
    let d = 'M-40 1010'; [18, 26, 14, 30, 20, 12, 28, 16, 24, 20, 30, 14, 22].forEach((a, i) => d += ` q80 ${-a} 160 ${i % 2 ? 6 : -6}`);
    el('path', { d: d + ' L1980 1120 L-40 1120 Z', fill: '#8cc35f' }, lager.plate);
    el('path', { d: d + ' L1980 1120 L-40 1120 Z', fill: '#6fae46', filter: 'url(#vax)' }, lager.plate);
    el('path', { d, fill: 'none', stroke: '#bfe08f', 'stroke-width': 12, 'stroke-linecap': 'round', filter: 'url(#vax)' }, lager.plate);

    // kortet i den säkra ytan, lite snett som i introt
    const kortG = el('g', { transform: 'rotate(-2 960 540)' }, lager.overst);
    papper(kit.el('rect', { x: 390, y: 386, width: 1140, height: 308, rx: 16 }), kortG);
    // tejp på kortets två övre hörn
    for (const [x, y, v] of [[415, 420, -25], [1505, 420, 25]])
      el('rect', { x: x - 60, y: y - 18, width: 120, height: 36, fill: '#f6e3a4', opacity: 0.85, transform: `rotate(${v} ${x} ${y})` }, kortG);
    ord('lilla kritan', 960, 568, 0.78, 0, kortG);
    await document.fonts.load('600 60px Fredoka', 'sånger och sagor för de minsta');
    el('text', { x: 960, y: 664, 'text-anchor': 'middle', 'font-size': 46, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#6b6253' }, kortG)
      .textContent = 'sånger och sagor för de minsta';

    // kritan till vänster, spetsen mot kortet, och Fia fladdrar till höger (båda syns på dator och tv)
    krita(215, 520, 25, 0.48, lager.overst);
    // Fia fladdrar till höger om kortet (syns på dator och tv)
    const fia = await kit.figur('fjarilen-fia', { h: 230 });
    fia.pose({ x: 1690, y: 660, tilt: 10, ogon: 'happy', mun: 0.5 });
  }
  kit.kor(() => {}, 1 / 30);
}
bygg();
