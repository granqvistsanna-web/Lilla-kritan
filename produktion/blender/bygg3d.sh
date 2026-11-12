#!/bin/bash
# Bygger och renderar hela 3D-provet (katten i badrummet, 030, 0:15.6–0:20.1) och sätter ihop filmen med ljud och en sida-vid-sida.
#   bash produktion/blender/bygg3d.sh [ut-mapp för bildrutorna] [fler flaggor till bygg3d.py, t.ex. --prov 48]
# Blender 5.3 behövs: antingen programmet (BLENDER=/sökväg/till/blender, eller "blender" i PATH, eller Blender.app på Mac)
# eller Python-modulen (pip install bpy; PYTHON=/sökväg/till/python). En avbruten körning fortsätter där den slutade.
set -euo pipefail
cd "$(dirname "$0")/../.."
UT="${1:-/tmp/blender-3d-katt-v2}"; shift || true
PROV=avsnitt/030-borsta-borsta-gulliga-djur/provbild
MAC=/Applications/Blender.app/Contents/MacOS/Blender
if [ -n "${BLENDER:-}" ]; then KOR=("$BLENDER" -b -P)
elif command -v blender >/dev/null; then KOR=(blender -b -P)
elif [ -x "$MAC" ]; then KOR=("$MAC" -b -P)
else KOR=("${PYTHON:-python3}"); fi
"${KOR[@]}" produktion/blender/bygg3d.py -- "$UT" "$@"
[ "$(ls "$UT"/[0-9][0-9][0-9][0-9].png | wc -l)" -eq 135 ] || { echo "Det ska vara 135 bildrutor i $UT"; exit 1; }
# filmen: bildrutorna + ljudet ur det första provklippet (samma 4,5 s av sången)
ffmpeg -v error -y -framerate 30 -i "$UT/%04d.png" -i "$PROV/blender-3d-katt.mp4" -map 0:v -map 1:a -c:v libx264 -crf 15 -preset slow -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart "$PROV/blender-3d-katt-v2.mp4"
# sida vid sida: första provet till vänster, v2 till höger
ffmpeg -v error -y -i "$PROV/blender-3d-katt.mp4" -i "$PROV/blender-3d-katt-v2.mp4" -filter_complex "[0:v]scale=960:540[a];[1:v]scale=960:540[b];[a][b]hstack,pad=1920:1080:0:270:white" -map 0:a -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart "$PROV/blender-3d-katt-v2-sida-vid-sida.mp4"
echo "Klart: $PROV/blender-3d-katt-v2.mp4 och $PROV/blender-3d-katt-v2-sida-vid-sida.mp4"
