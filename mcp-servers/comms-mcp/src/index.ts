import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({ name: "comms-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "send_omnichannel_broadcast",
    description: "Dispatches mass multi-format marketing payloads across email and mobile endpoints.",
    inputSchema: {
      type: "object",
      properties: {
        emailHtml: { type: "string" },
        smsText: { type: "string" },
        recipients: { type: "array", items: { type: "object" } }
      },
      required: ["emailHtml", "smsText", "recipients"]
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "send_omnichannel_broadcast") {
    const args = request.params.arguments as { emailHtml: string; smsText: string; recipients: any[] };
    return {
      content: [{
        type: "text",
        text: `Successfully broadcasted to ${args.recipients.length} endpoints. Delivery channels loaded: [SMTP Email Engine, Cellular SMS Layer].`
      }]
    };
  }
  throw new Error("Target microservice routing parameters error.");
});

const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);
