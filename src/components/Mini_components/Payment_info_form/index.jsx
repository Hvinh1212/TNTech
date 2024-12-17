import { useState, useEffect, useCallback } from 'react';
import { Button, Form, Input, Card, Typography, Row, Col, notification, Divider } from 'antd';
import card from '../../../assets/images/momo.png';
import ship from '../../../assets/images/ship.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentInfoForm() {
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [cartData, setCartData] = useState([]);

    const location = useLocation();
    const item = location.state;

    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchCustomerData();
            if (item) {
                const processedItem = item;

                setCartData([processedItem]);
                setOrderDetails([processedItem]);
            } else {
                fetchCustomerData().then(customerId => {
                    if (customerId) {
                        fetchCartData(customerId);
                    }
                });
            }
        }
    }, [userId, item]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`);
            const data = await response.json();
            const userData = data[0];

            form.setFieldsValue({
                name: userData.user_name,
                email: userData.user_email,
                sdt: userData.user_phone,
                address: userData.user_address
            });

            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            notification.error({
                message: <span style={{ color: 'red', fontWeight: 'bold' }}>Có lỗi xảy ra</span>,
                description: 'Không thể tải thông tin người dùng!',
                showProgress: true,
            });
        }
    };

    const fetchCustomerData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/customers`);
            const data = await response.json();
            const customerData = data.find(customer => customer.user_id === parseInt(userId));

            if (customerData) {
                setCustomerId(customerData.customer_id);
                return customerData.customer_id;
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Không thể lấy thông tin khách hàng'
            });
        }
    }, [userId]);

    const fetchCartData = useCallback(async (customerId) => {
        try {
            const cartResponse = await fetch(`http://localhost:5000/api/carts/${customerId}`);
            const cartData = await cartResponse.json();

            const productPromises = cartData.map(async (cart) => {
                const productResponse = await fetch(`http://localhost:5000/api/products/${cart.product_id}`);
                const productData = await productResponse.json();

                return {
                    productId: cart.product_id,
                    name: productData.product_name,
                    price: Number(productData.product_price),
                    quantity: Number(cart.cart_quantity),
                    image: productData.product_image,
                    discount: productData.discount_id
                };
            });

            const completeCartData = await Promise.all(productPromises);
            setCartData(completeCartData);
            setOrderDetails(completeCartData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }, []);

    const shippingFee = 30000;
    const productAmount = cartData.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        const quantity = Number(item.quantity) || 0;

        return total + ((price * (1 - discount / 100)) * quantity);
    }, 0);
    const totalAmount = Math.round(productAmount) + shippingFee;

    const clearCart = async () => {
        const customer = { customer_id: customerId };
        try {
            const response = await fetch('http://localhost:5000/api/carts/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });

            const res = await response.json();
            if (res.success === true) {
                console.log('Xóa giỏ hàng thành công');
            } else {
                console.error('Không thể xóa giỏ hàng:', res.message);
            }
        } catch (error) {
            console.error('Lỗi xóa giỏ hàng:', error);
        }
    };

    const onFinish = async (values) => {
        if (values.paymentmethod === 'cash') {
            values.paymentmethod = 1;
            const orderData = {
                order_name: values.name,
                order_phone: values.sdt,
                order_delivery_address: values.address,
                paying_method_id: values.paymentmethod,
                customer_id: customerId,
                order_total: totalAmount,
                order_details: [...orderDetails.map(item => ({
                    product_id: item.productId,
                    order_detail_quantity: item.quantity,
                }))],
            };

            try {
                console.log('thanh toan', orderData)
                const response = await fetch('http://localhost:5000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });

                const res = await response.json();

                if (res.success === true) {
                    notification.success({
                        message: <span style={{ color: 'green', fontWeight: 'bold' }}>Hoàn thành</span>,
                        description: 'Đặt hàng thành công!',
                        showProgress: true,
                    });

                    if (!item) {
                        navigate('/order-management');
                        await clearCart();
                    }
                    navigate('/order-management');
                } else {
                    console.error('Failed to place order');
                    notification.error({
                        message: <span style={{ color: 'red', fontWeight: 'bold' }}>Có lỗi xảy ra</span>,
                        description: 'Vui lòng kiểm tra lại thông tin!',
                        showProgress: true,
                    });
                }
            } catch (error) {
                console.error('Error placing order:', error);
                notification.error({
                    message: <span style={{ color: 'red', fontWeight: 'bold' }}>Có lỗi xảy ra</span>,
                    description: 'Đặt hàng thất bại!',
                    showProgress: true,
                });
                console.log('Dữ liệu gửi đi:', JSON.stringify(orderData));
            }
        } else {
            values.paymentmethod = 2;

            axios.post('http://localhost:5000/api/payment-momo', {
                order_name: values.name,
                order_phone: values.sdt,
                order_delivery_address: values.address,
                customer_id: customerId,
                order_total: Math.round(totalAmount),
                order_details: [...orderDetails.map(item => ({
                    product_id: item.productId,
                    order_detail_quantity: item.quantity,
                }))],
            })
                .then((res) => {
                    window.location.href = res.data.payUrl;
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    };

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const extraData = params.get("extraData");
            let data;

            try {
                data = extraData ? JSON.parse(decodeURIComponent(extraData)) : undefined;
            } catch (error) {
                console.error("Invalid extraData:", error);
                notification.error({
                    message: <span style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</span>,
                    description: 'Dữ liệu thanh toán không hợp lệ!',
                    showProgress: true,
                });
                return;
            }

            if (params.get("orderId")) {
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.replaceState(null, "", cleanUrl);

                if (params.get("resultCode") === "0") {
                    try {
                        const res = await axios.post(`http://localhost:5000/api/orders`, {
                            customer_id: data.userId,
                            order_details: data.items,
                            paying_method_id: 2,
                            order_delivery_address: data.address,
                            order_name: data.name,
                            order_phone: data.phone,
                            order_total: data.amount,
                        });


                        if (!res.data || !res.data.success) {
                            notification.error(res.data?.message || "Lỗi hệ thống, thử lại sau");
                            console.log('loi tra post invoice');
                            return;
                        } else {
                            console.log('thanh cong')
                            notification.success({
                                message: <span style={{ color: 'green', fontWeight: 'bold' }}>Hoàn thành</span>,
                                description: 'Đặt hàng thành công!',
                                showProgress: true,
                            });

                            if (!item) {
                                await clearCart();
                            }
                            navigate('/order-management');
                        }
                    } catch (error) {
                        console.error("API Error:", error);
                        notification.error({
                            message: <span style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</span>,
                            description: 'Không thể tạo đơn hàng!',
                            showProgress: true,
                        });
                    }
                } else {
                    console.log('loi lay param')
                    notification.error({
                        message: <span style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</span>,
                        description: 'Thanh toán thất bại!',
                        showProgress: true,
                    });
                }
            }
        };
        verifyPayment();
    }, []);

    const handlePayment = () => {
        form.validateFields().then(values => {
            onFinish(values);
        });
    };

    const handleCardClick = (method) => {
        setSelectedPayment(method);
        form.setFieldsValue({ paymentmethod: method });
    };

    return (
        <Row gutter={24} style={{ maxWidth: 1100, margin: 'auto' }}>
            {/* Form */}
            <Col span={14}>
                <Form
                    form={form}
                    labelAlign='left'
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    style={{ maxWidth: 600, margin: 'auto' }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<span style={{ fontSize: '20px', fontWeight: '500' }}>Họ và tên</span>}
                        name="name"
                        rules={[{ required: true, type: 'string', message: 'Vui lòng nhập tên hợp lệ' }]}
                    >
                        <Input size='large' placeholder='Họ và tên' />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '20px', fontWeight: '500' }}>Email</span>}
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập Email hợp lệ' }]}
                    >
                        <Input size='large' placeholder='Email' />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '20px', fontWeight: '500' }}>Số điện thoại</span>}
                        name="sdt"
                        rules={[{ required: true, type: 'string', message: 'Vui lòng nhập số điện thoại hợp lệ' }]}
                    >
                        <Input size='large' placeholder='Số điện thoại' />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '20px', fontWeight: '500' }}>Địa chỉ</span>}
                        name="address"
                        rules={[{ required: true, type: 'string', message: 'Vui lòng nhập địa chỉ hợp lệ' }]}
                    >
                        <Input size='large' placeholder='Địa chỉ' />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '20px', fontWeight: '500' }}>Ghi chú</span>}
                        name="note"
                        rules={[{ required: false, type: 'string', message: 'Vui lòng nhập xã/phường hợp lệ' }]}
                    >
                        <Input size='medium' placeholder='Ghi chú' />
                    </Form.Item>

                    <div style={{ marginBottom: '8px', fontWeight: '500', fontSize: '20px' }}>
                        <Typography.Text type="danger">*</Typography.Text> Phương thức thanh toán:
                    </div>

                    <Form.Item
                        name="paymentmethod"
                        rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                    >
                        <Row gutter={16} justify="center">
                            <Col span={12}>
                                <Card
                                    hoverable
                                    onClick={() => handleCardClick('cash')}
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        padding: '5px 0',
                                        border: selectedPayment === 'cash' ? '1px solid #1b96dd' : '1px solid #d9d9d9',
                                        boxShadow: selectedPayment === 'cash' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                                    }}
                                >
                                    <span style={{ display: 'block', }}>Thanh toán khi nhận hàng</span>
                                    <img src={ship} alt='' style={{ width: '100px', margin: 'auto' }} />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    hoverable
                                    onClick={() => handleCardClick('bank')}
                                    style={{
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        padding: '5px 0',
                                        border: selectedPayment === 'bank' ? '1px solid #1b96dd' : '1px solid #d9d9d9',
                                        boxShadow: selectedPayment === 'bank' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                                    }}
                                >
                                    <span style={{ display: 'block', }}>Chuyển khoản ngân hàng</span>
                                    <img src={card} alt='' style={{ width: '100px', margin: 'auto' }} />
                                </Card>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>

            {/* Chi tiết đơn hàng */}
            <Col span={10}>
                <Card
                    title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Chi tiết đơn hàng</div>}
                    bordered={false}
                    style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                >
                    {orderDetails.length > 0 ? orderDetails.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '64px',
                                    height: '60px',
                                    objectFit: 'cover',
                                    borderRadius: '4px'
                                }}
                            />
                            <div className="item-info" style={{ flexGrow: '1', marginLeft: '10px' }}>
                                <p style={{ fontWeight: '500', marginBottom: '0' }}>{item.name}</p>
                                <p style={{ marginTop: '0', fontWeight: '500' }}>
                                    Số lượng: {item.quantity}
                                </p>
                            </div>

                            <p style={{ fontWeight: '500' }}>{((Number(item.price) * (1 - Number(item.discount) / 100)) * Number(item.quantity)).toLocaleString()}đ </p>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', color: 'red' }}>Không có sản phẩm nào trong đơn hàng.</p>
                    )}

                    <Divider style={{ border: '1px solid black' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '500' }}>Tạm tính:</span>
                        <span style={{ fontWeight: '500' }}>{productAmount.toLocaleString()}đ</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <span style={{ fontWeight: '500' }}>Phí giao hàng:</span>
                        <span style={{ fontWeight: '500' }}>{shippingFee.toLocaleString()}đ</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '10px' }}>
                        <span style={{ fontSize: '20px' }}>Tổng tiền:</span>
                        <span style={{ fontSize: '20px' }}>{totalAmount.toLocaleString()}đ</span>
                    </div>
                    <Button size='large'
                        type="primary"
                        block
                        style={{ marginTop: '20px', fontWeight: 500, backgroundColor: '#007bff' }}
                        disabled={!selectedPayment}
                        onClick={handlePayment}
                    >
                        Đặt hàng
                    </Button>
                </Card>
            </Col>
        </Row>
    );
}

export default PaymentInfoForm;