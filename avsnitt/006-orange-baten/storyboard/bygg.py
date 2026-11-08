"""Bygger storyboarden för avsnitt 006 (Orangea sången) av utklippen och bakgrunderna. Kopierad från 005:s bygg.py och bytt:
bilen → båten (gungar på vågorna i stället för att hjulen snurrar), musen → Dinon Disa (med flytväst i kod), kiosken → bryggan
med Ankan Agda, glassberget → jättepumpan, rosa blixt → orange blixt.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg, index.html och tabellen i ../storyboard.md. Kostar inga krediter.
Saker som inte finns i assets/ än ritas som enkla platta former i rätt färg (listas i index.html); kör om när bilderna finns.
Filnamnen som väntas står i ASSET nedan: byt dem där om bilderna får andra namn.
Tiderna kommer ur ../rader.txt (sång.m4a, ca 102 bpm) genom klippet i ../film/klipp-sang.sh: avsnittstid = klipptid + 11 s.
Allt ritat i kod får kritstruktur och ett svagt papperskorn över hela bilden; `--platt` stänger av det.
"""
import html
import json
import math
import random
import runpy
import sys
from pathlib import Path

import numpy as np

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
ORANGE = (242, 107, 29)       # #F26B1D
BÅT_OR = (243, 138, 52)       # båtens skrov
KONTUR_OR = (176, 66, 12)     # mörkorange kritkontur runt båten (båten(kontur=True))
HIMMEL = (168, 220, 242)
VATTEN = (86, 168, 214)
STRAND = (150, 200, 110)
VÄST = (214, 84, 20)  # mörkare än båten (Sanna, 2026-11-05), så att västen syns mot skrovet
random.seed(6)
PLATSHÅLLARE = []

# Väntade filer från assets-sessionen (orange-assets). Saknas en fil ritas en platshållare i kod.
ASSET = {
    "sjön": "bakgrunder/sjon/sjon.png",
    "bryggan": "bakgrunder/bryggan/bryggan.png",
    "jättepumpan": "bakgrunder/jattepumpan/jattepumpan.png",
    "jättepumpan-topp": "bakgrunder/jattepumpan/cut/jattepumpan-topp.png",
    "skrov": "rekvisita/orange-baten/cut/orange-baten-skrov.png",      # skrovet framför Disa
    "insida": "rekvisita/orange-baten/cut/orange-baten-insida.png",    # bortre relingen bakom henne
    "apelsin": "rekvisita/apelsin.png",
    "fisk": "bakgrunder/sjon-saker/fisk-orange.png",
    "pumpa": "bakgrunder/sjon-saker/pumpa.png",
    "fågel": "bakgrunder/sjon-saker/fagel-orange.png",
    "väst": "bakgrunder/sjon-saker/vast-orange.png",  # flytvästen som egen sak i discots båge
}


def bild(nyckel, ersätt):
    """Bilden ur assets/ om den finns, annars en platshållare (och den antecknas)."""
    p = A / ASSET[nyckel]
    if p.exists():
        return Image.open(p).convert("RGBA")
    PLATSHÅLLARE.append(ASSET[nyckel])
    return ersätt()


def tom(w=1024, h=1024):
    im = Image.new("RGBA", (w, h))
    return im, ImageDraw.Draw(im)


# --- Kritstruktur: det som ritas i kod fylls med äkta kritkorn och får lite ojämna kanter (som 005) ---------------
KRITA = "--platt" not in sys.argv
_g = Image.open(A / "bakgrunder" / "glasskiosken" / "glasskiosken.png").convert("L").crop((480, 0, 1376, 560)).resize((W, H))
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
    kx, ky = KORN, BRUS
    if w > W or h > H:  # större än bilden (1024-rutor med TOPP): korn och brus upprepas
        kx = np.tile(KORN, (h // H + 1, w // W + 1))[:h, :w]
        ky = np.tile(BRUS, (h // H + 1, w // W + 1))[:h, :w]
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(oskarp)), float) / 255
    m = np.clip((m - 0.5 + vick * ky[:h, :w]) * 4 + 0.5, 0, 1)
    t = kx[:h, :w]
    m *= np.clip(0.35 + 0.9 * t, 0, 1) * alpha
    färg = np.clip(np.array(col[:3], float) * (0.9 + 0.2 * t[..., None]), 0, 255).astype(np.uint8)
    lag = Image.fromarray(färg)
    if c.mode == "RGBA":
        lag = lag.convert("RGBA")
        lag.putalpha(Image.fromarray((m * 255).astype(np.uint8)))
        c.alpha_composite(lag)
    else:
        c.paste(lag, mask=Image.fromarray((m * 255).astype(np.uint8)))


def ritmask(c):
    m = Image.new("L", c.size)
    return m, ImageDraw.Draw(m)


def papperskorn(im):
    if not KRITA:
        return im
    a = np.asarray(im.convert("RGB"), float) * (1 - 0.12 * (1 - KORN[..., None]))
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def vit_kant(im, r=15):
    """Klistermärkets vita kant runt en RGBA-bild."""
    under = Image.new("RGBA", im.size, (255, 255, 255, 0))
    under.putalpha(im.getchannel("A").filter(ImageFilter.MaxFilter(r)))
    under.alpha_composite(im)
    return under


# --- Platshållare i kod (byts mot bilderna ur ASSET) ----------------------------------------------------------
def ph_sjön():
    """Sjön: ljusblå himmel, en låg grön strand långt bort och vatten som golv, med vita vågstreck."""
    c = Image.new("RGB", (W, H), HIMMEL)
    m, d = ritmask(c)
    pts = [(x, 392 - 18 * math.sin(x / 170) - 10 * math.sin(x / 61)) for x in range(-20, W + 40, 20)]
    d.polygon(pts + [(W + 40, 430), (-20, 430)], fill=255)
    kritfyll(c, m, STRAND, vick=0.3)
    m, d = ritmask(c)
    d.rectangle((0, 418, W, H), fill=255)
    kritfyll(c, m, VATTEN, vick=0.15, oskarp=1)
    rnd = random.Random(3)
    m, d = ritmask(c)
    for _ in range(70):  # vågor: små vita bågar, tätare nära
        y = rnd.uniform(440, H)
        x, r = rnd.uniform(-40, W), 14 + (y - 430) / 14
        d.arc((x - r, y - r * 0.5, x + r, y + r * 0.5), 200, 340, fill=255, width=4)
    kritfyll(c, m, (215, 238, 248), alpha=0.8, vick=0.15, oskarp=0.8)
    return c


def ph_bryggan():
    """Bryggan: samma sjö, och en träbrygga som kommer in från höger, med stolpar ner i vattnet."""
    c = sjön_plåt().copy()
    m, d = ritmask(c)
    for x in (770, 900, 1030, 1160, 1290):
        d.rectangle((x - 16, 470, x + 16, 585), fill=255)
    kritfyll(c, m, (120, 82, 52), vick=0.2)
    m, d = ritmask(c)
    d.polygon([(700, BRYGG_Y), (W + 10, BRYGG_Y - 18), (W + 10, BRYGG_Y + 34), (690, BRYGG_Y + 46)], fill=255)
    kritfyll(c, m, (190, 140, 92), vick=0.2)
    m, d = ritmask(c)
    for x in range(760, W, 70):  # plankorna
        d.line((x, BRYGG_Y - 4, x - 6, BRYGG_Y + 40), fill=255, width=4)
    kritfyll(c, m, (140, 98, 62), alpha=0.8, vick=0.1, oskarp=0.8)
    return c


def ph_jättepumpan():
    """Jättepumpan mot ljusblå himmel, ca 2/3 av bildhöjden, med skåror och en grön stjälk (toppen vid PUMP_TOPP)."""
    c = Image.new("RGB", (W, H), HIMMEL)
    cx, ty = PUMP_TOPP
    for dx, rx, col in ((-300, 300, (232, 112, 30)), (300, 300, (232, 112, 30)), (0, 360, (246, 136, 44))):
        m, d = ritmask(c)
        d.ellipse((cx + dx - rx, ty + 10, cx + dx + rx, ty + 10 + 2 * 360), fill=255)
        kritfyll(c, m, col, vick=0.25)
    m, d = ritmask(c)
    for dx in (-180, 180):
        d.arc((cx + dx - 140, ty + 40, cx + dx + 140, ty + 700), 120 if dx < 0 else -60, 240 if dx < 0 else 60, fill=255, width=9)
    kritfyll(c, m, (196, 82, 20), alpha=0.8, vick=0.15, oskarp=1)
    m, d = ritmask(c)
    d.polygon([(cx - 26, ty + 26), (cx + 22, ty + 26), (cx + 36, ty - 40), (cx - 6, ty - 46)], fill=255)
    kritfyll(c, m, (92, 150, 70), vick=0.2)
    return c


def ph_skrov():
    """Skrovet: ett öppet orange skrov med fören åt höger, en rund ventil och en mörkare rand (1024-ruta)."""
    im, _ = tom()
    m = Image.new("L", im.size)
    d = ImageDraw.Draw(m)
    d.rectangle((95, 600, 900, 690), fill=255)
    d.chord((95, 470, 930, 800), 0, 180, fill=255)
    d.polygon([(860, 600), (985, 565), (930, 700), (860, 720)], fill=255)  # fören, lite högre
    kritfyll(im, m, BÅT_OR, vick=0.25)
    m, d = ritmask(im)
    d.line((110, 655, 950, 640), fill=255, width=16)
    kritfyll(im, m, (214, 92, 26), alpha=0.9, vick=0.15, oskarp=1)
    m, d = ritmask(im)
    d.ellipse((660, 640, 730, 710), fill=255)
    kritfyll(im, m, (255, 255, 255), vick=0.1, oskarp=1)
    m, d = ritmask(im)
    d.ellipse((672, 652, 718, 698), fill=255)
    kritfyll(im, m, (150, 210, 238), vick=0.1, oskarp=1)
    return vit_kant(im, 13)


def ph_insida():
    """Bortre relingen (syns bakom Disa), flaggstången i aktern och en liten grå motor (putt, putt)."""
    im, _ = tom()
    m, d = ritmask(im)
    d.rounded_rectangle((120, 548, 900, 612), 26, fill=255)
    kritfyll(im, m, (204, 88, 24), vick=0.2)
    m, d = ritmask(im)
    d.rounded_rectangle((28, 585, 118, 700), 20, fill=255)
    kritfyll(im, m, (128, 128, 136), vick=0.2)
    m, d = ritmask(im)
    d.line((150, 610, 150, 300), fill=255, width=14)
    kritfyll(im, m, (110, 76, 50), vick=0.15, oskarp=1)
    m, d = ritmask(im)
    d.polygon([(158, 300), (300, 340), (158, 390)], fill=255)  # flaggan i kod (005:s rosa flagga omfärgad saknas än)
    kritfyll(im, m, ORANGE, vick=0.2)
    return vit_kant(im, 13)


def ph_apelsin():
    im, d = tom(400, 420)
    m, dm = ritmask(im)
    dm.ellipse((20, 40, 380, 400), fill=255)
    kritfyll(im, m, (247, 140, 30), vick=0.25)
    m, dm = ritmask(im)
    for x, y in ((120, 150), (240, 130), (300, 250), (160, 300), (220, 220), (90, 240)):
        dm.ellipse((x - 6, y - 6, x + 6, y + 6), fill=255)
    kritfyll(im, m, (214, 104, 22), vick=0.1, oskarp=0.6)
    m, dm = ritmask(im)
    dm.polygon([(200, 46), (250, 0), (300, 30), (230, 60)], fill=255)
    kritfyll(im, m, (92, 160, 70), vick=0.15)
    return vit_kant(im, 11)


def ph_fisk():
    im, d = tom(520, 300)
    m, dm = ritmask(im)
    dm.ellipse((110, 40, 500, 260), fill=255)
    dm.polygon([(150, 150), (10, 50), (40, 150), (10, 250)], fill=255)
    kritfyll(im, m, (247, 128, 30), vick=0.25)
    m, dm = ritmask(im)
    dm.ellipse((400, 110, 440, 150), fill=255)
    kritfyll(im, m, INK, vick=0.1, oskarp=0.6)
    return vit_kant(im, 11)


def ph_pumpa():
    im, d = tom(620, 520)
    for dx, col in ((-120, (232, 112, 30)), (120, (232, 112, 30)), (0, (246, 136, 44))):
        m, dm = ritmask(im)
        dm.ellipse((150 + dx, 90, 470 + dx, 500), fill=255)
        kritfyll(im, m, col, vick=0.25)
    m, dm = ritmask(im)
    dm.polygon([(290, 100), (330, 100), (350, 20), (300, 16)], fill=255)
    kritfyll(im, m, (92, 150, 70), vick=0.2)
    return vit_kant(im, 11)


def ph_korg():
    """Agdas fruktkorg: en rund flätad korg med handtag, med ett grönt äpple och en gul banan (apelsinen läggs i separat).
    Sanna, 2026-11-05: "fruit basket needs work" (den gamla såg ut som en skål på pinnben). Bakifrån: handtaget, frukten,
    korgen med flätningen och kanten överst."""
    im, d = tom(520, 360)
    m, dm = ritmask(im)
    dm.arc((76, 14, 444, 386), 180, 360, fill=255, width=30)
    kritfyll(im, m, (150, 98, 52), vick=0.2)  # handtaget bakom frukten
    äpple, banan = A / "arkiv/rekvisita/applet-gront.png", A / "rekvisita/banan.png"
    if äpple.exists() and banan.exists():  # de riktiga utklippen (Flow, 2026-11-05) i korgen, korgen själv i kod
        for f, box in ((banan, (250, 20, 480, 240)), (äpple, (130, 70, 300, 240))):
            b = Image.open(f).convert("RGBA"); b = b.crop(b.getbbox())
            k = min((box[2] - box[0]) / b.width, (box[3] - box[1]) / b.height)
            b = b.resize((round(b.width * k), round(b.height * k)), Image.LANCZOS)
            im.alpha_composite(b, (box[0] + (box[2] - box[0] - b.width) // 2, box[3] - b.height))
    else:
        m, dm = ritmask(im)
        dm.ellipse((150, 90, 290, 230), fill=255)
        kritfyll(im, m, (120, 196, 70), vick=0.25)  # grönt äpple
        m, dm = ritmask(im)
        dm.arc((250, 10, 500, 240), 30, 150, fill=255, width=46)
        kritfyll(im, m, (250, 214, 70), vick=0.25)  # gul banan
    m, dm = ritmask(im)
    dm.polygon([(36, 200), (484, 200), (440, 330), (410, 350), (110, 350), (80, 330)], fill=255)
    kritfyll(im, m, (190, 130, 72), vick=0.25)  # korgen
    m, dm = ritmask(im)
    for rad, y in enumerate(range(232, 345, 30)):  # flätningen: liggande band och korta snedstreck som byter håll varje rad
        dm.line((60 + (y - 200) * 0.3, y, 460 - (y - 200) * 0.3, y), fill=255, width=6)
        for x in range(90 + 18 * (rad % 2), 440, 36):
            dm.line((x, y - 24, x + (12 if rad % 2 else -12), y - 4), fill=255, width=5)
    kritfyll(im, m, (132, 84, 44), alpha=0.85, vick=0.1, oskarp=0.6)
    m, dm = ritmask(im)
    dm.rounded_rectangle((26, 186, 494, 218), 16, fill=255)
    kritfyll(im, m, (214, 160, 98), vick=0.2)  # kanten
    return vit_kant(im, 11)


def place(canvas, im, cx, ground, h, rot=0, flip=False):
    """Klistrar in med underkanten på `ground`. Returnerar (skala, x0, y0) för bildens egna koordinater."""
    box = im.getbbox()
    s = h / (box[3] - box[1])
    big = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    if flip:
        big = big.transpose(Image.FLIP_LEFT_RIGHT)
    if rot:
        big = big.rotate(rot, resample=Image.BICUBIC, center=(big.width / 2, box[3] * s))
    x0 = round(cx - (box[0] + box[2]) / 2 * s)
    y0 = round(ground - box[3] * s)
    if canvas.mode == "RGBA":
        lag = Image.new("RGBA", canvas.size)
        lag.paste(big, (x0, y0), big)
        canvas.alpha_composite(lag)
    else:
        canvas.paste(big, (x0, y0), big)
    return s, x0, y0


# --- Platserna (plåtarna) -------------------------------------------------------------------------------------
BRYGG_Y = 470        # bryggans däck (överkant) i bryggans plåt
PUMP_TOPP = (688, 270)  # jättepumpans topp: mitt och överkant
_plåt = {}


def sjön_plåt():
    if "sjön" not in _plåt:
        _plåt["sjön"] = bild("sjön", ph_sjön).convert("RGB").resize((W, H))
    return _plåt["sjön"]


def trä(p):
    """Trätextur på bryggans plankor och ben (Sanna, 2026-11-05): liggande kritdrag i en mörkare och en ljusare brun,
    bara där bilden är trä (brunt: röd tydligt över blå)."""
    import numpy as np
    a = np.asarray(p, float)
    trä = ((a[..., 0] > 140) & (a[..., 0] - a[..., 2] > 55)).astype(float)
    trä = np.asarray(Image.fromarray((trä * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.2)), float) / 255
    rng = np.random.default_rng(11)
    drag = np.asarray(Image.fromarray((rng.normal(0, 1, (p.height // 2, p.width // 40)) * 50 + 128).clip(0, 255).astype("uint8")).resize(p.size, Image.BICUBIC), float) / 50 - 2.56
    fint = rng.normal(0, 1, (p.height, p.width)) * 0.35
    v = drag + fint   # < 0 mörkt drag, > 0 ljust
    mörk, ljus = np.array([150, 104, 64]), np.array([236, 196, 146])
    k = (np.abs(v) * 0.22).clip(0, 0.35)[..., None] * trä[..., None]
    ut = np.where(v[..., None] < 0, a * (1 - k) + mörk * k, a * (1 - k) + ljus * k)
    return Image.fromarray(ut.clip(0, 255).astype("uint8"))


def bryggan_plåt(lång=False):
    if "bryggan" not in _plåt:
        _plåt["bryggan"] = trä(bild("bryggan", ph_bryggan).convert("RGB").resize((W, H)))
    if lång and "lång" not in _plåt:
        # bryggan förlängd åt vänster (Sanna, 2026-11-05: mer plats för djuren när båten är borta): biten med ett ben
        # mitt på däcket upprepas två gånger, himlen och vattnet till vänster flyttas med. x i bryggans 1376-bild.
        p = _plåt["bryggan"]; k = W / 1376
        x0, a, b = round(742 * k), round(900 * k), round(1125 * k)
        n = 2 * (b - a)
        c = p.copy()
        c.paste(p.crop((n, 0, x0, H)), (0, 0))   # himlen och vattnet vänster om bryggan, flyttade åt vänster
        ramp = Image.linear_gradient("L").rotate(90).resize((60, H))   # 60 px övertoning vid varje skarv
        for x, bit in ((x0 - n, p.crop((x0, 0, a + 30, H))), (a - n, p.crop((a - 30, 0, b + 30, H))), (a - n + b - a, p.crop((a - 30, 0, b + 30, H))), (a, p.crop((a - 30, 0, W, H)))):
            m = Image.new("L", bit.size, 255)
            if x != x0 - n:
                m.paste(ramp, (0, 0))
            c.paste(bit, (x - (0 if x == x0 - n else 30), 0), m)
        _plåt["lång"] = c
    return _plåt["lång" if lång else "bryggan"]


# --- Figurer: kropp, armar ur riggen och ansiktet ur verktyg/ansikten.py --------------------------------------
MUS = runpy.run_path(str(ROT / "verktyg" / "rita-lemmar-mus.py"))  # musen Mille (statist) med de ritade lemmarna
rita_ansikte = MUS["ansikten"].rita
MUS["ansikten"].KRITA = KRITA
DJUROGON = [(414, 401), (605, 399)]
ANSIKTE = {
    "grodan-gurra": dict(ogon=[(337, 262), (686, 260)], ogonskala=1.45, mun=(512, 392), munskala=1.4, munbredd=2.6),
    "dinon-disa": dict(ogon=[(413, 401), (604, 398)], mun=(511, 466), munskala=1.3),
    "ankan-agda": dict(ogon=[(412, 400), (606, 396)], mun=(509, 478), munskala=1.0),  # munnen hamnar under näbben
}
RIGG = {"dinon-disa": "dinon-disa-rigg-lemmar.json"}  # ritade lemmar (verktyg/rita-lemmar-dino.py)
SPETS = {"grodan-gurra": {"arm-r": (895, 655), "arm-l": (110, 660)}}
NÄBB = Image.open(A / "karaktarer/ankan-agda/cut/ankan-agda-nabb.png").convert("RGBA")
_spets = {}


def spets_av(fil, piv):
    """Handen = den bit av armbilden som ligger längst från vridpunkten."""
    if fil not in _spets:
        ys, xs = np.nonzero(np.asarray(Image.open(fil).getchannel("A")) > 128)
        i = np.argmax((xs - piv[0]) ** 2 + (ys - piv[1]) ** 2)
        _spets[fil] = (float(xs[i]), float(ys[i]))
    return _spets[fil]


def vinkel_mot(piv, spets, mål):
    return math.degrees(math.atan2(piv[1] - mål[1], mål[0] - piv[0]) - math.atan2(piv[1] - spets[1], spets[0] - piv[0]))


def hand(piv, spets, vinkel):
    a = math.radians(vinkel)
    dx, dy = spets[0] - piv[0], spets[1] - piv[1]
    return piv[0] + dx * math.cos(a) + dy * math.sin(a), piv[1] - dx * math.sin(a) + dy * math.cos(a)


def lägg(canvas, im, cx, ground, h, rot=0):
    lag = Image.new("RGBA", canvas.size)
    place(lag, im, cx, ground, h, rot=rot)
    canvas.alpha_composite(lag)


def väst(c):
    """Disas orange flytväst i kod, öppen (Sanna, 2026-11-05): två framstycken över axlarna och ner längs sidorna,
    klippta efter kroppens siluett, med magen fri i mitten, ett vitt reflexband på varje och en vit kant. 1024-rutan."""
    kropp = Image.open(A / "karaktarer/dinon-disa/cut/dinon-disa-body.png").getchannel("A").point(lambda v: 255 if v > 128 else 0)
    kropp = kropp.filter(ImageFilter.MinFilter(17))
    m, d = ritmask(c)
    d.rounded_rectangle((150, 440, 392, 705), 70, fill=255)   # vänster framstycke (axeln och sidan)
    d.rounded_rectangle((632, 440, 796, 705), 70, fill=255)   # höger framstycke, slutar före svansen
    m = ImageChops.multiply(m, kropp)
    vit = Image.new("RGBA", c.size, (255, 255, 255, 0))
    vit.putalpha(m.filter(ImageFilter.MaxFilter(11)))
    c.alpha_composite(vit)
    kritfyll(c, m, VÄST, vick=0.15, oskarp=1.2)
    band, d = ritmask(c)
    d.rectangle((0, 612, 1024, 636), fill=255)
    band = ImageChops.multiply(band, m.filter(ImageFilter.MinFilter(9)))
    kritfyll(c, band, (255, 255, 255), vick=0.1, oskarp=0.8)


ARM_LÄNGD = {}  # dinons armar är nu ritade i kod (verktyg/rita-lemmar-dino.py) och behöver inte förlängas
_armar = {}


def armbild(namn, mapp, rig, d):
    """Armen utan ledbiten som ligger innanför kroppen (som masken i kit.js), förlängd och med vit klistermärkeskant,
    så att en lyft arm syns mot kroppen i samma färg."""
    if (namn, d) not in _armar:
        im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
        piv = rig["delar"][d]["vridpunkt"]
        if not rig.get("ritadeDelar"):
            kropp = Image.open(mapp / rig["kropp"]).getchannel("A").filter(ImageFilter.MinFilter(15))
            im.putalpha(ImageChops.subtract(im.getchannel("A"), kropp))
        k = ARM_LÄNGD.get(namn, 1)
        if k != 1:
            im = im.transform(im.size, Image.AFFINE, (1 / k, 0, piv[0] * (1 - 1 / k), 0, 1 / k, piv[1] * (1 - 1 / k)), Image.BICUBIC)
        _armar[namn, d] = vit_kant(im, 9)
    return _armar[namn, d]


def figur(namn, mood="glad", blick=(0, 0), arm_r=0, arm_l=0, peka_r=None, peka_l=None, håll=None, ben=True, lager="allt",
          med_väst=None, nick=0):
    """En figur ur riggen med ansiktet ritat. arm_* = vinkel (grader moturs), peka_* = punkt armen pekar mot.
    håll = {"r": (bild, höjd)}: en sak i den handen. lager: allt, kropp (utan armar) eller armar (bara armarna).
    med_väst: Disas flytväst (standard för dinon). nick: ögon och mun så många px lägre (hon tittar ner).
    ben="sitter": benen förkortade (sitter på kanten). Delar som riggen saknar hoppas över."""
    mapp = A / "karaktarer" / namn
    rig = json.loads((mapp / RIGG.get(namn, f"{namn}-rigg.json")).read_text())
    c = Image.new("RGBA", (1024, 1024))
    leder = {}
    for d, v, p in (("arm-r", arm_r, peka_r), ("arm-l", arm_l, peka_l)):
        if d not in rig["delar"]:
            continue
        piv = tuple(rig["delar"][d]["vridpunkt"])
        spets = SPETS.get(namn, {}).get(d) or spets_av(mapp / rig["delar"][d]["fil"], piv)
        leder[d] = (piv, spets, vinkel_mot(piv, spets, p) if p else v)

    def arm(d):
        if d not in leder:
            return
        piv, spets, v = leder[d]
        c.alpha_composite(armbild(namn, mapp, rig, d).rotate(v, resample=Image.BICUBIC, center=piv))
        if håll and d[-1] in håll:
            im, h = håll[d[-1]]
            hx, hy = hand(piv, spets, v)
            lägg(c, im, hx, hy + h * 0.45, h)

    if lager != "armar":
        if ben:
            for d in ("leg-l", "leg-r"):
                if d in rig["delar"]:
                    im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
                    if ben == "sitter":  # benen hänger fram över bryggkanten: förkortade till hälften mot höften
                        y = rig["delar"][d]["vridpunkt"][1]
                        im = im.transform(im.size, Image.AFFINE, (1, 0, 0, 0, 2, -y), Image.BICUBIC)
                    c.alpha_composite(im)
        c.alpha_composite(Image.open(mapp / rig["kropp"]).convert("RGBA"))
        if med_väst if med_väst is not None else namn == "dinon-disa":
            väst(c)
        ans = ANSIKTE[namn]
        if nick:
            ans = dict(ans, ogon=[(x, y + nick) for x, y in ans["ogon"]], mun=(ans["mun"][0], ans["mun"][1] + nick))
        rita_ansikte(c, mood, (blick[0] / 9, blick[1] / 9), **ans)
        if namn == "ankan-agda":
            c.alpha_composite(NÄBB)
        if lager == "kropp":
            return c
    arm("arm-l")
    arm("arm-r")
    return c


def disa(mood="glad", **kw):
    return figur("dinon-disa", mood, **kw)


def musen(mood="glad", arm_r=None, arm_l=None):
    v = MUS["VILA"]
    return MUS["mus"](mood, arm_r if arm_r is not None else v, arm_l if arm_l is not None else v)


FIA = Image.open(A / "karaktarer/fjarilen-fia/cut/fia.png").convert("RGBA")
DISA_ÖGON_Y = 400


# --- Saker ----------------------------------------------------------------------------------------------------
SKROV = bild("skrov", ph_skrov)
INSIDA = bild("insida", ph_insida)
APELSIN = bild("apelsin", ph_apelsin)
FISK_BAR = bild("fisk", ph_fisk)   # utan ansikte: lager/fisk.png, scenerna ritar ansiktet i kod (ansikten.FISK)
# Fiskens glada ansikte (Sanna, 2026-11-05: "face to fish"): ett öga och ett leende vid nosen, uppmätt i fiskens 1024-ruta.
# Samma mått som ansikten.FISK i scener/ansikten.js.
FISK_ANSIKTE = dict(ogon=[(760, 445)], ogonskala=1.9, mun=(808, 565), munskala=1.8)


def fisk_glad(humör="glad"):
    im = FISK_BAR.copy()
    if FISK_BAR.size == (1024, 1024):   # inte på platshållaren
        rita_ansikte(im, humör, (0.5, 0), **FISK_ANSIKTE)
    return im


FISK = fisk_glad()
PUMPA = bild("pumpa", ph_pumpa)


def fågel(flax=1.0, vänster=True):
    """Måsen från sidan (vänster: nosen åt vänster, mot Disa; bilderna har nosen åt höger), ur sina delar (fagel/fagel-rigg.json; Sanna valde den 2026-11-05, "a longer sea bird").
    Vingen bakom kroppen, ihoptryckt i höjdled runt axeln: flax 1 = uppe som den är ritad, 0,3 = nästan rakt ut. Inte lägre:
    utan vinge ovanför ser måsen ut som en fisk.
    Sedan kroppen och ögat (ritat här med samma mått som figurernas kodögon)."""
    mapp = A / "bakgrunder/sjon-saker/fagel"
    rigg = json.loads((mapp / "fagel-rigg.json").read_text())
    im = Image.new("RGBA", (1024, 1024))
    v = rigg["delar"]["vinge"]
    py = v["vridpunkt"][1]
    k = max(flax, 0.12)
    vinge = Image.open(mapp / v["fil"]).convert("RGBA")
    # två vingar (Sanna, 2026-11-05): den bortre en bit bakåt och uppåt och mörkare, som VINGE2 i scener/baten.js
    bortre = ImageEnhance.Brightness(vinge).enhance(0.8).transform(vinge.size, Image.AFFINE, (1, 0, 0, 0, 1 / k, py - py / k), resample=Image.BICUBIC)
    im.alpha_composite(bortre, (-70, -25))
    im.alpha_composite(vinge.transform(vinge.size, Image.AFFINE, (1, 0, 0, 0, 1 / k, py - py / k), resample=Image.BICUBIC))
    im.alpha_composite(Image.open(mapp / rigg["kropp"]).convert("RGBA"))
    d = ImageDraw.Draw(im); (x, y), sk = (742, 640), 1.45   # större än riggens, som FAGEL_OGA i scener/baten.js
    r, rp = 26 * sk, 10 * sk
    d.ellipse((x - r, y - r, x + r, y + r), fill=(255, 255, 255, 255), outline=INK, width=round(6 * sk))
    d.ellipse((x + 5 * sk - rp, y - rp, x + 5 * sk + rp, y + rp), fill=INK)
    mx, my = 770, 712   # leendet under näbbens rot (FAGEL_MUN i scener/baten.js)
    d.arc((mx - 40, my - 32, mx + 40, my + 14), 20, 160, fill=INK, width=10)
    return im.transpose(Image.FLIP_LEFT_RIGHT) if vänster else im


FÅGEL = fågel()   # orange sak 2 (Sanna, 2026-11-05: i stället för pumpan); vingen uppe = den flyger
VÄSTBILD = bild("väst", lambda: disa().crop((260, 440, 770, 820)))
KORG = ph_korg()  # korgen i kod med det riktiga äpplet och bananen


def halva():
    """En halva av den skalade apelsinen, delad i klyftor (Flow, 2026-11-05), som Disa och Agda håller.
    Saknas bilden: den runda snittytan i kod."""
    f = A / "arkiv/rekvisita/apelsin-klyftor-vanster.png"
    if f.exists():
        return Image.open(f).convert("RGBA")
    im, d = tom(300, 300)
    m, dm = ritmask(im)
    dm.ellipse((20, 20, 280, 280), fill=255)
    kritfyll(im, m, (247, 140, 30), vick=0.2)
    m, dm = ritmask(im)
    dm.ellipse((44, 44, 256, 256), fill=255)
    kritfyll(im, m, (252, 186, 90), vick=0.15)
    m, dm = ritmask(im)
    for a in range(0, 360, 40):
        dm.line((150, 150, 150 + 100 * math.cos(math.radians(a)), 150 + 100 * math.sin(math.radians(a))), fill=255, width=5)
    kritfyll(im, m, (255, 244, 220), vick=0.1, oskarp=0.6)
    return vit_kant(im, 9)


HALVA = halva()

TOPP = 300            # luft ovanför båten så att Disas huvud får plats
DISA_K, DISA_X, DISA_Y = 0.6, 520, 700  # Disa i båten: hennes (512, 926) på båtens (520, 700), skala 0,6
# Ingen ratt: armarna i vila hänger ner till relingen, så att tassarna ligger på båtens kant (ritas framför skrovet).


def båten(med_disa=True, rot=0, vit=False, kontur=False, **kw):
    """Båten i lager: bortre relingen och flaggan → Disa (utan armar) → skrovet → Disas armar.
    rot: Disa lutar (grader moturs). vit: tjockare vit kant runt allt. kontur: mask för skrovets mörkorange kontur i .kontur."""
    c = Image.new("RGBA", (1024, 1024 + TOPP))
    c.alpha_composite(INSIDA, (0, TOPP))
    lag = []
    if med_disa:
        for lager in ("kropp", "armar"):
            m = disa(lager=lager, ben=False, **kw).resize((round(1024 * DISA_K),) * 2, Image.LANCZOS)
            stor = Image.new("RGBA", c.size)
            stor.alpha_composite(m, (round(DISA_X - 512 * DISA_K), round(TOPP + DISA_Y - 926 * DISA_K)))
            if rot:
                stor = stor.rotate(rot, resample=Image.BICUBIC, center=(DISA_X, TOPP + DISA_Y - 60))
            lag.append(stor)
        c.alpha_composite(lag[0])
    c.alpha_composite(SKROV, (0, TOPP))
    for l in lag[1:]:
        c.alpha_composite(l)
    ring = None
    if kontur:
        sk = Image.new("L", c.size)
        sk.paste(SKROV.getchannel("A").point(lambda v: 255 if v > 200 else 0), (0, TOPP))
        sk = sk.filter(ImageFilter.MinFilter(13))
        ring = ImageChops.subtract(sk, sk.filter(ImageFilter.MinFilter(15)))
        if lag:
            ring = ImageChops.subtract(ring, lag[1].getchannel("A").point(lambda v: 255 if v > 40 else 0))
    if vit:
        c = vit_kant(c, 15)
    c.kontur = ring
    return c


def disa_punkt(bpos, px=511, py=430):
    """Var en punkt på Disa (hennes 1024-koordinater, nosen/munnen som standard) hamnar på bilden."""
    s, x0, y0 = bpos
    return x0 + (DISA_X + (px - 512) * DISA_K) * s, y0 + (TOPP + DISA_Y + (py - 926) * DISA_K) * s


# --- Ritat i kod ----------------------------------------------------------------------------------------------
def arrow(canvas, pts, col=INK):
    m, d = ritmask(canvas)
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        n = max(1, int(math.dist((x1, y1), (x2, y2)) / 22))
        for i in range(0, n, 2):
            a, b = i / n, min(1, (i + 1) / n)
            d.line((x1 + (x2 - x1) * a, y1 + (y2 - y1) * a, x1 + (x2 - x1) * b, y1 + (y2 - y1) * b), fill=255, width=7)
    (x1, y1), (x2, y2) = pts[-2], pts[-1]
    ang = math.atan2(y2 - y1, x2 - x1)
    for da in (2.6, -2.6):
        d.line((x2, y2, x2 + 26 * math.cos(ang + da), y2 + 26 * math.sin(ang + da)), fill=255, width=7)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def båge(cx, cy, r, a0, a1, steg=15, ry=None):
    ry = ry or r
    return [(cx + r * math.cos(math.radians(a)), cy - ry * math.sin(math.radians(a))) for a in np.arange(a0, a1 + (1 if a1 > a0 else -1), steg if a1 > a0 else -steg)]


def streck(canvas, x, y, r=40, n=5, start=-150, slut=-30, col=INK, w=5):
    m, d = ritmask(canvas)
    for i in range(n):
        a = math.radians(start + (slut - start) * i / max(1, n - 1))
        d.line((x + r * math.cos(a), y + r * math.sin(a), x + r * 1.7 * math.cos(a), y + r * 1.7 * math.sin(a)), fill=255, width=w + 1)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def vift(canvas, x, y, r=34, col=INK):
    m, d = ritmask(canvas)
    for k in (1, 1.5):
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 300, 360, fill=255, width=6)
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 180, 240, fill=255, width=6)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def stänk(c, x, y, r=40):
    """Vattenstänk: vita droppar i en solfjäder uppåt och en ring på vattnet (plask)."""
    m, d = ritmask(c)
    for i in range(6):
        a = math.radians(-160 + i * 28)
        px, py = x + r * 1.3 * math.cos(a), y + r * 1.3 * math.sin(a)
        d.ellipse((px - 9, py - 12, px + 9, py + 12), fill=255)
    d.ellipse((x - r * 1.4, y - r * 0.3, x + r * 1.4, y + r * 0.3), outline=255, width=6)
    kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


REGNBÅGE = [(198, 40, 40), (31, 105, 173), (106, 44, 145), (176, 24, 95), (46, 125, 50), (0, 105, 110)]


def color_text(canvas, cy, text, size, färger=REGNBÅGE):
    f = font(size)
    d = ImageDraw.Draw(canvas)
    x = W / 2 - d.textlength(text, font=f) / 2
    for i, ch in enumerate(text):
        d.text((x, cy + (8 if i % 2 else -8)), ch, font=f, fill=färger[i % len(färger)], anchor="lm", stroke_width=6, stroke_fill=(255, 255, 255))
        x += d.textlength(ch, font=f)


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


def paper():
    return Image.new("RGB", (W, H), PAPER)


def krita(c, x, y):
    """Kritan utan ansikte, spetsen i (x, y)."""
    m, d = ritmask(c)
    d.polygon([(x, y), (x + 100, y - 100), (x + 130, y - 70), (x + 30, y + 30)], fill=255)
    kritfyll(c, m, (246, 150, 70))


def skugga(c, cx, y, w, hopp, col=(70, 64, 60)):
    """Skuggan står kvar när figuren hoppar och blir mindre (kritklotter, som 005)."""
    k = 0.6 if hopp else 1
    rx, ry = w * k / 2, 16 * k
    m, d = ritmask(c)
    if not KRITA:
        d.ellipse((cx - rx, y - ry, cx + rx, y + ry), fill=255)
    for x in np.arange(cx - rx * 0.95, cx + rx * 0.95, 9) if KRITA else ():
        hh = ry * math.sqrt(max(0, 1 - ((x - cx) / rx) ** 2))
        d.line((x - 7, y + hh, x + 7, y - hh), fill=255, width=4)
    kritfyll(c, m, col, alpha=0.3, vick=0.15, oskarp=1)


# --- A · Sjön: körscenen ----------------------------------------------------------------------------------------
# Båten står på nedre tredjedelen med mitten vid vänstra tredjedelslinjen och kör in i bilden åt höger. Det orange som
# dyker upp (fisken, fågeln) landar på högra tredjedelen. Båten gungar på vågorna (pilar upp och ner), vattnet glider.
GV, BÅT_H, BÅT_X = 735, 540, W / 3 + 30   # 540: båten och Disa ca 15 % större än förut, så att hon syns i den långa 04;
# + 30 så att motorn inte nuddar vänsterkanten
NÄR_H, NÄR_ÖGON = 820, 0.42  # närbildens höjd i Disas koordinater och ögonens läge uppifrån


def framvågor(c, y0, x0=0, x1=W, färg=VATTEN):
    """Vatten och vita vågkammar framför båtens nederkant, så att den ligger i vattnet och inte på det."""
    m, d = ritmask(c)
    pts = [(x, y0 + 6 * math.sin(x / 38)) for x in range(x0 - 20, x1 + 40, 12)]
    d.polygon(pts + [(x1 + 40, H + 10), (x0 - 20, H + 10)], fill=255)
    kritfyll(c, m, färg, vick=0.12, oskarp=1)
    m, d = ritmask(c)
    d.line(pts, fill=255, width=7)
    kritfyll(c, m, (230, 245, 252), vick=0.15, oskarp=0.8)


def körscen(stuff=None, fart=True, gung=True, plåt=None, gv=GV, **kw):
    c = (plåt or sjön_plåt()).copy()
    if stuff:
        stuff(c)
    b = place(c, båten(**kw), BÅT_X, gv, BÅT_H, rot=-1)
    framvågor(c, gv - 34)
    if fart:  # kölvatten bakom båten
        m, d = ritmask(c)
        for k, y in enumerate((GV - 30, GV - 10, GV + 12)):
            d.line((BÅT_X - 260 - k * 40, y, BÅT_X - 160, y - 4), fill=255, width=7)
        kritfyll(c, m, (255, 255, 255), vick=0.2, oskarp=0.8)
    if gung:  # båten gungar på vågorna
        x = BÅT_X + BÅT_H * 0.78
        arrow(c, [(x, GV - 120), (x, GV - 170)])
        arrow(c, [(x, GV - 90), (x, GV - 40)])
    return c, b


def närbild(c, b, dx=0, zoom=1.0):
    """Närbild på Disa, samma inramning i alla scener: ögonen strax ovanför mitten, båtens kant längst ner."""
    h = NÄR_H * DISA_K * b[0] / zoom
    x, _ = disa_punkt(b)
    _, y = disa_punkt(b, 511, DISA_ÖGON_Y)
    return crop_zoom(c, x + dx, y + h * (0.5 - NÄR_ÖGON), h * W / H)


def i_närbild(b, x, y, dx=0):
    """Var en punkt i körscenen hamnar i närbilden (samma utsnitt som närbild()), och närbildens förstoring."""
    h = NÄR_H * DISA_K * b[0]
    w = h * W / H
    cx, _ = disa_punkt(b)
    _, cy = disa_punkt(b, 511, DISA_ÖGON_Y)
    cx = min(max(cx + dx, w / 2), W - w / 2)
    cy = min(max(cy + h * (0.5 - NÄR_ÖGON), h / 2), H - h / 2)
    k = W / w
    return (x - cx + w / 2) * k, (y - cy + h / 2) * k, k


def disa_mot(bpos, x, y):
    """En punkt på bilden i Disas 1024-koordinater (omvänd disa_punkt), för att rikta armen dit."""
    s, x0, y0 = bpos
    return 512 + ((x - x0) / s - DISA_X) / DISA_K, 926 + ((y - y0) / s - TOPP - DISA_Y) / DISA_K


# Peka-riktningar i Disas koordinater (bara riktningen räknas)
HÖGER, UPP_HÖGER, UPP = (3000, 600), (3000, -2200), (950, -3000)
VINKA = (1500, -500)  # handen snett upp och ut
MAGE_R, MAGE_L = (512, 760), (512, 760)  # mot magens mitt: de korta armarna når magens kant
MAGE_IN = (512, 620)  # nästan vågrätt in mot magen: så långt in på den ljuslila magen de korta armarna når (refrängen, 08b)

frames = {}

# 01 Intro: titelkortet (inget renderat intro för 006 än: ritat här, se kontrollen)
c = Image.new("RGB", (W, H), HIMMEL)
color_text(c, H * 0.36, "Orangea sången", 120, [(232, 96, 20), (31, 105, 173), (106, 44, 145), (198, 40, 40), (46, 125, 50)])
color_text(c, H * 0.18, "Avsnitt 6", 64)
place(c, båten(med_disa=False, vit=True), W / 2, H * 0.9, 230)
frames["01"] = c


# 02–02c Kritan ritar båten i den riktiga båtens form (skrov.png/insida.png): skrovet med sätet och den höga fören, randen,
# under frågan flaggan, vågen och motorn, sedan ventilen och svaret. Den står där båten står i 03 (körscen()), så att zoomen in
# landar på den riktiga båten. Samma mått som scener/kritan-ritar/index.html, i båtens 1024-ruta.
def bez(*p, n=24):
    """Punkter längs en kubisk bezierkurva p0 p1 p2 p3 (utan p0)."""
    (x0, y0), (x1, y1), (x2, y2), (x3, y3) = p
    return [((1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t * t * x2 + t ** 3 * x3,
             (1 - t) ** 3 * y0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t * t * y2 + t ** 3 * y3) for t in np.linspace(0, 1, n)[1:]]


RITAT_SKROV = [(112, 568), (300, 572), *bez((300, 572), (312, 672), (500, 672), (515, 566)), *bez((515, 566), (650, 556), (850, 522), (978, 476)),
               *bez((978, 476), (955, 610), (890, 745), (720, 786)), (220, 790), *bez((220, 790), (150, 786), (118, 740), (112, 568))]
RITAD_FLAGGA = [(241, 278), *bez((241, 278), (190, 280), (120, 300), (46, 334)), *bez((46, 334), (100, 342), (150, 392), (241, 420))]


def ritad_båt(c, rand=False, flagga=False, våg=False, motor=False, ventil=False, lyft=0):
    s = BÅT_H / (807 - 236)
    P = lambda x, y: (BÅT_X + (x - 506.5) * s, GV - (807 - y) * s - lyft)
    Ps = lambda pts: [P(*q) for q in pts]
    if motor:  # bakom skrovet
        m, d = ritmask(c)
        d.rounded_rectangle((*P(38, 528), *P(156, 640)), 20, fill=255)
        d.rectangle((*P(78, 630), *P(110, 748)), fill=255)
        d.rectangle((*P(56, 728), *P(110, 748)), fill=255)
        kritfyll(c, m, (122, 125, 132), vick=0.2)
    if flagga:
        m, d = ritmask(c)
        d.line((*P(240, 600), *P(240, 272)), fill=255, width=11)
        kritfyll(c, m, (168, 120, 78), vick=0.2)
        m, d = ritmask(c)
        d.polygon(Ps(RITAD_FLAGGA), fill=255)
        kritfyll(c, m, ORANGE, vick=0.3)
    skrov, d = ritmask(c)
    d.polygon(Ps(RITAT_SKROV), fill=255)
    kritfyll(c, skrov, BÅT_OR, vick=0.4, oskarp=3)
    if rand:  # den ljusa randen, klippt efter skrovet
        m, d = ritmask(c)
        d.line(Ps([(118, 734), *bez((118, 734), (400, 735), (700, 728), (975, 700))]), fill=255, width=20)
        kritfyll(c, ImageChops.multiply(m, skrov), LJUS, vick=0.2, oskarp=1.2)
    if ventil:
        m, d = ritmask(c)
        (x, y), r = P(862, 583), 30 * s
        d.ellipse((x - r, y - r, x + r, y + r), fill=255)
        kritfyll(c, m, LJUS, vick=0.2, oskarp=1.2)
    if våg:
        m, d = ritmask(c)
        d.line(Ps([(x, 772 + 13 * math.sin(x / 30)) for x in range(-100, 1130, 8)]), fill=255, width=12)
        kritfyll(c, m, (70, 150, 210), vick=0.3)


LJUS = (246, 236, 207)  # skrovets ljusa rand och ventil
c = paper(); ritad_båt(c, rand=True); krita(c, 925, 634); frames["02"] = c
c = paper(); ritad_båt(c, rand=True, flagga=True, våg=True, motor=True); krita(c, 64, 670); frames["02a"] = c
c = paper(); ritad_båt(c, rand=True, flagga=True, våg=True, motor=True, ventil=True); krita(c, 1030, 250); frames["02b"] = c   # kritan har lyft från ventilen
c = paper(); ritad_båt(c, rand=True, flagga=True, våg=True, motor=True, ventil=True, lyft=30); krita(c, 1080, 200)
arrow(c, [(1010, 560), (1010, 460), (1010, 560)])
frames["02c"] = c

# 03 Zoom in: den ritade båten blir Disas båt på sjön
c, b = körscen(fart=False, gung=False)
for r in (240, 310):
    ImageDraw.Draw(c).ellipse((BÅT_X - r * 1.3, GV - BÅT_H / 2 - r, BÅT_X + r * 1.3, GV - BÅT_H / 2 + r), outline=(255, 255, 255), width=5)
frames["03"] = c

# 03a Disa vinkar till tittaren ("Hej hej!"), 03b … och lägger tassarna på båtens kant
c, b = körscen(gung=False, mood="blinkar", peka_r=VINKA)
vift(c, *disa_punkt(b, 990, 330))
frames["03a"] = närbild(c, b)
c, b = körscen(gung=False, blick=(8, 0))
frames["03b"] = närbild(c, b)

# 04 Mellanspelet: sjön glider, båten gungar, Fia gör en ögla runt Disas huvud och landar på flaggstången (pilen).
# 041 närbild ("Dinon kör sin orange båt"): Disa klappar relingen i takt. 042 ("tut, tut, tut – på vågorna"): Fia sitter på
# stången, en vit tut-ring per tut ur Disas mun och båten gungar mer. 04a: Disa spanar och pekar åt vänster och sedan åt höger
# (pilarna), så att barnet kan härma; handen över ögonen lästes som "oj", och de korta armarna når inte upp till ögonen.
def båtpunkt(bpos, px, py):
    """En punkt i båtens 1024-ruta (som baten.js, utan TOPP) på bilden."""
    s, x0, y0 = bpos
    return x0 + px * s, y0 + (TOPP + py) * s


STÅNG = (242, 282)  # flaggstångens topp, där Fia sitter (uppmätt i bild)


def tutringar(c, b):
    x, y = disa_punkt(b, 511, 466)
    m, d = ritmask(c)
    for k in range(3):
        cx, cy, rx, ry = x + 190 + k * 70, y - 120 - k * 60, 26 + k * 12, 18 + k * 8
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), outline=255, width=9)
    kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)


c, b = körscen(gung=False, mood="skrattar", blick=(8, -6))
hx, hy = disa_punkt(b, 511, 380)
place(c, FIA, hx + 280, hy + 20, 100, rot=8)
arrow(c, båge(hx, hy + 10, 280, 20, 500, ry=150))  # ett varv runt huvudet och vidare upp mot stången
frames["04"] = c
c, b = körscen(gung=False, mood="skrattar", peka_r=(1000, 950), peka_l=(20, 950))
for px in (790, 230):
    x, y = disa_punkt(b, px, 640)
    arrow(c, [(x, y - 130), (x, y - 60)])
frames["041"] = närbild(c, b)
c, b = körscen(mood="ropar", blick=(6, -2))
sx, sy = båtpunkt(b, *STÅNG)
place(c, FIA, sx, sy, 100)
tutringar(c, b)
frames["042"] = c
c, b = körscen(mood="nyfiken", peka_l=(-3000, -400), blick=(-10, -2), rot=6)
hx, hy = disa_punkt(b, 511, 300)
arrow(c, [(hx + 40, hy - 150), (hx - 220, hy - 150)])
arrow(c, [(hx + 80, hy - 150), (hx + 340, hy - 150)])
frames["04a"] = c


# Refrängdansen (sang.md), likadan båda gångerna och lugn (Sanna, 2026-11-05: blixten och mönstret var för hetsiga): en enda
# dansbild på sjön (kamera 6: båten i mitten och större, vattnet står still) för rad 1–7 och närbild (kamera 3) bara på rad 8.
# Inga hårda klipp på slagen. Hela sjön glider över till orange på refrängens första slag (orange_plåt) och tillbaka till blått på
# det sista, långsamt och utan blink; båten har sin mörkorange kontur så att den syns mot det orange vattnet.
DANS = {
    "upp": dict(mood="ropar", peka_r=(1500, -700), peka_l=(-480, -700)),
    "mage": dict(mood="karleksfull", peka_r=MAGE_IN, peka_l=MAGE_IN),
    "putt": dict(mood="skrattar", peka_r=(1300, 200), peka_l=(-280, 200)),  # knytnävspumpar framför sig
    "titta": dict(mood="nyfiken", peka_r=(3000, -400), blick=(10, -2), rot=-4),  # pekar ut åt sidan och tittar dit
    "visa": dict(mood="skrattar", peka_r=(1500, -300)),  # pekar på bubblan med apelsinen (riktas mot den i pumpbild())
}
RADER = [("upp", True), ("mage", False), ("upp", True), ("visa", False), ("putt", True), ("titta", False)]
HOPP = 40  # så högt båten gungar upp på vågen, en gång per två slag
DANS_X, DANS_G, DANS_H = W / 2, 690, 540


def dansa(c, rörelse, hopp, x, ground, h):
    """Båten med Disa i dansrörelsen, i vattnet."""
    bi = båten(kontur=True, **DANS[rörelse])
    b = place(c, bi, x, ground - (HOPP if hopp else 0), h)
    s, x0, y0 = b   # skrovets mörkorange kontur, så att båten syns mot den orange sjön
    m = Image.new("L", c.size)
    m.paste(bi.kontur.resize((round(bi.width * s), round(bi.height * s)), Image.LANCZOS), (x0, y0))
    kritfyll(c, m, KONTUR_OR, vick=0.15, oskarp=1)
    framvågor(c, ground - 30, färg=REF_MÖRK)
    hx, hy = disa_punkt(b, 512, 160)
    if hopp:
        arrow(c, [(x - h * 0.62, ground - 30), (x - h * 0.62, ground - 150)])
    if rörelse == "upp":  # bara pilen vid flaggan: den till höger stod ensam i himlen och betydde inget (sjön är ändå orange)
        ax, ay = disa_punkt(b, 60, 330)
        arrow(c, [(ax, ay), (ax, ay - h * 0.14)])
    if rörelse == "mage":  # gunga åt sidorna i halvtakt
        arrow(c, [(hx, hy - 10), (hx - 110, hy + 10)])
        arrow(c, [(hx, hy - 10), (hx + 110, hy + 10)])
    if rörelse == "titta":  # pekar och tittar åt höger, sedan med andra armen åt vänster
        arrow(c, [(hx, hy), (hx + 150, hy)])
        arrow(c, [(hx, hy), (hx - 150, hy)])
    if rörelse == "putt":  # "putt, putt": gunga två gånger; "tut, tut": två knytnävspumpar (tutet är båtens mistlur)
        for px in (130, 900):
            ax, ay = disa_punkt(b, px, 380)
            arrow(c, [(ax, ay), (ax, ay - h * 0.08)])
        streck(c, *disa_punkt(b, 80, 300), r=h * 0.05, n=4, start=-200, slut=-120)  # tut
    return b


REF_LJUS, REF_MÖRK = (255, 214, 170), (226, 112, 38)   # #FFD6AA i himlen, en djupare orange i vattnet


def orange_plåt():
    """Sjön omfärgad till orange för refrängen (Sanna, 2026-11-05: "kanske kan bakgrunden ändra färg till orange?"): ljusheten
    i plåten styr tonen, så att himlen blir ljus persika och vattnet djupare orange, och kritstrukturen och vågorna är kvar.
    Glider in på refrängens första slag och tillbaka till blått på det sista (refrang.js)."""
    if "orange" not in _plåt:
        l = np.asarray(sjön_plåt().convert("L"), dtype=np.float32)
        lo, hi = np.percentile(l, 2), np.percentile(l, 98)
        n = np.clip((l - lo) / (hi - lo), 0, 1)[..., None] ** 0.8
        _plåt["orange"] = Image.fromarray((np.array(REF_MÖRK, np.float32) * (1 - n) + np.array(REF_LJUS, np.float32) * n).astype(np.uint8))
    return _plåt["orange"]


def refrängbild(rörelse, hopp):
    c = orange_plåt().copy()
    return c, dansa(c, rörelse, hopp, DANS_X, DANS_G, DANS_H)


def färgad_plåt(färg):
    """Discots plåt omfärgad till färg, med kritstrukturen kvar (som rosa_plåt i 005)."""
    l = np.asarray(Image.open(A / "bakgrunder/danspaus/danspaus.png").convert("L").resize((W, H)), dtype=np.float32)
    k = (l / l.mean())[..., None]
    return Image.fromarray(np.clip(np.array(färg, dtype=np.float32) * k, 0, 255).astype(np.uint8))


FLAGGA = Image.open(A / "rekvisita/cut/flagga-rosa.png").convert("RGBA")


def orange_flagga():
    """005:s rosa flagga omfärgad till orange (bara duken; stången behålls)."""
    hsv = np.asarray(FLAGGA.convert("RGB").convert("HSV")).copy()
    rosa = (hsv[..., 1] > 60) & ((hsv[..., 0] > 200) | (hsv[..., 0] < 10))
    hsv[..., 0] = np.where(rosa, 16, hsv[..., 0])
    hsv[..., 1] = np.where(rosa, np.clip(hsv[..., 1] * 1.25, 0, 255), hsv[..., 1])
    im = Image.merge("HSV", [Image.fromarray(hsv[..., i]) for i in range(3)]).convert("RGBA")
    im.putalpha(FLAGGA.getchannel("A"))
    return im


FLAGGA_OR = orange_flagga()


VIT, SKEN = (255, 255, 255), (255, 214, 170)


def stjärna(c, x, y, r, col=VIT, sken=False):
    if sken:
        m, d = ritmask(c)
        d.ellipse((x - r * 0.9, y - r * 0.9, x + r * 0.9, y + r * 0.9), fill=255)
        c.paste(SKEN, mask=m.filter(ImageFilter.GaussianBlur(r * 0.45)).point(lambda v: int(v * 0.7)))
    m, d = ritmask(c)
    k = r * 0.28
    d.polygon([(x, y - r), (x + k, y - k), (x + r, y), (x + k, y + k), (x, y + r), (x - k, y + k), (x - r, y), (x - k, y - k)], fill=255)
    kritfyll(c, m, col, vick=0.15, oskarp=0.8)


# Rad 6 "Som en fin apelsin!" (Sannas text, 2026-11-05): dansbilden på sjön. En bubbla med apelsinen poppar upp i himlen till
# höger om Disa (som bubblorna i 005:s refräng); hon pekar på den och ritar en cirkel runt den med tassen.
# Apelsinens lilla ögonblick (Sanna, 2026-11-05: "focus more on fin apelsin and maybe glimmer"): bubblan är större, kameran
# glider mjukt in mot den och tillbaka ut på radens sista slag, och fem mjuka glimtar tindrar runt den (glitter).
# (Jättepumpan och pumpan är strukna: för slumpmässiga på sjön.)
def apelsin_nöjd():
    """Apelsinen i refrängbubblan (Sanna, 2026-11-05: "smug happy face"): nöjda slutna ögon och ett litet, belåtet leende,
    ritat med ansiktena som figurernas. Bara den här apelsinen har ansikte."""
    im = APELSIN.copy()
    rita_ansikte(im, "njuter", ogon=[(395, 540), (635, 540)], ogonskala=2.4, mun=(515, 640), munskala=2.6)
    return im


REF_BUBBLOR = [(apelsin_nöjd(), W - 300, 280)]   # sak, mitt x, mitt y ("Som en fin apelsin!", Sannas text 2026-11-05); inte i hörnet
BUBBLA_R, BUBBLA_SAK = 125, 156
APELSIN_KAMERA = (820, 400, 1.2)   # kamerans mitt och zoom på rad 6 (som refrang.js): Disa till vänster, bubblan till höger
GLIMTAR = [(-140, 1.55, 22), (-80, 1.4, 28), (-25, 1.55, 20), (30, 1.55, 26), (100, 1.45, 18)]   # vinkel, avstånd (× BUBBLA_R), storlek


def bubbla(c, sak, x, y):
    lag = Image.new("RGBA", c.size, (0, 0, 0, 0)); d = ImageDraw.Draw(lag)
    d.ellipse((x - BUBBLA_R, y - BUBBLA_R, x + BUBBLA_R, y + BUBBLA_R), fill=(255, 255, 255, 70), outline=(255, 255, 255, 255), width=7)
    d.arc((x - 88, y - 88, x + 88, y + 88), 200, 250, fill=(255, 255, 255, 220), width=9)
    ut = Image.alpha_composite(c.convert("RGBA"), lag)
    place(ut, sak, x, y + BUBBLA_SAK / 2, BUBBLA_SAK)
    streck(ut, x, y - BUBBLA_R - 8, r=36, n=5, start=-160, slut=-20, col=(255, 255, 255))  # pop
    return ut


def pumpbild():
    c = orange_plåt().copy()
    b = dansa(c.copy(), "visa", False, DANS_X, DANS_G, DANS_H)
    DANS["visa"]["peka_r"] = disa_mot(b, *REF_BUBBLOR[0][1:])   # armen pekar rakt på bubblan
    dansa(c, "visa", False, DANS_X, DANS_G, DANS_H)
    for sak, x, y in REF_BUBBLOR:
        c = bubbla(c, sak, x, y)
        arrow(c, båge(x, y, BUBBLA_R + 30, 200, -120, steg=20))   # tassen ritar en cirkel runt den
        for v, a, r in GLIMTAR:
            v = math.radians(v)
            stjärna(c, x + a * BUBBLA_R * math.cos(v), y + a * BUBBLA_R * math.sin(v), r, sken=True)
    cx, cy, zoom = APELSIN_KAMERA
    return crop_zoom(c.convert("RGB"), cx, cy, W / zoom)


PUMP_BILD = pumpbild()


for i, (rörelse, hopp) in enumerate(RADER):
    if rörelse == "visa":
        im = PUMP_BILD
    else:
        c, b = refrängbild(rörelse, hopp)
        im = närbild(c, b) if rörelse == "titta" else c
    for n in ("05", "09"):
        frames[n + "abcdef"[i]] = im

# 06 Fisken: en stor orange fisk hoppar upp ur vattnet mitt framför fören i en hög båge, med ett tydligt plask, Disa tittar
# dit. Filmens första orangea sak, så den ska synas (FISK_X som i scener/sjon-2; FISK_H 170 här ger samma storlek som scenens
# 210, eftersom FISK är tätare beskuren än lager/fisk.png).
FISK_X, FISK_Y, FISK_H, HAV = W * 2 / 3 + 200, 480, 170, 650


def fisken(c, x=FISK_X, y=FISK_Y, rot=25, båg=True):
    place(c, FISK, x, y, FISK_H, rot=rot)
    if båg:
        arrow(c, båge(x, HAV, 110, 170, 20, ry=260))
    stänk(c, x - 110, HAV, 46)


c, b = körscen(lambda c: fisken(c), blick=(10, 0), mood="forvanad")
frames["06"] = c
# 06a … sjön stannar, Disa pekar på fisken
FISK_A = (FISK_X, FISK_Y + 30)
b = körscen(lambda c: fisken(c, *FISK_A, båg=False), fart=False)[1]
c, b = körscen(lambda c: fisken(c, *FISK_A, båg=False), fart=False, mood="forvanad", peka_r=disa_mot(b, FISK_A[0], FISK_A[1] - 100), blick=(10, -2))
frames["06a"] = c
# 06b plask, plask, plask: närbild, fisken hoppar tre gånger i en båge över vattnet i högra tredjedelen (hela bågen i bild),
# och Disa klappar en gång per plask. Fiskarna ritas i närbildens egna koordinater.
c, b = körscen(fart=False, gung=False, mood="skrattar", peka_r=(470, 640), peka_l=(560, 640), blick=(10, 0))
streck(c, *disa_punkt(b, 512, 600), r=34, n=5, start=-170, slut=-10)  # klapp
im = närbild(c, b, dx=60)
k = i_närbild(b, 0, 0, dx=60)[2]
for x, y, r in ((1090, 370, 35), (1180, 290, 0), (1270, 370, -35)):  # tre hopp i en båge över fören, fria från tassen, ett per plask
    place(im, FISK, x, y, 66 * k, rot=r)
frames["06b"] = im

# 07 Orange sak 2 – fågeln: en orange mås (från sidan, lång vinge) glider in över sjön och fladdrar bredvid båten (pip, pip, pip)
FÅGEL_X, FÅGEL_Y, FÅGEL_H = W * 2 / 3 + 110, GV - 200, 180   # 07a: 1,5× större, nere vid vattnet framför fören
c, b = körscen(lambda c: (place(c, FÅGEL, 1280, 400, 120), arrow(c, båge(1180, 470, 120, 30, 150, ry=60))), blick=(10, -4))
frames["07"] = c
b = körscen(fart=False)[1]
c, b = körscen(lambda c: place(c, FÅGEL, FÅGEL_X, FÅGEL_Y, FÅGEL_H), fart=False, mood="forvanad",
               peka_r=disa_mot(b, FÅGEL_X, FÅGEL_Y - FÅGEL_H / 2), blick=(10, 2))
frames["07a"] = c
# 07b pip, pip, pip: närbild, Disa flaxar med armarna som vingar, en gång per "pip"; fågeln fladdrar bredvid, inte i hörnet
c, b = körscen(fart=False, gung=False, mood="skrattar", peka_r=(3000, -200), peka_l=(-3000, -200))
pil = [i_närbild(b, *disa_punkt(b, px, 520)) for px in (40, 984)]
im = närbild(c, b)
fx, fy, k = i_närbild(b, *disa_punkt(b, 1060, 300))
place(im, FÅGEL, fx - 60, fy + 60, 120 * k)   # uppe till höger om Disa, 60 px in från hörnet
for (ax, ay, k), dx in zip(pil, (30, 0)):     # den vänstra pilen flyttad bort från flaggstången
    arrow(im, [(ax + dx, ay + 50 * k), (ax + dx, ay - 50 * k)])
frames["07b"] = im

# 08 Frågan: frågande min mot tittaren, huvudet på sned och tassarna uppåt (som 13e)
c, b = körscen(fart=False, gung=False, mood="forvanad", peka_r=(1600, 250), peka_l=(-560, 250), blick=(-2, -5), rot=8)
frames["08"] = närbild(c, b)
# 08a Pausen: Disa tittar ner på sin mage (blicken och ansiktet nere), kameran åker in mot den orange västen (ca 1,25×), så
# långt att hela huvudet med taggarna och västen fortfarande syns, med luft ovanför (som scener/sjon-2)
c, b = körscen(fart=False, gung=False, gv=GV - 160, mood="glad", blick=(0, 9), nick=40)  # båten högre i plåten, så att västen kan hamna mitt i bild
vx, _ = disa_punkt(b, 512, 650)
_, ey = disa_punkt(b, 511, DISA_ÖGON_Y)
zw = NÄR_H * DISA_K * b[0] * W / H / 1.25
im = crop_zoom(c, vx, ey + NÄR_H * DISA_K * b[0] * (0.5 - NÄR_ÖGON), zw)
for hx, hy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
    ax, ay = W / 2 + hx * (W / 2 - 40), H / 2 + hy * (H / 2 - 40)
    arrow(im, [(ax, ay), (ax - hx * 90, ay - hy * 90 * H / W)])
frames["08a"] = im
# 08b Västen är orange – och flaggan med!: ena tassen på västen, den andra pekar bakåt på flaggan i aktern, och hon tittar dit
c, b = körscen(fart=False, gung=False, mood="ropar", peka_r=MAGE_IN, peka_l=(-3000, -1500), blick=(-9, -8))
frames["08b"] = närbild(c, b, dx=-60)
# 08c Dunk, dunk, dunk!: Disa klappar på relingen med båda tassarna, tre gånger, och båten gungar (går att härma vid bordet)
c, b = körscen(fart=False, gung=False, mood="skrattar", peka_r=(765, 3000), peka_l=(252, 3000), blick=(0, 6))
hän = [i_närbild(b, *disa_punkt(b, px, 700)) for px in (252, 765)]
im = närbild(c, b)
for (hx, hy, k), ut in zip(hän, (-1, 1)):   # tassen ner mot relingen (pilen utanför tassen), och smällen
    arrow(im, [(hx + ut * 85, hy - 130 * k), (hx + ut * 85, hy - 20 * k)])
    streck(im, hx, hy + 20 * k, r=30 * k, n=3, start=-160, slut=-20)
for a in (160, 20):   # båten gungar åt båda hållen
    arrow(im, båge(W / 2, H - 40, 520, 90, a, ry=60))
frames["08c"] = im

# 10 Kritsvep i bryggans ljusblå himmel
c = frames["09f"].copy()
m, d = ritmask(c)
for i in range(70):
    y = i * 12 - 20
    x1 = 780 + random.uniform(-50, 50)
    d.line((-20, y + 30, x1, y - 30), fill=255, width=40)
    d.ellipse((x1 - 20, y - 50, x1 + 20, y - 10), fill=255)
kritfyll(c, m, HIMMEL, vick=0.35, oskarp=3)
arrow(c, [(860, 380), (1060, 380)], (255, 255, 255))
frames["10"] = c

# B · Bryggan: Agda sitter på bryggkanten med korgen bredvid sig, båten lägger till nedanför henne.
AGDA_X, AGDA_K = 960, 0.36
AGDA_FOT = BRYGG_Y + 30 + (975 - 830) * AGDA_K   # 14e–g: på bryggan bredvid Disa, benen raka
AGDA_SITTER = BRYGG_Y + 55 + (926 - 832) * AGDA_K   # sitter: kroppen på bryggans framkant, korta ben hänger ner över den
KORG_X, KORG_G, KORG_H = 1160, BRYGG_Y + 18, 110
GK, BRYGG_BÅT_X, BRYGG_BÅT_H = 735, 570, 470
APELSIN_H = 130   # apelsinen där den är i fokus (granskningen: 2–3× större)


def agda(mood="glad", **kw):
    return figur("ankan-agda", mood, **kw)


def sätt(c, im, x, fot, k):
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.paste(im, (round(x - 512 * k), round(fot - 926 * k)), im)


def korgen(c, apelsin=True, x=KORG_X):
    place(c, KORG, x, KORG_G, KORG_H)
    if apelsin:
        place(c, APELSIN, x - 62, KORG_G - KORG_H * 0.35, 80)


def brygga(mood="glad", agda_med=True, apelsin_i_korgen=True, agda_x=AGDA_X, agda_fot=AGDA_SITTER, korg_x=KORG_X, lång=False,
           vrid=0, **kw):
    """vrid: Agda vrider sig (grader moturs runt höften)."""
    c = bryggan_plåt(lång).copy()
    korgen(c, apelsin_i_korgen, korg_x)
    if agda_med:
        kw.setdefault("ben", "sitter" if agda_fot == AGDA_SITTER else True)
        sätt(c, agda(mood, **kw).rotate(vrid, resample=Image.BICUBIC, center=(512, 832)), agda_x, agda_fot, AGDA_K)
    return c


def mot_agda(x, y, agda_x=AGDA_X, fot=AGDA_SITTER):
    """En punkt på bilden i Agdas koordinater (för peka_*)."""
    return 512 + (x - agda_x) / AGDA_K, 926 + (y - fot) / AGDA_K


def vid_bryggan(c, x=BRYGG_BÅT_X, lut=0, **kw):
    b = place(c, båten(vit=True, **kw), x, GK, BRYGG_BÅT_H, rot=-1 + lut)
    framvågor(c, GK - 34, 0, W)
    return b


B_VID = place(Image.new("RGB", (W, H)), båten(vit=True), BRYGG_BÅT_X, GK, BRYGG_BÅT_H, rot=-1)   # båten vid bryggan, i vila


def mot_disa(x, y, b=B_VID):
    """En punkt på bilden som peka-riktning för Disas högra arm (bara riktningen räknas)."""
    sx, sy = disa_punkt(b, 765, 545)
    return 765 + (x - sx) * 10, 545 + (y - sy) * 10


def agda_närbild(c):
    return crop_zoom(c, (AGDA_X + KORG_X) / 2 - 20, BRYGG_Y - 50, 640)


TVÅ_CX, TVÅ_CY, TVÅ_W = 860, 470, 1000


def tvåbild(c):
    return crop_zoom(c, TVÅ_CX, TVÅ_CY, TVÅ_W)


def flyter(c, x, y, h, glans=False):
    """Apelsinen guppar på vattnet vid (x, y): nedre fjärdedelen under ytan, en vit vågkam framför. glans: den blänker."""
    place(c, APELSIN, x, y + h * 0.2, h)
    m, d = ritmask(c)
    d.ellipse((x - h * 0.75, y - h * 0.08, x + h * 0.75, y + h * 0.3), fill=255)
    kritfyll(c, m, VATTEN, vick=0.12, oskarp=1)
    m, d = ritmask(c)
    d.line([(xx, y - h * 0.04 + 4 * math.sin(xx / 9)) for xx in range(round(x - h * 0.7), round(x + h * 0.7), 4)], fill=255, width=5)
    kritfyll(c, m, (230, 245, 252), vick=0.15, oskarp=0.8)
    if glans:
        streck(c, x, y - h * 0.3, r=max(h, 70) * 0.7, n=5, start=-150, slut=-30, col=(255, 255, 255))   # syns fast apelsinen är liten


# 11 Båten puttrar in från vänster mot bryggan. Agda sitter redan på kanten (så att det syns när hon ställer sig upp i 14a).
c = brygga(blick=(-8, 0))
vid_bryggan(c, 400, blick=(10, 0))
arrow(c, [(70, 330), (230, 330)])
frames["11"] = crop_zoom(c, 690, H, 1260)
# 11a Titta där – apelsinen är orange: båten har lagt till, Disa pekar på apelsinen i korgen; kameran glider in mot korgen
c = brygga(blick=(-6, 2))
vid_bryggan(c, mood="forvanad", peka_r=mot_disa(KORG_X - 62, KORG_G - 70), blick=(9, -4))
frames["11a"] = crop_zoom(c, W, 440, 1000)
# 11b rund, rund, rund: närbild, Disa ritar en cirkel i luften med tassen (cirkeln framför den lyfta tassen; Agda ur bild)
c = brygga(agda_med=False)
b = vid_bryggan(c, mood="skrattar", peka_r=(1500, -250), blick=(8, -4))
c = närbild(c, b)
arrow(c, båge(W * 0.8, H * 0.39, 90, 90, 420, steg=25))   # i närbildens koordinater: framför tassen, i högra tredjedelen
frames["11b"] = c
# 11d Hej, ankan! Kvack! Hej, Disa! Vad vill du ha?: närbild Agda med korgen (apelsin, grönt äpple, gul banan)
c = brygga("skrattar", blick=(-6, 0), peka_r=(1600, 520))
frames["11d"] = agda_närbild(c)
# 11e Apelsin, tack!: tvåbilden, Disa pekar på apelsinen i korgen
c = brygga(blick=(-10, 2))
vid_bryggan(c, mood="skrattar", peka_r=mot_disa(KORG_X - 62, KORG_G - 70), blick=(10, -4))
frames["11e"] = tvåbild(c)
# 12 Varsågod! Tack!: Agda räcker ner apelsinen, den är i luften mellan hennes vinge och Disas tass (pling)
APELSIN_LUFT = (800, 395)   # apelsinens mitt mellan dem
c = brygga("skrattar", apelsin_i_korgen=False, peka_l=mot_agda(*APELSIN_LUFT), blick=(-6, 2))
vid_bryggan(c, rot=-8, peka_r=mot_disa(*APELSIN_LUFT), blick=(10, -6))
place(c, APELSIN, APELSIN_LUFT[0], APELSIN_LUFT[1] + APELSIN_H / 2, APELSIN_H)
streck(c, APELSIN_LUFT[0], APELSIN_LUFT[1] - APELSIN_H / 2 - 6, r=30, n=5, start=-170, slut=-10, col=(255, 255, 255))   # pling
frames["12"] = tvåbild(c)

# Vers 2 i tvåbilden: apelsinen glider ur tassarna (plask) och flyter bort, längre och längre; Disa blir ledsen och frågar efter hjälp.
c = brygga("forvanad", apelsin_i_korgen=False, blick=(-6, 8))
b = vid_bryggan(c, mood="forvanad", peka_r=(1400, 300), peka_l=(-400, 300), blick=(8, 8))
ax, ay = disa_punkt(b, 980, 700)
place(c, APELSIN, ax + 80, ay + 50 + APELSIN_H, APELSIN_H, rot=-20)   # precis ur tassarna, på väg ner
stänk(c, 1030, GK - 40, 44)
arrow(c, [(ax + 150, ay + 130), (1030, GK - 80)])
frames["13a"] = tvåbild(c)
# 13b … där flöt den bort: apelsinen guppar ut från båten åt höger, Disa lite ledsen
APELSIN_NÄRA = (1100, 636, 96)   # 13b:s slut, 13c:s start
c = brygga("forvanad", apelsin_i_korgen=False, blick=(8, 8))
vid_bryggan(c, mood="ledsen", blick=(10, 4))
flyter(c, *APELSIN_NÄRA)
arrow(c, [(1050, 560), (1170, 545)])
frames["13b"] = tvåbild(c)
# 13c Längre, längre, längre bort … (Åh nej!): ett gupp utåt per "längre", åt höger och mot horisonten och mindre för varje steg,
# tills den är en prick långt ut mellan bryggbenen. Disa sträcker sig över relingen men når inte, båten lutar; båda följer den med blicken.
APELSIN_STEG = [APELSIN_NÄRA, (1138, 616, 70), (1162, 600, 48)]   # spökringarna: där den var vid varje "längre"
APELSIN_BORT = (1180, 586, 30)   # där apelsinen guppar tills Agda simmar ut och hämtar den (långt ut, en liten prick)


def bort(c, glans=False):
    flyter(c, *APELSIN_BORT, glans=glans)


c = brygga("forvanad", apelsin_i_korgen=False, blick=(9, 4))
vid_bryggan(c, mood="forvanad", rot=-12, lut=-6, peka_r=(3000, 400), blick=(10, 1))
bort(c)
for x, y, h in APELSIN_STEG:   # spökbilder: där apelsinen var vid förra "längre"
    m, d = ritmask(c)
    d.ellipse((x - h / 2, y - h * 0.8, x + h / 2, y + h * 0.2), outline=255, width=5)
    kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)
arrow(c, [(1060, 540), (1190, 540)])
frames["13c"] = tvåbild(c)
# 13d Dinon är ledsen – snyft, snyft, snyft: närbild, ledsen med en liten tår (ca 2 s, inget mer). Agda ur bild.
c = brygga(apelsin_i_korgen=False, agda_med=False)
b = vid_bryggan(c, mood="ledsen", blick=(0, 4))
tx, ty = disa_punkt(b, 640, 470)
m, d = ritmask(c)
d.ellipse((tx - 9, ty - 4, tx + 9, ty + 20), fill=255)
d.polygon([(tx - 8, ty + 4), (tx, ty - 16), (tx + 8, ty + 4)], fill=255)
kritfyll(c, m, (120, 190, 235), vick=0.1, oskarp=0.6)
frames["13d"] = närbild(c, b)
# 13e Vem kan hjälpa? (Vem kan hjälpa?): närbild, Disa tittar ut mot tittaren med tassarna uppåt och en O-mun, frågande
c = brygga(apelsin_i_korgen=False, agda_med=False)
b = vid_bryggan(c, mood="forvanad", peka_r=(1600, 300), peka_l=(-560, 300), blick=(0, 0))
frames["13e"] = närbild(c, b)
# 13f Den hållna pausen (ca 2,3 s, barnet ropar "Ankan!"): tvåbild. Ledtråden: Agda vrider sig och pekar med vingen på apelsinen,
# som blänker.
c = brygga("nyfiken", apelsin_i_korgen=False, vrid=-16, peka_r=mot_agda(APELSIN_BORT[0], APELSIN_BORT[1] - 40), blick=(9, 6))
vid_bryggan(c, mood="nyfiken", blick=(0, 0))
bort(c, glans=True)
frames["13f"] = tvåbild(c)

# Vers 3: Agda ställer sig upp, dyker i, simmar ut, knuffar apelsinen tillbaka, delar den.
AGDA_STÅR = BRYGG_Y + 22   # fötterna på bryggans däck
# 14a Ankan! (Ankan!): Agda ställer sig upp på bryggkanten, vingarna bakåt, redo att hoppa. Disa ser henne och blir glad.
c = brygga("skrattar", apelsin_i_korgen=False, agda_x=AGDA_X + 30, agda_fot=AGDA_STÅR, peka_r=(1700, 900), peka_l=(-700, 900), blick=(9, 4))
vid_bryggan(c, mood="glad", blick=(10, -6))
bort(c)
frames["14a"] = tvåbild(c)
# 14b … hoppar i – plask!: Agda i luften med huvudet före ner i vattnet, ett stort plask. Bågen börjar där hon stod.
c = brygga(agda_med=False, apelsin_i_korgen=False)
vid_bryggan(c, mood="forvanad", blick=(10, -2))
bort(c)
dyk = agda("skrattar", peka_r=(1600, -900), peka_l=(-600, -900)).rotate(-125, expand=True, resample=Image.BICUBIC)   # huvudet före
place(c, dyk, 1130, GK - 40, 210)
stänk(c, 1170, GK - 40, 70)
arrow(c, båge(1055, 500, 70, 165, 15, steg=15, ry=130))
frames["14b"] = tvåbild(c)
# 14c Ankan simmar, kvack, kvack, kvack!: Agda simmar ut mot apelsinen, bara huvudet över vattnet, ringar efter henne


def simmar(c, x, med_apelsin):
    k = AGDA_K * 0.9
    sätt(c, agda("skrattar", ben=False), x, GK + 40, k)   # bara huvudet över vattnet
    if med_apelsin:
        place(c, APELSIN, x - 85, GK + 40 - (926 - 470) * k + 40, 90)   # framför näbben
    framvågor(c, GK - 75, x - 120, W)
    for k in range(3):
        m, d = ritmask(c)
        r = 40 + k * 22
        d.arc((x - r * 1.6, GK - 75 - r * 0.3, x + r * 1.6, GK - 75 + r * 0.3), 0, 180, fill=255, width=5)
        kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)


c = brygga(agda_med=False, apelsin_i_korgen=False)
vid_bryggan(c, mood="glad", blick=(10, 0))
bort(c)
simmar(c, 1090, False)
arrow(c, [(1150, GK - 120), (1195, GK - 135)])
frames["14c"] = tvåbild(c)
# 14d Hit med apelsinen – hit, hit, hit!: Agda knuffar apelsinen med näbben tillbaka till båten, en knuff per "hit"; Disa sträcker sig glad
c = brygga(agda_med=False, apelsin_i_korgen=False)
vid_bryggan(c, mood="skrattar", peka_r=(1500, 350), blick=(10, 0))
simmar(c, 1130, True)
arrow(c, [(1300, GK - 60), (1225, GK - 75)])
frames["14d"] = tvåbild(c)
# 14e–g: Disa kliver ur båten upp på bryggan och står bredvid Agda (Sanna, 2026-11-05). I 14e syns kliven, sedan är
# båten borta ur bild (Sanna: renare). Så går hon på egna ben in i discot. 14e–g är samma utsnitt, utan klipp.
DISA_BRYGGA_X, DISA_BRYGGA_K, AGDA_BRYGGA_X, KORG_BRYGGA_X = 690, 0.33, 950, 1160
# eget utsnitt: bryggan och Disa och Agda i mitten (Sanna, 2026-11-05), lite närmare (granskningen)
BRYGGA_CX, BRYGGA_CY, BRYGGA_W = 880, 420, 940


def bryggbild(c):
    return crop_zoom(c, BRYGGA_CX, BRYGGA_CY, BRYGGA_W)


def på_bryggan(agda_mood, disa_mood, agda_kw, disa_kw, disa_lyft=0, båt=False):
    """Disa och Agda på den långa bryggan. disa_lyft: Disa i luften (hoppet i 14e). båt: den tomma båtens för i vänsterkanten."""
    c = brygga(agda_mood, apelsin_i_korgen=False, agda_x=AGDA_BRYGGA_X, agda_fot=AGDA_FOT, korg_x=KORG_BRYGGA_X, lång=True, **agda_kw)
    if båt:
        place(c, båten(med_disa=False, vit=True), 90, GK, BRYGG_BÅT_H, rot=-1)
    framvågor(c, GK - 34, 0, W)
    sätt(c, disa(disa_mood, **disa_kw), DISA_BRYGGA_X, AGDA_STÅR - disa_lyft, DISA_BRYGGA_K)
    return c


# Halvorna i höjd med ansiktena: tassen och vingen lyfter dem
HALVA_DISA, HALVA_AGDA = 340, 300
# 14e En halva var: Disa hoppar från båten upp på sin plats på bryggan, Agda håller upp den hela apelsinen hon hämtade
c = på_bryggan("skrattar", "skrattar", dict(peka_r=(1300, -700), håll={"r": (APELSIN, 300)}),
               dict(peka_r=(1500, -700), peka_l=(-480, -700), blick=(8, 0)), disa_lyft=30, båt=True)
arrow(c, båge(560, AGDA_STÅR - 40, 140, 175, 40, steg=20))
frames["14e"] = bryggbild(c)
# 14e2 … till dig och mig!: på bryggan, båten ur bild; Agda har delat apelsinen och båda håller upp sin halva (på ytterkanten,
# så att halvorna inte skymmer varandra)
c = på_bryggan("skrattar", "skrattar", dict(peka_r=(1500, -500), håll={"r": (HALVA, HALVA_AGDA)}, blick=(-6, -2)),
               dict(peka_l=(-480, -500), håll={"l": (HALVA, HALVA_DISA)}, blick=(8, -4)))
frames["14e2"] = bryggbild(c)
# 14f Mums, mums, mums: båda äter sin halva
c = på_bryggan("slickar", "slickar", dict(peka_l=(400, 480), håll={"l": (HALVA, HALVA_AGDA)}),
               dict(peka_r=(560, 520), håll={"r": (HALVA, HALVA_DISA)}))
streck(c, DISA_BRYGGA_X + 30, AGDA_STÅR - 235, r=22, n=3, start=-30, slut=30)
frames["14f"] = bryggbild(c)
# 14g … hurra, hurra!: armarna upp, båda två
c = på_bryggan("skrattar", "skrattar", dict(peka_r=(1500, -700), peka_l=(-480, -700)), dict(peka_r=(1500, -700), peka_l=(-480, -700)))
frames["14g"] = bryggbild(c)

# --- Danspausen (15a–15g) och sista refrängen i discot, omfärgat till ljusorange -------------------------------
SOLO_H, SOLO_FOT = 0.58 * H, 0.85 * H
KULA = (688, 78, 64)   # större kula (granskningen: det såg inte ut som ett disco); snöret går upp ur bild
# småbilderna i en båge som hänger under kulan (ett leende), 228 px från kanterna, så att kulan inte blir en av sakerna
IKON_BÅGE = [(288, 162), (488, 198), (688, 210), (888, 198), (1088, 162)]
IKON_R = 54
GOLV_Y, GOLV_VP = 0.64 * H, (W / 2, -1.4 * H)   # dansgolvets bakkant och flyktpunkten för rutornas linjer
GOLV = [(244, 182, 128), (234, 152, 98)]        # rutorna, två varma orange toner


def dansgolv(c):
    """Ett enkelt rutigt dansgolv i perspektiv, i krita, från GOLV_Y ner till underkanten. Raderna blir högre framåt."""
    vx, vy = GOLV_VP
    rader = [GOLV_Y + (H + 60 - GOLV_Y) * ((1.55 ** i - 1) / (1.55 ** 5 - 1)) for i in range(6)]
    xs = [W / 2 + (i - 0.5) * 190 for i in range(-7, 9)]   # rutornas kanter vid underkanten
    at = lambda xb, y: vx + (xb - vx) * (y - vy) / (H - vy)
    for f, färg in enumerate(GOLV):
        m, d = ritmask(c)
        for j in range(5):
            y0, y1 = rader[j], rader[j + 1]
            for i in range(len(xs) - 1):
                if (i + j) % 2 == f:
                    d.polygon([(at(xs[i], y0), y0), (at(xs[i + 1], y0), y0), (at(xs[i + 1], y1), y1), (at(xs[i], y1), y1)], fill=255)
        kritfyll(c, m, färg, vick=0.18, oskarp=1.5)
    m, d = ritmask(c)
    d.line([(-20, GOLV_Y), (W + 20, GOLV_Y)], fill=255, width=6)
    kritfyll(c, m, (196, 112, 64), vick=0.2, oskarp=1.2)


DISCO_BILD = färgad_plåt((252, 222, 190))
dansgolv(DISCO_BILD)
# kulans bild: klotets mitt och radie i bildens egna koordinater (scener/discot ritar rutorna ovanpå med samma mått)
KULA_MITT, KULA_R0 = (513, 583), 298
_kula = Image.open(A / "bakgrunder/danspaus/cut/discokula.png").convert("RGBA")
_h = np.asarray(_kula.convert("RGB").convert("HSV")).copy()
_h[..., 0] = np.where(_h[..., 1] > 40, 14, _h[..., 0])
DISCOKULA = Image.merge("HSV", [Image.fromarray(_h[..., i]) for i in range(3)]).convert("RGBA")
DISCOKULA.putalpha(_kula.getchannel("A"))


def stjärnregn(c, x, y, r, n=4):
    for i in range(n):
        v = math.radians(150 - i * 120 / max(1, n - 1))
        stjärna(c, x + r * math.cos(v), y - r * math.sin(v), 0.013 * W if i % 2 else 0.01 * W, sken=True)


def ljusprickar(c):
    rnd = random.Random(5)
    m, d = ritmask(c)
    for _ in range(26):
        x, y, rr = rnd.uniform(30, W - 30), rnd.uniform(20, H * 0.8), rnd.uniform(4, 8)
        if abs(x - KULA[0]) > 90 or y > 170:
            d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=255)
    kritfyll(c, m, VIT, alpha=0.6, vick=0.2, oskarp=1)
    n = 0
    while n < 16:
        x, y = rnd.uniform(40, W - 40), rnd.uniform(40, H * 0.72)
        if math.dist((x, y), KULA[:2]) > 140 and all(math.dist((x, y), p) > 90 for p in IKON_BÅGE):
            stjärna(c, x, y, rnd.uniform(0.0075, 0.01) * W, sken=True)
            n += 1


def ikoner(c, n, pop=(), gunga=()):
    """Sammanfattningen: de n första småbilderna i bågen (fisken, fågeln, västen, apelsinen, båten).
    pop: strålar (poppar upp). gunga: lutar och har kulans gungpil under sig."""
    saker = [(FISK, 70), (FÅGEL, 90), (VÄSTBILD, 85), (APELSIN, 100), (båten(med_disa=False), 95)]
    r = IKON_R
    for i, (im, h) in enumerate(saker[:n]):
        x, y = IKON_BÅGE[i]
        h *= r / 60
        m, d = ritmask(c)
        d.ellipse((x - r, y - r, x + r, y + r), fill=255)
        kritfyll(c, m, (255, 255, 255), vick=0.3)
        place(c, im, x, y + h * 0.45, h * 0.9, rot=-14 if i in gunga else 0)
        if i in pop:
            streck(c, x, y, r=r + 8, n=7, start=-170, slut=-10, col=(255, 255, 255))
        if i in gunga:
            arrow(c, [(x - r - 22, y + 6), (x - r * 0.4, y + r + 16), (x + r * 0.4, y + r + 16), (x + r + 22, y + 6)])


def discoljus(c):
    """Storyboardens bild av ljusen: mjuka ljusfläckar på golvet (i scenen glider de och byter färgton på takten)."""
    for x, y, rx, färg in [(300, 0.74 * H, 130, (255, 240, 190)), (860, 0.8 * H, 150, (255, 205, 215)), (1180, 0.7 * H, 110, (255, 236, 170))]:
        m, d = ritmask(c)
        d.ellipse((x - rx, y - rx * 0.32, x + rx, y + rx * 0.32), fill=255)
        c.paste(färg, mask=m.filter(ImageFilter.GaussianBlur(18)).point(lambda v: int(v * 0.55)))


def disco(n=0, pop=(), gunga=(), ljus=True):
    """ljus=False: utan storyboardens ljusfläckar (slut.png, där scenerna ritar ljusen i kod)."""
    c = DISCO_BILD.copy()
    ljusprickar(c)
    if ljus:
        discoljus(c)
    x, y, r = KULA
    bb, s = DISCOKULA.getbbox(), r / KULA_R0
    place(c, DISCOKULA, x - (KULA_MITT[0] - (bb[0] + bb[2]) / 2) * s, y + (bb[3] - KULA_MITT[1]) * s, (bb[3] - bb[1]) * s)
    stjärna(c, x - r * 0.4, y - r * 0.35, 9)
    stjärna(c, x + r * 0.45, y + r * 0.3, 7)
    if ljus:   # snurrpilen är storyboardens; slut.png (scenernas plåt) ska inte ha den
        arrow(c, [(x - r - 26, y + 6), (x - r * 0.4, y + r + 18), (x + r * 0.4, y + r + 18), (x + r + 26, y + 6)])
    if n:
        ikoner(c, n, pop, gunga)
    return c


# Rörelserna: Disa och Agda med peka_*, musen i sina vinklar. Statisternas enda rörelse: (rörelse, hopp, snurr).
RÖR = {"upp": dict(peka_r=(1500, -700), peka_l=(-480, -700)), "mage": dict(peka_r=MAGE_R, peka_l=MAGE_L), "stå": {}}
EGEN = {"grodan-gurra": ("upp", True, 0), "fjarilen-fia": ("snurra", False, -14), "musen-mille": ("klapp", False, 0)}


def dansbild(namn, rörelse=None, mood="skrattar"):
    hopp, snurr = False, 0
    if namn in EGEN:
        rörelse, hopp, snurr = EGEN[namn]
    rörelse = rörelse or "stå"
    if namn == "fjarilen-fia":
        return FIA, rörelse, hopp, snurr
    if namn == "musen-mille":
        return musen("skrattar", 150, 150), rörelse, hopp, snurr
    return figur(namn, mood if rörelse != "stå" else "glad", **RÖR[rörelse]), rörelse, hopp, snurr


def dansare(c, namn, rörelse=None, x=None, h=SOLO_H, fot=SOLO_FOT, hopp=None, lyft=0, fokus=True, lås=False):
    """lås: h och x gäller figuren som står (armarna nere), så att kroppen inte flyttar sig eller krymper när armarna går upp."""
    im, rörelse, egen_hopp, snurr = dansbild(namn, rörelse)
    hopp = egen_hopp if hopp is None else hopp
    x = W / 2 if x is None else x
    bb = im.getbbox()
    if lås:
        st = dansbild(namn, "stå")[0].getbbox()
        k = h / (st[3] - st[1])
        x, h = x + ((bb[0] + bb[2]) - (st[0] + st[2])) / 2 * k, (bb[3] - bb[1]) * k
    if namn == "fjarilen-fia":  # Fia flyger: ingen skugga på golvet, hon svävar lite högre
        fot -= h * 0.12
    else:
        skugga(c, x, fot - 4, (bb[2] - bb[0]) * h / (bb[3] - bb[1]) * 0.7, hopp or lyft)
    y = fot - (HOPP if hopp else 0) - lyft
    b = place(c, im, x, y, h, rot=snurr)
    s, x0, y0 = b
    if hopp:
        arrow(c, [(x - h * 0.55, fot - 20), (x - h * 0.55, fot - 120)])
    if snurr:
        r = h * 0.5
        arrow(c, [(x + r * math.cos(math.radians(a)), fot + 10 + r * 0.22 * math.sin(math.radians(a))) for a in range(200, -150, -25)])
    if rörelse == "klapp":
        streck(c, x, y0 + 60 * s, r=h * 0.12, n=3, start=-130, slut=-50)
    if fokus:
        stjärnregn(c, x, y - h * 0.55, h * 0.62)
    return b


V_ORDNING = ["fjarilen-fia", "grodan-gurra", "dinon-disa", "ankan-agda", "musen-mille"]
# Ett svagt V: Disa störst och ett steg fram (lägst), Gurra och Agda lite bakom, Mille ytterst och högst, med luft
# mellan alla. Höjderna gäller figuren som står. Fia (liten, Sanna 2026-11-05) flyger ovanför Gurras axel, mot Disa.
V_H = {"dinon-disa": 0.48, "grodan-gurra": 0.38, "ankan-agda": 0.38, "fjarilen-fia": 0.2, "musen-mille": 0.35}
V_FOT = {"dinon-disa": 0.905 * H, "grodan-gurra": 0.85 * H, "ankan-agda": 0.85 * H, "fjarilen-fia": 0.5 * H, "musen-mille": 0.835 * H}


def _v_rad():
    på_golvet = [n for n in V_ORDNING if n != "fjarilen-fia"]
    bred = {n: (lambda bb: (bb[2] - bb[0]) / (bb[3] - bb[1]))(dansbild(n, "stå")[0].getbbox()) * V_H[n] * H for n in på_golvet}
    lucka = 30
    x, rad = (W - sum(bred.values()) - 3 * lucka) / 2, {}
    for n in på_golvet:
        rad[n] = (x + bred[n] / 2, V_H[n] * H, V_FOT[n])
        x += bred[n] + lucka
    g = rad["grodan-gurra"][0] + bred["grodan-gurra"] / 2
    rad["fjarilen-fia"] = (g - 60, V_H["fjarilen-fia"] * H, V_FOT["fjarilen-fia"])
    return rad


RAD = _v_rad()


def alla(c, rörelse, hopp=False):
    """Alla fem i V:et; Disa och Agda gör rörelsen, statisterna sin egen. Stjärnregnet runt Disa."""
    for namn in sorted(V_ORDNING, key=V_H.get):
        egen = namn in EGEN
        x, h, fot = RAD[namn]
        dansare(c, namn, None if egen else rörelse, x=x, h=h, fot=fot, hopp=None if egen else hopp and namn == "dinon-disa",
                fokus=namn == "dinon-disa", lås=True)


def rgb(c):
    return c.convert("RGB")


c = disco(); dansare(c, "dinon-disa", "upp"); frames["15a"] = rgb(c)
DUO_H = 0.5 * H
c = disco()
dansare(c, "dinon-disa", "upp", x=W * 0.4, h=DUO_H, fokus=False)
dansare(c, "ankan-agda", "upp", x=W * 0.69, h=DUO_H, lyft=120)  # landar i höger tredjedel
arrow(c, [(W - 30, SOLO_FOT - DUO_H - 40), (W * 0.69 + 170, SOLO_FOT - DUO_H - 190), (W * 0.69 + 60, SOLO_FOT - DUO_H - 150)])
# sedan byter de plats (Agda i en hög båge över Disa, Disa i en låg under) och snurrar runt en gång; kameran åker sakta in
arrow(c, båge(W * 0.545, SOLO_FOT - DUO_H - 60, W * 0.13, 160, 20, ry=110))
arrow(c, båge(W * 0.545, SOLO_FOT - 20, W * 0.13, -160, -20, ry=40)[::-1])
frames["15b"] = rgb(c)
c = disco(); dansare(c, "grodan-gurra"); frames["15c"] = rgb(c)    # Hoppa, hoppa!
c = disco(); dansare(c, "fjarilen-fia", h=0.3 * H); frames["15d"] = rgb(c)    # Snurra runt!
c = disco(); dansare(c, "musen-mille"); frames["15e"] = rgb(c)     # Klappa, klappa!
c = disco(); alla(c, "upp", hopp=True); frames["15f"] = rgb(c)    # Alla dansar – orange dans!
c = disco()  # Orange dans! upprepas: en i taget (Gurra, Fia, Disa, Agda, Mille) i ett varmt ljus, kameran följer turen
m, d = ritmask(c)
d.ellipse((RAD["grodan-gurra"][0] - 150, RAD["grodan-gurra"][2] - 40, RAD["grodan-gurra"][0] + 150, RAD["grodan-gurra"][2] + 30), fill=255)
c.paste((255, 244, 200), mask=m.filter(ImageFilter.GaussianBlur(16)))
alla(c, "mage")
arrow(c, [(RAD["grodan-gurra"][0] + 80, 0.97 * H), (RAD["musen-mille"][0] - 80, 0.97 * H)])
frames["15g"] = rgb(c)

# 15a–c Sista refrängen: en snabb solobild per sak, småbilden poppar upp i bågen. 15d alla fem, 15e kvar i discot.
c = disco(1, [0])  # Fisken – orange!: grodan, fisken hoppar bredvid
place(c, FISK, W / 2 + 330, SOLO_FOT - 220, 110, rot=25)
arrow(c, båge(W / 2 + 330, SOLO_FOT - 110, 110, 170, 20, ry=150))
dansare(c, "grodan-gurra")
frames["16a"] = rgb(c)
c = disco(2, [1])  # Fågeln – orange!: musen bredvid fågeln, som fladdrar
place(c, FÅGEL, W / 2 + 310, SOLO_FOT - 200, 140)
dansare(c, "musen-mille")
frames["16b"] = rgb(c)
c = disco(5, [2, 3, 4])  # Väst och apelsin och båt – orange!: Disa, lite mindre och lägre så att hon inte når upp i bågen
dansare(c, "dinon-disa", "upp", hopp=True, h=0.48 * H, fot=0.9 * H)
frames["16c"] = rgb(c)
c = disco(5); alla(c, "mage"); frames["16d"] = rgb(c)  # Orange är bästa färgen
c = disco(5, gunga=[3]); alla(c, "mage"); frames["16e"] = rgb(c)  # som en fin apelsin!: apelsinen gungar extra

# 16 Hej då: kvar i discot. Disa sitter i båten på en remsa vatten över hela bredden och puttrar från vänster tredjedel
# till mitten och vinkar; där tar slutet (17) vid. De andra har dansat ut ur bild.
SLUT_X, SLUT_Y, SLUT_H = W / 2, H, 0.66 * H   # båtens plats i 17 (och i scener/slutet/): stor och nära, skrovet vid underkanten
SLUT_VÅG = SLUT_Y - 26 * SLUT_H / (0.5 * H)     # vågorna framför skrovet


def vattenremsa(c):
    """En mjuk vattenremsa längs golvet, med en vågig överkant."""
    m, d = ritmask(c)
    d.polygon([(x, 0.845 * H + 7 * math.sin(x / 70)) for x in range(-40, W + 60, 20)] + [(W + 40, H + 40), (-40, H + 40)], fill=255)
    kritfyll(c, m, VATTEN, vick=0.2, oskarp=3)


c = disco(5)
vattenremsa(c)
place(c, båten(vit=True, mood="blinkar", peka_r=VINKA), 0.38 * W, SLUT_Y, SLUT_H)
framvågor(c, SLUT_VÅG, -40, W + 40)
arrow(c, [(0.38 * W + 380, SLUT_VÅG - 60), (SLUT_X + 420, SLUT_VÅG - 60)])
frames["16f"] = rgb(c)

# 17 Slutet, som 005: kvar i discot, Disa i båten vinkar och en kritiris (Lilla Kvacks, produktion/code-shot/bedtime) sluter
# sig runt hennes ansikte: en vinglig cirkel med nio bucklor, svart utanför och en krämvit kant. Sedan stängs den och bilden
# blir svart. Inget fast outro efter (005 har inte heller något). SLUT_PLÅT är bakgrunden utan båten (lager/slut.png).
c = disco(5, ljus=False)
vattenremsa(c)
SLUT_PLÅT = c.copy()
b = place(c, båten(vit=True, mood="glad", peka_r=VINKA), SLUT_X, SLUT_Y, SLUT_H)
framvågor(c, SLUT_VÅG, -40, W + 40)
c = rgb(c)
ix, iy = disa_punkt(b, 511, 400)
m, d = ritmask(c)
ring = [(ix + 218 * (1 + 0.07 * math.sin(9 * a)) * math.cos(a), iy + 218 * (1 + 0.07 * math.sin(9 * a)) * math.sin(a))
        for a in np.linspace(0, 2 * math.pi, 145)]
d.rectangle((0, 0, W, H), fill=255)
d.polygon(ring, fill=0)
c.paste((0, 0, 0), mask=m)
ImageDraw.Draw(c).line(ring + ring[:1], fill=(255, 248, 224), width=14, joint="curve")
frames["17"] = c

out = HÄR / "frames"
out.mkdir(exist_ok=True)
for f in out.glob("*.jpg"):
    f.unlink()
for k, im in frames.items():
    papperskorn(im).resize((960, 536), Image.LANCZOS).save(out / f"{k}.jpg", quality=86)

# --- Sidan ---------------------------------------------------------------------------------------------------
REFRÄNG_TEXT = [
    ("Refrängdansen, likadan båda gångerna (se sang.md) och lugn: en enda dansbild på sjön för rad 1–7, utan klipp på slagen. Rad 1–2 ”Orange! (Orange!) Orange! (Orange!)”: Disa sträcker båda armarna rakt upp och båten gungar mjukt upp på en våg och ner igen, en gång per ”Orange! (Orange!)”. På refrängens första slag glider hela sjön långsamt över till orange (himlen ljus persika #FFD6AA, vattnet djupare orange), och den stannar orange hela refrängen. Båten får sin mörkorange kontur så att den syns mot vattnet. Inga blink.", "6 dansbild"),
    ("Rad 3 ”Orange är bästa färgen!”: samma bild, inget klipp. Händerna in mot magen (så långt in på den ljuslila magen de korta armarna når), hon gungar långsamt åt sidorna i halvtakt. Sjön är fortfarande orange.", "6 dansbild"),
    ("Rad 4–5 ”Orange! (Orange!) Orange! (Orange!)”: samma bild, armarna upp igen och samma mjuka gung som rad 1–2.", "6 dansbild"),
    ("Rad 6 ”Som en fin apelsin!”: apelsinens lilla ögonblick i samma dansbild, inget klipp. På radens första halva slag poppar en stor bubbla med apelsinen upp i himlen till höger om Disa (glitter), och kameran glider mjukt in mot Disa och bubblan (zoom 1,2 på ett och ett halvt slag). Fem mjuka vita glimtar med persikosken tänds en i taget runt bubblan och tindrar sakta (de växer och krymper lite på fyra slag, blinkar aldrig). Apelsinen har ett nöjt, lite kaxigt ansikte (slutna ögon, belåtet leende), gungar nöjt åt sidorna på slagen och blinkar på sista slaget. Disa pekar rakt på den, ritar en cirkel runt den med tassen och skrattar. På sista slaget glider kameran tillbaka ut, bubblan och glimtarna krymper bort och armarna landar där rad 7 börjar, så att dansbilden fortsätter utan ryck.", "6 dansbild"),
    ("Rad 7 ”Tut, tut, tut, tut”: samma bild, båten gungar två gånger på de första ”tut, tut”, och på de sista gör Disa två små knytnävspumpar. Tutet är båtens mistlur.", "6 dansbild"),
    ("Rad 8 ”vad är orange? Titta ut!”, refrängens enda klipp: närbild. Disa pekar ut åt höger med ena armen och tittar dit, och sedan med den andra armen åt vänster och tittar dit (de korta armarna når inte upp över ögonen). På radens sista slag glider sjön tillbaka till blått.", "3 närbild Disa"),
]
# Tiderna ur rader.txt (Whisper) genom klippet i film/klipp-sang.sh: avsnittstid = sångtid + 11 s före 1:30.0, + 13,3 s efter (en takt inlagd i frågepausen, inget borttaget).
# Rad 1–2 och 4–5 har en gemensam tid i rader.txt och delas på mitten. Refräng 1:s ”vad är orange? Titta ut!” (≈) är flyttad till
# 2,7 s efter ”Tut, tut” som i refräng 2 (Whisper gissade 0,7 s).
REFRÄNG_TID = {"05": ["1:03.3", "1:04.5", "1:05.6", "1:08.0", "1:09.1", "1:10.3", "1:12.6", "1:14.9", "1:17.3"],
               "09": ["1:47.0", "1:48.2", "1:49.3", "1:51.6", "1:52.8", "1:54.0", "1:56.3", "1:58.6", "2:01.0"]}
REFRÄNG_ID = ["a", "a", "b", "c", "c", "d", "e", "f"]  # bilden för varje tid i REFRÄNG_TID: rad 1–2 och 4–5 är en bild var


def refräng(n):
    t = REFRÄNG_TID[n]
    ljud = dict(d="(glitter)", e="(tut, tut: mistluren)")
    ut = []
    for k, (vad, kamera) in zip(dict.fromkeys(REFRÄNG_ID), REFRÄNG_TEXT):
        i = REFRÄNG_ID.index(k)
        ut.append((n + k, f"{t[i]}–{t[i + REFRÄNG_ID.count(k)]}", "Refräng", ljud.get(k, ""), vad, kamera))
    return ut


A_ = "A · Sjön"
B = "B · Bryggan"
D_ = "Danspaus · discot"
# (id, tid, scen, repliker och ljud, vad som händer, kamera). Avsnittstid, se ovan.
SHOTS = [
    ("01", "0:00.0–0:11.0", "Intro", "♪ Jingel: Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Samma intro som 003–005 med nytt nummer och ny titel: Avsnitt 6 · Orangea sången. Ljusblå vägg och en liten orange båt på kortet. (Bilden här är ritad i bygg.py; introt renderas som 005:s när det görs.)", "fast"),
    ("02", "0:11.0–0:17.8", "Kritan ritar", "(skrrrrt)", "”Kritan ritar, orange, lång …”: kritan ritar ett långt orange skrov med en grop i mitten och en hög spets åt höger (först ser det ut som en sko), och drar en ljus rand längs det.", "1 papper"),
    ("02a", "0:17.8–0:24.2", "Kritan ritar", "(skrrt, skrrt)", "”vad kan det vara?”: en pinne med en orange flagga bak, en vågig blå linje under skrovet och en liten grå motor bak, medan det sjungs.", "1 papper"),
    ("02b", "0:24.2–0:30.1", "Kritan ritar", "(skrrt)", "”Vad kan det vara?” och pausen: kritan ritar ett runt litet fönster (ventil), den sista ledtråden, och lyfter bort från det så att det syns.", "1 papper"),
    ("02c", "0:30.1–0:35.2", "Kritan ritar", "(tut-tut)", "”En båt! En orange båt! Tut-tut, nu kör vi!”: båten gungar till på vågen och kritan lyfter ut. Sist åker kameran in i teckningen, dit den riktiga båten står i 03.", "1 papper"),
    ("03", "0:35.2–0:37.2", A_, "(swoosh)", "Zoom in i den ritade båten: den blir Disas båt på sjön. Disa sitter redan i båten med flytvästen på. Mellanspelet börjar.", "zoom in"),
    ("03a", "0:37.2–0:39.4", A_, "DISA: Hej hej!", "Disa vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Tut-tut, nu kör vi!”: det sjöngs nyss.", "3 närbild Disa"),
    ("03b", "0:39.4–0:41.3", A_, "", "Hon lägger tassarna på båtens kant och tittar framåt.", "3 närbild Disa"),
    ("04", "0:41.3–0:45.2", A_, "(fladder)", "Mellanspelet, instrumentalt. Sjön glider, båten gungar med kölvatten bakom, Disa gungar med i takten och kameran glider sakta närmare båten. Fjärilen Fia fladdrar in från höger, gör en ögla runt Disas huvud (Disa skrattar och följer henne med blicken) och landar på flaggstångens topp.", "2 körscen"),
    ("041", "0:45.2–0:49.6", A_, "(dunk, dunk)", "”Dinon kör sin orange båt”: närbild, Disa klappar relingen med båda tassarna på slagen och skrattar, så att barnet kan klappa med. Mot slutet tittar hon bakåt mot flaggan, där Fia sitter.", "3 närbild Disa"),
    ("042", "0:49.6–0:53.2", A_, "(tut, tut, tut)", "”tut, tut, tut – på vågorna!”: körscenen igen, Fia sitter på flaggstången. På varje tut hoppar båten till, Disa ropar tut och en vit ring puffar ut ur hennes mun; Fia skuttar på stången. På ”på vågorna” gungar båten och vattnet mer än förut. Barnet kan säga tut.", "2 körscen"),
    ("04a", "0:53.2–1:03.3", A_, "(fladder)", "”Dinon letar orange nu”: samma körscen. Disa spanar och pekar åt vänster med vänster tass och lutar sig dit, sedan åt höger med höger tass, så att barnet kan peka med. Fia lyfter från stången och Disa pekar efter henne när hon flyger ut till höger. ”leta med – jag och du!”: Disa tittar på oss och nickar i takt medan kameran åker in mot henne. Sedan åker kameran ut igen och hon pekar framåt och spanar, som ”Titta ut!” i refrängen.", "2 körscen"),
    *refräng("05"),
    ("06", "1:17.3–1:19.5", A_, "(plask)", "”Vad är orange?”: en stor orange fisk hoppar upp ur vattnet mitt framför fören i en hög båge, med ett tydligt plask med droppar. Disa blir förvånad och tittar dit.", "2 körscen"),
    ("06a", "1:19.5–1:22.9", A_, "", "”Titta där! Fisken är orange”: sjön stannar och Disa pekar på fisken.", "2 körscen"),
    ("06b", "1:22.9–1:24.7", A_, "(plask, plask, plask)", "”plask, plask, plask”: närbild, fisken hoppar tre gånger i en båge över vattnet till höger om båten (hela bågen i bild), och Disa klappar en gång per plask.", "3 närbild Disa"),
    ("07", "1:24.7–1:28.8", A_, "", "”Vad är orange?”: sjön glider igen, fisken är borta, en orange mås flyger in från höger över vattnet.", "2 körscen"),
    ("07a", "1:28.8–1:32.0", A_, "", "”Titta där! Fågeln är orange”: sjön stannar, fågeln fladdrar på stället nere vid vattnet framför fören, och Disa pekar på den.", "2 körscen"),
    ("07b", "1:32.0–1:34.3", A_, "", "”pip, pip, pip”: närbild, Disa flaxar med armarna som vingar, en gång per ”pip”. Fågeln fladdrar bredvid henne, uppe till höger men inte i hörnet.", "3 närbild Disa"),
    ("08", "1:34.3–1:40.2", A_, "", "”Vad mer är orange? Kan du se?”: frågan till tittaren. Disa tittar ut mot tittaren med huvudet på sned och tassarna uppåt, frågande (som 13e).", "3 närbild Disa"),
    ("08a", "1:40.2–1:41.0", A_, "", "Pausen för barnet, kort (ingen inlagd takt längre: sången är oklippt, Sanna 2026-11-06): Disa tittar förväntansfullt på oss, sedan tydligt ner på sin mage (ledtråden), och kameran glider lugnt in en aning.", "3 närbild Disa, inåkning"),
    ("08b", "1:41.0–1:45.0", A_, "", "”Västen är orange – och flaggan med!”: Disa klappar på västen, pekar bakåt på båtens orange flagga och tittar upp på den.", "3 närbild Disa"),
    ("08c", "1:45.0–1:47.0", A_, "(dunk, dunk, dunk)", "”Dunk, dunk, dunk!”: hon klappar på relingen med båda tassarna, tre gånger, så att båten gungar. Barnet kan klappa på bordet.", "3 närbild Disa"),
    *refräng("09"),
    ("10", "2:01.0–2:01.6", "Kritsvep", "(skrrrrt)", "Kritsvep i bryggans ljusblå (#A8DCF2), från vänster till höger, precis innan ”Vad är orange?”.", "kritsvep"),
    ("11", "2:01.6–2:03.6", B, "(putt, putt)", "”Vad är orange?”: Agda sitter på bryggkanten med benen hängande över kanten och fruktkorgen bredvid sig. Båten puttrar in från vänster, hela båten i bild.", "4 helbild"),
    ("11a", "2:03.6–2:07.5", B, "", "”Titta där! Apelsinen är orange”: båten lägger till vid den långa bryggan, Disa hoppar upp på plankorna (landar bakom relingen) och den tomma båten glider lugnt ut åt vänster. Agda visar fram fruktkorgen med vingen och Disa pekar på apelsinen. Från här står Disa på bryggan hela scenen, och apelsinen är lika stor som i korgen hela vägen (Sanna, 2026-11-05). Kameran glider långsamt in mot korgen (platsens enda kamerarörelse); bilden visar slutläget.", "4 helbild"),
    ("11b", "2:07.5–2:10.5", B, "", "”rund, rund, rund”: närbild, Disa ritar en cirkel i luften framför sig med tassen.", "3 närbild Disa"),
    ("11d", "2:10.5–2:16.2", B, "DISA: Hej, ankan! · AGDA: Kvack! Hej, Disa! Vad vill du ha?", "Lucka i sången, ca 9,5 s (som Suno sjöng den), grooven fortsätter under. Närbild Agda med korgen: apelsinen (närmast Disa), det gröna äpplet och den gula bananen. Färgövningen: tre färger, Disa väljer.", "5 närbild Agda"),
    ("11e", "2:16.2–2:17.9", B, "DISA: Apelsin, tack!", "Klipp in till tvåbilden: Disa pekar på apelsinen i korgen.", "4 tvåbild (helbilden närmare)"),
    ("12", "2:17.9–2:20.0", B, "AGDA: Varsågod! · DISA: Tack! (pling)", "Tvåbild: Agda räcker ner apelsinen från bryggan, och den syns stor i luften mellan hennes vinge och Disas tass. Disa tar emot den. Äpplet och bananen ligger kvar i korgen.", "4 tvåbild (helbilden närmare)"),
    ("13a", "2:20.0–2:22.3", B, "(plask!)", "Vers 2, grooven tunnas ut. ”Oj, oj, plask! (Plask!)”: tvåbild, ett närmare utsnitt av helbilden. Apelsinen glider ur Disas tassar och plaskar i vattnet bredvid båten, kören ropar ”Plask!”. Båda blir förvånade.", "4 tvåbild (helbilden närmare)"),
    ("13b", "2:22.3–2:24.7", B, "", "”Där flöt den bort!”: samma tvåbild, apelsinen guppar bort åt höger på vågorna.", "4 tvåbild (helbilden närmare)"),
    ("13c", "2:24.7–2:29.1", B, "(Åh nej!)", "”Längre, längre, längre bort …”: apelsinen guppar ett steg utåt för varje ”längre”, åt höger och mot horisonten, och blir mindre tills den är en liten prick långt ut (spökringarna visar var den var). Disa och Agda följer den med blicken. Disa sträcker sig över relingen men når inte, båten lutar lite. Kören: ”Åh nej!”.", "4 tvåbild (helbilden närmare)"),
    ("13d", "2:29.1–2:33.9", B, "(snyft, snyft, snyft)", "”Dinon är ledsen – snyft, snyft, snyft”: närbild, Disa ledsen med en liten tår, en snyft per ord. Bara raden ut (ca 2 s ledsen), inget mer.", "3 närbild Disa"),
    ("13e", "2:33.9–2:36.3", B, "", "”Vem kan hjälpa? (Vem kan hjälpa?)”: närbild, Disa tittar ut mot tittaren med tassarna uppåt och en liten O-mun, frågande, inte ledsen längre.", "3 närbild Disa"),
    ("13f", "2:36.3–2:38.7", B, "", "Den hållna pausen, ca 2,3 s: barnet hinner ropa ”Ankan!”. Tvåbild: Agda på bryggkanten vrider sig och pekar med vingen på apelsinen, som blänker på vattnet (ledtråden). Disa tittar på tittaren.", "4 tvåbild (helbilden närmare)"),
    ("14a", "2:38.7–2:40.4", B, "", "Vers 3, hela grooven tillbaka. ”Ankan! (Ankan!)”: Agda, som har suttit, ställer sig upp på bryggan med vingarna bakåt, redo att hoppa. Disa ser henne och blir glad.", "4 tvåbild (helbilden närmare)"),
    ("14b", "2:40.4–2:42.0", B, "(plask!)", "”Ankan hoppar i – plask!”: Agda dyker med huvudet före från bryggan, ett stort plask.", "4 tvåbild (helbilden närmare)"),
    ("14c", "2:42.0–2:44.1", B, "(kvack, kvack, kvack)", "”Ankan simmar, kvack, kvack, kvack!”: Agda simmar hela vägen ut till apelsinen och blir mindre ju längre ut hon kommer, bara huvudet över vattnet, ringar efter henne.", "4 tvåbild (helbilden närmare)"),
    ("14d", "2:44.1–2:46.5", B, "", "”Hit med apelsinen – hit, hit, hit!”: Agda knuffar apelsinen med näbben tillbaka till båten samma väg, ett kliv närmare (och större) per ”hit”. Disa sträcker tassen mot den och skrattar.", "4 tvåbild (helbilden närmare)"),
    ("14e", "2:46.5–2:47.6", B, "", "”En halva var –”: samma bild som 14e2–14g, utan klipp. Disa står kvar på sin plats på bryggan och sträcker armarna upp med ett litet skutt. Agda står bredvid och håller upp den hela apelsinen hon hämtade.", "4 tvåbild (bryggan)"),
    ("14e2", "2:47.6–2:48.8", B, "", "”– till dig och mig!”: på bryggan, båten är ur bild. Agda har delat apelsinen, och båda håller upp sin halva i höjd med ansiktet: en halva var.", "4 tvåbild (bryggan)"),
    ("14f", "2:48.8–2:50.3", B, "", "”Mums, mums, mums”: båda på bryggan äter sin halva, en tugga per ”mums”.", "4 tvåbild (bryggan)"),
    ("14g", "2:50.3–2:52.6", B, "", "”– hurra, hurra!”: båda sträcker armarna upp. Apelsinen är slut, så händerna är fria till dansen.", "4 tvåbild (bryggan)"),
    ("15a", "2:52.6–2:53.8", D_, "(boing!)", "”Danspaus!”: klipp till discot, ljusorange med ett rutigt dansgolv i varma orange toner och en stor orange discokula som snurrar sakta och glittrar. Mjuka ljuskäglor från kulan och ljusfläckar som glider över golvet och figurerna och byter färgton på takten (lugnt, inget blinkar). Disa har klivit ur båten vid bryggan och dansar stor mitt i bild med armarna upp, med ett litet stjärnregn runt sig.", "6 dansbild (discot)"),
    ("15b", "2:53.8–3:02.2", D_, "(boing!)", "”(Danspaus!)”, ekot: Agda hoppar in från höger och landar bredvid henne i höger tredjedel, så att paret står i mitten, båda lite mindre (samma bild utan klipp). Sedan byter de plats (Agda i en hög båge över Disa), snurrar runt en gång tillsammans, och kameran åker sakta in mot dem.", "6 dansbild (discot)"),
    ("15c", "3:02.2–3:04.6", D_, "", "”Hoppa, hoppa!”: solobild, grodan Gurra ensam och stor mitt i bild, hoppar, stjärnregn runt honom.", "6 dansbild (discot)"),
    ("15d", "3:04.6–3:06.9", D_, "(fladder)", "”Snurra runt!”: solobild, fjärilen Fia snurrar i luften, stjärnregn runt henne.", "6 dansbild (discot)"),
    ("15e", "3:06.9–3:09.3", D_, "(klapp, klapp)", "”Klappa, klappa!”: solobild, musen Mille klappar med armarna upp, stjärnregn runt henne.", "6 dansbild (discot)"),
    ("15f", "3:09.3–3:11.7", D_, "", "”Alla dansar – orange dans!”: alla fem i ett svagt V med luft emellan, Disa i mitten lite större och ett steg fram, Gurra och Agda bredvid, Mille ytterst och Fia flygande ovanför Gurras axel. Disa står på samma plats i hela raden (15f–g, 16d–e). Disa och Agda har armarna upp, statisterna gör sin rörelse.", "6 dansbild (discot)"),
    ("15g", "3:11.7–3:21.0", D_, "", "”(Orange dans!)”, ekot, och grooven före sista refrängen: samma rad, men en i taget: Gurra hoppar, Fia flyger en ögla, Disa och Agda hoppar med armarna upp, Mille klappar, två slag var i ett varmt ljus på golvet medan de andra gungar (Disa och Agda med händerna på magen). Kameran är lite närmare och följer turen från vänster till höger. Sedan dansar alla tillsammans och kameran åker ut.", "6 dansbild (discot)"),
    ("16a", "3:21.0–3:22.5", D_, "(pop)", "Sista refrängen i discot, en snabb solobild per sak. Småbilderna poppar upp i en båge som hänger under discokulan, med luft till kanterna. ”Fisken – orange!”: grodan hoppar och fisken hoppar bredvid honom; fisken poppar upp som första småbild i bågen.", "6 dansbild (discot)"),
    ("16b", "3:22.5–3:24.8", D_, "(pop)", "”Fågeln – orange!”: solobild, musen klappar och fågeln fladdrar bredvid henne. Fågeln poppar upp i bågen.", "6 dansbild (discot)"),
    ("16c", "3:24.8–3:29.9", D_, "(pop, pop, pop)", "”Väst och apelsin och båt – orange!”: solobild, Disa hoppar med armarna upp (lite mindre, så att hon inte når upp i bågen). Västen, apelsinen och båten poppar upp i bågen, en per ord.", "6 dansbild (discot)"),
    ("16d", "3:29.9–3:31.9", D_, "", "”Orange är bästa färgen”: alla fem igen i raden, Disa och Agda med händerna på magen.", "6 dansbild (discot)"),
    ("16e", "3:31.9–3:34.5", D_, "", "”som en fin apelsin!”: kvar i discot, alla fem i raden. Apelsinen i bågen lutar och gungar extra, med en gungpil som kulans.", "6 dansbild (discot)"),
    ("16f", "3:34.5–3:43.7", D_, "(tut, tut)", "”Hej då, hej då – tut, tut!”: kvar i discot, under bågen med småbilderna. Disa sitter i båten (stor och nära, skrovet vid underkanten) på en mjuk remsa vatten längs golvet och puttrar från vänster tredjedel in till mitten och vinkar, där slutet tar vid; tutet är båtens mistlur. De andra har dansat ut ur bild. Sångens outro är kortat till 3 s och tonas ut i slutet av bilden.", "6 dansbild (discot)"),
    ("17", "3:43.7–3:48.1", "Avslutning", "(swoosh)", "Slutet, som 005: kvar i discot, båten mitt i bild där 16f slutade. Disa i båten vinkar, och en kritiris (en vinglig cirkel med nio bucklor och krämvit kant) sluter sig runt hennes ansikte på 1,6 s, håller på henne 1,2 s, stängs på 0,8 s, en stjärnglimt i det svarta och slutar svart. Sångens outro fortsätter under och tonas ut de sista 2 s. Inget fast outro efter.", "kritiris"),
]
assert sorted(s[0] for s in SHOTS) == sorted(frames), (set(s[0] for s in SHOTS) ^ set(frames))

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", A_: "#A8DCF2", "Refräng": "#FAC48E", "Kritsvep": "#A8DCF2",
        B: "#C49A6C", D_: "#FCDEBE", "Avslutning": "#c9bfae", "Outro": "#c9bfae"}


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + float(s)


REF = lambda n: [n + b for b in REFRÄNG_ID]
KARTA = {
    "Intro – kritan ritar": ["02", "02a", "02b", "02b", "02c", "02c"],
    "Vers 1": ["041", "042", "04a", "04a"],
    "Refräng": REF("05"),
    "Orange sak 1 – fisken": ["06", "06a", "06a", "06b"],
    "Orange sak 2 – fågeln": ["07", "07a", "07a", "07b"],
    "Frågan till tittaren": ["08", "08", "08a", "08b", "08c"],
    "Refräng #2": REF("09"),
    "Orange sak 3 – apelsinen (bryggan)": ["11", "11a", "11a", "11b", ["11d", "11e", "12"]],
    "Vers 2 – problemet": ["13a", "13b", "13c", "13d", "13e", "13f"],
    "Vers 3 – lösningen": [["14a", "14b"], "14c", "14d", ["14e", "14e2"], ["14f", "14g"]],
    "Danspaus": [["15a", "15b"], "15c", "15d", "15e", ["15f", "15g"]],
    "Sista refrängen – sammanfattning": ["16a", "16b", "16c", "16d", "16e", "16f"],
}

IDS = [s[0] for s in SHOTS]
SÅNG = {i: [] for i in IDS}


def läs_sång():
    avsnitt, namn = {}, None
    for rad in (HÄR.parent / "sang.md").read_text(encoding="utf-8").splitlines():
        rad = rad.strip()
        if rad.startswith("---"):
            break
        if rad.startswith("## "):
            namn = rad[3:].strip()
            if namn in avsnitt:
                namn += " #2"
            avsnitt[namn] = []
        elif namn and rad and not rad.startswith(("**", "-", "|")) and not (rad.startswith("*") and not rad.startswith("*(")):
            avsnitt[namn].append(rad)
    for namn, rader in list(avsnitt.items()):
        if not rader and namn.endswith(" #2"):
            avsnitt[namn] = avsnitt[namn[:-3]]
    return avsnitt


for namn, rader in läs_sång().items():
    if namn.startswith("Refrängdansen"):
        continue
    if namn not in KARTA:
        if rader:
            print(f"OBS: {namn!r} i sang.md har ingen bild i KARTA")
        continue
    visas = namn.removesuffix(" #2")
    for n, rad in enumerate(rader):
        mål = KARTA[namn][min(n, len(KARTA[namn]) - 1)]
        mål = mål if isinstance(mål, list) else [mål]
        typ = "paus" if rad.startswith("*(") else "sjungs"
        text = rad.strip("*()") if typ == "paus" else rad.replace("*", "")
        for k, sid in enumerate(mål):
            if ("rubrik", visas) not in SÅNG[sid]:
                SÅNG[sid].append(("rubrik", visas))
            SÅNG[sid].append((typ, text) if k == 0 else ("paus", "forts."))


def sång_html(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        t = html.escape(text)
        ut.append(f'<div class="sh">♪ {t}</div>' if typ == "rubrik" else f'<div class="sung">{t}</div>' if typ == "sjungs" else f'<div class="pause">{t}</div>')
    return f'<div class="song">{"".join(ut)}</div>' if ut else ""


def repliker(rad):
    return " · ".join(d for d in rad.split(" · ") if d and not d.startswith("♪"))


rows, scen = [], None
for sid, tid, sc, rad, vad, kamera in SHOTS:
    if sc != scen:
        if scen:
            rows.append("</div>")
        rows.append(f'<h3><span class="dot" style="background:{FÄRG[sc]}"></span>{html.escape(sc)}</h3><div class="frames">')
        scen = sc
    rows.append(
        f'<figure class="frame"><img src="frames/{sid}.jpg" alt="{html.escape(vad)}" width="960" height="536" loading="lazy">'
        f'<figcaption><div class="t">{sid} · {tid}</div>'
        + (f'<p class="line">{html.escape(repliker(rad))}</p>' if repliker(rad) else "")
        + sång_html(sid) + f'<p>{html.escape(vad)}</p><span class="tag">{html.escape(kamera)}</span></figcaption></figure>')
rows.append("</div>")

slut = SHOTS[-1][1].split("–")[1]
tl, total = [], sek(slut)
for sid, tid, sc, *_ in SHOTS:
    a, _, b = tid.partition("–")
    a, b = sek(a), sek(b)
    tl.append(f'<div style="left:{a / total * 100:.2f}%;width:{(b - a) / total * 100:.2f}%;background:{FÄRG[sc]}" title="{sid} {tid}">{sid}</div>')

ph = ("<li><b>Platshållare</b> (platta former i rätt färg tills bilderna finns; kör om bygg.py när de ligger i assets/): "
      + ", ".join(f"<code>{html.escape(p)}</code>" for p in dict.fromkeys(PLATSHÅLLARE)) + ".</li>") if PLATSHÅLLARE else \
     "<li><b>Platshållare:</b> inga, alla saker är riktiga bilder ur <code>assets/</code>.</li>"

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Orangea sången: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#E0661D;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 var(--body) }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1,h2,h3 {{ font-family:var(--display); margin:0; line-height:1.1 }}
h1 {{ font-size:clamp(34px,6vw,56px); font-weight:800 }} h1 span {{ color:var(--red) }}
h3 {{ font-size:22px; margin:36px 0 12px; display:flex; align-items:center; gap:10px }}
.dot {{ width:14px; height:14px; border-radius:50% }}
.lede {{ color:var(--muted); max-width:70ch; margin:10px 0 0 }}
.stats {{ display:flex; flex-wrap:wrap; gap:12px 36px; margin-top:24px }} .stats div {{ display:grid }}
.stats b {{ font:800 28px var(--display) }} .stats span {{ color:var(--muted); font-size:14px }}
.tl {{ position:relative; height:34px; margin-top:28px; overflow:hidden; border-radius:8px }}
.tl div {{ position:absolute; top:0; bottom:0; border:2px solid var(--paper); border-radius:7px; font:600 11px var(--mono); color:#241f18; display:flex; align-items:center; justify-content:center; overflow:hidden }}
.frames {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px }}
.frame {{ margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }}
.frame img {{ width:100%; height:auto; display:block }}
figcaption {{ padding:12px 14px 14px; display:grid; gap:6px; font-size:14px }}
.t {{ font:500 12px var(--mono); color:var(--muted) }}
.line {{ font-weight:700; margin:0 }}
.song {{ border-left:3px solid #E0661D; padding-left:10px; display:grid; gap:1px }}
.sh {{ font:500 11px var(--mono); color:var(--muted); margin-top:4px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
.pause {{ justify-self:start; font:500 11px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:1px 8px; margin:2px 0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
.utkast {{ display:inline-block; margin-top:14px; font:500 12px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:3px 10px }}
</style></head><body><div class="wrap">
<h1>Orangea sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 006, utkast. Bilderna är byggda av utklippen i <code>assets/</code> med ansiktena ritade i kod; det som inte finns än är platta former i rätt färg. Pilarna och strecken visar rörelsen.</p>
<span class="utkast">Tiderna ur sången (oklippt, sang-klippt.m4a har bara kortare slut). Avsnittstid = sångtid + 11 s.</span>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>2 + 3</b><span>figurer + statister</span></div><div><b>1</b><span>körscen</span></div><div><b>6</b><span>kamerainställningar (max 6)</span></div><div><b>~{slut}</b><span>längd</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Ekot sjungs av kören. Varje orange sak har en rörelse i bild i stället för en replik: plask (06b), stor (07b), dunk (08c), rund (11b).</li>
<li><b>Refrängen är en dans</b> (05, 09 och sista refrängen 15), lugn och likadan alla tre gångerna: en dansbild på sjön som blir orange under refrängen, en bubbla med en nöjd apelsin på rad 6 och en närbild på ”Titta ut!”.</li>
<li><b>Båten</b> är i lager: bortre relingen med flaggan och motorn, Disa, skrovet, Disas armar. Den gungar på vågorna i stället för att hjulen snurrar; vattnet ligger framför skrovets nederkant. Disas flytväst är ritad i kod.</li>
<li><b>Bryggan</b>: Agda sitter på bryggkanten med korgen, båten lägger till nedanför. Disa stannar i båten hela tiden vid bryggan (antagande).</li>
{ph}
<li><b>Sångraderna</b> under varje bild läses ur sang.md (♪ sjungs, gul lapp = paus eller lucka). Fetstilt = repliker.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")


def sång_md(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        ut.append(f"**{text}**" if typ == "rubrik" else f"♪ *{text}*" if typ == "sjungs" else f"⏸ {text}")
    return "<br>".join(ut).replace("|", "/")


md = HÄR.parent / "storyboard.md"
tabell = ["| # | Tid (uppsk.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |", "|---|---|---|---|---|---|"]
for sid, tid, sc, rad, vad, kamera in SHOTS:
    tabell.append(f"| {sid} | {tid} | {sc} · {kamera} | {vad} | {repliker(rad)} | {sång_md(sid)} |".replace("\n", " "))
if md.exists():
    text = md.read_text(encoding="utf-8")
    start, slutm = "<!-- tabell: skrivs av storyboard/bygg.py -->", "<!-- /tabell -->"
    if start in text:
        före, _, rest = text.partition(start)
        _, _, efter = rest.partition(slutm)
        md.write_text(före + start + "\n" + "\n".join(tabell) + "\n" + slutm + efter, encoding="utf-8")
print(f"{len(frames)} bilder, index.html klar" + (f", platshållare: {', '.join(dict.fromkeys(PLATSHÅLLARE))}" if PLATSHÅLLARE else ", inga platshållare"))
