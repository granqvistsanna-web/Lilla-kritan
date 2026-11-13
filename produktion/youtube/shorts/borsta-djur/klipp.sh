#!/bin/bash
# Borsta, borsta (gulliga djur, 030) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Filmtid = sångtid + 8,6 s (rader.txt). Ett djur per klipp, den sista slutar efter hela "Hurra!" och alla-klippet börjar på "Hurra!", för sången har ingen lucka där. Scenen börjar 8,6333 s in i filmen (introt minus övertoningen; mätt mot filmen, 8,6 var en bildruta fel).
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/borsta-djur/klipp.sh
F=avsnitt/030-borsta-borsta-gulliga-djur/film/avsnitt-030.mp4; O=produktion/youtube/shorts/borsta-djur
SCENER=(
  "avsnitt/030-borsta-borsta-gulliga-djur/scener/badet 8.6333"
)
source produktion/youtube/shorts/staende.sh <<L
borsta-djur-1-katten|23.8|57.4
borsta-djur-2-kaninen|57.4|89.6
borsta-djur-3-pandan|89.6|121.0
borsta-djur-4-alla-dansar|120.05|158.6
L
