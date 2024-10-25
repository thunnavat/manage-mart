const express = require('express');
const productController = require('../controllers/productController.js');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;