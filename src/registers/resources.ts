import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { server } from "../server.js";
import {
  handleAlertsResource,
  handleForecastResource,
} from "../handlers/resources.js";

server.registerResource(
  "alerts",
  new ResourceTemplate("weather://alerts/{state}", { list: undefined }),
  {
    title: "Weather Alerts",
    description: "Active weather alerts for a US state",
  },
  async (uri, variables) => handleAlertsResource(variables.state as string),
);

server.registerResource(
  "forecast",
  new ResourceTemplate("weather://forecast/{coordinates}", { list: undefined }),
  {
    title: "Weather Forecast",
    description:
      "Weather forecast for a US location. Use format: LAT,LON (e.g. 40.7128,-74.0060)",
  },
  async (uri, variables) =>
    handleForecastResource(variables.coordinates as string),
);
