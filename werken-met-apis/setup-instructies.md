# Setup Instructies

## 🔧 Installatie en Configuratie

### 1. Python Environment

Zorg ervoor dat je Python 3.8 of hoger hebt geïnstalleerd:

```bash
python --version
# of
python3 --version
```

### 2. Virtual Environment (Aanbevolen)

Maak een virtuele omgeving aan voor deze workshop:

```bash
# Maak virtual environment aan
python -m venv ai-workshop-env

# Activeer de environment
# Op Windows:
ai-workshop-env\Scripts\activate

# Op macOS/Linux:
source ai-workshop-env/bin/activate
```

### 3. Dependencies Installeren

Installeer de benodigde Python packages:

```bash
pip install openai requests python-dotenv ipykernel
```

**Package uitleg:**
- `openai`: Officiële OpenAI client library
- `requests`: Voor HTTP requests naar APIs
- `python-dotenv`: Voor het laden van environment variabelen
- `ipykernel`: Voor Jupyter Notebook support

#### 3.1 Jupyter notebook extensie in vs code/windsurf/cursor
De extensie `Jupyter` is de meest eenvoudige manier om Jupyter Notebook te gebruiken. Vscode/windsurf/cursor geven automatisch de extensie aan.
Mocht je geen automatische installatie hebben, dan kan je de extensie handmatig installeren via de marketplace.

### 4. API Configuratie

Voor deze workshop raden we **OpenRouter** of **Ollama** aan! Ze zijn makkelijker en goedkoper/gratis.

#### 🌟 Optie A: OpenRouter (AANBEVOLEN)

OpenRouter geeft toegang tot veel AI modellen via één API!

1. Ga naar [OpenRouter](https://openrouter.ai/)
2. Maak een gratis account aan
3. Voeg credits toe aan je account
4. Ga naar API Keys en genereer een nieuwe key

**Voordelen:**
- Toegang tot veel modellen (GPT, Claude, Llama, etc.)
- Eenvoudige OpenAI-compatible API

#### 🏠 Optie B: Ollama Lokaal (GRATIS!)

Draai AI modellen lokaal op je eigen computer - helemaal gratis!

1. **Download Ollama:** [ollama.ai](https://ollama.ai)
2. **Installeer** voor jouw operating system
3. **Download een model:**
   ```bash
   # Voor beginners - kleine, snelle modellen
   ollama pull llama2:7b
   ollama pull codellama:7b
   
   # Meer advanced (als je computer het aankan)
   ollama pull llama2:13b
   ollama pull mistral:7b
   ```
4. **Start Ollama** - het draait automatisch op `http://localhost:11434`

**Voordelen:**
- Helemaal gratis!
- Privacy - alles blijft lokaal
- Geen internet nodig na installatie
- Experimenteer zoveel je wilt

#### 🔄 Optie C: OpenAI API

1. Ga naar [OpenAI Platform](https://platform.openai.com/api-keys)
2. Maak een API key aan (vereist betaalkaart)
3. Kopieer de key (bewaar hem veilig!)

**Let op:** OpenAI is relatief duur voor experimenteren!

#### 🎯 Andere Providers

Andere interessante providers met OpenAI-compatible APIs:
- **Together AI** - Snel en goedkoop
- **Groq** - Super snelle inference
- **Fireworks AI** - Goede open source modellen
- **Hugging Face Inference** - Veel model keuzes

### 5. Environment Variabelen

Gebruik het voorbeeld bestand `.env.example` om een `.env` bestand te maken:

```bash
cp .env.example .env
```

## 🔍 Veelvoorkomende Setup Problemen

### Problem: "ModuleNotFoundError: No module named 'openai'"

**Oplossing:**
```bash
pip install --upgrade openai
```

### Problem: "Authentication failed"

**Oplossing:**
1. Controleer of je API key correct is in `.env`
2. Zorg dat je geen spaties hebt rond de `=` in `.env`
3. Herstart je Python script na het wijzigen van `.env`

### Problem: "Connection refused" (Ollama)

**Oplossing:**
1. **Start Ollama:** `ollama serve` in terminal
2. **Check of het draait:** Open http://localhost:11434 in browser
3. **Test API:** `curl http://localhost:11434/v1/models`
4. **Model downloaden:** `ollama pull llama2:7b`

### Problem: OpenRouter "Model not found"

**Oplossing:**
1. Check beschikbare modellen op [OpenRouter Models](https://openrouter.ai/models)
2. Gebruik het exacte model ID, bijv: `openai/gpt-3.5-turbo`
3. Zorg dat je credits hebt (check je dashboard)

### Problem: Ollama "model not found"

**Oplossing:**
1. **Lijst lokale modellen:** `ollama list`
2. **Download model:** `ollama pull llama2:7b`
3. **Check exacte naam:** gebruik output van `ollama list`

### Problem: "Rate limit exceeded"

**Oplossing:**
1. Wacht even voor je het opnieuw probeert
2. Upgrade je API plan indien nodig
3. Implementeer rate limiting in je code

### Problem: Zwak of afgekapt antwoord bij reasoning-model

**Oplossing:**
1. Verhoog `max_tokens` in je API-call (bijv. 300–800)
2. Sommige providers noemen dit `max_output_tokens` bij reasoning-modellen
3. Probeer eventueel opnieuw met iets hogere waarde als het antwoord nog te kort is

## 📞 Hulp Nodig?

- Check [`troubleshooting.md`](troubleshooting.md) voor meer oplossingen
- Test je setup met `test_setup.py` na elke wijziging
- Bewaar je API keys altijd veilig en deel ze nooit

---

**Klaar voor de workshop? Start met [Opdracht 1: Eerste API Call](01-eerste-api-call.ipynb)! 🚀**
