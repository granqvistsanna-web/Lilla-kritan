# Storyboard – Avsnitt 014 · Gröna sången

Bild för bild som i 006 och 007, för den färdiga sången (`sang.m4a`, tagning 1 "Vad är brunt_ (2).m4a", 3:26.4, ca 85 bpm). **Tiderna kommer ur `rader.txt`.** **Sången klipps aldrig: avsnittstid = sångtid + 11 s** (introt före). **Längd: ≈3:37.4**, under 4 min. Bildstoryboarden byggs med `storyboard/bygg.py` (kopierad från 007) när de nya sakerna finns.

**En bild per handling**, högst ett klipp per sjungen rad, **ingen text i bilderna**, **ingen säger det som sjungs**: Lova gör radens rörelse i bild. Närbilder 1,5–2,5 s, i snitt minst 3 s per bild.

**Introt som i 007 (01–03):** det vanliga introt "Kort i himlen" (som 003–007) med nytt nummer och ny titel, *Avsnitt 14 · Gröna sången*, titeln i grönt. Det renderas i `intro/` från 007:s `intro/index.html` (bara numret, titeln och färgen byts; jingeln och ljudet oförändrade), `intro-med-jingel.mp4` på 11,3 s kapas till 11 s i klippet. Kortet växer till samma papper som kritan ritar på, så att klippet till 02 inte syns. Sedan ritar den gröna kritan traktorn (02–02c), kameran åker in i teckningen och den blir Lovas traktor på vägen (03).

**Slutet som i 007 (16d–17), med ett eget slutögonblick:** sista raden i vers 3 är Pip som håller upp den gröna ärtskidan som ett grönt ljus, *"Grönt! Nu kör vi!"* (14h); Lova står kvar vid bänken. Sista refrängen stannar i discot, där det inte finns någon traktor: över *"Hej då, hej då – putt, putt!"* står Lova i mitten och vinkar, och raden av småbilder ligger kvar överst (16d). I outrot sveper kritan (brunt) till åkern ur refrängen: Lova kör traktorn över åkern, ärtplantorna växer upp bakom henne och Pip och Gurra dansar i kanten (17). Sist sluter sig kritirisen runt Lova i traktorn, håller, stängs, en stjärna glimtar, svart (17b). Ingen kram. Ingen zoom ut och inget fast outro, samma avvikelse från `format/intro-outro.md` som i 005–007.

| Grön sak | Sjungs | Lova i bild |
|---|---|---|
| Grodan (06) | *hopp, hopp, hopp!* | Gurra hoppar över vägen framför traktorn, Lova studsar i sätet per hopp |
| Trafikljuset (07a–c) | *Vänta, vänta … kör, kör, kör!* | lampan lyser rött i bild (sjungs inte), tassen upp och sitter stilla, pumpar armarna när det blir grönt |
| Jackan och flaggan (08a–c) | *Zipp, zipp, zipp!* | drar upp dragkedjan, pekar på flaggan |
| Ärtorna (11b, 14d–f) | *en, två, tre!* | Pip plockar skidan från ärtplantan på gården; Lova har klivit ur traktorn, räknar på tassen; en ärta var och mums |

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (traktorn på vänstra tredjedelen, vägen glider, ljusblå vägg)
3. Närbild Lova i traktorn (huvud, jacka och armar, traktorns kant längst ner)
4. Bondgården · helbild (gul vägg, ladans röda dörr, staketet med ärtplantan, träbänken vid ladväggen; tvåbilden är ett närmare utsnitt, 13c–14b ett lågt utsnitt vid bänken)
5. Närbild Pip på bänken med ärtskidan (Lova står bredvid bänken)
6. **Dansbild** · refrängen (på vägen, som i 006) och danspausen (i discot, mint)

## Uttryck

Ansiktena ritas i kod med humören i `verktyg/ansikten.py` (`HUMÖR`) och scenernas `ansikten.js`. Kolumnen **Uttryck** har ett humör per figur i bild, i takt: `→` betyder att uttrycket byter på nästa slag eller rad. Stora och tydliga uttryck: `forvanad` (stora ögon, O-mun) när en grön sak dyker upp, `nyfiken` när någon letar, `ropar` på ekot och refrängens rop, `skrattar` i dansen, `slickar`/`njuter` när de äter, `ledsen` (en liten tår) bara på snyftraden, `karleksfull` när de tackar och delar. `glad` bara där inget annat passar. Kompisen och statisterna reagerar alltid. Inget läskigt, inga arga ansikten.

**Refrängen, Ärtrankan (05a–h och 09a–h), samma varje gång.** Bildplanen står i [refrang-plan.md](refrang-plan.md); här är uttrycken per rad:

| Rad | Bild (refrang-plan) | Uttryck |
|---|---|---|
| Grönt, grönt! *(Grönt, grönt!)* | 1 · vägen, groddar | Lova `ropar` på rösten → `skrattar` på ekot |
| Traktor, traktor – *(putt, putt!)* | 1 forts. | Lova `skelogd` på "putt" → `glad` på "putt" |
| Plopp! En liten ärta – *(plopp, plopp!)* | 2 · ärtan ploppar | Lova `nyfiken` bakåt efter ärtan → `forvanad` på "plopp, plopp" |
| Väx nu, ärta – *(väx, väx!)* | 3 · skottet lyfter traktorn | Lova `forvanad` när traktorn lyfts → `skrattar` på andra "väx" |
| Upp på rankan – *(upp, upp!)* | 4 · upp i himlen | Lova `ropar` på "upp" → `skrattar` på "upp, upp" (aldrig rädd) |
| Grodan blir så stor – *(oj, oj!)* | 5 · det busiga | Lova `forvanad` (stora ögon, O-mun) · Gurra `skrattar` när han är stor → `blinkar` när han krymper |
| Grönt får allt att växa! *(Väx, väx!)* | 6 · sakerna växer fram | Lova `forvanad` per sak som växer fram → `ropar` på "Väx, väx!" och sträcker på sig · Gurra `skrattar` |
| Tut, tut! *(Tut, tut!)* | 7 · närbild | Lova `ropar` per tut → `blinkar` när traktorn svarar |
| Vad är grönt? Titta ut! | 8 · kritsvep hem | Lova `nyfiken` åt ena hållet → `nyfiken` åt andra (blicken följer tassen) |

**Sista refrängen (16a–c), i discot:** Lova `forvanad` per sak som flyger upp → `ropar` på "gröna!" och på "Väx, väx!" (skivorna växer), Pip och Gurra `skrattar` och sträcker på sig; `skelogd` på första "putt, putt".

## Bild för bild

**Tiderna** är avsnittstid (sångtid + 11 s) ur [rader.txt](rader.txt).

| # | Tid (avsnitt) | Plats · kamera | Bild | Uttryck | Ljud / repliker | Sång |
|---|---|---|---|---|---|---|
| 01 | 0:00.0–0:11.0 | Intro · fast (11 s) | samma intro som 003–007 ("Kort i himlen"): kortet färgläggs fram i himlen och tejpas fast, "lilla kritan" poppar fast som klistermärken medan Fia hoppar längs bokstäverna, Fia flyger ett varv medan *Avsnitt 14 · Gröna sången* poppar fram (titeln i grönt), Fia flyger iväg och kortet växer till papperet i 02. Renderat i `intro/` från 007:s | – | introjingeln | (titeln syns, ingen röst) |
| 02 | 0:11.0–0:16.2 | Kritan ritar · papper | den gröna kritan ritar traktorn från sidan: den runda kroppen, det låga sätet och den korta motorhuven med avgasröret | – | skrrrrt | Kritan ritar … |
| 02a | 0:16.2–0:21.3 | Kritan ritar · papper | ett stort hjul bak och ett litet hjul fram, medan det sjungs | – | skrrt, skrrt | vad kan det vara? |
| 02b | 0:21.3–0:26.7 | Kritan ritar · papper | gissningspausen (ca 5 s, hela "tick, tack"): kritan ritar den sista ledtråden, hytten, ett tak på två smala stolpar över sätet (inga dörrar, inga fönster), och lyfter bort så att den hela traktorn syns | – | skrrt | Tick, tack … tick, tack … |
| 02c | 0:26.7–0:32.0 | Kritan ritar · papper | traktorn skumpar till, en vit puff ur avgasröret, och kritan lyfter ut; sist åker kameran in i teckningen, dit den riktiga traktorn (med samma tak) står i 03 | – (traktorn har inget ansikte) | tut-tut · puff | En traktor! En grön traktor! Tut-tut, nu kör vi! |
| 03 | 0:32.0–0:35.5 | A · Vägen · zoom in | zoom in i den ritade traktorn, som blir Lovas traktor på vägen; Lova sitter redan i den med sin gröna jacka. Vägen börjar glida, Pella långt bort på himlen | Lova `skrattar` → `glad` när vägen börjar glida | swoosh · putt, putt | (instrumentalt) |
| 03a | 0:35.5–0:38.8 | Närbild Lova | Lova vinkar till tittaren, en vinkning, och tittar framåt igen | Lova `glad` → `blinkar` | LOVA: Hej hej! | (instrumentalt) |
| 03b | 0:38.8–0:44.2 | Vägen · helbild | traktorn tuffar fram, skumpar en gång per "putt", vita puffar driver bakåt | Lova `glad` → `skrattar` på "putt, putt, putt" | putt ×3 | Leoparden kör sin gröna traktor, putt, putt, putt – på vägen här! |
| 04 | 0:44.2–0:50.1 | Närbild Lova | Lova tittar sig omkring och pekar sedan på tittaren, den gröna jackan syns | Lova `glad` → `nyfiken` på "letar grönt" → `ropar` på "jag och du!" | | leta med – jag och du! |
| 05a–h | 0:50.1–1:04.5 | Ärtrankan (refrang-plan 1–8) | vägen, en ärta ploppar ner bakom traktorn och växer till en jättestor ärtranka; traktorn åker upp på den, Gurra blir stor en stund, ärtskidan, lampan och flaggan växer fram på rankan en per ord; kritsvep hem | se Refrängen ovan | plopp · glidpipa upp på "väx" · tut, tut | Refräng |
| 06 | 1:04.5–1:12.4 | Vägen · helbild | Gurra hoppar över vägen, tre hopp, traktorn bromsar mjukt | Lova `nyfiken` på "Titta där!" → `forvanad` när Gurra hoppar fram → `skrattar` per hopp · Gurra `skrattar` i luften, `skelogd` när han landar på sista hoppet | hopp ×3 | Vad är grönt? (×3) Titta där! Grodan är grön – hopp, hopp, hopp! |
| 07a | 1:12.4–1:15.4 | Vägen · helbild | trafikljuset glider in och lyser rött (bara i bild); traktorn stannar | Lova `nyfiken` på "Titta där!" → `forvanad` när lampan syns | gnissel | Och vad är grönt? Titta där! Titta där! |
| 07b | 1:15.4–1:17.2 | Närbild Lova | tassen upp, sitter stilla, tittar upp på den röda lampan | Lova `nyfiken` (blicken upp mot lampan), håller still; på andra "vänta" en liten `blinkar` mot tittaren | | Vänta, vänta … (vänta, vänta …) |
| 07c | 1:17.2–1:21.3 | Vägen · helbild | pling, grönt; traktorn kör, Lova pumpar armarna | Lova `forvanad` på pling → `ropar` på varje "kör" | pling, putt | Pling! Lampan är grön – kör, kör, kör! |
| 08a | 1:21.3–1:30.5 | Närbild Lova | Lova tittar ner på jackan (ledtråd), kameran åker in | Lova `nyfiken` mot tittaren på frågan → `nyfiken` ner mot jackan i pausen | | Vad mer är grönt? Kan du se? Tick, tack … (paus ca 5 s) |
| 08b | 1:30.5–1:33.3 | Närbild Lova | pekar på jackan, sedan på flaggan | Lova `forvanad` på "Jackan" → `skrattar` på "flaggan med!" | | Jackan är grön … |
| 08c | 1:33.3–1:35.0 | Närbild Lova | drar upp dragkedjan i tre ryck | Lova `njuter` (stolt, ögonen stängda) per ryck → `blinkar` på sista "zipp" | zipp ×3 | Zipp, zipp, zipp! |
| 09a–h | 1:35.0–1:48.0 | Ärtrankan (refrang-plan 1–8) | refrängen igen, likadan | se Refrängen ovan | plopp · glidpipa upp på "väx" · tut, tut | Refräng |
| 10 | 1:48.0–1:51.3 | Kritsvep (gult) → Bondgården · helbild | traktorn kör in och stannar vid ladan. Pip och Gurra sitter på en liten träbänk vid ladväggen (Gurra har hoppat i förväg), en ärtplanta med skidor växer vid staketet. Lova hoppar lugnt ner ur traktorn och går till bänken; traktorn står kvar i kanten | Lova `glad` → `forvanad` när hon ser Pip och Gurra · Pip `nyfiken` → `skrattar` och vinkar · Gurra `blinkar` | swoosh · putt … tut · duns | vad är grönt? Titta ut! Vad är grönt? |
| 11a | 1:51.3–1:52.7 | Bondgården | Pip pekar på ärtplantan, kameran glider in mot skidorna | Lova `nyfiken` · Pip `blinkar` · Gurra `nyfiken` | | Titta där! (Titta där!) |
| 11b | 1:52.7–1:56.9 | Tvåbild (Gurra i kanten) | Pip plockar en skida från plantan och öppnar den: precis tre ärtor; hon pekar en per takt på Lova, sig själv och Gurra | Pip `ropar` på "en", "två", "tre" · Lova `forvanad` när skidan öppnas → `skrattar` · Gurra `forvanad` på "tre" | knäpp | Ärtorna är gröna – en, två, tre! |
| 11b2 | 1:56.9–2:01.0 | Tvåbild (Gurra i kanten) | Pip pekar med vingen på var och en, en per "en": Lova, sig själv, Gurra | Pip `karleksfull` · Lova `skrattar` · Gurra `skrattar` | | En, en, en … En till var och en! (En till var och en!) |
| 11c | 2:01.0–2:07.0 | Närbild Pip → tvåbild | mellanspelet (ca 16 s), första delen: Lova hälsar, Pip ger henne en ärta | Lova `glad` på "Hej" · Pip `ropar` på "Pip, pip!" → `karleksfull` på "Varsågod" | LOVA: Hej, Pip! · PIP: Pip, pip! Varsågod! · pling | (instrumentalt) |
| 11d | 2:07.0–2:12.0 | Tvåbild (Gurra i kanten) | Gurra får sin ärta, Lova tackar | Lova `karleksfull` på "Tack" · Gurra `skrattar` · Pip `karleksfull` | pling · LOVA: Tack! | (instrumentalt) |
| 11e | 2:12.0–2:17.0 | Tvåbild | alla tre håller upp sin ärta och tittar på den; Lova lyfter sin högst, så att den hoppar i 13a | Lova `njuter` · Pip `skrattar` · Gurra `blinkar` | | (instrumentalt) |
| 13a | 2:17.0–2:20.9 | Tvåbild | Lovas ärta hoppar ur tassen och studsar på golvet | Lova `forvanad` · Pip `forvanad` · Gurra `forvanad` | boing | Oj, oj! Ärtan hoppar! |
| 13b | 2:20.9–2:23.8 | Lågt utsnitt | ärtan rullar in under bänken, ett skutt per "rull" | (ärtan har inget ansikte) Lova `nyfiken` efter ärtan, kant i bild · Pip `skelogd` när den försvinner under bänken | rull ×3 | Rull, rull, rull … in under bänken |
| 13b2 | 2:23.8–2:27.2 | Tvåbild | Pip och Gurra håller upp sina två ärtor, Lova har tom tass | Pip `nyfiken` på "en, två" → `forvanad` på "vi är tre" · Gurra `forvanad` · Lova `forvanad` på sin tomma tass | | En, två – men vi är tre! |
| 13c | 2:27.2–2:29.7 | Närbild Lova | ledsen, en liten tår | Lova `ledsen` (en liten tår), den enda ledsna bilden | snyft | Leoparden är ledsen |
| 13d | 2:29.7–2:35.2 | Närbild Lova | Lova tittar på tittaren | Lova `nyfiken` mot tittaren → `forvanad` på "tick, tack" (väntar på svaret) | | Vem kan hjälpa? (Vem kan hjälpa?) Tick, tack … |
| 14a | 2:35.2–2:38.9 | Lågt utsnitt | Pip hoppar ner och trillar mjukt på rumpan, lugnt | Pip `ropar` på "Kycklingen!" → `forvanad` när hon trillar (O-mun, "oj!") · Lova `forvanad` | duns | Kycklingen! Hoppar ner – oj, hon trillar! |
| 14b | 2:38.9–2:41.0 | Lågt utsnitt | Pip reser sig själv och pickar direkt fram ärtan under bänken | Pip `skrattar` när hon är uppe → `nyfiken` per pick → `forvanad` när ärtan kommer fram | pick ×3 | Upp igen – pick, pick, pick! |
| 14c | 2:41.0–2:43.1 | Tvåbild | Pip ger ärtan till Lova, Lova vinkar tack | Lova `karleksfull` per "tack" · Pip `karleksfull` | | Här är ärtan – tack, tack, tack! |
| 14d | 2:43.1–2:44.7 | Tvåbild (Gurra i kanten) | alla tre håller upp sin ärta: nu räcker det igen | Lova, Pip och Gurra `karleksfull` → `skrattar` på "alla tre!" | | En ärta var – till alla tre! |
| 14e–f | 2:44.7–2:47.2 | Tvåbild | alla tre äter | alla `slickar` på "mums" ×3 → `njuter` på "hurra" (Pip `skrattar`) | mums | Mums, mums, mums – hurra! |
| 14h | 2:47.2–2:52.5 | Bondgården · närmare helbild | slutögonblicket, båda "Grönt! Nu kör vi!": Lova står kvar vid bänken, Pip håller upp den tomma gröna ärtskidan högt som ett grönt ljus (pling), alla pekar framåt; den tomma traktorn står parkerad utanför bild | Lova, Pip och Gurra `ropar` | pling | Grönt! Nu kör vi! Grönt! Nu kör vi! |
| 15a–e | 2:52.5–3:01.6 | Disco (mint) | alla dansar; Gurra hoppar, Kajsa vickar (skällan), Fia flyger runt | alla `skrattar` på "Danspaus!" · Gurra `ropar` på "Hoppa" → `skrattar` · Kajsa `skelogd` när skällan plingar → `skrattar` · Fia `njuter` när hon flyger runt · alla `ropar` på "grön dans!" | pling | Danspaus |
| 16a | 3:01.6–3:09.5 | Disco | grodan, lampan, ärtorna, traktorn på vita kritskivor, flyger upp i raden runt kulan | Lova `forvanad` per sak som flyger upp → `ropar` på "gröna!" (Gurra på skivan `blinkar`) | | Grodan, lampan, ärtan – gröna! *(Gröna!)* |
| 16b–c | 3:09.5–3:16.0 | Disco | Lova står i mitten (ingen traktor i discot), Pip och Gurra bredvid; på "Väx, väx!" växer kritskivorna två snäpp, sedan styra i luften två gånger per "Traktor, traktor" | se Sista refrängen ovan | glidpipa upp | Grönt får allt att växa! *(Väx, väx!)* Traktor, traktor – *(putt, putt!)* ×2 |
| 16d | 3:16.0–3:26.0 | Disco · dansbild | kvar i discot, raden av småbilder ligger kvar överst: Lova står i mitten och vinkar (ingen traktor i discot); Pip och Gurra vinkar bredvid | Lova `karleksfull` och vinkar · Pip `skrattar` → `karleksfull` · Gurra `blinkar` | putt, putt | Hej då, hej då – putt, putt! (och outrots första del, "putt, putt" viskas) |
| 17 | 3:26.0–3:34.0 | Avslutning · åkern (vägen blir en åker, i kod) | outrot (instrumentalt): kritsvep (brunt) från discot. Lova kör traktorn över den bruna åkern, ärtplantorna växer upp i fårorna bakom henne i takt, Pip och Gurra dansar i åkerkanten | Lova `skrattar` | skrrrrt · putt, putt · plupp ×4 | – |
| 17b | 3:34.0–3:37.4 | Avslutning · kritiris | kritirisen sluter sig runt Lova i traktorn, håller, stängs, en stjärna glimtar, svart | Lova `skrattar` → `blinkar` precis innan cirkeln stängs | swoosh · outrot tonas ut | – |

## Tagningen

**Refrängen är omskriven 2026-11-06 (Ärtrankan, Suno version 3).** Vers 1, refrängen, trafikljuset och sista refrängen har ny text, så sången behöver en ny tagning. Tiderna i tabellen och punkterna nedan gäller den gamla tagningen (version 2) och räknas om från den nya `rader.txt`.

- Gissningspausen är ca 5 s och frågepausen ca 5 s, båda med "tick, tack", som regeln vill. Inga instrumentala takter behöver läggas in.
- Efter "Vem kan hjälpa?" är barnets tur ca 2,5 s (2:21.6–2:24.2 sångtid), kort men det räcker att ropa "Kycklingen!".
- Mellanspelet efter "En till var och en!" är ca 16 s (1:50–2:06 sångtid) i stället för 2 takter. Det blir luckan vid bänken: 11c–11e.
- Suno har lagt till fler "Vad är grönt?" vid grodan, ett "Och vad är grönt? Titta där!" före trafikljuset och ett andra "Grönt! Nu kör vi!". Bilderna följer tagningen, sången klipps aldrig.
- Outrot är ca 19 s: 16d håller vinkningen till 3:26.0, åkern (17) och kritirisen (17b) tar de sista 11,4 s.
- Lyssna på "Grönt betyder kör!" (0:41.6 och 1:27.4 sångtid), där Whisper hör ordet otydligt.
