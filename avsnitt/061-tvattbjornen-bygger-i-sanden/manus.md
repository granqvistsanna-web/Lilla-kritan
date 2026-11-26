# Avsnitt 061 – Tvättbjörnen bygger i sanden (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-26 (Sanna: *"godkänn alla manus"*), med förslagen under Öppet som de står (slutet med vågorna, ingen badring). Tvättbjörnen görs först med `lk-figur`, sedan grind 2. Sanna 2026-11-26: *"dont do tvättar strumpor, building in beach instead"*. Strumpmanuset är borttaget, och det här är [028 Leoparden bygger i sanden](../028-leoparden-bygger-i-sanden/manus.md) med tvättbjörnen, skriven i den nyaste formen från 052–057. Inget är byggt: inga bilder, inget ljud, ingen röst, inga saker i `rekvisita/`. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med tvättbjörnen, tvättbjörnen svarar med kurr, öron och svans. Förlagor: 028 (berättelsen), [050 Kaninen bygger torn](../050-kaninen-bygger-torn/manus.md) (fyll, klappa, vänd med en rigg som håller spaden) och [057 Katten tvättar händerna](../057-katten-tvattar-handerna/manus.md) (form och ton).

> **⚠️ Måste göras före grind 2: tvättbjörnen finns inte än.**
> - `karaktarer/tvattbjornen-tilda.md` har status **⏳ Inget referensark ännu**. Det finns ingen v2-rigg (`premium/uttryck.html` saknas), inga delar och inga poser.
> - I `assets/karaktarer/tvattbjornen-tilda/premium/` finns bara `prompter.md` (prompten för första tagningen i Flow; steg 2–4 är inte skrivna) och `original/` med tre filer: `tilda-forsta-a-1024.jpg`, `tilda-forsta-a-forhand.jpg` och `tilda-forsta-jamforelse.jpg`. **Alla tre visar ett svart hjul med grå ekrar, inte en tvättbjörn** (tittat på dem 2026-11-26). Det finns alltså ingen användbar bild av figuren. Filerna är från 2026-11-25 och ser ut att ha hamnat fel vid nedladdningen. Jag har inte rört dem.
> - Tvättbjörnen har **ingen ljudfamilj**. I `assets/ljud/effekter/` finns bara `kurr/kurr-1.m4a` (ett enda kurr, inte gjort för tvättbjörnen). En familj på 8 känslor behövs (grind 4).
> - Figuren görs med skillen `lk-figur` (som räven och pandan) och godkänns av Sanna före grind 2. Den här sessionen gör eller ändrar inte figuren.
> - Rörelserna nedan är skrivna för en vanlig v2-rigg: korta raka armar, inget böjs och inget vänds, riggens gång, klapp, vink och uttryck.

## Vad som är samma som 028 och vad som är ändrat

**Samma:** stranden, gula hinken och röda spaden, sanden som rasar, kritan ritar hinken (*"Varsågod!"* – *"Ska vi säga tack?"* – *"Tack!"*), hinkhatten, *"Klapp, klapp … sandkaka!"* tre gånger, spaden gömd bakom hinken som barnet hittar, tre sandkakor, hoppa över de små vågorna, hej då.

| Ändrat mot 028 | Varför |
|---|---|
| Ritintrot ritar **spaden**, inte figuren | regeln från 25/11: en sak ur berättelsen. Hinken ritar kritan senare i scenen, så introt tar spaden (som 050). Spaden står sedan i sanden när tvättbjörnen kommer |
| *"Kan du också hoppa?"* är **borta** | regeln från 25/11: barnet letar, det ombeds aldrig göra en rörelse. I stället hoppar tvättbjörnen över två vågor och Malin frågar tvättbjörnen om det var roligt |
| *"Barnet övar på: klappa, hoppa"* är borta | samma regel. Barnets del: gissa teckningarna, säga tack, leta efter spaden |
| `[excited]` i 9 repliker → `[happy]`, `[surprised]`, `[playfully]` | `[excited]` används aldrig (2026-11-22) |
| Samtal: Malin frågar, tvättbjörnen svarar, Malin reagerar (12 nya rader, ✱) | mönstret från 052–057 |
| Tydligare repliker: *"Sandhögen rasar"*, *"Du sätter hinken på huvudet"*, *"Först fyller du hinken med sand"* | regeln från 25/11: handlingen och saken sägs |
| Tvättbjörnen **håller spaden** i tasspetsen och gräver själv | 028:s plan lät spaden glida själv, men den byggda filmen och 050 gick över till att figuren håller saken. 050:s lösning används |
| Sanden rasar **två gånger**, och fler reaktionsslag i närbild | fler reaktioner (25/11) |
| Nytt litet led före vågorna: tvättbjörnen **sköljer hinken i vågen** | ger en anledning att gå ner till vattnet, och tvättbjörnar tvättar saker. Kan strykas (Öppet 3) |
| 028:s **badring och bad** (repliker 28–34 i den byggda filmen) är **inte med** | uppdraget säger att filmen slutar med vågorna. Se Öppet 2 |

| | |
|---|---|
| **Titel** | Tvättbjörnen bygger i sanden (avsnitt 61). Introt *"Djuren hittar på!"* |
| **Figurer (1)** | **Tvättbjörnen** ([`karaktarer/tvattbjornen-tilda.md`](../../karaktarer/tvattbjornen-tilda.md)), **ingen rigg än**, se rutan ovan |
| **Platser (1)** | **Stranden** (`bakgrunder/stranden.md`, `stranden-v2.png`). Inget platsbyte |
| **Saker som finns** | [gula hinken](../../rekvisita/hink-gul.md) (kritan ritar den, `hink-gul-kontur.json` finns), [röda spaden](../../rekvisita/spade-rod.md) (ritintrot, `spade-rod-kontur.json` finns) |
| **Nya saker** | **inga** |
| **I kod** | sandhögen som rasar, sandpuffarna från spaden, sanden i hinken, sandkakorna, sandkorn på hinken, de små vågorna på sanden, droppar, skimret |
| **Musik** | ingen ny musik. `vagor` lågt under hela scenen (som 028) |
| **Kärna** | Kritan ritar en spade. Tvättbjörnen kommer till stranden och gräver med spaden, men sandhögen rasar, två gånger. Kritan ritar en hink: *"Varsågod!"* – *"Tack!"* Hinken hamnar på huvudet som en hatt. Sedan blir det sandkakor: *"Klapp, klapp … sandkaka!"* Två stycken. Men var är spaden? Barnet ser den bakom hinken. *"Klapp, klapp … sandkaka!"* Tre sandkakor i rad. Tvättbjörnen sköljer hinken i vågen och hoppar över de små vågorna. Hej då! |
| **Samtal** | Malin frågar tvättbjörnen, tvättbjörnen svarar med kurr i pausen, Malin reagerar kort som om hon förstått. Raderna markerade ✱ |
| **Barnet letar** | spaden bakom hinken (rad 20). Barnet ser när tvättbjörnen sticker ner spaden i sanden och ställer hinken framför (rad 18), så barnet vet mer än tvättbjörnen |
| **Favoriter** | 🦝 tvättbjörn · 🏖️ strand · 🪣 hink och spade |

## Så rör det sig

Alla rörelser börjar före Malins replik (0,4–0,8 s in eller när det landat), utom frågorna, som kommer först. Tvättbjörnen står på sanden med benen synliga (som i den byggda 028), ingen sandvall.

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång från vänster, stannar före repliken, `tass` mjukt |
| Tar spaden | spaden glider upp ur sanden till tasspetsen. Tassen ritas framför skaftet, armen får en mörkare kritkant (receptets "hålla en sak"). En arm, den andra vilar |
| Gräver | 050:s lösning: hela den raka armen vrids lugnt kring axeln, ner mot sanden och upp (±15°, 0,8 s). En sandpuff flyger i en liten båge ur spaden och landar på högen, `sand` |
| Sandhögen rasar | högen växer i två steg, står still 0,4 s, sjunker ihop mjukt och blir platt (0,8 s), `sand`. Platt **på ordet "rasar"** |
| Förvånad | stora ögon, liten rund mun, öronen upp, 0,3 s stillhet |
| Öronen faller | riktningsposen `rikt −1`, tittar ner, öronen sjunker |
| Kritan ritar hinken | kritan in uppe till höger, ritar i sanden bredvid tvättbjörnen i en egen nära bild: ytterkonturen, hålet under handtaget, kantbandet (`hink-gul-kontur.json`, tre drag). Gisspaus 3 s, kritan svajar. Fylls i inifrån, `glitter` |
| Hinken på huvudet | hinken lyfter i handtaget från tasspetsen, glider upp i en mjuk båge, vänder sig på vägen (vrids i bildplanet, speglas aldrig) och sänks ner **uppifrån** över huvudet. Öronen sticker ut under kanten, ögonen och masken syns under den |
| Hinken ner | glider upp från huvudet, vänder sig tillbaka och landar på sanden, `hink-dunk` |
| Fyll | spaden i tasspetsen, armen vrids ner mot sanden och upp mot hinken, en sandpuff flyger i en båge **över hinkens kant** och ner i den. Två gånger. Sanden syns över kanten när hinken är full |
| Vänd | hinken lyfts och vänder sig själv i en lugn båge (0,9 s) och landar upp och ner på sanden, `landa-mjuk` (050) |
| Klapp, klapp | rak tass ner på hinkens botten (armen lutar 8°, upp igen), två gånger **på orden**, hinken guppar 4 px på varje, `klapp`. Tassen stannar på hinken, inte i den |
| Sandkaka | **på ordet "sandkaka"** lyfts hinken rakt upp och sandkakan står kvar (hinkens form, ränder från kantbandet), `plupp`, `tindra`. Ordets tid mäts i varje tagning (`KAKA`) |
| Ställer undan spaden | spaden sänks rakt ner och står i sanden. Hinken ställs ner **framför** den (hinken i ett lager framför spaden). Bara skaftets ögla sticker upp ovanför hinkens kant |
| Glad klapp | riggens klapp framför magen, två gånger, svansen vippar |
| Vet inte var | tittar på tassen, sedan åt vänster och höger (`rikt ±0,3`), frågande kurr |
| Spaden hittas | öglan skimrar svagt efter 3 s, tydligt på *"Ja, där!"*. Spaden lyfts **rakt upp** bakom hinken och glider till tasspetsen. Ett glatt lugnt skutt (20 px, inget studs) |
| Går till vattnet | riggens gång åt höger mot strandkanten med hinken i tasspetsen, helbild |
| Sköljer hinken | armen vrids ner, hinken doppas i en liten våg som glider upp (vågen ritas framför hinkens nederkant), `plask`. Sandkornen på hinken är borta när den lyfts, tre droppar faller |
| Hoppar över vågen | hinken står på sanden. En liten våg (vit skumkant i kod) glider upp. **På ordet "Hopp"** ett lugnt skutt (20 px, tryck före och vid landningen), vågen glider tillbaka under tvättbjörnen. Inget studs |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, hela armen syns |

**Inget går genom något:** sanden flyger över hinkens kant och ner. Hinken sänks över huvudet uppifrån. Tassen klappar på hinkens botten. Spaden står bakom hinken i ett eget lager och lyfts rakt upp. Vågen går under fötterna vid skuttet och når aldrig upp på tvättbjörnen. Täta bilder (6 per sekund) i QA runt rad 4, 12, 15, 18, 22, 26 och 27.

## INTRO (*Djuren hittar på!*, 3,3 s)

Seriens standardintro, kortet *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`), sedan tomt papper och standardritintrot.

## KRITAN RITAR (~14 s) – papper

Kritan ritar **en spade**, inte tvättbjörnen: ytterkonturen (öglan, det långa skaftet, det spetsiga bladet) och öglans hål som ett eget drag (`spade-rod-kontur.json`), plus ett par detaljstreck mätta ur bilden (enligt `kritan-ritar`). Konturen ca 2,8 s, står kvar ca 1 s, gisspaus, sedan fylls den riktiga spaden i inifrån: gult skaft, rött blad. Zoom in i teckningen, in på stranden, där samma spade står i sanden. Tvättbjörnen kommer in på rad 1.

## STRANDEN

| # | Bild (en rörelse) | Malin säger | Tvättbjörnen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar spadens kontur, väntar, spaden fylls i | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus 3 s)* Oj! En spade! | krita-ritar, skogsljud, `glitter` |
| 1 | Helbild, stranden. Spaden står i sanden. Tvättbjörnen trippar in, stannar och vinkar | Hej, tvättbjörnen! Hej, hej! | `tass`, kurr hej |
| 1b ✱ | Halvbild, tvättbjörnen tittar ut över havet och sedan på oss, svansen vippar. **Pausen:** glatt kurr, öronen upp | Hur är det, tvättbjörnen? *(paus: glatt kurr)* Jaså, du tycker om stranden! | förtjust kurr |
| 2 | Närbild på spaden i sanden, den glimtar. Klipp till tvättbjörnen som ser den, öronen upp | Titta, en spade i sanden! | `glimt`, nyfiket kurr |
| 3 | Halvbild, tvättbjörnen och spaden | Ska du bygga i sanden med spaden? *(paus: glatt kurr, nick)* | förtjust kurr |
| 3b ✱ | Närbild ansiktet, jätteglad. Spaden glider upp i tassen | Ja, vad kul! | `swoosh` mjukt |
| 4 | Närbild på sanden: tvättbjörnen gräver, två sandpuffar, en hög växer | Du gräver med spaden. En hög med sand! | `sand` ×2 |
| 5 | Samma: högen sjunker ihop och blir platt. Klipp till tvättbjörnen: förvånad, 0,3 s still | Oj då. Sandhögen rasar! | `sand`, förvånat kurr |
| 6 | Närbild på sanden: en hög till, snabbare, den rasar också. Klipp till tvättbjörnen: fniss | En gång till … Oj! Den rasar igen! | `sand` ×2, fniss-kurr |
| 7 | Närbild, tvättbjörnen tittar ner på den platta sanden, öronen faller. **Pausen:** trumpet kurr | Sanden vill visst inte stå kvar. *(paus: trumpet kurr)* | trumpet kurr |
| 7b ✱ | Samma, tvättbjörnen tittar upp på oss | Mm, det var inte roligt. *(paus 1 s)* Hm … hur ska sanden stå kvar? | frågande kurr |
| 8 | Kritan kommer in och ritar en hink i sanden bredvid tvättbjörnen (nära bild): konturen, gisspaus 3 s | Titta! Kritan ritar något i sanden. | krita-ritar |
| 9 | Hinken fylls i, glimt. Tvättbjörnen tittar, öronen upp | En hink! Varsågod, tvättbjörnen. | `glitter`, förtjust kurr |
| 9b ✱ | Närbild, tvättbjörnen lutar sig mot hinken, stora glada ögon (kawaii) | Oj, vilken fin hink! | nyfiket kurr |
| 10 | Närbild, tvättbjörnen tittar på hinken | Ska vi säga tack? *(paus 2,5 s)* | nyfiket kurr |
| 11 | Tvättbjörnen nickar direkt, glad | Tack! | förtjust kurr |
| 12 | Halvbild: spaden ställs i sanden. Hinken lyfts i handtaget, glider upp i en båge och sänks ner över huvudet | Oj! Du sätter hinken på huvudet! | `swoosh`, `landa-mjuk` |
| 13 | Närbild ansiktet: öronen sticker ut under hinkens kant, tvättbjörnen tittar upp mot den. **Pausen:** fniss | Ha ha! En hinkhatt! *(paus: fniss-kurr)* | fniss-kurr |
| 13b ✱ | Samma, tvättbjörnen vickar lite på huvudet (±4°), hinken följer med | Jaså, tycker du om din hinkhatt? | pratar-kurr |
| 14 | Halvbild: hinken glider ner och landar på sanden. Tvättbjörnen tittar på den | Ska du bygga en sandkaka med hinken? *(paus: glatt kurr, nick)* | `hink-dunk`, förtjust kurr |
| 14b ✱ | Samma, spaden upp i tassen igen, öronen upp | Ja, det gör vi! | – |
| 15a | Närbild på bygget: spaden fyller hinken, två sandpuffar över kanten. Sanden syns över kanten | Först fyller du hinken med sand. | `sand` ×2 |
| 15b | Samma: hinken vänder sig och landar upp och ner. Två klapp på orden, hinken lyfts på *"sandkaka"* | Klapp, klapp … sandkaka! | `landa-mjuk`, `klapp` ×2, `plupp`, `tindra` |
| 16 ✱ | Närbild: sandkakan glimtar. Klipp till tvättbjörnen, jätteglad, svansen vippar | Oj, så fin den blev! | förtjust kurr |
| 17a | Närbild på bygget: spaden fyller hinken igen | Och en till. Mer sand i hinken. | `sand` ×2 |
| 17b | Samma: hinken vänder sig, två klapp, hinken lyfts. Sandkaka nummer två bredvid den första | Klapp, klapp … sandkaka! | `landa-mjuk`, `klapp` ×2, `plupp`, `tindra` |
| 18 | Halvbild: tvättbjörnen sticker ner spaden i sanden och ställer hinken framför den. Sedan klappar den glatt med tassarna. **Pausen:** stolt kurr | Två sandkakor! *(paus: stolt kurr)* | `hink-dunk`, `tass-klapp`, mysig suck |
| 19 | Halvbild, tvättbjörnen tittar på sin tomma tass, sedan åt vänster och åt höger | En sandkaka till? Men var är spaden? Tvättbjörnen vet inte var. | frågande kurr |
| 20 | Bred bild med tvättbjörnen och hinken. Efter ca 2 s klipp till närbild på hinken: spadens ögla sticker upp bakom den. Skimrar svagt efter 3 s | Kan du hjälpa tvättbjörnen? Kan du se spaden? *(paus 5 s)* | tyst, `glimt-2` svagt när skimret börjar |
| 21 | Öglan skimrar tydligt. Klipp till tvättbjörnen: glatt skutt | Ja, där! Bakom hinken! | `glimt`, förtjust kurr |
| 22 | Halvbild: spaden lyfts rakt upp bakom hinken och glider till tassen. Tvättbjörnen håller upp den | Du hittade spaden! | `swoosh` mjukt, pratar-kurr |
| 23a | Närbild på bygget: spaden fyller hinken | Sand i hinken igen. | `sand` ×2 |
| 23b | Samma: hinken vänder sig, två klapp, hinken lyfts. Sandkaka nummer tre | Klapp, klapp … sandkaka! | `landa-mjuk`, `klapp` ×2, `plupp`, `tindra` |
| 24 | Helbild: tre sandkakor i rad, de glimtar en i taget. **Pausen:** stolt kurr | Tre sandkakor i rad! *(paus: stolt kurr)* | `glimt` ×3, stolt kurr |
| 24b ✱ | Närbild, tvättbjörnen stolt och jätteglad, svansen vippar | Vad bra det blev! | – |
| 25 | Närbild på hinken i tassen: sandkorn på den. Tvättbjörnen tittar på den, sedan mot vattnet | Nu är hinken sandig. Ska du skölja hinken i vattnet? *(paus: glatt kurr)* | pratar-kurr |
| 26 | Helbild: tvättbjörnen trippar ner till strandkanten. Halvbild: en liten våg glider upp, hinken doppas i den och lyfts ren, droppar faller | Du sköljer hinken i vågen. Plask, plask! | `tass`, `vagor`, `plask`, `droppar` |
| 27 | Halvbild: hinken står på sanden. En liten våg glider upp mot fötterna, tvättbjörnen skuttar över den | Oj! En liten våg! Hopp! | `hink-dunk`, `vagor`, `landa-mjuk`, förvånat kurr |
| 28 | Samma, en våg till, ett skutt till. Klipp till närbild: fniss, öronen upp | En våg till … hopp! | `vagor`, `landa-mjuk`, fniss-kurr |
| 29 ✱ | Närbild, tvättbjörnen tittar på oss, vågen glider tillbaka bakom den | Var det roligt att hoppa över vågorna? *(paus: glatt kurr, nick)* | förtjust kurr |
| 29b ✱ | Samma, tvättbjörnen myser | Ja, det tyckte jag också! | – |
| 30 | Halvbild, tvättbjörnen vinkar (armen bakom kroppen), hinken på sanden, sandkakorna bakom | Hej då, tvättbjörnen! Hej då, hinken! | kurr hej då |
| 31 | Samma, tvättbjörnen vinkar klart | Hej då! Vi ses snart! | kurr hej då |
| 32 | Kritirisen runt tvättbjörnen och hinken | – | – |

**Längd:** 47 röstrader och ca 44 bilder (057: 45 rader, 3:57). Sikta på ca 3:45–4:05 med 057:s tempo (`GLES` 0,15 s, barnets pauser orörda: gisspaus 3 s, tack 2,5 s, letandet 5 s).

**Short:** uppslag 15a–23b (sandkakorna och spaden bakom hinken), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/tvattbjornen-bygger-i-sanden/` (`01-kritan-ritar` …). Listan till `dela-tagning.py` är [`rost.txt`](rost.txt). Spelas in först när manuset är godkänt (grind 3).

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En spade!
[happy] Hej, tvättbjörnen! Hej, hej!
[warmly] Hur är det, tvättbjörnen?
[happy] Jaså, du tycker om stranden!
[happy] Titta, en spade i sanden!
[cheerfully] Ska du bygga i sanden med spaden?
[happy] Ja, vad kul!
[warmly] Du gräver med spaden. En hög med sand!
[surprised] Oj då. Sandhögen rasar!
[chuckles] En gång till … Oj! Den rasar igen!
[warmly] Sanden vill visst inte stå kvar.
[warmly] Mm, det var inte roligt.
[curious] Hm … hur ska sanden stå kvar?
[happy] Titta! Kritan ritar något i sanden.
[happy] En hink! Varsågod, tvättbjörnen.
[happy] Oj, vilken fin hink!
[warmly] Ska vi säga tack?
[happy] Tack!
[surprised] Oj! Du sätter hinken på huvudet!
[laughs] Ha ha! En hinkhatt!
[chuckles] Jaså, tycker du om din hinkhatt?
[cheerfully] Ska du bygga en sandkaka med hinken?
[happy] Ja, det gör vi!
[warmly] Först fyller du hinken med sand.
[happy] Klapp, klapp … sandkaka!
[happy] Oj, så fin den blev!
[cheerfully] Och en till. Mer sand i hinken.
[happy] Klapp, klapp … sandkaka!
[happy] Två sandkakor!
[curious] En sandkaka till? Men var är spaden? Tvättbjörnen vet inte var.
[warmly] Kan du hjälpa tvättbjörnen? Kan du se spaden?
[happy] Ja, där! Bakom hinken!
[happy] Du hittade spaden!
[cheerfully] Sand i hinken igen.
[happy] Klapp, klapp … sandkaka!
[happy sigh] Tre sandkakor i rad!
[happy] Vad bra det blev!
[curious] Nu är hinken sandig. Ska du skölja hinken i vattnet?
[playfully] Du sköljer hinken i vågen. Plask, plask!
[surprised] Oj! En liten våg! Hopp!
[playfully] En våg till … hopp!
[warmly] Var det roligt att hoppa över vågorna?
[happy] Ja, det tyckte jag också!
[happy] Hej då, tvättbjörnen! Hej då, hinken!
[warmly] Hej då! Vi ses snart! [giggles]
```

47 rader. Ord som mäts per tagning: *"klapp"*, *"klapp"* och *"sandkaka"* i 27, 30 och 37 (`KAKA`), *"rasar"* i 11 och 12, *"Hopp"* i 42 och 43.

## Tvättbjörnens röst och ljuden

**Inget finns för tvättbjörnen än** (grind 4). Förslag: en familj `kurr-gullig` på 8 känslor i seriens fasta ordning (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken och frågande, 6 trumpen, 7 pratar, 8 hej då): ett litet, ljust, kvittrigt kurr, som figurfilen beskriver (*"ett litet glatt kvitter"*). Riktiga tvättbjörnsläten i gullig form, inga ord. ElevenLabs SFX kostar krediter: fråga Sanna först. Lyssna på `assets/ljud/effekter/kurr/kurr-1.m4a` först, om den passar som en av känslorna.

| Ljud | Finns? | Rader |
|---|---|---|
| `kurr-gullig` 1–8 | **nej**, görs på grind 4 | genom hela, aldrig samma två gånger i rad |
| `sand`, `hink-dunk`, `klapp`, `tass-klapp`, `plupp`, `swoosh`, `landa-mjuk`, `tass` | ja (028) | 4–6, 12–18, 15–23 |
| `vagor` (platsmatta, lågt, och tydligare vid vågorna), `plask`, `droppar` | ja | hela scenen, 26–28 |
| `tindra` på "sandkaka", `glimt` på *Ja, där!* och när något fylls i, `glimt-2` för skimret i pausen | ja | 15b, 17b, 23b, 2, 21, 24, 20 |
| `glitter`, `krita-ritar`, `skogsljud` (ritintrot) | ja | 01, 8, 9 |

Fniss-kurr på rad 6, 13 och 28 (receptets 3–4, aldrig två rader i följd). Vill Sanna ha fler som i 057: 3b, 16 och 24b passar.

## Regelkoll

- [x] 1 figur, 1 plats (stranden), inget platsbyte, **inga nya saker**
- [x] Inga djurnamn: "tvättbjörnen", "kritan", "hinken", "spaden". Röstfilerna heter `04-hej-tvattbjornen` osv.
- [x] Varje replik har en v3-tagg, ingen `[excited]` (028 hade nio). Hej då varmt
- [x] Aldrig *"Vad kan det vara?"* eller *"Vad säger man?"*. Ritintrot: *"Hm … vad blir det nu?"*, tacket: *"Ska vi säga tack?"* (paus 2,5 s)
- [x] Ritintrot ritar en sak ur berättelsen (spaden), inte tvättbjörnen
- [x] Inga uppmaningar att göra något med kroppen: 028:s *"Kan du också hoppa?"* är borta. Barnets del: gissa teckningarna, säga tack, **leta efter spaden** (5 s, närbild med öglan framme, skimmer efter 3 s, *"Ja, där!"*)
- [x] Problemet är "kan inte" (sanden rasar), inte "vill inte". Samma som 028, eftersom Sanna vill ha samma berättelse
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"Klapp, klapp … sandkaka!"* (rad 15b, 17b, 23b), den tredje efter barnets hjälp
- [x] Samtal: Malin frågar, tvättbjörnen svarar i pausen, Malin reagerar (1b, 3–3b, 7–7b, 13–13b, 14–14b, 24–24b, 29–29b)
- [x] Tydliga repliker: handlingen och saken sägs
- [x] Reaktionsslag och närbilder: 2, 3b, 5, 6, 7, 9b, 13, 16, 21, 24b, 28
- [x] Bilden på orden: högen platt på *"rasar"*, tassen på *"klapp"*, hinken lyfts på *"sandkaka"*, skuttet på *"Hopp"*
- [x] Malin efter handlingen, frågorna före
- [x] Inget går genom något (se *Så rör det sig*)
- [x] Rörelserna går med en vanlig v2-rigg: raka armar, saken i tasspetsen, klapp, gång, vink bakom kroppen. Inget böjs, figuren vänds aldrig, lugna skutt utan studs
- [x] Tydligt hej och hej då med vinkning. Inget läskigt: vågorna är små och går under fötterna, sanden rasar mjukt, ingen gråt
- [x] Ingen ny musik. Allt innehåll på svenska
- [ ] **Bara en teckning av kritan i scenen** (hinken). Lärdomen från 021–024 säger två. 028:s andra teckning var badringen, som inte är med här (Öppet 2)
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt, seriens intro i stället för titel och nummer
- [ ] Avsteg mot receptets "tre frågor till barnet": här två (tack 2,5 s, spaden 5 s) plus gisspauserna i ritintrot och vid hinken, enligt 25/11-regeln
- [ ] **Förutsättning som inte är uppfylld:** figuren har ingen v2-rigg och ingen ljudfamilj (rutan överst)
- [ ] `harriets-favoriter.md` och README-rader: görs av huvudsessionen, inte här

## Öppet (Sanna bestämmer)

1. **Tvättbjörnen måste göras först.** Ingen bild av figuren finns: de tre filerna i `premium/original/` visar ett hjul. Ska figuren göras med `lk-figur` i en egen session nu (första tagningen i Flow, 0 krediter, du väljer), och ska de tre felaktiga filerna tas bort?
2. **Slutet: vågorna eller badringen?** Det här manuset slutar med vågorna, som uppdraget säger. Men den **byggda** 028-filmen fortsätter: vattnet är stort, leoparden vågar inte, kritan ritar en badring (*"Varsågod!"* – *"Tack, kritan!"*), och hon flyter och plaskar. Vill du ha med det också blir det kritans andra teckning, ca 7 repliker och 30–40 s till (över 4:15), och [badringen](../../rekvisita/badring.md) finns redan i två delar. Mitt förslag: sluta med vågorna, så att 061 inte blir en ren kopia och längden håller.
3. **Tvättbjörnen sköljer hinken i vågen** (rad 25–26) är nytt mot 028. Det ger en anledning att gå ner till vattnet och passar en tvättbjörn. Stryk de två raderna om du vill ha det precis som 028 (*"Titta, små vågor! Hopp!"* direkt efter sandkakorna).
4. **Samma berättelse som 028 med ett annat djur.** Lägg inte 028 och 061 efter varandra på kanalen eller i samma mix. 050 (kaninen bygger torn i snön) är också nära.
5. **Grå tvättbjörn på grå-beige sand.** Sanden är `#E7DFD8` och tvättbjörnen `#9A949C` med svarta ben. Den vita kanten hjälper, men prova i första stillbilden när riggen finns. Sandkakorna ritas lite mörkare än sanden, som i 028.
6. **Hinken och spaden:** 028:s gula hink (v2) och röda spade (v1-krita) används. För 050 ville du ha nya, finare hink och spade (`avsnitt/050-kaninen-bygger-torn/nya-hink-spade-prompter.md`). Finns de nu, och ska 061 använda dem? Då behövs nya konturer till kritan.
7. **Spaden bakom den gula hinken:** spadens skaft är gult som hinken, så bara öglan ovanför kanten syns. I 028 fungerade det, men säg till om spaden hellre ska luta ut vid sidan.
8. **Tvättbjörnens läte:** kurr (`kurr-gullig`) eller ett kvitter? Ljudfamiljen kostar ElevenLabs-krediter (grind 4).
9. **Hinkhatten på tvättbjörnen:** masken och ögonen ska synas under hinkens kant. Hur högt hinken ska sitta mäts när riggen finns.

## Saker: finns och nya

**Finns (används som de är):**

| Sak | Fil | Roll |
|---|---|---|
| Gula hinken | `rekvisita/hink-gul.md`, `assets/rekvisita/hink-gul/cut/hink-gul-tunn.png`, `hink-gul-kontur.json` | kritan ritar den, hinkhatten, sandkakorna |
| Röda spaden | `rekvisita/spade-rod.md`, `assets/rekvisita/spade-rod/cut/spade-rod.png`, `spade-rod-kontur.json` | ritintrot, gräva, gömd bakom hinken |
| Stranden | `bakgrunder/stranden.md`, `assets/bakgrunder/stranden/stranden-v2.png` | platsen |
| Sandslottet, badringen | `rekvisita/sandslott.md`, `rekvisita/badring.md` | används **inte** (badringen bara om Öppet 2 blir ja) |

**Nya:** inga.

I kod utan egen rekvisitafil (som i 028): sandhögen, sandpuffarna, sanden i hinken, sandkakorna, sandkornen på hinken, vågorna med skumkant, dropparna, skimret. Kopieras ur 028:s `scener/stranden/index.html` när scenen byggs, med kritan genom `verktyg/kritan-ritar.js`.
