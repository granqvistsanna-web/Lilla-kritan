# Scener – avsnitt 005 Rosa sången

Kodscener (HTML + SVG) som renderas till film, med samma kit som 003 och 004 (`kit.js` och `render.mjs` är kopierade från 004; hela API:t står i `../../003-bussen-halsar-pa/scener/README.md`). Tiderna läses ur `../rader.txt` och SHOTS/REFRÄNG_TID i `../storyboard/bygg.py` (`kit.manus()`, avsnittstid = sångtid + 11 s), så en omtajmad storyboard slår igenom vid nästa rendering.

| Scen | Mapp | Storyboard | Avsnittstid | Sångtid |
|---|---|---|---|---|
| Intro | `../intro/` | 01 | 0:00–0:11 | – (jingeln) |
| Kritan ritar | `kritan-ritar/` | 02–03 | 0:11.0–0:30.4 | 0:00–0:19.4 |
| Vägen 1 | `vagen-1/` | 03a–05f (vers 1, refräng 1) | 0:30.4–1:11.6 | 0:19.4–1:00.6 |
| Vägen 2 | `vagen-2/` | 06–09f (blommorna, ballongen, frågan, refräng 2) | 1:11.6–1:59.0 | 1:00.6–1:48.0 |
| Kiosken | `kiosken/` | 10–14e (kritsvep, glassen, vers 2) | 1:59.0–2:23.3 | 1:48.0–2:12.3 |
| Discot | `discot/` | 14f–17 (danspausen, sista refrängen, hej då, zoom ut) | 2:23.3–3:07.1 | 2:12.3–2:54.1, sedan tyst |
| Outro | – | 18 | 3:07.1–3:17.1 | saknas: ingen outrofil i `assets/format/` |

Raka klipp mellan scenerna och bilderna, utom kritsvepen in i refrängerna i vägen 1 och 2. Bild 10 är inget kritsvep längre: där öppnar sig de rosa molnen över kiosken (se `kiosken/README.md`). Ingen text i bild.

## Ändrat för 005

- **Duken är storyboardens mått, 1376 × 768** (viewBox). Alla konstanter i `bygg.py` gäller rakt av i scenerna. `render.mjs` renderar ändå 1920 × 1080, 30 fps.
- **Takten:** ca 107,6 bpm, `kit.BEAT = 0.5578`, `kit.BEAT0 = 0.409` (sångtid), uppmätt med librosa över hela `sang.m4a`. Raderna i `rader.txt` är där rösten börjar och ligger inte alltid på slaget.
- `kit.manus()` läser tiondelar (`0:11.0–0:17.3`) och refrängernas bilder ur REFRÄNG_TID (`M.bild('05a')`).
- `kit.FIGURER`: musen Mille med ritade lemmar (`musen-mille-rigg-lemmar.json`) och Dinon Disa. Musens armvinklar som i bygg.py: `kit.mot`, `kit.musHand`.

## Art direction v2 (2026-11-08)

- **Vägen** (vägen 1 och 2, `kit.vagsak` och `kit.vagstreck`): lövträden är v2-granen (`skogen-gron-saker/gran.png`, 1,5 × högre i `vagen-1`), förgrunden har v2-svampen, stenen, stocken och grästuvor (`stiltest-premium/cut/egen/gras.png`) i ett eget kameralager framför bilen (`mitt.fram`, gömt i refrängerna), som i 007. Den rosa busken och ballongen är kvar (finns inte i v2). Plattan `lager/vagen-slat.png`, kiosken, discot, glassberget och refrängens himmel är kvar i v1 (ingen v2-version finns).

**Figurerna** (Sanna: "update rosa sång to v2 too" (som 007). Mille, Gurra och Kanel är v2-riggarna; humlan och fjärilen har ingen v2-rigg än och är kvar i v1 (kit.figur + `ansikten.js`).

- `v2-riggar.js` är genererad av `gor-v2.py` ur varje figurs `assets/karaktarer/<mapp>/premium/uttryck.html` (kör om när en sådan ändras). `v2.js` (kopia av 007:s) ger `v2.figur(slug, parent, opt, armar)` samma API som kit.figur (synkron här; `framSida: 'rl'` visar armkopian för framför kroppen).
- `bilen.js`: Mille i bilen är v2 (kropp utan ben och svans, armarna bakom och framför i egna kopior). Vinkel-API:t är kvar (`arm_r`/`arm_l` 0 ner, 90 ut, 180 upp, `'kant'`, `kit.mot`, `fram`, `glass`, `lyft`, `rot`): en vinkel blir en punkt från v2-axeln som armen riktas mot. Armar som är uppe sträcks 1,25 i bilen. Ratten är v2-ratten (`stiltest-premium/bil/cut/ratt.png`, `RATT_MITT`/`RATT_R`) närmare fronten (Sanna valde skiss E ur `_test/ratt/`), och bara tassen mot fronten håller den (`HALL = 'r'`, magen-posen `GREPP`); den andra armen hänger bakom kroppen (Sanna: "looks like there is an extra arm"). Vinkar den främre tassen håller ingen ratten. `bilen.musen()` är v2-Mille med benen; `bilen.hand(s, vinkel)` ger tassen (v2-armarna är kortare än v1:s). `mp.mums` = tuggansiktet ur v2-uttrycken (kiosken).
- **Bilen är v2** (Sanna valde take 2 ur Google Flow): `assets/rekvisita/rosa-bilen/v2/cut/rosa-bil-v2.png` (ratten borttagen, egen vit kant 7 px, mått i `v2/README.md`), lagd i v1-bilens 1024-ruta (skala `BK` = 0,891, bredden x 67–958 och underkanten y 850 som förut), så scenernas `h`, `bbox`, `MUS_X`/`MUS_Y`/`MUS_K` och `musPunkt` är oförändrade. Hela bilden ligger bakom Mille, sidan under sätets gräddvita nederkant (`FRAM_Y`) och fronten (`HUV_X`) en gång till framför henne, hjulen är klippta kopior som snurrar med `dist`, avgasröret finns i bilden (puffarna ur `ROR`). Borta: den egna kantfiltret, de rosa fyllmaskerna, `rosa-bilen-kaross/kant/hjul` och konturen (`kontur: true` gör inget; ingen scen satte `p.kontur`, så inget syns annorlunda). `lager/bil-kontur.png` används inte längre.
- `kiosken/`: grodan i luckan är `v2.figur('grodan-gurra')`; GPIV/GSPETS är v2-axlarna. `discot/`: kaninen och grodan är v2 (armarna mot `peka` med v2.js r/l, tassarna på bröstet och grodans klapp är magen-posen med `klapp`).
- **Discot** (Sanna valde take 2 ur Google Flow): `lager/disco.png` är `assets/bakgrunder/danspaus/v2/cut/disco-v2.png`, en hallonrosa tapet med små noter, hjärtan och stjärnor och ett vitt golv, horisonten flyttad till y 560 (`lager/gor-lager.py`). Det rosa rutgolvet och sockeln i kod är borttagna ur `discot/index.html`; kulan, ljuskäglorna, fläckarna och rutorna som lyser (`discoljus.js`) ligger kvar ovanpå. Tagningarna i `danspaus/v2/original/`.
- **Refrängen, glassberget och sakerna vid vägen** (Sanna: "need new improved assets", tagningar ur Google Flow, valda 2026-11-08): `assets/rekvisita/refrang-v2/cut/` (originalen och kontaktarket i `original/`, kontroll i `kontroll-005.jpg`). Glassberget (tagning 14) är en bild som ersätter plattan, strutens kod, dropparna och strösslet (`GBV2` i `refrang.js`: kulans topp på y 285, spetsen på 1490); i 15e står musen ovanpå kulan (inget topplager). Luftballongen (11) ersätter stand-in-ballongen, flaggan (2) har `FLAGGA.fil`, bubblans ballong och glass är v2-bilderna. Ballongen (8) i vägen 2 och rosenbusken i vägen 1 (`kit.VAGSAKER['buske-rosa']`) och 2. Kanten finns i bilderna (ingen `kant.lagg`). Kvar i kod: kullen, hjärtat och blomman i bubblan.
- **Humlan i v2** (2026-11-08): ny v2-rigg i `assets/karaktarer/humlan-humle/premium/` (Flow, se `karaktarer/humlan-humle.md`), med i `gor-v2.py` och en v2-figur i `discot/index.html` som kaninen och grodan. De kodritade v1-lemmarna (`LEMMAR`) är borttagna; vingarna surrar med posens `vinge`.
- **Fia i v2** (2026-11-08, "use fia v2"): `vagen-1` använder v2-Fia (`v2.figur('fjarilen-fia')`, h 120) som flaxar med arkets `rorelse: ['flaxa', t]` och lutar i flygriktningen. Varvet runt Milles huvud ligger 70 px lägre än förut, så att kamerans 'bil'-zoom visar henne. `gor-v2.py` har 007:s vinghantering (vingarnas rötter som axlar, ROR och mjuk i exporten) och `v2.js` har `rorelse`/`rorTid` från 007.
- **Kiosken och glassarna** (Sanna: "need new improved assets", "more polished and slight more depth", Google Flow 2026-11-08): `lager/gor-lager.py` gör `kiosk-ra.png`, `kiosk-topp.png` och `disk.png` ur den polerade v2-kiosken `assets/bakgrunder/glasskiosken/v2/glasskiosken-v2.png` (samma komposition som v1, så kameran, luckan och disken står kvar). Glassarna i `bilen.GLASS` (rosa, gul, grön, berg, tom strut) är `assets/rekvisita/glass-v2/cut/`, gjorda av `gor-glass.py` ur Flow-tagningen med lite djup i kod och lagda i v1-rutorna (431 × 743, berget 434 × 940), så scenerna är oförändrade. Kritklicken på golvet (`lager/klick.png`) är kvar i v1.
- Kvar i v1: skelögd och nosandet i 08a (v2 har en gemensam blick), musikonen i discots ikonrad.
- Provbänk: `_test/v2/` (`node render.mjs _test/v2 0.5 1.5 2.5 3.5 4.5 5.5`). Filmerna är inte omrenderade än.

## Gemensamma filer

| Fil | Vad |
|---|---|
| `kit.js` | Kitet (se ovan). |
| `ansikten.js` | Kodansiktena med storyboardens humör, och musens rosa nos. |
| `bilen.js` | Rosa bilen med musen i, som `bilen()` i bygg.py: kaross, musen, kant, armarna framför, hjulen. Armarna som vinkel eller `'kant'` (standard): i bilen håller båda tassarna en ratt i kod framifrån (klockan 10 och 2, nedre halvan bakom kanten); en arm uppe (pekar, vinkar, glass) betyder att den tassen släpper ratten och den andra ligger kvar, båda uppe eller `lyft > 0` döljer ratten (Sanna, 2026-11-04: de böjda armarna såg konstiga ut; `'styra'` betyder samma sak); glass i tassen; vit kant och mörkrosa kontur per bildruta. `bilen.musen()` är musen på egna ben. |
| `refrang.js` | Refrängdansen (a–f) med rosa blixtar, mönstret av möss och glassberget med flaggan. Vägen 1 och 2 använder hela, discot glassberget (15e). |
| `lager/gor-lager.py` | Tar ut lagren som storyboarden räknar fram (blå kiosken, blixtplåtarna, discot med ljusprickar, glassdelarna, bilens kontur) som PNG i `lager/`. Kör om när bygg.py ändras; PNG:erna checkas inte in. |
| `render.mjs` | Renderar en scen (oförändrad från 004). |
| `_test/` | En liten testsida för riggen och refrängen 05. |

## Rendera

```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py   # en gång, och när bygg.py ändras
node render.mjs vagen-1                    # hela scenen → vagen-1/vagen-1.mp4, med sångbiten och vagen-1-effekter.wav
node render.mjs vagen-1 2 30 45            # stillbilder → stills/<t>.jpg + stills/sheet.jpg
node render.mjs vagen-1 --fran 40 --till 50
```

Filmer, stills och lager-PNG:erna checkas inte in.

För att titta: `~/Downloads/005 Rosa sången – klipp/` har länkar till introt och varje scens mp4, numrerade i avsnittets ordning (01 intro … 06 discot). Länkarna pekar på filerna här, så en ny rendering syns där direkt.

## Engelska versionen (The Pink Song)

Samma scener, tajmade om till den engelska tagningen `../en/sang.m4a` (3:36.0). Scenerna räknar fortfarande i den svenska tagningens tider; `kit.kor()` gör om dem när sidan öppnas med `?en`:
en styckvis linjär karta svensk sångtid → engelsk sångtid ur paren i `../en/rader.txt` (varje rad har sin svenska tid `[sv M:SS.s]`). Bilden går fortare eller långsammare mellan raderna, ljudeffekterna flyttas med, sångbiten tas ur `en/sang.m4a`. Utan `?en` är allt som förut.

```bash
node render.mjs vagen-1 --en               # → vagen-1/vagen-1-en.mp4 och vagen-1-en-effekter.wav
node render.mjs vagen-1 --en 8.7 27.8      # stillbilder → vagen-1/stills-en/
../film/satt-ihop.sh en                    # → ../film/avsnitt-005-en.mp4 (efter alla fem scenerna med --en)
```

Ändra en tid: rätta raden i `../en/rader.txt` och rendera om. Engelska scenstarter (sångtid): kritan ritar 0:00, vägen 1 0:30.0, vägen 2 1:15.8, kiosken 2:10.1, discot 2:38.6; discot slutar 3:24.4 och sången tonas ut där (resten av instrumentalen till 3:36 används inte).
Kvar på svenska: introts titel och jingel (samma intro som den svenska filmen). `discot/sang-tyst.json` gäller den svenska tagningen, så de "tysta" effekterna i discot kan hamna på sång i den engelska.

## Ljud

`kit.ljud(namn, t)` som i 004. Effekterna per scen står i varje scens README. Saknas och är tysta tills de finns i `assets/ljud/effekter/`: **plopp** (flaggan på glassberget, `pop` ligger där så länge), **dunk** (dinon stampar), **klapp**.

## Det som saknas

- **Outrot (18):** ingen outrofil i `assets/format/`. 004 hade inget outro; 003 slutade med logotypen i C.
- **Grodans blå fluga** finns inte i utklippen (står i `bildlista.md`), så grodan är utan den.
- Replikerna i kioskluckan ("Hej, grodan!", "Rosa, tack!" …) och "Pip pip!" är inte inspelade; munnen rör sig på gissade tider.
