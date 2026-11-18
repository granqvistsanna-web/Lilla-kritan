#!/usr/bin/env python3
"""Feedbacksidan (feedback/index.html) från terminalen. Data: feedback.json och videos.json på grenen `data`,
media: releasen `forhandsvisningar`. Kräver gh (inloggad) och ffmpeg.

  python3 verktyg/feedback.py lista [EP]            öppen feedback (alla, eller ett avsnitt)
  python3 verktyg/feedback.py fixad ID [ID ...]     bocka av efter en fix
  python3 verktyg/feedback.py video EP FIL [--namn N] [--status granska] [--not "ny backe"]
                                                     gör förhandsvideo (640 px), ladda upp, uppdatera videos.json
  python3 verktyg/feedback.py status STATUS EP [EP ...]   sätt status (plan/pagar/granska/klar/live/arkiv) på videodokument
  python3 verktyg/feedback.py bilder EP FIL [FIL ...] [--etikett "0:29" ...] [--namn N] [--rader]
                                                     stillbilder i stället för film (bakgrunder, luckor)
"""
import argparse, base64, datetime, json, os, re, subprocess, sys, tempfile

REPO = "granqvistsanna-web/Lilla-kritan"
REL = f"https://github.com/{REPO}/releases/download/forhandsvisningar/"


def gh(*args, data=None):
    r = subprocess.run(["gh", "api", *args], input=data, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(r.stderr.strip() or r.stdout.strip())
    return json.loads(r.stdout) if r.stdout.strip() else None


def read(name):
    j = gh(f"repos/{REPO}/contents/{name}.json?ref=data")
    return j["sha"], json.loads(base64.b64decode(j["content"]))


def mutate(name, fn, msg):
    for _ in range(4):
        sha, d = read(name)
        fn(d)
        body = json.dumps({"message": msg, "branch": "data", "sha": sha,
                           "content": base64.b64encode((json.dumps(d, ensure_ascii=False, indent=1) + "\n").encode()).decode()})
        r = subprocess.run(["gh", "api", "-X", "PUT", f"repos/{REPO}/contents/{name}.json", "--input", "-"],
                           input=body, capture_output=True, text=True)
        if not r.returncode:
            return d
        if "409" not in r.stderr and "does not match" not in r.stderr:
            raise SystemExit(r.stderr.strip())
    raise SystemExit("krockade fyra gånger, försök igen")


def upload(src, name):
    """Upload src to the release as `name` (gh names the asset after the file, so copy it to that name first)."""
    dst = os.path.join(tempfile.mkdtemp(), name)
    subprocess.run(["cp", "-L", src, dst], check=True)
    subprocess.run(["gh", "release", "upload", "forhandsvisningar", dst, "--clobber", "-R", REPO], check=True, capture_output=True)
    return REL + name


def now(note):
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M") + (f" ({note})" if note else "")


def slug(ep):
    return re.sub(r"[^A-Za-z0-9-]", "-", ep)


def cmd_lista(a):
    _, fb = read("feedback")
    open_ = sorted(((i, d) for i, d in fb.items() if not d.get("fixed") and (a.ep is None or d["ep"] == a.ep)
                    and not (d.get("tags") and all(t == "bra" for t in d["tags"]))),
                   key=lambda x: (x[1]["ep"], x[1].get("sec", -1), x[1].get("at", 0)))
    for i, d in open_:
        tags = f" [{', '.join(d['tags'])}]" if d.get("tags") else ""
        print(f"{d['ep']:<8} {d.get('time') or 'hela':>6}  {i}{tags} {d.get('note', '')}")
    print(f"{len(open_)} öppna", file=sys.stderr)


def cmd_fixad(a):
    def fn(d):
        for i in a.id:
            if i not in d:
                raise SystemExit(f"finns inte: {i}")
            d[i]["fixed"] = True
    mutate("feedback", fn, f"feedback fixad: {', '.join(a.id)}")
    print("fixad:", *a.id)


def cmd_status(a):
    def fn(d):
        for e in a.ep:
            if e not in d:
                raise SystemExit(f"finns inte: {e}")
            d[e]["status"] = a.status
    mutate("videos", fn, f"videos status {a.status}: {', '.join(a.ep)}")
    print(a.status + ":", *a.ep)


def cmd_video(a):
    stamp = datetime.datetime.now().strftime("%m%d-%H%M")
    out = os.path.join(tempfile.mkdtemp(), f"{slug(a.ep)}-{stamp}.mp4")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", a.fil, "-vf", "scale=640:-2", "-c:v", "libx264", "-crf", "32",
                    "-preset", "veryfast", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", out], check=True)
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out],
                               capture_output=True, text=True, check=True).stdout)
    url = upload(out, os.path.basename(out))
    rel = os.path.relpath(os.path.abspath(a.fil))

    def fn(d):
        v = d.setdefault(a.ep, {})
        v.update(video=url, duration=round(dur, 1), rendered=now(a.not_), file=rel, status=a.status or v.get("status", "granska"))
        if a.utan_bilder:
            v.pop("stills", None)
        if a.namn:
            v["name"] = a.namn
    mutate("videos", fn, f"videos {a.ep}: ny förhandsvisning")
    print(f"{a.ep}: {url} ({os.path.getsize(out) / 1e6:.1f} MB, {dur:.1f} s)")


def cmd_bilder(a):
    stamp = datetime.datetime.now().strftime("%m%d-%H%M")
    labels = a.etikett or [os.path.splitext(os.path.basename(f))[0] for f in a.fil]
    stills = []
    for n, (f, lbl) in enumerate(zip(a.fil, labels)):
        stills.append({"label": lbl, "src": upload(f, f"{slug(a.ep)}-{stamp}-{n + 1}{os.path.splitext(f)[1].lower()}")})

    def fn(d):
        v = d.setdefault(a.ep, {})
        v.update(stills=stills, rendered=now(a.not_), status=a.status or v.get("status", "granska"))
        v.pop("video", None)
        if a.rader:
            v["layout"] = "rader"
        if a.namn:
            v["name"] = a.namn
    mutate("videos", fn, f"videos {a.ep}: {len(stills)} bilder")
    print(f"{a.ep}: {len(stills)} bilder")


p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
s = p.add_subparsers(required=True)
x = s.add_parser("lista"); x.add_argument("ep", nargs="?"); x.set_defaults(f=cmd_lista)
x = s.add_parser("fixad"); x.add_argument("id", nargs="+"); x.set_defaults(f=cmd_fixad)
x = s.add_parser("status"); x.add_argument("status", choices=["plan", "pagar", "granska", "klar", "live", "arkiv"])
x.add_argument("ep", nargs="+"); x.set_defaults(f=cmd_status)
for name, f in (("video", cmd_video), ("bilder", cmd_bilder)):
    x = s.add_parser(name); x.add_argument("ep")
    x.add_argument("fil", nargs="+" if name == "bilder" else None)
    x.add_argument("--namn"); x.add_argument("--status", choices=["plan", "pagar", "granska", "klar", "live", "arkiv"])
    x.add_argument("--not", dest="not_", default="", help="kort notis efter tiden, t.ex. 'förhandsvisning, utan ljud'")
    x.set_defaults(f=f)
s.choices["video"].add_argument("--utan-bilder", action="store_true", help="ta bort gamla stillbilder")
s.choices["bilder"].add_argument("--etikett", nargs="+"); s.choices["bilder"].add_argument("--rader", action="store_true")
a = p.parse_args()
a.f(a)
