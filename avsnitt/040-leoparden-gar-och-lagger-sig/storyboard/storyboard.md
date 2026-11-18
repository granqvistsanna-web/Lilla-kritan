# 040 Leoparden går och lägger sig – storyboard

**Längd:** 3:46.0 med introt (räknat av bygg.mjs ur raderna).

Stillbilderna ritas ur `scen.html` (`?rad=14` visar en), raderna och tiderna står i `rader.mjs`. Bygg från repots rot:

```bash
node avsnitt/040-leoparden-gar-och-lagger-sig/storyboard/bygg.mjs --animatik
```

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Leoparden, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 3.3 s | Intro (fast) | – | Julintrot *Djuren hittar på!* (`produktion/youtube/bilderbok-intro-jul/`). Platshållare i storyboarden | introts eget | – |
| [01a](frames/01a.jpg) | 0:03.3 | 7.0 s | Papperet, helbild | *"Kritan ritar …"* (0:03.9) | Kritan ritar adventsstjärnans kontur i lugna drag, uddarna ett i taget och snöret sist | kritan ritar | – |
| [01b](frames/01b.jpg) | 0:10.3 | 5.7 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:10.3) | Konturen klar, kritan väntar bredvid och svajar: barnet gissar | tyst | – |
| [01c](frames/01c.jpg) | 0:16.0 | 4.3 s | Papperet → zoom in | *"Oj! En adventsstjärna!"* (0:16.6) | Stjärnan fylls i inifrån och tänds mjukt. Sista 0,8 s: zoom in i teckningen, till badrummet | `glitter` | – |
| [1](frames/1.jpg) | 0:20.3 | 8.1 s | Badrummet, helbild | *"Hej, leoparden! Hej, hej!"* (0:22.3) … *"Leoparden säger hej!"* (0:25.4) | Leoparden kommer in bakom handfatet från höger och vinkar (armen bakom kroppen). Julhandduken och grankvisten med kulan | `tass` ×3, `spinn-hej` | jätteglad |
| [2](frames/2.jpg) | 0:28.4 | 7.5 s | Halvbild, grankvisten | *"Det är kväll nu. Och snart är det jul!"* (0:28.8) … *"Åh, vad kul det ska bli!"* (0:32.0) | Kulan på grankvisten glimmar, leoparden tittar upp mot den | `glimt`, förtjust (2) | glad, tittar upp |
| [3](frames/3.jpg) | 0:35.9 | 4.2 s | Halvbild | *"Nu gör vi oss i ordning för att sova."* (0:36.2) | Leoparden **nickar** | – | glad |
| [4](frames/4.jpg) | 0:40.1 | 5.2 s | Närbild, tassarna under kranen | *"Först tvättar vi tassarna. Plask, plask!"* (0:41.1) | Vattnet rinner (i kod), tassarna framför kroppen under strålen, små stänk på *"Plask, plask!"* | `kran`, `plask` ×2 | glad |
| [5](frames/5.jpg) | 0:45.3 | 3.9 s | Halvbild | *"Rena tassar!"* (0:45.9) | Leoparden lyfter tassarna, en glimt på dem | `glimt`, förtjust (2) | jätteglad |
| [6](frames/6.jpg) | 0:49.2 | 3.3 s | Närbild, kroken | *"Nu tar vi på pyjamasen."* (0:49.6) | Pyjamasskjortan hänger på kroken bredvid julhandduken och gungar lite | `prassel-tyg` | – |
| [7](frames/7.jpg) | 0:52.5 | 8.0 s | Halvbild | *"Oj! Var är leoparden?"* (0:55.1) | Skjortan lyfter i en båge upp över leoparden och faller ner över huvudet. Frågan när ansiktet är dolt, sedan paus 3 s (skjortan gungar) | `klad-sus`, `puff` | dolt |
| [8](frames/8.jpg) | 1:00.5 | 3.3 s | Halvbild | *"Tittut!"* (1:00.7) | Leoparden hoppar ur skjortan på *"Tittut!"*: bålen snäpper på plats, öronen ploppar upp, landar mjukt | `hopp-mjuk`, `spinn-fniss` | jätteglad |
| [9](frames/9.jpg) | 1:03.9 | 4.0 s | Halvbild | *"Ena armen … och andra armen!"* (1:04.2) | Ärmarna glider ner över armarna, en i taget på orden | `klad-sus` ×2 | glad |
| [10](frames/10.jpg) | 1:07.9 | 4.3 s | Halvbild | *"Vilken fin pyjamas!"* (1:08.3) | Leoparden i pyjamas, svansen vippar | mysig suck (4) | glad |
| [11](frames/11.jpg) | 1:12.2 | 4.8 s | Närbild, bålen | *"Titta, stjärnor! En, två, tre!"* (1:12.5) | Tre stjärnor på skjortan glimmar en i taget på *"En, två, tre!"* | `glimt` ×3 | – |
| [12](frames/12.jpg) | 1:17.0 | 5.1 s | Ansiktsbild | *"Tycker du om stjärnor?"* (1:17.3) | Leoparden tittar ner på stjärnorna och sedan ut mot barnet. Paus 3 s: barnet svarar | `spinn-fniss` | glad |
| [13](frames/13.jpg) | 1:22.2 | 3.4 s | Närbild, borsten | *"Nu borstar vi tänderna."* (1:22.8) | Julborsten glider från muggen till tassen, närbild på *"borstar"* | `glimt` | – |
| [14](frames/14.jpg) | 1:25.5 | 3.8 s | Ansiktsbild | *"Leoparden gapar …"* (1:26.3) | Leoparden gapar: båda tandraderna syns. Malin efter gapet | `plopp` lågt | gap |
| [15](frames/15.jpg) | 1:29.3 | 3.7 s | Närbild, munnen | *"Borsta, borsta … rent!"* (1:29.6) | Borsten uppe, tänderna uppe blir blanka på *"rent!"* | `skrubb`, `glimt` | gap |
| [16](frames/16.jpg) | 1:32.9 | 2.9 s | Närbild, munnen | *"Borsta, borsta …"* (1:33.2) | Borsten börjar nere … och leoparden stänger munnen och tar ner borsten | `skrubb`, tvärt slut | gap → nöjd |
| [17](frames/17.jpg) | 1:35.8 | 3.8 s | Ansiktsbild | *"Är du redan klar?"* (1:36.1) | Leoparden ler nöjt med munnen stängd, borsten nere. **Nickar** | förtjust (2) | glad |
| [18](frames/18.jpg) | 1:39.6 | 4.2 s | Närbild, munnen | *"Nej, lite till. Du har inte borstat där nere."* (1:39.9) | Gapar igen, de nedre tänderna matta, borsten nere | `skrubb` | gap |
| [19](frames/19.jpg) | 1:43.8 | 3.6 s | Närbild, munnen | *"Sådär, ja! Vad bra!"* (1:44.0) | De nedre tänderna blir blanka, en stor glimt | `tindra` | gap |
| [20](frames/20.jpg) | 1:47.4 | 4.5 s | Ansiktsbild | *"Vilka rena tänder!"* (1:47.7) | Tandleendet (`flinar`) | fniss (3) | visar tänderna |
| [21](frames/21.jpg) | 1:51.9 | 4.3 s | Halvbild | *"Och sist lite vatten."* (1:52.3) | Muggen glider upp till munnen, två klunkar | `klunk` ×2 | blundar nöjt |
| [22](frames/22.jpg) | 1:56.2 | 4.1 s | Halvbild | *"Mmm … gott!"* (1:56.7) | Muggen tillbaka, leoparden sluter ögonen nöjt | mysig suck (4) | nöjd |
| [23](frames/23.jpg) | 2:00.2 | 4.0 s | Halvbild | *"Är du trött nu?"* (2:01.6) | Leoparden gäspar, Malin frågar efter gäspningen | `gaspning` | sömnig |
| [24](frames/24.jpg) | 2:04.3 | 4.2 s | Badrummet, helbild → kritsvep | *"Då går vi och lägger oss!"* (2:04.6) | Leoparden går ut till höger, kritsvep | `tass`, kritsvep | glad |
| [25](frames/25.jpg) | 2:08.4 | 7.6 s | Julsovrummet, helbild → närbild nallen | *"Titta, nallen! Nallen har en tomteluva. Vad fint!"* (2:10.0) | Kvällsljus: lampan lyser, ljusen i ljusstaken, snö i fönstret. Leoparden kommer in. Klipp till nallen med tomteluvan på *"nallen"* | `tass`, förtjust (2) | glad |
| [26](frames/26.jpg) | 2:16.0 | 5.8 s | Fönstret och leoparden | *"Åh, det snöar ute. Så mycket snö!"* (2:16.5) | Leoparden tittar mot fönstret, snön faller tätare en stund | nyfiken (5) | nyfiken |
| [27](frames/27.jpg) | 2:21.9 | 3.6 s | Julsovrummet, helbild | *"Upp i sängen!"* (2:22.2) | Leoparden hoppar upp bakom sängen, nallen glider upp bredvid kudden | `hopp-mjuk`, `puff`, `nalle-hopp` | jätteglad |
| [28](frames/28.jpg) | 2:25.4 | 5.3 s | Halvbild | *"Leoparden kramar nallen. Mysigt!"* (2:25.8) | Leoparden lutar sig mot nallen och sluter ögonen | mysig suck (4) | mysig, blundar |
| [29](frames/29.jpg) | 2:30.8 | 2.9 s | Närbild, lampan | *"Nu släcker vi lampan."* (2:31.1) | Lampan på nattduksbordet, ljusstaken bredvid | – | – |
| [30](frames/30.jpg) | 2:33.6 | 5.3 s | Halvbild | *"Oj då. Leoparden vill inte släcka julljusen."* (2:33.9) | Leoparden **skakar på huvudet** och tittar mot ljusstaken | trumpen (6) | trumpen |
| [31](frames/31.jpg) | 2:38.9 | 3.7 s | Närbild, ljusstaken | *"Julljusen är så fina."* (2:39.3) | Fyra ljus i ljusstaken, lågorna fladdrar | `glimt` | – |
| [32](frames/32.jpg) | 2:42.5 | 3.6 s | Ansiktsbild | *"Hm … vad gör vi nu?"* (2:42.9) | Leoparden tittar ner, öronen faller | trumpen (6) | ledsen |
| [33a](frames/33a.jpg) | 2:46.2 | 6.2 s | Fönstret och leoparden | *"Titta! Kritan ritar något."* (2:46.5) | Kritan ritar stjärnans kontur i fönstret | kritan ritar | nyfiken |
| [33b](frames/33b.jpg) | 2:52.3 | 4.0 s | Samma | – | Gisspaus 4 s: konturen klar, kritan svajar bredvid | tyst | nyfiken |
| [34](frames/34.jpg) | 2:56.3 | 4.9 s | Närbild, stjärnan | *"En stjärna! Den får lysa hela natten."* (2:56.7) | Stjärnan fylls i och tänds mjukt, ett varmt sken växer ut | `glitter`, `pling` | – |
| [35](frames/35.jpg) | 3:01.3 | 5.9 s | Halvbild | *"Leoparden blir så glad!"* (3:01.9) … *"Varsågod, leoparden."* (3:04.2) | Leoparden ser stjärnan: kawaii-ögon, öronen reser sig, ett litet skutt | förtjust (2) | kawaii |
| [36](frames/36.jpg) | 3:07.1 | 3.2 s | Halvbild | *"Tack, kritan!"* (3:07.4) | Leoparden **nickar** mot stjärnan | förtjust (2) | glad |
| [37](frames/37.jpg) | 3:10.3 | 5.8 s | Närbild, ljusstaken och leoparden | *"Nu kan leoparden blåsa ut ljusen. Fff …"* (3:10.6) | Leoparden lutar sig mot ljusstaken och blåser: lågorna slocknar en i taget med en liten rökpuff | `puff` ×4 | blåser |
| [38](frames/38.jpg) | 3:16.1 | 5.6 s | Halvbild | *"God natt, lampan. God natt, nallen. God natt, snön."* (3:16.4) | Lampan släcks på *"lampan"*, nallen blundar på *"nallen"*, snön faller lugnt. Rummet blir varmt blått | `lampa-klick` | sömnig |
| [39](frames/39.jpg) | 3:21.7 | 4.6 s | Halvbild, mörkt rum | *"Stjärnan lyser så fint."* (3:22.3) | Bara stjärnan lyser, skenet dämpas och växer | `tindra` | sömnig |
| [40](frames/40.jpg) | 3:26.3 | 4.3 s | Ansiktsbild | *"Leoparden är så trött."* (3:27.5) | Leoparden gäspar stort | `gaspning` | sömnig, gäspar |
| [41](frames/41.jpg) | 3:30.6 | 4.8 s | Halvbild | *"Hej då, leoparden! Hej då, nallen!"* (3:31.0) | Leoparden vinkar sömnigt (armen bakom kroppen) | `spinn-hejda` | sömnig |
| [42](frames/42.jpg) | 3:35.4 | 8.1 s | Halvbild | *"Hej då! Vi ses snart!"* (3:38.8) | Somnar C: ett litet hopp och landar liggande i pyjamas med huvudet på kudden, nallen bredvid, zzz. Malin när den ligger | `hopp-mjuk`, `snark-pip`, `godnatt-pling` | sover |
| [43](frames/43.jpg) | 3:43.5 | 2.5 s | Kritirisen | – | Kritirisen drar ihop sig runt leoparden och stjärnan | mattan klingar ut | sover |
<!-- /tabell -->
