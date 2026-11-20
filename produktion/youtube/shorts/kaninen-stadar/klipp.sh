#!/bin/bash
# Kaninen städar (037, bilderbok med sång) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Scenen börjar 3,3067 s in i filmen (bilderboksintrot 3,306667 s, sedan scenen med 0,4 s toning in; mätt mot filmen). Krittimern uppe till höger hamnar utanför fönstret.
# Skarv: 266,5→266,0 (andra klippet börjar före "En och två", som tar vid ca 266,2; whisper och ljudnivå på filmen).
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/kaninen-stadar/klipp.sh
F=avsnitt/037-kaninen-stadar/film/avsnitt-037.mp4; O=produktion/youtube/shorts/kaninen-stadar
SCENER=(
  "avsnitt/037-kaninen-stadar/scener/stada 3.3067"
)
source produktion/youtube/shorts/staende.sh <<L
stada-1-nu-ar-det-stadtid|3.31|39.8
stada-2-snart-ar-det-klart|266.0|314.4
L
