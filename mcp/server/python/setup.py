#!/usr/bin/env python3
"""
Setup script for Clean MCP Server
Run this to set up the development environment automatically.
"""

import os
import sys
import subprocess
import venv
from pathlib import Path

def run_command(command, description):
    """Run a shell command and handle errors."""
    print(f"🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully!")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed!")
        print(f"Error: {e.stderr}")
        return None

def main():
    print("🚀 Clean MCP Server Setup")
    print("=" * 50)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required!")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro} detected")
    
    # Create virtual environment
    venv_path = Path("mcp-server-env")
    if not venv_path.exists():
        print("📦 Creating virtual environment...")
        venv.create(venv_path, with_pip=True)
        print("✅ Virtual environment created!")
    else:
        print("✅ Virtual environment already exists!")
    
    # Determine the correct Python executable in the venv
    if os.name == 'nt':  # Windows
        python_exe = venv_path / "Scripts" / "python.exe"
        pip_exe = venv_path / "Scripts" / "pip.exe"
    else:  # macOS/Linux
        python_exe = venv_path / "bin" / "python"
        pip_exe = venv_path / "bin" / "pip"
    
    # Install dependencies
    print("📚 Installing dependencies...")
    result = run_command(f"{pip_exe} install -r requirements.txt", "Installing packages")
    if result is None:
        print("❌ Failed to install dependencies!")
        sys.exit(1)
    
    # Make run script executable on macOS/Linux
    if os.name != 'nt':
        run_command("chmod +x run_server.sh", "Making run script executable")
    
    # Test installation
    print("\n🧪 Testing installation...")
    test_result = run_command(f"{python_exe} -c 'import mcp; print(f\"MCP SDK version: {{mcp.__version__}}\")'", "Testing MCP SDK")
    
    if test_result:
        print("\n🎉 Setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Review the server.py file to understand the structure")
        print("2. Check examples.py for extension ideas")
        print("3. Run the server:")
        if os.name == 'nt':
            print("   - Windows: mcp-server-env\\Scripts\\python server.py")
        else:
            print("   - macOS/Linux: ./run_server.sh")
        print("4. Start building your own tools and resources!")
        print("\n🛠️  Workshop ready! 🚀")
    else:
        print("❌ Setup failed during testing!")
        sys.exit(1)

if __name__ == "__main__":
    main()
