# Rigg: Flow-bilder spårade från teckningen

Verktygen som gör en djurteckning till en Flow-bild som går och blinkar (metoden står i skillen `gissa-teckningen`).

1. `S=$PWD node spar.mjs ../bondgarden/<djur> …` (från repots rot med rätt sökvägar): stillbild av färdig teckning, `spar/ctm.json` (teckning → skärm) och `spar/<djur>-ritning.png`.
2. Google Flow: `<djur>-ritning.png` som form, en spårad kritbild (t.ex. grisen) som stil, utan öga, raka separata ben.
3. `~/.claude/skills/ai-video/.venv/bin/python -I rigga.py <djur> <flowbild> <sak> [ögonfärg] > rad.txt` (`FLOD=1` för vita djur): klipper, delar kropp och ben, skriver riggen och bild-raden.
4. `python3 koppla.py <djur> rad.txt`: lägger in bild-raden i Shorten.

Kvar (2026-11-06): får, häst, höna, katt och hund. Bilderna finns i Flow-projektet men Flow har inget nedladdningsval just nu. Fåret får vitt öga (`#FFFFFF`) på sitt svarta huvud.
