> **Let op:** De Engelse versie van deze documentatie staat verderop in dit bestand.

# Schone MCP-Server Template (TypeScript)

Een minimale MCP (Model Context Protocol) serverimplementatie met de officiële TypeScript SDK. Perfect om te leren en als startpunt voor het bouwen van je eigen MCP-servers met Node.js.

## Wat zit erin

Deze schone serversjabloon bevat:

- ✅ TypeScript-first-ontwikkeling met volledige typesafety
- ✅ Moderne ES-modules en Node.js best practices
- ✅ Voorbeeldresource (`welcome://info`)
- ✅ Voorbeeldtools (`echo` en `get_server_info`)
- ✅ Correcte foutafhandeling en logging
- ✅ Hot-reload-ontwikkelsetup met `tsx`
- ✅ Type-check-buildscript (klaar om code te genereren zodra je dit configureert)
- ✅ Klaar om uit te breiden met je eigen functionaliteit

## Snelle start

### Vereisten

- Node.js 18+ geïnstalleerd
- npm of yarn als pakketmanager

### 1. Node.js-omgeving instellen

```bash
# Installeer afhankelijkheden
npm install

# Of met yarn
yarn install
```

### 2. Ontwikkelmodus

```bash
# Start in ontwikkelmodus met hot reload
npm run dev

# Of met yarn
yarn dev
```

### 3. Controleer types in het project

```bash
# Voer een typecontrole uit zonder JavaScript te genereren
npm run build
```

`tsc` draait met `"noEmit": true`, dus dit commando controleert alleen de types. Wil je JavaScript genereren, schakel dan `noEmit` uit in `tsconfig.json` of maak een aparte buildconfiguratie voordat je `npm start` uitvoert.

### 4. Snelle start van de ontwikkeling

```bash
# Voer de server direct in TypeScript uit (geen buildstap)
npm run start:ts
```

De server luistert vervolgens via stdio naar inkomende MCP-clientverbindingen.

### 5. Test de server

Je kunt de server testen met elke MCP-compatibele client. De server levert:

**Bronnen:**
- `welcome://info` - Basisinformatie over de server

**Tools:**
- `echo` - Stuurt een bericht ongewijzigd terug
- `get_server_info` - Geeft serverinformatie

### Inspecteer de server met MCP Inspector

1. Installeer de inspector lokaal: `npx @modelcontextprotocol/inspector`
2. Start de inspector en voer bij het commandoveld `npx` in
3. Geef `tsx server.ts` op als argument zodat de inspector rechtstreeks het TypeScript-entrypoint start

De inspector start het Node.js-proces (via `tsx`) en laat je tools, bronnen en antwoorden interactief verkennen.

## De server uitbreiden

### Nieuwe tools toevoegen

Voeg in de handler voor `CallToolRequestSchema` nieuwe cases toe:

```typescript
case "your_new_tool":
  const input = args?.input as string || "";
  return {
    content: [
      {
        type: "text",
        text: `Resultaat van je tool: ${input}`
      }
    ]
  };
```

Vergeet niet om de tool ook toe te voegen in de handler voor `ListToolsRequestSchema`!

### Nieuwe bronnen toevoegen

Breid de handler voor `ListResourcesRequestSchema` uit:

```typescript
{
  uri: "your://new-resource",
  name: "Jouw nieuwe resource",
  description: "Beschrijving van je resource",
  mimeType: "text/plain"
}
```

En behandel de resource in de handler voor `ReadResourceRequestSchema`:

```typescript
case "your://new-resource":
  return {
    contents: [
      {
        uri,
        mimeType: "text/plain",
        text: "Inhoud van je resource"
      }
    ]
  };
```

## Ideeën voor uitbreidingen

Enkele ideeën om deze server tijdens de workshop uit te breiden:

1. **Bestandintegratie**
   - Lees of schrijf bestanden met de Node.js-`fs`-module
   - Toon mappeninhoud
   - Zoek functionaliteit in bestanden

2. **API-integraties**
   - Haal data op uit REST-API's
   - GraphQL-clientintegratie
   - Databaseverbindingen (MongoDB, PostgreSQL, enz.)

3. **Tools voor dataverwerking**
   - CSV/JSON verwerken
   - Datatransformatie
   - Webscraping met cheerio

4. **Systeemintegratie**
   - Systeeminformatie via de `os`-module
   - Procesbeheer
   - Omgevingsvariabelen

5. **Realtime-functionaliteit**
   - WebSocket-verbindingen
   - Server-sent events
   - Bestandsbewaking

## Beschikbare scripts

- `npm run dev` - Start de ontwikkelserver met hot reload
- `npm run build` - Controleert het project op types (genereert standaard geen output)
- `npm start` - Start de gecompileerde server (schakel eerst emit in)
- `npm run start:ts` - Voer TypeScript direct uit (ontwikkelmodus)
- `npm run clean` - Leeg de buildmap
- `npm run lint` - Voer ESLint uit
- `npm run format` - Format de code met Prettier

## Projectstructuur

```
clean-mcp-server/
├── server.ts          # Hoofdimplementatie van de server
├── package.json       # Node.js-afhankelijkheden en scripts
├── tsconfig.json      # TypeScript-configuratie
├── README.md          # Dit bestand
└── dist/              # Verschijnt alleen als je TypeScript-emit inschakelt
```

## TypeScript-features

Deze sjabloon gebruikt moderne TypeScript-features:

- **Strikte typecontrole** - Vind fouten tijdens het compileren
- **ES2022-target** - Gebruik de nieuwste JavaScriptfeatures
- **ES-modules** - Moderne import/export-syntax
- **Optionele emit-instellingen** - Klaar om source maps en declaratiebestanden te genereren zodra `noEmit` is uitgeschakeld

## Probleemoplossing

### Veelvoorkomende problemen

**Module niet gevonden:**
```bash
npm install
# of
yarn install
```

**TypeScript-compilatiefouten:**
```bash
# Controleer je TypeScript-versie
npx tsc --version

# Maak schoon en voer de build opnieuw uit
npm run clean
npm run build
```

**Server start niet:**
- Controleer of je Node.js-versie 18+ is
- Zorg dat alle afhankelijkheden zijn geïnstalleerd
- Controleer op TypeScript-compilatiefouten
- Genereer JavaScript voordat je `npm start` uitvoert (schakel `noEmit` uit)

**Client kan niet verbinden:**
- Controleer of de server draait
- Zorg dat je stdio-transport gebruikt
- Verifieer de clientconfiguratie

## Ontwikkeltips

### Ontwikkelen met hot reload

Gebruik `npm run dev` voor de beste ervaring:
- Start automatisch opnieuw bij wijzigingen
- Geen buildstap nodig
- TypeScript-fouten direct zichtbaar

### Typesafety

Deze sjabloon is volledig getypeerd. Maak gebruik van TypeScript-voorzieningen:

```typescript
// Definieer interfaces voor je data
interface MyToolArgs {
  input: string;
  options?: {
    format: 'json' | 'text';
  };
}

// Gebruik correcte typing in handlers
const args = request.params.arguments as MyToolArgs;
```

### Foutafhandeling

Omwikkel gevoelige logica altijd met try/catch:

```typescript
try {
  // Je toollogica hier
  return { content: [{ type: "text", text: "Succes!" }] };
} catch (error) {
  logger.error(`Tool mislukt: ${error}`);
  throw new Error(`Tool-uitvoering mislukt: ${error instanceof Error ? error.message : String(error)}`);
}
```

## Volgende stappen

1. **Verken de code**: Lees `server.ts` om de structuur te begrijpen
2. **Bouw je eerste tool**: Voeg een eenvoudige rekenmachine of tekstbewerker toe
3. **Koppel een API**: Gebruik `fetch` of `axios` om externe diensten te integreren
4. **Maak eigen bronnen**: Voeg configuratiebestanden of databronnen toe
5. **Voeg typedefinities toe**: Maak interfaces voor je datastructuren
6. **Genereer JavaScript (optioneel)**: Verwijder `"noEmit": true` of maak een aparte `tsconfig.build.json` wanneer je gecompileerde output wilt
7. **Test alles**: Controleer of je uitbreidingen goed werken

## Bronnen

- [MCP TypeScript SDK Documentatie](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP-specificatie](https://spec.modelcontextprotocol.io/)
- [TypeScript-documentatie](https://www.typescriptlang.org/docs/)
- [Node.js-documentatie](https://nodejs.org/docs/)

---

Veel bouwplezier! 🚀

Deze server is ontworpen als schone, uitbreidbare basis voor je MCP-serverontwikkeling met TypeScript en Node.js.

---

> English version below

# Clean MCP Server Template (TypeScript)

A minimal MCP (Model Context Protocol) server implementation using the official TypeScript SDK. Perfect for learning and as a starting point for building custom MCP servers with Node.js.

## What's Included

This clean server template includes:

- ✅ TypeScript-first development with full type safety
- ✅ Modern ES modules and Node.js best practices
- ✅ Example resource (`welcome://info`)
- ✅ Example tools (`echo` and `get_server_info`)
- ✅ Proper error handling and logging
- ✅ Hot reload development setup with `tsx`
- ✅ Type-check build script (ready to emit code when configured)
- ✅ Ready to extend with your own functionality

## Quick Start

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### 1. Setup Node.js Environment

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### 2. Development Mode

```bash
# Run in development mode with hot reload
npm run dev

# Or with yarn
yarn dev
```

### 3. Type-Check the Project

```bash
# Type-check the project without emitting JavaScript
npm run build
```

`tsc` runs with `"noEmit": true`, so this command verifies types only. If you
want to generate JavaScript, disable `noEmit` in `tsconfig.json` or create a
separate build config before running `npm start`.

### 4. Quick Development Start

```bash
# Run directly with TypeScript (no build step)
npm run start:ts
```

The server will start and listen for MCP client connections via stdio.

### 5. Test the Server

You can test the server using any MCP-compatible client. The server provides:

**Resources:**
- `welcome://info` - Basic server information

**Tools:**
- `echo` - Echo back a message
- `get_server_info` - Get server information

### Inspect the Server with MCP Inspector

1. Install the inspector locally: `npx @modelcontextprotocol/inspector`
2. Launch the inspector and, in the command input field, enter `npx`
3. Provide `tsx server.ts` as the arguments so the inspector starts the
   TypeScript entrypoint directly

The inspector will spawn the Node.js process (via `tsx`) and let you explore
tools, resources, and responses interactively.

## Extending the Server

### Adding New Tools

In the `CallToolRequestSchema` handler, add new cases:

```typescript
case "your_new_tool":
  const input = args?.input as string || "";
  return {
    content: [
      {
        type: "text",
        text: `Your tool result: ${input}`
      }
    ]
  };
```

Don't forget to add the tool to the `ListToolsRequestSchema` handler!

### Adding New Resources

In the `ListResourcesRequestSchema` handler:

```typescript
{
  uri: "your://new-resource",
  name: "Your New Resource",
  description: "Description of your resource",
  mimeType: "text/plain"
}
```

And handle it in the `ReadResourceRequestSchema` handler:

```typescript
case "your://new-resource":
  return {
    contents: [
      {
        uri,
        mimeType: "text/plain",
        text: "Your resource content here"
      }
    ]
  };
```

## Common Extensions Ideas

Here are some ideas for extending this server during the workshop:

1. **File System Integration**
   - Read/write files using Node.js `fs` module
   - List directory contents
   - File search functionality

2. **API Integrations**
   - Fetch data from REST APIs
   - GraphQL client integration
   - Database connections (MongoDB, PostgreSQL, etc.)

3. **Data Processing Tools**
   - CSV/JSON processing
   - Data transformation
   - Web scraping with cheerio

4. **System Integration**
   - System information using `os` module
   - Process management
   - Environment variables

5. **Real-time Features**
   - WebSocket connections
   - Server-sent events
   - File watching

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Type-check the project (no output emitted by default)
- `npm start` - Run the compiled server (enable emit first)
- `npm run start:ts` - Run TypeScript directly (development)
- `npm run clean` - Clean build directory
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
clean-mcp-server/
├── server.ts          # Main server implementation
├── package.json       # Node.js dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── README.md          # This file
└── dist/              # Appears only if you enable TypeScript emit
```

## TypeScript Features

This template uses modern TypeScript features:

- **Strict type checking** - Catch errors at compile time
- **ES2022 target** - Use latest JavaScript features
- **ES modules** - Modern import/export syntax
- **Optional emit settings** - Pre-configured to generate source maps and
  declaration files once `noEmit` is disabled

## Troubleshooting

### Common Issues

**Module not found errors:**
```bash
npm install
# or
yarn install
```

**TypeScript compilation errors:**
```bash
# Check your TypeScript version
npx tsc --version

# Clean and rebuild
npm run clean
npm run build
```

**Server won't start:**
- Check Node.js version (18+ required)
- Ensure all dependencies are installed
- Check for any TypeScript compilation errors
- Generate JavaScript output before running `npm start` (disable `noEmit`)

**Can't connect from client:**
- Ensure the server is running
- Check that you're using stdio transport
- Verify the client configuration

## Development Tips

### Hot Reload Development

Use `npm run dev` for the best development experience:
- Automatically restarts on file changes
- No build step required
- TypeScript errors shown in real-time

### Type Safety

This template is fully typed. Use TypeScript's features:

```typescript
// Define interfaces for your data
interface MyToolArgs {
  input: string;
  options?: {
    format: 'json' | 'text';
  };
}

// Use proper typing in handlers
const args = request.params.arguments as MyToolArgs;
```

### Error Handling

Always wrap potentially failing operations:

```typescript
try {
  // Your tool logic here
  return { content: [{ type: "text", text: "Success!" }] };
} catch (error) {
  logger.error(`Tool failed: ${error}`);
  throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : String(error)}`);
}
```

## Next Steps

1. **Explore the Code**: Read through `server.ts` to understand the structure
2. **Add Your First Tool**: Try adding a simple calculator or text processor
3. **Connect to an API**: Use `fetch` or `axios` to integrate with external services
4. **Create Custom Resources**: Add configuration files or data sources
5. **Add Type Definitions**: Create interfaces for your data structures
6. **Emit JavaScript (Optional)**: Remove `"noEmit": true` or create a
   dedicated `tsconfig.build.json` when you're ready for a compiled output
7. **Test Everything**: Make sure your additions work properly

## Resources

- [MCP TypeScript SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

Happy building! 🚀

This server is designed to be a clean, extensible foundation for your MCP server development journey using TypeScript and Node.js.
