#!/bin/bash
# Grovklipp av avsnitt 014 (efter 007:s satt-ihop.sh): en animatic av storyboardens bilder, var och en så länge som tider()
# i storyboard/bygg.py säger, med introt (intro/intro-med-jingel.mp4, kapat till 11 s) och kodscener ovanpå när de finns,
# och under allt den klippta sången (sang-klippt.m4a, se klipp-sang.sh) från introts slut (11 s).
# Kör från var som helst (film/satt-ihop.sh [--snabb]) efter `python -I storyboard/bygg.py`.
# Engelska versionen (The Green Song): `film/satt-ihop.sh en [--snabb]` efter `node scener/render.mjs scener/<scen> --en` för varje
# scen och `node scener/render.mjs intro --en` → film/avsnitt-014-en.mp4, med en/sang.m4a (oförändrad) och scenernas -en-filer.
# Storyboardens tider görs om till den engelska tagningen med samma karta som kit.js (paren i en/rader.txt). Utan en: som förut.
set -e
cd "$(dirname "$0")/.."
X=; SANG=sang-klippt.m4a; UT=film/avsnitt-014-grovklipp.mp4; TP=
[ "$1" = en ] && { X=-en; SANG=en/sang.m4a; UT=film/avsnitt-014-en.mp4; TP=,tpad=stop_mode=clone:stop_duration=0.3; shift; }
T=film/.tmp$X; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30"; S=1920:1080
[ "$1" = --snabb ] && { V="-c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30"; S=960:540; }
# kodscener: filen och den storyboardbild scenen börjar på (fler läggs till här när de renderas)
# Engelska introt (tiny crayon tv): intro/intro-en.mp4 (`node scener/render.mjs intro --en`) med den engelska jingeln
# ../../format/jingel-en.m4a (de första 9,9 s, som den svenska jingel.m4a) → intro/intro-med-jingel-en.mp4.
# Finns ingen engelsk jingel än ligger lågt fågelkvitter i jingelns plats (platshållare). Görs om vid varje `satt-ihop.sh en`.
if [ -n "$X" ]; then
  J=../../format/jingel-en.m4a; F=aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9
  if [ -f $J ]; then JF="[1:a]$F,afade=t=out:st=8.6:d=0.4,apad[a]"
  else J=../../assets/ljud/effekter/fagelkvitter/fagelkvitter-3.m4a; JF="[1:a]$F,afade=t=in:d=0.4,afade=t=out:st=8.4:d=0.6,volume=0.35,apad[a]"; fi
  ffmpeg -loglevel error -y -i intro/intro-en.mp4 -i $J -filter_complex "$JF" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel-en.mp4
fi
SCENER=("intro/intro-med-jingel$X.mp4 01" "scener/kritan-ritar/kritan-ritar.mp4 02" "scener/vagen-1/vagen-1.mp4 03" "scener/vagen-2/vagen-2.mp4 06" "scener/bondgarden/bondgarden.mp4 10" "scener/discot/discot.mp4 15a" "scener/slutet/slutet.mp4 17")

# bildlistan och starttiderna ur bygg.py: bara tidsdelen körs (allt före REF = lambda), inga bilder byggs
python3 - storyboard/bygg.py $T "$X" > $T/bilder.txt <<'PY'
import sys, re, json
if sys.argv[3]:   # engelska: tiderna ur scener/lager/matt.json (samma som tider(), utan att bygga om storyboardens bilder),
    # sedan avsnittstid → engelsk avsnittstid, som kit.js svTillEn (introt, de första 11 s, är oförändrat)
    B = json.load(open("scener/lager/matt.json"))["bilder"]
    rader = [((k,), (a, b, None)) for k, (a, b) in B.items()]; ns = {"SLUT": max(b for a, b in B.values())}
    tid = lambda s: sum(float(x) * 60 ** i for i, x in enumerate(reversed(s.split(":"))))
    K = [(tid(sv), tid(en)) for en, sv in re.findall(r"^(\d+:\d+(?:\.\d+)?)≈?\s.*\[sv (\d+:\d+(?:\.\d+)?)\]\s*$", open("en/rader.txt").read(), re.M)]
    def en(a):
        if a < 11: return a
        s = a - 11; i = next((i for i, p in enumerate(K) if p[0] > s), None)
        if i == 0: return 11 + s - K[0][0] + K[0][1]
        if i is None: return 11 + s - K[-1][0] + K[-1][1]
        p, q = K[i - 1], K[i]
        return 11 + p[1] + (s - p[0]) * (q[1] - p[1]) / (q[0] - p[0])
    rader = [(s, (en(a), en(b), m)) for s, (a, b, m) in rader]; ns["SLUT"] = en(ns["SLUT"])
else:
    src = open(sys.argv[1]).read()
    ns = {"__file__": sys.argv[1], "__name__": "tid"}
    exec(compile(src[:src.index("\nREF = lambda")], sys.argv[1], "exec"), ns)
    rader = list(zip(ns["SHOTS"], ns["tider"]()))
SK = lambda a: a - 2 if a >= 11 - 1e-9 else a   # introt kortat 11 → 9 s (2026-11-09): allt från 0:11 flyttas 2 s tidigare
rader = [(s, (SK(a), SK(b), m)) for s, (a, b, m) in rader]; ns["SLUT"] = SK(ns["SLUT"])
open(sys.argv[2] + "/start.txt", "w").write("".join(f"{s[0]} {a:.3f}\n" for s, (a, b, m) in rader))
for s, (a, b, m) in rader:
    print(f"file '../../storyboard/frames/{s[0]}.jpg'\nduration {b - a:.3f}")
print(f"file '../../storyboard/frames/{s[0]}.jpg'\n# slut {ns['SLUT']:.3f}")
PY
TOT=$(sed -n 's/^# slut //p' $T/bilder.txt)
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bilder.txt -vf "scale=$S,fps=30" -t $TOT $V $T/animatic.mp4

in=(); fk=""; prev="[0:v]"; n=0; fx=(); fxs=()
for rad in "${SCENER[@]}"; do
  set -- $rad; f=$1; [ $2 = 01 ] || f=${f%.mp4}$X.mp4; [ -f $f ] || continue
  start=$(awk -v id=$2 '$1 == id {print $2}' $T/start.txt)
  n=$((n+1)); in+=(-itsoffset $start -i $f)
  w=${f%.mp4}-effekter.wav; [ -f $w ] && fx+=(-i $w) && fxs+=($start)
  fk="$fk[$n:v]scale=$S,trim=0:$([ $2 = 01 ] && echo 9 || echo 9999)$TP[s$n];${prev}[s$n]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
[ -n "$X" ] || [ -f sang-klippt.m4a ] || film/klipp-sang.sh
k=$((n + 1)); [ $n -gt 0 ] || prev=0:v
fa=""; fl=""; for i in "${!fxs[@]}"; do d=$(python3 -c "print(round(${fxs[$i]}*1000))"); fa="$fa[$((k + 1 + i)):a]adelay=$d|$d[e$i];"; fl="$fl[e$i]"; done
ffmpeg -loglevel error -y -i $T/animatic.mp4 "${in[@]}" -i $SANG "${fx[@]}" \
  -filter_complex "${fk}${fa}[$k:a]adelay=9000|9000[s];[1:a]atrim=0:9[j];[j][s]${fl}amix=inputs=$((2 + ${#fxs[@]})):duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "$prev" -map "[a]" $V -c:a aac -b:a 192k $UT
rm -rf $T
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
