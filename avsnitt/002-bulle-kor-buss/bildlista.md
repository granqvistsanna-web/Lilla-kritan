# Bildlista – Avsnitt 002 Bulle kör buss

Det fasta (intro, outro, papper, kritsvep, ljud) finns i `assets/format/`. Bettan, Mille och Pip är gjorda till avsnitt 001.

| # | Typ | Vad | Kommando | Klar |
|---|---|---|---|---|
| 1 | Titelkort | Avsnitt 2 · Bulle kör buss + liten buss | text i redigeringen | ☐ |
| 2 | Teckning | Bussen som Kritan ritar | skapas tillsammans | ☐ |
| 3 | Bakgrund | **Vägen** (ny, sömlös i sidled) | `python3 verktyg/prompt.py --plats vagen --format 16:9` | ☐ |
| 4 | Bakgrund | Ängen (finns, eller görs nu) | `python3 verktyg/prompt.py --plats angen` | ☐ |
| 5 | Ny figur | **Björnen Bulle**: referensark + standardposer | `python3 verktyg/prompt.py bjornen-bulle --referensark` och `--delar` | ☐ |
| 6 | Ny pose | Bulle knackar på (ingår i delarna: *knocking arm*) | – | ☐ |
| 7 | Ny pose | Mille i bussfönstret (huvud och axlar) | `python3 verktyg/prompt.py musen-mille --scen "only head and shoulders, looking out of a round bus window, happy"` | ☐ |
| 8 | Ny pose | Pip med armarna i luften | `python3 verktyg/prompt.py kycklingen-pip --scen "both wings up in the air, shouting surprise, very happy"` | ☐ |
| 9 | Ny statist | **Igelkotten Igge**: går och vinkar | `python3 verktyg/prompt.py igelkotten-igge --delar` | ☐ |
| 10 | Ny statist | Lastbil (utan ansikte) | skapas tillsammans | ☐ |
| 11 | Statist | Traktorn Tuff på en liten brun åker | `python3 verktyg/prompt.py traktorn-tuff --scen "ploughing a small brown striped field patch, puffing smoke clouds"` | ☐ |
| 12 | Ny sak | Hus (ett hus, färgas om till rött och gult) | skapas tillsammans (`rekvisita/`) | ☐ |
| 13 | Ny sak | Kalasbord med tårta och tre ljus | skapas tillsammans (`rekvisita/`) | ☐ |
| 14 | Återanvändbart | Regn: grått moln + droppar som eget lager | skapas tillsammans → `assets/format/` | ☐ |
| 15 | Statist | Bettan med vindrutetorkare | ingår i Bettans delar (lägg till *windscreen wiper* om det behövs) | ☐ |

## Kamerainställningar (6)
1. Vägen, helbild: Bulle hoppar in i bussen
2. **Körscen**: Bettan i mitten, bakgrunden glider (traktor, lastbil, igelkott, regn)
3. Helbild vid huset (används för båda husen)
4. Närbild på dörren: knack, knack (används för båda husen)
5. Ängen, helbild: kalasbordet
6. Närbild på tårtan: räkna ljusen
