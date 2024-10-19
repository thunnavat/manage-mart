const { Sequelize } = require("sequelize");
const dbconfig = require("./db.config.js");

const sequelize = new Sequelize(dbconfig.DATABASE, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
});

module.exports = sequelize;