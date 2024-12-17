
const SearchProduct = require('../models/searchProductModel');

exports.searchProduct = (req, res) => {
  const { query } = req.query;
  SearchProduct.getAll(query, (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(products);
  });
};



