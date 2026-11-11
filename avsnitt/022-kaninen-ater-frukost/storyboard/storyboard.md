# Storyboard – 022 Kaninen äter frukost

**Status:** grind 5 (animatik), utkast 2026-11-11. Byggd från [`manus.md`](../manus.md) innan manuset är godkänt rad för rad, så raderna kan ändras.

**Längd:** 2:51.4 med introt (1 s), räknat av bygg.mjs ur raderna och Malins uppmätta repliker.

En stillbild per uppslag, i samma uppställning som 020 (grisen bakom badkaret): kaninen står bakom bordet och syns från magen och upp; allt under bordskanten döljs av bordet. Röda streckade pilar visar rörelsen (bara i storyboarden). Bygg om med:

```
node avsnitt/022-kaninen-ater-frukost/storyboard/bygg.mjs --animatik
```

- Bilderna: [`index.html`](index.html) · animatiken: [`animatik.mp4`](animatik.mp4) · raderna: [`rader.mjs`](rader.mjs) · scenerna: [`scen.html`](scen.html)
- Introt är 1 s logotyp, ingen jingel och inget titelkort; inget outro. Filmen = scenen + 1,0 s.
- Varje rad med en replik har 0,7 s extra luft (`GLES`), utom ritintrot.
- Malins repliker är inspelade (tagningen 2026-11-11, `../rost.txt`) och längderna uppmätta i `ROST`. Var "tugga" och "mums!" ligger i replikerna står i `ORD` (silencedetect).

## Väntar på (ljud)

| Vad | Status nu | Byts i |
|---|---|---|
| **Magkurr** | saknas (Openverse först) | `rader.mjs`, rad 2 |
| **Kaninens känsloljud** | `hej-babbel` och `ja-babbel` finns; förvånat, ledset, nyfiket, frågande, mysig suck och ett eget hej då är inte valda | `rader.mjs` (rader med `null`) |

## Köket och bordet i scenen

Köket är [`bakgrunder/koket.md`](../../../bakgrunder/koket.md) (`koket-v1.jpeg`, fyller 1920 × 1080) och bordet [`rekvisita/bordet.md`](../../../rekvisita/bordet.md) (`cut/bordet.png`). Måtten står överst i `scen.html` (`BORD`, `BORD_Y`).

- **Bordet i skala 0,82**, ca 820 × 460 px, mitt på x 960. Dukens överkant ligger på **y 640**, där kaninen (skala 0,8, riggens y 620 vid kanten) försvinner bakom bordet: den syns från magen och upp. Fötterna står på golvet på y ca 1060.
- **Större skala går inte:** bordet är ca 3,5 : 1, så vid 1000 px bredd hamnar fötterna och fållen under bildkanten när överkanten ligger på y 640.
- **Ingen synlig skiva:** duken är sedd rakt framifrån, så maten står på bordets överkant (y 648), inte på en skiva.
- **Kaninen klipps vid fållen** (y ca 993), så att den inte syns mellan bordsfötterna när den sjunker i tittut.
- **Golvlinjen** i köket ligger på y ca 816, lägre än platshållarens 700. Bordets fötter står framför den, så det fungerar.
- **Smalare bord än planerat (820 i stället för 1000 px):** när kaninen lutar sig mot bananen och glaset syns armen bredvid bordets rundade ände. I ätbilderna 13, 18 och 19 göms därför armarna (som grisens i 020), och kaninen glider bara ca 100 px i sidled och lutar 12°.

## Testbilderna (manusets punkt 5 under Öppet)

- **Kaninen böjer sig mot bananen** ([13](frames/13.jpg)): fungerar. Kaninen glider åt vänster bakom bordet, lutar 12° och sjunker 35 px (riggen); munnen är öppen precis vid bananen och tuggan är ett hack i bananens övre kant. Ansiktet syns hela tiden. Det är en glidning i sidled plus en lutning, inte en böjning i midjan (riggen kan inte böja sig), men det läses som att den äter. Armarna är gömda i ätbilderna, annars syns de bredvid bordets ände.
- **Bara öronen ovanför bordet** ([10](frames/10.jpg)): fungerar. Med sjunk 445 (riggen) syns båda öronen ca 120 px ovanför duken och inget av huvudet. Det kräver att maten står mellan och utanför öronen (se måtten ovan); i första försöket, med större mat, täckte smörgåsen och glaset öronen.
- **Mjölkmustaschen** ([20](frames/20.jpg)): läsbar i närbild. En vit vågig båge under nosen (bred som nosfläcken) som döljer leendet; ögonen är glada bågar. I helbild ([21](frames/21.jpg), [22](frames/22.jpg)) blir den liten men syns.

## Det riggen inte kan (löst på annat sätt)

- **Böja sig fram mot maten:** riggen ser rakt framifrån och har ingen midja. Löst med glidning i sidled (pose `x`), lutning, `upp: -1` och sjunk. Smörgåsen äts rakt nedåt.
- **Tugga:** kinderna kan bara tändas starkare (`kind`), munnen öppnas och stängs. "Kinderna rör sig två gånger" blir munnen som öppnas två gånger i scenen.
- **Klappa magen** (rad 21): posen `magen` skulle hamna bakom bordet, så kaninen blundar nöjt och öronen hänger, som manuset redan säger.
- **Nicka** (rad 6): kroppen trycks ihop och sträcks (som grisen i 020), huvudet kan inte nicka för sig.
- **Kritan knackar inte** i gisspauserna (Sannas regel): den svajar bara.

## Tabell

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Kaninen, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 1.0 s | Intro | – | Lilla Kritans logotyp i 1 s. Ingen jingel, inget titelkort (stillbilden är en ruta ur 020:s intro) | – | – |
| [01a](frames/01a.jpg) | 0:01.0 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:02.0) | Kritan ritar kaninens kontur i ett lugnt drag (ca 7 s totalt), halvvägs här | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:07.0 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:07.0) | Konturen ritas klar, sedan väntar kritan bredvid i ca 4 s och svajar (ingen knackning): barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:14.5 | 3.6 s | Papperet, helbild → zoom in | *"Oj! En kanin!"* (0:15.1) | Den riktiga kaninen fylls i inifrån. Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:18.1 | 7.4 s | Köket, helbild | *"Hej, kaninen! Hej, hej! God morgon!"* (0:20.3) | Kaninen trippar in från vänster, ställer sig bakom bordet (syns från magen och upp) och vinkar på "Hej" (armen bakom kroppen, snett ut) | små steg, `hej-babbel-1` | glad |
| [2](frames/2.jpg) | 0:25.4 | 5.3 s | Köket, halvbild | *"Oj! Det kurrar i magen!"* (0:26.6) | Magen kurrar: kroppen breddas lite två gånger (bred +0,03), kaninen tittar ner. Kurret före repliken | ⚠ `magkurr` saknas (Openverse först), ⚠ förvånat babbel ej valt | förvånad, tittar ner |
| [3](frames/3.jpg) | 0:30.8 | 7.7 s | Köket, närbild bordet | *"Oj då. Bordet är visst tomt."* (0:31.1) … *"Hm … vad gör vi nu?"* (0:34.5) | Bordet är tomt. Öronen faller. Paus 1 s mellan replikerna | ⚠ litet ledset babbel ej valt | lite ledsen |
| [4a](frames/4a.jpg) | 0:38.5 | 4.0 s | Köket, helbild | *"Titta! Kritan ritar något."* (0:38.8) | Kritan kommer in i bild uppifrån höger, mot bordet | – | nyfiken |
| [4b](frames/4b.jpg) | 0:42.5 | 7.5 s | Köket, helbild | – | Kritan ritar bananens kontur på bordet (ca 4 s), väntar sedan ca 3 s bredvid och svajar: gisspaus | kritan ritar | nyfiken |
| [4c](frames/4c.jpg) | 0:50.0 | 5.0 s | Köket, helbild | *"En banan! Varsågod, kaninen."* (0:50.2) | Den riktiga bananen fylls i inifrån | glitter | förvånad |
| [5](frames/5.jpg) | 0:55.0 | 7.1 s | Köket, halvbild | *"Ska vi säga tack?"* (0:56.2) | Kaninen tittar på bananen, öronen reser sig. Paus 4 s: barnet säger tack | ⚠ nyfiket babbel ej valt, sedan tyst | nyfiken |
| [6](frames/6.jpg) | 1:02.1 | 3.5 s | Samma | *"Tack!"* (1:02.1) | Kaninen nickar (kroppen trycks ihop och sträcks en gång) | `ja-babbel-1` | jätteglad |
| [7a](frames/7a.jpg) | 1:05.6 | 5.0 s | Köket, helbild | *"Kritan ritar mer …"* (1:05.9) | Kritan ritar smörgåsens kontur mitt på bordet. Paus 2 s | kritan ritar | nyfiken |
| [7b](frames/7b.jpg) | 1:10.5 | 3.0 s | Köket, helbild | *"En smörgås!"* (1:10.7) | Smörgåsen fylls i | glitter | glad |
| [8a](frames/8a.jpg) | 1:13.5 | 3.0 s | Köket, helbild | – | Kritan ritar glasets kontur till höger på bordet | kritan ritar | nyfiken |
| [8b](frames/8b.jpg) | 1:16.5 | 3.5 s | Köket, helbild | *"Och ett glas mjölk!"* (1:16.7) | Glaset med mjölk fylls i, kritan flyger ut uppåt höger | glitter | glad |
| [9](frames/9.jpg) | 1:20.0 | 4.6 s | Köket, halvbild | *"Oj, så mycket gott!"* (1:21.0) | Kaninen ser all mat, öronen vippar | `ja-babbel-2`, fniss | jätteglad |
| [10](frames/10.jpg) | 1:24.7 | 7.9 s | Köket, helbild | *"Oj! Var är kaninen?"* (1:25.9) | Kaninen sjunker rakt ner bakom bordet tills bara öronen syns. Paus 4 s: barnet letar | tyst, ett litet fniss efter 2 s | – (bakom bordet) |
| [11](frames/11.jpg) | 1:32.6 | 3.3 s | Köket, helbild | *"Tittut!"* (1:32.6) | Kaninen kommer rakt upp på "Tittut!" | `ja-babbel-3`, fniss | jätteglad |
| [12](frames/12.jpg) | 1:35.8 | 5.0 s | Köket, halvbild | *"Ska du äta frukost nu?"* (1:36.1) | Kaninen bakom maten. **Shorten börjar här** | `ja-babbel-4` | glad |
| [13](frames/13.jpg) | 1:40.8 | 6.9 s | Köket, närbild bordet | *"Först bananen. En tugga … mums!"* (1:41.1) | Kaninen sjunker och lutar sig mot bananen, munnen öppen: en bit klipps bort på "tugga", resten är borta på "mums!". Kinderna rör sig två gånger | `nom`, `mums` | munnen öppen |
| [14](frames/14.jpg) | 1:47.7 | 7.3 s | Köket, närbild bordet | *"Och smörgåsen. En tugga … mums!"* (1:48.0) | Samma med smörgåsen: rakt ner mot den, en bit borta och smulor på "tugga" | `nom`, `mums` | munnen öppen |
| [15](frames/15.jpg) | 1:55.0 | 6.9 s | Köket, halvbild | *"Oj, en liten bit är kvar. Kaninen vet inte var."* (1:55.3) | Kaninen tittar åt vänster, sedan åt höger (ögon och nos, huvudet vänds inte) | ⚠ frågande babbel ej valt | nyfiken |
| [16a](frames/16a.jpg) | 2:01.9 | 5.2 s | Köket, närbild glaset (klipp) | *"Kan du hjälpa kaninen? Kan du se var biten är?"* (2:02.2) | En gul bananbit sticker fram bakom glaset | – | – |
| [16b](frames/16b.jpg) | 2:07.1 | 5.0 s | Samma | – | Paus 5 s. Efter ca 3 s skimrar biten svagt | tyst, ett svagt `lysmask` | – |
| [17](frames/17.jpg) | 2:12.1 | 5.6 s | Samma | *"Ja, där! Ja, bakom glaset!"* (2:12.1) | Biten skimrar tydligt | `tindra`, `ja-babbel-5` | – |
| [18](frames/18.jpg) | 2:17.7 | 4.8 s | Köket, närbild bordet | *"En tugga … mums!"* (2:18.0) | Kaninen lutar sig mot glaset och tar biten bakom det, borta på "mums!" | `nom`, `mums` | munnen öppen |
| [19](frames/19.jpg) | 2:22.5 | 5.9 s | Köket, närbild bordet | *"Oj! Nu dricker kaninen mjölk!"* (2:22.8) | Kaninen lutar sig mot glaset, mjölken i glaset sjunker | `slurp` | blundar |
| [20](frames/20.jpg) | 2:28.4 | 5.7 s | Köket, närbild kaninen | *"Ha ha! En mjölkmustasch!"* (2:29.0) | Kaninen reser sig med en vit mjölkmustasch. **Shorten slutar här** | fniss | fnissig |
| [21](frames/21.jpg) | 2:34.1 | 5.7 s | Köket, halvbild | *"Mmm … mätt i magen."* (2:34.4) | Kaninen blundar nöjt, öronen hänger (posen magen syns inte bakom bordet) | `mmm`, ⚠ mysig suck saknas | nöjd, blundar |
| [22](frames/22.jpg) | 2:39.8 | 4.0 s | Köket, helbild | *"Hej då, kaninen!"* (2:40.1) | Kaninen vinkar (armen bakom kroppen, snett ut) | `hej-babbel-2` (⚠ ett eget hej då-ljud saknas) | glad |
| [23](frames/23.jpg) | 2:43.8 | 5.1 s | Samma | *"Hej då! Vi ses snart!"* (2:43.8) | Kaninen vinkar klart, armen sänks | fniss | jätteglad |
| [24](frames/24.jpg) | 2:48.9 | 2.5 s | Köket → kritirisen | – | Kritirisen drar ihop sig runt kaninen | – | glad |
<!-- /tabell -->
