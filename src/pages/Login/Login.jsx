import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { notification } from "antd";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    const handleClick = () => {
        if (!userName) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Vui lòng nhập tên đăng nhập!',
                showProgress: true,
            });
            return
        }
        if (!password) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Vui lòng nhập mật khẩu!',
                showProgress: true,
            });
            return
        }

        axios.post('http://localhost:5000/api/login', {
            user_login_name: userName,
            user_password: password
        }
        )
            .then((res) => {
                console.log(res);
                if (res.data.success === false) {
                    localStorage.clear();
                    notification.error({
                        message: <span style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</span>,
                        description: 'Sai tên đăng nhập hoặc mật khẩu!',
                        showProgress: true,
                    });
                } else {
                    notification.success({
                        message: <span style={{ color: 'green', fontWeight: 'bold' }}>Thành công</span>,
                        description: 'Đăng nhập thành công!',
                        showProgress: true,
                    });
                    localStorage.setItem('id', res.data.user_id.user_id)
                    navigate("/");
                }
            })
            .catch((err) => console(err));
    };
    return (
        <div>
            <Breadcrumb pageName="Đăng nhập" />

            <div className="mt-5 mb-10 rounded-sm border border-stroke shadow-default ">
                <div className="flex  md:flex-row items-center">
                    <div className="hidden w-full md:block xl:w-1/2">
                        <div className="px-26 py-17.5 text-center">
                            <Link className="mb-5.5 inline-block" href="/">
                                <img className="" src={logo} alt="Logo" width={400} />
                            </Link>
                            <p className="2xl:px-20" style={{ fontSize: '30px', fontWeight: '500', color: "#007bff" }}>
                                TNTECH
                            </p>
                            <p style={{ fontSize: '20px', fontWeight: '500', }}>Tiên phong công nghệ - Chất lượng hàng đầu</p>
                        </div>

                    </div>


                    <div className="w-full border-stroke  xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
                                Đăng nhập ngay
                            </h2>

                            <div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Tên đăng nhập
                                    </label>
                                    <div className="relative">
                                        {/* <CiUser size={40} /> */}
                                        <input
                                            value={userName}
                                            onChange={(e) => setUsername(e.target.value)}
                                            type="text"
                                            placeholder="Nhập tên tài khoản"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiUser size={32} />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Mật khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                                        />

                                        <span className="absolute left-4 top-3">
                                            <CiLock size={32} />
                                        </span>
                                        {password && (<span
                                            className="absolute right-4 top-3 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <FaRegEye size={24} />
                                            ) : (
                                                <FaRegEyeSlash size={24} />
                                            )}
                                        </span>)}
                                        <div className="mt-4 text-right mr-4">
                                            <p>
                                                Quên mật khẩu?{" "}
                                                <Link
                                                    to={"/dang-nhap/quen-mat-khau"}
                                                    className="text-cyan-800 hover:text-blue-900"
                                                >
                                                    Lấy lại mật khẩu
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <button
                                        onClick={handleClick}
                                        className="w-full cursor-pointer rounded-lg border border-primary  bg-[#007bff]  p-4 text-white transition hover:bg-opacity-90">
                                        Đăng nhập
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        Chưa có tài khoản?{" "}
                                        <Link
                                            to={"/dang-ky"}

                                            className="text-cyan-800 hover:text-blue-900"
                                        >
                                            Đăng ký ngay
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
