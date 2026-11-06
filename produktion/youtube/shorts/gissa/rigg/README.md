# Rigg: Flow-bilder spårade från teckningen

Verktygen som gör en djurteckning till en Flow-bild som går och blinkar (metoden står i skillen `gissa-teckningen`).

1. `S=$PWD node spar.mjs ../bondgarden/<djur> …` (från repots rot med rätt sökvägar): stillbild av färdig teckning, `spar/ctm.json` (teckning → skärm) och `spar/<djur>-ritning.png`.
2. Google Flow: `<djur>-ritning.png` som form, en spårad kritbild (t.ex. grisen) som stil, utan öga, raka separata ben.
3. `~/.claude/skills/ai-video/.venv/bin/python -I rigga.py <djur> <flowbild> <sak> [ögonfärg] > rad.txt` (`FLOD=1` för vita djur): klipper, delar kropp och ben, skriver riggen och bild-raden.
4. `python3 koppla.py <djur> rad.txt`: lägger in bild-raden i Shorten.

Klart (2026-11-06): alla djuren på bondgården. Får, häst, höna, katt och hund gjordes i OpenArt (Nano Banana Pro) i stället för Flow, med samma två bilder (teckningen för formen, rosa grisen för stilen); uppladdning via `openart_upload_sign` + PUT. Fåret har vitt öga (`#FFFFFF`) och klipps med `FLOD=1`.

Fordonen och lekplatsen (2026-11-06) har också spårade OpenArt-bilder, inkopplade i sina Shorts: `bat-rod`, `brandbil-stege`, `buss-gul`, `cykel-rod`, `flygplan-rod`, `tag-rod`, `gunga-bla`, `gungbrada`, `rutschkana-gul`, `sandlada`, `spade-rod`. Hjulen är runda utklipp ur samma bild (cykelns är däck och ekrar utan ramen, luckan fylld från hjulet 60° längre fram, och ligger under ramen med `hjulBakom: true`). Gungans rep och sits och gungbrädans planka är egna `-sving`-bilder. Stora vita ytor som utklippet fyllt (inne i cykelhjulen, mellan stegpinnarna, spadens ögla) är genomskinliga igen.
