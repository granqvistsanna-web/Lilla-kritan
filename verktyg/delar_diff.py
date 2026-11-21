#!/usr/bin/env python3
"""Klipper rena delar (svans, ben, tassar) ur skillnaden mellan hela bilden och kroppen utan delar.

delar.py tar allt som sticker ut utanför kroppen, så delar som går över kroppen (en arm över bröstet)
blir avhuggna, ihopväxta ben blir en del, och kroppens vita kant följer med som flisor. Här är en del
de pixlar där <namn>-faceless.png och <namn>-body.png skiljer sig (pixeljusterade ur Flow), en del per
startpunkt. Delar bakom kroppen får lång rot (langre_rot.py) och en jämn vit kant (tunn_kant.py, N px
= kroppens egen kant). En del framför kroppen (!fram) behåller konstens egen linje och får ingen vit kant.

  python3 verktyg/delar_diff.py <mapp> <namn> <kant px> del@x,y[<X|>X][#lx,ly][!fram] ...
      @x,y   en punkt i delen        <X / >X  bara den del av ytan som ligger vänster / höger om x = X (ett benpar)
      ^Y     bara ovanför y = Y       #lx,ly leden (annars där delen möter kroppen)      !fram  ritas framför kroppen
  python3 verktyg/delar_diff.py assets/rekvisita/katt-abc katt 20 tail@150,300 bak-l@300,800\<362 bak-r@400,800\>362 ...
Skriver cut/<namn>-<del>.png och delarna i <namn>-rigg.json (med "fram": true för delar framför kroppen).
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

mapp, namn, kant = Path(sys.argv[1]), sys.argv[2], sys.argv[3]
F = np.asarray(Image.open(mapp / f"{namn}-faceless.png").convert("RGB")).astype(int)
Bi = np.asarray(Image.open(mapp / f"{namn}-body.png").convert("RGB").resize((1024, 1024))).astype(int)
B = np.asarray(Image.open(mapp / "cut" / f"{namn}-body.png").convert("RGBA"))[..., 3] > 128
vit = (F.min(2) > 225) & (np.ptp(F, 2) < 22)
diff = ndimage.binary_opening((np.abs(F - Bi).sum(2) > 90) & ~vit, iterations=2)
lab, _ = ndimage.label(diff)
yy, xx = np.mgrid[:1024, :1024]

rigg_fil = mapp / f"{namn}-rigg.json"
rigg = json.load(open(rigg_fil)) if rigg_fil.exists() else {"storlek": 1024, "kropp": f"cut/{namn}-body.png"}
rigg["delar"], bak, fram_ = {}, [], []
for spec in sys.argv[4:]:
    m = re.fullmatch(r"([\w-]+)@(\d+),(\d+)([<>]\d+)?(?:\^(\d+))?(?:#(\d+),(\d+))?(!fram)?", spec)
    d, sx, sy, delning, topp, lx, ly, fram = m.groups()
    sx, sy = int(sx), int(sy)
    i = lab[sy, sx]
    if not i:   # närmaste yta
        dist, (iy, ix) = ndimage.distance_transform_edt(lab == 0, return_indices=True)
        i = lab[iy[sy, sx], ix[sy, sx]]
    del_ = lab == i
    if delning:
        X = int(delning[1:])
        del_ &= (xx < X) if delning[0] == "<" else (xx >= X)
        l2, n2 = ndimage.label(del_)
        del_ = l2 == 1 + np.argmax(ndimage.sum(del_, l2, range(1, n2 + 1)))
    if topp:   # bara ovanför y = topp (svansens bas som sticker ut bredvid kroppen)
        del_ &= yy < int(topp)
    del_ = ndimage.binary_fill_holes(ndimage.binary_closing(del_, iterations=2))
    if lx:
        led = [int(lx), int(ly)]
    else:   # där delen möter kroppen
        mot = del_ & ndimage.binary_dilation(B, iterations=12) if not fram else del_
        if not mot.any():   # rör inte kroppen: översta raderna
            ys, xs = np.nonzero(del_)
            mot = del_ & (yy < ys.min() + 20)
        ys, xs = np.nonzero(mot)
        led = [int(xs.mean()), int(ys.mean())]
    ut = np.zeros((1024, 1024, 4), np.uint8)
    ut[del_, :3] = F[del_]
    ut[del_, 3] = 255
    Image.fromarray(ut).save(mapp / "cut" / f"{namn}-{d}.png")
    rigg["delar"][d] = {"fil": f"cut/{namn}-{d}.png", "vridpunkt": led, **({"fram": True} if fram else {})}
    (fram_ if fram else bak).append(d)
    print(d, "led", led, "pixlar", int(del_.sum()), "framför" if fram else "bakom")
json.dump(rigg, open(rigg_fil, "w"), indent=2)

verktyg = Path(__file__).parent
if bak:
    subprocess.run([sys.executable, str(verktyg / "langre_rot.py"), str(mapp), namn, *bak], check=True)
if bak or fram_:
    subprocess.run([sys.executable, str(verktyg / "tunn_kant.py"), kant, *[str(mapp / "cut" / f"{namn}-{d}.png") for d in bak + fram_]], check=True)
# delar framför kroppen: den vita kanten bara utåt, inte där delen ligger över kroppen (annars en vit linje över magen)
inne = ndimage.binary_erosion(B, iterations=int(kant) + 4)
for d in fram_:
    fil = mapp / "cut" / f"{namn}-{d}.png"
    im = np.asarray(Image.open(fil).convert("RGBA")).copy()
    rgb = im[..., :3].astype(int)
    vitt = (rgb.min(2) > 228) & (np.ptp(rgb, 2) < 22)
    im[vitt & inne, 3] = 0
    Image.fromarray(im).save(fil)
