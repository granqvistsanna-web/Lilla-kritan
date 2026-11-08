# Gissa teckningen: Bondgården – text till YouTube

Filerna: `gissa-bondgarden.mp4` (svenska, 3:44) och `gissa-bondgarden-en.mp4` (engelska, 3:50), stående 1080×1920. Byggs med `satt-ihop.sh` (själva bygget i `../gissa-bygg.sh`), som också skriver `kapitel.txt`, `kapitel-en.txt` och undertexterna `gissa-bondgarden.srt` / `gissa-bondgarden-en.srt`.

Miniatyr: `thumbnail/miniatyr-strimma.png` (svenska) och `thumbnail/miniatyr-strimma-en.png` (engelska), 1280×720, färgstrimman (`node verktyg/miniatyr-render.mjs gissa-bondgarden`, raden i `verktyg/miniatyr.html`). Samma bild i den stående och den liggande mixen.

**Inställningar:** Gjort för barn: **Ja**. Inga slutskärmar eller kort (går inte på innehåll för barn). Undertexter: Undertexter → Ladda upp fil → Med tidskoder (avstängda som standard).
- **Svenska (lilla kritan):** språk svenska. Spellistor `Gissa teckningen – Bondgården` och `Gissa teckningen`.
- **Engelska (Tiny Crayon TV):** språk engelska. Spellistor `Guess the Drawing – Farm` och `Guess the Drawing`.

Kapitlen säger bara vad kritan ritar före frågan, så att de inte avslöjar svaret (samma regel som Shortsens beskrivningar).

## Svenska

### Titel
```
Gissa teckningen: Bondgården 🐄🚜 Vad kan det vara? | lilla kritan
```

### Beskrivning
```
Kritan ritar, streck för streck, och du får gissa vad det blir! Nio teckningar från bondgården: en stor kropp med fläckar, en liten knorr, ett ullmoln med lockar … Gissa i pausen, säg ljudet och vinka hej då. Sist står tre från bondgården bredvid varandra. Kan du peka på den du letar efter?

0:00 Fyra ben och fläckar
0:25 En rosa kropp och en knorr
0:49 Ett ullmoln med lockar
1:10 Fyra långa ben och en svans
1:32 En vinge och två gula ben
1:58 En rund kropp och två små ben
2:22 Ränder och en lång svans
2:46 En brun kropp och en svans
3:07 En låda, en hytt och ett rör
3:31 Var är kon?

#barnsång #gissateckningen #lillakritan
```

## English

### Title
```
Guess the Drawing: Farm 🐄🚜 What can it be? | Tiny Crayon TV
```

### Description
```
The crayon draws, line by line, and you guess what it will be! Nine drawings from the farm: a big body with spots, a curly tail, a woolly cloud with little curls … Guess in the pause, make the sound and wave bye-bye. At the end, three farm friends stand side by side. Can you point to the one we are looking for?

0:00 Four legs and spots
0:27 A pink body and a curly tail
0:51 A woolly cloud with curls
1:14 Four long legs and a tail
1:37 A wing and two yellow legs
2:01 A round body and two little legs
2:24 Stripes and a long tail
2:50 A brown body and a tail
3:12 A box, a cab and a pipe
3:37 Where is the cow?

#kidssongs #guessthedrawing #tinycrayontv
```

## Innehåll

Shortsen i ordning: ko, gris, får, häst, höna, anka, katt, hund, traktor och sist samlingen (Var är kon?), hela och oförändrade. Short → Short på tomt papper; samlingen börjar med 003:s kritsvep i grönt (`4fae4a`). Inget eget intro: mixen börjar direkt med första Shorten, som själv säger "Gissa teckningen!". Varje Short har fått en fast förstärkning till -16 LUFS och en limiter på topparna, så att ljudet är jämnt över skarvarna (de engelska Shortsen var 2–4 dB tystare än de svenska).
