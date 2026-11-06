"""Bygger bildstoryboarden för avsnitt 013 (Röda sången) av utklippen och bakgrunderna, som 007:s bygg.py men kortare.
Bilderna följer tabellen i ../storyboard.md (en stillbild per rad) och refrängen i ../refrang-plan.md.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter. Ändrar inte storyboard.md.

Ansiktena ritas i kod med humören i verktyg/ansikten.py. Vita kanter enligt skillen vita-kanter: 3 px + 1 % av sakens höjd i bild
(räknat i en 1920-bild, här 1376 bred). Det som saknas i assets/ (brandbilen, röda ballongen, äppelbacken med rutschkanan) ritas
som enkla platshållare i kod och listas i index.html. När bilderna finns: lägg in dem i ASSET och byt platshållarfunktionen.
Allt ritat i kod får kritstruktur och ett svagt papperskorn; `--platt` stänger av det.
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
RÖD = (226, 59, 46)          # #E23B2E, brandbilen (samma röda som Nicke)
RÖD_M = (176, 36, 30)        # mörkare rött: hjälmen, brandbilens rand
HIMMEL = (168, 220, 242)     # #A8DCF2
GRÄS = (126, 196, 92)
GRÄS_M = (98, 168, 72)
GLÖD = (255, 196, 190)       # himlen glöder ljusröd på kroken
BLÅ = (70, 140, 230)         # blåljuset
GUL = (246, 194, 28)
PLATSHÅLLARE = []

ASSET = {
    "vägen": "bakgrunder/vagen/vagen.png",
    "äppelträdet": "bakgrunder/appeltradet/appeltradet.png",
    "äpple": "rekvisita/applet-rott/cut/applet-rott-v1.png",
    "gosekanin": "rekvisita/gosekanin/cut/gosekanin-v4.png",
    "pella": "karaktarer/flygplanet-pella/flygplanet-pella-faceless.png",
    "disco": "../avsnitt/006-orange-baten/scener/lager/disco-prickar.png",
}
SAKNAS = {   # platshållare i kod tills Sanna har levererat bilderna
    "brandbil": "rekvisita/brandbil-rod (röda brandbilen: kaross, kant, stege, blåljus, hjul)",
    "ballong": "rekvisita/ballong-rod (röda ballongen på ett snöre)",
    "äppelbacken": "bakgrunder/appelbacken (äppelbacken med den röda rutschkanan)",
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
FIGUR = {   # mapp, rigg (eller hel bild utan rigg), ansikte; mått ur kit.js (006, 014) och uppmätta mot bilderna med ansikte
    "lova": ("leoparden-lova", "leoparden-lova-rigg-lemmar.json", dict(ogon=DJUROGON, mun=(512, 497), munskala=1.2)),
    "nicke": ("nyckelpigan-nicke", "cut/nyckelpigan-nicke-faceless.png", dict(ogon=DJUROGON, mun=(512, 482), munskala=1.1)),
    "bettan": ("bussen-bettan", "cut/bussen-bettan-faceless.png", dict(ogon=[(851, 614), (931, 607)], ogonskala=0.8, mun=(891, 661), munskala=0.75)),
    "hulda": ("hasten-hulda", "hasten-hulda-rigg.json", dict(ogon=DJUROGON, mun=(512, 548), munskala=1.2)),
    "hugo": ("hunden-hugo", "hunden-hugo-rigg.json", dict(ogon=DJUROGON, mun=(512, 482))),
    "kanel": ("kaninen-kanel", "kanel-rigg.json", dict(ogon=[(412, 396), (605, 401)], mun=(510, 458), munskala=1.1)),
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


def hjälm(c):
    """Lovas röda hjälm i kod (bara kostym): en rund kulle mellan öronen, ett brätte och ett litet gult märke."""
    m = fyll(c, RÖD, lambda d: (d.chord((372, 160, 652, 330), 180, 360, fill=255), d.rounded_rectangle((350, 236, 674, 262), 12, fill=255)),
             vick=0.12, oskarp=1.2)
    vit = Image.new("RGBA", c.size, (255, 255, 255, 0))
    vit.putalpha(m.filter(ImageFilter.MaxFilter(11)))
    c.alpha_composite(vit, (0, 0))
    fyll(c, RÖD, lambda d: (d.chord((372, 160, 652, 330), 180, 360, fill=255), d.rounded_rectangle((350, 236, 674, 262), 12, fill=255)),
         vick=0.12, oskarp=1.2)
    fyll(c, RÖD_M, lambda d: d.rounded_rectangle((350, 236, 674, 262), 12, fill=255), vick=0.1, oskarp=1)
    fyll(c, GUL, lambda d: d.regular_polygon((512, 205, 22), 5, fill=255), vick=0.1, oskarp=0.8)


def tår(c, x, y):
    fyll(c, (120, 190, 240), lambda d: (d.ellipse((x - 11, y, x + 11, y + 24), fill=255), d.polygon([(x - 9, y + 8), (x, y - 12), (x + 9, y + 8)], fill=255)),
         vick=0.05, oskarp=0.6)


def figur(namn, mood="glad", blick=(0, 0), lyft_r=0, lyft_l=0, ben=True, lager="allt", tår_=False):
    """En figur i sin 1024-ruta med ansiktet ritat. lyft_* = grader armen lyfts ut från vila. lager: allt | kropp | armar."""
    mappnamn, rigfil, ans = FIGUR[namn]
    mapp = A / "karaktarer" / mappnamn
    c = Image.new("RGBA", (1024, 1024))
    if rigfil.endswith(".png"):
        c.alpha_composite(Image.open(mapp / rigfil).convert("RGBA"))
        rig = None
    else:
        rig = json.loads((mapp / rigfil).read_text())
        if lager != "armar":
            if ben:
                for d in ("leg-l", "leg-r"):
                    c.alpha_composite(Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA"))
            c.alpha_composite(Image.open(mapp / rig["kropp"]).convert("RGBA"))
    if lager != "armar":
        rita_ansikte(c, mood, (blick[0], blick[1]), **ans)
        if tår_:
            tår(c, ans["ogon"][0][0] - 10, ans["ogon"][0][1] + 38)
        if namn == "lova":
            hjälm(c)
    if rig and lager != "kropp":
        for d, v in (("arm-r", lyft_r), ("arm-l", -lyft_l)):
            c.alpha_composite(armbild(mapp, rig, d).rotate(v, resample=Image.BICUBIC, center=tuple(rig["delar"][d]["vridpunkt"])))
    return c


def nicke(mood="glad", flyger=False, blick=(0, 0)):
    """Nicke, med två ljusa genomskinliga vingar bakom kroppen när han flyger."""
    c = Image.new("RGBA", (1024, 1024))
    if flyger:
        fyll(c, (235, 242, 250), lambda d: (d.ellipse((150, 230, 470, 470), fill=255), d.ellipse((554, 230, 874, 470), fill=255)), alpha=0.85, vick=0.1, oskarp=1)
    c.alpha_composite(figur("nicke", mood, blick))
    return c


def gosekanin():
    """Gosekaninen (v4) med ansiktet i kod, som i 007."""
    im = bild("gosekanin")
    k = 4 * (im.width - 255) / 2
    im = im.resize((im.width * 4, im.height * 4), Image.LANCZOS)
    rita_ansikte(im, "glad", ogon=[(440 + k, 750 + k), (620 + k, 750 + k)], ogonskala=1.3, mun=(530 + k, 850 + k), munskala=0.7, nos=(530 + k, 805 + k))
    return im


KANIN = gosekanin()
ÄPPLE = bild("äpple")


def sätt(c, im, x, fot, k):
    """En figurbild (1024-rutan) med fötterna (512, 833) på (x, fot), skala k."""
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.alpha_composite(im, (round(x - 512 * k), round(fot - 833 * k)))


# --- Brandbilen (PLATSHÅLLARE i kod) ----------------------------------------------------------------------------
# I sin 1024-ruta: bakre lådan x 120–470, öppet säte i mitten med en låg kant framför Lova, motorhuven fram (höger), hjulen
# står på y 885. Stegen ritas på bilden efteråt (stege()), så att den kan fällas upp mot trädet. Gosekaninen sitter bak på lådan.
STEGE_PIV = (160, 420)     # stegens vridpunkt i rutan (bakre lådans överkant)
BLÅLJUS = (420, 395)
LOVA_FOT, LOVA_X, LOVA_K = 790, 600, 0.47


def brandbil(mood="glad", lyft_r=0, lyft_l=0, blick=(0, 0), tår_=False, lova=True, nicke_på=None):
    platshållare("brandbil")
    c = Image.new("RGBA", (1024, 1024))
    kropp = (lambda d: (d.rounded_rectangle((110, 430, 480, 820), 60, fill=255), d.rounded_rectangle((110, 650, 930, 820), 70, fill=255),
                        d.rounded_rectangle((720, 560, 930, 800), 80, fill=255)))
    k = 150 / KANIN.height
    kan = KANIN.resize((round(KANIN.width * k), 150), Image.LANCZOS)
    c.alpha_composite(vit_kant(kan, 7), (150, 300))                             # gosekaninen, fastspänd bak
    fyll(c, (90, 90, 90), lambda d: d.line((150, 405, 300, 405), fill=255, width=8), vick=0.1, oskarp=0.8)   # bältet
    fyll(c, BLÅ, lambda d: d.chord((BLÅLJUS[0] - 34, BLÅLJUS[1] - 30, BLÅLJUS[0] + 34, BLÅLJUS[1] + 36), 180, 360, fill=255), vick=0.1, oskarp=1)
    if lova:
        sätt(c, figur("lova", mood, blick, ben=False, lager="kropp", tår_=tår_), LOVA_X, LOVA_FOT, LOVA_K)
    fyll(c, RÖD, kropp, vick=0.12, oskarp=1.5)
    fyll(c, RÖD_M, lambda d: d.rounded_rectangle((120, 700, 920, 726), 12, fill=255), vick=0.1, oskarp=1)   # randen
    fyll(c, (250, 236, 200), lambda d: d.ellipse((880, 640, 920, 680), fill=255), vick=0.1, oskarp=0.8)    # lyktan
    for x in (300, 760):
        fyll(c, INK, lambda d: d.ellipse((x - 88, 712, x + 88, 888), fill=255), vick=0.1, oskarp=1)
        fyll(c, (170, 170, 170), lambda d: d.ellipse((x - 34, 766, x + 34, 834), fill=255), vick=0.1, oskarp=0.8)
    if nicke_på:
        sätt(c, nicke(nicke_på), 840, 575, 0.13)
    if lova:
        sätt(c, figur("lova", mood, blick, lyft_r=lyft_r, lyft_l=lyft_l, ben=False, lager="armar"), LOVA_X, LOVA_FOT, LOVA_K)
    return c


BIL_H = 470   # brandbilens höjd i rutan från öronen (ca 415) till hjulens underkant (888)


def bil_punkt(t, s, x0, y0):
    return x0 + t[0] * s, y0 + t[1] * s


def stege(c, piv, vinkel, längd, s):
    """Stegen på bilden: två vita skenor med pinnar, från vridpunkten, `vinkel` grader upp från liggande framåt."""
    a = math.radians(vinkel)
    ux, uy = math.cos(a), -math.sin(a)
    nx, ny = -uy, ux
    bw = 26 * s
    p0 = (piv[0] - nx * bw, piv[1] - ny * bw), (piv[0] + nx * bw, piv[1] + ny * bw)
    def rita(d):
        for (x, y) in p0:
            d.line((x, y, x + ux * längd, y + uy * längd), fill=255, width=max(4, round(12 * s)))
        for i in range(1, int(längd / (48 * s)) + 1):
            t = i * 48 * s
            d.line((p0[0][0] + ux * t, p0[0][1] + uy * t, p0[1][0] + ux * t, p0[1][1] + uy * t), fill=255, width=max(3, round(9 * s)))
    m, d = ritmask(c)
    rita(d)
    vit = Image.new("RGBA", c.size, (120, 120, 120, 0))
    vit.putalpha(m.filter(ImageFilter.MaxFilter(5)))
    c.alpha_composite(vit)
    kritfyll(c, m, (252, 252, 250), vick=0.08, oskarp=0.8)
    return piv[0] + ux * längd, piv[1] + uy * längd


def lägg_bil(c, cx, ground, h, rot=0, stegvinkel=0, steglängd=560, mål=None, lucka=0, **kw):
    """Brandbilen i bilden. mål: stegen fälls upp mot den punkten och stannar `lucka` px före. Returnerar (skala, x0, y0, stegens topp)."""
    im = brandbil(**kw)
    s, x0, y0 = place(c, im, cx, ground, h, rot=rot, bakad=False)
    piv = bil_punkt(STEGE_PIV, s, x0, y0)
    if mål:
        stegvinkel = math.degrees(math.atan2(piv[1] - mål[1], mål[0] - piv[0]))
        steglängd = (math.dist(piv, mål) - lucka) / s
    topp = stege(c, piv, stegvinkel, steglängd * s, s)
    return s, x0, y0, topp


# --- Ballongen (PLATSHÅLLARE i kod) ----------------------------------------------------------------------------
def ballong(c, x, y, r):
    platshållare("ballong")
    fyll(c, (90, 90, 90), lambda d: d.line([(x, y + r * 1.25)] + [(x + math.sin(i / 3) * r * .15, y + r * 1.25 + i * r * .12) for i in range(1, 22)],
                                           fill=255, width=4), vick=0.05, oskarp=0.6)
    m = fyll(c, RÖD, lambda d: (d.ellipse((x - r, y - r * 1.2, x + r, y + r * 1.2), fill=255),
                                 d.polygon([(x - r * .18, y + r * 1.32), (x, y + r * 1.12), (x + r * .18, y + r * 1.32)], fill=255)), vick=0.1, oskarp=1.2)
    under = Image.new("RGBA", c.size, (255, 255, 255, 0))
    under.putalpha(ImageChops.subtract(m.filter(ImageFilter.MaxFilter(2 * round(2 + 0.01 * 2.4 * r) + 1)), m))
    c.alpha_composite(under)
    fyll(c, (255, 170, 160), lambda d: d.ellipse((x - r * .55, y - r * .8, x - r * .2, y - r * .3), fill=255), vick=0.1, oskarp=1)


# --- Bakgrunderna ----------------------------------------------------------------------------------------------
def vägen(glöd=False):
    c = bild("vägen").convert("RGB").resize((W, H)).convert("RGBA")
    if glöd:
        fyll(c, GLÖD, lambda d: d.rectangle((0, 0, W, 560), fill=255), alpha=0.45, vick=0.1, oskarp=30)
    return c


TRÄD_FÖNSTER = (856, 370, 1040)   # utsnittet av äppelträdets plåt: trädet blir stort till höger (plåten har trädet litet i kanten)
TOPPEN = (1185, 72)               # det finaste äpplet högst upp i kronan, i utsnittets koordinater


def äppelträdet():
    c = crop_zoom(bild("äppelträdet").convert("RGB"), *TRÄD_FÖNSTER).convert("RGBA")
    place(c, ÄPPLE, TOPPEN[0], TOPPEN[1] + 36, 72)
    return c


def äppelbacken(glöd=False):
    """PLATSHÅLLARE: himmel, en rund grön backe med äppelträd och den röda vägen som en lång rutschkana i mjuka slingor."""
    platshållare("äppelbacken")
    c = Image.new("RGBA", (W, H), HIMMEL + (255,))
    if glöd:
        fyll(c, GLÖD, lambda d: d.rectangle((0, 0, W, 500), fill=255), alpha=0.5, vick=0.1, oskarp=30)
    fyll(c, GRÄS, lambda d: d.ellipse((-300, 150, 1100, 1400), fill=255), vick=0.15, oskarp=2)
    fyll(c, GRÄS_M, lambda d: d.rectangle((0, 690, W, H), fill=255), vick=0.15, oskarp=2)
    for x, y in ((240, 230), (520, 210), (690, 330), (120, 400)):
        fyll(c, (130, 84, 50), lambda d: d.rectangle((x - 9, y, x + 9, y + 70), fill=255), vick=0.1, oskarp=1)
        fyll(c, (70, 160, 70), lambda d: d.ellipse((x - 58, y - 90, x + 58, y + 20), fill=255), vick=0.15, oskarp=1.5)
        for dx, dy in ((-25, -50), (20, -30), (-5, -10), (30, -65)):
            prick(c, x + dx, y + dy, 9, RÖD)
    return c


KANA = [(380, 250), (520, 270), (720, 250), (880, 380), (720, 500), (900, 600), (1200, 640), (1450, 650)]   # rutschkanans mittlinje


def kana_punkt(t):
    """Punkt och lutning (grader) längs kanan, t 0..1 (Catmull-Rom genom KANA)."""
    n = len(KANA) - 1
    i = min(int(t * n), n - 1)
    u = t * n - i
    p0, p1, p2, p3 = KANA[max(i - 1, 0)], KANA[i], KANA[i + 1], KANA[min(i + 2, n)]
    f = lambda a, b, c_, d: 0.5 * (2 * b + (-a + c_) * u + (2 * a - 5 * b + 4 * c_ - d) * u * u + (-a + 3 * b - 3 * c_ + d) * u ** 3)
    g = lambda a, b, c_, d: 0.5 * ((-a + c_) + 2 * (2 * a - 5 * b + 4 * c_ - d) * u + 3 * (-a + 3 * b - 3 * c_ + d) * u * u)
    x, y = f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])
    dx, dy = g(p0[0], p1[0], p2[0], p3[0]), g(p0[1], p1[1], p2[1], p3[1])
    return (x, y), -math.degrees(math.atan2(dy, dx))


def rutschkana(c):
    pts = [kana_punkt(i / 120)[0] for i in range(121)]
    fyll(c, (255, 255, 255), lambda d: d.line(pts, fill=255, width=96, joint="curve"), vick=0.08, oskarp=1)
    fyll(c, RÖD, lambda d: d.line(pts, fill=255, width=80, joint="curve"), vick=0.1, oskarp=1.5)
    fyll(c, (245, 120, 105), lambda d: d.line([(x, y - 22) for x, y in pts], fill=255, width=14, joint="curve"), vick=0.1, oskarp=1)


def disco():
    """006:s discoplåt omfärgad till ljusrött/rosa, med en röd kula."""
    hsv = np.asarray(bild("disco").convert("RGB").convert("HSV")).copy()
    hsv[..., 0] = 248
    c = Image.frombytes("HSV", (hsv.shape[1], hsv.shape[0]), hsv.tobytes()).convert("RGB").resize((W, H)).convert("RGBA")
    fyll(c, (90, 90, 90), lambda d: d.line((W / 2, 0, W / 2, 70), fill=255, width=4))
    fyll(c, RÖD, lambda d: d.ellipse((W / 2 - 52, 66, W / 2 + 52, 170), fill=255), vick=0.1, oskarp=1)
    for i in range(6):
        prick(c, W / 2 - 30 + (i % 3) * 30, 92 + (i // 3) * 34, 6, (255, 220, 215))
    return c


def papper():
    return Image.new("RGBA", (W, H), PAPER + (255,))


# --- Scenerna ---------------------------------------------------------------------------------------------------
BIL_X, BIL_MARK, BIL_HÖJD = 470, 690, 330   # körscenen: brandbilen på vänstra tredjedelen, 43 % av bildhöjden
UPP, VINKA, FRAM = 150, 120, 75             # armlyft i grader


def körscen(glöd=False, puff=True, pella=False, **kw):
    c = vägen(glöd)
    if pella:
        place(c, bild("pella"), 1050, 150, 70)
        pil(c, [(1120, 120), (1260, 110)])
    s, x0, y0, _ = lägg_bil(c, BIL_X, BIL_MARK, BIL_HÖJD, **kw)
    if puff:
        puffar(c, x0 + 90 * s, y0 + 700 * s)
    return c, (s, x0, y0)


def närbild(c, bil, dx=0, w=460):
    s, x0, y0 = bil
    return crop_zoom(c, x0 + (LOVA_X + dx) * s, y0 + 560 * s, w)


def på_kanan(c, t, h=230, **kw):
    (x, y), lut = kana_punkt(t)
    return lägg_bil(c, x, y + 20, h, rot=max(-18, min(18, lut * 0.6)), **kw)


def klistermärke(c, x, y, r, sak):
    fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.05, oskarp=1)
    if sak == "ballong":
        ballong(c, x, y - r * .2, r * .45)
    elif sak == "äpple":
        place(c, ÄPPLE, x, y + r * .62, r * 1.25)
    else:
        place(c, figur("bettan", "glad"), x, y + r * .45, r * .9)


def titelkort():
    c = Image.new("RGBA", (W, H), HIMMEL + (255,))
    d = ImageDraw.Draw(c)
    f = font(84)
    for i, (t, y) in enumerate((("Avsnitt 13", 230), ("Röda sången", 360))):
        d.text((W / 2, y), t, font=f, fill=RÖD if i else INK, anchor="mm", stroke_width=6, stroke_fill=VIT)
    lägg_bil(c, W / 2, 640, 190, lova=False)
    return c


def kritan(c, x, y):
    """Kritan (utan ansikte) som ritar: en röd kritstift snett uppåt höger."""
    a = math.radians(-35)
    ux, uy = math.cos(a), math.sin(a)
    pts = [(x, y), (x + 40 * ux - 14 * uy, y + 40 * uy + 14 * ux), (x + 200 * ux - 22 * uy, y + 200 * uy + 22 * ux),
           (x + 200 * ux + 22 * uy, y + 200 * uy - 22 * ux), (x + 40 * ux + 14 * uy, y + 40 * uy - 14 * ux)]
    fyll(c, RÖD, lambda d: d.polygon(pts, fill=255), vick=0.08, oskarp=1)
    fyll(c, VIT, lambda d: d.line((x + 90 * ux - 22 * uy, y + 90 * uy + 22 * ux, x + 90 * ux + 22 * uy, y + 90 * uy - 22 * ux), fill=255, width=10))


def ritad_bil(c, steg):
    """Kritan ritar brandbilen på papperet, steg 1–3."""
    m = fyll(c, RÖD, lambda d: (d.rounded_rectangle((400, 330, 680, 560), 50, fill=255), d.rounded_rectangle((400, 470, 1000, 560), 50, fill=255),
                                 d.rounded_rectangle((830, 400, 1000, 550), 60, fill=255)), vick=0.25, oskarp=2.5)
    if steg >= 2:
        for x in (520, 880):
            fyll(c, INK, lambda d: d.ellipse((x - 62, 500, x + 62, 624), fill=255), vick=0.2, oskarp=1.5)
        fyll(c, INK, lambda d: (d.line((420, 312, 820, 312), fill=255, width=10), d.line((420, 340, 820, 340), fill=255, width=10),
                                [d.line((440 + i * 50, 312, 440 + i * 50, 340), fill=255, width=8) for i in range(8)]), vick=0.2, oskarp=1)
    if steg >= 3:
        fyll(c, BLÅ, lambda d: d.chord((620, 270, 680, 340), 180, 360, fill=255), vick=0.2, oskarp=1.5)
    return c


# Bild för bild (id → funktion). Humörena står i storyboard.md (kolumnen Ansikten); här väljs radens tydligaste.
def B():
    f = {}
    f["00"] = titelkort

    def p(steg, krita_xy, pilar=None):
        def g():
            c = ritad_bil(papper(), steg)
            kritan(c, *krita_xy)
            if pilar:
                pil(c, pilar)
            return c
        return g
    f["01a"] = p(1, (690, 330))
    f["01b"] = p(2, (830, 300))
    f["01c"] = p(3, (690, 270), [(380, 640), (500, 680), (620, 640)])

    def g02a():
        c, _ = körscen(mood="ropar", lyft_r=FRAM)
        pil(c, [(120, 470), (260, 470)])
        return c
    f["02a"] = g02a
    f["02b"] = lambda: körscen(mood="nyfiken", blick=(1, 0), pella=True)[0]

    def g03():
        c, b = körscen(mood="blinkar", lyft_r=FRAM, puff=False)
        return närbild(c, b)
    f["03"] = g03

    # Refrängen (04a–i, refrang-plan.md): vägen → äppelbacken → rutschkanan → hem med kritsvep
    def g04a():
        c, b = körscen(mood="ropar", lyft_r=UPP, lyft_l=UPP)
        for i, x in enumerate((760, 860, 960, 1060)):
            prick(c, x, 640 + (i % 2) * 8, 18, RÖD)
        return c
    f["04a"] = g04a

    def g04b():
        c = vägen()
        fyll(c, RÖD, lambda d: d.line([(700, 640), (950, 630), (1150, 560), (1400, 470)], fill=255, width=70, joint="curve"), vick=0.2, oskarp=2)
        fyll(c, GRÄS, lambda d: d.ellipse((1050, 380, 1700, 900), fill=255), vick=0.15, oskarp=2)
        fyll(c, RÖD, lambda d: d.line([(1150, 560), (1400, 470)], fill=255, width=70), vick=0.2, oskarp=2)
        lägg_bil(c, 470, 690, 330, mood="ropar", lyft_r=FRAM)
        ringar(c, 470 + 0.7 * (BLÅLJUS[0] - 512), 690 - 0.7 * (888 - BLÅLJUS[1]) - 20)
        pil(c, [(700, 600), (950, 590), (1150, 520)])
        return c
    f["04b"] = g04b

    def g04c():
        c = äppelbacken()
        rutschkana(c)
        på_kanan(c, 0.0, mood="forvanad", blick=(1, 1))
        pil(c, [(140, 520), (220, 360), (300, 270)])
        return c
    f["04c"] = g04c

    def g04d():
        c = äppelbacken()
        rutschkana(c)
        på_kanan(c, 0.2, mood="skrattar", lyft_r=UPP, lyft_l=UPP)
        pil(c, [(560, 380), (700, 380), (820, 440)])
        return c
    f["04d"] = g04d

    def g04e():
        c = äppelbacken()
        rutschkana(c)
        s, x0, y0, _ = på_kanan(c, 0.48, mood="skelogd")
        puffar(c, x0 + 60 * s, y0 + 600 * s, dx=40)
        pil(c, [(1000, 380), (1040, 470), (980, 560)])
        return c
    f["04e"] = g04e

    def g04f():
        c = äppelbacken()
        rutschkana(c)
        _, x0, y0, _ = på_kanan(c, 0.62, h=260, mood="forvanad", blick=(-1, 0.5))
        for x, y in ((1010, 640), (1080, 610)):
            place(c, ÄPPLE, x, y, 60)
            puffar(c, x - 40, y - 20, n=2, r=10, dx=-26)
        return crop_zoom(c, 820, 440, 760)
    f["04f"] = g04f

    def g04g():
        c = äppelbacken(glöd=True)
        rutschkana(c)
        lägg_bil(c, 1060, 700, 300, mood="ropar", lyft_r=UPP, lyft_l=UPP)
        for (x, y), sak in zip(((820, 600), (650, 520), (520, 420)), ("bussen", "ballong", "äpple")):
            klistermärke(c, x, y, 52, sak)
        return crop_zoom(c, 860, 500, 1050)
    f["04g"] = g04g

    def g04h():
        c, b = körscen(mood="skrattar", lyft_r=FRAM, puff=False)
        s, x0, y0 = b
        ringar(c, x0 + 860 * s, y0 + 620 * s)
        return närbild(c, b)
    f["04h"] = g04h

    def g04i():
        c, _ = körscen(mood="nyfiken", blick=(-1, 0), lyft_r=VINKA)
        fyll(c, RÖD, lambda d: d.polygon([(W, 0), (W, H), (W - 260, H), (W - 120, 0)], fill=255), alpha=0.9, vick=0.3, oskarp=4)
        pil(c, [(1000, 300), (1150, 300)])
        return c
    f["04i"] = g04i

    # Röd sak 1 och 2 på vägen
    def g05a():
        c, _ = körscen(mood="nyfiken", blick=(1, 0), puff=False)
        place(c, figur("bettan", "glad"), 1250, 600, 190)
        pil(c, [(1300, 450), (1120, 450)])
        return c
    f["05a"] = g05a

    def g05b():
        c, _ = körscen(mood="forvanad", lyft_r=VINKA, puff=False)
        place(c, figur("bettan", "blinkar"), 1000, 600, 190)
        ringar(c, 1150, 470)
        pil(c, [(1100, 420), (1300, 420)])
        return c
    f["05b"] = g05b

    def g05c():
        c, _ = körscen(mood="nyfiken", blick=(0.5, -1), puff=False)
        ballong(c, 820, 180, 55)
        pil(c, [(900, 40), (880, 110)])
        return c
    f["05c"] = g05c

    def g05d():
        c, b = körscen(mood="forvanad", puff=False)
        s, x0, y0 = b
        ballong(c, x0 + 900 * s, y0 + 380 * s, 46)
        puffar(c, x0 + 760 * s, y0 + 520 * s, n=3, r=12, dx=30)
        pil(c, [(x0 + 900 * s, y0 + 250 * s), (x0 + 960 * s, y0 + 120 * s)])
        return närbild(c, b, dx=120, w=640)
    f["05d"] = g05d

    def g06(mood, blick=(0, 0)):
        def g():
            c, b = körscen(mood=mood, blick=blick, puff=False)
            return närbild(c, b)
        return g
    f["06a"] = g06("nyfiken")
    f["06b"] = g06("skelogd")
    f["06c"] = g06("slickar")

    # Äppelträdet (08–12d)
    TX, TMARK, TH = 640, 680, 300

    def träd(mood, nicke_mood=None, nicke_xy=(1120, 260), flyger=False, nicke_k=0.11, på_bil=False, uppe=False, lyft=(0, 0), tår_=False, äpple_kvar=True):
        c = äppelträdet()
        if not äpple_kvar:
            fyll(c, (70, 160, 70), lambda d: d.ellipse((TOPPEN[0] - 40, TOPPEN[1] - 10, TOPPEN[0] + 40, TOPPEN[1] + 50), fill=255), vick=0.2, oskarp=2)
        s, x0, y0, topp = lägg_bil(c, TX, TMARK, TH, mood=mood, lyft_r=lyft[0], lyft_l=lyft[1], mål=(TOPPEN[0] - 10, TOPPEN[1] + 70) if uppe else None, lucka=70,
                                   tår_=tår_, nicke_på=nicke_mood if på_bil else None)
        if nicke_mood and not på_bil:
            sätt(c, nicke(nicke_mood, flyger), nicke_xy[0], nicke_xy[1], nicke_k)
        return c, (s, x0, y0), topp

    def g08():
        c, *_ = träd("nyfiken", "blinkar", (1080, 300))
        pil(c, [(250, 560), (420, 560)])
        return c
    f["08"] = g08
    f["09"] = lambda: träd("forvanad", "skrattar", (1080, 300), lyft=(UPP, 0))[0]

    def g10a():
        c, b, _ = träd("glad", "ropar", på_bil=True)
        s, x0, y0 = b
        return crop_zoom(c, x0 + 840 * s, y0 + 520 * s, 420)
    f["10a"] = g10a
    f["10b"] = lambda: träd("karleksfull", "nyfiken", på_bil=True)[0]

    def g11a():
        c, b, _ = träd("forvanad", "forvanad", på_bil=True)
        pil(c, [(1000, 520), (1000, 300), (1080, 170)])
        return c
    f["11a"] = g11a

    def g11b():
        c, b, topp = träd("skelogd", "nyfiken", på_bil=True, uppe=True, lyft=(UPP, 0))
        pil(c, [(topp[0] - 140, topp[1] + 60), (topp[0] - 40, topp[1] + 10)])
        return c
    f["11b"] = g11b

    def g11c():
        c, b, _ = träd("ledsen", None, uppe=True, tår_=True)
        s, x0, y0 = b
        return crop_zoom(c, x0 + LOVA_X * s, y0 + 580 * s, 420)
    f["11c"] = g11c

    def g11d():
        c, b, _ = träd("nyfiken", "blinkar", (950, 470), flyger=True, nicke_k=0.14, uppe=True)
        return c
    f["11d"] = g11d

    def g12a():
        c, b, topp = träd("ropar", "skrattar", (1040, 250), flyger=True, uppe=True, lyft=(UPP, UPP))
        pil(c, [(900, 420), (960, 330), (1040, 290)])
        return c
    f["12a"] = g12a

    def g12b():
        c, b, topp = träd("forvanad", "forvanad", (TOPPEN[0] - 60, TOPPEN[1] + 70), flyger=True, nicke_k=0.12, uppe=True, äpple_kvar=False)
        place(c, ÄPPLE, TOPPEN[0] + 10, TOPPEN[1] + 120, 58)
        pil(c, [(TOPPEN[0] + 60, TOPPEN[1] + 60), (TOPPEN[0] + 60, TOPPEN[1] + 220)])
        return crop_zoom(c, TOPPEN[0] - 60, TOPPEN[1] + 120, 520)
    f["12b"] = g12b

    def g12c():
        c, b, _ = träd("karleksfull", "karleksfull", på_bil=True, lyft=(FRAM, FRAM), äpple_kvar=False)
        s, x0, y0 = b
        place(c, ÄPPLE, x0 + 690 * s, y0 + 660 * s, 52)
        return c
    f["12c"] = g12c

    def g12d():
        c, b, _ = träd("slickar", "slickar", på_bil=True, lyft=(FRAM, 0), äpple_kvar=False)
        s, x0, y0 = b
        place(c, ÄPPLE.crop((0, 0, 1024, 700)), x0 + 720 * s, y0 + 650 * s, 40)
        prick(c, x0 + 860 * s, y0 + 540 * s, 6, RÖD)
        return crop_zoom(c, x0 + 700 * s, y0 + 560 * s, 720)
    f["12d"] = g12d

    # Discot (13a–15)
    def dans(c, aktiv=None, mood_alla="skrattar", lova_mood="skrattar", nicke_mood="skrattar", lyft=(0, 0)):
        rad = [("hulda", 300, 600), ("lova", 560, 640), ("hugo", 820, 600), ("kanel", 1060, 610)]
        for namn, x, fot in rad:
            m = lova_mood if namn == "lova" else ("ropar" if namn == aktiv else mood_alla)
            hopp = 40 if namn == aktiv and namn in ("kanel",) else 0
            l = lyft if namn in ("lova", aktiv) else (0, 0)
            sätt(c, figur(namn, m, lyft_r=l[0], lyft_l=l[1]), x, fot - hopp, 0.34 if namn != "lova" else 0.4)
        sätt(c, nicke(nicke_mood, flyger=True), 700, 330, 0.12)
        return c

    f["13a"] = lambda: dans(disco(), lova_mood="ropar", nicke_mood="ropar", lyft=(UPP, UPP))

    def g13b():
        c = dans(disco(), "hulda")
        pil(c, [(250, 650), (250, 610)])
        return c
    f["13b"] = g13b
    f["13c"] = lambda: dans(disco(), "hugo")

    def g13d():
        c = dans(disco(), "kanel")
        pil(c, [(1160, 560), (1160, 480)])
        return c
    f["13d"] = g13d

    def g14a():
        c = disco()
        lägg_bil(c, W / 2, 700, 300, mood="forvanad", blick=(0, -1))
        for (x, y), sak in zip(((480, 250), (W / 2, 220), (896, 250)), ("bussen", "ballong", "äpple")):
            klistermärke(c, x, y, 62, sak)
        sätt(c, nicke("ropar", flyger=True), 1060, 520, 0.11)
        return c
    f["14a"] = g14a

    def g14b():
        c = disco()
        lägg_bil(c, W / 2, 700, 300, mood="ropar", lyft_r=UPP, lyft_l=UPP)
        ringar(c, W / 2 + 0.64 * (BLÅLJUS[0] - 512), 700 - 0.64 * (888 - BLÅLJUS[1]) - 20)
        sätt(c, nicke("ropar", flyger=True), 1060, 520, 0.11)
        return c
    f["14b"] = g14b

    def g14c():
        c = disco()
        lägg_bil(c, W / 2, 700, 300, mood="blinkar", lyft_r=VINKA)
        sätt(c, nicke("karleksfull", flyger=True), 1060, 520, 0.11)
        pil(c, [(250, 640), (420, 640)])
        return c
    f["14c"] = g14c

    def g15():
        c = disco()
        s, x0, y0, _ = lägg_bil(c, W / 2, 700, 300, mood="njuter")
        cx, cy = x0 + LOVA_X * s, y0 + 560 * s
        m = Image.new("L", (W, H), 255)
        pts = [(cx + (190 + 10 * math.sin(a * 9)) * math.cos(a), cy + (190 + 10 * math.sin(a * 9)) * math.sin(a)) for a in np.linspace(0, 2 * math.pi, 120)]
        ImageDraw.Draw(m).polygon(pts, fill=0)
        c.paste((10, 10, 10), mask=m.filter(ImageFilter.GaussianBlur(2)))
        ImageDraw.Draw(c).line(pts + [pts[0]], fill=(250, 244, 230), width=6)
        return c
    f["15"] = g15
    return f


# --- Tabellen ur storyboard.md -----------------------------------------------------------------------------------
def tabell():
    rader = []
    for rad in (HÄR.parent / "storyboard.md").read_text(encoding="utf-8").splitlines():
        if not rad.startswith("| ") or rad.startswith("| #"):
            continue
        k = [x.strip() for x in rad.strip("|").split("|")]
        if len(k) == 6:
            rader.append(dict(zip(("id", "tid", "plats", "sjungs", "bild", "ansikten"), k)))
    return rader


def md(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    return re.sub(r"\*(.+?)\*", r"<i>\1</i>", t)


def sida(rader, bilder):
    scen = None
    delar = []
    for r in rader:
        plats = re.sub(r"[*\s]*\(\d\)|\*\*|,.*", "", r["plats"]).split("·")[0].replace("→", "").strip() or r["plats"]
        grupp = ("Intro och kritan" if r["id"] in ("00",) or r["id"].startswith("01") else
                 "Refrängen: rutschkanan" if r["id"].startswith(("04", "07")) else
                 "Vägen" if r["id"].startswith(("02", "03", "05", "06")) else
                 "Äppelträdet" if r["id"][:2] in ("08", "09", "10", "11", "12") else "Discot och slutet")
        if grupp != scen:
            if scen:
                delar.append("</div>")
            delar.append(f"<h3>{grupp}</h3><div class='frames'>")
            scen = grupp
        img = (f"<img src='frames/{r['id']}.jpg' alt='{html.escape(r['bild'])}' width='960' height='536' loading='lazy'>" if r["id"] in bilder
               else "<div class='ingen'>Samma bilder som 04a–i</div>")
        delar.append(f"<figure class='frame'>{img}<figcaption><div class='t'>{r['id']} · {r['tid']} · {md(r['plats'])}</div>"
                     f"<div class='song'>{md(r['sjungs'])}</div><p>{md(r['bild'])}</p><p class='ans'>{md(r['ansikten'])}</p></figcaption></figure>")
    delar.append("</div>")
    ph = "".join(f"<li><code>{html.escape(p)}</code></li>" for p in PLATSHÅLLARE)
    return f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Röda sången: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#C8352A;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --red:#f07a6e; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --red:#f07a6e; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 var(--body) }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1,h3 {{ font-family:var(--display); margin:0; line-height:1.1 }}
h1 {{ font-size:clamp(34px,6vw,56px); font-weight:800 }} h1 span {{ color:var(--red) }}
h3 {{ font-size:22px; margin:36px 0 12px }}
.lede {{ color:var(--muted); max-width:70ch; margin:10px 0 0 }}
.frames {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px }}
.frame {{ margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }}
.frame img {{ width:100%; height:auto; display:block }}
.ingen {{ aspect-ratio:1376/768; display:grid; place-items:center; color:var(--muted); background:var(--chip); font:500 13px var(--mono) }}
figcaption {{ padding:12px 14px 14px; display:grid; gap:6px; font-size:14px }} figcaption p {{ margin:0 }}
.t {{ font:500 12px var(--mono); color:var(--muted) }}
.song {{ border-left:3px solid var(--red); padding-left:10px; font-style:italic }}
.ans {{ color:var(--muted); font-size:13px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
.utkast {{ display:inline-block; margin-top:14px; font:500 12px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:3px 10px }}
</style></head><body><div class="wrap">
<h1>Röda sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 013, första utkast. En stillbild per rad i <code>storyboard.md</code>, byggd av utklippen i <code>assets/</code> med ansiktena ritade i kod (<code>verktyg/ansikten.py</code>) och vita kanter enligt <code>vita-kanter</code>. Pilarna visar rörelsen. Varje bild visar radens tydligaste uttryck; alla uttryck står under bilden.</p>
<span class="utkast">Tiderna ur rader.txt (tagning 1, avsnittstid = sångtid + 11 s; ≈ = uppskattad). {len(bilder)} bilder.</span>
{''.join(delar)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Platshållare i kod</b> tills bilderna finns (byts i <code>bygg.py</code>):<ul>{ph}</ul></li>
<li><b>Refrängen</b> följer <code>refrang-plan.md</code>: vägen målas röd, brandbilen kör upp på äppelbacken, åker kana i mjuka kurvor och glider ut nedanför där bussen, ballongen och äpplet kommer som klistermärken. Inga fartstreck (<code>format/regler.md</code>), bara vita puffar.</li>
<li><b>Äppelträdet</b> är ett förstorat utsnitt av plåten (trädet är litet i kanten av <code>appeltradet.png</code>), så det blir lite mjukare. Det stora äpplet i toppen är <code>applet-rott-v1</code>.</li>
<li><b>Gosekaninen</b> sitter fastspänd bak på brandbilen i alla bilder. Lova har sin röda hjälm i kod.</li>
<li><b>Discot</b> är 006:s discoplåt omfärgad till ljusrött med en röd kula i kod.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""


if __name__ == "__main__":
    (HÄR / "frames").mkdir(exist_ok=True)
    rader = tabell()
    f = B()
    gjorda = set()
    for r in rader:
        if r["id"] in f:
            im = f[r["id"]]()
            papperskorn(im).convert("RGB").resize((960, 536), Image.LANCZOS).save(HÄR / "frames" / f"{r['id']}.jpg", quality=86)
            gjorda.add(r["id"])
    saknas = [r["id"] for r in rader if r["id"] not in f]
    (HÄR / "index.html").write_text(sida(rader, gjorda), encoding="utf-8")
    print(f"{len(gjorda)} bilder, utan egen bild: {saknas}, platshållare: {PLATSHÅLLARE}")
