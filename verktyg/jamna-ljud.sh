#!/bin/bash
# Lyfter ljudet i en färdig film till samma nivå som de andra (−14,4 LUFS, toppar under −1 dB). Bilden kopieras orörd.
#   verktyg/jamna-ljud.sh avsnitt/003-bussen-halsar-pa/film/avsnitt-003-en.mp4 [fler filer]
# Körs efter satt-ihop.sh (en ny sammansättning skriver över filen, så kör det igen efteråt).
set -e
for f in "$@"; do
  I=$(ffmpeg -hide_banner -i "$f" -af loudnorm=print_format=json -f null - 2>&1 | grep '"input_i"' | tr -dc '0-9.-')
  G=$(awk "BEGIN{print -14.4 - ($I)}")
  ffmpeg -loglevel error -y -i "$f" -map 0 -c:v copy -af "volume=${G}dB,alimiter=limit=0.89:level=0" -c:a aac -b:a 192k "${f%.mp4}.tmp.mp4"
  mv "${f%.mp4}.tmp.mp4" "$f"
  echo "$f: $I → −14,4 LUFS (${G} dB)"
done
