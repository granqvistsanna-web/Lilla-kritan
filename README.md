# Lilla Kritan 🖍️

**Lilla Kritan** är en ritad värld för små barn, där djur som hund, häst, anka, björn, lamm, groda och katt bor tillsammans med bussar, traktorer och flygplan. Tecknade filmer på YouTube. 2D-animation i **cut out-stil**: figurer och bakgrunder ritade med krita, klippta i delar och animerade. Varje avsnitt är en kort berättelse eller sång, ungefär som en bilderbok som rör sig.

Innehållet bygger på sådant Harriet gillar: fjärilar, humlor, bussar, flygplan, traktorer, möss, kycklingar, äpplen, bilar, glass, kaniner och grodor. Alla avsnitt behöver inte ha med allt, men varje avsnitt ska ha några av sakerna.

## Mappar

| Mapp | Innehåll |
|---|---|
| [`format/`](format/) | **Regler för alla avsnitt:** max antal figurer och platser, fast intro och outro, övergångar och manér |
| [`stil/`](stil/) | Stilguide, färgpalett och grundprompt för bildgenerering (Nano Banana) |
| [`karaktarer/`](karaktarer/) | Ett kort per figur: utseende, personlighet, repliker, cut out-delar och färdig prompt |
| [`bakgrunder/`](bakgrunder/) | Platser som återkommer: ängen, bondgården, dammen och så vidare |
| [`rekvisita/`](rekvisita/) | Saker figurerna använder. Skapas allteftersom de behövs |
| [`avsnitt/`](avsnitt/) | Ett avsnitt per mapp (manus, sångtext, bildlista). Börja från [`_mall/`](avsnitt/_mall/) |
| [`verktyg/`](verktyg/) | `prompt.py` sätter ihop stil, figur och scen till en färdig prompt |
| [`referenser/`](referenser/) | Egna referensbilder för stil och inspiration |
| [`assets/`](assets/) | Färdiga bilder och ljud: logotyp, intro och outro, referensark, utklippta delar, bakgrunder, musik och röster |
| [`produktion/`](produktion/) | Arbetsflödet från piloten Lilla Kvack: utklipp, HTML-scener, ljud och klippskript |
| [`att-skapa.md`](att-skapa.md) | Allt som saknas: format, platser, figurer, poser och rekvisita, i prioritetsordning |
| [`harriets-favoriter.md`](harriets-favoriter.md) | Favoritsakerna och vilka avsnitt de har varit med i |

## Arbetsgång för ett avsnitt

Varje avsnitt har samma ram: **intro** med logotyp, nummer och titel → **en krita ritar dagens sak** → **berättelsen** på högst 2 platser med högst 3 figurer → **sång** → **avslutning** → **outro**. Se [`format/`](format/).

1. **Idé.** Välj 2–4 favoritsaker i [`harriets-favoriter.md`](harriets-favoriter.md) och en enkel händelse.
2. **Manus och sång.** Kopiera `avsnitt/_mall/` till `avsnitt/NNN-namn/` och fyll i `manus.md` och `sang.md`. Gå igenom checklistan i [`format/regler.md`](format/regler.md).
3. **Bildlista.** Lista bara det som är **nytt**: nya poser, saker och platser. Intro, outro och övergångar finns redan i `assets/format/`.
4. **Generera bilder.** Använd `verktyg/prompt.py` och bifoga **alltid** figurens referensark från `assets/karaktarer/<figur>/`.
5. **Animera.** Klistra in introt, byt titel och nummer, animera berättelsen med kritsvep vid platsbytet och klistra in outrot.
6. **Ljud.** Spela in röster och sång. Använd ljudeffekterna från `assets/ljud/effekter/` (samma ljud för samma händelse).
7. **Publicera.** Markera filmen som *Made for Kids* på YouTube, klipp ut sången som en Short och fyll i avsnittsnumret i `harriets-favoriter.md`.

## Snabbstart: prompt för en figur

```bash
python3 verktyg/prompt.py --lista                       # visa alla figurer, platser och saker
python3 verktyg/prompt.py musen-mille --scen "äter en stor jordgubbsglass, glad"
python3 verktyg/prompt.py musen-mille --referensark     # vändark till första referensbilden
python3 verktyg/prompt.py musen-mille --delar           # utklippsdelar för animation
python3 verktyg/prompt.py --plats angen                 # bakgrund utan figurer
```

## Stora filer

Bilder och ljud kan bli stora. Om repot växer över några hundra MB, slå på [Git LFS](https://git-lfs.com) för `assets/`:

```bash
git lfs install
git lfs track "assets/**/*.png" "assets/**/*.wav" "assets/**/*.mp4"
```
