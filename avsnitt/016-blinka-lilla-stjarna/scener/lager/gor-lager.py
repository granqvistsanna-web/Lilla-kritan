"""Skriver det kodscenerna behöver ur storyboarden (../storyboard/bygg.py) till lager/ (efter 015:s gor-lager.py):
matt.json (bildernas tider, måtten, kamerorna, de små stjärnorna, sångens slag), filt-lila.png (picknickfilten med lila rutor),
nicke.png (nyckelpigan utan ansikte, med det svarta huvudet i krita) och korn.png (texturpasset).
Kör: ~/.claude/skills/ai-video/.venv/bin/python -I -W ignore lager/gor-lager.py   (från scener/)
Kör om när bygg.py eller assets/ ändras. Bara bygg.py:s definitioner (fram till `frames = {}`) och SHOTS-tabellen körs."""
import json
import math
from pathlib import Path

import librosa
import numpy as np
from PIL import Image, ImageChops

HÄR = Path(__file__).resolve().parent
BYGG = HÄR.parents[1] / "storyboard" / "bygg.py"
src = BYGG.read_text()
B = {"__file__": str(BYGG), "__name__": "lager"}
exec(compile(src[:src.index("\nframes = {}")], str(BYGG), "exec"), B)
exec(compile(src[src.index("I, F, V1, M"):src.index("\nassert sorted")], str(BYGG), "exec"), B)
W, H = B["W"], B["H"]

# filten med lila rutor och nyckelpigan med huvudet (samma som i bygg.py, men utan vit kant: kant.js lägger den)
B["FILT"].save(HÄR / "filt-lila.png")
c = B["rgba"]("karaktarer/nyckelpigan-nicke/cut/nyckelpigan-nicke-faceless.png")
m, d = B["ritmask"](c)
d.polygon(B["svg_punkter"](B["NICKE_HUVUD"]), fill=255)
B["kritfyll"](c, ImageChops.multiply(m, c.getchannel("A")), (24, 22, 22), vick=0.12, oskarp=1.0)
c.save(HÄR / "nicke.png")

# de små stjärnorna (som småstjärnor() i bygg.py): [x, underkant y, höjd]
rng = np.random.default_rng(16)
sma = []
for _ in range(9):
    x, y = rng.uniform(60, W - 60), rng.uniform(40, 380)
    if math.dist((x, y), B["STJ"][:2]) < 160 or math.dist((x, y), B["MÅN"][:2]) < 150:
        continue
    sma.append([round(x, 1), round(y + 9, 1), 18])

# kornet över hela bilden (texturpasset), samma som 006–015
rng = np.random.default_rng(6)
fint = rng.normal(0, 1, (768, 1376))
drag = np.array(Image.fromarray((rng.normal(0, 1, (768, 172)) * 40 + 128).clip(0, 255).astype("uint8")).resize((1376, 768), Image.BICUBIC), float) / 40 - 3.2
v = 0.6 * fint + 0.8 * drag
korn = np.zeros((768, 1376, 4), "uint8")
ljus = v > 0
korn[ljus, :3] = 255
korn[~ljus, :3] = (70, 50, 40)
korn[..., 3] = (np.abs(v) * 9).clip(0, 40).astype("uint8")
Image.fromarray(korn, "RGBA").save(HÄR / "korn.png")

# sångens slag (sångtid), librosa
y, sr = librosa.load(str(HÄR.parents[1] / "sang.m4a"), sr=22050)
o = librosa.onset.onset_strength(y=y, sr=sr)
tempo, slag = librosa.beat.beat_track(onset_envelope=o, sr=sr, start_bpm=80)   # ca 80,7 bpm, takten ca 3 s (4 slag)
slag = [round(float(t), 3) for t in librosa.frames_to_time(slag, sr=sr)]

STJ = B["STJ"]
matt = {
    "INTRO": B["INTRO"], "SANG_SLUT": B["SÅNG_SLUT"], "SLAG": slag, "TEMPO": round(float(np.atleast_1d(tempo)[0]), 1),
    "bilder": {s[0]: [round(a, 3), round(b, 3)] for s, (a, b) in zip(B["SHOTS"], B["SPANN"])},
    # kullens kant: y = KULLE[0] + KULLE[1] * ((x − KULLE[2]) / KULLE[3])²
    "KULLE": [523, 152, 700, 690],
    "STJ": list(STJ), "MAN": list(B["MÅN"]), "SMA": sma,
    "FILT_X": B["FILT_X"], "FILT_Y": B["FILT_Y"], "FILT_K": 1.25,
    # skala = px i bild per enhet i figurens 1024-ruta, samma stående och liggande (bygg.py)
    "LAGE_K": B["LAGE_K"], "NICKE_K": B["NICKE_K"], "NICKE_SOVER_K": B["NICKE_SOVER_K"],
    "LAGE_X": 640, "NICKE_X": 790, "LIGG_LAGE_X": B["LIGG_LAGE_X"], "LIGG_NICKE_X": B["LIGG_NICKE_X"],
    "LAGE_ANS": B["LAGE_ANS"], "LAGE_LIGG_ANS": B["LAGE_LIGG_ANS"], "NICKE_ANS": B["NICKE_ANS"],
    # kamerorna som crop_zoom() i bygg.py: [mitt x, mitt y, bredd]; kit.utsnitt([cx, cy, w])
    "KAMERA": {"hel": [W / 2, H / 2, W], "tva": [705, 420, 640], "stj": [STJ[0], STJ[1] - 46, 420],
               "nicke": [760, 450, 400], "lage": [640, 380, 470], "lage13": [640, 400, 470]},
    "LILA": "#968CC8", "GUL": "#F6E7A8",
}
(HÄR / "matt.json").write_text(json.dumps(matt, ensure_ascii=False, indent=1))
print("filt-lila.png, nicke.png, korn.png + matt.json →", HÄR, f"({len(slag)} slag, {matt['TEMPO']} bpm, {len(sma)} små stjärnor)")
