const express = require('express');
const router = express.Router();

const momoController = require('../controllers/momoController');

router.post('/payment-momo', momoController.createPayment);

module.exports = router;
