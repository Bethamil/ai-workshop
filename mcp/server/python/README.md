# Clean MCP Server Template

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
@server.read_resource()
async def handle_read_resource(uri: str) -> str:
    if uri == "your://new-resource":
        return "Your resource content"
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
└── README.md         # This file
```

## Troubleshooting

### Common Issues

**Import Error for MCP SDK:**
```bash
pip install --upgrade mcp
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
