const Login = require('../models/loginModel');

exports.login = (req, res) => {
    const { user_login_name, user_password } = req.body;
    Login.loginpost(user_login_name, user_password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};