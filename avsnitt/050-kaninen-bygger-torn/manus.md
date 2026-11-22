# Avsnitt 050 – Kaninen bygger torn i snön (plan)

**Status:** grind 1, **version 2 godkänd av Sanna 2026-11-22** (version 1 var för lik 028 Leoparden bygger i sanden). Grind 2 (konturer) godkänd, men Sanna vill ha nya, finare hink och spade (`nya-hink-spade-prompter.md`, görs i Flow för hand). **Grind 3 (rösten) godkänd 2026-11-22:** tagning 1, 40 filer i `assets/ljud/roster/kaninen-bygger-torn/`, längderna i `storyboard/rader.mjs` (`ROST`). **Bakgrunden `granstugan-stark.jpeg` godkänd.** Grind 4 (ljuden): alla finns redan (se Kaninens röst och ljuden). Grind 5: animatiken byggd 2026-11-22 (`storyboard/animatik.mp4`, 2:58,8, 41 bilder, `storyboard/index.html`), **godkänd av Sanna 2026-11-22**. **Slutrenderad 2026-11-22** (lokalt, 1920×1080, 30 bilder/s, scenen 180,0 s; lucka 23 193,3 s, −16,1 LUFS, uppladdad som J23 för granskning). Deep QA 22/11: större snö på nosen och snöpuff, paus efter *"Kan du säga vänd?"* 4,6 s. Grind 6 2026-11-22: kodscenen `scener/granstugan/index.html` (rörelsen per rad, 049:s maskineri), förhandsvisning `--snabb`. Julmusiken under hela filmen: `jul/jul-badd-2.m4a` 0,10 (alternativen i `ljud/provlyssna-julmusik.m4a`: dagbädd 2, Up on the housetop, Pynta salen, dagbädd 1). Ingen logotyp först: julkalenderns ram är intro och outro (lucka 23, `produktion/youtube/shorts/jul/23-kaninen-bygger-torn/`, `hel-video.sh`). **Feedback 2026-11-22 (12 punkter, J23 14:26):** kaninen större (DS 0,6), går in med riggens gång (knarr per steg) och klipps till närbild för vinkningen, vinkarmen bakom kroppen snett upp (+80), tydliga nickar (rad 3, 4, 12, 13, 30), bjällrorna lägre och korta, julkarolen *Up on the housetop* (0,16) i stället för dagbädden, grävandet med vänster tass i en hög driva med snö som yr, en tankebubbla med ett snötorn i rad 10, hinken står vid kaninens tass: spadtag med snöklump som tippas i, klapp med spadens blad, hinken vänder sig till tornplatsen och kommer tillbaka (rad 15–20, 24–25), tornen längre åt höger med bredare glipa, ljuset större med tjock kontur, kant upptill och en låga i konturen. **Feedback 2026-11-22 b (5 punkter, J23 14:53):** spaden hålls med riggens sak i handen (tassen över skaftet, vrids runt greppet), snön i hinken ligger i öppningen bakom kanten (satt ovanför), hinken ligger kvar upp och ner på tornet efter vänd (kanten på marken, handtaget klippt) tills den lyfts, ljuset mindre (104 → 76 px), siffrorna 1, 2, 3 poppar upp på tornen när de räknas (rad 31). Julbilderbok enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med kaninen, kaninen svarar med ljud, öron och ansikte. Inget är byggt än. Ca 3,5–4 min.

**Julkalenderns lucka 23** (dan före julafton): kalenderramen är intro och outro som i lucka 17 och 20, så introt *"Djuren hittar på!"* är inte med i luckan. Mapp när den byggs: `produktion/youtube/shorts/jul/23-kaninen-bygger-torn/`.

**Koncept A** (Sanna 2026-11-22, figuren bytt till kaninen): leka i snön med hink och spade, som i sandlådan. Skiljer sig från pulkan (039), snögubben (044) och fåglarna (043).

**Enkel animation.** Kaninen gräver aldrig med böjda armar. Spaden sitter i tasspetsen som tvålen i 020, och hela den raka armen vrids lite kring axeln. Snön flyger själv ur spaden in i hinken (snöpuffar i kod), hinken vänder sig själv i en lugn båge, och tornet står kvar när hinken lyfts. Klappa = rak tass ner på hinkens botten, som tejpen i 048.

| | |
|---|---|
| **Titel** | Kaninen bygger torn i snön (avsnitt 50) |
| **Figurer (1)** | **Kaninen Kanel** (v2, riggad) med **halsduken** (`rekvisita/halsduk.md`, som i 038, men högre och bredare: tätt under hakan runt hela kroppen, `translate(510 545) scale(0.76 0.5) translate(-523 -400)` maskad med kroppens form så att ändarna följer konturen, `` i riggen, Sanna 2026-11-22) |
| **Platser (1)** | **Granstugan** (`bakgrunder/granstugan.md`, kodscen `produktion/rum/granstugan/`), i 050 i versionen **`granstugan-stark.jpeg`** (Sanna 2026-11-22: helt jämn himmel och starkare färger; himlen en enda stark blå `#166ED2` med lätt korn, granarna och stugan 35 % mer mättade): två snöiga granar till vänster, röd stuga med tänt fönster till höger, mitten tom. Oanvänd i kalendern, och det tända fönstret ger julkänsla. Pulkagården var kaninens plats i lucka 1 (039), granbrynet finns i lucka 3. Lätt snöfall ur `ute.js`. Inget platsbyte, inget kritsvep |
| **Saker som finns** | **hinken** och **spaden** (nya, finare görs, se Öppet 7), **adventsljuset** (`adventsljus`, har kontur) med **lågan** (`laga`), **julgranen** (`julgran`, i kaninens dröm), halsduken |
| **Nya saker** | inga bilder. Konturer till kritan för hinken och spaden (`verktyg/kontur.py`), se Öppet |
| **I kod** | snöhögen, snöpuffarna, snön på nosen, tornen (vit snö i hinkens form med ränder från hinkens kant), lyktans varma sken, snöfallet |
| **Musik** | ingen ny musik. Förslag: julkarolen från 039/048 (`karol-up-on-the-housetop-slinga.m4a`) lågt (0,3 × 0,4), upp i sista leken. Se Öppet |
| **Favoriter** | 🐰 kanin · ❄️ snö · 🕯️ ljus |
| **Kärna** | **Version 2:** Kaninen är glad, för i morgon är det julafton. Den gräver i snön med tassarna, men snön yr upp på nosen. Kritan ritar en hink och en spade: *"Varsågod!"* – *"Tack, kritan!"* *"Fyll … klappa … vänd! Ett torn!"* Andra gången säger barnet *"vänd!"*. Tittut bakom tornen. Det tredje tornet hamnar ovanpå de två andra, och kaninen drömmer en stund att de är en julgran (tornen tonar över i en riktig gran och tillbaka). Sedan ritar kritan ett ljus i glipan mellan dem (barnet gissar). Ljuset tänds: tornen blev en snölykta. Räkna tornen, snart är det jul, hej då! **Skillnad mot 028:** ingen rasande hög, ingen borttappad spade, inga sandkakor i rad. I stället snö på nosen, barnet säger "vänd", och tornen blir en snölykta (Sanna 2026-11-22) |
| **Barnet övar på** | gissa vad kritan ritar · säga "vänd" · tittut · gissa vad kritan ritar i lyktan · räkna till tre |
| **Leken** | **tittut bakom tornet** (uppslag 15–16) |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Hoppar in | lugna kaninhopp från vänster (`hopp-mjuk`), små tassavtryck i snön bakom (i kod, ligger kvar), stannar före repliken |
| Halsduken | runt halsen under huvudet, följer kroppen. Vänds aldrig |
| Glad | glatt skutt (20 px upp, tryck ihop före och efter), öronen vippar, ögonen öppna |
| Gräver med tassen | en låg snöhög i kod framför kaninen. Rak tass ner i högen och upp igen (armen vrids ±15° kring axeln, 0,7 s), två gånger. Andra gången yr en snöpuff rakt upp (`puff`) och landar som tre–fyra små vita prickar på nosen (i kod) |
| Snö på nosen | kaninen blinkar, huvudet lutar lugnt ±4° två gånger (ingen snurr), prickarna faller av en i taget. Fnissar |
| Kritan ritar hinken | kritan in uppe till höger, konturen i ett drag (4 s), gisspaus 3 s, fylls i inifrån med `glitter`. Sedan spaden (3 s), ingen ny gisspaus. Kritan flyger ut |
| Fyll | spaden i tasspetsen (tassen framför skaftet, armen med mörkare kritkant). Armen vrids lugnt nedåt mot snön och upp mot hinken (±15°, 0,8 s), en snöpuff flyger i en liten båge ner i hinken |
| Klappa | rak tass ner på hinkens överkant (lutar 8°, sjunker 25 px, upp igen), `klapp` |
| Vänd | hinken lyfts och vänder sig själv i en lugn båge (0,9 s), landar upp och ner (`sno-duns`), lyfts rakt upp och tonar bort: tornet står kvar. `glitter` på *"Ett torn!"* |
| Barnet säger vänd | efter *"Fyll … klappa …"* står hinken full och stilla, kaninen tittar på kameran, hinken gungar lite (±2°) i pausen. Vänder sig först på Malins *"Vänd!"* |
| Tittut | kaninen hoppar lugnt bakom de två tornen och sjunker ner, bara öronspetsarna syns i glipan mellan dem. Öronen vippar en gång i pausen. På *"Tittut!"* hoppar den fram vid sidan |
| Tornet högst upp | de två tornen står tätt ihop. Hinken vänder sig i en högre båge och landar mitt över glipan, ovanpå båda. Tre torn i en trekant, med en glipa mellan de två nedre under det översta: där står ljuset sedan |
| Kaninens dröm | tornen tonar över i `julgran.png` på samma plats och ungefär samma storlek (mjuk övertoning 1,2 s, lite drömsken och några glitterprickar runt kanten), granen andas lugnt i 2 s, tonar tillbaka (1 s). Kaninen står kvar framför och tittar upp hela tiden. Visar att kaninen tänker på julen, inte att tornen förvandlas |
| Kritan ritar ljuset | ett litet adventsljus (`adventsljus`, med `adventsljus-kontur.json`) ritas i glipan mellan de två nedre tornen, under det översta (3 s). Gisspaus 3 s, fylls i, sedan tänds [lågan](../../rekvisita/laga.md) |
| Snölyktan lyser | lågan fladdrar lugnt, ett varmt gult sken (radiell glöd i kod) lyser upp glipan och snön närmast, och tornens innerkanter får en svag gul ton. Skenet andas lugnt resten av filmen |
| Tittar efter | `rikt ±0,3` och ögonen åt sidan, huvudet vänds inte |
| Hoppar runt lyktan | kaninen hoppar åt höger bakom lyktan (försvinner), kommer ut på andra sidan och gör ett glatt skutt. Vänds aldrig |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, 3–4 lugna vink |

## KRITAN RITAR (~12 s) – spaden

Sanna 2026-11-22: ritintrot ritar **spaden**, inte kaninen. Kritan ritar spadens kontur på papperet (`spade-rod-kontur.json` eller den nya spadens kontur, ytterkonturen och öglan), väntar medan barnet gissar, den riktiga spaden fylls i inifrån. Zoom in i teckningen, in i granstugans gård, och kaninen hoppar in i uppslag 1. Spaden från introt syns inte i gården förrän kritan ritar hinken och spaden i uppslag 11, så *"Och en spade!"* blir ett igenkännande: samma spade som i början.

## GRANSTUGAN

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar spadens kontur | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En spade! | krita-ritar, skogsljud |
| 1 | Helbild, kaninen hoppar in i snön och vinkar. Det snöar lätt | Hej, kaninen! Hej, hej! | `hopp-mjuk`, `kanin-hej` |
| 2 | Kaninen gör ett glatt skutt, öronen vippar | Oj, vad glad du är! | `kanin-ny-jippi` |
| 3 | Närbild, kaninen tittar mot stugans tända fönster | Är det för att det är julafton i morgon? | `kanin-ny-fortjust` |
| 4 | Nickar två gånger | Ja, såklart! Det är så kul. | `kanin-ny-ja`, `bjallror` lågt |
| 5 | Kaninen tittar på kameran, öronen på sned | Men vad ska vi göra i dag då? | `kanin-ny-fragande` |
| 6 | Helbild, kaninen tittar upp mot flingorna | Titta, så mycket snö! | `kanin-ny-fortjust` |
| 7 | Halvbild, kaninen gräver i snöhögen med tassen | Gräver du med tassarna? | `knarr-sno`, `kanin-ny-ja` |
| 8 | Snöpuffen yr upp och landar på nosen | Oj! Snö på nosen! | `puff`, `kanin-ny-fniss` |
| 9 | Närbild, kaninen blinkar, lutar huvudet, prickarna faller av | Med tassar går det visst inte så bra. | `kanin-ny-trumpen` (kort) |
| 10 | Kaninen tittar upp mot kameran | Hm … vad gör vi nu? | `kanin-ny-fragande` |
| 11 | Kritan kommer in och ritar på snön bredvid kaninen: hinken, gisspaus 3 s, fylls i. Sedan spaden | Titta! Kritan ritar något. *(gisspaus 3 s)* En hink! Och en spade! Varsågod, kaninen. | krita-ritar, `glitter` ×2 |
| 12 | Kaninen tittar upp mot kritan när den flyger ut | Tack, kritan! | `kanin-tack` |
| 13 | Kaninen nickar | Kaninen säger också tack. | `kanin-ny-fortjust` |
| 14 | Kaninen tar spaden, den sitter i tasspetsen | Nu bygger vi ett torn! | `kanin-ny-jippi` |
| 15 | Halvbild: fyll, klappa, vänd | Fyll … klappa … vänd! | `puff`, `klapp`, `sno-duns` |
| 16 | Hinken lyfts, tornet syns, glitter | Ett torn! | `glitter`, glatt skutt, `kanin-ny-fniss` |
| 17 | Kaninen fyller hinken igen | Och igen! | `kanin-ny-ja` |
| 18 | Fyll, klappa, hinken står full och stilla | Fyll … klappa … | `puff`, `klapp` |
| 19 | Närbild, kaninen tittar på kameran, hinken gungar lite | Kan du säga vänd? *(paus 4 s)* | tyst, kaninen blinkar och andas |
| 20 | Halvbild, hinken vänder sig på ordet, andra tornet tätt bredvid det första | Vänd! Ett torn till! | `sno-duns`, `glitter`, `kanin-ny-jippi` |
| 21 | Kaninen hoppar bakom tornen, bara öronspetsarna syns i glipan | Oj! Var är kaninen? *(paus 3 s)* | `hopp-mjuk`, öronen vippar |
| 22 | Kaninen hoppar fram vid sidan | Tittut! Där är du! | `kanin-ny-fniss` |
| 23 | Kaninen tittar upp, ovanför tornen | Två torn. Och ett till … högst upp? | `kanin-ny-fragande` |
| 24 | Fyll, klappa, vänd: hinken landar ovanpå båda tornen | Fyll … klappa … vänd! | `puff`, `klapp`, `sno-duns` |
| 25 | Helbild, tre torn i en trekant | Oj! Ett torn på tornen! | `glitter`, förvånad min (0,3 s stilla) |
| 25b | Närbild, kaninen tittar upp mot tornen, ögonen glittrar. Tornen tonar mjukt över i den riktiga julgranen (`julgran`), kaninens dröm, med ett mjukt drömsken i kanten (1,2 s). Granen står kvar 2 s, tonar tillbaka till tornen | Oj … det ser ut som en julgran! | `tindra`, `kanin-ny-mmm` |
| 26 | Kritan kommer in och ritar ljusets kontur i glipan mellan tornen | Titta! Kritan ritar igen. | krita-ritar |
| 27 | Närbild på glipan, konturen står klar, kaninen tittar in | Titta noga. Vad blir det? *(gisspaus 3 s)* | tyst, kaninen blinkar och andas |
| 28 | Ljuset fylls i, lågan tänds och ett varmt gult sken sprider sig i snön runt glipan | Ett ljus! Titta, det lyser! | `glitter`, `tindra` |
| 29 | Helbild, lyktan lyser, stugans fönster lyser bakom, kaninen gör ett glatt skutt | En snölykta! | `kanin-ny-jippi` |
| 30 | Kaninen tittar upp mot kritan när den flyger ut | Tack, kritan! | `kanin-tack` |
| 31 | Helbild, ett torn i taget glimtar | Ska vi räkna tornen? Ett … två … tre! | `pling` ×3 |
| 32 | Närbild på lyktan och stugans tända fönster bakom | Snart är det jul! | `bjallror` lågt |
| 33 | Karolen kommer upp. Kaninen hoppar bakom lyktan och fram på andra sidan (2–3 s före repliken) | Nu hoppar kaninen runt lyktan! Hopp, hopp! | `hopp-mjuk`, `kanin-ny-fniss` |
| 34 | Halvbild, kaninen vinkar (armen bakom kroppen) | Hej då, kaninen! | `kanin-hejda` |
| 35 | Samma, vinkar klart | Hej då! Vi ses snart! | |
| 36 | Kritirisen runt kaninen och den lysande lyktan | – | karolen tonar ut |

**Shorts:** (1) uppslag 14–22, första tornet, "säg vänd" och tittut, ca 50 s. (2) uppslag 23–30, tornet högst upp, julgransdrömmen och snölyktan som tänds.

**Kamera:** bara klipp. Helbild på gården (granarna, tornen, stugan), halvbild på tornbygget (samma utsnitt i 15, 18, 20 och 24), närbild på kaninens ansikte, på glipan när ljuset ritas och på lyktan med fönstret bakom.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/kaninen-bygger-torn/` (`01-kritan-ritar` …) med `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En spade!
[happy] Hej, kaninen! Hej, hej!
[laughs] Oj, vad glad du är!
[curious] Är det för att det är julafton i morgon?
[happy] Ja, såklart! Det är så kul.
[curious] Men vad ska vi göra i dag då?
[excited] Titta, så mycket snö!
[curious] Gräver du med tassarna?
[surprised] Oj! Snö på nosen! [giggles]
[chuckles] Med tassar går det visst inte så bra.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[excited] En hink! Och en spade! Varsågod, kaninen.
[happy] Tack, kritan!
[warmly] Kaninen säger också tack.
[cheerfully] Nu bygger vi ett torn!
[happy] Fyll … klappa … vänd!
[delighted] Ett torn!
[cheerfully] Och igen!
[happy] Fyll … klappa …
[warmly] Kan du säga vänd?
[excited] Vänd! Ett torn till!
[laughs] Oj! Var är kaninen?
[playfully] Tittut! Där är du!
[curious] Två torn. Och ett till … högst upp?
[happy] Fyll … klappa … vänd!
[surprised] Oj! Ett torn på tornen!
[dreamy] Oj … det ser ut som en julgran!
[curious] Titta! Kritan ritar igen.
[curious] Titta noga. Vad blir det?
[excited] Ett ljus! Titta, det lyser!
[warmly] En snölykta!
[happy] Tack, kritan!
[cheerfully] Ska vi räkna tornen? Ett … två … tre!
[warmly] Snart är det jul!
[laughs] Nu hoppar kaninen runt lyktan! Hopp, hopp!
[happy] Hej då, kaninen!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Kaninens röst och ljuden

Allt finns i `assets/ljud/effekter/`: `kanin-gullig`, `kanin-ny` (`hej`, `fortjust`, `fniss`, `trumpen`, `fragande`, `ja`, `jippi`, `mmm`), `kanin-hej`, `kanin-hejda`, `kanin-tack`, `hopp-mjuk`, `klapp`, `puff`, `sno-duns`, `knarr-sno`, `glitter`, `tindra`, `pling`, `bjallror`, `krita-ritar`. **Inga nya ljud behövs.** Kolla att `puff` låter som pudersnö och inte rök; annars en mjukare `sno-duns`. Platsmattan: `granstugan`-scenens vinterljud, eller `skogsljud` lågt.

## Regelkoll

- [x] 1 figur, 1 plats, inget kritsvep
- [x] Inga djurnamn: "kaninen", "hinken", "spaden", "ljuset"
- [x] Aldrig *"Vad kan det vara?"*. Ritintrot (spaden) säger *"Hm … vad blir det nu?"*, ljuset *"Vad blir det?"*
- [x] Aldrig *"Vad säger man?"*. *"Ska vi säga tack?"* är borttagen (Sanna 2026-11-22): Malin tackar kritan och säger att kaninen också tackar
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"Fyll … klappa … vänd!"*
- [x] Frågor till barnet med paus: vad ritar kritan (3 s), säg vänd (4 s), var är kaninen (3 s), vad blir det (3 s), räkna till tre
- [x] Barnet hjälper till: säger *"vänd!"* och gissar ljuset i lyktan
- [x] Bilden på orden: snöpuff på *"Snö på nosen!"*, tassen på *"klappa"*, hinken på *"vänd"*, skenet på *"Titta, det lyser!"*
- [x] Kritan ritar två gånger (hinken och spaden, sedan ljuset i lyktan)
- [x] Inget läskigt: snön på nosen är busig, ingen gråt. Inga snurrar (hinken vänder, kaninen gör det inte), inga böjda armar
- [x] Ingen ny musik
- [x] Inte för likt 028 Leoparden bygger i sanden: ingen hög som rasar, ingen borttappad spade, ingen hinkhatt, tornen blir en snölykta
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt

## Öppet

1. ~~**Konturer**~~ klara och godkända 2026-11-22 (grind 2): `hink-bla-kontur.json` (tre drag: ytterkonturen, handtagets insida, kantbandet) och `spade-rod-kontur.json` (två drag: ytterkonturen, öglan), ritas med `ritBana(K.drag)`. Jämförelse: `konturer-hink-spade.png`. Kanterna är redan 0,9 % (8 px), så ingen `-tunn.png` behövs. 050 använder `hink-bla.png` och `spade-rod.png`.
2. **Hinken sedd från sidan** (dess bild) passar som torn: tornet är hinkens form upp och ner i vit snö. Spaden står upp i sin bild; i tassen lutar den lite (vrids i kod, aldrig speglad).
3. ~~**Ordningen**~~ klar i version 2: tittut kommer efter andra tornet, spaden används alla tre gångerna.
4. ~~**Julafton i repliken**~~ klart: Sannas egen replik i uppslag 3, *"Är det för att det är julafton i morgon?"*. Stjärnan i 31 behåller *"Snart är det jul!"*.
7. **Nya hink och spade:** Sanna vill ha finare (`nya-hink-spade-prompter.md`). Flow-verktyget fastnar, så de görs i Flow för hand. Nya konturer behövs då.
5. **Musiken:** julkarolen (039, 048) eller en lugnare slinga (`karol-pynta-salen-slinga.m4a`). Inget nytt.
6. **Avsnittets färg:** himmelsblå som granstugans himmel (`#2F8FD6`), eller julröd som stugan.
