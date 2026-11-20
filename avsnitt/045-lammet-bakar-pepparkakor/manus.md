# Avsnitt 045 – Lammet bakar pepparkakor (plan)

**Status:** ✅ grind 1 godkänd 2026-11-19 (*"Ja, kör grind 2"*), sedan omskriven efter Sannas repliker samma dag: formarna och plåten finns från början, kritan ritar en **ringklocka**, lammet tar på **grytlappar**. ✅ grind 2 (Sanna 2026-11-19: formarna 1, plåten 2, ringklockan 1, grytlapparna 3), urklipp i `assets/rekvisita/{pepparkaksformar,bakplat,ringklocka,grytlappar}/cut/`, alla fyra i `grind2-alla.jpg`. Grind 3: tagning 1 (`malin-tagning-1.mp3`, 92,8 s) delad för hand längs pauserna (dela-tagning.py drev på upprepningarna) till 46 filer i `assets/ljud/roster/lammet-bakar-pepparkakor/`, −3 dBFS, längderna i `rost-langder.txt`, allt i rad i `ljud/provlyssna-rost.m4a`. Rad 10 saknas i tagningen och rad 11 saknar *"Men"*: kort tagning 2 (`rost-2.txt`). Ett extra *"Så du!"* i rad 9 och ett extra *"Fint!"* efter rad 19 är bortklippta. ✅ grind 3 (Sanna 2026-11-19: *"Alla bra"*). Tagning 2 (rad 10 och 11) återstår. Grind 4: lammets ljud finns (024). Nya effekter från Openverse (CC0, Sanna sa ja till nedladdningen): `deg-kladd` 1–3, `tick` 1–2, `ringklocka` 1–2. `deg-tryck` prövas med `sno-duns` 1–2. Allt i rad i `ljud/provlyssna-ljud.m4a`. ✅ grind 4 (Sanna 2026-11-19): `deg-tryck` = `sno-duns-1`, `deg-kladd-1`, `ringklocka-1`, och `tick-1` i takt med visaren. Julbilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med lammet, lammet svarar med bä, öron och svans. Bygger på idé 33 i `harriets-favoriter.md`, med lammet i stället för musen (Sanna 2026-11-19). Till julkalenderns **lucka 15** (`produktion/youtube/julkalender-parkerade.md`). Förlagor: [036 Hunden äter julmat](../036-hunden-ater-julmat/manus.md) (djuret bakom bordet i köket) och [044 Katten gör en snögubbe](../044-katten-gor-en-snogubbe/manus.md) (kritan ritar idén i ritintrot).

| | |
|---|---|
| **Titel** | Lammet bakar pepparkakor (avsnitt 45). Logotypen 1 s, inget titelkort |
| **Figurer (1)** | **Lammet Ludde** (v2, riggad, `assets/karaktarer/lammet-ludde/premium/uttryck.html`, ✅ referensark, riggen ändras inte). Står **bakom bordet** som kaninen i 022 och hunden i 036, syns från magen och upp |
| **Platser (1)** | **Julköket** (`produktion/rum/julkoket/`): orange vägg, runt fönster med snö och turkosa gardiner, blått skåp. **De tre pepparkakshjärtana i taket stängs av** (de dubblerar kakorna). Ugnen syns aldrig: den ligger utanför bild till höger. Inget platsbyte |
| **Saker som finns** | [bordet](../../rekvisita/bordet.md) (022), [pepparkaksstjärnan](../../rekvisita/pepparkaksstjarna.md) och [pepparkakshjärtat](../../rekvisita/pepparkakshjarta.md) (lucka 4, med kontur) |
| **Nya saker (grind 2)** | **pepparkaksformarna** (en röd stjärnform och en röd hjärtform), **bakplåten** (låg och svart, sedd framifrån), **ringklockan** (en röd äggklocka/ringklocka, kritan ritar den), **grytlapparna** (två rutiga grytvantar som läggs på tassarna i kod, som stövlarna i 024) |
| **I kod** | degen (en platt brun oval med kritkorn), degen som fastnar på tassen, hålen i degen efter formarna, de råa kakorna (stjärnan och hjärtat i ljusare ton), klockans visare som tickar, ångan (tre vågiga vita streck), smulor på nosen, snön i fönstret |
| **Musik** | ingen ny musik. Julkarolen från 039 lågt under sista helbilden, om den passar |
| **Favoriter** | 🐑 lamm · ⭐ pepparkakor · ⏰ klocka · 🎄 jul |
| **Kärna** | Kritan ritar en pepparkaka. *"Vad ska du göra, lammet?"* – *"Jaha! Baka pepparkakor!"* – *"Gillar du pepparkakor? Ja, det är gott!"* Degen är kladdig när lammet trycker med tassen, men formarna står på bordet: *"Vilken form ska du börja med?"* *"Tryck, tryck … en stjärna!"*, en till, en till, och ett hjärta. In i ugnen, men hur länge? Lammet har ingen klocka. Kritan ritar en ringklocka: *"Varsågod!"* – *"Tack!"* Klockan tickar, det doftar gott, klockan ringer. Grytlapparna är borta, och barnet hittar dem bakom klockan. Grytlappar på, kakorna ut. De är varma, barnet blåser. En tugga … mums! Hej då! |
| **Barnet övar på** | gissa vad kritan ritar · välja form · stjärna, hjärta · räkna kakor · vänta på klockan · säga tack · hitta grytlapparna (bakom) · grytlappar för varmt · blåsa |
| **Längd** | ca 4:00–4:20 med logotypen |

## Så rör det sig

Lammet står bakom bordet (duken till golvet, inga ben syns). Armarna är riggens raka kritstumpar. Saker flyttar sig själva i mjuka bågar (som paketen i 035 och snöbollarna i 044), lammet lyfter inget med böjda armar.

| Rörelse | Hur |
|---|---|
| Kommer in | riggens gång från vänster, stannar bakom bordet, vinkar (armen bakom kroppen, snett ut förbi kanten, högst 50 px lyft, 0,6 s upp) |
| Trycker i degen | `-fram`-armen sänks rakt ner mot degen, tassen sjunker 10 px in i den |
| Degen fastnar | när armen lyfts följer en brun klick med i 0,4 s och sitter på tassspetsen. Lammet tittar på tassen, öronen faller. Klicken skakas av med två små lugna skakningar och faller tillbaka på degen |
| Väljer form | båda formarna står till vänster om degen. Lammet tittar på den ena, sedan den andra. Stjärnformen glimtar på *"Stjärnan?"* |
| Formen trycks | formen glider fram i en båge och ställer sig på degen, tassen trycker uppifrån på *"tryck"* två gånger (formen sjunker 6 px per tryck), formen lyfts, och en rå kaka ligger kvar med ett hål runt. Kakan poppar på *"en stjärna!"* |
| Till plåten | den råa kakan lyfter i en liten båge (0,8 s) och landar på plåten, till höger om degen. *"En till … och en till"*: två stjärnor till trycks snabbare, utan närbild |
| In i ugnen | plåten glider lugnt ut till höger, ur bild. Lammet tittar efter den |
| Ingen klocka | lammet tittar åt vänster och åt höger, skakar lite på huvudet (lutar ±6° två gånger), öronen faller |
| Klockan tickar | ringklockan står på bordet, visaren går ett varv lugnt under väntan, `tick` i takt. Den går bara när den används |
| Väntar och doftar | lammet blundar, nosen lyfts 10 px, tre små vågiga doftstreck kommer in från höger |
| Klockan ringer | klockan skakar ±4° (inget hopp) i 1,5 s med ringljudet, lammet öppnar ögonen, öronen upp |
| Grytlapparna gömda | de ligger på bordet från början, och kritan ritar ringklockan rakt framför dem (rad 21), så att bara en rutig kant syns vid klockans sida. Lammet tittar åt vänster och höger. På *"Ja, där!"* glider de fram bakom klockan |
| Grytlappar på | grytlapparna glider upp från bordet och sätter sig på tasspetsarna på *"på!"*, som stövlarna i 024. Stela, ingen skalning |
| Ta ut | båda armarna sträcks åt höger ut ur bild, plåten glider in igen tillsammans med tassarna. Kakorna är nu bruna och glansiga (de riktiga urklippen), tre ångstreck stiger |
| Blåsa | ångstrecken försvinner ett i taget under pausen, det sista på *"Fff … nu är de lagom!"* |
| Äter | grytlapparna är av (glider ner bakom bordet). Lammet böjer sig fram mot stjärnkakan (huvudet 40 px ner), en bit klipps bort på *"tugga"*, resten på *"mums!"*. Smulor på nosen |
| Glatt skutt | 20 px upp, tryck ihop före och efter. Inget studs |

## Svåra rörelser och lösningar

Riggen har korta raka armar som inte böjs, och köket ses rakt framifrån. Det här är de ställen där det kan se konstigt ut, och hur de löses utan att ändra riggen.

| Problem | Varför det är svårt | Lösning |
|---|---|---|
| **Platta saker på bordet** (degen, kakorna, plåten) | rakt framifrån syns en platt sak bara som ett streck | **Två sorters bild.** Bred bild och halvbild framifrån: degen är en låg rundad brun kulle, plåten en låg svart kant, och kakorna står upp på plåten som små klistermärken (lite lutade, lite omlott), som maten i 022 och 036. **Närbild uppifrån** för allt som görs i degen: degen fyller bilden som en brun yta, formarna och kakorna syns ovanifrån i sin riktiga form. Klipp mellan dem, ingen kameravridning. Uppifrånbilden är en egen enkel bild i kod (degytan med kritkorn och bordsduken runt kanten) |
| **Tassen trycker formen** | en rak arm når inte ner till bordet utan att se stel ut | Bara i närbilden uppifrån: en rund lammtass (riggens tassspets som eget urklipp) kommer in uppifrån i bild, trycker två gånger, försvinner. I halvbilden lutar lammet sig fram 20 px och armen sänks bakom bordskanten, så att tassen inte syns |
| **Degen fastnar på tassen** | en sträckt, töjd deg är svår att rita | Ingen töjning. I närbild framifrån: en brun klick sitter på tasspetsen när armen lyfts, lammet tittar på den, skakar armen två gånger (±6°) och klicken faller tillbaka ner i en båge |
| **Kakorna till plåten** | lammet kan inte lyfta med raka armar | Kakan lyfter själv i en liten båge, som snöbollarna i 044. Ingen tass |
| **Råa blir bakade kakor** | ett byte mitt i bild syns | Bytet görs medan plåten är utanför bild (rad 16–29). De råa kakorna är samma urklipp, ljusare och utan glasyr i kod. Ut kommer de riktiga urklippen |
| **Ta ut plåten med grytlapparna** | armarna når inte ut ur bild till ugnen | **Klipp i stället för att sträcka.** Närbild på bordets högra kant: plåten glider in från höger med en grytlapp i varje hörn (grytlapparna som egna urklipp, utan armar). Klipp till halvbild: plåten står på bordet och grytlapparna sitter på lammets tasspetsar. Klippet döljer hur |
| **Grytlapparna på tassarna** | plagg på armarna kan skeva | Fästa vid tasspetsen som stövlarna i 024: följer armens rotation, flyttas och vrids men skalas aldrig |
| **Grytlapparna bakom klockan** | de måste synas innan de göms, annars är det fusk | De ligger synligt på bordet från rad 1 (barnet ser dem), och kritan ritar klockan rakt framför dem på rad 21, så att bara en rutig kant syns vid sidan. Barnet kan alltså komma ihåg var de är |
| **Klockan ringer** | ett hopp blir studsigt | Klockan skakar ±4° i 1,5 s, ingen förflyttning. Två små streck vid toppen i kod |
| **Doften** | doft syns inte | Tre mjuka vågiga streck (samma som ångan, i gult) glider in från höger kant, där ugnen är |
| **Väntan** | stillhet blir ett fryst parti | Klockans visare går, snön faller, lammet blundar och andas. Inget parti utan rörelse över 3 s (`qa-film.sh`) |
| **Äter** | samma som 036 | lammet böjer sig fram mot stjärnkakan som står på plåten, en bit klipps bort på *"tugga"*. Grytlapparna glider ner bakom bordet först |

## INTRO (1 s)

Lilla Kritans logotyp i 1 s, sedan papperet. Ingen jingel, inget titelkort.

## KRITAN RITAR (~16 s) – papper

Kritan ritar **en pepparkaksstjärna** (som snögubben i 044: teckningen är idén), konturen ur `assets/rekvisita/pepparkaksstjarna/cut/pepparkaksstjarna-kontur.json` i lugna drag (ca 7 s: de fem uddarna, sedan glasyrprickarna som egna små drag), väntar medan barnet gissar, och den riktiga stjärnan fylls i inifrån. Zoom in i papperet, in i julköket. Bordet står mitt i bild med degen, formarna och plåten. Lammet kommer in först på rad 1.

## JULKÖKET

| # | Bild (en rörelse) | Malin säger | Lammet svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar stjärnans kontur | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En pepparkaka! | `krita-ritar`, `glitter` |
| 1 | Helbild, julköket, snön faller i fönstret. Lammet trippar in, ställer sig bakom bordet och vinkar | Hej, lammet! Hej, hej! | tassar, `ba-gullig-1` |
| 2 | Halvbild, lammet tittar ner på degen och upp igen | Vad ska du göra, lammet? | `ba-gullig-7` (pratar) |
| 2b | Närbild på degen | Jaha! Baka pepparkakor! | – |
| 3 | Halvbild, glatt skutt, öronen upp | Gillar du pepparkakor? | `ba-gullig-2` |
| 3b | Lammet nickar två gånger | Ja, det är gott! | – |
| 3c | Halvbild, lammet tittar ner på bordet och sedan upp på oss | Har du allt du behöver? | `ba-gullig-7` (pratar) |
| 3d | Närbild, tassen klappar på degen, degen glimtar | Pepparkaksdeg … ja! | `deg-tryck` lågt, `ba-gullig-2` |
| 3e | Närbild, tassen pekar på formarna, stjärnan och hjärtat glimtar på varsitt ord | Formar … en stjärna och ett hjärta! | `pling` × 2 lågt |
| 3f | Närbild, tassen klappar på plåten, plåten glimtar | Och en plåt … ja! | `tass` lågt, `ba-gullig-2b` |
| 3g | Halvbild, lammet gör ett glatt skutt, öronen upp | Perfekt! Då kan vi börja! | `ba-gullig-3` (fniss) |
| ~~4~~ | *(struken 2026-11-19 kväll: 3c–3g visar allt i stället)* | ~~Deg har du. Ska du forma degen?~~ | – |
| 4b | Närbild på degen och formarna bredvid: degen, sedan stjärnformen glimtar, sedan gör formen en liten nick nedåt (sjunker 4 px och upp) | Lite deg, en form … och så tryck! | `pling` lågt på *"form"* |
| 5 | Halvbild, lammet struntar i formen och trycker tassen rakt i degen | Men lammet trycker med tassen … | `deg-tryck` |
| 6 | Närbild, tassen lyfts och en klick deg sitter fast. Lammet skakar av den | Oj! Det kladdar! | `deg-kladd`, `ba-gullig-6` |
| 7 | Halvbild, lammet tittar på de två formarna | Vilken form ska du börja med? *(paus 3 s)* | nyfiket `ba-gullig-5` |
| 8 | Närbild, stjärnformen glimtar | Stjärnan? Ja, vad fint! | `pling` lågt, `ba-gullig-2b` |
| 9 | Närbild, formen på degen, två tryck, formen lyfts, kakan poppar | Tryck, tryck … en stjärna! | `deg-tryck` × 2, `pop` |
| 10 | Kakan lyfter och landar på plåten | Så. Och på plåten! | `tass` lågt |
| 11 | Halvbild, två stjärnor till trycks och landar på plåten | Och en till … och en till. Fint! | `deg-tryck`, `pop` × 2 |
| 12 | Närbild, hjärtformen på degen, två tryck, kakan poppar och landar på plåten | Tryck, tryck … ett hjärta! | `deg-tryck` × 2, `pop` |
| 13 | Halvbild, lammet blir glad, öronen vippar | Oj, vad fin! | `ba-gullig-3` (fniss) |
| 14 | Närbild på plåten med fyra råa kakor | Är du klar nu? | `ba-gullig-1` |
| 15 | Glatt skutt | Hurra! | – |
| 16 | Plåten glider ut till höger, lammet tittar efter den | Ska de in i ugnen? Sådär! | – |
| 17 | Halvbild, lammet tittar på oss | Hur länge ska de vara inne? | – |
| 18 | Lammet tittar åt vänster och höger, öronen faller | Vet du inte? | frågande `ba-gullig-7b` |
| 19 | Halvbild, lammet skakar lite på huvudet | Du behöver en klocka. Har du ingen? | `ba-gullig-6b` |
| 20 | Halvbild, lammet tittar ner på bordet | Hm … vad gör vi nu? | – |
| 21 | Kritan ritar en ringklocka på bordet: konturen (4 s), gisspaus, klockan fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En ringklocka! Perfekt! Varsågod, lammet. | `krita-ritar`, `glitter` |
| 22 | Lammet tittar på klockan, öronen upp, glittriga ögon | Ska vi säga tack? *(paus 2,5 s)* | nyfiket `ba-gullig-5b` |
| 23 | Lammet nickar direkt | Tack! | `ba-gullig-2` |
| 24 | Närbild på klockan, visaren börjar gå | Nu väntar vi. | `tick` i takt |
| 25 | Halvbild, lammet blundar och lyfter nosen, doftstreck från höger | Mmm … det doftar gott! | `ba-gullig-4`, `tick` |
| 26 | Närbild, klockan skakar och ringer | Oj, redan! Nu ringer klockan! | `ringklocka` |
| 27 | Halvbild, lammet öppnar ögonen, öronen upp | Kakorna är klara! | `ba-gullig-2b` |
| 27b | Halvbild, lammet tittar åt vänster, Malin efter, sedan åt höger | Oj, grytvantarna! Lammet vet inte var. *(rad 53, Sanna 19/11: grytvantar)* | frågande `ba-gullig-7` |
| 27c | Bred bild för frågan, sedan klipp till närbild på klockan: en rutig kant sticker fram vid sidan. Efter 3 s skimrar den | Kan du hjälpa lammet? Kan du se var grytvantarna är? *(paus 5 s)* | tyst, blinkar |
| 27d | Närbild kvar, kanten skimrar tydligt, lammet tittar dit och blir jätteglad | Ja, där! På väggen! | `ba-gullig-2`, `tindra` |
| 28 | Närbild, grytlapparna sätter sig på tassarna | Grytvantar på! | `tass` lågt |
| 29 | Armarna ut till höger, plåten glider in med bruna kakor och ånga | Ta ut kakorna … sådär! | – |
| 30 | Närbild på kakorna med ångan | Oj, oj, de är varma! | – |
| 31 | Bred bild, lammet tittar ut mot oss | Kan du blåsa på kakorna? *(paus 4 s)* | tyst, ångan krymper ett streck i taget |
| 32 | Närbild, sista ångstrecket borta | Fff … nu är de lagom! | `tindra` |
| 33 | Närbild, lammet böjer sig mot stjärnkakan | En tugga … mums! | `knaster`, `mums` |
| 34 | Lammet reser sig med smulor på nosen | Oj! Smulor på nosen! | `ba-fniss` (det långa) |
| 35 | Helbild med fönstret, lammet blundar nöjt (raden ber om det) | Mmm … pepparkakor till jul. | `ba-gullig-4b` |
| 36 | Lammet vinkar (armen bakom kroppen) | Hej då, lammet! | `ba-gullig-8` |
| 37 | Samma, vinkar klart | Hej då! Vi ses snart! | – |
| 38 | Kritirisen runt lammet | – | – |

**Short:** uppslag 7–13 (välja form, tryck, tryck, stjärnor och hjärta), ca 50 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Filerna hamnar i `assets/ljud/roster/lammet-bakar-pepparkakor/`. Samma ordning som `rost.txt` (skrivs när tagningen finns).

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En pepparkaka!
[happy] Hej, lammet! Hej, hej!
[cheerfully] Vad ska du göra, lammet?
[excited] Jaha! Baka pepparkakor!
[curious] Gillar du pepparkakor?
[happy] Ja, det är gott!
[cheerfully] Deg har du. Ska du forma degen?
[warmly] Lite deg, en form … och så tryck!
[curious] Men lammet trycker med tassen …
[surprised] Oj! Det kladdar!
[curious] Vilken form ska du börja med?
[happy] Stjärnan? Ja, vad fint!
[playfully] Tryck, tryck … en stjärna!
[cheerfully] Så. Och på plåten!
[warmly] Och en till … och en till. Fint!
[playfully] Tryck, tryck … ett hjärta!
[laughs] Oj, vad fin!
[curious] Är du klar nu?
[excited] Hurra!
[cheerfully] Ska de in i ugnen? Sådär!
[curious] Hur länge ska de vara inne?
[curious] Vet du inte?
[warmly] Du behöver en klocka. Har du ingen?
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[excited] En ringklocka! Perfekt! Varsågod, lammet.
[warmly] Ska vi säga tack?
[happy] Tack!
[warmly] Nu väntar vi.
[happy sigh] Mmm … det doftar gott!
[surprised] Oj, redan! Nu ringer klockan!
[excited] Kakorna är klara!
[curious] Oj, grytlapparna! Lammet vet inte var.
[warmly] Kan du hjälpa lammet? Kan du se var grytlapparna är?
[excited] Ja, där! Bakom klockan!
[cheerfully] Grytlappar på!
[playfully] Ta ut kakorna … sådär!
[surprised] Oj, oj, de är varma!
[warmly] Kan du blåsa på kakorna?
[playfully] Fff … nu är de lagom!
[happy] En tugga … mums!
[laughs] Oj! Smulor på nosen!
[happy sigh] Mmm … pepparkakor till jul.
[happy] Hej då, lammet!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Lammets röst

Hela familjen finns från 024: `ba-gullig-1` … `8` med en b-tagning per känsla, plus det långa `ba-fniss`. Inget nytt behövs. Samma tagning aldrig två gånger i rad.

**Effekter:** `krita-ritar`, `glitter`, `tindra`, `pop`, `pling`, `knaster`, `mums`, `tass` finns (mät `mums` först, receptet varnar). **Nytt, Openverse först:** `deg-tryck` (mjukt dovt tryck i deg), `deg-kladd` (litet klibbigt smack), `tick` (lugn köksklocka) och `ringklocka` (en kort, mjuk ringning, inte skarp). Köksmatta: julkökets `julkoket-effekter.wav` om den är lugn nog.

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte
- [x] Inga djurnamn i det som sägs: "lammet", aldrig Ludde. Röstmappen heter `lammet-bakar-pepparkakor`
- [x] Aldrig *"Vad kan det vara?"* och aldrig *"Vad säger man?"*
- [x] Tydlig början (Sanna 2026-11-19): vad lammet ska göra, *"Jaha! Baka pepparkakor!"*, gillar du, forma degen
- [x] Frågor till barnet med paus: vilken form (3 s), tack (2,5 s), var är grytlapparna (5 s), blåsa (4 s). Plus gissningen i ritintrot och i ringklockan
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"Tryck, tryck …"* (stjärna, en till, hjärta)
- [x] Tydligt hej och hej då, med vinkning
- [x] Fniss: 2 (rad 13, 34) plus ett i sista repliken
- [x] Inget läskigt: ugnen syns aldrig, grytlapparna är på när plåten tas ut, kakorna är bara *"varma"* och barnet blåser
- [x] Inga böjda armar: tassen trycker rakt ner, saker flyttar sig själva, grytlapparna sitter på tasspetsarna
- [x] Barnet hittar något gömt: grytlapparna bakom klockan (Sanna 2026-11-19: *"Ja, lägg till det"*)
- [ ] **Kritan ritar bara en gång** (ringklockan), inte två (receptet, lärdomar 021–024)
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt, fler än 2 nya saker (formarna, plåten, ringklockan, grytlapparna)

## Öppet

1. ✅ **Hitta-ögonblicket** är tillagt (rad 27b–27d): barnet hittar grytlapparna bakom ringklockan.
2. **"Redan 15 minuter"** ströks: minuter säger inte små barn något. Klockan visar tiden i stället (visaren går ett varv). Repliken är *"Oj, redan! Nu ringer klockan!"*.
3. **"Först stjärnan."** och den gamla andra halvan (kritan ritar plåten, väntar, pling) är borttagna: de dubblerade din nya väntan med klockan.
4. **Lammkakan och bunken** behövs inte längre, så de görs inte i grind 2.
5. **Lammets storlek** bakom bordet: prov innan animatiken med samma skala som 024, så att degen, formarna och plåten får plats bredvid.

## Feedback 2026-11-20 (lucka 15, runda 1)

- **0:42 julmusik som bjällror:** marimbabädden byttes mot karolen *Up on the Housetop* (instrumental, slingan från 039/042), 0,15 i stället för 0,11. Ingen ny musik.
- **1:22 mjukare:** rad 6 börjar där rad 5 slutar (samma kamera, tassen lyfts mjukt från degen), tassen sänks och ansiktet glider till nyfiken före rad 7.
- **1:30 lägre bää:** alla bää 0,85 → 0,6 (−3 dB).
- **3:18 lammet går till ugnen:** rad 16 (6,8 s): lammet lyfter plåten med båda tassarna, går ut till höger och kommer tillbaka utan den, *"Sådär!"* när det är borta vid ugnen. Rad 29 (6,6 s): lammet går med grytvantarna, bär tillbaka den varma plåten och ställer den på bordet på *"sådär!"*. Replik 22 och 39 delas i två (`[n, tid, ss, längd]` i rader.mjs). Filmen blev 5,8 s längre.

## Feedback 2026-11-20 (lucka 15, runda 2)

- **0:35 lägre musik:** karolen 0,15 → 0,12 (−2 dB).
- **2:03 lugnare gång, 2:05 bättre gång:** gångcykeln följer tiden i stället för sträckan (ett steg var 0,46 s; förut 3–7 steg/s), med ett tass-ljud per steg medan lammet syns (`stegLjud` i rader.mjs, `STEGF` i index.html, samma i rad 1). Rad 16 går 3,3 s åt varje håll (6,8 → 9,2 s, *"Sådär!"* vid 4,7), rad 29 går 3,0 s (6,6 → 8,8 s, *"sådär!"* vid 7,95).
- **2:05 ingen överlapp med grytvantarna:** vantarna och snöret på väggen ritas i ett eget lager bakom lammet (`vagg`), så lammet går framför dem.
- **2:19 mjukare klipp:** varje rad börjar i den pose och det ansikte lammet hade när förra raden slutade och glider över till radens egen på 0,45 s (`BLEND` i rita/lamm).
- **3:23 klockan framför:** klockan ritas överst (`klockan`-lagret), framför tassarna, vantarna och plåten.
- **3:31 lammet blåser:** rad 31: lammet blåser med barnet, en pust per ångstreck: andas in, rund mun, lutar mot plåten, ljusblå pustar till kakan.
- **3:35 degen tar slut:** degen krymper för varje kaka som lyfts ur den och är slut efter hjärtat.

## Rörelse-QA 2026-11-20 (Claude, efter runda 2)

Bildskillnad per bildruta över hela filmen (ryck inne i en bild, inte vid klipp) och kontaktark varannan sekund. Fixat:
- **Ritintrot:** kritans kontur, prickar och ansikte försvann på en bildruta när gubben fylldes i; nu tonas de ut. Ögonen växer fram i stället för att poppa.
- **Rad 25:** doftstrecken gick över ögonen; nu slutar de vid kinden/nosen.
- **Rad 27c:** lammet försvann när kameran klippte till klockan, fast det står i bild; nu står det kvar och tittar mot klockan.
- **Rad 27d:** halva lammet var utanför bild; nu syns ansiktet, klockan och vantarna.
- **Rad 33:** vantarna tonades över till ett stort spöke och flög tvärs över ansiktet under tuggan; nu försvinner de från tassarna med en gnista och dyker upp på kroken.

Kollat utan anmärkning: gången (rad 1, 16, 29), tassen över degen (3d, 5, 6), kakorna som flyger till plåten, blåsningen, klockan framför, kritirisen.
