import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({ name: "ab-testing-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "create_variant_split",
    description: "Forks traffic vectors into isolated experimental variant tracking distributions.",
    inputSchema: {
      type: "object",
      properties: {
        campaignId: { type: "string" },
        splitRatio: { type: "number", description: "Decimal weighting balance allocation between 0 and 1." }
      },
      required: ["campaignId", "splitRatio"]
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "create_variant_split") {
    const args = request.params.arguments as { campaignId: string; splitRatio: number };
    return {
      content: [{
        type: "text",
        text: `Traffic distribution split finalized for ID: ${args.campaignId}. Balance structure assigned: Variant A (${args.splitRatio * 100}%) / Variant B (${(1 - args.splitRatio) * 100}%).`
      }]
    };
  }
  throw new Error("Experimentation matrix initialization error.");
});

const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);
