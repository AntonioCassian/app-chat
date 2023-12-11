import { resolve } from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import photoRoutes from './routes/photoRoutes';
import chatRoutes from './routes/chatRoutes';
import tokenRoutes from './routes/tokenRoutes';

import './database';

dotenv.config();

const whiteList = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:3001',
  'http://192.168.1.104:8081',
  'http://192.168.1.104:8081/',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed ay CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/photo', photoRoutes);
    this.app.use('/chat', chatRoutes);
    this.app.use('/tokens', tokenRoutes);
  }
}

export default new App().app;
