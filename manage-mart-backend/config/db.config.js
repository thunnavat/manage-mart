require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: "mysql"
    },

    production: {
        username: process.env.DATABASE_PROD_USER,
        password: process.env.DATABASE_PROD_PASSWORD,
        database: process.env.DATABASE_PROD_NAME,
        host: process.env.DATABASE_PROD_HOST,
        dialect: "mysql"
    }
};