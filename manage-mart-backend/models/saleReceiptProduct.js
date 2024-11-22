const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const product = require("./product");
const saleReceipt = require("./saleReceipt");

const saleReceiptProduct = sequelize.define(
  "saleReceiptProduct",
  {
    saleReceiptProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleReceiptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    productTotalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    productCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    productTotalCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "sales_receipts_products",
    timestamps: false,
  }
);

saleReceiptProduct.belongsTo(saleReceipt, {
  foreignKey: "saleReceiptId",
});
saleReceipt.hasMany(saleReceiptProduct, {
  foreignKey: "saleReceiptId",
});
saleReceiptProduct.belongsTo(product, {
  foreignKey: "productId",
});
product.hasMany(saleReceiptProduct, {
  foreignKey: "productId",
});

module.exports = saleReceiptProduct;
