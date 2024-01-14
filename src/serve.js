import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`User conected: ${socket.id}`);
});

const port = 3001;

httpServer.listen(port, () => {
  console.log();
  console.log(`Executando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost:${port}`);
});
