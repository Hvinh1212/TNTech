
const Feedback = require('../models/feedbackModel');

exports.getFeedbacks = (req, res) => {
  Feedback.getAll((err, feedbacks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(feedbacks);
  });
};

exports.addFeedback = (req, res) => {
  const { feedback_rate, feedback_content, product_id, customer_id, order_id } = req.body;
  Feedback.add(feedback_rate, feedback_content, product_id, customer_id, order_id, (err, feedback) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(feedback);
  });
};

exports.getFeedbacksOfProduct = (req, res) => {
  const id = req.params.product_id;
  Feedback.getOfProduct(id, (err, feedbacks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(feedbacks);
  });
};



