# Avsnitt 022 – Kaninen äter frukost (plan)

**Status:** ✅ färdig film, godkänd av Sanna 2026-11-11 ("bunny video great lets publish"): `film/avsnitt-022.mp4`, 2:56, −14 LUFS, med introt *"Djuren hittar på!"*. Live på YouTube 2026-11-11: https://youtu.be/dPtPVL8wsD0. Bilderbok enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`.

**Enkel animation (Sanna 2026-11-11: "eating might also be a bit tough so need to do easier animation").** Kaninen äter **som ett djur**: maten ligger på bordet, kaninen böjer sig ner, *nom*, och biten är borta på *"mums!"*. Ingen sked och ingen hand mot munnen, för armarna når inte dit. Kaninen står **bakom bordet**, som grisen bakom badkaret i 020, så samma uppställning och lager går att återanvända.

| | |
|---|---|
| **Titel** | Kaninen äter frukost (avsnitt 22). Inget titelkort: introt är 1 s logotyp |
| **Figurer (1)** | **Kaninen Kanel** (v2, riggad) |
| **Platser (1)** | **Köket** (ny platta i 16:9, görs en gång och återanvänds i serien). Inget platsbyte |
| **Nya saker** | **bordet** (urklipp i förgrunden). Bananen, smörgåsen och mjölkglaset finns i `rekvisita/` |
| **I kod** | tuggan (en bit av maten klipps bort), mjölkmustaschen, smulor, skimret, klockans visare |
| **Runda 4 (2026-11-11)** | köksklockan och väggskåpet på väggen, pallen och stolen (kaninen klättrar upp), tallriken under smörgåsen, bananen ligger ner. Letleken gäller glaset med mjölk, inte biten |
| **Runda 5 (2026-11-11)** | en slev hänger under väggskåpet, klockans sekundvisare tickar, bananen och tallriken står vid bordets framkant, smörgåsen ligger platt, bananen skalas. Glaset står kvar framme hela tiden, kaninen hittar det bara inte. Glaset lyfter sig själv upp till munnen när kaninen dricker. Tackscenen snabbare ("make tack scene a bit faster"): pausen efter "Ska vi säga tack?" 2,5 s, kaninen nickar på "Tack!", mindre tomrum runt "Varsågod" |
| **Favoriter** | 🐰 kanin · 🍌 banan · 🍽️ äta, dricka · 👅 mun |
| **Kärna** | Kaninen är hungrig och bordet är tomt. Kritan ritar en banan: "Varsågod!" – "Tack!" Kaninen leker tittut bakom bordet, äter frukosten med samma fras tre gånger, och barnet hittar glaset med mjölk som står mitt framför kaninen. Mjölken ger en mustasch. Hej då! |
| **Barnet övar på** | hitta kaninen (tittut) · hitta glaset (det står ju där!) · säga tack |
| **Leken** | **tittut** bakom bordet, bara öronen syns (uppslag 10–11) |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in, ställer sig bakom bordet | riggens gång, kroppen döljs av bordet från magen och ner (som `ikar` i 020) |
| Magen kurrar | kroppen breddas lite två gånger (`bred +0,03`), ögonen tittar ner |
| Tittut | hela figuren sjunker rakt ner bakom bordet tills bara öronen syns (`sjunk`), och rakt upp på *"Tittut!"* |
| Äter | kaninen sjunker 40–60 px och lutar fram mot maten, munnen öppnas, en bit klipps bort ur bilden på *"tugga"*, och resten är borta på *"mums!"*. Kinderna rör sig två gånger |
| Dricker | glaset lyfter sig och glider upp till munnen (ingen hand), lutar sig, mjölken sjunker (en vit yta i kod), glider ner igen, små `slurp` (3–6) |
| Mjölkmustasch | en vit båge över munnen i kod, kommer fram när kaninen reser sig |
| Klappar magen | posen `magen` syns inte bakom bordet, så kaninen blundar nöjt och öronen hänger i stället |
| Öronen | reser sig när maten kommer, vippar när den är glad |

## INTRO (1 s)

Lilla Kritans logotyp i 1 s, sedan direkt till papperet. Ingen jingel, inget titelkort (Sanna 2026-11-11).

## KRITAN RITAR (~16 s) – papper

Kritan ritar kaninen: konturen i lugna drag (7 s), väntar, den riktiga kaninen fylls i. Zoom in i teckningen.

## KÖKET

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01 | Papperet (efter det gemensamma bilderbok-introt, inget kritsvep): kritan ritar kaninen del för del, armarna med | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En kanin! | krita-ritar, skogsljud |
| 1 | Helbild, köket: kaninen trippar in på golvet, kliver upp på pallen (två lugna skutt), skuttar över till stolen bakom bordet och vinkar | Hej, kaninen! Hej, hej! God morgon! | små steg, `tass`, mjuk landning, `hej-babbel` |
| 2 | Halvbild, magen kurrar, kaninen tittar ner | Oj! Det kurrar i magen! | kurr, förvånat babbel |
| 3 | Närbild på bordet: det är tomt. Öronen faller | Oj då. Bordet är visst tomt. *(paus 1 s)* Hm … vad gör vi nu? | litet ledset babbel |
| 4 | Kritan ritar en banan på bordet: konturen (4 s), gisspaus, bananen fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En banan! Varsågod, kaninen. | krita-ritar, glitter |
| 5 | Kaninen tittar på bananen, öronen reser sig | Ska vi säga tack? *(paus 2,5 s)* | nyfiket babbel |
| 6 | Kaninen nickar direkt på "Tack!" | Tack! | `ja-babbel` |
| 7 | Kritan ritar en smörgås | Kritan ritar mer … *(paus 2 s)* En smörgås! | krita-ritar, glitter |
| 8 | Kritan ritar ett glas mjölk och flyger ut | Och ett glas mjölk! | krita-ritar, glitter |
| 9 | Halvbild, kaninen ser all mat, öronen vippar | Oj, så mycket gott! | `ja-babbel`, fniss |
| 10 | Kaninen sjunker ner bakom bordet. Bara öronen sticker upp | Oj! Var är kaninen? *(paus 4 s)* | tyst, ett litet fniss efter 2 s |
| 11 | Kaninen kommer rakt upp | Tittut! | `ja-babbel`, fniss |
| 12 | Halvbild, kaninen framför maten | Ska du äta frukost nu? | `ja-babbel` |
| 13 | Närbild, kaninen böjer sig mot bananen; bananen blir skalad (litet puff) | Först bananen. En tugga … mums! | `nom`, `mums` |
| 14 | Samma med smörgåsen på tallriken | Och smörgåsen. En tugga … mums! | `nom`, `mums` |
| 15 | Halvbild, glaset står kvar på sin plats; kaninen tittar åt vänster, sedan uppåt | Oj, glaset med mjölk! Var tog det vägen? | frågande babbel |
| 16 | Kaninen tittar ner under sig, sedan åt fel håll igen. Efter 3 s skimrar glaset | Kan du hjälpa kaninen? Kan du hitta glaset? *(paus 5 s)* | tyst |
| 17 | Kaninen vänder sig mot glaset och blir jätteglad, glaset skimrar | Ja, där! Där är glaset! | `ja-babbel`, `tindra` |
| 18 | Glaset lyfter sig upp till munnen, en klunk, ner igen | Och mjölken. En klunk … mums! | `slurp`, `mums` |
| 19 | Glaset lyfter sig till munnen igen, kaninen blundar och dricker, mjölken sjunker | Oj! Nu dricker kaninen mjölk! | `slurp` × 3 |
| 20 | Närbild, kaninen reser sig med en vit mustasch | Ha ha! En mjölkmustasch! | fniss |
| 21 | Halvbild, kaninen blundar nöjt, öronen hänger | Mmm … mätt i magen. | `mmm`, mysig suck |
| 22 | Kaninen vinkar (armen bakom kroppen) | Hej då, kaninen! | `hej-babbel` |
| 23 | Samma, kaninen vinkar klart | Hej då! Vi ses snart! | fniss |
| 24 | Kritirisen runt kaninen | – | – |

**Short:** uppslag 12–20 (äta, hitta glaset, mustaschen), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Filerna hamnar i `assets/ljud/roster/kaninen-ater-frukost/`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En kanin!
[happy] Hej, kaninen! Hej, hej! God morgon!
[surprised] Oj! Det kurrar i magen!
[chuckles] Oj då. Bordet är visst tomt.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En banan! Varsågod, kaninen.
[warmly] Ska vi säga tack?
[happy] Tack!
[curious] Kritan ritar mer …
[excited] En smörgås!
[happy] Och ett glas mjölk!
[laughs] Oj, så mycket gott!
[playfully] Oj! Var är kaninen?
[excited] Tittut! [laughs]
[cheerfully] Ska du äta frukost nu?
[happy] Först bananen. En tugga … mums!
[happy] Och smörgåsen. En tugga … mums! [giggles]
[curious] Oj, glaset med mjölk! Var tog det vägen?
[warmly] Kan du hjälpa kaninen? Kan du hitta glaset?
[excited] Ja, där! Där är glaset!
[happy] Och mjölken. En klunk … mums!
[surprised] Oj! Nu dricker kaninen mjölk!
[laughs] Ha ha! En mjölkmustasch!
[happy sigh] Mmm … mätt i magen.
[happy] Hej då, kaninen!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Kaninens röst

`hej-babbel` (8) och `ja-babbel` (9) finns. Lyssna igenom och lägg dem på känslorna i receptets tabell. Saknas troligen: trumpen eller ledsen, mysig suck, hej då. Matljuden finns: `nom`, `mums`, `slurp`, `mmm`. Nytt: ett mjukt magkurr (Openverse först).

## Regelkoll

- [x] 1 figur, 1 plats
- [x] Inga djurnamn: "kaninen"
- [x] Aldrig *"Vad kan det vara?"*
- [x] Fyra frågor till barnet med paus: tack (2,5 s), var är kaninen (4 s), var är glaset (5 s)
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"… mums!"* (två tuggor och en klunk)
- [x] Tydligt hej och hej då, med vinkning
- [x] Inget läskigt
- [ ] **Avsteg från kärnan:** problemet är att kaninen är hungrig och bordet är tomt, inte att den *inte vill*. Kritan ritar tre saker (bananen, smörgåsen, mjölken), en mer än 020
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt

## Öppet

1. **Köket** är en ny platta: en kraftig väggfärg och vitt golv, prompten "Vägg" i `stil/art-direction-v2.md`. Förslag: varm solgul vägg. Sanna väljer färgen, och den blir också avsnittets färg i introt.
2. **Bordet** görs med Sanna (grind 2): sett rakt framifrån, lågt, så att kaninen syns från magen och upp.
3. **Tack-repliken:** *"Ska vi säga tack?"* i stället för *"Vad säger man?"*. Inte vald av Sanna än.
4. **Hej då till saken** saknas, för maten är uppäten. Alternativ: *"Hej då, kaninen! Tack för frukosten!"*
5. **Prov innan manuset låses:** en stillbild av kaninen bakom bordet som böjer sig mot bananen, så att vi ser att "äta som ett djur" ser bra ut.
