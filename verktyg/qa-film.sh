#!/bin/bash
# QA på en färdig film: längd, ljudnivå, svart i slutet, frysta partier, lång tystnad och ett kontaktark (20 bilder).
#   bash verktyg/qa-film.sh avsnitt/NNN-namn/film/avsnitt-NNN.mp4 [utmapp]     (utmapp: där kontaktarket hamnar, annars filmens mapp)
# Läs så här: längden ska stämma med förhandsvisningen + introt, "fryst" ska vara tomt (bilden får aldrig stå helt still,
# inte heller i gissa-pauserna), svart bara sista sekunden, I ca −14 LUFS och Peak högst −1,5 dBFS.
f=$1; U=${2:-$(dirname "$f")}; n=$(basename "$f" .mp4); T=$(mktemp -d)
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
echo "$n längd $D  $(ffmpeg -hide_banner -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E ' I:|Peak:' | tail -2 | tr -s ' ' | tr '\n' ' ')"
echo " svart: $(ffmpeg -hide_banner -i "$f" -vf "blackdetect=d=0.3:pix_th=0.12:pic_th=0.97" -an -f null - 2>&1 | grep -o 'black_start:[0-9.]* black_end:[0-9.]*' | tr '\n' ';')"
echo " fryst >3s: $(ffmpeg -hide_banner -i "$f" -vf "freezedetect=n=0.001:d=3" -an -f null - 2>&1 | grep -o 'freeze_start: [0-9.]*\|freeze_duration: [0-9.]*' | tr '\n' ' ')"
echo " tyst >3s: $(ffmpeg -hide_banner -i "$f" -af silencedetect=n=-50dB:d=3 -vn -f null - 2>&1 | grep -o 'silence_start: [0-9.]*\|silence_duration: [0-9.]*' | tr '\n' ' ')"
for k in $(seq 1 19); do t=$(echo "$D*$k/20" | bc -l); ffmpeg -loglevel error -y -ss $t -i "$f" -frames:v 1 -vf scale=384:-1 $T/$(printf %02d $k).jpg; done
ffmpeg -loglevel error -y -ss $(echo "$D-1.4" | bc) -i "$f" -frames:v 1 -vf scale=384:-1 $T/20.jpg
ffmpeg -loglevel error -y -pattern_type glob -i "$T/*.jpg" -vf tile=5x4 -frames:v 1 "$U/$n-qa.jpg" && echo " kontaktark: $U/$n-qa.jpg"
rm -rf $T
