# Tittut – kaninen på lekplatsen (plan)

**Status:** godkänd av Sanna 2026-11-11 och byggd ([`index.html`](index.html), stillbilder i `stills/`). Samma dag bytte Sanna hinken mot **ett stort äppelträd** (nytt i v2) och ville ha **en mycket större gunganka som gungar** och en mindre stövel. Senare samma dag bytte hon **stöveln mot sandlådan** för kompositionens skull. Efter första förhandsvisningen (`kaninen-forhandsvisning.mp4`) är det putsat: hon syns inte längre genom anden eller bredvid stammen, och kikarna är tydliga (före/efter: `stills/fore.jpg`, `stills/efter.jpg`). Malins repliker är klara. Byggs efter [`format/tittut.md`](../../../../../format/tittut.md).

Figuren är v2-Kanel (`kaninen-kanel-v2`, låst ✅, 390 px i bild), platsen är lekplatsen (`bakgrunder/lekplatsen.md`). Hon kommer in och går ut till vänster, framför anden.

## Gömställena

Leoparden har bollen, kullen och sandlådan, hunden kullen, sandlådan och lekstugan. Kaninen får tre andra:

| Sak | Bild | I bild | Hon kommer fram |
|---|---|---|---|
| **gunganden** | `lekplatsen-saker/gunganka.png` (kant omgjord till 5 px i bild) | `[330, 905]`, h 620, `hel`, `vick: 4`, `gom: -75` | `upp` över andryggen, `sida` vid stjärten |
| **det stora äppelträdet** | `lekplatsen-saker/appeltrad.png`: nytt i v2, förslag B av fyra (`original/appeltrad-a` … `-d.jpg`, prompten i `bakgrunder/lekplatsen.md`), 5 px kant. 013:s träd är orört | `[1010, 855]`, h 1000, `rotter`, bakom de andra | `sida` vid stammen |
| **sandlådan** | `lekplatsen-saker/sandlada.png`, samma som hos hunden och leoparden | `[1520, 1060]`, h 370, `gom: 0`, närmast kameran framför gången | `ur`, huvudet upp mitt i sandhögen |

Trädet gjordes nytt för att ingen av de befintliga äppelträdens stammar var bredare än kaninen: hon syntes på båda sidor. Stammen på B är ca 280 px i bild. Sanna har inte valt bland A–D än; B används tills vidare och är lätt att byta.

Motorvalen (alla i `format/tittut.md`):
- **`hel`:** hela anden döljer, så benen syns inte mellan fjäderns varv.
- **`vick`:** anden gungar på fjädern (4°, tonar ut på ca 2 s) när hon gömmer sig bakom den, när den skakar och när hon kommer fram. Masken gungar med, så hon syns inte genom ryggen. Skakningen låter `gung-knarr`.
- **`gom`:** var hon står bakom saken, i px från bildens mitt (anden: bakom ryggen, inte halsen; sandlådan: mitt i högen, inte vid kanten mot trädet).
- **`rotter`:** fötterna står bakom trädets rötter, och kroppen kapas inte rakt när hon lutar ut vid stammen.
- **`retas: 'oron'`:** i pauserna kikar öronspetsarna fram och vickar först, sedan huvudet.
- **`bortaVarje`, `darVarje`, `retasSkala: 0.7`:** alla borta-repliker sägs (de nämner gömstället), `dar-ar-du-2` används också, och de tysta kikarna är kortare.

Motorn fick också tre rättningar som gäller alla filmer: kikarna väljs efter saken hon kommer fram ur (runda 5: sandlådan, inte trädet), `ur` lyfter huvudet över kanten när saken är högre än figuren (med `retas: 'oron'` minst lika högt som huvudkiken), glidet mellan två saker är framme i sidled innan hon stiger, och `sida` börjar vid kanten så att hon syns när Malin säger "ut" (förut 1–2 s sent bakom trädet och anden).

## Fem rundor

```js
rundor: [
  ['gunganka', 'upp'],              // upp över andryggen
  ['sandlada', 'ur'],               // huvudet upp ur sanden
  ['appeltrad', 'sida'],            // ut vid sidan av stammen
  ['gunganka', 'sida'],             // "En gång till!": ut vid andens stjärt
  ['appeltrad', 'ur', 'sandlada'],  // överraskningen: bakom trädet, upp ur sanden
],
skakar: ['gunganka'],
```

## Malins repliker (`roster/tittut/kanin-lekplats/`)

**Kopierat (finns):** `lek-1` (från `hund-lekplats`), `gomma-1`, `kul-1`, `dar-ar-du-1`, `-2`, `busig-1`, `igen-1`, `tittut-4`, `slut-1`, `hej-da-1`, `hej-hej-1` (från `kanin/`). *"Hej kaninen!"* är den delade `kanin-hej.m4a`.

**Nya rader till Malin**, i rundornas ordning (dela till filnamnen till vänster):

```
borta-1          [whispers] Bakom anden… borta!
tittut-1         [laughs] Tittut! Uppe på anden!
borta-igen-1     [mischievously] Ner i sanden…
tittut-2         [giggles] Titt-ut! Ur sanden!
borta-igen-2     [whispers] Bakom trädet… borta!
tittut-3         [excited] Titt… ut! Vid trädet!
borta-2          [playful] Anden gungar… borta!
jag-sag-nagot-1  [whispers] Jag ser två långa öron…
borta-igen-3     [mischievously] Bakom trädet igen…
tittut-5         [surprised] Oj! Tittut! Ur sanden!
```

**Klart (2026-11-11):** alla tio är inspelade (raderna med sanden och en lekplatsversion av `gomma-1` spelas in på nytt efter bytet till sandlådan), klippta och ligger i `kanin-lekplats/`. "ut" är mätt och ligger i `UT` i `tittut.js` (`tittut-1` 1,32, `-2` 1,38, `-3` 0,91, `-5` 1,78 s).

## Ljud

**Finns:** `lekplatsljud`, `hej-babbel`, `ja-babbel`, `fniss`, `tass`, `hopp-mjuk`, `landa-mjuk`, jingeln, `gung-knarr` (1 tagning).

**Saknas** (ElevenLabs Sound Effects, prompt influence 0,6, 4 tagningar, toppen −9 dBFS):

```
gung-knarr (1,0 s), 3 tagningar till: Small wooden duck spring rider on a playground gently rocking back and forth once, a soft springy boing-creak of a metal coil, light and playful, no voice, close dry recording, no music, no background
```

## Kvar

1. Fler tagningar av `gung-knarr` (ovan). Sandlådan har redan `sand`.
2. Ny förhandsvisning (`--snabb`) med Malins röst, QA, Shorten (runda 1).
3. Sanna väljer träd (A–D) om hon vill byta från B.
