// Modules
const Sequelize = require('sequelize');

// DB Connection
const sequelize = new Sequelize( "db", "username", "password", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

module.exports = sequelize;