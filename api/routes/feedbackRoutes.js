// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerFeedback = require('../controllers/feedbackController');


// Định nghĩa các API route
router.get('/feedbacks', controllerFeedback.getFeedbacks);
router.post('/feedbacks', controllerFeedback.addFeedback);
router.get('/feedbacks/products/:product_id', controllerFeedback.getFeedbacksOfProduct);


module.exports = router;
