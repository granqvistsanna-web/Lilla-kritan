---
name: crayon-cutout
description: The "crayon cutout" look from Lilla Kvack (a.k.a. Kvack style), as a reusable kit. Round lopsided blob characters in mottled wax crayon, no outline, a thin white sticker rim, bold flat colours, flat two-tone background plates, faces drawn in code. Holds the sampled palette, proven OpenArt prompt templates (new character, faceless version, prop, background plate), the cutout step, the code-face spec, boil values and motion rules. Use when the user says "crayon cutout", "crayon style", "Kvack style", "our style", "make a character in our style", "new character/prop/background for the toddler videos", or starts a new video that should look like Lilla Kvack.
---

# Crayon cutout

Toddler cartoon cut out of a crayon drawing: each character is **one slightly lopsided round blob** (head and body in one) filled with **mottled, grainy, streaky wax crayon on paper grain**, with **no black outline**. A **thin white sticker rim** goes all the way round. Details are tiny and in thin black crayon. Backgrounds are **flat two-tone plates** (wall + floor) with almost nothing on them. Faces are **drawn in code** over faceless art, so every expression lands on the exact frame.

Visual reference: `~/.claude/skills/crayon-cutout/style-sheet.png` (source `style-sheet.html`).
Real files: the shared cast library `~/Documents/Lilla Kvack/cast/` (`characters/`, `props/`, `plates/`, each with `cut/`; `style-ref/duckling.png` is the style-only reference). New art goes there first. The lab `~/Downloads/AI Video Tests` holds the originals and tests.
For animation (code route, layers, face tracks, render) see the **`ai-video`** skill. This skill covers the look.

## Palette (sampled from the real art, median fill)

| Token | Hex | Where |
|---|---|---|
| duck-yellow | `#f4d252` | Kvack's body |
| beak-orange | `#f28d3c` | beak, legs, feet (shade `#d56e2c`) |
| bear-brown | `#96572f` | Nalle's body (light `#a76e48`) |
| snout-tan | `#b27548` | bear snout patch |
| ball-red | `#df342f` | red ball |
| ball-teal | `#55c1c3` | teal ball |
| crayon-ink | `#2a2516` | tiny details drawn in the art |
| code-ink | `#1d1d1d` | eyes, arcs and smiles drawn in code |
| mouth-dark | `#7a2a1c` / `#5a2418` | open beak inside / open bear mouth |
| rim-white | `#ffffff` | sticker rim, eye whites |

Plates: wall / floor, floor line as a fraction of image height (measured, 1376×768 art).

| Plate | Wall | Floor | Line | Extras |
|---|---|---|---|---|
| coral-wall | coral `#f9796a` | cream `#faf9f1` | 0.76 | faint pencil loops |
| morning-garden | sky `#b1e0ee` | grass `#98c572` | 0.80 | sun `#f2eaa1`, flowers pink `#e288c3` / white / orange `#f59636` |
| playground | mint `#b6e7ca` | sand `#f9e1b6` | 0.73 | sandbox + red bucket, far right |
| evening | dusk `#727aa9` | night-grass `#567057` | 0.82 | moon and stars cream `#f8f2dd` |
| mustard-room | mustard `#d49b1a` | white `#ffffff` | 0.77 | faint loops |
| turquoise-room | turquoise `#2ddaa8` | white | 0.76 | heavy crayon wall, loops |
| doodle-wall | deep teal `#075763` | white `#f5f7f5` | 0.84 | rows of light-teal hearts, flowers and squiggles |
| sea | lime `#b6e428` | water `#5acdf9` | 0.64 | white wave dashes; things float, nothing stands |

The last four plates follow Sanna's inspo: stronger walls, a plain white floor, one patterned wall. The sea came back with a white paper frame; it was cropped and the original kept as `archive/sea-raw.png`.

Props and extra characters, all cut out in `assets/props/` and `assets/cut/` (and in the project's `props/` and `characters/`): vacuum (`#882f2a` body), yellow bucket, pink dotted ball `#e93c8f`, bus, flower, sailboat, sunglasses, pirate hat, paddle, bowl, small side-view mouse (with a faceless version), plus a **bee** and a **mouse** character, each as `-crayon` (faced) and `-faceless` (pixel-aligned, for code faces).

The prompts ask for "top two thirds" but the line comes out at 73–82% down. In code, with the plate at 1920×1080 `slice`, the line sits at about y 790–890, and feet go a little below it (verse 2 uses `GROUND = 930`).
Pick character and prop colours that pop off the wall: teal on coral, red on mint or white, yellow on anything but sand.

## Prompt templates (Nano Banana 2, 1K, about 20 credits each)

These are the prompts that made the real art (from the OpenArt history). Fill in the `<…>`.

**(a) New character, two passes.**
Pass 1, text2image, 1:1. A clean, simple design that fixes the anatomy:
```
A toddler cartoon character, extremely simple and bold: a little <colour> <animal> made of just a few flat shapes — one big round body that is also the head, <ears/beak>, <two short stubby legs with …>, <tiny stubby arms / wing nubs>. Flat solid <colour> fill with a light grainy print texture. Face: two small black dot eyes, <nose/snout>, nothing else. Thin wobbly hand-drawn black line only where needed. No outfit, no accessories, no shading. Standing, facing the viewer, centered on a pure solid white background, no shadow, no ground, no text.
```
Pass 2, image2image, 1:1. Image 1 is the pass 1 result. Optionally add an approved cutout character (for example `duckling-crayon.png`) as Image 2, used for style only. Kvack and Nalle were made without Image 2; adding it is the untested part.
```
Redraw this <animal> as a hand-drawn toddler cartoon in a soft crayon style. [Image 2 is a STYLE reference only: copy its drawing technique, not the <duckling>.] The whole body is ONE slightly lopsided round blob (body and head in one), not symmetrical, like a <pebble/potato> drawn by hand. NO black outline around the body: the shape is filled with <colour> wax crayon with a mottled, grainy, slightly streaky crayon texture and visible paper grain, and has only a thin uneven white rim around its edge. <Ears/beak, filled the same way>. Tiny details in thin black crayon line only: two round white eyes each ringed in black with a small black pupil, <snout/beak>, a few short tiny hairs on top of the head. <Legs> with little <black/orange> tips for feet, <one tiny stubby arm / one small wing nub>. A couple of very faint loose scratchy crayon marks on the body. Very simple, bold, cute, for 2-year-olds. Standing, facing the viewer, centered on a pure solid white background, no shadow, no ground, no text.
```
Ask for **one** arm or wing nub on the side that will wave. It gets cut out and lifted in code, so a second one only gets in the way.

**(b) Faceless version of an approved character.** Image2image on the approved art. It stays pixel-aligned, so the code eyes line up.
```
Edit Image 1. Keep the <animal> exactly the same: same <lopsided round blob> shape, same position and size in the frame, same <colour> wax-crayon fill with mottled grainy streaky texture and paper grain, same thin uneven white rim, same <ears / tiny black hairs / drawn wing or arms / legs and feet>, same pure white background. [Keep <the snout patch with its outline and the nose>.] ONLY change: remove <the face completely. No eyes, no beak, no mouth | the two eyes and the mouth lines>. Where they were, continue the same <colour> crayon texture seamlessly. No other changes, no new details, no shadow, no text.
```
Keep the beak or snout in the faceless art only if it never has to open. Kvack's beak was cut from the original art instead (see `ai-video`, test H).

**(c) Prop.** Image2image, 1:1, with an approved character as Image 1:
```
Image 1 is a STYLE reference only: copy its drawing technique exactly, not the <duckling>. Draw a single <object> in that same soft crayon style: one slightly lopsided hand-drawn <shape>, NO black outline, filled with bright <colour> wax crayon with a mottled, grainy, slightly streaky texture and visible paper grain, with only a thin uneven white rim around its edge. <One simple white crayon detail>. A couple of faint loose scratchy crayon marks. Very simple, bold, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```

**(d) Background plate.** Image2image, **16:9**, with an approved character as Image 1:
```
Image 1 is a STYLE reference only: copy its soft wax-crayon technique (mottled grainy fill, no black outlines, thin uneven white rims), not the <duckling>. Background plate for a toddler cartoon, very simple and flat, wide 16:9, static straight-on view: <PLACE>. The top two thirds is a flat soft <wall colour> crayon wall, the bottom third a flat <floor colour> crayon <floor/grass/ground> meeting it at a slightly wobbly hand-drawn line. <At most one or two small things, pushed to a corner or the far edges only>. The whole centre is completely empty. No characters, no animals, no shadows, no text.
```
Prop lessons (round 2): colours drift (an "orange" bucket came back yellow), so check before cutting. A "rowing boat" came out as a bowl: name the side-view features instead (low hull, pointed front, mast and sail). For a small sidekick, say "tiny … side view, like a small prop" or you get a full blob character.
After generating a plate, check for a white paper frame round the edge (crop it), then measure its floor line (the biggest colour jump down the middle column) and set `GROUND` from it.

## Cutout

```
SK=~/.claude/skills/ai-video
$SK/.venv/bin/python -I $SK/scripts/cutout.py characters/<name>.png characters/cut/<name>.png   # 8px rim; 3rd arg changes it
```
Anything darker than near-white becomes the character. The script grows it by 8px for the white rim, fills holes under 20,000 px (specks, eye whites, badges) and feathers 1px. Bigger enclosed gaps stay see-through (inside a bucket handle). For a big shape that really is white (a sail), pass a large 4th arg: `cutout.py in.png out.png 8 999999999`. The result is a transparent PNG that sits on any plate. Cut every character **and** prop. Never put white-background art straight onto a coloured plate.

## Code face (in the art's own 1024px coordinates, inside the body group so it squashes with it)

- **Eye, open:** white circle r 26, `code-ink` stroke 6; pupil r 10 `code-ink`. Eye centres per character (Kvack `[320,335] [537,345]`, Nalle `[405,345] [620,340]`, bee `[295,460] [459,460]` at scale 1.1, mouse `[378,375] [557,382]` at scale 0.9; small side-view mouse (`props/mouse-small-faceless`) has one eye `[714,518]`, draw it at scale 0.8 (the art had a 24 px dot, but at 0.45 it reads as no face); the bee and mouse values were measured by diffing the faced art against the faceless art).
- **Look:** pupils move ±9 px along x (flip with the character's mirror). Point at a prop or character: `clamp((target − x) / 300, −1, 1)`.
- **Happy ^ ^:** hide the open eye, draw `M-22 8 Q0 -18 22 8`, stroke 7, round caps.
- **Big (surprised):** scale the eye 1.3 and open the mouth about 0.6.
- **Blink:** scaleY 0.08 for 0.12 s. Two or three per 10 s.
- **Beak open (Kvack):** the beak is cut from the original art and split at its seam (y 408). The lower half drops `open × 26` px over a `mouth-dark` ellipse (rx 62, ry `open × 22`).
- **Bear mouth (Nalle):** a smile `M492 418 Q515 438 538 418`, stroke 5, hidden once the mouth opens. The mouth is a `#5a2418` ellipse (rx 24, ry `open × 20`).
- **Boil**, on the actors group only (not the plate):
  `<filter id="boil" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">` → `feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2"`, then `feDisplacementMap scale="6"`. Re-seed every 3 frames (`seed = floor(frame/3) % 50 + 1`).
- **Size:** at 1920×1080, Kvack is about 400 px tall, Nalle 470 and a ball 140 across.

Full working example: `~/Documents/Lilla Kvack/templates/code-shot-two-actors.html` (two actors, one config each, paths already pointing at `cast/`; copy it to `episodes/NN-slug/code-shot/<shot>/index.html`). New stories follow the vault Job "New Kvack Story".

## Motion rules

- Flat 2D: **never spin or turn** a character. Mirroring between shots is fine, but never mid-shot. A "turn around" becomes a circle hop with a wobble.
- Hops are smooth parabolas (`bounce`, 32 steps), squash eases in and out around touchdown, stretch follows vertical speed, and legs tuck gradually.
- A waving limb lifts **clear of the body outline** (brown on brown disappears) and **peaks on the word**.
- Waddle: rock 5–7° and bob 12 px per step. Heavy characters squash more on landing.
- Balls roll with spin = distance / radius.

## Do / don't

| Do | Don't |
|---|---|
| One lopsided blob, mottled crayon fill, paper grain | Black outline round the body |
| White sticker rim on every character and prop | Gradients, soft shading, glow |
| Bold flat colours from the palette | Drop shadows or grey oval shadows |
| Tiny thin black details | Photoreal, 3D or vector-clean looks |
| Flat two-tone plate, empty centre | Busy backgrounds, things behind the actors |
| Faces in code, faceless art | Baked-in faces you then need to animate |
| Flat 2D motion: hops, rolls, waddles | 3D turns, spins, head turns |

"Messy crayon" prompts come out as tidy coloured pencil. Describe the parts (blob, no outline, white rim, mottled fill) instead.
Always price first with `openart_model_cost`, and tell the user the credits before generating.
