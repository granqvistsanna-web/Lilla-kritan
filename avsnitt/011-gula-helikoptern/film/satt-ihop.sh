#!/bin/bash
# Grovklipp av avsnitt 011 Gula sången: introt (9,0 s) med jingeln och sedan kodscenerna efter varandra (tiderna ur
# storyboard-v2/storyboard.md via scener/film.js), sången (sang.m4a, oklippt) från avsnittstid 22,2 s,
# och scenernas effekter och röster (<scen>-effekter.wav) på sina platser.
# Kör efter `node scener/render.mjs <scen> [--snabb]` för alla scener: film/satt-ihop.sh → film/avsnitt-011-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
SCENER=(kritan-ritar himlen dammen discot slutet)
T=film/.tmp; rm -rf $T; mkdir -p $T
{ echo "file '../../intro/intro.mp4'"; for s in "${SCENER[@]}"; do echo "file '../../scener/$s/$s.mp4'"; done; } > $T/lista.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/lista.txt -an -vf "scale=1920:1080,fps=30" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p $T/bild.mp4
# effekterna: varje scens wav läggs där scenen börjar (summan av längderna före)
in=(-i intro/jingel.m4a -i intro/intro-effekter.wav); fx="[2:a]atrim=0:9,afade=t=out:st=8.6:d=0.4[e1];"; fl="[e1][3:a]"; n=2
start=$(ffprobe -v error -show_entries format=duration -of csv=p=0 intro/intro.mp4)
for s in "${SCENER[@]}"; do
  w=scener/$s/$s-effekter.wav
  if [ -f $w ]; then n=$((n+1)); in+=(-i $w); d=$(python3 -c "print(round($start*1000))"); fx="$fx[$((n+1)):a]adelay=$d|$d[e$n];"; fl="$fl[e$n]"; fi
  start=$(python3 -c "print($start + $(ffprobe -v error -show_entries format=duration -of csv=p=0 scener/$s/$s.mp4))")
done
# sången börjar 22,2 s in (rad 02a); tagningen klipps inte.
# skogsljud under ritandet: från kritsvepet ut ur introt (0:07.6) tills sången har börjat, tonas in och ut
SKOG=../../assets/ljud/effekter/skogsljud/skogsljud-1.m4a
ffmpeg -loglevel error -y -i $T/bild.mp4 -i sang.m4a "${in[@]}" -i $SKOG -filter_complex \
  "${fx}[1:a]volume=0.9,adelay=22200|22200[s];[$((n + 2)):a]atrim=0:17,afade=t=in:d=1.2,afade=t=out:st=14.6:d=2.2,volume=0.4,adelay=7600|7600[skog];[s][skog]${fl}amix=inputs=$((2 + n)):normalize=0:duration=longest,apad[a]" \
  -map 0:v -map "[a]" -shortest -c:v copy -c:a aac -b:a 192k film/avsnitt-011-grovklipp.mp4
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 film/avsnitt-011-grovklipp.mp4
