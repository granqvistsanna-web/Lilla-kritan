# Ullas örontofsar: konstens tofs (ur cut/v1/, delar.py) utanför kroppens fyllning, plus en rundad rot i tofsens egen krita
# som börjar 15 px innanför leden och går 80 px in mot kroppens mitt (512, 560). langre_rot.py lade rotens runda ände vid
# leden, så den stack ut som en bula bredvid tofsen, och rensningen rundade spetsen. Här behålls spetsen (bara en liten
# öppning, 2 px) och nya pixlar får närmaste kritfärg ur tofsen. Kör tunn_kant.py 10 efteråt. Kör i premium/.
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
rigg = json.load(open('ulla-rigg.json'))
body = np.asarray(Image.open('cut/ulla-body.png').convert('RGBA'))
Bf = tunn_kant.fyllning(body)
yy, xx = np.mgrid[:1024, :1024]
for n in ('ear-l', 'ear-r'):
    a = np.asarray(Image.open(f'cut/v1/ulla-{n}.png').convert('RGBA')).copy()
    rgb = a[..., :3].astype(int)
    F = (a[..., 3] > 128) & ~((rgb.min(2) > 225) & (np.ptp(rgb, 2) < 30))
    tofs = F & ~Bf
    lab, k = ndimage.label(ndimage.binary_opening(tofs, iterations=2))
    tofs = lab == 1 + np.argmax(ndimage.sum(tofs, lab, range(1, k + 1)))
    p = np.array(rigg['delar'][n]['vridpunkt'], float)
    u = np.array([512, 560]) - p; u /= np.hypot(*u)
    A, B = p + 15 * u, p + 80 * u
    t = np.clip(((xx - A[0]) * u[0] + (yy - A[1]) * u[1]) / 65, 0, 1)
    rot = np.hypot(xx - (A[0] + t * 65 * u[0]), yy - (A[1] + t * 65 * u[1])) <= 24
    G = tofs | rot
    _, (iy, ix) = ndimage.distance_transform_edt(~tofs, return_indices=True)
    a[G & ~tofs, :3] = a[iy[G & ~tofs], ix[G & ~tofs], :3]
    a[..., 3] = np.where(G, 255, 0)
    Image.fromarray(a).save(f'cut/ulla-{n}.png'); print(n, int(tofs.sum()), int((G & ~tofs).sum()))
