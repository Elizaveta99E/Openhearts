const sequelize = require('./db.js');
const {DataTypes} = require('sequelize');

// Синхронизация с БД
sequelize.sync({ alter: true })
    .then(() => console.log("It's work!"))
    .catch(error => console.error('Error:', error));
