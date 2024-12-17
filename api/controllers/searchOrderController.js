
const SearchOrder = require('../models/searchProductModel');

exports.SearchOrder = (req, res) => {
  const { query } = req.query;
  SearchOrder.getAll(query, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(orders);
  });
};



