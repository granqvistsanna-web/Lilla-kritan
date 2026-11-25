# Avsnitt 053 – Leoparden städar (plan)

**Status:** grind 1 (manus) godkänd av Sanna 2026-11-25 (korgen som är full, fel hål en gång, en teckning i berättelsen). **Samma dag: mer samtal och reaktioner** (Sannas mönster från 052: Malin frågar, leoparden svarar i pausen, Malin reagerar). 10 nya repliker (🆕) och en ändrad (✏️), **godkända av Sanna 2026-11-25**. **Grind 2 (saker) klar 2026-11-25:** formlådan nr 2 och klossarna nr 2 (med tjocklek och skuggning, grön trekant) är valda av Sanna, urklippta med tunnade kanter (ca 1 %) och beskrivna i `rekvisita/formlada.md` och `rekvisita/klossar.md`. Nästa steg är grind 3 (rösten). Inget är byggt, inga saker eller ljud är gjorda. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med leoparden, leoparden svarar med spinn-ljud, öron och ansikte. Ca 3:45.

**Förlaga:** 037 Kaninen städar (korgen full av leksaker). Likt men inte identiskt: här är problemet att **klossarna inte får plats** (korgen är redan full), och vändningen är att kritan ritar en **formlåda** där varje kloss har sitt eget hål. Barnet letar efter **trekanten**, som har åkt in under sängen.

**Skillnad mot 027 Zebran plockar undan** (samma sovrum, också något under sängen): där var problemet "vill inte", saken var en boll och lösningen en radio. Här vill leoparden gärna städa men det finns ingen plats, och barnet har själv sett trekanten åka in under sängen i leken.

**Enkel animation.** Leoparden tar inte i klossarna med böjda armar. En rak tass puffar till klossen, och klossen glider själv i en lugn båge. Trekanten som hatt sitter i tassens spets och glider upp på huvudet. Klossarna sjunker rakt ner i sina hål och kläms aldrig genom något.

| | |
|---|---|
| **Titel** | Leoparden städar (avsnitt 53) |
| **Figurer (1)** | **Leoparden Lova** (v2, riggad, ✅ referensark klart, `assets/karaktarer/leoparden-lova/premium/`) |
| **Platser (1)** | **Sovrummet** (`bakgrunder/sovrummet.md`, samma uppställning som 027): sängen till höger med täcket som hänger ner över kanten, korgen vid väggen till vänster om sängen. Dagshimmel i fönstret. Inget platsbyte, inget kritsvep |
| **Saker som finns** | sängen (`sangen`), täcket (`tacket`), kudden (`kudde`), korgen (`korg`, `cut/korg-v3.png`) full av leksaker som i 037: nallen (`nalle`), röda bollen (`boll-rod`), röda bilen (`bil-rod`), blå hinken (`hink-bla`), badbåten (`badbat`) |
| **Nya saker (2)** | **formlådan** (`formlada`, kritan ritar den) och **klossarna** (`klossar`: röd cirkel, blå fyrkant, grön trekant). Se listan längst ner |
| **I kod** | himlen i fönstret, skimret runt trekantens hörn, glitter, små streck när en kloss landar, klossarna som sjunker ner i hålen (maskade vid lockets kant) |
| **Musik** | ingen ny musik. Förslag: `stada-radion-slinga.m4a` (027:s städlåt) lågt (ca 0,10) från *"Nu städar vi"* (rad 18) till och med skramlet (rad 30), sänkt i frågepausen. Platsmatta `hemmaljud` lågt |
| **Favoriter** | 🐆 leopard · 🧱 klossar · 📦 låda |
| **Kärna** | Leoparden har lekt, och klossarna ligger överallt: en cirkel, en fyrkant och en trekant. Leoparden vill städa, men korgen är redan full och klossarna glider ner igen. Kritan ritar en låda med tre hål: *"Varsågod!"* – *"Tack, kritan!"* Leken: trekanten blir en spetsig hatt, men när leoparden skuttar glider den av och in under sängen (bara ett grönt hörn syns). Tre gånger *"Ner i hålet … plopp!"*: cirkeln (som först provar fel hål), fyrkanten, och trekanten, som är borta. Barnet hittar den under sängen. Städat! Lådan skramlar. Hej då! |
| **Barnet övar på** | gissa vad kritan ritar · se vilken kloss som passar i vilket hål · hitta trekanten under sängen · säga tack |
| **Leken** | **trekanten blir en hatt** (uppslag 15–17) och **lådan skramlar** (uppslag 30) |
| **Lärotemat** | former, subtilt: Malin säger formens namn när klossen nämns, cirkeln stannar en gång på fel hål (*"Hm … inte där."*) och glider vidare till det runda, och ritintrot ritar trekanten. Ingen fråga om formerna, ingen lektion |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | lugna steg från vänster (riggens gång, `smasteg`), stannar till vänster om mitten före repliken, vinkar |
| Vinkar | armen bakom kroppen, snett ut förbi kanten (ca 60°), 3–4 lugna vink, den andra armen i vila |
| Glatt skutt | 20 px upp, tryck ihop före och efter. Inget studs |
| Puffar en kloss | rak tass lyfts mot klossen längs roten (0,4 s), klossen glider iväg själv i en lugn båge (0,8–1,0 s). Tassen tillbaka |
| Korgen är full | cirkeln (sedan fyrkanten) glider upp och lägger sig överst på leksakshögen, vickar lugnt ±4° två gånger och glider ner igen **framför** korgen till golvet (`duns` lågt). Går aldrig genom korgen eller leksakerna |
| Ledsen | öronen faller 12°, huvudet lutar lite, `spinn-gullig-6`. Ingen gråt |
| Kritan ritar lådan | kritan in uppe till höger, konturen på golvet bredvid leoparden i ett drag (4 s): lådans ytterform, lockets kant och de tre hålen som egna drag (cirkel, fyrkant, trekant), så att den går att gissa. Svävar och vickar lugnt i gisspausen (3 s), knackar aldrig. Lådan fylls i inifrån med `glitter`. Kritan flyger ut uppe till höger |
| Lådan | sedd rakt framifrån, lågt, med locket lite synligt ovanifrån så att de tre hålen syns i en rad: runt, fyrkantigt, trekantigt. Står still hela tiden utom när den skramlar |
| Kawaii-ögon | när lådan är klar (rad 12): ögonen med glitter, öronen reser sig |
| Trekanten blir hatt | rak tass sänks mot trekanten, trekanten sitter i tassens spets (tassen framför sakens nederkant, armen med mörkare kritkant), armen glider upp längs roten (0,6 s) och trekanten glider vidare och lägger sig mellan öronen, lite snett. Följer huvudet. Flyttas och vrids, skalas aldrig |
| Hatten åker av | glatt skutt med blundande glada ögon (fnisset), hatten glider av bakåt på landningen, ner på golvet och glider vidare in under täckets nedhängande kant. Bara ett grönt hörn sticker fram nedanför täcket och ligger kvar där. Leoparden ser det inte |
| Fel hål | cirkeln glider upp och stannar på det trekantiga hålet, vickar ±4° två gånger (får inte plats), leoparden lutar huvudet, sedan glider cirkeln vidare till det runda hålet |
| Ner i hålet | klossen står still över sitt hål 0,4 s, sjunker rakt ner (0,5 s, maskad vid lockets kant) och är borta på **"plopp!"** (`plopp`, `glitter`). Leoparden gör ett litet glatt skutt efteråt |
| Förvånad | trekanten är borta: tassen till huvudet, stora ögon, liten rund mun, öronen upp, 0,3 s stillhet |
| Tittar efter | `rikt ±0,3` och ögonen åt sidan, huvudet vänds inte |
| Skimret | trekantens hörn skimrar svagt efter 3 s av frågepausen, tydligt på *"Ja, där!"* (`tindra`) |
| Trekanten kommer fram | leoparden lutar sig 8° mot sängen och sträcker den raka armen längs roten, trekanten glider fram under täcket till tassen (`glid` lågt), sedan i en båge upp till lådan |
| Lådan skramlar | rak tass på lådans sida, lådan vickar ±3° två gånger (0,5 s var), `skrammel`. Ingen hoppar, inget snurrar |

## INTRO

Seriens intro som i de senaste bilderböckerna (bestäms vid bygget).

## KRITAN RITAR (~12 s) – trekanten

Kritan ritar **trekanten**, inte leoparden (Sanna 2026-11-25). Konturen i ett lugnt drag (ca 2,8 s, `kritan-ritar`): trekantens tre sidor med rundade hörn, och en kort inre linje längs ena sidan som visar klossens tjocklek, så att den ser ut som en kloss och inte bara en form. Kritan svävar medan barnet gissar, den gröna trekanten fylls i inifrån. Zoom in i teckningen och in i sovrummet, där trekanten ligger på golvet bland de andra klossarna. Skogsljud under.

## SOVRUMMET (dag)

| # | Bild (en rörelse) | Malin säger | Leoparden svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar trekantens kontur | Kritan ritar … *(paus)* Hm … vad blir det nu? *(gisspaus)* Oj! En trekant! | krita-ritar, skogsljud, `glitter` |
| 1 | Helbild. Klossarna ligger på golvet: cirkeln vid fönstret, fyrkanten mitt på golvet, trekanten framför sängen. Korgen full vid väggen. Leoparden kommer in från vänster, stannar och vinkar | Hej, leoparden! Hej, hej! | `smasteg`, `spinn-gullig-1` (hej) |
| 1b | Halvbild. Leoparden tittar på klossarna, sedan på kameran, och nickar | 🆕 Har du lekt med klossarna? *(paus: leoparden svarar)* 🆕 Ja, vad kul! | `spinn-gullig-2` (förtjust) i pausen |
| 2 | Leoparden tittar ner på golvet, sedan på kameran | Oj, oj, oj! Klossar överallt! | `spinn-gullig-3` (kort fniss) |
| 3a | Närbild på cirkeln, den glimtar | En cirkel … | `glimt` |
| 3b | Närbild på fyrkanten, den glimtar | en fyrkant … | `glimt` |
| 3c | Närbild på trekanten, den glimtar | och en trekant! | `glimt` |
| 4 | Halvbild. Leoparden nickar två gånger | ✏️ Ska vi städa, leoparden? *(paus: leoparden svarar)* 🆕 Ja, bra idé! | `spinn-gullig-2b` (förtjust) i pausen |
| 5 | Helbild. Leoparden puffar cirkeln mot korgen. Cirkeln glider upp på leksakshögen, vickar och glider ner igen framför korgen | *(när den landat)* Oj då! | `duns` lågt |
| 6 | Närbild på korgen: nallen, bollen, bilen, hinken och båten ligger i en hög | Korgen är full. | – |
| 7 | Helbild. Leoparden puffar fyrkanten. Samma sak: upp, vickar, ner igen | Klossarna får inte plats. | `duns` lågt |
| 8 | Närbild. Öronen faller, huvudet lutar | *(efter reaktionen)* 🆕 Nej, det är inte så lätt. | `spinn-gullig-6` (trumpen) före repliken |
| 9 | Halvbild. Leoparden tittar på kameran | Hm … vad gör vi nu? | – |
| 10 | Klipp till golvet bredvid leoparden. Kritan kommer in och ritar lådans kontur (4 s), gisspaus 3 s, lådan fylls i inifrån | Titta! Kritan ritar något. *(gisspaus 3 s)* En låda! Med tre hål. | krita-ritar, `glitter` |
| 11 | **Närbild.** Leoparden med kawaii-ögon (`kawaii`), öronen reser sig, svansen vippar | Varsågod, leoparden. | `spinn-gullig-2b` |
| 11b | Närbild. Leoparden tittar in i hålen, sedan på kameran, öronen reser sig | 🆕 Tycker du om lådan? *(paus: leoparden svarar)* 🆕 Ja, den är så fin! | `spinn-gullig-7` (pratar) i pausen |
| 12 | Leoparden tittar på lådan, sedan på kameran | Ska vi säga tack? *(paus 2,5 s)* | `spinn-gullig-5` (nyfiken) |
| 13 | Leoparden nickar direkt. Kritan flyger ut | Tack, kritan! | `spinn-gullig-2` |
| 14 | Helbild. Leoparden tittar ner på trekanten framför sig och sänker tassen mot den | 🆕 Vad ska du göra med trekanten? *(paus: leoparden svarar)* | `spinn-gullig-5b` (nyfiken) i pausen |
| 15 | Trekanten följer med tassen upp och lägger sig på huvudet som en hatt | *(när den sitter)* Oj! En hatt! | `spinn-fniss` |
| 16 | Närbild. Leoparden med hatten, blinkar, öronen vippar | En spetsig hatt! | `spinn-gullig-4` (mysig suck) |
| 17 | Helbild. Glatt skutt med blundande ögon. Hatten glider av, över golvet och in under täcket. Ett grönt hörn sticker fram | *(när den stannat)* Hoppsan! | `spinn-fniss` (annan tagning), `glid` |
| 18 | Halvbild. Leoparden vänder sig mot lådan (riktningsposen, inte runt) | Nu städar vi. Först cirkeln. | musiken börjar lågt |
| 19 | Helbild. Leoparden puffar cirkeln. Den glider upp och stannar på det trekantiga hålet, vickar | Hm … inte där. | `spinn-gullig-5` |
| 20 | Närbild på lådan. Cirkeln glider till det runda hålet och sjunker ner | Ner i hålet … plopp! | `plopp`, `glitter` |
| 20b | **Närbild.** Leoparden ser stolt ut (`stolt`), svansen vippar, ett litet glatt skutt | *(när den landat)* 🆕 Ja, där passade den! | `spinn-gullig-2` före repliken |
| 21 | Närbild på fyrkanten när den nämns, sedan helbild: puff, fyrkanten glider rakt till sitt hål | Och fyrkanten. | `glimt` |
| 22 | Närbild på lådan, fyrkanten sjunker ner | Ner i hålet … plopp! | `plopp`, `glitter`, `spinn-gullig-3` |
| 23 | Närbild på det tomma trekantiga hålet, sedan halvbild: leoparden tar tassen till huvudet, hatten är borta. Förvånad min | Och nu trekanten … Oj! Var är trekanten? | `spinn-gullig-5b` |
| 24 | Leoparden tittar åt vänster, sedan åt höger | Leoparden vet inte var. | `spinn-gullig-7` (frågande prat) |
| 25 | Helbild för frågan, sedan klipp till närbild under sängen där hörnet sticker fram. Efter 3 s skimrar det svagt | Kan du hjälpa leoparden? Kan du se var trekanten är? *(paus 5 s)* | tyst, musiken nedtonad |
| 26 | Närbild, hörnet skimrar tydligt | Ja, där! Under sängen! | `tindra`, `spinn-gullig-2` |
| 27 | Helbild. Leoparden sträcker tassen, trekanten glider fram och i en båge till lådan, sjunker ner. Klipp till **närbild** på leoparden: `jatteglad`, öronen upp, svansen vippar (1,5 s reaktion) | Ner i hålet … plopp! | `glid`, `plopp`, `glitter` |
| 28 | Helbild. Golvet är tomt, lådan står med alla klossar. Glatt skutt | Nu är det städat! | `spinn-gullig-2b` |
| 29 | Närbild på lådan, de tre hålen glimtar ett i taget | Cirkeln, fyrkanten och trekanten. Alla i lådan. | `glimt` ×3 |
| 30 | Halvbild. Leoparden puffar lådan två gånger, den skramlar (2–3 s innan Malin). Sedan **närbild** på leoparden: `fnissig` | Hör du? Det skramlar! | `skrammel` ×2, `spinn-fniss` |
| 30b | Halvbild. Leoparden tittar på kameran och nickar | 🆕 Var det kul att städa? *(paus: leoparden svarar)* 🆕 Ja, det tyckte jag också! | `spinn-gullig-3b` (kort fniss) i pausen |
| 31 | Halvbild, leoparden vinkar | Hej då, leoparden! Hej då, klossarna! | `spinn-gullig-8` (hej då) |
| 32 | Samma, leoparden vinkar klart | Hej då! Vi ses snart! | `spinn-gullig-8b` |
| 33 | Kritirisen runt leoparden och lådan, sedan prenumerera-kortet (`produktion/youtube/prenumerera/`) och outrot | – | musiken tonar ut |

**Kamera:** bara hårda klipp mellan stillastående utsnitt. Helbild på rummet, halvbild på leoparden, närbild på varje kloss när den nämns (3a–3c, 21), på korgen (6), på lådan när klossarna går ner (20, 22, 29) och på hörnet under sängen (25–26). Zoomen in i teckningen efter ritintrot är den enda zoomen.

**Short:** uppslag 18–29 (ner i hålet tre gånger, hitta trekanten under sängen), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/leoparden-stadar/` (`01-kritan-ritar` …) med `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En trekant!
[happy] Hej, leoparden! Hej, hej!
[curious] Har du lekt med klossarna?
[happy] Ja, vad kul!
[laughs] Oj, oj, oj! Klossar överallt!
[warmly] En cirkel …
[warmly] en fyrkant …
[happy] och en trekant!
[cheerfully] Ska vi städa, leoparden?
[happy] Ja, bra idé!
[surprised] Oj då!
[curious] Korgen är full.
[warmly] Klossarna får inte plats.
[gently] Nej, det är inte så lätt.
[curious] Hm … vad gör vi nu?
[happy] Titta! Kritan ritar något.
[happy] En låda! Med tre hål.
[warmly] Varsågod, leoparden.
[curious] Tycker du om lådan?
[happy] Ja, den är så fin!
[warmly] Ska vi säga tack?
[happy] Tack, kritan!
[curious] Vad ska du göra med trekanten?
[laughs] Oj! En hatt!
[happy] En spetsig hatt!
[chuckles] Hoppsan!
[cheerfully] Nu städar vi. Först cirkeln.
[curious] Hm … inte där.
[playfully] Ner i hålet … plopp!
[happy] Ja, där passade den!
[cheerfully] Och fyrkanten.
[playfully] Ner i hålet … plopp!
[surprised] Och nu trekanten … Oj! Var är trekanten?
[curious] Leoparden vet inte var.
[warmly] Kan du hjälpa leoparden? Kan du se var trekanten är?
[happy] Ja, där! Under sängen!
[playfully] Ner i hålet … plopp!
[happy] Nu är det städat!
[happy sigh] Cirkeln, fyrkanten och trekanten. Alla i lådan.
[laughs] Hör du? Det skramlar!
[warmly] Var det kul att städa?
[happy] Ja, det tyckte jag också!
[happy] Hej då, leoparden! Hej då, klossarna!
[warmly] Hej då! Vi ses snart!
```

## Leopardens röst och ljud

Allt utom klossens ljud finns i `assets/ljud/effekter/`: `spinn-gullig` (8 känslor, N och Nb, från 028/029; Sanna har inte lyssnat igenom ordningen, provlyssna vid grind 4), `spinn-fniss`, `smasteg`, `glimt`, `glitter`, `tindra`, `duns`, `glid`, `plopp`, `skrammel`, `krita-ritar`, `skogsljud`, `hemmaljud`. Fniss högst 3–4 gånger (rad 2, 15, 17, 30), aldrig två rader i följd och aldrig över Malin.

**Kanske nytt (grind 4):** ett mjukt träklonk när en kloss landar i lådan, under `plopp`. Openverse först (*wooden block toy drop*, CC0/BY). Annars räcker `plopp` ensamt, eftersom ordet är *"plopp!"*.

## Regelkoll

- [x] 1 figur (leoparden), 1 plats (sovrummet), inget platsbyte, inget kritsvep i berättelsen
- [x] Inga djurnamn i det som sägs: "leoparden", "klossarna", aldrig figurens namn. Röstmappen heter `leoparden-stadar`
- [x] Aldrig *"Vad kan det vara?"*: ritintrot säger *"Hm … vad blir det nu?"*. Aldrig *"Vad säger man?"*: *"Ska vi säga tack?"*
- [x] Inga uppmaningar till barnet att göra något med kroppen. Barnets frågor: gissa teckningen (ritintrot, lådan), säga tack, var är trekanten
- [x] Nytt slags problem: något får inte plats (korgen är full), inte "vill inte". Leoparden vill städa hela tiden
- [x] Kritan ritar en sak ur berättelsen i ritintrot (trekanten), inte leoparden. Leoparden kommer in i rad 1
- [x] Barnet letar efter en sak som är borta: trekanten under sängen. Hörnet syns från rad 17, och barnet har sett den åka dit
- [x] Samma fras tre gånger: *"Ner i hålet … plopp!"* (cirkeln, fyrkanten, trekanten), och klossen är borta på *"plopp!"*
- [x] Formerna subtilt: Malin säger namnen när klossarna syns, ingen fråga och ingen förklaring
- [x] Varsågod och tack
- [x] Tydligt hej (med vinkning) och hej då, *"Hej då! Vi ses snart!"*
- [x] Malin efter handlingen: klossen glider och landar först, sedan *"Oj då!"*, *"Oj! En hatt!"*, *"Hoppsan!"*
- [x] Inga taggar `[excited]`
- [x] Samtal: Malin frågar leoparden fem gånger (lekt, städa, lådan, trekanten, kul), leopardens ljud ligger i pausen och Malin reagerar kort efter (Sanna 2026-11-25)
- [x] Inget läskigt: korgen är bara full, leoparden blir lite ledsen men gråter inte, trekanten syns hela tiden
- [x] Inget går genom något: klossarna glider ner framför korgen, sjunker bara rakt ner i sitt eget hål, trekanten glider in under täcket och fram igen samma väg
- [x] Inga snurrar, inga böjda armar: puff och hatt med raka armar längs roten
- [x] Två nya saker (formlådan, klossarna)
- [x] Ingen ny musik
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] **Kritan ritar bara en gång i berättelsen** (receptet säger två sedan 021). Se Öppet 3

## Saker: finns och nya

| Sak | Läge |
|---|---|
| Sovrummet | ✅ finns (`bakgrunder/sovrummet.md`, plattan som 027 använde) |
| Sängen | ✅ finns (`sangen`, luft under) |
| Täcket | ✅ finns (`tacket`), hänger ner över sängkanten så att trekanten kan gömma sig under kanten |
| Kudden | ✅ finns (`kudde`) |
| Korgen | ✅ finns (`korg`, `cut/korg-v3.png`) |
| Leksakerna i korgen | ✅ finns: `nalle`, `boll-rod`, `bil-rod`, `hink-bla`, `badbat` (samma som i 037) |
| **Formlådan** | ✅ **ny, nr 2 vald** (`rekvisita/formlada.md`, `assets/rekvisita/formlada/cut/formlada.png`, 1131 × 815, hålens mått står i filen). Konturen görs vid bygget |
| **Klossarna** | ✅ **ny, nr 2 vald** (`rekvisita/klossar.md`, `assets/rekvisita/klossar/cut/kloss-cirkel.png`, `kloss-fyrkant.png`, `kloss-trekant.png`), med tjocklek och skuggning. Trekantens kontur görs vid bygget |

Trekanten är grön och inte gul, så att den syns mot leopardens gula päls när den sitter på huvudet.

## Kontroll mot regler (2026-11-25)

Det finns bara manus och saker än: ingen storyboard, ingen scenkod. Därför finns inga scener att köra `qa-scen.py` på. Kör den när scenen byggs (`python3 verktyg/qa-scen.py avsnitt/053-leoparden-stadar/scener/<scen>`), och `qa-film.sh` på filmen. Rättelserna nedan ändrar bara bildbeskrivningar och kamera, inga repliker, och Sanna har inte godkänt några bilder ännu.

| Punkt | Läge | Rättat |
|---|---|---|
| **1. Rigg** | Leopardens v2-rigg `leoparden-lova` (`premium/uttryck.html` + `verktyg/rigg-motor.js` via `v2-rigg.js`). Manuset använder bara riggens raka armar (`rack`, `sakPa`, `ARMROR.vinka`), inga kodarmar. Ingen figur snurrar: vändningen i rad 18 är riktningsposen. Ingen sover. Svans och öron bakom kroppen har långa rötter i riggen. | Uttrycken är nu riggens namn i stället för fria ord (se tabellen nedan) |
| **2. Effekter** | Sätts i scenen: mjuka skuggor (`R.markskugga`, mindre och blekare när något lyfter), tussar och krit-gnistor där kritan ritar och på *"plopp!"*, svag parallax mellan väggen och golvet/sängen i helbild, varm ton, vinjett högst 0,14. `#boil` 2,5 px delat med kamerazoomen, ny brusbild 6 gånger/s. Vita kanter med `verktyg/kant.js` (urklippen har redan tunna kanter, ca 1 %). Kritan går alltid genom `verktyg/kritan-ritar.js` (ritintrot och lådan), ingen egen kritkod. | Inget att rätta i manuset. Punkterna står här så att scenen följer dem |
| **3. Regler** | 1 figur, 1 plats, inga djurnamn, *"Ska vi säga tack?"*, ingen *"Vad kan det vara?"*, ritintrot ritar trekanten, barnet letar efter trekanten och uppmanas aldrig att göra något med kroppen. Malin kommer efter handlingen (rad 5, 15, 17, 20b). Inget går genom något: se *Lösningar från förlagorna*. Bildutsnitten tas ur `format/bildutsnitt.md` (helbild, halvnära, närbild, detalj; kroppshöjd 430 px). | **Prenumerera-kortet** lagt före outrot (rad 33, ny regel i CLAUDE.md) |
| **4. Reaktioner och uttryck** | Varje händelse hade ett reaktionsslag, men några låg i halvbild. | Närbild på reaktionen i rad 11 (lådan), 20b (första ploppet), 27 (trekanten i lådan) och 30 (skramlet). Starkt uttryck i ansikte, öron och svans, men lugn rörelse: inga studsar, skutten är högst 20 px |
| **5. Lärdomar** | *Lösningar från förlagorna* (ovan) är skriven: 026:s `rum.js`, 027:s korg och gömställe, 028:s hatt, 050:s sak i handen. | – |

### Uttryck och reaktioner per händelse

Uttrycken är namnen i leopardens `UTTRYCK` och blandas med `L.blanda` (0,45 s). Ögonen är öppna vid glädje, utom vid fniss.

| Rad | Händelse | Uttryck | Öron och svans | Bild |
|---|---|---|---|---|
| 1 | hej | `glad` + vinkning | öronen vippar | helbild |
| 1b, 4 | svarar ja | `glad` → `ivrig`, nickar | svansen vippar | halvbild |
| 2 | klossar överallt | `fnissig` | öronen vippar | halvbild |
| 5–7 | korgen är full | `forvanad` (0,3 s stillhet) | öronen upp | helbild → närbild korgen |
| 8 | får inte plats | `ledsen` | öronen faller 12°, svansen hänger | närbild |
| 9 | vad gör vi nu? | `tanker` | – | halvbild |
| 10–11 | lådan ritas | `nyfiken` → `kawaii` | öronen reser sig, svansen vippar | närbild |
| 11b, 12 | tycker om lådan, tack | `glad`, nickar | – | närbild, halvbild |
| 15–16 | hatten | `skrattar` → `stolt` | öronen vippar runt hatten | närbild |
| 17 | hatten åker av | `fnissig` (blundar) | – | helbild |
| 19 | fel hål | `nyfiken`, lutar huvudet | ena örat ner | helbild |
| 20b, 22 | plopp | `stolt` | svansen vippar | närbild |
| 23 | trekanten är borta | `forvanad`, tassen till huvudet | öronen upp | närbild |
| 24 | vet inte var | `nyfiken`, `rikt ±0,3` | – | halvbild |
| 26–27 | hittad, plopp | `jatteglad` | öronen upp, svansen vippar | närbild |
| 28–29 | städat | `stolt` | – | helbild, närbild lådan |
| 30 | skramlar | `fnissig` | öronen vippar | närbild |
| 31–32 | hej då | `glad` + vinkning | – | halvbild |

## Lösningar från förlagorna (2026-11-25)

Genomgång av 027 (huvudförlagan), 037, 026, 040, 028 och 050 innan scenen byggs: scenkoden, `rader.mjs`, feedbackanteckningarna och `git log`. Feedbacksidan har inga öppna punkter för dem. Följ det här i scenen. Regeln *Inget går genom något* (CLAUDE.md) gäller, och varje kontakt kollas med 6 bilder/s.

| Handling i 053 | Vad var svårt förut | Så löstes det, och vad som kopieras |
|---|---|---|
| **Sovrummet, sängen, lagren** | Kudden hamnade bakom sängen (12/11). Radion svävade i luften (13/11). | Importera 026:s `scener/sovrummet/rum.js` som `R`, som 027 gör. `LAGER` bakifrån: platta, bak, figurer, under, nalle, kudde, sov, tacke, sang, framfig, golvsak, korg, natt, himmel, fram, kontur, krita. `BED = {x0 663, x1 1338, rim 772, sida 851, under 984}`, och luften under sängen är y 908–984. Leoparden står framför sängen med `{fram: true}` (lagret `framfig`). Mjuka skuggor på golvet görs med `R.markskugga`. |
| **Leoparden når en kloss** (puff, sträcka sig mot sängen) | Armen flög i luften (027, 14–15/11: *"arm is flying in the air"*). | Ställ leoparden så nära att den raka armen når (027:s `ZKn`), och lägg tassen mot saken med `rack` i `verktyg/rigg-motor.js`. 027:s `langArm` är gjord för zebrans armbilder och kopieras inte. Leoparden ska stå **bredvid** saken, inte över den (027, 14/11: *"mindre överlapp"*). Skalan är som i sovrummet i 040, ca 0,58. |
| **Klossen glider** | – | 027:s `rull(fran, till, u)` med `mjuk`, och sättningen `SATT(u)` (8 px, 0,3 s). Klossen glider på golvet och hoppar aldrig av sig själv. |
| **Upp på korgen och ner framför** | Leksakerna klipptes av för högt i korgen (027, 13/11). | Korgen ritas två gånger, som i 027: hela korgen i `under` och framsidan i `korg`, klippt av `#korgfram`. Klippets kant är en ellipsbåge (`KORG_LAPP`), inte ett rakt streck. Klossen ligger överst på högen, ovanför klippet, och vickar som 037:s `sakImg` (`5·sin(2πl/0,9)·e^(−l/0,6)`). När den glider ner byter den till `golvsak` framför korgen. Den ligger aldrig kvar i korggruppen, så den kan inte gå genom korgens sida. |
| **Ner i hålet** | Ingen förlaga, det här är ny kod. | Samma knep som 027:s `#korgfram` och 037:s `#extraklipp`: klossen ritas i en `clipPath` (`userSpaceOnUse`) som bara visar det som är ovanför lockets framkant och inne i hålets form. Klossen står still 0,4 s över hålet och sjunker sedan rakt ner (0,5 s). Fel hål betyder att klossen ligger **på** locket och vickar, utan klipp. |
| **Trekanten i tassen och som hatt** | Hatten skulle sitta som en riktig hatt, ovanför ögonen, lutad 6°, och högre upp (028, 11–12/11). Spaden skulle ligga med tassen över skaftet (050, 22/11 b). | Kopiera 028 (leoparden, hinkhatten): `hattKant()` läser huvudets punkt (511, 295) i riggens `.kropp` med `getScreenCTM()`. Posen `sakPa` i `rigg-motor.js` lyfter saken från handen i en hög båge in över huvudet, aldrig framför kroppen. Hatten följer huvudet. Saken i handen görs med `sakBild`/`sakIn`/`sakRita` (`grepp`, `folj: 0`), och handpunkten läses som i 050:s `handen()`/`scenPunkt()`. |
| **In under sängen med ett hörn synligt, skimmer, ut igen** | Ingen förlaga har ett nedhängande täcke som döljer något: 026:s täcke slutar vid sängsidan. | Gömstället görs som bollen i 027: saken i lagret `under` (bakom sängen), med banan `under: true`, och den byter till `golvsak` när den glider fram. Skimret görs med `R.skimmer(x, y, glans, t, 0,9)`, och närbilden som `KG.UNDER`. För täcket: rita 040:s `tackeSvg` (det hänger lite över framkanten) i ett eget lager **ovanför** `under`, så att trekanten ligger bakom täckets kant och bara ett hörn syns. Det är oprovat, så det kollas först i stillbilder. Trekanten glider samma väg ut som in. |
| **Vinka** | – | `R.vink`, med armen bakom kroppen snett ut. |

**Övrigt:** mät de vita kanterna på varje urklipp (ca 1 % av höjden, `-tunn.png`, skillen `vita-kanter`). Utsnitten tas ur `format/bildutsnitt.md`. Det som leoparden håller syns alltid helt i bild. Varje händelse får sitt reaktionsslag innan nästa klipp.

## Öppet

1. **Korgen eller ingenting?** Idén sa "klossarna får inte plats i lådan". Jag har gjort det till 037:s korg som redan är full, så att problemet syns och ingen extra sak behövs. Alternativ: ingen korg alls, och problemet är bara att klossarna inte har någon plats (svagare bild).
2. **Fel hål en gång** (rad 19): cirkeln stannar på det trekantiga hålet innan den hittar sitt. Det är det enda stället där formerna "prövas". Ta bort raden om det känns för mycket som en lektion.
3. **En andra teckning?** Receptet (sedan 021) låter kritan rita två gånger. Det här manuset har bara lådan, för att hålla det enkelt. Förslag om Sanna vill ha en till: kritan ritar en **liten stjärna** på lådans lock som belöning efter *"Nu är det städat!"* (`stjarna-gul` finns, har kontur). Den löser inget problem, så den är en belöning, inte en andra hjälpsak.
4. **Leopardens röst:** `spinn-gullig` är inte genomlyssnad. Om ordningen inte stämmer med känslorna ovan, byts numren vid grind 4.
5. **Sovrummets vägg:** 027:s platta (blå nr 1) är fortfarande en platshållare i `bakgrunder/sovrummet.md`. Den blå fyrkanten syns mot det vita golvet, men i närbilden mot väggen kan den smälta in; kolla vid grind 2.
6. **Introt:** seriens intro eller 1 s logotyp, som de andra bilderböckerna just nu.
