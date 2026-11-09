# Glassberget

**Väggfärg:** ljusblå `#A8DCF2` (himmel, inget golv) · **Används till:** refrängen "Rosa som ett glassberg!", att klättra högst upp

Ett jättestort berg av jordgubbsglass mot en ljusblå himmel. Musen står på toppen och sätter dit en rosa flagga. Toppen finns också som ett eget lager, så att en figur kan stå bakom kanten.

```prompt
The whole background is a flat light blue (#A8DCF2) sky with grainy oil pastel texture and two small soft white crayon clouds near the top corners, no floor. In the centre a giant strawberry ice cream mountain rises from the bottom edge and fills about 70% of the height: two or three huge lopsided pink scoops with darker pink strawberry flecks and a drip or two, topped by a wide, flat-ish rounded summit where a small character can stand. The cone is cut off below the frame.
```

## Hög variant: hela glasstruten (refrängen i 005)

I refrängen lyfter luftballongen bilen från en grön kulle, förbi struten och upp på toppen, så berget måste synas som en glass. Den vanliga plattan klipper struten nedanför bilden och läses som en rosa klump. Den här varianten är stående (9:16), så kameran kan åka uppåt. I `scener/refrang.js` är den ritad i kod tills bilden finns: plattan ovan, en strut i kod under och himmel ovanför. Toppen ska ligga som i den vanliga plattan.

```prompt-hog
Vertical 9:16 background. Flat light blue (#A8DCF2) sky with grainy oil pastel texture and a few small soft white crayon clouds, a soft green crayon hill along the bottom edge. Standing on the hill is one giant strawberry ice cream cone that fills almost the whole height: a tall golden-tan waffle cone with a clear hand-drawn criss-cross grid, its tip resting in the grass, and on top two or three huge lopsided pink scoops with darker pink strawberry flecks and a few thick drips running down over the cone's rim. The top scoop has a wide, flat-ish rounded summit where a small character can stand, with open sky above it. Bold flat colours, no outlines, childlike wax crayon look.
```

## Glassberget som berg (019, art direction v2)

För 019 Min favoritfärg ("ett berg av glass så långt jag kan nå") ett riktigt berg av rosa jordgubbsglass i stället för struten: brett, med droppar som snö, gräddtoppar och strössel, och en rund topp som figurerna står på. Google Flow 2026-11-08 (Nano Banana, 0 krediter), `refrang-v2/cut/glassberget-v2.png` som stilreferens. Originalet: `assets/rekvisita/glassberg-v3/glassberg-flow.jpeg`. Urklippt (vitt bort från kanterna) med ny vit klistermärkeskant i kod: `assets/rekvisita/glassberg-v3/cut/glassberg.png` (2360 × 1750, toppen där figurerna står ca (1200, 95)).

```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique, strawberry pink, colourful sprinkles and thick white sticker border, not its shape. Draw ONE big friendly toddler-cartoon ICE-CREAM MOUNTAIN: a wide gentle mountain shaped like a soft round heap of pink strawberry ice cream, much wider than tall, with two or three soft rounded bumps along the slope like a hill path going up, and one wide rounded summit. Soft pink ice cream drips hang over the edges like snow. A few small round white whipped-cream dollops and colourful short rounded sprinkles. Flat wide bottom edge, no cone, no bowl. Flat soft pink crayon fill (#F27FB2) with fine paper grain and light scratchy lighter-pink crayon strokes, a very faint deeper pink along the bottom. No dark outline, no 3D shading, no highlights. A thick clean even white sticker border all around, like a die-cut vinyl sticker. Centered, fills the frame side to side, pure solid white background, no shadow, no ground, no characters, no text.
```

## Rosa himmel bakom glassberget (019)

Sanna 2026-11-09: "we need a pink bg for the glassberg scene". En tom rosa krithimmel i stället för den blå gradienten i 019:s glassbergsscener. Google Flow 2026-11-09 (Nano Banana, 0 krediter). Bara himlen används: `assets/bakgrunder/glassberget/varianter/rosa-himmel.png` (1376 × 768), marken och berget ligger ovanpå i koden. Prompten nedan är ungefär den som gavs (Flow-jobbet sparade inte hela texten här).

```prompt-rosa-himmel
Empty background plate for a toddler cartoon, flat front view, no characters, no objects. A soft pastel pink sky filling the upper three quarters, very light warm pink near the horizon, slightly deeper pink at the top, with loose scribbly wax crayon strokes and fine paper grain. Low soft rolling hills along the bottom edge. Bold flat colours, no outlines, no text.
```

## Utsikten: många glassberg (019)

Sanna 2026-11-09: "the mouse is on top of mountain and behind sees a landscape of icecream mountains". Ett landskap av glassberg i olika smaker bakom glassberget, sett uppifrån; Mille står på toppen och kameran zoomar ut från hennes ansikte till hela landskapet. Google Flow 2026-11-09 (Nano Banana, 0 krediter), glassberg-v3 och den rosa himlen som stilreferenser: `assets/bakgrunder/glassberget/varianter/glassbergen-vy.png` (1376 × 768).

```prompt-vy
Image 1 and 2 are STYLE references only: copy the soft wax-crayon technique, strawberry pink ice cream, sprinkles and the pastel pink crayon sky. Empty wide background plate for a toddler cartoon, a big panoramic view seen from high up: a whole landscape of many soft rounded ice-cream mountains stretching far away to the horizon, like a mountain range made of ice cream. Mountains in different sizes and gentle pastel flavours (mostly strawberry pink, some vanilla cream, a few mint green and lemon yellow), soft drips like snow on their tops, small whipped-cream dollops and colourful short rounded sprinkles. Mountains get smaller and paler towards the horizon. A soft pastel pink crayon sky with a few small pink clouds. The bottom fifth of the image stays open and simple (soft pink haze between mountains), no foreground mountain in the middle. Flat soft crayon fills with fine paper grain, no dark outlines, no 3D shading. No characters, no text.
```
