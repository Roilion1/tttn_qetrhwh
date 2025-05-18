import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; 

const QRCodePage = () => {
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    // Lấy thông tin thanh toán từ localStorage
    const storedPaymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));
    
    if (!storedPaymentInfo) {
      alert("Không có thông tin thanh toán. Vui lòng quay lại trang xác nhận.");
      navigate("/checkout");
    } else {
      setPaymentInfo(storedPaymentInfo);
    }
  }, [navigate]);

  const handlePaymentSuccess = () => {
    // Sau khi thanh toán thành công, lưu thông tin thanh toán vào localStorage
    alert("Thanh toán thành công!");

    // Xóa thông tin thanh toán và quay lại trang chủ hoặc trang đã đặt vé
    localStorage.removeItem("paymentInfo");
    navigate("/"); // Hoặc trang bạn muốn sau thanh toán thành công
  };

  if (!paymentInfo) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  // Tạo URL chuyển hướng đến trang thanh toán vapay hoặc cổng thanh toán của bạn
  const paymentURL = `https://your-payment-gateway.com/pay?amount=${paymentInfo.amount}&seats=${paymentInfo.seats.join(",")}&movie=${paymentInfo.title}`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Thanh toán qua mã QR</h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <strong>🎬 Tên phim:</strong> {paymentInfo.title}
        </div>
        <div>
          <strong>🎟 Ghế đã chọn:</strong> {paymentInfo.seats.join(", ")}
        </div>
        <div>
          <strong>💰 Tổng tiền:</strong> <span className="text-green-600 font-bold">{paymentInfo.amount.toLocaleString()} đ</span>
        </div>

        <div className="mt-6 text-center">
          {/* Hiển thị mã QR */}
          <QRCode value={paymentURL} size={256} />

          <p className="mt-4 text-lg text-blue-600">Quét mã QR để thanh toán</p>
        </div>

        <button
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={handlePaymentSuccess}
        >
          Xác nhận thanh toán (Test)
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
