# Gula stjärnan

En knubbig femuddig stjärna sedd rakt framifrån, i art direction v2: fem korta, runda uddar, en udd rakt upp, vänster och höger lika, och en stor lugn mitt. Platt varmgul vaxkrita (`#F3C14F`) med fint korn, en lite mörkare gyllene kritkant och vit klistermärkeskant. **Inget ansikte i bilden:** ögon, kinder och mun ritas i kod ovanpå, så att stjärnan kan byta känsla (glad, förvånad, sur, jätteglad), precis som figurernas ansikten. Inga strålar, gnistor, armar eller ben.

**I julkalendern (`produktion/youtube/julkalender-plan.md`), lucka 1:** kritan ritar konturen i ett drag, sedan fylls bilden i inifrån (`format/ritintro.md`). Stjärnan dansar, blir sur när molnet hamnar framför och glad när suddgummit har suddat bort molnet. Den vänds aldrig.

**Mått i urklippet `assets/rekvisita/stjarna-gul/cut/stjarna-gul.png` (1024 × 1024 px):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 116, y 123, bredd 792, höjd 778.
- Färgytan: x 124–899, y 131–893 (776 × 763 px). Tyngdpunkt (511,5, 547,3).
- **Ansiktets plats: mitt (510, 544), största cirkel som ryms i kroppen har radie 256 px.** Cirkeln nuddar de fem innerhörnen, så håll ansiktet inom ungefär radie 200.
- Uddarnas spetsar (färgytan): topp (521, 131), höger (896, 417), nere höger (762, 883), nere vänster (263, 885), vänster (126, 421). Speglad runt x 511,5 täcker formen sig själv till 99,8 %.
- Vit kant 8 px i filen (ca 1 % av höjden, skillen `vita-kanter`). Visas stjärnan mycket mindre än 1024 px: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan).

**Konturen:** `assets/rekvisita/stjarna-gul/cut/stjarna-gul-kontur.json`, `{ "d": "M… Z", "bbox": [116, 123, 792, 778], "mitt": [510, 544], "radie": 256 }`. En sluten bana i urklippets egna pixlar, 58 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs med start och slut i toppudden (513, 131). Den följer färgytans kant (alfat krympt 8 px, alltså innanför den vita kanten) och avviker i snitt 0,9 px från den, som mest 7 px i innerhörnen.

Används i: julkalendern 2026, lucka 1.

**Bilder (2026-11-11, Google Flow, Nano Banana Pro, 1:1, 1024 × 1024, 0 krediter):** två tagningar i `assets/rekvisita/stjarna-gul/original/stjarna-gul-1.jpeg` och `-2.jpeg`, och alla tre sakerna tillsammans på natthimmel och krämvitt i `original/jamforelse.jpg`. Nr 1 (prompten nedan, bild 1 = `assets/rekvisita/badanka/badanka.jpeg`, bild 2 = `assets/karaktarer/kaninen-kanel/premium/kanel-faceless.png`, båda som stilreferens) hade rätt form men ljusa kritstreck i spetsarna. Nr 2 är nr 1 gjord plattare med den andra prompten. **Sanna valde nr 2 (2026-11-11).** Den hade en svag skugga under kanten längst ner: bara den största färgytan behölls innan klippet (`cutout.py`), och kanten sattes med `tunn_kant.py 8`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE chubby five-pointed star seen exactly straight on from the front, very simple and childish, like a soft puffy cookie-cutter star: five short, fat, well-rounded points and a big wide round middle, perfectly left-right symmetric, with one point pointing straight up, two points out to the sides and two points down. The whole star is one flat warm egg yellow (#FFD84A) mottled grainy wax crayon fill with fine paper grain, the same even colour and texture everywhere, with only a faint slightly darker golden yellow crayon edge following the outline. The big middle of the star is completely plain, calm and even: empty yellow crayon, nothing drawn on it. NO face, no eyes, no mouth, no cheeks, no nose, no dots, no white highlights, no shine marks, no streaks in the middle, no arms, no legs, no rays, no sparkles, no small stars, no glow, no shading, no 3D. A thick, clean, even white sticker border all around the whole star. Centered, filling about three quarters of the frame with space around, plain pure solid white background, no shadow, no ground, no sky, no text.
```

Plattare (bild 1 = tagningen ovan):

```prompt
Edit Image 1. Keep the yellow star EXACTLY the same: same chubby five-pointed shape, same position and size in the frame, same warm egg yellow grainy wax-crayon fill with fine paper grain, same faint darker golden crayon edge, same thick clean white sticker border, same pure white background. ONLY change: make it FLATTER. Remove every light shine streak and highlight mark (the pale streaks near the tips of the points and along the edges), and continue the same even yellow crayon texture there seamlessly. The whole star becomes one even, calm, flat yellow crayon fill, like a flat cut-paper sticker drawn in crayon. No rounded 3D look, no glow, no face, no eyes, no mouth, no dots, no other changes, no shadow, no text.
```
