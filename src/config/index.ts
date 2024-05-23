import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

interface Config {
  initModules: string[];
  dbModules: string[];
  middlewareModules: string[];
  apiRoutes: string[];
  models: string[];
  env: NodeJS.ProcessEnv;
}

const config: Config = {
  // Modules to initialize at the beginning of the application
  initModules: ['environment', 'listen'],

  // Modules related to setting up and connecting to the database
  dbModules: ['database', 'dbConnect'],

  // Middleware modules to set up for the Express application
  middlewareModules: ['cors', 'express', 'routes'],

  // API routes that will be dynamically loaded
  apiRoutes: ['test'],

  // Models to be loaded and synchronized with the database
  models: [
    'user', // Represents users in the database
    'supporter', // Represents supporters in the database
    'project', // Represents projects in the database
    'supporterTransaction', // Represents transactions made by supporters
    'projectType', // Represents different types of projects
    'status', // Represents statuses for various entities
    'student', // Represents students in the database
    'studentTransaction', // Represents transactions made by students
  ],

  // Environment variables loaded from the .env file
  env: process.env,
};

export default config;
