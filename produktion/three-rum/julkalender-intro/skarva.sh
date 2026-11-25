#!/bin/bash
# Lägger 3D-introt och 3D-outrot på en färdig julkalenderlucka (Sanna 25/11: "all julkal needs new intro + outro"):
# introts bildrutor fram till OPPEN, luckans egen film däremellan, och outrots bildrutor i stället för luckans sista slutRutor
# (vanliga luckor 72 rutor, "Vi ses i morgon!"; lucka 24 350 rutor, alla-luckor).
#   bash produktion/three-rum/julkalender-intro/skarva.sh <luckmapp>     t.ex. produktion/youtube/shorts/jul/13-tre-pussel
#   bash produktion/three-rum/julkalender-intro/skarva.sh --alla         alla 24 luckor i tabellen i produktion/youtube/julkalender-parkerade.md
# Körs av sig själv i slutet av jul/mastra.sh (SKARVA=0 hoppar över), så hel-video.sh och kodluckornas render-delat + mastra.sh
# ger 3D-ramen utan extra steg.
# Tiderna är lucka.js egna (sidan räknar dem ur samma repliker, render.mjs --tider), så ljudet är luckans eget hela vägen och de
# nya effekterna läggs ovanpå, ur sidans egna listor (window.LJUD_NYA för introt, window.LJUD_SLUT för outrot), så att nya effekter i
# rum.js kommer med utan ändring här. Bilden bakom dörren (forst.png, sist.png) tas ur luckans egen film vid skarvarna, så att de möts exakt.
# Introt och outrot sparas i <luckmapp>/3d/ och renderas bara om när rum.js eller bilderna bakom dörren har ändrats.
# Filmen skrivs över (märkt comment=<…>-3d). En film som redan är skarvad kan skarvas igen: tidslinjen är densamma.
# Bara liggande (1920 bred). Kvällsluckor (kvall) får samma 3D-ram, den har ingen kvällsvariant.
set -euo pipefail
SJALV="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
cd "$(dirname "$0")/../../.."
if [[ ${1:-} == --alla ]]; then   # alla 24 luckor ur tabellen i julkalender-parkerade.md; fortsätter förbi luckor som inte går, och listar dem sist
  fel=()
  for m in $(sed -n 's/^| [0-9]* | J[0-9]* | `\([^`]*\)`.*/\1/p' produktion/youtube/julkalender-parkerade.md); do
    bash "$SJALV" produktion/youtube/shorts/jul/$m 2>&1 | grep -v '^ruta ' || fel+=("$m")
  done
  (( ${#fel[@]} == 0 )) || { echo "gick inte: ${fel[*]}"; exit 1; }
  exit 0
fi
mapp=${1:?"luckmapp saknas (eller --alla)"}; mapp=${mapp%/}
D=produktion/three-rum/julkalender-intro
namn=$(basename "$mapp"); LUCKA=$mapp/$namn.mp4; X=$mapp/3d; mkdir -p "$X"
[[ -f $LUCKA ]] || { echo "hittar inte $LUCKA" >&2; exit 1; }
[[ $(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 "$LUCKA") == 1920 ]] || { echo "$namn: inte liggande, ingen 3D-ram"; exit 0; }
N=$(sed -n "s/.*lucka: *\([0-9]*\).*/\1/p" "$mapp/index.html" | head -1)
[[ -n $N ]] || N=$(sed -n "s/.*lucka\.bygg([^,]*, *\([0-9]*\).*/\1/p" "$mapp/index.html" | head -1)
[[ -n $N ]] || { echo "hittar inte luckans nummer i $mapp/index.html" >&2; exit 1; }
SLUTTYP=$(sed -n "s/.*slut: *'\([a-z-]*\)'.*/\1/p" "$mapp/index.html" | head -1); SLUTTYP=${SLUTTYP:-vi-ses-i-morgon}
FRAGA="lucka=$N&slut=$SLUTTYP&inne=/$X/forst.png"
R() { node produktion/three-rum/render.mjs $D "$@"; }
TID=$(R --tider --fraga "lucka=$N&slut=$SLUTTYP" | tail -1)   # tiderna beror inte på bilden (standardbilden finns alltid)
j() { python3 -c "import json,sys; print(eval(sys.argv[2], {}, json.loads(sys.argv[1])))" "$TID" "$1"; }
RUTA=$(j "round(OPPEN*30)"); SLUTRUTOR=$(j slutRutor);
NB=$(ffprobe -v error -count_packets -select_streams v -show_entries stream=nb_read_packets -of csv=p=0 "$LUCKA" | tr -d ,)
S0=$((NB - SLUTRUTOR))
(( S0 > RUTA + 30 )) || { echo "$namn: filmen är för kort för ramen ($NB rutor)" >&2; exit 1; }

# bilderna bakom dörren ur luckans egen film; skarvkontroll: rutan vid OPPEN ska vara samma bild som nästa (innehållet har börjat),
# annars är luckans 2D-intro gjort med andra tider (t.ex. renderad som en annan lucka) och måste byggas om först
ruta() { ffmpeg -loglevel error -y -i "$LUCKA" -vf "select=eq(n\,$1)" -frames:v 1 -fps_mode passthrough "$2"; }
ruta $RUTA "$X/ny-forst.png"; ruta $((RUTA + 1)) "$X/efter.png"; ruta $((S0 - 1)) "$X/ny-sist.png"; ruta $S0 "$X/fore-stang.png"
psnr() { ffmpeg -hide_banner -i "$1" -i "$2" -lavfi psnr -f null - 2>&1 | sed -n 's/.*average:\([0-9.inf]*\).*/\1/p'; }
P1=$(psnr "$X/ny-forst.png" "$X/efter.png"); P2=$(psnr "$X/ny-sist.png" "$X/fore-stang.png"); rm "$X/efter.png" "$X/fore-stang.png"
python3 -c "import sys; sys.exit(0 if min(float('$P1'), float('$P2')) > 22 else 1)" || {
  echo "$namn: skarven stämmer inte (PSNR $P1 vid OPPEN, $P2 vid stängningen): bygg om 2D-luckan först (hel-video.sh / render-delat + mastra.sh)" >&2; exit 2; }
andrad=0   # rendera om när bilderna bakom dörren, tiderna eller rum.js har ändrats
for b in forst sist; do cmp -s "$X/ny-$b.png" "$X/$b.png" 2>/dev/null || { mv "$X/ny-$b.png" "$X/$b.png"; andrad=1; }; rm -f "$X/ny-$b.png"; done
[[ -f $X/tider.json && $(cat "$X/tider.json") == "$TID" ]] || andrad=1
for del in intro slut; do
  if [[ $andrad == 1 || ! -f $X/$del.mp4 || $D/rum.js -nt $X/$del.mp4 ]]; then
    q=$FRAGA; [[ $del == slut ]] && q="$q&del=slut"
    R --fraga "$q" --ut "$X/$del.mp4" > /dev/null
  fi
done
echo "$TID" > "$X/tider.json"

ms() { python3 -c "print(round($1*1000))"; }
E=assets/ljud/effekter; UT=$mapp/$namn.3d.tmp.mp4
# de nya effekterna ur sidan: LJUD_NYA (introt, filmens tid) och LJUD_SLUT (outrot, flyttade till där outrot börjar i filmen), vol × 0,4 som render.mjs
EFF=$(python3 -c "
import json, sys; d = json.loads(sys.argv[1]); s0 = $S0 / 30; t0 = round(d['T0'] * 30) / 30
for c in d['LJUD_NYA']: print(c['t'], c['fil'], c['vol'])
for c in d['LJUD_SLUT']: print(s0 + c['t'] - t0, c['fil'], c['vol'])" "$TID")
IN=(); MIX=""; NAMN="[l]"; i=3
while read -r t fil vol; do [[ -n $t ]] || continue
  IN+=(-i "$fil"); MIX+="[$i:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=$(python3 -c "print(round($vol*0.4,3))"),adelay=$(ms "$t"):all=1[e$i];"; NAMN+="[e$i]"; i=$((i + 1))
done <<< "$EFF"
KOMMENTAR=$(ffprobe -v error -show_entries format_tags=comment -of default=nw=1:nk=1 "$LUCKA"); KOMMENTAR=${KOMMENTAR%-3d}
ffmpeg -y -loglevel error -i "$X/intro.mp4" -i "$LUCKA" -i "$X/slut.mp4" ${IN[@]+"${IN[@]}"} -filter_complex "
  [0:v]trim=end_frame=$RUTA,setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=$RUTA:end_frame=$S0,setpts=PTS-STARTPTS[b];
  [2:v]trim=end_frame=$SLUTRUTOR,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[v];$MIX
  [1:a]aformat=sample_rates=48000:channel_layouts=stereo[l];${NAMN}amix=inputs=$((i - 2)):normalize=0:duration=first[au]" \
  -map '[v]' -map '[au]' -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k \
  -metadata comment="${KOMMENTAR:+$KOMMENTAR-}3d" -movflags +faststart "$UT"
NU=$(ffprobe -v error -count_packets -select_streams v -show_entries stream=nb_read_packets -of csv=p=0 "$UT" | tr -d ,)
(( NU == NB )) || { echo "$namn: fel antal rutor efter skarven ($NU, väntat $NB)" >&2; rm "$UT"; exit 1; }
[[ $(ffprobe -v error -show_entries format_tags=comment -of default=nw=1:nk=1 "$LUCKA") == *3d ]] || { mkdir -p "$mapp/aldre"; mv "$LUCKA" "$mapp/aldre/$namn-2d.mp4"; }   # 2D-versionen sparas tills 3D är godkänd
mv "$UT" "$LUCKA"
SKARVA=0 zsh produktion/youtube/shorts/jul/mastra.sh "$mapp" > /dev/null   # samma nivå som förut (−16 LUFS) och ny -liten.mp4
echo "$namn: lucka $N ($SLUTTYP), 3D-intro $RUTA rutor + film $((S0 - RUTA)) + 3D-outro $SLUTRUTOR = $NB rutor, skarvar PSNR $P1 / $P2"
