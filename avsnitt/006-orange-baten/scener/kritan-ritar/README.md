# Kritan ritar (bild 02–02c)

Avsnittstid 0:11.0–0:35.2, klipptid (= sångtid här) 0:00–0:24.2. `node render.mjs kritan-ritar` → `kritan-ritar.mp4` med sångbiten. Kopierad från 005:s `kritan-ritar/` och anpassad till båten.

| Bild | Klipptid | Vad som händer |
|---|---|---|
| 02 | 0:00–6.8 | Kritan poppar fram på papperet och ritar båtens orange skrov: kanten 0,5–2,6 s, fyllnaden 2,7–6,2 s. När fyllnaden är klar får skrovet en vit klistermärkeskant. |
| 02a | 6.8–13.2 | "vad kan det vara?": pinnen och den orange flaggan på slaget (7,1 s, 1,2 s), sedan den vågiga blå linjen under skrovet tre slag senare (1,5 s). |
| 02b | 13.2–19.1 | "Vad kan det vara?": den ljusblå ventilen på slaget (14,0 s, 0,8 s). Sedan lyfter kritan bort åt höger, bort från ventilen, och vickar medan den väntar under gissningspausen. |
| 02c | 19.1–24.2 | "En båt!" (19,1): stor studs med squash, sedan gungar båten i takt, vågen böljar och flaggan fladdrar. "En orange båt!" (ca 20,4, uppskattat): glad vickning. "Tut-tut" (22,4): två små hopp med tuta-tut. "nu kör vi!": kritan lyfter ut ur bild uppåt höger. |

Måtten kommer från `ritad_båt()` i `storyboard/bygg.py` (x0 430, y0 340). Papperet, kritans form och vaxfiltren är 005:s; kritan har storyboardens orange (`krita()` i bygg.py).

**Tider:** ur `rader.txt` och SHOTS genom `kit.manus()`. Scenen sätter själv `AV = 11` (avsnittstid − klipptid), för `M.av` läser bara formuleringen "sångtid + N s", och 006:s rader.txt skriver "klipptid + 11 s", så `M.av` blir 0. "En orange båt!" är uppskattad till 1,3 s efter "En båt!" (inga stammar än).

**Sista bilden** är den ritade båten på papperet utan krita; sjon-1 (03) tar över.

**Ljud:** pop (kritan kommer), skrrrrt-kort + skrrrrt-lang i loop under varje streck (skrovets kant, fyllnaden, pinnen med flaggan, vågen, ventilen), pop + pling ("En båt!"), tuta-tut ("Tut-tut").

**Avvikelser:**
- Båten ritas i kod i SVG, som 005:s bil, inte ur `lager/`: storyboardens ritade båt är ett eget kritklotter (ritad_båt), inte skrovet i `lager/skrov.png`.
- Vågen ligger framför skrovets botten, så att båten ligger i vattnet.
- Storyboardens pil i 02c ritas inte.
