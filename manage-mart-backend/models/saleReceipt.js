const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const paymentMethod = require("./paymentMethod"); 

const saleReceipt = sequelize.define(
  "saleReceipt",
  {
    saleReceiptId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleReceiptDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    saleReceiptTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    saleReceiptTotalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    saleReceiptDiscount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    saleReceiptNet: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    saleReceiptCash: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    saleReceiptChange: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    saleReceiptStateWelfareCardCash: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    saleReceiptStateWelfareCardDifference: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    saleReceiptStateWelfareCardPayDifferenceMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "sales_receipts",
    timestamps: false,
  }
);

saleReceipt.belongsTo(paymentMethod, {
  foreignKey: "paymentMethodId",
});
paymentMethod.hasMany(saleReceipt, {
  foreignKey: "paymentMethodId",
});

module.exports = saleReceipt;
