# Refrängen: Kolasåsresan (bildplan, 2026-11-05)

Sanna: "need something more visually engaging, look at orange and rosa for inspo … maybe something a bit silly … brun är den godaste färgen".

**Konceptet:** vers 1 bygger upp det (*"Björnen tycker brunt är gott! Choklad är brun, kola är brun – mmm!"*), och i refrängen är *godaste* slutsatsen efter plasket och kolan på nosen. rosa var favoritfärgen, orange den bästa, brun är **den godaste**. Refrängen är en liten resa, samma varje gång: vägen → stranden → kolasåshavet, och hem med kolasåsen igen. Det som gjorde 005 och 006 roliga finns med: världen byter färg (vägen blir gyllene kola), ett busigt fantasiögonblick (lastbilen plumsar i kolasåsen och flyter), och bubblor med bruna saker vi hittat (som apelsinbubblan). Kanelbullsberget, kolasflaskorna och chokladflaskorna är strukna.

Byggd i kod (tagning 3, 2026-11-05): `scener/refrang.js`, bilderna a–h i storyboarden är stillbilder ur den (`storyboard/refrang/`). Havet är bakgrunden `bakgrunder/kolasashavet.md` (platt, chokladbackar), bubblorna är `rekvisita/choklad.md`, `rekvisita/kola.md` och kanelbullen. Skiss: `round3.html` i skissmappen. Texten och dansen står i [sang.md](sang.md).

## Regler för alla bilder
- Lastbilen kör alltid åt höger och vänds aldrig, den lutar bara med vågorna. Figurer snurrar aldrig, kepsen vinkas.
- En sak i taget, rörelser på slagen, allt i par. Inga snabba ryck: fyra av bilderna är kamerarörelser i samma bild, inte klipp.
- Huvudsaken på en tredjedel, aldrig avskuren. Lastbilen 35–45 % av bildhöjden i helbilderna.
- I havet sitter lastbilen ner i kolan: hjulen bakom ett främre våglager, så att den flyter i stället för att sväva.
- Saker på ord blir klistermärken med vit kant (som 005). Nallen sitter på flaket i alla bilder.

## Bild för bild

| Bild | Rad | Bild och rörelse | Nytt i kod |
|---|---|---|---|
| 1 · vägen, halvbild | "Brun, brun! (Brun, brun!)" | Bulle stampar två gånger, lastbilen skumpar. Ett brunt tassavtryck poppar upp per "brun", ekot två till: fyra i rad. | tassavtryck |
| 1 forts. · kameran följer | "Lastbil, lastbil – (brum, brum!)" | Lastbilen kör åt höger, en vit puff per "brum". Framför den rinner en gyllene kolatunga in över vägen från höger kant. | kolatungan |
| 2 · kolasåsövergång, havet, helbild | "Plask i kolasåsen – (plask, plask!)" | Vägen slutar i ett gyllene kolasåshav (himmel, sol, moln). Lastbilen rullar ner i det: PLASK, en krona av kola med vit kant. Ekot: ett andra plask, och lastbilen flyter. | havet (tre våglager), plaskkronan |
| 3 · klipp, havet, helbild | "Hoppa, hoppa – (jiihaa!)" | Två mjuka vågtoppar, två lugna hopp, och två koladroppar hoppar med i bågar som delfiner. På "jiihaa!" vinkar Bulle. Kotten kommer flytande i en kanelbulle som badring och stannar vid lastbilen. | |
| 3 forts. · kameran andas in | "Gunga, gunga – (hej hå!)" | Stora långsamma dyningar, lastbilen lutar hit … och dit. Nallen guppar med på flaket. | |
| 4 · klipp, närbild | "Kola på nosen – (mums, mums!)" | En kolaklick skvätter upp och landar på Bulles nos, och en liten på nallens huvud. Bulle slickar två gånger. | kolaklickar |
| 5 · klipp, halvnära | "Brun är den godaste färgen! (Mmm!)" | Refrängens ögonblick (Sanna 2026-11-05: bubblor var för lata): godiset dyker upp i kolan runt lastbilen, ett per ord. En stor chokladruta flyter upp som flotte, en kolabit guppar upp som boj, kotten skuttar i sin kanelbullsring. "Mmm!": allt guppar, glimtar och små bruna hjärtan stiger, Bulle slickar sig om munnen. | chokladflotten, kolabojen, hjärtan |
| 6 · klipp, närbild ratten | "Tut, tut! (Tut, tut!)" | Tassen på den gröna knappen, en vit ring per tut. Ekot: lastbilen svarar själv. | |
| 7 · klipp, helbild | "Vad är brunt? Titta ut!" | Kameran drar ut över havet, Bulle spanar åt båda hållen, kolasåsen väller ner igen och rinner av: tillbaka på vägen och nästa bruna sak. | |

Ca 21 s, sju bilder (sex klipp) på nio rader: i snitt ca 3 s per bild, högst ett klipp per sjungen rad.

**Kolasåsövergången** (Sanna 2026-11-06): i stället för klippet från vägen till havet rinner tjock kolasås ner över hela bilden de sista 0,75 s av "brum, brum" (runda droppar i underkanten, vit kritkant, ljusa vaxstreck, ett slurp), och på "Plask i kolasåsen" rinner den av nedåt och visar havet. Samma väg hem (Sanna 2026-11-06: åt båda hållen): på "Vad är brunt?" väller såsen ner över havet och rinner av och visar vägen, i stället för kritsvepet. Det är en ny övergång utöver formatets (zoom, kritsvep, moln, kritiris), ett medvetet undantag som 006:s orange torka, och den finns bara i refrängen (`refrang.js`, `sasRita`).

**Medvetet undantag**, som Glassberget i 005: kolasåshavet är fantasi, men bara i refrängen. Det är en tredje plats utöver vägen och ängen, som discot. Allt ritas i kod, inga nya bilder.

**Sista refrängen** ("Kotten, nallen, bullen – bruna!") står kvar i discot som förut.
