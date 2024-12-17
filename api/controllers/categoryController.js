
const Category = require('../models/categoryModel');

exports.getCategories = (req, res) => {
  Category.getAll((err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(categories);
  });
};



