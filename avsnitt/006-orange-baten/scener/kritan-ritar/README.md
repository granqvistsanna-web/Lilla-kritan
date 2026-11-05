# Kritan ritar (bild 02–02c)

Avsnittstid 0:11.0–0:35.2, klipptid (= sångtid här) 0:00–0:24.2. `node render.mjs kritan-ritar` → `kritan-ritar.mp4` med sångbiten. Kopierad från 005:s `kritan-ritar/` och anpassad till båten.

| Bild | Klipptid | Vad som händer |
|---|---|---|
| 02 | 0:00–6.8 | Kritan poppar fram på papperet och ritar båtens orange skrov med sätet (gropen) och den höga fören: kanten 0,5–2,6 s, fyllnaden 2,7–5,1 s (först liknar det en sko). När fyllnaden är klar får skrovet en vit klistermärkeskant. Sedan den ljusa randen längs skrovet, 5,4–6,3 s. |
| 02a | 6.8–13.2 | "vad kan det vara?": pinnen och den orange flaggan bak på slaget (7,1 s, 1,2 s), sedan den vågiga blå linjen under skrovet tre slag senare (1,5 s), sedan den grå motorn bak (10,8–11,6 s). |
| 02b | 13.2–19.1 | "Vad kan det vara?": den runda ljusa ventilen vid fören på slaget (14,0 s, 0,8 s). Sedan lyfter kritan bort åt höger, bort från ventilen, och vickar medan den väntar under gissningspausen. |
| 02c | 19.1–24.2 | "En båt!" (19,1): stor studs med squash, sedan gungar båten i takt, vågen böljar och flaggan fladdrar. "En orange båt!" (ca 20,4, uppskattat): glad vickning. "Tut-tut" (22,4): två små hopp med tuta-tut. "nu kör vi!": kritan lyfter ut ur bild uppåt höger, och kameran åker in i teckningen (23,45–24,2 s) till sjon-1:s första bild. |

Teckningen ritas i den riktiga båtens 1024-ruta (måtten tagna ur `orange-baten-skrov.png` och `-insida.png`) och står där båten står i sjon-1 (`BAT`: x 489, vattenlinjen 735, höjd 540, lutning −1, som `baten.js`), samma som `ritad_båt()` i `storyboard/bygg.py`. Papperet, kritans form och vaxfiltren är 005:s; kritan har storyboardens orange (`krita()` i bygg.py).

**Tider:** ur `rader.txt` och SHOTS genom `kit.manus()`. Scenen sätter själv `AV = 11` (avsnittstid − klipptid), för `M.av` läser bara formuleringen "sångtid + N s", och 006:s rader.txt skriver "klipptid + 11 s", så `M.av` blir 0. "En orange båt!" är uppskattad till 1,3 s efter "En båt!" (inga stammar än).

**Sista bilden** är den ritade båten tätt (kameran som sjon-1:s första bild: mitt (489, 555), zoom 1,8) utan krita; sjon-1 (03) tar över med den riktiga båten på samma ställe och zoomar ut. Gungningen tonar ut under zoomen, så att teckningen landar exakt. Ändras sjon-1:s startkamera måste `KAM` ändras med.

**Ljud:** pop (kritan kommer), skrrrrt-kort + skrrrrt-lang i loop under varje streck (skrovets kant, fyllnaden, randen, pinnen med flaggan, vågen, motorn, ventilen), pop + pling ("En båt!"), tuta-tut ("Tut-tut").

**Avvikelser:**
- Båten ritas i kod i SVG, som 005:s bil, inte ur `lager/`: storyboardens ritade båt är ett eget kritklotter (ritad_båt), inte skrovet i `lager/skrov.png`.
- Vågen ligger framför skrovets botten, så att båten ligger i vattnet.
- Storyboardens pil i 02c ritas inte.
