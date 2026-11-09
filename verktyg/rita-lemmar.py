# Ritar en figurs armar och ben som rundade former i kroppens egen kritstruktur, med vit kant.
# Delarna läggs i 1024-rutan på riggens vridpunkter, med runda toppar som gömmer sig bakom kroppen (ingen ledmask behövs).
# python rita-lemmar.py <figurmapp> <utmapp> <x0,y0,x1,y1 kritbit ur kroppen> [benmörker 0..1] [--bara arm] [--kant 37]
#   --bara arm: rita bara delar vars namn börjar så (premium-Kanel: armarna ritas, ben, öron och svans tas ur konsten)
#   --armlangd 0.55: kortare armar (stubbarmar, Disa)
#   --kant 37: kantfiltrets storlek, 37 ≈ 18 px vit kant som konstens egen (standard 17 ≈ 8 px)
import sys, json, glob  # körs med PIL, t.ex. ~/.claude/skills/ai-video/.venv/bin/python -I
from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageStat
mapp, ut, ruta = sys.argv[1], sys.argv[2], [int(v) for v in sys.argv[3].split(",")]
mork = float(sys.argv[4]) if len(sys.argv) > 4 and not sys.argv[4].startswith('--') else 0
flagga = lambda f, std: sys.argv[sys.argv.index(f) + 1] if f in sys.argv else std
BARA, KANT = flagga('--bara', ''), int(flagga('--kant', 17))
AL = float(flagga('--armlangd', 1))   # armens längd och tjocklek, 1 = Kanel (Disa 0,55)
rigg = json.load(open(glob.glob(f"{mapp}/*-rigg.json")[0]))
SS = 4; N = 1024 * SS
bit = Image.open(f"{mapp}/{rigg['kropp']}").convert("RGB").crop(ruta)
tex = Image.new("RGB", (1024, 1024))
for y in range(0, 1024, bit.height):
    for x in range(0, 1024, bit.width):
        tex.paste(bit if (x // bit.width + y // bit.height) % 2 == 0 else bit.transpose(Image.FLIP_LEFT_RIGHT), (x, y))
medel = ImageStat.Stat(bit).mean
ta = tuple(int(c * 0.6) for c in medel) + (255,)   # tårnas streck: kroppens färg, mörkare

def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)

for namn, d in rigg["delar"].items():
    if not namn.startswith(BARA):
        continue
    p, sida = d["vridpunkt"], 1 if namn.endswith("-r") else -1
    m = Image.new("L", (N, N), 0); dr = ImageDraw.Draw(m)
    if namn.startswith("arm"):
        kapsel(dr, (p[0] - sida * 40, p[1] - 10), (p[0] + sida * 62 * AL, p[1] + 62 * AL), 32 * AL ** 0.5, 40 * AL ** 0.5)
    else:
        # foten slutar där den gamla utklippta foten slutade (v1/ om den redan är bytt), så figuren står kvar på marken
        gammal = glob.glob(f"{mapp}/cut/v1/{d['fil'].split('/')[-1]}") or [f"{mapp}/{d['fil']}"]
        fx, fy = p[0] + sida * 48, Image.open(gammal[0]).getbbox()[3] - 8 - 38
        kapsel(dr, (p[0], p[1] - 40), (p[0] + sida * 10, fy - 22), 42, 40)
        dr.ellipse([(fx - 86) * SS, (fy - 38) * SS, (fx + 86) * SS, (fy + 38) * SS], fill=255)
    m = m.resize((1024, 1024), Image.LANCZOS)
    rim = m.filter(ImageFilter.MaxFilter(KANT)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim)
    im.paste(tex.point(lambda v: int(v * (1 - mork))) if namn.startswith("leg") else tex, mask=m)
    im.putalpha(ImageChops.lighter(rim, m))
    if namn.startswith("leg"):
        t = ImageDraw.Draw(im)
        for dy in (-12, 10):
            x0 = fx + sida * 52
            t.line([(x0, fy + dy), (x0 + sida * 22, fy + dy * 0.6)], fill=ta, width=5)
    im.save(f"{ut}/{d['fil'].split('/')[-1]}")
