#!/bin/bash
# Grovklipp av avsnitt 006 (efter 005:s satt-ihop.sh): en animatic av storyboardens bilder, var och en så länge som SHOTS i
# storyboard/bygg.py säger, ovanpå dem de kodscener som är renderade, på sina platser, och under allt den klippta sången
# (sang-klippt.m4a, se klipp-sang.sh) från introts slut (11 s). Introt är 005:s med nytt nummer och ny titel (intro/, med
# jingeln, kapat till 11 s). Slutet (17) är scener/slutet/, kritirisen runt Disa som i 005; inget fast outro efter, som 005.
# Inga ljudeffekter än.
# Kör från var som helst efter `python -I storyboard/bygg.py` och `node scener/render.mjs <scen>`.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-006-grovklipp.mp4
T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30"
# kodscener: filen och den storyboardbild scenen börjar på
SCENER=("intro/intro-med-jingel.mp4 01" "scener/kritan-ritar/kritan-ritar.mp4 02" "scener/sjon-1/sjon-1.mp4 03" "scener/slutet/slutet.mp4 17")

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
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bilder.txt -vf "scale=1920:1080,fps=30" -t $(sed -n 's/^# slut //p' $T/bilder.txt) $V $T/animatic.mp4

# kodscenerna läggs över animaticen där deras första bild börjar
in=(); fk=""; prev="[0:v]"; n=0
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ -f $f ] || continue
  start=$(python3 -I -c "import re,sys;a=re.search(r'\(\"$2\", \"(\d+):(\d+(?:\.\d+)?)',open('storyboard/bygg.py').read());print(int(a[1])*60+float(a[2]))")
  n=$((n+1)); in+=(-itsoffset $start -i $f)
  fk="$fk[$n:v]scale=1920:1080,trim=0:$([ $2 = 01 ] && echo 11 || echo 9999)[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
[ -f sang-klippt.m4a ] || film/klipp-sang.sh
TOT=$(sed -n 's/^# slut //p' $T/bilder.txt)
k=$((n + 1)); [ $n -gt 0 ] || prev=0:v
ffmpeg -loglevel error -y -i $T/animatic.mp4 "${in[@]}" -i sang-klippt.m4a \
  -filter_complex "${fk}[$k:a]adelay=11000|11000[s];[1:a]atrim=0:11[j];[j][s]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "$prev" -map "[a]" $V -c:a aac -b:a 192k $UT
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
