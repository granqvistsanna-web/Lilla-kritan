# Ljusstaken

En låg, knubbig adventsljusstake av trä, sedd rakt framifrån: en lång bänk i varm honungsbrun krita (`#B9773E`) med rundade ändar och två korta fötter, och fyra små, grunda guldgula koppar (`#E3B23C`) ovanpå med lika långt mellan. Kopparna är tomma: [adventsljusen](adventsljus.md) ställs i dem i koden. Ingen låga, inga ljus, ingen grönt i bilden.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 6 och lucka 20, inne i sovrummet (Sanna 2026-11-12: "add ljusstake"). I `produktion/youtube/shorts/jul/djur.js` slås den på med `stake: true` på ljus-saken: bänken töjs i sidled så att kopparna hamnar under ljusen, kopparna ritas om större (framsidan framför ljusets fot) och allt lyfts 141 px så att fötterna står där ljusen stod.

**Mått i urklippet `assets/rekvisita/ljusstake/cut/ljusstake.png` (1232 × 416 px, genomskinligt runt om):**
- Kopparnas mitt i x: 231, 487,5, 745 och 1002 (257 px mellan). Kopparna går från y 23 (kanten) till y 128 (botten), ca 172 px breda.
- Bänkens fötter slutar i y 413. Vit kant ritad av bildmodellen (egen_kant.py), ca 20 px.

**Konturen:** `assets/rekvisita/ljusstake/cut/ljusstake-kontur.json` (kontur.py, krymp 10, 60 punkter).

Används i: julkalendern 2026, lucka 6 och 20.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K 16:9, 20 krediter, Sanna valde en kritbild 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. En tagning, `assets/rekvisita/ljusstake/original/ljusstake-1.png` (1376 × 768), urklippt med `verktyg/egen_kant.py`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE simple, childish advent candle holder, seen exactly straight on from the front at eye level, completely flat: a long, low, chunky wooden bench-shaped block in warm honey-brown (#B9773E) mottled grainy wax crayon, about 7 times as wide as it is tall, with gently rounded ends and two short stubby feet underneath. On top of the block stand FOUR identical small, shallow, round golden-yellow (#E3B23C) crayon candle cups, evenly spaced with exactly equal gaps, the outer two cups a little in from the ends. The cups are EMPTY: NO candles, no flames, no wicks. No decorations, no greenery, no ribbon, no text, no face, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole holder. Centered, the holder fills about 80 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no table.
```
