---
name: lk-figur
description: Rig, pose and animate a Lilla Kritan ("LK") character in art direction v2, the way Kanel the bunny was done. Parts in a 1024 rig with pivots, movable tummy and muzzle patches, face measured and drawn in code, the pose()/ansikte() blend API, the direction pose, sitting and gripping in a vehicle, deterministic render(t) animation (ears lag, tail wiggle, blink, walk, hop, wave, follow camera, boil), vehicle motion, and Playwright + ffmpeg rendering, plus the gotchas hit along the way. Use when the user says "lk character", "lk figur", "ny figur", "ny lk-figur", "new character for lilla kritan", "v2 character", "v2-figur", "rigga figur", "rig a character", "animera figuren", "animate the character", "pose", "riktningspose", "make a character in art direction v2", or puts a character in a vehicle.
---

# LK figur: rig, pose, animate (art direction v2)

Reference character: Kanel, `assets/karaktarer/kaninen-kanel/premium/` (`rigg-test.html` = rig and motion, `uttryck.html` = expressions and poses, `kanel-rigg.json`, `cut/`). Vehicle: `assets/stiltest-premium/bil/bil-test.html`. Look, places, prompts and rim table: `stil/art-direction-v2.md`, which wins if this skill disagrees.

Scripts in this skill: `templates/rigg.html` (rig page), `scripts/ansikte_matt.py` (face measuring), `scripts/stills.mjs` and `scripts/film.mjs` (rendering). Python tools need numpy, scipy and PIL; if `python3` lacks scipy, use `~/.claude/skills/ai-video/.venv/bin/python -I`.

## 0. Art and cut (short)

1. Design pass, Nano Banana 2 image2image 2K: first take → flatter → **faceless** (`<namn>-faceless.png`) → **body only** (`<namn>-body.png`). Prompts in the doc § Prompter. The user supplies and approves every image; price with `openart_model_cost` first. Keep takes in `premium/original/`.
2. `python3 verktyg/delar.py assets/karaktarer/<mapp>/premium <namn> --egen-kant --oron-svans` → `cut/<namn>-{body,ear-l,ear-r,arm-l,arm-r,leg-l,leg-r,tail}.png` (all 1024², same rim) and `<namn>-rigg.json`.
3. Stub arms: `python3 verktyg/rita-lemmar.py <mapp> <mapp>/cut <x0,y0,x1,y1> --bara arm` from a CLEAN crayon patch. No `--kant`.
4. Rim: `python3 verktyg/tunn_kant.py N cut/<namn>-*.png`, **N = 5 px / display scale** (Kanel 10 at SKALA 0.5).
5. Patches: `python3 verktyg/flackar.py <mapp>/cut <namn> <x,y> mage nos` → `body-tom`, `mage`, `nos` (x,y = clean 96 px patch).

## 1. Rig

**Parts and layer order** (back → front, all `<image width=1024 height=1024>` in one `<g id="figur">`, inside `filter="url(#boil)"`):
ears → tail → legs → arms (`arm-l2` clone first, if used) → `#kropp` [`body-tom` → `mage` → `#ansikte` (`nos` image, cheeks, eyes, mouth)].
Arms and legs sit behind the body, so their roots hide under it. Squash/stretch on `#kropp` around the feet: `translate(512 FOTTER) scale(sx sy) translate(-512 -FOTTER)`.

**Pivots:** `<namn>-rigg.json` `delar.<del>.vridpunkt` → a `RIGG` table in the page. Rotate with `translate(0 dy) rotate(deg px py)` (`vrid(id, deg, dy)`). Kanel: arm-l (212, 567), arm-r (799, 566), leg-l (435, 839), leg-r (601, 835), ear-l (379, 225), ear-r (641, 230), tail (739, 741).

**Movable patches:** baked tummy and muzzle don't follow the face, so they're lifted out (`flackar.py`). `nos` lives inside the face group and moves 100 % with it; `mage` follows about 40 % (bil: face −36 px, tummy −14 px).

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

Copy the API from `uttryck.html` (swap the rig numbers). Names and parameters: top of `karaktarer/kaninen-kanel.md`.
- `ansikte(namn, k)`: `neutral glad jatteglad forvanad nyfiken tanker ledsen somnig fnissig blinkar stolt`. Every expression uses the same parameter set (`NEUTRAL`: ogonS, titt, ogonY, glad, lock, bryn, brynY, brynV, kind, le, leBred, leX, streck, mun, oron, armar, luta, strack), so they blend: `ansikte(blanda('tanker', 'glad', k))`.
- `pose(namn, k)`: `neutral lutaV lutaH vanster hoger haller nar upp ner pekar hurra magen blyg sitter strack huka stampar lyssnar` (`POSE0`: luta, rikt, upp, bred, strack, sank, armar, fram, oron, benFram, ben, benY, benS). Poses stack on expressions: `pose('hurra') + ansikte('jatteglad')`. `blandaPose(a, b, k)`.
- `riktning('vanster' | 'hoger', k)`, or `rikt: −1…1` in a pose.
- `fram: 1` moves an arm in front of the body (hands on the tummy); the layer swaps at 0.5, when the arm is hidden anyway.
- Check sheets: `uttryck.html`, `?ark=poser`, `?bara=<uttryck>`, `?pose=<pose>&bara=<uttryck>`.

**Direction pose** (body always front-on, never drawn or turned to the side):
- face group slides ~36 px (1024 square) toward the side, `scaleX 0.92`, rotates −5°, drops 4 px
- ears tilt 10–12° that way and move 14–22 px
- both arms on that side: near arm + clone ~85 px lower
- far arm hidden with `opacity = 1 − vand`
- body may lean ~2°
- blend with one `vand` 0–1, so the character can turn to the viewer to wave and back

Use it for driving, reaching, holding, pushing.

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
Playwright comes from `~/.claude/skills/launch-video/scripts/node_modules`. mp4 files are git-ignored. For QA renders put the output in the scratchpad.

**Test film / sequencing moves:** Kanel's `uttryck.html?film=1` is the pattern for a longer clip. Keep a list `AVSNITT = [[seconds, tl => [face, pose]], ...]`, find the segment for `t`, and for the first 0.5 s of each segment blend from the previous segment's end state with `blanda` / `blandaPose`, then apply the blink last. Every key you want to blend must exist in `POSE0` (that is why `klapp` and `x` are there). Moves from `ROR` slot in as `tl => ROR.klappa(tl)` with the face arms reset to neutral. Move the figure sideways with the pose's `x` (figure px). A follow camera can call the same pure state function at `t − i·0.05` for the lag.

## 4. Things to consider (gotchas)

- **Rims:**
  - An added rim on top of a baked rim gives a seam and a double-thick rim. Never `--kant` on v2 art.
  - Rims differ by display scale. File rim × scene scale must be equal for everything in a scene (≈5 px at zoom 1; car 14 × 0.47 ≈ Kanel 10 × 0.66). Zoom with the camera, not SKALA.
  - `tunn_kant.py` eats white things (white petals); keep their own rim.
  - On a vehicle, put the rim on the whole thing before splitting, so the seams get no rim.
- **Notches:** a texture patch with a mark in it leaves white V-notches. Pick a clean patch for `rita-lemmar` and `flackar`.
- **Far arm:** rotating it makes its root stick out on the other side, so hide it with opacity.
- **Waving:** past about −55° the arm goes behind the body.
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
- [ ] Face, nose patch and tummy move together; blink, `^` arcs and open mouth read
- [ ] Camera never shows outside the plate
- [ ] Boil doesn't clip at the edges
