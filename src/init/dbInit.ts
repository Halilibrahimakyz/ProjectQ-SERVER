import { Application } from 'express';
import { Server } from 'http';
import { AppDataSource } from '../data-source';

const initializeDatabase = async (app: Application, http: Server): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("")
    console.log('PostgreSQL Connection has been established successfully.');
    console.log('\x1b[32m%s\x1b[0m', 'All models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default initializeDatabase;