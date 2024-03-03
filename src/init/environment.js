
const dotenv = require('dotenv');

module.exports = async () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      dotenv.config({path: './src/config/config-prod.env'});
      break;
    case 'development':
      dotenv.config({path: './src/config/config-dev.env'});
      break;
  }
};
