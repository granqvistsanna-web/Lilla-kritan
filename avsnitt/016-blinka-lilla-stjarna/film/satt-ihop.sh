#!/bin/bash
# Grovklipp av avsnitt 016 Blinka lilla stjärna (kopierad från 015:s satt-ihop.sh): storyboardens bilder som animatic, var och en så länge som
# scener/lager/matt.json "bilder" säger (avsnittstid), introt (intro/intro-med-jingel.mp4, nya introt 9,0 s) och kodscenerna
# ovanpå när de finns, med sina -effekter.wav, och under allt sången (sang.m4a, oklippt) från introts slut (9 s).
# Kör från var som helst: film/satt-ihop.sh [--snabb]  → film/avsnitt-016-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-016-grovklipp.mp4; T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30"; S=1920:1080
[ "$1" = --snabb ] && { V="-c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30"; S=960:540; }
# kodscener: filen och den storyboardbild scenen börjar på
SCENER=("intro/intro-med-jingel.mp4 00" "scener/kritan-ritar/kritan-ritar.mp4 01" "scener/kullen/kullen.mp4 03" "scener/vers-1/vers-1.mp4 05" "scener/mellanspel/mellanspel.mp4 11" "scener/vers-2/vers-2.mp4 16" "scener/slutet/slutet.mp4 22")

python3 - $T > $T/bilder.txt <<'PY'
import sys, json
B = json.load(open("scener/lager/matt.json"))["bilder"]
open(sys.argv[1] + "/start.txt", "w").write("".join(f"{k} {a:.3f}\n" for k, (a, b) in B.items()))
for k, (a, b) in B.items():
    print(f"file '../../storyboard/frames/{k}.jpg'\nduration {b - a:.3f}")
print(f"file '../../storyboard/frames/{k}.jpg'\n# slut {max(b for a, b in B.values()):.3f}")
PY
TOT=$(sed -n 's/^# slut //p' $T/bilder.txt)
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bilder.txt -vf "scale=$S,fps=30" -t $TOT $V $T/animatic.mp4

in=(); fk=""; prev="[0:v]"; n=0; fx=(); fxs=()
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ -f $f ] || continue
  start=$(awk -v id=$2 '$1 == id {print $2}' $T/start.txt)
  n=$((n+1)); in+=(-itsoffset $start -i $f)
  w=${f%.mp4}-effekter.wav; [ -f $w ] && fx+=(-i $w) && fxs+=($start)
  fk="$fk[$n:v]scale=$S,tpad=stop_mode=clone:stop_duration=0.2,trim=0:$([ $2 = 00 ] && echo 9 || echo 9999)[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
k=$((n + 1))
fa=""; fl=""; for i in "${!fxs[@]}"; do d=$(python3 -c "print(round(${fxs[$i]}*1000))"); fa="$fa[$((k + 1 + i)):a]adelay=$d|$d[e$i];"; fl="$fl[e$i]"; done
ffmpeg -loglevel error -y -i $T/animatic.mp4 "${in[@]}" -i sang.m4a "${fx[@]}" \
  -filter_complex "${fk}${fa}[$k:a]adelay=9000|9000[s];[1:a]atrim=0:9[j];[j][s]${fl}amix=inputs=$((2 + ${#fxs[@]})):duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "$prev" -map "[a]" $V -c:a aac -b:a 192k $UT
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
