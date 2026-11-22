#!/bin/bash
# Tittut-mixen (2026-11-22): färdiga Tittut. Första behåller introkortet, sista behåller outrot;
# övriga hoppar kortet (3,9 s) och kapas när djuret landat i mitten (window.TIDER.mitt[1], mätt ur sidorna 2026-11-22;
# grisen i julskogen ur filmen: stegen slutar 155,2 s, Malin börjar 155,6 s).
# Feedback 2026-11-22: lammet i skogen-2 och kaninen i skogen bort; leoparden på ängen bort och ALDRIG med i någon mix
# (Sanna: "delete och ha aldrig med"). Grisens jultittut med (Sanna: "ha med jultittut också").
TT=../../tittut
UT=tittut-mix.mp4
DELAR=(
  "tittut|$TT/lekplatsen/kaninen/kaninen.mp4||0||22.34"
  "tittut|$TT/lekplatsen/hunden-hugo/hunden-hugo.mp4|a8784e|3.9||24.12"
  "tittut|$TT/skogen-gron/lammet-ludde/lammet-ludde.mp4|63ab54|3.9||24.21"
  "tittut|$TT/julskogen/grisen-greta/grisen-greta.mp4|df342f|3.9||25.25"
  "tittut|$TT/lekplatsen/leoparden-lova/leoparden-lova.mp4|f28d3c|3.9||24.21"
  "tittut|$TT/skogen-gron/kaninen-kanel/kaninen-kanel.mp4|3b8fe0|3.9||0"
)
source "$(dirname "$0")/../kategori-mix.sh"
