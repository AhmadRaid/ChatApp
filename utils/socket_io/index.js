const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('A user connected.');
  
    // Handle custom events and messages
    socket.on('chat message', (message) => {
      console.log('Received message:', message);
      // Do something with the message
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });
  