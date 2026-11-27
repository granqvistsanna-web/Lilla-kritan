# Avsnitt 058 – Pandan leker ute (plan)

**Status:** ⏳ **Grind 1 (manus) öppnad igen 2026-11-27, väntar på Sanna.** Sanna ville att avsnittet skulle skilja sig mer från 021 Hunden leker (*"can we have a bit more diffrent than dog episode?"*) och sa ja till omskrivningen (*"Ja, skriv om"*). Den förra versionen, 021 gjord om med pandan, godkändes 2026-11-26 tillsammans med grind 2, och ligger i [`aldre/manus-021-version-2711.md`](aldre/manus-021-version-2711.md). Pandans tunna kanter (`cut-tunn/`) är gjorda och gäller fortfarande. Nästa steg efter ja: grind 2 kollas igen (inga nya bilder, men äpplet och en storleksbild), sedan grind 3, Malins röst. Ingen röst, inga ljud och ingen scen är byggd. Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med pandan, pandan svarar med ljud, öron och ansikte. Sikte: ca 3:50 (39 repliker).

**Förlaga för formen:** [021 Hunden leker](../021-hunden-leker/manus.md) (samma plats, kritan ritar en boll, *"Rulla, rulla … där!"* tre gånger). Men leken, gömställena, problemet och slutet är nya, och lekstugan, stöveln, kullen och stegen är inte med.

**Ändrat mot 021:**

| | 021 Hunden leker | 058 Pandan leker ute |
|---|---|---|
| **Ritintrot** | hunden | **gunganden** (kritan ritar en sak ur berättelsen, 2026-11-25) |
| **Första leken** | bollen hoppar ner i hinken | bollen landar i **gungandens sadel och gungar med** |
| **Gömställe 1** | bakom stöveln | **i sandlådan**, bara toppen syns i sanden |
| **Gömställe 2** | bakom lekstugan | **bakom gunganden** |
| **Barnet hittar** | bakom rutschkanan | **bakom äppelträdet** |
| **Problemet** | bollen på lekstugans tak | bollen **fastnar uppe i äppelträdet** |
| **Kritan ritar igen** | en stege | **en hink** under trädet. Pandan puffar på stammen tre gånger: ingenting, ett äpple, sedan bollen rakt ner i hinken |
| **Pandans egen grej** | – | pandan **smakar på äpplet**: *"Mums! Vad gott!"* |
| **Slutet** | ett varv och *"Hopp, hopp!"* | pandan **sitter på gunganden** och gungar lugnt |
| **Malin** | kommenterar, `[excited]`, *"Ska vi säga tack?"*, *"Ni pratar visst med varandra"* | frågar pandan och reagerar, `[happy]`, säger direkt *"Tack, kritan!"* (2026-11-27), utbytet är tyst |
| **Rörelse** | hunden puffar med nosen, travar | pandan puffar med **tassen** (rak arm), går med lugna småsteg, reaktionsslag i närbild |
| **Intro** | 1 s logotyp | seriens intro *"Djuren hittar på!"* |

| | |
|---|---|
| **Titel** | Pandan leker ute (avsnitt 58). Introt *"Djuren hittar på!"* |
| **Figurer (1)** | **Pandan** (v2, riggad, ✅ referensark klart, [`karaktarer/pandan-pim.md`](../../karaktarer/pandan-pim.md), rigg i `assets/karaktarer/pandan-pim/premium/`, tunna kanter i `cut-tunn/`) |
| **Platser (1)** | **Lekplatsen** ([`bakgrunder/lekplatsen.md`](../../bakgrunder/lekplatsen.md)). Uppställning: **äppelträdet** till vänster, **gunganden** till höger om mitten, **sandlådan** längst till höger. Hinken finns inte från början, kritan ritar den. Inget platsbyte, inget kritsvep |
| **Saker som finns** | bollen, gunganden, sandlådan, äppelträdet, hinken (`assets/bakgrunder/lekplatsen-saker/`) och det röda äpplet ([`rekvisita/applet-rott.md`](../../rekvisita/applet-rott.md), `assets/rekvisita/applet-rott/`). Kritan ritar gunganden (ritintrot), bollen och hinken |
| **Nya saker** | **inga** |
| **I kod** | skimret runt bollen, skuggorna, sandtussar när bollen landar i sandlådan, äppelträdets svaj |
| **Musik** | ingen ny musik. `lekplatsljud` lågt under |
| **Kärna** | Kritan ritar en gungand. Pandan kommer ut och vill leka men har inget att leka med. Kritan ritar en boll: *"Varsågod!"* – *"Tack, kritan!"* Pandan puffar på bollen, och den hoppar upp på gunganden och gungar med. Sedan rullar bollen och gömmer sig tre gånger: i sandlådan, bakom gunganden, och den tredje gången vet pandan inte var. Barnet hittar den bakom äppelträdet. Pandan puffar bollen för högt, och den fastnar i trädet. Kritan ritar en hink. Pandan puffar på stammen: först ingenting, sedan ramlar ett äpple ner, sedan bollen, rakt i hinken. Pandan smakar på äpplet och gungar till sist på gunganden. Hej då! |
| **Samtal** | fem gånger: vill du leka ute, ska bollen rulla, når du bollen, ska du smaka, var det roligt |
| **Barnet letar** | **bollen bakom äppelträdet** (rad 14). En röd kant sticker fram vid stammens sida |
| **Leken** | bollen gungar på gunganden (rad 9), tre puffar på trädet (rad 23–24), pandan gungar (rad 26) |
| **Favoriter** | 🐼 panda · ⚽ boll · 🦆 gungand · 🍎 äpple · 🪣 hink |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | riggens gång med lugna småsteg från vänster, framför äppelträdet, stannar mitt på gången före repliken. Ett glatt skutt (20 px, tryck ihop före och efter) och vinkar: armen bakom kroppen, snett ut förbi kanten |
| Tittar sig omkring | `rikt ±0,3`, ögonen följer. Huvudet vänds inte |
| Lite ledsen | öronen faller 12°, kroppen sjunker lite (`strack −0,04`). Ingen gråt |
| Kritan ritar bollen | kritan in uppifrån, klipp till bollens utsnitt på marken framför pandan. Konturen genom `kritan-ritar.js`: cirkeln i ett drag, sedan de tre svängda ränderna som detaljstreck. Kritan svävar och svajar i gisspausen (3 s), knackar aldrig. Bollen fylls i inifrån, guppar en gång. Kritan flyger ut uppe till höger |
| Kawaii-ögon | när en teckning är klar: ögon med glitter, öronen reser sig |
| Puffar bollen | pandan hukar lite och lutar sig mot bollen, den raka tassen puffar till (som klossarna i 053). Bollen far upp i en liten båge, landar framför pandan och studsar två gånger. Blicken följer bollen, öronen vippar |
| Utbytet | pandan säger ett ljud, bollen guppar (`boing`), pandan igen, bollen igen. En sak rör sig i taget. Malin säger inget |
| Bollen på gunganden | en puff till, bollen gör en båge och landar i gungandens sadel. Gunganden vippar fram och tillbaka på fjädern (en lugn vippning kring fjäderns fot, ±8°, tre gånger som dör ut), bollen följer med. Sedan rullar bollen ner längs anden och tillbaka till pandan |
| Bollen rullar | bollen rullar längs marken (den har ränder, så den snurrar kring sin mitt: rotation = sträcka / radie) och stannar **på ordet "där"**. Pandan går dit efter repliken |
| I sandlådan | bollen studsar **över sandlådans kant**, aldrig genom sidan, och sjunker ner så att bara den övre tredjedelen syns ovanför sanden. Små sandtussar (`sand`). Innan nästa rullning puffar pandan ut den, sand stänker lite |
| Bakom gunganden | en röd bit **vid sidan av anden**, bakom stjärten, aldrig genom fjädern eller under anden |
| Förvånad | bollen är borta: stora ögon, liten rund mun, öronen upp, 0,3 s stillhet. Sedan tittar pandan åt vänster och åt höger |
| Bakom trädet | en röd kant vid stammens sida, nere vid marken. Bollen ligger bakom stammen, inte i den |
| Skimret | svagt efter 3 s av frågans paus, tydligt på *"Ja, där!"* |
| För högt | pandan puffar med tassen uppåt, bollen far i en hög båge upp i trädkronan och fastnar i en klyka bland äpplena: studsar lite, vickar och ligger still. Bollen ligger framför lövverket, inte inne i stammen |
| Når inte | pandan går till trädet, tittar upp, sträcker den raka armen uppåt och gör ett skutt. Det räcker inte. Öronen sjunker |
| Kritan ritar hinken | på marken under kronan, vid stammens sida: hinkens kontur, sedan handtaget och kanten som detaljstreck. Konturen står kvar 0,8–1 s, sedan fylls hinken i med gnistor |
| Puffar på stammen | pandan ställer sig vid stammen och puffar på den med den raka tassen. Trädet svajar lugnt från roten (±2°, dör ut). **Puff 1:** ingenting. **Puff 2:** ett äpple lossnar och ramlar ner, studsar en gång (`apple-studs`) och lägger sig bredvid pandan. **Puff 3:** bollen lossnar och ramlar rakt ner i hinken: övre halvan syns ovanför kanten (`HINK_KANT`), aldrig genom hinkens sida |
| Smakar | pandan står vid äpplet, den raka armen håller äpplet vid handens spets (som tvålen i 020), huvudet lutar sig fram, uttrycket `mums` med små tuggor (`mums`). Inget böjt |
| Sitter på gunganden | pandan står vid gunganden, gör ett lugnt skutt upp och landar i sittposen (`sitter`) i sadeln. Gunganden vippar lugnt fram och tillbaka (`gung-knarr` lågt). Bollen ligger på marken bredvid. **Reserv** om storleksbilden visar att pandan täcker hela anden: pandan sitter på marken bredvid och puffar anden med tassen så att den gungar |
| Vinkar | från gunganden: armen bakom kroppen, snett ut förbi kanten, 3–4 lugna vink |

Pandan snurrar aldrig, vänds inte och rullar inte runt, och springer inte: den går. Allt går lite långsamt, och längden tas igen i reaktionerna.

## INTRO (*Djuren hittar på!*, 3,3 s)

Seriens standardintro (`produktion/youtube/bilderbok-intro/`), sedan tomt papper och standardritintrot.

## KRITAN RITAR (~12 s) – papper

Kritan ritar **gunganden**, inte pandan. Konturen ca 2,8 s (`kritan-ritar.js`), mätt ur `gunganka.png`: andens kropp och huvud i ett drag, sedan detaljstreck för näbben, ögat, vingen och fjädern. Konturen står kvar ca 1 s, gisspaus 3 s där kritan svävar, sedan fylls den riktiga gunganden i inifrån. Zoom in i teckningen och in på lekplatsen, där gunganden står till höger om mitten. Pandan kommer in först i rad 1. Skogsljud under.

## LEKPLATSEN

Utsnitt: **H** helbild, **HB** halvbild, **N** närbild på ansiktet, **D** detalj (bollen, tassen, en sak). Bara hårda klipp mellan stillastående utsnitt. Varje händelse följs av ett reaktionsslag på 0,6–1 s i närbild. Pandans svar varierar: aldrig samma ljud två gånger i rad.

| # | Utsnitt och bild (en rörelse) | Malin säger | Pandan svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar gungandens kontur, väntar, gunganden fylls i | Kritan ritar … *(paus)* Hm … vad blir det nu? *(gisspaus 3 s)* Oj! En gungand! | `krita-ritar`, `skogsljud`, `glitter` |
| 1 | **H.** Lekplatsen: äppelträdet, gunganden och sandlådan. Pandan går in från vänster, stannar, gör ett glatt skutt och vinkar | Hej, pandan! Hej, hej! | `smasteg`, `hopp-mjuk`, pandans hej |
| 2 | **N.** Pandan tittar på oss. **Pausen:** förtjust ljud, öronen upp, en nick | Vill du leka ute, pandan? *(paus: pandan svarar)* Ja, det vill du! | förtjust ljud i pausen |
| 3 | **HB.** Pandan tittar åt vänster, sedan åt höger. Inget att leka med. Tyst 2,5 s | – | frågande ljud |
| 4 | **N.** Öronen faller, kroppen sjunker lite. Paus 1 s mellan replikerna, pandan tittar på oss | Oj då. Pandan har visst inget att leka med. *(paus 1 s)* Hm … vad ska pandan leka med? | trumpet ljud |
| 5 | **H** (kritan kommer in), sedan **D** på marken framför pandan: kritan ritar bollens kontur, gisspaus 3 s | Titta! Kritan ritar något på marken. | `krita-ritar` |
| 6 | **D:** bollen fylls i och guppar en gång. Sedan **N:** kawaii-ögon, öronen reser sig. Kritan flyger ut | En boll! Varsågod, pandan. | `glitter`, förtjust ljud |
| 6c | **HB.** Pandan tittar på bollen och nickar direkt | Tack, kritan! | glatt ljud |
| 7 | **D** på tassen som puffar bollen, sedan **H:** bollen far upp i en liten båge, landar och studsar två gånger. **N:** fnissig, öronen vippar | *(när bollen landat)* Oj! Du puffar på bollen med tassen! | `tass`, `boing`, fniss |
| 8 | **HB.** Utbytet: pandan säger ett ljud, bollen guppar, pandan igen, bollen igen | – *(tyst, Malin säger inget)* | pandan – `boing` – pandan – `boing` |
| 9 | **H.** Pandan puffar en gång till, bollen landar i gungandens sadel och gungar med. **N:** förvånad, sedan fnissig. Bollen rullar ner och tillbaka till pandan | *(när den gungar)* Oj! Bollen gungar på gunganden! | `tass`, `gung-knarr`, förvånat ljud |
| 10 | **H.** Bollen ligger framför pandan (klipp). **N** i pausen: pandan nickar | Ska bollen rulla nu, pandan? *(paus: pandan svarar)* Ja, bra idé! | pratar (tre ljud) i pausen |
| 11 | **H.** Bollen rullar åt höger, studsar över sandlådans kant och stannar i sanden på "där". **D** på sandlådan: bara toppen av bollen syns. Sedan **H:** pandan går dit | Bollen rullar. Rulla, rulla … där! I sandlådan. | `rull`, `sand`, glatt ljud efter repliken, `smasteg` |
| 12 | **H.** Pandan puffar ut bollen ur sanden, den rullar åt vänster och stannar bakom gunganden på "där". **D** på gunganden: en röd bit vid stjärten. Pandan går dit | Rulla, rulla … där! Bakom gunganden. | `sand`, `rull`, förtjust ljud, `smasteg` |
| 13 | **HB.** Bollen rullar ut ur bild åt vänster, ögonen följer den. **N:** förvånad (0,3 s stilla), sedan tittar pandan åt vänster och åt höger. Trädet syns inte i utsnittet | *(efter reaktionen)* Oj, nu är bollen borta. Pandan vet inte var. | `rull`, förvånat ljud, frågande ljud |
| 14 | **N** för frågan. Sedan **H:** hela lekplatsen med alla gömställen, en röd kant sticker fram vid äppelträdets stam. Efter 3 s klipp till **D** på stammen, bollen skimrar svagt, närbilden glider mycket sakta inåt | Kan du hjälpa pandan? Kan du se var bollen är? *(paus 5 s)* | tyst, `glimt` svagt när skimret börjar |
| 15 | **D:** bollen skimrar tydligt. Sedan **N:** pandan blir jätteglad, öronen upp | Ja, där! Bakom trädet! | `tindra-3`, förtjust ljud |
| 16 | **H.** Pandan har gått fram till trädet. Bollen rullar fram bakom stammen och stannar framför pandan på "där" | Bollen rullar fram. Rulla, rulla … där! | `rull`, fniss |
| 17 | **HB.** Pandan gör två små glada skutt med bollen bredvid, öronen upp | *(efter skutten)* Bollen är tillbaka! Nu är pandan glad. | `hopp-mjuk` ×2, glatt ljud |
| 18 | **H.** Pandan puffar bollen uppåt med tassen, bollen far i en hög båge mot trädkronan. **N:** ögonen följer den upp | *(när bollen är i luften)* Oj! Du puffade bollen högt! | `tass`, `swoosh` |
| 19 | **H.** Bollen landar i en klyka bland äpplena, vickar och ligger still. **N:** förvånad, öronen upp | *(när den ligger still)* Oj! Bollen fastnade uppe i trädet! | `prassel-lov`, `vick`, `gasp` |
| 20 | **Trädets utsnitt** (hela kronan syns). Pandan går dit, tittar upp, sträcker armen och skuttar. Når inte. **N:** öronen sjunker | *(efter skuttet)* Når du bollen, pandan? *(paus: pandan svarar)* Nej, trädet är för högt. | `smasteg`, `hopp-mjuk`, trumpet ljud i pausen |
| 21 | **Trädets utsnitt.** Kritan flyger in och ritar hinken på marken under kronan: konturen, handtaget, kanten. Konturen står 1 s | Titta! Kritan ritar igen. Under trädet. | `swoosh`, `krita-ritar` |
| 22 | Hinken fylls i med gnistor. **N:** kawaii-ögon. Kritan flyger ut | En hink! Varsågod, pandan. | `pling`, `glitter`, förtjust ljud |
| 22b | **HB.** Pandan nickar | Tack för hinken, kritan! | glatt ljud |
| 23 | **Trädets utsnitt.** Pandan puffar på stammen: trädet svajar, ingenting. Puff 2: ett äpple ramlar ner, studsar och lägger sig bredvid pandan. **N:** förvånad, sedan fnissig | *(efter första puffen)* Du puffar på trädet med tassen. *(efter äpplet)* Oj! Ett äpple ramlade ner! | `tass`, `prassel-lov`, `apple-studs`, fniss |
| 24 | **Trädets utsnitt.** Puff 3: bollen lossnar och ramlar rakt ner i hinken. **D** på hinken: bollen guppar i öppningen. **N:** jätteglad | *(när den landat)* Och där kommer bollen! Rakt ner i hinken! | `tass`, `prassel-lov`, `hink-dunk`, förtjust ljud |
| 25 | **HB.** Pandan tittar på äpplet. **Pausen:** pandan nickar och håller upp äpplet vid tassen, tar en tugga | Ska du smaka på äpplet, pandan? *(paus: pandan svarar och smakar)* Mums! Vad gott! | glatt ljud, `mums` i pausen |
| 26 | *(gungandet börjar 2–3 s före repliken)* **H.** Bollen ligger bredvid gunganden. Pandan skuttar upp i sadeln och gungar lugnt fram och tillbaka. **N:** mysig | *(efter första gunget)* Nu gungar pandan. Gung … gung … | `hopp-mjuk`, `gung-knarr` lågt, glatt ljud |
| 27 | **N.** Pandan tittar på oss. **Pausen:** mysig suck, nickar | Var det roligt att leka ute? *(paus: pandan svarar)* Ja, det tyckte jag också! | mysig suck i pausen |
| 28 | **HB.** Pandan vinkar från gunganden, bollen bredvid | Hej då, pandan! Hej då, bollen! | pandans hej då |
| 29 | **N.** Pandan vinkar klart | Hej då! Vi ses snart! | fniss |
| 30 | Kritirisen runt pandan på gunganden, sedan prenumerera-kortet (`produktion/youtube/prenumerera/`) och outrot | – | – |

**Malin efter handlingen:** raderna 7, 9, 13, 17, 18, 19, 20, 23, 24 och 26 beskriver en rörelse. Där börjar rörelsen först, och repliken kommer 0,4–0,8 s in eller när det landat. Frågorna kommer före.

**Bilden på orden:** bollen stannar på *"där"* (tiden mäts i varje tagning, `DAR`), äpplet landar före *"Oj! Ett äpple"*, bollen ligger i hinken på *"hinken"*, gunganden vippar på varje *"gung"* (`GUNG`).

**Short:** uppslag 13–17 (bollen är borta, barnet hittar den), ca 40 s. Eller 18–25 (trädet, hinken och äpplet), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/pandan-leker-ute/` (`01-kritan-ritar` …), listan står i `rost.txt`. **Spelas inte in förrän manuset är godkänt.**

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En gungand!
[happy] Hej, pandan! Hej, hej!
[cheerfully] Vill du leka ute, pandan?
[happy] Ja, det vill du!
[gently] Oj då. Pandan har visst inget att leka med.
[curious] Hm … vad ska pandan leka med?
[happy] Titta! Kritan ritar något på marken.
[happy] En boll! Varsågod, pandan.
[happy] Tack, kritan!
[surprised] Oj! Du puffar på bollen med tassen!
[laughs] Oj! Bollen gungar på gunganden!
[cheerfully] Ska bollen rulla nu, pandan?
[happy] Ja, bra idé!
[happy] Bollen rullar. Rulla, rulla … där! I sandlådan.
[happy] Rulla, rulla … där! Bakom gunganden.
[curious] Oj, nu är bollen borta. Pandan vet inte var.
[warmly] Kan du hjälpa pandan? Kan du se var bollen är?
[happy] Ja, där! Bakom trädet!
[happy] Bollen rullar fram. Rulla, rulla … där!
[happy] Bollen är tillbaka! Nu är pandan glad.
[surprised] Oj! Du puffade bollen högt!
[surprised] Oj! Bollen fastnade uppe i trädet!
[curious] Når du bollen, pandan?
[gently] Nej, trädet är för högt.
[happy] Titta! Kritan ritar igen. Under trädet.
[happy] En hink! Varsågod, pandan.
[happy] Tack för hinken, kritan!
[playfully] Du puffar på trädet med tassen.
[surprised] Oj! Ett äpple ramlade ner!
[happy] Och där kommer bollen! Rakt ner i hinken!
[cheerfully] Ska du smaka på äpplet, pandan?
[happy] Mums! Vad gott!
[warmly] Nu gungar pandan. Gung … gung …
[warmly] Var det roligt att leka ute?
[happy] Ja, det tyckte jag också!
[happy] Hej då, pandan! Hej då, bollen!
[warmly] Hej då! Vi ses snart! [giggles]
```

39 repliker.

## Pandans röst och ljuden

**Pandan har ingen ljudfamilj** i `assets/ljud/effekter/`. Den görs på grind 4 och används sedan i alla pandans avsnitt.

| Nr | Känsla | Rader |
|---|---|---|
| 1 | hej | 1 |
| 2 | förtjust | 2, 6, 12, 15, 22, 24 |
| 3 | kort fniss | 7, 16, 23, 29 |
| 4 | mysig suck | 27 |
| 5 | nyfiken, frågande | 3, 13 |
| 6 | trumpen | 4, 20 |
| 7 | pratar (tre ljud i rad) | 8, 10 |
| 8 | hej då | 28 |
| 9 | glad (extra) | 6c, 11, 17, 22b, 25, 26 |
| 10 | förvånad (extra) | 9, 19 |

Förslag på namn: `panda-gullig` 1–10. Prompten: *"Tiny cute cartoon baby panda cub, <känslan>, a soft squeaky little hum, sweet, close dry recording, no music, no background"*. Inga ord, och hej och hej då ska inte låta engelska. Fniss ligger aldrig på två rader i följd och aldrig över Malin.

**Finns redan** (mät nivån innan de används): `boing` 1–4, `rull-1`, `hink-dunk-1`, `sand` 1–4, `gung-knarr-1`, `apple-studs` 1–3, `mums` 1–8, `prassel-lov`, `vick-1`, `landa-mjuk`, `hopp-mjuk`, `smasteg`, `tass`, `swoosh`, `gasp`, `glimt`, `tindra-3`, `pling`, `glitter`, `krita-ritar`, `skogsljud`, `lekplatsljud`.

## Regelkoll

- [x] 1 figur (pandan), 1 plats (lekplatsen), inget platsbyte, inget kritsvep i berättelsen
- [x] **Inga nya saker:** gunganden, sandlådan, äppelträdet, hinken och bollen finns på lekplatsen, äpplet i `rekvisita/applet-rott`. Sittposen finns i riggen (`sitter`)
- [x] Inga djurnamn i det som sägs eller i filnamnen: "pandan", "bollen", "kritan". Röstmappen heter `pandan-leker-ute`
- [x] Aldrig *"Vad kan det vara?"* (ritintrot: *"Hm … vad blir det nu?"*). Ingen tack-fråga: Malin säger direkt *"Tack, kritan!"* (2026-11-27)
- [x] Inget *"Ni pratar visst med varandra"*: utbytet i rad 8 är tyst (2026-11-27)
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då är `[warmly]`
- [x] Ritintrot ritar en sak ur berättelsen (gunganden), inte pandan. Pandan kommer in i rad 1
- [x] Inga uppmaningar till barnet att göra något med kroppen. Barnets del: gissa teckningarna, **leta efter bollen**
- [x] Barnet letar efter en sak som är borta: bollen bakom äppelträdet. Paus 5 s, helbild och sedan närbild, skimmer efter 3 s, *"Ja, där!"*
- [x] Den gömda bollen syns bara där den ska: i sanden innanför sandlådans kant, vid sidan av gunganden, vid sidan av stammen
- [x] Samma fras tre gånger: *"Rulla, rulla … där!"* (rad 11, 12, 16), den tredje med barnets hjälp
- [x] Kritan ritar två gånger i berättelsen: bollen (löser problemet) och hinken (löser nästa)
- [x] *"Varsågod"* och tack, båda gångerna
- [x] Samtal: Malin frågar pandan fem gånger, pandan svarar i pausen, Malin reagerar
- [x] Tydliga repliker: handlingen och saken sägs
- [x] Malin efter handlingen (rad 7, 9, 13, 17, 18, 19, 20, 23, 24, 26)
- [x] Tydligt hej och hej då med vinkning, *"Hej då! Vi ses snart!"*
- [x] Inget läskigt: pandan är lite ledsen i rad 4 och 20, och det löses direkt. Äpplet och bollen ramlar mjukt, inget träffar pandan
- [x] Inget går genom något: bollen går över sandlådans kant och hinkens kant, ligger vid sidan av anden och stammen, ligger framför lövverket; pandan sitter i sadeln
- [x] Inga snurrar, inga böjda armar, pandan vänds inte och rullar inte. Gunganden och trädet vippar lugnt, de snurrar inte
- [x] Fniss: Malin i rad 9 (+ giggles sist), pandan i 7, 16, 23, 29
- [x] Ingen ny musik
- [ ] **Längden:** ca 3:50 plus intro, prenumerera-kort och outro går lite över reglernas 3–4 min. Receptet siktar på 3:45–4:15
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt. Reglernas "bjud in barnet att hoppa och vinka med" följs inte, enligt Sannas regel 2026-11-25
- [ ] Barnet får en fråga med lång paus (bollen, 5 s) plus tre gisspauser (gunganden, bollen, hinken). Tack-frågan är borta enligt regeln 2026-11-27

## Saknas innan bygget

| Vad | Läge | När |
|---|---|---|
| **Pandans tunna kanter** | ✅ klart 2026-11-27: `premium/cut-tunn/`, kanten 6,5 px (1 % av kroppen), krämen värmd före med `varm.py`, originalets färger kvar. `uttryck.html` pekar på `cut-tunn/`. Kollat mot mörk bakgrund: `provbild/pim-kant-jamforelse.jpg` | klart |
| **Storleksbild** | pandan är stor (SKALA 0,5, kroppen 728 riggpixlar). En stillbild av lekplatsen med gunganden, sandlådan och trädet i 021:s skala, pandan bredvid och i sittposen på gunganden, bollen i kronan och hinken under. Avgör om pandan får sitta på anden (annars reserven: sitter bredvid och puffar) och om bollen i kronan syns | grind 2 |
| **Äpplet** | `assets/rekvisita/applet-rott/` (v3 utan ansikte, från 013) ska stämma med äpplena i äppelträdet: färg, storlek och kant. Kollas i storleksbilden. Stämmer det inte: ett av trädets egna äpplen klipps ut | grind 2 |
| **Pandans ljudfamilj** | finns inte. `panda-gullig` 1–10 enligt tabellen ovan (ElevenLabs SFX, kostar krediter: fråga först) | grind 4 |
| **Konturer** | gungandens kontur till ritintrot och hinkens kontur (nya, ur `gunganka.png` och `hink.png` med `verktyg/kontur.py`). Bollens kontur finns i 021:s scen men ska gå genom `verktyg/kritan-ritar.js` (regeln från 052) | grind 5–6 |

## Saker: finns och nya

| Sak | Fil | Roll |
|---|---|---|
| Lekplatsen | `bakgrunder/lekplatsen.md`, `assets/bakgrunder/lekplatsen/lekplatsen.png` | platsen |
| Gunganden | `lekplatsen-saker/gunganka.png` (röd fjäder, visas ca 620 px hög) | ritintrot, bollen gungar, gömställe 2, slutet |
| Sandlådan | `lekplatsen-saker/sandlada.png` | gömställe 1 |
| Äppelträdet | `lekplatsen-saker/appeltrad.png` | barnet hittar bollen, bollen fastnar i kronan |
| Bollen | `lekplatsen-saker/boll.png` (röd med gula ränder) | kritan ritar den, rad 5–6 |
| Hinken | `lekplatsen-saker/hink.png` | kritan ritar den, rad 21–22, bollen landar i den |
| Äpplet | `assets/rekvisita/applet-rott/`, `rekvisita/applet-rott.md` | ramlar ner, pandan smakar |

Inga nya saker. I kod: skimret, skuggorna, sandtussarna, trädets svaj.

## Öppet

1. **Pandan på gunganden** (rad 26–30). Pandan är stor och kan täcka nästan hela anden. Storleksbilden avgör. Reserv: pandan sitter på marken bredvid och puffar anden så att den gungar.
2. **Nära 029 Leoparden plockar äpplen?** Där ramlar äpplen ner och hamnar i en korg. Här ramlar ett äpple och sedan bollen ner i en hink, på lekplatsen. Det är en kort händelse, inte hela berättelsen, men säg till om du vill byta (till exempel att bollen ramlar ner i sandlådan i stället, och kritan ritar något annat).
3. **"Oj! En gungand!"** i ritintrot. Säg till om du hellre vill ha ett annat ord.
4. **Lekstugan, stöveln, kullen och stegen** är inte med. Lägg inte 021 och 058 efter varandra ändå, eftersom bollen och *"Rulla, rulla … där!"* är samma.
