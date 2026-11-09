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
