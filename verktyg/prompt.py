#!/usr/bin/env python3
"""Sätter ihop färdiga bildprompter för Lilla Kritan.

Grundstilen från stil/stilguide.md läggs alltid först, sedan figur, plats
eller sak, sedan scenen. Klistra in resultatet i Nano Banana tillsammans
med figurens referensark.

Exempel:
  python3 verktyg/prompt.py --lista
  python3 verktyg/prompt.py musen-mille --scen "äter glass, glad"
  python3 verktyg/prompt.py musen-mille kycklingen-pip --plats glasskiosken --scen "..."
  python3 verktyg/prompt.py musen-mille --referensark
  python3 verktyg/prompt.py musen-mille --delar
  python3 verktyg/prompt.py --plats angen
  python3 verktyg/prompt.py --sak glass
"""
import argparse
import re
import sys
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
KARAKTARER = ROT / "karaktarer"
BAKGRUNDER = ROT / "bakgrunder"
REKVISITA = ROT / "rekvisita"
STILGUIDE = ROT / "stil" / "stilguide.md"

FORMAT = {
    "16:9": "Wide 16:9 landscape composition.",
    "9:16": "Tall 9:16 portrait composition with the main subject in the centre.",
    "1:1": "Square 1:1 composition.",
}


def block(fil: Path, sort: str) -> str:
    text = fil.read_text(encoding="utf-8")
    m = re.search(rf"```{sort}\n(.*?)```", text, re.S)
    if not m:
        sys.exit(f"Hittar inget ```{sort}-block i {fil.relative_to(ROT)}")
    return " ".join(m.group(1).split())


def namn(fil: Path) -> str:
    rad = fil.read_text(encoding="utf-8").splitlines()[0]
    return rad.lstrip("# ").strip()


def poster(mapp: Path) -> list[Path]:
    return sorted(p for p in mapp.glob("*.md") if not p.name.startswith(("_", "README")))


def hitta(mapp: Path, id_: str) -> Path:
    fil = mapp / f"{id_}.md"
    if not fil.exists():
        finns = ", ".join(p.stem for p in poster(mapp))
        sys.exit(f"Okänd: '{id_}'. Finns: {finns}")
    return fil


def lista() -> None:
    for rubrik, mapp in (("Figurer", KARAKTARER), ("Platser", BAKGRUNDER), ("Saker", REKVISITA)):
        print(f"\n{rubrik}:")
        for p in poster(mapp):
            print(f"  {p.stem:22} {namn(p)}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("figurer", nargs="*", help="figur-id, t.ex. musen-mille")
    ap.add_argument("--plats", help="bakgrund, t.ex. angen")
    ap.add_argument("--sak", action="append", default=[], help="rekvisita, t.ex. glass (kan upprepas)")
    ap.add_argument("--scen", help="vad som händer i bilden (svenska eller engelska)")
    ap.add_argument("--format", choices=FORMAT, default=None)
    ap.add_argument("--referensark", action="store_true", help="vändark för en figur")
    ap.add_argument("--delar", action="store_true", help="utklippsdelar för animation")
    ap.add_argument("--lista", action="store_true", help="visa alla figurer, platser och saker")
    a = ap.parse_args()

    if a.lista:
        lista()
        return
    if not (a.figurer or a.plats or a.sak):
        ap.print_help()
        return

    delar = [block(STILGUIDE, "prompt")]
    figurfiler = [hitta(KARAKTARER, f) for f in a.figurer]

    if a.referensark or a.delar:
        if len(figurfiler) != 1:
            sys.exit("--referensark och --delar fungerar med exakt en figur.")
        fil = figurfiler[0]
        delar.append("Character: " + block(fil, "prompt"))
        if a.referensark:
            delar.append(
                "Character reference sheet on a plain white background: the same character shown "
                "from the front, turned slightly to the right, from the side, a happy jumping pose, a walking pose and "
                "three facial expressions (happy, surprised, sad), each with its soft grey oval shadow below. Identical design, colours and "
                "proportions in every view."
            )
        else:
            delar.append(
                "Cut-out animation puppet parts sheet on a plain white background. Use the attached "
                "image as the exact character reference. Show the character's body parts separated "
                "and spaced apart, not touching, each as its own clean cut-out piece, facing the "
                f"viewer: {block(fil, 'delar')}. Also the soft grey oval floor shadow as a separate piece. Joints (neck, shoulders, hips) have a little extra "
                "overlap so the pieces can rotate without gaps. Same scale for every part."
            )
        delar.append(FORMAT[a.format or "1:1"])
    else:
        for fil in figurfiler:
            delar.append("Character: " + block(fil, "prompt"))
        for s in a.sak:
            delar.append("Object: " + block(hitta(REKVISITA, s), "prompt").replace(", on a plain white background", ""))
        if a.plats:
            bakgrund = block(hitta(BAKGRUNDER, a.plats), "prompt")
            delar.append(("Background: " if figurfiler or a.sak else "Background only, no characters: ") + bakgrund)
        elif figurfiler or a.sak:
            if not a.scen:
                delar.append("On a plain white background, full body, centred.")
        if a.scen:
            delar.append("Scene: " + a.scen)
        if figurfiler:
            delar.append("Use the attached reference images to keep each character exactly on-model.")
        delar.append(FORMAT[a.format or ("16:9" if a.plats else "1:1")])

    print("\n\n".join(delar))


if __name__ == "__main__":
    main()
