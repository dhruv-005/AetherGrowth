import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({ name: "database-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "fetch_leads",
    description: "Retrieves customer target leads data from company CRM database.",
    inputSchema: {
      type: "object",
      properties: {
        segment: { type: "string", description: "Target customer vertical segment profile." }
      },
      required: ["segment"]
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "fetch_leads") {
    const segment = (request.params.arguments as { segment: string }).segment;
    const mockLeads = [
      { email: "lead1@enterprise.io", phone: "+1234567890", name: "Alpha Executive" },
      { email: "lead2@scaleup.dev", phone: "+1987654321", name: "Beta Operator" }
    ];
    return { content: [{ type: "text", text: JSON.stringify({ segment, leads: mockLeads }) }] };
  }
  throw new Error("Tool execution failure: Target protocol missing.");
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
run().catch(console.error);
