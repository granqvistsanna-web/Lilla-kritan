# Lilla Kvack — scene plan (calm version, song v2)

Song: `audio/Lilla Kvack v2.m4a`, 96 BPM, one sung line ≈ 2.59s, one eighth note ≈ 0.324s.
Timings from `audio/lyrics-v2.srt`, beats in `audio/beats-v2.json`. (v1 song and v1 timings are kept but no longer used.)
Rule: one simple thing per scene. Clips are Wan 3.0, 480p, no audio; the gaps are free ffmpeg holds (slow push-in on a clip's last frame).
The song runs on with ~30s of instrumental after the outro (83–112s), so the film fades out at ~86s.

| Song time | Section | Picture | Source | Credits |
|---|---|---|---|---|
| 0.0–7.9 | Intro (speldosa) | Garden, slow zoom in | free | done |
| 7.9–13.1 | Chorus, lines 1–2 | **R1**: hops on "hopp hopp hopp", upp, ner, opp | stick guide | done (220) |
| 13.1–20.1 | Chorus, lines 3–4 | **R2**: white. Kvack sways happily, one big jump on "ja!" (≈4.5s into the clip) | refs only, 7s | **140** |
| 20.1–30.3 | Verse 1 | **V1**: ball rolls in, Kvack looks + hold | refs only | done (100) |
| 30.3–42.5 | Chorus | R1 + R2 reused | free | 0 |
| 42.5–52.7 | Verse 2 | **V2**: playground. Nalle walks in from the right on "tramp tramp tramp", they wave on "Hej hej hej" + hold | refs only, 5s | **100** |
| 52.7–65.4 | Chorus | R1 + R2 reused (last line is 0.6s longer → hold R2's last frame a bit) | free | 0 |
| 65.4–70.5 | Verse 3, lines 1–2 | Evening, Kvack sitting (first frame of V3), slow zoom in | free | 0 |
| 70.5–79.3 | Verse 3, "gäsp gäsp gäsp…" | **V3**: evening. Kvack yawns, eyes close, falls asleep + hold | refs only, 5s | **100** |
| 79.3–86 | Outro (speldosa) | V3 last frame, slow zoom out, fade to black from 83s | free | 0 |

**To spend: 340 credits** (R2 140 + V2 100 + V3 100). Balance ≈ 855 → ≈ 515 left for re-rolls or a 720p re-render of keepers.

Uploads needed (free): `backgrounds/playground.png`, `backgrounds/evening.png` (cropped versions).
Refs: Kvack = `characters/duckling-crayon.png` + `kvack-sheet.png`; Nalle = `characters/bear-crayon.png` (say "Nalle is a bit taller than Kvack"); white = `backgrounds/white.png`.
Fixes known from round 2: lift grey to white on R2 in ffmpeg (`colorlevels=…0.88`).

Order: generate R2, V2, V3 in parallel → check each (frame-tracking for R2's "ja!" jump) → extend `assembly/build-test-cut.sh` into `build-full.sh` → full 86s film.
