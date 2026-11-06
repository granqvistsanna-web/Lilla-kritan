# Avsnitt 014 – Gröna sången (plan)

**Status:** sången är tagen (`sang.m4a`, 3:26.4, tider i `rader.txt`), storyboarden har tider; de nya sakerna görs. Färgsång i serien efter [005 Rosa sången](../005-rosa-bilen/README.md), [006 Orangea sången](../006-orange-baten/README.md) och [007 Bruna sången](../007-bruna-ladbilen/README.md): samma låtform, samma refrängdans, samma mönster ("Vad är grönt? Titta där!").

| | |
|---|---|
| **Titelkort** | Avsnitt 14 · Gröna sången |
| **Figurer (3)** | Leoparden Lova (huvudfigur, kör traktorn; ljust sandgul med bruna prickar, så att det gröna syns), Kycklingen Pip (solgul, bor på bondgården och sitter på bänken vid ladan; hennes ärtplanta växer vid staketet), Grodan Gurra (grön sak 1, hoppar sedan i förväg till bänken och får den tredje ärtan; inga repliker). Lova har inte varit med i något avsnitt, Pip inte sedan 002. |
| **Platser (2, båda finns)** | A: Vägen (körscen, två stopp och frågan) · B: Bondgården (gul vägg med ladans röda dörr, höet och staketet: det gröna lyser mot gult; "Här bor Pip". Traktorn stannar vid ladan och Lova kliver ur) |
| **Nya saker (2)** | Gröna traktorn: en liten rund leksakstraktor utan ansikte, med ett tak på två smala stolpar över sätet (öppna sidor), stort bakhjul och litet framhjul, ljusgrå fälgar och ett kort avgasrör (putt, putt, tut, tut) · Ärtskidan (hel, öppen med tre ärtor, en lös ärta) |
| **Undantag: tredje nya saken** | Trafikljuset (rött och grönt, en stolpe och en svart låda), bara vid vägen (grön sak 2), Det bär raden *"Grönt betyder kör!"* i grön sak 2. Går att rita i kod, men figurerna väntar på det, så det räknas som sak. Se Öppet 1. |
| **I kod, inga nya bilder** | Lovas gröna jacka med dragkedja (en enkel form över bröstet och armarna, som flytvästen i 006), traktorns lilla flagga (`flagga-rosa` omfärgad till grön), vita avgaspuffar, Vägens vägg omfärgad (se nedan), det som växer i refrängen (groddar, jordhögen, Gurras växt, lampblomman, se refrang-plan.md), ärtplantan på gården (stjälkar i kod med skidorna ur `artskida`), träbänken vid ladan (brun, i kod), discot omfärgat till ljusgrönt/mint |
| **Kamerainställningar (6)** | kritan ritar · körscen på vägen · närbild Lova i traktorn · bondgården helbild (med tvåbilden, ett närmare utsnitt) · närbild Pip på bänken · dansbild (discot: Lova, Pip och Gurra står och dansar, ingen traktor) |
| **Nya poser** | Lova sitter i traktorn (öppet säte, armarna ska synas, se nedan) · Lova kliver ur och står vid bänken (helriggen med lemmar finns) · Pip sitter på bänken med ärtskidan (hennes rigg finns, så det är ett utsnitt och armarna ur riggen) · Gurra sitter på bänken |
| **Statister** | Kon Kajsa och Fjärilen Fia (danspausen; en rörelse var, inga repliker) |
| **Favoriter i bakgrunden** | ✈️ Pella flyger förbi långt bort på himlen över vägen (inte med sedan 004) |
| **Sången** | glad mjuk soulfunk (Rhodes, wah-gitarr, congas; inte 005:s slapbas och blås), ca 88–94 bpm (Suno ombedd om 88), hooken *"Grönt får allt att växa! (Väx, väx!)"*; *"Grönt betyder kör!"* vid trafikljuset |
| **Kärna** | Grönt är Lovas favoritfärg. Hon kör sin gröna traktor och hittar grönt överallt. Vid trafikljuset väntar hon på grönt. På bondgården kliver Lova ur traktorn, och Pip plockar en ärtskida från sin ärtplanta: precis tre ärtor, en till Lova, Pip och Gurra. Lovas ärta hoppar iväg under bänken, och nu räcker det inte till alla. Pip pickar fram den, och det räcker igen. |
| **Barnet övar på** | färgen grön, peka och leta, vänta på grönt (rött syns i bild men sjungs inte), räkna till tre, en till var och en, säga tack, dela, hjälpa en kompis |

Favoriter: 🐥 kyckling, 🐸 groda (S), 🦋 fjäril (S), ✈️ flygplan (B) · nya: 🚜 grön traktor (sak), 🐆 leopard, 🐄 ko (S). Raderna till `harriets-favoriter.md` står i [att-lagga-till.md](att-lagga-till.md).

Sången: [sang.md](sang.md), Suno: [suno.md](suno.md), storyboard (utkast): [storyboard.md](storyboard.md). Manus och bildlista görs som i 005–007 när sången är tagen.

## Grönt som syns: bara målen är gröna

Gräs och träd är redan gröna, så samma regel som brunt i 007: **inget annat grönt i bilden**, bara det vi letar efter.
- **Vägens vägg** är ljusgrön (`#A6D86B`). Den omfärgas i kod till ljusblå himmel `#A8DCF2` (som sjön och bryggan), annars försvinner traktorn. Inga gröna lager från `vagen-saker/` (gran, björk, lövträd, backe); stugan, brevlådan, staketet och den rosa busken går bra.
- **Bondgården** har gul vägg (`#F6C21C`), ladans röda dörr, gult hö och vitt golv: inget grönt alls utom ärtplantan, som är målet. Grönt mot gult syns tydligt. Träbänken ritas i brunt.
- **Traktorn** är klart gräsgrön (`#3FA34D`), en ton mörkare än Gurra (`#6DBE45`), så att grodan och traktorn inte flyter ihop när han hoppar förbi. Ärtorna är ljust ärtgröna (`#8CCB4E`).
- **Kontrast i figurerna:** Lova är sandgul och Pip solgul, båda bär grönt bra.

## Refrängen: Ärtrankan (2026-11-06)

Kroken är **"Grönt får allt att växa!" (Väx, väx!)**, enligt `format/fargsangernas-refranger.md`. Vers 1 bygger upp den (gräset och bladen växer), och refrängen är en liten resa, likadan varje gång: en ärta ploppar ner bakom traktorn och växer till en jättestor ärtranka, traktorn åker upp på den, Gurra blir jättestor en stund (det busiga), ärtskidan, den gröna lampan och flaggan växer fram på rankan en per ord, och ett kritsvep tar oss hem. Allt grönt i bild växer på varje "väx". "Grönt betyder kör!" sjungs nu bara vid trafikljuset. Ärtresan och ärtbubblan är strukna.

Bild för bild: [refrang-plan.md](refrang-plan.md). Dansen (sitta på huk och växa upp, klättra, sträcka på sig): [sang.md](sang.md). **Medvetet undantag** som Glassberget och kolasåshavet: rankan är fantasi, bara i refrängen, och en extra bakgrund (se Behöver skapas). Sista refrängen står kvar i discot. Sången behöver en ny tagning (Suno version 3).

## 007 → 014, rad för rad

Allt som inte står här är likadant som i 006/007 (introt, refrängdansen, klippmönstret, danspausen, sammanfattningen, slutet med kritirisen; slutögonblicket, se nedan).

| 007 Bruna sången | 014 Gröna sången |
|---|---|
| Björnen Bulle | Leoparden Lova |
| Bruna lastbilen (brum, brum, tut, tut) | Gröna traktorn (putt, putt, tut, tut) |
| Vägen glider, ljusgrön vägg | Vägen glider, väggen omfärgad till ljusblå |
| Lammet Ludde på filten | Kycklingen Pip på bänken |
| Ängen | Bondgården (Lova kliver ur som Bulle på ängen) |
| Brun sak 1: kotten (dunk) | Grön sak 1: grodan som hoppar över vägen (hopp, hopp, hopp – Lova studsar i sätet) |
| – (lerpölen struken) | Grön sak 2: trafikljuset (lyser rött i bild; vänta, vänta – grönt – kör, kör, kör! Lova pekar och pumpar armarna) |
| Frågan: pälsen och öronen | Frågan: jackan och flaggan (zipp, zipp, zipp – Lova drar upp dragkedjan) |
| Brun sak 3: kanelbullen (snurr) | Grön sak 3: ärtorna (en, två, tre – Lova räknar på tassen) |
| Countryshuffle, 92 bpm, "Brun, brun, brun!" | Mjuk soulfunk, ca 88–94 bpm, "Grönt betyder kör!" |
| Kolasåsresan | Ärtrankan: en ärta ploppar ner och växer till en jättestor ranka som traktorn åker upp på (fantasi, bara i refrängen) |
| Bullen rullar nerför backen | En ärta hoppar ur skidan och rullar in under bänken |
| Igge rullar ihop sig och stoppar den | Pip hoppar ner, trillar lugnt, reser sig själv och pickar upp ärtan med näbben (kycklingar pickar ärtor, verklighetsnära) |
| Korg full av kanelbullar | En ärtskida från Pips ärtplanta med precis tre ärtor (resten av plantan har bara små skidor som inte är mogna, så det finns inte fler) |
| En bit var – alla tre | En ärta var – Lova, Pip och Gurra; Gurra har suttit på bänken hela tiden |
| Vers 3 slutar "Mums, mums, mums – hurra!" | Vers 3 slutar med "Grönt! Nu kör vi!": Lova står kvar vid bänken (hon kliver inte upp i traktorn igen), och Pip håller upp den tomma ärtskidan som ett grönt ljus |
| "Hej då": Bulle vinkar i discot | samma: "Hej då, hej då – putt, putt!", ingen traktor i discot: Lova står i mitten och vinkar med Pip och Gurra; i outrot kör Lova traktorn över åkern där ärtplantorna växer upp, och kritirisen sluts runt henne i traktorn |
| Himlen glöder varmbeige | Allt grönt i bild växer på varje "väx" (Ärtrankan) |
| Discot ljusbrunt | Discot mint/ljusgrönt med en grön kula |
| Statister: Igge, Gurra, Mille | Statister: Kajsa (vicka, skällan plingar), Fia (flyga runt); Gurra (hoppa) är figur men dansar med |

## Ledtrådar när kritan ritar

1. **"Kritan ritar …"**: den runda gröna kroppen, sätet och motorhuven med avgasröret *(skrrrrt)*.
2. **"vad kan det vara?"**: ett stort hjul bak och ett litet hjul fram *(skrrt, skrrt)*.
3. Pausen: den sista ledtråden, hytten, ett tak på två smala stolpar över sätet. Nu är traktorn lätt att gissa.
4. **"En traktor! En grön traktor!"**: traktorn skumpar till och puffar en vit puff. *"Tut-tut, nu kör vi!"*

## Trafikljuset (grön sak 2)

Verklighetsnära och en vardagshandling: traktorn **stannar när lampan lyser rött**, Lova håller upp tassen och kören sjunger *"vänta, vänta"*; det är stilla en takt. Rött **sjungs inte**: för 1–2-åringar blandar det ihop vilken färg vi lär oss, så det röda syns bara i bild. Lampan slår om till grönt (pling), och traktorn kör: *"kör, kör, kör!"*. Trafikljuset står vid vägkanten och glider in med vägen, som kotten i 007. Det står bara vid vägen; på gården finns inget trafikljus.

## Luckan vid bänken (mellanspelet, ca 16 s)

> **LOVA:** Hej, Pip!
> **PIP:** Pip, pip! Hej, Lova! Jag har tre ärtor – en till var och en! *(pekar: Lova, Pip, Gurra)*
> **PIP:** Varsågod! *(ger Lova en ärta, pling; Gurra får sin)*
> **LOVA:** Tack!

Pip har **en enda ärtskida** med **precis tre ärtor**: en till Lova, en till Pip och en till Gurra, som sitter bredvid henne på bänken; Lova står framför. Hon plockar skidan från ärtplantan och räknar dem på *"en, två, tre!"*. Missödet ligger på vers 2: Lovas ärta hoppar ur tassen, studsar och rullar in under bänken. *"En, två – men vi är tre!"*: nu räcker det inte till alla, och det är därför Lova blir ledsen (inte för att en ärta är borta, för det finns inga fler). Kören frågar *"Vem kan hjälpa?"*, en takt tyst så att barnet kan ropa *"Kycklingen!"*. Pip hoppar ner från bänken och trillar lugnt på rumpan (oj!), reser sig själv direkt och pickar upp ärtan. Nu räcker det igen: en ärta var till alla tre.

## Slutet: grönt, nu kör vi!

Sången följer samma form som 005–007 och slutar med sista refrängen och *"Hej då, hej då – putt, putt!"*. Slutögonblicket är eget: sista raden i vers 3, efter delningen och "mums", står Lova kvar vid bänken, och över båda *"Grönt! Nu kör vi!"* håller Pip upp den tomma gröna ärtskidan högt som ett **grönt ljus** (pling) och alla pekar framåt. Hooken knyts ihop: grönt betyder kör, och det gröna ljuset är nu Pips ärtskida. Sista refrängen stannar i discot som i 007: över *"Hej då, hej då"* står Lova i mitten och vinkar medan Pip och Gurra vinkar bredvid (ingen traktor i discot), och i outrot kör Lova traktorn över åkern medan ärtplantorna växer upp bakom henne och Pip och Gurra dansar i kanten, tills kritirisen sluter sig runt henne. Ingen kram.

## Lovas armar

I 007 nådde Bulles armar inte över lastbilens kant, och inga armrörelser syntes. Traktorns säte ska därför vara **öppet och lågt framtill**: Lova sitter högt bakom ett litet rattlöst instrumentbräde, så att hon syns från midjan och upp och armarna går fritt. Lova har bara helbilden i `cut/` (inga lösa armar), så armarna behöver göras som för Musen Mille (`verktyg/rita-lemmar.py`). Det är hennes nya pose.

## Behöver skapas

Inget av detta är gjort; det skapas tillsammans med Sanna (inga filer i `rekvisita/` eller `karaktarer/` från den här planen).

| Vad | Var | Förslag |
|---|---|---|
| **Gröna traktorn** | `rekvisita/traktor-gron-oppen.md` | se prompten nedan |
| **Ärtskidan** | `rekvisita/artskida.md` | hel skida, öppen skida med tre ärtor, en lös ärta |
| **Ärtrankan** (extra bakgrund, bara i refrängen) | `bakgrunder/artrankan.md` | ljusblå himmel `#A8DCF2` med vita moln och en tunn grön markrand längst ner; rankan i lösa lager så att den kan växa i kod: stjälkbitar, stora blad, klängen, ärtskidor. Prompt nedan |
| **Trafikljuset** (undantaget) | `rekvisita/trafikljus.md` eller bara i kod | en svart låda på en grå stolpe, två runda lampor: röd överst, grön under; tänd lampa ljus, släckt mörk |
| **Lova i traktorn** | pose, `assets/karaktarer/leoparden-lova/` | armar och ben som lösa delar, sitter |
| **Pip på bänken** | pose | utsnitt av riggen, sittande |

Inga nya figurer. Inga nya platser utöver ärtrankan, som bara finns i refrängen.

**Humör som saknas** i `verktyg/ansikten.py` (förslag, inget är ändrat där; storyboarden använder de befintliga tills vidare):
- `stolt`: glada stängda ögon, brett leende, huvudet lite bakåt. För 08c när Lova drar upp jackan själv (nu `njuter`).
- `anstranger_sig`: hopknipna ögon, munnen ett litet streck åt sidan. För 14b när Pip pickar under bänken (nu `nyfiken`).

Förslag på prompter (engelska, i husstilen; justeras när sakerna skapas):

```prompt
A small round toy tractor seen from the side, no face, a chunky rounded body in bright grass green (#3FA34D) wax crayon, one big back wheel and one small front wheel with dark grey tyres and light grey hubs, a short grey exhaust pipe on the hood, an open low seat with no cab and no roof, very minimal and flat, no shading, no outline, only a thin chalky white rim, on a plain white background.
```

```prompt
Two-zone picture for a fantasy song scene: a flat light blue sky (#A8DCF2) with grainy oil pastel texture and a few soft white crayon clouds filling almost the whole picture, a thin strip of grass green ground along the bottom edge. Nothing else, empty, plenty of open sky.
```

```prompt
Separate parts of a giant friendly pea plant for cutting out: three thick curving stem pieces, four big round pea leaves, three curly tendrils and two hanging pea pods, all in fresh pea green (#8CCB4E) and grass green (#3FA34D) wax crayon, simple and soft, no shading, no outline, only a thin chalky white rim, spread out on a plain white background.
```

```prompt
A single pea pod split open, a slightly lopsided rounded pod shape in fresh pea green (#8CCB4E) wax crayon with three round peas inside in a row, one tiny curled stem at the end, very minimal and flat, no shading, no outline, only a thin chalky white rim, on a plain white background.
```

## Arbetsgång (samma som 005–007)

1. Besluten nedan (Öppet).
2. Suno: `suno.md` → `sang.m4a` + `rader.txt`, stammar i `stammor/`.
3. `manus.md`, `sang.md` och `bildlista.md` färdiga efter tagningen.
4. Nya bilder: traktorn, ärtskidan (och trafikljuset), Lovas armar (prompter i `rekvisita/`, `verktyg/prompt.py`).
5. Storyboard med `bygg.py` (kopieras från 007: lastbilen → traktorn, Bulle → Lova, Ängen → Bondgården).
6. Kodscener med kitet (`kit.js`, `kant.js`), rendering, sammansättning.

## Öppet

1. **Trafikljuset är en tredje ny sak.** Antingen ett medvetet undantag (som gosekaninen i 007), eller ritat helt i kod. Utan trafikljuset faller raden "Grönt betyder kör!" i grön sak 2; då blir den *"Grönt är bäst av allt!"* och grön sak 2 en grön ballong (`luftballong-rosa` omfärgad).
2. **Traktorn och Traktorn Tuff.** Tuff är en blå traktor med ansikte. Den gröna är en liten leksakstraktor utan ansikte och med annan form (rundare, ljusgrå fälgar), så att barnen inte tror att det är Tuff som har bytt färg. Alternativ: en grön sparkcykel eller trehjuling (cyklar finns redan i 008 och 012).
3. **Gurra igen**, nu som tredje figur utan repliker. Gurra har varit med i 004–007. Han är det mest självklart gröna djuret, men en ny statist (en grön gräshoppa) går att byta in om Sanna vill ha något nytt.
4. **Pip mot den gula väggen:** Pip är solgul, så hon sitter framför ladans röda dörr för att synas.
5. **Längden.** Mål 3:00–3:30 som 007; kortas i danspausen om sången blir lång.
