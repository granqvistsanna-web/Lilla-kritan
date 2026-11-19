# QA 044 Katten gör en snögubbe – förhandsvisning 3 (`--snabb`)

**Granskat 2026-11-19** · `qa/forhandsvisning-3-snabb.mp4` (960×540, 15 fps, 259,34 s = scenens `DURATION` 258,73 + 0,6 svart, logotypen läggs på i sammanslagningen) mot `scener/bjorkdungen/index.html`, `rader.json`/`storyboard/rader.mjs`, `manus.md`, `format/bilderbok.md` och minnena.
**Metod:** 188 bildrutor (start, Malins start, 60 % in i repliken, slut för varje rad) plus täta serier runt bollarna, kvistarna, fågeln, klappen, leendet och vinkningarna. Ljud: ebur128 (integrerat och momentant), silencedetect, alla ljudcues ur `rader.json`, ordtider med whisper (large-v3-turbo) för replik 16, 18, 26, 28, 32, 33 och 39.
**Tider** nedan är filmtid i förhandsvisningen (= scentid). I slutfilmen kommer +1,0 s för logotypen.

Bildbevis i `qa/bilder/` (numren står vid fynden).

> **Status 19/11:** fynd 1–6 (måste fixas) är åtgärdade i `index.html` och `storyboard/rader.mjs` (rader.json ombyggd), plus fynd 15 (picken på orden) som följde med rad 35. Ny förhandsvisning: `qa/forhandsvisning-4-snabb.mp4` (262,2 s, scenen +2,9 s). Fynd 7–22 är kvar. Originalen före ändringen ligger i scratchpaden, inte i repot.

---

## Måste fixas

### 1. Bollen syns inte på *"Först en boll."* – rad 5, 38,5–42,5
Närbilden `NARK(120)` har mitten på `GOLV − 290` och zoom 2,2, så bilden går ner till y ≈ 835. Bollen ligger på `by(26)` ≈ 856, alltså under bildkanten. Katten säger "ooo" och tittar ner på något barnet inte ser, och kattens fötter är avklippta. Bollen syns först efter klippet till rad 6. (`01-rad05-bollen-syns-inte.jpg`)
**Regel:** bilden på orden, reaktionstid (saken ska synas).
**Fix:** `index.html` `S['5']`: byt `NARK(120)` mot `kamera(2.0, KX + 120, GOLV − 200)` (fötterna och bollen med), eller `MED()`. Gör gärna bollen lite större där (`boll(956, by(34), 34 …)`) så den läses i närbild.

### 2. Kritan flyger över kattens ansikte – rad 33b, 213,6–214,0
När påsen är ifylld far kritan iväg från `PX + 140, GOLV − 260` mot `−300, 60`. Banan går rakt över kattens ögon. Kattens luva är dessutom avklippt i överkanten (`kamera(2.0, …, 760)`). (`03-rad33b-kritan-over-ansiktet.jpg`)
**Regel:** inget ska ritas över figurens ansikte; huvudet ska inte klippas av.
**Fix:** `S['33b']`: låt kritan lämna åt vänster och nedåt, bort från katten, t.ex. `krita(lerp(PX − 80, −300, …), lerp(GOLV − 240, GOLV − 120, …), …)`. Kameran: `kamera(1.75, (KX + PX) / 2, 700)` så att luvan kommer med.

### 3. Luvan avklippt och kritan för stor – rad 18c, 115,0–120,4
Samma utsnitt som 33b (`kamera(2.0, (KX + MOROT_SNO[0]) / 2, 760)`): kattens luva och öron klipps av upptill. Kritan står kvar i skala 0,33 i en 2×-zoom, så den blir dubbelt så stor som i helbilden och sticker ut genom överkanten. (`02-rad18c-luvan-avklippt-stor-krita.jpg`)
**Regel:** receptet: *"Kritan stays small (scale 0.33, ×0.7 in close drawing shots)"*; huvudet ska vara helt i bild.
**Fix:** `S['18c']`: `kamera(1.75, (KX + MOROT_SNO[0]) / 2, 700)` och `kritaSvaj(MOROT_SNO[0] − 60, MOROT_SNO[1] − 170, 0.33 * 0.7 / zoom, tl + 3)` (≈ 0,13 vid zoom 1,75), alltså skala ner kritan med zoomen så att den blir 0,7 × helbildens storlek på skärmen. Samma skalning i `S['33b']`.

### 4. Huvudlös kattkropp i närbilden på fågeln – rad 35, 218,85–221,3
`kamera(3.0, VID[0] − 20, VID[1] − 60)` visar kattens mage och ben som en stor svart form över en fjärdedel av bilden, utan huvud. Fågeln flyger dessutom från huvudet till fröna på 0,35 s (`flyg(PA_HUV, VID, at('35'), at('35', tider[0] − 0.15))`), så den bara dyker upp i närbilden. (`04-rad35-katt-utan-huvud.jpg`)
**Regel:** kattens huvud ska inte klippas av; lugn rörelse, reaktionstid.
**Fix:** `S['35']`: flytta mitten åt höger, t.ex. `kamera(3.0, VID[0] + 90, VID[1] − 60)`, så att katten är utanför bilden (fröna x 1000–1118 kommer med). Låt fågeln hoppa ner i helbilden i slutet av rad 34 (flygstart ca 0,8 s före `at('35')` i `fagelNu()`), eller ge rad 35 0,6 s mer före första picket och flytta Malin dit (`rader.mjs` rad 35: `malin: [[39, 1.0]]`, pickarna +0,6).

### 5. Vinkningen syns knappt – rad 1 (20,7–24,6) och rad 40–41 (245,2–256,2)
Vinkarmen (`armar[1]`, bildens högra sida) lyfts bara +46° och hamnar bakom kroppen precis där svansen ligger. Tassen sticker knappt ut förbi kanten, och den smälter ihop med svansen. På *"Hej, katten!"* och *"Hej då, katten!"* ser man ingen vinkning. (`05a-rad01-vinkning-syns-knappt.jpg`, `05b-rad40-vinkning-syns-knappt.jpg`)
**Regel:** minnet *vinkande-arm-bakom-kroppen*: armen bakom kroppen men snett ut och upp, ca −60°, så att tassen syns utanför kanten. Receptet: *"Waving: the whole arm shows."*
**Fix:** `katt()`, raden `if (vinka && vinka.upp > 0.001)`: vinka med armen på den fria sidan (`a[0]`, bildens vänstra sida, ingen svans där) eller höj vinkeln till ca 75–85° + svängen, och kolla en stillbild i närbild (rad 1 vid 22,3 s) att hela tassen syns.

### 6. Kattljud krockar med Malins repliker – rad 3, 6, 8, 19
| Rad | Kattljud | Malin | Överlapp |
|---|---|---|---|
| 3 | `mjau-gullig-2` 29,62–30,77 | *"Bygga en snögubbe?"* 30,22 | 0,55 s |
| 6 | `mjau-puttar-1` 43,26–44,21 | *"Rulla, rulla …"* 43,31 | 0,9 s |
| 8 | `mjau-puttar-1` 57,04–57,99 | *"Rulla, rulla …"* 57,09 | 0,9 s |
| 19 | `mjau-gullig-2` 120,54–121,69 | *"Tack för moroten, kritan!"* 120,74 | 0,95 s |

Malins ord drunknar i mjauet, och katten "svarar" innan hon har sagt något.
**Regel:** receptet: figuren svarar i pausen efter repliken; Malin efter handlingen.
**Fix i `rader.mjs`:**
- rad 3: `malin: [[6, 1.3]]` och `d: 1.3 + L(6) + 1.0` (mjauet och skuttet först, sedan Malin).
- rad 6: `ljud` `[PUTT, 0.45]`, `malin: [[9, 1.5]]`, `d: 1.5 + L(9) + 1.0`; `DUNS` följer med `L(9)`.
- rad 8: `[PUTT, BAK + 0.45]`, `malin: [[11, BAK + 1.5]]`, `d: BAK + 1.5 + L(11) + 1.0`.
- rad 19: `M(2)` efter repliken: `[M(2), 0.5 + L(23)]` (nicken i `S['19']` följer då `lo(0)` i stället för `tl − 0.05`).
`skjutTider()` räknar ur `duns()`, så bollarnas tajming följer med.

---

## Bör fixas

### 7. Leendet kommer två sekunder för tidigt – rad 22, 134,9–138,3
`leNu()` = `del(at('22', 0.1), at('22', 0.6))`, så munnen böjs i klippet, innan Malin börjat. *"Den ser glad ut!"* kommer först vid 137,0–138,2 (ordet *glad* 137,43). Nöjda `mjau-spinn-1` (138,34) hörs när bara snögubben syns. (`07a-rad22-leendet-fore-repliken.jpg`, `07b-rad22-pa-ordet-glad.jpg`)
**Regel:** bilden på orden; reaktionstid (kattens reaktion ska synas).
**Fix:** `leNu = () => del(at('22', mo(0) + 1.75), at('22', mo(0) + 2.35), TT)` (kräver `RR['22']` i stället för `CUR`: `RR['22'].malin[0][1]`). Klipp till `NARK()` med katten i radens sista 1,6 s, när spinnet hörs.

### 8. *"Oj! Titta, en fågel!"* sägs när fågeln är en prick – rad 30, 191,2–198,2
Närbilden på holken är fin (fågeln tittar ut 191,6–192,9), men den slutar vid 193,2, och repliken kommer 194,09 i helbild där fågeln är ca 15 px stor vid bildkanten. I närbilden svävar dessutom spetsen på snögubbens högra kvistarm fritt i luften i vänsterkanten. (`06a-rad30-fageln-pytteliten.jpg`, `06b-rad30-kvist-svavar-i-luften.jpg`)
**Regel:** bilden på orden.
**Fix:** `rader.mjs` rad 30: lägg repliken i närbilden, `malin: [[34, HOLKN − 0.3]]`, och låt `nar` i `S['30']` gälla till `HOLKN + 0.4` som nu (fågeln är då ute ur holken). Flygningen kan visas i `MED`-utsnittet (`kamera(1.45, …)` som rad 31) i stället för `HEL()`. Närbilden: zoom 3,4 → 4,0 så att kvistspetsen (x ≈ 1427) hamnar utanför.

### 9. Pauserna – rad 18a/18b, 26a/26b, 37
| Var | Uppmätt | Receptet / manus |
|---|---|---|
| Gisspausen för moroten (106,40–116,10) | **9,7 s** utan Malin; konturen klar 110,2, sedan 5,9 s väntan med svajande krita | 3 s gisspaus |
| *"Kan du se var kvisten är?"* (164,83–171,23) | **6,4 s** | 4–5 s (manus 5 s) |
| Pip-pausen (232,07–235,67) | **3,6 s** tyst (bara bädden, ca −35 LUFS M) | ca 2,5 s enligt feedbacken |

Längsta lucka utan ny replik eller nytt ljud: 106,40–115,00 (8,6 s), samma gisspaus. Inga andra luckor över 6 s i björkdungen.
**Fix i `rader.mjs`:** rad 18a `d: 0.3 + L(21) + 3.0` (i stället för 4,5; konturen tar 3,8 s från `lo(0)`, så sänk den till 3,0 i `S['18a']`: `kl((tl − a) / 3.0)`). Rad 26b `d: 3.0` och `GLIMT(2)` vid 1,5. Pip-pausen: GLES lägger 1,1 s ovanpå 2,5; lägg `'37'` i undantaget (`!['01a', '01b', '37'].includes(r.id)`) och sätt raden till `0.3 + L(41) + 2.5`.

### 10. Tyst ritintro – rad 01a–01c, 4,2–7,0 och 8,55–12,77
Före björkdungen finns ingen bädd alls: 2,8 s och 4,2 s helt digital tystnad (silencedetect −40 dB) runt *"Hm … vad blir det nu?"*. Bädden och fågelkvittret startar först 16,7 s.
**Regel:** minnet *ritintro-langsamt-med-skog*: platsljudet lågt under ritintrot.
**Fix:** `ljud()`: starta `fagelkvitter-1` vid `t: 0` med `vol: 0.08` (inget vindljud, Sanna tog bort det i J06), och höj till 0,15 vid björkdungen, eller lägg ett eget kort cue för papperet.

### 11. Teckningen har ingen halsduk, bilden har en stor röd – rad 01a–01c, 0,3–14,5
`skiss()` ritar kontur, ögon, morot, knappar och kvistarmar, men inte halsduken. Manus (*"ögonen, näsan och halsduken som egna drag"*) har den. När `snogubbe.png` fylls i dyker en stor röd halsduk upp som inte fanns i teckningen. (`12-rad01c-halsduken-ritades-inte.jpg`)
**Regel:** minnet *teckningen-som-bilden*.
**Fix:** `skiss()`: lägg till halsduken som eget drag mellan näsan och knapparna (mät den i `snogubbe.png` i 1024 × 1371-rutan: halsbandet runt y ≈ 380–420 och snibben ner till höger), t.ex. andelarna 0,74–0,8, och flytta knapparna och armarna efter.

### 12. Musikbädden ligger bara ca 8 LU under Malin
Momentan loudness (400 ms): Malin median −28,1 LUFS, bädden och kvittret ensamma −36,1 LUFS, alltså ca 8 LU skillnad. Bädden duckar inte under repliker. Den är låg, men för 1–4 år brukar 12 LU eller mer vara tydligare.
**Fix:** `ljud()`: `jul-badd-2` `vol: 0.16 → 0.10` (−4 dB), eller ducka bädden under Malins cues. Jämför med J03, där musiken sänktes 2,5 dB efter feedback 19/11.

### 13. Påsen ritas framför tassen och glider tvärs över katten – rad 34, 214,8–218,6
`paseBild()` läggs i `saker` ovanpå `figurer`, så påsen ligger över tassen. När katten tar den glider den från vänster sida (x 500) över kroppen till höger tass på 0,6 s. (`10-rad34-pasen-framfor-tassen.jpg`)
**Regel:** receptet: *"Holding a thing: paw in front of the thing"* (043: tassen framför påsens nederkant).
**Fix:** som i 043: rita påsen före armen (eget lager under `figurer`, och tasspetsen ovanpå), och låt kritan rita påsen till höger om katten (`PX` ≈ KX + 220) så den inte behöver korsa kroppen.

---

## Trevligt att ha

14. **Ögonen landar före orden – rad 13, 81,8–84,1.** Första stenen landar 82,02 (på *Ett*, *öga* = 82,32–82,98), andra 83,01 (före *två ögon* = 83,02–83,80). `rader.mjs` rad 13: `[POP, 0.5 + 0.6], [POP, 0.5 + 1.45]`.
15. **Tredje picket efter sista *pick* – rad 35.** Picken 219,35/219,76/220,18; orden 219,29/219,60/219,78. `rader.mjs` rad 35: `[PICK, 0.44], [PICK, 0.75], [PICK, 0.93]`.
16. **Stenglimten är liten – rad 11, 73,0–74,6.** `glans(…, 9 * o, o)` blir små stjärnor i närbilden. Höj till `14 * o` eller använd `skimmer()`. (`09-rad11-stenglimten-liten.jpg`)
17. **Halv snöboll i vänsterkanten – rad 26b–27, 166,9–175,5.** `STOLPN` (zoom 2,8) klampas och visar en bit av underbollen. Zoom 3,4 gör stolpbilden ren. (`08-rad26b-halv-snoboll-i-kanten.jpg`)
18. **Rad 7 saknar puttljudet** som rad 6 och 8 har. Lägg `[PUTT, BAK + 0.45]` (med Malin efter, se fynd 6).
19. **Fnissansiktet kommer på "oj"-ljudet – rad 20.** `fn = del(lo(1) − 0.1, …)` pekar på `mjau-oj` (125,77), så katten fnissar redan när den låter förvånad. Låt `fn` följa Malins skratt (`mo(0) + 0.2`) eller `lo(2)` (fnisset).
20. **Katten letar 200 px från kvisten – rad 24.** Gången stannar vid x 450, kvisten ligger vid 240. `GANGAR`: `['24', 0.3, 2.2, HEM, 330, 0]` och tillbaka från 330.
21. **Katten står framför snögubbens nya arm i klippet – rad 29, 182,9–183,6.** Den hinner gå undan innan *"Två armar!"* (185,4), så det är bara ett kort ögonblick. (`11-rad29-katten-over-snogubben.jpg`)
22. **Rad 10 utan katt.** Manus har *"katten lutar huvudet, frågande mjau"*; raden visar bara snögubben i 3 s gisspaus. Ett kort `mjau-gullig-5` och en klipp till katten mot slutet ger ett reaktionsslag.

---

## Kontrollerat utan anmärkning

- **Inga djurnamn** i repliker, filnamn eller ljudmappar (`katten`, `fågeln`, `snögubben`). Whisper hör alla kontrollerade repliker i rätt ordning (*knappar* hörs som "knattar" av whisper, uttalet låter rätt).
- **Alla 37 ljudfiler finns**; de nya `mjau-ooo/-oj/-puttar/-trill/-spinn` har −3 dBFS topp och README-rader.
- **Ljudet på handlingen:** `sno-duns` när bollen stannar/landar, `pop` när stenarna, moroten och kvistarna landar (på *kvist* 150,39 och 180,40), `mjau-ooo` med "ooo"-ansiktet (rad 5, 12, 18c), `mjau-oj` med förvånat ansikte (rad 20, 30), `mjau-trill` efter kvistarna och klappen, klapparna (222,34/222,84/223,34) på tassarna ±0,1 s.
- **Malin efter handlingen:** moroten landar 125,62 → *"Oj!"* 126,42; stenarna lyfter 81,2 → 81,82; *Hopp!* på hoppet; fågeln lyfter 226,29 → 226,84; mjauet 235,67 → *"Det blev ett mjau!"* 236,77; snögubben vinkar på *vinkar* (187,99 mot 187,89).
- **Kontinuitet:** alla tio stenar används och högen är tom efteråt; moroten ligger kvar till vänster tills den flyger; båda kvistarna ligger i snön från början och sitter kvar; fröna försvinner med picken; den tomma påsen ligger kvar; fågeln sitter på huvudet till slutet.
- **Inga figurer som snurrar** eller speglas, inga studsiga rörelser. Katten blundar bara i korta blinkningar.
- **Vita kanter:** kattens kant syns tydligt mot den mörka grönteal himlen; snöbollarna har tunn blå kant mot snön; stenar, morot, påse och fågel har ingen tjock klistermärkeskant.
- **Ljudstyrka:** förhandsvisningen är −27,9 LUFS, topp −9,8 dBTP. Det är väntat: `render.mjs` skalar alla cues ×0,4 och normaliseringen sker i sammanslagningen/`mastra.sh`. Mät slutfilmen och luckan (−16 LUFS, topp ≤ −1,5) efter mastringen.

## Bra, behåll

- **Ritintrot:** konturen i lugna drag i ca 6,4 s med ögon, morot, knappar och kvistarmar, och den mjuka vita övertoningen in i björkdungen.
- **Närbilden på holken** där fågeln tittar ut (191,6–192,9) är filmens finaste ögonblick.
- **Katten som skjuter bollarna** och går efter dem, med spåret i snön och snötussarna när bollarna landar.
- **Helbilden på *"Kan du hjälpa katten?"*** följd av klippet till kvisten vid stolpen med skimret.
- **Närbilderna på stenarna, munnen och knapparna** med stenar som flyger i bågar en i taget på räkningen.
- **Morotsskämtet** (magen, sedan *Hopp!* upp på näsan) och klappen efter att fågeln ätit.
- **Kritirisen** runt katten och snögubben med fågeln på huvudet.
