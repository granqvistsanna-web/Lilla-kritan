# Ljudeffekter – avsnitt 013 Röda sången (plan, 2026-11-06, v2 med kaninen 2026-11-07, ny struktur 2026-11-08: tagning 3 är tagen, tiderna står i storyboard-v2/storyboard.md)

Effekterna läggs i kodscenerna med `kit.ljud('namn', t, {vol})` och hamnar i `<scen>-effekter.wav`, som `film/satt-ihop.sh` lägger ovanpå sången (som 007). Alla filer finns i `assets/ljud/effekter/`, utom de som står som **saknas**. Bildnumren är [storyboard-v2](storyboard-v2/storyboard.md):s. Tiderna (sångtid) är ur `rader.txt` (tagning 2 med kaninen, 3:20.8, ca 120 bpm); avsnittstid = sångtid + 11 s.

## Regler (samma som 005–007)
- **Sången först.** Effekterna ligger lågt (vol 0,2–0,4) och helst i pauser och mellanspel, inte ovanpå sjungna ord. Ett ljud som sjungs ("tut", "svisch", "tass", "nam") får bara ett svagt eko av effekten, aldrig ett starkare ljud än rösten.
- **Lyssna på tagningen först.** Suno-prompten ber om cykeltuta på "tut, tut", susning på "blås", fis-ljud på "bläää", tassteg på "tass", klockspel uppåt på "upp, upp", slide whistle på "viiii" och swoosh på "svisch". Det som redan finns i tagningen läggs inte till igen.
- **Ii-oo är kören, aldrig en riktig siren.** `siren` (Gissa teckningen) används inte i det här avsnittet. Blåljuset lyser stilla och tyst.
- **En sak i taget**, som bilden: högst en effekt åt gången.
- **Inga skrämmande ljud.** Inga smällar eller tjut. "Oj, oj" och snyftet hålls små och mjuka. Ballongen far iväg, den smäller aldrig, så den får inget `pop`.
- **Upprepning hjälper.** Samma ljud för samma sak varje gång (brandbilen låter alltid lika, musen tassar alltid likadant).
- **Klipp aldrig sången.** Effekterna läggs där sången har plats; finns ingen paus blir effekten tyst eller hoppas över.

## Röster (BERÄTTAREN, introt)

| Bild | Tid | Replik | Fil |
|---|---|---|---|
| 01a | 0:11.5 | "Titta!" | `assets/ljud/roster/titta-1.m4a` (2026-11-09, ersätter "Vad ritar kritan? Något runt."; `titta-2` mjuk och `titta-3` ljus finns också) |
| 01b | 0:21.4 | "Vad kan det vara?" | finns: `assets/ljud/roster/vad-kan-det-vara-1…5.m4a` |
| 01c | 0:27.0 | "Ett äpple! Ett rött äpple!" | `assets/ljud/roster/ett-rott-apple-4.m4a` (samma tagning som raden ovan) |
| 01c | 0:30.6 | "Nu kör vi!" | ny: `assets/ljud/roster/nu-kor-vi-1.m4a` |

## Var

| Bild | Händelse | Effekt | Kommentar |
|---|---|---|---|
| 00 | introt | (jingeln finns redan) | ingenting nytt |
| 01a–01b | kritan ritar äpplet, skaftet och bladet | `skrrrrt-lang` (äpplet), `skrrrrt-kort` (skaft, blad), `plupp` mellan dragen | som 007, ett drag per streck |
| 01b | pausen: barnet gissar | ingen effekt | tyst paus |
| 01c | "Ett äpple!": äpplet gungar till, brandbilen kör in, zoom in | `boing` lågt, en mjuk ii-oo (två toner, hög och låg, lågt) när brandbilen kör in, `swoosh` på zoomen | ii-oo sjungs inte längre här: ljudeffekt |
| 02a–02b | körscenen | `brum` mycket lågt (motorn), `fagelkvitter` mycket lågt | som lastbilen i 007 |
| 02a (vers 1) | "snabb som vinden – (svisch, svisch!)": vita puffar bakom brandbilen | `swoosh` lågt, ett per "svisch" | bara om tagningen saknar swoosh |
| 03 | Kaninen blinkar på "du och jag" | `pling` lågt | |
| 04a / 07a | "Röd, röd!": klapp, röda prickar poppar upp | `klapp` svagt eko, `pop` lågt per prick | låten har redan handklapp |
| 04b / 07b | "Brandbil, brandbil – (ii-oo!)": brandbilen kör in bland träden | `brum` mycket lågt | ingenting på "ii-oo" |
| 04c / 07c | "Upp på äppelbacken – (brum, brum!)": brandbilen kör uppför | `brum` lågt, ett per "brum" | bara om tagningen saknar tubans brum |
| 04d / 07d | "Sicksack mellan träden – (sick, sack!)": träden lutar sig | `swoosh` lågt per sväng | låten har woodblock på "sick, sack"; då inget |
| 04e / 07e | "Studsa på äpplena – (boing, boing!)": två studs i närbild | `boing` lågt per studs | låten har boing; då inget |
| 04f / 07f | "Nerför backen – (wiii!)" | `swoosh` lågt | låten har en visselflöjt på "wiii"; då inget |
| 04g / 07g | kroken: mållinjen, klistermärkena åker efter, ett per ord | `klistra` per klistermärke, `glimt` när backen glöder | |
| 04h / 07h | "Tut, tut!": en vit ring per tut | `tuta-tut` svagt eko på ekot | |
| 04i / 07i | "Vad är rött? Titta ut!": äppelsvepet hem till vägen | `swoosh` | |
| 05a | brandbilen stannar, bussen kör in | `hjul-gnissel` lågt (brandbilen stannar), `brum` lågt för bussen | |
| 05b | "Bussen är röd – tut, tut, tut!": bussen tutar | `tuta-tut` svagt eko, en gång; `brum` när den kör vidare | tutarna sjungs |
| 05c | ballongen seglar ner | `swoosh` lågt | |
| 05d | "blås, blås, blås": ballongen far upp, svävar iväg | `ooh` lågt när den svävar bort | blåset finns i låten; inget `pop` |
| 06a–06b | frågan och gissningspausen (sångtid 1:05.9–1:08.4, avsnittstid 1:37.5–1:40.0) | ingenting under pausen | pausen är 2,0 s inlagd tystnad plus tagningens egen halva sekund; den hålls helt tyst: inget `mmm` |
| 06c | "Bläää, bläää, bläää!" | `fniss` efter sista bläää | bläää sjungs |
| 07a–07i | refräng 2 | samma som 04a–04i | |
| 08a | chilibilen kör in från andra hållet | `hjul-gnissel` lågt (brandbilen stannar), `brum` mycket lågt | |
| 08b | "En chilibil – brum, brum, brum!": chilibilen guppar | ingenting | brum sjungs |
| 09 | "Hej, musen!" "Pip, pip! Smaka – lite, lite!" | `pip` lågt efter "pip, pip" | bara om det får plats |
| 10 | "nam! (Oj!)": den stora tuggan | **saknas: `tugg`** (ett litet bett), reserv ingenting | "Oj!" sjungs |
| 11a–11b | "Så starkt!", "puh, puh, puh" | ingenting, eller `puff` mycket lågt per puh | musiken är tunn; inget som låter ont |
| 11d | "Vem kan hjälpa?" och den tysta takten | `glimt` lågt när slangrullen glimtar | ledtråden |
| 12a | "Slangen!": musen drar ut slangen | `swoosh` mycket lågt | |
| 12b | "plask, plask, plask": vattenbågen | **saknas: `plask`** (ett litet, mjukt plask), reserv `plupp` | bara om tagningen saknar plask |
| 12c | "Glugg, glugg – ahh!" | ingenting | glugg sjungs |
| 12d | "Ett regn på alla – hihihi!" | `regn` mycket lågt (Openverse), `fniss` efter raden | inget kallt eller blött som skrämmer |
| 12e | "Nam, nam – så sött! Hurra!" | **saknas: `tugg`**, `pling` när äpplet delas | |
| 13a | äppelsvep till discot, "Danspaus!" | `swoosh` | |
| 13b | "Stampa, stampa!": björnen | `dunk` lågt per stamp | |
| 13c | "Vifta, vifta!": lammet viftar på svansen | `fniss` lågt en gång efter raden | |
| 13d | "Hoppa, hoppa!": Gurra | `boing` per hopp | |
| 14a | sammanfattningen, en sak per ord | `pop` när saken poppar upp, `klistra` när den sätter sig i bågen | som 005:s disco |
| 14b | "Röda är den snabbaste färgen!" (2:43.1), "Brandbil, brandbil" (fyra gånger snabbt, 2:45.8–2:51.3) | `brum` lågt | ingenting på "ii-oo" |
| 14c | "Hej då, hej då – tut, tut!" (2:51.8, tut 2:52.9) | `tuta-tut` en gång, svagt, efter sista tutet | sedan outro med la-la-la till 3:20.8 |
| 15 | kritirisen | `glitter` lågt | som 005–007 |

## Återanvänds och nytt

**Finns redan och används som förut:** `skrrrrt-lang`, `skrrrrt-kort`, `plupp`, `glimt`, `boing`, `swoosh`, `brum`, `fagelkvitter`, `pling`, `klapp`, `pop`, `tuta-tut`, `hjul-gnissel`, `studs`, `klistra`, `ooh`, `wiii`, `mmm`, `fniss`, `oj-oj`, `ding`, `flamt`, `snyft`,  `nom`, `mums`, `jubel`, `dunk`, `glitter` (005–007).

**Finns i biblioteket men är nya i ett avsnitt** (från Gissa teckningen, läggs till i `LJUDFILER` i 013:s `kit.js`): inga längre (`glid` och `vov` behövs inte efter att rutschkanan och hunden utgick).

**Används inte:** `siren`. Ii-oo är kören.

## Saknas (tysta tills de finns)
- **`tass`** och **`pip`**: musens små tassteg och ett litet pip (står i `karaktarer/musen-mille.md`: "små snabba tassteg"). Kolla biblioteket först; reserv `plupp` mycket lågt.
- **`tugg`**: ett krispigt, mjukt bett i ett äpple, 0,3–0,6 s. Två–tre tagningar, så att "nam, nam" inte låter likadant.
- **`stege`**: ett mjukt klick när brandbilsstegen fälls upp ett steg, 0,2–0,4 s, varken gnisslande eller metalliskt hårt.
- **`plopp`**: ett litet plopp när äpplet släpper från grenen (står i `LJUDFILER` med 0 sedan 005).
- **`plask`**: ett litet, mjukt plask i en grund pöl, 0,3–0,5 s, två tagningar.

Tills de finns används reserven i tabellen. Sanna levererar ljud (CLAUDE.md), så de skapas eller hämtas bara om hon ber om det.
