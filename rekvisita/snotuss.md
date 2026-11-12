# Snötussen

En liten snöhög sedd rakt framifrån: bred och låg med en helt rak, bred botten, lutande sidor och en ojämn, bucklig topp (högre åt höger), med ett par små snöklumpar i nedre hörnen. Varmvit krita (`#F7F9FC`) med fint papperskorn och svag ljusblå skugga (`#C9D9EC`) i nedre tredjedelen och under knölarna, bara en mycket svag blågrå kant. Inget ansikte. Den första tagningen blev ett moln, så den här är den andra.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 9: snön som ramlar från granen och ligger som en tuss överst på [paketet](paket.md) (den kritritade tussen byts mot den här bilden), och snön som faller bredvid. Den vänds aldrig.

**Mått i urklippet `assets/rekvisita/snotuss/cut/snotuss.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 93–964, y 231–801 (872 × 571 px). Färgytan: x 99–958, y 237–795 (860 × 559 px).
- **Botten: platt linje på y 795, från x 117 till 932** (mitt (524,5, 795)). Det är där den vilar på paketets överkant: lägg bottenlinjen på y 199 i paketbilden. Lagd i 0,95 av paketets skala blir den ungefär lika bred som paketets överkant (780 px). Högen är 559 px hög (paketet 626 px): vill luckan ha den lägre kan den tryckas ihop med `scaleY` ca 0,6.
- Högsta punkten: ca (634, 237).
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/snotuss/cut/snotuss-kontur.json`, `{ "d": "M… Z", "bbox": [93, 231, 872, 571] }`. En sluten bana i urklippets egna pixlar, 59 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (634, 237,1). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten). De små klumparna i nedre hörnen sitter ihop med högen och är med.

Används i: julkalendern 2026, lucka 9.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, tagning 2 godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). Två tagningar: `original/snotuss-1.png` (tre runda bucklor med blå kant, blev ett moln och förkastades) och `original/snotuss-2.png` (vald, en snöhög). Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

Tagning 2 (vald):

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, clean white sticker border), not their subjects. Draw ONE small pile of snow, a snow drift, seen exactly from the front, completely flat, very simple and childish. It is NOT a cloud: the pile is wide and low with a perfectly flat straight bottom edge that is the widest part, the sides slope gently UP and inward from the bottom corners like a small hill, and the top outline is lumpy and slightly uneven with two or three soft small bumps, a little higher on one side. About 2.4 times as wide as it is tall, with a couple of tiny separate snow clumps sitting at its lower left and lower right corners. Warm soft white crayon fill (#F7F9FC) with fine paper grain, and only a very soft pale blue (#C9D9EC) crayon shade in the lower third and just under the bumps. No blue outline: only a very faint slightly darker blue-grey crayon edge. NO face, no eyes, no sparkles, no snowflakes, no footprints, no carrot, no hat, no highlights, no shine, no 3D, no text. A thick, clean, even white sticker border all around the whole pile, including along the flat bottom. Centered, the pile fills about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```

Tagning 1 (blev ett moln):

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE soft lump of snow, seen exactly straight on from the front, very simple and childish: a wide, low, puffy mound made of three soft round bumps (a bigger one in the middle and a smaller one on each side), about 2.2 times as wide as it is tall, with a perfectly flat straight bottom edge so that it can sit on a surface. Warm soft white crayon fill (#F7F9FC) with fine paper grain and a very soft pale blue (#BFD3EA) crayon shade along the lower part and between the bumps, only a faint slightly darker blue-grey crayon edge. NO face, no eyes, no sparkles, no snowflakes, no footprints, no carrot, no hat, no highlights, no shiny shading, no 3D, no text. A thick, clean, even white sticker border all around the whole lump, including along the flat bottom. Centered, the lump fills about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
