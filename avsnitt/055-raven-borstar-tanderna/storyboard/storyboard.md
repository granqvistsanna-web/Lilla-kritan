# 055 Räven borstar tänderna – storyboard (grind 5)

**Status:** första storyboarden och animatiken 2026-11-25, byggd ur `../manus.md` (grind 1–3 godkända: manus, saker, Malins röst).

**Längd:** 3:28.1 med det gemensamma introt (3,3 s), utan outro (räknat av bygg.mjs ur raderna).

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
| [01c](frames/01c.jpg) | 0:11.8 | 4.0 s | Papperet → zoom in | *"Oj! En tandborste!"* (0:12.4) | Den riktiga turkosa tandborsten fylls i inifrån. Sista 0,8 s: zoom in i teckningen, in i badrummet | glitter | – |
| [1](frames/1.jpg) | 0:15.8 | 6.7 s | Badrummet, helbild | *"Hej, räven! Hej, hej!"* (0:18.8) | Räven trippar in från vänster, kliver upp på pallen bakom handfatet och vinkar. På kanten: den lilla tandborsten i muggen och tandkrämen bredvid. **Hej med vinkning** | små steg, rav-gullig-1 (hej) | jätteglad |
| [1b](frames/1b.jpg) | 0:22.5 | 6.0 s | Badrummet, halvbild | *"Hur mår du i dag?"* (0:22.8) … *"Bra? Vad roligt!"* (0:25.4) | Räven tittar på oss, öronen vippar. Svarar i pausen, Malin reagerar | rav-gullig-2 i pausen | glad |
| [2](frames/2.jpg) | 0:28.5 | 6.1 s | Närbild ansiktet | *"Oj, oj, oj! Blåbär på tänderna!"* (0:29.1) | Räven ler stort med tänderna synliga: blå blåbärsfläckar på tänderna. Efter repliken slickar den sig om nosen | slick, rav-gullig-4 (belåtet) | visar tänderna, blåbär |
| [2b](frames/2b.jpg) | 0:34.5 | 6.0 s | Samma | *"Har du ätit blåbär?"* (0:34.8) … *"Mm, vad gott!"* (0:37.7) | Räven nickar och "pratar" i pausen | rav-gullig-7 (pratar) | glad |
| [3](frames/3.jpg) | 0:40.6 | 6.5 s | Badrummet, halvbild | *"Ska du borsta tänderna med tandborsten?"* (0:40.9) … *"Ja, bra idé!"* (0:44.5) | Räven tittar på tandborsten i muggen, nickar | rav-gullig-2b | glad, tittar på muggen |
| [4](frames/4.jpg) | 0:47.1 | 6.4 s | Badrummet, halvbild | *"Oj! Tandborsten är för liten!"* (0:48.3) | Räven tar den lilla tandborsten ur muggen och håller upp den: pytteliten i tassen. Rörelsen först, sedan Malin | swoosh, rav-gullig-5 (frågande) | förvånad |
| [5](frames/5.jpg) | 0:53.4 | 5.7 s | Närbild munnen | *"Så liten … och så många tänder."* (0:54.2) | Den lilla borsten mot den långa raden tänder: den når bara två. Ett försiktigt drag, blåbären sitter kvar | litet borstljud, rav-gullig-5b | gapar, förvånad |
| [5b](frames/5b.jpg) | 0:59.2 | 6.9 s | Närbild ansiktet | *"Tandborsten når inte alla tänderna, va?"* (0:59.5) … *"Nej, den är för liten."* (1:03.2) | Räven tittar på oss, öronen sjunker lite, skakar lugnt på huvudet | rav-gullig-6 (trumpen, mjuk) | lite ledsen |
| [6](frames/6.jpg) | 1:06.1 | 5.5 s | Badrummet, halvbild → närbild ansiktet | *"Hm … hur ska räven borsta alla tänderna?"* (1:06.9) | Räven lägger tillbaka den lilla borsten i muggen (bakom muggens framsida) och tittar på oss | tyst, blinkar | nyfiken |
| [7a](frames/7a.jpg) | 1:11.6 | 9.7 s | Saken som ritas (nära) | *"Titta! Kritan ritar något."* (1:11.9) | Kritan flyger in och ritar en stor tandborste i luften bredvid räven: skaftet, halsen, borstblocket (3 s). Gisspaus 3 s, kritan svajar | kritan ritar | nyfiken, tittar dit |
| [7b](frames/7b.jpg) | 1:21.3 | 5.8 s | Samma | *"En stor tandborste! Varsågod, räven."* (1:21.9) | Den lila borsten fylls i inifrån och sjunker lugnt till rävens tass. *Varsågod* | glitter, rav-gullig-2c | kawaii-ögon |
| [8](frames/8.jpg) | 1:27.0 | 6.0 s | Badrummet, halvbild | *"Ska vi säga tack?"* (1:27.2) … *"Tack!"* (1:30.9) | Räven med den stora borsten. Paus 2,5 s: barnet säger tack. Nickar direkt på *Tack!* | rav-gullig-2d (förtjust) | nyfiken → jätteglad |
| [8b](frames/8b.jpg) | 1:33.0 | 7.4 s | Närbild ansiktet | *"Är den stora tandborsten lagom nu?"* (1:33.6) … *"Ja, den når alla tänderna!"* (1:37.2) | Räven håller den stora borsten framför nosen: den räcker över hela raden tänder | rav-gullig-2, nickar | glad |
| [9](frames/9.jpg) | 1:40.4 | 5.4 s | Badrummet, halvbild → närbild ansiktet | *"En liten tandborste … och en stor."* (1:41.0) | Den stora borsten bredvid muggen med den lilla | rav-gullig-7b (pratar) | glad |
| [10](frames/10.jpg) | 1:45.8 | 7.6 s | Närbild ansiktet → halvbild → närbild | *"Ha ha! Tandborsten kittlar på nosen!"* (1:48.8) | Borsten kittlar på nosen två gånger, räven blundar och fnissar. Skaftet stöter till tuben, som rullar bakom muggen: korken sticker fram. Fnisset först (blundar, öronen bakåt, svansen viftar lugnt), sedan Malin. **Shorten börjar här** | rav-fniss (långt), rull lågt | fnissig, blundar |
| [11](frames/11.jpg) | 1:53.4 | 7.3 s | Halvbild → närbild ansiktet (klipp) | *"Nu ska vi ha tandkräm på tandborsten."* (1:53.7) … *"Oj! Var är tandkrämen?"* (1:56.8) | Räven tittar ner på kanten där tuben stod: tomt (halvbild). Klipp till närbild på reaktionen: förvånad min (stora ögon, liten rund mun, öronen rakt upp, svansen stilla) | rav-gullig-5c | förvånad |
| [12](frames/12.jpg) | 2:00.6 | 4.2 s | Närbild ansiktet | *"Räven vet inte var."* (2:01.2) | Räven tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte) | rav-gullig-5d (frågande) | nyfiken |
| [13](frames/13.jpg) | 2:04.8 | 7.8 s | Bred → närbild muggen (klipp) | *"Kan du hjälpa räven? Ser du tandkrämen?"* (2:05.1) | Frågan i bred bild, efter 1,5 s klipp till närbild på muggen: korken sticker fram vid sidan. Efter 3 s skimrar den svagt. Paus 5 s | tyst, svagt skimmer efter 3 s | nyfiken |
| [14](frames/14.jpg) | 2:12.6 | 4.7 s | Närbild muggen → halvbild | *"Ja, där! Bakom muggen!"* (2:13.0) | Korken skimrar tydligt. Klipp ut: räven tar fram tuben (glider ut bakom muggen), ett litet glatt skutt. Reaktionen i närbild ansiktet 0,8 s (jätteglad, öronen upp, svansen viftar) | glimt, rav-gullig-2b | jätteglad |
| [15](frames/15.jpg) | 2:17.3 | 4.9 s | Närbild borsthuvudet | *"Lite tandkräm på tandborsten … plutt!"* (2:17.6) | Tätt på borsthuvudet (som 030:s K_KLAM): tuben lutar och kläms, en rand tandkräm (PASTA, som 031) växer på borsten på *"plutt!"*. Sedan läggs tuben ner i muggen | plupp på ordet | – |
| [16](frames/16.jpg) | 2:22.2 | 1.6 s | Badrummet, halvbild | – | Räven gapar med den stora borsten vid munnen (ingen säger åt den) | rav-gullig-4b (mysigt) | gapar |
| [17](frames/17.jpg) | 2:23.8 | 7.5 s | Munnen uppe | *"Först tänderna uppe. Borsta, borsta … ett, två, tre!"* (2:24.3) | Bara överraden och borsthuvudet. Ett drag per räkneord, blåbären borta på *"tre"* | borsta per drag, tindra på "tre" | gapar, blundar glatt |
| [18](frames/18.jpg) | 2:31.3 | 7.5 s | Munnen nere | *"Och tänderna nere. Borsta, borsta … ett, två, tre!"* (2:31.8) | Underraden, samma | borsta, tindra | gapar |
| [19](frames/19.jpg) | 2:38.7 | 7.9 s | Munnen längst fram | *"Och tänderna längst fram. Borsta, borsta … ett, två, tre!"* (2:39.2) | Framtänderna, de sista blåbären | borsta, tindra | gapar |
| [20](frames/20.jpg) | 2:46.6 | 4.7 s | Närbild munnen → ansiktet | *"Titta! Blanka tänder!"* (2:47.0) | Stort leende, glansen sveper över de vita tänderna. **Shorten slutar här** | tindra, rav-gullig-2c | visar tänderna |
| [20b](frames/20b.jpg) | 2:51.3 | 7.5 s | Samma | *"Hur känns tänderna nu?"* (2:51.6) … *"Åh, så rena tänder!"* (2:54.6) | Räven blundar nöjt och slickar sig om nosen | rav-gullig-4c (mysig suck) | blundar, ler |
| [21](frames/21.jpg) | 2:58.9 | 10.8 s | Närbild muggen → ansiktet → halvbild | *"Oj! Den stora tandborsten får inte plats i muggen!"* (3:00.1) … *"Där. Den stora ligger bredvid muggen."* (3:05.6) | Räven sätter den stora borsten i muggen: den vilar på kanten och vickar. Sedan lägger räven den på kanten bredvid muggen. Vicket först, klipp till närbild ansiktet på det korta fnisset (blundar, öronen vippar), sedan Malin | plupp när den vickar, rav-gullig-3 (kort fniss) | fnissig → glad |
| [21b](frames/21b.jpg) | 3:09.6 | 5.8 s | Samma | *"Ska du gå och leka nu?"* (3:09.9) … *"Ja, vad kul!"* (3:12.9) | Räven tittar åt vänster mot dörren och tillbaka, öronen upp, ett lugnt glatt skutt | rav-gullig-2d | jätteglad |
| [22](frames/22.jpg) | 3:15.5 | 6.1 s | Samma | *"Hej då, räven! Hej då, stora tandborsten!"* (3:16.2) | Räven vinkar (armen bakom kroppen, snett ut förbi kanten), borstarna på kanten. **Hej då med vinkning** | rav-gullig-8 (hej då) | jätteglad |
| [23](frames/23.jpg) | 3:21.6 | 4.0 s | Samma | *"Hej då! Vi ses snart!"* (3:21.9) | Räven vinkar klart, armen sjunker | rav-gullig-8b | glad |
| [24](frames/24.jpg) | 3:25.6 | 2.5 s | Badrummet → kritirisen | – | Kritirisen drar ihop sig runt räven och den stora tandborsten, 0,6 s svart | – | glad |
<!-- /tabell -->
