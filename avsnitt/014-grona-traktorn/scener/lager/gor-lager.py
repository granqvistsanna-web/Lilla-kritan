"""Tar ut lagren som storyboarden räknar fram (vägplattan omfärgad till himmelsblått, den gröna flaggan, Lovas jacka och ärmar,
den ritade traktorns masker, discot i mint och den gröna kulan, kornet) som PNG här i lager/, och tiderna, måtten och sångens
slag som matt.json, så att kodscenerna använder samma bilder, platser och tider som storyboarden. (Efter 007:s gor-lager.py.)
Kör: ~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py   (från scener/; kör om när bygg.py eller assets/ ändras)
Kör bygg.py fram till blocket som sparar frames/ (014:s bygg.py bygger bilderna mitt i filen), så att storyboarden inte skrivs
om härifrån. Tar ca 2 min. Kör sedan lager/gor-vag.py (vägen utan mittstreck ur lager/vagen.png)."""
import json
import math
from pathlib import Path

import librosa
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

HÄR = Path(__file__).resolve().parent
BYGG = HÄR.parents[1] / "storyboard" / "bygg.py"
src = BYGG.read_text()
B = {"__file__": str(BYGG), "__name__": "lager"}
exec(compile(src[:src.index("\nframes = {k: papperskorn")], str(BYGG), "exec"), B)
kritfyll, ritmask = B["kritfyll"], B["ritmask"]


def vit(mask):
    """En mask i traktorns 1024-ruta som vit RGBA (kritan-ritar använder den som SVG-mask)."""
    im = Image.new("RGBA", mask.size, (255, 255, 255, 0))
    im.putalpha(mask)
    return im


# Lovas gröna jacka (jacka() i bygg.py) utan dragkedjans handtag (det flyttas i kod på "Zipp"), och ärmarna (armbild() i bygg.py)
# utan den vita kanten (kant.js lägger den). Allt i Lovas 1024-ruta. Jackan är ljusare än i storyboarden (GRÖN_J), ett klart
# ljust lövgrönt, så att den inte flyter ihop med traktorn (58, 147, 47); dragkedjan ritas i kod, här bara kragen och en ficka.
JACKA = (132, 208, 116)
LM = B["A"] / "karaktarer/leoparden-lova"
RIG = json.loads((LM / "leoparden-lova-rigg-lemmar.json").read_text())
kropp = Image.open(LM / RIG["kropp"]).convert("RGBA")
jacka = Image.new("RGBA", kropp.size)
km = kropp.getchannel("A").point(lambda v: 255 if v > 200 else 0).filter(ImageFilter.MinFilter(9))
m = Image.new("L", kropp.size); ImageDraw.Draw(m).polygon([(0, 575), (805, 575), (805, 760), (760, 780), (665, 790), (665, 1024), (0, 1024)], fill=255)   # kroppen under halsen, inte svansen (svansen är sandgul)
kritfyll(jacka, ImageChops.multiply(km, m), JACKA, vick=0.15, oskarp=1.5)
m, d = ritmask(jacka)
d.rounded_rectangle((598, 700, 690, 780), radius=14, outline=255, width=8)   # fickan
d.line((606, 722, 682, 722), fill=255, width=6)
d.polygon([(450, 572), (512, 620), (574, 572), (560, 590), (512, 640), (464, 590)], fill=255)   # kragen
kritfyll(jacka, ImageChops.multiply(m, km), (40, 110, 52), vick=0.1, oskarp=0.8)
ut = {"lova-jacka": jacka}
for dl in ("arm-r", "arm-l"):
    im = Image.open(LM / RIG["delar"][dl]["fil"]).convert("RGBA")
    piv, sp = RIG["delar"][dl]["vridpunkt"], RIG["delar"][dl]["spets"]
    m = Image.new("L", im.size)
    r = 0.62 * math.dist(piv, sp)
    ImageDraw.Draw(m).ellipse((piv[0] - r, piv[1] - r, piv[0] + r, piv[1] + r), fill=255)
    arm = im.getchannel("A").point(lambda v: 255 if v > 200 else 0).filter(ImageFilter.MinFilter(9))
    kritfyll(im, ImageChops.multiply(m, arm), JACKA, vick=0.15, oskarp=1.2)
    ut[f"lova-{dl}"] = im

# den ritade traktorn (02–02c): kroppen, taket och stolparna som masker i traktorns 1024-ruta (KROPP_M, TAK_M)
tak = ImageChops.multiply(B["TAK_M"], B["_y"](0, 239))
kropp_m = B["KROPP_M"].filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))   # utan smulor kvar efter hjulen och taket
ut.update({"ritad-kropp": vit(kropp_m), "ritad-tak": vit(tak), "ritad-stolpar": vit(ImageChops.subtract(B["TAK_M"], tak))})
ut.update({
    "flagga-gron": B["FLAGGA_GR"].crop(B["FLAGGA_GR"].getbbox()),
    "vagen": B["VÄG_TOM"],   # utan höstträden: de ritas i kod (kit.vag) och glider långsammare än vägen
    "disco": B["DISCO_BILD"],
    "discokula-gron": B["DISCOKULA"],
})
# kornet över hela bilden (texturpasset), samma som 006 och 007
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

# Sångens slag (sångtid): Suno-tagningen glider i tempo (ca 83–86 bpm), så kit.takt() fäster på de uppmätta slagen i stället
# för ett rakt rutnät. librosa beat_track på slagverksdelen.
y, sr = librosa.load(str(HÄR.parents[1] / "sang.m4a"), sr=22050)
o = librosa.onset.onset_strength(y=librosa.effects.percussive(y), sr=sr)
_, slag = librosa.beat.beat_track(onset_envelope=o, sr=sr, start_bpm=85, tightness=400)
slag = [round(float(s), 3) for s in librosa.frames_to_time(slag, sr=sr)]

# tiderna (avsnittstid, tider() i bygg.py: SÅNGTID + INSATT) och måtten som scenerna behöver
bb = B["kant"](B["traktor"](), B["TR_H"]).getbbox()   # körscen(): place(kant(traktor()), TR_X, GV, TR_H), flaggan med
P = lambda n: B[n]
matt = {
    "INTRO": B["INTRO"], "INSATT": B["INSATT"], "SANGTID": B["SÅNGTID"], "SLAG": slag,
    "bilder": {s[0]: [round(a, 3), round(b, 3)] for s, (a, b, m) in zip(B["SHOTS"], B["tider"]())},
    "TR": {"x": B["TR_X"], "gv": B["GV"], "h": B["TR_H"], "bb": bb},
    "LOVA_I": {"k": B["LOVA_K"], "plats": B["LOVA_PL"], "midja": B["MIDJA"]},
    "AVGAS": B["AVGAS"], "HJULEN": B["HJULEN"], "RB": B["RB"],
    "HP": {k: P(k) for k in ("SITS", "GOLV", "PIP_X", "GURRA_X", "BIL_X", "LJUS_X", "BIL_HP", "FIG_HP", "LJUS_HP", "HEL", "TVÅ", "LÅG", "PIP_NÄR") if k in B},   # LJUS_X/LJUS_HP finns inte längre i bygg.py
    "DISCO": {k: P(k) for k in ("SOLO_H", "SOLO_FOT", "KULA", "IKON_BÅGE", "IKON_R", "KULA_MITT", "KULA_R0")},
}
(HÄR / "matt.json").write_text(json.dumps(matt, ensure_ascii=False, indent=1))
print(", ".join(ut), "+ matt.json →", HÄR)
