#!/bin/bash
# Leoparden bygger i sanden (028, bilderbok) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Tiderna är Malins repliker (whisper på filmen 2026-11-13); klippen börjar och slutar mellan repliker. Scenen börjar 3,2667 s in i filmen (bilderboksintrot, 98 bildrutor; mätt mot filmen).
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/leoparden-sanden/klipp.sh
F=avsnitt/028-leoparden-bygger-i-sanden/film/avsnitt-028.mp4; O=produktion/youtube/shorts/leoparden-sanden
SCENER=(
  "avsnitt/028-leoparden-bygger-i-sanden/scener/stranden 3.2667"
)
source produktion/youtube/shorts/staende.sh <<L
sanden-1-en-hink|35.3|74.0
sanden-2-hinkhatt-och-sandkakor|78.4|112.4
sanden-3-var-ar-spaden|112.4|150.5|141.8-143.9:660
sanden-4-plask-plask|183.7|221.5
L
