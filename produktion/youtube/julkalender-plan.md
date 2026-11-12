# Lilla Kritans julkalender 2026 – plan

24 liggande videor (1920×1080), en per dag 1–24 december. **Varje lucka är i första hand en liggande video.** Samma datafil kan också renderas stående som en Short, men det är ett valfritt extra och inte det som ska levereras (Sanna: *"i need laying down format for videos not youtube shorts mainly"*). Varje lucka har ett eget jultema.

Fjorton luckor byggs nya och är korta: ett djur som gör en julsak eller leker i snön, en dans, en tittut, tre små sagor som kritan ritar, och julafton. Djurluckorna är ca 20–30 s och kritans sagor ca 45 s. Tio luckor visar en video vi redan har, **hela videon från början till slut** (Sanna: *"they should not be clips of videos, full videos"*). Åtta av dem är hela avsnitt på 1,5–4 min, och två är korta Gissa teckningen-filmer. På julafton kommer också [hela julkalendern](#5-hela-julkalendern) som en lång video. **Förslag (avsnitt 6, väntar på Sannas ja):** de fjorton nybyggda luckorna blir små sagor på ca 3 minuter med ett problem i varje, och lucka 12 och 16 blir hela avsnitt. Raderna i avsnitt 2 ligger kvar som de är tills det är godkänt.

Planen är skriven 2026-11-11 och ändrad flera gånger samma dag: först kom luckorna med befintligt material och den långa videon, sedan fylldes lucka 9–24 med mer befintligt så att kalendern går att hinna med (Sanna: *"we can also use other videos we have to fill out or it will be too hard"*), sedan blev kalendern liggande, sedan blev det befintliga hela videor i stället för klipp, och sist blev kritans luckor små sagor med suddgummit i stället för bara en gissning. Lucka 1–9, 13, 20, 22, 23 och 24 är byggda som korta sagor i kod (37–70 s, liggande), och de tio med hela videor och gissa-filmerna byggs av en annan session. Det som står under [Beslut för Sanna](#4-beslut-för-sanna) är inte bestämt.

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

**17. Tre minuter per lucka (nytt).** Sanna vill att luckorna är ca 3 minuter, med ett problem i varje saga. Förslaget står i [avsnitt 6](#6-tre-minuter-ett-problem-i-varje-saga): en översikt att godkänna, regeln, fjorton dispositioner, två hela avsnitt för lucka 12 och 16, arbetsuppskattning och åtta beslut. Raderna i avsnitt 2 ligger kvar tills Sanna har sagt ja.
---

## 5. Hela julkalendern

En lång video på julafton som spelar alla 24 luckor i rad. Luckorna är redan liggande, så den långa videon är helt enkelt de 24 färdiga filmerna efter varandra: inget nytt ritas och inget nytt spelas in.

| | |
|---|---|
| **Längd** | **ca 72 min om avsnitt 6 godkänns** (fjorton sagor på ca 3 min, tio luckor med hela videor och två hela avsnitt, se 6.7), **annars ca 30 min** med de korta sagorna som de är byggda nu. Räkningen för de korta står kvar nedan |
| **Bild** | liggande 1920×1080, samma bild som i luckorna. Ingen omskalning och ingen bakgrund att lägga till |
| **Skarvarna** | varje lucka slutar på kalendern och nästa börjar på kalendern, med en lucka till öppen. Luckorna läggs rakt efter varandra, utan övergång |
| **Ljudet** | *"Vi ses i morgon!"* tas bort i lucka 1–23: ramens ljud renderas om utan repliken (`render.mjs --bara-ljud`, ingen ny bild). Lucka 24 behåller *"God jul!"* och *"Vi ses snart!"*. De hela videornas eget ljud rörs inte. Hela filmen mastras i två pass till −14 LUFS, topp högst −1,5 dBTP |
| **Början och slut** | börjar direkt på lucka 1 och slutar på lucka 24. Inget eget intro, inga nya repliker |
| **Kapitel** | 24 kapitel i beskrivningen: `0:00 Lucka 1 – Stjärnan`, `0:43 Lucka 2 – Tittut i snön` … |
| **Miniatyr** | skillen `miniatyrer` (färgstrimman): kalendern med kaninen som hjältebild, tidsbrickan med längden på den version som godkänns (*72 min* eller *30 min*) |
| **Titel** | *Hela julkalendern 🎄 \| Alla 24 luckor \| lilla kritan* |
| **Publicering** | julafton, samtidigt som lucka 24 eller strax efter. Gjort för barn, i samma spellista som luckorna |

Längden räknad lucka för lucka (med ramen): 10 ca 1:36 · 11 ca 2:50 · 12 ca 0:25 · 14 ca 3:57 · 15 ca 2:52 · 16 ca 0:22 · 17 ca 2:32 · 18 ca 3:44 · 19 ca 2:30 · 21 ca 2:45. Det är 23 min 32 s. Med de 14 nybyggda (ca 7 min) blir det drygt 30 min. Väljs väg B i beslut 2 (utan avsnittens intro och outro) blir den en dryg minut kortare.

Med avsnitt 6 blir längden ca 71:31: sagorna är 3 min var i stället för 26–70 s, och 12 och 16 är hela avsnitt i stället för 25 s. Räkningen står i 6.7.

Bygget är ett skript som tar de 24 liggande filmerna i ordning, byter ramens ljudspår till det utan *"Vi ses i morgon!"*, sätter ihop dem och mastrar. Prova det på lucka 1–5 den första veckan i december, så att julafton bara är en körning till.

Åtta av luckorna är hela avsnitt som redan ligger på kanalen eller kommer dit. De utgör ca 23 av videons 30 min. Det är samma fråga som beslut 3: avsnitten ligger då på kanalen en tredje gång, inuti den långa videon.

Kontroll före uppladdning: `ffprobe` visar 1920×1080 och 30 fps, längden är summan av luckorna, alla 24 nummer hörs i rätt ordning (whisper i bitar), *"Vi ses i morgon!"* hörs aldrig, och ett kontaktark med en bild per lucka visar 24 olika luckor.

---

## 6. Tre minuter: ett problem i varje saga

Sanna 2026-11-11: *"overall i need the clips to be about 3 min, so lets add some problem to each little story"*. Det här avsnittet är ett **förslag**: raderna i avsnitt 2 och de byggda luckorna ligger kvar som de är tills Sanna har godkänt. Inget är byggt efter det här förslaget, inga repliker är inspelade och inga skriptmanus är skrivna: det här är bara dispositionerna.

**Ramen.** Varje lucka har en fast ram runt sagan: introt tills luckan är öppen (välkommen, kaninen, *"Vilken dag är det idag?"*, dagens lucka) och sist stängningen. Mätt i de färdiga luckorna är den **ca 16,5 s** (lucka 3 är 37,6 s varav scenen 21,0 s, och lucka 10 är 106,0 s runt en video på 89,5 s). Uppdraget räknade med ca 21 s: sagorna på 155–165 s ger då 171–186 s och med den uppmätta ramen 172–180 s. Båda ryms i 170–190 s, och planen räknar med de uppmätta 16,5 s.

### Översikt att godkänna

Fjorton nya sagor och två hela avsnitt. Längd = sagan plus ramen.

| Lucka | Tema | Figurer | Problemet i några ord | Vem löser det | Längd |
|---|---|---|---|---|---|
| **1** tis 1 dec | Stjärnan | stjärnan (får ansikte i kod) | moln i vägen, sedan för liten stjärna | suddgummit, kritan | 2:56 |
| **2** ons 2 dec | Tittut | lammet, björnen (hjälper) | luckan sitter fast | björnen | 2:54 |
| **3** tors 3 dec | Snöflingorna | hunden, grisen (hjälper) | flingan blir för stor | grisen och barnet | 2:53 |
| **4** fre 4 dec | Pepparkakan | björnen, lammet (hjälper) | för tyst, ingen takt | lammet och barnet | 2:53 |
| **5** lör 5 dec | Pulkan | grisen, björnen (hjälper) | pulkan är för tung | björnen och barnet | 2:57 |
| **6** sön 6 dec | Adventsljusen | leoparden, lammet (hjälper) | vinden blåser ut ljusen | lammet, kritan och barnet | 2:54 |
| **7** mån 7 dec | Julkulan | lammet, hunden (hjälper) | kulan går sönder | spaden, hunden och kritan | 2:58 |
| **8** tis 8 dec | Snögubben | hunden, leoparden (hjälper) | morotsnäsan är borta | leoparden och barnet | 2:54 |
| **9** ons 9 dec | Paketet | paketet (får ansikte i kod) | trassligt band, sedan blött paket | suddgummit, kritan | 2:57 |
| **12** lör 12 dec | Kaninen äter frukost | kaninen | inget att bygga: hela avsnitt 022 (byts mot gissa-luckan) | – | 3:13 |
| **13** sön 13 dec | Lucia | lammet, grisen (hjälper) | isfläck, det är hal | grisen och barnet | 2:56 |
| **16** ons 16 dec | Björnen tvättar händerna | björnen | inget att bygga: hela avsnitt 023 (byts mot gissa-luckan) | – | 3:12 |
| **20** sön 20 dec | Fyra ljus | björnen, hunden (hjälper) | det fjärde ljuset är för kort | hunden, kritan och barnet | 2:54 |
| **22** tis 22 dec | Julgranen | granen (får ansikte i kod) | grå slinga, sedan lutande gran | suddgummit, kritan och barnet | 2:57 |
| **23** ons 23 dec | Vi klär granen | grisen, hunden (hjälper) | kulorna rullar iväg | hunden och barnet | 2:54 |
| **24** tors 24 dec | Julafton | kaninen, lammet och björnen (hjälper) | locket sitter fast | lammet, björnen och barnet | 3:00 |

Sagorna är i snitt 2:56 med ramen. Nya repliker: **86** (ca 3 440 ElevenLabs-krediter  40 per replik). Nya bilder: inga. Beslut som Sanna behöver ta står sist i avsnittet (6.6).

### 6.1 Regeln för en lucka på tre minuter

Grunden är `format/regler.md`. Så här tillämpas den på en saga bakom luckan:

| Regel i `regler.md` | I sagorna |
|---|---|
| Högst 3 figurer | Ett huvuddjur, en hjälpare som kommer in från sidan, och på julafton kaninen som tredje. Kritan och suddgummit är kritans värld och kompisar, inte figurer. På de tre kritadagarna (1, 9, 22) är det kritan, suddgummit och **en** figur: stjärnan, paketet och granen, som får ansikte i kod |
| Högst 2 platser | **En**: snön på dagen, snön på kvällen (6, 13, 20, 24) eller papperet (1, 9, 22). Inget platsbyte |
| En händelse, ett litet problem, en lösning | Djursagorna har ett problem. **Kritasagorna har två, efter varandra** (se beslut 2 i 6.6): det första är det som redan är byggt, det andra kommer efter första lösningen |
| Upprepning 2–3 gånger | Leken tre gånger (det som redan är byggt) och lösningen tre gånger (tre drag, tre blås, tre lyft) |
| En fråga till tittaren med paus | **Två:** hjälpfrågan mitt i sagan (paus 5 s, barnet hjälper till) och en uppmaning i slutet (paus 4 s, *"Kan du också …?"*), som de byggda luckorna redan har. Se beslut 3 |
| Problemet löses tillsammans, ingen är elak | Hjälparen, kritan, suddgummit och barnet. Felen är små och roliga: något är i vägen, för stort, för litet, blött, trasigt, bortblåst, tungt, hal, i otakt, för kort, lutar, rullar iväg, sitter fast |
| En vardagshandling och ett *"tack"* | Handlingen är en julsyssla (blåsa, torka, tända, klä, lyfta, tassa). Tack till hjälparen sägs i slutet, och *"Tack, suddgummit!"* / *"Tack, kritan!"* på kritadagarna |
| Lugn rörelse, en sak i taget | Ingen snurr, ingen vändning, inga vilda studsar. Vinden är en mjuk pust, isen ett litet glid, kulorna rullar långsamt. Varje bit i tabellerna är en rörelse |

Dessutom gäller allt som redan står i planen: inga djurnamn i det som sägs (*"Titta, där kommer björnen!"*), aldrig *"Vad kan det vara?"* eller *"Vad säger man?"*, och Malin säger sin replik 0,4–0,8 s efter att rörelsen börjat, så att det som sägs syns just då. Frågorna kommer före rörelsen.

### 6.2 Receptet: formen på en saga på tre minuter

Delarna är desamma varje dag, och **det som redan är byggt blir början** (del A–B) och slutet (del G–H). Det nya läggs emellan och i slutet av leken. Tiderna är ungefärliga och varje saga har sina egna i 6.3.

| Del | Djurdagar | Kritadagar (1, 9, 22) | Ca |
|---|---|---|---|
| **A** | Hej och saken | Kritan ritar saken, barnet gissar (paus 3–4 s), svaret | 15–25 s |
| **B** | Leken tre gånger (det som är byggt) och lite till | Lite av sakens värld ritas | 25–35 s |
| **C** | Problemet dyker upp | Något går på tok i teckningen | 12–16 s |
| **D** | Första försöket misslyckas, roligt | Suddgummit (första lösningen) | 20–28 s |
| **E** | Hjälparen kommer in. **Barnets tur:** en fråga, paus 5 s | Det andra problemet. **Barnets tur:** en fråga, paus 5 s | 28–32 s |
| **F** | Lösningen tillsammans, samma sak tre gånger | Den andra lösningen, tre gånger | 30–40 s |
| **G** | Firande eller dans, och en uppmaning (paus 4 s) | Firande, en uppmaning (paus 4 s) | 20–30 s |
| **H** | Hej då (hjälparen också) | Tack | 5–8 s |
| | **Summa** | | **155–165 s** |

Hjälparen kommer in med ett hopp från sin sida, som gästerna i lucka 24. Ramen lägger till ca 16,5 s, så filmen blir ca 3 min (172–180 s).

### 6.3 De fjorton sagorna

I tabellerna betyder **b** att biten redan är byggd och **n** att den är ny. Repliker i vanlig stil finns inspelade, repliker i **fetstil** är nya (och beräknade i 6.5). Sekunderna för det byggda är de som står i scenfilerna. Inget här är det slutliga manuset: det skrivs, med känslotaggar, när Sanna har godkänt dispositionerna.

#### Lucka 1, tis 1 dec: Stjärnan och molnet, och en stjärna som blir för liten

| | |
|---|---|
| **Figurer** | stjärnan (får ansikte i kod). Kritan och suddgummit är kompisarna |
| **Plats** | papperet |
| **Problemet** | Först gömmer ett moln stjärnan. Sedan, uppe på granen, blir stjärnan så liten att ingen ser den (i vägen, sedan för liten). |
| **Vem hjälper och hur** | suddgummit, kritan |
| **Lösningen** | Molnet suddas bort i tre drag. Kritan ritar tre strålar och suddgummit putsar, så att stjärnan syns. |
| **Barnets tur** | peka ut den lilla stjärnan (5 s paus) och blinka med den (4 s paus) |
| **Tre gånger** | tre drag med suddgummit, tre strålar, tre blinkningar |
| **Nya saker i kod** | ring och tre strålar runt stjärnan |
| **Längd** | sagan 160 s (byggt 54 s, nytt 106 s) + ramen 16.5 s = **176 s (2:56)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 12 | A | b | Kritan ritar en gul kontur, paus 3 s, stjärnan fylls i | Vad ritar kritan? · Vad blir det? · En stjärna! |
| 2 | 4.5 | A | b | Stjärnan får ansikte och dansar | Stjärnan dansar! |
| 3 | 8.5 | B | b | Kritan ritar natthimlen bakom stjärnan | En mörkblå himmel. |
| 4 | 6.5 | C | b | Ett moln ritas framför stjärnan | Oj! Ett moln. |
| 5 | 4 | C | b | Stjärnan tittar sur över molnkanten | Stjärnan blev arg! |
| 6 | 4 | D | b | Kritan ritar suddgummit | Kritan ritar ett suddgummi! |
| 7 | 5 | D | b | Suddgummit suddar molnet i tre drag | Sudd, sudd, sudd! |
| 8 | 4.5 | D | b | Stjärnan tindrar, glad igen | Stjärnan blinkar. · Nu är stjärnan glad igen! · Tack, suddgummit! |
| 9 | 4.8 | D | b | Kritan ritar en julgran, julstjärnan flyger upp i toppen | Åh, en julgran! · Vart åker stjärnan? · Ja! Upp på granen! · Det var en julstjärna. Vad fint! |
| 10 | 12 | C | n | Uppe i toppen blir stjärnan pytteliten, knappt synlig | **Oj! Stjärnan är så liten nu.** |
| 11 | 18 | D | n | Kritan ritar en tunn ring runt den; ringen syns inte, stjärnan står på tå | **Nej, ringen syns inte.** · Hm … vad gör vi nu? |
| 12 | 16 | E | n | Barnets tur: stjärnan väntar, efter 3 s skimrar den bland grenarna (paus 5 s), sedan visar den sig | **Kan du se stjärnan? Kan du peka på den?** · **Ja, där är den!** |
| 13 | 26 | F | n | Kritan ritar tre strålar, en i taget; stjärnan växer för varje | **En stråle. En till. Och en till!** |
| 14 | 12 | F | n | Suddgummit putsar stjärnan i tre drag; den glänser | Sudd, sudd, sudd! · **Nu syns den!** |
| 15 | 14 | G | n | Barnets andra tur: stjärnan blinkar tre gånger, barnet blinkar med (paus 4 s) | **Kan du blinka som stjärnan?** |
| 16 | 8 | H | n | Kritan och suddgummit sida vid sida, stjärnan tindrar | **Tack, kritan!** · Tack, suddgummit! |
| | **159.8** | | | **Summa** | **8 nya repliker** (varav 2 delade med andra dagar) |

#### Lucka 2, ons 2 dec: Tittut: luckan som fastnar

| | |
|---|---|
| **Figurer** | lammet, björnen (hjälper) |
| **Plats** | snön |
| **Problemet** | Luckan stängs för tittut, men sitter fast och går inte att öppna (fastnat). |
| **Vem hjälper och hur** | björnen |
| **Lösningen** | Björnen drar i luckan medan lammet puttar inifrån, och den går upp på tredje ryck. |
| **Barnets tur** | räkna med björnen: ett, två, tre (5 s paus), och klappa tre gånger (4 s paus) |
| **Tre gånger** | tre varv tittut (finns), tre försök, tre drag i luckan |
| **Nya saker i kod** | inga |
| **Längd** | sagan 158 s (byggt 27 s, nytt 130 s) + ramen 16.5 s = **174 s (2:54)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Lammet vinkar i luckan | Hej lammet! |
| 2 | 9.3 | B | b | Varv 1: luckan stängs, glänt, lammet hoppar fram | Oj, borta! · Var är lammet? · Tittut! |
| 3 | 7.8 | B | b | Varv 2: borta igen, glänt, lammet klappar | Borta igen! · Tittut! Där är du! |
| 4 | 1.8 | B | b | Varv 3 börjar: luckan stängs | Vips! Borta! |
| 5 | 14 | C | n | Luckan stannar stängd; den rycker men öppnas inte | **Oj! Luckan sitter fast!** |
| 6 | 22 | D | n | Lammet puttar inifrån, tre försök; luckan rycker till men går inte upp; lammet fnissar | **Nej, den sitter fast.** · **Nu försöker vi igen.** |
| 7 | 9 | E | n | Björnen kommer in från sidan och ställer sig vid luckans kant | **Titta, där kommer björnen!** |
| 8 | 16 | E | n | Barnets tur: björnen tar tag, barnet ska räkna (paus 5 s) | **Kan du hjälpa till?** · Räkna med mig. |
| 9 | 36 | F | n | Björnen drar tre gånger; luckan går upp lite för varje drag | **Dra, dra, dra!** · **Ett! Två! Tre!** |
| 10 | 3 | F | b | Luckan öppnas, lammet hoppar fram | Tittut! |
| 11 | 8 | G | n | Lammet och björnen hoppar tillsammans | **Hurra! Det gick!** · **Tack, björnen!** |
| 12 | 12 | G | n | Ny tittut: luckan stängs, björnen gömmer sig bakom den och kommer fram | **Var är björnen?** · Tittut! Där är du ju! |
| 13 | 11 | G | n | Barnets andra tur: lammet och björnen klappar tre gånger (paus 4 s) | **Kan du också klappa tre gånger?** |
| 14 | 2.6 | H | b | Lammet vinkar | Hej då lammet! |
| 15 | 2.4 | H | n | Björnen vinkar | Hej då björnen! |
| | **157.7** | | | **Summa** | **11 nya repliker** (varav 5 delade med andra dagar) |

#### Lucka 3, tors 3 dec: Snöflingorna och jätteflingan

| | |
|---|---|
| **Figurer** | hunden, grisen (hjälper) |
| **Plats** | snön |
| **Problemet** | Flingorna blir större för varje hopp, och den sista landar över hela hunden som en hatt (för stor). |
| **Vem hjälper och hur** | grisen och barnet |
| **Lösningen** | Barnet och grisen blåser tre gånger. Flingan blir mindre för varje blås och faller sönder i många små. |
| **Barnets tur** | blåsa med grisen (5 s paus) och hoppa med hunden (4 s paus) |
| **Tre gånger** | tre flingor (finns), tre skak, tre blås |
| **Nya saker i kod** | växande flinga (stor, mellan, liten) |
| **Längd** | sagan 156 s (byggt 21 s, nytt 135 s) + ramen 16.5 s = **173 s (2:53)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Hunden vinkar | Hej hunden! |
| 2 | 2.6 | A | b | Det börjar snöa, hunden tittar upp | Titta, det snöar! |
| 3 | 6.8 | B | b | Hunden hoppar och fångar en flinga på nosen, tre gånger | En snöflinga! · En till! · Och en till! |
| 4 | 14 | B | n | Flingorna blir större för varje hopp; hunden hoppar högre | **Titta, den här är större!** |
| 5 | 12 | C | n | En jätteflinga dalar och landar över hela hunden som en hatt; hunden ser inget | **Titta! En jätteflinga!** · **Oj! Var är hunden?** |
| 6 | 24 | D | n | Hunden skakar tre gånger; flingan sitter kvar; hunden stapplar lugnt åt sidan och fnissar | **Skaka, skaka, skaka!** |
| 7 | 9 | E | n | Grisen kommer in och nosar på flingan | **Titta, där kommer grisen!** |
| 8 | 22 | E | n | Barnets tur: grisen blåser, men flingan rör sig knappt; barnet bjuds in att blåsa (paus 5 s) | **Kan du hjälpa till?** · **Kan du blåsa? Fff!** |
| 9 | 30 | F | n | Barnet och grisen blåser tre gånger; flingan blir mindre för varje | **Fff! Fff! Fff!** |
| 10 | 16 | F | n | Flingan faller sönder i många små; det snöar mycket; hunden och grisen hoppar och fångar | **Titta, nu snöar det mycket!** |
| 11 | 1.6 | G | b | Hunden vänder sig mot barnet | Kan du också hoppa? |
| 12 | 4.6 | G | b | Hunden hoppar två gånger (paus 4 s) |  |
| 13 | 6 | G | n | Grisen och hunden hoppar tillsammans | **Hurra! Det gick!** · **Tack, grisen!** |
| 14 | 2.6 | H | b | Hunden vinkar | Hej då hunden! |
| 15 | 2.4 | H | n | Grisen vinkar | Hej då grisen! |
| | **156.4** | | | **Summa** | **11 nya repliker** (varav 4 delade med andra dagar) |

#### Lucka 4, fre 4 dec: Pepparkakan och dansen utan takt

| | |
|---|---|
| **Figurer** | björnen, lammet (hjälper) |
| **Plats** | snön |
| **Problemet** | Musiken tonar ut och dansen hamnar i otakt (för tyst). |
| **Vem hjälper och hur** | lammet och barnet |
| **Lösningen** | Lammet stampar takten, barnet klappar, och björnen och pepparkakan dansar rätt igen. |
| **Barnets tur** | klappa takten (5 s paus) och dansa med (4 s paus) |
| **Tre gånger** | tre danser, tre klappvarv som växer, tre klapp |
| **Nya saker i kod** | inga |
| **Längd** | sagan 157 s (byggt 21 s, nytt 136 s) + ramen 16.5 s = **173 s (2:53)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Björnen vinkar | Hej björnen! |
| 2 | 2.5 | A | b | Pepparkakshjärtat poppar fram | En pepparkaka! |
| 3 | 4 | B | b | Björnen dansar, pepparkakan gungar i takt | Nu dansar vi! |
| 4 | 3.5 | B | b | Björnen klappar tre gånger |  |
| 5 | 18 | B | n | Tre danser, en i taget: vagga, hoppa, klappa; pepparkakan följer; björnen fnissar |  |
| 6 | 12 | C | n | Musiken tonar ut och det blir tyst; pepparkakan stannar | **Oj! Det blev tyst.** |
| 7 | 20 | D | n | Björnen dansar vidare utan takt och snubblar lugnt; björnen och pepparkakan kommer i otakt | **Hoppla! Fel takt!** |
| 8 | 9 | E | n | Lammet kommer in och stannar bredvid | **Titta, där kommer lammet!** |
| 9 | 20 | E | n | Barnets tur: lammet stampar svagt; barnet bjuds in att klappa takten (paus 5 s) | **Kan du hjälpa till?** · **Kan du klappa takten?** |
| 10 | 40 | F | n | Barnet och lammet klappar, tre varv: svagt, starkare, starkast; björnen dansar rätt | **Klapp, klapp, klapp!** |
| 11 | 1.5 | G | b | Björnen vänder sig mot barnet | Dansa du också! |
| 12 | 4 | G | b | Björnen dansar (paus 4 s) |  |
| 13 | 14 | G | n | Alla tre dansar: björnen, lammet och pepparkakan | **Nu dansar alla tre!** · **Hurra! Det gick!** · **Tack, lammet!** |
| 14 | 2.4 | H | b | Björnen vinkar | Hej då björnen! |
| 15 | 3 | H | n | Lammet vinkar | Hej då lammet! |
| | **156.7** | | | **Summa** | **9 nya repliker** (varav 4 delade med andra dagar) |

#### Lucka 5, lör 5 dec: Pulkan och julklapparna som är för tunga

| | |
|---|---|
| **Figurer** | grisen, björnen (hjälper) |
| **Plats** | snön, med backe |
| **Problemet** | Grisen lastar tre paket i pulkan, och den blir för tung att dra uppför backen (för tung). |
| **Vem hjälper och hur** | björnen och barnet |
| **Lösningen** | Björnen skjuter, grisen drar och barnet hejar: tre heja, tre steg uppåt, sedan åker de ner. |
| **Barnets tur** | heja på grisen (5 s paus) och säga wiii (finns) |
| **Tre gånger** | tre åk (finns), tre försök, tre heja |
| **Nya saker i kod** | tre paket på pulkan (återanvänd lucka 9), pulksnöre |
| **Längd** | sagan 161 s (byggt 27 s, nytt 134 s) + ramen 16.5 s = **177 s (2:57)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Grisen vinkar | Hej grisen! |
| 2 | 2.4 | A | b | Pulkan poppar fram | En pulka! |
| 3 | 3.6 | B | b | Åk 1 | Grisen åker pulka. |
| 4 | 3.3 | B | b | Åk 2 | Wiii! |
| 5 | 3.8 | B | b | Åk 3, grisen tar sats | En gång till! |
| 6 | 10 | B | n | Grisen drar pulkan uppför backen igen, glad; tre små hopp |  |
| 7 | 14 | C | n | Grisen lastar tre paket, ett i taget; pulkan sjunker ner i snön | **Nu tar vi med julklapparna!** · **Oj! Pulkan är för tung.** |
| 8 | 22 | D | n | Grisen drar i snöret, tre försök; pulkan rör sig inte; grisen pustar | **Pust! Den rör sig inte.** · **Nu försöker vi igen.** |
| 9 | 9 | E | n | Björnen kommer in | **Titta, där kommer björnen!** |
| 10 | 20 | E | n | Barnets tur: björnen skjuter, grisen drar, pulkan rör sig en liten bit; barnet bjuds in att heja (paus 5 s) | **Kan du hjälpa till?** · **Kan du heja? Heja, grisen!** |
| 11 | 34 | F | n | Barnet hejar tre gånger; för varje heja tar de ett steg uppför backen | **Heja! Heja! Heja!** |
| 12 | 8 | F | n | Uppe på backen: pulkan lutar och börjar glida | **Nu rör den sig!** |
| 13 | 5.8 | G | b | Åk ner med paketen, två gånger |  |
| 14 | 2.6 | G | b | Grisen stannar (paus 4 s) | Kan du säga wiii? |
| 15 | 14 | G | n | Grisen och björnen åker tillsammans; paketen hoppar lite | **Hurra! Det gick!** · **Tack, björnen!** |
| 16 | 2.4 | H | b | Grisen vinkar | Hej då grisen! |
| 17 | 3 | H | n | Björnen vinkar | Hej då björnen! |
| | **160.7** | | | **Summa** | **11 nya repliker** (varav 5 delade med andra dagar) |

#### Lucka 6, sön 6 dec: Adventsljusen och vinden

| | |
|---|---|
| **Figurer** | leoparden, lammet (hjälper). Kritan tänder ljusen |
| **Plats** | snön på kvällen |
| **Problemet** | En vindpust blåser ut lågorna, en i taget (bortblåst). |
| **Vem hjälper och hur** | lammet, kritan och barnet |
| **Lösningen** | Lammet står som vindskydd, kritan tänder igen och barnet skyddar lågan med händerna. Den lyser stadigt. |
| **Barnets tur** | hålla händerna runt lågan (5 s paus) och räkna med (finns) |
| **Tre gånger** | tre försök att tända, tre vindpustar, tre lågor som blinkar |
| **Nya saker i kod** | vindvirvlar: flingor åt sidan |
| **Längd** | sagan 157 s (byggt 28 s, nytt 130 s) + ramen 16.5 s = **174 s (2:54)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 3.2 | A | b | Leoparden vinkar | Hej leoparden! |
| 2 | 3.9 | A | b | Kritan kommer in och tänder första ljuset | Kritan tänder ljusen. · Ett. |
| 3 | 2.6 | B | b | Andra ljuset tänds; leoparden rycker till | Två. |
| 4 | 2.7 | B | b | Leoparden hoppar av glädje |  |
| 5 | 3.2 | B | b | Två ljus brinner | Två ljus! Det är advent. |
| 6 | 3 | B | b | Leoparden nöjd med slutna ögon | Så fint det lyser. |
| 7 | 16 | C | n | En vindpust: flingor virvlar och båda lågorna blåser ut, en i taget; leoparden blinkar | **Fff! Vinden blåste ut ljusen.** |
| 8 | 28 | D | n | Kritan tänder igen, vinden blåser ut igen, två gånger; leoparden försöker skydda med tassen, men den är för stor | **Kritan tänder igen, men fff!** |
| 9 | 9 | E | n | Lammet kommer in och ställer sig bakom ljusen som vindskydd | **Titta, där kommer lammet!** |
| 10 | 22 | E | n | Barnets tur: kritan väntar vid veken; barnet bjuds in att hålla händerna runt lågan (paus 5 s) | **Kan du hjälpa till?** · **Kan du hålla händerna runt lågan, så?** |
| 11 | 38 | F | n | Kritan tänder tre gånger; barnet skyddar; lågan blir stadigare, tredje gången står den stilla | **Nu lyser det!** |
| 12 | 1.3 | G | b | Leoparden bjuder in | Räkna med mig. |
| 13 | 5 | G | b | Leoparden vaggar; lågorna blinkar, en i taget | Ett. · Två. |
| 14 | 14 | G | n | Leoparden och lammet vaggar tillsammans i skenet | **Hurra! Det gick!** · **Tack, lammet!** |
| 15 | 2.8 | H | b | Leoparden vinkar | Hej då leoparden! |
| 16 | 2.5 | H | n | Lammet vinkar | Hej då lammet! |
| | **157.2** | | | **Summa** | **8 nya repliker** (varav 4 delade med andra dagar) |

#### Lucka 7, mån 7 dec: Julkulan som gick sönder

| | |
|---|---|
| **Figurer** | lammet, hunden (hjälper). Spaden och kritan hjälper också |
| **Plats** | snön |
| **Problemet** | Kulan går sönder och skärvorna ligger över snön (trasig). Spaden missar en bit. |
| **Vem hjälper och hur** | spaden, hunden och kritan |
| **Lösningen** | Hunden hämtar tre skärvor, en i taget, och spaden tar emot. Kritan ritar en ny kula. |
| **Barnets tur** | peka ut den sista biten (5 s paus) och gunga som kulan (finns) |
| **Tre gånger** | tre puttar (finns), tre skärvor |
| **Nya saker i kod** | inga |
| **Längd** | sagan 162 s (byggt 36 s, nytt 126 s) + ramen 16.5 s = **178 s (2:58)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Lammet vinkar | Hej lammet! |
| 2 | 2.5 | A | b | Kulan poppar fram i granen | En julkula! |
| 3 | 3 | B | b | Lammet puttar på kulan | Lammet puttar. Den gungar! |
| 4 | 3.2 | B | b | Puttar igen | En gång till! |
| 5 | 1.65 | B | b | Tredje gången släpper snöret |  |
| 6 | 2.4 | C | b | Kulan gick sönder | Oj! Kulan gick sönder. |
| 7 | 10 | C | n | Skärvorna ligger i en ring; lammet räknar dem | **Det finns många bitar.** |
| 8 | 3.4 | D | b | Spaden städar upp | Spaden städar upp. |
| 9 | 28 | D | n | Spaden tar några men missar en bit; lammet försöker pussla ihop skärvorna, de passar inte | **Spaden missade en bit.** |
| 10 | 9 | E | n | Hunden kommer in och nosar i snön | **Titta, där kommer hunden!** |
| 11 | 22 | E | n | Barnets tur: var är sista biten? Efter 3 s skimrar den bakom granen (paus 5 s) | **Kan du se var den sista biten är?** |
| 12 | 40 | F | n | Hunden hämtar tre skärvor, en i taget, och spaden tar emot; barnet pekar | **Ja, där är den!** · **En bit. En till. Och en till!** |
| 13 | 4.8 | F | b | Kritan ritar en ny kula | Kritan ritar en ny kula. |
| 14 | 3.4 | G | b | Lammet hoppar av glädje | Så fin den blev! |
| 15 | 2 | G | b | Lammet vänder sig mot barnet | Kan du gunga som kulan? |
| 16 | 4 | G | b | Lammet vaggar, kulan gungar med (paus 4 s) |  |
| 17 | 14 | G | n | Lammet och hunden vaggar tillsammans | **Hurra! Det gick!** · **Tack, hunden!** |
| 18 | 2.4 | H | b | Lammet vinkar | Hej då lammet! |
| 19 | 3 | H | n | Hunden vinkar | Hej då hunden! |
| | **161.55** | | | **Summa** | **8 nya repliker** (varav 4 delade med andra dagar) |

#### Lucka 8, tis 8 dec: Snögubben som tappade nosen

| | |
|---|---|
| **Figurer** | hunden, leoparden (hjälper) |
| **Plats** | snön |
| **Problemet** | Morotsnäsan är borta och snögubben har bara ett litet hål (borta). |
| **Vem hjälper och hur** | leoparden och barnet |
| **Lösningen** | Leoparden hoppar och hämtar moroten uppe i granen, och hunden trycker fast den tre gånger. |
| **Barnets tur** | peka ut moroten (5 s paus) och vinka till snögubben (finns) |
| **Tre gånger** | tre bollar (finns), tre ställen att leta på |
| **Nya saker i kod** | lös morot |
| **Längd** | sagan 158 s (byggt 24 s, nytt 134 s) + ramen 16.5 s = **174 s (2:54)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Hunden vinkar | Hej hunden! |
| 2 | 3.6 | B | b | Hunden puttar fram en snöboll | Hunden bygger i snön. · En boll. |
| 3 | 2.6 | B | b | Boll två | En boll till. |
| 4 | 3.3 | B | b | Boll tre | Och en till! |
| 5 | 2.9 | B | b | Morotsnäsa och kolögon poppar fram | En snögubbe! |
| 6 | 14 | B | n | Hunden går runt snögubben och tittar nöjd; de säger voff till varandra |  |
| 7 | 12 | C | n | Hunden vänder sig om: morotsnäsan är borta, bara ett litet hål | **Oj! Var är nosen?** |
| 8 | 28 | D | n | Hunden letar på tre ställen: bakom snögubben, i snön, bakom granen. Varje gång tomt | **Inte här. Inte här. Inte här.** |
| 9 | 9 | E | n | Leoparden kommer in och tittar åt båda hållen | **Titta, där kommer leoparden!** |
| 10 | 22 | E | n | Barnets tur: var är moroten? Efter 3 s skimrar den uppe i granen (paus 5 s) | **Kan du se var moroten är? Kan du peka?** |
| 11 | 32 | F | n | Leoparden hoppar och tar moroten; hunden sätter fast den, tre små tryck; snögubben ler | **Ja, där är den!** · **Nu är snögubben fin igen!** |
| 12 | 2.2 | G | b | Hunden vänder sig mot barnet | Kan du vinka till snögubben? |
| 13 | 4 | G | b | Hunden vinkar till snögubben (paus 4 s) |  |
| 14 | 14 | G | n | Hunden och leoparden dansar lugnt runt snögubben | **Hurra! Det gick!** · **Tack, leoparden!** |
| 15 | 2.6 | H | b | Hunden vinkar | Hej då hunden! |
| 16 | 3 | H | n | Leoparden vinkar | Hej då leoparden! |
| | **158** | | | **Summa** | **8 nya repliker** (varav 2 delade med andra dagar) |

#### Lucka 9, ons 9 dec: Paketet: bandet som trasslar och snön som blir blöt

| | |
|---|---|
| **Figurer** | paketet (får ansikte i kod). Kritan och suddgummit är kompisarna |
| **Plats** | papperet |
| **Problemet** | Först trasslar bandet. Sedan ramlar snö från granen och paketet blir blött och huttrar (trassel, sedan för blött). |
| **Vem hjälper och hur** | suddgummit, kritan |
| **Lösningen** | Härvan suddas bort. Suddgummit torkar tre hörn och kritan ritar ett tak av gran, så att snön hålls borta. |
| **Barnets tur** | skaka som paketet (4 s paus) |
| **Tre gånger** | tre drag, tre hörn |
| **Nya saker i kod** | snötuss och droppar, tak av gran |
| **Längd** | sagan 160 s (byggt 43 s, nytt 117 s) + ramen 16.5 s = **177 s (2:57)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 8 | A | b | Kritan ritar en röd låda och ett gult band i kors, paus 4 s | Vad ritar kritan? · Vad blir det? |
| 2 | 3.5 | A | b | Paketet får ansikte och poppar | Ett paket! |
| 3 | 7 | B | b | Kritan ritar grankvistar ovanför | Paketet ligger under granen. |
| 4 | 6 | C | b | Bandet trasslar till en gul härva; paketet blir surt | Oj! Bandet har trasslat sig. |
| 5 | 3.5 | D | b | Paketet skakar surt | Hm … vad gör vi nu? |
| 6 | 4.5 | D | b | Kritan ritar suddgummit | Kritan ritar ett suddgummi! |
| 7 | 5 | D | b | Suddgummit suddar härvan i tre drag | Sudd, sudd, sudd! |
| 8 | 3.2 | D | b | Kritan ritar en rosett | En rosett! |
| 9 | 2.5 | D | b | Paketet glimmar | Vi öppnar det på julafton. · Tack, suddgummit! |
| 10 | 14 | C | n | Snö ramlar från kvistarna ovanför och landar på paketet; paketet blir blött och huttrar | **Oj! Snö föll från granen.** · **Nu är paketet blött!** |
| 11 | 18 | D | n | Kritan ritar ett litet tak över paketet; det är för litet och snön faller ändå; paketet fnissar | **Nej, det räcker inte.** |
| 12 | 18 | E | n | Barnets tur: paketet vill skaka av sig; barnet skakar med; droppar flyger (paus 4 s) | **Kan du skaka som paketet?** |
| 13 | 26 | F | n | Suddgummit torkar ett hörn i taget, tre drag; paketet blir torrare för varje | **Sudd. Ett hörn. Ett till. Och ett till!** |
| 14 | 15 | F | n | Kritan ritar ett större tak av gran över hela paketet; ingen snö kommer igenom |  |
| 15 | 12 | G | n | Paketet gungar glatt, rosetten glimmar | **Nu är paketet torrt och glatt!** |
| 16 | 14 | H | n | Kritan och suddgummit nickar; paketet vinkar | **Tack, kritan!** · Tack, suddgummit! |
| | **160.2** | | | **Summa** | **7 nya repliker** (varav 1 delade med andra dagar) |

#### Lucka 13, sön 13 dec: Lucia och den hala isen

| | |
|---|---|
| **Figurer** | lammet, grisen (hjälper) |
| **Plats** | snön på kvällen |
| **Problemet** | Under snön ligger en blank isfläck, och lammet glider (för hal). |
| **Vem hjälper och hur** | grisen och barnet |
| **Lösningen** | Lammet och grisen tassar tillsammans över isen, tre steg tre gånger, och kronans ljus blinkar. |
| **Barnets tur** | gå på tå, så tyst (5 s paus) |
| **Tre gånger** | tre steg på tå (finns), tre försök, tre tassar |
| **Nya saker i kod** | isfläck |
| **Längd** | sagan 160 s (byggt 21 s, nytt 139 s) + ramen 16.5 s = **176 s (2:56)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 3.2 | A | b | Lammet står med ljuskrona | Det är Lucia. |
| 2 | 5.8 | A | b | Ljusen i kronan tänds, ett i taget | Lammet har ljus i sin krona. |
| 3 | 4.4 | B | b | Lammet går tre steg på tå | Tass … tass … tass. |
| 4 | 14 | B | n | Lammet går tre steg till; ljusen blinkar i takt | Ett … två … tre … fyra. |
| 5 | 12 | C | n | Under snön ligger en blank isfläck; lammet glider ett litet stycke, lugnt | **Oj! Det är hal!** |
| 6 | 24 | D | n | Lammet tassar tre gånger och halkar lugnt åt sidan varje gång; kronan sitter kvar | **Nu försöker vi igen.** |
| 7 | 9 | E | n | Grisen kommer in på tå | **Titta, där kommer grisen!** |
| 8 | 22 | E | n | Barnets tur: lammet och grisen väntar; barnet bjuds in att gå på tå (paus 5 s) | Kan du gå på tå, så tyst? |
| 9 | 34 | F | n | Lammet och grisen tassar tillsammans över isen, tre steg tre gånger | Tass … tass … tass. · **Nu går vi tillsammans.** |
| 10 | 4.4 | G | b | Tre steg på tå |  |
| 11 | 2.8 | G | b | Lammet står stolt |  |
| 12 | 16 | G | n | Lammet och grisen står bredvid varandra; kronans ljus blinkar, ett i taget | Ett … två … tre … fyra. |
| 13 | 8 | H | n | Lugn avslutning: de går ut, tyst | **Nu är det lugnt och fint.** · **Tack, grisen!** |
| | **159.6** | | | **Summa** | **6 nya repliker** (varav 3 delade med andra dagar) |

#### Lucka 20, sön 20 dec: Fyra ljus och ett som är för kort

| | |
|---|---|
| **Figurer** | björnen, hunden (hjälper). Kritan tänder ljusen |
| **Plats** | snön på kvällen |
| **Problemet** | Det fjärde ljuset är bara en stump och kan inte tändas (för kort). |
| **Vem hjälper och hur** | hunden, kritan och barnet |
| **Lösningen** | Kritan ritar ett nytt, högt ljus och tänder det. Vi räknar fyra lågor. |
| **Barnets tur** | räkna ljusen med hunden (5 s paus) och räkna med (finns) |
| **Tre gånger** | tre ljus räknas, tre försök att tända stumpen |
| **Nya saker i kod** | kort ljusstump |
| **Längd** | sagan 158 s (byggt 30 s, nytt 128 s) + ramen 16.5 s = **174 s (2:54)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 3.2 | A | b | Björnen vinkar | Hej björnen! |
| 2 | 8.4 | B | b | Kritan kommer in och tänder tre ljus, ett i taget; björnen nyfiken, sedan glad | Kritan tänder ljusen. |
| 3 | 16 | C | n | Det fjärde ljuset är bara en liten stump; kritan kan inte tända det | **Oj! Det här ljuset är för kort.** |
| 4 | 28 | D | n | Kritan försöker tända stumpen; lågan blir pytteliten och slocknar, två gånger; björnen kliar sig i huvudet | Hm … vad gör vi nu? |
| 5 | 9 | E | n | Hunden kommer in och nosar på stumpen | **Titta, där kommer hunden!** |
| 6 | 22 | E | n | Barnets tur: hunden räknar tre ljus; barnet bjuds in att räkna med (paus 5 s) | **Kan du räkna ljusen med mig?** · **Bara tre!** |
| 7 | 36 | F | n | Kritan ritar ett nytt, högt ljus och tänder det; lågorna blinkar medan vi räknar igen | **Kritan ritar ett nytt ljus.** · Ett … två … tre … fyra. |
| 8 | 3.5 | G | b | Björnen klappar tre gånger |  |
| 9 | 4.2 | G | b | Fyra ljus brinner | Fyra ljus! Snart är det jul. |
| 10 | 1.3 | G | b | Björnen bjuder in | Räkna med mig. |
| 11 | 6.6 | G | b | Björnen vaggar; lågorna blinkar, en i taget | Ett … två … tre … fyra. |
| 12 | 14 | G | n | Björnen och hunden vaggar tillsammans | **Nu är det fyra!** · **Hurra! Det gick!** · **Tack, hunden!** |
| 13 | 2.8 | H | b | Björnen vinkar | Hej då björnen! |
| 14 | 3 | H | n | Hunden vinkar | Hej då hunden! |
| | **158** | | | **Summa** | **8 nya repliker** (varav 3 delade med andra dagar) |

#### Lucka 22, tis 22 dec: Julgranen som började luta

| | |
|---|---|
| **Figurer** | granen (får ansikte i kod). Kritan och suddgummit är kompisarna |
| **Plats** | papperet |
| **Problemet** | Först blir ljusslingan grå och lyser inte. Sedan blir granen trött och börjar luta (grå slinga, sedan lutar). |
| **Vem hjälper och hur** | suddgummit, kritan och barnet |
| **Lösningen** | Slingan suddas och ritas om i gult. Kritan ritar tre stödpinnar och suddgummit suddar dem när granen står rakt. |
| **Barnets tur** | hjälpa granen stå rakt genom att luta sig åt vänster (5 s paus) och stå stilla (4 s paus) |
| **Tre gånger** | tre drag, tre stödpinnar |
| **Nya saker i kod** | tre stödpinnar, ansikte på granen |
| **Längd** | sagan 160 s (byggt 40 s, nytt 120 s) + ramen 16.5 s = **177 s (2:57)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 9 | A | b | Kritan ritar granens kontur, paus 3 s | Vad ritar kritan? · Vad blir det? |
| 2 | 2.5 | A | b | Granen fylls i | En gran! |
| 3 | 5.5 | B | b | Kritan ritar en snökulle | Granen står i snön. |
| 4 | 6 | C | b | Kritan ritar en ljusslinga, men den blir grå och lyser inte | Oj! Ljusen lyser inte. |
| 5 | 2.5 | D | b | Väntan | Hm … vad gör vi nu? |
| 6 | 3.5 | D | b | Kritan ritar suddgummit | Kritan ritar ett suddgummi! |
| 7 | 4.5 | D | b | Suddgummit suddar den grå slingan i tre drag | Sudd, sudd, sudd! |
| 8 | 3.5 | D | b | Kritan ritar en ny slinga med gula ljus | Gula ljus! |
| 9 | 3.1 | D | b | Granen tindrar | Granen lyser. · Tack, suddgummit! |
| 10 | 12 | C | n | Granen får ansikte och blir trött; den börjar luta åt höger | **Oj! Granen lutar.** |
| 11 | 16 | D | n | Kritan ritar en pinne som stöd; granen glider åt andra hållet | **Nu lutar den åt andra hållet!** |
| 12 | 16 | E | n | Barnets tur: granen vill stå rakt; barnet lutar sig åt vänster; granen följer lugnt (paus 5 s) | **Kan du hjälpa granen att stå rakt?** |
| 13 | 28 | F | n | Kritan ritar tre stödpinnar, en i taget; granen blir rakare för varje | **En pinne. En till. Och en till!** |
| 14 | 14 | F | n | Suddgummit suddar pinnarna i tre drag; granen står själv | Sudd, sudd, sudd! · **Nu står den själv!** |
| 15 | 16 | G | n | Barnets andra tur: granen står stilla och tindrar; barnet står stilla (paus 4 s) | **Kan du stå stilla som granen?** |
| 16 | 18 | H | n | Granen dansar lugnt, slingan lyser; kritan och suddgummit tillsammans | **Tack, kritan!** · Tack, suddgummit! |
| | **160.1** | | | **Summa** | **7 nya repliker** (varav 1 delade med andra dagar) |

#### Lucka 23, ons 23 dec: Granen och kulorna som rullar iväg

| | |
|---|---|
| **Figurer** | grisen, hunden (hjälper) |
| **Plats** | snön |
| **Problemet** | Kulorna rullar ut ur granen och iväg över snön (rullar iväg). |
| **Vem hjälper och hur** | hunden och barnet |
| **Lösningen** | Hunden hämtar tre kulor, en i taget, och grisen hänger upp dem. Sist landar stjärnan i toppen. |
| **Barnets tur** | räkna kulorna (5 s paus) och peka på stjärnan (finns) |
| **Tre gånger** | tre kulor (finns), tre hämtningar |
| **Nya saker i kod** | inga |
| **Längd** | sagan 158 s (byggt 26 s, nytt 132 s) + ramen 16.5 s = **174 s (2:54)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 2.8 | A | b | Grisen vinkar | Hej grisen! |
| 2 | 2.6 | A | b | Grisen tittar på granen | Nu klär vi granen. |
| 3 | 5.2 | B | b | Tre kulor hoppar upp i granen, en i taget | En kula. En till. Och en till! |
| 4 | 14 | B | n | Kulorna gungar och plingar; grisen går runt granen och tittar nöjd |  |
| 5 | 12 | C | n | Kulorna börjar rulla ur granen, en i taget, och rullar iväg över snön | **Oj! Kulan rullade iväg!** |
| 6 | 24 | D | n | Grisen jagar kulorna åt tre håll och kommer tillbaka tomhänt | **Grisen jagar kulorna.** |
| 7 | 9 | E | n | Hunden kommer in och spetsar öronen | **Titta, där kommer hunden!** |
| 8 | 22 | E | n | Barnets tur: kulorna gömmer sig; barnet bjuds in att räkna dem (paus 5 s) | **Kan du hjälpa till?** · **Kan du räkna kulorna? En, två, tre!** |
| 9 | 36 | F | n | Hunden hämtar tre kulor, en i taget; grisen hänger upp dem; ett pling för varje | **Hämta! Hämta! Hämta!** |
| 10 | 3 | G | b | Julstjärnan dalar ner och landar i toppen | Och stjärnan i toppen! |
| 11 | 2.6 | G | b | Grisen hoppar av glädje |  |
| 12 | 2.4 | G | b | Grisen vänder sig mot barnet | Kan du peka på stjärnan? |
| 13 | 4.6 | G | b | Grisen pekar; stjärnan skimrar efter 3 s (paus 4 s) |  |
| 14 | 12 | G | n | Grisen och hunden dansar framför granen | **Hurra! Det gick!** · **Tack, hunden!** |
| 15 | 2.4 | H | b | Grisen vinkar | Hej då grisen! |
| 16 | 3 | H | n | Hunden vinkar | Hej då hunden! |
| | **157.6** | | | **Summa** | **8 nya repliker** (varav 4 delade med andra dagar) |

#### Lucka 24, tors 24 dec: Julafton och locket som sitter fast

| | |
|---|---|
| **Figurer** | kaninen, lammet och björnen (hjälper) |
| **Plats** | snön på kvällen |
| **Problemet** | Locket på paketet sitter fast, och kaninens tassar är för små att lyfta det (för små tassar). |
| **Vem hjälper och hur** | lammet, björnen och barnet |
| **Lösningen** | Alla tre lyfter tre gånger; locket går upp lite för varje gång, och på tredje poppar det av. |
| **Barnets tur** | räkna ett, två, tre med de tre vännerna (5 s paus) |
| **Tre gånger** | tre försök, tre lyft |
| **Nya saker i kod** | inga |
| **Längd** | sagan 163 s (byggt 27 s, nytt 136 s) + ramen 16.5 s = **180 s (3:00)** |

| # | s | Del | | Vad händer (en rörelse i taget) | Malin |
|---|---|---|---|---|---|
| 1 | 3 | A | b | Kaninen vinkar | Hej kaninen! |
| 2 | 2.8 | A | b | Kaninen hoppar | Idag är det julafton! |
| 3 | 3 | B | b | Paketet skramlar | Vad finns i paketet? |
| 4 | 4 | B | b | Paketet skramlar två gånger till |  |
| 5 | 14 | B | n | Kaninen går runt paketet och klappar på det; granen lyser |  |
| 6 | 12 | C | n | Locket sitter fast; kaninens tassar är för små att lyfta det | **Oj! Locket sitter fast!** |
| 7 | 26 | D | n | Kaninen försöker tre gånger: lyft, lyft, lyft; locket rör sig inte; kaninen sätter sig och suckar | **Lyft, lyft, lyft!** |
| 8 | 2.6 | E | b | Lammet hoppar in |  |
| 9 | 2.6 | E | b | Björnen hoppar in |  |
| 10 | 6 | E | n | Alla tre tittar på paketet | **Titta, där kommer lammet och björnen!** |
| 11 | 20 | E | n | Barnets tur: alla tre tar tag; barnet bjuds in att räkna (paus 5 s) | **Kan du hjälpa till? Räkna med oss!** |
| 12 | 38 | F | n | De lyfter tre gånger; locket går upp lite för varje gång; tredje gången poppar det av | **Ett, två, tre! Nu lyfter vi tillsammans!** |
| 13 | 3 | F | b | Locket poppar av; nallen tittar upp | En nalle! |
| 14 | 2.6 | G | b | Kaninen nickar | Tack! |
| 15 | 20 | G | n | Alla tre dansar lugnt runt granen; nallen gungar med | **Hurra! Det gick!** |
| 16 | 3.4 | H | b | Alla tre vinkar | God jul! |
| | **163** | | | **Summa** | **6 nya repliker** (varav 1 delade med andra dagar) |

### 6.4 Lucka 12 och 16 som hela avsnitt, och vilka dagar som annars hellre vore hela avsnitt

Lucka 12 och 16 är i dag två gissa-filmer på ca 20 s. De kan bytas mot var sitt **helt avsnitt på ca 3 minuter**, vilket ger en lucka på drygt 3 min utan att något byggs. Båda är färdiga liggande filmer (1920×1080, med ljud) och är genomlyssnade i sin helhet med whisper 2026-11-11: inga djurnamn, ingen *"Vad kan det vara?"* och ingen *"Vad säger man?"*.

| Lucka | Avsnitt | Fil | Längd | Med ramen | Varför det passar dagen | Status |
|---|---|---|---|---|---|---|
| **12** lör 12 dec | 022 Kaninen äter frukost | `avsnitt/022-kaninen-ater-frukost/film/avsnitt-022.mp4` | 2:56 (176,5 s) | 3:13 | Lördagsfrukost dagen före Lucia, i det gula köket. Kaninen är kalenderns värd. Bordet är tomt, kritan ritar en banan, kaninen leker tittut bakom bordet och barnet hittar mjölkglaset. Mjölk, bröd och mustasch ger en mysig adventsmorgon | byggd 11 nov, `youtube.md` finns, inte publicerad |
| **16** ons 16 dec | 023 Björnen tvättar händerna | `avsnitt/023-bjornen-tvattar-handerna/film/avsnitt-023.mp4` | 2:56 (175,5 s) | 3:12 | Kladdiga tassar i bakveckan: björnen har honung på tassarna, kritan ritar tvål och handduk, tvålen är hal, och barnet hittar det sista kladdet. Björnen är ett av kalenderns djur | byggd 11 nov, `youtube.md` finns, inte publicerad |

Båda är bilderböckerna i serien *Djuren hittar på!* och har det gemensamma introt på ca 3 s i stället för avsnittens långa intro. De ligger inte på kanalen än, så de publiceras första gången i kalendern (det lättar beslut 3 i avsnitt 4, som gäller de som redan är ute). Reserv: **021 Hunden leker** (2:43, 163,2 s, också genomlyssnad och ren), som är mindre vinterlik (lekplats och boll).

**Vilka av de fjorton skulle hellre vara hela avsnitt?** Två, om tiden blir knapp:

| Lucka | Varför | Ersättare |
|---|---|---|
| **2** Tittut | Sagan är tunn: samma lek en fjärde gång, med ett problem som hänger på luckan själv (kräver att `lucka.js` får en lucka som fastnar). Tittut är redan en hel genre med färdiga filmer | Tittut med hunden på lekplatsen, `produktion/youtube/tittut/lekplatsen/hunden-hugo/hunden-hugo.mp4`, 2:37 (157,2 s), publicerad 11 nov, genomlyssnad och ren. Eller en av de andra Tittut-filmerna, men leoparden och lammet ligger redan i lucka 17 och 19 |
| **5** Pulkan | Det tyngsta bygget: två figurer som drar, en lastad pulka med tre paket, en backe och en barnhejning. Fyra av de åtta motortilläggen (M1, M2, M5 och en ny backe) behövs för den | 021 Hunden leker, `avsnitt/021-hunden-leker/film/avsnitt-021.mp4`, 2:43 (163,2 s), byggd 11 nov. Hunden ligger då i lucka 3, 8, 21 och 5, så det blir mycket hund |

Byts lucka 2 och 5 mot hela avsnitt försvinner **14 nya repliker** (ca 560 krediter) och motortilläggen M3 och en del av M1 och M2. De övriga tolv sagorna behåller sina. Det är ett val som kan tas senare: sagan för lucka 2 och 5 byggs sist  eftersom de ligger tidigt (2 och 5 dec) men har de tyngsta behoven.

Lucka 13 (Lucia) och 4 (pepparkakan) är de tunnaste sagorna, men ingen av dem har ett färdigt avsnitt som passar, så de byggs.

### 6.5 Arbetsuppskattning

Ett nytt problem betyder mycket ny film: ca 2 min per lucka är nytt, och det är en större ändring än receptet som sa en timme per lucka. Siffrorna nedan är räknade ur dispositionerna ovan.

| Lucka | Nya repliker | varav delade | Nya saker i kod | Nytt innehåll | Motortillägg |
|---|---|---|---|---|---|
| **1** | 8 | 2 | 1 | 106 s | M6, M7 |
| **2** | 11 | 5 | 0 | 130 s | M1, M3 |
| **3** | 11 | 4 | 1 | 135 s | M1, M2 |
| **4** | 9 | 4 | 0 | 136 s | M1 |
| **5** | 11 | 5 | 2 | 134 s | M1, M2, M5 |
| **6** | 8 | 4 | 1 | 130 s | M1, M4, M5 |
| **7** | 8 | 4 | 0 | 126 s | M1, M5, M6 |
| **8** | 8 | 2 | 1 | 134 s | M1, M5, M6 |
| **9** | 7 | 1 | 2 | 117 s | M7 |
| **13** | 6 | 3 | 1 | 139 s | M1 |
| **20** | 8 | 3 | 1 | 128 s | M1, M5 |
| **22** | 7 | 1 | 2 | 120 s | M7, M8 |
| **23** | 8 | 4 | 0 | 132 s | M1, M2 |
| **24** | 6 | 1 | 0 | 136 s | M1, M2 |
| **Summa** | **86 unika** | 13 delade, räknade en gång | 12 | 30 min 3 s | |

**Repliker och kostnad.** 86 nya repliker (summan över dagarna är större  eftersom 13 delas av flera dagar och bara spelas in en gång). Den senaste inspelningsomgången var 83 repliker och drog ca 3 340 ElevenLabs-krediter  alltså ca 40 per replik. Det ger **ca 3 440 krediter** för de här  en omgång av samma storlek  i en eller två tagningar. De delade är hjälparnas *"Titta  där kommer …"* och *"Tack  …"*  *"Kan du hjälpa till?"*  *"Hurra! Det gick!"*  *"Nu försöker vi igen."* och *"Tack  kritan!"*. Lucka 12 och 16 behöver inga nya repliker.

**Nya bilder.** Inga. Allt som är nytt ritas i kod i kritstilen, som stjärnan, härvan och slingan i de byggda luckorna: ringen och strålarna (1), den växande flingan (3), paketen på pulkan och pulksnöret (5), vindvirvlarna (6), den lösa moroten (8), snötussen, dropparna och taket av gran (9), isfläcken (13), ljusstumpen (20) och stödpinnarna (22). Hjälparnas djur och riggar finns redan. Blir något av det inte bra i kod görs en bild tillsammans med Sanna (*ny, görs med Sanna*), men inget kräver det i dag. **Nya ljud:** inga: vinden är `sus`, luckan som knarrar är `gung-knarr`, och resten finns (`skrubb`, `ding`, `tass`, `klapp`, `glid`, `puff`).

**Det motorerna behöver utöver det som `djur.js` och `rita.js` gör i dag.** Sagorna är skrivna så att de flesta bitar redan går: hjälparen kommer in med ett hopp (`gaster`), kritan tänder och ritar (`tand`, `ritar`), saker skimrar (`skimrar`), kulor faller, och `rita.js` har ritsteg, pop, sudda, tindra och tack.

| Kod | Behovet | Dagar | Storlek |
|---|---|---|---|
| M1 | **Gäster med egna rörelser.** I dag hoppar en gäst bara in och vinkar. Behövs: dra, skjuta, blåsa, nosa, tassa, klappa, stampa, hämta och lyfta, så att två figurer kan göra rörelserna tillsammans med saken | 2–8, 13, 20, 23, 24 | stor |
| M2 | **Saker som ändrar storlek eller läge i steg**: flingan som växer och krymper, pulkan och paketen, kulorna som rullar iväg och hämtas, locket som lyfts ett steg i taget | 3, 5, 23, 24 | medel |
| M3 | **Luckan som fastnar** (`lucka.js`): den rycker men öppnas inte, tre gånger | 2 | liten |
| M4 | **Vind**: flingorna åt sidan och lågor som slocknar och tänds igen | 6 | liten |
| M5 | **Flera saker i samma djurlucka, och kritan som ritar eller tänder under djurscenen** (i dag finns `ritar` för kulan och `tand` för ljus, var och en för sin sak): paketen på pulkan, ett nytt ljus, moroten | 5, 6, 7, 8, 20 | medel |
| M6 | **Skimmer i barnets paus på lösa saker** (efter 3 s): stjärnan, skärvan, moroten. I dag finns `skimrar` för stjärnan i lucka 23 | 1, 7, 8 | liten |
| M7 | **Suddgummit två gånger i samma lucka**, andra gången som putsar eller torkar utan att något försvinner (`rita.js`). Troligen litet att prova | 1, 9, 22 | liten |
| M8 | **Ansikte och lite lutning på granen** (`rita.js` har ansikte för stjärnan och paketet) | 22 | liten |

**Byggtid.** Ingen tid är mätt för det här. Receptet för djurdagarna sa en timme per lucka när luckan var 30 s. En saga på 3 min har ca 2 min ny film, två nya figurer i rörelse och ett eget problem, så räkna med **några timmar per lucka** och med att M1 och M2 bör göras först och en gång. De tidiga datumen är tätast: lucka 1–9 går ut 1–9 december, och sagorna för 2–5 har de tyngsta behoven.

### 6.6 Beslut för Sanna

**1. Tre minuter per lucka (nytt).** Fjorton nya sagor på ca 3 min (172–180 s med ramen)  med ett problem i varje. Det kostar ca 86 nya repliker (ca 3 440 krediter) och mycket ny film  men inga nya bilder och inga nya ljud. Rekommendation: **ja**  och bygg i ordningen 1  9  22 (kritadagarna  som bara behöver små tillägg)  sedan 3  6  7  8  13  20 och sist 2  4  5  23  24.

**2. Två problem i kritasagorna (nytt).** `regler.md` säger ett litet problem. Lucka 1, 9 och 22 har redan ett var (molnet, bandet, den grå slingan), och för tre minuter får de ett till efter första lösningen (stjärnan som är för liten, paketet som blir blött, granen som lutar). Rekommendation: **ja**, det är samma tankegång en gång till, med samma kompisar. Det är det enda stället där sagorna bryter mot regeln om ett problem.

**3. Två frågor till barnet i varje saga (nytt).** Hjälpfrågan mitt i sagan (paus 5 s) och en uppmaning i slutet (paus 4 s). `regler.md` säger en fråga utöver introfrågan, men de byggda luckorna har redan en uppmaning, och bilderböckerna har tre frågor. Rekommendation: **ja**, annars blir tre minuter långa utan barnets del.

**4. Lucka 12 och 16 som hela avsnitt (nytt).** 022 Kaninen äter frukost (12) och 023 Björnen tvättar händerna (16), vardera ca 3:13. De passar dagarna medelbra och är färdiga. De byts mot gissa-luckorna, och de två avsnitten publiceras då första gången inuti kalendern. Rekommendation: **ja.** Säg till om du hellre vill ha 021 Hunden leker (2:43) i någon av dem.

**5. Byta ut lucka 2 och 5 mot hela avsnitt (nytt).** De är de tunnaste och tyngsta sagorna (6.4). Rekommendation: **bygg dem som sagor, men bestäm i slutet av november**: har M1 och M2 inte blivit klara då, byts lucka 5 mot 021 Hunden leker och lucka 2 mot Tittut med hunden. Det kostar ingenting att vänta, eftersom de är färdiga.

**6. Granen får ansikte (nytt).** I lucka 22 blir granen en figur med ansikte i kod, som stjärnan (1) och paketet (9). Rekommendation: **ja**, så att kritadagarna har samma sort figur: något kritan ritar blir levande.

**7. Ramen i den långa videon (nytt).** Varje lucka börjar med ett långt intro (ca 12 s) och slutar med *"Vi ses i morgon!"*. I en lång video på över en timme blir det 24 stycken. Rekommendation: **behåll hela ramen på lucka 1 och korta den till ca 6 s i de övriga 23** (kalendern, dagens lucka och dörren), vilket sparar ca 4 min. Det är en egen rendering av ramen, ingen ny bild.

**8. Röstbatchen (ändrat).** Avsnitt 3 har 87 filer; de här är **86** till (ca 3 440 krediter). De 24 *"Just det, …"* och de som redan är inspelade är inte med. Rekommendation: **godkänn dispositionerna först, skriv replikerna med känslotaggar, och spela in dem i en omgång.**

### 6.7 Hela julkalendern med sagorna

Om sagorna godkänns blir den långa videon på julafton **ca 72 min** i stället för ca 30 min. Det är de 24 färdiga luckorna efter varandra, som i avsnitt 5. Räkningen (med ramen på 16.5 s i varje):

| | Luckor | Längd |
|---|---|---|
| Fjorton sagor på ca 3 min | 1–9, 13, 20, 22, 23, 24 | 40:58 |
| Hela videor | 10, 11, 14, 15, 17, 18, 19, 21 | 24:08 |
| Hela avsnitt som ersätter gissa-luckorna | 12 (022), 16 (023) | 6:25 |
| **Summa** | alla 24 | **71:31** (4291 s) |

Med den kortade ramen i lucka 2–24 (beslut 7) blir den ca 67:41. Allt annat i avsnitt 5 gäller: kapitel för alla 24, *"Vi ses i morgon!"* borttaget i lucka 1–23, mastring till −14 LUFS, miniatyr med tidsbrickan *72 min*, och samma kontroll före uppladdning. Kapitlen gör att man hittar dagens lucka i en så lång video.

