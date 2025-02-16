const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  const customId = socket.handshake.query.customId;

  // Optionally set the socket's ID to the custom ID
  if (customId) {
    socket.id = customId;
  }
  console.log('A user connected:', socket.id);

  // Receive and broadcast messages
  socket.on('message', (data) => {
    io.emit('message', {
      id: socket.id,
      message: data
    }); // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
