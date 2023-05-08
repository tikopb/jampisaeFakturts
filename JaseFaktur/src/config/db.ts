require('dotenv').config();

const Sequelize = require('sequelize');
const config = require('./database.js');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

async function Db() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return null;
  }
}

module.exports = Db;


