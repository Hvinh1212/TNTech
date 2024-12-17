// controllers/productController.js

const Supplier = require('../models/supplierModel');

// Lấy danh sách người dùng 
exports.getSuppliers = (req, res) => {
  Supplier.getAll((err, suppliers) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(suppliers);
  });
};



