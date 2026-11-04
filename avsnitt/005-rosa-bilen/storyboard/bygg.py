"""Bygger storyboarden för avsnitt 005 av de färdiga utklippen och bakgrunderna.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg, index.html och tabellen i ../storyboard.md. Kostar inga krediter.
Samma grepp som 004:s bygg.py: figurerna är de ansiktslösa utklippen med ansiktet ritat i kod. Musens korta raka armar
och ben ritas av verktyg/rita-lemmar-mus.py och hennes ansikten av verktyg/ansikten.py.
Saker som inte finns i assets/ än ritas som enkla platta former; kör om när bilderna finns.
Allt ritat i kod får kritstruktur och ett svagt papperskorn över hela bilden; `--platt` stänger av det.
"""
import html
import json
import math
import random
import re
import runpy
import sys
from pathlib import Path

import numpy as np

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
ROSA = (240, 110, 170)  # kioskens vägg, #F06EAA
BIL_ROSA = (246, 170, 200)
random.seed(5)
PLATSHÅLLARE = []


def bild(rel, ersätt):
    """Bilden ur assets/ om den finns, annars en platt platshållare (och den antecknas)."""
    p = A / rel
    if p.exists():
        return Image.open(p).convert("RGBA")
    PLATSHÅLLARE.append(rel)
    return ersätt()


def tom(w=1024, h=1024):
    im = Image.new("RGBA", (w, h))
    return im, ImageDraw.Draw(im)


def ph_kaross(säte=True):
    im, d = tom()
    d.rounded_rectangle((90, 520, 935, 820), 110, fill=BIL_ROSA)
    if säte:
        d.rounded_rectangle((340, 400, 420, 560), 30, fill=(120, 130, 210))
        d.ellipse((580, 380, 650, 450), outline=INK, width=12)
    return im


def ph_hjul(x):
    im, d = tom()
    d.ellipse((x - 80, 765, x + 80, 925), fill=INK)
    d.ellipse((x - 25, 820, x + 25, 870), fill=(250, 210, 60))
    return im


def ph_glass():
    im, d = tom(431, 743)
    d.polygon([(70, 300), (360, 300), (215, 740)], fill=(214, 160, 90))
    d.ellipse((40, 40, 390, 360), fill=(236, 120, 150))
    return im


def ph_buske():
    im, d = tom(857, 692)
    d.ellipse((0, 40, 857, 692), fill=(60, 150, 70))
    for x, y in ((220, 220), (430, 160), (620, 260), (300, 430), (560, 470)):
        d.ellipse((x - 50, y - 50, x + 50, y + 50), fill=(240, 120, 170))
    return im


def ph_ballong():
    im, d = tom(547, 895)
    d.ellipse((20, 0, 527, 580), fill=(232, 90, 160))
    d.line((273, 580, 260, 890), fill=INK, width=6)
    return im


# --- Kritstruktur: det som ritas i kod fylls med äkta kritkorn och får lite ojämna kanter -----------------
KRITA = "--platt" not in sys.argv
_g = Image.open(A / "bakgrunder" / "glasskiosken" / "glasskiosken.png").convert("L").crop((480, 0, 1376, 560)).resize((W, H))  # bara tom vägg
_d = np.asarray(_g, float) - np.asarray(_g.filter(ImageFilter.GaussianBlur(12)), float)
KORN = np.clip(0.5 + _d / (4 * _d.std()), 0, 1)  # kritkornen ur kioskens kritvägg, 0–1 runt 0,5: samma i varje bild
_rng = np.random.default_rng(5)
BRUS = sum(np.asarray(Image.fromarray((_rng.random((H // k, W // k)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), float)
           for k in (6, 16)) / 255 - 1  # mjukt brus −1..1 för ojämna kanter


def kritfyll(c, mask, col, alpha=1.0, vick=0.25, oskarp=2.0):
    """Fyller masken med färgen som vaxkrita: ojämn kant, kritkorn, papperet skymtar i luckorna."""
    if not KRITA:
        c.paste(col[:3], mask=mask.point(lambda v: int(v * alpha)))
        return
    w, h = mask.size
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(oskarp)), float) / 255
    m = np.clip((m - 0.5 + vick * BRUS[:h, :w]) * 4 + 0.5, 0, 1)
    t = KORN[:h, :w]
    m *= np.clip(0.35 + 0.9 * t, 0, 1) * alpha
    färg = np.clip(np.array(col[:3], float) * (0.9 + 0.2 * t[..., None]), 0, 255).astype(np.uint8)
    c.paste(Image.fromarray(färg), mask=Image.fromarray((m * 255).astype(np.uint8)))


def ritmask(c):
    m = Image.new("L", c.size)
    return m, ImageDraw.Draw(m)


def golvstreck(img, y0):
    """Svaga kritstreck på det ljusa golvet, så att det inte är en tom platt yta."""
    if KRITA:
        rnd = random.Random(11)
        m, d = ritmask(img)
        for _ in range(170):
            x, y, l = rnd.uniform(-60, W), rnd.uniform(y0, H), rnd.uniform(40, 110)
            d.line((x, y, x + l, y - l * 0.18), fill=255, width=3)
        ljust = np.asarray(img.convert("L")) > 215  # bara på det ljusa golvet, inte på vägens streck
        kritfyll(img, Image.fromarray((np.asarray(m) * ljust).astype(np.uint8)), (200, 190, 175), alpha=0.4, vick=0.15, oskarp=1)
    return img


def papperskorn(im):
    """Papperskornet över hela bilden (multiplicera, svagt), så att de olika utklippen blir en teckning."""
    if not KRITA:
        return im
    a = np.asarray(im.convert("RGB"), float) * (1 - 0.12 * (1 - KORN[..., None]))
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


_plåt = {}
GOLV = {"vagen": 585}  # där golvet börjar


def plate(slug):
    if slug not in _plåt:
        im = Image.open(A / "bakgrunder" / slug / f"{slug}.png").convert("RGB").resize((W, H))
        _plåt[slug] = golvstreck(im, GOLV[slug]) if slug in GOLV else im
    return _plåt[slug].copy()


# --- Figurer: kropp, lemmar ur riggen och ansiktet ur verktyg/ansikten.py -----
# Grodans ögon och mun som i 004:s kit.js (stora ögon ovanpå huvudet, brett leende)
ANSIKTE = {"grodan-gurra": dict(ogon=[(337, 262), (686, 260)], ogonskala=1.45, mun=(512, 392), munskala=1.4, munbredd=2.6)}
SPETS = {"grodan-gurra": {"arm-r": (895, 655), "arm-l": (110, 660)}}  # handen, i figurens 1024-koordinater
# Statisterna i danspausen. Ögon och mun som i 004:s kit.js. Kaninens rigg heter kanel-rigg.json.
# Dinon Disas ögon och mun uppmätta i cut/dinon-disa.png mot den ansiktslösa.
DJUROGON = [(414, 401), (605, 399)]
ANSIKTE |= {"kaninen-kanel": dict(ogon=[(412, 396), (605, 401)], mun=(510, 458), munskala=1.1),
            "humlan-humle": dict(ogon=DJUROGON, mun=(512, 472), munskala=1.2),
            "dinon-disa": dict(ogon=[(413, 401), (604, 398)], mun=(511, 466), munskala=1.3)}
RIGGNAMN = {"kaninen-kanel": "kanel"}
_spets = {}


def spets_av(fil, piv):
    """Handen = den bit av armbilden som ligger längst från vridpunkten (för figurer utan uppmätt SPETS)."""
    if fil not in _spets:
        ys, xs = np.nonzero(np.asarray(Image.open(fil).getchannel("A")) > 128)
        i = np.argmax((xs - piv[0]) ** 2 + (ys - piv[1]) ** 2)
        _spets[fil] = (float(xs[i]), float(ys[i]))
    return _spets[fil]
ÖRON = [((165, 104, 420, 360), (350, 310)), ((600, 104, 860, 360), (670, 310))]  # musens öron: ruta och fäste
GH = 250  # glassens höjd i figurens koordinater


def vinkel_mot(piv, spets, mål):
    """Grader moturs som vrider armen så att handen pekar mot mål."""
    return math.degrees(math.atan2(piv[1] - mål[1], mål[0] - piv[0]) - math.atan2(piv[1] - spets[1], spets[0] - piv[0]))


def hand(piv, spets, vinkel, flytt=(0, 0)):
    """Var handen hamnar när armen vrids `vinkel` grader moturs runt vridpunkten (och flyttas `flytt`)."""
    a = math.radians(vinkel)
    dx, dy = spets[0] - piv[0], spets[1] - piv[1]
    return (piv[0] + dx * math.cos(a) + dy * math.sin(a) + flytt[0],
            piv[1] - dx * math.sin(a) + dy * math.cos(a) + flytt[1])


def lägg(canvas, im, cx, ground, h, rot=0):
    """Som place, men lägger RGBA på RGBA utan att förstöra genomskinligheten."""
    lager = Image.new("RGBA", canvas.size)
    place(lager, im, cx, ground, h, rot=rot)
    canvas.alpha_composite(lager)


def figur(namn, mood="open", blick=(0, 0), arm_r=0, arm_l=0, peka_r=None, peka_l=None, hand_r=None, hand_l=None,
          glass=(), spöke=(), vick=False, ben=True, lager="allt"):
    """Figuren (grodan) med ansiktet ritat och armarna ur riggen. Musen ritas av musen() nedan.
    arm_* = vinkel (grader moturs), peka_* = punkt armen pekar mot, hand_* = punkt handen når (armen flyttas dit om den är för kort).
    glass = "r"/"l": en jordgubbsglass i den handen. spöke = [(del, vinkel)]: halvgenomskinlig arm där den var nyss.
    lager: allt, kropp (utan armar) eller armar (armar och glassar). mood: humören i ansikten.py (gamla namnen fungerar)."""
    mapp = A / "karaktarer" / namn
    rig = json.loads((mapp / f"{RIGGNAMN.get(namn, namn)}-rigg.json").read_text())
    c = Image.new("RGBA", (1024, 1024))
    leder = {}
    for d, v, p, h in (("arm-r", arm_r, peka_r, hand_r), ("arm-l", arm_l, peka_l, hand_l)):
        piv = tuple(rig["delar"][d]["vridpunkt"])
        spets = SPETS.get(namn, {}).get(d) or spets_av(mapp / rig["delar"][d]["fil"], piv)
        f = (0, 0)
        if p or h:
            v = vinkel_mot(piv, spets, p or h)
        if h:
            ex, ey = hand(piv, spets, v)
            f = (h[0] - ex, h[1] - ey)
        leder[d] = (piv, spets, v, f)

    def arm(d, alpha=1.0, v=None):
        piv, spets, vv, f = leder[d]
        if v is not None:
            vv, f = v, (0, 0)
        im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
        im = im.rotate(vv, resample=Image.BICUBIC, center=piv, translate=f)
        if alpha < 1:
            im.putalpha(im.getchannel("A").point(lambda a: int(a * alpha)))
        c.alpha_composite(im)
        if d[-1] in glass and alpha == 1:
            hx, hy = hand(piv, spets, vv, f)
            lägg(c, GLASS, hx, hy + GH * 0.3, GH)

    kropp = Image.open(mapp / rig["kropp"]).convert("RGBA")
    if lager != "armar":
        for d, v in spöke:
            arm(d, 0.35, v)
        for d in rig["delar"]:  # vingar och andra delar utan led ligger bakom kroppen (humlans vingar)
            if not d.startswith(("arm", "leg")):
                c.alpha_composite(Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA"))
        if ben:
            for d in ("leg-l", "leg-r"):
                c.alpha_composite(Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA"))
        if lager == "allt":
            arm("arm-l")
        c.alpha_composite(kropp)
        rita_ansikte(c, mood, (blick[0] / 9, blick[1] / 9), **ANSIKTE[namn])
        if lager == "kropp":
            return c
    if lager == "armar":
        arm("arm-l")
    arm("arm-r")
    return c


# --- Musen Mille: korta raka armar och ben ritade i kod (verktyg/rita-lemmar-mus.py), ansiktet ur verktyg/ansikten.py ---
MUS = runpy.run_path(str(ROT / "verktyg" / "rita-lemmar-mus.py"))
mot, mushand, VILA = MUS["mot"], MUS["hand"], MUS["VILA"]
MUSKROPP = Image.open(A / "karaktarer" / "musen-mille" / "cut" / "musen-mille-body.png").convert("RGBA")
VINK, VINK_SPÖKE = 135, 100  # vinkar: armen snett upp; spöket där den var nyss


_ARMTEX = {}


def nå(s, mål):
    """Musens arm (sida s) böjd i armbågen så att tassen hamnar på mål (hennes 1024-koordinater), armbågen lite utåt
    från kroppen. Samma kritstruktur, rosa tass och vita kant som de ritade armarna i verktyg/rita-lemmar-mus.py."""
    if not _ARMTEX:
        kropp = A / "karaktarer" / "musen-mille" / "cut" / "musen-mille-body.png"
        _ARMTEX["grå"], _ARMTEX["rosa"] = MUS["tex_from"](kropp, (440, 560, 600, 720)), MUS["tex_from"](kropp, (262, 205, 338, 281))
    (ax, ay), (tx, ty) = MUS["AXEL"][s], mål
    d = max(math.hypot(tx - ax, ty - ay), 1)
    led = max(0.58 * d, 80)  # överarm = underarm: lite längre än halva vägen, så att armen böjs mjukt
    ut = math.sqrt(max(led ** 2 - (d / 2) ** 2, 0))
    mx, my, nx, ny = (ax + tx) / 2, (ay + ty) / 2, -(ty - ay) / d, (tx - ax) / d
    if math.hypot(mx + nx - 512, my + ny - 600) < math.hypot(mx - nx - 512, my - ny - 600):
        nx, ny = -nx, -ny  # armbågen åt det håll som är bort från kroppens mitt
    eb = (mx + nx * ut, my + ny * ut)
    m, dm = MUS["ny_mask"]()
    MUS["kapsel"](dm, (ax, ay), eb, MUS["R_AXEL"], 29)
    MUS["kapsel"](dm, eb, (tx, ty), 29, MUS["R_HAND"])
    t, dt = MUS["ny_mask"]()
    MUS["kapsel"](dt, (tx, ty), (tx, ty), MUS["R_TASS"], MUS["R_TASS"])
    im = MUS["sticker"]([(_ARMTEX["grå"], MUS["klar"](m)), (_ARMTEX["rosa"], MUS["klar"](t))])
    ux, uy = (tx - eb[0]) / led, (ty - eb[1]) / led  # fingerstrecken pekar längs underarmen
    for k in (-12, 12):
        bx, by = tx + ux * 18 - uy * k, ty + uy * 18 + ux * k
        ImageDraw.Draw(im).line([(bx, by), (bx + ux * 13, by + uy * 13)], fill=(196, 112, 128, 255), width=5)
    return im


def mus_arm(c, s, a, alpha=1.0):
    g = Image.new("RGBA", c.size)
    MUS["arm"](g, s, a)
    if alpha < 1:
        g.putalpha(g.getchannel("A").point(lambda v: int(v * alpha)))
    c.alpha_composite(g)


def musen(mood="glad", blick=(0, 0), arm_r=VILA, arm_l=VILA, fram="", glass="", gbild=None, spöke=(), vick=False, ben=True, lager="allt"):
    """Musen Mille i 1024-rutan. arm_* = vinkel (rak arm) eller en punkt (böjd arm, se nå()): 0 rakt ner, 90 ut åt sin sida, 180 rakt upp; mot("r", punkt) riktar armen mot punkten
    (armen är kort: tassen hamnar 170 px från axeln). fram = sidor vars arm ligger framför kroppen (i bilen ritas de efter kanten).
    glass = "r"/"l": en jordgubbsglass i den tassen (gbild: en annan glass, t.ex. STRUT eller GLASSBERG). spöke = [(sida, vinkel)]: halvgenomskinlig arm där den var nyss.
    vick: halvgenomskinliga öron åt båda håll. lager: allt, kropp (utan armarna framför) eller armar (bara armarna framför).
    mood: humören i ansikten.py. blick i px."""
    c = Image.new("RGBA", (1024, 1024))
    armar = {"r": arm_r, "l": arm_l}

    def arm(s):
        böjd = isinstance(armar[s], tuple)  # en punkt: armen böjs dit med nå()
        if s in glass:  # glassen under tassen, så att tassen håller struten
            hx, hy = armar[s] if böjd else mushand(s, armar[s])
            g = gbild or GLASS
            lägg(c, g, hx, hy + GH * 0.3, GH * g.height / GLASS.height)
        if böjd:
            c.alpha_composite(nå(s, armar[s]))
        else:
            mus_arm(c, s, armar[s])

    if lager != "armar":
        for s, v in spöke:
            mus_arm(c, s, v, alpha=0.35)
        if vick:
            for box, fäste in ÖRON:
                bit = Image.new("RGBA", c.size)
                bit.paste(MUSKROPP.crop(box), box[:2])
                for v in (18, -18):
                    g = bit.rotate(v, resample=Image.BICUBIC, center=fäste)
                    g.putalpha(g.getchannel("A").point(lambda a: int(a * 0.4)))
                    c.alpha_composite(g)
        if ben:
            for s in "lr":
                c.alpha_composite(MUS["_del"](f"leg-{s}"))
        for s in "lr":
            if s not in fram:
                arm(s)
        c.alpha_composite(MUSKROPP)
        rita_ansikte(c, mood, (blick[0] / 9, blick[1] / 9))
        if lager == "kropp":
            return c
    for s in "lr":
        if s in fram:
            arm(s)
    return c


rita_ansikte = MUS["ansikten"].rita
MUS["ansikten"].KRITA = KRITA  # kritlinje i ansiktena


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
    canvas.paste(big, (x0, y0), big)
    return s, x0, y0


# --- Saker ----------------------------------------------------------------
BIL = A / "rekvisita" / "rosa-bilen"
# Filnamnen läses ur riggen, så att en omritad bil med andra delar fungerar utan ändringar här
_brig = json.loads((BIL / "rosa-bilen-rigg.json").read_text()) if (BIL / "rosa-bilen-rigg.json").exists() else {
    "kropp": "cut/rosa-bilen-kaross.png", "kant": "cut/rosa-bilen-kant.png", "delar": {
        "bakhjul": {"fil": "cut/rosa-bilen-bakhjul.png", "vridpunkt": [312, 844]},
        "framhjul": {"fil": "cut/rosa-bilen-framhjul.png", "vridpunkt": [687, 845]}}}
KAROSS = bild(f"rekvisita/rosa-bilen/{_brig['kropp']}", ph_kaross)
KANT = bild(f"rekvisita/rosa-bilen/{_brig.get('kant', _brig['kropp'])}", lambda: ph_kaross(säte=False))
HJUL = [bild(f"rekvisita/rosa-bilen/{d['fil']}", lambda d=d: ph_hjul(d["vridpunkt"][0])) for d in _brig["delar"].values()]
GLASS = bild("rekvisita/jordgubbsglass.png", ph_glass)


def _glassdelar():
    """Kulan, den tomma struten och kulan i två andra färger, ur samma bild (kulan = de rosa pixlarna)."""
    hsv = np.asarray(GLASS.convert("RGB").convert("HSV")).copy()
    kula = (hsv[..., 0] > 180) & (np.asarray(GLASS)[..., 3] > 0)
    a = np.asarray(GLASS.getchannel("A"))
    strut, boll = GLASS.copy(), GLASS.copy()
    strut.putalpha(Image.fromarray(np.where(kula, 0, a).astype(np.uint8)))
    boll.putalpha(Image.fromarray(np.where(kula, a, 0).astype(np.uint8)))
    färgad = []
    for ton, mätt in ((40, 0.9), (75, 0.75)):  # gul, grön
        h = hsv.copy()
        h[..., 0] = np.where(kula, ton, h[..., 0])
        h[..., 1] = np.where(kula, h[..., 1] * mätt + 60, h[..., 1]).clip(0, 255)
        im = Image.merge("HSV", [Image.fromarray(h[..., i]) for i in range(3)]).convert("RGBA")
        im.putalpha(GLASS.getchannel("A"))
        färgad.append(im)
    boll = boll.crop(boll.getbbox())
    berg = Image.new("RGBA", (GLASS.width, GLASS.height + int(boll.height * 0.62)))
    berg.alpha_composite(strut, (0, berg.height - GLASS.height))
    berg.alpha_composite(boll, ((GLASS.width - boll.width) // 2, berg.height - GLASS.height))
    berg.alpha_composite(boll, ((GLASS.width - boll.width) // 2, 0))
    klick = boll.resize((int(boll.width * 1.35), int(boll.height * 0.45)), Image.LANCZOS)
    return strut, berg, klick, färgad


STRUT, _BERG, KLICK, (GUL_GLASS, GRÖN_GLASS) = _glassdelar()  # KLICK: kulan som ramlat i golvet
GLASSBERG = bild("rekvisita/cut/jordgubbsglass-glassberg.png", lambda: _BERG)  # två rosa kulor på struten (Sanna); i kod tills bilden finns
BUSKE = bild("bakgrunder/vagen-saker/buske-rosa.png", ph_buske)
BALLONG = bild("bakgrunder/vagen-saker/ballong-rosa.png", ph_ballong)
FIA = Image.open(A / "karaktarer" / "fjarilen-fia" / "cut" / "fia.png").convert("RGBA")

TOPP = 300  # luft ovanför bilen så att musens huvud får plats
# Föraren ur riggen (skala och var fötterna hamnar). Riggens färdiga
# förarbild (musen som vinkar) används inte: storyboarden ritar musen med armar i kod, så att hon kan styra, peka och
# hålla glassen. Saknas fötterna i riggen sätts hon där förarbilden sitter (ögonen på (455, 278)/(588, 255) i bilen),
# men lite högre, så att mer av henne syns över kanten i närbilderna.
_förare = _brig.get("förare", {})
if "fötter" not in _förare:
    _förare = {"skala": 0.62, "fötter": [523, 545]}
MUS_K, (MUS_X, MUS_Y) = _förare["skala"], _förare["fötter"]
# Ingen ratt (Sanna): tassarna vilar på bilens kant när de inte gör något annat. Musens 1024-koordinater.
KANT_TASS = {"r": (600, 800), "l": (425, 805)}

def i_mus(x, y):
    """Bilens koordinater → musens 1024-koordinater."""
    return 512 + (x - MUS_X) / MUS_K, 926 + (y - TOPP - MUS_Y) / MUS_K


def i_bil(x, y):
    """Musens 1024-koordinater → bilens koordinater (utan TOPP)."""
    return MUS_X + (x - 512) * MUS_K, MUS_Y + (y - 926) * MUS_K


def till_musen(x, y, rot):
    """Bilens punkt (utan TOPP) → musens 1024-koordinater, med hänsyn till att musen är lutad rot grader."""
    cx, cy = MUS_X, TOPP + MUS_Y - 60
    v = math.radians(-rot)  # baklänges genom PIL:s rotate (moturs)
    dx, dy = x - cx, y + TOPP - cy
    return i_mus(cx + dx * math.cos(v) + dy * math.sin(v), cy - dx * math.sin(v) + dy * math.cos(v))


def bilen(mus=True, rot=0, vit=False, **kw):
    """Bilen i lager: kaross → musen → kanten → musens armar framför → hjulen.
    En arm som inte får något annat att göra vilar med tassen på bilens kant (KANT_TASS), framför kanten.
    vit: tjockare vit kant runt allt (mot kioskens rosa vägg)."""
    c = Image.new("RGBA", (1024, 1024 + TOPP))
    c.alpha_composite(KAROSS, (0, TOPP))
    lag = []
    if mus:
        for sd in "rl":
            if f"arm_{sd}" not in kw:
                kw[f"arm_{sd}"] = till_musen(*i_bil(*KANT_TASS[sd]), rot)
                kw["fram"] = kw.get("fram", "") + sd
        for lager in ("kropp", "armar"):
            m = musen(lager=lager, ben=False, **kw)
            m = m.resize((round(1024 * MUS_K),) * 2, Image.LANCZOS)
            stor = Image.new("RGBA", c.size)
            stor.alpha_composite(m, (round(MUS_X - 512 * MUS_K), round(TOPP + MUS_Y - 926 * MUS_K)))
            if rot:
                stor = stor.rotate(rot, resample=Image.BICUBIC, center=(MUS_X, TOPP + MUS_Y - 60))
            lag.append(stor)
        c.alpha_composite(lag[0])
    c.alpha_composite(KANT, (0, TOPP))
    for l in lag[1:]:
        c.alpha_composite(l)
    for h in HJUL:
        c.alpha_composite(h, (0, TOPP))
    if vit:
        under = Image.new("RGBA", c.size, (255, 255, 255, 0))
        under.putalpha(c.getchannel("A").filter(ImageFilter.MaxFilter(15)))
        under.alpha_composite(c)
        c = under
    return c


def mus_huvud(bil_pos, px=509, py=440):
    """Var en punkt på musen (hennes 1024-koordinater, nosen som standard) hamnar på bilden."""
    s, x0, y0 = bil_pos
    return x0 + (MUS_X + (px - 512) * MUS_K) * s, y0 + (TOPP + MUS_Y + (py - 926) * MUS_K) * s


# --- Ritat i kod ----------------------------------------------------------
def arrow(canvas, pts, col=INK):
    """Streckad rörelsepil, som i 004."""
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


def streck(canvas, x, y, r=40, n=5, start=-150, slut=-30, col=INK, w=5):
    """Små rörelse- och ljudstreck i en solfjäder (klapp, tut, pop, pling)."""
    m, d = ritmask(canvas)
    for i in range(n):
        a = math.radians(start + (slut - start) * i / max(1, n - 1))
        d.line((x + r * math.cos(a), y + r * math.sin(a), x + r * 1.7 * math.cos(a), y + r * 1.7 * math.sin(a)), fill=255, width=w + 1)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def vift(canvas, x, y, r=34, col=INK):
    """Två bågar bredvid en hand som vinkar."""
    m, d = ritmask(canvas)
    for k in (1, 1.5):
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 300, 360, fill=255, width=6)
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 180, 240, fill=255, width=6)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def doft(canvas, p, q, col=(236, 96, 160)):
    """Doften från blommorna till nosen: en slingrande prickig linje."""
    m, d = ritmask(canvas)
    n = 40
    for i in range(n):
        t = i / n
        x = p[0] + (q[0] - p[0]) * t
        y = p[1] + (q[1] - p[1]) * t + 22 * math.sin(t * math.pi * 4)
        if i % 2 == 0:
            d.ellipse((x - 7, y - 7, x + 7, y + 7), fill=255)
    kritfyll(canvas, m, col, vick=0.25, oskarp=1.5)


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


REGNBÅGE = [(198, 40, 40), (31, 105, 173), (106, 44, 145), (176, 24, 95), (46, 125, 50), (0, 105, 110)]


def color_text(canvas, cy, text, size):
    f = font(size)
    d = ImageDraw.Draw(canvas)
    x = W / 2 - d.textlength(text, font=f) / 2
    for i, ch in enumerate(text):
        d.text((x, cy + (8 if i % 2 else -8)), ch, font=f, fill=REGNBÅGE[i % len(REGNBÅGE)],
               anchor="lm", stroke_width=6, stroke_fill=(255, 255, 255))
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
    kritfyll(c, m, (242, 140, 124))


# --- Platserna ------------------------------------------------------------
# A · Vägen: väggen slutar vid y ≈ 580, vägen med mittlinjen under. Bilen står på nedre tredjedelen med mitten vid
# vänstra tredjedelslinjen och kör in i bilden åt höger; det rosa som glider in landar på högra tredjedelen.
GV, BIL_H, BIL_X = 735, 480, W / 3
BUSKE_X, BUSKE_G, BUSKE_H = W * 2 / 3 + 30, 640, 340
BALLONG_X, BALLONG_G, BALLONG_H = W * 2 / 3 + 30, 470, 330
NÄR_H, NÄR_ÖGON = 870, 0.42  # närbildens höjd i musens koordinater och ögonens läge uppifrån: öronen får luft ovanför,
ÖGON_Y = 400  # och bilens kant tar högst den nedersta fjärdedelen. Musens ögon, i hennes koordinater


def drive(stuff=None, fart=True, **kw):
    c = plate("vagen")
    if stuff:
        stuff(c)
    if fart:
        for y in (560, 620, 680):  # fartstreck bakom bilen
            ImageDraw.Draw(c).line((BIL_X - 420, y, BIL_X - 320, y), fill=(255, 255, 255), width=7)
    b = place(c, bilen(**kw), BIL_X, GV, BIL_H, rot=-1)
    return c, b


def närbild(c, b, dx=0):
    """Närbild på musen, samma inramning i alla scener: ögonen strax ovanför mitten, öronen med."""
    h = NÄR_H * MUS_K * b[0]
    x, _ = mus_huvud(b)
    _, y = mus_huvud(b, 509, ÖGON_Y)
    return crop_zoom(c, x + dx, y + h * (0.5 - NÄR_ÖGON), h * W / H)


def buske(c, x=BUSKE_X):
    place(c, BUSKE, x, BUSKE_G, BUSKE_H)


def ballong(c, x=BALLONG_X, y=BALLONG_G):
    place(c, BALLONG, x, y, BALLONG_H, rot=6)


# B · Glasskiosken, spegelvänd så att kiosken står till höger och bilen fortsätter åt höger som på vägen,
# och lite inzoomad (1,38×) så att musen i bilen och grodan i fönstret kan räcka varandra glassen.
# Bilen och fönstret är en grupp: bilen är stor nog att musens ansikte hamnar i höjd med grodans.
Z, ZX, ZY = 1.376, 376, 210  # zoomen: x' = (x − ZX)·Z, y' = (y − ZY)·Z


def zoom_box(x0, y0, x1, y1):
    return tuple(round(v) for v in ((x0 - ZX) * Z, (y0 - ZY) * Z, (x1 - ZX) * Z, (y1 - ZY) * Z))


_k = ImageOps.mirror(plate("glasskiosken"))
KIOSK_RÅ = golvstreck(_k.crop((ZX, ZY, round(ZX + W / Z), round(ZY + H / Z))).resize((W, H), Image.LANCZOS), 595)
_tyst = Image.new("L", (W, H))
ImageDraw.Draw(_tyst).rectangle((760, 0, W, 285), fill=90)  # markisen och den stora struten: lite blekare, så att de inte drar blicken
KIOSK = Image.composite(Image.new("RGB", (W, H), ROSA), KIOSK_RÅ, _tyst.filter(ImageFilter.GaussianBlur(12)))
DISK = zoom_box(950, 530, 1292, 676)  # disken, läggs tillbaka framför grodan
GK = 735  # bilens hjul framför kiosken
KIOSK_BIL_X, KIOSK_BIL_H = 620, 470
GRODA_X, GRODA_TOPP, GRODA_K = 1010, 276, 0.4  # grodan fyller fönstret: huvudet under markisen, axlarna vid disken, ansiktet minst lika stort som musens huvud
GRODA_ÖGON = GRODA_TOPP + (262 - 165) * GRODA_K
GRODA_NÄR_W = 1700 * GRODA_K


def kiosk(groda="open", lift=0, tyst=True, **kw):
    """tyst=False: markisen och struten i full styrka, när det är dem musen pekar på."""
    c = (KIOSK if tyst else KIOSK_RÅ).copy()
    if groda:
        sätt(c, figur("grodan-gurra", groda, ben=False, **kw), GRODA_X, GRODA_TOPP + (926 - 165) * GRODA_K - lift, GRODA_K)
        c.paste(KIOSK_RÅ.crop(DISK), DISK[:2])  # disken framför grodans fötter
    return c


def sätt(c, im, x, fot, k):
    """Figurens 1024-ruta skalad k, med (512, 926) på (x, fot): samma storlek och läge vad armarna än gör."""
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.paste(im, (round(x - 512 * k), round(fot - 926 * k)), im)


def tilt_upp(c, d):
    """Kameran glider upp d bildpunkter (samma inställning), så att den stora struten ovanför kiosken syns hel."""
    ny = Image.new("RGB", (W, H))
    ny.paste(_k.crop((ZX, round(ZY - d / Z), round(ZX + W / Z), ZY)).resize((W, d), Image.LANCZOS), (0, 0))
    ny.paste(c.crop((0, 0, W, H - d)), (0, d))
    return ny


def på_kiosk(c, x=KIOSK_BIL_X, **kw):
    return place(c, bilen(vit=True, **kw), x, GK, KIOSK_BIL_H)


def groda_närbild(c):
    """Närbild på grodan i fönstret, ögonen på övre tredjedelen (står still när grodan hoppar)."""
    return crop_zoom(c, GRODA_X, GRODA_ÖGON + GRODA_NÄR_W * H / W / 6, GRODA_NÄR_W)


IKON_X, IKON_Y, IKON_D = 470, 125, 140  # fritt från den stora struten och från bildens överkant


def ikoner(c, n, pop=(), platser=None):
    """Sammanfattningen: de första n småbilderna på väggen; de i `pop` har just poppat fram."""
    nos = Image.open(A / "karaktarer" / "musen-mille" / "cut" / "musen-mille.png").convert("RGBA").crop((161, 104, 906, 620))
    saker = [(BUSKE, 110), (BALLONG, 140), (nos, 95), (GLASSBERG, 140), (bilen(mus=False), 95)]
    for i, (im, h) in enumerate(saker[:n]):
        x, y = platser[i] if platser else (IKON_X + (i - 2) * IKON_D, IKON_Y)  # en jämn rad på väggen, centrerad över bilen och musen
        m, d = ritmask(c)
        d.ellipse((x - 60, y - 60, x + 60, y + 60), fill=255)
        kritfyll(c, m, (255, 255, 255), vick=0.3)
        place(c, im, x, y + h * 0.45, h * 0.9)
        if i in pop:
            streck(c, x, y, r=68, n=7, start=-170, slut=-10, col=(255, 255, 255))


# Peka-riktningar i musens koordinater (bara riktningen räknas)
HÖGER, UPP_HÖGER = (3000, 450), (3000, -2200)
UPP = 140  # pekar upp, snett utåt så att den korta armen syns bredvid huvudet
MUN = (585, 600)  # tassen här: glassen når munnen
GLASS_R, GLASS_L = mot("r", (850, 330)), mot("l", (174, 330))  # håller upp glassen bredvid huvudet


# --- Bilderna ---------------------------------------------------------------
frames = {}

# 01 Intro: titelkortet på rosa vägg med logotypen och en liten rosa bil (titeln är formatets text, inte i bilden här)
c = Image.new("RGB", (W, H), ROSA)
color_text(c, H * 0.38, "lilla kritan", 120)
place(c, bilen(mus=False, vit=True), W / 2, 660, 170)
frames["01"] = c


# 02–02c Kritan ritar bilen: först formen, under frågan hjul, hjul och en framlykta, sedan svaret
def ritad_bil(c, hjul=0, lykta=False, lyft=0):
    x0, y0 = 430, 300 - lyft
    m, d = ritmask(c)
    d.rounded_rectangle((x0, y0 + 60, x0 + 520, y0 + 230), 80, fill=255)
    d.ellipse((x0 + 150, y0 + 10, x0 + 330, y0 + 120), fill=0)  # öppningen där föraren sitter
    kritfyll(c, m, BIL_ROSA, vick=0.4, oskarp=3)
    m, d = ritmask(c)
    for i in range(140):  # kritkorn
        x, y = random.uniform(x0 + 20, x0 + 500), random.uniform(y0 + 130, y0 + 220)
        d.line((x, y, x + 24, y - 6), fill=255, width=3)
    kritfyll(c, m, (236, 150, 186), vick=0.15, oskarp=1)
    for i, hx in enumerate((x0 + 120, x0 + 400)[:hjul]):
        m, d = ritmask(c)
        d.ellipse((hx - 55, y0 + 185, hx + 55, y0 + 295), fill=255)
        kritfyll(c, m, INK, vick=0.35)
        m, d = ritmask(c)
        d.ellipse((hx - 18, y0 + 222, hx + 18, y0 + 258), fill=255)
        kritfyll(c, m, (240, 170, 190), vick=0.3)  # rosa nav, som bilens
    if lykta:  # en rund gul framlykta, som bilens
        m, d = ritmask(c)
        d.ellipse((x0 + 470, y0 + 105, x0 + 515, y0 + 150), fill=255)
        kritfyll(c, m, (250, 214, 90), vick=0.2, oskarp=1.2)


c = paper()
ritad_bil(c)
krita(c, 950, 470)
frames["02"] = c
c = paper()
ritad_bil(c, hjul=2)  # vad kan det vara?: hjul, hjul
krita(c, 830, 540)
frames["02a"] = c
c = paper()
ritad_bil(c, hjul=2, lykta=True)  # Vad kan det vara?: och en framlykta
krita(c, 850, 300)
frames["02b"] = c
c = paper()
ritad_bil(c, hjul=2, lykta=True, lyft=30)
krita(c, 1080, 200)
arrow(c, [(380, 520), (380, 420), (380, 520)])
frames["02c"] = c

# 03 Zoom in: den ritade bilen blir musens bil på vägen
c, b = drive(fart=False)
for r in (240, 310):
    ImageDraw.Draw(c).ellipse((BIL_X - r * 1.3, GV - BIL_H / 2 - r, BIL_X + r * 1.3, GV - BIL_H / 2 + r), outline=(255, 255, 255), width=5)
frames["03"] = c

# 03a Musen vinkar till tittaren
c, b = drive(mood="blinkar", arm_r=VINK, spöke=[("r", VINK_SPÖKE)])
vift(c, *mus_huvud(b, 960, 300))
frames["03a"] = närbild(c, b)
# 03b … och lägger tassarna på bilens kant
c, b = drive(blick=(8, 0))
frames["03b"] = närbild(c, b)

# 04 Vers 1: vägen glider, en fjäril fladdrar förbi högt uppe
c, b = drive(lambda c: (place(c, FIA, 1050, 250, 100, rot=8), arrow(c, [(1180, 200), (950, 270)])))
frames["04"] = c

# Refrängdansen (sang.md): en rörelse per sjungen rad, likadan alla tre gångerna.
# Klippen växlar dansbild (kamera 6: bilen i mitten och större, vägen står still) och närbild (kamera 3).
DANS = {  # musens rörelser, i hennes koordinater
    "upp": dict(mood="ropar", arm_r=145, arm_l=145),  # armarna upp i ett V, utanför öronen
    "hjärta": dict(mood="karleksfull", arm_r=mot("r", (552, 612)), arm_l=mot("l", (472, 618)), fram="rl", rot=7),
    "glasstopp": dict(mood="skrattar", arm_r=170, arm_l=170, fram="rl"),  # armarna rakt upp framför öronen (de korta armarna når inte ihop)
    "styra": dict(mood="skrattar", arm_r=(590, 640), arm_l=(440, 640), fram="rl"),  # styr i luften med knytnävarna framför bröstet
    "titta": dict(mood="nyfiken", arm_r=mot("r", (612, 390)), fram="r"),  # tassen över ögonen
}
GRODA_DANS = {"upp": dict(peka_r=(1500, -600), peka_l=(-480, -600)),  # grodan gör samma rörelser i fönstret
              "hjärta": dict(peka_r=(560, 640), peka_l=(465, 640)), "glasstopp": dict(peka_r=(830, -2000), peka_l=(190, -2000))}
# (rörelse, hoppar bilen, klipp) för refrängens sex klipp: D = dansbild, N = närbild. Ekoraderna två och två i dansbild,
# känslorna i närbild: rad 1–2 D, 3 N (hjärtat), 4–5 D, 6 N (glasstoppen), 7 D (styra i luften), 8 N (titta ut)
RADER = [("upp", True, "D"), ("hjärta", False, "N"), ("upp", True, "D"),
         ("glasstopp", False, "N"), ("styra", False, "D"), ("titta", False, "N")]
HOPP = 45  # så högt bilen hoppar i takt


def skugga(c, cx, y, w, hopp):
    """Skuggan på golvet står kvar när bilen hoppar och blir mindre."""
    k = 0.6 if hopp else 1
    rx, ry = w * k / 2, 16 * k
    m, d = ritmask(c)
    if not KRITA:
        d.ellipse((cx - rx, y - ry, cx + rx, y + ry), fill=255)
    for x in np.arange(cx - rx * 0.95, cx + rx * 0.95, 9) if KRITA else ():  # kritklotter i stället för en slät oval
        hh = ry * math.sqrt(max(0, 1 - ((x - cx) / rx) ** 2))
        d.line((x - 7, y + hh, x + 7, y - hh), fill=255, width=4)
    kritfyll(c, m, (70, 64, 60), alpha=0.3, vick=0.15, oskarp=1)


def dansa(c, rörelse, hopp, x, ground, h, vit=False):
    """Bilen med musen i dansrörelsen, skuggan under och rörelsemärken. Returnerar bilens läge."""
    bil = bilen(vit=vit, **DANS[rörelse])
    box = bil.getbbox()
    skugga(c, x, ground - 6, (box[2] - box[0]) * h / (box[3] - box[1]) * 0.85, hopp)
    b = place(c, bil, x, ground - (HOPP if hopp else 0), h)
    hx, hy = mus_huvud(b, 512, 40)
    if hopp:
        arrow(c, [(x - h * 0.62, ground - 30), (x - h * 0.62, ground - 150)])
    if rörelse == "upp":  # armarna upp
        for px in (90, 934):
            ax, ay = mus_huvud(b, px, 330)
            arrow(c, [(ax, ay), (ax, ay - h * 0.14)])
    if rörelse == "hjärta":  # gunga åt sidorna
        arrow(c, [(hx, hy - 10), (hx - 110, hy + 10)])
        arrow(c, [(hx, hy - 10), (hx + 110, hy + 10)])
    if rörelse == "titta":  # åt ena hållet och sedan åt det andra
        arrow(c, [(hx, hy), (hx + 150, hy)])
        arrow(c, [(hx, hy), (hx - 150, hy)])
    if rörelse == "styra":  # "brum, brum": knytnävarna rullar runt; "tut, tut": två små pumpar uppåt
        rx, ry = mus_huvud(b, 515, 640)
        rr = h * 0.1
        arrow(c, [(rx + rr * math.cos(math.radians(a)), ry - rr * 0.6 * math.sin(math.radians(a))) for a in range(200, -60, -20)])
        for px in (380, 650):
            ax, ay = mus_huvud(b, px, 560)
            arrow(c, [(ax, ay), (ax, ay - h * 0.08)])
    return b


DANS_X, DANS_G, DANS_H = W / 2, 715, 560


def dansbild(rörelse, hopp):
    c = plate("vagen")
    return c, dansa(c, rörelse, hopp, DANS_X, DANS_G, DANS_H)


for i, (rörelse, hopp, klipp) in enumerate(RADER):
    c, b = dansbild(rörelse, hopp)
    im = c if klipp == "D" else närbild(c, b)
    for n in ("05", "09"):
        frames[n + "abcdef"[i]] = im

# 06 Blommorna: busken glider in från höger
c, b = drive(lambda c: (buske(c, 1300), arrow(c, [(1240, 330), (1060, 330)])), blick=(10, 0))
frames["06"] = c
# 06a … vägen stannar mitt för den, musen pekar
c, b = drive(buske, fart=False, mood="forvanad", arm_r=mot("r", HÖGER), blick=(10, 4))
frames["06a"] = c
# 06b sniff, sniff, mmm: lutar sig mot blommorna med nosen uppåt och blundar, doften slingrar till nosen
NÄRA = BUSKE_X - 170  # busken lite närmare i närbilden, så att både hela huvudet och blommorna syns
c, b = drive(lambda c: buske(c, NÄRA), fart=False, mood="njuter", rot=8, arm_r=VILA)  # njuter: hela musen lutar bakåt, nosen upp
x, y = mus_huvud(b)
doft(c, (NÄRA - 140, BUSKE_G - 190), (x + 40, y))
frames["06b"] = närbild(c, b, dx=40)

# 07 Ballongen: vägen glider igen, busken åker ut till vänster, ballongen svävar in högt uppe
c, b = drive(lambda c: (buske(c, 120), arrow(c, [(260, 330), (60, 330)]), ballong(c, 1230),
                        arrow(c, [(1330, 420), (1270, 380), (1330, 330)])))
frames["07"] = c
# 07a … vägen stannar, musen pekar på ballongen
c, b = drive(ballong, fart=False, mood="forvanad", arm_r=mot("r", UPP_HÖGER), blick=(9, -9))
frames["07a"] = c
# 07b upp, upp, upp: huvudet bakåt, pekar rakt upp
c, b = drive(fart=False, rot=7, arm_r=UPP, blick=(6, -12), spöke=[("r", mot("r", (3000, -1200)))])
bx, topp = mus_huvud(b, 1270, 40)  # ballongen har stigit och glidit närmare, så att den syns i närbilden
place(c, BALLONG, bx, mus_huvud(b, 1270, 520)[1], mus_huvud(b, 1270, 520)[1] - topp, rot=6)
x, y = mus_huvud(b, 900, 250)
arrow(c, [(x + 40, y + 60), (x + 40, y - 110)])
frames["07b"] = närbild(c, b, dx=120)

# 08 Frågan: frågande min mot tittaren, ena tassen på kanten
c, b = drive(fart=False, mood="nyfiken", arm_l=120, blick=(-9, 4))  # nyfiken, men tittar på tittaren
frames["08"] = närbild(c, b)
# 08a Pausen: skelögd mot sin egen nos
c, b = drive(fart=False, mood="skelogd")
frames["08a"] = närbild(c, b)
# 08b Nosen är rosa: fingret på nosen
c, b = drive(fart=False, mood="skrattar", arm_r=mot("r", (530, 430)), fram="r")
frames["08b"] = närbild(c, b)
# 08c Vick, vick, vick: öronen vickar
c, b = drive(fart=False, vick=True)
for px in (290, 735):
    streck(c, *mus_huvud(b, px, 130), r=22, n=3, start=-130 if px < 512 else -80, slut=-100 if px < 512 else -50)
frames["08c"] = närbild(c, b)

# 10 Kritsvep i kioskens rosa
c = frames["09f"].copy()
m, d = ritmask(c)
for i in range(70):
    y = i * 12 - 20
    x1 = 780 + random.uniform(-50, 50)
    d.line((-20, y + 30, x1, y - 30), fill=255, width=40)
    d.ellipse((x1 - 20, y - 50, x1 + 20, y - 10), fill=255)
kritfyll(c, m, ROSA, vick=0.35, oskarp=3)
arrow(c, [(860, 380), (1060, 380)], (255, 255, 255))
frames["10"] = c

# 11 Bilen kör in från vänster mot kiosken
c = kiosk()
på_kiosk(c, 300, blick=(10, 0))
arrow(c, [(40, 300), (230, 300)])
frames["11"] = c
# 11a Titta där – glassen är rosa: bilen har stannat, musen pekar på glasstruten ovanför kiosken
c = kiosk(blick=(-8, -4), tyst=False)  # struten är det musen pekar på
på_kiosk(c, mood="forvanad", arm_r=mot("r", UPP_HÖGER), blick=(9, -9))
frames["11a"] = tilt_upp(c, 170)  # kameran följer pekfingret upp till den rosa kulan på struten
# 11b mums, mums, mums: närbild, musen slickar sig om munnen
c = kiosk()
b = på_kiosk(c, mood="slickar", blick=(8, -6))
streck(c, *mus_huvud(b, 580, 470), r=18, n=3, start=-30, slut=30)
frames["11b"] = närbild(c, b)
# 11c–13e Luckan: tre glassar, plupp, glassberget. Grodan visar en gul, en grön och en rosa (samma glass, färgad i kod).
STRUT_H, STRUT_Y = 90, 505  # glassarna i fönstret: höjd och var struten slutar (framför disken, under grodans mun)
KLICK_X, KLICK_Y = 905, 728  # kulan i golvet framför musen, där hon står vid disken
STRUT_FRAM = mot("r", (720, 600))  # den tomma struten framför bröstet, så att den syns i närbilden


def tre_glassar(c, utan=()):
    for i, (g, x, rot) in enumerate(((GLASS, GRODA_X - 125, 12), (GRÖN_GLASS, GRODA_X, 0), (GUL_GLASS, GRODA_X + 125, -12))):  # rosa närmast musen
        if i not in utan:
            place(c, g, x, STRUT_Y, STRUT_H, rot=rot)


def klick(c):
    place(c, KLICK, KLICK_X, KLICK_Y, 60)


# 11d Hej, grodan! Kväk! Vilken glass vill du ha?: närbild grodan med tre glassar
c = kiosk("happy", hand_r=(700, 880), hand_l=(330, 880), blick=(-6, 0))
tre_glassar(c)
frames["11d"] = groda_närbild(c)
# 11e Rosa, tack!: musen pekar på den rosa
c = kiosk("open", hand_r=(700, 880), hand_l=(330, 880), blick=(-10, 2))
tre_glassar(c)
på_kiosk(c, mood="skrattar", rot=-8, arm_r=mot("r", (3000, 120)), blick=(10, 0))
frames["11e"] = c
# 12 Varsågod! Tack!: grodan räcker fram den rosa, musen tar den
c = kiosk("happy", peka_l=(-3000, 300), glass="l")
tre_glassar(c, utan=[0])
streck(c, GRODA_X - 130, GRODA_ÖGON + 40, r=30, n=5, start=-170, slut=-90, col=(255, 255, 255))
på_kiosk(c, rot=-12, arm_r=mot("r", HÖGER))
frames["12"] = c
# Efter "Tack!" hoppar musen ur bilen och står vid disken när hon äter (Sanna); bilen står kvar tom bakom henne.
# Ätandet visas i en tvåbild: ett närmare utsnitt av kioskens helbild (samma inställning), grodan från midjan och
# upp i fönstret, musen hel på golvet, disken som gräns mellan dem.
MUS_DISK_X, KIOSK_FOT = 800, 712
_bref = place(Image.new("RGBA", (W, H)), bilen(vit=True), KIOSK_BIL_X, GK, KIOSK_BIL_H)  # bilens skala vid kiosken
MUS_STÅ_H = (lambda bb: (bb[3] - bb[1]) * MUS_K * _bref[0])(musen().getbbox())  # samma storlek som i bilen
TVÅ_CX, TVÅ_CY, TVÅ_W = 930, 505, 880  # tvåbildens utsnitt


def parkerad(c):
    """Bilen står kvar vid kiosken, tom."""
    s, x0, y0 = _bref
    tom = bilen(mus=False, vit=True)
    c.paste(tom.resize((round(tom.width * s), round(tom.height * s)), Image.LANCZOS), (x0, y0), tom.resize((round(tom.width * s), round(tom.height * s)), Image.LANCZOS))


def vid_disken(c, lyft=0, **kw):
    """Musen står på golvet vid disken (eller hoppar, lyft). Returnerar (skala, x0, y0) i hennes 1024-koordinater."""
    im = musen(**kw)
    bb = im.getbbox()
    skugga(c, MUS_DISK_X, KIOSK_FOT - 4, (bb[2] - bb[0]) * MUS_STÅ_H / (bb[3] - bb[1]) * 0.7, lyft)
    return place(c, im, MUS_DISK_X, KIOSK_FOT - lyft, MUS_STÅ_H)


def mus_pkt(b, px, py):
    s, x0, y0 = b
    return x0 + px * s, y0 + py * s


def tvåbild(c):
    return crop_zoom(c, TVÅ_CX, TVÅ_CY, TVÅ_W)


# 12a Musen hoppar ur bilen med glassen (boing), samma helbild utan klipp
c = kiosk("happy")
tre_glassar(c, utan=[0])
parkerad(c)
b = vid_disken(c, lyft=150, mood="skrattar", arm_r=GLASS_R, glass="r")
arrow(c, [(560, 360), (640, 260), (740, 250), (790, 330)])
streck(c, *mus_pkt(b, 512, 90), r=40, n=5)
frames["12a"] = c
# 13a Oj, oj, plupp!: hon slickar och kulan ramlar ner i golvet framför henne; hon håller kvar den tomma struten
c = kiosk("open", blick=(-8, 10))
parkerad(c)
b = vid_disken(c, mood="forvanad", arm_r=GLASS_R, glass="r", gbild=STRUT, blick=(4, 10))
klick(c)
arrow(c, [mus_pkt(b, 880, 250), (KLICK_X, KLICK_Y - 40)])
frames["13a"] = tvåbild(c)
# 13d Grodan hjälper, kväk, kväk, kväk!: grodan sträcker sig över disken och sätter två nya kulor på struten
c = kiosk("skrattar", peka_l=(-3000, 100))
parkerad(c)
klick(c)
b = vid_disken(c, mood="forvanad", arm_r=mot("r", (3000, 250)), glass="r", gbild=GLASSBERG, blick=(8, -6))
streck(c, *mus_pkt(b, 980, 60), r=34, n=5, start=-170, slut=-10, col=(255, 255, 255))
frames["13d"] = tvåbild(c)
# Vers 2 forts.: glassberget (14c), mums och hurra (14d–e), samma tvåbild
c = kiosk("happy")  # Två rosa kulor – ett glassberg!
parkerad(c)
klick(c)
vid_disken(c, mood="skrattar", arm_r=mot("r", (700, 250)), fram="r", glass="r", gbild=GLASSBERG, blick=(4, -8))
frames["14c"] = tvåbild(c)
c = kiosk("skrattar", lift=30, **GRODA_DANS["upp"])  # Mums, mums, mums
parkerad(c)
klick(c)
vid_disken(c, mood="slickar", arm_r=mot("r", MUN), fram="r", glass="r", gbild=GLASSBERG, blick=(8, -4))
frames["14d"] = tvåbild(c)
c = kiosk("skrattar", lift=30, **GRODA_DANS["upp"])  # … hurra, hurra!: sista biten är uppäten, armarna upp
parkerad(c)
klick(c)
b = vid_disken(c, mood="skrattar", arm_r=145, arm_l=145, blick=(6, -4))
streck(c, *mus_pkt(b, 600, 470), r=22, n=3, start=-30, slut=30)
frames["14e"] = tvåbild(c)


# --- Danspausen (14f–14m) och sista refrängen i discot ---------------------------------------------------------
# På "Danspaus!" klipper det till discot: en enfärgad ljusrosa bakgrund (assets/bakgrunder/danspaus/) med en rosa
# discokula som hänger i mitten upptill och snurrar sakta. Kulan kastar ljusprickar och små stjärnor över väggen, bakom
# dansarna och lugnt. Det är dansbildens inställning på en ny bakgrund. Musen (redan ute ur bilen) och grodan dansar
# med tre statister: Kaninen Kanel (hoppar), Humlan Humle (snurrar och surrar) och Dinon Disa (stampar och klappar).
# Var och en har en egen rörelse och en solobild. I gruppbilderna står alla fem i ett svagt V med musen i mitten,
# lite större och ett steg fram. Den som gör radens rörelse får ett litet stjärnregn runt sig.
SOLO_H, SOLO_FOT = 0.58 * H, 0.85 * H  # solobilderna: djuret mitt i bild, 58 % av bildhöjden, fötterna på 85 %
KULA = (688, 78, 44)  # discokulan: mitt, höjd, radie (snöret upp till bildens överkant)
IKON_BÅGE = [(288, 141), (488, 118), (888, 118), (1088, 141), (1288, 180)]  # småbilderna: en båge i övre tredjedelen, kulan mellan
# Rörelserna: musen i hennes vinklar/punkter, de andra med peka_* som grodan
MUS_RÖR = {"upp": DANS["upp"], "hjärta": DANS["hjärta"], "glasstopp": DANS["glasstopp"], "stå": dict(mood="glad")}
DJUR_RÖR = {"upp": GRODA_DANS["upp"], "hjärta": GRODA_DANS["hjärta"], "glasstopp": GRODA_DANS["glasstopp"],
            "klapp": GRODA_DANS["upp"],  # dinons korta armar når inte ihop: armarna upp, klappet syns i strecken
            "snurra": dict(peka_r=(1500, 560), peka_l=(-480, 560)), "stå": {}}
# Statisternas enda rörelse: (rörelse, hopp, snurr)
EGEN = {"kaninen-kanel": ("upp", True, 0), "humlan-humle": ("snurra", False, -14), "dinon-disa": ("klapp", False, 0)}


def ph_disco():
    im = Image.new("RGBA", (W, H), (250, 214, 228, 255))  # ljusrosa, en färg
    return im


DISCO_BILD = bild("bakgrunder/danspaus/danspaus.png", ph_disco).resize((W, H), Image.LANCZOS)
DISCOKULA = bild("bakgrunder/danspaus/cut/discokula.png", lambda: None)
VIT, LJUSROSA = (255, 255, 255), (255, 196, 222)


def stjärna(c, x, y, r, col=VIT):
    """En liten fyruddig stjärna i krita."""
    m, d = ritmask(c)
    k = r * 0.28
    d.polygon([(x, y - r), (x + k, y - k), (x + r, y), (x + k, y + k), (x, y + r), (x - k, y + k), (x - r, y), (x - k, y - k)], fill=255)
    kritfyll(c, m, col, vick=0.15, oskarp=0.8)


def stjärnregn(c, x, y, r, n=4):
    """Ett litet stjärnregn runt den som gör radens rörelse."""
    for i in range(n):
        v = math.radians(150 - i * 120 / max(1, n - 1))
        stjärna(c, x + r * math.cos(v), y - r * math.sin(v), 15 if i % 2 else 11, VIT if i % 2 else LJUSROSA)


def ljusprickar(c):
    """Kulans ljus på väggen: prickar och några stjärnor, glest och bakom dansarna (de driver sakta med kulans varv)."""
    rnd = random.Random(5)
    m, d = ritmask(c)
    for _ in range(26):
        x, y, rr = rnd.uniform(30, W - 30), rnd.uniform(20, H * 0.8), rnd.uniform(4, 8)
        if abs(x - KULA[0]) > 70 or y > 150:
            d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=255)
    kritfyll(c, m, VIT, alpha=0.6, vick=0.2, oskarp=1)
    for _ in range(9):
        x, y = rnd.uniform(40, W - 40), rnd.uniform(30, H * 0.75)
        if abs(x - KULA[0]) > 80 or y > 160:
            stjärna(c, x, y, rnd.uniform(9, 14), rnd.choice((VIT, LJUSROSA)))


def disco(n=0, pop=()):
    """Danspausens bakgrund med kulan, ljusprickarna och (i sista refrängen) de n första småbilderna i bågen."""
    c = DISCO_BILD.copy()
    ljusprickar(c)
    x, y, r = KULA
    if DISCOKULA:
        bb = DISCOKULA.getbbox()
        place(c, DISCOKULA, x, y + r * 1.02, (y + r * 1.02) * (bb[3] - bb[1]) / (bb[3] - bb[1] - 10))  # snöret når överkanten
    else:
        m, dm = ritmask(c)
        dm.ellipse((x - r, y - r, x + r, y + r), fill=255)
        kritfyll(c, m, (236, 120, 170), vick=0.25)
    stjärna(c, x - r * 0.4, y - r * 0.35, 9)  # blänk på rutorna
    stjärna(c, x + r * 0.45, y + r * 0.3, 7)
    arrow(c, [(x - r - 26, y + 6), (x - r * 0.4, y + r + 18), (x + r * 0.4, y + r + 18), (x + r + 26, y + 6)])  # snurrar sakta
    if n:
        ikoner(c, n, pop, platser=IKON_BÅGE)
    return c


def blomma():
    """En rosa blomma ur busken, med en kort grön stjälk och vit kant (humlans solobild och refrängens klistermärke)."""
    bit = BUSKE.crop((425, 85, 534, 191)) if BUSKE.width > 534 else BUSKE.copy()
    m = Image.new("L", bit.size)
    ImageDraw.Draw(m).ellipse((4, 4, bit.width - 4, bit.height - 4), fill=255)
    bit.putalpha(ImageChops.multiply(bit.getchannel("A"), m))
    c = Image.new("RGBA", (bit.width, bit.height + 90))
    ImageDraw.Draw(c).line((bit.width / 2, bit.height - 10, bit.width / 2 + 6, c.height - 4), fill=(63, 140, 70, 255), width=9)
    c.alpha_composite(bit)
    vit = Image.new("RGBA", c.size, (255, 255, 255, 0))
    vit.putalpha(c.getchannel("A").filter(ImageFilter.MaxFilter(9)))
    vit.alpha_composite(c)
    return vit


BLOMMA = blomma()


def dansbild(namn, rörelse=None, mood="happy"):
    """Figuren i rörelsen (statisterna alltid i sin egen). Returnerar (bild, rörelse, hopp, snurr)."""
    hopp, snurr = False, 0
    if namn in EGEN:
        rörelse, hopp, snurr = EGEN[namn]
    rörelse = rörelse or "stå"
    if namn == "musen-mille":
        rör = dict(MUS_RÖR[rörelse])
        rör.pop("rot", None)
        return musen(**rör), rörelse, hopp, snurr
    return figur(namn, mood, **DJUR_RÖR[rörelse]), rörelse, hopp, snurr


def dansare(c, namn, rörelse=None, x=None, h=SOLO_H, fot=SOLO_FOT, hopp=None, lyft=0, fokus=True):
    """En figur på golvet: skugga, figuren och rörelsemärkena. fokus: stjärnregn runt den. Returnerar (skala, x0, y0)."""
    im, rörelse, egen_hopp, snurr = dansbild(namn, rörelse)
    hopp = egen_hopp if hopp is None else hopp
    x = W / 2 if x is None else x
    bb = im.getbbox()
    skugga(c, x, fot - 4, (bb[2] - bb[0]) * h / (bb[3] - bb[1]) * 0.7, hopp or lyft)
    y = fot - (HOPP if hopp else 0) - lyft
    b = place(c, im, x, y, h, rot=snurr)
    s, x0, y0 = b
    if hopp:
        arrow(c, [(x - h * 0.55, fot - 20), (x - h * 0.55, fot - 120)])
    if snurr:
        r = h * 0.42
        arrow(c, [(x + r * math.cos(math.radians(a)), fot - 14 + r * 0.22 * math.sin(math.radians(a))) for a in range(200, -150, -25)])
        streck(c, x - h * 0.48, y - h * 0.62, r=h * 0.12, n=3, start=-200, slut=-150)  # surr vid vingarna
        streck(c, x + h * 0.48, y - h * 0.62, r=h * 0.12, n=3, start=-30, slut=20)
    if rörelse == "klapp":
        streck(c, x, y0 + 250 * s, r=h * 0.12, n=3, start=-130, slut=-50)  # klapp ovanför huvudet
        streck(c, x - h * 0.25, fot - 6, r=h * 0.12, n=3, start=-200, slut=-140)  # stamp: dunk vid fötterna
        streck(c, x + h * 0.25, fot - 6, r=h * 0.12, n=3, start=-40, slut=20)
    if fokus:
        stjärnregn(c, x, y - h * 0.55, h * 0.62)
    return b


# Gruppbilden: ett svagt V, musen i mitten lite större och ett steg fram, grodan och kaninen bredvid, humlan och dinon
# ytterst. Raden fyller 88 % av bildbredden med lika stora luckor; höjden räknas fram så att alla får plats.
V_ORDNING = ["humlan-humle", "kaninen-kanel", "musen-mille", "grodan-gurra", "dinon-disa"]
V_STORLEK = {"musen-mille": 1.08, "kaninen-kanel": 1.0, "grodan-gurra": 1.0, "humlan-humle": 0.94, "dinon-disa": 0.94}
V_FOT = {"musen-mille": 0.92 * H, "kaninen-kanel": 0.895 * H, "grodan-gurra": 0.895 * H, "humlan-humle": 0.875 * H, "dinon-disa": 0.875 * H}


def _v_rad():
    # bredden räknas på kroppen i vila; armar som sträcks ut får gå lite in över grannens lucka
    bred = {n: (lambda bb: (bb[2] - bb[0]) / (bb[3] - bb[1]))(dansbild(n, "stå")[0].getbbox() if n in ("musen-mille", "grodan-gurra")
                                                             else figur(n, "happy").getbbox()) * V_STORLEK[n] for n in V_ORDNING}
    lucka = 0.015 * W
    h0 = min(0.48 * H, (0.88 * W - 4 * lucka) / sum(bred.values()))
    x, rad = 0.06 * W, {}
    for n in V_ORDNING:
        w = bred[n] * h0
        rad[n] = (x + w / 2, h0 * V_STORLEK[n], V_FOT[n])
        x += w + lucka
    return rad


RAD = _v_rad()  # namn → (x, höjd, fötter)


def i_raden(c, namn, rörelse=None, hopp=None, lyft=0, fokus=False):
    x, h, fot = RAD[namn]
    return dansare(c, namn, rörelse, x=x, h=h, fot=fot, hopp=hopp, lyft=lyft, fokus=fokus)


def alla(c, rörelse, hopp=False):
    """Alla fem i V:et; musen och grodan gör rörelsen, statisterna sin egen. Stjärnregnet runt musen."""
    for namn in V_ORDNING:
        egen = namn not in ("musen-mille", "grodan-gurra")
        i_raden(c, namn, None if egen else rörelse, hopp=None if egen else hopp and namn == "musen-mille",
                fokus=namn == "musen-mille")


def rgb(c):
    return c.convert("RGB")


# 14f Danspaus!: klipp till discot, musen är redan ute ur bilen och dansar med armarna upp
c = disco()
dansare(c, "musen-mille", "upp")
frames["14f"] = rgb(c)
# 14g (Danspaus!): grodan hoppar in bredvid henne (samma bild utan klipp, musen tar ett steg åt sidan)
DUO_H = 0.5 * H
c = disco()
dansare(c, "musen-mille", "upp", x=W / 2 - 210, h=DUO_H, fokus=False)
dansare(c, "grodan-gurra", "upp", x=W / 2 + 210, h=DUO_H, lyft=120)
arrow(c, [(W - 30, SOLO_FOT - 120), (W / 2 + 470, SOLO_FOT - DUO_H - 200), (W / 2 + 300, SOLO_FOT - DUO_H - 150)])
frames["14g"] = rgb(c)
# 14i–k Solobilderna: ett djur i taget, ensamt mitt i bild, stort
c = disco()
dansare(c, "kaninen-kanel")  # Hoppa, hoppa!
frames["14i"] = rgb(c)
c = disco()
dansare(c, "humlan-humle")  # Snurra runt! (surr)
frames["14j"] = rgb(c)
c = disco()
dansare(c, "dinon-disa")  # Klappa, klappa! (stamp, dunk)
frames["14k"] = rgb(c)
# 14l Alla dansar – rosa dans!: alla fem i V:et, armarna upp
c = disco()
alla(c, "upp", hopp=True)
frames["14l"] = rgb(c)
# 14m Rosa dans! upprepas: musen och grodan gungar med händerna på hjärtat
c = disco()
alla(c, "hjärta")
frames["14m"] = rgb(c)

# 15a–c Sista refrängen: en snabb solobild per sak, och småbilden poppar upp i bågen. 15d–e alla fem igen.
c = disco(1, [0])  # Blommor – rosa!: humlan bland blommorna
for bx, rot in ((W / 2 - 290, -8), (W / 2 + 290, 6)):
    place(c, BLOMMA, bx, SOLO_FOT, 200, rot=rot)
dansare(c, "humlan-humle")
frames["15a"] = rgb(c)
c = disco(2, [1])  # Ballong – rosa!: kaninen, ballongen svävar bredvid
place(c, BALLONG, W / 2 + 290, SOLO_FOT - 200, 300, rot=4)
dansare(c, "kaninen-kanel")
frames["15b"] = rgb(c)
c = disco(5, [2, 3, 4])  # Nos och glass och bil – rosa!: musen
dansare(c, "musen-mille", "upp", hopp=True)
frames["15c"] = rgb(c)
c = disco(5)  # Rosa är min favoritfärg: alla fem
alla(c, "hjärta")
frames["15d"] = rgb(c)
c = disco(5)  # rosa som ett glassberg: samma bild utan klipp
alla(c, "glasstopp")
frames["15e"] = rgb(c)

# 16 Hej då: kvar i discot. Musen har satt sig i bilen och kör iväg åt höger och vinkar, under bågen med småbilderna.
# De andra har redan dansat ut ur bild.
c = disco(5)
bil = bilen(vit=True, arm_r=VINK, spöke=[("r", VINK_SPÖKE)])
bb = bil.getbbox()
skugga(c, 820, 0.9 * H - 6, (bb[2] - bb[0]) * 0.5 * H / (bb[3] - bb[1]) * 0.85, False)
place(c, bil, 820, 0.9 * H, 0.5 * H)
arrow(c, [(1080, 0.9 * H - 20), (1300, 0.9 * H - 20)])
frames["16"] = rgb(c)

# 17 Zoom ut till papperet
c = paper()
liten = frames["16"].resize((W // 2, H // 2), Image.LANCZOS)
c.paste(liten, (W // 4, H // 4))
for sx, sy in ((-1, -1), (1, -1), (-1, 1), (1, 1)):
    arrow(c, [(W / 2 + sx * 620, H / 2 + sy * 340), (W / 2 + sx * 400, H / 2 + sy * 220)])
frames["17"] = c

# 18 Outro: logotypen, musen och grodan tittar fram och vinkar
c = paper()
color_text(c, H * 0.42, "lilla kritan", 110)
place(c, musen(arm_r=VINK), 470, 900, 330)
place(c, figur("grodan-gurra", "happy", arm_l=-140), 900, 900, 330)
frames["18"] = c

out = HÄR / "frames"
out.mkdir(exist_ok=True)
for f in out.glob("*.jpg"):
    f.unlink()
for k, im in frames.items():
    papperskorn(im).resize((960, 536), Image.LANCZOS).save(out / f"{k}.jpg", quality=86)

# --- Sidan ---------------------------------------------------------------
REFRÄNG_TEXT = [
    ("Refrängdansen, likadan alla tre gångerna (se sang.md). Rad 1–2 ”Rosa! (Rosa!) Rosa! (Rosa!)”: dansbild, vägen står still. Musen sträcker båda armarna rakt upp och bilen hoppar i takt, skuggan krymper. Samma på ekot.", "6 dansbild"),
    ("Rad 3 ”Rosa är min favoritfärg!”: närbild, händerna på hjärtat, hon gungar åt sidorna.", "3 närbild musen"),
    ("Rad 4–5 ”Rosa! (Rosa!) Rosa! (Rosa!)”: samma dansbild som rad 1–2, armarna upp och bilen hoppar.", "6 dansbild"),
    ("Rad 6 ”Rosa som ett glassberg!”: närbild, händerna ihop över huvudet som en glasstopp.", "3 närbild musen"),
    ("Rad 7 ”Brum, brum, tut, tut”: dansbild, på ”brum, brum” styr hon i luften (knytnävarna rullar framför bröstet), på ”tut, tut” två små knytnävspumpar uppåt. Tutet är bilens.", "6 dansbild"),
    ("Rad 8 ”vad är rosa? Titta ut!”: närbild, handen över ögonen, hon tittar åt ena hållet och sedan åt det andra.", "3 närbild musen"),
]
# Avsnittstid = sångtid i rader.txt + 11 s. Rad 1–2 är en rad i rader.txt.
REFRÄNG_TID = {"05": ["0:58.5", "1:01.5", "1:03.2", "1:06.0", "1:07.4", "1:09.8", "1:11.6"],
               "09": ["1:45.8", "1:48.6", "1:50.9", "1:53.2", "1:55.1", "1:57.4", "1:59.0"]}


def refräng(n):
    t = REFRÄNG_TID[n]
    return [(n + "abcdef"[i], f"{t[i]}–{t[i + 1]}", "Refräng", "", vad, kamera) for i, (vad, kamera) in enumerate(REFRÄNG_TEXT)]


B = "B · Glasskiosken"
# (id, tid, scen, repliker och ljud, vad som händer, kamera)
SHOTS = [
    ("01", "0:00–0:11", "Intro", "♪ Jingel: Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Samma intro som 003 och 004 med nytt nummer och ny titel: Avsnitt 5 · Rosa bilen. Rosa vägg och en liten rosa bil på kortet.", "fast"),
    ("02", "0:11.0–0:17.3", "Kritan ritar", "(skrrrrt)", "Kritan ritar en rosa rundad form, långsamt. Bara formen, inga hjul.", "1 papper"),
    ("02a", "0:17.3–0:20.7", "Kritan ritar", "(skrrt, skrrt)", "”vad kan det vara?”: kritan ritar ett svart hjul och ett hjul till, ledtrådarna kommer medan det sjungs.", "1 papper"),
    ("02b", "0:20.7–0:23.2", "Kritan ritar", "(skrrt)", "”Vad kan det vara?” och tagningens korta paus (ca 1 s): kritan ritar en rund framlykta, den sista ledtråden.", "1 papper"),
    ("02c", "0:23.2–0:28.4", "Kritan ritar", "", "”En bil! En rosa bil! Brum-brum, nu kör vi!”: bilen studsar en gång och kritan lyfter.", "1 papper"),
    ("03", "0:28.4–0:30.4", "A · Vägen", "(swoosh)", "Zoom in i den ritade bilen: den blir musens bil på vägen. Musen sitter redan i bilen. Mellanspelet börjar (groove).", "zoom in"),
    ("03a", "0:30.4–0:32.8", "A · Vägen", "MUSEN: Pip pip!", "Musen vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Brum-brum, nu kör vi!”: det sjöngs nyss.", "3 närbild musen"),
    ("03b", "0:32.8–0:34.5", "A · Vägen", "", "Hon lägger tassarna på bilens kant och tittar framåt.", "3 närbild musen"),
    ("04", "0:34.5–0:58.5", "A · Vägen", "", "Mellanspelet och vers 1 (från 0:49.7). Vägen glider, hjulen snurrar och bilen gungar i takt. En fjäril fladdrar förbi högt uppe, den enda rörelsen i bakgrunden. Leadstämman nynnar utan ord 0:40.8–0:48.8. Bilden är 24 s lång: se kontrollen i storyboard.md.", "2 körscen"),
    *refräng("05"),
    ("06", "1:11.6–1:13.9", "A · Vägen", "", "”Vad är rosa?”: busken med rosa blommor glider in från höger. Musen tittar dit.", "2 körscen"),
    ("06a", "1:13.9–1:17.4", "A · Vägen", "", "”Titta där!”: vägen stannar mitt för busken och musen pekar på blommorna.", "2 körscen"),
    ("06b", "1:17.4–1:19.1", "A · Vägen", "", "”sniff, sniff, mmm”: närbild, doften slingrar från blommorna fram till musens nos. Hon sniffar med nosen uppåt, lutar sig lite bakåt, blundar och njuter. På ”mmm” ler hon.", "3 närbild musen"),
    ("07", "1:19.1–1:23.0", "A · Vägen", "", "”Vad är rosa?”: vägen glider igen, busken åker ut till vänster och en rosa ballong svävar in högt uppe i mjuka vågor.", "2 körscen"),
    ("07a", "1:23.0–1:26.5", "A · Vägen", "", "”Titta där!”: vägen stannar och musen pekar upp på ballongen.", "2 körscen"),
    ("07b", "1:26.5–1:28.7", "A · Vägen", "", "”upp, upp, upp”: närbild, ballongen har stigit och syns snett ovanför henne. Musen lutar huvudet bakåt, tittar upp och pekar rakt upp, en gång per ”upp”.", "3 närbild musen"),
    ("08", "1:28.7–1:35.4", "A · Vägen", "", "”Vad mer är rosa? Kan du se?”: frågan till tittaren. Musen tittar ut mot tittaren med frågande min. Raden sjungs långsamt (6,7 s).", "3 närbild musen"),
    ("08a", "1:35.4–1:38.5", "A · Vägen", "", "Pausen i tagningen, ca 3 s. Ledtråd: musen blir lite skelögd och tittar på sin egen nos. Inget annat rör sig.", "3 närbild musen"),
    ("08b", "1:38.5–1:43.8", "A · Vägen", "", "”Nosen är rosa – och öronen med!”: musen sätter fingret på nosen och ler.", "3 närbild musen"),
    ("08c", "1:43.8–1:45.8", "A · Vägen", "", "”Vick, vick, vick!”: hon vickar på öronen, en gång per ”vick”, så att det rosa inuti syns.", "3 närbild musen"),
    *refräng("09"),
    ("10", "1:59.0–1:59.6", "Kritsvep", "(skrrrrt)", "Kritsvep i kioskens rosa (#F06EAA), från vänster till höger, precis innan ”Vad är rosa?”.", "kritsvep"),
    ("11", "1:59.6–2:01.8", B, "", "”Vad är rosa?”: grodan står i kioskfönstret. Bilen kör in från vänster.", "4 helbild"),
    ("11a", "2:01.8–2:05.3", B, "", "”Titta där! Glassen är rosa”: bilen stannar vid kiosken och musen pekar på den stora glasstruten ovanför. Kameran glider långsamt upp efter pekfingret tills den rosa kulan på struten syns hel (platsens enda panorering), och tillbaka till helbilden i 11c.", "4 helbild"),
    ("11b", "2:05.3–2:07.0", B, "", "”mums, mums, mums”: närbild, musen slickar sig om munnen.", "3 närbild musen"),
    ("11d", "2:07.0–2:09.0", B, "MUSEN: Hej, grodan! · GRODAN: Kväk! Vilken glass vill du ha?", "Kiosklucka i sången, ca 6,5 s, lugn musik under. Närbild grodan med tre glassar på disken: en rosa (närmast musen), en grön och en gul. Musen hälsar utanför bild. Färgövningen: barnet ser tre färger och musen väljer.", "5 närbild grodan"),
    ("11e", "2:09.0–2:10.6", B, "MUSEN: Rosa, tack!", "Musen pekar på den rosa glassen.", "4 helbild"),
    ("12", "2:10.6–2:12.2", B, "GRODAN: Varsågod! · MUSEN: Tack! (pling)", "Grodan räcker fram den rosa glassen över disken med sin närmaste hand och musen tar emot den. Den gröna och den gula står kvar.", "4 helbild"),
    ("12a", "2:12.2–2:13.6", B, "(boing!)", "Musen hoppar ur bilen med glassen i tassen och landar på golvet vid disken, bredvid grodan i fönstret. Bilen står kvar tom bakom henne. Samma helbild utan klipp.", "4 helbild"),
    ("13a", "2:13.6–2:15.6", B, "(plupp!)", "Vers 2. ”Oj, oj, plupp – där föll den ner!”: tvåbild, ett närmare utsnitt av kioskens helbild med musen hel på golvet och grodan i fönstret, disken mellan dem. Musen slickar, kulan ramlar av struten och landar i golvet framför henne som en rosa kritklick. Hon håller kvar den tomma struten och tittar ner. Kulan ligger kvar.", "4 tvåbild (helbilden närmare)"),
    ("13d", "2:15.6–2:17.9", B, "(pling)", "”Grodan hjälper, kväk, kväk, kväk!”: samma tvåbild. Grodan sträcker sig över disken och sätter två nya rosa kulor på struten: glassberget. Musen blir förvånad och glad. Inget talat ”Oj!” eller ”Ingen fara!”: det sjungs.", "4 tvåbild (helbilden närmare)"),
    ("14c", "2:17.9–2:20.2", B, "", "”Två rosa kulor – ett glassberg!”: samma tvåbild, musen håller stolt upp glassberget.", "4 tvåbild (helbilden närmare)"),
    ("14d", "2:20.2–2:21.9", B, "", "”Mums, mums, mums”: samma tvåbild, musen slickar på glassberget, en slick per ”mums”, grodan hoppar och jublar.", "4 tvåbild (helbilden närmare)"),
    ("14e", "2:21.9–2:23.3", B, "", "”– hurra, hurra!”: samma tvåbild. Musen stoppar sista biten av struten i munnen, och på ”hurra” sträcker hon armarna upp med grodan. Glassen är slut, så händerna är fria till dansen.", "4 tvåbild (helbilden närmare)"),
    ("14f", "2:23.3–2:24.7", "Danspaus · discot", "(boing!)", "”Danspaus!”: klipp till discot, en enfärgad ljusrosa bakgrund med en rosa discokula som hänger i mitten och snurrar sakta och kastar ljusprickar på väggen. Musen är redan ute ur bilen och dansar stor mitt i bild med armarna upp, med ett litet stjärnregn runt sig.", "6 dansbild (discot)"),
    ("14g", "2:24.7–2:26.0", "Danspaus · discot", "(boing!)", "”(Danspaus!)”, ekot: grodan hoppar in och landar bredvid henne, båda lite mindre (samma bild utan klipp).", "6 dansbild (discot)"),
    ("14i", "2:26.0–2:27.9", "Danspaus · discot", "", "”Hoppa, hoppa!”: solobild, kaninen Kanel ensam och stor mitt i bild (58 % av bildhöjden), hoppar, stjärnregn runt honom.", "6 dansbild (discot)"),
    ("14j", "2:27.9–2:31.0", "Danspaus · discot", "(surr)", "”Snurra runt!”: solobild, humlan Humle snurrar och surrar, stjärnregn runt henne.", "6 dansbild (discot)"),
    ("14k", "2:31.0–2:32.8", "Danspaus · discot", "(dunk, dunk)", "”Klappa, klappa!”: solobild, dinon Disa stampar och klappar (dunk, dunk), stjärnregn runt henne.", "6 dansbild (discot)"),
    ("14l", "2:32.8–2:36.0", "Danspaus · discot", "", "”Alla dansar – rosa dans!”: alla fem i ett svagt V, musen i mitten lite större och ett steg fram, kaninen och grodan bredvid, humlan och dinon ytterst. Musen och grodan har armarna upp, statisterna gör sin rörelse. Stjärnregnet runt musen.", "6 dansbild (discot)"),
    ("14m", "2:36.0–2:41.2", "Danspaus · discot", "", "”Rosa dans!” upprepas, en kort groove före sista refrängen: samma rad, musen och grodan gungar med händerna på hjärtat.", "6 dansbild (discot)"),
    ("15a", "2:41.2–2:44.9", "Danspaus · discot", "(pop)", "Sista refrängen i discot, en snabb solobild per sak. ”Blommor – rosa!”: humlan stor bland två rosa blommor, och busken poppar upp som första småbild i bågen i övre tredjedelen.", "6 dansbild (discot)"),
    ("15b", "2:44.9–2:47.2", "Danspaus · discot", "(pop)", "”Ballong – rosa!”: solobild, kaninen hoppar och den rosa ballongen svävar bredvid. Ballongen poppar upp på väggen.", "6 dansbild (discot)"),
    ("15c", "2:47.2–2:52.0", "Danspaus · discot", "(pop, pop, pop)", "”Nos och glass och bil – rosa!”: solobild, musen hoppar med armarna upp. Nosen, glassen och bilen poppar upp i bågen, en per ord.", "6 dansbild (discot)"),
    ("15d", "2:52.0–2:55.4", "Danspaus · discot", "", "”Rosa är min favoritfärg”: alla fem igen i raden, musen och grodan med händerna på hjärtat, statisterna gör sin rörelse.", "6 dansbild (discot)"),
    ("15e", "2:55.4–2:57.3", "Danspaus · discot", "", "”rosa som ett glassberg”: samma bild utan klipp, musen och grodan sträcker armarna rakt upp som en glasstopp.", "6 dansbild (discot)"),
    ("16", "2:57.3–3:05.1", "Danspaus · discot", "", "”Hej då, hej då – tut, tut!”: kvar i discot, under bågen med småbilderna. Musen sitter i sin bil och kör iväg åt höger och vinkar; tutet på ”tut, tut” är bilens. De andra har dansat ut ur bild. Outrot i sången (20 s) kortas till ca 4 s här, medan bilen kör ut.", "6 dansbild (discot)"),
    ("17", "3:05.1–3:07.1", "Avslutning", "(swoosh)", "Zoom ut: discot krymper till en teckning på papperet: musen i den rosa bilen på rosa, med småbilderna i en båge ovanför.", "zoom ut"),
    ("18", "3:07.1–3:17.1", "Outro", "♪ Outrojingeln (ingen röst)", "Det vanliga outrot. Musen och grodan tittar fram vid kanten och vinkar.", "fast"),
]
assert sorted(s[0] for s in SHOTS) == sorted(frames), "en bild per rad i SHOTS"

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", "A · Vägen": "#A6D86B", "Refräng": "#8cc35f", "Kritsvep": "#F06EAA",
        B: "#F06EAA", "Danspaus · discot": "#F9D6E4", "Avslutning": "#c9bfae", "Outro": "#c9bfae"}


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + float(s)


# Sångraderna läses ur sang.md, så att storyboarden följer med när texten ändras.
# sang.md har inga bildnummer, så här står vilken bild varje rad i ett avsnitt hör till (en per rad, pauser räknas).
# En rad som hör till flera bilder står på den första; de andra får "forts.". Fler rader än i listan → sista bilden.
REF = lambda n: [n + b for b in "aabccdef"]  # refrängens åtta rader på sex klipp
KARTA = {
    "Intro – kritan ritar": ["02", "02a", "02b", "02b", "02c", "02c"],
    "Vers 1": ["04"],
    "Refräng": REF("05"),
    "Rosa sak 1 – blommorna": ["06", "06a", "06a", "06b"],
    "Rosa sak 2 – ballongen": ["07", "07a", "07a", "07b"],
    "Frågan till tittaren": ["08", "08", "08a", "08b", "08c"],
    "Refräng #2": REF("09"),
    "Rosa sak 3 – glassen (glasskiosken)": ["11", "11a", "11a", "11b", ["11d", "11e", "12", "12a"]],
    "Vers 2": ["13a", "13d", "14c", ["14d", "14e"]],
    "Danspaus": [["14f", "14g"], "14i", "14j", "14k", "14l", "14m"],
    "Sista refrängen – sammanfattning": ["15a", "15b", "15c", "15d", "15e", "16"],
}

IDS = [s[0] for s in SHOTS]
SÅNG = {i: [] for i in IDS}


def läs_sång():
    avsnitt, namn = {}, None
    for rad in (HÄR.parent / "sang.md").read_text(encoding="utf-8").splitlines():
        rad = rad.strip()
        if rad.startswith("---"):
            break  # rörelserna efter strecket sjungs inte
        if rad.startswith("## "):
            namn = rad[3:].strip()
            if namn in avsnitt:
                namn += " #2"
            avsnitt[namn] = []
        elif namn and rad and not rad.startswith(("**", "-", "|")) and not (rad.startswith("*") and not rad.startswith("*(")):
            avsnitt[namn].append(rad)
    for namn, rader in list(avsnitt.items()):
        if not rader and namn.endswith(" #2"):  # "## Refräng" utan text = samma refräng igen
            avsnitt[namn] = avsnitt[namn[:-3]]
    return avsnitt


for namn, rader in läs_sång().items():
    if namn.startswith("Refrängdansen"):
        continue  # dansens beskrivning, sjungs inte (dansen finns i REFRÄNG_TEXT och RADER)
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
        if typ == "rubrik":
            ut.append(f'<div class="sh">♪ {t}</div>')
        elif typ == "sjungs":
            ut.append(f'<div class="sung">{t}</div>')
        else:
            ut.append(f'<div class="pause">{t}</div>')
    return f'<div class="song">{"".join(ut)}</div>' if ut else ""


def repliker(rad):
    """Bara det som sägs; sångens delar (♪) visas för sig ur sang.md."""
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

ph = ("<li><b>Platshållare</b> (platta former tills bilderna finns, kör om bygg.py sedan): "
      + ", ".join(f"<code>{html.escape(p)}</code>" for p in PLATSHÅLLARE) + ".</li>") if PLATSHÅLLARE else \
     "<li><b>Platshållare:</b> inga, alla saker är riktiga bilder ur <code>assets/</code>.</li>"

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rosa bilen: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#E0508F;
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
.song {{ border-left:3px solid #E0508F; padding-left:10px; display:grid; gap:1px }}
.sh {{ font:500 11px var(--mono); color:var(--muted); margin-top:4px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
.pause {{ justify-self:start; font:500 11px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:1px 8px; margin:2px 0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
</style></head><body><div class="wrap">
<h1>Rosa bilen <span>storyboard</span></h1>
<p class="lede">Avsnitt 005. Bilderna är byggda av de färdiga utklippen och bakgrunderna i <code>assets/</code>, med ansiktena ritade i kod (musens humör ur <code>verktyg/ansikten.py</code>). Pilarna och strecken visar rörelsen. Tiderna följer sången (rader.txt, avsnittstid = sångtid + 11 s).</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>2 + 3</b><span>figurer + statister</span></div><div><b>1</b><span>körscen</span></div><div><b>6</b><span>kamerainställningar (max 6)</span></div><div><b>~{slut}</b><span>längd</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Ekot sjungs av kören. Varje rosa sak har en rörelse i bild i stället för en replik: sniff (06a), upp (07a), vick (08b), mums (11, 14).</li>
<li><b>En bild per handling</b>, så att historien går att läsa ur bilderna, och högst ett klipp per sjungen rad.</li>
<li><b>Refrängen är en dans</b> (05a–h, 09a–h och sista refrängen 15a–e), likadan alla tre gångerna: en rörelse per sjungen rad ur sang.md, och klippen växlar dansbild och närbild i fast ordning. Dansbilden (kamera 6): bilen i mitten och större, vägen och väggen står still, bilen hoppar i takt och skuggan krymper. 05 och 09 är exakt samma bilder; 05a = 05e och 05b = 05d. Klippen är ca 2,3 s (en takt i 104 bpm).</li>
<li><b>Bilen</b> är riggad i lager: kaross med säte, musen, kanten, musens armar och hjulen. Musen syns från midjan och upp, tassarna vilar på bilens kant när hon kör (ingen ratt), och glassen hålls i tassen. Musens armar är korta raka pinnar ritade i kod (<code>verktyg/rita-lemmar-mus.py</code>); armar som rör vid något framför henne (kanten, hjärtat, nosen, ögonen, munnen) ligger framför bilens kant. Halvgenomskinliga armar och öron visar rörelsen (vinka, vicka).</li>
<li><b>Glasskiosken</b> är spegelvänd och lite inzoomad i storyboarden: kiosken står till höger så att bilen fortsätter åt höger som på vägen, och musen och grodan når varandra över disken. Bilen har en tjockare vit kant mot den rosa väggen.</li>
<li><b>Vers 2 och sista refrängen</b> (14a–d, 15a–e) har en bild per rad. Småbilderna på väggen är busken, ballongen, musens huvud (nosen), glassen och bilen, i samma ordning som sången.</li>
{ph}
<li><b>Sångraderna</b> under varje bild läses ur sang.md (♪ sjungs, gul lapp = paus eller lucka). Fetstilt = repliker.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")


# Tabellen i storyboard.md skrivs om mellan markeringarna, med sångraderna ur sang.md
def sång_md(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        if typ == "rubrik":
            ut.append(f"**{text}**")
        elif typ == "sjungs":
            ut.append(f"♪ *{text}*")
        else:
            ut.append(f"⏸ {text}")
    return "<br>".join(ut).replace("|", "/")


md = HÄR.parent / "storyboard.md"
tabell = ["| # | Tid (prel.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |", "|---|---|---|---|---|---|"]
for sid, tid, sc, rad, vad, kamera in SHOTS:
    tabell.append(f"| {sid} | {tid} | {sc} · {kamera} | {vad} | {repliker(rad)} | {sång_md(sid)} |".replace("\n", " "))
text = md.read_text(encoding="utf-8")
start, slutm = "<!-- tabell: skrivs av storyboard/bygg.py -->", "<!-- /tabell -->"
if start in text:
    före, _, rest = text.partition(start)
    _, _, efter = rest.partition(slutm)
    md.write_text(före + start + "\n" + "\n".join(tabell) + "\n" + slutm + efter, encoding="utf-8")
print(f"{len(frames)} bilder, index.html klar" + (f", platshållare: {', '.join(PLATSHÅLLARE)}" if PLATSHÅLLARE else ", inga platshållare"))
