import { Layout, Tag, Empty } from 'antd';
import UserOptionMenu from '../../Mini_components/User_option_menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronRight, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import moment from 'moment';


function OrderTracking() {
    const { Content } = Layout;
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [customerId, setCustomerId] = useState(null);

    const userId = localStorage.getItem('id');

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
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`);
            const data = await response.json();
            const userData = data[0];
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchOrderData = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/customer/${customerId}`);
            const orderData = await response.json();

            // Filter orders to only include those with status "Chờ thanh toán" or "Đang giao hàng"
            const filteredOrders = orderData.filter(order =>
                order.order_status === 'Chờ thanh toán' || order.order_status === 'Đang giao hàng'
            );

            filteredOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));


            setOrders(filteredOrders);

            const detailPromises = filteredOrders.map(async (order) => {
                const detailResponse = await fetch(`http://localhost:5000/api/orders/${order.order_id}`);
                const detailData = await detailResponse.json();
                return { [order.order_id]: detailData };
            });

            const detailResults = await Promise.all(detailPromises);
            const detailsMap = detailResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            setOrderDetails(detailsMap);

        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomerId = await fetchCustomerData();
            if (fetchedCustomerId) {
                fetchUserData();
                fetchOrderData(fetchedCustomerId);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);


    const getStatusColor = (status) => {
        switch (status) {
            case 'Chờ thanh toán':
                return 'orange';
            case 'Hoàn thành':
                return 'green';
            case 'Đã hủy':
                return 'red';
            case 'Đang giao hàng':
                return 'blue';
            default:
                return 'default';
        }
    };

    // Component chi tiết đơn hàng
    const OrderDetail = ({ order }) => {
        const details = Array.isArray(orderDetails[order.order_id])
            ? orderDetails[order.order_id]
            : orderDetails[order.order_id]
                ? [orderDetails[order.order_id]]
                : [];

        const calculateTotal = () => {
            return details.reduce((total, item) =>
                total + (item.product_price * (1 - item.discount_id / 100) * item.order_detail_quantity), 30000
            );
        };


        return (
            <div className='oder__tracking__info shadow-xl' style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: '600',
                border: '1px solid #e0e0e0',
                margin: '20px',
                borderRadius: '8px'
            }}>
                {/* Thông tin chính đơn hàng */}
                <div className='order__main__info' style={{ margin: '0 50px 20px 50px', padding: '0 30px' }}>
                    <p style={{ margin: '20px 0 5px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Mã đơn hàng:</span> <span>#{order.order_id}</span>
                    </p>
                    <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Ngày đặt hàng:</span> <span>{moment(order.order_date).format('DD/MM/YYYY')}</span>
                    </p>
                    <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Hình thức thanh toán:</span> <span>{order.paying_method_id === 1 ? 'Tiền măt' : 'Thanh toán Momo'}</span>
                    </p>
                    <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Trạng thái đơn hàng:</span>
                        <span >
                            <Tag color={getStatusColor(order.order_status)}>{order.order_status}</Tag>
                        </span>
                    </p>
                </div>

                {/* Thông tin người dùng */}
                {userData && (
                    <div className='order__info' style={{
                        backgroundColor: '#E5E7EB',
                        margin: '0 60px 20px',
                        padding: '0 30px 10px',
                        borderRadius: '10px'
                    }}>
                        <h3 style={{ margin: '10px 0 5px', fontWeight: 'bold' }}>Thông tin đặt hàng</h3>
                        <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Họ tên:</span> <span>{userData.user_name}</span>
                        </p>
                        <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Số điện thoại:</span> <span>{userData.user_phone}</span>
                        </p>
                        <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Địa chỉ:</span> <span>{order.order_delivery_address}</span>
                        </p>
                    </div>
                )}

                {/* Chi tiết sản phẩm */}
                <div className='cart__info' style={{
                    backgroundColor: '#E5E7EB',
                    margin: '0 60px 20px',
                    padding: '0 30px 10px',
                    borderRadius: '10px'
                }}>
                    <h3 style={{
                        margin: '10px 0 5px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Thông tin đơn hàng</span>
                        <span style={{ color: '#1677ff' }}>{calculateTotal().toLocaleString()}đ</span>
                    </h3>
                    {details.map((item, index) => (
                        <div key={index} className='cart__info__item' style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px'
                        }}>
                            <img
                                src={item.product_image}
                                alt={item.product_name}
                                style={{ width: '80px', height: '72px', objectFit: 'cover' }}
                            />
                            <div className="item-info" style={{ flexGrow: '1', marginLeft: '10px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.product_name}</p>
                                <p className="item-quantity" style={{
                                    margin: '4px 0 0 0',
                                    fontWeight: '500',
                                    fontSize: '14px'
                                }}>Số lượng: {item.order_detail_quantity}</p>
                            </div>
                            <p className="total-price" style={{ fontWeight: '500' }}>
                                {(item.product_price * (1 - item.discount_id / 100) * item.order_detail_quantity).toLocaleString()}đ
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Content style={{
            padding: '0 16px',
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%'
        }}>
            <div className='content__container'>
                {/* Breadcrumb */}
                <div className="content__user__head" style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '12px'
                }}>
                    <div className='content__user__head-home'
                        style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1677ff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                    >
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '26px', margin: '20px' }} />
                        <a href='/' style={{ fontSize: '20px', fontWeight: '700' }}>
                            Trang chủ
                        </a>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '20px', margin: '20px' }} />
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>Theo dõi đơn hàng</span>
                </div>

                {/* Nội dung chính */}
                <div className="content__user__main" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 'clamp(24px, 3vw, 32px)',
                    maxWidth: '1440px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}>
                    {/* Menu người dùng */}
                    <div className="user__aside" style={{
                        backgroundColor: '#fff',
                        padding: 'clamp(24px, 3vw, 36px)',
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: '450px',
                        maxHeight: '600px',
                    }}>
                        <div className='user__avatar' style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10px'
                        }}>
                            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '80px', display: 'flex' }} />
                        </div>

                        <div className='user__account__opt'>
                            <UserOptionMenu />
                        </div>
                    </div>

                    {/* Danh sách đơn hàng */}
                    <div className="order__tracking" style={{
                        backgroundColor: '#fff',
                        padding: 'clamp(12px, 3vw, 18px)',
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: '700px',
                        maxHeight: '600px',
                    }}>
                        <div className='order__tracking__label' style={{
                            fontSize: '30px',
                            fontWeight: '700',
                            textAlign: 'center',
                            marginBottom: '5px'
                        }}>
                            Theo dõi đơn hàng
                        </div>

                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <OrderDetail key={order.order_id} order={order} />
                                ))
                            ) : (
                                <Empty description="Không có đơn hàng nào đang giao" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default OrderTracking;