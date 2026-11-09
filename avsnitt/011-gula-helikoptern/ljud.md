# Ljudeffekter – avsnitt 011 Gula sången (plan, 2026-11-06)

Effekterna läggs i kodscenerna med `kit.ljud('namn', t, {vol})` och hamnar i `<scen>-effekter.wav`, som `film/satt-ihop.sh` lägger ovanpå sången (som 007 och 013). Alla filer finns i `assets/ljud/effekter/`, utom de som står som **saknas**. Bildnumren är storyboardens (`storyboard.md`).

**Det finns ingen Suno-tagning än.** Tiderna nedan är uppskattade (≈, 96 bpm, takten ca 0,625 s, en takt ca 2,5 s) och avsnittstid = sångtid + 11 s. `rader.txt` görs när Sanna har levererat `sang.m4a` (Whisper + korta klipp och takten ur librosa, som i 013), och först då sätts effekterna på riktiga tider.

## Regler (samma som 005–007 och 013)
- **Sången först.** Effekterna ligger lågt (vol 0,2–0,4) och helst i pauser och mellanspel, inte ovanpå sjungna ord. Ett ljud som sjungs ("flapp", "surr", "plopp", "snyft", "hi-hi") får bara ett svagt eko av effekten, aldrig ett starkare ljud än rösten.
- **Lyssna på tagningen först.** Suno-prompten ber om handklapp på "Gul, gul!", en mjuk visslande shaker på "flapp, flapp", surr på "surr", marimba på "vifta", slide whistle på "upp, upp", klockspelstrill på "kille, kille", fniss på "hi-hi", tre mjuka boing på "hopp, hopp, hopp" och ett rop på "Jippi!". Det som redan finns i tagningen läggs inte till igen.
- **Rotorn är helikopterns motor.** Den låter lågt och jämnt hela tiden helikoptern flyger, som `brum` för lastbilen i 007. Den är den enda saken som låter i bakgrunden; Pella långt bort och Fia får inget eget ljud medan rotorn går.
- **En sak i taget**, som bilden: högst en effekt åt gången (rotorn räknas som bakgrund).
- **Inga skrämmande ljud.** Inga smällar, tjut eller vinande storm. Vinden på "Det blåser!" är ett mjukt sus, "Oj, oj" och snyftet hålls små och mjuka. Solen skrattar, men inget skrattar högt eller plötsligt.
- **Riktiga djurläten:** Kajsa säger `mu`, Gurra kväker (`kvak`), Pip piper (`pip`).
- **Upprepning hjälper.** Samma ljud för samma sak varje gång (rotorn låter alltid lika, Humle surrar alltid likadant).
- **Klipp aldrig sången.** Effekterna läggs där sången har plats; finns ingen paus blir effekten tyst eller hoppas över.

## Var

| Bild | Sångtid ≈ | Händelse | Effekt | Kommentar |
|---|---|---|---|---|
| 01 | – | introt | (jingeln finns redan) | ingenting nytt |
| 02 | 0:00–0:06 | kritan ritar bubblan och svansen | `skrrrrt-lang` (bubblan), `skrrrrt-kort` (svansen), `plupp` mellan dragen | som 007 och 013, ett drag per streck |
| 02b | 0:06–0:11 | pausen: medarna, sist rotorn | `skrrrrt-kort` per med och rotorblad | inget annat i pausen |
| 02c | 0:11–0:16 | "En helikopter!": rotorn börjar snurra, helikoptern lyfter, Lage dyker upp, zoom in | **saknas: `rotor`** tonar in (reserv `propeller` mycket lågt), `pling` när Lage dyker upp, `swoosh` på zoomen | "Flapp-flapp" sjungs: rotorn bara lågt under |
| 03–06d | 0:16–1:33 | himlen (vers 1, refräng 1, solen, humlan, frågan, refräng 2) | `rotor` mycket lågt hela tiden helikoptern syns | inget fågelkvitter uppe i himlen; rotorn tonas ner i närbilderna |
| 03 | 0:16–0:21 | "Lejonet flyger … (flapp, flapp!)" | ingenting utöver rotorn | |
| 03a | 0:21–0:24 | "Lejonet tycker gult är glatt! (Ha-ha!)" | ingenting | skrattet sjungs |
| 03b | 0:24–0:29 | bananen och Pip poppar upp som klistermärken | `pop` lågt per klistermärke, `pip` lågt när Pip poppar upp | "hi-hi" sjungs: inget `fniss` |
| 03c | 0:29–0:34 | Lage spanar, blinkar på "jag och du" | `pling` lågt på blinkningen | |
| 04 / 07 | 0:34–0:39 | "Gul, gul!": fyra små solar poppar upp i en båge | `pop` lågt per sol, `klapp` bara som svagt eko | låten har handklapp |
| 04a / 07a | 0:39–0:41 | "Helikopter – (flapp, flapp!)": en vit vindring per flapp, himlen glöder | `glimt` lågt när himlen börjar glöda | flappet sjungs; vindringarna får inget eget ljud |
| 04b / 07b | 0:41–0:44 | "Upp till solen – (upp, upp!)": två lyft, solen glider in | `ooh` lågt när solen syns | låten har slide whistle på "upp, upp" |
| 04c / 07c | 0:44–0:46 | "Solen kittlar – (kille, kille!)" | `fniss` lågt efter andra "kille" | låten har klockspelstrillen |
| 04d / 07d | 0:46–0:49 | "Skaka, skaka – (hi-hi!)": två små skutt | `boing` mycket lågt per skutt, bara om det finns plats mellan orden | "hi-hi" sjungs |
| 04e / 07e | 0:49–0:51 | "Solen blinkar – (blink, blink!)" | `glimt` lågt per blink | |
| 04f / 07f | 0:51–0:54 | "Gul är den gladaste färgen! (Ha-ha!)": bananen, Humle och Pip dyker upp, hjärtan stiger | `pop` lågt per sak (Humle med ett kort `surr`), `glitter` lågt när hjärtana stiger | skrattet sjungs |
| 04g / 07g | 0:54–0:56 | "Vinka, vinka! (Hej, hej!)" | ingenting | |
| 04h / 07h | 0:56–0:59 | "Vad är gult? Titta ut!": kritsvep hem till himlen (efter 07 till dammen) | `swoosh` på kritsvepet | |
| 05 | 0:59–1:04 | solen glider fram bakom molnet | `glimt` lågt | |
| 05b | 1:04–1:08 | "varm, varm, varm": Lage fläktar sig | `mmm` lågt efter sista "varm" | |
| 05c | 1:08–1:12 | Humle tittar fram bakom ett moln | `surr` kort och lågt | |
| 05d | 1:12–1:17 | "Humlan är gul – surr, surr, surr!": Humle surrar förbi | `surr` lågt under bågen | surr sjungs, effekten bara som eko |
| 06 | 1:17–1:21 | "Vad mer är gult? Kan du se?" | ingenting | |
| 06b | 1:21–1:26 | pausen 4–5 s: svansen guppar upp bakom sitsen | ingenting, rotorn tonas ner | barnet ska svara i tystnad |
| 06c | 1:26–1:29 | "Lejonet är gult – och svansen med!" | `oj-oj` mycket lågt när Lage ser svansen, bara om det finns plats före raden | |
| 06d | 1:29–1:33 | "Vifta, vifta, vifta!" | ingenting | låten har marimban |
| 07–07h | 1:33–1:54 | refräng 2 | samma som 04–04h | kritsvepet går till dammen |
| 08 | 1:54–1:59 | kritsvep till dammen, Fia fladdrar förbi, helikoptern sänker sig | `swoosh`, `fagelkvitter` lågt i bakgrunden hela scenen, `fladder` när Fia passerar (innan rotorn hörs) | Fia först, sedan rotorn: en sak i taget |
| 08b | 1:59–2:01 | "Hatten är gul – vinka, vinka!" | `rotor` lågt | |
| 08c | 2:01–2:06 | "hej, kon! (Muu!) Vill du ha en banan? (Ja, tack!)" sjungs, inga repliker (färgsång v2) | `mu` lågt under kören på "Muu!", `pling` när kon håller fram korgen | |
| 09 | 2:06–2:09 | "Oj, oj! Det blåser!": vindvirvlar under rotorn, hatten lyfter | **saknas: `vind`** (ett mjukt sus, 1–2 s), reserv `swoosh` lågt | |
| 09b | 2:09–2:12 | "Hatten flyger – vind, vind, vind": hatten seglar ut | `swoosh` mycket lågt under bågen | "vind" sjungs |
| 09c | 2:12–2:14 | "ut i dammen – plopp!": hatten landar på näckrosbladet | `plask` lågt och litet efter "plopp" | ploppet sjungs |
| 09d | 2:14–2:17 | "Kossan är ledsen – snyft, snyft." | ingenting | snyftet sjungs; inget `snyft` ovanpå |
| 09e | 2:17–2:19 | "Lejonet stänger av – stopp!": knappen, rotorn stannar | `klistra` lågt som knapptryck, **saknas: `rotor-stopp`** (rotorn varvar ner, ca 2 s), reserv `rotor` (eller `propeller`) som tonas ut på 1,5 s | efter det är rotorn tyst resten av dammen |
| 09f | 2:19–2:24 | "Vem kan hjälpa?" och den tysta takten: Gurras ögon tittar upp ur vattnet | `plask` mycket lågt när ögonen kommer upp, sedan **tyst** | tystnaden är barnets tur att ropa |
| 10 | 2:24–2:26 | "Grodan!": Gurra hoppar upp på första bladet | `kvak` lågt efter ekot | |
| 10b | 2:26–2:29 | "Hoppa, hoppa – blad till blad" | `plask` lågt per landning | |
| 10c | 2:29–2:32 | Gurra knuffar bladet till kanten, Kajsa sätter på sig hatten | `vagor` mycket lågt under knuffen, `pling` när hatten sitter på | "tack, tack, tack" sjungs |
| 10d | 2:32–2:35 | Kajsa skalar bananen och delar, Lage slickar sig om munnen | `klistra` per bit som delas ut, `slurp` kort (langd 0,8) på slicket, `nom` lågt | |
| 10e | 2:35–2:39 | "Hopp, hopp, hopp i solen – jippi!" | `duns` lågt per landning, `jubel` lågt efter "jippi" | låten har tre boing och ropet |
| 11 | 2:39–2:41 | kritsvep till discot, "Danspaus!" | `swoosh` | |
| 11b | 2:41–2:43 | "Surra runt!": Humle | `surr` kort och lågt | |
| 11c | 2:43–2:45 | "Hoppa, hoppa!": Gurra | `boing` per hopp, `kvak` en gång efter | |
| 11d | 2:45–2:47 | "Picka, picka!": Pip | `pick` kort (langd 0,6) per pick, `pip` en gång efter | |
| 12 | 2:47–2:50 | sammanfattningen: solen, humlan, hatten på var sin kritskiva | `pop` när saken poppar upp, `klistra` när den sätter sig i raden | som 005:s disco |
| 12b | 2:50–2:53 | "Gul är den gladaste färgen! (Ha-ha!)" | `glitter` lågt | |
| 12c | 2:53–2:58 | "Helikopter – (flapp, flapp!)" två gånger, helikoptern poppar upp som fjärde småbild | `pop` lågt, `rotor` mycket lågt och kort | |
| 12d | 2:58–3:00 | "Hej då, hej då – flapp, flapp!" | ingenting | |
| 13 | 3:00– | kritirisen | `glitter` lågt | som 005–007 och 013 |

## Återanvänds och nytt

**Finns redan och används som förut:** `skrrrrt-lang`, `skrrrrt-kort`, `plupp`, `pling`, `swoosh`, `pop`, `klapp`, `glimt`, `ooh`, `fniss`, `boing`, `glitter`, `mmm`, `surr`, `oj-oj`, `fagelkvitter`, `fladder`, `plask`, `vagor`, `klistra`, `slurp`, `nom`, `duns`, `jubel`, `kvak`, `propeller` (reserv) (005–007, 013).

**Finns i biblioteket men är nya i ett avsnitt** (läggs till i `LJUDFILER` i 011:s `kit.js`): `mu` (Gissa teckningen: kon, 4 tagningar), `pick` (Gissa teckningen: hönan, 1 tagning, kortas med `langd`), `pip` (014, 1 tagning; 014:s kit har den redan).

**Används inte:** `brum` (helikoptern har rotorn), `tuta-tut` (helikoptern tutar inte), `snyft` (snyftet sjungs).

## Saknas (tysta tills de finns)
- **`rotor`**: helikopterns rotor, ett mjukt, runt *flapp-flapp* som går att loopa, 4–6 s. Varken hackigt eller högt som en riktig helikopter; mer som en leksak. Reserv: `propeller` mycket lågt.
- **`rotor-stopp`**: rotorn varvar ner till stopp, ca 2 s, mjukt. Reserv: `rotor` (eller `propeller`) som tonas ut.
- **`vind`**: ett mjukt vindsus när rotorn blåser hatten av, 1–2 s, inte stormigt. Reserv: `swoosh` lågt.

Tills de finns används reserven i tabellen. Sanna levererar ljud (CLAUDE.md), så de skapas eller hämtas bara om hon ber om det.
