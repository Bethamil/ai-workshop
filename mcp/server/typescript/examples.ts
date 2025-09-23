/**
 * Example Extensions for the Clean MCP Server (TypeScript)
 * 
 * This file contains examples of how to extend the base server with additional
 * tools and resources. Copy these examples into your server.ts file to add
 * new functionality.
 * 
 * These are just examples - participants can use them as inspiration!
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// =============================================================================
// Example 1: Calculator Tool
// =============================================================================

// Add this interface near the top of your server.ts file:
interface CalculatorArgs {
  expression: string;
}

// Add this to your tools list in ListToolsRequestSchema handler:
const calculatorTool = {
  name: "calculator",
  description: "Perform basic math calculations (supports +, -, *, /, parentheses)",
  inputSchema: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "Mathematical expression to evaluate (e.g., '2 + 3 * 4')"
      }
    },
    required: ["expression"]
  }
};

// Add this case to your CallToolRequestSchema handler:
/*
case "calculator":
  try {
    const { expression } = args as CalculatorArgs;
    
    // Simple math evaluation (be careful with eval in production!)
    // In production, use a proper math parser like math.js
    const result = Function(`"use strict"; return (${expression})`)();
    
    return {
      content: [
        {
          type: "text",
          text: `Calculator Result:\n${expression} = ${result}`
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error calculating '${(args as CalculatorArgs).expression}': ${error instanceof Error ? error.message : String(error)}`
        }
      ]
    };
  }
*/

// =============================================================================
// Example 2: File System Tools
// =============================================================================

interface ListFilesArgs {
  path?: string;
}

interface ReadFileArgs {
  filePath: string;
}

// Add these tools to your tools list:
const fileSystemTools = [
  {
    name: "list_files",
    description: "List files and directories in a specified path",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Directory path to list (default: current directory)",
          default: "."
        }
      }
    }
  },
  {
    name: "read_file",
    description: "Read the contents of a text file",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Path to the file to read"
        }
      },
      required: ["filePath"]
    }
  }
];

// Add these cases to your CallToolRequestSchema handler:
/*
case "list_files":
  try {
    const { path: dirPath = "." } = args as ListFilesArgs;
    const files = await fs.readdir(dirPath);
    
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(dirPath, file);
        const stats = await fs.stat(fullPath);
        return {
          name: file,
          isDirectory: stats.isDirectory(),
          size: stats.size,
          modified: stats.mtime.toISOString()
        };
      })
    );
    
    const fileList = fileDetails
      .map(f => `${f.isDirectory ? '📁' : '📄'} ${f.name} ${f.isDirectory ? '' : `(${f.size} bytes)`}`)
      .join('\n');
    
    return {
      content: [
        {
          type: "text",
          text: `Files in '${dirPath}':\n${fileList}`
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error listing files: ${error instanceof Error ? error.message : String(error)}`
        }
      ]
    };
  }

case "read_file":
  try {
    const { filePath } = args as ReadFileArgs;
    const content = await fs.readFile(filePath, 'utf-8');
    
    return {
      content: [
        {
          type: "text",
          text: `Contents of '${filePath}':\n\n${content}`
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error reading file '${(args as ReadFileArgs).filePath}': ${error instanceof Error ? error.message : String(error)}`
        }
      ]
    };
  }
*/

// =============================================================================
// Example 3: HTTP API Integration
// =============================================================================

interface WeatherArgs {
  city: string;
  apiKey?: string;
}

// Add this tool to your tools list:
const weatherTool = {
  name: "get_weather",
  description: "Get current weather information for a city",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "City name to get weather for"
      },
      apiKey: {
        type: "string",
        description: "OpenWeatherMap API key (optional if set in environment)"
      }
    },
    required: ["city"]
  }
};

// Add this case to your CallToolRequestSchema handler:
/*
case "get_weather":
  try {
    const { city, apiKey } = args as WeatherArgs;
    const key = apiKey || process.env.OPENWEATHER_API_KEY;
    
    if (!key) {
      return {
        content: [
          {
            type: "text",
            text: "Error: No API key provided. Please provide apiKey parameter or set OPENWEATHER_API_KEY environment variable."
          }
        ]
      };
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const weather = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
    
    return {
      content: [
        {
          type: "text",
          text: `Weather in ${weather.city}, ${weather.country}:
🌡️ Temperature: ${weather.temperature}°C
🌤️ Conditions: ${weather.description}
💧 Humidity: ${weather.humidity}%
💨 Wind Speed: ${weather.windSpeed} m/s`
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error getting weather: ${error instanceof Error ? error.message : String(error)}`
        }
      ]
    };
  }
*/

// =============================================================================
// Example 4: Text Processing Tool
// =============================================================================

interface TextAnalysisArgs {
  text: string;
}

// Add this tool to your tools list:
const textAnalysisTool = {
  name: "analyze_text",
  description: "Analyze text for various metrics (word count, readability, etc.)",
  inputSchema: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "Text to analyze"
      }
    },
    required: ["text"]
  }
};

// Add this case to your CallToolRequestSchema handler:
/*
case "analyze_text":
  try {
    const { text } = args as TextAnalysisArgs;
    
    const analysis = {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words: text.trim().split(/\s+/).filter(word => word.length > 0).length,
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
      paragraphs: text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length,
      lines: text.split('\n').length
    };
    
    const avgWordsPerSentence = analysis.sentences > 0 ? (analysis.words / analysis.sentences).toFixed(1) : '0';
    const avgCharsPerWord = analysis.words > 0 ? (analysis.charactersNoSpaces / analysis.words).toFixed(1) : '0';
    
    return {
      content: [
        {
          type: "text",
          text: `📊 Text Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━
📏 Characters: ${analysis.characters.toLocaleString()}
📏 Characters (no spaces): ${analysis.charactersNoSpaces.toLocaleString()}
📝 Words: ${analysis.words.toLocaleString()}
📋 Sentences: ${analysis.sentences.toLocaleString()}
📄 Paragraphs: ${analysis.paragraphs.toLocaleString()}
📰 Lines: ${analysis.lines