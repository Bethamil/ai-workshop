#!/bin/bash

# Clean MCP Server Launcher Script
# This script sets up the environment and runs the MCP server

echo "🚀 Starting Clean MCP Server..."
echo "=================================="

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "mcp-server-env" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv mcp-server-env
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source mcp-server-env/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Run the server
echo "🎯 Starting MCP server..."
echo "Server is ready! Connect your MCP client to this process."
echo "Press Ctrl+C to stop the server."
echo "=================================="

python server.py
