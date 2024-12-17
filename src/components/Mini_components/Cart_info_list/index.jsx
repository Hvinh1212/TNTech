import React, { useState, useEffect } from 'react';
import {
    Typography,
    Table,
    InputNumber,
    Button,
    notification,
    Row,
    Col,
    Divider
} from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DataContexts } from "../../../AppContexts/Contexts";


const { Text } = Typography;

const Cart = () => {
    const [originalCartData, setOriginalCartData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [customerId, setCustomerId] = useState(null);

    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    // Fetch customer data
    const fetchCustomerData = async () => {
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
    };

    // Fetch cart data
    const fetchCartData = async (customerId) => {
        try {
            const cartResponse = await fetch(`http://localhost:5000/api/carts/${customerId}`);
            const cartData = await cartResponse.json();

            const productPromises = cartData.map(async (cart) => {
                const productResponse = await fetch(`http://localhost:5000/api/products/${cart.product_id}`);
                const productData = await productResponse.json();

                const productInfo = productData;

                return {
                    productId: cart.product_id,
                    name: productInfo.product_name,
                    price: Number(productInfo.product_price),
                    quantity: Number(cart.cart_quantity),
                    image: productInfo.product_image,
                    discount: Number(productInfo.discount_id)
                };
            });

            const completeCartData = await Promise.all(productPromises);

            setOriginalCartData(completeCartData);
            setCartData(completeCartData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải giỏ hàng'
            });
        }
    };

    // Update cart quantity
    const updateCartQuantity = (productId, newQuantity) => {
        setCartData(prevData =>
            prevData.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Remove item from cart
    const removeCartItem = async (productId) => {
        try {
            const payload = {
                customer_id: customerId,
                product_id: productId
            };

            const response = await fetch('http://localhost:5000/api/carts/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Xóa sản phẩm thất bại');
            }
            setCartData(prevData =>
                prevData.filter(item => item.productId !== productId)
            );
            fetchCartData(customerId);

        } catch (error) {
            console.error('Error removing cart item:', error);
            notification.error({
                message: 'Lỗi',
                description: error.message
            });
        }
    };

    // Proceed to checkout
    const proceedToCheckout = async () => {
        try {
            const payload = {
                customer_id: customerId,
                cart_items: cartData.map(item => ({
                    product_id: item.productId,
                    cart_quantity: item.quantity
                }))
            };

            const response = await fetch('http://localhost:5000/api/update-cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success === true) {
                navigate('/payment');
            }

            setOriginalCartData(cartData);

        } catch (error) {
            console.error('Error updating cart:', error);
            notification.error({
                message: 'Lỗi',
                description: error.message
            });
        }
    };

    // Calculate total price and quantity
    const totalPrice = cartData.reduce((total, item) => {
        return total + ((Number(item.price) * (1 - Number(item.discount) / 100)) * Number(item.quantity));
    }
        , 0
    )
    const totalQuantity = cartData.reduce((total, item) =>
        total + item.quantity, 0);

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomerId = await fetchCustomerData();
            if (fetchedCustomerId) {
                fetchCartData(fetchedCustomerId);
            }
        };

        fetchData();
    }, [userId]);

    // Table columns
    const columns = [
        {
            title: <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>Sản phẩm</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="cart-product-item">
                    <CloseCircleOutlined
                        className="cart-remove-icon"
                        onClick={() => removeCartItem(record.productId)}
                        style={{ fontSize: '24px' }}
                    />
                    <img
                        src={record.image}
                        alt={text}
                        className="cart-product-image"
                    />
                    <div className="cart-product-details" style={{ marginLeft: '14px' }}>
                        <Text style={{ display: 'block', fontWeight: 500 }}>{text}</Text>
                        <Text type="secondary">{(record.price * ((100 - record.discount) / 100)).toLocaleString()}đ</Text>
                    </div>
                </div>
            )
        },
        {
            title: <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>Số lượng</div>,
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <InputNumber
                        className="cart-quantity-input"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(value) => updateCartQuantity(record.productId, value)}
                    />
                </div>
            )
        },
        {
            title: <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>Thành tiền</div>,
            key: 'total',
            render: (_, record) => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Text strong className="cart-item-total">
                        {((record.price * ((100 - record.discount) / 100)) * record.quantity).toLocaleString()}đ
                    </Text>
                </div>
            )
        }
    ];

    return (
        <Row gutter={[16]}>
            <Col span={16}>
                <span style={{ margin: 20, fontWeight: 700, fontSize: 30 }}>Giỏ hàng</span>
                <Table
                    columns={columns}
                    dataSource={cartData}
                    pagination={false}
                    scroll={{ y: 400 }}
                />
                <div style={{ textAlign: 'right', margin: '20px' }}>
                    <Text strong style={{ fontSize: 20 }}>
                        Tổng: {totalPrice.toLocaleString()}đ
                    </Text>
                </div>
            </Col>
            <Col span={8}>
                <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
                    <Text strong style={{ fontSize: 18, fontWeight: 500 }} >Tổng số lượng:</Text>
                    <Text style={{ float: "right", fontSize: 16, fontWeight: 600 }}>{totalQuantity} sản phẩm</Text>
                    <Divider />
                    <Text strong style={{ fontSize: 18, fontWeight: 500 }} >Tạm tính:</Text>
                    <Text style={{ float: "right", fontSize: 16, fontWeight: 600 }}>{totalPrice.toLocaleString()}đ</Text>
                    <Divider />
                    <Text strong><span>*Lưu ý:</span> Mức thanh toán chưa bao gồm phí vận chuyển. Phí vận chuyển có thể khác nhau tùy thuộc vào khu vực và thời gian.</Text>

                    <Divider />
                    <Button type="primary" block
                        style={{ marginTop: "20px", backgroundColor: '#007bff' }}
                        onClick={proceedToCheckout}
                        disabled={!totalPrice}
                    >
                        <span style={{ fontWeight: 500 }}>Đặt hàng</span>
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

export default Cart;