const express = require('express');
const saleReceiptProductController = require('../controllers/saleReceiptProductController');
const router = express.Router();

router.post('/', saleReceiptProductController.addSaleReceiptProduct);

module.exports = router;