// YouTube-miniatyr för avsnitt 003 (flyttad ur index.html). window.EN = true ger den engelska texten (en/index.html).
const ROD = '#df342f';
const TITEL = window.EN ? [['The Bus', 470, 450, 210], ['Goes Visiting', 470, 650, 118]] : [['Bussen', 470, 450, 210], ['hälsar på', 470, 650, 158]];   // [text, mitt-x, baslinje, storlek]

async function bygg() {
  const { lager, el } = kit;
  kit.duk('vagen');
  lager.plate.innerHTML = '<rect x="-100" y="-100" width="2120" height="1280" fill="#f7d35c"/>';   // en enda färg i stället för vägen
  // vägen längst ner: en grön vägren, vägen i ljus vaxkrita med grå kanter och streckad mittlinje (som vägen i avsnittet)
  document.querySelector('defs').insertAdjacentHTML('beforeend', `
    <filter id="vaxv" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in"/>
    </filter>`);
  const vag = el('g', {}, lager.plate);
  el('rect', { x: -20, y: 850, width: 1960, height: 260, fill: '#8cc95c' }, vag);
  el('rect', { x: -20, y: 850, width: 1960, height: 260, fill: '#acde7a', filter: 'url(#vaxv)' }, vag);
  el('rect', { x: -20, y: 885, width: 1960, height: 220, fill: '#f6f1e4' }, vag);
  for (const y of [885, 1068]) el('path', { d: `M-20 ${y} L1940 ${y + 4}`, stroke: '#8f8f8f', 'stroke-width': 8, 'stroke-linecap': 'round', filter: 'url(#vaxv)' }, vag);
  el('path', { d: 'M-20 980 L1940 984', stroke: '#9a9a9a', 'stroke-width': 12, 'stroke-dasharray': '70 55', 'stroke-linecap': 'round', filter: 'url(#vaxv)' }, vag);
  const buss = await kit.figur('bussen-tva-fonster');
  buss.pose({ x: 1370, y: 955, k: 1.35, tilt: -3, ogon: 'happy', mun: 0.5, delar: { 'del-1': 20, 'del-2': 20 } });

  // samma vaxkrita som introts titel
  document.querySelector('defs').insertAdjacentHTML('beforeend', `
    <filter id="vax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`);
  await document.fonts.load('600 100px Fredoka', 'Bussen hälsar på');
  const text = el('g', { transform: 'rotate(-3 470 625)' }, lager.overst);
  for (const [ord, x, y, storlek] of TITEL) {
    const attr = { x, y, 'text-anchor': 'middle', 'font-size': storlek, 'font-family': 'Fredoka', 'font-weight': 600 };
    el('text', { ...attr, fill: '#fff', stroke: '#fff', 'stroke-width': storlek * 0.16, 'stroke-linejoin': 'round' }, text).textContent = ord;
    el('text', { ...attr, fill: ROD }, el('g', { filter: 'url(#vax)' }, text)).textContent = ord;
  }
  // sökord: en gul "Barnsång"-lapp ovanför titeln och kanalnamnet under
  const lapp = el('g', { transform: 'translate(0 -70) rotate(-6 470 300)' }, lager.overst);
  el('rect', { x: 250, y: 228, width: 440, height: 136, rx: 68, fill: '#fff' }, lapp);
  el('rect', { x: 262, y: 240, width: 416, height: 112, rx: 56, fill: '#8fd3f4', filter: 'url(#vax)' }, lapp);
  el('text', { x: 470, y: 326, 'text-anchor': 'middle', 'font-size': window.EN ? 72 : 84, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#2a2516' }, lapp).textContent = window.EN ? 'Kids Song' : 'Barnsång';
  el('text', { x: 470, y: 790, 'text-anchor': 'middle', 'font-size': 76, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#2a2516', transform: 'rotate(-3 470 625)' }, lager.overst).textContent = window.EN ? 'tiny crayon tv' : 'lilla kritan';
  kit.kor(() => {}, 1 / 30);
}
bygg();
