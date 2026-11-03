#!/usr/bin/env python3
"""Delar upp en figur i kropp och lemmar för animation i kod.

Tar figuren utan ansikte (med armar och ben) och samma figur utan armar och ben,
pixeljusterade. Skillnaden blir lemmarna, var och en som en egen bild i samma
1024-rutnät, med en bit som sticker in under kroppen så att den kan vridas utan glipa.
Skriver cut/<namn>-body.png, cut/<namn>-<del>.png och <namn>-rigg.json (vridpunkter).

  python3 verktyg/delar.py assets/karaktarer/kaninen-kanel kanel
  python3 verktyg/delar.py assets/karaktarer/fjarilen-fia fia --vingar   # vingar i stället för armar och ben
  python3 verktyg/delar.py assets/karaktarer/bussen-bettan bussen-bettan --fordon   # hjul och propellrar, del-1, del-2 …
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

CUTOUT = Path.home() / ".claude/skills/ai-video/scripts/cutout.py"
PY = Path.home() / ".claude/skills/ai-video/.venv/bin/python"


def mask(f):
    """Figurens yta enligt utklippet, så att även vita figurer (lammet) kommer med."""
    return np.asarray(Image.open(f).convert("RGBA"))[..., 3] > 128


def cut(src, dst):
    # Stor hålfyllnad: vita ytor inuti figuren (ull, mage) ska inte bli genomskinliga.
    subprocess.run([str(PY), "-I", str(CUTOUT), str(src), str(dst), "8", "999999999"], check=True)


mapp, namn = Path(sys.argv[1]), sys.argv[2]
VINGAR = "--vingar" in sys.argv[3:]
FORDON = "--fordon" in sys.argv[3:]
hel, kropp = mapp / f"{namn}-faceless.png", mapp / f"{namn}-body.png"
(mapp / "cut").mkdir(exist_ok=True)
cut(hel, mapp / "cut" / f"{namn}-faceless.png")
cut(kropp, mapp / "cut" / f"{namn}-body.png")

A, B = mask(mapp / "cut" / f"{namn}-faceless.png"), mask(mapp / "cut" / f"{namn}-body.png")
pixlar = np.asarray(Image.open(hel).convert("RGB"))
lemmar = A & ~ndimage.binary_dilation(B, iterations=6)
lemmar = ndimage.binary_opening(lemmar, iterations=2)
etiketter, n = ndimage.label(lemmar)
nara_kropp = ndimage.binary_dilation(B, iterations=20)
rigg = {}
delar = [etiketter == i for i in range(1, n + 1)]
delar = sorted((d for d in delar if d.sum() >= 1500), key=lambda d: np.nonzero(d)[1].mean())
for nr, del_ in enumerate(delar, 1):
    ys, xs = np.nonzero(del_)
    sida = "l" if xs.mean() < 512 else "r"  # l = bildens vänstra sida
    if FORDON:  # hjul, propeller: numreras från vänster och snurrar runt sin egen mitt
        etikett, vrid = f"del-{nr}", [int(xs.mean()), int(ys.mean())]
        ytan = ndimage.binary_dilation(del_, iterations=4) & A
    else:
        typ = "wing" if VINGAR else ("arm" if ys.mean() < B.nonzero()[0].max() - 60 else "leg")
        etikett = f"{typ}-{sida}"
        led = del_ & nara_kropp
        py, px = (np.nonzero(led) if led.any() else (ys, xs))
        vrid = [int(px.mean()), int(py.mean())]
        # Lemmen plus en bit av kroppen runt leden, som döljs bakom kroppen.
        ytan = (ndimage.binary_dilation(del_, iterations=45) & A) | del_
    bild = np.full_like(pixlar, 255)
    bild[ytan] = pixlar[ytan]
    tmp = mapp / f".{etikett}.png"
    Image.fromarray(bild).save(tmp)
    cut(tmp, mapp / "cut" / f"{namn}-{etikett}.png")
    tmp.unlink()
    rigg[etikett] = {"fil": f"cut/{namn}-{etikett}.png", "vridpunkt": vrid}

json.dump({"storlek": 1024, "kropp": f"cut/{namn}-body.png", "delar": rigg},
          open(mapp / f"{namn}-rigg.json", "w"), indent=2, ensure_ascii=False)
print(json.dumps(rigg, indent=2))
