#!/bin/bash
# Zebran går och lägger sig (026, bilderbok) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Tiderna är Malins repliker (whisper på filmen 2026-11-13); klippen börjar och slutar mellan repliker. Scenen börjar 3,2667 s in i filmen (bilderboksintrot, 98 bildrutor; mätt mot filmen).
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/zebran/klipp.sh
F=avsnitt/026-zebran-gar-och-lagger-sig/film/avsnitt-026.mp4; O=produktion/youtube/shorts/zebran
SCENER=(
  "avsnitt/026-zebran-gar-och-lagger-sig/scener/sovrummet 3.2667"
)
source produktion/youtube/shorts/staende.sh <<L
zebran-1-en-kudde|41.8|74.2
zebran-2-tittut|94.3|124.2
zebran-3-god-natt-lampan|124.2|150.0|129.8-131.5:1600,133.5-135.7:1600
zebran-4-var-ar-nallen|150.1|184.05
L
