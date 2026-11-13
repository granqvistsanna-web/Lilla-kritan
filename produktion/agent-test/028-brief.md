# Testuppgift: en fixrunda på 028 Leoparden bygger i sanden

Läs `AGENTS.md` i repots rot först, särskilt avsnitt 2, 4, 8, 9 och 10. Läs sedan `.claude/skills/bilderbok/SKILL.md` och de delar av `.claude/skills/lk-figur/SKILL.md` som du behöver.

## Uppgiften

Sanna har granskat avsnitt 028 och lämnat fyra feedbackpunkter. Fixa dem i scenen.

**Arbeta bara i den här filen:**
`avsnitt/028-leoparden-bygger-i-sanden/scener/stranden-test/index.html`

Det är en kopia av scenen `stranden/` som den såg ut när feedbacken gavs. Rör inga andra filer: inte `stranden/`, inte rekvisita, riggar eller `verktyg/`. Behöver du ändra något annat för att lösa en punkt, skriv det i rapporten i stället.

**Titta inte i git-historiken** (`git log`, `git show`, `git diff` mot andra commits) och inte i `produktion/agent-test/`. Det är ett blindtest och facit ligger där.

## Feedbacken (Sannas ord, tid i färdig film)

1. **1:56** – "hide spaden a bit more"
2. **2:10** – "spaden moves for no reason"
3. "place white seashell in bg to the left"
4. **3:38** – "improve the fitting of leo i badring"

Filmtiden är scentid + 1,0 s (introt är 1 s logotyp). 1:56 är alltså ca 115 s in i scenen, 2:10 ca 129 s och 3:38 ca 217 s.

## Så renderar och kontrollerar du

Stå i `avsnitt/028-leoparden-bygger-i-sanden/scener/` och kör:

```bash
node render.mjs stranden-test 115 129 217
```

Det ger `stranden-test/stills/<t>.jpg` och ett kontaktark `stranden-test/stills/sheet.jpg`. Ta fler tider runt varje punkt (t.ex. var 0,5 s) för att se rörelsen, inte bara en bild. Rendera ingen hel film; en snabb förhandsvisning (`--snabb --fran 110 --till 135`) är tillåten om du vill se rörelse.

Titta på bilderna själv innan du säger att något är klart. Kontrollera särskilt reglerna om vita kanter, att inget flyger iväg i luften, lugn rörelse och att leoparden är rätt lagrad mot ringen.

## Rapport

Skriv en kort rapport till `avsnitt/028-leoparden-bygger-i-sanden/scener/stranden-test/RAPPORT.md`:

- per punkt: vad orsaken var, vad du ändrade (konstanter, rader) och varför
- vilka stillbilder du kontrollerade (tider) och vad du såg
- något du inte kunde lösa, eller där du är osäker på vad Sanna menar
- ungefär hur lång tid det tog
