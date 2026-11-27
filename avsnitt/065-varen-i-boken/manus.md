# Avsnitt 065 – Våren i boken (plan)

**Status:** ✅ grind 1 (manus) godkänd av Sanna 2026-11-27 (*"Ja, grind 2"*), med förslagen under Öppet som de står. **Ändrat av Sanna 2026-11-27:** figuren är **musen** (inte kycklingen), kritan ritar en **gul** tulpan, fjärilen sitter på **huvudet**, och efter *"Var det en fin vårdag, musen?"* säger Malin *"Ja, det tycker jag!"*. Grind 2 (rekvisita och landskapskort) klar för granskning 2026-11-27: 4 tagningar per ark i Flow (Nano Banana, 0 krediter) i `bilder/original/ark-{a,b,c,d}-{1–4}.jpeg`, sida vid sida i `bilder/jamforelse.jpg`. Ark B och C är gjorda med A2 som förlaga, så att tulpanerna har samma form i alla lägen. **Sanna valde A2, B2, C2, D2 (2026-11-27).** Urklippen klara med tunnad kant (ca 1 %, kontrollark `bilder/grind2-urklipp.jpg`): `rekvisita/tulpan-gul.md` och `rekvisita/vattenkanna.md` med kritans konturer (`assets/rekvisita/tulpan-gul/cut/`, `assets/rekvisita/vattenkanna/cut/`), och landskapskorten i `produktion/three-rum/popupbok/bilder/` (`tulpan-{rod,lila}`, `tulpan-{gul,rod,lila}-hanger`, `tulpan-{gul,rod,lila}-knopp`, `fagelbo`). Fjärilen och nyckelpigan ritas i kod. **Grind 2 godkänd av Sanna 2026-11-27.** **Grind 3 (rösten) godkänd av Sanna 2026-11-27** (*"Ja, grind 4"*): Sannas tagning 1 (`produktion/ljud-original/roster/065/malin-tagning-1.mp3`, 2:31) delad i 48 filer i `assets/ljud/roster/varen-i-boken/`, −3 dBFS, längderna under replikblocket. Alla repliker i följd: `ljud/provlyssna-rost.m4a`. **Grind 4 (musens ljud) godkänd av Sanna 2026-11-27** (*"Ta dina förslag"*): bara befintliga ljud, val per rad i [`ljud-effekter.md`](ljud-effekter.md), i radordning i `ljud/provlyssna-mus.m4a`. **Grind 5 (storyboard och animatik) godkänd av Sanna 2026-11-27** (*"Behåll 3:55"*, lugnt tempo, ingen kortning): 46 bilder i three.js-boken, `storyboard/animatik.mp4` (3:55 med loggan, utan outro), `storyboard/kontaktark.jpg`, `storyboard/index.html`. Längre än uppskattade 3:00–3:15: `GLES` 1,0 s på 43 rader ger 43 s, som uppskattningen inte räknade med. Musen står till vänster om blomman den vattnar, eftersom de hängande kronorna hänger åt höger. Tredje avsnittet i **Kritans bok** ([`format/kritans-bok.md`](../../format/kritans-bok.md), förlagan [062 Sommaren i boken](../062-sommaren-i-boken/manus.md)), temabladets rad **Vår**. Ingen sång. Malin pratar med musen, och musen svarar med pip, ögon, öronen och svansen. Nya bilder och kritans två teckningar: [`bildlista.md`](bildlista.md). **Grind 6 (snabb förhandsvisning) klar för granskning 2026-11-27:** `scener/boken/boken.js` (förlaga 062), `scener/boken/boken.mp4` (3:53,9, 960 px, 15 fps, utan loggan), kontaktark `scener/boken/boken-snabb-ark.jpg`, täta bilder i `scener/boken/stills/tat/`. Orden mätta med whisper: "upp" 2,35/2,48/2,39 s in i 22/24/29. qa-scen och qa-film utan flaggor (tystnaderna är gisspauserna; mattan loopar inte i --snabb). Kända saker: den resta tulpanens krona går ut ur bildens överkant i närbilden, dropparna landar vid stjälkens fot, och kannan ställs ner på rad 20 så att musen kan klappa.

| | |
|---|---|
| **Titel** | Våren i boken (avsnitt 65) |
| **Figurer (1)** | **Musen** ([`karaktarer/musen-mille.md`](../../karaktarer/musen-mille.md)), v2-rigg i `assets/karaktarer/musen-mille/premium/uttryck.html` (samma API som Kanel och Ludde: `kawaii`, klapparmar `mille-arm-*-klapp.png`, öronen och svansen rör sig). Riggen ritas på musens kort som grodan i 062. Status `✅ Referensark klart`: figuren ändras inte, bara riggens poser används. Bytt från kycklingen av Sanna 2026-11-27 |
| **Statister (2 nya)** | en liten **fjäril** och en liten **nyckelpiga**, vanliga små djur sedda uppifrån (som ABC-djuren), **ritade i kod** (Sanna 2026-11-27, valt efter stillbildsprovet i `prov/insekter/`, se `bildlista.md` *Ritas i kod*), en rörelse var: nyckelpigan kryper, fjärilen fäller vingarna och flyger. Inte Fia och Nicke: de är stora tvåbenta figurer (SKALA 0,5) och skulle bli lika stora som musen (Öppet 3) |
| **Platser (1)** | **Våruppslaget i Kritans bok**: skrivbordet med den gröna boken, och inne i boken himlen på pärmen, kullarna, granarna och ett lövträd, rabatten med tre tulpaner, några små blommor och vårgrönt gräs. Inget platsbyte |
| **Pärm och siluett** | **grön** pärm, siluetten är **en tulpan i knopp** (temats huvudsak, det kritan ritar först) |
| **Saker som finns** | `produktion/three-rum/popupbok/bilder/`: himlen, molnen (tre), kullarna (bak, fram), solen (liten, högt upp, utan ansikte). `assets/bakgrunder/skogen-saker/`: `trad.png` (lövträdet med boet), `buske.png`, `sten.png`. `assets/bakgrunder/lekplatsen-saker/appeltrad.png` och `rekvisita/ek` (lövträd bland granarna). `rekvisita/blomma-rosa` och `rekvisita/blommor-gula` (små blommor där fjärilen och nyckelpigan sitter). Granarna som i 062 |
| **Nya saker** | kritans två teckningar: **gula tulpanen** och **vattenkannan** (grind 2, rekvisita). Nya landskapskort som Sanna gör i Flow: röda och lila tulpanen (knopp, utslagen, hängande), den gula hängande och som knopp (pärmens siluett), **fågelboet med tre ägg**, fjärilen, nyckelpigan. Se [`bildlista.md`](bildlista.md) |
| **I kod** | knopparna som slår ut (bildbyte med en liten pop-skala), blommorna som hänger och reser sig (bildbyte med en mjuk vickning kring stjälkens fot), vattnet ur kannan (en båge av små droppar), dropparna på fötterna, skimret, siffrorna 1, 2, 3 i krita, fjärilens vingslag, bokens öppning och stängning, små vita prickblommor i gräset |
| **Musik** | ingen ny musik. `fagelkvitter` lågt under hela scenen (Öppet 5) |
| **Kärna** | Boken öppnas och det är vår, men blommorna har inte slagit ut. Kritan ritar en gul tulpan, och då slår knopparna ut. Musen kommer upp: *"Hej, musen!"* Solen skiner, och blommorna hänger: de är törstiga. Kritan ritar en vattenkanna: *"Varsågod!"* – *"Tack, kritan!"* Första droppen hamnar på musens fötter. Sedan vattnar musen: *"Vattna, vattna … upp!"*, och en blomma reser sig varje gång. Den tredje visar barnet. Barnet ser fjärilen och nyckelpigan på blommorna, och fjärilen landar på huvudet. Sist tittar barnet upp i trädet och gissar fågelboet, med tre ägg. Hej då, och boken stängs |
| **Samtal** | Malin frågar musen, musen svarar med pip i pausen, Malin reagerar med något nytt. Raderna markerade ✱ |
| **Barnet** | gissar tre gånger (kritans tulpan och kanna, boet i trädet), räknar blommorna och äggen till tre, säger vilken blomma som fortfarande hänger (rad 18, den lila, den syns hela tiden), och tittar efter de små djuren på blommorna (rad 21, synliga från början) |
| **Favoriter** | 🐭 mus · 🌷 tulpan · 🦋 fjäril · 🐞 nyckelpiga · 🪺 fågelbo |

## Uppslaget (korten)

Bakifrån och fram, i den ordning korten reser sig när pärmen slås upp. Musens kort fälls upp sist (rad 06). Fågelboet står i trädet från början.

| Kort | Bild | Finns? | Var i uppslaget |
|---|---|---|---|
| Himlen | `popupbok/bilder/himmel.png` | ja | pärmens insida |
| Molnen | `popupbok/bilder/moln-stor/mellan/liten.png` | ja | på himlen, glider |
| Solen | `popupbok/bilder/sol.png` | ja | liten, högt upp till höger, inget ansikte (huvudsaken är tulpanen) |
| Kullarna | `popupbok/bilder/kulle-bak.png`, `kulle-fram.png` | ja | längst bak |
| Granarna | som 062 | ja | bakom kullarna, kanterna |
| Lövträdet med boet | `skogen-saker/trad.png` | ja | vänster bak. Boet ligger i en gren hela tiden, litet i helbilderna (gissning 3, rad 24) |
| Två lövträd till | `lekplatsen-saker/appeltrad.png`, `rekvisita/ek` | ja | bland granarna |
| Busken | `skogen-saker/buske.png` | ja | höger mitt |
| Gula tulpanen | **ny** (kritans teckning 1) + hängande | ny | mitt i rabatten, ritas på sidan, kortet fälls upp med `pop` |
| Röda tulpanen | **ny**: knopp, utslagen, hängande | ny | rabatten, till vänster om den gula |
| Lila tulpanen | **ny**: knopp, utslagen, hängande | ny | rabatten, längst till höger, lite fram så att den syns i helbilden |
| Små blommor | `rekvisita/blomma-rosa`, `rekvisita/blommor-gula` | ja | utspridda framför, fjärilen på den rosa, nyckelpigan på de gula |
| Fjärilen | **ny** | ny | på den rosa blomman, syns från början |
| Nyckelpigan | **ny** | ny | på de gula blommorna, syns från början |
| Vattenkannan | **ny** (kritans teckning 2) | ny | ritas på gräset bredvid musen |
| Fågelboet med tre ägg | **ny** | ny | i lövträdets gren, fälls upp på *"fågelbo"* |
| Musen | v2-riggen på kortet | ja | i gräset framför rabatten, går med små steg mellan tulpanerna |
| Marken | `kritYta`, vårgrön | kod | hela sidan, små vita prickblommor |

Uppslaget följer receptet: boken fyller bilden, tulpanerna stora och tydliga, blommorna med djuren utspridda och inte i en rad, kontaktskugga vid varje korts fot.

## Så rör det sig

Alla rörelser börjar före Malins replik (0,4–0,8 s in eller när de har landat), utom frågorna, som kommer först. Kameran glider mellan närliggande vyer och klipper när platsen i boken byts (receptet). Alla kort är platta urklipp med vit kant som fälls upp och ner kring sin fot.

| Rörelse | Hur |
|---|---|
| Boken öppnas | som 062: kameran driver mot den gröna boken, pärmen slås upp (0,9 s), korten fälls upp bakifrån och fram (ca 0,8 s), tulpanerna står som gröna knoppar, musens kort ligger kvar nedfällt. `prassel-tyg` |
| Kritan ritar tulpanen | den gula, på sidan mitt i rabatten (nära bild), via `verktyg/kritan-ritar.js`: kronan som kontur, stjälken och två blad som detaljstreck, 2–6 streck ur bilden. Gisspaus 3 s, kritan svajar. Tulpanen fylls i inifrån, `glitter`, kortet fälls upp med `pop` |
| Knopparna slår ut | den röda och den lila, en i taget (0,6 s mellan): knoppen byts mot den utslagna med en liten pop-skala (0,9 → 1,0), `pop` mjukt och `glimt` på var |
| Musens kort fälls upp | sist, med en liten efterstudsning, `pop`. Musen står i gräset framför rabatten |
| Blommorna hänger | solen glimtar, sedan hänger tulpanerna en i taget (röd, gul, lila, 0,5 s mellan): bildbyte till den hängande med en långsam vickning (ca 0,8 s), inget ljud. Musen tittar på dem, öronen sjunker lite (`oron` lågt), huvudet på sned |
| Vattenkannan i handen | kortet fälls ner, kannan glider i en båge till handens spets. Tassen ritas framför handtaget, mörkare kritkant på armen (receptets "hålla en sak"). Kannan är liten, ungefär som musens kropp |
| Vatten på fötterna | musen lutar kannan lite för tidigt: några droppar ur pipen landar på fötterna (droppar i kod med en tydlig väg: pipen → fötterna, delar sig, borta), `droppar`. Musen tittar ner, gör två små skutt |
| Vattna, vattna … upp | musen går lugnt till blomman med små steg (svansen vickar i takt), lutar kannan, en båge av droppar faller på blomman på *"vattna, vattna"* (`porl`). **På ordet "upp"** reser sig blomman (bildbyte tillbaka till den utslagna, en liten vickning), `glimt`, och en liten siffra i krita (1, 2, 3) glimtar vid blomman |
| Den lila skimrar | på rad 18 hänger bara den lila. Den skimrar svagt efter 2 s, tydligt på *"Ja, den lila!"* |
| Alla blommor glada | de tre tulpanerna vajar lite, i otakt. Musen klappar (`mille-arm-*-klapp.png`), `klapp` |
| Fjärilen och nyckelpigan | de sitter på sina blommor hela tiden, fjärilen fäller vingarna sakta. På sitt ord studsar de och glimtar. Musen går dit och tittar |
| Fjärilen på huvudet | fjärilen flyger upp i en lugn båge och landar mellan öronen, musen tittar i kors upp mot den, öronen vickar, fjärilen flyger tillbaka till sin blomma |
| Fågelboet | boet ligger i grenen hela tiden. Musen tittar upp mot trädet, en fågel piper svagt, gisspaus 3 s, boet glimtar **på ordet** "fågelbo", äggen glimtar ett i taget på *"ett, två, tre"*. Musen får `kawaii`-ögon |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, hela armen syns, på den sida som inte skyms av en tulpan, närmare vy |
| Boken stängs | kameran glider ut, korten fälls ner med musen först (som 062), pärmen slås igen, tulpanknoppen syns på pärmen. `prassel-tyg`, `landa-mjuk` |

**Inget går genom något:** korten fälls ner åt samma håll. Musen landar **på** gräset, framför rabatten, aldrig inne i en tulpan. Kannan ligger i handens spets, bakom tassen, och vattnet faller **på** blomman och **på** marken, aldrig genom ett kort. Fjärilen landar **på** huvudet. Boet ligger **på** grenen. Täta bilder (6 per sekund) i QA runt raderna 02, 04, 05, 06, 09, 12, 13, 15, 17, 19, 23, 24 och 30.

## INTRO

Lilla Kritans logotyp 1 s, sedan skrivbordet med den stängda gröna boken. Inget *"Djuren hittar på!"*-kort och inget ritintro på papper (receptet).

## BOKEN

| # | Bild (en rörelse) | Malin säger | Musen svarar, ljud |
|---|---|---|---|
| 01 | Helbild, skrivbordet: den stängda gröna boken med tulpanknoppen, ljuset glimtar långsamt över pärmen | Titta! En bok. | `fagelkvitter` mjukt, `glimt` |
| 02 | Pärmen slås upp, korten fälls upp, kameran glider långsamt in | Det är vår i boken. | `prassel-tyg`, `pop` mjukt |
| 03 | Kameran stannar vid rabatten. Tre gröna knoppar, gräset, himlen | Gräset är grönt. Men var är blommorna? | – |
| 04 | Kritan kommer in och ritar tulpanens kontur mitt i rabatten, svajar sedan. **Gissning 1** | Kritan ritar … *(paus)* Hm … vad blir det nu? *(gisspaus 3 s)* | `krita-ritar` |
| 05 | Tulpanen fylls i långsamt, kortet fälls upp | En gul tulpan! | `glitter`, `pop` mjukt |
| 05b | Halvbild, den röda och den lila knoppen öppnar sig sakta, en i taget (1 s var) | Titta. Knopparna blir blommor. | `glimt` ×2 |
| 06 | Halvbild, musens kort fälls upp i gräset. Musen vinkar | Hej, musen! Hej, hej! | `pop`, `mus-hej` |
| 06b ✱ | Samma, musen tittar på blommorna och sedan på oss. **Pausen:** förtjust pip | Tycker du om blommorna? *(paus: förtjust pip, nick)* Ja, nu är det vår! | `mus-fortjust` |
| 07 | Halvbild mot solen och rabatten: solen glimtar. Paus 1 s | Solen skiner. | `tindra` svagt |
| 07b | Samma, tulpanerna hänger sakta ner, en i taget (1 s var) | Men blommorna hänger ner. | – |
| 08 | Närbild, musen lutar huvudet, öronen sjunker | De är törstiga. Blommor behöver vatten. | `mus-nyfiken` |
| 08b ✱ | Samma, musen tittar på oss. **Pausen:** nyfiket pip | Hm … vad gör vi nu? *(paus: nyfiket pip)* | `mus-pratar` |
| 09 | Kritan kommer in och ritar en vattenkanna i gräset bredvid musen (nära bild), svajar. **Gissning 2** | Titta. Kritan ritar något. *(gisspaus 3 s)* | `krita-ritar` |
| 10 | Kannan fylls i, kortet fälls upp. Musen ser den, stora glada ögon (`kawaii`) | En vattenkanna! Varsågod, musen. | `glitter`, `pop` mjukt, `mus-fortjust` |
| 11 | Närbild, musen nickar | Tack, kritan! | glatt pip |
| 12 | Halvbild: kannan glider till musens hand. Musen lutar den för tidigt, dropparna landar på fötterna | Oj! Vatten på fötterna! | `swoosh` mjukt, `droppar`, förvånat pip |
| 12b | Samma, musen tittar på fötterna och skakar en fot lite | Ha ha, blöta fötter! | `mus-fniss` |
| 13 ✱ | Halvbild, musen tittar på den röda tulpanen | Ska du vattna blommorna? *(paus: glatt pip, nick)* Kom, vi hjälper dem! | glatt pip |
| 14 | Närbild på den röda: dropparna faller långsamt, den reser sig sakta **på "upp"** | Vattna, vattna … upp! | `porl`, `glimt` |
| 14b | Samma, en liten **1** i krita glimtar vid blomman (ritad i kod) | Den röda står upp. En! | `tindra` svagt |
| 15 | Musen går lugnt till den gula, vattnar, den reser sig **på "upp"** | Vattna, vattna … upp! | `porl`, `glimt` |
| 15b | Samma, en **2** glimtar | Den gula. Två! | `tindra` svagt, glatt pip |
| 16 | Halvbild, musen tittar runt | En blomma hänger fortfarande ner. | frågande pip |
| 17 | Hela rabatten. Barnet tittar (4 s), den lila skimrar svagt efter 2 s | Vilken blomma är törstig? *(paus 4 s)* | tyst, `glimt` svagt |
| 18 | Närbild på den lila, skimret tydligt. Musen tittar dit | Ja, den lila! | `glimt`, `mus-fortjust` |
| 19 | Musen går dit, vattnar, den reser sig **på "upp"** | Vattna, vattna … upp! | `porl`, `glimt` |
| 19b | Samma, en **3** glimtar | Den lila. Tre! | `tindra` svagt |
| 20 | Helbild över rabatten, alla tre vajar sakta. Siffrorna 1, 2, 3 glimtar en i taget på orden och tonas bort. Musen klappar | En, två, tre. Nu står alla blommorna upp. | `klapp` mjukt, `mus-fortjust` |
| 20b | Samma, solen glimtar, sedan blommorna | Vatten och sol. Så växer blommorna. | `tindra` svagt, mysigt pip |
| 21 | Hela uppslaget. Barnet tittar (3 s), fjärilen och nyckelpigan sitter på sina blommor | Ser du några små djur på blommorna? *(paus 3 s)* | tyst |
| 22 | Närbild, fjärilen fäller vingarna sakta, glimtar på sitt ord | En fjäril! | `glimt`, nyfiket pip |
| 22b | Närbild, nyckelpigan glimtar på sitt ord | Och en nyckelpiga. Röd med svarta prickar. | `glimt` |
| 23 | Halvbild: fjärilen flyger upp i en långsam båge och landar mellan musens öron. Musen tittar i kors upp mot den | Fjärilen sitter på huvudet! | förvånat pip |
| 23b | Samma, öronen vickar, fjärilen flyger tillbaka till sin blomma | Ha ha, det kittlas! | `mus-fniss-kort` |
| 24 | Halvbild mot lövträdet: boet ligger i grenen (det har stått där hela tiden, litet i helbilderna). En fågel piper i trädet. **Gissning 3** | Titta upp i trädet. Vad finns där? *(gisspaus 3 s)* | `fagel-pip` svagt |
| 24b | Närmare, boet glimtar på sitt ord. Musen `kawaii` | Ett fågelbo! | `glimt`, `mus-fortjust` |
| 24c | Närbild på boet, äggen glimtar ett i taget | Ett, två, tre små ägg. | `glimt` ×3 svagt |
| 24d | Samma, en fågel piper svagt i trädet | På våren lägger fåglarna ägg. | `fagel-pip` svagt, mysigt pip |
| 25 ✱ | Närbild, musen tittar på oss | Var det en fin vårdag, musen? *(paus: glatt pip, nick)* Ja, det tycker jag! | `mus-suck` (mysig) |
| 26 | Halvbild, musen vinkar (armen bakom kroppen) | Hej då, musen! | `mus-hejda` |
| 26b | Rabatten, tulpanerna vajar och glimtar på sitt ord | Hej då, blommorna! | `glimt` |
| 26c | Närbild, fjärilen och nyckelpigan glimtar | Hej då, fjärilen! Hej då, nyckelpigan! | `glimt` ×2 |
| 26d | Lövträdet, boet glimtar | Hej då, fågelboet! | `glimt`, `fagel-pip` svagt |
| 27 | Halvbild, musen vinkar klart | Hej då! Vi ses snart! | `mus-hejda` |
| 28 | Kameran glider ut ur boken. Korten fälls ner, musen först, pärmen slås igen | – | `prassel-tyg`, `landa-mjuk` |

**Längd:** 48 röstfiler (ca 75 s tal, tre av dem är samma *"Vattna, vattna … upp!"*). **Lugnt tempo** (Sanna 2026-11-27): `GLES` 1,0 s (062: 0,9), korten och blommorna rör sig långsamt (en sak i taget, 1 s mellan), kameran glider mjukt, ingen `visselpipa`, `fagelkvitter` mjukt under allt. Tre gisspauser på 3 s (tulpanen, kannan, boet), blomfrågan 4 s och de små djuren 3 s. Det blir ca **3:00–3:15** med loggan, i övre delen av receptets 2:30–3:15.

**Short:** uppslag 13–20b (*"Vattna, vattna … upp!"*, en, två, tre), ca 50 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/varen-i-boken/` (`01-titta-en-bok` …). Listan till `dela-tagning.py` är [`rost.txt`](rost.txt).

```
[warmly] Titta! En bok.
[happy] Det är vår i boken.
[curious] Gräset är grönt. Men var är blommorna?
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] En gul tulpan!
[warmly] Titta. Knopparna blir blommor.
[happy] Hej, musen! Hej, hej!
[curious] Tycker du om blommorna?
[happy] Ja, nu är det vår!
[warmly] Solen skiner.
[curious] Men blommorna hänger ner.
[warmly] De är törstiga. Blommor behöver vatten.
[curious] Hm … vad gör vi nu?
[warmly] Titta. Kritan ritar något.
[happy] En vattenkanna! Varsågod, musen.
[happy] Tack, kritan!
[surprised] Oj! Vatten på fötterna!
[laughs] Ha ha, blöta fötter!
[cheerfully] Ska du vattna blommorna?
[warmly] Kom, vi hjälper dem!
[playfully] Vattna, vattna … upp!
[happy] Den röda står upp. En!
[playfully] Vattna, vattna … upp!
[happy] Den gula. Två!
[curious] En blomma hänger fortfarande ner.
[curious] Vilken blomma är törstig?
[happy] Ja, den lila!
[playfully] Vattna, vattna … upp!
[happy] Den lila. Tre!
[warmly] En, två, tre. Nu står alla blommorna upp.
[warmly] Vatten och sol. Så växer blommorna.
[curious] Ser du några små djur på blommorna?
[happy] En fjäril!
[warmly] Och en nyckelpiga. Röd med svarta prickar.
[chuckles] Fjärilen sitter på huvudet!
[giggles] Ha ha, det kittlas!
[curious] Titta upp i trädet. Vad finns där?
[happy] Ett fågelbo!
[warmly] Ett, två, tre små ägg.
[warmly] På våren lägger fåglarna ägg.
[warmly] Var det en fin vårdag, musen?
[warmly] Ja, det tycker jag!
[warmly] Hej då, musen!
[warmly] Hej då, blommorna!
[warmly] Hej då, fjärilen! Hej då, nyckelpigan!
[warmly] Hej då, fågelboet!
[warmly] Hej då! Vi ses snart! [giggles]
```

*"Vattna, vattna … upp!"* läses tre gånger i blocket, så att det finns tre tagningar att välja bland. Ord som mäts per tagning med whisper: *"upp"* i 22, 24 och 29 (blomman reser sig), *"En!"*, *"Två!"*, *"Tre!"* i 23, 25, 30 och *"en, två, tre"* i 31 och 40 (siffrorna och äggen glimtar), *"tulpan"* i 06, *"fågelbo"* i 39, *"fjäril"* i 34 och *"nyckelpiga"* i 35 (glimt på ordet).

**Tagning 1 (Sanna 2026-11-27), längder efter normalisering (blir `ROST` i `rader.mjs`):** 01 1,43 · 02 2,16 · 03 3,07 · 04 1,07 · 05 3,18 · 06 1,58 · 07 2,51 · 08 1,91 · 09 1,32 · 10 1,49 · 11 2,25 · 12 1,54 · 13 3,18 · 14 1,84 · 15 2,50 · 16 3,46 · 17 1,04 · 18 2,38 · 19 2,79 · 20 1,40 · 21 1,33 · 22 3,01 · 23 2,23 · 24 3,11 · 25 2,14 · 26 2,11 · 27 1,65 · 28 1,54 · 29 3,10 · 30 2,06 · 31 5,44 · 32 2,97 · 33 2,14 · 34 1,07 · 35 3,81 · 36 2,29 · 37 2,03 · 38 2,79 · 39 1,27 · 40 3,06 · 41 1,98 · 42 2,04 · 43 1,38 · 44 1,13 · 45 1,14 · 46 3,67 · 47 1,56 · 48 3,90 s

Rättat för hand efter delningen: slutet av *"boken"* låg i början av 03 och flyttades till 02, och *"En!"* låg i början av 24 och flyttades till 23. Att lyssna på: 28 (whisper hör *"Lula"*, troligen *"lila"*) och 42 (whisper hör *"Var en fin vårdag"*, *"det"* svagt).

## Musens röst och ljuden

| Ljud | Finns? | Rader |
|---|---|---|
| Musens familj, 8 känslor i seriens ordning (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trött/trumpen, 7 pratar, 8 hej då) | **ja:** `mus-hej`, `mus-fortjust`, `mus-fniss`/`mus-fniss-kort`, `mus-suck`, `mus-nyfiken`, `mus-trumpen`, `mus-pratar`, `mus-hejda` (och `mus-pip`). Grind 4 väljer tagningarna per rad | genom hela, aldrig samma två gånger i rad |
| `pop`, `prassel-tyg`, `glimt`, `glitter`, `tindra`, `krita-ritar`, `landa-mjuk` | ja (062) | öppningen, kritans teckningar, korten, stängningen |
| `porl`, `droppar`, `swoosh`, `hopp-mjuk`, `klapp` | ja | vattnandet, fötterna, kannan, glädjeskutten, klappen |
| `fagelkvitter` (4 filer), `fagel-pip` | ja | mattan under hela scenen, boet |
| Fniss | `mus-fniss` | 12b, 23b |

## Regelkoll

- [x] 1 figur (musen), 1 plats (våruppslaget), inget platsbyte
- [x] Inga djurnamn: "musen", "fjärilen", "nyckelpigan", "kritan". Röstfilerna heter `08-hej-musen` osv.
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då varmt
- [x] Aldrig *"Vad kan det vara?"*, *"Vad säger man?"*, *"Ska vi säga tack?"* eller *"Ni pratar visst med varandra"*. Teckningen: *"Hm … vad blir det nu?"*, tacket direkt: *"Tack, kritan!"*
- [x] Kritan ritar två gånger (tulpanen, kannan), och den första är temats huvudsak och pärmens siluett, inte figuren
- [x] **Gissning (Sanna 2026-11-27):** tre gisspauser på 3 s innan Malin säger svaret: tulpanen (rad 04), kannan (09) och boet i trädet (24). Inget är gömt: boet står i trädet hela tiden
- [x] **Pedagogik, invävd:** knoppen blir en blomma (05b), blommor behöver vatten (08) och sol (20b), räkna blommorna en, två, tre (14b, 15b, 19b, 20) och äggen (24c), färgorden (gul, röd, lila, röd med svarta prickar), upp och ner (07b, 14–19), fåglarna lägger ägg på våren (24d). Malin säger varje sak en gång och bilden visar den
- [x] **Lugnt:** `GLES` 1,0 s, en sak rör sig i taget, långsamma rörelser, ingen `visselpipa`, mjuk matta, inga utrop i rad (två *"Oj!"* borttagna, *"Hurra!"* borttaget)
- [x] Barnet letar inte efter något gömt: den lila tulpanen, fjärilen och nyckelpigan syns hela tiden. Barnet tittar och säger
- [x] Inga uppmaningar att göra något med kroppen, inget *"Lyssna!"*, inga utdragna ord (*"Vattna, vattna … upp!"* är en paus, inte ett utdraget ord)
- [x] *"Varsågod"* och *"Tack, kritan!"*
- [x] Samma fras tre gånger: *"Vattna, vattna … upp!"* (rad 14, 15, 19), den tredje efter barnets hjälp
- [x] Samtal: Malin frågar, musen svarar i pausen, Malin reagerar med något nytt (06b, 08b, 13, 25). Inga tomma medhåll
- [x] Inte samma sak tre gånger: *"hänger ner"* sägs två gånger (07b, 16) och *"törstig"* två gånger (08, 17), med handling emellan
- [x] Tydliga repliker: handlingen och saken sägs (*"Ska du vattna blommorna?"*, *"Vatten på fötterna!"*)
- [x] Reaktionsslag och närbilder: 06b, 08, 11, 12b, 14b, 15b, 18, 19b, 22, 23b, 24c, 25
- [x] Bilden på orden: tulpanen fylls i på *"En gul tulpan!"*, blommorna reser sig på *"upp"*, boet och djuren glimtar på sina ord, siffrorna på *"En!"*, *"Två!"*, *"Tre!"*
- [x] Malin efter handlingen, frågorna före
- [x] Hej då till figuren och varje sak (blommorna, fjärilen och nyckelpigan, boet), en bild var
- [x] Inget går genom något (se *Så rör det sig*)
- [x] Rörelserna går med v2-riggen: raka armar, kannan i handens spets, klapp med klapparmarna, vink bakom kroppen, lugna steg och två små glädjeskutt. Musen vänds aldrig
- [x] Inget läskigt: blommorna är törstiga, inte döda, och reser sig direkt
- [x] Ingen ny musik. Allt innehåll på svenska
- [ ] **Problemet är "blommorna är törstiga"**, inte musens eget. Musen hjälper någon annan, ett vardagsproblem utan trots
- [ ] Avsteg som receptet redan har: ingen sång, boken som intro och slut, fler än 6 utsnitt
- [ ] **Avsteg från receptet:** den sista saken (boet) poppar inte upp på sitt ord. Den står i trädet hela tiden så att barnet kan gissa den (Sannas önskan om fler gissningar)
- [ ] **Bryter `format/regler.md`: fler än 2 nya saker.** Kritans två teckningar (tulpanen, kannan) är de två rekvisitasakerna. Utöver dem: gula och lila tulpanen och boet (nya landskapskort, som 062:s sandslott och blommor) och två nya statister (fjärilen, nyckelpigan). Det är temabladets innehåll, men fler bilder än 062 (Öppet 2)
- [x] Musen har v2-rigg och en hel ljudfamilj (`mus-*`), status `✅ Referensark klart`
- [ ] **Rad 25:** *"Ja, det tycker jag!"* är Sannas egen replik (2026-11-27). Den liknar de tomma medhållen som togs bort i 062 (*"Ja, det tycker jag också"*), men står kvar eftersom Sanna skrev den
- [ ] `harriets-favoriter.md` är inte uppdaterad (den här sessionen rör bara avsnittets mapp). Läggs till när manuset är godkänt

## Öppet (Sanna bestämmer)

1. **Siluetten på pärmen:** den gula tulpanen i knopp (sluten, lite gul i toppen), så att den rimmar med att kritan ritar den gula tulpanen. Alternativet är den utslagna gula tulpanen.
2. **Antalet nya bilder:** tre tulpaner i tre lägen är många kort. Enklare: bara den röda och den gula hänger och reser sig, och den lila är redan utslagen (då blir *"Vattna … upp!"* två gånger och barnets fråga försvinner). Mitt förslag: behåll tre, det är kärnan i avsnittet, och gör tulpanerna som ett ark plus en Flow-edit så att de blir lika.
3. **Fjärilen och nyckelpigan:** nya små vanliga djur (som ABC-djuren, sedda uppifrån) i stället för Fia och Nicke, som är stora tvåbenta figurer med ansikte. Det håller musen som enda figur och djuren i rätt storlek.
4. **Musens ljud:** musens befintliga familj (`mus-*`) räcker, inga nya ElevenLabs-ljud.
5. **Mattan:** `fagelkvitter` lågt under hela scenen (vår), i stället för 062:s `skogsljud`.
6. **Hänga och resa sig:** ingen `visselpipa` (lugnt, Sanna 2026-11-27). Blomman reser sig sakta med `glimt`, och siffran 1, 2, 3 i krita glimtar bredvid. Siffrorna tonas bort efter rad 20.
7. **Musen går mellan tulpanerna** med små steg och svansen som vickar (riggens gång). Kannan följer med i handen.
8. **Samma bok, ny figur per årstid:** 063 och 064 planeras samtidigt i egna sessioner. Pärmen byter färg och siluett per tema (`skapaBok(scen, { farg, figur })`), så böckerna kan stå i en rad senare.
