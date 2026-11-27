# Avsnitt 058 – Pandan leker ute (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-26 (Sanna: *"godkänn alla manus"*), med förslagen under Öppet som de står (ritintrot ritar lekstugan, slutleken mot väggen, stöveln kvar). ⏳ **Grind 2 (saker) väntar på Sanna 2026-11-27:** inga nya saker behövs, allt finns från 021 (se Saker). Pandans tunna kanter är gjorda (`cut-tunn/`, Öppet 4). Nästa efter ja: grind 3, Malins röst (ElevenLabs, kostar krediter). Ingen röst, inga ljud och ingen scen är byggd. Sanna bytte berättelse 2026-11-26: pandan leker ute i stället för att äta gröt (grötmanuset är borttaget), och berättelsen är **021 Hunden leker gjord om med pandan**. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med pandan, pandan svarar med ljud, öron och ansikte. Sikte: ca 3:50 (39 repliker; 021 har 32, 057 har 45 och är 3:57).

**Förlaga:** [021 Hunden leker](../021-hunden-leker/manus.md), läst i sin byggda form (`storyboard/rader.mjs` och `scener/lekplatsen/index.html`), som skiljer sig lite från 021:s manus. Samma plats, samma uppställning, samma saker och samma händelser i samma ordning: kritan ritar en boll, bollen hamnar i hinken, rullar och gömmer sig tre gånger, barnet hittar den bakom rutschkanan, bollen hamnar på lekstugans tak, kritan ritar en stege, pandan klättrar upp steg för steg och puffar ner bollen.

**Ändrat mot 021, för att följa dagens regler (052–057):**

| I 021 | I 058 | Varför |
|---|---|---|
| Ritintrot ritar hunden | Ritintrot ritar **lekstugan** | kritan ritar en sak ur berättelsen, inte figuren (2026-11-25). Se Öppet 1 |
| Malin kommenterar mest | Malin **frågar pandan**, pandan svarar i pausen, Malin reagerar (fem gånger) | mönstret från 052 |
| *"Oj! Nu puffar hunden på bollen!"*, *"Kliv … kliv … kliv!"*, *"Ner med den!"* | repliken säger handlingen och saken: *"Du puffar på bollen med tassen!"*, *"Du klättrar upp på stegen."*, *"Du puffar ner den från taket."* | tydliga repliker (2026-11-25) |
| `[excited]` på sex repliker | `[happy]` | aldrig `[excited]` (2026-11-22) |
| Slutet: *"Kan du kittla hunden på magen?"* (struket redan i 021), sedan ett varv och *"Hopp, hopp!"* | pandan leker själv: **puffar bollen mot lekstugans vägg och får den tillbaka**, två gånger | inga uppmaningar till barnet att göra något med kroppen, och ingen hoppa-med-ramsa |
| Hunden puffar med nosen, svansen viftar, travar | pandan puffar med **tassen** (rak arm), öronen vippar, går med lugna småsteg | pandan har ingen nos att puffa med och en mycket liten svans, och den är långsam |
| Reaktioner ofta i helbild | **reaktionsslag i närbild** efter varje händelse, närbild på saken när den nämns | fler reaktioner och närbilder (2026-11-25) |
| Intro: 1 s logotyp | seriens intro *"Djuren hittar på!"* | som 057 |

| | |
|---|---|
| **Titel** | Pandan leker ute (avsnitt 58). Introt *"Djuren hittar på!"* |
| **Figurer (1)** | **Pandan** (v2, riggad, ✅ referensark klart, [`karaktarer/pandan-pim.md`](../../karaktarer/pandan-pim.md), rigg i `assets/karaktarer/pandan-pim/premium/`) |
| **Platser (1)** | **Lekplatsen** ([`bakgrunder/lekplatsen.md`](../../bakgrunder/lekplatsen.md)), 021:s uppställning: lekstugan till vänster, hinken, stöveln, rutschkanekullen till höger. Inget platsbyte, inget kritsvep |
| **Saker som finns** | allt: bollen, hinken, stöveln, lekstugan, kullen med rutschkanan och stegen (`assets/bakgrunder/lekplatsen-saker/`). Kritan ritar bollen och stegen |
| **Nya saker** | **inga** |
| **I kod** | skimret runt bollen, bollens skugga, små dammtussar när den landar |
| **Musik** | ingen ny musik. `lekplatsljud` lågt under |
| **Kärna** | Kritan ritar en lekstuga. Pandan kommer ut och vill leka men har inget att leka med. Kritan ritar en boll: *"Varsågod!"* – *"Tack, kritan!"* Pandan puffar på bollen, och den hoppar ner i hinken. Sedan rullar bollen och gömmer sig tre gånger: bakom stöveln, bakom lekstugan, och den tredje gången vet pandan inte var. Barnet hittar den bakom rutschkanan. Pandan studsar bollen på huvudet, och den hamnar på lekstugans tak. Kritan ritar en stege. Pandan klättrar upp, kliv för kliv, och puffar ner bollen. En sista lek mot väggen. Hej då! |
| **Samtal** | fem gånger: vill du leka ute, ska bollen rulla, når du bollen, var det roligt, plus tacken |
| **Barnet letar** | **bollen bakom rutschkanan** (rad 14). En röd kant sticker fram vid kullens sida |
| **Leken** | bollen i hinken (rad 9), bollen på huvudet (rad 18) och bollen mot väggen (rad 27) |
| **Favoriter** | 🐼 panda · ⚽ boll · 🏠 lekstuga · 🪜 stege |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | riggens gång med lugna småsteg från vänster, stannar mitt på gången före repliken. Ett glatt skutt (20 px, tryck ihop före och efter) och vinkar: armen bakom kroppen, snett ut förbi kanten |
| Tittar sig omkring | `rikt ±0,3`, ögonen följer. Huvudet vänds inte. Lekplatsen är tom på leksaker |
| Lite ledsen | öronen faller 12°, kroppen sjunker lite (`strack −0,04`). Ingen gråt |
| Kritan ritar bollen | kritan in uppifrån, klipp till bollens utsnitt på marken framför pandan. Konturen genom `kritan-ritar.js`: cirkeln i ett drag, sedan de tre svängda ränderna som detaljstreck. Kritan svävar och svajar i gisspausen (3 s), knackar aldrig. Bollen fylls i inifrån, guppar en gång. Kritan flyger ut uppe till höger |
| Kawaii-ögon | när bollen är klar: ögon med glitter, öronen reser sig |
| Puffar bollen | pandan hukar lite och lutar sig mot bollen, den raka tassen puffar till (som klossarna i 053). Bollen far upp i en liten båge, landar framför pandan och studsar två gånger. Blicken följer bollen, öronen vippar |
| Pratar med bollen | pandan säger ett ljud, bollen guppar (`boing`), pandan igen, bollen igen. En sak rör sig i taget |
| Bollen i hinken | en puff till, bollen gör en båge **över hinkens kant** och landar i öppningen. Övre halvan syns ovanför kanten (`HINK_KANT`), aldrig genom hinkens sida |
| Bollen rullar | bollen rullar längs marken (den har ränder, så den snurrar kring sin mitt: rotation = sträcka / radie) och stannar bakom saken **på ordet "där"**. Pandan går dit efter repliken |
| Gömd boll | bakom stöveln: en röd skiva bredvid skaftet. Bakom lekstugan: en röd bit **vid sidan av väggen, vid hörnet, aldrig under huset** (klipps vid husets golvlinje, som i 021). Bakom kullen: bollen ligger högre än kullens nederkant, så att den inte tittar fram under den |
| Förvånad | bollen är borta: stora ögon, liten rund mun, öronen upp, 0,3 s stillhet. Sedan tittar pandan åt vänster och åt höger |
| Skimret | svagt efter 3 s av frågans paus, tydligt på *"Ja, där!"* |
| Bollen på huvudet | pandan puffar upp bollen och den studsar två gånger på hjässan mellan öronen (pandan trycks ihop lite vid varje landning, ögonen tittar upp). Den tredje studsen skickar bollen i en hög båge upp på lekstugans tak |
| På taket | bollen landar i takets topp, studsar lite, vickar och ligger still |
| Når inte | pandan går till lekstugan, tittar upp, sträcker den raka armen uppåt och gör ett skutt. Det räcker inte. Öronen sjunker |
| Kritan ritar stegen | vid lekstugans vägg: de två skenorna, sedan de fyra pinnarna som egna drag (3,5 s). Konturen står kvar 0,8–1 s, sedan fylls den riktiga stegen i med gnistor. Stegen står mot väggen, inte i den |
| Klättrar | pandan kliver fram **framför** stegen och skuttar uppför pinnarna, ett lugnt skutt per *"kliv"* (tryck och landning, ingen gripning, inga böjda armar). Ordens tider mäts i tagningen (`KLIV`) |
| Puffar ner bollen | uppe: pandan puffar bollen med huvudet. Den rullar nerför takfallet, faller ner, studsar två gånger och rullar ut på marken |
| Ner igen | tre skutt ner för pinnarna, mjuk landning, ett glatt skutt på *"Hopp!"* |
| Bollen mot väggen | pandan puffar bollen med tassen, den rullar till lekstugans vägg, studsar mjukt mot den (stannar vid väggen, går inte in i den) och rullar tillbaka till tassen. Två gånger. Öronen vippar |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, 3–4 lugna vink, bollen bredvid |

Pandan snurrar aldrig, vänds inte och rullar inte runt, och springer inte: den går. Allt går lite långsammare än hundens, och längden tas igen i reaktionerna.

## INTRO (*Djuren hittar på!*, 3,3 s)

Seriens standardintro (`produktion/youtube/bilderbok-intro/`), sedan tomt papper och standardritintrot.

## KRITAN RITAR (~12 s) – papper

Kritan ritar **lekstugan**, inte pandan. Konturen ca 2,8 s (`kritan-ritar.js`), mätt ur `lekstuga.png`: husets fyrkant och det spetsiga taket i ett drag, sedan detaljstreck för det runda fönstret och dörren. Konturen står kvar ca 1 s, gisspaus 3 s där kritan svävar, sedan fylls den riktiga lekstugan i inifrån: gul med rött tak. Zoom in i teckningen och in på lekplatsen, där lekstugan står till vänster. Pandan kommer in först i rad 1. Skogsljud under.

## LEKPLATSEN

Utsnitt: **H** helbild, **HB** halvbild, **N** närbild på ansiktet, **D** detalj (bollen, tassen, en sak). Bara hårda klipp mellan stillastående utsnitt. Varje händelse följs av ett reaktionsslag på 0,6–1 s i närbild. Pandans svar varierar: aldrig samma ljud två gånger i rad.

| # | Utsnitt och bild (en rörelse) | Malin säger | Pandan svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar lekstugans kontur, väntar, lekstugan fylls i | Kritan ritar … *(paus)* Hm … vad blir det nu? *(gisspaus 3 s)* Oj! En lekstuga! | `krita-ritar`, `skogsljud`, `glitter` |
| 1 | **H.** Lekplatsen: lekstugan, hinken, stöveln och kullen med rutschkanan. Pandan går in från vänster, stannar, gör ett glatt skutt och vinkar | Hej, pandan! Hej, hej! | `smasteg`, `hopp-mjuk`, pandans hej |
| 2 | **N.** Pandan tittar på oss. **Pausen:** förtjust ljud, öronen upp, en nick | Vill du leka ute, pandan? *(paus: pandan svarar)* Ja, det vill du! | förtjust ljud i pausen |
| 3 | **HB.** Pandan tittar åt vänster, sedan åt höger. Inget att leka med. Tyst 2,5 s | – | frågande ljud |
| 4 | **N.** Öronen faller, kroppen sjunker lite. Paus 1 s mellan replikerna, pandan tittar på oss | Oj då. Pandan har visst inget att leka med. *(paus 1 s)* Hm … vad ska pandan leka med? | trumpet ljud |
| 5 | **H** (kritan kommer in), sedan **D** på marken framför pandan: kritan ritar bollens kontur, gisspaus 3 s | Titta! Kritan ritar något på marken. | `krita-ritar` |
| 6 | **D:** bollen fylls i och guppar en gång. Sedan **N:** kawaii-ögon, öronen reser sig. Kritan flyger ut | En boll! Varsågod, pandan. | `glitter`, förtjust ljud |
| 6b | **HB.** Pandan tittar på bollen, sedan på oss | Ska vi säga tack? *(paus 2,5 s)* | nyfiket ljud sent i pausen |
| 6c | **HB.** Pandan nickar direkt | Tack, kritan! | glatt ljud |
| 7 | **D** på tassen som puffar bollen, sedan **H:** bollen far upp i en liten båge, landar och studsar två gånger. **N:** fnissig, öronen vippar | *(när bollen landat)* Oj! Du puffar på bollen med tassen! | `tass`, `boing`, fniss |
| 8 | **HB.** Utbytet: pandan säger ett ljud, bollen guppar, pandan igen, bollen igen | *(efter utbytet)* Ni pratar visst med varandra. | pandan – `boing` – pandan – `boing` |
| 9 | **H.** Pandan puffar en gång till, bollen gör en båge över kanten och landar i hinken. **N:** förvånad, sedan fnissig | *(när den landat)* Oj! Bollen hoppade ner i hinken! | `tass`, `hink-dunk`, förvånat ljud |
| 10 | **H.** Bollen ligger framför pandan igen (klipp). **N** i pausen: pandan nickar | Ska bollen rulla nu, pandan? *(paus: pandan svarar)* Ja, bra idé! | pratar (tre ljud) i pausen |
| 11 | **H.** Bollen rullar åt höger och stannar bakom stöveln på "där". **D** på stöveln: en röd skiva bredvid skaftet. Sedan **H:** pandan går dit | Bollen rullar. Rulla, rulla … där! Bakom stöveln. | `rull`, glatt ljud efter repliken, `smasteg` |
| 12 | **H.** Bollen rullar hela vägen åt vänster och stannar bakom lekstugan på "där". **D** på lekstugans hörn: en röd bit vid sidan av väggen. Pandan går dit | Rulla, rulla … där! Bakom lekstugan. | `rull`, förtjust ljud, `smasteg` |
| 13 | **HB.** Bollen rullar ut ur bild åt höger, ögonen följer den. **N:** förvånad (0,3 s stilla), sedan tittar pandan åt vänster och åt höger. Kullen syns inte i utsnittet | *(efter reaktionen)* Oj, nu är bollen borta. Pandan vet inte var. | `rull`, förvånat ljud, frågande ljud |
| 14 | **N** för frågan. Sedan **H:** hela lekplatsen med alla gömställen, en röd kant sticker fram vid kullens sida. Efter 3 s klipp till **D** på kullen och rutschkanan, bollen skimrar svagt, närbilden glider mycket sakta inåt | Kan du hjälpa pandan? Kan du se var bollen är? *(paus 5 s)* | tyst, `glimt` svagt när skimret börjar |
| 15 | **D:** bollen skimrar tydligt. Sedan **N:** pandan blir jätteglad, öronen upp | Ja, där! Bakom rutschkanan! | `tindra-3`, förtjust ljud |
| 16 | **H.** Pandan har gått fram till kullen. Bollen rullar fram bakom kullen och stannar framför pandan på "där" | Bollen rullar fram. Rulla, rulla … där! | `rull`, fniss |
| 17 | **HB.** Pandan gör två små glada skutt med bollen bredvid, öronen upp | *(efter skutten)* Bollen är tillbaka! Nu är pandan glad. | `hopp-mjuk` ×2, glatt ljud |
| 18 | **H.** Pandan puffar upp bollen, den studsar två gånger på huvudet. **N** (bollen och ansiktet): ögonen tittar upp. Tredje studsen skickar bollen i en hög båge mot lekstugan | *(efter andra studsen)* Du studsar bollen på huvudet. Studs, studs! | `tass`, `landa-mjuk` ×3, `swoosh` |
| 19 | **H.** Bollen landar i takets topp, vickar och ligger still. **N:** förvånad, öronen upp | *(när den ligger still)* Oj! Bollen hamnade på taket! | `landa-mjuk`, `gasp` |
| 20 | **Lekstugans utsnitt** (hela taket syns). Pandan går dit, tittar upp, sträcker armen och skuttar. Når inte. **N:** öronen sjunker | *(efter skuttet)* Når du bollen, pandan? *(paus: pandan svarar)* Nej, taket är för högt. | `smasteg`, `hopp-mjuk`, trumpet ljud i pausen |
| 21 | **Lekstugans utsnitt.** Kritan flyger in och ritar stegen vid väggen: skenorna, pinnarna. Konturen står 1 s | Titta! Kritan ritar igen. Vid lekstugan. | `swoosh`, `krita-ritar` |
| 22 | Stegen fylls i med gnistor. **N:** kawaii-ögon. Kritan flyger ut | En stege! Varsågod, pandan. | `pling`, `glitter`, förtjust ljud |
| 22b | **HB.** Pandan nickar | Tack för stegen, kritan! | glatt ljud |
| 23 | **Lekstugans utsnitt.** Pandan kliver fram framför stegen och skuttar uppför pinnarna, ett skutt per "kliv" | Du klättrar upp på stegen. Kliv … kliv … kliv! | `tass`, `landa-mjuk` ×3 |
| 24 | **D** på taket: pandan puffar bollen med huvudet. **Lekstugans utsnitt:** bollen rullar nerför taket, faller, studsar två gånger och rullar ut | *(efter puffen)* Där är bollen! Du puffar ner den från taket. | `rull`, `landa-mjuk` ×2 |
| 25 | **Lekstugans utsnitt.** Pandan skuttar ner för pinnarna och landar mjukt. Ett glatt skutt på "Hopp!". **N:** jätteglad | *(efter landningen)* Och ner från stegen igen. Hopp! | `landa-mjuk` ×3, `hopp-mjuk`, förtjust ljud |
| 26 | *(leken börjar 2–3 s före repliken)* **H.** Pandan puffar bollen mot lekstugans vägg, den studsar mjukt mot väggen och rullar tillbaka. En gång till på orden. **N:** fnissig | *(efter första varvet)* Du puffar bollen mot väggen. Puff … och tillbaka! | `tass`, `rull`, `duns` lågt, fniss |
| 27 | **N.** Pandan tittar på oss. **Pausen:** mysig suck, nickar | Var det roligt att leka ute? *(paus: pandan svarar)* Ja, det tyckte jag också! | mysig suck i pausen |
| 28 | **HB.** Pandan vinkar, bollen bredvid | Hej då, pandan! Hej då, bollen! | pandans hej då |
| 29 | **N.** Pandan vinkar klart | Hej då! Vi ses snart! | fniss |
| 30 | Kritirisen runt pandan och bollen, sedan prenumerera-kortet (`produktion/youtube/prenumerera/`) och outrot | – | – |

**Malin efter handlingen:** raderna 7, 9, 13, 17, 18, 19, 20, 24, 25 och 26 beskriver en rörelse. Där börjar rörelsen först, och repliken kommer 0,4–0,8 s in eller när det landat. Frågorna kommer före.

**Bilden på orden:** bollen stannar på *"där"* (tiden mäts i varje tagning, som `DAR` i 021), ett skutt per *"kliv"* (`KLIV`), bollen är tillbaka vid tassen på *"tillbaka"*.

**Short:** uppslag 13–17 (bollen är borta, barnet hittar den), ca 40 s. Eller 19–25 (taket och stegen), ca 50 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/pandan-leker-ute/` (`01-kritan-ritar` …), listan står i `rost.txt`. **Spelas inte in förrän manuset är godkänt.**

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En lekstuga!
[happy] Hej, pandan! Hej, hej!
[cheerfully] Vill du leka ute, pandan?
[happy] Ja, det vill du!
[gently] Oj då. Pandan har visst inget att leka med.
[curious] Hm … vad ska pandan leka med?
[happy] Titta! Kritan ritar något på marken.
[happy] En boll! Varsågod, pandan.
[warmly] Ska vi säga tack?
[happy] Tack, kritan!
[surprised] Oj! Du puffar på bollen med tassen!
[giggles] Ni pratar visst med varandra.
[laughs] Oj! Bollen hoppade ner i hinken!
[cheerfully] Ska bollen rulla nu, pandan?
[happy] Ja, bra idé!
[happy] Bollen rullar. Rulla, rulla … där! Bakom stöveln.
[happy] Rulla, rulla … där! Bakom lekstugan.
[curious] Oj, nu är bollen borta. Pandan vet inte var.
[warmly] Kan du hjälpa pandan? Kan du se var bollen är?
[happy] Ja, där! Bakom rutschkanan!
[happy] Bollen rullar fram. Rulla, rulla … där!
[happy] Bollen är tillbaka! Nu är pandan glad.
[playfully] Du studsar bollen på huvudet. Studs, studs!
[surprised] Oj! Bollen hamnade på taket!
[curious] Når du bollen, pandan?
[gently] Nej, taket är för högt.
[happy] Titta! Kritan ritar igen. Vid lekstugan.
[happy] En stege! Varsågod, pandan.
[happy] Tack för stegen, kritan!
[playfully] Du klättrar upp på stegen. Kliv … kliv … kliv!
[happy] Där är bollen! Du puffar ner den från taket.
[cheerfully] Och ner från stegen igen. Hopp!
[playfully] Du puffar bollen mot väggen. Puff … och tillbaka!
[warmly] Var det roligt att leka ute?
[happy] Ja, det tyckte jag också!
[happy] Hej då, pandan! Hej då, bollen!
[warmly] Hej då! Vi ses snart! [giggles]
```

39 repliker.

## Pandans röst och ljuden

**Pandan har ingen ljudfamilj** i `assets/ljud/effekter/` (ingen mapp med panda i namnet, inget i README). Den görs på grind 4 och används sedan i alla pandans avsnitt.

| Nr | Känsla | Rader |
|---|---|---|
| 1 | hej | 1 |
| 2 | förtjust | 2, 6, 12, 15, 22, 25 |
| 3 | kort fniss | 7, 16, 26, 29 |
| 4 | mysig suck | 27 |
| 5 | nyfiken, frågande | 3, 6b, 13 |
| 6 | trumpen | 4, 20 |
| 7 | pratar (tre ljud i rad) | 8, 10 |
| 8 | hej då | 28 |
| 9 | glad (extra) | 6c, 11, 17, 22b |
| 10 | förvånad (extra) | 9, 13 |

Förslag på namn: `panda-gullig` 1–10. Pandaungar piper och gnyr mjukt på riktigt, så prompten blir *"Tiny cute cartoon baby panda cub, <känslan>, a soft squeaky little hum, sweet, close dry recording, no music, no background"*. Inga ord, och hej och hej då ska inte låta engelska. Fniss ligger aldrig på två rader i följd och aldrig över Malin.

**Finns redan** (samma som 021 använde, mät nivån innan de används): `boing` 1–4, `rull-1`, `hink-dunk-1`, `landa-mjuk` 1–8, `hopp-mjuk`, `smasteg`, `tass`, `swoosh`, `gasp`, `duns`, `glimt`, `tindra-3`, `pling`, `glitter`, `krita-ritar`, `skogsljud`, `lekplatsljud`. Hundens ljud (`vov-*`, `nos`, `svansvift`, `flamt-valp`, `trav`) används inte.

## Regelkoll

- [x] 1 figur (pandan), 1 plats (lekplatsen), inget platsbyte, inget kritsvep i berättelsen
- [x] **Inga nya saker och inga nya poser:** allt finns från 021 och riggen
- [x] Inga djurnamn i det som sägs eller i filnamnen: "pandan", "bollen", "kritan". Röstmappen heter `pandan-leker-ute`
- [x] Aldrig *"Vad kan det vara?"* (ritintrot: *"Hm … vad blir det nu?"*). Aldrig *"Vad säger man?"* (*"Ska vi säga tack?"*, paus 2,5 s)
- [x] Varje replik har en v3-tagg, ingen `[excited]` (021 hade sex). Hej då är `[warmly]`
- [x] Ritintrot ritar en sak ur berättelsen (lekstugan), inte pandan. Pandan kommer in i rad 1
- [x] Inga uppmaningar till barnet att göra något med kroppen: kittla och hoppa med är borta. *"Hopp!"* i rad 25 beskriver pandans eget skutt. Barnets del: gissa teckningarna, säga tack, **leta efter bollen**
- [x] Barnet letar efter en sak som är borta: bollen bakom rutschkanan. Paus 5 s, helbild och sedan närbild, skimmer efter 3 s, *"Ja, där!"*
- [x] Den gömda bollen syns bara där den ska: vid sidan av lekstugans vägg, aldrig under huset, och inte under kullen
- [x] Samma fras tre gånger: *"Rulla, rulla … där!"* (rad 11, 12, 16), den tredje med barnets hjälp
- [x] Kritan ritar två gånger i berättelsen: bollen (löser problemet) och stegen (löser nästa)
- [x] *"Varsågod"* och tack, båda gångerna
- [x] Samtal: Malin frågar pandan fem gånger, pandan svarar i pausen, Malin reagerar
- [x] Tydliga repliker: handlingen och saken sägs
- [x] Malin efter handlingen (rad 7, 9, 13, 17, 18, 19, 20, 24, 25, 26)
- [x] Tydligt hej och hej då med vinkning, *"Hej då! Vi ses snart!"*
- [x] Inget läskigt: pandan är lite ledsen i rad 4 och 20, och det löses direkt. Stegen är låg och pandan landar mjukt
- [x] Inget går genom något: bollen går över hinkens kant, stannar mot väggen, rullar på taket; stegen står mot väggen; pandan klättrar framför stegen
- [x] Inga snurrar, inga böjda armar, pandan vänds inte och rullar inte
- [x] Fniss: Malin i rad 8 och 9 (+ giggles sist), pandan i 7, 16, 26, 29. Rad 8 och 9 ligger i följd för Malin, som i 021; säg till om en ska bort
- [x] Ingen ny musik
- [ ] **Längden:** ca 3:50 plus intro, prenumerera-kort och outro går lite över reglernas 3–4 min. Receptet siktar på 3:45–4:15 sedan 2026-11-11
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt. Reglernas "bjud in barnet att hoppa och vinka med" följs inte, enligt Sannas regel 2026-11-25
- [ ] Avsteg mot receptets "tre frågor till barnet": här två (tack 2,5 s, bollen 5 s) plus tre gisspauser (lekstugan, bollen, stegen), som 057

## Saknas innan bygget

| Vad | Läge | När |
|---|---|---|
| **Pandans tunna kanter** | ✅ klart 2026-11-27: `premium/cut-tunn/`, kanten 6,5 px (1 % av kroppen), krämen värmd före med `varm.py`, originalets färger kvar. `uttryck.html` pekar på `cut-tunn/`. Kollat mot mörk bakgrund: `provbild/pim-kant-jamforelse.jpg` | klart |
| **Pandans ljudfamilj** | finns inte. `panda-gullig` 1–10 enligt tabellen ovan (ElevenLabs SFX, kostar krediter: fråga först) | grind 4 |
| **Prov på storleken** | pandan är en stor figur (SKALA 0,5, kroppen 728 riggpixlar) och 021:s mått är hundens: stegens pinnar, höjden där huvudet når bollen i takets topp, hinkens öppning och hur mycket av bollen som syns bakom stöveln. En stillbild av pandan vid stegen och lekstugan behövs innan animatiken | före grind 5 |
| **Konturer** | lekstugans kontur till ritintrot (ny, ur `lekstuga.png` med `verktyg/kontur.py`). Bollens och stegens konturer finns i 021:s scen men ritas där med 021:s egen kritkod: de ska gå genom `verktyg/kritan-ritar.js` (regeln från 052) | grind 5–6 |

Grind 2 (saker) har inget att välja: inga nya bilder behövs.

## Saker: finns och nya

| Sak | Fil | Roll |
|---|---|---|
| Lekplatsen | `bakgrunder/lekplatsen.md`, `assets/bakgrunder/lekplatsen/lekplatsen.png` | platsen |
| Bollen | `assets/bakgrunder/lekplatsen-saker/boll.png` (röd med gula ränder) | kritan ritar den, rad 5–6 |
| Lekstugan | `lekplatsen-saker/lekstuga.png` (1,3× som i 021, taket bär bollen) | ritintrot, gömställe 2, taket |
| Hinken | `lekplatsen-saker/hink.png` | bollen hoppar ner i den |
| Stöveln | `lekplatsen-saker/stovel.png` | gömställe 1 |
| Kullen med rutschkanan | `lekplatsen-saker/kulle.png` | gömställe 3, det barnet hittar |
| Stegen | `lekplatsen-saker/stege.png` (den raka, som 021 använde; `rekvisita/stege.md`) | kritan ritar den, rad 21–22 |

Inga nya saker. I kod: skimret, skuggorna, dammtussarna.

## Öppet

1. **Ritintrot: lekstugan eller bollen?** Förslaget är lekstugan. Ritar kritan bollen i ritintrot blir det samma teckning två gånger, eftersom kritan ritar bollen igen i rad 5 som hjälpsaken. Alternativ: ritintrot ritar hinken eller stöveln.
2. **Nära 021.** Det är samma plats, samma saker och samma händelser, med en annan figur. Lägg inte 021 och 058 efter varandra på kanalen eller i samma mix. Vill du att något byts för att skilja dem åt (till exempel sandlådan i stället för stöveln som första gömställe, eller en annan färg på bollen), säg till nu.
3. **Slutleken** är att pandan puffar bollen mot lekstugans vägg och får den tillbaka (rad 26). Den ersätter kittlingen och hundens varv med *"Hopp, hopp!"*. Alternativ: pandan lägger sig på mage över bollen och gungar lugnt, eller bollen hamnar i hinken en gång till.
4. **Tunna kanter på pandan** (`cut-tunn/`): ✅ godkänt 2026-11-26 och gjort 2026-11-27. pandan har status ✅ Referensark klart. Kanten ändras från 10 px till ca 1 % som på de andra figurerna, inget annat. Okej att göra det före bygget?
5. **Bollen på huvudet** (rad 18) är 021:s sätt att få upp bollen på taket. Pandan har öron på toppen, så bollen studsar mellan dem. Om det ser trångt ut i provbilden puffar pandan upp bollen med tassen i stället.
6. **"Ni pratar visst med varandra"** (rad 8) är kvar från 021. Den är inte en "tydlig replik" i 25/11-meningen, men den är seriens återkommande skämt. Ta bort raden om du vill ha kortare.
7. **Stöveln** står som oanvänd i `bakgrunder/lekplatsen.md` sedan Tittut bytte den mot sandlådan, men 021 använder den. Den är kvar här som i 021.
