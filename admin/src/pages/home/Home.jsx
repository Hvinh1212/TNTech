import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import Feature from "../../components/feature/Feature";
import Chart from "../../components/chart/Chart";
import { useState, useEffect } from 'react';

import "./home.css";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu người dùng
    fetchUserData();

    // Fetch dữ liệu đơn hàng
    fetchOrderData();
  }, []);

  const fetchUserData = () => {
    // Thực hiện fetch dữ liệu người dùng từ cơ sở dữ liệu
    fetch('http://localhost:5000/api/customers')
      .then(response => response.json())
      .then(data => {
        const filteredUserData = data
        setUserData(filteredUserData);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const fetchOrderData = () => {
    // Thực hiện fetch dữ liệu đơn hàng từ cơ sở dữ liệu
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => {
        setOrderData(data);
      })
      .catch(error => console.error('Error fetching order data:', error));
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" amount={userData.length} />
          <Widget type="order" amount={orderData.length} />
        </div>
        <div className="charts">
          <Feature />
          <Chart />
        </div>
      </div>
    </div>
  )
}

export default Home;
