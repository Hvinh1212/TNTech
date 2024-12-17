// models/productModel.js

const db = require('../config/db');

const Order = {
  getAll: (callback) => {
    const sql = 'select * from orders';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },

  add: (orderData, callback) => {

    const addOrder = `insert into orders (
    order_name, order_phone, order_date, 
    order_delivery_date, order_delivery_address, 
    order_total, order_paying_date, order_is_paid, 
    order_status, customer_id, paying_method_id) 
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    returning order_id`;

    const values = [
      orderData.order_name,
      orderData.order_phone,
      orderData.order_date,
      orderData.order_delivery_date,
      orderData.order_delivery_address,
      orderData.order_total,
      orderData.order_paying_date,
      orderData.order_is_paid,
      orderData.order_status,
      orderData.customer_id,
      orderData.paying_method_id,
    ];

    const addOrderDetails = `insert into order_details (
    order_id, product_id, order_detail_quantity) 
    values ($1, $2, $3)`;

    db.query(addOrder, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      const orderID = result.rows[0].order_id;
      const detailPromises = orderData.order_details.map(detail => {
        const { product_id, order_detail_quantity } = detail;
        return new Promise((resolve, reject) => {
          db.query(
            addOrderDetails,
            [orderID, product_id, order_detail_quantity],
            (err, result) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      });

      Promise.all(detailPromises)
        .then(() => {
          callback(null, {
            message: "Thêm hóa đơn thành công",
            success: true,
          });
        })
        .catch(err => {
          callback(err, null);
        });
    });
  },

  getDetail: (id, callback) => {
    const sql = `select od.order_id, order_name, 
    product_name, product_image, discount_id, paying_method_id, order_delivery_address,order_detail_quantity, order_total, p.product_id, product_price, order_detail_quantity, order_status, customer_id
    from orders o join order_details od 
    on o.order_id = od.order_id join products p 
    on od.product_id = p.product_id where od.order_id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows);
    })
  },

  remove: (id, callback) => {
    const removeOrder = 'delete from orders where customer_id = $1 returning order_id';
    const removeOrderDetails = `DELETE FROM order_details WHERE order_id IN (
  SELECT order_id FROM orders WHERE customer_id = $1)`;
    db.query(removeOrderDetails, [id], (err, result) => {
      if (err) {
        return callback(err, {
          message: "Xóa đơn hàng thất bại",
          success: false,
        })
      }
      db.query(removeOrder, [id], (err, result) => {
        if (err) {
          return callback(err, {
            message: "Xóa đơn hàng thất bại",
            success: false,
          });
        }
        return callback(null, {
          message: "Xóa hóa đơn thành công",
          success: true,
        })
      })
    })
  },

  removeId: (id, callback) => {
    const sql = `delete from order where order_id = $1`;
    db.query(sql, id, (err, result) => {
      if (err) {
        return callback(err, {
          message: "Xóa đơn hàng thất bại",
          success: false,
        })
      } else {
        return callback(null, {
          message: "Xóa hóa đơn thành công",
          success: true,
        })
      }
    })
  },

  updateStatus: (order_status, id, callback) => {
    sql = `update orders set order_status = $1 
    where order_id = $2 returning order_status`;
    db.query(sql, [order_status, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Cập nhật trạng thái thành công",
        success: true,
      })
    })
  },

  updatePay: (order_is_paid, order_paying_date, id, callback) => {
    sql = `update orders 
    set order_is_paid = $1, order_paying_date = $2 
    where order_id = $3 
    returning order_is_paid, order_paying_date`;
    db.query(sql, [order_is_paid, order_paying_date, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Cập nhật thanh toán thành công",
        success: true,
      })
    })
  },

  getOfCustomer: (id, callback) => {
    sql = `select * from orders where customer_id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows);
    })
  }


};

module.exports = Order;