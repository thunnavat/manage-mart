const express = require('express');
const productRoute = require('./routes/productRoute');
const productCategoryRoute = require('./routes/productCategoryRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/products', productRoute);
app.use('/api/product-categories', productCategoryRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});