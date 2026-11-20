# Apans röst: `uaa-gullig`

Apan i Kritans ABC A (riggen `apan-alfons`) har ingen egen röst i ljudbanken. Till dess låter den med kaninens `hej-babbel` och `oj-oj` (`APA` i `index.html`). Den här familjen ersätter dem. Den följer receptet för en röst per figur i `format/bilderbok.md` (*En röst per figur*): samma känslonummer som `noff-gullig`, `brum-gullig` och `vov-gullig`, så att apan kan användas i fler avsnitt.

## ElevenLabs

Sound Effects, **duration 1,2 s** (ställ in själv, inte auto; fnisset 1,5 s), **prompt influence 0,55**. Gör 4 per prompt och välj den gladaste. Inga riktiga ord, inget skrik, inget argt (riktiga apor skriker, den här ska vara en liten tecknad apunge).

Klipp bort tystnaden före och efter, toppen −3 dBFS, exportera m4a och lägg filerna i `assets/ljud/effekter/uaa-gullig/uaa-gullig-N.m4a`, där N är känslans nummer. Lyssna och bekräfta vilken tagning som är vilken känsla innan de läggs in, och skriv in dem i `assets/ljud/effekter/README.md`.

| Fil | Känsla | Används i A |
|---|---|---|
| `uaa-gullig-1` | 1 hej | "En apa!" i närbild |
| `uaa-gullig-2` | 2 förtjust, glad | när den udda åker ut (närbild, hurra) och när apan hoppar ut och dansar |
| `uaa-gullig-3` | 3 fniss | apans eget ljud efter ordet (`LAT.apa`), när klossen hoppar och snurrar i dansen |
| `uaa-gullig-5` | 5 nyfiken, oj | när en ny udda kloss dunsar ner (närbild, förvånad) |
| `uaa-gullig-8` | 8 hej då | när bilen kör iväg och apan vinkar |

```
uaa-gullig-1: Tiny cute cartoon baby monkey saying a happy little hello, a short bright "oo-oo!" rising in pitch, sweet squeaky toddler-like voice, no real words, close dry recording, no music, no background
uaa-gullig-2: Tiny cute cartoon baby monkey delighted and excited, a bouncy "oo-oo-aa-aa!" going up, sweet squeaky toddler-like voice, joyful but soft, no shrieking, no real words, close dry recording, no music, no background
uaa-gullig-3: Tiny cute cartoon baby monkey giggling, a short bubbly "hee-hee-hoo!", sweet squeaky toddler-like voice, playful and soft, no real words, close dry recording, no music, no background
uaa-gullig-5: Tiny cute cartoon baby monkey surprised and curious, a soft rising "ooh?" with a tiny gasp, sweet squeaky toddler-like voice, wondering, not scared, no real words, close dry recording, no music, no background
uaa-gullig-8: Tiny cute cartoon baby monkey saying a warm little goodbye, a gentle "oo-oo, aa" falling softly at the end, sweet squeaky toddler-like voice, friendly, no real words, close dry recording, no music, no background
```

## När filerna finns

Byt `APA` i `index.html` till:

```js
const APA = { hej: 'uaa-gullig/uaa-gullig-1', glad: 'uaa-gullig/uaa-gullig-2', fniss: 'uaa-gullig/uaa-gullig-3', oj: 'uaa-gullig/uaa-gullig-5', hejda: 'uaa-gullig/uaa-gullig-8' };
```

Saknas en fil blir det tyst där (scenen hoppar över ljud som inte finns), så byt först när alla fem ligger på plats. Lyssna på volymen i en `--snabb`-förhandsvisning: `APA`-ljuden går på 0,8–0,9.
