#!/bin/bash
# Renderar en kodscen i molnet (GitHub Actions, .github/workflows/render.yml) och lägger in filmen som render-delat.mjs gör.
#   bash verktyg/molnrender.sh <scenmapp> [--bitar 8] [--ut fil.mp4] [flaggor till render.mjs: --en …]
# Molnet ser bara det som är pushat: skriptet stoppar om scenens avsnitt, verktyg/ eller assets/ skiljer sig från origin.
# Efteråt: stoppar om en fil som saknades i molnet finns lokalt (inte pushad), flyttar den gamla filmen till aldre/,
# lägger in den nya och skriver effekt-wav:en lokalt och lägger den på som filmens ljud (AAC 192k, som render-delat.mjs;
# molnets film är bara bild). Med --ut blir det bara bilden. Se produktion/molnrendering-plan.md.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
SCEN=${1:?användning: bash verktyg/molnrender.sh <scenmapp> [--bitar 8] [--ut fil.mp4] [--en …]}; shift
SCEN=${SCEN%/}; BITAR=8; UT=; FLAGGOR=()
while [ $# -gt 0 ]; do case $1 in --bitar) BITAR=$2; shift 2;; --ut) UT=$(cd "$(dirname "$2")" && pwd)/$(basename "$2"); shift 2;; *) FLAGGOR+=("$1"); shift;; esac; done
R=$(dirname "$SCEN")/render.mjs; AVSNITT=$(dirname "$(dirname "$SCEN")")
[ -f "$SCEN/index.html" ] && [ -f "$R" ] || { echo "ingen kodscen: $SCEN"; exit 1; }

GREN=$(git rev-parse --abbrev-ref HEAD)
git fetch -q origin "$GREN"
# Arbetskopian mot origin, även ocommittat, för det scenerna läser. ponytail: andra avsnitt som scenen lånar från
# (004 läser 003) kontrolleras inte här; ändrade filer där syns inte, saknade fångas av saknas-kontrollen nedan.
ANDRAT=$(git diff --name-only "origin/$GREN" -- "$AVSNITT/scener" verktyg assets | grep -E '^avsnitt/|\.(png|jpe?g|json|js)$' || true)
if [ -n "$ANDRAT" ]; then echo "Molnet skulle rendera en annan version. Committa och pusha först:"; echo "$ANDRAT" | head -20; exit 1; fi

STD=$(node "$R" "$SCEN" "${FLAGGOR[@]+"${FLAGGOR[@]}"}" --langd 2>/dev/null | tail -1 | node -pe 'JSON.parse(require("fs").readFileSync(0)).ut')
UT=${UT:-$STD}
START=$(date -u +%Y-%m-%dT%H:%M:%SZ)
gh workflow run render.yml --ref "$GREN" -f scen="$SCEN" -f bitar="$BITAR" -f flaggor="${FLAGGOR[*]+"${FLAGGOR[*]}"}"
ID=
for _ in $(seq 20); do
  sleep 3
  ID=$(gh run list -w render.yml -e workflow_dispatch -L 10 --json databaseId,createdAt,displayTitle \
    --jq "[.[] | select(.createdAt >= \"$START\" and (.displayTitle | contains(\"$SCEN\")))] | last | .databaseId // empty")
  [ -n "$ID" ] && break
done
[ -n "$ID" ] || { echo "hittade inte körningen"; exit 1; }
echo "molnet renderar: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/actions/runs/$ID"
# Vänta med ett anrop varannan minut (inte gh run watch, som frågar var tredje sekund och tömde API-gränsen när många
# luckor renderades samtidigt, 2026-11-16). Misslyckade anrop (t.ex. gränsen nådd) räknas som "inte klar än".
while :; do
  sleep "${VANTA:-120}"
  LAGE=$(gh run view "$ID" --json status,conclusion -q '.status + " " + .conclusion' 2>/dev/null) || continue
  case $LAGE in completed\ success) break ;; completed\ *) gh run view "$ID" --log-failed | tail -30; exit 1 ;; esac
done

TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
gh run download "$ID" -n film -D "$TMP"
LOKALT=$(sed -n 's/^saknas: \/*//p' "$TMP/saknas.txt" | while read -r f; do [ -e "$f" ] && echo "$f"; done || true)
if [ -n "$LOKALT" ]; then echo "Saknades i molnet men finns lokalt (inte pushat?), filmen läggs inte in:"; echo "$LOKALT"; exit 1; fi

FILM="$TMP/film.mp4" ANM="utan ljud"
if [ "$UT" = "$STD" ]; then
  # effekt-wav:en (render.mjs --bara-ljud skriver ut sökvägen) under bilden; saknas den blir filmen stum med en varning
  LJUD=(); for f in "${FLAGGOR[@]+"${FLAGGOR[@]}"}"; do [ "$f" = --snabb ] || LJUD+=("$f"); done
  WAV=$(node "$R" "$SCEN" "${LJUD[@]+"${LJUD[@]}"}" --bara-ljud | grep '\.wav$' | tail -1 || true)
  if [ -n "$WAV" ] && [ -f "$WAV" ]; then
    ffmpeg -loglevel error -y -i "$TMP/film.mp4" -i "$WAV" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$TMP/med-ljud.mp4"
    FILM="$TMP/med-ljud.mp4" ANM="med ljud"
  else echo "varning: ingen effekt-wav, filmen blir utan ljud"; fi
fi
if [ -e "$UT" ]; then mkdir -p "$(dirname "$UT")/aldre"; mv "$UT" "$(dirname "$UT")/aldre/$(basename "$UT" .mp4)-$(date +%Y%m%d%H%M).mp4"; fi
cp "$FILM" "$UT"
echo "$UT: $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$UT") s från molnet, $ANM"
