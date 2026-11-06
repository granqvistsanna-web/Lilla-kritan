"""Tar ut lagren som storyboarden räknar fram (plåtarna, lastbilens delar, flaskorna, sakerna, discot) som PNG här i lager/,
och tiderna och måtten som matt.json, så att kodscenerna använder samma bilder, platshållare och tider som storyboarden.
Kör: ~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py   (från scener/; kör om när bygg.py eller assets/ ändras)
Kör bygg.py utan blocket som sparar frames/ (samma knep som film/satt-ihop.sh: koden fram till REF = lambda), så att
storyboarden inte skrivs om härifrån. Tar ca 2 min. PNG:erna och matt.json checkas inte in."""
import json
from pathlib import Path

import numpy as np
from PIL import Image

HÄR = Path(__file__).resolve().parent
BYGG = HÄR.parents[1] / "storyboard" / "bygg.py"
src = BYGG.read_text()
utan_spara = src[:src.index('\nout = HÄR / "frames"')] + "\n" + src[src.index("# --- Sidan"):src.index("\nREF = lambda")]
B = {"__file__": str(BYGG), "__name__": "lager"}
exec(compile(utan_spara, str(BYGG), "exec"), B)

ut = {
    "lastbil": B["LASTBIL"],                         # lastbilens 1024-ruta (utan TOPP), hjulen på HJUL
    "flagga-gron": B["FLAGGA_GR"].crop(B["FLAGGA_GR"].getbbox()),
    "berget": B["berget_plåt"](),
    "berget-glod": B["berget_plåt"](glöd=True),
    "flaska-kola": B["FLASKOR"][B["KOLA"]],
    "flaska-choklad": B["FLASKOR"][B["CHOKLAD"]],
    "korg": B["KORG"],
    "disco": B["DISCO_BILD"],
    "disco-prickar": (lambda c: (B["ljusprickar"](c), c)[1])(B["DISCO_BILD"].copy()),
    "discokula-brun": B["DISCOKULA"],
}
for i, im in enumerate(B["BITAR"]):
    ut[f"bit-{i}"] = im
# kornet över hela bilden (texturpasset), samma som 006
rng = np.random.default_rng(6)
fint = rng.normal(0, 1, (768, 1376))
drag = np.array(Image.fromarray((rng.normal(0, 1, (768, 172)) * 40 + 128).clip(0, 255).astype("uint8")).resize((1376, 768), Image.BICUBIC), float) / 40 - 3.2
v = 0.6 * fint + 0.8 * drag
korn = np.zeros((768, 1376, 4), "uint8")
ljus = v > 0
korn[ljus, :3] = 255; korn[~ljus, :3] = (70, 50, 40)
korn[..., 3] = (np.abs(v) * 9).clip(0, 40).astype("uint8")
ut["korn"] = Image.fromarray(korn, "RGBA")
for namn, im in ut.items():
    im.save(HÄR / f"{namn}.png")

# tiderna (avsnittstid, tider() i bygg.py: SÅNGTID + INSATT) och måtten som scenerna behöver
v = B.get("VÄNSTER", 0)   # lastbilen() har en bredare duk till vänster för flaggan; bb i 1024-rutans x (som lastbil.png)
bb = B["lastbilen"](med_bulle=False).getbbox()
bb = (bb[0] - v, bb[1], bb[2] - v, bb[3])
matt = {
    "INTRO": B["INTRO"], "INSATT": B["INSATT"], "SANGTID": B["SÅNGTID"],
    "bilder": {s[0]: [round(a, 3), round(b, 3)] for s, (a, b, m) in zip(B["SHOTS"], B["tider"]())},
    "TOPP": B["TOPP"], "VANSTER": v, "BULLE": [B["BULLE_K"], B["BULLE_X"], B["BULLE_Y"]], "HJUL": B["HJUL"],
    "BIL": {"x": B["BIL_X"], "gv": B["GV"], "h": B["BIL_H"], "bb": bb},   # körscenen; bb = lastbilen(med_bulle=False) inkl. TOPP
    "RITAD_BIL": B["RITAD_BIL"], "RITAD_FONSTER": B["RITAD_FONSTER"], "BERG": B["BERG"], "BERG_H": B["BERG_H"],
    "DANS": [B["DANS_X"], B["DANS_G"], B["DANS_H"]],
}
(HÄR / "matt.json").write_text(json.dumps(matt, ensure_ascii=False, indent=1))
print(", ".join(ut), "+ matt.json →", HÄR)
