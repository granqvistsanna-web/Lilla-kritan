# Orange fågeln

En lång orange sjöfågel, en mås, som glider in över sjön och flaxar bredvid båten (pip, pip, pip). Sedd från sidan med nosen åt höger (speglas när den flyger åt vänster), smal strömlinjeformad kropp, gul näbb, kluven stjärt och en lång mörkare orange vinge som flaxar i kod. Inget ansikte i bilden, ögat ritas i kod. Ersätter pumpan som orange sak 2 (Sanna, 2026-11-05: en pumpa på sjön kändes för slumpmässig).

Ny riktning (Sanna, 2026-11-05: "a longer sea bird orange bird with long wings perhaps less of a ball"). Hon valde B, "glidaren från sidan", bland fyra riktningar: `assets/bakgrunder/sjon-saker/orig/fagel-riktningar/`. Den gamla runda fågeln framifrån, med sina delar och sin rigg, ligger i `orig/fagel-fram/`.

Delarna: `assets/bakgrunder/sjon-saker/fagel/` (kropp, vinge och `fagel-rigg.json` med vingens vridpunkt, ögat och bboxen). Hela fågeln: `assets/bakgrunder/sjon-saker/fagel-orange.png`. Kroppen är Flows vinglösa version av samma bild (pixelrätt, prompten nedan), och vingen är originalet minus kroppen. I kod: `baten.fagel()` i `avsnitt/006-orange-baten/scener/baten.js`. Vingen trycks ihop i höjdled runt axeln, mellan uppe och nästan rakt ut. Den går aldrig ner under kroppen, för utan vinge ovanför ser måsen ut som en fisk.

Används i: 006 Orangea sången.

```prompt
An orange sea bird gliding, seen from the side, flying to the right: a long slim streamlined body like a gull, in bright orange wax crayon, with a small pointed yellow beak at the right end and a neat pointed tail at the left end, NOT a round ball. One very long narrow wing in slightly darker orange crayon rises from the middle of its back in a gentle upward curve and tapers to a soft pointed tip, longer than the body. No legs, no eyes, no mouth. Simple and bold for 2-year-olds.
```

Kroppen utan vinge (image2image på bilden ovan):

```prompt
Edit Image 1. Keep the orange bird exactly the same: same long slim body shape, same position and size in the frame, same bright orange wax-crayon fill with mottled grainy texture and paper grain, same thin uneven white rim, same yellow beak, same forked tail, same pure white background. ONLY change: remove the long dark orange wing completely. Where the wing met the back, continue the bird's smooth rounded back line and the same bright orange crayon texture seamlessly. No other changes, no new details, no eyes, no shadow, no text.
```
