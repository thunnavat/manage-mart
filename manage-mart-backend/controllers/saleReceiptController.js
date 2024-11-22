const saleReceipt = require("../models/saleReceipt");

const addSaleReceipt = async (req, res) => {
  try {
    const {
      saleReceiptDate,
      saleReceiptTime,
      saleReceiptTotalPrice,
      saleReceiptDiscount,
      saleReceiptNet,
      saleReceiptCash,
      saleReceiptChange,
      paymentMethodId,
      saleReceiptStateWelfareCardCash,
      saleReceiptStateWelfareCardDifference,
      saleReceiptStateWelfareCardPayDifferenceMethod
    } = req.body;
    const newSaleReceipt = await saleReceipt.create({
      saleReceiptDate: saleReceiptDate,
      saleReceiptTime: saleReceiptTime,
      saleReceiptTotalPrice: saleReceiptTotalPrice,
      saleReceiptDiscount: saleReceiptDiscount,
      saleReceiptNet: saleReceiptNet,
      saleReceiptCash: saleReceiptCash,
      saleReceiptChange: saleReceiptChange,
      paymentMethodId: paymentMethodId,
      saleReceiptStateWelfareCardCash: saleReceiptStateWelfareCardCash,
      saleReceiptStateWelfareCardDifference: saleReceiptStateWelfareCardDifference,
      saleReceiptStateWelfareCardPayDifferenceMethod: saleReceiptStateWelfareCardPayDifferenceMethod
    });
    res.status(201).json(newSaleReceipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSaleReceipt,
};
