import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './orderDelivering.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);



  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => {
        const unconfirmedOrders = data.filter(order => order.order_status === "Đang giao hàng");
        setOrders(unconfirmedOrders);
      })
      .catch(error => console.error('Failed to load orders:', error));
  }, []);

  const handleEdit = (order) => {
    const payload = {
      order_status: "Hoàn thành"
    }
    fetch(`http://localhost:5000/api/orders/${order.order_id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(() => {
        setOrders(orders.filter(o => o.order_id !== order.order_id));
      })
      .catch(error => console.error('Failed to update order:', error));
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${order.order_id}`);
      const data = await response.json();
      if (data) {
        const Data = data[0]
        setEditingOrder(Data);
        const userId = parseInt(Data.customer_id) + 1;
        const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`);
        const userData = await userResponse.json();
        const userDataReal = userData[0];
        setUserDetails(userDataReal);
        console.log(userDataReal)

        fetch(`http://localhost:5000/api/orders/${order.order_id}`).then((res) => {
          res.json()
            .then((data) => {
              setOrderDetails(data);
            })
        });

        setShowModal(true);
      } else {
        console.log("No details available for this order.");
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };


  const OrderDetailsModal = ({ order, onClose, orderDetails }) => {
    const [productList, setProductList] = useState([]);

    const getDetail = async () => {
      try {
        console.log(orderDetails);
        const productPromises = orderDetails.map((orderDetail) =>
          fetch(`http://localhost:5000/api/products/${orderDetail.product_id}`).then((res) => res.json())
        );
        const productListData = await Promise.all(productPromises);
        setProductList(productListData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    useEffect(() => {
      getDetail();
    }, [])

    return (
      <div style={{
        display: showModal ? "block" : "none",
        position: "fixed",
        left: "20%",
        top: "5%",
        backgroundColor: "#C7E2F2",
        padding: "20px",
        zIndex: 100,
        width: "60%",
        minHeight: "90%",
        overflowY: "auto",
        border: "2px solid black"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: "10px",
          right: "10px"
        }}>Close</button>
        <h2>Order Details</h2>
        {order ? (
          <>
            <div className='left-side'>
              <p><strong>ID:</strong> {order.order_id}</p>
              <p><strong>Name:</strong> {userDetails?.user_name || 'N/A'}</p>
              <p><strong>Email:</strong> {userDetails?.user_email || 'N/A'}</p>
              <p><strong>Phone:</strong> {userDetails?.user_phone || 'N/A'}</p>
              <p><strong>Address: </strong> {order.order_delivery_address}</p>
              <p><strong>Total Money: </strong> {orderDetails?.reduce((total, item) => total + (item.product_price * item.order_detail_quantity), 0) || 0}đ</p>
            </div>
            <div className='right-side'>
              <p><strong>List of products: </strong></p>
              <ul>
                {orderDetails?.map((detail, i) => (
                  <li key={i}>
                    <p>STT: {i + 1}</p>
                    <p>Tên sản phẩm: {detail.product_name}</p>
                    <img
                      src={detail.product_image}
                      alt={detail.product_name}
                      style={{ width: "100px", height: "auto" }} // Thay đổi kích thước nếu cần
                    />
                    <p>Số lượng: {detail.order_detail_quantity}</p>
                    <p>Giá: {detail.product_price} Đồng</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>No order details available.</p>
        )}
      </div>
    );
  };

  return (
    <div className="orders">
      <Sidebar />
      <div className="orderContainer">
        <h1>QUẢN LÍ ĐƠN ĐANG GIAO</h1>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.order_date}</td>
                <td>{order.order_status}</td>
                <td>
                  <button onClick={() => handleEdit(order)}>Giao hàng thành công</button>
                </td>
                <td>
                  <button onClick={() => handleViewDetails(order)}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && orderDetails && <OrderDetailsModal order={editingOrder} orderDetails={orderDetails} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default Orders;
