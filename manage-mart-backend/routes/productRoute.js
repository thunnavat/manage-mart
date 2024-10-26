const express = require('express');
const productController = require('../controllers/productController.js');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/:productBarcode', productController.updateProduct);
router.delete('/:productBarcode', productController.deleteProduct);

module.exports = router;