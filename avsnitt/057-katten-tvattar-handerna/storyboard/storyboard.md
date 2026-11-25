# 057 Katten tvättar händerna – storyboard (grind 5)

**Status:** animatiken 2026-11-25, byggd ur `../manus.md` (grind 1–4 godkända) och Malins tagning A.

**Längd:** 4:20.5 med 3,3 s intro (*Djuren hittar på!*), utan outro (räknat av bygg.mjs ur raderna).

**Malins repliker är inspelade** (tagning A 2026-11-25, `../rost.txt`): längderna i `rader.mjs` (`ROST`) är uppmätta, och tiderna för *"borta!"* (`BORTA`) och färgorden (`FARG`) är mätta med silencedetect och whisper. Pauserna är manusets, och varje rad med en replik har 0,7 s extra luft (`GLES`), utom ritintrot och rad 19a (klippet efter 2 s). Kattens ljud och effekterna är de som godkändes i grind 4.

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/057-katten-tvattar-handerna/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/057-katten-tvattar-handerna/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Avsteg och val

- **Introt är 1 s logotyp** (platshållare här), inget outro. Ritintrot är penseln, inte katten.
- Katten står på pallen bakom handfatet som björnen i 023, syns från armarna och upp (`FATKANT` 700), skala 0,57 (427 px, bildutsnitt 430).
- Färgen på tassarna och fläcken på örat är ritade i kod och följer armen och örat. Skummet färgas rosa och gult där tassen tvättas.
- Röda streckade pilar visar rörelsen (bara i storyboarden).

## Raderna

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Katten, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 3.3 s | Intro | – | Seriens standardintro *Djuren hittar på!* (`produktion/youtube/bilderbok-intro/`, 3,3 s, som 023). ⚠ Platshållare i storyboarden: introt läggs in i filmen | introts jingel och röst | – |
| [01a](frames/01a.jpg) | 0:03.3 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:06.3) | Kritan ritar penselns kontur i ett lugnt drag runt hela penseln (ca 2,8 s), sedan två korta streck vid hylsans kanter | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:09.3 | 7.0 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:09.6) | Konturen är klar. Kritan väntar bredvid och vajar lugnt i ca 3 s: barnet gissar | skogsljud | – |
| [01c](frames/01c.jpg) | 0:16.3 | 4.1 s | Papperet → zoom in | *"Oj! En pensel!"* (0:16.9) | Den riktiga penseln fylls i inifrån, den röda tofsen sist. Sista 0,8 s: zoom in i teckningen | `glitter` | – |
| [1](frames/1.jpg) | 0:20.4 | 6.4 s | Badrummet, helbild | *"Hej, katten! Hej, hej!"* (0:22.9) | Katten trippar in från vänster, ett rött och ett gult tassavtryck efter sig, stannar och vinkar. **Hej med vinkning** | `tass`, mjau hej | glad |
| [1b](frames/1b.jpg) | 0:26.7 | 6.8 s | Badrummet, halvbild | *"Hur är det, katten?"* (0:27.2) … *"Jaså, du är glad i dag!"* (0:30.3) | Katten tittar på oss, svansen vippar. **Pausen:** glatt mjau, öronen upp. Malin reagerar | glatt mjau i pausen | nyfiken → jätteglad |
| [2](frames/2.jpg) | 0:33.5 | 7.9 s | Badrummet, närbild | *"Oj, oj, oj! En röd tass … och en gul tass!"* (0:33.9) | Katten håller upp tassarna åt sidorna: vänster röd, höger gul. Tassen lyser till på *röd* och *gul* | förtjust mjau | stolt |
| [3](frames/3.jpg) | 0:41.5 | 4.7 s | Badrummet, halvbild | *"Har du målat, katten?"* (0:41.9) | Katten nickar stolt, svansen vippar. **Pausen:** stolt trill | `mjau-trill` (stolt) | stolt |
| [3b](frames/3b.jpg) | 0:46.2 | 3.1 s | Samma | *"Ja, vad kul!"* (0:46.5) | Katten håller upp tassarna lite igen | – | jätteglad |
| [4](frames/4.jpg) | 0:49.3 | 7.0 s | Badrummet, helbild | *"Titta, röda och gula tassar på golvet!"* (0:49.9) | Avtrycken på golvet, katten tittar ner på dem | fniss-mjau | fnissig, tittar ner |
| [5](frames/5.jpg) | 0:56.3 | 4.5 s | Badrummet, halvbild katten och handfatet | *"Ska vi tvätta bort färgen?"* (0:56.5) | Katten tittar mot handfatet. **Pausen:** glatt mjau och en nick | glatt mjau | nyfiken → glad |
| [5b](frames/5b.jpg) | 1:00.8 | 5.2 s | Badrummet, helbild | *"Ja, bra idé!"* (1:01.1) | Katten kliver upp på pallen bakom handfatet (två lugna skutt), kranen börjar rinna | `tass`, `kran` | glad |
| [6](frames/6.jpg) | 1:06.0 | 6.3 s | Handfatet, närbild tassarna | *"Bara vatten. Plask, plask …"* (1:06.6) | Högra tassen under strålen (strålen slutar på tassen), droppar stänker. Färgen sitter kvar | `kran`, `plask` mjukt | nyfiken |
| [7](frames/7.jpg) | 1:12.3 | 4.9 s | Samma | *"Hm. Färgen sitter kvar."* (1:12.9) | Katten tittar på tassarna, öronen sjunker. Färgen sitter kvar | frågande mjau | nyfiken, tittar på tassen, öronen sjunker |
| [8](frames/8.jpg) | 1:17.2 | 6.9 s | Badrummet, halvbild | *"Oj då. Färgen sitter visst fast."* (1:18.0) | Katten skakar tassarna, droppar flyger, färgen kvar. Kranen stängs. **Pausen:** trumpet mjau, öronen ner | `droppar` ×3, trumpet mjau | trumpen |
| [8b](frames/8b.jpg) | 1:24.1 | 7.5 s | Badrummet, närbild | *"Mm, det är inte roligt."* (1:24.4) … *"Hm … vad gör vi nu?"* (1:27.0) | Katten tittar ner på tassarna, sedan på oss. Paus 1 s mellan replikerna | – | ledsen → nyfiken |
| [9](frames/9.jpg) | 1:31.6 | 9.6 s | Handfatets kant, nära bild (som 023 rad 6a) | *"Titta! Kritan ritar något."* (1:31.9) | Kritan flyger in och ritar tvålens kontur på handfatets kant (3 s), väntar och vajar: gisspaus 3 s. Katten kikar dit | kritan ritar | nyfiken |
| [10](frames/10.jpg) | 1:41.2 | 6.7 s | Samma | *"En tvål! Varsågod, katten."* (1:41.8) | Den riktiga tvålen fylls i inifrån, kritan flyger ut. Öronen upp. *Varsågod* | `glitter`, `mjau-ooo` | förvånad → glad |
| [10b](frames/10b.jpg) | 1:47.9 | 6.1 s | Handfatet, närbild | *"Mm, den luktar gott!"* (1:48.9) | Katten lutar sig mot tvålen och nosar (nosen puffar), blundar. **Pausen:** mysig suck med spinn | mysig suck | blundar, ler |
| [11](frames/11.jpg) | 1:54.0 | 4.6 s | Badrummet, halvbild | *"Ska vi säga tack?"* (1:54.2) | Katten tittar på tvålen. Paus 2,5 s: barnet säger tack | nyfiket mjau | nyfiken |
| [12](frames/12.jpg) | 1:58.6 | 2.8 s | Samma | *"Tack!"* (1:58.6) | Katten nickar direkt på *Tack!* | förtjust mjau | jätteglad |
| [13](frames/13.jpg) | 2:01.4 | 5.3 s | Handfatet, halvbild | *"Oj! Mycket skum!"* (2:02.6) | Kranen rinner, tvålen mellan tassarna (klappen), skummet växer i tre steg | `skrubb`, `kran` | glad |
| [14](frames/14.jpg) | 2:06.7 | 5.8 s | Närbild ansiktet | *"Ha ha! Ett skumskägg!"* (2:07.5) | En skumtuss landar under hakan: skumskägg. Katten tittar ner på den. **Pausen:** fniss-mjau | fniss-mjau | fnissig, tittar ner |
| [14b](frames/14b.jpg) | 2:12.5 | 5.0 s | Samma | *"Jaså, det tycker du är roligt?"* (2:12.8) | Katten tittar upp på oss med skägget kvar | glatt mjau | jätteglad |
| [15](frames/15.jpg) | 2:17.6 | 7.2 s | Handfatet, närbild röda tassen | *"Först den röda tassen. Tvätta, tvätta … borta!"* (2:18.2) | Skummet runt vänstra tassen blir rosa-rött; den röda färgen är borta på *"borta!"*. **Shorten börjar här** | `skrubb`, `tindra-3` på "borta" | glad |
| [16](frames/16.jpg) | 2:24.8 | 7.3 s | Samma, gula tassen | *"Och den gula tassen. Tvätta, tvätta … borta!"* (2:25.4) | Skummet runt högra tassen blir ljusgult; gult borta på *"borta!"* (vänstra redan ren) | `skrubb`, `tindra-3` på "borta" | glad |
| [17](frames/17.jpg) | 2:32.0 | 5.2 s | Badrummet, halvbild | *"Rena tassar!"* (2:32.5) | Katten håller upp två rena tassar. **Pausen:** spinn | `mjau-spinn` | stolt |
| [17b](frames/17b.jpg) | 2:37.3 | 3.3 s | Samma | *"Oj, så fina!"* (2:37.6) | Svansen vippar | – | jätteglad |
| [18](frames/18.jpg) | 2:40.6 | 6.1 s | Samma | *"Men lite blått är kvar. Katten vet inte var."* (2:40.9) | Katten tittar på tassarna, sedan åt vänster och höger. Den blå fläcken på högra örat syns lite | frågande mjau | nyfiken |
| [19a](frames/19a.jpg) | 2:46.7 | 2.0 s | Samma (örat syns) | *"Kan du hjälpa katten? Kan du se den blå fläcken?"* (2:47.0) | *Kan du hjälpa katten?* Klipp efter 2 s | tyst | nyfiken |
| [19b](frames/19b.jpg) | 2:48.7 | 6.5 s | Närbild örat (klipp) | – | Den blå fläcken på örat. Paus 5 s; efter ca 3 s skimrar fläcken svagt | tyst, `glimt-2` svagt | nyfiken |
| [20](frames/20.jpg) | 2:55.2 | 4.5 s | Samma | *"Ja, där! På örat!"* (2:55.6) | Fläcken skimrar tydligt, örat vippar | `mjau-oj`, `glimt` | förvånad |
| [21](frames/21.jpg) | 2:59.7 | 5.7 s | Samma | *"Tvätta, tvätta … borta!"* (3:00.4) | Skumtussen svävar upp och snurrar över örat, katten blundar. Blått borta på *"borta!"* | `skrubb`, `tindra-3` på "borta" | blundar, ler |
| [22](frames/22.jpg) | 3:05.3 | 4.6 s | Badrummet, halvbild | *"Oj! Bubblor!"* (3:06.7) | En röd bubbla stiger ur handfatet, sedan en gul, sedan en blå | – | förvånad |
| [23](frames/23.jpg) | 3:09.9 | 8.0 s | Samma | *"En röd … en gul … och en blå. Plopp!"* (3:10.2) | Bubblorna spricker en i taget på färgorden, katten tittar efter varje. **Shorten slutar här** | `pop` ×3, fniss-mjau | fnissig |
| [24](frames/24.jpg) | 3:17.9 | 8.1 s | Samma | *"Torka, torka. Mmm … mjuk handduk."* (3:18.5) | Droppar från tassarna. Handduken från kroken glider ner framför tassarna och upp igen | `droppar`, mysig suck | blundar, ler |
| [25](frames/25.jpg) | 3:26.0 | 5.6 s | Samma | *"Men vad har du målat, katten?"* (3:26.5) | Katten tittar mot den tomma väggen bredvid handfatet. **Pausen:** tre mjau | `mjau-gullig-7` (tre mjau) | glad, tittar åt sidan |
| [25b](frames/25b.jpg) | 3:31.6 | 3.6 s | Samma | *"Jaså? Får vi se?"* (3:31.9) | Katten tittar på väggen igen | – | nyfiken |
| [26](frames/26.jpg) | 3:35.2 | 9.0 s | Samma | *"Titta! Kritan ritar igen."* (3:35.5) | Kritan flyger in och ritar papperet på väggen, sedan tre tassavtryck (4 s). Konturen står kvar 1 s | kritan ritar | nyfiken, tittar på väggen |
| [27](frames/27.jpg) | 3:44.2 | 8.0 s | Samma | *"Tassar! En röd, en gul … och en blå!"* (3:44.8) | Papperet fylls i, avtrycken röd, gul, blå på färgorden. Kritan flyger ut | `glitter`, `glimt`, `mjau-ooo` | förvånad → jätteglad |
| [28](frames/28.jpg) | 3:52.2 | 6.5 s | Halvbild, katten och målningen | *"Vilken fin målning! Tack, kritan!"* (3:52.7) | Katten nickar stolt, svansen vippar. På *Tack, kritan!* nickar katten | förtjust mjau | stolt |
| [28b](frames/28b.jpg) | 3:58.7 | 4.8 s | Samma | *"Var det roligt att tvätta tassarna?"* (3:59.0) | Katten tittar på oss. **Pausen:** glatt mjau och en nick | glatt mjau | glad |
| [28c](frames/28c.jpg) | 4:03.5 | 3.8 s | Samma | *"Mm, jag tyckte också det!"* (4:03.8) | Katten myser | – | blundar, ler |
| [29](frames/29.jpg) | 4:07.4 | 5.6 s | Badrummet, halvbild | *"Hej då, katten! Hej då, tvålen!"* (4:08.1) | Katten vinkar (armen bakom kroppen, snett ut förbi kanten), tvålen på kanten. **Hej då med vinkning** | mjau hej då | jätteglad |
| [30](frames/30.jpg) | 4:12.9 | 5.1 s | Samma | *"Hej då! Vi ses snart! [giggles]"* (4:13.2) | Katten vinkar klart, armen sjunker | mjau hej då | glad |
| [31](frames/31.jpg) | 4:18.0 | 2.5 s | Badrummet → kritirisen | – | Kritirisen drar ihop sig runt katten och målningen | – | glad |
<!-- /tabell -->
