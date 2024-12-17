// models/productModel.js

const db = require('../config/db');

const User = {
  getAll: (callback) => {
    const sql = 'select * from users';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },

  add: (userData, callback) => {
    const addUser = `insert into users (
    user_login_name, user_password,  
    user_email) 
    values ($1, $2, $3) 
    returning user_id`;

    const values = [
      userData.user_login_name,
      userData.user_password,
      userData.user_email,
    ];

    const checkEmailExists = `select s from users s 
    where s.user_email = $1`;

    const addUserIsCustomer = `insert into customers (user_id) 
    values ($1)`

    db.query(checkEmailExists, [userData.user_email], (err, result) => {
      if (result.rows.length) {
        // email đã đăng ký, 
        return callback(null, {
          message: "Email đã đăng ký. Vui lòng chọn email khác",
          success: false,
        });
      } else {
        db.query(addUser, values, (err, result) => {
          if (err) {
            return callback(err, null);
          }
          const userId = result.rows[0].user_id;
          db.query(addUserIsCustomer, [userId], (err, result) => {
            if (err) {
              return callback(err, null);
            }
            return callback(null, {
              message: "Thêm người dùng thành công",
              success: true,
            });
          })
        })
      }
    })
  },

  getDetails: (id, callback) => {
    const getUserById = `select * from users where user_id = $1`
    db.query(getUserById, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows);
    })
  },

  update: (userData, id, callback) => {
    const updateUser = `update users set 
    user_name = $1, user_birth = $2,  user_email = $3, 
    user_phone = $4 where user_id = $5`

    const values = [
      userData.user_name,
      userData.user_birth,
      userData.user_email,
      userData.user_phone,
      id,
    ];

    db.query(updateUser, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Cập nhật thành công",
        success: true,
      });
    })
  },

  remove: (id, callback) => {
    const removeUser = `delete from users where user_id = $1`;
    const removeCustomer = `delete from customers where user_id = $1`;
    db.query(removeCustomer, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }

      db.query(removeUser, [id], (err, result) => {
        if (err) {
          callback(err, null);
        }
        return callback(null, {
          message: "Xóa người dùng thành công",
          success: true,
        });
      })
    })
  },

};

module.exports = User;