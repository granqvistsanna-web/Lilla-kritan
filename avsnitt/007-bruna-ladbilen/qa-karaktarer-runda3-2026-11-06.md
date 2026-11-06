# QA karaktärer, runda 3 – avsnitt 007 (2026-11-06)

**Omdöme: nästan pass.** Anteckning 22, 23, 25 och 28 syns i klippet. 24 går bara att bedöma delvis på stillbilder, och 26 (ljud) är inte granskat. Inga figurer snurrar eller vänds, ingen är avskuren i helbilderna, ratten syns alltid och nallen lever. Kvar är tre små saker (se "Fixar").

Granskat: `film/avsnitt-007-grovklipp.mp4` (218,6 s, --snabb, byggt 14:34) var 2,5:e sekund, plus korta serier vid 1:23–1:26 (puffarna), 2:13,5–2:17,5 (bytet och utstigningen) och 3:27–3:32 (stranden). Stillbilder ur en förhandsvisning: ljud och rörelse mellan bilderna är inte bedömda. Tiderna är avsnittstid.

## Anteckningarna #22–#28

| # | Anteckning | Resultat |
|---|---|---|
| 22 | Enklare armar, tassarna på ratten | **Pass.** Tassarna ligger på ratten i alla körbilder (0:33, 0:37, 1:25, 1:35–1:48). Armarna går upp bara där texten ber om det (vinkar 0:30, upp 1:28–1:32). Armarna är kortare och sitter ihop med kroppen. Armarna rakt ut vid 2:16 (i hoppet ur bilen) ser lite stora ut men är fästa |
| 23 | Avgaspuffar fastnar 1:24 | **Pass.** Ingen puff syns 1:23,4–1:25,0, bara själva avgasröret. Röret är en grå stång som ser lös ut (se fix 3) |
| 24 | Lugnare, varannan takt, still kamera | **Delvis (stillbilder).** Kameran står still mellan klippen i alla bilder jag tittat på och Bulle står mest still med tassarna på ratten. Rörelser på varannan takt går inte att avgöra utan rörelse, så det är för huvudsessionens rörelsegranskning |
| 25 | Bulle för liten 2:22 | **Pass.** 2:20–2:23 är Bulle ca dubbelt så stor som förut (närbild), och vid 2:30 fyller han bilden. Men 2:17,7 och 2:25–2:27 är han åter liten bredvid lastbilen (ca 0,6 × lastbilens hytthöjd). Se fix 1 |
| 26 | Fler jippi/bää/brum | **Ej granskat** (ljud) |
| 27 | Djup QA | Detta dokument, tillsammans med huvudsessionens övergångsgranskning |
| 28 | Dekalklistermärken i discot | **Pass.** 2:50–3:05: klistermärkena (kotten, nallen, bullen, spåren, stenarna) sitter på ljusa beigea skivor med oregelbunden handklippt vit kant, saken i mitten, hela och inte avskurna |

## Karaktärskontroller

- **Bulle:** on-model överallt, grön keps, ansikten passar (glad, orolig, ledsen med tår 2:30, sluten 1:42, ögon som blinkar i 1:37,7). Vita kanter hela. Ratten syns alltid, också vid utstigningen (2:17 kvar i hytten).
- **Nallen:** på flaket i alla lastbilsbilder, lutar och guppar lite. Blinkningen syns inte i mina prov (öppna ögon i nästan varje ruta), men den tittar mot Bulle (0:32,7) och rörelsen syns. Nu även med på stranden (3:30–3:35) och som klistermärke i discot. Kontrollera ändå blinkintervallet i `lastbilen.js`.
- **Humlan:** hel och på rätt ställe, ritar spiralen i ängen 2:20–2:23, ingen humla där anteckningen sa nej.
- **Ludde:** sitter på filten, on-model, ansikten passar raderna.
- **Igge:** stubbarmar mjuka och fästa (viftar 2:35–2:37, hand i hand i discot). Bollen gungar bara (2:40, 2:55).
- **Gurra och Mille:** on-model och hela i discot (2:52, 2:58, 3:02).
- **Snurr/vänd:** ingen vänds. Bulle på rutschkanan åker rakt nerför och landar, ingen snurr.
- **Avskuret:** en nalle sitter mot vänsterkanten vid 3:30,6 (se fix 2). I övrigt inget.

## Fixar

1. **Ängen 2:17,0–2:17,7 och 2:25–2:27 (angen):** Bulle är liten bredvid lastbilen och Ludde, ca 0,6 × lastbilen. Vid 2:20–2:23 och 2:30 är han stor. Skalan växlar mellan bilderna. Använd samma storlek (eller samma kameranivå) i hela utstigningen och efteråt.
2. **Stranden 3:30,0–3:35 (slutet):** nallen sitter mot vänsterkanten och beskärs (3:30,6 syns bara halva). Flytta in nallen ca 40 px. Bulle är fortfarande halvt nedsjunken i sandkanten (3:10–3:35); lyft honom eller lägg sandkanten bakom honom.
3. **Avgasröret (vagen-1, vagen-2, ängen 2:17–2:47):** den grå stången under flakets bakkant ser lös ut och blir kvar efter att lastbilen stannat. Fäst vid flaket eller dölj när bilen står still.
4. **Teddyns blink (vagen-1/2, 0:30–1:50):** ingen blink syns i proven. Kontrollera att den är minst 0,15 s och slår till var 3–5:e sekund.

**Inte gjort:** ljud (#26) och rörelse (#24 fullt ut), full rendering. Inget i scenerna är ändrat.

## Bevis

- Puffarna: `/private/tmp/claude-501/-Users-sannagranqvist-Documents-Lilla-kritan/a0283a95-71bd-4c8f-b7bc-3b341c360b74/scratchpad/r3s/puff.jpg`
- Stranden: `.../scratchpad/r3s/beach.jpg`
- Bytet och utstigningen: `.../scratchpad/r3s/tr.jpg`
- Översiktsark var 2,5:e sekund: `.../scratchpad/r3/sheet01.jpg` … `sheet09.jpg` (sheet01 börjar vid 0:22)
