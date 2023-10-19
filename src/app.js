import { resolve } from 'path';
import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import photoRoutes from './routes/photoRoutes';

import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/photo', photoRoutes);
  }
}

export default new App().app;
