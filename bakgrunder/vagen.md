# Vägen

**Väggfärg:** light green `#A6D86B` · **Används till:** körscener (buss, bil, traktor), resor

En plats för körscener. Bilden ska gå att upprepa sömlöst i sidled, så att den kan glida bakom fordonet hur länge som helst. Hus, statister och väder läggs på som egna lager (se `format/overgangar-och-maner.md`, Körscen).

```prompt
Two-zone picture: a flat light green wall (#A6D86B) with grainy oil pastel texture filling the top two thirds, a straight horizon line, and a plain off-white floor (#FAF8F2) below with one simple grey dashed road line drawn in crayon running across it. Nothing else, empty. The image must tile seamlessly horizontally so it can scroll sideways.
```

**Palmen (007, 2026-11-06):** `assets/bakgrunder/vagen-saker/palm.png` (742 × 1073, urklippt med 12 px kant ur `palm/palm-v1.png`). Calypsokänslan i 007: två palmer i vägens trädrad (`kit.js` TRADRAD) och på kolastranden vid rutschbanan (`scener/rutschbana.js`).

```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its layout. Draw a single prop for a toddler cartoon: ONE tall palm tree seen from the side. A slim, gently curved trunk leaning a little to the left, warm caramel brown with a few darker crayon ring bands, a slightly wider foot at the bottom. At the top a round crown of six or seven big, soft, rounded bright green palm leaves drooping down on both sides like a fountain, each leaf a simple fat feather shape with a lighter green middle line, and a small cluster of three round dark brown coconuts under the leaves. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame top to bottom, centered on a pure solid white background, no ground, no sand, no shadow, no characters, no text.
```

**Palmen i art direction v2 (007, 2026-11-08; saknas än):** ersätter `palm.png` på kolastranden (`scener/rutschbana.js`, tre palmer). Spara som `assets/bakgrunder/skogen-gron-saker/palm.png`, bredvid v2-granen och v2-busken. Nano Banana 2, image2image, 2K: bild 1 = `vagen-saker/palm.png` (formen), bild 2 = `skogen-gron-saker/gran.png` och bild 3 = `skogen-gron-saker/buske.png` (v2-stilen).

```prompt
Image 1 is the design reference: the same palm tree (same shape, leaning slim trunk, fountain of leaves, three coconuts). Images 2 and 3 are the STYLE references: copy their premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel with fine crayon hatching, bold flat colours, NO dark outlines, and a clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker. Redraw the palm in that style: a slim, gently curved trunk leaning a little to the left in warm caramel brown with a few soft darker crayon ring bands and a slightly wider foot, a round crown of six or seven big, soft, rounded green palm leaves drooping down on both sides like a fountain, each leaf a simple fat feather shape with a lighter green middle line, and a small cluster of three round dark brown coconuts under the leaves. Very simple shapes for 2-year-olds. Fills the frame top to bottom, centered, on a pure solid white background, no ground, no sand, no shadow, no characters, no text.
```

**Vita blommor (007, 2026-11-06):** `assets/bakgrunder/vagen-saker/blomma-vit.png` (urklippt ur `blomma-vit/blomma-vit-v1.jpeg`, v1 vald). Sanna: vägen ska bli skog, bara granar och vita blommor i gräskanten, inga palmer.

```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its subject. Draw a single prop for a toddler cartoon: a small clump of three simple white flowers seen from the side, like daisies without any yellow pattern detail beyond a small round warm yellow centre. Each flower has five or six fat rounded off-white petals, sitting on a short straight green stem with one or two small rounded green leaves, the three stems growing from one small tuft of green grass at the bottom. The petals are creamy white crayon with light grey-beige crayon shading so they read on a white page. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame top to bottom, centered on a pure solid white background, no ground, no shadow, no characters, no text.
```

**Palmerna i v2 (2026-11-08, Sanna):** `assets/bakgrunder/skogen-gron-saker/palm-a.png` (696 × 729) och `palm-b.png` (608 × 720), urklippta med `egen_kant.py` ur `original/palm-v2a.jpg` och `palm-v2b.jpg`. På kolastranden (`rutschbana.js`): ön har en av varje, den stora palmen i förgrunden är `palm-b`.

**Rosa vägen (019, 2026-11-09):** `assets/bakgrunder/vagen/vagen-rosa.png` (1376 × 768). Sanna: "need a new improved bg for the road, with rosa bg". `avsnitt/005-rosa-bilen/scener/lager/vagen-slat.png` med den gröna väggen omfärgad till rosa (`#F4A6C6`, samma kritkorn och streck, horisonten och vägen på samma ställe, så att `kit.vagstreck` och bilen stämmer). Omfärgad i Python, ingen ny generering (Flow stod still). Molnen över den rosa väggen är vita. I 019 också kullvägens vägg (vers 3, kullarna ritas i kod).
