#!/bin/bash
# 019:s animatic: en stillbild per skott (index.html via 005:s render.mjs), lika länge som skottet, med sången.
# Tiderna och skottens id står i tider.txt (rad 1: stillbildernas tider, rad 2: id); skotten börjar FORSPEL s före sången.
# Kör: bash avsnitt/019-rosa-favoritfarg/storyboard/animatic.sh  → storyboard/animatic.mp4 och stills/sheet.jpg
set -e
cd "$(dirname "$0")"
FORSPEL=9; SLUT=$(awk "BEGIN{print 246.7+$FORSPEL}")
TIDER=($(sed -n 1p tider.txt)); START=($(grep -o "\['[0-9a-z]*', -\?[0-9.]*" index.html | awk -v f=$FORSPEL '{print $2+f}'))
(cd ../../005-rosa-bilen/scener && node render.mjs ../../019-rosa-favoritfarg/storyboard "${TIDER[@]}" >/dev/null)
: > lista.txt
for i in "${!TIDER[@]}"; do
  n=${START[$((i+1))]:-$SLUT}; d=$(awk "BEGIN{print $n-${START[$i]}}")
  echo "file 'stills/${TIDER[$i]}.jpg'" >> lista.txt; echo "duration $d" >> lista.txt
done
echo "file 'stills/${TIDER[${#TIDER[@]}-1]}.jpg'" >> lista.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i lista.txt -i ../sang.m4a -filter_complex \
  "[0:v]fps=30,scale=1920:1080,format=yuv420p[v];[1:a]adelay=$((FORSPEL*1000))|$((FORSPEL*1000)),apad[a]" \
  -map "[v]" -map "[a]" -t $SLUT -c:v libx264 -crf 20 -c:a aac -b:a 192k animatic.mp4
rm lista.txt
echo animatic.mp4
