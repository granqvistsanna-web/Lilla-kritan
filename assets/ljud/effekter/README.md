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
| `glimt` | 2 | 2,2 s | ett mjukt klockspel, något blänker (stjärnor på regnbågen, västen och flaggan i 006), ur `chime-2` och `chime-4` i `produktion/sfx/new/` |
| `studs` | 4 | 0,45 s | en liten mjuk studs (apelsinen skuttar i korgen i 006), ur `ball-soft-3` |
| `klistra` | 2 | 0,1–0,4 s | kritan klistrar fast en bit |
| `klapp` | 2 | 0,1–0,3 s | en handklapp (dansen i 005) |
| `dunk` | 4 | 0,5–0,8 s | ett stamp (dinon stampar i 005) |
| `boing` | 4 | 2 s | ett hopp |
| `duns` | 4 | 1 s | landningen efter hoppet |
| `plopp` | 1 | 0,5 s | en mjuk tecknad plopp, något sticker upp (groddarna i 014:s refräng) (ElevenLabs 2026-11-06) |
| `puff` | 3 | 0,3–0,4 s | en mjuk, luddig puff, mjukare än `pop` och `plopp`: en ulltuss landar i säcken och ullen växer ut igen (015). Ur [Cotton Thud 6](https://freesound.org/people/rainial.co/sounds/571697), [5](https://freesound.org/people/rainial.co/sounds/571721) och [4](https://freesound.org/people/rainial.co/sounds/571722), rainial.co, dämpade i diskanten, **CC BY 4.0: skriv "Cotton Thud by rainial.co (freesound.org), CC BY 4.0" i YouTube-texten** (Openverse 2026-11-07) |
| `strumpa` | 4 | 0,6 s | en strumpa dras på: ett kort tygdrag och ett litet mjukt knäpp (015, räknas ett, två, tre, fyra). Tygdragen ur [Jacket/Cloth Rustle 2, 10, 4 och 1](https://freesound.org/people/brandondelehoy/sounds/494790), brandondelehoy, CC0; knäppet ur [Dull snap - rubber glove in palm of hand](https://freesound.org/people/Duisterwho/sounds/645240), Duisterwho, CC0 (Openverse 2026-11-07) |
| `rull` | 1 | 2 s | en liten ärta rullar över trägolv, loopas (014) (ElevenLabs 2026-11-06) |
| `zipp` | 1 | 0,8 s | ett kort dragkedjedrag (Lova drar upp jackan i 014) (ElevenLabs 2026-11-06) |
| `pip` | 1 | 0,5 s | ett mjukt kycklingpip (Pip i 014) (ElevenLabs 2026-11-06) |
| `prassel-ho` | 1 | 1,3 s | höstacken skakar, några strån faller (Tittut, bondgården) (ElevenLabs 2026-11-06) |
| `prassel-buske` | 1 | 1,1 s | busken skakar (Tittut, skogen och lekplatsen). [The Rustle of a Bush](https://freesound.org/people/Montacue/sounds/178615), Montacue, CC0 (Openverse 2026-11-06) |
| `prassel-gras` | 2 | 1,2–2 s | någon liten dyker in i gräset på kullen (Lova i Tittut på lekplatsen, `PRASSEL.kulle`). ElevenLabs SFX 2026-11-08, prompten i `produktion/youtube/tittut/lekplatsen/leoparden-lova/plan.md`; tystnaden bortklippt, toppen på −14 dBFS (lite mjukare än `prassel-buske`), originalen i `produktion/ljud-original/effekter/prassel-gras/` |
| `prassel-lov` | 1 | 1,3 s | lövhögen prasslar när figuren kommer upp (Tittut, skogen 2). [leafrustle.wav](https://freesound.org/people/j1987/sounds/106131), j1987, CC0 (Openverse 2026-11-06) |
| `prassel-tyg` | 1 | 1,6 s | gardinen och täcket skakar (Tittut, hemma). Första svepet ur [Curtains Textile Texture](https://freesound.org/people/RutgerMuller/sounds/51140), RutgerMuller, CC0 (Openverse 2026-11-06) |

## Fordon

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `brum` | 7 | 5 s | bussens och bilens motor, loopas medan de kör |
| `tuta-tut` | 5 | 3 s | bussen tutar och hälsar |
| `pschhh` | 5 | 3 s | bussdörren öppnas eller stängs |
| `hjul-gnissel` | 4 | 2 s | bussen stannar |
| `tuff-tuff` | 4 | 10 s | traktorn långt bort |
| `propeller` | 4 | 5 s | flygplanet |
| `mistlur` | 5 | 1–3 s (filen 4 s) | båtens tut i 006: `tuta-tut` en kvart lägre och mjukare (lowpass 3 kHz) |

## Natur och väder

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `fagelkvitter` | 4 | 25 s | utomhus på dagen, lågt under hela scenen |
| `skogsljud` | 1 | 60 s | skogen: mjuk vind, fågelkvitter och ett lövprassel, går runt utan skarv (Tittut i skogen). Mixad 2026-11-06 av `fagelkvitter` 1, 3, 4, `leaves-3` och filtrerat brunt brus |
| `gardsljud` | 1 | 60 s | bondgården (Tittut), går runt utan skarv. 60 s från 2:36 i [Farmland April NL SHORT 01](https://freesound.org/people/klankbeeld/sounds/185525), klankbeeld, **CC BY 4.0: skriv "Farmland April NL by klankbeeld (freesound.org), CC BY 4.0" i YouTube-texten** (Openverse 2026-11-06) |
| `lekplatsljud` | 1 | 60 s | lekplatsen (Tittut), går runt utan skarv. 60 s från 0:59 i [Quiet Park.wav](https://freesound.org/people/chimerical/sounds/103684), chimerical, CC0 (Openverse 2026-11-06) |
| `hemmaljud` | 1 | 58 s | hemma (Tittut): en klocka tickar i ett tyst rum, går runt utan skarv. [small clock in room](https://freesound.org/people/Yuval/sounds/211192), Yuval, CC0 (Openverse 2026-11-06) |
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
| `vagor` | 4 | 4–6 s | vattenskvalp under sjöscenerna i 006, loopas lågt: `simma` saktat till 0,8 och mjukare (lowpass 2,2 kHz) |

## Figurernas röster och ljud

Djurrösterna kommer från piloten Lilla Kvack (`produktion/sfx/new/`). Inga ord, bara läten.

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `kvack` | 4 | 0,4 s | ankan säger kvack |
| `mu` | 4 | 2 s | en riktig ko råmar en gång (Gissa teckningen: kon), ElevenLabs SFX |
| `siren` | 1 | 2,0 s | en svensk brandbil tjuter, tvåtonig och vänlig (brandbilen), Gissa teckningen, ElevenLabs SFX |
| `cykelklocka` | 1 | 2,0 s | en cykelklocka ringer två gånger (cykeln), Gissa teckningen, ElevenLabs SFX |
| `buss-dorr` | 2 | 2,0 s | bussdörren öppnas och stängs med ett pys (bussen), Gissa teckningen, ElevenLabs SFX |
| `pick` | 1 | 1,7 s | en höna pickar i marken (hönan), Gissa teckningen, ElevenLabs SFX |
| `trav` | 1 | 1,8 s | en häst travar några steg (hästen), Gissa teckningen, ElevenLabs SFX |
| `gung-knarr` | 1 | 1,4 s | gungans kedjor knarrar (gungan), Gissa teckningen, ElevenLabs SFX |
| `kluck` | 1 | 1,9 s | en riktig höna kacklar (hönan), Gissa teckningen, ElevenLabs SFX |
| `gnagg` | 1 | 1,8 s | en riktig häst gnäggar (hästen), Gissa teckningen, ElevenLabs SFX |
| `mjau` | 1 | 1,4 s | en kattunge säger mjau (katten), Gissa teckningen, ElevenLabs SFX |
| `noff` | 1 | 1,8 s | en riktig gris grymtar (grisen), Gissa teckningen, ElevenLabs SFX |
| `vov` | 1 | 2,0 s | en liten glad hund skäller två gånger (hunden), Gissa teckningen, ElevenLabs SFX |
| `bat-tut` | 1 | 1,5 s | en liten båt tutar (båten), Gissa teckningen, ElevenLabs SFX |
| `hink-dunk` | 1 | 1,9 s | en plasthink sätts ner i sanden (hinken), Gissa teckningen, ElevenLabs SFX |
| `flygplan` | 1 | 2,0 s | ett litet propellerplan lyfter och flyger iväg (flygplanet), Gissa teckningen, ElevenLabs SFX |
| `tag-tjoff` | 1 | 1,8 s | ett litet ångtåg tuffar och visslar (tåget), Gissa teckningen, ElevenLabs SFX |
| `grav` | 1 | 1,7 s | en leksaksspade gräver i sand (spaden), Gissa teckningen, ElevenLabs SFX |
| `vick` | 1 | 1,6 s | en gungbräda knarrar upp och ner (gungbrädan), Gissa teckningen, ElevenLabs SFX |
| `sand` | 4 | 1,5–2 s | torr sand rinner (hinken, sandlådan, spaden), Gissa teckningen, ElevenLabs SFX. 2–4: små tassar gräver i sandlådan (Lova i Tittut på lekplatsen, 2026-11-08), toppen på −25 dBFS som 1, originalen i `produktion/ljud-original/effekter/sand/` |
| `glid` | 1 | 1,5 s | någon åker ner för en rutschkana (rutschkanan), Gissa teckningen, ElevenLabs SFX |
| `kvack-glad` | 4 | 0,6–0,9 s | ankan är glad |
| `kvak` | 4 | 0,4–0,6 s | grodan kväker |
| `ba` | 4 | 3 s | fåret bräker |
| `snark-pip` | 4 | 4 s | någon sover |
| `bobo` | 5 | 0,6–0,8 s | ett lågt, vänligt "bo bo!" med Nalles nallebjörnsröst, som ett hej då (lejonet säger godnatt i Godnattsagan), ur `teddy-byebye-2` i `produktion/sfx/new/` (Lilla Kvack) |
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
| `ledsen` | 3 | 1,8–2 s | ett ledset "åhh" (Disa när apelsinen flyter bort i 006), ur `sad-2` och `sad-3` (`sad-1` är redan `snyft`) |
| `kvack-ledsen` | 3 | 1,7–2 s | ankan gnyr ledset, ur `duck-whimper-1` |
| `fniss-anka` | 3 | 0,9–1,6 s | ankan fnissar, ur `giggle-duck-2` |
| `mmm` | 3 | 0,3–0,6 s | "mmm", något smakar gott, ur `mmm-duck-3` |
| `hupp` | 4 | 0,3 s | ett litet "hupp" när någon tar sats och hoppar, ur `hup-2` |
| `tass` | 6 | 0,18 s | små mjuka tassteg i gräs och mossa (v2-Kanel skuttar, Tittut), vol ca 0,2. Ur [6 footsteps grass](https://freesound.org/people/whothefuckisjojo/sounds/673305), whothefuckisjojo, CC0, en aning ljusare och mjukare i diskanten (Openverse 2026-11-07) |
| `hopp-mjuk` | 6 | 0,08–0,1 s | ett kort, mjukt "fwupp" när någon liten tar sats (v2-Kanel, Tittut), vol ca 0,25; inte en röst som `hupp`. Kuddslag ur [Cushion Impacts](https://freesound.org/people/mincedbeats/sounds/593948), mincedbeats, CC0, baklänges och högre (Openverse 2026-11-07) |
| `landa-mjuk` | 8 | 0,26 s | en liten mjuk duns när någon liten landar i gräset (v2-Kanel, Tittut), vol ca 0,35; kortare och mjukare än `duns`. 1–7 ur [Cushion Impacts](https://freesound.org/people/mincedbeats/sounds/593948), mincedbeats, CC0, 8 ur [Medium Pillow Hit](https://freesound.org/people/saturdaysoundguy/sounds/388031), saturdaysoundguy, CC0 (Openverse 2026-11-07) |
| `nom` | 2 | 1 s | tuggande, någon äter (Bulle tuggar chokladen och karamellen i 007), ur `nom-2` och `nom-3` (första sekunden) |
| `snyft` | 3 | 0,8–1,1 s | en snyftning (Disa i 006), de tre första snyftningarna ur pilotens `sad-1.mp3` (`produktion/sfx/new/`) |

## Kiosken

| Ljud | Tagningar | Längd | Används när |
|---|---|---|---|
| `kiosk-pling` | 4 | 3 s | kioskens klocka när någon beställer |

## Saknas

Står i `LJUDFILER` i 005 med antalet 0 och är tysta tills filerna finns:

- `plopp`: flaggan på glassberget (`pop` ligger där så länge)
- `pip`: ett litet pip

Väntar på ElevenLabs (prompterna i `produktion/youtube/tittut/ljud-v2-kanel.md`):

- `hej-babbel` 1–8: kaninens glada babbel utan ord ("he-he, ba-ba") när den hälsar tillbaka, varannan tittut och vid hej då (v2-Kanel i Tittut). ElevenLabs Sound Effects 2026-11-07, prompterna i `produktion/youtube/tittut/ljud-v2-kanel.md`; tystnaden bortklippt, toppen på −9 dBFS. Originalen i `produktion/ljud-original/effekter/hej-babbel/`.
- `ja-babbel` 1–9: kaninens korta glada "ja!" utan ord ("mm-hm!", "ja-ja!") när den nickar på berättarens frågor (v2-Kanel i Tittut, `ja: 'ja-babbel'`). ElevenLabs Sound Effects 2026-11-07, prompterna i `produktion/youtube/tittut/ljud-v2-kanel.md`; de 9 kortaste av 11 tagningar, tystnaden bortklippt, toppen på −9 dBFS. Originalen i `produktion/ljud-original/effekter/ja-babbel/`.
- `spinn-fniss` 1–6: leopardens busiga "hee-hee" som rullar över i ett litet spinn (v2-Lova i Tittut, `fniss: 'spinn-fniss'`). ElevenLabs Sound Effects 2026-11-08, prompten i `produktion/youtube/tittut/lekplatsen/leoparden-lova/plan.md`; tystnaden bortklippt, toppen på −9 dBFS. Originalen i `produktion/ljud-original/effekter/spinn-fniss/`.

## Så låter de i mixen

`render.mjs` lägger effekterna −8 dB under sången (× `vol`), kortar loopar till `langd` med uttoning och lägger en limiter sist. Högst 2–3 effekter samtidigt. De långa ljuden (fågelkvitter, regn, surr, brum, tuff-tuff) är gjorda för att loopas och tonas ut; de korta är enstaka slag.
