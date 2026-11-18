# Storyboard – Avsnitt 039 · Kaninen ska åka pulka (grind 5, animatik)

## Platshållare och öppet
- **Introt** (00) är en stillbild ur det gemensamma introt *Djuren hittar på!*. Animatiken har introts eget ljud.
- **Knarr i snö** (33) saknas (Openverse först). Markerat med ⚠, tystnad i animatiken.
- **Pulkabacken** är en ny platta med backe (Flow, Nano Banana Pro, 0 krediter, 2026-11-17, Sanna: *"we need new bg with hill"*): krönet med granar till vänster, en jämn backe ner till plan snö och staketet till höger. Tagningarna ligger i `assets/bakgrunder/pulkabacken/original/pulkabacken-1..3.jpeg`; **tagning 3 är vald** (Sanna 2026-11-17), `assets/bakgrunder/pulkabacken/pulkabacken.jpeg`, platsen i [`bakgrunder/pulkabacken.md`](../../../bakgrunder/pulkabacken.md). Backens kant är uppmätt (`BACKE` i `scen.html`), så pulkan följer den.
- **Strumporna** är lammets rosa (`strumpa-rosa-1/2`). Manus Grind 2 lämnade öppet om de ska bytas mot röd-vit-randiga julstrumpor.
- **Korgen** är `korg-v3-natt` (hålet under handtaget urklippt, jämn vit kant), lite större. Den gömda vanten står spegelvänd bakom korgen så att tummen sticker ut vid högra kanten.
- **Pannbandet på kroken** är samma bandbild som på huvudet (`klader-lager/pannband.png`), vilande på kroken, så att det känns igen. **De gråa vantarna** hänger upp och ner i ett rött vantsnöre över kroken (Sanna).
- Rader där kaninen *rör sig* (nickar, hoppar, plagg som glider) visas som en stillbild med lila streckade pilar; rörelserna görs i kodscenen enligt manusets tabell "Så rör det sig".

**Längd:** 4:23.3 med introt (räknat av bygg.mjs ur raderna).

**Så är den gjord.** Som 020 och 024: [`scen.html`](scen.html) ritar varje rad (`?rad=14` visar en), [`rader.mjs`](rader.mjs) har raderna, och [`bygg.mjs`](bygg.mjs) tar en stillbild per rad till `frames/`, skriver tabellen nedan och [`index.html`](index.html), och med `--animatik` också `animatik.mp4` (stillbilderna i radernas längd med Malins repliker, kaninens pip, effekterna och rummens mattor). Kör från repots rot:

```bash
node avsnitt/039-kaninen-aker-pulka/storyboard/bygg.mjs --animatik
```

**Tiderna** kommer från Malins klippta repliker (`../rost-langder.txt`) plus manusets pauser, och 0,7 s extra luft på varje rad med en replik. **Kläderna** är lager i riggens 1024-ruta (`../klader-lager/`, ett per plagg: `overall-kropp`, `overall-arm-l/r`, `byxa-l/r`, `stovel-l/r`, `vante-l/r`, `pannband`), gjorda med `python3 avsnitt/039-kaninen-aker-pulka/provbild-klader.py --lager avsnitt/039-kaninen-aker-pulka/klader-lager`.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Kaninen, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 3.3 s | Intro (fast) | – | Det gemensamma introt *Djuren hittar på!* (`produktion/youtube/bilderbok-intro/`). Platshållare i storyboarden | introts eget | – |
| [01a](frames/01a.jpg) | 0:03.3 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:04.3) | Kritan ritar vantarnas kontur i lugna drag, tummen och muddkanten som egna drag. Halvvägs här | kritan ritar | – |
| [01b](frames/01b.jpg) | 0:09.3 | 7.4 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:09.3) | Konturen klar, kritan väntar bredvid och svajar (ingen knackning): barnet gissar | kritan ritar klart, sedan tyst | – |
| [01c](frames/01c.jpg) | 0:16.7 | 4.9 s | Papperet → zoom in | *"Oj! Vantar!"* (0:17.3) | De gråa vantarna fylls i inifrån. Sista 0,8 s: zoom in i teckningen, som blir vantarna på hängaren | `glitter` | – |
| [1](frames/1.jpg) | 0:21.6 | 6.3 s | Julhallen, helbild | *"Hej, kaninen! Hej, hej!"* (0:23.2) | Kaninen hoppar in från höger med två lugna hopp, stannar mitt i bild och vinkar (armen bakom kroppen). De gråa vantarna hänger på hängaren | två mjuka hopp, `kanin-hej` | jätteglad |
| [2](frames/2.jpg) | 0:28.0 | 3.8 s | Julhallen, halvbild | *"Vill du gå ut?"* (0:28.4) | Kaninen tittar mot dörren och hoppar ett litet steg mot den. **Nickar** efter frågan | förtjust pip (2) | nyfiken → glad |
| [3](frames/3.jpg) | 0:31.7 | 4.9 s | Samma | *"Ska du åka pulka?"* (0:32.0) | Öronen reser sig. **Nickar**, öronen vippar | förtjust pip (2b) | jätteglad |
| [4](frames/4.jpg) | 0:36.6 | 6.4 s | Julhallen, helbild | *"Då behöver du varma kläder. Det är kallt ute!"* (0:37.0) | Kaninen tittar mot hängaren (riktningen åt höger, ögonen upp) | nyfiket pip (5) | nyfiken |
| [5](frames/5.jpg) | 0:43.0 | 4.3 s | Närbild, hängaren | *"Titta, här hänger kläderna."* (0:43.5) | Hängaren: strumporna, overallen, pannbandet och de gråa vantarna på var sin krok, korgen under | – | – |
| [6](frames/6.jpg) | 0:47.3 | 4.8 s | Julhallen, helbild | *"Ska vi börja med strumporna?"* (0:48.1) | Kaninen sätter sig på golvet med benen fram. **Nickar** | förtjust pip (2) | glad |
| [7](frames/7.jpg) | 0:52.0 | 7.1 s | Närbild, benen | *"Först ena strumpan. Dra, dra … på!"* (0:52.3) | Strumpan glider från kroken till vänstra foten, benet lyfts, sitter på *"på!"* | `strumpa` | glad |
| [8](frames/8.jpg) | 0:59.1 | 6.9 s | Samma | *"Och andra strumpan. Dra, dra … på!"* (0:59.4) | Samma med högra foten | `strumpa` | fnissig |
| [9](frames/9.jpg) | 1:06.1 | 4.1 s | Julhallen, helbild | *"Nu overallen."* (1:06.7) | Kaninen ställer sig upp, overallen lyfter från kroken | nyfiket pip (5b) | nyfiken |
| [10](frames/10.jpg) | 1:10.2 | 4.8 s | Halvbild | *"Dra, dra … på!"* (1:10.5) | Byxbenen glider på först, sedan bålen och ärmarna, sitter på *"på!"* | `prassel-tyg` | glad |
| [11](frames/11.jpg) | 1:15.0 | 2.4 s | Närbild, magen | – | Dragkedjan: en kritlinje växer från magen upp till kragen (0,6 s). Malin säger inget | `zipp`, förtjust pip (2) | jätteglad |
| [12](frames/12.jpg) | 1:17.4 | 3.8 s | Halvbild | *"Stövlarna står vid dörren."* (1:17.8) | Kaninen tittar på stövlarna vid dörren | – | nyfiken |
| [13](frames/13.jpg) | 1:21.2 | 5.0 s | Julhallen, helbild | *"En stövel … två stövlar!"* (1:21.5) | Stövlarna glider fram från dörren och upp på fötterna, en i taget | `duns` ×2 | glad |
| [14](frames/14.jpg) | 1:26.2 | 6.5 s | Halvbild | *"Pannbandet på!"* (1:26.6) … *"Oj! Öronen!"* (1:28.8) | Pannbandet glider från kroken ner över öronen, som trycks ihop. Paus 1 s mellan replikerna | `prassel-tyg`, frågande pip (7) | förvånad |
| [15](frames/15.jpg) | 1:32.7 | 4.6 s | Närbild, huvudet | *"Plopp! … Plopp!"* (1:33.0) | Bandet sitter, öronen ploppar ut ett i taget på *"Plopp!"* | `plopp` ×2, fniss (3) | fnissig |
| [16](frames/16.jpg) | 1:37.3 | 4.4 s | Samma | *"Varmt och skönt!"* (1:37.7) | Öronen vickar växelvis | mysig suck (4) | nöjd |
| [17](frames/17.jpg) | 1:41.6 | 4.7 s | Halvbild | *"Och vantarna?"* (1:41.9) | En grå vante glider mot kaninen. Kaninen skakar på huvudet, armarna ner, vanten glider tillbaka till kroken | trumpet pip (6) | trumpen |
| [18](frames/18.jpg) | 1:46.3 | 8.6 s | Närbild | *"Oj då. Kaninen vill visst inte ha vantar."* (1:46.6) … *"Hm … vad gör vi nu?"* (1:51.1) | Kaninen tittar bort, öronen sjunker åt sidorna | trumpet pip (6b) | ledsen, tittar bort |
| [19a](frames/19a.jpg) | 1:54.8 | 7.3 s | Halvbild | *"Titta! Kritan ritar något."* (1:55.1) | Kritan (liten, ingen min) ritar två tumvantar i luften: tummen och muddkanten som egna drag. Halvvägs här | kritan ritar | nyfiken |
| [19b](frames/19b.jpg) | 2:02.2 | 3.0 s | Samma | – | Gisspaus: konturen klar, kritan svajar bredvid | tyst | nyfiken |
| [19c](frames/19c.jpg) | 2:05.2 | 2.8 s | Samma | *"Tumvantar!"* (2:05.3) | Tumvantarna fylls i med rosa inifrån och glimtar | `glitter` | förvånad |
| [20](frames/20.jpg) | 2:08.0 | 7.0 s | Närbild | *"Rosa! Din favoritfärg! Varsågod, kaninen."* (2:08.6) | Kawaii-ögon, öronen reser sig, ett lugnt skutt | förtjust pip (2) | jätteglad (glitter i ögonen) |
| [21](frames/21.jpg) | 2:15.0 | 6.9 s | Samma | *"Ska vi säga tack?"* (2:15.3) … *"Tack!"* (2:19.0) | Paus 2,5 s: barnet säger tack. **Nickar** direkt på *"Tack!"* | nyfiket pip (5), förtjust pip (2b) | glad |
| [22](frames/22.jpg) | 2:21.9 | 4.2 s | Julhallen, helbild | *"Vill du ha vantarna nu?"* (2:22.3) | Kaninen sträcker ut armen mot vantarna. **Nickar** | förtjust pip (2) | jätteglad |
| [23](frames/23.jpg) | 2:26.1 | 2.9 s | Halvbild | *"Då tar vi vanten …"* (2:26.4) | Den första vanten glider mot armen … | – | glad |
| [24](frames/24.jpg) | 2:29.0 | 5.2 s | Halvbild | *"Oj! Inte på örat!"* (2:29.6) | … och landar på högra örats spets. Kaninen tittar upp, förvånad | `plopp`, fniss (3) | förvånad → fnissig |
| [25](frames/25.jpg) | 2:34.2 | 8.2 s | Halvbild | *"Vanten ska sitta på tassen. Dra, dra … på!"* (2:34.5) | Vanten glider ner från örat till tassen, sitter på *"på!"* | `prassel-tyg`, förtjust pip (2b) | glad |
| [26](frames/26.jpg) | 2:42.3 | 6.0 s | Julhallen, helbild | *"Oj, oj! Andra vanten åkte iväg!"* (2:43.3) | Den andra vanten faller lugnt, glider åt höger över golvet och försvinner bakom korgen. Barnet ser det hända | frågande pip (7) | förvånad |
| [27](frames/27.jpg) | 2:48.4 | 4.2 s | Halvbild | *"Kaninen vet inte var."* (2:48.7) | Kaninen tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte) | frågande pip (7b) | nyfiken |
| [28a](frames/28a.jpg) | 2:52.6 | 5.4 s | Julhallen, helbild | *"Kan du hjälpa kaninen? Kan du se var vanten är?"* (2:52.9) | Bred bild på frågan: kaninen, hängaren och korgen | – | nyfiken |
| [28b](frames/28b.jpg) | 2:58.0 | 5.0 s | Närbild, korgen (klipp) | – | Paus 5 s: tummen sticker fram vid korgens högra kant. Efter 3 s skimrar den svagt | tyst, ett svagt `tindra` | – |
| [29](frames/29.jpg) | 3:03.0 | 5.6 s | Halvbild | *"Ja, där! Ja, bakom korgen!"* (3:03.0) | Vanten skimrar tydligt, kaninen gör ett lugnt skutt | `tindra`, förtjust pip (2) | jätteglad |
| [30](frames/30.jpg) | 3:08.6 | 4.4 s | Halvbild | *"Dra, dra … på!"* (3:08.9) | Vanten glider fram ur gömstället och upp på andra tassen | `prassel-tyg` | glad |
| [31](frames/31.jpg) | 3:13.1 | 5.7 s | Julhallen, helbild | *"Nu är du färdig! Varm och go."* (3:13.5) | Allt på: pannband, overall, stövlar, rosa vantar. Ett lugnt skutt | mysig suck (4) | nöjd |
| [32](frames/32.jpg) | 3:18.7 | 4.5 s | Julhallen, helbild → kritsvep | *"Nu går vi ut!"* (3:19.3) | Tre lugna hopp till dörren, dörren öppnas (en vit ljus springa), kritsvep | `steg` ×3, kritsvep | jätteglad |
| [33](frames/33.jpg) | 3:23.2 | 7.3 s | Pulkabacken, helbild | *"Oj, vad mycket snö! Men … ingen pulka?"* (3:23.8) | Snöflingor. Kaninen står nedanför backen och tittar upp mot krönet | ⚠ knarr i snö saknas, frågande pip (7) | nyfiken |
| [34a](frames/34a.jpg) | 3:30.5 | 6.5 s | Samma | *"Titta! Kritan ritar igen."* (3:30.8) | Kritan ritar pulkans kontur på krönet (`pulka-kontur.json`), kort väntan | kritan ritar | nyfiken |
| [34b](frames/34b.jpg) | 3:37.1 | 4.5 s | Samma | *"En pulka! Varsågod, kaninen."* (3:37.2) | Pulkan fylls i | `glitter` | jätteglad |
| [35](frames/35.jpg) | 3:41.5 | 3.5 s | Krönet, halvbild (klipp) | *"Tack, kritan!"* (3:41.9) | Kaninen sitter på pulkan högst upp | förtjust pip (2) | jätteglad |
| [36](frames/36.jpg) | 3:45.0 | 6.5 s | Samma | *"Kan du räkna till tre?"* (3:45.3) | Paus 4 s: kaninen gungar lite fram på varje tal barnet räknar | tyst | glad |
| [37](frames/37.jpg) | 3:51.5 | 4.8 s | Samma | *"Ett … två … tre …"* (3:51.7) | Malin räknar, kaninen gungar på varje tal | – | glad |
| [38](frames/38.jpg) | 3:56.3 | 4.3 s | Pulkabacken, helbild | *"Wiii!"* (3:56.3) | Pulkan glider nedför backen i en bana (2,2 s), snöpuffar bakom medarna | `wiii`, `swoosh`, fniss (3) | jätteglad |
| [39](frames/39.jpg) | 4:00.6 | 10.3 s | Pulkabacken, helbild (klipp till krönet) | *"En gång till! Ett … två … tre … wiii!"* (4:00.9) | Högst upp igen, en tur till, kortare | `swoosh` | jätteglad |
| [40](frames/40.jpg) | 4:10.9 | 5.4 s | Halvbild | *"Hej då, kaninen! Hej då, pulkan!"* (4:11.3) | Kaninen på pulkan vinkar (armen bakom kroppen), vanten följer med | `kanin-hejda` | jätteglad |
| [41](frames/41.jpg) | 4:16.2 | 4.6 s | Samma | *"God jul! Vi ses snart!"* (4:16.5) | Kaninen vinkar klart | mysig suck (4b) | glad |
| [42](frames/42.jpg) | 4:20.8 | 2.5 s | Kritirisen | – | Kritirisen drar ihop sig runt kaninen på pulkan | mattan klingar ut | glad |
<!-- /tabell -->
