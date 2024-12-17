// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerConfirmPass = require('../controllers/confirmPassController');


// Định nghĩa các API route
router.post('/confirm', controllerConfirmPass.confirm);



module.exports = router;
