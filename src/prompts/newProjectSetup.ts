import { z } from 'zod';
import { mcpServer } from '../index';

mcpServer.prompt(
  'new-project-setup',
  'Generate a comprehensive setup plan for a new TypeScript project',
  {
    projectName: z.string().describe('Name of the project'),
    projectType: z.string().describe('Type of project (api, frontend, library, cli)'),
    features: z.string().optional().describe('Key features or requirements separated by commas'),
  },
  async ({ projectName, projectType, features }) => {
    const featuresList = features ? features.split(',').map(f => f.trim()) : [];

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Create a comprehensive project setup plan for a new TypeScript project with the following details:

Project Name: ${projectName}
Project Type: ${projectType}
${features ? `Key Features: ${featuresList.join(', ')}` : ''}

Please include:
1. Project structure recommendation
2. Key dependencies to include
3. Key TypeScript configuration settings
4. Development workflow recommendations
5. Testing strategy
6. Deployment considerations

After presenting the plan, also include the exact commands I should run to:
1. Setup the project using the local-dev-mcp tools
2. Install any additional dependencies
3. Make any necessary configuration changes
4. Push the project to Github`,
          },
        },
      ],
    };
  },
);
