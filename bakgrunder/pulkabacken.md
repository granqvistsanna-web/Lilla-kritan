# Pulkabacken

**Väggfärg:** klar himmelsblå `#3FA2DC` · **Golv:** en snöbacke och plan snö, gräddvit `#FAF8F2` · **Används till:** 039 Kaninen ska åka pulka (de sista ca 40 s, efter kritsvepet)

Pulkagårdens himmel och snö i art direction v2, med en riktig backe: krönet med två snöiga granar längst till vänster, en lång jämn backe ner åt höger som planar ut i plan snö, och ett kort gräddvitt staket längst till höger. Backen är tom, så att pulkan kan åka nedför (framåt, åt höger). Snö som faller och snöpuffar läggs på i kod.

**Bilder:** `assets/bakgrunder/pulkabacken/pulkabacken.jpeg` (2752 × 1536). Alla tagningar i `original/pulkabacken-1..3.jpeg`. Google Flow, Nano Banana Pro, 16:9, uppskalad 2K, 0 krediter, 2026-11-17. Bild 1 = `assets/bakgrunder/pulkagarden/pulkagarden.jpeg` (stilen).

**Vald (2026-11-17, Sanna: "Take 3"):** tagning 3. Tagning 1 hade en röd kälke och ett blekt staket i backen, tagning 2 ett blekt staket i backen.

**Mått i en 1920 × 1080-ruta (skala 0,703, 7 px beskärs på var sida):**
- Backens kant: krönet y ca 499 vid x 240, sedan nedför till foten vid x 1240, y 817. Kurvan som kubisk Bézier från foten till krönet: `[[1240, 817], [841, 826], [615, 536], [240, 499]]` (max 9 px fel, `BACKE` i `avsnitt/039-kaninen-aker-pulka/storyboard/scen.html`).
- Plan snö från x 1240 till höger, kanten y ca 817. Staketet från x ca 1600.
- Granarna x 0–150 på krönet. Fötter på y 930 står på snön framför backen.

**Inte samma som** [`produktion/rum/pulkabacken/`](../produktion/rum/pulkabacken/index.html), som är pulkagårdens platta med en backe ritad i kod (julkalenderns lucka 5 och 8).

```prompt
Image 1 is a STYLE reference only: copy its flat crayon technique, its bold flat saturated sky blue with dense grainy oil-pastel texture, its plain white snow and its simple flat crayon objects, not its layout. Background plate for a cheerful toddler cartoon: a sledding hill on a bright winter day, wide 16:9, completely flat, static straight-on side view, no perspective. The sky is one flat, bold, saturated bright sky blue (#3FA2DC) edge to edge with fine speckled paper grain, no gradient, no clouds, no sun. ONE big, smooth, gently curved snow hill seen exactly from the side, in plain creamy white snow (#FAF8F2) with a thin soft pale blue crayon line along its top edge: its rounded top is on the LEFT side of the picture, at about 42 percent of the image height, reaching to the left edge, and from there ONE long, even, smooth slope runs down to the right, like a gentle slide, and flattens out into flat snow at about 76 percent of the image height in the right third of the picture, continuing flat to the right edge. The slope is clean and empty, with no bumps, no steps and no tracks, so that a sled can glide down it. On the rounded top of the hill, at the far left edge, one or two small simple chunky spruce trees in deep green crayon (#2F7D46) with rounded white snow caps. At the far right, on the flat snow, one short simple low wooden picket fence in soft cream-white crayon with a little snow on top, pale and low in contrast. Bold, simple, flat, cheerful, lots of empty space on the slope and the flat part. No falling snow, no snowflakes, no snowman, no sled, no houses, no mountains, no characters, no animals, no footprints, no shadows, no glow, no text, no letters, no white frame or border.
```
