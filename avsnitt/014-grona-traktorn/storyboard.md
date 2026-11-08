# Storyboard – Avsnitt 014 · Gröna sången

Bild för bild som i 006 och 007, för den färdiga sången (`sang.m4a`, tagning 1 "Vad är brunt_ (2).m4a", 3:26.4, ca 85 bpm). **Tiderna kommer ur `rader.txt`.** **Sången klipps aldrig: avsnittstid = sångtid + 11 s** (introt före). **Längd: ≈3:37.4**, under 4 min. Bildstoryboarden byggs med `storyboard/bygg.py` (kopierad från 007) när de nya sakerna finns.

**En bild per handling**, högst ett klipp per sjungen rad, **ingen text i bilderna**, **ingen säger det som sjungs**: Lova gör radens rörelse i bild. Närbilder 1,5–2,5 s, i snitt minst 3 s per bild.

**Introt som i 007 (01–03):** det vanliga introt "Kort i himlen" (som 003–007) med nytt nummer och ny titel, *Avsnitt 14 · Gröna sången*, titeln i grönt. Det renderas i `intro/` från 007:s `intro/index.html` (bara numret, titeln och färgen byts; jingeln och ljudet oförändrade), `intro-med-jingel.mp4` på 11,3 s kapas till 11 s i klippet. Kortet växer till samma papper som kritan ritar på, så att klippet till 02 inte syns. Sedan ritar den gröna kritan traktorn (02–02c), kameran åker in i teckningen och den blir Lovas traktor på vägen (03).

**Slutet som i 007 (16d–17), med ett eget slutögonblick:** över första *"Grönt! Nu kör vi!"* håller Pip upp den tomma ärtskidan högt och alla tre hejar på bänken (14g); över andra poppar nya skidor ut i valvet, en per slag, så att det finns ärtor till alla, och alla gungar i takt (14h, samma helbild, ingen traktor som kör). Sedan ett rakt klipp till danspausen i discot. Sista refrängen stannar i discot, där det inte finns någon traktor: över *"Hej då, hej då – putt, putt!"* står Lova i mitten och vinkar, och raden av småbilder ligger kvar överst (16d). I outrot sveper kritan (brunt) till åkern ur refrängen: Lova kör traktorn över åkern med Pip och Gurra i vagnen bakom, och ärtplantorna växer upp bakom dem (17). Sist sluter sig kritirisen runt Lova i traktorn, håller, stängs, en stjärna glimtar, svart (17b). Ingen kram. Ingen zoom ut och inget fast outro, samma avvikelse från `format/intro-outro.md` som i 005–007.

| Grön sak | Sjungs | Lova i bild |
|---|---|---|
| Grodan (06) | *hopp, hopp, hopp!* | Gurra hoppar över vägen framför traktorn, Lova studsar i sätet per hopp |
| Trafikljuset (07a–c) | *Vänta, vänta … kör, kör, kör!* | lampan lyser rött i bild (sjungs inte), tassen upp och sitter stilla, pumpar armarna när det blir grönt |
| Jackan och flaggan (08a–c) | *Zipp, zipp, zipp!* | drar upp dragkedjan, pekar på flaggan |
| Ärtorna (11b, 14d–f) | *en, två, tre!* | Pip plockar den enda mogna skidan ur ärtvalvet; Lova har klivit ur traktorn och sitter med på bänken; en ärta var, lek, och mums |

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (traktorn på vänstra tredjedelen, vägen glider, ljusblå vägg)
3. Närbild Lova i traktorn (huvud, jacka och armar, traktorns kant längst ner)
4. Bondgården · helbild, **ärtvalvet** (vald 2026-11-06 ur skissen): symmetrisk bild med ladans röda dörr i mitten, ett valv av ärtrankor över bänken med många små platta skidor och en enda tjock mogen högst upp, traktorn parkerad i vänsterkanten framför höet, Lova till höger. Allt i kod på den befintliga plattan (plattan förskjuten så att dörren hamnar i mitten). Tvåbilden är ett närmare utsnitt av bänken, 13a–14b ett lågt utsnitt vid bänken, och 14h är refrängens åker (ingen ny plats). Figurerna 35–45 % av bildhöjden, ingen skuren av bildkanten
5. Närbild Pip (på bänken, och hennes ansikte på "Kycklingen!" i 14a)
6. **Dansbild** · refrängen (på vägen, som i 006) och danspausen (i discot, mint)

## Uttryck

Ansiktena ritas i kod med humören i `verktyg/ansikten.py` (`HUMÖR`) och scenernas `ansikten.js`. Kolumnen **Uttryck** har ett humör per figur i bild, i takt: `→` betyder att uttrycket byter på nästa slag eller rad. Stora och tydliga uttryck: `forvanad` (stora ögon, O-mun) när en grön sak dyker upp, `nyfiken` när någon letar, `ropar` på ekot och refrängens rop, `skrattar` i dansen, `slickar`/`njuter` när de äter, `ledsen` (en liten tår) bara på snyftraden, `karleksfull` när de tackar och delar. `glad` bara där inget annat passar. Kompisen och statisterna reagerar alltid. Inget läskigt, inga arga ansikten.

**Refrängdansen (05a–h, 09a–h, 16b–c), samma varje gång:**

| Rad | Lova |
|---|---|
| Grönt! *(Grönt!)* ×2 | `ropar` på rösten → `skrattar` på ekot |
| Grönt betyder kör! | `ropar` och pekar framåt |
| Grönt! *(Grönt!)* ×2 | `ropar` → `skrattar` |
| Grön som en liten ärta! | `forvanad` när bubblan poppar → `karleksfull` när hon ritar cirkeln (ärtan i bubblan `blinkar`) |
| Putt, putt, tut, tut – | `skelogd` på "putt, putt" → `ropar` på "tut, tut" |
| vad är grönt? Titta ut! | `nyfiken` åt ena hållet → `nyfiken` åt andra (blicken följer tassen) |

## Bild för bild

**Tiderna** är avsnittstid (sångtid + 11 s) ur [rader.txt](rader.txt).

| # | Tid (avsnitt) | Plats · kamera | Bild | Uttryck | Ljud / repliker | Sång |
|---|---|---|---|---|---|---|
| 01 | 0:00.0–0:11.0 | Intro · fast (11 s) | samma intro som 003–007 ("Kort i himlen"): kortet färgläggs fram i himlen och tejpas fast, "lilla kritan" poppar fast som klistermärken medan Fia hoppar längs bokstäverna, Fia flyger ett varv medan *Avsnitt 14 · Gröna sången* poppar fram (titeln i grönt), Fia flyger iväg och kortet växer till papperet i 02. Renderat i `intro/` från 007:s | – | introjingeln | (titeln syns, ingen röst) |
| 02 | 0:11.0–0:16.2 | Kritan ritar · papper | den gröna kritan ritar traktorn från sidan: den runda kroppen, det låga sätet och den korta motorhuven med avgasröret | – | skrrrrt | Kritan ritar … |
| 02a | 0:16.2–0:21.3 | Kritan ritar · papper | ett stort hjul bak och ett litet hjul fram, medan det sjungs | – | skrrt, skrrt | vad kan det vara? |
| 02b | 0:21.3–0:26.7 | Kritan ritar · papper | gissningspausen (ca 5 s, hela "tick, tack"): kritan ritar den sista ledtråden, hytten, ett tak på två smala stolpar över sätet (inga dörrar, inga fönster), och lyfter bort så att den hela traktorn syns | – | skrrt | Tick, tack … tick, tack … |
| 02c | 0:26.7–0:32.0 | Kritan ritar · papper | traktorn skumpar till, en vit puff ur avgasröret, och kritan lyfter ut; sist åker kameran in i teckningen, dit den riktiga traktorn (med samma tak) står i 03 | – (traktorn har inget ansikte) | tut-tut · puff | En traktor! En grön traktor! Tut-tut, nu kör vi! |
| 03 | 0:32.0–0:35.5 | A · Vägen · zoom in | zoom in i den ritade traktorn och ett grönt kritsvep, under svepet blir den Lovas traktor på vägen (helbild); Lova sitter redan i den med sin gröna jacka. Vägen börjar glida, Pella långt bort på himlen | Lova `skrattar` → `glad` när vägen börjar glida | swoosh · putt, putt | (instrumentalt) |
| 03a | 0:35.5–0:38.8 | Närbild Lova | Lova vinkar till tittaren, en vinkning, och tittar framåt igen (Lova pratar inte, Sanna 2026-11-06) | Lova `glad` → `blinkar` | – | (instrumentalt) |
| 03b | 0:38.8–0:44.2 | Vägen · helbild | traktorn tuffar fram, skumpar en gång per "putt", vita puffar driver bakåt; humlan Humle kommer in högt uppe, flyger ett lugnt varv runt Lovas huvud (lite större och långsammare) (som fjärilen runt musen i Rosa sången) och flyger iväg, Lova följer henne med blicken och skrattar | Lova `glad` → `skrattar` på "putt, putt, putt" | putt ×3 | Leoparden kör sin gröna traktor, putt, putt, putt – på vägen här! |
| 04 | 0:44.2–0:50.1 | Närbild Lova | Lova tittar sig omkring, upptäcker sin gröna jacka (tittar ner, ett litet skutt) och pekar sedan på tittaren | Lova `glad` → `nyfiken` på "letar grönt" → `forvanad` när hon ser jackan → `ropar` på "jag och du!" | glimt | leta med – jag och du! |
| 05a–h | 0:50.1–1:04.5 | Ärtresan | vägen blir en brun åker, en grodd per "Grönt!", trafikljuset lyser grönt och åkern grönskar, på "kör" rusar traktorn ut ur bild åt höger; klipp till vägen (traktorn susar in från vänster och saktar in, tre ärtor hoppar in efter den), putt, putt, tut, tut på vägen med ärtorna som ett litet tåg, och på "vad är grönt? Titta ut!" dansar ärtan på taket (hoppar i takt) medan Lova tittar åt båda hållen; 05h är borttagen (för kort), g fortsätter till 1:04.5 och klipper rakt till 06 | Lova `ropar`/`skrattar`, pumpar armarna | pop · pling · tut, tut | Refräng |
| 06 | 1:04.5–1:12.4 | Vägen · helbild | Gurra hoppar över vägen, tre hopp, traktorn bromsar mjukt | Lova `nyfiken` på "Titta där!" → `forvanad` när Gurra hoppar fram → `skrattar` per hopp · Gurra `skrattar` i luften, `skelogd` när han landar på sista hoppet | hopp ×3 | Vad är grönt? (×3) Titta där! Grodan är grön – hopp, hopp, hopp! |
| 07a | 1:12.4–1:15.4 | Vägen · helbild | trafikljuset glider in och lyser rött (bara i bild); traktorn stannar | Lova `nyfiken` på "Titta där!" → `forvanad` när lampan syns | gnissel | Och vad är grönt? Titta där! Titta där! |
| 07b | 1:15.4–1:17.2 | Närbild Lova | tassen upp, sitter stilla, tittar upp på den röda lampan | Lova `nyfiken` (blicken upp mot lampan), håller still; på andra "vänta" en liten `blinkar` mot tittaren | | Vänta, vänta … (vänta, vänta …) |
| 07c | 1:17.2–1:21.3 | Vägen · helbild | pling, grönt; en grön ring slår ut från lampan, traktorn rusar iväg med fartstreck bakom sig, lutar bakåt och kameran rycker till på varje "kör", Lova pumpar armarna | Lova `forvanad` på pling → `ropar` på varje "kör" | pling, brum, swoosh, wiii | Pling! Lampan är grön – kör, kör, kör! |
| 08a | 1:21.3–1:30.5 | Närbild Lova | Lova tittar ner på jackan (ledtråd), kameran åker in mot jackan redan när hon tittar ner (Sanna 2026-11-06: tidigare) | Lova `nyfiken` mot tittaren på frågan → `nyfiken` ner mot jackan i pausen | | Vad mer är grönt? Kan du se? Tick, tack … (paus ca 5 s) |
| 08b | 1:30.5–1:33.3 | Närbild Lova | pekar på jackan (vitt glitter på jackan), sedan på flaggan: kameran åker ut så att hela flaggan syns (glitter på flaggan) | Lova `forvanad` på "Jackan" → `skrattar` på "flaggan med!" | | Jackan är grön … |
| 08c | 1:33.3–1:35.0 | Närbild Lova | drar upp dragkedjan i tre ryck | Lova `njuter` (stolt, ögonen stängda) per ryck → `blinkar` på sista "zipp" | zipp ×3 | Zipp, zipp, zipp! |
| 09a–h | 1:35.0–1:48.0 | Dansbild | refrängdansen igen, likadan | se Refrängdansen ovan | | Refräng |
| 10 | 1:48.0–1:51.3 | Kritsvep (gult) → Bondgården · helbild (ärtvalvet) | traktorn kör in från vänster med den tomma vagnen kopplad bakom och stannar framför höet. Pip och Gurra sitter på bänken under ärtvalvet framför ladans dörr (Gurra har hoppat i förväg). Lova hoppar lugnt ner ur traktorn och går till bänken; traktorn står kvar i vänsterkanten | Lova `glad` → `forvanad` när hon ser Pip och Gurra · Pip `nyfiken` → `skrattar` och vinkar · Gurra `blinkar`; kameran börjar lite vidare så att Lova syns när hon hoppar ner ur hytten och glider in till helbilden medan hon går (Sanna 2026-11-06: "1:48 jumps a bit") | swoosh · putt … tut · duns | vad är grönt? Titta ut! Vad är grönt? |
| 11a | 1:51.3–1:52.7 | Bondgården · kameran glider upp mot valvet (och ner igen till 11b, inga hopp) | massor av små platta skidor hänger ner ur valvet, och högst upp en enda tjock mogen skida; Pip pekar | Lova `nyfiken` · Pip `blinkar` · Gurra `nyfiken` | glimt | Titta där! (Titta där!) |
| 11b | 1:52.7–1:56.9 | Tvåbild vid bänken | Pip sträcker sig upp och plockar den mogna skidan, knäpp, den öppnas: precis tre ärtor, en per "en, två, tre". Hon håller skidan lågt och ut från kroppen (näbben syns) | Pip `ropar` på "en", "två", "tre" · Lova `forvanad` när skidan öppnas → `skrattar` · Gurra `forvanad` på "tre" | knäpp | Ärtorna är gröna – en, två, tre! |
| 11b2 | 1:56.9–2:01.0 | Tvåbild | Lova sätter sig på bänken: alla tre i rad under valvet (Gurra, Pip, Lova). Pip ger var och en sin ärta, en per "en" | Pip `karleksfull` · Lova `skrattar` · Gurra `skrattar` | plupp ×3 | En, en, en … En till var och en! (En till var och en!) |
| 11c | 2:01.0–2:05.0 | Närbild Lova | mellanspelet (16 s, instrumentalt) del 1: Lova sniffar på sin ärta och den fastnar på nosen; hon tittar skelögt på den | Lova `nyfiken` → `skelogd` · Pip och Gurra fnissar utanför bild | fniss | (instrumentalt) |
| 11d | 2:05.0–2:09.0 | Tvåbild | del 2, kasta runt: alla tre kastar sin ärta till nästa kompis samtidigt på slaget (Lova → Gurra → Pip → Lova), tre varv, tills alla har sin egen igen. Bara ärtorna flyger, figurerna vänds inte | alla `forvanad` medan ärtorna flyger → `skrattar` vid fångsten | swoosh per kast, plupp per fångst, jubel | (instrumentalt) |
| 11e | 2:09.0–2:13.0 | Tvåbild | del 3: Gurra balanserar sin ärta på huvudet, vicka, vicka; alla skrattar | Gurra `stolt` · Pip `skrattar` · Lova `skrattar` | | (instrumentalt) |
| 11f | 2:13.0–2:17.0 | Tvåbild | del 4: Lova vill också och kastar sin ärta högt, högre … alla tre tittar upp | Lova `ropar` när hon kastar → alla `forvanad` med blicken upp | swisch | (instrumentalt) |
| 13a | 2:17.0–2:20.9 | Tvåbild | ärtan kommer ner, studsar på bänkkanten och ner på golvet: leken orsakar missödet | Lova `forvanad` · Pip `forvanad` · Gurra `forvanad` | boing | Oj, oj! Ärtan hoppar! |
| 13b | 2:20.9–2:23.8 | Lågt utsnitt | ärtan rullar in under bänken ända in mot väggen, ett skutt per "rull" | (ärtan har inget ansikte) Lova `nyfiken` efter ärtan, kant i bild · Pip `skelogd` när den försvinner under bänken | rull ×3 | Rull, rull, rull … in under bänken |
| 13b2 | 2:23.8–2:27.2 | Lågt utsnitt | Lova hukar sig framför bänken och sträcker tassen in under den, men hon är för stor och armen för kort. Ovanför håller Pip och Gurra upp sina två ärtor | Lova `anstranger_sig` → `forvanad` på sin tomma tass · Pip och Gurra `nyfiken` → `forvanad` på "vi är tre" | | En, två – men vi är tre! |
| 13c | 2:27.2–2:29.7 | Närbild Lova (vid bänkens ände) | ledsen, en liten tår; hon sjunker ihop, tittar ner, armarna hänger och axlarna rycker på varje snyft, kameran glider in en aning | Lova `ledsen` (en liten tår), den enda ledsna bilden | snyft | Leoparden är ledsen – snyft, snyft. |
| 13d | 2:29.7–2:35.2 | Närbild Lova (vid bänkens ände) | Lova tittar på tittaren och väntar | Lova `nyfiken` mot tittaren → `forvanad` på "tick, tack" (väntar på svaret) | | Vem kan hjälpa? (Vem kan hjälpa?) Tick, tack … |
| 14a | 2:35.2–2:36.9 | Närbild Pip | Pips ansikte: ögonen blir stora, tofsen fjädrar upp, vingarna upp, "det är jag!" | Pip `forvanad` på första "Kycklingen!" → `ropar` på andra | pip! | Kycklingen! (Kycklingen!) |
| 14a2 | 2:36.9–2:38.9 | Lågt utsnitt | Pip hoppar ner och trillar mjukt på rumpan, lugnt | Pip `forvanad` (O-mun, "oj!") · Lova `forvanad` | duns | Hoppar ner – oj, hon trillar! |
| 14b | 2:38.9–2:41.0 | Lågt utsnitt | Pip reser sig själv, går rakt in under bänken (hon får plats, Lova inte) och pickar fram ärtan | Pip `skrattar` när hon är uppe → `anstranger_sig` per pick → `forvanad` när ärtan kommer fram | pick ×3 | Upp igen – pick, pick, pick! |
| 14c | 2:41.0–2:43.1 | Tvåbild | Pip ger ärtan till Lova, Lova tackar | Lova `karleksfull` per "tack" · Pip `karleksfull` | | Här är ärtan – tack, tack, tack! |
| 14d | 2:43.1–2:44.7 | Tvåbild | alla tre på bänken igen håller upp sin ärta: nu räcker det igen | Lova, Pip och Gurra `karleksfull` → `skrattar` på "alla tre!" | | En ärta var – till alla tre! |
| 14e–f | 2:44.7–2:47.2 | Tvåbild | alla tre äter | alla `slickar` på "mums" ×3 → `njuter` på "hurra" (Pip `skrattar`) | mums | Mums, mums, mums – hurra! |
| 14g | 2:47.2–2:50.7 | Bondgården · helbild (ärtvalvet) | första "Grönt! Nu kör vi!": Pip håller upp den tomma ärtskidan högt (pling, inget sken), Lova och Gurra med armarna upp; alla tre sitter kvar på bänken och gungar i takt. De första nya skidorna poppar ut i valvet | alla `ropar` på "Grönt!" → `skrattar` | pling · plupp | Grönt! Nu kör vi! |
| 14h | 2:50.7–2:52.5 | Bondgården · samma helbild (inget klipp) | andra "Grönt! Nu kör vi!": fler nya skidor poppar ut i valvet, en per slag, tills valvet är fullt: nu finns det ärtor till alla. Från 2:47 (sista 5,5 s): ärtskidans övergång, en lång ramp (`artovergang.js`): skidor poppar upp från valvet, fler och fler och allt större, tills de täcker hela bilden; i discot poppar de bort inifrån och ut | alla `ropar` på "Grönt!" → `skrattar` | plupp per skida | Grönt! Nu kör vi! |
| 15a–e | 2:52.5–3:01.6 | Disco (mint) | alla dansar; Gurra hoppar, Pip vickar, Fia flyger runt; små musiknoter gungar i takt uppe till höger; på "Hoppa" och "Vicka" slås en rörelsesymbol upp i hörnet (studsande boll, vickande ärta), som i Rosa och Bruna sången, och noterna viker undan | alla `skrattar` på "Danspaus!" · Gurra `ropar` på "Hoppa" → `skrattar` · Pip `ropar` på "Vicka" → `skelogd` på slaget → `skrattar` · Fia `njuter` när hon flyger runt · alla `ropar` på "grön dans!" | pling | Danspaus |
| 16a | 3:01.6–3:09.5 | Disco | grodan, lampan, ärtorna, traktorn på vita kritskivor, flyger upp i raden runt kulan | Lova `forvanad` per sak som flyger upp → `ropar` på varje "grön!" (Gurra på skivan `blinkar`) | | Grodan – grön! … |
| 16b–c | 3:09.5–3:16.0 | Disco | refrängdansen med alla, Lova står i mitten (ingen traktor i discot), ärtbubblan | se Refrängdansen ovan; Pip och Gurra `skrattar` bredvid | | Grönt, grönt, grönt … Grönt betyder kör, grön som en liten ärta! |
| 16d | 3:16.0–3:26.0 | Disco · dansbild | kvar i discot, raden av småbilder ligger kvar överst: Lova står i mitten och vinkar (ingen traktor i discot); Pip och Gurra vinkar bredvid | Lova `karleksfull` och vinkar · Pip `skrattar` → `karleksfull` · Gurra `blinkar` | putt, putt | Hej då, hej då – putt, putt! (och outrots första del, "putt, putt" viskas) |
| 17 | 3:26.0–3:34.0 | Avslutning · åkern (plats 1, refrängens åker) | outrot (instrumentalt): kritsvep (brunt) från discot. Lova kör traktorn över den bruna åkern med Pip och Gurra i vagnen bakom (de vinkar), ärtplantorna (stjälk, bladpar, klängetråd och en hängande skida) växer upp i fårorna bakom dem i takt | Lova `skrattar` | skrrrrt · putt, putt · plupp ×4 | – |
| 17b | 3:34.0–3:37.4 | Avslutning · kritiris | kritirisen sluter sig runt Lova i traktorn (Pip och Gurra i vagnen syns i cirkelns kant), håller, stängs, en stjärna glimtar, svart | Lova `skrattar` → `blinkar` precis innan cirkeln stängs | swoosh · outrot tonas ut | – |

## Tagningen

- Gissningspausen är ca 5 s och frågepausen ca 5 s, båda med "tick, tack", som regeln vill. Inga instrumentala takter behöver läggas in.
- Efter "Vem kan hjälpa?" är barnets tur ca 2,5 s (2:21.6–2:24.2 sångtid), kort men det räcker att ropa "Kycklingen!".
- Mellanspelet efter "En till var och en!" är ca 16 s (1:50–2:06 sångtid) i stället för 2 takter. Det blir leken på bänken: 11c–11f (ärtan på nosen, kasta och fånga, ärtan på huvudet, det höga kastet som leder till missödet).
- Suno har lagt till fler "Vad är grönt?" vid grodan, ett "Och vad är grönt? Titta där!" före trafikljuset och ett andra "Grönt! Nu kör vi!". Bilderna följer tagningen, sången klipps aldrig.
- Outrot är ca 19 s: 16d håller vinkningen till 3:26.0, åkern (17) och kritirisen (17b) tar de sista 11,4 s.
- Lyssna på "Grönt betyder kör!" (0:41.6 och 1:27.4 sångtid), där Whisper hör ordet otydligt.
