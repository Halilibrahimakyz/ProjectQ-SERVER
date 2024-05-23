// dbConnect.js
const { authenticate, sync } = require('sequelize');
const initDatabase = require('./database'); // Adjust the path if necessary
const { DataTypes } = require('sequelize');
const config = require('../config');

module.exports = async function (app, http) {
  // sequelize nesnesi ile işlem yap
  try {
    const sequelize = initDatabase();
    await sequelize.authenticate();
    console.log('PostgreSQL Connection has been established successfully.');

    config.models.forEach(async (model) => {
      
      const modelDefine = require(`../models/${model}`); // Modeli dinamik olarak yükle
      const eachModule = modelDefine(sequelize, DataTypes); // Modeli sequelize ve DataTypes ile başlat
      await eachModule.sync({ alter: false }); // Modeli veritabanı ile senkronize et
      console.log('\x1b[32m%s\x1b[0m', 'model -------> ',model)
    });
  } catch (error) {
    console.error('PostgreSQL Unable to connect to the database:', error);
  }
};
