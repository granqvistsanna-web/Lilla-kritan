# Rosetten

En guldgul presentrosett sedd rakt framifrån: två stora runda öglor, en liten rund knut i mitten och två korta snibbar som hänger ner i ett litet V. Vänster och höger lika. Platt guldgul vaxkrita (`#E8B730`, samma som bandet på [paketet](paket.md)) med lite mörkare gyllene kritkant. Öglornas hål är genomskinliga. Inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 9: när bandet har trasslat sig och suddgummit har tagit bort härvan ritar kritan rosetten, och den fyller i inifrån. Den sitter sedan ovanpå paketet. Samma rosett i lucka 24.

**Mått i urklippet `assets/rekvisita/rosett/cut/rosett.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 102–921, y 233–812 (820 × 580 px). Färgytan: x 108–915, y 239–806 (808 × 568 px).
- **Knutens mitt: (511,6, 458,1)** (mitt emellan öglornas hål). Det är fästpunkten: lägg den på paketets överkant, i punkten (512, 199) i paketbilden (rosetten i skala ca 0,5, alltså ca 400 px bred, blir ungefär halva paketets bredd, och snibbarna hänger då ner över det lodräta bandet).
- Öglornas hål (genomskinliga): vänster mitt (314,1, 458,1) och höger mitt (709, 458,1), vardera ca 197 × 119 px.
- Snibbarnas nederkant: y 806, mellan x 424 och 599.
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/rosett/cut/rosett-kontur.json`, `{ "d": "M… Z", "bbox": [102, 233, 820, 580] }`. En sluten bana i urklippets egna pixlar, 59 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (256, 239,4). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten). Bara ytterformen: öglornas hål ingår inte.

Används i: julkalendern 2026, lucka 9 och 24.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/rosett/original/rosett-1.png` (1024 × 1024). Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE gift bow made of ribbon, seen exactly straight on from the front, completely flat, very simple and childish: two big round loops, one to the left and one to the right, joined in the middle by a small round knot, with two short ribbon tails hanging down from the knot, angled slightly outward in a small V. The bow is perfectly left-right symmetric. All of it in one flat warm gold-yellow (#E8B730) mottled grainy wax crayon fill with fine paper grain, the same even colour everywhere, with only a faint slightly darker golden crayon edge along the outlines and where the loops meet the knot. The loops are simple rounded teardrop shapes with an open hole in the middle that shows the white background. NO box, no present, no ribbon band, no gift, no face, no text, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole bow, also around the inside of the two loop holes. Centered, the bow fills about 70 percent of the frame width, with empty white space around, plain pure solid white background, no shadow, no ground.
```
