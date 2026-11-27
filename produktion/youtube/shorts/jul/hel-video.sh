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
#   5. skriver ut kontrollerna. Stillbilder vid skarvarna och vid 1 s hamnar i <mapp>/stills/.
#   Valfritt: `fran: 9.4` hoppar över filmens början (sekunder), t.ex. avsnittets Lilla Kritan-intro, som inte ska vara med bakom
#   luckan (Sanna 2026-11-16). Ljudet tonas in under 0,15 s. forst.png blir bilden vid fran.
#   Valfritt: `till: 136.0` i index.html kapar filmens slut (sekunder) när slutkortet står för länge: filmen tonas ut under sista 0,3 s och
#   sista bilden blir bilden bakom stängningen. Filen på disk ändras inte. Utan till: spelas hela filmen.
#   Valfritt: `sist: 174.1` tar bilden bakom stängningen (sist.png) vid den tiden i filmen, när filmen slutar i svart (kritirisen):
#   annars stängs 3D-luckan över ett svart fönster (QA 26/11, J20). Filmen spelas ändå till slutet (eller till).
#   6. mastrar luckan till -16 LUFS med mastra.sh (som resten av kalendern), som också gör <namn>-liten.mp4 (1280 px bred). Det gamla läggs i <mapp>/aldre/ för hand.
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
mat() { local f=$1; shift; ffmpeg -hide_banner -nostats "$@" -i "$f" -vn -af "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 |
  python3 -c 'import sys, json, re; d = json.loads(re.findall(r"\{[^{}]*\}", sys.stdin.read())[-1]); print(d["input_i"], d["input_tp"])'; }

# 1. stillbilderna
fran=$(sed -n "s/.*fran: *\([0-9.]*\).*/\1/p" $mapp/index.html | head -1); fran=${fran:-0}   # valfritt: hoppa över filmens början (introt)
ffps=$(python3 -c "print($(sond v:0 r_frame_rate $film))")   # filmens bildfrekvens (--snabb: 15), bildrutorna nedan räknas i den (2026-11-19: J06 med 30 här klipptes bilden vid 8 s och ljudet vid 4 s)
f0=$(python3 -c "print(round($fran * $ffps))")   # första bildrutan som spelas
ffmpeg -hide_banner -loglevel error -y -i $film -vf "select=eq(n\,$f0)" -frames:v 1 -fps_mode passthrough $mapp/forst.png
till=$(sed -n "s/.*till: *\([0-9.]*\).*/\1/p" $mapp/index.html | head -1)   # valfritt: kapa filmens slut
# Kritirisen (Sanna 2026-11-27, J11): slutar filmen med irisen mot svart, slutar bilden en bildruta innan irisens kant syns, scenen står
# stilla 1 s (IRIS_HALL bildrutor) och 3D-dörren stänger över den, medan filmens ljud (sångens sista ackord) fortsätter under stängningen och
# tonas ut sista 0,8 s. Hittas av sig själv (verktyg/iris-start.py); `iris: 152.23` i index.html sätter tiden för hand, `iris: nej` stänger av.
iris=$(sed -nE "s/.*iris: *([0-9.]+|nej).*/\1/p" $mapp/index.html | head -1)
[[ -z $iris ]] && iris=$(python3 verktyg/iris-start.py $film $till)
[[ $iris == nej ]] && iris=""
[[ -z $iris ]] && python3 -c "import sys; sys.exit(0 if $(ffmpeg -hide_banner -sseof -0.2 -i $film -frames:v 1 -vf signalstats,metadata=print:key=lavfi.signalstats.YAVG -f null - 2>&1 | sed -n 's/.*YAVG=\([0-9.]*\).*/\1/p' | head -1 || echo 99) < 40 else 1)" && echo "OBS: filmen slutar mörkt men ingen kritiris hittades: kolla slutet, eller sätt iris: <tid> i index.html" >&2
[[ -n $iris ]] && till=$iris
nb=$(sond v:0 nb_frames $film)
# bildräknaren n ska följa tiden hela filmen: en film fogad med -c copy av delar i olika färgomfång (molnrenderad scen i tv + intro i pc)
# börjar om n vid fogen, och då hamnar select=n och trim fel (J06 27/11: 3,3 s fel, irisen gick till svart). Gör om filmen i ett omfång.
[[ $nb == <-> ]] || nb=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 $film)   # fogade filmer saknar ibland nb_frames
nt=$(ffmpeg -hide_banner -i $film -vf "select=eq(n\,$((nb - 1))),showinfo" -frames:v 1 -f null - 2>&1 | sed -n 's/.*pts_time:\([0-9.]*\).*/\1/p' | head -1)
python3 -c "import sys; sys.exit(0 if '$nt' and abs(float('$nt') - ($nb - 1) / $ffps) < 0.5 else 1)" || { echo "bildräknaren stämmer inte i $film (bild $((nb - 1)) vid ${nt:-?} s): filmen är fogad av delar i olika färgomfång, sätt ihop den igen med samma omfång (out_range=tv)" >&2; exit 1; }
sist=$(sed -n "s/.*sist: *\([0-9.]*\).*/\1/p" $mapp/index.html | head -1)   # valfritt: bilden bakom stängningen tas vid sist (s) i stället för filmens sista bild
if [[ -n $till ]]; then   # sista bilden är bild nb-1 av den kapade filmen
  nb=$(python3 -c "print(round($till * $ffps))")
  ffmpeg -hide_banner -loglevel error -y -i $film -vf "select=eq(n\,$((nb - 1)))" -frames:v 1 -fps_mode passthrough $mapp/sist.png
else
  ffmpeg -hide_banner -loglevel error -y -sseof -1 -i $film -update 1 $mapp/sist.png   # skriver varje bild, den sista blir kvar
fi
[[ -n $sist && -z $iris ]] && ffmpeg -hide_banner -loglevel error -y -i $film -vf "select=eq(n\,$(python3 -c "print(round($sist * $ffps))"))" -frames:v 1 -fps_mode passthrough $mapp/sist.png
nb=$((nb - f0)); fdur=$(python3 -c "print($nb / $ffps)")   # det som spelas, i hela bildrutor

# 2. tider: sidans längd är OPPEN + 3 + 2,4 s (video.js), och --bara-ljud skriver en wav av exakt den längden
node avsnitt/004-bussen-badar/scener/render.mjs $mapp --bara-ljud > /dev/null
wav=$mapp/$namn-effekter.wav; sidlangd=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $wav); rm $wav
oppen=$(node avsnitt/004-bussen-badar/scener/render.mjs $mapp --langd | tail -1 | python3 -c 'import sys, json; print(json.load(sys.stdin).get("oppen", ""))')
n0=$(python3 -c "print(round(${oppen:-$sidlangd - 5.4} * 30))")   # första helt öppna bildrutan (OPPEN ur video.js; äldre: sidans längd − 3 − 2,4 s)
# tystnad efter filmens sista ljud: stängningens svisch ska inte börja ovanpå det
ljudslut=$(ffmpeg -hide_banner -nostats -sseof -4 -i $film -vn -af silencedetect=noise=-45dB:d=0.05 -f null - 2>&1 | python3 -c '
import sys, re
t = sys.stdin.read(); s = re.findall(r"silence_start: ([\d.]+)", t); e = re.findall(r"silence_end: ([\d.]+)", t)
tyst = s and (len(e) < len(s) or float(e[-1]) > 3.9)   # sista tystnaden varar till filmens slut
print(f"{4 - float(s[-1]):.2f}" if tyst else "0.00")   # sekunder med tystnad i slutet av filmen (0 = ljud till sista bilden)')
[[ -n $till ]] && ljudslut=0.00   # kapad film: tonas ut precis vid snittet
hall=$(python3 -c "import math; print(max(1, math.ceil((0.3 - $ljudslut) * 30)))")
[[ -n $iris ]] && hall=${IRIS_HALL:-30}   # bildrutor med stilla bild före stängningen (minst 1: render.mjs ger ffmpeg ett ogiltigt -ss när ett ljud börjar exakt vid första bildrutan)
(( hall <= 60 )) || { echo "filmen slutar med ljud ($ljudslut s tystnad): stäng inte luckan över det" >&2; exit 1; }

# 3. rendera de två delarna (bara bilderna och ramens ljud, filmen kommer sedan)
oppning=$(render --fran 0 --till $(python3 -c "print(($n0 + 1) / 30)")); mv $oppning $tmp/oppning.mp4
stang=$(render --fran $(python3 -c "print(($n0 + 90 - $hall) / 30)")); mv $stang $tmp/stang.mp4
stdur=$(python3 -c "print(round(($sidlangd * 30 - ($n0 + 90 - $hall)) ) / 30)"); opdur=$(python3 -c "print(($n0 + 1) / 30)")

# ljudnivån: filmen mot stängningen (samma repliker varje gång), samma förändring för båda delarna
tt=(-ss $fran -t $fdur)   # nivån mäts på det som spelas
fm=($(mat $film $tt)); sm=($(mat $tmp/stang.mp4)); ram=$(sed -n "s/.*ram: *\(-*[0-9.]*\).*/\1/p" $mapp/index.html | head -1)   # valfritt: ramen ram dB högre/lägre än jämnt med filmen (t.ex. ram: -2)
db=$(python3 -c "print(round($fm[1] - ($sm[1]) + (${ram:-0}), 2))")
justera="volume=${db}dB,aresample=192000,alimiter=limit=0.794:level=0:attack=5:release=60,aresample=48000"

# 4. foga ihop. Varje del får exakt sin bildlängd i ljud (AAC-spår är lite längre än bilden).
w=$(sond v:0 width $film); h=$(sond v:0 height $film); fps=$(sond v:0 r_frame_rate $film)
anpassa="format=yuv420p,setsar=1"
[[ $fps == 30/1 ]] || anpassa="fps=30,$anpassa"
if [[ $w != 1920 || $h != 1080 ]]; then
  if (( w * 9 == h * 16 )); then anpassa="scale=1920:1080:flags=lanczos,$anpassa"
  else echo "OBS: filmen är ${w}x$h, inte 16:9: skalas med svarta kanter"; anpassa="scale=1920:1080:force_original_aspect_ratio=decrease:flags=lanczos,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black,$anpassa"; fi
fi
klipp="trim=start_frame=${f0}:end_frame=$((f0 + nb)),setpts=PTS-STARTPTS,"; tona=""; borjan=""
[[ -n $till && -z $iris ]] && tona=",afade=t=out:st=$(python3 -c "print($fdur - 0.3)"):d=0.3"
(( f0 > 0 )) && borjan="atrim=start=${fran},asetpts=PTS-STARTPTS,afade=t=in:d=0.15,"
ljudlangd() { echo "aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur=$1,atrim=0:$1,asetpts=PTS-STARTPTS"; }
ffmpeg -hide_banner -loglevel error -y -i $tmp/oppning.mp4 -i $film -i $tmp/stang.mp4 -filter_complex "
  [0:v]format=yuv420p,setsar=1[v0]; [1:v]${klipp}${anpassa}[v1]; [2:v]format=yuv420p,setsar=1[v2];
  [0:a]$(ljudlangd $opdur),$justera,afade=t=out:st=$(python3 -c "print($opdur - 0.06)"):d=0.06[a0];
  $(if [[ -n $iris ]]; then echo "[1:a]asplit[fa][fs]; [fa]${borjan}$(ljudlangd $fdur)[a1]; [fs]atrim=start=${iris},asetpts=PTS-STARTPTS,$(ljudlangd $stdur),afade=t=out:st=$(python3 -c "print($stdur - 0.8)"):d=0.8[sv]; [2:a]$(ljudlangd $stdur),${justera}[st]; [st][sv]amix=inputs=2:normalize=0:duration=first[a2];"; else echo "[1:a]${borjan}$(ljudlangd $fdur)${tona}[a1]; [2:a]$(ljudlangd $stdur),${justera}[a2];"; fi)
  [v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]" -map '[v]' -map '[a]' -r 30 -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p \
  -colorspace bt470bg -color_range tv -c:a aac -b:a 192k -movflags +faststart $ut
zsh ${0:A:h}/mastra.sh $mapp > $tmp/mastra.txt   # -16 LUFS och -liten.mp4

# 5. kontroller
langd=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $ut); vfram=$(sond v:0 nb_frames $ut)
vantat=$(python3 -c "print(($n0 + 1 + $nb * 30 / $ffps + ($sidlangd * 30 - ($n0 + 90 - $hall)) ) / 30)")   # öppning + film + stängning, i sekunder
# skarvarna: sista bilden före och första efter, och 1 s
last() { ffmpeg -hide_banner -loglevel error -y -i $ut -vf "select=eq(n\,$1)" -frames:v 1 -fps_mode passthrough $stills/$2.png; }
f1=$(python3 -c "print(round($n0 + $nb))"); last $n0 skarv1-fore; last $((n0 + 1)) skarv1-efter; last $((f1)) skarv2-fore; last $((f1 + 1)) skarv2-efter
ffmpeg -hide_banner -loglevel error -y -ss 1 -i $ut -frames:v 1 $stills/vid-1s.png
psnr() { ffmpeg -hide_banner -i $stills/$1.png -i $stills/$2.png -lavfi psnr -f null - 2>&1 | sed -n 's/.*average:\([0-9.inf]*\).*/\1/p'; }
om=($(mat $tmp/oppning.mp4)); eft=($(mat $ut)); mastrad=$(<$tmp/mastra.txt)
echo "$namn: $(python3 -c "print(round($langd, 2))") s ($vfram bildrutor, väntat $vantat s), ${w}x$h $fps film, öppning ${opdur}s, film ${fdur}s (från ${fran}s), stängning ${stdur}s, stilla före stängning $hall bildrutor"
echo "  ljud: film $fm[1] LUFS (topp $fm[2]), stängning före $sm[1] -> ${db} dB, öppning (mätt) $om[1], hela luckan efter mastring $eft[1] LUFS ($mastrad); filmen slutar med ${ljudslut}s tystnad"
echo "  skarvar (PSNR dB, högre än 35 = samma bild): $(psnr skarv1-fore skarv1-efter) vid öppningen, $(psnr skarv2-fore skarv2-efter) vid stängningen"
rm -rf $tmp
