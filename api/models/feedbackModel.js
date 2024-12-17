// models/productModel.js

const db = require('../config/db');

const Feedback = {
  getAll: (callback) => {
    const sql = 'select * from feedbacks';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  add: (feedback_rate, feedback_content, product_id, customer_id, order_id, callback) => {
    const sql = `insert into feedbacks (
    feedback_rate, feedback_content, product_id, 
    customer_id, order_id) values ($1, $2, $3, $4, $5) 
    returning *`
    db.query(sql, [feedback_rate, feedback_content, product_id, customer_id, order_id], (err, result) => {
      if (err) {
        return callback(err, null)
      }
      return callback(err, {
        message: "Thêm phản hồi thành công",
        success: true,
      })
    })
  },

  getOfProduct: (id, callback) => {
    const sql = `select * from feedbacks where product_id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows)
    })
  }
};

module.exports = Feedback;