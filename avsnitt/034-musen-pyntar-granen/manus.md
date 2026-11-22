# Avsnitt 034 – Musen pyntar granen (plan)

**Status:** ✅ grind 1 godkänd ("push on", 2026-11-13). Besluten står i README: figuren är **musen** (Sanna: *"ej kon använd musen"*) och platsen ett nytt **vardagsrum** utan säng, med snö som faller utanför fönstret. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Julavsnitt, jul inne.

**Varför pynta granen** (av baka pepparkakor, pynta granen och hänga upp strumpan): det är det som en 1–3-åring känner igen tydligast, det har färger att peka på (röd, gul, blå), en sak som görs tre gånger (en kula i taget) och en naturlig gömlek (en kula rullar bort). Det går också att spela med riggens raka armar: kulan sitter i handens spets som tvålen i 020, och armen lyfts bakom kroppen som i vinkningen. Att baka kräver att kavla och stansa (böjda armar, och J04 *Björnen pepparkaka* finns redan), och strumpan blir bara en handling.

**Enkel animation.** Musen står bredvid granen, inte bakom något. Saker som behöver lyftas glider själva upp till handen eller upp i granen, som glaset i 022. Musen böjer sig ner mot golvet som kaninen när den äter, och sträcker inte ner armen.

| | |
|---|---|
| **Titel** | Musen pyntar granen (avsnitt 34). Introt är det gemensamma *"Djuren hittar på!"* |
| **Figurer (1)** | **Musen Mille** (v2, riggad, SKALA 0,5) |
| **Platser (1)** | **Vardagsrummet** (ny platta i 16:9, [platsen.md](platsen.md)): fönster med snö som faller utanför (i kod), gardiner, fåtölj med filt, matta. Ingen säng. Inget platsbyte |
| **Saker som finns** | julgranen utan pynt, julgransfoten, julkulan (röd; gul och blå tonas i kod), gula stjärnan |
| **Nya saker** | vardagsrummets platta (enda nya bilden). I kod: musens spegelbild i kulan, snön utanför fönstret, kulornas glimt, skimret |
| **Favoriter** | 🎄 jul · 🔴🟡🔵 färger · ⭐ stjärna · 🙈 tittut |
| **Kärna** | Granen är alldeles tom. Kritan ritar en julkula: "Varsågod!" – "Tack!" Kritan ritar en gul och en blå kula till. Musen ser sig själv i kulan och leker tittut, och under tiden rullar den blå kulan iväg. Musen hänger upp kulorna med samma fras tre gånger, och barnet hittar den blå under granen. Toppen är tom: kritan ritar stjärnan, den sitter för högt, och barnet säger "upp!". Nu är det jul. Hej då! |
| **Barnet övar på** | färger (röd, gul, blå) · hitta kulan · säga tack · säga "upp!" |
| **Leken** | musen ser sin spegelbild i den röda kulan och leker **tittut** med den (uppslag 11–12) |
| **Samma fras tre gånger** | *"Upp, upp … pling!"* (röd, gul, blå) |
| **Kritan ritar två gånger** | 1: julkulan (och två till), 2: stjärnan |

**Inte samma som julkalenderns lucka 23** (grisen klär granen ute i snön, kulorna rullar iväg och hunden hämtar dem): här är det inne, en figur, kritan ritar kulorna och barnet hittar en gömd kula. Repliken *"Och stjärnan i toppen!"* från lucka 23 används inte, så de två låter olika.

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | riggens gång från vänster, stannar till vänster om granen (`STA`), vinkar (armen bakom kroppen, snett ut förbi kanten) |
| Ser granen | riktningsposen mot granen (`rikt +0,4`), ögonen följer, öronen reser sig, ett litet glatt skutt |
| Granen är tom | öronen faller 12°, blicken ner. Ingen gråt |
| Kulorna ligger på golvet | kritan ritar dem på golvet framför musen, en i taget. De ligger stilla med öglan uppåt och guppar inte |
| Ser sig i kulan | musen böjer sig ner mot den röda kulan (sjunker 40–60 px och lutar fram, som kaninen som äter). Närbild på kulan: musens eget ansikte, litet och kodritat, i kulan, rundat som i en spegel (riggens ansikte i liten skala inne i en cirkel, `clipPath`) |
| Tittut | musen reser sig, spegelbilden försvinner ur kulan. Musen böjer sig ner igen, *"Tittut!"*, spegelbilden är tillbaka. Lugnt, ingen studs |
| Den blå kulan rullar iväg | medan musen leker rullar den blå kulan sakta (2,5 s) bakom julgransfoten. Barnet kan se det; musen ser det inte. `rull` lågt |
| Plocka upp | kulan glider själv upp från golvet till handens spets (0,8 s), som glaset i 022. Handen ritas framför kulans överkant |
| Hänga upp | armen bakom kroppen glider upp (0,6 s) förbi kroppens kant, kulan i spetsen. Vid grenen släpper kulan och sätter sig med öglan på grenspetsen, gungar två gånger (±6°, avtar), `ding`, och glimtar till **på "pling!"** |
| Musen vet inte var | tittar åt vänster, sedan åt höger (`rikt ±0,3`, ögonen `titt`), huvudet vänds inte, frågande pip |
| Den gömda kulan | bara en bit av den blå kulan tittar fram vid sidan av julgransfoten, aldrig under den. Skimrar efter 3 s av pausen |
| Stjärnan för högt | musen håller stjärnan uppe i handens spets, ett litet lugnt skutt (20 px), når inte. Öronen faller lite |
| *"Upp!"* | stjärnan glider själv i en mjuk båge från handen upp till toppspetsen (1,4 s) och sätter sig, `tindra-3`, kulorna glimtar en gång |
| Nu är det jul | musen blundar nöjt (bågögon, här ber raden om det), mysig suck, klappar (riggens kantklapp) tre lugna klapp |
| Hej då | vinkar som i början, armen sänks före kritirisen |

## INTRO (ca 3,3 s)

Det gemensamma introt *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`). Scenen börjar på tomt papper, inget kritsvep.

## KRITAN RITAR (~16 s) – papper

Kritan ritar musen: konturen i lugna drag (7 s): ägget, de två runda öronen ovanpå, nosen med nosfläcken, **armarna (ett drag var)**, benen, svansen med en liten krull. Väntar och svävar lugnt, den riktiga musen fylls i. Zoom in i teckningen.

## VARDAGSRUMMET

| # | Bild (en rörelse) | Malin säger | Musen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar en röd julkula (ändrat 2026-11-21 kväll: "måla inte musen måla en julkula"). *"Oj! En mus!"* sägs i stället när musen trippar in i rad 1 | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* En julkula! | krita-ritar, skogsljud |
| 1 | Helbild, vardagsrummet: snön faller utanför fönstret, fåtöljen med filten till vänster, en naken gran i foten till höger. Musen trippar in från vänster och vinkar | Hej, musen! Hej, hej! | steg, `mus-pip` hej |
| 2 | Musen ser granen, ett litet glatt skutt | Titta! En julgran! | förtjust pip |
| 3 | Närbild på granen: inget på den. Klipp till musen, öronen faller | Oj då. Granen är visst alldeles tom. *(paus 1 s)* Titta, musen! En låda med julpynt. Vill du dekorera granen tillsammans? *(musen nickar)* Ja! Vad kul! *(ändrat 2026-11-22, replik 40–42)* | trumpet pip, mhm, förtjust pip |
| 4 | Kritan ritar en röd kula på golvet framför musen: konturen (3,5 s), gisspaus, kulan fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En julkula! Varsågod, musen. | krita-ritar, glitter |
| 5 | Musen tittar på kulan, kawaii-ögon med glitter | Ska vi säga tack? *(paus 2,5 s)* | nyfiket pip |
| 6 | Musen nickar direkt | Tack! | förtjust pip |
| 7 | Kritan ritar en gul kula bredvid | Kritan ritar mer … *(paus 2 s)* En gul kula! | krita-ritar, glitter |
| 8 | Kritan ritar en blå kula och flyger ut | Och en blå! | krita-ritar, glitter |
| 9 | Halvbild, tre kulor på golvet, musen tittar på en i taget | Röd, gul och blå. Oj, så fint! | förtjust pip |
| 10 | Musen böjer sig ner mot den röda kulan. Närbild: musens ansikte syns i kulan | Oj! Musen är i kulan! | fniss |
| 11 | Musen reser sig, ansiktet i kulan är borta. *(paus 2 s)* Musen böjer sig ner igen | Tittut! | `mus-fniss` (det långa) |
| 12 | Helbild: musen leker tittut en gång till. Under tiden rullar den blå kulan sakta bakom julgransfoten | – | `rull` lågt, glatt pip |
| 13 | Halvbild, musen reser sig och tittar på granen | Ska vi pynta granen nu? | förtjust pip |
| 14 | Den röda kulan glider upp i handen, armen upp, kulan sätter sig på en gren i nedersta våningen | Först den röda. Upp, upp … pling! | `ding` på "pling", glimt |
| 15 | Samma med den gula, en gren högre | Och den gula. Upp, upp … pling! | `ding`, förtjust pip |
| 16 | Halvbild, musen tittar ner på golvet: tomt. Tittar åt vänster, sedan åt höger | Oj, den blå kulan! Var tog den vägen? | frågande pip |
| 17 | Frågan i bred bild, sedan klipp till närbild på julgransfoten: en blå kant tittar fram vid sidan. Skimrar efter 3 s | Kan du hjälpa musen? Kan du se var den blå kulan är? *(paus 5 s)* | tyst |
| 18 | Kulan skimrar tydligt, musen vänder sig mot den och blir jätteglad | Ja, där! Under granen! | förtjust pip, `tindra-4` |
| 19 | Musen böjer sig, kulan glider fram och upp i handen, upp i granen | Upp, upp … pling! | `ding` |
| 20 | Helbild, granen med tre kulor. Musen tittar upp mot den tomma toppen | Oj, vad fint! *(paus 1 s)* Hm … toppen är tom. | nyfiket pip |
| 21 | Kritan ritar en stjärna i luften framför musen, den fylls i och glider ner i handen | Titta! Kritan ritar igen. *(gisspaus 2 s)* En stjärna! Varsågod, musen. | krita-ritar, glitter |
| 22 | Musen tittar på stjärnan, kawaii-ögon | Tack, kritan! | förtjust pip |
| 23 | Musen håller stjärnan uppe, ett litet skutt, når inte. Öronen faller lite | Oj! Musen når inte upp. | frågande pip |
| 24 | Närbild på musen med stjärnan uppe. Musen tittar mot tittaren | Ska vi hjälpa till? Säg: upp! *(paus 4 s)* | tyst |
| 25 | Stjärnan glider i en båge upp till toppen och sätter sig. Malin efter att den landat | Upp! *(paus 1,5 s)* Stjärnan sitter i toppen! | `swoosh` mjukt, `tindra-3`, kulorna glimtar |
| 26 | Helbild, den pyntade granen, snön utanför fönstret. Musen blundar nöjt och klappar tre gånger | Mmm … nu är det jul. | mysig suck, `tass-klapp-tre` |
| 27 | Musen vinkar (armen bakom kroppen) | Hej då, musen! Hej då, granen! | `mus-pip` hej då |
| 28 | Samma, musen vinkar klart | Hej då! God jul! Vi ses snart! | fniss |
| 29 | Kritirisen runt musen och granen, 0,6 s svart | – | – |

**Short:** uppslag 13–19 (pynta, leta, hitta den blå), ca 55 s. Alternativ: 20–26 (stjärnan och "upp!").

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. En tagning för hela blocket. Filerna hamnar i `assets/ljud/roster/musen-pyntar-granen/`, med numren i `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En mus!
[happy] Hej, musen! Hej, hej!
[excited] Titta! En julgran!
[chuckles] Oj då. Granen är visst alldeles tom.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En julkula! Varsågod, musen.
[warmly] Ska vi säga tack?
[happy] Tack!
[curious] Kritan ritar mer …
[excited] En gul kula!
[happy] Och en blå!
[warmly] Röd, gul och blå. Oj, så fint!
[surprised] Oj! Musen är i kulan!
[playfully] Tittut! [laughs]
[cheerfully] Ska vi pynta granen nu?
[happy] Först den röda. Upp, upp … pling!
[happy] Och den gula. Upp, upp … pling!
[curious] Oj, den blå kulan! Var tog den vägen?
[warmly] Kan du hjälpa musen? Kan du se var den blå kulan är?
[excited] Ja, där! Under granen!
[happy] Upp, upp … pling!
[happy] Oj, vad fint!
[curious] Hm … toppen är tom.
[excited] Titta! Kritan ritar igen.
[happy] En stjärna! Varsågod, musen.
[warmly] Tack, kritan!
[surprised] Oj! Musen når inte upp.
[warmly] Ska vi hjälpa till? Säg: upp!
[excited] Upp!
[happy] Stjärnan sitter i toppen!
[happy sigh] Mmm … nu är det jul.
[happy] Hej då, musen! Hej då, granen!
[warmly] Hej då! God jul! Vi ses snart! [giggles]
```

36 repliker, ca 2:00 tal. Med pauserna, `GLES` (0,7 s per rad), leken och ritintrot blir filmen ca 3:50–4:10 (receptet siktar på 3:45–4:15).

**Kimi-granskning (2026-11-13, Sanna: "kimi review innan malin"):** 12 förslag, 2 tagna: rad 16 *"Oj! Musen är i kulan!"* (förut *"Där är ju musen!"*, oklart eftersom musen syns hela tiden) och rad 30 *"Oj! Musen når inte upp."* (förut *"Toppen är för högt upp."*). Inte tagna: byta v3-taggarna till adjektiv (`[warmly]`, `[cheerfully]`, `[playfully]` och `[happy sigh]` fungerade i 020–024), stryka *"Kan du hjälpa musen?"* (receptets hjälpmönster), lägga *"Ska vi säga tack?"* före *"Tack, kritan!"* (021:s mönster), *"Var är den?"* i stället för *"Var tog den vägen?"* (godkänt i 022), och att dela slutrepliken.

## Musens röst

Musen har `mus-pip` 1–9 (korta pip, 0,46–1,48 s, från 019) men ingen familj per känsla. **Först lyssnas de nio igenom** (provlyssningsfil) och läggs på receptets känslor (hej, förtjust, fniss, mysig suck, nyfiken, trumpen, pratar, hej då) där de passar. Det som saknas görs som en ny familj **`mus-gullig`** i ElevenLabs Sound Effects (troligen mysig suck, trumpen, hej och hej då), plus ett långt sjungande fniss **`mus-fniss`** till tittut och slutet. Hej och hej då ska låta som svenska *"hej"* och *"hej då"* i pipform, kollat med whisper. Familjen används sedan i alla musens avsnitt. Prompterna skrivs i `ljud-effekter.md` vid grind 4.

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte
- [x] Inga djurnamn i det som sägs: "musen", "granen" (Mille är bara filnamnet)
- [x] Aldrig *"Vad kan det vara?"* (ritintrot: *"Hm … vad blir det nu?"*), aldrig *"Vad säger man?"*
- [x] Tre frågor till barnet med paus: tack (2,5 s), var är den blå kulan (5 s, skimrar efter 3 s), säg upp (4 s)
- [x] *"Varsågod"* (två gånger) och *"Tack!"* / *"Tack, kritan!"*
- [x] Samma fras tre gånger: *"Upp, upp … pling!"*, barnet hjälper med den sista
- [x] Kritan ritar två gånger (kulorna, stjärnan)
- [x] Tydligt hej och hej då med vinkning
- [x] Högst 3–4 fniss: tittut, kulan i spegeln, slutet
- [x] Inget läskigt: ingen kula går sönder (`glas-klirr` används inte), ingen gråt
- [x] Lugn rörelse: inget snurrar, inget speglas, inga böjda armar, sakerna glider
- [ ] **Avsteg från kärnan (som 022):** problemet är att granen är tom, inte att musen *inte vill*. Kritan ritar fyra saker (tre kulor och en stjärna)
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [x] *"God jul!"* i slutrepliken behålls (beslut 6 i README): avsnittet är julbundet

## Öppet

Inget. Besluten står i [README](README.md#beslut-2026-11-13), platsen i [platsen.md](platsen.md).

## Ändrat 2026-11-21 kväll (feedback)

- Ritintrot: kritan ritar en röd julkula, inte musen. *"En julkula!"* (37) är klippt ur 09. *"Oj! En mus!"* (03) när musen trippar in.
- Rad 3: *"Hm … vad gör vi nu?"* (07) ersatt av *"Vi ska dekorera granen med julpyntet i lådan. Hurra, vad kul!"* (38, ny).
- Ny rad 13b: musen backar, kritan ritar en pall (*"Titta! Kritan ritar något."*, 08 igen), *"En pall! Varsågod, musen."* (39, ny). Musen kliver upp på pallen på *"Upp, upp"* och hänger kulorna högre.
- Ny rad 25b efter stjärnan: musen slänger upp det sista pyntet (glittergirlangen) i granen, sedan tänds lamporna.
- Rummet: två tavlor, två ljus på spiselhyllan och ett bord med ett ljus.

```
37-en-julkula          [excited] En julkula!
38-vi-ska-dekorera     [excited] Vi ska dekorera granen med julpyntet i lådan! [happy] Hurra, vad kul!
39-en-pall             [happy] En pall! Varsågod, musen.
```

## Ändrat 2026-11-22 (feedback)

- Rad 3: *"Vi ska dekorera granen …"* (38) ersatt av *"Titta, musen! En låda med julpynt."* (40), *"Vill du dekorera granen tillsammans?"* (41), musen nickar två gånger (mhm), *"Ja! Vad kul!"* (42).
- Rad 23: musen kliver upp på pallen med stjärnan, sträcker sig och skuttar, men når ändå inte. *"Oj! Musen når inte upp."* efter försöket.

```
40-titta-en-lada       [curious] Titta, musen! En låda med julpynt.
41-vill-du-dekorera    [warmly] Vill du dekorera granen tillsammans?
42-ja-vad-kul          [happy] Ja! Vad kul!
```
