const productCategory = require("../models/productCategory");

const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await productCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProductCategories,
};
