---
name: ai-video
description: Make AI video cheaply and consistently on OpenArt — lock characters, objects and backgrounds as images first, use a forgiving hand-made style (house style - toddler crayon blobs on white), choreograph motion with a stick-figure video Claude renders locally and passes as a video reference (proven - the model copies its timing and positions but not its look), and build long videos from short shots on a reused stage. Use when the user says "ai video", "/ai-video", "make a video with AI", "animate this", "stick figure guide", "claude motion", "video-to-video", "consistent characters in video", "toddler episode", or complains AI video is uneven or expensive.
---

# AI video

AI video is a slot machine: every generation costs credits and drifts. This skill removes the chance *before* paying for video: images lock the look, a free stick-figure video locks the motion, and video is generated once per shot at draft quality.

Skill folder `~/.claude/skills/ai-video` (`$SK`): `template/animatic.html` (stick-figure guide), `TESTS.md` (every test, cost and verdict — read it when unsure).

## Rules

1. **One idea per shot.** 1–2 characters, a static camera, 5–6s. Plain white or one flat wall.
2. **Images before video, code before AI video.** Stage shots (enter, hop, bounce, roll) go the free code route first. Images cost 15–20 credits, video 100–220. Approve every character, object and background as an image, then reuse the exact same files.
3. **Hand-made style.** Photoreal shows every warp; crayon and flat textured shapes hide it. House style is below.
4. **Draft cheap.** Wan 3.0, 480p, no audio. Re-render only the keepers at 720p/1080p.
5. **Long video = short shots joined.** Chain the last frame of one shot into the next as its start frame. Join with ffmpeg.
6. **Price first.** `openart_model_cost` before every run; tell the user the credits; ask before anything over 300.
7. **Unclear look or direction? Sketch options in HTML first.** Before building (or generating) anything the user hasn't pictured yet — an intro, a new scene, a camera idea — make 2–3 animated options in one HTML file with the real cut-out art (use the `sketch` + `frontend-design` skills: a switcher, keys 1–3 for one option, 0 for side by side, a ~4 s loop each, one line per option on what's new to build). Serve it locally (`python3 -m http.server`) so images load, let the user pick, then build only the chosen one. Free, and far cheaper than a wrong render.

## House style — crayon cutout

The house look (palette, prompts for characters, faceless art, props and plates, the code-face spec and do's and don'ts) lives in the **`crayon-cutout`** skill (`~/.claude/skills/crayon-cutout/SKILL.md`). Load it before you make any art.
Describe a user's style reference in words rather than feeding frames from an existing show; make our own characters.

## Pick a route per shot

| Route | When | Model, cost (480p) |
|---|---|---|
| **Refs only** | One simple action (blink, hop, wave) | `wan3-0` element2video, 100 / 5s |
| **Keyframes** | You need the shot to start and end on exact poses | image2image start + end frame (edit the start to make the end), then `wan3-0` image2video with `endFrame`, 40 + 100 |
| **Stick-figure guide** | Several things moving, timing matters, bounces, entrances | `wan3-0` element2video with refs + guide video, **200 / 5s, 220 / 6s** (a video ref doubles the price) |
| **Code** (try first) | Stage shots: things enter, roll, hop, bounce, wave; exact sizes or music sync | Approved PNGs animated in HTML/SVG, **0 credits**, ~12s render. Expressions (blinks, looks, happy, surprised, quack) are done in code too. Not for head turns or 3D turns |

## Code route — step by step

1. **Art, once per character (20 credits).** After the character is approved, image2image it with "remove the face completely, no eyes, no beak, keep everything else exactly the same". Nano Banana keeps it pixel-aligned.
2. **Cut out.** `$SK/.venv/bin/python -I $SK/scripts/cutout.py in.png characters/cut/out.png` → transparent PNG with an 8px white sticker rim, so it sits on any background. Cut the beak/mouth from the original art by colour (see test H) and split it at its seam line so the lower half can drop open.
3. Copy `$SK/template/code-shot.html` to `<project>/code-shot/<shot>/index.html`; fix the `href`s. Paste the shot's `SHOTS` from its stick guide (same keys, same `bounce`), so guide and shot stay one source of truth.
4. **Layers** are clip paths in the PNG's own 1024px coordinates: legs below the body line, the wing cut out with an ellipse, a patch of plain body texture over the drawn wing so it doesn't show twice. The face sits inside `#body`, so it squashes with it. Set the feet anchor and scale (`DUCK`, `BALL`) and the `EYES` positions from the art.
5. **Face track:** `FACE` = `[from, to, mood, targetProp]` with moods `look` (pupils follow a prop), `happy` (^ ^), `surprised` (big eyes, beak open), `quack` (beak opens and closes; time it to `beats.json` for singing). `BLINKS` = list of times.
6. Render stills and the video exactly as for a stick guide (step 2 below). Compare guide and shot side by side.

Built in: squash and stretch from vertical speed, rolling spin, breathing, a wing wave, and an SVG `feTurbulence` "boil" re-seeded every 3 frames.
Gotchas: with white-background PNGs instead of cutouts, set `mix-blend-mode:multiply` on **each image**, not on the group, or a layer's white background covers what's under it. A `<use>` copy can't be changed from script, so write each eye out in full.
Motion rules (user feedback, test I): never spin or turn a character (flat 2D art can't turn; use a circle hop with a wobble). Smooth jumps: `bounce` with 32 steps, squash eased around touchdown, legs tuck gradually. A waving limb must lift clear of the body outline and peak on the word. For more shots with the same characters, use the shared rig `code-shot/cast.js` in the Lilla Kvack project (`CAST` config per character, `addActor` + `pose(g, who, {x, y, h, tilt, sx, sy, tuck, up, eyes: open|happy|big|half|closed, look, open})`, `headPoint` for props on heads, `sing` for mouth on syllables); `chorus3` is a two-actor example, `verse3` adds a code moon face, z's and a fade. Walking: `code-shot/legs.js` splits the legs into a hip band plus two legs that take turns (pass `step` = walk phase to `pose`). Title card: `code-shot/intro` (crayon letters with a grain filter, drop in and bounce). Scene changes: `assembly/iris.sh` (scalloped crayon iris wipe with a cream rim; give the outgoing shot a 0.7s tail so sync holds). Give the filter `filterUnits="userSpaceOnUse"` with a full-frame region. A stiff wave means the art needs separate parts: ask the image model for the character as layers (body, wing, legs) on white.

## Stick-figure guide — step by step

1. **Choreograph.** Copy `$SK/template/animatic.html` to `<project>/stick-guide/<shot>/index.html`, edit `SHOTS`:
   - actors: keys `[t, x, y, pose]` (`stand walkA walkB wave sit`), y = feet on `GROUND` (860).
   - props: circles `{shape:'circle', r, keys:[[t,x,y]]}`, y = `GROUND - r`.
   - `bounce(t0, t1, x0, x1, y, hops, height)` makes decaying hops; wrap actor hops in `pose(…, 'stand')`. Canvas is 1920×1080; x > 1920 is off-screen right.
2. **Render (free).** Stills to check: `node ~/.claude/skills/launch-video/scripts/render.mjs <dir> 0.5 1.5 2.5 3.5 4.5 5.5` → `stills/sheet.jpg`. Read it. Then the video: same command without times → `launch.mp4` (rename it; delete `launch-web.mp4`).
3. **Upload.** `openart_upload_sign` (mediaType video, purpose create-video, exact byte size) → `curl -X PUT -H "Content-Type: video/mp4" -H "Content-Length: <size>" --data-binary @file '<signURL>'` → `openart_upload_metadata_get` to confirm.
4. **Generate.** `wan3-0` element2video, duration = guide length, `audio: false`, refs: characters, objects, background (if any), then the guide video. Prompt:

```
<style line>. Static camera.
Image 1 is <character>: keep shape, colours and texture exactly.
Image 2 is the <SMALL red ball>. Image 3 is the <big teal ball>, about as tall as the duckling.
Image 4 is the background: keep it unchanged.            ← include a background image; don't rely on "white" in words
The video reference is a stick-figure motion guide only: copy its timing, positions and bounces exactly
(the stick figure is <character>, the small grey circle is <…>, the big grey circle is <…>),
but never its look: no stick figures, no grey circles, no grey line.
Action: <the beats in order, one sentence each>. No shadow, no text.
```

5. **Check against the guide.** Pull frames at the same times from both and stack them:
   `ffmpeg -ss <t> -i <file> -frames:v 1 -vf scale=400:-1 <out>.jpg` per time, then `hstack`/`vstack`. Read the sheet and tick each beat.

What the guide controls (proven twice): timing, order, entry side, x-position, where things stop. What it does **not** control: **size** — the model sizes objects from the reference images, so state sizes relative to the character in words, or give one ref with both at the right scale.

## Known glitches and fixes

- **Extra limbs** (a second wing during a flap): give a front + side reference sheet, or say "only one wing visible".
- **White turns grey**: pass a plain white background image as a reference, or fix in ffmpeg (`-vf eq=brightness=0.04:contrast=1.05`).
- **"Messy crayon" prompts come out as tidy coloured pencil.** Describe the target concretely (blob, no outline, white rim, mottled fill) instead of asking for "messy".

## Practicalities

- OpenArt jobs return a `historyId`; there's no wait tool, so start a background `sleep` (30s for images, 240–300s for video) and then `openart_creation_get`. Don't poll in a loop.
- Download results with `curl -o`, keep them in the project (`characters/`, `backgrounds/`, `videos/`, `stick-guide/`, `archive/`), and make frame sheets with `ffmpeg -vf "fps=2,scale=320:-1,tile=4x3" -frames:v 1`.
- Seedance option: Seedance 2.0 Mini element2video, 4s, 480p, no audio = 80 credits (720p + audio = 160); good for drafts, then finish keepers on Seedance 2.5/2.0.

## Songs (music-first videos)

- **Give the user every prompt (Suno, image, video) as ONE copyable code block — style, excludes and lyrics together, never split.**
- Write lyrics with even 7-syllable lines; the user makes the song in Suno (style in English, lyrics in the target language, steady tempo, "no tempo changes"; write every chorus out in full).
- **Suno's m4a download embeds the lyrics with per-line timestamps** as a subtitle track: `ffmpeg -i song.m4a -map 0:s:0 lyrics.srt`. Use those as the timeline; no guessing.
- Beats: `$SK/.venv/bin/python` has librosa → `librosa.beat.beat_track` → `beats.json`. At ~100 BPM one sung line ≈ one bar ≈ 2.4s, so **one clip = two lines**, cut on line starts.
- Chorus clips are generated once and reused every time it comes back. Intro/outro instrumental = ffmpeg zooms on stills.
- Stick guides for beat-heavy clips (hops, stomps) are timed from `beats.json` and rendered with the song underneath to check sync by ear before paying. Place moves on the **sung syllables** (eighth notes, ~0.3s), found with `librosa.onset.onset_detect` on the clip's slice — not just on the beat.
- One timed action needs no guide: "one big jump at about 4.5 seconds" in words landed within 0.05s (TESTS round 3).
- If the user regenerates the song, re-extract lyrics + beats; retime a guide by scaling all times by new/old line length.
- Assemble with exact frame counts from the song times (24 fps) — see `assembly/build-full.sh` in the Lilla Kvack project as the template: clip → tpad to length, free holds = slow push-in on the last frame, chorus clips reused, `colorlevels` lift for grey-white clips, fade where the song really ends (check loudness; Suno may append instrumental).

## Toddler pedagogy (age ~2)

For toddler episodes, also check the cut and the story against these (Lilla kritan `format/regler.md` holds the Swedish original):
1. **Tempo:** close-ups 1.5–2.5 s, shots average at least ~3 s, at most one cut per sung line.
2. **One thing at a time:** at most one background thing moves while the main action happens.
3. **Real-world:** only the talking vehicle is fantasy; real animal sounds, vehicles behave like vehicles.
4. **Participation:** after the question to the viewer, pause 4–5 s, then a character models the answer; invite waving, hopping, honking.
5. **Everyday life:** one everyday action and one "thank you" per episode.

## Code episodes: polish and pipeline (learned on Lilla kritan 006)

Whole episodes built as code scenes (SVG, a shared `kit.js`, Playwright + ffmpeg `render.mjs`, `satt-ihop.sh` for the rough cut). What made them look finished, and what kept them fast:

**Polish in the shared layer first**, so every scene gets it at once (load the `animation-principles` skill for the numbers):
- **Breathing** on every figure (scale 1.5 % y / 0.8 % x around the feet, ~2.8 s, own phase per figure). Nobody is ever a frozen sticker.
- **Camera float:** zoom in 1.2 % and drift 3–4 px slowly, so still shots aren't dead. Anything drawn outside the camera (an iris, an overlay) must use screen coordinates (`f.skarm`), or it slides off the face.
- **Hops** crouch before (60–120 ms) and land with a squash and a small rebound. **Waves and pops** use ease-out with a little overshoot (`over`). No linear `lerp` on anything the eye follows.
- **Never jump between poses inside one shot.** Blend the last pose of the previous line into the new one over ~0.35 s (`blanda` in `refrang.js`). Hard pose switches on line changes were the most "unpolished" thing in the cut.
- In group shots, at most one or two characters do the big move at a time; the rest idle.
- Scrolling backgrounds: position = the integral of speed, never `t × speed`, or it jumps when the speed changes.

**Selling the setting and the journey:**
- A moving boat or vehicle needs things passing behind it: islands, a sail and clouds on the horizon at 0.3–0.45 × the water speed (parallax). Without them, it reads as standing still.
- In a "find the colour" episode, keep that colour out of the background props, so only the targets are that colour.
- A named place has to be readable at a glance: a disco needed a checked floor, a big glittering ball and soft moving light pools (no strobes for toddlers).
- The story's key beat must be visible: "it floats away" needed the orange to step out and shrink on each word, not bob in place.

**Sound:** the rough cut must mix each scene's `<scene>-effekter.wav` at its start time, or nobody hears the effects. New effects can come from existing ones: pitch a horn down a fourth plus lowpass for a foghorn, slow a swim splash to 0.8 for lapping waves, cut sobs out of an existing sad clip.

**Child's-eye review of a rough cut:** a contact sheet with one frame every 2 s (`fps=1/2,scale=384:-1,tile=6x5`, one sheet per minute), then full-size frames at suspect moments. The usual findings are:
- the same framing for over 8 s
- a zoom that cuts off the head
- a story beat that doesn't show on screen
- a setting that doesn't read
- the first target of the game too small

**Speed:**
- Preview with `render.mjs --snabb` (960×540, 15 fps, ~3× faster) and `satt-ihop.sh --snabb` (37 s instead of minutes). Render at full quality once, when a scene is done. Use stills (`render.mjs <scene> 2 7.5 12`) for most checks.
- Several pages in one Chromium do **not** speed it up (47 s against 19 s): screenshots queue in one browser.
- With parallel sessions, only the main session builds the storyboard and rough cut. At most two sessions render at once. Look for hung `satt-ihop`/ffmpeg processes from finished sessions, which eat the CPU.
- To show a cut quickly after merging, copy each session's finished scene mp4 + effects wav into the main checkout and run the rough cut, instead of re-rendering everything.

**Merging session branches:** generated files (storyboard `index.html`, frames) conflict on every merge. Take one side, then rebuild them once with `bygg.py`. If the main checkout has someone else's staged files, merge in a temporary worktree and fast-forward.

## Scene patterns for long videos

- **The stage:** fixed camera, one background, character stays put, things enter and leave. Cheapest and most consistent.
- **The road:** vehicle or walker centred, objects appear ahead and pass; one shot per encounter, same angle. Add parallax props on the horizon (slower than the foreground) so the travel reads.
- **The window:** character still, the world behind changes (day/night, weather).
- **The loop:** same image as start and end frame; repeat under music.
- **Free time:** holds, slow push-ins and title cards done in ffmpeg, not AI.

Log every test in `TESTS.md`: route, model, credits, verdict, why.
