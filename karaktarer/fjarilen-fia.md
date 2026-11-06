# Fjärilen Fia

**Art:** fjäril · **Favoritsak:** fjäril 🦋 · **Status:** ✅ Referensark klart

## Utseende
- Form: liten. En plommonbrun kropp som en böna, fyra rundade vingar och två korta antenner med prickar i topparna.
- Färger: lavendellila vingar (`#B9A3E3`) i kraftig vaxkrita med några gula prickar (`#F6C21C`), plommonbrun kropp (`#5A3A4A`).
- Kännetecken: **stora ögon** som täcker nästan hela huvudet. Väldigt minimal, inget annat på kroppen.

## Personlighet
- Drömmande och glad. Älskar blommor och färger.
- Hittar alltid de vackraste blommorna åt sina kompisar.

## Röst och repliker
- Röst: ljus och mjuk, lite viskande.
- Återkommande replik: *"Flaxa, flaxa, fladder!"*
- Ljud: ett lätt pling när hon landar.

## Cut out-delar
```delar
body without wings, left wing pair, right wing pair (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/fjarilen-fia/`](../assets/karaktarer/fjarilen-fia/): framifrån, utan ansikte och kropp utan vingar, utklippta i `cut/`. Varje sidas vingpar är en egen bild som flaxar runt vridpunkten i `fia-rigg.json`. Ögonen sitter på (444, 410) och (579, 407) med radie 50. Delarna görs med `python3 verktyg/delar.py assets/karaktarer/fjarilen-fia fia --vingar`.

## Prompt
```prompt
Fia the butterfly: small, a plum-brown (#5A3A4A) bean-shaped body with two BIG round white eyes ringed in black with big black pupils, four rounded lavender (#B9A3E3) wings in heavy streaky wax crayon with a few round yellow (#F6C21C) dots, two short antennae with dot tips, no outline, a thin uneven white rim. Very minimal: no legs, no patterns, no marks.
```

## Pose: hopvikta vingar (Godnattsagan)
Fia vilar på ett grässtrå inför natten, framifrån: vingarna är ihopvikta uppåt, rygg mot rygg bakom kroppen, så att de syns som ett smalt lila par ovanför och bakom henne. Kroppen sitter på toppen av ett mjukt böjt grässtrå. Utan ansikte: ögonen och munnen ritas i kod, så att hon kan blunda och somna. Ändrar inte figuren.

Bilden finns inte än. Tills den finns viks vingarna i kod i `produktion/youtube/shorts/godnatt/fjarilen-fia/` (scaleX mot kroppen) och grässtrået ritas i kod. Generera med image2image, Image 1 = `assets/karaktarer/fjarilen-fia/cut/fia-faceless.png`, och lägg resultatet i `assets/karaktarer/fjarilen-fia/vilar/`.

```prompt
Image 1 is Fia the butterfly: keep her EXACTLY the same character and drawing style: the same small plum-brown (#5A3A4A) bean-shaped body, the same lavender (#B9A3E3) wings in heavy streaky wax crayon with a few round yellow (#F6C21C) dots, the same two short antennae with dot tips, no black outline, a thin uneven white rim around her. Keep her faceless: NO eyes, NO mouth, the head stays plain plum-brown. ONLY change the pose: she rests for the night, seen straight from the front, her wings folded up together above and behind her body, back to back, like a closed book standing upright, so only a narrow lavender pair with a yellow dot shows behind her. She sits on the tip of a single soft, gently bending blade of grass in the same wax crayon style (fresh green, a lighter streak down the middle, thin white rim), the blade coming up from the bottom of the image. Cosy, sleepy, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```
