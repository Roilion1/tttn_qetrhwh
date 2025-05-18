import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Api } from "../../../../api/Api";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMovie = location.state?.movie;

  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const token = localStorage.getItem("token");

  // === Trích xuất videoId từ URL YouTube ===
  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = selectedMovie?.trailer
    ? extractYouTubeId(selectedMovie.trailer)
    : null;

  // === Load danh sách chi nhánh rạp ===
  useEffect(() => {
    fetch(`${Api}/branches`)
      .then((res) => res.json())
      .then(setBranches)
      .catch((err) => console.error("Lỗi lấy chi nhánh rạp:", err));
  }, []);

  // === Lấy danh sách suất chiếu ===
  useEffect(() => {
    if (!selectedMovie?.id) return;

    fetch(`${Api}/showtimes/movie/${selectedMovie.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((st) => ({
          ...st,
          showDate: st.showDate,
          showTime: st.showTime,
          roomName: st.roomName || "",
          cinemaBranchId: st.cinemaBranchId,
          id: st.id,
        }));
        setShowtimes(formatted);
      })
      .catch((err) => console.error("Lỗi lấy suất chiếu:", err));
  }, [selectedMovie, token]);

  // === Cập nhật ngày chiếu theo chi nhánh ===
  useEffect(() => {
    if (!selectedBranchId || showtimes.length === 0) {
      setAvailableDates([]);
      setSelectedDate("");
      setAvailableTimes([]);
      setSelectedTime("");
      return;
    }

    const filtered = showtimes.filter(
      (st) => st.cinemaBranchId === Number(selectedBranchId)
    );
    const datesSet = new Set(filtered.map((st) => st.showDate));
    const uniqueDates = Array.from(datesSet).sort((a, b) => a.localeCompare(b));

    setAvailableDates(uniqueDates);
    setSelectedDate("");
    setAvailableTimes([]);
    setSelectedTime("");
  }, [selectedBranchId, showtimes]);

  // === Cập nhật giờ chiếu ===
  useEffect(() => {
    if (!selectedBranchId || !selectedDate) {
      setAvailableTimes([]);
      setSelectedTime("");
      return;
    }

    const filteredTimes = showtimes
      .filter(
        (st) =>
          st.cinemaBranchId === Number(selectedBranchId) &&
          st.showDate === selectedDate
      )
      .map((st) => ({
        id: st.id,
        time: st.showTime.slice(0, 5),
        roomName: st.roomName || "",
      }));

    setAvailableTimes(filteredTimes);
    setSelectedTime("");
  }, [selectedBranchId, selectedDate, showtimes]);

  // === Tiếp tục sang trang chọn ghế ===
  const handleContinue = () => {
    if (!selectedBranchId || !selectedDate || !selectedTime) {
      alert("Vui lòng chọn đầy đủ chi nhánh, ngày và giờ chiếu.");
      return;
    }

    const selectedShowtime = availableTimes.find(
      (t) => t.time === selectedTime
    );

    const bookingInfo = {
      movieId: selectedMovie.id,
      title: selectedMovie.title,
      image: selectedMovie.image,
      branchId: Number(selectedBranchId),
      showDate: selectedDate,
      showTime: selectedTime,
      showtimeId: selectedShowtime?.id,
    };

    localStorage.setItem("selectedMovie", JSON.stringify(bookingInfo));
    navigate("/SeatSelection");
  };

  if (!selectedMovie) return <p>Không tìm thấy thông tin phim.</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 bg-[#101432] text-white min-h-screen">
      {/* Phần hiển thị ảnh và trailer */}
      <div className="w-full md:w-1/2">
        {/* Khung chứa ảnh giới hạn kích thước */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg mb-4 flex justify-center items-center">
            <img
                src={`http://localhost:8080/images/${selectedMovie.image}`}
                alt={selectedMovie.title}
                className="w-72 h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
        </div>

        {videoId ? (
          <div className="w-full aspect-video mb-4">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-gray-400">Không tìm thấy trailer.</p>
        )}
    </div>

      {/* Phần chọn chi nhánh, ngày, giờ */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold mb-4">Chọn Thông Tin Suất Chiếu</h2>

        <div>
          <label>Chọn chi nhánh rạp:</label>
          <select
            className="w-full bg-gray-700 p-2 rounded"
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
          >
            <option value="">-- Chọn chi nhánh --</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Chọn ngày:</label>
          <select
            className="w-full bg-gray-700 p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={!availableDates.length}
          >
            <option value="">-- Chọn ngày --</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Chọn giờ:</label>
          <select
            className="w-full bg-gray-700 p-2 rounded"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!availableTimes.length}
          >
            <option value="">-- Chọn giờ --</option>
            {availableTimes.map((time) => (
              <option key={time.id} value={time.time}>
                {time.time} ({time.roomName})
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500"
          onClick={handleContinue}
        >
          Tiếp tục đặt vé
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
