#!/usr/bin/env python3
"""
Clean MCP Server Template
A minimal MCP server implementation using the official MCP SDK.
This serves as a starting point for building custom MCP servers.
"""

import asyncio
import logging
from typing import Any

from mcp.server import NotificationOptions, Server
from mcp.server.lowlevel.helper_types import ReadResourceContents
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import (
    Resource,
    Tool,
    TextContent,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("clean-mcp-server")

# Create the server instance
server = Server("clean-mcp-server")


@server.list_resources()
async def handle_list_resources() -> list[Resource]:
    """
    List available resources.
    Resources are static or dynamic content that can be read by clients.
    
    Examples of resources:
    - Configuration files
    - Documentation
    - Data files
    - API responses
    """
    logger.info("Listing resources")
    
    return [
        Resource(
            uri="welcome://info",
            name="Welcome Information",
            description="Basic information about this MCP server",
            mimeType="text/plain",
        )
    ]


@server.read_resource()
async def handle_read_resource(uri: str) -> list[ReadResourceContents]:
    """
    Read a specific resource by URI.
    
    Args:
        uri: The URI of the resource to read
        
    Returns:
        A list of resource content blocks
    """
    logger.info(f"Reading resource: {uri}")
    
    if str(uri) == "welcome://info":
        return [
            ReadResourceContents(
                content="""Welcome to the Clean MCP Server!

This is a minimal MCP server template that you can use as a starting point
for building your own MCP servers.

What you can do with this server:
1. Add new tools by creating functions with @server.call_tool()
2. Add new resources by extending the list_resources and read_resource handlers
3. Connect to external APIs and services
4. Process and transform data
5. Integrate with databases, file systems, or other services

The server is currently running and ready to accept requests from MCP clients.
Happy building! 🚀
""",
                mime_type="text/plain",
            )
        ]
    else:
        raise ValueError(f"Unknown resource: {uri}")


@server.list_tools()
async def handle_list_tools() -> list[Tool]:
    """
    List available tools.
    Tools are functions that can be called by clients to perform actions.
    """
    logger.info("Listing tools")
    
    return [
        Tool(
            name="echo",
            description="Echo back the provided message",
            inputSchema={
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "The message to echo back",
                    }
                },
                "required": ["message"],
            },
        ),
        Tool(
            name="get_server_info",
            description="Get information about this MCP server",
            inputSchema={
                "type": "object",
                "properties": {},
            },
        ),
    ]


@server.call_tool()
async def handle_call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
    """
    Handle tool calls from clients.
    
    Args:
        name: The name of the tool to call
        arguments: The arguments passed to the tool
        
    Returns:
        The result of the tool call
    """
    logger.info(f"Calling tool: {name} with arguments: {arguments}")
    
    if name == "echo":
        message = arguments.get("message", "")
        return [
            TextContent(
                type="text",
                text=f"Echo: {message}",
            )
        ]
    
    elif name == "get_server_info":
        return [
            TextContent(
                type="text",
                text="""Clean MCP Server Information:
- Server Name: clean-mcp-server
- Version: 1.0.0
- Status: Running
- Available Tools: echo, get_server_info
- Available Resources: welcome://info

This is a template server for learning and building MCP servers.
You can extend it by adding new tools and resources!""",
            )
        ]
    
    else:
        raise ValueError(f"Unknown tool: {name}")


async def main():
    """Main entry point for the server."""
    logger.info("Starting Clean MCP Server...")
    
    # Build capabilities based on registered handlers
    capabilities = server.get_capabilities(
        NotificationOptions(),
        experimental_capabilities={},
    )

    # Run the server using stdio transport
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="clean-mcp-server",
                server_version="1.0.0",
                capabilities=capabilities,
            ),
        )


if __name__ == "__main__":
    asyncio.run(main())
