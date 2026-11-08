#!/bin/bash
# Gissa teckningen: Lekplatsen: alla Gissa teckningen-Shorts om lekplatsen i en liggande video (1920×1080) med formatets intro (intro/) och outro (outro/), på svenska och engelska.
# Bygger gissa-lekplatsen-liggande.mp4 och gissa-lekplatsen-liggande-en.mp4 med kapitel.txt, kapitel-en.txt och undertexter. Själva bygget: ../gissa-bygg.sh
# Kör: produktion/youtube/mix/gissa-lekplatsen-liggande/satt-ihop.sh
cd "$(dirname "$0")"
NAMN=gissa-lekplatsen-liggande
LIGG=1   # 16:9 med intro, Shortsen i mixläget, kritsvep vid varje skarv och outro, se ../gissa-bygg.sh
DELAR=(
  "boll|"
  "gunga|"
  "gungbrada|"
  "hink|"
  "rutschkana|"
  "sandlada|"
  "spade|"
)
source ../gissa-bygg.sh
