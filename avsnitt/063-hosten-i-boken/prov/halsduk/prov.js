// 063 prov: halsduken i kod (halsduk.js), färg B på höstgräset, och en närbild av vecket.
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/063-hosten-i-boken/prov/halsduk 0
import { kritYta } from '/produktion/three-rum/popupbok/bok-parm.js';
import { halsduk } from './halsduk.js';

const bild = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = src; });
const hd = await halsduk('b');
const x = document.getElementById('bild').getContext('2d');
kritYta(x, 1920, 1080, '#B99A45', '#CDB264', '#8F8A3A', 0.7);   // höstgräset
x.drawImage(hd, 40, 140, 1100, 1100);
x.drawImage(hd, 640, 440, 160, 160, 1240, 260, 640, 640);   // närbild av vecket där änden hänger ner
window.DURATION = 1; window.LJUD = [];
window.seek = async () => {};
window.ready = Promise.resolve(true);
