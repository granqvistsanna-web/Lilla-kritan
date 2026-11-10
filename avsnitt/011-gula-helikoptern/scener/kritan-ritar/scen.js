// 011 Gula sången v5, scen kritan-ritar (01a–01c, avsnittstid 0:09.0–0:23.4). Laddas efter ../film.js och skriver över ANIM['01a'–'01c'].
// Som 013:s ritintro (format/fargsang-v2.md, "Ritintrot"):
// 01a: "Titta!" (9,2), kritan ritar bananens KONTUR i ett lugnt drag (ca 6,5 s), "Något långt." (13,5) medan den ritar. Skogsljud under
//      (satt-ihop.sh).
// 01b (16,2): konturen står stilla, kritan väntar bredvid och vickar lite (barnet gissar). Ingen knackning (Sanna 2026-11-10).
// Kameran (Sanna: "start is a bit slow, maybe close crops"): närbild som följer kritspetsen medan den ritar, drar sig ut och visar
// hela konturen, kryper sakta in under pausen, går nära bananen när den fylls och tillbaka till helbild före hålet i papperet (22,4).
// 01c: "En banan! En gul banan!" (repliken börjar 18,7 så att den hinner sluta före "Nu flyger vi!" 22,2): riktiga bananen (banan-v2)
//      fylls i inifrån på "banan" (19,1) medan linjen tonas bort, pling, den hoppar och gungar, krit-gnistor. Från 22,4 zoomar
//      bilden in genom ett hål i papperet mot ängen (film.js papperHal, fortsätter i 02a till 24,2).
(() => {
  const el = (tag, a = {}, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const del = (a, b, t) => kl01((t - a) / (b - a));
  const popp = tau => tau <= 0 ? 0 : 1 - Math.exp(-7 * tau) * Math.cos(16 * tau);
  // Bananens kontur i bildens pixlar (banan-v2.png, 1659 × 1535), spårad ur alfat innanför den vita kanten (cv2), börjar vid skaftets spets.
  const KONTUR = 'M1528 39 L1518 41 L1505 45 L1491 49 L1478 52 L1465 53 L1452 54 L1442 58 L1435 68 L1430 80 L1428 92 L1426 105 L1425 119 L1422 133 L1419 147 L1419 162 L1418 176 L1418 191 L1417 205 L1415 219 L1413 234 L1410 248 L1408 262 L1405 276 L1403 290 L1398 304 L1393 318 L1387 331 L1378 343 L1366 352 L1354 360 L1341 367 L1328 375 L1316 383 L1304 393 L1292 402 L1279 411 L1267 421 L1256 431 L1245 442 L1235 454 L1225 466 L1216 479 L1209 492 L1201 505 L1193 517 L1185 530 L1177 543 L1170 556 L1162 569 L1154 582 L1147 595 L1138 607 L1130 620 L1122 633 L1114 646 L1106 658 L1097 671 L1087 683 L1078 695 L1068 707 L1059 719 L1050 731 L1041 744 L1031 756 L1021 768 L1011 780 L1001 792 L991 803 L980 814 L969 825 L957 835 L945 845 L933 855 L921 865 L909 874 L896 884 L884 892 L872 901 L859 909 L846 918 L834 926 L821 933 L807 940 L795 948 L781 955 L768 962 L755 968 L741 974 L728 981 L714 987 L701 994 L688 999 L674 1004 L661 1008 L647 1012 L633 1016 L620 1021 L607 1026 L593 1029 L578 1032 L564 1036 L550 1039 L535 1042 L520 1045 L506 1047 L491 1048 L476 1048 L462 1048 L448 1049 L434 1050 L420 1050 L406 1050 L391 1050 L377 1049 L362 1048 L348 1046 L334 1045 L320 1042 L305 1041 L290 1039 L275 1037 L261 1035 L246 1034 L231 1032 L217 1032 L202 1030 L188 1028 L174 1025 L160 1024 L145 1022 L131 1021 L117 1022 L103 1025 L91 1030 L79 1035 L70 1043 L64 1055 L60 1068 L54 1081 L49 1094 L44 1107 L44 1119 L47 1131 L54 1143 L59 1156 L65 1169 L73 1181 L83 1193 L93 1205 L103 1217 L113 1229 L123 1241 L133 1253 L143 1265 L153 1276 L164 1287 L176 1298 L188 1307 L200 1317 L212 1327 L224 1337 L236 1346 L249 1355 L261 1364 L273 1373 L286 1381 L299 1389 L312 1397 L324 1405 L337 1412 L350 1419 L363 1425 L376 1430 L389 1434 L403 1439 L416 1444 L430 1448 L444 1452 L458 1456 L472 1460 L485 1464 L498 1469 L511 1473 L525 1476 L539 1479 L553 1482 L567 1486 L581 1489 L595 1491 L610 1492 L624 1493 L638 1494 L652 1494 L667 1495 L681 1495 L695 1494 L709 1493 L723 1491 L738 1490 L753 1488 L767 1486 L782 1485 L797 1485 L812 1482 L827 1481 L841 1479 L856 1478 L870 1476 L885 1473 L899 1471 L913 1468 L928 1465 L942 1462 L956 1458 L970 1454 L985 1449 L999 1445 L1013 1440 L1027 1435 L1041 1429 L1054 1423 L1068 1417 L1081 1411 L1095 1404 L1108 1398 L1121 1391 L1134 1384 L1147 1377 L1160 1369 L1173 1361 L1185 1354 L1199 1346 L1211 1339 L1224 1330 L1236 1321 L1249 1313 L1261 1304 L1274 1295 L1286 1285 L1298 1275 L1309 1265 L1321 1254 L1333 1243 L1344 1233 L1355 1222 L1366 1210 L1376 1198 L1387 1187 L1397 1175 L1407 1163 L1417 1151 L1427 1139 L1437 1128 L1447 1115 L1455 1103 L1463 1090 L1471 1077 L1478 1065 L1486 1052 L1495 1040 L1503 1027 L1511 1014 L1519 1002 L1526 989 L1533 975 L1539 962 L1546 949 L1553 935 L1559 922 L1565 908 L1570 895 L1575 881 L1580 867 L1584 853 L1588 839 L1592 824 L1596 810 L1599 796 L1602 782 L1605 768 L1609 754 L1611 739 L1614 726 L1616 712 L1618 697 L1619 682 L1618 667 L1617 652 L1615 637 L1613 622 L1610 607 L1607 592 L1604 578 L1602 564 L1600 550 L1598 536 L1595 522 L1592 507 L1588 493 L1583 479 L1577 466 L1570 452 L1564 439 L1557 425 L1551 412 L1544 399 L1538 385 L1533 372 L1530 358 L1527 344 L1526 330 L1525 316 L1524 301 L1525 286 L1526 271 L1527 256 L1528 242 L1530 227 L1532 212 L1535 198 L1539 184 L1542 170 L1546 156 L1550 142 L1553 127 L1555 113 L1555 99 L1553 86 L1552 73 L1549 60 L1543 48 L1536 41';
  const [BX, BB, BH, BR] = BANAN_PAPPER, BS = BH / 1535;
  const T = { in: [9.0, 9.4], drag: [9.6, 17.0], vanta: [17.1, 17.9], knack: [], svar: 19.1, fyll: [19.1, 19.8], hopp: [19.55, 20.35] };
  const ANKARE = `translate(${BX} ${BB}) rotate(${BR}) scale(${BS.toFixed(5)}) translate(-830 -1535)`;
  const iBild = ([x, y]) => { const a = BR * Math.PI / 180, dx = (x - 830) * BS, dy = (y - 1535) * BS; return [BX + dx * Math.cos(a) - dy * Math.sin(a), BB + dx * Math.sin(a) + dy * Math.cos(a)]; };

  $('platta').ownerSVGElement.querySelector('defs').insertAdjacentHTML('beforeend', `
    <filter id="vax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="fyllkant" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="4000" height="4000">
      <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="2" seed="11"/><feDisplacementMap in="SourceGraphic" scale="200" xChannelSelector="R" yChannelSelector="G"/></filter>
    <mask id="m-fyll" maskUnits="userSpaceOnUse" x="-500" y="-500" width="2700" height="2600"><circle id="rit-fyll" cx="830" cy="800" r="0" fill="#fff" filter="url(#fyllkant)"/></mask>
    <path id="krita-form" d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z"/>`);

  const rit = el('g', {}), studsG = el('g', {}, rit), banan = el('g', { transform: ANKARE }, studsG);
  el('image', { href: BANAN, width: 1659, height: 1535, mask: 'url(#m-fyll)' }, banan);
  const linjeG = el('g', { filter: 'url(#vax)' }, banan);
  const linje = el('path', { d: KONTUR, fill: 'none', stroke: '#9A6A00', 'stroke-width': 52, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, linjeG);
  const L = linje.getTotalLength(); linje.setAttribute('stroke-dasharray', `${L} ${L + 1}`);
  const krita = el('g', {});
  krita.innerHTML = `<g><use href="#krita-form" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>
    <g filter="url(#vax)"><use href="#krita-form" fill="${GUL}"/><path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${GUL_M}"/>
      <path d="M-19 -92 Q0 -98 19 -92 M-19 -218 Q0 -224 19 -218" stroke="#8a6200" stroke-width="4" fill="none"/></g></g>`;
  const spets = k => { const p = linje.getPointAtLength(L * kl01(k)); return iBild([p.x, p.y]); };
  const jamn = k => (k + ease(k)) / 2;   // nästan jämn fart på kritspetsen, mjuk start och stopp
  const drag = t => jamn(del(...T.drag, t));
  const mix2 = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
  const LUTA = 40;
  function kritan(t) {
    const skrrt = Math.sin(t * 2 * Math.PI * 17) * 1.6, VANTA = [1420, 520], UT = [2300, -300];
    if (t < T.in[0]) return null;
    if (t < T.drag[0]) { const k = del(...T.in, t); return { p: [spets(0)[0], spets(0)[1] - 18 * (1 - k)], v: LUTA, s: popp((t - T.in[0]) / 0.5) }; }
    if (t < T.drag[1]) return { p: [spets(drag(t))[0], spets(drag(t))[1] + skrrt * 0.6], v: LUTA + skrrt };
    const k = ease(del(...T.vanta, t)), s = Math.max(0, t - T.vanta[1]), u = ease(del(T.svar, T.svar + 0.8, t)) ** 1.4;
    const knack = T.knack.reduce((a, tk) => a + Math.sin(Math.PI * del(tk, tk + 0.3, t)) * (t < tk + 0.3 ? 1 : 0), 0);
    const p = mix2(mix2(spets(1), VANTA, k), UT, u);
    return t > T.svar + 0.8 ? null : { p: [p[0] + Math.sin(s * 2.1) * 5, p[1] - Math.abs(Math.sin(s * 3)) * 6 * Math.min(1, s / 0.4) - 40 * Math.sin(Math.PI * k) + 70 * knack],
      v: LUTA + 10 * Math.sin(Math.PI * k) + 7 * Math.sin(s * 3.4) * Math.min(1, s / 0.6) - 6 * knack + 20 * u };
  }
  const hopp = (t, t0, h) => { const k = (t - t0) / 0.45;
    if (k < 0) return { y: 0, sx: 1, sy: 1 };
    if (k < 1) { const s = Math.sin(Math.PI * k); return { y: -h * s, sx: 1 - 0.03 * s, sy: 1 + 0.04 * s }; }
    const e = t - t0 - 0.45, q = Math.exp(-6 * e) * Math.cos(18 * e) * h / 40; return { y: 0, sx: 1 + 0.07 * q, sy: 1 - 0.07 * q }; };
  const GNISTOR = [[-360, 380, 58, 0], [330, 300, 48, 0.1], [-420, 700, 44, 0.18], [400, 650, 56, 0.26]];

  function bild(t) {
    if (t >= 22.4) { window.angenUnderHal(); return; }
    papper(); $('platta').appendChild(rit); $('pynt').appendChild(krita);
    linje.style.display = t >= T.drag[0] ? '' : 'none';
    linje.setAttribute('stroke-dashoffset', (L * (1 - drag(t))).toFixed(1));
    linjeG.setAttribute('opacity', (1 - ease(del(T.fyll[0] + 0.15, T.fyll[1] + 0.2, t))).toFixed(3));
    $('rit-fyll').setAttribute('r', (1500 * ease(del(...T.fyll, t)) ** 1.2).toFixed(1));
    const h = T.hopp.map((t0, i) => hopp(t, t0, i ? 18 : 40));
    const y = h.reduce((a, q) => a + q.y, 0), sx = h.reduce((a, q) => a * q.sx, 1), sy = h.reduce((a, q) => a * q.sy, 1);
    const e = t - T.hopp[0] - 0.45, gung = e > 0 ? 4 * Math.exp(-1.6 * e) * Math.sin(6.5 * e) : 0;
    studsG.setAttribute('transform', `translate(${BX} ${(BB + y).toFixed(1)}) rotate(${gung.toFixed(2)}) scale(${sx.toFixed(4)} ${sy.toFixed(4)}) translate(${-BX} ${-BB})`);
    for (const [dx, yy, r, d] of GNISTOR) { const t0 = T.hopp[0] + 0.1 + d, s = popp((t - t0) / 0.5) * (1 - ease(del(t0 + 1.2, t0 + 1.6, t)));
      if (s > 0.01) gnista(BX + dx, yy - 20 * del(t0, t0 + 1.6, t), r * s, 12 * Math.sin((t - t0) * 5)); }
    const k = kritan(t);
    krita.style.display = k ? '' : 'none';
    if (k) krita.firstChild.setAttribute('transform', `translate(${k.p[0].toFixed(1)} ${k.p[1].toFixed(1)}) rotate(${k.v.toFixed(2)}) scale(${(0.95 * (k.s ?? 1)).toFixed(4)})`);
    const [px, py] = spets(drag(t - 0.25)), nara = fas(t, 9.3, 10.2) * (1 - fas(t, 16.2, 17.4));
    const halv = 1 + 0.12 * fas(t, 17.4, 19.0) + 0.2 * fas(t, 19.1, 20.0), z = (1 + 0.8 * nara) * (1 - nara) + 1.8 * nara;
    const zz = lerp(t < 17.4 ? z : halv, 1, fas(t, 21.6, 22.35));
    kamera(zz, lerp(960, px, nara), lerp(lerp(540, 600, fas(t, 17.4, 19)), py, nara));
  }
  ANIM['01a'] = ANIM['01b'] = ANIM['01c'] = () => bild(TID);

  // Ljudet (scentid = avsnittstid − 9,0), som 013: krita-ritar (två tagningar) medan konturen ritas, ingen knackning, pling på svaret.
  const fx = (namn, v, t, o = {}) => ({ fil: `assets/ljud/effekter/${namn}/${namn}-${v}.m4a`, t: t - 9.0, vol: 1, ...o });
  window.ready = window.ready.then(r => {
    // krita-ritar (mjukt, lugnt ritljud, 4 s per tagning): två tagningar efter varandra med en halv sekunds övertoning
    window.LJUD.push(fx('krita-ritar', 1, T.drag[0], { langd: 3.8, vol: 1.6, fade: 0.5 }),
      fx('krita-ritar', 2, T.drag[0] + 3.3, { langd: T.drag[1] - T.drag[0] - 3.2, vol: 1.6, fadeIn: 0.5, fade: 0.4 }),
      fx('pling', 1, T.svar + 0.1, { vol: 1.2, langd: 1.5, fade: 0.4 }));
    return r;
  });
})();
