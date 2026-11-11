# Teeth and a short flight (2026-11-11)

Sanna: "some animals might want to fly a bit too? and some might show teeth at times". Approved step by step on 2026-11-11.
Fold this into `SKILL.md` when the sibling branches are merged.

## Teeth

**Who has them:** cat, bunny, panda, blue dino (from the brushing songs), and since 2026-11-11 dog, monkey, bear (tooth smile + big "aaa"), lion, leopard, fox, zebra, cow, pig, mouse (tooth smile only). Big cats and the fox get no "aaa": an open mouth full of teeth can read as a roar. Beaked animals and the ladybug get none.

**Look (Sanna, binding):** cute, not angry. Small round teeth with air between them, a warm pink-red mouth, a big tongue, and the tooth smile (`flinar`) shows only the upper row (`tandNere: 0`) with happy closed eyes. The "aaa" (`gapar`) shows both rows with open eyes. All teeth clean white (`tander` all 1); the matte ones are for the brushing story.

**There is one tooth system** (`TANDMUN`, `tandmun`, `tandmunRita` in `verktyg/rigg-motor.js`). Never write a second one. To give a rig teeth:
1. `NEUTRAL`: add `glimt: 0, tand: 0, tunga: 0, tandNere: 1, tander: [1, 1, 1, 1, 1, 1, 1, 1]`.
2. `figur()`: after `<path class="mun" fill="${MUNFARG}"/>` add `${tandmun(id, '#a33b45')}`. The second argument is a dark outline that keeps white teeth apart from light fur or a muzzle patch (use it on every light face; the black cat has none). Form: `{ langa: [1, 2] }` gives two longer front teeth (bunny, mouse), `{ spetsiga: [0, 3] }` small rounded points (cat).
3. `rita()`: right before `huvud(fig, p);` add `tandmunRita(fig, f, cx, [rx, ry, d, my]);` with the final mouth numbers of that rig (after its `MY`/`MUNY` offset and `MUNS` scale).
4. `UTTRYCK`: add `flinar` (and `gapar` where it suits) with the rig's own measured `mun`. Copy the other keys from the dog or panda.
5. The default expression sheet: count the entries and widen the grid if needed (7 or 8 across).

**What to measure** (in the 1024 square), per rig:
- the nose's bottom edge and the smile line (from the rig's own mouth comments, or `ansikte_matt.py` on the faced art against the faceless art);
- the light muzzle or face patch the mouth sits on: bbox of `cut/<name>-nos.png` alpha, or by eye on baked fur (Hugo);
- the cheeks, so the mouth stays between them.

Then set `mun = [rx, ry, d, my]`:
- tooth smile `d = 1`: flat top `my` about 10–15 px under the nose, height `4/3 · ry`, inside the patch;
- "aaa" `d = 0.55`: top `my − 0.6 · ry` just under the nose, bottom inside the patch.

**Minimum size:** since 2026-11-11 `tandmunRita` fades teeth and tongue in only when the half-width `rx` is 40–50 px and the height 18–26 px. **A tooth smile needs `rx ≥ 50` and `ry ≥ 26`** (final px), or the teeth vanish. On a small muzzle (cow, pig, mouse) that means the mouth fills most of the patch: that is fine.

**Gotcha, nose line:** rigs whose `.nos` stroke ends at the mouth's `my` (Bulle) draw the line across the upper teeth of an open "aaa". Bulle's line now stops at the gap's top edge, weighted by `f.tand`, so her other faces are unchanged.

**Thumbnail check:** render the default sheet and scale it to ~480 px wide. The tooth smile must still read as a grin, never as a snarl.

**Film beat (Hugo's `?film=1`, after the dance):** 2.4 s, `blanda('glad', 'flinar', k)` eased in over 0.2–0.6 s and out over the last 0.6 s, a 2° lean, and a calm tail wag `10·k·sin(10·tl)`.

Clips: `<name>-tander-2.mp4` in each premium folder. The `-tander.mp4` files were made before the minimum-size rule and are out of date.

## Flight: `flaxa`

**Shared move in the engine** (section `Tänder och flykt`, end of `verktyg/rigg-motor.js`). It is opt-in: rigs that don't list it are pixel-identical. A rig opts in with:
```js
const RORELSE = { …, flaxa: { h: 42, takt: 4.5, arm: [-4, 26], fot: -18, ora: 6, oraSlag: 2.5, titt: -4 } };
const ROR = { ...rorelser(), flaxa, };
```
and adds `flaxa: 'flaxar'` to its `?rorelse` label map.

**The move:** 4 s, like the owl's. Crouch, lift (0.3–1.0 s), hover with a small bob, descend (2.2–2.9 s), landing squash. Feet tucked; ears, tufts or antennae (`oron`) lag; the tail (`svans`) can flick with the beats. The eyes look up 0.2 s before the body rises and a little down before landing. The wingbeats start just before the lift and stop just after landing. Nothing switches on in one frame.

**Numbers per rig** (defaults in `FLAXA0`, which match the owl):

| | h | takt | arm [bas, sving] | other |
|---|---|---|---|---|
| chick `kycklingen-pip` | 42 | 4.5 | [-4, 26] | eager flutter, barely lifts; tuft lags (`ora 6`, `oraSlag 2.5`) |
| duck `ankan-agda` | 50 | 4 | [-4, 24] | no ears (`ora 0`), tail flicks (`svans 8`) |
| ladybug `nyckelpigan-nicke` | 110 | 3 | [-12, 4] | `vinge: true, surr: 8`: two code-drawn wings, arms still |

**Wing angles must stay in the rig's visible arm zone.** The movement adds to the rest angle 8 (`NEUTRAL.armar`), so the arm angle is `8 + bas ± sving`. Rigs with a hiding zone (`GOM`: owl, ladybug) need `8 + bas + sving < GOM.fran` (26), or the arm slides in behind the body mid-beat. Pip and Agda have no hiding zone; their beats reach about 30° (Pip −22 … 30°, Agda −20 … 28°).

**The ladybug's wings** (Sanna chose wings over flapping arms): two pale see-through ovals in code behind the shell (`.vinge`, roots `VINGROT` ~75 px inside the edge, after `const RIGG` so the episode loaders copy them). A fainter copy 14° behind gives a blur. The pose key `vinge: [visibility, angle]`: they unfold from the root (scale 0 → 1) and buzz ±10° at 8 Hz. Any rig can use it: give `POSE0` a `vinge: [0, 0]`, draw the wings, and set `vinge: true` in `RORELSE.flaxa`.

**The owl keeps its own `flaxa`** in `ugglan-ulla/premium/uttryck.html` (not edited here, sibling branch). Switching it to the shared one changes it slightly (the eyes lead, the beats start before the lift), so check a sheet with Sanna first.

Clips: `pip-flaxa.mp4`, `agda-flaxa.mp4`, `nicke-flaxa-vingar.mp4`. `nicke-flaxa-armar.mp4` is the rejected variant.

## Proof (2026-11-11)

- `svg.outerHTML` was fingerprinted at 40 times in every mode of all 25 rigs with `uttryck.html`, before (HEAD c94f3a04) and after: 163 modes identical. Every untouched rig, and every existing mode of Pip and Agda, is unchanged. Only the 11 rigs that got new markup differ (10 teeth, the ladybug's wings, hidden until she flies).
- `ryck.mjs` over all 13 changed rigs prints only `klart`.
- All 13 load and draw through `produktion/youtube/shorts/godnatt/v2-rigg.js`.

## Left for later

- Teeth for the horse (`hasten-hulda`) and the yellow dino (`dinon-disa`): neither has an `uttryck.html` yet. Also not looked at: elephant, hedgehog, lamb, frog, Mor, Olle.
- Tooth beats in the other rigs' `?film=1` (only Hugo has one).
- `flaxa` in the films of Pip, Agda and Nicke; the owl, and maybe the bee's `surra`, onto the shared `flaxa`.
- A sideways `flyga` from A to B (only if Sanna asks).
- The 005/007/013 rig snapshots were not regenerated; they don't have teeth or `flaxa` until someone reruns the generators.
