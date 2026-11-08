#!/bin/bash
# Grovklipp av avsnitt 013 Röda sången: kodscenerna efter varandra (introt med jingeln och sedan scenerna, 0–2:35, tiderna ur
# storyboard-v2/storyboard.md via scener/film.js), sången (sang.m4a, med gissningspausen) från avsnittstid 24,5 s,
# och scenernas effekter och röster (<scen>-effekter.wav) på sina platser.
# Kör efter `node scener/render.mjs scener/<scen> [--snabb]` för alla scener: film/satt-ihop.sh → film/avsnitt-013-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
SCENER=(kritan-ritar vagen-1 chilibilen discot slutet)
T=film/.tmp; rm -rf $T; mkdir -p $T
{ echo "file '../../intro/intro.mp4'"; for s in "${SCENER[@]}"; do echo "file '../../scener/$s/$s.mp4'"; done; } > $T/lista.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/lista.txt -an -vf "scale=1920:1080,fps=30" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p $T/bild.mp4
# effekterna: varje scens wav läggs där scenen börjar (summan av längderna före)
in=(-i intro/jingel.m4a -i intro/intro-effekter.wav); fx="[2:a]afade=t=out:st=8.9:d=1,atrim=0:9.9[e1];"; fl="[e1][3:a]"; n=2
start=$(ffprobe -v error -show_entries format=duration -of csv=p=0 intro/intro.mp4)
for s in "${SCENER[@]}"; do
  w=scener/$s/$s-effekter.wav
  if [ -f $w ]; then n=$((n+1)); in+=(-i $w); d=$(python3 -c "print(round($start*1000))"); fx="$fx[$((n+1)):a]adelay=$d|$d[e$n];"; fl="$fl[e$n]"; fi
  start=$(python3 -c "print($start + $(ffprobe -v error -show_entries format=duration -of csv=p=0 scener/$s/$s.mp4))")
done
ffmpeg -loglevel error -y -i $T/bild.mp4 -i sang.m4a "${in[@]}" -filter_complex \
  "${fx}[1:a]adelay=24500|24500[s];[s]${fl}amix=inputs=$((1 + n)):normalize=0:duration=longest,apad[a]" \
  -map 0:v -map "[a]" -shortest -c:v copy -c:a aac -b:a 192k film/avsnitt-013-grovklipp.mp4
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 film/avsnitt-013-grovklipp.mp4
