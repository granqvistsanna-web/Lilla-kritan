---
name: lk-figur
description: Rig, pose and animate a Lilla Kritan ("LK") character in art direction v2, the way Kanel the bunny was done. Parts in a 1024 rig with pivots, movable tummy and muzzle patches, face measured and drawn in code, the pose()/ansikte() blend API, the direction pose, sitting and gripping in a vehicle, deterministic render(t) animation (ears lag, tail wiggle, blink, walk, hop, wave, follow camera, boil), vehicle motion, and Playwright + ffmpeg rendering, plus the gotchas hit along the way. Use when the user says "lk character", "lk figur", "ny figur", "ny lk-figur", "new character for lilla kritan", "v2 character", "v2-figur", "rigga figur", "rig a character", "animera figuren", "animate the character", "pose", "riktningspose", "make a character in art direction v2", or puts a character in a vehicle.
---

# LK figur: rig, pose, animate (art direction v2)

Reference character: Kanel, `assets/karaktarer/kaninen-kanel/premium/` (`rigg-test.html` = rig and motion, `uttryck.html` = expressions and poses, `kanel-rigg.json`, `cut/`). Vehicle: `assets/stiltest-premium/bil/bil-test.html`. Look, places, prompts and rim table: `stil/art-direction-v2.md`, which wins if this skill disagrees.

**Always, every figure (user rule): long roots.** Ears, tail and legs that sit behind the body and move get a root that reaches ~80 px in under the body, in the part's own colour, aimed at the body's centre (`verktyg/langre_rot.py`, step 3b). Ask for long enough limbs, ears and tail already in the art prompt. A flat cut or body-coloured stump showing at an angle is a bug.

Scripts in this skill: `templates/rigg.html` (rig page), `scripts/ansikte_matt.py` (face measuring), `scripts/stills.mjs` and `scripts/film.mjs` (rendering). Python tools need numpy, scipy and PIL; if `python3` lacks scipy, use `~/.claude/skills/ai-video/.venv/bin/python -I`.

## 0. Art and cut (short)

1. Design pass, Nano Banana 2 image2image 2K: first take → flatter → **faceless** (`<namn>-faceless.png`) → **body only** (`<namn>-body.png`). Prompts in the doc § Prompter. The user supplies and approves every image; price with `openart_model_cost` first. Keep takes in `premium/original/`.
2. `python3 verktyg/delar.py assets/karaktarer/<mapp>/premium <namn> --egen-kant --oron-svans` → `cut/<namn>-{body,ear-l,ear-r,arm-l,arm-r,leg-l,leg-r,tail}.png` (all 1024², same rim) and `<namn>-rigg.json`. With `--oron-svans`, parts above the body **or in its top third** are ears, so droopy ears at the sides (Ludde the lamb) are cut as ears, not arms. Check the labels in the json: two parts with the same name overwrite each other.
3. Stub arms: `python3 verktyg/rita-lemmar.py <mapp> <mapp>/cut <x0,y0,x1,y1> --bara arm` from a CLEAN crayon patch. No `--kant`. Redraw them also when the art's arms are thin wedges lying over the body edge (Ludde): every rotation shows a flat cut root. Hooves or dark paws: darken the far end of the capsule (`t > 0.86` along the axis root → tip) to the hoof colour.
3b. **Long roots (always, user rule):** ears, tail and legs behind the body must reach ~80 px in under it in their OWN colour with a rounded end, or a flat cut / body-coloured stump shows as soon as they tilt (seen on Hulda's ears and tail, Hugo's legs). `python3 verktyg/langre_rot.py <mapp> <namn> ear-l ear-r tail leg-l leg-r` (originals to `cut/v1/`). Skip ears that hang in front of the head (Hugo). The root aims from the pivot at the body's centre (not from the part's middle, which sent Kaj's S-tail root out under the body). Long thin parts (a cat's tail) and small pointed ears move little: tail swish ±3–5° slow, ears ±5°; big swings make them look like they fly off. When prompting new art, ask for limbs, tail and ears that are clearly long enough to tuck in behind the body. Long art arms (Olle): `--axel` makes the root follow the arm's own axis; the script also replaces the art's seam line next to the body. Their `-fram` copies fade the WHOLE root (alpha × `clip((t − 0.3)/0.25)`), not just the rim, or the root shows as a lighter band on the tummy; and turn long arms only a little when lying down, or the root pokes out at the shoulder.
4. Rim: `python3 verktyg/tunn_kant.py N cut/<namn>-*.png`, **N = 5 px / display scale** (Kanel 10 at SKALA 0.5). Near-white parts (cream paws, tail tips) get eaten: warm them slightly first (Kaj: × 0.975 / 0.955 / 0.9).
5. Patches: `python3 verktyg/flackar.py <mapp>/cut <namn> <x,y> mage nos` → `body-tom`, `mage`, `nos` (x,y = clean 96 px patch).

## 1. Rig

**Parts and layer order** (back → front, all `<image width=1024 height=1024>` in one `<g id="figur">`, inside `filter="url(#boil)"`):
ears → tail → legs → arms (`arm-l2` clone first, if used) → `#kropp` [`body-tom` → `mage` → `#ansikte` (`nos` image, cheeks, eyes, mouth)].
Arms and legs sit behind the body, so their roots hide under it. Squash/stretch on `#kropp` around the feet: `translate(512 FOTTER) scale(sx sy) translate(-512 -FOTTER)`.

**Pivots:** `<namn>-rigg.json` `delar.<del>.vridpunkt` → a `RIGG` table in the page. Rotate with `translate(0 dy) rotate(deg px py)` (`vrid(id, deg, dy)`). Kanel: arm-l (212, 567), arm-r (799, 566), leg-l (435, 839), leg-r (601, 835), ear-l (379, 225), ear-r (641, 230), tail (739, 741).

**Movable patches:** baked tummy and muzzle don't follow the face, so they're lifted out (`flackar.py`). `nos` lives inside the face group and moves 100 % with it; `mage` follows about 40 % (bil: face −36 px, tummy −14 px).

**Ear roots:** an ear part cut with `delar.py` carries a strip of the body's white rim, which shows as a white line above the ear as soon as it tilts. Kanel's ears stand above the head, so `uttryck.html` clips them (`#orrot`, y < 308). For ears at the sides, rebuild each ear as: ear pixels outside the body + a rounded root (capsule r ≈ 40 from the contact point ~30 px into the head, filled with the body's own crayon) + the same 10 px white rim under both. A tilted ear then shows a soft base, never a line or a gap. Pivot at the root inside the head (Ludde ear-l (310, 305), ear-r (708, 303)). In `rigg-test.html`, let ears, arms and tail follow the body's squash (`(SX−1)·(x−512)`, `−(SY−1)·(FOTTER−y)`), or the ear roots stick up on landing.

**Arms in front of the body** (walk back arm, clap, `magen`) use their own file `cut/<namn>-arm-l-fram.png` / `-arm-r-fram.png`: the same arm with the white rim faded out along the arm (alpha × `clip((t − 0.45)/0.35, 0, 1)`, t = 0 at the root, 1 at the tip). Arms drawn by `rita-lemmar` are the body's own crayon, so the root melts into the tummy and the arm grows out of the body instead of floating in front of it. In `figur()` the front-layer copies point at `-fram`. Swap to the front copy only at `fram > 0.85` (not 0.5), when the arm is nearly in place; otherwise its rimless root shows while it slides out past the edge.

**Clap (standard since 2026-11-10): hands meet in front of the chest**, even with short arms. Three claps (1.0, 1.5, 2.0 s in a 3 s loop) with a small body bounce and four short crayon strokes (`.gnista`) out from the hands. The arms stay one-piece nubs (no bent code arms, no lag/settle): they come out at the edges as in the edge clap (0–0.4 s), then the pivot slides in over the tummy (`klapp` px) so the short arm reaches the middle. Only the hand shows: `-klapp` copies made by `python3 verktyg/klapparm.py assets/karaktarer/<mapp>/premium <namn>` (= `-fram` with the whole root faded in alpha; needs `cut/<namn>-arm-{l,r}-fram.png` and the pivots in `<namn>-rigg.json`). Code to port (Ulla's or Rut's `uttryck.html`): the two `-klapp` images and the `.gnista` group after the `-fram` arms in `figur()`; `hand: 0, gnista: 0` in `POSE0`; `vis = fram > 0.85 ? (p.hand > 0.5 ? 2 : 1) : 0`; the stroke block before `lager(...)` in `rita()`; `KLAPPTYP`, `KLAPPNY`, `klappNy`, and `klappa` choosing between `klappNy` and `klappaKant`. Measure per rig: L = farthest arm pixel from the pivot (the script prints it); contact angle −144 (tip ~15° up, from the arm's rest axis, 130° on most rigs; Greta's 125° gives −140); slide at contact = (midpoint of the two arm pivots) − left pivot x − L·cos15° + 3; open −126 and 40 px less; `spets` = L·sin15°; `y` so the hands meet on body colour, never on the face, muzzle/snout/trunk, eye patches or a tummy patch.

**Edge clap stays as `?klapp=kant`** (the old short-arm clap): tummy pats at the body's edges: `armar −95 + 26·c`, `klapp 40 − 16·c` (Kanel: `−160 + 22·c`, `192 − 66·c`), and `magen: armar [−95, −95], fram [1, 1], klapp 40`.

**Second arm clone** for the direction pose: `<image id="arm-l2">` (same file as the near arm, same pivot) placed first in the figure. `uttryck.html` makes `arm-l2`/`arm-r2` per figure.

**Face in code.** Measure it for a new character from the faced art against the faceless art (they're pixel-aligned):
```bash
python3 .claude/skills/lk-figur/scripts/ansikte_matt.py premium/original/<namn>-platt.png premium/original/faceless-a.png
```
Prints each differing blob in the 1024 square: `mörk` = eyes (centre, rx, ry), `rosa` = cheeks, `annat` = mouth/smile (its centre gives the mouth x and y). On Kanel it gives eyes (419, 401) and (601, 401) rx 17 ry 25–26, cheeks (383, 452) and (637, 452) rx 28–30 ry 18, mouth (512, 461), which match the rig. Then draw:
- eyes: ellipse rx/ry from the measure, `#2a1d1a`, shine circle r 6 at (−6, −10) white; happy `^` arc `M-20 6 Q0 -18 20 6` stroke 7
- cheeks: ellipse `#ec8f96`, opacity 0.75 → 1 when happy
- mouth: Kanel `M512 440 L512 454 M484 452 Q498 468 512 454 Q526 468 540 452` stroke `#3a2a22` 5; scale it to the measured width. Open mouth: ellipse `#7a2a1c` under the nose, `ry = mun × 16`, smile hidden when `mun > 0.15`.

Start from `templates/rigg.html`: fill `{{namn}} {{Namn}} {{bakgrund}} {{egen}} {{ljud}}` and re-measure everything marked `MÄT OM` (RIGG, OGON, KINDER, FOTTER, SKALA, mouth).

## 2. Posing

The API is in `verktyg/rigg-motor.js` (shared) and the figure's `uttryck.html` (its own poses and expressions). Names and parameters: top of `karaktarer/kaninen-kanel.md`.
- `ansikte(namn, k)`: `neutral glad jatteglad forvanad nyfiken tanker ledsen somnig fnissig blinkar stolt`. Every expression uses the same parameter set (`NEUTRAL`: ogonS, titt, ogonY, glad, lock, bryn, brynY, brynV, kind, le, leBred, leX, streck, mun, oron, armar, luta, strack), so they blend: `ansikte(blanda('tanker', 'glad', k))`.
- `pose(namn, k)`: `neutral lutaV lutaH vanster hoger haller nar upp ner pekar hurra magen blyg sitter strack huka stampar lyssnar` (`POSE0`: luta, rikt, upp, bred, strack, sank, armar, fram, oron, benFram, ben, benY, benS). Poses stack on expressions: `pose('hurra') + ansikte('jatteglad')`. `blandaPose(a, b, k)`.
- `riktning('vanster' | 'hoger', k)`, or `rikt: −1…1` in a pose.
- `fram: 1` moves an arm in front of the body (hands on the tummy); the layer swaps at 0.5 for Kanel, 0.85 with `-fram` arms (see Arms in front of the body).
- Check sheets: `uttryck.html`, `?ark=poser`, `?bara=<uttryck>`, `?pose=<pose>&bara=<uttryck>`.

**Direction pose** (body always front-on, never drawn or turned to the side):
- face group slides ~36 px (1024 square) toward the side, `scaleX 0.92`, rotates −5°, drops 4 px
- ears tilt 10–12° that way and move 14–22 px
- both arms on that side: near arm + clone ~85 px lower
- far arm slides IN behind the body (`dx = inward × 200 × vand`) and the clone slides OUT from behind the body (`inward × 200 × (1 − vand)`): arms go in and out, never fade (user feedback). Hide the far arm only once `vand ≥ 0.98`. `bil-test.html` does the same: `arm-r` slides `−200 × vand` with its angle eased to 0°.
- body may lean ~2°
- blend with one `vand` 0–1, so the character can turn to the viewer to wave and back

Use it for driving, reaching, holding, pushing.

**Walking sideways (every character, user-approved variant B):** face and tummy slide toward travel as in the direction pose (`rikt`), but the arms are NOT both on the travel side:
- back arm (away from travel) in FRONT of the body at its edge, sticking out a little: `translate(side·55, 20)`, angle `side·(−18 + 14·sving)`
- front arm behind the body, peeking out on the travel side: `translate(−side·60, 10)`, angle `side·(−10 − 14·sving)` (opposite phase)
- clones hidden; blend in/out with `gang` 0–1 (`mix` from the normal arm), back arm swaps layer at 0.5; nothing fades
- ears calm: `clamp(vy × 0.3, ±8)` + flutter ±1; ease to front-on over 0.5 s at start and stop
Reference code: `steg()` and the `p.gang` branch in `rita()` in Kanel's `uttryck.html`. Numbers are in the 1024 square; re-check them on a differently shaped character with a stills sheet.

**Sitting:** splayed legs (40°) must be lifted (`benY −40`) or their roots poke out under the tummy.

**Sitting in a vehicle:** layers back panel → object behind the hands (steering wheel ring and column) → figure → front panel (everything below the cab's inner bottom edge) → wheels. Legs are left out: they're hidden by the front panel. Fill the cab opening behind the wheel with cream in the back layer so the wall doesn't show through.

**Gripping:** the arm stays a figure part, behind the body; the figure group sits in front of the object, so the hand lands on top of it. Aim the arm with its rotation (bil: `arm-l` 66° + steering × 0.6). With the direction pose off, the lower clone arm sinks into the vehicle.

## 3. Animation

**Pattern:** one `render(t)` that computes everything from t (seconds), with no state between frames except a sound latch. The page loop `(function loop(){ if (!window.stilla) render((performance.now()-start)/1000); requestAnimationFrame(loop); })()`; `window.stilla = true` stops it so a renderer calls `window.render(t)` frame by frame. Helpers: `lerp`, `mjuk = k → k²(3−2k)` (clamped), `vrid`.

Kanel's numbers (`rigg-test.html`, 9 s loop: 0–3 wave, 3–7 walk, 7–9 hop):

| Motion | Values |
|---|---|
| Ears lag | `ora = clamp(vy × 0.9, ±25)`; ear-l −ora + flutter, ear-r +ora − flutter; flutter `sin(t·5)·2`. In the car add `kor × 8` wind |
| Tail | rest `sin(t·3)·3`; wag `sin(t·34)·18` for 0.6 s every 4.5 s (t mod 4.5 in 3.6–4.2); play the sound once per wag (latch), not when `stilla`. Sound for now `assets/ljud/effekter/puff/puff-2.m4a` |
| Blink | eyes `scale(1 0.08)` for 0.12 s every 3.1 s (car 3.3 s) |
| Walk | phase `s = (T−3)·2.4`, `f = sin(sπ)`; legs ±16°, foot lift `max(0,∓f)·−40` px; tilt `f·5`°; bob `−|f|·12` px; arms `8 − f·20` / `−8 − f·20`; ease in/out 0.3 s; eyes look 7 px toward travel |
| Hop | crouch 0.35 s `sy 1−0.12·sin`, `sx 1+0.1·sin`; air 1.0 s, height 260 px parabola; in air `sy 1.08 sx 0.94`, arms ±40°, feet −30 px, happy; landing squash 0.3 s; shadow `rx 170·(1−0.4·h)` |
| Wave | arm-r −8° → −38° over 0.4 s (`mjuk`) + `sin(T·14)·14`; body tilt `sin(T·7)·2`; happy eyes; "hej!" mouth 0.5–1.1 s. Keep the arm above about −55° |
| Camera | close-up zoom 2.0 (1920×1080 plate), figure ~78 % of height; x follows the mean of 12 samples 0.05 s apart (0.6 s lag), `tx = clamp(1000 − fx·Z, 1920−1920Z, 0)`; y `ty = clamp(1030 − (MARK + y·0.7)·Z, 1080−1080Z, 0)` (70 % of a hop). `?vy=hela` = zoom 1. Car: fixed zoom 1.2 |
| Boil | `feTurbulence fractalNoise baseFrequency 0.025 numOctaves 2` + `feDisplacementMap scale 5`; seed `floor(t·10) % 50 + 1` (re-seeded every 3 frames at 30 fps). Filter region `filterUnits="userSpaceOnUse" x=-100 y=-100 width=2120 height=1280` |

**Vehicle** (`bil-test.html`, 12 s loop: idle, start, drive, brake, stop and wave):
- speed `fart(T)` = 260 px/s × eased ramps (`mjuk`) up 1.5–2.5 s, down 9–10.2 s; distance `s` integrated numerically from t, so it stays deterministic
- wheel spin `deg = −s / R × 180/π` (R = 236 × scale); a light hub dot shows the spin
- world scrolls: each prop `x = ((x0 + s) mod 2800) − 400`, in a behind group or a front group
- exhaust: 8 pooled puffs, one born every `0.7 − 0.35·kor` s, life 1.3 s, radius `16 + 40√k`, rise 110 px/s, left behind in the world (offset `s − s_born`), solid white with a light grey edge, fading over the last 45 %
- lamp: a group in code, `opacity = mjuk((T−0.6)/0.15)·mjuk((11.7−T)/0.15)`, no rays
- brake lurch: `sin((T−9.6)/1.4·2π)·exp(−2.5(T−9.6))`; car rotates `−2.2°×` it around the front-wheel bottom, figure `−3°×` it and bounces +10 px
- start lurch +1.2°; engine shake `sin(t·23)·1.2`; road bumps from `s`

**Rendering** (headless; rAF doesn't run while the preview pane is hidden). The scripts serve the repo on localhost, set `window.stilla`, call `render(t)` and screenshot the `<svg>` at 1920×1080:
```bash
node .claude/skills/lk-figur/scripts/stills.mjs <page relative to repo> <out-prefix> 0.4 1.2 5 7.8
node .claude/skills/lk-figur/scripts/film.mjs <page relative to repo> <out.mp4> <seconds>   # 30 fps JPEG frames → ffmpeg x264 crf 20
```
**Contact sheet (use this for motion QA):** give `stills.mjs` an output ending in `.jpg` and it makes ONE sheet, frames in the order given, the time stamped in the corner, 4 across:
```bash
node .claude/skills/lk-figur/scripts/stills.mjs "<page>?rorelse=hoppa" <scratchpad>/hop.jpg 0.30 0.33 0.36 0.40 1.30 1.33 1.36 1.40
```
Loose PNGs tiled with a `*` glob sort wrong (12.2 before 3.5); the sheet keeps the order. To find pops, sample 0.03 s apart (one frame) across every switch in the code: takeoff, landing, a layer swap, a segment change.

Playwright comes from `~/.claude/skills/launch-video/scripts/node_modules`. mp4 files are git-ignored. For QA renders put the output in the scratchpad.

**Rig test page (v2 figures):** a 15 s loop: 0–3 wave, 3–7 walk, 7–9 hop, 9–11 clap (short-arm tummy pats with `-fram` arms cloned and appended last in `#figur`, swap at `framK > 0.85`), 11–15 sleep LYING DOWN (user: not standing): eyes close first (glad arcs flipped `scale(1 -1)`), then from 0.5 s the figure tips −82° around the feet onto its side, head left, lifted by the egg's lowest point after rotation (`KROPP = {cy, rx, ry, H}` measured from body.png) so it rests on the floor, x shifted back by `SKALA·cy·sin(a)` so the body stays centred (not behind the grass), arms folded in (−60/+60), legs tucked, breathing, o-mouth, z's rising from the head, wider shadow; gets up over the last 0.7 s. Reference: `assets/karaktarer/hasten-hulda/premium/rigg-test.html`.

**Test film / sequencing moves:** Kanel's `uttryck.html?film=1` is the pattern for a longer clip. Keep a list `AVSNITT = [[seconds, tl => [face, pose]], ...]`, find the segment for `t`, and for the first 0.5 s of each segment blend from the previous segment's end state with `blanda` / `blandaPose`, then apply the blink last. Every key you want to blend must exist in `POSE0` (that is why `klapp` and `x` are there). Moves from `ROR` slot in as `tl => ROR.klappa(tl)` with the face arms reset to neutral. Move the figure sideways with the pose's `x` (figure px). A follow camera can call the same pure state function at `t − i·0.05` for the lag.

## 3b. Motion review (2026-11-10)

**Where the motion lives (shared engine since 2026-11-10).** `verktyg/rigg-motor.js` holds everything that is the same for every figure: the blend helpers (`mix fyll blandare kl mjuk P`), `ansikte pose riktning forsta`, `steg`, `klappNy`, `liv`, `rorelse` and the standard moves `rorelser()` (`klappa klappaKant hoppa ga dansa`, plus `sova`/`ligga` when the figure has the `sover`/`liggMage` poses). **One edit there changes all 22 rigs with arms.** Each `uttryck.html` loads it after `blinka.js` and keeps only what is its own: `RIGG` and measurements, `NEUTRAL/UTTRYCK`, `POSE0/POSER`, `figur()`, `rita()`, the `blanda/blandaPose/param` line, `blinka`, `KLAPP/KLAPPNY`, the page modes and the `?film=1` sequence, and:
```js
const RORELSE = { svans: null, hoppArm: () => 32, kant: { v: -95, dv: 26, in: 40, din: 16, ner: 0 } };   // only what differs from RORELSE0
const ROR = {
  ...rorelser(),
  kvacka: t => { … },          // the figure's own moves; one with a standard name replaces the standard
};
```
Settings and their defaults are in `RORELSE0` at the top of the engine (tail function, key and amplitude in walk and dance, `oron: false`, step lean, hop arm, hop numbers, edge-clap numbers, clap start, dance arms). Keep the `const ROR = {` … `};` shape: the episode loaders find the rig code by slicing from `const RIGG` to the `};` that closes `ROR`. Figure-specific versions today: Humle `hoppa`/`dansa` (wing buzz), Mille `klappaKant`/`dansa`, Agda `kvacka`, Humle `surra`. `fjarilen-fia` (flies) does not use the engine.

**Who loads the rig code.** `produktion/youtube/shorts/godnatt/v2-rigg.js` and `avsnitt/016-…/scener/natt.js` fetch `uttryck.html` live and put `rigg-motor.js` first (only when the page loads it, so Fia still works). `avsnitt/005`/`007` `scener/gor-v2.py` and `013 storyboard-v2/bygg.mjs` write snapshot copies; they now add the engine and `blinka.js` first (before that, rerunning them gave pages that failed on `skapaBlinka`). The committed snapshots were not regenerated, so 005, 007 and 013 keep the motion they were made with until someone reruns the generator.

**Film helpers (in the engine since 2026-11-10).** The `?film=1` block keeps its `AVSNITT` list, scene, sleep picture and `render`, and takes the rest from the engine:
```js
const { gang, vinka, stilla, ror } = filmHjalp({ svans: t => svans(t), vinkArm: [38, 16] });   // only what differs
const LANGD = AVSNITT.reduce((s, [d]) => s + d, 0), lage = filmSekvens(AVSNITT, LANGD);
// in render: filmKamera(t, lage, p, SK, MARK, Z); filmZzz(fig, ts, [x, y]);   when building: filmZzzKant(fig)
```
`filmHjalp` options: `svans` (the film's tail; default `RORELSE.svans`), `svansGang` (default `RORELSE.svansGang`; `null` = no tail in the walk), `vinkArm [base, swing]` (default `[92, 12]`), `vinkKawaii` (`vinka(d, kaw)`, Bulle and Igge). Also `fjader` (landing spring), `filmZzzSov(fig, sb, SOV.z)` for the sleep-picture zzz (Bulle, Kanel, Ludde). The `film` prefix is deliberate: `kit.js` (005/007) and `scen-kit.js` (013) declare a global `kamera`, and the generated rig snapshots load in the same page. Own versions kept: Kanel `vinka`/`stilla`, Gurra's zzz, Hugo's sequencer and camera, all of Fia.

**Still copied per figure:** `rita`/`figur` (the drawing really differs). `rigg-test.html` exists only for nine older figures; use `uttryck.html?film=1` and `?rorelse=<namn>`. `templates/rigg.html` predates the engine: for a new figure copy Ulla's or Rut's `uttryck.html` instead.

**Proving a refactor changed nothing:** fingerprint `<svg>.outerHTML` at 40 times in every mode of every rig before and after (wait one microtask after `render(t)`: Igge's rim copies follow the arm through a MutationObserver), and compare. For pages with random ids or measured rims (016 uses `kant.js` and `Math.random`), seed `Math.random` in an init script and compare screenshots pixel by pixel instead. The 2026-11-10 moves: engine, 264 rig modes identical, godnatt shorts identical, 016 within 8 px over 48 frames; film helpers (films sampled at 120 times), 264/264 identical, godnatt 11/11 and 016 0 px against HEAD, and the 005/007/013 generators rerun and loading without errors (snapshots restored).

**Checklist when a move is added or changed** (sample with a contact sheet, see Rendering):
- [ ] No one-frame pops. Anything switched by an `if` on time (stretch, tucked feet, raised arms, ear angle) must be multiplied by an ease of about 0.1 s, not turned on.
- [ ] Nothing is frozen. A held pose still breathes, and the tail and ears keep their rest sway; only blink and boil moving reads as a still image.
- [ ] The eyes go first: `titt` leads a walk, reach or turn by about 0.2 s.
- [ ] A loop does not repeat bar for bar for more than about 4 s without an accent.
- [ ] Still inside the user's rules: one-piece arms (no bent arms, no lag or settle on arms), no spins or flips, calm hops, arms slide in and out behind the body.

**Motion fixes in every rig (2026-11-10, user-approved on the owl first; before/after film `assets/karaktarer/ugglan-ulla/premium/ulla-fore-efter.mp4`).** Port these when a rig or an episode engine is copied:
- `hoppa`: `kant = mjuk(l/0.1)·mjuk((1−l)/0.1)`, `fart = |1−2l|·kant`; stretch `sy = 0.1·fart`, `sx = −0.075·fart` (Mor 0.075/−0.0625), feet `−30·kant`, ear lag `vy·kant`, happy eyes `kant`. Nothing switches on in one frame, and the stretch is biggest at takeoff and landing, none at the top.
- `liv(f, p, t)`: breathing on everything awake, a 3.6 s cycle, `strack +0.012·a`, `bred +0.006·a`, ears `−2·a`; applied in `rorelse()` and in the film's `lage()`. Skipped when `sov > 0.5` (the sleep moves breathe themselves).
- `dansa`: the sixth bounce (T 2.5–3 s) is a small hop, `lyft −(14+26)`, `strack 0.05`.
- `gang()` in the film: the eyes lead the walk by 0.2 s (`titt`), and the step clock is `0.5·tl + 0.5·d·mjuk(tl/d)`, so the step rate follows the speed halfway (fully made the mid-walk steps hurried).

**Not covered yet:** `fjarilen-fia` (flies, other moves), Humle's film (it has none), the standalone `?rorelse=ga` loop (fixed step rate, a jump where the 8 s loop wraps). Kanel's own `vinka`/`stilla`, Hugo's sequencer and Fia's film are still per-figure copies.

## 4. Things to consider (gotchas)

- **Rims:**
  - An added rim on top of a baked rim gives a seam and a double-thick rim. Never `--kant` on v2 art.
  - Rims differ by display scale. File rim × scene scale must be equal for everything in a scene (≈5 px at zoom 1; car 14 × 0.47 ≈ Kanel 10 × 0.66). Zoom with the camera, not SKALA.
  - `tunn_kant.py` eats white things (white petals); keep their own rim.
  - On a vehicle, put the rim on the whole thing before splitting, so the seams get no rim.
- **Notches:** a texture patch with a mark in it leaves white V-notches. Pick a clean patch for `rita-lemmar` and `flackar`.
- **Far arm:** rotating it makes its root stick out on the other side, so hide it with opacity.
- **Roots, Ludde:** a white line above a tilted ear = the body's rim strip in the ear part (rebuild with a rounded root); an arm floating on the tummy = a front arm with a full rim (use `-fram`); hooves floating mid-tummy = arms too short to clap (pat at the edges). Check a stills sheet every 0.5 s of the test film, cropped close; zsh needs `${=TS}` to split a list of times.
- **Waving:** past about −55° the arm goes behind the body.
- **Arms don't fly:** when turning or switching pose, keep the arm's angle and slide it in/out behind the body (bil-test: `arm-l2` keeps `50 + ratt·0.6` and slides `+200·(1−vand)`, `arm-r` keeps −38°). Blending two poses whose arm angles differ a lot (hurra 70° → clap −160°) swings the arm through the air: lower the arms inside the first segment instead. Only the gesture itself (wave, clap) may swing an arm.
- **One arm looks shorter at a half turn** (013, kaninen in the truck): if the far arm slides in and the clone slides out linearly with `vand`, both are half hidden at `vand` ≈ 0.5. Slide them only near a full turn: `e = mjuk((vand − 0.55) / 0.43)`, clone `IN·(1 − e)`, far arm `IN·e`, clone visible only while `e > 0`. Code: `storyboard-v2/kanel-motor.js` in 013.
- **Paw on the hood:** in a vehicle the arm on the hood side hides behind the bodywork. Raise it (013: `armar[0] + 32`) so the paw shows over the hood.
- **Clap that reads:** the hands must meet in front of the body (v2 rigs: on body colour, see Clap above) (013 frog: `KLAPP = c => [−112 + 30c, 200 − 120c, 36]`). If they meet beside the body, nobody sees a clap.
- **Mouths in a dance:** open only on the beat (smoothstep of the beat accent) and scale the open mouth to ~0.72, or the faces look like different characters.
- **Goodbye with a vehicle:** stagger the waves (0.25 s apart), and let the vehicle drive up from the back through a gap between the dancers, growing smoothly, while the dancers shrink. 013: `discot/scen.js`, segment 12d.
- **Mirrored scenes:** if a scene is drawn mirrored (013), a positive x offset moves things LEFT on screen and `arm-l` is on the screen-right side. Check a still before changing a sign.
- **Folded parts:** hide a part's post or hinge when it is folded away (013's ladder post showed as a tiny square beside the bunny).
- **Baked patches:** baked light patches (tummy, muzzle) don't follow the face, so lift them out.
- **Image2image edits aren't pixel-aligned** (~2 % differs), so cut every part from ONE image.
- **Jagged parts:** parts cut from art (the steering wheel) come out jagged. Draw them in code or generate them as separate clean art (bil: ring, column and spoke are SVG strokes with a white 68/56 px under-stroke as rim).
- **Colours:** props the same colour as the wall vanish (green trees on a green wall, so the car scene uses the teal wallpaper).
- **Trees** stand on the floor, their base below the horizon line, not on it.
- **SVG filter region** defaults to the bbox ±10 %/20 % and clips strokes and displaced edges. Use `filterUnits="userSpaceOnUse"` with a region larger than the scene.
- **Hidden preview pane:** rAF doesn't run there, so render headless with the scripts.
- **Never spin or turn a flat figure.** Direction is the direction pose; hops stay calm.
- **Project rules:**
  - no animal names in anything spoken or sung ("Hej kaninen!")
  - never name existing series
  - figures with `✅ Referensark klart` are locked
  - filenames lowercase with hyphens, no å/ä/ö
  - new character note from `karaktarer/_mall.md` + README, then `python3 verktyg/prompt.py --lista` runs clean

## 5. QA

Render stills at the key moments (wave peak, mid-step, hop peak, landing squash, `?vy=hela`, every pose sheet, direction pose at `vand` 0, 0.5, 1) and check:
- [ ] Same rim width on every part and prop
- [ ] No notches, no seams between body and parts
- [ ] No clipped layers or poking roots (far arm, ears in the direction pose, wave arm)
- [ ] Long roots: `langre_rot.py` run on ears, tail and legs; at the hop peak, landing, mid-step, tail wag and lying down, no flat cut or stump shows (crop close)
- [ ] Face, nose patch and tummy move together; blink, `^` arcs and open mouth read
- [ ] Camera never shows outside the plate
- [ ] Boil doesn't clip at the edges
