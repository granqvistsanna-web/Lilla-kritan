# angen: behov i kitet

Det som stod här tidigare (2026-11-05) är infört i kitet och de lokala lösningarna är borttagna. Nytt:

## 1. `lastbilen.js`: tomt säte
När Bulle kliver ur vid 2:01 ska lastbilen stå kvar med ratten, men utan Bulle och utan tassarna på ratten. Det finns ingen pose för det.
**Förslag:** `b.pose({ tom: true })` döljer Bulle och rattens tassar, och ratten blir kvar.
**Här tills vidare:** ängen döljer `bil.bulle.g` och rattens ellipser (tassarna) efter `bil.pose` (`T.tassar` i `angen/index.html`).
