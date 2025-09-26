#!/usr/bin/env node

/**
 * Setup script for Clean MCP Server (TypeScript)
 * Run this to set up the development environment automatically.
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description, options = {}) {
  log(`🔧 ${description}...`, 'cyan');
  try {
    const output = execSync(command, { 
      stdio: options.silent ? 'pipe' : 'inherit', 
      encoding: 'utf8',
      cwd: __dirname
    });
    log(`✅ ${description} completed successfully!`, 'green');
    return output;
  } catch (error) {
    log(`❌ ${description} failed!`, 'red');
    if (error.stdout) log(`Output: ${error.stdout}`, 'yellow');
    if (error.stderr) log(`Error: ${error.stderr}`, 'red');
    return null;
  }
}

function checkCommand(command, name) {
  try {
    execSync(`${command} --version`, { stdio: 'pipe' });
    return true;
  } catch {
    log(`❌ ${name} is not installed or not in PATH`, 'red');
    return false;
  }
}

function checkNodeVersion() {
  try {
    const version = process.version.slice(1); // Remove 'v' prefix
    const [major, minor] = version.split('.').map(Number);
    
    if (major < 18) {
      log(`❌ Node.js ${version} detected. Node.js 18+ is required.`, 'red');
      log('Please visit https://nodejs.org/ to install a newer version.', 'yellow');
      return false;
    }
    
    log(`✅ Node.js ${version} detected`, 'green');
    return true;
  } catch (error) {
    log('❌ Could not determine Node.js version', 'red');
    return false;
  }
}

async function main() {
  log('🚀 Clean MCP Server Setup (TypeScript)', 'magenta');
  log('='.repeat(50), 'cyan');
  
  // Check Node.js version
  if (!checkNodeVersion()) {
    process.exit(1);
  }
  
  // Check if npm is available
  if (!checkCommand('npm', 'npm')) {
    log('Please install npm or use an alternative package manager like yarn.', 'yellow');
    process.exit(1);
  }
  
  // Check if package.json exists
  const packageJsonPath = join(__dirname, 'package.json');
  if (!existsSync(packageJsonPath)) {
    log('❌ package.json not found in the current directory!', 'red');
    log('Please run this script from the project root directory.', 'yellow');
    process.exit(1);
  }
  
  // Read package.json to show project info
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    log(`📦 Project: ${packageJson.name} v${packageJson.version}`, 'blue');
    log(`📄 Description: ${packageJson.description}`, 'blue');
  } catch (error) {
    log('⚠️ Could not read package.json details', 'yellow');
  }
  
  // Install dependencies
  if (existsSync(join(__dirname, 'node_modules'))) {
    log('✅ node_modules already exists', 'green');
    
    // Check if dependencies are up to date
    log('🔍 Checking for dependency updates...', 'cyan');
    const auditResult = runCommand('npm outdated', 'Checking outdated packages', { silent: true });
    if (auditResult && auditResult.trim()) {
      log('📦 Some packages can be updated. Run "npm update" to update them.', 'yellow');
    } else {
      log('✅ All packages are up to date', 'green');
    }
  } else {
    const result = runCommand('npm install', 'Installing dependencies');
    if (!result) {
      log('❌ Failed to install dependencies!', 'red');
      process.exit(1);
    }
  }
  
  // Build TypeScript (if server.ts exists)
  if (existsSync(join(__dirname, 'server.ts'))) {
    log('🏗️ Building TypeScript project...', 'cyan');
    const buildResult = runCommand('npm run build', 'Building TypeScript');
    if (!buildResult) {
      log('⚠️ Build failed, but you can still use development mode', 'yellow');
    }
  }
  
  // Check if TypeScript development tools are available
  if (existsSync(join(__dirname, 'node_modules/.bin/tsx'))) {
    log('✅ Development tools (tsx) installed', 'green');
  } else {
    log('⚠️ tsx not found - hot reload development may not work', 'yellow');
  }
  
  // Test basic imports
  log('🧪 Testing TypeScript compilation...', 'cyan');
  const testResult = runCommand(
    'npx tsc --noEmit --skipLibCheck server.ts', 
    'TypeScript type checking', 
    { silent: true }
  );
  
  if (testResult !== null) {
    log('✅ TypeScript compilation successful!', 'green');
  } else {
    log('⚠️ TypeScript compilation has issues, but server might still run', 'yellow');
  }
  
  // Success message and next steps
  log('', 'reset');
  log('🎉 Setup completed successfully!', 'green');
  log('', 'reset');
  log('📋 Next steps:', 'cyan');
  log('1. Review the server.ts file to understand the structure', 'reset');
  log('2. Check examples.ts for extension ideas', 'reset');
  log('3. Run the server:', 'reset');
  
  if (existsSync(join(__dirname, 'run-server.sh'))) {
    log('   • Development mode: ./run-server.sh', 'blue');
    log('   • Or manually: npm run dev', 'blue');
  } else {
    log('   • Development mode: npm run dev', 'blue');
  }
  
  log('   • Production mode: npm run build && npm start', 'blue');
  log('   • Direct TypeScript: npm run start:ts', 'blue');
  log('4. Start building your own tools and resources!', 'reset');
  log('', 'reset');
  
  // Environment information
  log('🔧 Environment Information:', 'cyan');
  log(`   • Node.js: ${process.version}`, 'reset');
  log(`   • Platform: ${process.platform} (${process.arch})`, 'reset');
  log(`   • Working Directory: ${process.cwd()}`, 'reset');
  
  if (process.env.OPENWEATHER_API_KEY) {
    log('   • OpenWeather API Key: ✅ Set', 'green');
  } else {
    log('   • OpenWeather API Key: ❌ Not set (optional)', 'yellow');
    log('     Set OPENWEATHER_API_KEY environment variable to use weather examples', 'yellow');
  }
  
  log('', 'reset');
  log('🛠️ Workshop ready! Happy coding! 🚀', 'magenta');
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  log(`❌ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`❌ Unhandled promise rejection: ${reason}`, 'red');
  process.exit(1);
});

// Run the setup
main().catch((error) => {
  log(`❌ Setup failed: ${error.message}`, 'red');
  process.exit(1);
});
