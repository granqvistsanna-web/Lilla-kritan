# Vägen 2 – blommorna, ballongen, frågan, refräng 2

Storyboardbild 06–09f, avsnittstid 1:11.6–1:59.0 (scentid 0–47,4). `node ../render.mjs vagen-2` ger `vagen-2.mp4` och `vagen-2-effekter.wav`.

Tiderna tas ur `M.bild(...)`. Orden ligger på de sjungna stavelserna i `stammor/vocals.wav` (librosa, sångtid):

- sniff 66,90 och 67,48
- mmm 67,62 (svagt, mest i kören)
- upp 76,09, 76,67 och 77,23
- "Nosen" 88,68 (rösten börjar 1,2 s efter raden i `rader.txt`)
- "och öronen" 91,0
- vick 93,34, 93,90 och 94,46: de betonade slagen. Mellan dem sjungs halvslag ("vicke").

| Bild | Vad som händer |
|---|---|
| 06 | Vägen rullar (hjulen, fartstrecken). Busken glider in från höger och musen tittar dit. |
| 06a | Vägen bromsar in mjukt och bilen gungar till. Musen är förvånad och pekar på blommorna (`mot('r', HÖGER)`). På "Blommorna är rosa" blir hon glad. |
| 06b | Närbild med busken på `NÄRA`. Doften är en prickig rosa slinga som glider från blommorna till nosen. Hon blundar från första sniff (njuter) och lutar sig bakåt till `rot: 8`. Nosen knycker upp på varje sniff. På "mmm" ler hon (`karleksfull`). |
| 07 | Vägen kommer upp i fart igen och busken åker ut till vänster. Ballongen svävar in högt uppe i mjuka vågor. |
| 07a | Vägen stannar och musen pekar upp på ballongen. |
| 07b | Närbild. Ballongen står snett ovanför (`[1270, 40–520]` i musens ruta) och stiger lite. Musen lutar sig bakåt (`rot: 7`) och sträcker armen upp till `UPP` på varje "upp". |
| 08 | Närbild. Hon tittar på tittaren med frågande min och lyfter vänster tass (`arm_l: 120`); den högra ligger på kanten. På "Kan du se?" lutar hon huvudet. |
| 08a | Skelögd från början. Kameran åker in mjukt (`inUt`) till 1,6× med nosen i mitten. |
| 08b | Fingret går till nosen på "Nosen" (`mot('r', [530, 430])`, fram) och hon skrattar. På "och öronen med!" tar hon ner armen och tittar upp. |
| 08c | Öronen vickar ut ±18° och tillbaka på varje "vick". Små streck vid öronen. |
| 09a–09f | `refrang.ny(M, '09', S)`. Scenens egna saker är gömda. |

**Öronen (08c), första versionen (borttagen 2026-11-05):** `oronVick()` i `index.html` lånar bara blobbildens pixlar och ändrar inget delat. Den maskar bort öronen ur `musen-mille-body.png` och lägger dem som egna kopior som vrids runt fästena i `ÖRON`. Rosetten följer med högerörat. Där örat låg över huvudet fylls hålet med kritstruktur ur huvudets mitt. Masken gäller bara medan hon vickar; annars är bilden orörd.

**Ljud:**
- `brum` i loop medan bilen kör (06–06a, 07–07a)
- `fagelkvitter` på 06–08c
- `pling` när busken och ballongen är hela i bild
- `hjul-gnissel` (svagt) vid de två stoppen

Alla ljudfilerna finns.

**Avvikelser:**
- Ballongen glider med 45 % av vägens fart, som om den vore högt uppe och långt bort. Annars hinner den inte synas mitt i 07, som i storyboarden.
- Busken ligger mitt i 07 lite längre in i bilden än i storyboarden, men den hinner ut innan 07a.
- Bilen i `bilen.js` är lite bredare än i storyboardbilderna. Det är den gemensamma bilen, inte ändrad här.
- 08c är glad med öppna ögon, som storyboarden.
- "mmm" hörs knappt i leadstämman. Leendet kommer på kören, 67,62.

**Ändrat efter videogranskningen (2026-11-04):** inga raka klipp längre. Övergångarna (`KAM`):
- 3,0–5,3: kameran åker långsamt in, och bilen kryper fram till busken.
- 5,3–5,8: zoom in till sniff-närbilden.
- 7,5–8,0: zoom ut.
- 11,9–12,4: zoom in till ballongen efter "Titta där!". Ballongen glider samtidigt närmare.
- 17,1–17,6: kameran glider över till frågan. Ballongen svävar upp ur bild i stället för att försvinna, och vänstra tassen svingar upp.
- 33,8–34,6: kritsvep i himmelsblått in i refrängen, med skrrrrt-kort.

Annat:
- Ballongen stiger ett steg och sträcker på sig på varje "upp".
- Ett litet skutt i 07 (boing).
- I 08a är pupillerna mer i kors och nosen nosar två gånger.
- 07a är bara ca 1 s i helbild innan zoomen, mot storyboardens 3,5 s.

**Kritstruktur (Sanna, 2026-11-04):** allt som ritas i kod har filtret `krita-vid` (helbild) eller `krita-nara` (närbild), med vingliga kanter och strimmigt vaxkorn: fartstrecken, doften, strecken vid öronen och nos-dinget. Kornet räknas i dukens mått, därför två storlekar. Strecken har ingen vit kant, som i storyboarden; bara utklippen har den.

**Fixlistan 2026-11-05:**
- 08c: hela huvudet vickar runt halsen (±9°, vänster–höger–vänster) och trycks ihop lite på varje "vick". Öronen klipps inte längre ur bilden.
- Strecken vid öronen (#4a4a4a) och nos-dinget (rosa) är hela, mjuka kritstreck, bredd 7, med bara vingliga kanter (`krita-mjuk`).
- Klipp på slaget mellan närbild och halvbild:
  - till halvbild under frågan, där hon tänker (tassen mot hakan, ögonen upp åt sidan, munnen snett);
  - tillbaka till närbild på "Kan du se?".
- 08a–08c är en enda kamerarörelse utan klipp: 1,6× på nosen i pausen, långsamt in (1,0 s) till 5× fram till "Nosen", ut till närbilden (1,2 s) och sedan vidare ut (0,6 s) till 08c:s lite vidare bild. Där står kameran still medan huvudet vickar.
- Öppningen: de rosa molnen (`ref.moln`) glider undan under första sekunden, med swoosh.
- Snusspåret slutar vid nosen. pschhh (vol 0,25, 0,3 s) på varje sniff.
- Ballongen lyfter ett mjukt steg på 30 px per "upp".
- Glidningen till frågan är mjuk, 0,7 s, utan zoomdipp.

**08–08c i en tagning (Sanna, 2026-11-05):** inga klipp och inga halvbilder i frågan längre.
- 08: båda tassarna på kanten. Hon tittar vänster och höger (två slag åt varje håll) och lutar huvudet med. Kameran glider ut till halvbilden och åker sedan långsamt in hela vägen till 1,6× närbilden på nosen, ända till slutet av pausen.
- "Kan du se?": vänstra tassen öppnas mot tittaren på 0,4 s (`FRAGA_L`), under ansiktet och inte över rutan. I pausen går den tillbaka.
- 08b: vänstra tassen går till nosen på 0,4 s. Kameran åker in till 2,1× närbilden (`NOS_ZOOM`) och står still. På "och öronen med" går den ut på 1,4 s, samtidigt som armen går ner, till 08c:s bild med båda öronen.
- Alla armar och lutningar glider mellan lägena, och ingen arm går över vindrutan.

**QA 2026-11-05:** halvbilden på "Ballongen är rosa" är borttagen. Närbilden på ballongen är en enda tagning från zoomen efter "Titta där!" till glidningen in i frågan.

**Polish 2026-11-05 (Sanna: "better flower next to bush, bg color peaking through", "more sound effects"):**
- Blomman (`blommaNy`) är omritad: fem rundade kronblad i två rosa, gul mitt, stjälk med två blad, i en grästuva vid vägkanten (`BLOMMA_G`), jämn vit kant. Varje del har en täckande botten i en mörkare ton (`krita-bas`) under kritkornet, så att den gröna bakgrunden inte lyser igenom. Stjälken och blomman gungar, tuvan står still.
- Buskens små vita prickar är nedtonade med filtret `buske-slat` (bara inne i busken; kanten och den vita konturen är orörda).
- Nya ljud, mjuka och mellan orden: pling när busken och blomman syns hela, swoosh och plupp (med en avgaspuff) när bilen kör vidare, pop när ballongen kommer in, wiii efter tredje "upp", swoosh när kameran glider till frågan, glitter i pausen, fniss efter "Nosen" och boing efter varje "vick".
