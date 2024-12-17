// models/productModel.js

const db = require('../config/db');

const Supplier = {
  getAll: (callback) => {
    const sql = 'select supplier_id, supplier_name from suppliers';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },
};

module.exports = Supplier;