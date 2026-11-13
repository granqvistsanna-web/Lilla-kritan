#!/bin/bash
# Gula sången (011) som Shorts: bild i ruta (1,5:1) över suddig kopia, 1080×1920. Filmtid = sångtid + 23,4 s.
# Kör från repots rot: bash produktion/youtube/shorts/gula/klipp.sh
F=avsnitt/011-gula-helikoptern/film/avsnitt-011.mp4; O=produktion/youtube/shorts/gula
while IFS='|' read -r namn a b; do
  d=$(echo "$b - $a" | bc); u=$(echo "$d - 0.3" | bc)
  ffmpeg -nostdin -v error -y -ss $a -i $F -t $d -filter_complex "
    [0:v]split[b][f];
    [b]scale=-2:1920,crop=1080:1920,boxblur=40:2,eq=brightness=-0.07[bg];
    [f]crop=1620:1080,scale=1080:720[fg];
    [bg][fg]overlay=0:504,fade=in:0:st=0:d=0.3,fade=out:st=$u:d=0.3,format=yuv420p[v];
    [0:a]afade=in:d=0.3,afade=out:st=$u:d=0.3[a]" \
    -map "[v]" -map "[a]" -c:v libx264 -crf 20 -preset slow -c:a aac -b:a 192k -movflags +faststart $O/$namn.mp4
  echo "$namn $d s"
done <<L
gula-1-upp-till-solen|50.4|80.4
gula-2-vad-ar-gult-titta-dar|80.2|110.4
gula-3-nu-dansar-vi|161.2|192.2
gula-4-svara-med-oss|192.0|223.5
L
