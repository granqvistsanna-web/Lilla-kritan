#!/bin/zsh
# Mastrar en färdig luckas ljud så att alla luckor låter lika starkt: −16 LUFS integrerat och sann topp högst −1,5 dBTP.
# Bilden får en gång papperstextur (verktyg/papper-textur.png, overlay 0,45, stilla över hela bilden; Sanna 2026-11-16) och
# märks med comment=papper-<styrka>, så att en film som redan har den inte får den två gånger. PAPPER=0 hoppar över texturen.
#   produktion/youtube/shorts/jul/mastra.sh <mapp> [fil.mp4]
# fil: standard <mapp>/<mappens namn>.mp4 (den liggande filmen); ge t.ex. <mapp>/<namn>-staende.mp4 för den stående.
# Sist läggs 3D-introt och 3D-outrot på (three-rum/julkalender-intro/skarva.sh, inte med fil eller SKARVA=0).
# Skriver över filmen med den mastrade versionen och gör förhandskopian <fil utan .mp4>-liten.mp4 bredvid (1280 px bred,
# stående 720), och skriver ut nivån före och efter.
# Så går det till: ljudet mäts med ffmpegs loudnorm (bara mätningen), får en rak förstärkning upp eller ner till −16 LUFS och
# går genom en begränsare på −3 dB (i fyrdubbel samplingstakt, så att den sanna toppen efter AAC-kodningen håller −1,5 dBTP).
# Sedan mäts det igen och rättas en gång till om det hamnat mer än 0,2 LU fel. loudnorms eget andra pass används inte: det går
# över i dynamiskt läge på korta filmer och ger olika resultat för varje körning. Att köra skriptet igen på en mastrad film
# ändrar den inte (förstärkningen blir 0).
set -e
source ${0:A:h}/plats.sh   # högst två luckbyggen åt gången
mapp=${1:?"mapp saknas: mastra.sh <mapp> [fil.mp4]"}; mapp=${mapp%/}
fil=${2:-$mapp/${mapp:t}.mp4}
[[ -f $fil ]] || { echo "hittar inte $fil" >&2; exit 1; }
# mat <fil> -> "I TP" (LUFS och dBTP)
mat() { ffmpeg -hide_banner -nostats -i "$1" -vn -af "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 |
  python3 -c 'import sys, json, re; d = json.loads(re.findall(r"\{[^{}]*\}", sys.stdin.read())[-1]); print(d["input_i"], d["input_tp"])'; }
fore=($(mat $fil)); nu=($fore)
for varv in 1 2 3; do
  db=$(python3 -c "print(round(-16 - ($nu[1]), 2))")
  # klart när nivån är inom 0,2 LU och toppen under −1,5 dBTP
  python3 -c "import sys; sys.exit(0 if abs($db) <= 0.2 and $nu[2] <= -1.5 else 1)" && break
  tmp=${fil%.mp4}.mastrad.tmp.mp4
  ffmpeg -hide_banner -loglevel error -y -i $fil -map 0:v -map 0:a -c:v copy \
    -af "volume=${db}dB,aresample=192000,alimiter=limit=0.708:level=0:attack=5:release=60,aresample=48000" \
    -c:a aac -b:a 192k -movflags +faststart $tmp
  mv $tmp $fil; nu=($(mat $fil))
done
bredd=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 $fil); hojd=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nw=1:nk=1 $fil)
# Papperstextur: stilla papper (högpassat, medel 50 % grått) i overlay över hela bilden, en gång per film.
papper=${PAPPER:-0.45}
if [[ $papper != 0 && $(ffprobe -v error -show_entries format_tags=comment -of default=nw=1:nk=1 $fil) != papper-* ]]; then
  tmp=${fil%.mp4}.papper.tmp.mp4
  ffmpeg -hide_banner -loglevel error -y -i $fil -loop 1 -i ${0:A:h}/../../../../verktyg/papper-textur.png -filter_complex \
    "[1]scale=$(( bredd > hojd ? bredd : hojd )):-1,crop=${bredd}:${hojd}:0:0,format=gbrp[p];[0:v]format=gbrp[v];[v][p]blend=all_mode=overlay:all_opacity=${papper}:shortest=1,format=yuv420p[ut]" \
    -map '[ut]' -map 0:a -c:v libx264 -preset medium -crf 16 -tune animation -c:a copy -metadata comment=papper-${papper} -movflags +faststart $tmp
  mv $tmp $fil
fi
ffmpeg -hide_banner -loglevel error -y -i $fil -vf "scale=$(( bredd > hojd ? 1280 : 720 )):-2" -c:v libx264 -crf 27 -c:a aac -b:a 128k -movflags +faststart ${fil%.mp4}-liten.mp4
echo "${fil:t}: $fore[1] LUFS, topp $fore[2] dBTP  ->  $nu[1] LUFS, topp $nu[2] dBTP"
# 3D-intro och 3D-outro på liggande luckor (Sanna 2026-11-25), bara för luckans egen film; SKARVA=0 hoppar över
if [[ -z $2 && ${SKARVA:-1} != 0 ]] && grep -q "lucka" $mapp/index.html; then
  bash ${0:A:h}/../../../three-rum/julkalender-intro/skarva.sh $mapp
fi
