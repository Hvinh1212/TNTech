// models/productModel.js

const db = require('../config/db');

const Discount = {
  getAll: (callback) => {
    const sql = 'select * from discounts';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },

  add: (discountData, callback) => {
    const sql = `insert into discounts (
    discount_name, discount_description, 
    discount_start_date, discount_end_date, 
    discount_amount, discount_img) 
    values ($1, $2, $3, $4, $5, $6) returning *`;
    const value = [
      discountData.discount_name,
      discountData.discount_description,
      discountData.discount_start_date,
      discountData.discount_end_date,
      discountData.discount_amount,
      discountData.discount_img,
    ];
    db.query(sql, value, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Thêm khuyến mãi thành công",
        success: true,
      });
    })
  },

  getDetails: (id, callback) => {
    const sql = 'select * from discounts where discount_id = $1';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows)
    })
  }


};

module.exports = Discount;