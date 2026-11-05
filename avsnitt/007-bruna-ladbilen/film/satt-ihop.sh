#!/bin/bash
# Grovklipp av avsnitt 007 (efter 006:s satt-ihop.sh): en animatic av storyboardens bilder, var och en så länge som tider()
# i storyboard/bygg.py säger, med introt (intro/intro-med-jingel.mp4, kapat till 11 s) och kodscener ovanpå när de finns,
# och under allt den klippta sången (sang-klippt.m4a, se klipp-sang.sh) från introts slut (11 s).
# Kör från var som helst (film/satt-ihop.sh [--snabb]) efter `python -I storyboard/bygg.py`.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-007-grovklipp.mp4
T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30"; S=1920:1080
[ "$1" = --snabb ] && { V="-c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30"; S=960:540; }
# kodscener: filen och den storyboardbild scenen börjar på (fler läggs till här när de renderas)
SCENER=("intro/intro-med-jingel.mp4 01" "scener/kritan-ritar/kritan-ritar.mp4 02" "scener/vagen-1/vagen-1.mp4 03" "scener/vagen-2/vagen-2.mp4 06" "scener/angen/angen.mp4 10" "scener/discot/discot.mp4 15a" "scener/slutet/slutet.mp4 17")

# bildlistan och starttiderna ur bygg.py: bara tidsdelen körs (allt före REF = lambda), inga bilder byggs
python3 - storyboard/bygg.py $T > $T/bilder.txt <<'PY'
import sys
src = open(sys.argv[1]).read()
ns = {"__file__": sys.argv[1], "__name__": "tid"}
exec(compile(src[:src.index("\nREF = lambda")], sys.argv[1], "exec"), ns)
rader = list(zip(ns["SHOTS"], ns["tider"]()))
open(sys.argv[2] + "/start.txt", "w").write("".join(f"{s[0]} {a:.3f}\n" for s, (a, b, m) in rader))
for s, (a, b, m) in rader:
    print(f"file '../../storyboard/frames/{s[0]}.jpg'\nduration {b - a:.3f}")
print(f"file '../../storyboard/frames/{s[0]}.jpg'\n# slut {ns['SLUT']:.3f}")
PY
TOT=$(sed -n 's/^# slut //p' $T/bilder.txt)
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bilder.txt -vf "scale=$S,fps=30" -t $TOT $V $T/animatic.mp4

in=(); fk=""; prev="[0:v]"; n=0; fx=(); fxs=()
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ -f $f ] || continue
  start=$(awk -v id=$2 '$1 == id {print $2}' $T/start.txt)
  n=$((n+1)); in+=(-itsoffset $start -i $f)
  w=${f%.mp4}-effekter.wav; [ -f $w ] && fx+=(-i $w) && fxs+=($start)
  fk="$fk[$n:v]scale=$S,trim=0:$([ $2 = 01 ] && echo 11 || echo 9999)[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
[ -f sang-klippt.m4a ] || film/klipp-sang.sh
k=$((n + 1)); [ $n -gt 0 ] || prev=0:v
fa=""; fl=""; for i in "${!fxs[@]}"; do d=$(python3 -c "print(round(${fxs[$i]}*1000))"); fa="$fa[$((k + 1 + i)):a]adelay=$d|$d[e$i];"; fl="$fl[e$i]"; done
ffmpeg -loglevel error -y -i $T/animatic.mp4 "${in[@]}" -i sang-klippt.m4a "${fx[@]}" \
  -filter_complex "${fk}${fa}[$k:a]adelay=11000|11000[s];[1:a]atrim=0:11[j];[j][s]${fl}amix=inputs=$((2 + ${#fxs[@]})):duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "$prev" -map "[a]" $V -c:a aac -b:a 192k $UT
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
