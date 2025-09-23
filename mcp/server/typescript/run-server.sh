#!/bin/bash

# Clean MCP Server Launcher Script (TypeScript)
# This script sets up the Node.js environment and runs the MCP server

echo "🚀 Starting Clean MCP Server (TypeScript)..."
echo "============================================"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

# Simple version comparison (works for most cases)
if [[ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please install Node.js 18 or higher."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $NODE_VERSION detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies!"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

# Check if we should run in development or production mode
if [ -f "server.ts" ] && command -v npx &> /dev/null && npm list tsx &> /dev/null; then
    echo "🔧 Running in development mode with hot reload..."
    echo "Server will automatically restart when you make changes to server.ts"
    echo "Press Ctrl+C to stop the server."
    echo "============================================"
    npm run dev
else
    echo "🏗️ Building TypeScript project..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Build failed! Check for TypeScript errors."
        exit 1
    fi
    
    echo "🎯 Starting MCP server (production mode)..."
    echo "Server is ready! Connect your MCP client to this process."
    echo "Press Ctrl+C to stop the server."
    echo "============================================"
    npm start
fi
