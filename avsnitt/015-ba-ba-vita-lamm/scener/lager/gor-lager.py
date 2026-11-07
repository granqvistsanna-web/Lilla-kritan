"""Skriver det kodscenerna behöver ur storyboarden (../storyboard/bygg.py) till lager/: måtten, kamerorna, färgerna och
bildernas tider som matt.json, sångens slag, Ludde sittande utan det inbakade ansiktet (ludde-sitter.png) och kornet (korn.png).
(Efter 014:s gor-lager.py.) Kör: ~/.claude/skills/ai-video/.venv/bin/python -I -W ignore lager/gor-lager.py   (från scener/)
Kör om när bygg.py eller assets/ ändras. Kör bara bygg.py:s definitioner (fram till `frames = {}`) och SHOTS-tabellen,
så att storyboarden inte byggs eller skrivs om härifrån."""
import json
from pathlib import Path

import librosa
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HÄR = Path(__file__).resolve().parent
BYGG = HÄR.parents[1] / "storyboard" / "bygg.py"
src = BYGG.read_text()
B = {"__file__": str(BYGG), "__name__": "lager"}
exec(compile(src[:src.index("\nframes = {}")], str(BYGG), "exec"), B)
exec(compile(src[src.index("I, F, V1, M"):src.index("\nassert sorted")], str(BYGG), "exec"), B)


def lappa(im, mål, dx, dy, mjuk=12):
    """Klonar ullen från (mål flyttat dx, dy) över målet (en ellips), med mjuk kant (som 007:s angen/gor-bilder.py)."""
    m = Image.new("L", im.size)
    ImageDraw.Draw(m).ellipse(mål, fill=255)
    m = m.filter(ImageFilter.GaussianBlur(mjuk))
    kopia = im.transform(im.size, Image.AFFINE, (1, 0, dx, 0, 1, dy), Image.BICUBIC)
    ut = im.copy()
    ut.paste(kopia, (0, 0), m)
    ut.putalpha(im.getchannel("A"))
    return ut


# Ludde sittande (ludde-sitter-v2.png): ögonen och munnen bort (ullen under), nosen och de inbakade armarna kvar; ansiktet ritas i kod
s = Image.open(B["LUDDE"] / "cut/ludde-sitter-v2.png").convert("RGBA")
s = lappa(s, (362, 350, 464, 454), 0, 150, 6)   # vänstra ögat
s = lappa(s, (552, 348, 656, 452), 0, 150, 6)   # högra ögat
s = lappa(s, (462, 441, 562, 494), 0, 130, 4)   # munnen och strecket upp till nosen
s.save(HÄR / "ludde-sitter.png")

# kornet över hela bilden (texturpasset), samma som 006–014
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

# sångens slag (sångtid), librosa på slagverket; ca 89 bpm
y, sr = librosa.load(str(HÄR.parents[1] / "sang.m4a"), sr=22050)
o = librosa.onset.onset_strength(y=librosa.effects.percussive(y), sr=sr)
_, slag = librosa.beat.beat_track(onset_envelope=o, sr=sr, start_bpm=90, tightness=400)
slag = [round(float(t), 3) for t in librosa.frames_to_time(slag, sr=sr)]

W, H = B["W"], B["H"]
rgb = lambda c: "#%02X%02X%02X" % tuple(c)
matt = {
    "INTRO": B["INTRO"], "SANG_SLUT": B["SÅNG_SLUT"], "SLAG": slag,
    # avsnittstid [start, slut] per bild (sångtid + INTRO), som storyboardens tidslinje
    "bilder": {s[0]: [round(a, 3), round(b, 3)] for s, (a, b) in zip(B["SHOTS"], B["SPANN"])},
    # ängen: fötternas linje och figurernas höjd i bild (px), x-led för var och en
    "GOLV": B["GOLV"], "LH": B["LH"], "FH": B["FH"], "MH": B["MH"],
    "FAR_X": B["FAR_X"], "MOR_X": B["MOR_X"], "LUDDE_X": B["LUDDE_X"], "SACK_X": B["SÄCK_X"], "HOG_X": B["HÖG_X"],
    # sakerna som place() i bygg.py: [mitt x, underkant y, höjd]
    "SACK_TOM": [B["SÄCK_X"], B["GOLV"] + 4, 80], "SACK_FULL": [B["SÄCK_X"], B["GOLV"] + 4, 175],
    "HOG": [B["HÖG_X"], B["GOLV"] + 45, 42],
    # kamerorna som crop_zoom() i bygg.py: [mitt x, mitt y, bredd]; kit.utsnitt([cx, cy, w])
    "KAMERA": {"hel": [W / 2, H / 2, W], "tva": [(B["FAR_X"] + B["MOR_X"]) / 2, 520, 620], "nar": [B["LUDDE_X"] + 80, 560, 520],
               "halv": [1030, 520, 700], "fotter": [B["LUDDE_X"] + 100, 610, 520]},
    # lammet i riggens 1024-ruta
    "LUDDE_ANS": {"ogon": B["LUDDE_ANS"]["ogon"], "mun": B["LUDDE_ANS"]["mun"], "munSkala": B["LUDDE_ANS"]["munskala"]},
    "FOT": B["FOT"], "HAND": {n: d["spets"] for n, d in json.loads((B["KAR"] if "KAR" in B else Path(B["__file__"]).parents[3] / "assets/karaktarer/lammet-ludde").joinpath("ludde-rigg-lemmar.json").read_text())["delar"].items() if n.startswith("arm")}, "TUSSAR": B["TUSSAR"], "KROPP_C": B["KROPP_C"], "KROPP_R": B["KROPP_R"],
    "FARG": {"ROCK": rgb(B["ROCK"]), "KJOL": rgb(B["KJOL"]), "ROSETT": rgb(B["ROSETT"]), "VIT_ULL": rgb(B["VIT_ULL"]), "GRA_LINJE": rgb(B["GRÅ_LINJE"])},
}
(HÄR / "matt.json").write_text(json.dumps(matt, ensure_ascii=False, indent=1))
print("ludde-sitter.png, korn.png + matt.json →", HÄR, f"({len(slag)} slag)")
