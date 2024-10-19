const product = require('../models/product.js');

const getAllProducts = async (req, res) => {
    try {
        const products = await product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const newProduct = await product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllProducts,
    addProduct
}