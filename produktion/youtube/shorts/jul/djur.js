// Julkalenderns djurluckor: ett djur (v2-rigg) står i snön bakom luckan och gör en liten sak, medan berättaren pratar.
// En lucka är en index.html med bara djuret och scenen, bit för bit:
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script><script src="/produktion/youtube/shorts/jul/djur.js"></script>
//   julDjur.kor({ lucka: 2, figur: 'lammet-ludde', vinkArm: [38, 16], skala: 0.95,
//     scen: [[sekunder, rörelse, { sag: [[fil, text, vid]], ljud: [[namn, vid, variant]] }], ...] })
// Rörelser: stilla, vinka, hoppa (ett hopp), klappa, dansa, nicka, och för tittut med luckan: borta (luckan stängd) och
// glant (luckan på glänt, djuret kikar fram vid kanten). Varje bit blandas mjukt från den förra (0,4 s).
// Snön: snoar = det börjar snöa (flingorna faller från den biten och framåt) och djuret tittar upp; fanga = ett hopp där en
// stor snöflinga landar på nosen i hoppets topp (0,85 s in) och smälter efter landningen. nos: [x, y] i riggens 1024-ruta.
// sag: berättarens repliker, fil under assets/ljud/roster/ utan .m4a, vid = sekunder in i biten (rörelsen först, repliken
// 0,4–0,8 s in). ljud: effekter ur assets/ljud/effekter/<namn>/<namn>-<variant>.m4a. Saknade filer är tysta i renderingen.
// Förhandsvisning: http://127.0.0.1:8765/<mapp>/ (python3 -m http.server 8765 i repots rot). Rendering:
//   node avsnitt/004-bussen-badar/scener/render.mjs <mapp> --staende
window.julDjur = (() => {
const kl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), mjuk = k => k * k * (3 - 2 * k), lerp = (a, b, k) => a + (b - a) * k;
const MARK = 1400, BAD = 'assets/ljud/musik/gissa-bad.m4a';   // fötterna (ovanför YouTubes knappar) och musiken under, samma som i Gissa
const STANGD = { borta: 1, glant: 0.78 };   // hur stängd luckan är i tittut-bitarna

async function kor(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const render = new URLSearchParams(location.search).has('staende'), SK = g.skala ?? 0.95;
  document.head.insertAdjacentHTML('beforeend', `<style>
    html,body{margin:0;height:100%;background:#2b2724;font:15px/1.4 system-ui,sans-serif;color:#eee}
    body{display:flex;gap:24px;align-items:center;justify-content:center}
    svg{height:${render ? '100vh' : '96vh'};aspect-ratio:9/16;display:block} button{font:inherit;padding:8px 14px;cursor:pointer}</style>`);
  // snön ritas i kod: ljusblå himmel, en vit kulle och några stilla flingor (samma platser varje gång)
  const flingor = Array.from({ length: 16 }, (_, i) => `<circle class="flinga" cx="${(i * 397 + 90) % 1080}" cy="${(i * 263 + 140) % 1150}" r="${10 + i % 3 * 4}" fill="#fff"/>`).join('');
  // den stora flingan som fångas: sex armar med en liten hake, vit krita med ljusblå kant så att den syns mot både himmel och snö
  const arm = [0, 60, 120, 180, 240, 300].map(a => `<path transform="rotate(${a})" d="M0 0 L0 -46 M-13 -36 L0 -25 L13 -36"/>`).join('');
  const storFlinga = `<g id="stor-flinga" opacity="0" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g stroke="#8FBBDA" stroke-width="17">${arm}</g><g stroke="#fff" stroke-width="9">${arm}</g></g>`;
  document.body.innerHTML = `<svg viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"><defs>
      <filter id="boil" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920">
        <feTurbulence id="boil-brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
        <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
    <rect width="1080" height="1920" fill="#CFE3F0"/>
    <g filter="url(#lucka-vax)">${flingor}<ellipse cx="540" cy="1990" rx="1000" ry="720" fill="#fff"/></g>
    <g filter="url(#boil)" id="djur"></g>${storFlinga}</svg>`;
  const svg = document.querySelector('svg'), F = await v2rigg(g.figur), fig = F.figur(540, MARK, SK, svg.querySelector('#djur'));
  const K = await lucka.bygg(svg, g.lucka, g.pekare ? { pekare: g.pekare } : {}), blinka = skapaBlinka(11);

  // rörelserna: tl = sekunder in i biten → [ansikte, pose]
  const P = o => ({ ...F.POSE0, ...o }), glad = F.blanda('neutral', 'glad', 1), [va, vs] = g.vinkArm ?? [92, 12];
  const ror = (namn, tl) => { const [f, p] = F.ROR[namn](tl); return [{ ...f, armar: F.NEUTRAL.armar }, p]; };   // rörelsen styr armarna själv
  const ROR = {
    stilla: () => [glad, P()], borta: () => [glad, P()],
    glant: () => [F.blanda('glad', 'fnissig', 1), P({ x: 290 / SK, luta: 7 })],   // kikar fram vid luckans kant
    vinka: (tl, d) => { const upp = mjuk(kl(Math.min(tl / 0.4, (d - tl) / 0.4)));
      return [F.blanda('glad', 'jatteglad', 0.4 * upp), P({ armar: [0, upp * (va + vs * Math.sin(tl * 13))], luta: Math.sin(tl * 7) * 2 * upp })]; },
    hoppa: tl => ror('hoppa', Math.min(tl, 2.39)),   // ett hopp, sedan står den still
    klappa: tl => ror('klappa', tl), dansa: tl => ror('dansa', tl),
    nicka: tl => F.nicka(glad, P(), tl),
    snoar: tl => { const k = mjuk(kl(tl / 0.5)); return [{ ...F.blanda('glad', 'forvanad', k), titt: [0, -8 * k] }, P({ strack: 0.02 * k })]; },   // tittar upp
    fanga: tl => ror('hoppa', Math.min(tl, 2.39)),
  };
  // bitarnas tider: den första börjar när luckan öppnas, så att djuret redan rör sig när det syns
  let t = K.oppnar + 0.1;
  const BITAR = g.scen.map(([d, typ, x = {}]) => { const b = { t0: t, d, typ, fn: ROR[typ], ...x }; t += d; return b; });
  for (const b of BITAR) if (!b.fn) throw new Error(`rörelsen "${b.typ}" finns inte i djur.js`);
  const DURATION = K.slut(t), SNO = BITAR.find(b => b.typ === 'snoar')?.t0, FL = [...svg.querySelectorAll('.flinga')], stor = svg.querySelector('#stor-flinga');
  if (SNO !== undefined) FL.forEach(c => c.setAttribute('cy', -60));   // ingen snö i luften förrän det börjar snöa
  const lage = tt => {   // [ansikte, pose, luckans stängning, biten, sekunder in i den] vid tiden tt
    const i = Math.max(0, BITAR.findLastIndex(b => tt >= b.t0)), b = BITAR[i], tl = kl(tt - b.t0, 0, b.d), fore = BITAR[i - 1];
    let [f, p] = b.fn(tl, b.d);
    if (fore && tl < 0.4) { const [f0, p0] = fore.fn(fore.d, fore.d), k = mjuk(tl / 0.4); f = F.blanda(f0, f, k); p = F.blandaPose(p0, p, k); }
    const a = (1 - Math.cos(2 * Math.PI * tt / 3.6)) / 2;   // andas
    return [f, { ...p, strack: p.strack + 0.012 * a }, lerp(STANGD[fore?.typ] ?? 0, STANGD[b.typ] ?? 0, mjuk(kl(tl / 0.5))), b, tl];
  };
  function rita(tt) {
    const [f, p, stangd, b, tl] = lage(tt);
    F.rita(fig, blinka(f, tt), p);
    // snön faller lugnt bakom djuret (olika fart och lite sväng), från biten "snoar"
    if (SNO !== undefined) FL.forEach((c, i) => { const u = tt - SNO - i * 0.37 % 2.5;
      c.setAttribute('cy', u < 0 ? -60 : u * (110 + i % 4 * 25) % 1340 - 40); c.setAttribute('cx', (i * 397 + 90) % 1080 + 14 * Math.sin(tt * 0.9 + i)); });
    // den stora flingan: dalar mot nosen, sitter där från hoppets topp och smälter efter landningen
    const fangar = b.typ === 'fanga' && g.nos;
    stor.setAttribute('opacity', fangar ? Math.min(kl(tl / 0.15), 1 - kl((tl - 1.45) / 0.4)) : 0);
    if (fangar) {
      const nx = 540 + (g.nos[0] - 512 + p.x) * SK, ny = MARK + (g.nos[1] - F.FOTTER + p.lyft) * SK - 26, k = mjuk(kl(tl / 0.85));
      stor.setAttribute('transform', `translate(${nx + (70 + 12 * Math.sin(tl * 5)) * (1 - k)} ${lerp(-70, ny, k)}) rotate(${20 * (1 - k)}) scale(${1 - 0.5 * kl((tl - 1.45) / 0.4)})`);
    }
    svg.querySelector('#boil-brus').setAttribute('seed', 1 + Math.floor(tt * 8) % 4);
    K.rita(tt, tt < DURATION - 2.4 ? stangd : 0);
  }

  const eff = (n, k = 1) => `assets/ljud/effekter/${n}/${n}-${k}.m4a`;
  const ljud = [{ t: 0, fil: BAD, vol: 0.45, langd: DURATION, fade: 0.8 }, ...K.ljud(),
    ...BITAR.flatMap(b => [...(b.sag ?? []).map(([fil, tal, vid]) => ({ t: b.t0 + vid, fil: `assets/ljud/roster/${fil}.m4a`, vol: 2.5, tal })),
      ...(b.ljud ?? []).map(([n, vid, k]) => ({ t: b.t0 + vid, fil: eff(n, k), vol: 1.5 })),
      ...(STANGD[b.typ] === 1 && STANGD[BITAR[BITAR.indexOf(b) - 1]?.typ] !== 0.78 ? [{ t: b.t0, fil: eff('swoosh'), vol: 0.35 }] : [])])];
  await Promise.all(ljud.map(async c => { if (!(await fetch('/' + c.fil, { method: 'HEAD' }).catch(() => ({}))).ok) c.fil = null; }));
  window.LJUD = ljud.filter(c => c.fil);
  window.DURATION = DURATION;
  window.seek = window.render = rita;
  window.ready = true;   // render.mjs väntar på den
  rita(0);
  if (render) return;

  // förhandsvisningen: ▶ spelar med ljud och går runt; saknade repliker läses av talsyntesen
  document.body.insertAdjacentHTML('beforeend', '<aside><button id="spela">▶ Spela</button><div id="tid"></div></aside>');
  let start = null, senast = 0;
  const spela = c => { if (!c.fil) { if (c.tal) { const u = new SpeechSynthesisUtterance(c.tal); u.lang = 'sv-SE'; u.rate = 0.8; speechSynthesis.speak(u); } return; }
    const a = new Audio('/' + c.fil); a.volume = Math.min(1, c.vol * 0.4); a.play(); if (c.langd) setTimeout(() => a.pause(), c.langd * 1000); };
  const ruta = nu => {
    const tt = start === null ? senast : (nu - start) / 1000;
    if (start !== null) for (const c of ljud) if (c.t > senast - 1e-6 && c.t <= tt) spela(c);
    senast = tt; rita(Math.min(tt, DURATION));
    document.getElementById('tid').textContent = `${tt.toFixed(1)} / ${DURATION.toFixed(1)} s`;
    if (start !== null && tt >= DURATION) start = performance.now(), senast = -1e-3;
    requestAnimationFrame(ruta);
  };
  document.getElementById('spela').onclick = () => { start = performance.now(); senast = -1e-3; };
  window.hoppa = t => { senast = t; };   // granska en bildruta: hoppa(12)
  requestAnimationFrame(ruta);
}
return { kor };
})();
