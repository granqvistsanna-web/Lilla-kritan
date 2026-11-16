# Pusslet – recept

**Status:** 2026-11-16. Två långa filmer är renderade: **Vanliga** (11 pussel) och **Jul** (10), `pussel-vanliga.mp4` och `pussel-jul.mp4` i [`produktion/youtube/pussel/`](../produktion/youtube/pussel/). Malins röster är inte inspelade än, så repliken visas som text nederst. Förlagan var prov 3 (`pussel-prov-3.mp4`). Manus och bildlista: [`manus.md`](../produktion/youtube/pussel/manus.md). Godkännandesidan för bilder och manus: artifact `CP1nmXbwaJ4kxhD18TcyoJ` (collection `godkann`).

Ett pussel med fem tjocka bitar läggs i en pusselbricka. Bitarna kommer in en i taget och visas först i närbild. Barnet ser inte vad det blir förrän det mesta ligger på plats. Efter den tredje biten frågar berättaren *"Vad blir det?"*. Sedan kommer en paus och de två sista bitarna, och sist svaret: *"En bil!"*. Bilden blir hel och låter som den riktiga saken (bilen tutar).

Det är samma grund som Gissa teckningen ([`shorts.md`](shorts.md)): en sak i taget, en paus att gissa i och svaret med det riktiga ljudet. Här byggs bilden av bitar i stället för att ritas.

## Jämfört med de andra formaten

| | Pusslet, lång | Pusslet, Short | Gissa teckningen | Avsnitten (`regler.md`) |
|---|---|---|---|---|
| Längd | ca 6–7 min (10–11 pussel, ca 40 s styck) | ca 40 s (1 pussel) | ca 23–31 s | 3–4 min |
| Bild | 16:9 | 9:16, brickan i övre 75 % | 9:16 | 16:9 |
| Platser | 1: bordet (papperet) med brickan | 1 | 1: papperet | max 2 |
| Figurer | inga i rörelse, bara bilder av saker och figurer som redan finns | samma | inga | max 3 |
| Musik | en slinga per film, lågt (se *Ljud*) | samma | samma | en sång |
| Röst | berättaren (Malin), korta repliker | samma | samma | sång och berättare |

Det bryter mot `regler.md` på samma sätt som Gissa teckningen: ingen berättelse, ingen sång och ingen vardagshandling. Pedagogiken gäller ändå.

**Bilderna gör Sanna själv i Google Flow** (det går fortare så), en sak per bild i den nya kritstilen med vit klistermärkeskant. Claude skriver bildlistan och prompterna (`manus.md`), klipper ut bilderna med `verktyg/egen_kant.py` till `bilder/cut/` och lägger snitten. Claude använder inte Flow för Pusslet. Saker som redan finns i den nya stilen återanvänds (`assets/rekvisita/*/cut/`). Ingen ny musik (se minnet *Ingen ny musik*).

## Så ser det ut (3D, rent)

Förlagan är prov 2. Det ska se ut som ett riktigt träpussel för små barn, sett lite uppifrån.

- **Bordet:** det vanliga papperet (`#FBF7EE`), inget annat i bild.
- **Pusselbrickan:** en tjock kartong i varm ljus träton med rundade hörn. Kanten syns som en mörkare rand nedtill (ca 10 px), och skuggan under är mjuk. Hålet för bilden är försänkt och mörkare, med en inre skugga uppe och till vänster. **Ingen siluett och inga linjer i hålet**, för de avslöjar svaret.
- **Bilden:** saken på en lugn, ljus bakgrundsfärg med lite kritkorn. Färgen väljs så att den inte avslöjar saken (blått bakom äpplet, gult bakom bilen, grönt bakom kaninen). Sakens egen vita klistermärkeskant följer med, men bitarna får **ingen** vit kant runt sig.
- **Bitarna** är tjocka (ca 14 px när de lyfts, 4 px när de ligger). Sidan är en mörkare kopia av bildens egna färger (ca 62 %), så att röda delar får röd kant. Toppen har en mjuk fasning: ljus kant uppe till vänster, mörkare nere till höger, och en tunn mörk skarv runt biten.
- **Lyft och skugga:** en bit i luften är större (1,35) och har en stor, mjuk skugga långt ner till höger. Ju närmare hålet, desto mindre och skarpare blir skuggan. En bit som ligger har en liten skugga tätt intill.
- **Allt ritas renare än i prov 1:** knopparna har riktig hals och runt huvud, kanterna kantutjämnas (bitarna byggs i dubbel storlek och skalas ner), och lösa bitar ligger aldrig runt brickan. Det som syns är brickan och högst en bit i rörelse.

## Fem bitar

Två bitar överst och tre nederst, med en knopp på varje inre kant (sex knoppar). Det är lagom svårt för 2–4-åringar och ser ut som ett riktigt barnpussel.

**Snitten läggs för hand per bild** (se *Snitten i datan*). I prov 2 lades de automatiskt, och då hamnade vissa bitar nästan bara på bakgrunden. Reglerna:

1. Varje bit har **en ledtråd** som går att säga i ett ord: ett öra, ett hjul, bladet, fönstret.
2. Ingen bit är bara en tunn flisa av saken (prov 1 hade kaninens tå och ett halvt hjul).
3. Det som avgör (kaninens ansikte, bilens hela hjul, äpplets blad med skaft) ligger i **en** bit, och den kommer sist.
4. Saken får gärna vara lite större än hålet (beskuren i kanten), så att varje bit visar en del och inte hela formen.

## Svårare att gissa

- **Ingen siluett i hålet.** I prov 1 syntes formen från början och svaret var givet.
- **Bitarna kommer in en i taget**, från vänster och höger om vartannat. De ligger inte framme runt brickan.
- **Ordningen gör gissningen** (som Gissa teckningen regel 6): först bitar som kan vara mycket (en röd rundel, ett blått hörn), sedan ledtrådar och det som avgör sist. Ordningen väljs för hand per bild.
- **Frågan kommer efter bit 3**, inte när nästan allt ligger. Då finns ledtrådar men inget svar.
- **Bakgrundsfärgen avslöjar inget.** Inte grönt gräs bakom kaninen om det säger "djur", inte en väg bakom bilen.
- **Ledtrådarna sägs i ord** när en bit visas i närbild, och de blir tydligare för varje bit: *"Något rött."* … *"Något runt."* … *"Ett hjul!"*

## Tidsmall per pussel (ca 40–45 s)

Malin får gott om tid: hon pratade för tätt i första versionen. Konstanterna står överst i `pussel-prov.py` (`IN, VISA, LAGG, MELLAN = 0.8, 1.3, 0.8, 0.8`, `FRAGA = 4.0`).

| Del | Tid | Ljud |
|---|---|---|
| Tom bricka. *"Ett nytt pussel!"* (bara i första pusslet: *"Ska vi lägga ett pussel?"*), sedan 0,9 s paus | ca 2 s | |
| **Bit 1–3**, var och en: glider in från sidan till närbild framför brickan (0,8 s), stannar och vickar lite medan berättaren säger ledtråden (minst 1,3 s, repliken + 0,7 s), sänks ner i sitt hål (0,8 s) och sätter sig med en liten guppning. Sedan *"Där!"*/*"Den passar!"* + 0,7 s, eller 0,8 s paus | ca 4 s per bit | `swoosh` lågt när den kommer, ett träklick när den landar |
| *"Hmm … vad blir det?"* och 4 s tyst gissningspaus. Inget rör sig | ca 5,5 s | slingan lågt |
| **Bit 4–5** på samma sätt. Ledtråden på bit 5 är det som avgör | ca 8 s | `ding` på sista biten |
| Skarvarna tonas bort (0,5 s), paus | 1,1 s | `glitter` lågt |
| Svaret: *"En bil!"*, sedan 0,5 s | ca 1,5 s | berättaren |
| **Bilden blir levande** (se *Levande*): poppar ut, står still, gör sin sak, står still, snäpper tillbaka | 4,2–5,7 s | `pop`, sakens riktiga ljud, `duns` |
| Kort jubel eller klapp, sedan nästa pussel | ca 1 s | `jubel` / `klapp` |

## Levande

Som i Gissa teckningen blir saken levande när den är klar. Urklippen **vänds aldrig och snurrar inte** (minnet *Figurer snurrar inte*): bara hopp, gupp, lutning och körning åt det håll saken tittar. Lugnt, inte studsigt (minnet *Lugn rörelse, inte studsig*), men ut och in ur bilden får det märkas.

Varje slut har samma ram runt rörelsen:

1. **Popp ut (0,5 s):** saken hukar lite (0,1 s), poppar upp ur bilden med en liten översväng. Krit-gnistor sprätter ut från brickans kant, bakom saken. Bakgrunden blir kvar i brickan. Ljud `pop` + lite `glitter`.
2. **Får plats:** medan saken är lyft krymps den till högst 80 % av skärmens höjd (`PASSA`) och flyttas till mitten, så att hela saken syns, fötterna också. Den växer tillbaka när den sjunker ner.
3. **Still 0,6 s** (`HALL`): barnet hinner se hela saken (minnet *Reaktionstid för små barn*).
4. **Rörelsen** (tabellen nedan).
5. **Still 0,6 s** igen.
6. **Snäpp in (0,75 s, `LAND`):** tar sats uppåt, snäpper ner i hålet, trycks ihop och fjädrar tillbaka, med några små gnistor. Ljud `duns`.

| Typ (`levande` i datan) | Rörelse | Ljud |
|---|---|---|
| `studsa` (äpplet, bollen) | tre hopp, allt lägre, med en liten huk före varje | `studs` på varje landning |
| `skutta` (djur) | två hopp på stället, sedan vickar den glatt (1,6 s) | djurets eget ljud (`kanin-gullig-3`), `hopp-mjuk`, `landa-mjuk` |
| `kora` (fordon) | tutar, guppar på stället, kör ut och in från andra sidan, bromsar och lutar fram lite. Kör dit den pekar: `riktning=-1` för saker som pekar åt vänster (kälken) | `tuta-tut`, `brum`, en tutning till när den är tillbaka |
| `flyga` | stiger snett uppåt, kommer in från andra sidan och glider ner | sakens ljud |
| `gunga` | lugn gungning, lutar ±4° tre gånger (3 s) | sakens ljud, lite `glitter` |
| `singla` (snöflingan) | flyter upp och singlar ner | sakens ljud |

Extra liv ovanpå rörelsen (`extra` i datan, ritas i kod i `produktion/youtube/pussel/liv_extra.py`):

| `extra` | Vad som händer | Pussel |
|---|---|---|
| `anga` | tre mjuka ångstrimmor stiger ur maten hela tiden | gröten, julskinkan |
| `lysa` | ljusslingans prickar glimmar i otakt, stjärnan lyser | julgranen |
| `vinka` | blinkar två gånger, lyfter armen bakom kroppen och vinkar | tomten (vanten lossas ur bilden), snögubben (pinnarmar) |

Berättaren talar **efter** rörelsen (minnet *Malin efter handlingen*): biten landar först, sedan *"Där!"*. Varje händelse får sitt reaktionsslag (minnet *Reaktionstid för små barn*).

## Repliker (Malin, ElevenLabs v3)

Varje replik får en känslotagg (minnet *Känsla i Malins manus*). Varje fil används högst en gång per film, så det behövs flera tagningar av det som upprepas.

Alla repliker till provet står i `produktion/youtube/pussel/rost.txt` (id och text med tagg, som `avsnitt/*/rost.txt`). Filerna läggs i `assets/ljud/roster/pussel/<id>.m4a`. Saknas en fil blir det tyst där och repliken visas som text nederst i provfilmen.

Ledtrådarna blir tydligare för varje bit, och den sista avgör. Alla pussels ledtrådar står i [`manus.md`](../produktion/youtube/pussel/manus.md), genererade ur `pusseldata.py`. Till exempel:

| Pussel | Bit 1 | Bit 2 | Bit 3 | Bit 4 | Bit 5 | Svar |
|---|---|---|---|---|---|---|
| Äpplet | Något rött. | Något runt. | Det blänker! | Rött och runt … | Ett blad! | Ett äpple! |
| Kaninen | Något brunt. | En rund svans. | En liten tass. | Ett litet öga. | Långa öron! | En kanin! |

Efter bit 1, 3 (och ibland 2) säger hon *"Där!"* eller *"Den passar!"*. Efter bit 3 kommer *"Hmm … vad blir det?"*. Sist i filmen: *"Så fint! Hej då!"*.

- **Aldrig** *"Vad kan det vara?"* (minnet *Aldrig "Vad kan det vara?"*). Frågan är *"Vad blir det?"*.
- **Inga djurnamn:** *"En kanin!"*, aldrig ett namn ur `karaktarer/`.
- Det riktiga ordet med artikel, som i Gissa: *"En bil!"*, inte *"Bilen!"*.

## Ljud

Bara ljud som finns. Ingen ny musik.

| Ljud | Fil | Anmärkning |
|---|---|---|
| Biten glider in | `effekter/swoosh` 1–4, roterar | vol 0.2 |
| Biten lyfts mot hålet | `effekter/hopp-mjuk` | vol 0.25 |
| Biten sätter sig | `effekter/knack` (träknack, CC0) | vol 0.55, låter som en träbit i brickan |
| Sista biten | `knack` och `effekter/ding` | |
| Bilden blir hel | `effekter/glitter` 1–4, ett per pussel | vol 0.35 |
| Levande | se *Levande*; filerna i mappen roterar per pussel | långa ljud kapas och tonas ut 0,4 s: `tuff-tuff`, `bjallror`, `vagor` 2,5 s, `mums` 1,8 s. `tindra-1/2` är platshållare och hoppas över |
| Saken poppar ut | `effekter/pop` 1–4 och lite `glitter-3` | vol 0.6 / 0.2 |
| Saken snäpper tillbaka | `effekter/duns` 1–4 | vol 0.5 |
| Jubel | varannat pussel `effekter/jubel` 1–4 (kapat 1,5 s), varannat tre `klapp` (0,28 s isär) | vol 0.4 / 0.5 |
| Under allt | Vanliga: `musik/stada-radion-slinga.m4a` (vol 0.13). Jul: `musik/jul/jul-badd-2.m4a` (vol 0.10). Slingan upprepas exakt på takten | tonas ut sist |

## De första filmerna

**Vanliga (11):** äpplet, bilen, kaninen, kon, grisen, katten, hunden, traktorn, flygplanet, brandbilen, båten.

**Jul (10):** pepparkaksgubben, julgranen, tomten, tomteluvan, snöflingan, snögubben, julklappen, risgrynsgröten, julskinkan, kälken.

Bilderna: Sannas Flow-bilder i `produktion/youtube/pussel/bilder/original/`, urklippta till `bilder/cut/`. Tomten, tomteluvan, snöflingan, snögubben, gröten, julskinkan och brandbilen kommer från `assets/rekvisita/*/cut/`. Äpplet och bilen (i `pussel-prov.py`) använder fortfarande de gamla bilderna.

Breda och höga bilder (julskinkan, kälken, snögubben, julgranen) ramas in med `hojd`, `yfast`, `bredd` och `xfast`: se *Snitten i datan*.

## Produktion

Allt ligger i `produktion/youtube/pussel/`:

| Fil | Vad |
|---|---|
| `pussel-prov.py` | motorn: ritar rutorna med Python (PIL) och lägger på ljudet med ffmpeg |
| `pusseldata.py` | pusslen (snitt, ordning, repliker, svar, levande, ljud, extra) och vilka som går i vilken film (`FILMER`) |
| `liv_extra.py` | ånga, granljus, blink och vink, ritat i kod |
| `manus.md`, `rost.txt` | manus och inspelningslistan till ElevenLabs (`… pussel-prov.py --rost` skriver om `rost.txt`) |

Kommandon (från repots rot):

- `python3 produktion/youtube/pussel/pussel-prov.py pussel-vanliga` (eller `pussel-jul`): hela filmen, ca 15–25 min. Kör i bakgrunden. Spara den förra filmen i `aldre/` först.
- `… pussel-prov.py tomten`: **gör alltid ett prov på ett pussel först** (`pussel-test.mp4`, ca 4 min) innan hela filmerna renderas.
- `… pussel-prov.py --remsa kon katten`: snabba remsor (`remsor/remsa-<namn>.png`) med snitten och de fem bitarna i ordning, utan film. Använd dem för att granska snitten.
- Sluttiderna utan att rita: sätt `BARA_TID = True` och kör `rendera` för filmens pussel; `TIDER` får (namn, start, slut) för varje levande slut. Bra för att ta ut stillbilder ur filmen.

Musiken byggs per film som en exakt upprepad slinga (`musikbadd`), så takten glider aldrig.
- **Short:** samma motor med 9:16-utsnitt, brickan högre upp och större.

## Snitten i datan

Varje pussel i `pusseldata.py` (`NYA`; äpplet och bilen i `PUSSEL` i `pussel-prov.py`) har:

- `bild`, `bg` (bakgrundsfärg), `hojd` (sakens höjd som andel av rutan; över 1 = beskuren) och `yfast` (0 = saken mot överkanten, 1 = mot nederkanten).
- `snitt`: `y` (vågräta skarven), `topp` (lodräta skarven överst), `botten` (de två nederst), alla som andelar av rutan. Bitarna är 0 överst till vänster, 1 överst till höger, 2–4 nederst från vänster.
- `snitt['agare']`: vilken bit en knopp sticker ut ur (`topp`, `b1`, `b2`, `h0`, `h1`, `h2`). Byt ägare när en knopp annars bär en ledtråd in i fel bit, som äpplets skaft eller ett hjul.
- `ordning`: (bit, replik) i den ordning bitarna kommer. Det som avgör sist.
- `svar` och `levande`, och `ljud` (mappen i `assets/ljud/effekter/` med sakens eget ljud).
- Valfritt: `extra` (`anga`, `lysa`, `vinka`, se *Levande*), `riktning=-1` för fordon som pekar åt vänster, `bredd` och `xfast` för breda bilder.

Lägg snitten så här: titta på bilden med ett rutnät (10 %), dra skarvarna mellan ledtrådarna, och kontrollera sedan bitarna en och en i ordning (en rad med de fem bitarna) innan du renderar.

## Att bestämma

- Shorts av enstaka pussel (9:16)?
- Malins röster i ElevenLabs ur `rost.txt`.
- Ska kritan vara med (till exempel lägga bitarna, eller rita bilden innan den blir pussel)?
