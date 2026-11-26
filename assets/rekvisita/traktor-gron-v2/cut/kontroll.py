import json, os
from PIL import Image
import numpy as np
HER = os.path.dirname(os.path.abspath(__file__))
R = json.load(open(os.path.join(HER, "..", "traktor-gron-v2-rigg.json")))
L = lambda n: Image.open(os.path.join(HER, n)).convert("RGBA")
def stapla(vinkel, bg):
    im = Image.new("RGBA", L("traktor-bak.png").size, bg)
    for n in ("traktor-bak", "traktor-fram"):
        im.alpha_composite(L(n + ".png"))
    for n, k in (("hjul-bak", "hjulBak"), ("hjul-fram", "hjulFram")):
        h = L(n + ".png")
        h = h.rotate(vinkel, center=(R[k]["cx"], R[k]["cy"]), resample=Image.BICUBIC)
        im.alpha_composite(h)
    return im
bg = (128, 128, 128, 255)
a, b = stapla(0, bg), stapla(30, bg)
hel = Image.new("RGBA", a.size, bg); hel.alpha_composite(L("traktor-gron-v2.png"))
d = np.abs(np.asarray(a).astype(int) - np.asarray(hel).astype(int)).sum(2)
print("stapel mot hel: pixlar med diff>30:", int((d > 30).sum()))
Image.fromarray(((d > 30) * 255).astype("uint8")).save("/private/tmp/claude-501/s/diff.png")
k = Image.new("RGB", (a.width * 2, a.height), bg[:3])
k.paste(a.convert("RGB"), (0, 0)); k.paste(b.convert("RGB"), (a.width, 0))
k.save(os.path.join(HER, "kontroll.png"))
