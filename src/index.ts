import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

config({
  path: path.resolve(process.cwd(), envFile),
});

// Create the MCP server instance
export const mcpServer = new McpServer({
  name: 'TypeScript Project Prompts',
  version: '1.0.0',
});

// Create the prompt definitions
import './prompts';

async function main() {
  try {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);

    if (process.env.NODE_ENV === 'development') {
      console.log('Prompt MCP server connected');
    }
  } catch (error) {
    console.error('Error connecting Prompt MCP server:', error);
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
