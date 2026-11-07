# Luddes armar (015): rundade pinnar i benens gråbruna kritstruktur med mörk klöv och vit kant, framför kroppen.
# Originalets armar är små stumpar bakom kroppen som knappt syns; de här hänger från axeln innanför kroppskanten och
# ut förbi den, lite utåt. Benen och sittbilden är orörda (riggen tar benen från cut/).
# Vinklar som i lamm.js: armL −60 och armR 60 = armarna upp, 0 = så som de är ritade här.
# Körs i lammet-ludde/: ~/.claude/skills/ai-video/.venv/bin/python -I lemmar/rita-armar.py
import json
from PIL import Image, ImageDraw, ImageFilter, ImageChops
SS = 4; N = 1024 * SS
AXEL = {"l": (252, 540), "r": (772, 540)}
SPETS = {"l": (212, 712), "r": (812, 712)}
R_AXEL, R_HAND, KLOV = 27, 25, 28
bit = Image.open("cut/ludde-leg-l.png").convert("RGB").crop((410, 838, 446, 868))
tex = Image.new("RGB", (1024, 1024))
for y in range(0, 1024, bit.height):
    for x in range(0, 1024, bit.width):
        tex.paste(bit if (x // bit.width + y // bit.height) % 2 == 0 else bit.transpose(Image.FLIP_LEFT_RIGHT), (x, y))
klov = Image.new("RGB", (1024, 1024), (40, 33, 22))

def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)

rigg = json.load(open("ludde-rigg.json"))
rigg["ritadeDelar"] = ["arm-l", "arm-r"]
rigg["ordning"] = "bakifrån: benen, kroppen, ansiktet, armarna framför"
for s, (ax, ay) in AXEL.items():
    tx, ty = SPETS[s]
    arm = Image.new("L", (N, N), 0); kapsel(ImageDraw.Draw(arm), (ax, ay), (tx, ty), R_AXEL, R_HAND)
    arm = arm.resize((1024, 1024), Image.LANCZOS)
    # klöven: den nedersta biten av armen, vinkelrätt mot armen
    ux, uy = (tx - ax), (ty - ay); n = (ux * ux + uy * uy) ** 0.5; ux, uy = ux / n, uy / n
    km = Image.new("L", (N, N), 0)
    cx, cy = tx - ux * (R_HAND + 2 - KLOV), ty - uy * (R_HAND + 2 - KLOV)   # gränsen KLOV px upp från spetsen
    big = 2000
    pts = [(cx - uy * big, cy + ux * big), (cx + uy * big, cy - ux * big), (cx + uy * big + ux * big, cy - ux * big + uy * big), (cx - uy * big + ux * big, cy + ux * big + uy * big)]
    ImageDraw.Draw(km).polygon([(x * SS, y * SS) for x, y in pts], fill=255)
    km = ImageChops.multiply(km.resize((1024, 1024), Image.LANCZOS), arm)
    rim = arm.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim); im.paste(tex, mask=arm); im.paste(klov, mask=km)
    im.putalpha(ImageChops.lighter(rim, arm))
    im.save(f"lemmar/ludde-arm-{s}.png")
    rigg["delar"][f"arm-{s}"] = {"fil": f"lemmar/ludde-arm-{s}.png", "vridpunkt": [ax, ay], "spets": [tx, ty]}
json.dump(rigg, open("ludde-rigg-lemmar.json", "w"), indent=2, ensure_ascii=False)
