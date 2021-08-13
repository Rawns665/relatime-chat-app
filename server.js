const express = require('express');
const socket = require('socket.io');

//Server infos
const HOST = 'localhost';
const PORT = 3000

const app = express();
const server = app.listen(PORT, () => console.log(`[Server] Server is listening...\n[Link] http://${HOST}:${PORT}`));

app.use(express.static('public'));
const io = socket(server);

io.on('connection', (socket) => {
   console.log("UserID:"+socket.id)

   socket.on('chat', data => {
      io.sockets.emit('chat', data);
   });

   socket.on('typing', data => {
      socket.broadcast.emit('typing', data);
   });
});