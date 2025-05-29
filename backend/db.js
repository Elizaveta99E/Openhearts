const pg = require('pg');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  database: process.env.DB_NAME || 'Openhearts',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '7281',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectModule: pg,
});