#!/bin/bash
# Klipper sang.m4a till sang-klippt.m4a, sångversionen som avsnittet byggs på (klipptid; avsnittstid = klipptid + 11 s).
# Inga stammar än, så pauserna kortas och förlängs på hela mixen, i hela takter (4 slag, librosa: ett slag ≈ 0,588 s),
# så att takten går jämnt över skarvarna. Takterna som läggs in är grooven före vers 1 (sångtid 0:32.39–), utan röst.
#   1. Gissningspausen: bort 0:16.51–0:21.20 (2 takter)       → pausen ca 10,2 s → 5,5 s
#   2. Frågepausen: in 1 takt (0:32.39–0:34.76) vid 1:38.27  → pausen ca 0,6 s → 3,0 s
#   3. Bryggan: in 2 takter (0:32.39–0:37.11) vid 2:11.29    → luckan ca 1,8 s → 6,5 s
#   4. Grooven före sista refrängen: bort 3:07.76–3:14.79 (3 takter) → ca 11 s → 4 s
#   5. Slutet: till 3:40.0 (3 s efter "tut, tut"), tonas ut de sista 1,5 s
# Skarvarna har 15 ms övertoning så att de inte klickar. Tiderna står också i storyboard.md ("Klippet").
set -e
cd "$(dirname "$0")/.."
DELAR=("0 16.51" "21.20 98.27" "32.39 34.76" "98.27 131.29" "32.39 37.11" "131.29 187.76" "194.79 220.0")
f=""; n=0; L=0
for d in "${DELAR[@]}"; do
  set -- $d
  f="$f[0:a]atrim=$1:$2,asetpts=PTS-STARTPTS[d$n];"
  L=$(awk "BEGIN{print $L + $2 - $1 - ($n > 0 ? 0.015 : 0)}"); n=$((n + 1))
done
prev="[d0]"
for ((i = 1; i < n; i++)); do f="$f${prev}[d$i]acrossfade=d=0.015:c1=tri:c2=tri[x$i];"; prev="[x$i]"; done
f="$f${prev}afade=t=out:st=$(awk "BEGIN{print $L - 1.5}"):d=1.5[ut]"
ffmpeg -loglevel error -y -i sang.m4a -filter_complex "$f" -map "[ut]" -c:a aac -b:a 192k sang-klippt.m4a
ffprobe -v error -show_entries format=duration -of csv=p=0 sang-klippt.m4a
