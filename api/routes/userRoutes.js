// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


// Định nghĩa các API route
router.get('/users', userController.getUsers);
router.post('/users/register', userController.addUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.removeUser);

module.exports = router;
