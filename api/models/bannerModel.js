// models/productModel.js

const db = require('../config/db');

const Banner = {
  getAll: (callback) => {
    const sql = 'select * from banners';
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },

  add: (bannerData, callback) => {
    const sql = `insert into banners (
    banner_name, banner_description, banner_img) 
    values ($1, $2, $3) returning *`
    const value = [
      bannerData.banner_name,
      bannerData.banner_description,
      bannerData.banner_img,
    ];
    db.query(sql, value, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: "Thêm banner thành công",
        success: true,
      })
    })
  },

  remove: (id, callback) => {
    const sql = 'delete from banners where banner_id = $1 returning banner_id';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, {
          message: "Xóa banner thành công",
          success: true
        })
      }
    })
  }


};

module.exports = Banner;