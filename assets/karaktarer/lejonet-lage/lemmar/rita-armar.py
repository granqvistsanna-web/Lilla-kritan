# Lages armar (007, klappen): raka pinnar i kroppens gula kritstruktur med mörk tass och vit kant, framför kroppen.
# Ritas hängande rakt ner från axeln; vinklar som musens (0 ner, 90 ut, minus in över magen). Klappen: -70, tassarna möts mitt på bröstet.
# Körs i lejonet-lage/: ~/.claude/skills/ai-video/.venv/bin/python -I lemmar/rita-armar.py
import json
from PIL import Image, ImageDraw, ImageFilter, ImageChops
SS = 4; N = 1024 * SS
AXEL = {"r": (734, 590), "l": (290, 590)}
L, R_AXEL, R_HAND, R_TASS = 205, 30, 27, 33
bit = Image.open("cut/lejonet-lage-body.png").convert("RGB").crop((380, 700, 520, 780))
tex = Image.new("RGB", (1024, 1024))
for y in range(0, 1024, bit.height):
    for x in range(0, 1024, bit.width):
        tex.paste(bit if (x // bit.width + y // bit.height) % 2 == 0 else bit.transpose(Image.FLIP_LEFT_RIGHT), (x, y))
tass = Image.new("RGB", (1024, 1024), (46, 29, 20))
def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)
rigg = {"storlek": 1024, "kropp": "cut/lejonet-lage-body.png", "ritadeDelar": True,
        "vinklar": "grader åt det håll armen pekar: 0 rakt ner, 90 rakt ut åt sin sida, minus in över magen (klappen -70)",
        "ordning": "bakifrån: kropp (benen och svansen i den), ansikte, armar framför", "vila": {"arm": 35}, "delar": {}}
for s, (ax, ay) in AXEL.items():
    arm = Image.new("L", (N, N), 0); kapsel(ImageDraw.Draw(arm), (ax, ay), (ax, ay + L), R_AXEL, R_HAND)
    arm = arm.resize((1024, 1024), Image.LANCZOS)
    # tassen: bara nedersta delen av armen blir mörk (som originalets stumpar)
    tm = Image.new("L", (N, N), 0); d = ImageDraw.Draw(tm)
    d.rectangle([0, (ay + L - 14) * SS, N, N], fill=255)
    tm = ImageChops.multiply(tm.resize((1024, 1024), Image.LANCZOS), arm)
    hel = arm
    rim = hel.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim); im.paste(tex, mask=arm); im.paste(tass, mask=tm)
    im.putalpha(ImageChops.lighter(rim, hel))
    im.save(f"lemmar/lejonet-lage-arm-{s}.png")
    rigg["delar"][f"arm-{s}"] = {"fil": f"lemmar/lejonet-lage-arm-{s}.png", "vridpunkt": [ax, ay], "spets": [ax, ay + L]}
json.dump(rigg, open("lejonet-lage-rigg-lemmar.json", "w"), indent=2, ensure_ascii=False)
