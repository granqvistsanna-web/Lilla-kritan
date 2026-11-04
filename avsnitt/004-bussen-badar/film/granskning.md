# Granskning av avsnitt 004 · Vi ska bada!

Byggd 2026-11-04 med `film/satt-ihop.sh` efter att alla renderingar var klara. `avsnitt-004.mp4` är 3:36 lång och har inget outro.
Delarna i filmen: intro 0:00–0:11,3 · kritan ritar –0:35,1 · körscen 1 –1:38,5 · körscen 2 –2:37,7 · körscen 3 –2:48,3 · scen B –3:36,3.
Granskat med stillbilder var 0,5 s genom hela filmen, 5–6 per sekund runt klippen, och ljudnivån per del och per halvsekund.

## Fel

1. **1:38–2:48, körscen 2 och 3: solen försvinner.** Den syns hela vägen genom körscen 1 och är borta från refräng 2 och framåt, fast det är samma väg och samma dag. Lägg till `kor.sol()` i korscen-2 och korscen-3 (just nu anropas den bara i korscen-1).
2. **2:55–3:20, scen B: klippen kommer för tätt för formatet.** Det är 10 närbilder på 33 s, och helbilden mellan dem står bara 0,6–1,2 s (3:00,4→3:01,6, 3:03,1→3:03,7, 3:05,9→3:06,9 och 3:08,8→3:09,9), vilket bryter mot snittet på minst 3 s per bild i `regler.md`. Slå ihop de två fotnärbilderna (tårna och fötterna) till en och låt helbilden stå minst 2,5 s mellan närbilderna (b-badplatsen, `BILD`/kameratiderna).
3. **0:33,5–0:34,5, kritan ritar → körscen 1: övergången är en toning, inte en zoom in.** Solen krymper på papperet och sedan tonas vägen in, så att det ser ut som en zoom ut med toning, och toning är inte en tillåten övergång. Zooma in mot solen tills den landar som solen på himlen, som manus säger (kritan-ritar).
4. **1:15,5–1:18, körscen 1: traktorn krockar med bussen.** Traktorn står i bussens nos och kör sedan bakom den, och vid 1:16,5 sticker den blå hytten upp ovanför bussens tak. Lägg åkern med traktorn längre bak (högre upp i bilden) eller låt den passera innan bussen kommer dit (korscen-1).
5. **1:16,5–1:17,5, körscen 1: solen ligger framför äppelträdets krona.** Solen ritas i figurlagret, så trädet glider bakom den. Lägg solen i ett lager bakom sakerna vid vägen (`kor.sol` i kor.js).
6. **2:51–3:36, scen B: bussens dörr står öppen resten av scenen.** Den är öppen också när bussen backar ut (2:53) och kör fram igen (3:18), och det går emot "fordon som stannar, öppnar dörren … som riktiga". Stäng dörren med ett *pschhh* när grodan och ankan har hoppat ut (b-badplatsen).
7. **0:35–2:15, scen A: replikerna i manus finns inte i filmen.** BUSSEN "Tuta-tut! Vi ska bada!", GRODAN "Kväk-kväk! Jag vill bada!" och ANKAN "Kvack-kvack! Jag vill bada!" hörs bara som läten, med munrörelser. Spela in replikerna, eller skriv in i manus att A också bara har läten, som B.
8. **2:42,6–2:48, körscen 3 → B: manus och storyboard säger rakt klipp, men filmen har kritsvep.** Enligt storyboard 17a ska badplatsen glida in medan grodan och ankan tittar ut, men i filmen kör bussen in efter svepet. Filmen följer `regler.md`, så uppdatera manus (checklistans ⚠️-rad) och storyboard 17a–18 så att de stämmer med filmen.
9. **3:36, slutet: outrot saknas.** Filmen slutar på papperet i regnet och tonas ut till tystnad. Lägg in outrot (bild 23, ca 10 s) i `satt-ihop.sh` när det är klart.

## Förbättringar

1. **2:15,5–2:23,5, körscen 2: räknepausen är nästan tyst.** Den ligger på −30 till −36 dB mot −19 dB i sången, eftersom inlägget bara är bas under 200 Hz, och på en surfplatta eller telefon blir pausen därför helt tyst. Lägg de två marimbatonerna (eller tydliga *pling*) på vinkningarna och låt lite av mellanregistret i den hållna tonen vara kvar (sang.m4a och ljudet i korscen-2).
2. **3:01,6 och 3:09,9, scen B: ankans närbilder (kamera 3) är egentligen tvåbilder.** Ankan står framför grodan och täcker halva honom, så det är svårt att se vem man ska titta på. Ställ dem isär innan zoomen, eller beskär så att bara ankan syns (b-badplatsen).
3. **3:29–3:34, scen B: hej-då-vinkningarna syns knappt.** Grodan och ankan sitter i vattnet med små armar, och bussen vinkar inte, så barnet har svårt att vinka tillbaka. Låt dem i tur och ordning studsa upp och vinka stort, med en tydlig paus på ca 1 s emellan, och låt bussen gunga eller blinka med lyktorna på sitt *tuta-tut* (b-badplatsen).
4. **2:42,6–2:44,3, körscen 3: "Titta, där är badplatsen!" sjungs medan bilden är överkritad.** Barnet ser blå kritstreck när sången säger "titta". Starta svepet en takt tidigare så att badplatsen syns på "Titta" (korscen-3).
5. **1:11,5, 1:45 och 2:35,5, refrängerna: närbilden på hjulet är nästan likadan som tut-närbilden.** Utsnittet flyttas bara lite, så "hjulen snurrar runt, runt, runt" visar inte tydligt vad som snurrar. Zooma in tätt på framhjulet så att det fyller halva bilden (refrang.js, klipp d).
6. **2:53–3:18, scen B: bussen står med halva ansiktet utanför bildkanten i ca 25 s.** Det ser ut som ett beskärningsfel. Backa ut den helt eller låt hela nosen med båda ögonen synas (b-badplatsen, `BUSS_UT`).
7. **0:43–0:58, körscen 1: ofta tre saker i rörelse samtidigt.** Hus, blommor, Fia och flygplanet kommer tätt, mot regeln "en sak i taget". Glesa ut sakerna vid vägen medan Fia och planet är i bild (korscen-1).
8. **0:51–0:59 och 2:38–2:43: flygplanet kommer två gånger.** Manus har planet bara i körvers 3. Ta bort det ur körscen 1 så att det blir nytt i slutet, eller skriv in det i manus (korscen-1).
9. **2:44–3:36, körscen 3 och scen B: badplatsens sol ser annorlunda ut** (senapsgul med tunna strålar och utan ansikte) än kritans sol med ansikte i A. Använd `kritan-ritar/sol.js` även där, så att det är samma sol hela avsnittet (korscen-3, b-badplatsen).
10. **Ljudnivå, scen B: −19,2 LUFS mot −15,5 till −16,5 i körscenerna.** Badplatsen känns fortfarande tystare efter klippet, med en dipp till −28 dB vid 2:48. Höj B ca 2–3 dB till i `satt-ihop.sh` (raden `G=",volume=7dB…"`) och låt bädden tonas in på 0,4 s i stället för 1 s.
11. **0:08,5–0:11, introt: 2,5 s nästan tystnad** (−50 till −75 dB) efter jingeln, där fladdret och svischet knappt hörs. Höj dem (volymen i introdelen av `satt-ihop.sh`), eftersom det är här små barn tappar intresset.
12. **0:11,3–0:12,5, kritan ritar: ca 1 s tomt papper innan kritan syns.** Låt kritan ligga på papperet redan när kortet har zoomat färdigt, så att det alltid finns något att titta på (kritan-ritar).

## Det här fungerar

- Klippen mellan delarna vid 0:35,1, 1:38,5, 2:37,7 och 2:48,3 är sömlösa: bussen, solen och fönstren står på samma ställe på båda sidor av klippet.
- Dörren öppnas på "Hej, hej, grodan/ankan", kompisen kliver på på "hopp" och vinkar på "hej, hej, hej", och räknesiffrorna "1" och "2" kommer på "En – och två!". Allt ligger inom ett par tiondelar av orden i `rader.txt`.
- Kamerainställningarna håller sig till de 6 i manus. Badets 1,7× zoom (3:12–3:18) räknas som en zoom in på helbilden.
- Platser, figurer och statister följer `regler.md`, och längden utan outro (3:36) stämmer med manus.
