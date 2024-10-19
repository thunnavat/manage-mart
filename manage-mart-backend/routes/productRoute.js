const express = require('express');
const productController = require('../controllers/productController.js');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);

module.exports = router;