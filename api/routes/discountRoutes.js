// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerDiscount = require('../controllers/discountController');


// Định nghĩa các API route
router.get('/discounts', controllerDiscount.getDiscounts);
router.post('/discounts', controllerDiscount.addDiscount);
router.get('/discounts/:id', controllerDiscount.getDiscountDetails);


module.exports = router;
