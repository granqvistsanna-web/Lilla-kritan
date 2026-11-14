#!/bin/bash
# Renderar det gemensamma bilderbok-introt till intro.mp4 (1920×1080, 30 fps, med ljud) och intro-effekter.wav.
# Använder 023:s render.mjs (samma som 020:s). Stillbilder: ./render.sh 0.3 1 1.6 2.2 2.8 3.2
set -e -o pipefail
cd "$(dirname "$0")"
R=../../../avsnitt/023-bjornen-tvattar-handerna/scener/render.mjs
if [ $# -gt 0 ]; then node $R . "$@"; exit; fi
node $R . > /dev/null
D=$(basename "$PWD")
mv "$D.mp4" intro.mp4; mv "$D-effekter.wav" intro-effekter.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 intro.mp4
