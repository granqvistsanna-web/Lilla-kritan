#!/bin/bash
# Borsta, borsta jul (038) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Filmtid = sångtid + 8,6 s (rader.txt). Ett djur per klipp, pandans med dansmellanspelet, sist alla önskar god jul. Scenen börjar 8,6333 s in i filmen (mätt mot filmen).
# Skarvarna ligger i luckan mellan "Hurra!" och nästa "Här kommer"/"Alla" (mätt på ljudet): 60,3/60,4→60,7/60,5, 91,4→91,9/91,8, 142,3→142,5.
# Närbilderna på munnen har ingen .kropp i bild; fönstret står då i mitten, där munnen ligger (--skanna), så inga --fast behövs.
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/borsta-jul/klipp.sh
F=avsnitt/038-borsta-borsta-jul/film/avsnitt-038.mp4; O=produktion/youtube/shorts/borsta-jul
SCENER=(
  "avsnitt/038-borsta-borsta-jul/scener/badet 8.6333"
)
source produktion/youtube/shorts/staende.sh <<L
borsta-jul-1-katten|23.6|60.7
borsta-jul-2-kaninen|60.5|91.9
borsta-jul-3-pandan|91.8|142.5
borsta-jul-4-alla-god-jul|142.5|177.5
L
