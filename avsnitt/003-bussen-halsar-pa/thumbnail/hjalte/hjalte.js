// Hjältebilden till 003:s färgstrimma: kameran nära bussen på ängen, kaninen och lammet skrattar och vinkar i fönstren.
// Vänstra tredjedelen (bussens bakdel) täcks av strimman.
const P = { x: 1262, y: 1110, k: 1.9 };
async function bygg() {
  kit.duk('angen');
  const buss = await kit.figur('bussen-tva-fonster');
  const ludde = await kit.figur('lammet-ludde');
  const kanel = await kit.figur('kaninen-kanel');
  const kb = kit.iFonster(buss, kanel, 1), lb = kit.iFonster(buss, ludde, 0);
  kit.kor(() => {
    buss.pose({ ...P, tilt: -2, ogon: 'happy', mun: 0.6, delar: { 'del-1': 20, 'del-2': 20 } });
    kanel.pose({ ...kb, ogon: 'happy', mun: 0.8, delar: { 'arm-r': [-120, 0, 0, 1.3] } });
    ludde.pose({ ...lb, ogon: 'happy', mun: 0.6 });
  }, 1 / 30);
}
bygg();
