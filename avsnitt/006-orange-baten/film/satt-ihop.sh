#!/bin/bash
# Grovklipp av avsnitt 006 (efter 005:s satt-ihop.sh): en animatic av storyboardens bilder, var och en så länge som SHOTS i
# storyboard/bygg.py säger, ovanpå dem de kodscener som är renderade, på sina platser, och under allt den klippta sången
# (sang-klippt.m4a, se klipp-sang.sh) från introts slut (11 s). Introt är 005:s med nytt nummer och ny titel (intro/, med
# jingeln, kapat till 11 s). Slutet (17) är scener/slutet/, kritirisen runt Disa som i 005; inget fast outro efter, som 005.
# Kodscenernas ljudeffekter (<scen>-effekter.wav från render.mjs) läggs in på scenens plats, ovanpå sången.
# Kör från var som helst (film/satt-ihop.sh [--snabb]) efter `python -I storyboard/bygg.py` och `node scener/render.mjs <scen>`.
# Engelska versionen: `film/satt-ihop.sh en [--snabb]` efter `node scener/render.mjs scener/<scen> --en` för varje scen (och
# `node scener/render.mjs intro --en`) → film/avsnitt-006-en.mp4, med en/sang.m4a (oklippt, bara slutet tonas ut som i den svenska)
# och scenernas -en-filer. Storyboardens tider görs om till den engelska tagningen med samma karta som kit.js (paren i en/rader.txt);
# bilder i ett hopp i kartan (15e, klappet, som den engelska tagningen saknar) faller bort. Utan `en` är allt som förut.
set -e
cd "$(dirname "$0")/.."
X=; SANG=sang-klippt.m4a; UT=film/avsnitt-006-grovklipp.mp4
[ "$1" = en ] && { X=-en; UT=film/avsnitt-006-en.mp4; shift; }
T=film/.tmp$X; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30"; S=1920:1080
# --snabb: förhandsvisning i 960 × 540 med snabb kodning (scenerna gärna renderade med render.mjs --snabb)
[ "$1" = --snabb ] && { V="-c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30"; S=960:540; }
# kodscener: filen och den storyboardbild scenen börjar på
# Engelska introt (tiny crayon tv): intro/intro-en.mp4 med den engelska jingeln ../../format/jingel-en.m4a (de första 9,9 s, som
# den svenska jingel.m4a) → intro/intro-med-jingel-en.mp4, som i 005 och 007. Utan jingelfil: lågt fågelkvitter som platshållare.
if [ -n "$X" ]; then
  J=../../format/jingel-en.m4a; F=aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9
  if [ -f $J ]; then JF="[1:a]$F,afade=t=out:st=8.6:d=0.4,apad[a]"
  else J=../../assets/ljud/effekter/fagelkvitter/fagelkvitter-3.m4a; JF="[1:a]$F,afade=t=in:d=0.4,afade=t=out:st=8.4:d=0.6,volume=0.35,apad[a]"; fi
  ffmpeg -loglevel error -y -i intro/intro-en.mp4 -i $J -filter_complex "$JF" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel-en.mp4
fi
SCENER=("intro/intro-med-jingel.mp4 01" "scener/kritan-ritar/kritan-ritar.mp4 02" "scener/sjon-1/sjon-1.mp4 03" "scener/sjon-2/sjon-2.mp4 06" "scener/bryggan/bryggan.mp4 10" "scener/discot/discot.mp4 15a" "scener/slutet/slutet.mp4 17")

# bildlistan ur SHOTS: ("02", "0:11.0–0:16.5", ...) → file + duration
python3 -I - storyboard/bygg.py "$X" $T > $T/bilder.txt <<'PY'
import re, sys
s0 = lambda t: (lambda m, x: int(m) * 60 + float(x))(*t.split(":"))
s = s0
if sys.argv[2]:   # engelska: avsnittstid → engelsk avsnittstid, som kit.js svTillEn (introt, de första 11 s, är oförändrat)
    K = [(s0(sv), s0(en)) for en, sv in re.findall(r"^(\d+:\d+(?:\.\d+)?)≈?\s.*\[sv (\d+:\d+(?:\.\d+)?)\]\s*$", open("en/rader.txt").read(), re.M)]
    def s(t):
        a = s0(t)
        if a < 11: return a
        x = a - 11; i = next((i for i, p in enumerate(K) if p[0] > x), None)
        if i == 0: return 11 + x - K[0][0] + K[0][1]
        if i is None: return 11 + x - K[-1][0] + K[-1][1]
        p, q = K[i - 1], K[i]
        return 11 + p[1] + (x - p[0]) * (q[1] - p[1]) / (q[0] - p[0])
_s, SKIFT = s, 11 - 9   # introt kortat 11 → 9 s (2026-11-09): storyboardens tider från 0:11 flyttas 2 s tidigare
s = lambda t: (lambda a: a - SKIFT if a >= 11 - 1e-9 else a)(_s(t))
src = open(sys.argv[1]).read()
shots = re.findall(r'\("(\w+)", "(\d+:\d+(?:\.\d+)?)–(\d+:\d+(?:\.\d+)?)"', src)
# refrängerna (*refräng("05")) står som tidslistor i REFRÄNG_TID och bokstäver i REFRÄNG_ID
ids = re.findall(r'"(\w+)"', re.search(r'REFRÄNG_ID = \[(.*?)\]', src)[1])
for n, lista in re.findall(r'"(\d+)": \[([^\]]*)\]', re.search(r'REFRÄNG_TID = \{(.*?)\}', src, re.S)[1]):
    t = re.findall(r'"([\d:.]+)"', lista)
    shots += [(n + k, t[i], t[i + 1]) for i, k in enumerate(ids)]
shots.sort(key=lambda r: s(r[1]))
open(sys.argv[3] + "/start.txt", "w").write("".join(f"{n} {s(a):.3f}\n" for n, a, b in shots))
shots = [r for r in shots if s(r[2]) - s(r[1]) > 0.001]   # bilder i ett hopp (engelska 15e) faller bort
for n, a, b in shots:
    print(f"file '../../storyboard/frames/{n}.jpg'\nduration {s(b) - s(a):.3f}")
print(f"file '../../storyboard/frames/{n}.jpg'\n# slut {s(b) - s(shots[0][1]):.3f}")   # concat behöver sista bilden två gånger; -t kapar
PY
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bilder.txt -vf "scale=$S,fps=30" -t $(sed -n 's/^# slut //p' $T/bilder.txt) $V $T/animatic.mp4

# kodscenerna läggs över animaticen där deras första bild börjar
in=(); fk=""; prev="[0:v]"; n=0; fx=(); fxs=()
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ $2 = 01 ] || f=${f%.mp4}$X.mp4; [ $2 = 01 ] && f=intro/intro-med-jingel$X.mp4; [ -f $f ] || continue
  start=$(awk -v id=$2 '$1 == id {print $2}' $T/start.txt)
  n=$((n+1)); in+=(-itsoffset $start -i $f)
  w=${f%.mp4}-effekter.wav; [ -f $w ] && fx+=(-i $w) && fxs+=($start)
  # mjuka scenbyten (polishen 2026-11-06): den ritade båten blir Disas båt (02 → 03) och sjon-1 → sjon-2 (03 → 06) tonas
  # över på 0,35 s i stället för att hoppa; scenen före står kvar på sin sista bild under toningen
  ex=""; case $2 in 02) ex=",tpad=stop_mode=clone:stop_duration=0.4";; 03) ex=",tpad=stop_mode=clone:stop_duration=0.4,format=yuva420p,fade=t=in:st=$start:d=0.35:alpha=1";;
    06) ex=",format=yuva420p,fade=t=in:st=$start:d=0.35:alpha=1";; esac
  fk="$fk[$n:v]scale=$S,trim=0:$([ $2 = 01 ] && echo 9 || echo 9999)$ex[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
TOT=$(sed -n 's/^# slut //p' $T/bilder.txt)
if [ -n "$X" ]; then   # den engelska tagningen oklippt, bara slutet tonas ut de sista 2 s där bilden slutar (som sang-klippt.m4a)
  L=$(awk "BEGIN{print $TOT - 9}"); SANG=$T/sang-en.m4a
  ffmpeg -loglevel error -y -i en/sang.m4a -af "atrim=0:$L,afade=t=out:st=$(awk "BEGIN{print $L - 2}"):d=2" -c:a aac -b:a 192k $SANG
else [ -f sang-klippt.m4a ] || film/klipp-sang.sh; fi
k=$((n + 1)); [ $n -gt 0 ] || prev=0:v
fa=""; fl=""; for i in "${!fxs[@]}"; do d=$(python3 -c "print(round(${fxs[$i]}*1000))"); fa="$fa[$((k + 1 + i)):a]adelay=$d|$d[e$i];"; fl="$fl[e$i]"; done
ffmpeg -loglevel error -y -i $T/animatic.mp4 "${in[@]}" -i $SANG "${fx[@]}" \
  -filter_complex "${fk}${fa}[$k:a]adelay=9000|9000[s];[1:a]atrim=0:9[j];[j][s]${fl}amix=inputs=$((2 + ${#fxs[@]})):duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "$prev" -map "[a]" $V -c:a aac -b:a 192k $UT
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
