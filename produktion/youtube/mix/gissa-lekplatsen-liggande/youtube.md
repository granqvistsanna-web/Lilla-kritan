# Gissa teckningen: Lekplatsen – text till YouTube (16:9)

Filerna: `gissa-lekplatsen-liggande.mp4` (svenska, 2:50) och `gissa-lekplatsen-liggande-en.mp4` (engelska, 2:52), liggande 1920×1080 för TV och surfplatta. Byggs med `satt-ihop.sh` (själva bygget i `../gissa-bygg.sh`, LIGG=1), som också skriver `kapitel.txt`, `kapitel-en.txt` och undertexterna `gissa-lekplatsen-liggande.srt` / `gissa-lekplatsen-liggande-en.srt`. Den stående versionen ligger kvar i `../gissa-lekplatsen/`.

Miniatyr: `thumbnail/miniatyr-strimma.png` (svenska) och `thumbnail/miniatyr-strimma-en.png` (engelska), 1280×720, färgstrimman (`node verktyg/miniatyr-render.mjs gissa-lekplatsen`, raden i `verktyg/miniatyr.html`). Samma bild i den stående och den liggande mixen.

**Inställningar:** Gjort för barn: **Ja**. Inga slutskärmar eller kort (går inte på innehåll för barn). Undertexter: Undertexter → Ladda upp fil → Med tidskoder (avstängda som standard).
- **Svenska (lilla kritan):** språk svenska. Spellistor `Gissa teckningen – Lekplatsen` och `Gissa teckningen`.
- **Engelska (Tiny Crayon TV):** språk engelska. Spellistor `Guess the Drawing – Playground` och `Guess the Drawing`.

Kapitlen säger bara vad kritan ritar före frågan, så att de inte avslöjar svaret (samma regel som Shortsens beskrivningar).

## Svenska

### Titel
```
Gissa teckningen: Lekplatsen ⚽🛝 Vad kan det vara? | lilla kritan
```

### Beskrivning
```
Kritan ritar, streck för streck, och du får gissa vad det blir! Sju teckningar från lekplatsen: en cirkel som färgläggs, en lång stång på fyra ben, en planka med två handtag … Gissa i pausen och se teckningen leka innan den vinkar hej då.

0:00 En cirkel
0:33 En lång stång på fyra ben
0:54 En planka med två handtag
1:17 Bred upptill, en kant och en botten
1:40 En stege och en liten platta
2:01 En ram av plankor
2:20 Ett litet blad och en hals

#barnsång #gissateckningen #lillakritan
```

## English

### Title
```
Guess the Drawing: Playground ⚽🛝 What can it be? | Tiny Crayon TV
```

### Description
```
The crayon draws, line by line, and you guess what it will be! Seven drawings from the playground: a circle that gets colored in, a long bar on four legs, a board with two handles … Guess in the pause and watch the drawing play before it waves bye-bye.

0:00 A circle
0:32 A long bar on four legs
0:55 A board with two handles
1:19 Wide at the top, a rim and a bottom
1:41 A ladder and a little platform
2:03 A frame made of planks
2:23 A little blade and a neck

#kidssongs #guessthedrawing #tinycrayontv
```

## Innehåll

Byggd som ett avsnitt, i tre delar med 003:s kritsvep (bara det) vid varje skarv, färgerna i tur och ordning:
- **Intro (11,3 s):** formatets intro (`intro/`, kopierat från 015:s "Kort i himlen") med avsnittens jingel; på engelska tiny crayon tv och `format/jingel-en.m4a`. På kortet står "Gissa teckningen" / "Guess the Drawing" där avsnittsnumret brukar stå, temat stort och en liten bild av första teckningen (boll). Introt ingår i första kapitlet (YouTube vill ha minst 10 s per kapitel).
- **Shortsen:** boll, gunga, gungbräda, hink, rutschkana, sandlåda, spade, i mixläget (`render.mjs --liggande --mix`): utan Shortens intro-replik och "Hej då", så att kritan börjar rita direkt och Shorten slutar när teckningen har gått ut. Allt annat är kvar (hmm, frågan, pausen på 4 s, svaret, sagoraden, ljudet och när teckningen blir levande). Den sista Shorten säger hej då.
- **Outro (8 s):** `outro/` (`../gissa-outro.js`): tre av temats figurer tittar upp vid nederkanten och vinkar, sedan poppar logotypen fram stort, en bokstav i taget, under gissa-bad. Outrojingeln finns inte än (sv och en), så den är tyst på den platsen.

Varje del har fått en fast förstärkning till -16 LUFS och en limiter på topparna, så att ljudet är jämnt över skarvarna. Undertexterna kommer från `shorts/undertexter/mix/` (`srt.mjs --mix`).
