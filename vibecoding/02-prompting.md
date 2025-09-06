# 02 — Prompting: opdrachten schrijven voor agenten

## Wat werkt voor agenten (extra t.o.v. chat)
- Duidelijke taak + eindcriteria: wat is “klaar”? Welke bestanden/artefacten moeten er zijn?
- Context‑selectie: wijs mappen/bestanden aan die relevant zijn (of expliciet uitsluiten).
- Tools/constraints: mag de agent commando’s draaien, dependencies installeren, MCP’s gebruiken?
- Iteratie‑ritme: vraag om plan → implementatie → diff → validatie → reflectie.

## User‑message sjabloon (copy‑paste)
Plak dit als eerste gebruikersbericht. De meeste tools hebben al een system‑prompt; dit werkt dus als user message.

Taak: [korte taakomschrijving]
Acceptatiecriteria: [concreet: bestanden, gedrag, tests]
Omgeving: werk alleen in [./… paden]; negeer [./…]
Beperkingen: geen netwerk/deps zonder mijn akkoord; geen destructieve acties; max [N] stappen.
Werkwijze:
- Maak eerst een kort plan (max 5 bullets) en wacht op mijn akkoord.
- Toon daarna alleen diffs/patches per file en leg elke wijziging in 1 zin uit.
- Vraag expliciet: "Akkoord om toe te passen? (ja/nee)" vóór je verdergaat.
- Na akkoord: voer validatie uit (lint/test/run) binnen sandbox en toon resultaten.
- Stel 1 vervolgvraag of een logische volgende stap.
Audit: noteer gebruikte tools/commando’s.
Stop: als iets buiten scope/risicovol is, stop en stel 1 verduidelijkingsvraag.

Voorbeeld (mini‑task):
“Maak `index.html` met een minimale hero‑sectie, 2 knoppen, en inline CSS. Succes: file bestaat, valide HTML, mobiele viewport goed. Plan → implementatie → diff → check.”

## Gebruik plan-modes
Als de tool die je gebruikt plan-modes ondersteunt, maak daar dan gebruik van.  
Hiermee laat je de AI eerst een plan opstellen voordat hij aan de uitvoering begint. Dat zorgt vaak voor betere, gestructureerde resultaten.

## Oefening: laat de AI je prompt verbeteren
1) Schrijf zelf een prompt voor een kleine taak (bijv. ‘voeg dark‑mode toe’).
2) Vraag de agent: “Verbeter mijn prompt voor uitvoerbaarheid, maak acceptatiecriteria expliciet en voeg 1 validatiestap toe.”
3) Laat de agent uitleggen waarom de verbeteringen helpen (token‑zuinig, minder ambiguïteit, betere tooling‑signalen).

## Mini‑reflectie
- Welke elementen maakten het verschil (acceptatiecriteria, padselectie, constraints)?
- Hoe kun je dit standaardiseren in je team (prompt‑templates, PR‑checklist, Definition of Done)?

---

Volgende: 03 — Website bouwen: speel met stack of ga vanilla.
