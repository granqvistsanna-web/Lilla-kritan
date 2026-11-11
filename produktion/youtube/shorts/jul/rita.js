// Julkalenderns ritluckor: kritan ritar en liten saga bakom luckan, steg för steg, och suddgummit (kritans kompis, utan
// ansikte) hjälper till när något går på tok. En lucka är en index.html med bara stegen:
//   <script src="/produktion/youtube/shorts/gissa/gissa.js"></script>      (bara för gissa.spiral och gissa.FARG)
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script><script src="/produktion/youtube/shorts/jul/rita.js"></script>
//   julRita.kor({ lucka: 1, steg: [ ... ] })
// Stegen, i följd (alla kan ha sag: [[fil utan .m4a från repots rot, text, sekunder in i steget, { ss, langd, vol }?]];
// ss och langd spelar en bit av filen, t.ex. ett ord per sudd-drag, och vol lyfter en svag tagning; 2,5 om inget anges):
//   { rita: [[id, d, färg, bredd, sekunder, klipp?], ...], lager: 'bak' | 'mellan' | 'mitt' | 'fram' }   kritan ritar strecken (som i Gissa);
//     tackande: färg (eller true = streckets egen) lägger samma streck tätt under kritkornet, så att lagret täcker det som ligger bakom
//   { bild: 'sökväg.png', kontur: 'sökväg-kontur.json', plats: [x, y], skala, lager, sek: 3, paus, farg, bredd }   kritan ritar bildens
//     kontur i ett drag (konturfilens bana i bildens egna pixlar), och sedan fylls den riktiga bilden i inifrån (format/ritintro.md)
//   { vanta: sekunder }                                     paus, t.ex. medan barnet gissar
//   { pop: 'mitt' }                                         lagret poppar till när det får sitt namn
//   { sudda: 'fram', over: [x0, x1, y], hem: [x, y], in: sekunder }   suddgummit (lagret 'sudd', som kritan har ritat kring hem) skuttar
//     till linjen (0,9 s), väntar till in, suddar lagret i tre drag och skuttar hem igen
//   Alla steg kan också ha kansla: 'glad' | 'jatteglad' | 'forvanad' | 'arg' (ansiktet från och med steget, kanslaVid sekunder in), ror: 'dansa' | 'skaka'
//   (mittlagret rör sig under steget) och ljud: [[effekt, sekunder in, variant]].
// ansikte: { mitt: [x, y], fot: [x, y] } ger mittlagret ett ansikte i kod (visas från steget med ansikte: true) som följer lagret.
//   { tindra: 'mitt', mitt: [x, y], stralar: [r0, r1], ganger: 3 }   lagret tindrar, strålar blinkar runt mitten
//   { flyg: 'mitt', fran: [x, y], till: [x, y], skala, sek: 1.6 }   lagret flyger i en båge till en ny plats och blir kvar där, i ny storlek
//   { tack: true }                                          suddgummit skuttar två gånger och åker ut; kritan lyfter när sista strecket är ritat
// Rita konturen först och fyllningen sedan (klippt i konturen), som i format/ritintro.md.
// Teckningen ritas i en ruta på 1920×1080. Liggande är det vanliga; ?staende (render.mjs --staende) visar rutans mitt i 1080×1920.
// Förhandsvisning: http://127.0.0.1:8765/<mapp>/ (python3 -m http.server 8765 i repots rot). Rendering:
//   node avsnitt/004-bussen-badar/scener/render.mjs <mapp>      -> <mapp>/<namn>.mp4, stillbilder med tider efter mappen
window.julRita = (() => {
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
const kl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k, mjuk = k => k * k * (3 - 2 * k);
const del = ([a, b], t) => kl((t - a) / (b - a)), blanda = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
const TEMPO = 0.7, MELLAN = 0.12;   // strecken ritas på 70 % av sina sekunder, som i Gissa
const DRAG = 0.7;   // ett sudd-drag i sekunder: tre drag ryms i "Sudd, sudd, sudd!"
const VILA = [1700, 250], UT = [2100, 120], BAD = 'assets/ljud/musik/gissa-bad.m4a';   // där kritan väntar, vart den lyfter, musiken under
const effekt = (n, k = 1) => `assets/ljud/effekter/${n}/${n}-${k}.m4a`;
function streck(parent, d, farg, bredd) {   // som streck() i gissa.js
  const p = el('path', { d, fill: 'none', stroke: farg, 'stroke-width': bredd, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
  p.L = p.getTotalLength(); p.setAttribute('stroke-dasharray', `${p.L} ${p.L + 1}`);
  p.rita = k => { p.style.display = k > 0 ? '' : 'none'; p.setAttribute('stroke-dashoffset', (p.L * (1 - kl(k))).toFixed(1)); };
  p.spets = k => { const q = p.getPointAtLength(p.L * kl(k)); return [q.x, q.y]; };
  return p;
}

async function kor(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const STA = new URLSearchParams(location.search).has('staende'), render = navigator.webdriver, [VW, VH] = STA ? [1080, 1920] : [1920, 1080];
  document.head.insertAdjacentHTML('beforeend', `<style>
    html,body{margin:0;height:100%;background:#2b2724;font:15px/1.4 system-ui,sans-serif;color:#eee}
    body{display:flex;gap:24px;align-items:center;justify-content:center}
    svg{height:${render ? '100vh' : '96vh'};max-width:100vw;aspect-ratio:${VW}/${VH};display:block} button{font:inherit;padding:8px 14px;cursor:pointer}</style>`);
  const oga = (x, r) => `<g class="oga" transform="translate(${x} -22)"><ellipse rx="${r}" ry="${r * 1.45}" fill="#2a1d1a"/><circle cx="-5" cy="-9" r="5.5" fill="#fff"/></g>`;
  const linje = (d, b = 7) => `<path d="${d}" fill="none" stroke="#2a1d1a" stroke-width="${b}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const ansikte = ([x, y]) => `<g id="ansikte" transform="translate(${x} ${y})" style="display:none">
    <g class="kinder"><ellipse cx="-88" cy="24" rx="26" ry="16" fill="#F08A8F"/><ellipse cx="88" cy="24" rx="26" ry="16" fill="#F08A8F"/></g>
    <g class="k-glad">${oga(-54, 15)}${oga(54, 15)}${linje('M-26 26 Q0 50 26 26')}</g>
    <g class="k-jatteglad">${linje('M-74 -14 Q-54 -40 -34 -14', 8)}${linje('M34 -14 Q54 -40 74 -14', 8)}<path d="M-30 20 Q0 74 30 20 Z" fill="#7a2a1c" stroke="#2a1d1a" stroke-width="5" stroke-linejoin="round"/></g>
    <g class="k-forvanad">${oga(-54, 17)}${oga(54, 17)}${linje('M-74 -62 Q-54 -74 -34 -62', 6)}${linje('M34 -62 Q54 -74 74 -62', 6)}<ellipse cy="40" rx="12" ry="15" fill="#7a2a1c"/></g>
    <g class="k-arg">${oga(-54, 14)}${oga(54, 14)}${linje('M-86 -62 L-30 -40', 11)}${linje('M86 -62 L30 -40', 11)}${linje('M-24 46 Q0 24 24 46')}
      <ellipse cx="-88" cy="24" rx="30" ry="19" fill="#E5574F"/><ellipse cx="88" cy="24" rx="30" ry="19" fill="#E5574F"/></g></g>`;
  const F = gissa.FARG, lagren = ['bak', 'mellan', 'mitt', 'fram', 'sudd'], LINJE = '#2a1d1a', A = g.ansikte;
  document.body.innerHTML = `<svg viewBox="0 0 ${VW} ${VH}" xmlns="${NS}"><defs>${lucka.vax('rita-vax', -60, -60, 2040, 1200)}
      <filter id="boil" filterUnits="userSpaceOnUse" x="-60" y="-60" width="2040" height="1200">
        <feTurbulence id="boil-brus" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1"/>
        <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>
      <path id="krita-form" d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z"/></defs>
    <rect width="${VW}" height="${VH}" fill="#FBF7EE"/>
    <g ${STA ? 'transform="translate(540 760) scale(0.75) translate(-960 -540)"' : ''}>
      <g filter="url(#boil)">${lagren.map(n => `<g id="lager-${n}"><g class="bas"></g><g class="bild"></g><g class="korn" filter="url(#rita-vax)"></g>${n === 'mitt' && A ? ansikte(A.mitt) : ''}</g>${n === 'mitt' ? '<g id="stralar" opacity="0"></g>' : ''}`).join('')}
        <g id="smulor"></g></g>
      <g id="krita" filter="url(#boil)"><g><use href="#krita-form" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>
        <g filter="url(#rita-vax)"><use class="farg" href="#krita-form"/><path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="#fff" opacity=".35"/></g></g></g>
    </g></svg>`;
  const svg = document.querySelector('svg'), $ = id => svg.querySelector('#' + id), defs = svg.querySelector('defs');
  const K = await lucka.bygg(svg, g.lucka, g.pekare ? { pekare: g.pekare } : {});
  // bilderna och deras konturer läses in först, så att allt finns när renderingen börjar
  const ladda = fil => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = '/' + fil; });
  const BILDER = await Promise.all(g.steg.map(async s => s.bild ? { bild: await ladda(s.bild), kontur: await (await fetch('/' + s.kontur)).json() } : null));
  const langder = await Promise.all(g.steg.map(s => Promise.all((s.sag ?? []).map(([fil]) => lucka.langd(fil + '.m4a', 1.6)))));

  // strecken läggs i sina lager (ytor som klipps först, konturen överst, som i Gissa) och stegen får sina tider
  const S = [], klipp = {}, klippBas = {};
  let t = K.oppen + 0.2;
  const STEG = g.steg.map((s, i) => {
    const b = { ...s, t0: t };
    let d = s.vanta ?? (s.pop ? 1.0 : s.sudda ? (s.in ?? 0.9) + 3 * DRAG + 0.5 : s.tindra ? (s.ganger ?? 3) * 1.2 : s.tack ? 2.4 : s.flyg ? (s.sek ?? 1.6) + 0.5 : 0);
    const B = BILDER[i], ritas = s.rita ?? (B && [['kontur' + i, B.kontur.d, s.farg ?? F.svart, s.bredd ?? 12, s.sek ?? 3]]);
    if (ritas) {
      const hela = $('lager-' + (s.lager ?? 'mitt')), lager = hela.querySelector('.korn'), bas = hela.querySelector('.bas');
      let mal = lager, tr = null;
      if (B) {   // bilden och dess kontur ligger på samma plats; bilden klipps av en cirkel som växer från mitten
        const [x, y] = s.plats, w = B.bild.naturalWidth, h = B.bild.naturalHeight, bb = B.kontur.bbox, [mx, my] = B.kontur.mitt ?? [bb[0] + bb[2] / 2, bb[1] + bb[3] / 2];
        const lage = `translate(${x} ${y}) scale(${s.skala})`; tr = [x, y, s.skala]; mal = el('g', { transform: lage }, lager);
        b.cirkel = el('circle', { cx: mx, cy: my, r: 0 }, el('clipPath', { id: 'b-' + i }, defs)); b.radie = Math.hypot(Math.max(mx, w - mx), Math.max(my, h - my));
        el('image', { href: '/' + s.bild, width: w, height: h, 'clip-path': `url(#b-${i})` }, el('g', { transform: lage }, hela.querySelector('.bild')));
      }
      for (const id of new Set(ritas.map(r => r[5]).filter(id => id && !klipp[id]))) {   // konturen får ritas i ett senare steg
        el('path', { d: g.steg.flatMap(x => x.rita ?? []).find(r => r[0] === id)[1] }, el('clipPath', { id: 'k-' + id }, defs));
        klipp[id] = el('g', { 'clip-path': `url(#k-${id})` }, lager); klippBas[id] = el('g', { 'clip-path': `url(#k-${id})` }, bas);
      }
      let u = t + 0.5;   // kritan hinner dit
      for (const [id, dd, farg, bredd, sek, k] of ritas) { S.push({ id, farg, tr, a: u, b: u + sek * TEMPO, p: streck(k ? klipp[k] : mal, dd, farg, tr ? bredd / tr[2] : bredd), tat: s.tackande && streck(k ? klippBas[k] : bas, dd, s.tackande === true ? farg : s.tackande, bredd) }); u += sek * TEMPO + MELLAN; }
      d = u - t + 0.2;
      if (B) { const p = s.paus ?? 0; b.fyll = [u + p, u + p + 1.2]; b.kontur = S.at(-1); d += p + 1.3; }   // (paus: barnet gissar) bilden fylls i och konturen tonar bort
    }
    (s.sag ?? []).forEach(([, , vid, o = {}], j) => { d = Math.max(d, vid + (o.langd ?? langder[i][j]) + 0.35); });
    b.d = d; t += d; return b;
  });
  for (const x of S) if (klipp[x.id]) x.p.parentNode.appendChild(x.p);   // konturerna överst, också när fyllningen ritas i ett senare steg
  const DURATION = K.slut(t), KRITA_IN = K.oppnar + 0.3, steg = n => STEG.find(s => s[n]), SUDD = steg('sudda'), TACK = steg('tack'), FLYG = steg('flyg');
  for (const s of STEG.filter(s => s.tindra).slice(0, 1)) $('stralar').insertAdjacentHTML('beforeend', Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 + 0.39, [x, y] = s.mitt, [r0, r1] = s.stralar;
    return `<path d="M${x + r0 * Math.cos(a)} ${y + r0 * Math.sin(a)} L${x + r1 * Math.cos(a)} ${y + r1 * Math.sin(a)}" stroke="#FFE27A" stroke-width="22" stroke-linecap="round"/>`; }).join(''));

  // kritan: följer strecket, lyfter till nästa, och väntar uppe till höger när det dröjer mer än en sekund
  const sp = (s, k) => { const q = s.p.spets(k); return s.tr ? [s.tr[0] + q[0] * s.tr[2], s.tr[1] + q[1] * s.tr[2]] : q; };
  function kritan(tt) {
    const i = S.findIndex(s => tt < s.b), nu = S[i], fore = S[i - 1] ?? S.at(i < 0 ? -1 : 0);
    if (i === 0 && tt < nu.a) { const [x, y] = sp(nu, 0); return { p: [x, y - 10 * Math.sin(tt * 4)], sk: tt > KRITA_IN ? 1 - Math.exp(-7 * (tt - KRITA_IN) / 0.5) * Math.cos(16 * (tt - KRITA_IN) / 0.5) : 0, farg: nu.farg }; }
    if (nu && tt >= nu.a) { const p = sp(nu, mjuk(del([nu.a, nu.b], tt))); return { p: [p[0], p[1] + Math.sin(tt * 107) * 1.2], farg: nu.farg }; }
    const slut = sp(fore, 1), vila = [VILA[0], VILA[1] + Math.sin(tt * 3.7) * 7];
    if (nu && nu.a - fore.b < 1) { const k = mjuk(del([fore.b, nu.a], tt)), q = blanda(slut, sp(nu, 0), k); return { p: [q[0], q[1] - 50 * Math.sin(Math.PI * k)], farg: nu.farg }; }
    if (nu && tt > nu.a - 0.6) return { p: blanda(vila, sp(nu, 0), mjuk(del([nu.a - 0.6, nu.a], tt))), farg: nu.farg };
    const tu = TACK ? Math.max(TACK.t0 + 1.2, S.at(-1).b + 0.6) : 1e9, ut = mjuk(del([tu, tu + 0.9], tt));   // lyfter efter tacket, men inte förrän allt är ritat
    return { p: blanda(blanda(slut, vila, mjuk(del([fore.b, fore.b + 0.7], tt))), UT, ut), sk: ut < 1 ? 1 : 0, farg: fore.farg };
  }
  // suddgummit: kritan har ritat det kring SUDD.hem. Det skuttar till linjen, väntar, gör tre drag fram och tillbaka (lagret
  // bleknar en tredjedel per drag), skuttar hem igen, och på tacket två små skutt och ut åt höger. Svaret är hur långt från hem.
  const IN = SUDD?.in ?? 0.9;   // när dragen börjar
  function suddet(tt) {
    if (!SUDD || tt < SUDD.t0) return null;
    const [x0, x1, y] = SUDD.over, hem = SUDD.hem, u = tt - SUDD.t0 - IN, n = Math.floor(u / DRAG);
    const bage = (a, b, k, h) => { const q = blanda(a, b, mjuk(k)); return [q[0], q[1] - h * Math.sin(Math.PI * k)]; };
    if (u < 0) { const k = kl((tt - SUDD.t0) / 0.9); return { p: k < 1 ? bage(hem, [x0, y], k, 150) : [x0, y + 8 * Math.sin(tt * 4)], drag: 0 }; }
    if (n < 3) { const k = mjuk(u / DRAG - n), fram = n % 2 === 0; return { p: [lerp(fram ? x0 : x1, fram ? x1 : x0, k), y + 26 * Math.sin(k * Math.PI * 3)], drag: n + k, gnid: Math.sin(k * Math.PI * 6) * 5 }; }
    const q = bage([x1, y], hem, kl((u - 3 * DRAG) / 0.7), 150), tk = TACK ? tt - TACK.t0 : -1;
    if (tk < 0) return { p: q, drag: 3 };
    return { p: [q[0] + 1100 * mjuk(kl((tk - 1.1) / 1.0)), q[1] - (tk < 1 ? 46 * Math.abs(Math.sin(tk * Math.PI * 2)) : 0)], drag: 3 };
  }
  // ansiktet: ett helt uttryck i taget (halvblandade ögon blir grumliga). Känslan byts vid stegets början (+ kanslaVid), och
  // bytet göms i en snabb hopknipning (0,08 s åt vardera hållet); blinkar var 3,2:e sekund, men inte precis vid ett byte
  const KANSLOR = ['glad', 'jatteglad', 'forvanad', 'arg'], VISA = STEG.find(s => s.ansikte), BYTEN = STEG.filter(s => s.kansla).map(s => [s.t0 + (s.kanslaVid ?? 0), s.kansla]);
  function ansiktet(tt) {
    const an = $('ansikte'); if (!an) return;
    const tv = VISA ? tt - VISA.t0 : -1; an.style.display = tv > 0 ? '' : 'none'; if (tv <= 0) return;
    const [x, y] = A.mitt, in_ = 1 - Math.exp(-7 * tv / 0.4) * Math.cos(16 * tv / 0.4), nu = BYTEN.filter(([c]) => c <= tt).at(-1)?.[1] ?? 'glad';
    const nara = Math.min(9, ...BYTEN.map(([c]) => Math.abs(tt - c))), knip = nara < 0.08 ? 0.35 + 0.65 * mjuk(nara / 0.08) : 1;
    an.setAttribute('transform', `translate(${x} ${y}) scale(${in_} ${in_ * knip})`);
    for (const n of KANSLOR) an.querySelector('.k-' + n).setAttribute('opacity', n === nu ? 1 : 0);
    an.querySelector('.kinder').setAttribute('opacity', nu === 'arg' ? 0 : 1);
    const blink = nara > 0.6 && (tt + 0.9) % 3.2 < 0.12 ? 0.1 : 1;
    for (const o of an.querySelectorAll('.oga')) o.setAttribute('transform', `translate(${o.getAttribute('transform').match(/-?[\d.]+/)[0]} -22) scale(1 ${blink})`);
  }

  function rita(tt) {
    for (const s of S) { const k = mjuk(del([s.a, s.b], tt)); s.p.rita(k); s.tat && s.tat.rita(k); }
    const flytt = Object.fromEntries(lagren.map(n => [n, []])), kring = ([x, y], t) => `translate(${x} ${y}) ${t} translate(${-x} ${-y})`;
    for (const n of lagren) $('lager-' + n).setAttribute('opacity', 1);
    let stral = 0;
    for (const s of STEG) {
      if (s.fyll) { s.cirkel.setAttribute('r', (s.radie * mjuk(del(s.fyll, tt))).toFixed(1)); s.kontur.p.setAttribute('opacity', (1 - mjuk(del([s.fyll[0] + 0.5, s.fyll[1]], tt))).toFixed(3)); }
      const tl = tt - s.t0, inne = tl > 0 && tl < s.d, kant = mjuk(kl(Math.min(tl, s.d - tl) / 0.3));
      if (s.pop && tl > 0) flytt[s.pop].push(kring(s.mitt, `scale(${1 + 0.1 * Math.sin(Math.PI * kl(tl / 0.5))})`));
      if (s.tindra) { const u = kl(tl / s.d) * (s.ganger ?? 3), puls = inne ? Math.sin(Math.PI * (u % 1)) ** 2 : 0;
        if (puls) flytt[s.tindra].push(kring(s.mitt, `scale(${1 + 0.08 * puls})`));
        stral = Math.max(stral, puls); }
      // dansa: vaggar kring foten och skuttar i takt (1 s per vagg); skaka: två korta sura ruskningar och lite uppblåst
      if (inne && s.ror === 'dansa') flytt.mitt.push(`translate(0 ${(-34 * Math.abs(Math.sin(Math.PI * tl)) * kant).toFixed(1)})`, kring(A.fot, `rotate(${(9 * Math.sin(Math.PI * tl) * kant).toFixed(2)})`));
      if (inne && s.ror === 'skaka') { const rusk = Math.max(Math.sin(Math.PI * kl((tl - 0.2) / 0.7)), Math.sin(Math.PI * kl((tl - 1.6) / 0.7)));
        flytt.mitt.push(`translate(${(9 * Math.sin(tl * 26) * rusk).toFixed(1)} 0)`, kring(A.mitt, `scale(${1 + 0.04 * kant})`)); }
    }
    if (A && VISA && tt > VISA.t0) flytt.mitt.push(kring(A.fot, `rotate(${(1.5 * Math.sin(tt * 1.3)).toFixed(2)})`));   // står aldrig helt still
    $('stralar').setAttribute('opacity', stral.toFixed(3));
    // flyg: lagret (och strålarna) flyttas i en båge till sin nya plats och stannar där; allt annat räknas kring den gamla platsen
    if (FLYG && tt > FLYG.t0) { const k = mjuk(kl((tt - FLYG.t0 - 0.2) / (FLYG.sek ?? 1.6))), [x0, y0] = FLYG.fran, [x1, y1] = FLYG.till;
      const fl = `translate(${((x1 - x0) * k).toFixed(1)} ${((y1 - y0) * k - (FLYG.hojd ?? 140) * Math.sin(Math.PI * k)).toFixed(1)}) ${kring(FLYG.fran, `scale(${lerp(1, FLYG.skala ?? 1, k).toFixed(3)})`)}`;
      flytt[FLYG.flyg].unshift(fl); $('stralar').setAttribute('transform', fl); } else $('stralar').removeAttribute('transform');
    const sd = suddet(tt);
    if (sd) {
      const [hx, hy] = SUDD.hem;
      flytt.sudd.push(`translate(${(sd.p[0] - hx).toFixed(1)} ${(sd.p[1] - hy).toFixed(1)})`, kring(SUDD.hem, `rotate(${sd.gnid ?? 0})`));
      $('lager-' + SUDD.sudda).setAttribute('opacity', (1 - sd.drag / 3).toFixed(3));
      // smulor: några korn i lagrets färg faller från suddet under varje drag
      const u = tt - SUDD.t0 - IN, [x0, x1, y] = SUDD.over;
      $('smulor').innerHTML = u < 0 ? '' : Array.from({ length: 18 }, (_, j) => { const fodd = j * 3 * DRAG / 18, a = u - fodd, n = Math.floor(fodd / DRAG), k = fodd / DRAG - n;
        return a < 0 || a > 0.7 ? '' : `<circle cx="${lerp(n % 2 ? x1 : x0, n % 2 ? x0 : x1, k) + (j % 3 - 1) * 30 + 40 * a}" cy="${y + 60 + 900 * a * a}" r="${9 + j % 3 * 3}" fill="${SUDD.smula ?? '#fff'}" opacity="${1 - a / 0.7}"/>`; }).join('');
    }
    for (const n of lagren) $('lager-' + n).setAttribute('transform', flytt[n].join(' '));
    ansiktet(tt);
    const k = kritan(tt), kg = $('krita');
    kg.style.display = k.sk === 0 || tt < KRITA_IN ? 'none' : '';
    kg.querySelector('.farg').setAttribute('fill', k.farg === F.svart ? '#3B3431' : k.farg);
    kg.firstChild.setAttribute('transform', `translate(${k.p[0].toFixed(1)} ${k.p[1].toFixed(1)}) rotate(38) scale(${0.8 * (k.sk ?? 1)})`);
    svg.querySelector('#boil-brus').setAttribute('seed', 1 + Math.floor(tt * 8) % 4);
    K.rita(tt);
  }

  const ljud = [{ t: 0, fil: BAD, vol: 0.5, langd: DURATION, fade: 0.8 }, ...K.ljud(), { t: KRITA_IN + 0.05, fil: effekt('pop'), vol: 0.6 },
    ...S.map(s => ({ t: s.a, fil: effekt('krita-ritar', 3), loop: true, langd: s.b - s.a, vol: 8, fade: 0.15 })),   // ritintrots lugna krita; skrrrrt-lang hördes inte
    ...STEG.flatMap(s => [...(s.sag ?? []).map(([fil, tal, vid, o = {}]) => ({ t: s.t0 + vid, fil: fil + '.m4a', vol: o.vol ?? 2.5, tal, ...(o.ss != null && { ss: o.ss }), ...(o.langd != null && { langd: o.langd, fade: 0.04 }) })),
      ...(s.fyll ? [{ t: s.fyll[0], fil: effekt('glimt'), vol: 6 }] : []),
      ...(s.pop ? [{ t: s.t0, fil: effekt('pop'), vol: 1 }, { t: s.t0 + 0.1, fil: effekt('pling'), vol: 2 }] : []),
      ...(s.ljud ?? []).map(([n, vid, k]) => ({ t: s.t0 + vid, fil: effekt(n, k), vol: 1.3 })),
      ...(s.sudda ? [{ t: s.t0 + 0.05, fil: effekt('hopp-mjuk', 3), vol: 1.2 }, ...[0, 1, 2].map(i => ({ t: s.t0 + IN + i * DRAG, fil: effekt('skrubb', i % 2 + 1), vol: 2.5, langd: DRAG, fade: 0.1 }))] : []),
      ...(s.tindra ? Array.from({ length: s.ganger ?? 3 }, (_, i) => ({ t: s.t0 + (i + 0.3) * s.d / (s.ganger ?? 3), fil: effekt('glitter'), vol: 1.2 })) : []),
      ...(s.flyg ? [{ t: s.t0 + 0.2, fil: effekt('swoosh'), vol: 1.2 }, { t: s.t0 + 0.2 + (s.sek ?? 1.6), fil: effekt('pling'), vol: 2 }] : []),
      ...(s.tack ? [0, 0.5].map(v => ({ t: s.t0 + v + 0.2, fil: effekt('hopp-mjuk', v ? 2 : 1), vol: 1.2 })) : [])])];
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
    const a = new Audio('/' + c.fil); a.currentTime = c.ss ?? 0; a.volume = Math.min(1, c.vol * 0.4); a.loop = !!c.loop; a.play(); if (c.langd) setTimeout(() => a.pause(), c.langd * 1000); };
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
