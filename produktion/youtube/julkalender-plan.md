# Lilla Kritans julkalender 2026 – plan

24 liggande videor (1920×1080), en per dag 1–24 december. **Varje lucka är i första hand en liggande video.** Samma datafil kan också renderas stående som en Short, men det är ett valfritt extra och inte det som ska levereras (Sanna: *"i need laying down format for videos not youtube shorts mainly"*). Varje lucka har ett eget jultema.

Fjorton luckor byggs nya och är korta: ett djur som gör en julsak eller leker i snön, en dans, en tittut, tre små sagor som kritan ritar, och julafton. Djurluckorna är ca 20–30 s och kritans sagor ca 45 s. Tio luckor visar en video vi redan har, **hela videon från början till slut** (Sanna: *"they should not be clips of videos, full videos"*). Åtta av dem är hela avsnitt på 1,5–4 min, och två är korta Gissa teckningen-filmer. På julafton kommer också [hela julkalendern](#5-hela-julkalendern) som en lång video.

Planen är skriven 2026-11-11 och ändrad flera gånger samma dag: först kom luckorna med befintligt material och den långa videon, sedan fylldes lucka 9–24 med mer befintligt så att kalendern går att hinna med (Sanna: *"we can also use other videos we have to fill out or it will be too hard"*), sedan blev kalendern liggande, sedan blev det befintliga hela videor i stället för klipp, och sist blev kritans luckor små sagor med suddgummit i stället för bara en gissning. Lucka 1–3 är byggda och 4–8 byggs. De är byggda stående, så ramen behöver ett liggande läge (se Det motorn behöver). Det som står under [Beslut för Sanna](#4-beslut-för-sanna) är inte bestämt.

Det som redan finns och som planen bygger på:

| Vad | Var |
|---|---|
| Ramen: kalendern med 24 luckor, kaninen pekar, *"Idag öppnar vi lucka två!"*, in i luckan, och ut igen med *"Vi ses i morgon!"* | `produktion/youtube/shorts/jul/lucka.js` |
| Djurluckornas motor: ett djur i snön, en lista med bitar (`[sekunder, rörelse, { sag, ljud }]`). Rörelser i dag: `stilla`, `vinka`, `hoppa`, `klappa`, `dansa`, `nicka`, och för tittut `borta` och `glant` | `produktion/youtube/shorts/jul/djur.js` |
| Ritluckornas motor: kritan ritar en liten saga steg för steg, och suddgummit hjälper till | `produktion/youtube/shorts/jul/rita.js` |
| Lucka 1, kritan ritar en liten saga: stjärnan och molnet (byggd, liggande, ca 43 s) | `produktion/youtube/shorts/jul/01-stjarna/` |
| Pilot lucka 2, lammet leker tittut med luckan | `produktion/youtube/shorts/jul/02-lammet-tittut/` |
| Musiken under alla luckor | `assets/ljud/musik/gissa-bad.m4a` |

---

## 1. Receptet: ett djur gör en julsak

En lucka är **ett djur, en sak och en handling som görs tre gånger**. Allt annat är likadant varje dag. Ramen tar ca 6 s (3,7 s in, 2,4 s ut), så innehållet bakom luckan får vara 15–22 s.

### Bitarna bakom luckan (ca 20 s)

| # | Bit | Tid | Bild (en rörelse) | Malin | Ljud |
|---|---|---|---|---|---|
| 1 | Hej | 2,8 s | Luckan öppnas. Djuret står i snön och vinkar | *"Hej hunden!"* 0,6 s in | djurets hej-läte efter repliken |
| 2 | Saken | 2,5 s | Dagens sak poppar fram. Djuret tittar på den | sakens namn, när saken har landat: *"En bjällra!"* | `pop` eller `pling` |
| 3 | Handlingen, tre gånger | 6–8 s | Samma rörelse tre gånger, med samma ljud varje gång | en replik (se nedan) | ett ljud per gång |
| 4 | Barnets tur | 1,5 s + 4 s paus | Malin frågar. I pausen gör djuret rörelsen igen, två gånger | *"Kan du också skaka?"* | djurets läte en gång |
| 5 | Hej då | 2,4 s | Djuret vinkar. Luckan stängs | *"Hej då hunden!"*, sedan ramens *"Vi ses i morgon!"* | hej då-lätet |

Handlingen sägs på ett av två sätt, så att tredje gången alltid får vara tyst eller kort:

- **Beskriv, en gång till, bara ljudet:** *"Grisen åker pulka. Wiii!"* – *"En gång till!"* – tredje gången hörs bara djuret.
- **Tre ord i en replik:** *"Mums … mums … mums!"*, *"En boll. En boll till. Och en till!"*. Rörelserna läggs på ordens tider (mätta med whisper, som `BORTA` i 020).

Regler som gäller varje bit:

- Rörelsen börjar först. Malin kommer 0,4–0,8 s in i den, eller när den har landat. Frågan i bit 4 kommer före rörelsen.
- Det som sägs syns just då: flingan sitter på nosen på *"En snöflinga!"*, lågan tänds på *"två"*.
- En sak rör sig i taget. Inga snurrar, ingen spegling, lugna hopp. Djuret svarar bara med läten.
- I den liggande bilden står djuret mitt i bilden med fötterna på snökullen, och saken får plats bredvid. Inget viktigt närmare bildens kant än ca 5 %. Bara den stående extraversionen följer Shorts-reglerna: fötterna på y 1400 och inget viktigt under 75 % av höjden.

### Likadant varje dag

- Ramen (`lucka.js`): kalendern, kaninen som pekar, repliken med dagens nummer, vägen in och ut, *"Vi ses i morgon!"*.
- Platsen: snön i kod (`djur.js`), på dagen eller på kvällen. Inga andra platser.
- Musiken: `gissa-bad.m4a`, lågt under rösten.
- Bitarnas ordning och längd, hej och hej då, pausen på 4 s.
- Djurets läten: samma ljudfamilj som i bilderböckerna och Tittut.
- Rendering och kontroll: liggande med `node avsnitt/004-bussen-badar/scener/render.mjs <mapp>` (gissa-luckorna med `--liggande`), stillbilder först, `ffprobe` (1920×1080, 30 fps, ljud; de nybyggda ca 20–30 s) och ett kontaktark. Den stående extraversionen görs ur samma mapp med `--staende`.

### Det en lucka behöver

| | Antal | Varifrån |
|---|---|---|
| Figur | 1, med v2-rigg | ett av sex djur (se nedan) |
| Sak | högst 1 | ritad i kod som kritteckning med vit kant (samma streck som i lucka 1), eller en sak som redan finns |
| Malins repliker | 3–5 nya, plus hej och hej då som finns | röstlistan i avsnitt 3 |
| Ljud | 1–2 | finns nästan alltid redan |
| Mapp | `produktion/youtube/shorts/jul/NN-djur-sak/` | t.ex. `03-hunden-snoflingor/` |

När motorn kan visa en sak och har de nya rörelserna (se sist i det här avsnittet) är en lucka en lista på 6–8 bitar. Det bör ta ungefär en timme: skriva bitarna, titta på stillbilderna, förhandsvisa, rendera, kontrollera.

### Varianterna: samma recept, en bit ändrad

| | Variant | Det som ändras | Dagar |
|---|---|---|---|
| **A** | **Gör en julsak** | grundreceptet | 6, 7, 13, 20, 23 |
| **B** | **Leker i snön** | bit 2 och 3: saken är snön själv, och handlingen görs med hela kroppen (hoppar, åker, bygger) | 3, 5, 8 |
| **C** | **Dansar** | bit 3 och 4 blir 10–12 s dans. Saken är ett stort klistermärke bredvid djuret som gungar i takt. Malin säger bara sakens namn, *"Nu dansar vi!"* och *"Dansa du också!"* | 4 |
| **D** | **Tittut med luckan** | bit 2–4 blir två varv borta – kikar fram – tittut, där luckan är gömstället. Bara repliker som redan finns. Som piloten | 2 |
| **E** | **Kritan ritar en liten saga** | inget djur: kritan ritar saken (med gissningen och 4 s paus), lite av sakens värld, något litet går på tok i teckningen, suddgummit suddar bort det i tre drag, saken lyser igen och vi säger tack. Se Kritan ritar en liten saga nedan | 1, 9, 22 |
| **G** | **Hel video** | bakom luckan spelas en video vi redan har, hela, från början till slut. Inga nya bilder och inga nya repliker. Se Hel video bakom luckan nedan | 10, 11, 12, 14, 15, 16, 17, 18, 19, 21 |
| **J** | **Julafton** | tre figurer och sakerna från tidigare luckor | 24 |

Variant F, julramsan, ströks när kalendern fylldes med videor vi redan har. Ramsan står kvar här, ifall en lucka ska byggas i stället för en befintlig video. Varje rad är en rörelse som riggen redan kan:

> Klappa, klappa – klapp, klapp, klapp!
> Stampa, stampa – stamp, stamp, stamp!
> Vinka, vinka – hej, hej, hej!
> Snart är det jul för dig och mig!

### Kritan ritar en liten saga (variant E)

Sanna: *"kritan ritar kanske kan vara lite mer kreativ, som en liten story, typ kritan ritar en stjärna och en himmel och moln som täcker stjärnan och ett suddgummi som suddar bort moln så det kan skina igen"*. Lucka 1 är byggd så, och lucka 9 och 22 följer samma form. Luckan blir ca 45 s.

| # | Steg | Bild | Malin |
|---|---|---|---|
| 1 | Kritan ritar saken | först det som kan vara många saker, sist det som avgör | *"Vad ritar kritan?"*, sedan *"Vad blir det?"* |
| 2 | Paus | 4 s, kritan väntar | – |
| 3 | Svaret | saken poppar till när den får sitt namn | *"En stjärna!"* |
| 4 | Lite av sakens värld | något ritas bakom eller bredvid saken | en mening om det som ritas |
| 5 | Något litet går på tok | kritan ritar något som gömmer, trasslar till eller släcker saken | *"Oj! …"* och en undran |
| 6 | Suddgummit hjälper | suddgummit kommer in och suddar bort det i tre drag | *"Här kommer suddgummit!"*, *"Sudd, sudd, sudd!"* |
| 7 | Saken lyser igen | saken tindrar eller glimmar | en mening om saken |
| 8 | Tack | suddgummit skuttar två gånger och åker ut, kritan lyfter | *"Tack, suddgummit!"* |

Regler:

- **Suddgummit är kritans kompis** och har inget ansikte, precis som kritan. Det säger inget och vänds aldrig.
- **Felet är litet och inte läskigt:** något hamnar i vägen, blir trassligt eller fel färg. Ingen blir ledsen, och det löses direkt med kompisens hjälp.
- **Ett eget fel i varje saga:** molnet gömmer (1), bandet trasslar sig (9), ljusen lyser inte (22).
- Gissningen och pausen på 4 s är kvar. Frågan är *"Vad blir det?"*.
- De tre replikerna om suddgummit är samma inspelningar i alla tre sagorna.

Det motorn kan i dag (`rita.js`): rita streck på ett bakre, mellersta eller främre lager, vänta, låta saken poppa till när den får sitt namn, sudda ett lager med suddgummit, tindra, och tacka. Sagorna för lucka 9 och 22 är skrivna så att de bara använder de stegen: felet ritas på det främre lagret och suddas där, och det som ritas efteråt läggs på det mellersta. Allt annat kräver ett litet tillägg i motorn, till exempel att sudda två gånger i samma lucka, att flytta något som redan är ritat, eller snö som faller.

### Hel video bakom luckan (variant G)

Luckan öppnas, och bakom den spelas en video som redan finns, **hela, från sin första bild till sin sista**. Sedan stängs luckan. Ingenting klipps bort inuti videon, och inget nytt ritas eller spelas in utöver ramens replik med dagens nummer.

Så sätts den ihop:

1. Ramens öppning (3,7 s) renderas med **videons första bild** bakom luckan, så att luckan öppnas mot den bild som videon börjar med.
2. Videon spelas orörd, med sitt eget ljud (ingen `gissa-bad.m4a` under).
3. Ramens stängning (2,4 s) renderas med **videons sista bild** bakom luckan.
4. De tre delarna fogas ihop med ffmpeg. Videon i mitten ändras inte. Ramens två delar mastras till samma ljudnivå som videon (−14 LUFS), så att ljudet inte hoppar i skarvarna.

Luckan blir alltså videons längd plus ca 6 s. Om avsnittens egna intron och outron ska vara med är ett beslut för Sanna (avsnitt 4). Tabellen räknar med hela filen, som den är.

En hel video bedöms som helhet. Dagens tema har därför fått namn efter videon, inte efter ett ögonblick i den. Alla filer finns, är färdiga liggande filmer (1920×1080, med ljud) och är mätta med `ffprobe` 2026-11-11, utom där tabellen säger något annat:

| Lucka | Video | Fil | Videons längd | Luckan med ramen | Hur väl den passar | Status |
|---|---|---|---|---|---|---|
| 10 | 015 Bä, bä, vita lamm | `avsnitt/015-ba-ba-vita-lamm/film/avsnitt-015.mp4` | 1:29 | ca 1:36 | bra: ull, kalla fötter och varma strumpor | publicerad 9 nov |
| 11 | 013 Röda sången | `avsnitt/013-rod-brandbil/film/avsnitt-013-final.mp4` | 2:43 | ca 2:50 | hyfsat: rött är julens färg, och kaninen är kalenderns värd | publicerad 10 nov |
| 12 | Gissa teckningen: katten | teckningen i `produktion/youtube/shorts/gissa/bondgarden/katt/`, renderas liggande med luckan | ca 19 s | ca 25 s | svagt: en ordlek med lussekatten dagen före Lucia | teckningen finns |
| 14 | 007 Bruna sången | `avsnitt/007-bruna-ladbilen/film/avsnitt-007-v2-final.mp4` | 3:51 | ca 3:57 | hyfsat: choklad, kola och kanelbullar, och björnen är med i kalendern | publicerad 9 nov |
| 15 | 024 Lammet klär på sig | `avsnitt/024-lammet-klar-pa-sig/film/avsnitt-024.mp4` | 2:46 | ca 2:52 | bra: mössa, strumpor och stövlar på för att gå ut | byggd 11 nov, inte publicerad än. Ta den slutliga filen |
| 16 | Gissa teckningen: tåget | teckningen i `produktion/youtube/shorts/gissa/fordon/tag/`, renderas liggande med luckan | ca 16 s | ca 22 s | svagt: en leksak att önska sig | teckningen finns |
| 17 | Tittut med leoparden på lekplatsen | `produktion/youtube/tittut/lekplatsen/leoparden-lova/leoparden-lova.mp4` | 2:26 | ca 2:32 | svagt: ett av kalenderns djur, ingen vinter | publicerad 9 nov |
| 18 | 019 Rosa sången | `avsnitt/019-rosa-favoritfarg/film/avsnitt-019.mp4` | 3:37 | ca 3:44 | svagt: en sång, och kaninen är kalenderns värd. Glass och rosa moln | publicerad 10 nov |
| 19 | Tittut med lammet vid granen | `produktion/youtube/tittut/skogen-gron/lammet-ludde/lammet-ludde.mp4` | 2:24 | ca 2:30 | hyfsat: en gran, tre dagar innan granen ritas. Skogen är sommargrön | publicerad 9 nov |
| 21 | 016 Blinka lilla stjärna | `avsnitt/016-blinka-lilla-stjarna/film/avsnitt-016-grovklipp.mp4` | 2:39 | ca 2:45 | bra: stjärnan på natthimlen, årets längsta natt | **inte färdig:** bara ett grovklipp, inte godkänt. Se reserven |
| 21, reserv | Tittut med hunden på lekplatsen | `produktion/youtube/tittut/lekplatsen/hunden-hugo/hunden-hugo.mp4` | 2:37 | ca 2:43 | svagt: ett av kalenderns djur, ingen vinter | publicerad 11 nov |

De två Gissa teckningen-luckorna är hela filmer redan: en teckning från första strecket till att den blir levande. De renderas om liggande med luckan (`lucka: N` i teckningens data). Då ersätter kalendern introt och *"Hej då!"*, och frågan blir *"Vad blir det?"*. De färdiga filerna i `produktion/youtube/shorts/gissa/export/` används inte som de är: de är stående, från 7 november, och `gissa-katt.mp4` innehåller frågan som aldrig ska användas.

**Alla videor i tabellen och reserven är genomlyssnade i sin helhet** (whisper, 2026-11-11) efter de två fraser som är strukna, *"Vad kan det vara?"* och *"Vad säger man?"*. De är rena. Två videor som passar dagarna bättre föll på det, och eftersom videorna visas oklippta går fraserna inte att ta bort:

| Video | Fil | Längd | Passar | Faller på |
|---|---|---|---|---|
| 014 Gröna sången | `avsnitt/014-grona-traktorn/film/avsnitt-014.mp4` | 3:37 | hyfsat: grönt som granen, leoparden | *"Vad kan det vara?"* i ritintrot, ca 0:16 |
| 020 Grisen badar | `avsnitt/020-grisen-badar/film/avsnitt-020.mp4` | 4:18 | hyfsat: julbadet, grisen | *"Vad säger man?"* i tackscenen, ca 1:49 |

Om de får vara med ändå är ett beslut för Sanna (avsnitt 4).

Reserv, en hel, färdig, publicerad och genomlyssnad film:

| Reserv | Fil | Längd | Passar |
|---|---|---|---|
| Tittut med kaninen vid svampen | `produktion/youtube/tittut/skogen-gron/kaninen-kanel/kaninen-kanel.mp4` | 2:29 | kalenderns värd |

Används inte: buss- och badavsnitten 003 och 004 och Orangea sången 006 (sommar, och inte genomlyssnade), godnattsagorna (finns bara stående), och det som inte är färdigt: 011 och 030 (grovklipp), 021–023 (byggda 11 nov, inte publicerade), 028 och 029 (förhandsvisningar). 001, 002, 008–010, 012, 017, 018 och 025–027 har ingen film.

### Djuren

Kaninen är kalenderns värd: den pekar på luckan varje dag och kommer själv in först på julafton. Bakom de nybyggda luckorna turas fem djur om. Alla sex har v2-rigg, en egen ljudfamilj och färdiga hej-repliker (utom grisen och björnen, som får fyra korta nya). Alla utom grisen kommer också tillbaka i de hela videorna.

| Djur | Nybyggda luckor | I hela videor | Läten som finns | Malins hej och hej då |
|---|---|---|---|---|
| lammet | 2, 7, 13, 24 | 10, 15, 19 | `ba`, `ba-fniss`, `ba-gullig` 1–8 | finns: `tittut/lamm-hej`, `lamm-hejda`, `lamm-var` |
| hunden | 3, 8 | 21 | `vov-babbel`, `vov-pip`, `vov-ja`, `vov-fniss`, `vov-hejda` | finns: `tittut/hund-hej`, `hund-hejda` |
| björnen | 4, 20, 24 | 14 | `brum-gullig` 1–8 (hej: `1c`–`1f`) | nya: 29 och 30 i röstlistan |
| grisen | 5, 23 | – | `noff-gullig` 1–9, `noff-fniss` 1–3 | nya: 27 och 28 i röstlistan |
| leoparden | 6 | 17 | `spinn-gullig` 1–8 (hej `1c`–`1f`, hej då `8c`–`8f`), `spinn-fniss`. Inte genomlyssnade av Sanna än | finns: `tittut/leopard-hej`, `leopard-hejda` |
| kaninen | pekar varje dag, 24 | 11, 18 | `kanin-gullig`, `kanin-hej-4`, `kanin-hejda-2` | finns: `tittut/kanin-hej`, `kanin-hejda` |

Riggarna ligger i `assets/karaktarer/<mapp>/premium/` (`lammet-ludde`, `hunden-hugo`, `bjornen-bulle`, `grisen-greta`, `leoparden-lova`, `kaninen-kanel`). Mappnamnen är interna och sägs aldrig.

### Det motorn behöver utöver piloterna

| Tillägg | Används i |
|---|---|
| **Liggande ram:** `lucka.js` och `djur.js` ritar 1920×1080 (i dag bara 1080×1920), och `gissa.js` tar `lucka` också i sitt liggande läge (i dag bara stående). Det stående läget finns kvar för extraversionen | alla |
| `sak`: en sak per lucka, ritad i kod eller en png, på en av fyra platser: bredvid djuret, ovanför, i handens spets, på huvudet | 4, 5, 6, 7, 8, 13, 20, 23, 24 |
| `kvall`: nattblå himmel och måne i stället för ljusblå | 6, 13, 20, 24 |
| Kritan som kommer in och tänder ljusen (gissas krita, liten, utan ansikte) | 6, 20 |
| Tre rörelser: `glid` (djuret och pulkan glider tillsammans, ut till höger och in från vänster), `ga` (riggens gång) och `peka` | 5, 13, 23 |
| Tre figurer i samma scen, och en annan slutreplik än *"Vi ses i morgon!"* | 24 |
| Hel video bakom luckan: ramens öppning renderas med videons första bild bakom luckan och stängningen med den sista, och de fogas till den orörda videon med ffmpeg | 10, 11, 14, 15, 17, 18, 19, 21 |
| Ramens ljud utan *"Vi ses i morgon!"*, som val i `lucka.js`, till den långa videon | alla, se avsnitt 5 |

Gissa-luckorna (12, 16) behöver inget annat än den liggande ramen: `gissa.js` kan redan köra en teckning med `lucka: N` i stående läge.

---

## 2. De 24 luckorna

Varje djurlucka börjar med *"Hej <djuret>!"* och slutar med *"Hej då <djuret>!"*. De står inte i tabellen. Undantag: 13 (Lucia, ingen hälsning), 24 och luckorna med hela videor, som bara har ramens repliker. Siffrorna framför replikerna är numren i röstlistan i avsnitt 3. *finns* betyder att repliken redan är inspelad.

| Lucka | Tema | Djur | Det här händer | Variant | Malin säger | Läten och ljud | Sak | Plats |
|---|---|---|---|---|---|---|---|---|
| **1** tis 1 dec | Stjärnan | inget (kritan och suddgummit) | Kritan ritar en gul fläck som får uddar. Paus 4 s: en stjärna! Sedan en mörkblå himmel bakom den. Så ritar kritan ett moln, och stjärnan försvinner. Suddgummit kommer och suddar bort molnet i tre drag. Stjärnan tindrar igen, och vi tackar suddgummit. Byggd, liggande, ca 43 s | E | finns: *Vad ritar kritan?*<br>finns: *Vad blir det?*<br>41 `[excited]` En stjärna!<br>97 `[warm]` En mörkblå himmel.<br>98 `[surprised]` Oj! Ett moln.<br>99 `[curious]` Var är stjärnan?<br>100 `[excited]` Här kommer suddgummit!<br>101 `[playfully]` Sudd, sudd, sudd!<br>42 `[warm]` Stjärnan blinkar.<br>102 `[happy]` Tack, suddgummit! | `skrrrrt-lang`, `pop`, `skrubb` × 3, `glitter`, `pling` | stjärna, himmel och moln, i kod | papperet |
| **2** ons 2 dec | Tittut i snön | lammet | Luckan stängs. Lammet kikar fram vid kanten. Luckan öppnas: tittut! Två varv. Piloten | D | bara repliker som finns: *Borta!* · *Var är lammet?* · *Tittut!* · *Borta igen!* · *Tittut! Där är du!* | `ba`, `ba-fniss` | ingen | snön |
| **3** tors 3 dec | Snöflingorna | hunden | Det börjar snöa. Hunden hoppar och fångar en flinga på nosen, tre gånger. I pausen hoppar hunden igen | B | 43 `[excited]` Titta, det snöar!<br>44 `[playfully]` En snöflinga! En till! Och en till!<br>45 `[warm]` Kan du också hoppa? | `vov-babbel`, `vov-pip` på varje flinga, `hopp-mjuk`, `landa-mjuk`, `vov-hejda` | snöflingor, i kod | snön |
| **4** fre 4 dec | Pepparkakan | björnen | Ett pepparkakshjärta poppar fram bredvid björnen och gungar i takt. Björnen dansar: vaggar, klappar, små hopp | C | 46 `[excited]` En pepparkaka!<br>31 `[cheerfully]` Nu dansar vi!<br>32 `[warm]` Dansa du också! | `brum-gullig-1c`, `brum-gullig-3` (fniss), `klapp` i takt | pepparkakshjärta, i kod | snön |
| **5** lör 5 dec | Pulkan | grisen | Grisen sitter i pulkan och åker snett ner över kullen, ut till höger och in igen uppe till vänster. Tre åk | B | 47 `[excited]` En pulka!<br>48 `[playfully]` Grisen åker pulka. Wiii!<br>40 `[happy]` En gång till!<br>49 `[playfully]` Kan du säga wiii? | `noff-gullig-1`, `glid` per åk, `noff-fniss` på tredje åket | pulka, i kod (röd skål, gult snöre). Reserv: ny, görs med Sanna | snön |
| **6** sön 6 dec, andra advent | Adventsljusen | leoparden | Fyra ljus står i snön. Kritan kommer in och tänder två, ett i taget. Leoparden tittar. När vi räknar igen blinkar lågorna till, en i taget | A | 38 `[warm]` Kritan tänder ljusen.<br>50 `[gently]` Ett … två.<br>51 `[happy]` Två ljus! Det är advent.<br>39 `[warm]` Räkna med mig.<br>50 en gång till | `spinn-gullig-1c`, `glimt` per låga, `spinn-gullig-4` (mysig suck) | fyra ljus, i kod | snön på kvällen |
| **7** mån 7 dec | Julkulan | lammet | En röd kula hänger i en grankvist uppe i bild. Lammet puttar med nosen, kulan gungar och plingar. Tre gånger. I pausen vaggar lammet från sida till sida | A | 52 `[excited]` En julkula!<br>53 `[playfully]` Lammet puttar. Den gungar!<br>40 `[happy]` En gång till!<br>54 `[warm]` Kan du gunga som kulan? | `ba`, `ding` per putt, `ba-fniss` | julkula på en kvist, i kod | snön |
| **8** tis 8 dec | Snögubben | hunden | Hunden puttar fram en snöboll, och den hoppar på plats. Tre bollar blir en stapel. Sedan poppar morotsnäsan fram. Hunden vinkar till snögubben | B | 55 `[cheerfully]` Hunden bygger i snön.<br>56 `[playfully]` En boll. En boll till. Och en till!<br>57 `[excited]` En snögubbe!<br>58 `[warm]` Kan du vinka till snögubben? | `puff` per boll, `pop` (näsan), `vov-ja` | snögubbe, i kod (tre bollar, morot, två kolprickar, ingen mun) | snön |
| **9** ons 9 dec | Paketet | inget (kritan och suddgummit) | Kritan ritar en röd låda och ett gult band i kors. Paus 4 s: ett paket! Sedan gröna grankvistar ovanför: paketet ligger under granen. Kritan ska rita rosetten, men bandet trasslar sig till en gul härva ovanpå paketet. Suddgummit suddar bort härvan i tre drag. Kritan ritar en fin rosett, paketet glimmar, och vi tackar suddgummit. Ca 45 s | E | finns: *Vad ritar kritan?*<br>finns: *Vad blir det?*<br>59 `[excited]` Ett paket!<br>60 `[warm]` Paketet ligger under granen.<br>103 `[surprised]` Oj! Bandet har trasslat sig.<br>108 `[curious]` Hm … vad gör vi nu?<br>100 Här kommer suddgummit!<br>101 Sudd, sudd, sudd!<br>104 `[happy]` En rosett!<br>61 `[warm]` Vi öppnar det på julafton.<br>102 Tack, suddgummit! | `skrrrrt-lang`, `pop`, `skrubb` × 3, `glitter`, `pling` | paket, grankvistar, härva och rosett, i kod | papperet |
| **10** tors 10 dec | Bä, bä, vita lamm: ull och varma strumpor | lammet | **Hela 015 Bä, bä, vita lamm**: `avsnitt/015-ba-ba-vita-lamm/film/avsnitt-015.mp4` (1:29, luckan ca 1:36). Lammet har säcken full av ull, fryser om fötterna och får strumpor | G | inga nya, videons egna | videons egna (sången) | i videon | i videon |
| **11** fre 11 dec | Röda sången: rött som julen | kaninen | **Hela 013 Röda sången**: `avsnitt/013-rod-brandbil/film/avsnitt-013-final.mp4` (2:43, luckan ca 2:50). Kaninen kör brandbilen och letar rött: en ballong, ett äpple, en blomma | G | inga nya, videons egna | videons egna (sången) | i videon | i videon |
| **12** lör 12 dec | Katten | inget (kritan ritar) | **Gissa teckningen: katten**, teckningen i `produktion/youtube/shorts/gissa/bondgarden/katt/`, renderad om liggande med luckan (ca 25 s i allt). Kritan ritar, paus 4 s, katten säger mjau och smyger ut. En ordlek dagen före Lucia: lussekatten | G | inga nya, gissas egna: *Hmm …* · *Vad blir det?* · *En katt!* · *Katten säger mjau.* | `mjau` | katt, i kod (finns) | papperet |
| **13** sön 13 dec, Lucia och tredje advent | Lucia | lammet | Kväll. Lammet står med en ljuskrona på huvudet. Ljusen tänds, ett i taget. Lammet går tre små steg. I pausen tassar lammet vidare. Ingen hälsning: luckan öppnas och stängs i stillhet | A | 70 `[softly]` Det är Lucia.<br>71 `[gently]` Lammet har ljus i sin krona.<br>72 `[softly]` Tass … tass … tass.<br>73 `[warm]` Kan du gå på tå, så tyst? | `glimt` per ljus, `tass` per steg, `ba-gullig-4` | ljuskrona, i kod (grön krans, fyra ljus) | snön på kvällen |
| **14** mån 14 dec | Bruna sången: choklad och kola | björnen | **Hela 007 Bruna sången**: `avsnitt/007-bruna-ladbilen/film/avsnitt-007-v2-final.mp4` (3:51, luckan ca 3:57). Björnen kör lastbilen och letar brunt: choklad, kola och en kanelbulle att dela | G | inga nya, videons egna | videons egna (sången) | i videon | i videon |
| **15** tis 15 dec | Lammet klär på sig: mössan på | lammet | **Hela 024 Lammet klär på sig**: `avsnitt/024-lammet-klar-pa-sig/film/avsnitt-024.mp4` (2:46, luckan ca 2:52). Lammet ska ut och får en röd mössa, strumpor och stövlar. Byggd 11 nov och inte publicerad än: ta den slutliga filen | G | inga nya, videons egna | videons egna | i videon | hallen (i videon) |
| **16** ons 16 dec | Leksakståget | inget (kritan ritar) | **Gissa teckningen: tåget**, teckningen i `produktion/youtube/shorts/gissa/fordon/tag/`, renderad om liggande med luckan (ca 22 s i allt). Kritan ritar, paus 4 s, tåget tuffar ut åt höger. En leksak att önska sig i julklapp | G | inga nya, gissas egna: *Hmm …* · *Vad blir det?* · *Ett tåg!* | gissas egna | tåg, i kod (finns) | papperet |
| **17** tors 17 dec | Tittut med leoparden | leoparden | **Hela Tittut med leoparden på lekplatsen**: `produktion/youtube/tittut/lekplatsen/leoparden-lova/leoparden-lova.mp4` (2:26, luckan ca 2:32). Leoparden gömmer sig bakom bollen, bakom rutschkanan och i sandlådan, och kommer fram varje gång | G | inga nya, videons egna | videons egna | i videon | lekplatsen (i videon) |
| **18** fre 18 dec | Rosa sången | kaninen och musen | **Hela 019 Rosa sången**: `avsnitt/019-rosa-favoritfarg/film/avsnitt-019.mp4` (3:37, luckan ca 3:44). Musen och kaninen letar rosa, hoppar upp på de rosa molnen och delar glass | G | inga nya, videons egna | videons egna (sången) | i videon | i videon |
| **19** lör 19 dec | Tittut vid granen | lammet | **Hela Tittut med lammet vid granen**: `produktion/youtube/tittut/skogen-gron/lammet-ludde/lammet-ludde.mp4` (2:24, luckan ca 2:30). Lammet gömmer sig bakom bärbusken, bakom den stora granen och i stocken, och kommer fram varje gång | G | inga nya, videons egna | videons egna | i videon | gröna skogen (i videon) |
| **20** sön 20 dec, fjärde advent | Fyra ljus | björnen | Samma scen som lucka 6. Kritan tänder alla fyra. När vi räknar igen blinkar lågorna till, en i taget | A | 38 Kritan tänder ljusen.<br>84 `[gently]` Ett … två … tre … fyra.<br>85 `[happy]` Fyra ljus! Snart är det jul.<br>39 Räkna med mig.<br>84 en gång till | `brum-gullig-1c`, `glimt` per låga, `brum-gullig-4` | fyra ljus (från lucka 6) | snön på kvällen |
| **21** mån 21 dec, vintersolståndet | Blinka lilla stjärna | hunden och nyckelpigan | **Hela 016 Blinka lilla stjärna**, när avsnittet är färdigt. I dag finns bara grovklippet `avsnitt/016-blinka-lilla-stjarna/film/avsnitt-016-grovklipp.mp4` (2:39, luckan ca 2:45). Hunden och nyckelpigan tittar på stjärnan från en filt på kullen och somnar. Blir avsnittet inte klart: hela Tittut med hunden på lekplatsen, `produktion/youtube/tittut/lekplatsen/hunden-hugo/hunden-hugo.mp4` (2:37, luckan ca 2:43) | G | inga nya, videons egna | videons egna (sången) | i videon | nattkullen (i videon) |
| **22** tis 22 dec | Julgranen | inget (kritan och suddgummit) | Kritan ritar tre gröna taggar uppifrån och ner, och sist stammen. Paus 4 s: en gran! Sedan en ljusblå snökulle under den: granen står i snön. Kritan ritar en ljusslinga tvärs över granen, men den blir grå och lyser inte. Suddgummit suddar bort den grå slingan i tre drag. Kritan ritar en ny slinga med gula ljus, granen tindrar, och vi tackar suddgummit. Ca 45 s | E | finns: *Vad ritar kritan?*<br>finns: *Vad blir det?*<br>86 `[excited]` En gran!<br>105 `[warm]` Granen står i snön.<br>106 `[surprised]` Oj! Ljusen lyser inte.<br>108 Hm … vad gör vi nu?<br>100 Här kommer suddgummit!<br>101 Sudd, sudd, sudd!<br>107 `[excited]` Gula ljus!<br>87 `[warm]` Granen lyser.<br>102 Tack, suddgummit! | `skrrrrt-lang`, `pop`, `skrubb` × 3, `glitter`, `pling` | gran, snökulle och ljusslinga, i kod | papperet |
| **23** ons 23 dec | Vi klär granen | grisen | Granen från lucka 22 står i snön. Tre kulor hoppar upp i den, en i taget. Sist landar stjärnan i toppen. I pausen pekar grisen på stjärnan, som börjar skimra efter 3 s | A | 88 `[cheerfully]` Nu klär vi granen.<br>89 `[playfully]` En kula. En till. Och en till!<br>90 `[excited]` Och stjärnan i toppen!<br>91 `[warm]` Kan du peka på stjärnan? | `ding` per kula, `tindra-3` (stjärnan), `noff-gullig-2` | gran, kulor och stjärna (från lucka 22, 7 och 1) | snön |
| **24** tors 24 dec, julafton | Julafton | kaninen, med lammet och björnen | Kväll. Den klädda granen lyser, de fyra ljusen brinner och paketet från lucka 9 ligger under granen. Kaninen vinkar och hoppar. Paketet skramlar. Paus 4 s. Locket poppar av och nallen tittar upp. Kaninen nickar. Lammet och björnen kommer in med ett hopp var, och alla tre vinkar | J | finns: *Hej kaninen!*<br>92 `[excited]` Idag är det julafton!<br>93 `[curious]` Vad finns i paketet?<br>94 `[excited]` En nalle!<br>95 `[warm]` Tack!<br>96 `[happy]` God jul!<br>ramen slutar med 26 *Vi ses snart!* | `kanin-hej-4`, `skrammel`, `pop`, `kanin-gullig-2`, sedan `ba` och `brum-gullig-1c`, `glitter` | gran, kulor, stjärna, ljus och paket (från tidigare luckor), nallen (finns, 007) | snön på kvällen |

Fördelningen: 14 nybyggda luckor (5 julsaker, 3 snölekar, 1 dans, 1 tittut, 3 sagor som kritan ritar, och julafton) och 10 luckor med en hel video vi redan har (åtta avsnitt och två Gissa teckningen). Av de nybyggda är 1–8 redan byggda eller under bygge, så det som återstår att bygga är sex: 9, 13, 20, 22, 23 och 24.

Det som ströks i lucka 9–24 och vad som kom i stället:

| Lucka | Struket bygge | Ersatt av |
|---|---|---|
| 10 | Varm choklad: björnen dricker tre klunkar | hela 015 Bä, bä, vita lamm |
| 11 | Julramsan med grisen | hela 013 Röda sången |
| 12 | Lussekatten: leoparden äter | Gissa teckningen, katten |
| 14 | Spåren i snön: björnen går och stampar | hela 007 Bruna sången |
| 16 | Bjällran: hunden skakar | Gissa teckningen, tåget |
| 17 | Polkagrisen: grisen dansar | hela Tittut med leoparden på lekplatsen |
| 18 | Isbanan: leoparden åker kana | hela 019 Rosa sången |

Lucka 15, 19 och 21 hade redan befintligt material: nu är de hela 024 Lammet klär på sig, hela Tittut med lammet vid granen och hela 016 Blinka lilla stjärna. Julbadet (Grisen badar) ströks från lucka 19, eftersom videon innehåller en struken replik. Kvar som nybyggen är de som bär kalendern: paketet (9, som öppnas på julafton), Lucia (13), fjärde advent (20), granen som ritas (22) och kläs (23), och julafton (24).

Kontroll mot reglerna:

- Inga djurnamn i något som sägs eller i röstfilernas namn. Djuren heter lammet, hunden, björnen, grisen, leoparden och kaninen.
- Frågan i kritans sagor och i gissa-filmerna är *"Vad blir det?"* (`vad-blir-det-1`). Ingen lucka frågar barnet vad man säger: i sagorna och på julafton säger Malin bara *"Tack!"*.
- Suddgummit har inget ansikte, precis som kritan. Felen i sagorna är små och löses direkt med kompisens hjälp.
- Ljusen tänds av kritan eller av sig själva, aldrig av ett djur. Lågorna är små och stilla.
- Lucka 24 har tre figurer, vilket är taket i `format/regler.md`. Inga andra luckor har mer än en.
- Kalendern är liggande videor, inte Shorts. Reglerna i `format/shorts.md` (längdtaket, nedersta fjärdedelen fri, att filmen ska gå runt) gäller bara den stående extraversionen. Djurluckorna följer Tittuts och bilderbokens regler för figurer.
- Luckorna med hela videor visar bara eget material. Sångerna i 015 och 016 är traditionella visor, fria från upphovsrätt. Ingen video klipps inuti.
- De hela videorna har andra platser än snön (hallen, lekplatsen, sommarskogen, vägen) och är mycket längre än de nybyggda luckorna. Det är priset för att de är gratis, och luckans ram håller ihop dem.
- Ingen av de valda videorna innehåller *"Vad kan det vara?"* eller *"Vad säger man?"* (genomlyssnade med whisper). Gröna sången och Grisen badar gör det och är därför inte med.
- YouTube-texten: *"Julkalender lucka 3: Hunden fångar snöflingor"*. Aldrig figurernas interna namn.

---

## 3. Inköpslistan

### Nya bilder

**Inga nya bilder behövs** om sakerna ritas i kod som kritteckningar, som stjärnan i lucka 1. Tre saker är reserver: blir kodversionen inte bra görs en bild tillsammans med Sanna (Flow, fyra tagningar, Sanna väljer).

| Reserv | Luckor | Varför den kan behöva en bild |
|---|---|---|
| Pulkan | 5 | djuret sitter i den, och den ska se ut som en sak man kan åka i |
| Granen | 22, 23, 24 | syns i tre luckor och är stor i bild |
| Snögubben | 8 | tre vita bollar mot vit snö kan bli svårlästa |

Sak som redan finns och används: nallen (24). Platsen i de nybyggda luckorna är snön i kod, på dagen och på kvällen. Luckorna med hela videor behöver inga saker.

Saker i kod, alla återanvända där det går: stjärna (1, 23, 24), himmel och moln (1), snöflingor (3), pepparkakshjärta (4), pulka (5), ljus (6, 20, 24), julkula (7, 23, 24), snögubbe (8), paket med rosett (9, 24), grankvistar och härva (9), ljuskrona (13), gran med ljusslinga (22, 23, 24), snökulle (22). Suddgummit ritas också i kod och finns i `rita.js`.

### Malins repliker: en batch

87 korta filer, i inspelningsordning. Numren är desamma som i förra versionen av planen, eftersom lucka 4–8 byggs efter dem. Därför finns det hål i nummerserien där strukna luckors repliker låg (33–37, 62–69, 74–83), och sagornas nya repliker har fått 97–108. Röst och inställningar som i bilderboken: Malin, Eleven v3, stability 0,5, similarity 0,75. Fyra tagningar (ram, gemensamma, luckorna, kritans sagor), delade med `verktyg/dela-tagning.py` till `assets/ljud/roster/jul/`. Siffrorna i replikerna skrivs med bokstäver så att de läses rätt.

**Tagning 1: ramen** (filnamnen är de som `lucka.js` läser)

| Nr | Fil | Replik |
|---|---|---|
| 1 | `lucka-1` | `[excited]` Idag öppnar vi lucka ett! |
| 2 | `lucka-2` | `[excited]` Idag öppnar vi lucka två! |
| 3 | `lucka-3` | `[excited]` Idag öppnar vi lucka tre! |
| 4 | `lucka-4` | `[excited]` Idag öppnar vi lucka fyra! |
| 5 | `lucka-5` | `[excited]` Idag öppnar vi lucka fem! |
| 6 | `lucka-6` | `[excited]` Idag öppnar vi lucka sex! |
| 7 | `lucka-7` | `[excited]` Idag öppnar vi lucka sju! |
| 8 | `lucka-8` | `[excited]` Idag öppnar vi lucka åtta! |
| 9 | `lucka-9` | `[excited]` Idag öppnar vi lucka nio! |
| 10 | `lucka-10` | `[excited]` Idag öppnar vi lucka tio! |
| 11 | `lucka-11` | `[excited]` Idag öppnar vi lucka elva! |
| 12 | `lucka-12` | `[excited]` Idag öppnar vi lucka tolv! |
| 13 | `lucka-13` | `[excited]` Idag öppnar vi lucka tretton! |
| 14 | `lucka-14` | `[excited]` Idag öppnar vi lucka fjorton! |
| 15 | `lucka-15` | `[excited]` Idag öppnar vi lucka femton! |
| 16 | `lucka-16` | `[excited]` Idag öppnar vi lucka sexton! |
| 17 | `lucka-17` | `[excited]` Idag öppnar vi lucka sjutton! |
| 18 | `lucka-18` | `[excited]` Idag öppnar vi lucka arton! |
| 19 | `lucka-19` | `[excited]` Idag öppnar vi lucka nitton! |
| 20 | `lucka-20` | `[excited]` Idag öppnar vi lucka tjugo! |
| 21 | `lucka-21` | `[excited]` Idag öppnar vi lucka tjugoett! |
| 22 | `lucka-22` | `[excited]` Idag öppnar vi lucka tjugotvå! |
| 23 | `lucka-23` | `[excited]` Idag öppnar vi lucka tjugotre! |
| 24 | `lucka-24` | `[excited]` Idag öppnar vi lucka tjugofyra! |
| 25 | `vi-ses-i-morgon` | `[warm]` Vi ses i morgon! |
| 26 | `vi-ses-snart` | `[warm]` Vi ses snart! |

**Tagning 2: gemensamma** (används i flera luckor)

| Nr | Fil | Replik | Luckor |
|---|---|---|---|
| 27 | `gris-hej` | `[happy]` Hej grisen! | 5, 23 |
| 28 | `gris-hejda` | `[happy]` Hej då grisen! | 5, 23 |
| 29 | `bjorn-hej` | `[happy]` Hej björnen! | 4, 20 |
| 30 | `bjorn-hejda` | `[happy]` Hej då björnen! | 4, 20 |
| 31 | `nu-dansar-vi` | `[cheerfully]` Nu dansar vi! | 4 |
| 32 | `dansa-du-ocksa` | `[warm]` Dansa du också! | 4 |
| 38 | `kritan-tander-ljusen` | `[warm]` Kritan tänder ljusen. | 6, 20 |
| 39 | `rakna-med-mig` | `[warm]` Räkna med mig. | 6, 20 |
| 40 | `en-gang-till` | `[happy]` En gång till! | 5, 7 |

**Tagning 3: luckorna** (piloten för lucka 1 läser `svar.m4a` och `saga.m4a` i sin egen mapp: 41 och 42 läggs där också. Rad 44 är tre filer, en per hopp)

| Nr | Fil | Replik |
|---|---|---|
| 41 | `01-en-stjarna` | `[excited]` En stjärna! |
| 42 | `01-stjarnan-blinkar` | `[warm]` Stjärnan blinkar. |
| 43 | `03-det-snoar` | `[excited]` Titta, det snöar! |
| 44 | `03-en-snoflinga` | `[playfully]` En snöflinga! |
| 44 | `03-en-till` | `[playfully]` En till! |
| 44 | `03-och-en-till` | `[playfully]` Och en till! |
| 45 | `03-kan-du-hoppa` | `[warm]` Kan du också hoppa? |
| 46 | `04-en-pepparkaka` | `[excited]` En pepparkaka! |
| 47 | `05-en-pulka` | `[excited]` En pulka! |
| 48 | `05-grisen-aker` | `[playfully]` Grisen åker pulka. Wiii! |
| 49 | `05-kan-du-saga-wiii` | `[playfully]` Kan du säga wiii? |
| 50 | `06-ett-tva` | `[gently]` Ett … två. |
| 51 | `06-tva-ljus` | `[happy]` Två ljus! Det är advent. |
| 52 | `07-en-julkula` | `[excited]` En julkula! |
| 53 | `07-den-gungar` | `[playfully]` Lammet puttar. Den gungar! |
| 54 | `07-kan-du-gunga` | `[warm]` Kan du gunga som kulan? |
| 55 | `08-hunden-bygger` | `[cheerfully]` Hunden bygger i snön. |
| 56 | `08-en-boll` | `[playfully]` En boll. En boll till. Och en till! |
| 57 | `08-en-snogubbe` | `[excited]` En snögubbe! |
| 58 | `08-kan-du-vinka` | `[warm]` Kan du vinka till snögubben? |
| 59 | `09-ett-paket` | `[excited]` Ett paket! |
| 60 | `09-under-granen` | `[warm]` Paketet ligger under granen. |
| 61 | `09-oppnar-pa-julafton` | `[warm]` Vi öppnar det på julafton. |
| 70 | `13-det-ar-lucia` | `[softly]` Det är Lucia. |
| 71 | `13-ljus-i-kronan` | `[gently]` Lammet har ljus i sin krona. |
| 72 | `13-tass` | `[softly]` Tass … tass … tass. |
| 73 | `13-ga-pa-ta` | `[warm]` Kan du gå på tå, så tyst? |
| 84 | `20-ett-till-fyra` | `[gently]` Ett … två … tre … fyra. |
| 85 | `20-fyra-ljus` | `[happy]` Fyra ljus! Snart är det jul. |
| 86 | `22-en-gran` | `[excited]` En gran! |
| 87 | `22-granen-lyser` | `[warm]` Granen lyser. |
| 88 | `23-vi-klar-granen` | `[cheerfully]` Nu klär vi granen. |
| 89 | `23-en-kula` | `[playfully]` En kula. En till. Och en till! |
| 90 | `23-stjarnan-i-toppen` | `[excited]` Och stjärnan i toppen! |
| 91 | `23-peka-pa-stjarnan` | `[warm]` Kan du peka på stjärnan? |
| 92 | `24-julafton` | `[excited]` Idag är det julafton! |
| 93 | `24-vad-finns-i-paketet` | `[curious]` Vad finns i paketet? |
| 94 | `24-en-nalle` | `[excited]` En nalle! |
| 95 | `24-tack` | `[warm]` Tack! |
| 96 | `24-god-jul` | `[happy]` God jul! |

**Tagning 4: kritans sagor**

| Nr | Fil | Replik | Luckor |
|---|---|---|---|
| 97 | `01-en-himmel` | `[warm]` En mörkblå himmel. | 1 |
| 98 | `01-ett-moln` | `[surprised]` Oj! Ett moln. | 1 |
| 99 | `01-var-ar-stjarnan` | `[curious]` Var är stjärnan? | 1 |
| 100 | `01-suddgummit` | `[excited]` Här kommer suddgummit! | 1, 9, 22 |
| 101 | `01-sudd-sudd-sudd` | `[playfully]` Sudd, sudd, sudd! | 1, 9, 22 |
| 102 | `01-tack-suddgummit` | `[happy]` Tack, suddgummit! | 1, 9, 22 |
| 103 | `09-bandet-trasslar` | `[surprised]` Oj! Bandet har trasslat sig. | 9 |
| 104 | `09-en-rosett` | `[happy]` En rosett! | 9 |
| 105 | `22-granen-i-snon` | `[warm]` Granen står i snön. | 22 |
| 106 | `22-ljusen-lyser-inte` | `[surprised]` Oj! Ljusen lyser inte. | 22 |
| 107 | `22-gula-ljus` | `[excited]` Gula ljus! | 22 |
| 108 | `vad-gor-vi-nu` | `[curious]` Hm … vad gör vi nu? | 9, 22 |

Redan inspelat och på plats i `assets/ljud/roster/jul/` (2026-11-11): ramens lucka 1–8 och *"Vi ses i morgon!"*, de gemensamma 27–32 och 38–40, och lucka 3–8. *"En stjärna!"* och *"Stjärnan blinkar."* finns som `svar.m4a` och `saga.m4a` i lucka 1:s mapp. Kvar att spela in: ramens 9–24 och 26, kritans sagor (97–108), och lucka 9, 13, 20, 22, 23 och 24.

Repliker som redan finns och återanvänds (lyssna på dem bredvid de nya, så att tonen stämmer): `tittut/lamm-hej`, `lamm-hejda`, `lamm-var`, `hund-hej`, `hund-hejda`, `leopard-hej`, `leopard-hejda`, `kanin-hej`, tittut-seriens *Borta!*, *Borta igen!*, *Tittut!* och *Där är du!*, samt `vad-ritar-kritan-1`, `hmm-N` och `vad-blir-det-1`. Lucka 2 och de tio luckorna med hela videor behöver inga nya repliker alls.

### Nya ljudeffekter

En, sökt på Openverse först (CC0 eller CC BY), ElevenLabs bara om inget passar.

| Ljud | Luckor | Sökord |
|---|---|---|
| `skrammel` | 24 | något litet som skramlar i en kartong, mjukt |

Allt annat finns: `skrrrrt-lang`, `skrubb` (suddgummit), `pling`, `glimt`, `glitter`, `tindra-3`, `ding`, `pop`, `puff`, `glid`, `tass`, `klapp`, `hopp-mjuk`, `landa-mjuk` och djurens ljudfamiljer.

### Miniatyrer

Liggande videor behöver var sin miniatyr (1280×720), vilket Shorts inte gjorde. Förslaget är en mall som ger alla 24 i en körning: luckans röda dörr med dagens siffra, och dagens djur eller sak bredvid, tagen ur en stillbild av luckan. Inga nya bilder.

---

## 4. Beslut för Sanna

Beslut märkta *(nytt)* eller *(ändrat)* har tillkommit eller ändrats sedan kalendern blev liggande och fick hela videor bakom tio luckor.

**1. Hela videor bakom tio luckor (ändrat).** Lucka 10, 11, 12, 14, 15, 16, 17, 18, 19 och 21 visar en video vi redan har, hela, och bara sex luckor återstår att bygga. Som helheter passar tre av dem vintern bra: Bä, bä, vita lamm (10), Lammet klär på sig (15) och Blinka lilla stjärna (21). Tre passar hyfsat: Röda sången (11), Bruna sången (14) och Tittut vid granen (19). Fyra passar svagt: gissa-filmerna med katten (12) och tåget (16), Tittut med leoparden (17) och Rosa sången (18). Rekommendation: **kör på de tio.** Vill du byta någon finns reserverna i avsnitt 1.

**2. Avsnittens egna intro och outro (nytt).** När luckan öppnas mot ett helt avsnitt kommer först avsnittets eget intro (logotypen, avsnittsnumret och titeln, ca 9 s i sångavsnitten och ca 3 s i bilderböckerna och Tittut), och sist dess slut. Två vägar:

| | Väg | Följd |
|---|---|---|
| **A** | Hela filen som den är, med intro och outro | inget arbete och ingen bedömning per video. Men det blir två öppningar efter varandra, och titelkortet säger *avsnitt 13* i lucka 11 |
| **B** | Luckan öppnas direkt mot första scenen och stängs efter den sista | tätare, och videon känns som kalenderns egen. Men två klippunkter ska hittas per video, och det är inte längre hela filen |

Rekommendation: **A.** Det är det du bad om, hela videor, och det kostar ingenting. Stör de dubbla öppningarna när du ser lucka 10, är B en liten ändring: ramen fogas bara till en annan första och sista bild.

**3. Samma videor publiceras en gång till (nytt).** Sex av de åtta avsnitten ligger redan på kanalen (015, 013, 007, 019 och Tittut med leoparden och med lammet). I kalendern läggs de ut igen, med luckan runt, och ligger då två gånger på kanalen. 024 är inte publicerad än, och 016 är inte färdig. Bekräfta att det är så du vill ha det. Rekommendation: **ja, det är det som gör kalendern möjlig att hinna med**, men jag har inte kontrollerat hur YouTube ser på samma film två gånger på en kanal. Det är värt en titt innan lucka 10 går ut.

**4. Längden (ändrat).** Djurluckorna är ca 26 s och kritans sagor ca 45 s. Åtta luckor är nu hela avsnitt på 1,5–4 min: längst är Bruna sången (ca 3:57) och Rosa sången (ca 3:44). Den långa videon på julafton blir ca 30 min i stället för 12. Rekommendation: **låt det vara så**, eftersom det följer av att videorna visas hela.

**5. Lucka 21 (ändrat).** Hela 016 Blinka lilla stjärna passar dagen bäst, men avsnittet är bara ett grovklipp och inte godkänt. Rekommendation: **gör klart 016 före 21 december och använd det.** Hinner det inte bli klart går hela Tittut med hunden på lekplatsen in i stället (färdig och publicerad, 2:37).

**6. Två videor med strukna repliker (nytt).** Gröna sången och Grisen badar passar sina dagar bättre än det som nu står i lucka 17 och 18, men Gröna sången har *"Vad kan det vara?"* i ritintrot och Grisen badar har *"Vad säger man?"* i tackscenen. Eftersom videorna visas oklippta går replikerna inte att ta bort. Planen har därför Tittut med leoparden (17) och Rosa sången (18), och granen står i lucka 19. Rekommendation: **håll fast vid reglerna.** Båda avsnitten ligger redan ute som de är, så säg till om du tycker att de får vara med ändå: då går Grisen badar in i lucka 18 som julbadet och Gröna sången i lucka 17.

**7. Sångerna (ändrat).** Du vill ha några luckor med en sång om julen, och du har sagt att ingen ny musik ska göras eftersom den kostar för mycket. Tre vägar, den billigaste först:

| | Väg | Kostar | Ger |
|---|---|---|---|
| **A** | Hela sångavsnitt vi redan har bakom luckan: Bä, bä, vita lamm (10), Röda sången (11), Bruna sången (14), Rosa sången (18) och Blinka lilla stjärna (21) | 0 kr, och ingen ny bild | fem luckor med en hel sång. Ingen av dem säger ordet jul, men stjärnan och strumporna hör vintern till |
| **B** | Bygg julramsan (avsnitt 1) i stället för en av videorna, med Malin över `gissa-bad.m4a` | 0 kr, men en lucka till att bygga och fem repliker till | en ramsa som säger ordet jul, ingen sång |
| **C** | **En** ny julsång på ca 25 s med ramsans text, använd i lucka 4 (som dansmusik), i en byggd ramslucka och på julafton | **kostar Suno-krediter**, en omgång, och en lucka till att bygga | en sång om julen i tre luckor |

Rekommendation: **A**, som planen är skriven. Allt är gratis och inget väntar på musik. B och C går att lägga till senare utan att något annat ändras.

**8. Sakerna: kritteckningar i kod eller riktiga urklipp?** De nybyggda luckornas saker ritas i kod, som stjärnan i lucka 1. Det kostar inget, men de får ett annat utseende än de släta djuren. Rekommendation: **kod.** De tre reserverna (pulkan, granen, snögubben) görs som bilder med dig bara om kodversionen inte håller.

**9. Ljusen.** Lucka 6, 13, 20 och 24 har levande ljus. Kritan tänder dem, och djuret tittar bara. Rekommendation: **ja**, advent och Lucia hör till. Säg till om du hellre vill ha lyktor eller ljusslingor.

**10. Julafton.** Tre figurer (kaninen, lammet och björnen), alla saker från tidigare luckor, paketet öppnas och ramen slutar med *"Vi ses snart!"*. Rekommendation: **tre figurer**, som är taket i `format/regler.md`.

**11. Ingen tomte.** En tomte är en ny figur som ska ritas och riggas. Rekommendation: **ingen tomte i år.**

**12. Röstbatchen.** 87 filer i fyra tagningar i ElevenLabs, varav ungefär hälften redan är inspelade. Det drar tecken på kontot. Rekommendation: **godkänn replikerna i tabellen först, sedan spelas allt in på en gång.** Claude kan göra det i webbläsaren när du har sagt ja.

**13. Bara på svenska.** En engelsk kalender dubblar röstarbetet. Rekommendation: **bara svenska i år.**

**14. Stående Shorts som extra.** Varje nybyggd lucka kan också renderas stående ur samma datafil och läggas ut som en Short. Rekommendation: **gör det bara för de fjorton nybyggda, och först när de liggande är klara.** De hela videorna får ingen stående version.

**15. Miniatyrer.** 24 liggande videor behöver var sin miniatyr. Rekommendation: **en mall som ger alla i en körning** (luckans röda dörr med siffran, och dagens djur eller sak). Säg till om du hellre vill ha färgstrimman från de vanliga avsnitten.

**16. Kritans två nya sagor (nytt).** Lucka 9 och 22 är skrivna som lucka 1, med var sitt lilla fel som suddgummit rättar till: i paketet trasslar bandet sig till en härva innan rosetten blir fin, och i granen blir ljusslingan grå och lyser inte förrän den ritas om i gult. Rekommendation: **bygg dem så.** Säg till om något av felen känns konstigt, så skriver jag ett annat.

---

## 5. Hela julkalendern

En lång video på julafton som spelar alla 24 luckor i rad. Luckorna är redan liggande, så den långa videon är helt enkelt de 24 färdiga filmerna efter varandra: inget nytt ritas och inget nytt spelas in.

| | |
|---|---|
| **Längd** | **ca 30 min.** De 14 nybyggda luckorna är tillsammans ca 7 min (elva på ca 26 s och kritans tre sagor på ca 45 s). De tio luckorna med hela videor är tillsammans ca 23,5 min: åtta avsnitt på 1:36–3:57 med ramen, och två gissa-filmer på under en halv minut |
| **Bild** | liggande 1920×1080, samma bild som i luckorna. Ingen omskalning och ingen bakgrund att lägga till |
| **Skarvarna** | varje lucka slutar på kalendern och nästa börjar på kalendern, med en lucka till öppen. Luckorna läggs rakt efter varandra, utan övergång |
| **Ljudet** | *"Vi ses i morgon!"* tas bort i lucka 1–23: ramens ljud renderas om utan repliken (`render.mjs --bara-ljud`, ingen ny bild). Lucka 24 behåller *"God jul!"* och *"Vi ses snart!"*. De hela videornas eget ljud rörs inte. Hela filmen mastras i två pass till −14 LUFS, topp högst −1,5 dBTP |
| **Början och slut** | börjar direkt på lucka 1 och slutar på lucka 24. Inget eget intro, inga nya repliker |
| **Kapitel** | 24 kapitel i beskrivningen: `0:00 Lucka 1 – Stjärnan`, `0:43 Lucka 2 – Tittut i snön` … |
| **Miniatyr** | skillen `miniatyrer` (färgstrimman): kalendern med kaninen som hjältebild, tidsbrickan *30 min* |
| **Titel** | *Hela julkalendern 🎄 \| Alla 24 luckor \| lilla kritan* |
| **Publicering** | julafton, samtidigt som lucka 24 eller strax efter. Gjort för barn, i samma spellista som luckorna |

Längden räknad lucka för lucka (med ramen): 10 ca 1:36 · 11 ca 2:50 · 12 ca 0:25 · 14 ca 3:57 · 15 ca 2:52 · 16 ca 0:22 · 17 ca 2:32 · 18 ca 3:44 · 19 ca 2:30 · 21 ca 2:45. Det är 23 min 32 s. Med de 14 nybyggda (ca 7 min) blir det drygt 30 min. Väljs väg B i beslut 2 (utan avsnittens intro och outro) blir den en dryg minut kortare.

Bygget är ett skript som tar de 24 liggande filmerna i ordning, byter ramens ljudspår till det utan *"Vi ses i morgon!"*, sätter ihop dem och mastrar. Prova det på lucka 1–5 den första veckan i december, så att julafton bara är en körning till.

Åtta av luckorna är hela avsnitt som redan ligger på kanalen eller kommer dit. De utgör ca 23 av videons 30 min. Det är samma fråga som beslut 3: avsnitten ligger då på kanalen en tredje gång, inuti den långa videon.

Kontroll före uppladdning: `ffprobe` visar 1920×1080 och 30 fps, längden är summan av luckorna, alla 24 nummer hörs i rätt ordning (whisper i bitar), *"Vi ses i morgon!"* hörs aldrig, och ett kontaktark med en bild per lucka visar 24 olika luckor.
