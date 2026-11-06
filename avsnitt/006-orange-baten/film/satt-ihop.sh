#!/bin/bash
# Grovklipp av avsnitt 006 (efter 005:s satt-ihop.sh): en animatic av storyboardens bilder, var och en så länge som SHOTS i
# storyboard/bygg.py säger, ovanpå dem de kodscener som är renderade, på sina platser, och under allt den klippta sången
# (sang-klippt.m4a, se klipp-sang.sh) från introts slut (11 s). Introt är 005:s med nytt nummer och ny titel (intro/, med
# jingeln, kapat till 11 s). Slutet (17) är scener/slutet/, kritirisen runt Disa som i 005; inget fast outro efter, som 005.
# Kodscenernas ljudeffekter (<scen>-effekter.wav från render.mjs) läggs in på scenens plats, ovanpå sången.
# Kör från var som helst (film/satt-ihop.sh [--snabb]) efter `python -I storyboard/bygg.py` och `node scener/render.mjs <scen>`.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-006-grovklipp.mp4
T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30"; S=1920:1080
# --snabb: förhandsvisning i 960 × 540 med snabb kodning (scenerna gärna renderade med render.mjs --snabb)
[ "$1" = --snabb ] && { V="-c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30"; S=960:540; }
# kodscener: filen och den storyboardbild scenen börjar på
SCENER=("intro/intro-med-jingel.mp4 01" "scener/kritan-ritar/kritan-ritar.mp4 02" "scener/sjon-1/sjon-1.mp4 03" "scener/sjon-2/sjon-2.mp4 06" "scener/bryggan/bryggan.mp4 10" "scener/discot/discot.mp4 15a" "scener/slutet/slutet.mp4 17")

# bildlistan ur SHOTS: ("02", "0:11.0–0:16.5", ...) → file + duration
python3 -I - storyboard/bygg.py > $T/bilder.txt <<'PY'
import re, sys
s = lambda t: (lambda m, x: int(m) * 60 + float(x))(*t.split(":"))
src = open(sys.argv[1]).read()
shots = re.findall(r'\("(\w+)", "(\d+:\d+(?:\.\d+)?)–(\d+:\d+(?:\.\d+)?)"', src)
# refrängerna (*refräng("05")) står som tidslistor i REFRÄNG_TID och bokstäver i REFRÄNG_ID
ids = re.findall(r'"(\w+)"', re.search(r'REFRÄNG_ID = \[(.*?)\]', src)[1])
for n, lista in re.findall(r'"(\d+)": \[([^\]]*)\]', re.search(r'REFRÄNG_TID = \{(.*?)\}', src, re.S)[1]):
    t = re.findall(r'"([\d:.]+)"', lista)
    shots += [(n + k, t[i], t[i + 1]) for i, k in enumerate(ids)]
shots.sort(key=lambda r: s(r[1]))
for n, a, b in shots:
    print(f"file '../../storyboard/frames/{n}.jpg'\nduration {s(b) - s(a):.3f}")
print(f"file '../../storyboard/frames/{n}.jpg'\n# slut {s(b) - s(shots[0][1]):.3f}")   # concat behöver sista bilden två gånger; -t kapar
PY
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bilder.txt -vf "scale=$S,fps=30" -t $(sed -n 's/^# slut //p' $T/bilder.txt) $V $T/animatic.mp4

# kodscenerna läggs över animaticen där deras första bild börjar
in=(); fk=""; prev="[0:v]"; n=0; fx=(); fxs=()
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ -f $f ] || continue
  start=$(python3 -I -c "import re,sys;a=re.search(r'\(\"$2\", \"(\d+):(\d+(?:\.\d+)?)',open('storyboard/bygg.py').read());print(int(a[1])*60+float(a[2]))")
  n=$((n+1)); in+=(-itsoffset $start -i $f)
  w=${f%.mp4}-effekter.wav; [ -f $w ] && fx+=(-i $w) && fxs+=($start)
  # mjuka scenbyten (polishen 2026-11-06): den ritade båten blir Disas båt (02 → 03) och sjon-1 → sjon-2 (03 → 06) tonas
  # över på 0,35 s i stället för att hoppa; scenen före står kvar på sin sista bild under toningen
  ex=""; case $2 in 02) ex=",tpad=stop_mode=clone:stop_duration=0.4";; 03) ex=",tpad=stop_mode=clone:stop_duration=0.4,format=yuva420p,fade=t=in:st=$start:d=0.35:alpha=1";;
    06) ex=",format=yuva420p,fade=t=in:st=$start:d=0.35:alpha=1";; esac
  fk="$fk[$n:v]scale=$S,trim=0:$([ $2 = 01 ] && echo 11 || echo 9999)$ex[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
[ -f sang-klippt.m4a ] || film/klipp-sang.sh
TOT=$(sed -n 's/^# slut //p' $T/bilder.txt)
k=$((n + 1)); [ $n -gt 0 ] || prev=0:v
fa=""; fl=""; for i in "${!fxs[@]}"; do d=$(python3 -c "print(round(${fxs[$i]}*1000))"); fa="$fa[$((k + 1 + i)):a]adelay=$d|$d[e$i];"; fl="$fl[e$i]"; done
ffmpeg -loglevel error -y -i $T/animatic.mp4 "${in[@]}" -i sang-klippt.m4a "${fx[@]}" \
  -filter_complex "${fk}${fa}[$k:a]adelay=11000|11000[s];[1:a]atrim=0:11[j];[j][s]${fl}amix=inputs=$((2 + ${#fxs[@]})):duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "$prev" -map "[a]" $V -c:a aac -b:a 192k $UT
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
