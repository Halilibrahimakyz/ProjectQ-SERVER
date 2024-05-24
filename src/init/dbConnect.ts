import { Application } from 'express';
import { Server } from 'http';
import { Sequelize, DataTypes } from 'sequelize';
import initDatabase from './database'; // Adjust the path if necessary
import config from '../config'; // Adjust the path if necessary

const initializeDatabase = async (app: Application, http: Server): Promise<void> => {
  try {
    const sequelize = initDatabase();
    await sequelize.authenticate();
    console.log(' ');
    console.log('PostgreSQL Connection has been established successfully.');
    console.log(' ');
    console.log('\x1b[32m%s\x1b[0m', '----------------------Models----------------------');

    const modelPromises = config.models.map(async (model: string) => {
      const modelDefine = require(`../models/${model}`);
      const eachModel = modelDefine(sequelize, DataTypes);
      await eachModel.sync({ alter: true });
      console.log('\x1b[32m%s\x1b[0m', `model -------> `, model);
    });

    await Promise.all(modelPromises);
    console.log('\x1b[32m%s\x1b[0m', '------------Models Loaded Successfully------------');

  } catch (error) {
    console.error('PostgreSQL Unable to connect to the database:', error);
  }
};

export default initializeDatabase;
