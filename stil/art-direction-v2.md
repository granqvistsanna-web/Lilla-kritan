# Lilla Kritan art direction v2

**Status:** vald riktning 2026-11-07, provad på Kaninen Kanel, Skogen, ett träd och förgrundssaker. Övriga figurer och platser är fortfarande v1 ([`stilguide.md`](stilguide.md)) tills de görs om.

v2 är samma värld som v1, fast mer genomarbetad: renare figurer med en tydlig vit klistermärkeskant, gulligare ansikten, kraftiga platta väggar med kritstruktur, och en kamera som går nära huvudfiguren. Allt ska fortfarande kännas ritat med vaxkrita.

Testbilder: [`assets/stiltest-premium/`](../assets/stiltest-premium/) (jämförelse, testscener, alla tagningar). Riggad figur: [`assets/karaktarer/kaninen-kanel/premium/`](../assets/karaktarer/kaninen-kanel/premium/) med `rigg-test.html`.

## Figurer

- **Platt kritfyllning:** en jämn färg med fin papperskornighet och mjuka kritdrag, bara en svag mörkare kritkant längst ner. Ingen skuggning, inget ljus på huvudet, ingen 3D-känsla. (En skuggad version provades först och var för "premium", se `kanel-premium-a.png`.)
- **Egen vit kant i konsten:** en ren, jämn, ganska tjock vit klistermärkeskant (ca 18 px i 1024-rutan, knappt 2 % av figurens höjd) följer hela siluetten. **Kanten som bildmodellen ritar behålls, ingen ny läggs till.** Bara den grå klipplinjen längst ut tas bort (`verktyg/egen_kant.py`). En pålagd kant ovanpå den ritade gav en synlig skarv och blev för tjock.
- **Gulligt ansikte, ritat i kod:** svarta ovala ögon med en liten vit glansprick, rosa runda kinder, liten rosa nos på en gräddvit nosfläck och ett litet leende. Konsten görs utan ögon, kinder och mun.
- **Byggd för urklipp:** armarna står ut från kroppen med en glipa, benen är isär, öronen skilda åt, och svansen syns vid sidan.

## Platser

Kompositionen följer referensbilderna: **en kraftig platt väggfärg och ett vitt golv**, nästan inget annat.

- **Vägg:** en stark färg med tät kornig oljepastell, några lösa ljusa kritstreck snett över. Eller en **tapet**: rader av små doodles (träd, löv, vågor) i en ton bara lite ljusare än väggen, så att väggen fortfarande läses som en färg.
- **Golv:** vitt (`#FAF8F2`), rak horisont med lite ojämn kritkant, ca 70 % ner i bilden.
- **Inget på plattan.** Träd, buskar och blommor är egna urklipp som läggs till i kod. Då kan de flyttas, gunga och ligga framför figuren.

Valda: Skogen grön (`skogen-gron-a.png`, väggen `#5DB85C`, och utan träd `skogen-gron-utan-trad-a.png`, som är den att använda) och Skogen tapet (`skogen-monster-mild-a.png`, väggen teal `#2E8B7A`).

## Saker och förgrund

- **Enkla former**: ett klubbträd är en rund krona på en rak stam, utan lövkrullar. En buske är en knölig klump.
- Platt krita med tydlig kornighet och kritdrag, ingen skuggning, egen vit kant.
- **Förgrund:** små grässtrån, en buske och blommor längst ner i bild, delvis utanför kanten, framför figuren. De ger djup utan att plattan blir rörig.

Urklipp: `assets/stiltest-premium/cut/egen/` (`trad`, `gras`, `buske`, `blommor-vita`, `blommor-rosa`, `kanel`).

## Kamera och komposition

- **Närbild som standard:** huvudfiguren är stor, ungefär två tredjedelar av bildhöjden, fötterna nära underkanten. Kameran följer figuren i sidled med lite eftersläp och följer med 70 % av ett hopp uppåt. Den visar aldrig utanför bakgrunden. Zoom 1,6 på en 1920×1080-platta.
- **Hela scenen när platsen är poängen:** tittut och kurragömma visas brett (zoom 1), så att barnen ser alla gömställen.
- Se `rigg-test.html` (närbild) och `rigg-test.html?vy=hela` (brett).

## Rigg

Figuren delas i kropp, två öron, två armar, två ben och svans, alla i samma 1024-ruta med vridpunkter i `<namn>-rigg.json`.

1. Godkänd figur med ansikte → image2image **utan ansikte** (ögon, kinder, mun bort) och **bara kroppen** (öron, armar, ben, svans och ansikte bort). Spöken av borttagna delar städas bort genom att bara behålla den största delen.
2. `python3 verktyg/delar.py <mapp> <namn> --egen-kant --oron-svans` delar upp figuren. Delarna klipps ur den utklippta figuren, så kanten blir exakt densamma.
3. Är armarna bara små stumpar i konsten: rita om dem med `verktyg/rita-lemmar.py <mapp> <mapp>/cut <kritbit ur kroppen> --bara arm --kant 37`. Benen, öronen och svansen tas ur konsten.
4. Ansiktet i kod (Kanel): ögon `rx 17, ry 25` på (419, 401) och (600, 400) med glans r 6 på (−6, −10); kinder `rx 30, ry 18` på (383, 452) och (636, 451), `#ec8f96`; munnen `M512 440 L512 454 M484 452 Q498 468 512 454 Q526 468 540 452`, öppen mun en ellips under nosen.

**Rörelse:** som i v1 (inga vändningar, lugna hopp). Nytt i v2:
- Öronen släpar efter kroppens fart upp och ner och fladdrar lite.
- Svansen viftar snabbt en kort stund då och då, med ett litet ljud (än så länge `puff`, ett eget ljud behövs).
- Glada ögon blir ^ ^-bågar, och kinderna lyser lite starkare.
- Vinkande arm: armarna pekar redan åt sidan, så över ca −55° hamnar armen bakom kroppen.

## Prompter (Nano Banana 2, image2image, 2K)

**Figur, första tagningen** (bild 1 = den gamla figuren):
```prompt
Image 1 is the character reference: the same little brown bunny (same design, colours and proportions). Redraw her as a premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, the tiny pink nose on the cream muzzle and a small happy smile. A small round fluffy cream tail peeking out at her lower right side. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded nubs held slightly out from the body with a clear gap, the two legs are separate and slightly apart with big oval feet, ears clearly separate from each other, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

**Gör den plattare** (bild 1 = tagningen ovan):
```prompt
Edit Image 1. Keep the bunny EXACTLY the same: same shape, pose, position and size in the frame, same cute face, same ears, arms, legs, feet and tail, same thick clean white sticker border, same pure white background. ONLY change: make her FLATTER. Remove most of the shading and highlights: the body becomes one even wax-crayon fill with fine paper grain and soft crayon strokes, with only a very faint slightly darker crayon edge along the bottom. No light glow on the head, no dark side, no rounded 3D look. Like a flat cut-paper sticker drawn in crayon. No other changes, no shadow, no text.
```

**Utan ansikte** och **bara kroppen**: som v1:s mall (b) i skillen `crayon-cutout`, plus "remove the pink blush cheeks". För kroppen: "remove both ears, both arms, both legs with feet, the tail, the eyes, the cheeks and the smile … close the outline with the same smooth egg curve and continue the same crayon texture and white sticker border seamlessly".

**Vägg, kraftig färg** (text2image, 16:9):
```prompt
Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top two thirds is one flat, bold, saturated <colour> wall (<hex>) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture: fine speckled paper grain plus a few loose, light, thin diagonal scratchy crayon streaks and scribbles in a slightly lighter <colour>, like hand-coloured paper. The bottom third is a plain flat white floor (#FAF8F2) with only the faintest grain, meeting the wall at one straight horizontal line with a slightly rough hand-drawn crayon edge, at about 68% of the image height. Nothing else. Bold, simple, flat, cheerful, lots of empty space. No characters, no animals, no shadows, no text, no letters.
```

**Vägg, tapet:** samma, men väggen "covered with loose rows of small, thin hand-doodled crayon patterns (<tiny round trees, little leaves, small wavy lines>), drawn in a light crayon only slightly lighter than the wall, low contrast and a bit faded and uneven, like a soft pattern you notice only when you look. The wall should read mainly as one calm colour." Första tagningen blev för tydlig, så be om "MUCH more subtle" om den gör det igen.

**Träd och förgrund** (bild 1 = en v1-figur med tydlig vaxkrita, t.ex. `kanel.png`, som STILREFERENS):
```prompt
Image 1 is a STYLE reference only: copy its wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading), not its subject. Draw ONE very simple toddler-cartoon tree: a single round lollipop crown, one slightly lopsided circle, flat fresh green crayon (#4FA34A) with a few lighter green scratchy crayon streaks, on a straight thin-ish brown crayon trunk that is a little wider at the bottom. No leaf curls, no lumps, no branches, no shading, no highlights. Flat like a child's drawing. A thick clean white sticker border all around the whole tree, slightly hand-cut. Centered, fills the frame top to bottom, pure solid white background, no ground, no shadow, no text.
```
Förgrunden görs som ett ark med fyra saker i ett 2×2-rutnät ("a small tuft of five green grass blades, a small low round green bush, three simple white daisies …, three simple round pink and orange flowers …, each with its own thick clean white sticker border and a flat bottom") och klipps med `egen_kant.py ark.png utmapp --ark gras buske blommor-vita blommor-rosa`.

## Det här ändrar v2 jämfört med v1

| v1 | v2 |
|---|---|
| Tunn ljus kritig kant, 3 px + 1 % (`vita-kanter`) | Konstens egen tjockare vita kant, ingen pålagd |
| Små prickögon i vita ringar | Ovala svarta ögon med glans, rosa kinder |
| Väggfärg plus 1–3 saker på plattan | Bara vägg och golv, saker som egna urklipp |
| Figuren mitt i en bred bild | Närbild som följer figuren, bred bild för tittut |
| Armar ritade med `rita-lemmar.py` | Ben, öron, svans ur konsten, armar ritade (`--bara arm`) |

Nämn aldrig förebildens serie i prompter. Beskriv egenskaperna, som ovan.
