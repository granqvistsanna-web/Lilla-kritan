// Bedtime dream: while Kvack sleeps, a dream bubble puffs up on the left (a trail of dots from her head) and replays the day,
// one thing at a time: her red ball bounces in, Nalle waddles in and waves, the bumblebee loops round the ball, then all three
// hop and a big crayon B draws itself between them (Boll, Björn, Bi). On "god natt" the bubble drifts up into a star.
// The B draws on the stars' first twinkle (33.4), and the bubble lands on star 3 as the second wave reaches it (~38.1).
// Built at load, inside the camera, before setupShot() so its images are waited for. bedtime's seek() calls dream(t, head).
const DREAM = { c: [760, 420], r: 270, dots: [18.0, 18.4, 18.8], open: [19.0, .6], ball: [20.0, 21.8], walk: [24.0, 25.6, 4],
  wave: [25.8, 27.2], bee: [28.5, 29.4, 31.4], hops: [33.0, 33.55], berries: [31.5, .18], draw: [33.3, 34.8], away: [36.8, 38.2], star: [446, 216] };
const DG = 150, DR = 44, DN = 230; // dream ground (local y), ball radius, Nalle's height
const DREAM_BALL = bounce(DREAM.ball[0], DREAM.ball[1], -330, -120, DG - DR, 3, 120);
// Blueberries from the snack: a little pile pops up on the grass between the ball and Nalle, one by one.
const DBERRIES = [[-55, 130], [-15, 132], [25, 130], [-35, 94], [5, 94]];
window.DREAM_SFX = [[DREAM.berries[0], 'pop'], ...landings(DREAM_BALL, DG - DR).map(t => [t, 'bounce']), [DREAM.open[0], 'twinkle'], [DREAM.bee[0], 'buzz']];

document.getElementById('zs').insertAdjacentHTML('beforebegin', `
  <g id="dreamDots" filter="url(#boil)">${DREAM.dots.map(() => '<circle class="ddot" r="0" fill="#fffdf6" stroke="#3a3530" stroke-width="6"/>').join('')}</g>
  <g filter="url(#boil)"><g id="dream" style="display:none">
    <clipPath id="dreamClip"><circle r="${DREAM.r}"/></clipPath>
    <circle r="${DREAM.r + 9}" fill="#fffdf6" stroke="#3a3530" stroke-width="7"/>
    <g clip-path="url(#dreamClip)">
      <rect x="-${DREAM.r}" y="0" width="${2 * DREAM.r}" height="${DREAM.r}" fill="#f9e3b9"/>
      <image href="../../backgrounds/playground.png" x="-550" y="-378" width="1100" height="614" preserveAspectRatio="none"/>
      <rect x="-${DREAM.r}" y="-${DREAM.r}" width="${2 * DREAM.r}" height="${2 * DREAM.r}" fill="#fff" opacity=".2"/>
      <g id="dreamActors"></g>
      <g id="dreamBerries">${DBERRIES.map(() => `<g class="dberry"><circle r="21" fill="#3f55b0" stroke="#fffdf4" stroke-width="4"/><path d="M-6 -17l7 7M1 -17l-7 7" stroke="#1d2a5e" stroke-width="3" stroke-linecap="round"/></g>`).join('')}</g>
      <g id="dreamB" fill="none" stroke-linecap="round" stroke-linejoin="round">${['#fffdf6" stroke-width="54', '#f4c93a" stroke-width="34'].map(s =>
        `<path class="dB" pathLength="1" stroke-dasharray="1 1" stroke="${s}" d="M-70 -170 V40 M-70 -170 H-10 C90 -170 90 -70 -10 -70 H-70 M-10 -70 C110 -70 110 40 -10 40 H-70"/>`).join('')}</g>
      <image id="dreamBall" href="../../characters/cut/ball-red-crayon.png" width="1024" height="1024"/>
      <g id="dreamBee"><image href="../../characters/cut/bee-crayon.png" width="1024" height="1024" clip-path="url(#dreamBeeBody)"/>
        <g id="dreamWings"><image href="../../characters/cut/bee-crayon.png" width="1024" height="1024" clip-path="url(#dreamBeeWings)"/></g></g>
      <clipPath id="dreamBeeBody"><path d="M0 0H1024V1024H0ZM470 100H810V300H470Z" clip-rule="evenodd"/></clipPath>
      <clipPath id="dreamBeeWings"><rect x="470" y="100" width="340" height="200"/></clipPath>
    </g>
  </g></g>`); // the boil filter sits outside the moving group: its region is in the filtered element's own coordinates
const dreamNalle = addActor(document.getElementById('dreamActors'), 'dn', 'nalle');

function dream(t, [hx, hy]) {
  const $ = id => document.getElementById(id), [cx, cy] = DREAM.c, r = DREAM.r;
  const on = ease(clamp((t - DREAM.open[0]) / DREAM.open[1])), pop = on * (1 + .12 * Math.sin(Math.PI * on));
  const away = ease(clamp((t - DREAM.away[0]) / (DREAM.away[1] - DREAM.away[0]))), [sx, sy] = DREAM.star;
  const bob = 8 * Math.sin(t * 1.3);
  // Dots: pop up one by one on a line from just above her head towards the bubble's edge, and go with the bubble.
  const dx = cx - hx, dy = cy - hy, d = Math.hypot(dx, dy), ex = cx - dx / d * (r + 40), ey = cy - dy / d * (r + 40);
  document.querySelectorAll('.ddot').forEach((c, i) => {
    const k = (i + 1) / 4, grow = ease(clamp((t - DREAM.dots[i]) / .3)) * (1 - ease(clamp((t - DREAM.away[0]) / .6)));
    c.setAttribute('cx', lerp(hx - 30, ex, k)); c.setAttribute('cy', lerp(hy - 60, ey, k) + bob * k);
    c.setAttribute('r', (10 + 8 * i) * grow);
  });
  $('dream').style.display = on > 0 && away < 1 ? '' : 'none';
  $('dream').setAttribute('transform', `translate(${lerp(cx, sx, away)} ${lerp(cy + bob, sy, away)}) scale(${pop * (1 - .96 * away)})`);
  $('dream').setAttribute('opacity', 1 - away * away);

  // Everyone hops together twice before the B.
  const hop = Math.max(...DREAM.hops.map(h => t >= h && t < h + .42 ? Math.sin(Math.PI * (t - h) / .42) : 0)) * 55;
  // Ball: bounces in from the left and sits; hops with the others.
  const [, bx, by] = at(DREAM_BALL, t), [bsx, bsy] = squash(DREAM_BALL, t, DG - DR);
  $('dreamBall').style.display = t >= DREAM.ball[0] ? '' : 'none';
  $('dreamBall').setAttribute('transform', `translate(${bx} ${by - hop}) scale(${bsx * 2 * DR / 770} ${bsy * 2 * DR / 770}) translate(-512 -515)`);
  // Nalle: waddles in from the right, waves, then smiles; hops with the others.
  const wd = waddle(t, DREAM.walk, 5), nx = lerp(330, 120, clamp((t - DREAM.walk[0]) / (DREAM.walk[1] - DREAM.walk[0])));
  const wave = t > DREAM.wave[0] && t < DREAM.wave[1] ? (.75 + .25 * Math.sin((t - DREAM.wave[0]) * 2 * Math.PI * 2.2)) * ease(clamp((t - DREAM.wave[0]) / .2)) * ease(clamp((DREAM.wave[1] - t) / .2)) : 0;
  dreamNalle.style.display = t >= DREAM.walk[0] ? '' : 'none';
  pose(dreamNalle, 'nalle', { t, x: nx, y: DG - (wd.bob || 0) - hop, h: DN, ground: DG, step: wd.step, stride: wd.stride, tilt: wd.tilt,
    up: wave, eyes: t > DREAM.wave[0] ? 'happy' : 'open', look: -1 });
  // Bee: drifts in from the top right, loops twice round the ball, then hovers above the middle.
  const [b0, b1, b2] = DREAM.bee, loop = clamp((t - b1) / (b2 - b1)), a = 4 * Math.PI * loop;
  let qx = lerp(320, -120 + 110, ease(clamp((t - b0) / (b1 - b0)))), qy = lerp(-320, by - 20, ease(clamp((t - b0) / (b1 - b0))));
  if (t > b1) qx = lerp(-120 + 110 * Math.cos(a), 140, ease(clamp((t - b2) / .8))), qy = lerp(by - 20 - 110 * Math.sin(a), -150, ease(clamp((t - b2) / .8)));
  $('dreamBee').style.display = t >= b0 ? '' : 'none';
  $('dreamBee').setAttribute('transform', `translate(${qx} ${qy + 14 * Math.sin(t * 9) - hop}) rotate(${8 * Math.sin(t * 7)}) scale(${110 / 640}) translate(-512 -540)`);
  $('dreamWings').setAttribute('transform', `translate(0 300) scale(1 ${.55 + .45 * Math.abs(Math.sin(t * 80))}) translate(0 -300)`);
  // Berries: pop up one by one with a little overshoot, bob gently, hop with the others.
  document.querySelectorAll('.dberry').forEach((g, i) => {
    const t0 = DREAM.berries[0] + i * DREAM.berries[1], k = clamp((t - t0) / .3), s = k * (1 + .35 * Math.sin(Math.PI * k));
    g.style.display = k > 0 ? '' : 'none';
    g.setAttribute('transform', `translate(${DBERRIES[i][0]} ${DBERRIES[i][1] - 3 * Math.sin(t * 2.4 + i) - hop}) scale(${s})`);
  });
  // B: draws itself stroke by stroke, a little pop when it is done.
  const draw = ease(clamp((t - DREAM.draw[0]) / (DREAM.draw[1] - DREAM.draw[0]))), done = pulse(t, [DREAM.draw[1]], .4);
  document.querySelectorAll('.dB').forEach(p => p.setAttribute('stroke-dashoffset', 1 - draw));
  $('dreamB').style.display = draw > 0 ? '' : 'none';
  $('dreamB').setAttribute('transform', `translate(-75 ${-20 - hop * .3}) scale(${1 + .12 * done})`);
}
