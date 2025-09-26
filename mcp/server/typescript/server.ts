#!/usr/bin/env node

/**
 * Clean MCP Server Template (TypeScript)
 * A minimal MCP server implementation using the official MCP TypeScript SDK.
 * This serves as a starting point for building custom MCP servers.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Configure logging
const logger = {
  info: (msg: string) => console.error(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg: string) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  warn: (msg: string) => console.error(`[WARN] ${new Date().toISOString()} - ${msg}`)
};

/**
 * Create and configure the MCP server
 */
class CleanMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "clean-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      logger.info("Listing resources");
      
      return {
        resources: [
          {
            uri: "welcome://info",
            name: "Welcome Information",
            description: "Basic information about this MCP server",
            mimeType: "text/plain",
          }
        ]
      };
    });

    // Read a specific resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      logger.info(`Reading resource: ${uri}`);

      switch (uri) {
        case "welcome://info":
          return {
            contents: [
              {
                uri,
                mimeType: "text/plain",
                text: `Welcome to the Clean MCP Server (TypeScript)!

This is a minimal MCP server template that you can use as a starting point
for building your own MCP servers using TypeScript/JavaScript.

What you can do with this server:
1. Add new tools by extending the CallToolRequestSchema handler
2. Add new resources by extending the resource handlers
3. Connect to external APIs and services
4. Process and transform data
5. Integrate with databases, file systems, or other services

The server is currently running and ready to accept requests from MCP clients.
Happy building! 🚀`
              }
            ]
          };

        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      logger.info("Listing tools");
      
      return {
        tools: [
          {
            name: "echo",
            description: "Echo back the provided message",
            inputSchema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "The message to echo back"
                }
              },
              required: ["message"]
            }
          },
          {
            name: "get_server_info",
            description: "Get information about this MCP server",
            inputSchema: {
              type: "object",
              properties: {}
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      logger.info(`Calling tool: ${name} with arguments: ${JSON.stringify(args)}`);

      switch (name) {
        case "echo":
          const message = args?.message as string || "";
          return {
            content: [
              {
                type: "text",
                text: `Echo: ${message}`
              }
            ]
          };

        case "get_server_info":
          return {
            content: [
              {
                type: "text",
                text: `Clean MCP Server Information (TypeScript):
- Server Name: clean-mcp-server
- Version: 1.0.0
- Runtime: Node.js ${process.version}
- Platform: ${process.platform}
- Status: Running
- Available Tools: echo, get_server_info
- Available Resources: welcome://info

This is a template server for learning and building MCP servers.
You can extend it by adding new tools and resources!`
              }
            ]
          };

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  /**
   * Start the server with stdio transport
   */
  async run(): Promise<void> {
    logger.info("Starting Clean MCP Server (TypeScript)...");
    
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    logger.info("Clean MCP Server is running! Connect your MCP client to this process.");
    logger.info("Press Ctrl+C to stop the server.");
  }
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  try {
    const server = new CleanMCPServer();
    await server.run();
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info("Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info("Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

// Start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error(`Unhandled error: ${error}`);
    process.exit(1);
  });
}

export { CleanMCPServer };
