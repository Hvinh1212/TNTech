// controllers/productController.js

const Product = require('../models/productModel');
const upload = require('../config/config.cloudinary');


// Lấy danh sách sản phẩm
exports.getProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(products);
  });
};

// Thêm 1 sản phẩm
exports.addProduct = (req, res) => {

  const productData = {
    product_code: Math.floor(Math.random() * (1100 - 1000 + 1)) + 1000,
    product_type: null,
    product_name: req.body.product_name,
    product_rate: null,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_price_sale: null,
    product_image: req.file ? req.file.secure_url : null,
    status: 1,
    category_id: req.body.category_id,
    supplier_id: req.body.supplier_id,
    details: req.body.details
  };


  // Gọi phương thức add từ Product model, truyền req để upload hình ảnh
  Product.add(req, productData, (err, product) => { // Thêm req vào tham số
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(product);
  });
};

// Xóa 1 sản phẩm
exports.removeProduct = (req, res) => {
  const { product_id } = req.body;
  Product.remove(product_id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(product);
  })
}

// Lấy chi tiết sản phẩm
exports.getProductDetails = (req, res) => {
  const id = req.params.id;
  Product.getDetails(id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(product);
  })
}

// Lấy sản phẩm theo danh mục
exports.getProductsByCategory = (req, res) => {
  const id = req.params.id;
  Product.getByCategory(id, (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(products);
  })
}

exports.updateProduct = (req, res) => {
  const product_id = req.params.id;
  const { product_price, product_description, discount_id } = req.body;
  Product.update(product_id, product_price, product_description, discount_id, (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(products);
  })
}




