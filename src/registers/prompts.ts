import z from "zod";
import {
  handleWeatherCheckPrompt,
  handleWeatherSummaryPrompt,
} from "../handlers/prompts.js";
import { server } from "../server.js";

server.registerPrompt(
  "weather-summary",
  {
    title: "Weather Summary",
    description: "Get a complete weather summary for a city",
    argsSchema: {
      city: z.string().describe("City name"),
      state: z
        .string()
        .length(2)
        .describe("Two-letter state code (e.g. CA, NY)"),
    },
  },
  handleWeatherSummaryPrompt,
);

server.registerPrompt(
  "severe-weather-check",
  {
    title: "Severe Weather Check",
    description: "Check for severe weather alerts in a state",
    argsSchema: {
      state: z
        .string()
        .length(2)
        .describe("Two-letter state code (e.g. CA, NY)"),
    },
  },
  handleWeatherCheckPrompt,
);
