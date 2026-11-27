# Avsnitt 061 – Tvättbjörnen bygger i sanden (plan, version 2)

**Status:** version 2 av manuset, **grind 1 godkänd av Sanna 2026-11-27** (*"Ja, godkänt"*), med Öppet som de står (titeln kvar, ingen båt, hinken guppar en bit ut). **Grind 3 (rösten) inspelad 2026-11-27**, **godkänd av Sanna 2026-11-27: tagning 1** (*"Tagning 1"*). **Grind 4: tvättbjörnens ljud gjorda 2026-11-27**, **godkända av Sanna 2026-11-27** (*"Bra, kör vidare"*): familjen `tvattbjorn-gullig` (31 tagningar, 8 känslor) i `assets/ljud/effekter/tvattbjorn-gullig/`, provlyssning `provlyssna-tvattbjorn.m4a`. **Grind 5: animatiken byggd 2026-11-27**, **godkänd av Sanna 2026-11-27** (*"Ja, godkänd"*): `storyboard/animatik.mp4` (3:30,9 med 3,3 s intro, 45 bilder, Malins tagning 1 och tvättbjörnens ljud på sina tider), stillbilderna i `storyboard/frames/`, `storyboard/index.html`, `storyboard/kontaktark.jpg`. Ordtiderna (vatten, gnugg, rinner, plask) mätta med whisper i `storyboard/rader.mjs`. två tagningar i ElevenLabs (Malin, v3, Natural), originalen i `produktion/ljud-original/roster/tvattbjornen-bygger-i-sanden/` (`tagning-1.mp3`, `tagning-2.mp3`). Tagning 1 delad i 45 filer i `assets/ljud/roster/tvattbjornen-bygger-i-sanden/` (topp −3 dBFS, längderna i `rost-langder.txt`, 108,5 s tal), tagning 2 delad i `…/tagning-2/` som reserv per rad. Whisper hörde alla 45 rader rätt, inga filer klipps mitt i ett ord. Provlyssning: `ljud/provlyssna-rost-tagning-1.m4a` och `-2.m4a` (0,7 s mellan raderna). Sanna 2026-11-27: *"make manus not exactly same as leo on beach episode"*. Version 1 var 028 Leoparden bygger i sanden med tvättbjörnen (sanden rasar, hinkhatt, sandkakor, spaden bakom hinken, hoppa över vågor) och ligger i git (`git show HEAD:avsnitt/061-tvattbjornen-bygger-i-sanden/manus.md`). Det som redan är godkänt gäller fortfarande: tvättbjörnen (✅ riggen 2026-11-27), **grind 2 2026-11-27** (*"Ja, behåll dem"*: gula hinken `hink-gul` och röda spaden `spade-rod` som de är, inga nya saker), stranden. Provbild: `prov/stranden-prov.jpg`. Ingen röst är inspelad.

Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med tvättbjörnen, tvättbjörnen svarar med kurr, öron och svans. Förlagor för formen: [057 Katten tvättar händerna](../057-katten-tvattar-handerna/manus.md) (form och ton) och [050 Kaninen bygger torn](../050-kaninen-bygger-torn/manus.md) (en rigg som håller spaden och hinken).

## Vad som är nytt mot 028 (och 050)

Berättelsen bygger på det tvättbjörnar gör: **de tvättar saker i vatten.** Tvättbjörnen gräver en grop, det kommer vatten i den, och den vill göra en liten sjö att tvätta tassarna i.

| | 028 Leoparden bygger i sanden | 061 version 2 |
|---|---|---|
| Problemet | sanden rasar | **vattnet rinner ut mellan tassarna** när tvättbjörnen bär det till gropen |
| Kritan ritar | en hink | en hink (samma sak, nu **för att bära vatten**) |
| Leken med saken | hinkhatt | **tvättar tassarna** i pölen, *"Gnugg, gnugg!"* |
| Tre gånger | *"Klapp, klapp … sandkaka!"* | *"Vatten i hinken … plask!"* (hinken töms i gropen) |
| Barnet letar | spaden bakom hinken | **hinken guppar i vågorna** (en våg tog den medan tvättbjörnen tvättade spaden) |
| Slutet | hoppar över vågor | gropen blir **en liten sjö**, tvättbjörnen plaskar med fötterna i den |

Inget av 028:s rasande sandhög, hinkhatt, sandkakor, spade bakom hinken eller vågskutt är kvar. Mot 050 (fyll, klappa, vänd, torn i snön): inga torn, ingen vänd.

| | |
|---|---|
| **Titel** | Tvättbjörnen bygger i sanden (avsnitt 61). Introt *"Djuren hittar på!"*. (Titeln kan bli *"Tvättbjörnen gör en sjö"* om du vill, se Öppet 1) |
| **Figurer (1)** | **Tvättbjörnen** ([`karaktarer/tvattbjornen-tilda.md`](../../karaktarer/tvattbjornen-tilda.md)), v2-rigg godkänd 2026-11-27 |
| **Platser (1)** | **Stranden** (`bakgrunder/stranden.md`, `stranden-v2.png`). Inget platsbyte: gropen ligger på sanden till vänster, vattenkanten till höger |
| **Saker som finns** | [gula hinken](../../rekvisita/hink-gul.md) (kritan ritar den), [röda spaden](../../rekvisita/spade-rod.md) (ritintrot). Godkända på grind 2 |
| **Nya saker** | **inga** |
| **I kod** | gropen, sandpuffarna, vattnet som stiger i gropen (pöl → sjö), vattnet i tassarna och dropparna, vattnet som hälls ur hinken, vågorna med skumkant, hinken som guppar, stänk, skimret |
| **Musik** | ingen ny musik. `vagor` lågt under hela scenen |
| **Kärna** | Kritan ritar en spade. Tvättbjörnen gräver en grop, och det kommer vatten i den: en liten pöl! Tvättbjörnen tvättar tassarna, *"Gnugg, gnugg!"*. Den vill ha mer vatten och bär det från vågen i tassarna, men det rinner ut, två gånger. Kritan ritar en hink: *"Varsågod!"* – *"Tack, kritan!"* *"Vatten i hinken … plask!"* Två gånger. Tvättbjörnen tvättar spaden i vågen, och en liten våg tar hinken. Var är hinken? Barnet ser den guppa i vågorna. Vågen kommer tillbaka med den. *"Vatten i hinken … plask!"* Gropen blir en liten sjö, och tvättbjörnen plaskar med fötterna. Hej då! |
| **Samtal** | Malin frågar tvättbjörnen, tvättbjörnen svarar med kurr i pausen, Malin reagerar kort. Raderna markerade ✱ |
| **Barnet letar** | hinken i vågorna (rad 20). Barnet ser när vågen tar den (rad 19), så barnet vet mer än tvättbjörnen |
| **Favoriter** | 🦝 tvättbjörn · 🏖️ strand · 🪣 hink och spade · 💧 vatten |

## Så rör det sig

Alla rörelser börjar före Malins replik (0,4–0,8 s in eller när det landat), utom frågorna, som kommer först. Tvättbjörnen står på sanden med benen synliga. Gropen till vänster, vattenkanten till höger: mellan dem går tvättbjörnen med riggens gång, men oftast klipper vi i stället (närbild vid vågen, klipp, närbild vid gropen).

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång från vänster, stannar före repliken, `tass` mjukt |
| Tar spaden | spaden glider upp ur sanden till tasspetsen, tassen framför skaftet, armen med mörkare kritkant (050). En arm, den andra vilar |
| Gräver | 050:s lösning: hela den raka armen vrids lugnt ner och upp (±15°, 0,8 s), en sandpuff flyger åt sidan, `sand`. Gropen (en mörkare oval i sanden med en kant av uppkastad sand) växer i tre steg |
| Vatten i gropen | gropens botten blir mörk och blank, vattnet stiger långsamt (1,2 s) till en liten pöl med ett ljust skimmer, `blubb` eller mjukt `plupp`. Vattnet blir klart **på ordet "vatten"** |
| Tvättar tassarna | spaden ställs i sanden. Riggens klapp-armar (`arm-klapp`) framför magen, tassarna gnids lugnt mot varandra (±6 px, 2 gånger) **på "Gnugg, gnugg"**, små droppar faller ner i pölen. Tvättbjörnen står vid pölens kant, tassarna över vattnet, inte i det |
| Bär vatten i tassarna | vid vågen: klapp-armarna framför magen som en skål, en våg glider upp, vatten (en liten blå skål i kod mellan tassarna). Klipp: vid gropen är skålen tom, dropparna har droppat hela vägen (ett spår av mörka prickar i sanden bakom). **Tom på ordet "rinner"** |
| Förvånad | stora ögon, liten rund mun, öronen upp, 0,3 s stillhet |
| Öronen faller | riktningsposen `rikt −1`, tittar ner i den lilla pölen, öronen sjunker |
| Kritan ritar hinken | kritan in uppe till höger, ritar i sanden bredvid tvättbjörnen i en nära bild: ytterkonturen, hålet under handtaget, kantbandet (`hink-gul-kontur.json`, tre drag). Gisspaus 3 s, kritan svajar. Fylls i inifrån, `glitter` |
| Fyller hinken | vid vågen: hinken i tasspetsen, armen vrids ner, en våg glider upp och täcker hinkens nederkant (vågen ritas **framför** hinken), lyfts: vatten syns i öppningen bakom kanten, `plask` litet |
| Häller | vid gropen: hinken lutar sig lugnt i bildplanet (0 → 70°, 0,8 s, vrids, speglas aldrig), en vattenstråle i kod ur öppningen ner i gropen, **på ordet "plask"** stänk i pölen och vattnet stiger ett steg, `plask` |
| Tvättar spaden | vid vågen: spaden i tasspetsen doppas i en våg och lyfts, sanden på bladet är borta, droppar. Hinken står på sanden bakom tvättbjörnen, nära vattnet |
| Vågen tar hinken | medan tvättbjörnen tittar på spaden: en lite större våg glider upp runt hinken, och hinken flyter lugnt ut och guppar (±3°, ±4 px) i vågorna. Ingen dramatik, inget ljud utom `vagor`. Barnet ser det |
| Vet inte var | tittar på sanden där hinken stod, sedan åt vänster och höger (`rikt ±0,3`), frågande kurr |
| Hinken hittas | hinken guppar ute i vattnet, skimrar svagt efter 3 s, tydligt på *"Ja, där!"*. En våg bär den lugnt tillbaka och lägger den på sanden vid tassarna. Tvättbjörnen tar den, glatt skutt (20 px, inget studs) |
| Sjön | sista hällningen: vattnet stiger till kanten, gropen är en liten rund sjö med glitter, `glimt` ×3 |
| Plaskar | tvättbjörnen kliver ner i sjön: benen försvinner under vattenytan (vattnet ritas framför benen, inget går igenom), stänk vid fötterna två gånger **på "Plask, plask"**, svansen vippar |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, hela armen syns |

**Inget går genom något:** vågen ritas framför hinkens nederkant när hinken doppas. Vattnet hälls ur öppningen, inte genom sidan. Tassarna gnids över pölen, inte i sanden. I sjön står benen bakom vattenytan. Hinken flyter **på** vattnet och läggs **på** sanden. Täta bilder (6 per sekund) i QA runt rad 8, 10, 14, 15, 17, 19, 22 och 25.

## INTRO (*Djuren hittar på!*, 3,3 s)

Seriens standardintro, kortet *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`), sedan tomt papper och standardritintrot.

## KRITAN RITAR (~14 s) – papper

Kritan ritar **en spade**, inte tvättbjörnen: ytterkonturen (öglan, det långa skaftet, det spetsiga bladet) och öglans hål som ett eget drag (`spade-rod-kontur.json`), plus ett par detaljstreck mätta ur bilden (enligt `kritan-ritar`). Konturen ca 2,8 s, står kvar ca 1 s, gisspaus, sedan fylls den riktiga spaden i inifrån. Zoom in i teckningen, in på stranden, där samma spade står i sanden. Tvättbjörnen kommer in på rad 1.

## STRANDEN

| # | Bild (en rörelse) | Malin säger | Tvättbjörnen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar spadens kontur, väntar, spaden fylls i | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus 3 s)* Oj! En spade! | krita-ritar, skogsljud, `glitter` |
| 1 | Helbild, stranden. Spaden står i sanden. Tvättbjörnen trippar in, stannar och vinkar | Hej, tvättbjörnen! Hej, hej! | `tass`, kurr hej |
| 1b ✱ | Halvbild, tvättbjörnen tittar ut över havet och sedan på oss, svansen vippar. **Pausen:** glatt kurr | Hur är det, tvättbjörnen? *(paus: glatt kurr)* Jaså, du tycker om stranden! | förtjust kurr |
| 2 | Närbild på spaden, den glimtar. Klipp till tvättbjörnen som ser den | Titta, en spade i sanden! | `glimt`, nyfiket kurr |
| 3 | Halvbild, tvättbjörnen och spaden | Ska du gräva med spaden? *(paus: glatt kurr, nick)* | förtjust kurr |
| 3b ✱ | Närbild ansiktet, jätteglad. Spaden glider upp i tassen | Ja, vad kul! | `swoosh` mjukt |
| 4 | Närbild på sanden: tvättbjörnen gräver, tre sandpuffar, gropen växer | Du gräver en grop i sanden. En djup grop! | `sand` ×3 |
| 5 | Samma: gropens botten blir blank, vattnet stiger. Klipp till tvättbjörnen: förvånad, 0,3 s still | Oj! Det kommer vatten i gropen! | `blubb` mjukt, förvånat kurr |
| 6 ✱ | Närbild på pölen som skimrar. Klipp till tvättbjörnen, öronen upp | En liten pöl! | `glimt`, förtjust kurr |
| 7 | Halvbild: spaden i sanden, tvättbjörnen vid pölen gnider tassarna, droppar | Du tvättar tassarna i pölen. Gnugg, gnugg! | `droppar`, fniss-kurr |
| 7b ✱ | Närbild ansiktet, nöjd, svansen vippar | Ja, du är en riktig tvättbjörn! | pratar-kurr |
| 8 | Närbild på pölen: den är liten, tvättbjörnen tittar ner i den och sedan mot havet | Vill du ha mer vatten i pölen? *(paus: kurr, nick)* Där borta finns mycket vatten. | nyfiket kurr |
| 9 | Vid vågen: en våg glider upp, tvättbjörnen tar vatten i tassarna (skålen) | Du tar vatten i tassarna. | `vagor`, `plask` litet |
| 10 | Klipp, vid gropen: tassarna är tomma, ett spår av droppar i sanden. Förvånad | Oj då! Vattnet rinner ut! | `droppar`, förvånat kurr |
| 11 | Samma två bilder igen, snabbare. Fniss | En gång till … Oj! Det rinner ut igen! | `plask`, `droppar`, fniss-kurr |
| 12 | Närbild, tvättbjörnen tittar på sina tomma tassar, öronen faller. **Pausen:** trumpet kurr | Vattnet vill inte stanna i tassarna. *(paus: trumpet kurr)* | trumpet kurr |
| 12b ✱ | Samma, tvättbjörnen tittar upp på oss | Mm, det var inte lätt. *(paus 1 s)* Hm … hur ska vattnet komma till gropen? | frågande kurr |
| 13 | Kritan kommer in och ritar en hink i sanden bredvid tvättbjörnen (nära bild): konturen, gisspaus 3 s | Titta! Kritan ritar något i sanden. | krita-ritar |
| 13b | Hinken fylls i, glimt. Tvättbjörnen tittar, öronen upp | En hink! Varsågod, tvättbjörnen. | `glitter`, förtjust kurr |
| 13c ✱ | Närbild, tvättbjörnen lutar sig mot hinken, stora glada ögon | Oj, vilken fin hink! | nyfiket kurr |
| 13d | Tvättbjörnen nickar glatt mot kritan, som flyger ut | Tack, kritan! | förtjust kurr |
| 14 | Halvbild, tvättbjörnen tar hinken i handtaget och tittar mot vågorna | Ska du bära vatten i hinken? *(paus: glatt kurr, nick)* Ja, det gör vi! | pratar-kurr |
| 15a | Vid vågen: hinken doppas, en våg täcker nederkanten, hinken lyfts full | Först fyller du hinken i vågen. | `vagor`, `plask` litet |
| 15b | Klipp, vid gropen: hinken lutar, vatten rinner ner, stänk **på "plask"**, pölen växer | Vatten i hinken … plask! | `plask`, `glimt` |
| 16 ✱ | Närbild på den större pölen. Klipp till tvättbjörnen, jätteglad | Oj, mer vatten i gropen! | förtjust kurr |
| 17 | Samma två bilder: fyller vid vågen, klipp, häller i gropen | En gång till. Vatten i hinken … plask! | `vagor`, `plask`, `glimt` |
| 18 | Vid vågen: hinken på sanden bakom tvättbjörnen. Tvättbjörnen doppar spaden i vågen och lyfter den ren | Nu tvättar du spaden i vågen. Gnugg, gnugg! | `plask` litet, `droppar`, mysig suck |
| 19 | Samma bild, tvättbjörnen tittar på spaden. Bakom den glider en våg upp runt hinken, och hinken flyter lugnt ut | – *(2 s, bara vågorna)* | `vagor` |
| 19b | Halvbild, tvättbjörnen vänder sig mot platsen där hinken stod, tittar åt vänster och åt höger | Men … var är hinken? Tvättbjörnen vet inte var. | frågande kurr |
| 20 | Bred bild med havet. Hinken guppar i vågorna en bit ut. Skimrar svagt efter 3 s | Kan du hjälpa tvättbjörnen? Kan du se hinken? *(paus 5 s)* | tyst, `glimt-2` svagt när skimret börjar |
| 21 | Hinken skimrar tydligt. Klipp till tvättbjörnen: glatt skutt | Ja, där! I vågorna! | `glimt`, förtjust kurr |
| 22 | Halvbild: en våg bär hinken lugnt tillbaka och lägger den vid tassarna. Tvättbjörnen tar den | Vågen kommer med hinken. Du fick tillbaka den! | `vagor`, `swoosh` mjukt, pratar-kurr |
| 23 | Vid vågen fyller, klipp, vid gropen häller. Vattnet stiger till kanten | Vatten i hinken … plask! | `vagor`, `plask` |
| 24 | Helbild: gropen är en liten rund sjö, den glittrar på tre ställen. **Pausen:** stolt kurr | Nu är gropen full med vatten. En liten sjö! *(paus: stolt kurr)* | `glimt` ×3, stolt kurr |
| 24b ✱ | Närbild, tvättbjörnen stolt och jätteglad, svansen vippar | Vad bra det blev! | – |
| 25 | Halvbild: tvättbjörnen kliver ner i sjön, två stänk vid fötterna, fniss | Plask, plask! Du plaskar med fötterna. | `plask` ×2, fniss-kurr |
| 26 ✱ | Närbild, tvättbjörnen tittar på oss, mysig | Var det roligt att göra en sjö? *(paus: glatt kurr, nick)* | förtjust kurr |
| 26b ✱ | Samma, tvättbjörnen myser | Ja, det tyckte jag också! | – |
| 27 | Halvbild, tvättbjörnen i sjön vinkar (armen bakom kroppen), hinken och spaden på sanden | Hej då, tvättbjörnen! Hej då, hinken! | kurr hej då |
| 28 | Samma, tvättbjörnen vinkar klart | Hej då! Vi ses snart! | kurr hej då |
| 29 | Kritirisen runt tvättbjörnen i sjön | – | – |

**Längd:** 45 röstrader och ca 42 bilder (057: 45 rader, 3:57). Sikta på ca 3:45–4:05 med 057:s tempo (`GLES` 0,15 s, barnets pauser orörda: gisspaus 3 s, letandet 5 s).

**Short:** uppslag 13–22 (kritan ritar hinken, vatten i hinken, hinken i vågorna), ca 55 s.

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
[cheerfully] Ska du gräva med spaden?
[happy] Ja, vad kul!
[warmly] Du gräver en grop i sanden. En djup grop!
[surprised] Oj! Det kommer vatten i gropen!
[happy] En liten pöl!
[playfully] Du tvättar tassarna i pölen. Gnugg, gnugg!
[chuckles] Ja, du är en riktig tvättbjörn!
[curious] Vill du ha mer vatten i pölen?
[warmly] Där borta finns mycket vatten.
[cheerfully] Du tar vatten i tassarna.
[surprised] Oj då! Vattnet rinner ut!
[chuckles] En gång till … Oj! Det rinner ut igen!
[warmly] Vattnet vill inte stanna i tassarna.
[warmly] Mm, det var inte lätt.
[curious] Hm … hur ska vattnet komma till gropen?
[happy] Titta! Kritan ritar något i sanden.
[happy] En hink! Varsågod, tvättbjörnen.
[happy] Oj, vilken fin hink!
[happy] Tack, kritan!
[cheerfully] Ska du bära vatten i hinken?
[happy] Ja, det gör vi!
[warmly] Först fyller du hinken i vågen.
[happy] Vatten i hinken … plask!
[happy] Oj, mer vatten i gropen!
[cheerfully] En gång till. Vatten i hinken … plask!
[playfully] Nu tvättar du spaden i vågen. Gnugg, gnugg!
[curious] Men … var är hinken? Tvättbjörnen vet inte var.
[warmly] Kan du hjälpa tvättbjörnen? Kan du se hinken?
[happy] Ja, där! I vågorna!
[happy] Vågen kommer med hinken. Du fick tillbaka den!
[happy] Vatten i hinken … plask!
[happy sigh] Nu är gropen full med vatten. En liten sjö!
[happy] Vad bra det blev!
[playfully] Plask, plask! Du plaskar med fötterna.
[warmly] Var det roligt att göra en sjö?
[happy] Ja, det tyckte jag också!
[happy] Hej då, tvättbjörnen! Hej då, hinken!
[warmly] Hej då! Vi ses snart! [giggles]
```

45 rader. Ord som mäts per tagning: *"vatten"* i 11 (vattnet klart), *"Gnugg, gnugg"* i 13 och 33, *"rinner"* i 18 och 19, *"plask"* i 30, 32 och 38 (`PLASK`), *"Plask, plask"* i 41.

## Tvättbjörnens röst och ljuden

**Inget finns för tvättbjörnen än** (grind 4). Förslag: en familj `kurr-gullig` på 8 känslor i seriens fasta ordning (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken och frågande, 6 trumpen, 7 pratar, 8 hej då): ett litet, ljust, kvittrigt kurr. ElevenLabs SFX kostar krediter: fråga Sanna först. Lyssna på `assets/ljud/effekter/kurr/kurr-1.m4a` först.

| Ljud | Finns? | Rader |
|---|---|---|
| `kurr-gullig` 1–8 | **nej**, görs på grind 4 | genom hela, aldrig samma två gånger i rad |
| `sand`, `tass`, `swoosh`, `plupp` | ja (028) | 1, 3b, 4, 22 |
| `vagor` (platsmatta lågt, tydligare vid vågen), `plask`, `droppar` | ja | hela scenen, 7–25 |
| `blubb` (vattnet kommer i gropen) | kolla i `assets/ljud/effekter/`, annars Openverse | 5 |
| `glimt`, `glimt-2`, `glitter`, `krita-ritar`, `skogsljud` | ja | 01, 2, 6, 13, 15b, 20, 21, 24 |

Fniss-kurr på rad 7, 11 och 25 (aldrig två rader i följd).

## Regelkoll

- [x] 1 figur, 1 plats (stranden), inget platsbyte, **inga nya saker** (hinken och spaden godkända på grind 2)
- [x] **Inte samma som 028:** inget av rasande sand, hinkhatt, sandkakor, spade bakom hinken eller vågskutt. Inte samma som 050: inga torn
- [x] Inga djurnamn: "tvättbjörnen", "kritan", "hinken", "spaden". *"Du är en riktig tvättbjörn"* är djurets namn som ordlek, inget figurnamn
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då varmt
- [x] Aldrig *"Vad kan det vara?"*, *"Vad säger man?"* eller *"Ska vi säga tack?"*. Malin säger *"Tack, kritan!"* direkt och tvättbjörnen nickar
- [x] Ritintrot ritar en sak ur berättelsen (spaden), inte tvättbjörnen
- [x] Inga uppmaningar att göra något med kroppen. Barnets del: gissa teckningarna, **leta efter hinken** (5 s, skimmer efter 3 s, *"Ja, där!"*). Barnet har sett vågen ta den
- [x] Problemet är "kan inte" (vattnet rinner ut), och kritans sak löser det
- [x] Samma fras tre gånger: *"Vatten i hinken … plask!"* (15b, 17, 23), den tredje efter barnets hjälp
- [x] Samtal: Malin frågar, tvättbjörnen svarar i pausen, Malin reagerar (1b, 3–3b, 7–7b, 12–12b, 14, 24–24b, 26–26b)
- [x] Tydliga repliker: handlingen och saken sägs (*"Du tar vatten i tassarna"*, *"Först fyller du hinken i vågen"*)
- [x] Bilden på orden: vattnet på *"vatten"*, gnidningen på *"Gnugg, gnugg"*, tomt på *"rinner"*, stänket på *"plask"*
- [x] Inget läskigt: vågorna är små, hinken flyter lugnt och vågen bär tillbaka den, tvättbjörnen går aldrig ut i havet
- [x] Rörelserna går med v2-riggen: raka armar, klapp-armarna som skål, saken i tasspetsen, hinken lutar i bildplanet
- [x] Ingen ny musik. Allt på svenska
- [ ] **Bara en teckning av kritan i scenen** (hinken). Lärdomen från 021–024 säger två (Öppet 3)
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt, seriens intro
- [ ] **Förutsättning som inte är uppfylld:** figuren har ingen ljudfamilj (grind 4)

## Öppet (Sanna bestämmer)

1. **Titeln:** behålla *"Tvättbjörnen bygger i sanden"* eller byta till *"Tvättbjörnen gör en sjö"*, som säger vad som händer? Mappnamnet ändras då också.
2. **Lägg inte 028 och 061 efter varandra** på kanalen eller i samma mix. Plats, hink och spade är samma, berättelsen är ny.
3. **En andra teckning?** Kritan kunde rita en liten båt till sjön i slutet (*"Varsågod!"* – *"Tack, kritan!"*), som tvättbjörnen tvättar och låter flyta. Det blir en ny sak (grind 2 igen) och ca 20 s till. Mitt förslag: låt bli, filmen är lagom lång.
4. **Tvättbjörnens läte:** kurr (`kurr-gullig`) eller ett kvitter? Kostar ElevenLabs-krediter (grind 4).
5. **Hinken i vågorna:** den guppar en bit ut och vågen bär tillbaka den, tvättbjörnen går aldrig ut i vattnet. Säg till om den hellre ska ha flutit till sidan längs strandkanten (närmare, lättare att se).
