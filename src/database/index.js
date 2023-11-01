import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import User from '../models/User';
import Photo from '../models/Photo';
import Chat from '../models/Chat';

const models = [User, Photo, Chat];

const connection = new Sequelize(dataBaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
