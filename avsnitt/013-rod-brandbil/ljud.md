# Ljudeffekter – avsnitt 013 Röda sången (plan, 2026-11-06)

Effekterna läggs i kodscenerna med `kit.ljud('namn', t, {vol})` och hamnar i `<scen>-effekter.wav`, som `film/satt-ihop.sh` lägger ovanpå sången (som 007). Alla filer finns i `assets/ljud/effekter/`, utom de som står som **saknas**. Bildnumren är storyboardens (`storyboard.md`). Tiderna (sångtid) är ur `rader.txt` (tagning 1, 3:06.5); avsnittstid = sångtid + 11 s.

## Regler (samma som 005–007)
- **Sången först.** Effekterna ligger lågt (vol 0,2–0,4) och helst i pauser och mellanspel, inte ovanpå sjungna ord. Ett ljud som sjungs ("tut", "svisch", "surr", "krams") får bara ett svagt eko av effekten, aldrig ett starkare ljud än rösten.
- **Lyssna på tagningen först.** Suno-prompten ber om cykeltuta på "tut, tut", susning på "blås", fis-ljud på "bläää", surr på "surr", klockspel uppåt på "upp, upp", slide whistle på "viiii" och swoosh på "svisch". Det som redan finns i tagningen läggs inte till igen.
- **Ii-oo är kören, aldrig en riktig siren.** `siren` (Gissa teckningen) används inte i det här avsnittet. Blåljuset lyser stilla och tyst.
- **En sak i taget**, som bilden: högst en effekt åt gången.
- **Inga skrämmande ljud.** Inga smällar eller tjut. "Oj, oj" och snyftet hålls små och mjuka. Ballongen far iväg, den smäller aldrig, så den får inget `pop`.
- **Upprepning hjälper.** Samma ljud för samma sak varje gång (brandbilen låter alltid lika, Nicke surrar alltid likadant).
- **Klipp aldrig sången.** Effekterna läggs där sången har plats; finns ingen paus blir effekten tyst eller hoppas över.

## Var

| Bild | Händelse | Effekt | Kommentar |
|---|---|---|---|
| 00 | introt | (jingeln finns redan) | ingenting nytt |
| 01a–01b | kritan ritar karossen, hjulen och stegen | `skrrrrt-lang` (karossen), `skrrrrt-kort` (hjul, stege, blåljus), `plupp` mellan dragen | som 007, ett drag per streck |
| 01b | pausen: blåljuset ritas | `glimt` lågt när blåljuset tänds | inget annat i pausen |
| 01c | "En brandbil!": brandbilen gungar till, zoom in | `boing` lågt, `swoosh` på zoomen | "Ii-oo" sjungs: ingen effekt |
| 02a–02b | körscenen | `brum` mycket lågt (motorn), `fagelkvitter` mycket lågt | som lastbilen i 007 |
| 02b | Pella glider förbi högt uppe | `propeller` mycket lågt, tonar in och ut | bara medan hon syns |
| 02a (vers 1) | "snabb som vinden – (svisch, svisch!)": vita puffar bakom brandbilen | `swoosh` lågt, ett per "svisch" | bara om tagningen saknar swoosh |
| 03 | Lova blinkar på "du och jag" | `pling` lågt | |
| 04a / 07a | "Röd, röd!": klapp, röda prickar poppar upp | `klapp` svagt eko, `pop` lågt per prick | låten har redan handklapp |
| 04b / 07b | "Brandbil, brandbil – (ii-oo!)": vägen målas röd | `skrrrrt-lang` lågt under kritlinjen | ingenting på "ii-oo" |
| 04c / 07c | "Upp på äppelbacken – (upp, upp!)": två skutt uppför | `boing` lågt per skutt | låten har klockspelet; boinget ligger mellan |
| 04d / 07d | "Kana, kana – (viiii!)": brandbilen åker kana | `glid` lågt när den tippar över kanten, `wiii` på "viiii" bara om tagningen saknar slide whistle | |
| 04e / 07e | "Svänga, svänga – (svisch, svisch!)": två kurvor, en vit puff per svisch | `swoosh` lågt per kurva | i kurvorna, inte på ordet |
| 04f / 07f | "Äpplen som rullar – (rull, rull!)": två äpplen trillar ner och rullar med | `studs` per äpple som landar, **saknas: `rull`** (som 007), reserv `hjul-gnissel` mycket lågt | |
| 04g / 07g | kroken: klistermärkena åker kana efter, ett per ord, guppar | `glid` mycket lågt per sak, `klistra` när de stannar, `glimt` när himlen glöder | |
| 04h / 07h | "Tut, tut!": en vit ring per tut, ekot brandbilen tutar själv | `tuta-tut` en gång på ekot | Lovas tut är sjunget; bara brandbilens får effekt |
| 04i / 07i | "Vad är rött? Titta ut!": kritsvep hem till vägen | `swoosh` på kritsvepet | |
| 05a | brandbilen stannar, Bettan kör in | `hjul-gnissel` lågt (brandbilen stannar), `brum` lågt för Bettan | |
| 05b | "Bussen är röd – tut, tut, tut!": Bettan tutar | `tuta-tut` svagt eko, en gång; `brum` när hon kör vidare | tutarna sjungs |
| 05c | ballongen seglar ner | `swoosh` lågt | |
| 05d | "blås, blås, blås": ballongen far upp, svävar iväg | `ooh` lågt när den svävar bort | blåset finns i låten; inget `pop` |
| 06a–06b | frågan och pausen (1:18.1–1:22.9) | ingenting under pausen | tagningens paus är bara ca 1,3 s (1:21.6–1:22.9), så den hålls helt tyst: inget `mmm` |
| 06c | "Bläää, bläää, bläää!" | `fniss` efter sista bläää | bläää sjungs |
| 07a–07i | refräng 2 | samma som 04a–04i | |
| 08 | kritsvep till äppelträdet, brandbilen stannar | `swoosh`, `hjul-gnissel` lågt, `fagelkvitter` lågt i bakgrunden hela scenen | |
| 09 | "krams, krams, krams" (1:54.3): Lova låtsas ta en tugga | ingenting (låtsastuggan) | krams sjungs, och vers 2 börjar direkt efter |
| 10a | Nicke flyger ner och landar på kanten (under 1:53.6–1:55.8) | `surr` kort och lågt, `pling` när han landar | tagningen har ingen lucka för repliken, så bara landningen |
| 10b | Nicke pekar upp (på "Oj, oj! Det sitter så högt!", 1:55.8) | ingenting | `oj-oj` på raden räcker |
| 11a | "Oj, oj! Det sitter så högt!" (1:55.8) | `oj-oj` lågt, efter "(Så högt!)" 1:59.3 | |
| 11b | "Stegen går upp – upp, upp …": ett steg per "upp" (2:02.0, 2:02.8, 2:03.6) | **saknas: `stege`** (ett mjukt klick per steg), reserv `ding` lågt per steg | klockspelet i tagningen kan räcka |
| 11b | "nästan, nästan": toppen stannar under äpplet | `flamt` lågt när Lova sträcker sig | |
| 11c | "Åh nej – snyft, snyft." | `snyft` lågt | snyftet sjungs; litet och kort |
| 11d | "Vem kan hjälpa?" (2:09.8) och tystnaden 2:13.6–2:16.3 | `fladder` mycket lågt när Nicke lyfter (ca 2:13.8), sedan **tyst** | tystnaden är barnets tur att ropa |
| 12a | "Flyger upp – surr, surr, surr!" | `surr` lågt under hela flygturen | surr sjungs, effekten bara som eko |
| 12b | "Knuff – plopp!" (2:20.7, 2:21.3): äpplet släpper | **saknas: `plopp`** (som 005), reserv `pop` lågt | |
| 12c | äpplet landar i Lovas tassar, "tack, tack, tack!" | `plupp` när äpplet landar (ca 2:21.8), `pling` när Nicke landar bredvid | ingen lucka för "Varsågod!" "Tack!" i tagningen: "tack, tack, tack" (2:22.6) får räcka |
| 12d | "En bit till dig – och en till mig!" | `pling` per bit som delas ut | |
| 12d | "Krams, krams, mums – hurra!" | **saknas: `krams`** (ett krispigt äppelbett), reserv `nom`; `mums` lågt på "mums", `jubel` lågt på "hurra" | |
| 13a | kritsvep till discot, "Danspaus!" | `swoosh` | |
| 13b | "Stampa, stampa!": Hulda | `dunk` lågt per stamp | |
| 13c | "Vifta, vifta!": Hugo | `vov` lågt en gång efter raden | |
| 13d | "Hoppa, hoppa!": Kanel | `boing` per hopp | |
| 14a | sammanfattningen, en sak per ord | `pop` när saken poppar upp, `klistra` när den sätter sig i bågen | som 005:s disco |
| 14b | "Röda är den snabbaste färgen!" (2:47.1), tre "Brandbil, brandbil" (2:51.8, 2:56.3, 2:59.1) | `brum` lågt | ingenting på "ii-oo" |
| 14c | "Hej då, hej då – tut, tut!" (3:01.7, tut 3:04.2) | `tuta-tut` en gång, svagt, efter sista tutet | sången slutar där (3:06.5) |
| 15 | kritirisen | `glitter` lågt | som 005–007 |

## Återanvänds och nytt

**Finns redan och används som förut:** `skrrrrt-lang`, `skrrrrt-kort`, `plupp`, `glimt`, `boing`, `swoosh`, `brum`, `fagelkvitter`, `pling`, `klapp`, `pop`, `tuta-tut`, `hjul-gnissel`, `studs`, `klistra`, `ooh`, `wiii`, `mmm`, `fniss`, `oj-oj`, `ding`, `flamt`, `snyft`, `fladder`, `surr`, `nom`, `mums`, `jubel`, `dunk`, `glitter` (005–007).

**Finns i biblioteket men är nya i ett avsnitt** (från Gissa teckningen, läggs till i `LJUDFILER` i 013:s `kit.js`): `glid` (rutschkanan, 1 tagning), `vov` (Hugo, 1 tagning).

**Används inte:** `siren`. Ii-oo är kören.

## Saknas (tysta tills de finns)
- **`krams`**: ett krispigt, mjukt bett i ett äpple, 0,3–0,6 s. Två–tre tagningar, så att "krams, krams" inte låter likadant.
- **`stege`**: ett mjukt klick när brandbilsstegen fälls upp ett steg, 0,2–0,4 s, varken gnisslande eller metalliskt hårt.
- **`plopp`**: ett litet plopp när äpplet släpper från grenen (står i `LJUDFILER` med 0 sedan 005).
- **`rull`**: ett äpple som rullar på gräs, ca 1–2 s (samma lucka som i 007).

Tills de finns används reserven i tabellen. Sanna levererar ljud (CLAUDE.md), så de skapas eller hämtas bara om hon ber om det.
