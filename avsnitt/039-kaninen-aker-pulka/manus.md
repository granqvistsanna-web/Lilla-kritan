# Avsnitt 039 – Kaninen ska åka pulka (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-17 (Sanna: "Yes, go to props"). Grind 2 (saker) pågår. Skrivet 2026-11-17, tredje versionen samma dag. Sannas ändringar: klädhängare på väggen och en plats där det borttappade plagget ligger; kaninen vill inte ha vantar, så kritan ritar **rosa tumvantar** (kaninens favoritfärg) i stället för en snöflinga; ritintrot ritar vantar, inte kaninen; ingen snö syns genom dörren; kaninen nickar på Malins frågor; Malin säger inte *"zzzipp"*; barnet räknar *"ett, två, tre"* före pulkaturen i stället för att säga *wiii*. Julbilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Förlaga: [024 Lammet klär på sig](../024-lammet-klar-pa-sig/manus.md).

**Enkel animation, men varje plagg sitter på riggen.** Kaninen tar aldrig i kläderna med tassarna. Kaninen lyfter ett ben, sträcker ut armen eller böjer på huvudet, och plagget glider från hängaren på plats på ordet *"på!"*. Varje plagg görs i **delar som följer riggens delar** (se [Kläderna på riggen](#kläderna-på-riggen)), så att kaninen kan gå, vinka, hoppa och sitta på pulkan med allt på.

| | |
|---|---|
| **Titel** | Kaninen ska åka pulka (avsnitt 39). Introt *"Djuren hittar på!"*, inget titelkort |
| **Figurer (1)** | **Kaninen Kanel** (v2, riggad, `assets/karaktarer/kaninen-kanel/premium/uttryck.html`), varmt brun |
| **Platser (2)** | **Julhallen** (`produktion/rum/julhallen/`: blå vägg, dörr med krans, gula stövlar, pall med lykta) för hela påklädningen. **Pulkabacken** (`produktion/rum/pulkabacken/`) bara för slutet, ca 40 s. Byte med dörren och ett kritsvep. Se Avsteg |
| **I hallen, nytt** | **klädhängaren** på väggen mellan dörren och pallen: en rad med fyra krokar där overallen, mössan och de gamla gråa vantarna hänger och strumporna ligger över en krok. Under den en **korg** (`rekvisita/korg.md` finns) |
| **Kläder** | strumporna, overallen, stövlarna, mössan med öronhål, vantarna. De gula stövlarna (plattans egna, vid dörren) och strumporna finns. **Nya (grind 2):** klädhängaren, overallen, mössan med öronhål, de gråa vantarna och de rosa tumvantarna |
| **Kritan ritar** | 0) i ritintrot på papperet: **ett par vantar** (de gråa som hänger på hängaren), 1) i hallen: **rosa tumvantar** (gåvan som gör att kaninen vill ha vantar), 2) ute: **pulkan** (finns, med kontur) |
| **I kod** | plaggens delar följer kroppen, dragkedjan som dras upp (en kritlinje som växer), öronen som ploppar upp genom hålen, skimret bakom korgen, snöflingor ute, snöpuffar efter pulkan |
| **Favoriter** | 🐰 kanin · 🩷 rosa · ❄️ snö · 🛷 pulka |
| **Kärna** | Kaninen vill ut och åka pulka. Allt hänger på hängaren. *"Dra, dra … på!"* tre gånger: ena strumpan, andra strumpan, overallen. Stövlarna, och mössan, där öronen ploppar upp genom hålen. Men de gråa vantarna vill kaninen inte ha. Kritan ritar rosa tumvantar, kaninens favoritfärg: "Varsågod!" – "Tack!" Nu vill kaninen! Första vanten hamnar på örat. Den andra glider iväg och gömmer sig bakom korgen, och barnet hittar den. Ut i snön! Kritan ritar en pulka, och barnet räknar *ett, två, tre* innan kaninen åker: *"Wiii!"* Hej då! |
| **Barnet övar på** | ordningen när man klär på sig · färgen rosa · säga tack · hitta vanten (bakom korgen) · räkna till tre |
| **Leken** | öronen ploppar upp genom mössan (uppslag 15–16), vanten på örat (uppslag 24–25), pulkaturen med räkning (uppslag 34–38) |

Längd: ca 3:50–4:05 (receptets mål 3:45–4:15). Hallen ca 3:15, backen ca 0:40.

## Uppställningen i julhallen (1920 × 1080)

| Sak | Var | Anmärkning |
|---|---|---|
| Dörren med krans | x 131–517 (plattan) | stängd hela tiden tills kaninen går ut. Ingen snö syns genom den |
| Gula stövlarna | x 540–735, golvet (ritade i kod i `julhallen`) | glider fram och på, borta från dörren efteråt |
| Kaninen | mitt i bild, x ca 960, fötterna på golvet (y 811) | står still medan plaggen kommer till den |
| **Klädhängaren** | på väggen, x ca 1180–1560, krokarna på y ca 420 | ny sak. Plaggen hänger stilla och gungar lite när ett annat plagg tas |
| **Korgen** | på golvet under hängaren, x ca 1300–1480 | finns (`rekvisita/korg.md`), kontrollera att den passar julhallen. Den rosa vanten gömmer sig bakom korgens högra kant, bara tummen syns |
| Pallen med lykta | x 1672–1855 (plattan) | står kvar som den är |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Hoppar in | riggens gång med två lugna hopp, från höger mot mitten |
| Tittar mot dörren | riktningsposen `rikt −0,6` och ögonen åt vänster. Ingen vändning, ingen spegling |
| **Nickar** | huvudet (hela ägget) lutar fram 5° och tillbaka två gånger, lugnt, öronen släpar efter. Svaret på Malins ja-frågor (uppslag 2, 3, 6, 21), med ett förtjust pip |
| Tittar på hängaren | `rikt +0,4`, ögonen åt höger och lite upp |
| Plagget från hängaren | plagget lyfter från kroken och glider i en mjuk båge (0,8 s) till sin plats på kroppen, sitter på *"på!"*. Kroken gungar lite efteråt |
| Sätter sig | posen `sitter` på golvet mitt i bild, benen fram (för strumporna) |
| Strumpan på | strumpan glider från hängaren till foten, kaninen lyfter benet, `strumpa` |
| Overallen på | kaninen ställer sig upp. Byxdelen glider ner över benen ovanifrån (0,8 s), sedan glider bålen och ärmarna på plats (0,8 s) och sitter på *"på!"*. Sist dras dragkedjan: en kritlinje växer från magen upp till kragen (0,6 s), bara ljudet `zipp`, Malin säger inget |
| Stövlarna | stövlarna vid dörren glider fram en i taget (0,6 s) och upp på fötterna, `duns` |
| Mössan på | mössan glider från kroken och ner på huvudet (1,0 s). Öronen ligger först platta **under** mössan (gömda, nedvridna) |
| Öronen ploppar upp | ett öra i taget roterar upp genom sitt hål på *"plopp!"* (0,25 s, lite överslag 4°, sedan stilla). Lagren: kropp → öron → mössa → örats rot (en kopia av örats nedersta bit ovanpå mössan, så att örat ser ut att gå genom hålet) |
| Öronen vickar | öronen vickar ±8° växelvis, två gånger, lugnt |
| Vill inte ha vantar | en grå vante glider en bit mot kaninen, kaninen skakar på huvudet (hela kroppen lutar ±6° tre gånger), armarna sjunker ner längs kroppen, öronen sjunker åt sidorna. Vanten glider tillbaka till kroken och hänger kvar där resten av filmen |
| Kritan ritar tumvantarna | kritan (liten, ingen min, ingen knackning) ritar två tumvantar i luften framför kaninen: konturen med tummen och muddkanten som egna drag (4 s), gisspaus, de fylls i med rosa inifrån och glimtar |
| Kawaii | kaninens ögon med glitter, öronen reser sig, ett lugnt skutt |
| Vante på örat | den första rosa vanten glider mot armen men fortsätter förbi och landar på högra örats spets (följer `ear-r`). Kaninen tittar upp på den, förvånad min 0,3 s |
| Vanten på rätt ställe | vanten glider ner från örat till tassen på *"på!"* |
| Andra vanten glider iväg | den andra rosa vanten faller lugnt till golvet (en mjuk båge, 0,6 s), glider åt höger över golvet (1,0 s) och försvinner bakom korgen så att bara tummen syns. Barnet ser det hända |
| Tittar efter | `rikt ±0,3`, ögonen `titt ±36·rikt`, huvudet vänds inte |
| Vanten bakom korgen | bara tummen sticker fram vid korgens högra kant (klippt vid golvlinjen och korgen). Skimrar efter 3 s av pausen |
| Glad | ett lugnt skutt (20 px, tryck ihop före och vid landning), bara när tumvantarna är klara, när vanten hittas och på *"Nu är du färdig!"* |
| Mot dörren | tre lugna hopp åt vänster till dörren, `rikt −1` |
| Pulkaturen | kaninen sitter på pulkan högst upp i backen. Pulkan och kaninen glider nedför i **en** bana (2,2 s, långsamt i början, mjuk inbromsning), lutar med backen, snöpuffar bakom medarna. Ingen vändning: backen ritas så att pulkan åker åt höger (se Öppet 4) |
| Väntar på räkningen | på krönet: kaninen gungar lite fram på varje tal (3°), öronen vippar, pulkan står still |
| Vinkar | armen bakom kroppen, snett upp och ut förbi kanten, glider upp på 0,6 s, 3–4 lugna vink, vanten följer med |

## INTRO (3,3 s)

Det gemensamma introt *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`), sedan papperet.

## KRITAN RITAR (~14 s) – papper

Kritan ritar **ett par vantar**, inte kaninen (Sanna 2026-11-17): konturen i lugna drag (5 s), med tummen och muddkanten som egna drag så att det går att gissa, skogsljudet byts mot julhallens matta, kritan väntar, de gråa vantarna fylls i inifrån. Zoom in i teckningen: vantarna blir de som hänger på hängaren i julhallen, och kameran drar ut till helbilden där kaninen hoppar in.

## JULHALLEN

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar vantarnas kontur, de fylls i grå | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! Vantar! | krita-ritar |
| 1 | Zoom in till julhallen, vantarna hänger på hängaren. Kaninen hoppar in och vinkar | Hej, kaninen! Hej, hej! | små hopp, `kanin-hej` |
| 2 | Halvbild, kaninen tittar mot dörren och hoppar ett litet steg mot den | Vill du gå ut? | **nickar**, förtjust pip (2) |
| 3 | Samma, öronen reser sig | Ska du åka pulka? | **nickar**, förtjust pip (2), öronen vippar |
| 4 | Helbild, kaninen tittar mot hängaren | Då behöver du varma kläder. Det är kallt ute! | nyfiket pip (5) |
| 5 | Närbild, hängaren: overallen, mössan, de gråa vantarna, strumporna på krokarna | Titta, här hänger kläderna. | – |
| 6 | Helbild, kaninen sätter sig på golvet med benen fram | Ska vi börja med strumporna? | **nickar**, förtjust pip (2) |
| 7 | Närbild på benen, strumpan glider från hängaren, ena benet lyfts | Först ena strumpan. Dra, dra … på! | `strumpa` |
| 8 | Samma, andra benet | Och andra strumpan. Dra, dra … på! | `strumpa` |
| 9 | Helbild, kaninen ställer sig upp, overallen lyfter från kroken | Nu overallen. | nyfiket pip (5) |
| 10 | Byxdelen glider på, sedan bålen och ärmarna | Dra, dra … på! | `prassel-tyg` |
| 11 | Närbild, dragkedjan dras upp till kragen | – | `zipp`, förtjust pip (2) |
| 12 | Halvbild, kaninen tittar på stövlarna vid dörren | Stövlarna står vid dörren. | – |
| 13 | Stövlarna glider fram och på, en i taget | En stövel … två stövlar! | `duns` ×2 |
| 14 | Mössan glider från kroken ner på huvudet, öronen försvinner under den | Mössan på! *(paus 1 s)* Oj! Var är öronen? | `prassel-tyg`, frågande pip (7) |
| 15 | Närbild, ena örat ploppar upp genom hålet, sedan det andra | Plopp! … Plopp! | `plopp` ×2, fniss (3) |
| 16 | Samma, öronen vickar växelvis | Mössan har hål för öronen! | mysig suck (4) |
| 17 | Halvbild, en grå vante glider mot kaninen. Kaninen skakar på huvudet, armarna ner, vanten glider tillbaka till kroken | Och vantarna? | trumpet pip (6) |
| 18 | Närbild, kaninen tittar bort, öronen sjunker | Oj då. Kaninen vill visst inte ha vantar. *(paus 1 s)* Hm … vad gör vi nu? | trumpet pip (6) |
| 19 | Halvbild, kritan ritar två tumvantar i luften framför kaninen: konturen (4 s), gisspaus, de fylls i rosa | Titta! Kritan ritar något. *(gisspaus 3 s)* Tumvantar! | krita-ritar, `glitter` |
| 20 | Närbild, kaninen ser vantarna, kawaii-ögon, öronen reser sig, ett lugnt skutt | Rosa! Din favoritfärg! Varsågod, kaninen. | förtjust pip (2) |
| 21 | Samma | Ska vi säga tack? *(paus 2,5 s)* Tack! | nyfiket pip (5), **nickar** direkt på *"Tack!"* |
| 22 | Helbild, kaninen sträcker ut armen mot vantarna | Vill du ha vantarna nu? | **nickar**, förtjust pip (2) |
| 23 | Den första vanten glider mot armen … | Då tar vi vanten … | – |
| 24 | … och landar på örat. Kaninen tittar upp, förvånad min | Oj! Inte på örat! [laughs] | `plopp`, fniss (3) |
| 25 | Vanten glider ner från örat till tassen | Vanten ska sitta på tassen. Dra, dra … på! | `prassel-tyg`, förtjust pip (2) |
| 26 | Helbild, den andra vanten faller, glider över golvet och försvinner bakom korgen | Oj, oj! Andra vanten åkte iväg! | frågande pip (7) |
| 27 | Halvbild, kaninen tittar åt vänster, sedan åt höger | Kaninen vet inte var. | frågande pip (7) |
| 28 | Bred bild på frågan, sedan klipp till närbild på korgen: tummen sticker fram vid korgens kant. Skimrar efter 3 s | Kan du hjälpa kaninen? Kan du se var vanten är? *(paus 5 s)* | tyst, kaninen blinkar och andas |
| 29 | Vanten skimrar tydligt, kaninen gör ett lugnt skutt | Ja, där! Ja, bakom korgen! | förtjust pip (2), `tindra` |
| 30 | Vanten glider fram och upp på andra tassen | Dra, dra … på! | `prassel-tyg` |
| 31 | Helbild, kaninen står med allt på: mössa, overall, stövlar, rosa vantar. Kaninen tittar på vantarna, ett lugnt skutt | Nu är du färdig! Varm och go. | mysig suck (4) |
| 32 | Kaninen hoppar mot dörren, tre lugna hopp. Dörren öppnas (en vit ljus springa i kod), kritsvep | Nu går vi ut! | `steg` ×3, kritsvep |

## PULKABACKEN

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 33 | Helbild, pulkabacken, snöflingor. Kaninen står nedanför backen och tittar upp | Oj, vad mycket snö! Men … ingen pulka? | knarr i snön, frågande pip (7) |
| 34 | Kritan ritar pulkan på backens krön: konturen (`pulka-kontur.json`), kort väntan, pulkan fylls i | Titta! Kritan ritar igen. *(paus 2 s)* En pulka! Varsågod, kaninen. | krita-ritar, `glitter` |
| 35 | Kaninen sitter på pulkan högst upp (klipp, inte klättring) | Tack, kritan! | förtjust pip (2) |
| 36 | Samma, kaninen väntar och gungar lite | Kan du räkna till tre? *(paus 4 s)* | kaninen gungar fram på varje tal i pausen |
| 37 | Samma | Ett … två … tre … | – |
| 38 | Pulkan glider nedför backen, snöpuffar | Wiii! | `wiii`, `swoosh`, fniss (3) när den stannar |
| 39 | Klipp: högst upp igen, en tur till, kortare | En gång till! Ett … två … tre … wiii! | `wiii` |
| 40 | Halvbild, kaninen på pulkan vinkar (armen bakom kroppen) | Hej då, kaninen! Hej då, pulkan! | `kanin-hejda` |
| 41 | Samma, kaninen vinkar klart | God jul! Vi ses snart! | mysig suck (4) |
| 42 | Kritirisen runt kaninen | – | – |

**Short:** uppslag 14–30 (öronen ploppar, kritan ritar tumvantarna, vanten på örat, hitta vanten), ca 70 s. En andra Short: 33–39 (pulkan och räkningen), ca 40 s.

## Kläderna på riggen

Kanels rigg är ett ägg (huvud och kropp i ett) plus armar, ben, öron och svans, med vridpunkterna i `kanel-rigg.json` (1024-rutan). Varje plagg görs **i samma 1024-ruta som riggen**, så att delarna läggs rakt på sin riggdel och vrids kring samma vridpunkt. Varje plagg har också ett **hängande läge**: en hel bild av plagget på sin krok.

| Plagg | Delar | Följer | Lager | Påtagningen |
|---|---|---|---|---|
| **Strumporna** (finns, lammets rosa/blå, eller nya) | 2: en per fot | `leg-l`, `leg-r` | på benet | glider från kroken till foten |
| **Overallen** (ny) | 5: bålen, två byxben, två ärmar. Plus en hel bild för kroken | bålen följer kroppen (`kropp`), byxbenen `leg-l/r`, ärmarna `arm-l/r` | bålen ovanpå kropp och mage men **under ansiktet** (slutar under nosfläcken, som en krage); ärmarna på armarna | hela overallen lämnar kroken, byxbenen landar först, sedan bålen och ärmarna. **Bålen klipps med kroppens egen alfa** (`kanel-body.png` som mask) under en linje under hakan, så att kanten alltid följer ägget, också när kroppen lutar |
| **Dragkedjan** (kod) | 1 kritlinje | bålen | ovanpå bålen | växer från magen till kragen |
| **Stövlarna** (finns, `stovel-gul-1/2`, samma som plattans) | 2 | `leg-l/r` | ovanpå strumpan och byxbenet | glider fram från dörren |
| **Mössan med öronhål** (ny) | 2: mössan och en kopia av öronens rot (bara biten närmast hålet) | huvudet (kroppen) och öronen | kropp → öron → mössa → örats rot | glider från kroken ner på huvudet. Öronen är först nedvridna och dolda och ploppar upp en i taget |
| **De gråa vantarna** (nya) | 1 bild (paret på kroken) | – | hänger på hängaren hela filmen | sätts aldrig på. Samma vantar som kritan ritar i ritintrot |
| **De rosa tumvantarna** (nya) | 2: en per tass, plus konturen för kritans ritning | `arm-l/r` vid tasspetsen | ovanpå ärmen | glider till tasspetsen och vrids med armen. Den första kan också sitta på örats spets (följer `ear-r`) |

- Plaggen **flyttas och vrids, skalas aldrig** (lärdom 9: mössans kanter töjdes i 024).
- Det som är påtaget hänger inte kvar på kroken. Tomma krokar syns.
- Alla nya delar får vit kant enligt `vita-kanter` (ca 1 % av höjden), mätt på mörk bakgrund.
- Vantarna (båda paren) behöver en kontur för kritans ritning (`verktyg/kontur.py`, som pulkan och tomteluvan).
- **Prov innan manuset låses:** en stillbild med alla plagg på i `sitter`, stående, vinkande och sittande på pulkan, och en med allt hängande på hängaren. Det är det svåraste i avsnittet och det som avgör om berättelsen håller.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Filerna hamnar i `assets/ljud/roster/kaninen-aker-pulka/`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! Vantar!
[happy] Hej, kaninen! Hej, hej!
[curious] Vill du gå ut?
[cheerfully] Ska du åka pulka?
[warmly] Då behöver du varma kläder. Det är kallt ute!
[cheerfully] Titta, här hänger kläderna.
[cheerfully] Ska vi börja med strumporna?
[happy] Först ena strumpan. Dra, dra … på!
[happy] Och andra strumpan. Dra, dra … på!
[cheerfully] Nu overallen.
[happy] Dra, dra … på!
[warmly] Stövlarna står vid dörren.
[happy] En stövel … två stövlar!
[happy] Mössan på!
[curious] Oj! Var är öronen?
[playfully] Plopp! … Plopp!
[laughs] Mössan har hål för öronen!
[curious] Och vantarna?
[chuckles] Oj då. Kaninen vill visst inte ha vantar.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] Tumvantar!
[excited] Rosa! Din favoritfärg! Varsågod, kaninen.
[warmly] Ska vi säga tack?
[happy] Tack!
[cheerfully] Vill du ha vantarna nu?
[cheerfully] Då tar vi vanten …
[laughs] Oj! Inte på örat!
[happy] Vanten ska sitta på tassen. Dra, dra … på!
[surprised] Oj, oj! Andra vanten åkte iväg!
[curious] Kaninen vet inte var.
[warmly] Kan du hjälpa kaninen? Kan du se var vanten är?
[excited] Ja, där! Ja, bakom korgen!
[happy] Dra, dra … på!
[happy] Nu är du färdig! Varm och go.
[excited] Nu går vi ut!
[surprised] Oj, vad mycket snö! Men … ingen pulka?
[excited] Titta! Kritan ritar igen.
[happy] En pulka! Varsågod, kaninen.
[happy] Tack, kritan!
[warmly] Kan du räkna till tre?
[playfully] Ett … två … tre …
[excited] Wiii!
[excited] En gång till! Ett … två … tre … wiii!
[happy] Hej då, kaninen! Hej då, pulkan!
[warmly] God jul! Vi ses snart!
```

## Kaninens röst och ljuden

`kanin-gullig` 1–8 (022) plus `kanin-hej` och `kanin-hejda` (svenska hälsningar) finns och används som de är: inga nya kaninljud. Siffrorna i tabellerna är känslorna (2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande). Nickarna får det förtjusta pipet, aldrig samma tagning två gånger i rad. Högst 4 fniss: uppslag 15, 24 och 38.

Effekter som finns: `krita-ritar`, `glitter`, `prassel-tyg`, `plopp`, `strumpa`, `zipp`, `duns`, `steg`, `tindra`, `wiii`, `swoosh`. Mät `zipp` och `wiii` innan de används (lärdom 9). **Saknas:** knarr i snö (uppslag 33; Openverse först). Mattor: julhallens egen (`julhallen-effekter.wav`) och pulkabackens (`pulkabacken-effekter.wav`). Ingen ny musik.

## Regelkoll

- [x] 1 figur
- [ ] **2 platser** (bilderboken har 1). Se Avsteg
- [x] Inga djurnamn: "kaninen", "vanten", "pulkan"
- [x] Aldrig *"Vad kan det vara?"*, aldrig *"Vad säger man?"*
- [x] Tre frågor till barnet med paus: tack (2,5 s), var är vanten (5 s), räkna till tre (4 s)
- [x] *"Varsågod"* och *"Tack!"* (och *"Tack, kritan!"* för pulkan)
- [x] Samma fras tre gånger: *"Dra, dra … på!"* (strumpa, strumpa, overall), och sedan två till för vantarna
- [x] Kritan ritar flera gånger: vantarna i ritintrot, tumvantarna (gåvan), pulkan
- [x] Tydligt hej och hej då, med vinkning. Kaninen nickar på Malins ja-frågor
- [x] Inget läskigt: vanten på örat är ett skämt, vanten som glider iväg syns hela vägen, pulkan åker lugnt
- [x] Inga böjda armar: kaninen tar aldrig i kläderna
- [ ] **Ordningen i kärnan är ändrad:** problemet (vantarna) kommer efter de tre *"Dra, dra … på!"*, inte före. Se Avsteg

## Avsteg

1. **Två platser och ett kritsvep inne i berättelsen.** Bilderboken har en plats, men `format/regler.md` tillåter två, och receptet säger att kritsvepet används vid platsbyte. Pulkan är belöningen och behöver snön. **Alternativ med en plats:** kaninen klär på sig i hallen, dörren öppnas, kritan ritar pulkan i dörröppningen, och filmen slutar med kaninen på pulkan som glider ut genom dörren (ingen backe, ca 3:20).
2. **Problemet kommer i mitten** (ca 1:50 in) i stället för i början. Början bärs av att kaninen vill ut och åka pulka.
3. **Ritintrot ritar vantarna, inte figuren** (Sanna 2026-11-17). Det är första bilderboken där kaninen inte ritas fram; den hoppar in i hallen i stället.
4. Fler än 2 nya saker (klädhängaren, overallen, mössan med hål, två par vantar), som receptet redan tillåter för bilderböcker.

## Julkalendern

Förslag: **lucka 15** visar i dag hela 024 Lammet klär på sig. Den här filmen passar där i stället (samma tema, i julhallen som tabellen redan föreslår för en omgörning, och den slutar med *"God jul!"*). Då kan 024 flyttas till en annan G-lucka eller utgå. Inte bestämt.

## Grind 2: saker att göra med Sanna

| Sak | Förslag |
|---|---|
| **Klädhängaren** | en enkel träribba (varmt brun eller röd) med fyra runda knoppar, rakt framifrån, platt krita. Ingen hatthylla. Mått så att overallen ryms på en krok |
| **Overallen** | klar röd (`#D9382E`, som pulkan), mot den blå väggen och den bruna kaninen. Ritas både hel (för kroken) och i fem delar mot riggen |
| **Mössan med öronhål** | grön (`#2F7D46`, som girlangen) med vit tofs och två tydliga runda hål upptill |
| **De gråa vantarna** | enkla ljusgrå fingervantar eller tumvantar utan mönster, så att de rosa blir det roliga |
| **De rosa tumvantarna** | klart rosa (`#F48FB1`) med vit mudd, tydlig tumme |
| **Strumporna** | lammets rosa och blå, eller nya röd-vit-randiga julstrumpor |
| **Korgen** | den som finns, om den passar julhallen |

## Öppet

1. **Rosa som kaninens favoritfärg** finns inte uttalat någonstans för Kanel (rosa kommer från sången i 019). Annan favoritfärg?
2. **Ritintrot och gåvan är båda vantar.** Ritintrot ritar de gråa (som sedan hänger på hängaren), gåvan är de rosa. Fungerar det, eller ska ritintrot rita något annat från hallen (mössan, stövlarna)?
3. **Hängarens plats:** på väggen mellan dörren och pallen, med korgen under. Kaninen står till vänster om den.
4. **Backen åt rätt håll.** Pulkabackens backe stiger åt höger, och pulkan pekar åt höger, så den skulle åka baklänges. Rita backen spegelvänd i den här scenens kod (krönet till vänster) så att pulkan åker framåt nedför åt höger. Inga figurer speglas.
