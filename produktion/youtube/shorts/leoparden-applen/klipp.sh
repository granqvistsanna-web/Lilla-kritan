#!/bin/bash
# Leoparden plockar äpplen (029, bilderbok) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Tiderna är Malins repliker (whisper på filmen 2026-11-13); klippen börjar och slutar mellan repliker. Scenen börjar 3,2667 s in i filmen (bilderboksintrot, 98 bildrutor; mätt mot filmen).
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/leoparden-applen/klipp.sh
F=avsnitt/029-leoparden-plockar-applen/film/avsnitt-029.mp4; O=produktion/youtube/shorts/leoparden-applen
SCENER=(
  "avsnitt/029-leoparden-plockar-applen/scener/appeltradet 3.2667"
)
source produktion/youtube/shorts/staende.sh <<L
applen-1-en-korg|36.4|75.5
applen-2-vips-i-korgen|113.2|148.6
applen-3-var-ar-applet|150.1|193.5
applen-4-tittut|194.6|223.6
L
