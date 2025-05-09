const pg = require('pg');
const {Sequelize} = require('sequelize');

module.exports = new Sequelize({
    database: 'Openhearts',
    username: 'postgres',
    password: '7281',
    host: 'localhost', // Если БД локальная
    port: 5432, // Стандартный порт PostgreSQL
    dialect: 'postgres',
    dialectModule: pg, // Используем драйвер pg
})

