import express, { Application } from 'express';
import { Server } from 'http';
import path from 'path';
import config from './config';
import isFunction from 'lodash/isFunction';


const app: Application = express();
const server: Server = new Server(app);

// Async module initialization function
const initModule = async (relativePath: string, app: Application, server: Server): Promise<void> => {
  try {
    const absolutePath = path.resolve(__dirname, relativePath);
    const moduleFunc = (await import(absolutePath)).default;
    if (isFunction(moduleFunc)) {
      await moduleFunc(app, server);
    } else {
      console.error(`Module ${absolutePath} is not a function`);
    }
  } catch (error) {
    console.error(`Failed to initialize module ${relativePath}:`, error);
  }
};

// Initialize all modules
const initializeModules = async (): Promise<void> => {
  await Promise.all(config.initModules.map((init: string) => initModule(`./init/${init}`, app, server)));
  // await Promise.all(config.dbModules.map((init: string) => initModule(`./init/${init}`, app, server)));
  await Promise.all(config.dbModules.map((init: string) => initModule(`./init/${init}`, app, server)));
  await Promise.all(config.middlewareModules.map((mw: string) => initModule(`./middleware/${mw}`, app, server)));
};

initializeModules()
  .then(() => {
    console.log('All modules initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing modules:', error);
  });
  
export { app, server };
