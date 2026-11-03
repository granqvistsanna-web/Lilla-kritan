// Stepping legs for the Lilla Kvack rigs, drawn behind the body. Art coords (1024px); the art faces -x, so forward is -x.
// Kvack's legs are drawn in code (like the faces): a crayon-orange leg from a hip hidden under the body to a webbed foot,
// so they can be long and bend. Her body is clipped along its own bottom edge (clip), above the drawn-on leg stubs,
// and the white rim there is redrawn (rim).
// Nalle's legs are cut from his art: the body ends at `top`, each leg (split at x `split`) has a hidden extension reaching up
// under the body, so a lifting leg slides up behind it.
// stride/lift in art px, swing in degrees.
const LEGS = {
  kvack: { drawn: true, hips: [453, 590], hip: 790, ankle: 909, fill: '#eb823a', line: '#c9602a', stride: 42, lift: 46, swing: 14,
    clip: '<path d="M0 0H1024V740L710 760L680 779L650 790L622 797L612 799L572 800L566 812L560 820L540 822L500 824L486 823L480 812L472 805L432 805L420 805L400 798L360 790L320 777L300 764L0 740Z"/>',
    rim: '<path d="M426 802Q453 809 480 807M564 808Q590 802 618 796" fill="none" stroke="#fffdf4" stroke-width="10" stroke-linecap="round"/>' },
  nalle: { top: 855, split: 527, hips: [415, 635], stems: [[350, 480], [574, 696]], fill: '#96572f', stride: 10, lift: 38, swing: 5 },
};
const legClip = who => LEGS[who].clip || `<rect width="1024" height="${LEGS[who].top}"/>`;

// A webbed duck foot, ankle at 0,0, toes pointing forward (-x), sole about 26 below the ankle.
const FOOT = 'M10 -6C8 6 2 12 -8 14L-60 10Q-72 14 -62 20L-50 20Q-64 28 -50 30L-34 25Q-40 35 -26 33L-4 24C10 20 16 8 10 -6Z';

// Markup for a character's legs group (drawn behind the body, which addActor clips with legClip()).
function legsHTML(id, who, img) {
  const L = LEGS[who];
  if (L.drawn) return [0, 1].map(() => `<g class="leg">
      <path class="lo" fill="none" stroke="#fffdf4" stroke-width="38" stroke-linecap="round"/>
      <path class="li" fill="none" stroke="${L.fill}" stroke-width="25" stroke-linecap="round"/>
      <path class="foot" d="${FOOT}" fill="${L.fill}" stroke="#fffdf4" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
      <path class="foot" d="M-26 22L-10 14M-44 22L-12 12" fill="none" stroke="${L.line}" stroke-width="3" stroke-linecap="round"/></g>`).join('');
  const { top, split, stems, fill } = L, im = c => `<image href="${img}" width="1024" height="1024" clip-path="url(#${id}-${c})"/>`;
  const ext = ([x0, x1]) => `<rect x="${x0 + 2}" y="${top - 80}" width="${x1 - x0 - 4}" height="86" rx="12" fill="#fff"/>
    <rect x="${x0 + 7}" y="${top - 80}" width="${x1 - x0 - 14}" height="86" rx="8" fill="${fill}"/>`;
  return `<clipPath id="${id}-l0"><rect y="${top}" width="${split}" height="300"/></clipPath>
    <clipPath id="${id}-l1"><rect x="${split}" y="${top}" width="${1024 - split}" height="300"/></clipPath>
    <g class="leg">${ext(stems[0])}${im('l0')}</g><g class="leg">${ext(stems[1])}${im('l1')}</g>`;
}

// step: walk phase counted in steps (0, 1, 2…), each whole step moves the other leg; null/undefined = standing.
// amp (0..1) eases the stride in and out at the ends of a walk so the feet never snap.
function stepLegs(g, who, step, amp = 1) {
  const L = LEGS[who], { hips, stride, lift, swing } = L, i = Math.floor(step || 0), k = (step || 0) - i;
  g.querySelectorAll('.leg').forEach((l, j) => {
    let dx = 0, dy = 0, a = 0;
    if (step != null) {
      const mine = i % 2 === j, e = k * k * (3 - 2 * k);
      dx = amp * (mine ? stride * (1 - 2 * e) : stride * (2 * k - 1)); // stepping: back → front; planted: front → back
      dy = mine ? -amp * lift * Math.sin(Math.PI * k) : 0;
      a = mine ? amp * swing * Math.sin(Math.PI * k) : 0;
    }
    if (!L.drawn) return l.setAttribute('transform', `translate(${dx} ${dy}) rotate(${a} ${hips[j]} ${L.top})`);
    // Drawn leg: hip stays put under the body, the ankle moves; a lifted leg bends back at the middle, toes tip up.
    const [hx, hy, ax, ay] = [hips[j], L.hip, hips[j] + dx, L.ankle + dy], bend = 2.4 * Math.abs(dy);
    const d = `M${hx} ${hy}Q${(hx + ax) / 2 + bend} ${(hy + ay) / 2} ${ax} ${ay}`;
    l.querySelectorAll('.lo, .li').forEach(p => p.setAttribute('d', d));
    l.querySelectorAll('.foot').forEach(f => f.setAttribute('transform', `translate(${ax} ${ay}) rotate(${a}) scale(1.5)`));
  });
}
