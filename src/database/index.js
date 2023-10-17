import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import User from '../models/User';

const models = [User];

const connection = new Sequelize(dataBaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
