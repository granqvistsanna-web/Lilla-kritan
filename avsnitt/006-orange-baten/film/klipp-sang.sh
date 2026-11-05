#!/bin/bash
# Klipper sang.m4a till sang-klippt.m4a, sångversionen som avsnittet byggs på (klipptid; avsnittstid = klipptid + 11 s).
# Tagning 2 (2026-11-05, "Orange sången (1).m4a", 4:00, ca 104 bpm, ett slag ≈ 0,576 s; tagning 1 ligger i sang-v1.m4a).
# Inga stammar än, så pauserna ändras på hela mixen, i hela takter (4 slag) och i samma fas i takten, så att takten går
# jämnt över skarvarna. Takterna som läggs in är grooven före vers 1 (sångtid 0:24.78–0:29.39), utan röst.
#   1. Frågepausen: in 2 takter vid 1:30.00 (mellan "Kan du se?" och "Västen", som Suno sjöng ihop) → pausen ca 0 → 4,6 s
#   2. Bryggan: bort 2:01.60–2:03.90 (1 takt)                   → luckan ca 9,5 s → 7,2 s
#   3. Slutet: till 3:32.7 (3 s efter sista "Hej då!"), tonas ut de sista 1,5 s
# Gissningspausen (ca 4,2 s) och "Vem kan hjälpa?"-pausen (en hållen takt, ca 2,3 s) är som Suno sjöng dem.
# Skarvarna har 15 ms övertoning så att de inte klickar. Tiderna står också i storyboard.md ("Klippet").
set -e
cd "$(dirname "$0")/.."
DELAR=("0 90.0" "24.78 29.39" "90.0 121.6" "123.9 212.7")
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
