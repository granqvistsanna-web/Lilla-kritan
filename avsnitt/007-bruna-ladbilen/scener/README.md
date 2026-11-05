# Kodscener – avsnitt 007 Bruna sången

Samma upplägg som 006: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna är `tider()` i `../storyboard/bygg.py` (SÅNGTID; tagning 2 klipps aldrig, INSATT är tom). `lager/gor-lager.py` skriver dem till `lager/matt.json`, som `kit.manus()` läser.
Avsnittstid = sångtid + 11 s (introt), hela vägen: tagning 2 (`../sang.m4a`, 2026-11-05) klipps aldrig, och `../sang-klippt.m4a` är
en kopia av den, så klipptid = sångtid. render.mjs tar sångbiten därifrån (`M.klipp(sångtid)` = sångtid när INSATT är tom).

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `kritan-ritar/` | 02–02c (kritan ritar lastbilen, gissningspausen, "En lastbil!", zoom in) | 0:11.0–0:26.6 | ✅ klar (`kritan-ritar.mp4`; slutkameran: zoom 1,25 mot lastbilen, vagen-1 börjar där) |
| `vagen-1/` | 03–05h (zoom ut till vägen, "Hej hej!", körscenen, vers 1, refräng 1) | 0:26.6–1:07.1 | ✅ stills och `vagen-1.mp4` (40,5 s, med sångbiten). 03–04 ryms i 3,3 s (inget mellanspel i tagningen): teckningen blir lastbilen, zoom ut, "Hej hej!"-vinkning i närbild. Rullande mittstreck ur egen `vagen-slat.png` (`gor-vag.py`). Lastbilen vid bullens fot flyttad lokalt till x 1140; kitbehov i `vagen-1/BEHOV.md` |
| `vagen-2/` | 06–09h (kotten trillar ur granen, frågan och pausen, refräng 2) | 1:07.1–1:58.4 | ✅ stills och `vagen-2.mp4` (51,3 s, med sångbiten). Lastbilen står på refrängens dansplats (DANS) hela scenen; kotten studsar på pucken bredvid Bulle, ett dunk per sjunget "dunk"; klappen på magen = tassarna på ratten och ett skutt (armarna kan inte peka inåt); tyst i pausen; kitbehov i `vagen-2/BEHOV.md` (bl.a. fel "brum"-rad i refrang.js) |
| `angen/` | 10–14f (kritsvep, ängen, Bulle kliver ur vid 2:01 och står på gräset, bullen rullar, Igge, en bit var) | 1:59.4–2:45.6 | ✅ stills och `angen.mp4` (46,2 s, oklippt sång). Repliker bara i bild; "rull" = `hjul-gnissel` lågt tills ljudet finns; Ludde sitter-v1 som platshållare (`gor-bilder.py`); kitbehov i `angen/BEHOV.md` |
| `discot/` | 15a–16d (danspausen, sista refrängen med småbilderna, "Hej då – tut, tut!") | 2:45.6–3:21.1 | 🟡 tagning 2: `discot.mp4` är en `--snabb`-förhandsvisning (35,5 s, med sångbiten), full rendering kvar: 006:s disco omfärgat, klistermärkena i en rak rad bredvid kulan, björnstampet, lastbilen in till mitten (`SLUT_X/Y/H`). Fler effekter ur ljud.md (swoosh på "rulla runt", hjul-gnissel, pip). Se `discot/README.md` |
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
- `ikonrad.js`: raden av småbilder (kotten, björnen, bullen, lastbilen) som discot slår upp och slutet har i vila (`await ikonrad.ny(parent, M)`).
- **Vita kanter** (Sanna, 2026-11-05: "använd verktyg kant"): ladda `<script src="../../../../verktyg/kant.js"></script>` direkt efter
  kit.js i varje scen. `kant.lagg(g)` på varje PNG-sak (karossen, gosekaninen, kanelbullen, kotten, korgen, filten, bitarna, Igge-bollen),
  `kant.lagg(g, { andel: 0.01 })` på allt som ritas i kod (ratten, flaskorna, flaggan och kepsen, avgasröret, discots klistermärken).
  kit.figur får kanten av sig själv. Lägg ingen egen vit kant ovanpå, och inga inbakade tjocka kanter.
- `lastbilen.js`: bruna lastbilen (lastbil-brun-v2) åt höger med Bulle i sätet, som `lastbilen()` i bygg.py (BULLE_K/X/Y, HJUL ur matt.json).
  Hjulen snurrar (`dist`), gröna flaggan fladdrar (`flagg` = efterslängar), gröna kepsen i kod, gosekaninen (gosekanin-v4) på flaket med
  kodansikte guppar (`kanin`), avgasröret med vita kritpuffar (`b.puffa(t, tider)`, `lastbilen.puffTider(a, b, brum)`: varannat slag
  och varje brum). `lastbilen.ljud(gupp)` lägger hjul-gnissel och kaninens pip för guppen (ljud.md, Fler effekter). **Ratten** (som musens i 005): tassarna vilar på den; en arm som pekar uppåt eller ut (målets y ≤ 600 i Bulles ruta, som bygg.py) släpper på sin sida och ligger framför karossen, ratten syns alltid (också med båda armarna uppe),
  `tut` guppar den, `tryck` (0..1) sätter högra tassen på tutknappen, `skarm` (0..1) håller den över ögonen (spanar). Lastbilen vänds och snurras aldrig. `b.punkt([x, y])` = en punkt i Bulles 1024-ruta i bild.
- `refrang.js`: refrängen a–h, samma båda gångerna (`refrang.ny(M, '05', S)` eller `'09'`, sedan `r.bygg(L, bil)` och `r.rita(t)`).
  a och h på scenens vägplatta (dansbilden och närbilden), b–g på kanelbullsberget, med ett kritsvep in (himmelsblått) och ett ut (vägens
  gröna). Lastbilen kör uppför och över bullen med hjulen på ytan (`bergPose`), alltid åt höger. Två klämflaskor glider ner på e, sprutar
  kola på "Kolasås" och choklad på "choklad", såsen rinner ut över bullen, flaskorna glider upp på "mums, mums". Himlen glöder på f.
  Orden inne i raderna ligger på slagen efter radens start (uppskattat, inga stammar än), raderna söks från refrängens början.
  Ljuden enligt `../ljud.md`. **`r.rita(t)` nollställer kritsvepet** (`kritsvep(0)` utanför sina egna svep): en scen med ett eget
  kritsvep ritar det *efter* `r.rita`. Lastbilen landar vid bullens fot på x 1140 (`på_berget(c, 1140, …)` i bygg.py).
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
