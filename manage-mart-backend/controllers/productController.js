const product = require("../models/product.js");

const getAllProducts = async (req, res) => {
  try {
    const products = await product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      productId,
      productName,
      productCost,
      productPrice,
      productQuantity,
      productImage,
    } = req.body;
    const newProduct = await product.create({
      productId: productId,
      productName: productName,
      productCost: productCost,
      productPrice: productPrice,
      productQuantity: productQuantity,
      productImage: productImage,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
};
