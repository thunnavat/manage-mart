const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const productCategory = require("./productCategory");

const product = sequelize.define(
  "product",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productBarcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productExpirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

product.belongsTo(productCategory, {
    foreignKey: "productCategoryId",
    });
productCategory.hasMany(product, {
    foreignKey: "productCategoryId",
    });

module.exports = product;
