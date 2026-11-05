# Dinon Disas armar och ben, ritade i kod (som rita-lemmar-mus.py): kroppens lila kritstruktur, vit kant,
# en rund tass med tre små klor och stora platta fötter med tånaglar i mörklila (ryggtaggarnas färg).
# Armen är en kort rak pinne utan armbåge som vrids runt axeln; axeln ligger gömd innanför kroppens kant.
# Vinklar som i rita-lemmar-mus.py: 0 = rakt ner, 90 = rakt ut åt sin sida, 180 = rakt upp.
# python3 verktyg/rita-lemmar-dino.py   ritar delarna till assets/karaktarer/dinon-disa/lemmar/ och riggen
#                                       dinon-disa-rigg-lemmar.json (005:s dinon-disa-rigg.json lämnas orörd)
import json, runpy
from pathlib import Path
from PIL import Image, ImageDraw

ROT = Path(__file__).resolve().parents[1]
mus = runpy.run_path(str(ROT / "verktyg/rita-lemmar-mus.py"), run_name="lemmar")  # kapsel, sticker, tex_from …
kapsel, ny_mask, klar, sticker, tex_from = (mus[n] for n in ("kapsel", "ny_mask", "klar", "sticker", "tex_from"))

MAPP = ROT / "assets/karaktarer/dinon-disa"
RIGG = MAPP / "dinon-disa-rigg-lemmar.json"
SIDA = {"r": 1, "l": -1}
AXEL = {"r": (765, 545), "l": (252, 545)}   # ca 30 px innanför kroppens kant
HÖFT = {"r": (600, 790), "l": (431, 790)}
L = 120                                     # axel → tassens mitt
R_AXEL, R_HAND, R_TASS = 36, 31, 41
VILA = 28
TAGG = (142, 114, 201, 255)                 # #8E72C9, ryggtaggarna


def rita():
    kropp = MAPP / "cut/dinon-disa-body.png"
    LILA = tex_from(kropp, (420, 300, 600, 440))
    ut = MAPP / "lemmar"; ut.mkdir(exist_ok=True)
    delar = {}
    for s, sida in SIDA.items():
        (ax, ay) = AXEL[s]; h = (ax, ay + L)
        m, d = ny_mask(); kapsel(d, (ax, ay), h, R_AXEL, R_HAND); kapsel(d, h, h, R_TASS, R_TASS)
        im = sticker([(LILA, klar(m))])
        dr = ImageDraw.Draw(im)
        for dx in (-17, 0, 17):  # tre små klor
            dr.ellipse((h[0] + dx - 7, h[1] + 28, h[0] + dx + 7, h[1] + 42), fill=TAGG)
        im.save(ut / f"dinon-disa-arm-{s}.png")
        (hx, hy) = HÖFT[s]; fx, fy = hx + sida * 30, 888
        m, d = ny_mask(); kapsel(d, (hx, hy - 40), (hx + sida * 8, fy - 14), 48, 44)
        d.ellipse([(fx - 80) * 4, (fy - 34) * 4, (fx + 80) * 4, (fy + 34) * 4], fill=255)
        im = sticker([(LILA, klar(m))])
        dr = ImageDraw.Draw(im)
        for i in range(3):  # tånaglar längst fram på foten
            x = fx + sida * (40 + i * 16); y = fy + 8 - i * 9
            dr.ellipse((x - 8, y - 7, x + 8, y + 7), fill=TAGG)
        im.save(ut / f"dinon-disa-leg-{s}.png")
        delar |= {
            f"arm-{s}": {"fil": f"lemmar/dinon-disa-arm-{s}.png", "vridpunkt": [ax, ay], "spets": list(h)},
            f"leg-{s}": {"fil": f"lemmar/dinon-disa-leg-{s}.png", "vridpunkt": [hx, hy], "spets": [fx, fy]},
        }
    RIGG.write_text(json.dumps({
        "storlek": 1024, "kropp": "cut/dinon-disa-body.png", "ritadeDelar": True,
        "vinklar": "grader åt det håll delen pekar: 0 rakt ner, 90 rakt ut åt sin sida, 180 rakt upp, minus in över magen",
        "ordning": "bakifrån: ben, arm, kropp, väst, ansikte; armar framför kroppen ritas efter ansiktet",
        "vila": {"arm": VILA, "ben": 0},
        "delar": delar}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    rita()
    print("klar:", RIGG)
