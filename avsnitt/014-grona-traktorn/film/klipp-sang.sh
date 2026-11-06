#!/bin/bash
# sang-klippt.m4a = sang.m4a, oförändrad. Sanna 2026-11-05: "never cut the song" – inga inlagda eller borttagna takter,
# inget kapat slut. Filen finns kvar under det namnet eftersom render.mjs och satt-ihop.sh läser den.
# Tagning 1 (2026-11-05, "Vad är brunt_ (2).m4a", 3:26.4, ca 85 bpm). Avsnittstid = sångtid + 11 s hela vägen.
set -e
cd "$(dirname "$0")/.."
cp sang.m4a sang-klippt.m4a
ffprobe -v error -show_entries format=duration -of csv=p=0 sang-klippt.m4a
