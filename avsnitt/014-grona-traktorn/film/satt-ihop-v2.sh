#!/bin/bash
# Grovklipp av 014 Gröna sången v2 (2026-11-26): introt (intro/v2/ = produktion/youtube/sang-intro i grönt, 7,3 s), kodscenerna i scener-v2/ efter varandra, sången (sang.m4a,
# oklippt) från avsnittstid 9,0 och varje scens effekter (<scen>-effekter.wav) där scenen börjar. Filmtid = avsnittstid.
# Kör efter `node scener-v2/render.mjs <scen> [--snabb]` (eller verktyg/render-delat.mjs) för alla scener:
#   bash film/satt-ihop-v2.sh → film/avsnitt-014-v2-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
SCENER=(kritan-ritar vagen bondgarden discot slutet)
T=film/.tmp-v2; rm -rf $T; mkdir -p $T
# introt och prenumerera-kortet (pc-omfång) görs om till tv-omfång som de molnrenderade scenerna, annars blir scenerna bleka i fogen (27/11, J13)
ffmpeg -loglevel error -y -i intro/v2/intro.mp4 -an -vf "scale=out_range=tv,format=yuv420p" -color_range tv -c:v libx264 -preset veryfast -crf 14 $T/intro.mp4
ffmpeg -loglevel error -y -i ../../produktion/youtube/prenumerera/prenumerera.mp4 -an -vf "scale=out_range=tv,format=yuv420p" -color_range tv -c:v libx264 -preset veryfast -crf 14 $T/prenumerera.mp4
{ echo "file 'intro.mp4'"; for s in "${SCENER[@]}"; do echo "file '../../scener-v2/$s/$s.mp4'"; done; echo "file 'prenumerera.mp4'"; } > $T/lista.txt   # sist prenumerera-kortet, som 054
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/lista.txt -an -vf "scale=1920:1080,fps=30" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -color_range tv $T/bild.mp4
# effekterna: varje scens wav där scenen börjar (summan av längderna före)
in=(-i intro/v2/jingel-kort.m4a -i intro/v2/intro-effekter.wav); fx="[2:a]atrim=0:7.3,afade=t=out:st=6.95:d=0.35[e1];"; fl="[e1][3:a]"; n=2
start=$(ffprobe -v error -show_entries format=duration -of csv=p=0 intro/v2/intro.mp4); sd=$(python3 -c "print(round($start*1000))")
for s in "${SCENER[@]}"; do
  w=scener-v2/$s/$s-effekter.wav
  if [ -f $w ]; then n=$((n+1)); in+=(-i $w); d=$(python3 -c "print(round($start*1000))"); fx="$fx[$((n+1)):a]adelay=$d|$d[e$n];"; fl="$fl[e$n]"; fi
  start=$(python3 -c "print($start + $(ffprobe -v error -show_entries format=duration -of csv=p=0 scener-v2/$s/$s.mp4))")
done
n=$((n+1)); in+=(-i ../../produktion/youtube/prenumerera/prenumerera-effekter.wav); d=$(python3 -c "print(round($start*1000))"); fx="$fx[$((n+1)):a]adelay=$d|$d[e$n];"; fl="$fl[e$n]"
# sången där introt slutar (det gemensamma sångintrot, 7,3 s med jingel-kort.m4a; scenerna räknar avsnittstid med 9,0, filmen är 1,7 s kortare), hela tagningen; mastras till ca −14 LUFS, toppen under −1,5 dBFS
ffmpeg -loglevel error -y -i $T/bild.mp4 -i sang.m4a "${in[@]}" -filter_complex \
  "${fx}[1:a]volume=0.9,adelay=$sd|$sd[s];[s]${fl}amix=inputs=$((1 + n)):normalize=0:duration=longest,loudnorm=I=-14:TP=-2.5:LRA=11,aresample=48000,apad[a]" \
  -map 0:v -map "[a]" -shortest -c:v copy -c:a aac -b:a 192k film/avsnitt-014-v2-grovklipp.mp4
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 film/avsnitt-014-v2-grovklipp.mp4
