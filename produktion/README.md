# Produktion

Arbetsflödet från piloten *Lilla Kvack*, flyttat hit från `AI Video Tests`. Mapparna har samma inbördes struktur som förut, så skripten hittar varandra (`../characters`, `../cast.js` och så vidare).

| Mapp | Innehåll |
|---|---|
| `characters/`, `props/`, `backgrounds/` | Utklippta figurer, saker och bakgrundsplattor (PNG) |
| `code-shot/` | Scener som animeras i HTML. `cast.js` och `legs.js` delas av alla scener |
| `stick-guide/` | Pinnfigursfilmer som rörelsereferens till videomodellen |
| `storyboard/` | Storyboard i HTML |
| `audio/`, `music/`, `sfx/` | Takter, musik, Suno-prompter och ljudeffekter |
| `assembly/` | Skript som klipper ihop avsnittet med ffmpeg och mixar ljudeffekter |
| `youtube/` | Text och SEO för YouTube |

**Filmer checkas inte in.** `videos/` är en länk till `~/Downloads/AI Video Tests/videos` på den här datorn. Renderade `.mp4`, `stills/` och `storyboard/frames/` ignoreras av git.

Skills som hör till arbetsflödet ligger i `.claude/skills/`: `ai-video` (billig och jämn AI-video på OpenArt) och `crayon-cutout` (kritstilen).
