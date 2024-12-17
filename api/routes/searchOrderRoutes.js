// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerSearchOrder = require('../controllers/searchOrderController');


// Định nghĩa các API route
router.get('/searchOrder', controllerSearchOrder.SearchOrder);


module.exports = router;
