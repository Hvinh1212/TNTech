import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { CiMoneyCheck1, CiLock, CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { notification } from "antd";
import axios from "axios";


const ConfirmNewPassword = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleClick = () => {


        if (!password) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Chưa nhập mật khẩu mới!',
                showProgress: true,
            });
            return;
        }
        if (!code) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Chưa nhập mã xác nhận!',
                showProgress: true,
            });
            return;
        }

        if (!email) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Chưa nhập email!',
                showProgress: true,
            });
            return;
        }
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Email không hợp lệ!',
                showProgress: true,
            });
            return;
        }

        if (password.length < 6) {
            notification.warning({
                message: <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Thông báo</span>,
                description: 'Yêu cầu mật khẩu hơn 6 ký tự!',
                showProgress: true,
            });
            return;
        }


        axios.post('http://localhost:5000/api/confirm', {
            newPassword: password,
            email: email,
            code: code
        })
            .then((res) => {
                if (res.data.success === false) {
                    notification.error({
                        message: <span style={{ color: 'red', fontWeight: 'bold' }}>Thất bại</span>,
                        description: 'Lấy lại mật khẩu thất bại, xem lại email hoặc mã xác nhận!',
                        showProgress: true,
                    });

                }
                else {
                    notification.success({
                        message: <span style={{ color: 'green', fontWeight: 'bold' }}>Thành công</span>,
                        description: 'Lấy lại mật khẩu thành công, mời đăng nhập!',
                        showProgress: true,
                    });
                    navigate("/dang-nhap")
                }
            }
            )
            .catch(err => {
                console.log(err)
            })


    }
    const items = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Đăng nhập', href: '/dang-nhap' },
        { name: 'Lấy lại mật khẩu', href: '/dang-nhap/quen-mat-khau' },
        { name: 'Xác nhận đổi mật khẩu' }

    ]
    return (
        <div>
            <Breadcrumb items={items} />

            <div className="mt-5 mb-10 rounded-sm border border-strokeshadow-default ">
                <div className="flex  md:flex-row items-center">
                    <div className="hidden w-full md:block xl:w-1/2">
                        <div className="px-26 py-17.5 text-center">
                            <Link className="mb-5.5 inline-block" href="/">
                                <img className="" src={logo} alt="Logo" width={400} />
                            </Link>s

                            <p className="2xl:px-20" style={{ fontSize: '30px', fontWeight: '500', color: "#007bff" }}>
                                TNTECH
                            </p>
                            <p style={{ fontSize: '20px', fontWeight: '500', }}>Tiên phong công nghệ - Chất lượng hàng đầu</p>

                        </div>
                    </div>

                    <div className="w-full border-stroke  xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
                                Xác nhận đổi mật khẩu
                            </h2>

                            <div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Email
                                    </label>
                                    <div className="relative">
                                        {/* <CiUser size={40} /> */}
                                        <input
                                            type="text"
                                            placeholder="Nhập email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiMail size={32} />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Mã xác nhận
                                    </label>
                                    <div className="relative">
                                        {/* <CiUser size={40} /> */}
                                        <input
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            type="text"
                                            placeholder="Nhập mã xác nhận"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiMoneyCheck1 size={32} />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu mới"
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

                                    </div>
                                </div>


                                <div className="mb-5">
                                    <button
                                        onClick={handleClick}
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-[#007bff] p-4 text-white transition hover:bg-opacity-90">
                                        Thay đổi mật khẩu
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        Hoặc{" "}
                                        <Link
                                            to={"/dang-nhap"}
                                            className="text-cyan-800 hover:text-blue-900"
                                        >
                                            Đăng nhập ngay
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

export default ConfirmNewPassword;
