import os
import asyncio
import subprocess
from typing import Dict, Any

class MCPServerManager:
    def __init__(self):
        self.processes: Dict[str, subprocess.Popen] = {}
        # Resolve absolute paths to build outputs
        self.base_mcp_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../mcp-servers"))

    def launch_server(self, server_name: str):
        server_dir = os.path.join(self.base_mcp_path, server_name)
        build_file = os.path.join(server_dir, "build/index.js")
        
        if not os.path.exists(build_file):
            print(f"❌ Error: Compiled file missing for {server_name}. Run compilation checks.")
            return False

        # Spawn the Node stdio process securely
        process = subprocess.Popen(
            ["node", build_file],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1
        )
        self.processes[server_name] = process
        print(f"🔌 Connected to MCP Server via Stdio: [{server_name}]")
        return True

    def shutdown_all(self):
        for name, proc in self.processes.items():
            proc.terminate()
            print(f"🛑 Terminated MCP Node Connection: [{name}]")

mcp_manager = MCPServerManager()
