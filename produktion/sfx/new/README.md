# sfx/new — sounds the user generated and supplied (2026-11-03), all 8 s takes; mix-sfx.py cuts the parts it uses.

| file | used as | note |
|---|---|---|
| duck-3.mp3 | snore | soft breath cycles |
| duck-1.mp3 | sigh | first breath only |
| chime-2.mp3, chime-4.mp3 | twinkle | moon smile, then the stars |
| light-4.mp3 | giggle (Kvack) | |
| teddy-3.mp3 | laugh (Nalle) | |
| ball-soft-3.mp3 | bounce | the small red ball |
| ball-large-3.mp3 | big-bounce | the big teal ball |
| quack-2b.mp3 | quack (Kvack talks) | other quack-* takes unused so far |
| muffled-4.mp3 | phone-bear (Nalle down the phone) | muffled-2 unused |
| bear-4c.mp3 | bear-hi (Nalle's waves) | other bear-* takes unused |
| happy-3a.mp3 | hello (Kvack picks up) | other happy-* takes unused |
| ball-large-2.mp3 | — | unused alt of ball-large-3 |
| light-1.mp3 | — | unused alt of light-4 |
| giggle-duck-2.mp3 | — | "Playful duck giggles", unused so far |

Also added: `audio/intro-jingle-alt.mp3` — the other Lilla Kvack jingle take (11:26), unused; `intro-jingle.mp3` is the 11:32 take.

`ring-toy.wav` (ring) is not a supplied take: a 0.55 s toy bell trill synthesized in numpy (1320/1760/2640 Hz, struck 22×/s) for the garden phone.

## Added 2026-11-03 (second batch, all 8 s takes, none used yet)

Sound bursts (s) were found with `librosa.effects.split`, top_db 30. Pitch is the median, to tell the voices apart: Nalle is low, Kvack is high.

| file | from Downloads | pitch | bursts |
|---|---|---|---|
| teddy-happy-1a.mp3 | Happy_cartoon_teddy_ #1 (…035149) | 134 Hz | 0.07–3.56, 3.98–7.66 |
| teddy-happy-1b.mp3 | Happy_cartoon_teddy_ #1 (…018903) | 180 Hz | 0.00–0.94, 1.74–2.58, 3.16–4.41, 5.03–6.29, 6.85–7.84 |
| teddy-happy-2.mp3 | Happy_cartoon_teddy_ #2 | 203 Hz | 0.34–2.88, 5.49–7.27 |
| teddy-happy-4a.mp3 | Happy_cartoon_teddy_ #4 (…032604) | 177 Hz | 0.10–2.10, 2.39–4.85, 5.19–7.34 |
| teddy-happy-4b.mp3 | Happy_cartoon_teddy_ #4 (…012617) | 234 Hz | 0.00–0.78, 1.63–2.95, 4.01–5.76, 6.39–8.00 |
| toddler-happy-1.mp3 | Happy_cartoon_toddle_ #1 | 335 Hz | 0.00–0.74, 1.52–2.43, 3.16–4.06, 4.78–5.70, 6.40–7.31 |
| toddler-voice-2.mp3 | cartoon_toddler_voic_ #2 | 343 Hz | 0.01–1.00, 1.99–2.97, 4.02–5.02, 6.03–6.99 |
| duck-whimper-1.mp3 | sad_cry_whimper_duck_ #1 | 252 Hz | 0.09–1.87, 2.88–4.42, 5.65–7.58 |
| sad-1.mp3 | Melancholy_cartoon_s_ #1 | 209 Hz | 0.00–1.14, 1.95–2.77, 4.23–5.09, 6.64–7.26 |
| sad-2.mp3 | Melancholy_cartoon_s_ #2 | 348 Hz | 0.31–2.22, 3.39–6.03 |
| sad-3.mp3 | Melancholy_cartoon_s_ #3 | 299 Hz | 0.17–1.79, 2.79–5.04, 5.38–6.61 |
| sad-w-3.mp3 | Melancholy_cartoon_w_ #3 | 869 Hz | 0.00–1.16, 2.07–4.63, 5.24–7.70 (very high, probably a whistle or wail) |

Cartoon_bumblebee_bu_ #4 (…965907) was byte-identical to `bee-bu4.mp3`, so it wasn't added again.

## Added 2026-11-03 (third batch: expressions)

| file | cue | used for | bursts (s, top_db 30) |
|---|---|---|---|
| uhoh-2.mp3 | uhoh | Kvack, ball stuck in the tree | 0.16–0.42, 0.45–0.77, 1.31–1.95 … |
| surprised-2.mp3 | gasp | Kvack, bee bump + ball falling | 0.58–1.31, 5.38–5.79 |
| hnnf-3.mp3 | hnnf | Kvack's four jumps | 0.10–0.38, 1.50–1.76, 2.30–2.56, 3.04–3.36 … |
| wheee-1.mp3 | wheee | Kvack hopping after the bee | 0.51–3.07 (first 1.2 s used) |
| boop-2.mp3 | boop | bee boops the beak | 0.00–0.19 |
| bee-happy-1.mp3 | bee-hum | bee circling | continuous (first 2 s) |
| teddy-idea-1.mp3 | idea | Nalle sees the big ball | 4.03–4.29, 4.96–5.28 |
| hup-2.mp3 | hup | Nalle's stomp and throw | 0.42–0.67, 2.24–2.53 |
| mmm-toddler-1.mp3 | mmm | Kvack after her milk (bedtime) | 0.10–0.86, 0.90–2.05 |
| surprised-1, mmm-duck-3, wheee-2, bee-happy-3 | — | unused alternates | |
| leaves-3.mp3 | rustle | tree shakes (stuck, stomp, ball knocked out) | 0.42–8.00 continuous |
| whoosh-4.mp3 | whoosh | Nalle's throw, Nalle's big kick-up | 0.19–7.62 continuous |
| pop-4.mp3 | pop | ball pops out of the leaves | 0.26–3.55 … (first 0.36 s used) |
| teddy-byebye-2.mp3 | byebye | Nalle's goodbye wave at the bus | 0.74–1.47, 2.30–3.17 … |
| ooh-teddy-4.mp3, ooh-teddy-1.mp3 | ooh | Nalle watching the bee arrive | 1.41–7.78 / 0.35–7.52 (first ~1.2 s used) |
| yay-duck-3.mp3, yay-duck-2.mp3 | yay | Kvack's celebration hops | 0.45–2.53 … / 0.00–1.12 … |
| yay-teddy-1.mp3 | yay-bear | Nalle's first celebration hop | 0.00–2.27 … (first 1.2 s) |
| more-4.mp3 | more | Kvack asks for more berries (bus snack) | 0.35–0.96 … |
| nom-3.mp3, nom-2.mp3 | nom | munching berries (bus snack) | many short bursts, first ~1 s used |
| more-3.mp3 | — | unused alternate (continuous) | |
