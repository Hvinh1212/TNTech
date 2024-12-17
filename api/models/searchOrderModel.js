// models/productModel.js

const db = require('../config/db');

const SearchOrder = {
  getAll: (query, callback) => {
    const queryParam = `%${query}%`;
    const sql = `
    SELECT * FROM orders
    WHERE (
        CAST(order_id AS text) LIKE $1 
        OR LOWER(order_phone) LIKE LOWER($1) 
    )
    AND order_status = '1'`;
    db.query(sql, [queryParam], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },
};

module.exports = SearchOrder;