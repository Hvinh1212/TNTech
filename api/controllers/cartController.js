// controllers/productController.js

const Cart = require('../models/cartModel');

exports.addToCart = (req, res) => {
  const { customer_id, product_id, cart_quantity } = req.body;
  Cart.add(customer_id, product_id, cart_quantity, (err, carts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(carts);
  });
};

exports.getCartOfCustomer = (req, res) => {
  const id = req.params.customer_id;
  Cart.getOfCustomer(id, (err, carts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(carts);
  });
}

exports.getAllCart = (req, res) => {
  Cart.getAll((err, carts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(carts);
  });
}

exports.updateProductQuantity = (req, res) => {
  const customer_id = req.params.customer_id;
  const product_id = req.params.id;
  const { cart_quantity } = req.body;
  Cart.updateQuantity(cart_quantity, customer_id, product_id, (err, cart) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(cart);
  })
}

exports.getQuantityCart = (req, res) => {
  const customer_id = req.params.customer_id;
  Cart.getQuantity(customer_id, (err, cart) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(cart);
  })
}

exports.getTotalCart = (req, res) => {
  const customer_id = req.params.customer_id;
  Cart.getTotal(customer_id, (err, cart) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(cart);
  })
}

exports.removeProductOfCart = (req, res) => {
  const { customer_id, product_id } = req.body;
  Cart.removeProduct(customer_id, product_id, (err, cart) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(cart);
  })
}

exports.removeCart = (req, res) => {
  const { customer_id } = req.body;
  Cart.remove(customer_id, (err, cart) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(cart);
  })
}

exports.updateCart = (req, res) => {
  const { customer_id, cart_items } = req.body;

  if (!customer_id || !Array.isArray(cart_items)) {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ"
    });
  }

  const invalidItems = cart_items.some(item =>
    !item.product_id ||
    item.cart_quantity === undefined ||
    item.cart_quantity < 0
  );

  if (invalidItems) {
    return res.status(400).json({
      success: false,
      message: "Thông tin sản phẩm không hợp lệ"
    });
  }

  Cart.updateCart(customer_id, cart_items, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }
    res.status(200).json(result);
  });
};



