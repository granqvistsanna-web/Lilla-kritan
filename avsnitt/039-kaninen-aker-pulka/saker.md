# 039 – saker (grind 2)

Fem nya saker, fyra tagningar var i Google Flow (Nano Banana 2.1, 0 krediter, 1:1). Stilreferenser för alla: bild 1 = `assets/rekvisita/mossan/cut/mossan.png`, bild 2 = `assets/rekvisita/stovlar-gula/cut/stovlar-gula.png` (samma hand som 024 och julhallens stövlar). Overallen och mössan får också bild 3 = `assets/karaktarer/kaninen-kanel/premium/kanel-body.png`, så att storleken och formen passar kaninens ägg.

Tagningarna hamnar i `assets/rekvisita/<sak>/original/<sak>-1…4.jpeg` och sida vid sida i `original/jamforelse.jpg`. När Sanna valt: urklipp med `egen_kant.py`, kanten tunnas till ca 1 % (`tunn_kant.py`), `rekvisita/<sak>.md` och raden i README.

Delarna mot riggen (overallens bål, byxben och ärmar, mössans öronrot) görs **efter** valet, ur den valda bilden: bålen klipps med kaninens egen alfa, ärmarna och byxbenen ur ärmarnas och benens färg och form. Ingen ny generering behövs för det.

| Sak | Mapp | Färg |
|---|---|---|
| Klädhängaren | `kladhangare` | varmt röd träribba, fyra knoppar |
| Overallen | `overall` | klar röd `#D9382E` |
| Mössan med öronhål | `mossa-oronhal` | grön `#2F7D46`, vit tofs |
| De gråa vantarna | `vantar-gra` | ljusgrå `#B9BEC4` |
| De rosa tumvantarna | `tumvantar-rosa` | rosa `#F48FB1`, vit mudd |

## Klädhängaren

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE simple wall coat rack for a child's hallway, seen exactly straight from the front, very simple and childish: one long, flat, horizontal wooden board in warm red (#C8443A) with rounded ends, about six times as wide as it is tall, with four round wooden knob pegs in warm honey yellow (#E8B730) evenly spaced along it, sticking out towards the viewer so each shows as a round dot with a short stem. Nothing hanging on it. No screws, no shelf, no hat rack, no pattern, no text, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole rack. Centered with lots of space around, plain pure solid white background, no shadow, no wall, no text.
```

## Overallen

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Image 3 shows the body shape of the small round character who will wear it: a short, round, egg-shaped body with short stubby arms and legs. Draw ONE padded winter snowsuit for that small round toddler character, laid flat and seen exactly straight from the front, very simple and childish: a round, chubby, puffy one-piece body in bright warm red (#D9382E), very wide and short like an egg, with two short stubby sleeves sticking out to the sides and two short stubby legs at the bottom, a soft rounded collar at the top with no hood, and one straight vertical zip line down the middle in a slightly darker red with a small yellow (#E8B730) zip pull at the top. A few soft quilted crayon stitch lines across the body. No pockets, no logo, no pattern, no face, no hands, no feet, no text, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole snowsuit. Centered with space around, plain pure solid white background, no shadow, no ground, no hanger, no text.
```

## Mössan med öronhål

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Image 3 shows the round head of the bunny who will wear it (its long ears are not shown). Draw ONE knitted winter hat for that bunny, seen exactly straight from the front, very simple and childish: a soft, wide, low rounded dome in warm Christmas green (#2F7D46) with a few gentle vertical knit rib lines in a slightly darker green, a thick folded-up brim along the bottom in the same green with short rib lines, and TWO clear round holes in the top of the dome, one on the left and one on the right, spaced apart like where two long bunny ears would come through, each hole a neat dark green oval with a soft rim. One small fluffy round cream-white (#FFF4E2) pompom sits on top in the middle between the two holes. Wide and low, with a straight even bottom edge, like a hat that sits on top of a head. No ears, no head, no face, no ear flaps, no strings, no pattern, no text, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole hat and pompom. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```

## De gråa vantarna

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE pair of plain toddler mittens side by side with a clear gap of white space between them, seen flat from the front, very simple and childish: each mitten a soft rounded mitten shape with one rounded thumb sticking out to the side (the thumbs point towards each other), and a short straight cuff at the bottom with a few vertical rib lines. Plain, quiet light grey (#B9BEC4) crayon with a slightly darker grey cuff. Plain and a little boring on purpose: no pattern, no stripes, no snowflakes, no hearts, no face, no string between them, no text, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around each mitten. Centered, the pair fills about 60 percent of the frame width, plain pure solid white background, no shadow, no ground.
```

## De rosa tumvantarna

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE pair of cheerful toddler thumb mittens side by side with a clear gap of white space between them, seen flat from the front, very simple and childish: each mitten a soft, chubby rounded mitten shape with one big rounded thumb clearly sticking out to the side (the thumbs point towards each other), and a thick fluffy cream-white (#FFF4E2) cuff at the bottom. Bright happy pink (#F48FB1) crayon with soft lighter pink streaks. No pattern, no stripes, no snowflakes, no hearts, no face, no string between them, no text, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around each mitten. Centered, the pair fills about 60 percent of the frame width, plain pure solid white background, no shadow, no ground.
```
