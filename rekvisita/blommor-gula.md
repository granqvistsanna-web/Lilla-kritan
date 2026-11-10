# Gula blommorna

Tre små gula smörblommor rakt framifrån, i art direction v2. Varje blomma har fem runda, lite skålformade kronblad i smörgult med fina orange ådror och glansstreck, en prickig gulgrön mitt och en kort grön stjälk med två rundade blad. De är enklare och mindre än den röda blomman (`blomma-rod`).

Används i: 011 Gula sången (06a: ploppar upp en i taget längs grinden på "Gula blommor vid vår grind", en per betonat ord; 11e: med i bågen av gula saker).

**Filer (2026-11-10):** tagning a av två (den andra i `original/`). Arket ligger i `assets/rekvisita/blommor-gula/blommor-gula.png`, och utklippen är klippta med `verktyg/egen_kant.py --ark` (den ritade kanten behålls, grå klipprester mellan stjälk och blad är vitmålade):
- `cut/blomma-gul-1.png` (844 × 1242): den högsta, med längst stjälk.
- `cut/blomma-gul-2.png` och `cut/blomma-gul-3.png` (800 × 1060): de två lägre.

Spegla och skala dem i kod för fler blommor.

Nano Banana 2, image2image, 2K, 16:9: bild 1 = `assets/rekvisita/blomma-rod/cut/blomma-rod.png` (formen), bild 2 = `assets/rekvisita/banan/cut/banan-v2.png` och bild 3 = `assets/rekvisita/hink-gul/cut/hink-gul.png` (v2-stilen och det gula).

```prompt
Image 1 is the SHAPE reference only: a simple flower seen straight from the front with round chubby petals on a short stem with round leaves – NOT its red colour. Images 2 and 3 are the STYLE and COLOUR references: copy their premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel with fine crayon hatching, bold flat colours, NO dark outlines, and a clean, even, smooth white sticker border all around each silhouette like a die-cut vinyl sticker. Draw THREE separate small yellow buttercup flowers in a row, each with clear white space around it so they do not touch: one a bit taller in the middle, one shorter on each side. Each flower: five round, slightly cupped glossy petals in bright butter yellow (#FFD84A) with soft lighter yellow crayon streaks and one tiny pale shine mark, a small soft yellow-green centre, on a short straight fresh green stem (#55A04A) with one or two small rounded leaves. Simple bold rounded shapes, nothing pointy, very simple for 2-year-olds, clearly yellow, never orange. No grass, no ground, no face, no text. Centered, on a pure solid white background, no shadow, no characters.
```
