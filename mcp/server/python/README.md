# Clean MCP Server Template

*Let op: de Engelse versie staat verderop in dit bestand.*

## Wat is inbegrepen

Dit schone server-sjabloon bevat:

- ✅ Basale MCP-serverconfiguratie met stdio-transport
- ✅ Voorbeeldresource (`welcome://info`)
- ✅ Voorbeeldtools (`echo` en `get_server_info`)
- ✅ Degelijke foutafhandeling en logging
- ✅ Type hints en documentatie
- ✅ Klaar om uit te breiden met eigen functionaliteit

## Snelstart

### 1. Python-omgeving instellen (Python 3.10+)

```bash
# Maak een virtuele omgeving (aanbevolen)
python3 -m venv mcp-server-env
source mcp-server-env/bin/activate  # Op macOS/Linux

# Installeer afhankelijkheden
pip install -r requirements.txt
```

### 2. Start de server

```bash
python server.py
```

De server start en luistert naar MCP-clientverbindingen via stdio.

### 3. Test de server

Je kunt de server testen met elke MCP-compatibele client. De server levert:

**Resources:**
- `welcome://info` - Basisinformatie over de server

**Tools:**
- `echo` - Geeft een bericht terug
- `get_server_info` - Toont serverinformatie

### 4. Inspecteer met MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

Wanneer de Inspector UI opent (v0.16.8+), start je de server met:
- Command: `./mcp-server-env/bin/python`
- Arguments: `server.py`

Stel de werkmap in op je lokale projectmap als daarom wordt gevraagd. Vernieuw daarna de tabs Tools en Resources om `echo`, `get_server_info` en `welcome://info` interactief te verkennen.

## Server uitbreiden

### Nieuwe tools toevoegen

```python
@server.call_tool()
async def handle_call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
    if name == "your_new_tool":
        # Voeg hier je tool-logica toe
        return [TextContent(type="text", text="Tool result")]
```

Vergeet niet om de tool toe te voegen aan de functie `handle_list_tools()`!

### Nieuwe resources toevoegen

```python
@server.list_resources()
async def handle_list_resources() -> list[Resource]:
    return [
        # Bestaande resources...
        Resource(
            uri="your://new-resource",
            name="Your New Resource",
            description="Beschrijving van je resource",
            mimeType="text/plain",
        )
    ]
```

En handel het af in `handle_read_resource()`:

```python
from mcp.server.lowlevel.helper_types import ReadResourceContents


@server.read_resource()
async def handle_read_resource(uri: str) -> list[ReadResourceContents]:
    if str(uri) == "your://new-resource":
        return [
            ReadResourceContents(
                content="Your resource content",
                mime_type="text/plain",
            )
        ]
```

## Ideeën voor uitbreidingen

Hier zijn enkele ideeën om de server tijdens de workshop uit te breiden:

1. **Bestandssysteem-integraties**
   - Bestanden lezen/schrijven
   - Mappeninhoud tonen
   - Bestanden zoeken

2. **API-integraties**
   - Weer-API
   - Nieuws-API
   - Social media-API's
   - Databankkoppelingen

3. **Dataverwerkingstools**
   - CSV/JSON verwerken
   - Datatransformaties
   - Statistische berekeningen

4. **Systeemintegratie**
   - Systeeminformatie
   - Procesbeheer
   - Omgevingsvariabelen

5. **Webscraping**
   - HTML-parsing
   - Contentextractie
   - URL-verwerking

## Projectstructuur

```
clean-mcp-server/
├── server.py          # Hoofdimplementatie van de server
├── requirements.txt   # Python-afhankelijkheden
├── run_server.sh      # Hulpscript om de server te starten
├── setup.py           # Script om de omgeving op te zetten
├── examples.py        # Voorbeelden voor uitbreidingen
└── README.md          # Dit bestand
```

## Probleemoplossing

### Veelvoorkomende problemen

**Importfout voor MCP SDK:**
```bash
pip install git+https://github.com/modelcontextprotocol/python-sdk@main
```

**Server wil niet starten:**
- Controleer de Python-versie (3.10+ vereist)
- Zorg dat alle afhankelijkheden zijn geïnstalleerd
- Kijk of er syntaxfouten in `server.py` zitten

**Client kan geen verbinding maken:**
- Controleer of de server draait
- Gebruik je stdio-transport?
- Verifieer de clientconfiguratie

## Volgende stappen

1. **Verken de code**: lees `server.py` om de structuur te begrijpen
2. **Voeg je eerste tool toe**: maak bijvoorbeeld een rekenmachine of tekstverwerker
3. **Koppel een API**: integreer met een openbare API naar keuze
4. **Maak custom resources**: voeg configuratiebestanden of databronnen toe
5. **Test alles**: controleer of je uitbreidingen correct werken

## Bronnen

- [MCP SDK Documentatie](https://github.com/modelcontextprotocol/python-sdk)
- [MCP Specificatie](https://spec.modelcontextprotocol.io/)
- [Voorbeeld MCP-servers](https://github.com/modelcontextprotocol/servers)

---

Veel succes met bouwen! 🚀

Deze server is bedoeld als een schoon en uitbreidbaar startpunt voor je MCP-project.

---

## English Version

A minimal MCP (Model Context Protocol) server implementation using the official MCP SDK. Perfect for learning and as a starting point for building custom MCP servers.

## What's Included

This clean server template includes:

- ✅ Basic MCP server setup with stdio transport
- ✅ Example resource (`welcome://info`)
- ✅ Example tools (`echo` and `get_server_info`)
- ✅ Proper error handling and logging
- ✅ Type hints and documentation
- ✅ Ready to extend with your own functionality

## Quick Start

### 1. Setup Python Environment (Python 3.10+)

```bash
# Create a virtual environment (recommended)
python3 -m venv mcp-server-env
source mcp-server-env/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python server.py
```

The server will start and listen for MCP client connections via stdio.

### 3. Test the Server

You can test the server using any MCP-compatible client. The server provides:

**Resources:**
- `welcome://info` - Basic server information

**Tools:**
- `echo` - Echo back a message
- `get_server_info` - Get server information

### 4. Inspect with MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

When the Inspector UI opens (v0.16.8+), launch the server with the following values:
- Command: `./mcp-server-env/bin/python`
- Arguments: `server.py`

Set the working directory to your local project folder if the UI asks. Once connected, refresh the Tools and Resources tabs to explore `echo`, `get_server_info`, and `welcome://info` interactively.

## Extending the Server

### Adding New Tools

```python
@server.call_tool()
async def handle_call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
    if name == "your_new_tool":
        # Your tool logic here
        return [TextContent(type="text", text="Tool result")]
```

Don't forget to add the tool to the `handle_list_tools()` function!

### Adding New Resources

```python
@server.list_resources()
async def handle_list_resources() -> list[Resource]:
    return [
        # Existing resources...
        Resource(
            uri="your://new-resource",
            name="Your New Resource",
            description="Description of your resource",
            mimeType="text/plain",
        )
    ]
```

And handle it in `handle_read_resource()`:

```python
from mcp.server.lowlevel.helper_types import ReadResourceContents


@server.read_resource()
async def handle_read_resource(uri: str) -> list[ReadResourceContents]:
    if str(uri) == "your://new-resource":
        return [
            ReadResourceContents(
                content="Your resource content",
                mime_type="text/plain",
            )
        ]
```

## Common Extensions Ideas

Here are some ideas for extending this server during the workshop:

1. **File System Integration**
   - Read/write files
   - List directory contents
   - File search functionality

2. **API Integrations**
   - Weather API
   - News API
   - Social media APIs
   - Database connections

3. **Data Processing Tools**
   - CSV/JSON processing
   - Data transformation
   - Statistical calculations

4. **System Integration**
   - System information
   - Process management
   - Environment variables

5. **Web Scraping**
   - HTML parsing
   - Content extraction
   - URL processing

## Project Structure

```
clean-mcp-server/
├── server.py          # Main server implementation
├── requirements.txt   # Python dependencies
├── run_server.sh      # Convenience launcher script
├── setup.py           # Environment bootstrap script
├── examples.py        # Sample extensions
└── README.md          # This file
```

## Troubleshooting

### Common Issues

**Import Error for MCP SDK:**
```bash
pip install git+https://github.com/modelcontextprotocol/python-sdk@main
```

**Server won't start:**
- Check Python version (3.10+ required)
- Ensure all dependencies are installed
- Check for any syntax errors in server.py

**Can't connect from client:**
- Ensure the server is running
- Check that you're using stdio transport
- Verify the client configuration

## Next Steps

1. **Explore the Code**: Read through `server.py` to understand the structure
2. **Add Your First Tool**: Try adding a simple calculator or text processor
3. **Connect to an API**: Integrate with a public API of your choice
4. **Create Custom Resources**: Add configuration files or data sources
5. **Test Everything**: Make sure your additions work properly

## Resources

- [MCP SDK Documentation](https://github.com/modelcontextprotocol/python-sdk)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)

---

Happy building! 🚀

This server is designed to be a clean, extensible foundation for your MCP server development journey.
