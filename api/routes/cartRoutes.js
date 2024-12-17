// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerCart = require('../controllers/cartController');


// Định nghĩa các API route
router.post('/carts', controllerCart.addToCart);
router.get('/carts/:customer_id', controllerCart.getCartOfCustomer);
router.put('/carts/:customer_id/:product_id', controllerCart.updateProductQuantity);
router.get('/carts/:customer_id/count', controllerCart.getQuantityCart);
router.get('/carts/:customer_id/total', controllerCart.getTotalCart);
router.delete('/carts', controllerCart.removeProductOfCart);
router.delete('/carts/remove', controllerCart.removeCart);
router.put('/update-cart', controllerCart.updateCart);
router.get('/carts', controllerCart.getAllCart);




module.exports = router;
