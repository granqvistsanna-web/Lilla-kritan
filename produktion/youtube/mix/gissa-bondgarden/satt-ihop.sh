#!/bin/bash
# Gissa teckningen: Bondgården: alla Gissa teckningen-Shorts om bondgården i en stående video (1080×1920), på svenska och engelska.
# Bygger gissa-bondgarden.mp4 och gissa-bondgarden-en.mp4 med kapitel.txt, kapitel-en.txt och undertexter. Själva bygget: ../gissa-bygg.sh
# Kör: produktion/youtube/mix/gissa-bondgarden/satt-ihop.sh
cd "$(dirname "$0")"
NAMN=gissa-bondgarden
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
