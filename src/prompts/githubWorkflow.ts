import { z } from 'zod';
import { mcpServer } from '../index';

mcpServer.prompt(
  'github-workflow',
  'Generate a GitHub workflow plan for a TypeScript project',
  {
    projectName: z.string().describe('Name of the project'),
    ciFeatures: z
      .string()
      .optional()
      .describe('Comma-separated list of CI features (lint, test, build, etc.)'),
    deployTarget: z
      .string()
      .optional()
      .describe('Deployment target (netlify, vercel, aws, azure, etc.)'),
    branchStrategy: z.string().optional().describe('Branch strategy (gitflow, trunk, github-flow)'),
  },
  async ({
    projectName,
    ciFeatures = 'lint,test,build',
    deployTarget,
    branchStrategy = 'github-flow',
  }) => {
    const ciFeaturesList = ciFeatures.split(',').map(f => f.trim());

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Create a comprehensive GitHub workflow plan for a TypeScript project with the following details:

Project Name: ${projectName}
CI Features: ${ciFeaturesList.join(', ')}
${deployTarget ? `Deployment Target: ${deployTarget}` : ''}
Branch Strategy: ${branchStrategy}

Please include:
1. GitHub repository setup recommendations
2. Branch protection rules
3. GitHub Actions workflow configurations
4. PR templates and guidelines
5. Issue templates
6. Automated testing and deployment strategy
7. Release process
8. Versioning strategy

After presenting the GitHub workflow plan, include the exact commands to:
1. Connect the local project to a new GitHub repository using local-dev-mcp
2. Set up the GitHub repository with the recommended configurations
3. Create the necessary GitHub Actions workflows`,
          },
        },
      ],
    };
  },
);
