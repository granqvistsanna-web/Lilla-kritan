# Musen Mille

**Art:** mus · **Favoritsak:** mus 🐭 · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-07):** gjord som Kanel och Ludde ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). **Ingen rosett längre**: den togs bort i första v2-tagningen, och båda öronen är hela med grå ytterkant och rosa insida. Riggen ligger i [`assets/karaktarer/musen-mille/premium/`](../assets/karaktarer/musen-mille/premium/): kropp (`body-tom` + nosfläcken `nos`), öron, armar, ben och svans i `cut/`, vridpunkter i `mille-rigg.json`. Godkänd konst: `premium/original/mille-platt.png` och `mille-faceless.png` (Google Flow, pixeljusterade). Flows bild med bara kroppen hade ett ca 10 % större ägg, så den är inpassad på faceless-ägget, och insidan är tagen ur faceless-bilden så att nosfläcken ligger rätt (`original/mille-body-flow.png` är Flows bild). Högra armen och svansen satt ihop i `delar.py` och är delade vid y 626. Armarna är korta stumpar ritade av en ren kritbit (340,612), och armarna framför kroppen (`*-fram.png`) har en tunn mörkare kritkant i stället för vit, annars syns de inte mot den grå magen. Öronen är ombyggda med en rund rot, som Luddes: bara örats runda skiva utanför huvudet (smala flikar av kanten längs huvudet är bortskurna) plus en rund rot (r 62) 30 px in i huvudet, med vridpunkten i roten. I `uttryck.html` sitter öronen 16 px längre in mot huvudet och 10 px lägre än i konsten, och skjuts in ytterligare ju mer de lutar, så att rotens kant aldrig syns. Alla delar har 10 px vit kant vid SKALA 0,5.
>
> **Ansikte (v2), i kod över nosfläcken:** ögon (418, 401) och (601, 400), rx 18, ry 26; kinder (378, 459) och (642, 456), rx 32, ry 23. Munnen är ett streck från nosen (439) ner till 466 och en enda U-båge 481–542 med botten i 469.
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/musen-mille/premium/uttryck.html) har samma API och namn som Kanels och Luddes (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?rorelse=`). `?film=1` är en 40 s testfilm (39,9 s). Svansen vickar i takt med stegen när hon går, och annars en snabb vickning var 4,5:e sekund. **Sover** (som Luddes v2): uttrycket `sover` (`sov` 0–1 döljer ögat och visar en sluten u-båge `M-19 -2 Q0 14 19 -2`, med kawaii lite bredare), posen `sover` (sitter ihopsjunken, huvudet nerböjt, händerna på magen, svansen inrullad mot kroppen, `svans: -60`) och rörelsen `sova` (ett andetag var 4:e sekund). **Ligger på magen** (Sannas val 2026-11-07, ersätter sovandet sittande i filmen): posen `liggMage` (som Luddes: `strack -0.3`, `bred 0.18`, `sank 30`, `upp -0.9`, benen gömda med `ben 85`, `benY -70`), med Milles armar `-120`, `klapp 80` och den nya parametern `armY -38` (armarna lyfts så att händerna ligger under hakan), svansen `-110` ner längs marken. Rörelsen `ligga` (uttrycket `sover`, ett andetag var 4:e sekund). I filmen: sömnig och sitter, lägger sig på magen på 1 s och sover 3,5 s, sträcker på sig, vinkar. **Kawaii** är ett uttryck: `ansikte('kawaii', k)` eller `blanda('nyfiken', 'kawaii', k)` (parametern `kawaii` 0–1 blandar in större ögon 1,4 × 1,5, lägre och längre isär, med stor och liten glans, och kinderna lite lägre och längre ut). I filmen en gång, när hon kommer nära (nyfiken → kawaii). Jämförelse i `?ark=kawaii`. Renderad: `premium/mille-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`). Utseendet nedan är v1.

## Utseende
- Form: en rund, lite skev äggformad blob som grodan, ankan och kycklingen: huvud och kropp i ett. Två runda öron som små bullar ovanpå blobben, och en kort svans med en liten krull. (Ändrat 2026-11-04 från droppformad kropp med brett huvud och lång svans.)
- Färger: musgrå (`#B8B2AA`), rosa insida i öronen och rosa nos.
- Kännetecken: röd prickig klänning (i v1). Rosetten vid örat är borttagen 2026-11-07 och ska inte vara med i nya bilder eller prompter.

## Personlighet
- Liten men modig. Älskar glass, speciellt jordgubb.
- Säger ofta *"Jag också!"* och vill vara med på allt.

## Röst och repliker
- Röst: liten, pipig och glad.
- Återkommande replik: *"Pip pip, jag också!"*
- Ljud: små snabba tassteg.

## Cut out-delar
```delar
head with ears, body with dress, tail, front arm, back arm, front leg, back leg, eyes closed, mouth open
```

## Prompt
```prompt
Mille the mouse, one round slightly lopsided egg-shaped blob where head and body are one shape, soft mouse grey (#B8B2AA), two round ears sitting on top of the blob like small buns with pink insides, a small pink nose, a short tail with a little curl, tiny stubby arms and short legs, small black dot eyes and a happy smile.
```
