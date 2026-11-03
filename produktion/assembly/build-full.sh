#!/bin/bash
# Full Lilla Kvack film on song v2 (see ../lilla-kvack-scene-plan.md). Every segment is cut to an exact
# frame count from the song times (24 fps), so the picture can't drift off the music.
set -e
cd "$(dirname "$0")"
SONG="../audio/Lilla Kvack v2.m4a"
WHITE="colorlevels=rimax=0.88:gimax=0.88:bimax=0.88,"   # Wan turns white grey; lift it back
END=86
f() { printf '%.0f' "$(echo "$1 * 24" | bc -l)"; }        # seconds -> frame index
n() { echo $(( $(f $2) - $(f $1) )); }                    # frames between two song times
OUT="scale=854:480,fps=24,format=yuv420p,setsar=1"

clip() { # in out frames [pre-filter]
  ffmpeg -v error -y -i "$1" -vf "${4}${OUT},tpad=stop_mode=clone:stop=-1" -frames:v "$3" -an "$2"
}
still() { # png out frames zoom-from zoom-to
  ffmpeg -v error -y -loop 1 -i "$1" -vf "scale=1708:960,zoompan=z='$4+($5-$4)*on/$3':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=854x480:fps=24,format=yuv420p,setsar=1" -frames:v "$3" "$2"
}
frame() { ffmpeg -v error -y $3 -i "$1" -frames:v 1 -update 1 "$2"; }  # in png [-sseof -0.1]

# pieces
clip ../videos/R1-chorus-guided.mp4 r1.mp4 $(n 7.894 13.073) "$WHITE"
clip ../videos/R2-chorus-ja.mp4     r2.mp4 $(n 13.073 20.055) "$WHITE"
clip ../videos/V1-garden-ball.mp4   v1.mp4 120
clip ../videos/V2-nalle-hej.mp4     v2.mp4 120
clip ../videos/V3-sleepy.mp4        v3.mp4 120
frame r2.mp4 r2-last.png "-sseof -0.1"; frame v1.mp4 v1-last.png "-sseof -0.1"
frame v2.mp4 v2-last.png "-sseof -0.1"; frame v3.mp4 v3-last.png "-sseof -0.1"
frame v3.mp4 v3-first.png

still v1-last.png v1-hold.mp4 $(( $(n 20.055 30.349) - 120 )) 1 1.04
still v2-last.png v2-hold.mp4 $(( $(n 42.477 52.723) - 120 )) 1 1.04
still r2-last.png r2-hold.mp4 $(( $(n 52.723 65.403) - $(n 7.894 13.073) - $(n 13.073 20.055) )) 1 1.01
still v3-first.png evening-in.mp4 $(n 65.403 70.518) 1 1.05
still v3-last.png v3-hold.mp4 $(( $(n 70.518 79.294) - 120 )) 1 1.04
still v3-last.png outro.mp4 $(n 79.294 $END) 1.04 1
ffmpeg -v error -y -i intro.mp4 -vf "$OUT,tpad=stop_mode=clone:stop=-1" -frames:v $(n 0 7.894) intro-fit.mp4
ffmpeg -v error -y -i r2.mp4 -frames:v $(( $(n 30.349 42.477) - $(n 7.894 13.073) )) r2-short.mp4   # chorus 2 is 1 frame shorter

# timeline
printf "file '%s'\n" intro-fit.mp4 r1.mp4 r2.mp4 v1.mp4 v1-hold.mp4 \
  r1.mp4 r2-short.mp4 v2.mp4 v2-hold.mp4 \
  r1.mp4 r2.mp4 r2-hold.mp4 evening-in.mp4 v3.mp4 v3-hold.mp4 outro.mp4 > list.txt
ffmpeg -v error -y -f concat -safe 0 -i list.txt -i "$SONG" -map 0:v -map 1:a -t $END \
  -vf "fade=in:0:12,fade=out:st=83:d=3" -af "afade=out:st=83:d=3" \
  -c:v libx264 -crf 18 -c:a aac -b:a 192k lilla-kvack.mp4
rm -f list.txt *.png
ffprobe -v error -show_entries format=duration -of csv=p=0 lilla-kvack.mp4
