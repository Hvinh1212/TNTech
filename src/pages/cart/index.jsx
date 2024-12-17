import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import ContentCart from "../../components/Layout/Content_cart";

function Cart() {
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const hasNotified = sessionStorage.getItem("cartNotification");

        if (!id && !hasNotified) {
            notification.warning({
                key: "cart-warning",
                message: <span style={{ color: "#ff9900", fontWeight: "bold" }}>Thông báo</span>,
                description: "Vui lòng đăng nhập để xem giỏ hàng!",
            });

            sessionStorage.setItem("cartNotification", "true");
            navigate("/dang-nhap");
        }

        return () => {
            sessionStorage.removeItem("cartNotification");
        };
    }, [navigate]);

    const id = localStorage.getItem("id");
    return id ? <ContentCart /> : null;
}

export default Cart;
