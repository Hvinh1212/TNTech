// models/productModel.js

const { callbackPromise } = require('nodemailer/lib/shared');
const db = require('../config/db');
const cloudinary = require('../config/config.cloudinary');
const multer = require('multer');

const Product = {
  getAll: (callback) => {
    const sql = `SELECT 
                p.product_id,
                p.product_name,
                p.product_price,
                p.product_rate,
                p.product_description,
                p.product_image,
				p.discount_id,
                JSON_AGG(DISTINCT po.link) AS otherImages,
                JSON_AGG(
                    DISTINCT jsonb_build_object(
                        'key_name', pd.key_name,
                        'key_value', pd.key_value
                    )
                ) AS productDetail,
				
				 jsonb_build_object(
     			   'supplier_id', s.supplier_id,
   		  		   'supplier_name', s.supplier_name
 				   ) AS supplier,

    -- Gộp categories
    jsonb_build_object(
        'category_id', c.category_id,
        'category_name', c.category_name
    ) AS category
            FROM 
                products p
            LEFT JOIN 
                productotherimage po ON p.product_id = po.productid
            LEFT JOIN 
                product_details pd ON p.product_id = pd.product_id
				LEFT JOIN 
        suppliers s ON p.supplier_id = s.supplier_id
        LEFT JOIN 
        categories c ON p.category_id = c.category_id

            GROUP BY 
                p.product_id,  s.supplier_id, c.category_id;`;
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    });
  },

  add: (req, productData, callback) => {
    const addProduct = `
      INSERT INTO products (
        product_code, 
        product_type,
        product_name, 
        product_rate, 
        product_description, 
        product_price, 
        product_price_sale, 
        product_image, 
        status, 
        category_id,
        supplier_id
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING product_id`;

    // Upload hình ảnh lên Cloudinary
    const uploadImageToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        });
      });
    };

    // Kiểm tra và upload hình ảnh
    if (!req.file) {
      return callback(new Error("No file uploaded"), null);
    }

    uploadImageToCloudinary(req.file)
      .then((imageUrl) => {
        productData.product_image = imageUrl;

        // Chuẩn bị giá trị để thêm sản phẩm
        const values1 = [
          productData.product_code,
          productData.product_type,
          productData.product_name,
          productData.product_rate,
          productData.product_description,
          productData.product_price,
          productData.product_price_sale,
          productData.product_image, // URL từ Cloudinary
          productData.status,
          productData.category_id,
          productData.supplier_id,
        ];

        return db.query(addProduct, values1);
      })
      .then((result) => {
        const productID = result.rows[0].product_id;

        // Xử lý chi tiết sản phẩm
        let detailsArray;
        try {
          detailsArray = JSON.parse(productData.details);
        } catch (error) {
          throw new Error("Invalid JSON format for product details");
        }

        const detailPromises = detailsArray.map((detail) => {
          const { key_name, key_value } = detail;
          return db.query(
            "INSERT INTO product_details (product_id, key_name, key_value) VALUES ($1, $2, $3)",
            [productID, key_name, key_value]
          );
        });

        return Promise.all(detailPromises);
      })
      .then(() => {
        callback(null, { message: "Thêm sản phẩm thành công", success: true });
      })
      .catch((err) => {
        callback(err, null);
      });
  },


  remove: (id, callback) => {
    const removeProductDetails = "delete from product_details where product_id = $1";
    const removeProduct = "delete from products where product_id = $1 returning product_id";
    db.query(removeProductDetails, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      db.query(removeProduct, [id], (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, {
          message: "Xóa sản phẩm thành công",
          success: true,
        });
      })
    })
  },

  getDetails: (id, callback) => {
    const getProductDetails = `SELECT 
                p.product_id,
                p.product_name,
                p.product_price,
                p.product_rate,
                p.product_description,
                p.product_image,
				p.discount_id,
                JSON_AGG(DISTINCT po.link) AS otherImages,
                JSON_AGG(
                    DISTINCT jsonb_build_object(
                        'key_name', pd.key_name,
                        'key_value', pd.key_value
                    )
                ) AS productDetail,
				
				 jsonb_build_object(
     			   'supplier_id', s.supplier_id,
   		  		   'supplier_name', s.supplier_name
 				   ) AS supplier,

    -- Gộp categories
    jsonb_build_object(
        'category_id', c.category_id,
        'category_name', c.category_name
    ) AS category
            FROM 
                products p
            LEFT JOIN 
                productotherimage po ON p.product_id = po.productid
            LEFT JOIN 
                product_details pd ON p.product_id = pd.product_id
				LEFT JOIN 
        suppliers s ON p.supplier_id = s.supplier_id
        LEFT JOIN 
        categories c ON p.category_id = c.category_id
            WHERE 
                p.product_id = $1
            GROUP BY 
                p.product_id,  s.supplier_id, c.category_id;`

    db.query(getProductDetails, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows[0]);
    })
  },

  getByCategory: (id, callback) => {
    const getProductsByCategory = `select 
    product_id, product_code, 
    product_type, product_name, 
    product_rate, product_description,
    product_price, product_price_sale, 
    product_image, status, category_id, supplier_id 
    from products where status = 1 and category_id = $1`
    db.query(getProductsByCategory, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result.rows);
    })
  },

  update: (id, product_price, product_description, discount_id, callback) => {
    const sql = `update products set product_price = $1, discount_id = $2, 
    product_description = $3 where product_id = $4`;
    db.query(sql, [product_price, discount_id, product_description, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, {
        message: 'Sửa thành công',
        success: true
      });
    })

  }


};

module.exports = Product;
