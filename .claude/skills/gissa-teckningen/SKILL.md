---
name: gissa-teckningen
description: Make a "Gissa teckningen" (guess the drawing) YouTube Short for Lilla Kritan — the faceless crayon draws one everyday thing stroke by stroke (farm animals, playground things), the narrator asks "Vad kan det vara?", a 4 s guessing pause, then "En ko!" and the name once more, and finally the drawing comes alive (the cow moos and walks off, a car drives away, a ball bounces off), 9:16, about 23 s, looping. Holds the steps, the drawing data format, theme lists, the reusable Suno bed prompt, the ElevenLabs lines and settings, the timing template and the render command. Use when the user says "gissa teckningen", "guess the drawing", "vad kan det vara short", "rita och gissa", "new drawing short", or names a new thing to draw for the shorts.
---

# Gissa teckningen

One Short = one thing drawn in code by the crayon, about 23 s, 9:16. Order: drawing → question → 4 s pause → "En ko!" (pop, white rim) → "Det är en ko." (it stands still while it is named) → the real sound, a small hop → it comes alive and leaves the frame → blank paper. Rules and the Montessori reasoning: [`format/shorts.md`](../../../format/shorts.md) (read it first; it lists where the Shorts deliberately break `format/regler.md`). Content in Swedish, code comments in Swedish, filenames ASCII lowercase with hyphens.

## Files

| Path | What |
|---|---|
| `produktion/youtube/shorts/gissa/gissa.js` | The engine: paper, crayon, wax filter, boil, timing, audio cues, preview controls. Do not copy it; every Short loads it. |
| `produktion/youtube/shorts/gissa/<tema>/<ord>/index.html` | One Short: only the drawing and the words. `bondgarden/ko/` is the reference. |
| `verktyg/kant.js` | The white sticker rim (skill `vita-kanter`). Loaded by every Short; the engine applies it to the drawing with `andel: 0.01` (drawn in code, no baked rim) when the answer comes. |
| `avsnitt/004-bussen-badar/scener/render.mjs` | Records any page in the repo; `--staende` = 1080×1920. |
| `assets/ljud/musik/gissa-bad.m4a` | The shared instrumental bed (Suno, below). |
| `assets/ljud/roster/vad-kan-det-vara.m4a` | The shared question (ElevenLabs). |
| `<short>/svar.m4a`, `<short>/namn.m4a` | "En ko!" and "Det är en ko." (ElevenLabs). |
| `assets/ljud/effekter/<lat>/<lat>-1.m4a` | The real sound (ElevenLabs SFX), e.g. `mu`. Existing: `ba`, `kvack`, `kvak`, `wiii`, `tuff-tuff`, `boing`. |

Missing audio files are fine: the render leaves them silent and the preview reads the line with speech synthesis.

## Steps

1. **Pick the thing** from the theme list in `format/shorts.md`. One thing per Short. Real colours, the real word with article ("En gris!", not "En nasse!").
2. **Copy** `bondgarden/ko/` to `produktion/youtube/shorts/gissa/<tema>/<ord>/` (`lekplatsen/rutschkana/`) and keep only `index.html`.
3. **Draw** by editing the `streck` list: `[id, path d, colour, width, seconds, klipp?]`, drawn in that order.
   - **Order is the game:** first strokes that could be many things (a box on legs), then clues (spots, tail), last the giveaway (head, horns, muzzle). Set `fragaFore` to the first giveaway stroke: the question comes just before it.
   - **Box:** draw in the cow's coordinates, about x 240–970, y 650–1240, feet on y ≈ 1240. The engine centres it and scales 1.2 (`mitt: [603, 950]`, `skala: 1.2` to change). Keep it above y ≈ 1440 in the frame (YouTube's buttons; the preview's "visa YouTube-zonen" shows it).
   - **Look:** like a child's drawing: black crayon lines (`F.svart`, width 12–16), flat crayon fills, no faces with a mouth. Colours from `gissa.FARG` (palette from `stil/stilguide.md`).
   - **Fills:** `spiral(cx, cy, r)` for round patches (spots, muzzle, eyes); `sick(x0, x1, y0, y1)` zigzag for bigger areas. Add `klipp: '<id>'` (6th field) to clip a fill inside an outline stroke; that outline is then drawn on top.
   - **Timing:** outlines 1–1.4 s, legs and small lines 0.15–0.45 s. All strokes together about 7–8 s, so the Short lands near 23 s.
   - **Comes alive (`liv`):** one action from the theme table below. It must be the real thing's movement, only in the direction the drawing already faces (draw things facing right; `riktning: -1` if one faces left). Never turn around or spin a cutout: calm steps and hops only.
     - Built: `{ typ: 'ga', ben: [['ben1', 'ben3'], ['ben2', 'ben4']], ljud: 'steg' }`. It walks out of frame with gentle step bobs, and the leg pairs swing in turn around their tops. `sek` sets the length (default 3.5).
     - Built: `{ typ: 'kor', hjul: ['hjul1', 'nav1', 'hjul2', 'nav2'], ljud: 'brum', bana: [[sek, dx, ljud?, 'hopp'?], ...] }`. A route of eased moves, always facing the same way: drive, brake, reverse, out at the right (dx ≈ 1100) and in from the left (a 0 s step to dx ≈ -950), over a bump (`'hopp'`, its sound at the top). The `hjul` strokes (spirals, which start at their centre) roll with the distance, backwards when reversing. The Short gets as long as the route (the car's is about 9 s, about 27 s in all). A tractor can use just `[[3, 1100]]`. Reference: `fordon/bil/`.
     - Built: `{ typ: 'studsa', mitt: [x, y], radie, bana: [[sek, dx, ljud vid landningen, höjd], ...] }`. Each step is one bounce arc. Its sound plays at the landing. Out at the right and in from the left work as for `kor`. A ball rolls with the distance around `mitt` (a ball may spin; that's how it really moves). Reference: `lekplatsen/boll/`.
     - Any other `typ` throws until it is added to `liv()` in `gissa.js`. Add it there when making that Short, and keep it a few lines like `ga`: `gunga` swings around a top pivot in place. A thing that stays in frame then needs the engine's fade (`T.ut`) after its action.
   - **Turns into a crayon cutout (`bild`, optional):** on the answer the drawing fades into a cut-out crayon picture of the same thing, which then comes alive. Make it in Google Flow (`flow_generate`, image, 1:1, Nano Banana, 0 credits) with `rosa-bilen.png` and `lastbil-brun-v1.png` (or the nearest approved prop) as style references, and prompt template (c) from the `crayon-cutout` skill. Describe the drawing's parts and colours, so the child recognises it. Make 1–2 takes, show the user and let them pick. Then: save it as a new prop `assets/rekvisita/<sak>/<sak>.png` + `rekvisita/<sak>.md` + the README table (repo rules), cut it with `cutout.py` (ai-video skill), cut the wheels as circles from the same picture (measure the black discs), and write `<sak>-rigg.json`. In the Short: `bild: { fil, x, y, skala, radie, hjul: [[fil, [x, y]], ...] }`. Line the cutout up on the drawing's bottom and width. Reference: `fordon/bil/` (red car, x 196, y 565, scale 0.8).
4. **Preview.** In the repo root run `python3 -m http.server 8765` (the app's preview can't start a server inside Documents, and `file://` can't load `kant.js`), then open `http://127.0.0.1:8765/produktion/youtube/shorts/gissa/<tema>/<ord>/`. ▶ plays with sound and loops; `hoppa(12)` in the console jumps to a frame. Check: is it guessable but not obvious at the question? Does the giveaway come after the question?
5. **Audio** (the user makes these; give them the exact texts):
   - once: the Suno bed and "Vad kan det vara?" (below);
   - per Short: `svar.m4a` ("En ko!"), `namn.m4a` ("Det är en ko.") and the real sound if it's not in `assets/ljud/effekter/` yet (add it to that README's table).
6. **Render:**
   ```bash
   node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/gissa/<tema>/<ord> --staende 4 9 16
   node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/gissa/<tema>/<ord> --staende
   ```
   The first command writes stills (`stills-staende/sheet.jpg`) to check. The second writes `<ord>-staende.mp4` with the bed (lowered during the pause), crayon sounds, voice and the real sound (about a minute for 23 s). Mp4s and stills are gitignored.
7. **Publish** (as `produktion/youtube/shorts-plan.md`):
   - title `Vad kan det vara? 🐄 | Gissa teckningen | lilla kritan`;
   - two sentences plus `#shorts #barnsång #lillakritan`;
   - made for kids: yes; no text in the picture;
   - an SRT with the three lines;
   - playlist `Gissa teckningen – <tema>`.

Later, per theme: a compilation (all drawings in a row, then three side by side, *"Var är kon?"*, pause, the cow hops). That's the second naming step; build it when a theme has 5+ Shorts.

## Suno: the bed (made once, Instrumental on)

Give the user the whole prompt in chat, every time.

**Style**
```
gentle toddler children's music, playful and calm, 96 BPM, 4/4, major key, glockenspiel and soft marimba melody, light ukulele strums, soft brushed shaker, warm round upright bass, cozy and simple, steady even tempo, loop-friendly phrases of 4 bars, no key change
```
**Exclude**
```
vocals, voice, choir, humming, whistling, heavy drums, electric guitar, synth lead, fast tempo, tempo change, key change, dramatic build, fade-in
```
**Lyrics**
```
[Instrumental]
[Intro: soft ukulele, 2 bars]
[Theme: glockenspiel melody over ukulele, 8 bars]
[Quiet break: only soft ukulele and bass, very sparse, 4 bars]
[Theme: glockenspiel melody over ukulele, 8 bars]
[Quiet break: only soft ukulele and bass, very sparse, 4 bars]
[Theme, 8 bars]
[Outro: ends cleanly on the home chord]
```
Save as `assets/ljud/musik/gissa-bad.m4a`. The engine uses the first ~22 s and lowers it to a third during the pause, so the start should be calm with no long intro.

## ElevenLabs

- **Voice:** BERÄTTAREN, the same voice in every Short. Not chosen yet; once it is, write its name here.
- **Text to speech:** model Multilingual v2 (Swedish); stability 0.6, similarity 0.8, style 0, speaker boost on, speed 0.9. Warm, calm and slow, a grown-up talking to a two-year-old, not a presenter. Make 3 takes, pick one, trim the silence, export m4a.

| File | Text |
|---|---|
| `assets/ljud/roster/vad-kan-det-vara.m4a` | `Vad kan det vara?` |
| `<short>/svar.m4a` | `En ko!` (bright, a little surprised) |
| `<short>/namn.m4a` | `Det är en ko.` (calm, falling tone) |

- **Sound effects (real sounds):** a short prompt in English, 1.5–2 s, for example `a real dairy cow mooing once, close, calm farm, no music, no voice`. Save as `assets/ljud/effekter/<lat>/<lat>-1.m4a` and add a line to the effects README. Set `lat` and `latText` (the preview's speech stand-in) in the Short.

## Themes: sound and coming alive

✓ = the sound already exists in `assets/ljud/effekter/`. Swedish wording of the actions: `format/shorts.md`.

| Bondgården | `lat` | Comes alive | `liv` |
|---|---|---|---|
| ko | `mu` | walks out calmly | `ga` ✓ built, `steg` ✓ |
| gris | `noff` | trots out with little hops | `ga` + hop |
| får | `ba` ✓ | skips out | hops out |
| häst | `gnagg` | trots out | `ga`, faster |
| höna | `kackel` | pecks twice, toddles out | pecks then `ga` |
| anka | `kvack` ✓ | waddles out | `ga`, more rock |
| katt | `mjau` | sneaks out | `ga`, low and smooth |
| hund | `vov` | runs out happily | `ga`, fast |
| traktor | `tuff-tuff` ✓ | drives out | `kor` ✓ built, `brum` ✓ |

| Fordon | `lat` | Comes alive | `liv` |
|---|---|---|---|
| bil | `tuta-tut` ✓ | toots, drives out to the right | `kor` ✓ built, `brum` ✓ |

| Lekplatsen | `lat` | Comes alive | `liv` |
|---|---|---|---|
| gunga | `gung-knarr` | swings back and forth, fades | `gunga` |
| rutschkana | `wiii` ✓ | the crayon slides down it | crayon path |
| sandlåda | `sand` | a little sand flies up and settles, fades | sand puff in code |
| spade | `spade-skrap` | digs twice, hops out | dip ×2 then hop |
| hink | `hink-dunk` | hops, splashes a little, hops out | hops |
| boll | `studs` (dunk for now) | bounces in place, out, back in from the left, then away | `studsa` ✓ built |
| gungbräda | `gungbrada` | tips up and down, fades | `gunga`, pivot in the middle |

## Don't

- No faces with a mouth on the drawings, no text in the picture, no fantasy colours.
- No second thing in the same Short, nothing moving in the background.
- No turning around or spinning when it comes alive, and no movement before it has been named.
- Never shorten the pause below 4 s.
- Never mention existing shows, characters or brands in prompts or texts.
