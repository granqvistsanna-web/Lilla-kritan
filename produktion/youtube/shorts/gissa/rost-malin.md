# Gissa teckningen – ny VO med Malin för klippen i mix-3

**Klart 2026-11-13.** Tagningen spelades in i ElevenLabs in-app-browser (Eleven v3, rösten Malin,
stability 0,5), delades upp i 35 filer och ersatte de gamla rösterna; alla sexton Shorts i mix-3
renderades om (`--liggande --mix`) och mixen byggdes om. Lärdomar till nästa tagning:

- ElevenLabs textfält genererar bara första stycket om texten har tomma rader – klistra in texten
  som ett flöde (raderna åtskilda med blanksteg, taggarna inline).
- Uppdelningen gjordes med silencedetect (pauskarta, snitt i pausmitt) och verifierades med whisper,
  inte med `verktyg/dela-tagning.py` (whispertiderna utsmetade vid korta pauser).
- De gamla filerna ligger i `assets/ljud/roster/fore-malin-2026-11-13/`.

Sanna 2026-11-13: "egentligen borde alla gissa teckningar få ny VO med Malin – vi kanske kan göra ny VO för de
klipp som är med i mixen." Det här är replikerna för de sexton Shorts som ligger i mix-3, i mixens ordning.
I mixläget sägs bara hmm, frågan, svaret och sagan (inget intro, inget hej då), så listan är kort.

ElevenLabs, **Eleven v3**, rösten **Malin** (Professional Swedish Narration), stability 0,5 – samma upplägg
som hundens Tittut-tagning. Klistra in hela blocket och generera i **en tagning**. Spara mp3:an i Hämtade
filer och säg till, så delar agenten upp den (listan med filnamn i samma ordning står i
[`malin-tagning.txt`](malin-tagning.txt)), lägger undan de gamla filerna, renderar om de sexton Shortsen
(`--liggande --mix`) och bygger om mix-3.

Fyra av klippen (traktor, får, ko, anka) saknar sin `saga`-fil i dag – raden finns med här, så blir de
kompletta. Tåget har ingen saga i sin konfig, bara svaret.

```
[thoughtful] Hmm…

[surprised] Oj! Titta…

[thoughtful] Mmm… jag undrar…

[curious] Vad blir det?

[surprised] En traktor!

[playful] Traktorn säger tuff tuff.

[excited] En hund!

[playful] Hunden säger vov.

[surprised] Ett får!

[playful] Fåret säger bä.

[excited] En häst!

[playful] Hästen säger gnägg.

[surprised] En brandbil!

[playful] Brandbilen säger ijo ijo.

[excited] En båt!

[happy] Båten guppar.

[surprised] En buss!

[happy] Bussen kör.

[excited] Ett tåg!

[surprised] En cykel!

[playful] Cykeln säger pling pling.

[excited] En höna!

[playful] Hönan säger kakaka.

[surprised] En ko!

[playful] Kon säger muu.

[excited] En gris!

[playful] Grisen säger nöff.

[surprised] En bil!

[playful] Bilen säger tut tut.

[excited] En boll!

[happy] Bollen studsar.

[surprised] En anka!

[playful] Ankan säger kvack.

[excited] En katt!

[playful] Katten säger mjau.
```

Senare, om alla Gissa teckningen ska röstas om helt (även de fristående Shortsen och Skogen): då behövs
också hmm-2 och hmm-5, intro-1…5 och hej-da-1…5 med Malin, plus svar/saga för resten av klippen. De delade
filerna byts på plats (`assets/ljud/roster/`), så nya renderingar får Malin automatiskt.
