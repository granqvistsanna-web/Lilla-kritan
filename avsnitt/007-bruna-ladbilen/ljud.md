# Ljudeffekter – avsnitt 007 Bruna sången (plan, 2026-11-05)

Effekterna läggs i kodscenerna med `LJ('namn', t, {vol})` (kit.js) och hamnar i `<scen>-effekter.wav`, som `film/satt-ihop.sh` lägger ovanpå sången. Alla filer finns i `assets/ljud/effekter/`, utom de två som står som **saknas**.

## Regler (samma som 005 och 006)
- **Sången först.** Effekterna ligger lågt (vol 0,2–0,4) och helst i pauser och mellanspel, inte ovanpå sjungna ord. Ett ljud som sjungs ("brum", "dunk", "tut") får bara ett svagt eko av effekten, aldrig ett starkare ljud än rösten.
- **En sak i taget**, som bilden: högst en effekt åt gången.
- **Inga skrämmande ljud.** Inga smällar eller tjut. "Oj, oj" och snyftet hålls små och mjuka.
- **Upprepning hjälper.** Samma ljud för samma sak varje gång (lastbilen låter alltid lika), så att barnet känner igen det.

## Var

| Bild | Händelse | Effekt | Kommentar |
|---|---|---|---|
| 01 | introt | (jingeln finns redan) | ingenting nytt |
| 02–02b | kritan ritar flaket, hytten och hjulen | `skrrrrt-kort`, `skrrrrt-lang` | som 006, ett drag per streck |
| 02c | "En lastbil!": lastbilen skumpar till | `boing` (lågt), `tuta-tut` på "Tut-tut" | tutet ligger i pausen före "nu kör vi" |
| 03–04a | körscenen | `brum` (mycket lågt, motorn), `plupp` på några avgaspuffar i mellanspelet | puffarna är tysta när det sjungs |
| 05a | björnstampet "Brun, brun, brun!" | `duns` lågt på varje stamp | låten har redan stampen; effekten bara förstärker |
| 05b | "Lastbil, lastbil – brum, brum" | `brum` svagt eko | |
| 05c–05d | uppför bullen ("upp, upp"), nerför ("vii!") | `wiii` på "vii" (lågt) | låten har redan en slide whistle om Suno gjorde den; lyssna först och hoppa över om den finns |
| 05e | flaskorna sprutar kolasås och choklad | **saknas: `klick-spruta`** (ett mjukt flaskpruttande sprut), annars `pschhh` + `slurp` | ett sprut per flaska, på "Kolasås" och "choklad" |
| 05f | "mums, mums" | `mums` (lågt) | flaskorna glider upp tyst |
| 05g–05h | "Tut tut tut tut – vad är brunt?" | `tuta-tut` en gång | |
| 06–06b | kotten trillar ur granen och studsar | `fladder` (grenen gungar), `dunk` på varje studs | dunket sjungs också: håll effekten lägre än rösten |
| 08–08c | frågan "Vad mer är brunt?" och pausen | ingenting under pausen | barnet ska svara i tystnad; ett litet `pling` när Bulle klappar sig på magen ("Björnen är brun!") |
| 09a–09h | refräng 2 | samma som 05a–05h | |
| 10 | kritsvep till ängen | `swoosh` | |
| 11–11b | ängen, Fia flyger förbi | `fagelkvitter` mycket lågt som bakgrund, `fladder` när Fia passerar | |
| 11d–12 | Luddes replik i de inlagda takterna | `ba` på "Bää!", `pling` när han räcker fram bullen | repliker utan röst än (som 006); se öppna frågor |
| 13a–13b | "Oj, oj, bullen trillar", den rullar nerför backen | `oj-oj` (lågt), **saknas: `rull`** (mjukt rullande, ca 2 s) | som reserv `hjul-gnissel` mycket lågt |
| 13d | "Björnen är ledsen – snyft" | `snyft` | litet och kort |
| 13e | "Vem kan hjälpa?" | ingenting | tystnaden är barnets tur att ropa |
| 13f–14a | Igge rullar ihop sig, bullen stannar | `pop` (Igge blir en boll), `duns` mjukt när bullen stannar | |
| 14b–14c | "Tack, tack, tack!" / en bit var | `pling` per bit som delas ut | |
| 14d | "Mums, mums, mums – hurra!" | `mums`, `jubel` lågt på "hurra" | |
| 15a–15e | danspausen | `boing` (hoppa), `klapp` (klappa) | bara på ord, som 005 |
| 16a | sammanfattningen, en sak per ord | `pop` när saken poppar upp, `klistra` när den flyger upp i raden | som 005:s disco |
| 16c | lastbilen i discot | `brum` | |
| 16d | "Hej då – tut, tut!" | `tuta-tut` | |
| 17 | kritirisen | `glitter` lågt | som 005 och 006 |

## Saknas (två nya effekter)
- **`klick-spruta`**: ett mjukt, lite roligt sprut ur en klämflaska (sås). Kort, 0,5–0,8 s.
- **`rull`**: en mjuk bulle som rullar på gräs, ca 2 s, tonar ut.

Tills de finns används reserven i tabellen. Sanna levererar ljud (CLAUDE.md), så de skapas eller hämtas bara om hon ber om det.

## Fler effekter (Sanna 2026-11-05: "maybe some more sound effects")
Samma regler som ovan: lågt, på slagen, en i taget, helst mellan sjungna ord. Det här läggs till:

| Var | Händelse | Effekt |
|---|---|---|
| alla körbilder | lastbilen skumpar på en gupp | `hjul-gnissel` mycket lågt, högst varannan gupp |
| alla körbilder | kaninen guppar på flaket | `pip` lågt, någon gång ibland, inte varje gupp |
| 02–02c | kritan lyfts och sätts ner | `plupp` mellan dragen |
| 05a/09a | tassavtrycken poppar upp på stampen | `pop` lågt per avtryck |
| 05b/09b | kritsvepet till bullen | `swoosh` |
| 05c/09c | pilarna upp på "upp, upp" | `boing` lågt |
| 05d/09d | väntan på toppen, sedan nerför | `ooh` (lågt) på toppen, `wiii` nerför, `swoosh` för fartstrecken |
| 05e/09e | flaskorna kommer ner | `swoosh` ner, `slurp` när såsen rinner, `mums` på "mums, mums" |
| 05f/09f | stjärnor och hjärtan på "hurra" | `glitter` |
| 05g/09g | ljudringarna på tutknappen | `tuta-tut` en gång, `ding` lågt per ring |
| 06 | granen gungar innan kotten släpper | `fladder` |
| 2:01 (avsnittstid) | Bulle kliver ur lastbilen och går | `boing` lågt när han hoppar ner, `steg` när han går |
| 11–14 | ängen | `fagelkvitter` lågt i bakgrunden hela tiden |
| 14b | bitarna delas ut | `pling` per bit |
| 15a–15e | danspausen | `boing`, `klapp`, `swoosh` på "rulla runt" |
| 16a | klistermärkena | `pop` + `klistra` |
| 17 | kritirisen | `glitter` |
