"""Tar ut lagren som storyboarden räknar fram (plåtarna, båtens delar, Disas väst, sakerna, blixtplåtarna, discot) som PNG
här i lager/, så att kodscenerna använder exakt samma bilder och platshållare som storyboarden.
Kör: ~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py   (från scener/; kör om när bygg.py eller assets/ ändras)
Bygger hela storyboarden en gång på vägen (ca 1,5 min). PNG:erna checkas inte in."""
import runpy
from pathlib import Path

from PIL import Image

HÄR = Path(__file__).resolve().parent
B = runpy.run_path(str(HÄR.parents[1] / "storyboard" / "bygg.py"), run_name="lager")
Image_ = B["Image"]

ut = {
    "sjon": B["sjön_plåt"](),
    "bryggan": B["bryggan_plåt"](),
    "blixt-rop": B["BLIXT"]["rop"],
    "blixt-eko": B["BLIXT"]["eko"],
    "disco": B["DISCO_BILD"],
    "slut": B["SLUT_PLÅT"],
    "skrov": B["SKROV"],
    "insida": B["INSIDA"],
    "apelsin": B["APELSIN"],
    "halva": B["HALVA"],
    "fisk": B["FISK"],
    "pumpa": B["PUMPA"],
    "sol": B["SOL"],
    "korg": B["KORG"],
    "flagga-orange": B["FLAGGA_OR"],
    "discokula-orange": B["DISCOKULA"],
}
väst = Image.new("RGBA", (1024, 1024))
B["väst"](väst)
ut["vast"] = väst
kontur = B["båten"](med_disa=False, kontur=True).kontur  # skrovets mörkorange kontur i båtens 1024 × 1324-ruta (TOPP ovanför)
k = Image.new("RGBA", kontur.size, B["KONTUR_OR"] + (0,))
k.putalpha(kontur)
ut["bat-kontur"] = k
for namn, im in ut.items():
    im.save(HÄR / f"{namn}.png")
print(", ".join(ut), "→", HÄR)
