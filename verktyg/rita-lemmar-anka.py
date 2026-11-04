# Ankans lemmar: orange ben med simfötter (näbbens kritstruktur) och vita vingar (kroppens), med vit kant.
# Samma teknik som verktyg/rita-lemmar.py, men formerna är ankans. python rita-lemmar-anka.py <figurmapp> <utmapp>
import sys, json
from PIL import Image, ImageDraw, ImageFilter, ImageChops
mapp, ut = sys.argv[1], sys.argv[2]
rigg = json.load(open(f"{mapp}/ankan-agda-rigg.json"))
SS = 4; N = 1024 * SS


def tex_from(fil, ruta):
    bit = Image.open(fil).convert("RGB").crop(ruta)
    t = Image.new("RGB", (1024, 1024))
    for y in range(0, 1024, bit.height):
        for x in range(0, 1024, bit.width):
            t.paste(bit if (x // bit.width + y // bit.height) % 2 == 0 else bit.transpose(Image.FLIP_LEFT_RIGHT), (x, y))
    return t


def orange():
    """Näbbens orange som vaxkrita: platt färg med korta snedstreck i ljusare och mörkare ton."""
    import random
    random.seed(5)
    t = Image.new("RGB", (1024, 1024), (240, 116, 36)); d = ImageDraw.Draw(t, "RGBA")
    for _ in range(9000):
        x, y = random.uniform(0, 1024), random.uniform(0, 1024); L = random.uniform(8, 26)
        d.line((x, y, x + L, y - L * 0.5), fill=random.choice([(214, 92, 22, 120), (252, 150, 70, 110)]), width=2)
    return t


ORANGE = orange()
KROPP = tex_from(f"{mapp}/{rigg['kropp']}", (420, 560, 600, 720))


def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)


for namn, d in rigg["delar"].items():
    p, sida = d["vridpunkt"], 1 if namn.endswith("-r") else -1
    m = Image.new("L", (N, N), 0); dr = ImageDraw.Draw(m)
    if namn.startswith("arm"):
        # vinge: en droppe från axeln ut och ner, rund topp bakom kroppen
        kapsel(dr, (p[0] - sida * 20, p[1] - 10), (p[0] + sida * 34, p[1] + 52), 34, 18)
        tex = KROPP
    else:
        # tunt ben ner till samma höjd som den gamla foten, sedan en simfot med tre runda tår
        fy = 958
        kapsel(dr, (p[0], p[1] - 40), (p[0] + sida * 4, fy - 30), 24, 20)
        ax, ay = p[0] + sida * 4, fy - 26
        toes = [(ax + sida * dx, fy + dy) for dx, dy in ((-44, 0), (24, 12), (92, 0))]
        dr.polygon([(ax * SS, (ay - 14) * SS)] + [(x * SS, y * SS) for x, y in toes], fill=255)
        for x, y in toes:
            dr.ellipse([(x - 24) * SS, (y - 18) * SS, (x + 24) * SS, (y + 18) * SS], fill=255)
        tex = ORANGE
    m = m.resize((1024, 1024), Image.LANCZOS)
    rim = m.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim)
    im.paste(tex, mask=m)
    im.putalpha(ImageChops.lighter(rim, m))
    im.save(f"{ut}/{d['fil'].split('/')[-1]}")
