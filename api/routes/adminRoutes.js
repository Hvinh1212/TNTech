// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerAdmin = require('../controllers/adminController');


// Định nghĩa các API route
router.get('/admins', controllerAdmin.getAdmins);


module.exports = router;
