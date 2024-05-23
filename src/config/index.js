const path = require('path');

module.exports.initModules = ['environment', 'listen'];

module.exports.dbModules = ['database', 'dbConnect'];

module.exports.middlewareModules = ['cors', 'express', 'routes'];

module.exports.apiRoutes = ['test'];

module.exports.models = [
  'user',
  'supporter',
  'project',
  'supporterTransaction',
  'projectType',
  'status',
  'student',
  'studentTransaction',
];

module.exports.env = process.env;