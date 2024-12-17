// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerOrder = require('../controllers/orderController');


// Định nghĩa các API route
router.get('/orders', controllerOrder.getOrders);
router.post('/orders', controllerOrder.addOrder);
router.get('/orders/:orderId', controllerOrder.getOrderDetails);
router.delete('/orders', controllerOrder.removeOrder);
router.delete('/orders/:id', controllerOrder.removeOrderId);
router.put('/orders/:orderId/status', controllerOrder.updateOrderStatus);
router.put('/orders/:orderId/pay', controllerOrder.updateOrderPay);
router.get('/orders/customer/:customerId', controllerOrder.getOrderOfCustomer);





module.exports = router;
