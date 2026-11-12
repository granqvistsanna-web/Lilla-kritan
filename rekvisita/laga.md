# Lågan

En liten ljuslåga sedd rakt framifrån: en rund, symmetrisk droppe pekande rakt upp i varm gulorange krita (`#F7A93B`) med en mindre droppe klargul (`#FFD84A`) inuti, och bakom den en mjuk rund glorie i mycket blekt varmgult (`#FFF0B8`). Samma stil som ljusen i [julgranens](julgran.md) ljusslinga. Inget ljus, ingen veke, inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 6, 13 och 20: läggs på [adventsljusets](adventsljus.md) veke när kritan "tänder" ljuset, och kan tindra (skala och gloria i kod). Den vänds aldrig.

**Mått i urklippet `assets/rekvisita/laga/cut/laga.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 132–891, y 117–911 (760 × 795 px). Färgytan: x 140–883, y 125–903 (744 × 779 px).
- **Lågans bas, där den sitter på veken: (511,5, 901)**, lågans topp (511,5, 247). Lågan x 302–720, y 247–900 (419 × 654 px).
- **Glorian: mitt (512, 514,5), radie 389,5 px.**
- Lågan är stor mot ljuset: lågan är 419 px bred och ljusets kropp 366 px, så lågan visas i ca 0,35 skala för att passa på ett ljus av samma storlek. Lägg lågans bas ((511,5, 901)) på vekens topp ((512, 221)) i ljusbilden.
- Vit kant 8 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/laga/cut/laga-kontur.json`, `{ "d": "M… Z", "bbox": [132, 117, 760, 795] }`. En sluten bana i urklippets egna pixlar, 58 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (506, 125,1). Den följer färgytans ytterkant (alfat krympt 8 px, alltså innanför den vita kanten). Konturen följer glorians rund-form, inte bara lågan.

Används i: julkalendern 2026, lucka 6, 13 och 20.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/laga/original/laga-1.png` (1024 × 1024). Den vita kanten ligger runt hela glorian. Urklippt med en vit kant på 8 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund. Glorian är blek mot vitt men syns mot mörkt papper och mörk himmel.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE small candle flame seen exactly straight on, completely flat, very simple and childish: a plump teardrop shape pointing straight up, perfectly symmetric, in warm yellow-orange (#F7A93B) crayon with a smaller plump teardrop of bright yellow (#FFD84A) crayon inside it, and behind the flame ONE soft round halo disc of very pale warm yellow (#FFF0B8) crayon about twice as wide as the flame. The flame's bottom is a rounded base where it would sit on a wick. NO candle, no wick, no face, no eyes, no sparkles, no rays, no text, no shading, no 3D. A clean, even white sticker border all around the whole thing. Centered, the halo fills about 60 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
