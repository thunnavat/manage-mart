const express = require('express');
const productRoute = require('./routes/productRoute');
const productCategoryRoute = require('./routes/productCategoryRoute');
const saleReceiptRoute = require('./routes/saleReceiptRoute');
const saleReceiptProductRoute = require('./routes/saleReceiptProductRoute');
const paymentMethodRoute = require('./routes/paymentMethodRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/products', productRoute);
app.use('/api/product-categories', productCategoryRoute);
app.use('/api/sales-receipts', saleReceiptRoute);
app.use('/api/sales-receipts-products', saleReceiptProductRoute);
app.use('/api/payment-methods', paymentMethodRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});