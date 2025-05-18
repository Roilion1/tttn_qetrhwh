import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SEAT_PRICE = 45000;
const rows = 6;
const seatsPerRow = 7;

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [userBookedSeats, setUserBookedSeats] = useState([]);
    const [showUserInfoForm, setShowUserInfoForm] = useState(false);
    const [guestInfo, setGuestInfo] = useState({ fullName: '', birthDate: '', address: '', phone: '' });
    const [timeoutId, setTimeoutId] = useState(null); // Thời gian chờ
    const [remainingTime, setRemainingTime] = useState(0); // Thời gian còn lại
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser')); // Lưu trạng thái người dùng hiện tại

    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie")) || {};
    const movieTitle = selectedMovie.title || "Chưa chọn phim";
    const movieImage = selectedMovie.image || "";
    const selectedShowTime = selectedMovie.showTime || ""; // Lấy thời gian chiếu đã chọn

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const movieName = queryParams.get("movie");

    useEffect(() => {
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser')) || {};
        const movieBookings = allBookings[movieName] || {};

        let userSeats = [];

        Object.entries(movieBookings).forEach(([email, booking]) => {
            const seatsArray = Array.isArray(booking) ? booking : booking?.seats || [];

            if (email === currentUser) {
                userSeats = seatsArray;
            }

            bookedSeats.push(...seatsArray);
        });

        setBookedSeats(bookedSeats);
        setUserBookedSeats(userSeats);

        // Khôi phục ghế đã chọn từ localStorage cho người dùng hiện tại
        const storedSelectedSeats = JSON.parse(localStorage.getItem(`selectedSeats_${currentUser}_${selectedShowTime}`)) || [];
        console.log("Ghế đã chọn từ localStorage:", storedSelectedSeats); 
        setSelectedSeats(storedSelectedSeats);

        // Kiểm tra thời gian còn lại từ localStorage
        const storedRemainingTime = localStorage.getItem('remainingTime');
        if (storedRemainingTime) {
            setRemainingTime(parseInt(storedRemainingTime, 10));
        }
    }, [movieName, currentUser, selectedShowTime]);

    useEffect(() => {
        // Cập nhật thời gian còn lại mỗi giây
        if (remainingTime > 0) {
            const intervalId = setInterval(() => {
                setRemainingTime((prev) => {
                    const newTime = prev - 1;
                    localStorage.setItem('remainingTime', newTime); // Lưu thời gian còn lại vào localStorage
                    if (newTime <= 0) {
                        handleCancelSeats(selectedSeats);
                        return 0; // Đặt lại thời gian còn lại về 0
                    }
                    return newTime;
                });
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            // Nếu không còn ghế nào được chọn, dừng thời gian
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    }, [remainingTime, selectedSeats]);

    const handleSeatClick = (row, seat) => {
        const rowLabel = String.fromCharCode(64 + row);
        const seatId = `${rowLabel}-${seat}`;
        const isBookedByOthers = bookedSeats.includes(seatId) && !userBookedSeats.includes(seatId);

        // Ngăn chặn việc chọn ghế đã được đặt
        if (isBookedByOthers) return;

        // Kiểm tra số ghế đã chọn
        if (selectedSeats.length >= 6 && !selectedSeats.includes(seatId)) {
            alert("Bạn chỉ có thể chọn tối đa 6 ghế.");
            return;
        }

        // Kiểm tra ghế liền nhau trong tất cả các hàng
        const selectedRowSeats = selectedSeats.filter(seat => seat.startsWith(rowLabel));
        const seatNumbers = selectedRowSeats.map(seat => parseInt(seat.split('-')[1]));
        const newSeatNumber = seat;

        // Kiểm tra xem ghế đã chọn có liền nhau không
        const isAdjacent = selectedSeats.some(seat => {
            const [selectedRow, selectedSeat] = seat.split('-');
            return selectedRow === rowLabel && Math.abs(parseInt(selectedSeat) - newSeatNumber) === 1;
        });

        // Nếu không có ghế nào đã chọn, cho phép chọn ghế mới
        if (selectedSeats.length === 0 || isAdjacent) {
            setSelectedSeats((prev) => {
                const newSelectedSeats = prev.includes(seatId)
                    ? prev.filter((id) => id !== seatId)
                    : [...prev, seatId];

                // Lưu ghế đã chọn vào localStorage với khóa duy nhất cho người dùng và khung giờ
                localStorage.setItem(`selectedSeats_${currentUser}_${selectedShowTime}`, JSON.stringify(newSelectedSeats));
                return newSelectedSeats;
            });

            console.log("Selected Seats:", selectedSeats);

            // Thiết lập thời gian chờ 1 phút
            if (timeoutId) {
                clearTimeout(timeoutId); // Xóa thời gian chờ cũ nếu có
            }
            const timeLimit = 10;
            setRemainingTime(timeLimit);
            localStorage.setItem('remainingTime', timeLimit); 
            const id = setTimeout(() => {
                handleCancelSeats(selectedSeats);
            }, timeLimit * 1000);
            setTimeoutId(id);
        } else {
            alert("Bạn chỉ có thể chọn ghế liền nhau.");
        }
    };

    const handleCancelSeats = (seats) => {
        const updatedBookedSeats = bookedSeats.filter(seat => !seats.includes(seat));
        setBookedSeats(updatedBookedSeats);
        setSelectedSeats([]); // Xóa ghế đã chọn
        alert("Thời gian đặt vé đã hết. Ghế đã được hủy.");
        setRemainingTime(0); // Đặt lại thời gian còn lại
        localStorage.removeItem('remainingTime'); // Xóa thời gian còn lại khỏi localStorage
        localStorage.removeItem(`selectedSeats_${currentUser}_${selectedShowTime}`); // Xóa ghế đã chọn khỏi localStorage
    };

    const handleGuestInfoChange = (e) => {
        const { name, value } = e.target;
        setGuestInfo({ ...guestInfo, [name]: value });
    };

    const handleSubmit = () => {
        if (selectedSeats.length === 0) {
            alert("Vui lòng chọn ít nhất 1 ghế trước khi đặt vé.");
            return;
        }

        if (!currentUser) {
            setShowUserInfoForm(true);
        } else {
            saveBooking(currentUser);
            navigate(`/checkout?movie=${movieName}&seats=${selectedSeats.join(",")}`);
            clearTimeout(timeoutId); // Xóa thời gian chờ khi đặt vé thành công
            setRemainingTime(0); // Đặt lại thời gian còn lại
            localStorage.removeItem('remainingTime'); // Xóa thời gian còn lại khỏi localStorage
            localStorage.removeItem(`selectedSeats_${currentUser}_${selectedShowTime}`); // Xóa ghế đã chọn khỏi localStorage
        }
    };

    const saveBooking = (email) => {
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser')) || {};
        const movieBookings = allBookings[movieName] || {};

        const userBooking = movieBookings[email] || { seats: [] };

        const newSeats = [...userBooking.seats, ...selectedSeats];

        movieBookings[email] = { seats: newSeats };
        allBookings[movieName] = movieBookings;

        localStorage.setItem('bookedSeatsByUser', JSON.stringify(allBookings));
    };

    const handleCancelSeat = (seatId) => {
        const allBookings = JSON.parse(localStorage.getItem('bookedSeatsByUser')) || {};
        const movieBookings = allBookings[movieName] || {};
        const userBooking = movieBookings[currentUser];

        if (!userBooking || !userBooking.seats.includes(seatId)) {
            alert("Bạn không sở hữu ghế này.");
            return;
        }

        const updatedSeats = userBooking.seats.filter(seat => seat !== seatId);

        movieBookings[currentUser] = {
            seats: updatedSeats,
        };

        allBookings[movieName] = movieBookings;
        localStorage.setItem('bookedSeatsByUser', JSON.stringify(allBookings));

        setUserBookedSeats(updatedSeats);
        setBookedSeats(updatedSeats);
    };

    const handleGuestSubmit = () => {
        const guestEmail = `guest_${Date.now()}@guest.com`;
        localStorage.setItem('currentUser', guestEmail);

        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[guestEmail] = { password: '', ...guestInfo };
        localStorage.setItem('users', JSON.stringify(users));

        // saveBooking(guestEmail);
        // navigate(`/checkout?movie=${movieName}&seats=${selectedSeats.join(",")}`);
    };

    const totalPrice = selectedSeats.length * SEAT_PRICE;
    console.log("Total Price:", totalPrice);

    // Chuyển đổi thời gian còn lại thành định dạng phút:giây
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-black via-blue-600/20 to-black bg-opacity-90 backdrop-blur-sm text-white">
            <h2 className="text-2xl font-bold text-center text-white mb-4">
                Chọn ghế cho phim: 
                <span className="bg-gradient-to-r from-red-500 text-red-500 bg-clip-text">
                    {movieTitle}
                </span>
            </h2>

            {/* Hiển thị hình ảnh bộ phim */}
            {movieImage && (
                <div className="mb-4">
                    <img src={movieImage} alt={movieTitle} className="w-96 h-auto absolute top-16 left-20 flex flex-col items-center" />
                </div>
            )}

            {/* Màn hình, Ghế */}
            <div className="flex flex-col items-center justify-center w-full px-4">
                {/* Màn hình */}
                <div className="seat-screen mb-6 relative" data-aos="fade-up">
                    <img src="/images/img-screen.png" alt="Màn hình" className="w-[360px] md:w-[460px] lg:w-[520px]" />
                    <div className="text-white font-semibold text-center absolute left-1/2 transform -translate-x-1/2 bottom-4 rotate-11">
                        Màn hình
                    </div>
                </div>

                {/* Hình ảnh cửa nhỏ */}
                <div className="absolute top-1/4 right-80 flex flex-col items-center">
                    <img 
                        src="/images/C1.png" 
                        alt="Cửa" 
                        className="w-10 h-10 transform -translate-y-3 filter brightness-150 contrast-125 hue-rotate-180 drop-shadow-lg rounded-lg" 
                    />
                    <span className="mt-1 text-white text-sm font-semibold bg-opacity-50 px-2 py-0.5 rounded">
                        Cửa
                    </span>
                </div>

                {/* Ghế */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {Array.from({ length: rows }).map((_, rowIndex) => {
                        const rowLabel = String.fromCharCode(65 + rowIndex);

                        // Dãy ghế đôi F
                        if (rowLabel === 'F') {
                            return (
                                <div key={rowLabel} className="flex justify-center items-center gap-4">
                                    <div className="w-12 text-center font-semibold text-black">{rowLabel}</div>
                                    {Array.from({ length: Math.floor(seatsPerRow / 2) }).map((_, pairIndex) => {
                                        const seatNumber1 = pairIndex * 2 + 1;
                                        const seatNumber2 = seatNumber1 + 1;
                                        const seatId1 = `${rowLabel}-${seatNumber1}`;
                                        const seatId2 = `${rowLabel}-${seatNumber2}`;
                                        const isBookedByOthers =
                                            bookedSeats.includes(seatId1) || bookedSeats.includes(seatId2);

                                        const isSelected = selectedSeats.includes(seatId1) && selectedSeats.includes(seatId2);
                                        const isUserBooked = userBookedSeats.includes(seatId1) && userBookedSeats.includes(seatId2);

                                        let seatColor = 'bg-gray-200 text-black';
                                        if (bookedSeats.includes(seatId1) || bookedSeats.includes(seatId2)) {
                                            seatColor = 'bg-red-500 text-white cursor-not-allowed';
                                        }
                                        if (isSelected) seatColor = 'bg-yellow-500 text-black'; // Màu vàng cho ghế đã chọn nhưng chưa thanh toán

                                        return (
                                            <div key={`${seatId1}-${seatId2}`} className="relative">
                                                <button
                                                    onClick={() => {
                                                        if (isBookedByOthers) return;
                                                        const bothSelected = selectedSeats.includes(seatId1) && selectedSeats.includes(seatId2);
                                                        setSelectedSeats((prev) =>
                                                            bothSelected
                                                                ? prev.filter(id => id !== seatId1 && id !== seatId2)
                                                                : [...prev, seatId1, seatId2]
                                                        );
                                                    }}
                                                    className={`w-24 h-12 rounded-lg border-2 border-gray-400 transition-all ${seatColor} hover:bg-blue-300 disabled:cursor-not-allowed`}
                                                    disabled={isBookedByOthers}
                                                >
                                                    {seatNumber1}-{seatNumber2}
                                                </button>

                                                {isUserBooked && (
                                                    <button
                                                        onClick={() => {
                                                            handleCancelSeat(seatId1);
                                                            handleCancelSeat(seatId2);
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
                                                    >
                                                        Hủy
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })} 
                                </div>
                            );
                        }

                        // Các dãy ghế A-E
                        return (
                            <div key={rowLabel} className="flex justify-center items-center gap-4">
                                <div className="w-12 text-center font-semibold text-black">{rowLabel}</div>
                                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                                    const seatId = `${rowLabel}-${seatIndex + 1}`;
                                    const isSelected = selectedSeats.includes(seatId);
                                    const isBookedByOthers = bookedSeats.includes(seatId);
                                    const isUserBooked = userBookedSeats.includes(seatId);

                                    let seatColor = 'bg-gray-200 text-black';
                                    
                                    if (bookedSeats.includes(seatId)) {
                                        seatColor = 'bg-red-500 text-white cursor-not-allowed';
                                    }
                                    if (isSelected) seatColor = 'bg-yellow-500 text-black'; 

                                    return (
                                        <div key={seatId} className="relative">
                                            <button
                                                onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
                                                className={`w-12 h-12 rounded-lg border-2 border-gray-400 transition-all ${seatColor} hover:bg-blue-300 disabled:cursor-not-allowed`}
                                                disabled={isBookedByOthers}
                                            >
                                                {seatIndex + 1}
                                            </button>

                                            {isSelected && (
                                                <button
                                                    onClick={() => {
                                                        handleCancelSeat(seatId);
                                                        setSelectedSeats((prev) => prev.filter((id) => id !== seatId)); 
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
                                                >
                                                    Hủy
                                                </button>
                                            )}

                                            {isUserBooked && (
                                                <button
                                                    onClick={() => handleCancelSeat(seatId)}
                                                    className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full hover:bg-yellow-600"
                                                >
                                                    Hủy
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hiển thị thời gian còn lại */}
            {remainingTime > 0 && currentUser && ( 
                <div className="text-center text-lg font-semibold mb-4">
                    Thời gian còn lại để đặt vé: {formatTime(remainingTime)}
                </div>
            )}

            {/* Nút hiển thị màu ghế */}
            <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 border border-gray-400 rounded"></div>
                    <span>Chưa chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 border border-gray-400 rounded"></div>
                    <span>Đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-500 border border-gray-400 rounded"></div>
                    <span>Chưa thanh toán</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 border border-gray-400 rounded"></div>
                    <span>Đã đặt</span>
                </div>
            </div>

            {/* Tổng tiền */}
            <div className="text-right font-semibold justify-between items-center text-xl mb-6">
                <div className="font-semibold text-lg">Tổng tiền</div>
                <div className="font-semibold text-xl">{totalPrice.toLocaleString()} VND</div>
            </div>

            {/* Nút Đặt vé */}
            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Đặt vé
                </button>
            </div>
        </div>
    );
};

export default SeatSelection; 





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
// const COLUMNS = 10;

// const SeatSelection = ({ movieId, userEmail }) => {
//   const [bookedSeats, setBookedSeats] = useState([]); // đã đặt (chưa thanh toán)
//   const [paidSeats, setPaidSeats] = useState([]);     // đã thanh toán
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [ticketPrice, setTicketPrice] = useState(0);  // giá vé động
//   const [movieName, setMovieName] = useState('');

//   useEffect(() => {
//     if (movieId) {
//       fetchMovieInfo();
//       fetchSeatsFromBackend();
//     }
//   }, [movieId]);

//   // Lấy thông tin phim từ backend để lấy giá vé và tên phim
//   const fetchMovieInfo = async () => {
//     try {
//       const response = await axios.get(`/api/movies/${movieId}`);
//       const movie = response.data;

//       setTicketPrice(movie.price || 0);
//       setMovieName(movie.name || '');
//     } catch (error) {
//       console.error('Lỗi khi lấy thông tin phim:', error);
//     }
//   };

//   // Lấy trạng thái ghế từ backend
//   const fetchSeatsFromBackend = async () => {
//     try {
//       const response = await axios.get(`/api/seats?movieId=${movieId}`);
//       const data = response.data;

//       setBookedSeats(data.booked || []);
//       setPaidSeats(data.paid || []);
//     } catch (error) {
//       console.error('Lỗi khi lấy dữ liệu ghế từ backend:', error);
//     }
//   };

//   const generateSeatLabel = (row, col) => `${row}${col}`;

//   const handleSeatClick = (seatLabel) => {
//     if (paidSeats.includes(seatLabel) || bookedSeats.includes(seatLabel)) return;

//     if (selectedSeats.includes(seatLabel)) {
//       setSelectedSeats(selectedSeats.filter(seat => seat !== seatLabel));
//     } else {
//       setSelectedSeats([...selectedSeats, seatLabel]);
//     }
//   };

//   const handleBooking = async () => {
//     if (!userEmail) {
//       alert("Vui lòng đăng nhập để đặt vé.");
//       return;
//     }

//     try {
//       await axios.post('/api/seats/book', {
//         movieId,
//         email: userEmail,
//         seats: selectedSeats,
//       });

//       alert("Đặt ghế thành công!");
//       setSelectedSeats([]);
//       fetchSeatsFromBackend(); // refresh lại trạng thái ghế
//     } catch (err) {
//       console.error('Lỗi đặt vé:', err);
//       alert("Lỗi đặt ghế. Vui lòng thử lại.");
//     }
//   };

//   const getSeatStatus = (seatLabel) => {
//     if (paidSeats.includes(seatLabel)) return 'paid';
//     if (bookedSeats.includes(seatLabel)) return 'booked';
//     if (selectedSeats.includes(seatLabel)) return 'selected';
//     return 'available';
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Chọn ghế cho phim: {movieName}</h2>

//       <div className="grid grid-cols-10 gap-2">
//         {ROWS.map((row) =>
//           [...Array(COLUMNS)].map((_, colIndex) => {
//             const seatLabel = generateSeatLabel(row, colIndex + 1);
//             const status = getSeatStatus(seatLabel);

//             let seatColor = 'bg-gray-300';
//             if (status === 'selected') seatColor = 'bg-yellow-400';
//             else if (status === 'booked') seatColor = 'bg-blue-400';
//             else if (status === 'paid') seatColor = 'bg-red-500';

//             return (
//               <button
//                 key={seatLabel}
//                 onClick={() => handleSeatClick(seatLabel)}
//                 disabled={status === 'booked' || status === 'paid'}
//                 className={`w-10 h-10 rounded ${seatColor} border border-gray-600 hover:brightness-110`}
//                 title={seatLabel}
//               >
//                 {seatLabel}
//               </button>
//             );
//           })
//         )}
//       </div>

//       <div className="mt-4">
//         <p>Ghế đã chọn: {selectedSeats.join(', ') || 'Chưa chọn'}</p>
//         <p>Tổng tiền: {selectedSeats.length * ticketPrice} VND</p>
//         <button
//           className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
//           onClick={handleBooking}
//         >
//           Đặt vé
//         </button>
//       </div>

//       <div className="mt-4">
//         <h3 className="text-md font-semibold">Ghi chú màu:</h3>
//         <div className="flex space-x-4 mt-2">
//           <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-gray-300 border" /> <span>Trống</span></div>
//           <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-yellow-400 border" /> <span>Đang chọn</span></div>
//           <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-blue-400 border" /> <span>Đã đặt</span></div>
//           <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-red-500 border" /> <span>Đã thanh toán</span></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatSelection;





