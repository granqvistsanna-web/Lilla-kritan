// Hjältebilden till 015:s miniatyr, utan text: kameran nära, lammet skrattar med armarna uppe , utan strumpor.
// Vänstra tredjedelen täcks av färgstrimman, så lammet står i resten. Poserna glider in, så bilden tas vid 3 s.
async function bygg() {
  const { W, H } = kit;
  await kit.manus();
  const L = kit.duk('angen');
  const ludde = await lamm.ny('ludde', { forelder: L.figurer, h: 0.74 * H });
  const pose = { x: 0.66 * W, y: 0.955 * H, humor: 'skrattar', m: 0.85, titt: 0, tilt: -3, armL: -95, armR: 95 };
  kit.kor(() => { kit.kamera(W / 2, H / 2, 1, true); ludde.pose(pose); }, 4);
}
bygg();
