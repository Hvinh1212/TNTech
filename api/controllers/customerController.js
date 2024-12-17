// controllers/productController.js

const Customer = require('../models/customerModel');

// Lấy danh sách người dùng 
exports.getCustomers = (req, res) => {
  Customer.getAll((err, customers) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(customers);
  });
};



