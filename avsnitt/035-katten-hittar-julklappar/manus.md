# Avsnitt 035 – Katten hittar julklappar (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-13 (Sanna: *"push on"*, via huvudsessionen). Samma dag valde Sanna figur och plats: **katten** och **en ny vinterbakgrund**, Snögården. Manuset är skrivet efter det. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Förlagor: 022 och 023.

**Enkel animation.** Katten står **på snön** mitt i bilden, inget framför henne. Hon gräver med **ena framtassen**: armen framför kroppen (`-fram`-kopian) går ner mot snön medan katten lutar sig fram och sjunker lite, som kaninen äter i 022. Saker som ska röra sig flyttar sig själva (luvan glider upp på huvudet, paketen hoppar upp på pulkan), som glaset i 022. Svart katt mot vit snö syns tydligt.

| | |
|---|---|
| **Titel** | Katten hittar julklappar (avsnitt 35). Introt *"Djuren hittar på!"*, inget titelkort |
| **Figurer (1)** | **Katten Kaj** (v2, riggad, [`karaktarer/katten-kaj.md`](../../karaktarer/katten-kaj.md)), stor figur, `SKALA 0,5` |
| **Platser (1)** | **Snögården** (ny platta, se [behov.md](behov.md)): snöig gård på julafton, en röd stuga med tänt fönster och julkrans till vänster, en liten snöig gran till höger, mitten tom. Inget platsbyte |
| **Nya saker** | inga. Tomteluvan, paketet, rosetten, snötussen och pulkan finns i `rekvisita/` |
| **I kod** | fallande snö, kattens tassavtryck, snöpuffar när hon gräver, snöflingan på nosen, paketens röda hörn och rosetten som sticker upp, skimret, pulkans rep |
| **Favoriter** | 🐱 katt · 🎁 paket · ❄️ snö |
| **Kärna** | Det är julafton och katten fryser och vill gå in. Kritan ritar en tomteluva: "Varsågod!" – "Tack!" Med luvan blir det varmt, och katten fångar snöflingor. Hon gräver fram tre paket ur snön med samma fras, och barnet hittar det sista, som ligger precis bakom henne. Paketen är för många att bära, så kritan ritar en pulka. God jul! Hej då! |
| **Barnet övar på** | hitta paketet · räkna till tre · säga tack · säga god jul |
| **Leken** | **fånga snöflingor** med tassen, och en flinga landar på nosen (uppslag 12–13) |

Ingen tomte i bild och ingen förklaring till varför paketen ligger i snön: det är julafton, och paketen finns där. Inget läskigt.

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång. Ett tassavtryck i snön per steg (i kod, som lerspåren i 020), med ett mjukt knarr |
| Fryser | tre små lugna darr (±1,5°, 0,2 s var), öronen sjunker lite, ögonen kniper. Inget studs |
| Skakar på huvudet | hela kroppen lutar ±6° tre gånger, `luta` |
| Vill gå in | riktningsposen `rikt −1` mot stugans dörr, ett steg åt vänster. Ingen vändning, ingen spegling |
| Luvan på | tomteluvan ligger på snön bredvid katten, lyfter och glider i en mjuk båge upp till huvudet (1,2 s) och sitter mellan öronen, lite snett. Flyttas och vrids, skalas aldrig |
| Mysigt | blundar nöjt, ett lugnt andetag, svansen viftar sakta |
| Fångar snöflingor | en stor flinga (`snoflinga`, liten skala) singlar ner framför katten. Ena armen lyfts lugnt upp mot den (som vinkningen, rak arm), flingan seglar förbi. Andra gången landar den på nosen. Ögonen följer flingan |
| Snö på nosen | ögonen tittar ner på nosen (lite skelögt), morrhåren vickar, ett litet nys utan ljud: huvudet rycker 4 px, flingan faller |
| Gräver | katten lutar sig fram 10° och sjunker 40 px, framtassen (`-fram`) går ner och upp två gånger (±12° kring axeln), en snöpuff per tag. På *"ett paket!"* lyfts paketet upp ur snön (0,6 s) och står på snön, snön på locket rasar av (`snotuss`) |
| Tittar efter | `rikt ±0,3` och ögonen `titt ±36·rikt`, huvudet vänds inte |
| Svansen pekar | i gisspausen viftar svansen sakta mot rosetten bakom katten (en ledtråd, inte för tydlig) |
| Paketen på pulkan | ett paket i taget gör en lugn båge (0,7 s) upp på sitsen, **på orden** *"ett paket … två paket … tre paket!"*, `duns` vid varje landning |
| Drar pulkan | repet är en kritlinje i kod från pulkans framkrok till kattens tass (rak arm). Katten går tre steg åt höger (`rikt +1`) och pulkan glider efter, stannar |
| Glad | ett litet lugnt skutt (20 px, tryck ihop före och vid landningen), bara när paketet hittas och på *"God jul!"* |
| Vinkar | armen bakom kroppen, snett upp och ut förbi kanten, glider upp på 0,6 s, 3–4 lugna vink |

## INTRO

Det gemensamma introt *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`, ca 3,3 s), sedan tomt papper. Inget kritsvep.

## KRITAN RITAR (~16 s) – papper

Kritan ritar katten: konturen i lugna drag (7 s), en del i taget: den runda kroppen, **två spetsiga öron** (egna drag), armarna (ett drag per arm), benen, den långa svansen med kroken, tre morrhår per sida. Väntar, svävar och vickar (ingen knackning) medan barnet gissar. Den riktiga katten fylls i inifrån. Zoom in i teckningen och vitt över.

## SNÖGÅRDEN

Snön faller lugnt hela tiden (i kod, som i `produktion/youtube/shorts/jul/djur.js`), så bilden aldrig står still. Fönstret i stugan lyser varmt.

| # | Bild (en rörelse) | Malin säger | Katten svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar katten del för del, armarna och öronen med | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En katt! | krita-ritar, matta |
| 1 | Helbild, snögården, snön faller. Katten trippar in från höger, lämnar tassavtryck, stannar och vinkar | Hej, katten! Hej, hej! | snösteg, hej-mjau |
| 2 | Halvbild, katten tittar upp på flingorna, ett litet glatt skutt | Oj, vad mycket snö! | förtjust mjau |
| 3 | Närbild på tassavtrycken, sedan klipp tillbaka till katten som tittar på dem | Titta, tassar i snön! | nyfiket mjau |
| 4 | Halvbild, katten darrar tre gånger | Brr! Katten fryser visst. | `brr` eller `huttra` |
| 5 | Helbild, katten skakar på huvudet | Ska vi leka i snön? | trumpet mjau |
| 6 | Närbild, katten tittar mot stugans dörr (`rikt −1`), ett steg dit | Oj då. Katten vill visst gå in. *(paus 1 s)* Hm … vad gör vi nu? | trumpet mjau |
| 7 | Klipp till snön bredvid katten: kritan kommer in och ritar en tomteluva på snön (konturen med brätte och tofs, 3,5 s), gisspaus 3 s, luvan fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En tomteluva! Varsågod, katten. | krita-ritar, glitter |
| 8 | Halvbild, luvan lyfter och glider upp på kattens huvud. Katten blinkar | – | `swoosh` (mjuk), förtjust mjau |
| 9 | Katten tittar upp mot luvan | Ska vi säga tack? *(paus 2,5 s)* | nyfiket mjau |
| 10 | Katten nickar direkt | Tack! | förtjust mjau |
| 11 | Närbild, katten blundar nöjt, svansen viftar | Mmm … varmt och skönt. | spinn (mysig suck) |
| 12 | Halvbild, en flinga singlar ner, katten lyfter tassen mot den, den seglar förbi; en till | Oj! Katten fångar snöflingor! | förtjust mjau |
| 13 | Närbild, flingan landar på nosen, katten tittar på den, ett litet nys, flingan faller | Ha ha! Snö på nosen! | fniss |
| 14 | Helbild, vid stugans trappa sticker ett rött hörn upp ur snön. Klipp till närbild på hörnet | Titta! Något rött i snön. | nyfiket mjau |
| 15 | Halvbild, katten tittar mot hörnet, öronen reser sig | Ska du gräva fram det? | förtjust mjau |
| 15b | Helbild, katten går bort till hörnet (3 s, ingen replik) | – | snösteg |
| 16 | Närbild vid trappan, katten gräver med tassen, paketet lyfts upp | Först här. Gräv, gräv … ett paket! | snöpuff × 2, `pling` på "paket" |
| 16b | Helbild, ett nytt rött hörn under granen. Katten går dit | – | snösteg |
| 17 | Närbild vid granen, samma grävning | Och här. Gräv, gräv … ett paket! | snöpuff × 2, `pling` |
| 18 | Halvbild mitt på gården, katten tittar åt vänster, sedan åt höger | Oj, ett paket är kvar. Katten vet inte var. | frågande mjau |
| 19 | Helbild för frågan, sedan klipp till närbild bakom katten: en guldgul rosett sticker upp ur snön precis vid svansen. Svansen viftar sakta. Efter 3 s skimrar rosetten | Kan du hjälpa katten? Kan du se var paketet är? *(paus 5 s)* | tyst |
| 20 | Rosetten skimrar tydligt, katten tittar bakåt (`rikt` och ögonen mot rosetten) | Ja, där! Ja, bakom katten! | förtjust mjau, `glimt` |
| 21 | Katten tar ett steg fram, gräver bakom sig, det sista paketet (litet, med rosett) lyfts upp. Litet glatt skutt | Gräv, gräv … ett paket! | snöpuff, `pling`, fniss |
| 22 | Helbild, tre paket på snön, katten tittar från det ena till det andra | Oj, så många paket! *(paus 1 s)* Hm … vad gör vi nu? | frågande mjau |
| 23 | Klipp till snön framför katten: kritan ritar en pulka (medarna, sitsen, repet, 4 s), gisspaus 3 s, pulkan fylls i | Titta! Kritan ritar igen. *(gisspaus 3 s)* En pulka! Varsågod, katten. | krita-ritar, glitter |
| 24 | Halvbild, katten nickar. Kritan flyger ut | Tack, kritan! | förtjust mjau, `pling` |
| 25 | Helbild, paketen hoppar upp på pulkan ett i taget, på orden | Ett paket … två paket … tre paket! | `duns` × 3 |
| 26 | Katten tar repet och drar pulkan tre steg åt höger, stannar | Nu kan katten dra hem paketen. | snösteg, förtjust mjau |
| 27 | Halvbild, katten tittar på oss. Efter 2 s av pausen mjauar hon tre gånger, som om hon säger god jul | Det är julafton! Kan du säga god jul? *(paus 4 s)* | pratar-mjau (tre i rad) |
| 28 | Litet glatt skutt | God jul! | förtjust mjau |
| 29 | Katten vinkar, pulkan med paketen bredvid | Hej då, katten! Hej då, paketen! | hej då-mjau |
| 30 | Samma, katten vinkar klart | Hej då! Vi ses snart! | fniss |
| 31 | Kritirisen runt katten och pulkan, 0,6 s svart | – | – |

**Short:** uppslag 14–21 (hitta paketen, barnet hittar det sista), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. En tagning. Filerna hamnar i `assets/ljud/roster/katten-hittar-julklappar/`. Samma lista med filnamn står i [`rost.txt`](rost.txt) för `dela-tagning.py`. Uppslag 22 återanvänder nr 10 (*"Hm … vad gör vi nu?"*), så den spelas bara in en gång.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En katt!
[happy] Hej, katten! Hej, hej!
[excited] Oj, vad mycket snö!
[happy] Titta, tassar i snön!
[surprised] Brr! Katten fryser visst.
[cheerfully] Ska vi leka i snön?
[chuckles] Oj då. Katten vill visst gå in.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En tomteluva! Varsågod, katten.
[warmly] Ska vi säga tack?
[happy] Tack!
[happy sigh] Mmm … varmt och skönt.
[surprised] Oj! Katten fångar snöflingor!
[laughs] Ha ha! Snö på nosen!
[curious] Titta! Något rött i snön.
[cheerfully] Ska du gräva fram det?
[happy] Först här. Gräv, gräv … ett paket!
[happy] Och här. Gräv, gräv … ett paket!
[curious] Oj, ett paket är kvar. Katten vet inte var.
[warmly] Kan du hjälpa katten? Kan du se var paketet är?
[excited] Ja, där! Ja, bakom katten!
[happy] Gräv, gräv … ett paket!
[surprised] Oj, så många paket!
[excited] Titta! Kritan ritar igen.
[happy] En pulka! Varsågod, katten.
[warmly] Tack, kritan!
[happy] Ett paket … två paket … tre paket!
[cheerfully] Nu kan katten dra hem paketen.
[warmly] Det är julafton! Kan du säga god jul?
[happy] God jul!
[happy] Hej då, katten! Hej då, paketen!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Kattens röst

Det finns bara ett kattljud, `mjau-1` (1,4 s, en kattunge, från Gissa teckningen). Katten behöver en egen familj **`mjau-gullig`** i receptets ordning (hej, förtjust, fniss, mysig suck, nyfiken, trumpen, pratar, hej då), där hej och hej då låter som svenska *"hej"* och *"hej då"* (kolla med whisper). Den används sedan också i 025 och andra avsnitt med katten. Mysig suck kan vara ett mjukt spinn. Se [behov.md](behov.md).

## Regelkoll

- [x] 1 figur, 1 plats, inga nya saker (en ny platta)
- [x] Inga djurnamn i det som sägs: *"katten"*, *"paketen"*, aldrig *"Kaj"*. Filnamnen säger `katten`
- [x] Aldrig *"Vad kan det vara?"* (ritintrot: *"Hm … vad blir det nu?"*)
- [x] Aldrig *"Vad säger man?"*: *"Ska vi säga tack?"*
- [x] Tre frågor till barnet med paus: tack (2,5 s), var är paketet (5 s), säga god jul (4 s)
- [x] *"Varsågod"* och *"Tack!"* (två gånger, en per teckning, som 023)
- [x] Samma fras tre gånger: *"Gräv, gräv … ett paket!"*, barnet hjälper med den sista
- [x] Kritan ritar två gånger: gåvan (luvan) och en sak som löser ett nytt problem (pulkan)
- [x] Tydligt hej och hej då, med vinkning
- [x] Malin efter handlingen: grävningen, luvan, flingan och paketen syns innan repliken
- [x] Lugn rörelse: inget snurrar, ingen spegling, inga böjda armar, glada skutt bara på tre ställen
- [x] Fniss: katten högst 3 (snö på nosen, tredje paketet, slutet), Malin skrattar 2 gånger och småler en gång
- [x] Inget läskigt: ingen tomte, ingen is, ingen som ramlar
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] **Avsteg från kärnan, litet:** problemet är att katten *fryser* och vill gå in, inte att hon vägrar en vardagssyssla. Lösningen tre gånger är att gräva fram paket, inte att göra något med hjälpsaken

## Öppet

1. **Provbild innan scenen byggs:** katten med tomteluvan mellan öronen (luvan är ritad för grisen och kan behöva en annan skala och vinkel), och katten som gräver med framtassen.
2. **Tittut med luvan över ögonen** är medvetet bortvald: 024 (mössan) och julkalenderns lucka 23 (tomteluvan) har redan den leken.
3. **Svansens ledtråd** i gisspausen: om den gör det för lätt, låt svansen vara still.
