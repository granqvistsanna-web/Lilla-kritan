#!/bin/bash
# Zebran plockar undan (027, bilderbok) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figuren i mitten, hela skärmen; staende.sh).
# Tiderna är uppslagen i storyboard/rader.mjs (klippen börjar och slutar på en radskarv, mellan Malins repliker). Scenen börjar 3,3 s in i filmen (bilderboksintrot, 99 bildrutor; mätt mot filmen).
# Radions låt (stada-radion) är instrumental, så den får tona in och ut i klippkanten.
# När kritan ritar korgen och radion, när sakerna landar i korgen och när bollen ligger under sängen står fönstret på saken (--motiv,
# världens x i scenen), med zebran när båda ryms. Rad: namn|start|slut (filmtid, s)||motiv (scentid). Kör från repots rot: bash produktion/youtube/shorts/zebran-plockar/klipp.sh
F=avsnitt/027-zebran-plockar-undan/film/avsnitt-027.mp4; O=produktion/youtube/shorts/zebran-plockar
SCENER=(
  "avsnitt/027-zebran-plockar-undan/scener/sovrummet 3.3"
)
source produktion/youtube/shorts/staende.sh <<L
zebran-plockar-1-en-korg|28.13|61.63||33.6-51.0:330
zebran-plockar-2-en-radio|61.66|97.60||73.9-88.7:1210
zebran-plockar-3-ett-tva-i-korgen|112.95|143.18||122.3-126.6:440,130.7-137.0:440
zebran-plockar-4-var-ar-bollen|179.18|217.59||175.9-191.0:1150,195.6-214.3:1010
L
