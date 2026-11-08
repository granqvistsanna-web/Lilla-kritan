#!/bin/bash
# Gissa teckningen: Fordon: alla Gissa teckningen-Shorts om fordon i en liggande video (1920×1080) med formatets intro (intro/) och outro (outro/), på svenska och engelska.
# Bygger gissa-fordon-liggande.mp4 och gissa-fordon-liggande-en.mp4 med kapitel.txt, kapitel-en.txt och undertexter. Själva bygget: ../gissa-bygg.sh
# Kör: produktion/youtube/mix/gissa-fordon-liggande/satt-ihop.sh
cd "$(dirname "$0")"
NAMN=gissa-fordon-liggande
LIGG=1   # 16:9 med intro, Shortsen i mixläget, kritsvep vid varje skarv och outro, se ../gissa-bygg.sh
DELAR=(
  "bil|"
  "buss|"
  "brandbil|"
  "tag|"
  "bat|"
  "flygplan|"
  "cykel|"
)
source ../gissa-bygg.sh
