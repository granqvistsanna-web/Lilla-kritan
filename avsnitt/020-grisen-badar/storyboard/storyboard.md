# Storyboard – Avsnitt 020 · Grisen badar (utkast)

## Platshållare och öppet
- **Ljud som saknas** (prompterna i [`../ljud-effekter.md`](../ljud-effekter.md)): `badanka-pip` (animatiken använder kycklingpipet `pip-1` så länge), `skrubb`, `bubbel`, `kran`. Markerade med ⚠ i tabellen; tystnad i animatiken.
- **Intro och outro** för 020 är inte byggda: bilderna 00 och 21 är platshållarkort. Animatiken lånar 011:s jingel.
- **Mattan** (Suno, [`../suno.md`](../suno.md)) finns inte än, så animatiken har bara Malin och ljudeffekterna.
- **Kritan ritar inne i scenen (5a–5c)** är nytt för formatet (manus, Öppet 1).
- **Shorten** (13–18c) blir ca 45 s med de riktiga replikerna, inte 40.
- **Kranen** på väggen är ritad i kod (en enkel grå pip med rosa ratt). Ingen bild.
- Rader där grisen *rör sig* (skakar på huvudet, nickar, öronen vippar, ankan guppar) visas som en stillbild med röda streckade pilar; rörelserna görs i kodscenerna enligt manusets tabell "Så rör det sig".

**Längd:** 2:29.8 med intro och outro (räknat av bygg.mjs ur raderna).

**Så är den gjord.** Som 011:s v2-storyboard, men allt i en kodscen: [`scen.html`](scen.html) ritar varje rad (`?rad=9` visar en), [`rader.mjs`](rader.mjs) har raderna, och [`bygg.mjs`](bygg.mjs) tar en stillbild per rad till [`frames/`](frames/), skriver tabellen nedan och [`index.html`](index.html) att bläddra i, och med `--animatik` också `animatik.mp4` (stillbilderna i radernas längd med Malins repliker och grisljuden på sina tider). Kör från repots rot:

```bash
node avsnitt/020-grisen-badar/storyboard/bygg.mjs --animatik
```

**Tiderna** kommer från Malins klippta filer (`assets/ljud/roster/grisen-badar/01…25.m4a`, uppmätta med ffprobe) plus manusets pauser: 2 och 3 s i ritintrot, 1 s i 4, 3 s medan ankan ritas, 4 s efter *"Vad säger man?"*, 5 s efter *"Ser du var?"* (fläcken skimrar efter 3 s), 4 s efter *"Kan du blåsa en bubbla?"*. Grisens svar ligger i pausen efter Malins replik. Ljuden enligt manus Öppet 5.

**Grisen i badkaret** (den nya posen): Gretas v2-rigg står bakom badkaret med riggens y 640 vid badkarskanten, så bara huvudet och en skymt av axlarna syns; armarna, benen, svansen och skuggan är dolda. Sjunka = hela figuren flyttas rakt ner bakom kanten (12a), inget snurrar. Skummet ligger framför kanten. Lerfläckarna (trynet, båda öronen, högra kinden) ritas i kod i riggen och följer ansiktet och öronen.

**Badankan** är `assets/rekvisita/badanka/cut/badanka.png` (vänd åt vänster, ungefär ett av grisens öron stor), med den vita kanten (`kant.lagg`, andel 0,01) och ögat med glansprick i kod. Konturen som kritan ritar i 5b är mätt ur bildens kant.

**Inga djurnamn** i det som sägs. Ingen text i bilderna utom intro- och outrokortens platshållare.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Grisen / ankan, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 8.0 s | Intro (fast) | – | Formatets intro: logotypen ritas, kritsvep, titelkortet *Avsnitt 20 · Grisen badar*. ⚠ Introt är inte byggt för 020 än: bilden är en platshållare | introjingeln | – |
| [01a](frames/01a.jpg) | 0:08.0 | 4.0 s | Papperet, helbild | *"Kritan ritar …"* (0:08.5) | Kritan ritar grisens kontur i ett lugnt drag (ca 7 s totalt), halvvägs här | kritan ritar | – |
| [01b](frames/01b.jpg) | 0:12.0 | 3.5 s | Papperet, helbild | *"Vad blir det nu?"* (0:12.0) | Konturen ritas klar, sedan fylls den riktiga grisen i inifrån (som 011:s ritintro) | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:15.5 | 2.8 s | Papperet, helbild → zoom in | *"En gris!"* (0:16.1) | Grisen färdig, lerfläckarna kommer sist (trynet, öronen, kinden). Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:18.3 | 4.6 s | Badrummet, helbild | *"Hej, grisen!"* (0:19.9) | Grisen trippar in från vänster (rigg-motorns gång) och stannar bredvid badkaret, öronen vippar | små steg, glatt nöff (`noff-glad-2`) | glad |
| [2](frames/2.jpg) | 0:22.9 | 4.8 s | Badrummet, närbild huvudet | *"Oj, vad smutsig du är!"* (0:23.3) | Lerfläckarna syns: trynet, båda öronen, högra kinden. Trynet puffar efter repliken | belåtet nöff (`fnys-1` + `noff-2`) | stolt |
| [3](frames/3.jpg) | 0:27.7 | 4.3 s | Badrummet, helbild | *"Nu ska du väl bada?"* (0:28.0) | Kranen på väggen börjar rinna ner i badkaret. Grisen skakar på huvudet (ägget lutar åt sidorna) | ⚠ `kran` saknas, sedan surt nöff (`fnys-4`) | ledsen (surt) |
| [4](frames/4.jpg) | 0:32.0 | 6.8 s | Badrummet, närbild | *"Grisen vill visst inte bada."* (0:32.3) … *"Hm … vad gör vi nu?"* (0:35.1) | Grisen vänder bort trynet (riktningsposen åt vänster), öronen faller ner. Paus 1 s mellan replikerna | surt men gulligt nöff (`fnys-2`) | ledsen, tittar bort |
| [5a](frames/5a.jpg) | 0:38.8 | 3.2 s | Badrummet, helbild | *"Titta! Kritan ritar något."* (0:39.1) | Kritan kommer in i bild uppifrån höger, mot vattnet i badkaret | – | nyfiken |
| [5b](frames/5b.jpg) | 0:42.0 | 3.0 s | Badrummet, helbild | – | Kritan ritar badankans kontur på vattnet i ett drag (ca 3 s): kropp → huvud → näbb | skrrrrt | nyfiken |
| [5c](frames/5c.jpg) | 0:45.0 | 5.2 s | Badrummet, helbild | *"En badanka! Varsågod, grisen."* (0:45.1) | Den riktiga ankan fylls i inifrån och guppar på vattnet; ögat ritas i kod | pip (⚠ `badanka-pip` saknas, kycklingpipet i animatiken) | förvånad |
| [6](frames/6.jpg) | 0:50.2 | 5.2 s | Badrummet, halvbild grisen och badkaret | *"Vad säger man?"* (0:50.5) | Grisen tittar på ankan (riktning höger), öronen reser sig. Paus 4 s: barnet säger tack | nyfiket nöff (`fnys-3`), sedan tyst | nyfiken |
| [7](frames/7.jpg) | 0:55.4 | 3.4 s | Samma | *"Tack!"* (0:55.4) | Grisen nickar (ägget trycks ihop och sträcks en gång) | glatt nöff (`noff-glad-1`) | jätteglad |
| [8](frames/8.jpg) | 0:58.8 | 4.6 s | Badrummet, helbild | *"Oj! Nu hoppar grisen i badkaret!"* (0:59.1) | Ett lugnt hopp in bakom badkarskanten. Kranen slutar rinna när grisen landar | hopp, plask, pip | jätteglad |
| [9](frames/9.jpg) | 1:03.4 | 4.8 s | Badkaret, helbild (lite inzoomad) | *"Det var inte så dumt ändå."* (1:06.0) | Bara huvudet ovanför kanten, skummet växer, ankan guppar bredvid, grisen ler | nöjt nöff-nöff (`noff-djup-1`) före repliken | glad |
| [10](frames/10.jpg) | 1:08.2 | 6.3 s | Badkaret, helbild | *"Ni pratar visst med varandra."* (1:12.1) | Trynet puffar till, ankan glider en bit åt sidan och guppar tillbaka. Utbytet först, repliken efter | nöff – pip – nöff – pip (`noff-2`, `noff-3`) | fnissig |
| [11](frames/11.jpg) | 1:14.5 | 4.6 s | Badkaret, närbild huvudet | *"Ganska skönt."* (1:17.3) | Grisen blundar, öronen hänger avslappnat | ⚠ `bubbel` saknas, mmm-nöff (`noff-djup-1`) | sömnig, blundar |
| [12a](frames/12a.jpg) | 1:19.1 | 3.0 s | Badkaret, helbild | – | Grisen sjunker långsamt rakt ner i skummet så att bara öronen syns. Ankan glider dit | blubb (`plask-2`, ⚠ `bubbel` saknas) | – (under skummet) |
| [12b](frames/12b.jpg) | 1:22.1 | 5.0 s | Badkaret, helbild | *"Oj! Där sitter ju ankan."* (1:23.1) | Grisen kommer upp rakt under ankan, som sitter kvar mellan öronen | pip, fnissigt nöff (`noff-glad-2`) | förvånad → fnissig |
| [13](frames/13.jpg) | 1:27.1 | 5.5 s | Badkaret, helbild | *"Ska du tvätta bort all lera nu?"* (1:27.4) | Öronen vippar, ankan glider ner på vattnet igen. **Shorten börjar här** | pip, glatt nöff (`noff-glad-1`) | glad |
| [14](frames/14.jpg) | 1:32.6 | 6.5 s | Badkaret, närbild huvudet | *"Först trynet. Skrubba, skrubba … borta!"* (1:32.9) | En skumtuss snurrar över trynet, fläcken bleknar och är borta på "borta!", trynet rycker | ⚠ `skrubb` saknas, fnissigt nöff (`noff-glad-2`) | fnissig |
| [15](frames/15.jpg) | 1:39.1 | 5.4 s | Badkaret, närbild huvudet | *"Och öronen. Skrubba, skrubba … borta!"* (1:39.4) | Samma på öronen, ett i taget (här det vänstra, det högra redan rent); de vippar efteråt | ⚠ `skrubb` saknas | glad, blundar mot skummet |
| [16a](frames/16a.jpg) | 1:44.5 | 6.5 s | Badkaret, halvbild | *"Men lite lera är kvar. Ser du var?"* (1:44.8) | Ser rent ut, men en liten lerfläck är kvar på kinden. Paus 5 s, mattan sänkt | tyst | glad, väntar |
| [16b](frames/16b.jpg) | 1:51.0 | 2.0 s | Samma | – | Efter ca 3 s av pausen skimrar fläcken svagt | tyst (ev. ett svagt `glimt`) | glad |
| [17](frames/17.jpg) | 1:53.0 | 6.2 s | Badkaret, närbild huvudet | *"Där, på kinden! Skrubba, skrubba … borta!"* (1:53.0) | Fläcken skimrar tydligt, skumtussen snurrar över kinden, borta | ⚠ `skrubb` saknas | fnissig |
| [18a](frames/18a.jpg) | 1:59.2 | 8.8 s | Badkaret, närbild huvudet | *"Nu är du alldeles ren. Kan du blåsa en bubbla?"* (1:59.5) | Alldeles ren. Efter frågan: paus 4 s, munnen blir ett O och en liten bubbla börjar | tyst i pausen | stolt → munnen O |
| [18b](frames/18b.jpg) | 2:08.0 | 1.6 s | Samma | *"Fff … plopp!"* (2:08.0) | Fff …: bubblan växer stor framför trynet | blås (⚠ `bubbel` saknas, Malins "Fff" bär) | munnen O |
| [18c](frames/18c.jpg) | 2:09.6 | 2.4 s | Samma | – | … plopp! Bubblan spricker i små droppar. **Shorten slutar här** | plopp, fnissigt nöff (`noff-glad-2`) | jätteglad |
| [19](frames/19.jpg) | 2:12.0 | 5.3 s | Badkaret, helbild | *"Hej då, grisen! Hej då, ankan!"* (2:12.3) | Huvudet ovanför kanten och ankan bredvid, öronen vippar | glatt nöff, pip | jätteglad |
| [20](frames/20.jpg) | 2:17.3 | 2.5 s | Badkaret → kritirisen | – | Kritirisen drar ihop sig runt grisen och ankan | mattan klingar ut | glad |
| [21](frames/21.jpg) | 2:19.8 | 10.0 s | Outro (fast) | – | Formatets outro. ⚠ Platshållare | outrojingeln | – |
<!-- /tabell -->
