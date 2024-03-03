const path = require('path');

module.exports.initModules = ['environment', 'listen'];

module.exports.middlewareModules = ['cors','express','routes'];

module.exports.apiRoutes = ['test'];

module.exports.env = process.env;