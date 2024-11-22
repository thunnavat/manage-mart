const express = require('express');
const paymentMethodController = require('../controllers/paymentMethodController.js');
const router = express.Router();

router.get('/', paymentMethodController.getAllPaymentMethods);

module.exports = router;