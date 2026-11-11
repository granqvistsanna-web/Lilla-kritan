# Lilla Kritans julkalender 2026 – plan

24 stående Shorts (1080×1920, ca 20–30 s, klippluckorna upp till 40 s), en per dag 1–24 december. Varje lucka har ett eget jultema. De flesta luckor är ett djur som gör en julsak eller leker i snön; tre är klipp ur avsnitt vi redan har. På julafton kommer också [hela julkalendern](#5-hela-julkalendern) som en lång video. Planen är skriven 2026-11-11 och är ett förslag: inget är byggt utöver piloterna för lucka 1 och 2, och det som står under [Beslut för Sanna](#4-beslut-för-sanna) är inte bestämt.

Det som redan finns och som planen bygger på:

| Vad | Var |
|---|---|
| Ramen: kalendern med 24 luckor, kaninen pekar, *"Idag öppnar vi lucka två!"*, in i luckan, och ut igen med *"Vi ses i morgon!"* | `produktion/youtube/shorts/jul/lucka.js` |
| Djurluckornas motor: ett djur i snön, en lista med bitar (`[sekunder, rörelse, { sag, ljud }]`). Rörelser i dag: `stilla`, `vinka`, `hoppa`, `klappa`, `dansa`, `nicka`, och för tittut `borta` och `glant` | `produktion/youtube/shorts/jul/djur.js` |
| Pilot lucka 1, gissa teckningen: stjärnan | `produktion/youtube/shorts/jul/01-stjarna/` |
| Pilot lucka 2, lammet leker tittut med luckan | `produktion/youtube/shorts/jul/02-lammet-tittut/` |
| Musiken under alla luckor | `assets/ljud/musik/gissa-bad.m4a` |

---

## 1. Receptet: ett djur gör en julsak

En lucka är **ett djur, en sak och en handling som görs tre gånger**. Allt annat är likadant varje dag. Ramen tar ca 6 s (3,7 s in, 2,4 s ut), så innehållet bakom luckan får vara 15–22 s.

### Bitarna bakom luckan (ca 20 s)

| # | Bit | Tid | Bild (en rörelse) | Malin | Ljud |
|---|---|---|---|---|---|
| 1 | Hej | 2,8 s | Luckan öppnas. Djuret står i snön och vinkar | *"Hej hunden!"* 0,6 s in | djurets hej-läte efter repliken |
| 2 | Saken | 2,5 s | Dagens sak poppar fram. Djuret tittar på den | sakens namn, när saken har landat: *"En bjällra!"* | `pop` eller `pling` |
| 3 | Handlingen, tre gånger | 6–8 s | Samma rörelse tre gånger, med samma ljud varje gång | en replik (se nedan) | ett ljud per gång |
| 4 | Barnets tur | 1,5 s + 4 s paus | Malin frågar. I pausen gör djuret rörelsen igen, två gånger | *"Kan du också skaka?"* | djurets läte en gång |
| 5 | Hej då | 2,4 s | Djuret vinkar. Luckan stängs | *"Hej då hunden!"*, sedan ramens *"Vi ses i morgon!"* | hej då-lätet |

Handlingen sägs på ett av två sätt, så att tredje gången alltid får vara tyst eller kort:

- **Beskriv, en gång till, bara ljudet:** *"Grisen åker pulka. Wiii!"* – *"En gång till!"* – tredje gången hörs bara djuret.
- **Tre ord i en replik:** *"Mums … mums … mums!"*, *"En boll. En boll till. Och en till!"*. Rörelserna läggs på ordens tider (mätta med whisper, som `BORTA` i 020).

Regler som gäller varje bit:

- Rörelsen börjar först. Malin kommer 0,4–0,8 s in i den, eller när den har landat. Frågan i bit 4 kommer före rörelsen.
- Det som sägs syns just då: flingan sitter på nosen på *"En snöflinga!"*, lågan tänds på *"två"*.
- En sak rör sig i taget. Inga snurrar, ingen spegling, lugna hopp. Djuret svarar bara med läten.
- Fötterna står på y 1400. Inget viktigt under 75 % av höjden.

### Likadant varje dag

- Ramen (`lucka.js`): kalendern, kaninen som pekar, repliken med dagens nummer, vägen in och ut, *"Vi ses i morgon!"*.
- Platsen: snön i kod (`djur.js`), på dagen eller på kvällen. Inga andra platser.
- Musiken: `gissa-bad.m4a`, lågt under rösten.
- Bitarnas ordning och längd, hej och hej då, pausen på 4 s.
- Djurets läten: samma ljudfamilj som i bilderböckerna och Tittut.
- Rendering och kontroll: `node avsnitt/004-bussen-badar/scener/render.mjs <mapp> --staende`, stillbilder först, `ffprobe` (1080×1920, 30 fps, ljud, 20–30 s) och ett kontaktark.

### Det en lucka behöver

| | Antal | Varifrån |
|---|---|---|
| Figur | 1, med v2-rigg | ett av sex djur (se nedan) |
| Sak | högst 1 | ritad i kod som kritteckning med vit kant (samma streck som i lucka 1), eller en sak som redan finns |
| Malins repliker | 3–5 nya, plus hej och hej då som finns | röstlistan i avsnitt 3 |
| Ljud | 1–2 | finns nästan alltid redan |
| Mapp | `produktion/youtube/shorts/jul/NN-djur-sak/` | t.ex. `03-hunden-snoflingor/` |

När motorn kan visa en sak och har de sex nya rörelserna (se sist i det här avsnittet) är en lucka en lista på 6–8 bitar. Det bör ta ungefär en timme: skriva bitarna, titta på stillbilderna, förhandsvisa, rendera, kontrollera.

### Varianterna: samma recept, en bit ändrad

| | Variant | Det som ändras | Dagar |
|---|---|---|---|
| **A** | **Gör en julsak** | grundreceptet | 6, 7, 10, 12, 13, 16, 20, 23 |
| **B** | **Leker i snön** | bit 2 och 3: saken är snön själv, och handlingen görs med hela kroppen (hoppar, åker, går, glider) | 3, 5, 8, 14, 18 |
| **C** | **Dansar** | bit 3 och 4 blir 10–12 s dans. Saken är ett stort klistermärke bredvid djuret som gungar i takt. Malin säger bara sakens namn, *"Nu dansar vi!"* och *"Dansa du också!"* | 4, 17 |
| **D** | **Tittut med luckan** | bit 2–4 blir två varv borta – kikar fram – tittut, där luckan är gömstället. Bara repliker som redan finns. Som piloten | 2 |
| **E** | **Gissa teckningen** | inget djur: kritan ritar saken, *"Vad blir det?"*, 4 s paus, svaret, och saken blir levande. Som piloten | 1, 9, 22 |
| **F** | **Ramsa (eller sång)** | bit 2–4 blir julramsan på fyra rader. Djuret gör en rörelse per rad | 11 |
| **G** | **Befintligt klipp** | allt bakom luckan är 15–30 s ur ett avsnitt eller en Short som redan finns, med sitt eget ljud. Inga nya bilder och inga nya repliker. Se Klippluckan nedan | 15, 19, 21 |
| **J** | **Julafton** | tre figurer och sakerna från tidigare luckor | 24 |

Julramsan är vår egen och används i lucka 11. Varje rad är en rörelse som riggen redan kan:

> Klappa, klappa – klapp, klapp, klapp!
> Stampa, stampa – stamp, stamp, stamp!
> Vinka, vinka – hej, hej, hej!
> Snart är det jul för dig och mig!

### Klippluckan: ett klipp vi redan har (variant G)

Bakom luckan spelas 15–30 s ur ett avsnitt eller en Short som redan finns. Inget nytt ritas och inget nytt spelas in, utöver ramens replik med dagens nummer.

- Ramen går in som vanligt (3,7 s), klippet spelas med sitt eget ljud (ingen `gissa-bad.m4a` under) och ramen går ut (2,4 s).
- Klippet börjar och slutar på en hel fras. En sång klipps aldrig inuti: en hel vers eller ingen.
- Stående bild görs som avsnittens Shorts: hela 16:9-bilden i mitten, med en suddig, förstorad kopia ovanför och under (`shorts/gor-shorts.py` i 015 är förlagan). Ingen toning i början och slutet, eftersom luckan sköter det.
- En sjungen vers är längre än receptets 20 s. Klippluckorna blir därför 32–40 s.

Det som finns är genomgånget (33 avsnitt, deras Shorts, Tittut och godnattsagorna) efter vad som faktiskt har med vinter eller jul att göra. Tre klipp passar, två är reserver och resten används inte.

| Klipp | Passar det? | Jultema |
|---|---|---|
| **015 Bä, bä, vita lamm**: lammet fryser om fötterna, strumporna kommer på, andra versen (färdig stående Short, 32,6 s) | ja: ull, kalla fötter, varma strumpor | Varma strumpor, lucka 19 |
| **024 Lammet klär på sig**: mössan på och tittut under mössan (uppslag 7–10, ca 25 s) | ja: röd mössa med tofs, klä på sig för att gå ut | Röda mössan, lucka 15 |
| **016 Blinka lilla stjärna**: hela första versen (33,5 s) | ja: stjärnan på natthimlen. Avsnittet är bara ett grovklipp än | Stjärnhimlen, lucka 21 |
| Godnattsagan med nyckelpigan bland molnen: sidan *"Godnatt, stjärna"* | ja, som reserv för lucka 21. Har text i bild och ett annat tempo | Stjärnhimlen |
| Tittut med lammet vid granen: biten *"Bakom granen"* (från 0:37) | delvis: en gran, men skogen är sommargrön | reserv |
| 007 Bruna sången: *"Brunt är den godaste färgen"* (choklad och kola, 37 s) | svagt: den handlar om färgen brun, inte om julgodis | används inte |
| Färgsångerna (005, 006, 011, 013, 014, 019), buss- och badavsnitten (003, 004, 018, 020), tandborstningen (025, 030–033) och 017, 021–023, 026–029 | nej: sommar, bad, sand och äpplen | används inte |

001, 002, 008–010 och 012 har ingen färdig film. Reservklippen kan bytas in mot en dyrare lucka om tiden tryter, i första hand 14 (Spåren i snön) eller 18 (Isbanan), som båda kräver nya rörelser.

### Djuren

Kaninen är kalenderns värd: den pekar på luckan varje dag och kommer själv in först på julafton. Bakom luckorna turas fem djur om, tre eller fyra luckor var. Alla sex har v2-rigg, en egen ljudfamilj och färdiga hej-repliker (utom grisen och björnen, som får fyra korta nya).

| Djur | Luckor | Läten som finns | Malins hej och hej då |
|---|---|---|---|
| lammet | 2, 7, 13, 24, och klippen i 15 och 19 | `ba`, `ba-fniss`, `ba-gullig` 1–8 | finns: `tittut/lamm-hej`, `lamm-hejda`, `lamm-var` |
| hunden | 3, 8, 16, och klippet i 21 | `vov-babbel`, `vov-pip`, `vov-ja`, `vov-fniss`, `vov-hejda` | finns: `tittut/hund-hej`, `hund-hejda` |
| björnen | 4, 10, 14, 20, 24 | `brum-gullig` 1–8 (hej: `1c`–`1f`) | nya: 29 och 30 i röstlistan |
| grisen | 5, 11, 17, 23 | `noff-gullig` 1–9, `noff-fniss` 1–3 | nya: 27 och 28 i röstlistan |
| leoparden | 6, 12, 18 | `spinn-gullig` 1–8 (hej `1c`–`1f`, hej då `8c`–`8f`), `spinn-fniss`. Inte genomlyssnade av Sanna än | finns: `tittut/leopard-hej`, `leopard-hejda` |
| kaninen | pekar varje dag, 24 | `kanin-gullig`, `kanin-hej-4`, `kanin-hejda-2` | finns: `tittut/kanin-hej`, `kanin-hejda` |

Riggarna ligger i `assets/karaktarer/<mapp>/premium/` (`lammet-ludde`, `hunden-hugo`, `bjornen-bulle`, `grisen-greta`, `leoparden-lova`, `kaninen-kanel`). Mappnamnen är interna och sägs aldrig.

### Det motorn behöver utöver piloterna

Det här är det enda nya bygget. Allt i tabellen i avsnitt 2 klarar sig med det.

| Tillägg | Används i |
|---|---|
| `sak`: en sak per lucka, ritad i kod eller en png, på en av fyra platser: bredvid djuret, ovanför, i handens spets, på huvudet | alla A- och C-luckor |
| `kvall`: nattblå himmel och måne i stället för ljusblå | 6, 13, 20, 24 |
| Kritan som kommer in och tänder eller ritar (gissas krita, liten, utan ansikte) | 6, 20 |
| Sex rörelser: `ga` (riggens gång), `stampa` (posen `stampar`), `magen`, `peka`, `armarUt`, `glid` (djuret och saken glider tillsammans, ut till höger och in från vänster) | 5, 12, 13, 14, 18, 23, ramsan |
| Tre figurer i samma scen, och en annan slutreplik än *"Vi ses i morgon!"* | 24 |
| Klipp bakom luckan: ramen renderas med klippets första bild bakom luckan som öppnas och den sista bakom luckan som stängs, och sätts ihop med klippet i ffmpeg | 15, 19, 21 |
| Ramens ljud utan *"Vi ses i morgon!"*, som val i `lucka.js`, till den långa videon | alla, se avsnitt 5 |

---

## 2. De 24 luckorna

Varje djurlucka börjar med *"Hej <djuret>!"* och slutar med *"Hej då <djuret>!"*. De står inte i tabellen. Undantag: 13 (Lucia, ingen hälsning) och 24. Siffrorna framför replikerna är numren i röstlistan i avsnitt 3. *finns* betyder att repliken redan är inspelad.

| Lucka | Tema | Djur | Det här händer | Variant | Malin säger | Läten och ljud | Sak | Plats |
|---|---|---|---|---|---|---|---|---|
| **1** tis 1 dec | Stjärnan | inget (kritan ritar) | Kritan fyller en gul fläck som får uddar. Paus 4 s. Stjärnan tindrar tre gånger och tonar bort. Piloten | E | finns: *Hmm …*<br>finns: *Vad blir det?*<br>41 `[excited]` En stjärna!<br>42 `[warm]` Stjärnan blinkar. | `glimt`, `glitter` | stjärna, i kod (finns i piloten) | papperet |
| **2** ons 2 dec | Tittut i snön | lammet | Luckan stängs. Lammet kikar fram vid kanten. Luckan öppnas: tittut! Två varv. Piloten | D | bara repliker som finns: *Borta!* · *Var är lammet?* · *Tittut!* · *Borta igen!* · *Tittut! Där är du!* | `ba`, `ba-fniss` | ingen | snön |
| **3** tors 3 dec | Snöflingorna | hunden | Det börjar snöa. Hunden hoppar och fångar en flinga på nosen, tre gånger. I pausen hoppar hunden igen | B | 43 `[excited]` Titta, det snöar!<br>44 `[playfully]` En snöflinga! En till! Och en till!<br>45 `[warm]` Kan du också hoppa? | `vov-babbel`, `vov-pip` på varje flinga, `hopp-mjuk`, `landa-mjuk`, `vov-hejda` | snöflingor, i kod | snön |
| **4** fre 4 dec | Pepparkakan | björnen | Ett pepparkakshjärta poppar fram bredvid björnen och gungar i takt. Björnen dansar: vaggar, klappar, små hopp | C | 46 `[excited]` En pepparkaka!<br>31 `[cheerfully]` Nu dansar vi!<br>32 `[warm]` Dansa du också! | `brum-gullig-1c`, `brum-gullig-3` (fniss), `klapp` i takt | pepparkakshjärta, i kod | snön |
| **5** lör 5 dec | Pulkan | grisen | Grisen sitter i pulkan och åker snett ner över kullen, ut till höger och in igen uppe till vänster. Tre åk | B | 47 `[excited]` En pulka!<br>48 `[playfully]` Grisen åker pulka. Wiii!<br>40 `[happy]` En gång till!<br>49 `[playfully]` Kan du säga wiii? | `noff-gullig-1`, `glid` per åk, `noff-fniss` på tredje åket | pulka, i kod (röd skål, gult snöre). Reserv: ny, görs med Sanna | snön |
| **6** sön 6 dec, andra advent | Adventsljusen | leoparden | Fyra ljus står i snön. Kritan kommer in och tänder två, ett i taget. Leoparden tittar. När vi räknar igen blinkar lågorna till, en i taget | A | 38 `[warm]` Kritan tänder ljusen.<br>50 `[gently]` Ett … två.<br>51 `[happy]` Två ljus! Det är advent.<br>39 `[warm]` Räkna med mig.<br>50 en gång till | `spinn-gullig-1c`, `glimt` per låga, `spinn-gullig-4` (mysig suck) | fyra ljus, i kod | snön på kvällen |
| **7** mån 7 dec | Julkulan | lammet | En röd kula hänger i en grankvist uppe i bild. Lammet puttar med nosen, kulan gungar och plingar. Tre gånger. I pausen vaggar lammet från sida till sida | A | 52 `[excited]` En julkula!<br>53 `[playfully]` Lammet puttar. Den gungar!<br>40 `[happy]` En gång till!<br>54 `[warm]` Kan du gunga som kulan? | `ba`, `ding` per putt, `ba-fniss` | julkula på en kvist, i kod | snön |
| **8** tis 8 dec | Snögubben | hunden | Hunden puttar fram en snöboll, och den hoppar på plats. Tre bollar blir en stapel. Sedan poppar morotsnäsan fram. Hunden vinkar till snögubben | B | 55 `[cheerfully]` Hunden bygger i snön.<br>56 `[playfully]` En boll. En boll till. Och en till!<br>57 `[excited]` En snögubbe!<br>58 `[warm]` Kan du vinka till snögubben? | `puff` per boll, `pop` (näsan), `vov-ja` | snögubbe, i kod (tre bollar, morot, två kolprickar, ingen mun) | snön |
| **9** ons 9 dec | Paketet | inget (kritan ritar) | Kritan ritar en låda, ett band och sist rosetten. Paus 4 s. Paketet skakar två gånger och står kvar när luckan stängs | E | finns: *Hmm …*<br>finns: *Vad blir det?*<br>59 `[excited]` Ett paket!<br>60 `[curious]` Paketet skramlar.<br>61 `[warm]` Vi öppnar det på julafton. | nytt: `skrammel` | paket, i kod (rött med gult band) | papperet |
| **10** tors 10 dec | Varm choklad | björnen | Muggen står i snön och ångar. I pausen blåser ångan bort. Björnen lyfter muggen och dricker tre klunkar | A | 62 `[excited]` Varm choklad!<br>63 `[warm]` Den är varm. Kan du blåsa?<br>64 `[playfully]` Nu dricker björnen.<br>65 `[happy sigh]` Mmm … varmt och gott. | `brum-gullig-1c`, `slurp-3` till `-5` (en per klunk), `brum-gullig-4` | muggen (finns, 025), ångan i kod | snön |
| **11** fre 11 dec | Julramsan | grisen | Grisen gör ramsans rörelser, en rad i taget: klappar tre gånger, stampar tre gånger, vinkar, och hoppar på sista raden | F | 33 `[excited]` Nu gör vi julramsan! Gör med!<br>34–37 ramsan | `tass-klapp-tre`, `steg` × 3, `noff-gullig-2`, `glitter` på sista raden | ingen | snön |
| **12** lör 12 dec | Lussekatten | leoparden | En lussekatt poppar fram. Leoparden tar tre tuggor, och ett bett till syns varje gång. Sedan är den slut. I pausen klappar leoparden sig på magen | A | 66 `[excited]` En lussekatt!<br>67 `[playfully]` Mums … mums … mums!<br>68 `[chuckles]` Oj! Allt är slut.<br>69 `[warm]` Kan du klappa på magen? | `nom` per tugga, `spinn-gullig-4`, `spinn-fniss` | lussekatt, i kod (gult S med två russin) | snön |
| **13** sön 13 dec, Lucia och tredje advent | Lucia | lammet | Kväll. Lammet står med en ljuskrona på huvudet. Ljusen tänds, ett i taget. Lammet går tre små steg. I pausen tassar lammet vidare. Ingen hälsning: luckan öppnas och stängs i stillhet | A | 70 `[softly]` Det är Lucia.<br>71 `[gently]` Lammet har ljus i sin krona.<br>72 `[softly]` Tass … tass … tass.<br>73 `[warm]` Kan du gå på tå, så tyst? | `glimt` per ljus, `tass` per steg, `ba-gullig-4` | ljuskrona, i kod (grön krans, fyra ljus) | snön på kvällen |
| **14** mån 14 dec | Spåren i snön | björnen | Björnen går tre steg och lämnar ett spår för varje steg. Spåren skimrar till. I pausen stampar björnen på stället | B | 74 `[cheerfully]` Björnen går i snön.<br>75 `[playfully]` Tramp … tramp … tramp.<br>76 `[excited]` Titta, spår!<br>77 `[warm]` Kan du också trampa? | nytt: `snoknarr` per steg, `brum-gullig-2` | ingen (spåren i kod, som lerspåren i 020) | snön |
| **15** tis 15 dec | Röda mössan | lammet | **Klipp ur 024 Lammet klär på sig**, uppslag 7–10 (ca 25 s, filmtid ungefär 1:07–1:33, mät i filmen). Mössan glider ner på lammets huvud och sedan över ögonen. *"Var är lammet?"*, paus, *"Tittut!"*. Två varv | G | inga nya, klippets egna: *Mössan på!* · *Oj! Var är lammet?* · *Tittut!* | klippets egna (`ba`, `ba-fniss`, `prassel-tyg`) | mössan (i klippet) | hallen (i klippet) |
| **16** ons 16 dec | Bjällran | hunden | Hunden håller en bjällra i handen och skakar den (vinkningen, med bjällran i handens spets). Tre skak. I pausen skakar hunden igen | A | 78 `[excited]` En bjällra!<br>79 `[playfully]` Skaka, skaka, skaka!<br>80 `[warm]` Kan du också skaka? | nytt: `bjallra` per skak, `vov-fniss` | bjällra, i kod (gul, med röd rosett) | snön |
| **17** tors 17 dec | Polkagrisen | grisen | En polkagris poppar fram bredvid grisen och gungar i takt. Grisen dansar | C | 81 `[excited]` En polkagris!<br>31 Nu dansar vi!<br>32 Dansa du också! | `noff-fniss` (hela, klipps inte), `klapp` i takt | polkagris, i kod (röd- och vitrandig käpp) | snön |
| **18** fre 18 dec | Isbanan | leoparden | En blank isfläck i snön. Leoparden glider över den med armarna ut, ut till höger och in från vänster. Tre åk. I pausen står leoparden still med armarna ut | B | 82 `[cheerfully]` Leoparden åker kana på isen.<br>40 En gång till!<br>83 `[warm]` Kan du hålla ut armarna? | `glid` per åk, `spinn-fniss` på tredje åket | isfläck, i kod | snön |
| **19** lör 19 dec | Varma strumpor | lammet | **Klipp ur 015 Bä, bä, vita lamm**: den färdiga stående Shorten `shorts/02-strumpor-pa.mp4` (32,6 s, avsnittstid 0:46.9–1:19.5). Lammet fryser om fötterna, strumporna kommer på och andra versen sjungs. Kortare alternativ: `shorts/01-ba-ba-vita-lamm.mp4` (22,9 s, första versen) | G | inga nya, klippets egna | klippets egna (sången) | strumporna (i klippet) | i klippet |
| **20** sön 20 dec, fjärde advent | Fyra ljus | björnen | Samma scen som lucka 6. Kritan tänder alla fyra. När vi räknar igen blinkar lågorna till, en i taget | A | 38 Kritan tänder ljusen.<br>84 `[gently]` Ett … två … tre … fyra.<br>85 `[happy]` Fyra ljus! Snart är det jul.<br>39 Räkna med mig.<br>84 en gång till | `brum-gullig-1c`, `glimt` per låga, `brum-gullig-4` | fyra ljus (från lucka 6) | snön på kvällen |
| **21** mån 21 dec, vintersolståndet | Stjärnhimlen | hunden och nyckelpigan | **Klipp ur 016 Blinka lilla stjärna**, hela första versen (sångtid 0:24.0–0:57.5, 33,5 s). Stjärnan tindrar, hunden och nyckelpigan tittar upp från filten och blinkar åt den, och stjärnan tindrar tillbaka. 016 är bara ett grovklipp än, så klippet tas när avsnittet är klart. Reserv: sidan *"Godnatt, stjärna"* ur godnattsagan med nyckelpigan | G | inga, bara sången | klippets egna (`pling`, `glitter`) | stjärnan (i klippet) | nattkullen (i klippet) |
| **22** tis 22 dec | Julgranen | inget (kritan ritar) | Kritan ritar tre gröna taggar uppifrån och ner, och sist stammen. Paus 4 s. Fem ljus tänds i granen, ett i taget, och granen står kvar | E | finns: *Hmm …*<br>finns: *Vad blir det?*<br>86 `[excited]` En gran!<br>87 `[warm]` Granen lyser. | `glimt` per ljus | gran, i kod | papperet |
| **23** ons 23 dec | Vi klär granen | grisen | Granen från lucka 22 står i snön. Tre kulor hoppar upp i den, en i taget. Sist landar stjärnan i toppen. I pausen pekar grisen på stjärnan, som börjar skimra efter 3 s | A | 88 `[cheerfully]` Nu klär vi granen.<br>89 `[playfully]` En kula. En till. Och en till!<br>90 `[excited]` Och stjärnan i toppen!<br>91 `[warm]` Kan du peka på stjärnan? | `ding` per kula, `tindra-3` (stjärnan), `noff-gullig-2` | gran, kulor och stjärna (från lucka 22, 7 och 1) | snön |
| **24** tors 24 dec, julafton | Julafton | kaninen, med lammet och björnen | Kväll. Den klädda granen lyser, de fyra ljusen brinner och paketet från lucka 9 ligger under granen. Kaninen vinkar och hoppar. Paketet skramlar. Paus 4 s. Locket poppar av och nallen tittar upp. Kaninen nickar. Lammet och björnen kommer in med ett hopp var, och alla tre vinkar | J | finns: *Hej kaninen!*<br>92 `[excited]` Idag är det julafton!<br>93 `[curious]` Vad finns i paketet?<br>94 `[excited]` En nalle!<br>95 `[warm]` Tack!<br>96 `[happy]` God jul!<br>ramen slutar med 26 *Vi ses snart!* | `kanin-hej-4`, `skrammel`, `pop`, `kanin-gullig-2`, sedan `ba` och `brum-gullig-1c`, `glitter` | gran, kulor, stjärna, ljus och paket (från tidigare luckor), nallen (finns, 007) | snön på kvällen |

Fördelningen: 8 julsaker, 5 snölekar, 2 danser, 1 tittut, 3 gissa teckningen, 1 ramsa, 3 befintliga klipp och julafton. 13 av 24 luckor är alltså ett djur som gör en julsak eller leker i snön.

Kontroll mot reglerna:

- Inga djurnamn i något som sägs eller i röstfilernas namn. Djuren heter lammet, hunden, björnen, grisen, leoparden och kaninen.
- Frågan i gissa-luckorna är *"Vad blir det?"* (`vad-blir-det-1`, som `gissa.js` redan väljer). Ingen lucka frågar barnet vad man säger: på julafton säger Malin bara *"Tack!"*.
- Ljusen tänds av kritan eller av sig själva, aldrig av ett djur. Lågorna är små och stilla.
- Lucka 24 har tre figurer, vilket är taket i `format/regler.md`. Inga andra luckor har mer än en.
- Avsteg från `format/shorts.md`: djurluckorna har en figur och en hälsning, vilket Gissa teckningen inte har. De följer i stället Tittuts och bilderbokens regler för figurer.
- Klippluckorna (15, 19, 21) visar bara eget material. Sångerna i 015 och 016 är traditionella visor, fria från upphovsrätt, och klipps inte inuti.
- YouTube-texten: *"Julkalender lucka 3: Hunden fångar snöflingor"*. Aldrig figurernas interna namn.

---

## 3. Inköpslistan

### Nya bilder

**Inga nya bilder behövs** om sakerna ritas i kod som kritteckningar, som stjärnan i lucka 1. Fyra saker är reserver: blir kodversionen inte bra görs en bild tillsammans med Sanna (Flow, fyra tagningar, Sanna väljer).

| Reserv | Luckor | Varför den kan behöva en bild |
|---|---|---|
| Pulkan | 5 | djuret sitter i den, och den ska se ut som en sak man kan åka i |
| Granen | 22, 23, 24 | syns i tre luckor och är stor i bild |
| Snögubben | 8 | tre vita bollar mot vit snö kan bli svårlästa |
| Lussekatten | 12 | formen är svårast att få mjuk i kod |

Saker som redan finns och används: muggen (10), nallen (24). Klippluckorna (15, 19, 21) behöver inga saker alls. Platsen är snön i kod, på dagen och på kvällen.

Saker i kod, alla återanvända där det går: stjärna (1, 23, 24), snöflingor (3), pepparkakshjärta (4), pulka (5), ljus (6, 20, 24), julkula (7, 23, 24), snögubbe (8), paket (9, 24), ånga (10), lussekatt (12), ljuskrona (13), fotspår (14), bjällra (16), polkagris (17), isfläck (18), gran (22, 23, 24).

### Malins repliker: en batch

96 korta repliker, i inspelningsordning. Röst och inställningar som i bilderboken: Malin, Eleven v3, stability 0,5, similarity 0,75. Tre tagningar (ram, gemensamma, luckorna), delade med `verktyg/dela-tagning.py` till `assets/ljud/roster/jul/`. Siffrorna i replikerna skrivs med bokstäver så att de läses rätt.

**Tagning 1: ramen** (filnamnen är de som `lucka.js` läser)

| Nr | Fil | Replik |
|---|---|---|
| 1 | `lucka-1` | `[excited]` Idag öppnar vi lucka ett! |
| 2 | `lucka-2` | `[excited]` Idag öppnar vi lucka två! |
| 3 | `lucka-3` | `[excited]` Idag öppnar vi lucka tre! |
| 4 | `lucka-4` | `[excited]` Idag öppnar vi lucka fyra! |
| 5 | `lucka-5` | `[excited]` Idag öppnar vi lucka fem! |
| 6 | `lucka-6` | `[excited]` Idag öppnar vi lucka sex! |
| 7 | `lucka-7` | `[excited]` Idag öppnar vi lucka sju! |
| 8 | `lucka-8` | `[excited]` Idag öppnar vi lucka åtta! |
| 9 | `lucka-9` | `[excited]` Idag öppnar vi lucka nio! |
| 10 | `lucka-10` | `[excited]` Idag öppnar vi lucka tio! |
| 11 | `lucka-11` | `[excited]` Idag öppnar vi lucka elva! |
| 12 | `lucka-12` | `[excited]` Idag öppnar vi lucka tolv! |
| 13 | `lucka-13` | `[excited]` Idag öppnar vi lucka tretton! |
| 14 | `lucka-14` | `[excited]` Idag öppnar vi lucka fjorton! |
| 15 | `lucka-15` | `[excited]` Idag öppnar vi lucka femton! |
| 16 | `lucka-16` | `[excited]` Idag öppnar vi lucka sexton! |
| 17 | `lucka-17` | `[excited]` Idag öppnar vi lucka sjutton! |
| 18 | `lucka-18` | `[excited]` Idag öppnar vi lucka arton! |
| 19 | `lucka-19` | `[excited]` Idag öppnar vi lucka nitton! |
| 20 | `lucka-20` | `[excited]` Idag öppnar vi lucka tjugo! |
| 21 | `lucka-21` | `[excited]` Idag öppnar vi lucka tjugoett! |
| 22 | `lucka-22` | `[excited]` Idag öppnar vi lucka tjugotvå! |
| 23 | `lucka-23` | `[excited]` Idag öppnar vi lucka tjugotre! |
| 24 | `lucka-24` | `[excited]` Idag öppnar vi lucka tjugofyra! |
| 25 | `vi-ses-i-morgon` | `[warm]` Vi ses i morgon! |
| 26 | `vi-ses-snart` | `[warm]` Vi ses snart! |

**Tagning 2: gemensamma** (används i flera luckor)

| Nr | Fil | Replik | Luckor |
|---|---|---|---|
| 27 | `gris-hej` | `[happy]` Hej grisen! | 5, 11, 17, 23 |
| 28 | `gris-hejda` | `[happy]` Hej då grisen! | 5, 11, 17, 23 |
| 29 | `bjorn-hej` | `[happy]` Hej björnen! | 4, 10, 14, 20 |
| 30 | `bjorn-hejda` | `[happy]` Hej då björnen! | 4, 10, 14, 20 |
| 31 | `nu-dansar-vi` | `[cheerfully]` Nu dansar vi! | 4, 17 |
| 32 | `dansa-du-ocksa` | `[warm]` Dansa du också! | 4, 17 |
| 33 | `julramsan-gor-med` | `[excited]` Nu gör vi julramsan! Gör med! | 11 |
| 34 | `ramsa-1-klappa` | `[cheerfully]` Klappa, klappa – klapp, klapp, klapp! | 11 |
| 35 | `ramsa-2-stampa` | `[cheerfully]` Stampa, stampa – stamp, stamp, stamp! | 11 |
| 36 | `ramsa-3-vinka` | `[happy]` Vinka, vinka – hej, hej, hej! | 11 |
| 37 | `ramsa-4-snart-jul` | `[excited]` Snart är det jul för dig och mig! | 11 |
| 38 | `kritan-tander-ljusen` | `[warm]` Kritan tänder ljusen. | 6, 20 |
| 39 | `rakna-med-mig` | `[warm]` Räkna med mig. | 6, 20 |
| 40 | `en-gang-till` | `[happy]` En gång till! | 5, 7, 18 |

**Tagning 3: luckorna** (piloten för lucka 1 läser `svar.m4a` och `saga.m4a` i sin egen mapp: 41 och 42 läggs där också)

| Nr | Fil | Replik |
|---|---|---|
| 41 | `01-en-stjarna` | `[excited]` En stjärna! |
| 42 | `01-stjarnan-blinkar` | `[warm]` Stjärnan blinkar. |
| 43 | `03-det-snoar` | `[excited]` Titta, det snöar! |
| 44 | `03-en-snoflinga` | `[playfully]` En snöflinga! En till! Och en till! |
| 45 | `03-kan-du-hoppa` | `[warm]` Kan du också hoppa? |
| 46 | `04-en-pepparkaka` | `[excited]` En pepparkaka! |
| 47 | `05-en-pulka` | `[excited]` En pulka! |
| 48 | `05-grisen-aker` | `[playfully]` Grisen åker pulka. Wiii! |
| 49 | `05-kan-du-saga-wiii` | `[playfully]` Kan du säga wiii? |
| 50 | `06-ett-tva` | `[gently]` Ett … två. |
| 51 | `06-tva-ljus` | `[happy]` Två ljus! Det är advent. |
| 52 | `07-en-julkula` | `[excited]` En julkula! |
| 53 | `07-den-gungar` | `[playfully]` Lammet puttar. Den gungar! |
| 54 | `07-kan-du-gunga` | `[warm]` Kan du gunga som kulan? |
| 55 | `08-hunden-bygger` | `[cheerfully]` Hunden bygger i snön. |
| 56 | `08-en-boll` | `[playfully]` En boll. En boll till. Och en till! |
| 57 | `08-en-snogubbe` | `[excited]` En snögubbe! |
| 58 | `08-kan-du-vinka` | `[warm]` Kan du vinka till snögubben? |
| 59 | `09-ett-paket` | `[excited]` Ett paket! |
| 60 | `09-paketet-skramlar` | `[curious]` Paketet skramlar. |
| 61 | `09-oppnar-pa-julafton` | `[warm]` Vi öppnar det på julafton. |
| 62 | `10-varm-choklad` | `[excited]` Varm choklad! |
| 63 | `10-kan-du-blasa` | `[warm]` Den är varm. Kan du blåsa? |
| 64 | `10-bjornen-dricker` | `[playfully]` Nu dricker björnen. |
| 65 | `10-varmt-och-gott` | `[happy sigh]` Mmm … varmt och gott. |
| 66 | `12-en-lussekatt` | `[excited]` En lussekatt! |
| 67 | `12-mums` | `[playfully]` Mums … mums … mums! |
| 68 | `12-allt-ar-slut` | `[chuckles]` Oj! Allt är slut. |
| 69 | `12-klappa-magen` | `[warm]` Kan du klappa på magen? |
| 70 | `13-det-ar-lucia` | `[softly]` Det är Lucia. |
| 71 | `13-ljus-i-kronan` | `[gently]` Lammet har ljus i sin krona. |
| 72 | `13-tass` | `[softly]` Tass … tass … tass. |
| 73 | `13-ga-pa-ta` | `[warm]` Kan du gå på tå, så tyst? |
| 74 | `14-bjornen-gar` | `[cheerfully]` Björnen går i snön. |
| 75 | `14-tramp` | `[playfully]` Tramp … tramp … tramp. |
| 76 | `14-titta-spar` | `[excited]` Titta, spår! |
| 77 | `14-kan-du-trampa` | `[warm]` Kan du också trampa? |
| 78 | `16-en-bjallra` | `[excited]` En bjällra! |
| 79 | `16-skaka` | `[playfully]` Skaka, skaka, skaka! |
| 80 | `16-kan-du-skaka` | `[warm]` Kan du också skaka? |
| 81 | `17-en-polkagris` | `[excited]` En polkagris! |
| 82 | `18-aker-kana` | `[cheerfully]` Leoparden åker kana på isen. |
| 83 | `18-armarna-ut` | `[warm]` Kan du hålla ut armarna? |
| 84 | `20-ett-till-fyra` | `[gently]` Ett … två … tre … fyra. |
| 85 | `20-fyra-ljus` | `[happy]` Fyra ljus! Snart är det jul. |
| 86 | `22-en-gran` | `[excited]` En gran! |
| 87 | `22-granen-lyser` | `[warm]` Granen lyser. |
| 88 | `23-vi-klar-granen` | `[cheerfully]` Nu klär vi granen. |
| 89 | `23-en-kula` | `[playfully]` En kula. En till. Och en till! |
| 90 | `23-stjarnan-i-toppen` | `[excited]` Och stjärnan i toppen! |
| 91 | `23-peka-pa-stjarnan` | `[warm]` Kan du peka på stjärnan? |
| 92 | `24-julafton` | `[excited]` Idag är det julafton! |
| 93 | `24-vad-finns-i-paketet` | `[curious]` Vad finns i paketet? |
| 94 | `24-en-nalle` | `[excited]` En nalle! |
| 95 | `24-tack` | `[warm]` Tack! |
| 96 | `24-god-jul` | `[happy]` God jul! |

Repliker som redan finns och återanvänds (lyssna på dem bredvid de nya, så att tonen stämmer): `tittut/lamm-hej`, `lamm-hejda`, `lamm-var`, `hund-hej`, `hund-hejda`, `leopard-hej`, `leopard-hejda`, `kanin-hej`, tittut-seriens *Borta!*, *Borta igen!*, *Tittut!* och *Där är du!*, samt `hmm-N` och `vad-blir-det-1`. Lucka 2 och klippluckorna 15, 19 och 21 behöver inga nya repliker alls.

### Nya ljudeffekter

Tre, alla sökta på Openverse först (CC0 eller CC BY), ElevenLabs bara om inget passar.

| Ljud | Luckor | Sökord |
|---|---|---|
| `bjallra` | 16 | en liten bjällra som skakas en gång, kort |
| `snoknarr` | 14 | ett steg i knarrande snö |
| `skrammel` | 9, 24 | något litet som skramlar i en kartong, mjukt |

Allt annat finns: `glimt`, `glitter`, `tindra-3`, `ding`, `pop`, `puff`, `glid`, `slurp-3` till `-6`, `nom`, `tass`, `steg`, `klapp`, `tass-klapp-tre`, `hopp-mjuk`, `landa-mjuk` och djurens ljudfamiljer.

---

## 4. Beslut för Sanna

**1. Sångerna.** Du vill ha några luckor med en sång om julen, och du har sagt att ingen ny musik ska göras eftersom den kostar för mycket. Tre vägar, den billigaste först:

| | Väg | Kostar | Ger |
|---|---|---|---|
| **A** | En sång vi redan har bakom luckan (variant G): 015 Bä, bä, vita lamm i lucka 19 och 016 Blinka lilla stjärna i lucka 21 | 0 kr, och ingen ny bild | två sjungna luckor. De handlar om varma strumpor och om en stjärna, inte om julen i ord. Luckorna blir 39–40 s |
| **B** | Malin läser julramsan över `gissa-bad.m4a` i lucka 11. Dansluckorna (4 och 17) har samma slinga, lite högre, med klapp i takt | 0 kr | en ramsa som säger ordet jul, men ingen sång |
| **C** | **En** ny julsång på ca 25 s med ramsans text, gjord en gång och använd i fyra luckor: 11 (sången i stället för ramsan), 4 och 17 (som dansmusik) och 24 | **kostar Suno-krediter**, en omgång | en sång om julen i en sjättedel av kalendern |

Rekommendation: **A och B tillsammans**, som planen är skriven. Allt är gratis och ingen lucka väntar på musik. Saknar du en sång som handlar om julen när du har sett lucka 11, går C att lägga till i efterhand utan att bilden ändras, eftersom rörelserna redan följer raderna. Lucka 4 är första dansdagen, så C behöver bestämmas senast 27 november om den ska vara med från början.

**2. Klippluckorna.** Tre luckor är klipp vi redan har: 15 (mössan ur 024), 19 (strumporna ur 015) och 21 (stjärnan ur 016). Det är de klipp som faktiskt passar vintern. Två saker att säga ja eller nej till: att de blir 32–40 s i stället för under 30, och att lucka 21 hänger på att 016 blir klart före 21 december. Rekommendation: **behåll de tre, och ta reserven (godnattsagans stjärnsida) om 016 inte är klart.** Vill du ha fler billiga luckor finns bara reservklippen i avsnitt 1, och de passar sämre.

**3. Sakerna: kritteckningar i kod eller riktiga urklipp?** Planen ritar alla saker i kod, som stjärnan i lucka 1. Det kostar inget, men de får ett annat utseende än de släta djuren. Rekommendation: **kod**, och prova på lucka 4 (pepparkakan) och 5 (pulkan) innan resten byggs. De fyra reserverna (pulkan, granen, snögubben, lussekatten) görs som bilder med dig bara om kodversionen inte håller.

**4. Djuren.** Fem djur bakom luckorna (lammet, hunden, björnen, grisen, leoparden), fyra luckor var, och kaninen som värd som kommer in på julafton. De är valda för att de har rigg, läten och hej-repliker. Rekommendation: **behåll de sex.** Vill du byta leoparden mot kon eller katten behövs en ny ljudfamilj och nya hej-repliker.

**5. Ljusen.** Lucka 6, 13, 20 och 24 har levande ljus. Kritan tänder dem, och djuret tittar bara. Rekommendation: **ja**, advent och Lucia hör till. Säg till om du hellre vill ha lyktor eller ljusslingor.

**6. Julafton.** Tre figurer (kaninen, lammet och björnen), alla saker från tidigare luckor, paketet öppnas och ramen slutar med *"Vi ses snart!"*. Rekommendation: **tre figurer.** Alla sex i bild bryter mot taket på tre och blir trångt i stående format.

**7. Ingen tomte.** En tomte är en ny figur som ska ritas och riggas. Rekommendation: **ingen tomte i år.**

**8. Röstbatchen.** 96 repliker i tre tagningar i ElevenLabs. Det drar tecken på kontot. Rekommendation: **godkänn replikerna i tabellen först, sedan spelas allt in på en gång.** Claude kan göra det i webbläsaren när du har sagt ja.

**9. Bara på svenska.** En engelsk kalender dubblar röstarbetet. Rekommendation: **bara svenska i år.**

**10. Hela julkalendern.** Den långa videon på julafton (avsnitt 5) kan vara liggande, med varje lucka i mitten på en suddig bakgrund, eller stående som Shortsen. Rekommendation: **liggande**, eftersom långa videor mest ses på tv och surfplatta. *"Vi ses i morgon!"* tas bort mellan luckorna.

---

## 5. Hela julkalendern

En lång video på julafton som spelar alla 24 luckor i rad. Den byggs av de färdiga Shortsen: inget nytt ritas och inget nytt spelas in.

| | |
|---|---|
| **Längd** | ca 11 min: 21 luckor på ca 26 s och tre klippluckor på 32–40 s |
| **Bild** | liggande 1920×1080. Varje stående lucka ligger i mitten (608×1080) på en suddig, förstorad och lite mörkare kopia av sig själv: samma grepp som i Shorts-regeln, åt andra hållet |
| **Skarvarna** | varje lucka slutar på kalendern och nästa börjar på kalendern, med en lucka till öppen. Luckorna läggs rakt efter varandra, utan övergång |
| **Ljudet** | *"Vi ses i morgon!"* tas bort i lucka 1–23: ljudet renderas om utan repliken (`render.mjs --bara-ljud`, ingen ny bild). Lucka 24 behåller *"God jul!"* och *"Vi ses snart!"*. Hela filmen mastras i två pass till −14 LUFS, topp högst −1,5 dBTP |
| **Början och slut** | börjar direkt på lucka 1 och slutar på lucka 24. Inget eget intro, inga nya repliker |
| **Kapitel** | 24 kapitel i beskrivningen: `0:00 Lucka 1 – Stjärnan`, `0:27 Lucka 2 – Tittut i snön` … |
| **Miniatyr** | skillen `miniatyrer` (färgstrimman): kalendern med kaninen som hjältebild, tidsbrickan *11 min* |
| **Titel** | *Hela julkalendern 🎄 \| Alla 24 luckor \| lilla kritan* |
| **Publicering** | julafton, samtidigt som lucka 24 eller strax efter. Gjort för barn, i samma spellista som luckorna |

Bygget är ett skript som tar de 24 stående filmerna i ordning, lägger var och en på sin suddiga bakgrund, byter till ljudspåret utan *"Vi ses i morgon!"*, sätter ihop dem och mastrar. Prova det på lucka 1–5 den första veckan i december, så att julafton bara är en körning till.

Kontroll före uppladdning: längden är summan av luckorna, alla 24 nummer hörs i rätt ordning (whisper i bitar), *"Vi ses i morgon!"* hörs aldrig, och ett kontaktark med en bild per lucka visar 24 olika luckor.
