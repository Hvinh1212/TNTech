const db = require('../config/db');
const nodemailer = require("nodemailer");

const FogotPass = {
    Code: (user_email, callback) => {
        const findEmail = `SELECT * FROM users WHERE user_email = $1`
        db.query(findEmail, [user_email], (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    const code = Math.floor(1001 + Math.random() * 8999);
                    const newPass = `SELECT * FROM forgetpassword WHERE email = $1`;
                    db.query(newPass, [user_email], (err, result) => {
                        if (err) throw err;
                        else {
                            if (result.rows.length > 0) {
                                const updateForgotPass = `UPDATE forgetpassword SET code = $1 WHERE email = $2`;
                                db.query(updateForgotPass, [code, user_email])
                            } else {
                                const insertForgotPass = `INSERT INTO forgetpassword (email, code) VALUES ($1, $2)`;
                                db.query(insertForgotPass, [user_email, code])
                            }
                        }
                    })

                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "ntmkhai456@gmail.com",
                            pass: "momx ijtf botr pqba",
                        },
                    });

                    const mailOptions = {
                        from: "TnTech@gmail.com",
                        to: user_email,
                        subject: "Mã xác nhận",
                        html: `<html>Chào ${user.user_name},<br>
                        Để hoàn tất quy trình, vui lòng nhập mã xác nhận dưới đây:<br>
                        <h1>Mã xác nhận của bạn là: ${code}</h1>
                        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.<br>
                        Trân trọng,<br>TnTech UIT</html>`
                    };
                    transporter.sendMail(mailOptions);
                    return callback(null, {
                        success: true,
                        message: 'Mã xác nhận đã được gửi'
                    })
                } else {
                    return callback(null, {
                        success: false,
                        message: "Email không chính xác",
                    })
                }
            }
        })
    },

};

module.exports = FogotPass;