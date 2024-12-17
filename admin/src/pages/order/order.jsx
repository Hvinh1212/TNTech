import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './order.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Failed to load orders:', error));
  }, []);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleDelete = (orderId) => {
    fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: 'DELETE'
    })
      .then(() => setOrders(orders.filter(order => order.id !== orderId)))
      .catch(error => console.error('Failed to delete order:', error));
  };

  const handleViewDetails = (orderId) => {
    console.log("View details for order", orderId);
    // Implement detail view logic here
  };

  const translateStatus = (order_is_paid) => {
    switch (order_is_paid) {
      case true: return "Đã xác nhận";
      case false: return "Chưa xác nhận";
      default: return "Chưa có thông tin";
    }
  };

  const OrderEditModal = () => {
    const [localEditingOrder, setLocalEditingOrder] = useState(editingOrder);

    useEffect(() => {
      setLocalEditingOrder(editingOrder);
    }, [editingOrder]);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLocalEditingOrder(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/api/${localEditingOrder.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localEditingOrder)
      })
        .then(response => response.json())
        .then(updatedOrder => {
          if (updatedOrder) {
            setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
            setShowModal(false);
          }
        })
        .catch(error => console.error('Failed to update order:', error));
    };

    return (
      <div style={{
        display: showModal ? "block" : "none",
        position: "fixed",
        left: "20%",
        top: "10%",
        backgroundColor: "#FFF",
        padding: "20px",
        zIndex: 100,
        width: "60%",
        maxHeight: "80%",
        overflowY: "auto",
        border: "2px solid black",
        borderRadius: "8px" // Added border radius for the modal
      }}>
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit}>
          <label>Status:
            <input type="text" name="status" value={localEditingOrder.status} onChange={handleInputChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
        </form>
      </div>
    );
  };

  return (
    <div className="orders">
      <Sidebar />
      <div className="orderContainer">
        <h1>Orders Management</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.order_date}</td>
                <td>{translateStatus(order.status)}</td>
                <td>${order.total_money}</td>
                <td>
                  <button onClick={() => handleEdit(order)}>Xác nhận</button>
                  <button id="deleteBtn" onClick={() => handleDelete(order.id)}>Xoá</button>
                </td>
                <td>
                  <button onClick={() => handleViewDetails(order.id)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && <OrderEditModal />}
      </div>
    </div>
  );
}

export default Orders;