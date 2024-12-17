// models/productModel.js

const db = require('../config/db');

const Admin = {
  getAll: (callback) => {
    const sql = 'select * from admins';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },


};

module.exports = Admin;