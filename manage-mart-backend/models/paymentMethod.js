const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const paymentMethod = sequelize.define(
    "paymentMethod",
    {
        paymentMethodId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        paymentMethodName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        tableName: "payment_methods",
        timestamps: false,
    }
    );

    module.exports = paymentMethod;