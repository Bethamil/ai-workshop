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
