# Gissa teckningen: Bondgården – text till YouTube (16:9)

Filerna: `gissa-bondgarden-liggande.mp4` (svenska, 3:52) och `gissa-bondgarden-liggande-en.mp4` (engelska, 3:59), liggande 1920×1080 för TV och surfplatta. Byggs med `satt-ihop.sh` (själva bygget i `../gissa-bygg.sh`, LIGG=1), som också skriver `kapitel.txt`, `kapitel-en.txt` och undertexterna `gissa-bondgarden-liggande.srt` / `gissa-bondgarden-liggande-en.srt`. Den stående versionen ligger kvar i `../gissa-bondgarden/`.

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
0:35 En rosa kropp och en knorr
0:57 Ett ullmoln med lockar
1:19 Fyra långa ben och en svans
1:39 En vinge och två gula ben
2:02 En rund kropp och två små ben
2:25 Ränder och en lång svans
2:49 En brun kropp och en svans
3:08 En låda, en hytt och ett rör
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
0:37 A pink body and a curly tail
1:00 A woolly cloud with curls
1:22 Four long legs and a tail
1:44 A wing and two yellow legs
2:06 A round body and two little legs
2:28 Stripes and a long tail
2:53 A brown body and a tail
3:14 A box, a cab and a pipe
3:38 Where is the cow?

#kidssongs #guessthedrawing #tinycrayontv
```

## Innehåll

Byggd som ett avsnitt, i tre delar med 003:s kritsvep (bara det) vid varje skarv, färgerna i tur och ordning:
- **Intro (11,3 s):** formatets intro (`intro/`, kopierat från 015:s "Kort i himlen") med avsnittens jingel; på engelska tiny crayon tv och `format/jingel-en.m4a`. På kortet står "Gissa teckningen" / "Guess the Drawing" där avsnittsnumret brukar stå, temat stort och en liten bild av första teckningen (ko). Introt ingår i första kapitlet (YouTube vill ha minst 10 s per kapitel).
- **Shortsen:** ko, gris, får, häst, höna, anka, katt, hund, traktor och sist samlingen (Var är kon?, som har sitt eget hej då), i mixläget (`render.mjs --liggande --mix`): utan Shortens intro-replik och "Hej då", så att kritan börjar rita direkt och Shorten slutar när teckningen har gått ut. Allt annat är kvar (hmm, frågan, pausen på 4 s, svaret, sagoraden, ljudet och när teckningen blir levande). Den sista Shorten säger hej då.
- **Outro (8 s):** `outro/` (`../gissa-outro.js`): tre av temats figurer tittar upp vid nederkanten och vinkar, sedan poppar logotypen fram stort, en bokstav i taget, under gissa-bad. Outrojingeln finns inte än (sv och en), så den är tyst på den platsen.

Varje del har fått en fast förstärkning till -16 LUFS och en limiter på topparna, så att ljudet är jämnt över skarvarna. Undertexterna kommer från `shorts/undertexter/mix/` (`srt.mjs --mix`).
