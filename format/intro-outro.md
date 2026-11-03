# Intro och outro

Görs **en gång** och sparas i `assets/format/`. Varje avsnitt byter bara titeln och numret på titelkortet.

## Intro (ca 8 sekunder)

| Tid | Bild | Ljud |
|---|---|---|
| 0:00–0:04 | Vitt papper. En krita (bara kritan, utan ansikte) ritar fram **logotypen *Lilla Kritan***, bokstav för bokstav. | Intojingeln + *skrrrrt* |
| 0:04–0:08 | Kritsvep till **titelkortet**: avsnittets nummer överst, titeln stort i mitten och en liten bild av dagens sak. | Berättaren läser: *"Avsnitt ett: Glassbussen!"* + *pling* |

**Titelkortets text** (läggs på i redigeringen, inte i bildgenereringen):
```
Avsnitt 1
Glassbussen
```
- Typsnitt: ett handskrivet typsnitt med å, ä och ö, till exempel *Patrick Hand* eller *Gaegu* (gratis på Google Fonts), i konturbrunt `#4A3426`. Eller handskriv titeln med krita och skanna in den.
- Numret skrivs alltid med siffror och titeln är kort, högst 3 ord.
- Den lilla bilden av dagens sak är samma bild som kritan ritar direkt efteråt.

### Intojingel (egen text och melodi, ca 4 s)
> *Rita, rita, ett, två, tre –*
> *Lilla Kritan! Kom och se!*

## Outro (ca 10 sekunder)

| Tid | Bild | Ljud |
|---|---|---|
| 0:00–0:03 | Vitt papper med dagens teckning. Avsnittets figurer tittar fram vid kanten och vinkar. | *"Hej då! Vi ritar mer en annan dag!"* |
| 0:03–0:10 | Logotypen *Lilla Kritan* syns stort och kritsvepet fyller bilden. | Outrojingeln |

### Outrojingel (egen text och melodi, ca 5 s)
> *Nu är kritan trött och glad –*
> *hej då, vi ses en annan dag!*

> ℹ️ På YouTube går det inte att lägga till slutskärmar och kort på videor som är markerade *Made for Kids*. Därför är outrot kort och utan rutor för "nästa video". Länka till andra avsnitt via spellistor istället.

## Filer i `assets/format/`

| Fil | Beskrivning |
|---|---|
| `logotyp.png` | Logotypen *Lilla Kritan*, handritade krit-bokstäver i olika färger, genomskinlig bakgrund |
| `papper.png` | Vitt/krämvitt papper med textur (bakgrund för intro, kritan ritar och outro) |
| `titelkort-mall.png` | Titelkort utan text |
| `intro.mov` / `outro.mov` | Färdiga intro och outro med genomskinlig ruta för titeln |
| `kritsvep.mov` | Övergången (se overgangar-och-maner.md) |
| `jingel-intro.wav` / `jingel-outro.wav` | Jinglarna |
