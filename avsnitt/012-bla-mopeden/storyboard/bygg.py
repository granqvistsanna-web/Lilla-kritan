"""Bygger bildstoryboarden för avsnitt 012 (Blå sången) av utklippen och bakgrunderna, som 013:s bygg.py.
Bilderna följer tabellen i ../storyboard.md (en stillbild per rad) och refrängen i ../refrang-plan.md.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter. Ändrar inte storyboard.md.

Ansiktena ritas i kod med humören i verktyg/ansikten.py. Vita kanter enligt skillen vita-kanter: 3 px + 1 % av sakens höjd i bild
(räknat i en 1920-bild, här 1376 bred). Det som saknas i assets/ (mopeden, blåbärshinken, blåklockorna, bollen, bubblorna) ritas
som enkla platshållare i kod och listas i index.html. När bilderna finns: lägg in dem i ASSET och byt platshållarfunktionen.
Allt ritat i kod får kritstruktur och ett svagt papperskorn; `--platt` stänger av det. Ingen Suno-tagning än: tiderna är uppskattade.
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
BLÅ = (47, 111, 214)         # #2F6FD6, mopeden och flaggan
BLÅ_M = (30, 78, 160)        # mörkare blått: kåpans skugga
BUBBLA = (127, 184, 240)     # #7FB8F0, såpbubblorna och kritsvepet som gör himlen blå
BÄR = (58, 79, 184)          # #3A4FB8, blåbären
KLOCKA = (91, 127, 224)      # #5B7FE0, blåklockorna
GUL = (246, 194, 28)
GRÖN = (98, 168, 72)
ORANGE = (242, 107, 29)      # äppelträdets vägg, kritsvepet dit
VÄGGRÖN = (166, 216, 107)    # vägens vägg, kritsvepet hem
KAJ_MUN = (243, 233, 220)    # Kaj är svart: munnen ritas ljus (munFarg i kit.js)
PLATSHÅLLARE = []

ASSET = {
    "vägen": "bakgrunder/vagen/vagen.png",
    "äppelträdet": "bakgrunder/appeltradet/appeltradet.png",
    "himlen": "bakgrunder/himlen/himlen.png",
    "näbb": "karaktarer/kycklingen-pip/cut/kycklingen-pip-nabb.png",
    "disco": "../avsnitt/006-orange-baten/scener/lager/disco-prickar.png",
}
SAKNAS = {   # platshållare i kod tills bilderna finns (prompterna skrivs i en annan session)
    "moped": "rekvisita/moped-bla (blå mopeden: kåpa, sadel, styre med lampa, korg bak, två hjul)",
    "hink": "rekvisita/blabar (blåbärshinken och lösa blåbär)",
    "blåklockor": "rekvisita/blaklockor (blåklockor vid vägkanten)",
    "boll": "rekvisita/boll-bla (blå bollen)",
    "bubblor": "bubblorna (bubbelmolnet, bubbelhavet, jättebubblan, sakbubblorna, bubbelkudden; ritas i kod även i filmen, ev. bakgrunder/bubbelhavet)",
}


def bild(nyckel):
    return Image.open(A / ASSET[nyckel]).convert("RGBA")


def platshållare(nyckel):
    if SAKNAS[nyckel] not in PLATSHÅLLARE:
        PLATSHÅLLARE.append(SAKNAS[nyckel])


# --- Kritstruktur (som 007 och 013) -------------------------------------------------------------------------------
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
    """Streckad pil som visar rörelsen (som i 007 och 013)."""
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


def ringar(c, x, y, r0=22, n=2):
    fyll(c, VIT, lambda d: [d.ellipse((x - r0 - 16 * i, y - r0 - 16 * i, x + r0 + 16 * i, y + r0 + 16 * i), outline=255, width=6)
                            for i in range(n)], vick=0.1, oskarp=0.8)


def prick(c, x, y, r, col):
    fyll(c, col, lambda d: d.ellipse((x - r, y - r * .8, x + r, y + r * .8)), vick=0.15, oskarp=1)


def kritsvep(c, col, från_höger=True):
    """Kritsvepet in i nästa plats (en bred färgad kil från kanten, som 013:s 04i)."""
    pts = [(W, 0), (W, H), (W - 300, H), (W - 140, 0)] if från_höger else [(0, 0), (0, H), (300, H), (140, 0)]
    fyll(c, col, lambda d: d.polygon(pts, fill=255), alpha=0.9, vick=0.3, oskarp=4)


# --- Bubblorna (PLATSHÅLLARE i kod) --------------------------------------------------------------------------------
def bubbla(c, x, y, r, sak=None):
    """En såpbubbla: genomskinlig blå, tunn vit kritkant, vit glimt uppe till vänster (refrang-plan.md). sak ritas inuti."""
    platshållare("bubblor")
    if sak:
        sak(c, x, y, r * 0.62)
    fyll(c, BUBBLA, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), alpha=0.35, vick=0.05, oskarp=1)
    fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), outline=255, width=max(3, round(r * 0.06))), vick=0.08, oskarp=0.8)
    fyll(c, VIT, lambda d: d.chord((x - r * .7, y - r * .7, x + r * .1, y + r * .1), 150, 240, fill=255), alpha=0.8, vick=0.05, oskarp=1)


def plopp(c, x, y, r=26):
    """En bubbla som spricker: en ring av vita kritprickar, ingen blixt."""
    for i in range(8):
        a = i * math.pi / 4
        prick(c, x + r * math.cos(a), y + r * math.sin(a), 5, VIT)


def bubbelhav(c, n=70, seed=3, y0=0, y1=H):
    rng = np.random.default_rng(seed)
    for _ in range(n):
        bubbla(c, rng.uniform(0, W), rng.uniform(y0, y1), rng.uniform(14, 70))


def avgasbubblor(c, x, y, n=3, r=14, dx=-40):
    """Mopedens blå såpbubblor ur avgasröret, i stället för rök."""
    for i in range(n):
        bubbla(c, x + i * dx, y - i * 22, r * (1 + i * .25))


# --- Sakerna (PLATSHÅLLARE i kod) ----------------------------------------------------------------------------------
def blåbär(c, x, y, r):
    platshållare("hink")
    fyll(c, BÄR, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.1, oskarp=1)
    fyll(c, (30, 40, 90), lambda d: d.regular_polygon((x, y - r * .7, r * .3), 5, fill=255), vick=0.05, oskarp=0.6)
    fyll(c, (150, 170, 240), lambda d: d.ellipse((x - r * .55, y - r * .5, x - r * .15, y - r * .1), fill=255), alpha=0.7, vick=0.05, oskarp=0.6)


def hink(c, x, y, h, full=True, lut=0):
    """Blåbärshinken med underkanten mitt på (x, y), höjd h. lut > 0: tippad åt höger."""
    platshållare("hink")
    w = h * 0.9
    lag = Image.new("RGBA", c.size)
    if full:
        for i, (dx, dy) in enumerate(((-.3, -.95), (0, -1.05), (.3, -.95), (-.15, -1.12), (.15, -1.1))):
            blåbär(lag, x + dx * w, y + dy * h, h * .14)
    fyll(lag, (190, 192, 196), lambda d: d.polygon([(x - w / 2, y - h * .9), (x + w / 2, y - h * .9), (x + w * .38, y), (x - w * .38, y)], fill=255), vick=0.1, oskarp=1)
    fyll(lag, (120, 122, 128), lambda d: d.arc((x - w * .45, y - h * 1.5, x + w * .45, y - h * .5), 200, 340, fill=255, width=max(3, round(h * .05))), vick=0.05, oskarp=0.8)
    if lut:
        lag = lag.rotate(-lut, resample=Image.BICUBIC, center=(x, y))
    c.alpha_composite(vit_kant(lag, 5))


def blåklockor(c, x, y, h, nick=0):
    platshållare("blåklockor")
    lag = Image.new("RGBA", c.size)
    for i, dx in enumerate((-.25, 0, .25)):
        top = (x + dx * h, y - h * (.85 + .12 * (i == 1)))
        fyll(lag, GRÖN, lambda d: d.line((x + dx * h * .4, y, top[0], top[1]), fill=255, width=max(4, round(h * .04))), vick=0.08, oskarp=0.8)
        bx, by = top[0] + h * .08, top[1] + h * .1 + nick
        fyll(lag, KLOCKA, lambda d: d.chord((bx - h * .11, by - h * .12, bx + h * .11, by + h * .14), 180, 360, fill=255), vick=0.1, oskarp=1)
        fyll(lag, KLOCKA, lambda d: d.polygon([(bx - h * .11, by), (bx + h * .11, by), (bx + h * .13, by + h * .07), (bx - h * .13, by + h * .07)], fill=255), vick=0.1, oskarp=1)
    fyll(lag, GRÖN, lambda d: (d.ellipse((x - h * .3, y - h * .18, x - h * .02, y), fill=255), d.ellipse((x + h * .02, y - h * .16, x + h * .3, y), fill=255)), vick=0.1, oskarp=1)
    c.alpha_composite(vit_kant(lag, 5))


def boll(c, x, y, r):
    platshållare("boll")
    lag = Image.new("RGBA", c.size)
    fyll(lag, BLÅ, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.1, oskarp=1)
    fyll(lag, VIT, lambda d: d.arc((x - r * .8, y - r * 1.4, x + r * 1.6, y + r * .6), 120, 210, fill=255, width=max(4, round(r * .18))), vick=0.08, oskarp=0.8)
    c.alpha_composite(vit_kant(lag, 2 * round(2 + 0.01 * 2 * r) + 1))


def flagga(c, x, y, h, col=BLÅ):
    """Mopedens lilla blå flagga på en pinne (flagga-rosa omfärgad i filmen, här i kod)."""
    fyll(c, (90, 90, 90), lambda d: d.line((x, y, x, y - h), fill=255, width=max(3, round(h * .05))), vick=0.05, oskarp=0.6)
    fyll(c, col, lambda d: d.polygon([(x, y - h), (x + h * .55, y - h * .85), (x, y - h * .68)], fill=255), vick=0.1, oskarp=1)


# --- Figurer: kropp, armar ur riggen och ansiktet ur verktyg/ansikten.py --------------------------------------
ANS = runpy.run_path(str(ROT / "verktyg/ansikten.py"))
rita_ansikte = ANS["rita"]
ANS["rita"].__globals__["KRITA"] = KRITA
DJUROGON = [(413, 401), (604, 398)]
FIGUR = {   # mapp, rigg (eller hel bild utan rigg), ansikte; mått ur kit.js (004, 014) och 013:s bygg.py
    "kanel": ("kaninen-kanel", "kanel-rigg.json", dict(ogon=[(412, 396), (605, 401)], mun=(510, 458), munskala=1.1)),
    "kaj": ("katten-kaj", "katten-kaj-rigg.json", dict(ogon=DJUROGON, mun=(512, 472), munskala=1.2)),
    "pip": ("kycklingen-pip", "kycklingen-pip-rigg.json", dict(ogon=DJUROGON, mun=(-500, -500))),   # näbben är munnen
    "gurra": ("grodan-gurra", "grodan-gurra-rigg.json", dict(ogon=[(337, 262), (686, 260)], ogonskala=1.45, mun=(512, 392), munskala=1.4, munbredd=2.6)),
    "disa": ("dinon-disa", "dinon-disa-rigg-lemmar.json", dict(ogon=[(413, 401), (604, 398)], mun=(511, 466), munskala=1.3)),
    "tuff": ("traktorn-tuff", "cut/traktorn-tuff-faceless.png", dict(ogon=[(794, 602), (898, 593)], ogonskala=0.8, mun=(847, 665), munskala=0.75)),
    "pella": ("flygplanet-pella", "cut/flygplanet-pella-faceless.png", dict(ogon=[(747, 524), (839, 520)], ogonskala=0.8, mun=(797, 577), munskala=0.75)),
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


def tår(c, x, y):
    fyll(c, (120, 190, 240), lambda d: (d.ellipse((x - 11, y, x + 11, y + 24), fill=255), d.polygon([(x - 9, y + 8), (x, y - 12), (x + 9, y + 8)], fill=255)),
         vick=0.05, oskarp=0.6)


def ansikte(c, namn, mood, blick, ans):
    if namn != "kaj":
        rita_ansikte(c, mood, blick, **ans)
        return
    # Kaj är svart: ögonen som vanligt, munnen omfärgad ljus (munFarg i kit.js)
    lag = Image.new("RGBA", c.size)
    rita_ansikte(lag, mood, blick, **ans)
    a = np.asarray(lag).copy()
    a[ans["mun"][1] - 40:, :, :3] = KAJ_MUN
    c.alpha_composite(Image.fromarray(a))


def figur(namn, mood="glad", blick=(0, 0), lyft_r=0, lyft_l=0, ben=True, lager="allt", tår_=False, tunga=False):
    """En figur i sin 1024-ruta med ansiktet ritat. lyft_* = grader armen lyfts ut från vila. lager: allt | kropp | armar.
    tunga: blå tunga (efter blåbären) ovanpå munnen."""
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
        ansikte(c, namn, mood, blick, ans)
        if namn == "pip":
            c.alpha_composite(bild("näbb"))
        if tunga:
            mx, my = ans["mun"] if namn != "pip" else (512, 470)
            fyll(c, BÄR, lambda d: d.ellipse((mx - 22, my + 4, mx + 22, my + 46), fill=255), vick=0.05, oskarp=0.8)
        if tår_:
            tår(c, ans["ogon"][0][0] - 10, ans["ogon"][0][1] + 38)
    if rig and lager != "kropp":
        for d, v in (("arm-r", lyft_r), ("arm-l", -lyft_l)):
            c.alpha_composite(armbild(mapp, rig, d).rotate(v, resample=Image.BICUBIC, center=tuple(rig["delar"][d]["vridpunkt"])))
    return c


def sätt(c, im, x, fot, k):
    """En figurbild (1024-rutan) med fötterna (512, 833) på (x, fot), skala k."""
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.alpha_composite(im, (round(x - 512 * k), round(fot - 833 * k)))


# --- Mopeden (PLATSHÅLLARE i kod) ----------------------------------------------------------------------------------
# I sin 1024-ruta: korgen och flaggan bak (vänster), sadeln i mitten, kåpan framför Kanels ben, styret med lampan fram (höger),
# hjulen står på y 900. Kanel sitter på sadeln, kroppen bakom kåpan och armarna framför. Mopeden kör alltid åt höger.
KANEL_FOT, KANEL_X, KANEL_K = 830, 470, 0.5
AVGAS = (150, 815)


def moped(mood="glad", lyft_r=0, lyft_l=0, blick=(0, 0), tår_=False, tunga=False, kanel=True, hink_=None):
    platshållare("moped")
    c = Image.new("RGBA", (1024, 1024))
    flagga(c, 205, 640, 270)
    if kanel:
        sätt(c, figur("kanel", mood, blick, ben=False, lager="kropp", tår_=tår_, tunga=tunga), KANEL_X, KANEL_FOT, KANEL_K)
    if hink_ is not None:
        hink(c, 270, 650, 120, lut=hink_)
    fyll(c, (200, 160, 100), lambda d: d.rounded_rectangle((170, 600, 360, 690), 18, fill=255), vick=0.12, oskarp=1.2)   # korgen
    fyll(c, (160, 120, 70), lambda d: [d.line((190 + i * 34, 608, 190 + i * 34, 684), fill=255, width=5) for i in range(6)], vick=0.1, oskarp=0.8)
    kåpa = lambda d: (d.rounded_rectangle((150, 680, 900, 830), 70, fill=255), d.chord((520, 560, 900, 900), 200, 360, fill=255),
                      d.polygon([(760, 690), (800, 440), (840, 440), (860, 700)], fill=255))
    fyll(c, BLÅ, kåpa, vick=0.12, oskarp=1.5)
    fyll(c, BLÅ_M, lambda d: d.rounded_rectangle((170, 780, 880, 810), 14, fill=255), vick=0.1, oskarp=1)
    fyll(c, (80, 80, 80), lambda d: d.line((760, 445, 880, 430), fill=255, width=16), vick=0.08, oskarp=0.8)   # styret
    fyll(c, (255, 226, 120), lambda d: d.ellipse((850, 470, 920, 540), fill=255), vick=0.1, oskarp=0.8)       # lampan
    fyll(c, (110, 110, 110), lambda d: d.rounded_rectangle((110, 800, 200, 828), 10, fill=255), vick=0.08, oskarp=0.8)   # avgasröret
    for x in (290, 780):
        fyll(c, INK, lambda d: d.ellipse((x - 78, 744, x + 78, 900), fill=255), vick=0.1, oskarp=1)
        fyll(c, (170, 170, 170), lambda d: d.ellipse((x - 30, 792, x + 30, 852), fill=255), vick=0.1, oskarp=0.8)
    if kanel:
        sätt(c, figur("kanel", mood, blick, lyft_r=lyft_r, lyft_l=lyft_l, ben=False, lager="armar"), KANEL_X, KANEL_FOT, KANEL_K)
    return c


def lägg_moped(c, cx, ground, h, rot=0, **kw):
    """Mopeden i bilden. Returnerar (skala, x0, y0)."""
    return place(c, moped(**kw), cx, ground, h, rot=rot, bakad=False)


def mp(t, b):
    """En punkt i mopedens 1024-ruta i bildens koordinater."""
    s, x0, y0 = b
    return x0 + t[0] * s, y0 + t[1] * s


# --- Bakgrunderna --------------------------------------------------------------------------------------------------
def vägen(blå_himmel=False):
    c = bild("vägen").convert("RGB").resize((W, H)).convert("RGBA")
    if blå_himmel:
        c.paste(BUBBLA, (0, 0, W, 552))
        fyll(c, BUBBLA, lambda d: d.rectangle((0, 0, W, 555), fill=255), vick=0.15, oskarp=6)
    return c


TRÄD_FÖNSTER = (856, 370, 1040)   # utsnittet av äppelträdets plåt (som 013): trädet stort till höger, golvet fritt till vänster


def äppelträdet(blå_himmel=False):
    c = crop_zoom(bild("äppelträdet").convert("RGB"), *TRÄD_FÖNSTER).convert("RGBA")
    if blå_himmel:   # kritan sveper blått över den orange väggen, trädkronan ligger kvar ovanpå
        vägg = np.asarray(c.convert("RGB"), int)
        m = (np.abs(vägg - np.array(ORANGE)).sum(-1) < 70) & (np.arange(H)[:, None] < 560)
        m = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5))
        c.paste(BUBBLA, mask=m)
        kritfyll(c, m, BUBBLA, vick=0.1, oskarp=1)
    return c


def himlen():
    return bild("himlen").convert("RGB").resize((W, H)).convert("RGBA")


def disco():
    """006:s discoplåt omfärgad till ljusblått, med en blå kula."""
    hsv = np.asarray(bild("disco").convert("RGB").convert("HSV")).copy()
    hsv[..., 0] = 150
    c = Image.frombytes("HSV", (hsv.shape[1], hsv.shape[0]), hsv.tobytes()).convert("RGB").resize((W, H)).convert("RGBA")
    fyll(c, (90, 90, 90), lambda d: d.line((W / 2, 0, W / 2, 70), fill=255, width=4))
    fyll(c, BLÅ, lambda d: d.ellipse((W / 2 - 52, 66, W / 2 + 52, 170), fill=255), vick=0.1, oskarp=1)
    for i in range(6):
        prick(c, W / 2 - 30 + (i % 3) * 30, 92 + (i // 3) * 34, 6, (215, 230, 255))
    return c


def papper():
    return Image.new("RGBA", (W, H), PAPER + (255,))


# --- Scenerna ---------------------------------------------------------------------------------------------------
MOP_X, MOP_MARK, MOP_H = 470, 690, 330     # körscenen: mopeden på vänstra tredjedelen, 43 % av bildhöjden
UPP, VINKA, FRAM = 150, 120, 75            # armlyft i grader


def körscen(bubblor=True, pella=False, blå_himmel=False, **kw):
    c = vägen(blå_himmel)
    if pella:
        sätt(c, figur("pella", kw.pop("pella_mood", "blinkar")), 1050, 230, 0.2)
        pil(c, [(1150, 110), (1290, 100)])
    b = lägg_moped(c, MOP_X, MOP_MARK, MOP_H, **kw)
    if bubblor:
        avgasbubblor(c, *mp(AVGAS, b))
    return c, b


def närbild(c, b, dx=0, w=480):
    return crop_zoom(c, *mp((KANEL_X + dx, 560), b), w)


def sakbubbla(sak):
    """Klistermärket inuti en sakbubbla: blåklockan, bollen, flaggan eller blåbäret."""
    def rita(c, x, y, r):
        fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.05, oskarp=1)
        if sak == "klocka":
            blåklockor(c, x, y + r * .7, r * 1.4)
        elif sak == "boll":
            boll(c, x, y, r * .6)
        elif sak == "flagga":
            flagga(c, x - r * .25, y + r * .6, r * 1.2)
        else:
            blåbär(c, x, y, r * .5)
    return rita


SAKER = ("klocka", "boll", "flagga", "bär")


def titelkort():
    c = Image.new("RGBA", (W, H), (168, 220, 242, 255))
    d = ImageDraw.Draw(c)
    f = font(84)
    for i, (t, y) in enumerate((("Avsnitt 12", 230), ("Blå sången", 360))):
        d.text((W / 2, y), t, font=f, fill=BLÅ if i else INK, anchor="mm", stroke_width=6, stroke_fill=VIT)
    lägg_moped(c, W / 2, 650, 200, kanel=False)
    return c


def kritan(c, x, y):
    """Kritan (utan ansikte) som ritar: ett blått kritstift snett uppåt höger."""
    a = math.radians(-35)
    ux, uy = math.cos(a), math.sin(a)
    pts = [(x, y), (x + 40 * ux - 14 * uy, y + 40 * uy + 14 * ux), (x + 200 * ux - 22 * uy, y + 200 * uy + 22 * ux),
           (x + 200 * ux + 22 * uy, y + 200 * uy - 22 * ux), (x + 40 * ux + 14 * uy, y + 40 * uy - 14 * ux)]
    fyll(c, BLÅ, lambda d: d.polygon(pts, fill=255), vick=0.08, oskarp=1)
    fyll(c, VIT, lambda d: d.line((x + 90 * ux - 22 * uy, y + 90 * uy + 22 * ux, x + 90 * ux + 22 * uy, y + 90 * uy - 22 * ux), fill=255, width=10))


def ritad_moped(c, steg):
    """Kritan ritar mopeden på papperet: 1 ett hjul, 2 ett hjul till och kåpan, 3 sadel, styre och lampa, 4 bubblor."""
    for i, x in enumerate((520, 880)):
        if steg >= 1 + i:
            fyll(c, INK, lambda d: d.ellipse((x - 70, 470, x + 70, 610), fill=255), vick=0.2, oskarp=1.5)
    if steg >= 2:
        fyll(c, BLÅ, lambda d: (d.rounded_rectangle((440, 450, 960, 560), 55, fill=255), d.chord((700, 380, 960, 620), 200, 360, fill=255)), vick=0.25, oskarp=2.5)
    if steg >= 3:
        fyll(c, INK, lambda d: (d.rounded_rectangle((560, 410, 700, 445), 16, fill=255), d.line((860, 440, 890, 280, 960, 270), fill=255, width=12)), vick=0.2, oskarp=1)
        fyll(c, GUL, lambda d: d.ellipse((940, 300, 990, 350), fill=255), vick=0.2, oskarp=1)
    if steg >= 4:
        for i in range(2):
            bubbla(c, 400 - i * 60, 520 - i * 40, 20 + i * 6)
    return c


# Bild för bild (id → funktion). Uttrycken står i storyboard.md (kolumnen Uttryck); här väljs radens tydligaste.
def B():
    f = {"01": titelkort}

    def p(steg, krita_xy, pilar=None):
        def g():
            c = ritad_moped(papper(), steg)
            kritan(c, *krita_xy)
            if pilar:
                pil(c, pilar)
            return c
        return g
    f["02"] = p(1, (590, 470))
    f["02a"] = p(2, (950, 470))
    f["02b"] = p(3, (990, 280))
    f["02c"] = p(4, (1040, 200), [(980, 640), (1120, 640)])

    f["03"] = lambda: crop_zoom(körscen(mood="forvanad")[0], 520, 480, 900)
    f["03a"] = lambda: närbild(*körscen(mood="blinkar", lyft_r=VINKA, bubblor=False))
    f["03b"] = lambda: körscen(mood="nyfiken", blick=(0.6, -1), pella=True)[0]

    def g04():
        c, b = körscen(mood="skelogd", blå_himmel=True)
        plopp(c, *mp((560, 470), b), r=20)
        bubbla(c, 760, 230, 26)
        bubbla(c, 840, 170, 20)
        return c
    f["04"] = g04

    # Refrängen (05a–h, refrang-plan.md): vägen → bubbelhavet → himlen → plopp, mjuk landning → hem med kritsvep
    def g05a():
        c, b = körscen(mood="ropar", lyft_r=UPP, lyft_l=UPP, bubblor=False)
        for i in range(4):
            x, y = mp(AVGAS, b)
            bubbla(c, x - 30 - i * 70, y - 60 - i * 55, 18 + i * 4)
        return c
    f["05a"] = g05a

    def g05b():
        c, b = körscen(mood="forvanad", lyft_r=FRAM)
        bubbelhav(c, 18, seed=5, y0=380, y1=700)
        c2 = vägen()
        c2.alpha_composite(c.crop((0, 0, 820, H)), (0, 0))   # bubbelmolnet bara framför mopeden (höger)
        pil(c2, [(1040, 300), (900, 300)])
        return c2
    f["05b"] = g05b

    def g05c():
        c = vägen(blå_himmel=True)
        bubbelhav(c, 40, seed=7)
        b = lägg_moped(c, 560, 690, 330, mood="skelogd")
        plopp(c, *mp((560, 470), b), r=22)
        plopp(c, *mp((650, 420), b), r=18)
        bubbelhav(c, 14, seed=8, y0=600, y1=H)
        return c
    f["05c"] = g05c

    def g05d():
        c = vägen(blå_himmel=True)
        bubbelhav(c, 30, seed=7)
        b = lägg_moped(c, 560, 690, 330, mood="skrattar", lyft_r=FRAM)
        bubbla(c, *mp((900, 380), b), 26)
        plopp(c, *mp((960, 300), b), r=24)
        return närbild(c, b, dx=120, w=620)
    f["05d"] = g05d

    def g05e():
        c = himlen()
        b = lägg_moped(c, 560, 600, 300, mood="forvanad", lyft_r=UPP, lyft_l=UPP)
        bubbla(c, 560, 450, 250)
        pil(c, [(880, 560), (900, 440), (900, 320)])
        kritsvep(c, BUBBLA, från_höger=False)
        return c
    f["05e"] = g05e

    def g05f():
        c = himlen()
        sätt(c, figur("pella", "skrattar"), 980, 330, 0.34)
        lägg_moped(c, 520, 620, 280, mood="ropar", lyft_r=VINKA)
        bubbla(c, 520, 480, 230)
        pil(c, [(760, 600), (900, 600)])
        return c
    f["05f"] = g05f

    def g05g():
        c = himlen()
        lägg_moped(c, 600, 640, 300, mood="forvanad", blick=(0, -1))
        for (x, y), sak in zip(((300, 220), (520, 120), (760, 110), (980, 200)), SAKER):
            bubbla(c, x, y, 70, sakbubbla(sak))
        plopp(c, 600, 480, r=240)
        return c
    f["05g"] = g05g

    def g05h():
        c, _ = körscen(mood="nyfiken", blick=(-1, 0), lyft_r=VINKA)
        kritsvep(c, VÄGGRÖN)
        pil(c, [(1000, 300), (1150, 300)])
        return c
    f["05h"] = g05h

    # Blå sak 1 och 2 på vägen
    def g06():
        c, b = körscen(mood="forvanad", lyft_r=FRAM, bubblor=False)
        blåklockor(c, 1080, 640, 170)
        pil(c, [(1300, 700), (1160, 700)])
        return c
    f["06"] = g06

    def g06a():
        c, b = körscen(mood="skelogd", bubblor=False)
        blåklockor(c, 900, 660, 170, nick=12)
        return crop_zoom(c, 720, 470, 720)
    f["06a"] = g06a

    def g07():
        c, b = körscen(mood="forvanad", bubblor=False)
        boll(c, 1000, 600, 46)
        pil(c, [(1200, 470), (1080, 540)])
        return c
    f["07"] = g07

    def g07a():
        c, b = körscen(mood="skrattar", blick=(1, -0.5), bubblor=False)
        for x, y in ((930, 640), (1080, 520), (1230, 620)):
            boll(c, x, y, 40)
        pil(c, [(900, 560), (1060, 440), (1220, 540)])
        return c
    f["07a"] = g07a

    f["08"] = lambda: närbild(*körscen(mood="skelogd", blick=(-1, -0.4), bubblor=False), dx=-120, w=560)
    f["08a"] = lambda: närbild(*körscen(mood="nyfiken", bubblor=False))

    def g08b():
        c, b = körscen(mood="skrattar", lyft_r=FRAM, bubblor=False)
        pil(c, [mp((300, 380), b), mp((380, 360), b)])
        return närbild(c, b, dx=-120, w=620)
    f["08b"] = g08b

    # Äppelträdet (10–13e)
    TX, TMARK, TH = 470, 690, 300
    KAJ_X, KAJ_FOT, KAJ_K = 960, 690, 0.36

    def träd(mood="glad", kaj="glad", pip=None, pip_xy=(800, 700), blå_himmel=False, hink_kaj=False, hink_mop=None, lyft=(0, 0), kaj_lyft=(0, 0),
             tår_=False, tunga=False, pella=None, bär=()):
        c = äppelträdet(blå_himmel)
        if pella:
            sätt(c, figur("pella", pella), 700, 230, 0.24)
        b = lägg_moped(c, TX, TMARK, TH, mood=mood, lyft_r=lyft[0], lyft_l=lyft[1], tår_=tår_, tunga=tunga, hink_=hink_mop)
        if kaj:
            sätt(c, figur("kaj", kaj, lyft_r=kaj_lyft[0], lyft_l=kaj_lyft[1], tunga=tunga), KAJ_X, KAJ_FOT, KAJ_K)
            if hink_kaj:
                hink(c, KAJ_X, KAJ_FOT - 70, 110)
        for x, y in bär:
            blåbär(c, x, y, 13)
        if pip:
            sätt(c, figur("pip", pip, tunga=tunga), pip_xy[0], pip_xy[1], 0.2)
        return c, b

    def g10():
        c, _ = körscen(mood="glad", bubblor=False)
        kritsvep(c, ORANGE)
        return c
    f["10"] = g10

    def g10a():
        c, _ = träd("skrattar", "forvanad", pella="blinkar", hink_kaj=True)
        pil(c, [(120, 600), (260, 600)])
        return c
    f["10a"] = g10a

    def g11():
        c, _ = träd("slickar", "karleksfull", hink_kaj=True)
        return crop_zoom(c, KAJ_X - 60, KAJ_FOT - 160, 560)
    f["11"] = g11

    def g11a():
        c, _ = träd("karleksfull", "karleksfull", hink_mop=0, kaj_lyft=(FRAM, 0))
        return crop_zoom(c, 720, 500, 1000)
    f["11a"] = g11a

    def g12():
        c, b = träd("forvanad", "forvanad", hink_mop=35)
        pil(c, [mp((300, 520), b), mp((380, 600), b)])
        return c
    f["12"] = g12

    BÄR_GOLV = ((380, 720), (520, 740), (650, 710), (760, 745), (240, 735), (860, 715))

    def g12a():
        c, b = träd("skelogd", "forvanad", hink_mop=80, bär=BÄR_GOLV)
        pil(c, [(560, 700), (760, 690), (900, 720)])
        return c
    f["12a"] = g12a

    def g12b():
        c, b = träd("ledsen", None, tår_=True, bär=BÄR_GOLV)
        return närbild(c, b)
    f["12b"] = g12b

    def g12c():
        c, _ = träd("nyfiken", "nyfiken", bär=BÄR_GOLV)
        sätt(c, figur("pip", "forvanad"), 1210, 840, 0.2)   # bara tofsen och ögonen över golvkanten: ledtråden
        return c
    f["12c"] = g12c

    def g13():
        c, _ = träd("forvanad", "skrattar", pip="ropar", pip_xy=(1150, 720), bär=BÄR_GOLV)
        pil(c, [(1300, 640), (1200, 640)])
        return c
    f["13"] = g13

    def g13a():
        c, _ = träd("skrattar", "skrattar", pip="skrattar", pip_xy=(640, 735), bär=BÄR_GOLV[:4])
        hink(c, 760, 740, 90, full=False)
        return crop_zoom(c, 640, 600, 760)
    f["13a"] = g13a

    def g13b():
        c, _ = träd("ropar", "ropar", pip="blinkar", pip_xy=(640, 735), lyft=(FRAM, 0), kaj_lyft=(FRAM, 0), bär=BÄR_GOLV[:2])
        hink(c, 760, 740, 90)
        return crop_zoom(c, 680, 560, 900)
    f["13b"] = g13b

    def g13c():
        c, _ = träd("njuter", "karleksfull", pip="njuter", pip_xy=(760, 735), kaj_lyft=(FRAM, 0))
        hink(c, 860, 740, 90)
        return crop_zoom(c, 720, 520, 1000)
    f["13c"] = g13c

    def g13d():
        c, _ = träd("slickar", "slickar", pip="slickar", pip_xy=(760, 735), tunga=True)
        return crop_zoom(c, 720, 520, 1000)
    f["13d"] = g13d

    def g13e():
        c, _ = träd("forvanad", "forvanad", pip="forvanad", pip_xy=(760, 735), blå_himmel=True, pella="skrattar")
        pil(c, [(560, 200), (840, 200)])
        return c
    f["13e"] = g13e

    # Discot (14a–16)
    def dans(aktiv=None, kanel_mood="skrattar", alla="skrattar", lyft=(0, 0)):
        c = disco()
        rad = [("gurra", 190, 640, 0.3), ("disa", 420, 650, 0.34), ("tuff", 1170, 660, 0.36)]
        for namn, x, fot, k in rad:
            m = "ropar" if namn == aktiv else alla
            hopp = 50 if namn == aktiv == "gurra" else 0
            sätt(c, figur(namn, m), x, fot - hopp, k)
        lägg_moped(c, 760, 690, 260, mood=kanel_mood, lyft_r=lyft[0], lyft_l=lyft[1])
        return c

    f["14a"] = lambda: dans(kanel_mood="ropar", alla="ropar", lyft=(UPP, UPP))

    def g14b():
        c = dans("gurra")
        pil(c, [(90, 560), (90, 470)])
        return c
    f["14b"] = g14b
    f["14c"] = lambda: dans("disa")

    def g14d():
        c = dans("tuff")
        ringar(c, 1290, 470)
        return c
    f["14d"] = g14d
    f["14e"] = lambda: dans(kanel_mood="ropar", lyft=(UPP, UPP))

    def g15a():
        c = disco()
        lägg_moped(c, W / 2, 700, 300, mood="karleksfull", blick=(0, -1))
        for (x, y), sak in zip(((420, 260), (580, 220), (796, 220), (956, 260)), SAKER):
            bubbla(c, x, y, 66, sakbubbla(sak))
        return c
    f["15a"] = g15a

    def g15b():
        c, b = träd("karleksfull", "karleksfull", pip="karleksfull", pip_xy=(760, 735), blå_himmel=True, pella="blinkar",
                    lyft=(VINKA, 0), kaj_lyft=(VINKA, 0))
        pil(c, [(840, 200), (1100, 180)])
        return c
    f["15b"] = g15b

    def g16():
        c, b = träd("njuter", "karleksfull", pip="karleksfull", pip_xy=(760, 735), blå_himmel=True, lyft=(VINKA, 0))
        cx, cy = mp((KANEL_X, 560), b)
        m = Image.new("L", (W, H), 255)
        pts = [(cx + (190 + 10 * math.sin(a * 9)) * math.cos(a), cy + (190 + 10 * math.sin(a * 9)) * math.sin(a)) for a in np.linspace(0, 2 * math.pi, 120)]
        ImageDraw.Draw(m).polygon(pts, fill=0)
        c.paste((10, 10, 10), mask=m.filter(ImageFilter.GaussianBlur(2)))
        ImageDraw.Draw(c).line(pts + [pts[0]], fill=(250, 244, 230), width=6)
        return c
    f["16"] = g16
    return f


# --- Tabellen ur storyboard.md -----------------------------------------------------------------------------------
def tabell():
    rader = []
    for rad in (HÄR.parent / "storyboard.md").read_text(encoding="utf-8").splitlines():
        if not rad.startswith("| ") or rad.startswith("| #"):
            continue
        k = [x.strip() for x in rad.strip("|").split("|")]
        if len(k) == 6:
            rader.append(dict(zip(("id", "tid", "plats", "bild", "ansikten", "ljud"), k)))
    return rader


def md(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    t = re.sub(r"\[(.+?)\]\((.+?)\)", r"\1", t)
    return re.sub(r"\*(.+?)\*", r"<i>\1</i>", t)


def grupp(i):
    if i in ("01",) or i.startswith("02"):
        return "Intro och kritan"
    if i.startswith(("05", "09")):
        return "Refrängen: bubbelresan"
    if i[:2] in ("03", "04", "06", "07", "08"):
        return "Vägen"
    if i[:2] in ("10", "11", "12", "13"):
        return "Äppelträdet"
    return "Discot och slutet"


def sida(rader, bilder):
    scen = None
    delar = []
    for r in rader:
        g = grupp(r["id"])
        if g != scen:
            if scen:
                delar.append("</div>")
            delar.append(f"<h3>{g}</h3><div class='frames'>")
            scen = g
        img = (f"<img src='frames/{r['id']}.jpg' alt='{html.escape(r['bild'])}' width='960' height='536' loading='lazy'>" if r["id"] in bilder
               else "<div class='ingen'>Samma bilder som 05a–h</div>")
        ljud = f"<div class='song'>{md(r['ljud'])}</div>" if r["ljud"] else ""
        delar.append(f"<figure class='frame'>{img}<figcaption><div class='t'>{r['id']} · {r['tid']} · {md(r['plats'])}</div>"
                     f"{ljud}<p>{md(r['bild'])}</p><p class='ans'>{md(r['ansikten'])}</p></figcaption></figure>")
    delar.append("</div>")
    ph = "".join(f"<li><code>{html.escape(p)}</code></li>" for p in PLATSHÅLLARE)
    return f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Blå sången: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --blue:#2F6FD6;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --blue:#8db4f2; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --blue:#8db4f2; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 var(--body) }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1,h3 {{ font-family:var(--display); margin:0; line-height:1.1 }}
h1 {{ font-size:clamp(34px,6vw,56px); font-weight:800 }} h1 span {{ color:var(--blue) }}
h3 {{ font-size:22px; margin:36px 0 12px }}
.lede {{ color:var(--muted); max-width:70ch; margin:10px 0 0 }}
.frames {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px }}
.frame {{ margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }}
.frame img {{ width:100%; height:auto; display:block }}
.ingen {{ aspect-ratio:1376/768; display:grid; place-items:center; color:var(--muted); background:var(--chip); font:500 13px var(--mono) }}
figcaption {{ padding:12px 14px 14px; display:grid; gap:6px; font-size:14px }} figcaption p {{ margin:0 }}
.t {{ font:500 12px var(--mono); color:var(--muted) }}
.song {{ border-left:3px solid var(--blue); padding-left:10px; font-style:italic }}
.ans {{ color:var(--muted); font-size:13px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
.utkast {{ display:inline-block; margin-top:14px; font:500 12px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:3px 10px }}
</style></head><body><div class="wrap">
<h1>Blå sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 012, första utkast. En stillbild per rad i <code>storyboard.md</code>, byggd av utklippen i <code>assets/</code> med ansiktena ritade i kod (<code>verktyg/ansikten.py</code>) och vita kanter enligt <code>vita-kanter</code>. Pilarna visar rörelsen. Varje bild visar radens tydligaste uttryck; alla uttryck står under bilden.</p>
<span class="utkast">Ingen Suno-tagning än: alla tider är uppskattade (avsnittstid = sångtid + 11 s). {len(bilder)} bilder.</span>
{''.join(delar)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Platshållare i kod</b> tills bilderna finns (byts i <code>bygg.py</code>):<ul>{ph}</ul></li>
<li><b>Refrängen</b> följer <code>refrang-plan.md</code>: blå bubblor ur avgasröret, in i bubbelhavet, upp i en jättebubbla till Himlen (befintlig bakgrund), förbi Pella, sakbubblorna på kroken, plopp, och hem med ett kritsvep i vägens gröna.</li>
<li><b>Äppelträdet</b> är samma förstorade utsnitt av plåten som i 013, så det blir lite mjukare. När himlen blir blå (13e, 15b, 16) målas bara den orange väggen om, trädet ligger kvar.</li>
<li><b>Kaj</b> är svart, så munnen ritas ljus (som <code>munFarg</code> i <code>kit.js</code>). <b>Pip</b> har sin näbb som mun (<code>kycklingen-pip-nabb.png</code>).</li>
<li><b>Discot</b> är 006:s discoplåt omfärgad till ljusblått med en blå kula i kod.</li>
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
    print(f"{len(gjorda)} bilder, utan egen bild: {saknas}, platshållare: {len(PLATSHÅLLARE)}")
