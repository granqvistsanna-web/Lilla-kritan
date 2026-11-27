# Avsnitt 044 – Katten gör en snögubbe (plan)

**Status:** ✅ **Klart, godkänt av Sanna 2026-11-19 ("done final")**: `film/avsnitt-044.mp4` (261,4 s) och julkalenderns lucka 8 (`produktion/youtube/shorts/jul/08-katten-snogubbe/`, 275,1 s, −16,06 LUFS). Historik: ✅ grind 1 (manus) godkänd 2026-11-19 (Sanna: *"Ja, kör grind 2"*), sedan ändrad till två kvistar. ✅ grind 2 (kvisten, tagning 1). Grind 3: tagning 1 (43 repliker, `rost-1.txt`) delad och normaliserad till `assets/ljud/roster/katten-gor-en-snogubbe/`; 17 *Och en mun!* och 18 *Och knappar!* från tagning 2 (`rost-2.txt`). Alla 45 normaliserade (−3 dBFS), längderna i `rost-langder.txt`. ✅ grind 3 (Sanna: *"Alla bra"*). ✅ grind 4: alla ljud fanns (035, 043), `ljud/provlyssna-ljud.m4a`. ✅ grind 5 (animatiken, Sanna: *"Ja, bygg scenen"*). Grind 6: scenen `scener/bjorkdungen/`, förhandsvisning 2 (`--snabb`, ca 4:09) efter feedback 19/11: tydligare ritintro med ögon, morot, knappar och kvistarmar, mindre snögubbe, större katt (0,5), närmare bilder och starkare uttryck, katten kommer in i närbild, skjuter bollarna med tassarna och går efter dem (rad 7–8 +1,8 s), moroten utan blast som näsa, kvistarna och stenarna i snön från början, närbild på fågeln i holken (rad 30 +1,6 s), lugnare takt (GLES 1,1). Runda 2 efter feedback 19/11: mjuk övergång från teckningen till katten (vit tona efter Malins replik), mer snöfall, nickar och "ooo"-reaktioner, närbild på stenarna, glad stenmun, katten tittar sig omkring och går fram till båda kvistarna, `jul-badd-2` lågt under scenen, helbild på "kan du hjälpa katten", närbild på fågeln som äter och katten som klappar, kortare paus efter pip, katten står närmare snögubben. Fullrendering `film/avsnitt-044.mp4` (256 s), som julkalenderlucka 8 i `produktion/youtube/shorts/jul/08-katten-snogubbe/` (269,7 s, −16 LUFS; lucka 8, Sanna 2026-11-19, Röda sången flyttad till 14). Nya kattljud (mjau-ooo, mjau-oj, mjau-puttar, mjau-trill, mjau-spinn), djup QA (`qa/qa-rapport.md`), fynd 1–12 och 14–22 fixade (13 kräver riggändring; bädden −3 dB väntar på Sannas öra). Feedback 19/11 kväll: lugnare intåg, mer svans, fler närbilder, mjukare krita, "Först en stor snöboll". Slutrendering `film/avsnitt-044.mp4` (261,4 s) och lucka 8 ombyggd (275,1 s, −16,06 LUFS). Väntar på Sanna. Avsteg från storyboarden: stenarna ligger till vänster om katten (bollen rullar inte över dem), katten går inte till stolpen (kvisten flyger själv), påsen och fröna närmare katten. Bilderbok enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med katten, katten svarar med mjau, öron och svans. Ca 3 min. Till julkalendern (Sanna 2026-11-19), lucka inte vald än: 10–11 och 14–24 står öppna (`produktion/youtube/julkalender-parkerade.md`).

**Ändring 2026-11-27 (Sannas svar efter QA):** katten drar upp och bär kvistarna (de står nedstuckna i snön) och bär fröpåsen hela vägen i samma tass, häller och ställer ner den; frön och påse ligger till vänster om katten. Kritan går inte över katten och flyger ut i helbilden. Riggens klapp. Snögubbens armar vinkar inte längre själva. Stenarna och moroten flyger fortfarande själva. Slutrenderad 27/11 efter Sannas ja.

Snögubben och fågeln är **saker, inte figurer** (som 043:s fåglar): snögubben byggs av tre snöbollar med stenögon och stenknappar i kod, fågeln är den lilla blå fågeln från 043 med öga, vinge, näbb och ben i kod.

| | |
|---|---|
| **Titel** | Katten gör en snögubbe (avsnitt 44) |
| **Figurer (1)** | **Katten Kaj** (v2, riggad, [`karaktarer/katten-kaj.md`](../../karaktarer/katten-kaj.md)), `SKALA 0,5` som i 035. Förslag: **tomteluvan** från 035 lite snett på huvudet |
| **Platser (1)** | **Björkdungen med enfärgad himmel** (`bakgrunder/bjorkdungen.md`, Sanna 2026-11-19: *"björkdungen fast solid bg"*), **grönteal**, `assets/bakgrunder/bjorkdungen/bjorkdungen-platt-gronteal.jpeg` (Sanna 2026-11-19): två vita björkar med kala grenar till vänster, en röd fågelholk med snötak på en stolpe till höger, mitten tom, snökanten på 75 %. Kodscenen `produktion/rum/bjorkdungen/` har snön och förgrundens drivor. Snögubben byggs i mitten. Inget platsbyte |
| **Saker som finns** | [snöbollen](../../rekvisita/snoboll.md) (tre storlekar, en bild), [moroten](../../rekvisita/morot.md) (kritan ritar den), [fröpåsen](../../rekvisita/fropase.md) (kritan ritar den), [den lilla blå fågeln](../../rekvisita/smafaglar.md), tomteluvan |
| **I kod, nytt** | tio små runda gråa stenar till ögon, mun och knappar (krita med vit kant, som 043:s frön) |
| **Ny sak (grind 2)** | **kvisten**: en brun, smal kvist med två små grenar i en klyka. Samma bild två gånger, en till varje arm (Sanna 2026-11-19: *"2 kvistar, one each arm"*), den högra speglad. Tagning 1 vald, `assets/rekvisita/kvist/cut/kvist.png` |
| **I kod** | fallande snö, snöbollen som rullar och växer, spåret i snön, stenarna i snön, stenögonen, stenmunnen och stenknapparna, snögubbens leende (stenmunnen som böjs upp), fröna som strös och ligger på snön, skimret på kvisten, fotspår |
| **Musik** | ingen ny musik. `fagelkvitter` mycket lågt från fågeln kommer in. Julkarolen från 039 lågt i sista helbilden, om den passar |
| **Favoriter** | 🐱 katt · ⛄ snögubbe · 🐦 fågel |
| **Kärna** | Kritan ritar en snögubbe. *"Vad vill du hitta på, katten?"* – *"Bygga en snögubbe? Ja, vad kul!"* Katten rullar tre snöbollar, stenar blir ögon, mun och knappar, men snögubben har ingen näsa. Kritan ritar en morot: *"Varsågod!"* – *"Tack för moroten, kritan!"* Moroten hamnar först på magen (fel!), sedan på näsan. Katten letar två kvistar till armarna: *"Leta, leta … en kvist!"* Den första ligger under björkarna. Den andra vet katten inte var den är, och barnet hittar den vid fågelholken. Snögubben vinkar med kvistarmarna. En liten fågel flyger ut ur holken, landar på snögubbens huvud och letar mat. Kritan ritar en påse frön, katten strör: *"Varsågod, fågeln!"* Pick, pick. Hej då! |
| **Barnet övar på** | gissa vad kritan ritar · hur man bygger en snögubbe · stor, mellan, liten · vad ögonen ska vara · räkna ögon och knappar · hitta kvisten · säga pip · säga tack · dela med sig |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång, stannar före repliken. Fotspår i snön, `knarr-sno` per steg |
| Rullar en snöboll | katten lutar sig fram, tassen (`-fram`-armen, rak) når bollen, en lugn knuff. Bollen rullar av sig själv 200–300 px, vrids i kod och växer från 0,3 till sin storlek. Ett blekt spår i snön efter den. `sno-duns` när den stannar |
| Bollen på plats | bollarna 2 och 3 lyfter själva i en mjuk båge (1,0 s) och landar på den under, tryck ihop lite vid landningen. Saker flyttar sig själva, katten lyfter inget (som paketen i 035) |
| Ögonen | tio små runda gråa stenar (i kod, krita med vit kant) ligger i snön vid katten. Katten tittar på dem, och de lyfter i mjuka bågar: två till ögon på huvudbollen (en i taget, *"Ett öga … två ögon!"*), fem mindre till en rak mun (tillsammans, *"Och en mun!"*), tre till knappar på mellanbollen (en i taget, *"En … två … tre!"*) |
| Moroten | ligger på snön bredvid katten när den fyllts i. Glider i en båge (1,2 s) och landar på mellanbollen (fel), vickar ±4°. Sedan *"hopp!"* upp till näsan. Bladen döljs bakom huvudbollen |
| Leta | katten går fram till stället, lutar sig ner och tittar. Kvisten sticker upp ur snön och poppar upp på *"en kvist!"*, lyfter sedan själv i en båge till snögubben |
| Kvisten skimrar | i hjälppausen: kvistens spets sticker upp ur snön vid fågelholkens stolpe, efter 3 s ett svagt skimmer, tydligt på *"Ja, där!"* |
| Snögubben ler | stenmunnen (fem stenar) går från rak rad till en båge uppåt på 0,6 s, när näsan sitter på plats. Inga ögon som rör sig |
| Fågeln flyger | tittar ut ur holkens hål, sedan en mjuk båge på 1,0 s från holken, vingen fladdrar i kod, ingen snurr, ingen spegling i luften |
| Kvistarmarna vinkar | båda kvistarna vrids +8° och tillbaka en gång (0,8 s), runt roten i snögubbens sida. Det enda snögubben gör utöver leendet |
| Fågeln på huvudet | landar överst på huvudbollen, en liten snötuss puffar upp. Fågeln lutar huvudet ±8°, ögat blinkar |
| Fågeln pickar | lutar 15° fram och tillbaka på 0,25 s, `pick` på varje |
| Strör frön | påsen i tassens spets som 043, tassen framför påsens nederkant, armen sänks lugnt, påsen tippar 40°, 8–10 bruna prickar faller i en båge |
| Glatt skutt | 20 px upp, tryck ihop före och efter. Inget studs |
| Vinkar | armen bakom kroppen, snett ut förbi kanten |

## INTRO (1 s)

Lilla Kritans logotyp i 1 s, sedan papperet. Ingen jingel, inget titelkort.

## KRITAN RITAR (~16 s) – papper

Kritan ritar **en snögubbe** (Sanna 2026-11-19: *"rita en snögubbe"*), inte katten: konturen ur `assets/rekvisita/snogubbe/cut/snogubbe-kontur.json` i lugna drag (ca 7 s: underbollen, mellanbollen, huvudet, sedan ögonen, näsan och halsduken som egna drag), väntar medan barnet gissar, och `snogubbe.png` fylls i. Teckningen är idén: den har näsa, så barnet vet senare vad som fattas. Zoom in i papperet, in i björkdungen, som är tom. Katten kommer in först på rad 1.

## BJÖRKDUNGEN

| # | Bild (en rörelse) | Malin säger | Katten svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar snögubbens kontur | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En snögubbe! | krita-ritar, `glitter` |
| 1 | Helbild, snön faller. Katten trippar in och vinkar | Hej, katten! Hej, hej! | `knarr-sno`, mjau hej |
| 2 | Katten står still och tittar på oss | Vad vill du hitta på, katten? | mjau pratar (tre mjau), svansen vippar |
| 3 | Glatt skutt, öronen upp | Bygga en snögubbe? Ja, vad kul! | förtjust mjau |
| 4 | Katten tittar ner på snön, lutar huvudet | Hur gör man då? | nyfiket mjau |
| 5 | En liten snöboll ligger vid tassen, katten tittar på den | Först en stor snöboll. | – |
| 6 | Katten knuffar bollen, den rullar och växer | Rulla, rulla … en stor boll! | `sno-duns` |
| 7 | Ny boll, knuff, den lyfter och landar ovanpå | Rulla, rulla … en boll till! | `sno-duns`, nyfiket mjau |
| 8 | En liten boll, knuff, den landar överst | Rulla, rulla … en liten boll! | `sno-duns` |
| 9 | Helbild: tre bollar. Katten tar ett steg bakåt, glatt skutt | Oj! En riktig snögubbe! | förtjust mjau |
| 10 | Närbild huvudbollen utan ansikte, katten lutar huvudet | Vad ska det vara för ögon? *(paus 3 s)* | frågande mjau |
| 11 | Tio små gråa stenar i snön (två större till ögonen) vid kattens fötter glimmar till | Ja, stenar! | `glimt` |
| 12 | Katten tittar ner på stenarna | Titta, där är stenar du kan använda. | glatt mjau |
| 13 | Närbild huvudbollen, en sten i taget lyfter från snön och sätter sig | Ett öga … två ögon! | `pop` × 2 |
| 14 | Samma närbild, fem små stenar lyfter tillsammans och lägger sig i en rak rad under ögonen | Och en mun! | `pop`, glatt mjau |
| 15 | Närbild mellanbollen, tre stenar till lyfter en i taget och sätter sig i en rad | Och knappar! En … två … tre! | `pop` × 3, förtjust mjau |
| 16 | Närbild huvudbollen, katten lutar huvudet | Men … snögubben har ingen näsa! | nyfiket mjau |
| 17 | Helbild, katten tittar på snögubben, sedan på oss | Hm … vad gör vi nu? | trumpet mjau, öronen ner |
| 18 | Kritan kommer in och ritar konturen bredvid katten | Titta! Kritan ritar något. *(paus 3 s)* | krita-ritar |
| 19 | Moroten fylls i, glimt | En morot! Varsågod, katten. | `glitter`, förtjust mjau |
| 20 | Katten nickar mot kritan, svansen vippar | Tack för moroten, kritan! | glatt mjau |
| 21 | Moroten glider och landar på magen | Oj! [skrattar] Inte på magen! | fniss-mjau |
| 22 | Moroten hoppar upp till näsan | Hopp! Upp på näsan. | `pop` |
| 23 | Närbild: snögubben ler | Nu har snögubben en näsa. Den ser glad ut! | mysig suck med spinn |
| 24 | Helbild, katten tittar på snögubbens sidor | Men snögubben har inga armar. Ska vi leta kvistar? | nyfiket mjau |
| 25 | Katten går till björkarna, lutar sig ner, kvisten poppar upp och flyger till snögubbens vänstra sida | Leta, leta … en kvist! | `knarr-sno`, `pop`, glatt mjau |
| 26 | Helbild, snögubben med en arm. Katten tittar åt vänster, sedan åt höger | En arm! Men var är den andra kvisten? Katten vet inte var. | frågande mjau |
| 27 | Närbild fågelholkens stolpe: en kvistspets sticker upp ur snön, skimrar efter 3 s | Kan du hjälpa katten? Kan du se var kvisten är? *(paus 5 s)* | – |
| 28 | Skimret blir tydligt | Ja, där! Vid fågelholken! | glatt mjau |
| 29 | Katten går dit, kvisten poppar upp och flyger till snögubbens högra sida | Leta, leta … en kvist! | `pop` |
| 30 | Helbild: kvistarmarna vickar en gång, som en vinkning | Ha ha! Två armar! Snögubben vinkar! | fniss-mjau |
| 31 | Helbild, fågeln tittar ut ur holken och flyger i en båge mot snögubben | Oj! Titta, en fågel! | `vingflax`, nyfiket mjau |
| 32 | Fågeln landar överst på snögubbens huvud, en snötuss puffar | Den sätter sig på snögubbens huvud! | `fagel-pip`, förtjust mjau |
| 33 | Fågeln lutar huvudet och tittar ner på snön | Fågeln letar mat. | `fagel-pip` frågande |
| 34 | Kritan ritar konturen bredvid katten, påsen fylls i | Kritan ritar igen! En påse med frön. | krita-ritar, `glitter` |
| 35 | Katten håller påsen och strör | Varsågod, fågeln! | prassel, glatt mjau |
| 36 | Fågeln hoppar ner och pickar | Pick, pick, pick. Mums! | `pick` × 3 |
| 37 | Fågeln flyger tillbaka upp på snögubbens huvud | Fågeln säger tack. Pip! | `vingflax`, `fagel-pip` |
| 38 | Samma, katten tittar på oss | Kan du säga pip? *(paus 4 s)* | – |
| 39 | Katten svarar, fågeln piper | [skrattar] Det blev ett mjau! | mjau, `fagel-pip` |
| 40 | Helbild: katten, snögubben och fågeln | Vilken fin snögubbe! | mysig suck med spinn |
| 41 | Katten vinkar, fågeln piper | Hej då, katten! Hej då, snögubben! God jul! | mjau hej då, `fagel-pip` |
| 42 | Samma, katten vinkar klart | Hej då! Vi ses snart! | mjau hej då |
| 43 | Kritirisen runt katten och snögubben | – | – |

**Short:** uppslag 24–30, kvistarna till *"Snögubben vinkar!"*, ca 45 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/katten-gor-en-snogubbe/` (`01-kritan-ritar` …).

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En snögubbe!
[happy] Hej, katten! Hej, hej!
[curious] Vad vill du hitta på, katten?
[excited] Bygga en snögubbe? Ja, vad kul!
[curious] Hur gör man då?
[warmly] Först en stor snöboll.
[cheerfully] Rulla, rulla … en stor boll!
[cheerfully] Rulla, rulla … en boll till!
[happy] Rulla, rulla … en liten boll!
[excited] Oj! En riktig snögubbe!
[curious] Vad ska det vara för ögon?
[happy] Ja, stenar!
[warmly] Titta, där är stenar du kan använda.
[gently] Ett öga … två ögon!
[happy] Och en mun!
[happy] Och knappar! En … två … tre!
[surprised] Men … snögubben har ingen näsa!
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En morot! Varsågod, katten.
[happy] Tack för moroten, kritan!
[laughs] Oj! Inte på magen!
[playfully] Hopp! Upp på näsan.
[warmly] Nu har snögubben en näsa. Den ser glad ut!
[curious] Men snögubben har inga armar. Ska vi leta kvistar?
[cheerfully] Leta, leta … en kvist!
[curious] En arm! Men var är den andra kvisten? Katten vet inte var.
[warmly] Kan du hjälpa katten? Kan du se var kvisten är?
[excited] Ja, där! Vid fågelholken!
[happy] Leta, leta … en kvist!
[laughs] Ha ha! Två armar! Snögubben vinkar!
[surprised] Oj! Titta, en fågel!
[delighted] Den sätter sig på snögubbens huvud!
[curious] Fågeln letar mat.
[excited] Kritan ritar igen! En påse med frön.
[warmly] Varsågod, fågeln!
[happy] Pick, pick, pick. Mums!
[warmly] Fågeln säger tack. Pip!
[playfully] Kan du säga pip?
[laughs] Det blev ett mjau!
[delighted] Vilken fin snögubbe!
[happy] Hej då, katten! Hej då, snögubben! God jul!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Ljuden

**Allt finns, inget nytt behövs** (grind 4, 2026-11-19). Provlyssna: `ljud/provlyssna-ljud.m4a` (34 s, i den här ordningen):

| Tid | Ljud | Till |
|---|---|---|
| 0,0 | `mjau-gullig-1` … `-8` | kattens röst (035): 1 hej, 2 förtjust, 3 fniss, 4 mysig suck med spinn, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då |
| 15,4 | `fagel-pip-1` | fågeln, hej och vanligt pip (som 043) |
| 16,6 | `fagel-pip-5` | fågeln, glad (som 043). **CC BY 4.0, kevinmead: kredit i YouTube-texten** |
| 18,1 | `fagel-pip-3` | fågeln, frågande (som 043), rad 33 *Fågeln letar mat* |
| 19,2 | `vingflax-3` | fågeln flyger (som 043) |
| 21,0 | `fro-prassel-1` | katten strör frön (som 043) |
| 23,3 | `knarr-sno-1` | kattens steg i snön |
| 26,2 | `sno-duns-1` | snöbollen stannar eller landar |
| 27,6 | `pop-1` | stenarna, moroten och kvistarna på plats |
| 28,9 | `pick-1` | fågeln pickar |
| 31,4 | `glimt-1` | stenarna glimmar, kvisten skimrar |

Plus `krita-ritar` (ritintrot och kritan i scenen), `glitter` (moroten och påsen fylls i) och `fagelkvitter` mycket lågt från rad 31, när fågeln kommer.

## Regelkoll

- [x] 1 figur, 1 plats. Snögubben och fågeln är saker (som 043)
- [x] Inga djurnamn: "katten", "fågeln", "snögubben"
- [x] Aldrig *"Vad kan det vara?"*. Ritintrot säger *"Hm … vad blir det nu?"*
- [x] Frågor till barnet med paus: vad ritar kritan (3 s), vad ska det vara för ögon (3 s), var är kvisten (5 s, skimrar efter 3 s), säga pip (4 s)
- [x] *"Varsågod"* (två: kritan till katten, katten till fågeln), *"Tack för moroten, kritan!"*. Ingen *"Ska vi säga tack?"* (Sanna 2026-11-19)
- [x] Samma fras tre gånger: *"Rulla, rulla …"* (tre bollar). *"Leta, leta … en kvist!"* två gånger, den andra med barnets hjälp
- [x] Bilden på orden: kvisten poppar på *"en kvist!"*, ögonen på *"ett öga … två ögon"*, munnen på *"en mun"*, knapparna på *"en … två … tre"*, moroten på *"Hopp!"*, fågeln landar på *"huvud"*
- [x] Kritan ritar två gånger: moroten (gåvan) och fröpåsen (löser fågelns problem)
- [x] Inget läskigt: fågeln är inte hungrig och ledsen, den letar bara mat. Katten jagar aldrig fågeln, de "pratar"
- [x] Fniss högst 3–4 gånger: rad 21, 30, 39
- [x] Ingen ny musik
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] Avsteg: ritintrot ritar snögubben, inte figuren (som 043 ritade fågeln)
- [ ] Avsteg: hjälpen kommer på kvistarna, inte på den tredje gången av samma fras (rullandet), eftersom det bara behövs två kvistar
- [ ] Avsteg: katten "bygger" utan att lyfta: bollarna, moroten och kvistarna flyttar sig själva (riggens armar är korta och raka)

## Öppet

1. **Likt 043:** fåglar, frön, fågel på huvudet och fågel som pickar finns redan i Grisen matar fåglarna. Fördelen är att allt kan återanvändas (fågelkoden, fröpåsen, ljuden). Skillnaden här: en enda fågel, den landar på snögubben (inte på katten), och fröna är en liten avslutning, inte problemet. Ligger de långt isär i kalendern blir det inget problem.
2. **Likt J08** (hunden bygger en snögubbe, parkerad): rullade bollar och moroten finns där. J08 är arkiverad, så det krockar inte, men snöbollen och moroten är gjorda för den.
3. **Kvisten** ✅ grind 2 (Sanna 2026-11-19: tagning 1). `assets/rekvisita/kvist/cut/kvist.png`, se `rekvisita/kvist.md`.
4. **Snögubben byggs av snöbollar**, inte av `snogubbe.png` (den har redan näsa, halsduk och knappar). Halsduken kan läggas på i sista helbilden om Sanna vill (`rekvisita/halsduk.md`).
5. **Vita saker mot vit snö** (julkalender-planens varning): snöbollarna behöver den ljusblå skuggan och en tydlig kant, se `vita-kanter`. Kontrollera i första stillbilden.
6. **Tomteluvan** på katten: finns från 035, mätt på katten.
7. **Lucka:** vilken dag Sanna vill ha den på (10–11 eller 14–24).
8. **Björkdungen och J08:** platsen valdes preliminärt till J08 (hunden och snögubben, parkerad). Om J08 tas upp igen står båda snögubbarna på samma plats.
9. **Fågelholken** är en del av bakgrundsbilden. Fågeln tittar ut genom att ritas ovanpå hålet. Mät hålets läge i `bjorkdungen.jpeg` innan scenen byggs.
10. **Svart katt mot mörk grönteal:** kattens huvud och öron står mot himlen. Kontrollera i första stillbilden att konturen syns. Annars får katten en lite ljusare kant mot himlen, eller står lite lägre så att huvudet hamnar mer mot snön.
