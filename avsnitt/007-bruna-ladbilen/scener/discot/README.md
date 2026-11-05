# Discot – avsnitt 007, bild 15a–16d

Danspausen, sista refrängen i det beige/ljusbruna discot och hej då: Bulle i lastbilen rullar in till mitten, där `../slutet/` (17, kritirisen) tar vid.
Avsnittstid 2:45.6–3:21.1 (scenen är 35,5 s), klipptid 2:34.6–3:10.1 i `sang-klippt.m4a` (tagning 2, oklippt: avsnittstid = sångtid + 11 s). Efter 006:s `discot/` (och 005:s), omfärgat och med 007:s figurer. Takten är kit.js:s (92,4 bpm).

```bash
node render.mjs discot --snabb              # förhandsvisning
node render.mjs discot                      # → discot/discot.mp4 och discot-effekter.wav
node render.mjs discot 0.3 3.2 6.4 12 22    # stillbilder → discot/stills/
```

Tiderna ur `../lager/matt.json` (`M.bild`) och raderna i `../../rader.txt` (`M.rad`, efter 2:25), måtten ur `../../storyboard/bygg.py`
(`SOLO_H/FOT`, `DUO_H`, `KULA`, `IKON_BÅGE/IKON_R`, `STOR`, `V_H/V_FOT`, `_v_rad()`, `SLUT_X/Y/H`). Plåten är `../lager/disco-prickar.png`
(006:s omfärgad, `bruna_discot()`), kulan `../lager/discokula-brun.png`.

## Bilder

| Bild | Scentid | Vad |
|---|---|---|
| 15a | 0–1,15 | "Danspaus!": Bulle landar mitt i bild (boing) och dansar med armarna upp, hopp på slaget, stjärnregn runt honom |
| 15b | 1,15–2,3 | Efter "Danspaus!": Bulle tar ett steg åt vänster och blir mindre (`DUO_H`), Ludde hoppar in från höger i en hög båge (boing), Igge trippar in från vänster, studsar glatt och vickar med armarna uppe |
| 15c | 2,3–4,1 | "Hoppa, hoppa!": Gurra solo, armarna snett upp och ett hopp på varje slag (boing på första) |
| 15d | 4,1–7,1 | "Rulla runt! (rulla runt)": Igge rullar ihop sig till en boll (pop, swoosh, `igge-hoprullad-v1`), rullar åt höger, tillbaka över mitten åt vänster och in igen, och gungar ±12°. Bollen snurrar aldrig runt |
| 15e | 7,1–9,1 | "Klappa, klappa!": Mille solo, armarna upp och tassarna slår ihop ovanför huvudet på slaget (klapp) |
| 16a | 9,1–12,8 | "Kotten, björnen, / bullen – brun!": kotten på första raden, björnen två slag senare, bullen på andra raden, en i taget stor mitt i bild på en vit kritskiva (`STOR`, pop), inga figurer; var och en flyger upp i raden när nästa slås upp och fastnar där (klistra) |
| 16b | 12,8–15,2 | "Brun, brun, brun …": alla fem springer in från sina sidor (ytterst först) och gör björnstampet i ett svagt V, ett stamp per slag, varannan fot, tassarna ut och ner (Igge också, med sina ritade armar). Bulle störst i mitten med stjärnregnet |
| 16c | 15,2–17,7 | "Lastbil, / brum!": Bulle i lastbilen (0,7·H, hjulen vid underkanten) rullar in från vänster och stannar i vänster tredjedel (0,38·W); lastbilen poppar upp som fjärde småbild i raden på "Lastbil". En skumpning och avgaspuffar på "brum" |
| 16d | 17,7–35,5 | "Hej då! Tut! Hej då, lilla vän! Tut, tut! (Tut, tut!)" och mellanspelet: lastbilen rullar mjukt in till mitten (framme 1,2 s efter sista tutet) och står sedan där, Bulle vinkar; den skumpar och ratten guppar på varje tut. Raden ligger kvar |

**Småbilderna** är vita kritskivor (r 54) med saken i, som `skiva()` i bygg.py: kotten, Bulles huvud med kepsen (`björnhuvud()`),
kanelbullen och lastbilen utan Bulle. Raden är rak, på kulans höjd (y 168), på `IKON_BÅGE`:s x (288, 488, 888, 1088), som i storyboardbilderna.
Slås upp som i 005 och 006 (faller in, trycks ihop, vickar till, saken poppar 70 ms efter skivan) och gungar lugnt i raden; gunget tonas
bort de sista 1,5 s. Vit kant med `kant.lagg(g, { andel: 0.01 })`.

**Ljusen** är `../discoljus.js` (samma i `../slutet/`, klockan är klipptiden): kulan snurrar, käglorna svajar, ljusfläckarna glider och
golvrutorna lyser upp per takt, som i 006, med den bruna kulan.

**Björnstampet** (16b): V:et är bygg.py:s `V_H` (redan 9 % mindre) och 4 % mindre till, med luckan 14 i stället för 30, så att ingen
skärs av kanterna (qa-karaktarer 2026-11-05). Alla stampar, också Igge (fötterna) och Mille (armarna ut och ner).

## Övergången till slutet (17)

Sista bildrutan: lastbilen står stilla på `SLUT_X/Y/H` = (W/2, H − 6, höjd 0,7·H), utan tilt (gunget är 0,8° i takt), Bulle glad och vinkar
med höger arm (`r: [1500, −500 + 700·sin(π·fas)]`, fas = slag sedan BEAT0 i klipptid), raden med fyra småbilder stilla. `slutet/` kan
börja där.

## Ljud

boing (Bulle landar, Ludde landar, Gurras första hopp), pop (Igge rullar ihop sig, varje klistermärke, lastbilen i raden), klapp (Mille på
varje slag), swoosh när Igge rullar runt, klistra (när sakerna fastnar i raden), duns lågt på varannat stamp, brum svagt på varje "brum",
tuta-tut svagt på "tut, tut", hjul-gnissel mycket lågt på en skumpning och pip när kaninen guppar (tyst tills `pip` finns). `../../ljud.md`, med "Fler effekter".

## Att se upp med

- **Uppskattade tider:** rader.txt har radernas början. Björnen slås upp två slag efter "Kotten, björnen," (2:43.7), tutparen ett slag isär
  från 2:58.4 och 2:59.7. Lyssna och flytta `POP`/`TUT` om de inte sitter.
- **Övergången in** är ett rakt klipp från ängen, som storyboarden ("klipp till discot"). Om `angen/` slutar med ett kritsvep ska det
  smula bort här (som 006: `kritsvep(0.5 + 0.3·del(0, 0.4, t), väggfärg)`).
