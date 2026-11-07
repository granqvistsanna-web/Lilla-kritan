# Björnen Bulle

**Art:** björn · **Favoritsak:** – (busschaufför) · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-07):** gjord som Kanel och Ludde ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/bjornen-bulle/premium/`](../assets/karaktarer/bjornen-bulle/premium/): kropp (tom), mage, nosfläck, öron, armar och ben i `cut/`, vridpunkter i `bulle-rigg.json`, `rigg-test.html` (närbild, `?vy=hela` för brett) och `uttryck.html` (uttryck, `?ark=poser`, `?film=1` testfilm). Godkänd konst: `premium/original/bulle-forsta-2k.jpg` (= `bulle-platt.png`), redan platt nog. Faceless och body only är gjorda i Google Flow (Nano Banana, image2image). Ingen keps och ingen svans i v2. Alla delar har 10 px vit kant vid SKALA 0,5 (`verktyg/tunn_kant.py`). Armarna är korta kapslar i kroppens krita, mätta mot konstens stumpar (axel ~(250, 515), spets ~(205, 600)). Öronen är hela runda skivor bakom huvudet med rund rot, så att ett lutat öra aldrig visar ett hack. Armarna framför kroppen (`-fram`) är lite mörkare med en mjuk mörkare kritkant, annars försvinner de mot kroppens brunt. I klappen glider de in framför magen tills tassarna möts (som Kanels). Sover liggande på magen med tassarna under hakan (Sannas val, som Luddes): uttrycket `sover` (slutna u-bågar), posen `liggMage` (tassarna `-fram`, armar −130, klapp 175, benen instoppade) och `ROR.ligga` (ett andetag var 4:e s). I testfilmen somnar han med sovövergång C (Sannas val 2026-11-08): sömnig och gäspar, ett litet hopp, och i toppen tar den ritade sovbilden `cut/bulle-sover.png` över (`sovbild.py`), landar liggande med en mjuk studs, andas och zzz flyter upp. Han vaknar med ett hopp tillbaka (`somna(d)` i `?film=1`, `?sovtest=1` visar A, B och C). Kawaii-ögonen (större ögon, tre glanspunkter) är ett uttryck, inte hans vanliga ansikte: `ansikte('kawaii')` eller parametern `kawaii` 0–1 i vilket uttryck som helst. Uttrycket är till för stunder av förtjusning. I testfilmen kommer det bara när han ser något fint, precis före hurra. Utseendet nedan är v1.

## Utseende
- Form: stor, rund och mjuk som en bulle. Huvud och kropp är nästan samma form.
- Färger: varmt brun (`#A0673A`) med en ljusbeige nos och ljusbeige mage.
- Kännetecken: små runda öron, några krafsade hårstrån på huvudet och en liten grön keps som han har när han kör buss.
- Ska **inte** likna kända björnfigurer: ingen röd mössa, inga kläder utöver kepsen.

## Personlighet
- Lugn, snäll och lite långsam. Tycker om att köra och hälsa på sina kompisar.
- Stannar alltid för den som vill gå över vägen.

## Röst och repliker
- Röst: djup, mjuk och mysig.
- Återkommande replik: *"Hopp i, brum-brum, nu kör vi!"*
- Ljud: ett litet mysigt brummande när han är nöjd.

## Cut out-delar
```delar
round head-and-body, front arm, back arm, front leg, back leg, green cap, eyes closed, mouth open, mouth O, knocking arm
```

## Prompt
```prompt
Bulle the bear, a big soft round warm brown bear (#A0673A) shaped like a bun, head and body almost one shape, small round ears, a light beige muzzle with a small black nose and a light beige tummy, a few tiny scribbled hairs on top of his head, a small green flat cap, small black dot eyes in white circles and a gentle smile, short stubby arms and legs with black tips.
```
