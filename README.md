# MCP Weather

A Model Context Protocol (MCP) server that exposes weather data from the [National Weather Service API](https://api.weather.gov). Built with the `@modelcontextprotocol/sdk` and TypeScript.

> Only US locations are supported by the NWS API.

---

## What is MCP?

MCP (Model Context Protocol) is a protocol that allows you to expose capabilities to LLM hosts (like Claude Desktop, VS Code with Copilot, Cursor, etc.). A server can provide three types of capabilities:

- **Tools** — functions that the LLM can call to execute actions and return results
- **Resources** — read-only data the client can read, such as files, API responses, or database content. The LLM uses it to have context
- **Prompts** — pre-written templates that help the user perform specific tasks, they appear as shortcuts in the host

## Capabilities

### Tools

| Tool           | Description                              | Parameters                                        |
| -------------- | ---------------------------------------- | ------------------------------------------------- |
| `get-alerts`   | Get active weather alerts for a US state | `state` — two-letter state code (e.g. `CA`, `NY`) |
| `get-forecast` | Get weather forecast for a US location   | `latitude`, `longitude`                           |

### Resources

| URI                                | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `weather://alerts/{state}`         | Active weather alerts for a US state                      |
| `weather://forecast/{coordinates}` | Weather forecast for a location (e.g. `40.7128,-74.0060`) |

### Prompts

| Prompt                 | Description                                | Arguments       |
| ---------------------- | ------------------------------------------ | --------------- |
| `weather-summary`      | Complete weather summary for a city        | `city`, `state` |
| `severe-weather-check` | Check for severe weather alerts in a state | `state`         |

---

## Project Structure

```
src/
├── handlers/
│   ├── tools.ts       # get-alerts, get-forecast
│   ├── resources.ts   # weather://alerts, weather://forecast
│   └── prompts.ts     # weather-summary, severe-weather-check
├── registers/
│   ├── tools.ts       # Register tools in the server
│   ├── resources.ts   # Register resources in the server
│   └── prompts.ts     # Register prompts in the server
├── api.ts             # NWS API client
├── server.ts          # Create MCP Server
├── formatters.ts      # Data formatting helpers
├── types.ts           # TypeScript interfaces
├── constants.ts       # Global constants
└── index.ts           # Server setup and capability registration
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/allanfoppa/mcp-weather.git
cd mcp-weather
npm install
```

### Build

```bash
npm run build
```

### Testing with MCP Inspector

```bash
npm run inspector
```

---

## Connecting to a Host

### VS Code with GitHub Copilot

Create a `.vscode/mcp.json` file in the project root:

```json
{
  "servers": {
    "weather": {
      "type": "stdio",
      "command": "node",
      "args": ["./build/index.js"]
    }
  }
}
```

Open Copilot Chat in **Agent** mode, click **Tools** and confirm `get-alerts` and `get-forecast` are listed.

### Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-weather/build/index.js"]
    }
  }
}
```

---

## FINAL CONSIDERATIONS

This application is a personal project developed for educational purposes to explore new technologies and architectural concepts. Please note that it is not intended for commercial use and might not follow all production-grade best practices.

Feedback and contributions are more than welcome! Feel free to explore the code, open an issue, or reach out if you have any suggestions. Thank you for checking it out!
