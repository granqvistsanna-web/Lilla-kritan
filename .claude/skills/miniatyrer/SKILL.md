---
name: miniatyrer
description: YouTube-miniatyrer för Lilla Kritan och Tiny Crayon TV i husets stil, "färgstrimman" – en sned kritstrimma i avsnittets färg till vänster med titeln i Fredoka, en stor gul cirkel med avsnittsnumret (eller "25 min" i mixar) som klipps av hörnet, och en nära hjältebild med ett glatt ansikte till höger. Svensk och engelsk bild ur samma data, granskning i mobilstorlek med tidsbrickan, render till PNG under 2 MB. Use when the user says "miniatyr", "thumbnail", "miniatyrbild", "ny thumbnail", "thumbnail för avsnitt", "färgstrimman", or an episode or mix is ready for YouTube and has no thumbnail.
---

# Miniatyrer – färgstrimman

Alla miniatyrer ser likadana ut, så att en förälder känner igen kanalen i flödet och ett barn hittar en glad figur att peka på.
Stilen bestämdes 2026-11-07 (skisser i tre rundor, Sanna valde): **sned strimma, ingen glans, Fredoka, inget kanalnamn**.

```
┌──────────┬─────────────────────────┐
│ (14)    ╱                          │  cirkeln: stor, gul, klipps av hörnet
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
| `verktyg/miniatyr.js` | Strimman, titeln och cirkeln (`miniatyr.strimma(parent, { farg, titel, cirkel, kanal })`). Mått i en 1280×720-ruta. Ljusa färger (gul, vit, ljusrosa) får mörk text och vit cirkel av sig själv. |
| `verktyg/miniatyr.html` | Listan `MINIATYRER` (en rad per bild) och granskningen: alla stort, i mobilstorlek (168 px) och på datorns startsida, med tidsbricka och YouTube-titel. Tangenter: `e` engelska, `d` mörkt flöde, `k` kanalnamn på/av. `?id=014&en` visar en bild ensam (för render). |
| `verktyg/miniatyr-render.mjs` | `node verktyg/miniatyr-render.mjs 014` → `miniatyr-strimma.png` och `miniatyr-strimma-en.png` (1280×720) i avsnittets `thumbnail/`. Utan id: alla. |
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
2. **En rad i `MINIATYRER`** i `verktyg/miniatyr.html`: `id`, `bild`, `farg`, `cirkel`, `tid` (filmens längd, bara för granskningen), `sv` och `en` med `titel` och `yt` (YouTube-titeln ur `youtube.md`). En gammal bild med hjälten för långt bort zoomas med `hjalte: [skala, x, y]` (hjältens nederkant mitt; den hamnar vid 870, 705). Mixar får `ut:` (mappen bilderna sparas i).
3. **Granska** från repots rot: `python3 -m http.server`, öppna `/verktyg/miniatyr.html`. Titta på mobilraden först: syns ansiktet, går titeln att läsa, skiljer sig bilden från de andra? Kolla engelska (`e`) och mörkt flöde (`d`).
4. **Rendera:** `node verktyg/miniatyr-render.mjs <id>`. Kontrollera PNG:erna (under 2 MB).

## Regler

- **Färgen:** färgsånger tar sin färg (`farg`). Andra avsnitt tar huvudsakens eller platsens färg; den får gärna vara samma som hjälten, den vita kanten håller isär dem.
- **Titeln:** två rader, färgordet eller huvudordet först och störst. Högst tre ord. Engelska kortas: "Green Song", inte "The Green Song".
- **Inga djurnamn** i titeln, som i allt som sägs (CLAUDE.md). "Rosa sången", aldrig figurens namn.
- **Cirkeln:** avsnittsnumret (`['14']`). Mixar: längden (`['25', 'min']`). Skriv aldrig minuter på ett avsnitt: YouTube visar redan tiden i hörnet, och "14" är numret, inte längden.
- **Inget kanalnamn i bilden.** YouTube visar namn och profilbild under miniatyren, och i 168 px går texten inte att läsa. Igenkänningen kommer från strimman. (`--kanal` finns om det behövs i ett särskilt fall.)
- **Ingen glans**, inga gradienter, inga pilar, ingen text som skriker. Inget läskigt, inga överraskningsansikten och inget som inte händer i filmen: YouTube straffar vilseledande och "sensationella" barnminiatyrer.
- **Inga kända serier, figurer eller varumärken** (CLAUDE.md).
- Rör inte en publicerad miniatyr (`miniatyr.png`). Strimman sparas bredvid som `miniatyr-strimma*.png`, och Sanna byter själv i YouTube Studio.

## Testa vad som fungerar

YouTubes **Test & Compare fungerar inte för videor gjorda för barn**, så A/B-test i Studio går inte. Gör så här i stället:
byt en sak i taget på en äldre video, vänta två veckor och jämför klickfrekvens (CTR) och visningar från "Bläddra" och "Föreslagna videor" före och efter i Studio.
Det är en svag signal (inget kontrollerat test), så skriv ner varje byte med datum, vad som ändrades och siffrorna före och efter.

## Varför stilen ser ut så här

- Barnet pekar, föräldern väljer. Bilden ska vara lätt att peka på (ett stort glatt ansikte) och kännas lugn och trygg för en förälder.
- Föräldern läser, barnet gör det inte: därför bara två–tre ord, och samma ram varje gång så att kanalen känns igen.
- En studie av ca 38 600 lärande barnvideor fann att miniatyrer med saker drog fler visningar än med människor; fordon och djur passar kanalen.
- Bilden bedöms i 168 px (mobil, nästa video), inte i full storlek. Där syns ett ansikte och en färg, sällan mer.
