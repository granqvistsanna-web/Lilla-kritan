#!/usr/bin/env python3
"""Spåra ytterkonturen av ett urklipp som EN sluten, mjuk bana (format/ritintro.md).

  python3 kontur.py cut.png ut.json [--krymp N] [--max 60] [--start topp|vanster] [--mitt]

Alfat krymps N px (linjen hamnar på färgytans kant, innanför den vita kanten), största ytterkonturen
förenklas (Douglas-Peucker tills högst --max punkter) och skrivs som en Catmull-Rom-kurva i kubiska
Bezier-bitar, i bildens egna pixlar. --mitt skriver också största inskrivna cirkeln i färgytan.
"""
import json, sys
import cv2
import numpy as np

a = sys.argv[1:]
src, dst = a[0], a[1]
opt = lambda n, d: type(d)(a[a.index(n) + 1]) if n in a else d
krymp, maxp, start = opt('--krymp', 5), opt('--max', 60), opt('--start', 'topp')

al = cv2.imread(src, cv2.IMREAD_UNCHANGED)[..., 3]
tat = (al > 128).astype(np.uint8)
ys, xs = np.nonzero(tat)
bbox = [int(xs.min()), int(ys.min()), int(xs.max() - xs.min() + 1), int(ys.max() - ys.min() + 1)]

k = 2 * krymp + 1
inne = cv2.erode(tat, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))) if krymp else tat
inne = cv2.GaussianBlur(inne * 255, (0, 0), 3) > 127          # släta bort kritfransar i kanten
cs, _ = cv2.findContours(inne.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
c = max(cs, key=cv2.contourArea)

# släta punkterna längs konturen (cirkulärt), så att kurvan inte vinglar mellan stödpunkterna
q = c[:, 0, :].astype(float)
sig = opt('--slat', 6.0)
kx = np.arange(-int(3 * sig), int(3 * sig) + 1); kv = np.exp(-kx ** 2 / (2 * sig * sig)); kv /= kv.sum()
q = np.stack([np.convolve(np.r_[q[-len(kx):, i], q[:, i], q[:len(kx), i]], kv, 'same')[len(kx):-len(kx)] for i in (0, 1)], 1)
eps = 0.5
while True:
    p = cv2.approxPolyDP(q.astype(np.float32).reshape(-1, 1, 2), eps, True)[:, 0, :].astype(float)
    if len(p) <= maxp:
        break
    eps += 0.1

# medurs på skärmen, start i toppen (eller längst till vänster)
if cv2.contourArea(p.astype(np.float32), oriented=True) < 0:
    p = p[::-1]
i = int(np.argmin(p[:, 1] if start == 'topp' else p[:, 0]))
p = np.roll(p, -i, axis=0)

n = len(p)
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
d = f'M{f(p[0][0])} {f(p[0][1])}'
for j in range(n):                                             # Catmull-Rom → kubisk Bezier, sluten
    p0, p1, p2, p3 = p[(j - 1) % n], p[j], p[(j + 1) % n], p[(j + 2) % n]
    c1, c2 = p1 + (p2 - p0) / 6, p2 - (p3 - p1) / 6
    d += f' C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}'
d += ' Z'

ut = {'d': d, 'bbox': bbox, 'punkter': n, 'krympt': krymp, 'start': [round(p[0][0], 1), round(p[0][1], 1)]}
if '--mitt' in a:
    dt = cv2.distanceTransform(inne.astype(np.uint8), cv2.DIST_L2, 5)
    _, r, _, (cx, cy) = cv2.minMaxLoc(dt)
    ut['mitt'] = [int(cx), int(cy)]
    ut['radie'] = round(float(r), 1)
# hur långt från den riktiga kanten hamnar banan?
bana, cur = [], p[0]
for j in range(n):
    p0, p1, p2, p3 = p[(j - 1) % n], p[j], p[(j + 1) % n], p[(j + 2) % n]
    c1, c2 = p1 + (p2 - p0) / 6, p2 - (p3 - p1) / 6
    for t in np.linspace(0, 1, 21)[1:]:
        bana.append((1 - t) ** 3 * p1 + 3 * (1 - t) ** 2 * t * c1 + 3 * (1 - t) * t * t * c2 + t ** 3 * p2)
bana = np.array(bana); ck = c[:, 0, :].astype(float)
avst = np.sqrt(((bana[:, None, :] - ck[None, ::2, :]) ** 2).sum(2)).min(1)
print('avvikelse från kanten: medel %.1f px, störst %.1f px' % (avst.mean(), avst.max()))
json.dump(ut, open(dst, 'w'), ensure_ascii=False, indent=1)
print(dst, 'punkter', n, 'eps', eps, 'bbox', bbox, {k: ut[k] for k in ('mitt', 'radie') if k in ut})
