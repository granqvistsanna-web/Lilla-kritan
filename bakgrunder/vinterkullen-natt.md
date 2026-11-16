# Vinterkullen på kvällen

**Väggfärg:** djup kvällsblå `#43639C`, ljusare ner mot kullen (`#8FA4CA`) · **Golv:** samma snökulle, ljust blåvit `#D3E0F5` · **Används till:** julkalendern 2026, kvällsluckorna (adventssöndagarna, Lucia och julafton, se `produktion/youtube/julkalender-plan.md`)

[Vinterkullen](vinterkullen.md) en lugn kväll, 16:9, art direction v2. Samma kulle och samma snöiga granar på samma platser som i dagbilden, så att dag och kväll kan bytas mot varandra. Himlen är mörkblå med kritskraffering och snön lyser svagt, lite ljusare längs kullens topp. Mysigt, inte mörkt och inget läskigt.

**Ingen måne i bilden** (Sanna 2026-11-11: "remove the moon"). Himlen är tom. Vill en lucka ha en måne läggs den dit i kod som ett eget urklipp, till exempel `assets/bakgrunder/nattkullen-saker/mane.png`. Snön som faller läggs också på i kod.

**Mått i bilden (2752 × 1536, samma format som dagbilden: skala 0,703 i en 1920 × 1080-ruta, 7 px beskärs på var sida):**
- Snökullens kant: y 1033 mitt i bilden (67,3 %), y ca 1100 vid en fjärdedel och tre fjärdedelar av bredden (71,5 %), y ca 1160 vid 15 % och 85 % (76 %). Den ligger alltså ca 20 px högre än i dagbilden.
- Fötter på 80 % av höjden (y 1229) står på snön överallt mellan granarna.
- Granarna står som i dagbilden: vänster till ca 15 % av bredden, höger från ca 86 %, toppen på y ca 910.

**Vald (2026-11-11, godkänd av Sanna, sedan utan måne):** tagning 1 av 1, OpenArt, Nano Banana Pro, image2image, 16:9, 2K, **40 krediter**. Bild 1 = `assets/bakgrunder/vinterkullen/vinterkullen.jpeg`. Tagningen som OpenArt gjorde den, med en stor gräddvit måne uppe till höger (mitt (2187, 338), diameter 336 px), ligger i `assets/bakgrunder/vinterkullen-natt/original/vinterkullen-natt-1-med-mane.png`. Den som gäller är `assets/bakgrunder/vinterkullen-natt/vinterkullen-natt.png`.

**Så togs månen bort (lokalt, ingen ny generering):** inom 350 px från månens mitt ersattes bilden med en jämn himmel (ett andragradspolynom anpassat till himlen runt om, utanför månens sken) plus kritstrecken ur himlen 700 px till vänster, med mjuk övergång. Skarven syns inte.

```prompt
Edit Image 1. Keep the winter place EXACTLY the same: same flat straight-on view, same soft wax-crayon and oil-pastel technique with fine crayon hatching and no dark outlines, same snow hill with exactly the same curve and position, same small snowy spruce trees in exactly the same places at the far left and far right, same completely empty middle. ONLY change the time of day to a calm, cosy early evening: the sky becomes a deep, friendly evening blue (#2F4A8C) with the same gentle crayon hatching, a little lighter just above the hill. The sky is completely empty: no moon. The snow hill stays light and clearly readable: soft pale blue-white snow (#DCE6F5), a little lighter along the top of the hill. The spruce trees become a slightly deeper blue-green with pale blue-white snow caps. Gentle, warm and safe, like a bedtime picture book: not black, not gloomy, nothing scary. No moon, no stars, no clouds, no falling snow, no snowflakes, no animals, no people, no houses, no lights, no lanterns, no footprints, no cast shadows on the snow, no objects, no text, no white frame or border.
```

Prompten ovan är den som ska användas om bilden görs om: utan måne. Tagningen gjordes med samma prompt, men med den här meningen i stället för "The sky is completely empty: no moon.":

```
Add ONE round full moon in soft warm cream (#FBF3D5), flat crayon, no face, no craters, with only a very faint soft glow around it, in the upper right of the sky at about 84 percent of the image width and 18 percent of the image height, about 11 percent of the image height across.
```

Månen blev dubbelt så stor som prompten bad om och hamnade på 79,5 % av bredden.


## Vinterkullen på kvällen v2: lila julkväll (julkalendern)

`assets/bakgrunder/vinterkullen-natt-v2/vinterkullen-natt-v2.jpeg` (tagning 2 av 2, båda i `original/`). Samma kulle som v1 (kanten högst 13 px högre). Himlen går från mörkblått via lila till en rosa glöd ovanför kullen, snön är ljust lavendelvit, och stugan med varmt ljus i fönstret står till höger. Används av `lucka.KULLE(true)`.

Google Flow, Nano Banana Pro, image2image (Edit Image 1 = bilden ovan), 16:9, uppskalad 2K (2752 × 1536), 0 krediter, 2026-11-16. Sanna: *"kanske en mer fin vinterbakgrund överlag … många andra bakgrunderna är mer färgstarka"*.

```
Edit Image 1. Keep the winter evening place EXACTLY the same in layout: same flat straight-on view, same soft wax-crayon and oil-pastel technique with fine crayon hatching and no dark outlines, the same snow hill with exactly the same curve, height and position, and the same completely empty middle of the picture. ONLY change the colours and add a little warmth at the far edges. The sky becomes a cosy, colourful Christmas evening: deep friendly indigo (#2E2F72) at the top, blending down through rich violet (#5B4598) and soft plum-lilac (#9A6BB4) to a warm rosy pink glow (#E9A0B8) just above the hill, all with the same gentle crayon hatching. Never black, never gloomy. Far behind the hill, a low distant snowy ridge in soft lilac-blue crayon shows along the horizon. The snow hill is soft light lavender-white snow (#E2DEF2), a little lighter along its top, with a faint rosy reflection. At the far left and far right edges only: a few more, fuller, chunky spruce trees in deep blue-green crayon with pale snow caps, still only at the outer 15 percent of each side. At the far right, partly behind the trees, one small cosy red wooden cottage with a snowy roof and one small window glowing warm golden yellow with a soft warm glow. The middle 65 percent of the picture stays completely empty: only sky above and plain snow below. No moon, no stars, no clouds, no falling snow, no snowflakes, no animals, no people, no snowman, no footprints, no objects in the middle, no cast shadows, no text, no white frame or border.
```
