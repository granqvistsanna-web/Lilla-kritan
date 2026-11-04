# Storyboard – Avsnitt 005 · Rosa bilen

Bild för bild. **Tiderna är preliminära** tills sången finns: när `sang.m4a` är klar transkriberas den till `rader.txt` och tiderna sätts efter den, som i 004. Mest helbild; närbilder 1,5–2,5 s på den sjungna raden.

**Bildstoryboard:** [storyboard/index.html](storyboard/index.html), byggd av utklippen och bakgrunderna med `storyboard/bygg.py` (0 krediter).

**Platser:** Vägen `#A6D86B` (en körscen, två stopp vid rosa saker) · Refrängerna `#8cc35f` (fast klippmönster i 05 och 09) · Glasskiosken `#F06EAA` (rosa vägg, Pip i fönstret)
**Längd:** ca 3:06 inklusive intro och outro, enligt de preliminära tiderna (se kontrollen nedan).
**En bild per handling:** varje bild visar en sak som händer, så att historien går att läsa ur bilderna. Där en sjungen rad eller en replik har två handlingar finns två bilder (som 02–02c), men aldrig mer än ett klipp per sjungen rad.
**Ingen text i bilderna:** ljud, repliker och sångrader står bara under bilden.

**Huvudbilden:** bilen är öppen och lägre än musen, så att hon syns från midjan och upp med hela ansiktet. Hon vänder ansiktet mot tittaren, inte rakt framåt. Öronen fladdrar lite i fartvinden. Bilen har inget ansikte; framlyktorna är bara runda gula prickar. Bilen är ljusare rosa än kioskens vägg, så att den syns mot den i scen B.

**Ingen säger det som sjungs** (samma regel som 004). Ekot inom parentes sjungs av kören. Varje rosa sak har ett eget ljud och en rörelse i sången, och musen gör rörelsen i bild på den sjungna raden i stället för att säga en replik:

| Rosa sak | Sjungs | Musen i bild |
|---|---|---|
| Blommorna (06b) | *sniff, sniff, mmm!* | lutar sig mot busken med nosen uppåt och sniffar, doften slingrar fram till nosen; blundar och ler på "mmm" |
| Ballongen (07b) | *upp, upp, upp!* | lutar huvudet bakåt, tittar upp och pekar rakt upp, en gång per "upp" |
| Nosen och öronen (08b, 08c) | *Vick, vick, vick!* | fingret på nosen på "Nosen är rosa" (08b), sedan vickar hon på öronen, en gång per "vick" (08c) |
| Glassen (11b, 14b) | *mums, mums, mums!* | slickar sig om munnen (11b), slickar på glassen i takt (14b) |

## Kamerainställningar (5)
1. Kritan ritar · papper
2. Körscen · helbild (bilen i mitten, vägen glider)
3. Närbild musen i bilen (bröstbild, ratten syns)
4. Glasskiosken · helbild
5. Närbild Pip i kioskfönstret

Musens armar är riggens utklipp: höger hand ligger på ratten när hon kör, armarna ligger framför bilens kant, och glassarna hålls i händerna. Glasskiosken är spegelvänd och lite inzoomad i storyboarden (kiosken till höger, bilen fortsätter åt höger som på vägen, och musen och Pip når varandra över disken). Bilen har en tjockare vit kant mot kioskens rosa vägg.

## Refrängens klippmönster (likadant båda gångerna, bild 05a–h och 09a–h)

Ett klipp per sjungen rad, ca 2,3 s (en takt i 104 bpm). Fyra av åtta rader är samma närbild, så att barnet känner igen den.

| Rad | Bild |
|---|---|
| Rosa! *(Rosa!)* | Närbild musen. Hon studsar på "Rosa!" och klappar två gånger på ekot |
| Rosa! *(Rosa!)* | Samma närbild. Upprepningen är poängen |
| Rosa är min favoritfärg! | Helbild körscen: musen håller ratten och ler, hjulen snurrar, vägen glider |
| Rosa! *(Rosa!)* | Samma närbild som rad 1 |
| Rosa! *(Rosa!)* | Samma närbild som rad 1 |
| Rosa som ett glassberg! | Samma helbild som rad 3 |
| Brum, brum, tut, tut – | Närbild musen: handen på tutan mitt i ratten, en tut per "tut" |
| vad är rosa? Titta ut! | Helbild körscen: musen lutar sig ut över kanten och spanar framåt med handen över ögonen |

## Sista refrängens klippmönster (bild 15a–e och 16, vid kiosken)

Samma tanke som refrängen på vägen, med Pip bredvid bilen i stället för vägen: helbild på ekoraderna, närbilder på de långa raderna.

| Rad | Bild |
|---|---|
| Blommor – rosa! *(Rosa!)* | Helbild kiosken: en liten bild av busken poppar upp högt på väggen. Båda håller upp glassen på ekot |
| Ballong – rosa! *(Rosa!)* | Samma helbild: ballongen poppar upp bredvid |
| Nos och glass och bil – rosa! *(Rosa!)* | Samma helbild: nosen, glassen och bilen poppar upp, en per ord |
| Rosa är min favoritfärg, | Närbild musen med glassen, ler mot tittaren |
| rosa som ett glassberg! | Närbild Pip håller glassen högt |
| Hej då, hej då – tut, tut! | Helbild: bilen kör iväg, musen vinkar och tutar, Pip vinkar (bild 16) |

## Bild för bild

Tabellen skrivs av `storyboard/bygg.py`: replikerna står för sig och sångraderna läses ur [sang.md](sang.md), så att den följer med när texten ändras. Ändra inte tabellen för hand; ändra `SHOTS` (bilderna) eller `KARTA` (vilken sångrad som hör till vilken bild) i bygg.py och kör om.

<!-- tabell: skrivs av storyboard/bygg.py -->
| # | Tid (prel.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |
|---|---|---|---|---|---|
| 01 | 0:00–0:11 | Intro · fast | Samma intro som 003 och 004 med nytt nummer och ny titel: Avsnitt 5 · Rosa bilen. Rosa vägg och en liten rosa bil på kortet. | (titeln syns, ingen röst) |  |
| 02 | 0:11–0:16 | Kritan ritar · 1 papper | Kritan ritar en rosa rundad form, långsamt. Bara formen, inga hjul. | (skrrrrt) | **Intro – kritan ritar**<br>♪ *Kritan ritar, rosa, runt …* |
| 02a | 0:16–0:19 | Kritan ritar · 1 papper | Frågan kommer innan teckningen är klar: kritan stannar och lyfter lite. |  | **Intro – kritan ritar**<br>♪ *vad kan det vara?*<br>♪ *Vad kan det vara?* |
| 02b | 0:19–0:24 | Kritan ritar · 1 papper | Gissningspausen, 4–5 s: ett svart hjul, ett hjul till och en liten ratt, ett i taget som ledtrådar. | (skrrt … skrrt … skrrt) | **Intro – kritan ritar**<br>⏸ paus 4–5 s: hjul, hjul, ratt |
| 02c | 0:24–0:30 | Kritan ritar · 1 papper | ”En bil!”: bilen studsar en gång och kritan lyfter. |  | **Intro – kritan ritar**<br>♪ *En bil! En rosa bil!*<br>♪ *Brum-brum, nu kör vi!* |
| 03 | 0:30–0:32 | A · Vägen · zoom in | Zoom in i den ritade bilen: den blir musens bil på vägen. Musen sitter redan vid ratten. | (swoosh) |  |
| 03a | 0:32–0:34 | A · Vägen · 3 närbild musen | Musen vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Brum-brum, nu kör vi!”: det sjöngs nyss. | MUSEN: Pip pip! |  |
| 03b | 0:34–0:36 | A · Vägen · 3 närbild musen | Hon lägger handen på ratten och tittar framåt. |  |  |
| 04 | 0:36–0:50 | A · Vägen · 2 körscen | Vers 1. Vägen glider, hjulen snurrar och bilen gungar i takt. En fjäril fladdrar förbi högt uppe, den enda rörelsen i bakgrunden. |  | **Vers 1**<br>♪ *Musen kör sin rosa bil,*<br>♪ *brum, brum, brum – iväg, iväg!*<br>♪ *Musen letar rosa nu,*<br>♪ *leta med – jag och du!* |
| 05a | 0:50–0:52 | Refräng · 3 närbild musen | Fast klippmönster, likadant båda gångerna. Rad 1 ”Rosa! (Rosa!)”: närbild musen, hon studsar på ”Rosa!” och klappar två gånger på ekot. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 05b | 0:52–0:55 | Refräng · 3 närbild musen | Rad 2 ”Rosa! (Rosa!)”: samma närbild. Upprepningen är poängen. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 05c | 0:55–0:57 | Refräng · 2 körscen | Rad 3 ”Rosa är min favoritfärg!”: helbild, musen håller ratten och ler, hjulen snurrar och vägen glider. |  | **Refräng**<br>♪ *Rosa är min favoritfärg!* |
| 05d | 0:57–0:59 | Refräng · 3 närbild musen | Rad 4: samma närbild som rad 1. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 05e | 0:59–1:01 | Refräng · 3 närbild musen | Rad 5: samma närbild som rad 1. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 05f | 1:01–1:04 | Refräng · 2 körscen | Rad 6 ”Rosa som ett glassberg!”: samma helbild som rad 3. |  | **Refräng**<br>♪ *Rosa som ett glassberg!* |
| 05g | 1:04–1:06 | Refräng · 3 närbild musen | Rad 7 ”Brum, brum, tut, tut”: närbild musen, handen på tutan mitt i ratten, en tut per ”tut”. |  | **Refräng**<br>♪ *Brum, brum, tut, tut –* |
| 05h | 1:06–1:08 | Refräng · 2 körscen | Rad 8 ”vad är rosa? Titta ut!”: helbild, musen lutar sig ut över kanten och spanar framåt med handen över ögonen. |  | **Refräng**<br>♪ *vad är rosa? Titta ut!* |
| 06 | 1:08–1:10 | A · Vägen · 2 körscen | ”Vad är rosa?”: busken med rosa blommor glider in från höger. Musen tittar dit. |  | **Rosa sak 1 – blommorna**<br>♪ *Vad är rosa? (Vad är rosa?)* |
| 06a | 1:10–1:15 | A · Vägen · 2 körscen | ”Titta där!”: vägen stannar mitt för busken och musen pekar på blommorna. |  | **Rosa sak 1 – blommorna**<br>♪ *Titta där! (Titta där!)*<br>♪ *Blommorna är rosa –* |
| 06b | 1:15–1:17 | A · Vägen · 3 närbild musen | ”sniff, sniff, mmm”: närbild, musen lutar sig mot blommorna med nosen uppåt och sniffar, doften slingrar fram till nosen. På ”mmm” blundar hon och ler. |  | **Rosa sak 1 – blommorna**<br>♪ *sniff, sniff, mmm!* |
| 07 | 1:17–1:19 | A · Vägen · 2 körscen | ”Vad är rosa?”: vägen glider igen, busken åker ut till vänster och en rosa ballong svävar in högt uppe i mjuka vågor. |  | **Rosa sak 2 – ballongen**<br>♪ *Vad är rosa? (Vad är rosa?)* |
| 07a | 1:19–1:24 | A · Vägen · 2 körscen | ”Titta där!”: vägen stannar och musen pekar upp på ballongen. |  | **Rosa sak 2 – ballongen**<br>♪ *Titta där! (Titta där!)*<br>♪ *Ballongen är rosa –* |
| 07b | 1:24–1:26 | A · Vägen · 3 närbild musen | ”upp, upp, upp”: närbild, musen lutar huvudet bakåt, tittar upp och pekar rakt upp, en gång per ”upp”. |  | **Rosa sak 2 – ballongen**<br>♪ *upp, upp, upp!* |
| 08 | 1:26–1:30 | A · Vägen · 3 närbild musen | Frågan till tittaren. Musen tittar ut mot tittaren med frågande min. |  | **Frågan till tittaren**<br>♪ *Vad mer är rosa?*<br>♪ *Kan du se?* |
| 08a | 1:30–1:35 | A · Vägen · 3 närbild musen | Pausen, 4–5 s. Ledtråd: musen blir lite skelögd och tittar på sin egen nos. Inget annat rör sig. |  | **Frågan till tittaren**<br>⏸ paus 4–5 s |
| 08b | 1:35–1:38 | A · Vägen · 3 närbild musen | ”Nosen är rosa – och öronen med!”: musen sätter fingret på nosen och ler. |  | **Frågan till tittaren**<br>♪ *Nosen är rosa – och öronen med!* |
| 08c | 1:38–1:40 | A · Vägen · 3 närbild musen | ”Vick, vick, vick!”: hon vickar på öronen, en gång per ”vick”, så att det rosa inuti syns. |  | **Frågan till tittaren**<br>♪ *Vick, vick, vick!* |
| 09a | 1:42–1:44 | Refräng · 3 närbild musen | Fast klippmönster, likadant båda gångerna. Rad 1 ”Rosa! (Rosa!)”: närbild musen, hon studsar på ”Rosa!” och klappar två gånger på ekot. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 09b | 1:44–1:47 | Refräng · 3 närbild musen | Rad 2 ”Rosa! (Rosa!)”: samma närbild. Upprepningen är poängen. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 09c | 1:47–1:49 | Refräng · 2 körscen | Rad 3 ”Rosa är min favoritfärg!”: helbild, musen håller ratten och ler, hjulen snurrar och vägen glider. |  | **Refräng**<br>♪ *Rosa är min favoritfärg!* |
| 09d | 1:49–1:51 | Refräng · 3 närbild musen | Rad 4: samma närbild som rad 1. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 09e | 1:51–1:53 | Refräng · 3 närbild musen | Rad 5: samma närbild som rad 1. |  | **Refräng**<br>♪ *Rosa! (Rosa!)* |
| 09f | 1:53–1:56 | Refräng · 2 körscen | Rad 6 ”Rosa som ett glassberg!”: samma helbild som rad 3. |  | **Refräng**<br>♪ *Rosa som ett glassberg!* |
| 09g | 1:56–1:58 | Refräng · 3 närbild musen | Rad 7 ”Brum, brum, tut, tut”: närbild musen, handen på tutan mitt i ratten, en tut per ”tut”. |  | **Refräng**<br>♪ *Brum, brum, tut, tut –* |
| 09h | 1:58–2:00 | Refräng · 2 körscen | Rad 8 ”vad är rosa? Titta ut!”: helbild, musen lutar sig ut över kanten och spanar framåt med handen över ögonen. |  | **Refräng**<br>♪ *vad är rosa? Titta ut!* |
| 10 | 2:00–2:01 | Kritsvep · kritsvep | Kritsvep i kioskens rosa (#F06EAA), från vänster till höger. | (skrrrrt) |  |
| 11 | 2:01–2:04 | B · Glasskiosken · 4 helbild | ”Vad är rosa?”: Pip står i kioskfönstret. Bilen kör in från vänster. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>♪ *Vad är rosa? (Vad är rosa?)* |
| 11a | 2:04–2:07 | B · Glasskiosken · 4 helbild | ”Titta där! Glassen är rosa”: bilen stannar framför kiosken och musen pekar på den stora glasstruten ovanför. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>♪ *Titta där! (Titta där!)*<br>♪ *Glassen är rosa –* |
| 11b | 2:07–2:09 | B · Glasskiosken · 3 närbild musen | ”mums, mums, mums”: närbild, musen slickar sig om munnen. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>♪ *mums, mums, mums!* |
| 11c | 2:09–2:12 | B · Glasskiosken · 4 helbild | Luckan i sången. Musen lutar sig mot fönstret, vinkar och beställer. | MUSEN: Pip pip! Hej, Pip! Två rosa glassar, tack! | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ lucka, ca 15 s: "Två rosa glassar, tack!" "Varsågod!" "Tack!" Pip är inte rosa, musen delar med sig: "Den här är till dig!" "Tack!" |
| 11d | 2:12–2:14 | B · Glasskiosken · 4 helbild | Pip räcker fram två rosa glassar över disken och musen sträcker sig efter dem. | PIP: Pip! Varsågod! (pling) | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 11e | 2:14–2:16 | B · Glasskiosken · 4 helbild | Musen håller en glass i varje hand och ler. | MUSEN: Tack! | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 12 | 2:16–2:18 | B · Glasskiosken · 5 närbild Pip | Närbild Pip: hon tittar på musens två rosa glassar. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 12a | 2:18–2:20 | B · Glasskiosken · 5 närbild Pip | Pip tittar ner på sig själv, lite ledsen (inte gråtande). Det är problemet. | PIP: Oj … jag är inte rosa. | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 13 | 2:20–2:22 | B · Glasskiosken · 3 närbild musen | Närbild musen: hon räcker fram den ena glassen mot fönstret. | MUSEN: Den här är till dig, Pip! | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 13a | 2:22–2:24 | B · Glasskiosken · 4 helbild | Pip tar glassen. Musen har kvar sin egen. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 13b | 2:24–2:26 | B · Glasskiosken · 5 närbild Pip | Närbild Pip, glad med den rosa glassen, hoppar. Inget talat ”nu är jag rosa”: det sjungs i vers 2. | PIP: Tack! (boing) | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 14a | 2:26–2:29 | B · Glasskiosken · 4 helbild | Vers 2, en bild per rad. ”En glass till dig och en till mig”: musen och Pip håller upp var sin glass. |  | **Vers 2**<br>♪ *En glass till dig och en till mig,* |
| 14b | 2:29–2:32 | B · Glasskiosken · 4 helbild | ”rosa glass – mums, mums, mums”: båda slickar på glassen, en slick per ”mums”. |  | **Vers 2**<br>♪ *rosa glass – mums, mums, mums!* |
| 14c | 2:32–2:35 | B · Glasskiosken · 5 närbild Pip | ”Nu är Pip också rosa”: närbild Pip, stolt, håller glassen högt. |  | **Vers 2**<br>♪ *Nu är Pip också rosa,* |
| 14d | 2:35–2:38 | B · Glasskiosken · 4 helbild | ”pip, pip, pip – hurra, hurra”: Pip hoppar med glassen och vinkar, musen slickar och ler. |  | **Vers 2**<br>♪ *pip, pip, pip – hurra, hurra!* |
| 15a | 2:38–2:40 | B · Glasskiosken · 4 helbild | Sista refrängen, en bild per rad. ”Blommor – rosa!”: en liten bild av busken poppar upp högt på väggen. Båda håller upp glassen på ekot. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Blommor – rosa! (Rosa!)* |
| 15b | 2:40–2:42 | B · Glasskiosken · 4 helbild | ”Ballong – rosa!”: ballongen poppar upp bredvid. Samma bild, en sak till. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Ballong – rosa! (Rosa!)* |
| 15c | 2:42–2:45 | B · Glasskiosken · 4 helbild | ”Nos och glass och bil – rosa!”: nosen, glassen och bilen poppar upp, en per ord. | (pop, pop, pop) | **Sista refrängen – sammanfattning**<br>♪ *Nos och glass och bil – rosa! (Rosa!)* |
| 15d | 2:45–2:47 | B · Glasskiosken · 3 närbild musen | ”Rosa är min favoritfärg”: närbild musen med glassen, ler mot tittaren. |  | **Sista refrängen – sammanfattning**<br>♪ *Rosa är min favoritfärg,* |
| 15e | 2:47–2:49 | B · Glasskiosken · 5 närbild Pip | ”rosa som ett glassberg”: närbild Pip håller glassen högt. |  | **Sista refrängen – sammanfattning**<br>♪ *rosa som ett glassberg!* |
| 16 | 2:49–2:54 | B · Glasskiosken · 4 helbild | ”Hej då, hej då – tut, tut!”: bilen kör iväg åt höger, musen vinkar och tutar på ”tut, tut”, Pip vinkar från fönstret. Ingen säger hej då: det sjungs. |  | **Sista refrängen – sammanfattning**<br>♪ *Hej då, hej då – tut, tut!* |
| 17 | 2:54–2:56 | Avslutning · zoom ut | Zoom ut: kiosken krymper till en teckning på papperet, med den rosa bilen och två rosa glassar. | (swoosh) |  |
| 18 | 2:56–3:06 | Outro · fast | Det vanliga outrot. Musen och Pip tittar fram vid kanten och vinkar. |  |  |
<!-- /tabell -->

## Kontroll mot `format/regler.md`
- [x] 2 figurer (musen, Pip), inga statister
- [x] 2 platser, ett platsbyte med kritsvep
- [x] 2 nya saker (rosa bilen, jordgubbsglassen)
- [x] 1 ny pose per figur (musen sitter i bilen, Pip i kioskfönstret); glassen hålls i kod
- [x] Zoom in efter kritan ritar, zoom ut i slutet
- [x] En fråga till tittaren med paus 4–5 s och svar (08–08c)
- [x] Upprepning: "Vad är rosa? Titta där!" tre gånger med samma bildmönster, refrängen två gånger med samma klipp, och sammanfattningen i sista refrängen
- [x] Ingen säger det som sjungs: musen gör rörelsen (sniff, upp, vick, mums) i bild, och ingen säger "Hej då!" i 16 eftersom det sjungs
- [x] Tempo: högst ett klipp per sjungen rad; närbilderna 2–3 s; i snitt ca 3,2 s per bild (59 bilder på 3:06), alltså strax över regelns minst 3 s. Fler bilder får inte läggas till utan att något annat slås ihop
- [x] Vardagshandling och tack: musen köper glass ("Två rosa glassar, tack!" "Varsågod!" "Tack!") och delar med Pip ("Tack!")
- [x] En sak i taget: bara fjärilen i bakgrunden i 04, sedan står allt still när en rosa sak glider in
- [x] Short: bild 05a–08c (refrängen, blommorna, ballongen, frågan) blir ca 50 s
- [ ] **Längden blir ca 3:06 med de preliminära tiderna**, alltså precis i regelns nedre kant (3–4 min), och sången kan mycket väl bli kortare: utan intro, kritan och outro är berättelsen bara ca 2:25. Blir `sang.m4a` kortare än så hamnar avsnittet under 3 min. Lägg i så fall till en tredje rosa sak på vägen (samma "Vad är rosa? Titta där!"-mönster) i stället för att dra ut pauserna.
