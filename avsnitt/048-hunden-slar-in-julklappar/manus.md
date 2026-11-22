# Avsnitt 048 – Hunden slår in julklappar (plan)

**Status:** plan 2026-11-21, grind 1 (manus). Julbilderbok enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med hunden, hunden svarar med ljud, svans och öron. Inget är byggt än. Ca 3,5–4 min.

**Julkalenderns lucka 20** (Sanna 2026-11-21): kalenderramen är intro och outro som i lucka 17, så introt *"Djuren hittar på!"* är inte med i luckan. Mapp: `produktion/youtube/shorts/jul/20-hunden-slar-in-julklappar/`.

**Enkel animation.** Hunden viker aldrig papperet själv (raka armar kan inte vika). Sakerna rör sig själva, som glaset i 022 och paketen i 035: sakerna hoppar upp på papperet, papperets flikar glider över i kod, tejpen poppar fram när hunden trycker ner tassen, och ett glittrigt puff gör om det inslagna till ett färdigt paket (`paket-*.png`). Hunden står framifrån, nickar, puffar med nosen, trycker med rak tass och skuttar.

| | |
|---|---|
| **Titel** | Hunden slår in julklappar (avsnitt 48) |
| **Figurer (1)** | **Hunden Hugo** (v2, riggad, samma som 021, 036 och 042) med **tomteluvan** (`rekvisita/tomteluva.md`) lite snett på huvudet |
| **Platser (1)** | **Brasrummet utan matta** (`assets/bakgrunder/brasrummet-tom/brasrummet-utan-matta.jpeg`, Sanna 2026-11-21: "diffent bg", "more clean", "brasrummet"): röd vägg, brasan och strumporna till vänster, kransen, ljust golv. **Julgranen** (`rekvisita/julgran.md`) som urklipp till höger. Inget fönster, ingen snö. Inget platsbyte, inget kritsvep |
| **Saker som finns** | bollen (`boll-rod`), nallen (`nalle`, framifrån), bilen (`bil-rod`, hjulen kan snurra), paketen (`paket-rund`, `paket-hog-rod`, `paket-prickar` utan rosett), rosetten (`rosett`) |
| **Ny sak (1)** | **Julklappspapperet**: ett platt ark rakt uppifrån/framifrån i samma röda som paketen, med ljusa prickar. Kritan ritar det. Görs tillsammans med Sanna (se Öppet) |
| **I kod** | papperets två flikar som viks över, tejpbitarna, glittret, skimret runt rosetten, svansens vift |
| **Musik** | ingen ny musik: julkarolen från 039 (`assets/ljud/musik/jul/karol-up-on-the-housetop-slinga.m4a`) lågt (0,3 × 0,4 som i 042), upp i sista leken |
| **Favoriter** | 🐶 hund · 🎁 paket · 🎄 jul |
| **Kärna** | Snart är det jul. Hunden har tre saker under granen, bollen, nallen och bilen, men inget papper: *"Det syns ju vad det är!"* Kritan ritar julklappspapper: *"Varsågod!"* – *"Tack!"* Hunden leker tittut under papperet, och rosetten fastnar på svansen (barnet kan se det). Tre gånger *"Vik … vik … tejp! Klart!"* Det sista paketet har ingen rosett, och barnet hittar den på svansen. Tre paket under granen, ett till dig. God jul! Hej då! |
| **Barnet övar på** | säga tack · gissa vad kritan ritar · tittut · räkna till tre · hitta rosetten · säga god jul |
| **Leken** | **tittut under papperet** (uppslag 10–11) |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång (`L.ROR.ga`), stannar före repliken |
| Tomteluvan | sitter på huvudets översta del, lite snett, följer huvudet. Vänds aldrig |
| Saker på orden | på *"En boll … en nalle … och en bil!"* gör varje sak ett litet hopp (12 px) och en `boing`-pling. Ingen snurr |
| Puffar med nosen | som 021: hukar lite, nosen fram, saken glider några cm |
| Kritan ritar papperet | konturen i ett drag (4 s), gisspaus 3 s, papperet fylls i inifrån. Kritan ritar **papperet och rosetten** som två saker, rosetten sist, i papperets övre högra hörn |
| Tittut | papperet lyfts och glider i en mjuk båge över hunden (0,8 s), bara öronen och svansen sticker ut, papperet prasslar och guppar lite. På *"Tittut!"* glider det tillbaka till golvet. **Rosetten följer med hunden** och sitter kvar på svansspetsen, följer svansens vift (fäst i svansens vridpunkt). Ingen säger något om det |
| Sak upp på papperet | saken gör en lugn båge (0,7 s) och landar mitt på papperet, `duns`. Bilen rullar dit i stället, hjulen snurrar |
| Vik | vänster flik (papperet i kod, samma bild beskuren) växer från vänsterkanten och täcker saken (`scaleX` 0 → 1 från kanten, 0,5 s), `prassel`. Sedan höger flik likadant |
| Tejp | hunden trycker rak tass ner på mitten (som grävningen i 035: lutar 8°, sjunker 30 px, tassen ner och upp), en tejpbit i kod poppar fram där tassen var, `ritsch` |
| Klart! | glitterpuff (0,4 s), det inslagna tonar över till paketbilden på samma plats, ett litet guppa. Hunden gör ett glatt skutt |
| Rosetten tillbaka | rosetten släpper svansen och seglar i en båge (1,0 s) upp till paketets överkant (rosettens knut på paketets punkt (512, 199)) |
| Paketen under granen | på *"Ett … två … tre!"* glider ett paket i taget in under granen (0,6 s), `duns` |
| Paketet till dig | hunden puffar det runda paketet mot kameran: paketet glider ner i bild och växer lugnt (skala 1 → 1,6) tills det fyller nederkanten |
| Glatt skutt | 20 px upp, tryck ihop före och efter. Inget studs |
| Vickar i takt | lugnt vick vid granen, ett skutt per fras. Ingen snurr |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, 3–4 lugna vink |
| Tittar efter | `rikt ±0,3` och ögonen åt sidan, huvudet vänds inte |

## INTRO

Julkalenderns ram (lucka 20) som i lucka 17.

## KRITAN RITAR (~14 s) – papper

Kritan ritar ett paket (`paket-rund-kontur.json`): konturen i ett lugnt drag (ca 7 s), väntar medan barnet gissar, det riktiga paketet fylls i inifrån. Zoom in i teckningen, in i vardagsrummet. Paketet syns inte i rummet än; det är löftet om vad som ska hända.

## VARDAGSRUMMET (jul)

| # | Bild (en rörelse) | Malin säger | Hunden svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar konturen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Ett paket! | krita-ritar, karolen lågt |
| 1 | Helbild, hunden trippar in vid granen och vinkar. Snön faller utanför fönstret | Hej, hunden! Hej, hej! | små steg, `vov-hej`, svansen viftar |
| 2 | Hunden gör ett glatt skutt, luvans bjällra | Snart är det jul! | `vov-ja`, `bjallror` |
| 3 | Hunden tittar ner mot granens fot. Bollen, nallen och bilen ligger där | Oj! Vad har du där? | frågande `vov-pip` |
| 4 | Halvbild på sakerna, en i taget hoppar på sitt ord | En boll … en nalle … och en bil! | `boing` ×3, `vov-fniss` |
| 5 | Hunden puffar fram sakerna med nosen och tittar mot kameran, svansen viftar | Är det julklappar? | nick, `vov-ja` |
| 6 | Närbild, hunden tittar på sakerna, sedan åt vänster och höger, öronen sjunker | Men … inget papper. Det syns ju vad det är! | `vov-pip` |
| 7 | Hunden tittar upp mot kameran | Hm … vad gör vi nu? | frågande `vov-pip` |
| 8 | Kritan kommer in och ritar på golvet: konturen i ett drag (4 s), gisspaus 3 s, papperet fylls i. Sist en rosett i hörnet | Titta! Kritan ritar något. *(gisspaus 3 s)* Julklappspapper! Och en rosett! Varsågod, hunden. | krita-ritar, `glitter` |
| 9 | Hunden tittar på papperet, öronen reser sig | Ska vi säga tack? *(paus 2,5 s)* Tack! | nick, `vov-ja` |
| 10 | Hunden nosar på papperet. Papperet lyfts och glider över hunden, bara öronen och svansen syns. Rosetten följer med | Oj! Var är hunden? *(paus 3 s)* | `prassel`, `vov-fniss` under papperet |
| 11 | Papperet glider tillbaka. Hunden står där, rosetten sitter nu på svansen | Tittut! Där är du! | `vov-fniss`, `svansvift` |
| 12 | Hunden tittar på bollen | Nu slår vi in bollen! | `vov-ja` |
| 13 | Bollen gör en båge och landar mitt på papperet | Upp på papperet. | `duns` |
| 14 | Halvbild: vänster flik, höger flik, tassen trycker, tejpen poppar, glitter, paketet | Vik … vik … tejp! Klart! | `prassel` ×2, `ritsch`, `glitter` |
| 15 | Det runda paketet guppar. Hunden skuttar | Ett runt paket! | `vov-fniss` |
| 16 | Ett nytt ark ligger på golvet. Nallen hoppar upp på det | Nu nallen! | `duns`, `vov-ja` |
| 17 | Samma som 14 | Vik … vik … tejp! Klart! | `prassel` ×2, `ritsch`, `glitter` |
| 18 | Det höga paketet guppar | Ett högt paket! | `vov-fniss` |
| 19 | Ett nytt ark. Bilen rullar upp på det | Och bilen! Brum, brum … | `vov-ja` |
| 20 | Samma som 14 | Vik … vik … tejp! Klart! | `prassel` ×2, `ritsch`, `glitter` |
| 21 | Paketet står där, utan rosett. Hunden tittar på det, öronen sjunker lite | Oj! Ingen rosett! | `vov-pip` |
| 22 | Hunden tittar åt vänster, sedan åt höger. Svansen viftar med rosetten | Var är rosetten? Hunden vet inte var. | frågande `vov-pip` |
| 23 | Klipp till helbild bakifrån-snett, så att svansen syns tydligt. Efter 3 s skimrar rosetten svagt | Kan du hjälpa hunden? Kan du se var rosetten är? *(paus 5 s)* | tyst, svansen viftar sakta |
| 24 | Närbild på svansen, rosetten skimrar tydligt | Ja, där! På svansen! | `tindra`, `vov-fniss` |
| 25 | Rosetten seglar från svansen upp på paketet | Rosetten på paketet. Klart! | `glitter`, glatt skutt, `vov-ja` |
| 26 | Helbild. Paketen glider in under granen, ett i taget | Ska vi räkna? Ett … två … tre! | `duns` ×3 |
| 27 | Hunden står stolt vid granen, svansen viftar | Tre julklappar! Bra, hunden! | `vov-fniss`, `bjallror` |
| 28 | Hunden puffar det runda paketet mot kameran, det växer i bild | Och den här … är till dig! | `nos`, `glitter` |
| 29 | Samma, hunden tittar fram bakom paketet | God jul! | `vov-ja` |
| 30 | Karolen kommer upp, brasan sprakar. Hunden vickar vid granen | *(efter några takter)* Vad mysigt vid brasan! | karolen, `hopp-mjuk` |
| 31 | Halvbild, hunden vinkar (armen bakom kroppen) | Hej då, hunden! God jul! | `vov-hejda` |
| 32 | Samma, hunden vinkar klart | Hej då! Vi ses snart! | `vov-hejda` |
| 33 | Kritirisen runt hunden och granen | – | karolen tonar ut |

**Shorts:** (1) uppslag 12–20, de tre inslagningarna, ca 50 s. (2) uppslag 8–11, papperet och tittut, ca 30 s. (3) uppslag 21–25, rosetten på svansen.

**Kamera:** bara klipp och lugna zoomar inom rummet. Helbild vid granen, halvbild på papperet för inslagningarna (papperet ligger i samma läge alla tre gånger, så bilden kan återanvändas), närbild på hundens ansikte och på svansen.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/hunden-slar-in-julklappar/` (`01-kritan-ritar` …) med `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Ett paket!
[happy] Hej, hunden! Hej, hej!
[excited] Snart är det jul!
[curious] Oj! Vad har du där?
[delighted] En boll … en nalle … och en bil!
[warmly] Är det julklappar?
[chuckles] Men … inget papper. Det syns ju vad det är!
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[excited] Julklappspapper! Och en rosett! Varsågod, hunden.
[warmly] Ska vi säga tack?
[happy] Tack!
[laughs] Oj! Var är hunden?
[playfully] Tittut! Där är du!
[cheerfully] Nu slår vi in bollen!
[cheerfully] Upp på papperet.
[happy] Vik … vik … tejp! Klart!
[delighted] Ett runt paket!
[cheerfully] Nu nallen!
[happy] Vik … vik … tejp! Klart!
[delighted] Ett högt paket!
[playfully] Och bilen! Brum, brum …
[happy] Vik … vik … tejp! Klart!
[surprised] Oj! Ingen rosett!
[curious] Var är rosetten? Hunden vet inte var.
[warmly] Kan du hjälpa hunden? Kan du se var rosetten är?
[excited] Ja, där! På svansen!
[happy] Rosetten på paketet. Klart!
[cheerfully] Ska vi räkna? Ett … två … tre!
[happy] Tre julklappar! Bra, hunden!
[warmly] Och den här … är till dig!
[happy] God jul!
[happy sigh] Vad mysigt vid brasan!
[happy] Hej då, hunden! God jul!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Hundens röst och ljud

Allt finns i `assets/ljud/effekter/`: `vov-hej`, `vov-ja`, `vov-fniss`, `vov-pip`, `vov-hejda`, `nos`, `svansvift`, `prassel`, `ritsch`, `glitter`, `tindra`, `bjallror`, `boing`, `duns`, `hopp-mjuk`. Inga nya ljud behövs. Kolla att `prassel` låter som papper och inte löv; annars `prassel-tyg` eller ett papperprassel från Openverse.

## Regelkoll

- [x] 1 figur, 1 plats, inget kritsvep
- [x] Inga djurnamn: "hunden", "nallen", "bollen", "bilen"
- [x] Aldrig *"Vad kan det vara?"*. Ritintrot säger *"Hm … vad blir det nu?"*
- [x] *"Ska vi säga tack?"* (2,5 s), inte *"Vad säger man?"*
- [x] *"Varsågod"* och *"Tack!"* en gång
- [x] Samma fras tre gånger: *"Vik … vik … tejp! Klart!"*
- [x] Frågor till barnet med paus: var är hunden (3 s), vad ritar kritan (3 s), var är rosetten (5 s), räkna till tre
- [x] Barnet hjälper till: rosetten på svansen. Den har synts där sedan uppslag 11, så barnet kan ha sett den
- [x] Bilden på orden: sakerna hoppar på sina ord, flikarna på *"vik"*, tejpen på *"tejp"*, paketet på *"Klart!"*, rosetten på *"På svansen!"*
- [x] Inget läskigt. Inga snurrar, inga böjda armar, hunden alltid framifrån
- [x] Ingen ny musik: julkarolen från 039
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt

## Öppet

1. ~~**Julklappspapperet**~~ klart 2026-11-21: tagning 4 vald (Sanna), `rekvisita/julklappspapper.md`, `assets/rekvisita/julklappspapper/cut/julklappspapper.png` med kontur. Ursprunglig plan (ny sak, görs med Sanna): ett platt, rundat rektangulärt ark sett rakt framifrån, rött (`#D9382E`) med ljusa prickar som `paket-rund`, i samma krita och med vit klistermärkeskant. Flow, Nano Banana Pro (0 krediter), `paket-rund.png` och `stjarna-gul-2.jpeg` som stilreferens. Konturen med `verktyg/kontur.py`. Filen `rekvisita/julklappspapper.md`.
2. ~~**Paketen ska matcha papperet.**~~ klart 2026-11-21: `paket-rund` (bollen), `paket-hog-rod` (nallen) och `paket-prickar` (bilen, utan rosett), se `rekvisita/paket.md`. Ursprunglig plan: `paket-rund` är rött med prickar (passar). `paket-hog` är grönt med ränder och `paket` är slätt rött. Förslag: en Flow-edit av `paket-hog` till rött med ljusa prickar, och prickar på `paket` (Flow-edit eller i kod). Eller tre olika papper, ett per sak, om Sanna hellre vill ha färg.
3. **Tejpen:** en liten ljus, halvgenomskinlig rektangel i kod, eller en liten bild. Förslag: kod, den syns bara kort innan glittret.
4. **Rosetten på svansen:** mät svansens spets i Hugos rigg (`hugo-rigg.json`) och sätt rosetten i skala ca 0,08 där. Den ska synas men inte ropa.
5. **Vardagsrummet:** 034:s scen har granen. Kolla att golvet framför granen räcker för papperet i halvbild, annars flytta granen åt sidan i kod.
6. **Avsnittets färg:** julröd som tomteluvan.
7. ~~**Replik 35**~~ ändrad 2026-11-21 (Sanna): *"Titta, det snöar!"* → *"Vad mysigt vid brasan!"* (`[happy sigh]`), brasrummet har inget fönster.
