const WebSocket = require("ws");

// Create WebSocket server on port 8080
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on("connection", (ws) => {
  clients.add(ws);

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // Broadcast message to all connected clients except sender
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

console.log("WebSocket Signaling Server running on ws://0.0.0.0:8080");