# 027 Zebran plockar undan – storyboard

Grind 5 (animatik) i [`format/bilderbok.md`](../../../format/bilderbok.md). Manuset: [`../manus.md`](../manus.md) (godkänt av Sanna 2026-11-11).

**Längd:** 2:59.9 med bilderbok-introt (3.31 s), utan outro (räknat av bygg.mjs ur raderna).

- `rader.mjs` – en rad per uppslag (01 och 5 är delade). Scenen och storyboarden läser samma rader.
- `bygg.mjs` – stillbilderna tas ur kodscenen (`../scener/sovrummet/index.html`) på `still` sekunder in i raden; `--animatik` gör `animatik.mp4`.
- `index.html` – alla bilder i rad, med repliker och ljud.

## Platshållare och vad som är uppmätt

- **Sovrummet** (`assets/bakgrunder/sovrummet/sovrummet-v1.jpeg`) och **sängen** (`assets/rekvisita/sangen/cut/sangen.png`) ritas i kod tills filerna finns; måtten står i `../../026-zebran-gar-och-lagger-sig/scener/sovrummet/rum.js` (`FONSTER`, `LAMPA`, `BED`). Leksakerna och korgen finns redan.
- **Malins repliker** (tagning b, 2026-11-11): längderna i `ROST` är uppmätta (`../rost-langder.txt`), ordtiderna i `ORD` mätta med whisper-cli och silencedetect. Sanna har inte lyssnat än.
- **Zebrans röst:** `gnagg-gullig-N` (tagning 1 per känsla) och `gnagg-fniss-1` tills Sanna väljer mellan N och Nb.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Zebran, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 3.3 s | Intro | – | Det gemensamma bilderbok-introt ("bilderbok!" på papperskortet), tonar till samma papper som scenen | introts jingel | – |
| [01a](frames/01a.jpg) | 0:03.3 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:06.2) | Kritan kommer in och ritar zebrans kontur i lugna drag (7 s): kroppen med manen, öronen, mulen | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:09.3 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:09.3) | Konturen ritas klar (armarna ett drag var, benen, svansen, leendet, ränderna sist), sedan väntar kritan bredvid och vajar: barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:16.8 | 4.4 s | Papperet, helbild → zoom in | *"Oj! En zebra!"* (0:17.7) | Den riktiga zebran fylls i inifrån. Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:21.2 | 5.6 s | Sovrummet på dagen, helbild | *"Hej, zebran! Hej, hej!"* (0:22.8) | Zebran går in från höger bakom sängen (riggens gång), stannar mitt bakom sängen och vinkar. Leksakerna ligger på golvet. **Hej med vinkning** | `trav`, glatt gnägg | jätteglad |
| [2](frames/2.jpg) | 0:26.8 | 5.8 s | Golvet, helbild | *"Oj, oj, oj! Vad mycket leksaker!"* (0:27.1) | Nallen, bilen, ankan, båten och hinken ligger huller om buller framför sängen. Zebran tittar ner på dem | fniss | fnissig |
| [3](frames/3.jpg) | 0:32.6 | 5.5 s | Halvbild | *"Nu ska du väl plocka undan?"* (0:32.9) | Zebran skakar på huvudet: ägget lutar ±6° tre gånger | trumpet frust | trumpen |
| [4](frames/4.jpg) | 0:38.1 | 9.0 s | Närbild zebran | *"Oj då. Zebran vill visst inte plocka undan."* (0:38.4) … *"Hm … vad gör vi nu?"* (0:43.0) | Zebran vänder bort huvudet (riktningsposen åt vänster), öronen faller. Paus 1 s mellan replikerna | trumpet frust | trumpen, tittar bort |
| [5a](frames/5a.jpg) | 0:47.1 | 8.7 s | Halvbild → närbild golvet bredvid sängen | *"Titta! Kritan ritar något."* (0:48.5) | Kritan kommer in och ritar korgens kontur på golvet till vänster om sängen (4 s), väntar sedan bredvid och vajar: gisspaus 3 s | kritan ritar | nyfiken |
| [5b](frames/5b.jpg) | 0:55.8 | 5.0 s | Samma → golvet och korgen | *"En korg! Varsågod, zebran."* (0:56.3) | Den riktiga korgen fylls i inifrån. *Varsågod* | glitter | förvånad |
| [6](frames/6.jpg) | 1:00.7 | 6.8 s | Golvet och korgen | *"Ska vi säga tack?"* (1:00.9) … *"Tack!"* (1:04.7) | Zebran tittar på korgen, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar zebran | nyfiket gnägg, sedan förtjust gnägg | nyfiken → jätteglad |
| [7](frames/7.jpg) | 1:07.6 | 6.2 s | Golvet och korgen | *"Oj! Nallen hoppade i korgen!"* (1:09.0) | Nallen gör ett lugnt skutt från golvet ner i korgen | `nalle-hopp`, fniss | förvånad → fnissig |
| [8](frames/8.jpg) | 1:13.8 | 8.2 s | Närbild korgen | *"Ha ha! Nallen vill också hjälpa till."* (1:14.6) | Nallen tittar upp över korgens kant (ögonen i kod) | långt fniss | – |
| [9](frames/9.jpg) | 1:21.9 | 4.1 s | Halvbild | *"Ska du plocka undan nu?"* (1:22.2) | Zebran tittar på leksakerna och nickar | förtjust gnägg | jätteglad |
| [10](frames/10.jpg) | 1:26.0 | 8.9 s | Golvet och korgen | *"Först bilen och ankan. Ett, två … i korgen!"* (1:26.3) | Bilen lyfter på *"ett"*, ankan på *"två"*, båda glider i en mjuk båge och landar i korgen på *"i korgen!"*. **Shorten börjar här** | `badanka-pip`, `dunk`, fniss | glad |
| [11](frames/11.jpg) | 1:34.8 | 9.0 s | Samma | *"Och båten och hinken. Ett, två … i korgen!"* (1:35.1) | Samma med båten och hinken | `dunk`, fniss | glad |
| [12](frames/12.jpg) | 1:43.8 | 6.8 s | Halvbild | *"Oj, bollen då? Zebran vet inte var."* (1:44.1) | Zebran tittar åt vänster, sedan åt höger (ögonen och ansiktet, huvudet vänds inte) | frågande gnägg | nyfiken |
| [13](frames/13.jpg) | 1:50.6 | 10.1 s | Närbild under sängen (klipp) | *"Kan du hjälpa zebran? Kan du se var bollen är?"* (1:50.9) | En röd bit med gul rand mellan sängbenen. Paus 5 s; efter ca 3 s skimrar den svagt | tyst | – |
| [14](frames/14.jpg) | 2:00.7 | 6.2 s | Samma | *"Ja, där! Ja, under sängen!"* (2:01.0) | Bollen skimrar tydligt och rullar fram ur sängen | förtjust gnägg, `tindra`, `rull` | – |
| [15](frames/15.jpg) | 2:06.9 | 7.0 s | Sovrummet, helbild | *"Ska vi leka lite? Rulla, rulla … till dig!"* (2:07.2) | Bollen rullar mot tittaren, växer och åker ut nedtill i bild. Kameran står still. **Leken (rulla bollen)** | `rull`, förtjust gnägg | jätteglad |
| [16](frames/16.jpg) | 2:13.9 | 10.7 s | Samma, tomt golv | *"Kan du rulla tillbaka?"* (2:14.2) … *"Rulla, rulla … till zebran!"* (2:19.5) | Paus 4 s: barnet rullar tillbaka. Bollen rullar in nedifrån, blir mindre och stannar framför zebran | `rull`, fniss | nyfiken → fnissig |
| [17](frames/17.jpg) | 2:24.6 | 7.7 s | Samma | *"Till dig … och tillbaka!"* (2:25.4) | En gång till: ut och in igen | `rull`, långt fniss | jätteglad |
| [18](frames/18.jpg) | 2:32.3 | 8.4 s | Golvet och korgen | *"Nu bollen. Ett, två … i korgen!"* (2:32.6) | Bollen studsar två gånger (*"ett, två"*) och landar i korgen på *"i korgen!"*. **Shorten slutar här** | `studs` ×2, `dunk` | glad |
| [19](frames/19.jpg) | 2:40.6 | 5.3 s | Sovrummet, helbild | *"Nu är det alldeles städat!"* (2:42.0) | Städat golv, korgen full. Zebran klappar tre lugna klapp (riggens klapp) | tre `tass-klapp`, förtjust gnägg | jätteglad |
| [20](frames/20.jpg) | 2:46.0 | 5.6 s | Zebran och korgen | *"Hej då, zebran! Hej då, korgen!"* (2:46.7) | Zebran vinkar (armen bakom kroppen, snett ut förbi kanten), korgen bredvid. **Hej då med vinkning** | hej då-gnägg | jätteglad |
| [21](frames/21.jpg) | 2:51.6 | 5.8 s | Samma | *"Hej då! Vi ses snart!"* (2:51.9) | Zebran vinkar klart, armen sjunker | fniss | glad |
| [22](frames/22.jpg) | 2:57.4 | 2.5 s | Sovrummet → kritirisen | – | Kritirisen drar ihop sig runt zebran och korgen | – | glad |
<!-- /tabell -->
