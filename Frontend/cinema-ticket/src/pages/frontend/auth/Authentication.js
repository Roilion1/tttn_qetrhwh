import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; 

// Hàm đăng ký
export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data || 'Đăng ký thất bại' };
    }
    return { success: false, message: 'Lỗi mạng hoặc máy chủ' };
  }
};

// Hàm đăng nhập
export const login = async (email, password) => { 
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.username);
      console.log(localStorage.getItem('userName'));
      
      const imageFileName = response.data.image;
      const imageUrl = imageFileName ? `http://localhost:8080/${imageFileName}` : '';
      localStorage.setItem('userImage', imageUrl);  

      localStorage.setItem('userEmail', email);
    }
    return { success: true, message: 'Đăng nhập thành công!' };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || error.response.data };
    }
    return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' };
  }
};

// Hàm kiểm tra nếu người dùng đã đăng nhập (kiểm tra token trong localStorage)
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Hàm để đăng xuất
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userImage');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
};
