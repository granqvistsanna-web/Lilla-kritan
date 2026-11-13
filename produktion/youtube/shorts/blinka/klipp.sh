#!/bin/bash
# Blinka lilla stjärna (016) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Filmtid = sångtid + 9 s (rader.txt); scenernas starttider ur scener/lager/matt.json. Varje klipp är hela verser eller hela instrumentala delar.
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/blinka/klipp.sh
F=avsnitt/016-blinka-lilla-stjarna/film/avsnitt-016-grovklipp.mp4; O=produktion/youtube/shorts/blinka
FIGUR='g[filter*=boil]>.kamera>g'   # 016:s figurer (kit.js) har ingen .kropp
SCENER=(
  "avsnitt/016-blinka-lilla-stjarna/scener/kullen 20.0"
  "avsnitt/016-blinka-lilla-stjarna/scener/vers-1 33.0"
  "avsnitt/016-blinka-lilla-stjarna/scener/mellanspel 66.5"
  "avsnitt/016-blinka-lilla-stjarna/scener/vers-2 93.0"
  "avsnitt/016-blinka-lilla-stjarna/scener/slutet 125.4"
)
source produktion/youtube/shorts/staende.sh <<L
blinka-1-blinka-lilla-stjarna|32.6|66.4
blinka-2-var-ar-stjarnan|66.4|92.7
blinka-3-dags-att-sova|92.6|125.3
blinka-4-stjarnorna-dansar|125.3|159.0
L
