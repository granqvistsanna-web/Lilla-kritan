#!/bin/bash
# Grovklipp av 007 v2 (v2/storyboard-forslag.md, sången v2/sang.m4a): introt (intro/intro-med-jingel.mp4, de första 11 s) och
# kodscenerna (-v2-filerna) på sina starttider ur v2/bilder.json, sången från "sang" i bilder.json (efter kritan ritar, som 019),
# scenernas effekt-wav (berättaren och skogsljudet i kritan-ritar), och den kolabruna molnövergången (film/moln) över skarvarna.
# Senare scener i SCENER läggs ovanpå: v2-landet går hela vägen, vägen tillbaka (v2-vag2), discot (v2-disco) och närbilderna i rutschkanan (v2-fart1–5) täcker sina bitar. Ingen storyboard-animatic under: scenerna täcker hela tiden.
# Rendera först: node scener/render.mjs scener/<scen> --v2 [--snabb] för kritan-ritar, v2-vagen, v2-landet, v2-vag2, v2-disco och v2-disco2 (slutet i discot).
#   film/satt-ihop-v2.sh [--snabb]  → film/avsnitt-007-v2-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
V="-c:v libx264 -pix_fmt yuv420p -r 30"; S=1920:1080
[ "$1" = --snabb ] && { V="-c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30"; S=960:540; }
B=v2/bilder.json; start() { python3 -c "import json,sys; print(json.load(open('$B'))['$1'][${2:-0}])"; }
TOT=$(start sang 1); SANG0=$(start sang)
SCENER=("intro/intro-med-jingel.mp4 01" "scener/v2-ritar/v2-ritar-v2.mp4 02" "scener/v2-vagen/v2-vagen-v2.mp4 v2-vagen" "scener/v2-landet/v2-landet-v2.mp4 v2-landet" "scener/v2-vag2/v2-vag2-v2.mp4 v2-vag2" "scener/v2-disco/v2-disco-v2.mp4 v2-disco" "scener/v2-disco2/v2-disco2-v2.mp4 v2-disco2"
  "scener/v2-fart1/v2-fart1-v2.mp4 v2-fart1" "scener/v2-fart2/v2-fart2-v2.mp4 v2-fart2" "scener/v2-fart3/v2-fart3-v2.mp4 v2-fart3" "scener/v2-fart4/v2-fart4-v2.mp4 v2-fart4" "scener/v2-fart5/v2-fart5-v2.mp4 v2-fart5")   # närbilderna i rutschkanan: raka klipp, ingen molnövergång
MOLN=($(start v2-vagen) $(start v2-landet) $(start v2-vag2) $(start v2-disco) $(start v2-disco 1) $(start v2-disco2))   # skarvar med molnövergång (avsnittstid)
[ -d film/moln/bilder ] || node film/moln/render.mjs 2.0

in=(); fk=""; prev="[0:v]"; n=0; fx=(); fxs=()
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ -f $f ] || { echo "saknas: $f"; continue; }
  s=$(start $2); n=$((n+1)); in+=(-itsoffset $s -i $f)
  w=${f%.mp4}-effekter.wav; [ -f $w ] && fx+=(-i $w) && fxs+=($s)
  fk="$fk[$n:v]scale=$S,trim=0:$([ $2 = 01 ] && echo 9 || echo 9999),tpad=stop_mode=clone:stop_duration=$([[ $2 = v2-fart* || $2 = v2-vag2 ]] && echo 0 || echo 0.3)[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
for j in "${MOLN[@]}"; do
  n=$((n+1)); in+=(-itsoffset $(awk "BEGIN{print $j-1.0}") -framerate 30 -i film/moln/bilder/%04d.png)
  fk="$fk[$n:v]scale=$S[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
# skogsljudet börjar redan 0:07 under introts slut (Sanna 2026-11-09): de sista 2 s av loopen, som går runt utan skarv in i kritan-ritars skogsljud
SKOG=../../assets/ljud/effekter/skogsljud/skogsljud-1.m4a; SKOG_LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $SKOG | cut -d. -f1)
k=$((n + 1)); fa=""; fl=""
for i in "${!fxs[@]}"; do d=$(python3 -c "print(round(${fxs[$i]}*1000))"); fa="$fa[$((k + 1 + i)):a]adelay=$d|$d[e$i];"; fl="$fl[e$i]"; done
ffmpeg -loglevel error -y -f lavfi -i "color=black:s=${S/:/x}:r=30:d=$TOT" "${in[@]}" -i v2/sang.m4a "${fx[@]}" -ss $((SKOG_LEN - 2)) -i $SKOG \
  -filter_complex "${fk}${fa}[$k:a]afade=t=in:d=1.5,adelay=$(python3 -c "print(round($SANG0*1000))")|$(python3 -c "print(round($SANG0*1000))")[s];[1:a]atrim=0:11[j];[$((k + 1 + ${#fxs[@]})):a]atrim=0:2,afade=t=in:d=2,volume=0.26,adelay=7000|7000[skog];[j][s]${fl}[skog]amix=inputs=$((3 + ${#fxs[@]})):duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "$prev" -map "[a]" -t $TOT $V -c:a aac -b:a 192k film/avsnitt-007-v2-grovklipp.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 film/avsnitt-007-v2-grovklipp.mp4
