#!/bin/bash
# Gissa teckningen: Bondgården: alla Gissa teckningen-Shorts om bondgården i en liggande video (1920×1080) med formatets intro (intro/) och outro (outro/), på svenska och engelska.
# Bygger gissa-bondgarden-liggande.mp4 och gissa-bondgarden-liggande-en.mp4 med kapitel.txt, kapitel-en.txt och undertexter. Själva bygget: ../gissa-bygg.sh
# Kör: produktion/youtube/mix/gissa-bondgarden-liggande/satt-ihop.sh
cd "$(dirname "$0")"
NAMN=gissa-bondgarden-liggande
LIGG=1   # 16:9 med intro, Shortsen i mixläget, kritsvep vid varje skarv och outro, se ../gissa-bygg.sh
DELAR=(
  "ko|"
  "gris|"
  "far|"
  "hast|"
  "hona|"
  "anka|"
  "katt|"
  "hund|"
  "traktor|"
  "bondgarden-samling|4fae4a"   # samlingen sist, en ny del: kritsvep in
)
source ../gissa-bygg.sh
