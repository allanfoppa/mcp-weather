import z from "zod";
import { handleGetAlerts, handleGetForecast } from "../handlers/tools.js";
import { server } from "../server.js";

server.registerTool(
  "get-alerts",
  {
    title: "Get Weather Alerts",
    description: "Get weather alerts for a US state",
    inputSchema: z.object({
      state: z
        .string()
        .length(2)
        .describe("Two-letter state code (e.g. CA, NY)"),
    }),
  },
  handleGetAlerts,
);

server.registerTool(
  "get-forecast",
  {
    title: "Get Weather Forecast",
    description: "Get weather forecast for a US location",
    inputSchema: z.object({
      latitude: z
        .number()
        .min(-90)
        .max(90)
        .describe("Latitude of the location"),
      longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Longitude of the location"),
    }),
  },
  handleGetForecast,
);
