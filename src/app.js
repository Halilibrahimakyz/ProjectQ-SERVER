const express = require("express");
const _http = require('http');
const config = require('./config');

const app = express();
const http = _http.createServer(app);

config.initModules.forEach((init) => require(`./init/${init}`)(app, http));
config.middlewareModules.forEach((mw) => require(`./middleware/${mw}`)(app, http));