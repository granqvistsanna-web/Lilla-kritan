---
name: vita-kanter
description: One rule for every white sticker rim in Lilla Kritan, so figures, props, the boat, birds and stickers look the same whether they are close up or far away. Rim = 3 px + 1 % of the item's height in frame, almost solid white, a little crayon grain, a lightly hand-cut edge. Ships as verktyg/kant.js (one script tag, figures get it automatically). Use when the user says "vita kanter", "white rim", "white outline", "sticker rim", "kanten runt", "the rims look different", or starts the code scenes for a new episode.
---

# Vita kanter

Every figure and thing in Lilla Kritan is a paper sticker with a white rim. The rim follows **one rule** across all episodes:

**rim in the finished frame = 3 px + 1 % of the item's height in frame** (measured in a 1920 px wide frame)

- The rim belongs to the item, like a real sticker: it grows a little in a close-up and shrinks when the item is far away.
- The 3 px base means small and distant things (an orange far out on the water, a small sticker) never lose their rim.
- The look is the same everywhere: almost solid white, a little crayon grain (a few small gaps where the background shows through), and a lightly hand-cut edge, wobbly but never lumpy.

Examples in a 1920 frame: Disa in a close-up gets 9 px, in a two-shot 7 px and far away 5 px. The basket, fish, vest and bird get about 4 px. The orange far away gets 3 px.

The sketch that set the rule is `avsnitt/006-orange-baten/scener/_skiss/kanter/kanter-forslag.jpg` (Sanna approved it 2026-11-05).

## How it is built

Two parts add up to the rule:

1. **The 1 % is baked into the images.** Cut-out PNGs (characters from the cutout step, things from `vit_kant` in an episode's `storyboard/bygg.py`) already carry a white rim of about 1 % of their height. When you make a new prop image, bake its rim as `round(0.01 * item height in px)`, at least 1 px.
2. **The 3 px base is added in code** by `verktyg/kant.js`, recalculated every frame from the item's size on screen, so it stays 3 px in a close-up and far away alike.

Things drawn only in code, with no baked rim, take the whole rule in code: `kant.lagg(g, { andel: 0.01 })`.

## Use in a scene

Load the script right after `kit.js` (from `avsnitt/NNN/scener/<scene>/index.html`):

```html
<script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script>
```

- **Figures** (`kit.figur`) get the rim automatically. Turn it off with `kit.figur(slug, { kant: false })`.
- **Props and things**: call `window.kant?.lagg(g)` on the group that holds the item (the group you move and scale), right after creating it. Use `window.kant?.` so a scene without the script still works.
- **Parts in front of a body** (arms in front of the belly) get their own rim: `kant.lagg(f.delar['arm-r'])`. That draws the white edge between the arm and the body.
- **One sticker made of several pieces** (the boat with its rail, flag and motor) gets one rim on the group around all of them. Don't also rim each piece, or the rims stack and get too thick.
- `kit.kor` recalculates the rims after every `render(t)`. Nothing else to call.
- **Scenes without `kit.js`** (the godnattsagor, `produktion/youtube/shorts/godnatt/*/index.html`): load `<script src="/verktyg/kant.js"></script>`, call `kant.lagg` on each cut-out `<image>`, and call `window.kant?.uppdatera()` at the end of the frame function. The rimmed things must be drawn directly, not through `<use>` of something in `<defs>` (the rim can't be measured there).
- The rule's "1920 frame" is the frame's long side, so portrait Shorts (1080×1920) get the same rims as landscape episodes.

Don't:
- Don't write your own `feMorphology` rim filters. Use `kant.lagg`, so the look stays the same everywhere.
- Don't rim background plates, or clouds and islands painted into the plate (a cloud that is its own cut-out image, as in the godnattsagor, does get a rim), or things already inside a white sticker disc (the stickers in an arc).
- Don't change a locked character's image to change its rim. The code rim goes on top.

## Tuning

The numbers are at the top of `verktyg/kant.js`: `BAS` (3 px), `ANDEL` (0.01), `VAG` (how wobbly the edge is) and `KORN` (crayon grain). Change them there, and every episode that loads the script follows. Check with a still (`node render.mjs <scene> <t>`) in a close-up and in a wide shot.
