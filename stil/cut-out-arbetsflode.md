# Cut out-arbetsflöde

Så går man från en prompt till en figur som kan röra sig.

## 1. Referensark (en gång per figur)

1. Kör `python3 verktyg/prompt.py <figur> --referensark`.
2. Generera i Nano Banana tills figuren ser rätt ut. Bifoga gärna en stilreferens från `referenser/`.
3. Spara den bästa bilden som `assets/karaktarer/<figur>/referensark.png`.
4. Uppdatera fältet **Status** i figurens kort till `✅ Referensark klart`.

Från och med nu: **bifoga alltid referensarket** när du genererar figuren. Skriv till exempel *"Use the attached image as the character reference. Keep the exact same design, colours and proportions."* Nano Banana är bra på att hålla en figur likadan när den får en referensbild.

## 2. Delar för animation

1. Kör `python3 verktyg/prompt.py <figur> --delar` och bifoga referensarket.
2. Få fram delarna isärplockade på vit bakgrund: huvud, kropp, armar, ben och så vidare (listan finns i figurens kort).
3. Ta bort bakgrunden, till exempel med remove.bg, Photoshop, Affinity eller Krita.
4. Spara varje del som PNG med genomskinlig bakgrund:
   `assets/karaktarer/<figur>/delar/huvud.png`, `kropp.png`, `arm-fram.png` …
5. Gör några **munformer** (stängd, öppen, O) och **ögon** (öppna, stängda/blink) som egna delar. Då kan figuren prata och blinka.

**Tips:** Låt varje del sticka ut lite extra där den fästs (axel, höft, hals). Då syns inga glipor när delen roterar.

## 3. Bakgrunder

- Generera bakgrunder **utan figurer**: `python3 verktyg/prompt.py --plats <plats>`.
- Gör gärna förgrund och bakgrund separat (till exempel gräs och blommor i en bild, kullar och himmel i en annan). Då kan kameran glida med lite parallax.
- Spara i `assets/bakgrunder/<plats>/`.

## 4. Animationsprogram

| Program | Pris | Bra för |
|---|---|---|
| **Moho** | Betal | Gjort för cut out-figurer med ben och leder. Rekommenderas. |
| **Adobe Character Animator** | Abonnemang | Läppsynk med webbkamera och mikrofon |
| **After Effects + Duik** | Abonnemang | Flexibelt, mycket kontroll |
| **OpenToonz / Synfig** | Gratis | Gratisalternativ med cut out-stöd |
| **CapCut / DaVinci Resolve** | Gratis | Enkel rörelse (glida, gunga, studsa) och klippning av hela avsnittet |

Börja enkelt. Gunga, studsa, blinka och glida räcker långt för små barn. Det är en del av bilderbokskänslan.

## 5. Rörelseregler

- Långsamt och mjukt. Små barn behöver tid att se.
- En sak i taget rör sig.
- Gående figurer studsar lite upp och ner.
- Flygande figurer (fjäril, humla, flygplan) svävar i mjuka vågor.
- Fordon gungar lite när de kör och har snurrande hjul.
