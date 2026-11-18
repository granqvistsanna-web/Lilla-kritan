# Kritans ABC – recept 2: Stora bokstaven

Receptet för en film i Kritans ABC (en bokstav per film, ca 2:45, 16:9) i formen **Stora bokstaven**, riktning 3 ur `produktion/youtube/alfabet/skiss-form/` (2026-11-18). Ingen kloss: bokstaven själv är bilden. Ett färgat fält med ett jättestort, runt, krämvitt A är seriens kännetecken och fungerar nästan direkt som miniatyr.

Förlagan är `produktion/youtube/alfabet/abc-bokstaven/index.html` (A, 165 s). Kopiera den mappen för nästa bokstav i stället för att börja om. Innehållet (ljudet först, de fem slagen per ord, Malins ljud) står i `alfabet.md`.

## Formen

| Del | Vad händer | Fältets bredd | Bokstaven [x, y, skala] |
|---|---|---|---|
| **Vinjetten** (0–17 s) | Tomt krämvitt papper. Fältet glider in från vänster (*swoosh*, *duns*). *"Kritans ABC!"* (kanten buktar lite), *"Lyssna!"*, kritan ritar bokstaven drag för drag med bara kritljud, *pling* och gnistor, *"Aaaa."*, *"Kan du gapa stort? Aaaa!"* och paus. | 1300 | 650, 545, 1,25 |
| **Tre gissningar** (17–90 s) | Fältet drar ihop sig, papperet till höger blir scenen. Varje ord med samma fem slag (`gissning()`), och sedan blir saken ett runt vitt klistermärke i raden under bokstaven. | 720 | 360, 430, 0,95 |
| **Vilken ska bort?** (90–142 s) | Märkena flyttar till fyra runda pastelltallrikar 2 × 2 (utan linjer), sedan blir fältet smalt. Den udda poppar fram med sin tallrik och sitt ljud. Två rundor (`runda()`): bilen, sedan kon. | 520 | 260, 540, 0,72 |
| **Alla tillsammans** (142–165 s) | Fältet växer ut igen, bokstaven står stor och de tre blir klistermärken i en kolumn bredvid och hoppar på sina ord. Gapa en gång till, hej då. Slutbilden står kvar ca 2 s (miniatyr), sedan tonar allt ut. | 1460 | 540, 540, 1,25 |

Tiderna räknas ur replikernas längder (`langd()` läser m4a-filerna), så ändra replikerna, inte tiderna.

## Fältet och bokstaven

- **Färg per bokstav.** A: fältet `#E0473A`, skuggan `#B12E25`, bokstaven krämvit `#FBF2DE`. Ny bokstav = ny fältfärg och en mörkare ton av den till skuggan. Bokstaven är alltid krämvit.
- **Fältet** är en path vars högerkant är lite handklippt (`kantX(y)`, två sinusvågor, ±12 px) och flyttas med `translate(bredd)`. En mjuk skugga (`#mjuk`, .13) ligger 9 px till höger på papperet. Bredden har egna nyckelrutor (`FALT.kf`, `faltTill(t, bredd)`).
- **Bokstaven** är tre tjocka streck (`streck()` ur `gissa.js`, bredd 116, runda ändar) i bokstavens egna mått kring (0, 0), ca 570 × 620. A: `M-220 250 L0 -255`, `M0 -255 L220 250`, `M-150 112 L150 112` (1,0 + 1,0 + 0,5 s). Samma drag i mörkt ligger 6, 18 px under som skugga och ritas samtidigt. Hålet i A:et blir lagom stort med benen ±220 och tvärslån på 112. Strecken läggs in i `STRECK`, så hittar kritan dem själv.
- **Rörelse.** Bokstaven är inte en figur: inga ögon, inget ansikte. Den gungar lugnt kring foten (`aGung`, ca 4,5°) och sväller 5 % på varje a (`A.hopp`). Innan den finns buktar fältets kant i stället.
- **Krita utan frotté.** Stora ytor med `#vax` blir prickiga som frotté. Använd `#vaxlatt` (färre hål, kantförskjutning 4) på fältet.
- **Klipp inte bokstaven.** Ett filter på ett streck räknar sin yta från mittlinjen, inte från streckbredden, så runda toppar och fötter klipps rakt av. Bokstaven har därför egna filter med fast yta i sina egna mått: `#vaxlatt-a` och `#boil-a` (`filterUnits="userSpaceOnUse"`, x −420, y −440, 840 × 900). Samma sak gäller alla tjocka streck med filter.

## Klistermärkena och tallrikarna

- **Raden på fältet:** x 135, 360, 585, y 905, skala 0,33 (märket ca 200 px). Den täcker inte bokstaven när den står på 360, 430, 0,95.
- **In på fältet:** flytten har sättet `'krymp'` (skalan hinner före läget), så saken är liten innan den når fältet och går inte stor över bokstaven.
- **Ut till tallrikarna:** sättet `'hoger'` (åt höger längs raden först, sedan upp), så att märkena går under bokstaven. Det högra märket går först, och tallriken nere till vänster fylls sist, så inget märke glider över en annan sak: ananasen uppe till höger, apelsinen uppe till vänster, apan nere till vänster, den udda nere till höger (`TPLATS`).
- **Klistermärke eller inte:** `s.dw` (0–1) styr den vita skivan. På tallriken är saken utan skiva, de udda har aldrig någon.
- **Tallrikarna:** radie 205, lite handklippt rund, färg efter saken (grön apelsin, rosa ananas, gul apa, blå den udda), mitt i 960/1450 × 300/775. De poppar fram när saken är på väg dit (*pop*, 0,35), växer med saken Malin pratar om (`framAv`), och den udda får en vit ring (16 px) på svaret. Tallriken står tom tills nästa udda kommer och krymper bort när fältet växer i slutet.

## Gnistorna

Per gnista en stor, en mellan och en liten stjärna plus två prickar (`BITAR`), utspridda på en ellips runt det som firas (inte i en rektangels hörn), med egen vinkel och i lite oregelbunden ordning, alltid innanför bild. Stjärnan har en tunn vit kant (stroke 7 på en vit kopia), varmgul fyllning `#FFCF3A` med vaxkorn (`#vaxgnista`, luft runt så att spetsarna inte klipps) och en krämvit mitt (`#FFF4C9`, skala .42). Den poppar mjukt fram, glimtar till en gång (16 %) och tonar ut medan den krymper, totalt 1,5 s. Inga ljusstrålar och inga stora studsar.

## Det som är kvar från provet

De fem slagen per ord, närbilden, frukternas ögon och kinder i kod som blinkar, apelsinen som rullar och ananasen som hoppar med svajande krona, markskuggorna, den persikofärgade fläcken bakom teckningen (den passar ihop med det röda), varm ton och vinjett (.13).

## Ny bokstav

1. Kopiera `produktion/youtube/alfabet/abc-bokstaven/` till en ny mapp och byt render-sökvägarna i huvudkommentaren.
2. Byt `A_ROD`, `A_MORK` och `A_DRAG` (bokstavens drag i ritordning, tjocka och runda, ca 570 × 620 kring (0, 0)). Kontrollera hålet och att inget filter klipper.
3. Byt orden i `SAKER`, replikerna i `TAL` och de udda i rundorna. Malin gör inga ensamma fonetiska ljud: återanvänd tagningar och stretcha vokalen med `stracka.py` (`alfabet.md`).
4. Platshållarna läses i dag från `abc-prov/platshallare/` (`fil()`).

## Kontroll och rendering

- Stillbilder: `node avsnitt/004-bussen-badar/scener/render.mjs <mapp> <t1> <t2> …` (högst ca 12 åt gången, `stills/sheet.jpg`).
- Titta på: fältet in och bokstaven som ritas, varje ord när det blir klistermärke, märkena på väg till tallrikarna, den udda som åker ut i båda rundorna, slutbilden. Leta efter märken som täcker bokstaven, saker som går in över fältets kant, saker utanför bild och klippta kanter.
- Förhandsvisning: `node avsnitt/020-grisen-badar/scener/render.mjs <mapp> --snabb` (960×540, 15 fps, ca 3 min, i bakgrunden).
- Inte gjort än: Lilla Kritans intro och outro, och ingen har lyssnat på blandningen.
