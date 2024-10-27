const express = require('express');
const productCategoryController = require('../controllers/productCategoryController.js');
const router = express.Router();

router.get('/', productCategoryController.getAllProductCategories);

module.exports = router;