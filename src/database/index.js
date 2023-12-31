import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import User from '../models/User';
import Photo from '../models/Photo';
import Message from '../models/Message';
import Contact from '../models/Contact';

const models = [User, Photo, Message, Contact];

const connection = new Sequelize(dataBaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
