// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerSupplier = require('../controllers/supplierController');


// Định nghĩa các API route
router.get('/suppliers', controllerSupplier.getSuppliers);


module.exports = router;
