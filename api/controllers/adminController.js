
const Admin = require('../models/adminModel');

exports.getAdmins = (req, res) => {
  Admin.getAll((err, admins) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(admins);
  });
};



