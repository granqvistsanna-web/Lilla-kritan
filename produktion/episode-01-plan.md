# Episode 01 — Duckling's Ball (process test)

Goal: run the ai-video skill end to end — beat sheet → bible → shots → join — and see what a ~20s episode costs and where it breaks.

Stage: solid white, static camera. Cast: crayon duckling (`characters/duckling-crayon.png`) + a crayon ball (new).
Model: Wan 3.0, 480p, 5s, no audio, seed 4242.

| # | Shot | Route | Start from | Credits |
|---|---|---|---|---|
| 1 | Duckling blinks, hops, flaps | — | **reuse** `videos/E-duckling-hop.mp4` | 0 |
| 2 | A red ball rolls in from the right and stops beside the duckling; duckling looks at it, surprised | refs only (duckling + ball) | — | 100 |
| 3 | Duckling nudges the ball with its beak, ball rolls a little to the left, duckling hops after it | image2video | **last frame of shot 2** | 100 |
| 4 | Duckling sits beside the ball and waves its wing bye-bye | image2video | **last frame of shot 3** | 100 |
| — | Crayon ball reference (same blob-crayon recipe) | text2image | — | 20 |

Join: ffmpeg, short crossfades, 1s hold on the last frame. ≈ 20s.
Budget: 320 credits, plus up to 100 for one re-roll if a shot fails.

What this tests
- Does chaining last frame → next start frame keep the duckling consistent across cuts?
- Does reusing a clip and a fixed stage really cut cost?
- How long does a full episode take end to end?
