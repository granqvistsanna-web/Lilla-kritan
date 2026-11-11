# Äppelträdet

**Väggfärg:** orange `#F26B1D` · **Används till:** äpplen, plocka, gömma sig

Ett äppelträd. Kanel älskar att plocka här.

```prompt
Two-zone picture: a flat orange wall (#F26B1D) with grainy oil pastel texture filling the top two thirds, a straight horizon line, and a plain off-white floor (#FAF8F2) below. One simple apple tree to the side: a big round green crayon treetop full of red apples on a brown trunk standing on the floor. Two apples lying on the floor. Plenty of empty white floor in the middle for characters to stand on.
```

## v2 utan träd (029, 2026-11-11)

Till 029 Leoparden plockar äpplen: samma orange vägg och vita golv i art direction v2, med en låg grön gräsrand längs väggens fot och **inget träd på plattan**. Trädet är ett eget urklipp mitt i bild, så att leoparden och det sista äpplet kan gömma sig bakom stammen och i kronan. 013:s `appeltradet.png` är orörd.

**Bilder (Google Flow, Nano Banana 2.1, 0 krediter, v1-plattan som layout- och färgreferens, köket som stilreferens):** fyra tagningar i `assets/bakgrunder/appeltradet/original/appeltradet-v2-1…4.jpeg`, sida vid sida i `original/jamforelse-v2.jpg` (1–2 lugnare v2-krita, 3–4 kritigare som v1). **Väntar på Sannas val.** Platshållare: `assets/bakgrunder/appeltradet/appeltradet-v2.jpeg` = nr 2 (1376×768). Gräsranden ligger på rad 556–586, golvet börjar på rad 587 (76 %).

**Trädet med bred stam:** `assets/bakgrunder/appeltradet-saker/cut/appeltrad-bred.png` (819×1055), lekplatsens breda träd utan äpplen (äpplena läggs i kod som kopior av `applet-rott`). Fyra tagningar i `appeltradet-saker/original/appeltrad-bred-1…4.jpeg`, sida vid sida i `original/jamforelse.jpg`: 1–2 är lekplatsens träd med äpplena bortredigerade, 3–4 nyritade med lite större krona. **Väntar på Sannas val.** Platshållare: nr 4 (har egen vit kant), utklippt med `egen_kant.py`, kanten tunnad med `tunn_kant.py 11` (1 % av höjden); det tjocka klippet i `original/appeltrad-bred-tjock-kant.png`. 1–3 saknar vit kant och behöver `kant.lagg()` i kod eller en kant från verktyget om de väljs.

Plattans prompt (bild 1 = `appeltradet.png`, bild 2 = `koket-v1.jpeg`): *Image 1 is the LAYOUT and COLOUR reference: the same bold orange wall and white floor, but WITHOUT the tree and without apples. Image 2 is the STYLE reference: copy its smoother, calmer, premium flat crayon technique and its floor line, not its yellow colour or its checks. Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top part is one flat, bold, warm orange wall (#F26B1D) … Along the bottom of the wall, where it meets the floor, one low even strip of flat fresh green crayon grass (#5DB85C) with a softly bumpy top edge, about a twentieth of the image height. The bottom part is a plain flat white floor (#FAF8F2) … at about 75% of the image height. Nothing else, lots of empty space. No tree, no apples, no basket, no flowers, no characters, no animals, no shadows, no text, no letters.*

Trädets prompt (bild 1 = `lekplatsen-saker/appeltrad.png`): *Image 1 is the reference tree: draw the same tree in the same crayon technique, with the same wide brown trunk with flared roots and a thick clean white sticker border, but with NO apples at all, and with a slightly BIGGER, fuller, rounder green crown (one calm green with soft lighter green crayon streaks) and a trunk that is a little taller, so a small animal could hide behind the trunk and inside the crown. No apples, no fruit, no leaves sticking out, no branches, no shading, no highlights. Centered, fills the frame top to bottom, plain pure solid white background, no shadow, no ground, no text.*
