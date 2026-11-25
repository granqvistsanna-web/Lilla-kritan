# Avsnitt 056 – Räven går och lägger sig (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-25 ("Ja, vidare till saker"). **Räven i stället för grisen** (Sanna 2026-11-25). **Samtalsrepliker tillagda 2026-11-25** (10 nya, märkta 🆕), ✅ godkända 2026-11-25 ("Ja, de är bra"). Grind 2 (saker): täcket mintgrönt nr 1 ✅ valt 2026-11-25; sovbilden nr 4 ✅ vald 2026-11-25 (Sanna: "Keep nr 4"), urklippt till `saker/sovbild/cut/rav-sover.png` med 7 px kant (ca 1 %); de första fyra (lång fyrbent räv) kasserade. Nattlampan nr 4 ✅ vald 2026-11-25, urklippt till `saker/nattlampa/cut/nattlampa.png`. **Grind 2 klar.** Nattlampan: Flow gjorde den men den gick inte att hämta, görs om. **Grind 3 (rösten) 2026-11-25:** ElevenLabs, Malin, v3, två varianter (`produktion/ljud-original/roster/raven-gar-och-lagger-sig/malin-tagning-1a.mp3` 2:16 och `-1b.mp3` 2:03). 1a delad i 44 filer i `assets/ljud/roster/raven-gar-och-lagger-sig/`, alla stämmer mot manuset med whisper; 43 klipptes om för hand (slutade tvärt), alla normaliserade till −3 dBFS, längderna i `rost-langder.txt` (95 s tal). ✅ **Godkänd 2026-11-25** (Sanna: alla 44 repliker är bra). **Grind 4 klar 2026-11-25:** första tagningarna (`rav-gullig-1…8`, `rav-fniss-1` och `-3`, `lampa-klick-1`). **Grind 5 (animatik) 2026-11-25:** `storyboard/` (rader.mjs, scen.html, bygg.mjs; förlaga 055 och 026:s sovrum), 42 stillbilder med reaktionsslagen som egna bilder, 3:12 med loggan, `storyboard/animatik.mp4` med Malin, rävens ljud och effekterna. Tiderna för scenen i `scener/sovrummet/rader.json`. Uppe på feedbacksidan. ✅ **Godkänd 2026-11-25** (Sanna: "The 056 animatic looks good"). **Grind 6 (förhandsvisning) 2026-11-25:** hela scenen i kod, `scener/sovrummet/index.html` (render `scener/render.mjs`, kopia av 055:s): ritintrot (nallen), räven går in och hoppar upp i sängen över huvudgaveln, lampan släcks, kritan ritar, suddar och ritar nattlampan (liten, stor, lagom), skuggan på väggen, nallen under täcket med örat, sovbilden tar över i det mörkaste (andas med 051:s mask), nallen sover bredvid, kritirisen. `--snabb` (960×540, 15 fps); `film/satt-ihop.sh` (som 057) sätter det gemensamma bilderboksintrot först (feedback "use real intro", fixad), `film/avsnitt-056.mp4` 3:15, −14 LUFS. Uppe på feedbacksidan (056-1125-2045). **Feedback 25/11 kväll, fixad:** nallen har ögon och nos både i kritteckningen och i bilden (0:12); rävens öron utan hack i riggen (0:22, Sannas ja, `karaktarer/raven-rut.md`); turkosa sovrummet, och sängen är bäddad: täcket ligger på madrassen från början och nallen sitter ovanpå (0:39); lugnt regn utanför fönstret i stället för stjärnor, och regnljud i stället för syrsor (2:54). Ny förhandsvisning på feedbacksidan. **Väntar på Sannas granskning** innan slutrenderingen. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Förlagor: [026 Zebran går och lägger sig](../026-zebran-gar-och-lagger-sig/manus.md) (sovrummet, sängen, nallen som letas fram) och [040 Leoparden går och lägger sig](../040-leoparden-gar-och-lagger-sig/manus.md) (kritan ritar ett ljus som får lysa hela natten). **Det som är nytt:** problemet är att **det är för mörkt**, och kritan ritar en nattlampa tre gånger: **för liten, för stor, lagom** ([`format/berattelse.md`](../../format/berattelse.md), "Fel först, sedan rätt"). Inget *"Gäsp … god natt!"* tre gånger, ingen gäspa-med, ingen tittut.

**Reglerna för den här omgången (Sanna 2026-11-25):** inga uppmaningar till barnet att göra något med kroppen; barnets del är att **leta** (nallen under täcket). Lärotemat **stor och liten** ligger i nattlamporna, skuggan på väggen och den lilla lampan som nallen får på slutet, aldrig som lektion. Ritintrot ritar **nallen**, inte räven.

**Enkel animation.** Räven kommer in på golvet, hoppar lugnt upp och står **bakom sängen** som zebran i 026, och syns från magen och upp ovanför täcket. Lamporna ritas av kritan på golvet vid huvudgaveln, alltid på **samma ställe**, så att storlekarna går att jämföra. Saker glider på ordet, ingen sak skalas i rörelse (de tre lamporna är tre fasta storlekar av samma bild). Till sist sluter räven ögonen och lägger sig **på sidan** i sängen med huvudet på kudden. Räven sover aldrig stående.

| | |
|---|---|
| **Titel** | Räven går och lägger sig (avsnitt 56). Introt *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`), inget titelkort |
| **Figurer (1)** | **Räven Rut** (v2, riggad, `assets/karaktarer/raven-rut/premium/uttryck.html`, ✅ låst) |
| **Platser (1)** | **Turkosa sovrummet** (`assets/bakgrunder/turkosa-sovrummet/turkosa-sovrummet-v1-utan-dorr.jpeg`, `bakgrunder/sovrummet.md`: mörkt turkos vägg med ränder och stjärnor, runt fönster, nattduksbord med lampa i plattan, varmt trägolv; Sanna 2026-11-25 "new bedroom with teal bg", förut sovrummet v1). Inget platsbyte |
| **Finns** | sängen, täcket, kudden, nallen v2 (ljus), gardinerna, tavlan i sovrummet. Se [Sakerna](#sakerna) |
| **Nya saker (grind 2)** | **nattlampan** (en bild, används i tre storlekar), **rävens sovbild i sängen** (på sidan, som zebrans `zebbe-sover-sang.png`) och troligen **täcket i en ny färg** (Öppet 3). Grind 4: rävens ljudfamilj `rav-gullig` är ny |
| **Kritan ritar** | 0) i ritintrot: **nallen**; 1–3) i sovrummet: **nattlampan** tre gånger, för liten, för stor, lagom |
| **I kod** | lampornas sken, mörkret (varmt kvällsblått, aldrig svart), lugnt regn i fönstret, skuggan på väggen, bulan under täcket, skimret, zzz |
| **Favoriter** | 🦊 räv · 🧸 gosedjur (nallen) · 💡 lampa |
| **Kärna** | Det är kväll. Räven och nallen hoppar upp i sängen. Men när lampan släcks blir det så mörkt att räven inte ser något. Kritan ritar en nattlampa: *"Klick … oj, lampan är för liten!"*, *"Klick … oj, lampan är för stor!"*, *"Klick … nu är lampan lagom!"* "Varsågod!" – "Tack!" I lampans sken blir rävens skugga stor och liten på väggen. Men var är nallen? Barnet hittar örat under täcket. Den lilla lampan får nallen. Räven somnar, lampan lyser hela natten. Hej då! |
| **Barnet övar på** | leta och hitta (nallen under täcket) · gissa vad kritan ritar · stor, liten, lagom · säga tack |
| **Leken** | skuggan på väggen: stor räv, liten räv (uppslag 17–19) |

Längd: ca 4:15 med introt (efter samtalsreplikerna 2026-11-25) (receptet: 3:45–4:15). Tiderna är uppskattade och räknas om ur Malins tagning i grind 3.

## Bågen ([`berattelse.md`](../../format/berattelse.md))

| Punkt | Här |
|---|---|
| Viljan (första 20 s) | räven ska sova med nallen |
| Hindret | lampan släcks och det är för mörkt |
| Försök, miss, försök igen | nattlampan för liten, för stor, lagom |
| En känsla, kort | *"Räven tycker inte om när det är så mörkt."* Öronen faller i 2–3 s, sedan hjälper kritan |
| Barnet löser det | *"Ser du nallen?"*: örat sticker fram under täcket, barnet hittar det |
| Överraskning och återknyt | den lilla lampan, som var *"för liten"*, blir precis lagom för nallen |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | riggens gång, lugnt, med `tass` på stegen, från vänster. Stannar på golvet framför sängen |
| Upp i sängen | ett lugnt hopp (0,9 s, `hopp-mjuk`, `puff` när den landar) upp bakom madrassen. Nallen glider från sängens fotände upp bredvid kudden |
| Kramar nallen | räven lutar sig 6° mot nallen och sluter ögonen (den här raden ber om stängda ögon) |
| Lampan släcks | på *"lampan"*: närbild på nattduksbordets lampa, skenet tonas bort på 0,4 s med `lampa-klick`. Rummet blir varmt kvällsblått, aldrig svart. Fönstret är mörkblått och det regnar lugnt ute. Rävens ögon och nallens konturer syns svagt |
| Ser ingenting | ögonen stora (förvånad min, 0,3 s stilla), sedan `rikt ±0,3` åt vänster och höger med ögonen. Huvudet vänds inte |
| Öronen faller | på *"tycker inte om"*: öronen ner 12°, trynet sjunker lite. 2–3 s, sedan ritar kritan |
| Kritan ritar lampan | kritan kommer in uppe till höger, ritar konturen i ett drag på golvet vid huvudgaveln (lampfoten, den runda skärmen, sladden), väntar och svävar under gisspausen (knackar aldrig), och lampan fylls i inifrån. Kritan är liten (skala 0,33, ×0,7 i närbilden) |
| Klick | på *"Klick"* tänds lampan: ett varmt gult sken växer ut på 0,5 s med `lampa-klick` |
| För liten | lampan är som nallens huvud. Skenet är en liten gul prick runt den, rummet är kvar mörkt. Räven tittar ner på den |
| För stor | lampan är högre än fönstret och når nästan taket. Skenet fyller hela rummet, alldeles ljust. Räven kniper ihop ögonen (bågögon) och fnissar |
| Bort med den stora | kritans linje går baklänges: fyllningen tonas bort och konturen suddas i ett drag åt andra hållet. Rummet blir mörkt igen. Den lilla lampan glider undan till fotänden och står kvar där |
| Lagom | lampan är lika hög som huvudgaveln. Ett mjukt, varmt sken som täcker sängen och räven, resten av rummet är kvällsblått |
| Tack | räven tittar på lampan, öronen reser sig (kawaii-ögon), nickar direkt på *"Tack!"* |
| Skuggan | en mjuk, ljust lila skugga av räven (riggens silhuett, rundad, ingen skärpa) på väggen bakom. Den lagom lampan glider närmare: skuggan blir **stor** (nästan till taket). Lampan glider tillbaka: skuggan blir **liten**. Räven vickar på öronen och skuggan vickar med. Allt lugnt, inget studsar |
| Nallen glider bort | under skuggleken glider nallen sakta ner under täcket vid fotänden (en liten bula i täcket, ett öra sticker fram). Den som tittar noga ser det |
| Letar | räven tittar åt vänster, sedan åt höger, frågande nöff |
| Gisspausen | klipp till närbild på täcket: bulan och örat. Efter 3 s skimrar örat svagt, sedan tydligt på *"Ja, där!"* |
| Nallen kommer fram | nallen glider upp ur täcket och sätter sig bredvid räven, räven lutar sig mot den |
| Den lilla lampan | glider från fotänden upp på sängkanten bredvid nallen. Dess lilla sken lyser precis runt nallen |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, långsamt och sömnigt |
| Somnar | gäspar (O-mun), sluter ögonen, och lägger sig lugnt **på sidan** med huvudet på kudden (sovbilden tar över mitt i rörelsen, som 026). Täcket glider upp till hakan, nallen bredvid, den lagom lampan lyser. Andas lugnt, zzz flyter upp |

## INTRO

*"Djuren hittar på!"* (ca 3,3 s), sedan tomt papper.

## KRITAN RITAR (~14 s) – papper

Kritan ritar **nallen** (Sanna 2026-11-25: en sak ur berättelsen, inte figuren): konturen i ett drag (ca 2,8 s): huvudet, de två runda öronen, kroppen, armarna och fötterna som egna drag. Väntar och svävar, den riktiga nallen v2 fylls i inifrån. Zoom in i teckningen till sovrummet, där nallen redan sitter på sängens fotände. Räven kommer in efteråt.

## SOVRUMMET

| # | Bild (en rörelse) | Malin säger | Räven svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar nallens kontur, den fylls i | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En nalle! | `krita-ritar`, `glitter`, skogsljud |
| 1 | Helbild, sovrummet i kvällsljus, lampan lyser. Räven kommer in på golvet framför sängen och vinkar | Hej, räven! Hej, hej! | `tass`, `rav-gullig-1` (hej) |
| 1b 🆕 | Halvbild, räven visar tänderna i ett stort leende (`flinar`) och nickar i pausen | Har du borstat tänderna? *(paus: räven svarar)* Ja, vad bra! | `rav-gullig-2` (förtjust) i pausen |
| 2 | Halvbild, räven vid sängen. **Närbild på fönstret på *"kväll"*** (kvällshimmel), sedan tillbaka | Det är kväll nu. Snart ska räven sova. | `rav-gullig-5` (nyfiken) |
| 3 | **Närbild på nallen på fotänden på *"nallen"***, räven tittar dit | Och där är nallen! | `rav-gullig-3` (kort fniss) |
| 3b 🆕 | Halvbild, räven tittar på nallen och sedan på sängen, öronen vippar i pausen | Ska nallen också sova? *(paus: räven svarar)* Ja, så klart! | `rav-gullig-7` (pratar) i pausen |
| 4 | Halvbild på sängen, räven hoppar upp bakom madrassen, nallen glider upp bredvid kudden | Hopp! Upp i sängen! (feedback 25/11) | `hopp-mjuk`, `puff`, `nalle-hopp` |
| 5 | Halvbild, räven lutar sig mot nallen och sluter ögonen | Mmm … ja, krama nallen! Så mysigt. *(paus: räven myser)* 🆕 Åh, vad mjuk nallen är! | `rav-gullig-4` (mysig suck) i pausen |
| 6 | **Närbild på lampan på *"lampan"***, skenet släcks, rummet blir kvällsblått | Nu släcker vi lampan. | `lampa-klick` |
| 7 | Närbild i mörkret (reaktionsslaget), rävens ögon blir stora, tittar åt sidorna | Oj! Så mörkt! Räven ser ingenting. | `rav-gullig-5` (nyfiken) |
| 8 | Närbild, öronen faller | Räven tycker inte om när det är så mörkt. *(paus: räven svarar)* 🆕 Nej, det förstår jag. *(paus 1 s)* Hm … räven vill ha lite ljus. | `rav-gullig-6` (trumpen) i pausen |
| 9 | **Kritan ritar en liten lampa** på golvet vid huvudgaveln (närbild): konturen, gisspaus 3 s, fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* | `krita-ritar`, `glitter` |
| 10 | Lampan tänds på *"Klick"*, en pytteliten prick av ljus. Klipp till halvbild: räven tittar ner, ser fortfarande ingenting | En lampa! Klick … oj, lampan är för liten! | `lampa-klick`, `rav-gullig-5` |
| 11 | Helbild, **kritan ritar en jättestor lampa** på samma ställe, högre än fönstret | Kritan ritar en ny lampa. | `krita-ritar`, `glitter` |
| 12 | Lampan tänds på *"Klick"*, hela rummet blir alldeles ljust, räven kniper ihop ögonen | Klick … oj, lampan är för stor! Så ljust! | `lampa-klick`, `rav-fniss-1` |
| 13 | Kritan suddar den stora lampan (linjen baklänges), det blir mörkt igen. Den lilla lampan glider till fotänden | Kritan suddar bort den stora lampan. | `krita-ritar` baklänges, lågt |
| 14 | Halvbild, **kritan ritar en lagom lampa**, lika hög som huvudgaveln | Kritan ritar en lampa till … | `krita-ritar`, `glitter` |
| 15 | Lampan tänds på *"Klick"*, ett mjukt varmt sken över sängen och räven. Närbild: räven blir lättad (suck, axlarna sjunker), sedan kawaii-ögon | Klick … nu är lampan lagom! Varsågod, räven. *(paus: räven svarar, kawaii-ögon)* 🆕 Oj, vad fint lampan lyser! | `lampa-klick`, `tindra`, `rav-gullig-4` (lättad suck) i pausen |
| 16 | Halvbild, räven tittar på lampan | Ska vi säga tack? *(paus 2,5 s)* Tack! | `rav-gullig-5`, sedan `rav-gullig-2`, nickar direkt |
| 17 | Helbild, rävens skugga syns på väggen bakom den | Oj! Titta, en skugga på väggen! | `rav-gullig-5` |
| 18 | Lampan glider närmare, skuggan växer nästan till taket | En stor räv på väggen! | `rav-gullig-7` (pratar) |
| 19 | Lampan glider tillbaka, skuggan blir liten. Räven vickar på öronen, skuggan vickar med | Och en liten räv på väggen! | `rav-fniss-3` |
| 19b 🆕 | Halvbild, räven tittar på Malin (tittaren) och "pratar" om skuggorna, öronen vippar | *(paus: räven pratar)* Jaså, tycker du att skuggan är rolig? Mm, jag också. | `rav-gullig-7` (pratar) före repliken |
| 20 | Halvbild, räven vänder sig mot nallens plats: den är tom. Räven tittar åt vänster, sedan åt höger | Oj, var är nallen? Räven vet inte var nallen tog vägen. | `rav-gullig-5` (nyfiken) |
| 21 | Halvnära över sängen för frågan, sedan **klipp till närbild på täcket**: bulan och ett öra som sticker fram. Örat skimrar efter 3 s | Kan du hjälpa räven? Ser du nallen? *(paus 5,5 s)* | `lysmask-1` lågt |
| 22 | Örat skimrar tydligt | Ja, där! Under täcket! | `tindra`, `rav-gullig-3` (kort fniss) |
| 23 | Nallen glider upp ur täcket och sätter sig bredvid räven, räven lutar sig mot den | Där är nallen! | `prassel-tyg`, `nalle-hopp`, `rav-gullig-2` (förtjust) |
| 24 | **Närbild på den lilla lampan på *"lilla"***: den glider upp bredvid nallen, dess sken lyser runt nallen | Och den lilla lampan … den får nallen! | `glimt`, `rav-gullig-7` (pratar) |
| 25 | Halvbild, räven tittar på den lagom lampan | Lampan får lysa hela natten. | `rav-gullig-4` (mysig suck) |
| 25b 🆕 | Halvbild, räven gäspar stort i pausen (O-mun, ögonen kniper ihop) | Är du sömnig nu? *(paus: räven gäspar)* Ja, räven gäspar! Det hörde jag! | `gaspning` i pausen |
| 26 | Halvbild, räven vinkar sömnigt (armen bakom kroppen) | Hej då, räven! Hej då, nallen! | `rav-gullig-8` (hej då) |
| 27 | Räven sluter ögonen och lägger sig på sidan med huvudet på kudden, täcket upp till hakan, nallen bredvid, båda lamporna lyser, zzz | Hej då! Vi ses snart! | `snark-pip`, `godnatt-pling` |
| 28 | Kritirisen runt räven, nallen och den lagom lampan, 0,6 s svart | – | – |

**Short:** uppslag 8–16 (för mörkt, liten–stor–lagom, tack), ca 60 s. Alternativ: 17–24 (skuggan och nallen under täcket).

## Lösningar från förlagorna

Läst 2026-11-25 (Sanna: *"study the similar videos and how they solve things … so they match and also work"*): scenkoden, `rader.mjs`, manusens rondanteckningar och `git log` för 026, 040 och 051. Feedbacksidan har inga öppna punkter för dem. 056 ligger i **samma platta som 026** (`sovrummet-v1.jpeg`, sängen `sangen.png`), så 026:s mått gäller direkt. Förkortningar: **026** = `avsnitt/026-zebran-gar-och-lagger-sig/scener/sovrummet/` (`rum.js` + `index.html`), **040** = `avsnitt/040-leoparden-gar-och-lagger-sig/scener/kvall/index.html`, **051** = `avsnitt/051-leoparden-vaknar-pa-julafton/scener/julsovrummet/index.html`.

| Handling | Det som var svårt | Så löstes det | Kopiera till 056 |
|---|---|---|---|
| **Hoppa upp och stå bakom sängen** (rad 4) | Benen syntes dubbelt framför kroppen, svanstofsen stack upp över madrasskanten (026, 13/11). Kameran kapade huvudet i hoppet (051, 25/11) | Lagerordningen gör jobbet, ingen klippning: `figurer` ligger **före** `sang` (026 `rum.js` `LAGER`). Under hoppet ligger figuren i `framfig` första halvan (`fram: h<0.5`), sedan i `figurer`. Ben, svans och skugga döljs med opacitet när figuren är i sängen (`bakom`, `utanBen: h>0.15`). Bågen är så hög att fötterna går över sängkanten och nattduksbordet | 026 `rum.js` `LAGER`, `zebra()` (l. 230) och rad `'7'` i `index.html`; 040 `hoppVag()` (l. 372) för själva bågen. Mät `RIM`/`FATKANT` om mot rävens rigg. Kameran följer så att öronen syns hela hoppet |
| **Lampan släcks, mörker och ljus** (rad 6–15) | *"make it more clear först släcka lampan"* (026, 13/11): närbilden på lampan måste stå kvar medan den släcks. Plattans lampskärm är målad ljusgul och lyser fortfarande | 026 `rum({ natt, lampa, mane })`: mörkret är en `rect #2B3A78` med opacitet högst ca 0,26, aldrig svart; lampskenet en radialgradient `#lampsken` (`#FFE7A3`) kring `LAMPA = [1798, 640]`; skärmen mörknas med en `#3A4470`-yta (0,5 · natt · (1 − lampa)); fönstret `FONSTER` (552, 321, r 173) får nattblå himmel och fem blinkande stjärnor. Släcks på ordet: `lampa: 1 − k, natt: k`, k över 0,4 s. Tickandet i `hemmaljud` tystnar samtidigt | 026 `rum.js` `rum()`, `LAMPA`, `FONSTER` rakt av. **Nytt i 056:** nattlampornas sken är samma `#lampsken`-gradient kring lampan i tre radier (liten ca 40, stor fyller rummet och sänker `natt` till 0, lagom ca 300 som plattans lampa). Mörkret ligger **före** lampskenet och stjärnorna i lagren, så att de lyser starkare |
| **Kritan ritar lampan** (rad 9–15) | 026 har egen krit-kod, som `qa-scen.py` flaggar (`krita kod`) från 052. Konturen var svår att gissa utan kännetecknen som egna drag | 051 använder den delade koden: `<script src="/verktyg/kritan-ritar.js">`, `ritaSak`, `kritaScen`, `fyllSak`, kritan väntar vid sidan (`sida: −1`). 026 visar hur saker ritas med egna drag (täckets veck och sömmar, `sak.drag`) och närbilden på ordet | **051:s** krit-kod (skillen `kritan-ritar`). Nattlampans drag: skärmens rundel, foten, sladden. **Nytt:** den stora lampan suddas med samma kontur baklänges (`ritad` 1 → 0) efter att fyllningen tonats bort |
| **Nallen under täcket, örat sticker fram** (rad 19–23) | Finns inte som "öra ur täcket" i 026 eller 040 (026 flyttade nallen till golvet 12/11). 051 löste en gömning bakom sängen: *"tittut bakom sängen i stället för det röda täcket"* (22/11) | 051 `GOM` och `figKlipp(y)` (l. 169): figurgruppen klipps under en linje så att bara öronspetsarna syns, de tittar upp `125 + 10·sin(4t)`. 026 rad `'15'`: skimret börjar 3 s in i pausen (`glans: 0.3·del(a+3, a+3.8)`, `R.skimmer`). 026 rad `'17'`: nallen glider ut i en båge | 051:s klippning, men mot **täckets överkant**: nallen ligger i ett lager under täcket och klipps vid täckets kant, så att bara ena örat syns och inget går genom täcket. Täcket får en liten bula (en rundad yta i täckets färg) där nallen ligger. 026:s skimmer och båge |
| **Lägga sig på sidan, blunda, täcket över** (rad 25b–27) | *"sleeping position needs more work. dont look nice"* (026, 13/11), tre skisser innan Sanna valde en ny samlad sovbild. Täcket ritades först på golvet (14/11). **En övertoning mellan riggen och sovbilden gav "två sängar och en genomskinlig leopard"** (040). Sovbilden som andades som helhet fick sängen att hoppa (051) | 026: egen sovbild som vilar på kodsängens madrass (`SOVK`, l. 240), täcket i lagret `tacke` **klippt vid sängkanten** (`tackeklipp`) under lagret `sang`, så det aldrig hänger framför. 040: bytet rigg → sovbild sker **i det mörkaste** (`byt`) eller bakom något, inte som övertoning; `sovOgon()` (l. 394) sluter ögonen. 051 `sovbild()` (l. 173): bara huvudet och kroppen andas, via masken `andMask` | **Rävens egen sovbild** (grind 2) på 026:s plats (`SOVK`), täcket i kod/urklipp ovanpå, klippt med `tackeklipp`. Riggen gäspar och blundar först (`sovOgon`), sedan sker bytet bakom ett glitter som i 026 (13/11) eller 051:s `puffMoln()`. Andningen med 051:s mask. Nallen och den lilla lampan bredvid kudden |

**Fällor att inte upprepa:** övertona aldrig mellan riggen och sovbilden; låt täcket aldrig hänga framför sängen (klipp vid kanten); dölj ben och svans i sängen; låt inte hela sovbilden andas; rummet aldrig svart (högst ca 0,26–0,42, vinjett högst 0,14); fötterna över sängkanten och nattduksbordet, inte genom; ingen egen krit-kod. Titta på täta bilder (6/s) vid hoppet, när nallen glider ut ur täcket och när räven lägger sig.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. En tagning. Filerna hamnar i `assets/ljud/roster/raven-gar-och-lagger-sig/`. Inga `[excited]` (lät för skarpt 2026-11-22). Tre skratt hos Malin (*"för liten"* `[chuckles]`, *"för stor"* `[laughs]`, *"liten räv"* `[giggles]`).

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En nalle!
[happy] Hej, räven! Hej, hej!
[curious] Har du borstat tänderna?
[happy] Ja, vad bra!
[warmly] Det är kväll nu. Snart ska räven sova.
[happy] Och där är nallen!
[curious] Ska nallen också sova?
[warmly] Ja, så klart!
[cheerfully] Hopp! Upp i sängen!
[happy sigh] Mmm … ja, krama nallen! Så mysigt.
[warmly] Åh, vad mjuk nallen är!
[warmly] Nu släcker vi lampan.
[surprised] Oj! Så mörkt! Räven ser ingenting.
[softly] Räven tycker inte om när det är så mörkt.
[softly] Nej, det förstår jag.
[curious] Hm … räven vill ha lite ljus.
[happy] Titta! Kritan ritar något.
[happy] En lampa!
[chuckles] Klick … oj, lampan är för liten!
[cheerfully] Kritan ritar en ny lampa.
[laughs] Klick … oj, lampan är för stor! Så ljust!
[playfully] Kritan suddar bort den stora lampan.
[curious] Kritan ritar en lampa till …
[happy] Klick … nu är lampan lagom!
[warmly] Varsågod, räven.
[happy] Oj, vad fint lampan lyser!
[warmly] Ska vi säga tack?
[happy] Tack!
[surprised] Oj! Titta, en skugga på väggen!
[happy] En stor räv på väggen!
[giggles] Och en liten räv på väggen!
[warmly] Jaså, tycker du att skuggan är rolig? Mm, jag också.
[curious] Oj, var är nallen? Räven vet inte var nallen tog vägen.
[warmly] Kan du hjälpa räven? Ser du nallen?
[happy] Ja, där! Under täcket!
[happy] Där är nallen!
[warmly] Och den lilla lampan … den får nallen!
[softly] Lampan får lysa hela natten.
[softly] Är du sömnig nu?
[warmly] Ja, räven gäspar! Det hörde jag!
[happy] Hej då, räven! Hej då, nallen!
[warmly] Hej då! Vi ses snart!
```

44 repliker. Filnamn i ordning: `01-kritan-ritar`, `02-vad-blir-det`, `03-en-nalle`, `04-hej-raven`, `05-borstat-tanderna`, `06-ja-vad-bra`, `07-det-ar-kvall`, `08-dar-ar-nallen`, `09-ska-nallen-sova`, `10-ja-sa-klart`, `11-upp-i-sangen`, `12-kramar-nallen`, `13-vad-mjuk`, `14-slacker-lampan`, `15-sa-morkt`, `16-tycker-inte-om`, `17-det-forstar-jag`, `18-vad-gor-vi-nu`, `19-kritan-ritar-nagot`, `20-en-lampa`, `21-for-liten`, `22-ritar-igen`, `23-for-stor`, `24-bort-med-den`, `25-en-gang-till`, `26-lagom`, `27-varsagod`, `28-sa-fint`, `29-ska-vi-saga-tack`, `30-tack`, `31-titta-pa-vaggen`, `32-stor-rav`, `33-liten-rav`, `34-tycker-du`, `35-var-ar-nallen`, `36-ser-du-nallen`, `37-ja-dar`, `38-dar-ar-nallen-igen`, `39-lilla-lampan`, `40-lysa-hela-natten`, `41-ar-du-somnig`, `42-det-horde-jag`, `43-hej-da-raven`, `44-vi-ses-snart`.

**Nya 2026-11-25** (samtal och reaktioner, efter Sannas mönster i 052: Malin frågar, räven svarar i pausen, Malin reagerar): `05-borstat-tanderna`, `06-ja-vad-bra`, `09-ska-nallen-sova`, `10-ja-sa-klart`, `13-vad-mjuk`, `17-det-forstar-jag`, `28-sa-fint`, `34-tycker-du`, `41-ar-du-somnig`, `42-det-horde-jag`. Räven svarar alltid i pausen **före** Malins reaktion, och repliken kommer efter handlingen.

## Rävens röst

**Räven har ingen egen ljudfamilj än** (inget `rav-*` i `assets/ljud/effekter/`; hundens `vov-*` är för hundlika). Ny familj **`rav-gullig`** 1–8 i receptets ordning (hej, förtjust, fniss, mysig suck, nyfiken, trumpen, pratar, hej då) plus ett långt fniss **`rav-fniss`**, ElevenLabs Sound Effects. **Görs av ljudkarta-sessionen, en gång för både 055 och 056** (Sanna 2026-11-25); 056 gör inga egna rävljud utan lägger in `rav-*` när filerna finns i `assets/ljud/effekter/`. Familjen används sedan i rävens alla avsnitt. Mönster: *"Tiny cute cartoon baby fox, <känslan>, a soft little yip and gekker chirp, sweet, close dry recording, no music, no background"*. Inget skall, inget skrik. Hej och hej då ska låta svenska (*"hej!"*, *"hej då!"*), kontrollera med whisper. Fniss hos räven två gånger (rad 12 och 19), Malins skratt tre: tillsammans högst 3–4 roliga ställen, aldrig två rader i följd med fniss över Malin (rad 12 och 19 ligger långt isär).

Övrigt finns: `tass`, `hopp-mjuk`, `puff`, `nalle-hopp`, `lampa-klick`, `prassel-tyg`, `gaspning`, `glimt`, `glitter`, `tindra`, `lysmask`, `snark-pip`, `godnatt-pling`, `krita-ritar`, `skogsljud`. Platsmatta: `hemmaljud` lågt (klockans tick högst 0,3 och tystnar när lampan släcks, som i 026), `syrsor` mycket lågt från rad 6. **Saknas kanske:** ett mjukt sudd-ljud när kritan tar bort den stora lampan (rad 13). Förslag: `krita-ritar` baklänges och lågt, inget nytt. Ingen ny musik; vaggvisan (`assets/ljud/musik/godnatt-vaggvisa`) kan ligga under rad 25–27 som i 026.

## Sakerna

| Sak | Fil | Finns? | I 056 |
|---|---|---|---|
| Sovrummet v1 (platta) | `bakgrunder/sovrummet.md`, `assets/bakgrunder/sovrummet/sovrummet-v1.jpeg` | ✅ finns | blå vägg, runt fönster (himlen i kod), nattduksbord med lampa |
| Sängen | `rekvisita/sangen.md` | ✅ finns | räven står bakom den |
| Täcket | samma form som `rekvisita/tacket.md`, ny färg: **mintgrönt nr 1** ✅ valt av Sanna 2026-11-25 | ✅ urklippt: `saker/tacke/cut/tacke-mint.png` (1312×534, kanten tunnad 25 → 5 px, den tjocka i `saker/tacke/tacke-mint-tjock-kant.png`). Tagningarna `saker/tacke/tacke-1…4-*.jpeg` | på sängen hela tiden; nallen gömmer sig under det. Flyttas till `assets/rekvisita/tacket/` och `rekvisita/tacket.md` när de andra sessionerna är klara |
| Kudden | `rekvisita/kudde.md` (`cut/kudde-v1-zebbe.png`) | ✅ finns | rävens huvud på den när den somnar |
| Nallen v2 (ljus) | `rekvisita/nalle.md` (`cut/nalle-v2-ljus-tunn.png`, ansiktet i kod med `nalle-v2.js`) | ✅ finns | ritintrot, sitter på sängen, gömmer sig under täcket |
| Gardinerna | `rekvisita/gardiner.md` | ✅ finns | valfritt, över fönstret som i 026 |
| Tavlan i sovrummet | `rekvisita/tavla-sovrum.md` | ✅ finns | valfritt, ovanför huvudgaveln (platsen får 1–2 saker som ger liv) |
| **Nattlampan** | `rekvisita/nattlampa.md` | 🆕 **ny** (grind 2) | ritas tre gånger: liten, stor, lagom. En bild i tre fasta storlekar |
| **Rävens sovbild i sängen** | `assets/karaktarer/raven-rut/premium/…` | ✅ **nr 4 vald**, `saker/sovbild/cut/rav-sover.png` (1278×656, kant 7 px). Mellan benen och svansen blev några gråa streck kvar; de döljs av täcket | liggande på sidan i sängen, huvudet på kudden, blundar, svansen över fötterna. Dagens `cut/rut-sover.png` ligger ihoprullad på marken och passar inte i en säng. Görs i Flow med `premium/original/rut-forsta-b.jpg` som bild 1, som zebrans `zebbe-sover-sang.png` |
| Skenen, mörkret, stjärnorna, skuggan, bulan i täcket | i kod | – | ingen bild |

Inga nya saker eller bilder är gjorda. **Förslag till nattlampan** (Sanna bestämmer i grind 2): en enkel barnnattlampa sedd rakt från sidan, en rund, mjukt gul skärm (som en liten måne) på en kort rund fot i ljust trä, och en kort sladd. Konturen ska gå att gissa i den lilla storleken också: skärmens rundel, foten och sladden som egna drag. Skärmen ska vara ljus nog för att se tänd ut när skenet läggs på i kod, och syns mot både den blå väggen och det vita golvet.

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte
- [x] Inga djurnamn i det som sägs: "räven", "nallen". Röstfilerna heter `hej-raven` osv.
- [x] Aldrig *"Vad kan det vara?"*, aldrig *"Vad säger man?"* (*"Ska vi säga tack?"*)
- [x] Inga uppmaningar till barnet att göra något med kroppen (ingen gäspa-med, inget *"Kan du …?"* utom *"Kan du hjälpa räven?"*, som är letandet)
- [x] Barnet letar efter en sak som är borta: nallen under täcket, örat syns innan Malin pekar
- [x] Ny sorts problem: **för mörkt** (inte "vill inte")
- [x] Tre frågor/pauser till barnet: gissa lampan (3 s), tack (2,5 s), ser du nallen (5,5 s). Plus gissningen i ritintrot
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"Klick … !"* (för liten, för stor, lagom)
- [x] Bilden på orden: lampan släcks på *"lampan"*, tänds på *"Klick"*, skuggan stor på *"stor"* och liten på *"liten"*, örat skimrar på *"Ja, där!"*, närbilder på *"nallen"*, *"lampan"*, *"lilla"*
- [x] Malin efter handlingen: tänds först, sedan *"för liten/stor"*; skuggan växer, sedan *"En stor räv på väggen!"*
- [x] Ritintrot ritar en sak (nallen), inte räven
- [x] Tydligt hej och hej då, med vinkning
- [x] Somnar liggande på sidan med slutna ögon, aldrig stående
- [x] Lärotemat (stor, liten, lagom) ligger i handlingen, ingen förklaring
- [x] Inget läskigt: se Öppet 1
- [x] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt. Fler än 2 nya bilder? Nej: nattlampan och sovbilden

## Tydligare repliker (2026-11-25, ✅ inspelade på Sannas "Yes, record all 15")

**Inspelat 2026-11-25:** en egen tagning med de 15 raderna (ElevenLabs, Malin, v3, Natural, svenska, 1 173 krediter för två generationer): `produktion/ljud-original/roster/raven-gar-och-lagger-sig/malin-tagning-2-tydligare.mp3` (49 s) och `-2b-tydligare.mp3` (56 s). Delad med samma filnamn i `assets/ljud/roster/raven-gar-och-lagger-sig/`; 11 klipptes om för hand (slutade tvärt). 22 och 28 kommer från generation 2, eftersom whisper hörde *"hytade"* och *"leaser"* i generation 1. Alla −3 dBFS. De gamla 15 filerna ligger i `produktion/ljud-original/…/aldre-forsta-versionen/` tills de nya är godkända. `rost.txt`, `rost-langder.txt` (106 s tal) och replikerna i manuset är uppdaterade. **Provlyssning:** [`ljud/provlyssna-tydligare.m4a`](ljud/provlyssna-tydligare.m4a) (53 s, de 15 i rad). **Väntar på Sannas lyssning.**

Sanna bad om repliker som säger rakt ut vad som händer: handlingen, saken och gärna kroppsdelen. Alla 44 är redan inspelade och godkända (grind 3), så det här är ett förslag. Inget spelas in förrän Sanna har sagt vilka hon vill ha. De 15 ändrade replikerna blir en kort egen tagning med samma nummer (ca 550 tecken, ca 600 ElevenLabs-krediter). Taggarna, korta meningar och *"Klick …"* tre gånger är kvar.

| # | Gammal | Ny | Varför |
|---|---|---|---|
| 11 | [cheerfully] Upp i sängen! | [cheerfully] Räven hoppar upp i sängen! | säger vem och vad |
| 13 | [warmly] Åh, vad mjuk! | [warmly] Åh, vad mjuk nallen är! | säger vad som är mjukt |
| 18 | [curious] Hm … vad gör vi nu? | [curious] Hm … räven vill ha lite ljus. | vag fråga; nu säger den vad som behövs |
| 21 | [chuckles] Klick … oj, för liten! | [chuckles] Klick … oj, lampan är för liten! | säger saken |
| 22 | [cheerfully] Kritan ritar igen. | [cheerfully] Kritan ritar en ny lampa. | säger vad kritan ritar |
| 23 | [laughs] Klick … oj, för stor! Så ljust! | [laughs] Klick … oj, lampan är för stor! Så ljust! | säger saken |
| 24 | [playfully] Bort med den stora. | [playfully] Kritan suddar bort den stora lampan. | säger vem och hur |
| 25 | [curious] En gång till … | [curious] Kritan ritar en lampa till … | säger vad som händer |
| 26 | [happy] Klick … lagom! | [happy] Klick … nu är lampan lagom! | säger saken |
| 28 | [happy] Oj, så fint! | [happy] Oj, vad fint lampan lyser! | säger vad som är fint |
| 31 | [surprised] Oj! Titta på väggen! | [surprised] Oj! Titta, en skugga på väggen! | säger vad som syns |
| 32 | [happy] En stor räv! | [happy] En stor räv på väggen! | skuggan, inte en ny räv |
| 33 | [giggles] Och en liten räv! | [giggles] Och en liten räv på väggen! | samma |
| 34 | [warmly] Jaså, det tycker du? Mm, jag också. | [warmly] Jaså, tycker du att skuggan är rolig? Mm, jag också. | säger vad samtalet handlar om |
| 42 | [warmly] Ja, det hörde jag! | [warmly] Ja, räven gäspar! Det hörde jag! | säger vad räven gör |

**Behålls som de är:** 02 *"Hm … vad blir det nu?"* och 19 *"Titta! Kritan ritar något."* (receptets fasta fraser för gissningen, där det ska vara hemligt), och reaktionerna på rävens svar (06 *"Ja, vad bra!"*, 10 *"Ja, så klart!"*, 17 *"Nej, det förstår jag."*), som följer direkt på en tydlig fråga. Resten säger redan handlingen och saken.

## Grind 4: ljuden (2026-11-25)

Alla ljud som 056 använder finns redan i `assets/ljud/effekter/`: rävens familj `rav-gullig` (30 tagningar) och `rav-fniss` (4) är gjorda av ljudkarta-sessionen och delas med 055; `lampa-klick`, `krita-ritar`, `glitter`, `hopp-mjuk`, `puff`, `nalle-hopp`, `tindra`, `prassel-tyg`, `lysmask`, `glimt`, `gaspning`, `snark-pip`, `godnatt-pling` och `tass` fanns före. Inget nytt behöver göras och inga krediter går åt.

**Provlyssning:** [`ljud/provlyssna-rav.m4a`](ljud/provlyssna-rav.m4a), 1:30. Tagningarna i ordning, 0,7 s mellan tagningar och 1,8 s mellan känslor:

| Känsla | Tagningar (start) | Används på rad |
|---|---|---|
| 1 hej (svenskt "Hej!") | 1 (0:00) · 1b (0:01) | 1 |
| 2 förtjust | 2 (0:04) · 2b (0:05) · 2c (0:07) · 2d (0:08) | 1b, 3, 15, 16, 22, 24 |
| 3 kort fniss | 3 (0:11) · 3b (0:13) · 3c (0:14) · 3d (0:16) | (reserv) |
| 4 mysig suck | 4 (0:18) · 4b (0:21) · 4c (0:23) · 4d (0:26) | 5, 23, 25 |
| 5 nyfiken | 5 (0:30) · 5b (0:32) · 5c (0:35) · 5d (0:37) | 2, 7, 10, 16, 17, 20 |
| 6 trumpen | 6 (0:41) · 6b (0:44) · 6c (0:46) · 6d (0:49) | 8 |
| 7 pratar | 7 (0:52) · 7b (0:55) · 7c (0:58) · 7d (1:00) | 3b, 18, 19b |
| 8 hej då (svenskt "Hej då!") | 8 (1:04) · 8b (1:06) · 8c (1:08) · 8d (1:10) | 26 |
| långt fniss `rav-fniss` | 1 (1:14) · 2 (1:16, kan låta som "hej hej") · 3 (1:19) · 4 (1:22) | 12, 19 |
| `lampa-klick` | 1 (1:25) · 2 (1:26) · 3 (1:27) · 4 (1:28) · 5 (1:29) | 6, 10, 12, 15 |

✅ **Valt 2026-11-25** (Sanna: "Pick the first takes"): första tagningen per känsla, `rav-gullig-1` … `rav-gullig-8`; långt fniss `rav-fniss-1` (rad 12) och `rav-fniss-3` (rad 19; 2 hoppas över eftersom den kan låta som "hej hej"); `lampa-klick-1` på alla fyra klick. Valet gäller också 055, som delar familjen. **Grind 4 klar.**

## Reaktionsslag och uttryck (Sanna 2026-11-25: starka reaktioner)

Varje händelse får ett reaktionsslag: en närbild på rävens ansikte i 0,6–1 s (Sanna 2026-11-25: fler reaktioner, snabbare), uttrycket i ansikte, öron och svans, och sedan Malin (0,4–0,8 s efter). Starkt i uttrycket, lugnt i rörelsen: inga studsar, inga snurrar. Uttrycken och poserna är de i riggens `uttryck.html` (samma fil som 055).

| Rad | Händelse | Närbild | Ansikte (`ansikte`) | Pose, öron, svans |
|---|---|---|---|---|
| 1 | räven kommer in | – (halvbild räcker, vinkningen är reaktionen) | `glad` | armen bakom kroppen snett ut, svansen viftar lugnt |
| 1b | tänderna | ✓ | `flinar`, sedan `stolt` på *"Ja, vad bra!"* | pose `stolt` (hakan upp), öronen spetsade |
| 3 | nallen syns | ✓ | `jatteglad` | öronen upp, svansen viftar |
| 5 | kramar nallen | ✓ | `kawaii` med slutna ögon (raden ber om det) | lutar 6°, öronen mjukt bakåt |
| 7 | lampan släcks | ✓ (byts från halvbild) | `forvanad` 0,3 s stilla, sedan **lite rädd** (`ledsen` med stora ögon, inte läskigt) | öronen bakåt, svansen tätt intill |
| 8 | för mörkt | ✓ | `ledsen` | öronen ner 12°, svansen sjunker; 2–3 s |
| 9 | kritan ritar | – | `nyfiken` | pose `upp`, tittar på kritan |
| 10 | för liten | ✓ | `tanker` | pose `ner`, ett öra vickar |
| 12 | för stor | ✓ | `fnissig` (bågögon) | öronen bakåt, svansen viftar |
| 15 | lagom | ✓ | **lättad** (`glad` med en suck), sedan `kawaii` | öronen reser sig, svansen viftar lugnt, pose `magen` |
| 16 | tack | ✓ | `jatteglad`, nickar på *"Tack!"* | pose `stolt` |
| 18–19 | skuggan stor/liten | – (helbild visar skuggan) | `skrattar` på *"liten"* | öronen vickar, skuggan vickar med |
| 20 | nallen är borta | ✓ | `forvanad`, sedan `ledsen` | rikt −0,3/+0,3 med ögonen, öronen sjunker |
| 23 | nallen hittad | ✓ | **lättad**, sedan `jatteglad` | pose `hurra` lugnt (armarna upp, inget hopp), svansen viftar |
| 24 | lilla lampan till nallen | – | `stolt` | |
| 25b | sömnig | ✓ | `gapar` (gäsp), sedan `somnig` | öronen sjunker, svansen lägger sig |
| 27 | somnar | – | riggens `sover` → sovbilden (`rav-sover.png`) i det mörkaste | ligger på sidan, bara huvud och kropp andas |

## Feedback 2026-11-25: fler reaktioner, närmare, snabbare (gäller storyboard och scen)

Sanna om alla 052–057: *"more reactions, close crops, character expressions, varied sound effect responses, a bit faster pace"*. Det finns ingen storyboard eller scen för 056 än, så det här är reglerna som `storyboard/rader.mjs` och scenen byggs efter (grind 5–6). Ändringarna i tabellerna ovan är redan gjorda.

1. **Reaktionsslag efter varje händelse, 0,6–1 s,** i närbild (tabellen "Reaktionsslag"). Malin 0,4–0,8 s efter.
2. **Närmare utsnitt:** närbild på ansiktet vid varje reaktion, detaljbilder på nallen (rad 3, 23), lamporna (rad 6, 9, 10, 15, 24) och täcket (rad 21–22). Helbild bara där vi måste se var vi är: rad 1 (rummet), 11–12 (den stora lampan når taket), 17–18 (skuggan på väggen). Rad 4 och 21 är ändrade till halvbild/halvnära.
3. **Uttryck oftare:** glad → förvånad → lite rädd i mörkret (stora ögon, öronen bakåt, aldrig läskigt) → ledsen → nyfiken → fnissig → lättad → stolt → sömnig. Öron och svans följer varje byte.
4. **Varierade ljudsvar:** aldrig samma rävljud två rader i rad. Ordningen nu: 1 hej, 2 förtjust, 5 nyfiken, 3 fniss, 7 pratar, 4 suck, 5, 6 trumpen, 5, fniss-1, 4 (lättad), 2 (tack), 5, 7, fniss-3, 7, 5, 3, 2, 7, 4, gäsp, 8 hej då. Alla 8 känslor används (3 kort fniss nu på rad 3 och 22). Första tagningen per känsla, som Sanna valde. Små effekter på varje händelse: `lampa-klick`, `prassel-tyg` (nallen under och ur täcket, täcket upp till hakan), `glimt` (lampan glider), `puff` (landar i sängen), `tindra` (lagom, örat), `krita-ritar` (rita och sudda).
5. **Lite snabbare tempo:** extra luft per replik (`GLES`) 0,4 s i stället för 0,7; stillastående före Malin högst 0,8 s; gången in 1,6 s; hoppet 0,7 s; lamporna glider på 0,6 s. **Pauserna för barnet behålls:** gissa lampan 3 s, tack 2,5 s, ser du nallen 5,5 s. **Slutet lugnare** (rad 25–28): `GLES` 0,9 s, långsam vinkning, räven lägger sig på 1,4 s. Rörelsen rask men lugn: inga studsar.

## Kontroll mot regler (2026-11-25)

Det finns ännu ingen storyboard eller scenkod för 056, så kontrollen gäller manus och saker. `python3 verktyg/qa-scen.py` kördes inte: det finns ingen scen att köra den på. Den körs när scenen byggs (grind 5–6).

| Punkt | Ok | Rättat |
|---|---|---|
| 1. Rigg | Räven Rut v2, `premium/uttryck.html` (samma som 055, med `gapar`, `flinar`, `borstar`). Inga kodarmar, vinkar med armen bakom kroppen, ingen snurr, somnar liggande på sidan med slutna ögon | Sovbilden vald och urklippt (nr 4). Uttrycken namngivna per rad i "Reaktionsslag". Långa rötter: riggen är låst och kontrolleras med `langre_rot.py` när scenen byggs (öron och svans vrids i skuggleken) |
| 2. Effekter | Rummet aldrig svart, vinjett högst 0,14 (stod i fällorna) | Lagt till som krav för scenen: premium-finputs (mjuka skuggor under räven, sängen och lamporna, krit-gnistor när kritan ritar, svag parallax i fönstret, varm ton), `#boil` 2,5 px delat med zoomen och ny brusbild 6 gånger/s, vita kanter via `verktyg/kant.js`, kritan via `verktyg/kritan-ritar.js` (nallen, de tre lamporna och suddet) |
| 3. Regler | 1 figur, 1 plats; inga djurnamn; *"Ska vi säga tack?"*; aldrig *"Vad kan det vara?"*; ritintrot ritar nallen; barnet letar (nallen under täcket), gör inget med kroppen | Malin 0,4–0,8 s efter handlingen skrivet som tal. Bildutsnitt enligt `format/bildutsnitt.md` (helbild 40 %, halvnära 60 %, kroppshöjd 430 px). **Inget går genom något:** räven hoppar upp över madrasskanten, inte genom den; nallen glider ner *under* täckets lager och upp ur det; den lilla lampan glider upp över sängkanten, inte genom; skuggan ligger på väggen bakom räven; den stora lampan når nästan taket men inte igenom. Kollas med täta bilder (6/s) vid hoppet, nallen och lampan |
| 4. Starka reaktioner | Malin frågar, räven svarar med ljud, Malin reagerar (rad 1b, 3b, 5, 8, 15, 19b, 25b) | Ny tabell "Reaktionsslag": närbild och tydligt uttryck vid varje händelse, glad, förvånad, ledsen, stolt och sömnig alla med. Rad 7 blir närbild i stället för halvbild. Inga repliker ändrade |
| 5. Lärdomar | "Lösningar från förlagorna" följs: 051:s krit-kod, 026:s `SOVK` och `tackeklipp`, byte rigg → sovbild i det mörkaste (aldrig övertoning), bara huvud och kropp andas (`andMask`) | – |

Ändrat i något Sanna redan godkänt: inga repliker eller bilder. Rad 7:s utsnitt (halvbild → närbild) är det enda i den godkända tabellen.

## Öppet (för Sanna)

1. **Mörkret får inte bli läskigt.** Rummet blir varmt kvällsblått, aldrig svart, stjärnorna syns i fönstret och rävens ögon syns. Räven blir inte rädd: den *ser ingenting* och *tycker inte om* det (öronen faller i 2–3 s). Vill du ha det ännu mjukare kan rad 8 bli *"Räven vill ha lite ljus."*
2. **Skuggan på väggen** (rad 17–19) är leken och bär "stor och liten". En stor skugga kan kännas läskig för en del barn, så den är ljust lila, rund och mjuk, och räven fnissar. **Alternativ:** den lagom lampan kastar små ljusprickar (stjärnor) på taket som räven tittar på, men då försvinner stor/liten ur leken.
3. **Täckets färg:** täcket i 026 är korall och de andra tagningarna solgula, båda nära rävens orange. Förslag: en ny färgtagning av samma täcke i grind 2, t.ex. mintgrönt eller ljust lila, som syns mot både räven och den blå väggen.
4. **Ligger nära 026 och 040** (sovrummet, nallen som letas fram, ljuset som lyser hela natten). Skillnaden: problemet (mörkt), liten–stor–lagom, skuggleken, den lilla lampan till nallen, inget gäsp-god-natt. Lägg dem inte efter varandra på kanalen.
5. **Lilla bilen** (`berattelse.md`, `bil-rod`) är inte med. Den kunde stå i luften under sängen och tittas på i slutet, men det blir ett andra letande. Säg till om du vill ha den.
