import React, { useState, useEffect } from 'react';
import { Layout, Table, Tag, Button, Modal } from 'antd';
import moment from 'moment';

const PurchaseHistory = () => {
    const OdermanagementTable = ({ searchText }) => {

        const filteredOrders = searchs.filter(search => {
            return (
                search.order_id.toString().includes(searchText) ||
                moment(search.order_date).format('DD/MM/YYYY').includes(searchText) ||
                search.order_status.includes(searchText)
            );
        });
        return (
            <Table dataSource={filteredOrders} />
        );

    };
    const [searchs, setSearch] = useState([]);

    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [customerId, setCustomerId] = useState(null);
    const userId = localStorage.getItem('id');

    // Fetch customer data to get customer_id
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

    // Fetch order data using customer_id
    const fetchOrderData = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/customer/${customerId}`);
            const orderData = await response.json();

            // Fetch details for each order
            const detailPromises = orderData.map(async (order) => {
                const detailResponse = await fetch(`http://localhost:5000/api/orders/${order.order_id}`);
                const detailData = await detailResponse.json();
                return { [order.order_id]: detailData };
            });

            const detailResults = await Promise.all(detailPromises);
            const detailsMap = detailResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});

            setOrders(orderData);
            setOrderDetails(detailsMap);
            setSearch(orderData)

        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomerId = await fetchCustomerData();
            if (fetchedCustomerId) {
                fetchOrderData(fetchedCustomerId);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCustomerId = await fetchCustomerData();
            if (fetchedCustomerId) {
                fetchOrderData(fetchedCustomerId);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId, fetchCustomerData, fetchOrderData]);

    // Render order status color
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

    const calculateOrderTotal = (orderDetails) => {
        if (!orderDetails) return 0;

        if (Array.isArray(orderDetails)) {
            return orderDetails.reduce((total, item) =>
                total + (item.product_price * (1 - item.discount_id / 100) * item.order_detail_quantity), 30000
            );
        }
        return orderDetails.product_price * (1 - (orderDetails.discount_id) / 100) * orderDetails.order_detail_quantity + 30000;
    };

    // Columns for order table
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_id',
            key: 'order_id',
            render: (text) => <strong>#{text}</strong>,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'order_date',
            key: 'order_date',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Tổng tiền',
            key: 'total_price',
            render: (_, record) => {
                const orderDetail = orderDetails[record.order_id];
                const totalPrice = calculateOrderTotal(orderDetail);
                return `${Number(totalPrice).toLocaleString()}đ`;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() => handleViewDetails(record)}
                >
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    // Modal for order details
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <Layout>
            <Layout.Content style={{ padding: '12px', minHeight: 280, }}>
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="order_id"
                    pagination={{
                        pageSize: 4,
                        showSizeChanger: false,
                    }}
                />

                {/* Order Details Modal */}
                <Modal
                    title={`Chi tiết đơn hàng #${selectedOrder?.order_id}`}
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                    width={600}
                >
                    {selectedOrder && orderDetails[selectedOrder.order_id] && (
                        <div>
                            {/* Trạng thái đơn hàng */}
                            <p style={{ margin: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Trạng thái đơn hàng:</span>
                                <span>
                                    <Tag color={getStatusColor(selectedOrder.order_status)}>
                                        {selectedOrder.order_status}
                                    </Tag>
                                </span>
                            </p>


                            {/* Chi tiết sản phẩm */}
                            {Array.isArray(orderDetails[selectedOrder.order_id])
                                ? orderDetails[selectedOrder.order_id].map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            padding: '10px',
                                            border: '1px solid #f0f0f0',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        {/* Ảnh sản phẩm */}
                                        <img
                                            src={item.product_image}
                                            alt={item.product_name}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                marginRight: '15px',
                                                borderRadius: '8px'
                                            }}
                                        />

                                        {/* Thông tin sản phẩm */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '5px'
                                            }}>
                                                <span style={{ fontWeight: 'bold' }}>{item.product_name}</span>
                                                <span>
                                                    {item.order_detail_quantity} x {Number(item.product_price - (item.product_price * item.discount_id / 100)).toLocaleString()}đ
                                                </span>
                                            </div>
                                            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                = {Number((item.product_price - (item.product_price * item.discount_id / 100)) * item.order_detail_quantity).toLocaleString()}đ
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            padding: '10px',
                                            border: '1px solid #f0f0f0',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        {/* Ảnh sản phẩm */}
                                        <img
                                            src={orderDetails[selectedOrder.order_id].product_image}
                                            alt={orderDetails[selectedOrder.order_id].product_name}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                marginRight: '15px',
                                                borderRadius: '8px'
                                            }}
                                        />

                                        {/* Thông tin sản phẩm */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '5px'
                                            }}>
                                                <span style={{ fontWeight: 'bold' }}>
                                                    {orderDetails[selectedOrder.order_id].product_name}
                                                </span>
                                                <span>
                                                    {orderDetails[selectedOrder.order_id].order_detail_quantity} x
                                                    {Number(orderDetails[selectedOrder.order_id].product_price).toLocaleString()}đ
                                                </span>
                                            </div>
                                            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                = {Number(orderDetails[selectedOrder.order_id].product_price * orderDetails[selectedOrder.order_id].order_detail_quantity).toLocaleString()}đ
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {/* Tổng tiền */}
                            <div style={{
                                marginTop: '20px',
                                textAlign: 'right',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}>
                                Tổng cộng: {calculateOrderTotal(orderDetails[selectedOrder.order_id]).toLocaleString()}đ
                            </div>
                        </div>
                    )}
                </Modal>
            </Layout.Content>
        </Layout>
    );
};

export default PurchaseHistory;