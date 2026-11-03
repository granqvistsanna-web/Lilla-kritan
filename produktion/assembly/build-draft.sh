#!/bin/bash
# Episode draft: intro → chorus → title card → garden → playground (iris wipes) → ballgame → bus goodbye (straight cuts, same set) → bedtime (iris), then sound effects and music.
# Scene starts on the episode timeline are the iris offsets; mix-sfx.py takes the same starts.
set -e; cd "$(dirname "$0")/.."; C=code-shot; T=$(mktemp -d)
assembly/iris.sh $C/intro/silent.mp4 $C/chorus/silent.mp4 5.13 $T/1.mp4
assembly/iris.sh $T/1.mp4 $C/title-card/silent.mp4 14.797 $T/1b.mp4
assembly/iris.sh $T/1b.mp4 $C/garden/silent.mp4 18.597 $T/2.mp4
assembly/iris.sh $T/2.mp4 $C/playground/silent.mp4 39.397 $T/3.mp4
ffmpeg -v error -y -i $T/3.mp4 -i $C/ballgame/silent.mp4 -i $C/bus-goodbye/silent.mp4 -filter_complex "[0:v]trim=end=59.8977,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[2:v]setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1[v]" \
  -map "[v]" -c:v libx264 -crf 20 -pix_fmt yuv420p $T/5.mp4
assembly/iris.sh $T/5.mp4 $C/bedtime/silent.mp4 151.0977 videos/episode-draft3-silent.mp4
node assembly/cues.mjs intro chorus title-card garden playground ballgame bus-goodbye bedtime > assembly/sfx-cues.json  # reads each page's window.SFX
~/.claude/skills/ai-video/.venv/bin/python assembly/mix-sfx.py intro=0 chorus=5.13 title-card=14.797 garden=18.597 playground=39.397 ballgame=59.8977 bus-goodbye=120.2977 bedtime=151.0977 $T/sfx.wav 203.101
# Music: the intro jingle from 0 under intro + chorus (the chorus starts on its first sung word, 5.13), the piano bed from the title card under the middle scenes, low so the effects read (played twice with a 6 s crossfade so the loop has no gap), fading as the outro song (Godnatt Kvack, outro-v4, 55 s, 107.7 BPM) starts: its 4-bar intro plays over the bus scene's end and the moon dancing, and its 10 sung lines (from the vocal stem, music/outro-v4-vocals.wav) start at bedtime 2.5 (song 8.89), every ~4.5 s, the last ending at bedtime 45.4 just before the iris. outro adelay = bedtime start - 6.39 s; piano atrim end = song start - 15.031 + 1.5.
# middle scenes, low so the effects read (played twice with a 6 s crossfade so the loop has no gap), and the outro song (Godnatt Kvack, outro-v4, 55 s) as the piano fades: its hummed intro plays under the bus scene and the words start as the iris opens on the moon (bedtime 0.5 = song 17.95); its 8 sung phrases (measured from the vocal stem, music/outro-v4-vocals.wav) land at bedtime 0.5, 4.9, 9.4, 13.9, 18.4, 22.8, 27.3, 31.8. The song ends at bedtime ~36; the piano comes back softly (-12 dB) from 183.5 under the sleep and fades out with the closing iris.
ffmpeg -v error -y -i videos/episode-draft3-silent.mp4 -i $T/sfx.wav -i audio/intro-jingle.mp3 -i music/piano.m4a -i music/outro-v4.mp3 -filter_complex "\
[2:a]afade=out:st=14.5:d=0.5[intro];\
[3:a]asplit[p1][p2];[p1][p2]acrossfade=d=6:c1=qsin:c2=qsin,atrim=end=131.2,afade=in:d=1,afade=out:st=128.2:d=3,volume=-8dB,adelay=15031:all=1[piano];\
[4:a]afade=in:d=1,volume=-2dB,adelay=144708:all=1[outro];\
[1:a][intro][piano][outro]amix=inputs=4:normalize=0:duration=first,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest videos/episode-draft3.mp4
cp videos/episode-draft3.mp4 "videos/drafts/episode-$(date +%Y-%m-%d_%H%M).mp4"  # keep every build
