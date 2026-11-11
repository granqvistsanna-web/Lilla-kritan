# 028 Leoparden bygger i sanden – storyboard

**Status:** första storyboarden 2026-11-11, byggd ur `../manus.md` (godkänt av Sanna). Förlaga: 023.

**Längd:** 2:38.4 (bilderbok-introt 3.3 s + scenen 2:35.1), räknat av bygg.mjs ur raderna; ⚠ repliklängderna är uppskattade.

Stillbilderna tas ur själva kodscenen (`../scener/stranden/index.html`), så storyboard, animatik och film är samma bild. Raderna (tider, repliker, ljud) står i `rader.mjs`.

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/028-leoparden-bygger-i-sanden/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/028-leoparden-bygger-i-sanden/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Avsteg och val

- **Introt** är det gemensamma introt (`produktion/youtube/bilderbok-intro/`, kortet säger nu "Vad ska vi göra?"). Scenen öppnar på rent papper, inget kritsvep.
- **Leoparden** är Lovas v2-rigg med tunna kanter (`premium/cut-tunn/`, ca 1 % av höjden; originalen var ca 1,6 %).
- **Hinken och spaden** är tunna kopior (`hink-gul-tunn.png`, `spade-rod-tunn.png`, inbakad kant 1 % av höjden, koden lägger grunden 3 px).
- **Hinken som tippar** vrids 180° i bildplanet i en lugn båge (0,8 s) och landar upp och ner. Ser det ut som att den snurrar: låt den landa upp och ner direkt (manus, öppen punkt 3).
- **Klappen** är riggens klapp med två klapp (den tredje hoppas över) på Malins två "klapp".
- **Spaden** blir kvar bakom hinken efter sandkaka två (rad 11), därför syns bara skaftet i rad 12–13.
- **Malin** är tagning a, längderna uppmätta (`../rost-langder.txt`), orden (klapp, sandkaka, hopp, där, rasar) med whisper + silencedetect i `MATT`.
- **Tack-scenen** (Sanna 2026-11-11): paus 2,5 s efter *"Ska vi säga tack?"*, nicken på *"Tack!"*, ingen luft efter *"Varsågod"* (rad 5b utan GLES).
- **Glad leopard** (Sanna 021–024): ett litet lugnt hopp på förtjust- och hej-spinnet, skratt (fnissig, lugn skakning ±3°) på varje fniss. Leoparden hinner reagera innan Malin beskriver (rad 7–8).
- **Gisspausen** efter kritans kontur i halvbild, inte nära bild.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Leoparden, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [01a](frames/01a.jpg) | 0:03.3 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:04.3) | Rent papper (efter bilderbok-introt). Kritan kommer in och ritar leopardens kontur i lugna drag, halvvägs här | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:09.3 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:09.3) | Konturen ritas klar (armarna ett drag var, fläckarna sist), kritan väntar bredvid och vajar: barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:16.8 | 3.2 s | Papperet → zoom in | *"Oj! En leopard!"* (0:17.4) | Den riktiga leoparden fylls i inifrån. Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:20.0 | 7.0 s | Stranden, helbild | *"Hej, leoparden! Hej, hej!"* (0:22.4) | Leoparden trippar in från vänster (riggens gång) till sandvallen, stannar och vinkar. **Hej med vinkning** | små steg, glatt spinn | jätteglad |
| [2](frames/2.jpg) | 0:27.0 | 4.8 s | Stranden, halvbild | *"Ska du bygga i sanden?"* (0:27.6) | Leoparden sätter sig bakom sandvallen (bara överkroppen syns). Spaden står i sanden bredvid. Öronen vippar | förtjust spinn | glad |
| [3](frames/3.jpg) | 0:31.8 | 5.9 s | Närbild, sanden | *"Oj då. Sanden rasar!"* (0:33.6) | Spaden glider och lägger sand i en hög (två gånger). På *"rasar"* sjunker högen mjukt ihop och blir platt | `sand`, frågande spinn | nyfiken |
| [4](frames/4.jpg) | 0:37.7 | 7.3 s | Närbild, leoparden | *"Sanden vill visst inte stå."* (0:38.0) … *"Hm … vad gör vi nu?"* (0:41.3) | Leoparden tittar ner på den platta sanden, öronen faller (riktningspose åt vänster). Paus 1 s mellan replikerna | trumpet spinn | trumpen |
| [5a](frames/5a.jpg) | 0:45.0 | 10.5 s | Stranden → närbild där hinken ritas | *"Titta! Kritan ritar något."* (0:45.3) | Kritan kommer in och ritar hinkens kontur i sanden (4 s, nära bild), väntar sedan bredvid och vajar: gisspaus 3 s | kritan ritar | nyfiken |
| [5b](frames/5b.jpg) | 0:55.5 | 4.5 s | Samma → halvbild | *"En hink! Varsågod, leoparden."* (0:55.7) | Den riktiga gula hinken fylls i inifrån, kritan flyger iväg. *Varsågod* | glitter | förvånad |
| [6](frames/6.jpg) | 1:00.1 | 8.9 s | Stranden, halvbild | *"Ska vi säga tack?"* (1:00.4) … *"Tack!"* (1:05.9) | Leoparden tittar på hinken, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar leoparden | nyfiket spinn, sedan förtjust spinn | nyfiken → jätteglad |
| [7](frames/7.jpg) | 1:09.0 | 5.0 s | Stranden, halvbild | *"Oj! Hinken på huvudet!"* (1:10.0) | Hinken glider upp i en mjuk båge och landar upp och ner på huvudet, öronen sticker ut under kanten. **Leken (hinkhatten)** | `swoosh`, fniss | förvånad → fnissig |
| [8](frames/8.jpg) | 1:14.0 | 5.0 s | Samma | *"Ha ha! En hinkhatt!"* (1:15.0) | Hinken glider ner i sanden igen och står rätt | `hink-dunk`, långt fniss | fnissig |
| [9](frames/9.jpg) | 1:19.0 | 4.0 s | Samma | *"Ska vi bygga nu?"* (1:19.3) | Leoparden och hinken. **Shorten börjar här** | förtjust spinn | glad |
| [10](frames/10.jpg) | 1:23.0 | 7.0 s | Närbild, bygget | *"Först en sandkaka. Klapp, klapp … sandkaka!"* (1:24.3) | Spaden fyller hinken två gånger, hinken tippar i en lugn båge och landar upp och ner. Två klapp (riggens klapp), hinken guppar på varje. På *"sandkaka!"* lyfts hinken och sandkakan står kvar | `sand`, `klapp` ×2, `plupp`, fniss | glad → fnissig |
| [11](frames/11.jpg) | 1:30.0 | 7.0 s | Samma | *"Och en till. Klapp, klapp … sandkaka!"* (1:31.7) | Samma, sandkaka nummer två bredvid. Efteråt glider hinken tillbaka och spaden blir kvar bakom den | `sand`, `klapp` ×2, `plupp`, fniss | fnissig |
| [12](frames/12.jpg) | 1:37.0 | 5.9 s | Stranden, halvbild | *"Oj, spaden då? Leoparden vet inte var."* (1:37.3) | Leoparden tittar åt vänster, sedan åt höger (ögonen och ansiktet). Spaden är borta | frågande spinn | nyfiken |
| [13](frames/13.jpg) | 1:42.9 | 9.9 s | Närbild hinken (klipp) | *"Kan du hjälpa leoparden? Kan du se var spaden är?"* (1:43.2) | Spadens gula skaft sticker upp bakom hinken. Paus 5 s; efter ca 3 s skimrar skaftet svagt | tyst | – |
| [14](frames/14.jpg) | 1:52.8 | 4.5 s | Samma → halvbild | *"Ja, där! Ja, bakom hinken!"* (1:52.8) | Skaftet skimrar tydligt och spaden glider fram på *"där"* | förtjust spinn, `tindra` | jätteglad |
| [15](frames/15.jpg) | 1:57.3 | 7.0 s | Närbild, bygget | *"Klapp, klapp … sandkaka!"* (1:60.0) | Spaden fyller, hinken tippar, två klapp, hinken lyfts: sandkaka nummer tre | `sand`, `klapp` ×2, `plupp`, fniss | fnissig |
| [16](frames/16.jpg) | 2:04.3 | 4.2 s | Stranden, halvbild | *"Oj! Tre sandkakor!"* (2:04.6) | Tre sandkakor i rad, de skimrar till en i taget. Leoparden stolt | `tindra`, förtjust spinn | stolt |
| [17a](frames/17a.jpg) | 2:08.5 | 3.4 s | Stranden, helbild | – | Leoparden reser sig och trippar ner till strandkanten (riggens gång åt höger) | små steg | glad |
| [17b](frames/17b.jpg) | 2:11.9 | 5.0 s | Strandkanten, halvbild | *"Titta, små vågor! Hopp!"* (2:12.4) | En liten våg glider upp på sanden. På *"Hopp!"* ett lugnt skutt, och vågen glider tillbaka under leoparden. **Leken (hoppa över vågorna)** | `vagor`, `landa-mjuk`, fniss | jätteglad |
| [18](frames/18.jpg) | 2:16.9 | 9.2 s | Samma | *"Kan du också hoppa?"* (2:17.2) … *"Hopp!"* (2:22.9) | En våg till. Paus 4 s: barnet hoppar. På *"Hopp!"* hoppar leoparden. **Shorten slutar här** | `vagor`, `landa-mjuk`, långt fniss | jätteglad |
| [19](frames/19.jpg) | 2:26.1 | 5.3 s | Strandkanten, halvbild | *"Hej då, leoparden! Hej då, hinken!"* (2:26.4) | Leoparden vinkar (armen bakom kroppen, snett ut förbi kanten), sandkakorna och hinken bredvid. **Hej då med vinkning** | hej då-spinn | jätteglad |
| [20](frames/20.jpg) | 2:31.4 | 4.5 s | Samma | *"Hej då! Vi ses snart!"* (2:31.7) | Leoparden vinkar klart, armen sjunker | fniss | glad |
| [21](frames/21.jpg) | 2:35.9 | 2.5 s | Stranden → kritirisen | – | Kritirisen drar ihop sig runt leoparden | – | glad |
<!-- /tabell -->
