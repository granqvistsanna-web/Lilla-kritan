# Storyboard – Avsnitt 024 · Lammet klär på sig (utkast)

Byggd 2026-11-11 ur [`../manus.md`](../manus.md) (grind 1, inte godkänt rad för rad än). Bläddra i [`index.html`](index.html), se [`animatik.mp4`](animatik.mp4).

**Längd:** 2:41.6 med 1 s logotyp (räknat av bygg.mjs ur raderna). Alla repliklängder är uppmätta.

Introt är 1 s logotyp (ingen jingel, inget titelkort, ingen outro), så filmens längd = scenens längd + 1,0 s.

## Platshållare och öppet

- **Malins röst** är inspelad (2026-11-11): de 28 replikerna i `assets/ljud/roster/lammet-klar-pa-sig/`, namnen i [`../rost.txt`](../rost.txt), de uppmätta längderna i `ROST` i [`rader.mjs`](rader.mjs). Var *"på!"* börjar i 19, 20 och 24 är uppmätt med silencedetect (`PA_TID`).
- **Hallen** är `assets/bakgrunder/hallen/hallen-v1.jpeg` ([`bakgrunder/hallen.md`](../../../bakgrunder/hallen.md)): korallröd vägg, dörren längst till vänster, krokribban till höger, golvlinjen på y ca 820 i 1920 × 1080. Lammet står på y 900, pallen till höger under krokarna. Lammet kommer in från dörrens håll.
- **Mössan** är `assets/rekvisita/mossan/cut/mossan.png` ([`rekvisita/mossan.md`](../../../rekvisita/mossan.md)). Se "Mössan på lammet" nedan.
- **Logotypen** i bild 00 är fortfarande ett textkort (ingen bild att byta till i den här rundan).
- **Lammets ljud** (`ba-1…9`, `ba-fniss-1…9`) är inte valda per känsla än. Numren i `rader.mjs` är gissade.
- **Mattan** (`hemmaljud`) och skogsljudet under ritintrot ligger inte i animatiken.
- Uppslag 5 och 6 är delade i 5a–5c och 6a–6b (som 020), så det blir 28 bilder av manusets 21 uppslag plus ritintrot.
- Rörelse visas med lila streckade pilar. De är storyboardens notation och finns inte i filmen.

## Det här gick inte att rita rakt av med riggen

1. **Sitta med benen fram.** Riggens pose `sitter` sänker kroppen och fäller benen utåt *bakom* kroppen, så bara klövspetsarna syns ([provbild](frames/prov-strumpa.jpg)): där går det inte att visa en strumpa. Storyboarden använder därför en egen pose (`SITT` i `scen.html`): kroppen sänkt, benen i lagret *framför* kroppen, lite isär ([provbild](frames/prov-strumpa-fram.jpg)). Benen är gjorda för att sitta bakom kroppen: framför syns hela roten med vit kant, som en pinne som ligger på magen. Det går att leva med i en storyboard, men till filmen bör lammet få `-fram`-kopior av benen (roten tonad som armarnas `-fram`), eller så visas benen bara med strumpa på.
2. **Resa sig.** Mellan 17 (sitter) och 18 (står) finns ingen rörelse. Det blir ett klipp.
3. **Mössan 60 px ner räcker inte.** Det behövs 84 px (se nedan).
4. **Kritan ritar mössan "framför lammet":** i luften snett upp till höger om lammet. Rakt framför skulle den täcka ansiktet.

## De tre provbilderna

- **Strumpa på sittande lamm** ([prov-strumpa-fram](frames/prov-strumpa-fram.jpg), [12](frames/12.jpg), [13](frames/13.jpg)): storleken går att få rätt (skala 0,62 i riggens ruta, då är skaftet ca 100 px mot benets 85), och den läses som en strumpa. Men den passar inte bra: (a) strumporna är ritade från sidan med tån åt sidan, lammets ben ses rakt framifrån, så foten sticker ut i sidled som en L-form; (b) strumporna är v1-stil (genomskinlig ljus krita, tjock ojämn vit kritkant) och lammet är v2 (tät krita, jämn klistermärkeskant), det syns tydligt i närbild; (c) strumpan är längre än benets synliga del och går upp över magen. Förslag: en ny strumpa i v2-stil sedd framifrån (en rak, kort tub med rundad tå nedåt, ca 110 × 150 px i riggens ruta), eller en strumpa ritad i kod som en färgad kapsel över klöven.
- **Stövlar på stående lamm** ([prov-stovlar-fram](frames/prov-stovlar-fram.jpg), [prov-stovlar](frames/prov-stovlar.jpg), [18](frames/18.jpg)): passar bra. Skala 0,15, en stövel per ben, tårna utåt (den vänstra speglad). Framför kroppen läses de tydligt som stövlar (det är den varianten storyboarden använder); bakom kroppen syns bara foten, som gula skor. I 18 sticker strumpans kant upp ovanför stövelskaftet: gulligt eller rörigt, Sanna väljer (annars göms strumporna när stövlarna är på).
- **Mössan över ögonen** ([prov-mossa-ogon](frames/prov-mossa-ogon.jpg), [8](frames/8.jpg), [10](frames/10.jpg)): fungerar med den riktiga mössan. Ögonen är helt dolda, nosen, munnen och kinderna syns, öronen sticker ut på båda sidor under resårkanten. På huvudet ([prov-mossa](frames/prov-mossa.jpg), [7](frames/7.jpg)) sitter den som en riktig toppluva och öronen sticker ut under kanten.

## Mössan på lammet

`cut/mossan.png` (811 × 799) läggs i lammets kroppsgrupp och följer huvudet. Mått i riggens 1024-ruta (`MOSSA` i `scen.html`):

- **Bredd 470 px** (pannan är 412, öronspannet 187–836). Då sticker öronen ut ca 75 px på var sida under resårkanten, både när mössan sitter och när den är nere.
- **Sitter:** underkanten på y 362, strax över ögonen (376–428). **Över ögonen:** y 446, alltså **84 px** ner.
- Mössan är hög (tofsen når över hjässan i båda lägena), så hjässan syns aldrig när den glider ner.
- Konturen som kritan ritar i 5b är mätt ur bildens kant (`MOSSA_KONTUR`).

## Så är den gjord

[`scen.html`](scen.html) ritar varje rad (`?rad=12` visar en), [`rader.mjs`](rader.mjs) har raderna och replikerna, och [`bygg.mjs`](bygg.mjs) tar en stillbild per rad till [`frames/`](frames/), skriver tabellen nedan och `index.html`, och med `--animatik` också `animatik.mp4`. Kör från repots rot:

```bash
node avsnitt/024-lammet-klar-pa-sig/storyboard/bygg.mjs --animatik
```

**Plaggen** ligger som urklipp inne i riggen (`plaggIn`): strumpan och stöveln får benets transform efter varje `rita()`, så de följer benet när det lyfts eller stampar. Mössan ligger i kroppens grupp och följer huvudet. `pa` 0–1 är hur långt plagget har glidit på. Lammet tar aldrig i plaggen.

**Tiderna:** replikens uppmätta längd plus manusets pauser (1 s i 4, gisspaus 3 s i 5b, 4 s efter *"Ska vi säga tack?"*, 4 s under mössan, 2 s i 10, 5 s vid pallen, 4 s före stampet) plus 0,7 s luft per rad med replik.

**Inga djurnamn** i det som sägs. Ingen text i bilderna utom logotypens textkort.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start, längd; ~ = uppskattad) | I bild | Lammet, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 1.0 s | Intro | – | Lilla Kritans logotyp i 1 s. Ingen jingel, inget titelkort. Storyboarden visar ett textkort | tyst | – |
| [01a](frames/01a.jpg) | 0:01.0 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:02.0, 1.8 s) | Kritan ritar lammets kontur i ett lugnt drag (ca 7 s totalt), halvvägs här | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:07.0 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:07.0, 1.7 s) | Konturen ritas klar, sedan väntar kritan bredvid i ca 4 s och svävar: barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:14.5 | 3.8 s | Papperet, helbild → zoom in | *"Oj! Ett lamm!"* (0:15.1, 2.0 s) | Det riktiga lammet fylls i inifrån. Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:18.3 | 5.5 s | Hallen, helbild | *"Hej, lammet! Hej, hej!"* (0:19.9, 1.8 s) | Lammet trippar in från vänster (riggens gång), stannar och vinkar: armen bakom kroppen, snett ut förbi kanten | små steg, glatt `ba` | glad |
| [2](frames/2.jpg) | 0:23.8 | 4.2 s | Hallen, halvbild | *"Ska du gå ut och leka?"* (0:24.1, 1.6 s) | Lammet tittar mot dörren (riktning höger), öronen vippar | förtjust `ba` | jätteglad |
| [3](frames/3.jpg) | 0:28.0 | 4.7 s | Hallen, helbild | *"Då ska du väl klä på dig?"* (0:28.3, 1.5 s) | Strumporna ligger på golvet. Lammet skakar på huvudet: hela ägget lutar ±6° tre gånger | trumpet `ba` | ledsen (trumpen) |
| [4](frames/4.jpg) | 0:32.7 | 8.3 s | Hallen, närbild | *"Oj då. Lammet vill visst inte klä på sig."* (0:33.0, 3.0 s) … *"Hm … vad gör vi nu?"* (0:37.0, 2.0 s) | Lammet vänder bort huvudet (riktning vänster), öronen faller. Paus 1 s mellan replikerna | trumpet `ba` | ledsen, tittar bort |
| [5a](frames/5a.jpg) | 0:41.0 | 4.2 s | Hallen, helbild | *"Titta! Kritan ritar något."* (0:41.3, 2.4 s) | Kritan kommer in uppifrån höger och stannar i luften framför lammet | – | nyfiken |
| [5b](frames/5b.jpg) | 0:45.2 | 7.0 s | Hallen, halvbild (klipp när kritan börjar) | – | Kritan ritar mössans kontur i luften i ett lugnt drag (4 s), sedan gisspaus 3 s: kritan svävar bredvid | kritan ritar | nyfiken |
| [5c](frames/5c.jpg) | 0:52.2 | 4.8 s | Hallen, halvbild | *"En mössa! Varsågod, lammet."* (0:52.3, 2.8 s) | Den riktiga mössan fylls i inifrån och svävar framför lammet. Kritan flyger iväg | glitter | förvånad |
| [6a](frames/6a.jpg) | 0:57.0 | 5.9 s | Hallen, halvbild | *"Ska vi säga tack?"* (0:57.3, 0.9 s) | Lammet tittar på mössan, öronen reser sig. Paus 4 s: barnet säger tack | nyfiket `ba`, sedan tyst | nyfiken |
| [6b](frames/6b.jpg) | 1:02.8 | 3.4 s | Samma | *"Tack!"* (1:02.8, 0.7 s) | Lammet nickar (ägget trycks ihop och sträcks en gång) | förtjust `ba` | jätteglad |
| [7](frames/7.jpg) | 1:06.2 | 4.8 s | Hallen, halvbild | *"Mössan på!"* (1:06.5, 1.9 s) | Mössan glider ner uppifrån och stannar på huvudet. Öronen sticker ut under kanten | `prassel-tyg`, fniss | glad |
| [8](frames/8.jpg) | 1:11.0 | 7.8 s | Hallen, närbild (klipp) | *"Oj! Var är lammet?"* (1:11.3, 2.8 s) | Mössan glider ner över ögonen. Paus 4 s: bara nosen, munnen och öronen syns | tyst, ett litet `ba` under mössan | – (ögonen dolda), ler |
| [9](frames/9.jpg) | 1:18.8 | 3.9 s | Samma | *"Tittut!"* (1:18.8, 1.4 s) | Mössan glider upp på *"Tittut!"*, lammet tittar fram | `ba-fniss` | jätteglad |
| [10](frames/10.jpg) | 1:22.7 | 7.4 s | Samma | *"Var är lammet?"* (1:23.0, 1.1 s) … *"Tittut!"* (1:26.0, 1.5 s) | En gång till, kortare: mössan ner (paus 2 s) och upp igen på *"Tittut!"* | det långa `ba-fniss` | dolda → fnissig |
| [11](frames/11.jpg) | 1:30.1 | 4.4 s | Hallen, helbild | *"Ska du klä på dig nu?"* (1:30.4, 1.4 s) | Lammet sätter sig på golvet bredvid strumporna (posen `sitter`), benen ut | förtjust `ba` | glad |
| [12](frames/12.jpg) | 1:34.5 | 7.2 s | Hallen, närbild benen | *"Först ena strumpan. Dra, dra … på!"* (1:34.8, 4.8 s) | Lammet lyfter ena benet. Strumpan glider från golvet upp på benet och sitter på *"på!"*. **Shorten: 8–9 och 12–18** | `strumpa` | glad |
| [13](frames/13.jpg) | 1:41.6 | 6.9 s | Samma | *"Och andra strumpan. Dra, dra … på!"* (1:41.9, 4.1 s) | Samma, andra benet | `strumpa`, fniss | fnissig |
| [14](frames/14.jpg) | 1:48.5 | 7.2 s | Hallen, halvbild | *"Oj, stövlarna då? Lammet vet inte var."* (1:48.8, 4.0 s) | Lammet tittar åt vänster, sedan åt höger (ögonen och ansiktet, huvudet vänds inte) | frågande `ba` | nyfiken |
| [15](frames/15.jpg) | 1:55.7 | 9.8 s | Hallen, närbild pallen (klipp) | *"Kan du hjälpa lammet? Kan du se var stövlarna är?"* (1:56.0, 3.8 s) | Två gula tår sticker fram bakom pallen. Paus 5 s; efter 3 s skimrar de svagt | tyst, ett svagt `tindra` | – |
| [16](frames/16.jpg) | 2:05.5 | 5.2 s | Samma | *"Ja, där! Ja, bakom pallen!"* (2:05.5, 3.1 s) | Stövlarna skimrar tydligt | `tindra`, förtjust `ba` | – |
| [17](frames/17.jpg) | 2:10.7 | 5.5 s | Hallen, helbild | *"Dra, dra … på!"* (2:11.7, 2.2 s) | Stövlarna glider fram från pallen över golvet och upp på benen, på plats på *"på!"* | `strumpa`, `duns` | jätteglad |
| [18](frames/18.jpg) | 2:16.2 | 12.7 s | Hallen, helbild | *"Nu är du färdig! Kan du stampa med fötterna?"* (2:16.5, 3.4 s) … *"Stamp, stamp, stamp!"* (2:23.9, 2.6 s) | Lammet står med mössa, strumpor och stövlar. Paus 4 s, sedan stampar det tre gånger, lugnt: ett ben i taget lyfts 20 px. Små streck vid foten | `steg` ×3, `ba-fniss` | stolt → jätteglad |
| [19](frames/19.jpg) | 2:28.9 | 5.1 s | Hallen, halvbild | *"Hej då, lammet! Hej då, mössan!"* (2:29.2, 2.5 s) | Lammet vinkar (armen bakom kroppen, snett ut förbi kanten) | hej då-`ba` | jätteglad |
| [20](frames/20.jpg) | 2:34.1 | 5.0 s | Samma | *"Hej då! Vi ses snart!"* (2:34.4, 2.4 s) | Lammet vinkar klart, armen sjunker | fniss | glad |
| [21](frames/21.jpg) | 2:39.1 | 2.5 s | Hallen → kritirisen | – | Kritirisen drar ihop sig runt lammet | mattan klingar ut | glad |
<!-- /tabell -->
