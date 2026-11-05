"""Bygger storyboarden för avsnitt 006 (Orange sången) av utklippen och bakgrunderna. Kopierad från 005:s bygg.py och bytt:
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

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
ORANGE = (242, 107, 29)       # #F26B1D, blixten på rösten
LJUSORANGE = (250, 196, 142)  # #FAC48E, blixten på ekot
BÅT_OR = (243, 138, 52)       # båtens skrov, lite ljusare än blixten så att det syns mot den
KONTUR_OR = (176, 66, 12)     # mörkorange kritkontur runt båten i blixten
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
    "sol": "bakgrunder/sjon-saker/sol-orange.png",
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


def ph_sol():
    im, d = tom(300, 300)
    m, dm = ritmask(im)
    dm.ellipse((40, 40, 260, 260), fill=255)
    kritfyll(im, m, (250, 150, 50), vick=0.25)
    return im


def ph_korg():
    """Agdas fruktkorg: en brun korg med en apelsin, ett grönt äpple och en gul banan (apelsinen läggs i separat)."""
    im, d = tom(520, 360)
    äpple, banan = A / "rekvisita/applet-gront.png", A / "rekvisita/banan.png"
    if äpple.exists() and banan.exists():  # de riktiga utklippen (Flow, 2026-11-05) i korgen, korgen själv i kod
        for f, box in ((banan, (250, 0, 500, 220)), (äpple, (130, 50, 300, 220))):
            b = Image.open(f).convert("RGBA"); b = b.crop(b.getbbox())
            k = min((box[2] - box[0]) / b.width, (box[3] - box[1]) / b.height)
            b = b.resize((round(b.width * k), round(b.height * k)), Image.LANCZOS)
            im.alpha_composite(b, (box[0] + (box[2] - box[0] - b.width) // 2, box[3] - b.height))
    else:
        m, dm = ritmask(im)
        dm.ellipse((150, 70, 290, 210), fill=255)
        kritfyll(im, m, (120, 196, 70), vick=0.25)  # grönt äpple
        m, dm = ritmask(im)
        dm.arc((250, -10, 500, 220), 30, 150, fill=255, width=46)
        kritfyll(im, m, (250, 214, 70), vick=0.25)  # gul banan
    m, dm = ritmask(im)
    dm.chord((20, 40, 500, 360), 0, 180, fill=255)
    kritfyll(im, m, (176, 120, 70), vick=0.25)
    m, dm = ritmask(im)
    for x in range(60, 480, 46):
        dm.line((x, 210, x + 10, 340), fill=255, width=5)
    kritfyll(im, m, (130, 84, 46), alpha=0.8, vick=0.1, oskarp=0.6)
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


def bryggan_plåt():
    if "bryggan" not in _plåt:
        _plåt["bryggan"] = bild("bryggan", ph_bryggan).convert("RGB").resize((W, H))
    return _plåt["bryggan"]


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
          med_väst=None):
    """En figur ur riggen med ansiktet ritat. arm_* = vinkel (grader moturs), peka_* = punkt armen pekar mot.
    håll = {"r": (bild, höjd)}: en sak i den handen. lager: allt, kropp (utan armar) eller armar (bara armarna).
    med_väst: Disas flytväst (standard för dinon). Delar som riggen saknar hoppas över."""
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
                    c.alpha_composite(Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA"))
        c.alpha_composite(Image.open(mapp / rig["kropp"]).convert("RGBA"))
        if med_väst if med_väst is not None else namn == "dinon-disa":
            väst(c)
        rita_ansikte(c, mood, (blick[0] / 9, blick[1] / 9), **ANSIKTE[namn])
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
FISK = bild("fisk", ph_fisk)
PUMPA = bild("pumpa", ph_pumpa)


def fågel(vinge=25):
    """Fågeln rakt framifrån ur sina delar (fagel/fagel-rigg.json): vingarna bakom kroppen, vridna `vinge` grader uppåt
    runt axlarna, sedan kroppen och ögonen (ritade här, som figurernas)."""
    mapp = A / "bakgrunder/sjon-saker/fagel"
    rigg = json.loads((mapp / "fagel-rigg.json").read_text())
    im = Image.new("RGBA", (1024, 1024))
    for namn, tecken in (("vinge-l", -1), ("vinge-r", 1)):
        v = rigg["delar"][namn]
        im.alpha_composite(Image.open(mapp / v["fil"]).convert("RGBA").rotate(tecken * vinge, center=tuple(v["vridpunkt"]), resample=Image.BICUBIC))
    im.alpha_composite(Image.open(mapp / rigg["kropp"]).convert("RGBA"))
    d = ImageDraw.Draw(im); ö = rigg["ogon"]
    for x, y in (ö["l"], ö["r"]):
        d.ellipse((x - ö["r_vit"], y - ö["r_vit"], x + ö["r_vit"], y + ö["r_vit"]), fill=(255, 255, 255, 255))
        d.ellipse((x - ö["r_svart"], y - ö["r_svart"] + 4, x + ö["r_svart"], y + ö["r_svart"] + 4), fill=(29, 29, 29, 255))
    return im


FÅGEL = fågel()   # orange sak 2 (Sanna, 2026-11-05: i stället för pumpan); vingen uppe = den flyger
SOL = bild("sol", ph_sol)
KORG = ph_korg()  # korgen i kod med det riktiga äpplet och bananen


def halva():
    """En halva av den skalade apelsinen, delad i klyftor (Flow, 2026-11-05), som Disa och Agda håller.
    Saknas bilden: den runda snittytan i kod."""
    f = A / "rekvisita/apelsin-klyftor-vanster.png"
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
GV, BÅT_H, BÅT_X = 735, 470, W / 3
NÄR_H, NÄR_ÖGON = 820, 0.42  # närbildens höjd i Disas koordinater och ögonens läge uppifrån


def framvågor(c, y0, x0=0, x1=W):
    """Vatten och vita vågkammar framför båtens nederkant, så att den ligger i vattnet och inte på det."""
    m, d = ritmask(c)
    pts = [(x, y0 + 6 * math.sin(x / 38)) for x in range(x0 - 20, x1 + 40, 12)]
    d.polygon(pts + [(x1 + 40, H + 10), (x0 - 20, H + 10)], fill=255)
    kritfyll(c, m, VATTEN, vick=0.12, oskarp=1)
    m, d = ritmask(c)
    d.line(pts, fill=255, width=7)
    kritfyll(c, m, (230, 245, 252), vick=0.15, oskarp=0.8)


def körscen(stuff=None, fart=True, gung=True, sol=True, plåt=None, gv=GV, **kw):
    c = (plåt or sjön_plåt()).copy()
    if sol:
        place(c, SOL, 1180, 250, 110)
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


# Peka-riktningar i Disas koordinater (bara riktningen räknas)
HÖGER, UPP_HÖGER, UPP = (3000, 600), (3000, -2200), (950, -3000)
VINKA = (1500, -500)  # handen snett upp och ut
MAGE_R, MAGE_L = (512, 760), (512, 760)  # mot magens mitt: de korta armarna når magens kant

frames = {}

# 01 Intro: titelkortet (inget renderat intro för 006 än: ritat här, se kontrollen)
c = Image.new("RGB", (W, H), HIMMEL)
color_text(c, H * 0.36, "Orange sången", 120, [(232, 96, 20), (31, 105, 173), (106, 44, 145), (198, 40, 40), (46, 125, 50)])
color_text(c, H * 0.18, "Avsnitt 6", 64)
place(c, båten(med_disa=False, vit=True), W / 2, H * 0.9, 230)
frames["01"] = c


# 02–02c Kritan ritar båten: skrovet, under frågan flaggan och vågen, sedan ventilen och svaret
def ritad_båt(c, flagga=False, våg=False, ventil=False, lyft=0):
    x0, y0 = 430, 340 - lyft
    m, d = ritmask(c)
    d.chord((x0, y0 - 40, x0 + 520, y0 + 200), 0, 180, fill=255)
    d.polygon([(x0 + 460, y0 + 80), (x0 + 560, y0 + 50), (x0 + 500, y0 + 150)], fill=255)
    kritfyll(c, m, BÅT_OR, vick=0.4, oskarp=3)
    if flagga:
        m, d = ritmask(c)
        d.line((x0 + 80, y0 + 80, x0 + 80, y0 - 120), fill=255, width=10)
        kritfyll(c, m, (110, 76, 50), vick=0.2)
        m, d = ritmask(c)
        d.polygon([(x0 + 86, y0 - 120), (x0 + 190, y0 - 90), (x0 + 86, y0 - 60)], fill=255)
        kritfyll(c, m, ORANGE, vick=0.3)
    if våg:
        m, d = ritmask(c)
        d.line([(x, y0 + 215 + 14 * math.sin(x / 30)) for x in range(x0 - 80, x0 + 640, 8)], fill=255, width=12)
        kritfyll(c, m, (70, 150, 210), vick=0.3)
    if ventil:
        m, d = ritmask(c)
        d.ellipse((x0 + 330, y0 + 100, x0 + 390, y0 + 160), fill=255)
        kritfyll(c, m, (150, 210, 238), vick=0.2, oskarp=1.2)


c = paper(); ritad_båt(c); krita(c, 960, 520); frames["02"] = c
c = paper(); ritad_båt(c, flagga=True, våg=True); krita(c, 1060, 560); frames["02a"] = c
c = paper(); ritad_båt(c, flagga=True, våg=True, ventil=True); krita(c, 820, 470); frames["02b"] = c
c = paper(); ritad_båt(c, flagga=True, våg=True, ventil=True, lyft=30); krita(c, 1080, 200)
arrow(c, [(380, 560), (380, 460), (380, 560)])
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

# 04 Vers 1: sjön glider, båten gungar, Fia fladdrar förbi högt uppe. 04a: Disa spanar med handen över ögonen.
c, b = körscen(lambda c: (place(c, FIA, 1000, 230, 100, rot=8), arrow(c, [(1130, 180), (900, 250)])))
frames["04"] = c
c, b = körscen(mood="nyfiken", peka_r=(560, 330), blick=(9, 0))
frames["04a"] = c


# Refrängdansen (sang.md), likadan alla tre gångerna: dansbild (kamera 6: båten i mitten och större, vattnet står
# still) och närbild (kamera 3). Rad 1–2 och 4–5 i orange blixt, rad 6 en bubbla med apelsinen.
DANS = {
    "upp": dict(mood="ropar", peka_r=(1500, -700), peka_l=(-480, -700)),
    "mage": dict(mood="karleksfull", peka_r=MAGE_R, peka_l=MAGE_L),
    "putt": dict(mood="skrattar", peka_r=(1300, 200), peka_l=(-280, 200)),  # knytnävspumpar framför sig
    "titta": dict(mood="nyfiken", peka_r=(640, 200), rot=-8),  # tassen som skärm vid ögat, huvudet lutat mot den
    "visa": dict(mood="skrattar", peka_r=(1500, -300)),  # pekar upp mot bubblan med apelsinen
}
RADER = [("upp", True, "D"), ("mage", False, "N"), ("upp", True, "D"), ("visa", False, "P"), ("putt", True, "D"), ("titta", False, "N")]
HOPP = 40  # så högt båten gungar upp på vågen i takt
DANS_X, DANS_G, DANS_H = W / 2, 690, 540


def dansa(c, rörelse, hopp, x, ground, h, vit=False, kontur=False, vatten=True):
    """Båten med Disa i dansrörelsen. På sjön ligger båten i vattnet; i blixten står den på sin skugga."""
    bå = båten(vit=vit, kontur=kontur, **DANS[rörelse])
    box = bå.getbbox()
    if not vatten:
        skugga(c, x, ground - 6, (box[2] - box[0]) * h / (box[3] - box[1]) * 0.85, hopp, col=(120, 50, 10))
    b = place(c, bå, x, ground - (HOPP if hopp else 0), h)
    if kontur:
        sk, x0, y0 = b
        m = Image.new("L", c.size)
        m.paste(bå.kontur.resize((round(bå.width * sk), round(bå.height * sk)), Image.LANCZOS), (x0, y0))
        kritfyll(c, m, KONTUR_OR, vick=0.2, oskarp=0.8)
    if vatten:
        framvågor(c, ground - 30)
    hx, hy = disa_punkt(b, 512, 160)
    if hopp:
        arrow(c, [(x - h * 0.62, ground - 30), (x - h * 0.62, ground - 150)])
    if rörelse == "upp":
        for px in (60, 964):
            ax, ay = disa_punkt(b, px, 330)
            arrow(c, [(ax, ay), (ax, ay - h * 0.14)])
    if rörelse == "mage":  # gunga åt sidorna i reggaetakten
        arrow(c, [(hx, hy - 10), (hx - 110, hy + 10)])
        arrow(c, [(hx, hy - 10), (hx + 110, hy + 10)])
    if rörelse == "titta":
        arrow(c, [(hx, hy), (hx + 150, hy)])
        arrow(c, [(hx, hy), (hx - 150, hy)])
    if rörelse == "putt":  # "putt, putt": gunga två gånger; "tut, tut": två knytnävspumpar (tutet är båtens mistlur)
        for px in (130, 900):
            ax, ay = disa_punkt(b, px, 380)
            arrow(c, [(ax, ay), (ax, ay - h * 0.08)])
        streck(c, *disa_punkt(b, 80, 300), r=h * 0.05, n=4, start=-200, slut=-120)  # tut
    return b


def refrängbild(rörelse, hopp):
    c = sjön_plåt().copy()
    return c, dansa(c, rörelse, hopp, DANS_X, DANS_G, DANS_H)


def färgad_plåt(färg):
    """Discots plåt omfärgad till färg, med kritstrukturen kvar (som rosa_plåt i 005)."""
    l = np.asarray(Image.open(A / "bakgrunder/danspaus/danspaus.png").convert("L").resize((W, H)), dtype=np.float32)
    k = (l / l.mean())[..., None]
    return Image.fromarray(np.clip(np.array(färg, dtype=np.float32) * k, 0, 255).astype(np.uint8))


BLIXT = {"rop": färgad_plåt(ORANGE), "eko": färgad_plåt(LJUSORANGE)}


def blixtbild(rörelse, hopp, färg):
    c = BLIXT[färg].copy()
    return c, dansa(c, rörelse, hopp, DANS_X, DANS_G + 20, DANS_H, vit=True, kontur=True, vatten=False)


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


# Rad 6 "Som en fin apelsin!" (Sannas text, 2026-11-05): dansbilden på sjön. En bubbla med apelsinen poppar upp i himlen till
# höger om Disa (som bubblorna i 005:s refräng); hon pekar på den och ritar en cirkel runt den med tassen.
# (Jättepumpan och pumpan är strukna: för slumpmässiga på sjön.)
REF_BUBBLOR = [(APELSIN, W - 230, 185)]   # sak, mitt x, mitt y ("Som en fin apelsin!", Sannas text 2026-11-05)
BUBBLA_R, BUBBLA_SAK = 100, 125


def bubbla(c, sak, x, y):
    lag = Image.new("RGBA", c.size, (0, 0, 0, 0)); d = ImageDraw.Draw(lag)
    d.ellipse((x - BUBBLA_R, y - BUBBLA_R, x + BUBBLA_R, y + BUBBLA_R), fill=(255, 255, 255, 70), outline=(255, 255, 255, 255), width=7)
    d.arc((x - 70, y - 70, x + 70, y + 70), 200, 250, fill=(255, 255, 255, 220), width=9)
    ut = Image.alpha_composite(c.convert("RGBA"), lag)
    place(ut, sak, x, y + BUBBLA_SAK / 2, BUBBLA_SAK)
    streck(ut, x, y - BUBBLA_R - 8, r=36, n=5, start=-160, slut=-20, col=(255, 255, 255))  # pop
    return ut


def pumpbild():
    c = sjön_plåt().copy()
    dansa(c, "visa", False, DANS_X, DANS_G, DANS_H)
    for sak, x, y in REF_BUBBLOR:
        c = bubbla(c, sak, x, y)
        arrow(c, båge(x, y, BUBBLA_R + 30, 200, -120, steg=20))   # tassen ritar en cirkel runt den
    return c.convert("RGB")


PUMP_BILD = pumpbild()


def mönster(c, platser, h):
    """Disa i båten kopierad (renderad en gång). Alla hoppar i takt med armarna upp och poppar fram samtidigt."""
    bå = båten(vit=True, kontur=True, **DANS["upp"])
    for x, g in platser:
        sk, x0, y0 = place(c, bå, x, g - h * 0.08, h)
        m = Image.new("L", c.size)
        m.paste(bå.kontur.resize((round(bå.width * sk), round(bå.height * sk)), Image.LANCZOS), (x0, y0))
        kritfyll(c, m, KONTUR_OR, vick=0.2, oskarp=0.8)
        streck(c, x, g - h * 1.02, r=h * 0.2, n=5, start=-160, slut=-20, col=(255, 255, 255))


FYRA = [(x * W, g * H) for g in (0.47, 0.96) for x in (0.3, 0.7)]
TAPET = [((k + 0.5 * (rad % 2) + 0.125) * W / 4, g * H) for rad, g in enumerate((0.36, 0.67, 0.98)) for k in range(-1, 5)]


def mönsterbild(färg, platser, h):
    c = BLIXT[färg].copy()
    mönster(c, platser, h)
    return c


for i, (rörelse, hopp, klipp) in enumerate(RADER):
    if klipp == "P":
        im = PUMP_BILD
    else:
        c, b = refrängbild(rörelse, hopp)
        im = c if klipp == "D" else närbild(c, b)
    for n in ("05", "09"):
        frames[n + "abcdef"[i]] = im
        if i == 0:
            frames[n + "a"] = blixtbild(rörelse, hopp, "rop")[0]
            frames[n + "a2"] = blixtbild(rörelse, hopp, "eko")[0]
        if i == 2:
            frames[n + "c"] = mönsterbild("rop", FYRA, 0.38 * H)
            frames[n + "c2"] = mönsterbild("eko", TAPET, 0.19 * H)

# 06 Fisken: en orange fisk hoppar upp ur vattnet framför båten, Disa tittar dit
FISK_X, FISK_Y = W * 2 / 3 + 40, 540


def fisken(c, x=FISK_X, y=FISK_Y, rot=25, båg=True):
    place(c, FISK, x, y, 120, rot=rot)
    if båg:
        arrow(c, båge(x, y + 110, 150, 170, 20, ry=170))
    stänk(c, x - 150, y + 110, 34)


c, b = körscen(lambda c: fisken(c), blick=(10, 0), mood="forvanad")
frames["06"] = c
# 06a … sjön stannar, Disa pekar på fisken
c, b = körscen(lambda c: fisken(c, båg=False), fart=False, mood="forvanad", peka_r=HÖGER, blick=(10, -2))
frames["06a"] = c
# 06b plask, plask, plask: närbild, fisken hoppar tre gånger i en båge bredvid båten och Disa klappar en gång per plask
c, b = körscen(fart=False, gung=False, mood="skrattar", peka_r=(470, 640), peka_l=(560, 640), blick=(10, 0))
x, y = disa_punkt(b, 1000, 560)
for dx, dy, r in ((0, 40, 35), (80, -10, 0), (160, 40, -35)):  # tre hopp i en båge, ett per plask
    place(c, FISK, x + dx, y + dy, 46, rot=r)
stänk(c, x - 20, y + 90, 20)
stänk(c, x + 180, y + 90, 20)
streck(c, *disa_punkt(b, 512, 600), r=34, n=5, start=-170, slut=-10)  # klapp
frames["06b"] = närbild(c, b, dx=60)

# 07 Orange sak 2 – fågeln: en liten orange fågel flyger in över sjön och fladdrar bredvid båten (pip, pip, pip)
FÅGEL_X, FÅGEL_Y, FÅGEL_H = W * 2 / 3 + 80, 300, 120
c, b = körscen(lambda c: (place(c, FÅGEL, 1280, 400, FÅGEL_H), arrow(c, båge(1180, 470, 120, 30, 150, ry=60))), blick=(10, -4))
frames["07"] = c
c, b = körscen(lambda c: place(c, FÅGEL, FÅGEL_X, FÅGEL_Y, FÅGEL_H), fart=False, mood="forvanad", peka_r=(3000, -900), blick=(10, -8))
frames["07a"] = c
# 07b pip, pip, pip: närbild, Disa flaxar med armarna som vingar, en gång per "pip"; fågeln fladdrar bredvid
c, b = körscen(fart=False, gung=False, mood="skrattar", peka_r=(3000, -200), peka_l=(-3000, -200))
place(c, FÅGEL, *disa_punkt(b, 1060, 300), FÅGEL_H)   # i närbilden, uppe till höger om Disa
for px in (40, 984):
    ax, ay = disa_punkt(b, px, 520)
    arrow(c, [(ax, ay + 50), (ax, ay - 50)])
frames["07b"] = närbild(c, b)

# 08 Frågan: frågande min mot tittaren
c, b = körscen(fart=False, gung=False, mood="nyfiken", blick=(-9, 4))
frames["08"] = närbild(c, b)
# 08a Pausen: Disa tittar ner på sin mage, kameran åker in mot den orange västen (ca 1,5×)
c, b = körscen(fart=False, gung=False, gv=GV - 160, mood="glad", blick=(0, 9))  # båten högre i plåten, så att västen kan hamna mitt i bild
vx, vy = disa_punkt(b, 512, 650)
zw = NÄR_H * DISA_K * b[0] * W / H / 1.5
im = crop_zoom(c, vx, vy - 40, zw)
for hx, hy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
    ax, ay = W / 2 + hx * (W / 2 - 40), H / 2 + hy * (H / 2 - 40)
    arrow(im, [(ax, ay), (ax - hx * 90, ay - hy * 90 * H / W)])
frames["08a"] = im
# 08b Västen är orange – och flaggan med!: ena tassen på västen, den andra pekar bakåt på flaggan i aktern
c, b = körscen(fart=False, gung=False, mood="skrattar", peka_r=MAGE_R, peka_l=(-3000, -1500), blick=(-8, -6))
frames["08b"] = närbild(c, b, dx=-60)
# 08c Dunk, dunk, dunk!: Disa stampar så att båten gungar (lutar)
c, b = körscen(fart=False, gung=True, mood="skrattar", peka_r=(1400, -300), peka_l=(-380, -300), rot=0)
for px in (400, 640):
    streck(c, *disa_punkt(b, px, 980), r=26, n=3, start=-200 if px < 512 else -40, slut=-140 if px < 512 else 20)
frames["08c"] = närbild(c, b)

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
AGDA_X, AGDA_K = 1000, 0.36
AGDA_FOT = BRYGG_Y + 30 + (975 - 830) * AGDA_K   # sitter på kanten: kroppen mot bryggans framkant, fötterna hänger ner mot vattnet
KORG_X, KORG_G, KORG_H = 1200, BRYGG_Y + 18, 110
GK, BRYGG_BÅT_X, BRYGG_BÅT_H = 735, 640, 470


def agda(mood="glad", **kw):
    return figur("ankan-agda", mood, **kw)


def sätt(c, im, x, fot, k):
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.paste(im, (round(x - 512 * k), round(fot - 926 * k)), im)


def korgen(c, apelsin=True, x=KORG_X):
    place(c, KORG, x, KORG_G, KORG_H)
    if apelsin:
        place(c, APELSIN, x - 50, KORG_G - KORG_H * 0.45, 48)


def brygga(mood="glad", agda_med=True, apelsin_i_korgen=True, agda_x=AGDA_X, agda_fot=AGDA_FOT, korg_x=KORG_X, **kw):
    c = bryggan_plåt().copy()
    korgen(c, apelsin_i_korgen, korg_x)
    if agda_med:
        sätt(c, agda(mood, **kw), agda_x, agda_fot, AGDA_K)
    return c


def vid_bryggan(c, x=BRYGG_BÅT_X, lut=0, **kw):
    b = place(c, båten(vit=True, **kw), x, GK, BRYGG_BÅT_H, rot=-1 + lut)
    framvågor(c, GK - 34, 0, W)
    return b


def agda_närbild(c):
    return crop_zoom(c, (AGDA_X + KORG_X) / 2 - 20, BRYGG_Y - 60, 640)


TVÅ_CX, TVÅ_CY, TVÅ_W = 860, 470, 1000


def tvåbild(c):
    return crop_zoom(c, TVÅ_CX, TVÅ_CY, TVÅ_W)


# 11 Båten puttrar in från vänster mot bryggan
c = brygga(blick=(-8, 0))
vid_bryggan(c, 330, blick=(10, 0))
arrow(c, [(40, 330), (220, 330)])
frames["11"] = c
# 11a Titta där – apelsinen är orange: båten har lagt till, Disa pekar på apelsinen i korgen; kameran glider in mot korgen
c = brygga(blick=(-6, 2))
vid_bryggan(c, mood="forvanad", peka_r=(3000, -900), blick=(9, -6))
frames["11a"] = crop_zoom(c, 900, 440, 1100)
# 11b rund, rund, rund: närbild, Disa ritar en cirkel i luften med tassen
c = brygga()
b = vid_bryggan(c, mood="skrattar", peka_r=(1200, -500), blick=(8, -6))
x, y = disa_punkt(b, 1080, 120)
arrow(c, båge(x, y, 60, 90, 420, steg=25))
frames["11b"] = närbild(c, b)
# 11d Hej, ankan! Kvack! Hej, Disa! Vad vill du ha?: närbild Agda med korgen (apelsin, grönt äpple, gul banan)
c = brygga("skrattar", blick=(-6, 0), peka_r=(1600, 520))
frames["11d"] = agda_närbild(c)
# 11e Apelsin, tack!: Disa pekar på apelsinen
c = brygga(blick=(-10, 2))
vid_bryggan(c, mood="skrattar", rot=-6, peka_r=(3000, -700), blick=(10, -4))
frames["11e"] = c
# 12 Varsågod! Tack!: Agda räcker ner apelsinen, Disa tar emot den (pling)
c = brygga("skrattar", apelsin_i_korgen=False, peka_l=(-1600, 1200), håll={"l": (APELSIN, 60)})
b = vid_bryggan(c, rot=-10, peka_r=(3000, -800), blick=(10, -6))
streck(c, AGDA_X - 150, BRYGG_Y - 30, r=30, n=5, start=-170, slut=-90, col=(255, 255, 255))
frames["12"] = c

# Vers 2 i tvåbilden: apelsinen glider ur tassarna (plask) och flyter bort, längre och längre; Disa blir ledsen och frågar efter hjälp.
c = brygga("forvanad", apelsin_i_korgen=False, blick=(-6, 8))
b = vid_bryggan(c, mood="forvanad", peka_r=(1400, 300), peka_l=(-400, 300), blick=(8, 8))
ax, ay = disa_punkt(b, 980, 700)
place(c, APELSIN, ax + 70, GK - 20, 60)
stänk(c, ax + 70, GK - 20, 36)
arrow(c, [(ax, ay - 40), (ax + 60, GK - 70)])
frames["13a"] = tvåbild(c)
# 13b … där flöt den bort: apelsinen guppar bort åt höger, Disa lite ledsen
c = brygga("forvanad", apelsin_i_korgen=False, blick=(8, 8))
vid_bryggan(c, mood="ledsen", blick=(10, 4))
place(c, APELSIN, 1180, GK - 8, 54)
framvågor(c, GK - 26, 1120, W)
arrow(c, [(1060, GK - 60), (1150, GK - 70), (1260, GK - 60)])
frames["13b"] = tvåbild(c)
# 13c Längre, längre, längre bort … (Åh nej!): apelsinen är liten långt bort, Disa sträcker sig över relingen men når inte, båten lutar
APELSIN_BORT = (1250, GK - 30, 36)   # där apelsinen guppar tills Agda hämtar den (innanför tvåbildens högerkant)


def bort(c):
    x, y, h = APELSIN_BORT
    place(c, APELSIN, x, y, h)
    framvågor(c, y - 6, x - 50, W)


c = brygga("forvanad", apelsin_i_korgen=False, blick=(9, 6))
vid_bryggan(c, mood="forvanad", rot=-12, lut=-5, peka_r=(3000, 500), blick=(10, 2))
bort(c)
for k, (x, h) in enumerate([(1070, 52), (1160, 44)]):   # spökbilder: apelsinen blir mindre för varje "längre"
    m, d = ritmask(c)
    d.ellipse((x - h / 2, GK - 30 - h, x + h / 2, GK - 30), outline=255, width=4)
    kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)
arrow(c, [(1040, GK - 110), (1240, GK - 90)])
frames["13c"] = tvåbild(c)
# 13d Dinon är ledsen – snyft, snyft, snyft: närbild, ledsen med en liten tår (ca 2 s, inget mer)
c = brygga(apelsin_i_korgen=False)
b = vid_bryggan(c, mood="ledsen", blick=(0, 4))
tx, ty = disa_punkt(b, 640, 470)
m, d = ritmask(c)
d.ellipse((tx - 9, ty - 4, tx + 9, ty + 20), fill=255)
d.polygon([(tx - 8, ty + 4), (tx, ty - 16), (tx + 8, ty + 4)], fill=255)
kritfyll(c, m, (120, 190, 235), vick=0.1, oskarp=0.6)
frames["13d"] = närbild(c, b)
# 13e Vem kan hjälpa? (Vem kan hjälpa?): närbild, Disa tittar ut mot tittaren med tassarna uppåt, frågande
c = brygga(apelsin_i_korgen=False)
b = vid_bryggan(c, mood="nyfiken", peka_r=(1600, 300), peka_l=(-560, 300), blick=(0, 0))
frames["13e"] = närbild(c, b)
# 13f Den hållna pausen (ca 2,3 s, barnet ropar "Ankan!"): tvåbild. Ledtråden: Agda på bryggkanten tittar på apelsinen långt bort.
c = brygga("nyfiken", apelsin_i_korgen=False, blick=(9, 6))
vid_bryggan(c, mood="nyfiken", blick=(0, 0))
bort(c)
frames["13f"] = tvåbild(c)

# Vers 3: Agda ställer sig upp, dyker i, simmar ut, knuffar apelsinen tillbaka, delar den.
AGDA_STÅR = BRYGG_Y + 22   # fötterna på bryggans däck
# 14a Ankan! (Ankan!): Agda ställer sig upp på bryggkanten, vingarna bakåt, redo att hoppa. Disa ser henne och blir glad.
c = brygga("skrattar", apelsin_i_korgen=False, agda_fot=AGDA_STÅR, peka_r=(1700, 900), peka_l=(-700, 900), blick=(9, 4))
vid_bryggan(c, mood="glad", blick=(10, -6))
bort(c)
frames["14a"] = tvåbild(c)
# 14b … hoppar i – plask!: Agda i luften med huvudet före ner i vattnet, ett stort plask
c = brygga(agda_med=False, apelsin_i_korgen=False)
vid_bryggan(c, mood="forvanad", blick=(10, -2))
bort(c)
dyk = agda("skrattar", peka_r=(1600, -900), peka_l=(-600, -900)).rotate(-125, expand=True, resample=Image.BICUBIC)   # huvudet före
place(c, dyk, 1110, GK - 30, 230)
stänk(c, 1180, GK - 30, 70)
arrow(c, båge(1060, GK - 180, 110, 200, 300, steg=20))
frames["14b"] = tvåbild(c)
# 14c Ankan simmar, kvack, kvack, kvack!: Agda simmar ut mot apelsinen, bara huvudet över vattnet, ringar efter henne


def simmar(c, x, med_apelsin):
    sätt(c, agda("skrattar", ben=False), x, GK + 90, AGDA_K * 1.05)   # bara huvudet över vattnet
    if med_apelsin:
        place(c, APELSIN, x - 2, GK + 90 - (926 - 470) * AGDA_K * 1.05 + 30, 46)   # på näbben
    framvågor(c, GK - 40, x - 130, W)
    for k in range(3):
        m, d = ritmask(c)
        r = 40 + k * 22
        d.arc((x - r * 1.6, GK - 40 - r * 0.3, x + r * 1.6, GK - 40 + r * 0.3), 0, 180, fill=255, width=5)
        kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)


c = brygga(agda_med=False, apelsin_i_korgen=False)
vid_bryggan(c, mood="glad", blick=(10, 0))
bort(c)
simmar(c, 1100, False)
arrow(c, [(1150, GK - 90), (1215, GK - 90)])
frames["14c"] = tvåbild(c)
# 14d Hit med apelsinen – hit, hit, hit!: Agda knuffar apelsinen med näbben tillbaka till båten, en knuff per "hit"; Disa sträcker sig glad
c = brygga(agda_med=False, apelsin_i_korgen=False)
vid_bryggan(c, mood="skrattar", peka_r=(1500, 350), blick=(10, 0))
simmar(c, 1130, True)
arrow(c, [(1290, GK - 20), (1220, GK - 40)])
frames["14d"] = tvåbild(c)
# 14e–g: Disa kliver ur båten upp på bryggan och står bredvid Agda (Sanna, 2026-11-05). I 14e syns kliven, sedan är
# båten borta ur bild (Sanna: renare). Så går hon på egna ben in i discot.
DISA_BRYGGA_X, DISA_BRYGGA_K, AGDA_BRYGGA_X, KORG_BRYGGA_X = 900, 0.33, 1110, 1300
# eget utsnitt: bryggan och Disa och Agda i mitten (Sanna, 2026-11-05)
BRYGGA_CX, BRYGGA_CY, BRYGGA_W = 1040, 420, 900


def bryggbild(c):
    return crop_zoom(c, BRYGGA_CX, BRYGGA_CY, BRYGGA_W)


def på_bryggan(agda_mood, disa_mood, agda_kw, disa_kw):
    c = brygga(agda_mood, apelsin_i_korgen=False, agda_x=AGDA_BRYGGA_X, korg_x=KORG_BRYGGA_X, **agda_kw)
    framvågor(c, GK - 34, 0, W)
    sätt(c, disa(disa_mood, **disa_kw), DISA_BRYGGA_X, AGDA_STÅR, DISA_BRYGGA_K)
    return c


# 14e En halva var: Disa kliver ur den tomma båten upp på bryggan (ett hopp i en båge), Agda sitter på kanten med apelsinen
c = brygga("skrattar", apelsin_i_korgen=False, agda_x=AGDA_BRYGGA_X, korg_x=KORG_BRYGGA_X, peka_l=(-1600, 300), håll={"l": (APELSIN, 110)})
vid_bryggan(c, 330, med_disa=False)
sätt(c, disa("skrattar", peka_r=(1500, -700), peka_l=(-480, -700), blick=(8, 0)), DISA_BRYGGA_X + 20, AGDA_STÅR - 25, DISA_BRYGGA_K)
arrow(c, båge(700, AGDA_STÅR + 10, 170, 160, 35, steg=20))
frames["14e"] = crop_zoom(c, 840, BRYGGA_CY, 1120)
# 14e2 … till dig och mig!: på bryggan, båten ur bild; Agda har delat apelsinen och ger Disa ena halvan
c = på_bryggan("skrattar", "skrattar", dict(peka_l=(-1600, 300), håll={"l": (HALVA, 110)}),
               dict(peka_r=(1500, -200), håll={"r": (HALVA, 150)}, blick=(8, -4)))
frames["14e2"] = bryggbild(c)
# 14f Mums, mums, mums: båda äter sin halva
c = på_bryggan("slickar", "slickar", dict(peka_l=(400, 480), håll={"l": (HALVA, 110)}),
               dict(peka_r=(560, 520), håll={"r": (HALVA, 150)}))
streck(c, DISA_BRYGGA_X + 30, AGDA_STÅR - 235, r=22, n=3, start=-30, slut=30)
frames["14f"] = bryggbild(c)
# 14g … hurra, hurra!: armarna upp, båda två
c = på_bryggan("skrattar", "skrattar", dict(peka_r=(1500, -700), peka_l=(-480, -700)), dict(peka_r=(1500, -700), peka_l=(-480, -700)))
frames["14g"] = bryggbild(c)

# --- Danspausen (15a–15g) och sista refrängen i discot, omfärgat till ljusorange -------------------------------
SOLO_H, SOLO_FOT = 0.58 * H, 0.85 * H
KULA = (688, 78, 44)
IKON_BÅGE = [(288, 141), (488, 118), (888, 118), (1088, 141), (1288, 180)]
DISCO_BILD = färgad_plåt((252, 222, 190))
_kula = Image.open(A / "bakgrunder/danspaus/cut/discokula.png").convert("RGBA")
_h = np.asarray(_kula.convert("RGB").convert("HSV")).copy()
_h[..., 0] = np.where(_h[..., 1] > 40, 14, _h[..., 0])
DISCOKULA = Image.merge("HSV", [Image.fromarray(_h[..., i]) for i in range(3)]).convert("RGBA")
DISCOKULA.putalpha(_kula.getchannel("A"))
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


def stjärnregn(c, x, y, r, n=4):
    for i in range(n):
        v = math.radians(150 - i * 120 / max(1, n - 1))
        stjärna(c, x + r * math.cos(v), y - r * math.sin(v), 0.013 * W if i % 2 else 0.01 * W, sken=True)


def ljusprickar(c):
    rnd = random.Random(5)
    m, d = ritmask(c)
    for _ in range(26):
        x, y, rr = rnd.uniform(30, W - 30), rnd.uniform(20, H * 0.8), rnd.uniform(4, 8)
        if abs(x - KULA[0]) > 70 or y > 150:
            d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=255)
    kritfyll(c, m, VIT, alpha=0.6, vick=0.2, oskarp=1)
    n = 0
    while n < 16:
        x, y = rnd.uniform(40, W - 40), rnd.uniform(40, H * 0.72)
        if math.dist((x, y), KULA[:2]) > 120 and all(math.dist((x, y), p) > 90 for p in IKON_BÅGE):
            stjärna(c, x, y, rnd.uniform(0.0075, 0.01) * W, sken=True)
            n += 1


def ikoner(c, n, pop=()):
    """Sammanfattningen: de n första småbilderna i bågen (fisken, fågeln, västen, apelsinen, båten)."""
    västbit = disa().crop((260, 440, 770, 820))
    saker = [(FISK, 70), (FÅGEL, 90), (västbit, 100), (APELSIN, 100), (båten(med_disa=False), 95)]
    for i, (im, h) in enumerate(saker[:n]):
        x, y = IKON_BÅGE[i]
        m, d = ritmask(c)
        d.ellipse((x - 60, y - 60, x + 60, y + 60), fill=255)
        kritfyll(c, m, (255, 255, 255), vick=0.3)
        place(c, im, x, y + h * 0.45, h * 0.9)
        if i in pop:
            streck(c, x, y, r=68, n=7, start=-170, slut=-10, col=(255, 255, 255))


def disco(n=0, pop=()):
    c = DISCO_BILD.copy()
    ljusprickar(c)
    x, y, r = KULA
    bb = DISCOKULA.getbbox()
    place(c, DISCOKULA, x, y + r * 1.02, (y + r * 1.02) * (bb[3] - bb[1]) / (bb[3] - bb[1] - 10))
    stjärna(c, x - r * 0.4, y - r * 0.35, 9)
    stjärna(c, x + r * 0.45, y + r * 0.3, 7)
    arrow(c, [(x - r - 26, y + 6), (x - r * 0.4, y + r + 18), (x + r * 0.4, y + r + 18), (x + r + 26, y + 6)])
    if n:
        ikoner(c, n, pop)
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


def dansare(c, namn, rörelse=None, x=None, h=SOLO_H, fot=SOLO_FOT, hopp=None, lyft=0, fokus=True):
    im, rörelse, egen_hopp, snurr = dansbild(namn, rörelse)
    hopp = egen_hopp if hopp is None else hopp
    x = W / 2 if x is None else x
    bb = im.getbbox()
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
V_H = {"dinon-disa": 0.50, "grodan-gurra": 0.45, "ankan-agda": 0.45, "fjarilen-fia": 0.36, "musen-mille": 0.42}
V_FOT = {"dinon-disa": 0.88 * H, "grodan-gurra": 0.865 * H, "ankan-agda": 0.865 * H, "fjarilen-fia": 0.85 * H, "musen-mille": 0.85 * H}


def _v_rad():
    bred = {n: (lambda bb: (bb[2] - bb[0]) / (bb[3] - bb[1]))(dansbild(n, "stå")[0].getbbox()) * V_H[n] * H for n in V_ORDNING}
    lucka = (0.88 * W - sum(bred.values())) / 4
    x, rad = 0.06 * W, {}
    for n in V_ORDNING:
        rad[n] = (x + bred[n] / 2, V_H[n] * H, V_FOT[n])
        x += bred[n] + lucka
    return rad


RAD = _v_rad()


def alla(c, rörelse, hopp=False):
    """Alla fem i V:et; Disa och Agda gör rörelsen, statisterna sin egen. Stjärnregnet runt Disa."""
    for namn in sorted(V_ORDNING, key=V_H.get):
        egen = namn in EGEN
        x, h, fot = RAD[namn]
        dansare(c, namn, None if egen else rörelse, x=x, h=h, fot=fot, hopp=None if egen else hopp and namn == "dinon-disa",
                fokus=namn == "dinon-disa")


def rgb(c):
    return c.convert("RGB")


c = disco(); dansare(c, "dinon-disa", "upp"); frames["15a"] = rgb(c)
DUO_H = 0.5 * H
c = disco()
dansare(c, "dinon-disa", "upp", x=W / 2 - 210, h=DUO_H, fokus=False)
dansare(c, "ankan-agda", "upp", x=W / 2 + 210, h=DUO_H, lyft=120)
arrow(c, [(W - 30, SOLO_FOT - 120), (W / 2 + 470, SOLO_FOT - DUO_H - 200), (W / 2 + 300, SOLO_FOT - DUO_H - 150)])
frames["15b"] = rgb(c)
c = disco(); dansare(c, "grodan-gurra"); frames["15c"] = rgb(c)    # Hoppa, hoppa!
c = disco(); dansare(c, "fjarilen-fia"); frames["15d"] = rgb(c)    # Snurra runt!
c = disco(); dansare(c, "musen-mille"); frames["15e"] = rgb(c)     # Klappa, klappa!
c = disco(); alla(c, "upp", hopp=True); frames["15f"] = rgb(c)    # Alla dansar – orange dans!
c = disco(); alla(c, "mage"); frames["15g"] = rgb(c)              # Orange dans! upprepas

# 15a–c Sista refrängen: en snabb solobild per sak, småbilden poppar upp i bågen. 15d alla fem, 15e kvar i discot.
c = disco(1, [0])  # Fisken – orange!: grodan, fisken hoppar bredvid
place(c, FISK, W / 2 + 300, SOLO_FOT - 220, 110, rot=25)
arrow(c, båge(W / 2 + 300, SOLO_FOT - 110, 110, 170, 20, ry=150))
dansare(c, "grodan-gurra")
frames["16a"] = rgb(c)
c = disco(2, [1])  # Fågeln – orange!: musen bredvid fågeln, som fladdrar
place(c, FÅGEL, W / 2 + 310, SOLO_FOT - 200, 140)
dansare(c, "musen-mille")
frames["16b"] = rgb(c)
c = disco(5, [2, 3, 4])  # Väst och apelsin och båt – orange!: Disa
dansare(c, "dinon-disa", "upp", hopp=True)
frames["16c"] = rgb(c)
c = disco(5); alla(c, "mage"); frames["16d"] = rgb(c)  # Orange är bästa färgen
frames["16e"] = frames["16d"]  # som en fin apelsin! (kvar i discot)

# 16 Hej då: kvar i discot. Disa sitter i båten på ett litet stycke blått vatten och puttrar iväg åt höger mot en
# orange sol, och vinkar. De andra har dansat ut ur bild.
c = disco(5)
place(c, SOL, 1230, 0.62 * H, 120)
m, d = ritmask(c)
d.rounded_rectangle((420, 0.84 * H, W + 40, H + 40), 50, fill=255)
kritfyll(c, m, VATTEN, vick=0.2)
place(c, båten(vit=True, mood="blinkar", peka_r=VINKA), 820, 0.92 * H, 0.5 * H)
framvågor(c, 0.92 * H - 26, 420, W)
arrow(c, [(1080, 0.9 * H - 40), (1300, 0.9 * H - 40)])
frames["16f"] = rgb(c)

# 17 Slutet, som 005: kvar i discot, Disa i båten vinkar och en kritiris (Lilla Kvacks, produktion/code-shot/bedtime) sluter
# sig runt hennes ansikte: en vinglig cirkel med nio bucklor, svart utanför och en krämvit kant. Sedan stängs den och bilden
# blir svart. Inget fast outro efter (005 har inte heller något). SLUT_PLÅT är bakgrunden utan båten (lager/slut.png).
c = disco(5)
place(c, SOL, 1230, 0.62 * H, 120)
m, d = ritmask(c)
d.rounded_rectangle((420, 0.84 * H, W + 40, H + 40), 50, fill=255)
kritfyll(c, m, VATTEN, vick=0.2)
SLUT_PLÅT = c.copy()
b = place(c, båten(vit=True, mood="glad", peka_r=VINKA), 820, 0.92 * H, 0.5 * H)
framvågor(c, 0.92 * H - 26, 420, W)
c = rgb(c)
ix, iy = disa_punkt(b, 511, 400)
m, d = ritmask(c)
ring = [(ix + 165 * (1 + 0.07 * math.sin(9 * a)) * math.cos(a), iy + 165 * (1 + 0.07 * math.sin(9 * a)) * math.sin(a))
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
    ("Refrängdansen, likadan alla tre gångerna (se sang.md). Rad 1–2 ”Orange! (Orange!) Orange! (Orange!)”: dansbild. Disa sträcker båda armarna rakt upp och båten gungar upp på en våg i takt. Orange blixt: på rösten ”Orange!” byts bakgrunden med ett hårt klipp till klarorange (#F26B1D); vattnet och himlen försvinner och bara Disa, båten och skuggan står på orange. Båten har en mörkorange kontur.", "6 dansbild (orange blixt)"),
    ("Ekot ”(Orange!)”: samma dans, bakgrunden blixtrar till ljusorange (#FAC48E). Mellan raderna är det sjön igen, så rad 1–2 blinkar rop, eko, rop, eko.", "6 dansbild (orange blixt)"),
    ("Rad 3 ”Orange är bästa färgen!”: närbild, händerna på magen (på flytvästen), hon gungar åt sidorna i reggaetakten.", "3 närbild Disa"),
    ("Rad 4–5 ”Orange! (Orange!) Orange! (Orange!)”: samma blixt, och nu blir Disa fler. På rösten, klarorange: Disa i båten poppar till fyra i ett rutnät 2 × 2, alla på en gång. Alla gungar i takt med armarna upp.", "6 dansbild (orange blixt)"),
    ("Ekot ”(Orange!)”, ljusorange: de poppar igen till ett helt mönster av dinos i båtar, 4 × 3 med varannan rad förskjuten ett halvt steg som ett tryck. Samma utklipp och ansikte i alla, renderade en gång.", "6 dansbild (orange blixt)"),
    ("Rad 6 ”Som en fin apelsin!”: en Disa igen, på sjön. En bubbla med apelsinen poppar upp i himlen till höger om Disa (plopp), som bubblorna i 005:s refräng. Den guppar sakta i takt, Disa pekar på den och ritar en cirkel runt den med tassen och skrattar.", "6 dansbild"),
    ("Rad 7 ”Tut, tut, tut, tut”: dansbild, båten gungar två gånger på de första ”tut, tut”, och på de sista gör Disa två små knytnävspumpar. Tutet är båtens mistlur.", "6 dansbild"),
    ("Rad 8 ”vad är orange? Titta ut!”: närbild, handen över ögonen, hon tittar åt ena hållet och sedan åt det andra.", "3 närbild Disa"),
]
# Tiderna ur rader.txt (Whisper) genom klippet i film/klipp-sang.sh: avsnittstid = klipptid + 11 s (klipptid = tid i sang-klippt.m4a).
# Rad 1–2 och 4–5 har en gemensam tid i rader.txt och delas på mitten. Refräng 1:s ”vad är orange? Titta ut!” (≈) är flyttad till
# 2,7 s efter ”Tut, tut” som i refräng 2 (Whisper gissade 0,7 s).
REFRÄNG_TID = {"05": ["1:03.3", "1:04.5", "1:05.6", "1:08.0", "1:09.1", "1:10.3", "1:12.6", "1:14.9", "1:17.3"],
               "09": ["1:51.6", "1:52.8", "1:53.9", "1:56.2", "1:57.4", "1:58.6", "2:00.9", "2:03.2", "2:05.6"]}
REFRÄNG_ID = ["a", "a2", "b", "c", "c2", "d", "e", "f"]


def refräng(n):
    t = REFRÄNG_TID[n]
    ljud = dict(c="(pop: fyra)", c2="(pop: mönstret)", d="(plopp)", e="(tut, tut: mistluren)")
    return [(n + REFRÄNG_ID[i], f"{t[i]}–{t[i + 1]}", "Refräng", ljud.get(REFRÄNG_ID[i], ""), vad, kamera) for i, (vad, kamera) in enumerate(REFRÄNG_TEXT)]


A_ = "A · Sjön"
B = "B · Bryggan"
D_ = "Danspaus · discot"
# (id, tid, scen, repliker och ljud, vad som händer, kamera). Avsnittstid, se ovan.
SHOTS = [
    ("01", "0:00–0:11", "Intro", "♪ Jingel: Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Samma intro som 003–005 med nytt nummer och ny titel: Avsnitt 6 · Orange sången. Ljusblå vägg och en liten orange båt på kortet. (Bilden här är ritad i bygg.py; introt renderas som 005:s när det görs.)", "fast"),
    ("02", "0:11.0–0:17.8", "Kritan ritar", "(skrrrrt)", "”Kritan ritar, orange, lång …”: kritan ritar ett orange, rundat skrov, långsamt. Bara skrovet.", "1 papper"),
    ("02a", "0:17.8–0:24.2", "Kritan ritar", "(skrrt, skrrt)", "”vad kan det vara?”: en liten pinne med en orange flagga och en vågig blå linje under skrovet, medan det sjungs.", "1 papper"),
    ("02b", "0:24.2–0:30.1", "Kritan ritar", "(skrrt)", "”Vad kan det vara?” och pausen: kritan ritar ett runt litet fönster (ventil), den sista ledtråden.", "1 papper"),
    ("02c", "0:30.1–0:35.2", "Kritan ritar", "(tut-tut)", "”En båt! En orange båt! Tut-tut, nu kör vi!”: båten gungar till på vågen och kritan lyfter.", "1 papper"),
    ("03", "0:35.2–0:37.2", A_, "(swoosh)", "Zoom in i den ritade båten: den blir Disas båt på sjön. Disa sitter redan i båten med flytvästen på. Mellanspelet börjar.", "zoom in"),
    ("03a", "0:37.2–0:39.4", A_, "DISA: Hej hej!", "Disa vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Tut-tut, nu kör vi!”: det sjöngs nyss.", "3 närbild Disa"),
    ("03b", "0:39.4–0:41.3", A_, "", "Hon lägger tassarna på båtens kant och tittar framåt.", "3 närbild Disa"),
    ("04", "0:41.3–0:53.2", A_, "(putt, putt)", "Mellanspel och vers 1 rad 1–2. Sjön glider, båten gungar på vågorna med kölvatten bakom, en orange sol långt bort. Fjärilen Fia fladdrar förbi högt uppe, den enda rörelsen i bakgrunden.", "2 körscen"),
    ("04a", "0:53.2–1:03.3", A_, "", "”Dinon letar orange nu, leta med – jag och du!”: samma körscen, Disa sätter handen över ögonen och spanar framåt.", "2 körscen"),
    *refräng("05"),
    ("06", "1:17.3–1:19.5", A_, "(plask)", "”Vad är orange?”: en orange fisk hoppar upp ur vattnet framför båten i en båge. Disa blir förvånad och tittar dit.", "2 körscen"),
    ("06a", "1:19.5–1:22.9", A_, "", "”Titta där! Fisken är orange”: sjön stannar och Disa pekar på fisken.", "2 körscen"),
    ("06b", "1:22.9–1:24.7", A_, "(plask, plask, plask)", "”plask, plask, plask”: närbild, fisken hoppar tre gånger i en båge bredvid båten, och Disa klappar en gång per plask.", "3 närbild Disa"),
    ("07", "1:24.7–1:28.8", A_, "", "”Vad är orange?”: sjön glider igen, fisken är borta, en liten orange fågel flyger in från höger över vattnet.", "2 körscen"),
    ("07a", "1:28.8–1:32.0", A_, "", "”Titta där! Fågeln är orange”: sjön stannar, fågeln fladdrar på stället bredvid båten och Disa pekar på den.", "2 körscen"),
    ("07b", "1:32.0–1:34.3", A_, "", "”pip, pip, pip”: närbild, Disa flaxar med armarna som vingar, en gång per ”pip”. Fågeln fladdrar bredvid henne.", "3 närbild Disa"),
    ("08", "1:34.3–1:41.0", A_, "", "”Vad mer är orange? Kan du se?”: frågan till tittaren. Disa tittar ut mot tittaren med frågande min.", "3 närbild Disa"),
    ("08a", "1:41.0–1:45.6", A_, "", "Pausen, ca 4,6 s (två inlagda takter, se Klippet). Ledtråd: Disa tittar ner på sin mage, och kameran åker in långsamt och mjukt till ca 1,5× mot den orange flytvästen. Inåkningen är det enda som rör sig. Bilden visar slutläget; pilarna visar inåkningen.", "3 närbild Disa, inåkning"),
    ("08b", "1:45.6–1:49.6", A_, "", "”Västen är orange – och flaggan med!”: Disa klappar på västen och pekar bakåt på båtens orange flagga.", "3 närbild Disa"),
    ("08c", "1:49.6–1:51.6", A_, "(dunk, dunk, dunk)", "”Dunk, dunk, dunk!”: hon stampar tre gånger så att båten gungar.", "3 närbild Disa"),
    *refräng("09"),
    ("10", "2:05.6–2:06.2", "Kritsvep", "(skrrrrt)", "Kritsvep i bryggans ljusblå (#A8DCF2), från vänster till höger, precis innan ”Vad är orange?”.", "kritsvep"),
    ("11", "2:06.2–2:08.2", B, "(putt, putt)", "”Vad är orange?”: Agda sitter på bryggkanten med fruktkorgen bredvid sig. Båten puttrar in från vänster.", "4 helbild"),
    ("11a", "2:08.2–2:12.1", B, "", "”Titta där! Apelsinen är orange”: båten har lagt till nedanför Agda och Disa pekar på apelsinen i korgen. Kameran glider långsamt in mot korgen (platsens enda kamerarörelse); bilden visar slutläget.", "4 helbild"),
    ("11b", "2:12.1–2:15.1", B, "", "”rund, rund, rund”: närbild, Disa ritar en cirkel i luften med tassen.", "3 närbild Disa"),
    ("11d", "2:15.1–2:18.5", B, "DISA: Hej, ankan! · AGDA: Kvack! Hej, Disa! Vad vill du ha?", "Lucka i sången, ca 7,2 s (en takt bort, se Klippet), grooven fortsätter under. Närbild Agda med korgen: apelsinen (närmast Disa), det gröna äpplet och den gula bananen. Färgövningen: tre färger, Disa väljer.", "5 närbild Agda"),
    ("11e", "2:18.5–2:20.2", B, "DISA: Apelsin, tack!", "Disa pekar på apelsinen.", "4 helbild"),
    ("12", "2:20.2–2:22.3", B, "AGDA: Varsågod! · DISA: Tack! (pling)", "Agda räcker ner apelsinen från bryggan och Disa tar emot den. Äpplet och bananen ligger kvar i korgen.", "4 helbild"),
    ("13a", "2:22.3–2:24.6", B, "(plask!)", "Vers 2, grooven tunnas ut. ”Oj, oj, plask! (Plask!)”: tvåbild, ett närmare utsnitt av helbilden. Apelsinen glider ur Disas tassar och plaskar i vattnet bredvid båten, kören ropar ”Plask!”. Båda blir förvånade.", "4 tvåbild (helbilden närmare)"),
    ("13b", "2:24.6–2:27.0", B, "", "”Där flöt den bort!”: samma tvåbild, apelsinen guppar bort åt höger på vågorna.", "4 tvåbild (helbilden närmare)"),
    ("13c", "2:27.0–2:31.4", B, "(Åh nej!)", "”Längre, längre, längre bort …”: apelsinen blir mindre för varje ”längre” (spökringarna visar var den var), långt ut till höger. Disa sträcker sig över relingen men når inte, båten lutar lite. Kören: ”Åh nej!”.", "4 tvåbild (helbilden närmare)"),
    ("13d", "2:31.4–2:36.2", B, "(snyft, snyft, snyft)", "”Dinon är ledsen – snyft, snyft, snyft”: närbild, Disa ledsen med en liten tår, en snyft per ord. Bara raden ut (ca 2 s ledsen), inget mer.", "3 närbild Disa"),
    ("13e", "2:36.2–2:38.6", B, "", "”Vem kan hjälpa? (Vem kan hjälpa?)”: närbild, Disa tittar ut mot tittaren med tassarna uppåt, frågande, inte ledsen längre.", "3 närbild Disa"),
    ("13f", "2:38.6–2:41.0", B, "", "Den hållna pausen, ca 2,3 s: barnet hinner ropa ”Ankan!”. Tvåbild: Agda på bryggkanten tittar ut mot apelsinen (ledtråden), Disa tittar på tittaren.", "4 tvåbild (helbilden närmare)"),
    ("14a", "2:41.0–2:42.7", B, "", "Vers 3, hela grooven tillbaka. ”Ankan! (Ankan!)”: Agda ställer sig upp på bryggkanten med vingarna bakåt, redo att hoppa. Disa ser henne och blir glad.", "4 tvåbild (helbilden närmare)"),
    ("14b", "2:42.7–2:44.3", B, "(plask!)", "”Ankan hoppar i – plask!”: Agda dyker med huvudet före från bryggan, ett stort plask.", "4 tvåbild (helbilden närmare)"),
    ("14c", "2:44.3–2:46.4", B, "(kvack, kvack, kvack)", "”Ankan simmar, kvack, kvack, kvack!”: Agda simmar ut mot apelsinen, bara huvudet över vattnet, ringar efter henne.", "4 tvåbild (helbilden närmare)"),
    ("14d", "2:46.4–2:48.8", B, "", "”Hit med apelsinen – hit, hit, hit!”: Agda knuffar apelsinen med näbben tillbaka till båten, en knuff per ”hit”. Disa sträcker tassen mot den och skrattar.", "4 tvåbild (helbilden närmare)"),
    ("14e", "2:48.8–2:49.9", B, "", "”En halva var –”: Disa kliver ur den tomma båten upp på bryggan, ett litet hopp med armarna upp. Agda sitter på kanten igen med apelsinen hon hämtade.", "4 tvåbild (helbilden närmare)"),
    ("14e2", "2:49.9–2:51.1", B, "", "”– till dig och mig!”: på bryggan, båten är ur bild. Agda har delat apelsinen, hon håller en halva och ger Disa den andra: en halva var.", "4 tvåbild (bryggan)"),
    ("14f", "2:51.1–2:52.6", B, "", "”Mums, mums, mums”: båda på bryggan äter sin halva, en tugga per ”mums”.", "4 tvåbild (helbilden närmare)"),
    ("14g", "2:52.6–2:54.9", B, "", "”– hurra, hurra!”: båda sträcker armarna upp. Apelsinen är slut, så händerna är fria till dansen.", "4 tvåbild (helbilden närmare)"),
    ("15a", "2:54.9–2:56.1", D_, "(boing!)", "”Danspaus!”: klipp till discot, ljusorange med en orange discokula som snurrar sakta och kastar ljusprickar. Disa har klivit ur båten vid bryggan och dansar stor mitt i bild med armarna upp, med ett litet stjärnregn runt sig.", "6 dansbild (discot)"),
    ("15b", "2:56.1–3:04.5", D_, "(boing!)", "”(Danspaus!)”, ekot: Agda hoppar in och landar bredvid henne, båda lite mindre (samma bild utan klipp).", "6 dansbild (discot)"),
    ("15c", "3:04.5–3:06.9", D_, "", "”Hoppa, hoppa!”: solobild, grodan Gurra ensam och stor mitt i bild, hoppar, stjärnregn runt honom.", "6 dansbild (discot)"),
    ("15d", "3:06.9–3:09.2", D_, "(fladder)", "”Snurra runt!”: solobild, fjärilen Fia snurrar i luften, stjärnregn runt henne.", "6 dansbild (discot)"),
    ("15e", "3:09.2–3:11.6", D_, "(klapp, klapp)", "”Klappa, klappa!”: solobild, musen Mille klappar med armarna upp, stjärnregn runt henne.", "6 dansbild (discot)"),
    ("15f", "3:11.6–3:14.0", D_, "", "”Alla dansar – orange dans!”: alla fem i ett svagt V, Disa i mitten lite större och ett steg fram, Gurra och Agda bredvid, Fia och Mille ytterst. Disa och Agda har armarna upp, statisterna gör sin rörelse.", "6 dansbild (discot)"),
    ("15g", "3:14.0–3:23.3", D_, "", "”(Orange dans!)”, ekot, och grooven före sista refrängen (kortad till ca 4 s, se Klippet): samma rad, Disa och Agda gungar med händerna på magen.", "6 dansbild (discot)"),
    ("16a", "3:23.3–3:24.8", D_, "(pop)", "Sista refrängen i discot, en snabb solobild per sak. ”Fisken – orange!”: grodan hoppar och fisken hoppar bredvid honom; fisken poppar upp som första småbild i bågen.", "6 dansbild (discot)"),
    ("16b", "3:24.8–3:27.1", D_, "(pop)", "”Fågeln – orange!”: solobild, musen klappar och fågeln fladdrar bredvid henne. Fågeln poppar upp i bågen.", "6 dansbild (discot)"),
    ("16c", "3:27.1–3:32.2", D_, "(pop, pop, pop)", "”Väst och apelsin och båt – orange!”: solobild, Disa hoppar med armarna upp. Västen, apelsinen och båten poppar upp i bågen, en per ord.", "6 dansbild (discot)"),
    ("16d", "3:32.2–3:34.2", D_, "", "”Orange är bästa färgen”: alla fem igen i raden, Disa och Agda med händerna på magen.", "6 dansbild (discot)"),
    ("16e", "3:34.2–3:36.8", D_, "", "”som en fin apelsin!”: kvar i discot, alla fem i raden. Apelsinen i bågen gungar extra.", "6 dansbild (discot)"),
    ("16f", "3:36.8–3:46.0", D_, "(tut, tut)", "”Hej då, hej då – tut, tut!”: kvar i discot, under bågen med småbilderna. Disa sitter i båten på ett litet stycke blått vatten och puttrar iväg åt höger mot en orange sol och vinkar; tutet är båtens mistlur. De andra har dansat ut ur bild. Sångens outro är kortat till 3 s och tonas ut i slutet av bilden.", "6 dansbild (discot)"),
    ("17", "3:46.0–3:50.4", "Avslutning", "(swoosh)", "Slutet, som 005: kvar i discot. Disa i båten vinkar, och en kritiris (en vinglig cirkel med nio bucklor och krämvit kant) sluter sig runt hennes ansikte på 1,6 s, håller på henne 1,2 s, stängs på 0,8 s, en stjärnglimt i det svarta och slutar svart. Sångens outro fortsätter under och tonas ut de sista 2 s. Inget fast outro efter.", "kritiris"),
]
assert sorted(s[0] for s in SHOTS) == sorted(frames), (set(s[0] for s in SHOTS) ^ set(frames))

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", A_: "#A8DCF2", "Refräng": "#FAC48E", "Kritsvep": "#A8DCF2",
        B: "#C49A6C", D_: "#FCDEBE", "Avslutning": "#c9bfae", "Outro": "#c9bfae"}


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + float(s)


REF = lambda n: [n + b for b in ("a", "a2", "b", "c", "c2", "d", "e", "f")]
KARTA = {
    "Intro – kritan ritar": ["02", "02a", "02b", "02b", "02c", "02c"],
    "Vers 1": ["04", "04", "04a", "04a"],
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
<title>Orange sången: storyboard</title>
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
<h1>Orange sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 006, utkast. Bilderna är byggda av utklippen i <code>assets/</code> med ansiktena ritade i kod; det som inte finns än är platta former i rätt färg. Pilarna och strecken visar rörelsen.</p>
<span class="utkast">Tiderna ur sången genom klippet (sang-klippt.m4a). Avsnittstid = klipptid + 11 s.</span>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>2 + 3</b><span>figurer + statister</span></div><div><b>1</b><span>körscen</span></div><div><b>6</b><span>kamerainställningar (max 6)</span></div><div><b>~{slut}</b><span>längd</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Ekot sjungs av kören. Varje orange sak har en rörelse i bild i stället för en replik: plask (06b), stor (07b), dunk (08c), rund (11b).</li>
<li><b>Refrängen är en dans</b> (05, 09 och sista refrängen 15), likadan alla tre gångerna, med <b>orange blixt</b> på varje ”Orange!” i rad 1–2 och 4–5 och en bubbla med apelsinen på rad 6.</li>
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
