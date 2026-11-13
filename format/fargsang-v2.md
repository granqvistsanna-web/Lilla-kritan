# Färgsång v2 – receptet från 013 Röda sången

013 Röda sången (färdig 2026-11-09, Sanna: *"im happy with the end result"*) är förlagan för nya färgsånger i art direction v2. Allt här är gjort och provat i `avsnitt/013-rod-brandbil/`; kopiera därifrån i stället för att börja om.

## Formen

| Del | 013 | Tid i filmen |
|---|---|---|
| Intro | formatets intro med jingeln, 9,0 s, slutar med ett kritsvep in i ritandet | 0:00–0:09 |
| Kritan ritar | konturen i ett lugnt drag (7 s), skogsljud under, kort väntan, riktiga bilden fylls i inifrån, "Ett rött äpple!", "Nu kör vi!" | 0:09–0:22 |
| Vers 1 och refräng 1 | körscen på vägen, en röd sak i taget, refrängen på en egen plats (äppelbacken) | 0:22–1:31 |
| Danspaus | sakerna dansar (äppelmarschen) | 1:31–1:47 |
| Discot | tre djur dansar, klistermärken med det vi hittat, sista refrängen, hejdå | 1:47–2:29 |
| Slutet | kritirisen | 2:29–2:43 |

Max 3 figurer och 2 platser gäller som vanligt; discot och refrängplatsen är medvetna undantag (se `regler.md`).

## Filerna

| Fil | Vad |
|---|---|
| `storyboard-v2/storyboard.md` | **Tabellen styr allt:** `| id | m:ss.s | plats | ljud | bild |`. Tiden är avsnittstid och läses av `film.js`, så en ändrad tid här flyttar filmen |
| `storyboard-v2/scen-kit.js` | Allt som ritas: platser, saker, fordon, kameran, kritsvepet (`rodsvep`). Samma kod ritar storyboarden (`board.html`) och filmen |
| `storyboard-v2/kanel-motor.js` | Figurens rigg (från `lk-figur`) |
| `scener/film.js` | Rörelsen per storyboardbild: `'04c': (u, s, d) => …` (u = 0–1 i bilden, s = sekunder in, d = längd), plus `SVEP` (tiderna för kritsvepen) |
| `scener/<scen>/index.html` | En scen per plats: sätter `window.SCEN = [första, sista]` och `window.ROSTER` (berättarens repliker med avsnittstid) |
| `scener/render.mjs` | `node scener/render.mjs scener/<scen>` (film), `… --snabb` (förhandsvisning), `… scener/<scen> 2 7.5` (stillbilder), `node scener/render.mjs intro` |
| `film/satt-ihop.sh` | Intro + scenerna i ordning, sången, effekterna, skogsljudet → `film/avsnitt-NNN-grovklipp.mp4` |
| `ljud.md`, `rader.txt`, `suno.md` | Ljudlistan, sångens ordtider (whisper), Suno-prompten |

## Tre tidsbaser

Håll isär dem, annars hamnar varje ändring fel:

- **Sångtid**: tid i `sang.m4a`. **Avsnittstid = sångtid + 24,5** (013).
- **Avsnittstid**: storyboardtabellen, `SVEP`, `ROSTER`.
- **Filmtid**: det Sanna ser och skriver i feedbacken. Introt kortades 11,3 → 9,0 s och väntan efter konturen klipps bort (`KAP`), så **filmtid = avsnittstid − 2,3** fram till klippet och **− 3,8** efter det (013).
- **Stillbilder** tas i **scentid**: 0 = scenens första bild (vägen börjar på avsnittstid 26,5, äppelmarschen 95,3, discot 110,6).

Räkna om Sannas filmtid till avsnittstid innan du letar i koden, och skriv formeln i avsnittets README.

## Ritintrot

**Hela receptet står i [ritintro.md](ritintro.md)** (2026-11-10, gäller före det som står här).

- Introt slutar med ett kritsvep som drar rakt in i ritandet. Ingen papperszoom.
- Kritan ritar **konturen i ett drag, lugnt** (01a ca 7 s), sedan blad och skaft. Den riktiga bilden fylls i inifrån först på svaret.
- **Skogsljud** (`assets/ljud/effekter/skogsljud/skogsljud-1.m4a`) under hela ritandet: från svepet ut ur introt tills sången har börjat, volym 0,4, in 1,2 s och ut 2,2 s.
- Väntan efter konturen kortas i `satt-ihop.sh` med `KAP0`/`KAP`. **Tre saker flyttas ihop**: `KAP`, sångens `adelay` och storyboardraden för 01b. Gör konturen längre, så kortas väntan lika mycket och sången står kvar i takt.
- Repliken *"Vad kan det vara?"* används aldrig. 013 säger *"Titta!"* när kritan börjar rita och *"Något runt."* medan konturen ritas, en ledtråd om formen före svaret (Sanna 2026-11-09: kort är bättre; "i asked for malin to add the line något runt in drawing scene"). Nästa avsnitt gör likadant: *"Något långt."* för bananen i 011.

## Kritsvepet

- `rodsvep(k, false)` i `scen-kit.js` och en kopia (`svepIn`) i introt, i avsnittets färg. **Ingen sak i svepet** (äpplet som blinkade förbi togs bort).
- Faser: in 0–0,46, helt i färg 0,46–0,54 (klippet sker här), ut 0,54–1. `SV = 0.8`, så hela svepet tar 1,6 s.
- Vaxkornet är 006:s: `kritsvep-korn.png` som mask, så att papperet skymtar i färgen, och en förskjutning som ger trasiga kritkanter (`svepVax()`). Elva breda vaxdrag i den mörkare tonen och en streckad vit kant.
- Kritan sicksackar vid kanten under in-fasen.
- Lägg svepet där sången byter plats och kontrollera det i filmen: i 013 flyttades svepet vid 1:10 senare och det vid 1:30 tidigare.

## Figurer och fordon (lärdomar)

- **Speglad scen:** 013:s scener ritas spegelvänt. Ett positivt `BX` flyttar brandbilen åt **vänster** på skärmen, och kaninens `arm-l` sitter på motorhuvsidan. Prova en stillbild innan du ändrar ett tecken.
- **Armarna i bilen:** riktningsposens bortre arm glider in bakom kroppen först nära en hel vändning, annars ser ena armen kortare ut. Tassen på motorhuvsidan lyfts så att den syns.
- **Klapp:** händerna ska mötas över magen, annars syns inget klapp.
- **Munnar i discot** öppnas bara på slaget och är mindre (0,72), annars ser figurerna "nya" ut.
- **Hejdå:** vinkningarna börjar en i taget (0,25 s isär). Fordonet kör fram bakifrån genom en lucka mellan dansarna och växer mjukt; dansarna krymper samtidigt.
- **Ingen slump som byter bild:** äppelträd får ett fast antal äpplen (annars flimrar de).
- **Glitter** sätts i en ring runt sakens egen form (mitt och radie per sak), inte i en fast ruta.
- **Klistermärken i discot** balanseras två och två runt kulan.

## Vita kanter

Bakade kanter med `verktyg/tunn_kant.py`, regeln 3 px + 1 % av höjden i bild (skillen `vita-kanter`). Mät stora saker: i 013 var träd, ballong, blomma och stora äpplen för tjocka och fick `-tunn.png`-kopior. Har bilden en grå skugga under kanten, kör `--skugga`.

## Rendera och bygga

1. Spara den gamla filmen först: `cp film/avsnitt-NNN-final.mp4 film/avsnitt-NNN-final-fore-<runda>.mp4`.
2. Rendera **högst två scener åt gången** (fem samtidigt kraschade Playwright). Kraschar en scen, rendera om den.
3. `bash film/satt-ihop.sh`, sedan `cp film/avsnitt-NNN-grovklipp.mp4 film/avsnitt-NNN-final.mp4`. *"No space left on device"* går över, kör igen.
4. Kontrollera: längden, stillbilder på det som ändrats (beskär nära), whisper på sångstarten (sången ska börja direkt efter "Nu kör vi!"), och volymen där ett nytt ljud lagts.

## Berättarens repliker

ElevenLabs "Malin – Professional Swedish Narration", Eleven v3, stability 0,5, similarity 0,75. Tagningen trimmas med `silenceremove…areverse…apad=pad_dur=0.05`, läggs i `assets/ljud/roster/<repliken>-N.m4a`, originalet i `produktion/ljud-original/roster/<avsnitt>/` med en rad i dess README, och repliken i scenens `ROSTER`.

## Lärdomar från 011 Gula sången (2026-11-13)

011 gjordes om tre gånger (007:s berättelse → systrarnas form → ny sång v5) och fick nio QA-rundor. Det här hade sparat de flesta.

**Innan sången görs**
- **Lås formen först.** 011 planerades som en 007-berättelse med repliker och byttes till 013:s form när sången redan fanns. Ny form betydde ny Suno-tagning, ny storyboard och nya scener. Bestäm formen (det här receptet) innan Suno.
- **Suno-prompten** ber om riktiga pauser (en tyst takt efter frågan) och inga långa mellanspel.

**Bilden**
- **Figuren har avsnittets färg:** ge fordonet en annan ton av färgen (011: citrongul helikopter `#FFE14D` mot varmt solgul Lage `#F2B544`) och låt inget annat i bakgrunden ha färgen. Bara målen får vara gula.
- **Kontinuitet över klipp:** det som står i bilden före ett klipp på samma plats ska stå kvar efter det. I 011 försvann solen på klippet vid 1:44 och stenen i introt. Titta på bildparet runt varje klipp innan slutrenderingen.
- **Uppåt till en ny plats:** gör en riktig åkning (marken glider ut nertill, ett molnband på en skärmhöjd passerar) i stället för en toning.
- **Figur i fordon:** lyft figuren så att vinkarmen syns över kanten, men ta en stillbild i det högsta läget. Vid 0:47 lyfte 60 px manen genom kupolen upp i rotormasten; 22 px räckte.
- **Kawaii-ögon är en krydda:** högst tre gånger per avsnitt, på topparna (011: 04e, 07e, 10k). Byten mellan ögon går via en blinkning.

**Tempo (QA-rundan)**
- Ingen helbild står still längre än ca 5 s: byt till en närbild (10f), eller låt kameran glida långsamt in och ut (11g, förut 14,5 s still).
- Saker som dyker upp på orden (klistermärkena) får en reaktion: figurerna tittar upp förvånat mot varje.
- Sången klipps aldrig. Det är bilden som anpassas.

**Ljud och slutrendering**
- Mastra till ca −14 LUFS med toppen under −1,5 dBFS (011 låg först på −16,2). `bash verktyg/qa-film.sh` ska inte visa något fryst eller tyst över 3 s utom det planerade svarta slutet.
- Rendera högst två scener åt gången (`--samtidigt 2`). Går renderingen segt, kör `uptime`: tre gamla ffmpeg-processer för storyboardens animatik låg kvar i 30 timmar och gav belastningen ~780.
- Kolla kapitlen i `youtube.md` mot den slutliga filmen innan uppladdning.
- Feedback samlas på feedbacksidan (`produktion/youtube/feedback.html`). Läs de öppna punkterna innan varje runda.
