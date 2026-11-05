// Gissa teckningen: motorn för Shorts-serien (skill: gissa-teckningen, regler: format/shorts.md).
// Kritan ritar en sak streck för streck, frågar "Vad kan det vara?", väntar 4 s och sedan kommer svaret, ett riktigt läte
// och namnet en gång till. 9:16, 1080×1920. Krita, vaxfilter och streck() kommer från 006:s kritan-ritar, kanten från
// verktyg/kant.js. Varje Short är en index.html med bara teckningen och orden:
//   <script src="/produktion/youtube/shorts/gissa/gissa.js"></script>
//   <script src="/verktyg/kant.js"></script>
//   <script>gissa.kor({ svar: 'En ko!', namn: 'Det är en ko.', lat: 'mu', fragaFore: 'huvud', streck: [...] })</script>
// Förhandsvisning: http://127.0.0.1:8765/<mapp>/ (python3 -m http.server 8765 i repots rot). Rendering:
//   node avsnitt/004-bussen-badar/scener/render.mjs <mapp> --staende   -> <mapp>/<namn>-staende.mp4
window.kit = window.kit || {};   // kant.js kopplar in sig i kit.figur/kit.kor; Shortsen använder inte kit.js
(() => {
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const del = ([a, b], t) => clamp((t - a) / (b - a));
const inUt = k => k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
const pop = tau => tau <= 0 ? 0 : 1 - Math.exp(-7 * tau) * Math.cos(16 * tau);

// kritfärgerna ur stil/stilguide.md
const FARG = { svart: '#2A2421', rosa: '#F4B6B0', gul: '#F6C531', rod: '#E5302A', gron: '#3FA34D', bla: '#4696D2', orange: '#F38A34', brun: '#A8784E', gra: '#7A7D84' };

function spiral(cx, cy, r, varv = 2.4, n = 120) {   // fyller en rund fläck inifrån och ut, som en krita gör
  let d = '';
  for (let i = 0; i <= n; i++) {
    const u = i / n, th = varv * 2 * Math.PI * u, rr = r * (0.08 + 0.92 * u) * (1 + 0.06 * Math.sin(3 * th));
    d += (i ? 'L' : 'M') + (cx + rr * Math.cos(th)).toFixed(1) + ' ' + (cy + rr * Math.sin(th)).toFixed(1);
  }
  return d;
}
function sick(x0, x1, y0, y1, steg = 24) {   // fyller en yta med sicksack fram och tillbaka (klipp den med klipp: '<id>')
  let d = `M${x0} ${y0}`;
  for (let x = x0, upp = false; x < x1; x += steg, upp = !upp) d += ` L${x + steg / 2} ${upp ? y0 : y1}`;
  return d;
}
function streck(parent, d, farg, bredd) {   // som streck() i 006:s kritan-ritar
  const p = el('path', { d, fill: 'none', stroke: farg, 'stroke-width': bredd, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
  p.L = p.getTotalLength(); p.setAttribute('stroke-dasharray', `${p.L} ${p.L + 1}`);
  p.rita = k => { p.style.display = k > 0 ? '' : 'none'; p.setAttribute('stroke-dashoffset', (p.L * (1 - clamp(k))).toFixed(1)); };
  p.spets = k => { const q = p.getPointAtLength(p.L * clamp(k)); return [q.x, q.y]; };
  return p;
}

const DEFS = `
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
  <filter id="boil" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence id="boil-brus" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1"/>
    <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <path id="krita-form" d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z"/>`;

const PAUS_MELLAN = 0.12, PAUS = 4;   // pausen efter frågan: regel 4 i format/regler.md (4–5 s)
const ROST = 'assets/ljud/roster';      // delade repliker, t.ex. vad-kan-det-vara.m4a
const BAD = 'assets/ljud/musik/gissa-bad.m4a';   // musiken under, samma i alla
const effekt = n => `assets/ljud/effekter/${n}/${n}-1.m4a`;

// g: { svar, namn, lat (effektmapp, t.ex. 'mu'), latText (talsyntes i förhandsvisningen), fragaFore (strecket som frågan
//      kommer före), mitt ([x, y] i teckningens ruta), skala, streck: [[id, d, färg, bredd, sekunder, klipp?], ...],
//      liv: { typ: 'ga' | 'kor', riktning (1 = åt höger, dit saken tittar), ben: [[par A], [par B]], hjul: [id, ...],
//             ljud (effektmapp), sek, vagga (grader åt sidorna per steg i ga, 1,5 om inget anges) },
//      bild: { fil, x, y, skala, radie, hjul: [[fil, [x, y]], ...] } – på svaret blir teckningen en urklippt kritbild (fil i
//             1024-rutan, lagd på x, y i teckningens ruta i skala); hjulen rullar kring sina vridpunkter (radie i bildens px) }
async function kor(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const render = new URLSearchParams(location.search).has('staende');   // render.mjs --staende lägger till ?staende
  const mapp = decodeURIComponent(location.pathname).replace(/^\//, '').replace(/index\.html$/, '');
  document.documentElement.lang = 'sv';
  document.head.insertAdjacentHTML('beforeend', `<style>
    html,body{margin:0;height:100%;background:#2b2724;font:15px/1.4 system-ui,sans-serif;color:#eee}
    body{display:flex;gap:24px;align-items:center;justify-content:center}
    svg{height:${render ? '100vh' : '96vh'};aspect-ratio:9/16;display:block}
    aside{width:260px} button{font:inherit;padding:8px 14px;margin:0 6px 8px 0;cursor:pointer}
    #tid{font-variant-numeric:tabular-nums} .zon{display:none} .visa-zon .zon{display:block}</style>`);
  document.body.innerHTML = `<svg viewBox="0 0 1080 1920" xmlns="${NS}"><defs>${DEFS}</defs>
    <rect width="1080" height="1920" fill="#FBF7EE"/><rect width="1080" height="1920" filter="url(#korn)"/>
    <g transform="translate(540 860) scale(${g.skala ?? 1.2}) translate(${-(g.mitt ?? [603, 950])[0]} ${-(g.mitt ?? [603, 950])[1]})">
      <g filter="url(#boil)"><g id="ritning"></g></g><g filter="url(#boil)"><g id="krita"></g></g></g>
    <g class="zon"><rect y="1440" width="1080" height="480" fill="#e5302a" opacity=".12"/>
      <line x1="0" x2="1080" y1="1440" y2="1440" stroke="#e5302a" stroke-width="3" stroke-dasharray="14 10"/></g></svg>`;
  const defs = document.querySelector('defs'), ritning = document.getElementById('ritning'), kritaG = document.getElementById('krita');
  const S = g.streck, id0 = S[0][0], sist = S.at(-1)[0];
  // kor-banan: [sekunder, dx (dit den kör), ljud?, 'hopp'?] i följd; dx över ca 1000 är ut till höger, under ca -900 in
  // från vänster, så att den kan köra runt utan att vända. Ett steg med 0 sekunder flyttar den direkt.
  const BANA = [];
  for (const [sek, dx, ljud, hopp] of g.liv?.bana ?? []) {
    const t0 = BANA.at(-1)?.t1 ?? 0;
    BANA.push({ t0, t1: t0 + sek, dx0: BANA.at(-1)?.dx ?? 0, dx, ljud, hopp });
  }

  // tider: strecken i följd, frågan strax före fragaFore, sedan pausen, svaret och namnet medan saken står still, och sist
  // lätet: teckningen blir levande och lämnar bilden (liv), så att papperet är tomt och Shorten går runt
  const T = {};
  let t = 0.5;
  for (const s of S) { T[s[0]] = [t, t + s[4]]; t += s[4] + PAUS_MELLAN; }
  T.fraga = T[g.fragaFore][0] - 0.2;
  T.klar = T[sist][1];
  T.svar = T.klar + 0.3 + PAUS;
  T.namn = T.svar + 1.5;
  T.lat = T.namn + 1.8;
  T.liv = [T.lat + 0.5, T.lat + 0.5 + (BANA.at(-1)?.t1 ?? g.liv?.sek ?? 3.5)];
  T.ut = g.liv ? [T.liv[1], T.liv[1]] : [T.lat + 1.5, T.lat + 2.5];   // utan liv tonar teckningen bort
  const DURATION = T.ut[1] + 0.5;

  // ritningen: ytor som klipps (klipp: '<id>') läggs först, så att konturen hamnar ovanpå sin fyllnad
  const vax = el('g', { filter: 'url(#vax)' }, ritning), klipp = {};
  for (const id of new Set(S.map(s => s[5]).filter(Boolean))) {
    el('path', { d: S.find(s => s[0] === id)[1] }, el('clipPath', { id: 'k-' + id }, defs));
    klipp[id] = el('g', { 'clip-path': `url(#k-${id})` }, vax);
  }
  const drag = {};
  for (const [id, d, farg, bredd, , k] of S) drag[id] = streck(k ? klipp[k] : vax, d, farg, bredd);
  for (const id in klipp) vax.appendChild(drag[id]);   // konturerna överst
  // bilden teckningen blir på svaret: kropp och hjul, laddade innan render.mjs börjar
  const B = g.bild, bildG = B && el('g', { opacity: 0, transform: `translate(${B.x} ${B.y}) scale(${B.skala})` }, ritning);
  const bildHjul = (B?.hjul ?? []).map(([fil, p]) => [p, fil]);
  for (const [, fil] of [[0, B?.fil], ...bildHjul].filter(([, f]) => f)) {
    await new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = '/' + fil; });
    const im = el('image', { href: '/' + fil, width: 1024, height: 1024 }, bildG);
    if (fil !== B.fil) bildHjul.find(h => h[1] === fil).push(im);
  }
  const kantG = kant.lagg(ritning, { andel: 0.025 }), KANT = kantG.getAttribute('filter');   // ritat i kod; 0,025 (inte 0,01) så att kanten syns på det ljusa papperet i 9:16
  kritaG.innerHTML = `<g><use href="#krita-form" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>
    <g filter="url(#vax)"><use class="farg" href="#krita-form"/>
    <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="#fff" opacity=".35"/></g></g>`;
  const kritfarg = f => f === FARG.svart ? '#3B3431' : f;
  const VANTA = [930, 560], UT = [1250, 300];

  function kritan(t) {
    const i = S.findIndex(s => t < T[s[0]][1]);
    if (t < T[id0][0]) return { p: drag[id0].spets(0), syns: t > 0.05, sk: pop(t / 0.5), farg: S[0][2] };
    if (i >= 0) {
      const [id, , farg] = S[i], [a, b] = T[id];
      if (t >= a) { const p = drag[id].spets(inUt(del([a, b], t))); return { p: [p[0], p[1] + Math.sin(t * 107) * 1.2], farg }; }
      const q = drag[S[i - 1][0]].spets(1), r = drag[id].spets(0), k = inUt(del([T[S[i - 1][0]][1], a], t));   // lyfter till nästa streck
      return { p: [lerp(q[0], r[0], k), lerp(q[1], r[1], k) - 50 * Math.sin(Math.PI * k)], farg };
    }
    // gissningspausen: kritan väntar uppe till höger och gungar lugnt, och efter namnet lyfter den ut (före livet)
    const slut = drag[sist].spets(1), k = inUt(del([T.klar, T.klar + 0.8], t)), u = inUt(del([T.namn + 0.3, T.lat], t)) ** 1.6;
    const vila = [lerp(slut[0], VANTA[0], k), lerp(slut[1], VANTA[1], k) + Math.sin(t * 3.7) * 7 * k];
    return { p: [lerp(vila[0], UT[0], u), lerp(vila[1], UT[1], u)], syns: u < 1, farg: S.at(-1)[2] };
  }

  // livet: en enkel rörelse som passar saken, bara åt det håll den redan tittar (urklipp vänds aldrig och snurrar inte).
  // ga: går ut ur bild med lugna steg; benparen (liv.ben) svänger växelvis kring sin topp.
  function liv(t) {
    const L = g.liv, k = del(T.liv, t), r = L?.riktning ?? 1;
    if (!L || k <= 0) return { dx: 0, dy: 0, vrid: 0, ben: 0 };
    if (L.typ === 'ga') {
      const fas = (t - T.liv[0]) * 2.4 * Math.PI, start = clamp(k / 0.15);   // ca 2,4 steg i sekunden, mjuk start
      return { dx: r * 950 * (k < 0.2 ? k * k / 0.4 : k - 0.1) / 0.9, dy: -9 * Math.abs(Math.sin(fas)) * start,
        vrid: (L.vagga ?? 1.5) * Math.sin(fas) * start, ben: 12 * Math.sin(fas) * start };
    }
    // kor: kör iväg, långsamt först och sedan fortare, med små skumpningar; hjulen (liv.hjul) rullar med vägen
    if (L.typ === 'kor') {
      const tt = t - T.liv[0], b = BANA.find(b => tt < b.t1) ?? BANA.at(-1), kb = inUt(del([b.t0, b.t1], tt));
      const dx = r * lerp(b.dx0, b.dx, kb), rullar = b.dx !== b.dx0 && kb < 1;
      const dy = (rullar ? -4 * Math.abs(Math.sin(tt * 9)) : 0) - (b.hopp ? 34 * Math.sin(Math.PI * del([0.4, 0.6], kb)) : 0);
      return { dx, dy, vrid: 0, ben: 0, rull: dx / 58 * 180 / Math.PI };
    }
    throw new Error(`liv.typ "${L.typ}" finns inte än; se gissa-teckningen/SKILL.md`);
  }

  function rita(t) {
    for (const [id] of S) drag[id].rita(inUt(del(T[id], t)));
    // svaret: teckningen poppar och får den vita kanten; på lätet ett litet hopp, sedan blir den levande
    const p = t > T.svar ? 1 + 0.08 * Math.sin(Math.PI * clamp((t - T.svar) / 0.5)) : 1;
    const hopp = -28 * Math.sin(Math.PI * del([T.lat, T.lat + 0.45], t)), [mx, my] = g.mitt ?? [603, 950], L = liv(t);
    t >= T.svar ? kantG.setAttribute('filter', KANT) : kantG.removeAttribute('filter');
    ritning.setAttribute('transform', `translate(${mx + L.dx} ${my + 290 + hopp + L.dy}) rotate(${L.vrid}) scale(${p}) translate(${-mx} ${-my - 290})`);
    (g.liv?.ben ?? []).forEach((par, i) => par.forEach(id => {
      const [x, y] = drag[id].spets(0);
      drag[id].setAttribute('transform', `rotate(${(i ? -L.ben : L.ben).toFixed(2)} ${x} ${y})`);
    }));
    for (const id of g.liv?.hjul ?? []) {   // spiralerna börjar i mitten, så spets(0) är navet
      const [x, y] = drag[id].spets(0);
      drag[id].setAttribute('transform', `rotate(${(L.rull ?? 0).toFixed(1)} ${x} ${y})`);
    }
    if (B) {   // på svaret tonar teckningen över i bilden, mitt i poppen
      const b = del([T.svar, T.svar + 0.35], t);
      vax.style.opacity = 1 - b; bildG.setAttribute('opacity', b);
      for (const [[x, y], , im] of bildHjul) im.setAttribute('transform', `rotate(${(L.dx / B.radie * 180 / Math.PI).toFixed(1)} ${x} ${y})`);
    }
    ritning.style.opacity = 1 - del(T.ut, t);
    const k = kritan(t);
    kritaG.style.display = k.syns === false ? 'none' : '';
    kritaG.querySelector('.farg').setAttribute('fill', kritfarg(k.farg));
    kritaG.firstChild.setAttribute('transform', `translate(${k.p[0].toFixed(1)} ${k.p[1].toFixed(1)}) rotate(38) scale(${0.8 * (k.sk ?? 1)})`);
    document.getElementById('boil-brus').setAttribute('seed', 1 + Math.floor(t * 8) % 4);
    kant.uppdatera();
  }

  // ljud, i render.mjs format (t, fil från repots rot, vol × 0,4, loop, langd, fade); ss = var i filen den börjar.
  // Musiken sänks under pausen så att barnet hör tystnaden. Filer som saknas hoppas över; i förhandsvisningen läser
  // talsyntesen repliken i stället.
  const ljud = [
    { t: 0, fil: BAD, vol: 1.5, langd: T.klar + 0.3, fade: 0.4 },
    { t: T.klar + 0.3, ss: T.klar + 0.3, fil: BAD, vol: 0.45, langd: PAUS, fade: 0.3, fadeIn: 0.3 },
    { t: T.svar, ss: T.svar, fil: BAD, vol: 1.5, langd: DURATION - T.svar, fade: 0.8, fadeIn: 0.3 },
    { t: 0.05, fil: effekt('pop'), vol: 0.6 },
    ...S.map(s => ({ t: T[s[0]][0], fil: effekt('skrrrrt-lang'), loop: true, langd: s[4], vol: 4, fade: 0.1 })),
    { t: T.fraga, fil: `${ROST}/vad-kan-det-vara.m4a`, vol: 2.5, tal: 'Vad kan det vara?' },
    { t: T.svar, fil: effekt('pop'), vol: 0.7 }, { t: T.svar + 0.1, fil: effekt('pling'), vol: 0.5 },
    { t: T.svar, fil: `${mapp}svar.m4a`, vol: 2.5, tal: g.svar },
    { t: T.namn, fil: `${mapp}namn.m4a`, vol: 2.5, tal: g.namn },
    { t: T.lat, fil: effekt(g.lat), vol: 1.5, tal: g.latText },
    ...(g.liv?.ljud ? [{ t: T.liv[0], fil: effekt(g.liv.ljud), loop: true, langd: T.liv[1] - T.liv[0], vol: 1.5, fade: 0.6 }] : []),
    ...BANA.filter(b => b.ljud).map(b => ({ t: T.liv[0] + (b.hopp ? (b.t0 + b.t1) / 2 : b.t0), fil: effekt(b.ljud), vol: 1.5 })),
  ];
  await Promise.all(ljud.map(async c => { if (!(await fetch('/' + c.fil, { method: 'HEAD' }).catch(() => ({}))).ok) c.fil = null; }));
  window.LJUD = ljud.filter(c => c.fil);
  window.DURATION = DURATION;
  window.seek = rita;
  window.render = rita;
  window.ready = true;   // render.mjs väntar på den
  if (render) { rita(0); return; }

  // ---------- förhandsvisningen ----------
  document.body.insertAdjacentHTML('beforeend', `<aside><button id="spela">▶ Spela</button><button id="om">↺ Om</button>
    <div id="tid"></div><p id="fas"></p><label><input type="checkbox" id="zon"> visa YouTube-zonen</label>
    <p style="opacity:.7">Saknade ljudfiler läses av talsyntesen.</p></aside>`);
  const sag = text => { const u = new SpeechSynthesisUtterance(text); u.lang = 'sv-SE'; u.rate = 0.8; speechSynthesis.speak(u); };
  const spela = c => {
    if (!c.fil) return c.tal && sag(c.tal);
    const a = new Audio('/' + c.fil); a.currentTime = c.ss ?? 0; a.volume = Math.min(1, c.vol * 0.4); a.loop = !!c.loop; a.play();
    if (c.langd) setTimeout(() => a.pause(), c.langd * 1000);
  };
  const FASER = [[T[id0][0], 'Kritan ritar (ledtrådar)'], [T.fraga, '"Vad kan det vara?"'], [T.klar, `Paus ${PAUS} s – barnet gissar`],
    [T.svar, `Svaret: "${g.svar}"`], [T.namn, 'Namnet igen, lugnt'], [T.lat, 'Lätet'], [T.liv[0], 'Den blir levande'],
    [T.ut[1], 'Tomt papper (går runt)']];
  let start = null, senast = 0;
  const ruta = nu => {
    const tt = start === null ? senast : (nu - start) / 1000;
    if (start !== null) for (const c of ljud) if (c.t > senast - 1e-6 && c.t <= tt && (c.fil || c.tal)) spela(c);
    senast = tt;
    rita(Math.min(tt, DURATION));
    document.getElementById('tid').textContent = `${tt.toFixed(1)} / ${DURATION.toFixed(1)} s`;
    document.getElementById('fas').textContent = (FASER.filter(([a]) => tt >= a).at(-1) || [0, ''])[1];
    if (start !== null && tt >= DURATION) start = performance.now(), senast = -1e-3;   // går runt, som en Short
    requestAnimationFrame(ruta);
  };
  document.getElementById('spela').onclick = () => { start = performance.now() - senast * 1000; };
  document.getElementById('om').onclick = () => { speechSynthesis.cancel(); start = performance.now(); senast = -1e-3; };
  document.getElementById('zon').onchange = e => document.body.classList.toggle('visa-zon', e.target.checked);
  window.hoppa = t => { senast = t; };   // för att granska en bildruta: hoppa(12)
  requestAnimationFrame(ruta);
}

window.gissa = { kor, spiral, sick, FARG };
})();
