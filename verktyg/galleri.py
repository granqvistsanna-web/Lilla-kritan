#!/usr/bin/env python3
"""Bygger index.html: ett galleri över alla figurer, platser och saker.

Visar korten i karaktarer/, bakgrunder/ och rekvisita/ och alla bilder i
produktion/ och kritstilens skill. Kör om efter nya filer:
  python3 verktyg/galleri.py
"""
import html
import re
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
REPO = "https://github.com/granqvistsanna-web/Lilla-kritan/blob/HEAD/"
BILD = (".png", ".jpg", ".webp")


def kort(mapp: str) -> list[dict]:
    ut = []
    for f in sorted((ROT / mapp).glob("*.md")):
        if f.name in ("README.md", "_mall.md"):
            continue
        text = f.read_text(encoding="utf-8")
        titel = re.search(r"^# (.+)", text, re.M)
        meta = re.search(r"^\*\*.+$", text, re.M)
        farg = re.search(r"#[0-9A-Fa-f]{6}", meta.group(0) if meta else "")
        # Utklippt framifrån-bild först: kortaste filnamnet i cut/, annars i mappen.
        d = ROT / "assets" / mapp / f.stem
        bilder = sorted((p for p in [*d.glob("cut/*"), *d.glob("*")] if p.suffix in BILD),
                        key=lambda p: ("cut" not in p.parts, len(p.name)))
        ut.append({
            "namn": titel.group(1) if titel else f.stem,
            "id": f.stem,
            "info": re.sub(r"\*\*|`", "", meta.group(0)) if meta else "",
            "farg": farg.group(0) if farg else None,
            "bild": bilder[0].relative_to(ROT).as_posix() if bilder else None,
            "lank": REPO + f.relative_to(ROT).as_posix(),
            "vagar": [f.relative_to(ROT).as_posix()],
        })
    return ut


def bilder(*mappar: str, utom: set = frozenset()) -> list[dict]:
    """En post per filnamn. Utklippt version (cut/) visas om den finns."""
    poster: dict[str, dict] = {}
    for mapp in mappar:
        for p in sorted((ROT / mapp).rglob("*")):
            if p.suffix not in BILD or p.stem in utom:
                continue
            post = poster.setdefault(p.stem, {"namn": p.stem, "id": p.stem, "vagar": []})
            rel = p.relative_to(ROT).as_posix()
            post["vagar"].append(rel)
            if "cut" in p.parts or "bild" not in post:
                post["bild"] = rel
    return sorted(poster.values(), key=lambda p: p["namn"])


def md(text: str) -> str:
    """Liten markdown till HTML: stycken, listor, tabeller, fetstil, kod, länkar."""
    def rad(s: str) -> str:
        s = html.escape(s)
        s = re.sub(r"\[(.+?)\]\((.+?)\)", lambda m: f'<a href="{REPO}{m.group(2)}" target="_blank">{m.group(1)}</a>', s)
        s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
        s = re.sub(r"\*(.+?)\*", r"<i>\1</i>", s)
        return re.sub(r"`(.+?)`", r"<code>\1</code>", s)
    ut = []
    for b in re.split(r"\n\s*\n", text.strip()):
        rader = b.strip().splitlines()
        if rader[0].startswith("|"):
            celler = [[rad(c.strip()) for c in r.strip("|").split("|")] for r in rader if not set(r) <= set("|-: ")]
            ut.append("<table>" + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in celler) + "</table>")
        elif re.match(r"\d+\.", rader[0]):
            punkter = [rad(re.sub(r"^\d+\.\s*", "", r)) for r in rader]
            ut.append("<ol>" + "".join(f"<li>{s}</li>" for s in punkter) + "</ol>")
        else:
            ut.append(f"<p>{rad(' '.join(rader))}</p>")
    return "".join(ut)


def arbetsgang() -> str:
    readme = (ROT / "README.md").read_text(encoding="utf-8")
    avsnitt = re.search(r"## Arbetsgång för ett avsnitt\n(.*?)\n## ", readme, re.S).group(1)
    produktion = (ROT / "produktion/README.md").read_text(encoding="utf-8").split("\n", 1)[1]
    return (f'<section id="arbetsgang"><h2>Arbetsgång</h2><div class="text"><h3>Ett avsnitt</h3>{md(avsnitt)}'
            f'<h3>Produktion</h3>{md(produktion)}</div></section>')


def ruta(p: dict) -> str:
    e = html.escape
    if p.get("bild"):
        topp = f'<a class="bild" href="{e(p["bild"])}" target="_blank"><img loading="lazy" src="{e(p["bild"])}" alt="{e(p["namn"])}"></a>'
    elif p.get("farg"):
        topp = f'<div class="bild tom" style="background:{p["farg"]}"><span>ingen bild än</span></div>'
    else:
        topp = '<div class="bild tom"><span>ingen bild än</span></div>'
    namn = f'<a href="{e(p["lank"])}" target="_blank">{e(p["namn"])}</a>' if p.get("lank") else e(p["namn"])
    info = f'<p class="info">{e(p["info"])}</p>' if p.get("info") else ""
    vagar = "".join(f'<code title="Klicka för att kopiera">{e(v)}</code>' for v in p["vagar"])
    sok = e(" ".join([p["namn"], p["id"], p.get("info", "")] + p["vagar"]).lower())
    return f'<article data-sok="{sok}">{topp}<h3>{namn}</h3><button class="id" title="Kopiera">{e(p["id"])}</button>{info}<div class="vagar">{vagar}</div></article>'


def main() -> None:
    pilot = {p.stem for d in ("characters", "props", "backgrounds") for p in (ROT / "produktion" / d).rglob("*")}
    kit = ROT / ".claude/skills/crayon-cutout/assets"
    delar = [
        ("figurer", "Figurer", "Lilla Kritans figurer. Klicka på namnet för kortet.", kort("karaktarer")),
        ("platser", "Platser", "Lilla Kritans bakgrunder. Färgen är väggfärgen.", kort("bakgrunder")),
        ("rekvisita", "Rekvisita", "Lilla Kritans saker.", kort("rekvisita")),
        ("pilot-figurer", "Pilot: figurer", "Lilla Kvack, produktion/characters", bilder("produktion/characters")),
        ("pilot-saker", "Pilot: saker", "Lilla Kvack, produktion/props", bilder("produktion/props")),
        ("pilot-bakgrunder", "Pilot: bakgrunder", "Lilla Kvack, produktion/backgrounds", bilder("produktion/backgrounds")),
        ("kritkit", "Kritstil-kit", "Bara i skillen crayon-cutout", bilder(kit.relative_to(ROT).as_posix(), utom=pilot)),
    ]
    nav = '<a href="#arbetsgang">Arbetsgång</a>' + "".join(f'<a href="#{i}">{t} <small>{len(p)}</small></a>' for i, t, _, p in delar if p)
    sektioner = arbetsgang() + "".join(
        f'<section id="{i}"><h2>{t} <small>{len(p)}</small></h2><p class="om">{b}</p><div class="rutnat">{"".join(map(ruta, p))}</div></section>'
        for i, t, b, p in delar if p
    )
    (ROT / "index.html").write_text(MALL.replace("{nav}", nav).replace("{sektioner}", sektioner), encoding="utf-8")
    print(f"index.html: {sum(len(d[3]) for d in delar)} poster")


MALL = """<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lilla Kritan – galleri</title>
<style>
:root { --bg:#FAF8F2; --kort:#fff; --text:#2b2723; --dim:#7a726a; --linje:#e6e0d6; --accent:#E8553E; }
@media (prefers-color-scheme: dark) { :root { --bg:#1d1b19; --kort:#272421; --text:#f1ece4; --dim:#a39a8f; --linje:#3a3631; } }
* { box-sizing:border-box; }
body { margin:0; background:var(--bg); color:var(--text); font:15px/1.45 ui-rounded, system-ui, sans-serif; }
header { position:sticky; top:0; z-index:1; background:var(--bg); border-bottom:1px solid var(--linje); padding:12px 16px; }
h1 { margin:0 0 8px; font-size:22px; }
input { width:100%; max-width:420px; padding:8px 12px; border:1px solid var(--linje); border-radius:999px; background:var(--kort); color:var(--text); font:inherit; }
nav { display:flex; flex-wrap:wrap; gap:4px 14px; margin-top:8px; }
nav a { color:var(--dim); text-decoration:none; font-size:13px; }
nav a:hover { color:var(--accent); }
main { padding:0 16px 48px; }
section { padding-top:24px; scroll-margin-top:120px; }
h2 { margin:0; font-size:18px; }
small { color:var(--dim); font-weight:400; }
.om { margin:2px 0 12px; color:var(--dim); font-size:13px; }
.rutnat { display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:12px; }
article { background:var(--kort); border:1px solid var(--linje); border-radius:12px; padding:10px; min-width:0; }
.bild { display:flex; align-items:center; justify-content:center; aspect-ratio:1; border-radius:8px; background:#f1ede5; overflow:hidden; }
.bild img { width:100%; height:100%; object-fit:contain; }
.tom span { font-size:12px; color:#0008; background:#fff9; padding:2px 8px; border-radius:999px; }
h3 { margin:8px 0 2px; font-size:15px; overflow-wrap:anywhere; }
h3 a { color:inherit; }
.id { all:unset; cursor:pointer; font:12px ui-monospace, monospace; color:var(--accent); }
.info { margin:4px 0 0; font-size:12px; color:var(--dim); }
.vagar { margin-top:6px; display:flex; flex-direction:column; gap:2px; }
code { font-size:11px; color:var(--dim); overflow-wrap:anywhere; cursor:pointer; }
code:hover, .id:hover { text-decoration:underline; }
.text { max-width:720px; background:var(--kort); border:1px solid var(--linje); border-radius:12px; padding:4px 20px 12px; margin-top:12px; }
.text h3 { margin-top:16px; }
.text li { margin:4px 0; }
.text a { color:var(--accent); }
.text code { font-size:12px; cursor:auto; }
table { border-collapse:collapse; font-size:13px; width:100%; }
td { border-top:1px solid var(--linje); padding:6px 8px 6px 0; vertical-align:top; }
.dold { display:none; }
#kopierat { position:fixed; bottom:16px; left:50%; transform:translateX(-50%); background:var(--text); color:var(--bg); padding:6px 14px; border-radius:999px; font-size:13px; opacity:0; transition:opacity .2s; pointer-events:none; }
#kopierat.syns { opacity:1; }
</style>
</head>
<body>
<header>
<h1>Lilla Kritan 🖍️</h1>
<input id="sok" type="search" placeholder="Sök figur, plats, sak eller filnamn…" autocomplete="off">
<nav>{nav}</nav>
</header>
<main>{sektioner}</main>
<div id="kopierat">Kopierat</div>
<script>
const sok = document.getElementById('sok'), toast = document.getElementById('kopierat');
sok.addEventListener('input', () => {
  const q = sok.value.trim().toLowerCase();
  document.querySelectorAll('article').forEach(a => a.classList.toggle('dold', !!q && !a.dataset.sok.includes(q)));
  document.querySelectorAll('section').forEach(s => s.classList.toggle('dold', !s.querySelector('article:not(.dold)')));
});
document.addEventListener('click', e => {
  const t = e.target.closest('code, .id');
  if (!t) return;
  navigator.clipboard.writeText(t.textContent).then(() => {
    toast.textContent = 'Kopierat: ' + t.textContent;
    toast.classList.add('syns');
    setTimeout(() => toast.classList.remove('syns'), 1200);
  });
});
</script>
</body>
</html>
"""

if __name__ == "__main__":
    main()
