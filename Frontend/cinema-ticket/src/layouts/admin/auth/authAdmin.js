import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:8080/api/auth';

// 📌 Đăng ký tài khoản ADMIN
export const registerAdmin = async (formData) => {
  try {

    const response = await axios.post(`${ADMIN_API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data?.success) {
      return { success: true, message: response.data.message || '✅ Đăng ký thành công!' };
    } else {
      return { success: false, message: response.data.message || '❌ Đăng ký thất bại' };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data || '❌ Lỗi mạng hoặc máy chủ khi đăng ký',
    };
  }
};

// 📌 Đăng nhập ADMIN
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${ADMIN_API_URL}/login`, { email, password });

    const { token, username, role, id, image } = response.data;

    if (role !== 'ADMIN') {
      return { success: false, message: '❌ Tài khoản không phải là admin!' };
    }

    const adminData = {
      token,
      username,
      email,
      role,
      id,
      image,
    };

    // Lưu vào localStorage
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(adminData));

    return { success: true, message: '✅ Đăng nhập thành công!', data: adminData };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data || '❌ Lỗi mạng hoặc máy chủ khi đăng nhập',
    };
  }
};

// 📌 Kiểm tra đã đăng nhập admin chưa
export const isAdminAuthenticated = () => {
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  return adminData?.role === 'ADMIN' && !!adminData.token;
};

// 📌 Lấy thông tin admin
export const getAdminInfo = () => {
  try {
    const data = localStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// 📌 Đăng xuất admin
export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
};
