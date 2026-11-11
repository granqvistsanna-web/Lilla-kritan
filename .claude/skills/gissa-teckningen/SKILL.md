---
name: gissa-teckningen
description: Make a "Gissa teckningen" (guess the drawing) YouTube Short for Lilla Kritan — the faceless crayon draws one everyday thing stroke by stroke (farm animals, playground things), with a short spoken intro, a "hmm", the question "Vad blir det?", a 4 s guessing pause, then "En ko!", the name, a saga line and the real sound, and finally the drawing comes alive and leaves while the narrator says goodbye, 9:16, about 23–31 s, looping. Holds the steps, the drawing data format, theme lists, the reusable Suno bed prompt, the ElevenLabs lines and settings, the timing template and the render command. Use when the user says "gissa teckningen", "guess the drawing", "rita och gissa", "new drawing short", or names a new thing to draw for the shorts.
---

# Gissa teckningen

One Short = one thing drawn in code by the crayon, about 23–31 s, 9:16. Order: intro (*"Gissa teckningen!"* while the crayon pops in) → drawing, with a *"Hmm…"* a third of the way in → the question just before the giveaway → 4 s pause → "En ko!" (pop, white rim; it stands still while it is named) → "Kon säger muu." (`saga`) → the real sound, a small hop → it comes alive and leaves the frame, *"Hej då!"* as it goes → blank paper.

Timing is automatic: the engine reads each voice file's real length (from the m4a's `mvhd` box) and starts the next line 0.5 s after it ends; the drawing waits until the intro is said, the pause starts when both the drawing and the question are done, and strokes play at `TEMPO` = 0.7 of their seconds. The music lies low and steady under everything. Rules and the Montessori reasoning: [`format/shorts.md`](../../../format/shorts.md) (read it first; it lists where the Shorts deliberately break `format/regler.md`). Content in Swedish, code comments in Swedish, filenames ASCII lowercase with hyphens.

## Files

| Path | What |
|---|---|
| `produktion/youtube/shorts/gissa/gissa.js` | The engine: paper, crayon, wax filter, boil, timing, audio cues, preview controls. Do not copy it; every Short loads it. |
| `produktion/youtube/shorts/gissa/<tema>/<ord>/index.html` | One Short: only the drawing and the words. `bondgarden/ko/` is the reference. |
| `verktyg/kant.js` | The white sticker rim (skill `vita-kanter`). Loaded by every Short; the engine applies it to the drawing with `andel: 0.025` (drawn in code, no baked rim) when the answer comes. |
| `avsnitt/004-bussen-badar/scener/render.mjs` | Records any page in the repo; `--staende` = 1080×1920. |
| `assets/ljud/musik/gissa-bad.m4a` | The shared instrumental bed (Suno, below). |
| `assets/ljud/roster/intro-1…5`, `hmm-1…5`, `hej-da-1…5` (`.m4a`) | Shared lines in five variants; the Swedish question is always `vad-blir-det-1` ("Vad blir det?"). Never use "Vad kan det vara?" in Swedish – it sounds stiff (Sanna 2026-11-08); English keeps `roster/en/vad-kan-det-vara-N`. Each Short always gets the same number (a hash of its folder), so neighbouring Shorts sound different. Fallback when an intro variant is missing: `gissa-teckningen.m4a`. |
| `<short>/svar.m4a`, `saga.m4a` | "En ko!", "Kon säger muu." (ElevenLabs). No second name line ("Det är en ko."): it was dropped 2026-11-07 to keep the speech short. |
| `produktion/youtube/shorts/gissa/ljud-att-gora.md` | Every voice line and sound effect with its file name and text/prompt: the shopping list for ElevenLabs and Suno. |
| `assets/ljud/effekter/<lat>/<lat>-1.m4a` | The real sound (ElevenLabs SFX), e.g. `mu`. All the sounds in the theme tables below exist. |

Missing audio files are fine: the render leaves them silent and the preview reads the line with speech synthesis.

## Steps

1. **Pick the thing** from the theme list in `format/shorts.md`. One thing per Short. Real colours, the real word with article ("En gris!", not "En nasse!").
2. **Copy** `bondgarden/ko/` to `produktion/youtube/shorts/gissa/<tema>/<ord>/` (`lekplatsen/rutschkana/`) and keep only `index.html`.
3. **Draw** by editing the `streck` list: `[id, path d, colour, width, seconds, klipp?]`, drawn in that order.
   - **Order is the game:** first strokes that could be many things (a box on legs), then clues (spots, tail), last the giveaway (head, horns, muzzle). Set `fragaFore` to the first giveaway stroke: the question comes just before it.
   - **Box:** draw in the cow's coordinates, about x 240–970, y 650–1240, feet on y ≈ 1240. The engine centres it and scales 1.2 (`mitt: [603, 950]`, `skala: 1.2` to change). Keep it above y ≈ 1440 in the frame (YouTube's buttons; the preview's "visa YouTube-zonen" shows it).
   - **Look:** like a child's drawing: black crayon lines (`F.svart`, width 12–16), flat crayon fills, no faces with a mouth. Colours from `gissa.FARG` (palette from `stil/stilguide.md`).
   - **Fills:** `spiral(cx, cy, r)` for round patches (spots, muzzle, eyes); `sick(x0, x1, y0, y1)` zigzag for bigger areas. Add `klipp: '<id>'` (6th field) to clip a fill inside an outline stroke; that outline is then drawn on top.
   - **Timing:** outlines 1–1.4 s, legs and small lines 0.15–0.45 s (the engine plays them at 70 %). All strokes together about 7–8 s, so the Short lands near 25 s.
   - **Comes alive (`liv`):** one action from the theme table below. It must be the real thing's movement, only in the direction the drawing already faces (draw things facing right; `riktning: -1` if one faces left). Never turn around or spin a cutout: calm steps and hops only.
     - Built: `{ typ: 'ga', ben: [['ben1', 'ben3'], ['ben2', 'ben4']], ljud: 'steg' }`. It walks out of frame with gentle step bobs, and the leg pairs swing in turn around their tops. `sek` sets the length (default 3.5), `vagga` the rock (degrees, 1.5), `takt` the steps per second (2.4), `studs` the bob per step (px, 9), and `pick: 2` makes it peck that many times first (the whole drawing bows forward around its feet, 0.6 s a peck, `pick` sound; counted in `sek`). References: `bondgarden/gris/` (`studs: 24`, little hops), `hast/` (`takt: 3.4`, `ljud: 'trav'`), `hona/` (`pick: 2`), `katt/` (`takt: 1.6`, `studs: 2`, slow and low), `hund/` (`takt: 3.8`, `studs: 16`, `sek: 2.6`).
     - Built: `{ typ: 'kor', hjul: ['hjul1', 'nav1', 'hjul2', 'nav2'], ljud: 'brum', bana: [[sek, dx, ljud?, 'hopp'?], ...] }`. A route of eased moves, always facing the same way: drive, brake, reverse, out at the right (dx ≈ 1100) and in from the left (a 0 s step to dx ≈ -950), over a bump (`'hopp'`, its sound at the top). The `hjul` strokes (spirals, which start at their centre) roll with the distance, backwards when reversing. The Short gets as long as the route (the car's is about 9 s, about 27 s in all). A tractor can use just `[[3, 1100]]`. Reference: `fordon/bil/`.
     - Built: `{ typ: 'studsa', mitt: [x, y], radie, bana: [[sek, dx, ljud vid landningen, höjd], ...] }`. Each step is one bounce arc. Its sound plays at the landing. Out at the right and in from the left work as for `kor`. A ball rolls with the distance around `mitt` (a ball may spin; that's how it really moves). Reference: `lekplatsen/boll/`.
     - Built: `{ typ: 'hoppa', sand: [x, y], bana: [[sek, dx, ljud?], ...] }`. One hop per step (about 70 px high), in place with dx 0 and out with dx ≈ 1100; a step's sound comes on the landing before it (`duns`). On every landing a few sand-coloured crayon dots puff up out of the opening (`sand`, in the drawing's coordinates) and fall back in. A step `[sek, dx, ljud, 'hall']` pours instead: the thing tips 65° to the right around its bottom-right corner (`horn: [x, y]`), sand runs out in a stream into a small pile on the ground, it rights itself, and the pile fades during the last step; its sound starts when the sand starts running. Hop a little to the left first so it has room to tip. Reference: `lekplatsen/hink/`.
     - Built: `{ typ: 'skutta', ben: [['ben3', 'ben4'], ['ben1', 'ben2']], hopp: 5 }`. It skips out to the right in `hopp` small calm arcs (60 px high), nose tilting up on take-off and down on landing; front legs first in `ben` so both pairs tuck in the air. No `ljud` needed. Reference: `bondgarden/far/`.
     - Built: `{ typ: 'gunga', del: ['kedja1', 'kedja2', 'sits'], vridpunkt: [x, y], sek: 4.5 }`. Only the `del` strokes swing (±16°, about 1.7 s a swing) around the top and calm down; the frame stands still, and then it fades out (`T.ut`, 1 s). With `bild`, `sving: [fil, [x, y]]` is the cut-out swinging part on top of the frame-only picture, turning around its pivot in the picture's px. Reference: `lekplatsen/gunga/`. A seesaw can use it too, pivot in the middle.
     - Built: `{ typ: 'flyta', ljud: 'vagor', bana: [[1.8, 0], [3, 1100]] }`. Bobs on the waves (12 px up and down, a ±2.5° rock, never more) all the time, and glides along the `bana` steps like `kor` (no wheels). Draw the water as part of the drawing; it travels along. Reference: `fordon/bat/`.
     - Built: `{ typ: 'flyga', sek: 3.6 }`. Rolls forward faster and faster, lifts off at a slant (half as much up as forward) with the nose tilting up 12°, and flies out at the top right. Reference: `fordon/flygplan/`.
     - Built: `{ typ: 'yra', sand: [[x, y], ...], puffar: [sek, ...], sek }`. The thing stands still; at each time in `puffar` a few sand-coloured crayon dots fly up from every point in `sand` (in front of the drawing) and settle again, then it fades out (`T.ut`, 1 s). Reference: `lekplatsen/sandlada/`.
     - Built: `{ typ: 'glida', spar: 'M… path d', bana: [[1.0, 0], [0.4, 0], [1.3, 0, 'wiii'], [0.8, 0]] }`. The crayon comes back from the top right, sits at the start of `spar` (in the drawing's coordinates), slides down along it tip first (its sound in the third step) and shoots out to the right; the four `bana` steps are those phases. Then the drawing fades out (`T.ut`, 1 s). Reference: `lekplatsen/rutschkana/`.
     - `hoppa` without pouring (no `hall` step) still needs a `horn` (any point). Reference for digging in place: `lekplatsen/spade/`.
     - Any other `typ` throws until it is added to `liv()` in `gissa.js`. Add it there when making that Short, and keep it a few lines like `ga`. A thing that stays in frame then needs the engine's fade (`T.ut`) after its action.
   - **Turns into a crayon cutout (`bild`, optional):** on the answer the drawing fades into a cut-out crayon picture of the same thing, which then comes alive. **Trace the Short's own drawing** so the picture matches it and can be animated:
     1. Render a still just after the drawing is done (`render.mjs <dir> --staende <t>`), crop the drawing to a square on white (paint out the crayon), save it in the scratchpad.
     2. Google Flow (`flow_generate`, image, 1:1, `model: "Nano Banana Pro"`, one take: the "x2" option is broken), image 1 = the drawing crop ("exact SHAPE and LAYOUT: keep every part in the same place and size"), image 2 = an approved crayon prop of the same kind for STYLE (no black outline, mottled fill, thin white rim). Ask for **no eye** (it is drawn in code and blinks) and for legs/moving parts **straight and separate, with gaps**. No motion lines. Check the result is the right thing: Flow has returned other projects' images when another session used it.
     3. Save as a prop `assets/rekvisita/<sak>/<sak>.png` + `rekvisita/<sak>.md` (with the prompt) + README row. Cut with `~/.claude/skills/ai-video/.venv/bin/python -I .claude/skills/ai-video/scripts/cutout.py in.png cut/<sak>-hel.png`, then split it with numpy: find the legs in a band under the body (alpha runs), save each leg as its own 1024 image from a little above the body's bottom down (it hides behind the body when it swings), erase the legs from the body below the bottom line (±14 px), and write `<sak>-rigg.json` with each leg's pivot (top middle). Wheels are cut as circles instead (car, tractor).
     4. In the Short: `bild: { fil, x, y, skala, oga: [x, y, r], ben: [[[fil, [x, y]], …], [[fil, [x, y]], …]] }`, the two leg pairs in the same order as `liv.ben`, all in the picture's px. Fit `x, y, skala` from the picture's alpha bbox against the drawing's bbox, and put `oga` where the drawing's eye is (the eye blinks every 3 s). Check stills at the answer and mid-walk. Reference: `bondgarden/gris/` (pig). Vehicles: `hjul: [[fil, [x, y], radie?], …]` (reference `fordon/bil/`). Open wheels with a frame across them (bike): `hjulBakom: true` puts the wheels under the body. OpenArt (Nano Banana Pro, image2image) works as well as Flow for the tracing; all of `bondgarden/`, `fordon/` and `lekplatsen/` were made that way (`rigg/README.md`).
4. **Preview.** In the repo root run `python3 -m http.server 8765` (the app's preview can't start a server inside Documents, and `file://` can't load `kant.js`), then open `http://127.0.0.1:8765/produktion/youtube/shorts/gissa/<tema>/<ord>/`. ▶ plays with sound and loops; `hoppa(12)` in the console jumps to a frame. Check: is it guessable but not obvious at the question? Does the giveaway come after the question?
5. **Audio** (the user makes these; give them the exact texts, in a numbered list in the order to record, and add them to `ljud-att-gora.md`):
   - per Short: `svar` and `saga` lines, and the real sound if it's not in `assets/ljud/effekter/` yet;
   - shared lines (intro, hmm, question, goodbye) are already made; only new variants need recording.
   - **Filing what the user downloads:** list the new files in `~/Downloads` by time, copy them to the scratchpad, transcribe each voice take with `whisper-cli -m ~/.flow-mcp/models/ggml-large-v3-turbo-q5_0.bin -l sv -nt -np -f <16 kHz mono wav>` to see which line it is (ElevenLabs gives two takes per line, `x.mp3` and `x (1).mp3`; use the first unless it's wrong), then convert with silence trimmed at both ends: `ffmpeg -i in.mp3 -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.05" -c:a aac -b:a 160k out.m4a`. Sound effects are named after their prompt (`a_real_pig_grunting_…mp3`): number takes `<namn>-1…`, trim only the start, and add a row to `assets/ljud/effekter/README.md`. Finally move the downloaded originals out of `~/Downloads` into `produktion/ljud-original/` (names and folders in its README, which also gets a row per file). Show the user the mapping and anything left out.
6. **Render** (re-render everything after new audio arrives; a render started before the files landed is stale):
   ```bash
   node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/gissa/<tema>/<ord> --staende 4 9 16
   node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/gissa/<tema>/<ord> --staende
   ```
   The first command writes stills (`stills-staende/sheet.jpg`) to check. The second writes `<ord>-staende.mp4` with the bed (low and steady), crayon sounds, voice and the real sound (about a minute per Short). Mp4s and stills are gitignored.
7. **Publish** (as `produktion/youtube/shorts-plan.md`):
   - title `Vad blir det? 🐄 | Gissa teckningen | lilla kritan`;
   - two sentences plus `#shorts #barnsång #lillakritan`;
   - made for kids: yes; no text in the picture;
   - an SRT with the spoken lines;
   - playlist `Gissa teckningen – <tema>`.

Later, per theme: a compilation (all drawings in a row, then three side by side, *"Var är kon?"*, pause, the cow hops). That's the second naming step; build it when a theme has 5+ Shorts.

## Suno: the bed (made once, Instrumental on)

Give the user the whole prompt in chat, every time. One field, max 500 characters (style, structure and exclusions together):
```
Instrumental classic whimsical children's TV drawing music, light and curious, 100 BPM, 4/4, major key. A 45 second cue: 1-bar ukulele and toy piano intro, 4 bars of clarinet and bassoon trading little phrases, 2 almost silent bars with one soft toy piano chord, a bright xylophone flourish, 10 bouncy bars with ukulele and upright bass, then a clean ending on the home chord. Soft brushed snare, cozy storybook feel. No vocals, no glockenspiel, no tempo or key change, no fade.
```
Save as `assets/ljud/musik/gissa-bad.m4a`. At 100 BPM a bar is 2.4 s: bar 1 is the intro under *"Gissa teckningen!"* (`INTRO` = 2.4 s in the engine), then the drawing. The cue must be longer than the longest Short (about 33 s); a 25 s cue came out too short. The engine keeps it low and steady the whole way (vol 0.55, English 0.4, under the voice at 2.5) so speech is always heard, and fades it out at the end; no ducking up and down.

## ElevenLabs

- **Voice:** BERÄTTAREN, the same voice in every Short: *Malin – Professional Swedish Narration* (ElevenLabs).
- **Text to speech:** Eleven v3 (or newer), stability 0.5, similarity 0.75; warm and calm, a grown-up talking to a two-year-old, not a presenter. Lines that need a feeling get a v3 audio tag in square brackets: `[excited] Gissa teckningen!`, `[thoughtful] Hmm…`, `[warm] Hej då!`. Answers bright with "!".

| File | Text |
|---|---|
| `assets/ljud/roster/intro-1…5` | `[excited] Gissa teckningen!` and four variants (list in `ljud-att-gora.md`) |
| `assets/ljud/roster/hmm-1…5` | `[thoughtful] Hmm…` and four variants |
| `assets/ljud/roster/vad-blir-det-1` | `Vad blir det?` (the only Swedish question) |
| `assets/ljud/roster/hej-da-1…5` | `[warm] Hej då!` and four variants |
| `<short>/svar.m4a` | `En ko!` (bright, a little surprised) |
| `<short>/saga.m4a` | `Kon säger muu.` (calm, a little playful; set `saga` in the Short). Animals *say* their sound, things say what they *do*: `Bollen studsar.`, `Gungan gungar.` |

- **Sound effects (real sounds):** ElevenLabs SFX, a short prompt in English, 2 s, for example `a real dairy cow mooing once, long and calm, close, farm, no music, no voice`. Save as `assets/ljud/effekter/<lat>/<lat>-1.m4a` and add a line to the effects README. Set `lat` and `latText` (the preview's speech stand-in) in the Short.

## Themes: sound and coming alive

✓ = the sound exists in `assets/ljud/effekter/` (all of them do now). Swedish wording of the actions: `format/shorts.md`.

| Bondgården | `lat` | Comes alive | `liv` |
|---|---|---|---|
| ko | `mu` ✓ | walks out calmly | `ga` ✓ built, `steg` ✓ |
| gris | `noff` ✓ | trots out with little hops | `ga` ✓ built, `studs: 24`, `steg` ✓ |
| får | `ba` ✓ | skips out | `skutta` ✓ built |
| häst | `gnagg` ✓ | trots out | `ga` ✓ built, `takt: 3.4`, `trav` |
| höna | `kluck` ✓ | pecks twice, toddles out | `ga` ✓ built, `pick: 2`, `pick`, `steg` ✓ |
| anka | `kvack` ✓ | waddles out | `ga`, more rock |
| katt | `mjau` ✓ | sneaks out | `ga` ✓ built, `takt: 1.6`, `studs: 2`, `steg` ✓ |
| hund | `vov` ✓ | runs out happily | `ga` ✓ built, `takt: 3.8`, `studs: 16`, `steg` ✓ |
| traktor | `tuff-tuff` ✓ | drives forward and stops, chugs, drives out to the right | `kor` ✓ built with `bana` and `bild` (`traktor-gron`, a big and a small wheel, each with its own radius), `brum` ✓ |

| Fordon | `lat` | Comes alive | `liv` |
|---|---|---|---|
| bil | `tuta-tut` ✓ | toots, drives out to the right | `kor` ✓ built, `brum` ✓ |
| buss | `buss-dorr` ✓ | drives forward and stops, the door hisses, drives out to the right | `kor` ✓ built, `brum` ✓ |
| brandbil | `siren` ✓ | the siren wails while it stands, drives out to the right | `kor` ✓ built, `siren` as the engine sound |
| tåg | `tag-tjoff` ✓ | chugs out to the right, the carriage behind | `kor` ✓ built, five wheels, `tuff-tuff` ✓ |
| båt | `bat-tut` ✓ | bobs on the waves, glides out to the right | `flyta` ✓ built, `vagor` ✓ |
| flygplan | `flygplan` ✓ | rolls, lifts off at a slant, flies out to the right | `flyga` ✓ built |
| cykel | `cykelklocka` ✓ | rolls out to the right, spokes turning | `kor` ✓ built; wheels are rings that start at the hub (a spoke first), so they turn around it |

| Lekplatsen | `lat` | Comes alive | `liv` |
|---|---|---|---|
| gunga | `gung-knarr` ✓ | swings back and forth, fades | `gunga` ✓ built |
| rutschkana | `glid` ✓ | the crayon slides down it, "wiii", fades | `glida` ✓ built, `wiii` ✓ |
| sandlåda | `sand` ✓ | a little sand flies up and settles, fades | `yra` ✓ built |
| spade | `grav` ✓ | digs twice, hops out | `hoppa` ✓ built (two hops in place with sand puffs, then out), `sand`, `duns` ✓ |
| hink | `hink-dunk` ✓ | hops, tips and pours sand into a pile, hops out | `hoppa` with `hall` ✓ built, `duns` ✓, `sand` |
| boll | `studs` ✓ | bounces in place, out, back in from the left, then away | `studsa` ✓ built |
| gungbräda | `vick` ✓ | tips up and down, fades | `gunga` ✓ built, pivot in the middle |

| Skogen | `lat` | Comes alive | `liv` |
|---|---|---|---|
| groda | `kvak` ✓ | skips out in four hops | `skutta` ✓ built, `ben: []`, `hopp: 4` |
| mus | `mus-pip` ✓ | scurries out | `ga` ✓ built, `takt: 4`, `studs: 4`, `smasteg` ✓ |
| uggla | `uggla` ✓ (quiet, far away) | lifts off, flies out | `flyga` ✓ built, `fladder` ✓ |
| bi | `surr` ✓ | hovers, flies out | `flyta` ✓ built (the bob reads as hovering), `surr` ✓ |
| igelkott | `nos` ✓ | toddles out | `ga` ✓ built, `takt: 2.2`, `studs: 3`, `tass` ✓ |
| ekorre | `prassel-lov` ✓ (stand-in) | skips out | `skutta` ✓ built, `ben: []` |

The skogen Shorts (2026-11-11) are drawn only, without a traced `bild` yet, and are exported cropped to 9:12 (1080×1440, `export/9x12/`).

## Don't

- No faces with a mouth on the drawings, no text in the picture, no fantasy colours.
- No second thing in the same Short, nothing moving in the background.
- No turning around or spinning when it comes alive, and no movement before it has been named.
- Never shorten the pause below 4 s.
- Never mention existing shows, characters or brands in prompts or texts.
