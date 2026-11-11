# 026 Zebran går och lägger sig – storyboard

Grind 5 (animatik) i [`format/bilderbok.md`](../../../format/bilderbok.md). Manuset: [`../manus.md`](../manus.md) (godkänt av Sanna 2026-11-11).

**Längd:** 2:59.1 med bilderbok-introt (3.31 s), utan outro (räknat av bygg.mjs ur raderna).

- `rader.mjs` – en rad per uppslag (01 och 5 är delade, 18 är delad i frågan och gäspen). Scenen och storyboarden läser samma rader.
- `bygg.mjs` – stillbilderna tas ur kodscenen (`../scener/sovrummet/index.html`) på `still` sekunder in i raden; `--animatik` gör `animatik.mp4`.
- `index.html` – alla bilder i rad, med repliker och ljud.

## Platshållare och vad som är uppmätt

- **Sovrummet** (`assets/bakgrunder/sovrummet/sovrummet-v1.jpeg`), **sängen** (`assets/rekvisita/sangen/cut/sangen.png`) och **täcket** (`assets/rekvisita/tacket/cut/tacket.png`) ritas i kod tills filerna finns; måtten står i `../scener/sovrummet/rum.js` (`FONSTER`, `LAMPA`, `BED`, `TACKE_MATT`).
- **Malins repliker** (tagning b, 2026-11-11): längderna i `ROST` är uppmätta (`../rost-langder.txt`), ordtiderna i `ORD` mätta med whisper-cli och silencedetect. Sanna har inte lyssnat än.
- **Zebrans röst:** `gnagg-gullig-N` (tagning 1 per känsla) och `gnagg-fniss-1` tills Sanna väljer mellan N och Nb.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Zebran, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 3.3 s | Intro | – | Det gemensamma bilderbok-introt ("bilderbok!" på papperskortet), tonar till samma papper som scenen | introts jingel | – |
| [01a](frames/01a.jpg) | 0:03.3 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:06.2) | Kritan kommer in och ritar zebrans kontur i lugna drag (7 s): kroppen med manen, öronen, mulen | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:09.3 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:09.3) | Konturen ritas klar (armarna ett drag var, benen, leendet, ränderna sist), sedan väntar kritan bredvid och vajar: barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:16.8 | 4.6 s | Papperet, helbild → zoom in | *"Oj! En zebra!"* (0:17.7) | Den riktiga zebran fylls i inifrån. Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:21.4 | 5.9 s | Sovrummet, helbild, kvällsljus | *"Hej, zebran! Hej, hej!"* (0:23.0) | Lampan lyser. Zebran går in från höger på golvet framför sängen (riggens gång), stannar till höger framför sängen och vinkar. **Hej med vinkning** | `trav`, glatt gnägg | jätteglad |
| [2](frames/2.jpg) | 0:27.3 | 6.1 s | Fönstret och zebran | *"Det är kväll nu. Titta, månen!"* (0:27.7) | Månen i fönstret. Zebran tittar dit, öronen vippar | förtjust gnägg | nyfiken → glad |
| [3](frames/3.jpg) | 0:33.4 | 5.2 s | Sovrummet, helbild | *"Nu ska du väl gå och lägga dig?"* (0:33.7) | Sängen. Zebran skakar på huvudet: ägget lutar ±6° tre gånger | trumpet frust | trumpen |
| [4](frames/4.jpg) | 0:38.6 | 8.3 s | Närbild zebran | *"Oj då. Zebran vill visst inte lägga sig."* (0:38.9) … *"Hm … vad gör vi nu?"* (0:42.9) | Zebran vänder bort huvudet (riktningsposen åt vänster), öronen faller. Paus 1 s mellan replikerna | trumpet frust | trumpen, tittar bort |
| [5a](frames/5a.jpg) | 0:46.9 | 8.7 s | Halvbild → närbild sängens huvudända | *"Titta! Kritan ritar något."* (0:48.3) | Kritan kommer in och ritar kuddens kontur på sängens vänstra ände (4 s), väntar sedan bredvid och vajar: gisspaus 3 s | kritan ritar | nyfiken |
| [5b](frames/5b.jpg) | 0:55.6 | 4.8 s | Samma → halvbild | *"En kudde! Varsågod, zebran."* (0:56.1) | Den riktiga kudden fylls i inifrån. *Varsågod* | glitter | förvånad |
| [6](frames/6.jpg) | 1:00.4 | 6.5 s | Halvbild | *"Ska vi säga tack?"* (1:00.6) … *"Tack!"* (1:04.3) | Zebran tittar på kudden, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar zebran | nyfiket gnägg, sedan förtjust gnägg | nyfiken → jätteglad |
| [7](frames/7.jpg) | 1:06.9 | 7.8 s | Halvbild | *"Mmm … vilken mjuk kudde!"* (1:08.9) | Zebran hoppar lugnt upp i sängen (0,9 s). Kudden glider upp till zebrans kind, zebran blundar och myser, och kudden glider tillbaka | `hopp-mjuk`, `puff` (landar), `puff`, mysig suck | blundar, ler |
| [8](frames/8.jpg) | 1:14.8 | 7.7 s | Närbild zebran | *"Oj! Var är zebran?"* (1:15.8) | Täcket glider upp framför ansiktet så att ögonen täcks. Paus 4 s | `prassel-tyg`, ett litet gnägg under täcket | (under täcket) |
| [9](frames/9.jpg) | 1:22.5 | 3.8 s | Samma | *"Tittut!"* (1:22.8) | Täcket glider ner på *"Tittut!"*, zebran tittar fram | förtjust gnägg | fnissig |
| [10](frames/10.jpg) | 1:26.2 | 11.0 s | Samma | *"Var är zebran?"* (1:27.1) … *"Tittut!"* (1:31.1) | En gång till, kortare: upp, paus 2 s, ner på *"Tittut!"*. **Leken (tittut)** | `prassel-tyg`, långt fniss | fnissig |
| [11](frames/11.jpg) | 1:37.2 | 8.3 s | Halvbild | *"Oj, en gäspning! Är du trött nu?"* (1:38.5) | Zebran gäspar (munnen ett stort O, ögonen kniper ihop). **Shorten börjar här** | `gaspning`, sömnigt gnägg | sömnig, gäspar |
| [12](frames/12.jpg) | 1:45.5 | 7.8 s | Lampan och zebran | *"Först lampan. Gäsp … god natt!"* (1:45.9) | Zebran gäspar på *"Gäsp"*, lampan släcks på *"natt"*: skenet tonas bort på 0,4 s, rummet blir lite mörkare och varmt blått | `lampa-klick` | sömnig |
| [13](frames/13.jpg) | 1:53.3 | 7.5 s | Fönstret och zebran | *"Och månen. Gäsp … god natt!"* (1:53.7) | Zebran gäspar på *"Gäsp"*, månen lyser upp mjukt på *"natt"* | `glimt` | sömnig |
| [14](frames/14.jpg) | 2:00.8 | 6.8 s | Halvbild | *"Oj, nallen då? Zebran vet inte var."* (2:01.1) | Zebran tittar åt vänster, sedan åt höger (ögonen och ansiktet, huvudet vänds inte) | frågande gnägg | nyfiken |
| [15](frames/15.jpg) | 2:07.6 | 10.1 s | Närbild kudden (klipp) | *"Kan du hjälpa zebran? Kan du se var nallen är?"* (2:07.9) | Två bruna öron sticker upp bakom kudden. Paus 5 s; efter ca 3 s skimrar de svagt | tyst | – |
| [16](frames/16.jpg) | 2:17.7 | 6.0 s | Samma | *"Ja, där! Ja, bakom kudden!"* (2:18.0) | Öronen skimrar tydligt | förtjust gnägg, `tindra` | – |
| [17](frames/17.jpg) | 2:23.7 | 8.3 s | Halvbild | *"Gäsp … god natt!"* (2:25.9) | Nallen glider fram bakom kudden och sätter sig bredvid zebran. Zebran gäspar på *"Gäsp"* | `nalle-hopp`, mysig suck | sömnig, gäspar |
| [18a](frames/18a.jpg) | 2:32.0 | 6.3 s | Halvbild | *"Kan du också gäspa?"* (2:32.3) | Zebran tittar på barnet. Paus 4 s: barnet gäspar | tyst i pausen | sömnig |
| [18b](frames/18b.jpg) | 2:38.3 | 3.8 s | Samma | *"Gääsp …"* (2:38.3) | Zebran gäspar en gång till på *"Gääsp"*. **Leken (gäspa med). Shorten slutar här** | `gaspning`, fniss | gäspar → fnissig |
| [19](frames/19.jpg) | 2:42.1 | 6.2 s | Halvbild | *"Hej då, zebran! Hej då, kudden!"* (2:42.8) | Zebran vinkar sömnigt (armen bakom kroppen, snett ut förbi kanten). **Hej då med vinkning** | mjukt hej då-gnägg | sömnig, glad |
| [20](frames/20.jpg) | 2:48.3 | 8.3 s | Halvbild | *"Hej då! Vi ses snart!"* (2:50.9) | Zebran somnar (Somnar C): litet hopp, landar liggande på magen på kudden, täcket glider upp till hakan, zzz | `snark-pip`, `godnatt-pling` | sover |
| [21](frames/21.jpg) | 2:56.6 | 2.5 s | Sovrummet → kritirisen | – | Kritirisen drar ihop sig runt zebran och nallen | – | sover |
<!-- /tabell -->
