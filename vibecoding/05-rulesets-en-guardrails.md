# 05 — Rulesets & guardrails

Doel: ontwerp, configureer en test een eigen ruleset die jouw vibecoding-agent binnen veilige en productieve grenzen houdt. Jij bepaalt de spelregels; de agent moet ze naleven.

## Waarom rulesets?
- Agenten hebben veel macht: ze lezen files, draaien scripts en schrijven code. Zonder grenzen pakken ze misschien je `.env` of draaien dure taken.
- Guardrails houden je workflow betrouwbaar: ze dwingen verplichte checks af, blokkeren gevoelige paden en maken intenties expliciet.
- Je leert documenteren: een duidelijke ruleset is herbruikbaar voor teamgenoten en maakt je setup auditbaar.

## Wat kan je doen?
- Een werkende ruleset/configuratie voor jouw tool (Cursor, Cline, Windsurf, Claude Code, Codex CLI, …)
- Korte documentatie (Markdown in deze repo of je eigen notities) met: 
  - Welke regels actief zijn en waarom
  - Hoe je ze hebt ingesteld (config-bestand, UI, CLI, etc.)
  - Resultaten van je tests (geslaagd/mislukt, eventuele tweaks)
- Reflectie: 3 learnings of open vragen.

> Je krijgt geen kant-en-klare oplossing: zoek in de documentatie van jouw tool hoe je permissies, allow-/deny-lijsten, auto-approval of plan hooks instelt. Gebruik de community of support docs als bron.

## Stap 1 — Scope & risico’s
- Inventariseer wat je agent nu kan: lezen/schrijven, shell, netwerk?
- Maak een snelle risico-lijst: gevoelige files, scripts die je standaard wilt blokkeren, acties die altijd review nodig hebben.
- Bepaal verplichte stappen: tests, linters, `dry-run`, commit-check, logboek?

## Stap 2 — Onderzoek je tool
- Zoek naar keywords als “rules”, “guardrails”, “policies”, “allowlist”, “unsafe operations”.
- Noteer waar de settings leven: config-file (`.cursorrules`, `clinerc`, `codebuddy.json`, `claude.MD`, `.kilocode`), UI toggles of CLI flags.
- Kijk of de tool sandboxing/approval ondersteunt en hoe je default gedrag kunt aanpassen.

## Stap 3 — Schrijf je regels
Richtlijnen:
- **Blokkeer gevoelige paden**: `.env`, `secrets/`, `*.pem`, `~/.ssh/`. Laat eventueel alleen lezen toe na handmatige goedkeuring.
- **Verplicht acties**: bv. voor elke `package.json` edit → `npm test -- --watch=false`, of dwing een plan-samenvatting af voor file writes.
- **Definieer communicatie**: hoe moet de agent toestemming vragen? Welke informatie moet in de prompt staan (reden, impact, fallback)?

Voorbeeld (pseudo):
```yaml
rules:
  - id: deny-env
    match: "**/.env"
    actions: [read, write]
    on_violation: "Vraag om handmatige review en motiveer waarom je de secret nodig hebt."
  - id: require-tests
    trigger: "package.json"
    enforce:
      command: "npm test"
      note: "Draai tests na dependency updates of scripts."
  - id: default-plan
    before:
      request: "Schrijf een plan met max 5 stappen en wacht op bevestiging."
```

Pas dit aan je echte tool aan: sommige werken met JSON, anderen met YAML, prompt-templates of UI toggles.

## Stap 4 — Test scenario’s
- **Negatief**: laat de agent proberen `.env` te openen. Verwacht blokkade of review-vraag.
- **Positief**: geef een normale taak en check dat de flow nog soepel blijft.
- **Verplichtingen**: triggert je “altijd tests” regel echt? Wat als tests falen?
- Log de uitkomst (screenshot, terminal output, of korte beschrijving).

## Stap 5 — Documenteer & reflecteer
- Schrijf op welke regels werken, welke false positives geven en wat nog ontbreekt.
- Denk na over teamwork: hoe deel je deze regels met collega’s? Hoe houd je ze up-to-date?
- Reflecteer: wat was lastig aan het beperken van een agent? Welke nieuwe prompts of rituelen ga je gebruiken?

## Bonus
- Bouw een “incident playbook”: wat doe je als je agent toch iets gevaarlijks probeert? (b.v. rollback, audit log, notificatie).
- Maak meerdere profielen: een strenge setup voor productiecode, een lossere voor prototypes.
- Automatiseer validatie: script dat checkt of de ruleset voldoet aan je eigen checklist.

Veel succes! Ga hierna door naar 06 — UX-integratie & evaluatie voor een gezamenlijke afronding van je vibecoding-workflow.
