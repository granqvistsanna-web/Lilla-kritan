# Ljudeffekter

Alla effekter i filmerna ligger här, en mapp per ljud: `<namn>/<namn>-N.m4a`. Samma händelse har alltid samma ljud (se `format/overgangar-och-maner.md`). Varianterna är olika tagningar av samma ljud; `kit.ljud(namn, t)` i scenerna tar dem i tur och ordning så att upprepade tut inte låter likadant.

Lägger du till ett ljud: ny mapp med filerna numrerade från 1, en rad i tabellen här, och antalet i `LJUDFILER` i avsnittets `scener/kit.js`. Ljud som står i kit men saknar mapp blir tysta, inte fel.

## Kritan och ramen

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `skrrrrt-lang` | 4 | 3 s | kritan ritar långa drag (kanten, spiralen), kritsvepet |
| `skrrrrt-kort` | 4 | 1 s | ett kort kritdrag (navet, en prick) |
| `swoosh` | 4 | 2 s | zoom in i teckningen och ut till papperet, något glider in i bild |
| `pling` | 4 | 2 s | något nytt dyker upp, "ta-da", logotypen är klar |
| `pop` | 4 | 0,5 s | saker poppar fram, en bokstav i taget i titeln |
| `plupp` | 5 | 2 s | något ramlar ner (glassen i tassen) |
| `ding` | 4 | 0,4–1 s | en liten klocka, en sak är på plats |
| `glitter` | 4 | 0,7–1 s | glitter och stjärnor |
| `klistra` | 2 | 0,1–0,4 s | kritan klistrar fast en bit |
| `klapp` | 2 | 0,1–0,3 s | en handklapp (dansen i 005) |
| `dunk` | 4 | 0,5–0,8 s | ett stamp (dinon stampar i 005) |
| `boing` | 4 | 2 s | ett hopp |
| `duns` | 4 | 1 s | landningen efter hoppet |

## Fordon

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `brum` | 7 | 5 s | bussens och bilens motor, loopas medan de kör |
| `tuta-tut` | 5 | 3 s | bussen tutar och hälsar |
| `pschhh` | 5 | 3 s | bussdörren öppnas eller stängs |
| `hjul-gnissel` | 4 | 2 s | bussen stannar |
| `tuff-tuff` | 4 | 10 s | traktorn långt bort |
| `propeller` | 4 | 5 s | flygplanet |

## Natur och väder

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `fagelkvitter` | 4 | 25 s | utomhus på dagen, lågt under hela scenen |
| `surr` | 4 | 15 s | humlan |
| `fladder` | 4 | 4 s | Fia flaxar förbi |
| `regn-droppar` | 4 | 4–8 s | regnet börjar, enstaka droppar (*plitt-platt*) |
| `regn` | 4 | 30 s | regn, loopas medan molnet är kvar |

## Vatten

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `plask` | 4 | 0,3–1 s | ett litet plask |
| `plask-stor` | 4 | 2 s | ett stort plask, någon hoppar i sjön |
| `stank` | 4 | 1,5–2,8 s | vatten stänker (kompisarna plaskar på bussen) |
| `simma` | 4 | 3–4 s | simtag |

## Figurernas röster och ljud

Djurrösterna kommer från piloten Lilla Kvack (`produktion/sfx/new/`). Inga ord, bara läten.

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `kvack` | 4 | 0,4 s | ankan säger kvack |
| `kvack-glad` | 4 | 0,6–0,9 s | ankan är glad |
| `kvak` | 4 | 0,4–0,6 s | grodan kväker |
| `ba` | 4 | 3 s | fåret bräker |
| `snark-pip` | 4 | 4 s | någon sover |
| `mums` | 4 | 8 s | någon äter glass |
| `slurp` | 2 | 8 s | någon dricker eller sörplar |
| `fniss` | 3 | 1,1–1,4 s | ett fniss |
| `jippi` | 4 | 1–1,8 s | "jippi!", glädje |
| `jubel` | 4 | 5 s | alla jublar i slutet |
| `oj-oj` | 4 | 0,6–1,3 s | "oj oj", förvåning |
| `ooh` | 2 | 1,4 s | "ooh", något fint syns |
| `wiii` | 2 | 1,6 s | "wiii", det går fort |
| `flamt` | 3 | 0,6–0,9 s | en flämtning |
| `brr` | 4 | 3 s | fryser |
| `huttra` | 2 | 1 s | huttrar, kort |
| `steg` | 4 | 0,5 s | ett fotsteg |

## Kiosken

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `kiosk-pling` | 4 | 3 s | kioskens klocka när någon beställer |

## Saknas

Står i `LJUDFILER` i 005 med antalet 0 och är tysta tills filerna finns:

- `plopp`: flaggan på glassberget (`pop` ligger där så länge)
- `pip`: ett litet pip

## Så låter de i mixen

`render.mjs` lägger effekterna −8 dB under sången (× `vol`), kortar loopar till `langd` med uttoning och lägger en limiter sist. Högst 2–3 effekter samtidigt. De långa ljuden (fågelkvitter, regn, surr, brum, tuff-tuff) är gjorda för att loopas och tonas ut; de korta är enstaka slag.
