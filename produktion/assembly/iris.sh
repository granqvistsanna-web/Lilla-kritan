#!/bin/bash
# Crayon iris wipe: B opens from the centre inside a wobbly, scalloped circle with a cream sticker rim.
# Usage: assembly/iris.sh a.mp4 b.mp4 <offset s> out.mp4 [duration s]
# A must run `duration` past the cut; B starts at `offset` (its frame 0 = the cut), so song sync holds if A has that tail.
# Runs in RGB (gbrp) so all planes match, and inline (no st/ld), since xfade threads share expression registers.
D="hypot((X/W-0.5)*1.78,Y/H-0.5)"; R="(1-P)*1.15*(1+0.07*sin(atan2(Y/H-0.5,(X/W-0.5)*1.78)*9+P*5))"
IRIS="if(lt($D,$R),B,if(lt($D,$R+0.018),if(eq(PLANE,0),248,if(eq(PLANE,1),224,255)),A))"
ffmpeg -v error -y -i "$1" -i "$2" -filter_complex "[0:v]format=gbrp,setpts=PTS-STARTPTS[a];[1:v]format=gbrp,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=custom:duration=${5:-0.7}:offset=$3:expr='$IRIS',format=yuv420p[v]" -map "[v]" -c:v libx264 -crf 20 "$4"
