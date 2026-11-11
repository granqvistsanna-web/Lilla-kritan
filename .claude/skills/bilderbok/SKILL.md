---
name: bilderbok
description: Make a Lilla Kritan "bilderbok" episode, one in the series of everyday stories (bada, borsta tänderna, äta, leka, ta på kläder, sova) with a different character each time, the way 020 Grisen badar was made — a song-free picture-book episode with ONE animal figure, narrated by Malin (ElevenLabs v3 with emotion tags), where the animal answers only with sounds, ears and face. Holds the story core (problem, kritan draws a helper thing, thanks, play, solve with the child's help, goodbye), the six approval gates in order, the hard rules (no animal names, cuts not zooms, calm motion), what Claude does itself (Flow images, ElevenLabs and Suno in the browser, Openverse, cutting and filing) and the QA pass. Use when the user says "bilderbok", "ny bilderbok", "bilderboksavsnitt", "picture book episode", "an episode like grisen badar", "som grisen badar", "avsnitt utan sång", "vardagsberättelse", "everyday story", or names an animal plus an everyday routine for a new episode ("kaninen borstar tänderna", "lammet tar på kläder", "kon äter").
---

# Bilderbok

One episode = one animal with a v2 rig, one place, one everyday routine, about 3 min. No song: Malin talks with the animal like an adult with a child, and the animal answers with a sound family (never words). Every picture is a spread: one image, one motion, one line, and the animal's answer in the pause after.

**The full recipe is [`format/bilderbok.md`](../../../format/bilderbok.md). Read it before the first step** (it has the tables, numbers, commands, templates and theme list; this file is the order of work and the rules that get broken most). The model episode is `avsnitt/020-grisen-badar/`. Also load `lk-figur` (rig and motion) and `vita-kanter` (rims) before building the scene.

## The series

The bilderbok is a series on the Lilla Kritan channel, called *Djuren hittar på!* on screen (shared Tittut-style intro card in `produktion/youtube/bilderbok-intro/`, Sanna 2026-11-11): each episode is one everyday event (bathing, brushing teeth, eating, playing, getting dressed, going to bed) with one character and Malin. The character changes between episodes; the form never does. Five things change per episode: **the event, the character, the place, the helper thing and the thing done three times.** The recipe's table "Serien: vardagsberättelser" maps each event onto the core below.

Before the script, check three things (recipe, same section):

1. **The character has a v2 rig** (`assets/karaktarer/<mapp>/premium/uttryck.html`). If not, make it first with `lk-figur`.
2. **The place exists in 16:9.** Badrummet and lekplatsen do; kitchen, hall and bedroom are new plates, made once and reused across the series.
3. **The event can be played with the rig:** short straight arms, nothing bends or turns. Things worn are cut-outs laid on top in code; things held sit at the hand tip like 020's soap; teeth, food and smudges are drawn in code like the mud.

**One voice per character:** each character gets its own cute sound family of 8 feelings in a fixed order (hello, delighted, giggle, cosy sigh, curious, grumpy, chatting, goodbye), reused in all its episodes. Check `assets/ljud/effekter/` first; several characters already have some.

## The story core

1. **Problem:** a small everyday one, the animal doesn't want to.
2. **Kritan draws a helper thing** inside the scene (contour, short guessing pause, the real picture fills in). *"Varsågod!"*
3. **Thanks:** *"Ska vi säga tack?"* (2.5 s pause, keep the tack scene quick), *"Tack!"*. Never *"Vad säger man?"* (too sharp, Sanna 2026-11-11)
4. **Play** with the thing, one small surprise.
5. **Solve it three times** with the same phrase; the last time the animal doesn't know where, and the child helps: *"Kan du hjälpa …? Kan du se var … är?"* (5 s pause, close-up, the spot shimmers after 3 s), *"Ja, där! Ja, på …!"*
6. **A short play beat, goodbye,** kritiris.

## Gates: stop for Sanna's yes at each one

Each step builds on the one before, so never build past a gate that isn't approved.

| # | Gate | Claude prepares | Sanna decides |
|---|---|---|---|
| 1 | **Script** | `avsnitt/NNN-namn/manus.md` from the template in the recipe: core, spread table, motion table, line block with v3 tags, rule check | the story and every line |
| 2 | **Props** | 4 takes per prop (Flow, Nano Banana, the episode's chosen props as style reference), side by side in `original/jamforelse.jpg`; cut-out, `rekvisita/<sak>.md`, README row | which take |
| 3 | **Voice** | Malin's take from the paste block, split with `verktyg/dela-tagning.py`, normalised, lengths measured into `ROST` | which lines to redo |
| 4 | **Animal sounds** | one cute cartoon family of about 8 feelings (ElevenLabs SFX) plus the thing's sound; Openverse first for everything else; a `ljud/provlyssna-*.m4a` with all takes in a row | which take is which feeling |
| 5 | **Animatic** | `storyboard/rader.mjs` (row lengths from voice lengths plus pauses), `bygg.mjs --animatik` | pictures and pace |
| 6 | **Fast preview** | the scene, `render.mjs --snabb`, stills and contact sheet | motion and cuts, then full render |

After gate 3, new lines get new numbers and a short take of their own. Re-record the whole script only to change the tone.

## Rules that get broken

- **No animal names in anything spoken or in voice file names:** *"Hej, grisen!"*, never the figure's name.
- **Intro is 1 s of the Lilla Kritan logo** (from 021): no jingle, no title card. Film time = scene time + 1.0.
- **Clear hello and goodbye:** *"Hej, …! Hej, hej!"* with a wave, and *"Hej då, …!"* + *"Hej då! Vi ses snart!"*. Every line has a v3 emotion tag and there are a few giggles.
- **Never *"Vad kan det vara?"*.** The drawing intro says *"Hm … vad blir det nu?"*.
- **Short lines,** one thought each. Repetition, *"Oj!"*, small laughs. Less talk is better, and spaced out: 0.7 s extra air on every row with a line (`GLES`).
- **The picture on the word:** the spot is gone exactly on *"borta!"* (word time in `BORTA`, measured with whisper per take), the bubble pops on *"plopp!"*.
- **Three questions to the child with a 4–5 s pause,** a *"Varsågod"* and a *"Tack!"*, nothing scary.
- **Camera: hard cuts between still framings.** The only zoom is from the paper into the first place. Kritsvep only between intro and drawing (and for a change of place, which a bilderbok doesn't have). Ending: kritiris. See "Zoom, klipp eller övergång?" in the recipe.
- **Calm motion, one thing at a time.** No bouncing, no spinning, no mirroring, no bent arms. The arm is the rig's own straight arm, attached to the body; a waving arm goes behind the body.
- **Happy faces have open eyes.** Closed-eye joy only where a row asks for it. A sleeping figure lies down.
- **Kritan stays small** (scale 0.33, ×0.7 in close drawing shots), has no face, never turns and **never taps**: while the child guesses it only hovers and sways.
- **Never fade a sound file out from `st=0`** (it silences the whole file). Peak targets: voices −3 dBFS, soft effects −9, long beds −12.
- **Max 1 figure and 1 place.** Tell Sanna when the script breaks `format/regler.md` in a way the recipe doesn't already list.
- **Don't change a figure** whose status is `✅ Referensark klart`, and don't add props on your own: props are made with Sanna (gate 2).

## What Claude does itself

Generate, download, cut and file; Sanna only chooses. Details and the folder table are in the recipe under "Det Claude kan göra själv".

- **Images:** the Flow tools (`flow_generate`, `type: "image"`, free). OpenArt only after quoting the cost.
- **Voice, sound effects, music bed:** the browser on ElevenLabs and Suno, where Sanna is signed in. Never type passwords. Ask once per batch before downloading (what, from where, how big), and before anything that costs credits.
- **Files go straight from `~/Downloads` to their folders,** renamed: originals under `produktion/ljud-original/…` or `assets/<…>/original/`, finished files under `assets/…`, with the README row and credit.
- If the browser gets stuck, ask Sanna to drop the files in `~/Downloads` and carry on from there.

## Build and check

1. Start from a copy of `avsnitt/020-grisen-badar/` (recipe, section 8). Write the real sounds directly in `rader.mjs`; don't copy 020's `BYT` and `GLADARE` swap layers.
2. Preview with `--snabb`. Full render at most two Chromium at a time (`film/rendera.sh`), then `film/satt-ihop.sh`. Save the old film first.
3. Before Sanna sees it, run the QA in section 7 of the recipe: duration (ffprobe), loudness (ebur128, −14 LUFS, peak ≤ −1.5), contact sheet, whisper in 30 s chunks against `rost*.txt`, pauses after the questions (4–5 s), and listen that the animal's sounds are audible.
4. Add the episode to `harriets-favoriter.md`. `python3 verktyg/prompt.py --lista` must run clean.

## Known gaps (2026-11-10)

- 020 has no Suno bed and no outro yet, so `satt-ihop.sh` has no slot for either. Add them when 020 gets them.
- There is no clean template folder; the start is a copy of 020. Make `avsnitt/_mall-bilderbok/` once 020 is final.
- The browser flows for ElevenLabs and Suno, and the normalising command in the recipe, were written from the 020 work but not run end to end. Check the first result of each before doing a batch.
- 020 is the model as of round 5 (2026-11-11). Read its latest `rader.mjs` and `scener/*/index.html` too: the recipe can lag behind a later round.
