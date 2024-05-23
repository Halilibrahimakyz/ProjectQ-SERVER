const dotenv = require('dotenv');

module.exports = async () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      dotenv.config({path: './src/config/config-prod.env'});
      break;
    case 'development':
      dotenv.config({path: './src/config/config-dev.env'});
      break;
    default:
      throw new Error('NODE_ENV not set');
  }
  console.log(`Environment: ${process.env.NODE_ENV}`);
};
