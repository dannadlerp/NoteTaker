const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_HOST) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST, // Use DB_HOST from environment variables
      dialect: process.env.DB_DIALECT, // Use DB_DIALECT from environment variables
      port: process.env.DB_PORT // Use DB_PORT from environment variables if it's defined
    }
  );
} else {
  console.error('DB_HOST error');
}
module.exports = sequelize;
