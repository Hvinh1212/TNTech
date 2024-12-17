import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // For dropdown
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isProductsOpen, setIsProductsOpen] = useState(false); // Manage dropdown state
    const [isOrdersOpen, setIsOrdersOpen] = useState(false); // Manage dropdown state

    const handleLogout = () => {
        localStorage.removeItem("user-info");
        navigate('/login');
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/home" style={{ textDecoration: "none"}}>
                    <span className="logo">Admin</span>
                </Link>
            </div>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/home" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <p className="title">LISTS</p>
                    <li>
                        <Link to="/users" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                            <PersonOutlineIcon className="icon"/>
                            <span>Users</span>
                        </Link>
                    </li>
                    <li onClick={() => setIsProductsOpen(!isProductsOpen)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <StoreIcon className="icon"/>
                        <span>Products</span>
                        <ExpandMoreIcon className="icon-expand"/>
                    </li>
                    {isProductsOpen && (
                        <div style={{ display: "block", paddingLeft: "20px" }}>
                            <Link to="/products" className="dropdown-item">Management</Link>
                            <Link to="/add-product" className="dropdown-item">Add Product</Link>
                        </div>
                    )}
                    <li onClick={() => setIsOrdersOpen(!isOrdersOpen)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <CreditCardIcon className="icon"/>
                        <span>Orders</span>
                        <ExpandMoreIcon className="icon-expand"/>
                    </li>
                    {isOrdersOpen && (
                        <div style={{ display: "block", paddingLeft: "20px" }}>
                            <Link to="/orderConfirmed" className="dropdown-item">Đã xác nhận</Link>
                            {/* <Link to="/orderDelivering" className="dropdown-item">Đang giao</Link> */}
                            <Link to="/orderUnconfirmed" className="dropdown-item">Chưa xác nhận</Link>
                        </div>
                    )}
                    <li>
                        <Link to="/orderDelivering" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                            <LocalShippingIcon className="icon"/>
                            <span>Delivery</span>
                        </Link>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <Link to="/adminProfile" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={handleLogout} style={{cursor: "pointer"}}>
                        <ExitToAppIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
