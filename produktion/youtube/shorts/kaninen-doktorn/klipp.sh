#!/bin/bash
# Kaninen går till doktorn (046, bilderbok, Besöket) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Filmen är bara scenen (inget bilderboksintro före), så filmtid = scentid. Klippen börjar och slutar på radskarvar i rader.json, mellan Malins repliker.
# Rad: namn|start|slut (filmtid, s)[|fast][|motiv]. Kör från repots rot: bash produktion/youtube/shorts/kaninen-doktorn/klipp.sh
F=avsnitt/046-kaninen-gar-till-doktorn/film/avsnitt-046.mp4; O=produktion/youtube/shorts/kaninen-doktorn
SCENER=(
  "avsnitt/046-kaninen-gar-till-doktorn/scener/mottagningen 0"
)
source produktion/youtube/shorts/staende.sh <<L
doktorn-1-dunk-dunk|84.0|122.2
doktorn-2-gapa-aaa|158.0|198.5
doktorn-3-var-ar-leoparden|198.5|228.7|222.8-227.8:700,227.8-228.7:1000
L
# Short 3: 213,75–222,75 är närbilderna på pallen utan figur, där står fönstret i mitten och leoparden syns. Kramen (rad 30) skulle annars följa
# doktorn med kaninen halvt utanför, så fönstret låses på kaninen (x 700) och på närbilden efter kameraklippet vid ca 227,8 (x 1000).
