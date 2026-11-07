# Klipper ut en ritad sovbild (från Flow, vit bakgrund, inbakad vit klistermärkeskant) till PNG med genomskinlig bakgrund.
#   python3 .claude/skills/lk-figur/scripts/sovbild.py <in.jpg> <ut.png> [kant_px]
# Alfa = figurens färgade del (hål fyllda) växt med kant_px (standard 20, den inbakade kanten), lite mjuk kant.
# Lösa bitar (zzz, smulor) tas bort, bara den största biten blir kvar. Bilder utan inbakad kant: kant_px 0,
# och lägg kanten i scenen med kant.lagg(g, { andel: 0.01 }). Skriver ut kroppens ruta i bildens pixlar.
import sys, cv2, numpy as np
src, dst = sys.argv[1], sys.argv[2]
kant = int(sys.argv[3]) if len(sys.argv) > 3 else 20
im = cv2.imread(src); hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
farg = ((im.min(axis=2) < 230) | (hsv[..., 1] > 35)).astype(np.uint8)
farg = cv2.morphologyEx(farg, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(farg)
kropp = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
cs, _ = cv2.findContours(kropp, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
fyll = np.zeros_like(kropp); cv2.drawContours(fyll, cs, -1, 1, -1)
a = cv2.dilate(fyll, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * kant + 1, 2 * kant + 1))) if kant else fyll
a = cv2.GaussianBlur(a.astype(np.float32), (5, 5), 0)
cv2.imwrite(dst, np.dstack([im, (a * 255).astype(np.uint8)]))
ys, xs = np.where(fyll > 0)
print(f'{dst}: bild {im.shape[1]}x{im.shape[0]}, kropp x {xs.min()}–{xs.max()}, y {ys.min()}–{ys.max()} (botten {ys.max() + kant})')
