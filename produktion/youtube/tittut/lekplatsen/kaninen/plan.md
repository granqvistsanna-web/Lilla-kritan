# Tittut – kaninen på lekplatsen (plan)

**Status:** godkänd av Sanna 2026-11-11 och byggd som utkast ([`index.html`](index.html), stillbilder i `stills/`). Samma dag bytte Sanna hinken mot **ett stort äppelträd** och ville ha **en mycket större gunganka som gungar**. Kontrollerat på stillbilder; förhandsvisningen är inte renderad. Malins nya repliker saknas. Byggs efter [`format/tittut.md`](../../../../../format/tittut.md).

Figuren är v2-Kanel (`kaninen-kanel-v2`, låst ✅, 420 px i bild), platsen är lekplatsen (`bakgrunder/lekplatsen.md`). Hon kommer in och går ut till vänster, framför anden.

## Gömställena

Leoparden har bollen, kullen och sandlådan, hunden kullen, sandlådan och lekstugan. Kaninen får tre andra:

| Sak | Bild | I bild | Hon kommer fram |
|---|---|---|---|
| **gunganden** | `lekplatsen-saker/gunganka.png` (kant omgjord till 5 px i bild) | `[340, 905]`, h 660, `hel`, `vick: 5` | `upp` över andryggen, `sida` vid stjärten |
| **det stora äppelträdet** | `lekplatsen-saker/appeltrad.png`: 013:s `appelbacken-saker/cut/appeltrad.png` med stammen 1,9 gånger bredare (kronan och äpplena orörda) och 5 px kant. 013:s original är orört | `[1080, 860]`, h 1280, `gom: 14`, bakom de andra; kronans topp går ut ur bild | `sida` vid stammen |
| **stöveln** | `lekplatsen-saker/stovel.png` (kant omgjord till 5 px i bild) | `[1640, 905]`, h 660, `gom: -63` | `ur`, huvudet upp ur skaftet |

Stammen gjordes bredare för att ingen av de befintliga äppelträdens stammar var bredare än kaninen: hon syntes på båda sidor.

Motorvalen (alla i `format/tittut.md`):
- **`hel`:** hela anden döljer, så benen syns inte mellan fjäderns varv.
- **`vick`:** anden gungar på fjädern (5°, tonar ut på ca 2 s) när hon gömmer sig bakom den, när den skakar och när hon kommer fram. Skakningen låter `gung-knarr`.
- **`gom`:** var hon står bakom saken, i px från bildens mitt (stöveln: bakom skaftet, inte tån).
- **`retas: 'oron'`:** i pauserna kikar öronspetsarna fram och vickar först, sedan huvudet.

## Fem rundor

```js
rundor: [
  ['gunganka', 'upp'],              // upp över andryggen
  ['stovel', 'ur'],                 // huvudet upp ur stöveln
  ['appeltrad', 'sida'],            // ut vid sidan av stammen
  ['gunganka', 'sida'],             // "En gång till!": ut vid andens stjärt
  ['appeltrad', 'ur', 'stovel'],    // överraskningen: bakom trädet, upp ur stöveln
],
skakar: ['gunganka'],
```

## Malins repliker (`roster/tittut/kanin-lekplats/`)

**Kopierat (finns):** `lek-1` (från `hund-lekplats`), `gomma-1`, `kul-1`, `dar-ar-du-1`, `-2`, `busig-1`, `igen-1`, `tittut-4`, `slut-1`, `hej-da-1`, `hej-hej-1` (från `kanin/`). *"Hej kaninen!"* är den delade `kanin-hej.m4a`.

**Nya rader till Malin**, i rundornas ordning (dela till filnamnen till vänster):

```
borta-1          [whispers] Bakom anden… borta!
tittut-1         [laughs] Tittut! Uppe på anden!
borta-igen-1     [mischievously] Ner i stöveln…
tittut-2         [giggles] Titt-ut! Ur stöveln!
borta-igen-2     [whispers] Bakom trädet… borta!
tittut-3         [excited] Titt… ut! Vid trädet!
borta-2          [playful] Anden gungar… borta!
jag-sag-nagot-1  [whispers] Jag ser två långa öron…
borta-igen-3     [mischievously] Bakom trädet igen…
tittut-5         [surprised] Oj! Tittut! Ur stöveln!
```

Efter klippningen mäts "ut" i `tittut-1`, `-2`, `-3` och `-5` (whisper) och läggs i `UT` under `kanin-lekplats/`. Tills dess spelas `tittut-4` i runda 1 och resten är tyst.

## Ljud

**Finns:** `lekplatsljud`, `hej-babbel`, `ja-babbel`, `fniss`, `tass`, `hopp-mjuk`, `landa-mjuk`, jingeln, `gung-knarr` (1 tagning).

**Saknas** (ElevenLabs Sound Effects, prompt influence 0,6, 4 tagningar, toppen −9 dBFS):

```
gung-knarr (1,0 s), 3 tagningar till: Small wooden duck spring rider on a playground gently rocking back and forth once, a soft springy boing-creak of a metal coil, light and playful, no voice, close dry recording, no music, no background
stovel-plopp (0,5 s): A small soft animal ducking down inside a big rubber rain boot, a gentle hollow rubbery squeak and a soft thump, light and funny, no voice, close dry recording, no music, no background
```

## Kvar

1. Malins 10 rader, klipp, mät `UT`.
2. Ljuden ovan (`PRASSEL.stovel` i `tittut.js` när `stovel-plopp` finns).
3. Förhandsvisning (`--snabb`), QA, Shorten (runda 1).
