# Notes

**`stdio`** — defines how the MCP client communicates with the server. In the case of stdio, communication happens via the process standard input and output — the client starts the server as a subprocess and exchanges messages through stdin and stdout.

**`sse`** — communication via HTTP using Server-Sent Events. Used for remote servers, the connection is unidirectional from server to client.

**`http`** — Streamable HTTP, the most recent transport. Used for remote servers with support for bidirectional streaming.

For local servers like this one, `stdio` is always the right choice. The other two make sense when the server is hosted somewhere and the client connects over the network.
