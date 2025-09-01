# 🛠️ Troubleshooting & FAQ

## 🚨 Veelvoorkomende Problemen & Oplossingen

### 🔐 API Key & Authentication Problemen

#### ❌ "Authentication failed" / "Invalid API key"

**Symptomen:**
- `AuthenticationError: Error code: 401`
- `Invalid API key provided`
- `Authentication failed`

**Oplossingen:**
1. **Check je .env bestand:**
   ```bash
   cat .env
   ```
   Zorg dat er geen spaties zijn rond de `=`:
   ```env
   # ❌ FOUT
   OPENAI_API_KEY = sk-your-key
   
   # ✅ GOED
   OPENAI_API_KEY=sk-your-key
   ```

2. **Herstart je Python script** na het wijzigen van `.env`

3. **Test je API key handmatig:**
   ```bash
   # Voor OpenRouter
   curl -H "Authorization: Bearer sk-or-your-key" https://openrouter.ai/api/v1/models
   
   # Voor OpenAI
   curl -H "Authorization: Bearer sk-your-key" https://api.openai.com/v1/models
   ```

4. **Controleer of je key nog geldig is** in je provider dashboard

#### ❌ "API key not found in environment"

**Oplossing:**
```python
import os
from dotenv import load_dotenv

# Zorg dat je dit altijd doet VOOR je de key gebruikt!
load_dotenv()

# Test of de key geladen is
api_key = os.getenv('OPENAI_API_KEY')
print(f"API Key gevonden: {'Ja' if api_key else 'Nee'}")
if api_key:
    print(f"Key begint met: {api_key[:10]}...")
```

### 🌐 Connectie Problemen

#### ❌ "Connection refused" (Ollama)

**Symptomen:**
- `Connection refused`
- `Failed to connect to localhost:11434`

**Oplossingen:**
1. **Check of Ollama draait:**
   ```bash
   # Start Ollama service
   ollama serve
   ```

2. **Test in browser:** Ga naar http://localhost:11434
   - Werkend = "Ollama is running"
   - Niet werkend = connection error

3. **Check beschikbare modellen:**
   ```bash
   ollama list
   ```

4. **Download een model als je er geen hebt:**
   ```bash
   ollama pull llama2:7b
   ```

#### ❌ "Model not found" (Ollama)

**Oplossingen:**
1. **Lijst beschikbare modellen:**
   ```bash
   ollama list
   ```

2. **Download het gewenste model:**
   ```bash
   # Populaire modellen voor de workshop
   ollama pull llama2:7b          # Goed voor beginners
   ollama pull codellama:7b       # Goed voor code
   ollama pull mistral:7b         # Sneller alternatief
   ollama pull llama2:13b         # Beter maar langzamer
   ```

3. **Gebruik exacte model naam:**
   ```python
   MODEL_NAME = "llama2:7b"  # Gebruik wat je ziet in `ollama list`
   ```

#### ❌ OpenRouter "Model not available"

**Oplossingen:**
1. **Check beschikbare modellen:** https://openrouter.ai/models

2. **Gebruik correcte model ID:**
   ```python
   # ❌ FOUT
   MODEL_NAME = "gpt-3.5-turbo"
   
   # ✅ GOED voor OpenRouter
   MODEL_NAME = "openai/gpt-3.5-turbo"
   ```

3. **Check je credits:** Login op OpenRouter dashboard

### 📦 Python Package Problemen

#### ❌ "ModuleNotFoundError: No module named 'openai'"

**Oplossingen:**
1. **Installeer/update OpenAI package:**
   ```bash
   pip install --upgrade openai
   ```

2. **Check of je in de juiste environment zit:**
   ```bash
   # Activeer je virtual environment eerst!
   source ai-workshop-env/bin/activate  # macOS/Linux
   # of
   ai-workshop-env\Scripts\activate     # Windows
   
   # Dan installeer packages
   pip install openai requests python-dotenv
   ```

3. **Check geïnstalleerde packages:**
   ```bash
   pip list | grep openai
   ```

#### ❌ Jupyter Notebook kan packages niet vinden

**Oplossing:**
```bash
# Installeer packages IN je notebook environment
pip install --user openai requests python-dotenv

# Of in je notebook cell:
!pip install openai requests python-dotenv
```

### 💸 Rate Limits & Credits

#### ❌ "Rate limit exceeded"

**Symptomen:**
- `Error code: 429`
- "Too many requests"

**Oplossingen:**
1. **Wacht even en probeer opnieuw** (30-60 seconden)

2. **Implementeer rate limiting:**
   ```python
   import time
   
   def safe_api_call(client, **kwargs):
       try:
           return client.chat.completions.create(**kwargs)
       except Exception as e:
           if "rate limit" in str(e).lower():
               print("Rate limit hit, wachten 30 seconden...")
               time.sleep(30)
               return client.chat.completions.create(**kwargs)
           raise e
   ```

3. **Upgrade je plan** (voor OpenAI/OpenRouter)

#### ❌ "Insufficient credits"

**Oplossingen:**
1. **Check je balance:**
   - OpenRouter: Login → Dashboard
   - OpenAI: Platform → Usage

2. **Schakel naar gratis lokaal model:**
   ```env
   # Verander van betaalde naar gratis
   OPENAI_API_KEY=ollama
   OPENAI_API_BASE=http://localhost:11434/v1
   MODEL_NAME=llama2:7b
   ```

### 🔧 Code Problemen

#### ❌ "AttributeError: 'dict' object has no attribute 'choices'"

**Symptoom:**
```python
response.choices[0].message.content  # AttributeError!
```

**Oorzaak & Oplossing:**
```python
# Check wat je daadwerkelijk terugkrijgt
print(type(response))
print(response)

# Mogelijk krijg je een error dict terug
if isinstance(response, dict) and 'error' in response:
    print(f"API Error: {response['error']}")
else:
    # Normal response processing
    content = response.choices[0].message.content
```

#### ❌ JSON parsing errors in opdracht 5

**Oplossing:**
```python
import re
import json

def robust_json_extract(text):
    """Robuuste JSON extractie"""
    # Probeer verschillende patterns
    patterns = [
        r'```json\n(.*?)\n```',     # Code block
        r'```\n(.*?)\n```',         # Generic code block  
        r'(\{.*?\})',               # Simple object
        r'(\[.*?\])'                # Array
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, text, re.DOTALL)
        for match in matches:
            try:
                return json.loads(match.strip())
            except json.JSONDecodeError:
                continue
    
    # Als geen JSON gevonden, return raw text
    return {"raw_response": text, "error": "No valid JSON found"}
```

#### ❌ "Context length exceeded"

**Symptomen:**
- "Token limit exceeded"
- "Context too long"

**Oplossingen:**
1. **Kort je messages in:**
   ```python
   def trim_conversation(messages, max_messages=10):
       """Behoud alleen recente messages"""
       if len(messages) > max_messages:
           # Behoud system message + recente messages
           system_msg = [msg for msg in messages if msg["role"] == "system"]
           recent_msgs = messages[-(max_messages-len(system_msg)):]
           return system_msg + recent_msgs
       return messages
   ```

2. **Gebruik kortere prompts:**
   ```python
   # ❌ Te lang
   prompt = "Vertel me een heel uitgebreid verhaal over..." # 1000+ woorden
   
   # ✅ Korter en krachtiger
   prompt = "Maak een kort verhaal van 3 zinnen over..."
   ```

## 🔍 Debug Tips

### 🕵️ API Response Debuggen

```python
def debug_api_call(client, **kwargs):
    """Debug wrapper voor API calls"""
    print("🔍 API CALL DEBUG")
    print(f"Model: {kwargs.get('model')}")
    print(f"Messages: {len(kwargs.get('messages', []))} messages")
    
    try:
        response = client.chat.completions.create(**kwargs)
        print("✅ API call successful")
        print(f"Response type: {type(response)}")
        
        if hasattr(response, 'choices'):
            print(f"Choices: {len(response.choices)}")
            content = response.choices[0].message.content
            print(f"Response length: {len(content)} characters")
            return response
        else:
            print(f"Unexpected response: {response}")
            return response
            
    except Exception as e:
        print(f"❌ API Error: {e}")
        print(f"Error type: {type(e)}")
        return {"error": str(e)}
```

### 🔧 Environment Debug Script

Maak `debug_setup.py`:

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

def debug_environment():
    """Complete environment debug"""
    print("🔍 ENVIRONMENT DEBUG")
    print("=" * 50)
    
    # 1. Check .env file
    env_file = ".env"
    if os.path.exists(env_file):
        print(f"✅ .env file gevonden")
        load_dotenv()
    else:
        print(f"❌ .env file NIET gevonden")
        return
    
    # 2. Check environment variables
    api_key = os.getenv('OPENAI_API_KEY')
    base_url = os.getenv('OPENAI_API_BASE')
    model = os.getenv('MODEL_NAME')
    
    print(f"API Key: {'✅ Set' if api_key else '❌ Missing'}")
    print(f"Base URL: {base_url}")
    print(f"Model: {model}")
    
    if not api_key:
        print("\n❌ API Key missing! Check je .env file")
        return
    
    # 3. Test API connection
    try:
        client = OpenAI(api_key=api_key, base_url=base_url)
        
        print(f"\n🔧 Testing connection to: {base_url}")
        
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": "Test: say 'hello'"}],
            max_tokens=10
        )
        
        print("✅ API Connection successful!")
        print(f"Response: {response.choices[0].message.content}")
        
    except Exception as e:
        print(f"❌ API Connection failed: {e}")
        
        # Geef specifieke tips
        error_str = str(e).lower()
        if "authentication" in error_str:
            print("💡 TIP: Check je API key")
        elif "connection" in error_str:
            print("💡 TIP: Check of Ollama draait (voor lokale setup)")
        elif "model" in error_str:
            print("💡 TIP: Check of je model naam klopt")

if __name__ == "__main__":
    debug_environment()
```

Run met: `python debug_setup.py`

## 📋 Model Aanbevelingen

### 🏠 Lokale Modellen (Ollama)

**Voor beginners:**
- `llama2:7b` - Goed balans tussen kwaliteit en snelheid
- `codellama:7b` - Specciaal voor code
- `mistral:7b` - Sneller en moderner

**Voor betere hardware:**
- `llama2:13b` - Betere kwaliteit
- `codellama:13b` - Betere code kwaliteit

**Installeren:**
```bash
# Basis set
ollama pull llama2:7b
ollama pull codellama:7b
ollama pull mistral:7b

# Check wat je hebt
ollama list
```

### 🌐 Online Modellen (OpenRouter)

**Goedkoop en goed:**
- `openai/gpt-3.5-turbo` - Klassieke keuze
- `meta-llama/llama-2-7b-chat` - Open source
- `mistralai/mistral-7b-instruct` - Snel en goed

**Premium (duurder maar beter):**
- `openai/gpt-4` - Beste kwaliteit
- `anthropic/claude-3-haiku` - Snel en slim
- `meta-llama/llama-2-70b-chat` - Grote open source

## 🆘 Laatste Redmiddelen

### Als Niets Werkt

1. **Complete fresh start:**
   ```bash
   # Nieuwe directory
   mkdir ai-workshop-fresh
   cd ai-workshop-fresh
   
   # Nieuwe virtual env
   python -m venv fresh-env
   source fresh-env/bin/activate
   
   # Install packages
   pip install openai requests python-dotenv
   
   # Copy workshop files
   cp -r ../werken-met-apis/* .
   ```

2. **Schakel naar volledig lokaal:**
   ```bash
   # Installeer Ollama
   # Download https://ollama.ai
   
   # Start het op
   ollama serve
   
   # Download een klein model
   ollama pull llama2:7b
   ```

3. **Gebruik het minimalistische setup:**
   ```python
   from openai import OpenAI
   
   client = OpenAI(
       api_key="ollama",
       base_url="http://localhost:11434/v1"
   )
   
   response = client.chat.completions.create(
       model="llama2:7b",
       messages=[{"role": "user", "content": "Hallo!"}]
   )
   
   print(response.choices[0].message.content)
   ```

### Contacteer Hulp

Als je nog steeds vastloopt:
1. **Kopieer je error message volledig**
2. **Noteer welke stappen je al geprobeerd hebt**  
3. **Deel je environment info** (run `debug_setup.py`)
4. **Vraag om hulp bij de workshop begeleider**

---

## 🎯 Quick Reference

### Handige Commands

```bash
# Ollama
ollama list                    # Toon geïnstalleerde modellen
ollama pull llama2:7b         # Download model
ollama serve                  # Start Ollama server
curl http://localhost:11434   # Test of Ollama draait

# Python Environment  
pip list                      # Toon packages
pip install --upgrade openai  # Update OpenAI package
python debug_setup.py         # Test je setup

# Files
cat .env                      # Bekijk environment variabelen
ls -la                        # Toon alle files
```

### Emergency API Keys

Voor in noodgevallen - gratis options:

1. **Ollama (lokaal, gratis):**
   ```env
   OPENAI_API_KEY=ollama
   OPENAI_API_BASE=http://localhost:11434/v1
   MODEL_NAME=llama2:7b
   ```

2. **OpenRouter (gratis credits):**
   - Ga naar https://openrouter.ai
   - Sign up krijgt gratis credits
   - API compatible met OpenAI

---

**🎉 Success? Ga terug naar de workshop en rock those AI APIs!**