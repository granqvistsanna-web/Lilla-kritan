# Intro och outro

Görs **en gång** och sparas i `assets/format/`. Varje avsnitt byter bara titeln och numret på titelkortet.

## Intro (ca 8 sekunder)

| Tid | Bild | Ljud |
|---|---|---|
| 0:00–0:04 | Vitt papper. En krita (bara kritan, utan ansikte) ritar fram **logotypen *lilla kritan*** (alltid gemener), bokstav för bokstav, varje bokstav i en egen kritfärg. | Introjingeln (3–4 s) + *skrrrrt* |
| 0:04–0:08 | Kritsvep till ett **färgglatt titelkort**: en stark kritvägg (t.ex. gul), avsnittets nummer överst, titeln stort i mitten och en liten bild av dagens sak. | Titeln syns, ingen röst läser den + *pling* |

**Titelkortets text** (läggs på i redigeringen, inte i bildgenereringen):
```
Avsnitt 1
Glassbussen
```
- Typsnitt: *Fredoka* 600 (gratis på Google Fonts), som har å, ä och ö. Använd inte Gaegu: det saknar å, ä och ö. Titelns bokstäver får olika kritfärger (rött, turkos, lila, rosa, grönt, orange) med en vit kant, och numret skrivs i vitt. Eller handskriv titeln med krita och skanna in den.
- Numret skrivs alltid med siffror och titeln är kort, högst 3 ord.
- Den lilla bilden av dagens sak är samma bild som kritan ritar direkt efteråt.

### Introjingel (egen text och melodi, 3–4 s)
> *Rita, rita, ett, två, tre –*
> *lilla kritan! Kom och se!*

## Outro (ca 10 sekunder)

| Tid | Bild | Ljud |
|---|---|---|
| 0:00–0:03 | Vitt papper med dagens teckning. Avsnittets figurer tittar fram vid kanten och vinkar. | Musik, ingen röst |
| 0:03–0:10 | Logotypen *lilla kritan* syns stort och kritsvepet fyller bilden. | Outrojingeln |

### Outrojingel (egen text och melodi, ca 5 s)
> *Nu är kritan trött och glad –*
> *hej då, vi ses en annan dag!*

> ℹ️ På YouTube går det inte att lägga till slutskärmar och kort på videor som är markerade *Made for Kids*. Därför är outrot kort och utan rutor för "nästa video". Länka till andra avsnitt via spellistor istället.

## Filer i `assets/format/`

| Fil | Beskrivning |
|---|---|
| `logotyp.png` | Logotypen *Lilla Kritan*, handritade krit-bokstäver i olika färger, genomskinlig bakgrund |
| `papper.png` | Vitt/krämvitt papper med textur (bakgrund för intro, kritan ritar och outro) |
| `titelkort-mall.png` | Färgglatt titelkort utan text: kritvägg med färgprickar i kanterna |
| `intro.mov` / `outro.mov` | Färdiga intro och outro med genomskinlig ruta för titeln |
| `kritsvep.mov` | Övergången (se overgangar-och-maner.md) |
| `jingel-intro.wav` / `jingel-outro.wav` | Jinglarna |
