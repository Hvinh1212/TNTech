const db = require('../config/db');

const Login = {
    loginpost: (user_login_name, user_password, callback) => {
        const sql = 'SELECT * FROM users WHERE user_login_name = $1 and user_password = $2';
        db.query(sql, [user_login_name, user_password], (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                if (result.rows.length > 0) {
                    return callback(null, {
                        success: true,
                        message: "Đăng nhập thành công",
                        user_id: result.rows[0],
                    });
                } else {
                    return callback(null, {
                        success: false,
                        message: "Người dùng chưa đăng ký",
                    })
                }
            };
        })
    },
}

module.exports = Login;
