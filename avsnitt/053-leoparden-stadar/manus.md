# Avsnitt 053 – Leoparden städar (plan)

**Status:** grind 1 (manus) godkänd av Sanna 2026-11-25 (korgen som är full, fel hål en gång, en teckning i berättelsen). **Samma dag: mer samtal och reaktioner** (Sannas mönster från 052: Malin frågar, leoparden svarar i pausen, Malin reagerar). 10 nya repliker (🆕) och en ändrad (✏️), **godkända av Sanna 2026-11-25**. **Grind 2 (saker) klar 2026-11-25:** formlådan nr 2 och klossarna nr 2 (med tjocklek och skuggning, grön trekant) är valda av Sanna, urklippta med tunnade kanter (ca 1 %) och beskrivna i `rekvisita/formlada.md` och `rekvisita/klossar.md`. **Grind 3 (rösten) inspelad 2026-11-25:** Malins tagning i ElevenLabs (Malin, Eleven v3, Natural, generation 1 av 2), `produktion/ljud-original/roster/053-leoparden-stadar/malin-tagning-1a.mp3`, 1b sparad bredvid. `dela-tagning.py` hittade inte gränserna där repliker sägs i ett svep (*"En cirkel, en fyrkant och en trekant"*, *"Oj då, korgen är full"*), så de 46 replikerna klipptes vid tagningens pauser och kontrollerades en och en med whisper. Filerna ligger i `assets/ljud/roster/leoparden-stadar/` med toppen på −3 dBFS och längderna i `rost-langder.txt`. Provlyssning: `ljud/provlyssna-rost.m4a`. **Godkänd av Sanna 2026-11-25** (alla rader); 16 repliker gjordes tydligare och spelades in igen samma dag (tagning 2b, godkänd). **Grind 4 (ljuden) godkänd 2026-11-25:** spinn-ljuden som de är, nytt `klonk` (CC BY, credit i YouTube-texten). **Storyboarden omgjord 2026-11-25 efter Sannas feedback** (fler reaktioner, närmare utsnitt, fler uttryck, varierade ljudsvar och lite snabbare tempo). **Grind 5 (animatiken) byggd 2026-11-25:** `storyboard/` (rader.mjs, scen.html, bygg.mjs, 51 stillbilder, `animatik.mp4` 3:22), **godkänd av Sanna 2026-11-25**. **Grind 6 (scenen) byggd 2026-11-25:** `scener/sovrummet/index.html` (rum.js, Lovas v2-rigg, kritan genom `kritan-ritar.js`, boil 2,5/zoom, brus 6/s), `film/satt-ihop.sh` → `film/avsnitt-053.mp4` (3:24, snabb förhandsvisning, QA ren utom boil-info vid ritintrot, zoomen, rad 11b/12 och irisen). Rad 24 förlängd 1,4 s så att spinnet hörs klart. På feedbacksidan (granska); slutrendering efter Sannas feedback. **Feedback 2026-11-25 kväll (Sanna):** platsen är nu **gröna lekrummet v2** (`assets/bakgrunder/lekrummet/lekrummet-v2.jpeg`), utan säng: trekanten gömmer sig **bakom kaktusen** (ny sak, `rekvisita/kaktus.md`) och rad 38 blir *"Ja, där! Bakom kaktusen!"*. Korgen är `korg-v3-natt-tunn.png` med leksakerna inom öppningen bakom framkantens båge, nallen har ansikte i kod (`R.nalleBild`). Tabellerna nedan om sovrummet och sängen gäller den förra versionen. **Feedback 2026-11-25 kväll, 0:45 och 2:04 ("polish animation"):** leoparden plockar nu upp klossarna med riggens plockning (`plockaDel`, som 037): blicken först, hon lutar sig ner åt vänster, tassen läggs ovanpå klossen, tar in den framför magen, hukar (förberedelse) och kastar i en lugn båge. Vid korgen landar klossen ovanpå leksakshögen, vickar, tippar över framkanten (aldrig genom den) och cirkeln rullar tillbaka mot leoparden; ett reaktionsslag (förvånad, öronen upp) före Malins replik. Vid lådan (rad 19 och 21) kastar hon på samma sätt i stället för att klossen flyger in från korgen; cirkeln rullar till det runda hålet med ett litet hopp över det fyrkantiga, och lådbilden visar hela leoparden (förut skars hon mitt itu). Rad 5a/5b, 7a/7b, 19 och 21 blev längre (filmen ca 3:31). **Djup QA samma kväll ("fixa alla fynd"):** klossen i tassen ritas av scenen och ligger hela tiden framför leoparden, hel, med tassen ovanpå (riggen får bara ett osynligt grepp); cirkeln vrids kring sin mitt, så den rullar på lådan och sjunker ner i det runda hålet i stället för att glida ner på framsidan; cirkeln tippar ut åt höger och landar bredvid fyrkanten (inte genom den), och klossarna på golvet ritas i djupordning; hatten flyger rakt in bakom krukan; `nar` utan `bada` (en arm, inte en solfjäder av tassar); lådbilden flyttad 60 px åt vänster så att fyrkanten syns hel; hyllans klossar i bakgrunden färgvridna till lila och brunt (liknade cirkeln och fyrkanten); rad 11 0,4 s längre så att spinnet tar slut före klippet. Kvar: trekanten glider själv från kaktusen till lådan (rad 27), eftersom lådan står mellan leoparden och kaktusen; att hämta den kräver att hon går runt lådan. **Djup-kit samma kväll (Sanna: "lägg in i alla"):** `verktyg/djup3d.js`. Plattan i band (väggen −0,1, golvet 0 vid korgens fot y 900, +0,04 längst fram) så att rummet får parallax när kameran rör sig; varje skott får en lugn push/glid/settle (25b och första delen av 26 åker själva och får ingen extra). Klossarna faller från korgen med riktig fysik (`djup.studs`): cirkeln landar till höger om fyrkanten, studsar en gång och rullar till x 420; fyrkanten studsar och lägger sig på en hel sida där den låg. Kontaktskuggan krymper när klossen är i luften, dunsen följer träffarna (andra svagare). Landningarna på högen och lådan får en liten studs (ca 8 px). Figurerna är platta som förut.

Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med leoparden, leoparden svarar med spinn-ljud, öron och ansikte. Ca 3:45.

**Förlaga:** 037 Kaninen städar (korgen full av leksaker). Likt men inte identiskt: här är problemet att **klossarna inte får plats** (korgen är redan full), och vändningen är att kritan ritar en **formlåda** där varje kloss har sitt eget hål. Barnet letar efter **trekanten**, som har åkt in under sängen.

**Skillnad mot 027 Zebran plockar undan** (samma sovrum, också något under sängen): där var problemet "vill inte", saken var en boll och lösningen en radio. Här vill leoparden gärna städa men det finns ingen plats, och barnet har själv sett trekanten åka in under sängen i leken.

**Enkel animation.** Leoparden tar inte i klossarna med böjda armar. En rak tass puffar till klossen, och klossen glider själv i en lugn båge. Trekanten som hatt sitter i tassens spets och glider upp på huvudet. Klossarna sjunker rakt ner i sina hål och kläms aldrig genom något.

| | |
|---|---|
| **Titel** | Leoparden städar (avsnitt 53) |
| **Figurer (1)** | **Leoparden Lova** (v2, riggad, ✅ referensark klart, `assets/karaktarer/leoparden-lova/premium/`) |
| **Platser (1)** | **Sovrummet** (`bakgrunder/sovrummet.md`, samma uppställning som 027): sängen till höger med täcket som hänger ner över kanten, korgen vid väggen till vänster om sängen. Dagshimmel i fönstret. Inget platsbyte, inget kritsvep |
| **Saker som finns** | sängen (`sangen`), täcket (`tacket`), kudden (`kudde`), korgen (`korg`, `cut/korg-v3.png`) full av leksaker som i 037: nallen (`nalle`), röda bollen (`boll-rod`), röda bilen (`bil-rod`), blå hinken (`hink-bla`), badbåten (`badbat`) |
| **Nya saker (2)** | **formlådan** (`formlada`, kritan ritar den) och **klossarna** (`klossar`: röd cirkel, blå fyrkant, grön trekant). Se listan längst ner |
| **I kod** | himlen i fönstret, skimret runt trekantens hörn, glitter, små streck när en kloss landar, klossarna som sjunker ner i hålen (maskade vid lockets kant) |
| **Musik** | ingen ny musik. Förslag: `stada-radion-slinga.m4a` (027:s städlåt) lågt (ca 0,10) från *"Nu städar vi"* (rad 18) till och med skramlet (rad 30), sänkt i frågepausen. Platsmatta `hemmaljud` lågt |
| **Favoriter** | 🐆 leopard · 🧱 klossar · 📦 låda |
| **Kärna** | Leoparden har lekt, och klossarna ligger överallt: en cirkel, en fyrkant och en trekant. Leoparden vill städa, men korgen är redan full och klossarna glider ner igen. Kritan ritar en låda med tre hål: *"Varsågod!"* – *"Tack, kritan!"* Leken: trekanten blir en spetsig hatt, men när leoparden skuttar glider den av och in under sängen (bara ett grönt hörn syns). Tre gånger *"Ner i hålet … plopp!"*: cirkeln (som först provar fel hål), fyrkanten, och trekanten, som är borta. Barnet hittar den under sängen. Städat! Lådan skramlar. Hej då! |
| **Barnet övar på** | gissa vad kritan ritar · se vilken kloss som passar i vilket hål · hitta trekanten bakom kaktusen · säga tack |
| **Leken** | **trekanten blir en hatt** (uppslag 15–17) och **lådan skramlar** (uppslag 30) |
| **Lärotemat** | former, subtilt: Malin säger formens namn när klossen nämns, cirkeln stannar en gång på fel hål (*"Hm … inte där."*) och glider vidare till det runda, och ritintrot ritar trekanten. Ingen fråga om formerna, ingen lektion |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | raska men lugna steg från vänster (1,2 s) (riggens gång, `smasteg`), stannar till vänster om mitten före repliken, vinkar |
| Vinkar | armen bakom kroppen, snett ut förbi kanten (ca 60°), 3–4 lugna vink, den andra armen i vila |
| Glatt skutt | 20 px upp, tryck ihop före och efter. Inget studs |
| Puffar en kloss | rak tass lyfts mot klossen längs roten (0,4 s), klossen glider iväg själv i en lugn båge (0,8–1,0 s). Tassen tillbaka |
| Korgen är full | cirkeln (sedan fyrkanten) glider upp och lägger sig överst på leksakshögen, vickar lugnt ±4° två gånger och glider ner igen **framför** korgen till golvet (`duns` lågt). Går aldrig genom korgen eller leksakerna |
| Ledsen | öronen faller 12°, huvudet lutar lite, `spinn-gullig-6`. Ingen gråt |
| Kritan ritar lådan | kritan in uppe till höger, konturen på golvet bredvid leoparden i ett drag (4 s): lådans ytterform, lockets kant och de tre hålen som egna drag (cirkel, fyrkant, trekant), så att den går att gissa. Svävar och vickar lugnt i gisspausen (3 s), knackar aldrig. Lådan fylls i inifrån med `glitter`. Kritan flyger ut uppe till höger |
| Lådan | sedd rakt framifrån, lågt, med locket lite synligt ovanifrån så att de tre hålen syns i en rad: runt, fyrkantigt, trekantigt. Står still hela tiden utom när den skramlar |
| Kawaii-ögon | när lådan är klar (rad 12): ögonen med glitter, öronen reser sig |
| Trekanten blir hatt | rak tass sänks mot trekanten, trekanten sitter i tassens spets (tassen framför sakens nederkant, armen med mörkare kritkant), armen glider upp längs roten (0,6 s) och trekanten glider vidare och lägger sig mellan öronen, lite snett. Följer huvudet. Flyttas och vrids, skalas aldrig |
| Hatten åker av | glatt skutt med blundande glada ögon (fnisset), hatten glider av bakåt på landningen, ner på golvet och glider vidare in under täckets nedhängande kant. Bara ett grönt hörn sticker fram nedanför täcket och ligger kvar där. Leoparden ser det inte |
| Fel hål | cirkeln glider upp och stannar på det trekantiga hålet, vickar ±4° två gånger (får inte plats), leoparden lutar huvudet, sedan glider cirkeln vidare till det runda hålet |
| Ner i hålet | klossen står still över sitt hål 0,4 s, sjunker rakt ner (0,5 s, maskad vid lockets kant) och är borta på **"plopp!"** (`plopp`, `glitter`). Leoparden gör ett litet glatt skutt efteråt |
| Förvånad | trekanten är borta: tassen till huvudet, stora ögon, liten rund mun, öronen upp, 0,3 s stillhet |
| Tittar efter | `rikt ±0,3` och ögonen åt sidan, huvudet vänds inte |
| Skimret | trekantens hörn skimrar svagt efter 3 s av frågepausen, tydligt på *"Ja, där!"* (`tindra`) |
| Trekanten kommer fram | leoparden lutar sig 8° mot sängen och sträcker den raka armen längs roten, trekanten glider fram under täcket till tassen (`glid` lågt), sedan i en båge upp till lådan |
| Lådan skramlar | rak tass på lådans sida, lådan vickar ±3° två gånger (0,5 s var), `skrammel`. Ingen hoppar, inget snurrar |

## INTRO

Seriens intro som i de senaste bilderböckerna (bestäms vid bygget).

## KRITAN RITAR (~12 s) – trekanten

Kritan ritar **trekanten**, inte leoparden (Sanna 2026-11-25). Konturen i ett lugnt drag (ca 2,8 s, `kritan-ritar`): trekantens tre sidor med rundade hörn, och en kort inre linje längs ena sidan som visar klossens tjocklek, så att den ser ut som en kloss och inte bara en form. Kritan svävar medan barnet gissar, den gröna trekanten fylls i inifrån. Zoom in i teckningen och in i sovrummet, där trekanten ligger på golvet bland de andra klossarna. Skogsljud under.

## SOVRUMMET (dag)

**Tempo och reaktioner (Sannas feedback 2026-11-25, alla 052–057):** varje händelse följs av ett **reaktionsslag på 0,6–1 s** i närbild på ansiktet, med ett nytt uttryck där öronen och svansen följer med. Helbild bara där vi behöver se var vi är (rad 1, 17, 25, 28). Annars halvbild, närbild på ansiktet och detalj på tassar och saker. Stillbilder före en replik högst 1 s och gången in 1,2 s. Rörelsen är rask men lugn och studsar inte. Pauserna där barnet svarar står kvar som de är: gisspauserna 3 s, *"Ska vi säga tack?"* 2,5 s och *"Kan du se var trekanten är?"* 5 s. Leopardens svar varierar: aldrig samma ljud två gånger i rad, och tystnad räknas som ett svar.

Utsnitt: **H** helbild, **HB** halvbild, **N** närbild på ansiktet, **D** detalj (tass, sak, låda).

| # | Utsnitt och bild | Malin säger | Reaktion (uttryck, öron, svans) | Ljud |
|---|---|---|---|---|
| 01 | Papperet: kritan ritar trekantens kontur | Kritan ritar … *(paus)* Hm … vad ritar kritan? *(gisspaus 3 s)* Oj! En trekant! | – | `krita-ritar`, `skogsljud`, `glitter` |
| 1 | **H.** Klossarna ligger på golvet: cirkeln vid fönstret, fyrkanten mitt på golvet och trekanten framför sängen. Korgen står full vid väggen. Leoparden går in från vänster (1,2 s), stannar och vinkar | Hej, leoparden! Hej, hej! | `glad`, öronen upp | `smasteg`, `spinn-gullig-1` |
| 1b | **N.** Leoparden tittar på klossarna, sedan på kameran | Har du lekt med klossarna? *(paus: leoparden svarar)* Ja, vad kul! | `nyfiken` i frågan, sedan `jatteglad`: svansen vippar | `spinn-gullig-7` i pausen, `spinn-gullig-2` efter *"vad kul"* |
| 2 | **D** på golvet med klossarna, sedan **N** | Oj, oj, oj! Klossar överallt! | `fnissig`, ögonen kisar | `spinn-fniss-1` |
| 3a–c | **D** på cirkeln, fyrkanten och trekanten, 0,8 s var, och varje kloss glimtar | En cirkel … en fyrkant … och en trekant! | – | `glimt` ×3 |
| 4 | **N.** Leoparden nickar två gånger | Ska vi städa undan klossarna? *(paus: leoparden svarar)* Ja, bra idé! | `ivrig`, öronen reser sig, svansen vippar | `spinn-gullig-2b` i pausen, `spinn-gullig-3` efter |
| 5 | **D** på tassen som puffar cirkeln, sedan **HB:** cirkeln glider upp på leksakshögen, vickar och glider ner igen framför korgen, sedan **N** | *(när den landat)* Oj då! Cirkeln trillade ner. | `forvanad`, öronen upp, 0,3 s stilla | `tass`, `vick`, `duns` lågt, `spinn-gullig-5b` |
| 6 | **D** på korgen: nallen, bollen, bilen, hinken och båten ligger i en hög, sedan **N** | Korgen är full. | `tanker`, huvudet lutar | tyst |
| 7 | **D** på tassen som puffar fyrkanten, sedan **HB:** samma sak, upp, vickar, ner igen | Klossarna får inte plats i korgen. | – | `tass`, `vick`, `duns` lågt |
| 8 | **N.** Öronen faller, huvudet lutar | *(efter reaktionen)* Nej, fyrkanten trillade också ner. | `ledsen` (trumpen), öronen faller 12°, svansen hänger | `spinn-gullig-6` före repliken |
| 9 | **N.** Leoparden tittar på kameran | Hm … var ska klossarna vara? | `tanker` | tyst |
| 10 | **HB** på golvet bredvid leoparden. Kritan kommer in och ritar lådans kontur (4 s), gisspaus 3 s, lådan fylls i inifrån | Titta! Kritan ritar något till klossarna. *(gisspaus 3 s)* En låda! Med tre hål. | – | `krita-ritar`, `glitter` |
| 11 | **N.** Kawaii-ögon, öronen reser sig, svansen vippar | Varsågod, leoparden. Lådan är till klossarna. | `kawaii` | `spinn-gullig-2` |
| 11b | **D** på de tre hålen (0,8 s), sedan **N:** leoparden tittar på kameran | Tycker du om lådan? *(paus: leoparden svarar)* Ja, den är så fin! | `nyfiken`, sedan `glad` | `spinn-gullig-7b` i pausen |
| 12 | **N.** Leoparden tittar på lådan, sedan på kameran | Ska vi säga tack? *(paus 2,5 s)* | `nyfiken` | `spinn-gullig-5` |
| 13 | **HB.** Leoparden nickar direkt och kritan flyger ut | Tack, kritan! | `jatteglad` | `spinn-gullig-2b` |
| 14 | **D** på tassen som sänks mot trekanten | Vad ska du göra med trekanten? *(paus: leoparden svarar)* | – | `spinn-gullig-5b` i pausen |
| 15 | **HB.** Trekanten följer tassen upp och lägger sig på huvudet som en hatt, sedan **N** | *(när den sitter)* Oj! Trekanten blev en hatt! | `skrattar`, öronen vippar | `pop` lågt, `spinn-fniss-2` |
| 16 | **N.** Leoparden med hatten blinkar | En spetsig hatt! | `stolt`, svansen vippar | `spinn-gullig-4` (mysig suck) |
| 17 | **H.** Ett glatt skutt med blundande ögon. Hatten glider av, över golvet och in bakom kaktusen, och ett grönt hörn sticker fram vid krukan. Sedan **N** | *(när den stannat)* Hoppsan! Hatten ramlade av. | `fnissig`, leoparden ser inte vart hatten tog vägen | `glid`, `spinn-fniss-3` |
| 18 | **HB.** Leoparden vänder sig mot lådan (riktningsposen, vänds inte runt) | Nu städar vi. Först cirkeln. | `ivrig` | `spinn-gullig-2`, musiken börjar lågt |
| 19 | **D** på tassen som puffar, cirkeln stannar på det trekantiga hålet och vickar, sedan **N** | Hm … cirkeln passar inte där. | `tanker`, huvudet lutar | `tass`, `vick`, `spinn-gullig-5` |
| 20 | **D** på lådan. Cirkeln glider till det runda hålet och sjunker ner | Cirkeln ner i det runda hålet … plopp! | – | `plopp`, `klonk` lågt, `glitter` |
| 20b | **N.** Ett litet glatt skutt | *(när den landat)* Ja, cirkeln passade! | `stolt`, svansen vippar | `spinn-gullig-2b` före repliken |
| 21 | **D** på fyrkanten när den nämns, sedan **D** på tassen som puffar, och fyrkanten glider rakt till sitt hål | Nu tar du fyrkanten. | – | `glimt`, `tass` |
| 22 | **D** på lådan, fyrkanten sjunker ner, sedan **N** | Fyrkanten ner i det fyrkantiga hålet … plopp! | `jatteglad`, öronen upp | `plopp`, `klonk` lågt, `glitter`, `spinn-gullig-3` |
| 23 | **D** på det tomma trekantiga hålet, sedan **N:** tassen till huvudet, och hatten är borta | Och nu trekanten … Oj! Var är trekanten? | `forvanad`, stora ögon, liten rund mun | `spinn-gullig-5b` |
| 24 | **N.** Leoparden tittar åt vänster, sedan åt höger | Leoparden vet inte var. | `tanker`, öronen åt sidan | `spinn-gullig-7` (frågande prat) |
| 25 | **H** för frågan, sedan klipp till **D** på kaktusen där hörnet sticker fram bakom krukan. Efter 3 s skimrar det svagt | Kan du hjälpa leoparden? Kan du se var trekanten är? *(paus 5 s)* | – | tyst, musiken nedtonad |
| 26 | **D:** hörnet skimrar tydligt, sedan **N** | Ja, där! Bakom kaktusen! | `ivrig`, öronen reser sig | `tindra`, `spinn-gullig-2` |
| 27 | **HB.** Leoparden sträcker tassen, och trekanten glider fram och i en båge till lådan. **D:** trekanten sjunker ner. **N** (1 s) | Trekanten ner i det trekantiga hålet … plopp! | `jatteglad`, öronen upp, svansen vippar | `glid`, `plopp`, `klonk` lågt, `glitter`, `spinn-gullig-3b` |
| 28 | **H.** Golvet är tomt och lådan står med alla klossar. Glatt skutt | Nu är det städat! | `glad` | `spinn-gullig-2b` |
| 29 | **D** på lådan, där de tre hålen glimtar ett i taget, sedan **N** | Cirkeln, fyrkanten och trekanten. Alla i lådan. | `stolt` | `glimt` ×3, `spinn-gullig-4b` |
| 30 | **D** på tassen som puffar lådan två gånger, och lådan skramlar (1,5 s innan Malin). Sedan **N** | Hör du? Det skramlar! | `fnissig` | `skrammel` ×2, `spinn-fniss-4` |
| 30b | **N.** Leoparden tittar på kameran och nickar | Var det kul att städa? *(paus: leoparden svarar)* Ja, det tyckte jag också! | `glad`, svansen vippar | `spinn-gullig-4` i pausen, `spinn-gullig-2` efter |
| 31 | **HB.** Leoparden vinkar | Hej då, leoparden! Hej då, klossarna! | `glad` | `spinn-gullig-8` (hej då) |
| 32 | **N.** Leoparden vinkar klart | Hej då! Vi ses snart! | `kawaii` | `spinn-gullig-8b` |
| 33 | Kritirisen runt leoparden och lådan, sedan prenumerera-kortet (`produktion/youtube/prenumerera/`) och outrot | – | – | musiken tonar ut |

**Kamera:** bara hårda klipp mellan stillastående utsnitt, och ett nytt utsnitt vid varje händelse och varje reaktion. Helbild bara i rad 1, 17, 25 och 28. Zoomen in i teckningen efter ritintrot är den enda zoomen. Klippen kommer tätare än förut, men varje bild står kvar minst 0,6 s.

**Short:** uppslag 18–29 (ner i hålet tre gånger, hitta trekanten bakom kaktusen), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/leoparden-stadar/` (`01-kritan-ritar` …) med `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad ritar kritan?
[happy] Oj! En trekant!
[happy] Hej, leoparden! Hej, hej!
[curious] Har du lekt med klossarna?
[happy] Ja, vad kul!
[laughs] Oj, oj, oj! Klossar överallt!
[warmly] En cirkel …
[warmly] en fyrkant …
[happy] och en trekant!
[cheerfully] Ska vi städa undan klossarna?
[happy] Ja, bra idé!
[surprised] Oj då! Cirkeln trillade ner.
[curious] Korgen är full.
[warmly] Klossarna får inte plats i korgen.
[gently] Nej, fyrkanten trillade också ner.
[curious] Hm … var ska klossarna vara?
[happy] Titta! Kritan ritar något till klossarna.
[happy] En låda! Med tre hål.
[warmly] Varsågod, leoparden. Lådan är till klossarna.
[curious] Tycker du om lådan?
[happy] Ja, den är så fin!
[warmly] Ska vi säga tack?
[happy] Tack, kritan!
[curious] Vad ska du göra med trekanten?
[laughs] Oj! Trekanten blev en hatt!
[happy] En spetsig hatt!
[chuckles] Hoppsan! Hatten ramlade av.
[cheerfully] Nu städar vi. Först cirkeln.
[curious] Hm … cirkeln passar inte där.
[playfully] Cirkeln ner i det runda hålet … plopp!
[happy] Ja, cirkeln passade!
[cheerfully] Nu tar du fyrkanten.
[playfully] Fyrkanten ner i det fyrkantiga hålet … plopp!
[surprised] Och nu trekanten … Oj! Var är trekanten?
[curious] Leoparden vet inte var.
[warmly] Kan du hjälpa leoparden? Kan du se var trekanten är?
[happy] Ja, där! Bakom kaktusen!
[playfully] Trekanten ner i det trekantiga hålet … plopp!
[happy] Nu är det städat!
[happy sigh] Cirkeln, fyrkanten och trekanten. Alla i lådan.
[laughs] Hör du? Det skramlar!
[warmly] Var det kul att städa?
[happy] Ja, det tyckte jag också!
[happy] Hej då, leoparden! Hej då, klossarna!
[warmly] Hej då! Vi ses snart!
```

## Leopardens röst och ljud

Alla ljud finns i `assets/ljud/effekter/`: `spinn-gullig` (8 känslor, N och Nb, från 028/029; ordningen godkänd av Sanna vid grind 4, 2026-11-25), `spinn-fniss`, `smasteg`, `glimt`, `glitter`, `tindra`, `duns`, `glid`, `tass`, `vick`, `pop`, `plopp`, `klonk`, `skrammel`, `krita-ritar`, `skogsljud`, `hemmaljud`. Fniss högst 3–4 gånger (rad 2, 15, 17, 30), aldrig två rader i följd och aldrig över Malin.

**Nytt (grind 4, godkänt 2026-11-25):** `klonk`, ett mjukt träklonk när en kloss landar i lådan, lågt under `plopp` (rad 20, 22, 27). Ur *Soft hit wooden block* av jorickhoofd, CC BY 4.0: YouTube-texten ska ha raden *"Soft hit wooden block by jorickhoofd (freesound.org), CC BY 4.0"*.

## Regelkoll

- [x] 1 figur (leoparden), 1 plats (sovrummet), inget platsbyte, inget kritsvep i berättelsen
- [x] Inga djurnamn i det som sägs: "leoparden", "klossarna", aldrig figurens namn. Röstmappen heter `leoparden-stadar`
- [x] Aldrig *"Vad kan det vara?"*: ritintrot säger *"Hm … vad blir det nu?"*. Aldrig *"Vad säger man?"*: *"Ska vi säga tack?"*
- [x] Inga uppmaningar till barnet att göra något med kroppen. Barnets frågor: gissa teckningen (ritintrot, lådan), säga tack, var är trekanten
- [x] Nytt slags problem: något får inte plats (korgen är full), inte "vill inte". Leoparden vill städa hela tiden
- [x] Kritan ritar en sak ur berättelsen i ritintrot (trekanten), inte leoparden. Leoparden kommer in i rad 1
- [x] Barnet letar efter en sak som är borta: trekanten bakom kaktusen. Hörnet syns från rad 17, och barnet har sett den åka dit
- [x] Samma fras tre gånger: *"Ner i hålet … plopp!"* (cirkeln, fyrkanten, trekanten), och klossen är borta på *"plopp!"*
- [x] Formerna subtilt: Malin säger namnen när klossarna syns, ingen fråga och ingen förklaring
- [x] Varsågod och tack
- [x] Tydligt hej (med vinkning) och hej då, *"Hej då! Vi ses snart!"*
- [x] Malin efter handlingen: klossen glider och landar först, sedan *"Oj då!"*, *"Oj! En hatt!"*, *"Hoppsan!"*
- [x] Inga taggar `[excited]`
- [x] Samtal: Malin frågar leoparden fem gånger (lekt, städa, lådan, trekanten, kul), leopardens ljud ligger i pausen och Malin reagerar kort efter (Sanna 2026-11-25)
- [x] Inget läskigt: korgen är bara full, leoparden blir lite ledsen men gråter inte, trekanten syns hela tiden
- [x] Inget går genom något: klossarna glider ner framför korgen, sjunker bara rakt ner i sitt eget hål, trekanten glider in under täcket och fram igen samma väg
- [x] Inga snurrar, inga böjda armar: puff och hatt med raka armar längs roten
- [x] Två nya saker (formlådan, klossarna)
- [x] Ingen ny musik
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] **Kritan ritar bara en gång i berättelsen** (receptet säger två sedan 021). Se Öppet 3

## Saker: finns och nya

| Sak | Läge |
|---|---|
| Sovrummet | ✅ finns (`bakgrunder/sovrummet.md`, plattan som 027 använde) |
| Kaktusen | ✅ ny 2026-11-25 (`rekvisita/kaktus.md`, Flow nr 2, vald av Sanna), står på golvet till höger om lådan; ersätter sängen |
| Täcket | ✅ finns (`tacket`), hänger ner över sängkanten så att trekanten kan gömma sig under kanten |
| Kudden | ✅ finns (`kudde`) |
| Korgen | ✅ finns (`korg`, `cut/korg-v3.png`) |
| Leksakerna i korgen | ✅ finns: `nalle`, `boll-rod`, `bil-rod`, `hink-bla`, `badbat` (samma som i 037) |
| **Formlådan** | ✅ **ny, nr 2 vald** (`rekvisita/formlada.md`, `assets/rekvisita/formlada/cut/formlada.png`, 1131 × 815, hålens mått står i filen). Konturen görs vid bygget |
| **Klossarna** | ✅ **ny, nr 2 vald** (`rekvisita/klossar.md`, `assets/rekvisita/klossar/cut/kloss-cirkel.png`, `kloss-fyrkant.png`, `kloss-trekant.png`), med tjocklek och skuggning. Trekantens kontur görs vid bygget |

Trekanten är grön och inte gul, så att den syns mot leopardens gula päls när den sitter på huvudet.

## Kontroll mot regler (2026-11-25)

Det finns bara manus och saker än: ingen storyboard, ingen scenkod. Därför finns inga scener att köra `qa-scen.py` på. Kör den när scenen byggs (`python3 verktyg/qa-scen.py avsnitt/053-leoparden-stadar/scener/<scen>`), och `qa-film.sh` på filmen. Rättelserna nedan ändrar bara bildbeskrivningar och kamera, inga repliker, och Sanna har inte godkänt några bilder ännu.

| Punkt | Läge | Rättat |
|---|---|---|
| **1. Rigg** | Leopardens v2-rigg `leoparden-lova` (`premium/uttryck.html` + `verktyg/rigg-motor.js` via `v2-rigg.js`). Manuset använder bara riggens raka armar (`rack`, `sakPa`, `ARMROR.vinka`), inga kodarmar. Ingen figur snurrar: vändningen i rad 18 är riktningsposen. Ingen sover. Svans och öron bakom kroppen har långa rötter i riggen. | Uttrycken är nu riggens namn i stället för fria ord (se tabellen nedan) |
| **2. Effekter** | Sätts i scenen: mjuka skuggor (`R.markskugga`, mindre och blekare när något lyfter), tussar och krit-gnistor där kritan ritar och på *"plopp!"*, svag parallax mellan väggen och golvet/sängen i helbild, varm ton, vinjett högst 0,14. `#boil` 2,5 px delat med kamerazoomen, ny brusbild 6 gånger/s. Vita kanter med `verktyg/kant.js` (urklippen har redan tunna kanter, ca 1 %). Kritan går alltid genom `verktyg/kritan-ritar.js` (ritintrot och lådan), ingen egen kritkod. | Inget att rätta i manuset. Punkterna står här så att scenen följer dem |
| **3. Regler** | 1 figur, 1 plats, inga djurnamn, *"Ska vi säga tack?"*, ingen *"Vad kan det vara?"*, ritintrot ritar trekanten, barnet letar efter trekanten och uppmanas aldrig att göra något med kroppen. Malin kommer efter handlingen (rad 5, 15, 17, 20b). Inget går genom något: se *Lösningar från förlagorna*. Bildutsnitten tas ur `format/bildutsnitt.md` (helbild, halvnära, närbild, detalj; kroppshöjd 430 px). | **Prenumerera-kortet** lagt före outrot (rad 33, ny regel i CLAUDE.md) |
| **4. Reaktioner och uttryck** | Varje händelse hade ett reaktionsslag, men några låg i halvbild. | Närbild på reaktionen i rad 11 (lådan), 20b (första ploppet), 27 (trekanten i lådan) och 30 (skramlet). Starkt uttryck i ansikte, öron och svans, men lugn rörelse: inga studsar, skutten är högst 20 px |
| **5. Lärdomar** | *Lösningar från förlagorna* (ovan) är skriven: 026:s `rum.js`, 027:s korg och gömställe, 028:s hatt, 050:s sak i handen. | – |

### Uttryck och reaktioner per händelse

Uttrycken är namnen i leopardens `UTTRYCK` och blandas med `L.blanda` (0,45 s). Ögonen är öppna vid glädje, utom vid fniss.

| Rad | Händelse | Uttryck | Öron och svans | Bild |
|---|---|---|---|---|
| 1 | hej | `glad` + vinkning | öronen vippar | helbild |
| 1b, 4 | svarar ja | `glad` → `ivrig`, nickar | svansen vippar | halvbild |
| 2 | klossar överallt | `fnissig` | öronen vippar | halvbild |
| 5–7 | korgen är full | `forvanad` (0,3 s stillhet) | öronen upp | helbild → närbild korgen |
| 8 | får inte plats | `ledsen` | öronen faller 12°, svansen hänger | närbild |
| 9 | vad gör vi nu? | `tanker` | – | halvbild |
| 10–11 | lådan ritas | `nyfiken` → `kawaii` | öronen reser sig, svansen vippar | närbild |
| 11b, 12 | tycker om lådan, tack | `glad`, nickar | – | närbild, halvbild |
| 15–16 | hatten | `skrattar` → `stolt` | öronen vippar runt hatten | närbild |
| 17 | hatten åker av | `fnissig` (blundar) | – | helbild |
| 19 | fel hål | `nyfiken`, lutar huvudet | ena örat ner | helbild |
| 20b, 22 | plopp | `stolt` | svansen vippar | närbild |
| 23 | trekanten är borta | `forvanad`, tassen till huvudet | öronen upp | närbild |
| 24 | vet inte var | `nyfiken`, `rikt ±0,3` | – | halvbild |
| 26–27 | hittad, plopp | `jatteglad` | öronen upp, svansen vippar | närbild |
| 28–29 | städat | `stolt` | – | helbild, närbild lådan |
| 30 | skramlar | `fnissig` | öronen vippar | närbild |
| 31–32 | hej då | `glad` + vinkning | – | halvbild |

## Lösningar från förlagorna (2026-11-25)

Genomgång av 027 (huvudförlagan), 037, 026, 040, 028 och 050 innan scenen byggs: scenkoden, `rader.mjs`, feedbackanteckningarna och `git log`. Feedbacksidan har inga öppna punkter för dem. Följ det här i scenen. Regeln *Inget går genom något* (CLAUDE.md) gäller, och varje kontakt kollas med 6 bilder/s.

| Handling i 053 | Vad var svårt förut | Så löstes det, och vad som kopieras |
|---|---|---|
| **Sovrummet, sängen, lagren** | Kudden hamnade bakom sängen (12/11). Radion svävade i luften (13/11). | Importera 026:s `scener/sovrummet/rum.js` som `R`, som 027 gör. `LAGER` bakifrån: platta, bak, figurer, under, nalle, kudde, sov, tacke, sang, framfig, golvsak, korg, natt, himmel, fram, kontur, krita. `BED = {x0 663, x1 1338, rim 772, sida 851, under 984}`, och luften under sängen är y 908–984. Leoparden står framför sängen med `{fram: true}` (lagret `framfig`). Mjuka skuggor på golvet görs med `R.markskugga`. |
| **Leoparden når en kloss** (puff, sträcka sig mot sängen) | Armen flög i luften (027, 14–15/11: *"arm is flying in the air"*). | Ställ leoparden så nära att den raka armen når (027:s `ZKn`), och lägg tassen mot saken med `rack` i `verktyg/rigg-motor.js`. 027:s `langArm` är gjord för zebrans armbilder och kopieras inte. Leoparden ska stå **bredvid** saken, inte över den (027, 14/11: *"mindre överlapp"*). Skalan är som i sovrummet i 040, ca 0,58. |
| **Klossen glider** | – | 027:s `rull(fran, till, u)` med `mjuk`, och sättningen `SATT(u)` (8 px, 0,3 s). Klossen glider på golvet och hoppar aldrig av sig själv. |
| **Upp på korgen och ner framför** | Leksakerna klipptes av för högt i korgen (027, 13/11). | Korgen ritas två gånger, som i 027: hela korgen i `under` och framsidan i `korg`, klippt av `#korgfram`. Klippets kant är en ellipsbåge (`KORG_LAPP`), inte ett rakt streck. Klossen ligger överst på högen, ovanför klippet, och vickar som 037:s `sakImg` (`5·sin(2πl/0,9)·e^(−l/0,6)`). När den glider ner byter den till `golvsak` framför korgen. Den ligger aldrig kvar i korggruppen, så den kan inte gå genom korgens sida. |
| **Ner i hålet** | Ingen förlaga, det här är ny kod. | Samma knep som 027:s `#korgfram` och 037:s `#extraklipp`: klossen ritas i en `clipPath` (`userSpaceOnUse`) som bara visar det som är ovanför lockets framkant och inne i hålets form. Klossen står still 0,4 s över hålet och sjunker sedan rakt ner (0,5 s). Fel hål betyder att klossen ligger **på** locket och vickar, utan klipp. |
| **Trekanten i tassen och som hatt** | Hatten skulle sitta som en riktig hatt, ovanför ögonen, lutad 6°, och högre upp (028, 11–12/11). Spaden skulle ligga med tassen över skaftet (050, 22/11 b). | Kopiera 028 (leoparden, hinkhatten): `hattKant()` läser huvudets punkt (511, 295) i riggens `.kropp` med `getScreenCTM()`. Posen `sakPa` i `rigg-motor.js` lyfter saken från handen i en hög båge in över huvudet, aldrig framför kroppen. Hatten följer huvudet. Saken i handen görs med `sakBild`/`sakIn`/`sakRita` (`grepp`, `folj: 0`), och handpunkten läses som i 050:s `handen()`/`scenPunkt()`. |
| **In under sängen med ett hörn synligt, skimmer, ut igen** | Ingen förlaga har ett nedhängande täcke som döljer något: 026:s täcke slutar vid sängsidan. | Gömstället görs som bollen i 027: saken i lagret `under` (bakom sängen), med banan `under: true`, och den byter till `golvsak` när den glider fram. Skimret görs med `R.skimmer(x, y, glans, t, 0,9)`, och närbilden som `KG.UNDER`. För täcket: rita 040:s `tackeSvg` (det hänger lite över framkanten) i ett eget lager **ovanför** `under`, så att trekanten ligger bakom täckets kant och bara ett hörn syns. Det är oprovat, så det kollas först i stillbilder. Trekanten glider samma väg ut som in. |
| **Vinka** | – | `R.vink`, med armen bakom kroppen snett ut. |

**Övrigt:** mät de vita kanterna på varje urklipp (ca 1 % av höjden, `-tunn.png`, skillen `vita-kanter`). Utsnitten tas ur `format/bildutsnitt.md`. Det som leoparden håller syns alltid helt i bild. Varje händelse får sitt reaktionsslag innan nästa klipp.

## Tydligare repliker (inspelade, tagning 2b, godkända av Sanna 2026-11-25)

Sannas instruktion: Malin säger rakt ut vad som händer, med handlingen och saken. Taggarna står kvar. De 16 ändrade replikerna spelas in igen när Sanna har godkänt listan. De andra 30 är redan tydliga och står kvar.

| Fil | Rad | Gammal | Ny |
|---|---|---|---|
| 02 | 01 | [curious] Hm … vad blir det nu? | [curious] Hm … vad ritar kritan? |
| 11 | 4 | [cheerfully] Ska vi städa, leoparden? | [cheerfully] Ska vi städa undan klossarna? |
| 13 | 5 | [surprised] Oj då! | [surprised] Oj då! Cirkeln trillade ner. |
| 15 | 7 | [warmly] Klossarna får inte plats. | [warmly] Klossarna får inte plats i korgen. |
| 16 | 8 | [gently] Nej, det är inte så lätt. | [gently] Nej, fyrkanten trillade också ner. |
| 17 | 9 | [curious] Hm … vad gör vi nu? | [curious] Hm … var ska klossarna vara? |
| 18 | 10 | [happy] Titta! Kritan ritar något. | [happy] Titta! Kritan ritar något till klossarna. |
| 20 | 11 | [warmly] Varsågod, leoparden. | [warmly] Varsågod, leoparden. Lådan är till klossarna. |
| 26 | 15 | [laughs] Oj! En hatt! | [laughs] Oj! Trekanten blev en hatt! |
| 28 | 17 | [chuckles] Hoppsan! | [chuckles] Hoppsan! Hatten ramlade av. |
| 30 | 19 | [curious] Hm … inte där. | [curious] Hm … cirkeln passar inte där. |
| 31 | 20 | [playfully] Ner i hålet … plopp! | [playfully] Cirkeln ner i det runda hålet … plopp! |
| 32 | 20b | [happy] Ja, där passade den! | [happy] Ja, cirkeln passade! |
| 33 | 21 | [cheerfully] Och fyrkanten. | [cheerfully] Nu tar du fyrkanten. |
| 34 | 22 | [playfully] Ner i hålet … plopp! | [playfully] Fyrkanten ner i det fyrkantiga hålet … plopp! |
| 39 | 27 | [playfully] Ner i hålet … plopp! | [playfully] Trekanten ner i det trekantiga hålet … plopp! |

"Hoppsan! Hatten ramlade av." säger inte var hatten tar vägen, så barnet får fortfarande leta i rad 25.

**Att rätta oavsett:** rad 17 säger att hatten glider "in under täcket", men rad 25–26 och Malins replik säger "under sängen". Förslag: hatten glider in under sängen (under sängkanten, `BED.under`), så att bilden och repliken säger samma sak.

## Öppet

1. **Korgen eller ingenting?** Idén sa "klossarna får inte plats i lådan". Jag har gjort det till 037:s korg som redan är full, så att problemet syns och ingen extra sak behövs. Alternativ: ingen korg alls, och problemet är bara att klossarna inte har någon plats (svagare bild).
2. **Fel hål en gång** (rad 19): cirkeln stannar på det trekantiga hålet innan den hittar sitt. Det är det enda stället där formerna "prövas". Ta bort raden om det känns för mycket som en lektion.
3. **En andra teckning?** Receptet (sedan 021) låter kritan rita två gånger. Det här manuset har bara lådan, för att hålla det enkelt. Förslag om Sanna vill ha en till: kritan ritar en **liten stjärna** på lådans lock som belöning efter *"Nu är det städat!"* (`stjarna-gul` finns, har kontur). Den löser inget problem, så den är en belöning, inte en andra hjälpsak.
4. ~~**Leopardens röst:**~~ Löst vid grind 4: Sanna godkände alla `spinn-gullig` och `spinn-fniss` som de är (2026-11-25).
5. **Sovrummets vägg:** 027:s platta (blå nr 1) är fortfarande en platshållare i `bakgrunder/sovrummet.md`. Den blå fyrkanten syns mot det vita golvet, men i närbilden mot väggen kan den smälta in; kolla vid grind 2.
6. **Introt:** seriens intro eller 1 s logotyp, som de andra bilderböckerna just nu.
