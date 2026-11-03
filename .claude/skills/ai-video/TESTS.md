# AI video tests

## Round 1 — 2026-11-03 (Wan 3.0, 480p, 5s, no audio, seed 4242)

Shot: character stands on a path, ball rolls in from the right, stops at their feet ~2s, character waves.

| # | Route | Model | Credits | Verdict |
|---|---|---|---|---|
| 0 | Bible: character, empty park plate, ball (text2image) | nano-banana-2 | 3 × 20 | Works. Plates on plain paper came out clean and reusable. |
| A | Refs only (girl, park, ball) + text action | wan3-0 element2video | 100 | **Works.** On-model, ball rolls in, wave. The model picked its own framing (girl larger, centred) and the ball's resting spot jumps a little between frames. |
| B | Refs + stick-figure animatic as video ref | wan3-0 element2video | **200** (a video ref doubles the price) | **Works, and the guide is obeyed.** Character size, x-position, ball entry timing and stopping point all match the stick-figure video; no stick-figure look leaked into the output. Use it when exact staging matters (several things moving, matching cuts); skip it for simple one-action shots. |
| C | Keyframes: start + end image (bunny), image2video with endFrame | nano-banana-2 ×2 + wan3-0 image2video | 40 + 100 | **Works.** Ball enters on cue, bunny stays on-model every frame, waves at the end. Background did not drift. Best result per credit so far. |

Notes
- Keyframe pairs drift slightly in subject size/position between start and end images; the video smooths it, but generate the end frame FROM the start frame (image2image on the start) to keep it tighter.
- Audience change mid-test: target is 2-year-olds → animal characters, rounder, simpler.

| E | Crayon-blob duckling on solid white, refs only (1 image), "blink, two hops, flap wing, tilt head" | wan3-0 element2video | 100 | **Works well.** Crayon texture and shape held on every frame, blink + squash on landing + head turn + flap all happened. One glitch: a second wing appears on the far side during the flap (the ref shows one). Fix next time: a character sheet with front + side view, or say "only one wing visible". |

| F | Duckling + small red ball + big teal ball on white, 6s, refs + two-ball stick guide (bounce helper) | wan3-0 element2video | 220 | **Works.** Full choreography followed in order and on time: small ball bounces in and settles, duckling hops, big ball bounces in high from the right, duckling jumps back left, waves. Crayon texture held on all three objects. Off: the big ball came out ~2× bigger than the guide (references' own size seems to win over the guide's circle size), and a second wing appears in some frames again. White went slightly grey. |

## Style findings

- Neat crayon prompt → comes out as coloured pencil, not messy. Even "kindergarten messy" prompts stay tidy on nano-banana-2.
- Target style (user refs): bold flat shapes, grainy risograph-like fill, scratchy pencil hatching inside fills, thin white cut-out edge around characters, wobbly felt-tip black details, dot eyes, flat single-colour wall + white floor, grey oval shadow. First prompt gave a clean vector look; second pass asking for "hand-made instead of vector: grainy noise like risograph, scratchy pencil hatching, wobbly felt-tip line, irregular white edge" nailed it.
- Flat two-colour plates are ideal for video: nothing in the background to drift.

## Round 2 — 2026-11-03, music test (Lilla Kvack song v2, 96 BPM)

| # | Route | Model | Credits | Verdict |
|---|---|---|---|---|
| R1 | Chorus on white: duckling + turnaround sheet + white bg image + **beat-timed stick guide** (7 moves in 6s, timed to the sung eighth notes) | wan3-0 element2video, 6s | 220 | **Works: on the words within ~0.1s.** Tracked the duckling's height per frame: 3 hops (apex 1.1/1.5/1.8 vs guide 1.14/1.46/1.78), drifts right like the guide, "upp" jump, squash on "ner", big "opp" jump and wave all on time. Weak: the "runt" turn became a small wiggle (stick figures can't show a turn). Background still grey (226) despite a white bg ref → fixed free in ffmpeg `colorlevels=rimax=0.88:gimax=0.88:bimax=0.88`. Turnaround sheet: no second wing, no duplicate duckling. |
| V1 | Garden: duckling + red ball + garden image, refs only, calm single action | wan3-0 element2video, 5s | 100 | **Works.** Ball rolls in from the right and stops, duckling turns to look; background unchanged; ball size right ("half as tall as the duckling" in words). |
| cut | Intro zoom + R1 + R1 last-frame hold + V1 + V1 hold, song on top | ffmpeg | 0 | 30s cut at `AI Video Tests/assembly/test-cut-30s.mp4`, script `build-test-cut.sh`. |

Findings
- Check a guided clip with **per-frame tracking** (yellow-pixel top/bottom/x per frame), not a few stills: stills at landing moments made a good clip look motionless.
- When the song is regenerated, words keep their place in the bar, so retime a guide by scaling all times by new/old line length.
- A white bg reference does NOT keep white; plan on the ffmpeg levels fix.

| G | Shot F rebuilt in code: the same duckling + ball PNGs as layers (legs split off below y 800, a wing cut out with an ellipse, the drawn wing covered by a body-texture patch), SHOTS keys copied from the two-ball guide, squash/stretch from vertical speed, rolling spin, SVG feTurbulence "boil", per-image multiply blend so white drops out | HTML/SVG + render.mjs | **0** (12s render) | **Works.** Every beat lands exactly on the guide; sizes are right (the AI made the big ball ~2×); pure white, no second wing. Weaker: no 3D turn or acting, the wave is a stiff wing rotation, and there's no blink. Use it for stage-style shots (things entering, hops, bounces); keep AI video for character acting. Gotcha: a layer with a white background covers whatever is under it, so set `mix-blend-mode:multiply` on each image, not on the group. |

## Round 3 — 2026-11-03, the full Lilla Kvack film (86s, song v2)

| # | Route | Model | Credits | Verdict |
|---|---|---|---|---|
| R2 | Chorus end on white, refs only, 7s, "one big jump at about 4.5 s" in words | wan3-0 element2video | 140 | **Works, on the word without a guide:** take-off 4.55s, sung "ja!" at 4.52s. A single timed action stated in seconds is enough; guides are only worth it for several timed moves. |
| V2 | Playground: duckling + Nalle + bg, Nalle walks in from the right, both wave, no hug | wan3-0 element2video, 5s | 100 | **Works.** Nalle enters, stops, both wave. Nalle came out ~1.4× Kvack's height ("a bit taller" read generously). |
| V3 | Evening, sitting duckling: yawn, yawn, falls asleep | wan3-0 element2video, 5s | 100 | **Works well.** Two yawns, eyes close, stays asleep; evening background unchanged. |
| film | 5 unique clips + reuse + free holds/zooms, cut to exact frame counts from the song timings | ffmpeg (`assembly/build-full.sh`) | 0 | 86s film, 2064 frames, every cut on its song time (checked by exact frame number). |

Totals for the 86s film: **660 credits** of video (R1 220, R2 140, V1 100, V2 100, V3 100) + ~80 for images ≈ 8 credits per second of finished film.

Findings
- The OpenArt job card lists only the first two reference images; a third (background) is still used. Verify in the output frames, not the card.
- Check cuts by exact frame number (`select=eq(n\,N)`), not `-ss` stills — `-ss` can land a frame off.
- Suno can append long instrumental after the outro; check loudness and fade out where the song really ends.

| H | Code face: faceless duckling (nano-banana-2 image2image "remove the face", stayed pixel-aligned with the original), cutouts with `scripts/cutout.py` (transparent + 8px white sticker rim), beak cut from the original art and split at the seam (y 408) so the lower half drops open, eyes drawn in SVG; coral-wall background. Face track: pupils follow the ball, ^ ^ on hops, big eyes + open beak when the big ball arrives, quack on the wave, 3 blinks | nano-banana-2 + HTML/SVG | **20** (once per character) + 0 per shot | **Works, best so far.** Expressions land on the exact frame, and the duckling looks at what is happening, which no AI run managed. Cutout rim holds on colour. Weaker: the SVG eyes are cleaner than the crayon around them (could add grain). Same art can now be reused for any number of shots and songs at no cost. |

| I | Chorus, verse 1 and verse 2 of Lilla Kvack in code (song v2 7.9–52.7s), ball balanced on Kvack's head, Nalle faceless (20 credits) with a code mouth on his snout, two actors built from one config each | HTML/SVG | **20** total | **Works.** User feedback on the chorus: a spin (scaleX through 0) doesn't work on flat 2D art → replaced with a circle hop + wobble; jumps looked jagged → arcs now 32 steps, squash eases around touchdown, legs tuck gradually. Arms/wings must lift clear of the body silhouette (brown on brown is invisible) and peak on the word, not start on it. |

| J | Rest of Lilla Kvack in code: intro, duet chorus (chorus 1 times mapped per line), verse 3 + outro (code moon face on an empty-moon plate, yawns, sleep, z's, fade). Shared rig `code-shot/cast.js`. Full 86s film assembled on one continuous song track (`assembly/lilla-kvack-code.mp4`) | HTML/SVG + ffmpeg | **20** (empty moon) | **Works.** Whole film in code for 60 credits of images vs 660 credits of AI video, and every move lands on its frame. Timing not checked by ear yet. |

## Round 4 — 2026-11-03, crayon-cutout kit: more plates and props

| # | Route | Model | Credits | Verdict |
|---|---|---|---|---|
| J | 4 plates (mustard, turquoise, doodle wall, sea) + 13 props/characters, image2image with the duckling as style-only ref | nano-banana-2 | 340 (17 × 20) | **Works.** Style held on all 17. Off: sea came with a white paper frame (cropped), "orange" bucket came yellow, "rowing boat" came out as a bowl (redone as a sailboat). `cutout.py` now keeps big enclosed gaps see-through (bucket handle); pass a big 4th arg for white shapes like a sail. |
| K | Faceless bee + mouse (image2image "remove the two eyes") | nano-banana-2 | 40 | **Works.** Pixel-aligned: zero change outside the eyes. Eye centres measured by diffing faced vs faceless. Note: visualReferences need the resource `id`, not just the url. |
| K2 | Faceless small mouse (one eye removed) | nano-banana-2 | 20 | **Works.** Pixel-aligned, only the eye changed (centre [714,518]). |
| L | Toy phone prop (base + handset as two separate objects on one sheet), image2image with the duckling as style-only ref; hue-shifted red→blue in ffmpeg so it does not clash with the red ball | nano-banana-2 | 20 | **Works.** Separate parts cut cleanly from one cutout (split on the empty column gap) and used as SVG <symbol> viewBox crops. |
| M | Bedtime set for "Lilla Kvack — Leka boll": room-at-night plate (peach wall, cream floor, one night window with moon + stars) + wooden cot with pillow and blue dotted blanket + baby milk bottle, image2image with the duckling as style-only ref | nano-banana-2 | 60 (3 × 20) | **Works, all three first try.** Plate came with a white paper frame (≤17 px, cropped 20/8 px and scaled back to 1376×768, raw in `archive/kvack-room-night-raw.png`); floor line at 0.63, higher than the other plates. Cot drawn slightly 3/4 rather than flat side view, fine for a prop. Bottle body came yellow (milk is a pale panel inside) despite "creamy white milk"; it reads as a bottle and pops on cream. Both props cut with a big 4th arg so the white pillow and milk stay solid. |
| M2 | User redirect: stay outside on the night plate. Red house (front view, dark roof, glowing window, door), a plain pillow as Kvack's bed, and a minimal milk bottle (white body + orange teat only) | nano-banana-2 | 60 (3 × 20) | **Works, all first try.** "As minimal as possible … no ring, no lines" gave a truly bare bottle; pale blue edge shading keeps it readable after the cut. Pillow came upright rather than "lying flat", which reads better anyway. House pops on the dusk plate. Cut with the big 4th arg so the white milk stays solid. Room plate + cot from M are unused for now. |
| M3 | Bottle retry: the minimal M2 bottle read as smooth glass. Asked for an OPAQUE chunky blob, "not glass, no shine, no highlights", creamy fill "like the duckling's", one blue neck band, orange teat | nano-banana-2 | 20 | **Works.** Matte crayon blob that sits with the cast. Lesson: say "opaque … not glass, no shine" for anything that's normally transparent, or nano-banana renders glossy glass. Layout redirect (free): house slid mostly off the right edge as "just a hint", pillow on the grass outside it, moon left clear for a code singing face. |

## Test N — Nalle v2: better tail, arm-paws and feet (2026-11-03)
Nano Banana 2 image2image, 1K, Image 1 = characters/bear-crayon.png, 2 variants (40) + faceless pass on the pick (20) = **60 credits**.
Prompt: "keep the bear exactly the same … ONLY improve: round pom-pom tail with lighter tan centre; two stubby oval arm-paws against the belly separated by a thin white crayon gap, tan paw pad; rounded feet with three black toe pads." Both variants stayed pixel-aligned (eyes, snout, foot anchor unchanged). User picked B (new feet too).
Rig: the new arm needed a new limb clip — `clip [700,630,78,80]`, `patch [190,0]`, `up: translate(60a,-120a) rotate(-65a, 705 545)`; the old rotate(-120) showed the back of the arm at full lift. Verdict: **keeper**. Files: characters/bear-crayon-v2.png, bear-faceless-v2.png (+ cut/); old files in archive/bear-v1/.

## Test O — simpler Nalle paws (v3) + turnarounds for Nalle and Kvack (2026-11-03)
Nano Banana 2 image2image, 1K, 20 credits each, **260 credits** in total.
- Paws: two edits of faceless v2 (no arm pads + 3 toe dots / no paw detail at all). The "no detail at all" version turned the feet into boots, so the user picked the toe dots (v3). Faced v3 made with the same edit on faced v2; both stay pixel-aligned, so the rig anchors and arm clip from test N still fit.
- Angles: "Image 1 is the character seen from the front. Draw the SAME <animal> in a <side view facing LEFT / three-quarter view turned left / back view> in exactly the same crayon style …", listing each part in that view. All came out on model on the first try. Faceless angles: the usual (b) edit (side: remove eye and smile, keep snout/beak, since it is part of the outline).
- Kvack's main art already reads as a 3/4 view, so Kvack got front, side and back views. The old characters/kvack-sheet.png is an earlier design; don't use it.
Files: characters/bear-{34,side,back}.png, bear-{34,side}-faceless.png, duckling-{front,side,back}.png, duckling-{front,side}-faceless.png, all with cutouts in characters/cut/. Sheet: compare/turnaround-sheet.jpg. Verdict: **keepers**, not wired into any shot yet.
| N | Kvack lying down asleep (on her tummy, side view facing left, eyes closed as crayon arcs, feet tucked out of sight), image2image with the duckling as the CHARACTER ref (not style-only) | nano-banana-2 | 20 | **Works first try, on-model.** Replaces tipping the standing rig over 78°, which left the feet sticking out. In code the sitting rig squashes (sx +.15, sy −.25) and cross-fades into the drawing over 0.8 s; the drawing breathes by scaling from its bottom. The eyes are baked in, which is fine for a pose that only sleeps. `characters/cut/duckling-sleeping.png`, alpha x 105–913, y 259–768. |
