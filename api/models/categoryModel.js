// models/productModel.js

const db = require('../config/db');

const Category = {
  getAll: (callback) => {
    const sql = 'select category_id, category_name from categories';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },
};

module.exports = Category;