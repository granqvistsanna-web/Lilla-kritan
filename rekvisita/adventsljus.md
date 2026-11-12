# Adventsljuset

Ett högt rött adventsljus som står rakt upp, sett framifrån: en rak, knubbig cylinder (ca 2,4 gånger så hög som bred) i varm röd krita (`#D9382E`) med lite mörkare röd kant, platt botten och en kort mörk veke i mitten av toppen. **Ingen låga i bilden:** [lågan](laga.md) är en egen bild som läggs på veken. Ingen ljusstake, inga droppar, inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 6 (leoparden och ljusen: kritan tänder ett ljus i taget), lucka 13 (Lucia) och lucka 20 (fjärde advent). Samma bild, i olika antal.

**Mått i urklippet `assets/rekvisita/adventsljus/cut/adventsljus.png` (1024 × 1371 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 316–706, y 208–1185 (391 × 978 px). Färgytan: x 326–696, y 218–1175 (371 × 958 px).
- **Vekens topp, där lågans bas fästs: (512, 221).** Veken är 16 px bred och går från y 221 ner till ljusets topp (y 282).
- Ljuskroppen: x 329–694, y 282–1172 (366 × 891 px). Toppens mitt (512, 282), bottens mitt (512, 1173) (där ljuset står på bordet).
- Toppen är ritad som en liten ellips (lätt uppifrån), inte helt platt.
- Vit kant 10 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/adventsljus/cut/adventsljus-kontur.json`, `{ "d": "M… Z", "bbox": [316, 208, 391, 978] }`. En sluten bana i urklippets egna pixlar, 55 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (511,9, 219,8). Den följer färgytans ytterkant (alfat krympt 10 px, alltså innanför den vita kanten). Veken är med i konturen.

Används i: julkalendern 2026, lucka 6, 13 och 20.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/adventsljus/original/adventsljus-1.png` (896 × 1200, 3:4, skalad till 1024 × 1371). Urklippt med en vit kant på 10 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE tall plain advent candle standing upright, seen exactly straight on from the front, completely flat, very simple and childish: a straight, chunky, tall cylinder about 3 times as tall as it is wide, with a perfectly flat top and a flat bottom, in warm bright red (#D9382E) mottled grainy wax crayon with fine paper grain and a faint slightly darker red crayon edge. In the exact centre of the flat top a short, thin, dark brown-black wick stub sticks up, about as tall as one tenth of the candle's width. NO flame, no drips, no holder, no plate, no ribbon, no face, no text, no shading, no highlights, no shine, no 3D. A thick, clean, even white sticker border all around the whole candle and the wick. Centered, the candle fills about 70 percent of the frame height with empty white space around, plain pure solid white background, no shadow, no ground.
```
