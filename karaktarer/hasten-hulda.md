# Hästen Hulda

**Art:** häst · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-09):** gjord som Disa och Hugo (samma mjukare kritstruktur och lite djup, `dinon-disa/premium/original/disa-djup.jpg` som stilreferens), skillen `lk-figur`. Hulda står på två ben och är en **stor figur: SKALA 0,5** (kroppen ca 695 px från fötterna till äggets topp), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/hasten-hulda/premium/`](../assets/karaktarer/hasten-hulda/premium/): kropp (med man, blomma och nosfläck), öron, armar (`-fram`-kopior), ben och svans i `cut/`, vridpunkter i `hulda-rigg.json`, och [`rigg-test.html`](../assets/karaktarer/hasten-hulda/premium/rigg-test.html) (15 s: vinkar, går, hoppar, klappar händerna, blundar och lägger sig på sidan och sover; svansen viftar). Öron, svans och ben har lång rot i egen färg (`verktyg/langre_rot.py`, originalen i `cut/v1/`).
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): `premium/original/hulda-forsta-a.jpg` (**vald**, `-b` är systertagningen) → `hulda-faceless.jpg` och `hulda-body-flow.jpg`.
>
> **Delningen:** svansen hänger lågt och räknades först som ett tredje ben (skrev över `leg-r`); `verktyg/delar.py` tar nu den yttersta av fler än två ben som svans. Öronen rensade från manens gula och blommans rosa pixlar (bara största biten kvar) och ligger **bakom** huvudet men inne i `#kropp`, så att de trycks ihop med kroppen i hoppet. Armarna ritade med `rita-lemmar.py … 280,600,376,696 --bara arm --armlangd 0.55` och spetsen (t > 0,86) i hovfärg (originalen i `cut/v1/`, de gav en flik under armen när hon vinkade).
>
> **Ansiktet i kod:** ögon (417, 403) och (602, 401) rx 19 ry 27, kinder (383, 455) och (641, 454), mun `M486 538 Q514 557 542 538` under nosfläckens näsborrar (bakade i konsten), öppen mun vid (514, 548). FOTTER 920. Uttryck- och posesida finns inte än.

## Utseende
- Form: lång oval kropp med ett avlångt huvud som sitter lite framåt, fyra smala stumpben.
- Färger: ljust kastanjebrun (`#C47A45`) med solgul (`#F6C21C`) krafsig man och svans.
- Kännetecken: den yviga gula manen i kritstreck och en liten rosa blomma i manen.

## Personlighet
- Snäll och stor. Den som alla får rida på, och hon springer gärna fort. Lite blyg.

## Röst och repliker
- Röst: mjuk och lugn.
- Återkommande replik: *"Gnägg! Hoppa upp, så rider vi!"*
- Ljud: klippetiklopp, gnägg.

## Cut out-delar
```delar
body, head with neck, mane, tail, front leg pair, back leg pair, eyes closed, mouth open
```

## Prompt
```prompt
Hulda the horse, a friendly horse with a long soft oval body and an elongated head, light chestnut brown (#C47A45), a wild scribbly sunshine yellow mane and tail drawn in crayon strokes, a small pink flower in her mane, small black dot eyes in white circles, a gentle smile, four short stubby legs with black hooves.
```
