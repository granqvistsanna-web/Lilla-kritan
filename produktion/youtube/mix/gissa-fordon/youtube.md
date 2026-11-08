# Gissa teckningen: Fordon – text till YouTube

Filerna: `gissa-fordon.mp4` (svenska, 2:53) och `gissa-fordon-en.mp4` (engelska, 2:59), stående 1080×1920. Byggs med `satt-ihop.sh` (själva bygget i `../gissa-bygg.sh`), som också skriver `kapitel.txt`, `kapitel-en.txt` och undertexterna `gissa-fordon.srt` / `gissa-fordon-en.srt`.

Miniatyr: `thumbnail/miniatyr-strimma.png` (svenska) och `thumbnail/miniatyr-strimma-en.png` (engelska), 1280×720, färgstrimman (`node verktyg/miniatyr-render.mjs gissa-fordon`, raden i `verktyg/miniatyr.html`). Samma bild i den stående och den liggande mixen.

**Inställningar:** Gjort för barn: **Ja**. Inga slutskärmar eller kort (går inte på innehåll för barn). Undertexter: Undertexter → Ladda upp fil → Med tidskoder (avstängda som standard).
- **Svenska (lilla kritan):** språk svenska. Spellistor `Gissa teckningen – Fordon` och `Gissa teckningen`.
- **Engelska (Tiny Crayon TV):** språk engelska. Spellistor `Guess the Drawing – Vehicles` och `Guess the Drawing`.

Kapitlen säger bara vad kritan ritar före frågan, så att de inte avslöjar svaret (samma regel som Shortsens beskrivningar).

## Svenska

### Titel
```
Gissa teckningen: Fordon 🚗🚂 Vad kan det vara? | lilla kritan
```

### Beskrivning
```
Kritan ritar, streck för streck, och du får gissa vad det blir! Sju teckningar som kör, tuffar, seglar och flyger: ett tak och två fönster, en lång låda med en dörr, ett blått ljus … Gissa i pausen, säg ljudet och vinka hej då när de åker iväg.

0:00 Ett tak och två fönster
0:30 En lång låda med en dörr
0:55 En röd kropp och ett blått ljus
1:19 En vagn och en rund front
1:41 Ett skrov och en flagga
2:05 En fena och ett fönster
2:30 En ram, en sadel och ett styre

#barnsång #gissateckningen #lillakritan
```

## English

### Title
```
Guess the Drawing: Vehicles 🚗🚂 What can it be? | Tiny Crayon TV
```

### Description
```
The crayon draws, line by line, and you guess what it will be! Seven drawings that drive, chug, sail and fly: a roof and two windows, a long box with a door, a blue light … Guess in the pause, make the sound and wave bye-bye as they go.

0:00 A roof and two windows
0:30 A long box with a door
0:55 A red body and a blue light
1:22 A carriage and a round front
1:47 A hull and a flag
2:12 A fin and a window
2:37 A frame, a seat and handlebars

#kidssongs #guessthedrawing #tinycrayontv
```

## Innehåll

Shortsen i ordning: bil, buss, brandbil, tåg, båt, flygplan, cykel, hela och oförändrade. Short → Short på tomt papper (allt är en och samma del, så inget kritsvep). Inget eget intro: mixen börjar direkt med första Shorten, som själv säger "Gissa teckningen!". Varje Short har fått en fast förstärkning till -16 LUFS och en limiter på topparna, så att ljudet är jämnt över skarvarna.
