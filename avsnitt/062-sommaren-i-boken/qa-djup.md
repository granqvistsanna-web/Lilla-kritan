# 062 Sommaren i boken – djup QA (2026-11-27)

Granskad film: `scener/boken/boken.mp4` (27/11 19:11). Den är **nyare än scenkoden** (`boken.js` och `rader.mjs` 18:56, `index.html` 18:41, delad kod i `produktion/three-rum/popupbok/` och `verktyg/` äldre), så filmen visar dagens kod.
**Obs:** filmen är en `--snabb`-rendering (960 × 540, 15 bilder/s), inte en slutrendering. Line boil i filmen kan därför inte mätas (qa-scen mäter bara 30 fps), och kanter och skärpa är bedömda i halv upplösning.
Tidkoderna är scenens tid (0:00 = rad 01a; loggan läggs på i sammansättningen). Scenen är 3:33,1.

Så här gjordes granskningen: hela filmen i kontaktark med 6 bilder/s (1 278 bilder, 36 ark), täta bilder (alla 15/s) runt öppningen, glassen till handen, ätandet, hoppen, badet, hinken och stängningen, ljudet mätt med ebur128 och per röstfil, och varje fynd följt till koden. **[sett]** betyder sett i bildrutor, **[kod]** att det är härlett ur koden.

## Omdöme

1. Öppningen, kritans två teckningar, glassen, plasket och slottbygget fungerar och följer receptet, men tre bilder tappar grodans ansikte (blommorna rad 19–21, glassteckningen, hej då dammen), och stängningen slår pärmen igen genom kamerans siktlinje.
2. Rörelserna är lugna med mjuka in- och utgångar, men två kameraglidningar hoppar i första bilden, och badet (rad 15b–16, 18 s i samma utsnitt) och sandbygget (38 s) sackar.
3. Rösten har 12 LU skillnad mellan replikerna (normaliserad på topp, inte på loudness), och QA-skripten kontrollerade aldrig rösten i 062 (de hittar inte röstmappen och läser en gammal `rader.json`).

---

## Fel (måste rättas)

### F1. Grodans huvud utanför bild i blommornas närbild – rad 19, 19b och 21 (2:07,8–2:27,5) [sett]
**Status 28/11: rättat.** `VY['blommor-nara']` räknas ur var grodan står (mitt mellan henne och blommorna, högre och längre bort). Ansiktet och alla fyra blommorna i bild på rad 19, 19b och 21 (stillbilder 2:09, 2:16, 2:25).
**Ses:** i vyn `blommor-nara` syns bara grodans mage och fötter bakom blommorna, huvudet är kapat i överkanten i 20 s. På rad 21 (*"Mmm … vad gott de luktar."*) ska hon luta sig mot blommorna, blunda och lukta, men ansiktet syns inte alls, så handlingen går förlorad.
**Varför:** bryter `format/bildutsnitt.md` (huvudet kapas aldrig utom i närbild av ansiktet) och *bilden på orden*.
**Orsak:** `boken.js:683` – `blommor-nara` har en fast kamera (`v3(0.92, 0.36, 0.95)` mot `v3(0.66, 0.15, 0.2)`) som tittar lågt på blommorna och inte tar hänsyn till var grodan står (blad 2 på rad 19–19b, blad 3 på rad 21).
**Förslag:** höj kameran och målet så att grodans ansikte och blommorna ryms (t.ex. mål y 0,24, kamera y 0,5 och lite längre bort), eller dela: rad 19–19b blommorna i närbild utan grodan, rad 21 egen vy `luktar` med grodans ansikte och blommorna i samma bild. Liten ändring i `VY`.

### F2. Pärmen slås igen genom kamerans siktlinje – rad 26 (3:31,2–3:31,9) [sett]
**Status 28/11: rättat (gemensam fix B).** Rad 26 3,6 s (förut 2,9). Kameran glider ut till `slut` på 1,5 s (`KAM_UT`), sedan en långsam push (`skjut`) till slutet. `PARM_NER = [STANG + 1.5, STANG + 2.2]`, `landa-mjuk` på 2,15 s. `VY.slut` ändrad till `[v3(-0.14, 2.45, 3.95), v3(0, -0.12, -0.2), 32]` (den gamla visade bara pärmen tätt). Varje bildruta 3:31,40–3:32,40 granskad: kameran är ute innan pärmen rör sig, pärmen går aldrig genom kameran, sista bilden är hela den stängda boken mitt i bild (ca 1,4 s).
**Ses:** kameran är fortfarande låg och nära när pärmen fälls. Från 3:31,47 fyller pärmens insida (himlen, mörk) överkanten, och på två bildrutor (3:31,60 → 3:31,73) slår bilden om till pärmens utsida. Slutbilden är en låg, nära vinkel på pärmen; boken syns aldrig hel på bordet. Grodans kort fälls ner rakt mot kameran (3:30,5).
**Varför:** ryckig sista sekund, och receptets *"pärmen slås igen, siluetten syns"* blir en halv sol i kant. Receptets regel *"Kameran stannar inne i boken och går aldrig … bakom pärmen"* är på gränsen.
**Orsak:** `boken.js:293` `PARM_NER = [STANG + 1.05, STANG + 1.75]` medan kamerans glidning ut (`boken.js:720–722`, 2,8 s med cosinuskurva från `hejda` till `slut`) bara är halvvägs vid 1,05 s.
**Förslag:** låt kameran glida ut snabbare (rörelse `settle` eller 1,6 s) och slå igen pärmen senare (`STANG + 1.6 … 2.3`), och förläng rad 26 med ca 0,6 s så att den stängda boken står kvar 1 s. Gäller alla fyra årstiderna (samma rader i 063–065).

### F3. Kameran hoppar i första bilden av två glidningar – 0:31,7 (rad 06) och 0:34,6 (rad 07), samt 3:30,15 (rad 26) [sett]
**Status 28/11: rättat (gemensam fix A, receptet som det var).** `paZ(p, m, z)` flyttar blickpunkten längs siktlinjen till platsens z före `lage`, i `glid()` (`lage(p0, paZ(p0, m0, P[2]), P)`) och i rad 26 (`lage(pos, paZ(pos, mal, P0[2]), P0)`). Varje bildruta vid 0:31,60–0:31,80, 0:34,53–0:34,73 och 3:30,13–3:30,33: inget hopp.
**Ses:** i första bildrutan av glidningen tippar bilden (31,67 → 31,73 och 34,60 → 34,67 tydligt, 210,13 → 210,20 också), sedan glider kameran mjukt vidare.
**Orsak:** `boken.js:689–690` och `703–706`: `lage()` sparar bara blickpunktens x och y relativt platsen, och `fran3()` återskapar den på den nya platsens z. När förra vyns mål har ett annat z än nästa (`halv` mål z = bladets z, `halv-sol` mål z − 0,4, `hejda` mål z − 0,2 mot `P0` z − 0,2) flyttas blickpunkten i djupled på en bildruta.
**Förslag:** i `glid()` välj platsen `P` så att den har förra målets z (eller låt `halv-sol` och `hejda` ha samma mål-z som `halv`), eller ge kamera3d ett läge med full 3D-blickpunkt. Liten ändring; samma `glid()` finns i 063–065.

### F4. En vit rektangel under grodan när hon hoppar upp ur badet – 1:57,27–1:57,33 [sett]
**Status 28/11: rättat.** `#vattenYta` tonas bort 0,12 s före hoppet, och bara den vågiga överkanten har vit linje. Grodan reser sig ur vattnet 0,2 s före hoppet till 0,12 s in (förut 0,2 s före till 0,2 s in). Varje bildruta 1:56,55–1:57,95: ingen rektangel.
**Ses:** en rak vit kant med hörn svävar under grodans mage i två bildrutor när hon lämnar vattnet.
**Orsak:** `boken.js:558–561`: vattenkanten `#vattenYta` ritas i kortets egna koordinater med vit kantlinje runt hela polygonen (också den raka underkanten `yw + 40`). När kortet lyfts i hoppet följer kanten med upp ur dammen innan `sjunk` har nått 0.
**Förslag:** tona ut `#vattenYta` innan hoppet börjar (`k` = 0 vid `HOPP[1].t0`), och rita bara den vågiga överkanten med vit linje.

### F5. Grodan vinkar hej då med spaden i handen – rad 23–26 (3:06–3:31) [sett]
**Status 28/11: rättat.** Spaden flyger tillbaka i hinken (samma båge baklänges, `SPADE_HEM`) 0,45–1,05 s efter att slottet rest sig, med ett `swoosh`; klappen börjar när spaden landar (`KLAPP = SPADE_HEM[1] − 0,45`), klappljud och fniss flyttade i `rader.mjs`. Rad 22g är lika lång. Stillbilder 3:03,0–3:04,3; hej då-delen utan spade.
**Ses:** spaden sitter kvar i vänster hand genom klappen, närbilden och hela hej då-delen; i vinkningen viftar den med spaden.
**Varför:** storyboardens rad 22g säger *"grodan lägger spaden i hinken och klappar"*. Det ser ut som ett misstag och tar blicken från vinkningen.
**Orsak:** `boken.js:501` `if (t >= SPADE_TA[1]) p.hall = [1, 0]` gäller resten av filmen, och `SPADEKORT` (spaden i hinken) visas bara före `SPADE_TA[1]` (`boken.js:532`).
**Förslag:** lägg spaden tillbaka i hinken direkt efter klappen (samma båge som `SPADE_TA`, baklänges), visa `SPADEKORT` igen. Liten ändring.

### F6. Glassen i handen är för liten, och halvt utanför bild i närbilden – rad 11–13 (1:00–1:29) [sett]
**Status 28/11: rättat.** Glassen skala 0,75 (`GS`, förut 0,5), också i glidningen till handen. Ny vy `nara-glass` för 11b–12b: glassen helt i bild. Handen är tom när sista tuggan är klar (`KON_UT` 3,3 s, förut 3,5). Kvar: under själva sista tuggan (1:24,00–1:24,07) syns en liten bit av struten, det är tuggan som pågår.
**Ses:** glassen krymper från teckningens storlek till ca 15 % av grodans höjd i handen. På *"Mums!"* syns inte att en bit är borta. I närbilden 11b (1:04,6–1:12,3) står glassen i nedre vänstra hörnet, delvis utanför bild. När struten äts (1:22–1:23) svävar vita fyrkantiga kantbitar bredvid struten.
**Varför:** `format/bildutsnitt.md`: en liten sak i tassen är 25–35 % av kroppshöjden och alltid helt i bild. Glassen är avsnittets hjälpsak och bör vara tydlig.
**Orsak:** `boken.js:231` `sakBild(… skala: 0.5 …)`; närbilden `nara` (`boken.js:670`) är centrerad på grodans huvud, handen hamnar i kanten. Kantbitarna: tuggorna (`bett`, `boken.js:231–233`) skär hål i bilden men riggens vita kant (`kant.js`) ritar kant runt de små lösa bitarna som blir kvar.
**Förslag:** `skala` 0,75–0,8, närbilden 11b lite åt vänster och ner så att glassen ryms, och låt sista tuggan av struten ta allt (större sista `bett`) eller göm kanten när `sakBett` > 15.

### F7. Grodan halvt i bild vid kanten i *"Hej då, dammen!"* – rad 24d (3:22,0–3:25,0) [sett]
**Status 28/11: rättat.** Rad 24d har en egen vy `damm-hejda` (mål x 0,38): grodan helt utanför bild, blommorna och dammen i bild (stillbild 3:23).
**Ses:** grodan (som står vid sandhörnet) sticker in till hälften i nedre vänstra kanten.
**Orsak:** vyn `damm` (`boken.js:672`) är gjord för grodan i dammen; på rad 24d står hon vid `BLADPOS.sand`.
**Förslag:** vrid vyn lite åt höger (mål x 0,25) så att grodan är helt utanför, eller ta med henne helt.

### F8. QA-skripten kontrollerade aldrig rösten i 062 [kod]
**Status 28/11: rättat.** `scener/boken/rader.json` skriven om ur dagens `rader.mjs` (213,65 s). `rostmapp()` rättades av huvudsessionen; `qa-scen.py avsnitt/062-sommaren-i-boken` kör nu röstkontrollerna mot rätt data: inga fel.
**Ses:** `qa-film.sh` och `qa-scen.py` gav tomma rader för *röst rader* och *röst filer*, vilket ser ut som "inga fel".
**Orsak:** (1) `scener/boken/rader.json` (16:56) är från före runda 7: 168,4 s mot filmens 213,1 s, rad 15c, 15d och 22b–22g saknas. Scenen läser `rader.mjs` direkt (`boken.js:27`), men QA läser `rader.json`. (2) `qa-scen.py:157–161` `rostmapp()` letar efter `assets/ljud/roster/…` i `index.html`, men i bokscenerna står sökvägen bara i `boken.js:736`, så röstmappen hittas inte och filkontrollen hoppas över. Samma sak i 063, 064 och 065.
**Gjort i granskningen (i scratchpad, inget i repot ändrat):** samma kontroller körda med en `rader.json` byggd ur dagens `rader.mjs`: inga repliker överlappar och ingen går förbi raden. Röstfilernas kontroll med whisper: se *Ljud och röst*.
**Förslag:** skriv om `rader.json` ur `rader.mjs` vid varje rendering (t.ex. i `scener/render.mjs`), och låt `rostmapp()` också läsa `*.js` i scenmappen.

---

## Rörelse och flyt

**Det som fungerar [sett]:**
- **Öppningen** (0:00–0:09): kameran driver lugnt, pärmen slås upp mjukt (0:02,5–0:02,8), korten reser sig bakifrån och fram med en liten efterstudsning (0:03,0–0:03,9), inget kort går genom ett annat. Den långa glidningen in i boken är jämn.
- **Kritan ritar solen** (0:09,0–0:17,1): spetsen i linjens ände hela tiden, strålarna ritas medurs i en jämn rörelse, kritan väntar till höger och svajar. Gisspausen är ca 3 s efter sista strecket. Glassen (0:45–0:52) likadant.
- **Hoppen** (1:35, 2:19, 2:28): huk före, båge, mjuk landning, lugna ringar under bladen.
- **Hinken** (2:47–2:51, 2:56–2:58): lyfts i en båge förbi vassen, vänds i luften, landar på högens topp, lyfts på *"lyft!"* och tornet står kvar. Ljud och bild sitter på ordet.
- **Liv i pauserna:** grodan blinkar, andas (`strack`), lutar huvudet i radernas reaktionsslag (`GLES` 0,9 s, `boken.js:503–504`). Inga döda stillbilder; `freezedetect` hittade inget över 3 s.

**Det som skaver:**
- **R1. Badet sackar (1:38,8–1:57,1).** Rad 15b, 15c, 15d och 16 är fyra rader (18 s) i nästan samma utsnitt: grodan till bröstet i vattnet. Simvarvet (15c) är en sidoförflyttning på 0,13 utan synliga armar (armarna är under vattenlinjen), och plasket med händerna (15d) syns som tre små vita prickar. För en 2-åring händer det för lite. [sett] Orsak: `boken.js:352` (varvets storlek), `478–479` (armarna lyfts 95 px men klipps av `#vatten`), alla fyra rader i `halv2`/`nara2`. **Status: rättat utan att stryka något.** 15c i helbild (`hopp`), simtagen 45 ± 38° och grodan ligger 30 % högre medan hon simmar och plaskar, så att armarna syns över ytan; plasken längre och större stänk; närbilden i badet (`bad-nara`) omriktad så att ansiktet och händerna syns; 15c 0,4 s kortare. Rad 15c är kvar (Sannas utkast A).
- **R2. Sandbygget är långt (2:27,5–3:06,0, 38,5 s).** Sex rader i rad i samma vy `bygge` utom tornets närbild. Varje steg är tydligt, men ett andra varv med samma rörelse (22f) och en lång 22g gör att delen blir längre än glassen och badet. [sett] **Status: delvis.** Tornets närbild är nu en detaljbild och rad 22 börjar i helbild. Längden är kvar: skopan i 22f och 22g:s rader är Sannas godkända slag (utkast B), och 22g behövde sin tid för spaden (F5). Väntar på Sanna: *ska skopan i 22f strykas (ca 1 s kortare)?*
- **R3. Hej då-delen** (3:10,3–3:30,2, 20 s) är fem bilder i rad: grodan, solen ensam 3,4 s (statisk himmel), blommorna, sandslottet, dammen, grodan. Receptet vill ha det så, men solbilden står still länge. [sett] **Status: rättat.** Solen syns bara under *"Hej då, solen!"* (1,5 s i stället för 3,4), blinkar två gånger och skuttar lite längs pärmen, sedan tillbaka till grodans hej då-kvak. Ingen nick: att luta solen skulle gå genom pärmen.
- **R4. Hoppet upp ur badet går fort** (1:57,2–1:57,9): klipp till bred bild i rad 16:s reaktionsslag, hoppet tar 0,7 s, sedan klipp igen 1:58,4. Ögat hinner knappt hitta grodan. [sett] (`boken.js:337`, `726`) **Status: rättat.** Hoppet 0,85 s (förut 0,7), klippet 0,35 s före hoppet (förut 0,05), egen vy `damm-hopp` där hela hoppet är i bild, rad 16 0,3 s längre så att kvaket hörs i närbilden. Varje bildruta 1:56,55–1:57,95.
- **R5. Hoppet ut i dammen lämnar bilden uppåt** (1:36,0–1:36,5, och hoppet på rad 20, 2:19,2–2:19,6): halvbilden `hopp` är för snäv för hoppets höjd (`h: 0.14`, 0,2), huvudet går ut i överkant. [sett] **Status: rättat.** `hopp` längre bort med högre mål, `blommor` likaså: båda hoppen i bild (1:36,2, 2:19,3–2:19,6).
- **R6. Rad 22 börjar med 0,9 s utan grodan** (2:27,6–2:28,5): kameran klipper till sandhörnet innan grodan hoppat dit; hon kommer in från höger. Fungerar, men en tom första bild efter ett klipp. [sett] **Status: rättat.** Rad 22 börjar i helbild medan grodan hoppar över bladen, och kameran glider till sandhörnet (1,4 s) när hon landar.
- **Kort i öppningen:** de nedfällda korten visar sina vita baksidor medan de ligger (0:02,6–0:03,6). Avsiktligt (papper), men ser ut som tomma vita fläckar i en halv sekund. [sett] **Status: kvar,** avsiktligt (papperets baksida).

## Förbättringar (rangordnade efter effekt)

| # | Förslag | Effekt | Storlek | Status 28/11 |
|---|---|---|---|---|
| 1 | Rätta F1: grodans ansikte i bild när hon luktar på blommorna, och en egen närbild där hon blundar och luktar | rad 21 får sin handling, blomdelen blir varmare | ändring i `VY` | rättat (F1) |
| 2 | Rätta F2: kameran ute före pärmen, stängd bok i bild 1 s | lugnt, tydligt slut som rimmar med öppningen | tidsändring, rad 26 + 0,6 s | rättat (F2) |
| 3 | Glassen större i handen och droppen på näsan större (nu ca 2 % av bilden, `r="17"` i `boken.js:243`), gärna en droppe som syns falla från kulan i stället för att dyka upp när tungan går in (`boken.js:456`) | *"Oj! Glass på näsan!"* blir ett tydligt skratt-ögonblick | tweak | rättat: droppen r 27 (förut 17), och en droppe faller från kulan till näsan 0,1–0,45 s in på rad 12 |
| 4 | Badet kortare och tydligare: stryk 15c eller gör varvet större med armarna ovanför vattnet, och växla utsnitt (helbild på simvarvet, närbild på plasket). Plasket med händerna: större stänk, händerna ovanför vattenlinjen | badet håller en 2-åring, ca 5 s kortare | tweak / stryk en rad | delvis (R1), ingen rad struken |
| 5 | Spaden tillbaka i hinken före hej då (F5) | renare vinkning | liten kodändring | rättat (F5) |
| 6 | Tornets närbild (rad 22e) som riktig detaljbild: nu är tornet ca 10 % av bildhöjden och sandhögen fyller bilden (`VY.torn`, `boken.js:677`). Tornet ska fylla 40–60 % | *"Ett torn!"* blir ett tydligt räkne-ögonblick | ändring i `VY` | rättat: tornet ca 45 % av bildhöjden; kolla i full upplösning att tornbilden inte blir suddig så nära |
| 7 | Rösten normaliserad på loudness i stället för topp (se nedan) | jämnare berättarröst, inga plötsligt höga repliker | ljudsteg, ingen ny tagning | rättat i koden: förstärkning per fil (`ROST_DB`), originalen orörda |
| 8 | Solens hej då (rad 24): låt solen nicka eller blinka med sitt ansikte, eller låt kameran glida upp till solen från grodan i stället för klipp | 3,4 s statisk bild får liv | tweak | rättat (R3), blink och skutt i stället för nick |
| 9 | Kortare sandbygge: rad 22f snabbare (ingen ny skopa), 22g 1 s kortare | ca 3 s kortare | tidsändring | väntar på Sanna (R2) |
| 10 | Sol i bild i rad 06: `halv-sol` kapar solen i överkant (0:32,5–0:34,6) när grodan tittar upp mot den. Lite högre mål | bilden visar vad hon tittar på | ändring i `VY` | rättat: `halv-sol` mål y 0,44, hela solen i bild |
| 11 | Glassteckningens vy (rad 08–09, 0:44,9–0:56,2): grodans huvud nuddar överkanten; lite lägre kamera eller längre bort | bildutsnitt | ändring i `VY.glass` | rättat: `glass` längre bort, huvudet i bild |

Längden (28/11): scenen är nu 3:33,7 (+0,6 s: rad 26 +0,7, rad 16 +0,3, rad 15c −0,4). **Väntar på Sanna:** receptets 2:30–3:15 nås bara genom att stryka godkända slag (badet, sandbygget). Förut: scenen är 3:33; med loggan, prenumerera-kortet och outrot ca 4 min. Receptet säger 2:30–3:15 för scenen. Förslag 4 och 9 ger tillbaka ca 8 s.

## Ljud och röst
**Status 28/11: rättat.** Varje röstfil får sin förstärkning i koden (`ROST_DB` i `boken.js`, mätt med ebur128): Malin ligger på −20 LUFS per replik (spridning nu 2 LU, förut 12), topp högst −0,5 dBFS. Grodans ljud har egen förstärkning per fil (`FIGUR_DB`) till −23 LUFS. Mixen i scratchpad (samma kedja som `render.mjs`): Malin −19,8 LUFS, grodan −23,5 LUFS (3,7 dB under), hela scenen −20,7 LUFS, topp −2,9 dBFS. Rad 15:s `bild`-text rättad.


**Mätt [sett/hört med verktyg]:**
- Scenen: **−18,9 LUFS** integrerat, true peak −3,6 dBFS, LRA 9,3 LU. (Sammansättningen normaliserar sedan; 058 landade på −14,4.)
- Talet: momentan loudness median −19,9 LUFS. Mattan och effekterna utan tal: median −38,7 LUFS. `skogsljud` 0,3 ligger alltså ca 19 LU under rösten – bra.
- **Röstfilerna är normaliserade till −3 dBFS topp, inte loudness**, så de spänner från **−12,4 LUFS** (44 *"Hej då, blommorna!"*) till **−24,4 LUFS** (21 *"Ha ha, hoppsan!"*) – 12 LU. Högst: 44 (−12,4), 41 *"En röd blomma!"* (−13,5, topp −1,2 dBFS), 42 *"En gul blomma!"* (−14,4, topp −1,2), 45 (−15,3). Lägst: 21 (−24,4), 16 *"Tack, kritan!"* (−24,0), 14 *"Titta! Kritan ritar något."* (−22,4), 25 *"Hopp … plask!"* (−22,1). I filmen hörs det: *"En röd blomma!"* och *"Hej då, blommorna!"* är 5–9 dB starkare än repliken före (2:11,5 och 3:15,6). 41 och 42 är heller inte toppnormaliserade som de andra (−1,2 dBFS).
  **Förslag:** normalisera varje röstfil till samma loudness (t.ex. −19 LUFS) med topp högst −3 dBFS, med `loudnorm` i stället för toppnormalisering, och skriv om `ROST`-längderna om filerna kortas.
- **Grodans ljud är lika starka som Malin eller starkare:** kvaket efter *"Hej, grodan!"* (0:23,7) −15,0 LUFS mot Malins −17,4; sucken 0:38,2 −16,9 mot −16,4. `VOL` ger `groda-*` 2,8 mot Malins 2,5 (`boken.js:733`). Sänk till ca 2,0, så att grodan svarar under berättarrösten.
- **Ljud på orden [kod + hört i tidslinjen]:** `plask` på 1:36,67 när grodan landar (*"Hopp … plask!"* 1:35,8–1:37,0), `slick` på *"Mums"*, `pop` på *"lyft!"* (2:49,5) och slottet på *"sandslott"* (3:02,8), blommornas `glimt` på varje färgord. Stämmer.
- **Malin efter handlingen:** följs genomgående (0,2–0,9 s in, frågorna först). Rad 22 *"Och sand!"* kommer 0,2 s efter landningen – bra.
- **Överlapp:** med en `rader.json` byggd ur dagens `rader.mjs` hittar `qa-scen.py` inga repliker som går in i varandra eller förbi sin rad.
- **Tal som slutar tvärt vid klipp:** inga träffar (`qa-film.sh`, 31 klipp).
- **Röstfilernas början och slut (whisper):** `qa-scen.py --rost` på alla 57 filer i `assets/ljud/roster/sommaren-i-boken/` (whisper large-v3-turbo): inga filer som börjar mitt i ljud eller slutar tvärt, och inga tagningar delade på fel ställe.
- Rad 15:s `bild`-text i `rader.mjs` beskriver fortfarande vågkortet (bad 1–2), inte bad 4.

## Regelkontroll (vad skripten flaggade)

| Kontroll | Resultat |
|---|---|
| `qa-film.sh` längd, nivå | 213,07 s, −18,9 LUFS, topp −3,6 dBFS |
| svart, fryst > 3 s, tyst > 3 s | inget |
| boil kod (`boken.js`) | inget (boil 2,5 px delat med kamerans skala, ny brus 6 gånger/s, `boken.js:577`) |
| krita kod | inget (kritan via `verktyg/kritan-ritar.js`) |
| boil film | **ej mätt** (`--snabb`) |
| röst rader, röst filer | tomma, men **kontrollen kördes inte på riktigt** (F8). Omkörd: inga överlapp, och `--rost` (whisper) hittade inga fel i de 57 filerna |
| röst tvärt vid klipp | inget |
| Inga djurnamn | ok: "grodan", "kritan", "solen" i alla repliker och filnamn |
| v3-taggar utan `[excited]` | ok |
| Förbjudna repliker (*"Vad kan det vara?"*, *"Vad säger man?"* …) | ok |
| *"Varsågod"* – *"Tack, kritan!"* direkt | ok (0:51,8, 0:56,5) |
| Bildutsnitt | **brott:** F1, F7, glassvyn (förslag 11), solen i rad 06 (förslag 10), hoppen ut ur bild (R5) |
| Inget går genom något | korten, hinken, spaden, glassen: ok i täta bilder. Pärmen och kameran: F2 |
| Saker i handen helt i bild | **brott:** F6 |

## Gemensamt för de fyra årstiderna (att jämföra med 063–065)

Samma kod finns i 063, 064 och 065 (kontrollerat med grep, inte granskat i film):
- `glid()` med `lage`/`fran3` (F3): hoppar när två vyer har olika mål-z.
- `PARM_NER = [STANG + 1.05, STANG + 1.75]` (F2).
- Röstsökvägen bara i `boken.js`, så `qa-scen.py` hittar ingen röstmapp (F8). Kolla också att `rader.json` är aktuell.
- Röstfilerna toppnormaliserade (kolla loudness per fil).
- `VOL` 2,8 för figurens ljud mot Malins 2,5.
- Fasta närbildsvyer som inte följer figuren: kolla att ansiktet är i bild när figuren flyttat sig.
- Sak i handen: `sakBild`-skalan och närbilden som kapar handen.

## Inte kontrollerat

- Line boil i filmen och vita kanter i full upplösning (filmen är `--snabb`). Kanterna ser jämna ut i halv upplösning.
- Den sammansatta filmen (loggan, prenumerera-kortet, outrot) och dess slutliga loudness.
- **Status 28/11: rättat i koden** (skuggan bara när kortet syns, `!BLOM`). **Kontaktskuggan till `BLOMMOR_UPPE`** [kod, ej bekräftad i bild]: `boken.js:603` sätter `flik.visible &&= t >= S('19')`, så skuggan kan synas från rad 19 fast blommorna själva är dolda (`BLOM` = sant). Jag kunde inte skilja den från blommornas egna skuggor i halv upplösning. Kolla med en stillbild vid x 0,98, z 0,2.
- **Status: kvar,** bedömd som liten. Hinkens skugga på sandhögen (2:47,7–2:47,9, 2:50,3): en mörk halvgenomskinlig fläck på sandkortet när hinken passerar. Rätt ljus, men den ser ut som en fläck; bedömd som liten.
- 063, 064 och 065 i film.
- Hur YouTube-texten och miniatyren ser ut (utanför scenen).
- **Status 28/11: rättat** (tabellen beskriver nu blommorna, badet, sandslottet och stängningen). Dokumentationen: `manus.md` *Så rör det sig* beskriver fortfarande blommorna bakom busken och struten på gräset, och receptet säger 2:48; scenen är nu 3:33.
