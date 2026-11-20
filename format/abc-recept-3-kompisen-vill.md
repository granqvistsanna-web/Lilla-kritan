# Kritans ABC – recept 3: Kompisen vill något

**Status:** Sanna gillar formen (2026-11-20: *"i like this"*) och bad om att receptet skulle uppdateras. Förlagan är E: `produktion/youtube/alfabet/abc-e-recept-3/` (scenen `index.html`, manuset `manus.md`, Malins repliker `malin-e-recept-3.txt`, filmen `abc-e-recept-3.mp4` som snabb förhandsvisning). Filmen är inte slutrenderad och ingen har lyssnat på blandningen.

**Sannas ändringar samma kväll, alla med i förlagan:** kritan ritar bara konturen och bilden fylls i inifrån, introt är ca 4 s kortare, introts kloss har rundare kanter, och katten och ekorren är nya bilder ur Flow: vanliga små djur från sidan, inte figurer på två ben.

Recept 1 (`produktion/youtube/alfabet/abc-prov/recept-1.md`) är fortfarande det som A–E är gjorda med. Recept 3 använder samma scen, samma klossar och samma slag per ord. Det som är nytt är att orden hänger ihop i en liten berättelse.

## Varför

Genomgången av E (recept 1, 3:50) visade:

- Halva filmen (1:26–3:20) är *Vilken ska bort?* tre gånger, med en mur som står still ca 12 s per runda.
- Elefanten lever i full storlek i ca 25 s av 230. Resten av tiden är den en liten bild på en kloss.
- Orden möts aldrig. Ekorren får aldrig sitt ekollon.
- *"Börjar (inte) på E"* sägs tio gånger.
- Tredje rundan ger fyra nya bilder på åtta sekunder, med ord som små barn inte kan (emu, ek).

Ingen i filmen vill något. Det är det som saknas, inte mer fart.

## Meningen som bär filmen

Varje bokstav fylls i med en mening:

> **[Kompisen]** vill **[leka / äta / hitta någon]**. Kritan ritar fel (**[udda sak]**, hej då!). Kritan ritar **[ord 2]** och det blir bra. Sedan kommer **[ord 3]** som en överraskning.

- **Kompisen** är ord 1 och den riggade figuren. Den står kvar stor på golvet hela berättelsen och reagerar på allt som händer.
- **Den udda saken** är kritans misstag, inte sakens fel: *"Ha ha! Busiga kritan!"* (`berattelse.md`, *Kritan busar*).
- **Ord 2 och ord 3** behövs i handlingen. Ingen sak visas bara för att den börjar på bokstaven.

## Formen

| # | Del | Vad händer |
|---|---|---|
| 1 | Vinjetten | Som i recept 1, men kortare (ca 17 s i stället för 21): klossen snurrar in, kritan ritar bokstaven, *"Det är ju E! Bokstaven E. E som i elefant. E, e, elefant!"* tätt efter varandra, ingen säg-paus, och *"Kritan ritar något på bokstaven E."* börjar medan märket flyger till hörnet. Ordet i introt är kompisen. Klossen har rundade kanter som bildklossarna (`rund: 0.12`). |
| 2 | Kompisen (ord 1) | Kritan ritar konturen i ett drag, *"Hmm …"*, *"Vem är det?"*, paus 4 s, svaret, närbilden, *"… börjar på bokstaven E."* Sedan går kompisen åt sidan med två små skutt och står kvar där (`KOMPIS`, x 400, skala 0,95). Ingen kloss. |
| 3 | Viljan | Närbild på kompisen: ett uttryck och en pose, sedan Malin: *"Elefanten vill leka."* Kameran ut, och frågan som kritan svarar på: *"Vem vill leka med elefanten?"* |
| 4 | Kritan ritar fel | Kritan ritar den udda saken med samma slag (hmm, frågan, pausen, svaret). Kompisen blir förvånad i närbild. *"Ha ha! Busiga kritan! Katt börjar inte på E."* Den udda går ut, kompisen vinkar: *"Hej då, katten!"* |
| 5 | Ord 2 | *"En gång till!"* Kritan ritar ord 2 till höger om kompisen (`RITA`). Kompisen tittar nyfiket medan kritan ritar och jublar på svaret. Sedan gör de **en sak tillsammans** (se menyn). Här får barnet göra samma sak: *"Kan du också hoppa?"* och en paus. |
| 6 | Ord 3 | En liten ny vilja (*"Oj. Ekorren är hungrig."*), kritan ritar ord 3 mitt emellan dem, och saken går dit den behövs (*"Varsågod, ekorren!"*, *"Mums!"*). Kompisen jublar i närbild. |
| 7 | Vilken ska bort? | *"Nu leker vi!"* Tre bildklossar poppar fram mitt på golvet och var och en hoppar in på sin platta. Blandningen, muren och **en** runda, som i recept 1. |
| 8 | Disco och hej då | Som i recept 1, med tre klossar: kompisen hoppar ur sin kloss och dansar stor, de två andra snurrar en i taget, pyramid med kompisen överst, utrullning och bokstaven sist. |

Slagen per ord är desamma som i recept 1. Skillnaden är vad som händer mellan dem.

## Kritan ritar: konturen, sedan bilden

Sanna 2026-11-20: *"outline, then picture"*. Det är ritintrots sätt (`ritintro.md`), och det gäller varje sak som kritan ritar.

| Slag | Så görs det |
|---|---|
| Konturen | Ett enda lugnt drag runt sakens ytterform, ca 5–6 s, medurs från toppen. Linjen är en mörkare ton av sakens färg, 15 bred, med vaxkorn. Kritan har linjens färg. |
| Ljudet | `krita-ritar` (två tagningar med övertoning), inte `skrrrrt`. |
| Frågan | *"Hmm …"* strax efter början, *"Vem är det?"* när drygt halva konturen är ritad. Sedan pausen, 4 s. |
| Svaret | Den riktiga bilden fylls i inifrån på 0,7 s (en rund mask som växer, med lite ojämn kant), och linjen tonar bort. Pop, pling och gnistor som förut. |

**Konturen görs av sig själv.** `python3 produktion/youtube/alfabet/kontur-bild.py <bild> <bild>-kontur.json` spårar färgytan i bilden (det vita räknas bort) och skriver banan i bildens pixlar. Scenen läser den med `kontur()` och räknar om den med samma mått som bilden (`bild: [fil, bredd, höjd, höjd i teckningens mått, nederkant]`). En ny bild behöver alltså inga handgjorda streck, och teckningen har alltid samma form som bilden (minnet *Teckningen som bilden*). För en riggad figur spåras den hela bilden som riggen är delad ur (`elsa-faceless.png`).

## Djurbilderna

Djur som inte är kompisen (ekorren, katten) är **vanliga små djur från sidan**, i samma stil som emun, enhörningen och duvan: knubbiga, platt kritfyllning, vit klistermärkskant, inget öga i bilden. Inte figurer på två ben (Sanna 2026-11-20: *"en liten ekorre som vanligt"*, *"samma sak med katt"*). Ögat ritas i kod och blinkar. Använd de andra ABC-djuren som stilreferenser i Flow (Nano Banana, 0 krediter). Den som ska titta mot kompisen spegelvänds innan den klipps ut.

## Fem små handlingar som går att animera

Välj en per bokstav. Alla går att göra med rörelserna i menyn nedan.

| Handling | Ord som passar | Så syns det |
|---|---|---|
| **Hungrig** | frukt, kaka, morot, ekollon | magen kurrar, saken glider fram, *"Mums!"* |
| **Leka** | boll, ballong, bil, en kompis | saken studsar eller rullar, kompisen hoppar likadant |
| **Knack knack** | dörr, låda, ägg, hus | vem är bakom? ord 3 tittar fram |
| **Saknar något** | hjul, mössa, vante | kompisen letar åt vänster och höger, kritan ritar det som saknas |
| **Fryser eller är trött** | mössa, filt, lampa, måne | saken landar på kompisen |

Förslag för bokstäverna som finns:

- **A:** Apan är hungrig. Bil? Nej. Apelsin, mums. Ananasens blad kittlar: atjo!
- **B:** Björnen vill leka. Ko? Nej. Bollen studsar och björnen hoppar med. Ballongen flyger upp.
- **C:** Cykeln saknar ett hjul. Boll? Nej. Kritan ritar en cirkel, och den blir hjulet. Citronen rullar in.
- **D:** Knack knack, en dörr. Gris? Nej. Vem är bakom dörren? Dockan.
- **E:** Elefanten vill leka. Katt? Nej. Ekorren hoppar och elefanten härmar. Ekorren är hungrig, och ekollonet glider dit.

## Rörelsemenyn

Bara det här. Allt finns i scenen redan.

- **Kompisen (riggen):** hoppa, vinka, dansa, och `reagera` med ett uttryck och en pose (`ledsen`, `nyfiken`, `forvanad`, `skrattar`, `jatteglad`; `blyg`, `lutaH`, `hurra`).
- **Sakerna (urklipp):** poppa, hoppa, vicka, gunga, rulla, glida till en plats och krympa (`flytta`), gå ut ur bild.
- **Aldrig:** hålla i något, sitta i något, vatten som rör sig, två riggar samtidigt. Det var det som gjorde Apans fruktfest svår.

En sak som "hålls" läggs bara framför tassen och hoppar samtidigt som figuren (ekollonet i E).

## Replikerna

Fasta i varje film (byt bara bokstaven och orden): introt, *"Hmm …"*, *"Vem är det?"* / *"Vad blir det?"*, *"… börjar (också) på E"*, *"Ha ha! Busiga kritan!"*, *"En gång till!"*, *"Nu leker vi!"*, rundans repliker, *"Alla börjar på bokstaven E."*, *"Nu dansar vi!"*, *"Hej då!"*

Nya per bokstav, ca nio korta: viljan, frågan, leken (tre repliker), den lilla viljan, *"Varsågod"* och *"Mums!"* eller motsvarande.

Reglerna från recept 1 gäller: inga utdragna ord, ingen *"Lyssna!"*, inget *"Säg du"*, *"Vem är det?"* för djur och *"Vad blir det?"* för saker, aldrig *"Vad kan det vara?"*, inga djurnamn, en v3-tagg per rad, *"Kritans ABC!"* är `[warm]`, och hela filmen ur **en** tagning.

*"Kan du också hoppa?"* är en rörelse för barnet, inte ett ljud. Sanna tog bort *"Kan du gapa stort?"* 2026-11-18, så den här är hennes att godkänna eller stryka.

## Vad en bokstav behöver

| | Recept 1 | Recept 3 |
|---|---|---|
| Saker | 9 (3 ritas, 3 udda, 3 nya bilder) | 5 (3 ritas, 1 ritas fel, 1 udda i leken) |
| Nya bilder ur Flow (E) | 4 | 3 (ekollonet, ekorren, katten) |
| Malins repliker | 41 | 43, varav 9 skrivs nya per bokstav |
| Blandningar av klossar | 3 | 1 |

De udda sakerna kan vara desamma i många bokstäver. Den som ritas fel behöver bara en bild; konturen spåras ur den.

## Kodens delar (i provet)

- `ritaOchGissa(s, plats)`: kritan ritar, hmm, frågan, pausen och svaret.
- `gissning(s, levande, vanta, livSek, plats, nara)`: hela ordet. Saken blir ingen kloss efteråt.
- `kanner(t0, t1, ansikte, pose)`: kompisens uttryck en stund.
- `narbild(t0, { ansikte, pose, ljud })`: kameran nära kompisen där den står, och ut igen.
- `flytta(s, t, x, y, skala, sek)`: saken går till en plats. Figurerna står med fötterna på y 940 (y + nederkanten · skalan).
- Klossarna poppar först på *"Nu leker vi!"* (`s.kk`, `s.pa`).
- **Fälla:** en sak glider mot sin nästa nyckelruta hela tiden fram till den. Lägg en ruta som håller kvar läget precis före (kompisen gled åt höger i en minut innan discot).
- `kontur(fil, …mått)` läser `<bild>-kontur.json`; `streck: [['kontur', banan, färg, bredd, sekunder / TEMPO]]`.
- Bilden fylls i inifrån med masken `s.fyll` (`FYLL` 0,7 s).
- **Fälla:** tar man flera stillbilder långt isär i samma körning kan bokstavsmärket synas en extra gång bredvid kompisens kloss. I en renderad film syns det inte. Ta en stillbild per körning när klossarna ska kontrolleras.

## Ny bokstav

1. Fyll i meningen och välj handling ur tabellen.
2. Kopiera förlagans mapp. Byt bokstavens drag och färg, `SAKER` (kompisen, ord 2, ord 3, den som ritas fel, den udda i leken) och replikerna i `TAL`. Gör en kontur per bild med `kontur-bild.py`, och mät ögats plats i bilden.
3. Skriv delarna 3–6 med `kanner`, `narbild`, `gissning` och `flytta`. Delarna 1, 2, 7 och 8 är som de är.
4. Stillbilder: viljan, det felritade, varje ord bredvid kompisen, saken som går dit den behövs, klossarna som poppar, muren, discot. Leta efter saker som täcker varandra och figurer som inte står på golvet.
5. Malins tagning (en tagning, alla rader; dela med `verktyg/dela-tagning.py` och läs utskriften: korta ord som *"Ekorre!"* och *"Det är ju E!"* hamnar lätt i grannens fil och får klippas om för hand). Sedan förhandsvisning med `--snabb`.

## Öppet

- Tredje rundan (Sanna 2026-11-18, *"lite svårare"*) och andra rundan är borta ur den långa filmen. De kan bli Shorts, ca 25 s var.
- Elefanten låter fortfarande som björnen (`brum-glad`). Sök ett mjukt trumpetande på Openverse.
- Hunden i leken är kvar i den gamla, ritade stilen. Den bör få en ny bild som katten och ekorren.
- *"Kan du också hoppa?"* är med. Sanna har inte sagt något om den.
- Flow-verktyget (`mcp__flow__flow_generate`) fastnade 2026-11-20 på en knapp det inte hittade. Bilderna gjordes för hand i Flow i webbläsaren, med projektets egna bilder som referenser.
