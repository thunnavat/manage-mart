const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const product = sequelize.define('product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productCost: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    productPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = product;