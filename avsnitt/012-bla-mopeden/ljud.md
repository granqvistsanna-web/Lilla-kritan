# Ljudeffekter – avsnitt 012 Blå sången (plan, 2026-11-06)

Effekterna läggs i kodscenerna med `kit.ljud('namn', t, {vol})` och hamnar i `<scen>-effekter.wav`, som `film/satt-ihop.sh` lägger ovanpå sången (som 007 och 013). Alla filer finns i `assets/ljud/effekter/`, utom de som står som **saknas**. Bildnumren är storyboardens (`storyboard.md`).

**Det finns ingen Suno-tagning än.** Tiderna nedan är storyboardens uppskattade avsnittstider (≈, avsnittstid = sångtid + 11 s, 96 bpm, takten ca 0,625 s). `rader.txt` görs när Sanna har levererat `sang.m4a` (Whisper + korta klipp och takten ur librosa, som i 013), och först då sätts effekterna på riktiga tider.

## Regler (samma som 005–007 och 013)
- **Sången först.** Effekterna ligger lågt (vol 0,2–0,4) och helst i pauser och mellanspel, inte ovanpå sjungna ord. Ett ljud som sjungs ("putt", "plopp", "ding", "studs", "pick", "mums") får bara ett svagt eko av effekten, aldrig ett starkare ljud än rösten.
- **Lyssna på tagningen först.** Suno-prompten ber om ett dämpat *putt putt* i bas och trumma på varje "putt", en liten leksakstuta efter "Putt-putt, nu kör vi!", klockor på "ding, ding, ding", mjuka bubbelplopp på varje "plopp" och "Plopp!", handklapp på "Blå, blå!" och träkloss på "studs". Det som redan finns i tagningen läggs inte till igen.
- **Bubblorna är avsnittets löpande ljud.** En bubbla som puffar ut låter alltid likadant, och en som spricker låter alltid likadant. Spricker den på ett sjunget "plopp" är det Sunos plopp som hörs; effekten används bara för bubblor som spricker utan ord.
- **En sak i taget**, som bilden: högst en effekt åt gången (mopedens puttrande räknas som bakgrund).
- **Inga skrämmande ljud.** Inga smällar. Jättebubblan spricker med ett mjukt plopp, inget `pop` som en ballong. Hinken som välter är ett litet klonk, inte en krasch.
- **Riktiga djurläten:** Kaj säger `mjau`, Pip piper (`pip`) och pickar (`pick`), Gurra kväker (`kvak`).
- **Upprepning hjälper.** Samma ljud för samma sak varje gång (mopeden låter alltid lika).
- **Klipp aldrig sången.** Effekterna läggs där sången har plats; finns ingen paus blir effekten tyst eller hoppas över.

## Var

| Bild | Avsnittstid ≈ | Händelse | Effekt | Kommentar |
|---|---|---|---|---|
| 01 | 0:00–0:11 | introt | (jingeln finns redan) | ingenting nytt |
| 02–02a | 0:11–0:19 | kritan ritar hjulen och kåpan | `skrrrrt-kort` per hjul, `skrrrrt-lang` på kåpan, `plupp` mellan dragen | som 007 och 013, ett drag per streck |
| 02b | 0:19–0:24 | pausen: sadeln, styret och lampan | `skrrrrt-kort` per del, `glimt` lågt när lampan blir gul | inget annat i pausen |
| 02c | 0:24–0:29 | "En moped!": två bubblor ur avgasröret, zoom in | **saknas: `bubbla`** per bubbla (reserv `plupp` mycket lågt), `swoosh` på zoomen | putt-putt och tutan sjungs |
| 03 | 0:29–0:31 | teckningen blir Kanels moped | `pling` lågt | |
| 03a | 0:31–0:34 | "Hej hej!" | ingenting | |
| 03b | 0:34–0:38 | mellanspelet: vägen glider, Pella flyger förbi högt uppe | **saknas: `moped`** (mjukt puttrande, loop) mycket lågt, reserv `tuff-tuff` mycket lågt; `propeller` lågt medan Pella syns, `bubbla` per putt | mopeden låter lågt i alla körscener |
| 04 | 0:38–0:46 | vers 1: bubblor per "putt", en spricker på nosen, två stiger och spricker, kritan sveper blått | `bubbla` lågt per avgasbubbla i mellanrummen, `fniss` lågt efter bubblan på nosen, `skrrrrt-lang` mycket lågt under svepet | ploppen sjungs; `fagelkvitter` mycket lågt på vägen |
| 05a / 09a | 0:46–0:49 | "Blå, blå!": två skutt, en bubbla per "blå" | `bubbla` lågt per bubbla, `klapp` bara som svagt eko | låten har handklapp |
| 05b / 09b | 0:49–0:51 | "Moped, moped – (putt, putt!)": bubbelmolnet driver in | `ooh` lågt när molnet syns | puttet sjungs |
| 05c / 09c | 0:51–0:54 | "In i bubblorna – (plopp, plopp!)": bubbelhavet, kritan sveper blått | `skrrrrt-lang` mycket lågt under svepet | ploppen sjungs |
| 05d / 09d | 0:54–0:56 | "Peta, peta – (plopp, plopp!)" | ingenting | ploppen sjungs |
| 05e / 09e | 0:56–0:59 | "Upp i en bubbla – (upp, upp!)": jättebubblan sluter sig och lyfter, kritsvep i himmelsblått | `glimt` när bubblan sluter sig, `swoosh` på kritsvepet | |
| 05f / 09f | 0:59–1:01 | "Förbi flygplanet – (hej, hej!)": Pella flyger förbi | `propeller` lågt, tonar in och ut | `moped` är tyst i bubblan |
| 05g / 09g | 1:01–1:04 | kroken: sakbubblorna flyter upp, en per ord; jättebubblan spricker på "Plopp!" | `pop` mycket lågt per sakbubbla, `glitter` lågt på "färgen" | "Plopp!" sjungs: ingen effekt på jättebubblan |
| 05g forts. / 09g | ≈1:03–1:04 | "Mjukt, mjukt – (putt, putt!)": mopeden landar på bubbelkudden | `studs` mycket lågt per gungning | |
| 05h / 09h | 1:04–1:06 | "Vad är blått? Titta ut!": kritsvep hem till vägen | `swoosh` | |
| 06 | 1:06–1:12 | blåklockorna glider in | `moped` lågt | |
| 06a | 1:12–1:16 | "ding, ding, ding": öronen svänger, klockorna nickar | `ding` bara som svagt eko, efter sista ding | låten har klockorna |
| 07 | 1:16–1:21 | bollen studsar ut, Kanel stannar | `hjul-gnissel` mycket lågt när mopeden stannar, sedan tyst motor | verklighetsnära: man stannar för bollen |
| 07a | 1:21–1:25 | bollen studsar tre gånger och iväg, Kanel kör vidare | `studs` lågt per studs (bara om tagningen saknar träklossen), `moped` tonar in igen | stryks bollen, stryks raden |
| 08 | 1:25–1:28 | "Vad mer är blått? Kan du se?" | ingenting, mopeden står still | |
| 08a | 1:28–1:33 | pausen | ingenting | barnet ska svara i tystnad |
| 08b | 1:33–1:38 | "Mopeden är blå – och flaggan med! Vift, vift, vift!" | `fladder` mycket lågt medan flaggan fladdrar | |
| 09a–09h | 1:38–1:58 | refräng 2 | samma som 05a–05h | |
| 10 | 1:58–2:00 | kritsvep till äppelträdet | `swoosh`, `fagelkvitter` lågt i bakgrunden hela scenen | |
| 10a | 2:00–2:05 | Pella flyger förbi, sedan puttrar mopeden in och stannar | `propeller` lågt (först), sedan `moped` lågt och `hjul-gnissel` mycket lågt | en sak i taget |
| 11 | 2:05–2:09 | "Blåbären är blå – små, små, små" | ingenting | |
| 11a | 2:09–2:17 | luckan: "Hej, Kaj!" "Mjau! …" "Varsågod!" "Tack!", hinken i korgen | `mjau` efter Kajs "Mjau!" (eller i stället för det om repliken inte spelas in), `hink-dunk` mycket lågt när hinken ställs i korgen | om tagningen saknar luckan: som 013, bara `mjau` och hinken, inga repliker |
| 12 | 2:17–2:22 | "Oj, oj! Hinken välter!" | `moped` kort, **saknas: `klonk`** (en liten plasthink som tippar), reserv `hink-dunk` lågt | |
| 12a | 2:22–2:28 | "Rull, rull, rull … bort, bort, bort": bären rullar åt alla håll | `rull` lågt, tonas ut med bären | `rull` finns sedan 014 |
| 12b | 2:28–2:31 | "snyft, snyft" | ingenting | snyftet sjungs |
| 12c | 2:31–2:35 | "Vem kan hjälpa?" och det tysta slaget: Pips tofs tittar fram | **tyst** | barnets tur att ropa |
| 13 | 2:35–2:39 | "Kycklingen!": Pip springer in | `pip` lågt efter ekot, `steg` mycket lågt | |
| 13a | 2:39–2:43 | "Pick, pick, pick" | `pick` kort (langd 0,5) bara som svagt eko, `plupp` mycket lågt per bär i hinken | pick sjungs |
| 13b | 2:43–2:47 | "Alla plockar – ett, två, tre!" | `plupp` mycket lågt per bär | |
| 13c | 2:47–2:51 | "En näve var – mums, mums, mums!" | `nom` lågt | mums sjungs; inget `mums` ovanpå |
| 13d | 2:51–2:55 | "Räck ut tungan – blå, blå, blå! (Hi-hi!)" | `fniss` lågt efter "hi-hi" | |
| 13e | 2:55–2:59 | "Tack!" till Pip, alla tittar upp, kritan sveper blått, Pella flyger in | `skrrrrt-lang` mycket lågt under svepet, `propeller` lågt | |
| 14a | 2:59–3:02 | kritsvep till discot, "Danspaus!" | `swoosh` | |
| 14b | 3:02–3:04 | "Hoppa, hoppa!": Gurra | `boing` per hopp, `kvak` en gång efter | |
| 14c | 3:04–3:06 | "Stampa, stampa!": Disa | `dunk` lågt per stamp | |
| 14d | 3:06–3:08 | "Tuta, tuta!": Tuff | `tuta-tut` bara som svagt eko, en gång | tutarna sjungs |
| 14e | 3:08–3:11 | "Alla dansar – blå dans!" | `jubel` lågt | |
| 15a | 3:11–3:20 | sammanfattningen: sakerna på kritskivor upp i raden; på kroken får de bubblor som spricker på "Plopp!" | `pop` när saken poppar upp, `klistra` när den sätter sig, `glimt` när bubblorna sluter sig | "Plopp!" sjungs: ingen effekt |
| 15b | 3:20–3:24 | "Hej då, hej då – putt, putt!": äppelträdet, alla vinkar till Pella | `propeller` lågt medan Pella flyger iväg, `bubbla` per putt | |
| 16 | 3:24–3:28 | kritirisen | `glitter` lågt | som 005–007 och 013 |

## Återanvänds och nytt

**Finns redan och används som förut:** `skrrrrt-lang`, `skrrrrt-kort`, `plupp`, `glimt`, `swoosh`, `pling`, `propeller`, `fagelkvitter`, `fniss`, `klapp`, `ooh`, `pop`, `glitter`, `studs`, `ding`, `hjul-gnissel`, `fladder`, `nom`, `steg`, `boing`, `kvak`, `dunk`, `tuta-tut`, `jubel`, `klistra`, `tuff-tuff` (reserv) (005–007, 013).

**Finns i biblioteket men är nya i ett avsnitt** (läggs till i `LJUDFILER` i 012:s `kit.js`): `mjau` (Gissa teckningen: katten, 1 tagning), `pick` (Gissa teckningen: hönan, 1 tagning, kortas med `langd`), `hink-dunk` (Gissa teckningen: hinken, 1 tagning), `rull` och `pip` (014, 1 tagning var; `pip` och `plopp` står redan i 014:s kit).

**Används inte:** `brum` (mopeden puttrar, den brummar inte som bussen), `snyft` och `mums` (sjungs), `plopp` som effekt (alla sjungna plopp är Sunos; finns ingen i tagningen kan `plopp` ta deras plats).

## Saknas (tysta tills de finns)
- **`bubbla`**: en liten såpbubbla som puffar ut ur avgasröret, ett mjukt *blupp*, 0,2–0,4 s. Två–tre tagningar, eftersom den hörs många gånger. Reserv: `plupp` mycket lågt.
- **`moped`**: mopedens motor, ett mjukt, lugnt *putt-putt-putt* som går att loopa, 4–6 s. Inte surrigt eller högt som en riktig moped. Reserv: `tuff-tuff` mycket lågt.
- **`klonk`**: en liten plasthink som tippar i korgen, 0,3–0,5 s. Reserv: `hink-dunk` lågt.

Tills de finns används reserven i tabellen. Sanna levererar ljud (CLAUDE.md), så de skapas eller hämtas bara om hon ber om det.
