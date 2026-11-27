# Avsnitt 064 – Vintern i boken (plan)

**Status:** ✅ grind 1 (manus) godkänd av Sanna 2026-11-27 (*"Ja, grind 1 godkänd för 064"*). ✅ Grind 2 (kritans teckningar) godkänd 2026-11-27 (*"Ja, tagning 1"*): pannbandets kontur och en skarpare snöflingekontur, kontrollbild i `grind2/konturer.jpg` (se `bildlista.md`). Inga nya Flow-bilder: granens snö och det kala trädet görs i kod (Sanna 2026-11-27 *"Snö i kod"*, *"draw in code"*), trädet i `prov/trad/trad.js`, provbild `prov/trad/stills/0.jpg`, ✅ godkänt av Sanna 2026-11-27 (*"Ja, trädet är bra"*). ✅ Grind 3 (rösten) godkänd 2026-11-27 (*"De låter bra"*, rad 11 och 16 behålls): Sannas tagning 1 (`produktion/ljud-original/roster/064/malin-tagning-1.mp3`, 117 s) delad i 43 filer i `assets/ljud/roster/vintern-i-boken/`, −3 dBFS, längderna under replikblocket. ✅ Grind 4 (ljuden) godkänd av Sanna 2026-11-27 (*"Ja, grind 4 godkänd"*): bara befintliga ljud, kaninens val per uppslag i `ljud-effekter.md`, provlyssning i `ljud/provlyssna-kanin.m4a`. ✅ Grind 5 (animatiken) godkänd av Sanna 2026-11-27 (*"Ja, grind 5 godkänd"*): [`storyboard/`](storyboard/storyboard.md), 40 bilder, 3:20,6 med loggan, `storyboard/animatik.mp4` (Malins tagning, kaninens och effekternas ljud på sina tider, orden mätta med whisper, `vinterljud-2` under), också på feedbacksidan. Sannas polering 2026-11-27: **pannbandet** från 039 i stället för mössan, och kaninen vill göra en **snögubbe** (*"Ska du göra en snögubbe?"*), så snöbollarna leder fram till den. Andra avsnittet i **Kritans bok** ([`format/kritans-bok.md`](../../format/kritans-bok.md), temabladets rad **Vinter**). Förlagan är [062 Sommaren i boken](../062-sommaren-i-boken/manus.md). Ingen sång. Malin pratar med kaninen, och kaninen svarar med sina pip, öron och små skutt. Inget är byggt, inga bilder, ljud eller röster är gjorda. Det som behövs till grind 2 står i [`bildlista.md`](bildlista.md).

| | |
|---|---|
| **Titel** | Vintern i boken (avsnitt 64) |
| **Pärm och siluett** | **blå pärm** (förslag `#3F7FC4`, kallare än 062:s orange), **snöflingan** (`assets/rekvisita/snoflinga/cut/snoflinga.png`) som siluett: `skapaBok(scen, { farg: '#3F7FC4', figur: '…/snoflinga.png' })` |
| **Figurer (1)** | **Kaninen** ([`karaktarer/kaninen-kanel.md`](../../karaktarer/kaninen-kanel.md), ✅ referensark klart, rörs inte), v2-rigg i `assets/karaktarer/kaninen-kanel/premium/uttryck.html`. Riggen ritas på kaninens kort som Kanel i `produktion/three-rum/lekrummet/` och grodan i 062. Det platta `popupbok/bilder/kanel.png` finns för animatiken |
| **Platser (1)** | **Vinteruppslaget i Kritans bok**: skrivbordet med boken, och inne i boken vinterhimlen på pärmen, kullarna, två granar till vänster, ett kalt träd med tre fåglar till höger och ett öppet snöfält i mitten där kaninen rullar snöbollarna. Inget platsbyte |
| **Saker som finns** | se *Uppslaget* nedan: molnen, kullarna, granen, snöflingan, pannbandet, snöbollen, snötussen, snögubben och de tre småfåglarna finns redan |
| **Nya bilder (Flow)** | inga. Det kala trädet (`prov/trad/trad.js`), snön på granarna, kullarna och trädet, himlen, snöfallet, spåren, andedräkten och fåglarnas delar ritas i kod (Sanna 2026-11-27: *"consider what can be drawn in code"*), se *Ritas i kod* i [`bildlista.md`](bildlista.md) |
| **Kritans två teckningar** | **snöflingan** på himlen (ny skarpare kontur: `snoflinga-kontur-skarp.json`) och **pannbandet** från 039 på snön bredvid kaninen (urklippet `pannband.png` finns, konturen görs med `verktyg/kontur.py` i grind 2) |
| **I kod** | snöfallet som lägger sig **på** sidan, marken som blir vit, frosten på öronspetsarna och andedräkten (små vita moln), spåret efter snöbollen, snöbollen som rullar och växer, fåglarnas ögon, vingar och näbbar (`avsnitt/043-grisen-matar-faglarna/fagel.js`), skimret, bokens öppning och stängning |
| **Musik** | ingen ny musik. `vinterljud-2` (CC0) lågt under hela scenen |
| **Kärna** | Boken öppnas och det är vinter, men snön saknas. Kritan ritar en snöflinga, och snön faller tills allt är vitt. Kaninen kommer upp i snön: *"Hej, kaninen!"* Kaninen vill leka i snön, men snön landar på öronen och de blir kalla. Kritan ritar ett pannband: *"Varsågod!"* – *"Tack, kritan!"* Öronen ploppar upp ur pannbandet, men bara ett först. Kaninen vill göra en snögubbe och rullar tre snöbollar: *"Rulla, rulla … snöboll!"* Snö från granen landar på huvudet. Det piper i trädet, och barnet säger fåglarna: en röd, en blå och en gul. Av de tre snöbollarna blir det en snögubbe. Hej då, och boken stängs. |
| **Samtal** | Malin frågar kaninen, kaninen svarar med pip i pausen, Malin reagerar kort som om hon förstått. Raderna markerade ✱ |
| **Barnet** | gissar fyra gånger (snöflingan, pannbandet, vem som piper, vad snöbollarna blir), lär sig att snön är vit, kall och knarrar, kall och varm, stor/mellan/liten, räknar till tre och säger fåglarnas färger. Se *Gissa, lära, lugnt* |
| **Favoriter** | 🐰 kanin · ❄️ snö · ☃️ snögubbe · 🐦 fåglar |

## Uppslaget

Samma struktur som 062: himlen och molnen på pärmens insida, kullarna längst bak, träden, och korten fram. Marken är 062:s markark i `kritYta`, men byter färg från frostgrönt till snövitt.

| Kort | Bild | Finns? |
|---|---|---|
| Himlen (pärmens insida) | `popupbok/bilder/himmel.png` med kallare ton i kod (blekare blå, lite grå) | finns. Ny vinterhimmel i Flow bara om koden inte räcker |
| Molnen | `popupbok/bilder/moln-stor`, `moln-mellan`, `moln-liten` | finns |
| Kullarna, utan snö | `popupbok/bilder/kulle-bak.png`, `kulle-fram.png` med frostig ton i kod (gråare, mindre mättat grönt) | finns |
| Kullarna, med snö | snövit kritduk maskad med kullkortets egen alfa, växer in uppifrån och ner | **kod** |
| Granarna (två, till vänster) | `assets/bakgrunder/skogen-gron-saker/gran.png` (062:s gran) | finns |
| Granarna med snö | snökuddar i kod på `gran.png`, en per våning | **kod** (Sanna 2026-11-27 *"Snö i kod"*: alla fyra Flow-tagningarna ritade om granen med fler våningar, se `bildlista.md`) |
| Det kala trädet (till höger) | `kaltTrad()` i `prov/trad/trad.js`: lövträd utan löv, tre tjocka nästan vågräta grenar där fåglarna sitter (`sittplats(i, sno)`) | **kod** (Sanna 2026-11-27 *"draw in code"*) |
| Det kala trädet med snö | `kaltTrad({ sno })`: snökuddar längs grenarnas ovankant och tussar på kvistarna, växer med `sno` 0–1 | **kod** |
| Fåglarna i trädet | `assets/rekvisita/smafaglar/cut/fagel-kropp-rod|bla|gul-kod.png`, vinge, näbb, ben och öga i kod med 043:s `fagel.js` | finns (043) |
| Snöflingan (teckning 1, och pärmens siluett) | `assets/rekvisita/snoflinga/cut/snoflinga.png` + `snoflinga-kontur-skarp.json` | finns, skarpare kontur gjord i grind 2 |
| Pannbandet (teckning 2) | `assets/rekvisita/pannband/cut/pannband.png` (bågen, 894 × 636) att rita och fylla. På huvudet ritas det i kod som i 039 (`pannband_kod()`, rakt band över huvudet) | finns, `pannband-kontur.json` gjord i grind 2. Tagning 1, vald av Sanna 2026-11-27 |
| Snöbollarna (tre, stor, mellan, liten) | `assets/rekvisita/snoboll/cut/snoboll.png` i tre storlekar | finns |
| Snön som ramlar från granen | `assets/rekvisita/snotuss/cut/snotuss.png` | finns |
| Snögubben (sista saken) | `assets/rekvisita/snogubbe/cut/snogubbe.png` | finns |
| Kaninen | v2-riggen på kortet, `popupbok/bilder/kanel.png` i animatiken | finns |

**Placering (förslag):** granarna till vänster, trädet med fåglarna till höger (fåglarna syns från början, utspridda på tre grenar, inte i en rad där de skymmer varandra), snöfältet i mitten. Kaninen poppar upp i mitten, snöbollarna rullas från mitten åt vänster mot granarna, och snögubben poppar upp där bollarna ligger. Boken fyller bilden inne i boken, inga kanter eller bord syns (062 runda 5).

## Så rör det sig

Alla rörelser börjar före Malins replik (0,4–0,8 s in eller när de har landat), utom frågorna, som kommer först. Kameran glider mellan närliggande vyer och klipper när platsen i boken byts. Alla kort är platta urklipp med vit kant och kontaktskugga som fälls upp och ner kring sin fot.

| Rörelse | Hur |
|---|---|
| Boken öppnas | som 062: kameran driver lugnt mot den blå boken med snöflingan, pärmen slås upp (0,9 s), korten fälls upp bakifrån och fram (ca 0,8 s), kaninens kort ligger kvar nedfällt. `prassel-tyg` |
| Vinter utan snö | himlen blek och kall, kullarna frostigt grågröna, granarna och det kala trädet utan snö, marken frostgrön. Molnen glider sakta |
| Kritan ritar på himlen | kritan (via `verktyg/kritan-ritar.js`, × 1,25 i närbild) ritar snöflingans kontur: mitten och de sex armarna, sidogrenarna som detaljstreck. Gisspaus 3 s, kritan svajar. Snöflingan fylls i inifrån, `glitter`, `tindra` |
| Snön faller | små platta vita krit-flingor (kod) faller långsamt och vajar, landar **på** marken och på kortens överkanter och smälter in i snötäcket. Marken tonas från frostgrönt till snövitt nerifrån och upp, på kullarna, granarna och trädet växer snön in i kod uppifrån och ner (ca 4 s). Lätt snöfall resten av avsnittet, glesare. `vinterljud` växer lite |
| Kaninens kort fälls upp | i mitten av snöfältet, med en liten efterstudsning, `pop`. Kaninen vinkar (armen bakom kroppen, snett ut förbi kanten) |
| Glädjeskutt | två små skutt på stället, små snöpuffar vid fötterna (kod), `knarr-sno` |
| Kalla öron | några flingor landar på öronspetsarna och ligger kvar. Öronen sjunker lite, spetsarna blir frostblå (kod), en liten lugn huttring (±1,5 px), andedräkten blir små vita moln. Malin säger det efter att flingorna har landat. Inget ledset, bara lite besvärad min |
| Kritan ritar på snön | samma som på himlen, pannbandet på snön bredvid kaninen: bågen som kontur, ribborna och den ljusa randen som detaljstreck. Gisspaus 3 s. Pannbandet fylls i, kortet fälls upp med ett `pop` |
| Pannbandet på | kortet fälls ner, pannbandet glider i en båge ner över kaninens öron som i 039: öronen trycks ihop under bandet. Lagren kropp → öron → pannband, så bandet ligger framför öronens rötter (ingen maskning). Flingorna på öronen faller av |
| Bara ett öra | **På första "Plopp!"** ploppar vänster öra upp ur bandet. Det högra stannar under. Kaninen tittar upp mot det (`rikt` uppåt), vickar lite på huvudet. **På andra "Plopp!"** kommer det högra upp. `pop` litet per öra, kaninen fnissar |
| Varm igen | frosten på spetsarna tonas bort, öronen reser sig, andedräkten stannar. Kaninen blundar glatt (raden ber om det) |
| Rulla, rulla … snöboll | kaninen i riktningsposen (figuren speglas aldrig) med båda raka armarna framåt mot bollen. Bollen rullar framför kaninen (bollen roterar, den är rund) och växer, kaninen går bakom, ett mjukt spår syns i snön. **På "snöboll"** stannar bollen, `sno-duns` mjukt. Tre gånger: stor, mellan, liten, på rad mot granarna. `rull`, `knarr-sno` |
| En, två, tre | varje boll studsar lite och glimtar på sitt räkneord, `glimt` |
| Snö på huvudet | kaninen står vid granen. En snötuss glider av en gren och landar **ovanpå** huvudet mellan öronen, `sno-duns`. Kaninen tittar i kors upp mot den, skakar lugnt på huvudet (±4°), tussen faller ner bredvid på snön. Fniss |
| Det piper | fåglarna har suttit i trädet hela tiden. Närbilden på kaninen visar inte trädet: det piper (`fagel-pip`), kaninens öron vänds lite mot ljudet, gisspaus 3 s med ett pip till. Sedan glider kameran lugnt till trädet, där näbbarna öppnas |
| Fåglarna sägs | närbild på trädet. Varje fågel lyfter vingen, piper, studsar och glimtar **på sitt färgord** (röd, blå, gul) |
| Fåglarna säger hej | kaninen skuttar lugnt till trädet, tittar upp, vinkar. Fåglarna piper i tur och ordning |
| Snögubben | tre bollar på rad, gisspaus 3 s där bollarna glimtar svagt. **På ordet "snögubbe"** fälls bollarnas kort ner och snögubbens kort fälls upp på samma plats, `pop`, `glitter`. Kaninen klappar |
| Hej då | en kort bild per sak: kaninen vinkar (närmare vy, armen högre, tydligt vift), snöflingan på himlen glimtar, fåglarna lyfter vingarna, snögubben studsar lite. Varje sak glimtar på sitt ord |
| Boken stängs | kameran glider ut. Korten fälls ner framifrån (kaninen först), pärmen slås igen, snöflingan syns. `prassel-tyg`, `landa-mjuk` |

**Inget går genom något:** snöflingorna landar **på** sidan, marken, kortens överkanter och öronen, och försvinner in i snötäcket, aldrig genom papperet. Pannbandet ligger framför öronens rötter, öronen står fria ovanför (lager, inget klipp genom kroppen). Snöbollen rullar **på** snön, inte i den. Snötussen landar ovanpå mössan och faller ner bredvid kaninen. Fåglarna sitter **på** grenarna. Korten fälls ner åt samma håll, pärmen slås igen först när allt ligger platt. Täta bilder (6 per sekund) i QA runt raderna 01b, 05–05b (snön lägger sig), 06, 07 (flingorna på öronen), 09, 11–12b (pannbandet och öronen), 15–15c (bollarna), 17 (snötussen), 18–19 (kameran till trädet), 20, 22 och 26.

## Gissa, lära, lugnt (Sanna 2026-11-27)

*"Make sure there are some guessing element and some pedagogic touches, and calm."*

**Gissa (fyra gisspauser på 3 s, svaret kommer efter pausen):**
1. Kritans första teckning, snöflingan (rad 03): *"Hm … vad blir det nu?"*
2. Kritans andra teckning, pannbandet (rad 08): *"Titta, kritan ritar något."*
3. Ett ljud innan man ser vem som låter (rad 18): det piper medan kameran är på kaninen, *"Vem är det som piper?"*, sedan glider kameran till trädet. Fåglarna är inte gömda: de syns i helbilderna från början och sitter kvar på samma grenar, de är bara utanför närbilden en stund.
4. Vad snöbollarna ska bli (rad 21): *"Tre snöbollar … vad ska det bli av dem?"* Barnet minns kaninens snögubbe från rad 14.

Aldrig *"Vad kan det vara?"*, och inget är gömt.

**Lära, en gång var, och bilden visar det:**
- **Snön är vit och kall** (05b): marken blir vit medan Malin säger det.
- **Snön knarrar** (06c): kaninens steg knarrar och lämnar spår.
- **Kall och varm** (07–13): frostblå öronspetsar och huttring, sedan *"nu är öronen varma igen"* när frosten tonas bort.
- **Stor, mellan, liten** (16): varje boll glimtar på sitt ord.
- **Räkna till tre** (16b): varje boll studsar på sitt tal.
- **Färgerna** röd, blå, gul (19b): en fågel i taget.

**Lugnt:**
- Snön faller långsamt och glest (ca 0,4 flingor per sekund i bild i halvbild, fallhastighet ca en sidhöjd på 8 s, vajar mjukt), också när marken blir vit (05b, ca 5 s).
- `GLES` 1,0 s (062: 0,9), gisspauserna 3 s orörda, inga snabba klipp: kameran glider mellan närliggande vyer.
- Kaninen rör sig lugnt: små skutt, lugna steg, inga studsar. Pannbandet glider ner på ca 1 s.
- Mattan `vinterljud` mjukt och lågt (ca 0,25) hela scenen, inget som tutar eller smäller. `sno-duns` och `pop` mjuka.
- Malins repliker är mest påståenden med punkt och taggarna `[warmly]`/`[softly]`. Utrop bara där något händer (*"Plopp!"*, *"Rulla, rulla … snöboll!"*, *"Ja, en snögubbe!"*, hej och hej då), aldrig två utropsrader i rad utom tacket efter *"Varsågod"*.

## INTRO

Lilla Kritans logotyp 1 s, sedan skrivbordet med den stängda blå boken. Inget *"Djuren hittar på!"*-kort och inget ritintro på papper: boken är introt, som i 062.

## BOKEN

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01a | Helbild, skrivbordet: den stängda blå boken med snöflingan, kameran driver lugnt mot den | Titta! En bok. | `vinterljud` lågt, `glimt` |
| 01b | Pärmen slås upp, korten fälls upp, kameran glider in | Oj, det är vinter i boken. | `prassel-tyg`, `pop` mjukt |
| 02 | Halvbild mot himlen och kullarna: allt är frostigt och kalt, molnen glider | Det är kallt. Men var är snön? | – |
| 03 | **Gissa 1.** Kritan kommer in och ritar snöflingans kontur på himlen, svajar sedan | Kritan ritar … *(paus)* Hm … vad blir det nu? *(gisspaus 3 s)* | `krita-ritar` |
| 04 | Snöflingan fylls i och glimtar | En snöflinga. | `glitter`, `tindra` |
| 05 | Helbild: snön börjar falla, långsamt och glest | Titta, det snöar. | `vinterljud` lite starkare |
| 05b | Samma: marken blir vit, kullarna, granarna och trädet får snö (ca 5 s, lugnt) | Snön är vit och kall. | `tindra` svagt |
| 06 | Halvbild, kaninens kort fälls upp i snön. Kaninen vinkar | Hej, kaninen! Hej, hej! | `pop`, pip hej |
| 06b ✱ | Samma, kaninen tittar runt på snön och sedan på oss. **Pausen:** förtjust pip, två små skutt | Tycker du om snön, kaninen? *(paus: förtjust pip, skutt)* Jaså, du vill leka i snön. | förtjust pip |
| 06c | Halvbild: kaninen går några lugna steg, små fotspår syns i snön. Malin efter de första stegen | Knarr, knarr. Snön knarrar när du går. | `knarr-sno` per steg |
| 07 | Närbild: flingor landar långsamt på öronspetsarna, öronen sjunker, spetsarna blir frostblå, andedräkten syns | Snön landar på öronen. | `brr` |
| 07b ✱ | Samma, kaninen huttrar lite och tittar på oss. **Pausen:** brr, nick | Fryser du om öronen? *(paus: brr, nick)* Hm … vad gör vi nu? | frågande pip |
| 08 | **Gissa 2.** Kritan kommer in och ritar ett pannband på snön bredvid kaninen (nära bild), svajar | Titta, kritan ritar något. *(gisspaus 3 s)* | `krita-ritar` |
| 09 | Pannbandet fylls i, kortet fälls upp. Kaninen ser det, stora glada ögon | Ett pannband! Varsågod, kaninen. | `glitter`, `pop`, förtjust pip |
| 10 | Närbild, kaninen nickar | Tack, kritan! | `kanin-tack` |
| 11 | Halvbild: pannbandet glider lugnt ner över öronen, flingorna faller av | Kaninen tar på sig pannbandet. | `swoosh` mjukt |
| 12 | Närbild: på första *"Plopp!"* kommer ett öra upp ur bandet, det andra stannar under. Kaninen tittar upp mot det | Plopp! … Oj, bara ett öra. | `pop` litet, frågande pip |
| 12b | Samma: på *"Plopp!"* kommer det andra örat upp | Plopp! Där kom det. | `pop` litet, fniss |
| 13 ✱ | Närbild, frosten tonas bort, öronen reser sig, kaninen blundar glatt. **Pausen:** mysig suck | Är det skönt med pannbandet? *(paus: mysig suck)* Mmm, nu är öronen varma igen. | `mmm` |
| 14 ✱ | Halvbild över snöfältet. Kaninen tittar på snön | Ska du göra en snögubbe? *(paus: förtjust pip, nick)* Ja, en stor! | förtjust pip |
| 15 | Halvbild: kaninen rullar en boll, den växer till den stora och stannar på *"snöboll"* | Rulla, rulla … snöboll! | `rull`, `knarr-sno`, `sno-duns` |
| 15b | Samma, en mellanstor boll bredvid | Rulla, rulla … snöboll! | `rull`, `sno-duns`, glatt pip |
| 15c | Samma, en liten boll bredvid | Rulla, rulla … snöboll! | `rull`, `sno-duns`, `jippi` |
| 16 | Halvbild, de tre bollarna på rad. Varje boll glimtar **på sitt storleksord** | En stor, en mellan och en liten. | `glimt` per boll |
| 16b | Samma. Varje boll studsar lite **på sitt räkneord** | En, två, tre snöbollar. | `glimt` per boll |
| 17 | Närbild vid granen: en snötuss glider av grenen och landar på huvudet. Kaninen tittar i kors upp, skakar lugnt på huvudet, tussen faller | Hoppsan! Snö på huvudet. | `sno-duns`, fniss |
| 18 | **Gissa 3.** Samma närbild på kaninen, trädet är utanför bilden. Det piper två gånger, kaninen lyssnar med öronen. Gisspaus 3 s, ett pip till mitt i | Vem är det som piper? *(gisspaus 3 s)* | `fagel-pip` ×3, frågande pip |
| 19 | Kameran glider till trädet: fåglarna sitter där de suttit hela tiden och lyfter vingarna | Det är fåglarna! De sitter i trädet. | `glimt`, förtjust pip |
| 19b | Närbild på trädet. Varje fågel piper, studsar och glimtar på sitt färgord, en i taget med luft emellan | En röd fågel. En blå fågel. Och en gul fågel. | `fagel-pip` + `glimt` per fågel |
| 20 | Halvbild: kaninen skuttar lugnt till trädet och vinkar upp mot fåglarna, de piper i tur och ordning | Fåglarna säger hej till dig, kaninen. | `knarr-sno`, `fagel-pip` ×3, pip hej |
| 21 | **Gissa 4.** Halvbild mot de tre snöbollarna, kaninen tittar på dem. Gisspaus 3 s, bollarna glimtar svagt | Tre snöbollar … vad ska det bli av dem? *(gisspaus 3 s)* | nyfiket pip |
| 22 | På *"snögubbe"* fälls bollarna ner och snögubben fälls upp. Kaninen klappar | Ja, en snögubbe! | `pop`, `glitter`, `klapp`, fniss |
| 23 ✱ | Närbild, kaninen tittar på oss. **Pausen:** förtjust pip, nick | Var det roligt i snön, kaninen? *(paus: förtjust pip, nick)* | förtjust pip |
| 24 | Närmare halvbild, kaninen vinkar (armen högre, tydligt vift) | Hej då, kaninen! | pip hej då |
| 24b | Snöflingan på himlen glimtar | Hej då, snöflingan! | `glimt` |
| 24c | Trädet, fåglarna lyfter vingarna och piper | Hej då, fåglarna! | `fagel-pip` |
| 24d | Snögubben studsar lite och glimtar | Hej då, snögubben! | `glimt` |
| 25 | Halvbild över uppslaget, kaninen vinkar klart, snön faller lätt | Hej då! Vi ses snart! | pip hej då |
| 26 | Kameran glider ut ur boken. Korten fälls ner (kaninen först), pärmen slås igen, snöflingan syns | – | `prassel-tyg`, `landa-mjuk` |

**Längd:** 43 röstfiler (uppskattat ca 78 s tal) och ca 38 bilder. Med det lugnare tempot (`GLES` 1,0 s, fyra gisspauser på 3 s, snöfallet 5 s, öppningen 9 s, stängningen 3 s) blir det ca 2:55–3:10. Receptets mål är 2:30–3:15.

**Short:** uppslag 12–17 (bara ett öra, snöbollarna, snö på huvudet), ca 45 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/vintern-i-boken/` (`01-titta-en-bok` …). Listan till `dela-tagning.py` är [`rost.txt`](rost.txt). *"Rulla, rulla … snöboll!"* läses in en gång och används tre gånger (rad 15–15c, fil 26), som 062:s plask. Vill du ha tre olika tagningar, lägg raden tre gånger i blocket.

```
[warmly] Titta! En bok.
[happy] Oj, det är vinter i boken.
[curious] Det är kallt. Men var är snön?
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[warmly] En snöflinga.
[softly] Titta, det snöar.
[warmly] Snön är vit och kall.
[happy] Hej, kaninen! Hej, hej!
[curious] Tycker du om snön, kaninen?
[happy] Jaså, du vill leka i snön.
[softly] Knarr, knarr. Snön knarrar när du går.
[softly] Snön landar på öronen.
[warmly] Fryser du om öronen?
[curious] Hm … vad gör vi nu?
[warmly] Titta, kritan ritar något.
[happy] Ett pannband! Varsågod, kaninen.
[happy] Tack, kritan!
[warmly] Kaninen tar på sig pannbandet.
[playfully] Plopp! … Oj, bara ett öra.
[laughs] Plopp! Där kom det.
[warmly] Är det skönt med pannbandet?
[happy sigh] Mmm, nu är öronen varma igen.
[warmly] Ska du göra en snögubbe?
[happy] Ja, en stor!
[playfully] Rulla, rulla … snöboll!
[warmly] En stor, en mellan och en liten.
[warmly] En, två, tre snöbollar.
[chuckles] Hoppsan! Snö på huvudet.
[curious] Vem är det som piper?
[happy] Det är fåglarna! De sitter i trädet.
[warmly] En röd fågel.
[warmly] En blå fågel.
[warmly] Och en gul fågel.
[happy] Fåglarna säger hej till dig, kaninen.
[curious] Tre snöbollar … vad ska det bli av dem?
[happy] Ja, en snögubbe!
[warmly] Var det roligt i snön, kaninen?
[happy] Hej då, kaninen!
[warmly] Hej då, snöflingan!
[warmly] Hej då, fåglarna!
[warmly] Hej då, snögubben!
[warmly] Hej då! Vi ses snart! [giggles]
```

**Tagning 1 (Sanna 2026-11-27), längder efter normalisering (blir `ROST` i `rader.mjs`):** 01 1,43 · 02 1,97 · 03 2,34 · 04 1,62 · 05 1,95 · 06 1,24 · 07 1,73 · 08 2,13 · 09 2,27 · 10 1,65 · 11 1,99 · 12 3,75 · 13 1,72 · 14 1,38 · 15 1,64 · 16 2,40 · 17 2,92 · 18 1,09 · 19 1,85 · 20 2,61 · 21 2,51 · 22 1,95 · 23 3,39 · 24 1,53 · 25 1,59 · 26 2,67 · 27 2,79 · 28 2,74 · 29 2,71 · 30 1,21 · 31 2,78 · 32 1,32 · 33 1,30 · 34 1,33 · 35 2,45 · 36 2,82 · 37 1,76 · 38 1,72 · 39 1,14 · 40 1,30 · 41 1,12 · 42 1,29 · 43 2,49 s. Whisper var osäker på 11 och 16, Sanna lyssnade och behåller dem. Ingen fil börjar eller slutar mitt i ett ord, och fnisset i 43 finns med.

Ord som mäts per tagning (bilden på ordet): *"Plopp"* ×2 i 20 och 21 (öronen), *"knarr"* i 12 (stegen), *"snöboll"* i 26 (bollen stannar), *"stor"*, *"mellan"*, *"liten"* i 27, *"En, två, tre"* i 28, *"röd"*, *"blå"*, *"gul"* i 32–34, *"snögubbe"* i 37 (korten byts).

## Kaninens röst och ljuden

Bara befintliga ljud (grind 4 väljer per uppslag i `ljud-effekter.md`). Kaninen har redan en hel familj.

| Ljud | Finns? | Rader |
|---|---|---|
| Kaninens familj: `kanin-gullig` 1–8 (+ `kanin-hej`, `kanin-hejda`), `kanin-ny` (`brr`, `fniss`, `fortjust`, `fragande`, `ja`, `jippi`, `mmm`, `sniff`), `kanin-tack` | ja (022, 041, 049) | genom hela, aldrig samma två gånger i rad. `brr` på 07–07b passar temat |
| `fagel-pip` 1–6 | ja | 18–21, 24c |
| `vinterljud` (matta), `knarr-sno`, `sno-duns`, `rull` | ja | hela scenen, skutten, bollarna, snötussen |
| `pop`, `prassel-tyg`, `glimt`, `glimt-2`, `glitter`, `tindra`, `krita-ritar`, `swoosh`, `klapp`, `landa-mjuk` | ja (062) | öppningen, teckningarna, korten, stängningen |

Fniss på 12b, 17 och 22. Malin skrattar på 12b (`[laughs]`), 17 (`[chuckles]`) och 25 (`[giggles]`): tre totalt.

## Regelkoll

- [x] 1 figur (kaninen), 1 plats (vinteruppslaget), inget platsbyte. Fåglarna och snögubben är saker utan rigg (som i 043)
- [x] Inga djurnamn: "kaninen", "fåglarna", "kritan". Röstfilerna heter `09-hej-kaninen` osv.
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då varmt
- [x] Aldrig *"Vad kan det vara?"*, *"Vad säger man?"*, *"Ska vi säga tack?"* eller *"Ni pratar visst med varandra"*. Teckningen: *"Hm … vad blir det nu?"*, tacket direkt: *"Tack, kritan!"*
- [x] Kritan ritar två gånger (snöflingan, pannbandet), den första är temats huvudsak och pärmens siluett, inte figuren
- [x] Barnet letar inte efter något gömt: fåglarna sitter synliga i trädet hela tiden (i helbilderna), de är bara utanför närbilden medan barnet gissar vem som piper. Malin säger dem en i taget med färgen
- [x] Inga uppmaningar att göra något med kroppen. Barnets del: fyra gissningar, räkna bollarna, stor/mellan/liten, färgerna
- [x] *"Varsågod"* och *"Tack, kritan!"*
- [x] Temats lek med samma fras tre gånger: *"Rulla, rulla … snöboll!"* (15, 15b, 15c)
- [x] Samtal: Malin frågar, kaninen svarar i pausen, Malin reagerar med något nytt (06b, 07b, 13, 14, 23). Inga tomma medhåll
- [x] Inte samma sak tre gånger med olika ord: kylan sägs en gång (*"Det är kallt"*), de kalla öronen en gång och en fråga, resten visas (frost, huttring, andedräkt)
- [x] Tydliga repliker: handlingen och saken sägs (*"Kaninen tar på sig pannbandet"*, *"Ska du göra en snögubbe?"*)
- [x] Bilden på orden: snöflingan fylls i på *"En snöflinga."*, öronen på *"Plopp!"*, bollen stannar på *"snöboll"*, bollarna på *"stor, mellan, liten"* och *"en, två, tre"*, fåglarna på färgorden, snögubben på *"snögubbe"*
- [x] Hej då till varje sak: kaninen, snöflingan, fåglarna, snögubben, en bild var
- [x] Malin efter handlingen, frågorna före
- [x] Inget går genom något (se *Så rör det sig*). Snön lägger sig på sidan
- [x] Rörelserna går med en vanlig v2-rigg: raka armar framåt mot bollen, vink bakom kroppen, lugna skutt, riktningsposen. Figuren vänds och speglas aldrig
- [x] Lugnt: få utrop, aldrig två utropsrader i rad (utom *"Varsågod"* – *"Tack, kritan!"*), långsam snö, `GLES` 1,0 s, mjuk matta
- [x] Inga utdragna ord (*"Mmm"* är kort, inget *"Lyssna!"*)
- [x] Ingen jul: inga julsaker, ingen tomteluva, inga ljus eller paket. Snögubben har bara halsduk
- [x] Inget läskigt: kylan är mild och går över, ingen gråt
- [x] Ingen ny musik. Allt innehåll på svenska, prompterna på engelska
- [ ] **Problemet är "kalla öron", inte "vill inte".** Som 062 ett vardagsproblem utan trots
- [ ] Avsteg som receptet redan har: ingen sång, inget ritintro på papper, kameran glider in och ut i stället för zoom och kritiris, fler än 6 utsnitt
- [ ] `harriets-favoriter.md` är inte uppdaterad (rörs inte i den här sessionen). Lägg till raden när manuset är godkänt

## Öppet (Sanna bestämmer)

1. **Snön på korten:** kullarna, granarna och trädet får snön i kod (växer in uppifrån). Flow-granen med snö valdes bort 2026-11-27 (formen ändrades). Reservprompterna för snöiga kullar och träd finns i `bildlista.md` om koden inte ser bra ut.
2. **Snögubben poppar upp i stället för bollarna.** Kaninen kan inte lyfta bollarna med de raka armarna, så boken bygger snögubben på ordet. Vill du hellre att bollarna står kvar och snögubben poppar upp bredvid, går det också.
3. **Vinterhimlen:** 062:s himmel i kallare ton i kod (reservprompt i `bildlista.md`).
4. **Snöflingan blir kvar på himlen** hela avsnittet (som 062:s sol), stor och tydlig. Den har inget ansikte. Vill du ha ett enkelt ansikte på den som på solen i runda 5?
5. **Rad 05b *"Allt blir vitt."*** kan strykas om det känns som att säga snöfallet två gånger. Då visar bilden bara att marken blir vit.
