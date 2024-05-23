import { Application } from 'express';
import path from 'path';
import config from '../config';

const setupRoutes = async (app: Application): Promise<void> => {
  const { API_PREFIX } = config.env;

  if (!API_PREFIX) {
    throw new Error('API_PREFIX is not defined in environment variables.');
  }

  const API_ROUTE_PREFIX = path.resolve(__dirname, '../routes/api');
  console.log('');
  console.log('\x1b[35m%s\x1b[0m', '----------------------Routes----------------------');

  const routePromises = config.apiRoutes.map((routeName: string) => {
    return new Promise<void>((resolve, reject) => {
      const routeUrl = `${API_PREFIX}/${routeName}`;
      const routePath = path.join(API_ROUTE_PREFIX, routeName);

      console.log('\x1b[35m%s\x1b[0m', 'Route -------> ', routeUrl);

      try {
        const routeModule = require(routePath).default;
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

export default setupRoutes;
