#!/usr/bin/env python3
"""Bygger fliken Assets på feedbacksidan: en huvudbild per mapp i assets/karaktarer, assets/rekvisita och
assets/bakgrunder, som liten PNG i feedback/assets/<typ>/, plus listan feedback/assets.json.
Kör igen när nya figurer, saker eller platser har kommit till:  python3 verktyg/feedback-assets.py"""
import json, pathlib, subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "feedback" / "assets"
IMG = {".png", ".jpg", ".jpeg", ".webp"}
# platser Sanna rensat bort från fliken (2026-11-20); filerna ligger kvar
DOLD = {"vinterkullen-natt-v3", "vinterkullen-v2", "vinterkullen-v3", "julskogen-v2", "dammen", "busshallplatsen",
        "bondgarden-natt", "badplatsen", "bjornen-bulle",
        "julskogen", "julskogen-v3", "julsovrummet", "julrummet", "vinterkullen-natt", "vinterkullen-natt-v2", "vardagsrummet", "granrummet", "granrummet-tom", "glasskiosken"}  # 2026-11-27
HUVUD = {  # v2-bilden (godkänd konst i karaktarer/<namn>.md); mappens egen huvudbild är v1
    "ankan-agda": "premium/original/agda-platt.png", "dinon-disa": "premium/original/disa-djup.jpg",
    "fjarilen-fia": "premium/original/fia-platt.png", "grodan-gurra": "premium/original/gurra-platt.png",
    "hasten-hulda": "premium/original/hulda-forsta-a.jpg", "humlan-humle": "premium/original/humle-platt.png",
    "hunden-hugo": "premium/original/hugo-forsta-a.jpg", "igelkotten-igge": "premium/original/igge-forsta-b.png",
    "kaninen-kanel": "premium/original/kanel-platt.png", "katten-kaj": "premium/original/kaj-djup.jpg",
    "kon-kajsa": "premium/original/kajsa-platt.jpg", "kycklingen-pip": "premium/original/pip-platt.png",
    "lammet-ludde": "premium/original/ludde-platt.png", "lejonet-lage": "premium-v3/original/lage-slat-a.png",
    "leoparden-lova": "premium/original/lova-forsta.jpg", "mamma-mor": "premium/original/mor-platt.jpg",
    "musen-mille": "premium/original/mille-platt.png", "nyckelpigan-nicke": "premium/original/nicke-forsta-c2.jpg",
    "pojken-olle": "premium/original/olle-forsta-b.jpg", "zebran-zebbe": "premium/original/zebbe-platt.jpg"}
SKIP = ("faceless", "back", "side", "body", "kontakt", "jamfor", "rigg", "test", "mask", "armar", "stills", "klapp", "fore")


def main_image(d):
    dirs = [d, d / "premium", d / "premium" / "original", d / "cut"]
    files = [p for x in dirs if x.is_dir() for p in sorted(x.iterdir()) if p.suffix.lower() in IMG]
    stems = {d.name, d.name.split("-")[-1]}
    return (next((p for p in files if p.stem in stems), None)
            or next((p for p in files if not any(w in p.stem for w in SKIP)), None)
            or next((p for p in files if "faceless" in p.stem), None)
            or next(iter(files), None))


items = []
for typ in ("karaktarer", "rekvisita", "bakgrunder"):
    (OUT / typ).mkdir(parents=True, exist_ok=True)
    for d in sorted(p for p in (ROOT / "assets" / typ).iterdir() if p.is_dir() and " " not in p.name and p.name not in DOLD):
        src = d / HUVUD[d.name] if d.name in HUVUD else main_image(d)
        if not src:
            continue
        fmt = "jpeg" if typ == "bakgrunder" else "png"   # figurer och saker behöver genomskinlighet
        thumb = OUT / typ / (d.name + (".jpg" if fmt == "jpeg" else ".png"))
        if not thumb.exists() or thumb.stat().st_mtime < src.stat().st_mtime:
            subprocess.run(["sips", "-s", "format", fmt, "-Z", "360", str(src), "--out", str(thumb)],
                           check=True, capture_output=True)
        items.append({"typ": typ, "name": d.name, "thumb": f"assets/{typ}/{thumb.name}",
                      "src": "../" + str(src.relative_to(ROOT))})

(ROOT / "feedback" / "assets.json").write_text(json.dumps(items, ensure_ascii=False, indent=1) + "\n")
print(len(items), "assets")
