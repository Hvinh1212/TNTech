const Momo = require('../models/momoModel');

exports.createPayment = async (req, res) => {
    const input = req.body;
    try {
        if (!input.order_total || !input.order_details || !input.customer_id || !input.order_name || !input.order_phone || !input.order_delivery_address) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin đầu vào.' });
        }

        if (!Array.isArray(input.order_details) || input.order_details.length === 0) {
            return res.status(400).json({ success: false, message: 'order_details phải là một mảng và không được rỗng.' });
        }

        for (const item of input.order_details) {
            if (!item.product_id || !item.order_detail_quantity) {
                return res.status(400).json({ success: false, message: 'Mỗi mục trong order_details phải có product_id và order_detail_quantity.' });
            }
        }

        const momoResponse = await Momo.createPayment(input);

        res.status(200).json(momoResponse);
    } catch (error) {
        console.error('Error creating MoMo payment:', error.message, { input });
        res.status(500).json({ success: false, message: error.message });
    }
};
