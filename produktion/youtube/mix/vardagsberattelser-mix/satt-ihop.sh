#!/bin/bash
# Vardagsberättelser-mixen (2026-11-22): bilderböckerna utan jul (julkalenderns avsnitt får en egen julmix).
# 021 först med "Djuren hittar på!"-kortet, 026 (zebran går och lägger sig) sist med kritirisen kvar.
# Övriga hoppar kortet (3,3 s; 020 sitt långa intro 10,6 s under eget svep; 037 städtid-kortet 3,5 s)
# och kapar det svarta efter kritirisen (ca 1 s).
# 2026-11-23: 037 Kaninen städar (städsången) borttagen (Sanna: "remove the städ song"), 046 Kaninen går till doktorn
# in på dess plats (börjar direkt med kritan, inget kort att hoppa; 1,3 s svart efter kritirisen). Ny fil bredvid den publicerade.
A=../../../../avsnitt
UT=vardagsberattelser-mix-utan-stad.mp4
DELAR=(
  "bok|$A/021-hunden-leker/film/avsnitt-021.mp4||0||0.2"
  "bok|$A/022-kaninen-ater-frukost/film/avsnitt-022.mp4|f2a33a|3.3||1.0"
  "bok|$A/028-leoparden-bygger-i-sanden/film/avsnitt-028.mp4|f2c230|3.3||1.1"
  "bok|$A/020-grisen-badar/film/avsnitt-020.mp4|f3a1bb|10.6|egen|1.0"
  "bok|$A/024-lammet-klar-pa-sig/film/avsnitt-024.mp4|2fb5a8|3.3||1.0"
  "bok|$A/027-zebran-plockar-undan/film/avsnitt-027.mp4|f28d3c|3.3||1.0"
  "bok|$A/023-bjornen-tvattar-handerna/film/avsnitt-023.mp4|3b8fe0|3.3||1.0"
  "bok|$A/029-leoparden-plockar-applen/film/avsnitt-029.mp4|df342f|3.3||1.1"
  "bok|$A/046-kaninen-gar-till-doktorn/film/avsnitt-046.mp4|4fae4a|0||1.3"
  "bok|$A/026-zebran-gar-och-lagger-sig/film/avsnitt-026.mp4|435b9b|3.3||0"
)
source "$(dirname "$0")/../kategori-mix.sh"
