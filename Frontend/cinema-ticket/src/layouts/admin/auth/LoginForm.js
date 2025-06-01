// src/admin/LoginForm.js
import React, { useState } from 'react';
import { loginAdmin } from './authAdmin';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginAdmin(form.email, form.password);

    if (result.success) {
      setMessage(result.message);
      setTimeout(() => navigate('/admin'), 1000); // điều hướng tới trang admin
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Đăng Nhập</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
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
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
          >
            Đăng Nhập
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes('thành công') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
