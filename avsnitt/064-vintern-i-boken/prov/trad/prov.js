// 064 prov: det kala trädet i kod (trad.js) utan snö, halvvägs och med full snö. Röda prickar: där fåglarna sitter.
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/064-vintern-i-boken/prov/trad 0
import { kritYta } from '/produktion/three-rum/popupbok/bok-parm.js';
import { kaltTrad, sittplats, W, H } from './trad.js';

const x = document.getElementById('bild').getContext('2d');
kritYta(x, 1920, 1080, '#C9DBEA', '#D8E6F1', '#B6CCE0', 0.6);                        // blek vinterhimmel
x.save(); x.beginPath(); x.rect(0, 860, 1920, 220); x.clip(); kritYta(x, 1920, 1080, '#F7F9FC', '#FFFFFF', '#E4ECF6', 0.6); x.restore();
const S = 0.78;
[0, 0.5, 1].forEach((sno, i) => {
  const ox = 70 + i * 620, oy = 60;
  x.drawImage(kaltTrad({ sno }), ox, oy, W * S, H * S);
  x.fillStyle = '#E2563F';
  for (let f = 0; f < 3; f++) { const p = sittplats(f, sno); x.beginPath(); x.arc(ox + p.x * S, oy + p.y * S - 16, 16, 0, Math.PI * 2); x.fill(); }
});
window.DURATION = 1; window.LJUD = [];
window.seek = async () => {};
window.ready = Promise.resolve(true);
