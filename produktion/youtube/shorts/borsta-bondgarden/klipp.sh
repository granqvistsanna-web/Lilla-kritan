#!/bin/bash
# Borsta, borsta (bondgården, 031) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Filmtid = sångtid + 8,6 s (rader.txt). Ett djur per klipp, lammets med dansmellanspelet, sist alla dansar. Scenen börjar 8,6333 s in i filmen (mätt mot filmen).
# Skarvarna ligger i luckan mellan "Hurra!" och nästa "Här kommer" (mätt på ljudet): 48,6→49,05 och 76,6→76,85 (båda låg mitt i "Hurra!").
# Närbilderna på munnen har ingen .kropp i bild; fönstret står då i mitten, där munnen ligger (--skanna), så inga --fast behövs.
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/borsta-bondgarden/klipp.sh
F=avsnitt/031-borsta-borsta-bondgarden/film/avsnitt-031.mp4; O=produktion/youtube/shorts/borsta-bondgarden
SCENER=(
  "avsnitt/031-borsta-borsta-bondgarden/scener/badet 8.6333"
)
source produktion/youtube/shorts/staende.sh <<L
borsta-bondgarden-1-grisen|19.0|49.05
borsta-bondgarden-2-kon|49.05|76.85
borsta-bondgarden-3-lammet|76.85|135.6
borsta-bondgarden-4-alla-dansar|135.6|164.6
L
