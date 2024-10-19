const express = require('express');
const productRoute = require('./routes/productRoute');

const app = express();
const port = 3000;

app.use('/products', productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});