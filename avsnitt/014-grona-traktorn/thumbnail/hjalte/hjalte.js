// Hjältebilden till 014:s miniatyr, utan text: kameran nära, Lova står i sätet och skrattar med armarna uppe. Vänstra
// tredjedelen täcks av färgstrimman, så Lova står mitt i resten. Inga träd eller moln. Poserna glider in, så bilden tas vid 3 s.
async function bygg() {
  const { W, H } = kit;
  const M = await kit.manus();
  const L = kit.duk(kit.VAG_PLATTA);
  const v = kit.vag(L.plate); v.rulla(0); v.trad.style.display = 'none'; v.moln.style.display = 'none';
  const b = await traktorn.ny(L.figurer, M);
  const pose = { x: 0.73 * W, y: 1.16 * H, h: 1.3 * H, tilt: -3, dist: 0, flagg: -8, humor: 'skrattar', m: 0.85, titt: 0.15,
    r: [1250, -650], l: [-230, -650], ratt: false, sta: 1 };
  await new Promise(r => setTimeout(r, 1500));
  kit.kor(() => b.pose(pose), 4);
}
bygg();
