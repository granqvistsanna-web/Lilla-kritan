#!/bin/bash
# Tittut-mixen (2026-11-22): alla färdiga Tittut utom julskogen. Första behåller introkortet, sista behåller outrot;
# övriga hoppar kortet (3,9 s) och kapas när djuret landat i mitten (window.TIDER.mitt[1], mätt ur sidorna 2026-11-22;
# skogen/kaninen och ängen ur filmerna, sidorna har ändrats sedan).
TT=../../tittut
UT=tittut-mix.mp4
DELAR=(
  "tittut|$TT/lekplatsen/kaninen/kaninen.mp4||0||22.34"
  "tittut|$TT/skogen-2/lammet-ludde/lammet-ludde.mp4|2fb5a8|3.9||22.55"
  "tittut|$TT/lekplatsen/hunden-hugo/hunden-hugo.mp4|a8784e|3.9||24.12"
  "tittut|$TT/skogen/kaninen-kanel/kaninen-kanel.mp4|4fae4a|3.9||20.8"
  "tittut|$TT/angen/leoparden-lova/leoparden-lova.mp4|f2c230|3.9||24.2"
  "tittut|$TT/skogen-gron/lammet-ludde/lammet-ludde.mp4|63ab54|3.9||24.21"
  "tittut|$TT/lekplatsen/leoparden-lova/leoparden-lova.mp4|f28d3c|3.9||24.21"
  "tittut|$TT/skogen-gron/kaninen-kanel/kaninen-kanel.mp4|3b8fe0|3.9||0"
)
source "$(dirname "$0")/../kategori-mix.sh"
