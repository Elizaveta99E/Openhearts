const pg = require('pg');
const {Sequelize} = require('sequelize');

module.exports = new Sequelize({
    database: 'Openhearts',
    username: 'postgres',
    password: '7281',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectModule: pg, 
})

