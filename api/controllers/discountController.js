
const Discount = require('../models/discountModel');

exports.getDiscounts = (req, res) => {
  Discount.getAll((err, discounts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(discounts);
  });
};

exports.addDiscount = (req, res) => {
  const discountData = req.body;
  Discount.add(discountData, (err, discount) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(discount);
  });
};

exports.getDiscountDetails = (req, res) => {
  const id = req.params.id;
  Discount.getDetails(id, (err, discount) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(discount);
  });
};



