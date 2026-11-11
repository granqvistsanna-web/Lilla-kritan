# Molnen

Fyra platta vita kritmoln med vit klistermärkeskant: ett stort, ett mellan, ett litet och ett långt. Svävar sakta på den blå himlen i introt till 013 Röda sången (Sanna 2026-11-08, art direction v2). Gjorda av Sanna som ett ark på blå bakgrund, `assets/rekvisita/moln/moln-ark.jpg`, urklippta (blått bort, grå klipplinje bort, vita kanten kvar) till `cut/moln-stor.png`, `moln-mellan.png`, `moln-liten.png`, `moln-lang.png`.

Används i: 013 Röda sången (introt).

```prompt
A sheet of four simple toddler-cartoon clouds arranged in a loose 2×2 grid with lots of space between them, for a premium toddler picture book, soft wax crayon and oil pastel, neat and controlled, not messy. Each cloud is one flat, puffy, rounded shape with three to five soft round bumps on top and a gently flat bottom, slightly lopsided like a child's drawing: one big wide cloud, one medium cloud, one small cloud and one long low cloud. Fill: an even soft warm white crayon with fine paper grain and a few light scratchy crayon strokes, and only a very faint pale sky-blue crayon tint along the bottom edge. No shading, no highlights, no 3D look, no dark outline. Each cloud has its own thick, clean, even, smooth white sticker border all around, like a die-cut vinyl sticker, with a very thin soft light grey cut line just outside the border. Flat solid medium sky-blue background (#5CB8EC) filling the whole image, no shadow, no ground, no sun, no birds, no text, no letters.
```

## Rosa molnen (019)

Samma fyra former i rosa krita, gjorda i Google Flow 2026-11-08 (image2image på `moln-ark.jpg`, 0 krediter) för 019 Min favoritfärg ("rosa moln på himlen blå"). Arket: `assets/rekvisita/moln-rosa/moln-rosa-ark.jpg`, urklippta (blått och den grå klipplinjen bort, vita kanten kvar) till `assets/rekvisita/moln-rosa/cut/moln-rosa-stor.png`, `-mellan`, `-liten`, `-lang`.

```prompt
Edit Image 1. Keep the four clouds EXACTLY the same: same shapes, positions, sizes, same thick clean white sticker borders and thin light grey cut lines, same flat sky-blue background. ONLY change the cloud fill: each cloud becomes soft pastel PINK crayon (#F7B3D0) with fine paper grain and a few light scratchy lighter-pink crayon strokes, and a very faint slightly deeper pink crayon tint along the bottom edge instead of the blue tint. The white sticker borders stay pure white. No shading, no 3D look, no dark outline, no other changes, no text.
```

## Molnet i julkalenderns lucka 1

Det stora vita molnet (`moln-stor`) återanvänds i julkalendern 2026, lucka 1 (Sanna 2026-11-11): kritan ritar konturen i ett drag, bilden fylls i inifrån (`format/ritintro.md`), molnet hamnar framför [stjärnan](stjarna-gul.md) och [suddgummit](suddgummi.md) gnuggar bort det. Molnet syns både mot mörkblå natthimmel och mot krämvitt papper, tack vare den ljusblå kritkanten.

- **Tunn kant:** `assets/rekvisita/moln/cut-tunn/moln-stor.png` (641 × 366 px, samma ruta och pixlar som `cut/moln-stor.png`). Originalets vita kant är 18 px (5,6 % av höjden), kopians är 5 px, så att den stämmer med stjärnans och suddgummits kant. Bbox för de täta pixlarna: x 17, y 17, bredd 607, höjd 332. Färgytan: x 23, y 22, bredd 596, höjd 322.
- **Konturen:** `assets/rekvisita/moln/cut-tunn/moln-stor-kontur.json`, `{ "d": "M… Z", "bbox": [17, 17, 607, 332] }`. En sluten bana i bildens egna pixlar, 60 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs med start och slut längst till vänster (23, 250). Den följer den ljusblå kritkanten och avviker i snitt 0,8 px från den, som mest 2,2 px. Samma bana med originalets bbox `[4, 4, 633, 358]` finns i `cut/moln-stor-kontur.json`.
- Molnet är bara 641 px brett: visa det högst ungefär 800 px brett, annars blir det suddigt.
