# Tittut – röstprompter att klistra in

ElevenLabs, **Eleven v3**, samma berättarröst som Gissa teckningen: stability 0,6, similarity 0,8, style 0, speaker boost på, speed 0,9.
Filerna läggs i `assets/ljud/roster/tittut/` (eller i Hämtade filer, så sorterar Claude in dem). Fullständig lista med status: [`ljud-att-gora.md`](ljud-att-gora.md).

Djuren kallas alltid vad de är, aldrig vid namn.

## Nytt: repliker som gör talet mindre upprepat (2:30-filmerna)

Alla är valfria. Motorn hoppar över en replik som saknas, så filmen funkar redan nu och blir bättre för varje fil som kommer in.

```
lek-1            [warm] Ska vi leka tittut?
igen-1           [excited] En gång till!
igen-2           [playful] Igen!
borta-igen-1     [playful] Borta igen!
borta-igen-2     [whispers] Borta igen…
jag-sag-nagot-1  [whispers] Jag såg något…
dar-ar-du-1      [excited] Där är du!
dar-ar-du-2      [laughs] Där är du ju!
busig-1          [laughs] Vad busig du är!
busig-2          [playful] Busigt!
slut-1           [warm] Nu är leken slut.
hej-da-1         [warm] Hej då!
hej-da-5         [warm] Hej hej!
kanin-hejda      [warm] Hej då kaninen!
lamm-hejda       [warm] Hej då lammet!
ko-hejda         [warm] Hej då kon!
leopard-hejda    [warm] Hej då leoparden!
lejon-hejda      [warm] Hej då lejonet!
```

Gör gärna 2–3 tagningar av samma rad och spara som `-1`, `-2`, `-3`: motorn turas om mellan dem.

## Först: det här behöver första filmen (kaninen i skogen)

```
borta-1       [whispers] Borta!
kanin-hej     [excited] Hej kaninen!
kanin-var     [curious] Var är kaninen?
```

## De andra fyra djuren

```
lamm-hej      [excited] Hej lammet!
lamm-var      [curious] Var är lammet?
ko-hej        [excited] Hej kon!
ko-var        [curious] Var är kon?
leopard-hej   [excited] Hej leoparden!
leopard-var   [curious] Var är leoparden?
lejon-hej     [excited] Hej lejonet!
lejon-var     [curious] Var är lejonet?
```

## Fler varianter (senare, så att filmerna inte låter likadant)

```
borta-2       [playful] Borta!
borta-3       [whispers] Borta… borta…
borta-4       [playful] Oj! Borta!
borta-5       [whispers] Borta… var tog du vägen?
tittut-1      [excited] Titt… ut!
tittut-3      [laughs] Tittut!
tittut-4      [surprised] Titt… ut! Där är du!
tittut-5      [excited] Tittuuut!
hej-da-2      [warm] Hej då! Vi leker igen snart.
hej-da-3      [warm] Hej då! Tittut en annan gång.
hej-da-4      [warm] Hej då! Vi ses snart.
hej-da-5      [warm] Hej hej!
```

Finns redan: `tittut-2` och "Hej då!" (`assets/ljud/roster/hej-da-1.m4a` från Gissa teckningen).
