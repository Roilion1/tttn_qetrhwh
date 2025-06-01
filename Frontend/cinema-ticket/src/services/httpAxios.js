import axios from "axios";

// Tạo instance axios
const httpAxios = axios.create({
  baseURL: 'http://localhost:8080/api', // URL cơ bản của API
});

// Interceptor cho các request
httpAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); // Lấy token từ localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Trả về lỗi nếu có
  }
);

// Interceptor cho các response
httpAxios.interceptors.response.use(
  (response) => {
    return response.data; // Chỉ trả về dữ liệu
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu lỗi 401, nghĩa là không hợp lệ hoặc hết hạn, xử lý như sau:
      console.warn("Token không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại.");
      // Bạn có thể điều hướng đến trang đăng nhập tại đây
      // Ví dụ: window.location.href = "/login";
    }
    return Promise.reject(error); // Trả về lỗi để xử lý tiếp
  }
);

export default httpAxios;
