# Discot – avsnitt 005, bild 14f–17

Danspausen, sista refrängen i discot, glassberget (15e), hej då (16) och zoom ut till papperet (17).
Avsnittstid 2:23.3–3:05.5 (scenen är 42,2 s), sångtid 2:12.3–2:54.5. Sången går till scenens slut och tonas ut i monteringen (de sista 2 s).

```bash
node render.mjs discot                     # → discot/discot.mp4 och discot-effekter.wav
node render.mjs discot 0.7 2.0 3.6 6.1     # stillbilder → discot/stills/
```

`stills/jamforelse.jpg`: storyboarden (vänster) bredvid scenen (höger), en rad per bild, på bildens mitt.

## Bilder

Tiderna läses ur SHOTS i `../../storyboard/bygg.py` (`M.bild`), så en omtajmad storyboard slår igenom. Måtten är bygg.py:s
(`SOLO_H/FOT`, `KULA`, `IKON_BÅGE`, `DUO_H`, `V_H/V_FOT`, `EGEN`, `stjärnregn`, `skugga`).

| Bild | Scentid | Vad |
|---|---|---|
| 14f | 0–1,4 | Kritsvep in i discot: rosa klotter som smular bort på 0,6 s (täckningen hör till slutet av kiosken). Musen landar mitt i bild (boing) och hoppar och gungar i takt med armarna upp, stjärnregn runt henne |
| 14g | 1,4–2,7 | Samma bild: musen tar ett steg åt vänster och blir mindre (`DUO_H`), grodan hoppar in från höger (boing). Båda hoppar och gungar i takt |
| 14i | 2,7–5,0 | Kaninen solo (10 % större än de andra), hoppar på varje slag. 0,4 s längre än storyboarden |
| 14j | 5,0–7,7 | Humlan solo lyfter och vänder sig ett helt varv runt sig själv (smal på kanten, ryggen halvvägs), och svävar sedan stilla (surr) |
| 14k | 7,7–9,5 | Dinon solo: två tassar kommer in framför bröstet och möts på varje slag (klapp); stampar varannan fot (dunk) |
| 14l | 9,5–12,7 | Alla fem i V:et, ritade bakifrån (musen sist), alla med armarna upp och hopp på slaget |
| 14m | 12,7–17,9 | Samma, alla fem med händerna på hjärtat och gungar; andra halvan en arm upp åt sidan, sedan den andra |
| 15a | 17,9–21,6 | Bara blomman (ritad i kod, i stället för busken): en stor dekal slås upp i mitten på "Blommor" och flyger upp i bågen när raden tar slut |
| 15b | 21,6–23,9 | Bara ballongen, likadant |
| 15c | 23,9–28,7 | Nosen, glassen och bilen en i taget, ca 1,5 s var: varje sak flyger upp i bågen strax innan nästa slås upp. Nosen är inzoomad på musens nos, som lyser rosa |
| 15d | 28,7–32,1 | Alla fem, händerna på hjärtat |
| 15e | 32,1–34,0 | Kritsvep i himmelsblått från gruppen (0,55 s täcker, 0,45 s smular), glassberget (`refrang.glassberg`, flaggan till höger och strössel som i refrängen): flaggan (plopp) och jubel |
| 16 | 34,0–37,8 | Kritsvep i rosa från glassberget. Musen i bilen (0,4·H, ett klistermärke med samma vita kant och skugga som dekalerna) rullar in mjukt från vänster kant på 2,6 s (brum), tutar tydligt på varje "tut" (bilen studsar) och stannar i lugn takt mitt under bågen, där den trycks ihop som en dekal som slås upp |
| 17 | 37,8–42,2 | Börjar när "tut, tut" är slut (instrumentalen, sångtid 2:50.1). Lilla Kvacks kritiris (`produktion/code-shot/bedtime`): en vinglig cirkel med nio bucklor och krämvit kant sluter sig runt musens ansikte på 1,6 s (svag swoosh), håller på henne 1,2 s medan hon vinkar, stängs på 0,8 s, en stjärnglimt i det svarta och slutar svart. Avviker från formatet (bara zoom och kritsvep); Sanna bad om irisen |

### Dansrörelserna

**Solobilderna** (14i–14k) visar varje statists egen rörelse: kaninen `hopp`, humlan `snurra`, dinon `klapp`.

**Gruppbilderna** (14l, 14m, 15d) dansar alla fem samma rörelse samtidigt, sångens (sang.md), så att ett litet barn kan härma en tydlig rörelse. Tabellen `DANS` i index.html styr det:

| Rad | Rörelse |
|---|---|
| 14l "Alla dansar – rosa dans!" | `upp`: armarna upp, hopp på slaget |
| 14m första halvan | `hjarta`: tassarna på hjärtat, gungar |
| 14m andra halvan (från `MITT`, ett jämnt slag) | `sida`: en arm upp åt sidan, sedan den andra |
| 15d "Rosa är min favoritfärg" | `hjarta` |

Armarna räknas från varje figurs egna axlar, med samma vinklar för alla: `upp` snett uppåt (ca 30° från lodrätt), `sida` ut och upp åt höger i bild och sedan åt vänster, och alla lutar åt samma håll. Armarna är korta och sitter bakom kroppen, så axeln flyttas upp och ut medan armen är lyft, annars gömmer kroppen dem. V:et är mindre än i bygg.py (0,34–0,41 H, kaninen störst av djuren) och utspritt över bilden. Kaninen och grodan ritas först, humlan och dinon efter, så att de yttres lyfta armar syns över grannarnas axlar.

På `hjarta` är djurens armar för korta för att nå bröstet. Alla fyra får därför två runda tassar i kroppens egen krita på bröstet framför kroppen (grodans och kaninens armar göms så länge), och musen lägger sina egna tassar där.

Små egenheter, så att de inte ser kopierade ut:
- Humlan svävar och guppar i stället för att hoppa, och vingarna flaxar.
- Kaninen studsar efter ett halvt slag. Öronen sitter i kroppsbilden, så hela kroppen sträcks lite.
- Dinon svänger stjärten i takt: hela kroppen lutar lite åt varje håll.
- Var och en blinkar i sin egen takt.
- Dinon och humlan har för korta armar för hjärtat, så deras runda tassar läggs på bröstet framför kroppen.

### Humlans och dinons lemmar

Deras utklippta armar och ben (`cut/*-arm-*.png`, `*-leg-*.png`) har raka snittkanter med en bit kroppstextur, som syns
när de vrids (dinons armar syntes inte alls). Scenen gömmer dem och ritar rundade lemmar i kod, på samma sätt som
`verktyg/rita-lemmar.py` gjorde för grodan och kaninen: en kapsel i kroppens egen kritstruktur (ett mönster ur kroppsbilden),
vit kant och toppen gömd bakom kroppen. Dinons armar når inte mitten, så klappen har två egna tassar (samma krita, vit kant) som ritas framför kroppen. Humlans ben tar strukturen ur den bruna randen. Ingen ny bildfil. Vill Sanna ha dem
som riktiga riggdelar kan `rita-lemmar.py` köras för de två figurerna (det skriver nya PNG:er i figurmapparna, så det kräver hennes ok).

### Ögonen

Öppna ögon nästan hela tiden. Solo tittar figuren in i kameran, i V:et och bredvid musen tittar den mot musen. Glada stängda
ögon bara ett kort ögonblick: i slutet av varje fras om fyra slag och när kaninen landar.

### Golvet

Dansgolvet ritas i kod från y 560 och nedåt: rosa krita `#F4A6C8` med stora rutor i perspektiv i `#E98DB7`, `#backkorn` och en vit kritkant upptill. Rutorna står still, inget blinkar. Golvet följer med discot (det syns inte i 15e).

### Kulan

Kulan snurrar åt vänster, ett varv på 9 s. Klotets rutor ritas i kod ovanpå bilden: 16 longituder och 8 rader i bildens
fyra rosa toner, med en skugga mot kanten. Konturen och den vita kanten står still. Rutorna trycks ihop mot kanterna som på
ett riktigt klot, glimtarna vandrar över framsidan och ljusprickarna på väggen driver åt samma håll. Det behövs ingen ny bild.

### Dekalerna

De rosa sakerna (15a–17: först stora i mitten, sedan i bågen) och rörelsesymbolerna (14i–14m) är samma sorts klistermärke, ritat i kod: en mjuk
kritskugga, en tjock vit stansad kant, en ljusrosa skiva med papperskorn och motivet i mitten. Alla är lika stora.
- **Bågen:** samma x som `IKON_BÅGE`, y på en jämn parabel under kulan, och de lutar växelvis −5°/+4°.
- **Entré:** dekalen faller in 46 px ovanifrån på 0,18 s, fastnar på ordet (pop), trycks ihop mot sin underkant, vickar till och lägger sig.
- **Sedan:** ett lugnt gung (3 px, ±1,2°) som är förskjutet mellan dekalerna, och ett gemensamt skutt på slaget efter att "favoritfärg" (15d) börjat.
- **Rörelsesymbolerna** sitter i övre högra hörnet, 1,3 gånger större, och slås upp på varje sjungen rörelse. De dras av (krymper med en vickning) när raden tar slut:
  - hoppa: en hög prickad båge mellan två markstreck, och bollen hoppar fram och tillbaka längs den
  - snurra: en spiral som snurrar
  - klappa: två tassar som slår ihop på slaget
  - "Alla dansar – rosa dans!" till sista refrängen: två noter
  
  Inga pilar och ingen text, enligt briefen. Ett svagt pop på varje symbol.

Statisterna gör sin egen rörelse i takt hela tiden de syns, också i V:et. Kulan snurrar: glimtarna vandrar över den
(platt bild, den vänds inte) och ljusprickarna driver sakta. Småbilderna står kvar från sin pop till slutet (inte i 15e).

### Kritstrukturen

Allt som ritas i kod ska se ut som vaxkrita. Det får `#backkorn` ur `kit.backar()` (samma definition: en ojämn kant och ett kritkorn i fyllningen), satt på varje saks egen grupp så att kornet följer med när saken rör sig:
- `#backkorn`: stjärnregnet.
- `#kritkorn`: en finare och glesare variant med mindre ojämn kant. Den används på dekalernas vita kant och skiva, blomman, rörelsesymbolerna, kulans rutor och glimtar och ljusprickarna, eftersom dekalerna är förstorade 1,3–3,1× och backkornet blev för grovt där.

Bilderna i dekalerna (ballongen, nosen, glassen, bilen) får inget extra korn, eftersom de redan är krita. Humlans och dinons ritade lemmar har kroppens egen kritstruktur och ligger under kitets `#boil`.

Inga rörelsestreck, utropsstreck eller tutstreck: Sanna tog bort dem (de tillförde inget). Stjärnorna, dekalerna och irisen är kvar.

## Ljud

boing (14f, 14g), glitter (kulan, när discot börjar och vid hej då), surr (14j loopat; svagt i V:et, där humlan svävar),
dunk och klapp (dinon på varje slag i 14k, 4 dB lägre än förut; klappens två tagningar växlar), skrrrrt-kort (ett per kritdrag i svepen), klistra (varje dekal och rörelsesymbol som slås upp, svagare när
dekalerna fastnar i bågen), pop (flaggan i 15e), jubel (15e), brum (bilen startar), tuta-tut (×2), swoosh (17).
**Saknas (tyst anrop):** `plopp` (flaggan, pop ligger under så länge).

## Avvikelser och att se upp med

- **"Tut, tut" och "nos – glass – bil" är uppskattade:** rader.txt har bara radernas början. Tuten ligger på slaget vid 62 % av raden "Hej då, hej då – tut, tut!" och nästa slag; popparna i 15c på de tre första slagen i raden. Lyssna och flytta `TUT`/`POP` om de inte sitter.
- **Bilen i 16** börjar vid x 560 (inte 820 som storyboarden) så att den hinner köra åt höger och ändå syns i 17, där den är vid högra kanten.
- **Pilarna** i storyboarden (kulans varv, hopp, humlans ring) är rörelse, inte ritade.
- **Bild 18 (outrot) är inte med:** det finns ingen outrofil i `assets/format/`.

## Förslag: en ny blombild (Sanna gör den)

Busken i 15a läste som en grön klump: de rosa blommorna var små prickar och det mesta av bilden var grönt mot den rosa
väggen. `lager/blomma.png` är för liten (109 × 196 px) för att förstoras. Tills en ny bild finns är blomman ritad i kod:
fem rosa kronblad, gul mitt, grön stjälk och ett blad, och den gungar lugnt. Prompt för en riktig blomma (grundprompten läggs
först, som i `rekvisita/*.md`):

```prompt
A single big flower facing the viewer, five round puffy petals in bright pink (#F06EAA) with a lighter pink centre on each petal, a round sunshine-yellow middle, a short thick green stem with one rounded leaf on the side, simple crayon drawing with grainy wax texture and a thin chalky light edge, no dark outline, centred, on a plain white background.
```

**Hjärtan och puffar:** på "favoritfärg" (14m) stiger tio rosa hjärtan upp ur gruppen som i refrängen men 2,5 gånger större och högre upp, över huvudena (två över varje figur, ett var 0,38 s från mitten och utåt). När bilen rullar in (`KOR`–`STANNA`) puffar avgasröret med `bil.puffa`: på brum, varannat slag och när den stannar.
