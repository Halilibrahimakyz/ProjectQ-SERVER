const express = require('express');
const http = require('http');
const config = require('./config');
const isFunction = require('lodash/isFunction');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Async module initialization function
const initModule = async (relativePath, app, server) => {
  try {
    const absolutePath = path.resolve(__dirname, relativePath);
    const moduleFunc = require(absolutePath);
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
const initializeModules = async () => {
  await Promise.all(config.initModules.map((init) => initModule(`./init/${init}`, app, server)));
  await Promise.all(config.dbModules.map((init) => initModule(`./init/${init}`, app, server)));
  await Promise.all(config.middlewareModules.map((mw) => initModule(`./middleware/${mw}`, app, server)));
};

initializeModules()
  .then(() => {
    console.log('All modules initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing modules:', error);
  });

module.exports = { app, server };
