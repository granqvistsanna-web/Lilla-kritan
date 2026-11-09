#!/bin/bash
# Grovklipp av avsnitt 013 Röda sången: kodscenerna efter varandra (introt med jingeln och sedan scenerna, 0–2:35, tiderna ur
# storyboard-v2/storyboard.md via scener/film.js), sången (sang.m4a, med gissningspausen) från avsnittstid 24,5 s,
# och scenernas effekter och röster (<scen>-effekter.wav) på sina platser.
# Kör efter `node scener/render.mjs scener/<scen> [--snabb]` för alla scener: film/satt-ihop.sh → film/avsnitt-013-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
SCENER=(kritan-ritar vagen-1 applemarsch discot slutet)
T=film/.tmp; rm -rf $T; mkdir -p $T
# Väntan efter konturen kortas (Sanna 2026-11-09: "skip waiting here 0.17"): kritan-ritar mister scentid KAP (avsnittstid
# 18,0–21,0, kritan väntar och knackar), bild och effekter, och sången börjar KAP s tidigare så att allt efter står i takt som förut.
KAP0=8.2; KAP=1.5;   # Sanna 2026-11-09 "a bit slower drawing": konturen ritas 1,5 s längre (01b 0:18.5), väntan kortas lika mycket
 KAP1=$(python3 -c "print($KAP0 + $KAP)")
ffmpeg -loglevel error -y -i scener/kritan-ritar/kritan-ritar.mp4 -filter_complex "[0:v]trim=0:$KAP0,setpts=PTS-STARTPTS[a];[0:v]trim=$KAP1,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[v]" -map "[v]" -an -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p $T/kritan-ritar.mp4
ffmpeg -loglevel error -y -i scener/kritan-ritar/kritan-ritar-effekter.wav -filter_complex "[0:a]atrim=0:$KAP0,asetpts=PTS-STARTPTS[a];[0:a]atrim=$KAP1,asetpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=0:a=1[u]" -map "[u]" $T/kritan-ritar-effekter.wav
fil() { [ $1 = kritan-ritar ] && echo $T/$1$2 || echo scener/$1/$1$2; }
{ echo "file '../../intro/intro.mp4'"; for s in "${SCENER[@]}"; do echo "file '../../$(fil $s .mp4)'"; done; } > $T/lista.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/lista.txt -an -vf "scale=1920:1080,fps=30" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p $T/bild.mp4
# effekterna: varje scens wav läggs där scenen börjar (summan av längderna före)
in=(-i intro/jingel.m4a -i intro/intro-effekter.wav); fx="[2:a]atrim=0:9,afade=t=out:st=8.6:d=0.4[e1];"; fl="[e1][3:a]"; n=2
start=$(ffprobe -v error -show_entries format=duration -of csv=p=0 intro/intro.mp4)
for s in "${SCENER[@]}"; do
  w=$(fil $s -effekter.wav)
  if [ -f $w ]; then n=$((n+1)); in+=(-i $w); d=$(python3 -c "print(round($start*1000))"); fx="$fx[$((n+1)):a]adelay=$d|$d[e$n];"; fl="$fl[e$n]"; fi
  start=$(python3 -c "print($start + $(ffprobe -v error -show_entries format=duration -of csv=p=0 $(fil $s .mp4)))")
done
# sången börjar 19,2 s in (var 24,5 med det 11,3 s långa introt; introt kortat till 9,0 s och väntan KAP 3 s 2026-11-09).
# Sanna 2026-11-09 "start music a bit lower and fade in, a bit later": förspelet tonas in från tyst (sångtid 1,5–5,0 s, sången
# själv börjar 8,0); tagningen klipps inte.
# skogsljud under ritandet (Sanna 2026-11-09 "forest soundtrack on drawing intro"): från kritsvepet ut ur introt (0:07.6) tills sången har börjat, tonas in och ut
SKOG=../../assets/ljud/effekter/skogsljud/skogsljud-1.m4a
ffmpeg -loglevel error -y -i $T/bild.mp4 -i sang.m4a "${in[@]}" -i $SKOG -filter_complex \
  "${fx}[1:a]afade=t=in:st=0:d=0.6,volume=0.9,adelay=20700|20700[s];[$((n + 2)):a]atrim=0:15,afade=t=in:d=1.2,afade=t=out:st=12.3:d=2.2,volume=0.4,adelay=7600|7600[skog];[s][skog]${fl}amix=inputs=$((2 + n)):normalize=0:duration=longest,apad[a]" \
  -map 0:v -map "[a]" -shortest -c:v copy -c:a aac -b:a 192k film/avsnitt-013-grovklipp.mp4
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 film/avsnitt-013-grovklipp.mp4
