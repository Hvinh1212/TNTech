import React from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState, useEffect } from 'react';

import "./feature.css"

const Feature = () => {
  const [earningData, setEarningData] = useState(0);

  useEffect(() => {

    // Fetch dữ liệu doanh thu
    fetchEarningData();
  }, []);

  const fetchEarningData = () => {
    // Thực hiện fetch dữ liệu doanh thu từ cơ sở dữ liệu
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => {
        // Lọc ra các đơn hàng có status là 3
        const filteredOrders = data.filter(order => order.status === 'Hoàn thành');
        // Tính tổng các giá trị trong cột total_money của các đơn hàng có status là 3
        const totalEarning = filteredOrders.reduce((accumulator, currentValue) => accumulator + currentValue.total_money, 0);
        setEarningData(totalEarning);
      })
      .catch(error => console.error('Error fetching earning data:', error));
  };
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng doanh thu</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Tổng doanh thu hôm nay</p>
        <p className="amount">{earningData.toLocaleString()}đ</p>
        <p className="desc">
          Chưa bao gồm các giao dịch đang xử lý
        </p>
        <div className="summary">
        </div>
      </div>
    </div>
  );
};

export default Feature;
