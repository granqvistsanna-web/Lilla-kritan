# Pojken Olle

**Art:** pojke (människa) · **Favoritsak:** blåbär · **Status:** ✅ Referensark klart (valt 2026-11-07)


> **Art direction v2 (2026-11-09):** samma Olle, omgjord i v2-stilen på användarens begäran (utseendet ovan gäller, v1-filerna är orörda). Gjord som Disa, Hugo, Hulda och Kaj med skillen `lk-figur`; tagningarna i `premium/original/` (`olle-forsta-b.jpg` vald, för de längre armarna). **Stor figur: SKALA 0,5** (kroppen ca 705 px från fötterna till äggets topp, utan tofsen), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/pojken-olle/premium/`](../assets/karaktarer/pojken-olle/premium/): kropp med hårtofsen, armar (`-fram`-kopior där hela roten tonar bort, så att armen växer ur magen) och ben i `cut/`, vridpunkter i `olle-rigg.json`, och [`rigg-test.html`](../assets/karaktarer/pojken-olle/premium/rigg-test.html) (15 s: vinkar, går, hoppar, klappar händerna med händerna ihop framför magen, blundar och lägger sig på sidan och sover). Armar och ben har lång rot i egen färg (`verktyg/langre_rot.py`, armarna med `--axel` så att roten följer armen; originalen i `cut/v1/`). De långa armarna vrids bara lite när han ligger, annars sticker roten ut vid axeln. Ansiktet ritas i kod: ögon, liten näsbåge, leende och runda kinder.
## Utseende
- Form: en liten, lite sned äggform (huvud och kropp i ett), samma blobb som djuren. Små armstumpar och korta ben.
- Färger: ljust persikofärgad krita upptill, en klarröd tröja (`#DF342F`) nedtill, mörkblå byxor och små bruna skor. Röd syns mot skogens mintgröna vägg.
- Kännetecken: en liten rufsig ljusbrun hårtofs på huvudet och runda rosa kinder ("rosor på kind").

## Personlighet
- Glad och nyfiken, lite ensam i början. Delar gärna med sig.

## Röst och repliker
- Röst: ljus barnröst, glad.
- Återkommande replik: *"Där är du!"*
- Ljud: fniss, plopp när bären hamnar i korgen.

Sången kallar honom "Olle". Han är en människa, så det är inget djurnamn (se `CLAUDE.md`). Första avsnittet: 017.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg (eyes and mouth are drawn in code, the rosy cheeks stay in the art)
```

Bilderna ligger i [`assets/karaktarer/pojken-olle/`](../assets/karaktarer/pojken-olle/): `olle.png` (framifrån, med ansikte), `olle-faceless.png` (utan ögon och mun, kinderna kvar) och `olle-body.png` (utan armar och ben), utklippta i `cut/`. Vridpunkter i `olle-rigg.json`. Ögonen sitter på ungefär (414, 401) och (604, 398) med radie 26, och munnen på (511, 466), ungefär 58 px bred (uppmätt mot den ansiktslösa bilden). Ingen nos: bilden hade en liten prick som togs bort.

**Armar och ben är ritade i kod** (`ritadeDelar`): kroppen klipps fram ur den ansiktslösa bilden och lemmarna ritas med `verktyg/rita-lemmar-manniska.py` (ärm i tröjans/klänningens färg med rund hand, ben med sko, färgerna tagna ur bilden). Kör om den om bilden byts:
`~/.claude/skills/ai-video/.venv/bin/python -I verktyg/rita-lemmar-manniska.py assets/karaktarer/pojken-olle olle`. Förhandsvisning: `assets/karaktarer/olle-mor-rigg.jpg`. De andra utkasten ligger i `utkast/`.

## Prompt
```prompt
A little toddler boy in the house crayon style: ONE slightly lopsided egg-shaped blob (head and body in one), no black outline, the upper part warm light peach skin wax crayon and the lower half a bright red sweater (#DF342F), mottled grainy streaky texture with paper grain and a thin uneven white rim. A small messy tuft of light brown hair on top, two round rosy pink cheeks, two round white eyes ringed in black with small black pupils, a small happy smile. Tiny stubby red arm nubs, two short legs in dark blue trousers with small brown shoe tips.
```
