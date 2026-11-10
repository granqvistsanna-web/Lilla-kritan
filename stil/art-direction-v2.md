# Lilla Kritan art direction v2

**Status:** vald riktning 2026-11-07, provad på Kaninen Kanel, Skogen, ett träd och förgrundssaker. Övriga figurer och platser är fortfarande v1 ([`stilguide.md`](stilguide.md)) tills de görs om.

v2 är samma värld som v1, fast mer genomarbetad: renare figurer med en tydlig vit klistermärkeskant, gulligare ansikten, kraftiga platta väggar med kritstruktur, och en kamera som går nära huvudfiguren. Allt ska fortfarande kännas ritat med vaxkrita.

Testbilder: [`assets/stiltest-premium/`](../assets/stiltest-premium/) (jämförelse, testscener, alla tagningar). Riggad figur: [`assets/karaktarer/kaninen-kanel/premium/`](../assets/karaktarer/kaninen-kanel/premium/) med `rigg-test.html`.

## Figurer

- **Platt kritfyllning:** en jämn färg med fin papperskornighet och mjuka kritdrag, bara en svag mörkare kritkant längst ner. Ingen skuggning, inget ljus på huvudet, ingen 3D-känsla. (En skuggad version provades först och var för "premium", se `kanel-premium-a.png`.)
- **Vit kant, lika tjock på allt:** en ren, jämn vit klistermärkeskant följer hela siluetten. Den görs om till samma tjocklek på alla urklipp, se [Vit kant](#vit-kant-en-bredd-för-allt).
- **Gulligt ansikte, ritat i kod:** svarta ovala ögon med en liten vit glansprick, rosa runda kinder, liten rosa nos på en gräddvit nosfläck och ett litet leende. Konsten görs utan ögon, kinder och mun.
- **Byggd för urklipp:** armarna står ut från kroppen med en glipa, benen är isär, öronen skilda åt, och svansen syns vid sidan.

### Storlek i världen (Sanna, 2026-11-08)

- **Figurer som står på två fötter är lika stora, ungefär.** Kroppen (utan öron, tofs och kam) är lika hög för alla, fötterna mot kroppens topp. Långa öron och tofsar får sticka upp ovanför, de räknas inte. Kanel, Ludde, Bulle, Gurra, Pip, Agda, Lova, Mille, Nicke (nyckelpigan, v2 2026-11-08), Disa (dinon, v2 2026-11-09), Hugo (hunden, v2 2026-11-09), Hulda (hästen, v2 2026-11-09), Kaj (katten, v2 2026-11-09), Olle (pojken, v2 2026-11-09), Zebbe (zebran, v2 2026-11-09), Elsa (elefanten, v2 2026-11-09), Rut (räven, v2 2026-11-09), Greta (grisen, v2 2026-11-10), Alfons (apan, v2 2026-11-10), Ulla (ugglan, v2 2026-11-10), Pim (pandan, v2 2026-11-10), Lejonet och Kon hör hit. Det är benen som avgör, inte djuret: en mus på två fötter är stor.
- **Vuxna är större:** Mamma Mor (v2 2026-11-09) är den vuxna och visas **ca 1,4 gånger så hög som Olle** (kroppen, utan hårknuten). Hon är ritad 729 px hög i 1024-rutan, så hon visas på **SKALA 0,675** (0,5 · 1,4 · 705 / 729) med 7,4 px kant i filerna. I en närbild av henne ensam: kamerans zoom 2 · 0,5 / 0,675 ≈ 1,48, så att hon fyller bilden som barnen gör på zoom 2. Kontroll: `assets/karaktarer/mamma-mor/premium/mor-olle-storlek.jpg`.
- **Små djur är mindre:** insekter och djur som inte står på två fötter (inga ben, eller fyra ben) visas på **ca 40 %** av en tvåbent figurs höjd. Hit hör Fia (fjärilen), Humle (humlan) och fåglar som flyger.
- **I siffror:** v2-figurerna är ritade så att kroppen är 710–790 px hög i 1024-rutan, så alla tvåbenta visas på **SKALA 0,5** och blir lika stora utan justering. Små djur visas på **SKALA 0,2** (40 %).
- **Kanten följer med:** en sak som visas mindre får tjockare kant i filen (se [Vit kant](#vit-kant-en-bredd-för-allt)). Ett litet djur på 0,2 behöver ca 25 px kant i filen, inte 10.
- **Sovbilderna** (den ritade sovposen) skalas så att de ser lika stora ut som den stående kroppen (0,86 för Bulle), och för små djur gånger 0,4.

| Kropp i 1024-rutan (fötter → kroppens topp) | px |
|---|---|
| Kanel | 754 |
| Ludde | 746 |
| Bulle | 715 |
| Gurra | 758 |
| Pip | 787 |
| Agda | 768 |
| Lova | 742 |
| Mille | 709 |
| Nicke | 749 |
| Disa | 712 |
| Hugo | 717 |
| Hulda | 695 |
| Kaj | 694 |
| Olle | 705 |
| Kajsa | 748 |
| Zebbe | 743 |
| Elsa | 738 |
| Rut | 729 |
| Greta | 740 |
| Alfons | 729 |
| Pim | 728 |
| Ulla | 746 |
| Mor (vuxen, SKALA 0,675: 1,4 × Olle) | 729 |

## Platser

Kompositionen följer referensbilderna: **en kraftig platt väggfärg och ett vitt golv**, nästan inget annat.

- **Vägg:** en stark färg med tät kornig oljepastell, några lösa ljusa kritstreck snett över. Eller en **tapet**: rader av små doodles (träd, löv, vågor) i en ton bara lite ljusare än väggen, så att väggen fortfarande läses som en färg.
- **Golv:** vitt (`#FAF8F2`), rak horisont med lite ojämn kritkant, ca 70 % ner i bilden.
- **Inget på plattan.** Träd, buskar och blommor är egna urklipp som läggs till i kod. Då kan de flyttas, gunga och ligga framför figuren.

Valda: Skogen grön (`skogen-gron-a.png`, väggen `#5DB85C`, och utan träd `skogen-gron-utan-trad-a.png`, som är den att använda) och Skogen tapet (`skogen-monster-mild-a.png`, väggen teal `#2E8B7A`).

## Saker och förgrund

- **Enkla former**: ett klubbträd är en rund krona på en rak stam, utan lövkrullar. En buske är en knölig klump.
- Platt krita med tydlig kornighet och kritdrag, ingen skuggning, egen vit kant.
- **Förgrund:** bara två grästuvor, en på var sida om figuren (den högra speglad), framför figuren. Inga blomklasar. De ger djup utan att plattan blir rörig.

Urklipp: `assets/stiltest-premium/cut/egen/` (`trad`, `gras`, `buske`, `blommor-vita`, `blommor-rosa`, `kanel`). Buske och blommor används inte i förgrunden längre.

## Vit kant, en bredd för allt

Samma vita kant på allt: **5 px i scenen vid zoom 1.** Kanten i filen är 5 px delat med skalan saken visas i.

| Sak | Visas som | Kant i filen |
|---|---|---|
| Kanel | SKALA 0,5 på 1024-rutan | 10 px |
| Mor (vuxen) | SKALA 0,675 | 7,4 px |
| Träd | 700 px högt, fil 1943 px | 14 px |
| Gräs | 180 px högt | 17 px |
| Buske | | 14 px |
| Blommor | | 18 px |
| Bilen | skala 0,47 | 14 px |

Verktyg, körs efter `egen_kant.py` (som fortfarande är själva klippsteget):
```bash
python3 verktyg/tunn_kant.py N fil.png [fil2.png ...]
```
`tunn_kant.py` räknar ut kanten från färgfyllningen och skriver över filen. Vita skåror inne i fyllningen fylls med närmaste kritfärg.

**Regel i en scen:** kant i filen × scenskala ska vara lika för allt. I bilscenen är bilen 14 px × 0,47 och Kanel 10 px × 0,66 (1,4 bil-px per rutnäts-px), båda ca 6,6 px i scenen.

**Varför:** bildmodellen ritar en annan kantbredd varje gång, och en sak som visas mindre får relativt tjockare kant. `rita-lemmar --kant 37` la dessutom 24 px kant ovanpå konst som redan hade en, och hela scenen blev för tjock.

**Undantag, vita saker:** `tunn_kant.py` kan inte skilja vita kronblad från kanten. De vita prästkragarna (`blommor-vita`) förstördes och behåller sin ursprungliga kant. Använd andra saker, eller hantera vita saker för sig.

## Kamera och komposition

- **Närbild som standard:** huvudfiguren fyller ungefär 78 % av bildhöjden, fötterna nära underkanten. Kameran följer figuren i sidled med lite eftersläp och följer med 70 % av ett hopp uppåt. Den visar aldrig utanför bakgrunden. Zoom 2,0 på en 1920×1080-platta.
- **Gör figurerna större med kamerans zoom, inte med SKALA.** Då förblir kanterna lika tjocka (se Vit kant).
- **Hela scenen när platsen är poängen:** tittut och kurragömma visas brett (zoom 1), så att barnen ser alla gömställen. `?vy=hela` ligger kvar på zoom 1.
- Se `rigg-test.html` (närbild) och `rigg-test.html?vy=hela` (brett).

## Rigg

Figuren delas i kropp, två öron, två armar, två ben och svans, alla i samma 1024-ruta med vridpunkter i `<namn>-rigg.json`.

1. Godkänd figur med ansikte → image2image **utan ansikte** (ögon, kinder, mun bort) och **bara kroppen** (öron, armar, ben, svans och ansikte bort). Spöken av borttagna delar städas bort genom att bara behålla den största delen.
2. `python3 verktyg/delar.py <mapp> <namn> --egen-kant --oron-svans` delar upp figuren. Delarna klipps ur den utklippta figuren, så kanten blir exakt densamma. Sätt sedan kanten på alla delar med `tunn_kant.py` (Kanel: `python3 verktyg/tunn_kant.py 10 <delarna>`). Med `--oron-svans` räknas delar ovanför kroppen **eller i dess översta tredjedel** som öron, så att hängöron vid sidorna (lammet) inte blir armar.
3. Är armarna bara små stumpar i konsten: rita om dem med `verktyg/rita-lemmar.py <mapp> <mapp>/cut <kritbit ur kroppen> --bara arm`. **Kritbiten måste vara ren.** En bit med ett märke i gav vita V-skåror i båda armarna. Kanels armar målades om med en speglad platta av en ren 96 px-bit ur `kanel-body.png` (x 310, y 400), med 6 px kant mörkad till 0,84, och trimmades sedan till 10 px kant med `tunn_kant.py`. Lägg inte på någon egen kant med `--kant`. Benen, öronen och svansen tas ur konsten. Rita också om armarna när konstens armar är tunna kilar som ligger över kroppskanten (lammet): annars syns en rak, avskuren rot så fort armen vrids. Klövar eller mörka tassar görs genom att armens yttersta del mörkas.
4. Ansiktet i kod (Kanel): ögon `rx 17, ry 25` på (419, 401) och (600, 400) med glans r 6 på (−6, −10); kinder `rx 30, ry 18` på (383, 452) och (636, 451), `#ec8f96`; munnen `M512 440 L512 454 M484 452 Q498 468 512 454 Q526 468 540 452`, öppen mun en ellips under nosen.

**Rörelse:** som i v1 (inga vändningar, lugna hopp). Nytt i v2:
- Öronen släpar efter kroppens fart upp och ner och fladdrar lite.
- Svansen viftar snabbt en kort stund då och då, med ett litet ljud (än så länge `puff`, ett eget ljud behövs).
- Glada ögon blir ^ ^-bågar, och kinderna lyser lite starkare.
- Vinkande arm: armarna pekar redan åt sidan, så över ca −55° hamnar armen bakom kroppen.

### Rötter som inte syns (lärdomar från lammet)

- **Rund öronrot:** ett öra som klipps med `delar.py` får med sig en remsa av kroppens vita kant, och den syns som en vit linje ovanför örat så fort det lutar. Öron vid sidorna byggs därför om: örat utanför kroppen, plus en rund rot (r ca 40) i kroppens egen krita som går ca 30 px in i huvudet, plus samma 10 px vita kant under båda. Vridpunkten ligger i roten, inne i huvudet. Kanels öron står ovanför huvudet och klipps i stället bort under y 308.
- **Armar framför kroppen utan kant på roten:** armen som ligger framför kroppen (bakre armen i gången, klappen, händer på magen) har en egen fil, `cut/<namn>-arm-l-fram.png` och `-arm-r-fram.png`. Den vita kanten tonar bort längs armen mot roten. Armarna är ritade av kroppens egen kritbit, så roten smälter in i magen, och armen växer ut ur kroppen i stället för att sväva framför den. Armen byter till framför-kopian först vid `fram` 0,85, när den nästan är på plats, annars syns den kantlösa roten när armen glider ut över kanten.
- **Riktig klapp är standard (2026-11-10, Ulla och Rut först):** händerna möts mitt framför bröstet, tre klappar i takt (1,0, 1,5, 2,0 s) med en liten studs och fyra korta kritstreck ut från händerna vid varje klapp. Armarna är fortfarande korta stumpar i ett stycke: de kommer fram vid kanterna, och sedan skjuts vridpunkten in över magen så att den korta armen räcker till mitten. Bara handen syns: `-klapp`-kopian (`python3 verktyg/klapparm.py assets/karaktarer/<mapp>/premium <namn>`) är `-fram` med hela roten tonad i alfa, så armen växer ut ur kroppen även över ljusa fläckar. Mått per figur: L = armens längsta pixel från vridpunkten (skriptet skriver ut den); kontaktvinkel −144° (handen ca 15° upp, räknat från armens egen vilovinkel, 130° hos de flesta; Greta 125° ger −140°); in vid kontakten = (mitten mellan armarnas vridpunkter) − vänstra vridpunktens x − L·cos15° + 3; öppen −126° och 40 px mindre in; `spets` = L·sin15°; `y` väljs så att händerna möts på kroppens färg, inte på ansiktet, mulen, trynet, snabeln, ögonfläckarna eller en magfläck (Elsa +105 under snabeln, Kajsa +105 under koskällan). Koden: `KLAPPTYP`, `KLAPPNY`, `klappNy` och `.gnista` i Ullas eller Ruts `uttryck.html`.
- **Kantklappen finns kvar som `?klapp=kant`:** armarna klappar på magen vid kroppens kanter: ca −95° och 40 px in (Kanel −160° och 192 px), och posen "händer på magen" likadant. Det var standarden för korta armar före den riktiga klappen.
- **Squash i riggsidan:** öron, armar och svans följer kroppen när den trycks ihop i hoppet, annars sticker öronrötterna upp vid landningen.

### Riktningspose

Kroppen står alltid framåt. Figuren vänds eller ritas aldrig från sidan. Riktningen visas i kod med tre saker:

- **Ansiktet** glider ca 36 px (1024-rutan) åt det hållet, trycks ihop till scaleX 0,92 och lutar −5°.
- **Öronen** lutar 10–12° åt samma håll och flyttas 14–22 px.
- **Båda armarna** kommer ut på samma sida, en ovanför den andra: den närmaste armen plus en kopia ca 85 px lägre. Den bortre armen glider in bakom kroppen och kopian glider ut bakom kroppen (armar tonar aldrig in eller ut), för om man roterar den bortre armen sticker dess rot ut på andra sidan.
- Valfritt: kroppen lutar ca 2° åt riktningen.

Blanda med ett värde 0–1 (`vand` i `assets/stiltest-premium/bil/bil-test.html`), så att figuren kan vända sig mot tittaren för att vinka och tillbaka.

Använd det när figuren gör något åt ena sidan: kör med ratten, sträcker sig efter eller håller en sak, puttar på något.

### Gång åt sidan (alla figurer)

En figur som går åt sidan står kvar framifrån, men ansiktet och magen glider åt gångriktningen som i riktningsposen. Armarna sitter **inte** på samma sida som i riktningsposen:

- **Bakre armen** (den på andra sidan än gångriktningen) ligger **framför** kroppen, vid kanten, och sticker ut lite över den. Den pekar snett nedåt bakåt (ca −18°) och pendlar ±14°.
- **Främre armen** tittar fram bakom kroppen på gångsidan, kortare (inskjuten ca 60 px), och pendlar i otakt med den bakre.
- **Öronen** rör sig bara lite (högst ±8° av farten och ett fladder på ±1°), annars ser det stökigt ut.
- Gången blandas in och ut med ett värde 0–1 (`gang`), så att figuren vänder sig mot tittaren när hon stannar. Bakre armen byter lager (bakom → framför kroppen) vid 0,5. Inget tonar.

**Armar flyger inte.** När en figur byter pose eller vänder sig ska armarna glida in och ut bakom kroppen med samma vinkel, inte svänga genom luften. En pose med armarna uppe (hurra) sänker dem igen innan nästa rörelse börjar. Bara själva gesten (vinka, klappa) får svänga armen. Bakre armen använder framför-kopian utan kant på roten (se Rötter som inte syns).

I koden (Kanel är förlagan, 2026-11-10): `blandaPose` gör det själv. Ändras en armvinkel mer än 20° mellan två poser glider armen in bakom kroppen (`gom` 0–1, 200 px in), vinkeln byts medan armen är gömd (mitten av blandningen, 30–70 %) och armen glider ut igen. Det gäller inte när armen är framför kroppen (`fram`) eller i gången. Vinkningen gör likadant: armen kommer upp bakom kroppen och vinkar sedan ±14° på 1,2 s per fram och tillbaka. **Posen äger armarna:** uttryckets armvinkel (jätteglad +40°) tonas bort när posen själv flyttar armen, annars blir hurra raka pinnar uppåt i stället för ett V. I vilan andas kroppen 1 % på 3,5 s, armarna rör sig inte av sig själva. Inga böjda armar och inget eftersläp eller efterstuds på armarna (Sanna avvisade båda).

Kanels `steg()` och `rita()` i `assets/karaktarer/kaninen-kanel/premium/uttryck.html` är förlagan. Siffrorna gäller 1024-rutan, så mät om för en figur med annan form.

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
Förgrunden (nu bara gräset används) görs som ett ark med fyra saker i ett 2×2-rutnät ("a small tuft of five green grass blades, a small low round green bush, three simple white daisies …, three simple round pink and orange flowers …, each with its own thick clean white sticker border and a flat bottom") och klipps med `egen_kant.py ark.png utmapp --ark gras buske blommor-vita blommor-rosa`.

## Det här ändrar v2 jämfört med v1

| v1 | v2 |
|---|---|
| Tunn ljus kritig kant, 3 px + 1 % (`vita-kanter`) | En bredd för allt: 5 px i scenen, räknad om per sak med `tunn_kant.py` |
| Små prickögon i vita ringar | Ovala svarta ögon med glans, rosa kinder |
| Väggfärg plus 1–3 saker på plattan | Bara vägg och golv, saker som egna urklipp |
| Figuren mitt i en bred bild | Närbild (zoom 2,0) som följer figuren, bred bild för tittut |
| Armar ritade med `rita-lemmar.py` | Ben, öron, svans ur konsten, armar ritade av en ren kritbit (`--bara arm`), kant med `tunn_kant.py` |

## Fordon (bilen)

Bilscenen: `assets/stiltest-premium/bil/bil-test.html` (Kanel kör, världen glider förbi, hjul, ratt, lampa och avgasmoln i kod). Det här gäller:

- Bilderna "hela bilen" och "bilen utan hjul och ratt" (image2image) är **inte pixelperfekta mot varandra**: strukturen görs om och ca 2 % av ytan skiljer. Klipp därför **alla delar ur en enda bild:** `assets/stiltest-premium/bil/hel-b.png`.
- Delar:
  - Baksidan, med ratten ersatt av närmaste färger.
  - Frampanelen: allt under den gräddvita insidans nedre kant, så att figuren sitter inne i karet.
  - Hjul som cirklar med radie 236 över de målade däcken. En roterad cirkel täcker samma pixlar.
  - Rattringen och rattstången som egna delar.
- Lagerordning: baksida, ring, stång, vänster arm (greppar), figur, frampanel, hjul.
- Inga gula strålar runt strålkastaren. Ljuset görs i kod.
- Kanten läggs på hela bilen **innan** den delas, så att skarvarna inte får vit kant. Filer: `assets/stiltest-premium/bil/cut/`.
- **Skala:** bilen visas på 0,47 med 14 px kant i bilbilden. Kanel visas på 1,4 bil-px per rutnäts-px, alltså 0,66 i scenen. Båda kanterna blir ca 6,6 px i scenen.
- **Kamera:** närbild med zoom 1,2 (öron till hjul i bild).
- **Vägg:** den tealfärgade tapeten (`skogen-monster-mild-a.png`), för de gröna träden försvann mot den gröna väggen.
- **Karöppningen** bakom ratten fylls med gräddvitt i baksidelagret (konvext hölje av insidan), så att väggen inte syns genom ringen.
- **Avgasmoln:** tre vita cirklar med ljusgrå kant, helt täta och de tonar bort mot slutet.
- Förar-poser: se Riktningspose under Rörelse.
- Testklipp: `assets/stiltest-premium/bil/bil-test.mp4` (lokalt, mp4 ignoreras av git).

Nämn aldrig förebildens serie i prompter. Beskriv egenskaperna, som ovan.
