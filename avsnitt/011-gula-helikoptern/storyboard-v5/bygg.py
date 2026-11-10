"""Bildstoryboarden och animatiken för 011 Gula sången v5.

Kör från den här mappen:
  ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py            # frames/<id>.jpg + index.html
  ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py --animatik # + animatik.mp4 (bilderna på tabellens tider, sången och Malins repliker)

Ritverktygen (helikoptern, Lage, jättesolen, discot, kritan) hämtas ur ../storyboard-v2/bygg.py.
"""
import math
import runpy
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

HÄR = Path(__file__).resolve().parent
ANIMATIK = "--animatik" in sys.argv
V = runpy.run_path(str(HÄR.parent / "storyboard-v2/bygg.py"), run_name="v2")
for k in ("W", "H", "VIT", "GRÅ", "fyll", "place", "crop_zoom", "sätt", "fig", "bild", "himmel", "MOLN", "jättesol", "glitter",
          "KAR", "KAR_FRAM", "TOPP", "ÖPP", "HW", "HH_", "LAGE_X", "LAGE_FOT", "LAGE_K", "LAGE_ANSIKTE", "på", "nära", "vind",
          "BANAN", "papperskorn", "sol", "tabell", "sida", "TOFSEN"):
    globals()[k] = V[k]
G = V["G"]
pil, båge = G["pil"], G["båge"]

# --- Ängen ------------------------------------------------------------------------------------------------------
ÄNG = bild("bakgrunder/angen/angen-v2.png").resize((W, H), Image.LANCZOS)
GOLV = round(0.72 * H)
BLOMMA = bild("rekvisita/blommor-gula/cut/blomma-gul-1.png")


def ängen(sol_xy=(1180, 150), sol_r=0):
    c = ÄNG.copy()
    if sol_r:
        sol(c, *sol_xy, sol_r, "glad", kant=True)
        place(c, MOLN["mellan"], sol_xy[0] - 60, sol_xy[1] + 70, 110)   # solen bakom ett moln
    return c


# --- Helikoptern med en bubbla som kan öppnas (fälls upp bakåt kring bakre kanten) --------------------------------
def heli(mood="glad", lyft_r=0, lyft_l=0, blick=(0, 0), rotor=1.0, öppen=0.0, svans=False):
    c = V["heli"](mood=mood, lyft_r=lyft_r, lyft_l=lyft_l, blick=blick, rotor=rotor, bubbla=öppen == 0, svans=svans)
    cx, by = ÖPP[0], TOPP + ÖPP[1]
    rx, ry = ÖPP[2] + 25, 470
    if öppen:   # locket fälls upp bakåt kring bakre kanten; punkterna vrids för hand (rotate() gav en mörk kant)
        hx, hy, v = cx - rx, by, math.radians(55 * öppen)
        vrid = lambda x, y: (hx + (x - hx) * math.cos(v) + (y - hy) * math.sin(v), hy - (x - hx) * math.sin(v) + (y - hy) * math.cos(v))
        båg = [vrid(cx + rx * math.cos(a), by + ry * math.sin(a)) for a in (math.radians(180 + i * 3) for i in range(61))]
        lag = Image.new("RGBA", c.size)
        d = ImageDraw.Draw(lag)
        d.line(båg, fill=(255, 255, 255, 235), width=16, joint="curve")   # bara glasets båge: en fyllning blev mörk i bakningen
        c.alpha_composite(lag)
        c.putpixel((cx, by - ry - 100), (255, 255, 255, 1))   # samma höjd som med stängd bubbla, så att skalan står still
    return c


def lägg(c, cx, botten, h, rot=0, **kw):
    return place(c, heli(**kw), cx, botten, h, rot=rot, bakad=True)


def banan_moln(c, x, y, h=150):
    place(c, MOLN["litet"], x, y + h * 0.45, h * 0.8)
    place(c, BANAN, x, y, h, rot=-10)


def humle(c, x, y, k=0.18, mood="jatteglad"):
    sätt(c, fig("humle", mood), x, y, k)


def hakan_lyser(c, b):
    x, y = på(b, (LAGE_ANSIKTE[0], LAGE_ANSIKTE[1] + 150))
    lag = Image.new("RGBA", c.size)
    ImageDraw.Draw(lag).ellipse((x - 55, y - 18, x + 55, y + 18), fill=(255, 220, 70, 170))
    c.alpha_composite(lag.filter(ImageFilter.GaussianBlur(8)))


# --- Discot: Lage, Kajsa och Gurra (Sanna: "3 animals dancing remove humla"), Humle vid kulan -------------------
MG = V["disco_bild"].__globals__                      # v2-modulens riktiga globaler (runpy ger en kopia)
MG["DANSARE"] = [("lage", 300), ("gurra", 688), ("kajsa", 1076)]   # grodan i mitten: plats för klistermärket ovanför
MG["DSKALA"] = MG["DSKALA"] | {"lage": 0.44}
MG["hatt"] = lambda *a, **k: None                     # ingen hatt i v5
_klister = MG["klistermärke"]


def klistermärke(c, x, y, r, sak):
    if sak == "sol":
        fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.05, oskarp=1)
        sol(c, x, y, r * 0.62, "glad")
    elif sak == "blomma":
        fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.05, oskarp=1)
        place(c, BLOMMA, x, y + r * .7, r * 1.4)
    else:
        _klister(c, x, y, r, sak)


MG["klistermärke"] = klistermärke
disco_bild = V["disco_bild"]
BÅGE = [(530, 150, "heli"), (846, 150, "sol"), (330, 250, "banan"), (1046, 250, "humle"), (230, 380, "blomma")]


def disco(**kw):
    c = disco_bild(**kw)
    humle(c, W / 2 + 150, 250, 0.14)
    return c


# --- Bilderna ---------------------------------------------------------------------------------------------------
def B():
    v2 = V["B"]()
    f = {k: v2[k] for k in ("00", "01a", "01b", "01c")}

    def g():
        c = ängen(sol_r=70)
        place(c, V["heli"](lage=False), 470, GOLV + 160, 400)
        sätt(c, fig("lage", "neutral"), 900, GOLV + 170, 0.32)
        return c
    f["02a"] = g
    def g():
        c = ängen(sol_r=70)
        place(c, V["heli"](lage=False), 470, GOLV + 160, 400)
        sätt(c, fig("lage", "ledsen"), 900, GOLV + 170, 0.32)
        return crop_zoom(c, 900, GOLV - 90, 620)
    f["02b"] = g
    def g():
        c = ängen(sol_r=70)
        place(c, V["heli"](lage=False), 470, GOLV + 160, 400)
        glitter(c, 470, GOLV - 60, 190, 8)
        sätt(c, fig("lage", "nyfiken", blick=(-0.8, -0.3)), 900, GOLV + 170, 0.32)
        return c
    f["02c"] = g
    def g():
        c = ängen(sol_r=70)
        lägg(c, 560, GOLV + 160, 430, mood="glad", rotor=0.55)
        vind(c, 560, GOLV + 120, 2)
        return c
    f["02d"] = g
    def g():
        c = himmel(120)
        sol(c, 1210, 170, 95, "glad", kant=True)
        lägg(c, 560, 640, 470, mood="jatteglad", lyft_r=140)
        return c
    f["02e"] = g
    def g():
        c = himmel(150)
        b = lägg(c, 600, 820, 620, mood="glad", rotor=0.4)
        return crop_zoom(c, 600, 260, 900)
    f["03a"] = g
    def g():
        c = himmel(170)
        lägg(c, 600, 560, 470, mood="jatteglad", lyft_r=60, lyft_l=60)
        pil(c, [(1000, 640), (1000, 380)])
        return c
    f["03b"] = g

    def solen(mood="jatteglad", sol_mood="glad", flod=0.0, med=False, **kw):
        c = jättesol(flod, sol_mood)
        b = lägg(c, 520, 650, 440, mood=mood, **kw)
        if med:
            x, y = på(b, (ÖPP[0] + 640, TOPP - 40) if not kw.get("öppen") else (ÖPP[0] + 300, TOPP - 380))
            humle(c, x, y + 110, 0.2)
        return c, b
    f["03c"] = lambda: solen("jatteglad")[0]
    for p, med in (("04", False), ("07", True)):
        f[p + "a"] = lambda med=med: solen(lyft_r=150, lyft_l=150, med=med)[0]
        def g(med=med):
            c, b = solen("glad", lyft_r=170, med=med)
            x, y = på(b, (LAGE_X + 120, LAGE_ANSIKTE[1] - 260))
            pil(c, båge(x, y, 120, 70, -30, 300, 16))
            return c
        f[p + "b"] = g
        f[p + "c"] = lambda med=med: solen("jatteglad", "blinkar", lyft_r=160, med=med)[0]
        def g(med=med):   # bananen svävar fram på ett moln från solen; bubblan öppnas och Lage tar den
            c, b = solen("jatteglad", öppen=1.0, lyft_r=60, med=med)
            x, y = på(b, (LAGE_X + 470, LAGE_ANSIKTE[1] + 40))
            banan_moln(c, x, y, 130)
            pil(c, [(930, 330), (x + 60, y - 60)])
            return c
        f[p + "d"] = g
        def g(med=med):
            c, b = solen("jatteglad", lyft_r=-20, lyft_l=-20, med=med)
            return nära(c, b)
        f[p + "e"] = g
        f[p + "f"] = lambda med=med: solen("fnissig", "blinkar", flod=1.0, med=med)[0]

    def g():
        c = ängen()
        lägg(c, 560, GOLV + 120, 430, mood="glad", rotor=0.55)
        pil(c, [(560, GOLV - 380), (560, GOLV - 290)])
        return c
    f["05a"] = g
    def g():
        c = ängen()
        lägg(c, 560, GOLV + 160, 430, mood="nyfiken", rotor=0, lyft_r=130, blick=(1, -0.4))
        humle(c, 1240, 230, 0.05, "glad")
        return c
    f["05b"] = g
    def g():
        c = ängen()
        b = lägg(c, 560, GOLV + 160, 430, mood="fnissig", rotor=0)
        x, y = på(b, (ÖPP[0] + 560, TOPP - 60))
        pil(c, båge(x - 40, y + 20, 110, 60, -40, 300, 16))
        humle(c, x, y + 120, 0.2)
        return c
    f["05c"] = g
    def g():
        c = ängen()
        b = lägg(c, 560, GOLV + 160, 430, mood="nyfiken", rotor=0, blick=(0.6, 1))
        humle(c, 900, 360, 0.16, "nyfiken")
        place(c, BLOMMA, 860, GOLV + 150, 90)
        return c
    f["05d"] = g
    def g():
        c = ängen()
        lägg(c, 560, GOLV + 160, 430, mood="forvanad", rotor=0, blick=(0.6, 1))
        place(c, BLOMMA, 860, GOLV + 180, 170)
        glitter(c, 860, GOLV + 50, 100)
        return crop_zoom(c, 800, GOLV - 20, 800)
    f["05e"] = g
    def g():
        c = ängen()
        b = lägg(c, 560, GOLV + 160, 430, mood="fnissig", rotor=0, öppen=1.0, lyft_r=60)
        hakan_lyser(c, b)
        x, y = på(b, (LAGE_ANSIKTE[0] + 40, LAGE_ANSIKTE[1] + 330))
        place(c, BLOMMA, x, y, 50)
        return nära(c, b)
    f["05f"] = g
    def g():
        c = ängen()
        b = lägg(c, 560, GOLV - 40, 430, mood="jatteglad", rotor=0.4, lyft_r=60, lyft_l=60)
        x, y = på(b, (ÖPP[0] + 100, -120))
        humle(c, x, y, 0.14)
        vind(c, 560, GOLV + 120, 3)
        return c
    f["06a"] = g
    f["06b"] = lambda: solen("jatteglad", med=True)[0]
    f["08a"], f["08b"], f["08c"] = v2["05a"], v2["05c"], v2["05d"]

    def g():
        c = himmel(420)
        b = lägg(c, 620, 640, 440, mood="glad")
        humle(c, 240, 400, 0.13)
        return c
    f["09a"] = g
    def g():
        return disco(solo={"kajsa": dict(lyft=130), "gurra": dict(lyft=130)}, heli_in=True)
    f["09b"] = g
    f["10a"] = lambda: disco(lyft=120)
    f["10b"] = lambda: disco(lyft=150)
    f["10c"] = lambda: disco(solo={"lage": dict(mood="jatteglad", lyft=75)})
    f["10d"] = lambda: disco(solo={"kajsa": dict(mood="jatteglad", lyft=40, luta=10)})
    f["10e"] = lambda: disco(solo={"gurra": dict(mood="fnissig", lyft=-15)})
    f["10f"] = lambda: disco(solo={"lage": dict(mood="blinkar", lyft=110, lyft_l=0)})
    f["10g"] = lambda: crop_zoom(disco(lyft=150), W / 2, 520, 1050)
    f["10h"] = lambda: crop_zoom(disco(lyft=75), W / 2, 520, 1050)
    f["10i"] = lambda: crop_zoom(disco(lyft=40, luta=8), W / 2, 520, 1050)
    f["10j"] = lambda: crop_zoom(disco(mood="fnissig", lyft=-15), W / 2, 520, 1050)
    f["10k"] = lambda: disco(lyft=165)
    saker = ["heli", "sol", "banan", "humle", "blomma"]
    for i, (rad, sak) in enumerate(zip("abcde", saker)):
        f["11" + rad] = lambda i=i, sak=sak: disco(stickers=BÅGE[:i], stort=sak, solo={})
    f["11f"] = lambda: disco(stickers=BÅGE, solo={"lage": dict(mood="stolt", lyft=120, hopp=20)})
    f["11g"] = lambda: disco(stickers=BÅGE, mood="fnissig", lyft=-15)
    f["12a"] = lambda: disco(stickers=BÅGE, heli_in=True, solo={"kajsa": dict(lyft=130), "gurra": dict(lyft=130), "lage": dict(mood="jatteglad", lyft=140)})
    def g():
        c = himmel(500)
        sol(c, 1200, 200, 110, "blinkar", kant=True)
        b = lägg(c, 600, 640, 440, mood="jatteglad", lyft_r=140)
        x, y = på(b, LAGE_ANSIKTE)
        m = Image.new("L", (W, H), 255)
        ImageDraw.Draw(m).ellipse((x - 300, y - 270, x + 300, y + 270), fill=0)
        c.paste((20, 20, 24), mask=m.filter(ImageFilter.GaussianBlur(6)))
        return c
    f["12b"] = g
    return f


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + float(s)


def animatik(rader):
    """Varje bild står från sin tid till nästa rads tid. Sången börjar på 23,4 s, Malins repliker på sina tider."""
    SLUT = 23.4 + 213.2
    lista = HÄR / "frames" / "lista.txt"
    with open(lista, "w") as fh:
        for i, r in enumerate(rader):
            t0 = sek(r["tid"])
            t1 = sek(rader[i + 1]["tid"]) if i + 1 < len(rader) else SLUT
            fh.write(f"file '{r['id']}.jpg'\nduration {max(t1 - t0, 0.04):.3f}\n")
        fh.write(f"file '{rader[-1]['id']}.jpg'\n")
    R = HÄR.parents[2] / "assets/ljud/roster"
    ljud = [(HÄR.parent / "sang-v5.m4a", 23.4, 1.0), (R / "titta-4.m4a", 9.2, 1.0), (R / "nagot-langt-1.m4a", 13.5, 1.0),
            (R / "en-banan-en-gul-banan-1.m4a", 20.0, 1.0), (R / "nu-flyger-vi-1.m4a", 22.2, 1.0)]
    ljud = [l for l in ljud if l[0].exists()]
    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lista)]
    for p, _, _ in ljud:
        cmd += ["-i", str(p)]
    mix = "".join(f"[{i + 1}:a]adelay={round(t * 1000)}|{round(t * 1000)},volume={v}[a{i}];" for i, (_, t, v) in enumerate(ljud))
    mix += "".join(f"[a{i}]" for i in range(len(ljud))) + f"amix=inputs={len(ljud)}:normalize=0[ut]"
    cmd += ["-filter_complex", mix, "-map", "0:v", "-map", "[ut]", "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "22",
            "-c:a", "aac", "-b:a", "160k", "-t", f"{SLUT + 2:.1f}", str(HÄR / "animatik.mp4")]
    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    (HÄR / "frames").mkdir(exist_ok=True)
    mg = V["tabell"].__globals__                     # tabell() läser HÄR/storyboard.md: peka om tillfälligt
    mg["HÄR"] = HÄR
    rader = V["tabell"]()
    mg["HÄR"] = HÄR.parent / "storyboard-v2"
    valda = [a for a in sys.argv[1:] if not a.startswith("--")]
    f = B()
    saknas = []
    for r in rader:
        if r["id"] not in f:
            saknas.append(r["id"])
            continue
        if valda and r["id"] not in valda:
            continue
        papperskorn(f[r["id"]]()).convert("RGB").resize((960, 536), Image.LANCZOS).save(HÄR / "frames" / f"{r['id']}.jpg", quality=86)
        print(r["id"], end=" ", flush=True)
    sidan = V["sida"](rader).replace("storyboard v2", "storyboard v5").replace(
        "Avsnitt 011, tagning 2 (2:28.0). En stillbild per rad i <code>storyboard.md</code>, avsnittstid = sångtid + 24,5 s.",
        "Avsnitt 011, Gula sången v5 (3:33.2). En stillbild per rad i <code>storyboard.md</code>, avsnittstid = sångtid + 23,4 s. Animatiken: <code>animatik.mp4</code>.")
    (HÄR / "index.html").write_text(sidan, encoding="utf-8")
    print(f"\nklart, utan bild: {saknas}")
    if ANIMATIK and not saknas:
        animatik(rader)
        print("animatik.mp4")
