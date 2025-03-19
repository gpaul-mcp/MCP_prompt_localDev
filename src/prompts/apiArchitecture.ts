import { z } from 'zod';
import { mcpServer } from '../index';

mcpServer.prompt(
  'api-architecture',
  'Generate an architecture plan for a TypeScript API',
  {
    projectName: z.string().describe('Name of the API project'),
    database: z.string().optional().describe('Database to use (postgres, mysql, mongodb, etc.)'),
    auth: z.string().optional().describe('Authentication method (jwt, oauth, none)'),
    endpoints: z.string().optional().describe('Comma-separated list of main API endpoints'),
  },
  async ({ projectName, database = 'postgres', auth = 'jwt', endpoints = '' }) => {
    const endpointsList = endpoints ? endpoints.split(',').map(e => e.trim()) : [];

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Create a comprehensive API architecture plan for a TypeScript project with the following details:

Project Name: ${projectName}
Database: ${database}
Authentication: ${auth}
${endpoints ? `Main Endpoints: ${endpointsList.join(', ')}` : ''}

Please include:
1. Overall architecture (layers, patterns)
2. Folder structure and file organization
3. Database schema design
4. API endpoints design and structure
5. Authentication flow
6. Error handling approach
7. Validation strategy
8. Performance considerations
9. Security best practices

After presenting the architecture plan, include commands to:
1. Setup the project using the local-dev-mcp tools
2. Install necessary dependencies for this architecture 
3. Implement the initial project structure
4. Push the project to GitHub`,
          },
        },
      ],
    };
  },
);
