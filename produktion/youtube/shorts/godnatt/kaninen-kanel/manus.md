# Godnattsagan: Kaninen Kanel

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Texterna och inläsningen står i [`../inlasning.md`](../inlasning.md); texten i bild är samma ord som inläsningen, utan taggarna.

- **Figur:** Kaninen Kanel (✅ referensark). Stående: den bruna versionen utan ansikte, `assets/karaktarer/kaninen-kanel/cut/kanel-faceless.png` (inte den rosa i `v2/`, inte de gamla rosa vyerna). Liggande: `assets/karaktarer/kaninen-kanel/ligger/kaninen-kanel-ligger.png`.
- **Plats:** [Äppelträdet på natten](../../../../../bakgrunder/appeltradet-natt.md): `assets/bakgrunder/appeltradet-natt/appeltradet-natt.png` (9:16), med månen högt upp till vänster. Kanel står till vänster om trädet (fötterna på x 340, y 1490), så att hon inte syns i närbilderna på trädet.
- **Godnatt-målen:** månen (`assets/bakgrunder/appeltradet-natt/mane.png`, nattkullens måne med jämn kant), äppelträdet (kronan) och äpplena i trädet. Ansiktena ritas i kod.
- **Saker:** mjölkglas, potta, kudde och nallen (`rekvisita/nalle.md`). **Tillfälligt:** glaset, pottan och kudden är enkla former i kod, och nallen är v10 sedd från sidan (`tillfalligt/nalle-v10.png`, med jämn kant), tills bilderna från Google Flow finns.
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2,5 min

Godnatt-rutinen under äppelträdet: mjölk, potta, godnatt till månen, trädet och äpplena, ett jättelitet hopp och en gäspning, ner på kudden med nallen, tungt och mjukt, andas och sova. Sagan blir tystare för varje sida, och berättaren pratar direkt till barnet.

## Sidorna

I bild står högst två rader åt gången. `//` betyder att de två första raderna tonas ut och nästa par tonas in, ungefär när Malin kommer dit (efter andelen tecken tills inläsningen finns, sedan efter inläsningens längd).

| # | Text i bild | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll under äppelträdet. / Kaninen är sömnig. // Är du också sömnig? | Kaninen andas | – |
| 2 | Kaninen dricker sin mjölk. / Mmm, god mjölk. | Mjölkglaset glider till munnen, mjölken sjunker, munnen rör sig, glaset glider ut | `slurp` |
| 3 | Sen pottan. / Sådär, bra! | Pottan glider in framför underkroppen och hon sjunker ner så att hon sitter, sedan glider pottan ut | `glid` |
| 4 | Godnatt, måne. | **Delad bild:** närbild på månen överst, kaninens ansikte nederst. Månen lyser upp och vaknar, kaninens mun rör sig med repliken. Sedan säger hon själv godnatt med en liten studs | `glimt`, sedan `duns` |
| 5 | Godnatt, äppelträd. | Delad bild: trädet vaknar (ansikte på kronan) och kronan gungar sakta. Kaninen studsar lite | `swoosh`, lågt, sedan `duns` |
| 6 | Godnatt, äpplen. | Delad bild: äpplena gungar i sina skaft, tre av dem vaknar ett i taget. Kaninen studsar lite. Sedan helbild igen | `ding`, ett per äpple, sedan `duns` |
| 7 | Ett, två, tre … hopp! / Det blev ett jättelitet hopp. // Kaninen gäspar. Gääsp. / Kan du också gäspa? | **Inget riktigt hopp:** en jätteliten studs på stället, fötterna står kvar. Sedan gäspningen: munnen blir ett stort O och ögonen kniper ihop | `duns`, mjukt |
| 8 | Kaninen kryper ner på kudden. / Nallen får sova bredvid. | Kudden kommer, hon lägger sig på den (den stående bilden tonas över i den liggande), nallen glider in och sitter bredvid | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 9 | Öronen blir tunga. Så tunga. / Gräset är mjukt. // Allt är så mjukt. | Hon sjunker några pixlar på "tunga", sedan sväller ett mjukt sken runt månen sakta upp och lägger sig igen | – |
| 10 | Kaninen andas in … och ut. / In … och ut. // Kan du också? | Kaninen andas synligt djupt, ca 5 s per andetag, två varv | – |
| 11 | Månen blundar. / Trädet blundar. // Äpplena blundar. / Nallen blundar. | Månen, trädet, äpplena och nallen sluter ögonen, en i taget, i den ordning de nämns | – |
| 12 | Kaninen blundar. / Nu sover kaninen. // Godnatt, kanin. / Godnatt, du. | Kaninen sluter ögonen, sedan mörknar bilden till svart | musiken tonas ut |

Hela tiden, lugnt: kaninen andas, månen gungar lite, kronan och äpplena gungar svagt när de vaknat, och alla som är vakna blinkar var 5,5 s. Kaninens ögon och mun i 1024-rutan: stående (412, 396), (605, 401) och (510, 458), fötterna på (521, 925); liggande (420, 598), (604, 598) och (512, 670), fötterna på (512, 862). Nallens ögon (575, 255) och (655, 248) i `nalle-v10.png`: prickögon med vit ring (nallen är för mörk för bara svarta prickar).

Kanels godnatt-ljud är ett mjukt `duns` (hennes hoppljud, `assets/ljud/effekter/duns/`). Ljudet är inte en röst, så munnen är stängd under det. Hon studsar till på stället i stället.

## Inläsningen

Se [`../inlasning.md`](../inlasning.md): Eleven v3 med taggarna, en tagning per sida (`sida-1.m4a` … `sida-12.m4a`), lite långsammare och mjukare för varje sida. Sida 11 och 12 står inläsningen + 5 s, de andra + 4 s.

## Delad bild

Överst det kaninen säger godnatt till, nederst kaninens ansikte. Närbilden på kaninen är på zoom 1,5 med ansiktet (ögonen och munnen) på y 1380, mitt i nedre halvan men ovanför YouTube-zonen: hela huvudet med öronen syns, och munnen syns tydligt. Skarven är en jämn krämvit linje, 8 px.

## Vita kanter

Enligt skill `vita-kanter`: kant = 3 px + 1 % av sakens höjd i bild, via `verktyg/kant.js` på alla urklipp (kaninen i båda poserna, månen, nallen, glaset, pottan, kudden). Bilderna har 1 % inbakat; kant.js lägger på grunden. Sakerna som är ritade i kod får hela regeln i kod. Plattan, kronan och äpplena får ingen kant (de är målade i bakgrunden).

Månen, nallen och den liggande kaninen hade för tjocka eller ojämna inbakade kanter (månen också en lös kritsmula). `ny-kant.py` i den här mappen tar bort den gamla kanten och bakar in en jämn på 1 %: `python3 produktion/youtube/shorts/godnatt/kaninen-kanel/ny-kant.py <in.png> <ut.png>`. Delade filer (nattkullens måne, nallen i `assets/rekvisita/`) är orörda; de rättade kopiorna ligger i `assets/bakgrunder/appeltradet-natt/mane.png` och `tillfalligt/nalle-v10.png`. Kör den också på de nya bilderna (glas, potta, kudde, nallen framifrån) om deras kant blir ojämn.

## Platsen i koden

`PLATTA` i `index.html` håller kronans, äpplenas och trädansiktets punkter i bildens egna pixlar (768×1376, uppmätta, se `bakgrunder/appeltradet-natt.md`). Kronan och äpplena är klippta ur bilden som egna lager så att de kan gunga. Kronan går ut över bildens högra kant, så närbilderna på trädet och äpplena stannar till vänster om x 740 (`kant`).

## När bilderna från Google Flow finns

- **Mjölkglaset, pottan, kudden:** byt formerna i `glas`, `potta` och `kudde` mot `img(...)`, och flytta `class="klistermarke"` (utan `ritad`) till gruppen runt bilden. Mjölken som sjunker kan ligga kvar som en vit rektangel inklippt i glaset, eller tas bort om glaset har mjölk i bilden. Placeringen står i `GLAS`, `POTTA` och `KUDDE`.
- **Nallen framifrån:** byt `NALLE.fil`, mät `konst` (mellan fötterna) och ögonen, och kolla storleken `s` mot kaninen.

## Att tänka på

- Kaninen vänds aldrig och snurrar inte. Hon står still, vänd mot tittaren, hela filmen.
- Inga hopp (formatet): studsen på sida 7 är en liten fjädring på stället, fötterna lämnar aldrig marken.
- Tiderna på sidorna, som del av sidan (0 → 1) i `index.html`, flyttas till orden när inläsningen finns: `MJOLK`, `POTT`, `HOPP`, `GASP`, `NALLEN`, `TUNGA` och `SOMNAR`. Andningen på sida 10 går 5 s per andetag från 1 s in på sidan.
- Gräset täcker nedre delen av bilden, så inget viktigt hamnar under 75 % av höjden.
- Nämn inga befintliga böcker eller serier i filerna eller i YouTube-texten.

## YouTube

- **Titel:** Godnatt, kanin 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`, stycken om högst två rader) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR` och läses av talsyntesen i förhandsvisningen; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter; sida 11–12 + 5 s), och allt räknas om av sig självt.

- Munnen: `mun.json` räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/kaninen-kanel/mun.py produktion/youtube/shorts/godnatt/kaninen-kanel` (ljudstyrkan, 30 värden per sekund, behöver ffmpeg). Kör om den när sidorna läses in på nytt. Den är tom (`{}`) tills inläsningen finns.
- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/kaninen-kanel/`.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/kaninen-kanel --staende` → `kaninen-kanel-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 3 8 14.7 25 33 51 67.4 81 92 127 133` → `stills-staende/sheet.jpg`.
