# Kodscener – avsnitt 013 Röda sången (plan, 2026-11-06)

**Bara en plan, ingen kod än.** Sången finns (`../sang.m4a`, tider i `../rader.txt`), bilderna inte ännu. Upplägget är detsamma som i 007 och 014: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s). Tiderna kommer ur `../storyboard/bygg.py` (`tider()`, SÅNGTID) via `lager/gor-lager.py` → `lager/matt.json`, som `kit.manus()` läser, och ur "≈"-tiderna i `../rader.txt`.

**Sången klipps aldrig.** Suno-tagningen (`../sang.m4a`) används oförändrad och bilden anpassas till den. `INSATT` i bygg.py är tom, `../sang-klippt.m4a` är en kopia av `sang.m4a` (eller saknas: render.mjs tar då `sang.m4a`, som i 014), och avsnittstid = sångtid + 11 s (introt) hela vägen.

**Rörelseregler i alla scener:** figurer och fordon snurrar aldrig och vänds aldrig (2D-urklipp), de lutar och skuttar bara. Brandbilen åker alltid åt höger, också nerför kanan. Inga effektstreck (fart-, duns- eller strålstreck): farten syns med vita kritpuffar, Lovas svans och gosekaninens öron. Lugna hopp, rörelser på slagen, allt i par, en sak i taget.

## Scener

Bildnumren är storyboardens (`../storyboard.md`). Avsnittstiderna kommer ur `../rader.txt` (tagning 1, 3:06.5, ca 99,8 bpm, slaget 0,601 s) + 11 s och är scengränser på radstarter; storyboardens `tider()` bestämmer till slut. Läs alltid `M.bild()` i scenerna i stället för att skriva in tider.

| Scen | Storyboard | Avsnittstid ca | Innehåll | Status |
|---|---|---|---|---|
| `kritan-ritar/` | 01a–01c | 0:11.0–0:33.0 (sång 0:00–0:22.0) | Röda kritan ritar karossen, hjulen och stegen, blåljuset i gissningspausen, "En brandbil!", brandbilen gungar till, zoom in som vagen-1 fortsätter | ⏳ väntar på brandbilen |
| `vagen-1/` | 02a–04i | 0:33.0–1:19.2 (sång 0:22.0–1:08.2; refräng 1 0:43.7–1:07.4) | Körscenen (vägen glider, Pella i bakgrunden), vers 1, närbilden "du och jag", refräng 1 via `refrang.js` (vägen → äppelbacken → kanan → kritsvep hem) | ⏳ väntar |
| `vagen-2/` | 05a–07i | 1:19.2–2:01.7 (sång 1:08.2–1:50.7; refräng 2 1:27.6–1:50.3) | Brandbilen stannar, Bettan kör förbi och tutar, ballongen seglar ner och far iväg, frågan och pausen (tungan), refräng 2 via `refrang.js` | ⏳ väntar |
| `appeltradet/` | 08–12d | 2:01.7–2:43.9 (sång 1:50.7–2:32.9; vers 2 1:55.8, vers 3 2:16.3) | Kritsvep till äppelträdet, "krams", luckan med Nicke, stegen fälls upp men räcker nästan, snyft, det tysta slaget, Nicke flyger upp och knuffar loss äpplet, plopp, "Varsågod!" "Tack!", de delar och äter | ⏳ väntar |
| `discot/` | 13a–14c | 2:43.9–3:15.8 (sång 2:32.9–3:04.8; sista refrängen 2:42.5) | Discot i ljusrött: danspausen (Hulda stampar, Hugo viftar, Kanel hoppar), sammanfattningen med klistermärkena i en båge, kroken, "Hej då – tut, tut!" | ⏳ väntar |
| `slutet/` | 15 | 3:15.8–ca 3:20 (sång 3:04.8–3:06.5, sedan kritirisen) | Kritirisen sluter sig runt Lova i brandbilen, glimt, svart (som 006–007) | ⏳ väntar |

**Det tagningen ändrar i bilden** (sången klipps inte, bilden anpassas; se `../rader.txt`):
- **Frågepausen är bara ca 1,3 s** (sång 1:21.6–1:22.9) i stället för 4–5 s. Lovas ledtråd (slickar sig om munnen) får plats där, men barnet hinner knappt svara. Lösningen är Röda sången-sessionens och Sannas val (ny tagning eller att leva med det); inget klipps i sången.
- **Ingen lucka efter "krams, krams, krams"**: "Oj, oj!" kommer direkt (1:55.8). Repliken vid äppelträdet ("Hej, Nicke!" …, ca 7 s) har ingen plats i sången. I `appeltradet/` landar Nicke på kanten under "Äpplet är rött – krams" och pekar upp på "Oj, oj! Det sitter så högt!", utan repliker, om inget annat bestäms.
- **Efter "Vem kan hjälpa?" är det tyst ca 2,7 s** (2:13.6–2:16.3): Nickes ledtråd (surrar och lyfter) ligger där.
- **Sista refrängen har tre "Brandbil, brandbil – (ii-oo!)"** (2:51.8, 2:56.3, 2:59.1) och ett mellanspel på ca 2 s före kroken (2:45.2–2:47.1). Sången slutar på "tut, tut" (3:04.2–3:04.8) utan eget outro, så kritirisen börjar på sista tutet.

Refrängen på äppelbacken är ingen egen scen. Den är `refrang.js`, som vagen-1 och vagen-2 kör på sina tider (`refrang.ny(M, '04', S)` och `'07'`), likadan båda gångerna, som i 007 och 014. Molnövergångarna mellan scenerna läggs på i `../film/` (`film/moln/`), inte i scenerna.

## Kopieras (från 007, med det 014 redan har löst)

014 är byggt efter 007 och har redan Lova i ett öppet fordon, så de bitarna tas därifrån.

| Fil | Från | Ändras i 013 |
|---|---|---|
| `kit.js` | 007 | Takten ur 013:s tagning: `BEAT = 0.601`, `BEAT0 ≈ 0.09` (librosa, rakt rutnät, `../rader.txt`; kontrollera mot orden innan det används); om tagningen glider i tempo, 014:s `kit.takt` som fäster på de uppmätta slagen (`matt.json` `SLAG`). `FIGURER['leoparden-lova']` (rigg med ritade armar) från 014, plus Nicke. `LJUDFILER`: lägg till `glid: 1`, `vov: 1`, och `krams`, `stege`, `rull` med 0 tills filerna finns (se `../ljud.md`). `siren` läggs inte till. Kornet ur 013:s `lager/korn.png`. `kit.vag` för vägen; himlen och träden som `../../../bakgrunder/vagen.md` säger för 013 |
| `render.mjs` | 007 | Inget, utom att sångbiten tas ur `sang-klippt.m4a` om den finns, annars `sang.m4a` (som 014) |
| `ansikten.js` | 007 | Lägg till `LOVA` (från 014) och `NICKE` (ögon och mun uppmätta i `nyckelpigan-nicke-faceless.png`). Humören finns redan, också `slickar` och `skelogd` som frågan behöver |
| `verktyg/kant.js` | repo | Kopieras inte: varje scen laddar `../../../../verktyg/kant.js` direkt efter kit.js (skill `vita-kanter`). `kant.lagg(g, { andel: 0.01 })` på allt som ritas i kod: stegen, ballongen, äpplena, kanan |
| `kritsvep.js`, `kritsvep-korn.png` | 007 | Kritsvepet i rött (refrängens slut och till äppelträdet) |
| `klistermarke.js`, `ikonrad.js` | 007 | Bussen, ballongen och äpplet som klistermärken (refrängens krok och discots båge) |
| `discoljus.js`, `discot/` | 007 | Discot omfärgat ljusrött (`discot/gor-plat.py` som i 007), Hulda, Hugo och Kanel i stället för Mille och Gurra |
| `slutet/` | 007 | Kritirisen runt Lova i brandbilen |
| `refrang.js` | 007 (och 014) | Bara som mall: strukturen a–i, `refrang.ny(M, '04', S)`, att orden söks på slagen efter radens start (`M.rad(text, { efter })`), och att `r.rita(t)` nollställer kritsvepet. Innehållet skrivs nytt (se nedan) |
| `rutschbana.js` | 007 | Som mall för kanan: banan, åket längs en kurva och kameran som följer (`rb.ak`, `rb.kamera`) |
| `humla.js` | 007 | Som mall för Nicke: mjuka bågar, vingarna fläktar, en tur kan sluta med att han sätter sig, och han vänds bara mellan turerna, aldrig mitt i en |
| `lager/gor-lager.py` | 007 / 014 | Tar ut lagren och tiderna ur 013:s `storyboard/bygg.py` när den finns, utan blocket som skriver om `frames/` |

## Nytt i 013

- **`brandbil.js`** (efter 014:s `traktorn.js`, som var efter 007:s `lastbilen.js`): röda brandbilen åt höger med Lova i det öppna sätet, tassarna på kanten eller ratten, ryggstöd → Lova → armar → framdel → hjul. Samma `pose()` som traktorn (`x, y, h, tilt, dist, humor, titt, blink, m, r, l, lyft, tut`) plus:
  - `stege` 0..1, eller hellre i steg (0, 1, 2, …): stegen är ett eget lager som fälls upp kring sitt fäste bak på taket, ett steg per "upp", med ett litet överslag och stopp. I 11b stannar toppen en bit under äpplet (`b.stegtopp()` ger var toppen är i bild, så att äpplet kan placeras strax ovanför).
  - `blaljus` 0..1: blåljuset på taket lyser stilla med en mjuk glöd (ingen snabb blinkning) på "ii-oo".
  - `kanin`: gosekaninen fastspänd bak, bakom stegen, guppar med skumpen (007:s `kanin`), öronen fladdrar i kanan.
  - `svans`: Lovas svans fladdrar bakåt i farten (om riggen har svansen som egen del; annars bara öronen och puffarna).
  - hjälmen ritas i kod på Lova (Lova är låst, `✅ Referensark klart`, så ingen ny bild av henne).
  - `b.puffa(t, tider)` vita kritpuffar bakom brandbilen, `b.punkt()`, `brandbil.ljud(gupp)` som traktorn.
  - Beror på brandbilens bild och rigg (`assets/rekvisita/brandbil-rod/`) och Lovas plats i den (`leoparden-lova/i-brandbilen/`, som `i-traktorn/` i 014).
- **`refrang.js` för äppelbacken** (nytt innehåll, bildplan i `../refrang-plan.md`):
  - a "Röd, röd!": vägen, halvbild, två klapp, fyra röda kritprickar poppar upp.
  - b "Brandbil, brandbil": en tjock röd kritlinje målar vägen röd framför brandbilen och svänger mjukt uppåt; blåljuset lyser stilla på "ii-oo".
  - c "Upp på äppelbacken": klipp till backen (rund grön kulle, äppelträd, ljusblå himmel), två skutt uppför; den röda vägen blir kanan.
  - d–e "Kana, kana", "Svänga, svänga": **kanan** är en lång röd ränna med höga kanter i mjuka slingor, ritad i kod med krita och vit kant. Brandbilen glider längs en kurva i jämn takt, lutar bara med kurvorna (`tilt`), en vit puff per "svisch". Kameran följer i samma båge (inga klipp).
  - f "Äpplen som rullar": närbild, två äpplen trillar ner och rullar bredvid, ett per "rull" (äpplena glider och gungar, de snurrar inte).
  - g kroken: brandbilen glider ut på gräset nedanför; bussen, ballongen och äpplet åker kana efter som klistermärken, ett per ord, stannar på rad och guppar en gång på "Ii-oo!", himlen glöder ljusröd.
  - h "Tut, tut!": närbild, en vit ring per tut, brandbilen tutar själv på ekot.
  - i "Vad är rött? Titta ut!": handen över ögonen åt båda hållen, rött kritsvep hem till vägen.
  - Allt på äppelbacken ritas i kod först (refrang-plan.md: inga nya bilder). Finns det senare en bild av backen byts bara plattan.
- **`nicke.js`** (efter `humla.js`): Nicke flyger i lugna bågar med fläktande vingar (vingarna slår, kroppen snurrar aldrig), landar på brandbilens kant (10a), lyfter en bit på "Vem kan hjälpa?" (11d), flyger uppför stegen och förbi toppen (12a) och **knuffar äpplet** med huvudet: en liten framåtlutning och tillbaka, ingen rotation (12b). Han sitter på kanten och följer med när brandbilen guppar (förälder = brandbilens grupp, som humlan på flaket i 007).
- **Äpplet** (i `appeltradet/` eller en liten `appel.js`): hänger i toppen och gungar lätt, släpper på "plopp", faller i en mjuk båge utan att snurra, landar i Lovas tassar och delas i en stor och en pytteliten bit (klistermärken med vit kant). Samma äpple i refrängens klistermärken och discots båge.
- **Ballongen** (i `vagen-2/`): en röd ballong på ett snöre, ritad i kod tills bilden finns (`../README.md`, "Behöver skapas"). Seglar ner, stannar framför brandbilen, far upp en bit per "blås" och svävar iväg. Den smäller aldrig.
- **Bettan** i vagen-2: kit.js har redan bussens rörelser (`BUSS_RORELSE`, `bussGung`, `bussTut`, `bussStopp`, `bussStart`, `bussMotor`). Hon kör på andra sidan vägen och tutar tre gånger.

## Varje scen får en `BEHOV.md`

Som i 007: det scenen behöver av kit, brandbil.js eller bilderna och som inte finns än, så att det samlas på ett ställe.

## Väntar på Sanna

I den här ordningen, eftersom allt annat hänger på sången:

1. ~~Suno-tagningen~~ ✅ `../sang.m4a` (tagning 1, 2026-11-06, 3:06.5). Den används oförändrad. Lyssna efter vilka ljud Suno redan har gjort (tut, blås, bläää, surr, klockspelet på "upp, upp", slide whistle på "viiii", swoosh) innan effekterna läggs (`../ljud.md`).
2. ~~`../rader.txt`~~ ✅ gjord 2026-11-06 (Whisper + korta klipp, takten 0,601 s ur librosa). Kvar: `storyboard/bygg.py` får sina `tider()` och `lager/gor-lager.py` skriver `matt.json`.
3. **Bilderna** (görs i andra sessioner, se `../bildlista.md`):
   - röda brandbilen med stegen som eget lager, blåljuset och hjulen var för sig (`rekvisita/brandbil-rod`), och Lova i brandbilen (`i-brandbilen/`-json som `i-traktorn/` i 014),
   - äppelträdet (bakgrund) med det stora äpplet i toppen som egen del,
   - röda ballongen (annars ritas den i kod),
   - Bussen Bettan, Hästen Hulda och Hunden Hugo saknar referensark (`⏳` i `karaktarer/`); Kanel, Lova och Nicke är klara.
4. Ljudfilerna som saknas: `krams`, `stege`, `plopp`, `rull` (reserver finns, `../ljud.md`).

## Köra (när det finns något att köra)
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py
node render.mjs kritan-ritar 1 5 9.5 12   # stillbilder
node render.mjs kritan-ritar --snabb       # förhandsvisning
node render.mjs kritan-ritar               # hela scenen, en gång när den är klar
```
Förhandsvisa med `--snabb` och stillbilder, rendera fullt en gång när scenen är klar. Bara huvudsessionen bygger storyboarden och grovklippet, och högst två sessioner renderar samtidigt.
