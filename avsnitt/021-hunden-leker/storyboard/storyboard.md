# Storyboard – Avsnitt 021 · Hunden leker (utkast)

**Längd:** 2:46.3 med 1 s intro, utan outro (räknat av bygg.mjs ur raderna).

## Platshållare och öppet
- **Malins röst** är inspelad och uppmätt (`assets/ljud/roster/hunden-leker/`, `../rost.txt`, 2026-11-11); radernas längder räknas ur den. "där!" i 15, 16 och 20 är mätt med silencedetect (`DAR` i `rader.mjs`). `01-kritan-ritar` är omklippt (1,70 s) och hörs hel.
- **Ljud som saknas:** en mysig `suck` (rad 3, manus "Hundens röst") och ett långt fniss (rad 18b: manus säger "`vov-fniss` (det långa)", men alla `vov-fniss` är 0,6–0,8 s; animatiken lägger tre korta i rad). `vov-pip` är enligt ljud-README ett *glatt* litet vov, inte frågande; det står in i 2, 3 och 13 tills ett frågande ljud finns.
- **Introt** är bara logotypen i 1 s (Sanna 2026-11-11). Bild 00 är ett platshållarkort. Ingen outro: filmen slutar med kritirisen (22).
- **Bollen** är randig med prickar (`lekplatsen-saker/boll.png`), inte enfärgad som manuset säger. Rullar den utan att snurra ser den ut att glida. Se rapporten.
- Rader där hunden *rör sig* visas som en stillbild med röda streckade pilar; rörelserna görs i kodscenen enligt manusets "Så rör det sig".

**Så är den gjord.** Som 020:s: [`scen.html`](scen.html) ritar varje rad (`?rad=11` visar en), [`rader.mjs`](rader.mjs) har raderna och replikerna, och [`bygg.mjs`](bygg.mjs) tar en stillbild per rad till [`frames/`](frames/), skriver tabellen nedan och [`index.html`](index.html), och med `--animatik` också `animatik.mp4`. Kör från repots rot:

```bash
node avsnitt/021-hunden-leker/storyboard/bygg.mjs --animatik
```

**Filmtid = scentid + 1,0** (introts längd). Tiderna i tabellen räknas från filmens början, alltså med introt.

**Uppställningen** (andra platser än Tittut-shorten med hunden, där kullen stod till vänster och lekstugan till höger): lekstugan till vänster, hunden mitt på gången med hinken bredvid, stöveln till höger och rutschkanekullen längst till höger. Bollen gömmer sig tre gånger: bakom stöveln (höger), bakom lekstugan (vänster), bakom kullen (längst till höger, utanför halvbilden i 13). Varje gång syns en röd bit av bollen.

**Kameran:** hårda klipp mellan stilla utsnitt (helbild, halvbild på hunden, närbild på hunden, bollens utsnitt när kritan ritar, närbild på kullen i frågans paus). Den enda zoomen är från papperet in i teckningen.

**Inga djurnamn** i det som sägs. Ingen text i bilderna utom introkortets platshållare.

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Hunden / bollen, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 1.0 s | Intro | – | Lilla Kritans logotyp i 1 s. Ingen jingel, inget titelkort (Sanna 2026-11-11) | – | – |
| [01a](frames/01a.jpg) | 0:01.0 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:02.0) | Kritan ritar hundens kontur i lugna drag (ca 7 s totalt), halvvägs här | kritan ritar, skogsljud | – |
| [01b](frames/01b.jpg) | 0:07.0 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:07.0) | Konturen ritas klar, sedan väntar kritan bredvid och vickar lugnt (ingen knackning): barnet gissar | kritan ritar, skogsljud | – |
| [01c](frames/01c.jpg) | 0:14.5 | 3.7 s | Papperet, helbild → zoom in | *"Oj! En hund!"* (0:15.1) | Den riktiga hunden fylls i inifrån. Sista 0,8 s: zoom in i teckningen (avsnittets enda zoom) | – | glad |
| [1](frames/1.jpg) | 0:18.2 | 5.9 s | Lekplatsen, helbild | *"Hej, hunden! Hej, hej!"* (0:19.8) | Hunden trippar in från vänster, stannar mitt på gången och vinkar (höger arm, bakom kroppen). Hinken står bredvid | små steg, `vov-babbel`, svansen viftar | glad → jätteglad |
| [2](frames/2.jpg) | 0:24.2 | 3.8 s | Lekplatsen, halvbild | – | Hunden tittar åt vänster, sedan åt höger (ögonen och `rikt ±0,3`, huvudet vänds inte). Inget att leka med i närheten. Tyst 3 s | frågande `vov-pip` | nyfiken |
| [3](frames/3.jpg) | 0:28.0 | 8.7 s | Lekplatsen, närbild hunden | *"Oj då. Hunden har visst inget att leka med."* (0:28.4) … *"Hm … vad gör vi nu?"* (0:32.5) | Öronen faller (12°), kroppen sjunker lite (`strack −0,04`). Paus 1 s mellan replikerna | ⚠ `suck` saknas, sedan `vov-pip` | lite ledsen |
| [4a](frames/4a.jpg) | 0:36.6 | 4.3 s | Lekplatsen, helbild | *"Titta! Kritan ritar något."* (0:36.9) | Kritan kommer in uppifrån till vänster (hunden står till höger om bollens plats), mot marken framför hunden | – | nyfiken |
| [4b](frames/4b.jpg) | 0:41.0 | 7.0 s | Lekplatsen, bollens utsnitt (klipp) | – | Kritan ritar bollens kontur i ett drag (4 s), väntar sedan bredvid och vickar: gisspaus 3 s | kritan ritar | nyfiken |
| [4c](frames/4c.jpg) | 0:48.0 | 5.0 s | Lekplatsen, bollens utsnitt → helbild (klipp mitt i) | *"En boll! Varsågod, hunden."* (0:48.4) | Den riktiga bollen fylls i inifrån och guppar en gång på marken. Kritan flyger ut uppe till höger | glitter | förvånad |
| [5](frames/5.jpg) | 0:53.0 | 5.9 s | Lekplatsen, halvbild hunden och bollen | *"Ska vi säga tack?"* (0:53.3) | Hunden tittar på bollen (riktning höger), öronen reser sig. Paus 4 s: barnet säger tack | nyfiket `vov-ja` sent i pausen | nyfiken |
| [6](frames/6.jpg) | 0:58.8 | 4.0 s | Samma | *"Tack!"* (0:58.8) | Hunden nickar (trycks ihop och sträcks en gång), svansen viftar | `vov-ja`, svansen viftar | jätteglad |
| [7](frames/7.jpg) | 1:02.8 | 5.9 s | Lekplatsen, helbild | *"Oj! Nu puffar hunden på bollen!"* (1:04.1) | Hunden lutar sig fram (`luta 4`) och puffar bollen med nosen; bollen glider en bit och guppar | `nos`, mjukt `boing` | fnissig |
| [8](frames/8.jpg) | 1:08.7 | 7.5 s | Samma | *"Ni pratar visst med varandra."* (1:12.3) | Utbytet: hunden svarar, bollen guppar, hunden svarar, bollen guppar. En sak rör sig i taget. Repliken efter | vov – boing – vov – boing (`vov-babbel`) | fnissig |
| [9](frames/9.jpg) | 1:16.2 | 6.8 s | Samma | *"Oj! Bollen hoppade ner i hinken!"* (1:18.0) | Hunden puffar en gång till, bollen gör en båge och landar mjukt i hinken (en röd kant syns ovanför hinkens kant) | `hink-dunk`, `vov-fniss` | förvånad → fnissig |
| [10](frames/10.jpg) | 1:23.0 | 4.3 s | Lekplatsen, helbild | *"Ska bollen rulla nu?"* (1:23.3) | Bollen ligger framför hunden igen (klipp: ingen visar hur den kom upp ur hinken) | `vov-ja` | glad |
| [11](frames/11.jpg) | 1:27.3 | 7.6 s | Lekplatsen, helbild | *"Rulla, rulla … där! Bakom stöveln."* (1:27.6) | Bollen rullar åt höger och stannar bakom stöveln, en röd skiva syns bredvid skaftet. Hunden travar dit efter repliken | `rull`, `vov-ja` på "där", trav | glad |
| [12](frames/12.jpg) | 1:34.9 | 7.0 s | Lekplatsen, helbild | *"Rulla, rulla … där! Bakom lekstugan."* (1:35.2) | Bollen rullar hela vägen åt vänster och stannar bakom lekstugan, en röd bit syns vid hörnet. Hunden travar dit | `rull`, `vov-ja` på "där", trav | glad |
| [13](frames/13.jpg) | 1:41.9 | 7.5 s | Lekplatsen, halvbild hunden | *"Oj, nu är bollen borta. Hunden vet inte var."* (1:42.9) | Bollen rullar ut ur bild åt höger. Hunden tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte). Kullen syns inte i utsnittet | `rull`, frågande `vov-pip` | nyfiken |
| [14a](frames/14a.jpg) | 1:49.4 | 4.8 s | Lekplatsen, närbild hunden | *"Kan du hjälpa hunden? Kan du se var bollen är?"* (1:49.7) | Frågan till barnet. Hunden tittar ut mot tittaren, öronen lyssnar | – | nyfiken |
| [14b](frames/14b.jpg) | 1:54.3 | 5.0 s | Lekplatsen, närbild kullen (klipp) | – | Paus 5 s, bara kullen och rutschkanan syns. En röd kant av bollen sticker fram vid kullens fot. Efter 3 s skimrar den svagt | tyst, ett svagt `lysmask` | – (hunden utanför bild) |
| [15](frames/15.jpg) | 1:59.3 | 5.5 s | Samma närbild | *"Ja, där! Ja, bakom rutschkanan!"* (1:59.3) | Bollen skimrar tydligt (stjärnor runt kanten) | `tindra`, `vov-ja` (hunden utanför bild) | – |
| [16](frames/16.jpg) | 2:04.7 | 5.0 s | Lekplatsen, helbild | *"Rulla, rulla … där!"* (2:05.0) | Hunden har travat fram till kullen, bollen rullar fram bakom kullen och stannar framför hunden | trav, `rull`, `vov-fniss` | jätteglad |
| [17](frames/17.jpg) | 2:09.7 | 5.0 s | Lekplatsen, halvbild | *"Nu är hunden glad!"* (2:10.0) | Hunden står med bollen bredvid, svansen viftar (±14° kring roten) | `flamt-valp`, `svansvift` | jätteglad |
| [18a](frames/18a.jpg) | 2:14.7 | 7.1 s | Lekplatsen, närbild hunden | *"Kan du kittla hunden på magen?"* (2:15.0) | Frågan, sedan paus 4 s. Efter 2 s skimrar magen svagt | tyst, svagt `lysmask` på magen | nyfiken |
| [18b](frames/18b.jpg) | 2:21.8 | 4.5 s | Samma närbild | *"Kittel, kittel, kittel!"* (2:21.8) | Kittel: hela figuren lutar ±5° tre gånger, fnissigt ansikte med öppna ögon, svansen viftar. Inga armar mot magen | `vov-fniss` ×3 (⚠ inget långt fniss finns, se storyboard.md), `svansvift` | fnissig, öppna ögon |
| [19](frames/19.jpg) | 2:26.3 | 7.0 s | Lekplatsen, helbild | *"Nu leker hunden! Hopp, hopp!"* (2:26.6) | Två lugna skutt (20 px upp, tryck ihop före och efter) på "Hopp, hopp!", bollen bredvid | `hopp-mjuk` ×2, `vov-fniss` | jätteglad |
| [20](frames/20.jpg) | 2:33.3 | 5.0 s | Lekplatsen, halvbild | *"Hej då, hunden! Hej då, bollen!"* (2:33.6) | Hunden vinkar (höger arm bakom kroppen, snett ut), bollen bredvid | `vov-babbel` | jätteglad |
| [21](frames/21.jpg) | 2:38.3 | 5.5 s | Samma | *"Hej då! Vi ses snart!"* (2:38.5) | Hunden vinkar klart, armen sjunker | `vov-fniss` | glad |
| [22](frames/22.jpg) | 2:43.8 | 2.5 s | Lekplatsen → kritirisen | – | Kritirisen drar ihop sig runt hunden och bollen | – | glad |
<!-- /tabell -->
