---
name: miniatyrer
description: YouTube-miniatyrer för Lilla Kritan och Tiny Crayon TV i husets stil, "färgstrimman" – en sned kritstrimma i avsnittets färg till vänster med titeln i Fredoka, en stor gul cirkel med videons ungefärliga längd ("4 min", "25 min") som klipps av hörnet, och en nära hjältebild med ett glatt ansikte till höger. Svensk och engelsk bild ur samma data, B-bilder för A/B-test för hand (Test & Compare fungerar inte för barnvideor), granskning i mobilstorlek med tidsbrickan, render till PNG under 2 MB. Use when the user says "miniatyr", "thumbnail", "miniatyrbild", "ny thumbnail", "thumbnail för avsnitt", "färgstrimman", or an episode or mix is ready for YouTube and has no thumbnail.
---

# Miniatyrer – färgstrimman

Alla miniatyrer ser likadana ut, så att en förälder känner igen kanalen i flödet och ett barn hittar en glad figur att peka på.
Stilen bestämdes 2026-11-07 (skisser i tre rundor, Sanna valde): **sned strimma, ingen glans, Fredoka, inget kanalnamn**.

```
┌──────────┬─────────────────────────┐
│ (4 min) ╱                          │  cirkeln: stor, gul, klipps av hörnet
│        ╱      ☺  hjälten           │
│ Gröna ╱       nära, glad,          │  titeln: färgordet stort, resten mindre, lutad som kanten
│ sången╱       ansiktet stort       │
│      ╱                     [3:37]  │  högra nedre hörnet: YouTubes tidsbricka, inget viktigt där
└─────╱────────────────────────────┘
  strimman i avsnittets färg, vit klistermärkeskant, mjuk skugga
```

## Delarna

| Fil | Vad |
|---|---|
| `verktyg/miniatyr.js` | Strimman, titeln och cirkeln (`miniatyr.strimma(parent, { farg, titel, cirkel, kanal })`; granskningssidan fyller cirkeln med längden). Mått i en 1280×720-ruta. Ljusa färger (gul, vit, ljusrosa) får mörk text och vit cirkel av sig själv. |
| `verktyg/miniatyr-textur.png` | Strimmans kritstruktur: en lugn gråskaletextur ur OpenArt ("Drag 1", vald 2026-11-07) som läggs över färgen med soft-light, så att samma fil fungerar för alla färger. Byt den bara mot en lika lugn. |
| `verktyg/miniatyr.html` | Listan `MINIATYRER` (en rad per bild) och granskningen: alla stort, i mobilstorlek (168 px) och på datorns startsida, med tidsbricka och YouTube-titel. Tangenter: `e` engelska, `d` mörkt flöde, `k` kanalnamn på/av. `?id=014&en` visar en bild ensam (för render). |
| `verktyg/miniatyr-render.mjs` | `node verktyg/miniatyr-render.mjs 014` → `miniatyr-strimma.png` och `miniatyr-strimma-en.png` (1280×720) i avsnittets `thumbnail/`. `014-b` ger B-bilden. Utan id: alla. |
| `produktion/youtube/miniatyr-test.md` | Loggen för A/B-testen. |
| `avsnitt/NNN/thumbnail/miniatyr-utan-text.png` | Hjältebilden, 1280×720, utan text. |

## Steg för en ny miniatyr

1. **Hjältebilden.** Bäst är en egen bild ur avsnittets kodscener, poserad för miniatyren. Mall: `avsnitt/014-grona-traktorn/thumbnail/hjalte/`
   (kit-scenen med vägen, inga träd eller moln, traktorn med Lova, `kit.kor(() => b.pose(pose), 4)` och render vid 3 s, eftersom poserna glider in):
   `node ../scener/render.mjs hjalte 3` i `thumbnail/`, sedan `ffmpeg -i hjalte/stills/3.jpg -vf scale=1280:720 miniatyr-utan-text.png`.
   Går det inte, ta en bild ur filmen (`ffmpeg -ss <s> -i film/… -frames:v 1`) eller en äldre `miniatyr-utan-text.png`.
   - **En hjälte med ansikte, kameran nära.** Ansiktet ska synas i 168 px: sikta på att ansiktet är minst en femtedel av bildens höjd.
     Glad: skrattar, armarna ut eller upp, står upp i fordonet så att kroppen syns.
   - Hjälten står i den högra delen, med ansiktet kring x 800–950 av 1280. Vänstra tredjedelen täcks av strimman, så lämna den tom (himmel, vägg).
   - Högst tre figurer, inget annat i avsnittets färg än hjältens sak, inga träd och moln som skräpar ner. Bara sådant som finns i avsnittet.
   - Figurer vänds aldrig runt (2D-urklipp), de speglas högst.
2. **En rad i `MINIATYRER`** i `verktyg/miniatyr.html`: `id`, `bild`, `farg`, och `sv` och `en` med `tid` (filmens längd, `ffprobe -v error -show_entries format=duration -of csv=p=0 film/…`), `titel` och `yt` (YouTube-titeln ur `youtube.md`). En gammal bild med hjälten för långt bort zoomas med `hjalte: [skala, x, y]` (hjältens nederkant mitt; den hamnar vid 870, 705). Mixar får `ut:` (mappen bilderna sparas i).
3. **Granska** från repots rot: `python3 -m http.server`, öppna `/verktyg/miniatyr.html`. Titta på mobilraden först: syns ansiktet, går titeln att läsa, skiljer sig bilden från de andra? Kolla engelska (`e`) och mörkt flöde (`d`).
4. **Rendera:** `node verktyg/miniatyr-render.mjs <id>`. Kontrollera PNG:erna (under 2 MB).

## Regler

- **Färgen:** färgsånger tar sin färg (`farg`). Andra avsnitt tar huvudsakens eller platsens färg; den får gärna vara samma som hjälten, den vita kanten håller isär dem.
- **Titeln:** två rader, färgordet eller huvudordet först och störst. Högst tre ord. Engelska kortas: "Green Song", inte "The Green Song".
- **Inga djurnamn** i titeln, som i allt som sägs (CLAUDE.md). "Rosa sången", aldrig figurens namn.
- **Cirkeln visar videons längd, ungefär:** hela minuter, avrundat (3:05 → "3 min", 3:34 → "4 min", mixen 25:10 → "25 min"). Sanna 2026-11-07: föräldern ser direkt hur lång stund det är. Längden tas ur respektive språks film (`ffprobe`) och står som `tid` under `sv` och `en`, eftersom klippen är olika långa (Rosa sången 3:05, The Pink Song 3:34). Ändras filmen, ändra `tid` och rendera om.
- **Inget kanalnamn i bilden.** YouTube visar namn och profilbild under miniatyren, och i 168 px går texten inte att läsa. Igenkänningen kommer från strimman. (`--kanal` finns om det behövs i ett särskilt fall.)
- **Ingen glans**, inga gradienter, inga pilar, ingen text som skriker. Inget läskigt, inga överraskningsansikten och inget som inte händer i filmen: YouTube straffar vilseledande och "sensationella" barnminiatyrer.
- **Inga kända serier, figurer eller varumärken** (CLAUDE.md).
- Rör inte en publicerad miniatyr (`miniatyr.png`). Strimman sparas bredvid som `miniatyr-strimma*.png`, och Sanna byter själv i YouTube Studio.

## A/B-test

YouTubes **Test & Compare fungerar inte för videor gjorda för barn** (hjälpsidan: *"You cannot use this feature on videos that are made for kids"*, kollat 2026-11-07).
Därför testar vi för hand, med en växling vecka för vecka. Det är svagare än ett riktigt A/B-test, så följ upplägget noga.

**Göra B-bilden.** Lägg `b: { …, test: 'vad som prövas' }` på raden i `MINIATYRER`. B blir en kopia av A med bara det som står i `b` ändrat:
**en sak i taget** (hjältens utsnitt eller pose, titelns ord, cirkeln med eller utan, färgen). Granskningssidan visar B direkt efter A.
`node verktyg/miniatyr-render.mjs 014-b` ger `miniatyr-strimma-b.png` och `-b-en.png`. Exempel: 014-b, ansiktet närmare (`hjalte: [1.3, 800, 531]`).

**Köra testet** (en video som är minst två veckor gammal, så att premiärtoppen är över):
1. Fyra veckor, byt bild samma veckodag varje gång. **Svenska kanalen A, B, A, B. Engelska kanalen B, A, B, A** (omvänd ordning tar bort veckans slump: lov, helger, algoritmen).
2. Efter varje vecka: Studio → videon → Analys → Räckvidd, välj veckan, skriv in **visningar av miniatyren (impressions)**, **klickfrekvens (CTR)** och **genomsnittlig visningstid** i loggen.
3. Mindre än ca 1 000 visningar av miniatyren per vecka: förläng med två veckor till (A, B) innan du drar slutsatser.
4. **B vinner** bara om B:s CTR är högre i alla B-veckor än i veckorna bredvid, och minst ca 15 % högre totalt, utan att visningstiden sjunker.
   Annars **behåll A** (husstilen). Lika = A.
5. En vinst som gäller stilen (t.ex. närmare ansikten) förs in under Regler ovan, med datum och testets rad i loggen.

**Loggen:** `produktion/youtube/miniatyr-test.md`, en rad per vecka och kanal, och en slutsats per test.

## Varför stilen ser ut så här

- Barnet pekar, föräldern väljer. Bilden ska vara lätt att peka på (ett stort glatt ansikte) och kännas lugn och trygg för en förälder.
- Föräldern läser, barnet gör det inte: därför bara två–tre ord, och samma ram varje gång så att kanalen känns igen.
- En studie av ca 38 600 lärande barnvideor fann att miniatyrer med saker drog fler visningar än med människor; fordon och djur passar kanalen.
- Bilden bedöms i 168 px (mobil, nästa video), inte i full storlek. Där syns ett ansikte och en färg, sällan mer.
