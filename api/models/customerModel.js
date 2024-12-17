// models/productModel.js

const db = require('../config/db');

const Customer = {
  getAll: (callback) => {
    const sql = 'select * from customers';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },


};

module.exports = Customer;