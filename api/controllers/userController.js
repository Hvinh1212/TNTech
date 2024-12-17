// controllers/productController.js

const User = require('../models/userModel');

// Lấy danh sách người dùng 
exports.getUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(users);
  });
};

// Thêm 1 người dùng
exports.addUser = ((req, res) => {
  const userData = req.body;
  User.add(userData, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(user);
  })
});


// Lấy chi tiết người dùng
exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getDetails(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(user);
  })
}

// Cập nhật người dùng
exports.updateUser = (req, res) => {
  const userData = req.body;
  const id = req.params.id;

  User.update(userData, id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(user);
  })
}

// Xóa người người dùng
exports.removeUser = (req, res) => {
  const id = req.params.id;
  User.remove(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(user);
  })
}


