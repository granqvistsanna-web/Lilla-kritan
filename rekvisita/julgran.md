# Julgranen

En riktig julgran sedd rakt framifrån, i art direction v2 och samma mjuka krita som [gula stjärnan](stjarna-gul.md): fyra våningar grenar med mjukt vågig nederkant, vänster och höger lika, djupgrön krita (`#397653`) med lite mörkare grön under varje våning, och en kort brun stam (`#885735`). Toppen slutar i en enda tydlig spets. Vit klistermärkeskant. Ingen kruka, inga paket, ingen snö, inget ansikte och **ingen stjärna i toppen**: stjärnbilden landar där.

Två versioner av samma gran, pixelrätt mot varandra (samma ytterform och samma alfa):
- `julgran`: utan pynt.
- `julgran-kladd`: klädd med sju röda och fyra guldgula kulor och en ljusslinga i fyra bågar.

**Sanna 2026-11-11: använd granen med pynt** (`julgran-kladd`) i lucka 1. Den nakna ligger kvar för konturen och för luckor där granen kläs.

**I julkalendern (`produktion/youtube/julkalender-plan.md`), lucka 1:** kritan ritar granens kontur i ett drag, bilden fylls i inifrån (`format/ritintro.md`), och stjärnan flyger upp och sätter sig i toppen ("en julgran och en julstjärna"). Granen ersätter skogsgranen `assets/bakgrunder/skogen-gron-saker/gran.png`. Den vänds aldrig.

**Mått i urklippen `assets/rekvisita/julgran/cut/julgran.png` och `julgran-kladd.png` (1024 × 1024 px, samma för båda):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 183, y 73, bredd 659, höjd 878.
- Färgytan: x 190–833, y 81–942 (644 × 862 px).
- **Toppspetsen: (512, 81)** i färgytan (den vita kantens topp ligger på y 73). Spetsen är 40 px bred 20 px ner och 104 px bred 80 px ner, så stjärnans nedre uddar kan gränsla den.
- Stammen: x 449–574, y 838–942. Fotens mitt: (504, 942).
- Vit kant 8 px i filen, samma som stjärnan. Visas granen i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` på den nakna, och bygg den klädda ur den igen (se nedan).
- Kulorna i den klädda (mitt x, y, radie ca 18 px): röda (455, 265), (628, 404), (509, 458), (347, 575), (513, 628), (299, 735), (720, 750); gula (557, 232), (411, 389), (662, 550), (445, 723).

**Konturen:** `assets/rekvisita/julgran/cut/julgran-kontur.json`, `{ "d": "M… Z", "bbox": [183, 73, 659, 878] }`. En sluten bana i urklippets egna pixlar, 60 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs med start och slut i toppspetsen (512, 83). Den följer färgytans ytterkant (alfat krympt 8 px) och avviker i snitt 1,5 px från den, som mest 6,5 px i våningarnas hörn. Bara ytterformen: våningarnas inre vågor ingår inte. Samma kontur gäller för den klädda granen.

Används i: julkalendern 2026, lucka 1.

**Bilder (2026-11-11, Google Flow, Nano Banana Pro, 1:1, 1024 × 1024, 0 krediter, godkända av Sanna):** en tagning av varje, `assets/rekvisita/julgran/original/julgran-1.jpeg` och `julgran-kladd-1.jpeg`, och provscener på natthimlen i `original/jamforelse-kladd.jpg` och `jamforelse-naken.jpg`. Den nakna gjordes först (prompten nedan, bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/karaktarer/kaninen-kanel/premium/kanel-faceless.png`, båda som stilreferens), och den klädda ur den med den andra prompten. De två tagningarnas kanter skiljer högst 1,4 px. Urklippen: den nakna med `cutout.py` och `tunn_kant.py 8`; den klädda är den nakna granens urklipp med den klädda bildens färg innanför kanten, så att alfat är exakt lika.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE classic Christmas tree, a fir tree, seen exactly straight on from the front, very simple and childish, like a toddler picture-book Christmas tree: a full, wide cone made of four stacked tiers of branches, each tier a wide soft triangle with a gently scalloped, rounded lower edge, each tier a little wider than the one above, perfectly left-right symmetric. The top ends in ONE clear, single, slightly rounded pointed tip in the exact centre. At the bottom centre a short, straight, chunky brown trunk (#8A5A33). The whole tree is one flat deep fir green (#2F7D4F) mottled grainy wax crayon fill with fine paper grain, the same even colour everywhere, with only a faint slightly darker green crayon edge along the outline and under each tier. The tree is completely bare: NOTHING on it and nothing around it. No star, no topper, no baubles, no lights, no garland, no tinsel, no snow, no pot, no stand, no presents, no ground, no face, no eyes, no white scratch marks, no highlights, no shading, no 3D. A thick, clean, even white sticker border all around the whole tree. Centered, the tree fills about 70 percent of the frame height, with a lot of empty white space above the top tip, plain pure solid white background, no shadow, no text.
```

Klädd (bild 1 = den nakna tagningen):

```prompt
Edit Image 1. Keep the Christmas tree EXACTLY the same: same shape and outline, same four tiers, same position and size in the frame, same deep green grainy wax-crayon fill, same short brown trunk, same thick clean white sticker border, same pure white background. ONLY add decorations ON the tree, drawn flat in the same soft crayon technique. First: about nine small round baubles, simple flat circles, some bright red (#D9382E) and some warm golden yellow (#F2B632), spread evenly over all four tiers, each one fully inside the green. Second: ONE simple garland, a thin warm cream string with small round warm yellow lights on it, draped in three gentle swags that zigzag across the tree from one tier to the next, staying inside the green. The top tip of the tree stays completely bare and empty: NO star, no topper, nothing on the tip and nothing above it. Nothing sticks out beyond the tree's outline, and the outline does not change. No glow, no shine highlights, no sparkles, no snow, no presents, no bow, no face, no text, no other changes.
```
