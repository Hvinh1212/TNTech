const db = require('../config/db');

const ConfirmPass = {
    confirmpost: (user_email, code, newPassword, callback) => {
        const findEmail = 'select * from forgetpassword where email = $1';
        db.query(findEmail, [user_email], (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                if (result.rows.length == 0) {
                    return callback(null, {
                        success: false,
                        message: "Email không chính xác",
                    })
                } else {
                    if (result.rows[0].code != code) {
                        return callback(null, {
                            success: false,
                            message: 'Code xác thực không chính xác',
                        })
                    } else {
                        if (result.rows[0].email == user_email) {
                            const updatePass = `update users set user_password = $1 where user_email = $2`;
                            db.query(updatePass, [newPassword, user_email], (err, result) => {
                                if (err) {
                                    return callback(err, null)
                                }
                                else {
                                    const deleteFoget = `delete from forgetpassword where code = $1`;
                                    db.query(deleteFoget, [code]);
                                    return callback(null, {
                                        success: true,
                                        message: "Thay đổi mật khẩu thành công"
                                    })
                                }
                            })
                        }
                    }
                }
            }
        })
    }
}

module.exports = ConfirmPass;