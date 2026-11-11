#!/usr/bin/env python3
"""Bygger datan till verktyg/assets-karta.html (verktyg/assets-karta/data.js): alla figurer, platser, saker och v2-stiltester
med miniatyr, avsnitt och en gissning v2 / v1 / saknas.

Kör från repots rot:  python3 verktyg/assets_karta.py
Miniatyrerna (240 px) hamnar i verktyg/assets-karta/ (görs med sips, bara om de saknas
eller är äldre än originalet). Sannas egna val ligger i webbläsarens localStorage och
följer med när sidan byggs om.
"""
import json, re, subprocess, datetime
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
A = ROT / "assets"
TUMMAR = ROT / "verktyg" / "assets-karta"
V2_DAG = datetime.datetime(2026, 11, 6).timestamp()  # v2-testerna började här
BILD = {".png", ".jpg", ".jpeg", ".webp"}
DELAR = re.compile(r"(arm|leg|ben|tail|svans|nos|ora|öra|ear|mage|hjul|wheel|ratt|stang|kontaktark|jamfor|test-|rigg|-ark|ark\.)", re.I)
AVSNITT = sorted(p for p in (ROT / "avsnitt").glob("[0-9][0-9][0-9]-*") if p.is_dir())

# all text i avsnitten, en gång
avsnitt_text = {}
for d in AVSNITT:
    t = []
    for f in d.rglob("*"):
        if f.suffix in {".md", ".html", ".js", ".mjs", ".json", ".py", ".txt"} and f.is_file():
            try:
                t.append(f.read_text(errors="ignore"))
            except OSError:
                pass
    avsnitt_text[d.name] = "\n".join(t)


def bilder(d):
    if not d.exists():
        return []
    return [f for f in d.rglob("*") if f.suffix.lower() in BILD and f.is_file() and "/orig/" not in str(f)]


def basta(filer):
    """Bästa bilden: premium före allt, cut före original, hela figuren före delar, nyast först."""
    hela = [f for f in filer if not DELAR.search(f.name)] or filer
    def poang(f):
        s = str(f)
        p = 0
        if "/premium/" in s: p += 100
        if "/cut/" in s: p += 10
        if "/cut-tunn/" in s: p += 12  # riggens tunna kopior (rigg_tunn.py) är de som används nu
        if "faceless" in f.name: p += 15  # hela figuren utan ansikte
        if "body" in f.name: p += 1
        if "-tom" in f.name: p -= 5
        if re.search(r"-v\d", f.name): p += 2
        return (p, f.stat().st_mtime)
    return max(hela, key=poang) if hela else None


def anvands(md_text, monster):
    eps = []
    m = re.search(r"Används i:\s*(.+)", md_text or "")
    if m:
        eps.append(m.group(1).strip().rstrip("."))
    for namn, t in avsnitt_text.items():
        if re.search(monster, t):
            nr = namn[:3]
            if not any(nr in e for e in eps):
                eps.append(namn)
    return eps


def titel(md, fallback):
    if md and md.exists():
        m = re.match(r"#\s*(.+)", md.read_text())
        if m:
            return m.group(1).strip()
    return fallback


def tumme(f):
    rel = f.relative_to(A)
    ut = TUMMAR / rel.with_suffix(".png")
    if not ut.exists() or ut.stat().st_mtime < f.stat().st_mtime:
        ut.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["sips", "-Z", "240", "-s", "format", "png", str(f), "--out", str(ut)],
                       capture_output=True)
    return "assets-karta/" + str(rel.with_suffix(".png"))


def post(typ, slug, md, mapp, filer=None, v2_md=None):
    md_text = md.read_text() if md and md.exists() else ""
    filer = filer if filer is not None else bilder(mapp)
    b = basta(filer)
    if v2_md is None:
        v2_md = bool(re.search(r"art direction v2|premium", md_text, re.I))
    nyast = max((f.stat().st_mtime for f in filer), default=0)
    if not b:
        gissning = "saknas"
    elif (mapp / "premium").exists() or (nyast >= V2_DAG and (v2_md or re.search(r"/(premium|v2)/", str(b)))):
        gissning = "v2"
    else:
        gissning = "v1"
    if typ == "stiltest":
        gissning = "v2"
    bas = {"figur": "karaktarer", "plats": "bakgrunder", "sak": "rekvisita"}.get(typ, "")
    return {
        "id": f"{typ}:{slug}",
        "typ": typ,
        "slug": slug,
        "namn": titel(md, slug),
        "md": ("../" + str(md.relative_to(ROT))) if md and md.exists() else "",
        "bild": ("../" + str(b.relative_to(ROT))) if b else "",
        "tumme": tumme(b) if b else "",
        "bilder": len(filer),
        "avsnitt": anvands(md_text, rf"{bas}/{re.escape(slug)}\b" if bas else rf"stiltest-premium/(cut/)?{re.escape(slug)}\b"),
        "gissning": gissning,
        "v2_i_md": v2_md,
    }


poster = []
sedda = set()
for typ, mdmapp, amapp in [("figur", "karaktarer", "karaktarer"), ("plats", "bakgrunder", "bakgrunder"), ("sak", "rekvisita", "rekvisita")]:
    for md in sorted((ROT / mdmapp).glob("*.md")):
        if md.stem in {"README", "_mall"}:
            continue
        mapp = A / amapp / md.stem
        filer = bilder(mapp) + [f for f in (A / amapp).glob(md.stem + "*") if f.suffix.lower() in BILD]
        filer += bilder(A / amapp / "cut" / md.stem) if (A / amapp / "cut" / md.stem).is_dir() else []
        poster.append(post(typ, md.stem, md, mapp, filer))
        sedda.add((amapp, md.stem))
    # mappar utan md (t.ex. ladbil-brun, danspaus, *-saker)
    for d in sorted(p for p in (A / amapp).iterdir() if p.is_dir()):
        if (amapp, d.name) in sedda or d.name in {"cut", "orig"} or " " in d.name:
            continue
        if d.name.endswith("-saker"):
            for f in sorted(d.glob("*")):
                if f.suffix.lower() in BILD and not DELAR.search(f.name):
                    plats_md = ROT / mdmapp / (d.name[:-6] + ".md")
                    v2 = plats_md.exists() and bool(re.search(r"art direction v2", plats_md.read_text(), re.I))
                    poster.append(post("sak", f"{d.name}/{f.stem}", None, d, [f], v2_md=v2))
            continue
        poster.append(post(typ, d.name, None, d))

# stiltesterna i v2: de valda urklippen, väggarna och bilen
S = A / "stiltest-premium"
for f in sorted((S / "cut" / "egen").glob("*.png")) + sorted((S / "vaggar").glob("*")):
    if f.suffix.lower() in BILD:
        poster.append(post("stiltest", f"{f.parent.name}/{f.stem}", None, f.parent, [f]))
poster.append(post("stiltest", "bil", None, S / "bil", bilder(S / "bil")))

TUMMAR.mkdir(exist_ok=True)
(TUMMAR / "data.js").write_text(
    f"window.BYGGD = {json.dumps(datetime.date.today().isoformat())};\n"
    f"window.POSTER = {json.dumps(poster, ensure_ascii=False, indent=0)};\n")
from collections import Counter
print(len(poster), "poster", Counter(p["gissning"] for p in poster), Counter(p["typ"] for p in poster))
