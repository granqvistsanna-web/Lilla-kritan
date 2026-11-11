# 029 Leoparden plockar äpplen – storyboard

**Status:** första storyboarden 2026-11-11, byggd ur `../manus.md` (godkänt av Sanna). Förlaga: 023.

**Längd:** 2:39.1 (bilderbok-introt 3.3 s + scenen 2:35.8), räknat av bygg.mjs ur raderna.

Stillbilderna tas ur själva kodscenen (`../scener/appeltradet/index.html`), så storyboard, animatik och film är samma bild. Raderna (tider, repliker, ljud) står i `rader.mjs`.

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/029-leoparden-plockar-applen/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/029-leoparden-plockar-applen/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Avsteg och val

- **Introt** är det gemensamma introt (`produktion/youtube/bilderbok-intro/`, kortet säger nu "Vad ska vi göra?"). Scenen öppnar på rent papper, inget kritsvep.
- **Leoparden** är Lovas v2-rigg med tunna kanter (`premium/cut-tunn/`).
- **Korgen** är `korg-v3-tunn.png` (kanten 1 % av höjden, det vita hålet under handtaget urklippt). Äpplena är `applet-rott-v3-tunn.png`, ansiktet ritas inte.
- **Vips:** posen `strack`, äpplet lossnar på *"Vips"* och landar på *"korgen"*. Leoparden tar aldrig i äpplena.
- **Tittut:** leoparden är bakom kronan; bara huvudet och öronen (klippta i en ellips) kommer fram vid kronans kant.

- **Malin** är tagning a, längderna uppmätta (`../rost-langder.txt`), orden (vips, korgen) med whisper + silencedetect i `MATT`.
- **Tack-scenen** (Sanna 2026-11-11): paus 2,5 s efter *"Ska vi säga tack?"*, nicken på *"Tack!"*, ingen luft efter *"Varsågod"* (rad 5b utan GLES).
- **Glad leopard** (Sanna 021–024): ett litet lugnt hopp på förtjust- och hej-spinnet, skratt (fnissig, lugn skakning ±3°) på varje fniss. Äpplet landar på huvudet innan Malin säger det (rad 7).
- **Gisspausen** efter kritans kontur i halvbild, inte nära bild.

## Bilderna

- **Plattan** är v2 utan träd (`assets/bakgrunder/appeltradet/appeltradet-v2.jpeg`) och **trädet** det breda utan äpplen (`appeltradet-saker/cut/appeltrad-bred.png`); äpplena läggs i kod. Sanna har inte valt än, sökvägarna blir desamma.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Leoparden, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [01a](frames/01a.jpg) | 0:03.3 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:04.3) | Rent papper (efter bilderbok-introt). Kritan kommer in och ritar leopardens kontur i lugna drag, halvvägs här | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:09.3 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:09.3) | Konturen ritas klar (armarna ett drag var, fläckarna sist), kritan väntar bredvid och vajar: barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:16.8 | 3.8 s | Papperet → zoom in | *"Oj! En leopard!"* (0:17.4) | Den riktiga leoparden fylls i inifrån. Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:20.6 | 6.7 s | Äppelträdet, helbild | *"Hej, leoparden! Hej, hej!"* (0:23.0) | Leoparden trippar in från vänster (riggens gång), stannar till vänster om stammen och vinkar. **Hej med vinkning** | små steg, glatt spinn | jätteglad |
| [2](frames/2.jpg) | 0:27.3 | 4.7 s | Halvbild | *"Titta, så många äpplen!"* (0:27.9) | Leoparden tittar upp i kronan full av röda äpplen, öronen vippar | förtjust spinn | nyfiken → glad |
| [3](frames/3.jpg) | 0:32.0 | 6.2 s | Helbild | *"Oj då. Äpplet rullar iväg!"* (0:33.3) | Ett äpple lossnar, landar i gräset med en liten studs och rullar ut ur bild åt vänster | `apple-studs`, `rull`, frågande spinn | förvånad |
| [4](frames/4.jpg) | 0:38.2 | 7.2 s | Närbild, leoparden | *"Äpplena rullar visst iväg."* (0:38.8) … *"Hm … vad gör vi nu?"* (0:41.5) | Ett äpple till rullar förbi i gräset, leoparden tittar efter det, öronen faller. Paus 1 s mellan replikerna | `rull`, trumpet spinn | trumpen |
| [5a](frames/5a.jpg) | 0:45.3 | 10.7 s | Helbild → närbild där korgen ritas | *"Titta! Kritan ritar något."* (0:45.6) | Kritan kommer in och ritar korgens kontur i gräset framför leoparden (4 s, nära bild), sedan halvbild medan kritan väntar: gisspaus 3 s | kritan ritar | nyfiken |
| [5b](frames/5b.jpg) | 0:56.1 | 3.6 s | Samma → halvbild | *"En korg! Varsågod, leoparden."* (0:56.2) | Den riktiga korgen fylls i inifrån, kritan flyger iväg. *Varsågod* | glitter | förvånad |
| [6](frames/6.jpg) | 0:59.7 | 6.5 s | Halvbild | *"Ska vi säga tack?"* (1:00.0) … *"Tack!"* (1:03.7) | Leoparden tittar på korgen, öronen reser sig. Paus 2,5 s: barnet säger tack. På *Tack!* nickar leoparden | nyfiket spinn, sedan förtjust spinn | nyfiken → jätteglad |
| [7](frames/7.jpg) | 1:06.2 | 5.3 s | Halvbild | *"Oj! Ett äpple på huvudet …"* (1:07.6) | Ett äpple lossnar och landar mjukt på huvudet. Leoparden blundar och fnissar. **Leken (äpplet på huvudet)** | `apple-studs`, fniss | förvånad → fnissig (blundar) |
| [8](frames/8.jpg) | 1:11.5 | 4.3 s | Samma | *"… och i korgen! Ha ha!"* (1:11.7) | Äpplet studsar från huvudet ner i korgen på *"korgen"* | `korg`, `spinn-fniss` | fnissig |
| [9](frames/9.jpg) | 1:15.8 | 4.0 s | Halvbild | *"Ska du plocka äpplen nu?"* (1:16.1) | Leoparden tittar upp i kronan och nickar. **Shorten börjar här** | förtjust spinn | glad |
| [10](frames/10.jpg) | 1:19.7 | 6.1 s | Halvbild | *"Först ett äpple. Vips … i korgen!"* (1:20.3) | Leoparden sträcker på sig. På *"Vips"* lossnar ett äpple och glider i en mjuk båge, på *"i korgen!"* landar det i korgen | `swoosh`, `apple-studs`, fniss | glad → fnissig |
| [11](frames/11.jpg) | 1:25.8 | 5.8 s | Samma | *"Och ett till. Vips … i korgen!"* (1:26.4) | Samma, ett äpple till | `swoosh`, `apple-studs`, fniss | fnissig |
| [12](frames/12.jpg) | 1:31.6 | 7.1 s | Halvbild | *"Oj, ett äpple är kvar. Leoparden vet inte var."* (1:31.9) | Leoparden tittar åt vänster, sedan åt höger (ögonen och ansiktet) | frågande spinn | nyfiken |
| [13](frames/13.jpg) | 1:38.6 | 9.7 s | Närbild stammen (klipp) | *"Kan du hjälpa leoparden? Kan du se var äpplet är?"* (1:38.9) | En röd kant sticker fram bakom stammen, nere i gräset. Paus 5 s; efter ca 3 s skimrar den svagt | tyst | – |
| [14](frames/14.jpg) | 1:48.3 | 4.9 s | Samma | *"Ja, där! Ja, bakom trädet!"* (1:48.3) | Äpplet skimrar tydligt | förtjust spinn, `tindra` | jätteglad |
| [15](frames/15.jpg) | 1:53.3 | 4.1 s | Halvbild | *"Vips … i korgen!"* (1:53.5) | Äpplet glider fram bakom stammen på *"Vips"* och landar i korgen på *"korgen"* | `swoosh`, `apple-studs`, fniss | jätteglad |
| [16](frames/16.jpg) | 1:57.4 | 4.0 s | Halvbild | *"Nu är korgen full!"* (1:57.7) | Korgen full av äpplen, den skimrar. Leoparden stolt | `tindra`, förtjust spinn | stolt |
| [17](frames/17.jpg) | 2:01.4 | 5.7 s | Helbild | *"Oj! Nu klättrar leoparden upp i trädet!"* (2:01.7) | Leoparden klättrar upp bakom stammen med lugna skutt och försvinner bakom kronan | `prassel-lov`, `spinn-fniss` | jätteglad |
| [18](frames/18.jpg) | 2:07.1 | 6.3 s | Närbild kronan | *"Var är leoparden?"* (2:07.4) | Kronan prasslar och gungar lite. Paus 4 s: barnet letar | `prassel-buske`, tyst | – |
| [19](frames/19.jpg) | 2:13.4 | 3.4 s | Samma | *"Tittut!"* (2:13.6) | På *"Tittut!"* kommer huvudet och öronen fram vid kronans vänstra kant. **Leken (tittut i trädet)** | långt fniss | jätteglad |
| [20](frames/20.jpg) | 2:16.8 | 8.1 s | Samma | *"Var är leoparden?"* (2:17.1) … *"Tittut!"* (2:21.2) | Huvudet gömmer sig, kronan prasslar. På *"Tittut!"* kommer huvudet fram på andra sidan. **Shorten slutar här** | `prassel-buske`, `spinn-fniss` | jätteglad |
| [21](frames/21.jpg) | 2:24.9 | 6.8 s | Helbild | *"Hej då, leoparden! Hej då, korgen!"* (2:26.8) | Leoparden klättrar ner bakom stammen, landar bakom korgen och vinkar (armen bakom kroppen). **Hej då med vinkning** | hej då-spinn | jätteglad |
| [22](frames/22.jpg) | 2:31.7 | 4.9 s | Samma | *"Hej då! Vi ses snart!"* (2:32.0) | Leoparden vinkar klart, armen sjunker | fniss | glad |
| [23](frames/23.jpg) | 2:36.6 | 2.5 s | Äppelträdet → kritirisen | – | Kritirisen drar ihop sig runt leoparden och korgen | – | glad |
<!-- /tabell -->
