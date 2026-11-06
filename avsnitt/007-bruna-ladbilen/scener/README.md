# Kodscener – avsnitt 007 Bruna sången

Samma upplägg som 006: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna är `tider()` i `../storyboard/bygg.py` (SÅNGTID; tagning 2 klipps aldrig, INSATT är tom). `lager/gor-lager.py` skriver dem till `lager/matt.json`, som `kit.manus()` läser.
Avsnittstid = sångtid + 11 s (introt), hela vägen: tagning 2 (`../sang.m4a`, 2026-11-05) klipps aldrig, och `../sang-klippt.m4a` är
en kopia av den, så klipptid = sångtid. render.mjs tar sångbiten därifrån (`M.klipp(sångtid)` = sångtid när INSATT är tom).

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `kritan-ritar/` | 02–02c (kritan ritar lastbilen, gissningspausen, "En lastbil!", zoom in) | 0:11.0–0:26.6 | ✅ klar (`kritan-ritar.mp4`; lastbilen mitt i bild, strecken i jämn fart och i ordning kaross, lampa, avgasrör, hjul, nav, flagga, kritan byter färg för varje del; på slutet börjar ett svep in som vagen-1 fortsätter till närbilden, ett enda in utan in-ut-in, Sanna 2026-11-06) |
| `vagen-1/` | 03–05h (zoom ut till vägen, "Hej hej!", körscenen, vers 1, refräng 1) | 0:26.6–1:07.1 | ✅ stills och `vagen-1.mp4` (40,5 s, med sångbiten). 03–04 ryms i 3,3 s (inget mellanspel i tagningen): teckningen blir lastbilen, zoom ut, "Hej hej!"-vinkning i närbild. Rullande mittstreck ur egen `vagen-slat.png` (`gor-vag.py`). Lastbilen vid bullens fot flyttad lokalt till x 1140; kitbehov i `vagen-1/BEHOV.md` |
| `vagen-2/` | 06–09h (kotten trillar ur granen, frågan och pausen, refräng 2) | 1:07.1–1:58.4 | ✅ stills och `vagen-2.mp4` (51,3 s, med sångbiten). Lastbilen står på refrängens dansplats (DANS) hela scenen; kotten studsar på pucken bredvid Bulle, ett dunk per sjunget "dunk"; klappen på magen = tassarna på ratten och ett skutt (armarna kan inte peka inåt); tyst i pausen; kitbehov i `vagen-2/BEHOV.md` (bl.a. fel "brum"-rad i refrang.js) |
| `angen/` | 10–14f (kritsvep, ängen, Bulle kliver ur vid 2:01 och står på gräset, bullen rullar, Igge, en bit var) | 1:59.4–2:45.6 | ✅ stills och `angen.mp4` (--snabb, 46,2 s, oklippt sång; full rendering ej gjord). Repliker bara i bild; "rull" = `hjul-gnissel` lågt tills ljudet finns; Ludde sitter-v1 som platshållare (`gor-bilder.py`); kitbehov i `angen/BEHOV.md` |
| `discot/` | 15a–16d (danspausen, sista refrängen med småbilderna, "Hej då – tut, tut!") | 2:45.6–3:21.1 | 🟡 tagning 2: `discot.mp4` är en `--snabb`-förhandsvisning (35,5 s, med sångbiten), full rendering kvar: 006:s disco omfärgat, klistermärkena i en rak rad bredvid kulan, björnstampet, lastbilen in till mitten (`SLUT_X/Y/H`). Fler effekter ur ljud.md (swoosh på "rulla runt", hjul-gnissel, pip). Lejonet Lage klappar i danspausen i stället för Mille (2026-11-06, `kit.FIGURER['lejonet-lage']`, ritade armar framför kroppen och en vit klappstjärna på slaget). Se `discot/README.md` |
| `slutet/` | 17 (kritirisen runt Bulle i lastbilen, som 006) | 3:21.1–3:29.5 | 🟡 tagning 2: `slutet.mp4` --snabb (8,4 s, outrot "Hej då, lilla vän! Tut, tut!" till sångens slut). Tar vid där 16d slutar (`SLUT_BIL`, raden i vila via `ikonrad.js`, samma takt och vinkning). Irisen sluter sig fram till första "tut", håller över båda, stängs, glimt, svart. `glitter` lågt, `tuta-tut`-eko. Slutrendering kvar |

(Avsnittstiderna är storyboardens `tider()` från 2026-11-05; läs alltid `M.bild()` i scenerna i stället för att skriva in dem.)

## Filer
- `kit.js`, `render.mjs`, `ansikten.js`, `kritsvep.js`, `kritsvep-korn.png`, `discoljus.js`: kopior av 006:s. Ändrat i kit.js: takten
  `BEAT = 0.6496, BEAT0 = 0.63` (92,4 bpm, tagning 2, uppmätt i sang-klippt.m4a med librosa, klipptid),
  `manus()` läser `lager/matt.json` (M.bild, M.av = 11, M.klipp, M.matt) och "≈"-tiderna i rader.txt, kornet ur 007:s `lager/korn.png`,
  Bulles mun som ANSIKTE i bygg.py. `M.rad(text, { efter: sångtid })` ger första raden med texten från den tiden (rader som finns flera
  gånger, som "Brum brum brum" i vers och refräng). `kit.vag(L.plate)` + `kit.duk(kit.VAG_PLATTA)`: vägen med rullande mittstreck och
  buskar och träd längst bak (björkar, granar och lövträd ur `assets/bakgrunder/vagen-saker/`, granens och lövträdets bruna stammar
  under gräskanten) (`v.rulla(dist)`), samma i vagen-1 och vagen-2; plattan och strecken ur `lager/gor-vag.py`.
  `discoljus.js` har 007:s bruna kula (`lager/discokula-brun.png`, bruna rutor och nät).
  `kit.iggeTaggar(g)`: Igges grå taggar i kod (15 st, 125°–340°, vit kant under) bakom igelkottsbollen i discot och ängen.
  `LJUDFILER` har också `glimt`, `studs`, `hupp`, `mmm` och `nom` (`assets/ljud/effekter/`).
- **Tankemolnet i vagen-1** (042): tre prickar ur Bulles huvud, ett vitt moln med chokladrutan (`choklad-v5.png`) och kolakaramellen,
  sakerna studsar på sin rad och flyger i en båge in i Bulles mun på första "mmm" (`flyg`, ljud `swoosh`, `mums`, `nom`).
- **Lastbilen v5:** armar som är uppe ritas framför karossen (ut genom fönstret); `p.glitter` (0..1) ger vita stjärnor runt nallen
  på flaket (vagen-2, "nallen är brun" 1:32, ljud `glimt`). kritan-ritar ritar hytten med fönstret (`RITAD_FONSTER` i matt.json). I angen
  reser sig Bulle inte i sätet och hoppar lågt bakom hytten innan han kommer fram framför den.
- **Discots slut:** småbilderna hoppar en i taget varannat slag (`SKUTT`, `ikonSkutt`, ljud `studs`), Bulle vinkar högt.
- `ikonrad.js`: raden av småbilder (kotten, björnen, bullen, lastbilen) som discot slår upp och slutet har i vila (`await ikonrad.ny(parent, M)`).
- **Vita kanter** (Sanna, 2026-11-05: "använd verktyg kant"): ladda `<script src="../../../../verktyg/kant.js"></script>` direkt efter
  kit.js i varje scen. `kant.lagg(g)` på varje PNG-sak (karossen, gosekaninen, kanelbullen, kotten, korgen, filten, bitarna, Igge-bollen),
  `kant.lagg(g, { andel: 0.01 })` på allt som ritas i kod (ratten, flaskorna, flaggan och kepsen, avgasröret, discots klistermärken).
  kit.figur får kanten av sig själv. Lägg ingen egen vit kant ovanpå, och inga inbakade tjocka kanter.
- `lastbilen.js`: bruna lastbilen (lastbil-brun-v5, hytt med tak och öppet fönster, 2026-11-06) åt höger med Bulle i hytten, som `lastbilen()` i bygg.py (BULLE_K/X/Y, HJUL ur matt.json).
- `humla.js`: Humlan Humle (Sanna 2026-11-06), ett bakgrundsinslag som Fia och räknas inte som en av de tre figurerna. Liten (h 34 i bild), utan ben, lugn sicksack. Turerna `{a, e, fran, till, slinga, sitt}` börjar och slutar utanför bild, och hon vänds bara mellan turerna. Med `sitt: t1` sätter hon sig på `till` och sitter kvar till t1. Utan förälder flyger hon i ett eget lager ovanför kameran. Ett lågt `surr` per tur. I vagen-1 flyger hon in i körscenen och sätter sig på flakkanten bredvid nallen (lastbilens grupp som förälder), och lyfter i harpluften före refrängen. vagen-2 och angen: lugna turer förbi högt uppe.
- `lastbilen.js` (2026-11-06): uppsträckta armar har en ljus tass längst ut och sträcks mindre (ARM_SK 1,15); nallen har större kodögon och mun.
- **Tagning 4 (Suno v7b, 2026-11-06, `sang.m4a` 3:57.6, 86 bpm):** nya bryggor före refrängerna, 04b i vagen-1 och 08d i vagen-2: Bulle blundar, tankemolnet med kolalandet (`rekvisita/kolalandet`) poppar upp, ett kolaplask på "Ett hav av kolasås!", ögonen upp och två puffar på "Nu kör vi dit – brum, brum!", och molnet svävar upp och bort i harpluften före "Brun, brun!". Refrängens rad 2 är "Åh, vad gott! (Mums, mums!)" (Bulle slickar sig om munnen), e är "Gunga i såsen – (gung, gung!)": stora lutningar, armarna upp och ett kolaplask på den sida lastbilen lutar mot per "gung", och f slutar på "(slick, slick!)". Danspausen har bara en omgång solon (15a, 15c–15e), finalen bara ett "Lastbil, lastbil". Tagning 3:s tider finns kvar i `../rader-v3.txt`.
  Hjulen snurrar (`dist`), gröna flaggan fladdrar (`flagg` = efterslängar), gröna kepsen i kod, gosekaninen (gosekanin-v4) på flaket med
  kodansikte guppar (`kanin`), avgasröret med vita kritpuffar (`b.puffa(t, tider)`, `lastbilen.puffTider(a, b, brum)`: varannat slag
  och varje brum). `lastbilen.ljud(gupp)` lägger hjul-gnissel och kaninens pip för guppen (ljud.md, Fler effekter). **Ratten** (som musens i 005): tassarna vilar på den; en arm som pekar uppåt eller ut (målets y ≤ 600 i Bulles ruta, som bygg.py) släpper på sin sida och sticker upp bakom karossens kant (aldrig igenom den, sträckt 1,3 så att tassen når över pucklarna), ratten syns alltid (också med båda armarna uppe),
  `tut` guppar den, `tryck` (0..1) sätter högra tassen på tutknappen, `skarm` (0..1) håller den över ögonen (spanar). Lastbilen vänds och snurras aldrig. `b.punkt([x, y])` = en punkt i Bulles 1024-ruta i bild.
- `refrang.js`: refrängen a–h, samma båda gångerna (`refrang.ny(M, '05', S)` eller `'09'`, sedan `r.bygg(L, bil)` och `r.rita(t)`).
- `rutschbana.js`: vattenrutschbanan på kolastranden (platt-hav-v2), Bulle med nallen i famnen och åket (`rb.stall`, `rb.ak`, `rb.kamera` med lägena HEL och TOPPBILD, kolasåsen `rb.sasRita`). Används av refrang.js (refrängerna: halvbild på tornet på "Brun, brun", kameran backar ut på "Rutscha") och discot/16c (sista refrängen: tre åk i kolasås, sedan väller kolasåsen tillbaka till lastbilen på "Hej då").
  Kolasåsresan (se filens huvud): a–b på scenens vägplatta (tassavtryck, kolatunga), c–g i kolasåshavet, h tillbaka på vägen med
  kolasåsen igen. **Kolasåsövergången** (undantag, refrang-plan.md): på slutet av b väller tjock kolasås ner över hela bilden med
  rundade droppar och rinner sedan neråt så att havet syns, och samma sak åt andra hållet på "Vad är brunt?" i h (`SAS_IN`/`SAS_UT`, `sasRita`, i `kit.lager.overst`). Såsen och
  framvågen har filtret `#kolakorn` (mjuka kolafläckar, vaxstreck, vita papperskorn); plattan `kolasashavet.png` har samma sorts
  vaxkorn inbränt (bara bergen och havet, `kolasashavet-v9-platt.png` är den släta). Havskameran i c–e är närmare (lastbilen ca 40 %
  av bildhöjden). Plaskkronan och kolaklicken är målade (`rekvisita/kolasas/cut/plask.png`, `klick.png`). Godiset i g: `choklad-v5.png` (vaxig chokladruta) och `kola-karamell.png`. Ljud: `slurp` när såsen kommer, `glimt` på
  "Mmm!". Orden inne i raderna ligger på slagen efter radens start, raderna söks från refrängens början. **`r.rita(t)` nollställer
  kritsvepet**: en scen med ett eget kritsvep ritar det *efter* `r.rita`. Scenen döljer sina egna saker när `r.rita` ger en bokstav
  (vagen-1 döljer tankemolnet).
- `lager/`: PNG:er och `matt.json` som `lager/gor-lager.py` tar ut ur storyboarden (lastbilen, flaggan, berget och glöden, flaskorna,
  korgen, bitarna, discot och den bruna kulan, kornet). Kör om när bygg.py eller `assets/` ändras. **gor-lager.py skriver inte om
  storyboarden**: den kör bygg.py utan blocket som sparar `frames/` (se nedan).
- `_test/refrang/`: provbänk för lastbilen.js och refrang.js (05a–h på vägplattan), bara för stillbilder.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py   # ca 2 min (längre när andra sessioner renderar)
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-vag.py      # vägplattan utan mittstreck och streckremsan (kit.vag)
node render.mjs kritan-ritar 1 5 9.5 12 15.5   # stillbilder vid de tiderna → kritan-ritar/stills/
node render.mjs kritan-ritar --snabb           # förhandsvisning: 960 × 540, 15 bilder/s
node render.mjs kritan-ritar                   # hela scenen, en gång när den är klar
```
Förhandsvisa med `--snabb` och stillbilder, och rendera fullt en gång när scenen är klar. Bara huvudsessionen bygger storyboarden och
grovklippet, och högst två sessioner renderar samtidigt.

**Obs, bygg.py:** blocket som sparar `frames/` ligger *före* SHOTS och `tider()`, så "kör bygg.py fram till `REF = lambda`" (som
`../film/satt-ihop.sh` gör) bygger och skriver om hela storyboarden (raderar och sparar alla frames/*.jpg, ca 2 min). gor-lager.py
hoppar över det blocket.
