# Vägplattan utan mittstreck (vagen-slat.png) och en remsa med strecken (vagen-streck.png) ur lager/vagen.png (014: vagen.png med
# väggen omfärgad till himmelsblått #A8DCF2, vägen_plåt() i bygg.py; gor-lager.py skriver den, kör den först),
# som 005:s lager/gor-lager.py, så att strecken kan rulla med vägen (kit.vag). Kör från scener/: ~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-vag.py
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
HAR = Path(__file__).resolve().parent
v = Image.open(HAR / "vagen.png").convert("RGB")
a = np.asarray(v).astype(int)
SY0, SY1, SB = 640, 680, (120, 630)   # strecken ligger i y 640–680; remsan x 120–630 är en hel period (510 px)
skillnad = np.abs(a[SY0:SY1] - np.median(a[600:768].reshape(-1, 3), 0)).sum(2)
mask = Image.fromarray((skillnad > 45).astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(7))
slat = v.copy()
slat.paste(v.crop((0, SY0 - 40, v.width, SY1 - 40)), (0, SY0), mask)
slat.paste(v.crop((1050, 150, 1150, 330)), (1150, 150))   # 014: krumeluren i himlen (x 1170–1230, såg ut som regnstreck under molnet) täcks med himmel bredvid
slat.save(HAR / "vagen-slat.png")
remsa = v.crop((SB[0], SY0, SB[1], SY1)).convert("RGBA")
remsa.putalpha(Image.fromarray(np.clip((skillnad[:, SB[0]:SB[1]] - 25) * 4, 0, 255).astype(np.uint8)))
remsa.save(HAR / "vagen-streck.png")
