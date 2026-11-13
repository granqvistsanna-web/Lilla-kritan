# Avsnitt 036 – Hunden äter julmat (plan)

**Status (2026-11-13):** ✅ grind 1 (manus) godkänd av Sanna 2026-11-13. Nästa: grind 2, julskinkan. Inget producerat. Julbilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Förlaga: [022 Kaninen äter frukost](../022-kaninen-ater-frukost/manus.md), samma kök, bord och ät-rörelse, men med julmat och julpynt.

| | |
|---|---|
| **Titel** | Hunden äter julmat (avsnitt 36). Introt *"Djuren hittar på!"*, inget titelkort |
| **Figurer (1)** | **Hunden Hugo** (v2, riggad, `assets/karaktarer/hunden-hugo/premium/uttryck.html`) |
| **Platser (1)** | **Köket** (`bakgrunder/koket.md`, från 022), julpyntat. Inget platsbyte |
| **Julpynt i köket** | en **grankvist** med två **julkulor** ovanpå väggskåpet, och **ljusstaken** med fyra **adventsljus** och **lågor** på bordet. Allt finns i `rekvisita/`. Klockan och väggskåpet från 022 är kvar, sleven byts mot grankvisten |
| **Nya saker** | **julskinkan** (grind 2). Pepparkakshjärtat, mjölkglaset, tallriken, bordet, pallen och pyntet finns |
| **I kod** | tuggan (en bit klipps bort), pepparkakssmulor på nosen, tungan som slickar, mjölkmustaschen, skimret, lågornas fladder, klockans visare |
| **Kärna** | Det är julafton och hunden är hungrig, men julbordet är tomt. Kritan ritar en julskinka: "Varsågod!" – "Tack!" Hunden nosar och svansen viftar. Kritan ritar en pepparkaka och ett glas mjölk. *"En tugga … mums!"* skinkan, pepparkakan (smulor på nosen), och barnet hittar mjölken bakom ljusstaken. Mjölkmustasch, god jul, hej då! |
| **Barnet övar på** | säga tack · hitta mjölken (bakom) · säga god jul |
| **Leken** | **sniff, sniff** på skinkan, och **smulor på nosen** som slickas bort |
| **Längd** | ca 3:45 med introt |

## Så rör det sig

Hunden är en stor figur (SKALA 0,5) och står på två ben, så han står **bakom bordet** som kaninen i 022 och syns från magen och upp. Han äter **som ett djur**: maten ligger på bordet, han böjer sig ner, *nom*, och biten är borta på *"mums!"*. Ingen bestick, ingen tass mot munnen.

| Rörelse | Hur |
|---|---|
| Kommer in, ställer sig bakom bordet | riggens gång från vänster, kliver upp på pallen, kroppen döljs av duken från magen och ner |
| Magen kurrar | kroppen breddas lite två gånger (`bred +0,03`), blicken ner |
| Öronen hänger | hängöronen faller 12° när bordet är tomt, upp igen när maten kommer |
| Nosar | nosen sträcks mot skinkan, huvudet lutar fram 20–30 px, två små ryck på *"sniff, sniff"* |
| Svansen viftar | `svansvift` ±14°. **Prov först:** syns svansen vid sidan av kroppen ovanför bordet? Annars viftar öronen i stället |
| Äter | sjunker 40–60 px och lutar sig mot maten, munnen öppnas, en bit klipps bort på *"tugga"*, resten borta på *"mums!"* |
| Smulor på nosen | 5–7 bruna prickar i kod på nosen efter pepparkakan |
| Slickar | tungan (rosa, i kod) kommer ut ur munnen och sveper upp över nosen två gånger, prickarna försvinner på andra *"slick"* |
| Dricker | glaset glider fram bakom ljusstaken, lyfter sig upp till munnen (ingen tass), mjölken sjunker, glider ner (som 022) |
| Mjölkmustasch | en vit båge över munnen i kod när han reser sig |
| Mätt | blundar nöjt (raden ber om det), öronen hänger mjukt |
| Vinkar | armen bakom kroppen, snett upp förbi kanten, högst 50 px lyft, 0,6 s upp |

## INTRO

Det gemensamma introt *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`), sedan direkt till papperet.

## KRITAN RITAR (~16 s) – papper

Kritan ritar hunden: konturen i lugna drag (ca 7 s) med hängöronen och armarna som egna drag, väntar medan barnet gissar, den riktiga hunden fylls i. Zoom in i teckningen till köket.

## KÖKET

| # | Bild (en rörelse) | Malin säger | Hunden svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar hunden del för del | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En hund! | krita-ritar, `glitter` |
| 1 | Helbild, julköket: lågorna fladdrar. Hunden trippar in, kliver upp på pallen, ställer sig bakom bordet och vinkar | Hej, hunden! Hej, hej! God jul! | tassar, `vov-hej` |
| 2 | Närbild på ljusstaken, lågorna fladdrar | Titta, ljusen lyser. Det är jul! | `vov-ja` |
| 3 | Halvbild, magen kurrar, hunden tittar ner | Oj! Det kurrar i magen! | kurr, förvånat `vov-pip` |
| 4 | Närbild på bordet: tomt, bara ljusstaken. Öronen faller | Oj då. Julbordet är visst tomt. *(paus 1 s)* Hm … vad gör vi nu? | litet ledset vov |
| 5 | Kritan ritar en julskinka på tallriken: konturen (4 s), gisspaus, skinkan fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En julskinka! Varsågod, hunden. | krita-ritar, `glitter` |
| 6 | Hunden tittar på skinkan, öronen upp, glittriga ögon | Ska vi säga tack? *(paus 2,5 s)* | nyfiket vov |
| 7 | Hunden nickar direkt | Tack! | `vov-ja` |
| 8 | Hunden sträcker nosen mot skinkan och nosar, svansen viftar | Sniff, sniff! Mmm, vad gott det luktar! | `nos`, `flamt-valp` |
| 9 | Kritan ritar en pepparkaka bredvid tallriken | Kritan ritar igen … *(paus 2 s)* En pepparkaka! | krita-ritar, `glitter` |
| 10 | Kritan ritar ett glas mjölk **bakom ljusstaken** (bara överkanten syns mellan två ljus) och flyger ut | Och ett glas mjölk! | krita-ritar, `glitter` |
| 11 | Halvbild, hunden ser maten, öronen vippar | Oj, så mycket julmat! | `vov-ja`, `vov-fniss` |
| 12 | Halvbild, hunden framför maten | Ska du äta nu? | `vov-ja` |
| 13 | Närbild, hunden böjer sig mot skinkan | Först skinkan. En tugga … mums! | `nom`, `mums` |
| 14 | Samma med pepparkakan, *krsch* på "tugga" | Och pepparkakan. En tugga … mums! | knaster, `mums` |
| 15 | Närbild, hunden reser sig med smulor på nosen | Oj! Smulor på nosen! | `vov-fniss` |
| 16 | Tungan slickar två gånger, smulorna borta på andra | Slick, slick … borta! | slick |
| 17 | Halvbild, hunden tittar åt vänster, sedan åt höger. Glaset står kvar bakom ljusstaken | Oj, mjölken! Hunden vet inte var. | frågande vov |
| 18 | Bred bild för frågan, sedan klipp till närbild på ljusstaken. Efter 3 s skimrar glasets kant | Kan du hjälpa hunden? Kan du se var mjölken är? *(paus 5 s)* | tyst |
| 19 | Närbild kvar, glaset skimrar tydligt; hunden tittar dit och blir jätteglad | Ja, där! Bakom ljusen! | `vov-ja`, `tindra` |
| 20 | Glaset glider fram och lyfter sig upp till munnen, mjölken sjunker | Och mjölken. En klunk … mums! | `slurp`, `mums` |
| 21 | Närbild, hunden reser sig med vit mustasch | Ha ha! En mjölkmustasch! | `vov-fniss` |
| 22 | Halvbild, hunden blundar nöjt, öronen hänger mjukt | Mmm … mätt i magen. | `mmm`, mysig suck |
| 23 | Helbild med ljusen, hunden tittar ut mot barnet | Kan du säga god jul till hunden? *(paus 4 s)* | tyst, blinkar, svansen viftar |
| 24 | Hunden gör ett litet glatt skutt | God jul! | `vov-hej` |
| 25 | Hunden vinkar (armen bakom kroppen) | Hej då, hunden! | `vov-hejda` |
| 26 | Samma, vinkar klart | Hej då! Vi ses snart! | – |
| 27 | Kritirisen runt hunden | – | – |

**Short:** uppslag 13–21 (äta, smulor, hitta mjölken, mustaschen), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Filerna hamnar i `assets/ljud/roster/hunden-ater-julmat/`. Samma ordning som `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En hund!
[happy] Hej, hunden! Hej, hej! God jul!
[warmly] Titta, ljusen lyser. Det är jul!
[surprised] Oj! Det kurrar i magen!
[chuckles] Oj då. Julbordet är visst tomt.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En julskinka! Varsågod, hunden.
[warmly] Ska vi säga tack?
[happy] Tack!
[playfully] Sniff, sniff! Mmm, vad gott det luktar!
[curious] Kritan ritar igen …
[excited] En pepparkaka!
[happy] Och ett glas mjölk!
[laughs] Oj, så mycket julmat!
[cheerfully] Ska du äta nu?
[happy] Först skinkan. En tugga … mums!
[happy] Och pepparkakan. En tugga … mums!
[surprised] Oj! Smulor på nosen!
[playfully] Slick, slick … borta!
[curious] Oj, mjölken! Hunden vet inte var.
[warmly] Kan du hjälpa hunden? Kan du se var mjölken är?
[excited] Ja, där! Bakom ljusen!
[happy] Och mjölken. En klunk … mums!
[laughs] Ha ha! En mjölkmustasch!
[happy sigh] Mmm … mätt i magen.
[warmly] Kan du säga god jul till hunden?
[happy] God jul!
[happy] Hej då, hunden!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Hundens röst

Från 021 och Tittut finns `vov-hej`, `vov-ja`, `vov-hejda`, `vov-fniss`, `vov-babbel`, `vov-pip`, `nos` och `flamt-valp`: hej, förtjust, fniss, hej då och pratar är täckta. **Saknas:** mysig suck (rad 22), nyfiket/frågande vov (6, 17) och ledset/trumpet vov (4). Görs i grind 4 som `vov-gullig` 4–6 (ElevenLabs SFX, frågar före krediter).

**Effekter:** `nom`, `mums`, `slurp`, `mmm`, `tindra`, `glitter`, `krita-ritar` finns (mät `slurp` och `mums` först, receptet varnar). **Nytt:** pepparkaksknaster (*krsch*), slick, magkurr (kolla 022:s först), Openverse först.

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte
- [x] Inga djurnamn i det som sägs: "hunden", aldrig Hugo. Röstmappen heter `hunden-ater-julmat`
- [x] Aldrig *"Vad kan det vara?"* och aldrig *"Vad säger man?"*
- [x] Tre frågor till barnet med paus: tack (2,5 s), var är mjölken (5 s), säg god jul (4 s)
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"… mums!"* (två tuggor och en klunk), som 022
- [x] Tydligt hej och hej då, med vinkning
- [x] Fniss: 3 (rad 11, 15, 21) plus ett i sista repliken, aldrig två rader i följd
- [x] Inget läskigt. Ljusen står på bordet men hunden kommer aldrig nära lågorna
- [ ] **Avsteg från kärnan, som i 022:** problemet är att hunden är hungrig och bordet är tomt, inte att han *inte vill*. Kritan ritar tre saker (skinkan, pepparkakan, mjölken), och den tredje är inte en lösning på ett nytt problem
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt, mer än 2 saker på bordet

## Öppet

1. **Likt 022.** Samma kök, samma ät-rörelse och mjölken är det som letas efter igen. Skillnaden är hunden, julpyntet, nosandet och smulorna, och att glaset står **gömt** bakom ljusstaken i stället för mitt framför. Vill du hellre leta efter något annat (pepparkakan bakom tallriken)?
2. **Julskinkan** görs med dig i grind 2: en liten rund julskinka med senapsgult täcke och rutmönster, på tallriken. Fyra tagningar i Flow.
3. **Pyntet:** grankvist med kulor på väggskåpet och ljusstaken på bordet. Fler saker gör köket rörigt (receptet: högst en eller två saker som ger liv). Ljusslingan finns också, men den är formad efter granen.
4. **Prov innan animatiken:** hunden bakom bordet med ljusstaken bredvid, för att se att han är lagom stor (SKALA 0,5 är större än kaninen), att ljusstaken kan gömma glaset och om svansen syns.
5. **Hugo har inget referensark** (status ⏳), så uttryck får läggas i scenen. Riggen ändras inte.
