const saleReceiptProduct = require("../models/saleReceiptProduct");
const product = require("../models/product");

const addSaleReceiptProduct = async (req, res) => {
  try {
    const {
      saleReceiptId,
      productId,
      productQuantity,
      productPrice,
      productTotalPrice,
      productCost,
      productTotalCost,
    } = req.body;
    const productToSell = await product.findOne({
      where: { productId: productId },
    });
    if (productToSell.productQuantity < productQuantity) {
      return res.status(400).json({ message: "Not enough product quantity" });
    }
    const newSaleReceiptProduct = await saleReceiptProduct.create({
      saleReceiptId: saleReceiptId,
      productId: productId,
      productQuantity: productQuantity,
      productPrice: productPrice,
      productTotalPrice: productTotalPrice,
      productCost: productCost,
      productTotalCost: productTotalCost,
    });
    res.status(201).json(newSaleReceiptProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSaleReceiptProduct,
};
