const { apiRoutes, env } = require('../config');
const path = require('path');

module.exports = async (app) => {
  const { API_PREFIX } = env;
  const API_ROUTE_PREFIX = path.resolve(__dirname, '../routes/api');
  console.log('');
  console.log('\x1b[35m%s\x1b[0m', '------------Routes------------');
  
  const routePromises = apiRoutes.map((routeName) => {
    return new Promise((resolve, reject) => {
      const routeUrl = `${API_PREFIX}/${routeName}`;
      const routePath = path.join(API_ROUTE_PREFIX, routeName);
      
      console.log('\x1b[35m%s\x1b[0m', 'Route -------> ', routeUrl);

      try {
        const routeModule = require(routePath);
        app.use(routeUrl, routeModule);
        resolve();
      } catch (error) {
        console.error(`Failed to load route module ${routePath}:`, error);
        reject(error);
      }
    });
  });

  try {
    await Promise.all(routePromises);
    console.log('\x1b[35m%s\x1b[0m', '------------Routes Loaded Successfully------------');
    console.log('');
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};
