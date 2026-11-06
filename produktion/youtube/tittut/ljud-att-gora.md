# Tittut – ljud att göra

Inköpslistan för röstbanken och ljudeffekterna i Tittut. Formatet står i [`format/tittut.md`](../../../format/tittut.md). Omskriven 2026-11-06 för riktig tittut: borta, paus, tittut. Inget blunda, ingen räkning och inget letande.

## Röst (ElevenLabs)

Samma berättarröst och inställningar som i Gissa teckningen: Multilingual v2, stability 0,6, similarity 0,8, style 0, speaker boost på, speed 0,9. Rader med ljudtagg inom hakparentes görs med Eleven v3. Varm och lekfull, aldrig skrämmande. Klipp bort tystnaden och exportera m4a.

Filerna läggs i `assets/ljud/roster/tittut/`. Varje delad replik kan finnas i upp till fem varianter. En film använder samma variantnummer genom hela filmen, och om en variant saknas används en annan som finns. **Variant 1 av varje räcker för första filmen.**

### Delade repliker

**Borta!** (när figuren glider ner bakom saken, lite hemlighetsfullt)

| Fil | Text | Status |
|---|---|---|
| `borta-1.m4a` | `[whispers] Borta!` | saknas |
| `borta-2.m4a` | `[playful] Borta!` | saknas |
| `borta-3.m4a` | `[whispers] Borta… borta…` | saknas |
| `borta-4.m4a` | `[playful] Oj! Borta!` | saknas |
| `borta-5.m4a` | `[whispers] Hon är borta…` | saknas |

**Tittut!** (glatt och lite överraskat, en liten paus mellan "Titt" och "ut")

| Fil | Text | Status |
|---|---|---|
| `tittut-1.m4a` | `[excited] Titt… ut!` | saknas |
| `tittut-2.m4a` | `[excited] Tittut!` | **finns** |
| `tittut-3.m4a` | `[laughs] Tittut!` | saknas |
| `tittut-4.m4a` | `[surprised] Titt… ut! Där är du!` | saknas |
| `tittut-5.m4a` | `[excited] Tittuuut!` | saknas |

**Hej då!**

| Fil | Text | Status |
|---|---|---|
| `hej-da-1.m4a` | `[warm] Hej då!` | saknas |
| `hej-da-2.m4a` | `[warm] Hej då! Vi leker igen snart.` | saknas |
| `hej-da-3.m4a` | `[warm] Hej då! Tittut en annan gång.` | saknas |
| `hej-da-4.m4a` | `[warm] Hej då! Vi ses i skogen.` | saknas |
| `hej-da-5.m4a` | `[warm] Hej hej!` | saknas |

### Per figur (spelas in en gång, används i alla filmer)

| Fil | Text | Status |
|---|---|---|
| `kanel-hej.m4a` | `[excited] Hej Kanel!` | **finns** |
| `kanel-var.m4a` | `[curious] Var är Kanel?` | **finns** |

### Strukna repliker

De här hörde till kurragömma-upplägget och används inte längre. Filerna som redan är gjorda ligger kvar i `assets/ljud/roster/tittut/`, men motorn använder dem inte: `blunda-1.m4a`, `dar-1.m4a` och `inte-dar-1.m4a`. Räkna ("Ett, två, tre!") och "Nu får du blunda!" behöver inte göras.

## Ljudeffekter (ElevenLabs SFX, 1,5–2 s)

Det här finns redan i `assets/ljud/effekter/`: `fniss` (Kanel när hon tittar fram), `duns` (det lilla hoppet), `pop` (när hon kommer fram), `swoosh` (när hon glider ner) och `skogsljud` (platsljudet).

Saknas:

| Fil | Används till | Prompt |
|---|---|---|
| `prassel-buske` | `skakar`: busken rör sig lite under pausen | `a small leafy bush rustling gently twice, soft leaves shaking, close, outdoors, no music, no voice` |
| `prassel-lov` | lövhögen när Kanel kommer upp ur den (skogen 2) | `a pile of dry autumn leaves rustling and scattering softly, close, outdoors, no music, no voice` |

## Att göra till första filmen

1. `borta-1`: [whispers] Borta!
2. `hej-da-1`: [warm] Hej då!
3. `prassel-buske` (ljudeffekt)

Allt annat som behövs finns redan.
