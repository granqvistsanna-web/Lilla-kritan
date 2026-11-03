# Lilla Kritan 🖍️

Tecknade filmer för små barn på YouTube. 2D-animation i **cut out-stil**: figurer och bakgrunder ritade med krita, klippta i delar och animerade. Varje avsnitt är en kort berättelse eller sång, ungefär som en bilderbok som rör sig.

Innehållet bygger på sådant Harriet gillar: fjärilar, humlor, bussar, flygplan, traktorer, möss, kycklingar, äpplen, bilar, glass, kaniner och grodor. Alla avsnitt behöver inte ha med allt, men varje avsnitt ska ha några av sakerna.

## Mappar

| Mapp | Innehåll |
|---|---|
| [`stil/`](stil/) | Stilguide, färgpalett och grundprompt för bildgenerering (Nano Banana) |
| [`karaktarer/`](karaktarer/) | Ett kort per figur: utseende, personlighet, repliker, cut out-delar och färdig prompt |
| [`bakgrunder/`](bakgrunder/) | Platser som återkommer: ängen, bondgården, dammen och så vidare |
| [`rekvisita/`](rekvisita/) | Saker figurerna använder: äpple, glass, ballong med mera |
| [`avsnitt/`](avsnitt/) | Ett avsnitt per mapp (manus, sångtext, bildlista). Börja från [`_mall/`](avsnitt/_mall/) |
| [`verktyg/`](verktyg/) | `prompt.py` sätter ihop stil, figur och scen till en färdig prompt |
| [`referenser/`](referenser/) | Egna referensbilder för stil och inspiration |
| [`assets/`](assets/) | Färdiga bilder och ljud: referensark, utklippta delar, bakgrunder, musik och röster |
| [`harriets-favoriter.md`](harriets-favoriter.md) | Favoritsakerna och vilka avsnitt de har varit med i |

## Arbetsgång för ett avsnitt

1. **Idé.** Välj 2–4 favoritsaker i [`harriets-favoriter.md`](harriets-favoriter.md) och en enkel händelse, till exempel att något försvinner, att man väntar på något eller att man hjälper en kompis.
2. **Manus och sång.** Kopiera `avsnitt/_mall/` till `avsnitt/NNN-namn/` och fyll i `manus.md` och `sang.md`.
3. **Bildlista.** Skriv `bildlista.md` och lista varje bild du behöver: figur, pose, bakgrund och rekvisita.
4. **Generera bilder.** Använd `verktyg/prompt.py` för att få färdiga prompter. Bifoga **alltid** figurens referensark från `assets/karaktarer/<figur>/` till Nano Banana, så att figuren ser likadan ut varje gång.
5. **Klipp ut delar.** Generera figurer i delar (huvud, kropp, armar, ben) på vit bakgrund och ta bort bakgrunden. Spara i `assets/karaktarer/<figur>/delar/`.
6. **Animera.** Sätt ihop delarna med leder i animationsprogrammet (se [`stil/cut-out-arbetsflode.md`](stil/cut-out-arbetsflode.md)).
7. **Ljud.** Spela in röster och sång, lägg till musik och effekter.
8. **Publicera.** Markera filmen som *Made for Kids* på YouTube och kryssa av favoritsakerna i `harriets-favoriter.md`.

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
