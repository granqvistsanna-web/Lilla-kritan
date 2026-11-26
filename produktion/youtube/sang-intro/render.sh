#!/bin/bash
# Renderar det gemensamma sångintrot (7,3 s, engelska 7,75 s) till intro.mp4 och intro-effekter.wav. Stillbilder: ./render.sh 1 3 4.5 5.5
# Ett nytt avsnitt kopierar mappen till avsnitt/NNN/intro/ och renderar där med sin egen scener/render.mjs (node scener/render.mjs intro).
# Jingeln (jingel-kort.m4a, två taktslag kortare så att slutet finns kvar) läggs i satt-ihop.sh: atrim=0:7.3,afade=t=out:st=6.95:d=0.35 (engelska: jingel-en, 7,25–7,75).
set -e -o pipefail
cd "$(dirname "$0")"
R=../../../avsnitt/030-borsta-borsta-gulliga-djur/scener/render.mjs
if [ $# -gt 0 ]; then node $R . "$@"; exit; fi
node $R . > /dev/null
D=$(basename "$PWD")
mv "$D.mp4" intro.mp4; mv "$D-effekter.wav" intro-effekter.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 intro.mp4
