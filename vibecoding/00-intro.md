# 00 — Vibecoding (agentic coding): speels én praktisch

- Doel: leren werken met AI‑assistenten die zelf actie ondernemen (agentic), zodat je sneller iteraties maakt en nieuwe dev‑flows ontdekt.
- Toon: speels, nieuwsgierig, maar ook praktisch en ship‑gericht.
- Werkwijze: korte opdrachten, veel proberen, telkens reflecteren en door.

## Wat is vibecoding?
- Kort: bouwen in flow met een AI die meedenkt, acties voorstelt en taken uitvoert (files editen, tests draaien, tools aanroepen).
- Agentic: de AI is niet alleen een chat—het gebruikt tools, runt scripts, leest repo’s en houdt een plan bij.
- Vibe: je werkt dialogisch. Jij zet richting en constraints; de AI experimenteert en maakt voorstellen.

## Belangrijk onderscheid in gebruik
- Vibecoding: je test vooral of iets werkt en waar de energie zit—snelle POC’s, speelse experimenten, korte iteraties.
- Agentic coding + review: dit pas je in de praktijk toe—met plan/patch/diff/run/review, expliciete code‑review, tests en (optioneel) CI.

## Verwachting: agents ≈ mensen
- Ze maken fouten en hallucineren soms details; dat is normaal.
- In 1 prompt alles perfect is zeldzaam; reken op meerdere iteraties.
- Houd prompts klein en doelgericht; werk in stappen met duidelijke acceptatiecriteria.

## Git‑ritueel (veilig itereren)
- Werk op een branch. Laat de agent diffs tonen; review ze zelf.
- Zodra iets werkt zoals verwacht: commit meteen (klein en beschrijvend).
- Volgende stap mislukt of breekt dingen? Revert naar je laatste goede commit.
- Zo voorkom je dat een enthousiaste agent je hele project ‘stukmaakt’ zonder escape.

## Stoppen/annuleren (helemaal oké)
- Houd het proces in de gaten: als de agent onverwachte acties wil (massale refactor, nieuwe deps, netwerk‑calls), annuleer.
- Werk met approvals: vereis jouw akkoord vóór installs, schema‑migraties of destructieve acties (rm/reset).
- Stel grenzen in: max stappen, time‑outs, sandbox (geen netwerk), read‑only waar mogelijk.
- Vraag om “dry‑run” of “plan only” wanneer je twijfelt; voer pas uit na je review.

## Waarom interessant nu?
- Nieuwe dev‑ervaring: minder boilerplate, meer product/UX focus.
- Snellere leercurve: je krijgt direct voorbeelden, uitleg en alternatieven.
- Team‑samenwerking: UX, PM en devs kunnen samen ‘co‑builden’ via gedeelde AI context.
- Praktisch: veel tools zijn er al (IDE‑integraties, terminal‑agents, MCP‑servers).

## Hoe werken we in deze workshop
- Korte modules: tools, prompting, een kleine site bouwen, MCP’s, UX‑integratie.
- Keuzevrijheid: werk met je favoriete IDE, of volledig in de browser/vanilla code.
- Reflectie: na elke opdracht noteer je wat werkte en wat niet.

## Benodigd
- Een AI‑assistent naar keuze (bijv. Cursor, VS Code + Copilot Chat, Windsurf, Claude Code, Codex CLI, Cline, Kilo Code, enz.).
- Basis stack (optioneel): Node.js + npm/yarn of alleen een browser voor vanilla HTML/CSS/JS.
- Optioneel: Git + GitHub of lokale repo om iteraties te bewaren.

---

Volgende: 01 — Tools & applicaties: kies je setup en let op kosten.
