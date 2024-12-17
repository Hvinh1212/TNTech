// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const upload = require('../config/config.cloudinary');

const productController = require('../controllers/productController');

// Định nghĩa các API route
router.get('/products', productController.getProducts);
router.post('/products', upload.single('product_image'), productController.addProduct);
router.delete('/products', productController.removeProduct);
router.get('/products/:id', productController.getProductDetails);
router.get('/products/category/:id', productController.getProductsByCategory);
router.put('/products/:id', productController.updateProduct);



module.exports = router;
