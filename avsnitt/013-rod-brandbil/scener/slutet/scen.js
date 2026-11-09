// Slutet (storyboard 13, avsnittstid 2:10.5–2:35.4): ca 25 s instrumentalt outro efter sången, som 014:s slut.
// Laddas efter ../film.js och skriver över ANIM['13']. s = sekunder in i bilden (0–24.9). Musiken: full till s ≈ 19.5,
// tyst svans 20–23.3, sista slaget s ≈ 23.5, uttoning till 24.9.
//   0       rakt klipp från discot till vägen (inget äppelsvep, Sanna 2026-11-08)
//   0.2–2.8 brandbilen kör in från vänster och kör hem lugnt åt höger, världen rullar, blåljuset blinkar i takten
//   6–9.4   det vi hittat poppar upp som klistermärken i en båge på himlen (bussen, ballongen, chilin, äpplet), kaninen tittar upp
//   10.6    ett hjärta stiger över hennes huvud
//   12–14.6 brandbilen saktar in och stannar; 13.6–17 kaninen vinkar; 15.2–17.5 klistermärkena flyter upp och iväg
//   16–19.6 kameran glider in mot ansiktet (bakgrunden lite mjuk, förgrunden 12 % mer)
//   18–19.6 kritirisen sluter sig runt ansiktet; hon blir sömnig och nöjd; 23.5–24.3 stängs den, stjärnan glimtar i det svarta
(() => {
// tagning 7: outrot är bara ca 11 s (musiken full till s ≈ 9, slut 11,3), sedan 3 s tyst svans; inga klistermärken
// här (bussen och chilin finns inte i sången, listan är redan i discot)
const IR = [8.0, 9.4, 12.9, 13.7], IRIS_R = 250;
const POPP = [], IKON_SX = [330, 600, 1330, 1600];   // bussen, ballongen, chilin, äpplet (skärmens x)
const APPLEN = [0.25, 0.5, 0.75, 1.0], APPLE_AVST = 130, APPLE_H = 150, APPLE_HOPP = 46;   // eftersläp (s) per äpple, avstånd, storlek, hopphöjd
const ikonY = x => 150 + 0.00022 * (x - 960) ** 2;

// defs: markskugga, kritkorn för klistermärkena, mjuk bakgrund vid inzoomning, varm ton och vinjett
document.querySelector('svg defs').insertAdjacentHTML('beforeend', `
  <filter id="markskugga" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="bgmjuk" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur id="bgmjukB" stdDeviation="0"/></filter>
  <filter id="smakrita" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.08 0.3" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.7 0 0 0 1.55" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
  </filter>
  <radialGradient id="vinjett" cx="0.5" cy="0.48" r="0.75"><stop offset="0.55" stop-color="#3B2A12" stop-opacity="0"/><stop offset="1" stop-color="#3B2A12" stop-opacity="0.14"/></radialGradient>`);
$('ram').insertAdjacentHTML('beforebegin', `<g id="ton" pointer-events="none">
  <rect width="1920" height="1080" fill="#FFC07A" opacity="0.07" style="mix-blend-mode:soft-light"/>
  <rect width="1920" height="1080" fill="url(#vinjett)"/></g>`);

// krit-klistermärken (som lamm.js i 015): fyruddig gul gnista och rosa hjärta, vit kant, kritkorn ovanpå
const stjarna = r => `M0 ${-r} Q${r * 0.16} ${-r * 0.16} ${r} 0 Q${r * 0.16} ${r * 0.16} 0 ${r} Q${-r * 0.16} ${r * 0.16} ${-r} 0 Q${-r * 0.16} ${-r * 0.16} 0 ${-r}Z`;
const gnista = (x, y, r, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})" stroke-linejoin="round">
  <path d="${stjarna(r)}" fill="#fff" stroke="#fff" stroke-width="${(3 + 0.16 * r).toFixed(1)}"/><path d="${stjarna(r)}" fill="#F2C94C"/>
  <path d="${stjarna(r)}" fill="#F7DA74" filter="url(#smakrita)"/><path d="${stjarna(r * 0.5)}" fill="#FFF7D6" filter="url(#smakrita)"/></g>`;
const HJ = 'M0 33 L-28.8 0 A15 15 0 0 1 0 -10.5 A15 15 0 0 1 28.8 0 Z';
const hjarta = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" stroke-linejoin="round">
  <path d="${HJ}" fill="#fff" stroke="#fff" stroke-width="9"/><path d="${HJ}" fill="#EC7896"/>
  <path d="${HJ}" fill="#C9506F" opacity="0.5" filter="url(#smakrita)" transform="translate(0 5)"/>
  <ellipse cx="-12" cy="-2" rx="5" ry="3.4" fill="#FFE3EA" opacity="0.85" transform="rotate(-35 -12 -2)"/></g>`;
const skugga = (x, y, rx, op) => lagg('bakom', `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${(rx * 0.12).toFixed(1)}" fill="#23401E" opacity="${op.toFixed(3)}" filter="url(#markskugga)"/>`);

// vägen: träden rullar med vägen, grästuvorna framför 12 % fortare; mjuka skuggor under träden (lite åt höger = −x i koden)
const vag = o => {
  platta(VÄG); SCROLL = o; vagStreck(SCROLL);   // hjulen rullar med vägen (kitet: x − SCROLL); står bilen och vägen still står hjulen still
  const x = (b, k = 1) => (((b + o * k) % 2240) + 2240) % 2240 - 160;
  for (const [b, w] of [[300, 120], [1180, 110], [1720, 120]]) skugga(x(b) - 8, 872, w, 0.2);
  sak('bakom', TRAD, x(300), 868, 640); sak('bakom', BUSKE, x(1180), 866, 180); sak('bakom', TRAD, x(1720), 868, 640);
  sak('framfor', GRAS, x(330, 1.12), 1090, 180); sak('framfor', GRAS, x(1620, 1.12), 1090, 180);
};
// hur långt vägen har rullat: 150 px/s, saktar in 12–14.6 och står still sedan
const fart = s => 150 * (1 - fas(s, 3.6, 6.0));
const rullat = s => { let d = 0; for (let t = 0; t < s; t += 1 / 60) d += fart(t) / 60; return d; };
// brandbilens x (bilens förskjutning, speglat: mindre x = längre åt höger i bild)
const bilX = s => lerp(1650, 40, fas(s, 0.1, 3.0)) + lerp(0, -220, fas(s, 3.0, 6.0));

// kameran som kitets, men returnerar också förflyttningen så att irisen hittar ansiktet i bilden
const kam = (z, cx, cy) => { kamera(z, cx, cy);
  return [z > 1 ? kl(1920 - 1920 * z, 0, 960 - cx * z) : 960 - 960 * z, z > 1 ? kl(1080 - 1080 * z, 0, 540 - cy * z) : 540 - 540 * z]; };

ANIM['13'] = (u, s) => {
  const studsY = 5 * studs(TID - SANG0), lugn = 1 - 0.7 * fas(s, 9.5, 11.0);   // gungar mindre i den tysta svansen
  $('platta').removeAttribute('filter'); $('framfor').removeAttribute('transform');


  vag(rullat(s));
  const x = bilX(s), kor = 1 - fas(s, 3.6, 6.0);
  const y = studsY * (1 - lugn);   // bil() i film.js drar av 5·studs; här tas en del tillbaka i svansen
  bil({ x, y, lampa: 1, blaljus: kor > 0.5 ? 0.8 * blink(s) : 0 });
  const h = studsY * lugn, k = 1 - 0.35 * kl(0, 1, h / 20);
  skugga(1001 + x - 10, 1014, 360 * k, 0.24 * k);   // markskugga under brandbilen, mindre och ljusare i skuttet

  // glada äpplen följer brandbilen på vägen som ankungar: en rad bakom henne (speglat: större x = längre åt vänster i bild),
  // var och en hoppar lite efter den framför i takten, "o"-mun i toppen, trycks ihop när de landar. Stillare i svansen.
  APPLEN.forEach((lag, i) => {
    const ax = 1560 + bilX(s - lag) + APPLE_AVST * i, b = studs(TID - SANG0 - 0.13 * (i + 1)), hopp = APPLE_HOPP * lugn * b;
    const tryck = 1 - 0.14 * Math.max(0, 0.25 - b) / 0.25 * lugn, sk = 1 - 0.45 * b * lugn;
    skugga(ax - 6, 1006, 52 * sk, 0.22 * sk);
    glattApple(ax, 1004 - hopp, APPLE_H, { mun: b > 0.7 && lugn > 0.5 ? 'o' : 'le', tryck, lager: 'bakom' });
  });

  // kaninen
  let uttryck = 'jatteglad', pose = 'neutral';
  
  if (s >= 3.0 && s < 4.6) uttryck = 'glad';
  if (s >= 4.6 && s < 7.6) { pose = { armar: [0, 56 + 20 * Math.sin((s - 4.6) * 6)] }; }   // ingen blinkning (Sanna 2026-11-09: "avoid winking eyes")
  // sömnig men nöjd: tunga ögonlock och ett leende (somnig har en liten o-mun som såg ledsen ut, Sanna 2026-11-09)
  if (s >= 7.6) uttryck = s < 10.0 ? 'glad' : { ...blanda('neutral', 'glad', 1), lock: [0.66, 0.66], titt: [0, 3] };
  kanin({ iBil: true, uttryck, pose, rikt: 0 });

  // klistermärkena: poppar upp i bågen, gungar, flyter upp och iväg
  POPP.forEach((t0, i) => {
    const p = kl(0, 1, (s - t0) / 0.35); if (p <= 0) return;
    const st = p < 1 ? ease(p) * (1 + 0.25 * Math.sin(Math.PI * p)) : 1, iv = fas(s, 15.2 + 0.18 * i, 17.4 + 0.18 * i);
    if (iv >= 1) return;
    const sx = IKON_SX[i], X = SPEG(sx), Yk = ikonY(sx) + 6 * Math.sin((s - t0) * 2.4 + i) - 520 * iv, tilt = (i % 2 ? 4 : -4) + 6 * iv * (i < 2 ? -1 : 1);
    pynt(`<g transform="translate(${X} ${Yk}) rotate(${tilt}) scale(${st.toFixed(3)}) translate(${-X} ${-Yk})">
      <circle cx="${X - 5}" cy="${Yk + 8}" r="70" fill="#1d4a44" opacity="0.2" filter="url(#mjuk)"/>
      <circle cx="${X}" cy="${Yk}" r="70" fill="#fff"/><circle cx="${X}" cy="${Yk}" r="59" fill="#FCE4E2"/>
      ${IKONER[i + 1](X, Yk, 64)}</g>`);
    const g = kl(0, 1, (s - t0) / 0.9);   // tre gnistor sprids ut och tonar bort
    if (g > 0 && g < 1) [[-1, -0.6], [1, -0.9], [0.9, 0.7]].forEach(([dx, dy], j) =>
      pynt(`<g opacity="${(1 - g).toFixed(2)}">${gnista(X + dx * (80 + 40 * g), Yk + dy * (70 + 40 * g), 22 * Math.sin(Math.PI * Math.min(1, g * 1.6)) + 4, 30 * g + 20 * j)}</g>`));
  });

  // hjärtat över huvudet
  const hj = kl(0, 1, (s - 3.2) / 1.8);
  if (hj > 0 && hj < 1) pynt(`<g opacity="${(1 - fas(hj, 0.6, 1)).toFixed(2)}">${hjarta(1053 + x + 40 * Math.sin(hj * 5), 150 - 110 * hj - studsY, 1.6 * ease(hj * 3))}</g>`);

  // kameran: 1 → glider in mot ansiktet; bakgrunden lite mjuk och förgrunden 12 % mer vid inzoomningen
  const z = lerp(1, 1.3, fas(s, 7.2, 9.4)), fx = 1053.6 + x, fy = 389 - h;
  const [tx, ty] = kam(z, 1920 - fx, fy + 70);
  if (z > 1.001) {
    $('bgmjukB').setAttribute('stdDeviation', (1.1 * (z - 1) / 0.3).toFixed(2)); $('platta').setAttribute('filter', 'url(#bgmjuk)');
    const kf = (1 + 1.12 * (z - 1)) / z, cx = fx, cy = fy + 70;
    $('framfor').setAttribute('transform', `translate(${cx} ${cy}) scale(${kf.toFixed(4)}) translate(${-cx} ${-cy})`);
  }

  // kritirisen runt ansiktet (skärmens koordinater)
  if (s >= IR[0]) {
    const r = s < IR[1] ? lerp(1300, IRIS_R, fas(s, IR[0], IR[1])) : lerp(IRIS_R, 0, fas(s, IR[2], IR[3]));
    const gl = fas(s, IR[1] - 0.3, IR[1] + 0.3) * (1 - fas(s, 13.95, 14.3)) * (0.8 + 0.2 * Math.sin(s * 5));
    kritiris(r, tx + z * (1920 - fx), ty + z * fy, { t: s, glimt: gl, in: fas(s, IR[2], IR[3]) });
  }
};

// ljudeffekterna (scenens tid), lågt och utan att dränka musiken; vol som 007:s kit.ljud
const E = (namn, n, t, o = {}) => ({ fil: `assets/ljud/effekter/${namn}/${namn}-${n}.m4a`, t, vol: 0.3, ...o });
const EFFEKTER = [
  E('brum', 3, 0.5, { vol: 0.15 }),                                       // brandbilen kör in
  E('fagelkvitter', 2, 2.8, { vol: 0.12, langd: 6, fade: 2 }),          // hemfärden
  ...POPP.map((t, i) => E('pop', i + 1, t, { vol: 0.25 })),               // klistermärkena
  E('pling', 2, 3.2, { vol: 0.2 }),                                      // hjärtat
  E('hjul-gnissel', 1, 5.4, { vol: 0.1 }),                               // brandbilen stannar mjukt
  E('glitter', 1, IR[0], { vol: 0.3 }),                                   // kritirisen sluter sig (som 014)
  E('swoosh', 4, IR[2], { vol: 0.2 }),                                    // och stängs
];
// äpplena som följer bilen: ett mjukt studs per slag när det första äpplet landar (inte ett per äpple), tagningarna om vartannat,
// lågt; hoppar över slag nära de andra effekterna (en sak i taget) och slutar när irisen börjar
const studsar = A0 => {
  const ut = [], upptagna = EFFEKTER.filter(e => !e.langd).map(e => e.t);
  for (let k = 0, n = 0; ; k++) {
    const t = SANG0 + 0.13 + k * BEAT - A0;
    if (t >= IR[0] - 0.3) break;
    if (t < 2.6 || upptagna.some(u => Math.abs(u - t) < 0.3)) continue;
    ut.push(E('apple-studs', n++ % 3 + 1, +t.toFixed(3), { vol: 0.2 }));
  }
  return ut;
};
// tass-klapp används inte: kaninen vinkar, ingen klappar i slutet
window.ready = window.ready.then(r => { window.LJUD.push(...EFFEKTER, ...studsar(ANIM.TIDER['13'][0])); return r; });
})();
