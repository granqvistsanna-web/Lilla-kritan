#!/bin/bash
# Borsta, borsta (dinosaurier, 033) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Filmtid = sångtid + 8,6 s (rader.txt). En dino per klipp, den sista slutar efter hela "Hurra!" och alla-klippet börjar på "Hurra!", för sången har ingen lucka där. Scenen börjar 8,6333 s in i filmen (introt minus övertoningen; mätt mot filmen, 8,6 var en bildruta fel).
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/borsta-dino/klipp.sh
F=avsnitt/033-borsta-borsta-dinosaurier/film/avsnitt-033.mp4; O=produktion/youtube/shorts/borsta-dino
SCENER=(
  "avsnitt/033-borsta-borsta-dinosaurier/scener/badet 8.6333"
)
source produktion/youtube/shorts/staende.sh <<L
borsta-dino-1-lila-dinon|18.8|52.6
borsta-dino-2-roda-dinon|52.6|84.9
borsta-dino-3-bla-dinon|84.9|116.35
borsta-dino-4-alla-dansar|115.3|148.6
L
