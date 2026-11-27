# Avsnitt 060 – Kaninen går på pottan (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-26 (Sanna: *"Ja, med toaletten"*): manuset som det står, med toaletten (Öppet 1, alternativ A), övriga Öppet-punkter som manuset står (också *"Du kissade i pottan!"* och *"Hej då, kisset!"*). **✅ Grind 2 (saker) godkänd 2026-11-27 (Sanna: *"Bok 4, toalett 2"*):** [bilderboken](../../rekvisita/bilderbok.md) nr 4 och [toaletten](../../rekvisita/toalett.md) nr 2, utklippta med 1 % kant (`cut/bilderbok.png` 7 px, `cut/toalett.png` 8 px), bokens kritkontur `cut/bilderbok-kontur.json`. Stjärnan och toarullen finns redan och används som de är. README-raderna i `rekvisita/README.md` läggs till av huvudsessionen. **Grind 3 (Malins röst): inspelad 2026-11-27**, delad i 47 filer, väntar på Sannas lyssning. **✅ Grind 5 (animatiken) godkänd 2026-11-27** (Sanna: *"Godkänd"*), `storyboard/animatik.mp4` (3:56,6, 49 bilder). **Grind 6 (scenen) 2026-11-27: klar för granskning.** `scener/badrummet/index.html`, förhandsvisningen `scener/badrummet/badrummet.mp4` (`--snabb`, 3:56,3 scentid utan logga) på feedbacksidan (#060). Pottan ställs efter tömningen vid 1005 (inte 1040), toarullen står vid 1460 efter torkningen. **✅ Grind 6 godkänd 2026-11-27** (Sanna: *"Godkänd, rendera"*). **Slutrenderad:** `film/avsnitt-060.mp4` (4:06,3 med bilderboksintrot och prenumerera-kortet, −14,3 LUFS, topp −2,0 dB, `film/satt-ihop.sh`), på feedbacksidan för granskning. **Feedbackrunda 1 (Sanna 27/11, 7 punkter):** större toalett; badkaret utanför halvbilderna (det står kvar i rummet, rullen gömmer sig bakom det); kaninen sitter djupare i en större potta; boken hålls vid bröstet med tassarna och moroten i sidan; andra uppslaget har en Flow-bild (tagning 1, `cut/sida-kanin-pa-potta.png`); kaninen står bredvid kranen och strålen landar på tassen; handduken gnids mellan tassarna; landningen i rad 29 flyttad fri från den större pottan. **✅ Godkänd 2026-11-27** (Sanna: *"Godkänd, rendera"*). **Slutrenderad igen:** `film/avsnitt-060.mp4` (4:06,3, −14,3 LUFS, topp −2,0 dB), på feedbacksidan; versionen före feedbacken ligger i `film/aldre/`.  Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med kaninen, kaninen svarar med ljud, öron och ansikte. Förlagor för formen: 057 Katten tvättar händerna och 054 Lammet badar (samma badrum). `harriets-favoriter.md` och README-filerna uppdateras av huvudsessionen.

**Skillnaden mot 042 Hunden går på pottan:** 042 är julversionen (två platser, tre glas vatten, bråttom, kritan ritar pottan och toarullen, *"Gnugga, gnugga … ren!"*). 060 är tidlös och handlar om **att vänta**: kaninen vill inte sluta leka, och när den väl sitter kommer det inget. Pottan och toarullen står i badrummet från början. Kritan ritar i stället en **bilderbok** att titta i medan man väntar, och till sist ett **stjärnklistermärke**. Det som görs tre gånger är väntan: *"Vänta, vänta … inget än."* – *"Vänta, vänta … inget än."* – *"Vänta, vänta …"* och så hörs ett litet *plink* Ingen brådska, inget vatten att dricka, ingen jul.

| | |
|---|---|
| **Titel** | Kaninen går på pottan (avsnitt 60). Introt *"Djuren hittar på!"* |
| **Figurer (1)** | **Kaninen Kanel** (v2, riggad, [`karaktarer/kaninen-kanel.md`](../../karaktarer/kaninen-kanel.md), `assets/karaktarer/kaninen-kanel/premium/` med `cut-tunn`, `✅ Referensark klart`, ändras inte) |
| **Platser (1)** | **Badrummet** (`bakgrunder/badrummet.md`). Inget platsbyte |
| **Saker som finns** | [pottan](../../rekvisita/potta.md) (v3, röd, kontur för ritintrot finns), [toarullen](../../rekvisita/toarulle.md), [badkaret](../../rekvisita/badkar.md), [handfatet](../../rekvisita/handfatet.md), [pallen](../../rekvisita/pall.md), [handduken](../../rekvisita/handduk.md), [tvålen](../../rekvisita/tval.md) (i kod), [blå bollen](../../rekvisita/boll-bla.md), [gula stjärnan](../../rekvisita/stjarna-gul.md) (som klistermärke, liten, utan ansikte), [moroten](../../rekvisita/morot.md) (bild i boken) |
| **Nya saker (grind 2 ✅)** | [**bilderboken**](../../rekvisita/bilderbok.md) (kritan ritar den) och [**toaletten**](../../rekvisita/toalett.md) (står i badrummet) |
| **Kritan ritar (3)** | **toarullen** i ritintrot (Sanna 2026-11-27, i stället för pottan; konturen som i 042) · **bilderboken** vid pottan (hjälpsaken) · **stjärnan** (belöningen) |
| **I kod** | bokens uppslag (moroten, en liten kanin på en potta), pappersfliken som sticker fram bakom badkaret, papperslappen, vattenstrålen och skummet vid handfatet, skimret, krit-gnistorna |
| **Musik** | ingen ny musik. `badrumsljud-2` lågt under, `kran` bara när vattnet rinner |
| **Kärna** | Kritan ritar en potta. Kaninen leker med bollen och vickar på sig, men vill inte sluta leka. Bollen får vänta bredvid pottan, och kaninen sätter sig. *"Vänta, vänta … inget än."* Det är svårt att sitta still. Kritan ritar en bilderbok: *"Varsågod!"* – *"Ska vi säga tack?"* – *"Tack!"* En morot i boken. *"Vänta, vänta … inget än."* Nästa blad: en liten kanin på en potta, precis som du! *"Vänta, vänta … plink!"* Papper behövs, men toarullen är borta: barnet hittar den bakom badkaret. Torka, tömma pottan, spola, tvätta tassarna. Kritan ritar en stjärna som klistras på pottan. Bollen har väntat. Hej då! |
| **Tema (subtilt)** | **att vänta.** Bara i upprepningen och i bollen som väntar. Ingen förklaring, ingen lektion, inget beröm som press: Malin säger vad som händer (*"Du kissade i pottan!"*) och vad hon ser (*"Oj, vad stolt du är!"*) |
| **Samtal** | Malin frågar kaninen, kaninen svarar med sitt ljud i pausen (ca 1 s), Malin reagerar kort som om hon förstått (mönstret från 052–057) |
| **Barnet gör** | gissar vad kritan ritar (tre gånger) · **letar efter toarullen** bakom badkaret. Den rullar dit i rad 3 utan att Malin säger något, så ett barn som tittar noga har redan sett den |
| **Favoriter** | 🐰 kanin · ⚽ boll · ⭐ stjärna |

**Kärnans ordning:** lek (bollen) → problemet 1 (vill inte sluta leka) → bollen väntar, kaninen sätter sig → problemet 2 (inget kommer, svårt att sitta still) → kritan ritar boken → tack → leken med boken (moroten, kaninen på pottan) med väntan tre gånger → plink → toarullen är borta → barnet hittar den → torka, tömma, spola, tvätta → stjärnan → bollen igen → hej då.

**Längd:** ca 4:00–4:10 (46 repliker; 057 har 45 och är 3:57 efter tempoändringen). Längden kommer ur reaktionsslag och närbilder, inte segare rörelser. Blir den för lång: stryk replik 20–21 (morötterna) och 35 (*"Hej då, kisset!"*), ca 10 s.

**Short:** uppslag 13–17 (boken, väntan två gånger, plink, stolt), ca 50 s.

## Så rör det sig

Inom riggens gränser (`karaktarer/kaninen-kanel.md`, skillen `lk-figur`): inget snurrar, inget speglas, inga böjda armar, lugna skutt. Vinkningen enligt minnet om vinkande arm.

| Rörelse | Hur |
|---|---|
| Skuttar in | riggens skutt från vänster efter bollen, stannar före repliken. `tass` per landning |
| Puffar bollen | som hunden i 021: hukar lite, puffar med nosen, bollen rullar i en låg båge och rullar ut. Bollen snurrar inte synligt |
| Toarullen rullar iväg (rad 3) | bollen rullar fram och stöter mjukt till toarullen, som välter och rullar lugnt åt höger och in **bakom** badkarets vänstra ände (lagret bakom karet). En kort pappersflik och en skymt av rullen sticker fram vid karets kant och ligger kvar där. Ingen replik om det, bara ett mjukt `rull` |
| Vickar på sig | lugnt vick från fot till fot (±6 px i sidled), öronen spetsade, svansen stilla. Inga korsade ben. Andra gången lite snabbare |
| Skakar på huvudet | hela kroppen lutar ±6° två gånger (inte tre: det är ett litet nej, inte trots) |
| Bollen väntar | kaninen puffar bollen åt vänster med ena foten (riktningsposen `vanster`), bollen rullar och stannar tätt intill pottan. Den ligger kvar där till rad 29 |
| Sätter sig på pottan | ett lugnt skutt upp över kanten och ner. Pottan ligger i lagret framför kaninens nedre del, posen `sitter`. Visas bara rakt framifrån |
| Väntar | kaninen sitter stilla, tittar ner, tittar upp, öronen reser sig och lyssnar. På *"inget än"*: öronen sjunker, en liten axelryckning (`strack −0,04`). Bilden står aldrig still: blinkar, andas, ett öra vippar |
| Svårt att sitta still | kaninen tittar mot bollen (`rikt −0,3`), lyfter sig 20 px från pottan och sätter sig igen, öronen på sned |
| Håller boken | posen `haller`, boken i tasspetsarna med tassarna framför bokens nederkant. Boken öppnas som två stela halvor (flytta och vrid, aldrig skeva). Uppslaget visas i närbild så att bilden i boken syns stort |
| Vänder blad | en stel sida vänds från höger till vänster på 0,5 s (bredden krymper till ett streck och växer ut igen på andra sidan), `blad` |
| Plink | 0,3 s helt stilla med förvånat ansikte (stora ögon, liten rund mun, öronen rakt upp) **på ordet**. Sedan `jatteglad`, öronen vippar. Inget annat visas |
| Lättad | ögonen halvslutna en kort stund, öronen sjunker mjukt, mysig suck, sedan öppna glada ögon |
| Stolt | `stolt` blandat med `jatteglad` (riggens *stolt* kan se sur ut, som kattens i 057), ett litet lugnt skutt på pottan 12 px |
| Letar | tittar på golvet där rullen stod, sedan åt vänster och höger (`rikt ±0,3`, ögonen `titt`). Huvudet vänds inte |
| Hämtar rullen | kaninen kliver av pottan, två lugna skutt till badkarets ände, sträcker sig (`nar`), rullen glider fram bakom karet och upp i tasspetsen. Två skutt tillbaka, rullen ställs bredvid pottan |
| Torkar sig | halvnära från magen och upp, kaninen står bredvid pottan. En papperslapp i tassen (`ritsch`), tassen sänks ner ur bild och kommer upp igen, en gång. Lappen släpps i pottan bakom kanten. Inget mer visas |
| Tömmer pottan | `haller`, pottan i tasspetsarna (tassarna framför pottans nederkant). Två lugna skutt till toaletten. Pottan lyfts över toalettens kant och tippas stelt ca 35° bort från kameran, så öppningen aldrig syns. Ett kort tyst `porl`. Pottan ställs tillbaka på golvet. Pottan går över kanten, aldrig genom den |
| Spolar | kaninen sträcker upp en tass (`upp`) och trycker på knappen ovanpå toaletten, knappen sjunker 6 px. Kaninen rycker till av ljudet (öronen upp), sedan fniss |
| Tvättar tassarna | upp på pallen bakom handfatet (som katten i 057 och björnen i 023), riggens klapp framför magen, lugn vridning ±6°, skumtussen snurrar. Kranen rinner bara nu, tre droppar när den stängs |
| Torkar tassarna | handduken lyfts av kroken, glider i en båge till tassarna, gnider två gånger och tillbaka (`handdukFlyg()` från 023/057) |
| Klistrar stjärnan | stjärnan i tasspetsen (`haller` med en arm), kaninen hukar och trycker den mot pottans framsida, `klistra`. Stjärnan sitter kvar på pottan och glimmar till |
| Leker igen | kaninen puffar bollen med nosen, ett lugnt glatt skutt (20 px, tryck före och efter). Kaninen leker 2 s innan Malin säger något |
| Vinkar | armen bakom kroppen, snett ut förbi kanten (ca 60°, ±16°), hela armen syns, den andra vilar |
| Ansiktet | glada uttryck har öppna ögon. Halvslutna ögon bara i lättnaden (rad 16b). Fnissigt i 15b, 24 och 29 |

## INTRO (*Djuren hittar på!*, 3,3 s)

Seriens standardintro (`produktion/youtube/bilderbok-intro/`, 3,3 s), sedan tomt papper och standardritintrot. `film/satt-ihop.sh` lägger introt före scenen.

## KRITAN RITAR (~14 s) – papper

Kritan ritar **pottan**, inte kaninen: konturen (`potta-v3-kontur.json`, ca 2,8 s) och två–tre detaljstreck ur bilden (kantens båge, den runda kullen mitt fram), allt via `verktyg/kritan-ritar.js`. Konturen står kvar ca 1 s, gisspaus, sedan fylls den riktiga röda pottan i inifrån. Zoom in i teckningen, in i badrummet. Pottan står på golvet, och kaninen kommer in först på rad 1.

## BADRUMMET

Uppställning (förslag, bestäms i animatiken): från vänster handfatet med pallen och handduken på kroken, toaletten, **pottan**, en fri yta där kaninen leker, toarullen på golvet, och badkaret längst till höger (bara dess vänstra del behöver synas). Bollen ligger på golvet vid lekytan.

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar toarullens kontur, väntar, rullen fylls i. Övergången in i badrummet landar på rullen: den står på golvet vid lekytan, på samma plats i bilden som teckningen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus 3 s)* Oj! En toarulle! | `krita-ritar`, `skogsljud`, `glitter` |
| 1 | Helbild, badrummet. Kaninen skuttar in till bollen, stannar och vinkar | Hej, kaninen! Hej, hej! | `tass`, `kanin-hej` |
| 1b | Halvnära. **Pausen:** kaninen puffar bollen med nosen, den rullar en bit. Reaktionsslag: närbild på det glada ansiktet | Vad gör du, kaninen? *(paus: kaninen puffar bollen)* Jaså, du leker med bollen! | `hopp-mjuk`, `kanin-ny-jippi` |
| 2 | Närbild. Kaninen stannar mitt i leken och vickar från fot till fot, öronen spetsade. **Pausen:** tittar på bollen, skakar lite på huvudet | Oj! Du vickar på dig. Behöver du kissa? *(paus)* | `tass` mjukt per vick, trumpet `kanin-ny-trumpen` (kort) |
| 3 | Helbild. Kaninen puffar bollen igen (handlingen först). **Utan replik om det:** bollen stöter till toarullen. **Klipp till närbild (1,2 s):** rullen rullar lugnt över golvet, studsar mjukt mot badkaret och stannar bakom det, bara fliken sticker fram. Kaninen tittar på bollen och märker inget. Fliken syns sedan svagt i varje helbild (rad 5, 7, 21) | *(efter puffen)* Nähä? Du vill leka mer med bollen. | `hopp-mjuk`, `rull`, `kanin-ny-fniss` |
| 4 | Närbild. Kaninen vickar igen, snabbare, och tittar upp på oss med stora ögon (reaktionsslag) | Oj, oj. Nu vickar du ännu mer! | `tass` mjukt per vick, frågande `kanin-ny-fragande` |
| 4b | Halvnära. Kaninen nickar snabbt, öronen vippar, tittar mot pottan | Jaha, du behöver kissa! Då går vi till pottan. | `kanin-ny-ja` |
| 5 | Halvbild. Kaninen puffar bollen med foten, den rullar och stannar tätt intill pottan. Närbild på bollen vid pottan (1,5 s) | *(när bollen stannat)* Lägg bollen bredvid pottan. Den kan vänta på dig. | `rull` kort, `kanin-gullig-5` (nyfiken) |
| 6 | Halvnära. Kaninen tittar på bollen, sedan på pottan. **Pausen:** nickar, öronen vippar | Ska du sätta dig på pottan nu? *(paus: ja-ljud, nick)* Ja, vad bra! | `kanin-ny-ja` |
| 7 | Helbild. Kaninen skuttar upp och sätter sig på pottan | *(när kaninen sitter)* Nu sitter du på pottan. | `hopp-mjuk`, `landa-mjuk` |
| 8 | Halvnära. Kaninen sitter, tittar ner, tittar upp, öronen lyssnar. Tyst. På *"inget än"* sjunker öronen. Reaktionsslag: närbild, kaninen tittar frågande på oss | Vänta, vänta … inget än. | frågande `kanin-gullig-7` efter repliken |
| 9 | Halvnära. Kaninen tittar mot bollen, lyfter sig lite från pottan och sätter sig igen, öronen på sned | Hm. Det är svårt att sitta still och vänta. | `kanin-ny-trumpen` (kort, en annan tagning) |
| 10 | Utsnittet vid pottan. Kritan kommer in uppe till höger och ritar en bok bredvid kaninen: pärmen, ryggen, en liten bild på framsidan. Väntar och svävar | Titta! Kritan ritar något vid pottan. *(gisspaus 3 s)* | `krita-ritar`, nyfiket `kanin-ny-sniff` |
| 11 | Boken fylls i inifrån, glimt. Kritan flyger ut. Närbild: kaninens ögon glittrar, öronen rakt upp | En bok! En bilderbok! Varsågod, kaninen. | `glitter`, `kanin-ny-fortjust` |
| 12 | Kaninen tittar på boken, sedan upp dit kritan flög ut. Nickar, öronen vippar | Tack, kritan! *(Sanna 2026-11-27, i stället för "Ska vi säga tack?" + "Tack!")* | nyfiket `kanin-gullig-5b`, `kanin-tack` efter repliken |
| 13 | Halvnära. Kaninen tar boken och öppnar den. Klipp till närbild på uppslaget: en stor morot | *(när boken är öppen)* Du tittar i boken. Oj! En morot! | `blad`, `kanin-ny-mmm` |
| 13b | Närbild på kaninen bakom boken. **Pausen:** nickar två gånger, nosen puffar | Tycker du om morötter? *(paus: ja-ljud)* Ja, morötter är goda! | `kanin-ny-ja` (annan tagning) |
| 14 | Halvnära. Kaninen sänker boken lite, sitter stilla, öronen lyssnar. Tyst. På *"inget än"* sjunker öronen, kaninen rycker på axlarna och tittar i boken igen | Vänta, vänta … inget än. | – (tyst, bara `badrumsljud`) |
| 15 | Närbild på boken: sidan vänds. Nytt uppslag: en liten kanin som sitter på en röd potta | *(när bladet är vänt)* Du vänder blad. Titta! En liten kanin på en potta. | `blad`, förtjust `kanin-gullig-2` |
| 15b | Närbild. Kaninen tittar på bilden, sedan ner på sin egen potta, sedan på oss. Fnissar | Precis som du! | `kanin-ny-fniss` (fniss) |
| 16 | **Annorlunda än 8 och 14, så att barnet hör att något är på väg:** kaninen lägger ner boken och sitter helt stilla. Kameran glider långsamt in från halvnära mot närbild (push 2 s). Öronen sjunker inte som förut utan reser sig sakta, ögonen blir stora. Badrumsljudet tonas ner nästan helt. Efter repliken ca 1 s tyst, sedan **ljudet `plink`**: 0,3 s helt stilla, förvånat ansikte, öronen rakt upp. Malin säger inte *plink* | Vänta, vänta … | `plink` efter pausen |
| 16b | Närbild (reaktionsslag, ingen replik, ca 2 s): ögonen halvslutna, öronen sjunker, mysig suck. Sedan öppna jätteglada ögon | – | mysig suck `kanin-gullig-4` |
| 17 | Halvnära. Kaninen ler stort, öronen vippar | Ja! Du kissade i pottan! | `kanin-ny-jippi`, `tindra-3` |
| 17b | Närbild. Kaninen sträcker på sig, stolt, ett litet lugnt skutt på pottan | Så bra, kaninen! | `kanin-ny-ja` |
| 18 | Halvbild. Kaninen lägger boken bredvid sig och tittar på golvet där rullen stod: tomt. Tittar åt vänster, sedan åt höger | Nu behöver du papper. Men … var är toarullen? | frågande `kanin-ny-fragande` (annan tagning) |
| 19 | Bred bild de första 2 s, sedan klipp till närbild på badkarets ände: pappersfliken och en skymt av rullen sticker fram. Skimrar svagt efter 3 s | Kan du hjälpa kaninen? Var är toarullen? *(paus 5 s)* | tyst, `glimt-2` svagt när skimret börjar |
| 20 | Kvar i närbilden: fliken skimrar tydligt. Klipp till kaninen: öronen upp, glad | Ja, där! Bakom badkaret! | `glimt-1`, `kanin-ny-fortjust` |
| 21 | Helbild. Kaninen kliver av pottan, skuttar till badkaret, rullen glider fram och upp i tassen, kaninen skuttar tillbaka | *(under andra skuttet)* Du hämtar toarullen. Hopp, hopp! | `tass`, `hopp-mjuk`, `rull` kort |
| 22 | Halvnära, från magen och upp. Kaninen river av en lapp, tassen går ner ur bild och upp igen. **På *"klart"*:** kaninen nickar | Nu torkar du dig med papperet. Torka, torka … klart! | `ritsch`, `kanin-ny-ja` |
| 23 | Helbild. Kaninen lyfter pottan, skuttar till toaletten och tippar pottan över kanten. Ställer tillbaka den | *(när pottan lyfts över kanten)* Nu tömmer du pottan i toaletten. | `hopp-mjuk`, `porl` (kort, tyst), `landa-mjuk` |
| 24 | Halvnära. Kaninen trycker på knappen. Rycker till av ljudet, öronen upp. Närbild: fnissar | *(efter trycket)* Och så spolar du. Schhh! | `klick`, `spol`, `kanin-ny-fniss` (annan tagning) |
| 24b | Samma. Kaninen vinkar kort åt toaletten | Hej då, kisset! | – |
| 25 | Halvnära. Kaninen på pallen bakom handfatet, kranen rinner, tvålen mellan tassarna, skumtussen växer | *(när skummet syns)* Nu tvättar du tassarna med tvål och vatten. Tvätta, tvätta! | `tass`, `kran`, `skrubb` |
| 26 | Samma. Kranen stängs, tre droppar. Handduken glider från kroken till tassarna, gnider och tillbaka. Närbild: rena tassar, kaninen myser | *(när handduken gnider)* Och torkar tassarna på handduken. Så! | `droppar` ×3, `handduk-gnugg`, mysig suck `kanin-gullig-4b` |
| 27 | Helbild. Kaninen skuttar ner till pottan. Kritan flyger in och ritar en stjärna ovanför pottan: fem uddar i ett drag. Väntar och svävar | Titta! Kritan ritar igen. *(gisspaus 3 s)* | `krita-ritar`, nyfiket `kanin-ny-sniff` (annan tagning) |
| 28 | Stjärnan fylls i gul, krit-gnistor. Den glider ner i kaninens tass. Närbild: kaninens ögon glittrar | En stjärna! Ett klistermärke till dig. | `glitter`, `tindra-4`, `kanin-ny-fortjust` (annan tagning) |
| 28b | Halvnära. **Pausen:** kaninen tittar på stjärnan, sedan på pottan, och pekar mot den. Sedan (efter repliken) trycker kaninen fast stjärnan på pottans framsida. Närbild på stjärnan på pottan, glimt | Var vill du sätta stjärnan? *(paus: ja-ljud, pekar)* På pottan! Bra idé! | `kanin-ny-ja`, `klistra`, `glimt-1` |
| 28c | Halvnära. Kaninen tittar upp mot kritan, som flyger ut uppe till höger | Tack, kritan! | `kanin-tack` (annan tagning) |
| 29 | Helbild. Kaninen tittar på bollen bredvid pottan. **Pausen:** glatt ja. Efter Malins reaktion puffar kaninen bollen och gör ett lugnt glatt skutt (leker 2 s) | Vill du leka med bollen igen? *(paus: jippi)* Ja, bollen har väntat på dig! | `kanin-ny-jippi`, `hopp-mjuk`, `kanin-ny-fniss` (fniss) |
| 30 | Halvbild. Kaninen vinkar (armen bakom kroppen), pottan med stjärnan och bollen bredvid | Hej då, kaninen! Hej då, pottan! | `kanin-hejda` |
| 31 | Samma, kaninen vinkar klart | Hej då! Vi ses snart! | `kanin-hejda` (annan tagning) |
| 32 | Kritirisen runt kaninen, pottan med stjärnan och bollen. 0,6 s svart | – | – |

**Frågor till barnet (paus):** gissa ritintrot (3 s), gissa boken (3 s), *"Kan du se toarullen?"* (5 s), gissa stjärnan (3 s). Inga uppmaningar att göra något med kroppen.

**Fniss:** fyra (3, 15b, 24, 29), aldrig två rader i följd, aldrig över Malin.

**Bilden på orden:** bollen ligger still intill pottan före *"vänta på dig"*, öronen sjunker på *"inget än"*, moroten syns före *"En morot!"*, det förvånade ansiktet kommer på ljudet *plink* (efter *"Vänta, vänta …"*), fliken skimrar på *"Ja, där!"*, nicken på *"klart"*, stjärnan sitter fast efter *"På pottan!"*. Ordets tid inne i replik 32 (*"klart"*) mäts med whisper per tagning. *Plink* är ett ljud som läggs efter replik 25, inte ett ord.

**Malin efter handlingen:** rad 3, 5, 7, 13, 15, 21, 23, 24, 25, 26 beskriver en rörelse och börjar 0,4–0,8 s in i den eller när den landat. Frågorna (2, 6, 13b, 28b, 29) kommer före kaninens svar.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. **Inspelad 2026-11-27** (`ElevenLabs_2026-11-27T17_49_44__s50_v3.mp3`, 157 s), delad med `verktyg/dela-tagning.py` till `assets/ljud/roster/kaninen-gar-pa-pottan/` efter `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En toarulle!
[happy] Hej, kaninen! Hej, hej!
[warmly] Vad gör du, kaninen?
[happy] Jaså, du leker med bollen!
[curious] Oj! Du vickar på dig. Behöver du kissa?
[chuckles] Nähä? Du vill leka mer med bollen.
[warmly] Oj, oj. Nu vickar du ännu mer!
[warmly] Jaha, du behöver kissa! Då går vi till pottan.
[cheerfully] Lägg bollen bredvid pottan. Den kan vänta på dig.
[warmly] Ska du sätta dig på pottan nu?
[happy] Ja, vad bra!
[warmly] Nu sitter du på pottan.
[curious] Vänta, vänta … inget än.
[warmly] Hm. Det är svårt att sitta still och vänta.
[happy] Titta! Kritan ritar något vid pottan.
[happy] En bok! En bilderbok! Varsågod, kaninen.
[happy] Tack, kritan!
[happy] Du tittar i boken. Oj! En morot!
[curious] Tycker du om morötter?
[chuckles] Ja, morötter är goda!
[playfully] Vänta, vänta … inget än.
[happy] Du vänder blad. Titta! En liten kanin på en potta.
[laughs] Precis som du!
[playfully] Vänta, vänta …
[happy] Ja! Du kissade i pottan!
[warmly] Så bra, kaninen!
[curious] Nu behöver du papper. Men … var är toarullen?
[warmly] Kan du hjälpa kaninen? Var är toarullen?
[happy] Ja, där! Bakom badkaret!
[cheerfully] Du hämtar toarullen. Hopp, hopp!
[warmly] Nu torkar du dig med papperet. Torka, torka … klart!
[cheerfully] Nu tömmer du pottan i toaletten.
[playfully] Och så spolar du. Schhh!
[chuckles] Hej då, kisset!
[happy] Nu tvättar du tassarna med tvål och vatten. Tvätta, tvätta!
[happy sigh] Och torkar tassarna på handduken. Så!
[happy] Titta! Kritan ritar igen.
[happy] En stjärna! Ett klistermärke till dig.
[curious] Var vill du sätta stjärnan?
[happy] På pottan! Bra idé!
[warmly] Tack, kritan!
[cheerfully] Vill du leka med bollen igen?
[happy] Ja, bollen har väntat på dig!
[happy] Hej då, kaninen! Hej då, pottan!
[warmly] Hej då! Vi ses snart! [giggles]
```

47 repliker (Sannas putsning 2026-11-27: toarullen i ritintrot, *"Jaha, du behöver kissa! Då går vi till pottan."* som egen replik, *"Lägg bollen bredvid pottan. Den kan vänta på dig."*, *"Tack, kritan!"*, *"Ja, morötter är goda!"*, *"Så bra, kaninen!"*, *"Var är toarullen?"*, *"Tvätta, tvätta!"*). Den tredje *"Vänta, vänta …"* (replik 26) får sin förväntan i bilden och ljudet (rad 16): öronen reser sig, kameran glider in, det blir tyst.

## Kaninens röst och ljuden

Kaninens familjer finns i `assets/ljud/effekter/` (`kanin-gullig/`, `kanin-ny/`, `kanin-tack/`). Samma tagning aldrig två gånger i rad.

| Känsla | Ljud | Rader |
|---|---|---|
| hej | `kanin-hej-4` (svenskt *"hej!"*) | 1 |
| leker, jätteglad | `kanin-ny-jippi-1`/`2` | 1b, 17, 29 |
| vill inte, otålig | `kanin-ny-trumpen` 1–4 (klipp kort, det är ett litet nej) | 2, 9 |
| fniss | `kanin-ny-fniss` 1–4 | 3, 15b, 24, 29 |
| frågande, undrar | `kanin-ny-fragande-1`/`2`, `kanin-gullig-7` (*"hm-hm?"*) | 4, 8, 18 |
| nyfiken | `kanin-gullig-5`/`5b`, `kanin-ny-sniff-1`/`2` (nosar mot det kritan ritar) | 5, 10, 12, 27 |
| ja, nickar | `kanin-ny-ja` 1–3 | 6, 13b, 17b, 22, 28b |
| förtjust | `kanin-ny-fortjust-1`/`2`, `kanin-gullig-2` | 11, 15, 20, 28 |
| tack | `kanin-tack` 1–4 | 12b, 28c |
| mums | `kanin-ny-mmm` 1–3 | 13 |
| lättad, mysig suck | `kanin-gullig-4`/`4b` | 16b, 26 |
| hej då | `kanin-hejda-2`, `-1` (svenskt *"hej då"*) | 30, 31 |

**Alla ljud finns (Sanna 2026-11-27: "använd ljud som redan finns"):** inget hämtas från Openverse och inget görs i ElevenLabs. Kaninens familj täcker alla känslor.

**Saknas i familjen:** ett förvånat *"oj!"*. Rad 16 klarar sig utan: förvåningen är 0,3 s tystnad och ansiktet, och sedan kommer sucken. Inget nytt kaninljud behövs.

| Övriga ljud | Finns | Rader |
|---|---|---|
| `tass` (också mjukt på varje vick i rad 2 och 4), `hopp-mjuk`, `landa-mjuk` | ja | 1–7, 21, 23 |
| `rull` (bollen kort, toarullen 2 s) | ja | 3, 5, 21 |
| `krita-ritar`, `glitter`, `glimt-1`/`2`, `tindra-3`/`4`, `skogsljud-1`, `badrumsljud-2` | ja | 01, 10, 11, 17, 19, 20, 27, 28 |
| `ritsch` (lappen rivs av), `porl` (kort och tyst när pottan töms) | ja (042) | 22, 23 |
| `kran`, `skrubb`, `droppar`, `handduk-gnugg` | ja | 25, 26 |
| `klistra` (stjärnan trycks fast; lyssna först) | ja | 28b |
| `plink` = **`droppar-1`** (0,3 s, en klar droppe) | ja (Sanna 2026-11-27: befintliga ljud) | 16 |
| `blad` = **`prassel-tyg-1`**, de första 0,6 s med uttoning 0,2 s (samma ljud som popupbokens pärm) | ja | 13, 15 |
| `spol` = **`kran-1`**, 2,5 s, lågpass 1200 Hz, intoning 0,2 s och uttoning 1 s, volym 0,5, så att den inte skräms; `porl-1` svagt ovanpå sista sekunden | ja | 24 |
| `klick` = **`lampa-klick-4`** (0,2 s, litet mjukt klick) | ja | 24 |

## Saker: finns och nya

**Finns i `rekvisita/` (används som de är):**

| Sak | Fil | Roll |
|---|---|---|
| Pottan | `rekvisita/potta.md`, `assets/rekvisita/potta/cut/potta-v3.png`, kontur `potta-v3-kontur.json` | ritintrot, kaninen sitter på den, stjärnan klistras på den |
| Toarullen | `rekvisita/toarulle.md`, `cut/toarulle.png` | rullar in bakom badkaret i rad 3, barnet hittar den |
| Badkaret | `rekvisita/badkar.md` | gömstället, längst till höger |
| Handfatet, pallen, handduken, tvålen | `rekvisita/handfatet.md`, `pall.md`, `handduk.md`, `tval.md` (kod) | tvätta och torka tassarna, rad 25–26 |
| Blå bollen | `rekvisita/boll-bla.md` | leken, väntar bredvid pottan |
| Gula stjärnan | `rekvisita/stjarna-gul.md`, `cut/stjarna-gul.png` och kontur | klistermärket: liten (ca 90 px), **utan ansikte**, kanten tunnad för storleken med `tunn_kant.py` till en egen `-tunn.png` |
| Moroten | `rekvisita/morot.md` | bilden på bokens första uppslag |
| Badrummet | `bakgrunder/badrummet.md` | platsen |

**Nya (grind 2 godkänd 2026-11-27: bok nr 4, toalett nr 2):**

| Sak | Hur | Roll |
|---|---|---|
| **Bilderboken** | Flow-bild (4 tagningar, pottan och toarullen som stilreferens): en liten tjock pekbok sedd rakt framifrån, stängd, rundade hörn, pärm i en klar färg som syns mot den havsgröna väggen och den röda pottan (förslag solgul med en liten enkel bild på framsidan). Kontur för kritan: pärmen, ryggen, bilden. **Det öppna uppslaget ritas i kod:** två krämvita sidor med rundade hörn och en mittfåra, bilden är ett urklipp som redan finns (moroten; pottan med kaninens riggbild liten ovanpå) | kritans hjälpsak, rad 10–18 |
| **Toaletten** | Flow-bild (4 tagningar, handfatet och pottan som stilreferens): en låg vit toalett sedd rakt framifrån, locket uppfällt, en rund spolknapp ovanpå, svag blågrå kritkant så att den syns mot det vita golvet (som toarullen). Insidan syns inte | pottan töms och spolas, rad 23–24 |

**Provbilder grind 2 (2026-11-27, Google Flow, Nano Banana 2.1, 1:1, 0 krediter):** 4 tagningar per sak i `assets/rekvisita/<sak>/original/<sak>-1…4.jpeg`, sida vid sida i `original/jamforelse.jpg`.

Bilderboken (bild 1 = `potta/potta-v3.jpeg`, bild 2 = `toarulle/toarulle.jpeg`, stilreferens):

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE small, chunky, closed children's board book seen exactly straight from the front, very simple and childish: a thick rounded rectangle a little taller than wide, with softly rounded corners. The cover is a warm sunny yellow (#F6C445). Along the left edge a slightly darker golden yellow spine strip (#E0A82E), about one eighth of the width. A thin cream-white (#F7F0E1) band of thick page edges peeks out along the right side and the bottom, showing the book is chunky. In the middle of the cover one small, simple picture of an orange carrot (#F08A2C) with a few green leaves (#5FA845) on top, drawn flat. No text, no letters, no title, no face, no pattern, no 3D, no shine, no shading, no outline. A thick, clean, even white sticker border all around. Centered, the book fills about 60 percent of the frame height, plain pure solid white background, no shadow, no ground.
```

Toaletten (bild 1 = `handfatet/handfatet.jpeg`, bild 2 = `potta/potta-v3.jpeg`, stilreferens):

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE low, chubby, friendly toilet seen exactly straight from the front at eye level, so the inside of the bowl is NOT visible at all, only the outside: very simple and childish. A short rounded cistern tank at the back with one big round flush button on its flat top, a soft rounded bowl in front that narrows to a short sturdy foot at the bottom, and the seat lid folded UP, standing upright against the tank as a soft rounded oval. All in warm soft white (#F8F6F1) with a faint pale blue-grey crayon edge (#C9D3DE) on every shape so it stands out on a white floor, and the round flush button in pale blue-grey (#B8C6D4). The top edge of the bowl is a clean simple line with no opening and no inside showing. No water, no pipes, no paper, no face, no text, no pattern, no 3D, no shine, no shading, no outline. A thick, clean, even white sticker border all around. Centered, the toilet fills about 65 percent of the frame height, plain pure solid white background, no shadow, no ground.
```

I kod utan egen rekvisitafil: pappersfliken bakom badkaret, papperslappen, bokens uppslag, skummet, strålen, skimret.

## Regelkoll

- [x] 1 figur, 1 plats (badrummet), inget platsbyte
- [x] Inga djurnamn: "kaninen", "pottan", "bollen", "kritan". Röstfilernas namn likaså
- [x] Aldrig *"Vad kan det vara?"* eller *"Vad säger man?"*. Ritintrot: *"Hm … vad blir det nu?"*, tacket: *"Tack kritan"* (Sanna 2026-11-27)
- [x] Ritintrot ritar en sak ur berättelsen (pottan), inte kaninen
- [x] Inga uppmaningar att göra något med kroppen. Barnets del: gissa teckningarna, säga tack, **leta efter toarullen**
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då varmt
- [x] Malin frågar, kaninen svarar, Malin reagerar: rad 1b, 2–3, 6, 13b, 28b, 29
- [x] Tydliga repliker: handlingen och saken sägs (*"Nu torkar du dig med papperet"*, *"Nu tömmer du pottan i toaletten"*, *"Och torkar tassarna på handduken"*)
- [x] Kritans problem av ny sort: **att vänta** (inget kommer, svårt att sitta still). Hjälpsaken löser väntan, inte själva pottan
- [x] *"Varsågod"* och *"Tack kritan"* efter boken, *"Tack, kritan!"* efter stjärnan
- [ ] **Avsteg mot receptet (Sanna 2026-11-27):** ingen *"Ska vi säga tack?"* med paus: Malin tackar själv, så barnets tack-paus utgår
- [x] Samma fras tre gånger: *"Vänta, vänta … inget än."* ×2, *"Vänta, vänta …"* + ljudet *plink*
- [x] Bilden på orden (se listan under tabellen)
- [x] Malin efter handlingen på rader som beskriver en rörelse
- [x] Kritan ritar två gånger i scenen: boken (hjälpsaken) och stjärnan (belöningen)
- [x] Reaktionsslag och närbilder: 1b, 4, 8, 11, 15b, 16b, 17b, 20, 24, 26, 28
- [x] Fniss högst 3–4: rad 3, 15b, 24, 29 (+ giggles i sista repliken)
- [x] Tydligt hej och hej då, med vinkning
- [x] Inget läskigt, inget pinsamt, ingen press: ingen olycka, ingen brådska, ingen som tjatar. Pottan visas bara framifrån, inget visas utöver ett litet ljud (*plink*), torkningen sker utanför bild
- [x] Inget går genom något: rullen rullar in bakom badkaret (inte genom), pottan lyfts över toalettens kant, kaninen skuttar upp över pottans kant, handduken går framför tassarna. Täta bilder (6 per sekund) runt rad 3, 7, 21, 23 och 26 i QA
- [x] Figuren snurrar inte, speglas inte, inga böjda armar. Kaninen sover inte
- [x] Ingen ny musik
- [x] 2 nya saker (bilderboken, toaletten): inom `format/regler.md`
- [x] Inga julsaker, avsnittet är tidlöst
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 kamerautsnitt (stilla utsnitt med klipp)
- [ ] Avsteg mot receptets "tre frågor till barnet med 4–5 s paus": här en (toarullen 5 s) och tre gisspauser på 3 s (tack-pausen utgår, Sanna 2026-11-27), enligt 25/11-regeln att barnet letar i stället för att göra (samma som 057)
- [ ] **Avsteg mot `format/regler.md`:** längden blir ca 4:05–4:15 mot regelns 3–4 min (serien siktar på 3:45–4:15 sedan 2026-11-11). Se Öppet 7

## Öppet (Sanna bestämmer)

1. ✅ **Besvarad 2026-11-26: alternativ A, med toaletten.** **Toaletten: ny sak, och trångt i badrummet.** Med toaletten står handfatet, pallen, toaletten, pottan, bollen, toarullen och badkaret i samma bild. Förslag: badkaret längst till höger med bara vänstra delen i bild. Alternativ B: ingen toalett, raderna 23–24b stryks (replik 34–36) och kaninen går direkt till handfatet. Då är bara boken ny, och filmen blir ca 15 s kortare. Jag föreslår A: att spola är det roligaste för barnen.
2. **Orden *"kissa"* och *"Hej då, kisset!"*** *"Behöver du kissa?"* godkändes i 042. *"Du kissade i pottan!"* och *"Hej då, kisset!"* är nya. Replik 36 är en egen rad och kan strykas utan att något annat ändras. Mjukare alternativ till replik 27: *"Ja! Det kom i pottan!"*
3. **Torkningen (rad 22):** kaninen står bredvid pottan, bilden är från magen och upp och tassen går ner ur bild en gång. Säg till om den hellre ska strykas helt (då hämtar kaninen rullen och lägger bara en lapp i pottan).
4. **Ritintrot ritar pottan,** som 042:s omgjorda intro. Alternativ om du vill ha något annat än 042: toarullen (kontur finns) eller bollen.
5. **Leksaken: blå bollen** (finns, syns mot den röda pottan). Alternativ: klossarna (`rekvisita/klossar.md`), men då behövs ett annat sätt för toarullen att rulla iväg.
6. **Stjärnan sätts på pottan.** Alternativ: på kaninens mage eller på ett litet papper på väggen. På pottan syns den i slutbilden och i miniatyren.
7. **Längden,** ca 4:00–4:10 med 46 repliker. Kortare: stryk morotssamtalet (replik 20–21) och *"Hej då, kisset!"* (35), ca 10 s, eller välj alternativ B i punkt 1.
8. **Bokens bilder:** moroten och *"en liten kanin på en potta"* (kaninens egen riggbild, liten). Bokens pärmfärg och bild väljs på grind 2.
9. **Nära 042** (pottan, toarullen som försvinner). Lägg inte 042 och 060 efter varandra i en mix.
10. **Uppställningen** (vad som står var) är ett förslag och visas i animatiken på grind 5.
