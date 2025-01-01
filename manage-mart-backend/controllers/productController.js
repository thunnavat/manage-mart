const product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductByBarcode = async (req, res) => {
  try {
    const { productBarcode } = req.params;
    const productByBarcode = await product.findOne({
      where: { productBarcode: productBarcode },
    });
    if (productByBarcode) {
      res.status(200).json(productByBarcode);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      productBarcode,
      productName,
      productCost,
      productPrice,
      productQuantity,
      productExpirationDate,
      productImage,
      productCategoryId,
    } = req.body;
    if (productName === "")
      return res.status(400).json({ message: "Product name is required" });
    const newProduct = await product.create({
      productBarcode: productBarcode,
      productName: productName,
      productCost: productCost,
      productPrice: productPrice,
      productQuantity: productQuantity,
      productExpirationDate: productExpirationDate,
      productImage: productImage,
      productCategoryId: productCategoryId,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const editProduct = {
      productBarcode: req.body.productBarcode,
      productName: req.body.productName,
      productCost: req.body.productCost,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      productExpirationDate: req.body.productExpirationDate,
      productCategoryId: req.body.productCategoryId,
    };
    if (editProduct.productName === "")
      return res.status(400).json({ message: "Product name is required" });
    const productToUpdate = await product.findOne({
      where: { productId: productId },
    });
    if (productToUpdate) {
      productToUpdate.productBarcode = editProduct.productBarcode ? editProduct.productBarcode : productToUpdate.productBarcode
      productToUpdate.productName = editProduct.productName ? editProduct.productName : productToUpdate.productName;
      productToUpdate.productCost = editProduct.productCost ? editProduct.productCost : productToUpdate.productCost;
      productToUpdate.productPrice = editProduct.productPrice ? editProduct.productPrice : productToUpdate.productPrice;
      productToUpdate.productQuantity = editProduct.productQuantity ? editProduct.productQuantity : productToUpdate.productQuantity;
      productToUpdate.productExpirationDate = editProduct.productExpirationDate ? editProduct.productExpirationDate : productToUpdate.productExpirationDate;
      productToUpdate.productCategoryId = editProduct.productCategoryId ? editProduct.productCategoryId : productToUpdate.productCategoryId;
      await productToUpdate.save();
      res.status(200).json(productToUpdate);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productBarcode } = req.params;
    const deleted = await product.destroy({
      where: { productBarcode: productBarcode },
    });
    if (deleted) {
      res.status(200).send("Product deleted");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductByBarcode,
  addProduct,
  updateProduct,
  deleteProduct,
};
