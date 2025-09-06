# 01 — Tools & applicaties: kies je setup (en kosten!)

## IDE’s met ingebouwde agenten
- Cursor: VS Code‑achtige IDE met sterke AI‑edits, planning en repo‑context; goed voor refactors en feature‑scaffolding.
- VS Code + Copilot: bekend, stabiel; combineer met extensies (test runners, terminals) en repo‑context.
- Windsurf: AI‑first IDE met plan‑weergave, tasks en goede repo‑navigatie.

## Losse extensies/assistants
- Cline: open‑source agent in VS Code die taken plant en shell/files gebruikt.
- Kilo Code: Open source; Het beste van Cline + Roo coding agents; koppel je provider of openai compatible endpoint (bijv. OpenAI, Azure KiloCode, Ollama lokaal, LM studio lokaal, openRouter).
- Codex (CLI/IDE‑varianten): assistent met file‑edits, planning en terminal‑acties.

## Terminal‑varianten
- Claude Code: terminal/CLI agent met tool‑use en repo‑context. Claude agents
- Codex CLI: terminal‑based coding assistant met plannen, patches en shell‑acties. Openai agents
- Gemini CLI: Gemini agents
- Crush: Open source CLI met custom endpoints
- Warp: moderne terminal; Heeft ook eigen AI coding agents

## Lokale modellen (Ollama)
- Wat: draai modellen lokaal via Ollama; veel tools ondersteunen een OpenAI‑compatible endpoint op `http://localhost:11434/v1`.
- Integratie: zet in je tool `OPENAI_API_BASE=http://localhost:11434/v1` en een placeholder key (bijv. `OPENAI_API_KEY=ollama`).
- Modellen: `llama3.1:8b` (snel, betaalbaar in RAM), `llama3.1:70b` (zwaarder), coder‑varianten zoals `qwen2.5-coder:7b`.
- Realisme: vaak minder sterk dan frontier‑modellen (precisie, JSON‑discipline, tool‑use/function‑calling kan afwijken).
- Foutkans: langere contexten, strikte schema’s en e2e‑refactors kunnen misgaan; werk met kleinere stappen en goede acceptatiecriteria.
- Quick start: `brew install ollama`, `ollama pull llama3.1:8b`, dan in je agent de base‑URL instellen.

## API‑kosten en tokens (belangrijk!)
- Agentic coding gebruikt veel tokens: plannen, file‑diffs, logs en retries. Houd budget in de gaten.
- Prijsmodellen verschillen: sommige tools hebben abonnement/credits; anderen (zoals Kilo Code) laten je een eigen endpoint kiezen.
- Tips:
  - Zet model & max tokens bewust.
  - Log je verbruik (per taak/branch). (Kilo code doet dit bijvoorbeeld automatisch)
  - Prefetch/trim context: geef alleen relevante mappen/files.

## OpenAI‑like endpoints (algemene regel)
- Heb je een OpenAI‑compatible endpoint én een API‑key? Dan krijg je het in de meeste tools werkend door de base‑URL + key te zetten.
- Belangrijk: kies een model dat tool‑use/function‑calling goed ondersteunt; anders vallen agent‑features (files patchen, tools aanroepen) weg of worden onbetrouwbaar.
- Test klein: laat de agent 1 simpele tool‑call doen (bijv. een echo/tool‑schema) voordat je grotere taken draait.

## OpenRouter (OpenAI‑compatible gateway)
- Wat: meerdere modelproviders via één API. Handig als je wilt wisselen tussen modellen zonder je tooling te veranderen.
- Key: maak een API key aan op OpenRouter
- Config (algemeen):
  - `OPENAI_API_KEY=<jouw-openrouter-key>`
  - `OPENAI_API_BASE=https://openrouter.ai/api/v1`
  - Kies een model ID (bijv. `qwen/qwen3-30b-a3b`, `x-ai/grok-code-fast-1`, `google/gemini-2.0-flash-001`), afhankelijk van je tool. Check: https://openrouter.ai/rankings voor de leaderboard. Extra tip: Kies een model dat niet teveel geld kost.
- Let op:
  - Kosten en rate‑limits verschillen per model; check het dashboard.

## Andere OpenAI‑compatible endpoints (kort)
- Voorbeelden: Azure OpenAI, Groq, Together, Fireworks, DeepInfra, zelf‑gehost (vLLM/LM Studio), of gateways zoals OpenRouter.
- Werkt meestal zo: zet je base‑URL + API‑key in de tool en kies een model.
- Let op: gebruik een model dat tools/function‑calling ondersteunt; anders werken agent‑flows beperkt.
- Tip: check even of jouw tool “Chat Completions” of “Responses” verwacht en doe een mini‑proef (1 tool‑call) vóór je echte taak.

## Snelle setup‑keuzes
- Wil je zero‑install? Start met vanilla HTML/CSS/JS en een webserver (of zelfs alleen local files).
- Volledige IDE‑flow? Kies Cursor, Windsurf of VS Code + Kilo Code extensie.
- CLI‑liefhebber? Gebruik Claude Code of Codex CLI en laat de agent tasks runnen.

## Mini‑opdracht
1) Kies één tool en open een lege map of bestaande repo.
2) Laat de agent een korte “Hello Workshop” taak doen (README aanmaken met doelen + TODO’s).
3) Noteer: hoe plant de agent? Welke files wil het zien? Hoeveel context vraagt het?
4) Ga nu andere tools uitproberen en doe hetzelfde

### Extra mini‑opdrachten (optie)
- Ollama: stel `OPENAI_API_BASE` naar `http://localhost:11434/v1`, kies `llama3.1:8b`, en laat de agent een kleine refactor in 1 file doen. Review de diff.
- OpenRouter: stel `OPENAI_API_BASE=https://openrouter.ai/api/v1` en gebruik je key. Run dezelfde taak met een frontier‑model en vergelijk precisie/tokens.

---

Volgende: 02 — Prompting: schrijf opdrachten waar agenten echt mee kunnen werken.
