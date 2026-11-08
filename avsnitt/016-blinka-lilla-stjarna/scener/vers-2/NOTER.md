# vers-2 – noter

Bild 16–21, sångtid 1:24.0–1:56.4 (scentid 0–32.4). Börjar i S3, slutar i S4.
Andra varvet (Sannas grovklipp: "face for star and more cuts", "blanket"): hårda klipp på radstart eller slag i stället för glid,
stjärnan med ansikte, närbilder på Nicke och Lage, filten sjunker lite. Radernas tider läses ur rader.txt, slagen ur `kit.takt()` (SLAG).

## Klipplistan (scentid)
Rader: 0 · 5.0 · 9.5 · 15.4 · 21.4 · 27.9. Högst ett klipp inne i varje rad, närbilder 1,5–2,5 s, 11 bilder på 32,4 s (snitt 2,9 s, se Öppet).

| Från | Kamera | Vad händer |
|---|---|---|
| 0 | tva (bara första bilden, S3) → stj | stjärnan `glad` tittar ner på dem (titt −0.7, tittY 0.5), blinkar ^ ^ (1.1–1.8), tindrar (glans 0.2–2.2, glimt, pling 0.7) |
| 2.285 (slag) | tva | de ligger och tittar upp |
| 5.0 (rad) | närbild Nicke [822, 470, 300] | liten gäspning 5.5–6.4 (`gaspar`: slutna ögon, liten öppen mun), gasp (tyst) |
| 6.79 (slag) | tva | |
| 9.5 (rad) | hel → sakta in mot [705, 415, 780] | syrsor loopar lågt (tyst) |
| 15.4 (rad) | stj | sista glimten längs stjärnans högra kant (glitter 15.8), ögonen blir tunga och sluts (`njuter` från 17.3) |
| 17.8 | tva | |
| 21.4 (rad) | närbild Lage [641, 445, 380] | sömnig: tunga ögonlock (blink 0.35), en långsam blinkning |
| 23.276 (slag) | tva | Nicke blundar (23.8), sjunker ihop och byts mot sovbilden i squashens botten (25.48, inget spöke); filten sjunker lite. Lage tittar på henne och blinkar långsamt (26.2–27.8) |
| 27.9 (rad) | närbild Lage | blundar (28.3–29.2, `njuter`), myser mot nallen (lutar 2,5°, 29.2–30.7); filten sjunker lite |
| 30.01 (slag) | tva | Lage `sleep`; allt står still från ca 30.7 = S4 |

Filten: `N.filt.pose({ sy: 1 − 0,015 · bula })`, ett mjukt nedsjunk och tillbaka på 0,4 s; exakt standard (sy 1) i båda skarvarna.
Stjärnan: `glad`, titt 0, tittY 0 i båda skarvarna (i slutet: inga argument = standard, blinkar själv). Mellan 19 och slutet syns den inte, där går den tillbaka.

## Avvikelser
- **Gäspningen:** `ansikten.HUMOR.gaspar = { ogon: 'sleep', mun: 'oppen', b: 0.8 }` läggs till lokalt i sidan (ansikten.js orörd).
- **Kudden:** `N.kudde.pose({})` döljer kudden (natt.js standard `synlig: false`), så scenen använder `{ synlig: true }`. README:s S3/S4 bör säga det.
- **Första bilden:** t = 0 är tva (S3), sedan klipper den direkt till stjärnan, alltså ett klipp på radstarten.
- Den sista glimten går längs stjärnans kant, inte över den, så att den inte täcker ansiktet.

## Öppet
- Snittet är 2,9 s per bild i den här scenen (11 bilder). Regeln gäller snittet över hela avsnittet; om avsnittet hamnar under 3 s kan klippet tillbaka till tva vid 2.285 strykas (då slutar stjärnnärbilden vid 5.0, och den blir för lång för en närbild, så låt i stället hel-bilden i rad 3 vara som den är och stryk Nicke-närbilden).
- Raderna 1:29 och 1:33.5 är uppskattade i rader.txt; scenen följer dem automatiskt.
- syrsor och gasp är tysta platshållare.
