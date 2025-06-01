import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutAuthPage = () => {
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const totalAmount = parseInt(localStorage.getItem("totalAmount")) || 0;

    try {
      const response = await fetch("http://localhost:8080/api/payment/vnpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await response.json();

      if (data && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Không nhận được đường dẫn thanh toán từ server.");
      }
    } catch (error) {
      console.error("Lỗi gọi API VNPAY:", error);
      alert("Đã xảy ra lỗi khi tạo thanh toán.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">Xác thực thông tin trước khi thanh toán</h2>
      <p>Số tiền cần thanh toán: {localStorage.getItem("totalAmount")} VND</p>
      <button
        onClick={handleConfirmPayment}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default CheckoutAuthPage;
