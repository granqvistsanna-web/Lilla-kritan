# Storyboard – Avsnitt 009 · Svarta sången (kort utkast)

Utkast i ord, före Suno-tagningen. Tiderna sätts när `sang.m4a` och `rader.txt` finns; då byggs bildstoryboarden med `storyboard/bygg.py` (kopieras från 007) och tabellen här ersätts. Sångtiderna nedan är uppskattningar för ca 3:00 sång, 96 bpm. **Avsnittstid ≈ sångtid + 11 s intro**, ca 3:20–3:30.

**Regler som gäller hela vägen:** en bild per handling, högst ett klipp per sjungen rad, närbilder 1,5–2,5 s, ingen text i bilderna, ingen säger det som sjungs (Zebbe gör radens rörelse). Loket kör alltid åt höger och vänds aldrig. En sak i taget rör sig i bakgrunden.

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (loket på vänstra tredjedelen, Vägen glider, rälsen och sliprarna glider i kod)
3. Närbild Zebbe i hytten (huvud och bröst, hyttkanten längst ner, armarna synliga på kanten)
4. Bondgården · helbild (stoppet vid Nicke och backen är utsnitt av samma bild)
5. Närbild Nicke med korgen
6. Dansbild · refrängen (första raden på spåret, sedan pianot) och danspausen (discot)

## Bild för bild

**Uttryck** är humörnamnen i `verktyg/ansikten.py` (`HUMÖR`) och scenernas `ansikten.js`. Uttrycket byter på takten och är stort och tydligt: **forvanad** när en svart sak dyker upp, **nyfiken** när någon letar, **ropar** på ekot, **skrattar** i dansen, **slickar**/**njuter** när de äter, **ledsen** bara på snyftraden, **karleksfull** när de tackar och delar. Statisterna (Kaj, koltrasten, danspausens djur) reagerar också. Loket och kritan har inga ansikten. **anstranger** och **stolt** finns inte än (se README, Behöver skapas).

| # | ≈ Tid | Plats · kamera | Bild | Uttryck | Ljud / repliker | Sång |
|---|---|---|---|---|---|---|
| 01 | 0:00–0:11 | Intro · fast | Samma intro som 003–007 med nytt nummer och titel: Avsnitt 9 · Svarta sången, titeln i svart. | – (inga figurer) | – | – |
| 02 | 0:11–0:15 | 1 papper | Den svarta kritan ritar en rund panna från sidan och en hög skorsten. | – (kritan har inget ansikte) | (skrrrrt) | *Kritan ritar …* |
| 02a | 0:15–0:18 | 1 papper | Tre röda hjul ritas, ett i taget. | – | (skrrt ×3) | *vad kan det vara?* |
| 02b | 0:18–0:23 | 1 papper | Pausen, 4–5 s: barnet gissar. Sist en liten vit rökpuff ur skorstenen. | – | (puff) | ⏸ |
| 02c | 0:23–0:28 | 1 papper → zoom in | Loket gungar till; kameran åker in i teckningen. | – | (tuut-tuut) | *Ett lok! Ett svart lok! Tuut-tuut, nu åker vi!* |
| 03 | 0:28–0:31 | A Vägen · 3 närbild | Zebbe sitter i hytten med armarna på kanten och vinkar till tittaren. | Zebbe: **blinkar** på "Hej", sedan **glad** | ZEBBE: Hej hej! | (mellanspel) |
| 04 | 0:31–0:35 | A Vägen · 2 körscen | Loket kör, vita puffar driver bakåt, hjulen snurrar, rälsen glider. | Zebbe: **njuter** (gungar i takten, ögonen halvstängda) | (tjoff, tjoff) | (mellanspel) |
| 041 | 0:35–0:39 | 3 närbild | Zebbe gungar i takten och skrattar. | Zebbe: **skrattar** | | *Zebran kör sitt svarta lok,* |
| 042 | 0:39–0:41 | 2 körscen | En puff per "tjoff". | Zebbe: **ropar** på varje "tjoff" | (tjoff ×3) | *tjoff, tjoff, tjoff – på spåret här!* |
| 04a | 0:41–0:46 | 2 körscen | Zebbe pekar åt vänster, sedan höger; tittar på oss och nickar. | Zebbe: **nyfiken** (tittar åt vänster, sedan höger), sedan **blinkar** mot oss på "jag och du" | | *Zebran letar efter svart, leta med – jag och du!* |
| 05a | 0:46–0:50 | 6 dansbild (spåret) | Zebrastampet: tre stamp, loket gungar; samma igen på ekot. | Zebbe: **ropar** på stampen, **skrattar** på ekot | (stamp ×3, ×3) | *Svart, svart, svart! (…)* |
| 05b | 0:50–0:54 | 6 dansbild (pianot) | Kritsvep till pianot mot ljusblå himmel. Loket rullar in från vänster, en puff per "tjoff". | Zebbe: **skrattar** | (skrrrrt) (tjoff, tjoff) | *Loket, loket – (tjoff, tjoff!)* |
| 05c | 0:54–0:57 | 6 pianot | Loket kör uppför tangenterna som en trappa, varje tangent trycks ner. | Zebbe: **forvanad** på första "pling", sedan **skrattar** | (pling, plong) | *Över stora pianot, (pling, plong!)* |
| 05d | 0:57–1:00 | 6 pianot | Tre svarta tangenter lyser upp en i taget under loket. | Zebbe: **nyfiken** (tittar ner på tangenterna som lyser) | (plong ×3) | *svarta tangenter – plong, plong, plong!* |
| 05e | 1:00–1:02 | 6 pianot | Två stora vita puffar. | Zebbe: **skelogd** (tittar upp på puffarna) | (puff, puff) | *Röken puffar – (puff, puff!)* |
| 05f | 1:02–1:04 | 6 pianot | Armarna upp, himlen blir mjukt skiffergrå och ljus igen. | Zebbe: **ropar** ("hurra") | | *svart är fint – hurra!* |
| 05g | 1:04–1:06 | 6 pianot | Zebbe drar i visslan fyra gånger, en vit stråle per tuut. | Zebbe: **skrattar** | (tuut ×4) | *Tuut, tuut, tuut, tuut –* |
| 05h | 1:06–1:09 | 3 närbild (spåret) | Zoom ut till spåret; Zebbe pekar åt ena hållet, sedan det andra. | Zebbe: **nyfiken** åt ena hållet, sedan åt andra | | *vad är svart? Titta ut!* |
| 06 | 1:09–1:12 | 2 körscen | Loket stannar och väntar: Katten Kaj går långsamt över spåret. | Zebbe: **forvanad** (stora ögon, O-mun) · Kaj: **nyfiken** | (mjau) | *Vad är svart? (…)* |
| 06a | 1:12–1:15 | 2 körscen | Kaj stannar mitt på spåret och tittar upp, Zebbe tittar på honom. | Zebbe: **nyfiken** · Kaj: **blinkar** mot Zebbe | | *Titta där! (…) Katten är svart –* |
| 06b | 1:15–1:17 | 3 närbild | Zebbe ritar morrhår på kinderna med tassarna, en gång per mjau; Kaj går vidare av spåret. | Zebbe: **skrattar** · Kaj: **ropar** (mjau) | (mjau ×3) | *mjau, mjau, mjau!* |
| 061 | 1:17–1:20 | 2 körscen | Loket kör igen. En koltrast med gul näbb flyger in från höger. | Zebbe: **nyfiken** (tittar upp mot ljudet) · koltrasten: **glad** | (kvitt) | *Vad är svart? (…)* |
| 061a | 1:20–1:23 | 2 körscen | Koltrasten landar på hyttens tak bakom Zebbe. Zebbe tittar upp. | Zebbe: **forvanad** (stora ögon, O-mun) · koltrasten: **nyfiken** (tittar ner på honom) | | *Titta där! (…) Fågeln är svart –* |
| 061b | 1:23–1:25 | 3 närbild | Zebbe flaxar med armarna som vingar, en gång per kvitt; koltrasten sitter still. | Zebbe: **skrattar** · koltrasten: **ropar** (kvitt) | (kvitt ×3) | *kvitt, kvitt, kvitt!* |
| 07 | 1:25–1:28 | 3 närbild | Frågan: Zebbe tittar på tittaren, huvudet på sned. | Zebbe: **nyfiken** (huvudet på sned, mot tittaren) | | *Vad mer är svart? Kan du se?* |
| 07a | 1:28–1:33 | 3 närbild | Pausen 4–5 s. Ledtråd: Zebbe tittar ner, kameran åker in mot ränderna. | Zebbe: **skelogd** (tittar ner på sina ränder) | | ⏸ |
| 07b | 1:33–1:37 | 3 närbild | Zebbe pekar på ränderna och stampar tre gånger. | Zebbe: **forvanad** på "ränder!", sedan **skrattar** på stampen | (klipp, klopp, klopp) | *Zebran har svarta ränder! Klipp, klopp, klopp!* |
| 08a–h | 1:37–2:00 | 6 dansbild | Refrängen, likadan som 05a–h. | Som 05a–h, samma uttryck på samma rad | | *Refräng* |
| 09 | 2:00–2:03 | B Bondgården · 4 helbild | Kritsvep i solgult. Pella långt bort på himlen (före loket, en sak i taget). Loket kör in och stannar vid Nicke. | Zebbe: **nyfiken** · Nicke: **glad**, vinkar | (skrrrrt) (tuut-tuut) | *Vad är svart? (…)* |
| 09a | 2:03–2:06 | 5 närbild Nicke | Nicke med korgen full av svarta vinbär. | Nicke: **karleksfull** (håller fram korgen) | | *Titta där! (…) Bären är svarta –* |
| 09b | 2:06–2:08 | 3 närbild | Zebbe plockar i luften tre gånger. | Zebbe: **forvanad** på första "plock", sedan **njuter** | | *plock, plock, plock!* |
| 10 | 2:08–2:15 | 4 utsnitt (stoppet) | Luckan: Nicke räcker fram en klase, Zebbe tar emot, Nicke flyger upp på hyttens tak med korgen. | "Hej": Zebbe **glad**, Nicke **blinkar** · "Vill du ha": Nicke **nyfiken** · "Ja, tack": Zebbe **ropar** · "Varsågod": Nicke **karleksfull** · "Tack! Hoppa upp": Zebbe **karleksfull**, Nicke **skrattar** | ZEBBE: Hej, Nicke! · NICKE: Hej, Zebbe! Vill du ha svarta vinbär? · ZEBBE: Ja, tack! · NICKE: Varsågod! (pling) · ZEBBE: Tack! Hoppa upp, Nicke! | (groove lågt) |
| 11a | 2:15–2:19 | 4 utsnitt (backen) | Loket kör uppför backen, puffarna blir små och glesa, och det stannar mitt i backen. Står still, rullar inte baklänges. Efter "stopp" glider Nicke ner från taket och försvinner bakom lokets baksida (ett litet surr), så att han inte syns i 11b. | Zebbe: **forvanad** när puffarna blir små · Nicke på taket: **forvanad**, sedan **nyfiken** när han glider ner | (tjoff … tjoff …) | *Uppför backen – tjoff … tjoff … loket orkar inte – stopp! (Åh nej!)* |
| 11b | 2:19–2:21 | 3 närbild | Zebbe ledsen, kort. Nicke syns inte. | Zebbe: **ledsen** (med en liten tår, se README) | (snyft) | *Zebran är ledsen – snyft, snyft.* |
| 11c | 2:21–2:25 | 4 utsnitt (backen) | Zebbe har klivit ner och tittar på tittaren. **Ledtråden, i den hållna takten före pausen** (som Igges nos i 007): bakom lokets baksida sticker först Nickes två antenner upp, sedan kikar hans röda huvud med prickarna fram, och vingarna fladdrar lite. Zebbe ser honom inte, men barnet gör det. Den tysta takten: barnet hinner ropa "Nicke!". | Zebbe: **nyfiken** (tittar på tittaren och väntar) · Nicke: **nyfiken** när han kikar fram, sedan **blinkar** mot tittaren | (litet surr) | *Vem kan hjälpa? (…)* ⏸ 1 takt |
| 12a | 2:25–2:28 | 4 utsnitt (backen) | Nicke flyger fram från bakom loket och landar bredvid Zebbe; båda tittar på oss. | Nicke: **ropar** ("lilla Nicke!") · Zebbe: **forvanad**, sedan **glad** | (surr) | *Lilla Nicke! (…) Och du med! (…)* |
| 12b | 2:28–2:31 | 4 utsnitt (backen) | Alla knuffar; loket rör sig. | Zebbe och Nicke: **anstranger** (se README; tills det finns: **ropar**) på "knuffa" | (knuff) | *En, två, tre – knuffa! (Knuffa!)* |
| 12c | 2:31–2:34 | 4 helbild | Loket tjoffar igång med stora vita puffar och når toppen. Zebbe trillar snällt på rumpan i gräset, skrattar, och Nicke hjälper honom upp. | Zebbe: **forvanad** när han trillar, sedan **skrattar** · Nicke: **karleksfull** när han hjälper upp | (tjoff ×3) · ZEBBE: Hoppsan! | *Tjoff, tjoff, tjoff – upp på toppen!* |
| 12d | 2:34–2:39 | 5 närbild Nicke (toppen) | Nicke delar bären: ett till Zebbe, ett till sig själv. De äter. | Nicke: **karleksfull** när han ger bäret · Zebbe och Nicke: **slickar** på "mums", sedan **njuter** | (mums) | *Ett bär var – till dig och mig! Mums, mums, mums!* |
| 12e | 2:39–2:43 | 4 helbild (toppen) | **Slutögonblicket:** Zebbe i hytten drar i visslan, loket tutar med en stor vit puff, och på "Hurra!" sträcker Zebbe och Nicke armarna upp. Barnet ropar med. | **Slutögonblicket:** Zebbe: **stolt** (se README; tills det finns: **ropar**) när han drar i visslan, **ropar** på "Hurra!" · Nicke: **ropar** | (tut, tut) | *Loket tutar – tut, tut! Hurra! (Hurra!)* |
| 13a–d | 2:43–2:53 | 6 disco | Danspaus i ljusgrått disco med svart blank kula. Gurra hoppar, Humle flyger fram och tillbaka (vänds aldrig), Mille klappar. | Alla: **skrattar** · Gurra **ropar** på "hoppa", Humle **skelogd** när han flyger, Mille **blinkar** när han klappar | | *Danspaus! …* |
| 14a | 2:53–2:59 | 6 disco | Katten och fågeln blir stora klistermärken mitt i bild, ett per rad, och flyger upp i raden runt kulan (som 005–007). | – (bara klistermärken, inga figurer i bild) | | *Katten – svart! (Svart!) Fågeln – svart! (Svart!)* |
| 14b | 2:59–3:03 | 6 disco | Ränderna, bären och loket poppar upp som klistermärke tre, fyra och fem. | – (klistermärken) | | *Ränder och bär och lok – svart! (Svart!)* |
| 14c | 3:03–3:08 | 6 disco | Alla dansar zebrastampet. | Alla: **skrattar** och dansar · Zebbe **ropar** på "svart" | | *Svart är fint och mysigt, svart som ett litet lok!* |
| 14d | 3:08–3:12 | 4 helbild (toppen av backen) | Tillbaka på toppen av backen på bondgården: loket tutar med en stor vit puff, Zebbe och Nicke ropar "Hurra!" och vinkar. | Zebbe: **stolt** (tills det finns: **karleksfull**) när loket tutar · Nicke: **ropar** "Hurra!" · båda **blinkar** mot tittaren när de vinkar | (tut, tut) · ALLA: Hurra! | *Hej då, hej då – tjoff, tjoff!* |
| 15 | 3:12–3:18 | kritirisen | Den vingliga cirkeln sluts runt Zebbe och Nicke på loket på toppen, som i 005–007. | Zebbe: **karleksfull** · Nicke: **karleksfull** | | (outro) |

## Att kontrollera mot `format/regler.md`

- [x] 2 figurer (Zebbe, Nicke), 2 platser (Vägen, Bondgården), pianot och discot är refrängvärldar utan nya bilder
- [x] 2 nya saker (loket, vinbären), 1 ny statist (koltrasten); Katten Kaj finns men behöver referensark
- [x] 1 ny pose per figur
- [x] 6 kamerainställningar
- [x] En fråga till tittaren med paus 4–5 s
- [x] Vardagshandling och tack: ta emot bär, "Ja, tack" / "Varsågod", dela, hjälpa till
- [x] Problemet löses tillsammans, inget läskigt (loket står bara still, ingen rullar baklänges, ingen natt)
- [x] Sången kan klippas som Short (refrängen 05a–h plus katten 06–06b, ca 31 s, eller vers 2–3, ca 30 s)
- [ ] `harriets-favoriter.md` uppdaterad (raderna står i [att-lagga-till.md](att-lagga-till.md))
