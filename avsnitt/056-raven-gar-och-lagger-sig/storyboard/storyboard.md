# 056 Räven går och lägger sig – storyboard (grind 5)

**Längd:** 3:11.8 med loggan (1 s), utan outro (räknat av bygg.mjs ur raderna).

Byggd 2026-11-25 efter Sannas feedback om fler reaktioner, närmare utsnitt, tydligare uttryck, varierade ljudsvar och lite snabbare tempo (se `../manus.md`). En stillbild per rad i `rader.mjs`, ritad ur `scen.html`; reaktionsslagen (`r`) är egna bilder. Röda streckade pilar visar rörelsen.

```bash
node avsnitt/056-raven-gar-och-lagger-sig/storyboard/bygg.mjs --animatik
```

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Räven, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 1.0 s | Logga | – | Lilla Kritans logotyp, 1 s (bilderbokens intro sedan 021) | – | – |
| [01a](frames/01a.jpg) | 0:01.0 | 3.2 s | Papperet, helbild | *"Kritan ritar …"* (0:01.4) | Kritan ritar nallens kontur i ett lugnt drag (ca 2,8 s): huvudet, öronen, kroppen, armarna, fötterna | kritan ritar, skogsljud | – |
| [01b](frames/01b.jpg) | 0:04.2 | 4.6 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:04.2) | Konturen klar, kritan väntar bredvid och svajar (ingen knackning): barnet gissar | skogsljud | – |
| [01c](frames/01c.jpg) | 0:08.8 | 3.5 s | Papperet → zoom in | *"Oj! En nalle!"* (0:09.3) | Den riktiga nallen fylls i inifrån, krit-gnistor. Sista 0,8 s: zoom in i teckningen, in i sovrummet | glitter | – |
| [1](frames/1.jpg) | 0:12.3 | 4.6 s | Sovrummet, helbild | *"Hej, räven! Hej, hej!"* (0:14.1) | Kvällsljus, rumslampan lyser. Räven går in från vänster, stannar på golvet framför huvudgaveln och vinkar (armen bakom kroppen). Nallen sitter på sängens fotände | tass, rav-gullig-1 (hej) | glad |
| [1b](frames/1b.jpg) | 0:16.9 | 4.9 s | Närbild ansiktet | *"Har du borstat tänderna?"* (0:17.2) … *"Ja, vad bra!"* (0:20.0) | Räven visar tänderna i ett stort leende i pausen, sedan stolt (hakan upp) | rav-gullig-2 (förtjust) | visar tänderna → stolt |
| [2](frames/2.jpg) | 0:21.8 | 4.3 s | Närbild fönstret | *"Det är kväll nu. Snart ska räven sova."* (0:22.2) | Kvällshimlen i fönstret, små stjärnor tänds | rav-gullig-5 (nyfiken) | – |
| [3](frames/3.jpg) | 0:26.1 | 2.5 s | Detalj nallen på fotänden | *"Och där är nallen!"* (0:26.5) | Nallen på sängens fotände, ett litet skimmer på ordet *nallen* | glimt | – |
| [3r](frames/3r.jpg) | 0:28.6 | 0.8 s | Närbild ansiktet | – | **Reaktion:** räven ser nallen, jätteglad, öronen upp, svansen viftar | rav-gullig-3 (kort fniss) | jätteglad |
| [3b](frames/3b.jpg) | 0:29.4 | 5.9 s | Halvbild | *"Ska nallen också sova?"* (0:29.7) … *"Ja, så klart!"* (0:32.9) | Räven tittar på nallen och sedan på sängen, öronen vippar, "pratar" i pausen | rav-gullig-7 (pratar) | nyfiken → glad |
| [4](frames/4.jpg) | 0:35.3 | 3.5 s | Halvbild sängen | *"Räven hoppar upp i sängen!"* (0:36.2) | Räven hoppar upp (0,7 s) över madrasskanten och landar bakom den, nallen glider upp bredvid kudden. Rörelsen först, sedan Malin | hopp, puff, nalle-hopp | glad |
| [5](frames/5.jpg) | 0:38.8 | 8.8 s | Närbild ansiktet och nallen | *"Mmm … räven kramar nallen."* (0:39.4) … *"Åh, vad mjuk nallen är!"* (0:44.5) | Räven lutar sig mot nallen och sluter ögonen, myser. Täcket ligger över magen | prassel, rav-gullig-4 (mysig suck) | kawaii, blundar |
| [6](frames/6.jpg) | 0:47.6 | 2.5 s | Närbild rumslampan | *"Nu släcker vi lampan."* (0:47.9) | Rumslampan på nattduksbordet: skenet släcks på *lampan* (0,4 s), rummet blir kvällsblått | lampa-klick | – |
| [7](frames/7.jpg) | 0:50.1 | 6.8 s | Närbild ansiktet, mörkt | *"Oj! Så mörkt! Räven ser ingenting."* (0:50.7) | **Reaktion:** stora ögon (förvånad, 0,3 s stilla), sedan lite rädd: öronen bakåt, svansen tätt intill, ögonen åt sidorna. Varmt kvällsblått, aldrig svart | rav-gullig-5 | förvånad → lite rädd |
| [8](frames/8.jpg) | 0:56.9 | 11.5 s | Närbild ansiktet | *"Räven tycker inte om när det är så mörkt."* (0:57.3) … *"Nej, det förstår jag."* (1:02.2) … *"Hm … räven vill ha lite ljus."* (1:04.6) | Öronen faller 12°, trynet sjunker, svansen sjunker. Räven svarar trumpet i pausen | rav-gullig-6 (trumpen) | lite ledsen |
| [9a](frames/9a.jpg) | 1:08.3 | 4.4 s | Detalj golvet vid huvudgaveln | *"Titta! Kritan ritar något."* (1:08.6) | Kritan flyger in och ritar en liten lampa på golvet (skärmens rundel, foten, sladden) | kritan ritar | – |
| [9b](frames/9b.jpg) | 1:12.7 | 3.0 s | Samma | – | Gisspaus 3 s: konturen klar, kritan svävar och svajar (knackar aldrig) | tyst | – |
| [10](frames/10.jpg) | 1:15.7 | 5.3 s | Detalj den lilla lampan | *"En lampa!"* (1:15.9) … *"Klick … oj, lampan är för liten!"* (1:17.1) | Den lilla lampan fylls i, tänds på *Klick*: en pytteliten prick av ljus | glitter, klick | – |
| [10r](frames/10r.jpg) | 1:21.0 | 0.8 s | Närbild ansiktet | – | **Reaktion:** räven tittar ner på den lilla lampan, tänker, ett öra vickar | rav-gullig-5 | tänker |
| [11](frames/11.jpg) | 1:21.8 | 4.5 s | Sovrummet, helbild | *"Kritan ritar en ny lampa."* (1:22.1) | Kritan ritar en jättestor lampa på samma ställe, högre än fönstret, och den fylls i | kritan ritar, glitter | nyfiken, tittar upp |
| [12](frames/12.jpg) | 1:26.4 | 5.6 s | Sovrummet, helbild | *"Klick … oj, lampan är för stor! Så ljust!"* (1:26.6) | Klick: hela rummet blir alldeles ljust | klick | kniper ihop ögonen |
| [12r](frames/12r.jpg) | 1:31.9 | 1.4 s | Närbild ansiktet | – | **Reaktion:** räven kniper ihop ögonen (bågögon) och fnissar, öronen bakåt, svansen viftar | rav-fniss-1 | fnissig |
| [13](frames/13.jpg) | 1:33.3 | 3.6 s | Sovrummet, helbild | *"Kritan suddar bort den stora lampan."* (1:33.7) | Kritan suddar den stora lampan (linjen baklänges), det blir mörkt igen. Den lilla lampan glider till fotänden | kritan baklänges, glimt | nyfiken |
| [14](frames/14.jpg) | 1:36.9 | 3.6 s | Halvbild | *"Kritan ritar en lampa till …"* (1:37.2) | Kritan ritar en lagom lampa, lika hög som huvudgaveln, och den fylls i | kritan ritar, glitter | nyfiken |
| [15](frames/15.jpg) | 1:40.5 | 9.9 s | Halvbild | *"Klick … nu är lampan lagom!"* (1:40.7) … *"Varsågod, räven."* (1:43.6) … *"Oj, vad fint lampan lyser!"* (1:46.5) | Klick: ett mjukt varmt sken över sängen och räven, resten av rummet kvällsblått. *Varsågod* | klick, tindra, rav-gullig-4 (lättad suck) | lättad → kawaii |
| [15r](frames/15r.jpg) | 1:50.5 | 0.8 s | Närbild ansiktet | – | **Reaktion:** lättad, kawaii-ögon i lampans sken, öronen reser sig | tyst | kawaii |
| [16](frames/16.jpg) | 1:51.3 | 5.6 s | Halvbild | *"Ska vi säga tack?"* (1:51.5) … *"Tack!"* (1:55.2) | Paus 2,5 s: barnet säger tack. Räven nickar direkt på *Tack!*, stolt | rav-gullig-2 (förtjust) | nyfiken → stolt |
| [17](frames/17.jpg) | 1:56.9 | 4.2 s | Sovrummet, helbild | *"Oj! Titta, en skugga på väggen!"* (1:57.3) | Rävens mjuka, ljust lila skugga syns på väggen bakom den | rav-gullig-5 | förvånad |
| [18](frames/18.jpg) | 2:01.1 | 3.7 s | Sovrummet, helbild | *"En stor räv på väggen!"* (2:01.8) | Den lagom lampan glider närmare (0,6 s): skuggan växer nästan till taket. Rörelsen först | glimt, rav-gullig-7 (pratar) | glad |
| [19](frames/19.jpg) | 2:04.8 | 3.3 s | Sovrummet, helbild | *"Och en liten räv på väggen!"* (2:05.5) | Lampan glider tillbaka: skuggan blir liten. Räven vickar på öronen, skuggan vickar med | glimt, rav-fniss-3 | skrattar |
| [19b](frames/19b.jpg) | 2:08.1 | 6.7 s | Närbild ansiktet | *"Jaså, tycker du att skuggan är rolig? Mm, jag också."* (2:09.7) | Räven tittar på oss och "pratar" om skuggorna, öronen vippar | rav-gullig-7 (pratar) | glad |
| [20](frames/20.jpg) | 2:14.8 | 6.4 s | Halvbild | *"Oj, var är nallen? Räven vet inte var."* (2:15.4) | Nallens plats bredvid räven är tom. Räven tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte) | rav-gullig-5 | förvånad → lite ledsen |
| [21](frames/21.jpg) | 2:21.2 | 9.1 s | Halvnära → detalj täcket (klipp) | *"Kan du hjälpa räven? Ser du nallen?"* (2:21.5) | Frågan över sängen, efter 1 s klipp till detalj på täcket: en bula och ett öra som sticker fram. Örat skimrar svagt efter 3 s. Paus 5,5 s (med GLES) | lysmask lågt efter 3 s | – |
| [22](frames/22.jpg) | 2:30.3 | 3.4 s | Detalj täcket | *"Ja, där! Under täcket!"* (2:30.6) | Örat skimrar tydligt | tindra, rav-gullig-3 (kort fniss) | – |
| [23](frames/23.jpg) | 2:33.7 | 2.9 s | Halvbild | *"Där är nallen!"* (2:34.6) | Nallen glider upp ur täcket och sätter sig bredvid räven. Rörelsen först | prassel, nalle-hopp | lättad |
| [23r](frames/23r.jpg) | 2:36.6 | 0.8 s | Närbild ansiktet | – | **Reaktion:** jätteglad, armarna lugnt upp (hurra, inget hopp), svansen viftar | rav-gullig-2 (förtjust) | jätteglad |
| [24](frames/24.jpg) | 2:37.4 | 4.6 s | Detalj den lilla lampan och nallen | *"Och den lilla lampan … den får nallen!"* (2:38.2) | Den lilla lampan glider upp på sängkanten bredvid nallen, dess lilla sken lyser runt nallen | glimt, rav-gullig-7 | stolt |
| [25](frames/25.jpg) | 2:42.0 | 4.9 s | Halvbild | *"Lampan får lysa hela natten."* (2:42.6) | Räven tittar på den lagom lampan, mysigt | rav-gullig-4 (mysig suck) | sömnig |
| [25b](frames/25b.jpg) | 2:47.0 | 8.7 s | Närbild ansiktet | *"Är du sömnig nu?"* (2:47.3) … *"Ja, räven gäspar! Det hörde jag!"* (2:50.4) | Räven gäspar stort i pausen (O-mun, ögonen kniper ihop), öronen sjunker | gäspning | gapar → sömnig |
| [26](frames/26.jpg) | 2:55.6 | 5.8 s | Halvbild | *"Hej då, räven! Hej då, nallen!"* (2:56.4) | Räven vinkar sömnigt, långsamt (armen bakom kroppen). **Hej då med vinkning** | rav-gullig-8 (hej då) | sömnig, glad |
| [27](frames/27.jpg) | 3:01.4 | 8.4 s | Halvbild sängen | *"Hej då! Vi ses snart!"* (3:03.0) | Räven sluter ögonen och lägger sig på sidan med huvudet på kudden (sovbilden tar över i det mörkaste), täcket upp till hakan, nallen bredvid, båda lamporna lyser, zzz | prassel, snark-pip, godnatt-pling | sover |
| [28](frames/28.jpg) | 3:09.8 | 2.0 s | Kritirisen | – | Kritirisen drar ihop sig runt räven, nallen och den lagom lampan, 0,6 s svart | – | sover |
<!-- /tabell -->
