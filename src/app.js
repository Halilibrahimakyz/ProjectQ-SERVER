const express = require("express");
const _http = require('http');
const config = require('./config');
const isFunction = require('lodash');
const app = express();
const http = _http.createServer(app);

config.initModules.forEach((init) => require(`./init/${init}`)(app, http));

  config.dbModules.forEach((init) => {
    console.log("init", init);
    // Correctly require the module without .default
    const moduleFunc = require(`./init/${init}`);
    if (isFunction(moduleFunc)) {
      moduleFunc(app, http);
    } else {
      console.error(`Module ${init} is not a function`);
    }
  });
  
config.middlewareModules.forEach((mw) => require(`./middleware/${mw}`)(app, http));