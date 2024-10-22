const express = require('express');
const productRoute = require('./routes/productRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/products', productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});