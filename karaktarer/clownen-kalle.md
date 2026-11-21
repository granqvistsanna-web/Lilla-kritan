# Clownen Kalle

**Art:** leksak (mjuk tygclown) · **Favoritsak:** cykel 🚲 · **Status:** ⏳ Riggad i v2 (C1 vald), inget referensark ännu

> **Art direction v2 (2026-11-21):** ny figur för Kritans ABC C (recept 3, `produktion/youtube/alfabet/abc-c-recept-3/`). Gjord som Olle och Disa ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Tagningarna ur Google Flow (Nano Banana, 0 krediter, Olles `olle-forsta-b.jpg` och Kanels `kanel-platt.png` som stilreferens) ligger i `assets/karaktarer/clownen-kalle/premium/original/`. Tre färgsättningar à två tagningar: **A** smörgul dräkt med mintprickar, mintkrage och mintskor, persikogul spetshatt; **B** delad dräkt ljusblå/gul, vit-blå krage, röda skor, orange lockar på huvudet; **C** lavendel dräkt med gula stjärnor, gul krage och skor, rosa lockar vid sidorna, liten lavendel hatt. Översikt: `kalle-alla.jpg`. **Sanna väljer tagning innan figuren riggas.** B:s vita krage krockar med `tunn_kant.py` (vita saker, se art direction), så B behöver en ljusblå krage om den väljs. Clownen står på två ben och blir en stor figur på **SKALA 0,5** (kroppen ca 710–790 px i 1024-rutan, hatt och hårtofsar oräknade).
>
> **Vald 2026-11-21: tagning C1** (Sanna). Lavendel dräkt med gula stjärnor och knappar, gul krage och skor, rosa lockar vid sidorna, liten lavendel hatt med gul tofs. **Riggen** ligger i [`assets/karaktarer/clownen-kalle/premium/`](../assets/karaktarer/clownen-kalle/premium/): `kalle-faceless.png` och `kalle-body.png` (Flow-redigeringar av C1, `original/kalle-faceless-a.jpg` och `kalle-body-a.jpg`), delarna i `cut/` (`verktyg/delar.py … kalle --egen-kant`), vridpunkter i `kalle-rigg.json`, 10 px vit kant (`tunn_kant.py 10`), SKALA 0,5. Hår och hatt sitter i kroppen (inga öron, ingen svans). Armarna är omritade med `rita-lemmar.py … 348,764,428,844 --bara arm` (L 137) med persikofärgad hand (yttersta ca 30 %); `-fram`-kopior med kanten tonad mot roten, `-klapp`-kopior med `klapparm.py … kalle 1.0 0.64 0.78` (bara handen). Benen är konstens gula skor med en lavendelrot (dräktens ben, r 40, 80 px in under kroppen); konstens original i `cut/v1/`.
>
> **Uttryck, poser och rörelser:** [`premium/uttryck.html`](../assets/karaktarer/clownen-kalle/premium/uttryck.html), porterad från Olles med samma API (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?rorelse=`, `?film=1`) och `verktyg/rigg-motor.js`, blinkfrö 31. **Ansiktet i kod** (`ansikte_matt.py`): ögon (418, 402) och (604, 400) rx 16 ry 24; röd bollnäsa (512, 425) r 38, `#df5d55` med en liten glans; kinder (375, 463) och (648, 461); ett litet leende 486–540 under näsan. `KLAPPNY = { kontakt: [-148, 178], oppen: [-130, 138], y: 60, spets: 35 }`: händerna möts på dräkten under kragen.
>
> Kalle är bara det interna filnamnet. I det som sägs och sjungs heter figuren alltid **"clownen"**.

## Utseende
- Form: en liten, lite sned äggform (huvud och kropp i ett), samma blobb som Olle. Korta armstumpar och korta ben.
- Färger: varm persikofärgad hud upptill (**inget vitt ansikte, ingen målning**), en mjuk dräkt nedtill i dämpade pastellfärger. Färgerna bestäms av vald tagning.
- Kännetecken: den runda, mjuka röda bollnäsan mitt i ansiktet, lockiga hårtofsar och en mjuk krage. Ett litet, snällt leende ritat i kod (inget stort målat leende).

## Personlighet
- Glad och lite busig, som en älskad gosedocka. Vill gärna cykla.
- Aldrig läskig: mjuk, rund och liten, ser ut som en leksak.

## Röst och repliker
- Röst: inga ord, bara glada ljud (fniss, ett litet "oj!"), som de andra kompisarna i ABC.
- Återkommande replik: –
- Ljud: fniss, en liten pipande tuta från näsan när den trycks.

## Cut out-delar
```delar
round egg-shaped body with head and clown suit, hat, front arm, back arm, front leg, back leg, eyes closed, mouth open
```

## Prompt
```prompt
Kalle the soft toy clown, a cuddly fabric toy clown for toddlers, one small slightly lopsided egg-shaped blob where head and body are one shape, warm peach skin on the upper part (not a white face, no face paint), a round soft red ball nose in the middle of the face, small black oval eyes, round pink cheeks and a tiny gentle closed smile, soft curly hair tufts, a soft scalloped collar ruff, a soft baggy clown suit in muted pastel colours with big round buttons, short stubby arms with small peach hands, short legs and chunky soft rounded shoes, gentle and sweet, not scary at all.
```
