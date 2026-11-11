# Rekvisita

Saker som figurerna håller i eller använder. De tas fram tillsammans allteftersom avsnitten behöver dem (högst 2 nya per avsnitt, se `format/regler.md`).

## Lägga till en sak

Skapa `rekvisita/<sak>.md` med det här formatet:

````markdown
# Glass

Kort beskrivning, varianter och vilka avsnitt saken används i.

```prompt
A single ..., simple crayon drawing, on a plain white background.
```
````

Generera: `python3 verktyg/prompt.py --sak <sak>`. Spara bilden i `assets/rekvisita/<sak>.png` och lägg till saken i tabellen nedan.

| Sak | Fil | Första avsnitt |
|---|---|---|
| Rosa bilen | [rosa-bilen.md](rosa-bilen.md) | 005 |
| Jordgubbsglass | [jordgubbsglass.md](jordgubbsglass.md) | 005 |
| Rosa flagga | [flagga-rosa.md](flagga-rosa.md) | 005 |
| Rosa blomma | [blomma-rosa.md](blomma-rosa.md) | 019 |
| Röda blomman | [blomma-rod.md](blomma-rod.md) | 013 |
| Rosa luftballong | [luftballong-rosa.md](luftballong-rosa.md) | 005 |
| Orange båten | [orange-baten.md](orange-baten.md) | 006 |
| Orange fisken | [fisk-orange.md](fisk-orange.md) | 006 |
| Orange fågeln | [fagel-orange.md](fagel-orange.md) | 006 |
| Orange flytvästen | [vast-orange.md](vast-orange.md) | 006 |
| Pumpan | [pumpa.md](pumpa.md) | 006 |
| Orange solen | [sol-orange.md](sol-orange.md) | 006 |
| Bananen | [banan.md](banan.md) | 006, 022 |
| Molnen över sjön | [moln.md](moln.md) | 006 |
| Öarna | [oar.md](oar.md) | 006 |
| Segelbåten | [segelbat.md](segelbat.md) | 006 |
| Bruna lastbilen | [lastbil-brun.md](lastbil-brun.md) | 007 |
| Chokladrutan | [choklad.md](choklad.md) | 007 |
| Chokladträdet | [chokladtrad.md](chokladtrad.md) | 007 v2 |
| Kolabiten | [kola.md](kola.md) | 007 |
| Kolasåsen (plask och klick) | [kolasas.md](kolasas.md) | 007 |
| Kolalandet | [kolalandet.md](kolalandet.md) | 007 |
| Vattenrutschbanan | [rutschkana.md](rutschkana.md) | 007 |
| Gosekaninen (ersatt av nallen) | [gosekanin.md](gosekanin.md) | 007 |
| Nallen | [nalle.md](nalle.md) | 007 |
| Kanelbullen | [kanelbulle.md](kanelbulle.md) | 007 |
| Kotten | [kotte.md](kotte.md) | 007 |
| Röda äpplet | [applet-rott.md](applet-rott.md) | 007, 013 (v3) |
| Picknickfilten | [picknickfilt.md](picknickfilt.md) | 007 |
| Korgen | [korg.md](korg.md) | 007 |
| Röda bilen | [bil-rod.md](bil-rod.md) | Shorts: gissa teckningen |
| Röda bollen | [boll-rod.md](boll-rod.md) | Shorts: gissa teckningen |
| Gröna traktorn | [traktor-gron.md](traktor-gron.md) | Shorts: gissa teckningen |
| Blå hinken | [hink-bla.md](hink-bla.md) | Shorts: gissa teckningen |
| Kon | [ko.md](ko.md) | Shorts: gissa teckningen |
| Rosa grisen | [gris-rosa.md](gris-rosa.md) | Shorts: gissa teckningen |
| Gröna traktorn, öppen | [traktor-gron-oppen.md](traktor-gron-oppen.md) | 014 |
| Ärtskidan | [artskida.md](artskida.md) | 014 |
| Trafikljuset | [trafikljus.md](trafikljus.md) | 014 |
| Röda brandbilen | [brandbil-rod.md](brandbil-rod.md) | 013 |
| Röda ballongen | [ballong-rod.md](ballong-rod.md) | 013 |
| Gula helikoptern | [helikopter-gul.md](helikopter-gul.md) | 011 |
| Gula solhatten | [solhatt-gul.md](solhatt-gul.md) | 011 |
| Blå mopeden | [moped-bla.md](moped-bla.md) | 012 |
| Blåbären (hinken och lösa bär) | [blabar.md](blabar.md) | 012 |
| Blåklockorna | [blaklockor.md](blaklockor.md) | 012 |
| Blå bollen | [boll-bla.md](boll-bla.md) | 012 |
| Fåret | [far.md](far.md) | Shorts: gissa teckningen |
| Vita fåret (tidigare tagning) | [far-vitt.md](far-vitt.md) | Shorts: gissa teckningen |
| Bruna hönan | [hona-brun.md](hona-brun.md) | Shorts: gissa teckningen |
| Bruna hunden | [hund-brun.md](hund-brun.md) | Shorts: gissa teckningen |
| Gröna grodan | [groda-gron.md](groda-gron.md) | Shorts: gissa teckningen |
| Grå musen | [mus-gra.md](mus-gra.md) | Shorts: gissa teckningen |
| Bruna ugglan | [uggla-brun.md](uggla-brun.md) | Shorts: gissa teckningen |
| Gula biet | [bi-gult.md](bi-gult.md) | Shorts: gissa teckningen |
| Bruna igelkotten | [igelkott-brun.md](igelkott-brun.md) | Shorts: gissa teckningen |
| Orange ekorren | [ekorre-orange.md](ekorre-orange.md) | Shorts: gissa teckningen |
| Orange katten | [katt-orange.md](katt-orange.md) | Shorts: gissa teckningen |
| Röda båten | [bat-rod.md](bat-rod.md) | Shorts: gissa teckningen |
| Röda bussen (v2) | [buss-rod.md](buss-rod.md) | 013 |
| Röda cykeln | [cykel-rod.md](cykel-rod.md) | Shorts: gissa teckningen |
| Röda flygplanet | [flygplan-rod.md](flygplan-rod.md) | Shorts: gissa teckningen |
| Röda tåget | [tag-rod.md](tag-rod.md) | Shorts: gissa teckningen |
| Blå gungan | [gunga-bla.md](gunga-bla.md) | Shorts: gissa teckningen |
| Gungbrädan | [gungbrada.md](gungbrada.md) | Shorts: gissa teckningen |
| Gula rutschkanan | [rutschkana-gul.md](rutschkana-gul.md) | Shorts: gissa teckningen |
| Sandlådan | [sandlada.md](sandlada.md) | Shorts: gissa teckningen |
| Röda spaden | [spade-rod.md](spade-rod.md) | Shorts: gissa teckningen |
| Bruna hästen | [hast-brun.md](hast-brun.md) | Shorts: gissa teckningen |
| Mjölkglaset | [mjolkglas.md](mjolkglas.md) | Godnattsagorna, 022 |
| Kudden | [kudde.md](kudde.md) | Godnattsagorna |
| Pottan | [potta.md](potta.md) | Godnattsagorna |
| Vällingflaskan | [vallingflaska.md](vallingflaska.md) | Godnattsagorna (lammets färd) |
| Ullsäcken | [ullsack.md](ullsack.md) | 015 |
| Strumporna | [strumpor.md](strumpor.md) | 015 |
| Stråhatten | [stratthatt.md](stratthatt.md) | 007 |
| Badkaret | [badkar.md](badkar.md) | 018 |
| Handduken | [handduk.md](handduk.md) | 018 |
| Badankan | [badanka.md](badanka.md) | 020 |
| Tvålen | [tval.md](tval.md) | 020 |
| Pallen | [pall.md](pall.md) | 020, 022 |
| Badbåten | [badbat.md](badbat.md) | 020 |
| Bordet | [bordet.md](bordet.md) | 022 |
| Köksklockan | [klocka-rod.md](klocka-rod.md) | 022 |
| Väggskåpet | [vaggskap.md](vaggskap.md) | 022 |
| Sleven | [slev.md](slev.md) | 022 |
| Stolen | [stol.md](stol.md) | 022 |
| Tallriken | [tallrik.md](tallrik.md) | 022 |
| Handfatet | [handfatet.md](handfatet.md) | 023, 025 |
| Mössan | [mossan.md](mossan.md) | 024 |
| Tygpåsen | [tygpase.md](tygpase.md) | 024 |
| Väggklockan | [klocka.md](klocka.md) | 024 |
| Tandborsten | [tandborsten.md](tandborsten.md) | 025 |
| Muggen | [muggen.md](muggen.md) | 025 |
| Röda kritan | [krita-rod.md](krita-rod.md) | 013 |
| Molnen | [moln.md](moln.md) | 013 |
| Gula stövlarna | [stovlar-gula.md](stovlar-gula.md) | 011 |
| Gula hinken | [hink-gul.md](hink-gul.md) | 011 |
| Smörgåsen | [smorgas.md](smorgas.md) | 011 |
| Gula blommorna | [blommor-gula.md](blommor-gula.md) | 011 |
