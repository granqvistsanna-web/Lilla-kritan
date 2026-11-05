#!/bin/bash
# Klipper sang.m4a till sang-klippt.m4a, sångversionen som avsnittet byggs på (klipptid; avsnittstid = klipptid + 11 s).
# Tagning 2 (2026-11-05, "Orange sången (1).m4a", 4:00, ca 104 bpm, ett slag ≈ 0,576 s; tagning 1 ligger i sang-v1.m4a).
# Sanna 2026-11-05: "dont cut the music" – inget tas bort ur sången. En enda takt groove (sångtid 0:24.78–0:27.08, utan röst)
# läggs in vid 1:30.0, efter "Kan du se?", så att barnet får en kort paus (ca 2,3 s) medan musiken går vidare. Slutet kortas: till 3:37.1 (7,4 s efter sista "Hej då!":
# 3 s i 16f och 4,4 s under kritirisen i 17), tonas ut de sista 2 s, som 005. Klipptid = sångtid före 1:30.0, sångtid + 2,30 s efter.
set -e
cd "$(dirname "$0")/.."
DELAR=("0 90.0" "24.78 27.083" "90.0 217.1")
f=""; n=0; L=0
for d in "${DELAR[@]}"; do
  set -- $d
  f="$f[0:a]atrim=$1:$2,asetpts=PTS-STARTPTS[d$n];"
  L=$(awk "BEGIN{print $L + $2 - $1 - ($n > 0 ? 0.015 : 0)}"); n=$((n + 1))
done
prev="[d0]"
for ((i = 1; i < n; i++)); do f="$f${prev}[d$i]acrossfade=d=0.015:c1=tri:c2=tri[x$i];"; prev="[x$i]"; done
f="$f${prev}afade=t=out:st=$(awk "BEGIN{print $L - 2}"):d=2[ut]"
ffmpeg -loglevel error -y -i sang.m4a -filter_complex "$f" -map "[ut]" -c:a aac -b:a 192k sang-klippt.m4a
ffprobe -v error -show_entries format=duration -of csv=p=0 sang-klippt.m4a
