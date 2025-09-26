"""
Example Extensions for the Clean MCP Server

This file contains examples of how to extend the base server with additional
tools and resources. Copy these examples into your server.py file to add
new functionality.

These are just examples - participants can use them as inspiration!
"""

import json
import os
import datetime
from typing import Any
import aiohttp
import asyncio

# Example 1: Calculator Tool
# Add this to your handle_list_tools() function:
"""
Tool(
    name="calculator",
    description="Perform basic math calculations",
    inputSchema={
        "type": "object",
        "properties": {
            "expression": {
                "type": "string",
                "description": "Mathematical expression to evaluate (e.g., '2 + 3 * 4')",
            }
        },
        "required": ["expression"],
    },
),
"""

# Add this case to your handle_call_tool() function:
"""
elif name == "calculator":
    expression = arguments.get("expression", "")
    try:
        # Simple evaluation - in production, use a proper math parser
        result = eval(expression)  # WARNING: Don't use eval() in production!
        return [
            TextContent(
                type="text",
                text=f"Result: {expression} = {result}",
            )
        ]
    except Exception as e:
        return [
            TextContent(
                type="text",
                text=f"Error calculating '{expression}': {str(e)}",
            )
        ]
"""


# Example 2: File System Tool
# Add this to handle_list_tools():
"""
Tool(
    name="list_files",
    description="List files in a directory",
    inputSchema={
        "type": "object",
        "properties": {
            "path": {
                "type": "string",
                "description": "Directory path to list (default: current directory)",
                "default": "."
            }
        },
    },
),
"""

# Add this case to handle_call_tool():
"""
elif name == "list_files":
    path = arguments.get("path", ".")
    try:
        files = os.listdir(path)
        file_list = "\n".join([f"{'📁' if os.path.isdir(os.path.join(path, f)) else '📄'} {f}" for f in sorted(files)])
        return [
            TextContent(
                type="text",
                text=f"Files in '{path}':\n{file_list}",
            )
        ]
    except Exception as e:
        return [
            TextContent(
                type="text",
                text=f"Error listing files in '{path}': {str(e)}",
            )
        ]
"""


# Example 3: Weather API Tool (requires aiohttp)
# Add this to handle_list_tools():
"""
Tool(
    name="get_weather",
    description="Get weather information for a city",
    inputSchema={
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "City name to get weather for",
            }
        },
        "required": ["city"],
    },
),
"""

# Add this case to handle_call_tool():
"""
elif name == "get_weather":
    city = arguments.get("city", "")
    try:
        # Using OpenWeatherMap API (you'd need an API key)
        # This is just an example structure
        async with aiohttp.ClientSession() as session:
            # Replace YOUR_API_KEY with actual API key
            url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid=YOUR_API_KEY&units=metric"
            async with session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    temp = data['main']['temp']
                    description = data['weather'][0]['description']
                    return [
                        TextContent(
                            type="text",
                            text=f"Weather in {city}: {temp}°C, {description}",
                        )
                    ]
                else:
                    return [
                        TextContent(
                            type="text",
                            text=f"Could not get weather for {city}",
                        )
                    ]
    except Exception as e:
        return [
            TextContent(
                type="text",
                text=f"Error getting weather: {str(e)}",
            )
        ]
"""


# Example 4: System Information Resource
# Add this to handle_list_resources():
"""
Resource(
    uri="system://info",
    name="System Information",
    description="Current system information",
    mimeType="application/json",
),
"""

# Add this case to handle_read_resource():
"""
elif uri == "system://info":
    system_info = {
        "timestamp": datetime.datetime.now().isoformat(),
        "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
        "platform": os.name,
        "current_directory": os.getcwd(),
        "environment_variables": dict(os.environ),
    }
    return json.dumps(system_info, indent=2)
"""


# Example 5: Text Processing Tool
# Add this to handle_list_tools():
"""
Tool(
    name="text_analyzer",
    description="Analyze text (word count, character count, etc.)",
    inputSchema={
        "type": "object",
        "properties": {
            "text": {
                "type": "string",
                "description": "Text to analyze",
            }
        },
        "required": ["text"],
    },
),
"""

# Add this case to handle_call_tool():
"""
elif name == "text_analyzer":
    text = arguments.get("text", "")
    
    # Basic text analysis
    word_count = len(text.split())
    char_count = len(text)
    char_count_no_spaces = len(text.replace(" ", ""))
    sentence_count = len([s for s in text.split(".") if s.strip()])
    paragraph_count = len([p for p in text.split("\n\n") if p.strip()])
    
    analysis = f'''Text Analysis Results:
━━━━━━━━━━━━━━━━━━━━
📊 Characters: {char_count}
📊 Characters (no spaces): {char_count_no_spaces}
📊 Words: {word_count}
📊 Sentences: {sentence_count}
📊 Paragraphs: {paragraph_count}

📈 Average words per sentence: {word_count/max(sentence_count, 1):.1f}
📈 Average characters per word: {char_count_no_spaces/max(word_count, 1):.1f}
'''
    
    return [
        TextContent(
            type="text",
            text=analysis,
        )
    ]
"""


# Example 6: Configuration Resource
# Add this to handle_list_resources():
"""
Resource(
    uri="config://settings",
    name="Server Configuration",
    description="Current server configuration and settings",
    mimeType="application/json",
),
"""

# Add this case to handle_read_resource():
"""
elif uri == "config://settings":
    config = {
        "server_name": "clean-mcp-server",
        "version": "1.0.0",
        "features": {
            "tools_enabled": True,
            "resources_enabled": True,
            "logging_level": "INFO"
        },
        "supported_transports": ["stdio"],
        "max_request_size": "1MB",
        "created": "2024-01-01T00:00:00Z"
    }
    return json.dumps(config, indent=2)
"""


# Workshop Exercise Ideas:
"""
🎯 Workshop Challenges for Participants:

1. **Easy Level:**
   - Add a "reverse_text" tool that reverses input text
   - Create a "current_time" resource that shows the current date/time
   - Build a "random_number" tool that generates random numbers

2. **Medium Level:**
   - Implement a simple task/todo manager with add/list/remove tools
   - Create a text file reader/writer with proper error handling
   - Build a URL shortener or QR code generator tool

3. **Advanced Level:**
   - Integrate with a real API (weather, news, stock prices)
   - Create a mini database using JSON files for persistence
   - Build a web scraper tool with BeautifulSoup
   - Implement a chat bot that connects to an AI API

4. **Expert Level:**
   - Create a multi-tool server that connects to multiple APIs
   - Build a data pipeline that processes CSV/JSON files
   - Implement real-time data streaming from external sources
   - Create a server that can spawn and manage other MCP servers
"""
