// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerCustomer = require('../controllers/customerController');


// Định nghĩa các API route
router.get('/customers', controllerCustomer.getCustomers);


module.exports = router;
