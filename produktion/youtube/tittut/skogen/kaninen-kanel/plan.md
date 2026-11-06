# Tittut: Kaninen Kanel i skogen 1 – plan

**Status:** plan, inget byggt. Första Tittut-filmen (beslutat 2026-11-06). Formatet står i [`format/tittut.md`](../../../../../format/tittut.md).

- **Plats:** skogen 1 ([`bakgrunder/skogen.md`](../../../../../bakgrunder/skogen.md)), `assets/bakgrunder/skogen/skogen.png`
- **Figur:** Kaninen Kanel ([`karaktarer/kaninen-kanel.md`](../../../../../karaktarer/kaninen-kanel.md)), ✅ referensark klart, utseendet ändras inte
- **Gömställen:** busken → `upp`, stenen → `sida`, stocken → `ur`
- **Ny pose:** tassarna framför ögonen (filmens enda nya pose)

## Ordningen

Tiderna är ungefärliga. Motorn tar längden från ljudfilerna, så siffrorna nedan bygger på de inspelade replikerna (`kanin-hej` 1,5 s, `kanin-var` 1,1 s, `tittut-2` 1,1 s, `hej-da-1` 0,7 s) och en gissning för `borta-1` (ca 0,8 s).

| # | Beat | Vad som händer | Replik / ljud | Ca |
|---|---|---|---|---|
| 1 | **Intro** | Kritan ritar snabbt skogen: väggen, golvet, sedan busken, stenen och stocken i den ordningen. Bädden och `skogsljud-1` börjar lågt. | Berättaren: *"Tittut!"* (`tittut-2`) när sista saken är ritad | 4,5 s |
| 2 | **Kanel kommer in** | Hon går in från vänster och stannar till vänster om busken. Vinkar. | *"Hej kaninen!"* (`kanin-hej`) | 4 s |
| 3a | **Runda 1: busken** | Står bredvid busken, ett litet steg in bakom den. Glider ner (`ner`, 0,5 s, `swoosh`). | *"Borta!"* (`borta-1`) | 1,5 s |
| | | Paus. Allt står still. Busken skakar lite en gång (`skakar`, `prassel-buske`). Bädden tystare. | Mitt i pausen: *"Var är kaninen?"* (`kanin-var`) | 3 s |
| | | Hon åker upp ovanför busken, lite över målet och tillbaka (`upp`, `pop`). Fniss och ett litet hopp. | *"Tittut!"* (`tittut-2`), `fniss`, `duns` | 2,5 s |
| | | Glider fram till stenen. | – | 1,5 s |
| 3b | **Runda 2: stenen** | Glider ner bakom stenen. | *"Borta!"* | 1,5 s |
| | | Paus, allt still (stenen skakar inte, en sten rör sig inte på riktigt). | *"Var är kaninen?"* | 3 s |
| | | Glider ut vid stenens **högra** sida (`sida`), mot stocken. Fniss, litet hopp. | *"Tittut!"*, `fniss`, `duns` | 2,5 s |
| | | Glider fram till stocken. | – | 1,5 s |
| 3c | **Runda 3: stocken** | Glider ner bakom stocken. | *"Borta!"* | 1,5 s |
| | | Paus, allt still. | *"Var är kaninen?"* | 3 s |
| | | Huvudet och öronen kommer ut vid stockens högra, öppna ände (`ur`, se frågorna). Fniss. Sedan reser hon sig och hoppar fram. | *"Tittut!"*, `fniss`, `duns` | 3 s |
| 4 | **Tassarna** (`tassar: 3`) | Zoom in till närbild, Kanel framifrån mitt i bild. Tre gånger: tassarna upp framför ögonen (0,5 s) → *"Var är kaninen?"* → paus 2 s → tassarna ut åt sidorna (0,4 s) → *"Tittut!"* → fniss. | `kanin-var`, `tittut-2`, `fniss` ×3 | 1 s + 3 × 6 s = 19 s |
| 5 | **Hej då** | Zoom ut. Kanel vinkar, bädden tonar ut. | *"Hej då!"* (`hej-da-1`) | 3 s |

**Totalt ca 60 s.** Det ligger i underkant av formatets 1–1,5 min. Se frågorna.

Övergångarna är bara zoom in (till tassarna) och zoom ut (till hej då). Inga kritsvep behövs, eftersom platsen är densamma hela tiden.

## Data

Positionerna är uppmätta i `assets/bakgrunder/skogen/test-tre-saker.jpg` (skalad till 1920×1080; originalet `skogen.png` är 2752×1536). Golvlinjen ligger på y ≈ 713 (66 %). **[x, y] är sakens mittpunkt nertill, där den står på golvet.** Sakerna står lite under golvlinjen, så de ser ut att stå på golvet och inte på horisonten.

```js
tittut({
  plats: 'skogen',
  figur: 'kaninen-kanel',
  saker: {
    buske: [400, 755],   // ca 520 × 345, vänster
    sten:  [960, 785],   // ca 440 × 320, mitten
    stock: [1495, 800],  // ca 430 × 250, höger; öppna änden mot höger, hålet vid ca (1655, 705)
  },
  rundor: [
    ['buske', 'upp'],
    ['sten', 'sida'],
    ['stock', 'ur'],
  ],
  tassar: 3,
  kort: [0],
});
```

**Kanel:** ca 450 px hög med öronen. Startposition för runda 1: stående på golvet till vänster om busken, ca x 150, fötterna på y ≈ 760. Under `ner` maskas hon bort nedanför sakens nederkant, annars sticker fötterna ut under busken (hon är högre än alla tre sakerna).

**`kort: [0]`:** Shorten tar bara runda 1 (busken) plus tassarna, som formatet säger. Då blir den: intro 4,5 + Kanel in 4 + runda 1 ca 7 + tassar 19 + hej då 3 ≈ **38 s**, gott och väl under 60 s. I 9:16 får bara busken plats: ett snitt på 608 px bredd runt x ≈ 400 rymmer busken (520 px) men inte Kanel bredvid den. Shorten behöver alltså en egen uppställning (se frågorna).

## Saknas

### Bilder
- **Inget saknas för platsen.** `skogen.png`, `skogen-saker/buske.png`, `sten.png` och `stock.png` finns och är urklippta.
- **Tassarna (ny pose).** `kanel-rigg.json` har armar med vridpunkter (arm-l vid 207,574, arm-r vid 803,570), men armstumparna är bara ca 120 px långa och ögonen sitter ca 270 px från vridpunkterna (412,396 och 605,401). **Att vrida armarna räcker inte, de når inte ögonen.** Det behövs nya armdelar för posen, till exempel `kanel-arm-l-upp.png` och `kanel-arm-r-upp.png` (en uppsträckt tass som täcker ett öga), eller en hel posebild med image2image från `kanel-faceless.png`. Prompten skrivs tillsammans med Sanna.
- **Ansiktet i närbild.** Ögonen ritas i kod och ska döljas av tassarna. Kontrollera att motorn ritar tassarna ovanpå ögonen.

### Röst (`assets/ljud/roster/tittut/`)
- `borta-1.m4a` *[whispers] Borta!* – **saknas**
- `hej-da-1.m4a` – saknas i `tittut/`, men **`assets/ljud/roster/hej-da-1.m4a` finns redan** från Gissa teckningen med samma röst och text (*[warm] Hej då!*, 0,7 s). Kan troligen användas direkt.
- Finns: `tittut-2`, `kanin-hej`, `kanin-var`. Variant 1 av Tittut saknas, men motorn faller tillbaka på variant 2.

### Ljudeffekter (`assets/ljud/effekter/`)
- `prassel-buske` – **saknas** (busken skakar). Prompten står i [`ljud-att-gora.md`](../../ljud-att-gora.md). Utan den kan `skakar` strykas i första filmen.
- Finns: `fniss`, `duns`, `pop`, `swoosh`, `skogsljud/skogsljud-1.m4a`.

### Musik
- **Bädden** (gemensam instrumental Suno-slinga för alla Tittut-filmer) är inte gjord än.

### Motorn
- `produktion/youtube/tittut/tittut.js` finns inte. Rörelserna `ner`, `upp`, `sida`, `ur`, `skakar` och `tassar` byggs där, liksom masken nedanför sakerna och Short-uppställningen.

## Frågor och idéer till Sanna

1. **Längden.** Med tre rundor och tre tassar blir filmen ca 60 s, i underkant av 1–1,5 min. Räcker det, eller ska pauserna vara 3 s rakt igenom och tassarna göras 4 gånger (ca 70 s)?
2. **`ur` vid stocken.** Hålet i stocken är bara ca 100 px brett, Kanels huvud ca 300 px. Hon kan inte komma ut *ur* hålet utan att se konstig ut, och hon får inte vändas. Förslag: hon glider ut lågt vid stockens högra ände, så att huvud och öron syns precis bredvid den öppna änden, som om hon kikar ut därifrån. Eller ska hon titta fram ovanför stockens ände?
3. **Shorten i 9:16.** Ska Shorten ha en egen uppställning där busken står mitt i bilden och Kanel bredvid (samma bilder, bara andra platser), eller ett snitt ur 16:9-bilden? Förslag: egen uppställning, `skogen.png` beskuren kring mitten.
4. **Stenen skakar inte.** Jag lät bara busken skaka (verklighetsnära, en sten rör sig inte). Okej?
5. **Överraskningen** (hon kommer fram på ett annat ställe) används inte i första filmen. Barnet ska först lära sig rytmen.
6. **Hej då.** Kan Gissa teckningens `roster/hej-da-1.m4a` användas, eller ska Tittut ha egna inspelningar i `tittut/`?
7. **Den öppna frågan i formatet:** lång version och Short samtidigt, eller Shorten först? Samma data ger båda, så det kostar lite att göra båda när motorn väl finns.
