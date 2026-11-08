# Gissa teckningen: Fordon – text till YouTube (16:9)

Filerna: `gissa-fordon-liggande.mp4` (svenska, 3:02) och `gissa-fordon-liggande-en.mp4` (engelska, 3:09), liggande 1920×1080 för TV och surfplatta. Byggs med `satt-ihop.sh` (själva bygget i `../gissa-bygg.sh`, LIGG=1), som också skriver `kapitel.txt`, `kapitel-en.txt` och undertexterna `gissa-fordon-liggande.srt` / `gissa-fordon-liggande-en.srt`. Den stående versionen ligger kvar i `../gissa-fordon/`.

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
0:39 En lång låda med en dörr
1:02 En röd kropp och ett blått ljus
1:26 En vagn och en rund front
1:47 Ett skrov och en flagga
2:10 En fena och ett fönster
2:32 En ram, en sadel och ett styre

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
0:39 A long box with a door
1:03 A red body and a blue light
1:29 A carriage and a round front
1:54 A hull and a flag
2:17 A fin and a window
2:40 A frame, a seat and handlebars

#kidssongs #guessthedrawing #tinycrayontv
```

## Innehåll

Byggd som ett avsnitt, i tre delar med 003:s kritsvep (bara det) vid varje skarv, färgerna i tur och ordning:
- **Intro (11,3 s):** formatets intro (`intro/`, kopierat från 015:s "Kort i himlen") med avsnittens jingel; på engelska tiny crayon tv och `format/jingel-en.m4a`. På kortet står "Gissa teckningen" / "Guess the Drawing" där avsnittsnumret brukar stå, temat stort och en liten bild av första teckningen (bil). Introt ingår i första kapitlet (YouTube vill ha minst 10 s per kapitel).
- **Shortsen:** bil, buss, brandbil, tåg, båt, flygplan, cykel, i mixläget (`render.mjs --liggande --mix`): utan Shortens intro-replik och "Hej då", så att kritan börjar rita direkt och Shorten slutar när teckningen har gått ut. Allt annat är kvar (hmm, frågan, pausen på 4 s, svaret, sagoraden, ljudet och när teckningen blir levande). Den sista Shorten säger hej då.
- **Outro (8 s):** `outro/` (`../gissa-outro.js`): tre av temats figurer tittar upp vid nederkanten och vinkar, sedan poppar logotypen fram stort, en bokstav i taget, under gissa-bad. Outrojingeln finns inte än (sv och en), så den är tyst på den platsen.

Varje del har fått en fast förstärkning till -16 LUFS och en limiter på topparna, så att ljudet är jämnt över skarvarna. Undertexterna kommer från `shorts/undertexter/mix/` (`srt.mjs --mix`).
