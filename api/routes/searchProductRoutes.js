// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerSearchProduct = require('../controllers/searchProductController');


// Định nghĩa các API route
router.get('/searchProduct', controllerSearchProduct.searchProduct);


module.exports = router;


