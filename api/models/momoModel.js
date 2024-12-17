const crypto = require('crypto');
const axios = require('axios');

const Momo = {
    createPayment: async (input) => {
        const accessKey = 'F8BBA842ECF85';
        const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        const partnerCode = 'MOMO';
        const redirectUrl = 'http://localhost:5173/payment';
        const ipnUrl = 'http://localhost:5173/payment';
        const requestType = 'payWithMethod';
        const orderInfo = 'Thanh toán đơn hàng';

        const orderId = partnerCode + Date.now();
        const requestId = orderId;

        const extraData = JSON.stringify({
            items: input.order_details,
            userId: input.customer_id,
            name: input.order_name,
            phone: input.order_phone,
            address: input.order_delivery_address,
            amount: input.order_total,
        });
        const encodedExtraData = encodeURIComponent(extraData);

        const rawSignature = `accessKey=${accessKey}&amount=${input.order_total}&extraData=${encodedExtraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const requestBody = {
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: input.order_total,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: 'vi',
            requestType: requestType,
            autoCapture: true,
            extraData: encodedExtraData,
            orderGroupId: '',
            signature: signature,
        };

        const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    },
};

module.exports = Momo;
