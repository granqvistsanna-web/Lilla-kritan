#!/bin/bash
# Mors lilla Olle (017) som Shorts, stående 1080×1920 renderat ur avsnittets egna kodscener (figurerna i mitten, hela skärmen; staende.sh).
# Filmtid = sångtid + 9,0 s (introt är 9,000 s, hård skarv; scenen börjar 9,0 s in i filmen, mätt mot filmen). rader.txt:s "+11 s" är gammalt. Klippen är hela verser och mellanspel; det sista slutar med kritirisen.
# Klipp 2: --motiv 52.0-65.0:1102 (scentid) låser fönstret på Olle (x 1102) tills björnen tittar fram vid stenen (65,0); annars följde fönstret den gömda björnen och stenen och Olle hamnade vid kanten.
# Skarvarna är flyttade mot beställda tider (stund före/efter) så att inget "Hurra!" eller "dag!" klipps: 61,0→61,5 och 105,0→105,4 (sångens svans), mätt på ljudet.
# Rad: namn|start|slut (filmtid, s). Kör från repots rot: bash produktion/youtube/shorts/mors-lilla-olle/klipp.sh
F=avsnitt/017-mors-lilla-olle/film/avsnitt-017.mp4; O=produktion/youtube/shorts/mors-lilla-olle
SCENER=(
  "avsnitt/017-mors-lilla-olle/scener/skogen 9.0"
)
source produktion/youtube/shorts/staende.sh <<L
olle-1-i-skogen|25.5|61.5
olle-2-tittut-blabar|61.5|105.4||52.0-65.0:1102
olle-3-blabar-till-alla|105.4|144.0
L
