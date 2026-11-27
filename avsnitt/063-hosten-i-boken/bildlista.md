# Bildlista – Avsnitt 063 Hösten i boken (grind 2, klar)

Bara det som är **nytt** eller behöver göras i ordning. Allt annat i uppslaget finns redan (se *Uppslaget – korten* i [`manus.md`](manus.md)). Bilderna görs i Google Flow (Nano Banana, 0 krediter). Figuren är räven (Sanna 2026-11-27), så den hängande änden på halsduken behövs inte (tittut är struket).

| # | Typ | Vad | Ny? | Hamnar i | Klar |
|---|---|---|---|---|---|
| 1 | Sak (kritans teckning 1, pärmens siluett) | Det stora orange lövet | **ny** ([`rekvisita/lov.md`](../../rekvisita/lov.md)) | `assets/rekvisita/lov/cut/lov-orange.png` + `lov-orange-kontur.json` (mittnerven och tre par sidonerver), kontroll i [`grind2/lov-orange-kontur-kontroll.jpg`](grind2/lov-orange-kontur-kontroll.jpg) | ☑ 2026-11-27 (Flow tagning 1 av 2) |
| 2 | Sak | Tre löv på ett ark: rött, gult, brunt (de tre på marken som barnet säger färgen på) | **ny** (samma sak som 1) | `assets/rekvisita/lov/cut/lov-rott.png`, `lov-gult.png`, `lov-brunt.png` | ☑ 2026-11-27 (tagning 1 av 2) |
| 3 | Landskapskort | Eken med höstlöv (edit av `ek.png`) | **ny** | `produktion/three-rum/popupbok/bilder/ek-host.png` | ☑ 2026-11-27 (tagning 1 av 2) |
| 4 | Landskapskort | Den kala eken (edit av 3, samma stam och plats) | **ny** | `popupbok/bilder/ek-kal.png` | ☑ 2026-11-27 (tagning 1 av 2, tjocka grenar; 2 har tunna kvistar) |
| 5 | Landskapskort | Höstkullarna bak och fram (edit av `kulle-bak.png` och `kulle-fram.png`) | **ny** | `popupbok/bilder/kulle-bak-host.png`, `kulle-fram-host.png` | ☑ 2026-11-27 (tagning 1 av 2 var) |
| 6 | Landskapskort | Gult lövträd (edit av `skogen-saker/trad.png`) | **ny** | `popupbok/bilder/trad-gult.png` | ☑ 2026-11-27 (tagning 2 av 2, rundare krona) |
| 7 | Sak (kritans teckning 2) | Halsduken: bokversion med kant 1 %, kontur och fem detaljstreck (fyra ränder, randen på den hängande änden). Ingen egen ände, för tittut är struket | finns | `assets/rekvisita/halsduk/cut/halsduk-bok.png`, `halsduk-kontur.json`; kontroll i [`grind2/halsduk-kontur-kontroll.jpg`](grind2/halsduk-kontur-kontroll.jpg) | ☑ 2026-11-27 |
| 8 | Kanter | Kopior för boken med kanten ca 1 % av höjden: lövhögen 1,6 → 0,9 % (`tunn_kant.py 8`), svampen 0,5 → 1,0 % (nedskalad till 1024 px hög, `tunn_kant.py 10`), ekollonet 2,8 → 0,9 % (`tunn_kant.py 8`). Originalen i `assets/` är orörda (de används i 007, 038, 050, 051 och ABC). Stubben (1,0 %) och ekorren (0,7 %) är redan rätt | finns | `popupbok/bilder/lovhog.png`, `svamp.png`, `ekollon.png` | ☑ 2026-11-27 |

**Grind 2 klar 2026-11-27.** Bilderna är gjorda av Claude i Google Flow (Nano Banana 2.1, 0 krediter). Alla tagningar ligger i `assets/rekvisita/lov/original/` och `popupbok/bilder/original/`, så en annan tagning kan väljas. De är urklippta med `egen_kant.py` och har kant ca 1 % med `tunn_kant.py`. Alla kort sida vid sida finns i [`grind2/landskapskort.jpg`](grind2/landskapskort.jpg).

**Den kala och den höstiga eken passar ihop:** stammen är lika bred (242 px vid foten, mitten x 390–392) i båda, men bilderna är olika höga (829 och 856 px). Ställ dem därför på samma fot (nederkanten), inte samma mitt, så ligger stammarna exakt på varandra när kronan växer fram. I `ek-host.png` var det en vit kil mellan stammen och kronan (Flows fel), och den är ifylld med stammens brun.

**Ljuden (grind 4):** rävens familj `rav-gullig` 1–8 och `rav-fniss` finns redan, så inga krediter behövs.

## Ritas i kod

Sanna 2026-11-27: *"consider what can be drawn in code, maybe a small nyckelpiga can be code"*. Det som är litet, finns i många exemplar och rör sig ritas i kod. Det som är stort, står stilla och ska se ut som en kritbild (landskapskorten, eken, lövhögen, kritans två teckningar och de tre löven barnet säger färgen på) är bilder.

**Så ser kod-sakerna ut som v2:**
- **Kritfyllning:** `kritYta()` i `produktion/three-rum/popupbok/bok-parm.js`, med lösa diagonala kritstreck, papperskorn och en ljusare och en mörkare ton av färgen.
- **Form och kant:** formen byggs som i 065:s prov (`avsnitt/065-varen-i-boken/prov/insekter/prov.js`). `blob()` ger formen, `krit()` lägger kritfyllningen i formens mask och `vit()` lägger en vit kant under. Kanten följer `verktyg/kant.js`, alltså 3 px + 1 % av sakens höjd i bild.
- **Boil:** konturen får lite brus i radien, med ny brusbild 6 gånger/s. Det blir 2,5 px i bild och delas med kamerans zoom.
- **Skugga:** kontaktskuggan `KSKUGGA` från 062 läggs under allt som ligger eller står på sidan.

| Sak | Hur den ritas | Hur den rör sig |
|---|---|---|
| **Fallande löv** (fyra former: orange lönnlöv, rött ovalt, gult runt, brunt eklöv) | `blob()`-form per sort med 5, 1, 3 och 4 flikar, kritfyllning i lövets färg, mittnerven och 2 sidonerver som mörkare kritstreck, kort brunt skaft och vit kant. Ca 60–90 px i bild, alltså mindre än de tre på marken | från rad 09: ett löv i taget lossnar ur kronan och singlar ner i ca 4 s i en svajande bana (sidled ± 40 px och rotation ± 25°, lugn sinus). Det lägger sig platt **på** marken med kontaktskugga och ligger kvar. Högst 3 i luften, och högst 5 när det blåser (rad 12–13) |
| **Lövyra i lövhögen** | samma löv, 8–10 st | på *"Hopp!"*: löven skjuts lugnt upp ur högen i en båge (högst 60 px), vänder och singlar ner på 2 s, och lägger sig på högen och marken |
| **Löv på rävens huvud** | tre små löv (orange, gult, rött) ritade i riggens SVG i en grupp som följer huvudet, som 062:s droppar i `huvudG`. Då får de riggens vita kant och boil | rad 27: sitter på huvudet och mellan öronen. Räven skakar lugnt, och ett löv glider av och singlar ner |
| **Vindkrumelurer** | 3–4 öppna krumelurer (en båge med en liten slinga i slutet) i vit krita, 6 px bred med kritkorn i kanten. Ingen kant och ingen skugga, de svävar i luften | rad 12–13 och svagt i 21: de glider lugnt från höger till vänster i ca 2,5 s, tonas in och ut, och den sista lägger sig efter 3 s |
| **Andningspuff** | en liten vit rund moln-blob i krita, ca 25 px | rad 13: en puff vid nosen när räven fryser, som växer och tonas bort på 1 s, två gånger |
| **Glimt** | finns i 062 (glimten när en sak nämns) | löven, ekollonen, svampen och sakerna i hej då |
| **Nyckelpiga** (tyst pynt, valfri) | 065:s `nyckelpiga()` (uppifrån, röd krita med sex prickar, ben som växlar), ca 40 px | från rad 39: kryper långsamt över stubbens ovansida bredvid svampen, 20 px/s, och stannar ibland. Den sägs inte och är inget barnet ska hitta. Den är bara liv i bilden, som 065:s insekter |

**Det som flyttat till kod:** de fallande löven, lövyran och löven på huvudet. De var tänkta som små kort ur lövarket, men nu ritas de i kod i fyra former, så att de kan vara många och olika och röra sig fritt. Dessutom tillkommer nyckelpigan som valfritt pynt. Inget i Flow-listan behövde strykas: där finns bara det som är stort, står stilla eller är kritans teckningar.

**Det som är kvar som bilder och varför:**
- **Det orange lövet:** kritan ritar dess kontur, det fylls till bilden och det är pärmens siluett.
- **De tre löven på marken:** barnet säger färgen på dem i närbild.
- **Eken (höst och kal), kullarna och det gula trädet:** stora landskapskort.
- **Lövhögen, stubben, svampen, ekollonen, ekorren och halsduken:** de finns redan. Svampen och ekollonen står stilla och syns i närbild, så den riktiga kritbilden ser bättre ut än kod.

## Kritans två teckningar

1. **Det orange lövet** (rad 03–04): ritas på en av den kala ekens grenar i närbild. Konturen i ett drag runt lövets fem rundade flikar, sedan skaftet, mittnerven och 2–4 sidonerver som detaljstreck. Fylls i inifrån. Samma urklipp blir pärmens siluett (`skapaBok(scen, { farg: '#8A5A34', figur: lov-orange })`).
2. **Halsduken** (rad 10–11): ritas på gräset bredvid räven. Konturen runt hela halsduken med tofsarna, sedan fyra ränder och randen på den hängande änden som detaljstreck (`halsduk-kontur.json`, klar). Fylls i, kortet fälls upp.

## Flow-prompter

### 1. Det orange lövet

Stilreferenser: bild 1 = `assets/rekvisita/sol-gul/cut/sol-gul.png` (eller `popupbok/bilder/sol.png`), bild 2 = `assets/bakgrunder/skogen-gron-saker/svamp.png`. 1:1.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE big single autumn leaf as a flat paper cut-out, very simple and childish like a toddler picture-book drawing: a bold warm orange (#F28C28) leaf with five soft, rounded points like a simple maple leaf, a short brown stalk (#8A5A34) at the bottom, and a slightly deeper orange-red (#E06A1E) crayon midrib with three short side veins on each side. The colour stays strong and solid. NO face, no other leaves, no branch, no text, no 3D, no shine, no gradients. A thick, clean, even white sticker border all around the whole leaf including the stalk. Centered, upright with the stalk at the bottom, fills about 75 percent of the frame, square 1:1, plain pure solid white background, no shadow.
```

### 2. Tre löv på ett ark

Samma stilreferenser, plus bild 3 = lövet från prompt 1 (så att de hör ihop). 16:9.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Image 3 is the leaf these must match in size, style and simplicity. Draw THREE separate single autumn leaves in one row, evenly spaced with plenty of white space between them so they never touch, each a flat paper cut-out, very simple and childish like a toddler picture-book drawing. Left: a bright red (#D2402F) leaf, a simple oval with a pointed tip and a softly wavy edge. Middle: a sunny yellow (#F5C23A) round leaf with a few soft rounded points. Right: a warm brown (#9A6235) oak-style leaf with rounded wavy lobes. Each leaf has a short brown stalk at the bottom and a slightly darker crayon midrib with two or three short side veins in its own colour. All three upright, about the same size. NO faces, no branch, no text, no 3D, no shine, no gradients. A thick, clean, even white sticker border around each leaf. Plain pure solid white background, no shadow.
```

### 3. Eken med höstlöv (edit)

Bild 1 = `assets/rekvisita/ek/cut/ek.png` (på vit bakgrund).

```prompt
Edit Image 1. Keep the tree EXACTLY the same: same shape, trunk, stubby branches, crown outline, size and position in the frame, same little acorns, same thick clean white sticker border, same pure white background, same wax-crayon texture. ONLY change the colour of the crown: instead of green it is full of autumn leaves, mostly warm orange (#F28C28) with soft patches of red (#D2402F) and sunny yellow (#F5C23A), drawn with the same soft mottled crayon strokes. The acorns stay brown. No face, no falling leaves, no ground, no text, no shadow.
```

### 4. Den kala eken (edit)

Bild 1 = resultatet av prompt 3 (`ek-host.png`), så att stammen sitter på samma ställe.

```prompt
Edit Image 1. Keep the trunk EXACTLY the same: same brown colour, shape, size and position in the frame, same thick clean white sticker border, same pure white background, same wax-crayon texture. ONLY change: remove the whole leafy crown and the acorns. Instead the trunk splits into five or six thick, rounded, gently curving bare brown (#8A5A34) branches with a few short twigs, spreading out inside the same round area where the crown was, very simple and childish like a toddler picture-book drawing. The white sticker border follows the branches. No leaves, no face, no ground, no text, no shadow.
```

### 5. Höstkullarna (edit, två gånger)

Bild 1 = `produktion/three-rum/popupbok/bilder/kulle-bak.png`, sedan samma prompt med `kulle-fram.png`.

```prompt
Edit Image 1. Keep the hills EXACTLY the same: same outline, size and position in the frame, same thick clean white sticker border, same pure white background, same wax-crayon texture. ONLY change the colours to autumn: the grass is a warm ochre yellow (#C9A43E) blending into soft olive green (#8F9A3C), with a few small scattered orange and red crayon dots like fallen leaves. No trees, no leaves bigger than dots, no face, no text, no shadow.
```

### 6. Gult lövträd (edit, valfri)

Bild 1 = `assets/bakgrunder/skogen-saker/trad.png`.

```prompt
Edit Image 1. Keep the tree EXACTLY the same: same trunk, crown outline, size and position in the frame, same thick clean white sticker border, same pure white background, same wax-crayon texture. ONLY change the colour of the crown from green to autumn: sunny yellow (#F5C23A) with soft patches of light orange (#F2A23A). No face, no falling leaves, no ground, no text, no shadow.
```
