# Kaninen Kanel

**Art:** kanin · **Favoritsak:** kanin 🐰 · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-07):** Kanel är första figuren i den nya stilen ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md)). Riggen ligger i [`assets/karaktarer/kaninen-kanel/premium/`](../assets/karaktarer/kaninen-kanel/premium/): kropp, öron, armar, ben och svans i `cut/`, vridpunkter i `kanel-rigg.json`, ansiktet i kod och `rigg-test.html` (närbild på zoom 2,0, `?vy=hela` för brett). Alla delar har 10 px vit kant vid SKALA 0,5 (`verktyg/tunn_kant.py`), och armarna är målade om av en ren kritbit. Godkänd konst: `premium/original/kanel-platt.png`. Utseendet nedan är v1.
>
> **Uttryck (v2):** [`premium/uttryck.html`](../assets/karaktarer/kaninen-kanel/premium/uttryck.html) visar alla på ett ark, `?bara=<namn>` ett stort som går neutral → uttryck → neutral. Namn: `neutral`, `glad`, `jatteglad`, `forvanad`, `nyfiken`, `tanker`, `ledsen` (lite ledsen), `somnig`, `fnissig`, `blinkar`, `stolt`. Alla delar samma parametrar i tabellen `UTTRYCK` (ögon, blick, lock, bryn, kinder, mun, öron, armar, lutning), så de går att blanda: `ansikte('glad', k)` med k 0–1 från neutral, `ansikte(blanda('tanker', 'glad', k))` mellan två uttryck. Fnissig har ingen hand för munnen, armarna når inte dit.
>
> **Poser (v2):** samma fil, `?ark=poser` visar alla med ett passande uttryck, `?pose=<pose>&bara=<uttryck>` en stor. Namn: `neutral`, `lutaV`, `lutaH`, `vanster`, `hoger` (riktningspose), `haller` (håller fram), `nar` (sträcker sig efter), `upp`, `ner`, `pekar`, `hurra`, `magen` (händer på magen, armarna framför kroppen), `blyg`, `sitter` (benen lyfta 40 px så att rötterna inte syns under magen), `strack` (sträcker på sig), `huka` (före hopp), `stampar`, `lyssnar`. `pose('hurra', k)` blandar från neutral och går ihop med `ansikte()`: posen styr kropp och lemmar, ansiktet uttrycket. `blandaPose(a, b, k)` går mellan två poser. **Riktningspose** (som i bilen i `stiltest-premium/bil/bil-test.html`): kroppen är kvar framifrån, ansiktet glider 36 px åt sidan, smalnar och lutar −5°, öronen lutar dit, och båda armarna kommer ut på samma sida (den närmre plus en kopia 85 px under). Armarna tonar aldrig: den bortre glider in bakom kroppen (200 px) och kopian glider ut bakom kroppen på den närmre sidan. `riktning('vanster' | 'hoger', k)` lägger den ovanpå posen, eller `rikt: −1 … 1` i en pose.
>
> **Rörelser (v2):** `rorelse('klappa' | 'hoppa' | 'dansa' | 'ga', t)` räknar uttryck och pose ur tiden t, så att de går att rendera bild för bild. Klappa (3 s): armarna fram och händerna möts framför bröstet, med en liten studs på varje klapp. Hoppa (2,4 s): som i `rigg-test.html`. Dansa (4 s): gungar i takt, armarna turas om upp och foten lyfts. Gå (8 s): går fram och tillbaka och saktar in när hon vänder. Stegen (`steg(t, amp, rikt)`) går i riktningsposen åt gångriktningen: ansiktet och magen glider dit, båda armarna pendlar på den sidan i otakt (kopian får `klon` grader), och öronen rör sig bara lite (±8°). Se dem med `uttryck.html?rorelse=alla` eller `?rorelse=<namn>`. Inga nya bilder, allt i kod.
>
> **Testfilm (v2):** `uttryck.html?film=1` är en 34 s testfilm i skogen (tapeten, trädet och två grästuvor som i `rigg-test.html`, zoom 2, kameran följer med eftersläp och 70 % av hoppet). Ordning: går in, vinkar och säger hej, lyssnar (nyfiken), sträcker sig efter något (riktningspose, blir förvånad), tänker → hurra, klappar, hoppar två gånger, dansar, sätter sig sömnig, sträcker på sig, vinkar hej då och går ut. Varje avsnitt är en funktion av sin egen tid i listan `AVSNITT` (sekunder, `tl => [uttryck, pose]`), och de blandas mjukt 0,5 s in i nästa, så det är lätt att byta ordning eller lägga till. Renderad: `premium/kanel-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`, se skillen `lk-figur`). Positionen i sidled är posens `x` (figurens px).

## Utseende
- Form: en enda sned, rund kritklump (huvud och kropp i ett), två långa öron som båda står rakt upp. Små armstumpar, korta ben och stora ovala fötter.
- Färger: varmt brun vaxkrita, gräddvit mage och gräddvit nosfläck med liten rosa nos, ljust rosabeige inuti öronen.
- Kännetecken: de raka öronen och den vita magen. Väldigt minimal.
- Den rosa versionen med hängöra ligger i `v2/` (och den ännu äldre i `v2/cut/v1/`). Trekvart, sida och bakifrån (`kanel-34`, `kanel-side`, `kanel-back`) är fortfarande rosa och behöver göras om innan de används.

## Personlighet
- Glad och hoppig. Älskar äpplen och morötter.
- Är bra på att hitta saker och räknar gärna: *"Ett, två, tre – hopp!"*

## Röst och repliker
- Röst: glad och lite fnissig.
- Återkommande replik: *"Ett, två, tre – hopp!"*
- Ljud: mjuka duns när hon hoppar.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg with foot, right leg with foot (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/kaninen-kanel/`](../assets/karaktarer/kaninen-kanel/): framifrån, utan ansikte, kropp utan lemmar, trekvart, sida och bakifrån, utklippta i `cut/`. Vridpunkter för armar och ben finns i `kanel-rigg.json`, ögonen sitter på (412, 396) och (605, 401) med radie 26, och munnen på nosfläcken (510, 458). Lemmarna är ritade med `verktyg/rita-lemmar.py assets/karaktarer/kaninen-kanel assets/karaktarer/kaninen-kanel/cut 290,450,370,530 0.1`. `rigg-test.html` visar henne vinka, gå, hoppa och blinka. Delarna görs med `verktyg/delar.py`.

## Prompt
```prompt
Kanel the rabbit: one big slightly lopsided round blob (body and head in one), warm soft brown heavy wax crayon with streaky strokes and paper grain, a creamy white tummy patch and a creamy white muzzle patch, no outline, a thin uneven white rim, two long ears both standing straight up with pale pink-beige insides, two round white eyes ringed in black with small black pupils, a tiny pink nose, two tiny arm nubs, two short legs with big oval feet. Very minimal: no hair, no clothes, no marks.
```

## Pose: på mopeden (012, förslag)
Kanel sitter på blå mopedens sadel (`rekvisita/moped-bla.md`), vänd mot tittaren, med tassarna på styret. Kåpan döljer benen. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Troligen behövs ingen ny bild.** Gör som Lova i gröna traktorn i 014 (`assets/karaktarer/leoparden-lova/i-traktorn/`): `kanel-body.png` och armarna ur `kanel-rigg.json` läggs i mopedens ruta mellan bakdelen (sadel, korg) och framdelen (kåpa, styre), benen döljs bakom kåpan och ansiktet ritas i kod. Den högra armen vilar på styrets handtag, den vänstra kan vinka, peka och visa "litet". Öronen sticker fritt uppåt (de svänger som klockor och viftar som flaggan). Ställ mopeden på den tomma golvytan, inte framför äppelträdets stam (brun mot brun). `kanel-side.png` är rosa och gammal (se ovan) och används inte. En `pa-mopeden/`-mapp med samma sorts json räcker.

Bara om det ihopsatta inte ser bra ut: generera posen med image2image, Image 1 = `kanel-faceless.png`, Image 2 = mopedens valda bild.

```prompt
Image 1 is Kanel the rabbit: keep her EXACTLY the same, same slightly lopsided round blob body, same warm soft brown wax crayon with streaky strokes, same creamy white tummy and muzzle patches, same tiny pink nose, same two long ears standing straight up with pale pink-beige insides, same thin uneven white rim, and keep her faceless: no eyes, no mouth. Image 2 is the blue toy moped, seen from the side facing right: keep it exactly the same. ONLY change: Kanel sits on the moped's low seat, facing the viewer, her legs hidden behind the blue leg shield, one tiny arm nub resting on the handlebar, the other arm nub free at her side. No helmet, no new details, no shadow, no text. Pure solid white background.
```
