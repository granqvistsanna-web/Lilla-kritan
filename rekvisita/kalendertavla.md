# Kalendertavlan

Julkalenderns tavla, sedd rakt framifrån: en tjock ram i ljust trä (`#E8AC69`, samma trä som väggskåpet), snö längs hela överkanten, en grön girlang med nio röda bär i tre bågar på den höga övre ramdelen, och ett stort, helt tomt, platt fält i grangrönt (`#36704D`). Inga luckor, rutor eller siffror i bilden: koden lägger ut 24 kopior av [kalenderluckan](kalenderlucka.md) på fältet och ritar siffrorna själv. Ren fyllning med svagt kritkorn och vit klistermärkeskant.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** står framför [Vinterkullen](../bakgrunder/vinterkullen.md) i början och slutet av varje lucka (`produktion/youtube/shorts/jul/lucka.js`). Den rör sig aldrig.

**Mått i urklippet `assets/rekvisita/kalendertavla/cut/kalendertavla.png` (2501 × 1520 px, beskuret tätt, genomskinligt runt om):**
- **Det gröna fältet:** x 142, y 462, bredd 2204, höjd 918 (2,40:1). Hörnen är rundade: en rektangel 30 px innanför de måtten (x 172, y 492, 2144 × 858) är helt grön.
- **Luckornas placering (godkänd av Sanna 2026-11-11, "like a masonry grid"):** ett rutnät på 8 × 6 rutor i 16:9 som fyller fältet, med åtta stora luckor (2 × 2 rutor: 1, 5, 8, 11, 13, 16, 17, 24) och sexton små. I tavlans pixlar: 30 px marginal uppe och nere, mellanrum 21 px i sidled och 11,8 px i höjdled, ruta 236,7 × 133,2 px, rutnätet börjar på x 223,6, y 492. Med tavlan 1420 px bred i helbild blir små luckor 134 × 76 px och stora 281 × 158 px. Koden är inte ändrad än (`lucka.js` ägs av en annan session).
- Sex gånger fyra lika stora luckor i 16:9 (2,57:1) får också plats: i det första provet blev de 188 × 106 px med 14 px mellanrum och 26 px marginal.
- Girlangen ligger på y 181–383, alltså 79 px ovanför fältet. Snön ligger överst och går ner till y 170–200.
- Ramen med vit kant: 142 px till vänster om fältet, 155 px till höger, 140 px under.
- Vit kant: 9 px i filen, vilket blir 5 px i scenen när tavlan visas ca 1420 px bred.

Används i: julkalendern 2026, alla 24 luckor.

**Bilder (2026-11-11, Google Flow, Nano Banana Pro, 16:9, uppskalad 2K, 0 krediter, stilreferens väggskåpet och tavlan):** tre tagningar i `assets/rekvisita/kalendertavla/original/kalendertavla-1…3.jpeg`. Tagning 1 hade girlangen hängande ner över fältet. Tagning 2 (image2image på tagning 1) flyttade upp girlangen på ramen, men fältet blev för lågt (3,0:1). Tagning 3 skulle förlänga fältet och blev i praktiken samma bild som 2. **Vald: tagning 2, förlängd nedåt i efterhand (godkänd av Sanna).**

**Så gjordes urklippet:**
1. `~/.claude/skills/ai-video/.venv/bin/python -I .claude/skills/ai-video/scripts/cutout.py original/kalendertavla-2.jpeg ut.png 9 999999999` (9 px kant, alla hål fylls).
2. Snön (ljus och blåaktig) drogs 55 % närmare vitt, så att den syns som snö mot den ljusblå himlen. Skuggningen i snökanten är kvar.
3. Beskuret till innehållet: `original/kalendertavla-2-klippt-kort.png` (2501 × 1334, fältet 2204 × 732).
4. Förlängt 186 rader: ett band på 93 rader ur fältets raka mittdel (grönt fält och raka sidoramar, ovanför rad 828) lades in speglat och sedan rättvänt vid rad 828. Skarven syns inte. Ingen ny generering.

Prompten för tagning 1:

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline), not their subjects. Draw ONE big, empty, wide wooden board for a toddler cartoon advent calendar, seen exactly straight from the front, flat, no perspective: a wide, low rectangle with softly rounded corners, about 2.2 times as wide as it is tall. It has a chunky, cosy frame in warm light wood (#E8B97E), the same wood as image 1, about as thick as a tenth of the board's height, a little thicker along the top. Inside the frame is one large, completely plain, flat, empty middle field in deep fir green crayon (#2F7D46) with only an even fine crayon grain, a perfect wide rectangle with slightly rounded corners: absolutely nothing in it. Decoration on the frame only: a soft layer of snow lying along the whole top edge of the frame, drawn in very pale icy blue (#DCEBF5) with a slightly darker pale blue crayon edge (#B9D6EA) so that it clearly stands out from the white background, with gently lumpy rounded bumps; and one simple green garland (#3F9A5B) with five or six small round red berries (#E5302A), draped in three shallow swags across the top rail of the frame, just under the snow. The garland and the snow stay on the frame and never hang down into the green field. No doors, no windows, no squares, no grid, no lines, no numbers, no letters, no text, no stars, no bow, no bells, no lights, no legs, no stand, no shading, no 3D, no shine. Centered with white space around, plain pure solid white background, no shadow, no wall, no floor.
```

Snön beställs ljusblå med flit: `cutout.py` klipper bort allt som är nästan vitt, och snön ligger i tavlans ytterkant.

Prompten för tagning 2 (bild 1 = tagning 1):

```prompt
Edit Image 1. Keep the board EXACTLY the same: same flat straight-on view, same drawing technique and soft crayon grain, same warm light wood frame, same deep fir green plain middle field with the same wide shape and the same size, same pale icy blue snow with its soft blue edge lying on the top of the frame, same green garland with red berries, same pure white background. ONLY change: the garland must no longer hang down over the green field. Make the wooden top rail of the frame much taller, about three times as thick as the side rails, and move the whole garland up onto that wood, just under the snow, with shallower swags: every part of the garland, the lowest point of each swag and all the red berries, lies on the light wood, with a clear strip of plain wood between the garland and the green field. The green field is one clean, completely empty rectangle with softly rounded corners and a straight top edge: nothing overlaps it, nothing hangs into it. Shrink the whole board slightly if needed so that it still fits with white space all around. No other changes, no new details, no doors, no squares, no lines, no numbers, no text, no shadow.
```
