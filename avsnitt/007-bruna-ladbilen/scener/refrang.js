// Refrängen i 007 (05a–h, 09a–h), likadan båda gångerna, efter den nya bildplanen ../refrang-plan.md (2026-11-05): en idé per rad,
// ett klipp eller en tydlig kamerarörelse per rad, kameran följer lastbilen. Läses in efter kit.js, ansikten.js, kritsvep.js och
// lastbilen.js. Tiderna ur storyboarden (M.bild) och rader.txt (M.rad), takten ur kit.BEAT.
//   a  "Brun, brun, brun! (Brun, brun, brun!)"   vägen, lastbilen stor i mitten: björnstampet, och på varje "brun" poppar ett brunt
//                                                tassavtryck upp på vägen (tre bakom, tre framför på ekot); kameran knuffar in per stamp
//   b  "Lastbil, lastbil – (brum, brum!)"        kritsvep till kanelbullsberget: lastbilen kör redan på vänster tredjedel, bullen till
//                                                höger, kameran följer med; stora puffar och ett skutt per "brum"
//   c  "Upp på stora kullen, (upp, upp!)"        kameran följer uppför bullens sida, vita pilar upp poppar på "upp", ett hopp per "upp"
//   d  "Nerför sidan, vii!"                      vänta ett halvt slag på toppen, sedan sus nerför med fartstreck, armarna upp (ratten
//                                                kvar); kameran landar med lastbilen vid bullens fot på höger tredjedel
//   e  "Kolasås och choklad – (mums, mums!)"     kameran drar ut: hela bullen och båda flaskorna; kola på "Kolasås", choklad på
//                                                "choklad", flaskorna guppar på "mums, mums" och glider upp, Bulle slickar sig om munnen
//   f  "Allt är brunt – hurra!"                  samma vida bild, himlen glöder, bruna stjärnor och hjärtan poppar från bullens topp,
//                                                armarna upp på "hurra"; kameran går långsamt in
//   g  "Tut, tut, tut, tut –"                    närbild på ratten: tassen trycker på tutknappen fyra gånger, en vit ljudring per tut,
//                                                kaninen tittar fram
//   h  "vad är brunt? Titta ut!"                 kritsvep till vägen, närbild på Bulle: tassen som skärm över ögonen, tittar åt vänster,
//                                                sedan åt höger, kameran glider med blicken
// Lastbilen kör alltid åt höger och vänds aldrig; på berget lutar den efter backen (hjulen på ytan, bergPose). Ratten syns alltid.
// Pyntet (tassavtryck, pilar, fartstreck, stjärnor och hjärtan, ljudringar) är klistermärken i kod med vit kant (verktyg/kant.js).
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, bil)                        // L = kit.duk(...) (scenens vägplatta), bil = scenens lastbil (lastbilen.ny)
//   r.rita(t)                                   // null utanför refrängen, annars bildens bokstav. Poserar lastbilen, kameran och
//                                               // kritsvepen själv; scenen döljer sina egna saker (granen, buskar i figurlagret) då.
//                                               // r.rita nollställer kritsvepet: en scen med eget svep ritar det efter r.rita.
//   r.LJUD                                      // lagt med kit.ljud i bygg() (ljud.md)
(() => {
const { el, bild, mjuk, inUt, over, del, lerp, clamp, BEAT, W, H } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const KOLA = '#F2C06A',   // ljusare än KOLA i bygg.py (214, 150, 62), som annars försvinner mot bullen
      CHOKLAD = '#5C341C', HIMMEL = '#9BDFF6', VAG = '#A6D86B', BRUN = '#8B5A2B', BRUN2 = '#B07A45';
const SVEP = 0.6;   // kritsvepets fyllning (0 → 0,5) före bildgränsen; smulandet (0,5 → 0,8) lika länge efter
// flaskorna hela i bild i den vida bilden: 200 × 280, locket i y 24, pipen i y 224
const FLASKA = { w: 200, h: 280, y: 24, pip: 224 };
const FLASKOR = [{ fil: 'flaska-kola', x: 470, farg: KOLA }, { fil: 'flaska-choklad', x: 900, farg: CHOKLAD }];
const UPP = { r: [1500, -700], l: [-480, -700] }, NER = { r: [1300, 900], l: [-280, 900] };
const KANT = { r: [600, 760], l: [420, 760] };   // KANT: mot ratten
// bergets platta förlängs med speglad himmel åt vänster, höger och uppåt, så att kameran kan följa lastbilen utan att den skärs av
const UTE = { x0: -600, x1: W + 186, y0: -220 };
// tassavtrycken på vägen i a: tre bakom lastbilen (stampen), tre framför (ekot)
const AVTRYCK = [[110, 714], [195, 700], [280, 714], [1095, 700], [1180, 714], [1265, 700]];
const TASSD = '<ellipse cx="0" cy="12" rx="23" ry="19"/><circle cx="-21" cy="-12" r="8.5"/><circle cx="-7" cy="-23" r="9"/><circle cx="8" cy="-23" r="9"/><circle cx="22" cy="-12" r="8.5"/>';
const PILD = 'M0 -42 L30 -6 L12 -6 L12 36 L-12 36 L-12 -6 L-30 -6 Z';
const STJARNAD = r => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? 0.45 * r : r; d += `${i ? 'L' : 'M'}${(q * Math.cos(a)).toFixed(1)} ${(q * Math.sin(a)).toFixed(1)}`; } return d + 'Z'; };
const HJARTAD = r => `M0 ${0.9 * r} C${-1.4 * r} ${-0.1 * r} ${-0.7 * r} ${-1.1 * r} 0 ${-0.4 * r} C${0.7 * r} ${-1.1 * r} ${1.4 * r} ${-0.1 * r} 0 ${0.9 * r}Z`;
// stjärnorna och hjärtana i f: flyger från bullens topp till sina platser (x, y, stjärna?, storlek)
const GLITTER = [[470, 170, 1, 44], [590, 105, 0, 38], [720, 80, 1, 50], [850, 105, 0, 38], [970, 170, 1, 44], [1060, 250, 0, 32], [380, 250, 0, 32]];
const lagg = (g, andel = 0.01) => window.kant ? kant.lagg(g, { andel }) : g;

async function ny(M, n, S) {
  const T = {};
  'abcdefgh'.split('').forEach(k => { const [a, b] = M.bild(n + k); T[k] = [S(a), S(b)]; });
  // rader.txt ger radernas start i sångtid; orden inne i raderna läggs på slagen efter (uppskattat, inga stammar än)
  // raderna söks från refrängens början (sångtid), så att "Brum brum brum" i verserna (0:23.1, 1:18.0) inte räknas
  const efter = M.bild(n + 'a')[0] - M.av - 0.1, R = text => S(M.rad(text, { efter }).t + M.av);
  const slag = (s0, i) => s0 + i * BEAT;
  const B = M.matt.BERG, bergY = x => { if (x <= B[0][0]) return B[0][1]; for (let i = 1; i < B.length; i++) if (x <= B[i][0]) return lerp(B[i - 1][1], B[i][1], (x - B[i - 1][0]) / (B[i][0] - B[i - 1][0])); return B.at(-1)[1]; };
  // tagning 2 (rader.txt 2026-11-05): orden inne i raderna på slag och halvslag efter radens start, efter sångens åttondelar
  // (librosa-ansatserna ligger på halvslagen): "Brun, brun, brun!" på halvslag, ekot ett slag senare; "(brum, brum!)",
  // "(upp, upp!)" och "(mums, mums!)" ett slag isär; "Tut, tut, tut, tut" på halvslag
  const H2 = BEAT / 2, vii = M.rad('vii', { efter });
  const ord = {
    stamp: [0, 1, 2, 4, 5, 6].map(i => R('Brun brun brun') + i * H2),
    brum: [0, 1].map(i => slag(R('brum brum'), i)),
    kulle: R('Upp på stora backen'),
    upp: [0, 1].map(i => slag(R('upp upp'), i)),
    vii: S(vii.t + M.av) + (/^vii/i.test(vii.text) ? 0 : 2 * BEAT),   // "nerför sidan – vii!" (refräng 1) eller egen rad "vii!" (refräng 2)
    kola: R('Kolasås'), choklad: slag(R('Kolasås'), 2), mums: R('mums mums'),
    hurra: slag(R('allt är brunt'), 3),
    tut: [0, 1, 2, 3].map(i => R('Tut tut tut tut') + i * H2),
    titta: R('Titta ut'),
  };
  ord.pilar = [ord.kulle + BEAT, ...ord.upp];   // en pil på "backen" och en per "upp"
  const r = { T, ord, LJUD: [] };
  let bil, berg, glod, sas, flaskor = [], DANS, BERG_H, avtryck = [], pilar = [], fart, glitter = [], ringar = [], ringG, pyntA;

  // lastbilen på berget vid x (mitten): hjulen på ytan (bergets kant + 14, som på_berget(), eller marken H − 4), lutad efter dem
  const yta = x => Math.min(H - 4, bergY(x) + 14);
  function bergPose(x, h = BERG_H) {
    const s = h / (bil.BB[3] - bil.BB[1]), mitt = (bil.BB[0] + bil.BB[2]) / 2, [hb, hf] = M.matt.HJUL.map(p => (p[0] - mitt) * s);
    const yb = yta(x + hb), yf = yta(x + hf), luta = Math.atan2(yf - yb, hf - hb);
    // lutningen högst 38° (bullens fot är nästan lodrät), och från toppen ner till höger landar den platt på marken framför bullen
    // vid x 1140, som på_berget(c, 1140, …) i bygg.py
    const tilt = clamp(luta * 180 / Math.PI, -38, 38), plan = mjuk(del(1060, 1140, x));
    return { x, y: lerp(yb - hb * Math.tan(tilt * Math.PI / 180), H - 4, plan), tilt: tilt * (1 - plan), h };
  }
  // vägen: rullar redan in i b (platt mark till vänster om bullen), uppför i c, ett halvt slag på toppen, sus nerför i d och
  // landar vid foten till höger. Raka stycken, utjämnade över 0,5 s så att farten aldrig rycker.
  const VAG_X = () => [[T.b[0] - 1, -260], [T.c[0], 105], [T.d[0] - 0.1, 680], [T.d[0] + 0.4, 720], [T.d[0] + 0.55, 735], [T.e[0] + 0.3, 1140]];
  function bilX0(t) {
    const P = VAG_X();
    if (t <= P[0][0]) return P[0][1];
    for (let i = 1; i < P.length; i++) if (t <= P[i][0]) return lerp(P[i - 1][1], P[i][1], del(P[i - 1][0], P[i][0], t));
    return P.at(-1)[1];
  }
  const bilX = t => { let s = 0; for (let i = 0; i <= 8; i++) s += bilX0(t + (i / 8 - 0.5) * 0.5); return s / 9; };

  r.bygg = async (L, lastbil) => {
    bil = lastbil;
    DANS = { x: M.matt.DANS[0], y: M.matt.DANS[1], h: M.matt.DANS[2] }; BERG_H = M.matt.BERG_H;
    const defs = L.plate.ownerSVGElement.querySelector('defs');
    // berget ligger överst i plattan (täcker vägen) och syns b–g; glöden ovanpå (f), såsen och flaskorna i figurlagret bakom lastbilen.
    // Utanför plattan: himlen speglad (x −600–0 i tre remsor av plattans vänstra 200 px, där bullen inte når, x W–W+186 av den högra,
    // y −220–0 av överkanten)
    berg = el('g', {}, L.plate);
    const bit = (x0, x1, y0, y1, tr) => {
      const id = `bergut${n}${x0}${y0}`.replace(/-/g, 'm');
      el('rect', { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }, el('clipPath', { id }, defs));
      bild(`${LAGER}berget.png`, el('g', { transform: tr }, el('g', { 'clip-path': `url(#${id})` }, berg)), { width: W, height: H, preserveAspectRatio: 'none' });
    };
    const kolumner = [[-600, -400, 'translate(-400 0) scale(-1 1)'], [-400, -200, 'translate(-400 0)'], [-200, 0, 'scale(-1 1)'], [0, W, ''], [W, W + 186, `translate(${2 * W} 0) scale(-1 1)`]];
    for (const [x0, x1, tr] of kolumner) {
      if (tr) bit(x0, x1, 0, H, tr);
      bit(x0, x1, -220, 0, `${tr} scale(1 -1)`);
    }
    bild(`${LAGER}berget.png`, berg, { width: W, height: H, preserveAspectRatio: 'none' });
    glod = bild(`${LAGER}berget-glod.png`, berg, { width: W, height: H, preserveAspectRatio: 'none', opacity: 0 });
    // a: tassavtrycken på vägen (i plattan, under lastbilen)
    pyntA = el('g', { filter: 'url(#boil)' }, L.plate);
    avtryck = AVTRYCK.map(([x, y], i) => { const g = el('g', {}, pyntA), inre = el('g', { fill: BRUN }, g); inre.innerHTML = TASSD; lagg(g); return { g, x, y, rot: i % 2 ? 8 : -8 }; });
    const fg = el('g', {}, L.figurer);
    L.figurer.insertBefore(fg, L.figurer.firstChild);
    sas = el('g', { filter: 'url(#kritkant)' }, fg);
    // kolarinneln och droppar (kolasås() i bygg.py) och chokladranden; ritas fram från flaskans stråle åt båda hållen
    let d = ''; for (let x = 300; x <= 1104; x += 12) d += `${d ? 'L' : 'M'}${x} ${(bergY(x) + 18).toFixed(1)}`;
    const kola = el('g', {}, sas);
    const kolaLinje = el('path', { d, fill: 'none', stroke: KOLA, 'stroke-width': 34, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, kola);
    const droppar = [[380, 90], [520, 140], [700, 70], [860, 120], [1000, 80]].map(([x, l]) => {
      const y = bergY(x) + 18;
      return el('path', { d: `M${x} ${y} L${x} ${y + l}`, stroke: KOLA, 'stroke-width': 26, 'stroke-linecap': 'round', fill: 'none' }, kola);
    });
    d = ''; for (let x = 330; x <= 1086; x += 12) d += `${d ? 'L' : 'M'}${x} ${(bergY(x) + 110 + 10 * Math.sin(x / 40)).toFixed(1)}`;
    const choklad = el('path', { d, fill: 'none', stroke: CHOKLAD, 'stroke-width': 26, 'stroke-linecap': 'round' }, sas);
    r.sas = { kolaLinje, droppar, choklad, kola };
    for (const f of FLASKOR) {
      const g = el('g', {}, fg), sk = el('g', {}, g);
      const stråle = el('path', { fill: 'none', stroke: f.farg, 'stroke-width': 24, 'stroke-linecap': 'round', filter: 'url(#kritkant)' }, g);
      let sd = ''; for (let y = FLASKA.pip - 6; y <= bergY(f.x) + 30; y += 8) sd += `${sd ? 'L' : 'M'}${(f.x + 12 * Math.sin(y / 30)).toFixed(1)} ${y}`;
      stråle.setAttribute('d', sd); stråle.L = stråle.getTotalLength();
      g.insertBefore(stråle, sk);   // strålen bakom flaskan
      lagg(bild(`${LAGER}${f.fil}.png`, sk, { x: f.x - FLASKA.w / 2, y: FLASKA.y, width: FLASKA.w, height: FLASKA.h }));
      flaskor.push({ ...f, g, sk, stråle });
    }
    // d: fartstrecken bakom lastbilen (i fg, bakom den)
    fart = [0, 1, 2].map(() => el('path', { fill: 'none', stroke: '#fff', 'stroke-width': 11, 'stroke-linecap': 'round', filter: 'url(#boil)' }, fg));
    // pyntet framför: pilarna (c), stjärnorna och hjärtana (f), ljudringarna (g)
    const pg = el('g', { filter: 'url(#boil)' }, L.figurer);
    pilar = ord.pilar.map(() => { const g = el('g', {}, pg); el('path', { d: PILD, fill: '#fff', stroke: '#9CC3D2', 'stroke-width': 5, 'stroke-linejoin': 'round' }, g); return g; });
    glitter = GLITTER.map(([x, y, stj, rr], i) => { const g = el('g', {}, pg); el('path', { d: stj ? STJARNAD(rr) : HJARTAD(rr), fill: i % 2 ? BRUN2 : BRUN }, g); lagg(g); return { g, x, y }; });
    ringG = el('g', {}, L.figurer);
    ringar = ord.tut.map(() => el('circle', { fill: 'none', stroke: '#fff', 'stroke-width': 5 }, ringG));
    kit.lager.overst.setAttribute('transform', `translate(${-0.06 * W} ${-0.06 * H}) scale(${1.12 * W / 1920})`);   // kritsvep.js ritar i 1920 × 1080
    // ljud (ljud.md): lågt och i luckorna, sången först
    const LJ = (namn, t, o) => { kit.ljud(namn, t, o); r.LJUD.push(namn); };
    ord.stamp.forEach(x => { LJ('duns', x, { vol: 0.25, langd: 0.4 }); LJ('pop', x + 0.04, { vol: 0.2 }); });
    for (const g0 of [T.b[0], T.h[0]]) kritsvep.LJUD.filter(k => k < 0.5).forEach((k, i) => LJ('skrrrrt-kort', g0 - SVEP + k / 0.5 * SVEP, { variant: i % 4 + 1, vol: 0.5 }));
    ord.brum.forEach(x => LJ('brum', x - 0.03, { vol: 0.2, langd: 0.35, fade: 0.15 }));
    LJ('swoosh', T.b[0] - 0.25, { vol: 0.15 });   // kritsvepet till bullen
    lastbilen.ljud([...ord.stamp, ...ord.brum, ...ord.pilar]);   // hjul-gnissel och kaninens pip (lastbilen.js)
    ord.pilar.forEach(x => LJ('boing', x, { vol: 0.15 }));
    LJ('ooh', T.d[0] + 0.1, { vol: 0.15 });
    LJ('wiii', ord.vii, { vol: 0.25 });   // lyssna först: om Suno redan har en visselpipa här, ta bort den här raden (ljud.md)
    LJ('swoosh', T.d[0] + 0.45, { vol: 0.2 });   // fartstrecken
    LJ('swoosh', T.e[0] + 0.1, { vol: 0.15 });   // flaskorna kommer ner
    for (const x of [ord.kola, ord.choklad]) { LJ('pschhh', x + 0.15, { vol: 0.3, langd: 0.6 }); LJ('slurp', x + 0.45, { vol: 0.25 }); }   // reserv för klick-spruta (saknas)
    LJ('mums', ord.mums, { vol: 0.25 });
    LJ('glitter', ord.hurra - 0.1, { vol: 0.25 });
    LJ('tuta-tut', ord.tut[0] - 0.03, { vol: 0.3, langd: 1.2, fade: 0.3 });
    ord.tut.forEach(x => LJ('ding', x + 0.05, { vol: 0.12 }));
  };

  // armarna: glider mellan lägena med litet överslag, i stället för att hoppa. Ett läge utan arm för en sida (null eller saknas)
  // = tassen på ratten (lastbilen.js): armen glider då från/till KANT och göms när den är framme.
  const armar = (fran, till, q) => {
    const p = {};
    for (const s of 'rl') {
      const a = fran?.[s], b = till?.[s];
      if ((!a && q < 0.03) || (!b && q > 0.97)) continue;
      const A = a || KANT[s], Bb = b || KANT[s]; p[s] = [lerp(A[0], Bb[0], q), lerp(A[1], Bb[1], q)];
    }
    return p;
  };
  const pulser = (t, tider, langd = 0.45) => tider.reduce((m, x) => Math.max(m, Math.sin(Math.PI * clamp((t - x + 0.08) / langd))), 0);
  const pop = (t, a, len = 0.3) => t < a ? 0 : over(del(a, a + len, t));
  const sticker = (g, x, y, s, rot = 0) => { g.style.display = s > 0.001 ? '' : 'none'; g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${Math.max(0.001, s).toFixed(3)})`); };
  // kameran på berget: följer lastbilen, inom den förlängda himlen (kit.kamera fri)
  const kamFri = (cx, cy, z) => {
    const hw = W / 2 / (z * 1.012) + 8, hh = H / 2 / (z * 1.012) + 6;
    kit.kamera(clamp(cx, UTE.x0 + hw, UTE.x1 - hw), clamp(cy, UTE.y0 + hh, H - hh), z, true);
  };
  function kamBerg(t) {
    const x = bilX(t), bp = bergPose(x), z = lerp(1.15, 1.2, mjuk(del(T.c[0] - 0.6, T.c[0] + 0.6, t)));
    // lastbilen på vänster tredjedel (b), strax vänster om mitten (c, uppför), på höger tredjedel när den landat (slutet av d)
    const fram = lerp(lerp(W / 6, 0.1 * W, mjuk(del(T.c[0] - 0.6, T.c[0] + 0.6, t))), -W / 6, mjuk(del(T.d[0] + 0.4, T.e[0] + 0.3, t))) / z;
    return [x + fram, bp.y - 0.5 * BERG_H * Math.cos(bp.tilt * Math.PI / 180), z];
  }

  r.rita = t => {
    const id = 'abcdefgh'.split('').find(k => t >= T[k][0] && t < T[k][1]);
    // kritsvepen: fyller bilden de sista SVEP s före b och h och smular bort lika länge efter
    // (alltid ett anrop per bildruta: k 0 döljer svepet, så att det inte blir kvar när render.mjs hoppar i tiden)
    const svep = [[T.b[0], HIMMEL], [T.h[0], VAG]].find(([g0]) => t >= g0 - SVEP && t < g0 + SVEP);
    if (svep) { const [g0, farg] = svep; kritsvep(t < g0 ? 0.5 * del(g0 - SVEP, g0, t) : 0.5 + 0.3 * del(g0, g0 + SVEP, t), farg); }
    else kritsvep(0, HIMMEL);
    const iBerg = t >= T.b[0] && t < T.h[0];
    berg.style.display = iBerg ? '' : 'none';
    sas.parentNode.style.display = iBerg ? '' : 'none';
    // pyntet syns bara i sin bild
    pyntA.style.display = t >= T.a[0] && t < T.b[0] ? '' : 'none';
    avtryck.forEach((a, i) => sticker(a.g, a.x, a.y, pop(t, ord.stamp[i]) * 1.15, a.rot));
    pilar.forEach(g => (g.style.display = 'none'));
    glitter.forEach(g => (g.g.style.display = 'none'));
    fart.forEach(p => (p.style.display = 'none'));
    ringar.forEach(c => (c.style.display = 'none'));
    if (!id) return null;
    const nu = kit.nu, fas = (nu - kit.BEAT0) / BEAT;
    if (!iBerg) {
      // a: vägen, lastbilen stor i mitten, björnstampet; h: närbild, Bulle spanar åt vänster och sedan åt höger
      let p = { ...DANS, humor: 'ropar', m: 1 }, kanin = 0, dy = 0;
      if (id === 'a') {
        const stamp = ord.stamp.map(x => kit.hopp(t, x, x + 0.3, 18, 0.08, 0.15));
        dy = stamp.reduce((a, h) => a + h.y, 0);
        kanin = -dy * 0.6 + 6 * pulser(t, ord.stamp.map(x => x + 0.15), 0.4);
        const ner = pulser(t, ord.stamp, 0.3);
        Object.assign(p, armar(UPP, NER, 0.4 + 0.6 * ner), { tilt: 1.2 * Math.sin(Math.PI * fas / 2) });
      } else {
        const k = mjuk(del(ord.titta - 0.3, ord.titta + 0.4, t)), sk = mjuk(del(T.h[0] + 0.2, T.h[0] + 0.7, t));
        Object.assign(p, { humor: 'nyfiken', titt: lerp(-1, 1, k), m: 0, rot: lerp(4, -4, k), ...armar(null, { r: [640, 300] }, sk) });   // högra tassen som skärm ovanför ögonen
        dy = -3 * Math.abs(Math.sin(Math.PI * fas));
        kanin = 3 * Math.abs(Math.sin(Math.PI * fas));
      }
      bil.pose({ ...p, y: p.y + dy, kanin, dist: nu * 120 });
      bil.puffa(t, ord.stamp);
      if (id === 'h') {   // närbild: Bulles ögon strax ovanför mitten, kameran glider åt det håll han tittar
        const s = DANS.h / (bil.BB[3] - bil.BB[1]), hh = 700 * M.matt.BULLE[0] * s, [ex, ey] = bil.punkt([511, 400]);
        const k = mjuk(del(ord.titta - 0.3, ord.titta + 0.4, t));
        kit.kamera(ex + lerp(-0.12, 0.12, k) * hh, ey + hh * (0.5 - 0.42), H / hh);
      } else {
        const knuff = pulser(t, ord.stamp, 0.35);
        kit.kamera(W / 2, H / 2 + 20 * knuff, 1 + 0.035 * knuff);
      }
      return id;
    }
    // b–g: berget
    const x = bilX(t), bp = bergPose(x), brum = ord.brum.map(a => kit.hopp(t, a, a + 0.3, 12, 0.08, 0.15));
    const tutH = ord.tut.map(a => kit.hopp(t, a, a + 0.25, 5, 0.06, 0.12)), uppH = ord.pilar.map(a => kit.hopp(t, a, a + 0.32, 16, 0.08, 0.15));
    const hopp = [...brum, ...tutH, ...uppH].reduce((a, h) => a + h.y, 0);
    let p = { humor: 'skrattar' };
    const upp = pulser(t, ord.upp, 0.5), vii = mjuk(del(T.d[0] + 0.4, T.d[0] + 0.65, t)) * mjuk(del(T.e[0] + 0.5, T.e[0] + 0.1, t));
    const hurra = mjuk(del(ord.hurra - 0.2, ord.hurra + 0.2, t)) * mjuk(del(T.g[0] + 0.1, T.g[0] - 0.3, t));
    if (id === 'b') p = { humor: 'skrattar', tut: pulser(t, ord.brum, 0.4) };
    if (id === 'c') p = { humor: 'ropar', m: 1, ...armar(null, UPP, upp) };
    if (id === 'd') p = { humor: t < T.d[0] + 0.4 ? 'forvanad' : 'ropar', m: 1, ...armar(null, UPP, vii) };
    if (id === 'e') p = { humor: t > ord.mums - 0.1 ? 'slickar' : 'njuter', ...armar(null, UPP, vii) };
    if (id === 'f') p = { humor: 'ropar', m: 1, ...armar(null, UPP, hurra) };
    if (id === 'g') { const tr = pulser(t, ord.tut, 0.35); p = { humor: 'skrattar', tryck: tr, tut: tr }; }
    const kaninG = id === 'g' ? 10 * mjuk(del(T.g[0] + 0.2, T.g[0] + 0.7, t)) : 0;
    bil.pose({ ...bp, ...p, y: bp.y + hopp, dist: x * 1.6, kanin: kaninG - hopp * 0.5 + 4 * pulser(t, [...ord.brum, ...ord.pilar, ...ord.tut].map(a => a + 0.12), 0.35) + 5 * vii * Math.abs(Math.sin(t * 14)),
      flagg: -bp.tilt * 0.15 });
    bil.puffa(t, ord.brum);
    // glöden på "Allt är brunt – hurra!": upp under raden och ner igen
    glod.setAttribute('opacity', (mjuk(del(T.f[0], T.f[0] + 0.6, t)) * mjuk(del(T.f[1], T.f[1] - 0.8, t))).toFixed(3));
    // c: pilarna poppar upp ovanför lastbilen på "upp" och ligger kvar i luften tills den kör över toppen
    if (id === 'c' || id === 'd') ord.pilar.forEach((a, i) => {
      const q = bergPose(bilX(a)), ut = mjuk(del(T.d[0] + 0.2, T.d[0] + 0.5, t));
      sticker(pilar[i], q.x + 40 + 70 * i, q.y - BERG_H - 30 - 20 * i, 0.9 * pop(t, a) * (1 - ut), -14 + 8 * i);
    });
    // d: fartstreck bakom lastbilen när den susar nerför
    const sus = mjuk(del(T.d[0] + 0.45, T.d[0] + 0.7, t)) * mjuk(del(T.e[0] + 0.5, T.e[0] + 0.2, t));
    if (sus > 0) {
      const a = bp.tilt * Math.PI / 180, [ux, uy] = [Math.cos(a), Math.sin(a)], [nx, ny] = [-uy, ux], cy0 = bp.y - 0.45 * BERG_H;
      fart.forEach((f, i) => {
        const o = [-55, -5, 45][i], b0 = 215 + 20 * i, len = 130 * sus;
        const x0 = bp.x - ux * b0 + nx * o, y0 = cy0 - uy * b0 + ny * o;
        f.style.display = '';
        f.setAttribute('d', `M${x0.toFixed(1)} ${y0.toFixed(1)} L${(x0 - ux * len).toFixed(1)} ${(y0 - uy * len).toFixed(1)}`);
        f.setAttribute('opacity', (0.9 * sus).toFixed(2));
      });
    }
    // flaskorna: glider ner på e, sprutar på sitt ord, guppar på "mums, mums" och glider upp
    const ner = over(del(T.e[0] - 0.1, T.e[0] + 0.5, t)), bort = inUt(del(ord.mums + 1.2 * BEAT, ord.mums + 1.2 * BEAT + 0.6, t));
    const gupp = 14 * pulser(t, [ord.mums, ord.mums + BEAT], 0.3);   // "mums, mums"
    flaskor.forEach((f, i) => {
      const a = i ? ord.choklad : ord.kola, kl = Math.sin(Math.PI * clamp((t - a) / 0.5)), dy = lerp(-420, 0, ner) - 460 * bort + gupp;
      f.g.style.display = t > T.e[0] - 0.1 && bort < 1 ? '' : 'none';
      f.g.setAttribute('transform', `translate(0 ${dy.toFixed(1)})`);
      const my = FLASKA.y + FLASKA.h / 2;
      f.sk.setAttribute('transform', `translate(${f.x} ${my}) scale(${1 + 0.1 * kl} ${1 - 0.08 * kl}) translate(${-f.x} ${-my})`);
      // strålen: skjuts ner till bullen och dras sedan upp i pipen igen
      const ut = del(a + 0.05, a + 0.35, t), inn = del(a + 0.8, a + 1.2, t);
      f.stråle.style.display = ut > 0 && inn < 1 ? '' : 'none';
      f.stråle.setAttribute('stroke-dasharray', `${(f.stråle.L * (ut - inn)).toFixed(1)} ${f.stråle.L * 2}`);
      f.stråle.setAttribute('stroke-dashoffset', (-f.stråle.L * inn).toFixed(1));
    });
    // såsen rinner ut över bullen från strålen, dropparna rinner sedan ner
    const rinn = (p, a, xmitt, x0, x1) => {
      const k = mjuk(del(a + 0.3, a + 1.2, t)), L = p.getTotalLength(), m = (xmitt - x0) / (x1 - x0);
      const fran = Math.max(0, m - k), till = Math.min(1, m + k);
      p.style.display = k > 0 ? '' : 'none';
      p.setAttribute('stroke-dasharray', `0 ${(L * fran).toFixed(1)} ${(L * (till - fran)).toFixed(1)} ${L * 2}`);
    };
    rinn(r.sas.kolaLinje, ord.kola, 470, 300, 1104);
    rinn(r.sas.choklad, ord.choklad, 900, 330, 1086);
    r.sas.droppar.forEach((dp, i) => {
      const k = mjuk(del(ord.kola + 1.0 + i * 0.1, ord.kola + 1.8 + i * 0.1, t)), L = dp.getTotalLength();
      dp.style.display = k > 0 ? '' : 'none';
      dp.setAttribute('stroke-dasharray', `${(L * k + 0.1).toFixed(1)} ${L * 2}`);
    });
    // f: stjärnor och hjärtan flyger upp från bullens topp, en per halvslag från "hurra"
    if (id === 'f') glitter.forEach((g, i) => {
      const a = ord.hurra - 0.6 + i * 0.22, k = inUt(del(a, a + 0.45, t));
      sticker(g.g, lerp(720, g.x, k), lerp(250, g.y, k), pop(t, a, 0.45) * (1 + 0.05 * Math.sin(t * 6 + i)), 12 * Math.sin(t * 2 + i));
    });
    // kameran: följer lastbilen (b–d), drar ut till hela bullen (e), går långsamt in (f), klipper till ratten (g)
    if (id === 'g') {
      const s = BERG_H / (bil.BB[3] - bil.BB[1]), hh = 700 * M.matt.BULLE[0] * s, [cx, cy] = bil.punkt([400, 560]);
      kamFri(cx, cy, H / (1.15 * hh));
      const [bx, by] = bil.punkt([512, 700]);   // tutknappen (RATT_MITT i lastbilen.js)
      ord.tut.forEach((a, i) => {
        const k = del(a, a + 0.6, t), c = ringar[i];
        c.style.display = k > 0 && k < 1 ? '' : 'none';
        c.setAttribute('cx', bx); c.setAttribute('cy', by);
        c.setAttribute('r', lerp(0.25, 1.5, Math.sqrt(k)) * hh * 0.22);
        c.setAttribute('stroke-width', (hh * 0.03 * (1 - k)).toFixed(2));
      });
    } else if (id === 'e' || id === 'f') {
      const [cx, cy, z] = kamBerg(t), k = inUt(del(T.e[0] + 0.1, T.e[0] + 0.9, t)), q = mjuk(del(T.f[0], T.f[1], t));
      kamFri(lerp(cx, W / 2 + 30 * q, k), lerp(cy, H / 2 - 12 * q, k), lerp(z, 1 + 0.04 * q, k));   // in mot bullen, lastbilen kvar i bild
    } else kamFri(...kamBerg(t));
    return id;
  };
  return r;
}

window.refrang = { ny };
})();
