// Hjältebilden: blå himmel med moln, hela gula helikoptern till höger (vänstra tredjedelen täcks av färgstrimman),
// lejonet jätteglad med vinkarmen snett ut förbi kupkanten. Ersätter filmens seek med en enda stillbild.
const Q = new URLSearchParams(location.search), num = (k, d) => Q.has(k) ? +Q.get(k) : d;
window.ready = window.ready.then(() => {
  window.seek = () => {
    TID = SANG0 + 30; BILD = '02e'; BILD0 = TID;
    for (const l of ['bakom', 'framfor', 'pynt', 'ram', 'platta']) $(l).innerHTML = '';
    gom(); kamera(1);
    himmel(num('glid', 0));
    const s = num('s', 0.66);
    heli({ x: num('x', 1250), botten: num('b', 1035), s, rot: num('rot', -2), t: num('t', 0.05),
      lage: ['jatteglad', { armar: [num('arm2', 38), num('arm', 38)] }], ldy: -num('upp', 30) / s });
    $('brus').setAttribute('seed', 7);
    window.kant?.uppdatera();
  };
  window.seek(0);
  return true;
});
