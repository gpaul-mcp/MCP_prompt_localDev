# TypeScript Prompt MCP Server

A Model Context Protocol (MCP) server that provides pre-defined prompt templates for AI assistants, allowing them to generate comprehensive plans for TypeScript projects, API architectures, and GitHub workflows.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

## 🌟 Overview

This MCP server provides a set of prompt templates that can be used by AI assistants to generate detailed, structured responses for TypeScript project planning. It offers templates for:
- Creating comprehensive API architecture plans
- Setting up new TypeScript projects with best practices
- Generating GitHub workflow configurations

This MCP was specifically created to work with the Local Dev MCP, forming a powerful combination where the Prompt MCP generates detailed project plans and the Local Dev MCP executes them. Together, they create a seamless workflow for AI-assisted TypeScript project development.

Each prompt template is designed to ensure AI assistants provide consistent, high-quality, and detailed project plans following modern TypeScript development standards.

## 🚀 Features

- **🏗️ API Architecture Planning**: Generate comprehensive API architecture plans including layers, folder structures, and database schemas
- **🚀 Project Setup**: Create detailed setup plans for new TypeScript projects with appropriate dependencies and configurations
- **🔄 GitHub Workflow**: Design GitHub workflow plans with branch strategies, PR templates, and CI/CD configurations
- **🛠️ Customization**: Each prompt accepts parameters to tailor the generated plans to your specific needs
- **⚡ Consistent Output**: Ensures AI assistants provide structured, detailed responses that follow best practices

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd typescript-prompt-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create development environment file
   cp .env.example .env.development
   # Create production environment file
   cp .env.example .env.production
   ```

## 🎮 Usage

### Development Mode

```bash
npm run dev
```

This starts the MCP server in development mode with hot reload.

### Production Mode

```bash
npm run build
npm start
```

Or use the shorthand:

```bash
npm run prod
```

## 🔗 Integration with Local Dev MCP and Claude Desktop

To add this MCP server to Claude Desktop:

1. **Start the MCP server**
   Make sure your server is running locally.

2. **Open Claude Desktop settings**
   - Launch Claude Desktop
   - Click on your profile picture or icon in the top right
   - Select "Settings" from the dropdown menu

3. **Navigate to Extensions settings**
   - In the Settings sidebar, click on "Extensions"
   - Select "Add Custom MCP"

4.1 **Configure the MCP connection**
   - Name: `TypeScript Prompt MCP` (or any name you prefer)
   - URL: Enter the URL where your MCP server is running (e.g., `http://localhost:3000` for local development)
   - Click "Add MCP"

4.2 **Alternative: Configure the MCP connection via command**
   - You first need to build the project and provide your full path to the compiled server
   - Add the following to your Claude Desktop configuration:

   ```json
   "ts-prompts": {
     "command": "node",
     "args": [
       "YOUR_CUSTOM_PATH/dist/index.js"
     ]
   }
   ```

5. **Enable the MCP**
   - Toggle the switch next to your newly added MCP to enable it
   - Claude Desktop will attempt to connect to your MCP server

6. **Add Local Dev MCP**
   - Repeat steps 3-5 to also add the Local Dev MCP to Claude Desktop
   - Having both MCPs enabled allows for a complete workflow from planning to implementation

7. **Verify connection**
   - Start a new conversation with Claude
   - Ask Claude to help you plan a TypeScript project or API architecture
   - Claude should now be able to use the prompt templates to provide detailed plans
   - Then ask Claude to implement the plan using Local Dev MCP

### Usage Examples with Claude

Once connected with both MCPs, you can ask Claude to:

- "Can you help me plan an API architecture for a TypeScript project called 'ecommerce-backend' with MongoDB and JWT authentication?" (uses this Prompt MCP)
- "I need a setup plan for a new TypeScript frontend library with React components" (uses this Prompt MCP)
- "Create a GitHub workflow plan for my TypeScript CLI project with automated testing and npm publishing" (uses this Prompt MCP)
- "Now implement the API project we just planned using the Local Dev MCP" (uses Local Dev MCP)
- "Set up the TypeScript project with the plan we created" (uses Local Dev MCP)

This combination of MCPs creates a powerful workflow where you can plan your project in detail and then implement it without leaving the Claude interface.

## 🧠 Available Prompts

The server exposes several prompts that can be used by AI assistants:

### `api-architecture`
Generates a comprehensive architecture plan for a TypeScript API.

**Parameters:**
- `projectName`: Name of the API project
- `database`: Database to use (postgres, mysql, mongodb, etc.)
- `auth`: Authentication method (jwt, oauth, none)
- `endpoints`: Comma-separated list of main API endpoints

### `new-project-setup`
Generates a comprehensive setup plan for a new TypeScript project.

**Parameters:**
- `projectName`: Name of the project
- `projectType`: Type of project (api, frontend, library, cli)
- `features`: Key features or requirements separated by commas

### `github-workflow`
Generates a GitHub workflow plan for a TypeScript project.

**Parameters:**
- `projectName`: Name of the project
- `ciFeatures`: Comma-separated list of CI features (lint, test, build, etc.)
- `deployTarget`: Deployment target (netlify, vercel, aws, azure, etc.)
- `branchStrategy`: Branch strategy (gitflow, trunk, github-flow)

## 🔍 How It Works

The server creates an MCP server using the ModelContextProtocol SDK:

1. It defines structured prompts with parameters using zod for validation
2. Each prompt returns a formatted message that guides AI assistants in generating comprehensive plans
3. The prompts include detailed instructions about what to include in the plans
4. The server connects to Claude or other MCP-compatible AI assistants through a transport (typically stdio)

## 🛠️ Project Structure

```
src/
  ├── index.ts                # Entry point that sets up the MCP server
  ├── prompts/                # Prompt definitions
  │   ├── apiArchitecture.ts  # API architecture prompt
  │   ├── githubWorkflow.ts   # GitHub workflow prompt
  │   ├── newProjectSetup.ts  # New project setup prompt
  │   └── index.ts            # Exports all prompts
scripts/
  ├── prepare-build.ts        # Script for preparing production builds
  ├── run-relevant-tests.ts   # Script for running tests on changed files
  └── setup-husky.js          # Script for setting up Git hooks
```

## ⚙️ Development

### Adding New Prompts

To add a new prompt template:

1. Create a new file in the `src/prompts` directory
2. Define your prompt using the `mcpServer.prompt()` method
3. Add parameter validation using zod schemas
4. Export your prompt in `src/prompts/index.ts`

Example:

```typescript
import { z } from 'zod';
import { mcpServer } from '../index';

mcpServer.prompt(
  'my-new-prompt',
  'Description of what this prompt does',
  {
    param1: z.string().describe('Description of param1'),
    param2: z.number().optional().describe('Description of param2'),
  },
  async ({ param1, param2 = 0 }) => {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Your prompt template with ${param1} and ${param2}...`,
          },
        },
      ],
    };
  },
);
```

### Environment Configuration

The server uses different environment files for development and production:
- `.env.development` - Used when running in development mode
- `.env.production` - Used when running in production mode

### Testing

Run the test suite with:

```bash
npm test
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## 📝 Notes for Deployment

When deploying to production:

1. Ensure your `.env.production` file contains valid credentials if required
2. The build process will embed these credentials in the compiled code
3. Use `npm run prod` to build and start the production server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Gpaul | Faldin
