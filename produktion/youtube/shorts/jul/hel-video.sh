#!/bin/zsh
# Bygger en julkalenderlucka med en hel, orörd video bakom luckan (variant G i julkalender-plan.md):
#   produktion/youtube/shorts/jul/hel-video.sh <mapp>      t.ex. produktion/youtube/shorts/jul/10-lammen-strumpor
# Mappens index.html har bara luckans nummer och filmens sökväg (video.js). Skriptet gör:
#   1. tar filmens första och sista bild till <mapp>/forst.png och sist.png (de ligger bakom luckan)
#   2. renderar öppningen (bild 0 till och med första helt öppna bilden) och stängningen (från ca 0,3 s tystnad efter filmens sista
#      ljud, med filmens sista bild stilla, tills luckan är stängd och Malin sagt "Vi ses i morgon!") med render.mjs
#   3. mäter filmens ljudnivå och höjer/sänker ramens två delar lika mycket (mätt på stängningen, som alltid har samma repliker)
#      till samma nivå; öppningens sista 60 ms tonas ut så att inget ljud går in i filmens första sekund
#   4. fogar öppning + filmen + stängning med ffmpeg till <mapp>/<mappens namn>.mp4: 1920×1080, 30 bilder/s, yuv420p, en video-
#      och en ljudström. Filmen ändras inte (bild för bild), men kodas om en gång med x264 crf 16 och AAC 192k, eftersom filmens egna
#      strömmar (ofta fullt omfång, yuvj420p) inte går att foga till ramen utan det; omfånget görs om till vanligt (tv) utan att
#      färgerna ändras. Annan storlek skalas med svarta kanter (inte beskärning), annan bildfrekvens görs om till 30.
#   5. gör <mapp>/<namn>-liten.mp4 (1280 px bred) och skriver ut kontrollerna. Stillbilder vid skarvarna och vid 1 s hamnar i <mapp>/stills/.
# Samma kommando bygger om luckan, t.ex. när filmen bytts eller Malins repliker spelats in.
set -e
mapp=${1:?"mapp saknas: hel-video.sh <mapp>"}; mapp=${mapp%/}
cd ${0:A:h}/../../../..   # repots rot
[[ -f $mapp/index.html ]] || { echo "hittar inte $mapp/index.html" >&2; exit 1; }
namn=${mapp:t}; ut=$mapp/$namn.mp4; tmp=$mapp/tmp; stills=$mapp/stills; rm -rf $tmp; mkdir -p $tmp $stills
film=$(sed -n "s/.*film: *'\([^']*\)'.*/\1/p" $mapp/index.html | head -1)
[[ -f $film ]] || { echo "hittar inte filmen '$film'" >&2; exit 1; }
render() { node avsnitt/004-bussen-badar/scener/render.mjs $mapp "$@" | tail -1 | sed 's/, [0-9.]* s$//'; }
sond() { ffprobe -v error -select_streams $1 -show_entries stream=$2 -of default=nw=1:nk=1 "$3" | head -1; }
# mat <fil> -> "I TP" (LUFS och dBTP), som mastra.sh
mat() { ffmpeg -hide_banner -nostats -i "$1" -vn -af "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 |
  python3 -c 'import sys, json, re; d = json.loads(re.findall(r"\{[^{}]*\}", sys.stdin.read())[-1]); print(d["input_i"], d["input_tp"])'; }

# 1. stillbilderna
ffmpeg -hide_banner -loglevel error -y -i $film -frames:v 1 $mapp/forst.png
ffmpeg -hide_banner -loglevel error -y -sseof -1 -i $film -update 1 $mapp/sist.png   # skriver varje bild, den sista blir kvar
nb=$(sond v:0 nb_frames $film); fdur=$(python3 -c "print($nb / 30)")   # filmens längd i hela bildrutor

# 2. tider: sidans längd är OPPEN + 3 + 2,4 s (video.js), och --bara-ljud skriver en wav av exakt den längden
node avsnitt/004-bussen-badar/scener/render.mjs $mapp --bara-ljud > /dev/null
wav=$mapp/$namn-effekter.wav; sidlangd=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $wav); rm $wav
n0=$(python3 -c "print(round(($sidlangd - 5.4) * 30))")   # första helt öppna bildrutan
# tystnad efter filmens sista ljud: stängningens svisch ska inte börja ovanpå det
ljudslut=$(ffmpeg -hide_banner -nostats -sseof -4 -i $film -vn -af silencedetect=noise=-45dB:d=0.05 -f null - 2>&1 | python3 -c '
import sys, re
t = sys.stdin.read(); s = re.findall(r"silence_start: ([\d.]+)", t); e = re.findall(r"silence_end: ([\d.]+)", t)
print(f"{4 - float(s[-1]):.2f}" if s and len(e) < len(s) else "0.00")   # sekunder med tystnad i slutet av filmen (0 = ljud till sista bilden)')
hall=$(python3 -c "import math; print(max(0, math.ceil((0.3 - $ljudslut) * 30)))")   # bildrutor med stilla bild före stängningen
(( hall <= 60 )) || { echo "filmen slutar med ljud ($ljudslut s tystnad): stäng inte luckan över det" >&2; exit 1; }

# 3. rendera de två delarna (bara bilderna och ramens ljud, filmen kommer sedan)
oppning=$(render --fran 0 --till $(python3 -c "print(($n0 + 1) / 30)")); mv $oppning $tmp/oppning.mp4
stang=$(render --fran $(python3 -c "print(($n0 + 90 - $hall) / 30)")); mv $stang $tmp/stang.mp4
stdur=$(python3 -c "print(round(($sidlangd * 30 - ($n0 + 90 - $hall)) ) / 30)"); opdur=$(python3 -c "print(($n0 + 1) / 30)")

# ljudnivån: filmen mot stängningen (samma repliker varje gång), samma förändring för båda delarna
fm=($(mat $film)); sm=($(mat $tmp/stang.mp4)); db=$(python3 -c "print(round($fm[1] - ($sm[1]), 2))")
justera="volume=${db}dB,aresample=192000,alimiter=limit=0.794:level=0:attack=5:release=60,aresample=48000"

# 4. foga ihop. Varje del får exakt sin bildlängd i ljud (AAC-spår är lite längre än bilden).
w=$(sond v:0 width $film); h=$(sond v:0 height $film); fps=$(sond v:0 r_frame_rate $film)
anpassa="format=yuv420p,setsar=1"
[[ $fps == 30/1 ]] || anpassa="fps=30,$anpassa"
if [[ $w != 1920 || $h != 1080 ]]; then
  if (( w * 9 == h * 16 )); then anpassa="scale=1920:1080:flags=lanczos,$anpassa"
  else echo "OBS: filmen är ${w}x$h, inte 16:9: skalas med svarta kanter"; anpassa="scale=1920:1080:force_original_aspect_ratio=decrease:flags=lanczos,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black,$anpassa"; fi
fi
ljudlangd() { echo "aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur=$1,atrim=0:$1,asetpts=PTS-STARTPTS"; }
ffmpeg -hide_banner -loglevel error -y -i $tmp/oppning.mp4 -i $film -i $tmp/stang.mp4 -filter_complex "
  [0:v]format=yuv420p,setsar=1[v0]; [1:v]$anpassa[v1]; [2:v]format=yuv420p,setsar=1[v2];
  [0:a]$(ljudlangd $opdur),$justera,afade=t=out:st=$(python3 -c "print($opdur - 0.06)"):d=0.06[a0];
  [1:a]$(ljudlangd $fdur)[a1]; [2:a]$(ljudlangd $stdur),$justera[a2];
  [v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]" -map '[v]' -map '[a]' -r 30 -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p \
  -colorspace bt470bg -color_range tv -c:a aac -b:a 192k -movflags +faststart $ut
ffmpeg -hide_banner -loglevel error -y -i $ut -vf "scale=1280:-2" -c:v libx264 -crf 27 -c:a aac -b:a 128k -movflags +faststart $mapp/$namn-liten.mp4

# 5. kontroller
langd=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $ut); vfram=$(sond v:0 nb_frames $ut)
vantat=$(python3 -c "print(($n0 + 1 + $nb + ($sidlangd * 30 - ($n0 + 90 - $hall)) ) / 30)")   # öppning + film + stängning, i sekunder
# skarvarna: sista bilden före och första efter, och 1 s
last() { ffmpeg -hide_banner -loglevel error -y -i $ut -vf "select=eq(n\,$1)" -frames:v 1 -vsync 0 $stills/$2.png; }
f1=$(python3 -c "print(round($n0 + $nb))"); last $n0 skarv1-fore; last $((n0 + 1)) skarv1-efter; last $((f1)) skarv2-fore; last $((f1 + 1)) skarv2-efter
ffmpeg -hide_banner -loglevel error -y -ss 1 -i $ut -frames:v 1 $stills/vid-1s.png
psnr() { ffmpeg -hide_banner -i $stills/$1.png -i $stills/$2.png -lavfi psnr -f null - 2>&1 | sed -n 's/.*average:\([0-9.inf]*\).*/\1/p'; }
om=($(mat $tmp/oppning.mp4)); eft=($(mat $ut))
echo "$namn: ${langd%.*} s ($vfram bildrutor, väntat $vantat s), ${w}x$h $fps film, öppning ${opdur}s, film ${fdur}s, stängning ${stdur}s, stilla före stängning $hall bildrutor"
echo "  ljud: film $fm[1] LUFS (topp $fm[2]), stängning före $sm[1] -> ${db} dB, öppning (mätt) $om[1], hela luckan $eft[1] LUFS; filmen slutar med ${ljudslut}s tystnad"
echo "  skarvar (PSNR dB, högre än 35 = samma bild): $(psnr skarv1-fore skarv1-efter) vid öppningen, $(psnr skarv2-fore skarv2-efter) vid stängningen"
rm -rf $tmp
