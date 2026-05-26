import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as z from 'zod/v4';

import { handleGetAlerts, handleGetForecast } from './handlers/tools.js';
import { handleAlertsResource, handleForecastResource } from './handlers/resources.js';
import { handleWeatherSummaryPrompt, handleWeatherCheckPrompt } from './handlers/prompts.js';

const server = new McpServer({
  name: 'weather',
  version: '1.0.0',
});


// Tools
server.registerTool(
  'get-alerts',
  {
    title: 'Get Weather Alerts',
    description: 'Get weather alerts for a US state',
    inputSchema: z.object({
      state: z.string().length(2).describe('Two-letter state code (e.g. CA, NY)'),
    }),
  },
  handleGetAlerts,
);

server.registerTool(
  'get-forecast',
  {
    title: 'Get Weather Forecast',
    description: 'Get weather forecast for a US location',
    inputSchema: z.object({
      latitude: z.number().min(-90).max(90).describe('Latitude of the location'),
      longitude: z.number().min(-180).max(180).describe('Longitude of the location'),
    }),
  },
  handleGetForecast,
);

// Resources
server.registerResource(
  'alerts',
  new ResourceTemplate('weather://alerts/{state}', { list: undefined }),
  {
    title: 'Weather Alerts',
    description: 'Active weather alerts for a US state',
  },
  async (uri, variables) => handleAlertsResource(variables.state as string),
);

server.registerResource(
  'forecast',
  new ResourceTemplate('weather://forecast/{coordinates}', { list: undefined }),
  {
    title: 'Weather Forecast',
    description: 'Weather forecast for a US location. Use format: LAT,LON (e.g. 40.7128,-74.0060)',
  },
  async (uri, variables) => handleForecastResource(variables.coordinates as string),
);

// Prompts
server.registerPrompt(
  'weather-summary',
  {
    title: 'Weather Summary',
    description: 'Get a complete weather summary for a city',
    argsSchema: {
      city: z.string().describe('City name'),
      state: z.string().length(2).describe('Two-letter state code (e.g. CA, NY)'),
    },
  },
  handleWeatherSummaryPrompt,
);

server.registerPrompt(
  'severe-weather-check',
  {
    title: 'Severe Weather Check',
    description: 'Check for severe weather alerts in a state',
    argsSchema: {
      state: z.string().length(2).describe('Two-letter state code (e.g. CA, NY)'),
    },
  },
  handleWeatherCheckPrompt,
);

// Main

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Weather MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
