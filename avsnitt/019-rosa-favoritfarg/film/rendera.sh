#!/bin/bash
# Renderar avsnitt 019: introt och scenen (../scener, hela filmen efter introt, 255,7 s) i fyra delar parallellt,
# eftersom en hel rendering tar längre tid än ett kommando får ta. Delarna sätts ihop till scener/scener.mp4.
# Sedan: film/satt-ihop.sh.
set -e
cd "$(dirname "$0")/../../005-rosa-bilen/scener"
S=../../019-rosa-favoritfarg/scener
G=(0 64 128 192 255.7)
for i in 0 1 2 3; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & done
node render.mjs $S --bara-ljud > /dev/null &
node render.mjs ../../019-rosa-favoritfarg/intro > /dev/null &
wait
cd $S
for i in 0 1 2 3; do echo "file 'scener-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy scener.mp4
rm delar.txt scener-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 scener.mp4
