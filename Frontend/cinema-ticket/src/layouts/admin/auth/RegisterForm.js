import React, { useState } from 'react';
import { registerAdmin } from './authAdmin';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',  
    address: '',
    password: '',
    role: 'ADMIN',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('❌ Vui lòng chọn ảnh đại diện.');
      return;
    }

    const formattedDate = new Date(form.dateOfBirth).toISOString().split('T')[0]; 

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "dateOfBirth") {
        formData.append(key, formattedDate);
      } else {
        formData.append(key, value);
      }
    });
    formData.append('file', image);

    try {
      const response = await registerAdmin(formData);

      if (response.success) {
        setMessage('✅ Đăng ký admin thành công!');
        alert('🎉 Đăng ký admin thành công!');
        navigate('/admin/login');
      } else {
        setMessage(`❌ ${response.message}`);
      }
    } catch (error) {
      setMessage('❌ Có lỗi xảy ra trong quá trình đăng ký.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input 
            type="text" 
            name="username" 
            placeholder="Tên người dùng" 
            value={form.username} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="text" 
            name="fullName" 
            placeholder="Họ và tên" 
            value={form.fullName} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="text" 
            name="phone" 
            placeholder="Số điện thoại" 
            value={form.phone} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <select 
            name="gender" 
            value={form.gender} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={form.dateOfBirth} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="text" 
            name="address" 
            placeholder="Địa chỉ" 
            value={form.address} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Mật khẩu" 
            value={form.password} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
            className="w-full p-2 border rounded" 
          />
          <input type="hidden" name="role" value="ADMIN" />
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Đăng Ký Admin
          </button>
        </form>

        {message && (
          <p 
            className={`text-center mt-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
