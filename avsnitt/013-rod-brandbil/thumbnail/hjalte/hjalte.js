// Hjältebilden: vägen utan träd och buskar, brandbilen med blåljuset tänt, kaninen jätteglad med armarna uppe.
// Vänstra tredjedelen täcks av färgstrimman, så kameran lägger bilen till höger. Ersätter filmens seek med en enda stillbild.
const Q = new URLSearchParams(location.search), num = (k, d) => Q.has(k) ? +Q.get(k) : d;
window.ready = window.ready.then(() => {
  window.seek = () => {
    TID = SANG0 + 3; SCROLL = 0; BILD = '02a'; BILD0 = TID;
    for (const l of ['bakom', 'framfor', 'pynt', 'ram', 'gose']) $(l).innerHTML = '';
    $('duk').setAttribute('fill', GOLV);
    platta(VÄG);
    bil({ x: num('bx', -170), lampa: 1 });
    kanin({ iBil: true, uttryck: 'jatteglad', pose: Q.get('pose') || 'hurra' });
    kamera(num('z', 1.15), num('cx', 580), num('cy', 555));
    $('brus').setAttribute('seed', 7);
  };
  window.seek(0);
  return true;
});
