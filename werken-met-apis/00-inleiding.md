# Workshop: Werken met APIs

## Welkom bij de AI API Workshop!

In deze workshop leer je stap voor stap hoe je werkt met AI APIs, van je eerste simpele call tot geavanceerde toepassingen met geheugen, conversaties en function calling.

## 🎯 Wat ga je leren?

Deze workshop bestaat uit 5 praktische opdrachten die progressief opbouwen:

1. **Eerste API Call** - Maak je eerste verbinding met een AI API
2. **Geheugen Toevoegen** - Bouw conversaties met context en geheugen
3. **AI Conversaties** - Laat meerdere AI's met elkaar praten
4. **Function Calling** - Geef je AI toegang tot tools en functies
5. **JSON Verwerking** - Extract data en bouw je eigen applicatie

## 🛠️ Benodigdheden

### Technische Vereisten
- Python 3.8 of hoger
- Basis kennis van Python programmeren
- Een teksteditor of IDE (VS Code aanbevolen)
- Internet connectie

### API Access
Je hebt toegang nodig tot een OpenAI-compatible API. Opties:
- OpenAI API (officieel)
- Lokale API (Ollama, LM Studio, etc.)
- OpenRouter
- Andere OpenAI-compatible providers

### Python Dependencies
```bash
pip install openai requests python-dotenv
```

## 📓 Wat is een (Jupyter) Notebook?

Een notebook is een interactief document waarin je code, tekst (Markdown), plaatjes en uitvoer combineert. Je werkt in kleine “cells” die je los van elkaar kunt draaien. Onder water draait een kernel (Python‑proces) die variabelen in geheugen bewaart zolang de kernel actief is.

- Code cells: voer Python‑code stap voor stap uit en zie direct de output.
- Markdown cells: leg uit wat je doet, voeg links en formules toe.
- Stateful kernel: variabelen en imports blijven bestaan tussen cells.
- Rijke output: tabellen, grafieken, JSON en logging onder de cell.

## 🧪 Waarom notebooks voor experimenten?

- Snelle iteratie: pas een prompt/parameter aan en draai alleen die cell.
- Documenteer terwijl je bouwt: combineer uitleg, aannames en resultaten.
- Vergelijk opties: bewaar meerdere benaderingen naast elkaar in één file.
- Demo‑klaar: laat live zien wat er gebeurt, handig voor workshops.
- Data‑/API‑exploratie: inspecteer requests/responses en tussenstappen meteen.

## ⚠️ Waarop letten bij notebooks

- Uitvoer‑volgorde: cells kunnen out‑of‑order draaien. “Works on my machine” ontstaat snel doordat verborgen state (variabelen/imports) achterblijft.
- Kernel herstart: bij fouten of dependency‑wissels moet je vaak “Restart & Run All” doen om zeker te zijn dat alles vers werkt.
- Reproduceerbaarheid: leg versies vast (`requirements.txt` of `pip freeze > requirements.txt`) en gebruik waar nodig vaste seeds voor randomness.
- Geheimen/keys: zet API‑sleutels nooit hard‑coded in een notebook. Gebruik `.env` + `python-dotenv` en zorg dat `.env` in `.gitignore` staat.
- Versiebeheer: outputs kunnen groot zijn; overweeg outputs te clearen voor commit of gebruik tools als `nbstripout`/pre‑commit hooks.
- Kosten/limieten: API‑calls kosten geld en hebben rate limits. Log requests bewust en vermijd onnodige loops.
- Productierijpheid: notebooks zijn top voor R&D, minder voor productie. Splits herbruikbare logica uit naar `.py` modules zodra het stabiel wordt.

### Praktische tips

- Start schoon: “Restart Kernel” en daarna “Run All” om state‑issues te vangen.
- Kleine cells: één duidelijke stap per cell; hernoem variabelen expliciet.
- Config apart: laad instellingen/keys via `.env`; lees met `dotenv`.
- Logging: print of pretty‑print API‑responses (bijv. `json.dumps(..., indent=2)`).
- Fouten zoeken: minimaliseer een case tot de kleinste reproductie en test die.

## 📁 Workshop Structuur

```
werken-met-apis/
├── 00-inleiding.md              # Deze introductie
├── 01-eerste-api-call.ipynb     # Basis API verbinding
├── 02-geheugen-toevoegen.ipynb  # Conversatie context
├── 03-ai-conversaties.ipynb     # Multi-AI gesprekken
├── 04-function-calling.ipynb    # Tool gebruik
├── 05-json-verwerking.ipynb     # Data extractie
├── setup-instructies.md         # Installatie en configuratie
└── troubleshooting.md           # Veelvoorkomende problemen
```

## 🚀 Aan de Slag

1. Begin met [`setup-instructies.md`](setup-instructies.md) voor installatie
2. Werk de notebook opdrachten in volgorde door (01 → 02 → 03 → 04 → 05)
3. Run de code cells stap voor stap en experimenteer met de voorbeelden
4. Pas de code aan naar je eigen behoeften en probeer variaties

## 💡 Tips voor Succes

- **Neem je tijd**: Elke notebook bouwt voort op de vorige
- **Run cells stap voor stap**: Begrijp wat elke code cell doet
- **Experimenteer**: Probeer variaties op de voorbeelden
- **Debug systematisch**: Gebruik print statements om te begrijpen wat er gebeurt
- **Vraag hulp**: Check troubleshooting.md bij problemen

## 🎓 Leerresultaten

Na deze workshop kun je:
- ✅ Verbinding maken met verschillende AI API providers
- ✅ Conversaties met context en geheugen bouwen
- ✅ Complexe AI interacties orchestreren
- ✅ AI functionaliteit uitbreiden met function calling
- ✅ Gestructureerde data extractie implementeren
- ✅ Je eigen AI-powered applicaties ontwikkelen

---

**Veel succes met de workshop! 🎉**

*Begin met opdracht 1: [Eerste API Call](01-eerste-api-call.ipynb)*
