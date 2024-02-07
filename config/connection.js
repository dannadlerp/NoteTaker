const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_HOST) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      //use the following from .env file
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
      database: DB_NAME,
      Storage: "../db/db.json"
    }
  );
} else {
  console.error('DB_HOST error');
}
module.exports = sequelize;
