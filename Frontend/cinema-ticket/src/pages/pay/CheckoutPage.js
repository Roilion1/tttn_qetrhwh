import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SEAT_PRICE = 45000;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[currentUser];

    const storedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    const storedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    const queryParams = new URLSearchParams(location.search);
    const querySeats = queryParams.get("seats")?.split(",").filter(Boolean) || [];

    if (!currentUser || !user) {
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      navigate("/login");
    } else {
      setUserInfo(user);
      setSelectedMovie(storedMovie);
      setSelectedSeats(querySeats.length > 0 ? querySeats : storedSeats);
    }

    setLoading(false);
  }, [navigate, location]);

  const total = selectedSeats.length * SEAT_PRICE;

  const handlePayment = () => {
    // Lưu thông tin thanh toán vào localStorage
    const paymentInfo = {
      title: selectedMovie.title,
      seats: selectedSeats,
      amount: total,  // Tổng tiền
    };
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

    // Chuyển hướng đến trang QR Code
    navigate("/qr-code");
  };

  if (loading || !userInfo || !selectedMovie) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Xác nhận thanh toán</h2>

      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div>
          <strong>🎬 Tên phim:</strong> {selectedMovie.title}
        </div>
        <div>
          <strong>🗓️ Ngày chiếu:</strong> {selectedMovie.releaseDate || "Chưa rõ"}
        </div>
        <div>
          <strong>🕒 Lịch chiếu:</strong> {selectedMovie.showTime || "Chưa rõ"}
        </div>
        <div>
          <strong>🎟 Ghế đã chọn:</strong> {selectedSeats.join(", ")}
        </div>
        <div>
          <strong>💰 Tổng tiền:</strong>{" "}
          <span className="text-green-600 font-bold">{total.toLocaleString()} đ</span>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-bold text-blue-600 mb-2">Thông tin người đặt:</h3>
          <p><strong>👤 Họ tên:</strong> {userInfo.fullname || "Chưa có"}</p>
          <p><strong>📅 Ngày sinh:</strong> {userInfo.birthDate || "Chưa có"}</p>
          <p><strong>🏠 Địa chỉ:</strong> {userInfo.address || "Chưa có"}</p>
          <p><strong>📞 Số điện thoại:</strong> {userInfo.phone || "Chưa có"}</p>
        </div>

        <button
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={handlePayment}
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
