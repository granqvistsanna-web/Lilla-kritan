# Musen Milles armar och ben, ritade i kod: kroppens grå kritstruktur, vit kant och en rosa tass (öronens rosa) längst ut.
# Samma teknik som rita-lemmar.py: armen är en kort rak pinne utan armbåge, som vrids runt axeln.
# Delarna ritas hängande rakt ner från sin vridpunkt. En vinkel säger åt vilket håll delen pekar:
#   0 = rakt ner, 90 = rakt ut åt sin egen sida, 180 = rakt upp, minus = in över magen. Spegelvänt för vänster sida.
# python3 verktyg/rita-lemmar-mus.py          ritar delarna till assets/karaktarer/musen-mille/lemmar/ och granskningsarket
# python3 verktyg/rita-lemmar-mus.py --ark    bara arket (avsnitt/005-rosa-bilen/musen-uttryck.png)
# Från annan kod: mus = runpy.run_path(".../verktyg/rita-lemmar-mus.py")  →  mus["mus"](...), mus["mot"](...), mus["hand"](...)
import json, math, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageFont

sys.path.insert(0, str(Path(__file__).parent))
import ansikten

ROT = Path(__file__).resolve().parents[1]
MAPP = ROT / "assets/karaktarer/musen-mille"
RIGG = MAPP / "musen-mille-rigg-lemmar.json"
SS = 4; N = 1024 * SS
SIDA = {"r": 1, "l": -1}
AXEL = {"r": (757, 565), "l": (256, 565)}   # gömda bakom kroppens kant, så den runda toppen inte syns
HÖFT = {"r": (604, 800), "l": (433, 800)}
L = 170                                     # axel → tassens mitt
R_AXEL, R_HAND, R_TASS = 32, 27, 38
KANT = 8                                    # vit kant, px
VILA = 30                                   # armen i vila: lite ut från kroppen


def tex_from(fil, ruta):
    bit = Image.open(fil).convert("RGB").crop(ruta)
    t = Image.new("RGB", (1024, 1024))
    for y in range(0, 1024, bit.height):
        for x in range(0, 1024, bit.width):
            t.paste(bit if (x // bit.width + y // bit.height) % 2 == 0 else bit.transpose(Image.FLIP_LEFT_RIGHT), (x, y))
    return t


def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)


def ny_mask():
    m = Image.new("L", (N, N), 0)
    return m, ImageDraw.Draw(m)


def klar(m):
    return m.resize((1024, 1024), Image.LANCZOS)


def sticker(lager):
    """lager = [(textur, mask)]. Vit kant runt alltihop."""
    hel = lager[0][1]
    for _, m in lager[1:]:
        hel = ImageChops.lighter(hel, m)
    rim = hel.filter(ImageFilter.MaxFilter(2 * KANT + 1)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim)
    for tex, m in lager:
        im.paste(tex, mask=m)
    im.putalpha(ImageChops.lighter(rim, hel))
    return im


def rita():
    kropp = MAPP / "cut/musen-mille-body.png"
    GRÅ = tex_from(kropp, (440, 560, 600, 720))
    ROSA = tex_from(kropp, (262, 205, 338, 281))   # vänstra örats insida
    ut = MAPP / "lemmar"; ut.mkdir(exist_ok=True)
    delar = {}
    for s, sida in SIDA.items():
        (ax, ay) = AXEL[s]; h = (ax, ay + L)
        # arm: rund topp bakom kroppen, rosa tass med två små fingerstreck
        m, d = ny_mask(); kapsel(d, (ax, ay), h, R_AXEL, R_HAND)
        t, dt = ny_mask(); kapsel(dt, h, h, R_TASS, R_TASS)
        im = sticker([(GRÅ, klar(m)), (ROSA, klar(t))])
        dr = ImageDraw.Draw(im)
        for dx in (-12, 12):
            dr.line([(h[0] + dx, h[1] + 18), (h[0] + dx * 1.15, h[1] + 31)], fill=(196, 112, 128, 255), width=5)
        im.save(ut / f"musen-mille-arm-{s}.png")
        # ben: kort, rund fot som pekar utåt, foten slutar där den gamla foten slutade (y 921 + kant)
        (hx, hy) = HÖFT[s]; fx, fy = hx + sida * 34, 891
        m, d = ny_mask(); kapsel(d, (hx, hy - 30), (hx + sida * 6, fy - 16), 40, 36)
        d.ellipse([(fx - 68) * SS, (fy - 30) * SS, (fx + 68) * SS, (fy + 30) * SS], fill=255)
        im = sticker([(GRÅ, klar(m))])
        dr = ImageDraw.Draw(im)
        for dy in (-10, 10):
            x0 = fx + sida * 44
            dr.line([(x0, fy + dy), (x0 + sida * 18, fy + dy * 0.6)], fill=(118, 104, 94, 255), width=5)
        im.save(ut / f"musen-mille-leg-{s}.png")
        delar |= {
            f"arm-{s}": {"fil": f"lemmar/musen-mille-arm-{s}.png", "vridpunkt": [ax, ay], "spets": list(h)},
            f"leg-{s}": {"fil": f"lemmar/musen-mille-leg-{s}.png", "vridpunkt": [hx, hy], "spets": [fx, fy]},
        }
    RIGG.write_text(json.dumps({
        "storlek": 1024, "kropp": "cut/musen-mille-body.png", "ritadeDelar": True,
        "vinklar": "grader åt det håll delen pekar: 0 rakt ner, 90 rakt ut åt sin sida, 180 rakt upp, minus in över magen",
        "ordning": "bakifrån: ben, arm, kropp, ansikte; en arm framför kroppen ritas efter ansiktet",
        "vila": {"arm": VILA, "ben": 0},
        "delar": delar}, ensure_ascii=False, indent=2))


# ---------- posera ----------
def _riktning(s, a):
    r = math.radians(a)
    return SIDA[s] * math.sin(r), math.cos(r)


def hand(s, a):
    """Tassens mitt (1024-rutan) när armen pekar i vinkeln a."""
    (ax, ay) = AXEL[s]; dx, dy = _riktning(s, a)
    return ax + dx * L, ay + dy * L


def mot(s, mål):
    """Vinkeln som riktar armen mot mål (armen är kort, så tassen når bara L px från axeln)."""
    (ax, ay) = AXEL[s]
    return math.degrees(math.atan2(SIDA[s] * (mål[0] - ax), mål[1] - ay))


_bild = {}
def _del(namn):
    if namn not in _bild:
        _bild[namn] = Image.open(MAPP / "lemmar" / f"musen-mille-{namn}.png").convert("RGBA")
    return _bild[namn]


def arm(c, s, a):
    """Lägger en arm på c (RGBA 1024)."""
    c.alpha_composite(_del(f"arm-{s}").rotate(SIDA[s] * a, resample=Image.BICUBIC, center=AXEL[s]))


def mus(humör="glad", arm_r=VILA, arm_l=VILA, ben_r=0, ben_l=0, fram=(), titt=(0, 0), i_handen=None, kropp=None):
    """Hela musen i 1024-rutan. arm_* = vinkel, eller mot(sida, punkt). fram = sidor vars arm ligger framför kroppen.
    i_handen = {"r": (bild, höjd)}: en sak (t.ex. glassen) som tassen håller, ritad under tassen."""
    c = Image.new("RGBA", (1024, 1024))
    for s, a in (("l", ben_l), ("r", ben_r)):
        c.alpha_composite(_del(f"leg-{s}").rotate(SIDA[s] * a, resample=Image.BICUBIC, center=HÖFT[s]))
    armar = {"r": arm_r, "l": arm_l}

    def sak(s):
        if i_handen and s in i_handen:
            im, h = i_handen[s]
            hx, hy = hand(s, armar[s])
            box = im.getbbox(); k = h / (box[3] - box[1])
            liten = im.crop(box).resize((round((box[2] - box[0]) * k), round(h)), Image.LANCZOS)
            c.alpha_composite(liten, (round(hx - liten.width / 2), round(hy + h * 0.3 - h)))

    for s in ("l", "r"):
        if s not in fram:
            sak(s); arm(c, s, armar[s])
    c.alpha_composite(kropp or Image.open(MAPP / "cut/musen-mille-body.png").convert("RGBA"))
    ansikten.rita(c, humör, titt)
    for s in ("l", "r"):
        if s in fram:
            sak(s); arm(c, s, armar[s])
    return c


# ---------- granskningsarket ----------
def ark():
    ut = ROT / "avsnitt/005-rosa-bilen/musen-uttryck.png"
    font = lambda n: ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", n)
    glass = Image.open(ROT / "assets/rekvisita/jordgubbsglass.png").convert("RGBA")
    kropp = Image.open(MAPP / "cut/musen-mille-body.png").convert("RGBA")
    BG, CELL = (182, 231, 202), (250, 248, 242)
    W, cw = 2400, 400
    c = Image.new("RGB", (W, 2160), CELL)
    d = ImageDraw.Draw(c)

    def ruta(x, y, w, h, im, text, crop=None):
        d.rounded_rectangle((x + 10, y + 10, x + w - 10, y + h - 10), 24, fill=BG)
        if crop:
            im = im.crop(crop)
        k = min((w - 40) / im.width, (h - 90) / im.height)
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
        c.paste(im, (x + (w - im.width) // 2, y + 24), im)
        d.text((x + w / 2, y + h - 40), text, font=font(34), fill=(60, 50, 40), anchor="mm")

    d.text((40, 40), "Musen Mille: ansikten (ansikten.py / ansikten.js)", font=font(50), fill=(60, 50, 40))
    namn = ["glad", "skrattar", "ropar", "forvanad", "nyfiken", "skelogd", "njuter", "slickar", "karleksfull", "blinkar", "ledsen"]
    etikett = {"forvanad": "förvånad", "skelogd": "skelögd", "karleksfull": "kärleksfull", "ledsen": "lite ledsen"}
    for i, n in enumerate(namn):
        im = mus(n, kropp=kropp)
        if n == "njuter":   # nosen upp: hela figuren lutar bakåt
            im = im.rotate(8, resample=Image.BICUBIC, center=(512, 926))
        ruta((i % 6) * cw, 110 + (i // 6) * 470, cw, 470, im, etikett.get(n, n), crop=(150, 90, 880, 720))

    d.text((40, 1080), "Refrängdansen och greppen, med de nya armarna och benen (rita-lemmar-mus.py)", font=font(50), fill=(60, 50, 40))
    poser = [
        ("armarna upp", dict(humör="ropar", arm_r=150, arm_l=150, ben_r=8, ben_l=8)),
        ("händerna på hjärtat", dict(humör="karleksfull", arm_r=mot("r", (540, 650)), arm_l=mot("l", (484, 650)), fram="rl")),
        ("glasstopp över huvudet", dict(humör="skrattar", arm_r=168, arm_l=168)),
        ("svänger ratten", dict(humör="glad", arm_r=mot("r", (560, 760)), arm_l=mot("l", (470, 560)), fram="rl", ratt=True)),
        ("tutar", dict(humör="skrattar", arm_r=mot("r", (512, 650)), arm_l=mot("l", (512, 760)), fram="rl", ratt=True)),
        ("handen över ögonen", dict(humör="nyfiken", arm_r=mot("r", (612, 330)), fram="r")),
        ("vinkar", dict(humör="glad", arm_l=135)),   # vänster arm: höger skyms av svansen
        ("håller glassen", dict(humör="slickar", arm_r=mot("r", (700, 560)), fram="r", i_handen={"r": (glass, 260)})),
    ]
    for i, (text, p) in enumerate(poser):
        ratt = p.pop("ratt", False)
        im = mus(kropp=kropp, **p)
        if ratt:   # ratten bara som en ring mellan tassarna, för att läsa posen
            (x1, y1), (x2, y2) = hand("r", p["arm_r"]), hand("l", p["arm_l"])
            cx, cy, rr = (x1 + x2) / 2, (y1 + y2) / 2, math.hypot(x1 - x2, y1 - y2) / 2
            r = Image.new("RGBA", im.size); rd = ImageDraw.Draw(r)
            rd.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), outline=(232, 92, 150, 255), width=24)
            rd.ellipse((cx - 26, cy - 26, cx + 26, cy + 26), fill=(232, 92, 150, 255))
            front = Image.new("RGBA", im.size)
            for s in "rl":
                arm(front, s, p[f"arm_{s}"])
            im.alpha_composite(r); im.alpha_composite(front)
        ruta((i % 6) * cw, 1160 + (i // 6) * 500, cw, 500, im, text, crop=(60, 40, 1000, 1000))
    c.save(ut)
    print(ut)


if __name__ == "__main__":
    if "--ark" not in sys.argv:
        rita()
    ark()
