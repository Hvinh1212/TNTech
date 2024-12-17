// models/productModel.js

const db = require('../config/db');

const SearchProduct = {
  getAll: (query, callback) => {
    const queryParam = `%${query}%`;
    const sql = `SELECT DISTINCT p.* 
FROM products p
LEFT JOIN categories c ON p.category_id = c.category_id
LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
WHERE (
  LOWER(p.product_name) LIKE LOWER($1) OR
  LOWER(c.category_name) LIKE LOWER($1) OR
  LOWER(s.supplier_name) LIKE LOWER($1)
)
AND p.status = 1;`
    db.query(sql, [queryParam], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },
};

module.exports = SearchProduct;