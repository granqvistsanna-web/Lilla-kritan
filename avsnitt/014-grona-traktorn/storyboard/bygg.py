"""Bygger storyboarden för avsnitt 014 (Gröna sången) av utklippen och bakgrunderna. Kopierad från 007:s bygg.py och bytt:
lastbilen → gröna traktorn (traktor-gron-oppen med tak), Björnen Bulle → Leoparden Lova (grön jacka i kod), ängen med Ludde →
bondgården med Pip och Gurra på en träbänk vid ladan (Lova kliver ur traktorn), kanelbullen → ärtskidan ur ärtplantan, kotten →
grodan, trafikljuset (rött/grönt i kod), Kolasåsresan → Ärtresan (den jättestora öppna skidan), discot i mint med en grön kula.

Kör: python3 -I bygg.py   (från den här mappen; ~/.claude/skills/ai-video/.venv/bin/python går också)
Skriver frames/*.jpg och index.html. Kostar inga krediter. ../storyboard.md skrivs inte över (den har ingen tabellmarkör).

TIDERNA kommer ur ../rader.txt (sang.m4a, tagning 1, 3:26.4): bildernas starttider i sångtid står i SÅNGTID nedan.
Grovklippet (../film/satt-ihop.sh) läser bara allt före REF-raden, så tiderna står först och bilderna byggs efter den.
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
random.seed(7)
PLATSHÅLLARE = []
DJUROGON = [(413, 401), (604, 398)]


# --- Tiderna ---------------------------------------------------------------------------------------------------
BPM = 85.0
TAKT = 4 * 60 / BPM   # 2,82 s
INTRO = 11.0          # avsnittstid = sångtid + 11 s (introt före)
# Bildens start i sångtid (sekunder) ur ../rader.txt (tagning 1, sang.m4a, "Vad är brunt_ (2).m4a", 3:26.4).
# Alla bilder utom introt är mätta: bildernas tider i ../storyboard.md är de här plus 11 s.
SÅNGTID = {
    "02": 0.0, "02a": 5.2, "02b": 10.3, "02c": 15.7, "03": 21.0, "03a": 24.5, "03b": 27.8, "04": 33.2,
    "05a": 39.1, "05b": 40.8, "05c": 41.6, "05d": 43.6, "05e": 45.4, "05f": 47.3, "05g": 50.2, "05h": 51.8,
    "06": 53.5, "07a": 61.4, "07b": 64.4, "07c": 66.2, "08a": 70.3, "08b": 79.5, "08c": 82.3,
    "09a": 84.0, "09b": 85.7, "09c": 87.4, "09d": 88.7, "09e": 90.7, "09f": 92.5, "09g": 94.6,
    "10": 97.0, "11a": 100.3, "11b": 101.7, "11b2": 105.9, "11c": 110.0, "11d": 114.0, "11e": 118.0, "11f": 122.0,
    "13a": 126.0, "13b": 129.9, "13b2": 132.8, "13c": 136.2, "13d": 138.7,
    "14a": 144.2, "14a2": 145.9, "14b": 147.9, "14c": 150.0, "14d": 152.1, "14e": 153.7, "14f": 155.1, "14g": 156.2, "14h": 159.7,
    "15a": 161.5, "15b": 163.4, "15c": 164.9, "15d": 166.4, "15e": 167.7,
    "16a": 170.6, "16b": 178.5, "16c": 181.1, "16d": 185.0, "17": 189.0, "17b": 203.0,
}
SÅNG_SLUT = 206.4
INSATT = {}   # sången klipps aldrig: avsnittstid = sångtid + 11 s hela vägen

REFRÄNG_TEXT = [   # Ärtresan (README): fem bilder på de åtta sjungna raderna, likadana varje gång
    ("a", "(pop)", "”Grönt! (Grönt!)”: vägen blir en brun åker med fåror. Lova pumpar armarna, traktorn skumpar fram över jorden, en grön grodd växer upp per ”Grönt!” och ekot.", "2 körscen (vägen)"),
    ("b", "(pop)", "”Grönt! (Grönt!)”: två groddar till, fyra på åkern.", "2 körscen (vägen)"),
    ("c", "(pling)", "”Grönt betyder kör!”: ett stort trafikljus poppar upp framför traktorn och lyser grönt, traktorn far iväg, hela åkern grönskar med fler och större groddar.", "2 körscen (vägen)"),
    ("d", "", "”Grönt! (Grönt!)”: klipp till vägen. Traktorn kör åt höger, ärtorna med små ansikten hoppar in efter den en i taget.", "Ärtresan: i skidan, helbild"),
    ("e", "", "”Grönt! (Grönt!)”: nästa ärta hoppar in, alla tre på sista ekot.", "Ärtresan: i skidan, helbild"),
    ("f", "(glitter)", "”Grön som en liten ärta!”: klipp, närbild. En ärta studsar upp och sätter sig på traktorns tak, Lova tittar upp och fnissar, små gröna glimtar.", "Ärtresan: närbild"),
    ("g", "(putt, putt) · (tut, tut)", "”Putt, putt, tut, tut –”: på vägen. Traktorn kör vidare med en vit puff per putt, tutar på ”tut, tut”, ärtorna hoppar efter som ett litet tåg.", "Ärtresan: helbild"),
    ("h", "(skrrrt)", "”vad är grönt? Titta ut!”: kameran drar ut, skidan stänger sig mjukt, Lova spanar åt båda hållen med tassen över ögonen, ett kritsvep tar oss tillbaka till vägen.", "Ärtresan: utzoomning → kritsvep"),
]


def refräng(n, rader="abcdefgh"):
    return [(n + k, 1, "Refräng", ljud, vad, kamera) for k, ljud, vad, kamera in REFRÄNG_TEXT if k in rader]


A_ = "A · Vägen"
B = "B · Bondgården"
D_ = "Danspaus · discot"
# (id, längd i takter, scen, repliker och ljud, vad som händer, kamera). Alla utom 01 har mätt starttid i SÅNGTID.
SHOTS = [
    ("01", INTRO / TAKT, "Intro", "(titeln syns, ingen röst)", "Samma intro som 003–007 (”Kort i himlen”) med Avsnitt 14 · Gröna sången, titeln i grönt. Renderas i ../intro/ från 007:s; bilden är en platshållare.", "fast"),
    ("02", 1, "Kritan ritar", "(skrrrrt)", "”Kritan ritar …”: den gröna kritan ritar traktorn från sidan: den runda kroppen, sätet och motorhuven med avgasröret.", "1 papper"),
    ("02a", 1, "Kritan ritar", "(skrrt, skrrt)", "”vad kan det vara?”: ett stort hjul bak och ett litet hjul fram, med ljusgrå fälgar.", "1 papper"),
    ("02b", 1, "Kritan ritar", "(skrrt)", "Gissningspausen (ca 5 s, hela ”tick, tack”): den sista ledtråden, hytten, ett tak på två smala stolpar över sätet.", "1 papper"),
    ("02c", 1, "Kritan ritar", "(tut-tut) · (puff)", "”En traktor! En grön traktor! Tut-tut, nu kör vi!”: traktorn skumpar till och puffar, kameran åker in i teckningen.", "1 papper"),
    ("03", 1, A_, "(swoosh) · (putt, putt)", "Instrumentalt: zoom in, den ritade traktorn blir Lovas på vägen; Lova sitter i den i sin gröna jacka. Pella långt bort på himlen.", "zoom in → 2 körscen"),
    ("03a", 1, A_, "(instrumentalt)", "Lova vinkar till tittaren, en vinkning (pratar inte).", "3 närbild Lova"),
    ("03b", 1, A_, "(putt ×3)", "”Leoparden kör sin gröna traktor, putt, putt, putt – på vägen här!”: traktorn skumpar en gång per putt, vita puffar.", "2 körscen"),
    ("04", 1, A_, "", "”Leoparden letar grönt nu, leta med – jag och du!”: Lova tittar sig omkring och pekar på tittaren.", "3 närbild Lova"),
    *refräng("05"),
    ("06", 1, A_, "(hopp ×3)", "”Vad är grönt? … Grodan är grön – hopp, hopp, hopp!”: Gurra hoppar över vägen framför traktorn, tre hopp; traktorn bromsar.", "2 körscen"),
    ("07a", 1, A_, "(gnissel)", "”Och vad är grönt? Titta där!”: trafikljuset glider in och lyser rött (bara i bild); traktorn stannar.", "2 körscen"),
    ("07b", 1, A_, "", "”Vänta, vänta …”: tassen upp, Lova sitter stilla och tittar upp på den röda lampan.", "3 närbild Lova"),
    ("07c", 1, A_, "(pling) · (putt)", "”Pling! Lampan är grön – kör, kör, kör!”: grönt, traktorn kör och Lova pumpar armarna.", "2 körscen"),
    ("08a", 1, A_, "", "”Vad mer är grönt? Kan du se?” och pausen (ca 5 s, tick, tack): Lova tittar ner på jackan, kameran åker in (ledtråden).", "3 närbild Lova"),
    ("08b", 1, A_, "", "”Jackan är grön – och flaggan med!”: pekar på jackan, sedan bakåt på flaggan.", "3 närbild Lova"),
    ("08c", 1, A_, "(zipp ×3)", "”Zipp, zipp, zipp!”: Lova drar upp dragkedjan i tre ryck.", "3 närbild Lova"),
    *refräng("09", "abcdefg"),
    ("10", 1, B, "(skrrrrt) · (putt … tut) · (duns)", "”vad är grönt? Titta ut!” och ”Vad är grönt?”: kritsvep (gult) till bondgården. Traktorn har stannat vid ladan; Pip och Gurra sitter på träbänken framför den röda dörren, ärtplantan växer vid staketet. Lova hoppar lugnt ner ur traktorn och går till bänken; traktorn står kvar i kanten.", "4 helbild"),
    ("11a", 1, B, "", "”Titta där!”: Pip pekar på ärtplantan, kameran glider in mot skidorna.", "4 helbild, inåkning"),
    ("11b", 1, B, "(knäpp)", "”Ärtorna är gröna – en, två, tre!”: Pip plockar en skida från plantan och öppnar den: precis tre ärtor.", "4 tvåbild (Gurra i kanten)"),
    ("11b2", 1, B, "", "”En, en, en … En till var och en!”: Pip pekar på var och en: Lova, sig själv, Gurra.", "4 tvåbild (Gurra i kanten)"),
    ("11c", 1, B, "(fniss)", "Mellanspelet (16 s, instrumentalt), leken del 1: Lovas ärta fastnar på nosen, hon tittar skelögt på den.", "3 närbild Lova"),
    ("11d", 1, B, "(pling ×2)", "Leken del 2: Pip kastar sin ärta till Lova, Lova fångar och kastar tillbaka.", "4 tvåbild"),
    ("11e", 1, B, "", "Leken del 3: Gurra balanserar sin ärta på huvudet, alla skrattar.", "4 tvåbild"),
    ("11f", 1, B, "(swisch)", "Leken del 4: Lova kastar sin ärta högt, högre … alla tittar upp.", "4 tvåbild"),
    ("13a", 1, B, "(boing)", "Vers 2, musiken blir tunn. ”Oj, oj! Ärtan hoppar!”: Lovas ärta hoppar ur tassen och studsar på golvet.", "4 tvåbild"),
    ("13b", 1, B, "(rull ×3)", "”Rull, rull, rull – in under bänken …”: ärtan rullar in under bänken, ett skutt per rull.", "4 lågt utsnitt"),
    ("13b2", 1, B, "", "”En, två – men vi är tre!”: Pip och Gurra håller upp sina två ärtor, Lova har tom tass.", "4 tvåbild"),
    ("13c", 1, B, "(snyft)", "”Leoparden är ledsen – snyft, snyft.”: Lova ledsen, en liten tår.", "3 närbild Lova"),
    ("13d", 1, B, "", "”Vem kan hjälpa? (Vem kan hjälpa?) Tick, tack …”: Lova tittar på tittaren och väntar på svaret.", "3 närbild Lova"),
    ("14a", 1, B, "(pip!)", "Vers 3. ”Kycklingen! (Kycklingen!)”: närbild på Pips ansikte, ögonen stora, tofsen upp.", "5 närbild Pip"),
    ("14a2", 1, B, "(duns)", "”Hoppar ner – oj, hon trillar!”: Pip hoppar ner och trillar mjukt på rumpan.", "4 lågt utsnitt"),
    ("14b", 1, B, "(pick ×3)", "”Upp igen – pick, pick, pick!”: Pip reser sig själv och pickar fram ärtan under bänken.", "4 lågt utsnitt"),
    ("14c", 1, B, "", "”Här är ärtan – tack, tack, tack!”: Pip ger ärtan till Lova, Lova vinkar tack.", "4 tvåbild"),
    ("14d", 1, B, "", "”En ärta var – till alla tre!”: alla tre håller upp sin ärta.", "4 tvåbild (Gurra i kanten)"),
    ("14e", 1, B, "(mums)", "”Mums, mums, mums”: alla tre äter.", "4 tvåbild"),
    ("14f", 1, B, "", "”– hurra!”: armarna upp.", "4 tvåbild"),
    ("14g", 1, B, "(pling) · (plupp)", "Första ”Grönt! Nu kör vi!”: Pip håller upp den tomma skidan högt, alla tre hejar på bänken, de första nya skidorna poppar ut i valvet.", "4 helbild (ärtvalvet)"),
    ("14h", 1, B, "(plupp ×4)", "Andra ”Grönt! Nu kör vi!”: samma helbild, fler nya skidor poppar ut i valvet tills det är fullt, alla gungar i takt. Rakt klipp till discot.", "4 helbild (ärtvalvet)"),
    ("15a", 1, D_, "", "”Danspaus!”: discot i mint med en grön kula. Ingen traktor i discot: Lova står och dansar på golvet i sin jacka; alla dansar.", "6 dansbild (discot)"),
    ("15b", 1, D_, "", "”Hoppa, hoppa!”: Gurra hoppar.", "6 dansbild (discot)"),
    ("15c", 1, D_, "(pling)", "”Vicka, vicka!”: Pip vickar på slaget (ingen ko).", "6 dansbild (discot)"),
    ("15d", 1, D_, "", "”Flyga runt!”: Fia flyger runt.", "6 dansbild (discot)"),
    ("15e", 1, D_, "", "”Alla dansar – grön dans!”: alla tillsammans.", "6 dansbild (discot)"),
    ("16a", 1, D_, "(pop ×4)", "Sista refrängen. ”Grodan – grön! Lampan – grön! Jacka, ärtor, traktor – grönt!”: saken på ordet stor mitt i bild på en vit kritskiva, och den flyger upp i raden överst: grodan, lampan, ärtorna, traktorn.", "6 dansbild (discot)"),
    ("16b", 1, D_, "", "”Grönt, grönt, grönt … Grönt betyder kör,”: refrängdansen med alla, Lova i traktorn i mitten.", "6 dansbild (discot)"),
    ("16c", 1, D_, "(glitter)", "”grön som en liten ärta!”: ärtbubblan, Lova ritar cirkeln.", "6 dansbild (discot)"),
    ("16d", 1, D_, "(putt, putt)", "”Hej då, hej då – putt, putt!” och outrots första del: Lova står i mitten och vinkar, Pip och Gurra vinkar bredvid.", "6 dansbild (discot)"),
    ("17", 1, "Avslutning", "(skrrrrt) · (putt, putt) · (plupp ×4)", "Outrot: kritsvep (brunt) från discot till åkern ur refrängen. Lova kör traktorn över den bruna åkern och vinkar, ärtplantor växer upp i fårorna bakom henne i takt, Pip och Gurra dansar i åkerkanten.", "1 helbild (åkern)"),
    ("17b", (SÅNG_SLUT - SÅNGTID["17b"]) / TAKT, "Avslutning", "(swoosh)", "Kritirisen sluter sig runt Lova i traktorn, håller, stängs, en stjärna glimtar, svart.", "kritiris"),
]
FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", A_: "#A8DCF2", "Refräng": "#3FA34D", B: "#F6C21C", D_: "#BFE8D2", "Avslutning": "#c9bfae"}


def mmss(t):
    return f"{int(t // 60)}:{t % 60:04.1f}"


def tider():
    """Avsnittstid (start, slut, mätt) för varje bild: SÅNGTID där den finns, annars föregående start + takter."""
    ut, t, extra = [], 0.0, 0.0
    for sid, takter, *_ in SHOTS:
        extra += INSATT.get(sid, 0)
        mätt = sid in SÅNGTID
        if mätt:
            t = INTRO + extra + SÅNGTID[sid]
        ut.append([t, t + takter * TAKT, mätt])
        t += takter * TAKT
    for a, b in zip(ut, ut[1:]):
        a[1] = b[0]
    return ut


TID = {s[0]: (f"{'' if m else '≈'}{mmss(a)}–{mmss(b)}") for s, (a, b, m) in zip(SHOTS, tider())}
TID["01"] = "0:00.0–0:11.0"
SLUT = tider()[-1][1]

REF = lambda n: [n + b for b in "abcdefgh"]   # grovklippet läser bara det som står före den här raden


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



def ph(col):
    """Platshållare: en rund platta i rätt färg (används bara om en bild saknas i assets/)."""
    def rita():
        im, _ = tom()
        m, d = ritmask(im)
        d.ellipse((200, 300, 824, 820), fill=255)
        kritfyll(im, m, col)
        return vit_kant(im, 13)
    return rita


_plåt = {}
MUS = runpy.run_path(str(ROT / "verktyg" / "rita-lemmar-mus.py"))  # musen Mille (statist) med de ritade lemmarna
rita_ansikte = MUS["ansikten"].rita
MUS["ansikten"].KRITA = KRITA
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


ARM_LÄNGD = {}  # Bulles och Luddes armar ur riggen, oförlängda
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
def figur(namn, mood="glad", blick=(0, 0), arm_r=0, arm_l=0, peka_r=None, peka_l=None, håll=None, ben=True, lager="allt", nick=0):
    """En figur ur riggen med ansiktet ritat. arm_* = vinkel (grader moturs), peka_* = punkt armen pekar mot.
    håll = {"r": (bild, höjd)}: en sak i den handen. lager: allt, kropp (utan armar) eller armar (bara armarna).
    nick: ögon och mun så många px lägre (tittar ner). ben="sitter": benen förkortade. Bulle har alltid sin keps."""
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

    if not lager.startswith("arm"):
        if ben:
            for d in ("leg-l", "leg-r"):
                if d in rig["delar"]:
                    im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
                    if ben == "sitter":
                        y = rig["delar"][d]["vridpunkt"][1]
                        im = im.transform(im.size, Image.AFFINE, (1, 0, 0, 0, 2, -y), Image.BICUBIC)
                    c.alpha_composite(im)
        c.alpha_composite(Image.open(mapp / rig["kropp"]).convert("RGBA"))
        ans = ANSIKTE[namn]
        if nick:
            ans = dict(ans, ogon=[(x, y + nick) for x, y in ans["ogon"]], mun=(ans["mun"][0], ans["mun"][1] + nick))
        rita_ansikte(c, mood, (blick[0] / 9, blick[1] / 9), **ans)
        if namn == "leoparden-lova":
            jacka(c)
        if namn == "kycklingen-pip":
            näbb(c, nick)
        if lager == "kropp":
            return c
    for d in ("arm-l", "arm-r"):   # lager "arm-r"/"arm-l": bara den armen
        if lager in ("allt", "armar", d):
            arm(d)
    return c

FIA = Image.open(A / "karaktarer/fjarilen-fia/cut/fia.png").convert("RGBA")


def sätt(c, im, x, fot, k):
    """En figurbild (1024-rutan) med fötterna (512, 833) på (x, fot), skala k."""
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.paste(im, (round(x - 512 * k), round(fot - 833 * k)), im)


def mot(x, y, fx, fot, k):
    """En punkt på bilden i figurens 1024-koordinater (för peka_*), när figuren står med sätt(c, im, fx, fot, k)."""
    return 512 + (x - fx) / k, 833 + (y - fot) / k




# --- 014: figurerna -------------------------------------------------------------------------------------------
ANSIKTE = {
    "leoparden-lova": dict(ogon=DJUROGON, mun=(512, 497), munskala=1.2),     # uppmätt: nosen vid (512, 452)
    "kycklingen-pip": dict(ogon=DJUROGON, mun=(-500, -500)),                 # ingen kodmun: näbben är munnen (näbb())
    "grodan-gurra": dict(ogon=[(337, 262), (686, 260)], ogonskala=1.45, mun=(512, 392), munskala=1.4, munbredd=2.6),
}
RIGG = {"leoparden-lova": "leoparden-lova-rigg-lemmar.json"}
SPETS = {"grodan-gurra": {"arm-r": (895, 655), "arm-l": (110, 660)}}
GRÖN_T = (63, 163, 77)       # #3FA34D, traktorn
GRÖN_J = (84, 178, 92)       # Lovas jacka, en ton ljusare än traktorn
ÄRT_G = (140, 203, 78)       # #8CCB4E, ärtorna
HIMMEL = (168, 220, 242)     # #A8DCF2, vägens vägg omfärgad
UPP_R, UPP_L = (1500, -700), (-480, -700)
FRAM, VINKA, MAGE = (3000, 450), (1500, -500), (512, 660)
ÖGON_R = (600, 380)          # tassen som skärm över ögonen


def jacka(c):
    """Lovas gröna jacka i kod: kroppen nedanför halsen (y 560) i grönt, en mörkare dragkedja mitt fram och en liten krage."""
    kropp = c.getchannel("A").point(lambda v: 255 if v > 200 else 0).filter(ImageFilter.MinFilter(9))
    m = Image.new("L", c.size)
    ImageDraw.Draw(m).polygon([(0, 575), (805, 575), (805, 760), (760, 780), (665, 790), (665, 1024), (0, 1024)], fill=255)   # kroppen under halsen, inte svansen (svansen är sandgul)
    kritfyll(c, ImageChops.multiply(kropp, m), GRÖN_J, vick=0.15, oskarp=1.5)
    m, d = ritmask(c)
    d.line((512, 585, 512, 830), fill=255, width=9)
    d.polygon([(450, 572), (512, 620), (574, 572), (560, 590), (512, 640), (464, 590)], fill=255)   # kragen
    kritfyll(c, ImageChops.multiply(m, kropp), (40, 110, 52), vick=0.1, oskarp=0.8)
    m, d = ritmask(c)
    d.rounded_rectangle((500, 600, 524, 640), 6, fill=255)   # dragkedjans handtag
    kritfyll(c, m, (200, 200, 200), vick=0.1, oskarp=0.6)


_armbild_007 = armbild


def armbild(namn, mapp, rig, d):
    """Som 007, men Lovas armar får jackans gröna ärm (allt utom den yttersta tredjedelen, tassen)."""
    if namn != "leoparden-lova" or (namn, d, "ärm") in _armar:
        return _armar.get((namn, d, "ärm")) or _armbild_007(namn, mapp, rig, d)
    im = _armbild_007(namn, mapp, rig, d).copy()
    piv, sp = rig["delar"][d]["vridpunkt"], rig["delar"][d]["spets"]
    m = Image.new("L", im.size)
    r = 0.62 * math.dist(piv, sp)
    ImageDraw.Draw(m).ellipse((piv[0] - r, piv[1] - r, piv[0] + r, piv[1] + r), fill=255)
    arm = im.getchannel("A").point(lambda v: 255 if v > 200 else 0).filter(ImageFilter.MinFilter(9))
    kritfyll(im, ImageChops.multiply(m, arm), GRÖN_J, vick=0.15, oskarp=1.2)
    _armar[namn, d, "ärm"] = im
    return im


_PIP_HEL = Image.open(A / "karaktarer/kycklingen-pip/cut/kycklingen-pip.png").convert("RGBA")
_n = _PIP_HEL.crop((462, 400, 562, 486))
_na = np.asarray(_n).astype(int)
_nm = ((_na[..., 0] - _na[..., 2] > 120) & (_na[..., 1] < 165) & (_na[..., 3] > 200)).astype(np.uint8) * 255   # det orange och dess kant
NÄBB = _n.copy()
NÄBB.putalpha(Image.fromarray(_nm).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1)))


def näbb(c, nick=0):
    """Pips näbb klipps ur kycklingen-pip.png och läggs tillbaka som lapp (som Agdas i kit.js): den är hennes mun, inget kodleende."""
    c.alpha_composite(NÄBB, (462, 400 + nick))


def lova(mood="glad", **kw):
    return figur("leoparden-lova", mood, **kw)


def pip(mood="glad", **kw):
    return figur("kycklingen-pip", mood, **kw)


def gurra(mood="glad", **kw):
    return figur("grodan-gurra", mood, **kw)


def kant(im, h_ram):
    """vita-kanter: kanten är 3 px + 1 % av sakens höjd i bild, räknat om till bildens egen storlek."""
    bb = im.getbbox()
    r = (3 + 0.01 * h_ram) * (bb[3] - bb[1]) / h_ram
    return vit_kant(im, 2 * max(1, round(r)) + 1)


def nyckla(p):
    """En bild på vit bakgrund (Kon Kajsa har inget utklipp än): vitt som hänger ihop med kanten blir genomskinligt."""
    im = Image.open(p).convert("RGB")
    m = im.convert("L").point(lambda v: 255 if v > 238 else 0)
    ImageDraw.floodfill(m, (0, 0), 128)
    a = m.point(lambda v: 0 if v == 128 else 255).filter(ImageFilter.MinFilter(3))
    ut = im.convert("RGBA")
    ut.putalpha(a)
    return ut


# --- Sakerna --------------------------------------------------------------------------------------------------
TR = A / "rekvisita/traktor-gron-oppen"
TR_RIG = json.loads((TR / "traktor-gron-oppen-rigg.json").read_text())
LOVA_I = json.loads((A / "karaktarer/leoparden-lova/i-traktorn/leoparden-lova-i-traktorn.json").read_text())
TR_DEL = {k: Image.open(TR / v["fil"]).convert("RGBA") for k, v in TR_RIG["delar"].items()}
LOVA_K, LOVA_PL, MIDJA = LOVA_I["skala"], LOVA_I["plats"], LOVA_I["midja"]
AVGAS = TR_RIG["avgasror"]["punkt"]
HJULEN = [(TR_RIG["delar"][h]["vridpunkt"], TR_RIG["delar"][h]["radie"]) for h in ("bakhjul", "framhjul")]
FLAGGA = Image.open(A / "rekvisita/cut/flagga-rosa.png").convert("RGBA")


def grön_flagga():
    """005:s rosa flagga omfärgad till grön (bara duken; stången behålls)."""
    hsv = np.asarray(FLAGGA.convert("RGB").convert("HSV")).copy()
    rosa = (hsv[..., 1] > 60) & ((hsv[..., 0] > 200) | (hsv[..., 0] < 10))
    hsv[..., 0] = np.where(rosa, 80, hsv[..., 0])
    hsv[..., 1] = np.where(rosa, 235, hsv[..., 1])   # mättad, så att den syns mot himlen och taket
    hsv[..., 2] = np.where(rosa, np.clip(hsv[..., 2] * 0.8, 0, 255), hsv[..., 2])
    im = Image.merge("HSV", [Image.fromarray(hsv[..., i]) for i in range(3)]).convert("RGBA")
    im.putalpha(FLAGGA.getchannel("A"))
    return im


FLAGGA_GR = grön_flagga().transpose(Image.FLIP_LEFT_RIGHT)   # duken pekar bakåt


def traktor(med_lova=True, mood="glad", flagga=True, armar=True, tuta=False, **kw):
    """Traktorn i lager (traktor-gron-oppen-rigg.json och leoparden-lova-i-traktorn.json): flaggan → ryggstödet med bakre
    stolpen → Lova (kropp och ansikte) → Lovas armar → ratten → framdelen med taket och främre stolpen → hjulen (armarna är inne i traktorn).
    Som 005–007: vila = tassen på ratten (armen syns inte); en arm som pekar (peka_*) eller håller något släpper ratten.
    tuta: höger tass trycker på den röda tutknappen. **kw går till Lovas figur (peka_*, håll, blick)."""
    c = Image.new("RGBA", (1024, 1024))
    if flagga:
        place(c, FLAGGA_GR, 150, 330, 320)   # större, så att duken syns fritt ovanför taket
    c.alpha_composite(TR_DEL["ryggstod"])
    uppe = [s for s in "rl" if kw.get(f"peka_{s}") is not None or s in (kw.get("håll") or {})]
    if not armar:
        uppe = []

    def lägg_lova(lager, lyft=0):
        f = lova(mood, ben=False, lager=lager, **kw).resize((round(1024 * LOVA_K),) * 2, Image.LANCZOS)
        c.alpha_composite(f, (round(LOVA_PL[0] - 512 * LOVA_K), round(LOVA_PL[1] - MIDJA * LOVA_K) - lyft))

    if med_lova:
        lägg_lova("kropp")
        if uppe:   # armarna är inne i traktorn: bakom karossen, bara det som når över kanten syns
            lägg_lova("armar" if len(uppe) == 2 else f"arm-{uppe[0]}", lyft=ARM_LYFT)
        ratt(c, [s for s in "rl" if s not in uppe], tuta)
    for d in ("fram", "bakhjul", "framhjul"):
        c.alpha_composite(TR_DEL[d])
    return c


ARM_LYFT = 26   # armar som gör något lyfts lite (axlarna upp), så att de når över karossens kant fast de är inne i traktorn
RATT_MITT, RATT_R = (LOVA_PL[0] + 4, 432), 42   # ratten i traktorns 1024-ruta: framför bröstet, nedre halvan bakom karossens kant (y ca 421)
TASS = (234, 194, 128)   # Lovas tassfärg, syns mot den gröna jackan


def ratt(c, tassar, tuta=False):
    """Ratten framifrån som i 005 och 007: mörkgrå kritring med ekrar och röd tutknapp, Lovas tassar på klockan 10 och 2."""
    (cx, cy), r = RATT_MITT, RATT_R
    m, d = ritmask(c)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=255, width=round(0.24 * r))
    d.line((cx - r, cy, cx + r, cy), fill=255, width=round(0.16 * r))
    d.line((cx, cy, cx, cy + r), fill=255, width=round(0.16 * r))
    kritfyll(c, m, (75, 69, 66), vick=0.1, oskarp=0.8)
    m, d = ritmask(c)
    kr = 0.27 * r * (0.85 if tuta else 1)   # knappen trycks in lite
    d.ellipse((cx - kr, cy - kr, cx + kr, cy + kr), fill=255)
    kritfyll(c, m, (217, 69, 43), vick=0.1, oskarp=0.8)
    for s in tassar:
        x, y, v = (cx + 0.75 * r, cy - 0.6 * r, -30) if s == "r" else (cx - 0.75 * r, cy - 0.6 * r, 30)
        if tuta and s == "r":   # tassen trycker på tutknappen
            x, y, v = cx + 0.1 * r, cy - 0.05 * r, -10
        m = Image.new("L", c.size)
        e = Image.new("L", (round(0.75 * r), round(0.57 * r)))
        ImageDraw.Draw(e).ellipse((0, 0, e.width - 1, e.height - 1), fill=255)
        e = e.rotate(v, expand=True, resample=Image.BICUBIC)
        m.paste(e, (round(x - e.width / 2), round(y - e.height / 2)))
        kritfyll(c, m, TASS, vick=0.1, oskarp=0.8)


def lova_punkt(px, py):
    """En punkt på Lova (hennes 1024-ruta) i traktorns 1024-ruta."""
    return LOVA_PL[0] + (px - 512) * LOVA_K, LOVA_PL[1] + (py - MIDJA) * LOVA_K


TRAFIK = json.loads((A / "rekvisita/trafikljus/trafikljus-rigg.json").read_text())
_trafik = Image.open(A / "rekvisita/trafikljus/cut/trafikljus.png").convert("RGBA")


def trafikljus(tänd="rod"):
    """Trafikljuset med den tända lampan ritad ovanpå i kod (släckt i bilden): en mjuk glöd och en ljus cirkel."""
    c = _trafik.copy()
    L = TRAFIK["lampor"][tänd]
    (x, y), r = L["mitt"], L["radie"]
    col = tuple(int(L["tand"][i:i + 2], 16) for i in (1, 3, 5))
    m, d = ritmask(c)
    d.ellipse((x - r * 1.5, y - r * 1.5, x + r * 1.5, y + r * 1.5), fill=255)
    glöd = Image.new("RGBA", c.size, col + (0,))
    glöd.putalpha(m.filter(ImageFilter.GaussianBlur(r * 0.4)).point(lambda v: int(v * 0.55)))
    c.alpha_composite(glöd)
    m, d = ritmask(c)
    d.ellipse((x - r * 1.04, y - r * 1.04, x + r * 1.04, y + r * 1.04), fill=255)
    kritfyll(c, m, col, vick=0.1, oskarp=1)
    m, d = ritmask(c)
    d.ellipse((x - r * 0.55, y - r * 0.6, x - r * 0.1, y - r * 0.2), fill=255)   # en liten glans
    kritfyll(c, m, (255, 255, 255), alpha=0.6, vick=0.1, oskarp=1)
    return c


SKIDA = Image.open(A / "rekvisita/artskida/cut/artskida.png").convert("RGBA")
SKIDA_STÄNGD = Image.open(A / "rekvisita/artskida/cut/artskida-stangd.png").convert("RGBA")
ÄRTA = vit_kant(Image.open(A / "rekvisita/artskida/cut/artskida-arta-1.png").convert("RGBA"), 9)
PELLA = Image.open(A / "karaktarer/flygplanet-pella/cut/flygplanet-pella.png").convert("RGBA")
KAJSA_P = A / "karaktarer/kon-kajsa/cut/kon-kajsa.png"
KAJSA = nyckla(KAJSA_P)
PLATSHÅLLARE.append("Kon Kajsa (bara en bild på vit bakgrund, nycklad i kod; inget utklipp eller rigg än)")


# --- A · Vägen ------------------------------------------------------------------------------------------------
def vägen_plåt():
    """Vägen med den ljusgröna väggen omfärgad till ljusblå himmel (#A8DCF2), annars försvinner traktorn. Inga gröna lager."""
    im = Image.open(A / "bakgrunder/vagen/vagen.png").convert("RGB").resize((W, H))
    hsv = np.asarray(im.convert("HSV"), dtype=np.float32).copy()
    grönt = (hsv[..., 0] > 40) & (hsv[..., 0] < 95) & (hsv[..., 1] > 40)
    hsv[..., 0] = np.where(grönt, 140, hsv[..., 0])
    hsv[..., 1] = np.where(grönt, hsv[..., 1] * 0.5, hsv[..., 1])
    hsv[..., 2] = np.where(grönt, np.clip(hsv[..., 2] * 1.1, 0, 255), hsv[..., 2])
    return Image.merge("HSV", [Image.fromarray(hsv[..., i].astype(np.uint8)) for i in range(3)]).convert("RGB")


HÖST = [(232, 128, 48), (240, 186, 58), (198, 96, 50)]   # höstträdens kronor: orange, gul, rostbrun (grönt är bara för målsakerna)
STAM = (128, 86, 54)
TRÄD_X = (90, 330, 610, 870, 1150)   # träden längs vägen, på horisonten (y 568); traktorn kör framför dem


TRÄD_BILD = [Image.open(A / f"bakgrunder/vagen-saker/{f}.png").convert("RGBA") for f in ("lovtrad", "bjork")]


def höst(im, col):
    """Trädets gröna krona omfärgad till en höstfärg (stam, kontur och vit kant kvar): grönt är bara för målsakerna."""
    a = np.asarray(im, dtype=np.float32).copy()
    r, g, b_ = a[..., 0], a[..., 1], a[..., 2]
    grönt = (g > r + 20) & (g > b_ + 20)
    ljus = (0.35 * r + 0.55 * g + 0.1 * b_) / 180
    for i in range(3):
        a[..., i] = np.where(grönt, np.clip(col[i] * ljus, 0, 255), a[..., i])
    return Image.fromarray(a.astype(np.uint8), "RGBA")


HÖSTTRÄD = [höst(TRÄD_BILD[i % 2], HÖST[i % 3]) for i in range(len(TRÄD_X))]


def höstträd(c, x, fot=568, h=170, n=0):
    """Ett träd ur vagen-saker (lövträd och björk om vartannat), kronan i höstfärg."""
    place(c, HÖSTTRÄD[n], x, fot + 4, h)


def med_träd(im):
    c = im.copy()
    for i, x in enumerate(TRÄD_X):
        höstträd(c, x, h=150 + 30 * (i % 2), n=i)
    return c


VÄG_TOM = vägen_plåt()   # utan träd (kritsvep och fantasibilder)
VÄG = med_träd(VÄG_TOM)
GV, TR_H, TR_X = 742, 640, W / 3 + 10   # 640 (var 500): större, som lastbilen i 007 (Sanna 2026-11-06)


def pt(b, px, py):
    """En punkt i traktorns 1024-ruta på bilden (b = place()-svaret)."""
    s, x0, y0 = b
    return x0 + px * s, y0 + py * s


def hjulpilar(c, b):
    for (hx, hy), r in HJULEN:
        x, y = pt(b, hx, hy)
        arrow(c, båge(x, y, (r + 40) * b[0], 150, 40, steg=12))


def puffar(c, b, n=3):
    """Vita kritpuffar ur avgasröret som driver bakåt och uppåt, en per putt."""
    for i in range(n):
        x, y = pt(b, AVGAS[0] - 30 - i * 70, AVGAS[1] - 40 - i * 55)
        r = (22 + i * 10) * b[0] / 0.5
        for col, k in (((196, 196, 196), 1.18), ((255, 255, 255), 1.0)):
            m, d = ritmask(c)
            d.ellipse((x - r * k, y - r * k, x + r * k, y + r * k), fill=255)
            d.ellipse((x - r * 1.5 * k, y - r * 0.4 * k, x - r * 0.3, y + r * 0.8 * k), fill=255)
            kritfyll(c, m, col, alpha=0.95 - i * 0.12, vick=0.3)


def lägg_traktor(c, im, cx, ground, h):
    return place(c, kant(im, h), cx, ground, h)


def körscen(stuff=None, fart=True, skump=True, pella=False, cx=TR_X, ground=GV, h=TR_H, plåt_=None, **kw):
    c = (plåt_ or VÄG).copy()
    if pella:
        place(c, PELLA, 1080, 150, 70)
    if fart:
        arrow(c, [(1240, 540), (1110, 540)])   # vägen glider
    if stuff:
        stuff(c)
    b = lägg_traktor(c, traktor(**kw), cx, ground, h)
    if fart:
        hjulpilar(c, b)
    if skump:
        puffar(c, b)
        x, y = pt(b, 930, 520)
        arrow(c, [(x, y - 30), (x, y - 90)])
    return c, b


def närbild(stuff=None, plåt_=None, zoom=1.0, fart=False, y_andel=0.44, **kw):
    """Närbild på Lova i traktorn, samma inramning hela tiden: ansiktet strax ovanför mitten, traktorns kant längst ner."""
    s = 2.0 * zoom
    c = (plåt_ or VÄG).copy()
    im = kant(traktor(**kw), 1024 * s)
    fx, fy = lova_punkt(512, 430)
    big = im.resize((round(1024 * s),) * 2, Image.LANCZOS)
    x0, y0 = round(W / 2 - fx * s), round(H * y_andel - fy * s)
    if stuff:
        stuff(c)
    c.paste(big, (x0, y0), big)
    b = (s, x0, y0)
    if fart:
        arrow(c, [(1300, 690), (1150, 690)])
    return c, b


def lova_i_bild(b, px=512, py=430):
    return pt(b, *lova_punkt(px, py))


VIT, SKEN = (255, 255, 255), (255, 236, 205)


def stjärna(c, x, y, r, col=VIT, sken=False):
    if sken:
        m, d = ritmask(c)
        d.ellipse((x - r * 0.9, y - r * 0.9, x + r * 0.9, y + r * 0.9), fill=255)
        c.paste(SKEN, mask=m.filter(ImageFilter.GaussianBlur(r * 0.45)).point(lambda v: int(v * 0.7)))
    m, d = ritmask(c)
    k = r * 0.28
    d.polygon([(x, y - r), (x + k, y - k), (x + r, y), (x + k, y + k), (x, y + r), (x - k, y + k), (x - r, y), (x - k, y - k)], fill=255)
    kritfyll(c, m, col, vick=0.15, oskarp=0.8)


def pling(c, x, y, r=60):
    streck(c, x, y, r=r, n=7, start=-170, slut=-10, col=(255, 255, 255), w=6)
    stjärna(c, x + r * 1.3, y - r * 0.9, 16, sken=True)


def krita(c, x, y):
    """Kritan utan ansikte, spetsen i (x, y). Den här gången grön."""
    m, d = ritmask(c)
    d.polygon([(x, y), (x + 100, y - 100), (x + 130, y - 70), (x + 30, y + 30)], fill=255)
    kritfyll(c, m, GRÖN_T)


def tår(c, x, y, r=12):
    m, d = ritmask(c)
    d.polygon([(x, y - r * 1.6), (x + r, y), (x, y + r), (x - r, y)], fill=255)
    d.ellipse((x - r, y - r * 0.3, x + r, y + r), fill=255)
    kritfyll(c, m, (110, 180, 235), vick=0.1, oskarp=0.8)


def ärtbubbla(c, x, y, r=110):
    """Ärtbubblan i refrängen (som apelsinbubblan i 006): en vit kritbubbla med en stor ärta och glitter."""
    m, d = ritmask(c)
    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    kritfyll(c, m, (255, 255, 255), alpha=0.95, vick=0.3)
    place(c, ÄRTA, x, y + r * 0.45, r * 0.95)
    for a in (40, 150, 260):
        stjärna(c, x + r * 1.25 * math.cos(math.radians(a)), y - r * 1.25 * math.sin(math.radians(a)), 14, sken=True)


def grön_lampa(c, x=1290, y=90, r=34):
    """Den lilla gröna lampan i hörnet på "Grönt betyder kör!" (trafikljusets gröna, i kod)."""
    m, d = ritmask(c)
    d.rounded_rectangle((x - r * 1.4, y - r * 1.4, x + r * 1.4, y + r * 1.4), 14, fill=255)
    kritfyll(c, m, (40, 40, 40))
    m, d = ritmask(c)
    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    kritfyll(c, m, (95, 211, 90))
    streck(c, x, y, r=r + 6, n=5, start=-200, slut=20, col=(95, 211, 90), w=5)


frames = {}

# 01 Intro: introt är inte renderat än (intro/ från 007:s index.html). Bilden är en enkel platshållare: kortet i himlen
# med en liten grön traktor, ingen text.
c = Image.new("RGB", (W, H), (150, 210, 240))
m, d = ritmask(c)
d.rounded_rectangle((W / 2 - 330, H / 2 - 200, W / 2 + 330, H / 2 + 200), 30, fill=255)
kritfyll(c, m, PAPER, vick=0.3)
lägg_traktor(c, traktor(med_lova=False), W / 2, H / 2 + 120, 230)
frames["01"] = c
PLATSHÅLLARE.append("introt (intro/intro-med-jingel.mp4 är inte renderat; bild 01 är en platshållare)")


# 02–02c Kritan ritar traktorn där den står i 03: kroppen, sätet och motorhuven, sedan hjulen, sist taket (ledtråden i pausen)
# och en puff. Formen är traktorns egen (masker ur utklippen), så att zoomen in landar på den riktiga traktorn.
_T0 = kant(traktor(), TR_H)
_bb = _T0.getbbox()
RS = TR_H / (_bb[3] - _bb[1])
RX0, RY0 = TR_X - (_bb[0] + _bb[2]) / 2 * RS, GV - _bb[3] * RS
RB = (RS, RX0, RY0)


def i_ram(mask):
    """En mask i traktorns 1024-ruta på bilden, där traktorn står i 03."""
    ut = Image.new("L", (W, H))
    m = mask.resize((round(1024 * RS),) * 2, Image.LANCZOS)
    ut.paste(m, (round(RX0), round(RY0)))
    return ut


_alfa = lambda im: im.getchannel("A").point(lambda v: 255 if v > 128 else 0)
_hjul = ImageChops.lighter(_alfa(TR_DEL["bakhjul"]), _alfa(TR_DEL["framhjul"]))
_y = lambda y0, y1, x0=0, x1=1024: (lambda m: (ImageDraw.Draw(m).rectangle((x0, y0, x1, y1), fill=255), m)[1])(Image.new("L", (1024, 1024)))
TAK_M = ImageChops.lighter(ImageChops.multiply(_alfa(TR_DEL["fram"]), ImageChops.lighter(_y(0, 239), _y(239, 300, 520, 600))),
                           ImageChops.multiply(_alfa(TR_DEL["ryggstod"]), _y(0, 296)))   # taket och de två stolparna
KROPP_M = ImageChops.subtract(ImageChops.subtract(ImageChops.lighter(_alfa(TR_DEL["fram"]), _alfa(TR_DEL["ryggstod"])),
                                                  _hjul.filter(ImageFilter.MaxFilter(9))), TAK_M)


def ritad_traktor(c, hjul=False, tak=False, puff=False):
    kritfyll(c, i_ram(KROPP_M), GRÖN_T, vick=0.4, oskarp=3)
    if hjul:
        for (hx, hy), r in HJULEN:
            m, d = ritmask(Image.new("L", (1024, 1024)))
            d.ellipse((hx - r, hy - r, hx + r, hy + r), fill=255)
            kritfyll(c, i_ram(m), (62, 62, 66), vick=0.3)
            m, d = ritmask(Image.new("L", (1024, 1024)))
            d.ellipse((hx - r * 0.33, hy - r * 0.33, hx + r * 0.33, hy + r * 0.33), fill=255)
            kritfyll(c, i_ram(m), (190, 190, 190), vick=0.2)   # ljusgrå fälgar, som traktorn
    if tak:   # taket och stolparna i traktorns egna färger: grönt tak, grå stolpar
        tak_ = i_ram(ImageChops.multiply(TAK_M, _y(0, 239)))
        kritfyll(c, ImageChops.subtract(i_ram(TAK_M), tak_), (110, 110, 110), vick=0.2)
        kritfyll(c, tak_, GRÖN_T, vick=0.3)
    if puff:
        puffar(c, RB, n=1)


c = paper(); ritad_traktor(c); x, y = pt(RB, 905, 560); krita(c, x, y); frames["02"] = c
c = paper(); ritad_traktor(c, hjul=True); x, y = pt(RB, 850, 830); krita(c, x, y); frames["02a"] = c
c = paper(); ritad_traktor(c, hjul=True, tak=True); x, y = pt(RB, 560, 60); krita(c, x, y); frames["02b"] = c
c = paper(); ritad_traktor(c, hjul=True, tak=True, puff=True)
x, y = pt(RB, 920, 470); arrow(c, [(x, y), (x, y - 70)]); frames["02c"] = c

# 03 zoom in: den riktiga traktorn där den ritade stod, Lova i, vägen börjar glida, Pella långt bort
c, b = körscen(pella=True, mood="skrattar")
for (x, y), (x2, y2) in (((70, 70), (190, 160)), ((W - 70, 70), (W - 190, 160)), ((70, H - 70), (190, H - 160)), ((W - 70, H - 70), (W - 190, H - 160))):
    arrow(c, [(x2, y2), (x, y)])
frames["03"] = c
frames["03a"] = närbild(mood="blinkar", peka_r=VINKA)[0]
c, b = körscen(mood="skrattar"); frames["03b"] = c
c, b = närbild(mood="ropar", peka_r=(900, 900)); frames["04"] = c   # pekar ut mot tittaren


# Refrängen: Ärtresan (README, som Kolasåsresan i 007). Samma fem bilder båda gångerna: vägen med ärtorna och lampan (a–c),
# skisserna d–e och g visar fortfarande den gamla skidan; filmen kör på vägen (Sanna 2026-11-06). Ärtan på taket (f), kritsvep hem (h).
TOM = Image.open(A / "rekvisita/artskida/cut/artskida-tom.png").convert("RGBA")
ÄRTOR = [Image.open(A / f"rekvisita/artskida/cut/artskida-arta-{i}.png").convert("RGBA") for i in (1, 2, 3)]
ÄRT_MITT = [(397, 476), (550, 469), (702, 460)]   # artskida-rigg.json
SK_S, SK_KANT = 2.0, 455                         # den stora skidan: skala och skidans öppning (y i rutan)
SK_Y = 0.62 * H                                  # där öppningen hamnar i bild
_tb = TR_DEL["fram"].getchannel("A").getbbox()
TAK = ((_tb[0] + _tb[2]) / 2 + 40, _tb[1])       # mitt på taket, överst


def himmel():
    c = Image.new("RGB", (W, H), PAPER)
    m, d = ritmask(c)
    d.rectangle((0, 0, W, H), fill=255)
    kritfyll(c, m, HIMMEL, vick=0.3)
    return c


HIMMEL_BILD = himmel()


SKAL, INNE, SÖM = (122, 180, 64), (200, 222, 142), (88, 142, 50)   # den stora skidan: skalet, den ljusa insidan (så att den gröna traktorn syns mot den) och sömmen
ÄRT_LJ = (128, 196, 70)                                           # ärtorna i skidan, mellangröna så att de syns mot den ljusa insidan
SK_B, SK_HH = 0.86 * W, 0.24 * H                                  # skidans bredd och halva höjd i bild
ÄRT_T = (0.5, 0.65, 0.8)                                          # ärtornas plats längs skidan (traktorn åker vid 0.2)


def _lins(cx, y0, upp, ner, n=60):
    """En skidform: spetsiga ändar som böjer uppåt lite, upp/ner = hur långt kanterna går från y0 på mitten."""
    topp, botten = [], []
    for i in range(n + 1):
        t = i / n
        f = math.sin(math.pi * t) ** 0.7
        x = cx + (t - 0.5) * SK_B
        lyft = 50 * (2 * t - 1) ** 2   # ändarna böjer upp
        topp.append((x, y0 - upp * f - lyft))
        botten.append((x, y0 + ner * f - lyft))
    return topp + botten[::-1]


def skid_x(cx, t):
    return cx + (t - 0.5) * SK_B, 50 * (2 * t - 1) ** 2


def täck(c, m, col):
    """Massiv fyllning under kritfärgen, så att det som ligger bakom (traktorns hjul) inte lyser igenom."""
    c.paste(col, mask=m.filter(ImageFilter.GaussianBlur(1)))
    kritfyll(c, m, col, vick=0.25, oskarp=1.5)


def ärtansikte(c, x, y, r):
    m, d = ritmask(c)
    for dx in (-0.3, 0.3):
        d.ellipse((x + dx * r - 0.09 * r, y - 0.12 * r - 0.11 * r, x + dx * r + 0.09 * r, y - 0.12 * r + 0.11 * r), fill=255)
    d.arc((x - 0.28 * r, y - 0.1 * r, x + 0.28 * r, y + 0.32 * r), 20, 160, fill=255, width=max(3, round(0.07 * r)))
    kritfyll(c, m, (48, 40, 34), vick=0.05, oskarp=0.6)
    m, d = ritmask(c)
    d.ellipse((x - 0.62 * r, y - 0.66 * r, x - 0.28 * r, y - 0.36 * r), fill=255)   # glans
    kritfyll(c, m, (255, 255, 255), alpha=0.7, vick=0.1, oskarp=1)


def i_skidan(c, s, cx, kant_y, ärtor=(0, 0, 0), med=True, sedan=None):
    """Den stora öppna skidan, ritad i kod (skarp i alla storlekar): vit kant och skal → mörk insida → ärtorna (med ansikten)
    → sedan(c) (traktorn, som åker inne i skidan) → främre kanten med sömmen framför. ärtor = hur högt varje ärta hoppar (px).
    med=False: tom skida. s används inte längre (skidan fyller 86 % av bredden)."""
    hh = SK_HH
    yttre = _lins(cx, kant_y, 0.55 * hh, hh)
    m, d = ritmask(c)
    d.polygon(yttre, fill=255)
    x0 = cx - SK_B / 2
    d.line([(x0 + 10, kant_y - 50), (x0 - 30, kant_y - 75), (x0 - 55, kant_y - 110), (x0 - 50, kant_y - 140), (x0 - 25, kant_y - 150)], fill=255, width=20, joint="curve")
    c.paste((255, 255, 255), mask=m.filter(ImageFilter.MaxFilter(17)))   # vita klistermärkeskanten
    täck(c, m, SKAL)
    m, d = ritmask(c)
    d.polygon(_lins(cx, kant_y, 0.42 * hh, 0.2 * hh), fill=255)
    täck(c, m, INNE)
    if med:
        r = 0.36 * hh
        for t, lyft in zip(ÄRT_T, ärtor):
            x, böj = skid_x(cx, t)
            y = kant_y - böj - 0.02 * hh - lyft
            if lyft:
                arrow(c, [(x, y + r + 30), (x, y + r + 90)])
            m, d = ritmask(c)
            d.ellipse((x - r, y - r, x + r, y + r), fill=255)
            if lyft:   # en ärta i luften får vit kant
                c.paste((255, 255, 255), mask=m.filter(ImageFilter.MaxFilter(13)))
            kritfyll(c, m, ÄRT_LJ, vick=0.15, oskarp=1.2)
            ärtansikte(c, x, y, r)
    if sedan:
        sedan(c)
    m, d = ritmask(c)   # främre kanten: från öppningen ner till botten, framför ärtorna och traktorn
    fram = _lins(cx, kant_y + 0.12 * hh, 0.02 * hh, 0.88 * hh)
    d.polygon(fram, fill=255)
    täck(c, m, SKAL)
    m, d = ritmask(c)
    d.line([(x, y + 0.35 * hh * math.sin(math.pi * i / 59) ** 0.7) for i, (x, y) in enumerate(fram[:60])], fill=255, width=10)
    kritfyll(c, m, SÖM, vick=0.3, oskarp=1.5)   # sömmen längs skidan

def ärtrad(n):
    """Ärtorna som poppar upp på vägen framför traktorn, en per ”Grönt!” (fyra i rad, som tassavtrycken i 007)."""
    def stuff(c):
        for i in range(n):
            x = 880 + i * 125
            place(c, kant(ÄRTA, 70), x, 712, 70)
            if i >= n - 2:
                streck(c, x, 660, r=46, n=5, col=(255, 255, 255), w=5)
    return stuff


def grön_väg(c):
    """Vägen framför traktorn blir grön, som om kritan färglägger den."""
    m, d = ritmask(c)
    d.polygon([(800, 585), (W, 585), (W, H), (760, H)], fill=255)
    kritfyll(c, m, ÄRT_G, alpha=0.9, vick=0.4, oskarp=3)


JORD, FÅRA = (122, 82, 52), (92, 60, 38)   # den bruna åkern i refrängen
GRODD_X = (790, 1260, 960, 1120, 690, 1340)   # groddarna i den ordning de växer (en per ”Grönt!”), framför traktorn


def åker(c):
    """Vägen blir en brun åker: jord över hela vägbanan och mörkare fåror i kritstil."""
    m, d = ritmask(c)
    d.rectangle((0, 572, W, H), fill=255)
    kritfyll(c, m, JORD, vick=0.3, oskarp=2)
    for i, y in enumerate(range(605, H, 42)):
        m, d = ritmask(c)
        d.line([(x, y + 6 * math.sin(x / 90 + i)) for x in range(-20, W + 40, 40)], fill=255, width=9)
        kritfyll(c, m, FÅRA, alpha=0.8, vick=0.4, oskarp=2)


def grodd(h=90):
    """En liten grön grodd (två blad på en stjälk) som klistermärke."""
    g = Image.new("RGBA", (200, 200))
    m, d = ritmask(g)
    d.line([(100, 190), (100, 95)], fill=255, width=14)
    d.ellipse((22, 50, 100, 100), fill=255)
    d.ellipse((100, 40, 180, 92), fill=255)
    kritfyll(g, m, ÄRT_G, vick=0.2, oskarp=1.2)
    return kant(g.crop(g.getbbox()), h)


def groddar(n, h=90):
    def stuff(c):
        åker(c)
        for i, x in enumerate(GRODD_X[:n]):
            place(c, grodd(h), x, 640 + 22 * (i % 3), h)
    return stuff


def refräng_bild(rad):
    upp = dict(peka_r=UPP_R, peka_l=UPP_L)
    if rad in "ab":   # vägen blir en brun åker: Lova pumpar armarna, en grön grodd växer upp per ”Grönt!”
        c, b = körscen(stuff=groddar(2 if rad == "a" else 4), fart=False, mood="ropar" if rad == "a" else "skrattar", **upp)
        return c
    if rad == "c":    # ett stort trafikljus poppar upp och lyser grönt, traktorn far iväg, vägen framför blir grön
        def stuff(c):
            groddar(6, 120)(c)   # hela åkern grönskar: fler och större groddar
            place(c, kant(trafikljus("gron"), 470), 1150, 600, 470)
        c, b = körscen(stuff=stuff, mood="ropar", peka_r=FRAM, peka_l=FRAM)
        pling(c, 1150, 150)
        x, y = pt(b, 80, 520)
        for i in range(3):
            arrow(c, [(x - 30, y + i * 50), (x - 170, y + i * 50)])
        return c
    if rad in "de":   # klipp: vägen har blivit en jättestor öppen skida, ärtorna hoppar som en våg
        c = HIMMEL_BILD.copy()
        tr = {}

        def sedan(c):   # traktorn åker inne i skidan, hjulen bakom främre kanten
            tr["b"] = lägg_traktor(c, traktor(mood="ropar" if rad == "d" else "skrattar", **upp), skid_x(W / 2, 0.27)[0], SK_Y + 95, 280)
        i_skidan(c, SK_S, W / 2, SK_Y, ärtor=(150, 60, 0) if rad == "d" else (0, 150, 60), sedan=sedan)
        puffar(c, tr["b"])
        return c
    if rad == "f":    # närbild: en ärta har satt sig på traktorns tak, Lova tittar upp och fnissar
        c, b = närbild(plåt_=HIMMEL_BILD, zoom=0.75, y_andel=0.66, mood="skrattar", blick=(3, -9), peka_r=(900, 100))
        x, y = pt(b, *TAK)
        place(c, kant(ÄRTA, 110), x, y + 8, 110)
        for dx, dy, r in ((-90, -90, 16), (95, -70, 20), (10, -150, 13)):
            stjärna(c, x + dx, y + dy, r, sken=True)
        return c
    if rad == "g":    # skidan lutar som en rutschkana: traktorn glider ner, ärtorna rullar efter som ett litet tåg
        c = HIMMEL_BILD.copy()
        lag = Image.new("RGBA", (W, H))
        i_skidan(lag, SK_S, W / 2, SK_Y, med=False)
        lag = lag.rotate(-10, resample=Image.BICUBIC, center=(W / 2, SK_Y))
        c.paste(lag, (0, 0), lag)
        lutning = math.tan(math.radians(10))
        on = lambda x: SK_Y + (x - W / 2) * lutning
        r = 0.36 * SK_HH
        for x in (330, 500, 670):   # ärtorna rullar efter traktorn som ett litet tåg
            y = on(x) - 0.3 * r
            m, d = ritmask(c)
            d.ellipse((x - r, y - r, x + r, y + r), fill=255)
            c.paste((255, 255, 255), mask=m.filter(ImageFilter.MaxFilter(13)))
            kritfyll(c, m, ÄRT_LJ, vick=0.15, oskarp=1.2)
            ärtansikte(c, x, y, r)
            arrow(c, [(x - r - 20, y + r + 20), (x - r - 90, y + r + 20)][::-1])
        b = lägg_traktor(c, traktor(mood="skrattar", peka_l=UPP_L, tuta=True), 820, on(820) + 30, 290)   # ”tut, tut”: höger tass på tutknappen
        puffar(c, b, n=2)
        arrow(c, [(1000, on(1000) - 60), (1180, on(1180) - 60)])
        return c
    # h: kameran drar ut, skidan har stängt sig, Lova spanar åt båda hållen, kritsvep tillbaka till vägen
    c = HIMMEL_BILD.copy()
    place(c, kant(SKIDA_STÄNGD, 300), W / 2 - 80, H * 0.86, 300)
    b = lägg_traktor(c, traktor(mood="nyfiken", peka_r=ÖGON_R, blick=(-9, 0)), W / 2 - 80, H * 0.86 - 250, 200)
    fx, fy = lova_i_bild(b)
    arrow(c, [(fx - 60, fy - 70), (fx - 200, fy - 70)])
    arrow(c, [(fx + 60, fy - 70), (fx + 200, fy - 70)])
    for (x, y), (x2, y2) in (((W / 2 - 330, 200), (W / 2 - 460, 110)), ((W / 2 + 170, 200), (W / 2 + 300, 110))):
        arrow(c, [(x, y), (x2, y2)])
    m, d = ritmask(c)   # kritsvepet (grönt) tar oss hem till vägen
    d.polygon([(W * 0.8, 0), (W, 0), (W, H), (W * 0.72, H)], fill=255)
    c.paste(VÄG, mask=m)
    kritfyll(c, ImageChops.subtract(m.filter(ImageFilter.MaxFilter(91)), m), GRÖN_T, vick=0.5, oskarp=4)
    return c


for n in "abcdefgh":
    frames["05" + n] = refräng_bild(n)
for n in "abcdefg":
    frames["09" + n] = frames["05" + n]   # likadana båda gångerna


# 06 Grodan hoppar över vägen framför traktorn, tre hopp
def grodan_hoppar(c):
    for i, x in enumerate((900, 1040, 1180)):
        arrow(c, båge(x + 70, 700, 70, 170, 10, steg=20, ry=90)) if i < 2 else None
    g = gurra("skrattar", peka_r=UPP_R, peka_l=UPP_L)
    sätt(c, kant(g, 260), 1040, 640, 260 / 1024 * 1.2)   # grodan är målsaken: större


c, b = körscen(stuff=grodan_hoppar, mood="forvanad", blick=(9, 0), fart=False)
frames["06"] = c


def ljuset(tänd, x=1090, fot=600, h=430):
    def stuff(c):
        place(c, kant(trafikljus(tänd), h), x, fot, h)
    return stuff


c, b = körscen(stuff=ljuset("rod"), mood="forvanad", blick=(9, -6), fart=False, skump=False); frames["07a"] = c
c, b = närbild(stuff=ljuset("rod", x=1290, fot=900, h=1100), mood="nyfiken", blick=(6, -9), peka_r=(700, -900)); frames["07b"] = c
c, b = körscen(stuff=ljuset("gron"), mood="ropar", peka_r=UPP_R, peka_l=UPP_L)
pling(c, 1090, 210); frames["07c"] = c

# 08a–c Frågan: Lova tittar ner på jackan (ledtråden), pekar på jackan och flaggan, drar upp dragkedjan
c, b = närbild(mood="nyfiken", nick=40, blick=(0, 9), zoom=1.15)
fx, fy = lova_i_bild(b, 512, 700)
arrow(c, [(fx + 260, fy - 160), (fx + 120, fy - 40)]); frames["08a"] = c
c, b = närbild(mood="forvanad", peka_r=MAGE, peka_l=(-900, -300)); frames["08b"] = c
c, b = närbild(mood="njuter", peka_r=(540, 600))
fx, fy = lova_i_bild(b, 512, 760)
arrow(c, [(fx - 60, fy + 40), (fx - 60, fy - 120)]); frames["08c"] = c


# --- B · Bondgården: gul vägg med ladans röda dörr; bänken framför dörren, ärtplantan vid staketet, traktorn parkerad i kanten
GUL = (246, 194, 28)         # #F6C21C, bondgårdens vägg och kritsvepet
TRÄ, TRÄ_M = (150, 96, 52), (112, 70, 38)
SITS, GOLV = 535, 600        # bänkens sits och golvet (där fötterna står) i plåtens koordinater
GURRA_X, PIP_X, PLANTA_X, LOVA_X, BIL_X = 80, 180, 400, 530, 1060   # Lova närmare bänken, så att tvåbilden kan gå närmare
FIG_S = 0.135                # Pip och Gurra: figurrutans skala i plåten
BIL_HP = 380


GÅRD = Image.open(A / "bakgrunder/bondgarden/bondgarden.png").convert("RGB").resize((W, H))


def sits(c, P):
    """Bänkens sits; ritas igen framför dem som sitter, så att de sitter på den och inte står."""
    m, d = ritmask(c)
    d.rectangle((*P(14, SITS - 6), *P(338, SITS + 12)), fill=255)
    c.paste(TRÄ, mask=m)
    kritfyll(c, m, TRÄ_M, alpha=0.35, vick=0.25)


def gårdssaker(c, P, k):
    """Staketet, bänken och ärtplantan, ritade i kod direkt i den inzoomade bilden (så att de håller skärpan)."""
    R = lambda x0, y0, x1, y1: (*P(x0, y0), *P(x1, y1))
    m, d = ritmask(c)   # staketet bakom plantan
    for x in (350, 425, 500, 575, 650):
        d.rectangle(R(x, 498, x + 11, GOLV - 6), fill=255)
    for y in (515, 556):
        d.rectangle(R(340, y, 668, y + 8), fill=255)
    kritfyll(c, m, (200, 146, 88), vick=0.3)
    m, d = ritmask(c)   # bänken: sits och två ben
    for x in (32, 302):
        d.rectangle(R(x, SITS, x + 13, GOLV), fill=255)
    kritfyll(c, m, TRÄ_M, vick=0.25)
    sits(c, P)
    m, d = ritmask(c)   # ärtplantan: två stjälkar med blad och tre skidor
    stj = []
    for dx, top, böj in ((0, 392, 14), (30, 425, -12)):
        pts = [(PLANTA_X + dx + böj * math.sin(i / 3), GOLV - 2 - (GOLV - top) * i / 12) for i in range(13)]
        stj.append(pts)
        d.line([P(*q) for q in pts], fill=255, width=round(6 * k), joint="curve")
    kritfyll(c, m, (52, 128, 58), vick=0.15, oskarp=1)
    m, d = ritmask(c)
    for si, i, ut in ((0, 3, -1), (1, 4, 1), (0, 7, -1), (1, 8, 1), (0, 11, 1), (1, 12, 1)):
        x, y = stj[si][i]
        x += ut * 16
        d.ellipse(R(x - 17, y - 8, x + 17, y + 8), fill=255)
    kritfyll(c, m, (98, 182, 74), vick=0.2, oskarp=1)
    for si, i, ut in ((0, 5, -1), (1, 6, 1), (0, 9, 1)):
        x, y = stj[si][i]
        place(c, kant(SKIDA_STÄNGD, 60 * k), *P(x + ut * 8, y + 32), 22 * k, rot=-80 * ut)


_TB = traktor().getbbox()
TR_S = BIL_HP / (_TB[3] - _TB[1])                           # traktorrutans skala i plåten
LOVA_S = 1.15 * LOVA_K * TR_S                                # Lova står lite större än i traktorn, så att hon är störst av de tre
LOVA_FOT = lova().getbbox()[3]


def gård(k, cx, cy, pip_=None, gurra_=None, lova_=None, bil=None, lova_x=LOVA_X, bil_x=BIL_X, pip_golv=None, gurra_golv=None, stuff=None):
    """Bondgården inzoomad k gånger runt plåtens punkt (cx, cy); figurerna läggs i plåtens koordinater.
    pip_/gurra_/lova_ = kw till figuren (None = inte i bild). bil = kw till traktorn (med_lova=False när Lova står bredvid).
    pip_golv = (x, rot): Pip på golvet i stället för på bänken; gurra_golv = x: Gurra står på golvet."""
    big = GÅRD.resize((round(W * k), round(H * k)), Image.LANCZOS)
    x0 = min(0, max(W - W * k, W / 2 - cx * k))   # aldrig utanför plåten
    y0 = min(0, max(H - H * k, H / 2 - cy * k))
    c = Image.new("RGB", (W, H))
    c.paste(big, (round(x0), round(y0)))
    P = lambda x, y: (x0 + x * k, y0 + y * k)
    gårdssaker(c, P, k)

    def sätt_in(im, x, y, fx, fy, s, rot=0):
        im = kant(im, 1024 * s * k * 0.8)
        if rot:
            im = im.rotate(rot, resample=Image.BICUBIC, center=(fx, fy))
        im = im.resize((round(1024 * s * k),) * 2, Image.LANCZOS)
        X, Y = P(x, y)
        c.paste(im, (round(X - fx * s * k), round(Y - fy * s * k)), im)

    b = None
    if bil is not None:
        b = lägg_traktor(c, traktor(**bil), *P(bil_x, GOLV + 14), BIL_HP * k)
    if stuff:
        stuff(c, P, k)
    if gurra_ is not None:
        if gurra_golv:
            sätt_in(gurra(**gurra_), gurra_golv, GOLV, 512, 900, FIG_S)
        else:
            sätt_in(gurra(ben="sitter", **gurra_), GURRA_X, SITS + 8, 512, 800, FIG_S)
    if pip_ is not None:
        if pip_golv:
            sätt_in(pip(**pip_), pip_golv[0], GOLV + 4, 512, 900, FIG_S, pip_golv[1])
        else:
            sätt_in(pip(**pip_), PIP_X, SITS + 8, 512, 820, FIG_S)
    if (pip_ is not None and not pip_golv) or (gurra_ is not None and not gurra_golv):
        sits(c, P)
    if lova_ is not None:
        sätt_in(lova(**lova_), lova_x, GOLV + 6, 512, LOVA_FOT, LOVA_S)
    return c, b, P


HEL = (1.0, W / 2, H / 2)       # helbild
HEL2 = (2.0, 760, 480)          # närmare helbild runt Gurra, Pip och Lova (14h), traktorn i kanten
TVÅ = (2.6, 335, 486)            # tvåbild, tätare: bänken, plantan och Lova fyller bilden (Gurra i kanten)
LÅG = (3.6, 230, 545)            # lågt utsnitt vid bänken
PIP_NÄR = (4.6, 200, 475)        # närbild Pip

# 10 Kritsvepet (gult) drar förbi; traktorn har stannat vid ladan och Lova hoppar lugnt ner och går till bänken
c, b, P = gård(*HEL, pip_=dict(mood="skrattar", peka_r=VINKA), gurra_=dict(mood="blinkar"), lova_=dict(mood="forvanad", blick=(-9, 0)),
               lova_x=820, bil=dict(med_lova=False))
m, d = ritmask(c)   # kritsvepet: vägen till höger, den gula kritkanten drar förbi
d.polygon([(W * 0.9, 0), (W, 0), (W, H), (W * 0.84, H)], fill=255)
c.paste(VÄG, mask=m)
kritfyll(c, ImageChops.subtract(m.filter(ImageFilter.MaxFilter(61)), m), GUL, vick=0.5, oskarp=4)
x, y = P(985, 470)
arrow(c, båge(x - 45, y + 10, 60, 20, 160, steg=20, ry=70))   # ett lugnt hopp ner ur traktorn
arrow(c, [P(760, GOLV - 40), P(640, GOLV - 40)])              # och hon går mot bänken
frames["10"] = c

STÄNGD = dict(håll={"r": (SKIDA_STÄNGD, 260)})
ÖPPEN = dict(håll={"r": (SKIDA, 300)})
STÅ = dict(lova_=None)
c, b, P = gård(1.9, 330, 470, pip_=dict(mood="blinkar", peka_r=(1800, 300)), gurra_=dict(mood="nyfiken", blick=(9, 0)), lova_=dict(mood="nyfiken", blick=(-9, -3)))
arrow(c, [P(250, 380), P(380, 420)])
frames["11a"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="ropar", **ÖPPEN), gurra_=dict(mood="forvanad"), lova_=dict(mood="forvanad", blick=(-9, 3)))
arrow(c, [P(PLANTA_X - 30, 440), P(PIP_X + 70, 430)])
frames["11b"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="karleksfull", peka_r=(1600, 300), peka_l=(-400, 300)), gurra_=dict(mood="skrattar"), lova_=dict(mood="skrattar"))
for tx, ty in ((LOVA_X, 470), (GURRA_X, 440)):
    x0_, y0_ = P(PIP_X, SITS - 90)
    x1_, y1_ = P(tx, ty)
    arrow(c, [(x0_, y0_), ((x0_ + x1_) / 2, y0_ - 60), (x1_, y1_)])
frames["11b2"] = c
c, b, P = gård(*PIP_NÄR, pip_=dict(mood="ropar", håll={"r": (ÄRTA, 120)}, peka_r=(1400, 200)), gurra_=dict(mood="glad"), lova_=dict(mood="glad"))
frames["11c"] = c
PEA = {"håll": {"r": (ÄRTA, 110)}}
c, b, P = gård(*TVÅ, pip_=dict(mood="karleksfull", håll={"l": (ÄRTA, 120)}), gurra_=dict(mood="skrattar", håll={"r": (ÄRTA, 130)}),
               lova_=dict(mood="karleksfull", peka_l=(-300, 500), **PEA))
frames["11d"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="skrattar", peka_l=UPP_L, håll={"l": (ÄRTA, 120)}), gurra_=dict(mood="blinkar", peka_r=UPP_R, håll={"r": (ÄRTA, 130)}),
               lova_=dict(mood="njuter", peka_r=UPP_R, **PEA))
frames["11e"] = c


def ärta_på_golvet(x, y, båg=True, ringar=0, rull=False):
    def stuff(c, P, k):
        if båg:
            arrow(c, båge(*P(x + 30, y - 40), 40 * k, 160, 20, steg=20, ry=50 * k))
        for i in range(ringar):   # spökringarna där ärtan var
            px, py = P(x + 40 + i * 30, y)
            m, d = ritmask(c)
            r = 10 * k
            d.ellipse((px - r, py - r, px + r, py + r), outline=255, width=3)
            kritfyll(c, m, (255, 255, 255), alpha=0.7, vick=0.1, oskarp=0.6)
        if rull:
            arrow(c, [P(x + 120, y), P(x + 20, y)])
        place(c, ÄRTA, *P(x, y), 26 * k)
    return stuff


c, b, P = gård(*TVÅ, pip_=dict(mood="forvanad", håll={"l": (ÄRTA, 120)}), gurra_=dict(mood="forvanad", håll={"r": (ÄRTA, 130)}),
               lova_=dict(mood="forvanad", blick=(-6, 9), peka_l=(-300, 900)), stuff=ärta_på_golvet(470, GOLV - 2))
frames["13a"] = c
c, b, P = gård(*LÅG, pip_=dict(mood="skelogd"), gurra_=dict(mood="nyfiken", blick=(0, 9)), lova_=dict(mood="nyfiken", blick=(-9, 9)), lova_x=470,
               stuff=ärta_på_golvet(232, GOLV - 2, båg=False, ringar=3, rull=True))
frames["13b"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="forvanad", peka_l=UPP_L, håll={"l": (ÄRTA, 120)}), gurra_=dict(mood="forvanad", peka_r=UPP_R, håll={"r": (ÄRTA, 130)}),
               lova_=dict(mood="forvanad", peka_l=(-200, 400), blick=(-3, 6)))
frames["13b2"] = c


def lova_när(mood, **kw):
    """Närbild på Lova vid bänken: bondgården inzoomad runt hennes ansikte."""
    y = GOLV + 6 - (LOVA_FOT - 430) * LOVA_S
    return gård(6.0, LOVA_X, y + 10, lova_=dict(mood=mood, **kw))


c, b, P = lova_när("ledsen")
tår(c, *P(LOVA_X - 42 * LOVA_S * 1.0 - 8, GOLV + 6 - (LOVA_FOT - 450) * LOVA_S), 16); frames["13c"] = c
c, b, P = lova_när("nyfiken", peka_r=(1500, -200), peka_l=(-500, -200)); frames["13d"] = c

c, b, P = gård(*LÅG, pip_=dict(mood="forvanad", peka_r=UPP_R, peka_l=UPP_L), pip_golv=(255, 10), gurra_=dict(mood="forvanad"),
               lova_=dict(mood="forvanad", blick=(-9, 9)), lova_x=470, stuff=ärta_på_golvet(160, GOLV - 2, båg=False))
x, y = P(240, SITS - 30)
arrow(c, båge(x - 50, y, 50, 160, 20, steg=20)); frames["14a"] = c
c, b, P = gård(*LÅG, pip_=dict(mood="nyfiken", blick=(-9, 9)), pip_golv=(230, 0), gurra_=dict(mood="nyfiken", blick=(0, 9)),
               lova_=dict(mood="nyfiken", blick=(-9, 9)), lova_x=470, stuff=ärta_på_golvet(160, GOLV - 2, båg=False))
x, y = P(185, GOLV - 30)
for i in range(3):
    arrow(c, [(x + 30, y - 40 + i * 8), (x, y + i * 8)])
frames["14b"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="karleksfull", peka_r=(1500, -200), håll={"r": (ÄRTA, 120)}), gurra_=dict(mood="skrattar", håll={"r": (ÄRTA, 130)}),
               lova_=dict(mood="karleksfull", peka_l=(-400, 300), peka_r=VINKA))
frames["14c"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="karleksfull", peka_r=UPP_R, håll={"r": (ÄRTA, 120)}), gurra_=dict(mood="karleksfull", peka_r=UPP_R, håll={"r": (ÄRTA, 130)}),
               lova_=dict(mood="skrattar", peka_r=UPP_R, **PEA))
frames["14d"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="slickar", peka_r=(560, 470), håll={"r": (ÄRTA, 110)}),
               gurra_=dict(mood="slickar", peka_r=(560, 380), håll={"r": (ÄRTA, 120)}), lova_=dict(mood="slickar", peka_r=(540, 480), **PEA))
frames["14e"] = c
c, b, P = gård(*TVÅ, pip_=dict(mood="skrattar", peka_r=UPP_R, peka_l=UPP_L),
               gurra_=dict(mood="njuter", peka_r=UPP_R, peka_l=UPP_L), lova_=dict(mood="njuter", peka_r=UPP_R, peka_l=UPP_L))
frames["14f"] = c
# 14h Slutögonblicket: Pip håller upp den tomma skidan som ett grönt ljus (pling), alla pekar framåt; Lova står kvar bredvid
c, b, P = gård(*HEL2, pip_=dict(mood="ropar", peka_r=(900, -900), peka_l=(3000, 300)), pip_golv=(700, 0),
               gurra_=dict(mood="ropar", peka_r=(3000, 300)), gurra_golv=590, lova_=dict(mood="ropar", peka_r=UPP_R, peka_l=UPP_L),
               lova_x=930, bil=dict(med_lova=False), bil_x=1180)
x, y = P(722, GOLV - 118)
place(c, kant(TOM, 46 * 1.5), x, y, 46 * 1.5, rot=12)   # skidan högt uppe i vingen, som ett grönt ljus
pling(c, x + 10, y - 60, r=50)
frames["14h"] = c


# --- Danspausen och sista refrängen i discot, omfärgat till mint med en grön kula --------------------------------
SOLO_H, SOLO_FOT = 0.58 * H, 0.85 * H
KULA = (688, 78, 64)
IKON_BÅGE = [(288, 162), (488, 198), (888, 198), (1088, 162)]
IKON_R = 54


def mint_discot():
    hsv = np.asarray(Image.open(ROT / "avsnitt/006-orange-baten/scener/lager/disco-prickar.png").convert("RGB").convert("HSV"),
                     dtype=np.float32).copy()
    färgad = hsv[..., 1] > 25
    hsv[..., 0] = np.where(färgad, 112, hsv[..., 0])   # mint
    hsv[..., 1] = np.where(färgad, hsv[..., 1] * 0.5, hsv[..., 1])
    return Image.merge("HSV", [Image.fromarray(hsv[..., i].astype(np.uint8)) for i in range(3)]).convert("RGB").resize((W, H))


DISCO_BILD = mint_discot()
KULA_MITT, KULA_R0 = (513, 583), 298
_kula = Image.open(A / "bakgrunder/danspaus/cut/discokula.png").convert("RGBA")
_h = np.asarray(_kula.convert("RGB").convert("HSV")).copy()
_h[..., 0] = np.where(_h[..., 1] > 40, 85, _h[..., 0])
DISCOKULA = Image.merge("HSV", [Image.fromarray(_h[..., i]) for i in range(3)]).convert("RGBA")
DISCOKULA.putalpha(_kula.getchannel("A"))
IKONER = [(gurra("skrattar").crop((200, 150, 824, 600)), 80), (trafikljus("gron"), 100), (SKIDA, 70), (traktor(med_lova=False), 95)]


def skiva(c, i, x, y, skala=1.0):
    r, (im, hs) = IKON_R * skala, IKONER[i]
    h = hs * r / 60
    m, d = ritmask(c)
    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    kritfyll(c, m, (255, 255, 255), vick=0.3)
    place(c, im, x, y + h * 0.45, h * 0.9)


def disco(n=0):
    c = DISCO_BILD.copy()
    x, y, r = KULA
    bb, s = DISCOKULA.getbbox(), r / KULA_R0
    place(c, DISCOKULA, x - (KULA_MITT[0] - (bb[0] + bb[2]) / 2) * s, y + (bb[3] - KULA_MITT[1]) * s, (bb[3] - bb[1]) * s)
    stjärna(c, x - r * 0.4, y - r * 0.35, 9)
    for i in range(n):
        skiva(c, i, *IKON_BÅGE[i])
    return c


def dansare(c, im, x, h=SOLO_H, fot=SOLO_FOT, hopp=False):
    if hopp:
        arrow(c, [(x - h * 0.5, fot - h * 0.4), (x - h * 0.5, fot - h * 0.8)])
    place(c, kant(im, h), x, fot - (40 if hopp else 0), h)


def alla_dansar(c, n=0, mood="skrattar"):
    """Alla dansar i discot. Ingen traktor i discot: Lova står och dansar på golvet i sin jacka."""
    place(c, kant(pip(mood, peka_r=UPP_R, peka_l=UPP_L), 0.47 * H), 280, 0.96 * H, 0.47 * H)   # närmare: figurerna fyller nedre halvan
    place(c, kant(gurra(mood, peka_r=UPP_R, peka_l=UPP_L), 0.44 * H), W - 280, 0.96 * H, 0.44 * H)
    return place(c, kant(lova(mood, peka_r=UPP_R, peka_l=UPP_L), 0.58 * H), W / 2, 0.99 * H, 0.58 * H)


c = disco(); alla_dansar(c); frames["15a"] = c
c = disco(); dansare(c, gurra("ropar", peka_r=UPP_R, peka_l=UPP_L), W / 2, hopp=True); frames["15b"] = c
c = disco(); dansare(c, KAJSA, W / 2); arrow(c, båge(W / 2, SOLO_FOT - SOLO_H * 1.05, 90, 160, 20, steg=20)); frames["15c"] = c
c = disco(); place(c, kant(FIA, 260), W / 2, H * 0.62, 260); arrow(c, båge(W / 2, H * 0.45, 260, 200, -20, steg=15, ry=150)); frames["15d"] = c
c = disco(); alla_dansar(c, mood="ropar"); place(c, kant(FIA, 120), W * 0.72, H * 0.4, 120); frames["15e"] = c

# 16a Sammanfattningen: saken på ordet stor mitt i bild på en vit kritskiva, och den flyger upp i raden överst
c = disco(3)
skiva(c, 0, W / 2, H * 0.56, 2.6)
arrow(c, [(W / 2 - 150, H * 0.3), (IKON_BÅGE[0][0] + 70, IKON_BÅGE[0][1] + 70)])
frames["16a"] = c
c = disco(4); b = alla_dansar(c, mood="ropar"); frames["16b"] = c
c = disco(4)
b = place(c, kant(lova("karleksfull", peka_r=(1600, 100)), 0.6 * H), W / 2 - 80, 0.99 * H, 0.6 * H)
ärtbubbla(c, W * 0.8, H * 0.5)
arrow(c, båge(W * 0.8, H * 0.5, 150, 200, -120, steg=20)); frames["16c"] = c
c = disco(4)
place(c, kant(pip("karleksfull", peka_r=VINKA), 0.46 * H), 280, 0.96 * H, 0.46 * H)
place(c, kant(gurra("blinkar", peka_r=VINKA), 0.43 * H), W - 280, 0.96 * H, 0.43 * H)
b = place(c, kant(lova("karleksfull", peka_r=VINKA), 0.6 * H), W / 2, 0.99 * H, 0.6 * H)
frames["16d"] = c

# 17 Outrot på åkern: Lova kör och vinkar, ärtplantorna har vuxit upp bakom henne, Pip och Gurra dansar i kanten
def outro_åker(c):
    åker(c)
    for i, x in enumerate((90, 210, 330, 450)):   # bakom traktorn (den kör åt höger)
        h = 70 + 20 * i   # den senaste plantan är störst
        place(c, grodd(h), x, 640 + 18 * (i % 2), h)


def outro():
    c, b = körscen(stuff=outro_åker, fart=False, cx=700, mood="skrattar")
    place(c, kant(pip("skrattar", peka_r=UPP_R, peka_l=UPP_L), 0.28 * H), W - 250, 0.98 * H, 0.28 * H)
    place(c, kant(gurra("glad", peka_r=UPP_R, peka_l=UPP_L), 0.26 * H), W - 95, 0.98 * H, 0.26 * H)
    return c, b


c, b = outro()
for x in (330, 450):
    arrow(c, [(x, 720), (x, 650)])   # plantorna växer upp
frames["17"] = c

# 17b Kritirisen sluter sig runt Lova i traktorn
c, b = outro()
fx, fy = pt(b, *lova_punkt(512, 430))
fx, fy = fx - 20, fy - 15   # mitt på ansiktet
m, d = ritmask(c)
d.rectangle((0, 0, W, H), fill=255)
d.ellipse((fx - 150, fy - 150, fx + 150, fy + 140), fill=0)
c.paste((18, 18, 20), mask=m.filter(ImageFilter.GaussianBlur(3)))   # svart utanför cirkeln
ring = ImageChops.subtract(m.filter(ImageFilter.MaxFilter(1)), m.filter(ImageFilter.MinFilter(25)))
kritfyll(c, ring.filter(ImageFilter.MaxFilter(9)), (60, 60, 64), vick=0.5, oskarp=2)   # kritkanten
stjärna(c, fx + 110, fy - 120, 16, sken=True)
frames["17b"] = c

frames = {k: papperskorn(v.convert("RGB")) for k, v in frames.items()}
(HÄR / "frames").mkdir(exist_ok=True)
for k, v in frames.items():
    v.save(HÄR / "frames" / f"{k}.jpg", quality=88)

assert sorted(s[0] for s in SHOTS) == sorted(frames), (set(s[0] for s in SHOTS) ^ set(frames))

KARTA = {
    "Intro – kritan ritar": ["02", "02a", "02a", "02b", "02b", "02b", "02c", "02c"],
    "Vers 1": ["03b", "03b", "04", "04"],
    "Refräng": [f"05{b}" for b in "abcdefgh"],
    "Grön sak 1 – grodan": ["06"],
    "Grön sak 2 – trafikljuset": ["07a", "07a", "07b", "07c", "07c", "07c"],
    "Frågan till tittaren": ["08a", "08a", "08a", "08a", "08a", "08b", "08c"],
    "Refräng #2": [f"09{b}" for b in "abcdefg"] + ["10"],
    "Grön sak 3 – ärtorna (bondgården)": ["10", "11a", "11b", "11b", "11b2", "11c"],
    "Vers 2 – problemet": ["13a", "13b", "13b", "13b2", "13c", "13d", "13d", "13d"],
    "Vers 3 – lösningen": ["14a", "14a2", "14b", "14c", "14d", ["14e", "14f"], "14g", "14h"],
    "Danspaus": ["15a", "15b", "15c", "15d", "15e"],
    "Sista refrängen – sammanfattning": ["16a", "16a", "16a", "16b", "16c", "16d"],
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
for sid, _, sc, rad, vad, kamera in SHOTS:
    if sc != scen:
        if scen:
            rows.append("</div>")
        rows.append(f'<h3><span class="dot" style="background:{FÄRG[sc]}"></span>{html.escape(sc)}</h3><div class="frames">')
        scen = sc
    rows.append(
        f'<figure class="frame"><img src="frames/{sid}.jpg" alt="{html.escape(vad)}" width="960" height="536" loading="lazy">'
        f'<figcaption><div class="t">{sid} · {TID[sid]}</div>'
        + (f'<p class="line">{html.escape(repliker(rad))}</p>' if repliker(rad) else "")
        + sång_html(sid) + f'<p>{html.escape(vad)}</p><span class="tag">{html.escape(kamera)}</span></figcaption></figure>')
rows.append("</div>")

tl = []
for (sid, _, sc, *_), (a, b, _) in zip(SHOTS, tider()):
    tl.append(f'<div style="left:{a / SLUT * 100:.2f}%;width:{(b - a) / SLUT * 100:.2f}%;background:{FÄRG[sc]}" title="{sid} {TID[sid]}">{sid}</div>')

ph_ = ("<li><b>Platshållare</b> (platta former tills bilderna finns): "
       + ", ".join(f"<code>{html.escape(p)}</code>" for p in dict.fromkeys(PLATSHÅLLARE)) + ".</li>") if PLATSHÅLLARE else \
      "<li><b>Platshållare:</b> inga, alla saker är riktiga bilder ur <code>assets/</code>. </li>"
mätta = sum(1 for s in SHOTS if s[0] in SÅNGTID)

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gröna sången: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#2E8B3E;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --red:#7fd08a; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --red:#7fd08a; color-scheme:dark }}
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
.song {{ border-left:3px solid #3FA34D; padding-left:10px; display:grid; gap:1px }}
.sh {{ font:500 11px var(--mono); color:var(--muted); margin-top:4px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
.pause {{ justify-self:start; font:500 11px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:1px 8px; margin:2px 0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
.utkast {{ display:inline-block; margin-top:14px; font:500 12px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:3px 10px }}
</style></head><body><div class="wrap">
<h1>Gröna sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 014, första utkast. Bilderna är byggda av utklippen i <code>assets/</code> med ansiktena ritade i kod. Pilarna visar rörelsen.</p>
<span class="utkast">Tiderna ur rader.txt (sang.m4a, tagning 1, 3:26.4, ca 85 bpm), avsnittstid = sångtid + 11 s. {mätta} av {len(SHOTS)} bilder mätta.</span>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>3 + 2</b><span>figurer + statister</span></div><div><b>1</b><span>körscen</span></div><div><b>6</b><span>kamerainställningar (max 6)</span></div><div><b>≈{mmss(SLUT)}</b><span>längd</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Ekot sjungs av kören. Varje grön sak har en rörelse i bild: hopp (06), vänta och kör (07b–c), zipp (08c), en, två, tre (11b).</li>
<li><b>Refrängen är Ärtresan</b> (05, 09), likadan varje gång: ärtorna poppar upp på vägen, det stora trafikljuset lyser grönt och vägen blir grön, klipp till vägen där tre ärtor hoppar in efter traktorn, ärtan på taket, putt, putt, tut, tut med ärtorna som ett litet tåg och ett kritsvep hem. Sista refrängen (16) står kvar i discot med raden av småbilder.</li>
<li><b>Traktorn</b> är i lager: flaggan, ryggstödet med bakre stolpen, Lova, framdelen med taket och främre stolpen, hjulen och Lovas armar. Lovas gröna jacka och ärmar, flaggan och trafikljusets tända lampa är kod.</li>
<li><b>Bondgården</b>: bänken, staketet och ärtplantan är ritade i kod. Lova hoppar ner ur traktorn i 10, står på egna ben vid bänken (lemmar-riggen, ben och allt) och stannar där till slutet (14h); traktorn står parkerad i kanten. Pip sitter framför den röda dörren. Pips näbb är klippt ur kycklingen-pip.png och är hennes mun.</li>
{ph_}
<li><b>Sångraderna</b> under varje bild läses ur sang.md (♪ sjungs, gul lapp = paus eller lucka). Fetstilt = repliker.</li>
<li><b>Tiderna</b> läggs in i <code>SÅNGTID</code> överst i bygg.py när rader.txt finns; resten räknas om.</li>
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
tabell = ["| # | Tid (≈ = uppsk.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |", "|---|---|---|---|---|---|"]
for sid, _, sc, rad, vad, kamera in SHOTS:
    tabell.append(f"| {sid} | {TID[sid]} | {sc} · {kamera} | {vad} | {repliker(rad)} | {sång_md(sid)} |".replace("\n", " "))
if md.exists():
    text = md.read_text(encoding="utf-8")
    start, slutm = "<!-- tabell: skrivs av storyboard/bygg.py -->", "<!-- /tabell -->"
    if start in text:
        före, _, rest = text.partition(start)
        _, _, efter = rest.partition(slutm)
        md.write_text(före + start + "\n" + "\n".join(tabell) + "\n" + slutm + efter, encoding="utf-8")
print(f"{len(frames)} bilder, längd ≈{mmss(SLUT)}, index.html klar" + (f", platshållare: {', '.join(dict.fromkeys(PLATSHÅLLARE))}" if PLATSHÅLLARE else ", inga platshållare"))
