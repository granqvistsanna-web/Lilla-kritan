# Kodscener – avsnitt 011 Gula sången (plan, 2026-11-06)

> **Ny form (2026-11-09):** 011 görs som färgsång v2, med 013:s och 019:s scenkit (`scen-kit.js`, `film.js`, `storyboard-v2/storyboard.md` som styr tiderna), inte 007:s `kit.js` och `bygg.py`. Se `../README.md` (Arbetsgång) och `format/fargsang-v2.md`. Tre saker nedan gäller inte längre: kritan ritar **bananen** (berättaren säger "Titta!" … "Något långt."), stoppet vid dammen har **inga repliker**, och discot är **klappa, gunga, hoppa** med Lejonet, kon och grodan, följt av sista refrängen med solen, humlan, hatten och bananen som klistermärken (2 × 2 till höger). Resten av planen (helikopter.js, sol.js, solresan, dammen) står kvar som underlag.

**Bara en plan, ingen kod än.** Det finns ingen Suno-tagning och inga bilder ännu. Upplägget är detsamma som i 007, 013 och 014: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s). Tiderna kommer ur `../storyboard/bygg.py` (`tider()`, SÅNGTID) via `lager/gor-lager.py` → `lager/matt.json`, som `kit.manus()` läser, och ur "≈"-tiderna i `../rader.txt`.

**`../rader.txt` görs när Sanna har levererat `../sang.m4a`** (Whisper + korta klipp, takten ur librosa, som i 013). Tills dess är alla tider nedan uppskattade (≈, 96 bpm, slaget ca 0,625 s).

**Sången klipps aldrig.** Suno-tagningen används oförändrad och bilden anpassas till den. `INSATT` i bygg.py är tom, `../sang-klippt.m4a` är en kopia av `sang.m4a` (eller saknas: render.mjs tar då `sang.m4a`, som i 014), och avsnittstid = sångtid + 11 s (introt) hela vägen.

**Rörelseregler i alla scener:** figurer och fordon snurrar aldrig och vänds aldrig (2D-urklipp), de lutar och skuttar bara. Helikoptern flyger alltid åt höger. **Bara rotorn och svanspropellern snurrar**, som hjulen på lastbilen. Hatten seglar och gungar, solen guppar och blinkar, men inget av dem roterar. Inga effektstreck (fart-, duns- eller strålstreck, ingen suddig rotorskiva): farten syns med vita kritpuffar och vindringar, Lages man och svansen. Solens runda kritstrålar är en del av solens teckning, inga ljusstrålar. Lugna hopp, rörelser på slagen, allt i par, en sak i taget.

## Scener

Bildnumren är storyboardens (`../storyboard.md`). Avsnittstiderna är uppskattade ur sångens delar och blir scengränser på radstarter när `rader.txt` finns; storyboardens `tider()` bestämmer till slut. Läs alltid `M.bild()` i scenerna i stället för att skriva in tider.

| Scen | Storyboard | Avsnittstid ≈ | Innehåll | Status |
|---|---|---|---|---|
| `kritan-ritar/` | 02–02c | 0:11–0:27 (sång 0:00–0:16) | Gula kritan ritar bubblan och svansen, medarna och sist rotorn i gissningspausen, "En helikopter!", rotorn börjar snurra, helikoptern lyfter och Lage dyker upp, zoom in som himlen-1 fortsätter | ⏳ väntar på sången och helikoptern |
| `himlen-1/` | 03–04h | 0:27–1:10 (sång 0:16–0:59) | Himlen (molnen glider åt vänster, Pella pyttelitet långt bort), vers 1 med bananen och Pip som klistermärken, närbilden "jag och du", refräng 1 via `refrang.js` (himlen → solen → kritsvep hem) | ⏳ väntar |
| `himlen-2/` | 05–07h | 1:10–2:05 (sång 0:59–1:54) | Solen glider fram bakom molnet ("varm, varm, varm"), Humle surrar förbi, frågan och pausen (svansen guppar upp), "Vifta, vifta, vifta!", refräng 2 via `refrang.js`, kritsvepet i turkos till dammen | ⏳ väntar |
| `dammen/` | 08–10e | 2:05–2:50 (sång 1:54–2:39) | Fia fladdrar förbi, helikoptern sänker sig, Kajsa i solhatten, luckan med bananen, vinden tar hatten, plopp på näckrosbladet, snyft, rotorn varvar ner, den tysta takten (Gurras ögon), Gurra hoppar blad till blad, tack, bananen delas, tre lugna hopp i solen, "jippi" | ⏳ väntar |
| `discot/` | 11–12d | 2:50–3:11 (sång 2:39–3:00) | Discot i ljusgult med gul kula: danspausen (Humle surrar, Gurra hoppar, Pip pickar), sammanfattningen med solen, humlan och hatten på kritskivor, kroken, helikoptern som fjärde småbild, "Hej då – flapp, flapp!" | ⏳ väntar |
| `slutet/` | 13 | 3:11–ca 3:15 (sångens slut, sedan kritirisen) | Kritirisen sluter sig runt Lage, glimt, svart (som 006–007 och 013) | ⏳ väntar |

Refrängen hos solen är ingen egen scen. Den är `refrang.js`, som himlen-1 och himlen-2 kör på sina tider (`refrang.ny(M, '04', S)` och `'07'`), likadan båda gångerna, som i 007, 013 och 014. Molnövergångarna mellan scenerna läggs på i `../film/` (`film/moln/`), inte i scenerna.

**Att kolla i tagningen** (sången klipps inte, bilden anpassas):
- **Gissningspausen** (02b) ska helst vara 4–5 s. Blir den kortare (007 fick ca 2 s) ritas medarna redan under "vad kan det vara?" och bara rotorn i pausen.
- **Frågepausen** (06b) ska vara 4–5 s. Svansens ledtråd ryms också på ca 2 s, men då hinner barnet knappt svara (samma val som i 013: ny tagning eller leva med det, Sannas beslut).
- **Luckan efter "vinka, vinka!"** (08c) behöver ca 5 s för repliken. Saknas den, som i 013, håller Kajsa bara fram korgen och säger `mu` i bild, utan repliker.
- **Den tysta takten efter "Vem kan hjälpa?"** (09f): Gurras ögon ligger där. Är den kortare kommer ögonen redan på "hjälpa".

## Kopieras (från 007, med det 013 och 014 redan har löst)

014 är byggt efter 007 och har redan `lejonet-lage` med ritade armar i `FIGURER` och ett öppet fordon med figuren i, så de bitarna tas därifrån.

| Fil | Från | Ändras i 011 |
|---|---|---|
| `kit.js` | 014 (efter 007) | Takten ur 011:s tagning (`BEAT`, `BEAT0` ur librosa i `../rader.txt`, och 014:s `kit.takt` som fäster på de uppmätta slagen i `matt.json` `SLAG` om tagningen glider). `FIGURER`: `lejonet-lage`, `grodan-gurra`, `humlan-humle`, `kycklingen-pip`, `fjarilen-fia`, `flygplanet-pella` finns; `kon-kajsa` läggs till (bilderna finns i `assets/karaktarer/kon-kajsa/`). `LJUDFILER`: lägg till `mu: 4`, `pick: 1`, `pip: 1`, `plopp: 1`, och `rotor`, `rotor-stopp`, `vind` med 0 tills filerna finns (se `../ljud.md`). Kornet ur 011:s `lager/korn.png`. Ingen `kit.vag`: himlen har inget golv |
| `render.mjs` | 014 | Inget, utom att sångbiten tas ur `sang-klippt.m4a` om den finns, annars `sang.m4a` |
| `ansikten.js` | 014 | Lägg till `LAGE` (finns i 014:s FIGURER), `KAJSA`, `GURRA` och `PIP` (uppmätta i de ansiktslösa bilderna), `SOLEN` och `BANAN` (se nedan). Humören finns, också `slickar`, `skelogd` och `karleksfull`. `gaspar` och `anstranger` finns inte: tills vidare `njuter` och `skelogd` (`../README.md`, "Behöver skapas") |
| `mjukaposer.js` | 014 | Som det är: mjuka poser för Lage och Kajsa |
| `verktyg/kant.js` | repo | Kopieras inte: varje scen laddar `../../../../verktyg/kant.js` direkt efter kit.js (skill `vita-kanter`). `kant.lagg(g, { andel: 0.01 })` på allt som ritas i kod: rotorn, solen, de små solarna, bananens skal och bitar, hjärtana |
| `kritsvep.js`, `kritsvep-korn.png` | 007 | Kritsvepet i himmelsblått (refräng 1 hem) och turkos (refräng 2 till dammen) |
| `klistermarke.js`, `ikonrad.js` | 007 | Bananen, Pip och de små solarna som klistermärken (vers 1 och refrängen), solen, humlan och hatten i discots rad |
| `humla.js` | 007 | Humle som det är: mjuka bågar, vingarna fläktar, vänds bara mellan turerna. Turerna: tittar fram bakom ett moln (05c), en lugn båge förbi helikoptern (05d), in på "gladaste" (04f), surrar runt i discot (11b) |
| `discoljus.js`, `discot/` | 007 | Discot omfärgat ljusgult med en gul kula (`discot/gor-plat.py` som i 007), Humle, Gurra, Pip och Lage i stället för Mille och Gurra |
| `slutet/` | 007 / 013 | Kritirisen runt Lage |
| `refrang.js` | 007 (och 013, 014) | Bara som mall: strukturen a–i, `refrang.ny(M, '04', S)`, att orden söks på slagen efter radens start (`M.rad(text, { efter })`), och att `r.rita(t)` nollställer kritsvepet. Innehållet skrivs nytt (se nedan) |
| `lastbilen.js` / `traktorn.js` | 007 / 014 | Som mall för `helikopter.js` (se nedan) |
| `lager/gor-lager.py` | 007 / 014 | Tar ut lagren och tiderna ur 011:s `storyboard/bygg.py` när den finns, utan blocket som skriver om `frames/` |

## Nytt i 011

- **`helikopter.js`** (efter 014:s `traktorn.js`): gula helikoptern åt höger med Lage i den låga öppna sitsen, armarna över kanten. Lagren bakifrån: svansen (Lages, eget lager, hänger ut över bakkanten) → helikopterns svans med svanspropellern → Lage → kaross → Lages armar → medarna → huvudrotorn. Samma `pose()` som traktorn (`x, y, h, tilt, humor, titt, blink, m, r, l, lyft`) plus:
  - `rotor` 0..1, rotorns fart: 0 står still, 1 full fart. Rotorn är ett platt kritblad ovanpå, sett från sidan. Att den snurrar syns som att bladet blir kort och långt igen (skalas i x), **ett varv per slag** så att det går i takt med "flapp, flapp" och aldrig blir ett flimmer (vid 30 bilder/s högst ca 3 varv per sekund). Ingen suddig skiva och inga streck. Svanspropellern är ett litet kors som snurrar på riktigt, som ett hjul. I 02c går `rotor` mjukt från 0 till 1; i 09e (`rotor-stopp`) mjukt från 1 till 0 på ca 2 s, och sedan står den still resten av dammen.
  - `flyg`: helikoptern svävar med ett lugnt gung upp och ner i takt (som `gung` i kit) och lutar lite framåt när den flyger åt höger, lite bakåt när den bromsar och sänker sig.
  - `skutt`: "Skaka, skaka" är två små skutt upp och ner på slagen (rotorn hickar, manen guppar), aldrig en rotation.
  - `svans` 0..1 per vift: Lages svans med den bruna tofsen viftar över bakkanten (06b guppar den upp, 06d tre vift). Svansen är ett eget lager i Lages pose i helikoptern (`../README.md`, "Behöver skapas" 4).
  - `h.vindring(t)`: en vit kritring under rotorn per "flapp" (som 013:s ring per tut), och `h.virvlar(t0, t1)`: mjuka vita kritpuffar som virvlar under rotorn när helikoptern sänker sig mot gräset (09). Puffar, inga streck.
  - `h.punkt()` (var sitsen, rotornavet och medarna är i bild) och `helikopter.ljud()` som traktorn (rotorn lågt medan den syns).
  - Beror på helikopterns bild (`assets/rekvisita/helikopter-gul/`, kaross, medar och svanspropeller var för sig, huvudrotorn ritas i kod) och Lages plats i den (`lejonet-lage/i-helikoptern/`-json, som `i-traktorn/` i 014).
- **`sol.js`**, den skrattande solen. Används i refrängen (stor) och i 05 (liten, bakom molnet):
  - Plattan är jättesolen (`bakgrunder/jattesolen.md`, om bilden görs) eller en sol ritad i kod: `sol-orange` omfärgad gul och uppskalad, med runda strålar som mjuka kritstrån runt om. Gyllene himmel bakom, ingen mark.
  - Ansiktet ritas i kod med `ansikten.js` (`SOLEN`: två ögon och en stor mun mitt på): `glad`, `skrattar`, `blinkar`, `karleksfull`. Inget bländande vitt ljus.
  - `s.skratt(t)`: solen guppar två gånger (ett litet squash nedåt och tillbaka) när den skrattar. Den snurrar aldrig, och strålarna står still runt den; de andas bara lite längre och kortare på slaget.
  - `s.kittla(t, mal)`: två strålar är egna lager som sträcker sig ner mot Lages mage i en mjuk böj och vickar en gång per "kille" (som en arm i kit, ritad som en kritsträng med vit kant). En stråle vinkar på "Vinka, vinka" (04g).
  - `s.blink(t)` och en liten gul glimt per blink (04e).
  - I 05 glider solen fram bakom ett moln (`rekvisita/moln.md`) och värmer: molnet glider åt sidan, solen ligger kvar.
- **`refrang.js` för solresan** (nytt innehåll, bildplan i `../refrang-plan.md`):
  - a "Gul, gul!": himlen, halvbild, Lage sträcker ut tassarna två gånger, en liten gul sol poppar upp per "gul" som klistermärke, fyra i en båge med ekot.
  - b "Helikopter": kameran följer helikoptern åt höger, en vindring per "flapp", himlen börjar glöda gyllene vid överkanten.
  - c "Upp till solen": två lugna lyft, kameran tiltar upp, jättesolen glider in från överkanten (kamerarörelse i samma bild, inget klipp).
  - d "Solen kittlar": klipp till närbild, två strålar kittlar Lage på magen, en per "kille".
  - e "Skaka, skaka": samma bild, kameran andas ut, helikoptern skuttar två gånger av skratt, solen skrattar.
  - f "Solen blinkar": helbild, två blink och två glimtar.
  - g kroken "Gul är den gladaste färgen!": bananen, Humle och Pip dyker upp runt helikoptern, en per ord, alla med skrattande ansikten; på "Ha-ha!" guppar solen och sakerna två gånger och små gula hjärtan stiger.
  - h "Vinka, vinka": närbild, Lage vinkar två gånger, solen vinkar med en stråle.
  - i "Vad är gult? Titta ut!": tassen över ögonen åt båda hållen, kritsvep i himmelsblått hem (efter andra refrängen i turkos till dammen).
  - Sakerna är likadana båda gångerna, också i första refrängen innan humlan, bananen och Pip har hittats (som kotten i 007).
- **Bananen med ansikte**: `rekvisita/banan.md` finns; ansiktet ritas i kod (`BANAN` i ansikten.js, `skrattar`). I dammen (10d) skalas den: skalet är tre flikar i kod som fälls ner en i taget, och bitarna blir tre klistermärken med vit kant som delas ut.
- **Solhatten** (i `dammen/` eller en liten `hatt.js`): sitter på Kajsas huvud och följer det (förälder = huvudet), lyfter i vinden (09), seglar ut över dammen i en mjuk båge och gungar som ett löv, utan att snurra (09b), landar på näckrosbladet med en liten plopp-ring i vattnet (09c), följer med bladet när Gurra knuffar det till kanten (10c) och sätts tillbaka på Kajsas huvud. Beror på `rekvisita/solhatt-gul` (finns inte än).
- **Dammen**: `bakgrunder/dammen.md` finns. Näckrosbladen är egna lager (tre stycken, klippta ur plattan eller ritade i kod) som guppar när någon landar. Gurras ögon tittar upp ur vattnet bakom en vattenlinje (mask) i 09f. Gurra hoppar i lugna bågar från blad till blad, ett hopp per "hoppa" (014:s hopp, skuggan krymper när han lyfter).
- **Tre lugna hopp i solen** (10e): Lage, Kajsa och Gurra sida vid sida framifrån, hoppar i takt, skuggorna krymper, armarna upp på "jippi". Lage har klivit ur helikoptern här; att stå och hoppa är standardposer, så det kräver ingen ny pose.

## Varje scen får en `BEHOV.md`

Som i 007 och 013: det scenen behöver av kit, helikopter.js, sol.js eller bilderna och som inte finns än, så att det samlas på ett ställe.

## Väntar på Sanna

I den här ordningen, eftersom allt annat hänger på sången:

1. **Suno-tagningen** `../sang.m4a` (prompten i `../suno.md`). Den används oförändrad. Lyssna efter vilka ljud Suno redan har gjort (handklapp, shakern på "flapp", surr, slide whistle på "upp, upp", klockspelet på "kille", fniss, boing på hoppen) innan effekterna läggs (`../ljud.md`), och efter hur långa pauserna blev.
2. **`../rader.txt`**, som görs när `sang.m4a` finns (Whisper + korta klipp, takten ur librosa). Sedan får `storyboard/bygg.py` sina `tider()` och `lager/gor-lager.py` skriver `matt.json`.
3. **Bilderna** (görs i andra sessioner, se `../bildlista.md` och `../README.md`, "Behöver skapas"):
   - gula helikoptern med kaross, medar och svanspropeller var för sig (`rekvisita/helikopter-gul`), och Lage i helikoptern med svansen som eget lager (`i-helikoptern/`-json),
   - gula solhatten (`rekvisita/solhatt-gul`),
   - jättesolen (`bakgrunder/jattesolen`), annars ritas den i kod,
   - Kajsas rigg, och näckrosbladen som egna lager,
   - Grodan Gurra, Humlan Humle, Kycklingen Pip och Flygplanet Pella saknar referensark (`⏳` i `karaktarer/`); Lage, Kajsa och Fia är klara.
4. Ljudfilerna som saknas: `rotor`, `rotor-stopp`, `vind` (reserver finns, `../ljud.md`).

## Köra (när det finns något att köra)
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py
node render.mjs kritan-ritar 1 5 9.5 12   # stillbilder
node render.mjs kritan-ritar --snabb       # förhandsvisning
node render.mjs kritan-ritar               # hela scenen, en gång när den är klar
```
Förhandsvisa med `--snabb` och stillbilder, rendera fullt en gång när scenen är klar. Bara huvudsessionen bygger storyboarden och grovklippet, och högst två sessioner renderar samtidigt.
