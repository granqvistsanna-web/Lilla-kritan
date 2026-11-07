# Människofigurer (Olle, mor): kropp utan lemmar och ritade armar och ben, allt i kod.
# 1. Kroppen: den ansiktslösa bilden utan armar (klipps längs äggets kant) och utan ben (allt under ägget).
# 2. verktyg/delar.py ger vridpunkterna.
# 3. Armarna ritas som en ärm i tröjans krita med en rund hand, benen i byxornas/benens färg med en sko.
#    Färgerna tas från figurens egna armar, ben och skor, strukturen från kroppen.
# ~/.claude/skills/ai-video/.venv/bin/python -I verktyg/rita-lemmar-manniska.py assets/karaktarer/pojken-olle olle
import json, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops
from scipy import ndimage

mapp, namn = Path(sys.argv[1]), sys.argv[2]

PY = Path.home() / ".claude/skills/ai-video/.venv/bin/python"
src = np.asarray(Image.open(mapp / f"{namn}-faceless.png").convert("RGB"))
fig = ndimage.binary_fill_holes(ndimage.binary_closing(src.astype(int).sum(2) < 700, iterations=3))

# Radernas vänster- och högerkant (bara den längsta biten per rad).
kant = {}
for y in range(1024):
    xs = np.nonzero(fig[y])[0]
    if len(xs):
        bitar = np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1)
        b = max(bitar, key=len)
        kant[y] = (b[0], b[-1], len(bitar))
# Benen börjar där raden delar sig i två lika stora bitar längst ner.
def tva_ben(y):
    xs = np.nonzero(fig[y])[0]
    bitar = [b for b in np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1) if len(b) > 30] if len(xs) else []
    return len(bitar) == 2
ben_y = min(y for y in range(700, 1000) if all(tva_ben(y + k) for k in range(0, 12, 3)))
# Armarna: rader där kanten sticker ut mer än en jämn kurva genom äggets kant ovanför och nedanför.
rader = [y for y in kant if 380 <= y < ben_y - 30]
ys = np.array(rader)
L, R = np.array([kant[y][0] for y in rader]), np.array([kant[y][1] for y in rader])
for _ in range(3):  # anpassa, släng utstickare, anpassa igen
    pl, pr = np.polyfit(ys, L, 2), np.polyfit(ys, R, 2)
    ok = (L > np.polyval(pl, ys) - 8) & (R < np.polyval(pr, ys) + 8)
    pl, pr = np.polyfit(ys[ok], L[ok], 2), np.polyfit(ys[ok], R[ok], 2)
    ys, L, R = ys[ok], L[ok], R[ok]
yy, xx = np.mgrid[0:1024, 0:1024]
# Klipp bara de rader där armen sticker ut, och bara på den sidan.
fl, fr = np.polyval(pl, yy), np.polyval(pr, yy)
ut_l = np.array([y in kant and 380 <= y < ben_y - 30 and kant[y][0] < np.polyval(pl, y) - 6 for y in range(1024)])
ut_r = np.array([y in kant and 380 <= y < ben_y - 30 and kant[y][1] > np.polyval(pr, y) + 6 for y in range(1024)])
ut_l = ndimage.binary_dilation(ut_l, iterations=6)[:, None]
ut_r = ndimage.binary_dilation(ut_r, iterations=6)[:, None]
kropp = fig & (~ut_l | (xx >= fl - 2)) & (~ut_r | (xx <= fr + 2)) & (yy < ben_y)
ut = np.full_like(src, 255)
ut[kropp] = src[kropp]
Image.fromarray(ut).save(mapp / f"{namn}-body.png")

# Färger från de gamla lemmarna: ärmens färg, handen, benet och skon.
lemmar = fig & ~ndimage.binary_dilation(kropp, iterations=4)
def median(m):
    return tuple(int(v) for v in np.median(src[m], axis=0))
arm_m = lemmar & (yy < ben_y - 60)
ben_m = lemmar & (yy >= ben_y)
skor_y = np.nonzero(ben_m.any(1))[0].max()
fot = ben_m & (yy > skor_y - 30)
ben = ben_m & (yy < skor_y - 50)
ytterst = np.zeros_like(arm_m)
for sida in (-1, 1):  # handen: de yttersta pixlarna i varje gammal arm
    m = arm_m & ((xx - 512) * sida > 0)
    ytterst |= m & ((xx - 512) * sida > ((xx - 512) * sida)[m].max() - 14)
farg = {"arm": median(kropp & (yy > ben_y - 160) & (yy < ben_y - 60)), "hand": median(ytterst),
        "ben": median(ben), "sko": median(fot)}
botten = skor_y

# Vridpunkter: armen vid kroppens kant mitt i de rader där den gamla armen satt, benen mitt i varje ben.
delar = {}
for etikett, rad, kurva, sida in (("arm-l", ut_l, pl, -1), ("arm-r", ut_r, pr, 1)):
    ym = int(np.nonzero(arm_m & ((xx - 512) * sida > 0))[0].mean()) - 25   # lite ovanför den gamla armens mitt
    delar[etikett] = {"vridpunkt": [int(np.polyval(kurva, ym)) - sida * 10, ym]}
ry = ben_y + 20
xs = np.nonzero(fig[ry])[0]
for etikett, b in zip(("leg-l", "leg-r"), sorted((b for b in np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1) if len(b) > 30), key=lambda b: b[0])):
    delar[etikett] = {"vridpunkt": [int(b.mean()), ry]}
(mapp / "cut").mkdir(exist_ok=True)
subprocess.run([str(PY), "-I", str(Path.home() / ".claude/skills/ai-video/scripts/cutout.py"),
                str(mapp / f"{namn}-body.png"), str(mapp / "cut" / f"{namn}-body.png"), "8", "999999999"], check=True)
subprocess.run([str(PY), "-I", str(Path.home() / ".claude/skills/ai-video/scripts/cutout.py"),
                str(mapp / f"{namn}-faceless.png"), str(mapp / "cut" / f"{namn}-faceless.png"), "8", "999999999"], check=True)

# Struktur: kroppens krita som ljusvariation runt 1.0.
lum = np.asarray(Image.open(mapp / f"{namn}-body.png").convert("L")).astype(float)
bit = lum[620:740, 420:600]
bit = bit / bit.mean()
tex = np.tile(bit, (1024 // bit.shape[0] + 1, 1024 // bit.shape[1] + 1))[:1024, :1024]

SS = 4; N = 1024 * SS
def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)
def lager(ritning):
    m = Image.new("L", (N, N), 0); ritning(ImageDraw.Draw(m))
    return m.resize((1024, 1024), Image.LANCZOS)
def farglagd(col):
    return Image.fromarray(np.clip(np.array(col)[None, None, :] * tex[..., None], 0, 255).astype(np.uint8))

nya = {}
for etikett, d in delar.items():
    p, sida = d["vridpunkt"], 1 if etikett.endswith("-r") else -1
    if etikett.startswith("arm"):
        slut = (p[0] + sida * 56, p[1] + 44)   # korta stumpar som hänger lite nedåt, som i bilden
        lagren = [(lager(lambda dr: kapsel(dr, (p[0] - sida * 45, p[1] - 15), slut, 30, 26)), farg["arm"]),
                  (lager(lambda dr: dr.ellipse([(slut[0] + sida * 3 - 19) * SS, (slut[1] + 14 - 19) * SS,
                                                 (slut[0] + sida * 3 + 19) * SS, (slut[1] + 14 + 19) * SS], fill=255)), farg["hand"])]
    else:
        fx, fy = p[0] + sida * 12, botten - 22
        lagren = [(lager(lambda dr: kapsel(dr, (p[0], p[1] - 50), (p[0] + sida * 4, fy - 14), 34, 32)), farg["ben"]),
                  (lager(lambda dr: dr.ellipse([(fx - 48) * SS, (fy - 24) * SS, (fx + 48) * SS, (fy + 22) * SS], fill=255)), farg["sko"])]
    hela = lagren[0][0]
    for m, _ in lagren[1:]:
        hela = ImageChops.lighter(hela, m)
    rim = hela.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim)
    for m, col in lagren:
        im.paste(farglagd(col), mask=m)
    im.putalpha(ImageChops.lighter(rim, hela))
    fil = f"cut/{namn}-{etikett}.png"
    im.save(mapp / fil)
    nya[etikett] = {"fil": fil, "vridpunkt": p}

json.dump({"storlek": 1024, "kropp": f"cut/{namn}-body.png", "delar": nya, "ritadeDelar": True},
          open(mapp / f"{namn}-rigg.json", "w"), indent=2, ensure_ascii=False)
print(namn, "benen börjar", ben_y, "färger", farg, "delar", {k: v["vridpunkt"] for k, v in nya.items()})
