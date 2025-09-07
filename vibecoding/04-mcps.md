# 04 — MCP’s (Model Context Protocol): context & tools, netjes gekoppeld

## Wat is MCP?
- Model Context Protocol: een open protocol om externe tools/gegevens als ‘servers’ aan je AI‑assistent te koppelen.
- Voordeel: gestandaardiseerde capabilities (acties, context, resources) i.p.v. ad‑hoc hacks.
- Praktisch: je kunt lokale of externe bronnen toevoegen (files, browsers, design‑tools, tests).

## Waarom handig bij vibecoding
- Rijke context: de agent ziet precies de bronnen die jij toelaat.
- Veiliger: duidelijke grenzen en capabilities per server.
- Herbruikbaar: dezelfde MCP‑server werkt in meerdere tools/agents.

## Voorbeelden
- context7 MCP: geeft compacte repo‑/projectcontext en samenvattingen voor snellere oriëntatie.
- playwright MCP: laat de agent tests genereren/uitvoeren of browseracties plannen (afhankelijk van implementatie/permissions). Verder geef je hierdoor je agent de capaciteit om door je website te klikken, fouten te ontdekken en evt screenshots te maken. 

## Figma Context MCP (vooruitblik op de eindopdracht)
- Repo: Figma Context MCP (link staat bij de eindopdracht). Haalt Figma‑frames/annotaties op als context voor je agent.
- Doel: dev/UX samenwerking versnellen—bouw UI direct vanuit design‑artefacten.

## Hoe voeg je een MCP toe (algemeen patroon)
0) Check jouw tool/IDE: integratie verschilt per tool. Zoek in de documentatie van jouw tool naar “MCP”, “Model Context Protocol”, “Tools/Servers” of “Integrations”. In veel IDE’s start de tool zélf de MCP‑server zodra je command + env hebt geconfigureerd.
1) Kies een MCP‑server (lees README: installatie, config, scopes/keys).
2) Installeer lokaal (bijv. `npm install`/`pip install`). Je hoeft de server meestal niet handmatig te starten; de IDE/tool doet dit zodra de configuratie klopt (command + env). Vaak is Python of Node vereist.
3) Koppel in je agent/IDE:
   - Tools met config‑file: voeg de server in de MCP‑config (pad/command + args).
   - Tools met UI: ga naar Integrations/Tools en voeg een MCP‑server toe met command.
4) Beperk capabilities: geef alleen de mappen/keys die nodig zijn.
5) Test: vraag de agent “Welke MCP’s zie je? Welke acties/resources zijn er?”

Tip per tool (oriëntatie):
- Check de documentatie van jouw tool/IDE voor specifieke integratie-instructies.

## Opdracht: voeg een MCP naar keuze toe
1) Zoek een interessante MCP (bijv. context7 of playwright) of een andere die bij je project past.
2) Installeer en koppel de server aan je agent volgens het patroon hierboven.
3) Prompt de agent om een kleine taak te doen die die MCP benut (bijv. test genereren of context samenvatten).
4) Noteer: wat levert dit op? Minder prompten? Betere precisie? Tokens/kosten?

## Tips voor kosten & veiligheid
- Houd logs aan: hoeveel MCP‑calls, hoeveel tokens.
- Scope secrets: zet Figma/API‑keys met minst‑nodige rechten.
- Zet max‑runtime/actiestappen zodat de agent niet onnodig blijft proberen.

---

Volgende: 05 — UX‑integratie + evaluatie: bouw met Figma‑context en reflecteer.
