# Kodscener – avsnitt 011 Gula sången v5 (färgsång v2)

Byggt som 013 efter `format/fargsang-v2.md`, från storyboard v5 (`../storyboard-v5/storyboard.md`, godkänd 2026-11-10). Scenerna är SVG-sidor som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).

- `../storyboard-v2/scen-kit.js`: platserna (ängen `angen-v4.png` med bergen och sidoblommorna i plattan, himlen, jättesolen, discot), helikoptern v4 (bubblan, rotorn och stjärtrotorn ritas i kod, glasbubblan kan fällas upp bakåt med `lucka`, helikoptern flyger alltid åt höger), solfiguren (`solFigur`: strålar och kropp ur den målade jättesolen i `_bilder/sol/`, ansiktet i kod), riggarna (laddas live ur varje figurs `uttryck.html` med `verktyg/rigg-motor.js`), sakerna, klistermärkena (helikopter, sol, banan, humla, smörblomma), kameran, kritsvepet, kritirisen och vita kanter (`verktyg/kant.js`). Kitet ligger kvar i `storyboard-v2/`; sidorna pekar ut v5:s tider med `window.STORYBOARD`.
- `film.js`: en `ANIM` per storyboardrad. Tiderna läses ur `../storyboard-v5/storyboard.md` (kolumnen Tid), så en ändrad tid där flyttar bilden. Ekoorden (snurr, hej, mums, ha-ha, surr, vifta) står i `EKO_RAD`, effekterna i `EFFEKTER_FILM`, refrängdansen i `DANS_ROR`, bananernas dans (04f, 07f) i `bananRad` och molnpassagerna upp till solen i `MOLNPASS`. Hörnet uppe till höger (013:s skiva): rörelsen i discot i `ROR_RAD`, ordmärken i `ORD_RAD` (tom: saken syns alltid i bild). Kawaiiögonen är ett eget uttryck (`kawaii`, blandbart med `U(namn, 'jatteglad', 'kawaii', k)`) som kitet lägger till i varje rigg. Introts gula kritsvep (`SVEP`) är det enda kvar; alla andra byten är molnpassager (`MOLNPASS`, riktning upp eller ner). Lages bilder läses ur `_bilder/` + `LAGE_MAPP` i kitet (nu `lage-gul-2/`, gulare kopior; `lage-tunn/` är den förra).
- `<scen>/index.html` sätter `window.SCEN = [första rad, sista rad]` och scenens röster (`ROSTER`).

**Tid:** avsnittstid = sångtid + 23,4 s. Scenens t = 0 är dess första storyboardrad. Sången (`../sang-v5.m4a`) klipps aldrig. Rörelserna är lugna: gungningar och mjuka lyft, ingen slagpuls (den studsiga riktningen avvisades).

| Scen | Rader | Avsnittstid | Innehåll |
|---|---|---|---|
| `kritan-ritar/` | 01a–01c | 0:09.0–0:23.4 | Kritan ritar (papperet fyller bilden) bananens kontur i närbild (ingen knackning), "En banan! En gul banan!", fyllningen, "Nu flyger vi!", hålet i papperet mot ängen |
| `vers1/` | 02a–04f | 0:23.4–1:20.4 | Kritan ritar långsammare (konturen ca 7 s). Lage lite ledsen på ängen, hoppar in, upp i himlen (solen långt borta säger hej), tre lyft, molnpassage till jättesolen, refräng 1 (bananen på molnet, bubblan öppnas, två tuggor, bananerna dansar) |
| `vers2/` | 05a–07f | 1:20.4–2:08.4 | Molnen öppnar sig nedåt, landar på ängen, Lage kliver ut och hittar humlan och smörblomman till fots, hoppar in igen, molnpassage, refräng 2 med Humle |
| `svansen/` | 08a–09b | 2:08.4–2:41.4 | Landar på ängen igen: den gula svansen bland smörblommorna (tittut), Lage hoppar in och de lyfter, molnen öppnar sig mot discot, Lage hoppar ut |
| `discot/` | 10a–11g | 2:41.4–3:43.5 | Två dansvarv (Lage, Kanel, Hugo; Humle är inte med), frågeleken med klistermärkena i bågen, den långa skrattkroken |
| `slutet/` | 12a–12b | 3:43.5–3:56.6 | Helikoptern hämtar Lage, Kanel och Hugo vinkar, hem mot solen, kameran glider in i solskenet mot Lage, kritirisen sluter sig långsamt, svart |

## Köra
```bash
node render.mjs vers1 1 5 9.5             # stillbilder → vers1/stills/sheet.jpg
node render.mjs vers1 --snabb             # förhandsvisning (960×540, 15 fps, samma filnamn)
node render.mjs vers1                     # hela scenen
../film/satt-ihop.sh                      # → ../film/avsnitt-011-grovklipp.mp4
```
Högst två scener renderas samtidigt. v2:s renderingar och kod ligger i `../film/gamla-v2/` och `../film/gamla/v2-kod/`.

## Ljud
- Rösterna (`titta-4` 9,2, `nagot-langt-1` 13,5, `en-banan-en-gul-banan-1` 18,7, slutar 22,4) står i `kritan-ritar/index.html`. "Nu flyger vi!" är borttagen (2026-11-11).
- Effekterna (helikopter-start/-surr/-stannar, moln-puff, mums, surr, glitter, svansvift, ryt-gasp, landa-mjuk, klistra, och från 2026-11-10 swoosh på molnpassagerna, hopp-mjuk på Lages hopp, gung-knarr när bubblan fälls, pling, glitter på kawaiiögonen, fågelkvitter under ängen, plopp när bananerna dansar; ritljudet i introt är `krita-ritar`) ligger lågt under sången. Listan i `film.js` tar första filen som finns.
- Ekoordens tider (`EKO_RAD`) och frågelekens svarsord (`SVAR`) är uppmätta i `sang-v5.m4a` med whisper (`-ml 1 -sow`, två fönster per rad, ca ±0,2 s). Klistermärkena slås upp på svarsordet. Bubblans lucka låter `plopp-1` svagt tills ett lockklick finns.

## Putsrundan 2026-11-11
- Upp från ängen (0:44,4 och 1:43,6, och mellanspelet 2:27,9) är en **obruten uppstigning** (`stigning` i `film.js`): kameran åker upp en bildhöjd, den övre platsen ligger ovanför ängen och tonas mjukt över ängens himmel. Molnpassager finns kvar vid 0:58,1, 1:20,9, 2:08,4 och 3:47,1.
- Kopior för 011 i `_bilder/`: `lage-gul-4/` (långa rötter på svans och ben, `langre_rot.py`), `hugo-011/` (långa armrötter, `--axel`), `helikopter-tunn.png` (`tunn_kant.py 6`). Originalen i `assets/` är orörda.
- Lage: `GLADHOPP` (små glada skutt), lugn viktförskjutning i `visa`, ny `vink` (armen bakom kroppen, snett ut, rund svängning, mjuk in och ut). Svansen är 35 % större i tittuten (`SVANS_S`) och har en mörkgrön skugga bakom tofsen.
- Bananen på molnet kommer redan i 04c/07c (`bananMoln`). Skrattkroken (11g) byter rörelse var fjärde slag. Helikoptern hämtar Lage från 3:41,9 (`HIN`).
- Ritscenen: "Nu flyger vi!" borttagen, kritan har skugga och smulor (`format/ritintro.md` steg 5).

## Putsrunda 2, 2026-11-11
- Uppstigningarna (`stigning`): den övre platsen speglas nedåt och bandet tonas ner till bildens nederkant sista delen, så ängens himmel aldrig syns som en remsa.
- Svanstofsen i `_bilder/lage-gul-4/lage-tail.png` är mörkare och varmare (orangebrun, kritkornen kvar).
- 02a: Lage går över ängen, fastnar i en smörblomstuva (`tuva`), plumsar ner på rumpan, blir ledsen och gnuggar foten (`SNUBBEL`, `PLOPP`).
- 1:28: kameran i 05b–05f tar vid där förra raden slutade (inga klipp). Humle följer `humleAng` till höger om Lage med glipa och syns i smörblomsnärbilden; vid helikoptern är hennes plats `HUMLE_P` ovanför stjärten.
- Bananerna (`bananerna`) kliver in redan i 04d/07d och dansar vidare i 04f/07f.
- Tittuten: blommorna står bakom och till höger om svansen, den höga tuvan är borttagen, kameran går till zoom 4 på svansen.
- Discot: rundare gungning, små skutt och hjärtan (`hjarta`) på de glada slagen (`discoGlad`); 3:27 glider Lage tillbaka från steget fram.

## QA-rundan 2026-11-11 (inga byten på en ruta)
- Uppstigningarna (`stigning`, 02e, 06b, 09a) är riktiga åkningar: ängen på 0–1080, den övre platsen ovanför, ett fast övergångsband (`BAND` 420 px) där himlarna går i varandra, kameran åker 1080 + `BAND`. Första rutan är bara ängen, sista bara den övre platsen. 02d:s kamera glider till helbild inför 02e, och molnen glider lika fort (`TID * 60`) in i 03a.
- Molnpassagerna börjar och slutar helt utanför bild (`molnPassage`, `molnTopp`). Den sista (3:47) är kort, så att solen syns på "Hej då".
- Floden i jättesolen (`jattesol` i kitet) växer jämnt och färgen glider från orange till ljusgul (04f/07f, 1 s).
- Rotorn följer med bubblan när den fälls upp (Sanna). Lage reser sig lite i bubblan när han vinkar (02e, 12b).
- Bananraden ligger 80 px högre, ritkameran i introt är mindre nära, den ritade bananen tonas ut i hålet.
- Discot: varv 1 är en obruten åkning Lage → Kanel → Hugo (`VARV1`), skrattkroken blandas mjukt in i 'glad' vid `KROK_SLUT`, märkena i mitten lägre (`MITT`).
- `../film/satt-ihop.sh`: scenernas effekter +8 dB (inte ritscenen med rösterna) och en limiter på −1 dBFS. Förra klippet ligger i `../film/gamla-v5l/`.
- Lages fall i introt (02a/02b): tydlig snubbling med armarna ut, dammpuff, stilla stund, darrande läpp och en tår ritad i kod (`taren`, bara 011).
- Smörblomman (05e/05f): Humle bär den i en mjuk båge till hakan, Lage blir förvånad, sedan fnissig med ett litet skutt.
- Bananerna pratar inte längre: glada ögon och leende, bara dans.
- Gungan (10d/10i): `gungaPo`, lugn gungning kring fötterna i takt, armar och öron släpar efter.
- Hjärtana är gula och guld med vit kant.
- Slutscenen: helikoptern landar längre till vänster (`HEM` x 350, s 0.45), Lage kliver undan (`LAGE_KLIV`) och hoppar in bakom kanten (`lageHoppa` byter till kabinlagret så fort han är på väg ner).

### QA-runda 2 (2026-11-11)
- 05c/05d: kamerans y begränsas med `CY05` så att den aldrig når plattans kant (stoppet vid 1:27.65).
- `molnPassage`: det långa molnet speglas så att den raka kanten aldrig syns.
- Lages svansrot: `svansIn` flyttar svansen in under kroppen (bara i 011).
- Stigningen (06b/09a) är en riktig kameraåkning uppåt genom en molnbank (`stigning`, `MOLNBANK`); Humle hålls under bildkanten med `humleUnder`.
- Floden (04f/07f) tonar in över ca 1,7 s i stället för att byta på klippet.
- 11g: armarna blandas över 0,6–0,7 s.
- 02a: munnen byter via `munByte`, aldrig två munnar samtidigt; fallet glider in från 0:27 med större zoom.
- Vinkningarna (02e, 12b): armen 70°, ut över luckans kant.
- 08a/08b: bild på svanstofsen bland blommorna (`TOFSBILD`), tofsen stor på "svans".
- Bananerna i d-raderna lyfts 120 px och flyttas 90 px.
- Rotorn förkortas när luckan är öppen. Landningspuffar är gräs och krittussar.
- Ritscenen: konturen tonar bort på 0,4 s när fyllningen börjar.
- Effekterna +17 dB i `film/satt-ihop.sh`.
- Helikoptern v4 (2026-11-11): `_bilder/helikopter-v4-tunn.png` ur `helikopter-gul-v4.png`, med stjärtrotorn borttagen, `tunn_kant.py 6` och rent vitt mellan medarna (tunn_kant fyller annars hålet med grått). `KAR`/`KAR_ORG` i `scen-kit.js` pekar på v4, och framsidan är en mask på samma bild. v3-kopiorna finns kvar.
- Svansen (`window.lageSvans` i film.js, anropas i `visa()`):
  - lugn vägning ±4° efter kroppen;
  - släp och efterföljning i skutten (`GLADHOPP`);
  - hänger ner (+30°) och ligger still när han är ledsen efter fallet, lyfts när han blir glad i 02c.
- Svansviftningarna i närbilden:
  - 08b: stort vift på "svans";
  - 08c: två mjuka slag per "vifta" på ekotiderna (2:22,5 och 2:23,05), lite uppåt så att tofsen aldrig gömmer sig bakom kroppen.
- Gunga (`gungaPo`, 10d och 10i): vikten flyttas från fot till fot – den lediga foten lyfts 26 px och svänger ut 12° – och öronen svänger ±16° med en liten efterknyck.

### QA-runda 3 (2026-11-11, Sannas tre noter på klippet 16:31)
- Ritintrot:
  - kritans `skrrt`-skak (17 Hz, ±1,6°) är borttaget; spetsen glider jämnt längs konturen med en långsam lutning (40° ± 2°, 1,3 rad/s);
  - kritan ligger utanför boil-lagret (`pynt`), så den darrar inte;
  - kameran följer medlet av spetsen 0,2–1,0 s bakåt (10 prov) i stället för ett prov 0,25 s bakåt;
  - draget är oförändrat 9,6–17,0 s.
- Stenen (`STEN`, `_bilder/sten-011.png`, skogens sten nerskalad till 300 px hög med `tunn_kant.py 9`):
  - ersätter smörblomstuvan vid vänsterfoten (x 1218, 58 px hög), med kritstrån framför;
  - vickar när foten tar i, med ett mjukt `duns-3` vid snubblet.
- Boil-filtrets ruta är större (`scen-kit.js`). Stigningen ritar himlen upp till y −2160, och den gamla rutan (y från −2000) klippte strålarna och skenet med en rak kant upptill vid 0:47.

### QA-runda 4 (2026-11-11, bananen på molnet och Humle)
- Bananen på molnet (04c/07c, `bananMoln`): växer upp ur molnet på 0,9 s med ease in-out (opacitet, 45 px uppåt, skala 0,3 → 1), och sätter sig sedan mjukt (9 px dämpad gungning). Inga hopp mellan rutor.
- Humles flygning (`humleFlyger`, `HUMLE_ANG`):
  - en obruten Catmull-Rom-kurva genom tidsnycklar, med gungning (ca en halv kroppshöjd, 1,2 Hz), riktningspose efter farten och lutning högst ±10°;
  - vingarna fladdrar bildlåst (`humleVinge`);
  - en glädjeögla (88,6 s), och hon blinkar, kisar och viftar med antennerna.
- Entrén vid 1:27 kommer från högra kanten, och Lage följer henne med blicken.
- Smörblomman står nu till höger om Lage (`BLOMMA_X0` 1430, förut 1090). Humle doppar sig vid den, puttar till den och drar sig tillbaka åt höger, så hon flyger aldrig förbi hans ansikte.
- 06a: Humle tar en låg båge till sin plats höger om nosen (`HUMLE_R`).
- 06b: Humle flyger under helikoptern till vänster om stjärten (`HUMLE_P` [−300, 100]), aldrig över rotorn.
- 07b: Humles cirkel runt helikoptern går på djupet (`humleRunt`):
  - framför helikoptern nertill under medarna, bakom den upptill;
  - lagret byts bara ute vid sidorna, storleken följer djupet mjukt;
  - hon hålls minst en kroppshöjd under överkanten (`topp`).
- 09a/09b: Humle eskorterar på sin plats (`ESKORT`) till höger om rotorspetsen, med glipa. Sedan svänger hon av i en båge upp och ut åt höger.
