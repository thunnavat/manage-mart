const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const product = require("./product");

const productCategory = sequelize.define(
  "productCategory",
  {
    productCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "productcategories",
    timestamps: false,
  }
);

module.exports = productCategory;