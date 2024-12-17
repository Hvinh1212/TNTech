// models/productModel.js

const { callbackPromise } = require('nodemailer/lib/shared');
const db = require('../config/db');

const Cart = {
  add: (customer_id, product_id, cart_quantity, callback) => {
    const sql = `insert into carts (customer_id, product_id, cart_quantity) 
                 values ($1, $2, $3) returning *`;
    db.query(sql, [customer_id, product_id, cart_quantity], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Thêm giỏ hàng thành thành công",
        success: true
      });
    });
  },

  getOfCustomer: (id, callback) => {
    const sql = `select * from carts where customer_id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows);
    })
  },

  getAll: (callback) => {
    const sql = `select * from carts`;
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows);
    })
  },

  updateQuantity: (cart_quantity, customer_id, product_id, callback) => {
    const sql = `update carts set cart_quantity = $1 
    where customer_id = $2 and product_id = $3 returning *`;
    db.query(sql, [cart_quantity, customer_id, product_id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Cập nhật số lượng thành công",
        success: true
      });
    })
  },

  getQuantity: (id, callback) => {
    const sql = `select sum(cart_quantity) as total_quantity 
    from carts where customer_id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows[0]);
    })
  },

  getTotal: (id, callback) => {
    const sql = `select sum(cart_total) as total_payment 
    from carts where customer_id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows[0]);
    })
  },

  removeProduct: (customer_id, product_id, callback) => {
    sql = `delete from carts where customer_id = $1 and 
    product_id = $2 returning *`;
    db.query(sql, [customer_id, product_id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Xóa giỏ hàng thành công",
        success: true
      });
    })
  },

  remove: (customer_id, callback) => {
    sql = `delete from carts where customer_id = $1`;
    db.query(sql, [customer_id], (err, result) => {
      if (err) {
        return callback(err, {
          message: "Xóa tất cả giỏ hàng thất bại",
          success: false
        });
      }
      return callback(null, {
        message: "Xóa tất cả giỏ hàng thành công",
        success: true,
      });
    })
  },

  updateCart: (customer_id, cartItems, callback) => {
    if (!customer_id || !Array.isArray(cartItems) || cartItems.length === 0) {
      return callback(new Error('Invalid input data'));
    }

    db.connect(async (err, client, release) => {
      if (err) {
        return callback(err);
      }

      try {
        await client.query('BEGIN');

        for (const item of cartItems) {
          const { product_id, cart_quantity } = item;

          if (!product_id || cart_quantity == null || cart_quantity < 0) {
            throw new Error('Invalid product data');
          }

          const result = await client.query(
            'SELECT * FROM carts WHERE customer_id = $1 AND product_id = $2',
            [customer_id, product_id]
          );

          if (result.rows.length > 0) {
            if (cart_quantity === 0) {
              await client.query(
                'DELETE FROM carts WHERE customer_id = $1 AND product_id = $2',
                [customer_id, product_id]
              );
            } else {
              await client.query(
                'UPDATE carts SET cart_quantity = $1 WHERE customer_id = $2 AND product_id = $3',
                [cart_quantity, customer_id, product_id]
              );
            }
          } else {
            if (cart_quantity > 0) {
              await client.query(
                'INSERT INTO carts (customer_id, product_id, cart_quantity) VALUES ($1, $2, $3)',
                [customer_id, product_id, cart_quantity]
              );
            }
          }
        }

        await client.query('COMMIT');
        callback(null, {
          message: 'Cart updated successfully',
          success: true
        });
      } catch (error) {
        await client.query('ROLLBACK');
        callback(error);
      } finally {
        release();
      }
    });
  }

};

module.exports = Cart;