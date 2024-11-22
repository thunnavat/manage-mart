const express = require('express');
const saleReceiptController = require('../controllers/saleReceiptController');
const router = express.Router();

router.post('/', saleReceiptController.addSaleReceipt);

module.exports = router;