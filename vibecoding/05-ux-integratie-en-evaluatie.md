# 05 — UX‑integratie (Figma Context MCP) + evaluatie

Doel: bouw een website op basis van een Figma‑design, met hulp van de Figma Context MCP. Sluit af met reflectie.

## Voorbereiding: Figma Context MCP koppelen
- Repo: https://github.com/GLips/Figma-Context-MCP
- Rollen:
  - UX: levert de Figma‑designlink en een view‑token (Personal Access Token met minimaal benodigde scopes).
  - Dev: hoeft geen token aan te maken; gebruikt het aangeleverde token alleen als env‑var/config.
- Stappen (algemeen):
  1) Lees de README. Zorg dat je Python of Node lokaal hebt (afhankelijk van de server‑implementatie).
  2) Installeer dependencies indien nodig. Je IDE/tool start de MCP‑server meestal automatisch op basis van de configuratie (command + env).
  3) Koppel de server in jouw agent/IDE (MCP‑integrations of config‑file) en voeg het aangeleverde Figma‑view‑token als env‑var toe.
  4) Test: vraag je agent welke frames/components beschikbaar zijn en om een korte samenvatting.

## Opdracht: bouw vanuit een Figma‑frame
1) Kies één Figma‑frame (mobile of desktop) met een heldere hero, navigatie en 2–3 componenten.
2) Prompt: “Gebruik Figma Context MCP om het geselecteerde frame te analyseren en maak een implementatie‑plan. Output: componentlijst, styles (typografie, spacing), en mapping naar mijn stack (Next.js/vanilla).”
3) Laat de agent scaffolds maken:
   - Next.js: `app`/`pages`, componentenmap, globale styles, variabelen.
   - Vanilla: `index.html`, `styles.css` (CSS vars), `app.js` (event handlers).
4) Vraag om 1 responsive break‑point (mobile‑first) en controle van kleurcontrast.
5) Itereer: “Maak een diff met verbeterde semantiek (landmarks, aria‑labels) en leg kort uit waarom.”

## Samenwerking met UX (mini‑ritueel)
- Dev → UX: laat de agent een “Design delta” rapport schrijven (waar week implementatie af, waarom?).
- UX → Dev: vraag om 3 quick‑wins (margins, typografie, states) en laat de agent een patch voorstellen.
- Gezamenlijk: stel een kleine Definition of Done op voor UI‑kwaliteit (contrast, focus states, min‑tap targets, empty states).

## Validatie (lichtgewicht)
- Vraag de agent om een korte Playwright/Cypress‑spec te schetsen (niet per se uitvoeren) voor: render, nav werkt, knop‑actie.
- Laat een axe‑check of checklist genereren voor WCAG AA basispunten.

## Evaluatie (reflectievragen)
- Wat heb je geleerd over vibecoding en agentic flows?
- Wanneer liet je de agent teveel/te weinig beslissen? Wat was de sweet spot?
- Hoe ga je dit toepassen in je eigen werk (templates, MCP‑set, team‑afspraken)?
- Kosten: waar gingen tokens aan op? Wat ga je limiteren of automatiseren (context‑trimming, modelkeuze, max steps)?

## Afronding
- Bewaar je beste prompts, plannen en diffs in de repo (of wiki).
- Deel 3 learnings met je team en kies 1 standaard prompt‑sjabloon dat je meteen gaat gebruiken.

---

Einde workshop. Bonus: voeg nog één MCP toe en laat de agent een kleine ‘design‑to‑code’ variatie bouwen (bijv. tweede frame).
