// Shared character rig for the Lilla Kvack code shots (intro, chorus3, verse3).
// A shot builds actors once with addActor(), then calls pose() every frame with where the actor is and what its face does.
// Positions in CAST are in each source image's own 1024px coordinates.

const CAST = {
  kvack: { img: '../../characters/cut/duckling-faceless.png', foot: [510, 935], art: 805, flip: -1, skin: '#f4d252',
    limb: { clip: [660, 560, 80, 68], patch: [170, 20], up: a => `translate(${120 * a} ${-30 * a}) rotate(${-85 * a} 610 520)` },
    eyes: [[320, 335], [537, 345]], mouth: 'beak', head: [470, 168],
    sad: '../../characters/cut/kvack-sad-2.png' }, // drooped sad pose, same size and feet (pose: sadArt)
  nalle: { img: '../../characters/cut/bear-faceless-v3.png', foot: [496, 940], art: 824, flip: 1, skin: '#96572f',
    limb: { clip: [700, 630, 78, 80], patch: [190, 0], up: a => `translate(${95 * a} ${-215 * a}) rotate(${-105 * a} 705 545)`,
      // When the paw lifts high, a crayon arm joins it back to the shoulder.
      arm: { shoulder: [670, 560], move: [95, -215], turn: -105, pivot: [705, 545] } },
    eyes: [[405, 345], [620, 340]], mouth: 'bear', head: [496, 150] },
};

const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => k * k * (3 - 2 * k);
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
// sin bump of length `len` starting at each time in `times`, 0 elsewhere.
const pulse = (t, times, len) => Math.max(0, ...times.map(h => t >= h && t < h + len ? Math.sin(Math.PI * (t - h) / len) : 0));

// Keyframes [t, x, y]: parabolic hops from x0 to x1, each lower than the last.
function bounce(t0, t1, x0, x1, y, hops, height, steps = 32) {
  const keys = [], d = (t1 - t0) / hops, dx = (x1 - x0) / hops;
  for (let i = 0; i < hops; i++) {
    const h = height * Math.pow(0.6, i);
    for (let s = 0; s <= steps; s++) {
      if (i && !s) continue;
      const k = s / steps;
      keys.push([t0 + d * (i + k), x0 + dx * (i + k), y - h * 4 * k * (1 - k)]);
    }
  }
  return keys;
}
function at(keys, t) {
  let i = keys.findIndex(k => k[0] > t);
  if (i === -1) return keys.at(-1);
  if (i === 0) return keys[0];
  const a = keys[i - 1], b = keys[i], k = (t - a[0]) / (b[0] - a[0]);
  return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
}
// [sx, sy]: squash eased around each touchdown (scaled to the hop's size), stretch with vertical speed.
function squash(keys, t, ground) {
  const lift = t => ground - at(keys, t)[2], air = t => lift(t) > 1;
  let d = 1, peak = 0;
  for (let k = -45; k <= 45; k++) if (air(t + k * .004) !== air(t)) d = Math.min(d, Math.abs(k) / 45); // touchdown within ±0.18s, fine steps
  for (let k = -30; k <= 30; k++) peak = Math.max(peak, lift(t + k * .01));
  const a = (1 - d) ** 2 * Math.min(1, peak / 80);
  const vy = Math.abs(lift(t + .02) - lift(t - .02)) / .04, st = 1 + Math.min(vy / 4000, .14);
  return [1 / Math.sqrt(st) + .12 * a, st - .16 * a];
}

const INK = '#1d1d1d';
function addActor(parent, id, who) {
  const c = CAST[who], [cx, cy, rx, ry] = c.limb.clip, [px, py] = c.limb.patch;
  const eye = `<g class="open"><circle r="26" fill="#fff" stroke="${INK}" stroke-width="6"/><circle class="pupil" r="10" fill="${INK}"/><circle class="shine" r="3.6" fill="#fff"/>
      <path class="wet" d="M-19 23 Q0 33 19 23" fill="none" stroke="#9fd0f0" stroke-width="5" stroke-linecap="round"/>
      <path class="lid" d="M-30 0 A30 30 0 0 1 30 0 Z" fill="${c.skin}"/><line class="lidline" x1="-27" x2="27" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>
    <path class="happy" d="M-22 8 Q0 -18 22 8" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path class="closed" d="M-22 -4 Q0 16 22 -4 M-14 5 l-5 7 M0 8 v8 M14 5 l5 7" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path class="sob" d="M-24 -2 L0 6 L24 -2" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="brow" d="M-22 -40 Q0 -50 22 -40" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  const face = c.mouth === 'beak'
    ? `<ellipse class="mouth" cx="395" cy="410" rx="62" ry="0" fill="#7a2a1c"/>
       <image class="jaw" href="../../characters/cut/duckling-beak.png" width="1024" height="1024" clip-path="url(#${id}-bb)"/>
       <image href="../../characters/cut/duckling-beak.png" width="1024" height="1024" clip-path="url(#${id}-bt)"/>`
    : `<ellipse class="mouth" cx="515" cy="428" rx="24" ry="0" fill="#5a2418"/>
       <path class="smile" d="M492 418 Q515 438 538 418" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
       <path class="frown" d="M494 434 Q515 416 536 434" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  parent.insertAdjacentHTML('beforeend', `
  <clipPath id="${id}-above">${legClip(who)}</clipPath>
  <clipPath id="${id}-limb"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath>
  <clipPath id="${id}-bt"><rect width="1024" height="408"/></clipPath><clipPath id="${id}-bb"><rect y="408" width="1024" height="616"/></clipPath>
  <g id="${id}">
    <g class="legs">${legsHTML(id, who, c.img)}</g>
    <g class="body">
      <image href="${c.img}" width="1024" height="1024" clip-path="url(#${id}-above)"/>${LEGS[who].rim || ''}
      <g clip-path="url(#${id}-limb)"><image href="${c.img}" width="1024" height="1024" x="${px}" y="${py}"/></g>
      ${c.limb.arm ? `<line class="arm" stroke="${c.skin}" stroke-width="78" stroke-linecap="round"/>` : ''}
      <g class="limb" clip-path="url(#${id}-limb)"><image href="${c.img}" width="1024" height="1024"/></g>
      ${face}
      ${c.eyes.map(() => `<g class="eye">${eye}</g>`).join('')}
    </g>
  </g>`);
  return document.getElementById(id);
}

// p: { x, y (feet), h (height px), ground, flip (optional: -1/1 turns the actor round for this frame), tilt, step (walk phase, see legs.js), stride (0..1), sx, sy, up (limb 0..1), eyes: open|happy|big|half|closed, look (-1..1 screen), lookY, blink (bool), open (mouth 0..1.5) }
function pose(g, who, p) {
  const c = CAST[who], k = p.h / c.art, [fx, fy] = c.foot, by = fy - 105, flip = p.flip ?? c.flip;
  const sx = p.sx ?? 1, sy = (p.sy ?? 1) * (1 + .015 * Math.sin(p.t * 3 + (who === 'nalle' ? 1 : 0)));
  g.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.tilt || 0}) scale(${flip * k} ${k}) translate(${-fx} ${-fy})`);
  const img = p.sadArt && c.sad || c.img; // swap to the sad art for this frame, keeping the beak
  g.querySelectorAll('image').forEach(i => { const h = i.getAttribute('href'); if (!h.includes('beak') && h !== img) i.setAttribute('href', img); });
  g.querySelector('.body').setAttribute('transform', `translate(${fx} ${by}) scale(${sx} ${sy}) translate(${-fx} ${-by})`);
  const tuck = p.tuck ?? 1 - .2 * clamp((p.ground - p.y - 15) / 40);
  g.querySelector('.legs').setAttribute('transform', `translate(${fx} ${by}) scale(1 ${tuck}) translate(${-fx} ${-by})`);
  stepLegs(g, who, p.step, p.stride);
  g.querySelector('.limb').setAttribute('transform', (p.up || 0) > .01 ? c.limb.up(p.up) : '');
  const arm = c.limb.arm && g.querySelector('.arm');
  if (arm) {
    const a = p.up || 0, { shoulder: [sx0, sy0], move: [mx, my], turn, pivot: [qx, qy] } = c.limb.arm, r = turn * a * Math.PI / 180;
    const dx = c.limb.clip[0] - qx, dy = c.limb.clip[1] - qy;
    arm.style.display = a > .15 ? '' : 'none';
    arm.setAttribute('x1', sx0); arm.setAttribute('y1', sy0);
    arm.setAttribute('x2', qx + dx * Math.cos(r) - dy * Math.sin(r) + mx * a); arm.setAttribute('y2', qy + dx * Math.sin(r) + dy * Math.cos(r) + my * a);
  }

  // sad: worried brows, lids sloping down to the outer corner, a wet shine; sob: squeezed shut under sad brows;
  // half (sleepy): heavy drooping lids over low pupils; closed (asleep): lashes on the curve.
  const eyes = p.eyes || 'open', big = eyes === 'big' ? 1.3 : 1, arcs = ['happy', 'closed', 'sob'].includes(eyes), sad = eyes === 'sad' || eyes === 'sob';
  g.querySelectorAll('.eye').forEach((e, i) => {
    const [ex, ey] = c.eyes[i];
    e.setAttribute('transform', `translate(${ex} ${ey}) scale(${big} ${big * (p.blink ? .08 : 1)})`);
    e.querySelector('.open').style.display = arcs ? 'none' : '';
    e.querySelector('.happy').style.display = eyes === 'happy' ? '' : 'none';
    e.querySelector('.closed').style.display = eyes === 'closed' ? '' : 'none';
    e.querySelector('.sob').style.display = eyes === 'sob' ? '' : 'none';
    const half = eyes === 'half', inner = i === 0 ? 1 : -1; // eye 0's inner corner is toward +x in the art
    const brow = e.querySelector('.brow');
    brow.style.display = sad || half ? '' : 'none';
    brow.setAttribute('d', sad ? `M${-24 * inner} -34 Q${-2 * inner} -40 ${20 * inner} -58` : 'M-22 -36 Q0 -42 22 -36');
    // Lid: the top half-disc, pushed down and turned for sleepy and sad.
    const lidT = half ? 'translate(0 9)' : sad ? `translate(0 -9) rotate(${-20 * inner})` : '';
    for (const c of ['.lid', '.lidline']) { const l = e.querySelector(c); l.style.display = half || eyes === 'sad' ? '' : 'none'; l.setAttribute('transform', lidT); }
    e.querySelector('.wet').style.display = eyes === 'sad' ? '' : 'none';
    const pu = e.querySelector('.pupil'), px = (p.look || 0) * 9 * flip, py = half ? 13 : eyes === 'sad' ? 8 : (p.lookY || 0);
    pu.setAttribute('cx', px); pu.setAttribute('cy', py);
    const sh = e.querySelector('.shine'); sh.style.display = eyes === 'sad' || eyes === 'big' ? '' : 'none';
    sh.setAttribute('cx', px - 4); sh.setAttribute('cy', py - 4);
  });
  const open = p.open || 0;
  if (c.mouth === 'beak') {
    g.querySelector('.jaw').setAttribute('transform', `translate(0 ${open * 26})`);
    g.querySelector('.mouth').setAttribute('ry', open * 22);
  } else {
    g.querySelector('.mouth').setAttribute('ry', open * 20);
    g.querySelector('.smile').style.display = open > .1 || sad ? 'none' : '';
    g.querySelector('.frown').style.display = open > .1 || !sad ? 'none' : '';
  }
}

// Screen position of the top of the head (or any other point `pt` in the art's 1024px coordinates), for things balanced on it or held.
function headPoint(who, p, pt) {
  const c = CAST[who], k = p.h / c.art, [fx, fy] = c.foot, by = fy - 105, [hx, hy] = pt || c.head;
  const ix = fx + (hx - fx) * (p.sx ?? 1), iy = by + (hy - by) * (p.sy ?? 1);
  const lx = (p.flip ?? c.flip) * k * (ix - fx), ly = k * (iy - fy), a = (p.tilt || 0) * Math.PI / 180;
  return [p.x + lx * Math.cos(a) - ly * Math.sin(a), p.y + lx * Math.sin(a) + ly * Math.cos(a)];
}

// Sung syllables: mouth opening for lines [start, eighth, syllables, holdLastUntil?].
function sing(t, lines) {
  for (const [s, e, n, hold] of lines) {
    const i = Math.floor((t - s) / e), ph = (t - s) / e - i;
    if (i < 0) continue;
    if (hold && i >= n - 1 && t < hold) return 1;
    if (i < n) return ph < .7 ? Math.sin(Math.PI * ph / .7) : 0;
  }
  return 0;
}

// Standard page hooks for render.mjs.
function setupShot(duration) {
  window.DURATION = duration;
  window.ready = Promise.all([...document.querySelectorAll('image')].map(i =>
    new Promise(r => { i.addEventListener('load', r); setTimeout(r, 3000); })));
}

// Walk [t0, t1, steps]: walk phase for the legs (pose's `step`), a rock and a bob on each step. Ends on a whole step.
function waddle(t, [t0, t1, n], rock = 7) {
  if (t < t0 || t >= t1) return { tilt: 0, bob: 0 };
  const p = (t - t0) / (t1 - t0) * n, stride = clamp(Math.min(p, n - p) / .6);
  return { step: p, stride, tilt: rock * Math.sin(Math.PI * p), bob: 12 * Math.sin(Math.PI * p) ** 2 };
}
// Foot-down times of a walk, for sound effects.
const stepTimes = ([t0, t1, n]) => Array.from({ length: n }, (_, i) => t0 + (i + 1) * (t1 - t0) / n);
// Touchdown times in a keys track (where it comes back down to `ground`), for sound effects.
function landings(keys, ground) {
  return keys.filter((k, i) => i && ground - k[2] < .5 && ground - keys[i - 1][2] >= .5).map(k => +k[0].toFixed(3));
}
