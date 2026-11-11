# Natthimlen

**Väggfärg:** lugn mörkblå kvällshimmel, `#233B69` överst, `#334E83` i mitten och `#4F689E` längst ner · **Golv:** inget, bara himmel · **Används till:** julkalendern 2026, lucka 1 (`produktion/youtube/julkalender-plan.md`): himlen som kritan "ritar" bakom stjärnan

En slät mörkblå kvällshimmel som en egen bild, 16:9: en mjuk toning som är lite ljusare neråt, nästan inget kritkorn, och sju små bleka prickar långt ifrån varandra. Ingen måne, inga stora stjärnor (stjärnan i sagan är [stjärnbilden](../rekvisita/stjarna-gul.md)), inga moln, ingen horisont. Den ersätter det kodritade kritklottret i lucka 1, som Sanna tyckte var för kornigt ("sky bg that less texture", 2026-11-11).

**En lapp på papperet, inte en hel bakgrund:** bilden är klippt till en mjukt rundad rektangel med lite ojämn, handritad kant och genomskinligt utanför, så att den ligger på det krämvita papperet som de andra sakerna. Ingen vit kant.

**Mått i `assets/bakgrunder/natthimmel/natthimmel.png` (1920 × 1080 px, exakt 16:9, genomskinligt utanför lappen):**
- Lappen (bbox för de täta pixlarna): x 16, y 18, bredd 1889, höjd 1046. Kanten ligger ca 22 px in, vågar sig högst 9 px ut och in, och hörnens radie är ca 86 px.
- Färgen: `#233B69` vid y 64, `#334E83` vid y 540, `#4F689E` vid y 1015.
- Prickarna (mitt x, y; störst 11 px tvärs över): (841, 131), (1721, 137), (434, 270), (1328, 346), (814, 455), (140, 461), (1757, 521). Nedre halvan är tom. (Originalet har en åttonde prick precis bredvid den övre högra: i lappen smälter de ihop till en.)

**Konturen:** `assets/bakgrunder/natthimmel/natthimmel-kontur.json`, `{ "d": "M… Z", "bbox": [16, 18, 1889, 1046] }`. Den rundade formen som en sluten bana i bildens egna pixlar, 59 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs med start och slut på vänsterkanten (22, 724). Den ligger 6 px innanför lappens kant och avviker i snitt 0,9 px från den, som mest 3,3 px.

**Vald (2026-11-11, godkänd av Sanna):** tagning 1 av 1, `assets/bakgrunder/natthimmel/original/natthimmel-1.png` (2752 × 1536, hel bild kant i kant). OpenArt, Nano Banana 2, text2image, 2K, 16:9, **30 krediter** (historyId `0OEFV3vXzotg72CdJyGR`). Lappen: originalet beskuret till exakt 16:9 (11 px bort på var sida), skalat till 1920 × 1080 och klippt med en rundad rektangel vars kant förskjuts av mjukt brus (fast frö, så kanten blir densamma om den görs om). Provad med stjärnan, molnet och julgranen på: `assets/rekvisita/julgran/original/jamforelse-kladd.jpg`.

```prompt
A flat background plate for a premium toddler picture book, wide 16:9, completely flat, straight-on, no perspective: a calm, empty, dark blue evening sky that fills the whole image from edge to edge. ONE smooth, even field of deep night blue soft wax crayon and oil pastel (#30508E in the middle) with only a very light, fine, even paper grain, almost smooth, like a softly rubbed pastel surface. A very gentle, soft vertical gradient: slightly deeper blue (#2A4680) at the top, a little lighter and softer blue (#4566A8) toward the bottom, with no visible banding. Five tiny pale cream dots, each no bigger than a pinhead, placed very far apart in the upper two thirds, soft and faint. NO visible crayon strokes, no scribbles, no hatching, no streaks, no scratchy lines, no blotches, no heavy texture. No moon, no big stars, no star shapes, no sparkles, no clouds, no horizon, no ground, no hills, no trees, no characters, no vignette, no frame, no white border, no paper edge, no text, no letters.
```
