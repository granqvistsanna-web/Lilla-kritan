# Kritans ABC B – recept 3: Björnen vill leka

Gjord 2026-11-21 efter `format/abc-recept-3-kompisen-vill.md`, kopierad ur förlagan `../abc-e-recept-3/`. Den gamla B-filmen (recept 1) står kvar orörd i `../abc-b/` tills den här är godkänd.

**Läge (2026-11-21):** Sanna godkände replikerna (61 rader, `malin-b-recept-3.txt`). Scenen `index.html` är byggd och `abc-b-recept-3.mp4` är en snabb förhandsvisning (960 × 540) med **datorrösten** (Alva) som platshållare (`platshallare/`). Malins tagning är inte gjord: fråga Sanna före krediterna. Stillbilder i `stills/`. Feedbacksidan: `ABC-b3`.

- Konturerna (nya, spårade med `kontur-bild.py`): `bulle-faceless-kontur.json`, `cut/bulle-mage-kontur.json`, `cut/bulle-nos-kontur.json` (björnen), `ko/cut/ko-hel-kontur.json`, `ballong-rod/cut/ballong-rod-kontur.json`. Bollens fanns redan.
- Vita kanter i scenen (regeln 3 px + 1 % av höjden): kon ca 4 px (regeln ca 7), bollen ca 5 (ca 7,5), ballongen ca 10 med `ballong-rod-tunn` (ca 10). Katten i E har ca 14. Kon och bollen har alltså tunnare kant än regeln; ändras inte här eftersom bilderna är delade.
- Tiderna i tabellen nedan blir rätt först med Malins tagning (datorrösten är långsammare: filmen är 4:05).

**Meningen:** Björnen vill leka men har inget att leka med. Malin ber kritan rita något, och det måste börja på B. Kritan ritar fel (kon, hej då!). Kritan ritar bollen: bollen studsar och björnen hoppar med. Björnen vill leka mer, och kritan ritar något som flyger: ballongen flyger upp och sjunker ner igen. Den udda i leken är hunden, som i E.

- Björnen är riggen `bjornen-bulle` (v2, ✅). Hunden riggen `hunden-hugo`, som i E.
- Kon är Gissa teckningens kritko (`assets/rekvisita/ko/`, `rekvisita/ko.md`): en vanlig ko från sidan, utan öga i bilden, med fyra lösa ben (`ko-ben1`–`4`) som går i diagonala par. Svansen sitter fast i kroppen. Ingen ny bild behövs.
- Bollen `boll-rod`, ballongen `ballong-rod` (med ansiktet från recept 1).

## Uppslagen

Tiderna fylls i ur förhandsvisningen. Rörelsen kommer först, Malin efteråt.

| Del | Bild (en rörelse) | Malin | Ljud |
|---|---|---|---|
| 1 | Klossen snurrar in, kritan ritar B:et, klossen snurrar ett varv | Hej hej! · Kritan ritar. · Det är ju B! · Bokstaven B. | swoosh, pop, krita, pling |
| 2 | Märket flyger till hörnet. Kritan ritar björnens kontur mitt i bild | Kritan ritar något på bokstaven B. · Hmm … · Vem är det? *(paus 4 s)* | krita |
| 2 | Bilden fylls i, björnen hoppar och kliver fram | Björn! · B, b, björn! · Ja! Björn börjar på bokstaven B. | pop, pling, brum, jippi |
| 2 | Björnen skuttar åt vänster och vinkar | Hej, björnen! | dunk, dunk |
| 3 | Närbild: björnen tittar ner (ledsen, blyg) | Björnen vill leka. · Men björnen har inget att leka med. | – |
| 3 | Hela bilden | Kritan! Kan du rita något att leka med? | – |
| 3 | Björnen lutar sig fram och "viskar", sedan nickar den: ja! | Vad sa du, björnen? · Måste det börja på bokstaven B? | brum |
| 3 | – | Kan du det, kritan? · Nu ritar kritan. | – |
| 4 | Kritan ritar kons kontur till höger | Hmm … · Vem är det? *(paus 4 s)* | krita |
| 4 | Bilden fylls i: en ko. Den hoppar till | Ko? · En ko! | pop, mu |
| 4 | Närbild: björnen blir förvånad, sedan skrattar den | Ha ha! Busiga kritan! · Ko börjar inte på B. | brum |
| 4 | Kon går ut åt höger, björnen vinkar | Hej då, kon! | steg |
| 5 | Kritan ritar bollens kontur, björnen tittar nyfiket | En gång till! · Något att leka med på bokstaven B, tack! · Hmm … · Vad blir det? *(paus 4 s)* | krita |
| 5 | Bilden fylls i: bollen. Björnen jublar | Boll! · B, b, boll! · Boll börjar också på B! | pop, studs, brum, jippi |
| 5 | Bollen rullar fram (ett halvt varv) bredvid björnen, björnen vinkar | Hej, bollen! · Vill du leka med björnen? | – |
| 5 | Bollen studsar (ja!), björnen hoppar likadant, sedan båda | Bollen studsar! · Björnen hoppar! · Hopp, hopp, hopp! | studs, dunk, jippi |
| 6 | Björnen tittar upp, nyfiken | Björnen vill leka mer. · Kritan, rita något som flyger! | – |
| 6 | Kritan ritar ballongens kontur till höger om bollen | Hmm … · Vad blir det? *(paus 4 s)* | krita |
| 6 | Bilden fylls i: ballongen. Björnen jublar | Ballong! · En ballong! · Ballong börjar också på B! | pop, wiii, jippi |
| 6 | Ballongen svävar upp, björnen och bollen hoppar efter, ballongen sjunker ner igen | Titta! Ballongen flyger! · Upp, upp, upp! · Och ner igen. Vad roligt! | wiii, hopp |
| 6 | Närbild: björnen jublar (hurra) | – | brum |
| 7 | Tre bildklossar poppar fram och hoppar in på sina plattor. Blandningen | Nu leker vi! · Titta noga. Var är björnen? | duns, klistra, swoosh |
| 7 | Björnens kloss hoppar till | Där är den! | pling |
| 7 | Muren. Hunden dunsar ner, björnen blir förvånad i närbild | Titta! En till. · Björn! · Boll! · Ballong! · Hund. · Vilken ska bort? · Vilken börjar inte på B? *(paus 4 s)* | vov, brum |
| 7 | Hunden hoppar ner och går ut, björnen vinkar och jublar | Hunden! · Hund börjar inte på B. · Hej då, hunden! | vov, tassar, jippi |
| 8 | Klossarna på rad, var och en hoppar på sitt ord | Björn, boll, ballong. · Alla börjar på bokstaven B. | – |
| 8 | Discot: björnen hoppar ur klossen och dansar stor, de andra snurrar, pyramid | Nu dansar vi! · Björnen dansar! · Bollen snurrar! · Ballongen snurrar! | disco |
| 8 | Björnen vinkar | Det var allt för i dag. · Vad kul det var att leka! · Hej då! | – |
| 8 | Klossarna rullar ut, B-märket hoppar till mitten och står kvar | – | duns, pling |

## Avsteg från de fasta replikerna

Ord 2 är en sak (bollen), inte en kompis. Därför säger Malin *"något att leka med"* där E säger *"en kompis"*:

| E (fast replik) | B |
|---|---|
| Men elefanten har ingen kompis. | Men björnen har inget att leka med. |
| Kritan! Kan du rita en kompis? | Kritan! Kan du rita något att leka med? |
| Måste kompisen börja på bokstaven E? | Måste det börja på bokstaven B? |
| En kompis på bokstaven E, tack! | Något att leka med på bokstaven B, tack! |

Den lilla viljan i del 6 är *"Björnen vill leka mer."* / *"Kritan, rita något som flyger!"* (E: hungrig / något gott). Ledtråden "som flyger" gör ballongen lätt att gissa.

## Regelkoll

- Inga djurnamn, inga utdragna ord, ingen *"Lyssna!"*, inget *"Säg du"*, aldrig *"Vad kan det vara?"*.
- *"Vem är det?"* för björnen och kon, *"Vad blir det?"* för bollen och ballongen.
- *"Hej hej!"* i introt, en v3-tagg per rad, 61 rader.
- Björnen håller aldrig i ballongen (receptets *"aldrig hålla i något"*): den hoppar efter den.

## Öppet

- Bollen och ballongen är båda röda. Plattorna har olika färg, men en blå boll skulle skilja dem bättre (det finns ingen `boll-bla` i dag).
- Kons svans sitter fast i kroppen och rör sig inte; bara benen går.
- Ingen tagning än: scenen använder datorrösten tills Sanna sagt ja till krediterna. Byt sedan `ROST` i `index.html` till `assets/ljud/roster/alfabet/abc-b-recept-3` (dela med `verktyg/dela-tagning.py`).
- Ballongen svävar bara upp till ca y 20 (överkanten); den kan få flyga högre, ut ur bild, om Sanna vill.
- `delEl` i scenen tar nu också delar med hela filnamnet (kons `ko-ben1`–`4`); förlagan klarar bara `…-body`. Kan föras in i E om fler bokstäver använder Gissa teckningens djur.
