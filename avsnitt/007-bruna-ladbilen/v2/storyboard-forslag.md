# 007 v2 – "Brunt är den godaste färgen" (förslag, 2026-11-08)

En andra version av 007 på den nya sången (`v2/sang.m4a`, 3:21.8, tider i `v2/rader.txt`). Det nuvarande 007 rörs inte.
Format: fast intro och outro, max 3 figurer och 2 platser. Avsnittstid = sångtid + 11 s, sången klipps inte.

**Figurer (3):** Gurra (grodan, huvudfiguren i stället för Bulle: sången nämner ingen björn, Sanna 2026-11-08), Ludde (lammet), Igge (igelkotten). Nallen på flaket är rekvisita. **Platser (2):** vägen och chokladlandet (kolastranden med rutschkanan).

| Sångtid | Del | Bild | Återanvänder |
|---|---|---|---|
| 0:00–0:11 | Intro, instrumentalt | Kritan ritar lastbilen, hela vägen ut till hjulen | `kritan-ritar` (som nu) |
| 0:11–0:30 | Intro, instrumentalt | Gurra kör på vägen med nallen på flaket, vinkar till oss, blundar och drömmer: molnet växer | `vagen-1` (körning, vink, molnet) |
| 0:30–0:39 | "Brunt, brunt, brunt – mums" | Molnövergången in i chokladlandet: Gurra står på stranden, stampar på "brunt", äter en chokladbit på "mums" | molnövergången, `rutschbana` (stranden) |
| 0:39–0:49 | "Tänk om det fanns ett brunt land …" | Kameran glider längs stranden: chokladträd, kolastrand, kolahavet | ny: chokladträd |
| 0:49–0:55 | "Åka rutschkana … swish, swish, plask" | Gurra åker rutschkanan ner i kolan, plask | `refrang.js` (åket och plasket) |
| 0:55–1:07 | "Vilken färg? Brunt!" | Närbild, Gurra frågar oss och väntar (paus för att svara), glad på "Brunt!" | `refrang.js` (närbilden) |
| 1:07–1:15 | "Chokladträd på rad … kolahavet" | Ludde kommer fram bakom ett chokladträd, vinkar | ny: träden |
| 1:15–1:33 | "Uppför trappan, ett, två, tre … plask, plask, plask, mums" | Ludde klättrar upp (ett ryck per räkneord), tittar ner, åker, plask | `refrang.js` (stegen och åket) |
| 1:33–1:51 | Refräng 2 | Gurra och Ludde åker efter varandra, plaskar ihop | `refrang.js` |
| 1:51–2:04 | "Tänk att ha ett chokladträd … en till dig och en till mig" | Igge sitter uppe i ett chokladträd, ger en bit var till Gurra och Ludde, de smakar | ny scen; delandet som bullen i ängen |
| 2:04–2:15 | "En, två, tre – är ni med?" ×3, "Nu dansar vi!" | Alla tre vänder sig till oss och nickar på varje "är ni med?" | – |
| 2:15–2:38 | Danspaus: klappa, "snurra runt", hoppa, plask | Dans på stranden: klappar i takt; på "snurra runt" gungar de runt i en liten ring (vänds aldrig); hopp; plask i kolan | dansrörelserna ur `discot` |
| 2:38–3:07 | Refräng 3 med "Vilken färg? Brunt!" | Alla tre åker rutschkanan en sista gång, frågan till oss igen | `refrang.js` |
| 3:07–3:21.8 | "Brunt, brunt, brunt – mums" | Vinkar hej då, kolaövergången, kritirisen sluter sig runt Gurra | `slutet` (irisen) |

**Saker som saknas:** ett **chokladträd** i art direction v2 (rekvisita, görs med dig). Allt annat finns.

**Byggt (2026-11-08):** `scener/kritan-ritar` (som nu), `scener/v2-vagen` (0:11,5–0:30) och `scener/v2-landet` (0:30 till slutet, en scen),
alla renderade med `--v2`. I v2-läget ger `lastbilen.bulle()` grodan i stället för björnen, så lastbilen, rutschbanan och drömmen följer med.
Grodan rör sig efter sitt ark (`assets/karaktarer/grodan-gurra/premium/uttryck.html`): arkets hopp (huk, sträckt i luften, landningen
trycker ihop), arkets vink, gång, klapp och dans, och uttrycken tonas över i stället för att hoppa. Sammansättning: `film/satt-ihop-v2.sh`,
med den kolabruna molnövergången (`film/moln/`) in i chokladlandet. Avslutningen har ingen kolaövergång: bara vink och kritirisen.
Igge sitter i trädet i bryggan, och lastbilen är kvar i introt.

**Omgjort (Sanna 2026-11-09):**
- **Kritan ritar (0:11–0:24) utan musik:** skogsljud och berättaren (Malin): "Vad ritar kritan?", "Hmm …", "En lastbil! En brun lastbil!" (ny replik, `assets/ljud/roster/en-lastbil-en-brun-lastbil-1.m4a`, läggs in av sig själv när filen finns). Sången börjar först efter teckningen (`"sang"` i `bilder.json`, avsnittstid 0:24).
- **Sångens intro 0:00–0:30 på vägen, helt:** tankebubblor med sakerna i sången (chokladbit, chokladträd, kolasås, rutschkana), grodan slickar sig om munnen i närbild, sedan **minidramat**: guppet, nallen ramlar av flaket ("oj då", ohoh), lastbilen stannar, grodan blir ledsen. Ludde och Igge kommer gående, kastar upp nallen på flaket och hoppar upp själva. De kör vidare och grodan drömmer om chokladlandet.
- **Chokladlandet:** inga palmer, Igge sitter på det stora trädets gren från början, Ludde flyter i kolan från början, mjukare åk (sätter sig, farten efter fallhöjden, landar och doppar), fler närbilder på ansiktena.
- **1:07–1:15 tillbaka på vägen** (`scener/v2-vag2`): alla fyra i lastbilen, chokladträd längs vägen, ett nytt poppar upp på varje "på rad".
- **Danspausen 2:13–2:38 i discot** (`scener/v2-disco`, det bruna discot från första 007). Discot är en tredje plats, en avvikelse från max 2 platser (som första 007).
- Molnövergångar in och ut ur vägen och discot. Slutet: vink och kritirisen runt grodan.

**Runda 3 (Sanna 2026-11-09):**
- **Kritan ritar längre och lugnare:** 0:11–0:29 (förut 0:24). Sången börjar på avsnittstid 0:29, så allt efter har flyttats 5 s (`v2/bilder.json`).
- **Vägen till "Tänk om" (sångtid 0:00–0:39):** tut, grodan vinkar till oss, närbild, minidramat (0:12,6) och alla fyra kör vidare med en närbild på flaket. På orden: en tankebubbla på varje "brunt" (0:30: chokladbit, chokladträd, kolasås), slicket på "mums, mums, mums" (0:32: tungan sveper längs överläppen, en gång per "mums"), drömmen på "Brunt är den godaste färgen" och molnet in i chokladlandet på "Tänk om" (0:39).
- **Flaket:** Ludde och Igge står i flaket (lastbilen.js `b.flak`): Ludde bakom, nallen och Igge framför, sidan döljer magarna.
- **Träden:** ett enda chokladträd per plats (det stora på stranden, det sista som poppar upp på vägen tillbaka), de andra vanliga granar i brunt (`kit.brun()`), glest.
- **Rutschkanan:** kameran zoomar in och följer varje åk. Fem närbilder underifrån med brun bakgrund och fartstreck (`scener/v2-fart1`–`5`, `v2-fart.js`), raka klipp mitt i åket: refräng 1 grodan, versen lammet, refräng 2 grodan, refräng 3 lammet och igelkotten.
- **Klappet i discot:** händerna möts framför bröstet på varannat slag, i takt med klapp-ljudet, och kroppen trycks ihop i smacket.

**Runda 4 (Sanna 2026-11-09):**
- **Sångens vers på vägen:** whisper hittade en vers vi missat (sångtid 0:16,8–0:30: "bullar, choklad, kakor, kola, knäck, chokladboll … mums vad gott med brunt på allt"). Varje sak poppar upp i en tankebubbla på sitt ord. "Tänk om" (0:38,3) är nu en närbild på grodan som drömmer (glada ^-ögon), sedan zoomar drömmen in på landet där lammet åker rutschkanan.
- **Närbilderna på ansiktet** är centrerade lägre, så att huvudet inte klipps.
- **Bara lammet i flaket** (på vägen och på vägen tillbaka), inte igelkotten.
- **Stranden:** färre zoomningar; kameran klipper rakt till närbild, och följer bara de åk som inte har en fartinsert. Benen göms när figurerna åker.
- **Klappet:** lammets hovar möts framför magen (samma v2-rigg, större klapp).
- **Slutet som en bilderbok:** på sista "brunt, brunt, brunt" poppar bubblor upp med de bruna sakerna vi mött (lastbilen, nallen, bullen, chokladen, chokladträdet, rutschkanan).

**Runda 5 (Sanna 2026-11-09):**
- **Ögonbrynen följer blicken** (alla v2-figurer: `uttryck.html` → `gor-v2.py`); förut stod brynen kvar när ögonen tittade åt sidan.
- **"Brunt är den godaste färgen" (sångtid 0:59):** klipp till toppen, grodan åker medan lammet klättrar, sedan åker lammet.
- **Nallen längre bak i flaket** (v2), så att den inte skyms av lammet.
- **"Tänk att ha ett chokladträd" (1:51):** närbild på igelkotten i trädet med glada ^-ögon och hjärtan som stiger.
- **Discot:** samma rörelsesymboler som första 007:s disco (kritdekal uppe till höger, motivet i kod, inga pilar): tassar som klappar på klapp-slaget, en spiral på "snurra runt", en boll i prickad båge på "hoppa".
- **Refräng 3 (2:52):** tätare bild på de tre som dansar.
- **Bilderboksbubblorna:** varje bubbla poppar upp stor mitt i bild och flyger sedan liten till sin plats i raden; nallen har sitt ansikte.
