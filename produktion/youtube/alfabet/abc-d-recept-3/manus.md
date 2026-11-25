# Kritans ABC D – recept 3: Dinon knackar på

Gjord 2026-11-21 efter `format/abc-recept-3-kompisen-vill.md`, kopierad ur `../abc-b-recept-3/` (B:s rättelser från feedbacken 21/11 följer med: stor kloss mitt i introt, skissen med ansikte, kritan som syns och nickar). Den gamla D-filmen (recept 1) står kvar orörd i `../abc-d/` tills den här är godkänd.

**Läge (2026-11-21):** Sanna godkände replikerna (61 rader, `malin-d-recept-3.txt`) och tagningen. Scenen `index.html` är byggd och `abc-d-recept-3.mp4` är en snabb förhandsvisning (960 × 540) med **Malins tagning 2** (ElevenLabs, Malin – Professional Swedish Narration, Eleven v4, stability 0,5, similarity 0,75, samma inställningar som B; `produktion/ljud-original/roster/abc-d-recept-3/tagning-2.mp3`), delad med `verktyg/dela-tagning.py` till `assets/ljud/roster/alfabet/abc-d-recept-3/`. *"Gris?"* och *"Docka!"* är ur tagning 1 (samma körning, `tagning-1.mp3`), där de lät tydligare. Alla 61 rader kontrollerade med whisper. Datorrösten ligger kvar i `platshallare/`, platshållarfilmen i `aldre/`. Feedbacksidan: `ABC-d3`.

- Konturerna (nya, spårade med `kontur-bild.py`): `karaktarer/dinon-disa/premium/disa-faceless-kontur.json`, `rekvisita/gris-rosa/cut/gris-rosa-hel-kontur.json`, `rekvisita/dorr-abc/cut/dorr-abc-kontur.json`, `rekvisita/docka/cut/docka-kontur.json`. Skissernas detaljer (dinons mage, ögon, kinder och leende; grisens tryne och öga; dörrens knopp; dockans ögon och mun) är mätta i bilderna.
- Storlekarna: `RIGG_SKALA` 0,62 och `KOMPIS` 0,95 ger dinon ca 450 px; dörren (`DORR_RIT`) är ca 570 px hög med steget på golvet, x ca 1060–1425. Dinon knackar från `DINO_DORR` (x 870). Dockan tittar fram vid `DOCKA_TITT` (x 1480, en tredjedel bakom dörren) och ställer sig vid `DOCKA_UT` (x 1640).
- Vita kanter i scenen (regeln 3 px + 1 % av höjden): dörren 13,5 px → 8,8 med `dorr-abc-tunn` (regeln 8,7), dockan 9,7 → 8,0 med `docka-tunn` (regeln 6,9), grisen ca 5 (regeln 6,6), dinon ca 6,5 (regeln 7,5). De tunna bilderna är nya filer bredvid originalen (`verktyg/tunn_kant.py`); originalen är orörda.
- Nytt i scenen: `knacka` (dinons högra arm mot dörren, en knack i taget, dörren vickar och `knack` hörs på varje) och `tittaFram` (dockan lutar sig ut bakom dörren). Lagren följer ordningen i `SAKER`: dockan bakom dörren, dinon framför.
- Förhandsvisning: `node avsnitt/020-grisen-badar/scener/render.mjs produktion/youtube/alfabet/abc-d-recept-3 --snabb` (`verktyg/render-delat.mjs` tar alfabetets `render.mjs`, som saknar `--snabb`).

**Meningen:** Dinon vill hälsa på någon, men har ingen dörr att knacka på. Malin ber kritan rita något att knacka på, och det måste börja på D. Kritan ritar fel (grisen, hej då!). Kritan ritar dörren: dinon knackar, knack knack, men ingen svarar. Dinon vill veta vem som bor där, och kritan ritar vem som bor bakom dörren: dockan tittar fram. Den udda i leken är hunden, som i B och E.

- Dinon är riggen `dinon-disa` (v2, uttryck och poser i `premium/uttryck.html`). Den är stor (SKALA 0,5 i sina avsnitt), här `RIGG_SKALA` 0,62, mätt mot dörren med stillbilder: dörren är ca 1,25 gånger så hög som dinon. Dinon har ingen egen röst i ljudbanken och låter med `brum-glad`, som i recept 1.
- Grisen är `rekvisita/gris-rosa` (Flow, från sidan, fyra ben i egen bild, inget öga: ögat i kod). Ingen ny Flow-bild behövs. Kritan ritar konturen, trynet och ögat.
- Dörren `dorr-abc`, dockan `docka` (urklippen från recept 1-filmen). Hunden riggen `hunden-hugo`, som i B.
- Ordet är *"dinosaurie"* (som i recept 1). I berättelsen säger Malin *"dinon"*, kort, som i 033 (*"lila dinon"*).

## Uppslagen

Tiderna fylls i ur förhandsvisningen. Rörelsen kommer först, Malin efteråt.

| Del | Bild (en rörelse) | Malin | Ljud |
|---|---|---|---|
| 1 | Klossen snurrar in, kritan ritar D:et, klossen snurrar ett varv | Hej hej! · Kritan ritar. · Det är ju D! · Bokstaven D. | swoosh, pop, krita, pling |
| 2 | Märket flyger till hörnet. Kritan ritar dinons kontur mitt i bild (med ögon, kinder och leende i skissen) | Kritan ritar något på bokstaven D. · Hmm … · Vem är det? *(paus 4 s)* | krita |
| 2 | Bilden fylls i, dinon hoppar och kliver fram | Dinosaurie! · D, d, dinosaurie! · Ja! Dinosaurie börjar på bokstaven D. | pop, pling, rawr (snällt), jippi |
| 2 | Dinon skuttar åt vänster och vinkar | Hej, dinon! | dunk, dunk |
| 3 | Närbild: dinon ser sig om, nyfiken, sedan lite ledsen | Dinon vill hälsa på någon. · Men dinon har ingen dörr att knacka på. | – |
| 3 | Hela bilden, kritan kommer in i bild | Kritan! Kan du rita något att knacka på? | – |
| 3 | Dinon lutar sig fram och "viskar", sedan nickar den: ja! | Vad sa du, dinon? · Måste det börja på bokstaven D? | – |
| 3 | Kritan nickar och går direkt till att rita | Kan du det, kritan? · Nu ritar kritan. | – |
| 4 | Kritan ritar grisens kontur till höger | Hmm … · Vem är det? *(paus 4 s)* | krita |
| 4 | Bilden fylls i: en gris. Den hoppar till | Gris? · En gris! | pop, nöff |
| 4 | Närbild: dinon blir förvånad, sedan skrattar den | Ha ha! Busiga kritan! · Gris börjar inte på D. | – |
| 4 | Grisen går ut åt höger (benen går), dinon vinkar | Hej då, grisen! | steg |
| 5 | Kritan ritar dörrens kontur till höger om dinon, dinon tittar nyfiket | En gång till! · Något på bokstaven D att knacka på, tack! · Hmm … · Vad blir det? *(paus 4 s)* | krita |
| 5 | Bilden fylls i: dörren. Dinon jublar | Dörr! · D, d, dörr! · Dörr börjar också på D! | pop, pling, jippi |
| 5 | Dinon kliver fram till dörren och lyfter armen | Kom, dinon! Knacka på! | steg |
| 5 | Armen knackar två gånger, dörren vickar på varje knack | Knack, knack! · Är det någon hemma? | knack, knack |
| 5 | Tyst en stund, dinon tittar på oss. Den knackar igen, tre gånger | Dinon knackar igen. · Knack, knack, knack! | knack ×3 |
| 6 | Dinon lutar sig mot dörren, nyfiken | Dinon vill veta vem som bor där. · Kritan, rita vem som bor bakom dörren! | – |
| 6 | Kritan ritar dockans kontur vid dörrens kant: bara huvudet och en arm syns, resten är bakom dörren | Hmm … · Vem är det? *(paus 4 s)* | krita |
| 6 | Bilden fylls i: dockan tittar fram bakom dörren. Dinon jublar | Docka! · En docka! · Docka börjar också på D! | pop, pling, jippi |
| 6 | Dockan tittar fram igen, sedan hoppar den ut och ställer sig bredvid dörren | Titta! Dockan tittar fram! · Hej, dockan! | hopp |
| 6 | Närbild: dinon jublar (hurra) | Nu har dinon en kompis! | – |
| 7 | Tre bildklossar poppar fram och hoppar in på sina plattor. Blandningen | Nu leker vi! · Titta noga. Var är dinon? | duns, klistra, swoosh |
| 7 | Dinons kloss hoppar till | Där är den! | pling |
| 7 | Muren. Hunden dunsar ner, dinon blir förvånad i närbild | Titta! En till. · Dinosaurie! · Dörr! · Docka! · Hund. · Vilken ska bort? · Vilken börjar inte på D? *(paus 4 s)* | vov |
| 7 | Hunden hoppar ner och går ut, dinon vinkar och jublar | Hunden! · Hund börjar inte på D. · Hej då, hunden! | vov, tassar, jippi |
| 8 | Klossarna på rad, var och en hoppar på sitt ord | Dinosaurie, dörr, docka. · Alla börjar på bokstaven D. | – |
| 8 | Discot: dinon hoppar ur klossen och dansar stor, de andra snurrar, pyramid | Nu dansar vi! · Dinon dansar! · Dörren snurrar! · Dockan snurrar! | disco |
| 8 | Dinon vinkar | Det var allt för i dag. · Vad kul det var att leka! · Hej då! | – |
| 8 | Klossarna rullar ut, D-märket hoppar till mitten och står kvar | – | duns, pling |

## Avsteg från de fasta replikerna

Ord 2 är en sak att knacka på, inte en kompis:

| E (fast replik) | D |
|---|---|
| Men elefanten har ingen kompis. | Men dinon har ingen dörr att knacka på. |
| Kritan! Kan du rita en kompis? | Kritan! Kan du rita något att knacka på? |
| Måste kompisen börja på bokstaven E? | Måste det börja på bokstaven D? |
| En kompis på bokstaven E, tack! | Något på bokstaven D att knacka på, tack! |

Leken i del 5 är knackningen (receptets handling *Knack knack*), och dörren svarar genom att vicka. Den lilla viljan i del 6 är *"Dinon vill veta vem som bor där."* / *"Kritan, rita vem som bor bakom dörren!"*. Ord 3 kommer som överraskningen bakom dörren.

## Regelkoll

- Inga djurnamn, inga utdragna ord, ingen *"Lyssna!"*, inget *"Säg du"*, aldrig *"Vad kan det vara?"*.
- *"Vem är det?"* för dinon och grisen, *"Vad blir det?"* för dörren. **Dockan får *"Vem är det?"***: den är någon som bor bakom dörren, och frågan i del 6 är *"vem som bor"*. (Recept 1 hade *"Vad blir det?"* för dockan.)
- *"Hej hej!"* i introt, en v3-tagg per rad, 61 rader.
- Dinon håller aldrig i något och går inte in genom dörren: den knackar med armen och dörren vickar.
- Dörren öppnas inte (ett urklipp): dockan står bakom dörren i lagren och tittar fram vid kanten.

## D säger sitt ljud (2026-11-21, som E)

Sanna godkände (feedback på E 3:54: *"det viktigaste att lära sig är hur e låter … kanske får E ögon och mun"*) att bokstavsmärket säger sitt eget ljud. I introt, efter *"Bokstaven D."*, får klossen ögon och mun och säger *"d, d, D!"* en gång. I slutet, efter *"Hej då!"*, blir märket stort och säger det två gånger med en paus för barnet emellan. Ljuden är klippta ur Malins tagning utan nya krediter: `d-ljud-1` (andra "d" ur `p-d-d-dino`), `d-ljud-2` (andra "d" ur `p-d-d-dorr`), `d-ljud-3` (första "D" ur `p-d-d-dino`), med 15/40 ms toning. Ansiktet (`ANS` i `index.html`): ögonen på D:ets övre kant (Sanna: *"eyes on letter"*), (−62, −252) och (30, −250), munnen strax under i hålet (−10, −88), i bokstavens mått. Patchen är samma som i E, A och B.

## Feedback 22/11 (ABC-d3, render 21/11 20:34)

- **1:22 och 2:33 "arm flying in air":** dinons armar uppe (vinkningen och *hurra*) stod en bit ut från kroppen, med ett glapp. Nu dras armens rot in bakom kroppen (`klapp` 45 px, `s.armIn`, bara för dinon), och vinkarmen går snett ut och upp, 60–80° (+ uttryckets 20), i stället för 112–136°. Knackarmen får samma indrag till 60 %.
- **1:22 "better pig image":** grisen är nu den runda kritgrisen (`gris-rosa/v1`, samma bild som Gissa teckningens första gris) med rörelsestrecken och ögat bortplockade: `assets/rekvisita/gris-rosa/cut/gris-rosa-rund.png`, konturen `gris-rosa-rund-kontur.json` (kontur-bild.py), trynet (880, 512) och ögat (770, 439) mätta i bilden. Benen sitter fast, så grisen vaggar när den går ut. Den gamla fyrkantiga grisen är orörd.
- **1:56 "bigger composition, too much white space":** kameran går närmare när dörren fylls i (1,3, mitt 830/650: dinon och dörren) och följer med till dörren när dinon går dit (1,42, mitt 1210/650: dinon, dörren och dockans plats), till närbilden efter dockan.

## C:s riktning 2026-11-23 (Sanna: "Bring C's direction into A, B, D and E")

- Introt: *"Titta, kritan ritar en bokstav."* (C:s klipp) och kritan börjar rita på *"Titta"*. Efter *"Bokstaven D."*: Malin *"Hej, D!"*, märket *"Hej! D! D!"*, Malin *"Hur låter D?"*, märket *"d, d, D!"*.
- Efter varje ord frågar Malin först och märket svarar med ordet: *"Hur låter D i dino?"* → *"d, d, dino!"*, *"Och i dörr?"* → *"d, d, dörr!"*, efter dockan bara märket: *"d, d, docka!"*.
- Gömleken: *"Titta noga."*, klossarna vänder ryggen till, tre lugna byten, *"Var är dinon?"* och 3,2 s paus med ledtrådar (dinon brummar inifrån klossen, klossen vickar två gånger, kameran glider mot den). Dinons kloss vänder sig först: *"Där är den!"*. Dinons kloss vrids nu som de andra (−0,06, var 0,10), så att en sida syns.
- Skissen: också ryggtaggarna i mörkare lila och en linje längs svansen (mätta på `disa-faceless.png`).
- Armarna: vinkningen 90° ± 6° i 1,3 gånger/s (var 90° ± 10° på 0,7 s), `hurra` 84° i den här scenen (riggen har 100°).
- Rösterna: `produktion/ljud-original/roster/abc-recept-3-adbe/` (Malin `malin-1.mp3`, bokstaven `louise-1.mp3`). `n-titta-noga` är delad i `n-titta-noga-1` och `n-var-ar-dinon`.

## E:s riktning 2026-11-25 (Sanna godkände replikerna: "A:s och D:s repliker är ok, spela in dem i ElevenLabs")

Efter receptets *E:s riktning* (`format/abc-recept-3-kompisen-vill.md`), som B fick samma dag.

**Introt är ett samtal:**

| Bild | Vem | Replik |
|---|---|---|
| Kritan ritar D:ets kontur (börjar på *"Titta"*) | Malin | [warm] Titta, kritan ritar en bokstav. |
| Bilden fylls i inifrån | Malin | [warm] Bokstaven D. *(befintligt klipp, som i B)* |
| D puffar upp, ögon och mun poppar fram | D | `x-glad` *D!* (uppåt) |
| | Malin | [warm] Hej, D! |
| D vickar | D | `x-halsar` *D-d!* (upp–ner) |
| | Malin | [curious] Ska vi leka, D? **(ny)** |
| Två lugna hopp | D | `x-ja` *D! D!* |
| | Malin | [happy] Ja! Vad kul! *(E:s klipp)* |
| D krymper och flyger till hörnet | Malin | [curious] Vad ritar kritan nu? *(E:s klipp)* |

**D säger bara D, i fem toner** (Olivia, som E och B), och tycker till före Malin:

| Stund | D | Malin |
|---|---|---|
| Dinon fylls i, efter *"D, d, dinosaurie!"* | `x-ja` | *"Ja! Dinosaurie börjar på bokstaven D."* |
| Grisen, efter *"En gris!"* | `x-undrar`, sedan `x-nej` | närbilden, *"Ha ha! Busiga kritan!"*, *"Gris börjar inte på D."* |
| Dörren, efter *"D, d, dörr!"* | `x-ja` | *"Dörr börjar också på D!"* |
| Dockan, efter *"En docka!"* | `x-ja` | *"Docka börjar också på D!"* |
| Gömleken | tyst | |
| Muren, efter *"Hunden!"* | `x-nej` | *"Hund börjar inte på D."* |
| Slutet, märket i mitten | `x-ja` (stolt) | |
| *"Hej då!"* | `x-halsar` samtidigt som Malin | |

**Går bort:** *"Det är ju D!"*, *"Hur låter D?"*, *"Kritan ritar något på bokstaven D."*, *"Hur låter D i dino?"*, *"Och i dörr?"* och alla märkets ord (*"Hej! D! D!"*, *"d, d, D!"*, *"d, d, dino!"*, *"d, d, dörr!"*, *"d, d, docka!"*).

**Nytt att spela in:** Malin *"Ska vi leka, D?"* och Olivias fem toner (*D!*, *D-d!*, *D! D!*, *D-d.*, *D?*). Allt annat finns.

**Scenen:** D:s ansikte större (`HUVUD`, ögonradie 42, rosa kinder, större mun), dinon `tempo` ca 0,4 (konturen ca 2,6 s, hela teckningen ca 6 s), grisen, dörren och dockan 0,42–0,5, gissningspausen 4 → 3,3 s, E:s mjukare skuggor, E:s lugnare gömlek (`VANDSEK`, `BYTSEK`), musiken i introt och berättelsen 0,5 → 0,38.

**Byggt 2026-11-25** (scenen före ändringen ligger i git):

- Introt som samtal, `eTon()` i hörnet (som B), `sagE()` för D:s mun. `bLjud`, `d-hej`, `d-dino`, `d-dorr`, `d-docka`, `d-ljud-1…3` används inte längre.
- D:s ansikte: `HUVUD` [-80, -235, 50, 62] (var [-55, -240, 28, 40]), i hörnet där ryggen möter översta strecket, rosa kinder, större mun.
- Teckningarna: dinon `tempo` 0,4, grisen 0,42, dörren och dockan 0,45. `PAUS` 3,3.
- E:s mjukare skuggor, gömleken med `VANDSEK` 0,9 och `BYTSEK` 1,6 (klossarna snurrar ett varv i bytet), pausen 2,8 s. `krock.mjs`: inga krockar.
- Musiken i introt och berättelsen 0,5 → 0,38.
- `n-ja-vad-kul` och `n-vad-ritar-nu` är E:s klipp (`abc-e-recept-3-v2`).
- Förhandsvisning (`--snabb`, 4:17) på feedbacksidan som `ABC-d3`, status granska. Filmen före ändringen: `aldre/abc-d-recept-3-fore-e-riktning.mp4`. QA: −21,6 LUFS, inget svart eller tyst; stillheten 0:25–0:28 är gissningspausen efter *"Vem är det?"*.
- **Röster:** *"Ska vi leka, D?"* är Malin (Sanna 2026-11-25), `produktion/ljud-original/roster/abc-d-intro-2026-11-25/malin-a-och-d.mp3` 2,08–3,56 (början är A:s rad). D:s toner är **Olivia** (*Bright, Youthful and Engaging*, v4), som E och B (Sanna: *"No, redo with Olivia"*; Louise-tagningarna i samma mapp används inte): `olivia-1.mp3` har A:s toner först och D:s två gånger, klippta ur andra omgången efter tonhöjden: `x-glad` 9,93–10,60 (stiger till en topp), `x-halsar` 10,73–11,40 (två stavelser, *D-d!*), `x-ja` 11,60–12,84 (två *D!*), `x-nej` 13,08–13,50 (faller jämnt), `x-undrar` 13,96–14,33 (stiger). Ingen har lyssnat på dem i blandningen än.

## Täta bilder runt dörren och dockan 2026-11-25 (Sanna: "inget går genom något")

Kontrollerat 6 bilder/s 1:47–2:39 (dinon går till dörren, knackningarna, kritan ritar dockan, dockan tittar fram och hoppar ut, klossarna poppar fram).

- **Dörren vickade ner i golvet:** den vreds ±7° kring mitten, så tröskelns ena hörn gick ner i golvet på varje knack. Nu gungar den bara bort från knacken, 4°, kring tröskelns högra hörn: vänstra kanten lyfter lite och sätts ner igen.
- **Kritan över dörren (2:07):** kritan följde dockans kontur in över dörren medan den dolda delen ritades. Nu stannar spetsen vid dörrens högra kant (`DORR_KANT`) så länge dockan ritas, och den dolda delen ritas bakom dörren.
- Utan fel: dinons arm och svans ligger framför dörrkanten (dinon står närmare), dockan står bakom dörren när den tittar fram och kliver ut vid sidan, och klossarna poppar fram bakom dinon och dörren (längre bak på golvet, y 875 mot fötternas 940).

## Öppet

- *"Gris?"* är tyst i båda tagningarna (topp ca −14 dB, de andra frågorna ca −11). Lyssna om den behöver höjas.
