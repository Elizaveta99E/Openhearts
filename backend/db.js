const pg = require('pg');
const {Sequelize} = require('sequelize');
module.exports = new Sequelize('postgres://postgres:7281@host:5432/Openhearts\'', {dialect: 'postgres'})

