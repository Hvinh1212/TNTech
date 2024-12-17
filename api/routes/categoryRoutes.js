// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerCategory = require('../controllers/categoryController');


// Định nghĩa các API route
router.get('/categories', controllerCategory.getCategories);


module.exports = router;
