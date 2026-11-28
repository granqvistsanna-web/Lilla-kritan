# 065 Våren i boken – djup QA (2026-11-27)

Granskat: `scener/boken/boken.mp4` (22:10, nyare än `boken.js` 21:34, `index.html`/`render.mjs` 20:21 och `rader.mjs` 19:59). Filmen är en **snabb förhandsvisning** (960×540, 15 fps), inte en slutrendering. Längd 3:53,9 (233,95 s).
Metod: `qa-film.sh` och `qa-scen.py`, hela filmen i kontaktark med 6 bilder/s, 32 bilder i full storlek runt händelserna, ljudet mätt (LUFS, toppar, tystnader, replikernas tider), Whisper på röstfilerna, koden läst och jämförd med 062.
**Märkning:** *[sett]* = syns i bildrutorna. *[kod]* = slutsats ur koden, inte bekräftad i bild.

## Status efter rättningen (2026-11-28)

Rättat i `scener/boken/boken.js`, `storyboard/rader.mjs` och `scener/boken/rader.json`, plus två ljudstarka kopior i `assets/ljud/effekter/`. Inget är committat. Varje rättning är kontrollerad i stillbilder och täta bitar (`--snabb`, varje bildruta runt varje ändrad rörelse). Status står under varje fynd.

- **Delad rättning A (ryck vid glidstart):** `paZ(p, m, z)` som i receptet, i `glid()` och i rad 28.
  - Mätningen visade tre ryck till, och de är rättade:
    - `iFov` behåller fov genom glidningen och skalar avståndet;
    - fokus och oskärpa tonas över glidningen;
    - en vy kortare än 1,5 s före en glidning står still.
  - Bildskillnaden i första bildrutan är jämn vid alla 20 glidstarter.
- **Delad rättning B (stängningen):**
  - STANG = 231,05 s och rad 28 = 3,6 s, så scenen är 234,65 s.
  - Kameran glider ut från r.s + 0,1 till `UT_KLAR` = STANG + 1,5 och pushar sedan ×0,97 till slutet.
  - Musens kort fälls vid STANG + 1,2 och korten vid STANG + 1,25 … 1,65 (0,35 s var). Kannan fälls som de andra korten.
  - `PARM_NER` = [STANG + 1,8, STANG + 2,5]. Prasslet ligger på 1,15 och `landa-mjuk` på 2,45, när pärmen landar.
  - `VY.slut` = pos (0; 2,55; 4,05), sikte (0; 0,12; −0,12), fov 32.
  - Den stängda boken står ca 1,1 s, hel och centrerad. Pärmen korsar aldrig kameran (sett i varje bildruta).

## Omdöme

1. Berättelsen bär: tulpanerna som hänger och reser sig, 1-2-3-räkningen, fjärilen som landar på huvudet och boet fungerar. Rytmen och Malins tider stämmer.
2. Men ljudbädden och vattenljudet hörs inte alls, och flera bilder visar inte det Malin pratar om: djuren på blommorna, lila tulpanen, musen vid boet.
3. Rätta de fyra felen nedan och de tre första förbättringarna före slutrenderingen. Allt annat är putsning.

---

## Fel (måste rättas)

### F1. Fågelkvittret tar slut efter 25 s och är för svagt; vattenljudet hörs inte (hela filmen)
- **Mätt, två orsaker som samverkar:**
  1. **Bädden loopar inte.** `fagelkvitter-1.m4a` är 25,0 s lång. I filmen är pauserna efter 0:25 digitalt tysta: medelnivån är −91,0 dB vid 157,0 s och 184,4 s.
     *Orsak:* `scener/render.mjs:50` blandar varje ljud med `volume` + `adelay` men läser aldrig `loop`, `langd`, `fade` eller `fadeIn`. Filen är identisk med 062:s och 063:s render.mjs (samma fel hittades i 063-granskningen, se den delade anteckningen). `boken.js:648` begär `loop: true, langd: DURATION`, men det ignoreras.
  2. **Bädden är för svag även när den spelas.** Källfilen ligger på −49,5 LUFS (filerna 2–4 ligger på −47 till −52), medan 062:s `skogsljud-1` ligger på −26,7. Vid 15,3 s (innan bädden tar slut) mäter pausen −71,4 dB i medel. Bädden är alltså ca 25 dB svagare än i förlagan.
- Tillsammans ger det `qa-film.sh` tre tysta partier över 3 s: 15,2 s (4,1 s), 156,9 s (4,5 s) och 184,3 s (4,4 s). Det finns fler tysta pauser som är kortare än 3 s.
- `regn-droppar-1` (vattningen) ligger på −52,7 LUFS (topp −28,7) och spelas med vol 0,5 × 0,4, alltså ca 30 dB under Malin. Vattningen hörs inte.
- **Varför det spelar roll:** pauserna där barnet ska svara blir helt tysta från 0:25 till slutet, och vattningen (handlingen som löser problemet) har inget ljud.
- **Rättning:**
  1. Lägg till stöd för `loop`, `langd`, `fade` och `fadeIn` i `render.mjs`: `-stream_loop -1` före `-i`, och `atrim=duration=<langd>` och `afade` i kedjan. Gör det en gång i alla bokavsnitts render.mjs, eftersom det är delad kod.
  2. Normalisera fågelkvittret till ca −28 LUFS och `regn-droppar-1` till ca −30 LUFS, eller välj starkare filer. Höj inte bara vol, eftersom bruset följer med.
  3. Mät igen: pauserna ska ligga runt −42 LUFS som i 062.
- Samma fel i render.mjs gör att kritans ritljud (4 s) spelas till slut i stället för att klippas vid `langd`. Ritningarna är 3,3 och 2,6 s (`boken.js:339`, `341`), så ljudet fortsätter ca 1 s efter att kritan slutat rita. Det är en liten sak, men den rättas med samma ändring.
- **Status: rättat.** Huvudsessionen lade in `loop`, `langd` och `fade` i `render.mjs`. Jag gjorde ljudstarka kopior, originalen finns kvar: `fagelkvitter-1-stark.m4a` (+22,8 dB, −26,8 LUFS) och `regn-droppar-1-stark.m4a` (+26 dB, −26,8 LUFS). Bädden ligger på vol 0,4 och vattnet på 2,0. Uppmätt i den nya effektmixen ligger pauserna på −42,2 (15 s), −41,2 (157 s) och −43,2 LUFS (184 s), och vattningen på ca −29 LUFS, alltså 10 dB under Malin och 13 dB över bädden.

### F2. Rad 21 frågar efter djuren på blommorna, men de syns inte (154,6–160,9 s)
- *[sett]* 158,0 s: vyn `uppslag` visar tulpanerna och musen. Den rosa blomman är avklippt i högra kanten. Fjärilen och nyckelpigan syns inte.
- *[sett]* Under själva tittpausen går musen dessutom över bilden från lila till blommorna.
- **Varför det spelar roll:** frågan "Ser du några små djur på blommorna?" är en letfråga. Barnet ska kunna hitta djuren under pausen, inte se en tom bild och en mus som rör sig.
- **Orsak:** vyn `uppslag` (`boken.js:589`) är centrerad på x = 0, men `ROSA` [0,9, 0,18] och `GULA` [0,8, 0,5] (`boken.js:145–146`) ligger utanför bilden. Gången `[S('21') + 2.6, S('21') + 4.8, 'lila', 'blommor']` (`boken.js:291`) ligger mitt i pausen.
- **Rättning:** gör rad 21 i vyn `insekter`, eller en ny vy mellan rabatten och blommorna, så att båda djuren syns ordentligt. Flytta gången till slutet av rad 20b, eller till efter Malins svar, så att det bara är ett ord-utlöst "ja!" som rör sig i pausen.
- **Status: rättat.** Vyn `uppslag` siktar nu på högra halvan (x = 0,55) i stället för mitten, och rad 21 glider dit på 1,8 s. Där syns fjärilen på den rosa blomman, nyckelpigan på den gula och musen vid lila. Gången ligger nu vid S21 + 0,1–1,9, före pausen.

### F3. Kannan försvinner tvärt när boken stängs (231,05 s)
- *[sett]* 230,98 s står kannan i nederkanten. 231,12 s är den borta. Den fälls inte ner som de andra korten.
- **Orsak:** `boken.js:523` `else vik(K, t >= STANG ? ke : 1);` där `ke = fallE(K)` (`boken.js:520`). `fallE` (`boken.js:487`) ger 0 när kortet saknar `upp`, och `KANNA_K` har ingen `upp`. Kannan blir därför platt i exakt den bildruta där `t >= STANG`.
- **Rättning:** `else vik(K, t >= K.ner ? 1 - mjuk((t - K.ner) / 0.35) : 1);`, eller ge `KANNA_K` en `upp` före `GLIDA` så att `fallE` fungerar som för de andra korten.
- **Status: rättat.** `vik(K, t >= K.ner ? 1 - mjuk((t - K.ner) / 0.35) : 1)`: kannan fälls ner på 0,35 s som de andra korten (sett i varje bildruta i slutet).

### F4. Malin säger "En blomma hänger fortfarande ner" utan att den syns (115,7–120,1 s)
- *[sett]* 117,0 s: röd och gul står upp, musen står med kannan, men den lila tulpanen är utanför bilden till höger.
- **Varför det spelar roll:** det här är problemet för nästa gissning. Barnet måste se den hängande blomman när den nämns ("bilden på orden").
- **Orsak:** rad 16 är "Musen, halvbild" (`storyboard/rader.mjs:128`). `GLID['16']` glider till vyn `halv` runt musens plats vid gul (`boken.js:590`, `626`), och lila ligger 0,42 till höger, utanför bilden.
- **Rättning:** gör rad 16 i `rabatt`, eller en halvbild som siktar mellan musen och lila, så att lila syns hängande när den nämns.
- **Status: rättat.** Rad 16 är nu "Rabatten, halvbild" i vyn `rabatt`, och lila syns hängande till höger om musen.

---

## Rörelse och flyt

Det som fungerar *[sett]*:
- Ritningen av den gula tulpanen sedd uppifrån (rad 04), med spetsen i linjens ände.
- Fjärilen som landar på musens huvud (rad 23): ren landning.
- Räkningen 1-2-3 med siffrorna bredvid tulpanerna.
- Musen som vinkar i hej då-vyn (rad 27).
- Tulpanerna som reser sig med glitter: de fungerar som belöning.
- Kannan som glider till handen (rad 12).

Det som skaver:

| Tid | Sett | Orsak | Rättning | Status |
|---|---|---|---|---|
| 3–29 s | *[sett]* Musens nedfällda kort ligger som en stor krämvit fläck i gräset framför rabatten (8,0 s). | `vik(MUSKORT, 0)` fäller kortet framåt, och baksidan har emissive `#F4ECDD` (`boken.js:245`, `515`). | Fäll kortet bakåt, eller ge baksidan gräsets färg som de andra korten, eller låt musen resa sig tidigare. | Rättat: musens kort har en egen baksida (`MUSBAK`) som är gräsgrön medan kortet ligger nere och krämvit när det står. |
| 10,0–10,4 s | *[sett]* Den gula knoppen faller framåt, visar sin krämvita baksida (10,33 s) och försvinner. | `boken.js:498`: knoppen viks ner på 0,4 s och döljs sedan. | Fäll knoppen bakåt (mot teckningen), eller tona ut den medan den viks. | Rättat: knoppen fälls bakåt mot teckningen och krymper till 10 % på 0,4 s. Ingen krämvit baksida syns (sett i varje bildruta). |
| 19,2–20,0 s | *[sett]* Klippet till `gul-nara` visar den platta teckningen från sidan: en liten mörk streckform, och kritan på väg ut. Fyllningen "inifrån" (19,3–19,9) syns knappt. | Rad 05 klipps till `gul-nara` (kommentaren vid `boken.js:618`) medan teckningen fortfarande ligger platt. | Stanna i `gul-rita` tills fyllningen är klar och teckningen har börjat resa sig, och klipp sedan. | Rättat: rad 05 ligger kvar i `gul-rita` tills fyllningen är klar och klipps till `gul-nara` vid `GUL_UPP` − 0,05, när kortet börjar resa sig. `GUL_UPP` = S05 + 0,95. |
| 9,96–19,2 s | *[sett]* Rad 04 ligger kvar 9,25 s i samma vy, varav ca 5 s med en stilla kontur och en kritan som svajar. | Ritlängden i `RIT`, plus `GLES`. | Korta väntan efter konturen, eller lägg in en närbild av musen som tittar. | Kvar: det är den gissningspaus som Sanna godkände (rad 04). Jag kortade den inte, eftersom det skulle ändra en godkänd takt. |
| 44,9–49,8 s | *[sett]* Den röda börjar hänga 0,1 s in i en kameraglidning, i vänsterkanten (45,1 s). Gul hänger bakom musen, och lila är halvt avklippt i högerkanten. | `SLAR_UT` och `HANGER` = rad + 0,1/1,1/2,1 (`boken.js:283`) startar under `GLID['07b']`. Lägesbytet är ett tvärt bildbyte. | Låt glidningen vara klar först och låt sedan blommorna hänga en i taget, med ca 0,3 s mjuk övergång (vik eller rotation från uppe till hänger). | Rättat: `HANGER` är nu rad 07b + 1,1/2,1/3,1, alltså efter glidningen (1,0 s). Blommorna hänger en i taget i en stilla bild (sett i varje bildruta). Bytet mellan korten är fortfarande ett bildbyte med vickning, som i 062. |
| 77–96 s | *[sett]* Den gula tulpanens hängande huvud sticker upp ovanför musens huvud som en krona (47,6 s, 77,9–78,9 s). | Musens position `MUSPOS` mitt framför gul. | Flytta musen 0,05–0,08 åt sidan i de raderna. | Rättat: musens platser är flyttade, så att den gula inte längre sticker upp som en krona (sett vid 77,3–79,6 s). |
| 77,9 s | *[sett]* Kannans skugga ligger kvar på gräset långt från kannan medan den glider. | Skuggfliken följer inte med i glidningen. | Dölj eller flytta fliken under `GLIDA`. | Kvar: det som syns är kannans egen kastade skugga från ljuset. Den ligger förskjuten eftersom kannan är lyft. Skuggfliken döljs redan vid `GLIDA[0]`. Det ser naturligt ut. |
| 78,0–78,3 s | *[kod]* Den första droppen på foten startar vid S12 + 0,7, men pipens punkt finns först från `GLIDA[1]` = S12 + 0,9. Den första droppen dyker alltså upp mitt i luften. *[sett]* 78,3–78,9 s syns dropparna vid foten, och musen ser förvånad ut, vilket fungerar. | `boken.js:285` och `boken.js:446–450`. | Starta `FOTDROPPAR` vid +1,2 och framåt, eller flytta `GLIDA` 0,3 s tidigare. | Rättat: `FOTDROPPAR` vid S12 + 1,0/1,15/1,3, alltså efter `GLIDA[1]` (+0,9). Droppljuden ligger vid 1,35/1,5/1,65. |
| 90–140 s | *[sett]* Vattendropparna är en liten blå klump vid stjälken (98,0 s) och läses inte som vatten från pipen. | Sfärerna är 0,0065–0,0085 stora (`boken.js:469–481`). | Gör dropparna 2–3× större och synliga i en båge från pipen, som fotdropparna. | Rättat: dropparna är 0,013–0,016, alltså ca 2× större, och syns i bågen från pipen. |
| 140,4–141,2 s | *[sett]* Kannan glider tillbaka till gräset under en kameraglidning, så två saker rör sig samtidigt. | `SATT_NER` sammanfaller med `GLID['20']`. | Lägg nedsättningen efter glidningen. | Rättat: `SATT_NER` är S19b + 2,5–3,3, efter "Tre!" och före rad 20:s glidning. |
| 145,7 s | *[sett]* Siffran "2" ligger delvis över musens öra. | Siffran sitter fast vid gul, och musen står bredvid. | Flytta "2" lite åt vänster, eller flytta musen. | Rättat: siffrorna sitter högre (`SIDA + 0,32`) och går fria från örat. |
| 208,5–212,4 s | *[sett]* Musen går över rabattbilden under "Hej då, blommorna!" (`GA` S26b + 0,1–1,8). | `boken.js:291`. | Låt musen stå still när den säger hej då, och gå efter repliken. | Rättat: gången ligger vid S26b + 1,5–3,0, efter "Hej då, blommorna!". |
| 231–234 s | *[sett]* Kameran ligger lågt medan korten fälls. De nedfällda korten syns som stora krämvita silhuetter (232,3 s). Slutbilden visar pärmen snett, avklippt i högerkanten (233,85 s). 062 slutar med pärmen centrerad. | Rad 28 är en enda glidning till `slut` över hela 2,9 s (`boken.js:628`), medan pärmen stängs vid STANG + 1,05–1,75. | Låt kameran nå `slut` innan korten fälls (glidning ca 1,2 s), som i 062. | Rättat (delad rättning B): kameran glider ut till `slut` på 1,4 s, och sedan fälls korten och pärmen under en långsam push. Jag såg varje bildruta: pärmen korsar aldrig kameran, och slutbilden visar hela den stängda boken, centrerad. Den står i ca 1,1 s. De nedfällda korten syns fortfarande som små krämvita fläckar i ca 0,5 s innan pärmen täcker dem, som i 062. |

---

## Förbättringar (rangordnade)

1. **Musen syns inte vid boet (180,7–201,5 s).** *[sett]* Vyn `trad` (182,0 s) är stilla i 7,6 s. Musen är inte i bild trots att manus säger att den tittar upp. En stor röd tulpan tar förgrunden, boet är litet nära överkanten, och det finns en vit remsa i vänsterkanten. Raderna 24–24d går 21 s utan musen, så dess reaktion på boet syns aldrig. 24c–24d är ca 9,6 s av stilla bo, där äggens glimt bara är svaga gnistor.
   **Status: rättat.**
   - Rad 24 börjar i halvbilden från 23b. Musen tittar upp på "Titta upp i trädet", och vid S24 + 1,9 klipps det till trädet före "Vad finns där?".
   - Vyn `trad` ser trädet snett från vänster. Boet är större, den vita remsan är borta och den röda tulpanen står bara i högerkanten.
   - Rad 24b klipps vid +1,6 till närbild på musen med kawaii-ögon.
   - Boet gungar när fågeln piper.
   - Kvar: 24c–24d (ca 9,6 s) är fortfarande boet med äggens glimt. Det är Sannas godkända rader.
   *Orsak:* `trad` och `bo`/`bo-nara` (`boken.js:593–595`) siktar bara på trädet. *Rättning:* gör `trad` lägre och mer åt höger så att musen syns nedtill i bild. Klipp in en närbild av musen (kawaii-reaktionen) mellan 24b och 24c. Låt äggen gunga lite när det piper.
2. **Solen och musen är avklippta i `halv-sol` (40,0–44,9 s och 148,4–154,6 s).** *[sett]* 41,5 s: solen är avklippt i överkanten och liten, och av musen syns bara öron och ögon i nederkanten. Det bryter mot `bildutsnitt.md` (huvudet klipps aldrig i halvnära). Bilden är mest tom himmel i 5–6 s.
   **Status: rättat.** `halv-sol` siktar mitt emellan musen och solen (lerp 0,5) från höjden 0,52. Hela solen syns, och musen är ute ur bilden i stället för halvt avklippt.
   *Orsak:* `boken.js:586` `lerp(s, 0.36)` pekar för lite mot solen, och FOV 30 är för smal. *Rättning:* rikta mer mot solen (ca 0,55) och lyft kameran, eller visa solen och musen i två bilder.
3. **"Närbilderna" är inte närbilder.** *[sett]* I vyerna `nara` (rad 08, 08b, 11, 25) fyller musen ca 55 % av bildhöjden. `bildutsnitt.md` säger 115 %, och 062 ligger på ca 85 %. Musens reaktioner blir små.
   **Status: rättat.** `nara` går närmare: kameran står vid g + (0,05; 0,2; 0,52) och siktar på g + (0,03; 0,15; 0). Musen fyller nu ca 85–90 % av höjden, som i 062. De 115 % i `bildutsnitt.md` gäller platta scener; 062 är förlagan för boken.
   *Orsak:* `nara` (`boken.js:587`) har avståndet 0,62. *Rättning:* minska till ca 0,42, eller FOV till 24.
4. **Rad 08 + 08b står stilla i ca 10,8 s (49,8–60,6 s).** Lägg in ett reaktionsslag eller en närbild (memory: reaktionstid, fler reaktioner).
   **Status: rättat.** Rad 08 får reaktionen `ledsen`, och rad 08b glider (0,9 s) till en halvbild av musen. De 10,8 s består nu av en närbild med en reaktion och en halvbild.
5. **Kannan är liten och snedvriden när den ritas (rad 09–10, 60,6–73,8 s).** *[sett]* 63,0 s: konturen är ca 10–15 % av bilden, och musens öron är avklippta i överkanten. *Orsak:* `kanna` (`boken.js:588`). *Rättning:* sänk kameran och flytta den närmare kannan, och sikta lägre så att öronen kommer med.
   **Status: rättat.** Vyn `kanna` har lägre kamera, står närmare och siktar lägre (fov 30). Kannan är större, och musen syns hel.
6. **Rad 18 "Den lila, närbild" (127,0–130,8 s):** *[sett]* 127,5 s: musen är utanför bilden, och kannan sticker in i vänsterkanten utan någon som håller den, så den ser ut att sväva. Antingen sikta lite åt vänster så att musen kommer med, eller lite åt höger så att kannan försvinner helt.
   **Status: rättat.** `lila-nara` siktar 0,03 till höger, så att kannan inte längre syns i kanten.
7. **Rad 17 `rabatt-hel`:** *[sett]* tulpanerna är små och halva bilden är tomt gräs. Sänk målpunkten.
   **Status: rättat.** Kameran är lägre och närmare (0,42; 1,38), och målpunkten ligger på 0,2. Tulpanerna fyller mer av bilden.
8. **Rad 26c `insekter`:** *[sett]* djuren är för små för en hej då-bild (209,6 s: nyckelpigan och fjärilen är tydliga men små). Gå närmare, som i vyerna `fjaril` och `nyckelpiga`.
   **Status: rättat.** Vyn står närmare blommorna, (0,86; 0,3; 0,86) mot (0,85; 0,12; 0,32), så djuren blir större.
9. **Rad 22b:** *[sett]* 165,4 s: musens kropp är avklippt i vänsterkanten, med bara bakdelen och svansen synliga. Flytta vyn lite åt höger. Gnistan på nyckelpigan är däremot en ren stjärna, inte skärvor: det är bra.
   **Status: rättat.** Vyn `nyckelpiga` ser nyckelpigan snett från vänster med fov 20. Musen är helt ute ur bilden, och nyckelpigan är större.
10. **Musen saknar kontaktskugga.** *[kod]* `MUSKORT` (`boken.js:245`) får ingen `KSKUGGA`-flik, till skillnad från alla andra kort. *[sett]* Musen ser lite svävande ut i helbild. Ge den en flik som de andra.
   **Status: rättat.** `MUSFLIK` är en `KSKUGGA`-flik under musens fötter. Den följer `musPos`, krymper när musen hoppar och döljs när kortet ligger ner.
11. **Kanterna på djuren i närbild.** *[kod]* KANT är klämd till 6–30 (`boken.js:156`, `216–217`), vilket ger ca 4 px kant i närbild. Det syns inte störande i bilderna. Kontrollera i slutrenderingen.
   **Status: kvar.** Den kan bara bedömas i full upplösning. Kontrollera den i slutrenderingen.

---

## Ljud och röst

- **Nivå:** I −18,4 LUFS och topp −4,4 dBFS för scenen. Ihopsättningen normaliserar till −14, så det är bra.
- **Malin** ligger jämnt runt −17,5 LUFS. Alla röstfiler har den längd som står i `ROST`. Inga repliker går in i varandra, och inget tal tar slut tvärt vid de 11 klippen.
- **Whisper:** "upp" ligger på 2,39, 2,47 och 2,39 s i filerna 22, 24 och 29, vilket stämmer med koden. I fil 23 hörs "En!" (1,66 s) som "M.": ansatsen är svag eller avklippt, så lyssna på den. Fil 42 hörs som "Var en fin vårdagmusen": "det" är svagt, vilket redan var känt.
  **Status: väntar på Sanna.** Inga nya tagningar enligt uppdraget. Lyssna på fil 23 ("En!") och avgör om den räcker.
- **Musens ljud** varierar 10 dB: från ca −25 LUFS (fortjust, nyfiken, pratar, fniss-kort) till −14,8 (`mus-suck-1` vid 203,97 s, som är högre än Malin). *Orsak:* samma vol 1,5 för alla `mus-` (`boken.js:640`). *Rättning:* sänk `mus-suck` till ca 0,6 och höj de svaga till ca 2,2, eller normalisera filerna.
  **Status: rättat.** Varje musljud får en egen vol ur en tabell med filernas LUFS (`MUS_LUFS`, `boken.js:666`), så att alla hamnar 3 dB under Malin. `mus-suck-1` ligger nu på −20,2 mot Malins −15,1 på samma rad, mot −14,8 tidigare.
- `oj-oj-1` och `ooh-1` är lånade ljud vars klang jag inte har jämfört med musens andra ljud. Lyssna efter dem.
- **Bädd och vatten:** se F1.

---

## Regelkontroll

- **`qa-scen.py`:** alla rader rena: boil, krita kod, röst rader och röst filer. Standardkörningen hittar inte röstmappen i bokscener, eftersom sökvägen bara står i `boken.js` (se 062-anteckningen). Jag körde därför också `qa-scen.py --rost assets/ljud/roster/varen-i-boken avsnitt/065-varen-i-boken`, som också var ren. `rader.json` (20:34) är nyare än `rader.mjs` (19:59).
  **Status:** körd igen 28/11 efter rättningarna. Alla rader är rena, både standardkörningen och `--rost`. `rader.json` är i takt med `rader.mjs`.
- **`qa-film.sh`:**
  - ingen svart bild och ingen frusen bild över 3 s;
  - tyst över 3 s vid 15,2, 156,9 och 184,3 s (orsak: F1);
  - boil i filmen mättes inte (snabb förhandsvisning);
  - inget tal tar slut tvärt vid klippen.
- **Längd:** scenen är 3:54. Med logga, prenumerera-kort och outro blir avsnittet över 4 min, vilket är mer än `format/regler.md` (3–4 min) och receptets 2:30–3:15. Sanna godkände 3:55 för animatiken, så det är ett beslut, inte ett fel, men det är värt att påminna om.
  **Status: kvar.** 3:54,65 med den 0,7 s längre stängningen (rad 28 = 3,6 s). Sanna godkände 3:55.
- **Kvar sedan tidigare (manus.md, Regelkoll):**
  **Status: kvar,** enligt uppdraget (inga rena fel).
  - fler än 2 nya saker;
  - boet poppar inte upp på sitt ord;
  - "Ja, det tycker jag!" är Sannas egen replik;
  - `harriets-favoriter.md` är inte uppdaterad.
- **Bildutsnitt:**
  **Status: rättat.** `halv-sol`, `kanna` och 22b är rättade (se Förbättringar 2, 5 och 9). Närbilderna är på ca 85–90 %. Rad 26b har en egen vy, `rabatt-hej`, så att musen står hel vid blommorna före gången.
  - huvudet klipps i `halv-sol` och `kanna`;
  - en figur står halvt i bild i kanten i 22b;
  - närbilderna är för långt bort (se Förbättringar 2, 3, 5, 9).
- **En sak rör sig åt gången:** bryts vid 45 s (glidning och blomma som hänger), 140 s (glidning och kanna) och 157 s (musen går i tittpausen).
  **Status: rättat.** De tre ställena är rättade: blommorna hänger efter glidningen, kannan sätts ned före glidningen och gången på rad 21 ligger före pausen. På rad 21 följer kameran musen till blommorna, som på rad 13.
- **Inget går genom något:** inget sådant sett i 6 bilder/s eller i full storlek. Kannan i handen ligger mot tassen, och fjärilen landar ovanpå huvudet.
- **Inga djurnamn:** stämmer i det som sägs.

## Inte kontrollerat

- Boil och kantbredd i slutupplösning: filmen är snabb (960×540, 15 fps). Rörelser kortare än 1/15 s syns inte.
- Vinkarna (rad 06, 26 och 27) är bara sedda i små rutor och några stillbilder. Armen bakom kroppen syns vid 30,6, 31,4 och 226,6 s, men jag har inte sett hela vinkcykeln i full storlek.
- Klangen i `oj-oj-1` och `ooh-1`, och fil 23:s ansats: kräver att någon lyssnar.
- `bilder/`, `storyboard/` och `prov/` är bara genomsedda som källor, inte granskade bild för bild.
- 062 är bara använt som förlaga, inte granskat.
- Den färdiga ihopsättningen (intro, prenumerera, outro) finns inte än.
- ~~Ryck i början av glidningar~~ **Rättat (delad rättning A)**:
  - `paZ()` flyttar målpunkten längs siktlinjen till den nya platsens z-plan före `lage()`, både i `glid()` och i rad 28.
  - Mätningen hittade också tre andra ryck, som är rättade:
    - fov bytte tvärt vid glidstart. `iFov` behåller förra vyns fov genom glidningen och skalar avståndet så att utsnittet blir detsamma.
    - Fokus och oskärpa hoppade. De tonas nu över glidningen.
    - En vy kortare än 1,5 s före en glidning tryckte in hela sin push i en bildruta (rad 14). Den står nu still.
  - Vynyckeln byts bara för vyer som följer musen. Bildskillnaden i första bildrutan är jämn vid alla 20 glidstarter. Rad 14 gick från 14,6 till 1,2.
- ~~Om pärmen passerar genom kameran~~ **Kontrollerat:** jag har sett varje bildruta 231,0–234,65 s (15 fps). Pärmen korsar aldrig kameran.
