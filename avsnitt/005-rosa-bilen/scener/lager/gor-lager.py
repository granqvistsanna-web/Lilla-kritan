"""Tar ut de lager som storyboarden räknar fram (bygg.py) som PNG, så att kodscenerna använder exakt samma bilder.
Kör: ~/.claude/skills/ai-video/.venv/bin/python -I gor-lager.py   (från den här mappen). Skriver *.png här (checkas inte in).
Allt i storyboardens mått, 1376 × 768 (scenerna har samma viewBox). Figurernas delar i deras egna 1024-rutor.
bygg.py körs fram till raden där bilderna sparas, så att frames/ och storyboard.md inte skrivs om."""
from pathlib import Path

HÄR = Path(__file__).resolve().parent
BYGG = HÄR.parents[1] / "storyboard" / "bygg.py"
src = BYGG.read_text()
g = {"__file__": str(BYGG), "__name__": "bygg"}
exec(compile(src[:src.index('out = HÄR / "frames"')], str(BYGG), "exec"), g)
Image, ImageChops, ImageFilter = g["Image"], g["ImageChops"], g["ImageFilter"]
W, H = g["W"], g["H"]


def spara(namn, im):
    im.save(HÄR / f"{namn}.png")
    print(namn, im.size)


# Bakgrunderna
spara("vagen", g["plate"]("vagen"))
spara("kiosk", g["KIOSK"])            # markisen och den stora struten blekta (tyst)
spara("kiosk-ra", g["KIOSK_RÅ"])      # i full styrka (11a)
ZX, ZY, Z, _k = g["ZX"], g["ZY"], g["Z"], g["_k"]
D = 300                                # remsan ovanför helbilden, för 11a:s panorering upp (tilt_upp)
spara("kiosk-topp", _k.crop((ZX, round(ZY - D / Z), round(ZX + W / Z), ZY)).resize((W, D), Image.LANCZOS))
disk = Image.new("RGBA", (W, H))
DISK = g["DISK"]
disk.paste(g["KIOSK_RÅ"].crop(DISK), DISK[:2])
spara("disk", disk)                    # disken, framför grodans fötter
spara("blixt-rop", g["BLIXT"]["rop"])
spara("blixt-eko", g["BLIXT"]["eko"])
c = g["DISCO_BILD"].convert("RGB").copy()
g["ljusprickar"](c)
spara("disco", c)                      # utan kulan (den snurrar i scenen) och utan småbilder
spara("glassberget", g["GLASSBERGET"])

# Saker
for namn, im in (("strut", g["STRUT"]), ("klick", g["KLICK"]), ("glass-gul", g["GUL_GLASS"]),
                 ("glass-gron", g["GRÖN_GLASS"]), ("blomma", g["BLOMMA"])):
    spara(namn, im)

# Bilens mörkrosa kontur (blixten och mönstret): ringen innanför karossens och kantens siluett, i bilens 1024-ruta
kropp = ImageChops.lighter(g["KAROSS"].getchannel("A"), g["KANT"].getchannel("A"))
ring = ImageChops.subtract(kropp, kropp.filter(ImageFilter.MinFilter(15)))
k = Image.new("RGBA", kropp.size, g["KONTUR_ROSA"] + (0,))
k.putalpha(ring)
spara("bil-kontur", k)

# Det rosa molnet (refrängen, "Titta ut!"): glassbergets vänstra vita moln, utklippt och färgat rosa med kritstrukturen kvar
import numpy as np
_gb = np.asarray(Image.open(HÄR.parents[3] / "assets/bakgrunder/glassberget/glassberget.png").convert("RGB"), float)[20:215, 0:275]
_a = np.clip((_gb[..., 0] - 175) / 45, 0, 1)                    # himlen har röd ≈ 156, molnet ≈ 240
_ljus = _gb.mean(axis=2, keepdims=True) / 255
_rosa = np.clip(np.array([250, 178, 212]) * (0.97 + 0.3 * (_ljus - _ljus.mean())), 0, 255)
_m = np.dstack([_rosa, _a[..., None] * 255]).astype(np.uint8)
_m = np.concatenate([_m[:, ::-1][:, :-12], _m], axis=1)             # molnet är avskuret vid bildkanten: spegla till ett helt moln
spara("moln-rosa", Image.fromarray(_m, "RGBA"))
