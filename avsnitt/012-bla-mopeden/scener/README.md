# Kodscener – avsnitt 012 Blå sången (plan, 2026-11-06)

**Bara en plan, ingen kod än.** Det finns ingen Suno-tagning och inga bilder ännu. Upplägget är detsamma som i 007, 013 och 014: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s). Tiderna kommer ur `../storyboard/bygg.py` (`tider()`, SÅNGTID) via `lager/gor-lager.py` → `lager/matt.json`, som `kit.manus()` läser, och ur "≈"-tiderna i `../rader.txt`.

**`../rader.txt` görs när Sanna har levererat `../sang.m4a`** (Whisper + korta klipp, takten ur librosa, som i 013). Tills dess är alla tider nedan storyboardens uppskattningar (≈, 96 bpm, slaget ca 0,625 s).

**Sången klipps aldrig.** Suno-tagningen används oförändrad och bilden anpassas till den. `INSATT` i bygg.py är tom, `../sang-klippt.m4a` är en kopia av `sang.m4a` (eller saknas: render.mjs tar då `sang.m4a`, som i 014), och avsnittstid = sångtid + 11 s (introt) hela vägen. (Storyboardens "förläng i klippet" och "lägg in takter som i 007" gäller inte längre: bilden anpassas i stället.)

**Rörelseregler i alla scener:** figurer och fordon snurrar aldrig och vänds aldrig (2D-urklipp), de lutar och skuttar bara. Mopeden kör alltid åt höger, också inuti jättebubblan: bubblan svävar och gungar, mopeden ligger stilla i den och lutar högst lite. När Kanel "vänder sig om" mot flaggan (08) tittar hon bakåt med ögonen och lutar huvudet lite, kroppen vänds inte. Bara hjulen snurrar. Inga effektstreck (fart-, duns- eller strålstreck): farten syns med bubblorna ur avgasröret, öronen och flaggan. En bubbla som spricker blir en liten ring av vita kritprickar, ingen blixt. Lugna hopp, rörelser på slagen, allt i par, en sak i taget.

## Scener

Bildnumren är storyboardens (`../storyboard.md`). Avsnittstiderna är storyboardens uppskattningar och blir scengränser på radstarter när `rader.txt` finns; storyboardens `tider()` bestämmer till slut. Läs alltid `M.bild()` i scenerna i stället för att skriva in tider.

| Scen | Storyboard | Avsnittstid ≈ | Innehåll | Status |
|---|---|---|---|---|
| `kritan-ritar/` | 02–02c | 0:11–0:29 (sång 0:00–0:18) | Blå kritan ritar hjulen och kåpan, sadeln, styret och lampan i pausen, "En moped!", två bubblor ur avgasröret, zoom in som vagen-1 fortsätter | ⏳ väntar på sången och mopeden |
| `vagen-1/` | 03–05h | 0:29–1:06 (sång 0:18–0:55) | Teckningen blir Kanels moped, "Hej hej!", mellanspelet med Pella högt uppe, vers 1 (bubblor per "putt", en på nosen, kritan sveper blått över väggen), refräng 1 via `refrang.js` (vägen → bubbelhavet → himlen → kritsvep hem) | ⏳ väntar |
| `vagen-2/` | 06–09h | 1:06–1:58 (sång 0:55–1:47) | Blåklockorna nickar, bollen studsar över vägen och Kanel stannar, frågan och pausen (flaggan), "Vift, vift, vift!", refräng 2 via `refrang.js` | ⏳ väntar |
| `appeltradet/` | 10–13e | 1:58–2:59 (sång 1:47–2:48) | Kritsvep till äppelträdet, Pella flyger förbi, mopeden puttrar in, Kaj och hinken, luckan, hinken i korgen, hinken välter, bären rullar, snyft, det tysta slaget (Pips tofs), Pip pickar, alla plockar, en näve var, blå tungor, "Tack!", kritan sveper blått och Pella flyger in | ⏳ väntar |
| `discot/` | 14a–15a | 2:59–3:20 (sång 2:48–3:09) | Discot i ljusblått: danspausen (Gurra hoppar, Disa stampar, Tuff tutar, alla dansar), sammanfattningen med klistermärkena i raden, kroken där de får bubblor som spricker på "Plopp!" | ⏳ väntar |
| `slutet/` | 15b–16 | 3:20–ca 3:28 (sångens slut, sedan kritirisen) | Kritsvep tillbaka till äppelträdet under blå himmel, alla vinkar hej då till Pella, mopeden puttrar två gånger, kritirisen sluter sig runt Kanel, glimt, svart | ⏳ väntar |

Refrängen (bubbelresan) är ingen egen scen. Den är `refrang.js`, som vagen-1 och vagen-2 kör på sina tider (`refrang.ny(M, '05', S)` och `'09'`), likadan båda gångerna, som i 007, 013 och 014. Molnövergångarna mellan scenerna läggs på i `../film/` (`film/moln/`), inte i scenerna. `slutet/` börjar på äppelträdet i stället för i discot (som 007:s slut på kolastranden), så skarven discot → äppelträdet är ett kritsvep i scenen.

**Att kolla i tagningen** (sången klipps inte, bilden anpassas):
- **Gissningspausen** (02b) ska helst vara 4–5 s. Blir den kortare ritas sadeln och styret redan under "vad kan det vara?" (sången har raden två gånger) och bara lampan i pausen.
- **Frågepausen** (08a) ska vara 3–5 s. Blir den kortare blinkar Kanel bara inte, och flaggans ledtråd kommer redan på "Kan du se?".
- **Luckan efter "små, små, små"** (11a) behöver ca 8 s. Saknas den, som i 013, håller Kaj bara fram hinken, säger `mjau` och ställer den i korgen, utan repliker.
- **Bollen (07–07a)**: stryks bollen i sången försvinner 07–07a och "Bollen – blå!" i 15a, och vagen-2 blir kortare.

## Kopieras (från 007, med det 013 och 014 redan har löst)

014 är byggt efter 007 och har redan alla figurer som behövs i `FIGURER` och ett fordon med figuren i, så de bitarna tas därifrån.

| Fil | Från | Ändras i 012 |
|---|---|---|
| `kit.js` | 014 (efter 007) | Takten ur 012:s tagning (`BEAT`, `BEAT0` ur librosa i `../rader.txt`, och 014:s `kit.takt` som fäster på de uppmätta slagen i `matt.json` `SLAG` om tagningen glider). `FIGURER`: `kaninen-kanel`, `katten-kaj`, `kycklingen-pip`, `flygplanet-pella`, `grodan-gurra`, `dinon-disa`, `traktorn-tuff` finns i 014:s kit. `LJUDFILER`: lägg till `mjau: 1`, `pick: 1`, `hink-dunk: 1`, `rull: 1` (`pip` och `plopp` finns redan), och `bubbla`, `moped`, `klonk` med 0 tills filerna finns (se `../ljud.md`). Kornet ur 012:s `lager/korn.png`. `kit.vag` för vägen; väggarna som `../../../bakgrunder/vagen.md` och `appeltradet.md` säger för 012 |
| `render.mjs` | 014 | Inget, utom att sångbiten tas ur `sang-klippt.m4a` om den finns, annars `sang.m4a` |
| `ansikten.js` | 014 | Lägg till `KANEL`, `KAJ` och `PIP` om de inte redan finns (uppmätta i de ansiktslösa bilderna). Humören finns, också `slickar`, `skelogd` och `karleksfull`. Två tillägg: en **blå tunga** (`tunga: '#3A4FB8'` som val, i stället för `TUNGA`) för 13d, och **en liten tår** till `ledsen` för 12b (`../README.md`, "Behöver skapas" 10, görs i scenernas `ansikten.js`, inte i `verktyg/`) |
| `mjukaposer.js` | 014 | Som det är: mjuka poser för Kanel, Kaj och Pip |
| `verktyg/kant.js` | repo | Kopieras inte: varje scen laddar `../../../../verktyg/kant.js` direkt efter kit.js (skill `vita-kanter`). `kant.lagg(g, { andel: 0.01 })` på allt som ritas i kod och är en sak: flaggan, bollen, blåklockorna, de lösa blåbären, klistermärkena. Bubblorna har sin egen tunna vita kritkant (se nedan) och får ingen extra |
| `kritsvep.js`, `kritsvep-korn.png` | 007 | Kritsvepen i himmelsblått (till himlen i refrängen), vägens gröna (hem), äppelträdets orange (till äppelträdet) och discots blå. Nytt läge, se nedan: ett svep som färgar väggen blå en stund |
| `klistermarke.js`, `ikonrad.js` | 007 | Blåklockan, bollen, flaggan, blåbäret och mopeden som klistermärken (refrängens sakbubblor och discots rad) |
| `discoljus.js`, `discot/` | 007 | Discot omfärgat ljusblått (`discot/gor-plat.py` som i 007), Gurra, Disa och Tuff i stället för Mille och Gurra |
| `slutet/` | 007 / 013 | Kritirisen runt Kanel, men på äppelträdet efter 15b |
| `refrang.js` | 007 (och 013, 014) | Bara som mall: strukturen a–h, `refrang.ny(M, '05', S)`, att orden söks på slagen efter radens start (`M.rad(text, { efter })`), och att `r.rita(t)` nollställer kritsvepet. Innehållet skrivs nytt (se nedan) |
| `lastbilen.js` / `traktorn.js` | 007 / 014 | Som mall för `moped.js` (se nedan) |
| `kit.js` buss (`BUSS_RORELSE`, `bussStopp`, `bussStart`) | 007 | Som mall för mopeden som stannar för bollen och puttrar in under äppelträdet: mjuk inbromsning, står still, mjuk start |
| `lager/gor-lager.py` | 007 / 014 | Tar ut lagren och tiderna ur 012:s `storyboard/bygg.py` när den finns, utan blocket som skriver om `frames/` |

## Nytt i 012

- **`moped.js`** (efter 014:s `traktorn.js`): blå mopeden åt höger med Kanel på sadeln. Kåpan döljer benen, så inga ben behövs. Lagren bakifrån: flaggan på sin pinne → korgen (med hinken) → Kanel → kåpa, sadel och styre med lampan → Kanels tassar på styret → hjulen. Samma `pose()` som traktorn (`x, y, h, tilt, dist, flagg, humor, titt, tittY, blink, m, r, l, lyft`) plus:
  - `skutt`: Kanel skuttar på sadeln (två lugna skutt på "Blå, blå!", ett per studs i 07a). Mopeden gungar med, den hoppar inte.
  - `oron`: öronen bär rörelserna, om Kanels rigg har dem som egna delar: de far upp på "Blå!", svänger som klockor på "ding" och viftar på "vift". Har riggen inte öronen var för sig lutar huvudet i stället (ingen ny bild av Kanel, hon är låst ✅).
  - `flagg`: den lilla blå flaggan (`flagga-rosa` omfärgad, som i 006–007) fladdrar av sig själv och mer när det blåser (08b).
  - `hink` 0..1: hinken i korgen bak, efter 11a. Den tippar i korgen när mopeden putter till (12) och bären rullar ut.
  - `lampa`: den gula lampan lyser stilla.
  - `m.bubbla(t)`: en bubbla puffar ut ur avgasröret (se `bubblor.js`), `m.punkt()` (var avgasröret, styret och korgen är i bild), `moped.ljud()` som traktorn (motorn lågt medan den kör, en `bubbla` per puff).
  - Beror på mopedens bild (`assets/rekvisita/moped-bla/`, kåpa, sadel, styre och korg i en bild, hjulen var för sig) och Kanels plats på den (`kaninen-kanel/pa-mopeden/`-json, som `i-traktorn/` i 014).
- **`bubblor.js`**, avsnittets bubblor, alla ritade i kod på samma sätt (`../refrang-plan.md`): en genomskinlig blå cirkel (`#7FB8F0` med 35 % täckning), en tunn vit kritkant och en vit glimt uppe till vänster. De gungar lite och snurrar inte (glimten sitter alltid uppe till vänster).
  - `b.puff(t, x, y)`: en liten bubbla ur avgasröret som stiger, driver bakåt och spricker efter en stund. Det löpande skämtet från 02c till slutet.
  - `b.spricker(t)`: en liten ring av vita kritprickar som vidgas och tonas bort på ca 0,3 s. På bubblan på nosen (04, 05c) blinkar Kanel `skelogd`.
  - `b.moln` och `b.hav`: bubbelmolnet som driver in (05b) och bubbelhavet (05c–05d) i tre lager som glider olika fort. Lagom många (ca 60–80, återanvända med `<use>`), och kornfiltret på lagret, inte på varje bubbla, så att renderingen inte blir seg.
  - `b.jatte`: jättebubblan som växer runt Kanel och mopeden och sluter sig med en glimt (05e), lyfter två lugna lyft, svävar med mopeden stilla inuti (05f) och spricker i en ring av prickar på "Plopp!" (05g). Mopeden ritas i bubblans grupp men med egen lutning nära 0.
  - `b.sak(klistermarke)`: en liten bubbla med ett klistermärke inuti (blåklockan, bollen, flaggan, blåbäret) som flyter upp på kroken, en per ord, likadana båda gångerna. I discots rad (15a) får klistermärkena samma bubblor, som spricker på "Plopp!".
  - `b.kudde`: kudden av bubblor som mopeden landar på, två mjuka gungningar (05g, "Mjukt, mjukt").
  - Finns det senare en bild av bubbelhavet (`bakgrunder/bubbelhavet.md`, frivillig) byts bara havets bakre lager.
- **`refrang.js` för bubbelresan** (nytt innehåll, bildplan i `../refrang-plan.md`):
  - a "Blå, blå!": vägen, halvbild, två skutt på sadeln, en bubbla per "blå", fyra i rad med ekot.
  - b "Moped, moped": kameran följer, en bubbla per "putt", bubbelmolnet driver in från höger.
  - c "In i bubblorna": kameran glider in i bubbelhavet, kritan sveper blått över väggen, två bubblor spricker mot nosen.
  - d "Peta, peta": klipp till närbild, Kanel petar på två bubblor, de spricker på ekot.
  - e "Upp i en bubbla": helbild, jättebubblan sluter sig, två lyft, kritsvep i himmelsblått till himlen (`bakgrunder/himlen.md`, gärna lite mörkare blå så att mopeden syns).
  - f "Förbi flygplanet": bubblan svävar åt höger bland molnen, Pella flyger förbi lite högre upp åt samma håll, båda vinkar två gånger.
  - g kroken "Blå är den bubbligaste färgen! (Plopp!)": sakbubblorna flyter upp, en per ord, jättebubblan spricker på "Plopp!"; på "Mjukt, mjukt" dalar mopeden ner på bubbelkudden (kameran följer ner i samma bild).
  - h "Vad är blått? Titta ut!": kritsvep i vägens gröna hem, tassen över ögonen åt båda hållen.
- **Färgsvepet** (i `kritsvep.js`, nytt läge): kritan sveper blått över väggen och färgen ligger kvar en stund, i stället för att täcka hela bilden som en övergång. Används på "Himlen är blå" (04, tonas bort igen), i bubbelhavet (05c) och på "Titta upp" (13e, ligger kvar så att himlen är blå till slutet).
- **Blåklockorna** (06–06a): en liten grupp vid vägkanten, lager eller ritade i kod (`rekvisita/blaklockor.md` om den görs). De nickar en gång per "ding", en liten lutning kring stjälkens fot.
- **Bollen** (07–07a): blå, i kod eller `rekvisita/boll-bla` (`boll-rod` omfärgad). Studsar tre gånger i lugna bågar över vägen och ut, trycks ihop lite när den landar, snurrar inte. Vägen slutar glida medan Kanel väntar.
- **Äppelträdet** (`bakgrunder/appeltradet.md` finns): mopeden på den tomma golvytan mitt i bild, inte framför den bruna stammen (Kanel är brun). Hinken (`rekvisita/hink-bla.md` finns, med bär i, eller `rekvisita/blabar.md` om den görs) och lösa blåbär: 3–5 runda bär i kod som rullar ut åt alla håll och blir mindre och mindre (12a), glider utan att snurra.
- **Pip pickar** (13a): huvudet doppar ner en gång per pick (rotation av huvudet i riggen, kroppen vänds inte), ett bär i taget till hinken.
- **Pella** syns i 03b, i båda refrängerna (05f, 09f), i 10a, 13e och 15b, alltid åt höger, med sitt röda band. Mot den blå himlen bär den vita kanten, den gula propellern och bandet henne.

## Varje scen får en `BEHOV.md`

Som i 007 och 013: det scenen behöver av kit, moped.js, bubblor.js eller bilderna och som inte finns än, så att det samlas på ett ställe.

## Väntar på Sanna

I den här ordningen, eftersom allt annat hänger på sången:

1. **Suno-tagningen** `../sang.m4a` (prompten i `../suno.md`). Den används oförändrad. Lyssna efter vilka ljud Suno redan har gjort (putt-putt, leksakstutan, bubbelploppen, klockorna på "ding", handklappen, träklossen på "studs") innan effekterna läggs (`../ljud.md`), och efter hur långa pauserna och luckan blev.
2. **`../rader.txt`**, som görs när `sang.m4a` finns (Whisper + korta klipp, takten ur librosa). Sedan får `storyboard/bygg.py` sina `tider()` och `lager/gor-lager.py` skriver `matt.json`.
3. **Bilderna** (görs i andra sessioner, se `../bildlista.md` och `../README.md`, "Behöver skapas"):
   - blå mopeden med hjulen var för sig (`rekvisita/moped-bla`), och Kanel på mopeden (`pa-mopeden/`-json),
   - blåbärshinken och lösa blåbär (`rekvisita/blabar` eller `hink-bla` med bär),
   - blåklockorna och den blå bollen, om de inte ritas i kod,
   - Kaj med hinken (pose),
   - Katten Kaj, Kycklingen Pip, Flygplanet Pella, Grodan Gurra, Dinon Disa och Traktorn Tuff saknar referensark (`⏳` i `karaktarer/`); Kanel är klar.
4. Ljudfilerna som saknas: `bubbla`, `moped`, `klonk` (reserver finns, `../ljud.md`).

## Köra (när det finns något att köra)
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py
node render.mjs kritan-ritar 1 5 9.5 12   # stillbilder
node render.mjs kritan-ritar --snabb       # förhandsvisning
node render.mjs kritan-ritar               # hela scenen, en gång när den är klar
```
Förhandsvisa med `--snabb` och stillbilder, rendera fullt en gång när scenen är klar. Bara huvudsessionen bygger storyboarden och grovklippet, och högst två sessioner renderar samtidigt.
