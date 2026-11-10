# Kodscener – avsnitt 016 Blinka lilla stjärna

Samma upplägg som 015: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna och måtten kommer ur `../storyboard/bygg.py`; `lager/gor-lager.py` skriver dem till `lager/matt.json`, som `kit.manus()` och `natt.js` läser.
Sången (`../sang.m4a`, 2:30.0) klipps aldrig: **avsnittstid = sångtid + 11 s** (introt), hela vägen. Scenens tid 0 = sångtiden `sang[0]` i `kit.kor()`.
Kamerans drift och figurernas andning räknas i **sångtid** (kit.js 016), så skarvarna mellan scenerna hoppar inte.

| Scen | Storyboard | Sångtid | Avsnittstid | Status |
|---|---|---|---|---|
| `../intro/` | 00 (Kort i himlen, Avsnitt 16 · Blinka lilla stjärna, guld `#E0A21C`; `intro-med-jingel.mp4`) | – | 0:00–0:11 | 🟡 `--snabb` |
| `kritan-ritar/` | 01–02 | 0:00–0:11.0 | 0:11–0:22 | 🟡 `--snabb`, väntar på Sanna (se `NOTER.md`) |
| `kullen/` | 03–04 | 0:11.0–0:24.0 | 0:22–0:35 | 🟡 `--snabb`, väntar på Sanna (se `NOTER.md`) |
| `vers-1/` | 05–10 | 0:24.0–0:57.5 | 0:35–1:08.5 | 🟡 `--snabb`, väntar på Sanna (se `NOTER.md`) |
| `mellanspel/` | 11–15 | 0:57.5–1:24.0 | 1:08.5–1:35 | 🟡 `--snabb`, väntar på Sanna (se `NOTER.md`) |
| `vers-2/` | 16–21 | 1:24.0–1:56.4 | 1:35–2:07.4 | 🟡 `--snabb`, väntar på Sanna (se `NOTER.md`) |
| `slutet/` | 22–23 | 1:56.4–2:30.0 | 2:07.4–2:41 | 🟡 `--snabb`, väntar på Sanna (se `NOTER.md`) |

Läs alltid tiderna med `M.bild('06')` (avsnittstid; sångtid = avsnittstid − `M.av`) och `M.rad('diamant')` (sångtid, ur `../rader.txt`), skriv inte in dem.

## Filer
- `kit.js`: 015:s kit (duk, kamera, utsnitt, figur, hopp, vagga, blink, prat, manus, ljud, kor, mjukaKlipp). `FIGURER` har bara `lejonet-lage`
  (riggen med ritade armar, h 230 = `LAGE_K`). `LJUDFILER` har 0 för ljud som inte finns än (`syrsor`, `gasp`, `sus`, `oj`): de listas men är tysta.
  Nytt: `kit.sang0` (scenens början i sångtid).
- `natt.js`: Nattkullen, himlen, filten, kudden, nallen, Lage och Nicke (API nedan). Allt i samma skala och på samma plats som bygg.py.
- `ansikten.js`, `render.mjs`: kopior av 015:s. `rendera.sh` = render.mjs med högst två renderingar samtidigt (använd den).
- **Vita kanter:** ladda `<script src="../../../../verktyg/kant.js"></script>` direkt efter kit.js (skill `vita-kanter`). natt.js lägger kanten själv.
- `lager/gor-lager.py` → `lager/matt.json`, `lager/filt-lila.png` (lila rutor `#968CC8`, Sanna 2026-11-07), `lager/nicke.png` (med det svarta huvudet), `lager/korn.png`.
- `_test/natt/`: provbänk för natt.js (6 stillbilder: 07, 06, 04, 17, 22, 05).

### matt.json (ur bygg.py)
`KULLE` (kullens kant, `natt.kulle(x)`), `STJ` [x, underkant, höjd] = [1085, 150, 92], `MAN` [215, 170, 190], `SMA` (de små stjärnorna),
`FILT_X/FILT_Y` 700/548, `LAGE_K`/`NICKE_K`/`NICKE_SOVER_K` (en skala per figur, samma stående och liggande), `LAGE_X`/`NICKE_X` 640/790 (stående),
`LIGG_LAGE_X`/`LIGG_NICKE_X` 650/822 (liggande på filten), `KAMERA` = `hel`, `tva` [705, 420, 640], `stj` [1085, 104, 420], `nicke` [760, 450, 400],
`lage` [640, 380, 470], `lage13` [640, 400, 470], `bilder` (avsnittstid per bild), `SLAG` (takten ca 80,7 bpm, slag 0,745 s, en takt ca 3 s), `GUL` #F6E7A8.

## natt.js
```js
const N = await natt.scen(), M = N.M, m = N.m;      // kit.duk med Nattkullen 16:9 och allt nedan
N.stjarna.pose({ glans: 0..1, k: 1, rot: 0,         // glans: +12 % och sken bakom; k = extra skala runt mitten (tindra); N.stjarna.mitt() = [x, y]
  humor, titt, tittY, blink, m, ansikte });         // ansiktet (Sanna 2026-11-07): glad · blinkar/skrattar (^ ^) · sleep/njuter; natt.stjarnAnsikte() = markupen
N.dans.pose((i, [x, y, h]) => ({ opacity, k, dy, rot }));   // 26 dansstjärnor (mellanspelet), vänster → höger, dolda med N.dans.pose()
N.glimt(0..5).pose({ x, y, r, rot, opacity });       // fyruddiga glimtar i kod (krämgula, vit kant); opacity 0 = dold
N.sma.pose(i => 0..1);                               // de små stjärnorna, opacity per stjärna
N.mane.pose({ sken: 0..1 });                         // månen lyser upp (svansen)
N.moln.pose({ x, y, h: 135, synlig });               // molnet: x mitt, y underkant (standard STJ[1] + 30); dolt från början
N.filt.pose({ x, y, h, sx, sy, rot });               // standard: på kullens topp (place-värden ur bygg.py)
N.kudde.pose({ x, y, h, rot, synlig });              // standard: bakom lejonets huvud, synlig (synlig: false döljer)
N.nalle.pose({ x, y, h, rot });                      // standard: till vänster på filten
N.lage.pose({ x, y, ligger, sitter: 0..1, humor, titt, tittY, blink, m, armL, armR, tilt, sx, sy, delar, synlig, opacity, andas });
//   stående: y standard natt.kulle(x) + 14; armR 35 / armL −35 = vila (bygg.py-grader); N.lage.pekVinkel([x, y]) = armR mot en punkt
//   sitter 1 = hukar ihop (sy 0,86, storyboardens sittpose tills den nya posen finns); ligger: true = liggande bilden (y FILT_Y + 8)
//   blink: blinkar själv var 3–4:e s om blink inte anges (blink: 0 stänger av, 1 = stängt)
N.nicke.pose({ x, y, sover, humor, titt, tittY, blink, m, tilt, sx, sy, synlig, opacity, andas });
//   stående: y standard natt.kulle(x) + 12; sover: true = sovbilden (slutna ögon inbakade), samma storlek
N.lage.punkt([x, y]) / N.nicke.punkt([x, y]);        // en punkt i figurens 1024-ruta → bild
kit.utsnitt(m.KAMERA.tva);                           // kameran som crop_zoom() i bygg.py; kit.mjukaKlipp(render, [t…]) för mjuka byten
```
Humör (ansikten.js): glad skrattar forvanad nyfiken njuter blinkar sleep (+ ropar, karleksfull …). `m` öppnar munnen (skrattar, prat).
Lage: ansiktet `LAGE_ANS` (stående) och `LAGE_LIGG_ANS` (liggande). Nicke har inga armar (ingen rigg): hon hoppar, lutar och vaggar.

## Regler (gäller alla scener)
- **En sak i taget:** stjärnan tindrar i verserna, molnet glider bara i mellanspelet, månen lyser upp bara i svansen. Aldrig två saker som rör sig samtidigt i himlen.
- **Mjukt:** inga hårda hopp i bilden. Kamerabyten inom en scen glider (`kit.mjukaKlipp`, 0,9 s), eller lugna kameraåkningar. Lugnt tempo, det är en vaggvisa.
- **Figurerna snurrar och vänds aldrig** (platta urklipp): lugna hopp, gung, lutning. Inga effektstreck. Glimtarna är små former, inte streck.
- **Ingen text i bilden.** Inga djurnamn i det som sägs (det gäller bara ljud/röst; här finns inga inspelningar än).
- **Repliker utan inspelning:** munnarna rör sig med `kit.prat(t, [[a, b]])` på replikens tid, ljudet är tyst. Berättaren har ingen mun.
- **Sången klipps aldrig.** `kit.kor(render, DUR, { sang: [s0, s1] })` med scenens sångbit.
- **Skarvarna:** första bilden i en scen = sista bilden i scenen före (tillstånden nedan). Stjärnan är `glad`, titt 0, tittY 0 i varje skarv.
- **Klipp (Sanna 2026-11-07: "more cuts"):** närbilder 1,5–2,5 s, högst ett klipp inne i varje sjungen rad, i snitt minst 3 s per bild. Hårda klipp på ord eller slag är okej för de korta närbilderna. Kameran i skarven är exakt `kit.utsnitt(...)` för det läget.
- Ljud: `kit.ljud(namn, scentid, { vol, loop, langd, fade })`. Finns: `pling`, `glimt`, `glitter`, `swoosh`, `skrrrrt-kort`, `skrrrrt-lang`,
  `prassel-tyg`, `steg`, `pop`, `plopp`, `puff`, `fladder`. Tysta platshållare: `syrsor` (loopa lågt i helbilderna), `gasp`, `sus` (molnet), `oj`.

## Skarvarna (tillståndet exakt på gränsen, sångtid)
- **S0 · 0:11.0** (kritan-ritar → kullen): kameran `hel`. Stjärnan på sin plats (`glans` 0), månen `sken` 0, små stjärnor 1, molnet dolt.
  Figurerna utanför bild till vänster (Lage x −160, Nicke x −330). Filten, kudden och nallen bärs in av figurerna i kullen (dolda vid S0: `filt` h 0 eller `synlig: false`).
- **S1 · 0:24.0** (kullen → vers-1): kameran `tva`. Filten på sin standardplats, nallen standard, kudden på filten `{ x: 565, y: FILT_Y − 4, h: 80 }`.
  Lage sitter (`sitter: 1`, x 640, y FILT_Y + 10) `glad` titt 0.4 tittY −0.6, armarna vila. Nicke står vid x 815 (kullen) `glad` titt −0.6.
- **S2 · 0:57.5** (vers-1 → mellanspel): kameran `lage` [640, 380, 470]. Lage sitter som i S1, `skrattar` titt 0.5 tittY −1, m 0.
  Nicke vid 815 `skrattar` titt −0.5 tittY −0.5. Stjärnan `glans` 0, inga glimtar. Molnet dolt.
- **S3 · 1:24.0** (mellanspel → vers-2): kameran `tva`. Lage ligger (`ligger: true`, x LIGG_LAGE_X) `glad` titt 0.5 tittY −1, kudden standard (synlig),
  nallen standard. Nicke står intill vid x LIGG_NICKE_X, y FILT_Y + 8, `glad` titt 0.3 tittY −1. Molnet dolt (har glidit ut till höger). Stjärnan `glans` 0.
- **S4 · 1:56.4** (vers-2 → slutet): kameran `tva`. Lage ligger `sleep` (kudden, nallen standard). Nicke `sover: true`. Månen `sken` 0, stjärnan `glans` 0.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I -W ignore lager/gor-lager.py   # när bygg.py eller assets/ ändras
./rendera.sh _test/natt 0.5 1.5 2.5 3.5 4.5 5.5     # provbänken → _test/natt/stills/sheet.jpg
./rendera.sh vers-1 2 7.5 12                         # stillbilder (scentid) → vers-1/stills/
./rendera.sh vers-1 --snabb                          # förhandsvisning 960 × 540, 15 bilder/s → vers-1/vers-1.mp4 + vers-1-effekter.wav
../film/satt-ihop.sh --snabb                         # grovklippet (huvudsessionen)
```
Förhandsvisa med `--snabb` och stillbilder. Bara huvudsessionen bygger grovklippet, och högst två renderingar samtidigt (`rendera.sh`).

## QA 2026-11-07 (huvudsessionen, grovklippet med alla sex scenerna och introt)
Grovklippet `../film/avsnitt-016-grovklipp.mp4` (`../film/satt-ihop.sh [--snabb]`, 2:41.0) har introt och alla sex scenerna. Skarvarna (bilder ±0,1 s, `_qa/skarvar.jpg`) passar, och översikten finns i `_qa/oversikt.jpg`.
Rättat:
- natt.js: kudden är synlig som standard (`pose({})` dolde den), och `stjarna.pose({ synlig: false })` döljer nu själva stjärnan, inte bara skenet.
- vers-1: stjärnan svarar i 09/10 i en vidare bild (`[830, 345, 1100]` och `[800, 345, 1100]`). Förut skars figurerna av i nedre hörnet.
Kvar att titta på:
- **Lage lägger sig (mellanspel ca 1:22.8):** liggande bilden ser större ut än sittande (huvudet), eftersom båda har samma skala (Sannas "match sizes"). Squashen döljer bytet.
- **Nicke somnar (vers-2 ca 1:48.8):** en övertoning på 0,6 s, och mitt i den syns den stående bilden halvgenomskinlig.
- **Lages mun i skarven vers-1 → mellanspel:** natt.js läser `m: 0` som inget värde, så `skrattar` har öppen mun. Båda scenerna gör likadant, så skarven passar.
- **Röster och ljud:** inga röster är inspelade än (berättaren, *Varsågod/Tack*, *Oj*, gäspningsrepliken, godnatt). `syrsor`, `gasp`, `sus` och `oj` är tysta platshållare (Openverse först).
- **Vers 2:s radtider** (1:29, 1:33.5) är fortfarande uppskattade.

## v2-figurerna (2026-11-09, Sanna: "use v2 characters")
`natt.js` ritar nu hunden (N.lage, sedan 2026-11-10 hunden Hugo i stället för lejonet) och Nicke med v2-riggarna: koden hämtas direkt ur `assets/karaktarer/{lejonet-lage,nyckelpigan-nicke}/premium/uttryck.html`
(som godnattsagornas `v2-rigg.js`), liggande Lage = `premium/cut/lage-ligger.png` med ansiktet i kod, sovande Nicke = `premium/cut/nicke-sover.png`.
Scenernas API är detsamma (humor, titt, armR, sitter, ligger, sover, punkt, pekVinkel); de gamla humörnamnen översätts i `v2ansikte()`
(blinkar = båda ögonen glada bågar, orolig = bryn upp och liten rund mun). Nytt: `N.lage.hand(armR)` (kullen bär filten i den). Nicke har nu armar (i vila).
Gamla natt.js: scratchpad `natt-v1.js` (inte i repot; finns i git).

## Grafikputs (runda 3, Sanna: "improve graphics any way you can")
`natt-puts.js` laddas efter `natt.js` i alla sex scener och gör allt själv (lägger lagren i `natt.scen()`, kör efter scenens render i `kit.kor()`), i sångtid så att skarvarna passar:
- himlen: 40 avlägsna kritprickar som tindrar svagt; de små stjärnorna tindrar lite; månen har ett svagt sken hela tiden
- skenen (månen, stjärnan) har kritkorn i stället för slät gradient
- nattton: kullen och figurerna lite svalare och mörkare (vita kanterna behålls)
- gräs: åtta tuvor längs kullens kant vajar lugnt; tre eldflugor nere vid gräset
- ett stjärnfall, en gång, i vers 2 (sångtid 96,2, `window.STJARNFALL`), en liten stjärna med vit kant och glimtar efter, inget streck; Lage och Nicke tittar upp
- kinder på glada ansikten (`kinder: true` på skrattar och blinkar i `ansikten.js`)
Parallax är inte gjord: närbilderna på stjärnan bygger på exakt utsnitt. QA: `_qa/puts/` (skarvar, översikt, stjärnfall).

## Runda 4 (Sanna: "polish animal faces, worried faces when star goes away, add eyes to teddy, make sure blanket dont fly in air, more dancing stars")
- Ansikten (`ansikten.js`, `natt.js`): pupillerna lite större med en liten glans, tjockare leende, Lages och Nickes ögon och munnar större (Nicke ögon 1,2 ×, mun 1,5 ×). Nytt humör `orolig`: bryn uppåt i mitten, liten rund mun.
- Oro i mellanspelet (67,9 till stjärnan tittar fram 75,4): båda oroliga, ögonen letar sakta mot där stjärnan var, liten lutning ditåt; på frågan tittar Lage oroligt på tittaren. Glädje på "Där är den!".
- Nallen har ögon (`N.nalle.ogon`, ritas av `natt-puts.js` varje bildruta): mörka prickar med ljus ring och glans, blinkar lugnt ibland.
- Filten i kullen: Lage lägger den hopvikta filten på marken och den rullas ut åt höger längs marken (vänsterkanten still, underkanten på marken, krusning bara i ovankanten). Den lämnar aldrig marken; dippar i de andra scenerna skalar från underkanten.
- Dansen: 40 dansstjärnor, tre och tre på åttondelarna; när alla lyser (62,6) går de i små cirklar i takt med en puls som löper åt höger på varje slag. Ekon i verserna (sångtid 32,0, 44,2, 92,0, 104,0, 114,4; `window.EKO`): fem stjärnor över figurerna tänds, gungar och tonas ut på 2,6 s.
QA: `_qa/runda4/` (skarvar, skarvar2, nytt).

## Runda 5 (Sanna: "have starts light up here too 2:11 same as before, move blanket lower down on hill. maybe a cut scene with stars dancing or falling in sky")
- Filten längre ner på kullen: `matt.json` `FILT_Y` 548 → 683 och nytt `STIG_DY` 135. `N.stig(x)` = kullens kant + STIG_DY; figurerna går och står på stigen (natt.js standard, kullen, vers-1, mellanspel), allt på filten följer `FILT_Y`. Kamerorna `tva`, `nicke`, `lage`, `lage13` och de inbyggda utsnitten (kullen `NAR_NICKE`, vers-2 `LAGE_NAR`, `NICKE_NAR`, inglidningen) är flyttade lika mycket. Irisen i slutet: mitt (705, 575), r 180. Filten ligger nu helt på det gröna, under kullens kant. Gamla matt.json: scratchpad `matt-fore-runda5.json`.
- Stjärnorna tänds i slutet (sångtid 2:00.3 = avsnitt 2:11.3, på slaget när kameran har glidit ut): dansstjärnorna tänds tre och tre från vänster på åttondelarna som i mellanspelet, lyser sedan lugnt och gungar sakta (mindre när stjärnan somnar) tills irisen. Månen lyser upp tidigare (1:56.9–1:59.9) så att himlen gör en sak i taget.
- Himmelsbild (vers 1, rad 3 "Fjärran lockar du min syn"): på slaget efter att Lage har pekat upp (sångtid ca 0:35.8, avsnitt ca 0:46.8) klipp till `HIMMEL` [735, 245, 810], bara himlen och stora stjärnan. Dansstjärnorna tänds i en våg på sextondelar och gungar på slagen, tre stjärnfall glider snett ner på var sin åttondel med glimtar efter, allt tonas ner på sista slaget; hårt klipp till stjärnans närbild på rad 4 (0:39.3, avsnitt 0:50.3). ~3,5 s.
- `natt-puts.js`: `N.dans.styr = [från, till]` (sångtid) låter en scen styra dansstjärnorna själv (vers-1:s himmelsbild, slutet); ekona i verserna väljer nu stjärnor i den flyttade tvåbildens himmel.

## Runda 6 (2026-11-09, Sanna: "use v2 characters", sedan lärdomarna från 015/019)
- v2-figurerna, se avsnittet ovan.
- **Ritintrot som 015 och 019:** kritan ritar stjärnans kontur i ett drag (0,5–6,6 s, `krita-ritar`), *"Nu ska vi se vad kritan ritar."* (0,25, `nu-ska-vi-se-vad-kritan-ritar-1`) och *"Hmm."* (6,75, `hmm-7`), sedan fylls bilden i inifrån på *"En stjärna!"* (7,5, ingen inspelning) och tindrar. Skogsljudet lågt under (det finns inget kvällsljud än). Aldrig "Vad kan det vara?".
- `kit.ljud` tar nu `fil` och `fadeIn` som 015; `krita-ritar` finns i `LJUDFILER`.
- **Premiumputs (natt-puts.js):** mjuka mörkgröna markskuggor under nallen och de liggande figurerna, riggarnas skugga mjuk, en varm ton (soft-light 0,05) och en nattblå vinjett 0,14.
- **Dansscen i svansen (slutet/):** 2:00.0–2:06.0 sångtid hårt klipp upp i himlen (`HIMMEL` [775, 232, 810]); dansstjärnorna tänds två och två på sextondelar med ansikten (`N.dans.pose` tar nu `humor`, `m`, `blink`), gungar ett varv per två slag och hoppar på varannat slag, stora stjärnan leder. Godnatt-replikerna flyttade till 2:06.3 / 2:08.1 / 2:10.0, närbilden på stjärnan 2:09.8–2:12.8, irisen sluter sig från 2:13.3.

## Runda 7 (2026-11-09, Sanna: "new intro", "make animals move better using rig v2 such as walking", "polish all animations", "lion lying down have correct eyes", "update nalle v2", "match outro to bäbä")
- **Nytt intro** (`../intro/`, kopia av 015:s, som är 013:s): 9,0 s, LILLA KRITAN, titeln *Blinka lilla stjärna* på en guldgul kritfläck (`FARGER.stjarna`), nattblått kritsvep in i ritandet; kritan-ritar börjar med att det blå glider undan (`svepUt`). Förra introt: `intro/intro-forra-kort*.mp4`.
  **Avsnittstid = sångtid + 9 s** nu (matt.json `INTRO` 9,0, `bilder` flyttade −2 s, bygg.py `INTRO`). Kör **inte** `gor-lager.py` utan att föra över runda 5:s handgjorda mått (`FILT_Y` 683, `STIG_DY` 135), den skriver över dem.
- **Gång med v2-riggen** (`natt.js` `gar: { t, amp, rikt }` → riggens `steg()`): benen kliver, kroppen gungar och lyfts, öronen följer med, blicken åt gångriktningen; Nicke också med riktningspose och pendlande armar, Lage utan (han bär filten). Kullen lutar dem lite in i backen. Stegljuden i takt med cykeln.
- **Liv i vila:** svansen svänger lugnt, öronen fladdrar lite (`v2rorelse`), i sångtid.
- **Lejonet liggande:** v2-ögon i kod (`lejonLigger`): ovala ögon med glans, lock som stängs till en båge, kinder, nos och leende; blicken flyttar hela ögat lite, inga rullande pupiller.
- **v2-nallen:** `nalle-v2-ljus-tunn.png` (007) med ansiktet i kod (nosfläck, ovala ögon med ljus kant, kinder, leende; sluten båge när blink 1).
- **Slutet som 015:** kameran åker sakta in mot de sovande (2:14–2:22.5), irisen sluter sig på 1,3 s, kort håll, stängs på pling 2:26.5, stjärnan glimtar i det svarta till slutet.
