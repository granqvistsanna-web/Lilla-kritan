#!/usr/bin/env python3
"""Bygger datan till verktyg/ljudkarta.html (verktyg/ljudkarta/data.js): varje mapp i
assets/ljud/effekter/ med kategori, tagningar, längd, "används när" ur README:n och vilka
avsnitt som använder ljudet.

Kör från repots rot:  python3 verktyg/ljudkarta.py
Längderna läses med ffprobe och sparas i verktyg/ljudkarta/langder.json (bara nya eller
ändrade filer läses om).
"""
import json, re, subprocess, datetime
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
E = ROT / "assets" / "ljud" / "effekter"
UT = ROT / "verktyg" / "ljudkarta"
LJUD = {".m4a", ".mp3", ".wav"}
KOD = {".json", ".mjs", ".js", ".html", ".py"}
HOPPA = {"node_modules", "aldre", "film", "original", "renders", "frames", "bildrutor"}

# --- README: en rad per ljud, kategori = rubriken ovanför tabellen
MAPPAR = {p.name for p in E.iterdir() if p.is_dir()}
readme = {}  # mapp -> {kategori, nar: [..], rader: [radtext]}
rader_utan_filer = []
kategori = ""
for nr, rad in enumerate((E / "README.md").read_text().splitlines(), 1):
    if rad.startswith("## "):
        kategori = rad[3:].strip()
        continue
    lista = re.match(r"- `([^`]+)`[^:]*:\s*(.*)", rad)  # "Saknas"-listan: - `namn` 1–8: text
    if lista:
        rad = f"| `{lista.group(1)}` | | | {lista.group(2)} |"
    if not rad.startswith("| `"):
        continue
    kol = [k.strip() for k in rad.strip().strip("|").split(" | ")]
    namn = re.findall(r"`([^`]+)`", kol[0])
    mappar = []
    for n in namn:
        n = n.rstrip("/")
        # mappen själv, en tagning (slurp-3), en fil i en annan mapp (brum-gullig-fniss-lang)
        kandidater = [n, re.sub(r"-\d+[a-z]?$", "", n), n.split("/")[0]]
        kandidater += sorted((d for d in MAPPAR if n.startswith(d + "-")), key=len, reverse=True)
        for kandidat in kandidater:
            if kandidat in MAPPAR:
                mappar.append(kandidat)
                break
    mappar = list(dict.fromkeys(mappar))
    nar = kol[-1] if len(kol) >= 4 else ""
    if not mappar:
        rader_utan_filer.append({"rad": nr, "namn": ", ".join(namn), "kategori": kategori, "nar": nar})
        continue
    for m in mappar:
        p = readme.setdefault(m, {"kategori": kategori, "nar": []})
        etikett = kol[0] if len(namn) > 1 or namn[0].rstrip("/") != m else ""
        p["nar"].append((etikett + ": " if etikett else "") + nar)

# --- var ljuden används: avsnitt/NNN-*/ och produktion/youtube/<serie>/
def kodfiler(d):
    for f in d.rglob("*"):
        if f.suffix in KOD and f.is_file() and not HOPPA & set(f.relative_to(d).parts[:-1]):
            yield f

ANVANDARE = [(d.name, d) for d in sorted((ROT / "avsnitt").glob("[0-9][0-9][0-9]-*")) if d.is_dir()]
ANVANDARE += [(f"youtube/{d.name}", d) for d in sorted((ROT / "produktion" / "youtube").iterdir()) if d.is_dir()]
texter = {}
for namn, d in ANVANDARE:
    t = []
    for f in kodfiler(d):
        try:
            s = f.read_text(errors="ignore")
        except OSError:
            continue
        if f.stat().st_size > 3_000_000:
            continue
        # kit.js listar alla ljud i LJUDFILER; det betyder inte att avsnittet använder dem
        s = re.sub(r"LJUDFILER\s*(=|,)\s*\{[^}]*\}", "", s)
        t.append(s)
    texter[namn] = "\n".join(t)


def anvands(mapp):
    m = re.compile(r"""(?:['"`/])""" + re.escape(mapp) + r"""(?:/|-\d+[a-z]?\b|['"`])""")
    return [n for n, t in texter.items() if m.search(t)]

# --- längder (cache)
UT.mkdir(exist_ok=True)
cachefil = UT / "langder.json"
cache = json.loads(cachefil.read_text()) if cachefil.exists() else {}


def langd(f):
    nyckel = str(f.relative_to(E))
    tid = f.stat().st_mtime
    if nyckel in cache and cache[nyckel][0] == tid:
        return cache[nyckel][1]
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)],
                       capture_output=True, text=True)
    try:
        s = round(float(r.stdout.strip()), 2)
    except ValueError:
        s = None
    cache[nyckel] = [tid, s]
    return s


# README-rubrikerna är inte längre ämnen (nya rader har lagts sist), så rösterna känns igen på namnet
ROST = re.compile(r"^(ba($|-)|brum-|doktor|gnagg|gran-|kanin|kvack|kvak|lamm|mjau|mor-|mu$|mus-|noff|olle|spinn|vov|"
                  r"hej-babbel|ja-babbel|fniss|brr|flamt|fnys|gasp|hoho|hupp|huttra|jippi|jubel|ledsen|mmm|mums|nom$|"
                  r"ohoh|oj-oj|ooh|snark|snyft|wiii|skratt|kurr|ryt|pip$|kluck|uggla|fagel-pip|elefant-trut|slurp|slick)")
RUBRIK = {"Natur och väder": "Platser och väder", "Vatten": "Vatten", "Fordon": "Fordon", "Kiosken": "Saker och händelser",
          "Kritan och ramen": "Kritan och saker", "Natten (016 Blinka lilla stjärna)": "Natten",
          "Gula helikoptern (011)": "Fordon"}


def kategori_for(namn, rubrik):
    if ROST.match(namn):
        return "Röster och läten"
    if re.search(r"ljud$", namn) or namn in {"fagelkvitter", "regn", "bjallror", "brasa", "syrsor", "vagor", "surr"}:
        return "Platser och väder"
    return RUBRIK.get(rubrik, "Saker och händelser")


def nat(f):  # kanin-gullig-2b före kanin-gullig-10
    return [int(x) if x.isdigit() else x for x in re.split(r"(\d+)", f.name)]

poster = []
for d in sorted(p for p in E.iterdir() if p.is_dir() and not p.name.startswith("_")):
    filer = sorted((f for f in d.rglob("*") if f.suffix.lower() in LJUD and f.is_file()), key=nat)
    tagningar = [{"fil": str(f.relative_to(d)), "s": langd(f)} for f in filer]
    info = readme.get(d.name)
    poster.append({
        "namn": d.name,
        "kategori": kategori_for(d.name, info["kategori"] if info else ""),
        "nar": info["nar"] if info else [],
        "tagningar": tagningar,
        "avsnitt": anvands(d.name),
        "i_readme": bool(info),
        "egen_readme": (d / "README.md").exists(),
    })

losa = [f.name for f in E.iterdir() if f.is_file() and f.suffix.lower() in LJUD]
cachefil.write_text(json.dumps(cache, indent=0))
(UT / "data.js").write_text(
    f"window.BYGGD = {json.dumps(datetime.date.today().isoformat())};\n"
    f"window.LJUD = {json.dumps(poster, ensure_ascii=False)};\n"
    f"window.RADER_UTAN_FILER = {json.dumps(rader_utan_filer, ensure_ascii=False)};\n"
    f"window.LOSA_FILER = {json.dumps(losa, ensure_ascii=False)};\n")

saknas = [p["namn"] for p in poster if not p["i_readme"]]
tomma = [p["namn"] for p in poster if not p["tagningar"]]
print(f"{len(poster)} ljud, {sum(len(p['tagningar']) for p in poster)} tagningar")
print(f"saknas i README ({len(saknas)}):", " ".join(saknas))
print(f"README-rader utan mapp ({len(rader_utan_filer)}):", " | ".join(r["namn"] for r in rader_utan_filer))
print("mappar utan ljudfiler:", " ".join(tomma) or "-")
print("lösa filer i effekter/:", " ".join(losa) or "-")
print("oanvända:", len([p for p in poster if not p["avsnitt"]]))
