
const Order = require('../models/orderModel');

exports.getOrders = (req, res) => {
  Order.getAll((err, orders) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(orders);
  });
};

exports.addOrder = (req, res) => {
  const { order_name, order_phone, order_delivery_address, paying_method_id,
    customer_id, order_total, order_details } = req.body;

  const orderData = {
    order_name,
    order_phone,
    order_delivery_address,
    paying_method_id,
    customer_id,
    order_total,
    order_details: order_details.map(item => ({
      product_id: item.product_id,
      order_detail_quantity: item.order_detail_quantity,
    })),
    order_date: new Date(),
    order_delivery_date: new Date(),
    order_paying_date: new Date(),
    order_is_paid: true,
    order_status: 'Đang giao hàng',
  };

  Order.add(orderData, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(order);
  });
};



exports.getOrderDetails = (req, res) => {
  const id = req.params.orderId;
  Order.getDetail(id, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(orders);
  });
};

exports.removeOrder = (req, res) => {
  const id = req.body;
  Order.remove(id, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(order);
  });
};

exports.removeOrderId = (req, res) => {
  const id = req.params.id;
  Order.removeId(id, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(order);
  });
}

exports.updateOrderStatus = (req, res) => {
  const id = req.params.orderId;
  const { order_status } = req.body;
  Order.updateStatus(order_status, id, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(order);
  });
};

exports.updateOrderPay = (req, res) => {
  const id = req.params.orderId;
  const { order_is_paid, order_paying_date } = req.body;
  Order.updatePay(order_is_paid, order_paying_date, id, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(order);
  });
};

exports.getOrderOfCustomer = (req, res) => {
  const id = req.params.customerId;
  Order.getOfCustomer(id, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(orders);
  });
};






