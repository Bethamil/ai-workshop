# 02 — Prompting: opdrachten schrijven voor agenten

## Wat werkt voor agenten (extra t.o.v. chat)
- Duidelijke taak + eindcriteria: wat is “klaar”? Welke bestanden/artefacten moeten er zijn?
- Context‑selectie: wijs mappen/bestanden aan die relevant zijn (of expliciet uitsluiten).
- Tools/constraints: mag de agent commando’s draaien, dependencies installeren, MCP’s gebruiken?
- Iteratie‑ritme: vraag om plan → implementatie → diff → validatie → reflectie.

## Prompt‑sjabloon (agent‑proof)
Rol: je bent een behulpzame AI‑agent die code schrijft en kleine taken plant.
Doel: [korte taak], succesvol wanneer [acceptatiecriteria].
Omgeving: relevante paden zijn [./src, ./public], negeer [./archive].
Constraints: geen netwerk calls, geen nieuwe deps zonder toestemming.
Output: geef een beknopt plan, voer het uit, toon diffs, stel 1 vraag ter bevestiging.

Voorbeeld (mini‑task):
“Maak `index.html` met een minimale hero‑sectie, 2 knoppen, en inline CSS. Succes: file bestaat, valide HTML, mobiele viewport goed. Plan → implementatie → diff → check.”

## Oefening: laat de AI je prompt verbeteren
1) Schrijf zelf een prompt voor een kleine taak (bijv. ‘voeg dark‑mode toe’).
2) Vraag de agent: “Verbeter mijn prompt voor uitvoerbaarheid, maak acceptatiecriteria expliciet en voeg 1 validatiestap toe.”
3) Laat de agent uitleggen waarom de verbeteringen helpen (token‑zuinig, minder ambiguïteit, betere tooling‑signalen).

## Mini‑reflectie
- Welke elementen maakten het verschil (acceptatiecriteria, padselectie, constraints)?
- Hoe kun je dit standaardiseren in je team (prompt‑templates, PR‑checklist, Definition of Done)?

---

Volgende: 03 — Website bouwen: speel met stack of ga vanilla.
