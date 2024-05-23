// database.js
const { Sequelize } = require('sequelize');

// Export a function that creates the Sequelize instance
module.exports = function() {
  // Initialize Sequelize instance
  const sequelize = new Sequelize('postgres', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
  });

  return sequelize;
};
