import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.role_id === 0) {
        navigate('/home');
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/")
    }
  }, [])

  async function login() {
    navigate('/home'); // Redirect to admin dashboard
  }

  return (
    <div className='login'>
      <div className="login-container">
        <h1>TnTech Admin</h1>
        <div className="login-fields">
          <input type="text" placeholder='Tên đăng nhập' onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Mật Khẩu' onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
        <div className='login-footer'>
          <p className='login-dn'> <Link to='/forgetPassword'><span>Quên mật khẩu?</span></Link></p>
        </div>
        <button onClick={login}>Đăng Nhập</button>
      </div>
    </div>
  );
};

export default Login;