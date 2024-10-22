const { Sequelize } = require("sequelize");
const dbconfig = require("./db.config.js")['development'];

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
});

module.exports = sequelize;