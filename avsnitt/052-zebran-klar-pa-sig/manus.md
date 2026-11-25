# Avsnitt 052 – Zebran klär på sig (plan)

**Status:** plan 2026-11-25. Samtalsreplikerna (🆕) godkända av Sanna 2026-11-25 ("Ja, de är bra"). Hjälpsaken vald 2026-11-25: den gula mössan (Öppet 1, A). ✅ **Grind 1 (manus) godkänd av Sanna 2026-11-25** ("Ja, gå till sakerna"). ✅ **Grind 2 (saker och rörelseprovet) godkänd av Sanna 2026-11-25** ("Grind 2 godkänd. Bygg scenen i himmelsblå 1 med de närmare utsnitten"). ✅ **Provet godkänt av Sanna 2026-11-25** ("det himmelsblå rummet är bra"). ✅ **Rösten inspelad 2026-11-25 (grind 3, väntar på Sannas lyssning):** Malin, Eleven v3, stability 0,5, två tagningar (`produktion/ljud-original/roster/zebran-klar-pa-sig/malin-tagning-1a.mp3`, `-1b.mp3`). Tagning 1b används, utom 14, 15, 29, 30 och 35 ur 1a (i 1b gick gränserna fel: *"Nej, i korgen"*, *"Tack! Den gula …"*). Replik 10 har fått 2 s tystnad efter *"… först?"* (7,0 s in), där zebran svarar. Normaliserade till −3 dBFS i `assets/ljud/roster/zebran-klar-pa-sig/`. *"på!"* mätt i 11, 30, 33, 39 (`PA` i `rader.mjs`). **Tagning 2 (2026-11-25, de 18 tydligare replikerna):** `malin-tagning-2a.mp3`/`-2b.mp3`; 2b används, utom 08 och 20 ur 2a. De gamla filerna ligger i `produktion/ljud-original/roster/zebran-klar-pa-sig/tagning-1/`. `PA` mätt om (början av *"på foten / på huvudet / runt halsen"*). Filmen blir 4:03. **Tempo och reaktioner (Sanna 2026-11-25, "more reactions, close crops, character expressions, varied sound effect responses, a bit faster pace"):** luften per rad 0,7 → 0,3 s, zebrans svarspaus 1,3 → 1,0 s, kortare slut på raderna; barnets pauser (gissning, "Ska vi säga tack?", letandet) oförändrade. 4:03 → 3:37 (−11 %). Nya närbilder: rad 1b, glad närbild efter halsduken (19), blyg vid tacket (15), närmare helbild när allt sitter på (25). Zebrans ljud växlar (aldrig samma två gånger i rad: hej, prat, förtjust, fniss, nyfiken, nej, trumpen, mysig suck, hej då) och små effekter ligger på händelserna (pling, plopp, swoosh, tindra, landa-mjuk). Uppe på feedbacksidan för granskning. **Feedback 2026-11-25 kväll 2:** mindre mössa (lagom 420 px), bredare halsduk (620 px) vars bakre del ligger bakom kroppen och som glider in från sidan, strumpan ovanpå kudden, replik 38 kortad till "Ja, där!". **Feedback 2026-11-25 kväll:** ny röd halsduk (8), bäddad säng med mintgrönt täcke (4), ny platt kudde (1) framför gaveln, nallen på golvet under sängen, bara snö i fönstret (inget moln), mössan sitter bättre (lagom 500 px bred, lägre). **Scenen byggd 2026-11-25:** `scener/sovrummet/index.html` (026:s rum.js, provets plagg, kritan via `verktyg/kritan-ritar.js`), raderna i `storyboard/rader.mjs` → `scener/sovrummet/rader.json`. Hängaren sitter till vänster om fönstret (knopparna y 445), korgen under den, halsduken hänger på längden från fjärde knoppen. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Förlaga: [024 Lammet klär på sig](../024-lammet-klar-pa-sig/manus.md), men med ett annat problem (en sak fattas, inte "vill inte") och en annan vändning (kritan ritar fel storlek två gånger). 

**Enkel animation.** Kläderna är egna urklipp som läggs ovanpå riggen i kod. Zebran tar aldrig i dem: han lyfter ett ben eller sträcker på halsen, och plagget glider på plats **på ordet *"på!"***. Zebran står på golvet **framför sängen**, så att hela kroppen och hovarna syns (som i 027).

| | |
|---|---|
| **Titel** | Zebran klär på sig (avsnitt 52). Introt *"Djuren hittar på!"*, inget titelkort |
| **Figurer (1)** | **Zebran Zebbe** (v2, riggad, `assets/karaktarer/zebran-zebbe/premium/uttryck.html`). I det som sägs: bara *"zebran"* |
| **Platser (1)** | **Sovrummet** (zebrans rum från 026 och 027, platta och säng finns), på morgonen. Snö faller i det runda fönstret (himlen och flingorna i kod). Inget platsbyte |
| **Saker som finns** | sängen (`sangen`), kudden (`kudde`, 026:s stora kudde), korgen (`korg`), klädhängaren (`kladhangare`, 039, ny i sovrummet), den blå strumpan (`strumpor`, `cut/strumpa-bla-1/2-tunn.png`), halsduken (`halsduk`, röd med vita ränder, från 038) |
| **Nya saker (grind 2)** | **den gula mössan**, **klarblå strumpor**, kudden i krämvitt (Öppet 2) |
| **Kritan ritar** | 0) i ritintrot på papperet: **den röda halsduken** (Sanna 2026-11-25). Halsduken hänger sedan på kroken. 1) i rummet: **den gula mössan tre gånger**, för liten, för stor, lagom (Sanna 2026-11-25: alternativ A) |
| **I kod** | plaggen följer kroppen, snöflingorna i fönstret, skimret på kudden, små glimtar på plaggen när färgen sägs |
| **Favoriter** | 🦓 zebra · 🧦 strumpor · ❄️ snö |
| **Kärna** | Det snöar, och zebran vill gå ut. *"Den blå strumpan … på!"* Men den andra strumpan är borta. Under sängen? Nej! I korgen? Nej! Zebran blir lite ledsen. Kritan ritar en mössa, först för liten, sedan för stor, sedan lagom: "Varsågod!" – "Tack!" *"Den gula mössan … på!"* Halsduken som kritan ritade i början hänger på kroken: *"Den röda halsduken … på!"* Men strumpan? Barnet ser den blå strumpan på kudden. *"Den blå strumpan … på!"* Röd, gul och blå. Nu kan zebran gå ut i snön! Hej då! |
| **Problemets sort** | **en sak fattas** (inte "vill inte"). Zebran vill hela tiden |
| **Tema, invävt** | **färger.** Varje plagg har sin färg i den upprepade frasen: *den blå strumpan, den röda halsduken, den gula mössan*. Barnet letar efter *"den blå strumpan"*, så färgen blir ledtråden. Ingen lektion: Malin säger bara färgerna en gång till på slutet när zebran visar upp sig |
| **Barnet** | letar: ser den blå strumpan på kudden (hela strumpan syns hela tiden, så barnet kan hitta den innan Malin frågar; Sanna 2026-11-25: "hard to find under pillow, maybe can be on pillow") · ropar *"nej!"* med Malin vid missarna · ser att mössan är för liten och för stor · säger tack |
| **Leken** | mössan i fel storlek: den pyttelilla sitter på örat, den jättestora glider ner över ögonen (uppslag 12–13). Zebran gosar in mulen i halsduken (20) |

Längd: ca 4:15 med samtalsreplikerna (receptets mål 3:45–4:15). Ritintrot ca 16 s, rummet ca 3:30.

## Uppställningen i sovrummet (1920 × 1080)

| Sak | Var | Anmärkning |
|---|---|---|
| Sängen | höger halva, som i 027 | zebran står framför den, lite till vänster om mitten |
| Kudden | vid huvudgaveln, på madrassen | **den blå strumpan ligger ovanpå kudden**, hela strumpan syns från uppslag 1 (Sanna 2026-11-25: "hard to find under pillow, maybe can be on pillow"; förut låg den bakom kudden med bara tån ute) |
| **Klädhängaren** (`kladhangare`, 039) | på väggen till vänster om sängen, knopparna i zebrans huvudhöjd | på knopparna: den första blå strumpan och den röda halsduken (ritintrots teckning, hänger där från början). Mössan hänger inte där: kritan ritar den. Plaggen lyfter från knoppen och glider till zebran; tomma knoppar syns efteråt. Den andra strumpan hänger **inte** där |
| Korgen | på golvet till vänster om sängen | tom, för missen i uppslag 9 |
| Fönstret | runt, på väggen | dagshimmel och lugna snöflingor i kod, hela filmen |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång, lugnt, med `trav`, stannar framför sängen |
| Glatt skutt | 20 px upp, tryck ihop före och vid landningen, inget studs. Bara på glada ställen (snön, tack, strumpan hittad, färdig) |
| Tittar mot fönstret | riktningsposen `rikt 0,3` och ögonen åt fönstret. Huvudet vänds inte |
| Lyfter ett ben | `lyft` på ett ben i taget, 25 px, och håller kvar medan strumpan glider på |
| Strumpan på | strumpan lyfter från kroken och glider i en lugn båge ner till hoven och sitter **på ordet *"på!"***, med `strumpa`. Flyttas och vrids, skalas aldrig |
| Förvånad | stora ögon, liten rund mun, öronen upp, 0,3 s stillhet (receptets avsnitt 9) |
| Tittar åt sidorna | `rikt ±0,3` och ögonen `titt ±36·rikt` |
| Skakar på huvudet (*"Nej!"*) | hela ägget lutar ±6° tre gånger |
| Lite ledsen | öronen faller 12°, ögonen tittar ner, munnen en liten båge nedåt, 2 s stilla (andas och blinkar). Ingen gråt |
| Mössan landar | glider ner uppifrån. **För liten:** sitter på spetsen av ena örat. **För stor:** glider ner över huvudet och ögonen, bara mulen syns, glider sedan av åt sidan. **Lagom:** sitter på hjässan (se Öppet 3). Flyttas, skalas aldrig: de tre storlekarna är tre teckningar |
| Halsduken på | lyfter från kroken och lägger sig lågt runt halsen, änden hänger åt sidan, täcker aldrig mulen |
| Gosar i halsduken | huvudet sjunker 10 px, ögonen blundar 1 s (mysigt), upp igen |
| Mössan på | den lagoma glider från luften ner på huvudet, stannar på ordet *"på!"*. Öronen bakom mössan, se Öppet 3 |
| Strumpan hittas | kudden lutar 6° åt höger (sidan ut, inte upp), strumpan glider fram, sedan till hoven |
| Visar upp sig | stilla, stolt min, ett lugnt skutt. Varje plagg glimtar när färgen sägs |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, 3–4 lugna vinkar |

## INTRO (ca 3,3 s)

Det gemensamma introt *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`). Scenen börjar på tomt papper, inget kritsvep.

## KRITAN RITAR (ca 16 s) – papper

Kritan ritar **den röda halsduken** (Sanna 2026-11-25: i ritintrot ritar kritan en sak ur berättelsen, inte figuren). Konturen i ett drag: det böjda bandet, ränderna, den hängande änden med tofsarna (ca 2,8 s). Väntar medan barnet gissar, sedan fylls den riktiga halsduken i. Zoom in i teckningen. Zebran syns inte förrän han trippar in i uppslag 1. Halsduken ritas då två gånger i filmen, se Öppet 1.

## SOVRUMMET

| # | Bild (en rörelse) | Malin säger | Zebran svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar halsdukens kontur, fyller i, zoom in | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En röd halsduk! | krita-ritar, skogsljud, `glitter` |
| 1 | Helbild, sovrummet med klädhängaren på väggen (se Öppet 1 för vad som hänger där). Zebran trippar in från vänster och stannar framför sängen, vinkar | Hej, zebran! Hej, hej! | `trav`, hej-gnägg |
| 1b | Halvbild, zebran nickar, sträcker lite på sig | 🆕 Har du sovit gott? *(zebran svarar)* Mm, vad bra! | förtjust gnägg i pausen, nickar |
| 2 | Närbild på fönstret: snöflingor faller lugnt (2 s), sedan klipp till zebran som tittar dit med stora ögon | Titta! Det snöar! *(zebran svarar)* 🆕 Åh, vad fint! | `glimt` (svagt), förtjust gnägg i pausen |
| 3 | Halvbild, zebran tittar mot fönstret, nickar, och på *"Ja, vad kul!"* ett litet glatt skutt | Vill du gå ut i snön och leka? *(paus 1 s)* Ja, vad kul! | förtjust gnägg, nickar |
| 4 | Helbild, zebran framför klädhängaren. Klipp till närbild på kroken på *"kroken"* (plaggen glimtar), tillbaka till zebran som tittar på plaggen i tur och ordning. På *"strumporna"* klipp till närbild på den blå strumpan | Då ska vi klä på oss. Kläderna hänger på kroken. Ja, vad ska vi ta på först? *(paus 2 s)* Ja, strumporna, bra idé! Först strumporna. | nyfiket gnägg, sedan förtjust gnägg på *"bra idé"* |
| 5 | Närbild på benen, zebran lyfter ena benet, strumpan glider på | Den blå strumpan … på! | `strumpa`, förtjust gnägg |
| 6 | Halvbild, zebran lyfter andra benet och tittar ner: ingen strumpa. Förvånad min, 0,3 s stillhet | Oj! Var är den andra strumpan? | nyfiket gnägg |
| 7 | Klipp till närbild under sängen: bara golv | Under sängen? *(paus 1,5 s)* Nej! | `gnagg-nej`, skakar på huvudet |
| 8 | Klipp till närbild i korgen: tom | I korgen? *(paus 1,5 s)* Nej! | `gnagg-nej` |
| 9 | Närbild, zebran: öronen faller, tittar ner, 2 s stilla | Åh. Zebran blir lite ledsen. *(zebran svarar)* 🆕 Mm. Jag förstår. Vi letar tillsammans. | mjukt trumpet gnägg i pausen, öronen lyfts lite på *"tillsammans"* |
| 10 | Halvbild, kritan flyger in uppe till höger | Hm … vad gör vi nu? | |
| 11 | Kritan ritar en mössa i luften framför zebran: konturen (2,5 s), gisspaus 3 s. Den fylls i, pytteliten | Titta! Kritan ritar något. *(gisspaus 3 s)* En mössa! | krita-ritar, `glitter`, nyfiket gnägg |
| 12 | Den lilla mössan glider ner och sitter på spetsen av ena örat. Zebran tittar upp på den | Oj! För liten! | kort fniss |
| 13 | Den lilla tonas bort. Kritan ritar en jättestor (konturen 2 s), den glider ner över zebrans huvud ända ner över ögonen: bara mulen syns under kanten. På *"där inne"* lyfts kanten lite och ögonen blinkar fram | En gång till … Oj, oj! För stor! 🆕 Hallå? Är du där inne? | krita-ritar, `prassel-tyg`, kort fniss under mössan (svaret) |
| 14 | Den stora glider av åt sidan. Kritan ritar en tredje (konturen 2,5 s), den fylls i. Kawaii-ögon med glitter | En gång till … Lagom! Varsågod, zebran. | krita-ritar, `glitter`, förtjust gnägg |
| 15 | Zebran tittar på mössan, öronen reser sig | Ska vi säga tack? *(paus 2,5 s)* | nyfiket gnägg |
| 16 | Nickar direkt | Tack! | förtjust gnägg |
| 17 | Halvbild, mössan glider ner på huvudet. Zebran tittar upp mot den. Kritan flyger ut uppe till höger | Den gula mössan … på! *(zebran svarar)* 🆕 Jaså, den tycker du om! | `prassel-tyg`, förtjust gnägg i pausen |
| 18 | Klipp till närbild på halsduken på kroken (den som kritan ritade i början), den glimtar (2 s) | Och där är halsduken! | `glimt` |
| 19 | Halvbild, halsduken lyfter från kroken och glider ner runt halsen | Den röda halsduken … på! | `prassel-tyg` |
| 20 | Närbild, zebran gosar in mulen i halsduken och blundar | Mmm … varm och mjuk. *(zebran svarar)* 🆕 Mm, jag också. | mysig suck i pausen |
| 21 | Halvbild, zebran tittar ner på foten utan strumpa, sedan åt vänster och åt höger | Men strumpan då? Zebran vet inte var. | frågande gnägg |
| 22 | Bred bild av sängen med kudden. Efter 2 s klipp till närbild på kudden, där den blå strumpan ligger ovanpå. Den skimrar efter 3 s | Kan du hjälpa zebran? Ser du den blå strumpan? *(paus 5 s)* | tyst, `lysmask` |
| 23 | Strumpan skimrar tydligt, zebran gör ett glatt skutt | Ja, där! *("Bakom kudden!" klipptes bort ur tagningen när strumpan flyttades upp på kudden, 2026-11-25)* | förtjust gnägg, `tindra` |
| 24 | Kudden lutar åt sidan, strumpan glider fram och på hoven. Zebran tittar ner på båda strumporna | Den blå strumpan … på! *(zebran svarar)* 🆕 Ja, vad skönt! | `strumpa`, förtjust gnägg i pausen |
| 25 | Helbild, zebran står med allt på, ett lugnt skutt. Halsduken, mössan och strumporna glimtar en i taget när färgen sägs | Röd, gul … och blå! 🆕 Oj, så fin du är! | `glimt` ×3, stolt gnägg efter |
| 26 | Halvbild, zebran tittar mot snön i fönstret och nickar | 🆕 Är du färdig nu? *(zebran svarar)* Nu kan zebran gå ut i snön! | långt fniss (`gnagg-mjuk-langt-fniss`) |
| 27 | Halvbild, zebran vinkar (armen bakom kroppen) | Hej då, zebran! Hej då, mössan! *(zebran svarar)* 🆕 Ha det så roligt i snön! | hej då-gnägg i pausen |
| 28 | Samma, zebran vinkar klart | Hej då! Vi ses snart! | |
| 29 | Kritirisen runt zebran | – | – |

**Short:** uppslag 6–9 och 21–25 (strumpan är borta, missarna, barnet hittar den), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. En tagning. Filerna hamnar i `assets/ljud/roster/zebran-klar-pa-sig/`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En röd halsduk!
[happy] Hej, zebran! Hej, hej!
[warmly] Har du sovit gott?   🆕
[happy] Mm, vad bra!   🆕
[happy] Titta! Det snöar!
[happy] Åh, vad fin snö!   🆕
[cheerfully] Vill du gå ut i snön och leka? Ja, vad kul!
[cheerfully] Då ska vi klä på oss. Kläderna hänger på kroken. Ja, vad ska vi ta på först? Ja, strumporna, bra idé! Först strumporna.
[happy] Den blå strumpan … på foten!
[surprised] Oj! Var är den andra strumpan?
[curious] Är strumpan under sängen?
[playfully] Nej!
[curious] Är strumpan i korgen?
[playfully] Nej!
[gently] Åh. Zebran blir lite ledsen.
[warmly] Mm. Jag förstår. Vi letar tillsammans.   🆕
[curious] Hm … vad ska zebran ha på huvudet?
[happy] Titta! Kritan ritar något till zebran.
[happy] En mössa!
[chuckles] Oj! Mössan är för liten!
[playfully] Kritan ritar en gång till …
[laughs] Oj, oj! Mössan är för stor!
[playfully] Hallå? Är du där inne?   🆕
[playfully] Kritan ritar en gång till …
[happy] Mössan är lagom! Varsågod, zebran.
[warmly] Ska vi säga tack?
[happy] Tack!
[happy] Den gula mössan … på huvudet!
[happy] Jaså, du tycker om mössan!   🆕
[happy] Och där är halsduken!
[happy] Den röda halsduken … runt halsen!
[happy sigh] Mmm … halsduken är varm och mjuk.
[warmly] Mm, du tycker om halsduken.   🆕
[curious] Men strumpan då? Zebran vet inte var.
[warmly] Kan du hjälpa zebran? Ser du den blå strumpan?
[happy] Ja, där!
[happy] Den blå strumpan … på foten!
[happy] Ja, vad skönt!   🆕
[happy] Röd, gul … och blå!
[happy] Oj, så fin du är!   🆕
[cheerfully] Har du alla kläderna på dig nu?   🆕
[happy] Nu kan zebran gå ut i snön!
[warmly] Hej då, zebran! Hej då, mössan!
[warmly] Ha det så roligt i snön!   🆕
[warmly] Hej då! Vi ses snart!
```

**🆕 = ny samtals- eller reaktionsreplik** (Sanna 2026-11-25: mer samtal och fler reaktioner). Mönstret: Malin frågar eller säger något, zebran svarar med sitt gnägg i pausen (ca 1–1,5 s), Malin reagerar kort som om hon förstått. Malin pratar aldrig över zebrans ljud.

Filnamnen (`rost.txt` till `dela-tagning.py` skrivs efter grind 1; numren är omräknade, inget är inspelat än):

```
01-kritan-ritar  02-vad-blir-det  03-rod-halsduk  04-hej-zebran-hej  05-sovit-gott  06-vad-bra
07-titta-snoar  08-vad-fint  09-ga-ut-snon-leka  10-kla-pa-kroken-strumporna  11-bla-strumpan-pa  12-var-andra-strumpan
13-under-sangen  14-nej  15-i-korgen  16-nej  17-lite-ledsen  18-jag-forstar-letar
19-vad-gor  20-titta-kritan-ritar  21-en-mossa  22-for-liten  23-en-gang-till  24-for-stor
25-ar-du-dar-inne  26-en-gang-till  27-lagom-varsagod  28-saga-tack  29-tack  30-gula-mossan-pa
31-tycker-du-om  32-dar-ar-halsduken  33-roda-halsduken-pa  34-varm-och-mjuk  35-jag-ocksa  36-strumpan-da
37-hjalpa-zebran-se  38-dar-bakom-kudden  39-bla-strumpan-pa  40-vad-skont  41-rod-gul-bla  42-sa-fin
43-ar-du-fardig  44-ga-ut-i-snon  45-hej-da-zebran  46-roligt-i-snon  47-hej-da-ses-snart
```

## Zebrans röst

Finns redan: `gnagg-mjuk` (027, Sannas mjukare och sötare tagningar: hej, fortjust, fniss, langt-fniss, nyfiken, trumpen, nej, hejda), `gnagg-gullig-1c–1f` (svenskt *"hej!"*) och `8c–8f` (*"hej då"*), `gnagg-nej`. **Saknas:** mysig suck (uppslag 18). `gnagg-gullig-4` finns men är den gamla, skarpare familjen: prova den, annars en ny tagning i `gnagg-mjuk`-stilen (grind 4). Övrigt finns: `strumpa`, `prassel-tyg`, `trav`, `glimt`, `glitter`, `tindra`, `lysmask`, `krita-ritar`, `skogsljud`, `hemmaljud` (platsmatta). Fniss: två korta (12, 13) och ett långt (26), aldrig två rader i följd utan ett annat ljud emellan (receptet: högst 3–4 per film). Ingen ny musik.

## Saker: finns och nya

| Sak | Status | Fil |
|---|---|---|
| Sovrummet (plattan) | ✅ finns, används i 026 och 027 | `bakgrunder/sovrummet.md` |
| Sängen | ✅ **bäddad, vald nr 4** (Sanna 2026-11-25, "bedding on bed"): mintgrönt täcke, Flow 0 krediter. Tagningarna och `jamforelse.jpg` i `saker/sang-baddad/`, urklipp `cut/sang-baddad.png` (`egen_kant.py`, kanten krympt 8 px). Läggs över 026:s säng i scenen (`SANG_NY`), madrassen på samma höjd | 026:s `rekvisita/sangen.md` var förlagan |
| Kudden | ✅ **ny, vald nr 1, ligger platt** (Sanna 2026-11-25: den gamla "looks bad"). Flow 0 krediter, `saker/kudde-ny/` med `jamforelse.jpg`, urklipp `cut/kudde-ny.png`. Ligger på madrassen framför gaveln, den gömda strumpan bakom med tån ute | |
| Nallen | ✅ 026:s nalle (`R.NALLE`) ligger på golvet under sängen (Sanna 2026-11-25) | i kod, `R.nalleBild` |
| Korgen | ✅ finns | `rekvisita/korg.md` |
| Klädhängaren (kroken) | ✅ finns (039), ny i sovrummet. Röd ribba med fyra gula knoppar | `rekvisita/kladhangare.md`, `cut/kladhangare.png`. Står på väggen i rad 4 (*"Kläderna hänger på kroken"*) |
| Blå strumpor | ✅ **klarblå, vald nr 2** (Sanna 2026-11-25), Flow Nano Banana 2.1, 0 krediter. Tagningarna och `jamforelse.jpg` i `saker/strumpor-klarbla/`. Urklippen `cut/strumpa-klarbla-1.png` (tån åt vänster) och `-2.png` (tån åt höger), 510 × 767, `tunn_kant.py 7` (1 %), paret med tjock kant i `original/`. På benet målas strumpan i kod i benets form (Lösningar från förlagorna); bilden är den fria strumpan. De ljusblå i `rekvisita/strumpor.md` syntes inte mot det blå rummet | Öppet 2 |
| Röd halsduk | ✅ **ny, vald nr 8** (Sanna 2026-11-25, "create better red halsduk"): bandet framifrån med knut och en kort snibb, Flow 0 krediter. Tagningarna, `jamforelse.jpg` och `pa-zebran.jpg` i `saker/halsduk-ny/`, urklipp `cut/halsduk-ny-8.png` (kanten 8). Kontur `saker/halsduk-kontur.json` (`verktyg/kontur.py`). Den gamla omfärgade ligger kvar i `saker/halsduk-rod/` | Hänger på kroken. Provet (`scener/prov/`) har kvar den gamla |
| **Gul mössa** | ✅ **vald: nr 3** (Sanna 2026-11-25). Flow Nano Banana 2.1, 0 krediter, stilreferens `mossan` och `halsduk`. Tagningarna och `jamforelse.jpg` i `saker/mossa-gul/`. Urklipp `saker/mossa-gul/cut/mossa-gul.png` (887 × 870), `egen_kant.py` + `tunn_kant.py 9` (1 %), den tjocka i `original/`. Flyttas till `assets/rekvisita/mossa-gul/` med `rekvisita/mossa-gul.md` och README-raden när delade filer får röras | kritans hjälpsak: samma form som `mossan` (024), i klar solgul, Flow med `mossan` och `halsduk` som stilreferens. Behöver en kontur (de tre storlekarna är samma bild och kontur i olika skala) |
| Snöflingor, skimmer, glimtar | i kod | |

Inga saker eller bilder är skapade.

## Lösningar från förlagorna

Genomgång 2026-11-25 (Sanna: *"study the similar videos and how they solve things … so they match and also work"*) av scenkoden, `rader.mjs`, manusen och commit-meddelandena för 024, 039, 035, 038, 026 och 040. Feedbacksidan har inga öppna poster för dem. Feedbacken finns som kommentarer i koden och i commit-meddelandena. Tre regler går igen överallt: **ett plagg är ett stelt urklipp som flyttas och vrids men aldrig skalas**, **målet läses ur riggens matris**, och **lagren avgör vad som ligger bakom**. Inget går genom något (CLAUDE.md).

| Handling | Vad som var svårt | Så löstes det | Kopiera till 052 |
|---|---|---|---|
| **Strumpa på hoven** | 024: strumpan såg inte ut som en strumpa, den vita kanten syntes mot benet, benet syntes genom en halvgenomskinlig strumpa och en strumpkant stack ut. 039: *"strumporna som 024"* | Strumpan på benet **målas i kod i benets egen form** (en mask av benbilden, färgad i strumpans färg) och klipps från hoven uppåt med `pa` 0→1. Den vita kanten behålls bara på utsidan. Övertoningen från fri strumpa till benstrumpa är kort, och benet göms helt när strumpan sitter. Den fria strumpan (på kroken, i luften, bakom kudden) är urklippet. Benet lyfts tydligt, och figuren tar aldrig i plagget | 039 `scener/pulka/index.html`: `strumpaBen`, `strumpKlipp`, `strumpmask`, `STR_BILD` (rad ca 220–229), `strumpRad` ('7'/'8'). 024 `scener/hallen/index.html`: `plaggFria` 188 (låg båge, 36 px), `paKurva` 203 (sitter på *"på!"*), `matris`/`iM`/`mVinkel`/`mSkala` 180–182. **För zebran:** benen är krämvita med svarta randkilar och svart hov, så strumpan täcker hoven och nedre randen. Färgen `#2F7FD8` från de nya klarblå strumporna |
| **Mössa på huvudet** | 024: mössans kanter töjdes när den gled ner (*"edges stretches"*), första mössan var för stor och för hög. 035: luvan klipptes i närbild | Mössan läggs i riggens `.kropp`, och kroppens skala tas ut igen, så den följer gungningen men töjs aldrig. Den följer huvudet i riktningsposen. Närbilderna räknar höjden till mössans topp | 024 `lamm()` 310–342, `MOSSA` 94, `mossaFri` 217, `mossaGlid`. 035 `katt()` 352, `LUVA_TOPP`. **För zebran (valt efter provet, Öppet 3):** mössan ligger över öronen och döljer dem helt. Öronen vrids ihop 10° medan mössan glider ner så att inga spetsar sticker ut under brättet (039 `sq`, `orePlopp` 439) |
| **Mössan i fel storlek** | Inget avsnitt har gjort det | **För liten:** följer örats transform och sitter på örats spets. **För stor:** samma grepp som 024:s tittut (`tittut` 382, mössan sänks över ögonen på 0,45 s, upp på 0,35 s), men med den stora teckningen. Den täcker ögonen men aldrig mulen, glider sedan av åt sidan. De tre storlekarna är samma bild i tre fasta skalor, som var och en ritas av kritan, och ingen av dem skalas under en rörelse | 024 `tittut`, `OGON_NER`. 024 '5a–5c' 436–443 och 035 '7a–c' 446–452 för kritans ritrader |
| **Halsduk runt halsen** | 038: *"way too small"* (0,3 → 0,55) och för högt | Halsduken ligger i en `.pynt`-grupp i `.kropp` med kroppens skala uttagen, lågt på halsen, aldrig över mulen | 038 `PYNT`/`pynta()` (rad ca 179–192). Halsduken glider från kroken med `glidM` som de andra plaggen |
| **Kläder på kroken** | Plaggen flög, krympte i vridningen, eller tog fel exemplar av riggens ben | Hängaren och knopparna är konstanter. Varje plagg hänger med ett litet snöre runt knoppen och glider som en matris från knoppen till riggens lager. Vridningen sker kring bildens mitt, så storleken inte ändras. Tomma knoppar syns efteråt | 039 `HANG`/`KROK` 78–79, `hang()` 398, `hangStd` 405, `glidM` 380, `glidV` 384, `rigM` 344, `synlig` 349 |
| **Sak gömd bakom något** | 024: stövlarna syntes under pallen. 039: vanten gick inte att gömma "bara i bild". 026: kudden hamnade bakom sängen, och nallen bakom kudden ändrades till nallen på golvet | **Lagret gör det:** saken ligger i ett lager bakom skyddet, med bara tån utanför kanten, aldrig under eller igenom. Tån vickar lite och skimrar efter 3 s av pausen, och tydligt på *"Ja, där!"*. Saken byter lager först när den kommer fram | 024 `STOVEL_BAK` 115, `skimmer` 269, raderna 15–16. 039 lagret `korgL`, `GOMD_M` 394, `forKorg`. **För 052:** lagerordningen sängen → den gömda strumpan → kudden → zebran (`framfig`). Kudden lutar högst 6° kring sitt nedre högra hörn, som vilar på madrassen, så den aldrig går ner i madrassen. Tån ligger på madrassens vita, inte mot väggen |
| **Zebran i sovrummet** | 026: zebran bakom sängen visade inga ben. Kudden hamnade fel i lagren | Framför sängen står zebran på `ZF = [1150, 1030]` i lagret `framfig` (efter `sang`), skala `GS` 0,5. Den står närmare kameran än golvlinjen 905 | 026 `rum.js`: `zebra()` 230, `LAGER` 76, `BED`, `RIM`, `KUDDE_POS`. `index.html`: `ZF`/`FRAM` 94–95. Kudden `rekvisita/kudde/cut/kudde-v1-zebbe.png` (krämvit variant, Öppet 2) |
| **Kritan ritar** | Egen krit-kod såg olika ut i olika filmer | Från 052 **måste** kritan gå genom den delade koden (`qa-scen.py` flaggar `krita kod`) | `verktyg/kritan-ritar.js` (`kritaBild`, `KRITAN`, `kritaSkala`), som 039 använder. Halsdukens kontur till ritintrot: `saker/halsduk-kontur.json` (`verktyg/kontur.py`). Ränderna och tofsarna läggs till som egna drag så att den går att gissa |

**Ordningen när scenen byggs:** först ett rörelseprov med bara riggen och plaggen (strumpan på båda hovarna, mössan med öronen, mössan i tre storlekar, halsduken). Stillbilder 6 per sekund runt varje ögonblick där ett plagg når fram till kroppen, och runt kudden när den lutar. Sedan resten av scenen.

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte
- [x] Inga djurnamn: *"zebran"*, *"halsduken"*, aldrig *"Zebbe"*
- [x] Aldrig *"Vad kan det vara?"*, aldrig *"Vad säger man?"* (*"Ska vi säga tack?"*)
- [x] Inga uppmaningar till barnet att göra något med kroppen. Barnet **letar** (*"Ser du den blå strumpan?"*) och ropar *"nej!"* vid missarna
- [x] Ny sorts problem: **en sak fattas**, zebran vill hela tiden
- [x] Färgerna bara i den upprepade frasen och en gång på slutet, ingen lektion
- [x] Samma fras tre gånger (fyra med lösningen): *"Den … … på!"*
- [x] *"Varsågod"* och *"Tack!"*
- [x] Bågen ur `berattelse.md`: viljan (snön, under 20 s), hindret (strumpan borta), två missar (under sängen, i korgen), en känsla med namn (*lite ledsen*), barnet löser det, slutet tar upp viljan (*"Nu kan zebran gå ut i snön!"*). Kritan ritar fel först (för liten, för stor, lagom)
- [x] Tydligt hej och hej då, med vinkning. Taggar på varje rad, aldrig `[excited]`
- [x] Inget läskigt: ledsen 2 s, ingen gråt, den stora mössan är rolig och zebran fnissar under den
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] **Avsteg från receptet:** kritan ritar halsduken bara i ritintrot och mössan tre gånger (fel storlek) i rummet, i stället för två olika saker i rummet. Fel storlek ger samma "ritar igen"-ögonblick två gånger. Säg till om du vill ha en andra sak
- [ ] **Lilla bilen** (`berattelse.md` 4) är inte med, som i de senaste bilderböckerna. Den kan gömmas under sängen om du vill

## Tydligare repliker (godkända av Sanna 2026-11-25, "Yes, all 18")

Sanna 2026-11-25: *"make sure all manus are clear and malin says things like ska du torka dig med handduken"*. Varje replik ska säga vad som händer: saken, handlingen och gärna kroppsdelen. Rösten är redan inspelad (tagning 1), så bara de ändrade replikerna spelas in igen i en kort tagning och behåller sina filnamn. De andra 31 är tydliga som de är.

| # | Gammal replik | Ny replik | Varför |
|---|---|---|---|
| 08 | [happy] Åh, vad fint! | [happy] Åh, vad fin snö! | säger vad som är fint |
| 11 | [happy] Den blå strumpan … på! | [happy] Den blå strumpan … på foten! | kroppsdelen; bilden landar på *"foten"* |
| 13 | [curious] Under sängen? | [curious] Är strumpan under sängen? | säger vad vi letar efter |
| 15 | [curious] I korgen? | [curious] Är strumpan i korgen? | samma |
| 19 | [curious] Hm … vad gör vi nu? | [curious] Hm … vad ska zebran ha på huvudet? | vag fråga, nu pekar den mot mössan |
| 20 | [happy] Titta! Kritan ritar något. | [happy] Titta! Kritan ritar något till zebran. | vem det är till |
| 22 | [chuckles] Oj! För liten! | [chuckles] Oj! Mössan är för liten! | saken |
| 23 | [playfully] En gång till … | [playfully] Kritan ritar en gång till … | vem som gör vad |
| 24 | [laughs] Oj, oj! För stor! | [laughs] Oj, oj! Mössan är för stor! | saken |
| 26 | [playfully] En gång till … | [playfully] Kritan ritar en gång till … | samma som 23 |
| 27 | [happy] Lagom! Varsågod, zebran. | [happy] Mössan är lagom! Varsågod, zebran. | saken |
| 30 | [happy] Den gula mössan … på! | [happy] Den gula mössan … på huvudet! | kroppsdelen |
| 31 | [happy] Jaså, den tycker du om! | [happy] Jaså, du tycker om mössan! | saken |
| 33 | [happy] Den röda halsduken … på! | [happy] Den röda halsduken … runt halsen! | kroppsdelen |
| 34 | [happy sigh] Mmm … varm och mjuk. | [happy sigh] Mmm … halsduken är varm och mjuk. | saken |
| 35 | [warmly] Mm, jag också. | [warmly] Mm, du tycker om halsduken. | *"jag också"* sa inte vad |
| 39 | [happy] Den blå strumpan … på! | [happy] Den blå strumpan … på foten! | som 11 |
| 43 | [cheerfully] Är du färdig nu? | [cheerfully] Har du alla kläderna på dig nu? | vad som är färdigt |

**Obs:** 11, 30, 33 och 39 ändrar den upprepade frasen *"Den … på!"* som Sanna godkände i grind 1. Den blir *"Den … på foten / på huvudet / runt halsen!"*, fortfarande samma mönster. Säg till om du hellre behåller *"… på!"*.

## Kontroll mot regler (052–057, Sanna 2026-11-25)

| Punkt | Ok | Rättat |
|---|---|---|
| 1. Rigg | Zebrans v2-rigg via 026:s `rum.js` (`zebra()`) med dess uttryck, poser, nick och blinkningar. Inga kodarmar, vinkningen (`R.vink`) med armen bakom kroppen, ingen figur snurrar, ingen sover. Plaggen är stela urklipp i `.kropp` som aldrig skalas. Glada ansikten har öppna ögon | Svansen visar känslan: viftar vid glädje (rad 2, 5, 23, 24, 25), hänger vid ledsen (rad 9), åker upp vid förvåning (rad 6) |
| 2. Effekter | Vita kanter via `kant.js`, kritan via `kritan-ritar.js` med krit-gnistor (`qa-scen`: tomt). Varm ton 0,07, vinjett 0,12. Riggens skugga, korgens markskugga, papperskornet på ritpapperet, snöflingor i fönstret | **Line boil:** `rum.js` gav 5/zoom och ny brusbild 10 gånger/s. Scenen sätter nu 2,5/zoom varje bildruta och ny brusbild 6 gånger/s. **Mjuk vägg** i närbilder (svag oskärpa på plattan när zoomen är över 1,5) så att zebran står fram. Parallax används inte: alla utsnitt står stilla (hårda klipp) |
| 3. Regler | 1 figur, 1 plats. Inga djurnamn. *"Ska vi säga tack?"*, aldrig *"Vad kan det vara?"*. Ritintrot ritar halsduken, inte zebran. Barnet letar efter strumpan. Inget går genom något: plaggen glider framför kroppen och landar på den, den gömda strumpan ligger i lagret bakom kudden och åker via golvet till hoven (inte framför ansiktet), kudden lutar kring sitt hörn på madrassen. Utsnitten ca ×1,25 närmare än `bildutsnitt.md`, som Sanna valde | **Malin efter handlingen:** rad 2 talade över fönsterbilden innan snön syntes, nu kommer repliken 0,6 s in. Rad 5, 6, 17 och 24 fick tid för reaktionen innan nästa replik. **Strumpan** minskad från provets 0,16 till 0,12 (den hängde framför magen), och den gömda strumpan flyttad så att tån sticker ut lika långt som i provet: före/efter i `saker/fore-efter-strumpa.jpg` |
| 4. Starka reaktioner | Reaktionsslag med närbild: hej (2), kritans mössor (15–17), missarna under sängen och i korgen, strumpan hittad (24) | **Nya närbilder:** jätteglad med stora ögon och öronen bakåt när den första strumpan sitter (5), förvånad med öron och svans upp (6), ledsen med hängande öron, sänkt huvud och blick nedåt (9), mössan på (17), båda strumporna på hovarna och sedan glad närbild (24). Tackscenen i halvnära (15, 16) |
| 5. Lärdomar | Se *Lösningar från förlagorna*: strumpan målad i benets form (039), mössan och halsduken i `.kropp` (024, 038), plaggen från knopparna (039), lagret gömmer strumpan (024, 026), kritan delad | Den fria strumpan går över i den målade på 0,25 s, filmens enda övertoning: titta på den i täta bilder vid fullrenderingen |

`python3 verktyg/qa-scen.py avsnitt/052-zebran-klar-pa-sig/scener/sovrummet`: boil, krit-kod och röst tomma.

## Öppet

1. ✅ **Halsduken ritas två gånger:** löst med alternativ A (Sanna 2026-11-25). Ritintrots halsduk hänger på kroken, och kritan ritar den gula mössan i tre storlekar. *"Hej då, mössan!"* i hej då, eftersom mössan är gåvan. Halsduken är 038:s, men helröd (Sanna 2026-11-25, `saker/halsduk-rod/`).
2. ✅ **Den blå strumpan bakom kudden (valt 2026-11-25, minsta ändringen, Sanna kan byta):** sovrummets vägg är blå och 026:s kudde ljusblå, så den ljusblå strumpan försvann ([kontrastprov 1](saker/kontrast-strumpa-kudde.jpg)). Väggen och rummet behålls. **Kudden blir krämvit** (`#F6ECD6`, en färgvariant av `kudde-v1-zebbe.png`, inte smörgul så att den inte krockar med mössan) och **strumporna klarblå** (`#2F7FD8`, nya ur Flow). Tån ligger på madrassens vita, inte mot väggen. [Kontrastprov 2](saker/kontrast-strumpa-kudde-2.jpg): vänster det valda, höger en ljust smörgul kudde som alternativ.
3. ✅ **Mössan och öronen (Sanna 2026-11-25): öronen gömda under mössan.** Provat på riggen ([scener/prov](scener/prov/index.html), `oron: 'bakom'`): den lagoma mössan täcker öronen helt (brättets nederkant i riggens (512, 300), bredd 470). Öron som ritades ovanpå mössan såg klistrade ut och valdes bort. Öronen syns igen när mössan är för liten (på örat) och innan den sätts på. Strumporna går från hoven upp till magen (mudden vid y 846/842), halsduken ligger lågt (516, 658), bredd 600: Sanna tyckte att (516, 618) var för högt. Den gömda strumpans tå sticker fram till höger om kudden på madrassens vita (kudden + 128 px). Krämvita kudden: `saker/kudde-kram/kudde-kram.png` (kudde-v1-zebbe omfärgad till #F6ECD6). [Provarket](saker/prov-ark.jpg).
4. **Bakom kudden igen:** i 026 hittade barnet nallen bakom kudden i samma rum. Det är din idé och fungerar, men om du vill variera: under täcket (en blå kant sticker fram), eller i stöveln vid dörren.
5. ✅ **Sovrummet: himmelsblå sovrummet v1 utan dörr** (Sanna 2026-11-25, efter att först ha valt turkos 1), `assets/bakgrunder/himmelsbla-sovrummet/himmelsbla-sovrummet-v1-utan-dorr.jpeg` (himmelsblå med molntapet, ingen dörr, inga gardiner). Uppmätt i 1920×1080: fönstret mitt (754, 357), radie 190 (inre vita 175), golvlinjen y 806 (026: 817), så sängen och zebran står kvar på samma mått. Provet: `scener/prov/?rum=himmelsbla-1` (standard). Provades och valdes bort: 026:s rum omfärgat, turkos 1, orange 1 och 2. [Alla fyra](saker/sovrum-farg/rum-alla.jpg), [himmelsblå 1](saker/sovrum-farg/rum-himmelsbla-1.jpg). **Närmare utsnitt överallt** (Sanna 25/11, ca ×1,25): helbild zoom 1,4 (1000, 670), halvnära 1,9, närbild 3,2, mössans närbild 3,2 med mitt y 690 så toppen och tofsen syns, hovarna 3,9, kudden 2,7. Helbilden blir då tätare än 40 % i `format/bildutsnitt.md`. [Provarket](saker/prov-ark.jpg).
