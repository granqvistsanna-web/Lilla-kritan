"""Bygger bildstoryboarden för avsnitt 011 (Gula sången) av utklippen och bakgrunderna, som 013:s bygg.py.
Bilderna följer tabellen i ../storyboard.md (en stillbild per rad) och refrängen i ../refrang-plan.md.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter. Ändrar inte storyboard.md.

Ansiktena ritas i kod med humören i verktyg/ansikten.py. Vita kanter enligt skillen vita-kanter: 3 px + 1 % av sakens höjd i bild
(räknat i en 1920-bild, här 1376 bred). Det som saknas i assets/ (helikoptern, solhatten, den skrattande solen och den gyllene
himlen) ritas som enkla platshållare i kod och listas i index.html. När bilderna finns: lägg in dem i ASSET och byt
platshållarfunktionen. Ingen Suno-tagning finns än, så tiderna (TID) är uppskattade. Allt ritat i kod får kritstruktur och ett
svagt papperskorn; `--platt` stänger av det.
"""
import html
import json
import math
import re
import runpy
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
VIT = (255, 255, 255)
CITRON = (255, 225, 77)      # #FFE14D, helikoptern (ljusare och kallare än Lage)
CITRON_M = (226, 186, 40)    # helikopterns kant och sitsens rand
SOLGUL = (255, 204, 51)      # solen
SOLSTRÅLE = (255, 220, 110)
HATT = (255, 210, 63)        # #FFD23F, Kajsas solhatt
LAGE_GUL = (242, 181, 68)    # #F2B544, Lages svans i kod
TOFS = (196, 105, 46)        # #C4692E, svanstofsen
GRÅ = (128, 128, 132)
GYLLEN = (255, 214, 120)     # himlen glöder i refrängen
CITRONLJUS = (255, 241, 168)
BLAD = (112, 178, 82)
BLAD_M = (80, 140, 60)
VATTEN = (120, 170, 230)
HIMMELSBLÅ = (79, 179, 232)  # #4FB3E8, himlen
TURKOS = (43, 183, 166)      # #2BB7A6, dammen
PLATSHÅLLARE = []

ASSET = {
    "himlen": "bakgrunder/himlen/himlen.png",
    "dammen": "bakgrunder/dammen/dammen.png",
    "banan": "rekvisita/banan.png",
    "korg": "rekvisita/korg/cut/korg-v2.png",
    "pella": "karaktarer/flygplanet-pella/flygplanet-pella-faceless.png",
    "fia": "karaktarer/fjarilen-fia/cut/fia.png",
    "disco": "../avsnitt/006-orange-baten/scener/lager/disco-prickar.png",
}
SAKNAS = {   # platshållare i kod tills bilderna finns (prompterna skrivs i en annan session)
    "helikopter": "rekvisita/helikopter-gul (gula helikoptern: bubbla med låg öppen sits, svans, medar; rotorn i kod)",
    "solhatt": "rekvisita/solhatt-gul (Kajsas gula solhatt)",
    "jattesolen": "bakgrunder/jattesolen (refrängens jättesol mot gyllene himmel; ansiktet ritas i kod)",
    "sol": "sol i berättelsen (sol-orange finns bara som prompt, ingen bild: en gul kodsol utan ansikte)",
}
TID = {   # uppskattad längd i sekunder per rad (ingen tagning än); resten 2,5 s, ca en takt i 96 bpm
    "01": 11, "02": 3, "02b": 5, "02c": 3.5, "03": 3, "03c": 4, "06b": 5, "07": 21, "08": 3.5, "08c": 7, "09f": 3.5,
    "10d": 3.5, "10e": 4, "11": 2, "11b": 1.6, "11c": 1.6, "11d": 1.6, "12d": 3, "13": 4,
}


def bild(nyckel):
    return Image.open(A / ASSET[nyckel]).convert("RGBA")


def platshållare(nyckel):
    if SAKNAS[nyckel] not in PLATSHÅLLARE:
        PLATSHÅLLARE.append(SAKNAS[nyckel])


# --- Kritstruktur (som 007) ------------------------------------------------------------------------------------
KRITA = "--platt" not in sys.argv
_g = Image.open(A / "bakgrunder/glasskiosken/glasskiosken.png").convert("L").crop((480, 0, 1376, 560)).resize((W, H))
_d = np.asarray(_g, float) - np.asarray(_g.filter(ImageFilter.GaussianBlur(12)), float)
KORN = np.clip(0.5 + _d / (4 * _d.std()), 0, 1)
_rng = np.random.default_rng(6)
BRUS = sum(np.asarray(Image.fromarray((_rng.random((H // k, W // k)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), float)
           for k in (6, 16)) / 255 - 1


def kritfyll(c, mask, col, alpha=1.0, vick=0.25, oskarp=2.0):
    """Fyller masken med färgen som vaxkrita: ojämn kant, kritkorn, papperet skymtar i luckorna."""
    if not KRITA:
        c.paste(col[:3], mask=mask.point(lambda v: int(v * alpha)))
        return
    w, h = mask.size
    kx = np.tile(KORN, (h // H + 1, w // W + 1))[:h, :w]
    ky = np.tile(BRUS, (h // H + 1, w // W + 1))[:h, :w]
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(oskarp)), float) / 255
    m = np.clip((m - 0.5 + vick * ky) * 4 + 0.5, 0, 1) * np.clip(0.35 + 0.9 * kx, 0, 1) * alpha
    lag = Image.fromarray(np.clip(np.array(col[:3], float) * (0.9 + 0.2 * kx[..., None]), 0, 255).astype(np.uint8)).convert("RGBA")
    lag.putalpha(Image.fromarray((m * 255).astype(np.uint8)))
    if c.mode == "RGBA":
        c.alpha_composite(lag)
    else:
        c.paste(lag, mask=lag.getchannel("A"))


def ritmask(c):
    m = Image.new("L", c.size)
    return m, ImageDraw.Draw(m)


def fyll(c, col, rita, **kw):
    """Ritar en form i en mask med `rita(d)` och fyller den med krita."""
    m, d = ritmask(c)
    rita(d)
    kritfyll(c, m, col, **kw)
    return m


def papperskorn(im):
    if not KRITA:
        return im
    a = np.asarray(im.convert("RGB"), float) * (1 - 0.12 * (1 - KORN[..., None]))
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def vit_kant(im, r):
    under = Image.new("RGBA", im.size, (255, 255, 255, 0))
    under.putalpha(im.getchannel("A").filter(ImageFilter.MaxFilter(r)))
    under.alpha_composite(im)
    return under


def place(canvas, im, cx, ground, h, rot=0, bakad=True):
    """Klistrar in med underkanten på `ground`, höjd h px, med vit kant enligt vita-kanter (3 px i 1920 + 1 % av höjden om
    kanten inte redan är bakad i bilden). Returnerar (skala, x0, y0) för bildens egna koordinater."""
    box = im.getbbox()
    s = h / (box[3] - box[1])
    big = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    r = 3 * W / 1920 + (0 if bakad else 0.01 * h)
    big = vit_kant(big, 2 * max(1, round(r)) + 1)
    if rot:
        big = big.rotate(rot, resample=Image.BICUBIC, center=(big.width / 2, box[3] * s))
    x0, y0 = round(cx - (box[0] + box[2]) / 2 * s), round(ground - box[3] * s)
    lag = Image.new("RGBA", canvas.size)
    lag.paste(big, (x0, y0), big)
    canvas.alpha_composite(lag)
    return s, x0, y0


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


def pil(c, pts, col=INK):
    """Streckad pil som visar rörelsen (som i 007)."""
    def rita(d):
        for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
            n = max(1, int(math.dist((x1, y1), (x2, y2)) / 22))
            for i in range(0, n, 2):
                a, b = i / n, min(1, (i + 1) / n)
                d.line((x1 + (x2 - x1) * a, y1 + (y2 - y1) * a, x1 + (x2 - x1) * b, y1 + (y2 - y1) * b), fill=255, width=7)
        (x1, y1), (x2, y2) = pts[-2], pts[-1]
        ang = math.atan2(y2 - y1, x2 - x1)
        for da in (2.6, -2.6):
            d.line((x2, y2, x2 + 26 * math.cos(ang + da), y2 + 26 * math.sin(ang + da)), fill=255, width=7)
    fyll(c, col, rita, vick=0.2, oskarp=1.2)


def båge(cx, cy, rx, ry, a0, a1, n=12):
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy - ry * math.sin(math.radians(a0 + (a1 - a0) * i / n)))
            for i in range(n + 1)]


def puffar(c, x, y, n=3, r=16, dx=-38):
    """Vita avgaspuffar (tillåtna som pynt; inga fartstreck, se format/regler.md)."""
    fyll(c, VIT, lambda d: [d.ellipse((x + i * dx - r * (1 - i * .15), y - i * 10 - r * (1 - i * .15),
                                       x + i * dx + r * (1 - i * .15), y - i * 10 + r * (1 - i * .15))) for i in range(n)],
         vick=0.15, oskarp=1)


def ringar(c, x, y, r0=22, n=2):
    fyll(c, VIT, lambda d: [d.ellipse((x - r0 - 16 * i, y - r0 - 16 * i, x + r0 + 16 * i, y + r0 + 16 * i), outline=255, width=6)
                            for i in range(n)], vick=0.1, oskarp=0.8)


def prick(c, x, y, r, col):
    fyll(c, col, lambda d: d.ellipse((x - r, y - r * .8, x + r, y + r * .8)), vick=0.15, oskarp=1)



# --- Figurer: kropp, armar ur riggen och ansiktet ur verktyg/ansikten.py --------------------------------------
ANS = runpy.run_path(str(ROT / "verktyg/ansikten.py"))
rita_ansikte = ANS["rita"]
ANS["rita"].__globals__["KRITA"] = KRITA
DJUROGON = [(413, 401), (604, 398)]
FIGUR = {   # mapp, rigg (eller hel bild utan rigg), ansikte; Lages och Kajsas mun uppmätta mot bilderna med ansikte
    "lage": ("lejonet-lage", "lejonet-lage-rigg-lemmar.json", dict(ogon=DJUROGON, mun=(512, 509), munskala=1.2)),
    "kajsa": ("kon-kajsa", "cut/kon-kajsa-faceless.png", dict(ogon=DJUROGON, mun=(509, 539), munskala=0.9)),
    "gurra": ("grodan-gurra", "grodan-gurra-rigg.json", dict(ogon=[(337, 262), (686, 260)], ogonskala=1.45, mun=(512, 392), munskala=1.4, munbredd=2.6)),
    "humle": ("humlan-humle", "humlan-humle-rigg.json", dict(ogon=DJUROGON, mun=(512, 472), munskala=1.2)),
    "pip": ("kycklingen-pip", "kycklingen-pip-rigg.json", dict(ogon=DJUROGON, mun=(-500, -500))),   # näbben är munnen
}
_armar = {}


def armbild(mapp, rig, d):
    if (mapp, d) not in _armar:
        im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
        if not rig.get("ritadeDelar"):   # ledbiten innanför kroppen tas bort, så att en lyft arm syns mot kroppen
            kropp = Image.open(mapp / rig["kropp"]).getchannel("A").filter(ImageFilter.MinFilter(15))
            im.putalpha(ImageChops.subtract(im.getchannel("A"), kropp))
        _armar[mapp, d] = vit_kant(im, 9)
    return _armar[mapp, d]


_PIP_HEL = Image.open(A / "karaktarer/kycklingen-pip/cut/kycklingen-pip.png").convert("RGBA")
_n = _PIP_HEL.crop((462, 400, 562, 486))
_na = np.asarray(_n).astype(int)
NÄBB = _n.copy()
NÄBB.putalpha(Image.fromarray(((_na[..., 0] - _na[..., 2] > 120) & (_na[..., 1] < 165) & (_na[..., 3] > 200)).astype(np.uint8) * 255)
              .filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1)))   # Pips näbb ur bilden, som i 014


def tår(c, x, y):
    fyll(c, (120, 190, 240), lambda d: (d.ellipse((x - 11, y, x + 11, y + 24), fill=255), d.polygon([(x - 9, y + 8), (x, y - 12), (x + 9, y + 8)], fill=255)),
         vick=0.05, oskarp=0.6)


def solhatt(c, x=512, y=190, k=1.0):
    """PLATSHÅLLARE: Kajsas gula solhatt (brett brätte, rund kulle, en liten vit blomma), i hennes 1024-ruta eller fritt."""
    platshållare("solhatt")
    def form(d):
        d.ellipse((x - 200 * k, y - 10 * k, x + 200 * k, y + 50 * k), fill=255)
        d.chord((x - 115 * k, y - 120 * k, x + 115 * k, y + 90 * k), 180, 360, fill=255)
    m, d = ritmask(c)
    form(d)
    vit = Image.new("RGBA", c.size, (255, 255, 255, 0))
    vit.putalpha(m.filter(ImageFilter.MaxFilter(2 * max(1, round(6 * k)) + 1)))
    c.alpha_composite(vit)
    kritfyll(c, m, HATT, vick=0.12, oskarp=1.2)
    fyll(c, CITRON_M, lambda d: d.rectangle((x - 112 * k, y - 8 * k, x + 112 * k, y + 14 * k), fill=255), vick=0.1, oskarp=1)
    for i in range(5):
        a = i * 2 * math.pi / 5
        prick(c, x + 70 * k + 16 * k * math.cos(a), y + 2 * k + 16 * k * math.sin(a), 11 * k, VIT)
    prick(c, x + 70 * k, y + 2 * k, 7 * k, (246, 170, 40))


def figur(namn, mood="glad", blick=(0, 0), lyft_r=0, lyft_l=0, ben=True, lager="allt", tår_=False, hatt=False):
    """En figur i sin 1024-ruta med ansiktet ritat. lyft_* = grader armen lyfts ut från vila. lager: allt | kropp | armar."""
    mappnamn, rigfil, ans = FIGUR[namn]
    mapp = A / "karaktarer" / mappnamn
    c = Image.new("RGBA", (1024, 1024))
    rig = None
    if rigfil.endswith(".png"):
        if lager != "armar":
            c.alpha_composite(Image.open(mapp / rigfil).convert("RGBA"))
    else:
        rig = json.loads((mapp / rigfil).read_text())
        if lager != "armar":
            for d in ("vinge-l", "vinge-r") + (("leg-l", "leg-r") if ben else ()):
                if d in rig["delar"]:
                    c.alpha_composite(Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA"))
            c.alpha_composite(Image.open(mapp / rig["kropp"]).convert("RGBA"))
    if lager != "armar":
        rita_ansikte(c, mood, (blick[0], blick[1]), **ans)
        if namn == "pip":
            c.alpha_composite(NÄBB, (462, 400))
        if tår_:
            tår(c, ans["ogon"][0][0] - 10, ans["ogon"][0][1] + 38)
        if hatt:
            solhatt(c)
    if rig and lager != "kropp":
        for d, v in (("arm-r", lyft_r), ("arm-l", -lyft_l)):
            if d in rig["delar"]:
                c.alpha_composite(armbild(mapp, rig, d).rotate(v, resample=Image.BICUBIC, center=tuple(rig["delar"][d]["vridpunkt"])))
    return c


def sätt(c, im, x, fot, k):
    """En figurbild (1024-rutan) med fötterna (512, 833) på (x, fot), skala k."""
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.alpha_composite(im, (round(x - 512 * k), round(fot - 833 * k)))


def skugga(c, x, y, w):
    fyll(c, (205, 205, 205), lambda d: d.ellipse((x - w / 2, y - w * .08, x + w / 2, y + w * .08), fill=255), alpha=0.7, vick=0.1, oskarp=2)


FIA = bild("fia")
BANAN = bild("banan")
KORG = bild("korg")


def banan(mood="skrattar"):
    """Bananen (006), med ett skrattande ansikte i kod i refrängen och på klistermärkena."""
    im = BANAN.copy()
    if mood:
        rita_ansikte(im, mood, ogon=[(520, 560), (640, 545)], ogonskala=1.0, mun=(585, 625), munskala=0.9)
    return im


# --- Helikoptern (PLATSHÅLLARE i kod) ---------------------------------------------------------------------------
# I sin 1024-ruta: bubblan x 330–900 med en låg öppen sits (kanten y 640) så att Lages armar syns, svansen åt vänster med
# en liten propeller, medarna på y 900 och huvudrotorn på taket (y 322). Helikoptern flyger åt höger och vänds aldrig.
LAGE_X, LAGE_FOT, LAGE_K = 600, 708, 0.55
KANT_Y = 640


def helikopter(mood="glad", lyft_r=0, lyft_l=0, blick=(0, 0), tår_=False, lage=True, svans=False):
    platshållare("helikopter")
    c = Image.new("RGBA", (1024, 1024))
    fyll(c, GRÅ, lambda d: (d.line((440, 830, 420, 900), fill=255, width=14), d.line((790, 830, 810, 900), fill=255, width=14),
                            d.rounded_rectangle((330, 892, 900, 912), 10, fill=255)), vick=0.08, oskarp=1)          # medarna
    fyll(c, CITRON, lambda d: (d.polygon([(360, 600), (60, 560), (60, 610), (360, 700)], fill=255),), vick=0.12, oskarp=1.5)   # svansen
    fyll(c, GRÅ, lambda d: (d.ellipse((20, 520, 100, 600), outline=255, width=12), d.line((60, 520, 60, 600), fill=255, width=10)), vick=0.08, oskarp=1)
    fyll(c, GRÅ, lambda d: (d.line((615, 400, 615, 330), fill=255, width=16), d.rounded_rectangle((300, 312, 930, 332), 10, fill=255),
                            d.ellipse((590, 305, 640, 340), fill=255)), vick=0.08, oskarp=1)                         # rotorn
    fyll(c, CITRON, lambda d: d.ellipse((330, 380, 900, 860), fill=255), alpha=0.55, vick=0.1, oskarp=2)          # bakre halvan
    if lage:
        sätt(c, figur("lage", mood, blick, ben=False, lager="kropp", tår_=tår_), LAGE_X, LAGE_FOT, LAGE_K)
        sätt(c, figur("lage", mood, blick, lyft_r=lyft_r, lyft_l=lyft_l, ben=False, lager="armar"), LAGE_X, LAGE_FOT, LAGE_K)
    fram = Image.new("L", c.size)
    d = ImageDraw.Draw(fram)
    d.ellipse((330, 380, 900, 860), fill=255)
    d.rectangle((0, 0, 1024, KANT_Y), fill=0)
    c.paste(CITRON, mask=fram.filter(ImageFilter.MinFilter(5)))   # täckande grund, så att inget syns igenom kritkornen
    kritfyll(c, fram, CITRON, vick=0.12, oskarp=1.5)
    fyll(c, CITRON_M, lambda d: d.rounded_rectangle((345, KANT_Y - 6, 885, KANT_Y + 16), 10, fill=255), vick=0.1, oskarp=1)   # sitsens kant
    fyll(c, (200, 232, 248), lambda d: d.chord((640, 380, 900, 860), 290, 360, fill=255), alpha=0.45, vick=0.05, oskarp=1)  # vindrutan
    fyll(c, (250, 236, 200), lambda d: d.ellipse((835, 700, 875, 740), fill=255), vick=0.1, oskarp=0.8)          # lyktan
    if svans and lage:
        pts = [(400, 650), (340, 610), (300, 540), (318, 480)]
        fyll(c, LAGE_GUL, lambda d: d.line(pts, fill=255, width=26, joint="curve"), vick=0.1, oskarp=1)
        fyll(c, TOFS, lambda d: d.ellipse((290, 430, 350, 490), fill=255), vick=0.2, oskarp=1.2)
    return c


def lägg_heli(c, cx, botten, h, rot=0, **kw):
    """Helikoptern i bilden, medarna på `botten`, höjd h px (rotorn till medarna). Returnerar (skala, x0, y0)."""
    return place(c, helikopter(**kw), cx, botten, h, rot=rot, bakad=False)


def heli_punkt(t, b):
    s, x0, y0 = b
    return x0 + t[0] * s, y0 + t[1] * s


# --- Solen (PLATSHÅLLARE i kod) ---------------------------------------------------------------------------------
def solbild(mood=None, strålar=True):
    """Solen i en 1024-ruta: rund skiva med mjuka runda kritstrålar (en del av teckningen, inga effektstreck)."""
    c = Image.new("RGBA", (1024, 1024))
    if strålar:
        fyll(c, SOLSTRÅLE, lambda d: [(d.line((512 + 350 * math.cos(a), 512 + 350 * math.sin(a), 512 + 445 * math.cos(a), 512 + 445 * math.sin(a)), fill=255, width=86),
                                        d.ellipse((512 + 445 * math.cos(a) - 43, 512 + 445 * math.sin(a) - 43, 512 + 445 * math.cos(a) + 43, 512 + 445 * math.sin(a) + 43), fill=255))
                                       for a in np.linspace(0, 2 * math.pi, 13)[:-1]], vick=0.15, oskarp=1.5)
    fyll(c, SOLGUL, lambda d: d.ellipse((182, 182, 842, 842), fill=255), vick=0.15, oskarp=2)
    if mood:
        rita_ansikte(c, mood, ogon=[(415, 450), (609, 450)], ogonskala=1.7, mun=(512, 600), munskala=2.2)
        for x in (330, 694):
            fyll(c, (255, 170, 120), lambda d: d.ellipse((x - 50, 560, x + 50, 620), fill=255), alpha=0.6, vick=0.1, oskarp=3)
    return c


def sol(c, cx, cy, r, mood=None, kant=False, **kw):
    if mood is None:
        platshållare("sol")
    im = solbild(mood, **kw).resize((round(2 * r),) * 2, Image.LANCZOS)
    if kant:
        im = vit_kant(im, 2 * round(3 * W / 1920 + 0.01 * 2 * r) + 1)
    c.alpha_composite(im, (round(cx - r), round(cy - r)))


def solarm(c, sol_xy, r, mål, bredd=34):
    """En av solens egna runda strålar som sträcker sig ut som en arm (kittlar, vinkar)."""
    sx, sy = sol_xy
    a = math.atan2(mål[1] - sy, mål[0] - sx)
    start = (sx + 0.7 * r * math.cos(a), sy + 0.7 * r * math.sin(a))
    mitt = ((start[0] + mål[0]) / 2 + 40 * math.sin(a), (start[1] + mål[1]) / 2 - 40 * math.cos(a))
    pts = [start, mitt, mål]
    fyll(c, VIT, lambda d: (d.line(pts, fill=255, width=bredd + 10, joint="curve"), d.ellipse((mål[0] - bredd * .8, mål[1] - bredd * .8, mål[0] + bredd * .8, mål[1] + bredd * .8), fill=255)),
         vick=0.05, oskarp=1)
    fyll(c, SOLSTRÅLE, lambda d: (d.line(pts, fill=255, width=bredd, joint="curve"), d.ellipse((mål[0] - bredd * .65, mål[1] - bredd * .65, mål[0] + bredd * .65, mål[1] + bredd * .65), fill=255)),
         vick=0.12, oskarp=1.2)


def hjärta(c, x, y, r, col=(255, 196, 60)):
    def rita(d):
        d.ellipse((x - r, y - r * .6, x, y + r * .3), fill=255)
        d.ellipse((x, y - r * .6, x + r, y + r * .3), fill=255)
        d.polygon([(x - r * .95, y), (x + r * .95, y), (x, y + r * 1.1)], fill=255)
    m, d = ritmask(c)
    rita(d)
    vit = Image.new("RGBA", c.size, (255, 255, 255, 0))
    vit.putalpha(m.filter(ImageFilter.MaxFilter(5)))
    c.alpha_composite(vit)
    kritfyll(c, m, col, vick=0.1, oskarp=1)


def moln(c, x, y, k=1.0):
    fyll(c, VIT, lambda d: [d.ellipse((x + dx * k - r * k, y + dy * k - r * k, x + dx * k + r * k, y + dy * k + r * k), fill=255)
                            for dx, dy, r in ((-90, 20, 60), (-20, -20, 80), (70, 10, 65), (130, 35, 45), (0, 40, 70))], vick=0.15, oskarp=1.5)


# --- Bakgrunderna ----------------------------------------------------------------------------------------------
def himlen(glöd=0.0):
    """Himlen utan den målade solen i hörnet (solen är ett eget lager som glider fram på sin rad, README: inget annat gult)."""
    c = bild("himlen").convert("RGB").resize((W, H))
    c.paste(c.crop((960, 30, 1120, 210)), (1145, 30))
    c = c.convert("RGBA")
    if glöd:
        fyll(c, GYLLEN, lambda d: d.rectangle((0, 0, W, 130), fill=255), alpha=glöd, vick=0.1, oskarp=30)
    return c


def gyllene_himlen():
    """PLATSHÅLLARE: refrängens fantasihimmel, gyllene med vita moln, ingen mark."""
    platshållare("jattesolen")
    c = Image.new("RGBA", (W, H), (255, 236, 170, 255))
    fyll(c, GYLLEN, lambda d: d.rectangle((0, 0, W, 420), fill=255), alpha=0.8, vick=0.15, oskarp=60)
    for x, y, k in ((180, 560, 0.9), (1180, 620, 1.1), (640, 700, 0.7)):
        moln(c, x, y, k)
    return c


DAMM = (1155, 655)   # dammens mitt i dammen.png; näckrosbladen sitter på (1085, 650) och (1250, 678)
BLADEN = [(1000, 690), (1085, 650), (1250, 678)]


def näckrosblad(c, x, y, rx=44):
    fyll(c, BLAD, lambda d: d.pieslice((x - rx, y - rx * .45, x + rx, y + rx * .45), 300, 250, fill=255), vick=0.12, oskarp=1)
    fyll(c, BLAD_M, lambda d: d.arc((x - rx, y - rx * .45, x + rx, y + rx * .45), 0, 360, fill=255, width=4), vick=0.1, oskarp=0.8)


def dammen(blad3=True):
    c = bild("dammen").convert("RGB").resize((W, H)).convert("RGBA")
    if blad3:   # ett tredje blad i kod, så att Gurra kan hoppa blad till blad
        näckrosblad(c, *BLADEN[0], rx=38)
    return c


def disco():
    """006:s discoplåt omfärgad till ljusgult, med en gul kula."""
    hsv = np.asarray(bild("disco").convert("RGB").convert("HSV")).copy()
    hsv[..., 0] = 34
    c = Image.frombytes("HSV", (hsv.shape[1], hsv.shape[0]), hsv.tobytes()).convert("RGB").resize((W, H)).convert("RGBA")
    fyll(c, (90, 90, 90), lambda d: d.line((W / 2, 0, W / 2, 70), fill=255, width=4))
    fyll(c, SOLGUL, lambda d: d.ellipse((W / 2 - 52, 66, W / 2 + 52, 170), fill=255), vick=0.1, oskarp=1)
    for i in range(6):
        prick(c, W / 2 - 30 + (i % 3) * 30, 92 + (i // 3) * 34, 6, (255, 246, 210))
    return c


def papper():
    return Image.new("RGBA", (W, H), PAPER + (255,))


# --- Scenerna ---------------------------------------------------------------------------------------------------
HX, HY, HH = 470, 640, 360     # flygscenen: helikoptern på vänstra tredjedelen, 47 % av bildhöjden
UPP, VINKA, FRAM, UT = 150, 120, 75, 95   # armlyft i grader


def flyg(glöd=0.0, pella=False, **kw):
    c = himlen(glöd)
    if pella:
        place(c, bild("pella"), 1100, 170, 50)
        pil(c, [(1150, 140), (1270, 130)])
    b = lägg_heli(c, HX, HY, HH, **kw)
    return c, b


def närbild(c, b, dx=0, w=470):
    s, x0, y0 = b
    return crop_zoom(c, x0 + (LAGE_X + dx) * s, y0 + 520 * s, w)


def klistermärke(c, x, y, r, sak, mood="skrattar"):
    fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.05, oskarp=1)
    if sak == "banan":
        place(c, banan(mood), x, y + r * .6, r * 1.15)
    elif sak == "sol":
        sol(c, x, y, r * .82, mood)
    elif sak == "hatt":
        m = Image.new("RGBA", (1024, 1024))
        solhatt(m, 512, 560, 2.0)
        place(c, m, x, y + r * .45, r * .95)
    elif sak == "heli":
        place(c, helikopter(lage=False), x, y + r * .62, r * 1.2)
    else:
        place(c, figur(sak, mood), x, y + r * .7, r * 1.35)


def titelkort():
    c = Image.new("RGBA", (W, H), CITRONLJUS + (255,))
    d = ImageDraw.Draw(c)
    f = font(84)
    for i, (t, y) in enumerate((("Avsnitt 11", 220), ("Gula sången", 350))):
        d.text((W / 2, y), t, font=f, fill=(214, 150, 10) if i else INK, anchor="mm", stroke_width=6, stroke_fill=VIT)
    lägg_heli(c, W / 2, 680, 230, lage=False)
    return c


def kritan(c, x, y):
    """Kritan (utan ansikte) som ritar: ett gult kritstift snett uppåt höger."""
    a = math.radians(-35)
    ux, uy = math.cos(a), math.sin(a)
    pts = [(x, y), (x + 40 * ux - 14 * uy, y + 40 * uy + 14 * ux), (x + 200 * ux - 22 * uy, y + 200 * uy + 22 * ux),
           (x + 200 * ux + 22 * uy, y + 200 * uy - 22 * ux), (x + 40 * ux + 14 * uy, y + 40 * uy - 14 * ux)]
    fyll(c, SOLGUL, lambda d: d.polygon(pts, fill=255), vick=0.08, oskarp=1)
    fyll(c, VIT, lambda d: d.line((x + 90 * ux - 22 * uy, y + 90 * uy + 22 * ux, x + 90 * ux + 22 * uy, y + 90 * uy - 22 * ux), fill=255, width=10))


def ritad_heli(c, steg):
    """Kritan ritar helikoptern på papperet: 1 bubblan och svansen, 2 medarna, 3 rotorn."""
    fyll(c, CITRON, lambda d: (d.ellipse((520, 250, 900, 560), fill=255), d.polygon([(540, 420), (300, 380), (300, 420), (540, 500)], fill=255)),
         vick=0.25, oskarp=2.5)
    fyll(c, INK, lambda d: d.ellipse((270, 360, 330, 420), outline=255, width=8), vick=0.2, oskarp=1)
    if steg >= 2:
        fyll(c, INK, lambda d: (d.line((600, 540, 590, 600), fill=255, width=10), d.line((820, 540, 830, 600), fill=255, width=10),
                                d.line((520, 600, 900, 600), fill=255, width=12)), vick=0.2, oskarp=1.2)
    if steg >= 3:
        fyll(c, INK, lambda d: (d.line((710, 250, 710, 200), fill=255, width=10), d.line((480, 195, 940, 195), fill=255, width=12)), vick=0.2, oskarp=1.2)
    return c


# Bild för bild (id → funktion). Humörena står i storyboard.md (kolumnen Ansikten); här väljs radens tydligaste.
def B():
    f = {}
    f["01"] = titelkort

    def p(steg, krita_xy):
        def g():
            c = ritad_heli(papper(), steg)
            kritan(c, *krita_xy)
            return c
        return g
    f["02"] = p(1, (300, 330))
    f["02b"] = p(2, (900, 560))

    def g02c():
        c = papper()
        b = lägg_heli(c, W / 2, 640, 420, mood="skrattar", lyft_r=UPP, lyft_l=UPP)
        ringar(c, *heli_punkt((300, 322), b))
        ringar(c, *heli_punkt((930, 322), b))
        pil(c, [(1060, 600), (1080, 450), (1100, 330)])
        return c
    f["02c"] = g02c

    # Vers 1 på himlen
    f["03"] = lambda: flyg(pella=True, mood="njuter", blick=(0.5, 0))[0]

    def g03a():
        c, b = flyg(mood="skrattar")
        return närbild(c, b)
    f["03a"] = g03a

    def g03b():
        c, b = flyg(mood="skrattar", lyft_r=FRAM)
        klistermärke(c, 900, 320, 78, "banan")
        klistermärke(c, 1110, 380, 78, "pip")
        return c
    f["03b"] = g03b

    def g03c():
        c, b = flyg(mood="nyfiken", blick=(1, 0), lyft_r=130)
        return närbild(c, b)
    f["03c"] = g03c

    # Refrängen (04–04h, refrang-plan.md): himlen → den skrattande solen → hem med kritsvep
    def g04():
        c, b = flyg(mood="ropar", lyft_r=UT, lyft_l=UT)
        for i, (x, y) in enumerate(((820, 300), (930, 230), (1050, 210), (1170, 240))):
            sol(c, x, y, 34, kant=True)
        return c
    f["04"] = g04

    def g04a():
        c, b = flyg(glöd=1.0, mood="skrattar")
        ringar(c, *heli_punkt((930, 322), b))
        pil(c, [(760, 520), (980, 520)])
        return c
    f["04a"] = g04a

    def solvärld(sol_xy=(980, 150), sol_r=250, sol_mood="skrattar", h_xy=(430, 700), hh=320, **kw):
        c = gyllene_himlen()
        sol(c, *sol_xy, sol_r, sol_mood)
        b = lägg_heli(c, *h_xy, hh, **kw)
        return c, b

    def g04b():
        c, b = solvärld(sol_xy=(980, 60), mood="forvanad", blick=(0.6, -1))
        pil(c, [(250, 660), (250, 520), (250, 400)])
        pil(c, [(980, -20), (980, 30)])
        return c
    f["04b"] = g04b

    def g04c():
        c, b = solvärld(sol_xy=(1020, 260), sol_r=200, sol_mood="blinkar", h_xy=(480, 740), hh=380, mood="skrattar")
        mage = heli_punkt((LAGE_X, 600), b)
        solarm(c, (1020, 260), 200, (mage[0] + 40, mage[1] - 10))
        solarm(c, (1020, 260), 200, (mage[0] + 110, mage[1] - 70))
        return crop_zoom(c, 760, 430, 900)
    f["04c"] = g04c

    def g04d():
        c, b = solvärld(sol_xy=(1000, 170), h_xy=(520, 680), hh=380, mood="skrattar", lyft_r=FRAM, lyft_l=FRAM, rot=-4)
        pil(c, [(250, 620), (250, 540)])
        pil(c, [(300, 540), (300, 620)])
        return c
    f["04d"] = g04d
    f["04e"] = lambda: solvärld(sol_xy=(W / 2 + 150, 230), sol_r=230, sol_mood="blinkar", h_xy=(330, 740), hh=300, mood="blinkar")[0]

    def g04f():
        c, b = solvärld(sol_xy=(1110, 140), sol_r=200, h_xy=(560, 720), hh=360, mood="ropar", lyft_r=UPP, lyft_l=UPP)
        for (x, y), sak in zip(((880, 470), (1060, 400), (1230, 470)), ("banan", "humle", "pip")):
            klistermärke(c, x, y, 72, sak)
        for x, y in ((760, 280), (820, 200), (700, 160)):
            hjärta(c, x, y, 22)
        return crop_zoom(c, 820, 420, 1150)
    f["04f"] = g04f

    def g04g():
        c, b = solvärld(sol_xy=(1060, 140), sol_r=230, sol_mood="karleksfull", h_xy=(470, 730), hh=380, mood="karleksfull", lyft_r=VINKA)
        solarm(c, (1060, 140), 230, (1180, 430))
        return crop_zoom(c, 760, 380, 1000)
    f["04g"] = g04g

    def g04h():
        c, b = solvärld(sol_xy=(1050, 120), sol_r=200, mood="nyfiken", blick=(-1, 0), lyft_r=130)
        fyll(c, HIMMELSBLÅ, lambda d: d.polygon([(W, 0), (W, H), (W - 300, H), (W - 140, 0)], fill=255), alpha=0.95, vick=0.3, oskarp=4)
        pil(c, [(1000, 400), (880, 400)])
        return c
    f["04h"] = g04h

    # Gul sak 1–2 och frågan på himlen
    def g05():
        c = himlen()
        sol(c, 1040, 170, 95)
        moln(c, 1120, 210, 1.1)
        lägg_heli(c, HX, HY, HH, mood="forvanad", blick=(1, -0.6))
        pil(c, [(1180, 120), (1060, 120)])
        return c
    f["05"] = g05

    def g05b():
        c, b = flyg(mood="njuter", lyft_r=FRAM)
        sol(c, 1120, 120, 95)
        return närbild(c, b, dx=120, w=620)
    f["05b"] = g05b

    def g05c():
        c = himlen()
        sätt(c, figur("humle", "blinkar", blick=(-1, 0)), 985, 320, 0.22)
        moln(c, 1150, 310, 1.2)
        lägg_heli(c, HX, HY, HH, mood="forvanad", blick=(1, -0.4))
        return c
    f["05c"] = g05c

    def g05d():
        c, b = flyg(mood="skrattar", lyft_r=VINKA)
        sätt(c, figur("humle", "skrattar", lyft_l=VINKA), 900, 330, 0.22)
        pil(c, [(1150, 200), (1040, 140), (930, 120)])
        return c
    f["05d"] = g05d

    def g06(mood, blick=(0, 0), svans=False, **kw):
        def g():
            c, b = flyg(mood=mood, blick=blick, svans=svans, **kw)
            return närbild(c, b, dx=-60, w=560)
        return g
    f["06"] = g06("nyfiken", lyft_r=FRAM)
    f["06b"] = g06("skelogd", blick=(-0.6, 0.6), svans=True)
    f["06c"] = g06("skrattar", svans=True, lyft_l=FRAM)

    def g06d():
        c, b = flyg(mood="blinkar", svans=True)
        p = heli_punkt((318, 470), b)
        pil(c, [(p[0] - 30, p[1] - 40), (p[0] + 30, p[1] - 70)])
        pil(c, [(p[0] + 30, p[1] - 20), (p[0] - 30, p[1] + 10)])
        return c
    f["06d"] = g06d

    # Dammen (08–10e)
    KX, KMARK, KH = 840, 700, 250     # Kajsa vid dammen
    LX, LMARK = 420, 700               # helikoptern landar i gräset till vänster

    def kajsa(c, mood, blick=(0, 0), hatt=True, tår_=False, x=KX, h=KH, mark=KMARK, korg=True):
        if korg:
            place(c, KORG, x - 150, mark + 4, 80)
            for dx in (-170, -140):
                place(c, BANAN, x + dx, mark - 50, 40, rot=20)
        place(c, figur("kajsa", mood, blick, tår_=tår_, hatt=hatt), x, mark, h)

    def g08():
        c = dammen()
        sätt(c, FIA, 300, 250, 0.12)
        pil(c, [(380, 210), (500, 190)])
        lägg_heli(c, 1020, 330, 230, mood="nyfiken", blick=(-0.5, 1))
        pil(c, [(1150, 140), (1150, 260)])
        kajsa(c, "nyfiken", blick=(0.8, -1))
        return c
    f["08"] = g08

    def g08b():
        c = dammen()
        kajsa(c, "skrattar", blick=(-0.3, -0.8))
        return crop_zoom(c, KX, 560, 520)
    f["08b"] = g08b

    def g08c():
        c = dammen()
        b = lägg_heli(c, LX, 640, 330, mood="skrattar", lyft_r=FRAM)
        kajsa(c, "karleksfull", blick=(-1, 0))
        return crop_zoom(c, 640, 480, 1000)
    f["08c"] = g08c

    def g09():
        c = dammen()
        b = lägg_heli(c, LX, 660, 330, mood="forvanad", blick=(1, 0))
        for x in (560, 680):
            ringar(c, x, 660)
        kajsa(c, "forvanad", blick=(0, -1), hatt=False)
        m = Image.new("RGBA", (1024, 1024))
        solhatt(m, 512, 512, 2.0)
        place(c, m, KX + 30, 400, 90, rot=-15)
        pil(c, [(KX - 60, 440), (KX + 60, 360), (KX + 180, 330)])
        return crop_zoom(c, 650, 470, 1000)
    f["09"] = g09

    def g09b():
        c = dammen()
        lägg_heli(c, LX, 700, 330, mood="skelogd")
        kajsa(c, "forvanad", blick=(1, -0.5), hatt=False)
        m = Image.new("RGBA", (1024, 1024))
        solhatt(m, 512, 512, 2.0)
        place(c, m, 1050, 430, 80, rot=10)
        pil(c, [(900, 330), (1050, 360), (1150, 560)])
        return c
    f["09b"] = g09b

    def g09c():
        c = dammen()
        m = Image.new("RGBA", (1024, 1024))
        solhatt(m, 512, 512, 2.0)
        place(c, m, BLADEN[2][0], BLADEN[2][1] + 6, 50)
        ringar(c, BLADEN[2][0], BLADEN[2][1] + 4, r0=50)
        return crop_zoom(c, *DAMM, 460)
    f["09c"] = g09c

    def g09d():
        c = dammen()
        kajsa(c, "ledsen", blick=(0.6, 0.5), hatt=False, tår_=True, korg=False)
        return crop_zoom(c, KX, 560, 480)
    f["09d"] = g09d

    def g09e():
        c = dammen()
        b = lägg_heli(c, LX, 700, 360, mood="forvanad", lyft_r=FRAM)
        return närbild(c, b)
    f["09e"] = g09e

    def hatt_på_bladet(c, i=2):
        m = Image.new("RGBA", (1024, 1024))
        solhatt(m, 512, 512, 2.0)
        place(c, m, BLADEN[i][0], BLADEN[i][1] + 6, 50)

    def g09f():
        c = dammen()
        hatt_på_bladet(c)
        lägg_heli(c, LX, 700, 330, mood="nyfiken", blick=(1, 0))
        kajsa(c, "nyfiken", blick=(1, 0.3), hatt=False)
        g = figur("gurra", "blinkar").crop((0, 0, 1024, 520))
        place(c, g, 1010, 640, 40)
        return c
    f["09f"] = g09f

    def gurra_på(c, i, mood, hopp=0, **kw):
        x, y = BLADEN[i]
        place(c, figur("gurra", mood, **kw), x, y - hopp, 70)

    def g10():
        c = dammen()
        hatt_på_bladet(c)
        gurra_på(c, 0, "ropar", lyft_r=UPP, lyft_l=UPP)
        kajsa(c, "forvanad", blick=(1, 0.4), hatt=False, korg=False)
        return crop_zoom(c, 1030, 600, 600)
    f["10"] = g10

    def g10b():
        c = dammen()
        hatt_på_bladet(c)
        gurra_på(c, 1, "skrattar", hopp=40)
        pil(c, [(1000, 715), (1085, 690), (1170, 715)])
        return crop_zoom(c, *DAMM, 460)
    f["10b"] = g10b

    def g10c():
        c = dammen()
        lägg_heli(c, LX, 700, 300, mood="karleksfull")
        place(c, figur("gurra", "skelogd"), 975, 700, 80)
        kajsa(c, "karleksfull", blick=(0.6, 0.3), hatt=True)
        pil(c, [(1200, 690), (1060, 690)])
        return crop_zoom(c, 760, 520, 1050)
    f["10c"] = g10c

    def stå(c, mood, x, mark, h, **kw):
        skugga(c, x, mark, h * 0.6)
        place(c, figur("lage", mood, **kw), x, mark, h)

    def g10d():
        c = dammen()
        lägg_heli(c, 250, 690, 260, lage=False)
        stå(c, "slickar", 560, 705, 250, lyft_r=FRAM)
        place(c, BANAN.crop((0, 300, 1024, 1024)), 640, 600, 30, rot=-20)
        kajsa(c, "karleksfull", x=820, korg=True)
        place(c, BANAN.crop((0, 400, 1024, 1024)), 760, 600, 28)
        place(c, figur("gurra", "njuter"), 1000, 705, 100)
        place(c, BANAN.crop((0, 400, 1024, 1024)), 1010, 640, 24, rot=15)
        return crop_zoom(c, 720, 520, 1000)
    f["10d"] = g10d

    def g10e():
        c = dammen()
        sol(c, 1150, 110, 80)
        lägg_heli(c, 180, 690, 230, lage=False)
        for namn, x, h in (("lage", 480, 250), ("kajsa", 740, 250), ("gurra", 960, 120)):
            skugga(c, x, 705, h * 0.45)
            place(c, figur(namn, "ropar", hatt=namn == "kajsa", lyft_r=UPP, lyft_l=UPP), x, 650, h)
        pil(c, [(300, 640), (300, 560)])
        return c
    f["10e"] = g10e

    # Discot (11–13)
    def dans(c, aktiv=None, mood_alla="skrattar", lyft=(0, 0)):
        rad = [("kajsa", 300, 640, 0.36), ("lage", 560, 650, 0.40), ("gurra", 820, 640, 0.26), ("pip", 1060, 640, 0.30)]
        for namn, x, fot, k in rad:
            m = ("skelogd" if namn == "gurra" else "ropar") if namn == aktiv else mood_alla
            hopp = 50 if namn == aktiv and namn in ("gurra", "pip") else 0
            l = lyft if namn in ("lage", aktiv) else (0, 0)
            sätt(c, figur(namn, m, lyft_r=l[0], lyft_l=l[1], hatt=namn == "kajsa"), x, fot - hopp, k)
        hm = "ropar" if aktiv == "humle" else mood_alla
        sätt(c, figur("humle", hm), 820 if aktiv != "humle" else 690, 330 if aktiv != "humle" else 300, 0.2)
        return c

    f["11"] = lambda: dans(disco(), lyft=(UPP, UPP))

    def g11b():
        c = dans(disco(), "humle")
        pil(c, [(600, 240), (690, 200), (790, 240)])
        return c
    f["11b"] = g11b

    def g11c():
        c = dans(disco(), "gurra")
        pil(c, [(820, 680), (820, 610)])
        return c
    f["11c"] = g11c
    f["11d"] = lambda: dans(disco(), "pip")

    def g12():
        c = disco()
        for (x, y), sak in zip(((480, 280), (W / 2, 250), (896, 280)), ("sol", "humle", "hatt")):
            klistermärke(c, x, y, 70, sak)
        return c
    f["12"] = g12
    f["12b"] = lambda: dans(disco(), mood_alla="ropar", lyft=(UT, UT))

    def g12c():
        c = disco()
        lägg_heli(c, W / 2, 700, 340, mood="skrattar")
        for (x, y), sak in zip(((420, 200), (560, 170), (816, 170), (956, 200)), ("sol", "humle", "hatt", "heli")):
            klistermärke(c, x, y, 44, sak)
        return c
    f["12c"] = g12c

    def g12d():
        c = disco()
        lägg_heli(c, W / 2, 700, 340, mood="blinkar", lyft_r=VINKA)
        for (x, y), sak in zip(((420, 200), (560, 170), (816, 170), (956, 200)), ("sol", "humle", "hatt", "heli")):
            klistermärke(c, x, y, 44, sak)
        pil(c, [(250, 640), (420, 640)])
        return c
    f["12d"] = g12d

    def g13():
        c = disco()
        s, x0, y0 = lägg_heli(c, W / 2, 700, 340, mood="karleksfull")
        cx, cy = x0 + LAGE_X * s, y0 + 520 * s
        m = Image.new("L", (W, H), 255)
        pts = [(cx + (200 + 10 * math.sin(a * 9)) * math.cos(a), cy + (200 + 10 * math.sin(a * 9)) * math.sin(a)) for a in np.linspace(0, 2 * math.pi, 120)]
        ImageDraw.Draw(m).polygon(pts, fill=0)
        c.paste((10, 10, 10), mask=m.filter(ImageFilter.GaussianBlur(2)))
        ImageDraw.Draw(c).line(pts + [pts[0]], fill=(250, 244, 230), width=6)
        return c
    f["13"] = g13
    return f


# --- Tabellen ur storyboard.md -----------------------------------------------------------------------------------
def tabell():
    rader, t = [], 0.0
    for rad in (HÄR.parent / "storyboard.md").read_text(encoding="utf-8").splitlines():
        if not rad.startswith("| ") or rad.startswith("| #"):
            continue
        k = [x.strip() for x in rad.strip("|").split("|")]
        if len(k) == 5:
            r = dict(zip(("id", "plats", "bild", "ansikten", "sjungs"), k))
            r["tid"] = f"≈{int(t // 60)}:{int(t % 60):02d}"
            t += TID.get(r["id"], 2.5)
            rader.append(r)
    return rader, t


def md(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    return re.sub(r"\*(.+?)\*", r"<i>\1</i>", t)


def sida(rader, bilder, längd):
    scen = None
    delar = []
    for r in rader:
        grupp = ("Intro och kritan" if r["id"].startswith(("01", "02")) else
                 "Refrängen: solresan" if r["id"].startswith(("04", "07")) else
                 "Himlen" if r["id"][:2] in ("03", "05", "06") else
                 "Dammen" if r["id"][:2] in ("08", "09", "10") else "Discot och slutet")
        if grupp != scen:
            if scen:
                delar.append("</div>")
            delar.append(f"<h3>{grupp}</h3><div class='frames'>")
            scen = grupp
        img = (f"<img src='frames/{r['id']}.jpg' alt='{html.escape(r['bild'])}' width='960' height='536' loading='lazy'>" if r["id"] in bilder
               else "<div class='ingen'>Samma bilder som 04–04h</div>")
        delar.append(f"<figure class='frame'>{img}<figcaption><div class='t'>{r['id']} · {r['tid']} · {md(r['plats'])}</div>"
                     f"<div class='song'>{md(r['sjungs'])}</div><p>{md(r['bild'])}</p><p class='ans'>{md(r['ansikten'])}</p></figcaption></figure>")
    delar.append("</div>")
    ph = "".join(f"<li><code>{html.escape(p)}</code></li>" for p in PLATSHÅLLARE)
    return f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gula sången: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --gul:#B07D00;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --gul:#f5c842; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --gul:#f5c842; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 var(--body) }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1,h3 {{ font-family:var(--display); margin:0; line-height:1.1 }}
h1 {{ font-size:clamp(34px,6vw,56px); font-weight:800 }} h1 span {{ color:var(--gul) }}
h3 {{ font-size:22px; margin:36px 0 12px }}
.lede {{ color:var(--muted); max-width:70ch; margin:10px 0 0 }}
.frames {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px }}
.frame {{ margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }}
.frame img {{ width:100%; height:auto; display:block }}
.ingen {{ aspect-ratio:1376/768; display:grid; place-items:center; color:var(--muted); background:var(--chip); font:500 13px var(--mono) }}
figcaption {{ padding:12px 14px 14px; display:grid; gap:6px; font-size:14px }} figcaption p {{ margin:0 }}
.t {{ font:500 12px var(--mono); color:var(--muted) }}
.song {{ border-left:3px solid var(--gul); padding-left:10px; font-style:italic }}
.ans {{ color:var(--muted); font-size:13px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
.utkast {{ display:inline-block; margin-top:14px; font:500 12px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:3px 10px }}
</style></head><body><div class="wrap">
<h1>Gula sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 011, första utkast. En stillbild per rad i <code>storyboard.md</code>, byggd av utklippen i <code>assets/</code> med ansiktena ritade i kod (<code>verktyg/ansikten.py</code>) och vita kanter enligt <code>vita-kanter</code>. Pilarna visar rörelsen. Varje bild visar radens tydligaste uttryck; alla uttryck står under bilden.</p>
<span class="utkast">Ingen Suno-tagning än: alla tider är uppskattade (≈), avsnittet ca {int(längd // 60)}:{int(längd % 60):02d}. {len(bilder)} bilder.</span>
{''.join(delar)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Platshållare i kod</b> tills bilderna finns (byts i <code>bygg.py</code>):<ul>{ph}</ul></li>
<li><b>Refrängen</b> följer <code>refrang-plan.md</code>: små gula solar som klistermärken på "Gul, gul!", himlen glöder, helikoptern stiger till den skrattande solen, solens egna runda strålar kittlar Lage, och bananen, Humle och Pip skrattar på kroken. Inga effektstreck (<code>format/regler.md</code>).</li>
<li><b>Himlen</b>: den målade solen i plattans hörn är bortmålad i kod, så att solen bara syns på sin rad (05).</li>
<li><b>Dammen</b>: ett tredje näckrosblad i kod, så att Gurra kan hoppa blad till blad. Dammen är liten i plattan, så bilderna där är förstorade utsnitt och lite mjukare.</li>
<li><b>Lage</b> sitter i helikoptern med armarna över den låga kanten. Svansen med tofsen ritas i kod (06b–06d). I 10d–10e står han på marken.</li>
<li><b>Kajsa</b> har ingen rigg och inga armar än, så hon visar uttrycken med ansiktet. Solhatten och korgen med bananer står bredvid henne.</li>
<li><b>Discot</b> är 006:s discoplåt omfärgad till ljusgult med en gul kula i kod.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""


if __name__ == "__main__":
    (HÄR / "frames").mkdir(exist_ok=True)
    rader, längd = tabell()
    VALDA = [a for a in sys.argv[1:] if not a.startswith("--")]   # bara de här bilderna byggs om
    f = B()
    gjorda = set()
    for r in rader:
        if r["id"] in f and (not VALDA or r["id"] in VALDA):
            im = f[r["id"]]()
            papperskorn(im).convert("RGB").resize((960, 536), Image.LANCZOS).save(HÄR / "frames" / f"{r['id']}.jpg", quality=86)
        if r["id"] in f:
            gjorda.add(r["id"])
    saknas = [r["id"] for r in rader if r["id"] not in f]
    (HÄR / "index.html").write_text(sida(rader, gjorda, längd), encoding="utf-8")
    print(f"{len(gjorda)} bilder, utan egen bild: {saknas}, platshållare: {PLATSHÅLLARE}")
