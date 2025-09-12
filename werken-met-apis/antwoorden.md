# Antwoorden – Werken met API’s

Hier vind je voorbeeldantwoorden bij de reflectie-/kennisvragen aan het einde van elke opdracht. Gebruik ze als leidraad; er zijn vaak meerdere goede antwoorden.

## Opdracht 1 – Eerste API Call
- Temperature: bepaalt creativiteit/variatie (laag = voorspelbaar, hoog = creatief/meer risico op afdwalen).
- OpenAI vs OpenRouter vs Ollama: OpenAI is een hosted provider met eigen modellen; OpenRouter is een aggregator/proxy naar veel modellen van verschillende providers; Ollama draait lokaal modellen via een OpenAI‑compatibele API.
- Altijd kort antwoord: system prompt (“antwoord kort, max 1–2 zinnen”), eventueel `max_tokens` limiteren en lagere `temperature` (bijv. 0.2–0.5).

## Opdracht 2 – Geheugen Toevoegen
- Rollen: `system` (kader/rol), `user` (invoer van gebruiker), `assistant` (modelantwoord).
- Waarom memory management: kosten/latency verlagen, contextlimiet voorkomen, irrelevante details samenvatten, consistentie bewaken.
- Boos bij onbeleefd: via system‑regels (toonregels), detecteer onbeleefdheid en geef begrensde feedback; eventueel eenvoudige heuristiek of moderatie/tooling.
- Te lange message list: context wordt afgekapt of te duur; los op met samenvatten, pruning of relevante vensters.

## Opdracht 3 – AI Conversaties
- Variatie in antwoorden: verschillen in system prompts/persoonlijkheid, hogere `temperature`, eigen modellen per karakter, niet exact voorgaande zinnen echoën, korte antwoorden forceren.
- Temperature 0.8 vs 0.1: 0.8 geeft gevarieerder en minder repetitief taalgebruik (leuker gesprek), 0.1 is veilig maar snel herhalend.
- Emotionelere AI: expliciete instructies (emotietaal/stijl), interne state (mood) die toon beïnvloedt, evt. kleine “gevoelssamenvattingen” per beurt.
- Interessante gesprekken: duidelijke rollen/meningsverschillen, concrete doelen/scenario’s, korte beurten, callbacks naar eerder genoemde feiten, uiteenlopende persoonlijkheden/modellen.

## Opdracht 4 – Tools/Function Calling
- 3 hoofdstappen: (1) model vraagt om tool (functie en parameters) (2) jij voert tool uit (server‑side) (3) je geeft toolresultaat terug aan het model voor het vervolgantwoord.
- Tooldefinitie onderdelen: `type="function"`, `function.name`, `function.description`, `function.parameters` (JSON Schema).
- `tool_choice="auto"`: model besluit zelf wanneer/welke tool; minder orkestratie, simpelere code en vaak betere UX.

## Opdracht 5 – JSON Verwerking
- Gestructureerde JSON genereren: strikte system‑instructie “alleen JSON”, evt. `response_format`/JSON mode als beschikbaar, voorbeeld/schemas meegeven, en achteraf `json.loads` + validatie.
- Validatie belang: betrouwbaarheid (downstream code breekt niet), veiligheid (onverwachte output), consistente datastructuren, makkelijker debuggen.
- Alles combineren: AI laat JSON maken → valideer → verwerk (berekeningen/formattering) → toon in app; combineer voorafgaande patronen (geheugen, tools, parameters).
- Voordelen JSON: taal‑agnostisch, makkelijk te parsen/valideren, breed ondersteund, compact en goed voor APIs.

