import React, { useState } from 'react';
import { login } from './Authentication'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(form.email, form.password); 

    if (response.success) {
      setMessage(response.message);
      setTimeout(() => navigate('/'), 1000);  
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Đăng Nhập</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Đăng Nhập
          </button>
        </form>
        {message && <p className={`mt-4 text-center ${message.includes('thành công') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Chưa có tài khoản?
            <a href="/register" className="text-blue-500 hover:underline"> Đăng ký ngay!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
