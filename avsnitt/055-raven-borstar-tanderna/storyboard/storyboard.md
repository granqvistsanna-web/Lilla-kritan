# 055 Räven borstar tänderna – storyboard (grind 5)

**Status:** första storyboarden och animatiken 2026-11-25, byggd ur `../manus.md` (grind 1–3 godkända: manus, saker, Malins röst).

**Längd:** 3:41.3 med det gemensamma introt (3,3 s), utan outro (räknat av bygg.mjs ur raderna).

**Malins repliker är inspelade** (tagning 1 2026-11-25, `../rost.txt`, `assets/ljud/roster/raven-borstar-tanderna/`): längderna i `rader.mjs` (`ROST`) är uppmätta, räkneorden (`RAKNA`) och *"plutt!"* (`PLUTT`) är tajmade ord för ord. Pauserna är manusets, och varje rad med en replik har 0,7 s extra luft (`GLES`), utom ritintrot. Rävens röst är `rav-gullig` 1–8d och `rav-fniss` (ljudkarta-sessionen 2026-11-25, ännu inte lyssnade av Sanna); tagningarna växlas så att samma ljud inte kommer två gånger i rad.

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/055-raven-borstar-tanderna/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/055-raven-borstar-tanderna/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Att veta före scenen (grind 6)

- **Rävens rigg har inget `gapar` och ingen `borstar`-pose** (katten, kaninen, pandan och grisen har dem, `verktyg/rigg-motor.js` borstDel). I storyboarden är gapet `flinar` med båda tandraderna och borsten ritad i scenen (⚠ i bilderna). Räven är låst (`✅ Referensark klart`) och 056 använder också räven, så gapar/borstar läggs till i `uttryck.html` först när Sanna säger ja.
- **Räven har ingen `cut-tunn/`** (kanten ca 1,5 %): `rigg_tunn.py` behövs före scenen.
- **Den lilla turkosa borsten mot den turkosa kakelväggen:** syns sämre i helbild; i muggen hjälper muggens färg.
- Introt är en platshållare (3,3 s) tills det gemensamma *Djuren hittar på!*-introt finns.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Räven, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 3.3 s | Intro | – | Det gemensamma introt *Djuren hittar på!* (produktion/youtube/bilderbok-intro/, ca 3,3 s). Platshållare i storyboarden | introts jingel och röst | – |
| [01a](frames/01a.jpg) | 0:03.3 | 3.4 s | Papperet, helbild | *"Kritan ritar …"* (0:03.8) | Kritan ritar en tandborstes kontur i ett lugnt drag (ca 2,8 s): skaftet, halsen, borstblocket | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:06.7 | 5.1 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:06.7) | Konturen klar, kritan väntar bredvid och svajar lugnt (ingen knackning): barnet gissar | skogsljud | – |
| [01c](frames/01c.jpg) | 0:11.8 | 4.3 s | Papperet → zoom in | *"Oj! En tandborste!"* (0:12.4) | Den riktiga turkosa tandborsten fylls i inifrån. Sista 0,8 s: zoom in i teckningen, in i badrummet | glitter | – |
| [1](frames/1.jpg) | 0:16.1 | 7.4 s | Badrummet, helbild | *"Hej, räven! Hej, hej!"* (0:19.1) | Räven trippar in från vänster, kliver upp på pallen bakom handfatet och vinkar. På kanten: den lilla tandborsten i muggen och tandkrämen bredvid. **Hej med vinkning** | små steg, rav-gullig-1 (hej) | jätteglad |
| [1b](frames/1b.jpg) | 0:23.5 | 6.9 s | Badrummet, halvbild | *"Hur mår du i dag?"* (0:23.8) … *"Bra? Vad roligt!"* (0:26.8) | Räven tittar på oss, öronen vippar. Svarar i pausen, Malin reagerar | rav-gullig-2 i pausen | glad |
| [2](frames/2.jpg) | 0:30.4 | 7.0 s | Närbild ansiktet | *"Oj, oj, oj! Blåbär på tänderna!"* (0:31.0) | Räven ler stort med tänderna synliga: blå blåbärsfläckar på tänderna. Efter repliken slickar den sig om nosen | slick, rav-gullig-4 (belåtet) | visar tänderna, blåbär |
| [2b](frames/2b.jpg) | 0:37.3 | 6.9 s | Samma | *"Har du ätit blåbär?"* (0:37.6) … *"Mm, vad gott!"* (0:40.9) | Räven nickar och "pratar" i pausen | rav-gullig-7 (pratar) | glad |
| [3](frames/3.jpg) | 0:44.3 | 6.6 s | Badrummet, halvbild | *"Ska vi borsta tänderna?"* (0:44.6) … *"Ja, bra idé!"* (0:47.8) | Räven tittar på tandborsten i muggen, nickar | rav-gullig-2b | glad, tittar på muggen |
| [4](frames/4.jpg) | 0:50.9 | 7.2 s | Badrummet, halvbild | *"Oj! Tandborsten är för liten!"* (0:52.1) | Räven tar den lilla tandborsten ur muggen och håller upp den: pytteliten i tassen. Rörelsen först, sedan Malin | swoosh, rav-gullig-5 (frågande) | förvånad |
| [5](frames/5.jpg) | 0:58.0 | 6.3 s | Närbild munnen | *"Så liten … och så många tänder."* (0:58.8) | Den lilla borsten mot den långa raden tänder: den når bara två. Ett försiktigt drag, blåbären sitter kvar | litet borstljud, rav-gullig-5b | gapar, förvånad |
| [5b](frames/5b.jpg) | 1:04.4 | 6.9 s | Närbild ansiktet | *"Det går inte så bra, va?"* (1:04.7) … *"Nej, det gör det inte."* (1:08.0) | Räven tittar på oss, öronen sjunker lite, skakar lugnt på huvudet | rav-gullig-6 (trumpen, mjuk) | lite ledsen |
| [6](frames/6.jpg) | 1:11.3 | 4.8 s | Badrummet, halvbild | *"Hm … vad gör vi nu?"* (1:12.1) | Räven lägger tillbaka den lilla borsten i muggen (bakom muggens framsida) och tittar på oss | tyst, blinkar | nyfiken |
| [7a](frames/7a.jpg) | 1:16.1 | 10.0 s | Saken som ritas (nära) | *"Titta! Kritan ritar något."* (1:16.4) | Kritan flyger in och ritar en stor tandborste i luften bredvid räven: skaftet, halsen, borstblocket (3 s). Gisspaus 3 s, kritan svajar | kritan ritar | nyfiken, tittar dit |
| [7b](frames/7b.jpg) | 1:26.0 | 6.5 s | Samma | *"En stor tandborste! Varsågod, räven."* (1:26.6) | Den lila borsten fylls i inifrån och sjunker lugnt till rävens tass. *Varsågod* | glitter, rav-gullig-2c | kawaii-ögon |
| [8](frames/8.jpg) | 1:32.5 | 6.5 s | Badrummet, halvbild | *"Ska vi säga tack?"* (1:32.7) … *"Tack!"* (1:36.4) | Räven med den stora borsten. Paus 2,5 s: barnet säger tack. Nickar direkt på *Tack!* | rav-gullig-2d (förtjust) | nyfiken → jätteglad |
| [8b](frames/8b.jpg) | 1:39.1 | 7.4 s | Närbild ansiktet | *"Är den lagom nu?"* (1:39.7) … *"Ja, nu är den lagom!"* (1:42.8) | Räven håller den stora borsten framför nosen: den räcker över hela raden tänder | rav-gullig-2, nickar | glad |
| [9](frames/9.jpg) | 1:46.4 | 6.0 s | Badrummet, halvbild | *"En liten … och en stor."* (1:47.0) | Den stora borsten bredvid muggen med den lilla | rav-gullig-7b (pratar) | glad |
| [10](frames/10.jpg) | 1:52.4 | 7.9 s | Samma | *"Ha ha! Den kittlar på nosen!"* (1:55.8) | Borsten kittlar på nosen två gånger, räven blundar och fnissar. Skaftet stöter till tuben, som rullar bakom muggen: korken sticker fram. Fnisset först, sedan Malin. **Shorten börjar här** | rav-fniss (långt), rull lågt | fnissig, blundar |
| [11](frames/11.jpg) | 2:00.3 | 7.7 s | Samma | *"Nu behövs lite tandkräm."* (2:00.6) … *"Oj! Var är tandkrämen?"* (2:03.5) | Räven tittar ner på kanten där tuben stod: tomt. Förvånad min (stora ögon, liten rund mun, öronen upp) | rav-gullig-5c | förvånad |
| [12](frames/12.jpg) | 2:08.0 | 4.9 s | Samma | *"Räven vet inte var."* (2:08.6) | Räven tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte) | rav-gullig-5d (frågande) | nyfiken |
| [13](frames/13.jpg) | 2:12.9 | 8.1 s | Bred → närbild muggen (klipp) | *"Kan du hjälpa räven? Ser du tandkrämen?"* (2:13.2) | Frågan i bred bild, efter 1,5 s klipp till närbild på muggen: korken sticker fram vid sidan. Efter 3 s skimrar den svagt. Paus 5 s | tyst, svagt skimmer efter 3 s | nyfiken |
| [14](frames/14.jpg) | 2:21.0 | 5.3 s | Närbild muggen → halvbild | *"Ja, där! Bakom muggen!"* (2:21.4) | Korken skimrar tydligt. Klipp ut: räven tar fram tuben (glider ut bakom muggen), ett litet glatt skutt | glimt, rav-gullig-2b | jätteglad |
| [15](frames/15.jpg) | 2:26.3 | 4.9 s | Närbild borsthuvudet | *"Lite tandkräm … plutt!"* (2:26.6) | Tätt på borsthuvudet (som 030:s K_KLAM): tuben lutar och kläms, en rand tandkräm (PASTA, som 031) växer på borsten på *"plutt!"*. Sedan läggs tuben ner i muggen | plupp på ordet | – |
| [16](frames/16.jpg) | 2:31.2 | 1.8 s | Badrummet, halvbild | – | Räven gapar med den stora borsten vid munnen (ingen säger åt den) | rav-gullig-4b (mysigt) | gapar |
| [17](frames/17.jpg) | 2:33.0 | 8.3 s | Munnen uppe | *"Först uppe. Borsta, borsta … ett, två, tre!"* (2:33.5) | Bara överraden och borsthuvudet. Ett drag per räkneord, blåbären borta på *"tre"* | borsta per drag, tindra på "tre" | gapar, blundar glatt |
| [18](frames/18.jpg) | 2:41.2 | 7.9 s | Munnen nere | *"Och nere. Borsta, borsta … ett, två, tre!"* (2:41.7) | Underraden, samma | borsta, tindra | gapar |
| [19](frames/19.jpg) | 2:49.1 | 8.4 s | Munnen längst fram | *"Och längst fram. Borsta, borsta … ett, två, tre!"* (2:49.6) | Framtänderna, de sista blåbären | borsta, tindra | gapar |
| [20](frames/20.jpg) | 2:57.5 | 5.4 s | Närbild ansiktet | *"Titta! Blanka tänder!"* (2:57.9) | Stort leende, glansen sveper över de vita tänderna. **Shorten slutar här** | tindra, rav-gullig-2c | visar tänderna |
| [20b](frames/20b.jpg) | 3:02.9 | 8.1 s | Samma | *"Hur känns det nu?"* (3:03.2) … *"Åh, så rena tänder!"* (3:06.3) | Räven blundar nöjt och slickar sig om nosen | rav-gullig-4c (mysig suck) | blundar, ler |
| [21](frames/21.jpg) | 3:11.0 | 9.4 s | Badrummet, halvbild | *"Oj! Den stora får inte plats!"* (3:12.2) … *"Där. Bredvid den lilla."* (3:16.7) | Räven sätter den stora borsten i muggen: den vilar på kanten och vickar. Sedan lägger räven den på kanten bredvid muggen. Vicket först, sedan Malin | plupp när den vickar, rav-gullig-3 (kort fniss) | fnissig → glad |
| [21b](frames/21b.jpg) | 3:20.4 | 6.8 s | Samma | *"Ska du gå och leka nu?"* (3:20.7) … *"Ja, vad kul!"* (3:24.1) | Räven tittar åt vänster mot dörren och tillbaka, öronen upp, ett lugnt glatt skutt | rav-gullig-2d | jätteglad |
| [22](frames/22.jpg) | 3:27.3 | 6.8 s | Samma | *"Hej då, räven! Hej då, stora tandborsten!"* (3:27.9) | Räven vinkar (armen bakom kroppen, snett ut förbi kanten), borstarna på kanten. **Hej då med vinkning** | rav-gullig-8 (hej då) | jätteglad |
| [23](frames/23.jpg) | 3:34.1 | 4.7 s | Samma | *"Hej då! Vi ses snart!"* (3:34.4) | Räven vinkar klart, armen sjunker | rav-gullig-8b | glad |
| [24](frames/24.jpg) | 3:38.8 | 2.5 s | Badrummet → kritirisen | – | Kritirisen drar ihop sig runt räven och den stora tandborsten, 0,6 s svart | – | glad |
<!-- /tabell -->
