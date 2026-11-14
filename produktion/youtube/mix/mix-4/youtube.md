# Mix 4 – Alla sångerna – text till YouTube

Filen: `mix-4.mp4` (byggs med `satt-ihop.sh`). Introt: `intro/` (Mix 3:s intro i gult med titeln "Mix · alla sångerna", 9,0 s; renderas med `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/mix/mix-4/intro`). Miniatyr: `thumbnail/miniatyr-strimma.png` (`node verktyg/miniatyr-render.mjs mix-4`): rosa strimma, "Färg- / sånger" (14 nov, förut "Mix · alla sångerna"; den förra bilden ligger som `miniatyr-strimma-forra.png`), "26 min", egen hjältebild (`thumbnail/hjalte/`: musen, lejonet och lammet på introts himmel och gräs; `node thumbnail/hjalte/figurer.mjs` och `render.mjs` från repots rot, de startar sin egen server).

**Publicerad 14 nov 2026 (offentlig):** https://studio.youtube.com/video/rvq6PHpKOK0/edit · https://youtu.be/rvq6PHpKOK0 (26:17, 10 kapitel, egen miniatyr `miniatyr-strimma.png`). Titeln ändrad samma dag så att färgsångerna syns (förut "Alla sångerna! 🎨🪥 Nio barnsånger i 26 minuter"). Spellistor satta: lilla kritan – alla avsnitt, Färgsånger – lär dig färgerna, Barnsånger för de minsta – sjung med. Gjort för barn: ja, språk svenska.

**Inställningar:** Gjort för barn: **Ja**. Språk: svenska. Spellistor: lilla kritan – alla avsnitt, Färgsånger – lär dig färgerna, Barnsånger för de minsta – sjung med. Inga slutskärmar eller kort (går inte på innehåll för barn).

## Titel
```
Färgsånger! 🎨 Rosa, röda, bruna och gula sången + fler barnsånger | Lilla Kritan
```

## Beskrivning
```
Alla nio sångerna i en lång stund med Lilla Kritan. Sjung med i rosa, röda, bruna och gula sången: musen hoppar på rosa moln, kaninen letar rött, björnen letar brunt och lejonet flyger helikopter upp till solen. Borsta tänderna med katten, kaninen och pandan, med dinosaurierna och med djuren på bondgården. Ge lammet strumpor i Bä, bä, vita lamm, och vinka god natt till stjärnan i Blinka lilla stjärna.

0:00 Lilla Kritan
0:09 Rosa sången
3:35 Borsta, borsta tänderna (gulliga djur)
6:20 Röda sången
8:54 Bä, bä, vita lamm
10:15 Bruna sången
13:56 Borsta, borsta tänderna (dinosaurier)
16:16 Gula sången
20:04 Borsta, borsta tänderna (bondgården)
23:51 Blinka lilla stjärna

#barnsång #barnsånger #lillakritan
```

## Innehåll (26:17, byggd 14 nov, −15,1 LUFS, topp −0,9 dBFS)

`kapitel.txt` (skrivs av `satt-ihop.sh`) har alla delar. Bara sångerna i art direction v2, inga Shorts eller Tittut (Sanna 14 nov): 019 rosa, 030 Borsta (gulliga djur), 013 röda, 015 Bä, bä, vita lamm, 007 bruna v2, 033 Borsta (dinosaurier), 011 gula, 031 Borsta (bondgården) och 016 Blinka lilla stjärna sist (hunden somnar, sista tonen tonas ut). 014 Gröna sången och de äldre v1-sångerna (003–006) är inte med.
Sångerna börjar efter sitt intro (019: 11,3 s, borstasångerna 8,6 s där sången börjar under det turkosa kritsvepet, de andra 9 s) och kortas aldrig. Kritsvepet i nästa sångs färg på varje skarv; borstasångernas turkos är `2fb5a8` (mätt ur 030, renderad i `../mix-1/kritsvep/bilder/`).
031 är Murekalåten utan sång (instrumental) och har ingen egen YouTube-sida än; beskrivningen säger därför "borsta", inte "sjung".
Ljudet: sångerna jämnade till ca −15 LUFS (bara nivån, inget klipps). Bygg om mixen innan uppladdning om någon sång renderas om.
