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
- ✅ Production build configuration
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

### 3. Production Mode

```bash
# Build the project
npm run build

# Run the compiled server
npm start
```

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
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run start:ts` - Run TypeScript directly (development)
- `npm run clean` - Clean build directory
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
clean-mcp-server/
├── server.ts          # Main server implementation
├── package.json       # Node.js dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── README.md         # This file
└── dist/             # Built JavaScript files (after npm run build)
```

## TypeScript Features

This template uses modern TypeScript features:

- **Strict type checking** - Catch errors at compile time
- **ES2022 target** - Use latest JavaScript features
- **ES modules** - Modern import/export syntax
- **Source maps** - Debug TypeScript directly
- **Declaration files** - Full type information for consumers

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
6. **Test Everything**: Make sure your additions work properly

## Resources

- [MCP TypeScript SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

Happy building! 🚀

This server is designed to be a clean, extensible foundation for your MCP server development journey using TypeScript and Node.js.
