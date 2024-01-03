import { Server } from 'socket.io';
import http from 'http';
import app from './app';

const serveHttp = http.createServer(app);

const io = new Server(serveHttp);

export { serveHttp, io };
