# Pepparkakshjärtat

Ett knubbigt pepparkakshjärta sett rakt framifrån: ett fylligt hjärta, vänster och höger lika, i varm pepparkaksbrun krita (`#B5743B`) med lite mörkare brun kant, en rad små vita glasyrprickar längs hela kanten strax innanför och tre större vita glasyrprickar i en rad i mitten. Inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 4 (björnen och pepparkakan): kritan ritar hjärtat och bilden fylls i inifrån. Den vänds aldrig.

**Mått i urklippet `assets/rekvisita/pepparkakshjarta/cut/pepparkakshjarta.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 116–907, y 161–882 (792 × 722 px). Färgytan: x 123–900, y 168–875 (778 × 708 px).
- **Mitten: (512, 522).** Hjärtats inskärning upptill ligger i (512, 277).
- De tre stora glasyrprickarna: (513, 516,8), (428,9, 517), (593,6, 516,6).
- Vit kant 7 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/pepparkakshjarta/cut/pepparkakshjarta-kontur.json`, `{ "d": "M… Z", "bbox": [116, 161, 792, 722] }`. En sluten bana i urklippets egna pixlar, 60 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (712, 168). Den följer färgytans ytterkant (alfat krympt 7 px, alltså innanför den vita kanten). Bara ytterformen: prickarna ingår inte.

Används i: julkalendern 2026, lucka 4.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/pepparkakshjarta/original/pepparkakshjarta-1.png` (1024 × 1024). Urklippt med en vit kant på 7 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE chubby gingerbread heart cookie seen exactly straight on from the front, completely flat, very simple and childish: a fat, rounded heart shape, perfectly left-right symmetric, in warm gingerbread brown (#B5743B) mottled grainy wax crayon with fine paper grain and a faint slightly darker brown crayon edge. White icing decoration in soft white crayon: a row of small round white dots running along the whole edge just inside the outline, and three bigger white icing dots in a small row in the middle of the heart. NO face, no eyes, no mouth, no bow, no text, no shading, no highlights, no shine, no 3D. A thick, clean, even white sticker border all around the whole heart. Centered, the heart fills about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
