import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");

    if (responseCode === "00") {
      const storedPayment = localStorage.getItem("paymentPending");
      if (storedPayment) {
        const { selectedMovie, selectedSeats, userInfo } = JSON.parse(storedPayment);

        // Lưu thông tin đã thanh toán vào localStorage
        const paidData = JSON.parse(localStorage.getItem("paidTickets")) || [];

        paidData.push({
          movieId: selectedMovie.id,
          movieTitle: selectedMovie.title,
          showDate: selectedMovie.showDate,
          showTime: selectedMovie.showTime,
          seats: selectedSeats,
          user: userInfo,
          paymentTime: new Date().toISOString(),
        });

        localStorage.setItem("paidTickets", JSON.stringify(paidData));

        // Đánh dấu các ghế là đã thanh toán (để hiển thị màu đỏ ở SeatSelection)
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const seatKey = `paidSeats_${selectedMovie.id}`;
        const currentPaidSeats = JSON.parse(localStorage.getItem(seatKey)) || {};
        currentPaidSeats[currentUser.email] = selectedSeats;
        localStorage.setItem(seatKey, JSON.stringify(currentPaidSeats));

        // Xóa dữ liệu pending
        localStorage.removeItem("paymentPending");
      }
    } else {
      alert("Thanh toán thất bại hoặc bị hủy.");
    }
  }, [location]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h1>
      <p className="mt-2">Cảm ơn bạn đã mua vé. Chúc bạn xem phim vui vẻ!</p>
    </div>
  );
};

export default PaymentSuccess;
