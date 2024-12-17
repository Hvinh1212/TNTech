// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerFogotPass = require('../controllers/forgotPassController');


// Định nghĩa các API route
router.post('/forgotpass', controllerFogotPass.getCode);



module.exports = router;
