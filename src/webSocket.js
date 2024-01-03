import { io } from './http';

io.on('connection', (socket) => {
  console.log(`User conected ${socket.id}`);
});
